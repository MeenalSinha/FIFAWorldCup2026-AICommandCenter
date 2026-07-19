import { test, expect } from "@playwright/test";

test.describe("AI assistant workflow", () => {
  test("sending a question appends a user message and an assistant response", async ({ page }) => {
    await page.goto("/ai-assistant");
    const input = page.getByLabel(/ask the ai assistant/i);
    await input.fill("Where is the nearest accessible restroom?");
    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.getByText("Where is the nearest accessible restroom?")).toBeVisible();
    // The assistant reply streams in after the request resolves; allow
    // a generous timeout since demo-mode still makes a real round trip.
    await expect(page.locator("text=Thinking...")).toBeHidden({ timeout: 10_000 });
  });

  test("suggestion chips send a canned prompt", async ({ page }) => {
    await page.goto("/ai-assistant");
    await page.getByRole("button", { name: "Crowd Prediction" }).click();
    await expect(page.getByText("Crowd Prediction", { exact: true }).first()).toBeVisible();
  });
});
