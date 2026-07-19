import pytest


@pytest.mark.asyncio
async def test_overview(client):
    response = await client.get("/api/v1/stadium-operations/overview")
    assert response.status_code == 200
    body = response.json()
    assert "gates" in body
    assert "priority_gate" in body


@pytest.mark.asyncio
async def test_predictions(client):
    response = await client.get("/api/v1/stadium-operations/predictions")
    assert response.status_code == 200
    assert len(response.json()["predictions"]) > 0
