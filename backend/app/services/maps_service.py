"""
Google Maps Platform wrapper (Directions API, Routes API, Places API).

In demo mode returns realistic mock routes for MetLife Stadium so the
Smart Navigation and Transportation modules render without a billed
Maps API key. Swap in `googlemaps` client calls once
GOOGLE_MAPS_API_KEY is set (see docs/DEPLOYMENT.md).
"""

from typing import Literal

from app.core.config import get_settings

settings = get_settings()

RouteProfile = Literal["fastest", "safest", "least_crowded", "wheelchair", "family"]

_MOCK_STADIUM_CENTER = {"lat": 40.8135, "lng": -74.0745}


async def get_route(
    origin: str, destination: str, profile: RouteProfile = "fastest"
) -> dict:
    if settings.google_maps_api_key and not settings.demo_mode:
        # Production path: call Routes API / Directions API here with
        # googlemaps.Client(key=settings.google_maps_api_key).directions(...)
        pass

    profile_notes = {
        "fastest": "Shortest walking distance, may include stairs.",
        "safest": "Avoids current high-density zones near Gate C.",
        "least_crowded": "Routed around Gate C congestion via the east concourse.",
        "wheelchair": "Step-free path using ramps and the east concourse elevator.",
        "family": "Wider concourse path with rest points, avoids stairs.",
    }
    return {
        "origin": origin,
        "destination": destination,
        "profile": profile,
        "distance_meters": 320,
        "duration_seconds": 260,
        "notes": profile_notes.get(profile, ""),
        "polyline_hint": _MOCK_STADIUM_CENTER,
    }


async def get_place_suggestions(query: str) -> list[dict]:
    catalog = [
        {"name": "Gate A", "category": "entry_gate"},
        {"name": "Gate B", "category": "entry_gate"},
        {"name": "Food Stall 12", "category": "concession"},
        {"name": "Accessible Restroom - East Concourse", "category": "restroom"},
        {"name": "Parking Lot D", "category": "parking"},
    ]
    q = query.lower()
    return [c for c in catalog if q in c["name"].lower()] or catalog[:3]
