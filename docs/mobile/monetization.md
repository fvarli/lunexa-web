# Monetization

> **Status: almost entirely PROPOSED.**
>
> **No verified AdMob / ad-serving implementation was found in the three
> mobile repositories during this audit.** The search covered the terms
> `admob`, `google_mobile_ads`, `ca-app-pub`, `interstitial` and `rewarded`,
> and returned **one comment** — a note in RPS Duel's manifest saying to
> re-add advertising permissions *"deliberately if AdMob is ever
> introduced"*.
>
> **Scope limit of that finding.** Play Billing, in-app purchase,
> RevenueCat, Stripe, tip-jar and other non-ad monetization mechanisms were
> **not searched for**. No claim is made about their presence or absence. A
> negative result for ad-serving terms is not a negative result for
> monetization generally.
>
> This document exists so that intent is written down somewhere other than
> memory. Nothing in the **PROPOSED** sections describes a system that
> exists, and they must not be read, quoted or extended as though they did.

---

## 1. Per-product stances

**Evidence: VERIFIED** that each position is recorded ·
**Scope: PRODUCT-SPECIFIC**

These are recorded product decisions, not defaults and not Lunexa-wide
engineering constraints.

> **The product repository remains the authority for its own stance.** The
> summaries below are pointers to where each decision is recorded, not a
> second source of truth. A stance changes in the product repository first;
> this document follows.

### Chess Rescue — ads are "Never"

**Authority: `chess-rescue:docs/master-release-roadmap.md`.**

`chess-rescue:docs/master-release-roadmap.md:377-378,384` records a
value-led ladder: **optional tip jar → episode packs**, and explicitly
**never** ads, subscriptions, season passes, daily-rewards-with-counter, or
streak-recovery sales.

The document's own framing is worth preserving verbatim in spirit: *this
stance is the brand; document it once, never relitigate per phase.*

It also prices the excluded options rather than merely disliking them:

> Ad SDKs (AdMob etc.) — would require Data Safety re-filing,
> ID-for-advertising, privacy redo. Analytics SDKs (Firebase Analytics,
> Sentry) — same compliance impact.

That is the correct way to hold a product stance: as a cost that was
weighed, not a taste that was asserted.

### RPS Duel — the only plausible pilot, and not a cheap one

**Authority: the `rps_duel` repository**, together with the public claims
this section cites.

RPS Duel is the only product with telemetry, so it is the only one that
could answer a monetization question with evidence.

Its first cost would not be an SDK integration. `apps/web/src/seo/content.ts:1200`
tells every visitor, in three languages, that the app *"does not show ads"*,
and its Play Data Safety declaration says the same. **The pilot's first
deliverable is a cross-surface re-filing** —
[`../release-truth-and-cross-surface.md`](../release-truth-and-cross-surface.md)
§4 — and the advertising permissions deliberately stripped from its manifest
would have to be deliberately restored
([`privacy-safe-telemetry.md`](privacy-safe-telemetry.md) §4).

### Quietly — a utility, inheriting nothing

**Authority: the `quietly_media_saver` repository.**

Quietly is a tool, not a game. It inherits none of the games'
monetization assumptions, and it currently ships with no analytics, no ads
and no telemetry of any kind — stated publicly at
`apps/web/src/seo/content.ts:694`.

## 2. Dev/test ad unit isolation — **PROPOSED**

Nothing implements this. It is recorded now so that the rule exists *before*
the first integration rather than after the first incident.

If ads are ever introduced:

- **Development builds must never serve production ad units.** The
  mechanism should mirror
  [`environments-and-build-identity.md`](environments-and-build-identity.md)
  §2: resolved from the build graph, not chosen by a runtime branch. A
  `kReleaseMode` check is the thing to avoid — it is exactly the kind of
  conditional that ships inverted.
- **Test ad units in debug and profile; production units in release only.**
- Ad unit IDs are product-specific and are never copied between products or
  into any shared template.

## 3. `app-ads.txt` — a live declaration with no ad-serving app

**Evidence: VERIFIED** (web infrastructure) · **Scope: LUNEXA-WIDE** —
and undocumented in any Lunexa document until now.

`apps/web/public/app-ads.txt` contains a live publisher line
(`google.com, pub-…, DIRECT, f08c47fec0942fa0`) and is served to the open
internet by design — the file's entire purpose is to be crawled.

`apps/web/src/proxy.ts:60-65` carries a deliberate exclusion so the route is
not locale-prefixed, with the reason recorded:

> Without an exclusion here the rewrite in step 3b turns `/app-ads.txt` into
> `/en/app-ads.txt`, which matches no route and returns the 404 page as
> `text/html` — AdMob's crawler requires `text/plain` at the apex, so
> verification would fail.

So **an AdMob publisher relationship is declared and served publicly while
no Lunexa app serves ads.**

This is not a leak, not an error, and not a contradiction of the products'
public claims — `app-ads.txt` authorizes sellers to sell inventory; it does
not state that any inventory exists. Pre-verification is genuinely useful,
since the crawl-and-verify cycle is slow and is better completed before it
is needed.

It is recorded here for one reason: until this document existed, the file
appeared in no `README.md`, no `SEO_PLAYBOOK.md` and no document under
`apps/web/docs/`. An unexplained publisher declaration is exactly the kind
of artifact a future session reads as evidence that ads shipped.

> **External dependency.** The `text/plain`-at-the-apex requirement is
> current AdMob behaviour. If the proxy matcher is ever refactored, the
> exclusion must survive it.

## 4. "Measurement before monetization" — **PROPOSED, and not adopted**

The principle is sound in its spirit — *decide from evidence* — and it
should **not** become an ecosystem rule in its literal form, because the
repositories argue against it.

Chess Rescue's ladder is value-led, not funnel-led, and deliberately so.
Quietly is a utility whose success is a completed download, not a converted
session. Imposing a measure-then-monetize sequence on either would mean
instrumenting products that have publicly committed to collecting nothing,
in order to answer a question neither is asking.

The genuine version of the problem is visible in Chess Rescue itself: its
§0 non-negotiables defer difficulty modes until *post-launch telemetry
showing a bimodal completion curve* — **a gate it cannot currently satisfy,
because it has no telemetry.** That is a real product-planning problem, and
it is the best argument in the ecosystem for the principle's spirit.

The useful rule that survives:

> **Do not gate a decision on evidence the product has no way to collect.**
> Either build the measurement, or decide by another means and say which.

A decision deferred to telemetry that will never exist is not deferred. It
is not deferred; it is unresolved with no path to resolution.

## 5. If monetization is ever introduced

A checklist, **PROPOSED**, derived from costs the repositories have already
priced:

1. **Cross-surface re-filing first**, not last — Data Safety, privacy
   policy, website copy in all three locales, store listing.
   [`../release-truth-and-cross-surface.md`](../release-truth-and-cross-surface.md)
   §4.
2. **Restore advertising permissions deliberately**, and record why —
   reversing [`privacy-safe-telemetry.md`](privacy-safe-telemetry.md) §4
   with the same explicitness it was removed with.
3. **Isolate ad units by build graph**, per §2.
4. **Consent Mode v2 / EU requirements** must be resolved before any ads
   work. `apps/web/docs/PATTERNS.md` §4 already flags that GA on the website
   is always-on with no Consent Mode — an existing open item that an ads
   integration would make urgent.
5. **Re-verify `app-ads.txt`** against the live publisher relationship.
6. **Update this document**, replacing **PROPOSED** badges with citations.
