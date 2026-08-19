import { describe, expect, it } from "vitest";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "./prompts/v1/examples";
import { FakeDisagreementProvider } from "./model/fake";
import { analyzeDisagreement } from "./analyze";
import { deriveDiagnosis } from "./diagnosis";
import { validateAnalyzeRequest } from "./source";
import { DisagreementError } from "./errors";
import { canPublishReport } from "./quality";

const REQUEST_ID = "11111111-1111-1111-1111-111111111111";

describe("validateAnalyzeRequest", () => {
  it("rejects a URL-only payload", () => {
    expect(() =>
      validateAnalyzeRequest({
        content: "https://example.com/thread",
        contentType: "conversation",
        requestId: REQUEST_ID,
      }),
    ).toThrow(DisagreementError);
  });

  it("rejects short text", () => {
    expect(() =>
      validateAnalyzeRequest({
        content: "too short",
        contentType: "freeform",
        requestId: REQUEST_ID,
      }),
    ).toThrow(/longer excerpt|CONTENT_TOO_SHORT/i);
  });
});

describe("analyzeDisagreement", () => {
  it("builds a causal diagnosis from the immigration fixture", async () => {
    const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[1];
    const content = `${example.source}\n\n${"Context note for length. ".repeat(8)}`;
    const result = await analyzeDisagreement({
      content,
      contentType: example.contentType,
      requestId: REQUEST_ID,
      provider: new FakeDisagreementProvider(example.extraction),
    });

    expect(result.report.schemaVersion).toBe(1);
    expect(result.report.sourceMode).toBe("source-only");
    expect(result.report.provenance.independentlyVerified).toBe(false);
    expect(result.report.positions).toHaveLength(2);
    expect(result.report.diagnosis.pattern).toMatch(/causal|mixed|mostly/);
    expect("winner" in result.report).toBe(false);
    expect(result.graph.question.statement.endsWith("?")).toBe(true);
    for (const position of result.report.positions) {
      for (const ref of position.grounding) {
        expect(content.slice(ref.start, ref.end).replace(/\s+/g, " ")).toContain(
          ref.quote.slice(0, 10),
        );
      }
    }
  });

  it("does not invent a second position for a one-sided article", async () => {
    const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[4];
    const result = await analyzeDisagreement({
      content: `${example.source} Additional context about Oak Street traffic and cyclist injuries over several seasons.`,
      contentType: "article",
      requestId: REQUEST_ID,
      provider: new FakeDisagreementProvider(example.extraction),
    });
    expect(result.report.positions).toHaveLength(1);
    expect(result.report.cruxes).toHaveLength(0);
    expect(["not-a-disagreement", "insufficient-context"]).toContain(result.report.diagnosis.pattern);
  });

  it("returns no crux for a non-argument", async () => {
    const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[5];
    const padded = `${example.source} ${"chips and salsa ".repeat(20)}`;
    const result = await analyzeDisagreement({
      content: padded,
      contentType: "freeform",
      requestId: REQUEST_ID,
      provider: new FakeDisagreementProvider(example.extraction),
    });
    expect(result.report.cruxes).toHaveLength(0);
    expect(result.report.diagnosis.pattern).toBe("not-a-disagreement");
  });
});

