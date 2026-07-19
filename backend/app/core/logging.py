"""
Structured logging + audit trail.

In production this handler is swapped for the Cloud Logging client
(google-cloud-logging); locally / in demo mode it writes structured JSON
lines to stdout, which Cloud Run automatically ingests into Cloud
Logging without any extra code -- so the same code path is correct in
both environments.
"""

import json
import logging
import sys
import time
from typing import Any


class JsonFormatter(logging.Formatter):
    """ """
    def format(self, record: logging.LogRecord) -> str:
        """

        :param record: logging.LogRecord: 

        """
        payload: dict[str, Any] = {
            "timestamp": time.strftime(
                "%Y-%m-%dT%H:%M:%SZ", time.gmtime(record.created)
            ),
            "severity": record.levelname,
            "message": record.getMessage(),
            "logger": record.name,
        }
        if hasattr(record, "extra_fields"):
            payload.update(record.extra_fields)  # type: ignore[attr-defined]
        return json.dumps(payload)


def configure_logging() -> None:
    """ """
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(JsonFormatter())
    root = logging.getLogger()
    root.handlers = [handler]
    root.setLevel(logging.INFO)


def audit_log(
    actor: str, action: str, resource: str, outcome: str = "success", **extra: Any
) -> None:
    """Append-only audit trail entry (Cloud Logging sink -> BigQuery in prod).

    :param actor: str: 
    :param action: str: 
    :param resource: str: 
    :param outcome: str:  (Default value = "success")
    :param **extra: Any: 

    """
    logger = logging.getLogger("audit")
    record = logging.LogRecord(
        name="audit",
        level=logging.INFO,
        pathname="",
        lineno=0,
        msg="audit_event",
        args=(),
        exc_info=None,
    )
    record.extra_fields = {
        "actor": actor,
        "action": action,
        "resource": resource,
        "outcome": outcome,
        **extra,
    }
    logger.handle(record)
