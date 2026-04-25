# Lunexa — New Product Day-1 Checklist

> **Status:** canonical as of 2026-04-23. Follow top-to-bottom; an 8-hour day ends with a landing page live, analytics wired, Search Console submitted.
>
> **Companion docs:** [`STACK.md`](./STACK.md) for the stack + why, [`PATTERNS.md`](./PATTERNS.md) for code-level recipes.

This is the operational script. Skip steps only with a written reason. Every step has a time estimate; the total is ~6-7 hours plus waits (DNS propagation, Let's Encrypt cert issuance, DMARC aggregate report arrival).

---

## 0. Prerequisites

Before starting day 1, confirm you have:

- [ ] VPS reachable via SSH with your key
- [ ] Cloudflare account + domain registered somewhere routing DNS to Cloudflare nameservers
- [ ] Zoho Mail account (or decision to use a different email provider)
- [ ] Google account for GA4 + Search Console (`hello@uselunexa.com` per our setup)
- [ ] Backup Google account with recovery contact (critical — see [`STACK.md §14`](./STACK.md#14-naming-conventions))
- [ ] Access to the lunexa-web repo for pattern copy
- [ ] GitHub repo creation permission on the org

---

## 1. Decide brand position (5 min)

### Subdomain vs new domain

| Factor | Subdomain (`app.uselunexa.com`) | New domain (`yourproduct.com`) |
|--------|----------------------------------|-------------------------------|
| SEO juice | Inherits some from `uselunexa.com` | Starts from zero |
| Brand independence | Tightly coupled to Lunexa | Full independence (sellable, rebrandable) |
| Setup cost | ~10 min (DNS + cert) | ~30 min (registration + DNS + cert) |
| Mental model | "A Lunexa tool" | "Its own product, Lunexa-made" |
| Email reputation | Inherits Lunexa's DMARC/SPF | Fresh warm-up needed |

**Default:** subdomain for tools that feel like Lunexa utilities; new domain for products with their own target audience and marketing surface. Don't agonize — you can migrate a subdomain to a domain later with a single wave of 301 redirects.

- [ ] Decided: [ subdomain | new domain ]
- [ ] Wrote it down in a `README.md` placeholder

### Name availability

- [ ] Domain available (if new domain) — check at least `.com` + `.co` + `.app`
- [ ] GitHub repo name available: `<product>` (no `lunexa-` prefix — repos use the product name directly)
- [ ] Twitter/X handle available — `@<product>` or `@<product>_app`
- [ ] LinkedIn company page slug available (if you'll run a separate page)
- [ ] npm package name free (only if you'll publish anything, even a CLI)

---

## 2. Repo bootstrap (15 min)

```bash
mkdir -p ~/Desktop/WebProjects/<product>
cd ~/Desktop/WebProjects/<product>
git init
```

### Seed files to copy from `lunexa-web`

```bash
# From the lunexa-web repo, copy these pattern sources.
# Adapt paths to whether your new repo uses apps/web or a single root Next app.

# Core web config
cp -r ../lunexa-web/apps/web/src/i18n ./src/
cp -r ../lunexa-web/apps/web/src/seo ./src/
cp    ../lunexa-web/apps/web/src/proxy.ts ./src/
cp    ../lunexa-web/apps/web/next.config.ts ./

# Reusable components
cp    ../lunexa-web/apps/web/src/components/analytics.tsx ./src/components/
cp    ../lunexa-web/apps/web/src/components/cookie-consent.tsx ./src/components/
cp    ../lunexa-web/apps/web/src/components/breadcrumb-jsonld.tsx ./src/components/
cp    ../lunexa-web/apps/web/src/components/cta-block.tsx ./src/components/

# App routing scaffolding
cp    ../lunexa-web/apps/web/src/app/sitemap.ts ./src/app/
cp    ../lunexa-web/apps/web/src/app/robots.ts ./src/app/
cp    ../lunexa-web/apps/web/src/app/opengraph-image.tsx ./src/app/
cp    ../lunexa-web/apps/web/src/app/manifest.ts ./src/app/
cp    ../lunexa-web/apps/web/src/app/icon.svg ./src/app/
cp    ../lunexa-web/apps/web/src/app/apple-icon.svg ./src/app/

# Conventions
cp    ../lunexa-web/.gitignore ./
cp    ../lunexa-web/apps/web/.env.example ./
cp    ../lunexa-web/apps/web/AGENTS.md ./
cp    ../lunexa-web/apps/web/CLAUDE.md ./
```

### Scaffold Next.js 16

```bash
# Or manually edit package.json; the interactive scaffolder pulls defaults you
# may not want (eslint-config-next is fine, but skip Tailwind v3 scaffold —
# copy the v4 setup from lunexa-web).
npx create-next-app@latest . --ts --app --src-dir --no-tailwind --no-eslint
# Then add tailwind v4 manually:
npm i -D tailwindcss @tailwindcss/postcss
# copy src/app/globals.css + postcss.config.js from lunexa-web
```

### Adaptations (not copy-paste)

- [ ] `src/app/[locale]/layout.tsx` — replace `metadataBase`, brand name in Organization JSON-LD, site nav labels
- [ ] `src/seo/meta.ts` — rewrite every `*_META` constant with this product's title/description/H1
- [ ] `src/seo/content.ts` — rewrite About/Services (or delete what doesn't apply)
- [ ] `src/i18n/dictionaries.ts` — strip lunexa-web copy; start fresh
- [ ] `next.config.ts` — keep security headers, adjust CSP allow-list (add product-specific CDNs, Stripe scripts, etc.)

### Commit the bootstrap

```bash
git add -A
git commit -m "chore: bootstrap — Next 16 + Tailwind 4 + Lunexa SEO baseline"
```

### GitHub

```bash
gh repo create fvarli/<product> --private --source=. --push
```

---

## 3. API bootstrap (20 min, only if backend is needed)

Skip this section if the product is purely client-side (e.g., a static tool, a marketing site without forms beyond a mailto link).

```bash
mkdir apps/api && cd apps/api
# Mirror lunexa-web/apps/api structure
cp ../../lunexa-web/apps/api/package.json ./
cp ../../lunexa-web/apps/api/tsconfig.json ./
cp ../../lunexa-web/apps/api/vitest.config.ts ./
cp ../../lunexa-web/apps/api/.env.example ./
cp -r ../../lunexa-web/apps/api/prisma ./
cp -r ../../lunexa-web/apps/api/src ./

npm install
```

### Adaptations

- [ ] `prisma/schema.prisma` — keep `Subscriber` if you want a newsletter; add product-specific models.
- [ ] `src/app.ts` — strip unused endpoints. Keep `escapeHtml`, `verifyTurnstile`, rate-limit pattern, `helmet`, CORS.
- [ ] `src/emails.ts` — rewrite templates for product voice.
- [ ] Vitest specs in `tests/` — rewrite to match new endpoints.

### First migration

```bash
# after editing schema.prisma
npm run db:migrate -- --name init
```

---

## 4. Env and secrets (10 min)

### Generate secrets

```bash
# 32-byte hex for each secret
openssl rand -hex 32   # NEWSLETTER_SECRET or equivalent JWT secrets
```

### `apps/api/.env.example` (commit)

Paste required keys with empty values + comments:

```env
# Runtime
NODE_ENV=production
PORT=4000

# Database
DATABASE_URL=postgresql://user:pass@host:5432/db?schema=public

# CORS
CORS_ORIGIN=https://yourproduct.com,https://www.yourproduct.com

# Tokens (generate with: openssl rand -hex 32)
JWT_SECRET=
NEWSLETTER_SECRET=

# Redirect bases
SITE_BASE_URL=https://yourproduct.com
NEWSLETTER_CONFIRM_URL=https://yourproduct.com/newsletter/confirmed
NEWSLETTER_UNSUBSCRIBE_URL=https://yourproduct.com/newsletter/unsubscribed

# SMTP (Zoho)
SMTP_HOST=smtppro.zoho.eu
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=
SMTP_PASS=
CONTACT_RECEIVER=hello@yourproduct.com

# Turnstile
TURNSTILE_SECRET_KEY=
```

### `apps/web/.env.example` (commit)

```env
# Empty in prod → same-origin /api via nginx
# Local dev: http://localhost:4000
NEXT_PUBLIC_API_BASE_URL=

NEXT_PUBLIC_TURNSTILE_SITE_KEY=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GSC_VERIFICATION=
```

### Production env on VPS

- [ ] SSH to VPS
- [ ] Create `~/apps/<product>/apps/api/.env` with real values
- [ ] `chmod 600` the file
- [ ] Never commit it

---

## 5. Initial content (60 min)

At minimum, the launch surface:

- [ ] **Home page** — hero + value prop + CTA (signup / demo / contact)
- [ ] **Pricing** — even "From $X / month" is better than nothing (SEO + trust)
- [ ] **About** — what is this product, who is Lunexa (cross-link to uselunexa.com)
- [ ] **Privacy** — adapt from lunexa-web; update data collection section to product specifics
- [ ] **Terms of use** — adapt from lunexa-web; update scope to product
- [ ] **Contact / support** — form or mailto
- [ ] **404** — keep lunexa-web's `not-found-content.tsx` as template
- [ ] **OG image** — check `src/app/opengraph-image.tsx` generates a product-branded card

All in 3 locales if the product is multi-locale; English-only if not. Delete TR/ES folders from `src/i18n/` and `src/seo/content.ts` if single-locale.

---

## 6. DNS and CDN (20 min + DNS propagation wait)

### Cloudflare zone

- [ ] (If new domain) Change nameservers at registrar to Cloudflare's
- [ ] (If subdomain) Add CNAME in the parent zone pointing to VPS (or `@` via A record)
- [ ] Orange cloud ON
- [ ] SSL/TLS mode: **Full (strict)** — requires Let's Encrypt origin cert
- [ ] HTTPS Rewrites ON
- [ ] Always Use HTTPS ON

### Cloudflare Turnstile

- [ ] Dashboard → Turnstile → Add site
- [ ] Pick Managed challenge
- [ ] Copy site key + secret key → env vars

### Email DNS (if product sends mail)

- [ ] SPF TXT: `v=spf1 include:zoho.eu ~all`
- [ ] DKIM CNAME: `zmail._domainkey` → Zoho-provided target
- [ ] DMARC TXT: `v=DMARC1; p=quarantine; sp=quarantine; np=quarantine; adkim=r; aspf=r; pct=100; rua=mailto:abonelikler@ferzendervarli.com`

Warm up email for 7 days before sending campaigns — DMARC reports should pass consistently first.

### DNS propagation

- [ ] `dig uselunexa.com` (or `dig yourproduct.com`) from your machine shows Cloudflare IP
- [ ] `curl -sI https://yourproduct.com` → 200 or 301 (depending on state)

---

## 7. VPS deploy (30 min + Let's Encrypt wait)

### Initial setup on VPS (first time only)

```bash
# Install Node via nvm (if not already)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.nvm/nvm.sh
nvm install --lts

# Install pm2 globally
npm install -g pm2

# Install nginx + certbot
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
```

### Clone + first build

```bash
cd ~/apps
git clone git@github.com:fvarli/<product>.git
cd <product>

# API
cd apps/api
npm ci
npm run db:deploy
npm run build

# Web
cd ../web
npm ci
npm run build
```

### pm2 processes

```bash
# from ~/apps/<product>
# pm2 process names keep the lunexa- prefix on purpose (per STACK.md §14) — easier to spot on a shared server
pm2 start apps/api/dist/server.js --name lunexa-<product>-api
pm2 start npm --name lunexa-<product>-web -- --prefix apps/web start
pm2 save
pm2 startup systemd  # one-time, follow the printed instruction
```

### Nginx vhost

Create `/etc/nginx/sites-available/<product>.conf` using the template in [`PATTERNS.md §9`](./PATTERNS.md#9-deploy-and-ops). Adjust ports if multiple products share the VPS (Product A: web 3000 + api 4000, Product B: web 3001 + api 4001, etc.).

```bash
sudo ln -s /etc/nginx/sites-available/<product>.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Origin cert via Let's Encrypt

```bash
sudo certbot --nginx -d yourproduct.com -d www.yourproduct.com
```

Certbot auto-configures nginx for TLS and sets up renewal.

### Smoke test

- [ ] `curl -sI https://yourproduct.com` returns 200
- [ ] `curl https://yourproduct.com/api/health` returns `{"ok":true}`
- [ ] Contact form: submit + check inbox
- [ ] View-source on home: `<title>`, meta description, canonical, hreflang, JSON-LD all present

---

## 8. Analytics and Search (20 min)

### GA4

- [ ] Analytics → Admin → Create property
- [ ] Install stream for `https://yourproduct.com`
- [ ] Copy Measurement ID → `NEXT_PUBLIC_GA_ID` env (`G-XXXXXXXXXX`)
- [ ] Trigger a pageview (visit the site) → confirm it lands in Realtime report within 60 sec
- [ ] Optionally: link GA4 property to GSC

### Google Search Console

- [ ] Add property — choose "URL prefix" with `https://yourproduct.com`
- [ ] Verify via HTML meta tag method — put the content value in `NEXT_PUBLIC_GSC_VERIFICATION` env, redeploy, click Verify
- [ ] Submit sitemap: `https://yourproduct.com/sitemap.xml`
- [ ] Use URL Inspection to request indexing on: `/`, `/pricing`, `/about`, `/contact`

### Bing Webmaster Tools

- [ ] https://www.bing.com/webmasters → Add site → **Import from Google Search Console**
- [ ] One-click import; sitemap auto-submitted

### Robots.txt test

- [ ] GSC → robots.txt tester → 0 errors, 0 warnings
- [ ] Bing → robots.txt tester → 0 errors

---

## 9. Monitoring (10 min)

### BetterStack uptime

- [ ] New monitor → URL `https://yourproduct.com/api/health`
- [ ] Check interval: 3 min
- [ ] Alert policy: email + phone push
- [ ] Status page (optional): public at `status.yourproduct.com` for trust

### DMARC report intake

- [ ] Create alias `abonelikler@...` (or reuse existing) that filters DMARC XML reports into a folder
- [ ] First report arrives ~24-48h after first mail sent; confirm `disposition=none` and `dkim/spf=pass`

### pm2 logs

- [ ] Install pm2-logrotate: `pm2 install pm2-logrotate`
- [ ] `pm2 set pm2-logrotate:max_size 10M`
- [ ] `pm2 set pm2-logrotate:retain 7`

---

## 10. First outreach (30 min)

- [ ] Twitter/X handle claim — `@<product>`
- [ ] LinkedIn Company Page — use same OG image as logo, link to `https://yourproduct.com`
- [ ] Product Hunt → "Coming Soon" page (if launching there) — schedule launch ≥14 days out, use those 2 weeks to gather Upvoters + Followers
- [ ] Add product to `uselunexa.com/work` or `/products` page — internal link juice
- [ ] Single blog post on `uselunexa.com` introducing the product (1000-1500 words, targets one of the studio's primary keywords if possible)

---

## 11. First-week goals

- [ ] 5 beta users from personal network (not cold outreach — warm only)
- [ ] Collect 2-3 concrete feedback points (not "looks good" — specific friction)
- [ ] Iterate on the biggest friction before any paid traffic
- [ ] DMARC reports clean for 7 consecutive days
- [ ] Core Web Vitals green on PageSpeed Insights (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- [ ] No unresolved BetterStack incidents

---

## 12. Cross-link back to lunexa-web

- [ ] `uselunexa.com/work` (or `/products`) page lists this product with a "Launch →" CTA
- [ ] `uselunexa.com/blog/<product>-launched.md` post announcing it
- [ ] If the product has its own blog: cross-link back to `uselunexa.com` in footer

This creates a two-way link graph between the studio and its products — both benefit.

---

## 13. When to revisit

- **At 100 DAU:** add Sentry (error monitoring)
- **At first paying customer:** set up Stripe/Paddle, add invoicing flow
- **At second committer:** set up GitHub Actions CI + branch protection
- **At first enterprise lead asking "do you have a SOC 2 report":** stop and consult with counsel + a fractional CISO
- **When rate limit is hit by legit users:** move to Redis-backed rate-limit (express-rate-limit `store` option)

---

## 14. Anti-patterns — don't do these on day 1

- **Don't set up a staging environment** — you'll maintain two environments, never look at staging, and it rots. Deploy to prod behind a feature flag if you need gating; otherwise, test locally.
- **Don't add a CI/CD pipeline** until you're committing in a shared context. Solo, it's overhead.
- **Don't add Sentry / Datadog / LogRocket** before there's traffic to debug. Paying to observe nothing is common and wasteful.
- **Don't fork a "SaaS starter"** — 80% of what's in a starter you won't use, and the 20% you want is faster to copy from lunexa-web.
- **Don't launch on Product Hunt on day 1** — you'll burn the best shot with no upvote base. Schedule it 2 weeks out and warm up.
- **Don't publish pricing with no conviction.** "Starting from $29" forever becomes a brand association. Pick a price you can defend for 6 months.

---

## 15. Template CLAUDE.md for the new repo

Paste this into the new repo's `CLAUDE.md` to orient fresh Claude sessions:

```md
# <Product Name>

Standalone Lunexa product. Stack, patterns, and conventions follow the Lunexa ecosystem defaults.

## Canonical references

Before changing anything architectural, read:

- [Lunexa STACK.md](https://github.com/fvarli/lunexa-web/blob/main/apps/web/docs/STACK.md) — tech stack + why
- [Lunexa PATTERNS.md](https://github.com/fvarli/lunexa-web/blob/main/apps/web/docs/PATTERNS.md) — code-level recipes
- [Lunexa CHECKLIST.md](https://github.com/fvarli/lunexa-web/blob/main/apps/web/docs/CHECKLIST.md) — product bootstrap (what this repo follows)
- [Lunexa SEO_PLAYBOOK.md](https://github.com/fvarli/lunexa-web/blob/main/SEO_PLAYBOOK.md) — SEO ops

This repo diverges from those docs only where marked in a `DIVERGENCES.md` file at the root.

## House rules

- Commits: conventional style, no Co-Authored-By trailers.
- English-first user-facing copy.
- `.env.example` committed; real values on VPS only.
- No planning `.md` files unless explicitly asked.

## Stack (quick reference)

- Web: Next.js 16 + React 19 + Tailwind 4
- API: Express 5 + Prisma 7 + PostgreSQL 16
- Email: Zoho SMTP via nodemailer
- Anti-spam: Cloudflare Turnstile
- Deploy: VPS (pm2 + nginx) behind Cloudflare
- Monitoring: BetterStack
```

---

## Cross-references

- [`STACK.md`](./STACK.md) — the stack this checklist assumes
- [`PATTERNS.md`](./PATTERNS.md) — recipes the bootstrap uses
- [`../../../SEO_PLAYBOOK.md`](../../../SEO_PLAYBOOK.md) — post-launch SEO ops
