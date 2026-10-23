#!/usr/bin/env bash
#
# Tests for deploy/smoke-check.sh and the smoke/rollback block of
# .github/workflows/deploy.yml, against local stand-ins (deploy/test/mock-server.js).
# Needs bash, curl and node. Uses 127.0.0.1:47901 (API) and :47902 (web).
#
#   bash deploy/test/smoke-check.test.sh

set -uo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "${HERE}/../.." && pwd)"
SCRIPT="${ROOT}/deploy/smoke-check.sh"
MOCK="${HERE}/mock-server.js"
API_PORT=47901
WEB_PORT=47902
SHA="665b9c16fcc06c77c54d8e083a36959da9029bd9"
OTHER_SHA="0f3999ca1c9dfb675305ad5dcf60ed17f18e3b1e"
NEW_ID="newBuild_123-abc"
OLD_ID="oldBuild_456-def"

export SMOKE_API_URL="http://127.0.0.1:${API_PORT}/api/health"
export SMOKE_WEB_URL="http://127.0.0.1:${WEB_PORT}"
export SMOKE_INTERVAL=1

WORK="$(mktemp -d)"
PIDS=()
passed=0
failed=0

cleanup_servers() {
  for pid in "${PIDS[@]}"; do kill "${pid}" 2>/dev/null || true; done
  PIDS=()
  pkill -f "MOCK_TEST_RUN=${WORK}" 2>/dev/null || true
  for port in "${API_PORT}" "${WEB_PORT}"; do
    while curl -s -o /dev/null --max-time 1 "http://127.0.0.1:${port}/" 2>/dev/null; do sleep 0.1; done
  done
}
trap 'cleanup_servers; rm -rf "${WORK}"' EXIT

# api [VAR=value ...] — start the API stand-in with the given settings.
api() { env MOCK_KIND=api MOCK_PORT="${API_PORT}" "$@" node "${MOCK}" "MOCK_TEST_RUN=${WORK}" & PIDS+=($!); }
web() { env MOCK_KIND=web MOCK_PORT="${WEB_PORT}" "$@" node "${MOCK}" "MOCK_TEST_RUN=${WORK}" & PIDS+=($!); }

# expect NAME CODE PATTERN OUTPUT_CODE OUTPUT
check() {
  local name="$1" want_code="$2" pattern="$3" got_code="$4" out="$5"
  if [ "${got_code}" = "${want_code}" ] && printf '%s\n' "${out}" | grep -Eq "${pattern}"; then
    echo "ok   - ${name}"
    passed=$((passed + 1))
  else
    echo "FAIL - ${name} (exit ${got_code}, wanted ${want_code}; pattern: ${pattern})"
    printf '%s\n' "${out}" | sed 's/^/       /'
    failed=$((failed + 1))
  fi
}

run() { out="$(bash "${SCRIPT}" "$@" 2>&1)"; code=$?; }

settle() { sleep 0.4; }

# ── smoke-check.sh ──

api MOCK_COMMIT="${SHA}"; web MOCK_BUILD_ID="${NEW_ID}"; settle
SMOKE_TIMEOUT=10 run deploy "${NEW_ID}" "${SHA}"
check "1. both ready immediately -> pass on attempt 1" 0 '^SMOKE_RESULT=pass attempts=1 ' "${code}" "${out}"
cleanup_servers

api MOCK_COMMIT="${SHA}" MOCK_DELAY_MS=10000; web MOCK_BUILD_ID="${NEW_ID}" MOCK_DELAY_MS=10000
SMOKE_TIMEOUT=20 run deploy "${NEW_ID}" "${SHA}"
check "2. both start ~10 s late -> pass after several attempts" 0 '^SMOKE_RESULT=pass attempts=([4-9]|1[0-9]) elapsed=(9|1[0-9])s' "${code}" "${out}"
cleanup_servers

start=$(date +%s)
SMOKE_TIMEOUT=6 run deploy "${NEW_ID}" "${SHA}"
took=$(( $(date +%s) - start ))
check "3. nothing starts -> fail at the deadline" 1 '^SMOKE_RESULT=fail .*api=http-000 web=root-http-000' "${code}" "${out}"
within() { # NAME SECONDS LIMIT
  if [ "$2" -le "$3" ]; then echo "ok   - $1 (${2}s, limit ${3}s)"; passed=$((passed + 1)); else echo "FAIL - $1 (${2}s, limit ${3}s)"; failed=$((failed + 1)); fi
}
within "3b. deadline honoured with nothing listening" "${took}" 7

# A process that accepts connections but answers after 20 s. The timeout is
# shorter than the web request's own 5 s limit, so the check only ends on time
# if that request is cut to the time left.
api MOCK_COMMIT="${SHA}"; web MOCK_BUILD_ID="${NEW_ID}" MOCK_RESPONSE_DELAY_MS=20000; settle
start=$(date +%s)
SMOKE_TIMEOUT=3 run deploy "${NEW_ID}" "${SHA}"
took=$(( $(date +%s) - start ))
check "3c. hung web process -> fail" 1 '^SMOKE_RESULT=fail .*web=root-http-000' "${code}" "${out}"
within "3c. hung requests are cut to the deadline" "${took}" 4
cleanup_servers

