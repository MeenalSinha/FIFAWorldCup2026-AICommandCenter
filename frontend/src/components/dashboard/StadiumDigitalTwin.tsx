"use client";

import { Plus, Minus, LocateFixed, MoreVertical } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import type { Gate } from "@/lib/api";

const DENSITY_COLOR: Record<Gate["density"], string> = {
  low: "#22a06b",
  medium: "#f2a13c",
  high: "#e5484d",
};

const GATE_POSITIONS: Record<
  string,
  { x: number; y: number; labelDx: number; labelDy: number }
> = {
  "gate-a": { x: 300, y: 40, labelDx: 0, labelDy: -22 },
  "gate-b": { x: 90, y: 120, labelDx: -10, labelDy: -22 },
  "gate-c": { x: 510, y: 160, labelDx: 10, labelDy: -22 },
  "gate-d": { x: 470, y: 260, labelDx: 10, labelDy: 26 },
  "gate-e": { x: 110, y: 250, labelDx: -10, labelDy: 26 },
};

export default function StadiumDigitalTwin({ gates }: { gates: Gate[] }) {
  return (
    <Card className="flex flex-col">
      <CardHeader
        title="Stadium Digital Twin"
        action={
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
              <span className="status-dot bg-emerald-500 animate-pulse" /> Live
            </span>
            <button
              aria-label="More options"
              className="text-[var(--text-secondary)]"
            >
              <MoreVertical size={16} />
            </button>
          </div>
        }
      />

      <div className="relative mx-5 mb-4 h-72 rounded-xl bg-slate-100 dark:bg-slate-800/60 overflow-hidden">
        <svg
          viewBox="0 0 600 300"
          className="h-full w-full"
          role="img"
          aria-label="Stadium digital twin map"
        >
          <ellipse cx="300" cy="150" rx="280" ry="140" fill="#dbe3ef" />
          <ellipse cx="300" cy="150" rx="220" ry="105" fill="#c3cfe2" />
          <ellipse cx="300" cy="150" rx="150" ry="70" fill="#2f8f4e" />
          <rect
            x="270"
            y="105"
            width="60"
            height="90"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <line
            x1="300"
            y1="105"
            x2="300"
            y2="195"
            stroke="#ffffff"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <circle
            cx="300"
            cy="150"
            r="18"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            opacity="0.7"
          />

          {gates.map((gate) => {
            const pos = GATE_POSITIONS[gate.id];
            if (!pos) return null;
            return (
              <g key={gate.id}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="10"
                  fill={DENSITY_COLOR[gate.density]}
                  stroke="white"
                  strokeWidth="2"
                />
                <text
                  x={pos.x + pos.labelDx}
                  y={pos.y + pos.labelDy}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight={600}
                  fill="#1e293b"
                >
                  {gate.name}
                </text>
                <text
                  x={pos.x + pos.labelDx}
                  y={pos.y + pos.labelDy + 12}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#64748b"
                  className="capitalize"
                >
                  {gate.density}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="absolute right-3 top-3 flex flex-col gap-1.5 rounded-lg bg-white/90 p-1 shadow-card">
          <button
            aria-label="Zoom in"
            className="rounded p-1.5 hover:bg-slate-100"
          >
            <Plus size={14} />
          </button>
          <button
            aria-label="Zoom out"
            className="rounded p-1.5 hover:bg-slate-100"
          >
            <Minus size={14} />
          </button>
          <button
            aria-label="Recenter map"
            className="rounded p-1.5 hover:bg-slate-100"
          >
            <LocateFixed size={14} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-5 px-5 pb-5 text-xs text-[var(--text-secondary)]">
        <span className="flex items-center gap-1.5">
          <span className="status-dot bg-emerald-500" /> Low Density
        </span>
        <span className="flex items-center gap-1.5">
          <span className="status-dot bg-amber-500" /> Medium Density
        </span>
        <span className="flex items-center gap-1.5">
          <span className="status-dot bg-red-500" /> High Density
        </span>
      </div>
    </Card>
  );
}
