/**
 * Moltbook Integration API
 *
 * Endpoints for posting debates to Moltbook and fetching responses.
 */

import { NextRequest, NextResponse } from "next/server";
import { MoltbookClient } from "@/lib/moltbook/client";
import { MoltbookDebateService, NOTABLE_DEBATE_AGENTS } from "@/lib/moltbook/debate-integration";
import { topics } from "@/data/topics";

// Lazy initialization to avoid build-time errors
function getClient(): MoltbookClient | null {
  const apiKey = process.env.MOLTBOOK_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new MoltbookClient(apiKey);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get("action");

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
      });
    }

    try {
      const profile = await client.getMyProfile();
      return NextResponse.json({
        success: true,
        configured: true,
        profile: profile.data,
      });
    } catch {
      return NextResponse.json({
        success: false,
        error: "Failed to connect to Moltbook",
        configured: true,
      });
    }
  }

  return NextResponse.json({
    success: false,
    error: "Unknown action. Use: agents, topics, or status",
  });
}

export async function POST(request: NextRequest) {
  const client = getClient();
  if (!client) {
    return NextResponse.json(
      { success: false, error: "MOLTBOOK_API_KEY not configured" },
      { status: 503 }
    );
  }

  const service = new MoltbookDebateService(client);
  const body = await request.json();
  const { action } = body;

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

    if (position !== "for" && position !== "against") {
      return NextResponse.json(
        { success: false, error: "Position must be 'for' or 'against'" },
        { status: 400 }
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

    if (!postId || !round || !side || !agentName || !argument) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

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

    if (!postId) {
      return NextResponse.json(
        { success: false, error: "postId is required" },
        { status: 400 }
      );
    }

    const comments = await service.fetchDebateResponses(postId);
    return NextResponse.json({
      success: true,
      data: comments,
    });
  }

  // Invite an agent to a debate
  if (action === "invite_agent") {
    const { agentName, topicTitle, postId } = body;

    if (!agentName || !topicTitle || !postId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const success = await service.inviteAgentToDebate(agentName, topicTitle, postId);
    return NextResponse.json({ success });
  }

  return NextResponse.json(
    { success: false, error: "Unknown action" },
    { status: 400 }
  );
}
