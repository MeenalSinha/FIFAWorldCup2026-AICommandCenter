import pytest


@pytest.mark.asyncio
async def test_daily_report(client):
    response = await client.get("/api/v1/operations-intelligence/daily-report")
    assert response.status_code == 200
    body = response.json()
    assert "kpis" in body
    assert "narrative" in body


@pytest.mark.asyncio
async def test_timeline_explanation(client):
    response = await client.post(
        "/api/v1/operations-intelligence/timeline-explanation",
        json={"event": "Gate C congestion at 18:42"},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["event"] == "Gate C congestion at 18:42"
    assert "explanation" in body
