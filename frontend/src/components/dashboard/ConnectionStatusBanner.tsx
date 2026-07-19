"use client";

import { WifiOff } from "lucide-react";

export default function ConnectionStatusBanner({
  isBackendReachable,
}: {
  isBackendReachable: boolean;
}) {
  if (isBackendReachable) return null;

  return (
    <div
      role="status"
      className="mx-8 mb-4 flex items-center gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-300"
    >
      <WifiOff size={16} />
      Showing cached demo data -- the live backend is unreachable right now.
    </div>
  );
}
