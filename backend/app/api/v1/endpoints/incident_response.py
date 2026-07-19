from fastapi import APIRouter, Depends, Request

from app.agents.incident_agent import IncidentResponseAgent
from app.core.rate_limit import limiter
from app.core.security import require_role
from app.models.schemas import IncidentRequest

router = APIRouter()
agent = IncidentResponseAgent()


@router.post("/report")
@limiter.limit("30/minute")
async def report(request: Request, payload: IncidentRequest, user=Depends(require_role("staff"))):
    return await agent.reason(payload.incident_type, payload.description, payload.location)
