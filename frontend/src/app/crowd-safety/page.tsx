"use client";

import Topbar from "@/components/layout/Topbar";
import LiveCrowdHeatmap from "@/components/dashboard/LiveCrowdHeatmap";
import AIInsightsPanel from "@/components/dashboard/AIInsightsPanel";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function CrowdSafetyPage() {
  const { insights } = useDashboardData();
  return (
    <>
      <Topbar
        title="Crowd & Safety"
        subtitle="Predictive crowd density and safety insights across the venue"
      />
      <div className="px-8 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <LiveCrowdHeatmap />
        <AIInsightsPanel insights={insights} />
      </div>
    </>
  );
}
