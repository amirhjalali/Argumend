import { NextRequest, NextResponse } from "next/server";
import { createJudgeCouncil, type DebateMessage } from "@/lib/judge/council";
import { saveJudgment, listJudgments } from "@/lib/db/queries";
import { rateLimit } from "@/lib/rate-limit";
import type { AgentConfig } from "@/lib/agents/types";
import type { LLMModel } from "@/types/logic";

/**
 * Request body for the judge API
 */
interface JudgeRequest {
  /** Type of content to judge */
  type: "debate" | "content";
  /** Debate messages (for type="debate") */
  messages?: DebateMessage[];
  /** Topic of the debate */
  topic?: string;
  /** Raw content to judge (for type="content") */
  content?: string;
  /** Content type for analysis */
  contentType?: "transcript" | "article" | "freeform";
  /** Which models to use as judges (defaults to claude, gpt-4, gemini) */
  judgeModels?: LLMModel[];
  /** Link to a stored debate (optional) */
  debateId?: string;
}

/**
 * Convert model IDs to agent configs
 */
function modelsToAgents(models: LLMModel[]): AgentConfig[] {
  return models.map((model) => ({
    id: `judge-${model}`,
    name: `${model.charAt(0).toUpperCase() + model.slice(1)} Judge`,
    type: "local-llm" as const,
    model,
  }));
}

/**
 * POST /api/judge
 *
 * Judge a debate or content using multiple AI models.
 */
export async function POST(request: NextRequest) {
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
    const body: JudgeRequest = await request.json();
    const { type, messages, topic, content, contentType, judgeModels } = body;

    // Validate request
    if (!type) {
      return NextResponse.json(
        { error: "Missing required field: type" },
        { status: 400 }
      );
    }

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

    // Create judge council
    const council = createJudgeCouncil({ judges });

    // Execute judgment
    let result;
    if (type === "debate") {
      result = await council.judgeDebate(messages!, topic);
    } else {
      result = await council.judgeContent(content!, contentType || "freeform");
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
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100);
    const results = await listJudgments(limit);
    return NextResponse.json({ judgments: results });
  } catch (error) {
    console.error("Failed to list judgments:", error);
    return NextResponse.json(
      { error: "Failed to list judgments" },
      { status: 500 }
    );
  }
}
