import json

import pytest
from starlette.requests import Request

from app.core.errors import unhandled_exception_handler


def _fake_request(path: str = "/api/v1/whatever") -> Request:
    scope = {"type": "http", "method": "GET", "path": path, "headers": []}
    return Request(scope)


@pytest.mark.asyncio
async def test_unhandled_exception_handler_hides_internals_but_logs_request_id():
    request = _fake_request()
    response = await unhandled_exception_handler(request, RuntimeError("some internal detail"))
    assert response.status_code == 500
    body = json.loads(response.body)
    assert body["error"]["code"] == "internal_error"
    assert "some internal detail" not in body["error"]["message"]
    assert "request_id" in body["error"]
