import pytest


@pytest.mark.asyncio
async def test_sustainability_dashboard(client):
    response = await client.get("/api/v1/sustainability/dashboard")
    assert response.status_code == 200
    body = response.json()
    assert "metrics" in body
    assert "suggestion" in body
    assert body["metrics"]["green_score_pct"] >= 0
