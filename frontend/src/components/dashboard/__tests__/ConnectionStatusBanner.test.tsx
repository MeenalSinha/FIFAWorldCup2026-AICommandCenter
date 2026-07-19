import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ConnectionStatusBanner from "@/components/dashboard/ConnectionStatusBanner";

describe("ConnectionStatusBanner", () => {
  it("renders nothing when the backend is reachable", () => {
    const { container } = render(<ConnectionStatusBanner isBackendReachable={true} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("shows a warning when the backend is unreachable", () => {
    render(<ConnectionStatusBanner isBackendReachable={false} />);
    expect(screen.getByRole("status")).toHaveTextContent(/cached demo data/i);
  });
});