describe("crux projection", () => {
  it("never renders the same crux question twice", async () => {
    // Several ranked claims routinely belong to one disagreement candidate; a
    // live run surfaced three identical crux cards from that collision.
    for (const example of DISAGREEMENT_FEW_SHOT_EXAMPLES) {
      const content = `${example.source}\n\n${"Context note for length. ".repeat(8)}`;
      const result = await analyzeDisagreement({
        content,
        contentType: example.contentType,
        requestId: REQUEST_ID,
        provider: new FakeDisagreementProvider(example.extraction),
      });

      const questions = result.report.cruxes.map((crux) =>
        crux.question.trim().toLowerCase().replace(/\s+/g, " ").replace(/[?.]+$/, ""),
      );
      expect(new Set(questions).size, `duplicate crux in ${example.name}`).toBe(questions.length);
      expect(new Set(result.report.cruxes.map((crux) => crux.id)).size).toBe(questions.length);
      expect(result.report.cruxes.length).toBeLessThanOrEqual(3);
    }
  });

  it("keeps distinct claims as distinct cruxes rather than dropping them", async () => {
    const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[1];
    const content = `${example.source}\n\n${"Context note for length. ".repeat(8)}`;
    const result = await analyzeDisagreement({
      content,
      contentType: example.contentType,
      requestId: REQUEST_ID,
      provider: new FakeDisagreementProvider(example.extraction),
    });

    expect(new Set(result.report.cruxes.map((crux) => crux.claimId)).size).toBe(
      result.report.cruxes.length,
    );
  });
});

describe("contradicts edges", () => {
  it("keeps the graph when the model names a pair in reverse order", async () => {
    // `contradicts` is symmetric and the graph stores each pair once in
    // lexicographic order. Passing the model's order through failed validation
    // and collapsed the whole graph — every position and crux — over sorting.
    const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[0];
    const extraction = structuredClone(example.extraction);
    const [first, second] = extraction.claims;
    const [low, high] = [first.id, second.id].sort();
    extraction.claimRelations = [{ fromClaimId: high, toClaimId: low, type: "contradicts" }];
    const content = `${example.source}\n\n${"Context note for length. ".repeat(8)}`;

    const result = await analyzeDisagreement({
      content,
      contentType: example.contentType,
      requestId: REQUEST_ID,
      provider: new FakeDisagreementProvider(extraction),
    });

    expect(result.report.quality.warnings.join(" ")).not.toMatch(/failed validation/i);
    expect(result.graph.nodes.length).toBeGreaterThan(1);
    const edge = result.graph.edges.find((item) => item.type === "contradicts");
    expect(edge).toBeDefined();
    expect(edge!.from < edge!.to).toBe(true);
  });

  it("stores a duplicated pair only once", async () => {
    const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[0];
    const extraction = structuredClone(example.extraction);
    const [first, second] = extraction.claims;
    extraction.claimRelations = [
      { fromClaimId: first.id, toClaimId: second.id, type: "contradicts" },
      { fromClaimId: second.id, toClaimId: first.id, type: "contradicts" },
    ];
    const content = `${example.source}\n\n${"Context note for length. ".repeat(8)}`;

    const result = await analyzeDisagreement({
      content,
      contentType: example.contentType,
      requestId: REQUEST_ID,
      provider: new FakeDisagreementProvider(extraction),
    });

    expect(result.graph.edges.filter((item) => item.type === "contradicts")).toHaveLength(1);
    expect(result.report.quality.warnings.join(" ")).not.toMatch(/failed validation/i);
  });
});

describe("stranded claims", () => {
  it("keeps the graph when dropping a position orphans its claims", async () => {
    // Dropping an under-wired position strands any claim that pointed only at
    // it, and one stranded claim invalidates the graph exactly as the position
    // did — trading one collapse for another.
    const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[0];
    const extraction = structuredClone(example.extraction);
    extraction.positions.push({
      ...structuredClone(extraction.positions[0]),
      id: "pos-orphan",
      label: "Only ever supported",
    });
    extraction.claims.push({
      ...structuredClone(extraction.claims[0]),
      id: "c-orphan",
      // Points only at the position that will be dropped for lacking a contest.
      stanceByPosition: [{ positionId: "pos-orphan", relation: "supports" }],
    });
    const content = `${example.source}\n\n${"Context note for length. ".repeat(8)}`;

    const result = await analyzeDisagreement({
      content,
      contentType: example.contentType,
      requestId: REQUEST_ID,
      provider: new FakeDisagreementProvider(extraction),
    });

    expect(result.report.quality.warnings.join(" ")).not.toMatch(/failed validation/i);
    expect(result.graph.nodes.length).toBeGreaterThan(1);
    expect(result.graph.nodes.some((node) => node.id === "c-orphan")).toBe(false);
    // The report still presents everything the source supported.
    expect(result.report.positions.some((position) => position.id === "pos-orphan")).toBe(true);
  });
});

