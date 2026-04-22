# Lunexa SEO playbook

Operational checklist. Code is shipped (Milestones 16–17 + URL polish); the following items are manual / off-site work that compounds the technical foundation.

Owner: Ferzender. Re-run quarterly.

## URL structure (canonical reference)

English is the **default locale with no prefix**. Turkish and Spanish are prefixed. Every route produces three indexable URLs plus hreflang metadata.

| Page | English (canonical) | Turkish | Spanish |
|------|--------------------|---------|---------|
| Home | `https://uselunexa.com/` | `https://uselunexa.com/tr` | `https://uselunexa.com/es` |
| About | `/about` | `/tr/about` | `/es/about` |
| Services (index) | `/services` | `/tr/services` | `/es/services` |
| Services — Mobile | `/services/mobile` | `/tr/services/mobile` | `/es/services/mobile` |
| Services — Web | `/services/web` | `/tr/services/web` | `/es/services/web` |
| Services — Intelligent | `/services/intelligent` | `/tr/services/intelligent` | `/es/services/intelligent` |
| Blog | `/blog` | `/tr/blog` | `/es/blog` |
| Contact | `/contact` | `/tr/contact` | `/es/contact` |
| Privacy | `/privacy` | `/tr/privacy` | `/es/privacy` |
| Terms | `/terms` | `/tr/terms` | `/es/terms` |

Total: **30 indexable URLs** (10 routes × 3 locales). Newsletter confirm/unsubscribe pages are `noindex` and intentionally excluded from the sitemap.

Middleware behavior:
- `/tr/*` and `/es/*` → pass through
- `/en/*` → 307 redirect to `/*` (no duplicate content)
- Any other path with no locale prefix → internal rewrite to `/en/*` (user sees clean URL) unless the user's cookie/Accept-Language prefers Turkish or Spanish, in which case 307 to the prefixed path

## 1. Google Search Console (priority 1)

Property is already verified via the `google-site-verification` meta tag (set by `NEXT_PUBLIC_GSC_VERIFICATION` GitHub variable).

### Immediate actions

**Submit sitemap**
  - URL: `https://uselunexa.com/sitemap.xml`
  - Console path: Indexing → Sitemaps → Add new sitemap
  - Expected: 30 URLs with `<xhtml:link rel="alternate" hreflang=...>` on each

**Request indexing on key pages** — send each through the URL Inspection tool:

- **English (priority 1):**
  - `https://uselunexa.com/`
  - `https://uselunexa.com/about`
  - `https://uselunexa.com/services`
  - `https://uselunexa.com/services/mobile`
  - `https://uselunexa.com/services/web`
  - `https://uselunexa.com/services/intelligent`
  - `https://uselunexa.com/blog`
  - `https://uselunexa.com/contact`
- **Turkish (priority 2):**
  - `https://uselunexa.com/tr`
  - `https://uselunexa.com/tr/about`
  - `https://uselunexa.com/tr/services`
  - `https://uselunexa.com/tr/contact`
- **Spanish (priority 3):**
  - `https://uselunexa.com/es`
  - `https://uselunexa.com/es/about`
  - `https://uselunexa.com/es/services`
  - `https://uselunexa.com/es/contact`

Don't bother requesting indexing for legal pages (privacy, terms) — they rank on their own and are low priority.

### 1–2 week follow-up

- **Coverage report** — watch indexed URLs climb from ~1 (today, homepage only) toward 30
- **International targeting** — confirm Google sees the hreflang map and pairs URLs correctly
- **Rich Results test** each key page via https://search.google.com/test/rich-results — our schemas:
  - `Organization` with `ContactPoint`
  - `ProfessionalService`
  - `WebSite`
  - `SiteNavigationElement`
  - `BreadcrumbList` (on contact/privacy/terms/about/services/blog)
  - `FAQPage` (on homepage)

### Schema validation (done pre-launch)

All JSON-LD blocks validate against schema.org. Sample inspection from a production build:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "name": "Lunexa", "contactPoint": [...] },
    { "@type": "ProfessionalService", "serviceType": [...] },
    { "@type": "WebSite", "publisher": { "@id": "...#organization" } },
    { "@type": "SiteNavigationElement", "name": [...], "url": [...] }
  ]
}
```

FAQPage is emitted separately on the homepage with 4 Q/A pairs.

### Canonical verification (done pre-launch)

Every page emits a `<link rel="canonical">` pointing at its locale-correct URL plus `<link rel="alternate" hreflang=...>` for the other locales. Example from `/contact` (English):

```html
<link rel="canonical" href="https://uselunexa.com/contact" />
<link rel="alternate" hreflang="en" href="https://uselunexa.com/contact" />
<link rel="alternate" hreflang="tr" href="https://uselunexa.com/tr/contact" />
<link rel="alternate" hreflang="es" href="https://uselunexa.com/es/contact" />
<link rel="alternate" hreflang="x-default" href="https://uselunexa.com/contact" />
```

Turkish and Spanish pages swap the canonical accordingly. `x-default` always points at English.

## 2. Bing Webmaster Tools (priority 2)

Bing powers DuckDuckGo and ChatGPT Browse. Trivial setup, compounds.

- Sign up at https://www.bing.com/webmasters/
- Add property `https://uselunexa.com`
- Verification: **"Import from Google Search Console"** is the fastest path
- Submit sitemap: `https://uselunexa.com/sitemap.xml`

