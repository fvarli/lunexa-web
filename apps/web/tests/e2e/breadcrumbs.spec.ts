import { test, expect, type Page } from "@playwright/test";

// BreadcrumbList JSON-LD names follow the page's language; English keeps the
// names it always had, and product names are never translated.

async function crumbs(page: Page) {
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  const list = blocks.map((b) => JSON.parse(b)).find((d) => d["@type"] === "BreadcrumbList");
  return (list.itemListElement as { name: string; item: string }[]).map((c) => c.name);
}

const CASES: [string, string[]][] = [
  ["/work/quietly", ["Home", "Work", "Quietly"]],
  ["/tr/work/quietly", ["Ana Sayfa", "İşlerimiz", "Quietly"]],
  ["/es/work/chess-rescue", ["Inicio", "Nuestro Trabajo", "Chess Rescue"]],
  ["/privacy/rps-duel", ["Home", "Privacy Policy", "RPS Duel"]],
  ["/tr/privacy/rps-duel", ["Ana Sayfa", "Gizlilik Politikası", "RPS Duel"]],
  ["/es/terms/quietly", ["Inicio", "Términos de Uso", "Quietly"]],
  ["/tr/support/rps-duel", ["Ana Sayfa", "RPS Duel", "Destek"]],
  ["/es/services/mobile", ["Inicio", "Servicios", "Móvil"]],
  ["/tr/updates", ["Ana Sayfa", "Güncellemeler"]],
];

for (const [path, names] of CASES) {
  test(`${path} breadcrumb names are localized`, async ({ page }) => {
    await page.goto(path);
    expect(await crumbs(page)).toEqual(names);
  });
}
