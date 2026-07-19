"use client";

import Topbar from "@/components/layout/Topbar";
import StadiumDigitalTwin from "@/components/dashboard/StadiumDigitalTwin";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function LiveMapPage() {
  const { gates } = useDashboardData();
  return (
    <>
      <Topbar title="Live Map" subtitle="Interactive stadium digital twin with live gate and crowd status" />
      <div className="px-8 pb-10">
        <StadiumDigitalTwin gates={gates} />
      </div>
    </>
  );
}
