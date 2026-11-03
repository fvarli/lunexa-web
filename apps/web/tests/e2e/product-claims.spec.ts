import { test, expect, type Page } from "@playwright/test";

const SITE = "https://uselunexa.com";

// Product claims must match the live apps: RPS Duel 1.1.0 (ads, region-dependent
// usage statistics), Chess Rescue 1.5.0 (ads outside puzzles, optional rewarded
// help, opt-in usage statistics) and Quietly 1.2.0 (one ad after a save,
// opt-in usage statistics). Upcoming Quietly 1.2.1 behaviour is never presented
// as current outside its version-labelled privacy text, and summaries of data
// handling link the app's privacy policy.

// Absolute claims the live apps contradict, in EN/TR/ES.
const OUTDATED =
  /no ads|ad-free|without ads|no analytics|no telemetry|no tracking|no data collection|entirely offline|fully offline|offline puzzle game|reklam yok|reklamsız|analitik yok|telemetri yok|takip yok|tamamen çevrimdışı|çevrimdışı bulmaca oyunu|sin anuncios|sin analítica|sin telemetría|sin seguimiento|totalmente sin conexión|y sin conexión de Lunexa|anonymous|anonim|anónim/i;

// Quietly 1.2.1 (region-dependent, on after a notice) must not read as current.
const QUIETLY_121 = /1\.2\.1|one-time notice|on by default|Türkiye|tek seferlik|varsayılan olarak|aviso único|por defecto|Turquía/i;

