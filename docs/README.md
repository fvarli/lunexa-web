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
**PROPOSED**; no repository has created one, so the convention is intent rather
than practice. See *Adoption* below, *Deviation*.

**Scope limits.** These documents do not mandate CI, do not decide who owns
legal text (see
[`release-truth-and-cross-surface.md`](release-truth-and-cross-surface.md)
§5, marked UNRESOLVED), and do not describe a shared starter template —
[`mobile/README.md`](mobile/README.md) §4 explains why extraction is
premature.

## Adoption

How a repository outside this one discovers these standards, and under what
terms it may act on them.

**Evidence: PROPOSED** · **Scope: LUNEXA-WIDE.** Nothing implements this yet.
It is normative because it was adopted by owner decision on 2026-09-21, not
because of its evidence status.

### Normative force is a governance property, not an evidence value

The evidence axis describes how well repository evidence supports a factual
claim. It does not by itself decide whether a rule binds. A rule here binds
because it was adopted through the governance process above; its badge tells a
reader how well evidenced it is, not how obligatory it is.

A **VERIFIED** claim can be a pure observation that obliges nothing — "no mobile
repository has a `.github/` directory" commands no one. An owner-approved
**PROPOSED** rule can be fully binding. Do not infer obligation from a badge.

### The repository-local entrypoint

A consuming repository carries a minimal entrypoint rather than a copy of these
documents. Copies drift; this directory exists because they do.

| File | Holds |
| --- | --- |
| `AGENTS.md` | The entrypoint: product identity, the references below, the reconciliation stamp, the offline safety echo, an index of the repository's own authorities, and the reporting contract. |
| `CLAUDE.md` | One line — `@AGENTS.md`. A bridge carrying no rules of its own, so it has nothing that can drift. |

Two files rather than one because the consumers differ: a tool that auto-loads
`CLAUDE.md` does not auto-load `AGENTS.md`, and the reverse is equally true. The
pattern is already in use at `apps/web/CLAUDE.md`.

**These two files are the complete machine-discovery mechanism.** A pointer from
the consuming repository's `README.md` is a human-discoverability enhancement:
optional, owner-approved, and added separately. No validation of the entrypoint
may depend on it.

The entrypoint carries pointers, not reasoning. Stack descriptions, build
commands, coding conventions and architecture summaries already live in the
consuming repository and are not restated in it.

### Reference model

The authority of record is this repository's `main` branch, referenced by URL:

    https://github.com/fvarli/lunexa-web/blob/main/docs/README.md

A consuming repository does not pin a commit. Pinning does not prevent
staleness — it relocates it from the documentation to the pointer, and then
every amendment here requires a commit in every consuming repository to
propagate, which is the cost this directory exists to avoid. A pin also makes
staleness invisible: a session reading a pinned revision believes it is current
and has no way to learn otherwise.

The entrypoint instead carries a **reconciliation stamp**:

    Canon-reviewed: 2026-09-21 · lunexa-web@d00e64a

The stamp is evidence of a review event. It is not a pin, and it confers no
authority. It exists so that drift is computable.

`main` is the authority-of-record reference **under the governance model above**,
which manages the risk of referencing a moving branch rather than eliminating
it: promotion is not retroactive, amendments supersede rather than silently
edit, and the changelog below makes movement legible.

**Drift does not block work by itself.** Where `main` has moved past a stamp,
report the drift and establish whether the sections relevant to the task
changed. A moved branch is information, not an obstruction.

### Canon access is a separate dimension from evidence

How a session reached these documents says nothing about how well evidence
supports a claim. The two compose freely, and neither may silently change the
other.

| Canon access | Means |
| --- | --- |
| `LIVE` | Fetched from `main` during the session. |
| `LOCAL-UNCONFIRMED` | Read from a local checkout, not confirmed against `main`. |
| `ECHO-ONLY` | These documents were unreachable; only the entrypoint's safety echo applied. |
| `UNAVAILABLE` | Unreachable, and the echo does not cover the task. |

All of the following are true at once, and consistently so:

    Evidence: VERIFIED · Scope: LUNEXA-WIDE
    Canon access: LOCAL-UNCONFIRMED · Canonical revision: d00e64a

A claim is not demoted because a session read a clean local or historical
revision. What is uncertain in that case is *currency*, and currency is reported
as currency.

**`LOCAL-UNCONFIRMED` is not blanket permission.** A task may proceed under it
when the task does not depend on knowing that the local revision is current.
Where currency is material — any governance, release, public-truth, destructive
or cross-repository decision — obtain `LIVE` canon, or stop and report. Do not
assume a local revision is current because it is the only one available.

`UNAVAILABLE` stops canon-governed work.
[`working-agreements.md`](working-agreements.md) §4 already sets the posture:
report it, do not infer it.

That the source is publicly readable without authentication does not guarantee
that every execution environment can reach it. Network policy and sandboxing are
independent of the source being public, which is why the states above exist.

### The offline safety echo

An entrypoint may restate a small number of **prohibitions**, so that a session
with no access to these documents still fails safe. It may never restate a
procedure. A stale prohibition costs a round trip; a stale procedure is carried
out confidently and manufactures false implementation truth.

A prohibition qualifies for the echo only if both hold:

1. its absence could cause destructive, cross-repository, release or
   public-truth, privacy or security, or comparably high-impact harm; and
2. its stale form fails safe.

The echo is explicitly non-authoritative, is superseded by these documents
wherever they are reachable, and cites the canonical section it stands in for.
It carries **no evidence or scope classification** — those are read here, so that
a promotion or reclassification cannot leave a stale copy behind.

### Two authorities, kept apart

Factual truth and decision authority answer different questions and are not one
precedence list.

