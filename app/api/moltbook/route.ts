/**
 * Moltbook Integration API
 *
 * Endpoints for posting debates to Moltbook and fetching responses.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { MoltbookClient } from "@/lib/moltbook/client";
import { MoltbookDebateService, NOTABLE_DEBATE_AGENTS } from "@/lib/moltbook/debate-integration";
import { topicSummaries } from "@/data/topicIndex";
import { loadTopicById } from "@/data/topicLoader";
import { sanitizeServerLog } from "@/lib/sanitizeServerLog";
import { isAuthConfigured } from "@/lib/auth-config";

const MoltbookAgentResponseSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  avatar_url: z.string().optional(),
  follower_count: z.number().finite().nonnegative().optional(),
  post_count: z.number().finite().nonnegative().optional(),
  claimed: z.boolean(),
}).passthrough();

const MoltbookPostResponseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  content: z.string().optional(),
  url: z.string().optional(),
  submolt: z.string().min(1),
  author: MoltbookAgentResponseSchema,
  upvotes: z.number().finite(),
  downvotes: z.number().finite(),
  comment_count: z.number().finite().nonnegative(),
  created_at: z.string().min(1),
}).passthrough();

const MoltbookFeedResponseSchema = z.array(MoltbookPostResponseSchema);

const MoltbookPostSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("post"),
    submolt: z.string().min(1).max(200),
    title: z.string().min(1).max(500),
    content: z.string().max(50000).optional(),
    url: z.string().url().max(2000).optional(),
  }),
  z.object({
    action: z.literal("post_debate"),
    topicId: z.string().min(1).max(200),
  }),
  z.object({
    action: z.literal("post_invitation"),
    topicId: z.string().min(1).max(200),
    position: z.enum(["for", "against"]),
  }),
  z.object({
    action: z.literal("post_argument"),
    postId: z.string().min(1),
    round: z.number().int().min(1).max(20),
    side: z.enum(["for", "against"]),
    agentName: z.string().min(1).max(200),
    argument: z.string().min(1).max(50000),
    parentCommentId: z.string().optional(),
  }),
  z.object({
    action: z.literal("fetch_responses"),
    postId: z.string().min(1),
  }),
  z.object({
    action: z.literal("invite_agent"),
    agentName: z.string().min(1).max(200),
    topicTitle: z.string().min(1).max(500),
    postId: z.string().min(1),
  }),
]);

const MOLTBOOK_UNAVAILABLE_MESSAGE =
  "Moltbook is temporarily unavailable. Please try again later.";

function featureUnavailable() {
  return NextResponse.json(
    {
      success: false,
      error: "Moltbook sharing is not available.",
      code: "FEATURE_UNAVAILABLE",
      configured: false,
    },
    { status: 503 },
  );
}

function upstreamUnavailable() {
  return NextResponse.json(
    {
      success: false,
      error: MOLTBOOK_UNAVAILABLE_MESSAGE,
      code: "UPSTREAM_UNAVAILABLE",
    },
    { status: 502 },
  );
}

// Lazy initialization to avoid build-time errors
function getClient(): MoltbookClient | null {
  const apiKey = process.env.MOLTBOOK_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new MoltbookClient(apiKey);
}

function parseCooldownMinutes(hint?: string): number | null {
  if (!hint) return null;
  const match = hint.match(/(\d+)/);
  if (!match) return null;
  const parsed = Number.parseInt(match[1], 10);
  return Number.isNaN(parsed) ? null : parsed;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get("action");

  if (action === "feed") {
    const client = getClient();
    if (!client) {
      return featureUnavailable();
    }

    const submolt = searchParams.get("submolt") ?? undefined;
    const sortParam = searchParams.get("sort");
    const sort =
      sortParam === "hot" ||
      sortParam === "new" ||
      sortParam === "top" ||
      sortParam === "rising"
        ? sortParam
        : "new";
    const limitRaw = Number.parseInt(searchParams.get("limit") ?? "", 10);
    const limit = Number.isNaN(limitRaw)
      ? 10
      : Math.min(Math.max(limitRaw, 1), 50);

    let response: Awaited<ReturnType<MoltbookClient["getFeed"]>>;
    try {
      response = await client.getFeed({ submolt, sort, limit });
    } catch {
      // Fetch/JSON errors can include an excerpt of the upstream response body.
      console.error("Moltbook feed request failed");
      return upstreamUnavailable();
    }
    const feed = MoltbookFeedResponseSchema.safeParse(response.data);
    if (response.success !== true || !feed.success) {
      const cooldownMinutes = parseCooldownMinutes(response.hint);
      if (response.error === "Rate limited") {
        return NextResponse.json(
          {
            success: false,
            error: response.error,
            cooldownMinutes,
          },
          { status: 429 }
        );
      }

      console.warn("Moltbook feed returned an invalid or unsuccessful response");
      return upstreamUnavailable();
    }

    return NextResponse.json({
      success: true,
      data: feed.data,
    });
  }

  // List notable agents for debates
  if (action === "agents") {
    return NextResponse.json({
      success: true,
      data: NOTABLE_DEBATE_AGENTS,
    });
  }

  // Get debate topics available for posting
  if (action === "topics") {
    return NextResponse.json({
      success: true,
      data: topicSummaries.map(t => ({
        id: t.id,
        title: t.title,
        balance: t.balance,
        weight: t.weight,
        verdict: t.verdict.label,
        status: t.status,
      })),
    });
  }

  // Check Moltbook connection status
  if (action === "status") {
    const client = getClient();
    if (!client) {
      return featureUnavailable();
    }

    try {
      const profile = await client.getMyProfile();
      const profileData = MoltbookAgentResponseSchema.safeParse(profile.data);
      if (profile.success !== true || !profileData.success) {
        console.warn("Moltbook status returned an invalid or unsuccessful response");
        return NextResponse.json(
          {
            success: false,
            error: MOLTBOOK_UNAVAILABLE_MESSAGE,
            code: "UPSTREAM_UNAVAILABLE",
            configured: true,
            connected: false,
          },
          { status: 502 },
        );
      }
      return NextResponse.json({
        success: true,
        configured: true,
        connected: true,
        profile: profileData.data,
      });
    } catch {
      console.error("Moltbook status request failed");
      return NextResponse.json({
        success: false,
        error: MOLTBOOK_UNAVAILABLE_MESSAGE,
        code: "UPSTREAM_UNAVAILABLE",
        configured: true,
        connected: false,
      }, { status: 502 });
    }
  }

  return NextResponse.json(
    {
      success: false,
      error: "Unknown action. Use: feed, agents, topics, or status",
    },
    { status: 400 },
  );
}

export async function POST(request: NextRequest) {
  // Require authentication for Moltbook write operations
  if (!isAuthConfigured()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let session: { user?: unknown } | null;
  try {
    session = (await auth()) as { user?: unknown } | null;
  } catch (error) {
    console.error(
      "Moltbook authentication check failed:",
      sanitizeServerLog(error),
    );
    return NextResponse.json(
      {
        success: false,
        error: "Sign-in is temporarily unavailable. Please try again later.",
        code: "AUTH_UNAVAILABLE",
      },
      { status: 503 },
    );
  }
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Rate limit: 15 requests per hour per user
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const limit = rateLimit(`moltbook:${ip}`, { maxRequests: 15, windowMs: 60 * 60 * 1000 });
  if (!limit.success) {
    return NextResponse.json(
      { success: false, error: "Rate limited. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } }
    );
  }

  const client = getClient();
  if (!client) {
    return featureUnavailable();
  }

  const service = new MoltbookDebateService(client);

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  const parseResult = MoltbookPostSchema.safeParse(raw);
  if (!parseResult.success) {
    return NextResponse.json(
      { success: false, error: "Invalid request", details: parseResult.error.flatten() },
      { status: 400 }
    );
  }
  const body = parseResult.data;
  const { action } = body;

  try {
  if (action === "post") {
    const { submolt, title, content, url } = body;

    const response = await client.createPost({
      submolt,
      title,
      content,
      url,
    });

    const post = MoltbookPostResponseSchema.safeParse(response.data);
    if (response.success !== true || !post.success) {
      const cooldownMinutes = parseCooldownMinutes(response.hint);
      if (response.error === "Rate limited") {
        return NextResponse.json(
          {
            success: false,
            error: response.error,
            cooldownMinutes,
          },
          { status: 429 }
        );
      }

      console.warn("Moltbook post returned an invalid or unsuccessful response");
      return upstreamUnavailable();
    }

    return NextResponse.json({
      success: true,
      data: {
        ...post.data,
        url: post.data.url || `https://moltbook.com/m/${submolt}/posts/${post.data.id}`,
      },
    });
  }

  // Post a topic as a debate
  if (action === "post_debate") {
    const { topicId } = body;
    const topic = await loadTopicById(topicId);

    if (!topic) {
      return NextResponse.json(
        { success: false, error: "Topic not found" },
        { status: 404 }
      );
    }

    const result = await service.postDebateTopic(topic);
    if (!result) {
      return NextResponse.json(
        { success: false, error: "Failed to post debate to Moltbook" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  }

  // Post a debate invitation for a specific position
  if (action === "post_invitation") {
    const { topicId, position } = body;
    const topic = await loadTopicById(topicId);

    if (!topic) {
      return NextResponse.json(
        { success: false, error: "Topic not found" },
        { status: 404 }
      );
    }

    const result = await service.postDebateInvitation({
      topicId: topic.id,
      topicTitle: topic.title,
      claim: topic.meta_claim,
      position,
      context: topic.pillars.map(p => p.short_summary).join(" "),
      existingArguments: [],
    });

    if (!result) {
      return NextResponse.json(
        { success: false, error: "Failed to post invitation to Moltbook" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  }

  // Post a debate argument
  if (action === "post_argument") {
    const { postId, round, side, agentName, argument, parentCommentId } = body;

    const result = await service.postDebateArgument(
      postId,
      round,
      side,
      agentName,
      argument,
      parentCommentId
    );

    if (!result) {
      return NextResponse.json(
        { success: false, error: "Failed to post argument to Moltbook" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  }

  // Fetch responses from a debate
  if (action === "fetch_responses") {
    const { postId } = body;

    const comments = await service.fetchDebateResponses(postId);
    return NextResponse.json({
      success: true,
      data: comments,
    });
  }

  // Invite an agent to a debate
  if (action === "invite_agent") {
    const { agentName, topicTitle, postId } = body;

    const success = await service.inviteAgentToDebate(agentName, topicTitle, postId);
    return NextResponse.json({ success });
  }

  // This should be unreachable due to Zod discriminated union validation
  return NextResponse.json(
    { success: false, error: "Unknown action" },
    { status: 400 }
  );
  } catch {
    console.error(`Moltbook ${action} request failed`);
    return upstreamUnavailable();
  }
}
