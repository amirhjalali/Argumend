import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getSavedTopicIds, saveTopic, unsaveTopic } from "@/lib/db/queries";

/**
 * GET /api/saved-topics
 *
 * Return the authenticated user's saved topic IDs.
 */
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const topicIds = await getSavedTopicIds(session.user.id);
    return NextResponse.json({ topicIds });
  } catch (error) {
    console.error("Failed to fetch saved topics:", error);
    return NextResponse.json(
      { error: "Failed to fetch saved topics" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/saved-topics
 *
 * Save a topic for the authenticated user.
 * Body: { topicId: string }
 */
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { topicId } = body as { topicId?: string };

    if (!topicId || typeof topicId !== "string") {
      return NextResponse.json(
        { error: "topicId is required" },
        { status: 400 }
      );
    }

    await saveTopic(session.user.id, topicId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save topic:", error);
    return NextResponse.json(
      { error: "Failed to save topic" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/saved-topics
 *
 * Remove a saved topic for the authenticated user.
 * Body: { topicId: string }
 */
export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { topicId } = body as { topicId?: string };

    if (!topicId || typeof topicId !== "string") {
      return NextResponse.json(
        { error: "topicId is required" },
        { status: 400 }
      );
    }

    await unsaveTopic(session.user.id, topicId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to unsave topic:", error);
    return NextResponse.json(
      { error: "Failed to unsave topic" },
      { status: 500 }
    );
  }
}
