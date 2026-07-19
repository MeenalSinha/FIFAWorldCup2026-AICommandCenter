"use client";

import Topbar from "@/components/layout/Topbar";
import { Card, CardHeader } from "@/components/ui/Card";
import { useTheme } from "@/components/layout/ThemeProvider";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Topbar title="Settings" subtitle="Platform, language and notification preferences" />
      <div className="px-8 pb-10 max-w-xl">
        <Card>
          <CardHeader title="Preferences" />
          <div className="px-5 pb-5 space-y-4 text-sm">
            <label className="flex items-center justify-between">
              <span>Dark mode</span>
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={theme === "dark"}
                onChange={toggleTheme}
                aria-label="Toggle dark mode"
              />
            </label>
            <label className="flex items-center justify-between">
              <span>Live sensor updates</span>
              <input type="checkbox" defaultChecked className="h-4 w-4" aria-label="Toggle live sensor updates" />
            </label>
            <div>
              <span className="block mb-1">Language</span>
              <select className="w-full rounded-lg border border-[var(--border-soft)] bg-transparent px-3 py-2">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>Portuguese</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
