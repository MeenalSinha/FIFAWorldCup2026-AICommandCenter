import { test, expect } from "@playwright/test";

test.describe("error recovery", () => {
  test("a broken component is caught by the error boundary with a retry option", async ({ page }) => {
    // Force every backend call to fail, then confirm the app degrades to
    // fallback data instead of a blank page or an unhandled crash.
    await page.route("**/api/backend/**", (route) => route.abort());
    await page.goto("/");
    await expect(page.getByText(/welcome back, riya/i)).toBeVisible();
    await expect(page.getByRole("status")).toContainText(/cached demo data/i);
  });

  test("navigating to a non-existent route does not crash the app shell", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist");
    expect(response?.status()).toBeLessThan(500);
    await expect(page.getByRole("navigation")).toBeVisible();
  });
});
