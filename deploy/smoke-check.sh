#!/usr/bin/env bash
#
# Post-activation readiness check, run by .github/workflows/deploy.yml on the
# production box. Polls until both apps are ready or the deadline passes.
#
#   smoke-check.sh deploy   <build_id> <expected_sha>
#   smoke-check.sh rollback [build_id]
#
# deploy   — the API must answer 200 with ok:true, db:"ok" and commit equal to
#            <expected_sha> (so the newly built API is the one answering), and
#            the web must answer 200 on / and serve
#            /_next/static/<build_id>/_buildManifest.js. Each web process only
#            serves its own build's manifest, so an older process still running
#            cannot pass for the new release. Prints SMOKE_RESULT=pass|fail.
#
# rollback — the web only: the API is never rolled back, so it cannot be asked
#            to report the previous commit. Without a build id only / is
#            checked. Prints ROLLBACK_HEALTH=pass|fail, then one informational
#            line about the API that does not affect the result.
#
# Exit status: 0 when ready, 1 when the deadline passes, 2 on bad arguments.
#
# The deadline is strict: no attempt starts after it, the pause between
# attempts is cut to the time left, and every request's limit is cut to the
# time left too, so the check ends within SMOKE_TIMEOUT (plus under a second
# of clock rounding). The SMOKE_* overrides exist for the tests; the deploy
# sets none of them.
#
# Commits from before this script existed cannot be redeployed through the
# current workflow: their checkout has no deploy/smoke-check.sh, and APIs
# older than 665b9c1 report commit:null, so the check fails and the web is
# rolled back. That is deliberate — it never reports a false success.

set -uo pipefail

TIMEOUT="${SMOKE_TIMEOUT:-60}"
INTERVAL="${SMOKE_INTERVAL:-2}"
API_URL="${SMOKE_API_URL:-http://127.0.0.1:4000/api/health}"
WEB_URL="${SMOKE_WEB_URL:-http://127.0.0.1:3001}"

MODE="${1:-}"
BUILD_ID="${2:-}"
EXPECTED_SHA="${3:-}"

case "${MODE}" in
  deploy) MARKER="SMOKE_RESULT" ;;
  rollback) MARKER="ROLLBACK_HEALTH"; EXPECTED_SHA="" ;;
  *)
    echo "usage: smoke-check.sh deploy <build_id> <expected_sha> | rollback [build_id]" >&2
    echo "SMOKE_RESULT=fail reason=usage"
    exit 2
    ;;
esac

invalid() {
  echo "${MARKER}=fail reason=$1"
  exit 2
}

if [ "${MODE}" = "deploy" ]; then
  printf '%s' "${EXPECTED_SHA}" | grep -Eq '^[0-9a-f]{40}$' || invalid "expected-sha-not-a-commit-sha"
  [ -n "${BUILD_ID}" ] || invalid "missing-build-id"
fi
if [ -n "${BUILD_ID}" ]; then
  # Interpolated into a URL path, so only Next's build-id alphabet is accepted.
  printf '%s' "${BUILD_ID}" | grep -Eq '^[A-Za-z0-9_-]+$' || invalid "malformed-build-id"
fi

BODY_FILE="$(mktemp)"
trap 'rm -f "${BODY_FILE}"' EXIT

# Seconds left before the deadline (may be zero or negative).
remaining() { echo $(( DEADLINE - $(date +%s) )); }

# A request's time limit: its default, cut to the time left. Prints nothing
# once the deadline has passed, so the caller skips the request.
limit() {
  local left
  left="$(remaining)"
  [ "${left}" -gt 0 ] || return 1
  [ "${left}" -lt "$1" ] && echo "${left}" || echo "$1"
}

# Prints "ok" or a short reason. Never prints the response body.
check_api() {
  local code t
  t="$(limit 3)" || { echo "deadline"; return; }
  code="$(curl -s -o "${BODY_FILE}" -w '%{http_code}' --connect-timeout 2 --max-time "${t}" "${API_URL}")" || true
  [ "${code}" = "200" ] || { echo "http-${code:-000}"; return; }
  # node parses the JSON so formatting cannot fool the check; it is on the
  # box already because PM2 runs on it.
  EXPECTED_SHA="${EXPECTED_SHA}" node -e '
    let d;
    try { d = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8")); }
    catch { console.log("invalid-json"); process.exit(); }
    if (d.ok !== true) console.log("ok-not-true");
    else if (d.db !== "ok") console.log("db-not-ok");
    else if (!process.env.EXPECTED_SHA) console.log("ok");
    else if (typeof d.commit !== "string" || !/^[0-9a-f]{40}$/.test(d.commit)) console.log("commit-missing-or-malformed");
    else if (d.commit !== process.env.EXPECTED_SHA) console.log("commit-mismatch:" + d.commit);
    else console.log("ok");
  ' "${BODY_FILE}" 2>/dev/null || echo "parse-error"
}

check_web() {
  local code t
  t="$(limit 5)" || { echo "deadline"; return; }
  code="$(curl -s -o /dev/null -w '%{http_code}' --connect-timeout 2 --max-time "${t}" "${WEB_URL}/")" || true
  [ "${code}" = "200" ] || { echo "root-http-${code:-000}"; return; }
  if [ -n "${BUILD_ID}" ]; then
    t="$(limit 5)" || { echo "deadline"; return; }
    code="$(curl -s -o /dev/null -w '%{http_code}' --connect-timeout 2 --max-time "${t}" "${WEB_URL}/_next/static/${BUILD_ID}/_buildManifest.js")" || true
    [ "${code}" = "200" ] || { echo "build-id-http-${code:-000}"; return; }
  fi
  echo "ok"
}

START="$(date +%s)"
DEADLINE=$((START + TIMEOUT))
attempt=0
api="not-checked"
web="not-checked"

while :; do
  # No attempt starts once the deadline is reached; the last real reasons stand.
  if [ "$(remaining)" -le 0 ]; then
    elapsed=$(( $(date +%s) - START ))
    echo "${MARKER}=fail attempts=${attempt} elapsed=${elapsed}s api=${api} web=${web}"
    result=1
    break
  fi
  attempt=$((attempt + 1))
  web="$(check_web)"
  if [ "${MODE}" = "deploy" ]; then
    api="$(check_api)"
  else
    api="ok"
  fi
  elapsed=$(( $(date +%s) - START ))
  echo "  ${MODE} attempt ${attempt} (${elapsed}s): api=${api} web=${web}"

  if [ "${api}" = "ok" ] && [ "${web}" = "ok" ]; then
    echo "${MARKER}=pass attempts=${attempt} elapsed=${elapsed}s"
    result=0
    break
  fi
  # Never sleep past the deadline.
  left="$(remaining)"
  [ "${left}" -le 0 ] || sleep "$(( left < INTERVAL ? left : INTERVAL ))"
done

if [ "${MODE}" = "rollback" ]; then
  # Its own short budget: the rollback deadline may already have been used up.
  DEADLINE=$(( $(date +%s) + 3 ))
  echo "  rollback api (informational, the API is not rolled back): $(check_api)"
fi

exit "${result}"
