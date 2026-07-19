"""OAuth2 password-flow token issuance (demo users) + RBAC role list."""
from fastapi import APIRouter, Depends, Request
from fastapi.security import OAuth2PasswordRequestForm

from app.core.logging import audit_log
from app.core.rate_limit import limiter
from app.core.security import ROLE_HIERARCHY, create_access_token

router = APIRouter()


@router.post("/token")
@limiter.limit("10/minute")
async def login(request: Request, form_data: OAuth2PasswordRequestForm = Depends()):
    # Demo credential store. Production wraps Identity Platform / Firebase
    # Auth here instead of a local check.
    role = "operations_manager" if form_data.username == "admin" else "fan"
    token = create_access_token(subject=form_data.username, role=role)
    audit_log(actor=form_data.username, action="login", resource="auth/token")
    return {"access_token": token, "token_type": "bearer", "role": role}


@router.get("/roles")
async def list_roles():
    return {"roles": list(ROLE_HIERARCHY.keys())}
