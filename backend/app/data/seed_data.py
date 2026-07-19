"""
Deterministic seed / demo dataset for MetLife Stadium, ARG vs FRA group
stage match. Used across services and endpoints so /seed resets the
whole platform to a consistent, presentable state before a demo run.
"""

import time

STADIUM = {
    "name": "MetLife Stadium",
    "location": "New Jersey, USA",
    "capacity": 82500,
    "match": "ARG vs FRA",
    "stage": "Group Stage",
    "kickoff": "20:00",
    "weather": {"tempC": 24, "condition": "Partly Cloudy"},
    "security_level": "Medium",
}

GATES = [
    {"id": "gate-a", "name": "Gate A", "density": "medium", "occupancy_pct": 62},
    {"id": "gate-b", "name": "Gate B", "density": "low", "occupancy_pct": 31},
    {"id": "gate-c", "name": "Gate C", "density": "high", "occupancy_pct": 91},
    {"id": "gate-d", "name": "Gate D", "density": "medium", "occupancy_pct": 58},
    {"id": "gate-e", "name": "Gate E", "density": "low", "occupancy_pct": 24},
]

OPERATIONS_OVERVIEW = {
    "entry_gates_open": 12,
    "restrooms_avg_usage_pct": 68,
    "food_stalls_active": 24,
    "medical_stations_active": 6,
    "security_alerts_active": 3,
    "lost_found_items": 18,
}

AI_INSIGHTS = [
    {
        "id": "insight-1",
        "severity": "high",
        "category": "crowd",
        "title": "Gate C crowd density is high",
        "detail": "Prediction: 95% capacity in 18 minutes.",
        "eta_minutes": 18,
    },
    {
        "id": "insight-2",
        "severity": "medium",
        "category": "concessions",
        "title": "Food stall 12 likely to run out of water",
        "detail": "Projected stockout in 27 minutes at current consumption rate.",
        "eta_minutes": 27,
    },
    {
        "id": "insight-3",
        "severity": "medium",
        "category": "transportation",
        "title": "Parking Lot D approaching capacity",
        "detail": "Will reach 95% capacity by 19:30.",
        "eta_minutes": 45,
    },
    {
        "id": "insight-4",
        "severity": "high",
        "category": "accessibility",
        "title": "Wheelchair route near Gate B temporarily blocked",
        "detail": "Rerouting active wheelchair-profile navigations via the east concourse.",
        "eta_minutes": 0,
    },
]

SUSTAINABILITY = {
    "green_score_pct": 78,
    "co2_saved_tons": 12.4,
    "waste_diverted_tons": 8.7,
    "water_saved_kl": 15.2,
    "energy_efficiency_pct": 82,
}

TRANSPORTATION_OVERVIEW = {
    "public_transit": {"status": "Good", "load_pct": 65},
    "ride_share": {"status": "Moderate", "eta_minutes": "12-15"},
    "parking": {"status": "High", "lot_d_pct": 92},
    "pedestrian_flow": {"status": "Good", "density": "Low"},
}

VOLUNTEERS = [
    {
        "id": "v-1",
        "name": "Volunteer Team North",
        "zone": "Gate A-B",
        "status": "available",
        "tasks_open": 2,
    },
    {
        "id": "v-2",
        "name": "Volunteer Team East",
        "zone": "Gate C",
        "status": "dispatched",
        "tasks_open": 4,
    },
    {
        "id": "v-3",
        "name": "Volunteer Team South",
        "zone": "Gate D-E",
        "status": "available",
        "tasks_open": 1,
    },
]

LOST_FOUND_ITEMS = [
    {
        "id": "lf-1",
        "description": "Black backpack",
        "location": "Near Gate B",
        "status": "reported",
        "reported_at": "18:42",
    },
    {
        "id": "lf-2",
        "description": "Blue child's cap",
        "location": "Section 114",
        "status": "matched",
        "reported_at": "18:10",
    },
    {
        "id": "lf-3",
        "description": "Prescription glasses, tortoiseshell",
        "location": "Near Food Stall 12",
        "status": "reported",
        "reported_at": "19:03",
    },
]

OPERATIONS_KPIS = {
    "avg_entry_wait_minutes": 6.2,
    "avg_concession_wait_minutes": 4.8,
    "incidents_open": 3,
    "incidents_resolved_today": 11,
    "volunteer_utilization_pct": 74,
}

DAILY_SUMMARY = {
    "generated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    "headline": "Operations nominal with one active congestion hotspot at Gate C.",
    "highlights": [
        "Entry flow at 12 open gates remains within target wait times except Gate C.",
        "Sustainability green score improved 3 points versus the previous match day.",
        "Volunteer teams resolved 11 of 14 reported incidents within SLA.",
    ],
    "risks": [
        "Gate C is trending toward unsafe density within 18 minutes without intervention.",
        "Parking Lot D is projected to reach 95% capacity before kickoff.",
    ],
}

INCIDENT_TYPES = ["medical", "crowd_panic", "weather", "security", "lost_child"]

TRANSLATIONS_DEMO_LANGUAGES = [
    "en",
    "es",
    "fr",
    "pt",
    "de",
    "ar",
    "hi",
    "zh",
    "ja",
    "ko",
]
