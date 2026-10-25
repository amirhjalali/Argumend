import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { RawDisagreementExtractionV1 } from "@/types/disagreement";
import { analyzeDisagreement } from "./analyze";
import { buildArgumentGraph } from "./buildGraph";
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

describe("buildArgumentGraph with a loaded main question", () => {
  it("keeps the position and claim structure when only the question phrasing fails validation", () => {
    const { extraction } = fixture("why-question-crux-survives");
    expect(extraction.mainQuestion).toMatch(/^why did/i);

    const result = buildArgumentGraph(extraction);

    expect(result.valid).toBe(true);
    expect(result.graph.nodes.filter((node) => node.type === "position")).toHaveLength(2);
    expect(result.graph.nodes.filter((node) => node.type === "claim").length).toBeGreaterThan(0);
    expect(result.graph.question.statement).toBe(extraction.mainQuestion);
    expect(result.warnings.some((warning) => /loaded/i.test(warning))).toBe(true);
    expect(result.warnings.some((warning) => /question-only/i.test(warning))).toBe(false);
  });

  it("still discards the graph when a structural rule fails", () => {
    const { extraction } = fixture("why-question-crux-survives");
    // A claim that depends on itself is a reasoning cycle, which the validator
    // rejects; the loaded-question leniency must not mask a structural failure.
    const broken: RawDisagreementExtractionV1 = structuredClone(extraction);
    broken.claimRelations.push({
      fromClaimId: broken.claims[0].id,
      toClaimId: broken.claims[0].id,
      type: "depends_on",
    });
    const result = buildArgumentGraph(broken);
    expect(result.valid).toBe(false);
    expect(result.warnings.some((warning) => /question-only/i.test(warning))).toBe(true);
  });
});

describe("crux survives a 'Why ...' main question end to end", () => {
  it("projects the crux, keeps the question as extracted, and explains the framing", async () => {
    const data = fixture("why-question-crux-survives");
    const result = await analyzeDisagreement({
      content: data.source,
      contentType: data.contentType,
      requestId: REQUEST_ID,
      provider: new FakeDisagreementProvider(data.extraction),
    });

    expect(result.report.cruxes.length).toBeGreaterThan(0);
    expect(result.report.question).toBe(data.extraction.mainQuestion);
    expect(result.report.quality.warnings.some((warning) => /loaded/i.test(warning))).toBe(true);
    expect(result.report.caveats.some((caveat) => /presuppos/i.test(caveat))).toBe(true);
    expect(result.report.diagnosis.pattern).not.toBe("insufficient-context");
  });
});
