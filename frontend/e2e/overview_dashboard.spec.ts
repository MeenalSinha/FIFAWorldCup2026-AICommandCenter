import { test, expect } from "@playwright/test";

test.describe("overview dashboard", () => {
  test("renders all primary dashboard cards with live or fallback data", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/welcome back, riya/i)).toBeVisible();
    await expect(page.getByText(/stadium digital twin/i)).toBeVisible();
    await expect(page.getByText(/ai insights/i)).toBeVisible();
    await expect(page.getByText(/live crowd heatmap/i)).toBeVisible();
    await expect(page.getByText(/operations overview/i)).toBeVisible();
    await expect(page.getByText(/sustainability score/i)).toBeVisible();
    await expect(page.getByText(/transportation overview/i)).toBeVisible();
  });

  test("shows the connection status banner when the backend is unreachable", async ({ page }) => {
    // Route the backend proxy to fail so the honest "cached demo data"
    // banner is exercised instead of relying on a live backend.
    await page.route("**/api/backend/**", (route) => route.abort());
    await page.goto("/");
    await expect(page.getByRole("status")).toContainText(/cached demo data/i);
  });
});
