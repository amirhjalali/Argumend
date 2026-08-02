import { NextResponse } from "next/server";
import { TOPIC_COUNT } from "@/data/topicIndex";
import { HealthResponseSchema } from "./_schema";

export const dynamic = "force-dynamic";

function liveModeEnabled(): boolean {
  return [
    process.env.ENABLE_LIVE_ANALYZE_API,
    process.env.ENABLE_LIVE_DEBATE_API,
    process.env.ENABLE_LIVE_JUDGING_API,
  ].some((value) => value === "true");
}

/**
 * Process/readiness probe that remains useful in offline mode.
 * It deliberately does not contact the database or model providers: those are
 * optional integrations and must not make the core static product unhealthy.
 */
export function GET() {
  const ready = TOPIC_COUNT > 0;
  const body = HealthResponseSchema.parse({
    status: ready ? "ok" : "degraded",
    ready,
    mode: liveModeEnabled() ? "live-enabled" : "offline",
    checks: {
      static_content: ready ? "ok" : "unavailable",
    },
    topic_count: TOPIC_COUNT,
    uptime_seconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json(body, {
    status: ready ? 200 : 503,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
