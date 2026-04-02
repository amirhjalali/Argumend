import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { createJudgeCouncil } from "@/lib/judge/council";
import type { DebateMessageInput as DebateMessage } from "@/types/debate";
import { judgeContentOffline, judgeDebateOffline } from "@/lib/judge/offline";
import { saveJudgment, listJudgments } from "@/lib/db/queries";
import { rateLimit } from "@/lib/rate-limit";
import { modelsToAgents } from "@/lib/agents/types";
import type { LLMModel } from "@/types/logic";
import type { JudgingResult } from "@/lib/judge/rubric";

const JudgeRequestSchema = z.object({
  type: z.enum(["debate", "content"]),
  messages: z.array(z.object({
    side: z.enum(["for", "against"]),
    content: z.string().min(1),
    round: z.number().int().min(1),
    model: z.string().optional(),
  })).optional(),
  topic: z.string().max(500).optional(),
  content: z.string().max(50000).optional(),
  contentType: z.enum(["transcript", "article", "freeform"]).optional(),
  judgeModels: z.array(z.enum(["claude", "gpt-4", "gemini", "grok"])).optional(),
  debateId: z.string().optional(),
});

function isLiveJudgingEnabled(): boolean {
  return (
    process.env.ENABLE_LIVE_JUDGING_API === "true" ||
    process.env.NEXT_PUBLIC_ENABLE_LIVE_JUDGING_API === "true"
  );
}

/**
 * POST /api/judge
 *
 * Judge a debate or content using multiple AI models.
 */
export async function POST(request: NextRequest) {
  // Require authentication for judging (calls LLM APIs and persists data)
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Rate limit: 10 requests per hour per IP
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const limit = rateLimit(`judge:${ip}`, { maxRequests: 10, windowMs: 60 * 60 * 1000 });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Rate limited. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } }
    );
  }

  try {
    const raw = await request.json();
    const parseResult = JudgeRequestSchema.safeParse(raw);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }
    const body = parseResult.data;
    const { type, messages, topic, content, contentType, judgeModels } = body;

    // Validate type-specific requirements
    if (type === "debate" && (!messages || messages.length === 0)) {
      return NextResponse.json(
        { error: "Debate type requires messages array" },
        { status: 400 }
      );
    }

    if (type === "content" && !content) {
      return NextResponse.json(
        { error: "Content type requires content field" },
        { status: 400 }
      );
    }

    // Configure judges
    const defaultModels: LLMModel[] = ["claude", "gpt-4", "gemini"];
    const models = judgeModels && judgeModels.length > 0 ? judgeModels : defaultModels;
    const judges = modelsToAgents(models);

    let result: JudgingResult;
    if (isLiveJudgingEnabled()) {
      try {
        const council = createJudgeCouncil({ judges });
        if (type === "debate") {
          result = await council.judgeDebate(messages!, topic);
        } else {
          result = await council.judgeContent(content!, contentType || "freeform");
        }
      } catch (error) {
        console.warn("Live judging failed, falling back to offline judging:", error);
        if (type === "debate") {
          result = judgeDebateOffline(messages!, topic, models);
        } else {
          result = judgeContentOffline(content!, contentType || "freeform", models);
        }
      }
    } else if (type === "debate") {
      result = judgeDebateOffline(messages!, topic, models);
    } else {
      result = judgeContentOffline(content!, contentType || "freeform", models);
    }

    // Persist judgment
    const saved = await saveJudgment(result, {
      debateId: body.debateId,
    });

    return NextResponse.json({ ...result, id: saved.id });
  } catch (error) {
    console.error("Judge API error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to judge content", details: message },
      { status: 500 }
    );
  }
}

/**
 * GET /api/judge
 *
 * Returns recent judgments.
 */
export async function GET(request: NextRequest) {
  // Rate limit: 30 requests per minute per IP
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const limit = rateLimit(`judge-list:${ip}`, { maxRequests: 30, windowMs: 60 * 1000 });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Rate limited. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const pageLimit = Math.min(parseInt(searchParams.get("limit") || "20"), 100);
    if (isNaN(pageLimit) || pageLimit < 1) {
      return NextResponse.json(
        { error: "Invalid limit parameter" },
        { status: 400 }
      );
    }
    const results = await listJudgments(pageLimit);
    return NextResponse.json({ judgments: results });
  } catch (error) {
    console.error("Failed to list judgments:", error);
    return NextResponse.json(
      { error: "Failed to list judgments" },
      { status: 500 }
    );
  }
}
