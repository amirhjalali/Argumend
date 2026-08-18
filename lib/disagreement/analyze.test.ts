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
