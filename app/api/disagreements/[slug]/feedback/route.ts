import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { DISAGREEMENT_LIMITS } from "@/lib/disagreement/constants";
import { createRequestId } from "@/lib/disagreement/errors";
import { handleDisagreementError } from "@/lib/disagreement/http";
import { hashOpaque } from "@/lib/disagreement/publication";
import { getPublishedDisagreementReport, upsertDisagreementFeedback } from "@/lib/db/queries";
import { isDatabaseConfigured } from "@/lib/db";
import { clientIp } from "@/lib/clientIp";
import { rateLimit } from "@/lib/rate-limit";

const FeedbackSchema = z.object({
  section: z.enum(["overall", "position", "common-ground", "crux", "abuse"]),
  targetId: z.string().min(1).optional(),
  vote: z.enum(["accurate", "mostly", "inaccurate"]).optional(),
  correction: z.string().max(DISAGREEMENT_LIMITS.maxCorrectionCharacters).optional(),
  anonymousSessionId: z.string().refine((value) => value.trim().length > 0),
}).superRefine((value, context) => {
  const targeted = value.section === "position" || value.section === "common-ground" || value.section === "crux";
  if (targeted !== (value.targetId !== undefined)) {
    context.addIssue({ code: "custom", path: ["targetId"], message: "Invalid feedback target." });
  }
  if (!value.vote && !value.correction?.trim()) {
    context.addIssue({ code: "custom", path: ["vote"], message: "Provide a vote or correction." });
  }
});

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

  // Keyed on the client address, never on `requestId`: that is a per-request
  // nonce and, worse, an inbound `x-request-id` when the caller sends one, so
  // every request minted its own bucket and the limit below never fired.
  const limit = rateLimit(`disagreement-feedback:${clientIp(request)}`, {
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

  const parsed = FeedbackSchema.safeParse(raw);
  if (!parsed.success) {
    const correctionTooLong = parsed.error.issues.some(
      (issue) => issue.path[0] === "correction" && issue.code === "too_big",
    );
    return NextResponse.json(
      {
        error: correctionTooLong ? "Correction is too long." : "The request could not be understood.",
        code: "INVALID_REQUEST",
        requestId,
      },
      { status: 400, headers: { "x-request-id": requestId } },
    );
  }
  const { section, targetId, vote, correction, anonymousSessionId } = parsed.data;

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
      const targets = section === "position" ? report.report.positions
        : section === "common-ground" ? report.report.commonGround : report.report.cruxes;
      if (!targets.some((item) => item.id === targetId)) {
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
      anonymousSessionHash: hashOpaque(anonymousSessionId),
    });

    return NextResponse.json({ ok: true }, { headers: { "x-request-id": requestId } });
  } catch {
    // Database query errors can contain the private correction in parameters.
    return handleDisagreementError(new Error("Could not save report feedback"), requestId);
  }
}
