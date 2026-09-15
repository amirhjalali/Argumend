import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { RawDisagreementExtractionV1 } from "@/types/disagreement";
import { analyzeDisagreement } from "./analyze";
import { FakeDisagreementProvider } from "./model/fake";
import { RESOLUTION_NOT_STATED } from "./projectReport";
import { normalizeSourceText } from "./source";

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

describe("crux branches state the condition and its negation (spec §6.6)", () => {
  it("emits two branches whose conditions differ, with the consequences reversed", async () => {
    const result = await run("claims-with-source-evidence");
    const crux = result.report.cruxes[0];
    expect(crux.branches).toHaveLength(2);
    const [holds, fails] = crux.branches;
    expect(holds.condition).not.toBe(fails.condition);
    expect(holds.condition).toMatch(/^If .* holds$/);
    expect(fails.condition).toMatch(/^If .* does not hold$/);
    // The same claim, affirmed and negated, moves the positions in opposite directions.
    expect(holds.consequence).toMatch(/Do not expand yet becomes stronger/);
    expect(holds.consequence).toMatch(/Expand the pilot becomes weaker/);
    expect(fails.consequence).toMatch(/Do not expand yet becomes weaker/);
    expect(fails.consequence).toMatch(/Expand the pilot becomes stronger/);
  });

  it("lower-cases the claim's leading capital inside the condition", async () => {
    const result = await run("claims-with-source-evidence");
    expect(result.report.cruxes[0].branches[0].condition).toMatch(/^If only 18 of 70/);
    const trust = await run("trust-split-traffic-study");
    expect(trust.report.cruxes[0].branches[0].condition).toMatch(/^If a study commissioned/);
  });

  it("keeps a participant's name and an acronym capitalised", async () => {
    const result = await run("crlf-line-endings", (extraction) => {
      extraction.claims[0].statement = "Mira installed the timer the week the splitting began.";
      extraction.claims[1].statement = "NASA data show cold nights split tomatoes.";
    });
    const conditions = result.report.cruxes.flatMap((crux) => crux.branches.map((b) => b.condition));
    expect(conditions.some((c) => c.startsWith("If Mira installed"))).toBe(true);
    expect(conditions.some((c) => c.startsWith("If NASA data"))).toBe(true);
    expect(conditions.some((c) => /^If mira|^If nASA/.test(c))).toBe(false);
  });

  it("does not read 'If If' for a claim that is itself a conditional", async () => {
    const result = await run("crlf-line-endings", (extraction) => {
      extraction.claims[0].statement = "If the heater is fixed, the splitting will stop.";
    });
    const conditions = result.report.cruxes.flatMap((crux) => crux.branches.map((b) => b.condition));
    expect(conditions.every((c) => !/^If If /.test(c))).toBe(true);
    expect(conditions.some((c) => /^If this holds: if the heater is fixed/.test(c))).toBe(true);
    expect(conditions.some((c) => /^If this does not hold: if the heater is fixed/.test(c))).toBe(true);
  });
});

describe("quote offsets index the normalised source (spec §10.1, §10.2)", () => {
  function collectRefs(report: Awaited<ReturnType<typeof run>>["report"]) {
    return [
      ...report.positions.flatMap((item) => item.grounding),
      ...report.commonGround.flatMap((item) => item.grounding),
      ...report.disagreements.flatMap((item) => item.grounding),
      ...(report.accountability?.stakes.flatMap((item) => item.grounding) ?? []),
    ];
  }

  it("slices every stored quote out of the line-ending-normalised text a browser textarea holds", async () => {
    const data = fixture("crlf-line-endings");
    expect(data.source).toContain("\r\n");
    const result = await run("crlf-line-endings");
    const refs = collectRefs(result.report);
    expect(refs.length).toBeGreaterThanOrEqual(3);
    const normalised = normalizeSourceText(data.source);
    for (const ref of refs) {
      expect(normalised.slice(ref.start, ref.end)).toBe(ref.quote);
    }
    // The raw CRLF text is not the offsets' frame of reference; the report says
    // how long the frame is so a consumer can tell which text it has.
    expect(refs.some((ref) => data.source.slice(ref.start, ref.end) !== ref.quote)).toBe(true);
    expect(result.report.provenance.sourceCharacterCount).toBe(normalised.length);
    expect(result.report.provenance.sourceCharacterCount).not.toBe(data.source.length);
  });
});

describe("evidence state follows what the source supplied for the crux claim (spec §6.6)", () => {
  it("says evidence was asserted when the crux claim cites figures or a report", async () => {
    const result = await run("claims-with-source-evidence");
    expect(result.report.cruxes[0].evidenceState).toBe("asserted-in-source");
  });

  it("says no evidence was supplied when an evidence-typed crux claim is a bare assertion", async () => {
    const result = await run("claims-without-evidence");
    expect(result.report.cruxes[0].evidenceState).toBe("no-evidence-provided");
  });

  it("counts a further claim that bears on the crux claim as evidence asserted", async () => {
    const result = await run("claims-without-evidence", (extraction) => {
      extraction.claimRelations.push({
        fromClaimId: "claim-reduce-tickets",
        toClaimId: "claim-confuse-users",
        type: "undercuts",
      });
    });
    const crux = result.report.cruxes.find((item) => item.claimId === "claim-confuse-users");
    expect(crux?.evidenceState).toBe("asserted-in-source");
  });

  it("keeps the general boundary for a crux whose claim is not an evidence question", async () => {
    const result = await run("trust-split-traffic-study");
    expect(result.report.cruxes[0].claimId).toBe("claim-funding-undermines");
    expect(result.report.cruxes[0].evidenceState).toBe("not-independently-checked");
  });
});

describe("reports with no quotes to check (zero-position honesty)", () => {
  it("does not claim quoted support was found verbatim", async () => {
    const result = await run("non-argument-recipe");
    expect(result.report.positions).toHaveLength(0);
    expect(result.report.diagnosis.confidenceBasis).not.toMatch(/found verbatim/);
    expect(result.report.diagnosis.confidenceBasis).toMatch(/no quotes to check/i);
  });
});
