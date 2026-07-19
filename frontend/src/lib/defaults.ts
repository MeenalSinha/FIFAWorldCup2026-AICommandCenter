/**
 * Fallback dataset used when the backend is unreachable (e.g. viewing
 * the frontend standalone). Mirrors backend/app/data/seed_data.py so
 * the dashboard always renders a complete, presentable state.
 */
import type {
  DigitalTwinState,
  SustainabilityDashboard,
  TransportationOverview,
} from "@/lib/api";

export const DEFAULT_STATE: DigitalTwinState = {
  stadium: {
    name: "MetLife Stadium",
    location: "New Jersey, USA",
    capacity: 82500,
    match: "ARG vs FRA",
    stage: "Group Stage",
    kickoff: "20:00",
    weather: { tempC: 24, condition: "Partly Cloudy" },
    security_level: "Medium",
  },
  gates: [
    { id: "gate-a", name: "Gate A", density: "medium", occupancy_pct: 62 },
    { id: "gate-b", name: "Gate B", density: "low", occupancy_pct: 31 },
    { id: "gate-c", name: "Gate C", density: "high", occupancy_pct: 91 },
    { id: "gate-d", name: "Gate D", density: "medium", occupancy_pct: 58 },
    { id: "gate-e", name: "Gate E", density: "low", occupancy_pct: 24 },
  ],
  insights: [
    {
      id: "insight-1",
      severity: "high",
      category: "crowd",
      title: "Gate C crowd density is high",
      detail: "Prediction: 95% capacity in 18 minutes.",
      eta_minutes: 18,
    },
    {
      id: "insight-2",
      severity: "medium",
      category: "concessions",
      title: "Food stall 12 likely to run out of water",
      detail: "Projected in 27 minutes.",
      eta_minutes: 27,
    },
    {
      id: "insight-3",
      severity: "medium",
      category: "transportation",
      title: "Parking Lot D will reach 95% capacity",
      detail: "Expected by 7:30 PM.",
      eta_minutes: 45,
    },
    {
      id: "insight-4",
      severity: "high",
      category: "accessibility",
      title: "Wheelchair route near Gate B temporarily blocked",
      detail: "Rerouting active navigations via the east concourse.",
      eta_minutes: 0,
    },
  ],
  operations: {
    entry_gates_open: 12,
    restrooms_avg_usage_pct: 68,
    food_stalls_active: 24,
    medical_stations_active: 6,
    security_alerts_active: 3,
    lost_found_items: 18,
  },
  sustainability: {
    green_score_pct: 78,
    co2_saved_tons: 12.4,
    waste_diverted_tons: 8.7,
    water_saved_kl: 15.2,
    energy_efficiency_pct: 82,
  },
  transportation: {
    public_transit: { status: "Good", load_pct: 65 },
    ride_share: { status: "Moderate", eta_minutes: "12-15" },
    parking: { status: "High", lot_d_pct: 92 },
    pedestrian_flow: { status: "Good", density: "Low" },
  },
};

export const DEFAULT_SUSTAINABILITY: SustainabilityDashboard = {
  metrics: DEFAULT_STATE.sustainability,
  suggestion:
    "Shift Lot D overflow parking to the shuttle service to cut idling emissions during peak arrival.",
};

export const DEFAULT_TRANSPORTATION: TransportationOverview = {
  overview: DEFAULT_STATE.transportation,
  prediction:
    "Ride-share congestion is likely near the west drop-off after the final whistle; pre-position marshals now.",
};
