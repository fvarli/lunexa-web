import { test, expect } from "@playwright/test";

const SITE = "https://uselunexa.com";

const PAGES = [
  {
    path: "/work",
    titles: {
      en: "Our Work — Lunexa Products",
      tr: "İşlerimiz — Lunexa Ürünleri",
      es: "Nuestro Trabajo — Productos Lunexa",
    },
    descriptions: {
      en: "Products from the Lunexa studio: RPS Duel, Chess Rescue and Quietly on Google Play, plus TechChefDelights, a multilingual recipe web platform.",
      tr: "Lunexa stüdyosunun ürünleri: Google Play'de yayında olan RPS Duel, Chess Rescue ve Quietly ile çok dilli tarif web platformu TechChefDelights.",
      es: "Productos del estudio Lunexa: RPS Duel, Chess Rescue y Quietly en Google Play, además de TechChefDelights, una plataforma web de recetas multilingüe.",
    },
    obsolete: /what comes next|ve devamı|lo que viene|shipped to real users/i,
  },
  {
    path: "/updates",
    titles: {
      en: "Product Updates — App & Game Release Notes",
      tr: "Ürün Güncellemeleri — Uygulama ve Oyun Sürüm Notları",
      es: "Actualizaciones — Notas de Versión de Apps y Juegos",
    },
    descriptions: {
      en: "Release notes for Lunexa's Android apps and games on Google Play: Quietly, Chess Rescue and RPS Duel. What's new, improved and fixed in each version.",
      tr: "Lunexa'nın Google Play'deki Android uygulama ve oyunlarının sürüm notları: Quietly, Chess Rescue ve RPS Duel. Yenilikler, iyileştirmeler ve düzeltmeler.",
      es: "Notas de versión de las apps y juegos Android de Lunexa en Google Play: Quietly, Chess Rescue y RPS Duel. Qué hay de nuevo, qué mejoró y qué se corrigió.",
    },
    obsolete: /Lunexa Games|including RPS Duel|RPS Duel dahil|incluida RPS Duel/i,
  },
] as const;

const LOCALES = [
  { locale: "en", prefix: "" },
  { locale: "tr", prefix: "/tr" },
  { locale: "es", prefix: "/es" },
] as const;

test.describe("Work and Updates metadata", () => {
  for (const p of PAGES) {
    for (const { locale, prefix } of LOCALES) {
      const url = `${prefix}${p.path}`;
      test(`${url} has current title, descriptions and alternates`, async ({ page }) => {
        await page.goto(url);
        const title = p.titles[locale];
        const description = p.descriptions[locale];
        const content = (sel: string) => page.locator(sel).first().getAttribute("content");

        await expect(page).toHaveTitle(`${title} | Lunexa`);
        expect(await content('meta[name="description"]')).toBe(description);
        expect(await content('meta[property="og:title"]')).toBe(title);
        expect(await content('meta[property="og:description"]')).toBe(description);
        expect(await content('meta[name="twitter:title"]')).toBe(title);
        expect(await content('meta[name="twitter:description"]')).toBe(description);
        expect(await content('meta[property="og:url"]')).toBe(`${SITE}${url}`);

        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}${url}`);
        const alternates = await page
          .locator('link[rel="alternate"][hreflang]')
          .evaluateAll((els) => els.map((e) => `${e.getAttribute("hreflang")} ${e.getAttribute("href")}`).sort());
        expect(alternates).toEqual([
          `en ${SITE}${p.path}`,
          `es ${SITE}/es${p.path}`,
          `tr ${SITE}/tr${p.path}`,
          `x-default ${SITE}${p.path}`,
        ]);

        const head = [title, description].join(" ");
        expect(head).not.toMatch(p.obsolete);
      });
    }
  }
});

// The Work lead must not imply that every listed product is already released:
// some cards are live on Google Play, others are still in development.
test.describe("Work introduction", () => {
  const cases = [
    {
      path: "/work",
      lead: "These are real products from the studio: some are publicly available, and others are still in development — each card shows its current status.",
      obsolete: /Every product below is real software, in production/,
    },
    {
      path: "/tr/work",
      lead: "Bunlar stüdyonun gerçek ürünleri: bazıları herkesin kullanımına açık, bazıları ise hâlâ geliştiriliyor — her kartta güncel durumu yer alıyor.",
      obsolete: /Aşağıdaki her ürün gerçek yazılım, üretimde/,
    },
    {
      path: "/es/work",
      lead: "Estos son productos reales del estudio: algunos ya están disponibles públicamente y otros siguen en desarrollo; cada tarjeta muestra su estado actual.",
      obsolete: /Cada producto a continuación es software real, en producción/,
    },
  ];

  for (const c of cases) {
    test(`${c.path} distinguishes released products from work in development`, async ({ page }) => {
      await page.goto(c.path);
      const main = page.locator("main");
      await expect(main).toContainText(c.lead);
      await expect(main).not.toContainText(c.obsolete);
    });
  }
});
