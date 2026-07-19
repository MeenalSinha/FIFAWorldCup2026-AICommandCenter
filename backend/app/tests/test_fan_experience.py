import pytest


@pytest.mark.asyncio
async def test_ask(client):
    response = await client.post(
        "/api/v1/fan-experience/ask",
        json={"question": "Where is Gate A?", "language": "en"},
    )
    assert response.status_code == 200
    body = response.json()
    assert "answer" in body


@pytest.mark.asyncio
async def test_route(client):
    response = await client.post(
        "/api/v1/fan-experience/route",
        json={"origin": "Gate A", "destination": "Section 114", "profile": "fastest"},
    )
    assert response.status_code == 200
    assert response.json()["profile"] == "fastest"
