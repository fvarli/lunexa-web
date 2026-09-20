# Environments and Build Identity

Who the app *is* at build time: its application ID, which backend
configuration it resolves, and which conventions its identity must follow.

The governing principle:

> **Environment isolation must be visible in configuration, not asserted in
> prose.** A separation that a runtime branch could get wrong is not a
> separation.

---

## 1. Development builds use a distinct application ID

**Evidence: VERIFIED**, in every product · **Scope: LUNEXA-WIDE**

Debug and profile builds install under an application ID suffixed `.dev`, so
they coexist with the Google Play production install on a physical device.

| Product | Production application ID | Dev suffix | `versionNameSuffix` |
| --- | --- | --- | --- |
| RPS Duel | `com.lunexa.games.rpsduel` | `.dev` | — |
| Chess Rescue | `com.lunexa.games.chessrescue` | `.dev` | `-dev` |
| Quietly | `com.lunexa.quietly` | `.dev` | `-dev` |

Evidence: `rps_duel:android/app/build.gradle.kts:77,82`;
`chess-rescue:android/app/build.gradle.kts:61-62,72-73`.

### 1.1 Why it is mandatory

Not convenience — data loss. `rps_duel:android/app/build.gradle.kts:64-70`
states it:

> Without this, `flutter run` would hit a signature mismatch against the
> Play-signed app and its installer would silently `adb uninstall`
> production (and all of its user data) before retrying.

Play App Signing and a local debug keystore produce different signatures.
Installing over the Play build fails; the tooling then checks whether the
package is present, prints `Uninstalling old version...`, runs
`adb uninstall`, and retries — **with no confirmation prompt**
(`rps_duel:docs/android-device-workflow.md:39`). The package-scoped data
directory goes with it.

> **External dependency.** This rests on current `flutter_tools`
> `AndroidDevice.installApp` behaviour, and the tripwire string is
> version-specific. Re-verify on Flutter upgrades.

### 1.2 Suffix `applicationId` only — never `namespace`

**Evidence: VERIFIED** (`rps_duel:android/app/build.gradle.kts:72-74`,
`:27`)

`namespace` stays at the production value, so `.MainActivity` and every
generated `R` class still resolve, and the release application ID, signing
config and version semantics are untouched. Only the installed identity
changes.

### 1.3 The `profile` trap

**Evidence: VERIFIED** (`rps_duel:android/app/build.gradle.kts:79-82`)

The `profile` build type is contributed by the Flutter Gradle Plugin, and
its `initWith(debug)` copy happens *before* an ordinary `buildTypes` block
runs — so a suffix applied to `debug` alone does **not** reach `profile`,
and `flutter run --profile` installs with the **production** application ID.
Chess Rescue's copy documents having verified exactly that failure.

The fix is to suffix it explicitly:

```kotlin
debug {
    applicationIdSuffix = ".dev"
}
// `profile` is contributed by the Flutter Gradle Plugin. Suffix it too:
// `flutter run --profile` is ordinary development and must not be able to
// collide with the Play install either.
maybeCreate("profile").applicationIdSuffix = ".dev"
```

`flutter run --profile` is ordinary development. It gets the same protection
as debug.

### 1.4 `versionNameSuffix` — **Evidence: PROPOSED** as a standard

Chess Rescue and Quietly add `-dev` to the version name; RPS Duel does not.
The divergence has no recorded rationale on either side.

Recommendation, unenforced: adopt it. A screenshot, a bug report or an
about-screen from a dev build is then self-identifying, at zero cost. This
stays **PROPOSED** until a product adopts it as a rule rather than a habit.

## 2. Firebase configuration resolves per source set

**Evidence: VERIFIED** (`rps_duel`) · **Scope: LUNEXA-WIDE**

Android-specific. No equivalent has been established for any other platform,
and none is proposed here.

`rps_duel:android/app/build.gradle.kts:8-14`:

    src/debug   + src/profile -> rps-duel-dev  (com.lunexa.games.rpsduel.dev)
    src/release                -> rps-duel-prod (com.lunexa.games.rpsduel)

Three committed files —
`android/app/src/{debug,profile,release}/google-services.json` — and
**deliberately no module-root `google-services.json`**, so a missing or
mismatched config fails the build loudly instead of silently resolving to
the wrong Firebase project.

### 2.1 The module-root path is a guard, not a secret

**Evidence: VERIFIED** (`rps_duel:.gitignore:65-72`). The ignore rule on
`android/app/google-services.json` exists to keep the fallback path *empty*.
The per-variant files are committed, and the reasoning is recorded:

