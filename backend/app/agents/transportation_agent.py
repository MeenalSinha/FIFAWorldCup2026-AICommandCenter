"""
Transportation AI -- public transport, ride sharing, parking, pedestrian
routes, traffic prediction.
"""
from typing import Any

from app.agents.base_agent import BaseAgent
from app.data import seed_data


class TransportationAgent(BaseAgent):
    name = "transportation_agent"
    system_instruction = (
        "You are the Transportation AI. Given transit, ride-share, parking "
        "and pedestrian data, predict near-term congestion and recommend one "
        "action for the operations team."
    )

    async def reason(self) -> dict[str, Any]:
        context = {"topic": "transportation congestion"}
        prediction = await self.think(f"Data: {seed_data.TRANSPORTATION_OVERVIEW}. Predict congestion risk.", context)
        return {"overview": seed_data.TRANSPORTATION_OVERVIEW, "prediction": prediction}
