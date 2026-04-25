# Lunexa — Technology Stack

> **Status:** canonical as of 2026-04-23. Derived from the live `lunexa-web` codebase. New Lunexa products default to this stack. Deviate only with a written reason.
>
> **Companion docs:** [`PATTERNS.md`](./PATTERNS.md) for code-level recipes, [`CHECKLIST.md`](./CHECKLIST.md) for day-1 bootstrap.

Every choice below exists because of a trade-off already lived through on `uselunexa.com`. When starting a new product, read this first — not to comply, but to know which fights have already been fought.

---

## 1. Runtime & Language

- **Node.js 20+** — active LTS. `@types/node` is pinned to `^25` in `apps/web/package.json` and `^25.5.2` in `apps/api/package.json`, so on a new machine run `nvm use 20` (or later).
- **TypeScript**
  - Web: `typescript ^5` (`apps/web/package.json`)
  - API: `typescript ^6.0.2` (`apps/api/package.json`) — the API is on the newer major; kept in sync as new products spin up
  - Strict mode on (see `apps/web/tsconfig.json` and `apps/api/tsconfig.json`)
- **Module system:** ESM. Both apps ship `type: "module"` semantics via Next/tsx tooling.
- **Package manager:** npm. Neither app uses pnpm/yarn; monorepo has no workspaces file. A new product repo may adopt pnpm if it has multiple apps — decide per-repo, don't refactor `lunexa-web`.

---

## 2. Web application (`apps/web`)

### Framework

- **Next.js 16** (`^16.2.4`) — App Router + Turbopack.
  - File convention renamed from `middleware.ts` → `proxy.ts`. Always use `proxy` going forward; old material online is wrong.
  - Docs we consult live in `node_modules/next/dist/docs/` — read the version shipped with the repo, never guess from training data. `apps/web/AGENTS.md` enforces this rule.
  - `output: "standalone"` in `apps/web/next.config.ts:43` → single-binary deploy, no node_modules on the VPS.
  - `poweredByHeader: false` — removes `X-Powered-By: Next.js`.
  - `compress: true` — gzip at the Next layer (Cloudflare handles further compression).

- **React 19.2.5** — pinned exact, matches Next 16's peer expectation.

### Styling

- **Tailwind CSS v4** (`^4`) via `@tailwindcss/postcss ^4`.
- No `tailwind.config.ts` — Tailwind v4 moved to CSS-based configuration. Tokens live in `apps/web/src/app/globals.css` (design tokens + dark/light theme CSS variables).
- No CSS-in-JS runtime. Component-level utility classes only. Global CSS is one file.

### Fonts

- **`next/font/google`** with Geist Sans + Geist Mono (used in `apps/web/src/app/layout.tsx`).
- Why: self-hosted fonts via the Next pipeline. No external CDN calls at runtime → better Core Web Vitals, better privacy (no Google Fonts cookie), simpler CSP.

### Markdown blog

- **`gray-matter ^4.0.3`** — parses frontmatter.
- **`marked ^18.0.2`** — renders markdown to HTML.
- Blog posts live in-repo at `apps/web/content/blog/<locale>/<slug>.md`.
- No MDX compiler — plain markdown is enough for our content today; if a product needs embedded React components in posts, add `@next/mdx` then.
- Why in-repo: no external CMS dependency, git history is the editorial log, SEO can be computed at build time.

### Anti-spam

- **Cloudflare Turnstile** via `@marsidev/react-turnstile ^1.5.0` on the client.
- Server-side verification in `apps/api/src/app.ts` via `verifyTurnstile()`.
- Skips verification when `TURNSTILE_SECRET_KEY` is unset → local dev works without Cloudflare.

### Testing

- **Playwright** (`@playwright/test ^1.59.1`) for E2E.
- Config: `apps/web/playwright.config.ts`. Boots the dev server via Playwright's `webServer` option.
- 16 tests currently; run with `npx playwright test` from `apps/web/`.
- Scope: URL routing (locale prefix redirects), homepage render, navigation, sitemap/robots visibility.

### Why this web stack

