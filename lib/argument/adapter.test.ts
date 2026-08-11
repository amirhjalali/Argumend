import { describe, expect, it } from "vitest";
import { buildTopic } from "@/data/buildTopic";
import { ai2027Data } from "@/data/topics/ai-2027";
import { ArgumentGraphSchema } from "@/lib/schemas/argument";
import { adaptTopicToArgumentGraph } from "./adapter";
import { validateArgumentGraph } from "./validate";

describe("adaptTopicToArgumentGraph", () => {
  it("adapts the real AI 2027 topic into a parseable v1.1 graph", () => {
    const topic = buildTopic(ai2027Data);
    const result = adaptTopicToArgumentGraph(topic);

    expect(ArgumentGraphSchema.safeParse(result.graph).success).toBe(true);
    expect(result.topicMeta).toEqual({
      metaClaim: topic.meta_claim,
      balance: topic.balance,
      weight: topic.weight,
      verdictSource: "legacy",
    });
    expect(result.reviewFlags.length).toBeGreaterThan(0);
  });

  it("emits no edge-matrix validation errors", () => {
    const topic = buildTopic(ai2027Data);
    const result = adaptTopicToArgumentGraph(topic);

    const matrixErrors = validateArgumentGraph(result.graph).filter(
      (issue) => issue.severity === "error" && issue.rule === "edge-matrix"
    );
    expect(matrixErrors).toEqual([]);
  });

  it("inverts legacy side when evidence is attached to a skeptic-premise claim", () => {
    const topic = buildTopic(ai2027Data);
    const result = adaptTopicToArgumentGraph(topic);
    const firstForEvidence = topic.pillars
      .flatMap((pillar) => pillar.evidence ?? [])
      .find((evidence) => evidence.side === "for");

    expect(firstForEvidence).toBeDefined();
    if (firstForEvidence === undefined) return;

    const evidenceNode = result.graph.nodes.find(
      (node) =>
        node.type === "evidence" &&
        node.finding === firstForEvidence.description
    );
    expect(evidenceNode?.type).toBe("evidence");
    if (evidenceNode?.type !== "evidence") return;

    const skepticEdge = result.graph.edges.find(
      (edge) =>
        edge.from === evidenceNode.id &&
        edge.type === "evidences" &&
        edge.to.endsWith("-skeptic")
    );

    expect(skepticEdge).toMatchObject({
      type: "evidences",
      polarity: "challenging",
    });
  });
});
