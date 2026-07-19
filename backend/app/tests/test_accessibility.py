import pytest


@pytest.mark.asyncio
async def test_wheelchair_route(client):
    response = await client.post(
        "/api/v1/accessibility/wheelchair-route",
        json={"origin": "Gate B", "destination": "Section 214", "profile": "wheelchair"},
    )
    assert response.status_code == 200
    assert response.json()["profile"] == "wheelchair"


@pytest.mark.asyncio
async def test_sign_language(client):
    response = await client.post("/api/v1/accessibility/sign-language", json={"message": "Evacuate calmly via Gate D"})
    assert response.status_code == 200
    assert "video_url" in response.json()
