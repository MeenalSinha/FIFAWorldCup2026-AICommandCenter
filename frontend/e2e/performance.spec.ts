import { test, expect } from "@playwright/test";

test.describe("performance regression guards", () => {
  test("overview page reaches load state within a reasonable budget", async ({ page }) => {
    const start = Date.now();
    await page.goto("/", { waitUntil: "load" });
    const elapsedMs = Date.now() - start;
    // Generous budget for CI runners; tightened once real Lighthouse
    // baselines exist (see docs/TESTING.md for why Lighthouse itself
    // couldn't be run in the authoring environment).
    expect(elapsedMs).toBeLessThan(5000);
  });

  test("reports page (with the lazy-loaded chart) does not block on the chart bundle", async ({ page }) => {
    await page.goto("/reports");
    await expect(page.getByText(/entry wait time trend/i)).toBeVisible({ timeout: 5000 });
  });
});
