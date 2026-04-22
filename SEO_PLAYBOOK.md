# Lunexa SEO playbook

Operational checklist. Code is shipped (Milestones 16–17); the following items are manual / off-site work that compounds the technical foundation.

Owner: Ferzender. Re-run quarterly.

## 1. Google Search Console (priority 1)

Property is verified via the `google-site-verification` meta tag on every page (set by `NEXT_PUBLIC_GSC_VERIFICATION` GitHub variable).

### Immediate actions

- **Submit sitemap**
  - URL: `https://uselunexa.com/sitemap.xml`
  - Console path: Indexing → Sitemaps → Add new sitemap
  - Expect 30 URLs (10 routes × 3 locales) listed with hreflang alternates
- **Request indexing on key pages** — send URL through the inspection tool for each:
  - `https://uselunexa.com/en/` (also `/tr/` and `/es/`)
  - `https://uselunexa.com/en/about`, `/tr/about`, `/es/about`
  - `https://uselunexa.com/en/services` and each sub-page (`/mobile`, `/web`, `/intelligent`) — all 3 locales
  - `https://uselunexa.com/en/contact` (and `/tr`, `/es`)
  - `https://uselunexa.com/en/blog` (and `/tr`, `/es`)
- **Check for errors**
  - Coverage report → "Not indexed" and "Excluded" buckets
  - Enhancements → Breadcrumbs, Sitelinks searchbox, Merchant listings (FAQ-rich results won't show in this section but will land in Rich Results)

### 1–2 week follow-up

- **Watch coverage grow** from ~4 indexed URLs (today, English only) to ~30 (target after hreflang recognition)
- **Check international targeting** report to confirm Google sees the hreflang map
- **Rich Results test** each page via https://search.google.com/test/rich-results — validate `Organization`, `ProfessionalService`, `SiteNavigationElement`, `BreadcrumbList`, `FAQPage`, and (once blog has posts) `BlogPosting`

## 2. Bing Webmaster Tools (priority 2)

Bing is not Google, but it powers DuckDuckGo and ChatGPT Browse. Setup is trivial and compounds.

- Sign up at https://www.bing.com/webmasters/
- Add property `https://uselunexa.com`
- Verification method: reuse the existing Google HTML meta tag — Bing accepts it if you enable "Import from Google Search Console" during property creation (fastest path)
- Submit sitemap: `https://uselunexa.com/sitemap.xml`

## 3. Google Business Profile (priority 3)

Only relevant if you want local Turkey visibility (Istanbul, etc.). Skip if targeting purely international B2B.

- https://www.google.com/business/
- Register "Lunexa" as a business, category: **Software company** or **Web designer**
- Service area: Turkey + countries you serve (or set as "online only" — Google now supports service-area businesses without a physical address)
- Add logo, cover photo (the OG image works), a description, and link back to uselunexa.com
- Verify by postcard or video call (whichever Google offers)

## 4. LinkedIn Company Page (priority 2)

- https://www.linkedin.com/company/setup/new/
- Name: **Lunexa**
- Industry: Software Development
- Company size: 1–10
- Website: `https://uselunexa.com`
- Logo + banner (reuse the OG image)
- Write an "About" paragraph — lift from the homepage lead
- Post one inaugural announcement so there's something on the feed

## 5. Reserve social handles (priority 3)

Claim even if inactive — prevents squatters and lets future linking preserve brand continuity:

- X / Twitter: `@lunexa` or `@uselunexa`
- GitHub org: `lunexa` or `uselunexa`
- Instagram: `@uselunexa`
- Crunchbase: submit as organization

## 6. Keyword research & content strategy (priority 1)

Without a target keyword list we're writing blind. Do one pass:

- Free tool: **Google Keyword Planner** (inside Google Ads, free to register without running ads) — Start with "digital product studio", "custom software development", "mobile app agency", filter by Turkey + your target markets
- Free tool: **Ahrefs Webmaster Tools** (https://ahrefs.com/webmaster-tools) — once Search Console has data, AWT imports it and shows ranking opportunities
- Paid alternative: Ubersuggest, SEMrush trials

Pick **5 primary keywords** we'll optimize for over the next quarter. Map each to a target page (homepage, services sub-pages, or specific blog post). Example:

| Keyword | Target page | Intent |
|---------|-------------|--------|
| digital product studio | `/en/` | Brand, top of funnel |
| mobile app development agency | `/en/services/mobile` | Commercial |
| AI integration services | `/en/services/intelligent` | Commercial |
| (fill in after research) | `/en/blog/post-slug` | Informational |
| (fill in after research) | — | — |

## 7. Backlink seeding (priority 2)

Search rank is half on-page, half off-page. Pages rank better when other sites link to them.

- **Product Hunt** — launch once there's a first MVP product to show. Build a "Coming Soon" page on PH now to start gathering email follows.
- **Hacker News "Show HN"** — once the blog has a substantive post (e.g., "We rebuilt our marketing site with URL-based i18n — here's what changed for SEO"), submit it. Timing: Tuesday morning US Pacific.
- **Türkiye startup dizinleri:**
  - https://webrazzi.com/ — submit your startup profile
  - https://startups.watch/ — Türkiye startup database
  - https://kworks.com.tr/ — Koç ecosystem
- **Tech Behemoth / Clutch / GoodFirms** — software agency directories. Profile creation is free; some paid tiers exist but aren't necessary initially.
- **Guest posts / interviews** — reach out to 2–3 startup blogs or podcasts per quarter offering a piece on something concrete you've shipped.

## 8. Content cadence

Single biggest lever once the technical foundation is in place:

- **One blog post / month minimum.** Pick from the keyword map above.
- Post length: 1000–1800 words. Shorter posts don't rank for anything meaningful, longer ones get skimmed.
- Every post should:
  - Target a specific keyword (in the H1, URL slug, first paragraph, ~5 times across the body)
  - Include a code snippet, diagram, or screenshot so it's not a wall of text
  - Link to at least 2 other pages on the site (services pages are ideal)
  - Link to at least 2 authoritative external sources
- Publish in **English first**, then translate to TR + ES. Google gets the English indexed fastest; the other two accrete coverage.

## 9. Measurement (priority 1)

Every Monday check:

- **Search Console**
  - Performance → Queries (what people are actually finding us for)
  - Performance → Pages (which URLs get impressions)
  - Compare this week vs. last week
- **GA4**
  - Reports → Acquisition → User acquisition → First user medium = `organic`
  - Track: organic sessions, avg engagement time, contact form submissions from organic traffic
- **BetterStack** — uptime of `/api/health` is a ranking input; Google penalizes flaky sites

Set a quarterly goal: e.g., **"100 organic sessions/week by end of Q2"**. Measure.

## 10. Don't do these

- **Keyword stuffing** in meta descriptions, alt text, or body copy. Google's BERT is smart; unnatural repetition hurts.
- **Buying backlinks.** Manual or algorithmic, they carry penalty risk. Every link is earned.
- **AI-generated filler posts.** Google's Helpful Content Update specifically targets these. Use AI to draft, then rewrite with real substance — never publish raw LLM output.
- **Aggressive CSP enforcement** without observing Report-Only first. Breaking analytics loaders tanks SEO signals.
- **Cloaking** (showing different content to crawlers vs. users). Automatic de-indexing.

## Change log

- 2026-04-22: Initial playbook. Written after Milestones 16–17 (Prisma newsletter DB + URL-based i18n) landed.