const LOCALES = [
  {
    prefix: "",
    work: {
      rps: "Banner ads on the Records and Collection screens and a full-screen ad between matches; usage statistics depend on your region and your choices.",
      chess: "Ads appear outside puzzles, an optional video ad can offer help with a puzzle, and usage statistics stay off unless you allow them.",
      quietly: "No account. One ad from Google after a save, and usage statistics only if you turn them on. Your links, files and history are never sent with either.",
    },
    privacyLabel: "Privacy policy",
    homeQuietly: "Saves direct public media from links you paste into your device gallery. No account; one ad after a save, and usage statistics only if you turn them on.",
    supportAnswer: "The app also shows ads and, depending on your region and choices, sends usage statistics when it has a connection; the privacy policy describes the data involved.",
    meta: {
      "/privacy/rps-duel": "Privacy policy for RPS Duel by Lunexa Games: ads, usage statistics that depend on your region and choices, the data declared on Google Play, and what the app stores on your device.",
      "/privacy/chess-rescue": "Privacy policy for Chess Rescue by Lunexa Games: Google AdMob ads, including full-screen and optional rewarded ads, optional usage statistics, and what the app stores on your device.",
      "/privacy/quietly": "Privacy policy for Quietly, a media-saver Android app by Lunexa: one Google ad after a save, optional usage statistics, the servers Quietly contacts, and what it stores on your device.",
      "/terms/chess-rescue": "Terms of service for Chess Rescue (com.lunexa.games.chessrescue), a single-player chess-rules puzzle game by Lunexa Games. Entertainment only — not a chess training or certification product.",
    },
    chessTermsPlay: "Chess Rescue does not require an account and does not need a network connection to play.",
  },
  {
    prefix: "/tr",
    work: {
      rps: "Kayıtlar ve Koleksiyon ekranlarında banner reklamlar, maçlar arasında tam ekran bir reklam; kullanım istatistikleri bulunduğun bölgeye ve tercihlerine bağlıdır.",
      chess: "Reklamlar bulmaca dışında görünür, isteğe bağlı bir video reklam bir bulmacada yardım önerebilir ve kullanım istatistikleri sen izin vermedikçe kapalı kalır.",
      quietly: "Hesap yok. Kayıttan sonra Google'dan tek bir reklam; kullanım istatistikleri yalnızca sen açarsan. Bağlantıların, dosyaların ve geçmişin hiçbiriyle birlikte gönderilmez.",
    },
    privacyLabel: "Gizlilik politikası",
    homeQuietly: "Yapıştırdığın bağlantılardaki doğrudan halka açık medyayı cihazının galerisine kaydeder. Hesap yok; kayıttan sonra tek bir reklam, kullanım istatistikleri ise yalnızca sen açarsan.",
    supportAnswer: "Uygulama ayrıca reklam gösterir ve bölgenize ve tercihlerinize bağlı olarak bağlantı olduğunda kullanım istatistikleri gönderir; ilgili veriler gizlilik politikasında açıklanır.",
    meta: {
      "/privacy/rps-duel": "Lunexa Games'in RPS Duel oyunu için gizlilik politikası: reklamlar, bölgene ve tercihlerine bağlı kullanım istatistikleri, Google Play'de beyan edilen veriler ve cihazında saklananlar.",
      "/privacy/chess-rescue": "Chess Rescue gizlilik politikası (Lunexa Games): tam ekran ve isteğe bağlı ödüllü reklamlar dahil Google AdMob reklamları, isteğe bağlı kullanım istatistikleri ve cihazında saklananlar.",
      "/privacy/quietly": "Quietly için gizlilik politikası — Lunexa'nın Android medya kaydedicisi: kayıttan sonra tek bir Google reklamı, isteğe bağlı kullanım istatistikleri, Quietly'nin bağlandığı sunucular ve cihazında sakladıkları.",
      "/terms/chess-rescue": "Chess Rescue için kullanım şartları (com.lunexa.games.chessrescue) — Lunexa Games tarafından geliştirilen tek oyunculu, satranç kurallı bulmaca oyunu. Yalnızca eğlence amaçlı — satranç eğitimi veya sertifikasyon ürünü değildir.",
    },
    chessTermsPlay: "Chess Rescue hesap gerektirmez ve oynamak için ağ bağlantısına ihtiyaç duymaz.",
  },
  {
    prefix: "/es",
    work: {
      rps: "Anuncios de banner en las pantallas Registros y Colección y un anuncio a pantalla completa entre partidos; las estadísticas de uso dependen de tu región y de tus elecciones.",
      chess: "Los anuncios aparecen fuera de los rompecabezas, un anuncio en vídeo opcional puede ofrecer ayuda con un rompecabezas y las estadísticas de uso siguen desactivadas salvo que las permitas.",
      quietly: "Sin cuenta. Un anuncio de Google después de guardar, y estadísticas de uso solo si las activas. Tus enlaces, archivos e historial nunca se envían con ninguno de ellos.",
    },
    privacyLabel: "Política de privacidad",
    homeQuietly: "Guarda en la galería de tu dispositivo medios públicos directos de los enlaces que pegas. Sin cuenta; un anuncio después de guardar y estadísticas de uso solo si las activas.",
    supportAnswer: "La aplicación también muestra anuncios y, según tu región y tus elecciones, envía estadísticas de uso cuando hay conexión; la política de privacidad describe los datos implicados.",
    meta: {
      "/privacy/rps-duel": "Política de privacidad de RPS Duel (Lunexa Games): anuncios, estadísticas de uso según tu región y tus elecciones, los datos declarados en Google Play y qué guarda en tu dispositivo.",
      "/privacy/chess-rescue": "Política de privacidad de Chess Rescue (Lunexa Games): anuncios de Google AdMob, incluidos los de pantalla completa y los recompensados opcionales, estadísticas de uso opcionales y qué guarda en tu dispositivo.",
      "/privacy/quietly": "Política de privacidad de Quietly, el guardador de medios Android de Lunexa: un anuncio de Google tras guardar, estadísticas de uso opcionales, los servidores a los que se conecta y lo que guarda en tu dispositivo.",
      "/terms/chess-rescue": "Términos de servicio de Chess Rescue (com.lunexa.games.chessrescue), un juego de rompecabezas con reglas de ajedrez para un solo jugador de Lunexa Games. Solo entretenimiento: no es un producto de entrenamiento ni certificación de ajedrez.",
    },
    chessTermsPlay: "Chess Rescue no requiere una cuenta ni necesita conexión de red para jugar.",
  },
] as const;

const APPS = [
  { key: "rps", name: "RPS Duel", slug: "rps-duel" },
  { key: "chess", name: "Chess Rescue", slug: "chess-rescue" },
  { key: "quietly", name: "Quietly", slug: "quietly" },
] as const;

