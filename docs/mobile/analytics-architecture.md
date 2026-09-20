# Analytics Architecture

The **mechanism** by which a Lunexa product emits telemetry.

This document never specifies *what* to measure. Event vocabularies are
product semantics and stay in the product repository — see
[`README.md`](README.md) §3. What may go *inside* an event is
[`privacy-safe-telemetry.md`](privacy-safe-telemetry.md).

**Evidence: VERIFIED** throughout, sourced from `rps_duel` — the one product
with analytics. **Scope: LUNEXA-WIDE**: this is the mechanism a Lunexa
product uses when it adds telemetry.

The two axes are doing real work here. The facts below are cited and
therefore **VERIFIED**; that they will transfer cleanly to a second product
is a **scope judgement that one implementation cannot settle**. Treat this
document as a reference to follow and to revise at the second consumer, not
as a pattern already proven across the ecosystem.

---

## 1. Shape

Three files, in `rps_duel:lib/core/`:

| File | Lines | Role |
| --- | --- | --- |
| `analytics.dart` | 109 | The interface, the default, the test backend, the facade |
| `analytics_events.dart` | 72 | The entire vocabulary, and nothing else |
| `firebase_analytics_backend.dart` | 41 | The only file that imports the vendor SDK |

Three small files. The size is not incidental — the vocabulary file is
auditable in one screen, which is the property that makes it useful to a
privacy review.

## 2. A backend interface with a no-op default

**Evidence: VERIFIED** (`rps_duel:lib/core/analytics.dart:5,15,27,72`)

```
abstract class AnalyticsBackend      // the contract
class NoopAnalyticsBackend           // the default — does nothing
class RecordingAnalyticsBackend      // for tests — records calls
class Analytics                      // static facade over the current backend
```

The default backend is the no-op (`analytics.dart:75`). Consequences worth
being explicit about:

- **The entire test suite runs untouched**, with no platform channel in
  sight, and nothing transmits.
- **Nothing is sent until `main` explicitly attaches a real backend.** The
  transmitting state is opt-in and visible in one place.
- A product with no analytics needs no special handling — it simply never
  attaches.

`Analytics.attach()` / `Analytics.detach()` (`analytics.dart:79,84`) make the
transition explicit and reversible; `main.dart` wraps initialization in
`try`/`catch` and calls `detach()` on failure.

## 3. The vendor SDK lives in exactly one file

**Evidence: VERIFIED** — `grep 'package:firebase' lib/` returns two files:
`lib/core/firebase_analytics_backend.dart` and `lib/main.dart` (the latter
for `firebase_core` initialization only). Domain, data and UI layers are
Firebase-free.

`firebase_analytics_backend.dart:5-9` states the boundary at the top of the
file:

> The only file in the app that imports `firebase_analytics`.

Swapping vendors, or dropping telemetry entirely, touches one adapter and
one line of `main`.

## 4. Telemetry failure never breaks the product

**Evidence: VERIFIED** (`rps_duel:lib/core/analytics.dart:91-107`), tested
for both failure shapes.

The facade contains **two different failures**, which is the detail most
implementations get half right:

```dart
try {
  _backend.logEvent(name, parameters).catchError((Object _) {});
} catch (_) {
  // synchronous throw from the backend
}
```

- `.catchError` handles a **rejected future** — the async failure.
- `try`/`catch` handles a **synchronous throw** — a backend that fails
  before returning a future at all.

Handling only the first leaves a crash path open. `test/core/analytics_test.dart`
covers the no-op default, attach/detach, recording, and both failure shapes.

**Rule: an analytics call site never needs to know that analytics can
fail.** If instrumentation can propagate an error into product code, the
instrumentation is wrong, not the call site.

## 5. One vocabulary file, and a stated reason for it

**Evidence: VERIFIED** (`rps_duel:lib/core/analytics_events.dart:1-12`)