describe("common ground honesty", () => {
  it("never claims explicit agreement whose quotes did not survive grounding", async () => {
    const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[0];
    const extraction = structuredClone(example.extraction);
    extraction.commonGroundCandidates = [
      {
        statement: "Both treat the coverage figures as the relevant measure.",
        participantIds: extraction.participants.map((participant) => participant.id),
        basis: "explicit",
        confidence: "high",
        // A quote that is not in the source: the guardrail drops it, and the
        // "explicit" label must not outlive the evidence for it.
        groundingQuotes: [{ quote: "This sentence appears nowhere in the source text at all." }],
      },
    ];
    const content = `${example.source}\n\n${"Context note for length. ".repeat(8)}`;

    const result = await analyzeDisagreement({
      content,
      contentType: example.contentType,
      requestId: REQUEST_ID,
      provider: new FakeDisagreementProvider(extraction),
    });

    const item = result.report.commonGround[0];
    expect(item.grounding).toHaveLength(0);
    expect(item.basis).toBe("strongly-implied");
    expect(item.confidence).not.toBe("high");
  });
});

describe("crux explanations", () => {
  it("does not fall back to a sentence true of every crux", async () => {
    for (const example of DISAGREEMENT_FEW_SHOT_EXAMPLES) {
      const content = `${example.source}\n\n${"Context note for length. ".repeat(8)}`;
      const result = await analyzeDisagreement({
        content,
        contentType: example.contentType,
        requestId: REQUEST_ID,
        provider: new FakeDisagreementProvider(example.extraction),
      });

      for (const crux of result.report.cruxes) {
        expect(crux.whyItMatters).not.toBe("Resolving this would change the structure of the disagreement.");
        for (const branch of crux.branches) {
          expect(branch.condition).not.toMatch(/^If If /);
        }
      }
    }
  });
});

describe("dangling references", () => {
  it("drops them with a warning instead of discarding the extraction", async () => {
    // The spec has the normalizer drop dangling references and warn. Failing
    // the parse first would throw away a whole extraction over a problem the
    // very next step exists to repair.
    const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[0];
    const extraction = structuredClone(example.extraction);
    extraction.claims[0].stanceByPosition.push({ positionId: "pos-does-not-exist", relation: "supports" });
    extraction.claimRelations.push({
      fromClaimId: extraction.claims[0].id,
      toClaimId: "claim-does-not-exist",
      type: "supports",
    });
    const content = `${example.source}\n\n${"Context note for length. ".repeat(8)}`;

    const result = await analyzeDisagreement({
      content,
      contentType: example.contentType,
      requestId: REQUEST_ID,
      provider: new FakeDisagreementProvider(extraction),
    });

    expect(result.report.positions.length).toBeGreaterThan(0);
    expect(result.report.quality.warnings.join(" ")).toMatch(/dangling|Dropped/i);
    expect(result.graph.nodes.some((node) => node.id === "pos-does-not-exist")).toBe(false);
  });

  it("still rejects a structurally invalid payload", async () => {
    const broken = { mainQuestion: "only this" } as never;
    await expect(
      analyzeDisagreement({
        content: `Some real disagreement text.\n\n${"Context note for length. ".repeat(8)}`,
        contentType: "conversation",
        requestId: REQUEST_ID,
        provider: new FakeDisagreementProvider(broken),
      }),
    ).rejects.toMatchObject({ code: "MODEL_SCHEMA_INVALID" });
  });
});

