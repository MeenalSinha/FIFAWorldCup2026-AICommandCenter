import pytest

from app.services import maps_service


@pytest.mark.asyncio
@pytest.mark.parametrize(
    "profile", ["fastest", "safest", "least_crowded", "wheelchair", "family"]
)
async def test_get_route_profiles(profile):
    result = await maps_service.get_route("Gate A", "Section 114", profile)
    assert result["profile"] == profile
    assert result["notes"]  # every profile has a non-empty explanation


@pytest.mark.asyncio
async def test_get_place_suggestions_matches_query():
    result = await maps_service.get_place_suggestions("gate a")
    assert any("Gate A" in place["name"] for place in result)


@pytest.mark.asyncio
async def test_get_place_suggestions_falls_back_when_no_match():
    result = await maps_service.get_place_suggestions("nonexistent-place-xyz")
    assert len(result) > 0
