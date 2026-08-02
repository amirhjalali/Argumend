import { beforeEach, describe, expect, it, vi } from "vitest";
import { buildTopic } from "@/data/buildTopic";
import { aiRiskData } from "@/data/topics/ai-risk";
import { moonLandingData } from "@/data/topics/moon-landing";
import type { Topic } from "@/lib/schemas/topic";

const loadTopicById = vi.hoisted(() => vi.fn());

vi.mock("@/data/topicLoader", () => ({
  hasTopicLoader: (topicId: string) =>
    topicId === "moon-landing" || topicId === "ai-risk",
  loadTopicById,
}));
vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

import { useLogicGraph } from "./useLogicGraph";

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

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

describe("useLogicGraph topic-load races", () => {
  beforeEach(() => {
    resetStore();
    loadTopicById.mockReset();
  });

  it("does not let a slower initial fallback overwrite a newer deep link", async () => {
    const moon = deferred<Topic | null>();
    const aiRisk = deferred<Topic | null>();
    loadTopicById.mockImplementation((topicId: string) =>
      topicId === "moon-landing" ? moon.promise : aiRisk.promise,
    );

    const initialLoad = useLogicGraph.getState().loadInitialTopic();
    useLogicGraph.getState().setTopic("ai-risk");
    expect(useLogicGraph.getState().currentTopicId).toBe("ai-risk");

    moon.resolve(buildTopic(moonLandingData));
    await initialLoad;
    expect(useLogicGraph.getState().currentTopicId).toBe("ai-risk");
    expect(useLogicGraph.getState().nodes).toHaveLength(0);

    aiRisk.resolve(buildTopic(aiRiskData));
    await vi.waitFor(() => {
      expect(useLogicGraph.getState().nodes.length).toBeGreaterThan(1);
    });
    expect(useLogicGraph.getState().currentTopicId).toBe("ai-risk");
    expect(useLogicGraph.getState().nodes[0]?.data.title).toContain("AGI");
  });
});
