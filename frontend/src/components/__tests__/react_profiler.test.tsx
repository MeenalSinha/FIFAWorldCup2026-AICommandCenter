import { Profiler, type ProfilerOnRenderCallback } from "react";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import OperationsOverview from "@/components/dashboard/OperationsOverview";
import AIInsightsPanel from "@/components/dashboard/AIInsightsPanel";
import SustainabilityScore from "@/components/dashboard/SustainabilityScore";
import { DEFAULT_STATE } from "@/lib/defaults";

/**
 * Uses React's own Profiler API (the same instrumentation React
 * DevTools' Profiler tab is built on) rather than a browser tool --
 * this measures actual React commit-phase timing, not layout/paint, so
 * it's real evidence of render cost even though it ran under jsdom.
 * What it does NOT capture: paint time, layout thrashing, or anything
 * downstream of the DOM commit -- that's the part that still needs a
 * real browser (see docs/AUDIT_EVIDENCE.md).
 */
function profileRender(ui: React.ReactElement): { actualDuration: number; phase: string } {
  const results: { actualDuration: number; phase: string }[] = [];
  const onRender: ProfilerOnRenderCallback = (_id, phase, actualDuration) => {
    results.push({ phase, actualDuration });
  };

  render(
    <Profiler id="profiled" onRender={onRender}>
      {ui}
    </Profiler>
  );

  return results[0];
}

describe("React Profiler: real commit-phase timing (jsdom)", () => {
  it("OperationsOverview mounts within a reasonable commit budget", () => {
    const result = profileRender(<OperationsOverview overview={DEFAULT_STATE.operations} />);
    expect(result.phase).toBe("mount");
    expect(result.actualDuration).toBeLessThan(100);
  });

  it("AIInsightsPanel (4 insights) mounts within a reasonable commit budget", () => {
    const result = profileRender(<AIInsightsPanel insights={DEFAULT_STATE.insights} />);
    expect(result.phase).toBe("mount");
    expect(result.actualDuration).toBeLessThan(100);
  });

  it("SustainabilityScore (SVG donut chart) mounts within a reasonable commit budget", () => {
    const result = profileRender(<SustainabilityScore metrics={DEFAULT_STATE.sustainability} />);
    expect(result.phase).toBe("mount");
    expect(result.actualDuration).toBeLessThan(100);
  });
});
