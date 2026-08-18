import { NextRequest, NextResponse } from "next/server";
import { createRequestId } from "@/lib/disagreement/errors";
import { handleDisagreementError } from "@/lib/disagreement/http";
import { tokensMatch } from "@/lib/disagreement/publication";
import {
  getDisagreementReportBySlug,
  softDeleteDisagreementReport,
} from "@/lib/db/queries";
import { isDatabaseConfigured } from "@/lib/db";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const requestId = request.headers.get("x-request-id") || createRequestId();
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Publishing is not configured.", code: "FEATURE_DISABLED", requestId },
      { status: 404, headers: { "x-request-id": requestId } },
    );
  }

  const { slug } = await context.params;
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) {
    return NextResponse.json(
      { error: "Missing management token.", code: "INVALID_REQUEST", requestId },
      { status: 401, headers: { "x-request-id": requestId } },
    );
  }

  try {
    const row = await getDisagreementReportBySlug(slug);
    if (!row || row.visibility === "deleted" || !tokensMatch(token, row.manageTokenHash)) {
      return NextResponse.json(
        { error: "Report not found.", code: "INVALID_REQUEST", requestId },
        { status: 404, headers: { "x-request-id": requestId } },
      );
    }
    await softDeleteDisagreementReport(slug);
    return NextResponse.json({ ok: true }, { headers: { "x-request-id": requestId } });
  } catch (error) {
    return handleDisagreementError(error, requestId);
  }
}
