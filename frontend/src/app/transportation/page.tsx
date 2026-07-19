"use client";

import Topbar from "@/components/layout/Topbar";
import TransportationOverview from "@/components/dashboard/TransportationOverview";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function TransportationPage() {
  const { transportation } = useDashboardData();
  return (
    <>
      <Topbar
        title="Transportation"
        subtitle="Transit, ride share, parking and pedestrian flow predictions"
      />
      <div className="px-8 pb-10">
        <TransportationOverview overview={transportation} />
      </div>
    </>
  );
}
