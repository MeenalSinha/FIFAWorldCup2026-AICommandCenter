import pytest


@pytest.mark.asyncio
async def test_volunteer_procedure(client):
    response = await client.post(
        "/api/v1/volunteer-copilot/procedure", json={"situation": "lost child near Gate C"}
    )
    assert response.status_code == 200
    body = response.json()
    assert body["situation"] == "lost child near Gate C"
    assert len(body["procedure"]) > 0


@pytest.mark.asyncio
async def test_volunteer_tasks(client):
    response = await client.get("/api/v1/volunteer-copilot/tasks")
    assert response.status_code == 200
    volunteers = response.json()["volunteers"]
    assert len(volunteers) > 0
    # Prioritized: highest open-task count should be first.
    assert volunteers[0]["tasks_open"] >= volunteers[-1]["tasks_open"]


@pytest.mark.asyncio
async def test_volunteer_incident_report(client):
    response = await client.post(
        "/api/v1/volunteer-copilot/incident-report",
        json={"description": "Fan slipped near the east concourse", "location": "East Concourse"},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["location"] == "East Concourse"
    assert "triage_summary" in body
