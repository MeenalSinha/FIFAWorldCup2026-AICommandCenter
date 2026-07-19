import pytest
from fastapi import HTTPException

from app.core import security


def test_decode_access_token_rejects_garbage_token():
    with pytest.raises(HTTPException) as exc_info:
        security.decode_access_token("not-a-real-jwt")
    assert exc_info.value.status_code == 401


@pytest.mark.asyncio
async def test_get_current_user_requires_auth_when_demo_mode_off(monkeypatch):
    monkeypatch.setattr(security.settings, "demo_mode", False)
    with pytest.raises(HTTPException) as exc_info:
        await security.get_current_user(token=None)
    assert exc_info.value.status_code == 401


@pytest.mark.asyncio
async def test_require_role_rejects_insufficient_role():
    checker = security.require_role("administrator")
    low_privilege_user = security.TokenData(sub="fan-user", role="fan")
    with pytest.raises(HTTPException) as exc_info:
        checker(user=low_privilege_user)
    assert exc_info.value.status_code == 403


def test_sanitize_prompt_input_handles_empty_string():
    assert security.sanitize_prompt_input("") == ""
