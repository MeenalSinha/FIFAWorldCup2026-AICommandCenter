"""
Incident Response AI -- coordinates medical events, crowd panic, weather
and security incidents using LLM reasoning; generates SOPs, checklists
and action plans.
"""

from typing import Any

from app.agents.base_agent import BaseAgent
from app.core.config import get_settings
from app.services import pubsub_service

settings = get_settings()


class IncidentResponseAgent(BaseAgent):
    name = "incident_response_agent"
    system_instruction = (
        "You are the Incident Response AI. Given an incident type and "
        "description, produce: (1) an immediate action checklist, (2) roles "
        "to notify, (3) a short SOP reference. Be direct and operational."
    )

    async def reason(
        self, incident_type: str, description: str, location: str
    ) -> dict[str, Any]:
        context = {"topic": f"{incident_type} incident at {location}"}
        plan = await self.think(
            f"Incident type: {incident_type}. Description: {description}. Location: {location}.",
            context,
        )
        event = {
            "incident_type": incident_type,
            "description": description,
            "location": location,
            "plan": plan,
        }
        await pubsub_service.publish(settings.pubsub_topic_incidents, event)
        return event
