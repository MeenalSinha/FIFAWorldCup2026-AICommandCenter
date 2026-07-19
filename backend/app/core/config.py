"""
Centralized application configuration.

All environment-driven settings live here. Nothing in the codebase should
call os.environ directly outside of this module -- that keeps secret
handling auditable in one place (see docs/SECURITY.md).
"""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """ """
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    environment: str = "development"
    app_name: str = "FIFA World Cup 2026 AI Command Center"
    api_v1_prefix: str = "/api/v1"
    allowed_origins: str = "http://localhost:3000"

    # Auth
    jwt_secret_key: str = "change-me-in-secret-manager"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    # Demo / production toggle. In demo mode every Google/Gemini call is
    # served by deterministic mock data so the platform is fully
    # functional without any cloud credentials.
    demo_mode: bool = True

    # Google Cloud / Gemini
    google_api_key: str = ""
    gemini_model: str = "gemini-1.5-pro"
    google_cloud_project: str = ""
    google_application_credentials: str = ""
    google_maps_api_key: str = ""
    firebase_project_id: str = ""
    bigquery_dataset: str = "stadium_intelligence"
    pubsub_topic_incidents: str = "incident-events"

    @property
    def cors_origins(self) -> list[str]:
        """ """
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]

    @property
    def is_live_ai_enabled(self) -> bool:
        """Real Gemini calls only fire when demo_mode is off AND a key exists."""
        return (not self.demo_mode) and bool(self.google_api_key)


@lru_cache
def get_settings() -> Settings:
    """ """
    return Settings()
