# AI Design Document

## Why agentic, not chatbot-first

A chatbot answers when asked. This platform's agents *reason
continuously* over live operational state and either surface a
recommendation, dispatch a team, or reroute a request -- the chat
interface is just one more surface those same agents can be reached
through (see `AI_Assistant` calling `FanExperienceAgent.reason()`).

## Model usage

Every agent shares one call path: `BaseAgent.think()` ->
`gemini_service.generate()`. This keeps three properties true across
the whole platform, not just the chatbot:

1. **Consistent safety**: one place enforces prompt-injection defenses
   and Gemini safety filters.
2. **Consistent degrade path**: one place decides demo-mode vs. live
   Gemini, so a missing API key never crashes a feature -- it degrades
   to clearly-labeled deterministic mock reasoning.
3. **Consistent instrumentation**: one place to add latency/quality
   logging once real traffic starts.

## Where Gemini adds real reasoning (not decoration)

- **Stadium Operations**: turns a table of gate occupancy numbers into
  a prioritized, worded recommendation ("dispatch nearest team, notify
  operations manager") instead of just a red badge.
- **Incident Response**: turns a two-line incident description into a
  structured checklist + roles-to-notify + SOP reference, so a
  volunteer isn't left improvising.
- **Sustainability / Transportation**: turns raw metrics into one
  specific, actionable suggestion rather than a static dashboard.
- **Fan Experience / Accessibility**: natural-language Q&A, routing
  explanations, audio descriptions -- grounded in real stadium data
  passed as context, not invented facts.

## Predictive framing

Insights are phrased as forecasts with an ETA ("Gate C will exceed safe
capacity in 18 minutes") rather than a current-state alert, which is
the deliberate "predict before it happens" positioning requested in the
brief. In demo mode these are seeded values; in production they would
be produced by a lightweight trend model (e.g. linear projection over
the last N minutes of occupancy) feeding the same Gemini reasoning step
for the worded recommendation.

## Multilingual support

`translation_service.py` is called from `FanExperienceAgent.reason()`
so every fan answer can be returned in the requester's language; the
same pattern extends to the Volunteer Copilot and Emergency Copilot.
