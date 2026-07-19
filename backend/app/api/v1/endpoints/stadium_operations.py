from fastapi import APIRouter, Depends

from app.agents.stadium_ops_agent import StadiumOperationsAgent
from app.core.security import get_current_user

router = APIRouter()
agent = StadiumOperationsAgent()


@router.get("/overview")
async def overview(user=Depends(get_current_user)):
    return await agent.reason()


@router.get("/predictions")
async def predictions(user=Depends(get_current_user)):
    return await agent.predictions()
