# Security Guide

## Identity & access

- OAuth2 password-bearer flow issuing JWTs (`app/core/security.py`).
- RBAC hierarchy: fan < volunteer < staff < security < operations_manager
  < administrator, enforced per-route via `require_role()`.
- Production wraps Identity Platform / Firebase Auth behind the same
  `get_current_user` dependency -- no route code changes needed.

## Secrets

- Zero hardcoded secrets. All credentials are read once in
  `app/core/config.py` from environment variables, which in production
  are populated from Secret Manager (`--set-secrets` on Cloud Run).
- `.env.example` / `.env.local.example` document required variables
  without committing real values.

## Transport & headers

- HTTPS terminated at Cloud Run.
- `SecurityHeadersMiddleware` sets `X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, and HSTS on every response.
- CORS restricted to `ALLOWED_ORIGINS`.

## Input validation & rate limiting

- Every request body is a Pydantic model with length/type constraints
  (`app/models/schemas.py`).
- `slowapi` rate limiting is applied per-endpoint based on sensitivity:
  `/health` (30/min), `/auth/token` (10/min, brute-force protection),
  `/fan-experience/ask` (20/min, protects the Gemini call path),
  `/incident-response/report` (30/min), `/lost-found/search` (20/min).
  Exceeding the limit returns `429` through the same consistent error
  envelope described below.

## Consistent error handling

`app/core/errors.py` registers three handlers on the FastAPI app so
every error -- validation failure, HTTP error (401/403/404/429),
or an unhandled exception -- returns the same JSON shape:

```json
{ "error": { "code": "validation_error", "message": "...", "request_id": "..." } }
```

Unhandled exceptions are logged with full detail (via Cloud Logging in
production) but the client only ever receives a generic message plus a
`request_id` for support correlation, so internals are never leaked in
a stack trace. This is registered against Starlette's base
`HTTPException` (not FastAPI's subclass) so it also catches route-level
404s, which are raised before FastAPI's routing layer is involved --
verified with a live `curl` against an unmatched route as part of this
build.

## Prompt-injection protection

- `sanitize_prompt_input()` strips/flags known injection markers before
  any user text reaches an LLM.
- Structurally, user text is only ever passed as delimited "DATA" in the
  prompt sent to Gemini; the behavioral instruction is always authored
  by our own code (`system_instruction` on each agent), never by user
  input -- see `gemini_service.generate()`.
- Gemini safety filters (`SAFETY_SETTINGS`) block medium-and-above
  harassment, hate speech, sexual, and dangerous content categories.

## Audit logging

- `app/core/logging.py` emits structured JSON audit events (login,
  websocket connects, startup) that Cloud Run forwards automatically to
  Cloud Logging, with a documented path to a BigQuery sink for
  long-term audit retention.

## OWASP alignment

Addressed directly in this codebase: broken access control (RBAC),
injection (Pydantic validation + prompt sanitization), identification &
auth failures (JWT expiry, bearer scheme), security misconfiguration
(security headers middleware, explicit CORS allowlist), and vulnerable
components (see below).

CSRF is not applicable in the traditional sense: the API is a stateless
bearer-token service with no cookie-based session, so there's no
ambient credential for a cross-site request to ride along on. XSS
protection relies on React/Next.js's default output escaping on the
frontend and this API never returning HTML; the `X-Content-Type-Options:
nosniff` header additionally blocks MIME-sniffing attacks.

## Dependency vulnerability scanning

Run for real as part of this project's audit history, not assumed:

```bash
# Backend
pip install pip-audit
pip-audit -r backend/requirements.txt

# Frontend
cd frontend && npm audit
```

**Backend**: `pip-audit` found 24 known CVEs across 6 pinned packages
(`python-jose`, `starlette`, `python-multipart`, `python-dotenv`,
`pytest`, and a transitive `ecdsa`). Fixed by bumping to patched
versions (`python-jose[cryptography]==3.5.0`, `starlette==1.3.1`,
`python-multipart==0.0.31`, `python-dotenv==1.2.2`, `pytest==9.0.3`),
re-verified with the full test suite passing on the new versions. One
finding remains: `ecdsa` has no fix version upstream (a known,
documented pure-Python timing side-channel the maintainers have
declined to patch) and doesn't apply to this app's actual JWT usage
(HS256, not ECDSA).

**Frontend**: `npm audit` found 10 vulnerabilities (1 critical, 5 high,
4 moderate), the most serious being multiple Next.js advisories (DoS,
request smuggling, cache poisoning) only patched from Next 16.2.10
onward. Fixed by upgrading Next.js 14 -> 16.2.10, which cascaded into
ESLint 8 -> 9 (Next 16's lint tooling requires it) and a migration from
`.eslintrc.json` to ESLint 9's flat config format, plus a `postcss`
override to force the patched version inside Next's own bundled copy.
Re-verified: full production build succeeds, all 10 frontend unit tests
pass, and `npm audit` now reports **0 vulnerabilities**.
