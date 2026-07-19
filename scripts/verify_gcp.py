#!/usr/bin/env python3
"""
Live Google Cloud / Gemini verification script.

This is the Option-B deliverable for every service this project could
not verify live in its authoring environment (no GCP project or API
keys were available there). It does not simulate anything: each check
makes a real network call to the real service and reports PASS, FAIL
(with the actual error), or SKIPPED (no credentials configured for
that service, distinct from a failure).

Usage:
    pip install -r backend/requirements.txt google-cloud-storage
    export GOOGLE_API_KEY=...
    export GOOGLE_CLOUD_PROJECT=...
    export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
    export GOOGLE_MAPS_API_KEY=...
    python3 scripts/verify_gcp.py

Exit code is 0 only if every configured (non-skipped) check passed.
"""
import os
import sys
import time
import traceback

RESULTS: list[tuple[str, str, str]] = []  # (service, status, detail)


def record(service: str, status: str, detail: str) -> None:
    RESULTS.append((service, status, detail))
    icon = {"PASS": "\u2713", "FAIL": "\u2717", "SKIP": "\u2014"}[status]
    print(f"[{icon}] {service}: {status} -- {detail}")


def check_gemini() -> None:
    api_key = os.environ.get("GOOGLE_API_KEY", "")
    if not api_key:
        record("Gemini", "SKIP", "GOOGLE_API_KEY not set")
        return
    try:
        import google.generativeai as genai

        genai.configure(api_key=api_key)
        model = genai.GenerativeModel(os.environ.get("GEMINI_MODEL", "gemini-1.5-pro"))
        start = time.perf_counter()
        response = model.generate_content(
            "Reply with exactly the word: OK",
            request_options={"timeout": 15},
        )
        elapsed = (time.perf_counter() - start) * 1000
        record("Gemini", "PASS", f"responded in {elapsed:.0f}ms, text={response.text.strip()!r}")
    except Exception as exc:
        record("Gemini", "FAIL", f"{type(exc).__name__}: {exc}")


def check_maps() -> None:
    api_key = os.environ.get("GOOGLE_MAPS_API_KEY", "")
    if not api_key:
        record("Maps Platform", "SKIP", "GOOGLE_MAPS_API_KEY not set")
        return
    try:
        import httpx

        params = {
            "address": "MetLife Stadium, East Rutherford, NJ",
            "key": api_key,
        }
        resp = httpx.get("https://maps.googleapis.com/maps/api/geocode/json", params=params, timeout=10)
        data = resp.json()
        if data.get("status") == "OK":
            record("Maps Platform", "PASS", f"geocoded {len(data['results'])} result(s)")
        else:
            record("Maps Platform", "FAIL", f"API returned status={data.get('status')}: {data.get('error_message', '')}")
    except Exception as exc:
        record("Maps Platform", "FAIL", f"{type(exc).__name__}: {exc}")


def check_firestore() -> None:
    project = os.environ.get("GOOGLE_CLOUD_PROJECT", "")
    creds = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", "")
    if not project or not creds:
        record("Firestore", "SKIP", "GOOGLE_CLOUD_PROJECT / GOOGLE_APPLICATION_CREDENTIALS not set")
        return
    try:
        from google.cloud import firestore

        client = firestore.Client(project=project)
        doc_ref = client.collection("_gcp_verify").document("healthcheck")
        doc_ref.set({"checked_at": time.time()})
        snapshot = doc_ref.get()
        record("Firestore", "PASS", f"write+read roundtrip ok, exists={snapshot.exists}")
        doc_ref.delete()
    except Exception as exc:
        record("Firestore", "FAIL", f"{type(exc).__name__}: {exc}")


