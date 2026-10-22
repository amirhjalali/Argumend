import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { PgDialect } from "drizzle-orm/pg-core";
import { analyzeDisagreement } from "@/lib/disagreement/analyze";
import { FakeDisagreementProvider } from "@/lib/disagreement/model/fake";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "@/lib/disagreement/prompts/v1/examples";
import { KNOWN_DISAGREEMENT_PROMPT_VERSIONS } from "@/lib/disagreement/constants";
import type { DisagreementAnalysisBundleV1 } from "@/types/disagreement";

const mocks = vi.hoisted(() => ({
  getDb: vi.fn(),
  findReport: vi.fn(),
  insert: vi.fn(),
  values: vi.fn(),
  onConflictDoUpdate: vi.fn(),
  returning: vi.fn(),
}));

vi.mock("./index", () => ({ getDb: mocks.getDb }));

import { getPublishedDisagreementReport, upsertDisagreementFeedback } from "./queries";
import { disagreementFeedback } from "./schema";

let bundle: DisagreementAnalysisBundleV1;

describe("published disagreement database boundaries", () => {
  beforeAll(async () => {
    const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[1];
    bundle = await analyzeDisagreement({
      content: example.source,
      requestId: "publication-fixture",
      provider: new FakeDisagreementProvider(example.extraction),
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getDb.mockReturnValue({
      query: { disagreementReports: { findFirst: mocks.findReport } },
      insert: mocks.insert,
    });
    mocks.findReport.mockResolvedValue({
      id: "report-1",
      slug: "a-report",
      visibility: "unlisted",
      deletedAt: null,
      schemaVersion: 1,
      report: bundle.report,
      graph: bundle.graph,
    });
    mocks.insert.mockReturnValue({ values: mocks.values });
    mocks.values.mockReturnValue({ onConflictDoUpdate: mocks.onConflictDoUpdate });
    mocks.onConflictDoUpdate.mockReturnValue({ returning: mocks.returning });
    mocks.returning.mockResolvedValue([{ id: "feedback-1" }]);
  });

  it("only selects unlisted reports without a deletion timestamp", async () => {
    const result = await getPublishedDisagreementReport("a-report");
    expect(result?.report).toEqual(bundle.report);
    expect(result?.graph).toEqual(bundle.graph);
    const query = new PgDialect().sqlToQuery(mocks.findReport.mock.calls[0][0].where);
    expect(query.params).toEqual(["a-report", "unlisted"]);
    expect(query.sql).toContain('"disagreement_reports"."deleted_at" is null');
  });

  it.each(KNOWN_DISAGREEMENT_PROMPT_VERSIONS)("keeps valid reports from prompt %s readable", async (promptVersion) => {
    const historical = structuredClone(bundle.report);
    historical.provenance.promptVersion = promptVersion;
    delete historical.accountability;
    mocks.findReport.mockResolvedValueOnce({ report: historical, graph: bundle.graph });
    const result = await getPublishedDisagreementReport("a-report");
    expect(result?.report.provenance.promptVersion).toBe(promptVersion);
  });

  it.each([null, {}, { positions: [], privateSource: "A source that must not be logged." }])(
    "hides malformed stored report data: %j",
    async (report) => {
      mocks.findReport.mockResolvedValueOnce({ report, graph: bundle.graph });
      expect(await getPublishedDisagreementReport("a-report")).toBeFalsy();
    },
  );

  it("hides a report with broken internal references", async () => {
    const report = structuredClone(bundle.report);
    report.positions[0].participantIds = ["missing-participant"];
    mocks.findReport.mockResolvedValueOnce({ report, graph: bundle.graph });
    expect(await getPublishedDisagreementReport("a-report")).toBeFalsy();
  });

  it("hides a report whose stored graph is invalid", async () => {
    mocks.findReport.mockResolvedValueOnce({ report: bundle.report, graph: {} });
    expect(await getPublishedDisagreementReport("a-report")).toBeFalsy();
  });

  it("returns no report for a missing row", async () => {
    mocks.findReport.mockResolvedValueOnce(undefined);
    expect(await getPublishedDisagreementReport("a-report")).toBeFalsy();
  });

  it.each([undefined, null])("uses a non-null key for report-wide feedback (%s)", async (targetId) => {
    await upsertDisagreementFeedback({
      reportId: "report-1",
      section: "overall",
      targetId,
      vote: "accurate",
      anonymousSessionHash: "session-hash",
    });
    expect(mocks.values).toHaveBeenCalledWith(expect.objectContaining({ targetId: "" }));
    expect(mocks.onConflictDoUpdate).toHaveBeenCalledWith({
      target: [
        disagreementFeedback.reportId,
        disagreementFeedback.section,
        disagreementFeedback.targetId,
        disagreementFeedback.anonymousSessionHash,
      ],
      set: { vote: "accurate", correction: null, updatedAt: expect.any(Date) },
    });
  });

  it("preserves scoped targets in the feedback conflict key", async () => {
    await upsertDisagreementFeedback({
      reportId: "report-1",
      section: "position",
      targetId: bundle.report.positions[0].id,
      vote: "mostly",
      correction: "A correction",
      anonymousSessionHash: "session-hash",
    });
    expect(mocks.values).toHaveBeenCalledWith(expect.objectContaining({ targetId: bundle.report.positions[0].id }));
  });
});
