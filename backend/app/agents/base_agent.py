"""
Shared base class for every agentic module.

Each concrete agent implements `reason()`, which combines live
operational data with a Gemini call to produce a natural-language
recommendation, not just raw numbers -- this is what makes the platform
"agentic" rather than a static dashboard: agents reason over state and
propose or take action.
"""
from typing import Any

from app.services import gemini_service


class BaseAgent:
    """Base class for every agentic module.

    Concrete agents expose one or more domain-specific public methods
    (e.g. `reason()`, `get_procedure()`, `daily_report()`) that call
    `self.think()` to combine live operational data with a Gemini
    reasoning step. There is deliberately no single required method
    name -- each agent's public surface reflects the actions it can
    actually take, documented per-agent and in docs/AI_DESIGN.md.
    """

    name: str = "base_agent"
    system_instruction: str = "You are a helpful stadium operations assistant."

    async def think(self, prompt: str, context: dict[str, Any] | None = None) -> str:
        return await gemini_service.generate(
            prompt, system_instruction=self.system_instruction, context=context or {}
        )
