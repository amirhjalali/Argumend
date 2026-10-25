import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { loadTopicById } from "@/data/topicLoader";
import { buildDiagram, type DiagramModel } from "@/lib/diagram/model";
import { legacyTopicPage } from "@/lib/topicPage/legacy";
import type { Topic } from "@/lib/schemas/topic";

const viewport = vi.hoisted(() => ({ hydrated: true, mobile: true }));
vi.mock("@/hooks/useMediaQuery", () => ({
  useIsHydrated: () => viewport.hydrated,
  useIsMobile: () => viewport.mobile,
  useMediaQuery: () => false,
}));
vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));
// The canvas is desktop-only; on a phone it must never render.
vi.mock("@/components/DesktopCanvas", () => ({ default: () => <div data-testid="canvas" /> }));

import { TopicDiagram } from "./TopicDiagram";

let topic: Topic;
let diagram: DiagramModel;

beforeAll(async () => {
  topic = (await loadTopicById("climate-change"))!;
  diagram = buildDiagram(topic);
});

beforeEach(() => {
  viewport.hydrated = true;
  viewport.mobile = true;
});

afterEach(cleanup);

describe("TopicDiagram desktop loading", () => {
  it("shows a desktop-only loading status before the screen size is known", () => {
    viewport.hydrated = false;
    render(<TopicDiagram diagram={diagram} />);

    const status = screen.getByRole("status");
    expect(status.textContent).toBe("Loading diagram…");
    expect(status.getAttribute("aria-live")).toBe("polite");
    expect(status.parentElement?.className).toContain("hidden md:block");
    expect(screen.queryByTestId("canvas")).toBeNull();
    expect(screen.getByTestId("topic-diagram").querySelector("button[aria-expanded]")).toBeTruthy();
  });

  it("announces the pending desktop canvas and removes the status when it loads", async () => {
    viewport.mobile = false;
    render(<TopicDiagram diagram={diagram} />);

    expect(screen.getByRole("status").textContent).toBe("Loading diagram…");
    await waitFor(() => expect(screen.getByTestId("canvas")).toBeTruthy());
    expect(screen.queryByRole("status")).toBeNull();
  });
});

describe("TopicDiagram on a phone", () => {
  it("renders the outline straight from the model: no loading state, no canvas", () => {
    render(<TopicDiagram diagram={diagram} />);
    const outline = screen.getByTestId("topic-diagram");
    expect(screen.queryByRole("status")).toBeNull();
    expect(within(outline).queryByTestId("canvas")).toBeNull();

    const { page, cruxes } = legacyTopicPage(topic);
    expect(within(outline).getByRole("heading", { level: 2 }).textContent).toBe(page.title);
    const toggles = outline.querySelectorAll("button[aria-expanded]");
    expect(toggles).toHaveLength(cruxes.length);
    cruxes.forEach((crux, i) => expect(toggles[i].textContent).toContain(crux.question));
  });

  it("calls the phone view an outline, and keeps \"Diagram\" for larger screens", () => {
    render(<TopicDiagram diagram={diagram} />);
    // Breakpoint-only spans (no hydration-dependent text): CSS picks one.
    const phone = screen.getByText("Outline");
    const desktop = screen.getByText("Diagram");
    expect(phone.className).toContain("md:hidden");
    expect(desktop.className).toContain("hidden md:inline");
  });

  it("opens a crux onto its two sides and their evidence, in the page's words", () => {
    render(<TopicDiagram diagram={diagram} />);
    const outline = screen.getByTestId("topic-diagram");
    const first = outline.querySelector<HTMLButtonElement>("button[aria-expanded]")!;
    expect(first.disabled).toBe(false);
    fireEvent.click(first);
    expect(first.getAttribute("aria-expanded")).toBe("true");

    const panel = document.getElementById(first.getAttribute("aria-controls")!)!;
    const text = panel.textContent ?? "";
    const { cruxes } = legacyTopicPage(topic);
    expect(text).toContain("What would settle it");
    expect(text).toContain("Says yes");
    expect(text).toContain("Says no");
    for (const item of cruxes[0].evidence) expect(text).toContain(item.title);

    // Neutral outline: no tally, no scores, no scoreboard phrasing.
    const all = outline.textContent ?? "";
    expect(all).not.toMatch(/\/40\b|\/100\b|Decisive Test|Key Arguments|\d+ for, \d+ against/);
  });
});
