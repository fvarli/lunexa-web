# Release Truth and Cross-Surface Contracts

This document owns **what may be claimed publicly, and when**.

It exists because the Lunexa ecosystem has four different kinds of truth that
are routinely confused for one another, and because confusing them has
already produced a public statement that is one release away from being
false in three languages (§2.2).

---

## 1. The four truth layers

**Evidence: VERIFIED** — each layer is separately evidenced below ·
**Scope: LUNEXA-WIDE**

| Layer | Question it answers | Authority |
| --- | --- | --- |
| **Implementation truth** | What does the code do? | The exact source tree / revision being evaluated |
| **Documentation truth** | What do we say the code does? | The repo's own docs |
| **Release truth** | What has actually been built, signed and distributed? | The build artifact plus the distribution/release system |
| **Public truth** | What can a user read and install today? | The current store/distribution surface plus the website |

**Implementation truth is a property of a specific tree, not of `HEAD`.**
Uncommitted or concurrent working-tree state is also implementation
evidence. When it is used, **identify the tree it was read from** — commit,
branch and whether the file was tracked — because uncommitted evidence can be
withdrawn without a trace in history and is rated accordingly
([`README.md`](README.md), *The evidence model*).

**Release and public truth are stated in terms of the distribution system,
not one vendor.** Google Play Console is the current Android example
throughout this document, because Android is what Lunexa currently ships. No
guidance for any other platform is implied or invented here.

These fail independently, and a change to one does not propagate to the
others. The rule:

> **A claim may only be made on the surface whose authority supports it.**

Implementation truth cannot license a public claim. Documentation truth
cannot license anything at all.

### 1.1 Source tree ≠ successful build ≠ test track ≠ production

**Evidence: VERIFIED**, with the discipline demonstrated in three
repositories · **Scope: LUNEXA-WIDE**:

- `lunexa-web`: *"Versions and dates always come from the store listing,
  never from the mobile repository — a checked-in `pubspec.yaml` is routinely
  ahead of what users can actually install."*
  (`apps/web/src/seo/updates.ts:16-18`)
- `quietly_media_saver:docs/ARCHITECTURE.md:618` heads a whole architectural
  pass **"(LOCAL, UNRELEASED)"**, with a release-state block naming the
  Closed Testing build, and notes that `pubspec.yaml` is deliberately
  unchanged because *the version is bumped only when an upload is actually
  prepared*.
- `rps_duel:docs/README.md:23` separates current operational guides from a
  historical launch pack and carries a known-divergences table asserting
  that the repository, not the document, is authoritative.

**A version number in a repository is not a release.** It is an intention.

## 2. Two live disagreements

Both are recorded here rather than resolved, because resolving either
requires reading the release system — currently the Play Console — which no
repository can substitute for. The first is an **OPEN CONFLICT** between two
sources; the second is a dated risk in currently-accurate copy.

### 2.1 Is RPS Duel 1.0.4 public? — **OPEN CONFLICT**

- `rps_duel:README.md:7` — *"Status: live on Google Play Production ·
  v1.0.4+5"*.
- `apps/web/src/seo/updates.ts` — the public build is the Jul 7 2026
  release, and the entry explicitly excludes the achievement rename, which
  is a 1.0.4 change.

Both cannot be true. Until the Console settles it, **neither may be cited as
verified release truth**, and no `/updates` entry may be added on the
strength of either. Guessing has a coin-flip chance of making the public
changelog wrong — precisely the failure the changelog rule exists to
prevent.

### 2.2 The analytics / privacy-copy boundary — **dated risk**

The public copy described below is **accurate today**. The risk is that it
becomes inaccurate on a specific future event, with no mechanism currently
attached to that event.

The commit that added Firebase Analytics to RPS Duel (`rps_duel@9606248`)
left the repository's own README and privacy policy still saying analytics
does not exist. `rps_duel:docs/README.md:30` already flags this: those files
*"still say 'no analytics' and are stale — tracked separately."*

