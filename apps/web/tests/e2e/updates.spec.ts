import { test, expect } from "@playwright/test";

const CHESS_PLAY = "https://play.google.com/store/apps/details?id=com.lunexa.games.chessrescue";
const QUIETLY_PLAY = "https://play.google.com/store/apps/details?id=com.lunexa.quietly";
const RPS_PLAY = "https://play.google.com/store/apps/details?id=com.lunexa.games.rpsduel";

test.describe("Updates — first production releases", () => {
  const locales = [
    {
      prefix: "",
      quietly: "Quietly is live on Google Play",
      chess: "Chess Rescue is live on Google Play",
      quietlyDate: "October 20, 2026",
      chessDate: "October 14, 2026",
      store: /Get it on Google Play/,
    },
    {
      prefix: "/tr",
      quietly: "Quietly Google Play'de yayında",
      chess: "Chess Rescue Google Play'de yayında",
      quietlyDate: "20 Ekim 2026",
      chessDate: "14 Ekim 2026",
      store: /Google Play'den edinin/,
    },
    {
      prefix: "/es",
      quietly: "Quietly ya está disponible en Google Play",
      chess: "Chess Rescue ya está disponible en Google Play",
      quietlyDate: "20 de octubre de 2026",
      chessDate: "14 de octubre de 2026",
      store: /Disponible en Google Play/,
    },
  ];

  for (const l of locales) {
    test(`updates ${l.prefix || "/"} lists the releases newest first, first releases intact`, async ({ page }) => {
      await page.goto(`${l.prefix}/updates`);
      const ids = await page.locator("main article").evaluateAll((els) => els.map((e) => e.id));
      expect(ids).toEqual(["quietly-1-1-0", "chess-rescue-1-2-1", "quietly-1-0-4", "chess-rescue-1-2-0", "rps-duel-2026-07-07"]);

      const quietly = page.locator("article#quietly-1-0-4");
      await expect(quietly.getByRole("heading", { level: 2 })).toHaveText(`${l.quietly}1.0.4`);
      await expect(quietly.locator("time")).toHaveAttribute("datetime", "2026-10-20");
      await expect(quietly.locator("time")).toHaveText(l.quietlyDate);
      await expect(quietly.getByRole("link", { name: l.store })).toHaveAttribute("href", QUIETLY_PLAY);
      await expect(quietly).not.toContainText(/backup|yedek|copia de seguridad|delet|silin|elimin/i);

      const chess = page.locator("article#chess-rescue-1-2-0");
      await expect(chess.getByRole("heading", { level: 2 })).toHaveText(`${l.chess}1.2.0`);
      await expect(chess.locator("time")).toHaveAttribute("datetime", "2026-10-14");
      await expect(chess.locator("time")).toHaveText(l.chessDate);
      await expect(chess.getByRole("link", { name: l.store })).toHaveAttribute("href", CHESS_PLAY);
      await expect(chess).not.toContainText(/offline|çevrimdışı|sin conexión|analytic|analitik|analítica|1\.3\.0/i);

      // The existing entry is untouched.
      const rps = page.locator("article#rps-duel-2026-07-07");
      await expect(rps.locator("time")).toHaveAttribute("datetime", "2026-07-07");
      await expect(rps.locator(`a[href="${RPS_PLAY}"]`)).toHaveCount(1);
    });
  }
});

test.describe("Updates — Quietly 1.1.0 and Chess Rescue 1.2.1", () => {
  const locales = [
    { prefix: "", quietly: "A save queue and safer history cleanup", chess: "Puzzle fixes and clearer opening guidance", date: "October 24, 2026" },
    { prefix: "/tr", quietly: "Kayıt kuyruğu ve daha güvenli geçmiş temizliği", chess: "Bulmaca düzeltmeleri ve daha net açılış rehberliği", date: "24 Ekim 2026" },
    { prefix: "/es", quietly: "Cola de guardado y limpieza del historial más segura", chess: "Correcciones de rompecabezas y una guía inicial más clara", date: "24 de octubre de 2026" },
  ];

  for (const l of locales) {
    test(`updates ${l.prefix || "/"} shows both Oct 24 releases with store versions and links`, async ({ page }) => {
      await page.goto(`${l.prefix}/updates`);

      const quietly = page.locator("article#quietly-1-1-0");
      await expect(quietly.getByRole("heading", { level: 2 })).toHaveText(`${l.quietly}1.1.0`);
      await expect(quietly.locator("time")).toHaveAttribute("datetime", "2026-10-24");
      await expect(quietly.locator("time")).toHaveText(l.date);
      await expect(quietly.locator(`a[href="${QUIETLY_PLAY}"]`)).toHaveCount(1);
      await expect(quietly.locator("li")).toHaveCount(3);
      // Device backup and transfer behaviour is not claimed until it is verified.
      await expect(quietly).not.toContainText(/backup|transfer|yedek|aktar|copia de seguridad|transferencia/i);

      const chess = page.locator("article#chess-rescue-1-2-1");
      await expect(chess.getByRole("heading", { level: 2 })).toHaveText(`${l.chess}1.2.1`);
      await expect(chess.locator("time")).toHaveAttribute("datetime", "2026-10-24");
      await expect(chess.locator(`a[href="${CHESS_PLAY}"]`)).toHaveCount(1);
      await expect(chess.locator("li")).toHaveCount(3);
      await expect(chess).not.toContainText(/offline|internet|firebase|analytic|çevrimdışı|analitik|sin conexión|analítica/i);
    });
  }
});
