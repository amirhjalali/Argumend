import { beforeAll, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { ArgumentGraphSchema } from "@/lib/schemas/argument";
import {
  collectReportQuoteCharacters,
  collectReportReferenceIssues,
  DisagreementReportSchema,
  parseDisagreementReport,
} from "@/lib/schemas/disagreement";
import type { DisagreementAnalysisBundleV1 } from "@/types/disagreement";
import { analyzeDisagreement } from "./analyze";
import { DISAGREEMENT_LIMITS } from "./constants";
import { FakeDisagreementProvider } from "./model/fake";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "./prompts/v1/examples";
import { validatePublishPayload } from "./publication";
import { canPublishReport } from "./quality";

const mocks = vi.hoisted(() => ({ findReport: vi.fn() }));
vi.mock("@/lib/db/index", () => ({
  getDb: () => ({ query: { disagreementReports: { findFirst: mocks.findReport } } }),
}));

import { getPublishedDisagreementReport } from "@/lib/db/queries";

let bundle: DisagreementAnalysisBundleV1;

describe("private and published report quote budgets", () => {
  beforeAll(async () => {
    const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[1];
    const extraction = structuredClone(example.extraction);
    const alex = "Immigration is destroying wages for working-class Americans because employers can choose among more applicants for the same jobs, and the people competing directly with new arrivals cannot easily move into specialized occupations or retrain while paying their current rent.";
    const blair = "Immigrants grow the economy and create jobs because each new household also buys goods, rents homes, and supports local services, while people with different skills can complement existing workers and allow businesses to expand production into additional markets.";
    extraction.positions[0].groundingQuotes = [{ quote: alex, participantId: "alex" }];
    extraction.positions[1].groundingQuotes = [{ quote: blair, participantId: "blair" }];
    const quotes = extraction.positions.flatMap((position) => position.groundingQuotes);
    extraction.commonGroundCandidates[0].groundingQuotes = quotes;
    extraction.disagreementCandidates[0].groundingQuotes = quotes;

    bundle = await analyzeDisagreement({
      content: `Alex: ${alex}\nBlair: ${blair}`,
      contentType: example.contentType,
      requestId: "11111111-1111-1111-1111-111111111111",
      provider: new FakeDisagreementProvider(extraction),
    });
  });

  it("accepts a fully grounded private diagnosis above the publication quote budget", () => {
    expect(collectReportQuoteCharacters(bundle.report)).toBeGreaterThan(
      DISAGREEMENT_LIMITS.maxPublishedQuoteCharactersTotal,
    );
    expect(bundle.report.quality.groundingCoverage).toBe(1);
    expect(bundle.report.quality.droppedUngroundedQuoteCount).toBe(0);
    expect(collectReportReferenceIssues(DisagreementReportSchema.parse(bundle.report))).toEqual([]);

    const privateResponse = z.object({
      report: DisagreementReportSchema,
      graph: ArgumentGraphSchema,
    });
    expect(privateResponse.safeParse(bundle).success).toBe(true);
  });

  it("still rejects publishing and reading that report as persisted public data", async () => {
    expect(canPublishReport(bundle.report)).toEqual({
      ok: false,
      reasons: ["Persisted quotes exceed the publication cap."],
    });
    expect(parseDisagreementReport(bundle.report).success).toBe(false);
    expect(validatePublishPayload(bundle)).toEqual({ error: "Invalid report" });

    mocks.findReport.mockResolvedValueOnce({ report: bundle.report, graph: bundle.graph });
    expect(await getPublishedDisagreementReport("large-private-report")).toBeUndefined();
  });

  it("keeps the existing inclusive publication quote cap", async () => {
    const report = structuredClone(bundle.report);
    const excess = collectReportQuoteCharacters(report) -
      DISAGREEMENT_LIMITS.maxPublishedQuoteCharactersTotal;
    const ref = report.positions[0].grounding[0];
    ref.quote = ref.quote.slice(0, -excess);
    ref.end = ref.start + ref.quote.length;
    expect(collectReportQuoteCharacters(report)).toBe(
      DISAGREEMENT_LIMITS.maxPublishedQuoteCharactersTotal,
    );
    expect(parseDisagreementReport(report).success).toBe(true);
    expect(canPublishReport(report)).toEqual({ ok: true, reasons: [] });
    expect(validatePublishPayload({ report, graph: bundle.graph })).toHaveProperty("report");

    mocks.findReport.mockResolvedValueOnce({ report, graph: bundle.graph });
    expect(await getPublishedDisagreementReport("within-quote-budget")).toHaveProperty("report", report);
  });

  it("keeps individual private quotes bounded", () => {
    const report = structuredClone(bundle.report);
    report.positions[0].grounding[0].quote = "q".repeat(DISAGREEMENT_LIMITS.maxQuoteCharacters + 1);
    expect(DisagreementReportSchema.safeParse(report).success).toBe(false);
  });
});
