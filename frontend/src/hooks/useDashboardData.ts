"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { DEFAULT_STATE, DEFAULT_SUSTAINABILITY, DEFAULT_TRANSPORTATION } from "@/lib/defaults";
import { useLiveFeed } from "@/hooks/useLiveFeed";

export function useDashboardData() {
  const stateQuery = useQuery({
    queryKey: ["digital-twin-state"],
    queryFn: api.digitalTwinState,
    initialData: DEFAULT_STATE,
  });

  const sustainabilityQuery = useQuery({
    queryKey: ["sustainability-dashboard"],
    queryFn: api.sustainabilityDashboard,
    initialData: DEFAULT_SUSTAINABILITY,
  });

  const transportationQuery = useQuery({
    queryKey: ["transportation-overview"],
    queryFn: api.transportationOverview,
    initialData: DEFAULT_TRANSPORTATION,
  });

  const live = useLiveFeed();

  const gates = live?.gates ?? stateQuery.data.gates;
  const isBackendReachable = !stateQuery.isError && !sustainabilityQuery.isError && !transportationQuery.isError;

  return {
    stadium: stateQuery.data.stadium,
    gates,
    insights: stateQuery.data.insights,
    operations: stateQuery.data.operations,
    sustainability: sustainabilityQuery.data.metrics,
    transportation: transportationQuery.data.overview,
    isBackendReachable,
    isLiveFeedConnected: live !== null,
  };
}
