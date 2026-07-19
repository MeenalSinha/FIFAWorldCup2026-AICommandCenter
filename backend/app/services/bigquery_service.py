"""
BigQuery analytics wrapper for the Organizer Dashboard and AI Operations
Timeline. Demo mode aggregates the in-memory seed dataset instead of
issuing billed queries; production swaps in
`google.cloud.bigquery.Client().query(sql)`.
"""
from app.data import seed_data


async def run_kpi_query(metric: str) -> dict:
    kpis = seed_data.OPERATIONS_KPIS
    return {"metric": metric, "value": kpis.get(metric), "source": "bigquery_demo_dataset"}


async def daily_summary() -> dict:
    return seed_data.DAILY_SUMMARY
