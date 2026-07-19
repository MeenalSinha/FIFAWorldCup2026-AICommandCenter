from fastapi import APIRouter, Depends

from app.agents.ops_intelligence_agent import OperationsIntelligenceAgent
from app.core.security import get_current_user, require_role
from app.models.schemas import TimelineEventRequest

router = APIRouter()
agent = OperationsIntelligenceAgent()


@router.get("/daily-report")
async def daily_report(user=Depends(require_role("operations_manager"))):
    return await agent.daily_report()


@router.post("/timeline-explanation")
async def timeline_explanation(payload: TimelineEventRequest, user=Depends(get_current_user)):
    return await agent.timeline_explanation(payload.event)