- **Next 16 + React 19** — SSR + static generation + client hydration without leaving one framework. Route-level metadata = SEO with zero glue.
- **Tailwind v4** — config-free onboarding; new products don't need to copy a config.
- **No CSS framework library (no MUI, no shadcn)** — every component is a local primitive. When we ship a product, we don't carry 400 KB of chrome we don't use.
- **In-repo blog** — portability. Move the repo, move the blog. No "where did the posts go" migrations.

---

## 3. API application (`apps/api`)

### Framework

- **Express 5.2.1** — stable, boring, no surprises. Modern async/await throws propagate to error handler out of the box.
- **No Fastify / Hono / Elysia** — our endpoint count is small; the ecosystem maturity win of Express outweighs the perf win of alternatives.

### Data

- **Prisma 7.8** (`@prisma/client`, `prisma`) with **`@prisma/adapter-pg`** driver adapter model.
- **`pg ^8.20.0`** as the underlying driver.
- **PostgreSQL 16** on the VPS.
- **Citext extension** for case-insensitive `email` columns — `apps/api/prisma/schema.prisma:13` declares `email String @unique @db.Citext`.
- Migration flow: `npm run db:migrate` (dev) / `npm run db:deploy` (prod, CI). See `apps/api/package.json` scripts.

### Auth / tokens

- **jsonwebtoken 9.0.3** for stateless tokens:
  - Newsletter confirm token — **15-minute TTL**, purpose `newsletter-confirm`
  - Newsletter unsubscribe token — **30-day TTL**, purpose `newsletter-unsubscribe`
- Separate signing secrets per purpose (see `NEWSLETTER_SECRET` env). Never reuse `SMTP_PASS` or a database secret as the JWT secret.
- No session store. No Redis. JWT only.

### Mail

- **Nodemailer 8.0.4** transporter configured from env (`SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`).
- Production: Zoho Mail, `smtppro.zoho.eu:465` (TLS), DKIM selector `zmail`.
- Localized templates in `apps/api/src/emails.ts`: `contactAutoReply(locale, name)`, `newsletterConfirmation(locale, opts)`.

### Validation

- **Zod 4.3.6** for every endpoint payload.
- Schemas exported from `apps/api/src/app.ts` for re-use in tests (`contactSchema`, `newsletterSchema`).

### Security middleware

- `helmet ^8.1.0` — sensible default headers.
- `cors ^2.8.6` — explicit allow-list via `CORS_ORIGIN` env.
- `express-rate-limit ^8.3.2` — three-tier limits:
  - Global: 100 requests / 15 min
  - Contact: 5 / 15 min
  - Newsletter subscribe: 3 / 15 min
- `app.set("trust proxy", 1)` — one reverse proxy (nginx).
- `express.json({ limit: "10kb" })` — hard cap on body size.
- Custom middleware: `jsonBody()` in `apps/api/src/app.ts:212` handles 413/400 responses cleanly.

### Testing

- **Vitest 4.1.5** + **supertest 7.2.2** for endpoint tests.
- 3 spec files currently: `apps/api/tests/{contact,newsletter,helpers}.test.ts`.
- Config: `apps/api/vitest.config.ts`.
- Run: `npm test` from `apps/api/`.

### Runtime tooling

- `tsx ^4.21.0` for dev (`npm run dev` → `tsx watch src/server.ts`).
- `tsc` build for prod (`npm run build` → compiles to `dist/`).

### Why this API stack

- **Express over newer alternatives** — every problem has a Stack Overflow answer. Time is the scarce resource.
- **Prisma + pg adapter** — Prisma's new driver-adapter model lets us use `pg` directly (no Prisma Engine binary), which makes deploy simpler on the VPS and opens the door to runtime flexibility (Neon/Supabase later if needed).
- **JWT over sessions** — a contact form + a newsletter don't need server state. Re-evaluate when a product needs authenticated user accounts.
- **Zod over Joi/Yup** — TypeScript inference out of the box.
- **Vitest over Jest** — faster, aligned with Vite tooling, first-class ESM.

---

## 4. Database

### Current schema (`apps/api/prisma/schema.prisma`)

Single model: `Subscriber` (newsletter). Snapshot of fields and why each exists:

