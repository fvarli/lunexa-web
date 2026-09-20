# Device and Release Gates

What must pass before a Lunexa mobile build is treated as a release
candidate, and how to work on a physical device without disturbing the
production install.

Each product keeps its own device-workflow document for
product-specific values — application IDs, reference devices, per-screen
test matrix. This document owns the shared reasoning so those documents can
link to it rather than restate it.

Source documents: `rps_duel:docs/android-device-workflow.md`,
`chess-rescue:docs/android-device-workflow.md`,
`quietly_media_saver:docs/DEVICE_WORKFLOW.md`.

---

## 1. Never disturb the Play production install

**Evidence: VERIFIED**, in every product · **Scope: LUNEXA-WIDE**

The most operationally serious rule here. Its failure mode is not recoverable
from within the development workflow.

### 1.1 The tripwire

> **If `flutter run` ever prints `Uninstalling old version...`, stop
> immediately.**

**Evidence: VERIFIED** — present in both repositories read
(`rps_duel:docs/android-device-workflow.md:104`;
`chess-rescue:docs/android-device-workflow.md:86`).

That message means the tooling is about to run `adb uninstall` on a package
it could not install over, and **there is no confirmation prompt**. If the
package is the production build, uninstalling can delete app-local user data
and destroy the production reference state on that device. The correct
response is to stop and find out why the application IDs collided, never to
let it proceed.

### 1.2 The rules

- **Never** uninstall, clear data on, or downgrade the production package.
- **Never** resolve a signature mismatch by uninstalling the Play build.
  The mismatch is the symptom; a mis-suffixed application ID is the cause.
- Development installs carry the `.dev` suffix so the collision cannot
  arise at all — [`environments-and-build-identity.md`](environments-and-build-identity.md)
  §1.

The separation is what makes the rule survivable. The rule is what catches
the case where the separation failed.

## 2. Wireless debugging hygiene

**Evidence: VERIFIED**, in every product
(`rps_duel:docs/android-device-workflow.md:49,65,67,153`) ·
**Scope: LUNEXA-WIDE**

- Use **Android 11+ native Wireless debugging** with paired ADB. Do **not**
  use legacy `adb tcpip 5555`.
- **Never** copy pairing codes into chat, logs, issues or repository files.
  They are typed interactively, and they are the whole authentication.
- **Never hardcode or commit** IP addresses, ports, device serials or any
  transient ADB state.
- **Always re-discover.** The wireless endpoint changes when the network
  changes, the phone reconnects or reboots, or Wireless debugging is
  toggled. A remembered address is wrong shortly after it is written down —
  which is the practical reason not to commit one, beyond the hygiene
  reason.

See also [`../working-agreements.md`](../working-agreements.md) §5.

## 3. What hot reload may never substitute for

**Evidence: VERIFIED**, in every product
(`rps_duel:docs/android-device-workflow.md:123-137`) ·
**Scope: LUNEXA-WIDE**

Hot reload and hot restart are iteration tools, not verification. Neither
may stand in for a real run of:

- lifecycle transitions
- process death
- cold start
- persistence migrations
- behaviour against **existing production-user data**
- Play upgrade behaviour
- release signing
- final permission state
- AAB verification

The reason is structural, not cautionary:

> The `.dev` install starts empty and cannot exercise migrations or upgrade
> behaviour.

A development install has no history. Migration and upgrade paths are
precisely the code that only runs when history exists, so the environment
that makes daily iteration safe is also the environment that cannot test
them. Those paths need a deliberately staged install, not the one on the
desk.

## 4. Responsive and short-screen gate

**The gate — Evidence: VERIFIED** (`chess-rescue`) · **Scope: LUNEXA-WIDE**.
**The thresholds — Scope: PRODUCT-SPECIFIC**: each product sets its own, and
`chess-rescue` is cited below as a worked example rather than as values to
copy.

Chess Rescue's implementation (`docs/android-layout-qa.md:11-12,29-50`),
cited as a worked example rather than a formula to copy:

- Board size `min(maxWidth − 32, maxHeight − 260)` clamped to `[200, 360]`
  logical px, computed inside `SafeArea`.
