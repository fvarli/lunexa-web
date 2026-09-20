# Privacy-Safe Telemetry

What may enter an analytics event, and what capabilities an app may declare
it has.

The mechanism that carries events is
[`analytics-architecture.md`](analytics-architecture.md). Who owns the text
of the privacy policy is a release concern and is currently **UNRESOLVED**
— [`../release-truth-and-cross-surface.md`](../release-truth-and-cross-surface.md)
§5.

The governing principle:

> **Prefer structural enforcement over call-site discipline.** A property
> enforced by build configuration, permissions, contracts/types or
> unreachable environment wiring is stronger and easier to audit than one
> that depends only on every caller remembering a rule.

This is a statement about relative strength and auditability, not an
absolute. Structural enforcement can still be undone — by a dependency
upgrade that re-adds a permission, a build-file edit, a plugin changing its
resolution rules. Its advantage is that undoing it requires a visible,
reviewable change in a small number of files, rather than a mistake at any
one of an unbounded number of call sites.

---

## 1. What may enter an event

Two distinct things are stated here, and the distinction matters: one is an
implemented contract in a single product, the other is a canonical policy
that binds regardless of what any product currently implements.

### 1.1 RPS Duel's implementation contract

**Evidence: VERIFIED** (`rps_duel:lib/core/analytics_events.dart:42-43`) ·
**Scope: PRODUCT-SPECIFIC**

> Event parameter keys. Values are always low-cardinality enum names —
> never free text, never identifiers, never raw move sequences.

Each parameter key documents its permitted values inline — `outcome` is
`playerWin | cpuWin | tie`, and so on. The enumeration *is* the contract, and
the vocabulary is centralized in one file
([`analytics-architecture.md`](analytics-architecture.md) §5).

This is what one product does. It is a reference implementation of the policy
below, not the policy itself.

### 1.2 Lunexa-wide canonical policy — prohibited by default

**Evidence: PROPOSED** · **Scope: LUNEXA-WIDE**

Normative. It binds because it is the approved standard, not because
something already enforces it — no product enforces it mechanically today
(§2).

**Prohibited in any event name, parameter key or parameter value:**

- **Raw identifiers** of any kind — user IDs, device IDs, install IDs,
  advertising IDs, session IDs, account handles.
- **Email addresses and person names.**
- **Arbitrary or free text**, in whole or in part, including anything the
  user typed.
- **User-supplied URLs, paths, query strings or hostnames.**
- **Filenames and content** the user created, loaded or saved — including
  derivatives from which it could be reconstructed (a raw move sequence, a
  media title).
- **Clipboard contents**, in whole or in part, and any value derived from
  them.
- **Similar high-cardinality or raw user content**, including precise
  location, precise timestamps tied to an individual, and anything usable as
  a cross-session fingerprint.

The list is prohibitive by default: a value that is not obviously a
low-cardinality enum is treated as prohibited until shown otherwise.

The web-side form of the same policy, for request logging, is
`apps/web/docs/PATTERNS.md:916` — see
[`../working-agreements.md`](../working-agreements.md) §6. Mobile telemetry is
the sharper case: it leaves the device and lands in a vendor dataset.

## 2. No generic automated value-level validator exists

**Evidence: VERIFIED** (a verified absence) · **Scope: LUNEXA-WIDE** ·
**future boilerplate candidate: NEEDS MORE VALIDATION**

The event-name lock is real and mechanical
(`rps_duel:test/core/analytics_events_test.dart` — exact-set equality,
`snake_case`, banned segments `id`, `user_id`, `email`, `device`).

**It validates names, not values.** Nothing in any repository mechanically
prevents a future call site from passing free text as a parameter value.
Today the parameter surface is small enough to read, which is protection by
circumstance rather than by design.

A candidate mechanism, not built and not recommended without a second
consumer: a typed parameter value — an enum or sealed class per parameter
key — so that a `String` cannot reach `logEvent` at all. That makes the
prohibition unrepresentable rather than forbidden, which is the same shape
as the structurally-enforced changelog property in
[`../release-truth-and-cross-surface.md`](../release-truth-and-cross-surface.md)
§3.

Until such a mechanism exists, §1.2 rests on review rather than on
enforcement. The mechanism itself is a **future boilerplate candidate**, rated
**NEEDS MORE VALIDATION**: the shape is clear, nothing has been built, and it
should not be extracted before a second product needs it
([`README.md`](README.md) §4).

## 3. Products taking external input must enforce this before shipping any event

**Evidence: PROPOSED** · **Scope: LUNEXA-WIDE**, and blocking for Quietly
specifically.

