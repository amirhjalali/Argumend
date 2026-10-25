import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { DrizzleQueryError } from "drizzle-orm";
import { analyzeDisagreement } from "@/lib/disagreement/analyze";
import { FakeDisagreementProvider } from "@/lib/disagreement/model/fake";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "@/lib/disagreement/prompts/v1/examples";
import { DISAGREEMENT_LIMITS } from "@/lib/disagreement/constants";
import { hashOpaque } from "@/lib/disagreement/publication";
import type { DisagreementReportV1 } from "@/types/disagreement";

const mocks = vi.hoisted(() => ({
  configured: vi.fn(),
  getReport: vi.fn(),
  saveFeedback: vi.fn(),
  rateLimit: vi.fn(),
}));

vi.mock("@/lib/db", () => ({ isDatabaseConfigured: mocks.configured }));
vi.mock("@/lib/db/queries", () => ({
  getPublishedDisagreementReport: mocks.getReport,
  upsertDisagreementFeedback: mocks.saveFeedback,
}));
vi.mock("@/lib/rate-limit", () => ({ rateLimit: mocks.rateLimit }));

import { POST } from "./route";

const context = { params: Promise.resolve({ slug: "a-report" }) };
const SESSION_ID = "anonymous-session-1";
let report: DisagreementReportV1;

function post(body: unknown, raw?: string) {
  return new NextRequest("http://localhost/api/disagreements/a-report/feedback", {
    method: "POST",
    headers: { "content-type": "application/json", "x-request-id": "feedback-request" },
    body: raw ?? JSON.stringify(body),
  });
}

function payload(extra: Record<string, unknown> = {}) {
  return { section: "overall", vote: "accurate", anonymousSessionId: SESSION_ID, ...extra };
}

