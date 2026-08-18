import { NextRequest, NextResponse } from "next/server";
import { createRequestId } from "@/lib/disagreement/errors";
import { handleDisagreementError } from "@/lib/disagreement/http";
import { isDisagreementPublishingEnabled } from "@/lib/disagreement/model";
import {
  createManageToken,
  createReportSlug,
  digestReportBundle,
  validatePublishPayload,
  verifyPublicationToken,
} from "@/lib/disagreement/publication";
import { publishDisagreementReport } from "@/lib/db/queries";

function safeHttpUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  const requestId = request.headers.get("x-request-id") || createRequestId();
  if (!isDisagreementPublishingEnabled()) {
    return NextResponse.json(
      { error: "Publishing is not configured.", code: "FEATURE_DISABLED", requestId },
      { status: 404, headers: { "x-request-id": requestId } },
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
  const validated = validatePublishPayload(body);
  if ("error" in validated) {
    return NextResponse.json(
      { error: validated.error, code: "INVALID_REQUEST", requestId },
      { status: 400, headers: { "x-request-id": requestId } },
    );
  }

  const secret = process.env.REPORT_PUBLICATION_SECRET ?? "";
  const digest = digestReportBundle(validated.report, validated.graph);
  if (
    typeof body.publicationToken !== "string" ||
    !verifyPublicationToken({ token: body.publicationToken, digest, secret })
  ) {
    return NextResponse.json(
      { error: "The publication token is invalid or expired.", code: "INVALID_REQUEST", requestId },
      { status: 401, headers: { "x-request-id": requestId } },
    );
  }

  const source = body.source && typeof body.source === "object"
    ? (body.source as { kind?: string; url?: string; platform?: string })
    : {};

  try {
    const manage = createManageToken();
    let slug = createReportSlug();
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        await publishDisagreementReport({
          slug,
          title: validated.report.title,
          diagnosisHeadline: validated.report.diagnosis.headline,
          diagnosisPattern: validated.report.diagnosis.pattern,
          primaryCrux: validated.report.cruxes[0]?.question ?? null,
          report: validated.report,
          graph: validated.graph,
          reportDigest: digest,
          provider: validated.report.provenance.provider,
          model: validated.report.provenance.model,
          promptVersion: validated.report.provenance.promptVersion,
          manageTokenHash: manage.hash,
          sourceKind: typeof source.kind === "string" ? source.kind : "pasted-text",
          sourceUrl: safeHttpUrl(source.url),
          sourcePlatform: typeof source.platform === "string" ? source.platform : null,
        });
        return NextResponse.json(
          { slug, url: `/d/${slug}`, manageToken: manage.raw },
          { headers: { "x-request-id": requestId } },
        );
      } catch {
        slug = createReportSlug();
      }
    }
    throw new Error("Could not allocate a unique slug");
  } catch (error) {
    return handleDisagreementError(error, requestId);
  }
}
