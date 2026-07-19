"use client";

import { useQuery } from "@tanstack/react-query";
import Topbar from "@/components/layout/Topbar";
import SustainabilityScore from "@/components/dashboard/SustainabilityScore";
import { Card, CardHeader } from "@/components/ui/Card";
import { api } from "@/lib/api";
import { DEFAULT_SUSTAINABILITY } from "@/lib/defaults";

export default function SustainabilityPage() {
  const { data } = useQuery({
    queryKey: ["sustainability-dashboard"],
    queryFn: api.sustainabilityDashboard,
    initialData: DEFAULT_SUSTAINABILITY,
  });

  return (
    <>
      <Topbar title="Sustainability" subtitle="Energy, waste, recycling and transportation emissions tracking" />
      <div className="px-8 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <SustainabilityScore metrics={data.metrics} />
        <Card>
          <CardHeader title="AI Suggestion" />
          <p className="px-5 pb-5 text-sm text-[var(--text-secondary)]">{data.suggestion}</p>
        </Card>
      </div>
    </>
  );
}
