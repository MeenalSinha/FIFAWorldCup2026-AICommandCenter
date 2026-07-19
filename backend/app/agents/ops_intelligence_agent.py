"""
Operations Intelligence -- executive dashboard summaries, risk forecasts,
recommendations, daily reports, AI Operations Timeline ("what happened,
why, and recommended next actions").
"""

from typing import Any

from app.agents.base_agent import BaseAgent
from app.data import seed_data


class OperationsIntelligenceAgent(BaseAgent):
    """ """
    name = "operations_intelligence_agent"
    system_instruction = (
        "You are the Operations Intelligence agent generating an executive "
        "summary for stadium organizers. Be concise, cite specific figures, "
        "and end with one clear recommendation."
    )

    async def daily_report(self) -> dict[str, Any]:
        context = {"topic": "daily operations report"}
        narrative = await self.think(
            f"KPIs: {seed_data.OPERATIONS_KPIS}. Summary seed: {seed_data.DAILY_SUMMARY}",
            context,
        )
        return {
            "kpis": seed_data.OPERATIONS_KPIS,
            "summary": seed_data.DAILY_SUMMARY,
            "narrative": narrative,
        }

    async def timeline_explanation(self, event: str) -> dict[str, Any]:
        context = {"topic": f"timeline event: {event}"}
        explanation = await self.think(
            f"Explain what happened, why, and next actions for: {event}", context
        )
        return {"event": event, "explanation": explanation}
