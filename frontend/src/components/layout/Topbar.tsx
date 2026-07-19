"use client";

import { Search, Bell, Cloud, MapPin, Moon, Sun } from "lucide-react";
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
        <h1 className="font-display text-2xl font-semibold text-[var(--text-primary)]">{title}</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">{subtitle}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="app-card flex items-center gap-2 px-4 py-2 text-sm">
          <Cloud size={16} className="text-sky-500" />
          <div className="leading-tight">
            <p className="font-medium">24C</p>
            <p className="text-xs text-[var(--text-secondary)]">Partly Cloudy</p>
          </div>
        </div>

        <div className="app-card flex items-center gap-2 px-4 py-2 text-sm">
          <MapPin size={16} className="text-blue-500" />
          <div className="leading-tight">
            <p className="font-medium">MetLife Stadium</p>
            <p className="text-xs text-[var(--text-secondary)]">New Jersey, USA</p>
          </div>
        </div>

        <label className="app-card relative flex items-center px-4 py-2" htmlFor="global-search">
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
          className="app-card p-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          type="button"
          className="app-card relative p-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
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
