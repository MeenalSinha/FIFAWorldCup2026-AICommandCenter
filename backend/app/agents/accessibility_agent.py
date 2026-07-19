"""
Accessibility AI -- visually impaired, hearing impaired, wheelchair
users, elderly visitors. Voice navigation, route optimization, audio
descriptions, sign-language video generation, personalized assistance.
"""

from typing import Any

from app.agents.base_agent import BaseAgent
from app.services import maps_service, speech_service


class AccessibilityAgent(BaseAgent):
    name = "accessibility_agent"
    system_instruction = (
        "You are the Accessibility AI. Provide clear, dignified assistance "
        "for visitors who are visually impaired, hearing impaired, use a "
        "wheelchair, or are elderly. Prefer concrete step-by-step guidance."
    )

    async def wheelchair_route(self, origin: str, destination: str) -> dict[str, Any]:
        return await maps_service.get_route(origin, destination, "wheelchair")  # type: ignore[arg-type]

    async def audio_description(self, scene: str) -> dict[str, Any]:
        context = {"topic": "audio description"}
        description = await self.think(
            f"Provide a concise audio description of: {scene}", context
        )
        audio = await speech_service.text_to_speech(description)
        return {
            "scene": scene,
            "description": description,
            "audio_url": audio["audio_url"],
        }

    async def sign_language_clip(self, message: str) -> dict[str, Any]:
        return await speech_service.generate_sign_language_video(message)
