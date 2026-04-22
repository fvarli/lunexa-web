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
