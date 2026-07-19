import pytest


@pytest.mark.asyncio
async def test_digital_twin_state(client):
    response = await client.get("/api/v1/digital-twin/state")
    assert response.status_code == 200
    body = response.json()
    for key in (
        "stadium",
        "gates",
        "insights",
        "operations",
        "sustainability",
        "transportation",
    ):
        assert key in body
