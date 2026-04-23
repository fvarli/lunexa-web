import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

test.describe("Mobile menu", () => {
  test("opens, lists nav links, closes on link click", async ({ page }) => {
    await page.goto("/");

    const toggle = page.getByRole("button", { name: /open menu/i });
    await expect(toggle).toBeVisible();

    await toggle.click();

    const dialog = page.getByRole("dialog", { name: /main menu/i });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("link", { name: /about/i })).toBeVisible();
    await expect(dialog.getByRole("link", { name: /services/i })).toBeVisible();
    await expect(dialog.getByRole("link", { name: /blog/i })).toBeVisible();
    await expect(dialog.getByRole("link", { name: /contact/i })).toBeVisible();

    await dialog.getByRole("link", { name: /contact/i }).click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByRole("dialog", { name: /main menu/i })).toHaveCount(0);
  });

  test("closes on ESC", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /open menu/i }).click();
    await expect(page.getByRole("dialog", { name: /main menu/i })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: /main menu/i })).toHaveCount(0);
  });

  test("closes on X button", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /open menu/i }).click();
    await page.getByRole("button", { name: /close menu/i }).click();
    await expect(page.getByRole("dialog", { name: /main menu/i })).toHaveCount(0);
  });
});
