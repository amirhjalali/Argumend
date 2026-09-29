import "@/test/setup-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";

const flow = vi.hoisted(() => ({ fitView: vi.fn(), zoomIn: vi.fn(), zoomOut: vi.fn() }));

vi.mock("@/hooks/useMediaQuery", () => ({ useMediaQuery: () => false }));
vi.mock("@xyflow/react", () => ({
  useReactFlow: () => flow,
  useViewport: () => ({ zoom: 0.75 }),
}));

import { ZoomIndicator } from "./ZoomIndicator";
import { FIT_VIEW } from "@/lib/diagram/layout";

describe("diagram zoom controls", () => {
  beforeEach(() => {
    flow.fitView.mockReset();
    window.sessionStorage.setItem("argumend-drag-hint", "1");
  });

  afterEach(cleanup);

  it("labels every control and reports the zoom level", () => {
    const view = render(<ZoomIndicator />);
    expect(view.getByRole("status", { name: "Zoom level: 75%" })).toBeTruthy();
    fireEvent.click(view.getByRole("button", { name: "Zoom out" }));
    fireEvent.click(view.getByRole("button", { name: "Zoom in" }));
    expect(flow.zoomOut).toHaveBeenCalled();
    expect(flow.zoomIn).toHaveBeenCalled();
  });

  it("fits the whole tree the same way the canvas frames it on load", () => {
    const view = render(<ZoomIndicator />);
    fireEvent.click(view.getByRole("button", { name: "Fit the whole diagram in view" }));
    expect(flow.fitView).toHaveBeenCalledWith({ ...FIT_VIEW, duration: 450 });
  });

  it("draws keyboard focus with the one focus token", () => {
    const view = render(<ZoomIndicator />);
    for (const button of view.getAllByRole("button")) {
      expect(button.className).toContain("focus-visible:ring-focus");
    }
  });
});
