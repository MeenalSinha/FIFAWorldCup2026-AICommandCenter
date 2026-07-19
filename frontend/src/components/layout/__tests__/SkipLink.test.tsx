import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import SkipLink from "@/components/layout/SkipLink";

describe("SkipLink", () => {
  it("links to the main content landmark for keyboard users", () => {
    render(<SkipLink />);
    const link = screen.getByRole("link", { name: /skip to main content/i });
    expect(link).toHaveAttribute("href", "#main-content");
  });
});
