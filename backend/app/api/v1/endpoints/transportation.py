from fastapi import APIRouter, Depends

from app.agents.transportation_agent import TransportationAgent
from app.core.security import get_current_user

router = APIRouter()
agent = TransportationAgent()


@router.get("/overview")
async def overview(user=Depends(get_current_user)):
    return await agent.reason()
