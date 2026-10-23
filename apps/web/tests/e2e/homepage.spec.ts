import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("/ serves the English home without redirecting (default locale has no prefix)", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("#about")).toBeVisible();
    await expect(page.locator("#work")).toBeVisible();
    await expect(page.locator("#principles")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
  });

  test("/en redirects to /", async ({ page }) => {
    await page.goto("/en");
    await expect(page).toHaveURL(/\/$/);
  });

  test("/tr serves the Turkish home", async ({ page }) => {
    await page.goto("/tr");
    await expect(page).toHaveURL(/\/tr$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Sade/i);
  });

  test("language switcher goes from English (no prefix) to /tr", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: /language|dil|idioma/i });
    await trigger.click();
    await page.getByRole("option", { name: /türkçe/i }).click();
    await expect(page).toHaveURL(/\/tr$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Sade/i);
  });

  test("language switcher goes from /tr back to /", async ({ page }) => {
    await page.goto("/tr");
    const trigger = page.getByRole("button", { name: /language|dil|idioma/i });
    await trigger.click();
    await page.getByRole("option", { name: /english/i }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("contact form fields are present on the homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByLabel(/name/i).first()).toBeVisible();
    await expect(page.getByLabel(/email/i).first()).toBeVisible();
    await expect(page.getByLabel(/message/i).first()).toBeVisible();
  });
});

const RPS_PLAY = "https://play.google.com/store/apps/details?id=com.lunexa.games.rpsduel";
const CHESS_PLAY = "https://play.google.com/store/apps/details?id=com.lunexa.games.chessrescue";
const DEVELOPER_PLAY = "https://play.google.com/store/apps/developer?id=Use+Lunexa";

test.describe("Published games discovery", () => {
  const locales = [
    { prefix: "", rps: /Get RPS Duel on Google Play/, chess: /Get Chess Rescue on Google Play/, all: /See all our apps on Google Play/ },
    { prefix: "/tr", rps: /RPS Duel'i Google Play'den indirin/, chess: /Chess Rescue'yu Google Play'den indirin/, all: /Google Play'deki tüm uygulamalarımızı gör/ },
    { prefix: "/es", rps: /Consigue RPS Duel en Google Play/, chess: /Consigue Chess Rescue en Google Play/, all: /Ver todas nuestras aplicaciones en Google Play/ },
  ];

  for (const l of locales) {
    test(`home ${l.prefix || "/"} links each game to its own listing and to the developer profile`, async ({ page }) => {
      await page.goto(l.prefix || "/");
      await expect(page.getByRole("link", { name: l.rps })).toHaveAttribute("href", RPS_PLAY);
      await expect(page.getByRole("link", { name: l.chess })).toHaveAttribute("href", CHESS_PLAY);
      await expect(page.getByRole("link", { name: l.all })).toHaveAttribute("href", DEVELOPER_PLAY);
    });
  }

  test("work lists Chess Rescue on Google Play", async ({ page }) => {
    await page.goto("/work");
    const chess = page.locator("article").filter({ has: page.getByRole("heading", { name: "Chess Rescue" }) });
    await expect(chess.locator(`a[href="${CHESS_PLAY}"]`)).toHaveCount(1);
    await expect(chess).not.toContainText(/Prototype|Coming to Google Play/);
    await expect(chess).not.toContainText(/offline|no backend|no analytics|entirely on your device/i);
  });
});

const QUIETLY_PLAY = "https://play.google.com/store/apps/details?id=com.lunexa.quietly";

test.describe("Quietly on Google Play", () => {
  const locales = [
    {
      prefix: "",
      homeBadge: /Get Quietly on Google Play/,
      gamesHeading: "Games, made with the same care",
      workBadge: "Get it on Google Play",
      live: "Live on Google Play",
      obsolete: /release pending|not yet available|coming soon|in review|closed testing/i,
    },
    {
      prefix: "/tr",
      homeBadge: /Quietly'yi Google Play'den indirin/,
      gamesHeading: "Aynı özenle yapılmış oyunlar",
      workBadge: "Google Play'den indirin",
      live: "Google Play'de yayında",
      obsolete: /bekleniyor|henüz|yakında|incelemede|kapalı test/i,
    },
    {
      prefix: "/es",
      homeBadge: /Consigue Quietly en Google Play/,
      gamesHeading: "Juegos, hechos con el mismo cuidado",
      workBadge: "Consíguelo en Google Play",
      live: "Disponible en Google Play",
      obsolete: /pendiente|aún no|próximamente|en revisión|pruebas cerradas/i,
    },
  ];

  for (const l of locales) {
    test(`home ${l.prefix || "/"} links Quietly to its own listing, outside the games list`, async ({ page }) => {
      await page.goto(l.prefix || "/");
      await expect(page.getByRole("link", { name: l.homeBadge })).toHaveAttribute("href", QUIETLY_PLAY);
      await expect(page.locator(`a[href="${QUIETLY_PLAY}"]`)).toHaveCount(1);
      // Ancestors precede descendants in DOM order, so the last match is the games box itself.
      const games = page
        .locator("div")
        .filter({ has: page.getByRole("heading", { level: 2, name: l.gamesHeading }) })
        .last();
      await expect(games.getByRole("heading", { level: 3 })).toHaveText(["RPS Duel", "Chess Rescue"]);
      await expect(games).not.toContainText("Quietly");
      await expect(games.locator(`a[href="${RPS_PLAY}"]`)).toHaveCount(1);
      await expect(games.locator(`a[href="${CHESS_PLAY}"]`)).toHaveCount(1);
      await expect(games.locator(`a[href="${DEVELOPER_PLAY}"]`)).toHaveCount(1);
    });

    test(`work ${l.prefix || "/"} shows Quietly live with its listing and privacy policy`, async ({ page }) => {
      await page.goto(`${l.prefix}/work`);
      const quietly = page.locator("article").filter({ has: page.getByRole("heading", { name: "Quietly" }) });
      await expect(quietly).toContainText(l.live);
      await expect(quietly).not.toContainText(l.obsolete);
      await expect(quietly.getByRole("link", { name: l.workBadge })).toHaveAttribute("href", QUIETLY_PLAY);
      await expect(quietly.locator(`a[href="${QUIETLY_PLAY}"]`)).toHaveCount(1);
      await expect(quietly.locator(`a[href="${DEVELOPER_PLAY}"]`)).toHaveCount(0);
      await expect(quietly.locator(`a[href="${l.prefix}/privacy/quietly"]`)).toHaveCount(1);
      await expect(page.locator(`a[href="${RPS_PLAY}"]`)).toHaveCount(1);
      await expect(page.locator(`a[href="${CHESS_PLAY}"]`)).toHaveCount(1);
    });

    test(`terms ${l.prefix || "/"} keeps the Quietly terms link`, async ({ page }) => {
      await page.goto(`${l.prefix}/terms`);
      await expect(page.locator(`main a[href="${l.prefix}/terms/quietly"]`)).toHaveCount(1);
      const res = await page.goto(`${l.prefix}/terms/quietly`);
      expect(res?.status()).toBe(200);
      const privacy = await page.goto(`${l.prefix}/privacy/quietly`);
      expect(privacy?.status()).toBe(200);
    });
  }
});
