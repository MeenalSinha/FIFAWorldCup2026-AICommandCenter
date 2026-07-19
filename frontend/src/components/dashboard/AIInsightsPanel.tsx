"use client";

import { ChevronRight, Users, Droplet, ParkingSquare, Accessibility } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import type { Insight } from "@/lib/api";

const ICONS: Record<string, typeof Users> = {
  crowd: Users,
  concessions: Droplet,
  transportation: ParkingSquare,
  accessibility: Accessibility,
};

const SEVERITY_BG: Record<Insight["severity"], string> = {
  high: "bg-red-50 text-red-600",
  medium: "bg-blue-50 text-blue-600",
  low: "bg-emerald-50 text-emerald-600",
};

export default function AIInsightsPanel({ insights }: { insights: Insight[] }) {
  return (
    <Card className="flex flex-col">
      <CardHeader title="AI Insights" />
      {insights.length === 0 ? (
        <p className="px-5 pb-5 text-sm text-[var(--text-secondary)]">
          No active insights right now -- operations are running within normal parameters.
        </p>
      ) : (
        <ul className="flex flex-col gap-2 px-3 pb-3">
          {insights.map((insight) => {
            const Icon = ICONS[insight.category] ?? Users;
            return (
              <li key={insight.id}>
                <button
                  type="button"
                  className="w-full flex items-start gap-3 rounded-xl px-2.5 py-3 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${SEVERITY_BG[insight.severity]}`}>
                    <Icon size={16} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium leading-snug">{insight.title}</span>
                    <span className="block text-xs text-[var(--text-secondary)] mt-0.5">{insight.detail}</span>
                  </span>
                  <ChevronRight size={16} className="mt-1 text-[var(--text-secondary)] shrink-0" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <div className="px-5 pb-5">
        <a href="/reports" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
          View All Insights <ChevronRight size={14} />
        </a>
      </div>
    </Card>
  );
}
