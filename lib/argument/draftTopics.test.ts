import { describe, expect, it } from "vitest";
import { loadArgumentTopic } from "./draftTopics";
import { argumentTopicIds } from "./topicIds";

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

  it("gives the capitalism concentration and reallocation cruxes resolutions and balanced direct evidence", () => {
    const topic = loadArgumentTopic("capitalism-after-ai");
    expect(topic).not.toBeNull();

    for (const claimId of ["c-ai-ownership-stays-concentrated", "c-reallocation-keeps-pace"]) {
      const claim = topic!.graph.nodes.find((node) => node.id === claimId);
      expect(claim).toMatchObject({ type: "claim", resolution: { kind: "future-observable" } });

      const polarities = topic!.graph.edges
        .filter((edge) => edge.type === "evidences" && edge.to === claimId)
        .map((edge) => edge.polarity);
      expect(polarities).toContain("supporting");
      expect(polarities).toContain("challenging");
    }
  });

  it("connects the Israel leverage and regional-stability cruxes to the existing balanced record", () => {
    const topic = loadArgumentTopic("us-israel-support");
    expect(topic).not.toBeNull();

    expect(topic!.graph.edges).toContainEqual(
      expect.objectContaining({
        from: "e-biden-bomb-pause-may2024",
        to: "c-aid-buys-leverage",
        type: "evidences",
        polarity: "qualifying",
      })
    );

    const regionalPolarities = topic!.graph.edges
      .filter(
        (edge) => edge.type === "evidences" && edge.to === "c-regional-stability-depends-on-alliance"
      )
      .map((edge) => edge.polarity);
    expect(regionalPolarities).toContain("supporting");
    expect(regionalPolarities).toContain("challenging");
  });

  it("does not encode duplicate source-target-relation triples in flagship graphs", () => {
    for (const topicId of ["capitalism-after-ai", "us-israel-support"]) {
      const topic = loadArgumentTopic(topicId);
      expect(topic).not.toBeNull();

      const triples = topic!.graph.edges.map((edge) => `${edge.from}|${edge.to}|${edge.type}`);
      expect(new Set(triples).size).toBe(triples.length);
    }
  });

  it("writes the text readers see for readers, not as notes about the research pipeline", () => {
    // statusBasis shows under "Why it is marked …", relevance in paste
    // matches, interest and unverified flags on every evidence card.
    const PIPELINE = /\bcorpus\b|underlying research|this draft|addendum|extract(ion|ed as)|inference rule|guideline/i;
    const SHOUTED = /\bUNVERIFIED\b/;
    const leaks: string[] = [];
    for (const id of argumentTopicIds) {
      for (const node of loadArgumentTopic(id)!.graph.nodes) {
        const texts = [
          node.type === "claim" ? node.statusBasis : undefined,
          node.type === "evidence" ? node.relevance : undefined,
          node.type === "evidence" ? node.source.interest : undefined,
          ...(node.type === "evidence" ? (node.unverifiedFlags ?? []) : []),
        ];
        for (const text of texts) if (text && (PIPELINE.test(text) || SHOUTED.test(text))) leaks.push(`${id}/${node.id}: ${text}`);
      }
    }
    expect(leaks).toEqual([]);
  });
});
