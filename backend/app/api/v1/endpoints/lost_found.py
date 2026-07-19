from fastapi import APIRouter, Depends, Request

from app.core.rate_limit import limiter
from app.core.security import get_current_user
from app.data import seed_data
from app.models.schemas import LostFoundQuery

router = APIRouter()


@router.get("/items")
async def items(user=Depends(get_current_user)):
    return {"items": seed_data.LOST_FOUND_ITEMS}


@router.post("/search")
@limiter.limit("20/minute")
async def search(
    request: Request, payload: LostFoundQuery, user=Depends(get_current_user)
):
    q = payload.query.lower()
    matches = [
        i
        for i in seed_data.LOST_FOUND_ITEMS
        if q in i["description"].lower() or q in i["location"].lower()
    ]
    return {"query": payload.query, "matches": matches}
