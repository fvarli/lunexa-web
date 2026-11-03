<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Privacy release status and publication gates

Org-wide rules live in [`docs/working-agreements.md`](../../docs/working-agreements.md) (§2, publishing) and [`docs/release-truth-and-cross-surface.md`](../../docs/release-truth-and-cross-surface.md) (public claims). This section applies them to the web privacy pages in `src/seo/content.ts`.

## Production baseline

At the time of this update (2026-11-03), the verified production commit is `54554230370d3df11df0a1c217a710458f3633b2` (reported by `/api/health`). This is a record, not a fixed value: every deploy moves it. Check `/api/health` and `origin/main` before relying on it.

## Release status (as of 2026-11-03)

| Workstream | Status |
|---|---|
| RPS Duel Patch A v3 | CLOSED — production verified |
| Chess Rescue 1.4.0 privacy | PUBLISHED — version-labelled; 1.4.0 app not yet released |
| RPS Duel Patch B / 1.0.6 | PENDING — not published |
| Quietly W7 | PENDING — not published |

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
