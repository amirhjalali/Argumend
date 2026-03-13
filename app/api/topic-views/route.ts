import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { recordTopicView, getTrendingTopics } from "@/lib/db/queries";

/**
 * POST /api/topic-views
 * Record a topic view. No auth required (fire-and-forget).
 */
export async function POST(req: NextRequest) {
  try {
    const { topicId } = (await req.json()) as { topicId?: string };
    if (!topicId || typeof topicId !== "string") {
      return NextResponse.json(
        { error: "topicId is required" },
        { status: 400 }
      );
    }

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
  try {
    const url = new URL(req.url);
    const limit = Math.min(
      parseInt(url.searchParams.get("limit") ?? "10", 10),
      50
    );

    const trending = await getTrendingTopics(limit);
    return NextResponse.json({ trending });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch trending topics" },
      { status: 500 }
    );
  }
}
