"use client";

import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import Topbar from "@/components/layout/Topbar";
import { Card, CardHeader } from "@/components/ui/Card";
import { api } from "@/lib/api";

const KpiTrendChart = dynamic(() => import("@/components/charts/KpiTrendChart"), {
  ssr: false,
  loading: () => (
    <div className="app-card h-72 animate-pulse" aria-hidden="true" />
  ),
});

const FALLBACK = {
  kpis: { avg_entry_wait_minutes: 6.2, avg_concession_wait_minutes: 4.8, incidents_open: 3, incidents_resolved_today: 11, volunteer_utilization_pct: 74 },
  summary: {
    headline: "Operations nominal with one active congestion hotspot at Gate C.",
    highlights: [
      "Entry flow at 12 open gates remains within target wait times except Gate C.",
      "Sustainability green score improved 3 points versus the previous match day.",
    ],
    risks: ["Gate C is trending toward unsafe density within 18 minutes without intervention."],
  },
  narrative: "Overall operations are steady; Gate C requires proactive crowd management before kickoff.",
};

export default function ReportsPage() {
  const { data } = useQuery({ queryKey: ["daily-report"], queryFn: api.dailyReport, initialData: FALLBACK });

  return (
    <>
      <Topbar title="Reports" subtitle="Executive summaries, risk forecasts and the AI operations timeline" />
      <div className="px-8 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <KpiTrendChart />
        <Card>
          <CardHeader title="Daily Summary" />
          <div className="px-5 pb-5 space-y-3 text-sm">
            <p className="font-medium">{data.summary.headline}</p>
            <p className="text-[var(--text-secondary)]">{data.narrative}</p>
            <ul className="list-disc pl-5 space-y-1 text-[var(--text-secondary)]">
              {data.summary.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        </Card>
        <Card>
          <CardHeader title="Risks" />
          <ul className="px-5 pb-5 list-disc pl-8 space-y-1 text-sm text-[var(--text-secondary)]">
            {data.summary.risks.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
