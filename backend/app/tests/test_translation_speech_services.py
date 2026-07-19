import pytest

from app.services import speech_service, translation_service


@pytest.mark.asyncio
async def test_translate_supported_language():
    result = await translation_service.translate("Where is Gate A?", "es")
    assert result["target_language"] == "es"
    assert result["source_text"] == "Where is Gate A?"


@pytest.mark.asyncio
async def test_translate_unsupported_language_falls_back_to_english():
    result = await translation_service.translate("Hello", "xx")
    assert result["target_language"] == "en"


@pytest.mark.asyncio
async def test_speech_to_text_returns_transcript():
    result = await speech_service.speech_to_text("audio-ref-123", "en")
    assert result["language"] == "en"
    assert "transcript" in result


@pytest.mark.asyncio
async def test_text_to_speech_returns_audio_url():
    result = await speech_service.text_to_speech("Evacuate via Gate D", "en")
    assert result["audio_url"].startswith("/demo-assets/")


@pytest.mark.asyncio
async def test_sign_language_video_generation():
    result = await speech_service.generate_sign_language_video("Please remain calm")
    assert result["status"] == "queued"
    assert result["video_url"].endswith(".mp4")
