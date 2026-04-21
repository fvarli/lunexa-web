import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("renders hero and core sections", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("#about")).toBeVisible();
    await expect(page.locator("#work")).toBeVisible();
    await expect(page.locator("#principles")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
  });

  test("language switcher flips visible copy", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: /language/i });
    await trigger.click();
    await page.getByRole("option", { name: /türkçe/i }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Sade/i);
  });

  test("contact form fields are present", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByLabel(/name/i).first()).toBeVisible();
    await expect(page.getByLabel(/email/i).first()).toBeVisible();
    await expect(page.getByLabel(/message/i).first()).toBeVisible();
  });
});
