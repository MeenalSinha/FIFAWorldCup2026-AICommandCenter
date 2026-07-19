import pytest


@pytest.mark.asyncio
async def test_incident_report(client):
    response = await client.post(
        "/api/v1/incident-response/report",
        json={"incident_type": "medical", "description": "Fan feeling faint in section 112", "location": "Section 112"},
    )
    assert response.status_code == 200
    assert "plan" in response.json()
