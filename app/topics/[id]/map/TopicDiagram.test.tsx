import { Suspense, lazy, type ComponentType } from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

// Phone session, after hydration.
vi.mock("@/hooks/useMediaQuery", () => ({
  useIsHydrated: () => true,
  useIsMobile: () => true,
  useMediaQuery: () => false,
}));
vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

// next/dynamic as React.lazy, so the outline mounts asynchronously the way its
// chunk does in the browser.
vi.mock("next/dynamic", () => ({
  default: (loader: () => Promise<unknown>) => {
    const Lazy = lazy(async () => {
      const loaded = (await loader()) as { default?: ComponentType } | ComponentType;
      const component =
        typeof loaded === "function" ? loaded : (loaded as { default: ComponentType }).default;
      return { default: component };
    });
    return function DynamicComponent(props: Record<string, unknown>) {
      return (
        <Suspense fallback={null}>
          <Lazy {...props} />
        </Suspense>
      );
    };
  },
}));

// Hold the topic module back until the test releases it: the order that left
// the phone diagram blank (outline mounted, topic not yet loaded).
let releaseTopic: () => void = () => {};
const topicGate = new Promise<void>((resolve) => {
  releaseTopic = resolve;
});
vi.mock("@/data/topicLoader", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/data/topicLoader")>();
  return {
    ...actual,
    loadTopicById: vi.fn(async (id: string) => {
      await topicGate;
      return actual.loadTopicById(id);
    }),
  };
});

import { TopicDiagram } from "./TopicDiagram";

describe("TopicDiagram on a phone", () => {
  afterEach(cleanup);

  it("renders the pillar outline once the topic loads after the outline mounted", async () => {
    render(<TopicDiagram topicId="climate-change" title="Climate change" />);

    // The outline chunk has mounted and is waiting on the topic module.
    expect((await screen.findByRole("status")).textContent).toContain("Loading the map");

    await act(async () => {
      releaseTopic();
      await topicGate;
    });

    const diagram = screen.getByTestId("topic-diagram");
    const pillars = await vi.waitFor(() => {
      const buttons = diagram.querySelectorAll("button[aria-expanded]");
      expect(buttons.length).toBeGreaterThan(0);
      return buttons;
    });
    expect(screen.queryByRole("status")).toBeNull();

    // Neutral outline copy: no tally, no scoreboard phrasing.
    fireEvent.click(pillars[0]);
    const text = diagram.textContent ?? "";
    expect(text).toContain("key arguments");
    expect(text).toContain("What would settle it:");
    expect(text).not.toMatch(/Decisive Test|Key Arguments|\d+ for, \d+ against/);
  });
});
