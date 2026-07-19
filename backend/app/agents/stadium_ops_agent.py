"""
Stadium Operations Agent -- crowd density, gate congestion, restroom
occupancy and concession queues, with recommended actions.
"""

from typing import Any

from app.agents.base_agent import BaseAgent
from app.data import seed_data


class StadiumOperationsAgent(BaseAgent):
    name = "stadium_operations_agent"
    system_instruction = (
        "You are the Stadium Operations Agent. Analyze crowd density, gate "
        "congestion, restroom occupancy and concession queues, and recommend "
        "one concrete, prioritized operational action."
    )

    async def reason(self) -> dict[str, Any]:
        busiest = max(seed_data.GATES, key=lambda g: g["occupancy_pct"])
        context = {"topic": f"congestion at {busiest['name']}"}
        recommendation = await self.think(
            f"Gate occupancy snapshot: {seed_data.GATES}. Recommend an action for the busiest gate.",
            context,
        )
        return {
            "gates": seed_data.GATES,
            "operations_overview": seed_data.OPERATIONS_OVERVIEW,
            "priority_gate": busiest,
            "recommendation": recommendation,
        }

    async def predictions(self) -> dict[str, Any]:
        return {"predictions": seed_data.AI_INSIGHTS}
