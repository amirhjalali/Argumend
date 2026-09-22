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
import { clientIp } from "@/lib/clientIp";
import { getJevProvider, isJevMapReplyEnabled, resolveJevLane } from "@/lib/jev/client";
import { MAP_REPLY_LIMITS, MAP_REPLY_RATE_LIMITS, MAP_REPLY_TIMEOUT_MS } from "@/lib/mapReply/constants";
import { MapReplyError, toMapReplyError } from "@/lib/mapReply/errors";
import {
  exceedsDeclaredBodySize,
  mapReplyJsonError,
  resolveRequestId,
} from "@/lib/mapReply/http";
import { runMapReply } from "@/lib/mapReply/pipeline";
import { rateLimit } from "@/lib/rate-limit";
import { sanitizeServerLog } from "@/lib/sanitizeServerLog";

export const runtime = "nodejs";

const MapReplyRequestSchema = z.object({
  text: z.string(),
});

function rateLimited(requestId: string, resetAt: number, remaining: number) {
  return mapReplyJsonError(requestId, new MapReplyError("RATE_LIMITED"), {
    "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)),
    "X-RateLimit-Remaining": String(Math.max(0, remaining)),
  });
}

export async function POST(request: NextRequest) {
  const requestId = resolveRequestId(request.headers.get("x-request-id"));

  if (!isJevMapReplyEnabled()) {
    return mapReplyJsonError(requestId, new MapReplyError("FEATURE_DISABLED"));
  }

  const lane = resolveJevLane();
  // Fixture answers must never be served as if they were real judgements.
  if (lane === "fake" && process.env.NODE_ENV === "production") {
    return mapReplyJsonError(requestId, new MapReplyError("PROVIDER_NOT_CONFIGURED"));
  }

  // The hourly bucket is flood protection and is spent on every attempt. The
  // daily bucket is the third-party spend budget and is only spent on a
  // request that is actually going to be served, so a burst of malformed or
  // oversized requests cannot exhaust the day's allowance in an hour.
  const key = clientIp(request);
  const hourly = rateLimit(`map-reply-hour:${key}`, {
    maxRequests: MAP_REPLY_RATE_LIMITS.perHour,
    windowMs: MAP_REPLY_RATE_LIMITS.hourWindowMs,
  });
  if (!hourly.success) {
    return rateLimited(requestId, hourly.resetAt, hourly.remaining);
  }

  // Refuse an oversized body before reading it, where the runtime reports one.
  if (exceedsDeclaredBodySize(request.headers.get("content-length"))) {
    return mapReplyJsonError(requestId, new MapReplyError("CONTENT_TOO_LONG"));
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return mapReplyJsonError(requestId, new MapReplyError("INVALID_REQUEST"));
  }

  const parsed = MapReplyRequestSchema.safeParse(raw);
  if (!parsed.success) {
    return mapReplyJsonError(requestId, new MapReplyError("INVALID_REQUEST"));
  }

  const text = parsed.data.text.trim();
  if (text.length < MAP_REPLY_LIMITS.minCharacters) {
    return mapReplyJsonError(requestId, new MapReplyError("CONTENT_TOO_SHORT"));
  }
  if (text.length > MAP_REPLY_LIMITS.maxCharacters) {
    return mapReplyJsonError(requestId, new MapReplyError("CONTENT_TOO_LONG"));
  }

  const daily = rateLimit(`map-reply-day:${key}`, {
    maxRequests: MAP_REPLY_RATE_LIMITS.perDay,
    windowMs: MAP_REPLY_RATE_LIMITS.dayWindowMs,
  });
  if (!daily.success) {
    return rateLimited(requestId, daily.resetAt, daily.remaining);
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
    return mapReplyJsonError(requestId, mapped);
  }
}
