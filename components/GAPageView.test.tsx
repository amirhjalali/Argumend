import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const nav = vi.hoisted(() => ({ pathname: "/", search: "" }));
vi.mock("next/navigation", () => ({
  usePathname: () => nav.pathname,
  useSearchParams: () => new URLSearchParams(nav.search),
}));

const analytics = vi.hoisted(() => ({ trackPageView: vi.fn() }));
vi.mock("@/lib/analytics", () => analytics);

import { GAPageView, isUntrackedPath } from "./GAPageView";

afterEach(() => {
  analytics.trackPageView.mockReset();
});

describe("GAPageView", () => {
  it("sends a page view on an ordinary page", () => {
    nav.pathname = "/topics";
    nav.search = "";
    render(<GAPageView />);
    expect(analytics.trackPageView).toHaveBeenCalledWith("/topics", "");
  });

  it("never sends the study page, whose URL carries a Prolific participant id", () => {
    nav.pathname = "/study";
    nav.search = "PROLIFIC_PID=5f0c1e2d3b4a596877665544&STUDY_ID=6a1b2c3d4e5f60718293a4b5";
    render(<GAPageView />);
    expect(analytics.trackPageView).not.toHaveBeenCalled();
  });

  it("matches /study and its children only", () => {
    expect(isUntrackedPath("/study")).toBe(true);
    expect(isUntrackedPath("/study/x")).toBe(true);
    expect(isUntrackedPath("/studying")).toBe(false);
    expect(isUntrackedPath("/topics/study")).toBe(false);
  });
});