# An interval that does not divide the timeout: the last pause is shortened,
# so no attempt starts at or after the deadline (attempts at 0 and 4 s, not 8).
start=$(date +%s)
SMOKE_TIMEOUT=5 SMOKE_INTERVAL=4 run deploy "${NEW_ID}" "${SHA}"
took=$(( $(date +%s) - start ))
latest="$(printf '%s\n' "${out}" | sed -n 's/^  deploy attempt [0-9]* (\([0-9]*\)s).*/\1/p' | sort -n | tail -1)"
check "3d. interval longer than the time left -> fail" 1 '^SMOKE_RESULT=fail ' "${code}" "${out}"
within "3d. no attempt starts after the deadline" "${latest:-99}" 5
within "3d. check ends at the deadline" "${took}" 6

api MOCK_COMMIT="${SHA}" MOCK_STATUS=503; web MOCK_BUILD_ID="${NEW_ID}"; settle
SMOKE_TIMEOUT=3 run deploy "${NEW_ID}" "${SHA}"
check "4. API answers 503 -> fail" 1 '^SMOKE_RESULT=fail .*api=http-503 ' "${code}" "${out}"
cleanup_servers

api MOCK_COMMIT="${OTHER_SHA}"; web MOCK_BUILD_ID="${NEW_ID}"; settle
SMOKE_TIMEOUT=3 run deploy "${NEW_ID}" "${SHA}"
check "5. API reports a different commit -> fail" 1 "^SMOKE_RESULT=fail .*api=commit-mismatch:${OTHER_SHA} " "${code}" "${out}"
cleanup_servers

for c in null "${SHA:0:7}" "$(printf '%s' "${SHA}" | tr 'a-f' 'A-F')"; do
  api MOCK_COMMIT="${c}"; web MOCK_BUILD_ID="${NEW_ID}"; settle
  SMOKE_TIMEOUT=2 run deploy "${NEW_ID}" "${SHA}"
  check "5b. API commit '${c:0:12}' (null, short or uppercase) -> fail" 1 '^SMOKE_RESULT=fail .*api=commit-missing-or-malformed ' "${code}" "${out}"
  cleanup_servers
done

api MOCK_COMMIT="${SHA}" MOCK_DB=error; web MOCK_BUILD_ID="${NEW_ID}"; settle
SMOKE_TIMEOUT=2 run deploy "${NEW_ID}" "${SHA}"
check "5c. API db not ok -> fail" 1 '^SMOKE_RESULT=fail .*api=db-not-ok ' "${code}" "${out}"
cleanup_servers

api MOCK_COMMIT="${SHA}" MOCK_OK=false; web MOCK_BUILD_ID="${NEW_ID}"; settle
SMOKE_TIMEOUT=2 run deploy "${NEW_ID}" "${SHA}"
check "5d. API ok:false -> fail" 1 '^SMOKE_RESULT=fail .*api=ok-not-true ' "${code}" "${out}"
cleanup_servers

api MOCK_COMMIT="${SHA}"; web MOCK_BUILD_ID="${OLD_ID}"; settle
SMOKE_TIMEOUT=3 run deploy "${NEW_ID}" "${SHA}"
check "6. web serves an older build -> fail" 1 '^SMOKE_RESULT=fail .*web=build-id-http-404$' "${code}" "${out}"
cleanup_servers

api MOCK_COMMIT="${SHA}"; settle
SMOKE_TIMEOUT=3 run deploy "${NEW_ID}" "${SHA}"
check "7. API ready, web not -> fail" 1 '^SMOKE_RESULT=fail .*api=ok web=root-http-000$' "${code}" "${out}"
cleanup_servers

web MOCK_BUILD_ID="${NEW_ID}"; settle
SMOKE_TIMEOUT=3 run deploy "${NEW_ID}" "${SHA}"
check "8. web ready, API not -> fail" 1 '^SMOKE_RESULT=fail .*api=http-000 web=ok$' "${code}" "${out}"
cleanup_servers

web MOCK_BUILD_ID="${OLD_ID}"; settle
SMOKE_TIMEOUT=3 run rollback "${OLD_ID}"
check "rollback mode: previous build served, API down -> pass (API not required)" 0 '^ROLLBACK_HEALTH=pass ' "${code}" "${out}"
cleanup_servers

SMOKE_TIMEOUT=3 run deploy "${NEW_ID}" "not-a-sha"
check "bad expected sha -> exit 2" 2 '^SMOKE_RESULT=fail reason=expected-sha-not-a-commit-sha' "${code}" "${out}"
SMOKE_TIMEOUT=3 run deploy '../../etc' "${SHA}"
check "malformed build id -> exit 2" 2 '^SMOKE_RESULT=fail reason=malformed-build-id' "${code}" "${out}"

