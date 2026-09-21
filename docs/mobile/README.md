# Lunexa Mobile Standards

Flutter/Android engineering standards for Lunexa products, canonized from
what `rps_duel`, `chess-rescue` and `quietly_media_saver` actually do.

Read [`../README.md`](../README.md) first for the evidence model and the
citation notation — every claim below carries a **VERIFIED** / **NEEDS
VALIDATION** / **PROPOSED** badge, and the badges are the point.

---

## 1. The documents

| Document | Owns |
| --- | --- |
| [`environments-and-build-identity.md`](environments-and-build-identity.md) | Build-time identity: application IDs, per-variant configuration, namespace conventions. |
| [`analytics-architecture.md`](analytics-architecture.md) | The telemetry *mechanism* — facade, adapter, vocabulary file, test lock. Never the vocabulary itself. |
| [`privacy-safe-telemetry.md`](privacy-safe-telemetry.md) | What may enter an event, and what the app may declare it can do. |
| [`device-and-release-gates.md`](device-and-release-gates.md) | What must pass before a release: device workflow, responsive/a11y/visual gates, asset provenance, signing verification. |
| [`input-and-failure-truth.md`](input-and-failure-truth.md) | Untrusted input, owned network behaviour, and failures the user can act on. |
| [`monetization.md`](monetization.md) | Intent only. Almost entirely **PROPOSED**, and says so on every claim. |

Two boundaries are worth stating because they are easy to cross by
accident:

- **`analytics-architecture.md` owns mechanism; the product repo owns
  vocabulary.** The facade transfers. The event names do not — see §3.
- **`privacy-safe-telemetry.md` is an engineering rule.** Who owns the text
  of the privacy policy is a release concern and lives in
  [`../release-truth-and-cross-surface.md`](../release-truth-and-cross-surface.md)
  §5, where it is currently **UNRESOLVED**.

## 2. How a product consumes these standards

1. **Read them; do not copy them.** A product repo links to the canonical
   document rather than restating its reasoning. Restated reasoning drifts.
2. **Keep the product-specific values at home.** Each repo's device-workflow
   document keeps its own application IDs, reference devices and per-screen
   test matrix, and links here for the shared *why*.
3. **Record deliberate departures.** Document them locally and link back to
   the canonical standard. A documented divergence is a decision; an
   undocumented one is a defect. No specific filename is required — a root
   `DIVERGENCES.md` is one **PROPOSED** mechanism, and no repository has
   created one.
4. **Carry an entrypoint.** A product repository holds an `AGENTS.md` naming
   these documents by URL, plus a one-line `CLAUDE.md` bridging to it. That
   pair is what makes the standards discoverable to a session that has never
   been told they exist — without vendoring them. See
   [`../README.md`](../README.md), *Adoption*, for what the entrypoint may and
   may not restate. **Evidence: PROPOSED** — no mobile repository carries one
   yet.

### What stays in the product repository, always

Its analytics event taxonomy and the measurement questions behind it; its
store listings, screenshots and Data Safety answers; its architecture and
divergence records; its reference-device matrix; its monetization stance;
its keystores, package IDs and Firebase project IDs.

## 3. What transfers, and what must never be copied

**Transfers (mechanism):** the analytics facade and its no-op default; the
vendor-adapter boundary; the event-vocabulary test harness; the `.dev`
suffixing approach including the `profile` timing trap; the URL and redirect
primitives for any product taking external input; the two-layer failure
taxonomy shape.

**Never copied (product semantics):** RPS Duel's seven events and two user
properties — they are duel semantics and mean nothing elsewhere; Chess
Rescue's board-sizing formula, palette and interaction language; Quietly's
URL rules, redirect bounds and error taxonomy *as product decisions*; any
product's monetization stance; any legal or store text; package IDs,
Firebase project IDs, keystores, ad unit IDs.

The event taxonomy is the highest copy-paste risk in the ecosystem. RPS
measures rounds and difficulty; Chess's questions are about completion
curves and episode drop-off; Quietly's would be about link-shape success and
failure taxonomy. Nothing in RPS's vocabulary answers a question either of
the others has. Each product derives its taxonomy from its own journey.

## 4. Why there is no shared package or starter yet — **Evidence: PROPOSED**

There should eventually be one. There should not be one now.

- One product has analytics at all.
- Three of the four plausible extractions have exactly one implementation,
  and one implementation is a reference, not a proven pattern.
- The two genuinely reusable pieces today are the analytics facade (near
  verbatim) and the event-vocabulary test harness — the latter being the
  highest-value candidate precisely because it is pure mechanism with zero
  product coupling.

**Extract after a second real consumer exists, not before.** The second
consumer is where an abstraction's hidden assumptions surface; extracting
from a single implementation risks encoding that implementation's
incidental choices as the abstraction's contract.

Not ready to extract at all: an environment abstraction (nothing has been
built to extract — see
[`environments-and-build-identity.md`](environments-and-build-identity.md)
§3); build flavors (no product uses them); privacy-safe *value* validation
(does not exist anywhere).

CI would be new capability rather than extraction: no mobile repository has
a `.github/` directory.

## 5. Current state at a glance

As observed during the audit of the commits named in
[`../README.md`](../README.md), *Changelog*. "None found" records a search
result rather than a proof of absence.

| | `rps_duel` | `chess-rescue` | `quietly_media_saver` |
| --- | --- | --- | --- |
| `.dev` application ID | yes | yes | yes |
| `versionNameSuffix` | no | yes | yes |
| Firebase / analytics | yes | none found | none found |
| Ad-serving SDK | none found | none found | none found |
| Network requests | none found | none found | yes |
| Device workflow doc | yes | yes | yes |
| CI | none | none | none |
| Committed asset licenses | none | none | none |

"None found" is current truth, not a gap to be filled. Chess Rescue's
documents affirm no analytics, tracking or advertising, and its Data Safety
answers say so. Do not plan analytics for a product that has deliberately
declined it — and note that the product repository, not this table, is the
authority for that decision.
