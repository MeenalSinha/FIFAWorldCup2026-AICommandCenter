import pytest

from app.services import bigquery_service, firestore_service, pubsub_service


@pytest.mark.asyncio
async def test_firestore_set_get_roundtrip():
    await firestore_service.set_document("gates", "gate-a", {"occupancy_pct": 62})
    doc = await firestore_service.get_document("gates", "gate-a")
    assert doc == {"occupancy_pct": 62}


@pytest.mark.asyncio
async def test_firestore_list_collection():
    await firestore_service.set_document("gates", "gate-b", {"occupancy_pct": 31})
    docs = await firestore_service.list_collection("gates")
    assert len(docs) >= 1


@pytest.mark.asyncio
async def test_firestore_get_missing_document_returns_none():
    doc = await firestore_service.get_document("gates", "does-not-exist")
    assert doc is None


@pytest.mark.asyncio
async def test_bigquery_kpi_query():
    result = await bigquery_service.run_kpi_query("avg_entry_wait_minutes")
    assert result["metric"] == "avg_entry_wait_minutes"
    assert result["value"] is not None


@pytest.mark.asyncio
async def test_bigquery_daily_summary():
    result = await bigquery_service.daily_summary()
    assert "headline" in result


@pytest.mark.asyncio
async def test_pubsub_publish_fans_out_to_subscribers():
    received = []

    async def handler(message):
        received.append(message)

    pubsub_service.subscribe("test-topic", handler)
    await pubsub_service.publish("test-topic", {"hello": "world"})
    assert received == [{"hello": "world"}]
