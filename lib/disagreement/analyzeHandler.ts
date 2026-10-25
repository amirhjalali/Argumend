import { NextRequest, NextResponse } from "next/server";
import { DISAGREEMENT_PROMPT_VERSION } from "@/lib/disagreement/constants";
import { analyzeDisagreement } from "@/lib/disagreement/analyze";
import { createRequestId, DisagreementError } from "@/lib/disagreement/errors";
import { handleDisagreementError, logDisagreementEvent } from "@/lib/disagreement/http";
import {
  createDisagreementProvider,
  resolveAnalyzeTimeoutMs,
  isDisagreementPublishingEnabled,
  isDisagreementV2Enabled,
} from "@/lib/disagreement/model";
import { createPublicationToken, digestReportBundle, hashClientKey } from "@/lib/disagreement/publication";
import { canPublishReport } from "@/lib/disagreement/quality";
import { logGapObservation } from "@/lib/gapMetric/log";
import { gapFromDisagreementReport } from "@/lib/gapMetric/record";
import { clientIp } from "@/lib/clientIp";
import { disagreementAnalyzeRateLimiter, type RateLimiter } from "./rateLimiter";

export interface DisagreementAnalyzeHandlerDeps {
  rateLimiter?: RateLimiter;
}

function clientKey(request: NextRequest): string {
  return hashClientKey(clientIp(request));
}

function requestAborted(requestId: string) {
  return NextResponse.json(
    { error: "Request cancelled", code: "REQUEST_ABORTED", requestId },
    { status: 499, headers: { "x-request-id": requestId, "Cache-Control": "no-store" } },
  );
}

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

    if (request.signal.aborted) return requestAborted(requestId);

    let limit;
    try {
      limit = await rateLimiter.check(clientKey(request));
    } catch (error) {
      if (request.signal.aborted) return requestAborted(requestId);
      return handleDisagreementError(error, requestId);
    }
    if (request.signal.aborted) return requestAborted(requestId);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many analyses from this network. Try again later.", code: "RATE_LIMITED", requestId },
        {
          status: 429,
          headers: {
            "x-request-id": requestId,
            "Retry-After": String(Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000))),
            "X-RateLimit-Remaining": String(limit.remaining),
          },
        },
      );
    }

    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      if (request.signal.aborted) return requestAborted(requestId);
      return NextResponse.json(
        { error: "The request could not be understood.", code: "INVALID_REQUEST", requestId },
        { status: 400, headers: { "x-request-id": requestId } },
      );
    }

    const body = raw && typeof raw === "object" ? (raw as { content?: unknown; contentType?: unknown }) : {};
    const signal = AbortSignal.any([request.signal, AbortSignal.timeout(resolveAnalyzeTimeoutMs())]);

    try {
      signal.throwIfAborted();
      const started = Date.now();
      const provider = createDisagreementProvider(requestId);
      const bundle = await analyzeDisagreement({
        content: typeof body.content === "string" ? body.content : "",
        contentType: body.contentType as "conversation" | "article" | "freeform" | undefined,
        requestId,
        provider,
        signal,
      });
      signal.throwIfAborted();

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

      // North-star gap metric: counts and ids only, flag-gated, never awaited.
      void logGapObservation(() => gapFromDisagreementReport(bundle.report), signal);

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
      if (request.signal.aborted) return requestAborted(requestId);
      if (signal.aborted) {
        return handleDisagreementError(new DisagreementError("MODEL_TIMEOUT", requestId), requestId);
      }
      if (error instanceof DisagreementError) {
        logDisagreementEvent({ requestId, code: error.code });
      }
      return handleDisagreementError(error, requestId);
    }
  };
}
