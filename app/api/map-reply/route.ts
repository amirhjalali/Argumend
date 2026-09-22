/**
 * POST /api/map-reply
 *
 * Pasted thread in, composed Argumend map reply out. Gated by
 * `ENABLE_JEV_MAP_REPLY`, which is off by default because the live lane posts
 * the pasted text to TypeSafe AI, a third party.
 *
 * The body is never persisted and never logged. The log line carries lengths,
 * timings, the model the API reported, token usage and the chosen topic id —
 * nothing a reader wrote.
 */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getJevProvider, isJevMapReplyEnabled, resolveJevLane } from "@/lib/jev/client";
import { MAP_REPLY_LIMITS, MAP_REPLY_RATE_LIMITS, MAP_REPLY_TIMEOUT_MS } from "@/lib/mapReply/constants";
import { MapReplyError, toMapReplyError } from "@/lib/mapReply/errors";
import { runMapReply } from "@/lib/mapReply/pipeline";
import { rateLimit } from "@/lib/rate-limit";
import { sanitizeServerLog } from "@/lib/sanitizeServerLog";

export const runtime = "nodejs";

const MapReplyRequestSchema = z.object({
  text: z.string(),
});

function createRequestId(): string {
  return crypto.randomUUID();
}

function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for") ?? "unknown";
  return forwarded.split(",")[0]?.trim() || "unknown";
}

function jsonError(code: MapReplyError["code"], requestId: string, error: MapReplyError, extraHeaders?: HeadersInit) {
  return NextResponse.json(
    { error: error.message, code, requestId },
    { status: error.status, headers: { "x-request-id": requestId, ...extraHeaders } },
  );
}

export async function POST(request: NextRequest) {
  const requestId = request.headers.get("x-request-id") || createRequestId();

  if (!isJevMapReplyEnabled()) {
    const error = new MapReplyError("FEATURE_DISABLED");
    return jsonError("FEATURE_DISABLED", requestId, error);
  }

  const lane = resolveJevLane();
  // Fixture answers must never be served as if they were real judgements.
  if (lane === "fake" && process.env.NODE_ENV === "production") {
    const error = new MapReplyError("PROVIDER_NOT_CONFIGURED");
    return jsonError("PROVIDER_NOT_CONFIGURED", requestId, error);
  }

  const key = clientKey(request);
  const hourly = rateLimit(`map-reply-hour:${key}`, {
    maxRequests: MAP_REPLY_RATE_LIMITS.perHour,
    windowMs: MAP_REPLY_RATE_LIMITS.hourWindowMs,
  });
  const daily = rateLimit(`map-reply-day:${key}`, {
    maxRequests: MAP_REPLY_RATE_LIMITS.perDay,
    windowMs: MAP_REPLY_RATE_LIMITS.dayWindowMs,
  });
  if (!hourly.success || !daily.success) {
    const resetAt = Math.max(hourly.resetAt, daily.resetAt);
    return jsonError("RATE_LIMITED", requestId, new MapReplyError("RATE_LIMITED"), {
      "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)),
      "X-RateLimit-Remaining": String(Math.min(hourly.remaining, daily.remaining)),
    });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return jsonError("INVALID_REQUEST", requestId, new MapReplyError("INVALID_REQUEST"));
  }

  const parsed = MapReplyRequestSchema.safeParse(raw);
  if (!parsed.success) {
    return jsonError("INVALID_REQUEST", requestId, new MapReplyError("INVALID_REQUEST"));
  }

  const text = parsed.data.text.trim();
  if (text.length < MAP_REPLY_LIMITS.minCharacters) {
    return jsonError("CONTENT_TOO_SHORT", requestId, new MapReplyError("CONTENT_TOO_SHORT"));
  }
  if (text.length > MAP_REPLY_LIMITS.maxCharacters) {
    return jsonError("CONTENT_TOO_LONG", requestId, new MapReplyError("CONTENT_TOO_LONG"));
  }

  const startedAt = Date.now();
  try {
    const result = await runMapReply({
      text,
      provider: getJevProvider(),
      signal: AbortSignal.timeout(MAP_REPLY_TIMEOUT_MS),
    });

    // Lengths, timings, model, tokens, topic id. Never the text itself.
    console.info("[argumend:map-reply]", {
      requestId,
      lane: result.execution.lane,
      model: result.execution.model,
      version: result.execution.version,
      ok: result.ok,
      reason: result.ok ? undefined : result.reason,
      topicId: result.ok ? result.topic.id : undefined,
      characterCount: result.thread.characterCount,
      turnCount: result.thread.turnCount,
      substantiveCount: result.thread.substantiveCount,
      redactions: result.execution.redactions,
      requests: result.execution.requests,
      retries: result.execution.retries,
      inputTokens: result.execution.usage.inputTokens,
      outputTokens: result.execution.usage.outputTokens,
      timings: result.execution.timings,
      latencyMs: Date.now() - startedAt,
    });

    return NextResponse.json(
      { requestId, ...result },
      { headers: { "x-request-id": requestId, "Cache-Control": "no-store" } },
    );
  } catch (error) {
    const mapped = toMapReplyError(error);
    console.error("[argumend:map-reply]", {
      requestId,
      code: mapped.code,
      characterCount: text.length,
      latencyMs: Date.now() - startedAt,
      message: sanitizeServerLog(error),
    });
    return jsonError(mapped.code, requestId, mapped);
  }
}
