import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { getSavedTopicIds, saveTopic, unsaveTopic } from "@/lib/db/queries";
import { sanitizeServerLog } from "@/lib/sanitizeServerLog";

const SavedTopicRequestSchema = z.object({
  topicId: z
    .string()
    .trim()
    .min(1, "topicId is required")
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "topicId must be a topic slug"),
});

function savedTopicsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_AUTH === "true";
}

function featureDisabled() {
  return NextResponse.json(
    { error: "Account-backed saved topics are not enabled", code: "FEATURE_DISABLED" },
    { status: 404 },
  );
}

/**
 * GET /api/saved-topics
 *
 * Return the authenticated user's saved topic IDs.
 */
export async function GET() {
  if (!savedTopicsEnabled()) return featureDisabled();

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const topicIds = await getSavedTopicIds(session.user.id);
    return NextResponse.json({ topicIds });
  } catch (error) {
    console.error("Failed to fetch saved topics:", sanitizeServerLog(error));
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
  if (!savedTopicsEnabled()) return featureDisabled();

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Rate limit: 30 requests per minute per user
  const limit = rateLimit(`saved-topics:${session.user.id}`, { maxRequests: 30, windowMs: 60 * 1000 });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Rate limited. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } }
    );
  }

  try {
    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body", code: "INVALID_JSON" },
        { status: 400 },
      );
    }
    const parseResult = SavedTopicRequestSchema.safeParse(raw);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }
    const { topicId } = parseResult.data;

    await saveTopic(session.user.id, topicId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save topic:", sanitizeServerLog(error));
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
  if (!savedTopicsEnabled()) return featureDisabled();

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Rate limit: 30 requests per minute per user
  const limit = rateLimit(`saved-topics:${session.user.id}`, { maxRequests: 30, windowMs: 60 * 1000 });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Rate limited. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } }
    );
  }

  try {
    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body", code: "INVALID_JSON" },
        { status: 400 },
      );
    }
    const parseResult = SavedTopicRequestSchema.safeParse(raw);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }
    const { topicId } = parseResult.data;

    await unsaveTopic(session.user.id, topicId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to unsave topic:", sanitizeServerLog(error));
    return NextResponse.json(
      { error: "Failed to unsave topic" },
      { status: 500 }
    );
  }
}