- Text scale clamped to **1.35×** via `MediaQuery.withClampedTextScaling`,
  so larger system fonts are honoured up to a bound the composition
  survives.
- Device profiles down to **360dp** wide (~720×1280).
- **No render-overflow banner in any state** — the acceptance criterion.
- Desktop window resized very narrow and very short, to stress the formula
  past the phone range.

Backed by widget tests: `test/rescue_screen_responsive_test.dart`,
`test/status_bar_layout_test.dart`, `test/episode_card_layout_test.dart`.

**The transferable parts**: a stated smallest supported size; a stated text
scale bound; "no overflow in any state" as a binary criterion; and tests
that hold it. **Not transferable**: the numbers.

## 5. Accessibility, contrast and copy gates

**Evidence: VERIFIED** (`chess-rescue`; partial in `rps_duel`) ·
**Scope: PRODUCT-SPECIFIC** — no shared minimum bar is defined, see the gap
note below.

Chess Rescue ships these as tests, among roughly 75 test files:
`a11y_test.dart`, `readability_test.dart`, `piece_contrast_test.dart`,
`copy_safety_test.dart`, `arb_parity_test.dart`. `Semantics` appears across
six widget files.

Two patterns worth adopting ecosystem-wide:

- **`arb_parity_test.dart`** — localization files must agree on keys across
  locales. A missing translation becomes a test failure rather than a
  surprise in a screenshot. Given that every privacy claim exists in three
  languages, parity is a release-truth guard as much as a UX one.
- **`copy_safety_test.dart`** — copy asserted as a *property*, not pinned
  to exact strings. See
  [`input-and-failure-truth.md`](input-and-failure-truth.md) §5.

> **Gap: there is no shared minimum bar.** No contrast ratio, tap-target
> size or semantic-label coverage threshold is defined anywhere in the
> ecosystem. Chess Rescue's tests encode its own judgement. Defining a
> shared minimum is open work; until it exists, "accessibility is tested" is
> true only of Chess Rescue.

## 6. Signing, package and version verification before upload

**Evidence: VERIFIED**, in every product · **Scope: LUNEXA-WIDE**
(`rps_duel:docs/release_android.md`;
`chess-rescue:docs/closed-test-checklist.md`;
`quietly_media_saver:docs/release/CLOSED_TESTING_CHECKLIST.md`).

Before an artifact is uploaded, verify against the artifact itself — not
against intent:

1. **Application ID** is the production one, with no `.dev` suffix.
2. **Signing identity** is the release keystore, not the debug fallback.
   RPS Duel and Chess Rescue both fall back to debug signing when
   `key.properties` is absent
   (`rps_duel:android/app/build.gradle.kts:86-94`). Play rejects a
   debug-signed AAB, so the error is caught — but it is caught after a full
   release build, which is late.
3. **Version name and code** match what is being claimed, and the version
   code has not already been used.
4. **`versionNameSuffix`** has not leaked into a release build.
5. **Permissions** in the *merged* manifest are as expected — see
   [`privacy-safe-telemetry.md`](privacy-safe-telemetry.md) §4.

## 7. Physical-device visual acceptance

**Evidence: VERIFIED** (`rps_duel`, `chess-rescue`) · **Scope: LUNEXA-WIDE**

A human judgement gate that cannot be automated.

The evidence that it is real: two RPS Duel artwork generations were *built
and rejected at the physical visual gate*, and the product's own
documentation still records that its current Twemoji integration **has not
yet passed** it. A gate that has rejected work is a gate; a gate that has
only ever approved provides no evidence that it is being applied.

Chess Rescue's equivalent: every visual PR ships with before/after
screenshot exports, and the rule is *reject if the thumbnail tells less*.

**On a real device, in real light, at real size.** A simulator at desk
distance does not reproduce the viewing conditions the artwork will be judged
in: physical pixel density, display calibration, ambient light and holding
distance all differ.

## 8. Deterministic app-owned assets