The public consequence is larger. `apps/web/src/seo/content.ts:1200` tells
every visitor, in English, Turkish and Spanish, that RPS Duel:

> does not create accounts, does not contact a server, does not show ads, and
> does not include analytics or crash reporting

That is **true of the shipped build today** and becomes **a false public
privacy claim in three languages the moment an analytics-bearing build
reaches production**.

> **Gate:** the website copy, the Play Data Safety declaration and the
> product privacy policy must be updated in the same release as the first
> analytics-bearing public build — not after it.

`apps/web/src/seo/content.ts:1185` already states the intended discipline:
every negative claim is verified before it ships. The mechanism is a review,
and the review did not happen for `9606248`. The rule is understood and
ungated.

## 3. The public changelog rule

**Evidence: VERIFIED** · **Scope: LUNEXA-WIDE** — and mechanized: the
clearest example in the ecosystem of a rule enforced by type shape rather
than by discipline.

> An entry exists **only** for a verified public store release, or for a
> product becoming publicly available for the first time. Website work —
> support pages, legal edits, product pages, SEO, infrastructure — never
> earns an entry, and neither does development that has not shipped to
> users. (`apps/web/src/seo/updates.ts:6-11`)

What makes it hold:

- **There is no `draft`, no `status`, no `publishAt`**
  (`apps/web/src/seo/updates.ts:12-14`). An unreleased change has nowhere to
  be staged, so it cannot leak onto the page. The property is enforced
  structurally rather than by review.
- **One constant gates every surface.** `HAS_PUBLISHED_UPDATES`
  (`apps/web/src/seo/updates.ts:177`) gates the route
  (`apps/web/src/app/[locale]/updates/page.tsx:144`, via `notFound()`), the
  sitemap (`apps/web/src/app/sitemap.ts:23`) and the footer link
  (`apps/web/src/app/[locale]/layout.tsx:110`). There is no state in which
  three of the four agree.
- **Versions come from the store listing.** Where the listing exposes an
  "Updated on" date but no version, the entry is keyed on the date and the
  version is deliberately omitted rather than sourced from `pubspec.yaml`.

Generalize this shape, not just the rule: *make the unwanted state
unrepresentable rather than forbidden.*

## 4. Cross-surface impact review

**Evidence: VERIFIED** that the requirement is articulated
(`rps_duel:lib/core/analytics_events.dart:1-4`;
`chess-rescue:docs/master-release-roadmap.md:377-378`).
**Evidence: PROPOSED** that it is performed as a workflow — nothing gates it,
and §2.2 records an occasion when it was not performed.
**Scope: LUNEXA-WIDE.**

Before a release reaches the public, every surface below is either updated
or explicitly confirmed unaffected:

| Surface | Where |
| --- | --- |
| Product page | `apps/web/src/seo/content.ts` |
| Privacy policy | `apps/web/src/app/[locale]/privacy/<product>/` |
| Terms | `apps/web/src/app/[locale]/terms/<product>/` |
| Support / contact copy | `apps/web` |
| Public changelog | `apps/web/src/seo/updates.ts` — §3 rules apply |
| Play store listing | Play Console |
| Play Data Safety declaration | Play Console |
| Screenshots and store assets | Product repo |
| Localization (en / tr / es) | All of the above, per locale |
| Analytics / ads / consent posture | Product repo + all public copy |

Two changes make this review **mandatory rather than advisory**:

1. **Adding, removing or changing telemetry.** The event vocabulary is also
   what the privacy policy and the Data Safety declaration have to describe
   (`rps_duel:lib/core/analytics_events.dart:1-4`).
2. **Adding an ads, crash-reporting or attribution SDK.** Chess Rescue's
   roadmap names the cost precisely: *"would require Data Safety re-filing,
   ID-for-advertising, privacy redo"*
   (`chess-rescue:docs/master-release-roadmap.md:377`).

The locale multiplier is the part that gets missed: a privacy claim exists
three times, and fixing one instance fixes one third of the problem.

