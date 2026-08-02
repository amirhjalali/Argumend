import "@/test/setup-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";

vi.mock("framer-motion", async () => {
  const React = await import("react");
  const stripMotionProps = ({
    initial: _initial,
    animate: _animate,
    exit: _exit,
    transition: _transition,
    ...props
  }: React.HTMLAttributes<HTMLElement> & {
    initial?: unknown;
    animate?: unknown;
    exit?: unknown;
    transition?: unknown;
  }) => props;
  const MotionButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    (props, ref) => <button ref={ref} {...(stripMotionProps(props) as React.ButtonHTMLAttributes<HTMLButtonElement>)} />
  );
  MotionButton.displayName = "MotionButton";
  const MotionDiv = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    (props, ref) => <div ref={ref} {...(stripMotionProps(props) as React.HTMLAttributes<HTMLDivElement>)} />
  );
  MotionDiv.displayName = "MotionDiv";

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
      button: MotionButton,
      div: MotionDiv,
    },
  };
});

const chrome = vi.hoisted(() => ({
  fitView: vi.fn(),
  nodes: [
    { id: "root", data: { title: "Root claim", variant: "meta" } },
    { id: "pillar", data: { title: "Evidence pillar", variant: "pillar" } },
  ],
  edges: [{ source: "root", target: "pillar" }],
  focusTargets: ["pillar"],
}));

vi.mock("@/hooks/useMediaQuery", () => ({ useMediaQuery: () => false }));
vi.mock("@/hooks/useLogicGraph", () => ({
  useLogicGraph: (selector: (state: typeof chrome) => unknown) => selector(chrome),
}));
vi.mock("@xyflow/react", () => ({
  useReactFlow: () => ({
    fitView: chrome.fitView,
    zoomIn: vi.fn(),
    zoomOut: vi.fn(),
  }),
  useViewport: () => ({ zoom: 0.75 }),
}));

import { MapLegend } from "./MapLegend";
import { NavigationPath } from "./NavigationPath";
import { ZoomIndicator } from "./ZoomIndicator";

describe("graph chrome accessibility", () => {
  beforeEach(() => {
    chrome.fitView.mockReset();
    window.sessionStorage.setItem("argumend-drag-hint", "1");
  });

  afterEach(cleanup);

  it("exposes the legend as a disclosure and returns focus after collapse", async () => {
    const view = render(<MapLegend />);
    const show = view.getByRole("button", { name: "Show map legend" });
    expect(show.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(show);
    const close = view.getByRole("button", { name: "Collapse legend" });
    expect(close.getAttribute("aria-controls")).toBe("map-legend-panel");
    close.focus();
    fireEvent.click(close);

    const restoredToggle = await view.findByRole("button", { name: "Show map legend" });
    await waitFor(() => expect(document.activeElement).toBe(restoredToggle));
  });

  it("provides labelled path and zoom controls", () => {
    const pathView = render(<NavigationPath />);
    const current = pathView.getByRole("button", { name: "Navigate to: Evidence pillar" });
    expect(current.getAttribute("aria-current")).toBe("location");
    fireEvent.click(current);
    expect(chrome.fitView).toHaveBeenCalled();
    pathView.unmount();

    const zoomView = render(<ZoomIndicator />);
    expect(zoomView.getByRole("status", { name: "Zoom level: 75%" })).toBeTruthy();
    expect(zoomView.getByRole("button", { name: "Zoom out" })).toBeTruthy();
    expect(zoomView.getByRole("button", { name: "Zoom in" })).toBeTruthy();
    fireEvent.click(zoomView.getByRole("button", { name: "Fit to view" }));
    expect(chrome.fitView).toHaveBeenCalledWith({ padding: 0.08, duration: 450 });
  });
});
