import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  subscribeTopic,
  unsubscribeTopic,
  isSubscribed,
  getSubscriberCount,
} from "@/lib/db/queries";

/**
 * GET /api/topic-subscriptions?topicId=xxx
 * Check subscription status and subscriber count.
 */
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const topicId = url.searchParams.get("topicId");
    if (!topicId) {
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

    const { topicId, subscribe } = (await req.json()) as {
      topicId?: string;
      subscribe?: boolean;
    };

    if (!topicId || typeof topicId !== "string") {
      return NextResponse.json(
        { error: "topicId is required" },
        { status: 400 }
      );
    }

    if (subscribe) {
      await subscribeTopic(session.user.id, topicId);
    } else {
      await unsubscribeTopic(session.user.id, topicId);
    }

    const subscriberCount = await getSubscriberCount(topicId);

    return NextResponse.json({
      subscribed: !!subscribe,
      subscriberCount,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to update subscription" },
      { status: 500 }
    );
  }
}