describe("crux branch direction", () => {
  it("never says one condition strengthens both sides of the split", async () => {
    for (const example of DISAGREEMENT_FEW_SHOT_EXAMPLES) {
      const content = `${example.source}\n\n${"Context note for length. ".repeat(8)}`;
      const result = await analyzeDisagreement({
        content,
        contentType: example.contentType,
        requestId: REQUEST_ID,
        provider: new FakeDisagreementProvider(example.extraction),
      });

      for (const crux of result.report.cruxes) {
        const strengthened = crux.branches.filter((branch) => branch.consequence.includes("stronger"));
        // Every strengthening branch must name a distinct set of positions;
        // the same condition cannot make opposing positions both stronger.
        const named = strengthened.flatMap((branch) => branch.consequence.split(" and "));
        expect(new Set(named).size, `${example.name} repeats a strengthened position`).toBe(named.length);
        expect(strengthened.length).toBeLessThanOrEqual(1);
      }
    }
  });

  it("states a direction for each side when the claim records stances", async () => {
    const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[0];
    const content = `${example.source}\n\n${"Context note for length. ".repeat(8)}`;
    const result = await analyzeDisagreement({
      content,
      contentType: example.contentType,
      requestId: REQUEST_ID,
      provider: new FakeDisagreementProvider(example.extraction),
    });

    const crux = result.report.cruxes[0];
    expect(crux).toBeDefined();
    expect(crux.branches.some((branch) => branch.consequence.includes("stronger"))).toBe(true);
    expect(crux.branches.some((branch) => branch.consequence.includes("weaker"))).toBe(true);
    // Positions are named, not referred to by raw id.
    expect(crux.branches.every((branch) => !/"pos[-_]/.test(branch.consequence))).toBe(true);
  });
});

describe("deriveDiagnosis", () => {
  it("covers the constrained patterns", () => {
    expect(deriveDiagnosis({
      positionCount: 0,
      explicitPositionCount: 0,
      disagreementCount: 0,
      commonGroundCount: 0,
      groundingCoverage: 1,
      hasCrux: false,
      graphValid: true,
    })).toBe("not-a-disagreement");

    expect(deriveDiagnosis({
      positionCount: 2,
      explicitPositionCount: 2,
      disagreementCount: 1,
      commonGroundCount: 2,
      groundingCoverage: 0.8,
      primaryType: "empirical",
      hasCrux: true,
      graphValid: true,
    })).toBe("single-empirical-crux");

    expect(deriveDiagnosis({
      positionCount: 2,
      explicitPositionCount: 2,
      disagreementCount: 2,
      commonGroundCount: 0,
      groundingCoverage: 0.8,
      primaryType: "causal",
      hasCrux: true,
      graphValid: true,
    })).toBe("causal-model-split");

    expect(deriveDiagnosis({
      positionCount: 2,
      explicitPositionCount: 2,
      disagreementCount: 1,
      commonGroundCount: 0,
      groundingCoverage: 0.8,
      primaryType: "definitional",
      hasCrux: true,
      graphValid: true,
    })).toBe("definition-mismatch");

    expect(deriveDiagnosis({
      positionCount: 2,
      explicitPositionCount: 2,
      disagreementCount: 1,
      commonGroundCount: 0,
      groundingCoverage: 0.8,
      primaryType: "normative",
      hasCrux: true,
      graphValid: true,
    })).toBe("value-conflict");

    expect(deriveDiagnosis({
      positionCount: 2,
      explicitPositionCount: 2,
      disagreementCount: 3,
      commonGroundCount: 0,
      groundingCoverage: 0.8,
      hasCrux: true,
      graphValid: true,
    })).toBe("mixed-disagreement");
  });
});

describe("publication threshold", () => {
  it("rejects insufficient-context reports", async () => {
    const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[5];
    const result = await analyzeDisagreement({
      content: `${example.source} ${"more words ".repeat(30)}`,
      contentType: "freeform",
      requestId: REQUEST_ID,
      provider: new FakeDisagreementProvider(example.extraction),
    });
    expect(canPublishReport(result.report).ok).toBe(false);
  });
});
