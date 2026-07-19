"use client";

import Link from "next/link";
import { DoorOpen, Users2, ShoppingBag, Cross, ShieldAlert, Camera, ChevronRight } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import type { DigitalTwinState } from "@/lib/api";

export default function OperationsOverview({ overview }: { overview: DigitalTwinState["operations"] }) {
  const stats = [
    { label: "Entry Gates", value: overview.entry_gates_open, unit: "Open", icon: DoorOpen, color: "text-emerald-600 bg-emerald-50" },
    { label: "Restrooms", value: `${overview.restrooms_avg_usage_pct}%`, unit: "Avg. Usage", icon: Users2, color: "text-blue-600 bg-blue-50" },
    { label: "Food Stalls", value: overview.food_stalls_active, unit: "Active", icon: ShoppingBag, color: "text-violet-600 bg-violet-50" },
    { label: "Medical Stations", value: overview.medical_stations_active, unit: "Active", icon: Cross, color: "text-red-600 bg-red-50" },
    { label: "Security Alerts", value: overview.security_alerts_active, unit: "Active", icon: ShieldAlert, color: "text-amber-600 bg-amber-50" },
    { label: "Lost & Found", value: overview.lost_found_items, unit: "Items", icon: Camera, color: "text-teal-600 bg-teal-50" },
  ];

  return (
    <Card>
      <CardHeader title="Operations Overview" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-5 pb-4">
        {stats.map(({ label, value, unit, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-[var(--border-soft)] p-3">
            <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${color}`}>
              <Icon size={16} />
            </span>
            <p className="mt-2 text-lg font-semibold leading-tight">{value}</p>
            <p className="text-xs text-[var(--text-secondary)]">{unit}</p>
            <p className="text-xs text-[var(--text-secondary)]">{label}</p>
          </div>
        ))}
      </div>
      <div className="px-5 pb-5">
        <Link href="/operations" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
          View Full Operations Dashboard <ChevronRight size={14} />
        </Link>
      </div>
    </Card>
  );
}
