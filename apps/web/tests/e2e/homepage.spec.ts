import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("redirects / to a localized home and renders hero", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/(en|tr|es)$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("#about")).toBeVisible();
    await expect(page.locator("#work")).toBeVisible();
    await expect(page.locator("#principles")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
  });

  test("language switcher changes URL segment and visible copy", async ({ page }) => {
    await page.goto("/en");
    const trigger = page.getByRole("button", { name: /language/i });
    await trigger.click();
    await page.getByRole("option", { name: /türkçe/i }).click();
    await expect(page).toHaveURL(/\/tr$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Sade/i);
  });

  test("contact form fields are present on the homepage", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByLabel(/name/i).first()).toBeVisible();
    await expect(page.getByLabel(/email/i).first()).toBeVisible();
    await expect(page.getByLabel(/message/i).first()).toBeVisible();
  });
});
