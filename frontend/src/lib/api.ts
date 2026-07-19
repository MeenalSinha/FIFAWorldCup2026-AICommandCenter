/**
 * Thin fetch wrapper around the FastAPI backend. Every dashboard
 * component reads through this module instead of calling fetch()
 * directly, so auth headers, base URLs and error handling stay in one
 * place. Uses the Next.js rewrite proxy (/api/backend/*) in the
 * browser so no CORS configuration is needed for local development.
 */
const BASE = "/api/backend";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Request to ${path} failed with ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export const api = {
  digitalTwinState: () => request<DigitalTwinState>("/digital-twin/state"),
  stadiumOperationsOverview: () => request<StadiumOperationsOverview>("/stadium-operations/overview"),
  sustainabilityDashboard: () => request<SustainabilityDashboard>("/sustainability/dashboard"),
  transportationOverview: () => request<TransportationOverview>("/transportation/overview"),
  volunteerTasks: () => request<{ volunteers: Volunteer[] }>("/volunteer-copilot/tasks"),
  lostFoundItems: () => request<{ items: LostFoundItem[] }>("/lost-found/items"),
  askFanAgent: (question: string, language = "en") =>
    request<{ answer: string }>("/fan-experience/ask", {
      method: "POST",
      body: JSON.stringify({ question, language }),
    }),
  dailyReport: () => request<DailyReport>("/operations-intelligence/daily-report"),
};

export interface Gate {
  id: string;
  name: string;
  density: "low" | "medium" | "high";
  occupancy_pct: number;
}

export interface Insight {
  id: string;
  severity: "low" | "medium" | "high";
  category: string;
  title: string;
  detail: string;
  eta_minutes: number;
}

export interface DigitalTwinState {
  stadium: {
    name: string;
    location: string;
    capacity: number;
    match: string;
    stage: string;
    kickoff: string;
    weather: { tempC: number; condition: string };
    security_level: string;
  };
  gates: Gate[];
  insights: Insight[];
  operations: {
    entry_gates_open: number;
    restrooms_avg_usage_pct: number;
    food_stalls_active: number;
    medical_stations_active: number;
    security_alerts_active: number;
    lost_found_items: number;
  };
  sustainability: SustainabilityDashboard["metrics"];
  transportation: TransportationOverview["overview"];
}

export interface StadiumOperationsOverview {
  gates: Gate[];
  operations_overview: DigitalTwinState["operations"];
  priority_gate: Gate;
  recommendation: string;
}

export interface SustainabilityDashboard {
  metrics: {
    green_score_pct: number;
    co2_saved_tons: number;
    waste_diverted_tons: number;
    water_saved_kl: number;
    energy_efficiency_pct: number;
  };
  suggestion: string;
}

export interface TransportationOverview {
  overview: {
    public_transit: { status: string; load_pct: number };
    ride_share: { status: string; eta_minutes: string };
    parking: { status: string; lot_d_pct: number };
    pedestrian_flow: { status: string; density: string };
  };
  prediction: string;
}

export interface Volunteer {
  id: string;
  name: string;
  zone: string;
  status: string;
  tasks_open: number;
}

export interface LostFoundItem {
  id: string;
  description: string;
  location: string;
  status: string;
  reported_at: string;
}

export interface DailyReport {
  kpis: Record<string, number>;
  summary: { headline: string; highlights: string[]; risks: string[] };
  narrative: string;
}
