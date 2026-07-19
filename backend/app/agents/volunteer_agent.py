"""
Volunteer Copilot -- instant instructions, emergency procedures, lost
child workflows, translation, incident reporting, AI task prioritization.
"""
from typing import Any

from app.agents.base_agent import BaseAgent
from app.data import seed_data


class VolunteerAgent(BaseAgent):
    name = "volunteer_agent"
    system_instruction = (
        "You are the Volunteer Copilot. Give volunteers short, numbered, "
        "actionable instructions for the situation described. Prioritize "
        "safety and clarity over completeness."
    )

    async def get_procedure(self, situation: str) -> dict[str, Any]:
        context = {"topic": f"volunteer procedure for {situation}"}
        steps = await self.think(f"A volunteer needs a procedure for: {situation}", context)
        return {"situation": situation, "procedure": steps}

    async def prioritized_tasks(self) -> dict[str, Any]:
        ranked = sorted(seed_data.VOLUNTEERS, key=lambda v: v["tasks_open"], reverse=True)
        return {"volunteers": ranked}

    async def report_incident(self, description: str, location: str) -> dict[str, Any]:
        context = {"topic": f"incident report at {location}"}
        summary = await self.think(f"Summarize and triage this incident report: {description} at {location}", context)
        return {"description": description, "location": location, "triage_summary": summary}
