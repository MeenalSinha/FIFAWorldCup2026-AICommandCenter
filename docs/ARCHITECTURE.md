# Architecture

## System overview

The platform is an "AI Operating System for Smart Stadiums": a set of
agentic AI modules sitting on top of live operational data, exposed
through a single FastAPI backend and consumed by a Next.js dashboard.
The chatbot (AI Assistant) is one surface among many -- most of the
intelligence runs continuously in the background (predictions,
recommendations, automated routing) rather than waiting for a user to
ask a question.

```
                        ┌─────────────────────────────┐
                        │        Fans / Staff /       │
                        │   Volunteers / Organizers    │
                        └───────────────┬──────────────┘
                                        │ HTTPS / WSS
                        ┌───────────────▼──────────────┐
                        │   Next.js Frontend (Cloud Run)│
                        │  Dashboard, Live Map, Chat UI  │
                        └───────────────┬──────────────┘
                                        │ REST + WebSocket
                        ┌───────────────▼──────────────┐
                        │  FastAPI Backend (Cloud Run)  │
                        │  Routers -> Agents -> Services │
                        └───┬───────┬───────┬───────┬───┘
                            │       │       │       │
                  ┌─────────▼─┐ ┌───▼───┐ ┌─▼─────┐ ┌▼──────────┐
                  │ Gemini /  │ │ Maps  │ │Firestore│ │ BigQuery  │
                  │ Vertex AI │ │Platform│ │        │ │           │
                  └───────────┘ └───────┘ └────────┘ └───────────┘
                            │
                  ┌─────────▼─────────┐
                  │  Pub/Sub (agent-to-│
                  │  agent event bus)  │
                  └────────────────────┘
```

## Agent layer

Each AI module in `backend/app/agents/` is a small class with domain
methods (not a fixed interface) that call a shared `think()` helper.
`think()` sends a system instruction authored by our code plus
sanitized user data to `app/services/gemini_service.py`, which either:

- calls live Gemini (Vertex AI-shaped SDK usage), when `DEMO_MODE=false`
  and a `GOOGLE_API_KEY` is configured, or
- returns deterministic, realistic mock reasoning, so the entire
  platform is fully functional offline for development and judging.

Agents:

| Agent | File | Responsibility |
|---|---|---|
| Fan Experience | `fan_experience_agent.py` | Navigation, FAQs, schedules, multilingual Q&A |
| Stadium Operations | `stadium_ops_agent.py` | Crowd density, gate congestion, queue analysis |
| Volunteer Copilot | `volunteer_agent.py` | Procedures, incident triage, task prioritization |
| Accessibility AI | `accessibility_agent.py` | Wheelchair routing, audio description, sign language |
| Sustainability AI | `sustainability_agent.py` | Energy/waste/water tracking, greener suggestions |
| Transportation AI | `transportation_agent.py` | Transit/parking/pedestrian congestion prediction |
| Incident Response AI | `incident_agent.py` | SOPs, checklists, action plans, Pub/Sub fan-out |
| Operations Intelligence | `ops_intelligence_agent.py` | Executive summaries, AI operations timeline |

## Data flow (predictive insight example)

1. Sensor/queue feed (simulated in demo mode, real telemetry in
   production) updates gate occupancy.
2. `StadiumOperationsAgent.reason()` compares current trend against
   safe-capacity thresholds and asks Gemini for a recommended action.
3. The insight is surfaced on the Organizer Dashboard and pushed to all
   connected clients over `/ws/live`.
4. If severity crosses a threshold, `IncidentResponseAgent` publishes to
   Pub/Sub, which fans out to the Volunteer Copilot (dispatch) and the
   Operations Intelligence agent (timeline entry).

## Deployment diagram

Both services are stateless containers deployed independently to Cloud
Run, so they scale to zero between matches and burst independently
during peak ingress. Firestore holds live mutable state; BigQuery holds
historical KPI data queried by the Organizer Dashboard and daily
reports; Secret Manager holds all credentials (see `SECURITY.md`).

## Security architecture

See `SECURITY.md` for the full model. In short: OAuth2 bearer tokens +
RBAC at the API layer, secrets only ever read from Secret Manager /
environment (never hardcoded), and a prompt-injection boundary between
user text and LLM instructions enforced in `gemini_service.py`.