// Public pages that summarise the apps (privacy pages and the dated release
// notes on /updates keep their own, version-labelled history).
const SUMMARY_PAGES = ["/", "/work", "/work/rps-duel", "/work/chess-rescue", "/work/quietly", "/support/rps-duel", "/terms/rps-duel", "/terms/chess-rescue", "/terms/quietly"];

async function descriptions(page: Page) {
  const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).join(" ");
  return [
    (await page.locator('meta[name="description"]').getAttribute("content")) ?? "",
    (await page.locator('meta[property="og:description"]').getAttribute("content")) ?? "",
    (await page.locator('meta[name="twitter:description"]').getAttribute("content")) ?? "",
    ld,
  ].join(" ");
}

for (const l of LOCALES) {
  test.describe(`Product claims ${l.prefix || "/"}`, () => {
    test(`work cards describe ads and usage statistics and link each privacy policy`, async ({ page }) => {
      await page.goto(`${l.prefix}/work`);
      for (const app of APPS) {
        const card = page.locator("article").filter({ has: page.getByRole("heading", { name: app.name, exact: true }) });
        await expect(card).toHaveCount(1);
        await expect(card).toContainText(l.work[app.key]);
        await expect(card).not.toContainText(OUTDATED);
        await expect(card).not.toContainText(/\b\d+\.\d+\.\d+\b/);
        const privacy = card.locator(`a[href="${l.prefix}/privacy/${app.slug}"]`);
        await expect(privacy).toHaveCount(1);
        await expect(privacy).toBeVisible();
      }
      const quietly = page.locator("article").filter({ has: page.getByRole("heading", { name: "Quietly", exact: true }) });
      await expect(quietly).not.toContainText(QUIETLY_121);
    });

    test(`home describes Quietly 1.2.0 and links its privacy policy`, async ({ page }) => {
      await page.goto(l.prefix || "/");
      const card = page.locator("main li").filter({ has: page.getByRole("heading", { name: "Quietly", exact: true }) });
      await expect(card).toHaveCount(1);
      await expect(card).toContainText(l.homeQuietly);
      await expect(card).not.toContainText(QUIETLY_121);
      const privacy = card.getByRole("link", { name: `${l.privacyLabel}: Quietly`, exact: true });
      await expect(privacy).toHaveAttribute("href", `${l.prefix}/privacy/quietly`);
      await expect(privacy).toBeVisible();
    });

    test(`RPS Duel support no longer names version 1.0.5`, async ({ page }) => {
      await page.goto(`${l.prefix}/support/rps-duel`);
      const main = page.locator("main");
      await expect(main).toContainText(l.supportAnswer);
      await expect(main).not.toContainText(/1\.0\.5/);
    });

    test(`Chess Rescue terms keep offline play scoped to playing`, async ({ page }) => {
      await page.goto(`${l.prefix}/terms/chess-rescue`);
      await expect(page.locator("main")).toContainText(l.chessTermsPlay);
    });

    test(`meta, Open Graph and Twitter descriptions match the live apps`, async ({ page }) => {
      for (const [path, description] of Object.entries(l.meta)) {
        const res = await page.goto(`${l.prefix}${path}`);
        expect(res?.status()).toBe(200);
        await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", description);
        await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", description);
        await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute("content", description);
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}${l.prefix}${path}`);
        for (const [lang, prefix] of [["en", ""], ["tr", "/tr"], ["es", "/es"], ["x-default", ""]]) {
          await expect(page.locator(`link[rel="alternate"][hreflang="${lang}"]`)).toHaveAttribute("href", `${SITE}${prefix}${path}`);
        }
      }
    });

    test(`summary pages make no outdated absolute claim in body, meta or structured data`, async ({ page }) => {
      for (const path of SUMMARY_PAGES) {
        const res = await page.goto(`${l.prefix}${path}`);
        expect(res?.status()).toBe(200);
        await expect(page.locator("main")).not.toContainText(OUTDATED);
        expect(await descriptions(page)).not.toMatch(OUTDATED);
        // No store availability or version claim beyond "on Google Play".
        await expect(page.locator("main")).not.toContainText(/now available in version|1\.2\.1 is (live|available)|update to 1\.2\.1/i);
      }
      for (const app of APPS) {
        await page.goto(`${l.prefix}/privacy/${app.slug}`);
        expect(await descriptions(page)).not.toMatch(OUTDATED);
      }
    });
  });
}
