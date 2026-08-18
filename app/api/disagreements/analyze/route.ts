import { NextRequest, NextResponse } from "next/server";
import { DISAGREEMENT_ANALYZE_RATE_LIMITS, DISAGREEMENT_PROMPT_VERSION } from "@/lib/disagreement/constants";
import { analyzeDisagreement } from "@/lib/disagreement/analyze";
import { createRequestId, DisagreementError } from "@/lib/disagreement/errors";
import { handleDisagreementError, logDisagreementEvent } from "@/lib/disagreement/http";
import {
  createDisagreementProvider,
  isDisagreementPublishingEnabled,
  isDisagreementV2Enabled,
} from "@/lib/disagreement/model";
import { createPublicationToken, digestReportBundle, hashClientKey } from "@/lib/disagreement/publication";
import { canPublishReport } from "@/lib/disagreement/quality";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for") ?? "unknown";
  const first = forwarded.split(",")[0]?.trim() || "unknown";
  return hashClientKey(first);
}

export async function POST(request: NextRequest) {
  const requestId = request.headers.get("x-request-id") || createRequestId();
  if (!isDisagreementV2Enabled()) {
    return NextResponse.json(
      { error: "Disagreement diagnosis is not enabled.", code: "FEATURE_DISABLED", requestId },
      { status: 404, headers: { "x-request-id": requestId } },
    );
  }

  const key = clientKey(request);
  const hourly = rateLimit(`disagreement-hour:${key}`, {
    maxRequests: DISAGREEMENT_ANALYZE_RATE_LIMITS.perHour,
    windowMs: DISAGREEMENT_ANALYZE_RATE_LIMITS.hourWindowMs,
  });
  const daily = rateLimit(`disagreement-day:${key}`, {
    maxRequests: DISAGREEMENT_ANALYZE_RATE_LIMITS.perDay,
    windowMs: DISAGREEMENT_ANALYZE_RATE_LIMITS.dayWindowMs,
  });
  if (!hourly.success || !daily.success) {
    const resetAt = Math.max(hourly.resetAt, daily.resetAt);
    return NextResponse.json(
      { error: "Too many analyses from this network. Try again later.", code: "RATE_LIMITED", requestId },
      {
        status: 429,
        headers: {
          "x-request-id": requestId,
          "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)),
          "X-RateLimit-Remaining": String(Math.min(hourly.remaining, daily.remaining)),
        },
      },
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

  const body = raw && typeof raw === "object" ? (raw as { content?: unknown; contentType?: unknown }) : {};

  try {
    const started = Date.now();
    const provider = createDisagreementProvider(requestId);
    const timeout = AbortSignal.timeout(45_000);
    const bundle = await analyzeDisagreement({
      content: typeof body.content === "string" ? body.content : "",
      contentType: body.contentType as "conversation" | "article" | "freeform" | undefined,
      requestId,
      provider,
      signal: timeout,
    });

    const publishable = canPublishReport(bundle.report);
    const publishingEnabled = isDisagreementPublishingEnabled();
    const secret = process.env.REPORT_PUBLICATION_SECRET;
    let publishing: {
      available: boolean;
      token?: string;
      expiresAt?: string;
      unavailableReason?: string;
    } = { available: false, unavailableReason: "Publishing is not configured." };

    if (!publishable.ok) {
      publishing = { available: false, unavailableReason: publishable.reasons[0] };
    } else if (publishingEnabled && secret) {
      const digest = digestReportBundle(bundle.report, bundle.graph);
      const token = createPublicationToken({ digest, secret });
      publishing = { available: true, token: token.token, expiresAt: token.expiresAt };
    }

    logDisagreementEvent({
      requestId,
      provider: bundle.execution.provider,
      model: bundle.execution.model,
      promptVersion: DISAGREEMENT_PROMPT_VERSION,
      latencyMs: Date.now() - started,
      characterCount: bundle.execution.inputCharacters,
      droppedQuotes: bundle.report.quality.droppedUngroundedQuoteCount,
    });

    return NextResponse.json(
      {
        report: bundle.report,
        graph: bundle.graph,
        execution: {
          mode: "live",
          provider: bundle.execution.provider,
          model: bundle.execution.model,
          promptVersion: bundle.execution.promptVersion,
          latencyMs: bundle.execution.latencyMs,
        },
        publishing,
      },
      { headers: { "x-request-id": requestId } },
    );
  } catch (error) {
    if (error instanceof DisagreementError) {
      logDisagreementEvent({ requestId, code: error.code });
    }
    return handleDisagreementError(error, requestId);
  }
}
