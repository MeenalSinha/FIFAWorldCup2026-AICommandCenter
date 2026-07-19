"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Map,
  ShieldCheck,
  Activity,
  Bus,
  Users,
  Accessibility,
  Leaf,
  MessageSquare,
  FileText,
  Settings,
  Trophy,
} from "lucide-react";
import clsx from "clsx";

const NAV_ITEMS = [
  { href: "/", label: "Overview", icon: LayoutGrid },
  { href: "/live-map", label: "Live Map", icon: Map },
  { href: "/crowd-safety", label: "Crowd & Safety", icon: ShieldCheck },
  { href: "/operations", label: "Operations", icon: Activity },
  { href: "/transportation", label: "Transportation", icon: Bus },
  { href: "/volunteers", label: "Volunteers", icon: Users },
  { href: "/accessibility", label: "Accessibility", icon: Accessibility },
  { href: "/sustainability", label: "Sustainability", icon: Leaf },
  { href: "/ai-assistant", label: "AI Assistant", icon: MessageSquare },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col bg-[var(--sidebar-bg)] text-slate-200 min-h-screen">
      <div className="px-6 py-6 pb-8">
        <img
          src="/fifa-logo.png"
          alt="FIFA World Cup 2026"
          className="h-16 w-auto object-contain"
        />
      </div>

      <nav className="flex-1 px-3 space-y-1" aria-label="Primary">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-[var(--sidebar-bg-active)] text-white font-medium"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-100",
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mx-3 mb-4 rounded-xl bg-white/5 px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium">
          <span className="status-dot bg-emerald-400" />
          All Systems Operational
        </div>
        <p className="text-xs text-slate-500 mt-1">Updated 2 mins ago</p>
      </div>

      <div className="flex items-center gap-3 border-t border-white/5 px-6 py-4">
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-xs font-semibold text-white">
          RK
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-100 truncate">
            Riya Kapoor
          </p>
          <p className="text-xs text-slate-500 truncate">Operations Manager</p>
        </div>
      </div>
    </aside>
  );
}
