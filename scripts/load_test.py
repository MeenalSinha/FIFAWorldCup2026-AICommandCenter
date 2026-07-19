import asyncio
import statistics
import time

import httpx

URL = "http://localhost:8080/api/v1/digital-twin/state"
CONCURRENCY = 50
REQUESTS_PER_WORKER = 20


async def worker(client: httpx.AsyncClient, latencies: list, errors: list):
    for _ in range(REQUESTS_PER_WORKER):
        start = time.perf_counter()
        try:
            response = await client.get(URL, timeout=10)
            elapsed_ms = (time.perf_counter() - start) * 1000
            if response.status_code == 200:
                latencies.append(elapsed_ms)
            else:
                errors.append(response.status_code)
        except Exception as exc:
            errors.append(str(exc))


async def main():
    latencies: list[float] = []
    errors: list = []

    async with httpx.AsyncClient() as client:
        start = time.perf_counter()
        await asyncio.gather(*[worker(client, latencies, errors) for _ in range(CONCURRENCY)])
        total_time = time.perf_counter() - start

    total_requests = CONCURRENCY * REQUESTS_PER_WORKER
    print(f"Total requests: {total_requests}")
    print(f"Concurrency: {CONCURRENCY}")
    print(f"Successful: {len(latencies)}")
    print(f"Errors: {len(errors)}")
    print(f"Total wall time: {total_time:.3f}s")
    print(f"Throughput: {len(latencies) / total_time:.1f} req/s")
    if latencies:
        sorted_lat = sorted(latencies)
        p50 = sorted_lat[int(len(sorted_lat) * 0.50)]
        p95 = sorted_lat[int(len(sorted_lat) * 0.95)]
        p99 = sorted_lat[min(int(len(sorted_lat) * 0.99), len(sorted_lat) - 1)]
        print(f"Latency mean: {statistics.mean(latencies):.2f}ms")
        print(f"Latency p50: {p50:.2f}ms")
        print(f"Latency p95: {p95:.2f}ms")
        print(f"Latency p99: {p99:.2f}ms")
        print(f"Latency max: {max(latencies):.2f}ms")
    if errors:
        print(f"Error sample: {errors[:10]}")


if __name__ == "__main__":
    asyncio.run(main())