## 5. Ownership of legal text — **UNRESOLVED / DEFERRED**

> **Status: deliberately not decided.** This section records the conflict
> and is not a standard. No rule in this repository depends on its
> resolution.

Four mutually incompatible stances are in force today, two of them inside
the same repository:

| Source | Stance |
| --- | --- |
| `quietly_media_saver:lib/core/legal/legal_links.dart:9-11` | *"Legal text itself is NOT duplicated in this repository: the site is the single source of truth."* |
| `quietly_media_saver:docs/release/README.md` | *"Single source of truth for Quietly's release identity, policy…"* — the same repo, the opposite claim. And `docs/release/PRIVACY_POLICY.md` does exist, so text **is** duplicated there. |
| `rps_duel:docs/README.md` | `privacy_policy.md` is a *"repository copy of the published privacy policy. Keep in sync with the live page."* — a declared mirror. |
| `chess-rescue:docs/` | Four policy files: `privacy-policy.md`, `-en`, `-tr`, `-es`. |
| `lunexa-web` | `apps/web/src/seo/content.ts` — the actually published artifact, in all locales. |

Only the last is unambiguous: whatever else exists, `lunexa-web` is what a
user reads. Until ownership is decided, the operative rule is the narrow one
that follows from that fact alone:

> **A change to legal text is not shipped until it is live on the website**,
> because that is the copy the store listing and every installed binary
> point at.

Unresolved duplication is how translated legal copy silently diverges. This
should be decided, and the decision recorded here.

## 6. Public legal URLs are a frozen contract

**Evidence: VERIFIED** · **Scope: LUNEXA-WIDE** — and this contract has
already shipped inside a binary.

`quietly_media_saver:lib/core/legal/legal_links.dart` builds legal URLs from
`https://uselunexa.com` plus a locale segment and a product slug:

    https://uselunexa.com/privacy/quietly
    https://uselunexa.com/tr/privacy/quietly
    https://uselunexa.com/es/privacy/quietly

The routes exist: `apps/web/src/app/[locale]/{privacy,terms}/{quietly,rps-duel,chess-rescue}/`.

Two rules follow:

1. **Renaming or removing one of these routes breaks installed apps.** A
   shipped APK cannot be updated to follow a redirect it does not know
   about; the user taps Privacy and gets a 404. These paths are a public API
   with binary consumers, and the website side currently documents that
   nowhere. Treat them as frozen; if one must change, the old path keeps
   working.
2. **Legal links are always product-specific, never the generic page** —
   `quietly_media_saver:docs/release/RELEASE_IDENTITY.md:18` states it
   explicitly, and all three product route pairs exist.

## 7. Ecosystem identity conventions

**Evidence: VERIFIED** as documented · **Scope: LUNEXA-WIDE** — but
currently owned by a single product repository.

`quietly_media_saver:docs/release/RELEASE_IDENTITY.md` is the only written
record of several ecosystem-wide facts: the `com.lunexa.*` namespace root
and its flat `com.lunexa.<app>` scheme, the legacy `com.lunexa.games.*`
prefix, publisher naming, `hello@uselunexa.com` as the ecosystem-wide
monitored support address, the canonical URL shape, and versioning
conventions.

It also records a brand risk worth surfacing here: **`com.lunexa.*` is not
the reverse-DNS of a domain Lunexa owns** — `uselunexa.com` is, `lunexa.com`
is not (`RELEASE_IDENTITY.md:28-32`). The application ID is permanent after
first publish.

That content is ecosystem policy living inside one product repository. The
identity half of it is restated, with attribution, in
[`mobile/environments-and-build-identity.md`](mobile/environments-and-build-identity.md)
§4; the URL half in §6 above. The original is left in place and unmodified.

## 8. Amending release history

Historical release facts are **append-only**. What `/updates` said was
public on a given date is a record of what was claimed, and claims are
exactly the thing this document exists to make accountable.

Corrections are added, labelled and dated. They are never applied by editing
the original into agreement with the present.
