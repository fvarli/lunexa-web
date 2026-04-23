# Lunexa — Engineering Patterns

> **Status:** canonical as of 2026-04-23. Every pattern below is extracted from `lunexa-web` live code, with file:line references so a fresh session can open the source in one click.
>
> **Companion docs:** [`STACK.md`](./STACK.md) for the tech stack + why, [`CHECKLIST.md`](./CHECKLIST.md) for day-1 bootstrap.

Use this doc as a recipe book. Each section answers "how do we do X in a Lunexa codebase?" with code you can copy.

---

## Table of contents

1. [i18n pattern](#1-i18n-pattern)
2. [SEO baseline](#2-seo-baseline)
3. [Security baseline](#3-security-baseline)
4. [Analytics pattern](#4-analytics-pattern)
5. [Email pattern](#5-email-pattern)
6. [Newsletter double-opt-in](#6-newsletter-double-opt-in)
7. [Contact form pattern](#7-contact-form-pattern)
8. [Testing](#8-testing)
9. [Deploy and Ops](#9-deploy-and-ops)
10. [House rules](#10-house-rules)

---

## 1. i18n pattern

Three locales (`en`, `tr`, `es`), URL-based, **English has no prefix** (primary market canonicals are clean).

### Core files

| File | Role |
|------|------|
| `apps/web/src/i18n/config.ts` | `LOCALES`, `DEFAULT_LOCALE`, `STORAGE_KEY`, type `Locale` |
| `apps/web/src/i18n/dictionaries.ts` | Short UI strings, per-locale, used with `t("key.path")` |
| `apps/web/src/seo/content.ts` | Long-form page content (About story, Services copy, FAQ) — kept separate from UI strings so translators can hand off content in chunks |
| `apps/web/src/i18n/href.ts` | `localeHref(locale, href)` — wrap internal `<Link>` hrefs |
| `apps/web/src/seo/meta.ts` | `urlFor(locale, path)` — absolute public URLs for `<head>` tags, JSON-LD, sitemaps |
| `apps/web/src/i18n/provider.tsx` | Client React provider + `useT()` hook |
| `apps/web/src/proxy.ts` | Edge-level redirect/rewrite rules |

### The URL strategy (three rules)

See `apps/web/src/proxy.ts` — three cases, in order:

```ts
// 1. /en/* → 307 redirect to /* (strip the prefix; English has no prefix)
if (maybeLocale === DEFAULT_LOCALE) { ... }

// 2. /tr/* or /es/* → pass through, set x-locale header so the root layout
//    can mirror it to <html lang>
if (maybeLocale && PREFIXED_LOCALES.includes(maybeLocale as Locale)) { ... }

// 3. No locale prefix. Default to English. Cookie (set via switcher) can
//    redirect to /tr or /es on first visit; otherwise rewrite internally to /en/*.
```

**Rule:** `Accept-Language` is intentionally NOT consulted. Every first-time visitor lands on English; the language switcher writes the cookie, and subsequent visits follow it. This keeps the canonical URL clean for Googlebot.

### `urlFor` vs `localeHref`

Easy to confuse — they do different things:

```ts
// apps/web/src/seo/meta.ts
// Absolute URL for <head>, JSON-LD, sitemaps
urlFor("en", "/contact")   // "https://uselunexa.com/contact"
urlFor("tr", "/contact")   // "https://uselunexa.com/tr/contact"

// apps/web/src/i18n/href.ts
// Relative href for <Link> inside the app
localeHref("en", "/contact")  // "/contact"
localeHref("tr", "/contact")  // "/tr/contact"
```

**Always** use one of these for anything that targets an internal route. Never hardcode a prefix.

### Client hook usage

```tsx
"use client";
import Link from "next/link";
import { useT } from "@/i18n/provider";
import { localeHref } from "@/i18n/href";

export default function Nav() {
  const { t, locale } = useT();
  return (
    <Link href={localeHref(locale, "/contact")}>
      {t("nav.contact")}
    </Link>
  );
}
```

### Server component: read the locale from headers

```tsx
import { headers, cookies } from "next/headers";
import { LOCALES, DEFAULT_LOCALE, STORAGE_KEY, type Locale } from "@/i18n/config";

export default async function RootLayout({ children }) {
  const hdrs = await headers();
  const cookieStore = await cookies();

  const headerLocale = hdrs.get("x-locale");
  const cookieLocale = cookieStore.get(STORAGE_KEY)?.value;
  const locale: Locale =
    (headerLocale && (LOCALES as readonly string[]).includes(headerLocale)
      ? (headerLocale as Locale) : null)
    ?? (cookieLocale && (LOCALES as readonly string[]).includes(cookieLocale)
      ? (cookieLocale as Locale) : null)
    ?? DEFAULT_LOCALE;

  return <html lang={locale}>...</html>;
}
```

Full implementation: `apps/web/src/app/[locale]/layout.tsx:57-79`.

### Recipe: add a new locale (e.g., German)

1. `apps/web/src/i18n/config.ts` — add `"de"` to `LOCALES`, `"Deutsch"` to `LOCALE_LABELS`.
2. `apps/web/src/i18n/dictionaries.ts` — add `de: { ... }` with every key translated.
3. `apps/web/src/seo/content.ts` — add `de:` for `ABOUT`, `SERVICES_INDEX`, `SERVICE_*`, `BLOG_INDEX`, `CTA_BLOCK`, `RELATED_SERVICES`.
4. `apps/web/src/seo/meta.ts` — add `de:` to every `*_META` object + `OG_LOCALE["de"] = "de_DE"`.
5. `apps/web/content/blog/de/` — create the folder with at least the seed post.
6. Optional: add `de.md` for any static content pages.
7. Run `npx next build` — any missing key throws a TypeScript error because `Dictionary` is inferred from `en`.
8. E2E test: add a spec asserting `/de` serves German.

### Recipe: add a new page

For `/pricing`:

1. `apps/web/src/app/[locale]/pricing/page.tsx` with `generateMetadata` + default export.
2. `apps/web/src/seo/meta.ts` — add `PRICING_META: PageCopy` with `en/tr/es` titles + descriptions.
3. `apps/web/src/app/sitemap.ts` — add `{ path: "/pricing", priority: 0.8, changeFrequency: "monthly" }` to `STATIC_ROUTES`.
4. Add a `<BreadcrumbJsonLd />` block in the page (see §2 for the recipe).
5. Internal links: add `pricing` to header nav + any relevant CTA. Always through `localeHref()`.

---

## 2. SEO baseline

Every Lunexa page ships with: canonical, hreflang map, OG tags (including image), Twitter card, and at least a Breadcrumb JSON-LD. The homepage layers on Organization + ProfessionalService + WebSite + SiteNavigationElement + FAQPage.

### Root JSON-LD graph

Emitted in `apps/web/src/app/[locale]/layout.tsx:12-75` as a `@graph` array on every page:

- **Organization** — `name`, `url`, `logo`, `email`, `contactPoint`, `sameAs` (social links)
- **ProfessionalService** — `name`, `serviceType`, `areaServed`, `slogan`, `priceRange`, `parentOrganization` (references `#organization`)
- **WebSite** — `url`, `name`, `inLanguage`, `publisher` (references `#organization`)
- **SiteNavigationElement** — arrays of `name` and `url` for the main nav

On the homepage, a separate `<script>` tag emits **FAQPage** (`apps/web/src/components/home-faq.tsx:13-24`).

### Per-page: canonical, hreflang, OG, Twitter

Every page (except the homepage, which has its own `generateMetadata`) uses `buildPageMetadata(locale, path, copy)` from `apps/web/src/seo/meta.ts:226`:

```ts
export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale } = await params;
  const safe = safeLocale(locale);
  return buildPageMetadata(safe, "/contact", CONTACT_META);
}
```

This produces:

- `<title>` and `<meta name="description">`
- `<link rel="canonical">` pointing at the locale-correct URL
- `<link rel="alternate" hreflang=...>` for every locale + `x-default` → English
- `og:title`, `og:description`, `og:url`, `og:site_name`, `og:type`, `og:locale`, `og:locale:alternate`, `og:image`
- `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`

**Gotcha:** when you declare `openGraph` yourself in `Metadata`, Next.js does **not** auto-inject the `opengraph-image.tsx` image — you must include `images: [OG_IMAGE]` manually. See `apps/web/src/seo/meta.ts:244-252` for the `OG_IMAGE` constant.

### Breadcrumb pattern

`apps/web/src/components/breadcrumb-jsonld.tsx` (full listing):

```tsx
type Crumb = { name: string; url: string };

export default function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

Usage:

```tsx
<BreadcrumbJsonLd
  items={[
    { name: "Home", url: urlFor(safe, "/") },
    { name: "Blog", url: urlFor(safe, "/blog") },
    { name: post.title, url: postUrl },
  ]}
/>
```

Always build URLs with `urlFor()` — **never** `` `${BASE}/${locale}${path}` ``. English default has no prefix; `urlFor` is the single source of truth.

### BlogPosting JSON-LD

See `apps/web/src/app/[locale]/blog/[slug]/page.tsx:61-74`:

```ts
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.description,
  datePublished: post.date,
  dateModified: post.date,
  author: { "@type": "Organization", name: post.author, url: BASE },
  publisher: { "@id": `${BASE}/#organization` },
  mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
  url: postUrl,
  inLanguage: safe,
  keywords: post.tags.join(", "),
};
```

### Sitemap

`apps/web/src/app/sitemap.ts` — async function returning `MetadataRoute.Sitemap`. Emits every static route × every locale (with `alternates.languages`) + every blog post × every locale.

```ts
function languagesMap(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of LOCALES) map[l] = urlFor(l, path);
  map["x-default"] = urlFor(DEFAULT_LOCALE, path);
  return map;
}
```

Current count: ~30 static URLs + N blog posts × 3 locales.

### robots.txt

`apps/web/src/app/robots.ts` — denies ten AI crawlers (`Amazonbot`, `Applebot-Extended`, `Bytespider`, `CCBot`, `ClaudeBot`, `Google-Extended`, `GPTBot`, `meta-externalagent`, `PerplexityBot`, `YouBot`) at the root and sets `Sitemap:`. **No `Host:` directive** — Google doesn't support it, Bing flags it.

### Recipe: add a new page with full SEO

For `/pricing`:

1. Write `PRICING_META: PageCopy` in `seo/meta.ts`.
2. In `[locale]/pricing/page.tsx`:
   ```tsx
   export async function generateMetadata({ params }): Promise<Metadata> {
     const { locale } = await params;
     const safe = safeLocale(locale);
     return buildPageMetadata(safe, "/pricing", PRICING_META);
   }
   export default async function PricingPage({ params }) {
     const { locale } = await params;
     const safe = safeLocale(locale);
     return (
       <>
         <BreadcrumbJsonLd items={[
           { name: "Home", url: urlFor(safe, "/") },
           { name: "Pricing", url: urlFor(safe, "/pricing") },
         ]} />
         <PricingContent />
       </>
     );
   }
   ```
3. Add `/pricing` to `STATIC_ROUTES` in `apps/web/src/app/sitemap.ts`.
4. Link from header / footer / home.

---

## 3. Security baseline

Layered defenses — see [`STACK.md §7`](./STACK.md#7-security). This section is recipe-level.

### Middleware stack (Express)

`apps/api/src/app.ts:172-258`:

```ts
const app = express();
app.set("trust proxy", 1);           // one reverse proxy (nginx)
app.use(helmet());                   // sensible defaults
app.use(cors({ origin: ..., methods: ["GET","POST","OPTIONS"] }));

// JSON body parsing with 10kb cap and clean 413/400 handling
const parseJson = express.json({ limit: "10kb" });
function jsonBody(req, res, next) { parseJson(req, res, (err) => { ... }); }

// Three-tier rate limits
const windowMs = 15 * 60 * 1000;
app.use(rateLimit({ windowMs, max: 100 }));                   // global
const contactLimiter = rateLimit({ windowMs, max: 5 });        // /api/contact
const newsletterLimiter = rateLimit({ windowMs, max: 3 });     // /api/newsletter/subscribe
```

### CORS allow-list

`apps/api/src/app.ts:178-190`:

```ts
const rawCorsOrigins = process.env.CORS_ORIGIN || "";
const explicitAllowedOrigins = rawCorsOrigins.split(",").map(s => s.trim()).filter(Boolean);
const localDevOriginPattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

function isAllowedOrigin(origin?: string): boolean {
  if (!origin) return true;  // same-origin fetch (no Origin header)
  if (explicitAllowedOrigins.includes(origin)) return true;
  if (process.env.NODE_ENV !== "production" && localDevOriginPattern.test(origin)) return true;
  return false;
}
```

Production `CORS_ORIGIN`: `https://uselunexa.com,https://www.uselunexa.com`. For new products on subdomains, add them to the allow-list.

### HTML escaping for email

`apps/api/src/app.ts:35-42`:

```ts
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
```

**Call `escapeHtml()` on every user-supplied string** before interpolating into an HTML email body. See `apps/api/src/app.ts:303-305` for the canonical call site:

```ts
const safeName = escapeHtml(name);
const safeEmail = escapeHtml(email);
const safeMessage = escapeHtml(message);
```

### Turnstile verification

`apps/api/src/app.ts:44-65`:

```ts
export async function verifyTurnstile(token, remoteip, secret = process.env.TURNSTILE_SECRET_KEY) {
  if (!secret) return true;    // skip in local dev
  if (!token) return false;
  // POST to https://challenges.cloudflare.com/turnstile/v0/siteverify
  // ...returns true on success
}
```

Endpoint pattern:

```ts
app.post("/api/contact", jsonBody, contactLimiter, async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ ... });

  const turnstileOk = await verifyTurnstile(
    req.body.turnstileToken,
    req.ip,
  );
  if (!turnstileOk) return res.status(400).json({ ok: false, message: "CAPTCHA failed." });

  // ...proceed
});
```

### JWT tokens (newsletter)

`apps/api/src/app.ts:78-132`:

```ts
export function signSubscriptionToken(email: string, secret: string): string {
  return jwt.sign({ email, purpose: "newsletter-confirm" }, secret, { expiresIn: "15m" });
}

export function verifySubscriptionToken(token, secret) {
  try {
    const decoded = jwt.verify(token, secret) as { email?: unknown; purpose?: unknown };
    if (decoded.purpose !== "newsletter-confirm" || typeof decoded.email !== "string") return null;
    return { email: decoded.email };
  } catch { return null; }
}
```

**Always** check `purpose` — never trust a token signed for a different flow. Never reuse the same secret across purposes (use `NEWSLETTER_SECRET` for newsletter, a different one for product auth if/when it exists).

### Production bind

`apps/api/src/server.ts`:

```ts
const HOST = process.env.NODE_ENV === "production" ? "127.0.0.1" : "0.0.0.0";
app.listen(PORT, HOST, () => { ... });
```

Production API never listens on a public interface — nginx is the only path in.

### CSP flip (Report-Only → Enforced)

Currently Report-Only in `apps/web/next.config.ts:16-24`. To enforce:

1. Watch browser Console + Cloudflare analytics for 3-7 days.
2. Rule out any legit script/style triggering violations.
3. Change key from `"Content-Security-Policy-Report-Only"` → `"Content-Security-Policy"`.
4. Deploy, re-check.
5. Revert if anything breaks.

### Recipe: add a new POST endpoint

```ts
const mySchema = z.object({ field: z.string().min(1) });
const myLimiter = rateLimit({ windowMs, max: 10 });

app.post("/api/my-thing", jsonBody, myLimiter, async (req, res) => {
  const parsed = mySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      errors: parsed.error.issues.map(i => ({ field: i.path.join("."), message: i.message })),
    });
  }

  const turnstileOk = await verifyTurnstile(req.body.turnstileToken, req.ip);
  if (!turnstileOk) return res.status(400).json({ ok: false, message: "CAPTCHA failed." });

  // ...business logic

  res.json({ ok: true });
});
```

Write a Vitest spec alongside (see §8).

---

## 4. Analytics pattern

### Loading GA

`apps/web/src/components/analytics.tsx`:

```tsx
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `}</Script>
    </>
  );
}
```

Mounted in the root `apps/web/src/app/layout.tsx` (outside the `[locale]` layer).

### `trackEvent` helper

Also exported from `analytics.tsx`:

```ts
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return; // GA not loaded → noop
  gtag("event", name, params ?? {});
}
```

Noop-safe — never throws if GA is disabled or not yet loaded.

### Event naming

Snake_case verbs: `contact_form_submit`, `newsletter_subscribe`, `blog_cta_click`, `signup_completed`, `purchase_initiated`. Avoid `user_clicked_X` (too generic); prefer the business outcome.

### Event params

Flat objects, primitive values only. GA4 nested objects are hard to query.

```ts
// good
trackEvent("contact_form_submit", { locale: "en" });
trackEvent("blog_cta_click", { slug: "hello-world", destination: "contact" });

// avoid
trackEvent("signup", { user: { email: "...", plan: { tier: "..." } } });
```

### Currently wired events

| Event | Where | Params |
|-------|-------|--------|
| `contact_form_submit` | `apps/web/src/components/contact-form.tsx` (success branch) | `{ locale }` |
| `newsletter_subscribe` | `apps/web/src/components/newsletter-form.tsx` (success branch) | `{ locale }` |
| `blog_cta_click` | `apps/web/src/components/blog-post-content.tsx` (`<CtaBlock onClick />`) | `{ slug, destination }` |

### Recipe: add a new event

1. Decide the name (`verb_noun`, snake_case).
2. Import `trackEvent` at the call site.
3. Fire it in the success branch of whatever user action represents.
4. Document in `SEO_PLAYBOOK.md` §12.

### Cookie consent

`apps/web/src/components/cookie-consent.tsx` — client-side banner.

- GA is "always on" per our current policy; banner discloses it.
- No Consent Mode v2 wiring. If you ship a product to a strict-enforcement market (EU audit risk), replace this with Consent Mode before launch.

---

## 5. Email pattern

### Transporter boot

`apps/api/src/app.ts:260-271`:

```ts
const mailer: Transporter = transporter ?? nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE !== "false",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
```

Factory accepts an injected transporter — see `apps/api/tests/contact.test.ts` for the mocked pattern.

### Localized templates

`apps/api/src/emails.ts` — one file per template family:

```ts
export function contactAutoReply(locale: string, name: string) {
  const t = LOCALE_STRINGS[resolveEmailLocale(locale)];
  return {
    subject: t.subject,
    html: `<p>${t.greeting(name)}...</p>`,
    text: `${t.greeting(name)}...`,
  };
}
```

**Always ship both HTML and text.** Plain-text is what spam filters read first; missing text = higher spam score.

`resolveEmailLocale(raw)` coerces `tr-TR`, `en-US` etc. down to our 3 locales.

### Consent versioning

`apps/api/src/app.ts:31`:

```ts
export const NEWSLETTER_CONSENT_VERSION = "2026-04-22";
```

Bump this string whenever the consent copy changes. The version is persisted in `subscribers.consent_version` — legal defense when regulators ask "which consent did this user agree to."

### DMARC aggregate report flow

Daily XML reports land at `rua=mailto:abonelikler@ferzendervarli.com`. Scan for:

- `disposition` — should always be `none` for your mail
- `dkim` + `spf` — both `pass` expected
- `source_ip` — ensure only your legit senders (Zoho, VPS if/when you send)

Any `fail` is a ticket — investigate before opening paid email campaigns.

### Recipe: add a new transactional email

1. Add strings to `LOCALE_STRINGS` in `apps/api/src/emails.ts`.
2. Add the factory function.
3. In the endpoint: `const { subject, html, text } = myTemplate(locale, ...); await mailer.sendMail({ to, from, subject, html, text });`.
4. Vitest spec: mock the transporter, assert `sendMail` called with a payload containing the translated subject.

---

## 6. Newsletter double-opt-in

Full flow in `apps/api/src/app.ts`:

- `POST /api/newsletter/subscribe` — receives `{ email, consent: true, locale, turnstileToken }`. Validates, verifies Turnstile, signs a **15-minute** confirm JWT, emails the user a link.
- `GET /api/newsletter/confirm?token=...` — verifies the JWT, then `prisma.subscriber.upsert()` with IP/UA/referer/locale/consent_version. Redirects to `/newsletter/confirmed`.
- `GET /api/newsletter/unsubscribe?token=...` — verifies the **30-day** unsubscribe JWT, sets `unsubscribedAt` via update (P2025 caught → redirect anyway). Redirects to `/newsletter/unsubscribed`.

### Why upsert on confirm (not insert)

A returning user who clicked confirm → unsubscribed → re-subscribed should end up with one row, with `unsubscribedAt = null` and `confirmedAt = now()`. `upsert` handles both paths in one query.

### Why soft-delete on unsubscribe

`unsubscribedAt` → timestamp. Keeps the row for audit + re-subscribe without data loss. GDPR erasure is a manual operation (a separate endpoint or direct DB task).

### Recipe: similar flow for product onboarding

If a product needs email-verified signup:

1. Define the schema (whatever user fields + `email`).
2. On signup: sign a JWT with `purpose: "product-email-verify"`, 15min TTL. Email link.
3. On confirm: verify JWT, upsert user row.
4. Separate secret (`PRODUCT_JWT_SECRET`) — never share newsletter's secret.
5. Rate-limit harder than newsletter (e.g., 2/15min per IP) — account creation is more sensitive than a mailing-list opt-in.

---

## 7. Contact form pattern

### Client (`apps/web/src/components/contact-form.tsx`)

- Zod schema (mirrors server's `contactSchema`) for instant client validation.
- Turnstile widget from `@marsidev/react-turnstile` — renders challenge.
- Honeypot field (`company`) — hidden from real users, bots fill it.
- Locale flows through: `useT().locale` → POST body.

### Server (`apps/api/src/app.ts:278-...`)

1. Honeypot check — if `company` is non-empty, return `{ ok: true }` (fake-success) **without** sending email. Bots feel successful; inbox stays clean.
2. Validate with `contactSchema.safeParse(req.body)`.
3. Verify Turnstile.
4. Build email: `escapeHtml` every user string, then compose HTML + text.
5. `mailer.sendMail(...)`. Log **only timestamp** — never the email or message (PII).

### Why all fields in `contactSchema`

`apps/api/src/app.ts:140-154`:

```ts
export const contactSchema = z.object({
  name: z.string().transform((v) => v.trim()).pipe(z.string().min(2).max(80)),
  email: z.string().transform((v) => v.trim().toLowerCase()).pipe(z.string().email().max(254)),
  message: z.string().transform((v) => v.trim()).pipe(z.string().min(10).max(2000)),
  locale: z.enum(["en", "tr", "es"]).optional(),
});
```

Transforms run **before** validation → trimmed and lowercased input is what's validated, not the raw user string. Prevents "valid but ugly" data landing in the mail template.

---

## 8. Testing

### API: Vitest + supertest

`apps/api/tests/contact.test.ts` — canonical pattern:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import type { Transporter } from "nodemailer";
import { createApp } from "../src/app";

function mockTransporter(): Transporter {
  return { sendMail: vi.fn().mockResolvedValue({ messageId: "test-id" }) } as unknown as Transporter;
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    delete process.env.TURNSTILE_SECRET_KEY;   // skip Turnstile network calls
    process.env.SMTP_USER = "noreply@test";
    process.env.CONTACT_RECEIVER = "inbox@test";
  });

  it("returns 400 with field errors for invalid input", async () => {
    const transporter = mockTransporter();
    const app = createApp({ transporter });
    const res = await request(app).post("/api/contact").send({ name: "x", email: "bad", message: "tiny" });
    expect(res.status).toBe(400);
    expect(transporter.sendMail).not.toHaveBeenCalled();
  });
});
```

Key moves:

- Use `createApp({ transporter, db, rateLimits })` factory — inject mocks instead of hitting real SMTP / Postgres / Turnstile.
- `beforeEach` resets relevant env vars.
- `request(app).post(...)` — supertest handles the Express lifecycle.
- Assert on both the response **and** the side effect (did `sendMail` fire?).

Run: `npm test` in `apps/api/`.

### Web: Playwright

`apps/web/tests/e2e/homepage.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("/ serves the English home without redirecting", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("/en redirects to /", async ({ page }) => {
    await page.goto("/en");
    await expect(page).toHaveURL(/\/$/);
  });
});
```

Config (`apps/web/playwright.config.ts`) boots `npm run dev` via `webServer`. Tests hit localhost.

Run: `npx playwright test` in `apps/web/`. First time: `npx playwright install --with-deps chromium`.

### Recipe: add a new endpoint test

1. `touch apps/api/tests/<feature>.test.ts`.
2. Import `createApp`, inject a mocked DB / transporter / rate limits.
3. Write happy path + one error path (validation) + one abuse path (rate limit or honeypot).
4. Run `npm test` — should be green.
5. Include in CI once CI exists.

### Recipe: add a new E2E spec

1. `touch apps/web/tests/e2e/<feature>.spec.ts`.
2. `test.describe` a focused scope.
3. Use `page.getByRole`, `page.getByLabel` over CSS selectors (more robust, accessibility-aligned).
4. Keep to ≤ 5 assertions per test; each test should be readable at a glance.
5. Run `npx playwright test`.

---

## 9. Deploy and ops

### VPS layout

- OS: Ubuntu LTS
- Node via `nvm` (latest active LTS)
- Repo: `~/apps/lunexa-web`
- pm2 processes:
  - `lunexa-web` — `node apps/web/.next/standalone/apps/web/server.js`
  - `lunexa-api` — `node apps/api/dist/server.js`
- Logs: `pm2 logs <name>` or `~/.pm2/logs/<name>-out.log`

### Nginx reverse proxy (template)

```nginx
server {
  listen 443 ssl http2;
  server_name uselunexa.com;

  ssl_certificate     /etc/letsencrypt/live/uselunexa.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/uselunexa.com/privkey.pem;

  # Next standalone
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  # Express API
  location /api {
    proxy_pass http://127.0.0.1:4000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}

# HTTP → HTTPS
server {
  listen 80;
  server_name uselunexa.com www.uselunexa.com;
  return 301 https://uselunexa.com$request_uri;
}
```

### Environment variables

- Each app has `.env.example` committed. Real values live **only on the VPS**.
- Never commit `.env.production`. Use the VPS shell or a non-committed `.env` file read by dotenv.
- For web: only `NEXT_PUBLIC_*` vars reach the browser. Secrets are always server-only.

### Required env vars

**`apps/api/`:**

| Var | Purpose |
|-----|---------|
| `NODE_ENV` | `production` on VPS |
| `PORT` | `4000` |
| `DATABASE_URL` | `postgresql://user:pass@host:5432/db?schema=public` |
| `CORS_ORIGIN` | comma-separated allowed origins |
| `NEWSLETTER_SECRET` | 32+ byte random (openssl rand -hex 32) — signs newsletter JWTs |
| `NEWSLETTER_CONFIRM_URL` | `https://uselunexa.com/newsletter/confirmed` base |
| `NEWSLETTER_UNSUBSCRIBE_URL` | `https://uselunexa.com/newsletter/unsubscribed` base |
| `SITE_BASE_URL` | `https://uselunexa.com` |
| `SMTP_HOST` | `smtppro.zoho.eu` |
| `SMTP_PORT` | `465` |
| `SMTP_SECURE` | `true` |
| `SMTP_USER` | Zoho username |
| `SMTP_PASS` | Zoho app password |
| `CONTACT_RECEIVER` | `hello@uselunexa.com` |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile server secret |

**`apps/web/`:**

| Var | Purpose |
|-----|---------|
| `NEXT_PUBLIC_API_BASE_URL` | empty in prod (same-origin `/api`), `http://localhost:4000` in dev |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile client key |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_GSC_VERIFICATION` | GSC meta-tag token |

### Deploy script (manual today)

```bash
# SSH to VPS, then:
cd ~/apps/lunexa-web
git pull

# API
cd apps/api
npm ci
npm run db:deploy
npm run build

# Web
cd ../web
npm ci
npm run build

# Reload both
pm2 reload lunexa-api lunexa-web
pm2 save
```

Prefer a `scripts/deploy.sh` once you stop editing the steps.

### BetterStack uptime

Point a monitor at `https://uselunexa.com/api/health`. Expected 200 with `{"ok":true}`. Alert channel: email → phone.

### Cloudflare DNS required records

| Name | Type | Value | Proxied |
|------|------|-------|---------|
| `uselunexa.com` | A | VPS IP | ✅ Orange |
| `www.uselunexa.com` | CNAME | `uselunexa.com` | ✅ Orange |
| `_dmarc.uselunexa.com` | TXT | `v=DMARC1; p=quarantine; ...` | — |
| `uselunexa.com` | TXT | `v=spf1 include:zoho.eu ~all` | — |
| `zmail._domainkey.uselunexa.com` | CNAME | Zoho-provided | — |

---

## 10. House rules

### Commits

- Format: `type(scope): message` — conventional.
- Types in use: `feat`, `fix`, `refactor`, `chore`, `docs`, `seo`, `test`.
- **No `Co-Authored-By` trailers.** Commits must appear only under the author's credentials.
- No force-push to `main`. If you must amend, do so before push.
- Never skip hooks (`--no-verify`) unless there's a documented reason.

### Copy

- User-facing copy is **English-first**. Turkish/Spanish are translations of the English source, not independent rewrites.
- Legal pages (privacy, terms) are English-primary; TR/ES copies are direct translations, not region-localized terms.

### Env strategy

- `.env.example` committed; real values only on VPS.
- Secrets rotate when leaked. Generate with `openssl rand -hex 32` or equivalent.
- Never interpolate secrets into log lines.

### Code style

- No comments explaining what the code does — identifiers and tests should do that.
- Comments exist only for **why** something is non-obvious, a workaround, or a subtle invariant.
- No "refactor while we're here." Diffs stay scoped to the task.
- No premature abstractions. Three repeated lines is better than a premature helper.
- No feature flags / toggles until there's a reason to split behavior.

### PR / review

- Solo repo today — no PRs. When a second committer joins, open PRs for anything non-trivial.
- Even for solo: read your own diff before push.

### File generation

- Don't create `*.md` planning/analysis files unless explicitly asked. Work from conversation context.
- Don't generate `README-fix.md` or `CHANGES.md` in place of commit messages.

### Plan mode

- Use plan mode when the scope is uncertain, the task spans 3+ files, or the user asked for a plan.
- Skip it for typo fixes, one-line edits, trivial renames.
- When in plan mode, the only file you can edit is the plan file.

### Testing

- A PR without a test for a new endpoint is incomplete.
- Every new event wired needs the event name added to `SEO_PLAYBOOK.md` §12.

---

## Cross-references

- [`STACK.md`](./STACK.md) — what's in the stack and why
- [`CHECKLIST.md`](./CHECKLIST.md) — new product day-1
- [`../../../SEO_PLAYBOOK.md`](../../../SEO_PLAYBOOK.md) — SEO ops
- [`../AGENTS.md`](../AGENTS.md) — Next.js 16 has breaking changes vs training data
