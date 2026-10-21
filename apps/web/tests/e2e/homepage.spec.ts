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

  test("work lists Chess Rescue on Google Play and keeps Quietly unreleased", async ({ page }) => {
    await page.goto("/work");
    const chess = page.locator("article").filter({ has: page.getByRole("heading", { name: "Chess Rescue" }) });
    await expect(chess.locator(`a[href="${CHESS_PLAY}"]`)).toHaveCount(1);
    await expect(chess).not.toContainText(/Prototype|Coming to Google Play/);
    await expect(chess).not.toContainText(/offline|no backend|no analytics|entirely on your device/i);
    const quietly = page.locator("article").filter({ has: page.getByRole("heading", { name: "Quietly" }) });
    await expect(quietly.locator('a[href^="https://play.google.com/"]')).toHaveCount(0);
    await expect(quietly).toContainText("Production release pending");
    await expect(quietly).toContainText("Not yet available on Google Play");
  });
});
