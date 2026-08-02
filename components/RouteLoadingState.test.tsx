import "@/test/setup-dom";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { RouteLoadingState } from "./RouteLoadingState";

describe("RouteLoadingState", () => {
  afterEach(cleanup);

  it("announces the route transition without exposing decorative skeletons", () => {
    const view = render(<RouteLoadingState label="Loading your dashboard" />);
    const status = view.getByRole("status");

    expect(status.getAttribute("aria-busy")).toBe("true");
    expect(status.textContent).toBe("Loading your dashboard");
    expect(status.querySelector('[aria-hidden="true"]')).toBeTruthy();
  });

  it("uses a compact layout for embedded previews", () => {
    const view = render(<RouteLoadingState label="Loading argument preview" compact />);

    expect(view.getByRole("status").className).toContain("max-w-[600px]");
    expect(view.container.querySelectorAll('[aria-hidden="true"] .h-40')).toHaveLength(2);
  });
});
