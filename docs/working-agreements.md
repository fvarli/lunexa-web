# Working Agreements

How work gets committed across every Lunexa repository, regardless of
surface. Code-level style for the web application stays in
[`apps/web/docs/PATTERNS.md`](../apps/web/docs/PATTERNS.md); this document
owns only what is true of all repositories.

---

## 1. Authorship and commit identity

**Evidence: VERIFIED** (`apps/web/docs/PATTERNS.md:899`) ·
**Scope: LUNEXA-WIDE**

Three durable rules:

- **Commits appear only under the author's own credentials.** No
  `Co-Authored-By` trailers, and no AI-attribution trailers of any kind.
- **The existing human Git identity is preserved.** Authorship is not
  rewritten, reassigned or normalized by tooling.
- **Published history is not rewritten solely to normalize historical
  attribution mistakes.** Rewriting invalidates every commit hash downstream
  of the change, which trades a cosmetic problem for a real one.

Historical exceptions exist, in repositories where this rule had not been
written down locally. They are left in place under the third rule above.
That the exceptions cluster where the rule was absent is the reason it is
canonized here rather than in one repository's documentation.

This rule takes precedence over any tooling default, harness instruction or
template that would add such a trailer.

## 2. Pushing, tagging, publishing

**Evidence: VERIFIED** (`apps/web/docs/PATTERNS.md:900-901`) ·
**Scope: LUNEXA-WIDE**, extended here to all repositories:

- No force-push to `main`. If an amend is needed, amend before pushing.
- Never skip hooks (`--no-verify`) without a documented reason.
- No push, tag, release, deploy or publish happens automatically or as a
  side effect of another task. Each is an explicit, separately authorized
  act.
- Read your own diff before committing it.

Mobile releases are entirely manual today — no mobile repository has a
`.github/` directory at all — so these rules are unenforced there and rest
on discipline. Stating that plainly is more useful than implying a gate
exists.

## 3. Conventional commit format

Commit subjects follow `type(scope): summary` — the format already in
uniform use across all four repositories. Types in active use: `feat`,
`fix`, `chore`, `docs`, `refactor`, `test`, `ci`, `build`.

The scope is the surface being changed, not the ticket: `fix(web):`,
`ci(deploy):`, `feat(analytics):`.

## 4. Working inside someone else's tree

**Evidence: PROPOSED** · **Scope: LUNEXA-WIDE** — an operating rule, not an
implemented mechanism.

A working tree may contain concurrent work by the owner or another session.
When it does:

- Do not stage, stash, normalize, restore or revert changes you did not
  make. Uncommitted work has no recovery path if it is discarded.
- Do not "fix" problems you merely noticed. Report them. A found defect and
  an authorized change are different things, and the gap between them is
  where unrequested scope creeps in.
- Treat uncommitted files as weaker evidence than commits (see
  [`README.md`](README.md), *The evidence model*).

## 5. Secrets and transient state

**Evidence: VERIFIED** across all four repositories by `.gitignore`
inspection ·  **Scope: LUNEXA-WIDE**:
keystores (`*.jks`, `*.keystore`, `*.p12`), provisioning profiles, `.env`
and `.env.*`, and `ios/Runner/GoogleService-Info.plist` are ignored
everywhere.

Two entries that look like exceptions and are not:

- **Android `google-services.json` files are committed**, in per-variant
  source sets only (`rps_duel:.gitignore:65-72`). They are client-side
  identifiers, not secrets — every value is extractable from a shipped APK,
  and the API key is restricted by package name and signing certificate. The
  ignore rule on the module-root path is a *guard*, not a secrecy measure;
  see [`mobile/environments-and-build-identity.md`](mobile/environments-and-build-identity.md) §2.
- **`apps/web/public/app-ads.txt` contains a live publisher ID** and is
  served to the open internet by design. See
  [`mobile/monetization.md`](mobile/monetization.md) §3.

**Never commit or paste transient device state**: IP addresses, ports,
device serials, or ADB pairing codes — **Evidence: VERIFIED**
(`rps_duel:docs/android-device-workflow.md:65,67`). Pairing codes in
particular are typed interactively and must not reach chat, logs, issues or
repository files.

## 6. Logging hygiene

**Evidence: VERIFIED** (`apps/web/docs/PATTERNS.md:916`) ·
**Scope: LUNEXA-WIDE**. The web form of the rule:

> **Never** log emails, IPs of users you know, raw request bodies,
> Authorization headers, Cookies, JWTs, passwords, or tokens.

The same principle governs mobile telemetry one surface over, where it is
sharper because the data leaves the device permanently. See
[`mobile/privacy-safe-telemetry.md`](mobile/privacy-safe-telemetry.md).

## 7. Documentation changes

- Stale documentation is **labelled, not silently corrected** — see
  [`README.md`](README.md), *Governance*, and the pattern at
  `rps_duel:docs/README.md:23`.
- A document that describes intent must say so. The most expensive
  documentation failure available is a document that reads as a description
  of the system while describing a plan.
- Negative claims about a product ("no accounts", "no analytics", "no ads")
  are release-truth claims, not documentation. They are governed by
  [`release-truth-and-cross-surface.md`](release-truth-and-cross-surface.md).
