import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

import { getLoadedTopics, useLogicGraph } from "./useLogicGraph";

function resetStore() {
  useLogicGraph.setState({
    nodes: [],
    edges: [],
    expandedNodes: {},
    evidenceLoadedNodes: {},
    selectedCrux: null,
    focusTargets: [],
    sequence: 0,
    currentTopicId: "moon-landing",
    currentView: "logic-map",
    _initialized: false,
  });
}

describe("useLogicGraph per-topic loading", () => {
  beforeEach(resetStore);

  it("loads and retains only topics selected during the session", async () => {
    useLogicGraph.getState().setTopic("ai-risk");

    await vi.waitFor(() => {
      expect(useLogicGraph.getState().nodes.length).toBeGreaterThan(1);
    });

    expect(getLoadedTopics().map((topic) => topic.id)).toContain("ai-risk");
    expect(getLoadedTopics().length).toBeLessThan(3);
  });

  it("falls back safely for an unknown ID", async () => {
    useLogicGraph.getState().setTopic("not-a-real-topic");

    expect(useLogicGraph.getState().currentTopicId).toBe("moon-landing");
    await vi.waitFor(() => {
      expect(useLogicGraph.getState().nodes.length).toBeGreaterThan(1);
    });
    expect(useLogicGraph.getState().currentTopicId).toBe("moon-landing");
  });

  it("applies an already loaded topic synchronously", async () => {
    useLogicGraph.getState().setTopic("ai-risk");
    await vi.waitFor(() => {
      expect(useLogicGraph.getState().nodes.length).toBeGreaterThan(1);
    });

    useLogicGraph.getState().setTopic("moon-landing");
    await vi.waitFor(() => {
      expect(useLogicGraph.getState().currentTopicId).toBe("moon-landing");
      expect(useLogicGraph.getState().nodes.length).toBeGreaterThan(1);
    });

    useLogicGraph.getState().setTopic("ai-risk");
    expect(useLogicGraph.getState().currentTopicId).toBe("ai-risk");
    expect(useLogicGraph.getState().nodes[0]?.data.title).toContain("AGI");
  });
});
