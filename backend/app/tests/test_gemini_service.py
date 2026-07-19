import pytest

from app.services import gemini_service


class _FlakyClient:
    """Fails twice, then succeeds -- exercises the retry path without
    ever calling a real network API."""

    def __init__(self, fail_times: int, text: str = "ok after retry"):
        self.fail_times = fail_times
        self.calls = 0
        self.text = text

    def generate_content(self, *_args, **_kwargs):
        self.calls += 1
        if self.calls <= self.fail_times:
            raise RuntimeError("simulated transient failure")

        class _Resp:
            text = self.text

        return _Resp()


class _AlwaysFailsClient:
    def generate_content(self, *_args, **_kwargs):
        raise RuntimeError("simulated permanent failure")


@pytest.mark.asyncio
async def test_call_with_retry_succeeds_after_transient_failures():
    client = _FlakyClient(fail_times=2)
    result = await gemini_service._call_with_retry(client, "prompt")
    assert result == "ok after retry"
    assert client.calls == 3  # 2 failures + 1 success, within MAX_RETRIES


@pytest.mark.asyncio
async def test_call_with_retry_raises_after_exhausting_attempts():
    client = _AlwaysFailsClient()
    with pytest.raises(RuntimeError):
        await gemini_service._call_with_retry(client, "prompt")


@pytest.mark.asyncio
async def test_generate_falls_back_to_demo_when_live_ai_disabled():
    # Demo mode is on by default in tests, so generate() should never
    # attempt a live call and should always return non-empty text.
    result = await gemini_service.generate("hello", system_instruction="be helpful", context={"topic": "test"})
    assert isinstance(result, str)
    assert len(result) > 0