# ── deploy.yml smoke/rollback block, run as written ──
#
# The block between "==> Smoke check" and "==> Pruning" is cut out of the
# workflow and run with a stub pm2 whose reload restarts the web stand-in from
# whatever web-current points at — the way PM2 restarts server.js.

BLOCK="${WORK}/block.sh"
awk '/echo "==> Smoke check/{on=1} /echo "==> Pruning/{on=0} on' "${ROOT}/.github/workflows/deploy.yml" | sed 's/^            //' > "${BLOCK}"
grep -q 'smoke-check.sh" deploy' "${BLOCK}" || { echo "FAIL - could not extract the smoke block from deploy.yml"; exit 1; }

DP="${WORK}/deploy-path"
mkdir -p "${DP}/deploy" "${DP}/web-releases/old/.next" "${DP}/web-releases/new/.next" "${WORK}/bin"
cp "${SCRIPT}" "${DP}/deploy/smoke-check.sh"
echo "${OLD_ID}" > "${DP}/web-releases/old/.next/BUILD_ID"
echo "${NEW_ID}" > "${DP}/web-releases/new/.next/BUILD_ID"

cat > "${WORK}/bin/pm2" <<EOF
#!/usr/bin/env bash
# Stub: "reload" restarts the web stand-in from web-current, unless told to fail.
[ "\$1" = "reload" ] || exit 0
pkill -f "MOCK_KIND_WEB_RUN=${WORK}" 2>/dev/null
while curl -s -o /dev/null --max-time 1 "http://127.0.0.1:${WEB_PORT}/"; do sleep 0.1; done
[ -f "${WORK}/pm2-web-fails" ] && exit 0
MOCK_KIND=web MOCK_PORT=${WEB_PORT} MOCK_BUILD_ID="\$(cat "${DP}/web-current/.next/BUILD_ID")" \\
  nohup node "${MOCK}" "MOCK_KIND_WEB_RUN=${WORK}" "MOCK_TEST_RUN=${WORK}" >/dev/null 2>&1 &
sleep 0.4
EOF
chmod +x "${WORK}/bin/pm2"

deploy_block() {
  ln -sfn "${DP}/web-releases/new" "${DP}/web-current"
  out="$(cd "${DP}" && PATH="${WORK}/bin:${PATH}" DEPLOY_PATH="${DP}" DEPLOY_SHA="${SHA}" \
    NEW="${DP}/web-releases/new" PREV="${DP}/web-releases/old" NEW_BUILD_ID="${NEW_ID}" \
    SMOKE_TIMEOUT=3 bash -c "set -euo pipefail; source '${BLOCK}'" 2>&1)"
  code=$?
}

# The new web never came up: the old process is still answering.
api MOCK_COMMIT="${SHA}"
MOCK_KIND=web MOCK_PORT=${WEB_PORT} MOCK_BUILD_ID="${OLD_ID}" node "${MOCK}" "MOCK_KIND_WEB_RUN=${WORK}" "MOCK_TEST_RUN=${WORK}" & PIDS+=($!); settle
deploy_block
check "9. deploy: readiness fails, rollback healthy -> ROLLBACK_HEALTH=pass, exit 1" 1 '^ROLLBACK_HEALTH=pass ' "${code}" "${out}"
check "9b. deploy: rollback logged after the failure" 1 '==> Rolling back to ' "${code}" "${out}"
[ "$(readlink "${DP}/web-current")" = "${DP}/web-releases/old" ] && { echo "ok   - 9c. web-current points at the previous release"; passed=$((passed + 1)); } || { echo "FAIL - 9c. web-current not restored"; failed=$((failed + 1)); }
cleanup_servers

api MOCK_COMMIT="${SHA}"
MOCK_KIND=web MOCK_PORT=${WEB_PORT} MOCK_BUILD_ID="${OLD_ID}" node "${MOCK}" "MOCK_KIND_WEB_RUN=${WORK}" "MOCK_TEST_RUN=${WORK}" & PIDS+=($!); settle
touch "${WORK}/pm2-web-fails"
deploy_block
rm -f "${WORK}/pm2-web-fails"
check "10. deploy: rollback unhealthy -> ROLLBACK_HEALTH=fail, still exit 1" 1 '^ROLLBACK_HEALTH=fail ' "${code}" "${out}"
cleanup_servers

api MOCK_COMMIT="${SHA}"
MOCK_KIND=web MOCK_PORT=${WEB_PORT} MOCK_BUILD_ID="${NEW_ID}" node "${MOCK}" "MOCK_KIND_WEB_RUN=${WORK}" "MOCK_TEST_RUN=${WORK}" & PIDS+=($!); settle
deploy_block
check "11. deploy: ready -> exit 0, no rollback" 0 '^SMOKE_RESULT=pass ' "${code}" "${out}"
if printf '%s' "${out}" | grep -q 'Rolling back'; then echo "FAIL - 11b. rolled back after a pass"; failed=$((failed + 1)); else echo "ok   - 11b. no rollback after a pass"; passed=$((passed + 1)); fi
cleanup_servers

echo
echo "${passed} passed, ${failed} failed"
[ "${failed}" -eq 0 ]
