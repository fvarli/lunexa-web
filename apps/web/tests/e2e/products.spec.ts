import { test, expect, type Page } from "@playwright/test";

// App landing pages and their Google Play calls to action. Chess Rescue and
// Quietly get their own pages; every store badge names its app; each product
// page repeats the badge at the end; and the home and work pages link to all
// three pages.

const SITE = "https://uselunexa.com";
const PLAY = {
  "rps-duel": "https://play.google.com/store/apps/details?id=com.lunexa.games.rpsduel",
  "chess-rescue": "https://play.google.com/store/apps/details?id=com.lunexa.games.chessrescue",
  quietly: "https://play.google.com/store/apps/details?id=com.lunexa.quietly",
} as const;

const LOCALES = [
  {
    prefix: "",
    badge: {
      "rps-duel": "Get RPS Duel on Google Play",
      "chess-rescue": "Get Chess Rescue on Google Play",
      quietly: "Get Quietly on Google Play",
    },
    details: "View details",
    pages: {
      "chess-rescue": {
        title: "Chess Rescue — Chess Puzzle Game for Android | Lunexa",
        description: "Chess Rescue is a calm, single-player chess-rules puzzle game for Android by Lunexa Games. Start from positions where defeat feels close and find the one move that changes everything. No account needed.",
        lead: "Its rescue-style puzzles start from positions where defeat feels close, and each one turns on finding the one move that changes everything",
        cta: "Chess Rescue for Android",
      },
      quietly: {
        title: "Quietly — Media Saver App for Android | Lunexa",
        description: "Quietly is an Android media saver by Lunexa. Paste a direct public link, preview the media and save it to your gallery, with a history and a save queue. No account, no scraping, no logged-in or DRM-protected content.",
        lead: "Quietly only fetches links you paste or choose to save, at your request — no scraping, and no logged-in or DRM-protected content.",
        cta: "Quietly for Android",
      },
    },
  },
  {
    prefix: "/tr",
    badge: {
      "rps-duel": "RPS Duel'i Google Play'den indirin",
      "chess-rescue": "Chess Rescue'yu Google Play'den indirin",
      quietly: "Quietly'yi Google Play'den indirin",
    },
    details: "Detayları gör",
    pages: {
      "chess-rescue": {
        title: "Chess Rescue — Android için Satranç Bulmaca Oyunu | Lunexa",
        description: "Chess Rescue, Lunexa Games'in Android için sakin, tek oyunculu ve satranç kurallı bulmaca oyunu. Yenilginin yakın hissedildiği pozisyonlardan başla ve her şeyi değiştiren tek hamleyi bul. Hesap gerekmez.",
        lead: "Kurtarma bulmacaları yenilginin yakın hissedildiği pozisyonlardan başlar ve her bulmacada amaç, her şeyi değiştiren tek hamleyi bulmaktır",
        cta: "Android için Chess Rescue",
      },
      quietly: {
        title: "Quietly — Android için Medya Kaydetme Uygulaması | Lunexa",
        description: "Quietly, Lunexa'nın Android medya kaydedicisi. Doğrudan halka açık bir bağlantı yapıştır, medyayı önizle ve galerine kaydet; geçmiş ve kayıt kuyruğu dahil. Hesap yok, kazıma yok, oturum açılmış veya DRM korumalı içerik yok.",
        lead: "Quietly yalnızca senin isteğinle, yapıştırdığın veya kaydetmeyi seçtiğin bağlantıları getirir — kazıma yok, oturum açılmış veya DRM korumalı içerik yok.",
        cta: "Android için Quietly",
      },
    },
  },
  {
    prefix: "/es",
    badge: {
      "rps-duel": "Consigue RPS Duel en Google Play",
      "chess-rescue": "Consigue Chess Rescue en Google Play",
      quietly: "Consigue Quietly en Google Play",
    },
    details: "Ver detalles",
    pages: {
      "chess-rescue": {
        title: "Chess Rescue — Rompecabezas de ajedrez para Android | Lunexa",
        description: "Chess Rescue es un juego de rompecabezas tranquilo, para un solo jugador y con reglas de ajedrez, para Android, de Lunexa Games. Parte de posiciones en las que la derrota parece cercana y encuentra la jugada que lo cambia todo. No requiere cuenta.",
        lead: "Sus rompecabezas de rescate parten de posiciones en las que la derrota parece cercana, y en cada uno el objetivo es encontrar la jugada que lo cambia todo",
        cta: "Chess Rescue para Android",
      },
      quietly: {
        title: "Quietly — App para guardar medios en Android | Lunexa",
        description: "Quietly es un guardador de medios para Android de Lunexa. Pega un enlace público directo, previsualiza el medio y guárdalo en tu galería, con historial y cola de guardado. Sin cuenta, sin scraping y sin contenido protegido por inicio de sesión o DRM.",
        lead: "Quietly solo descarga, a petición tuya, los enlaces que pegas o eliges guardar: sin scraping y sin contenido protegido por inicio de sesión o DRM.",
        cta: "Quietly para Android",
      },
    },
  },
] as const;