| Field | Type | Why |
|-------|------|-----|
| `id` | BigInt (autoincrement) | Standard surrogate PK |
| `email` | Citext unique | Case-insensitive match without `LOWER()` in every query |
| `confirmedAt` | timestamptz | When the double-opt-in link was clicked (or re-confirm happened) |
| `unsubscribedAt` | timestamptz nullable | Soft-delete marker; re-subscribe flips this to null |
| `locale` | varchar(8) nullable | Captured from browser `Accept-Language` at confirm time |
| `ip` | inet nullable | Raw IP — **PII, disclosed in privacy policy** |
| `ipHash` | text nullable | `sha256(NEWSLETTER_SECRET::ip)` — non-PII identifier for dedup/abuse |
| `userAgent` | text nullable | Device/browser context |
| `referer` | text nullable | Campaign attribution |
| `consentVersion` | varchar(16) nullable | Tag of the consent copy the user accepted; bump when wording changes (legal defense) |
| `createdAt`, `updatedAt` | timestamptz | Prisma `@updatedAt` auto-managed |

Table mapped to `subscribers` (snake_case) via `@@map`.

### Migrations

Live in `apps/api/prisma/migrations/`. Flow:

```bash
# dev: generates a new migration from schema changes
npm run db:migrate

# prod: applies migrations on boot (no SQL edits on the box)
npm run db:deploy
```

### Conventions

- Every new model maps to snake_case (`@@map`) and snake_case columns (`@map`).
- Every PII column lives side-by-side with a hashed complement (e.g. `ip` + `ipHash`). New products carrying user data should follow this pattern.
- Timestamp columns: `timestamptz(6)` always. No `DateTime @db.Timestamp` — never store timezones implicitly.

---

## 5. Email

### Transport

- Zoho Mail business plan (€1/user/mo).
- SMTP endpoint: `smtppro.zoho.eu:465` (TLS).
- DKIM selector: `zmail` (managed by Zoho DNS records).
- `From` address in production: `hello@uselunexa.com`.

### Auth chain

| Record | Value | Where |
|--------|-------|-------|
| SPF | `v=spf1 include:zoho.eu ~all` | Cloudflare TXT on `uselunexa.com` |
| DKIM | CNAME to Zoho-provided selector | Cloudflare CNAME for `zmail._domainkey.uselunexa.com` |
| DMARC | `v=DMARC1; p=quarantine; sp=quarantine; np=quarantine; adkim=r; aspf=r; pct=100; rua=mailto:abonelikler@ferzendervarli.com` | Cloudflare TXT on `_dmarc.uselunexa.com` |

Aggregate DMARC reports land at `abonelikler@ferzendervarli.com` daily; all passing as of 2026-04-22.

### Template localization

- `apps/api/src/emails.ts` holds per-locale email factories.
- Each factory returns `{ subject, html, text }` for nodemailer.
- **Always ship both HTML and text** — text is the spam-filter-friendly fallback.
- HTML bodies **must** call `escapeHtml()` on every user-supplied string before interpolation (see `apps/api/src/app.ts:303-305` for the contact-form call sites).

---

## 6. Analytics & Consent