## 3. Google Business Profile (priority 3)

Only relevant for local Turkey visibility. Skip if targeting purely international B2B.

- https://www.google.com/business/
- Register "Lunexa" as a business, category: **Software company** or **Web designer**
- Service area: Turkey + countries you serve (or "online only" — Google supports service-area businesses without a physical address)
- Add logo + cover photo (OG image works), description, link back to uselunexa.com
- Verify by postcard or video call

## 4. LinkedIn Company Page (priority 2)

- https://www.linkedin.com/company/setup/new/
- Name: **Lunexa**
- Industry: Software Development
- Company size: 1–10
- Website: `https://uselunexa.com`
- Logo + banner (reuse OG image), short "About" paragraph lifted from the homepage lead
- Post one inaugural announcement so there's feed activity

## 5. Reserve social handles (priority 3)

Claim even if inactive — prevents squatters:

- X / Twitter: `@lunexa` or `@uselunexa`
- GitHub org: `lunexa` or `uselunexa`
- Instagram: `@uselunexa`
- Crunchbase: submit as organization

## 6. Keyword research & content strategy (priority 1)

Without a target keyword list we're writing blind. Do one pass:

- **Google Keyword Planner** (free via Google Ads account; no ads needed) — start with "digital product studio", "custom software development", "mobile app agency", filter by Turkey + your target markets
- **Ahrefs Webmaster Tools** (free once Search Console has data)
- Paid alternatives: Ubersuggest, SEMrush trials

Pick **5 primary keywords** for the next quarter. Map each to a target page. Example:

| Keyword | Target page | Intent |
|---------|-------------|--------|
| digital product studio | `/` | Brand, top of funnel |
| mobile app development agency | `/services/mobile` | Commercial |
| AI integration services | `/services/intelligent` | Commercial |
| (fill in after research) | `/blog/<post>` | Informational |
| (fill in after research) | — | — |

## 7. Backlink seeding (priority 2)

Search rank is half on-page, half off-page.

- **Product Hunt** — launch once there's a product to show. Stand up a "Coming Soon" page now to gather email follows.
- **Hacker News "Show HN"** — submit once there's a substantive blog post. Tuesday morning US Pacific is the slot.
- **Türkiye startup dizinleri:**
  - https://webrazzi.com/ — submit your startup profile
  - https://startups.watch/ — Türkiye startup database
  - https://kworks.com.tr/ — Koç ecosystem
- **Tech Behemoth / Clutch / GoodFirms** — software agency directories; profile creation is free
- **Guest posts / interviews** — reach 2–3 startup blogs or podcasts per quarter

## 8. Content cadence

Biggest lever once the technical foundation is in place:

- **One blog post / month minimum.** Pick from the keyword map above.
- Post length: 1000–1800 words. Shorter ones don't rank; longer ones get skimmed.
- Every post should:
  - Target a specific keyword (H1, URL slug, first paragraph, ~5 times across body)
  - Include a code snippet, diagram, or screenshot
  - Link to 2+ other pages on the site (services pages are ideal)
  - Link to 2+ authoritative external sources
- Publish in **English first**, then TR + ES. Google gets English indexed fastest; the other two accrete coverage.

## 9. Measurement (priority 1)

Every Monday check:

- **Search Console**
  - Performance → Queries (what people actually find us for)
  - Performance → Pages (which URLs get impressions)
  - Week-over-week comparison
- **GA4**
  - Reports → Acquisition → User acquisition → First user medium = `organic`
  - Track: organic sessions, avg engagement time, contact form submissions from organic
- **BetterStack** — `/api/health` uptime is a ranking input; Google penalizes flaky sites

Set a quarterly goal — e.g., **"100 organic sessions/week by end of Q2"**. Measure.

## 10. Don't do these

- **Keyword stuffing** in meta descriptions, alt text, or body copy — Google's BERT is smart; unnatural repetition hurts.
- **Buying backlinks** — manual or algorithmic, both carry penalty risk. Every link is earned.
- **AI-generated filler posts** — Google's Helpful Content Update specifically targets these. Use AI to draft, then rewrite with real substance; never publish raw LLM output.
- **Aggressive CSP enforcement** without observing Report-Only first — breaking analytics loaders tanks SEO signals.
- **Cloaking** (showing different content to crawlers vs. users) — automatic de-indexing.

## Change log

- 2026-04-22: Initial playbook. Written after Milestones 16–17 (Prisma newsletter DB + URL-based i18n) landed.
- 2026-04-22 (later): Restructured URL strategy — English is now the prefix-less default (`/`, `/contact` instead of `/en/`, `/en/contact`). `/tr` and `/es` keep their prefixes. Updated URL tables, canonical examples, Search Console submission lists.
