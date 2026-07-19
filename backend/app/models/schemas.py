from pydantic import BaseModel, Field


class FanQuestionRequest(BaseModel):
    """ """
    question: str = Field(..., min_length=1, max_length=1000)
    language: str = Field(default="en", min_length=2, max_length=5)


class RouteRequest(BaseModel):
    """ """
    origin: str
    destination: str
    profile: str = Field(default="fastest")


class IncidentRequest(BaseModel):
    """ """
    incident_type: str
    description: str = Field(..., min_length=1, max_length=1000)
    location: str


class LostFoundQuery(BaseModel):
    """ """
    query: str = Field(..., min_length=1, max_length=300)


class VolunteerProcedureRequest(BaseModel):
    """ """
    situation: str = Field(..., min_length=1, max_length=300)


class VolunteerIncidentRequest(BaseModel):
    """ """
    description: str = Field(..., min_length=1, max_length=1000)
    location: str


class AudioDescriptionRequest(BaseModel):
    """ """
    scene: str = Field(..., min_length=1, max_length=300)


class SignLanguageRequest(BaseModel):
    """ """
    message: str = Field(..., min_length=1, max_length=300)


class TimelineEventRequest(BaseModel):
    """ """
    event: str = Field(..., min_length=1, max_length=300)


class TokenRequest(BaseModel):
    """ """
    username: str
    role: str | None = "fan"
