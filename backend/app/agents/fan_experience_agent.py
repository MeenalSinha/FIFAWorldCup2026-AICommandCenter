"""
Fan Experience Agent -- navigation, FAQs, schedules, ticket help,
multilingual assistance, personalized recommendations.
"""

from typing import Any

from app.agents.base_agent import BaseAgent
from app.data import seed_data
from app.services import maps_service, translation_service


class FanExperienceAgent(BaseAgent):
    name = "fan_experience_agent"
    system_instruction = (
        "You are the Fan Experience Agent for a FIFA World Cup stadium. "
        "Answer fan questions about navigation, schedules, tickets and "
        "amenities in a friendly, concise tone. Only use the stadium data "
        "provided as context; never invent gate numbers or times."
    )

    async def reason(self, question: str, language: str = "en") -> dict[str, Any]:
        context = {"topic": "fan assistance", "stadium": seed_data.STADIUM}
        answer = await self.think(question, context)
        translated = await translation_service.translate(answer, language)
        return {
            "question": question,
            "answer": translated["translated_text"],
            "language": translated["target_language"],
            "match": seed_data.STADIUM["match"],
        }

    async def recommend_route(
        self, origin: str, destination: str, profile: str = "fastest"
    ) -> dict[str, Any]:
        return await maps_service.get_route(origin, destination, profile)  # type: ignore[arg-type]