// Claims these pages must never make: release-dependent data practices,
// offline/network behaviour, and unverified popularity signals (ratings,
// download counts, awards). "Downloads" as a feature noun is allowed.
const UNSUPPORTED =
  /no ads|reklam yok|sin anuncios|analytics|analitik|analítica|telemetr|offline|çevrimdışı|sin conexión|\bratings?\b|\bpuan|valoraci|\breviews?\b|\d[\d.,]*\s*[kKmM]?\+?\s*(downloads|installs|indirme|descargas)|award|ödül|premio|★/i;

const RETIRED =
  /Each puzzle starts from|Her bulmaca yenilginin|Cada rompecabezas parte de|only fetches the links you paste —|yalnızca yapıştırdığın bağlantıları getirir|solo descarga los enlaces que pegas:/;

async function jsonLd(page: Page): Promise<Record<string, unknown>[]> {
  const raw = await page.locator('script[type="application/ld+json"]').allTextContents();
  return raw.flatMap((r) => {
    const v = JSON.parse(r);
    return Array.isArray(v) ? v : v["@graph"] ?? [v];
  });
}

async function storeBadge(page: Page, slug: keyof typeof PLAY, name: string) {
  const links = page.getByRole("link", { name, exact: true });
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute("href", PLAY[slug]);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
  }
  return links;
}

