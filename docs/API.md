# API Reference

Base URL: `{backend_host}/api/v1`. Interactive OpenAPI docs are always
available at `/docs` (Swagger UI) and `/redoc`.

Auth: Bearer JWT via `POST /auth/token` (OAuth2 password flow). In
`DEMO_MODE=true` (default), unauthenticated requests are accepted as an
`operations_manager` demo user so the dashboard works without a login
screen during judging.

| Method | Path | Agent | Description |
|---|---|---|---|
| POST | `/auth/token` | - | Issue a demo JWT |
| GET | `/auth/roles` | - | List RBAC roles |
| POST | `/fan-experience/ask` | Fan Experience | Ask a natural-language question |
| POST | `/fan-experience/route` | Fan Experience | Get a route between two stadium points |
| GET | `/stadium-operations/overview` | Stadium Operations | Gate/queue snapshot + recommendation |
| GET | `/stadium-operations/predictions` | Stadium Operations | Active predictive insights |
| POST | `/volunteer-copilot/procedure` | Volunteer Copilot | Step-by-step procedure for a situation |
| GET | `/volunteer-copilot/tasks` | Volunteer Copilot | AI-prioritized volunteer task list |
| POST | `/volunteer-copilot/incident-report` | Volunteer Copilot | Submit + triage an incident |
| POST | `/accessibility/wheelchair-route` | Accessibility | Step-free routing |
| POST | `/accessibility/audio-description` | Accessibility | Generate an audio description |
| POST | `/accessibility/sign-language` | Accessibility | Generate a sign-language clip |
| GET | `/sustainability/dashboard` | Sustainability | Metrics + AI suggestion |
| GET | `/transportation/overview` | Transportation | Transit/parking/pedestrian status + prediction |
| POST | `/incident-response/report` | Incident Response | File an incident, get an SOP/action plan |
| GET | `/operations-intelligence/daily-report` | Operations Intelligence | Executive daily summary |
| POST | `/operations-intelligence/timeline-explanation` | Operations Intelligence | Explain a timeline event |
| GET | `/lost-found/items` | - | List reported lost & found items |
| POST | `/lost-found/search` | - | Natural-language lost & found search |
| GET | `/digital-twin/state` | - | Full snapshot powering the dashboard |
| WS | `/ws/live` | - | Live gate occupancy stream |

All request/response shapes are defined in `backend/app/models/schemas.py`
and enforced by Pydantic (see `TESTING.md` for coverage).
