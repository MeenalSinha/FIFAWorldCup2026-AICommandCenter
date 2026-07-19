"use client";

import Topbar from "@/components/layout/Topbar";
import AIMatchCompanion from "@/components/dashboard/AIMatchCompanion";
import StadiumDigitalTwin from "@/components/dashboard/StadiumDigitalTwin";
import AIInsightsPanel from "@/components/dashboard/AIInsightsPanel";
import LiveCrowdHeatmap from "@/components/dashboard/LiveCrowdHeatmap";
import OperationsOverview from "@/components/dashboard/OperationsOverview";
import SustainabilityScore from "@/components/dashboard/SustainabilityScore";
import TransportationOverview from "@/components/dashboard/TransportationOverview";
import AIAssistantCard from "@/components/dashboard/AIAssistantCard";
import ConnectionStatusBanner from "@/components/dashboard/ConnectionStatusBanner";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function OverviewPage() {
  const { gates, insights, operations, sustainability, transportation, isBackendReachable } = useDashboardData();

  return (
    <>
      <Topbar title="Stadium Command Center" subtitle="Real-time AI-powered operations and insights" />
      <ConnectionStatusBanner isBackendReachable={isBackendReachable} />

      <div className="px-8 pb-10 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] gap-6 items-start">
          <AIMatchCompanion />
          <StadiumDigitalTwin gates={gates} />
          <AIInsightsPanel insights={insights} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] gap-6 items-start">
          <LiveCrowdHeatmap />
          <OperationsOverview overview={operations} />
          <SustainabilityScore metrics={sustainability} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-6 items-start">
          <TransportationOverview overview={transportation} />
          <AIAssistantCard />
        </div>
      </div>
    </>
  );
}
