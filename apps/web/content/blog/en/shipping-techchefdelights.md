---
title: "Shipping TechChefDelights — the first product out of the studio"
description: "How we built a 3-language tested-recipe site with Cook Mode, full-text search, and a JSON API ready for a future Flutter app — and what the Lunexa stack looks like under production traffic."
date: 2026-04-25
author: Lunexa
tags: [launch, product, craft]
---

The first public Lunexa product is in pre-launch hardening. It's called **TechChefDelights** — a 3-language (EN/TR/ES) recipe site with full Cook Mode, per-locale full-text search, and a JSON API designed for a future Flutter app. This post explains why this product exists, how it's built, and what we've learned along the way.

## Why a recipe site

The studio's services pages talk about three disciplines: mobile applications, web platforms, and intelligent systems. The fastest way to prove those words is to ship a product that exercises all three at once, with real users, in production.

A recipe site sounds simple. It isn't, if you take it seriously:

- **Three locales** with localized URLs (`/recipes` ↔ `/tarifler` ↔ `/recetas`), per-locale slugs, and Postgres full-text search with locale-specific stemmers.
- **Cook Mode** with timers that survive page navigation, browser tab switches, and resume points stored in localStorage.
- **A content graph** of recipes, ingredients, equipment, diets, categories — each ingredient and piece of equipment is a canonical entity with its own translation table, image fields, and future page surface.
- **A public API at `/api/v1/*`** that's locale-agnostic, lowercase-enum-typed, and shaped for a Flutter mobile client to consume on day one.
- **Production-grade observability**: structured JSON logs with request-id correlation, Sentry env-gated, swappable rate-limit backend, health endpoint with DB ping + uptime + memory + version.

This is the depth a custom software development engagement actually requires. Building it for ourselves means we know every trade-off in the stack before we recommend it to a client.

## What's under the hood

The full breakdown is in `docs/STACK.md` and `docs/PATTERNS.md` of the [techchefdelights repo](https://github.com/fvarli/techchefdelights), but the headlines:

- **Next.js 16** — App Router, Server Components, ISR for recipe pages (`revalidate: 3600`)
- **PostgreSQL 16 + Prisma 7** — 50 models, 7 enums, translation tables for every locale-variant entity, FTS via `tsvector` + GIN
- **next-intl 4** for routing, ICU pluralization, and translation loading
- **CSS Modules + tokens.css** — no Tailwind here; the site needs custom typography control
- **Cloudinary for images** — DB stores only the `public_id`, never a full URL, so a future provider swap is a URL-builder change rather than a schema migration
- **Self-hosted on a Ubuntu VPS** — systemd unit, nginx reverse proxy, BetterStack uptime, manual deploy with rollback runbooks

The product diverges from the studio's default Lunexa stack in three places — and each divergence is justified in writing in `DIVERGENCES.md`. CSS Modules over Tailwind for typographic control. next-intl over our custom `dictionaries.ts` because TechChef needs ICU plurals and per-locale URL segments. systemd over pm2 because we wanted hardening primitives like `NoNewPrivileges` and `ProtectSystem=strict`.

That divergence pattern is now part of how Lunexa products are scoped. The studio publishes a `STACK.md` baseline; products inherit it; deviations get a written reason. This is one of the reasons studio-built products stay coherent across years.

## What's next

TechChefDelights is staging-ready, not yet live. Before public launch:

1. **Image production** — 7 recipes still on placeholders; AI generation + Cloudinary upload + manifest validation
2. **Lighthouse + Rich Results** validation against the staging URL
3. **Cross-browser smoke** on Chrome/Safari/Firefox/Edge/Android Chrome
4. **Production sign-off gate** — 24h staging soak, stakeholder approval, rollback plan documented

We'll post a follow-up when the public site is live with first 100 organic search impressions.

If you have a similar build in mind — a multi-locale product surface, a JSON API destined for a mobile client, real production observability — that's exactly what the studio does. [Get in touch](/contact) if it's a fit.

---

*See it in progress: [techchefdelights.com](https://techchefdelights.com) (post-launch). For the full work showcase: [/work](/work).*