> The complete analytics vocabulary. Every event name and user-property key
> the app may emit lives here and nowhere else, so the surface is auditable
> in one file — which matters because **this vocabulary is also what the
> privacy policy and the Play Data Safety declaration have to describe**.

That last clause is the whole justification. The file is not an enum for
tidiness; it is the artifact a privacy review reads. Anything emitted from
outside it is undeclared telemetry.

Two habits worth copying:

- **Small by intent.** *"Events are added when a question needs answering,
  not because a call site happens to be convenient to instrument."*
- **Deferred, not forgotten.** Events belonging to an unshipped feature are
  documented as intentionally absent and return in the PR that ships it —
  rather than being declared-and-unused, which makes the declared surface
  larger than the real one and misleads exactly the review the file exists
  to serve.

## 6. The vocabulary is locked by test

**Evidence: VERIFIED** (`rps_duel:test/core/analytics_events_test.dart`,
94 lines). The strongest extraction candidate in the ecosystem, because it is
mechanism with no product coupling.

The test asserts, against an approved set declared in the test itself:

| Guard | Line |
| --- | --- |
| Exact-set equality, events | `:39-41` |
| Exact-set equality, user properties | `:44-46` |
| Explicit counts (7 events, 2 user properties) | `:40,45` |
| Deferred names are absent | `:54` |
| Names match `^[a-z][a-z0-9_]*$` | `:59-64` |
| No name segment is `id`, `user_id`, `email` or `device` | `:66-76` |

Exact-set equality — not "contains" — is what makes it a lock. Adding an
event fails the test until the approved set is updated in the same change,
which is the moment a reviewer is forced to ask whether the privacy policy
and Data Safety declaration still describe reality.

> **Known limit: this guards names, not values.** Nothing here prevents a
> future call site passing free text as a parameter *value*. See
> [`privacy-safe-telemetry.md`](privacy-safe-telemetry.md) §2.

## 7. Instrumentation behaviour is tested, not assumed

**Evidence: VERIFIED**
(`rps_duel:test/ui/game/analytics_instrumentation_test.dart`, 397 lines) — emission behaviour asserted per event through
`RecordingAnalyticsBackend`.

Why a recording backend rather than a mock: the assertions are about what
the product *emits*, in the order and the conditions it emits it, not about
which methods were called. "Fires once per install" is a behavioural claim,
and only a behavioural test can hold it.

## 8. Where instrumentation may live — an honest qualification

All nine `Analytics.*` call sites in RPS Duel's UI sit in one file,
`lib/ui/game/game_screen.dart`.

So the verified principle is **vendor isolation behind a facade** — no
vendor SDK in widgets, achieved fully. It is *not* "no telemetry calls in
UI": instrumentation does live in a widget, concentrated in one screen.

The distinction matters for anyone applying this document. Requiring that
telemetry never appear in UI code would be a different, stricter and
currently unimplemented rule. What is actually established:

- The vendor SDK never appears outside the adapter. **Evidence: VERIFIED**
- Instrumentation is concentrated rather than scattered.
  **Evidence: VERIFIED** — one product, one screen.
- Telemetry calls are absent from UI code. **Not claimed.**

## 9. Adding analytics to a product that has none

Neither Chess Rescue nor Quietly has telemetry today, and both say so
publicly. Before the first event ships:

1. **Derive the vocabulary from the product's own questions.** Do not port
   another product's events. See [`README.md`](README.md) §3.
2. **Satisfy [`privacy-safe-telemetry.md`](privacy-safe-telemetry.md)
   first** — for Quietly this means mechanically enforcing that no URL,
   path or query can enter an event, which does not exist yet.
3. **Run the cross-surface review before the release, not after it** —
   [`../release-truth-and-cross-surface.md`](../release-truth-and-cross-surface.md)
   §4. The public copy for both products currently states that they contain
   no analytics, in three languages.

Step 3 is the one that has already been missed once. See
[`../release-truth-and-cross-surface.md`](../release-truth-and-cross-surface.md)
§2.2.