describe("POST /api/disagreements/[slug]/feedback", () => {
  beforeAll(async () => {
    const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[1];
    const extraction = structuredClone(example.extraction);
    extraction.commonGroundCandidates = [{
      statement: "Workers should earn a stable wage.",
      participantIds: ["alex", "blair"],
      basis: "explicit",
      confidence: "high",
      groundingQuotes: [
        { quote: "We both want workers to earn a stable wage.", participantId: "alex" },
        { quote: "Yes, workers should earn a stable wage.", participantId: "blair" },
      ],
    }];
    const bundle = await analyzeDisagreement({
      content: `${example.source}\nAlex: We both want workers to earn a stable wage.\nBlair: Yes, workers should earn a stable wage.`,
      requestId: "feedback-fixture",
      provider: new FakeDisagreementProvider(extraction),
    });
    report = bundle.report;
    expect(report.commonGround).toHaveLength(1);
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.configured.mockReturnValue(true);
    mocks.rateLimit.mockReturnValue({ success: true, remaining: 19, resetAt: Date.now() + 1000 });
    mocks.getReport.mockResolvedValue({ id: "report-1", visibility: "unlisted", deletedAt: null, report });
    mocks.saveFeedback.mockResolvedValue({ id: "feedback-1" });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("hashes the anonymous session and persists a valid report-wide vote", async () => {
    const response = await POST(post(payload()), context);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(mocks.saveFeedback).toHaveBeenCalledWith({
      reportId: "report-1",
      section: "overall",
      targetId: undefined,
      vote: "accurate",
      correction: undefined,
      anonymousSessionHash: hashOpaque(SESSION_ID),
    });
    expect(JSON.stringify(mocks.saveFeedback.mock.calls)).not.toContain(SESSION_ID);
  });

  it.each(["position", "common-ground", "crux"] as const)(
    "accepts an existing target in the %s section",
    async (section) => {
      const targetId = section === "position" ? report.positions[0].id
        : section === "common-ground" ? report.commonGround[0].id : report.cruxes[0].id;
      const response = await POST(post(payload({ section, targetId })), context);
      expect(response.status).toBe(200);
      expect(mocks.saveFeedback).toHaveBeenCalledWith(expect.objectContaining({ section, targetId }));
    },
  );

  it.each(["position", "common-ground", "crux"] as const)(
    "rejects a target from another report section for %s feedback",
    async (section) => {
      const targetId = section === "crux" ? report.positions[0].id : report.cruxes[0].id;
      const response = await POST(post(payload({ section, targetId })), context);
      expect(response.status).toBe(400);
      expect(mocks.saveFeedback).not.toHaveBeenCalled();
    },
  );

  it.each(["position", "common-ground", "crux"] as const)(
    "requires a target for %s feedback",
    async (section) => {
      const response = await POST(post(payload({ section })), context);
      expect(response.status).toBe(400);
      expect(mocks.saveFeedback).not.toHaveBeenCalled();
    },
  );

  it.each(["overall", "abuse"] as const)("rejects an unrelated target for %s feedback", async (section) => {
    const response = await POST(post(payload({ section, targetId: "arbitrary-target" })), context);
    expect(response.status).toBe(400);
    expect(mocks.saveFeedback).not.toHaveBeenCalled();
  });

  it.each([
    { vote: 3 },
    { vote: null },
    { vote: "" },
    { vote: "unknown" },
    { correction: 3 },
    { correction: null },
    { targetId: 3 },
    { targetId: null },
    { anonymousSessionId: "   " },
    { section: "position", targetId: "" },
    { vote: undefined, correction: "   " },
  ])("rejects malformed feedback fields: %j", async (fields) => {
    const response = await POST(post(payload(fields)), context);
    expect(response.status).toBe(400);
    expect(mocks.saveFeedback).not.toHaveBeenCalled();
  });

  it("allows a correction without a vote", async () => {
    const response = await POST(post(payload({ vote: undefined, correction: "The source says something else." })), context);
    expect(response.status).toBe(200);
    expect(mocks.saveFeedback).toHaveBeenCalledWith(expect.objectContaining({
      vote: undefined,
      correction: "The source says something else.",
    }));
  });

  it("enforces the correction limit before looking up the report", async () => {
    const response = await POST(post(payload({ correction: "x".repeat(DISAGREEMENT_LIMITS.maxCorrectionCharacters + 1) })), context);
    expect(response.status).toBe(400);
    expect(mocks.getReport).not.toHaveBeenCalled();
    expect(mocks.saveFeedback).not.toHaveBeenCalled();
  });

  it("does not save feedback for a missing or deleted report", async () => {
    mocks.getReport.mockResolvedValueOnce(undefined);
    const response = await POST(post(payload()), context);
    expect(response.status).toBe(404);
    expect(mocks.saveFeedback).not.toHaveBeenCalled();
  });

  it("does not access the database when feedback is disabled", async () => {
    mocks.configured.mockReturnValueOnce(false);
    const response = await POST(post(payload()), context);
    expect(response.status).toBe(404);
    expect(mocks.getReport).not.toHaveBeenCalled();
    expect(mocks.saveFeedback).not.toHaveBeenCalled();
  });

  it("does not access the database after the rate limit is reached", async () => {
    mocks.rateLimit.mockReturnValueOnce({ success: false });
    const response = await POST(post(payload()), context);
    expect(response.status).toBe(429);
    expect(mocks.getReport).not.toHaveBeenCalled();
    expect(mocks.saveFeedback).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON", async () => {
    const response = await POST(post({}, "{"), context);
    expect(response.status).toBe(400);
    expect(mocks.getReport).not.toHaveBeenCalled();
    expect(mocks.saveFeedback).not.toHaveBeenCalled();
  });

  it("never logs private correction text from a failed database write", async () => {
    const privateLine = "This second correction line must stay private.";
    const correction = `A correction heading\n${privateLine}`;
    const logging = vi.spyOn(console, "error").mockImplementation(() => {});
    mocks.saveFeedback.mockRejectedValueOnce(new DrizzleQueryError(
      "insert into disagreement_feedback values ($1)",
      [correction],
      new Error("write failed"),
    ));

    const response = await POST(post(payload({ correction })), context);

    expect(response.status).toBe(500);
    expect(JSON.stringify(logging.mock.calls)).not.toContain(privateLine);
    expect(JSON.stringify(await response.json())).not.toContain(privateLine);
  });
});