for (const l of LOCALES) {
  for (const slug of ["chess-rescue", "quietly"] as const) {
    const p = l.pages[slug];
    const path = `${l.prefix}/work/${slug}`;

    test(`${path} is an indexable landing page with metadata and structured data`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page).toHaveTitle(p.title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", p.description);
      await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}${path}`);
      for (const [lang, prefix] of [["en", ""], ["tr", "/tr"], ["es", "/es"], ["x-default", ""]]) {
        await expect(page.locator(`link[rel="alternate"][hreflang="${lang}"]`)).toHaveAttribute(
          "href",
          `${SITE}${prefix}/work/${slug}`,
        );
      }

      const main = page.locator("main");
      await expect(main.getByRole("heading", { level: 1 })).toHaveText(slug === "quietly" ? "Quietly" : "Chess Rescue");
      await expect(main).toContainText(p.lead);
      await expect(main).not.toContainText(UNSUPPORTED);
      // Retired wording: "every puzzle starts near defeat" overgeneralised the
      // release note, and "only the links you paste" was narrower than the
      // published Quietly privacy policy ("paste or choose to save").
      await expect(main).not.toContainText(RETIRED);
      await expect(main.locator(`a[href="${l.prefix}/privacy/${slug}"]`)).toHaveCount(1);
      await expect(main.locator(`a[href="${l.prefix}/terms/${slug}"]`)).toHaveCount(1);

      const data = await jsonLd(page);
      const app = data.find((d) => d["@type"] === "SoftwareApplication");
      expect(app).toBeTruthy();
      expect(app).toMatchObject({
        name: slug === "quietly" ? "Quietly" : "Chess Rescue",
        applicationCategory: slug === "quietly" ? "UtilitiesApplication" : "GameApplication",
        operatingSystem: "Android",
        url: `${SITE}${path}`,
        downloadUrl: PLAY[slug],
        description: p.description,
      });
      // No unverified rating, review or price data in the structured data.
      expect(app).not.toHaveProperty("aggregateRating");
      expect(app).not.toHaveProperty("review");
      expect(app).not.toHaveProperty("offers");
      const crumbs = data.find((d) => d["@type"] === "BreadcrumbList") as { itemListElement: { item: string }[] };
      expect(crumbs.itemListElement.map((c) => c.item)).toEqual([
        `${SITE}${l.prefix}`,
        `${SITE}${l.prefix}/work`,
        `${SITE}${path}`,
      ]);
    });

    test(`${path} offers the store badge at the top and again at the end`, async ({ page }) => {
      await page.goto(path);
      const badges = await storeBadge(page, slug, l.badge[slug]);
      await expect(badges).toHaveCount(2);
      const closing = page.locator("section").filter({ has: page.getByRole("heading", { level: 2, name: p.cta }) });
      await expect(closing.getByRole("link", { name: l.badge[slug], exact: true })).toHaveCount(1);
    });
  }

  test(`${l.prefix || "/"}work/rps-duel names its badge and repeats it at the end`, async ({ page }) => {
    await page.goto(`${l.prefix}/work/rps-duel`);
    const badges = await storeBadge(page, "rps-duel", l.badge["rps-duel"]);
    await expect(badges).toHaveCount(2);
    // The old accessible name was the work card's visit label, ending in an arrow.
    await expect(page.locator('main img[alt*="→"]')).toHaveCount(0);
  });

  test(`${l.prefix || "/"}work names every store badge and links each app's page`, async ({ page }) => {
    await page.goto(`${l.prefix}/work`);
    for (const slug of ["rps-duel", "chess-rescue", "quietly"] as const) {
      await expect(await storeBadge(page, slug, l.badge[slug])).toHaveCount(1);
      const name = slug === "rps-duel" ? "RPS Duel" : slug === "quietly" ? "Quietly" : "Chess Rescue";
      const details = page.getByRole("link", { name: `${l.details}: ${name}`, exact: true });
      await expect(details).toHaveAttribute("href", `${l.prefix}/work/${slug}`);
    }
  });

  test(`${l.prefix || "/"} home links every app card to its landing page`, async ({ page }) => {
    await page.goto(l.prefix || "/");
    for (const [slug, name] of [["rps-duel", "RPS Duel"], ["chess-rescue", "Chess Rescue"], ["quietly", "Quietly"]]) {
      const details = page.getByRole("link", { name: `${l.details}: ${name}`, exact: true });
      await expect(details).toHaveCount(1);
      await expect(details).toHaveAttribute("href", `${l.prefix}/work/${slug}`);
      await expect(details).toHaveText(`${l.details} →`);
    }
  });
}

test("sitemap lists both new landing pages in every locale with alternates", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const slug of ["chess-rescue", "quietly"]) {
    for (const prefix of ["", "/tr", "/es"]) {
      expect(xml).toContain(`<loc>${SITE}${prefix}/work/${slug}</loc>`);
    }
    expect(xml).toContain(`hreflang="x-default" href="${SITE}/work/${slug}"`);
  }
});

test.describe("app landing pages on a 360px phone", () => {
  test.use({ viewport: { width: 360, height: 780 } });

  for (const path of ["/work/chess-rescue", "/tr/work/quietly", "/es/work/rps-duel"]) {
    test(`${path} has no horizontal overflow and a tappable store badge`, async ({ page }) => {
      await page.goto(path);
      const { sw, cw } = await page.evaluate(() => ({
        sw: document.documentElement.scrollWidth,
        cw: document.documentElement.clientWidth,
      }));
      expect(sw).toBeLessThanOrEqual(cw);
      for (const badge of await page.locator('main a[href^="https://play.google.com/"]').all()) {
        const box = await badge.boundingBox();
        expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
        expect(box?.width ?? 0).toBeGreaterThanOrEqual(44);
      }
    });
  }
});
