# Lunexa Web

**Status:** Live at [uselunexa.com](https://uselunexa.com)

Official web presence for Lunexa — the marketing site and its contact-form API. Lunexa builds simple, fast, and intelligent digital products. The name comes from *Luna* (moon — clarity in darkness) and *exa* (exponential scale).

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4 |
| Backend | Node.js 22, Express 5, TypeScript, Zod, Helmet, express-rate-limit, Nodemailer |
| Email | Zoho SMTP (transactional) |
| Bot protection | Cloudflare Turnstile + honeypot + per-IP rate limits |
| Edge | Cloudflare (DNS, TLS, WAF, caching, bot fight, cache rules) |
| Server | Ubuntu 24.04 VPS (DigitalOcean), Nginx (reverse proxy, Let's Encrypt TLS), pm2 (process manager) |
| Analytics | Google Analytics 4 (always-on, disclosed) + Google Search Console |
| Uptime | BetterStack monitoring `/api/health` with 3-minute interval + email alerting |
| CI/CD | GitHub Actions (build + SSH deploy + weekly `npm audit` + Dependabot) |

## Repo layout

```
lunexa-web/
├── apps/
│   ├── web/                        Next.js 16 marketing site
│   │   ├── next.config.ts          Security headers, Cache-Control, poweredByHeader: false
│   │   ├── .browserslistrc         (also package.json "browserslist") modern targets
│   │   ├── src/app/
│   │   │   ├── page.tsx            Homepage (server wrapper → client content)
│   │   │   ├── contact/            Contact page
│   │   │   ├── privacy/            Privacy policy (3 locales)
│   │   │   ├── terms/              Terms of use (3 locales)
│   │   │   ├── layout.tsx          Root layout — cookie-based SSR locale, JSON-LD
│   │   │   ├── not-found.tsx       Custom 404 with i18n
│   │   │   ├── error.tsx           Global client error boundary
│   │   │   ├── manifest.ts         Web App Manifest (PWA-light)
│   │   │   ├── icon.svg            Favicon (crescent moon)
│   │   │   ├── apple-icon.svg      iOS home-screen icon
│   │   │   ├── opengraph-image.tsx Dynamic 1200×630 OG image
│   │   │   ├── robots.ts           Dynamic robots.txt
│   │   │   └── sitemap.ts          Dynamic sitemap.xml
│   │   ├── src/components/         analytics, cookie-consent, contact-form,
│   │   │                           site-header, site-footer, language-switcher,
│   │   │                           breadcrumb-jsonld, home-content,
│   │   │                           *-page-content (client shells)
│   │   └── src/i18n/               config.ts, dictionaries.ts (en/tr/es), provider.tsx
│   └── api/                        Express contact-form API
│       └── src/server.ts           Single file: CORS, rate-limit, Turnstile, SMTP
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                  Typecheck + lint + build (api + web, parallel)
│   │   ├── deploy.yml              SSH deploy on CI success (pulls, writes env, builds, pm2 reload)
│   │   └── security-audit.yml      Weekly `npm audit` on both apps
│   └── dependabot.yml              Weekly grouped npm + github-actions updates
├── ecosystem.config.js             pm2 definitions (lunexa-api:4000, lunexa-web:3001)
└── README.md
```

## Features

- **Internationalization** — English / Turkish / Spanish. Flash-free: locale cookie read server-side in `layout.tsx` so `<html lang>` and initial render match the user's saved preference. Custom lightweight provider (no external i18n library).
- **Contact form** — Zod validation, honeypot, Turnstile, 5 requests / 15 min rate limit, HTML-escaped email, SMTP via Zoho.
- **SEO** — per-page metadata, dynamic OG image, `robots.txt`, `sitemap.xml`, JSON-LD graph covering `Organization` + `WebSite` + `SiteNavigationElement`, per-page `BreadcrumbList` on contact/privacy/terms, Google Search Console verification via `metadata.verification.google`.
- **Analytics** — Google Analytics 4, **always on**, transparently disclosed in the cookie banner and privacy policy. The banner's "Analytics" category is shown as locked "Always on" — it cannot be disabled; a link to Google's opt-out browser add-on is provided on the privacy page for users who want to disable it themselves.
- **Cookie notice** — three categories (Necessary, Analytics, Marketing). Necessary and Analytics both locked with an "Always on" badge. Marketing is the only toggleable category. Choice persisted in `localStorage`; bypassing the banner still triggers GA4 on subsequent visits.
- **Security headers** (served from `apps/web/next.config.ts` on every web response):
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()`
  - `Cross-Origin-Opener-Policy: same-origin`
  - `Content-Security-Policy-Report-Only` with `default-src 'self'`, allowlist for Turnstile + GA4. **Currently Report-Only** — observe reports in DevTools Console, flip to enforcing `Content-Security-Policy` once clean.
- **API hardening** — Helmet, strict CORS allowlist (with dev localhost fallback), request body 10 KB cap, HTML escaping for email content.
- **Production binding** — API binds to `127.0.0.1:4000` in production, not reachable from the public internet. Nginx alone proxies `/api/*` to it.
- **Modern build target** — `browserslist` in `package.json` (Chrome/Firefox/Edge ≥108, Safari ≥16) drops legacy polyfills from the bundle.
- **PWA-light** — `manifest.ts` exposes install-to-home-screen on mobile (no service worker / offline).
- **Error UX** — custom 404 (`not-found.tsx`) and global error boundary (`error.tsx`), both i18n-aware with back-home + retry affordances.

## Performance & CDN

Origin sits behind Cloudflare (orange cloud). Key edge settings configured via the Cloudflare dashboard:

| Setting | Value | Purpose |
|---------|-------|---------|
| Auto-Minify | HTML, CSS, JS on | Smaller payloads |
| Brotli | On | Better compression than gzip |
| Image Polish | Lossless | Compress images without quality loss |
| Caching Level | Standard | CF decides based on content type |
| Browser Cache TTL | 4 hours | Client-side fallback |
| Always Online | On | Serves archive if origin down |
| HTTP/3 (QUIC) | On | Faster connection setup |
| 0-RTT Resumption | On | Skip handshake on repeat visits |
| Rocket Loader | **Off** | Breaks modern React hydration |
| Email Address Obfuscation | **Off** | Redundant with Turnstile; adds render-blocking JS |

**Cache Rules** (unlimited on free tier, configured in Caching → Cache Rules):

| Rule | Match | Action |
|------|-------|--------|
| Static chunks | `/_next/static/*` | Edge TTL 1 month, Browser TTL 1 year |
| Icons + OG | `/icon.svg`, `/apple-icon.svg`, `/opengraph-image` | Edge TTL 1 week, Browser TTL 1 day |
| API bypass | `/api/*` | Bypass cache (never stale contact POSTs) |

Next.js cooperates via:
- `poweredByHeader: false` in `next.config.ts`
- Explicit `Cache-Control` headers for icon/OG routes
- Default `public, max-age=31536000, immutable` on `/_next/static/*`
- `browserslist` in `package.json` keeps the polyfill chunk minimal

**Lighthouse targets:** Desktop 100 / Mobile 99+ on Performance, 100 / 100 on Accessibility & Best Practices, 100 on SEO once Cloudflare's AI Crawl Control (which injects a `Content-Signal:` directive into `robots.txt`) is disabled.

After each deploy the Cloudflare cache should be purged (**Caching → Purge Everything**) so new JS chunks are fetched rather than served from stale edge.

## Local development

### Prerequisites

- Node.js 22+
- npm 10+

### API

```bash
cd apps/api
cp .env.example .env     # fill SMTP creds + TURNSTILE_SECRET_KEY (optional in dev)
npm install
npm run dev              # tsx watch, listens on :4000
```

### Web

```bash
cd apps/web
cp .env.example .env.local  # defaults point to localhost:4000
npm install
npm run dev                  # listens on :3000
```

Visit [http://localhost:3000](http://localhost:3000). The contact form submits to the local API on `:4000`. In dev, Turnstile is skipped if `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is empty, and GA4 is disabled if `NEXT_PUBLIC_GA_ID` is empty.

### Scripts

Web (`apps/web`):

| Script | What it does |
|--------|--------------|
| `npm run dev` | Dev server with Turbopack |
| `npm run lint` | ESLint |
| `npm run build` | Production build |
| `npm run start` | Serve built app |

API (`apps/api`):

| Script | What it does |
|--------|--------------|
| `npm run dev` | `tsx watch` on `src/server.ts` |
| `npm run build` | `tsc` → `dist/` |
| `npm start` | Run compiled `dist/server.js` |

## Environment variables

### API (`apps/api/.env`)

| Key | Required | Notes |
|-----|----------|-------|
| `NODE_ENV` | yes | `development` locally, `production` on server |
| `PORT` | yes | `4000` |
| `CORS_ORIGIN` | yes | Comma-separated origin list. In dev, localhost patterns are also accepted automatically |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` / `SMTP_USER` / `SMTP_PASS` | yes (prod) | Zoho SMTP credentials |
| `CONTACT_RECEIVER` | yes (prod) | Inbox that receives submissions |
| `ENABLE_AUTOREPLY` | no | `true` sends a confirmation email to the sender |
| `TURNSTILE_SECRET_KEY` | no | Omit in dev to skip captcha verification |

### Web (`apps/web/.env.local` / `.env.production`)

| Key | Dev | Prod |
|-----|-----|------|
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:4000` | empty (same-origin via nginx) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | empty (widget hidden) | Cloudflare Turnstile site key |
| `NEXT_PUBLIC_GA_ID` | empty (analytics off) | `G-XXXXXXXXXX` from GA4 |
| `NEXT_PUBLIC_GSC_VERIFICATION` | empty | Search Console HTML-tag `content` value |

> `.env` and `.env.local` are gitignored. `.env.production` is also gitignored — production values live on the VPS and are written by the deploy workflow from GitHub Secrets/Variables.

## Deployment

### Overview

GitHub Actions pulls the latest `main`, writes `.env` files on the VPS from repo Secrets/Variables, builds both apps, and reloads pm2. Nginx terminates TLS (Let's Encrypt), Cloudflare sits in front for caching, WAF, and bot protection.

```
Browser → Cloudflare → Nginx (:443) ├─ /api/  → Express (127.0.0.1:4000)
                                    └─ /      → Next.js (127.0.0.1:3001)
```

### GitHub secrets

| Secret | Purpose |
|--------|---------|
| `PROD_HOST` / `PROD_USER` / `PROD_SSH_KEY` / `PROD_SSH_PORT` | SSH deploy target |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | Zoho SMTP credentials |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile server-side secret |

### GitHub variables

| Variable | Value |
|----------|-------|
| `DEPLOY_PATH` | `/var/www/lunexa-web` |
| `CORS_ORIGIN` | `https://uselunexa.com,https://www.uselunexa.com` |
| `CONTACT_RECEIVER` | `hello@uselunexa.com` |
| `SMTP_SECURE` | `true` |
| `ENABLE_AUTOREPLY` | `false` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile client-side key |
| `NEXT_PUBLIC_GA_ID` | GA4 Measurement ID (`G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Search Console `content` value |

### First-time server setup

1. Clone the repo to `/var/www/lunexa-web` as root (SSH deploy key required for private repo).
2. Populate `apps/api/.env` with full credentials.
3. `cd apps/api && npm ci && npm run build`
4. `cd apps/web && npm ci && npm run build`
5. `pm2 start ecosystem.config.js && pm2 save`
6. Configure Nginx vhost to reverse-proxy `/api/` → `127.0.0.1:4000` and `/` → `127.0.0.1:3001`, reload nginx.
7. Point DNS to the VPS with Cloudflare proxy enabled (orange cloud).
8. In Cloudflare dashboard: apply the cache rules and optimization toggles listed in **Performance & CDN** above.

After that, every push to `main` triggers CI, then deploy runs automatically. Remember to purge Cloudflare cache after each deploy.

## Docker (local parity)

Both apps are containerizable. Production still runs natively via pm2 behind nginx — the Docker path is for local parity, running against a different kernel, or rehoming to a new VPS quickly.

```bash
# at repo root
docker compose build
docker compose up

# visit http://localhost:3001  (web)
# api is proxied by Next.js on the same origin via NEXT_PUBLIC_API_BASE_URL
```

- `apps/api/Dockerfile` — multi-stage `node:22-alpine`, non-root `lunexa` user, `curl`-based `HEALTHCHECK` on `/api/health`.
- `apps/web/Dockerfile` — multi-stage with `output: "standalone"` in `next.config.ts` (~120 MB runner vs. ~1 GB without).
- `docker-compose.yml` — ports bind to `127.0.0.1` only (not exposed to LAN), web `depends_on` api's health status.

Env vars can be set inline or via a `.env` file at the repo root (compose auto-loads it):

```bash
# .env (gitignored)
SMTP_HOST=smtppro.zoho.eu
SMTP_USER=hello@uselunexa.com
SMTP_PASS=...
TURNSTILE_SECRET_KEY=...
NEWSLETTER_SECRET=$(openssl rand -hex 32)
```

**Not for production as-is.** Prod still uses pm2 + nginx for better SMTP/port isolation and the existing CI/CD flow.

## CI / security

- **CI** — on every push/PR: typecheck + lint + build for both apps in parallel.
- **Deploy** — runs only after CI success on `main` (or manual `workflow_dispatch`). Concurrency group `lunexa-prod-deploy` cancels in-flight deploys. Internal smoke check (`curl 127.0.0.1:4000/api/health`) runs after pm2 reload, bypassing Cloudflare.
- **Security audit** — weekly `npm audit --audit-level=moderate` on both apps. Runtime dependencies block the job if a moderate-or-higher advisory appears.
- **Dependabot** — weekly grouped minor/patch PRs for both apps and GitHub Actions. Major updates open separately so they can be reviewed.
- **Uptime** — BetterStack hits `https://uselunexa.com/api/health` every 3 minutes; alerts on non-200 or JSON body drift.

## Routes

| Path | Description |
|------|-------------|
| `/` | Homepage (hero, about, work, principles, contact form) |
| `/contact` | Standalone contact page with additional info |
| `/privacy` | Privacy Policy (en/tr/es) |
| `/terms` | Terms of Use (en/tr/es) |
| `/robots.txt` | Generated from `src/app/robots.ts` |
| `/sitemap.xml` | Generated from `src/app/sitemap.ts` |
| `/manifest.webmanifest` | Web App Manifest generated from `src/app/manifest.ts` |
| `/opengraph-image` | Dynamic 1200×630 OG image |
| `/icon.svg`, `/apple-icon.svg` | Favicons |
| `/api/health` | API health check → `{ ok: true }` |
| `/api/contact` | Contact form submission endpoint |

## License

Proprietary — all rights reserved. See `apps/web/src/app/terms/page.tsx`.
