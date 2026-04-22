import { test, expect } from "@playwright/test";

test.describe("Navigation & routing", () => {
  test("/contact redirects to /<locale>/contact", async ({ page }) => {
    await page.goto("/contact");
    await expect(page).toHaveURL(/\/(en|tr|es)\/contact$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("privacy page loads", async ({ page }) => {
    await page.goto("/en/privacy");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/privacy/i);
  });

  test("terms page loads", async ({ page }) => {
    await page.goto("/en/terms");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/terms/i);
  });

  test("404 page renders for missing routes", async ({ page }) => {
    const response = await page.goto("/en/this-route-does-not-exist-xyz");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/not found/i);
    await expect(page.getByRole("link", { name: /go home/i })).toBeVisible();
  });

  test("robots.txt is served", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("User-Agent:");
    expect(body).toContain("sitemap");
  });

  test("sitemap.xml is served and contains locale-prefixed URLs", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("<urlset");
    expect(body).toContain("uselunexa.com/en");
    expect(body).toContain("uselunexa.com/tr");
    expect(body).toContain("uselunexa.com/es");
  });
});
