import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { RawDisagreementExtractionV1 } from "@/types/disagreement";
import { analyzeDisagreement } from "./analyze";
import { deriveDiagnosis, type DiagnosisInputs } from "./diagnosis";
import { FakeDisagreementProvider } from "./model/fake";

const REQUEST_ID = "11111111-1111-1111-1111-111111111111";

function fixture(name: string) {
  return JSON.parse(
    readFileSync(join(process.cwd(), "data/evals/disagreement", `${name}.json`), "utf8"),
  ) as {
    source: string;
    contentType: "conversation" | "article" | "freeform";
    extraction: RawDisagreementExtractionV1;
  };
}

const BASE: DiagnosisInputs = {
  positionCount: 2,
  explicitPositionCount: 2,
  claimCount: 0,
  disagreementCount: 0,
  commonGroundCount: 0,
  groundingCoverage: 1,
  hasCrux: false,
  graphValid: true,
};

describe("deriveDiagnosis (§10.4, §10.6)", () => {
  it("returns insufficient-context when positions carry no claims, disagreements, or common ground", () => {
    // Two explicit, fully grounded positions and nothing else: the graph that
    // results is a valid question-only graph, so the graphValid guard cannot
    // fire. "mixed-disagreement" would assert several stacked disagreements
    // where the extraction found none.
    expect(deriveDiagnosis(BASE)).toBe("insufficient-context");
  });

  it("still reaches a typed pattern once argument structure exists", () => {
    expect(
      deriveDiagnosis({ ...BASE, claimCount: 2, disagreementCount: 1, primaryType: "causal", hasCrux: true }),
    ).toBe("causal-model-split");
  });

  it("keeps a typed disagreement without mapped claims out of insufficient-context", () => {
    expect(
      deriveDiagnosis({ ...BASE, disagreementCount: 1, primaryType: "normative" }),
    ).toBe("value-conflict");
  });
});

describe("positions without reasons (extreme-brevity-no-reasons fixture)", () => {
  it("diagnoses insufficient-context and explains that no reason could be mapped", async () => {
    const data = fixture("extreme-brevity-no-reasons");
    const result = await analyzeDisagreement({
      content: data.source,
      contentType: data.contentType,
      requestId: REQUEST_ID,
      provider: new FakeDisagreementProvider(data.extraction),
    });

    expect(result.report.positions).toHaveLength(2);
    expect(result.report.cruxes).toHaveLength(0);
    expect(result.report.diagnosis.pattern).toBe("insufficient-context");
    expect(result.report.diagnosis.insight).toMatch(/no reason|no load-bearing/i);
    expect(result.report.summary).toBe(result.report.diagnosis.insight);
    // No fabricated structure to make the report look fuller than the text.
    expect(result.report.commonGround).toHaveLength(0);
    expect(result.report.disagreements).toHaveLength(0);
  });
});
