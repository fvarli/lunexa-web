<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Privacy release status and publication gates

Org-wide rules live in [`docs/working-agreements.md`](../../docs/working-agreements.md) (§2, publishing) and [`docs/release-truth-and-cross-surface.md`](../../docs/release-truth-and-cross-surface.md) (public claims). This section applies them to the web privacy pages in `src/seo/content.ts`.

## Production baseline

At the time of this update (2026-11-03), the verified production commit before this release was `0a6ee6eb725b4d16bcdb31ac7240a0d056418fd5`, reported by `/api/health` (earlier: `c75b03dbf65cf66f30c572890c72daf0dae3c3ff`, `2089aba154ef35220e711c227da4684baec39b94`). This is a record, not a fixed value: every deploy moves it. Check `/api/health` and `origin/main` before relying on it.

## Release status (as of 2026-11-03)

| Workstream | Status |
|---|---|
| RPS Duel Patch A v3 | CLOSED — production verified |
| Chess Rescue 1.4.0 privacy | PUBLISHED — version-labelled; per the mobile D-CR-SKIP14 record, 1.4.0 is never uploaded and its consent-timing change first reaches players in 1.5.0 |
| RPS Duel 1.0.6 privacy (Patch B) | PUBLISHED on the web — version-labelled; the 1.0.6 Google Play release is not verified as published |
| Quietly 1.2.0 privacy (W7) | PUBLISHED on the web — version-labelled; the 1.2.0 Google Play release is not verified as published |
| Chess Rescue 1.5.0 privacy | PUBLISHED on the web — labelled "from version 1.5.0" / "1.5.0 and later" (full-screen ad, optional rewarded help, one local item); the 1.2.1, 1.3.0 and 1.4.0 text stays; the 1.5.0 Google Play release is not verified as published |
| RPS Duel 1.1.0 privacy (R-REL-12) | PUBLISHED on the web — labelled "version 1.1.0 and later" (region-dependent usage statistics, match-end full-screen ad, matches/level/XP on the device); the 1.0.5 and 1.0.6 text stays; the 1.1.0 Google Play release is not verified as published |
| RPS Duel 1.0.7 | SUPERSEDED — 1.0.7 and 1.1a ship together as 1.1.0 (R-REL-12); no separate 1.0.7 text |
| Quietly 1.2.1 privacy (D-ANL-1 §6 P3) | PUBLISHED on the web — labelled "1.2.1 and later" (region-dependent usage statistics, region signals, notice-shown flag); the 1.1.0 and 1.2.0 text stays; the 1.2.1 Google Play release is not verified as published. Product card and Terms (handoff W1′) not changed |

Owner decisions recorded for these releases:

- **D-WEB-NOW:** the RPS 1.0.6 and Quietly 1.2.0 disclosures, then the Chess Rescue 1.5.0 and RPS 1.1.0 disclosures, and then the Quietly 1.2.1 disclosures, are published web-first, labelled by version, before the Google Play releases. Earlier-version text stays, and no page may say any of these versions is available. A web deploy does not verify that a mobile release is published. Quietly W7 (1.2.0) stays published next to the 1.2.1 text.
- **D-CONTROLLER:** closed. No data-controller block, including in the Chess 1.5.0, RPS 1.1.0 and Quietly 1.2.1 text; the existing "Lunexa Games" identity and `hello@uselunexa.com` contact stay. No legal entity, postal address or legal basis is stated.

Update this table in the same change that moves a workstream.

## Privacy publication rule

- The public privacy policy must accurately describe the currently released application version.
- Future-version behavior must not be presented as current behavior. Version-labelled preparation for an unreleased version stays off `main` until that release is authorized.
- When a new application version is actually released, its privacy disclosures are updated and verified as part of that release, with the effective date set on the publication day.

Keep these four states separate. One does not imply another:

| State | Meaning |
|---|---|
| Current live-version disclosures | What the deployed site says about versions players can install today. |
| Future-version preparation | Drafted, tested text for an unreleased version. Not published. |
| Published website change | Merged to `main`, deployed, and verified on the live site. |
| Pending Play Console declaration | A store declaration (for example Data Safety) that is saved or planned but not yet published by the owner. A website change does not publish it. |

## Product claims outside the privacy pages

Work cards, the homepage, landing and support pages, Terms, meta, Open Graph and structured data describe only the app version live on Google Play (as of 2026-11-03: RPS Duel 1.1.0, Chess Rescue 1.5.0, Quietly 1.2.0). D-WEB-NOW covers version-labelled privacy text only; it never lets marketing copy describe an upcoming version (for example Quietly 1.2.1's region-dependent usage statistics) as current.

- No absolute "no ads", "no analytics", "no telemetry", "no tracking", "offline-only" or "anonymous" claims while the live app contradicts them. Offline *gameplay* may be stated as such.
- A summary of ads or usage statistics links the app's privacy policy.
- Dated release notes in `src/seo/updates.ts` describe their own version and are not rewritten.
- `tests/e2e/product-claims.spec.ts` enforces this; update it with the copy.

## Authorization rule

- This repository is public, and a push to `main` triggers CI and then the production deploy.
- A local commit does not authorize publication.
- Push, merge to `main`, deployment and Play Console publication each require explicit owner authorization for that specific scope.
- Never infer publication authorization from passing tests or a completed implementation.

# Dependency maintenance: Sentry `glob` overrides

`package.json` `overrides` pin `glob` to `^14.0.2` under `@sentry/bundler-plugin-core` and `@sentry/bundler-plugins` only. They remediate GHSA-3g3m-2fjr-6pw4 (glob) and GHSA-g3hv-75wg-m249 (minimatch), which Sentry's own dependency ranges still pull in. They are a temporary compatibility measure, not a permanent pin.

Remove them only when Sentry's own published dependency ranges resolve to patched versions (`glob` ≥ 14.0.2, `minimatch` ≥ 11.0.1). A newer Sentry release existing is not enough. Before removing:

1. Remove the overrides on a branch and regenerate the lockfile.
2. Verify the resolved tree: `npm ls glob minimatch --omit=dev` and the lockfile entries.
3. From a clean `npm ci`, run `npm audit --omit=dev --audit-level=moderate`, `npm run build`, `npx tsc --noEmit`, `npm run lint` and the full Playwright suite.
4. Confirm Sentry still works: `next.config.ts` and `src/instrumentation*.ts` unchanged, `Sentry.init` and `onRequestError` present, Sentry code in the client bundle.

If any step fails, keep the overrides. Never weaken or bypass the audit gate to make a removal pass.
