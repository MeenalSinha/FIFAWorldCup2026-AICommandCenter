/**
 * Lighthouse CI config. Requires a real Chromium binary -- blocked in
 * the sandbox that authored this project (see docs/AUDIT_EVIDENCE.md),
 * so this has not been executed here. It runs with a single command in
 * any environment with normal network access:
 *
 *   npm run build && npm run start &
 *   npx lhci autorun
 *
 * or via the `frontend-lighthouse` CI job in
 * infra/github-actions/ci.yml, which will produce the first real
 * results the moment this repo's CI runs.
 */
module.exports = {
  ci: {
    collect: {
      url: [
        "http://localhost:3000/",
        "http://localhost:3000/live-map",
        "http://localhost:3000/accessibility",
        "http://localhost:3000/ai-assistant",
        "http://localhost:3000/reports",
      ],
      startServerCommand: "npm run start",
      startServerReadyPattern: "Ready in",
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
        "categories:seo": ["warn", { minScore: 0.9 }],
        "first-contentful-paint": ["warn", { maxNumericValue: 2000 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "interactive": ["warn", { maxNumericValue: 3500 }],
        "total-blocking-time": ["warn", { maxNumericValue: 300 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
