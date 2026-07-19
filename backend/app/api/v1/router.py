"""Aggregates every domain router under /api/v1."""

from fastapi import APIRouter

from app.api.v1.endpoints import (
    accessibility,
    auth,
    digital_twin,
    fan_experience,
    incident_response,
    lost_found,
    operations_intelligence,
    stadium_operations,
    sustainability,
    transportation,
    volunteer_copilot,
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(
    fan_experience.router, prefix="/fan-experience", tags=["fan-experience"]
)
api_router.include_router(
    stadium_operations.router, prefix="/stadium-operations", tags=["stadium-operations"]
)
api_router.include_router(
    volunteer_copilot.router, prefix="/volunteer-copilot", tags=["volunteer-copilot"]
)
api_router.include_router(
    accessibility.router, prefix="/accessibility", tags=["accessibility"]
)
api_router.include_router(
    sustainability.router, prefix="/sustainability", tags=["sustainability"]
)
api_router.include_router(
    transportation.router, prefix="/transportation", tags=["transportation"]
)
api_router.include_router(
    incident_response.router, prefix="/incident-response", tags=["incident-response"]
)
api_router.include_router(
    operations_intelligence.router,
    prefix="/operations-intelligence",
    tags=["operations-intelligence"],
)
api_router.include_router(lost_found.router, prefix="/lost-found", tags=["lost-found"])
api_router.include_router(
    digital_twin.router, prefix="/digital-twin", tags=["digital-twin"]
)
