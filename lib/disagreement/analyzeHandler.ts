import { NextRequest, NextResponse } from "next/server";
import { DISAGREEMENT_PROMPT_VERSION } from "./constants";
import { analyzeDisagreement } from "./analyze";
import { createRequestId, DisagreementError } from "./errors";
import { handleDisagreementError, logDisagreementEvent } from "./http";
import {
  createDisagreementProvider,
  resolveAnalyzeTimeoutMs,
  isDisagreementPublishingEnabled,
  isDisagreementV2Enabled,
} from "./model";
import { createPublicationToken, digestReportBundle, hashClientKey } from "./publication";
import { canPublishReport } from "./quality";
import { disagreementAnalyzeRateLimiter, type RateLimiter } from "./rateLimiter";

export interface DisagreementAnalyzeHandlerDeps {
  /** Defaults to the per-process in-memory limiter. Inject a fake in tests. */
  rateLimiter?: RateLimiter;
}

function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for") ?? "unknown";
  const first = forwarded.split(",")[0]?.trim() || "unknown";
  return hashClientKey(first);
}

/**
 * Builds the POST handler for /api/disagreements/analyze.
 *
 * The route file exports `createDisagreementAnalyzeHandler()` as `POST`. Tests
 * build their own handler with a stub limiter to pin the 429 contract without
 * touching the shared in-memory store.
 */
export function createDisagreementAnalyzeHandler(deps: DisagreementAnalyzeHandlerDeps = {}) {
  const rateLimiter = deps.rateLimiter ?? disagreementAnalyzeRateLimiter;

  return async function POST(request: NextRequest) {
    const requestId = request.headers.get("x-request-id") || createRequestId();
    if (!isDisagreementV2Enabled()) {
      return NextResponse.json(
        { error: "Disagreement diagnosis is not enabled.", code: "FEATURE_DISABLED", requestId },
        { status: 404, headers: { "x-request-id": requestId } },
      );
    }

    const limit = await rateLimiter.check(clientKey(request));
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many analyses from this network. Try again later.", code: "RATE_LIMITED", requestId },
        {
          status: 429,
          headers: {
            "x-request-id": requestId,
            "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)),
            "X-RateLimit-Remaining": String(limit.remaining),
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
      const timeout = AbortSignal.timeout(resolveAnalyzeTimeoutMs());
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
  };
}
