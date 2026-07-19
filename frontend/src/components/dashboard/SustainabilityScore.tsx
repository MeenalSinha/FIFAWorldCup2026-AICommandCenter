"use client";

import Link from "next/link";
import {
  Leaf,
  Recycle,
  Droplets,
  Zap,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import type { SustainabilityDashboard } from "@/lib/api";

export default function SustainabilityScore({
  metrics,
}: {
  metrics: SustainabilityDashboard["metrics"];
}) {
  const circumference = 2 * Math.PI * 54;
  const offset = circumference * (1 - metrics.green_score_pct / 100);

  const rows = [
    {
      label: "CO2 Saved",
      value: `${metrics.co2_saved_tons} tons`,
      icon: Leaf,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Waste Diverted",
      value: `${metrics.waste_diverted_tons} tons`,
      icon: Recycle,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Water Saved",
      value: `${metrics.water_saved_kl} KL`,
      icon: Droplets,
      color: "text-sky-600 bg-sky-50",
    },
    {
      label: "Energy Efficiency",
      value: `${metrics.energy_efficiency_pct}%`,
      icon: Zap,
      color: "text-amber-600 bg-amber-50",
    },
  ];

  return (
    <Card>
      <CardHeader
        title="Sustainability Score"
        action={
          <button
            aria-label="More options"
            className="text-[var(--text-secondary)]"
          >
            <MoreVertical size={16} />
          </button>
        }
      />
      <div className="flex items-center gap-5 px-5 pb-4">
        <svg
          viewBox="0 0 140 140"
          className="h-32 w-32 shrink-0"
          role="img"
          aria-label={`Green score ${metrics.green_score_pct}%`}
        >
          <circle
            cx="70"
            cy="70"
            r="54"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="12"
          />
          <circle
            cx="70"
            cy="70"
            r="54"
            fill="none"
            stroke="#22a06b"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 70 70)"
          />
          <text
            x="70"
            y="65"
            textAnchor="middle"
            fontSize="24"
            fontWeight={700}
            fill="var(--text-primary)"
          >
            {metrics.green_score_pct}%
          </text>
          <text
            x="70"
            y="84"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            Green Score
          </text>
        </svg>

        <ul className="flex-1 grid grid-cols-1 gap-y-3">
          {rows.map(({ label, value, icon: Icon, color }) => (
            <li key={label} className="flex items-center gap-3">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${color}`}
              >
                <Icon size={16} />
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] font-medium text-[var(--text-secondary)]">
                  {label}
                </span>
                <span className="text-xs font-bold text-[var(--text-primary)] mt-0.5">
                  {value}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-5 pb-5 mt-auto">
        <div className="border-t border-[var(--border-soft)] pt-4 mt-2">
          <Link
            href="/sustainability"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center justify-between"
          >
            View Sustainability Dashboard <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </Card>
  );
}
