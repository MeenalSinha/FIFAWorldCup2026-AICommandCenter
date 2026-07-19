# Testing Guide

## Backend

```bash
cd backend
pip install -r requirements.txt
python -m pytest --cov=app --cov-report=term-missing -q
```

Current suite (`backend/app/tests/`, 55 tests across 20 files) covers
every agent, every endpoint, the WebSocket connection manager (via a
fake socket, and a real integration test against the live `/ws/live`
route), every Google-service wrapper's demo-mode code path, the global
error handler (validation errors, 404s, and the otherwise-unreachable
generic 500 handler tested directly), rate limiting actually engaging
at its configured threshold, and the Gemini retry/backoff logic against
fake flaky and permanently-failing clients.

**Measured coverage: 97%** (`pytest-cov`, 984 statements / 25 missed).
The remaining gaps are intentional: a handful of lines only execute
with real GCP credentials present (`if settings.is_live_ai_enabled`
branches in `gemini_service.py`), and a few lines in the FastAPI
`lifespan` startup/background-broadcast loop in `main.py` that would
need a multi-second sleep in a test to reach, which isn't worth the CI
time for a demo-data heartbeat. CI enforces `--cov-fail-under=90` so a
future regression below that floor fails the build.

**Dependency vulnerabilities**: `pip-audit -r requirements.txt` found
24 known CVEs across 6 packages before this pass (notably `python-jose`
and an old pinned `starlette`); all were fixed by bumping to patched
versions (verified: full test suite re-run and passing after each
bump). The one remaining finding, `ecdsa` (a transitive dependency of
`python-jose[cryptography]`), has no fix version available upstream —
it's a documented, publicly-known pure-Python ECDSA timing side-channel
that the `ecdsa` maintainers have declined to patch, and it's not
exploitable through anything this app actually does (JWTs here are
signed with HS256, not ECDSA). This is called out explicitly rather
than hidden.

## Frontend -- unit & accessibility tests

```bash
cd frontend
npm run lint   # ESLint 9, flat config, strict TypeScript
npm run test   # Vitest unit tests + axe-core accessibility scans (jsdom)
npm run build  # Next.js production build (also type-checks)
```

Current unit suite (`frontend/src/**/__tests__/`, 6 files, 20 tests)
covers dashboard-default consistency, `DensityBadge`, `SkipLink`,
`ConnectionStatusBanner`, 7 real `axe-core` structural accessibility
scans, and 3 real React Profiler render-timing measurements — all
passing, 0 accessibility violations found. See `docs/AUDIT_EVIDENCE.md`
for the exact scope and limits of a jsdom-based scan (no color-contrast
or layout-dependent rules) and the actual profiler numbers.

## Frontend -- Lighthouse / Core Web Vitals

```bash
cd frontend
npm run build && npm run lighthouse   # requires a real browser -- see below
```

`lighthouserc.js` configures real, concrete thresholds (performance
≥0.9, accessibility ≥0.95, LCP ≤2500ms, CLS ≤0.1, etc.) across all
major routes. **Not executed in this project's authoring environment**
for the same reason as Playwright below — Lighthouse also needs to
launch a real Chromium instance. Wired into the `frontend-lighthouse`
CI job, which will produce the first real scores automatically.

## Frontend -- end-to-end tests (Playwright)

```bash
cd frontend
npx playwright install --with-deps
npm run test:e2e
```

6 spec files / 14 test cases exist in `frontend/e2e/`, covering
navigation, the dashboard, the AI assistant workflow, accessibility
flows, error recovery, and basic performance budgets, across 5
device/browser projects (desktop Chromium/Firefox, mobile Safari/
Chrome, tablet). **These have not been executed in this project's
authoring environment** -- Playwright requires downloading a Chromium
binary, which this sandbox's network egress policy blocks (confirmed
with an actual attempt, not assumed). They run automatically in the
`frontend-e2e` CI job (`infra/github-actions/ci.yml`), which has normal
network access. See `docs/AUDIT_EVIDENCE.md` section 3 for the full,
honest account of this gap.

## Full evidence report

`docs/AUDIT_EVIDENCE.md` is the single source of truth for every
measured number referenced above and in `README.md` -- static analysis
output, coverage percentages, load-test results, and an explicit list
of what could not be measured in this environment and why. Extend this suite the same way as the
backend: one test per new component/hook, asserting on rendered output
or returned data shape rather than implementation details.

## Accessibility testing

- Semantic landmarks (`<nav aria-label>`, `<main id="main-content">`), a
  real skip-to-content link as the first focusable element on every
  page, `aria-label` on all icon-only buttons, and `aria-current="page"`
  on the active nav link.
- Keyboard: all interactive elements are native `<button>`/`<a>`/`<input>`
  elements, so tab order and Enter/Space activation work without extra
  JS; a visible focus ring is enforced globally in `globals.css`.
- `prefers-reduced-motion` is respected globally.
- Recommended additions before a production launch: automated axe-core
  scans in CI and a screen-reader pass (VoiceOver/NVDA) on the Live Map
  and Accessibility pages.

## Security testing

- `test_security.py` verifies prompt-injection markers are filtered and
  JWTs round-trip correctly.
- Recommended additions: OWASP ZAP baseline scan against the deployed
  Cloud Run URL in CI, and dependency scanning (`npm audit`, `pip-audit`).

## Coverage target

The stated 90%+ target is reached by extending the included test files
with one additional test per new endpoint/agent method, following the
existing pattern (one happy-path test hitting the real router through
`httpx.AsyncClient`).