> They are client-side identifiers, not secrets: every value is extractable
> from a shipped APK and the API key is restricted by package name +
> signing cert.

That is the correct security judgement and the right place to write it down
— next to the rule a future reader would otherwise "fix".

### 2.2 Do not pass generated `firebase_options.dart`

**Evidence: VERIFIED**
(`rps_duel:lib/core/firebase_analytics_backend.dart:11-16`)

`Firebase.initializeApp()` is called with no `options:`. Passing generated
options would pin every variant to a single compile-time project and
silently defeat the isolation. The comment says exactly this, at the call
site's own adapter — which is where someone about to "helpfully" add
`options:` will read it.

### 2.3 Development telemetry cannot reach the production dataset

**Evidence: VERIFIED** (`rps_duel`) · **Scope: LUNEXA-WIDE** — confirmed by
comparing
`project_info.project_id` across the three source-set files: debug and
profile share one project, release uses a different one.

| Variant | Firebase project | Registered package |
| --- | --- | --- |
| `debug` | dev | `com.lunexa.games.rpsduel.dev` |
| `profile` | dev | `com.lunexa.games.rpsduel.dev` |
| `release` | prod | `com.lunexa.games.rpsduel` |

This is a **build-graph property, not a runtime branch**. There is no code
path — no flag, no misconfiguration, no forgotten `if` — by which a
development build reports into production analytics. That is the whole
reason to prefer build-time isolation to runtime checks.

> **External dependency.** Rests on the `google-services` Gradle plugin
> resolving per-variant source sets with no silent fallback. Re-verify on
> plugin upgrades. The property is derived from the Android build graph; any
> other platform or a CI path would need establishing independently.

## 3. Explicit runtime environment identity — **Evidence: PROPOSED**

Nothing implements this, and it is listed here so nobody writes it up as
though something did.

No product has Gradle product flavors (`flavorDimensions` / `productFlavors`
appear nowhere), and `rps_duel:lib/` contains no `Env` class, no
`kReleaseMode` environment branch and no `String.fromEnvironment`.

RPS Duel achieves isolation by making runtime environment identity
*unnecessary* rather than explicit. That is arguably the better design — a
value that never has to be read cannot be read wrong — but it is a
different claim from "environment identity is explicit", and conflating the
two would canonize a mechanism nobody has built.

**Do not adopt flavors or an `Env` abstraction on the strength of this
document.** If a product needs one, it earns it, and then this section gets
rewritten with a citation.

## 4. Namespace and publisher conventions

**Evidence: VERIFIED** as documented · **Scope: LUNEXA-WIDE** — the source
is
`quietly_media_saver:docs/release/RELEASE_IDENTITY.md`, restated here with
attribution because it is ecosystem policy that currently lives inside one
product repo. The original is authoritative and unmodified; see
[`../release-truth-and-cross-surface.md`](../release-truth-and-cross-surface.md)
§7.

- **Root namespace `com.lunexa.*`**, chosen as the unified root for games,
  tools and future SaaS.
- **New products use flat `com.lunexa.<app>`** — no mutable category
  segment. `com.lunexa.quietly` is the first on this scheme.
- **`com.lunexa.games.*` is legacy**, retained by RPS Duel and Chess Rescue.
  An application ID is **permanent after first publish**; these do not
  change.
- **Support address `hello@uselunexa.com`**, ecosystem-wide and monitored.
- **Canonical site `https://uselunexa.com`**, with product-specific legal
  paths — see
  [`../release-truth-and-cross-surface.md`](../release-truth-and-cross-surface.md)
  §6.

**Recorded brand risk** (`RELEASE_IDENTITY.md:28-32`): `com.lunexa.*` is not
the reverse-DNS of a domain currently owned. `uselunexa.com` is owned;
`lunexa.com` is not. This is common practice for brand-rooted IDs and is not
a defect, but it is permanent, and the suggested safeguard — securing
`lunexa.com` — remains open.

## 5. Signing

**Evidence: VERIFIED** (`rps_duel:android/app/build.gradle.kts:86-94`)

Release builds use the real signing config when `android/key.properties` is
present, and **fall back to debug signing when it is not**, so that
`flutter build appbundle --release` keeps working without a keystore.

This is convenient and it is a footgun. A debug-signed AAB cannot be
uploaded to Play Console, so the failure is caught — but it is caught late,
after a full release build. **Verify the signing identity of any artifact
before it is treated as a release candidate**; see
[`device-and-release-gates.md`](device-and-release-gates.md) §6.

Keystores are never committed: `*.jks`, `*.keystore`, `*.p12` and
provisioning profiles are ignored in all three repositories.
