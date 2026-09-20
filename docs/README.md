# Lunexa Engineering Standards

Canonical, cross-product engineering standards for the Lunexa ecosystem.

These documents are the shared source of truth for how Lunexa products are
built, released and described in public. They are surface-independent: a rule
here applies to a Flutter app and a Next.js app alike unless the document says
otherwise.

## What lives here, and what does not

| Path | Owns |
| --- | --- |
| [`working-agreements.md`](working-agreements.md) | How work is committed. |
| [`release-truth-and-cross-surface.md`](release-truth-and-cross-surface.md) | What may be claimed publicly, and when. |
| [`mobile/`](mobile/README.md) | Flutter/Android engineering standards. |

Web application standards remain in [`apps/web/docs/`](../apps/web/docs/) —
`STACK.md`, `PATTERNS.md`, `CHECKLIST.md`, `LOCAL_DEVELOPMENT.md` — and are
not duplicated here. Where a rule in this directory overlaps one of those
documents, this directory states the org-wide form and links to the web-side
recipe rather than restating it.

Product-specific material stays in its product repository. In particular:
each product's analytics event taxonomy, its store listings and Data Safety
answers, its architecture records, its reference-device matrix, and its
monetization stance.

## The evidence model

Every substantive claim in these documents carries a status, **per claim, not
per document**. A document is never wholly one status.

Status has **two independent axes**. Collapsing them is the specific error
this model exists to prevent: how well a claim is evidenced and how widely it
is meant to apply are different questions with different answers.

### Axis 1 — Evidence

How well repository evidence supports the factual claim.

| Value | Means |
| --- | --- |
| **VERIFIED** | The factual claim is directly supported by repository evidence, cited by path and — where the line is stable enough to be useful — line number. |
| **NEEDS MORE VALIDATION** | Real, but thin: an implementation with known gaps, or evidence that exists only in an uncommitted working tree. |
| **PROPOSED** | Normative intent. Nothing implements it. An owner-approved standard is legitimately **PROPOSED**, and saying so is accurate rather than weak. |

### Axis 2 — Scope

Where the claim is meant to apply.

| Value | Means |
| --- | --- |
| **LUNEXA-WIDE** | Intended to bind every product. |
| **PRODUCT-SPECIFIC** | Belongs to one product. The product repository remains the authority, and this document is a pointer to it, never a second source of truth. |

### What VERIFIED does and does not mean

**VERIFIED means the factual claim is supported by repository evidence. It
does not mean a pattern proven in one product is already proven reusable
across all Lunexa products.**

A single implementation establishes the fact and serves as a reference.
Reusability is a separate, scoped judgement, and the second consumer is where
a pattern's assumptions actually get tested. A rule can therefore be
**Evidence: VERIFIED** in one product and still carry real risk as a
**LUNEXA-WIDE** standard — both things are stated, separately.

Equally, a normative standard the owner has approved is not made stronger by
being written as an implementation fact. It is recorded as **PROPOSED** with
**LUNEXA-WIDE** scope, and it binds because it was approved, not because
something already implements it.

### How status is written

- Where scope is the point — single-product evidence, or a product's own
  decision — both axes are written out:
  **Evidence: VERIFIED** (`rps_duel`) · **Scope: LUNEXA-WIDE**.
- Elsewhere a single evidence value appears alone, and scope defaults to
  **LUNEXA-WIDE**.
- A claim with no citation is **PROPOSED**.

### Two further consequences

- Prose is not evidence. "The architecture document says we isolate
  environments" does not make environment isolation **VERIFIED**; a build
  file that does it does.
- A verified *absence* is still **VERIFIED** — "no mobile repository has a
  `.github/` directory" is a cited fact. The badge describes the evidence,
  not whether the finding is welcome.

### Statuses outside the evidence vocabulary

Two labels appear in these documents and are **not** evidence values. They
mark open decisions rather than claims:

- **UNRESOLVED / DEFERRED** — an owner decision that has deliberately not
  been made. No standard here depends on it.
- **OPEN CONFLICT** — two sources disagree and neither can be cited as
  authoritative until an external check settles it.

## Citation notation

Mobile products live in their own repositories, outside this one. Citations
use `<repo>:<path>[:<line>]`:

    rps_duel:android/app/build.gradle.kts:77
    chess-rescue:docs/android-layout-qa.md:12
    quietly_media_saver:lib/core/net/redirect_policy.dart:45

Unprefixed paths are relative to this repository.

Evidence drawn from an **uncommitted working tree** is labelled as such and
is never rated higher than **NEEDS MORE VALIDATION**. Uncommitted evidence
can be withdrawn by its author without a trace in history, so it cannot carry
the same weight as a commit. It is still evidence: see
[`release-truth-and-cross-surface.md`](release-truth-and-cross-surface.md)
§1 on identifying the exact tree a claim was read from.

## Governance

**Adding a standard.** Write the claim, cite the implementation, pick the
badge honestly. A rule nobody has implemented is welcome here — as
**PROPOSED**, in the document where it will eventually live.

