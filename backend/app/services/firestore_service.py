"""
Firestore-backed live state store.

Demo mode uses an in-process dict as a stand-in for Firestore documents
so live dashboard updates work without any GCP project configured. The
public function signatures match google-cloud-firestore usage 1:1, so
switching to real Firestore is a matter of implementing the same
interface against `firestore.AsyncClient()`.
"""

import asyncio
from typing import Any

from app.core.config import get_settings

settings = get_settings()

_store: dict[str, dict[str, Any]] = {}
_lock = asyncio.Lock()


async def set_document(collection: str, doc_id: str, data: dict) -> None:
    async with _lock:
        _store.setdefault(collection, {})[doc_id] = data


async def get_document(collection: str, doc_id: str) -> dict | None:
    return _store.get(collection, {}).get(doc_id)


async def list_collection(collection: str) -> list[dict]:
    return list(_store.get(collection, {}).values())
