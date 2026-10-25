import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { RawDisagreementExtractionV1 } from "@/types/disagreement";
import { analyzeDisagreement } from "./analyze";
import { FakeDisagreementProvider } from "./model/fake";

async function analyze(name: string, lowConfidence = false) {
  const data = JSON.parse(readFileSync(join(process.cwd(), "data/evals/disagreement", `${name}.json`), "utf8")) as {
    source: string;
    contentType: "conversation";
    extraction: RawDisagreementExtractionV1;
  };
  if (lowConfidence) {
    for (const item of data.extraction.disagreementCandidates) item.confidence = "low";
  }
  return analyzeDisagreement({
    content: data.source,
    contentType: data.contentType,
    requestId: "resolvability-contract-audit",
    provider: new FakeDisagreementProvider(data.extraction),
  });
}

describe("disagreement resolvability follows its resolution kind", () => {
  // Spec section 10.7 gives value choices a low default and authority or source
  // audits a medium default. These fixtures explicitly state those conditions.
  it.each([
    ["priority-tradeoff", "priority", "low"],
    ["procedural-disagreement", "procedural", "medium"],
    ["source-trust", "trust", "medium"],
  ] as const)("does not label %s as an existing-evidence check", async (name, type, expected) => {
    const { report } = await analyze(name);
    const items = report.disagreements.filter((item) => item.type === type);
    expect(items.length).toBeGreaterThan(0);
    expect(report.quality.groundingCoverage).toBeGreaterThanOrEqual(0.4);
    for (const item of items) {
      expect(item.confidence).toBe("high");
      expect(item.resolvability).toBe(expected);
    }
  });

  it.each(["procedural-disagreement", "source-trust"])("downgrades %s when representation confidence is low", async (name) => {
    const { report } = await analyze(name, true);
    expect(report.disagreements.length).toBeGreaterThan(0);
    expect(report.disagreements.every((item) => item.resolvability === "low")).toBe(true);
  });
});