def check_bigquery() -> None:
    project = os.environ.get("GOOGLE_CLOUD_PROJECT", "")
    creds = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", "")
    if not project or not creds:
        record("BigQuery", "SKIP", "GOOGLE_CLOUD_PROJECT / GOOGLE_APPLICATION_CREDENTIALS not set")
        return
    try:
        from google.cloud import bigquery

        client = bigquery.Client(project=project)
        result = list(client.query("SELECT 1 AS ok").result())
        record("BigQuery", "PASS", f"query returned {result[0].ok if result else 'no rows'}")
    except Exception as exc:
        record("BigQuery", "FAIL", f"{type(exc).__name__}: {exc}")


def check_pubsub() -> None:
    project = os.environ.get("GOOGLE_CLOUD_PROJECT", "")
    creds = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", "")
    topic_name = os.environ.get("PUBSUB_TOPIC_INCIDENTS", "incident-events")
    if not project or not creds:
        record("Pub/Sub", "SKIP", "GOOGLE_CLOUD_PROJECT / GOOGLE_APPLICATION_CREDENTIALS not set")
        return
    try:
        from google.cloud import pubsub_v1

        publisher = pubsub_v1.PublisherClient()
        topic_path = publisher.topic_path(project, topic_name)
        future = publisher.publish(topic_path, b"gcp-verify-script-ping")
        message_id = future.result(timeout=10)
        record("Pub/Sub", "PASS", f"published message_id={message_id}")
    except Exception as exc:
        record("Pub/Sub", "FAIL", f"{type(exc).__name__}: {exc}")


def check_cloud_storage() -> None:
    project = os.environ.get("GOOGLE_CLOUD_PROJECT", "")
    creds = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", "")
    bucket_name = os.environ.get("GCS_VERIFY_BUCKET", "")
    if not project or not creds or not bucket_name:
        record("Cloud Storage", "SKIP", "GOOGLE_CLOUD_PROJECT / GOOGLE_APPLICATION_CREDENTIALS / GCS_VERIFY_BUCKET not set")
        return
    try:
        from google.cloud import storage

        client = storage.Client(project=project)
        bucket = client.bucket(bucket_name)
        blob = bucket.blob("_gcp_verify/healthcheck.txt")
        blob.upload_from_string("ok")
        exists = blob.exists()
        blob.delete()
        record("Cloud Storage", "PASS", f"upload+exists+delete roundtrip ok, exists_was={exists}")
    except Exception as exc:
        record("Cloud Storage", "FAIL", f"{type(exc).__name__}: {exc}")


def check_cloud_run_deployment() -> None:
    url = os.environ.get("CLOUD_RUN_BACKEND_URL", "")
    if not url:
        record("Cloud Run (deployed backend)", "SKIP", "CLOUD_RUN_BACKEND_URL not set")
        return
    try:
        import httpx

        resp = httpx.get(f"{url.rstrip('/')}/health", timeout=10)
        record("Cloud Run (deployed backend)", "PASS" if resp.status_code == 200 else "FAIL", f"status={resp.status_code} body={resp.text[:200]}")
    except Exception as exc:
        record("Cloud Run (deployed backend)", "FAIL", f"{type(exc).__name__}: {exc}")


def main() -> int:
    print("=" * 70)
    print("Live Google Cloud / Gemini verification")
    print("=" * 70)

    for check in (
        check_gemini,
        check_maps,
        check_firestore,
        check_bigquery,
        check_pubsub,
        check_cloud_storage,
        check_cloud_run_deployment,
    ):
        try:
            check()
        except Exception:
            print(f"Unexpected error in {check.__name__}:")
            traceback.print_exc()

    print("=" * 70)
    passed = sum(1 for _, status, _ in RESULTS if status == "PASS")
    failed = sum(1 for _, status, _ in RESULTS if status == "FAIL")
    skipped = sum(1 for _, status, _ in RESULTS if status == "SKIP")
    print(f"Summary: {passed} passed, {failed} failed, {skipped} skipped (no credentials)")

    return 1 if failed > 0 else 0


if __name__ == "__main__":
    sys.exit(main())