**Promoting a standard.** A claim moves **PROPOSED → NEEDS MORE VALIDATION →
VERIFIED** when an implementation exists to cite. Scope is reviewed
separately: evidence from a second product is what moves a
**PRODUCT-SPECIFIC** pattern toward **LUNEXA-WIDE**. Record the promotion in the
changelog below with the evidence that justified it. Promotion is never
retroactive: a rule becomes binding from the date it is promoted, not from
the date it was first written down.

**Amending a standard.** Supersede and label; never silently edit. This is
the pattern `rps_duel:docs/README.md` already uses — a "known divergences"
table that says, explicitly, *do not "fix" the code to match these
documents*. Historical release facts are append-only: what
[`/updates`](../apps/web/src/seo/updates.ts) said was public on a given date
is a record, not a draft.

**Diverging from a standard.** A product repository should document
deliberate departures locally and link back to the canonical standard. A
divergence is a decision, not a violation; an undocumented departure is the
violation.

No specific file is mandated. A root `DIVERGENCES.md` is one mechanism —
**PROPOSED**; it is named in the new-repo template at
`apps/web/docs/CHECKLIST.md:472`, but no repository has created one, so the
convention is intent rather than practice.

**Scope limits.** These documents do not mandate CI, do not decide who owns
legal text (see
[`release-truth-and-cross-surface.md`](release-truth-and-cross-surface.md)
§5, marked UNRESOLVED), and do not describe a shared starter template —
[`mobile/README.md`](mobile/README.md) §4 explains why extraction is
premature.

## External platform dependencies

Several standards here rest on current third-party behaviour that no amount
of repository evidence can permanently prove. They are qualified in the text
where they appear, and collected here so they can be re-checked as a set:

| Dependency | Where it matters |
| --- | --- |
| `flutter_tools` uninstalls on signature mismatch during install | The entire justification for `.dev` application-ID separation |
| The `google-services` Gradle plugin resolves per-variant source sets with no silent fallback | The Firebase project-isolation property |
| The Firebase SDK merges `AD_ID` / AdServices permissions into the manifest | The `tools:node="remove"` precedent |
| `AD_ID` presence implies a "Device or other IDs" Play Data Safety declaration | The privacy-by-construction rationale |
| AdMob's crawler requires `text/plain` at the apex for `app-ads.txt` | The `src/proxy.ts` matcher exclusion |
| The Play listing exposes "Updated on" but not reliably a version | Why changelog entries key on a date |
| Consent Mode v2 / EU enforcement | Required before any ads or consent work |

None of these has been checked against vendor documentation as part of
writing these documents. Each is a flag for verification before the rule that
depends on it is treated as permanent.

## Changelog

Promotions and amendments, newest first.

### 2026-09-21 — initial canonization

Created from a read-only audit of four repositories at these commits:
`lunexa-web@b81d6ba`, `rps_duel@9606248`, `chess-rescue@34a4ead`,
`quietly_media_saver@a6abe3b`. No product repository was modified.

**Evidence: VERIFIED**, evidenced in every product, **Scope: LUNEXA-WIDE**:

- Dev/prod application-ID separation.
- Never disturb the production install; the `Uninstalling old version...`
  tripwire.
- Wireless-debugging hygiene.
- What hot reload may never substitute for.

**Evidence: VERIFIED** in a single product, **Scope: LUNEXA-WIDE** —
the fact is cited; ecosystem reusability is a separate judgement:

- Per-source-set Firebase configuration with an empty module-root fallback
  (`rps_duel`).
- Separate Firebase projects for dev and production (`rps_duel`).
- Analytics facade, no-op by default, vendor SDK in one adapter file,
  telemetry failures contained (`rps_duel`).
- Single event vocabulary, locked by exact-set test (`rps_duel`).
- Declaring no capability the product does not exercise — `AD_ID` removal
  (`rps_duel`).
- Input and failure-truth primitives (`quietly_media_saver`).
- Public changelog requires verified public availability (`lunexa-web`).
- Public legal URLs are a frozen cross-surface contract
  (`quietly_media_saver` ↔ `lunexa-web`).
- Commit hygiene, single author identity, no AI attribution — rule stated in
  `lunexa-web`, practised ecosystem-wide, with historical exceptions.

**Evidence: VERIFIED**, **Scope: PRODUCT-SPECIFIC** — the gate binds, the
thresholds do not:

- Responsive/short-screen and accessibility thresholds (`chess-rescue`).

**Evidence: NEEDS MORE VALIDATION**: asset provenance and licensing;
deterministic app-owned assets.

**Evidence: PROPOSED**: explicit runtime environment identity; the
prohibited-by-default telemetry value policy; automated privacy-safe *value*
validation; everything in
[`mobile/monetization.md`](mobile/monetization.md); build gates as gates
rather than conventions.

**UNRESOLVED / DEFERRED**: ownership of legal prose.

**OPEN CONFLICT**: RPS Duel's public release state.
