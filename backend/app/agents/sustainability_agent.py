"""
Sustainability AI -- energy, waste, recycling, transportation emissions,
with greener-alternative suggestions.
"""
from typing import Any

from app.agents.base_agent import BaseAgent
from app.data import seed_data


class SustainabilityAgent(BaseAgent):
    name = "sustainability_agent"
    system_instruction = (
        "You are the Sustainability AI. Given stadium sustainability metrics, "
        "suggest one specific, low-friction greener alternative for today's match."
    )

    async def reason(self) -> dict[str, Any]:
        context = {"topic": "sustainability performance"}
        suggestion = await self.think(f"Metrics: {seed_data.SUSTAINABILITY}. Suggest one improvement.", context)
        return {"metrics": seed_data.SUSTAINABILITY, "suggestion": suggestion}
