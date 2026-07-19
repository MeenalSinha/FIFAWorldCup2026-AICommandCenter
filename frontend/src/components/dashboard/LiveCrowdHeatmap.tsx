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
        <svg
          viewBox="0 0 300 300"
          className="h-56 w-56 shrink-0"
          role="img"
          aria-label="Live stadium crowd heatmap"
        >
          {RINGS.map((ring) => (
            <circle
              key={ring.r}
              cx="150"
              cy="150"
              r={ring.r}
              fill="none"
              stroke={ring.color}
              strokeWidth="14"
              opacity={0.85}
            />
          ))}
          <rect x="120" y="130" width="60" height="40" fill="#1f8a4c" rx="4" />
        </svg>

        <div className="flex h-56 flex-col justify-between text-xs text-[var(--text-secondary)]">
          <span>High</span>
          <div className="flex-1 w-1.5 mx-auto my-2 rounded-full bg-gradient-to-b from-red-500 via-amber-400 to-teal-500" />
          <span>Low</span>
        </div>
      </div>
    </Card>
  );
}
