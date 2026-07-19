import { describe, expect, it } from "vitest";
import { DEFAULT_STATE, DEFAULT_SUSTAINABILITY, DEFAULT_TRANSPORTATION } from "@/lib/defaults";

describe("fallback dashboard defaults", () => {
  it("provides a gate entry for every density level referenced in the UI", () => {
    const densities = new Set(DEFAULT_STATE.gates.map((g) => g.density));
    expect(densities.has("low")).toBe(true);
    expect(densities.has("medium")).toBe(true);
    expect(densities.has("high")).toBe(true);
  });

  it("keeps sustainability metrics in sync between digital twin state and dashboard defaults", () => {
    expect(DEFAULT_SUSTAINABILITY.metrics).toEqual(DEFAULT_STATE.sustainability);
  });

  it("keeps transportation overview in sync with digital twin state", () => {
    expect(DEFAULT_TRANSPORTATION.overview).toEqual(DEFAULT_STATE.transportation);
  });

  it("gives every insight a non-negative ETA", () => {
    for (const insight of DEFAULT_STATE.insights) {
      expect(insight.eta_minutes).toBeGreaterThanOrEqual(0);
    }
  });
});