**What is true** follows the four truth layers in
[`release-truth-and-cross-surface.md`](release-truth-and-cross-surface.md) §1.
No instruction creates a fact at a layer it does not own. An owner may decide
what to publish; that decision does not make a distributed artifact contain
something it does not contain.

**What will be done** is decided by the owner; then by the product repository,
for product semantics; then by these documents, for Lunexa-wide engineering
rules. Tool defaults and model priors decide nothing —
[`working-agreements.md`](working-agreements.md) §1 already claims precedence
over them.

One rule joins the two:

> **A decision may not be justified by a truth claim from a layer that does not
> support it.**

### Deviation

Specialization — narrowing a rule without contradicting it — needs no ceremony,
and is recorded wherever the product already records such values.

Contradiction needs a **product-specific deviation record**: the canonical rule,
what the product does instead, why, who decided and when, and the condition that
would end it. Its representation is not settled. A root `DIVERGENCES.md` remains
the **PROPOSED** default named above; no repository has created one, and a pilot
decides whether it survives contact with a real divergence.

### Writable scope

A session working in a product repository may write to that repository. It may
not write to this one — not these documents, and not the website. Cross-surface
findings are reported rather than applied, and the report is the channel.

## Reporting

Work done against these standards reports on **two independent dimensions**. A
task may be `CANON-FOLLOWED` and still require cross-surface review. Neither
dimension is derivable from the other, and collapsing them hides one of them.

**Evidence: PROPOSED** · **Scope: LUNEXA-WIDE.**

### A. Canon compliance — did this implementation comply?

| Verdict | Means | Requires |
| --- | --- | --- |
| `CANON-FOLLOWED` | The standard was read and applied. | The section actually read, cited. |
| `PRODUCT-SPECIALIZATION` | The standard was narrowed, not contradicted. | The canonical section, and the local document holding the value. |
| `DIVERGENCE-PROPOSED` | The standard is contradicted; owner approval pending. | Both citations, plus the deviation-record fields. |
| `CANON-CONFLICT` | **A standard in this directory** appears stale or wrong against supported reality. | Both citations, plus the truth layer supporting the contradicting reality. |

`DIVERGENCE-PROPOSED` says the product is an exception. `CANON-CONFLICT` says
the standard is out of date. The remedies are opposite — one amends a product
record, the other amends this directory — so the two are never interchangeable.

Neither is the label for a difference **between truth layers**. A source tree
containing something the public surface does not claim is a release-state
condition: not a defect in a standard, and not necessarily a defect at all,
since the gap between implementation and public truth is often simply
unreleased work.
[`release-truth-and-cross-surface.md`](release-truth-and-cross-surface.md)
§2.2 is where such a condition is recorded. A contradictory public claim becomes
a public-truth conflict only once the release or public state is independently
established — never inferred from a source tree.

The report header uses the citation notation above:

    Canon:               lunexa-web@main:docs/mobile/<file>.md §N
    Local:               <repo>:<path>:<line>
    Canon access:        LIVE | LOCAL-UNCONFIRMED | ECHO-ONLY | UNAVAILABLE
    Canonical revision:  <sha, or main@<date fetched>>
    Canon-reviewed:      <the entrypoint's stamp>
    Canon drift:         none | moved since stamp; relevant sections changed: yes/no/unknown

### B. Cross-surface impact — what else may now need attention?

Independent of A, and carried out against the surface list and the mandatory
triggers already defined in
[`release-truth-and-cross-surface.md`](release-truth-and-cross-surface.md) §4,
which is not restated here.

This adds the status vocabulary that review reports in. Each surface in that
list takes exactly one:

| Status | Means |
| --- | --- |
| `NONE` | Considered; this surface is unaffected. |
| `REVIEW` | May be affected; a human must look before release. |
| `UPDATE` | Known to need a change, and the change is identified. |
| `AFFECTED` | Known to be affected, with the required change not yet determined. |

`NONE` is a claim, not a default. §4 requires every surface to be *"either
updated or explicitly confirmed unaffected"*, and an omitted surface is neither.

The report also names which truth layer the task established — implementation or
documentation — and hands off. A session in a product repository does not act on
another surface.

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

### 2026-09-21 — adoption contract

Added *Adoption* and *Reporting* above, and a consumption step in
[`mobile/README.md`](mobile/README.md) §2. **Evidence: PROPOSED** ·
**Scope: LUNEXA-WIDE** — adopted by owner decision; no repository implements it
yet, and it is recorded as **PROPOSED** for that reason rather than weakened by
it.

Settled by this amendment:

- Canon is referenced by `main` URL, never vendored and never pinned; a
  `Canon-reviewed` stamp records reconciliation and confers no authority.
- Canon access (`LIVE` / `LOCAL-UNCONFIRMED` / `ECHO-ONLY` / `UNAVAILABLE`) is a
  dimension independent of the evidence axis. Neither changes the other.
- Normative force comes from governance, not from an evidence badge.
- Reporting has two independent dimensions: canon compliance, and the
  cross-surface impact review already defined in
  [`release-truth-and-cross-surface.md`](release-truth-and-cross-surface.md) §4,
  to which this amendment adds only a status vocabulary.
- A product-repository session may not write to this repository.

Superseded: the new-repo entrypoint template formerly at
`apps/web/docs/CHECKLIST.md` §15, which predated this directory and named no
document in it. Its web-specific guidance is retained there as web-specific; its
cross-product discovery guidance is replaced by *Adoption* above.

Deferred, unchanged: mobile CI; a shared starter; ownership of legal prose
(**UNRESOLVED**); the representation of a deviation record, for which a root
`DIVERGENCES.md` remains **PROPOSED**.

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
