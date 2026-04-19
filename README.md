# Lunexa Web

Official web presence for Lunexa — the marketing site at [uselunexa.com](https://uselunexa.com) and its contact-form API.

Lunexa builds simple, fast, and intelligent digital products. The name comes from *Luna* (moon — clarity in darkness) and *exa* (exponential scale).

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4 |
| Backend | Node.js 22, Express 5, TypeScript, Zod, Helmet, express-rate-limit, Nodemailer |
| Email | Zoho SMTP (transactional) |
| Bot protection | Cloudflare Turnstile + honeypot + per-IP rate limits |
| Edge | Cloudflare (DNS, TLS, WAF, caching) |
| Server | Ubuntu 24.04 VPS, Nginx (reverse proxy), pm2 (process manager) |
| CI/CD | GitHub Actions (build + SSH deploy + weekly `npm audit`) |

## Repo layout

```
lunexa-web/
├── apps/
│   ├── web/                    Next.js 16 marketing site
│   │   ├── src/app/            App Router pages, metadata files
│   │   │   ├── page.tsx        Homepage (server wrapper)
│   │   │   ├── contact/        Contact page
│   │   │   ├── privacy/        Privacy policy
│   │   │   ├── terms/          Terms of use
│   │   │   ├── icon.svg        Favicon (crescent moon)
│   │   │   ├── opengraph-image.tsx  Dynamic OG image
│   │   │   ├── robots.ts       Dynamic robots.txt
│   │   │   └── sitemap.ts      Dynamic sitemap.xml
│   │   ├── src/components/     Client components (header, footer, forms, etc.)
│   │   └── src/i18n/           Locale config, dictionaries (en/tr/es), provider
│   └── api/                    Express contact-form API
│       └── src/server.ts       Single-file server: CORS, rate-limit, validate, verify, mail
├── .github/workflows/
│   ├── ci.yml                  Typecheck, lint, build (api + web, parallel)
│   ├── deploy.yml              SSH deploy on CI success (pulls, writes env, builds, pm2 reload)
│   └── security-audit.yml      Weekly `npm audit` on both apps
└── ecosystem.config.js         pm2 process definitions (lunexa-api:4000, lunexa-web:3001)
```

## Features

- **Internationalization** — English / Turkish / Spanish via lightweight custom Context provider (no external i18n library).
- **Contact form** — Zod validation, honeypot, Turnstile, 5 requests / 15 min rate limit, HTML-escaped email, SMTP via Zoho.
- **SEO** — per-page metadata, dynamic OG image, `robots.txt`, `sitemap.xml`, JSON-LD organization schema.
- **Cookie consent** — KVKK/GDPR-compliant banner with accept/reject/manage-preferences, localStorage-persisted, dispatches `cookie-consent:updated` event for downstream analytics wiring.
- **Security** — Helmet, strict CORS allowlist (dev fallback to localhost pattern), request body 10 KB cap, nginx security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy).
- **Production binding** — API binds to `127.0.0.1:4000` in production, not reachable from the public internet; Nginx alone proxies `/api/*` to it.

## Local development

### Prerequisites

- Node.js 22+
- npm 10+

### API

```bash
cd apps/api
cp .env.example .env     # then fill SMTP creds + TURNSTILE_SECRET_KEY (optional in dev)
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

Visit [http://localhost:3000](http://localhost:3000). The contact form submits to the local API on `:4000`. In dev, Turnstile is skipped if `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is empty.

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

> `.env` and `.env.local` are gitignored. `.env.production` is also gitignored — production values live on the VPS and are written by the deploy workflow from GitHub Secrets/Variables.

## Deployment

### Overview

GitHub Actions pulls the latest `main`, writes `.env` files on the VPS from repo Secrets/Variables, builds both apps, and reloads pm2. Nginx terminates TLS (Let's Encrypt), Cloudflare sits in front for caching and WAF.

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

### First-time server setup

1. Clone the repo to `/var/www/lunexa-web` as root (SSH deploy key required for private repo).
2. Populate `apps/api/.env` with full credentials.
3. `cd apps/api && npm ci && npm run build`
4. `cd apps/web && npm ci && npm run build`
5. `pm2 start ecosystem.config.js && pm2 save`
6. Configure Nginx vhost to reverse-proxy `/api/` → `127.0.0.1:4000` and `/` → `127.0.0.1:3001`, reload nginx.
7. Point DNS to the VPS with Cloudflare proxy enabled (orange cloud).

After that, every push to `main` triggers CI, then deploy runs automatically.

## CI / security

- **CI** — on every push/PR: typecheck + lint + build for both apps in parallel.
- **Deploy** — runs only after CI success on `main` (or manual `workflow_dispatch`). Concurrency group `lunexa-prod-deploy` cancels in-flight deploys.
- **Security audit** — weekly `npm audit --audit-level=moderate` on both apps; runtime dependencies block the job if a moderate-or-higher advisory appears.

## Routes

| Path | Description |
|------|-------------|
| `/` | Homepage (hero, about, work, principles, contact form) |
| `/contact` | Standalone contact page with additional info |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Use |
| `/robots.txt` | Generated from `src/app/robots.ts` |
| `/sitemap.xml` | Generated from `src/app/sitemap.ts` |
| `/opengraph-image` | Dynamic 1200×630 OG image |
| `/icon.svg` | Favicon |
| `/api/health` | API health check → `{ ok: true }` |
| `/api/contact` | Contact form submission endpoint |

## License

Proprietary — all rights reserved. See `apps/web/src/app/terms/page.tsx`.
