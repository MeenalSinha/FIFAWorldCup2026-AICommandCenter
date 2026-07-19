from fastapi import APIRouter, Depends, Request

from app.agents.fan_experience_agent import FanExperienceAgent
from app.core.rate_limit import limiter
from app.core.security import get_current_user
from app.models.schemas import FanQuestionRequest, RouteRequest

router = APIRouter()
agent = FanExperienceAgent()


@router.post("/ask")
@limiter.limit("20/minute")
async def ask(request: Request, payload: FanQuestionRequest, user=Depends(get_current_user)):
    return await agent.reason(payload.question, payload.language)


@router.post("/route")
async def route(payload: RouteRequest, user=Depends(get_current_user)):
    return await agent.recommend_route(payload.origin, payload.destination, payload.profile)
