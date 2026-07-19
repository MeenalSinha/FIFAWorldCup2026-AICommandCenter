from fastapi import APIRouter, Depends

from app.agents.accessibility_agent import AccessibilityAgent
from app.core.security import get_current_user
from app.models.schemas import AudioDescriptionRequest, RouteRequest, SignLanguageRequest

router = APIRouter()
agent = AccessibilityAgent()


@router.post("/wheelchair-route")
async def wheelchair_route(payload: RouteRequest, user=Depends(get_current_user)):
    return await agent.wheelchair_route(payload.origin, payload.destination)


@router.post("/audio-description")
async def audio_description(payload: AudioDescriptionRequest, user=Depends(get_current_user)):
    return await agent.audio_description(payload.scene)


@router.post("/sign-language")
async def sign_language(payload: SignLanguageRequest, user=Depends(get_current_user)):
    return await agent.sign_language_clip(payload.message)