Quietly accepts pasted URLs. A URL is user-supplied content, frequently
identifying, and occasionally a credential. Quietly has no analytics today,
so the rule has nothing to constrain and nothing to verify — which is
exactly why it must be settled *before* the first event, not alongside it.

That the product already treats URLs as hostile input elsewhere is the
relevant precedent, not a substitute: `quietly_media_saver:lib/core/net/url_contract.dart`
enforces a scheme allowlist, rejects whitespace and control characters
whole-string, refuses `user:password@` credentials, and bounds length at
2048 bytes — see
[`input-and-failure-truth.md`](input-and-failure-truth.md) §1.

> **Gate:** a product that handles user-supplied URLs, paths or file
> contents may not emit its first analytics event until it can demonstrate
> that none of that data can reach a parameter value.

Measurable properties that do not carry the content itself — a failure
*kind*, a scheme category, an outcome enum — are the intended shape.

No legal requirement is asserted here. No repository evidence establishes
one, and none was researched. The engineering case stands on its own.

## 4. Declare no capability the product does not exercise

**Evidence: VERIFIED** (`rps_duel:android/app/src/main/AndroidManifest.xml:4-26`)
· **Scope: LUNEXA-WIDE**

Firebase Analytics merges advertising-ID permissions into the manifest.
RPS Duel removes all three:

```xml
<uses-permission
    android:name="com.google.android.gms.permission.AD_ID"
    tools:node="remove" />
<uses-permission
    android:name="android.permission.ACCESS_ADSERVICES_AD_ID"
    tools:node="remove" />
<uses-permission
    android:name="android.permission.ACCESS_ADSERVICES_ATTRIBUTION"
    tools:node="remove" />
```

The Android 13+ AdServices pair is removed alongside the legacy GMS
permission because they serve the same advertising-ID purpose by a different
route; removing one and leaving the others achieves nothing.

**The reason is recorded in the manifest itself**: keeping them would force
*"Device or other IDs"* to be declared as collected in Play Data Safety —
for a capability the app never exercises.

**Accepted cost**, also recorded: Firebase Analytics demographics reporting
is lost. The comment marks the removal as deliberate and tells a future
reader to *"re-add deliberately if AdMob is ever introduced"* — so the
decision survives the person who made it.

### 4.1 Why this is the strongest privacy pattern in the ecosystem

The app cannot read an advertising ID while the permission is absent from
the merged manifest — a build-time property rather than a runtime choice. The
Data Safety answer follows from the build rather than from a call-site
convention. Invalidating it
requires changing the manifest or the dependency set, which surfaces as a
visible, reviewable diff in a small number of files — which is the auditable
property being sought, not an absolute one.

Generalize the shape: **when a capability would force a disclosure, remove
the capability rather than managing the disclosure.**

> **External dependencies.** That the Firebase SDK merges these permissions,
> and that their presence implies a "Device or other IDs" declaration, are
> both current third-party behaviours. **Re-verify the merged manifest on
> every SDK upgrade** — a dependency bump can silently re-add a permission,
> and the Data Safety declaration is what goes stale.

## 5. Dev telemetry must not reach the production dataset

**Evidence: VERIFIED** (`rps_duel`) · **Scope: LUNEXA-WIDE**

Achieved structurally: distinct Firebase
projects resolved per source set, plus distinct package names. See
[`environments-and-build-identity.md`](environments-and-build-identity.md)
§2.3.

This belongs in a privacy document, not only a build one. Development
sessions generate events that describe a developer's device and behaviour;
mixing them into the production dataset both corrupts the measurement and
puts data into a dataset whose description does not cover it.

## 6. Current product truth

As observed during the audit of the commits named in
[`../README.md`](../README.md), *Changelog*. "None found" records the search
result, not a proof of absence.

| Product | Analytics | Ad serving | Tracking | Network requests |
| --- | --- | --- | --- | --- |
| RPS Duel | Firebase Analytics, custom events | none found | none found | Firebase only |
| Chess Rescue | none found | none found | none found | none found |
| Quietly | none found | none found | none found | yes — user-initiated fetches only |

Quietly's absence of telemetry was confirmed by inspecting `lib/`: the only
measurement found is download-progress accounting, which never leaves the
device.

The ad-serving column reflects the term search recorded in
[`monetization.md`](monetization.md); non-ad monetization mechanisms were not
searched for.

Each row is a **public commitment already made in three languages**
(`apps/web/src/seo/content.ts`). Changing any cell is a cross-surface
release event, not an implementation detail —
[`../release-truth-and-cross-surface.md`](../release-truth-and-cross-surface.md)
§4.
