import pytest


@pytest.mark.asyncio
async def test_validation_error_returns_consistent_shape(client):
    # Missing required "question" field
    response = await client.post("/api/v1/fan-experience/ask", json={"language": "en"})
    assert response.status_code == 422
    body = response.json()
    assert body["error"]["code"] == "validation_error"
    assert "request_id" in body["error"]


@pytest.mark.asyncio
async def test_not_found_returns_consistent_shape(client):
    response = await client.get("/api/v1/does-not-exist")
    assert response.status_code == 404
    body = response.json()
    assert body["error"]["code"] == "http_404"
    assert "request_id" in body["error"]


@pytest.mark.asyncio
async def test_login_rate_limit_engages(client):
    # 10/minute is the configured limit on /auth/token; the 11th rapid
    # request in the same minute should be rejected with 429.
    last_status = None
    for _ in range(11):
        response = await client.post(
            "/api/v1/auth/token", data={"username": "judge", "password": "x"}
        )
        last_status = response.status_code
    assert last_status == 429
