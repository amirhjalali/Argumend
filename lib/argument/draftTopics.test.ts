import { describe, expect, it } from "vitest";
import { loadArgumentTopic } from "./draftTopics";

describe("draft argument topics", () => {
  it("loads and caches the AI mass-unemployment flagship graph", () => {
    const first = loadArgumentTopic("ai-mass-unemployment");
    const second = loadArgumentTopic("ai-mass-unemployment");

    expect(first).not.toBeNull();
    expect(second).toBe(first);
    expect(first!.graph.nodes.length).toBeGreaterThan(90);
    expect(first!.cruxes.length).toBeGreaterThanOrEqual(3);
  });

  it("returns null for unknown draft ids", () => {
    expect(loadArgumentTopic("missing-topic")).toBeNull();
  });

  it("only returns cruxes whose claims exist in the graph", () => {
    const topic = loadArgumentTopic("ai-mass-unemployment");
    expect(topic).not.toBeNull();

    const nodeIds = new Set(topic!.graph.nodes.map((node) => node.id));
    for (const crux of topic!.cruxes) {
      expect(nodeIds.has(crux.claimId)).toBe(true);
    }
  });
});
