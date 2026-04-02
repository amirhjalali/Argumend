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
import { topics } from "@/data/topics";

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
      return NextResponse.json(
        {
          success: false,
          error: "MOLTBOOK_API_KEY not configured",
          configured: false,
        },
        { status: 503 }
      );
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

    const response = await client.getFeed({ submolt, sort, limit });
    if (!response.success || !response.data) {
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

      return NextResponse.json(
        { success: false, error: response.error || "Failed to fetch feed" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      data: response.data,
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
      data: topics.map(t => ({
        id: t.id,
        title: t.title,
        confidence_score: t.confidence_score,
        status: t.status,
      })),
    });
  }

  // Check Moltbook connection status
  if (action === "status") {
    const client = getClient();
    if (!client) {
      return NextResponse.json({
        success: false,
        error: "MOLTBOOK_API_KEY not configured",
        configured: false,
        connected: false,
      });
    }

    try {
      const profile = await client.getMyProfile();
      return NextResponse.json({
        success: true,
        configured: true,
        connected: true,
        profile: profile.data,
      });
    } catch {
      return NextResponse.json({
        success: false,
        error: "Failed to connect to Moltbook",
        configured: true,
        connected: false,
      });
    }
  }

  return NextResponse.json({
    success: false,
    error: "Unknown action. Use: feed, agents, topics, or status",
  });
}

export async function POST(request: NextRequest) {
  // Require authentication for Moltbook write operations
  const session = await auth();
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
    return NextResponse.json(
      { success: false, error: "MOLTBOOK_API_KEY not configured" },
      { status: 503 }
    );
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

  if (action === "post") {
    const { submolt, title, content, url } = body;

    const response = await client.createPost({
      submolt,
      title,
      content,
      url,
    });

    if (!response.success || !response.data) {
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

      return NextResponse.json(
        { success: false, error: response.error || "Failed to post to Moltbook" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...response.data,
        url: response.data.url || `https://moltbook.com/m/${submolt}/posts/${response.data.id}`,
      },
    });
  }

  // Post a topic as a debate
  if (action === "post_debate") {
    const { topicId } = body;
    const topic = topics.find(t => t.id === topicId);

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
    const topic = topics.find(t => t.id === topicId);

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
}
