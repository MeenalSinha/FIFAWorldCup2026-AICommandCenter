import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DensityBadge } from "@/components/ui/Badge";

describe("DensityBadge", () => {
  it.each([
    ["low", "low"],
    ["medium", "medium"],
    ["high", "high"],
  ] as const)("renders the %s density label", (level, expected) => {
    render(<DensityBadge level={level} />);
    expect(screen.getByText(expected)).toBeInTheDocument();
  });
});
