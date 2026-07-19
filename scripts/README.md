# Measurement scripts

Used to produce the numbers in `docs/AUDIT_EVIDENCE.md`. Run against a
live backend instance so results are reproducible by anyone, not just
asserted.

- `coldstart_test.sh` -- times backend process launch to first healthy
  `/health` response.
- `load_test.py` -- async/httpx concurrent load test against
  `/api/v1/digital-twin/state`; prints throughput and latency
  percentiles. Requires `pip install httpx`.

```bash
cd backend && uvicorn app.main:app --port 8080 &
python3 ../scripts/load_test.py
bash ../scripts/coldstart_test.sh
```
