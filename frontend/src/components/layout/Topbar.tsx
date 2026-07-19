"use client";

import { Search, Bell, MapPin, Moon, Sun, CloudSun, Car } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";

export default function Topbar({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 px-8 pt-8 pb-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white shadow-sm">
          {title}
        </h1>
        <p className="text-sm text-slate-100 mt-1 drop-shadow-sm">{subtitle}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 flex items-center gap-3 px-4 py-2 text-sm h-12">
          <CloudSun size={20} className="text-amber-500" />
          <div className="leading-tight">
            <p className="font-semibold text-[var(--text-primary)]">24°C</p>
            <p className="text-xs text-[var(--text-secondary)]">
              Partly Cloudy
            </p>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 flex items-center gap-3 px-4 py-2 text-sm h-12">
          <Car size={20} className="text-blue-600" />
          <div className="leading-tight">
            <p className="font-semibold text-[var(--text-primary)]">MetLife Stadium</p>
            <p className="text-xs text-[var(--text-secondary)]">
              New Jersey, USA
            </p>
          </div>
        </div>

        <label
          className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 relative flex items-center px-4 py-2 h-12"
          htmlFor="global-search"
        >
          <Search size={16} className="text-[var(--text-secondary)] mr-2" />
          <input
            id="global-search"
            type="search"
            placeholder="Search players, teams, tickets..."
            className="bg-transparent text-sm outline-none placeholder:text-[var(--text-secondary)] w-48 md:w-64"
          />
        </label>

        <button
          type="button"
          onClick={toggleTheme}
          className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 flex items-center justify-center w-12 h-12 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          type="button"
          className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 relative flex items-center justify-center w-12 h-12 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="Notifications, 3 unread"
        >
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
            3
          </span>
        </button>
      </div>
    </header>
  );
}
