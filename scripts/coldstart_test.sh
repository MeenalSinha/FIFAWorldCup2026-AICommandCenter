#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/../backend"

START=$(date +%s.%N)
python -m uvicorn app.main:app --host 0.0.0.0 --port 8081 > /tmp/coldstart.log 2>&1 &
PID=$!

for i in $(seq 1 100); do
  if curl -s -o /dev/null http://localhost:8081/health 2>/dev/null; then
    END=$(date +%s.%N)
    break
  fi
  sleep 0.02
done

echo "Cold start (process launch to first successful /health 200): $(echo "$END - $START" | bc) seconds"
curl -s http://localhost:8081/health
echo
kill $PID 2>/dev/null
wait $PID 2>/dev/null
