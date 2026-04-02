import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { recordTopicView, getTrendingTopics } from "@/lib/db/queries";

const TopicViewRequestSchema = z.object({
  topicId: z.string().min(1, "topicId is required").max(200),
});

/**
 * POST /api/topic-views
 * Record a topic view. No auth required (fire-and-forget).
 */
export async function POST(req: NextRequest) {
  // Rate limit: 60 views per minute per IP to prevent view inflation
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const limit = rateLimit(`topic-views:${ip}`, { maxRequests: 60, windowMs: 60 * 1000 });
  if (!limit.success) {
    // Silently accept but don't record — don't leak rate limit info to scrapers
    return NextResponse.json({ ok: true });
  }

  try {
    const raw = await req.json();
    const parseResult = TopicViewRequestSchema.safeParse(raw);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "topicId is required" },
        { status: 400 }
      );
    }
    const { topicId } = parseResult.data;

    // Optionally capture userId if signed in
    const session = await auth();
    const userId = session?.user?.id;

    // Fire-and-forget — don't block the response on DB write
    recordTopicView(topicId, userId).catch(() => {
      // Silently swallow DB errors for view tracking
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

/**
 * GET /api/topic-views
 * Return trending topics (top N by views in last 7 days).
 */
export async function GET(req: NextRequest) {
  // Rate limit: 30 requests per minute per IP
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const limit = rateLimit(`topic-views-list:${ip}`, { maxRequests: 30, windowMs: 60 * 1000 });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Rate limited. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } }
    );
  }

  try {
    const url = new URL(req.url);
    const pageLimit = Math.min(
      parseInt(url.searchParams.get("limit") ?? "10", 10),
      50
    );
    if (isNaN(pageLimit) || pageLimit < 1) {
      return NextResponse.json(
        { error: "Invalid limit parameter" },
        { status: 400 }
      );
    }

    const trending = await getTrendingTopics(pageLimit);
    return NextResponse.json({ trending });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch trending topics" },
      { status: 500 }
    );
  }
}
