import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { RawDisagreementExtractionV1 } from "@/types/disagreement";
import { analyzeDisagreement } from "./analyze";
import { FakeDisagreementProvider } from "./model/fake";
import { RESOLUTION_NOT_STATED } from "./projectReport";

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

async function run(name: string, mutate?: (extraction: RawDisagreementExtractionV1) => void) {
  const data = fixture(name);
  const extraction = structuredClone(data.extraction);
  mutate?.(extraction);
  return analyzeDisagreement({
    content: data.source,
    contentType: data.contentType,
    requestId: REQUEST_ID,
    provider: new FakeDisagreementProvider(extraction),
  });
}

describe("primary type follows the primary crux (reviewer issue A)", () => {
  it("takes the type of the disagreement the primary crux belongs to, not the first listed", async () => {
    // The engine's crux sits in the empirical disagreement that the model
    // listed second. With the first disagreement retyped to procedural there
    // is no value-typed headline to protect, so the headline type must agree
    // with the crux it introduces.
    const result = await run("mixed-value-and-empirical", (extraction) => {
      extraction.disagreementCandidates[0].type = "procedural";
    });
    const crux = result.report.cruxes[0];
    expect(crux.type).toBe("empirical");
    expect(result.report.diagnosis.primaryType).toBe(crux.type);
  });

  it("never lets an empirical crux relabel a value disagreement as empirical", async () => {
    // Spec invariants: never treat every disagreement as empirically
    // resolvable, never label normative disagreement as a lack of evidence.
    // Bo's threshold question is normative and the source says the empirical
    // answer does not move it, so the value type leads even though the engine
    // ranked an empirical claim first. The crux keeps its own type.
    const result = await run("mixed-value-and-empirical");
    expect(result.report.cruxes[0].type).toBe("empirical");
    expect(result.report.diagnosis.primaryType).toBe("normative");
    expect(result.report.diagnosis.pattern).toBe("value-conflict");
  });

  it("lets a priority disagreement lead over an evidence-typed crux the same way", async () => {
    const result = await run("long-transcript-town-hall");
    expect(["empirical", "predictive", "causal"]).toContain(result.report.cruxes[0].type);
    expect(result.report.diagnosis.primaryType).toBe("priority");
    expect(result.report.diagnosis.pattern).toBe("priority-tradeoff");
  });

  it("names the value dispute when it is the only disagreement and the crux claim sits outside it", async () => {
    const result = await run("mixed-value-and-empirical", (extraction) => {
      // Drop the empirical disagreement; the empirical claim stays and the
      // engine may still rank it first, but the one listed dispute is normative.
      extraction.disagreementCandidates = extraction.disagreementCandidates.filter(
        (item) => item.type === "normative",
      );
    });
    expect(result.report.disagreements).toHaveLength(1);
    expect(["value-conflict", "mostly-common-ground"]).toContain(result.report.diagnosis.pattern);
    expect(result.report.diagnosis.pattern).not.toBe("single-empirical-crux");
  });
});

describe("crux resolution honesty (reviewer issue B)", () => {
  it("does not print a clarification placeholder as what would settle a crux", async () => {
    const result = await run("cumulative-evidence");
    expect(result.report.cruxes.length).toBeGreaterThan(0);
    for (const crux of result.report.cruxes) {
      expect(crux.resolution.condition).not.toBe("Further clarification is required.");
    }
    expect(result.report.cruxes.some((crux) => crux.resolution.condition === RESOLUTION_NOT_STATED)).toBe(true);
  });

  it("does not present a condition that says it is not stated as a resolution path", async () => {
    const result = await run("cumulative-evidence", (extraction) => {
      extraction.disagreementCandidates[0].resolutionCondition =
        "Not stated in the source; would require agreement on whether the dam is safe.";
    });
    expect(result.report.disagreements).toHaveLength(1);
    expect(result.report.resolutionPaths).toHaveLength(0);
  });
});

describe("common ground attribution (reviewer issue D)", () => {
  it("drops an item whose quotes come from fewer than two of the people it is attributed to", async () => {
    // Both items in this fixture are attributed to Alma and Ben, but one is
    // quoted only from Alma and the other only from Ben. Neither shows that
    // both people hold it, so neither may be shown as shared ground.
    const result = await run("causal-model-split-downtown");
    expect(result.report.commonGround).toHaveLength(0);
    expect(result.report.diagnosis.sharedGround).toBe("none");
    expect(result.report.share.metrics.commonGroundCount).toBe(0);
    expect(result.report.quality.warnings.filter((w) => /common-ground/i.test(w)).length).toBe(2);
  });

  it("keeps an item each attributed person is quoted on", async () => {
    const result = await run("mostly-agreement");
    expect(result.report.commonGround).toHaveLength(2);
  });

  it("accepts an article narrator's sentence as attesting the people it reports on", async () => {
    // "Both agree that ..." from the reporter is the source's evidence of
    // agreement between two people the reporter is describing.
    const result = await run("long-article-quoted-officials");
    expect(result.report.commonGround).toHaveLength(2);
  });
});

describe("explicit positions must be grounded in their own speaker (reviewer issue E)", () => {
  it("relabels an explicit position inferred when no quote from its participant survives", async () => {
    const result = await run("fabricated-quotes-downgrade");
    const position = result.report.positions.find((item) => item.id === "pos-labeling-system");
    expect(position).toBeDefined();
    expect(position?.grounding).toHaveLength(0);
    expect(position?.explicitness).toBe("inferred");
    expect(position?.confidence).not.toBe("high");
    expect(result.report.quality.inferredPositionCount).toBeGreaterThanOrEqual(1);
  });

  it("does not count a quote from another speaker as grounding for this one", async () => {
    const result = await run("explicit-update-commitment", (extraction) => {
      // Nadia's position is now "grounded" only by something Marco said.
      const position = extraction.positions[0];
      position.groundingQuotes = extraction.positions[1].groundingQuotes.map((quote) => ({
        ...quote,
        participantId: extraction.positions[1].participantIds[0],
      }));
    });
    expect(result.report.positions[0].explicitness).toBe("inferred");
    expect(result.report.positions[1].explicitness).toBe("explicit");
  });
});

describe("accountability ledger (reviewer issue G)", () => {
  it("never shows a stake with no participant", async () => {
    const result = await run("anonymous-labels");
    for (const stake of result.report.accountability?.stakes ?? []) {
      expect(stake.participantId).toBeDefined();
    }
    expect(result.report.quality.warnings.some((w) => /primary crux/i.test(w))).toBe(true);
  });
});

describe("grounding quote attribution survives id normalization", () => {
  it("maps a quote's participant id through the same renaming as the participant", async () => {
    const result = await run("anonymous-labels", (extraction) => {
      for (const participant of extraction.participants) participant.id = participant.id.toUpperCase();
      for (const position of extraction.positions) {
        position.participantIds = position.participantIds.map((id) => id.toUpperCase());
        for (const quote of position.groundingQuotes) {
          if (quote.participantId) quote.participantId = quote.participantId.toUpperCase();
        }
      }
    });
    const ids = new Set(result.report.participants.map((participant) => participant.id));
    for (const position of result.report.positions) {
      expect(position.explicitness).toBe("explicit");
      for (const ref of position.grounding) {
        expect(ref.participantId).toBeDefined();
        expect(ids.has(ref.participantId!)).toBe(true);
      }
    }
  });
});