- **Google Analytics 4** via `gtag.js`.
- Loaded by `apps/web/src/components/analytics.tsx` — `Script` strategy `afterInteractive`, gated on `NEXT_PUBLIC_GA_ID`.
- Custom event helper: `trackEvent(name, params?)` — noop when GA is not loaded.
- Three wired events as of 2026-04-23: `contact_form_submit`, `newsletter_subscribe`, `blog_cta_click`. See [`PATTERNS.md`](./PATTERNS.md#4-analytics-pattern).

### Consent Mode

GA is intentionally always-on. The cookie consent banner (`apps/web/src/components/cookie-consent.tsx`) transparently discloses that analytics is active; we don't defer the `gtag("config", ...)` call on consent state. Rationale: simpler implementation, full attribution, transparent disclosure. Revisit if we enter an enforcement market (EU strict interpretation, CA CCPA) with >100k MAU.

### Privacy-preserving alternatives considered

- **Plausible / Fathom / Simple Analytics** — €/month, privacy-first. Chose GA because Search Console ties into GA property automatically and our traffic doesn't yet justify paid tools.

---

## 7. Security

### Layered model

Each layer catches different threats; remove none.

1. **Cloudflare** — orange cloud on, WAF active, Turnstile for forms. DDoS shield + bot filtering.
2. **Nginx** — reverse proxy for `/api` (not in repo — config held on VPS); terminates Let's Encrypt origin cert.
3. **Application**:
   - `helmet()` — sensible headers (X-Frame-Options, X-Content-Type-Options, HSTS)
   - `Content-Security-Policy-Report-Only` (in `apps/web/next.config.ts:24`) — will flip to enforced after observation
   - `express-rate-limit` 3-tier
   - `express.json({ limit: "10kb" })` body cap
   - `escapeHtml()` for HTML email bodies
   - CORS allow-list (`CORS_ORIGIN` env)
   - `trust proxy = 1` so rate-limit sees real client IP
4. **Transport**: TLS 1.2+ end-to-end (Cloudflare → Nginx → App).

### Headers shipped

See `apps/web/next.config.ts:3-40`:

- HSTS (2 years, includeSubDomains, preload)
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
- Cross-Origin-Opener-Policy: same-origin
- CSP Report-Only with an allow-list for Turnstile + GA4

### What's **not** here (intentional)

- No Web Application Firewall in-app (Cloudflare handles it).
- No CSRF middleware (GET-only analytics, POST endpoints validate origin via CORS + Turnstile).
- No session cookies (JWT only, and only for opt-in flows).

---

## 8. Infrastructure

### Hosting

- **DigitalOcean VPS** (Ubuntu LTS, currently a single $12/mo droplet).
- **pm2** process manager — not systemd. Reasons: simpler `pm2 restart`, first-class log streaming, survives reboot with `pm2 save && pm2 startup`.
- **Nginx** reverse proxy:
  - `uselunexa.com` → `127.0.0.1:3000` (Next standalone)
  - `/api/*` → `127.0.0.1:4000` (Express)
  - Let's Encrypt origin cert (Cloudflare full strict mode)
- **UFW firewall** — only ports 22, 80, 443 inbound. API port 4000 bound to 127.0.0.1 in production so UFW wouldn't matter, but defense in depth.

### CDN / WAF

- **Cloudflare** in front of the VPS (orange cloud DNS).
- DMARC/SPF/DKIM TXT records on the `uselunexa.com` zone.
- Cloudflare Turnstile managed in the same dashboard.
- `Content-Signal` preamble in `/robots.txt` is Cloudflare's "Managed robots.txt" feature. As of 2026-04-23 it ships alongside our app-served robots.txt — user can toggle it off in Security → Bots if a robots.txt tester complains.

### Observability

- **BetterStack** probes `https://uselunexa.com/api/health` every 3 minutes → SMS/email on failure.
- **pm2 logs** — `pm2 logs` on the VPS.
- **Cloudflare Analytics** — built-in traffic overview.
- **GA4 custom events** — business funnel (see Section 6).

### Deploy pipeline (manual, for now)

```bash
# On the VPS
cd ~/apps/lunexa-web
git pull
cd apps/api && npm ci && npm run db:deploy && npm run build
cd ../web && npm ci && npm run build
pm2 reload lunexa-api lunexa-web
```

Future: a single `scripts/deploy.sh` in each repo.

---

## 9. Observability summary

| Concern | Tool | Action on alert |
|---------|------|-----------------|
| Uptime | BetterStack | SMS → check `pm2 status`, `pm2 logs` |
| SMTP delivery | Zoho dashboard + DMARC reports | Investigate any DMARC `fail` in aggregate reports |
| Browser errors | None yet | **Add Sentry when product launches and has >100 MAU** |
| CSP violations | CSP Report-Only (console only) | Observe, then flip to enforced |
| Traffic | Cloudflare + GA4 | Weekly Monday check per SEO_PLAYBOOK.md §9 |

---

## 10. Testing stack

| Layer | Tool | Spec location | Run |
|-------|------|---------------|-----|
| API endpoints | Vitest + supertest | `apps/api/tests/*.test.ts` | `npm test` |
| Helpers (escapeHtml, hashIp, JWT) | Vitest | `apps/api/tests/helpers.test.ts` | `npm test` |
| Web E2E | Playwright (chromium) | `apps/web/tests/e2e/*.spec.ts` | `npx playwright test` |

Baseline at 2026-04-23: 34 API tests, 16 E2E tests. **All green before push** — no exceptions.

---

## 11. Deploy standards

- **No CI/CD** yet. Manual git pull + pm2 reload on the VPS. Acceptable for a solo founder; add GitHub Actions when a second person starts committing.
- **Environment variables**: committed `.env.example` per app (required keys + comments), real values live **only on the VPS** (shell profile or a `.env` not in git). See [`PATTERNS.md`](./PATTERNS.md#9-deploy-and-ops).
- **Prisma migrations**: `db:deploy` only on the server. Never `db:push` in prod.
- **Rollback**: `git checkout <prev-sha> && pm2 reload` — no special tooling.

---

## 12. What NOT to add

Every entry below is a battle we've decided not to pick today. Revisit when the condition changes.

| Not here | Reason | Trigger to reconsider |
|----------|--------|------------------------|
| CMS (Contentful, Sanity, Notion) | Blog is markdown in repo — fine | >10 non-technical editors |
| External auth (Clerk, Auth0, next-auth) | Contact + newsletter don't need accounts | First product with user login |
| Redis | Rate-limit is in-memory on single instance | Multi-instance pm2 or multiple servers |
| Sentry / error monitoring | No traffic to debug yet | >100 DAU or a paying customer |
| Stripe / Paddle | No product to monetize yet | First paying product |
| GitHub Actions CI | Tests run locally; manual deploy is fine solo | Second committer or a release that must be gated |
| Storybook | Component library is small and used in one place | Second product reusing components AND >20 components |
| Feature flags (LaunchDarkly, etc.) | No feature-gated traffic split yet | Multiple concurrent experiments |
| `@lunexa/*` npm package | Premature abstraction | 2+ products sharing identical components |

---

## 13. Upgrade policy

- **Patch / minor version bumps**: opportunistic. Dependabot-style manual sweep monthly.
- **Major version bumps**: only when:
  - A security advisory exists, or
  - A feature we want lives behind the upgrade, or
  - Next.js/React: when Next ships a new major AND it's been out for 1 month (let others hit the bugs first).
- **Prisma**: follow their major releases carefully — migration file format has changed historically.
- **Node LTS**: upgrade within 3 months of a new LTS line becoming "active".

---

## 14. Naming conventions

- **Domains**: `uselunexa.com` for the studio. Product domains: pick fresh names; sub-branding (`app.uselunexa.com`) is OK for tools that are clearly extensions of the studio.
- **VPS pm2 process names**: `lunexa-<app>` (e.g. `lunexa-web`, `lunexa-api`). Keeping the `lunexa-` prefix here makes shared-server processes easy to spot at a glance.
- **Env vars**: SCREAMING_SNAKE_CASE. `NEXT_PUBLIC_` prefix only when the value **must** ship to the browser.
- **DB tables**: snake_case, plural (`subscribers`, not `subscriber`).
- **Files**: kebab-case TypeScript files (`cta-block.tsx`), PascalCase React components inside.
- **Commit messages**: `type(scope): message` — `feat`, `fix`, `refactor`, `docs`, `chore`, `seo`, `test`. No `Co-Authored-By` trailers.

---

## 15. References

- [`PATTERNS.md`](./PATTERNS.md) — code-level recipes for i18n, SEO, security, email, newsletter, testing, deploy
- [`CHECKLIST.md`](./CHECKLIST.md) — new-product day-1 bootstrap script
- [`../../../SEO_PLAYBOOK.md`](../../../SEO_PLAYBOOK.md) — operational SEO playbook
- [`../README.md`](../README.md) — how the web app runs locally
- [`../../../README.md`](../../../README.md) — monorepo orientation
- [`../AGENTS.md`](../AGENTS.md) — Next.js 16 differs from training data — always read shipped docs
