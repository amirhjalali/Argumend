import { NextRequest, NextResponse } from "next/server";
import { DISAGREEMENT_LIMITS } from "@/lib/disagreement/constants";
import { createRequestId } from "@/lib/disagreement/errors";
import { handleDisagreementError } from "@/lib/disagreement/http";
import { hashOpaque } from "@/lib/disagreement/publication";
import { getPublishedDisagreementReport, upsertDisagreementFeedback } from "@/lib/db/queries";
import { isDatabaseConfigured } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

const SECTIONS = new Set(["overall", "position", "common-ground", "crux", "abuse"]);
const VOTES = new Set(["accurate", "mostly", "inaccurate"]);

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const requestId = request.headers.get("x-request-id") || createRequestId();
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Feedback is not available.", code: "FEATURE_DISABLED", requestId },
      { status: 404, headers: { "x-request-id": requestId } },
    );
  }

  const limit = rateLimit(`disagreement-feedback:${requestId}`, {
    maxRequests: 20,
    windowMs: 60 * 60 * 1000,
  });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many feedback submissions.", code: "RATE_LIMITED", requestId },
      { status: 429, headers: { "x-request-id": requestId } },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { error: "The request could not be understood.", code: "INVALID_REQUEST", requestId },
      { status: 400, headers: { "x-request-id": requestId } },
    );
  }

  const body = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const section = typeof body.section === "string" ? body.section : "";
  const vote = typeof body.vote === "string" ? body.vote : undefined;
  const correction = typeof body.correction === "string" ? body.correction : undefined;
  const sessionId = typeof body.anonymousSessionId === "string" ? body.anonymousSessionId : "";
  const targetId = typeof body.targetId === "string" ? body.targetId : undefined;

  if (!SECTIONS.has(section) || !sessionId) {
    return NextResponse.json(
      { error: "The request could not be understood.", code: "INVALID_REQUEST", requestId },
      { status: 400, headers: { "x-request-id": requestId } },
    );
  }
  if (vote && !VOTES.has(vote)) {
    return NextResponse.json(
      { error: "The request could not be understood.", code: "INVALID_REQUEST", requestId },
      { status: 400, headers: { "x-request-id": requestId } },
    );
  }
  if (correction && correction.length > DISAGREEMENT_LIMITS.maxCorrectionCharacters) {
    return NextResponse.json(
      { error: "Correction is too long.", code: "INVALID_REQUEST", requestId },
      { status: 400, headers: { "x-request-id": requestId } },
    );
  }

  try {
    const { slug } = await context.params;
    const report = await getPublishedDisagreementReport(slug);
    if (!report) {
      return NextResponse.json(
        { error: "Report not found.", code: "INVALID_REQUEST", requestId },
        { status: 404, headers: { "x-request-id": requestId } },
      );
    }

    if (targetId && (section === "position" || section === "common-ground" || section === "crux")) {
      const ids = [
        ...report.report.positions.map((item) => item.id),
        ...report.report.commonGround.map((item) => item.id),
        ...report.report.cruxes.map((item) => item.id),
      ];
      if (!ids.includes(targetId)) {
        return NextResponse.json(
          { error: "Unknown feedback target.", code: "INVALID_REQUEST", requestId },
          { status: 400, headers: { "x-request-id": requestId } },
        );
      }
    }

    await upsertDisagreementFeedback({
      reportId: report.id,
      section,
      targetId,
      vote,
      correction,
      anonymousSessionHash: hashOpaque(sessionId),
    });

    return NextResponse.json({ ok: true }, { headers: { "x-request-id": requestId } });
  } catch (error) {
    return handleDisagreementError(error, requestId);
  }
}
