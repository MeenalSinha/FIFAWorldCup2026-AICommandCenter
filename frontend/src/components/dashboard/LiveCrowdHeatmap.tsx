"use client";

import { MoreVertical } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";

const RINGS = [
  { r: 130, color: "#e5484d" },
  { r: 110, color: "#f2a13c" },
  { r: 90, color: "#f2c94c" },
  { r: 68, color: "#22a06b" },
  { r: 44, color: "#12b3a6" },
];

export default function LiveCrowdHeatmap() {
  return (
    <Card>
      <CardHeader
        title="Live Crowd Heatmap"
        action={
          <button
            aria-label="More options"
            className="text-[var(--text-secondary)]"
          >
            <MoreVertical size={16} />
          </button>
        }
      />
      <div className="flex items-center gap-4 px-5 pb-5">
        <div className="relative h-56 w-56 shrink-0 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-[var(--border-soft)]">
          <img
            src="/stadium-heatmap.png"
            alt="Live stadium crowd heatmap"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="flex h-56 flex-col justify-between text-xs text-[var(--text-secondary)]">
          <span>High</span>
          <div className="flex-1 w-1.5 mx-auto my-2 rounded-full bg-gradient-to-b from-red-500 via-amber-400 to-teal-500" />
          <span>Low</span>
        </div>
      </div>
    </Card>
  );
}
