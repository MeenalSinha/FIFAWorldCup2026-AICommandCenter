"use client";

import Topbar from "@/components/layout/Topbar";
import OperationsOverview from "@/components/dashboard/OperationsOverview";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function OperationsPage() {
  const { operations } = useDashboardData();
  return (
    <>
      <Topbar title="Operations" subtitle="Gates, restrooms, concessions, medical and security at a glance" />
      <div className="px-8 pb-10 max-w-3xl">
        <OperationsOverview overview={operations} />
      </div>
    </>
  );
}
