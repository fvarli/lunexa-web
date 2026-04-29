---
title: "Lanzando TechChefDelights — el primer producto del estudio"
description: "Cómo construimos un sitio de recetas probadas en 3 idiomas con Modo Cocina, búsqueda full-text y una API JSON lista para una futura app Flutter — y cómo se ve el stack Lunexa bajo tráfico de producción."
date: 2026-04-25
author: Lunexa
tags: [launch, product, craft]
---

El primer producto público de Lunexa está en hardening pre-lanzamiento. Se llama **TechChefDelights** — un sitio de recetas en 3 idiomas (EN/TR/ES) con Modo Cocina completo, búsqueda full-text por idioma y una API JSON diseñada para una futura app Flutter. Este post explica por qué existe este producto, cómo está construido y qué hemos aprendido en el camino.

## Por qué un sitio de recetas

Las páginas de servicios del estudio hablan de tres disciplinas: aplicaciones móviles, plataformas web y sistemas inteligentes. La forma más rápida de probar esas palabras es enviar un producto que ejercite las tres a la vez, con usuarios reales, en producción.

Un sitio de recetas suena simple. No lo es, si te lo tomas en serio:

- **Tres idiomas** con URLs localizadas (`/recipes` ↔ `/tarifler` ↔ `/recetas`), slugs por idioma y búsqueda full-text en Postgres con stemmers específicos por idioma.
- **Modo Cocina** con temporizadores que sobreviven a la navegación entre páginas, cambios de pestaña y puntos de reanudación guardados en localStorage.
- **Un grafo de contenido** de recetas, ingredientes, equipamiento, dietas, categorías — cada ingrediente y pieza de equipo es una entidad canónica con su propia tabla de traducción, campos de imagen y futura superficie de página.
- **Una API pública en `/api/v1/*`** que es agnóstica al idioma, con enums en minúsculas, y formada para que un cliente móvil Flutter la consuma desde el día uno.
- **Observabilidad de producción**: logs JSON estructurados con correlación de request-id, Sentry env-gated, backend de rate-limit intercambiable, endpoint de salud con DB ping + uptime + memoria + versión.

Esta es la profundidad que un compromiso de desarrollo de software a medida realmente requiere. Construirlo para nosotros mismos significa que conocemos cada compromiso del stack antes de recomendarlo a un cliente.

## Qué hay bajo el capó

El desglose completo está en `docs/STACK.md` y `docs/PATTERNS.md` del [repo techchefdelights](https://github.com/fvarli/techchefdelights), pero los titulares:

- **Next.js 16** — App Router, Server Components, ISR para páginas de recetas (`revalidate: 3600`)
- **PostgreSQL 16 + Prisma 7** — 50 modelos, 7 enums, tablas de traducción para cada entidad con variante por idioma, FTS vía `tsvector` + GIN
- **next-intl 4** para routing, pluralización ICU y carga de traducciones
- **CSS Modules + tokens.css** — sin Tailwind aquí; el sitio necesita control tipográfico custom
- **Cloudinary para imágenes** — la DB almacena solo el `public_id`, nunca una URL completa, así un futuro cambio de proveedor es un cambio de URL-builder, no una migración de schema
- **Self-hosted en un VPS Ubuntu** — unidad systemd, reverse proxy nginx, uptime BetterStack, deploy manual con runbooks de rollback

El producto diverge del stack Lunexa por defecto en tres lugares — y cada divergencia está justificada por escrito en `DIVERGENCES.md`. CSS Modules sobre Tailwind por control tipográfico. next-intl sobre nuestro `dictionaries.ts` custom porque TechChef necesita plurales ICU y segmentos de URL por idioma. systemd sobre pm2 porque queríamos primitivas de hardening como `NoNewPrivileges` y `ProtectSystem=strict`.

Ese patrón de divergencia ahora es parte de cómo se definen los productos Lunexa. El estudio publica una baseline `STACK.md`; los productos la heredan; las desviaciones obtienen una razón escrita. Esta es una de las razones por las que los productos construidos por el estudio se mantienen coherentes a lo largo de los años.

## Qué sigue

TechChefDelights está listo para staging, aún no en vivo. Antes del lanzamiento público:

1. **Producción de imágenes** — 7 recetas aún en placeholders; generación AI + carga a Cloudinary + validación de manifiesto
2. **Lighthouse + Rich Results** validados contra la URL de staging
3. **Smoke cross-browser** en Chrome/Safari/Firefox/Edge/Android Chrome
4. **Puerta de aprobación de producción** — soak de staging de 24h, aprobación del stakeholder, plan de rollback documentado

Publicaremos un seguimiento cuando el sitio público esté en vivo con las primeras 100 impresiones de búsqueda orgánica.

Si tienes un build similar en mente — una superficie de producto multi-idioma, una API JSON destinada a un cliente móvil, observabilidad real de producción — eso es exactamente lo que hace el estudio. [Ponte en contacto](/es/contact) si encaja.

---

*Velo en progreso: [techchefdelights.com](https://techchefdelights.com) (post-lanzamiento). Para el showcase de trabajo completo: [/es/work](/es/work).*
