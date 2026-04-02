import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import {
  subscribeTopic,
  unsubscribeTopic,
  isSubscribed,
  getSubscriberCount,
} from "@/lib/db/queries";

const SubscriptionRequestSchema = z.object({
  topicId: z.string().min(1, "topicId is required").max(200),
  subscribe: z.boolean(),
});

/**
 * GET /api/topic-subscriptions?topicId=xxx
 * Check subscription status and subscriber count.
 */
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const topicId = url.searchParams.get("topicId");
    if (!topicId || topicId.length > 200) {
      return NextResponse.json(
        { error: "topicId is required" },
        { status: 400 }
      );
    }

    const session = await auth();
    const userId = session?.user?.id;

    const [subscriberCount, subscribed] = await Promise.all([
      getSubscriberCount(topicId),
      userId ? isSubscribed(userId, topicId) : Promise.resolve(false),
    ]);

    return NextResponse.json({ subscribed, subscriberCount });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch subscription status" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/topic-subscriptions
 * Toggle subscription. Requires auth.
 * Body: { topicId: string; subscribe: boolean }
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Rate limit: 20 requests per minute per user
    const limit = rateLimit(`topic-sub:${session.user.id}`, { maxRequests: 20, windowMs: 60 * 1000 });
    if (!limit.success) {
      return NextResponse.json(
        { error: "Rate limited. Please try again later." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } }
      );
    }

    const raw = await req.json();
    const parseResult = SubscriptionRequestSchema.safeParse(raw);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }
    const { topicId, subscribe } = parseResult.data;

    if (subscribe) {
      await subscribeTopic(session.user.id, topicId);
    } else {
      await unsubscribeTopic(session.user.id, topicId);
    }

    const subscriberCount = await getSubscriberCount(topicId);

    return NextResponse.json({
      subscribed: subscribe,
      subscriberCount,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to update subscription" },
      { status: 500 }
    );
  }
}
