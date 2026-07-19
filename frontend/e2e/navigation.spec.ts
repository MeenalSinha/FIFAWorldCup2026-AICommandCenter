import { test, expect } from "@playwright/test";

test.describe("primary navigation", () => {
  test("sidebar links navigate to every dashboard section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /stadium command center/i })).toBeVisible();

    const sections: Array<[string, string | RegExp]> = [
      ["Live Map", /live map/i],
      ["Crowd & Safety", /crowd & safety/i],
      ["Operations", /operations/i],
      ["Transportation", /transportation/i],
      ["Volunteers", /volunteer/i],
      ["Accessibility", /accessibility/i],
      ["Sustainability", /sustainability/i],
      ["AI Assistant", /ai assistant/i],
      ["Reports", /reports/i],
      ["Settings", /settings/i],
    ];

    for (const [link, heading] of sections) {
      await page.getByRole("link", { name: link, exact: true }).click();
      await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    }
  });

  test("active nav link reflects current page via aria-current", async ({ page }) => {
    await page.goto("/operations");
    const activeLink = page.getByRole("link", { name: "Operations", exact: true });
    await expect(activeLink).toHaveAttribute("aria-current", "page");
  });
});
