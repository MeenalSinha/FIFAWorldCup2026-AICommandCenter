from fastapi import APIRouter, Depends

from app.agents.volunteer_agent import VolunteerAgent
from app.core.security import get_current_user, require_role
from app.models.schemas import VolunteerIncidentRequest, VolunteerProcedureRequest

router = APIRouter()
agent = VolunteerAgent()


@router.post("/procedure")
async def procedure(payload: VolunteerProcedureRequest, user=Depends(get_current_user)):
    return await agent.get_procedure(payload.situation)


@router.get("/tasks")
async def tasks(user=Depends(require_role("volunteer"))):
    return await agent.prioritized_tasks()


@router.post("/incident-report")
async def incident_report(payload: VolunteerIncidentRequest, user=Depends(require_role("volunteer"))):
    return await agent.report_incident(payload.description, payload.location)
