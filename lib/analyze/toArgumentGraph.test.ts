import { describe, expect, it } from "vitest";
import type { ExtractedArguments } from "./extractor";
import { extractArgumentsOffline } from "./offline";
import { extractedToArgumentGraph } from "./toArgumentGraph";
import { ArgumentGraphSchema } from "@/lib/schemas/argument";
import { validateArgumentGraph } from "@/lib/argument/validate";

const REMOTE_WORK_SAMPLE = `The debate over whether remote work should remain a default option has become sharper as leases come up for renewal. Supporters argue that remote work improves retention and widens hiring pools because employees can avoid long commutes and companies can recruit beyond a single metro area. A 2025 internal survey at a software firm reported that 68 percent of employees would trade some compensation to keep flexible work.

Critics counter that remote work can slow mentoring and weaken coordination for junior staff. Managers in the article say that product launches took longer when design, engineering, and sales teams relied entirely on asynchronous updates. They also argue that offices create faster informal feedback loops for complex projects.

Supporters respond that hybrid norms and better documentation reduce those coordination risks. They point to teams that set core collaboration hours and saw support ticket resolution improve by 12 percent. Critics remain skeptical because those teams were already high-performing, so the disagreement turns on whether the measured gains generalize to new employees and struggling teams.`;

function validationErrors(extracted: ExtractedArguments) {
  const { graph } = extractedToArgumentGraph(extracted, { topicId: "remote-work" });
  return validateArgumentGraph(graph).filter((issue) => issue.severity === "error");
}

describe("extractedToArgumentGraph", () => {
  it("converts real offline extraction into a valid argument graph", () => {
    const extracted = extractArgumentsOffline(REMOTE_WORK_SAMPLE, "article");
    const { graph, reviewFlags } = extractedToArgumentGraph(extracted, {
      topicId: "remote-work",
    });

    expect(ArgumentGraphSchema.safeParse(graph).success).toBe(true);
    expect(validateArgumentGraph(graph).filter((issue) => issue.severity === "error")).toEqual([]);

    const positions = graph.nodes.filter((node) => node.type === "position");
    expect(positions.map((position) => position.id).sort()).toEqual([
      "position-against",
      "position-for",
    ]);

    for (const position of positions) {
      expect(
        graph.edges.some(
          (edge) => edge.to === position.id && edge.type === "supports"
        )
      ).toBe(true);
    }

    const evidenceNodes = graph.nodes.filter((node) => node.type === "evidence");
    expect(evidenceNodes.length).toBeGreaterThan(0);
    for (const evidence of evidenceNodes) {
      expect(
        graph.edges.some(
          (edge) =>
            edge.from === evidence.id &&
            edge.type === "evidences" &&
            edge.polarity === "supporting"
        )
      ).toBe(true);
    }

    expect(reviewFlags.length).toBeGreaterThan(0);
    expect(reviewFlags.some((flag) => flag.includes("epistemicType defaulted"))).toBe(true);
  });

  it("is deterministic for identical extraction input", () => {
    const extracted = extractArgumentsOffline(REMOTE_WORK_SAMPLE, "article");

    const first = extractedToArgumentGraph(extracted, { topicId: "remote-work" });
    const second = extractedToArgumentGraph(extracted, { topicId: "remote-work" });

    expect(first.graph).toStrictEqual(second.graph);
    expect(first.reviewFlags).toStrictEqual(second.reviewFlags);
  });

  it("keeps a one-sided minimal extraction validator-clean without fabricating opposition", () => {
    const extracted: ExtractedArguments = {
      topic: "Remote work improves productivity",
      positions: [
        {
          side: "for",
          arguments: [
            {
              claim: "Remote work gives employees more focus time",
            },
          ],
        },
      ],
      identifiedCruxes: [],
      potentialFallacies: [],
      detectedBiases: [],
      summary: "",
      confidence: 0.5,
    };

    const { graph, reviewFlags } = extractedToArgumentGraph(extracted, {
      topicId: "minimal",
    });

    expect(ArgumentGraphSchema.safeParse(graph).success).toBe(true);
    expect(validationErrors(extracted)).toEqual([]);
    expect(graph.nodes).toHaveLength(1);
    expect(graph.nodes[0]?.type).toBe("question");
    expect(reviewFlags.some((flag) => flag.includes("no counterposition was fabricated"))).toBe(
      true
    );
  });

  it("pins crux claims with an override basis", () => {
    const extracted: ExtractedArguments = {
      topic: "Remote work should be default",
      positions: [
        {
          side: "for",
          speaker: "Remote advocates",
          arguments: [{ claim: "Remote work improves retention", strengthScore: 7 }],
        },
        {
          side: "against",
          speaker: "Office advocates",
          arguments: [{ claim: "Remote work weakens mentoring", strengthScore: 6 }],
        },
      ],
      identifiedCruxes: [
        {
          description: "Whether retention gains outweigh mentoring losses",
          significance: "This tradeoff determines which side should prevail.",
        },
      ],
      potentialFallacies: [],
      detectedBiases: [],
      summary: "",
      confidence: 0.6,
    };

    const { graph } = extractedToArgumentGraph(extracted, { topicId: "crux" });
    const cruxClaims = graph.nodes.filter(
      (node) => node.type === "claim" && node.cruxOverride === "pin"
    );

    expect(ArgumentGraphSchema.safeParse(graph).success).toBe(true);
    expect(validateArgumentGraph(graph).filter((issue) => issue.severity === "error")).toEqual([]);
    expect(cruxClaims).toHaveLength(1);
    expect(cruxClaims[0]).toMatchObject({
      cruxOverride: "pin",
      overrideBasis: "extracted crux candidate",
    });
  });
});
