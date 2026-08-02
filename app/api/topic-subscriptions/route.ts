import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import {
  TopicSubscriptionRequestSchema,
  type TopicSubscriptionStatus,
} from "@/lib/subscriptions/contracts";
import {
  subscribeTopic,
  unsubscribeTopic,
  isSubscribed,
  getSubscriberCount,
} from "@/lib/db/queries";
import { sanitizeServerLog } from "@/lib/sanitizeServerLog";

const TopicIdSchema = TopicSubscriptionRequestSchema.shape.topicId;

function subscriptionsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_AUTH === "true";
}

function featureDisabled() {
  return NextResponse.json(
    { error: "Topic follows are not enabled", code: "FEATURE_DISABLED" },
    { status: 404 },
  );
}

/**
 * GET /api/topic-subscriptions?topicId=xxx
 * Check subscription status and subscriber count.
 */
export async function GET(req: NextRequest) {
  if (!subscriptionsEnabled()) return featureDisabled();

  try {
    const url = new URL(req.url);
    const topicIdResult = TopicIdSchema.safeParse(url.searchParams.get("topicId"));
    if (!topicIdResult.success) {
      return NextResponse.json(
        { error: "Invalid topicId", code: "INVALID_REQUEST" },
        { status: 400 },
      );
    }
    const topicId = topicIdResult.data;

    const session = await auth();
    const userId = session?.user?.id;

    const [subscriberCount, subscribed] = await Promise.all([
      getSubscriberCount(topicId),
      userId ? isSubscribed(userId, topicId) : Promise.resolve(false),
    ]);

    const response: TopicSubscriptionStatus = {
      authenticated: Boolean(userId),
      subscribed,
      subscriberCount,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error(
      "Failed to fetch topic follow status:",
      sanitizeServerLog(error),
    );
    return NextResponse.json(
      {
        error: "Topic follows are temporarily unavailable",
        code: "SUBSCRIPTION_UNAVAILABLE",
      },
      { status: 503 },
    );
  }
}

/**
 * POST /api/topic-subscriptions
 * Toggle subscription. Requires auth.
 * Body: { topicId: string; subscribe: boolean }
 */
export async function POST(req: NextRequest) {
  if (!subscriptionsEnabled()) return featureDisabled();

  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required", code: "AUTH_REQUIRED" },
        { status: 401 },
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

    let raw: unknown;
    try {
      raw = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body", code: "INVALID_JSON" },
        { status: 400 },
      );
    }

    const parseResult = TopicSubscriptionRequestSchema.safeParse(raw);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request", code: "INVALID_REQUEST" },
        { status: 400 },
      );
    }
    const { topicId, subscribe } = parseResult.data;

    if (subscribe) {
      await subscribeTopic(session.user.id, topicId);
    } else {
      await unsubscribeTopic(session.user.id, topicId);
    }

    const subscriberCount = await getSubscriberCount(topicId);

    const response: TopicSubscriptionStatus = {
      authenticated: true,
      subscribed: subscribe,
      subscriberCount,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Failed to update topic follow:", sanitizeServerLog(error));
    return NextResponse.json(
      {
        error: "Topic follows are temporarily unavailable",
        code: "SUBSCRIPTION_UNAVAILABLE",
      },
      { status: 503 },
    );
  }
}
