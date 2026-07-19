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

      <div className="relative mx-5 mb-4 h-72 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <img
          src="/stadium-3d.png"
          alt="Stadium 3D Digital Twin"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {gates.map((gate) => {
          const pos = GATE_POSITIONS[gate.id];
          if (!pos) return null;

          // Convert arbitrary SVG coordinates to rough percentages for absolute positioning
          const pctX = (pos.x / 600) * 100;
          const pctY = (pos.y / 300) * 100;
          return (
            <div
              key={gate.id}
              className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pctX}%`, top: `${pctY}%` }}
            >
              <div className="bg-white rounded-lg px-2 py-1 shadow-card flex flex-col items-center text-center leading-none mb-1">
                <p className="text-[10px] font-bold text-slate-800">
                  {gate.name}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span
                    className="status-dot"
                    style={{ backgroundColor: DENSITY_COLOR[gate.density] }}
                  />
                  <p className="text-[9px] text-slate-500 capitalize">
                    {gate.density}
                  </p>
                </div>
              </div>
              <div
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: DENSITY_COLOR[gate.density] }}
              />
            </div>
          );
        })}

        <div className="absolute right-3 top-3 flex flex-col gap-1.5 rounded-lg bg-white/90 p-1 shadow-card text-slate-600">
          <button
            aria-label="Toggle 3D"
            className="rounded p-1.5 hover:bg-slate-100 font-bold text-xs"
          >
            3D
          </button>
          <button
            aria-label="Zoom in"
            className="rounded p-1.5 hover:bg-slate-100"
          >
            <Plus size={16} />
          </button>
          <button
            aria-label="Zoom out"
            className="rounded p-1.5 hover:bg-slate-100"
          >
            <Minus size={16} />
          </button>
          <button
            aria-label="Recenter map"
            className="rounded p-1.5 hover:bg-slate-100"
          >
            <LocateFixed size={16} />
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