**Principle — Evidence: PROPOSED · Scope: LUNEXA-WIDE.** Where the OEM font
or platform rendering stack is unreliable on supported devices, ship the
asset; where a loader fails silently, assert the asset's contents rather than
its presence.

**Supporting evidence — Evidence: NEEDS MORE VALIDATION ·
Scope: PRODUCT-SPECIFIC.** The implementation below is **uncommitted
working-tree work** in both products and may still change.

The case, from `rps_duel:docs/device_compatibility.md` (untracked):
`minSdk 24` means Android 7–10 system emoji fonts predate `U+1FAA8`, which
was verified rendering as tofu on a Huawei P9 Lite running EMUI 5. All three
move glyphs therefore became bundled SVGs behind a `MoveGlyph` abstraction.

`test/ui/game/move_glyph_source_test.dart` (untracked) bans move emoji from
production Dart and asserts each asset is self-contained vector artwork —
has `<svg>`/`viewBox`, and contains no `<text>`, no `font-family`, no
`<image>`, no remote `href`. The reason for testing the asset rather than
the code path: *`flutter_svg` swallows a bad asset path and renders an empty
box* — a silent failure that no widget test would otherwise catch.

This is the reasoning behind the principle stated at the head of this
section.

The minimum supported API level is a product decision that directly
determines which platform glyphs are safe. Verify on the oldest supported
device, not the newest.

## 9. Asset provenance and licensing

Three separate things, stated separately so the missing artifacts are not
read as an implemented standard.

### 9.1 The requirement

**Evidence: PROPOSED** · **Scope: LUNEXA-WIDE**

Any third-party asset is committed together with its license text and its
provenance, and where the license requires attribution, the app surfaces it
(Flutter's license registry is the natural home). The license file belongs in
the same commit as the asset.

### 9.2 Existing product-specific evidence

**Evidence: NEEDS MORE VALIDATION** · **Scope: PRODUCT-SPECIFIC**

Provenance work exists in two products, entirely in **uncommitted
working-tree state** and therefore rated accordingly: license files at
`rps_duel:assets/icons/moves/LICENSE.txt` and
`chess-rescue:assets/pieces/LICENSE-spatial-MIT.txt`, and a runtime
`_registerArtworkLicense()` call in RPS Duel that registers attribution with
Flutter's license registry.

RPS Duel's runtime registration is the closest thing to a reference
implementation of §9.1, and it cannot be cited as one until it is committed.

### 9.3 Missing tracked provenance

**Evidence: VERIFIED** (a verified absence) · **Scope: LUNEXA-WIDE**

`git ls-files | grep -i license` returns nothing in all three mobile
repositories. No asset license file is tracked in any of them.

> Third-party artwork is present in working trees with no committed
> attribution. This is a compliance exposure that the uncommitted work in
> §9.2 would resolve if committed.

## 10. Build gates

**Evidence: VERIFIED** that these checks are documented as conventions.
**Evidence: PROPOSED** that they act as gates — nothing enforces them.
**Scope: LUNEXA-WIDE.**

Documented per repository: RPS Duel requires `flutter analyze` to report
zero issues and runs 214 tests; Quietly runs 304 tests with *no test
touching the network*.

**None of it is automated. No mobile repository has a `.github/` directory
at all.** By contrast `lunexa-web` runs typecheck, unit tests, build and
lint in CI, gates deployment on a CI-built artifact, and runs a weekly
`npm audit`.

The intended sequence before any release build:

1. `dart format` — clean
2. `flutter analyze` — **zero** issues, not "no new issues"
3. `flutter test` — all pass
4. `flutter build appbundle --release` — succeeds, with §6 verified

> Documenting an unenforced gate is how an analytics SDK shipped alongside
> documentation saying analytics did not exist
> ([`../release-truth-and-cross-surface.md`](../release-truth-and-cross-surface.md)
> §2.2). Mobile CI is out of scope for this phase and is a separate
> decision; the honest status until then is that these are conventions.

**Quietly's "no test touches the network" deserves adopting on its own
merits.** Network-touching tests are flaky, slow, and quietly turn a test
suite into an integration dependency on someone else's uptime.
