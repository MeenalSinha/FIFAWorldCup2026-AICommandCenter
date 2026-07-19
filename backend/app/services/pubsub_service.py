"""
Pub/Sub wrapper coordinating agent-to-agent events (e.g. an Incident
Response Agent publishing to a topic that the Volunteer Copilot and
Operations Intelligence agents subscribe to). Demo mode fans events out
directly to the in-process WebSocket manager instead of a real topic.
"""

from collections.abc import Awaitable, Callable
from typing import Any

_subscribers: dict[str, list[Callable[[dict], Awaitable[None]]]] = {}


def subscribe(topic: str, handler: Callable[[dict], Awaitable[None]]) -> None:
    _subscribers.setdefault(topic, []).append(handler)


async def publish(topic: str, message: dict[str, Any]) -> None:
    for handler in _subscribers.get(topic, []):
        await handler(message)
