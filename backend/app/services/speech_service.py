"""
Speech-to-Text / Text-to-Speech wrapper for the Voice Assistant and
Accessibility AI (audio descriptions, sign-language video generation
hooks). Demo mode returns structured stubs describing what the audio
pipeline would produce, so the frontend can render player UI without a
live STT/TTS backend.
"""


async def speech_to_text(audio_ref: str, language: str = "en") -> dict:
    return {"audio_ref": audio_ref, "language": language, "transcript": "(demo transcript) Where is the nearest accessible restroom?"}


async def text_to_speech(text: str, language: str = "en", voice: str = "neutral") -> dict:
    return {"text": text, "language": language, "voice": voice, "audio_url": "/demo-assets/tts-placeholder.mp3"}


async def generate_sign_language_video(text: str) -> dict:
    return {"text": text, "video_url": "/demo-assets/sign-language-placeholder.mp4", "status": "queued"}
