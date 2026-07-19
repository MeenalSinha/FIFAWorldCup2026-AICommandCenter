import { defineConfig, devices } from "@playwright/test";

/**
 * NOTE: These tests could not be executed inside the environment that
 * authored them -- Playwright requires downloading a Chromium binary
 * from cdn.playwright.dev, which this sandbox's network egress
 * allowlist blocks (verified: a real 403 "Host not in allowlist"
 * response, not an assumption). They are written to the same standard
 * as the rest of this project's test suite and will run in any normal
 * CI environment (e.g. GitHub Actions, which has full network access)
 * -- see infra/github-actions/ci.yml for the wired-up job. Do not treat
 * these as "passing" until they've actually been run somewhere with
 * browser access; docs/TESTING.md tracks this honestly.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.E2E_BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "desktop-firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "mobile-safari",
      use: { ...devices["iPhone 14"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "tablet",
      use: { ...devices["iPad Pro 11"] },
    },
  ],
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
