import { test, expect } from "@playwright/test";

test.describe("Navigation & routing", () => {
  test("/contact is English (no prefix)", async ({ page }) => {
    await page.goto("/contact");
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("/tr/contact is Turkish", async ({ page }) => {
    await page.goto("/tr/contact");
    await expect(page).toHaveURL(/\/tr\/contact$/);
  });

  test("/en/contact redirects to /contact", async ({ page }) => {
    await page.goto("/en/contact");
    await expect(page).toHaveURL(/\/contact$/);
  });

  test("privacy page loads", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/privacy/i);
  });

  test("terms page loads", async ({ page }) => {
    await page.goto("/terms");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/terms/i);
  });

  test("about page loads", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("services index loads", async ({ page }) => {
    await page.goto("/services");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/what we build/i);
  });

  test("404 page renders for missing routes", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist-xyz");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/not found/i);
    await expect(page.getByRole("link", { name: /go home/i })).toBeVisible();
  });

  // The changelog has no verified entries yet, so /updates must not be a public
  // surface at all. Flip these to positive assertions in the same commit that
  // adds the first entry to UPDATES.
  test("/updates 404s in every locale while the changelog is empty", async ({ request }) => {
    for (const path of ["/updates", "/tr/updates", "/es/updates"]) {
      expect((await request.get(path)).status(), path).toBe(404);
    }
  });

  test("empty changelog is absent from the sitemap", async ({ request }) => {
    const body = await (await request.get("/sitemap.xml")).text();
    expect(body).not.toContain("/updates");
  });

  test("empty changelog is absent from the footer", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("contentinfo").getByRole("link", { name: /updates/i })
    ).toHaveCount(0);
  });

  test("robots.txt is served", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("User-Agent:");
    expect(body).toContain("sitemap");
  });

  test("sitemap.xml is served, valid XML, and contains all locale variants", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/^<\?xml version="1\.0"/);
    expect(body).toContain("<urlset");
    // English URLs have no prefix
    expect(body).toContain("<loc>https://uselunexa.com/contact</loc>");
    // Turkish and Spanish have prefixes
    expect(body).toContain("<loc>https://uselunexa.com/tr/contact</loc>");
    expect(body).toContain("<loc>https://uselunexa.com/es/contact</loc>");
    // hreflang xhtml:link alternates present
    expect(body).toContain("hreflang=\"en\"");
    expect(body).toContain("hreflang=\"tr\"");
    expect(body).toContain("hreflang=\"x-default\"");
  });
});
