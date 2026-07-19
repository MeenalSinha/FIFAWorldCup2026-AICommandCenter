"""
Centralized exception handling so every error response -- validation
failure, unhandled exception, HTTP error -- comes back in one
consistent shape the frontend can rely on:

    { "error": { "code": "...", "message": "...", "request_id": "..." } }

Registered once in app/main.py via `register_exception_handlers(app)`.
"""

import logging
import uuid

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

logger = logging.getLogger("errors")

# Literal code instead of starlette.status's constant: the constant's name
# changed across starlette versions (HTTP_422_UNPROCESSABLE_ENTITY ->
# HTTP_422_UNPROCESSABLE_CONTENT), so pinning the number avoids a
# deprecation warning regardless of which version is installed.
HTTP_422 = 422


def _error_body(code: str, message: str, request_id: str) -> dict:
    """

    :param code: str: 
    :param message: str: 
    :param request_id: str: 

    """
    return {"error": {"code": code, "message": message, "request_id": request_id}}


async def validation_exception_handler(
    request: Request, exc: RequestValidationError
) -> JSONResponse:
    request_id = str(uuid.uuid4())
    logger.warning(
        "validation_error request_id=%s path=%s errors=%s",
        request_id,
        request.url.path,
        exc.errors(),
    )
    return JSONResponse(
        status_code=HTTP_422,
        content=_error_body(
            "validation_error", "One or more fields failed validation.", request_id
        ),
    )


async def http_exception_handler(
    request: Request, exc: StarletteHTTPException
) -> JSONResponse:
    request_id = str(uuid.uuid4())
    return JSONResponse(
        status_code=exc.status_code,
        content=_error_body(f"http_{exc.status_code}", str(exc.detail), request_id),
        headers=exc.headers,
    )


async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    request_id = str(uuid.uuid4())
    # Full detail goes to Cloud Logging; the client only ever sees a
    # generic message + request_id so internals are never leaked.
    logger.error(
        "unhandled_exception request_id=%s path=%s",
        request_id,
        request.url.path,
        exc_info=exc,
    )
    return JSONResponse(
        status_code=500,
        content=_error_body(
            "internal_error", "Something went wrong. Please try again.", request_id
        ),
    )


def register_exception_handlers(app: FastAPI) -> None:
    """

    :param app: FastAPI: 

    """
    app.add_exception_handler(RequestValidationError, validation_exception_handler)
    app.add_exception_handler(StarletteHTTPException, http_exception_handler)
    app.add_exception_handler(Exception, unhandled_exception_handler)
