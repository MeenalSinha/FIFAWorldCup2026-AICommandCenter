"use client";

import { MoreVertical, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/Card";

export default function AIMatchCompanion() {
  return (
    <Card className="flex flex-col">
      <CardHeader
        title="AI Match Companion"
        action={
          <button aria-label="More options" className="text-[var(--text-secondary)]">
            <MoreVertical size={16} />
          </button>
        }
      />
      <div className="px-5 pb-5 flex flex-col gap-4 flex-1">
        <div>
          <p className="font-display text-lg font-semibold">Welcome back, Riya</p>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Here is what is happening at your stadium today.
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-xs text-[var(--text-secondary)]">Match Day</dt>
            <dd className="font-medium mt-0.5">Group Stage</dd>
          </div>
          <div>
            <dt className="text-xs text-[var(--text-secondary)]">Next Match</dt>
            <dd className="font-medium mt-0.5">ARG vs FRA - Today, 8:00 PM</dd>
          </div>
          <div>
            <dt className="text-xs text-[var(--text-secondary)]">Attendance</dt>
            <dd className="font-medium mt-0.5">82,500</dd>
          </div>
          <div>
            <dt className="text-xs text-[var(--text-secondary)]">Security Level</dt>
            <dd className="font-medium mt-0.5 flex items-center gap-1.5">
              <span className="status-dot bg-amber-500" /> Medium
            </dd>
          </div>
        </dl>

        <Link
          href="/ai-assistant"
          className="flex items-center justify-between rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Sparkles size={16} />
            Ask AI Assistant
          </span>
          <ArrowRight size={16} />
        </Link>

        <div className="relative mt-auto h-32 rounded-xl overflow-hidden bg-gradient-to-b from-slate-700 to-slate-900">
          <div className="absolute inset-0 flex items-end justify-center pb-3">
            <div className="h-10 w-4/5 rounded-t-full bg-gradient-to-t from-emerald-700/70 to-transparent" />
          </div>
        </div>
      </div>
    </Card>
  );
}
