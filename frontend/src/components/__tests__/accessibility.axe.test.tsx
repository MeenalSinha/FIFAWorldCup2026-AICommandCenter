import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { expect as vitestExpect } from "vitest";

import Sidebar from "@/components/layout/Sidebar";
import SkipLink from "@/components/layout/SkipLink";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import AIInsightsPanel from "@/components/dashboard/AIInsightsPanel";
import OperationsOverview from "@/components/dashboard/OperationsOverview";
import SustainabilityScore from "@/components/dashboard/SustainabilityScore";
import TransportationOverview from "@/components/dashboard/TransportationOverview";
import { DEFAULT_STATE, DEFAULT_TRANSPORTATION } from "@/lib/defaults";

vitestExpect.extend(toHaveNoViolations);

/**
 * IMPORTANT SCOPE NOTE: axe-core under jsdom can validate DOM structure,
 * ARIA usage, landmark roles, form labeling, and heading order -- rules
 * that don't depend on actual rendering/layout. It CANNOT validate
 * color-contrast, focus-order-as-rendered, or target-size, because
 * jsdom does no layout or paint. Those rules are disabled below and
 * must be checked in a real browser (blocked in this sandbox -- see
 * docs/TESTING.md) before shipping.
 */
const JSDOM_INAPPLICABLE_RULES = {
  "color-contrast": { enabled: false },
  "target-size": { enabled: false },
};

describe("accessibility: structural axe-core scan (jsdom-only rules)", () => {
  it("Sidebar navigation has no structural/ARIA violations", async () => {
    const { container } = render(
      <ThemeProvider>
        <Sidebar />
      </ThemeProvider>
    );
    const results = await axe(container, { rules: JSDOM_INAPPLICABLE_RULES });
    expect(results).toHaveNoViolations();
  });

  it("SkipLink has no structural/ARIA violations", async () => {
    const { container } = render(<SkipLink />);
    const results = await axe(container, { rules: JSDOM_INAPPLICABLE_RULES });
    expect(results).toHaveNoViolations();
  });

  it("AIInsightsPanel (populated) has no structural/ARIA violations", async () => {
    const { container } = render(<AIInsightsPanel insights={DEFAULT_STATE.insights} />);
    const results = await axe(container, { rules: JSDOM_INAPPLICABLE_RULES });
    expect(results).toHaveNoViolations();
  });

  it("AIInsightsPanel (empty state) has no structural/ARIA violations", async () => {
    const { container } = render(<AIInsightsPanel insights={[]} />);
    const results = await axe(container, { rules: JSDOM_INAPPLICABLE_RULES });
    expect(results).toHaveNoViolations();
  });

  it("OperationsOverview has no structural/ARIA violations", async () => {
    const { container } = render(<OperationsOverview overview={DEFAULT_STATE.operations} />);
    const results = await axe(container, { rules: JSDOM_INAPPLICABLE_RULES });
    expect(results).toHaveNoViolations();
  });

  it("SustainabilityScore has no structural/ARIA violations", async () => {
    const { container } = render(<SustainabilityScore metrics={DEFAULT_STATE.sustainability} />);
    const results = await axe(container, { rules: JSDOM_INAPPLICABLE_RULES });
    expect(results).toHaveNoViolations();
  });

  it("TransportationOverview has no structural/ARIA violations", async () => {
    const { container } = render(<TransportationOverview overview={DEFAULT_TRANSPORTATION.overview} />);
    const results = await axe(container, { rules: JSDOM_INAPPLICABLE_RULES });
    expect(results).toHaveNoViolations();
  });
});
