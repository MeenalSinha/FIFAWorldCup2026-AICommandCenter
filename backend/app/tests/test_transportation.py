import pytest


@pytest.mark.asyncio
async def test_transportation_overview(client):
    response = await client.get("/api/v1/transportation/overview")
    assert response.status_code == 200
    body = response.json()
    assert "overview" in body
    assert "prediction" in body
    assert "public_transit" in body["overview"]
