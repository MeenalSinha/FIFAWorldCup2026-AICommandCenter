import pytest


@pytest.mark.asyncio
async def test_audio_description(client):
    response = await client.post(
        "/api/v1/accessibility/audio-description", json={"scene": "Main concourse near Gate A"}
    )
    assert response.status_code == 200
    body = response.json()
    assert "audio_url" in body
    assert "description" in body
