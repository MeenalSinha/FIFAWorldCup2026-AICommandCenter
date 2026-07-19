"use client";

import {
  TrainFront,
  Car,
  ParkingSquare,
  Footprints,
  MoreVertical,
} from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import type { TransportationOverview as TransportationOverviewType } from "@/lib/api";

const STATUS_COLOR: Record<string, string> = {
  Good: "text-emerald-600",
  Moderate: "text-amber-600",
  High: "text-red-600",
};

export default function TransportationOverview({
  overview,
}: {
  overview: TransportationOverviewType["overview"];
}) {
  const items = [
    {
      label: "Public Transit",
      status: overview.public_transit.status,
      detail: `Load: ${overview.public_transit.load_pct}%`,
      icon: TrainFront,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Ride Share",
      status: overview.ride_share.status,
      detail: `ETA: ${overview.ride_share.eta_minutes} min`,
      icon: Car,
      color: "text-amber-600 bg-amber-50",
    },
    {
      label: "Parking Lots",
      status: overview.parking.status,
      detail: `Lot D: ${overview.parking.lot_d_pct}%`,
      icon: ParkingSquare,
      color: "text-red-600 bg-red-50",
    },
    {
      label: "Pedestrian Flow",
      status: overview.pedestrian_flow.status,
      detail: `Density: ${overview.pedestrian_flow.density}`,
      icon: Footprints,
      color: "text-blue-600 bg-blue-50",
    },
  ];

  return (
    <Card>
      <CardHeader
        title="Transportation Overview"
        action={
          <button
            aria-label="More options"
            className="text-[var(--text-secondary)]"
          >
            <MoreVertical size={16} />
          </button>
        }
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-5 pb-5">
        {items.map(({ label, status, detail, icon: Icon, color }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-xl border border-[var(--border-soft)] p-3 bg-white hover:bg-slate-50 transition-colors"
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${color}`}
            >
              <Icon size={20} />
            </span>
            <div className="flex flex-col leading-tight">
              <p className="text-[11px] font-medium text-[var(--text-secondary)]">{label}</p>
              <p
                className={`text-sm font-bold mt-0.5 ${STATUS_COLOR[status] ?? ""}`}
              >
                {status}
              </p>
              <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
