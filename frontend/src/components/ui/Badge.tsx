import clsx from "clsx";

const DENSITY_STYLES: Record<string, string> = {
  low: "bg-emerald-50 text-emerald-600",
  medium: "bg-amber-50 text-amber-600",
  high: "bg-red-50 text-red-600",
};

export function DensityBadge({ level }: { level: "low" | "medium" | "high" }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        DENSITY_STYLES[level]
      )}
    >
      <span
        className={clsx("status-dot", {
          "bg-emerald-500": level === "low",
          "bg-amber-500": level === "medium",
          "bg-red-500": level === "high",
        })}
      />
      {level}
    </span>
  );
}
