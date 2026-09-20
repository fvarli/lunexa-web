# Input and Failure Truth

How a Lunexa product treats input it did not create, and how it reports
failure to the person in front of it.

**Evidence: VERIFIED** throughout, sourced from `quietly_media_saver` — the
only product that currently makes network requests or accepts arbitrary user
input.

**Scope** differs by section, and is stated per section:

- §§1–3 apply to any product with a network or untrusted-input surface.
  Their specific values — which schemes, how many hops — are Quietly's
  product boundary and are **PRODUCT-SPECIFIC**.
- §§4–6 are **LUNEXA-WIDE**. They constrain how any product reports results
  and failures, whether or not it has a network layer, and §7 records that
  `chess-rescue` reached §6 independently.

---

## 1. One shared contract for "is this input actionable?"

**Evidence: VERIFIED** (`quietly_media_saver:lib/core/net/url_contract.dart`)
· **Scope: LUNEXA-WIDE** for the shape; the rule values are
**PRODUCT-SPECIFIC**.

One function answers the question, and every caller asks it — in Quietly's
case both the clipboard suggestion and the analyzer. The reason it exists is
the important part: **the two previously disagreed**, so the same string was
actionable in one place and not in another.

Quietly's rules, as a worked example:

| Rule | Behaviour |
| --- | --- |
| Length | Bounded at 2048 bytes (`kMaxUrlLength`, `:41`) |
| Scheme allowlist | `http` / `https` only, case-insensitive (`:155-157`) |
| Rejected schemes | `javascript:`, `data:`, `file:`, `ftp:`, `content:` … — refused **without fetching** |
| Whitespace / control characters | Whole-string rejection — whitespace, C0, DEL, C1 |
| Credentials | `user:password@` refused |
| No scheme | Accepted **only** when the string starts with something host-shaped, then normalized to `https://` |

Two properties generalize past URLs:

- **Refuse before acting.** A rejected scheme is refused *without a fetch*.
  Validation that happens after the side effect is not validation.
- **Reject the whole string, not the bad character.** Sanitizing input by
  removing what offends produces a value the user never typed, which the
  product then acts on. Refusal is honest; repair is a guess.

## 2. Canonicalize exactly once, at the boundary

**Evidence: VERIFIED** · **Scope: LUNEXA-WIDE** — `AppFlow.submitUrl`
canonicalizes once, and the analyzing
screen, the HTTP probe and the history/dedupe key all share that one string.

The failure this prevents is the quiet kind: two components that each
normalize slightly differently produce two keys for one resource, and the
dedupe silently stops working. There is no error and no crash — only a
history with duplicates in it.

**Scheme-less input is upgraded to `https://` and that is the only
transformation applied.** Upgrade-only, never downgrade. The comment at
`url_contract.dart:118-120` frames it precisely: the upgrade is *a reading
of the input rather than a rewriting of it*.

> **Rule:** normalize once, at the entry point, and pass the canonical value
> onward. A component that re-normalizes is a component that can disagree.

## 3. Own the redirect chain explicitly

**Evidence: VERIFIED**
(`quietly_media_saver:lib/core/net/redirect_policy.dart:10-21,42,45,88-118`)
· **Scope: LUNEXA-WIDE** for the shape; the bounds are
**PRODUCT-SPECIFIC**.

`followRedirects` is forced **off on every hop**, and callers cannot opt
back in. The module owns the loop, and therefore owns every property of it:

| Property | Behaviour |
| --- | --- |
| Hop limit | At most 5 (`kMaxRedirects`); the next fails as `tooMany` |
| Loops | A visited-set; a repeat fails as `loop` |
| Downgrade | `https → http` is **refused** as `insecureDowngrade` |
| Credentials | A credential-bearing `Location` is refused |
| Malformed target | Fails as `badLocation` |
| Bodies | Drained on every intermediate hop |
| Final URL | Carried **explicitly**, not read back from `response.request` |

The last row is the subtle one, and the code comment gives the reason: the
chain *is a fact this module knows for certain*. Reading the final URL back
off the client's own bookkeeping asks a library to remember something the
caller already knows — and the answer is only as trustworthy as the
library's redirect handling, which has just been deliberately switched off.

