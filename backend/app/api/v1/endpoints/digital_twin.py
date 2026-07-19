from fastapi import APIRouter, Depends

from app.core.security import get_current_user
from app.data import seed_data

router = APIRouter()


@router.get("/state")
async def state(user=Depends(get_current_user)):
    return {
        "stadium": seed_data.STADIUM,
        "gates": seed_data.GATES,
        "insights": seed_data.AI_INSIGHTS,
        "operations": seed_data.OPERATIONS_OVERVIEW,
        "sustainability": seed_data.SUSTAINABILITY,
        "transportation": seed_data.TRANSPORTATION_OVERVIEW,
    }
