from fastapi import APIRouter, Depends

from app.agents.sustainability_agent import SustainabilityAgent
from app.core.security import get_current_user

router = APIRouter()
agent = SustainabilityAgent()


@router.get("/dashboard")
async def dashboard(user=Depends(get_current_user)):
    return await agent.reason()