**The generalizable rule:** when a security property depends on how a
library handles something, handle it yourself. Default redirect-following
turns a bounded operation into an unbounded one controlled by a remote
server.

## 4. No fabricated fallback behaviour

**Evidence: VERIFIED** · **Scope: LUNEXA-WIDE** — enforced by a source-level
regression test rather than by convention.

Quietly's sample analyzer and its placeholder-byte path were **deleted from
`lib/`, not unwired**. Two regression tests then *read the shipped source*
and assert that neither the sample class names nor the placeholder-byte
marker appear anywhere in `lib/`.

Source-scanning tests are a blunt instrument. They are also the only kind
that survives someone re-adding the mechanism in a different shape, because
they assert about the codebase rather than about a call path.

Three rules of the same family:

- **Never fabricate data to keep a flow moving.** A placeholder that
  reaches the user is indistinguishable, to the user, from a result.
- **Delete, do not disable.** Unwired code is a fallback waiting for a
  future maintainer to helpfully reconnect it.
- **Assert established facts only.** No MIME family fallback — an
  unrecognized `video/x-flv` is refused, not renamed to `.mp4`. An unknown
  duration is omitted rather than defaulted. Byte counts are measured,
  *never estimated*.

An omitted field is a truthful statement of ignorance. A defaulted field is
a false statement with a plausible value.

## 5. Internal failure taxonomy finer than the user-facing one

**Evidence: VERIFIED** (`quietly_media_saver:docs/ARCHITECTURE.md` §F — a
documented internal→user-facing mapping table, with each mapping reasoned) ·
**Scope: LUNEXA-WIDE** for the two-layer shape; the specific kinds are
**PRODUCT-SPECIFIC**.

Internal precision deliberately exceeds what a person is shown. The mapping
is explicit and written down, so collapsing many internal kinds into one
message is a **decision**, not an accident of which `catch` ran first.

The reasoning that makes the case:

> A redirect failure is not a network failure… Reporting it as a network
> problem would send someone to check Wi-Fi over something Wi-Fi cannot fix.

**The criterion for a user-facing failure message is not accuracy — it is
actionability.** A message the user cannot act on wastes their time twice:
once reading it, once acting on the wrong thing.

Keep the two layers separate:

- **Internal kinds** are as specific as the code can justify:
  `tooMany | loop | insecureDowngrade | badLocation | …`
- **User-facing messages** are grouped by what the person should *do*
  next.

The specific taxonomy is product-specific. The two-layer shape is not.

## 6. Copy as an architectural constraint

**Evidence: VERIFIED** (`quietly_media_saver:docs/ARCHITECTURE.md` §G) ·
**Scope: LUNEXA-WIDE**

Four strings were removed because they **asserted things the system could
not know**. Copy that describes behaviour the product does not have is a
defect in the same sense a wrong return value is — the user acts on it
either way.

Tests assert **semantic properties, not exact strings**: that invalid-URL
guidance contains no "post" or "page", that no third-party platform is named
in any locale.

Why property-based copy tests are the right tool:

- Pinning exact strings makes every wording change a test change, so the
  test stops carrying meaning and starts carrying noise.
- The property is the actual requirement. "Never name a third-party
  platform" survives rewording, translation, and three locales.
- Per-locale enforcement is the only kind that works when a claim exists in
  English, Turkish and Spanish — and every public claim in this ecosystem
  does.

**Rule:** if the copy makes a claim about the system, the claim is testable,
and the test asserts the property rather than the sentence.

## 7. Applying this to a product with no network layer

Chess Rescue and RPS Duel make no user-driven network requests, so §§1–3 do
not apply today. §§4–6 do, and apply now:

- No fabricated fallback, no defaulted unknowns, no estimated values.
- A failure taxonomy that separates what the code knows from what the user
  is told.
- Copy that asserts only what the system can establish — which includes
  every negative privacy claim on the website
  ([`../release-truth-and-cross-surface.md`](../release-truth-and-cross-surface.md)
  §2.2).

Chess Rescue already has `copy_safety_test.dart`, which is §6 arrived at
independently in a product with no network layer at all. That convergence is
the strongest evidence available that these are engineering standards rather
than one product's preferences.
