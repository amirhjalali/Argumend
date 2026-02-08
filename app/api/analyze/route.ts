import { NextRequest, NextResponse } from "next/server";
import { extractArguments, toDebateMessages } from "@/lib/analyze/extractor";
import { createJudgeCouncil } from "@/lib/judge/council";
import { saveAnalysis, saveJudgment, listAnalyses } from "@/lib/db/queries";
import { rateLimit } from "@/lib/rate-limit";
import type { AgentConfig } from "@/lib/agents/types";
import type { LLMModel } from "@/types/logic";

/**
 * Request body for the analyze API
 */
interface AnalyzeRequest {
  /** The content to analyze */
  content: string;
  /** Type of content being analyzed */
  contentType?: "transcript" | "article" | "freeform";
  /** Whether to also run judging on the extracted arguments */
  includeJudging?: boolean;
  /** Which models to use as judges (if includeJudging is true) */
  judgeModels?: LLMModel[];
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
 * POST /api/analyze
 *
 * Analyze content to extract arguments and optionally judge them.
 */
export async function POST(request: NextRequest) {
  // Rate limit: 10 requests per hour per IP
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const limit = rateLimit(`analyze:${ip}`, { maxRequests: 10, windowMs: 60 * 60 * 1000 });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Rate limited. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } }
    );
  }

  try {
    const body: AnalyzeRequest = await request.json();
    const { content, contentType, includeJudging, judgeModels } = body;

    // Validate request
    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    // Limit content length to prevent abuse
    const maxLength = 50000; // ~50k characters
    if (content.length > maxLength) {
      return NextResponse.json(
        { error: `Content too long. Maximum ${maxLength} characters allowed.` },
        { status: 400 }
      );
    }

    // Extract arguments from content
    const extracted = await extractArguments(
      content,
      contentType || "freeform"
    );

    // Optionally run judging
    let judgingResult = null;
    if (includeJudging) {
      // Convert extracted arguments to debate format
      const messages = toDebateMessages(extracted);

      if (messages.length > 0) {
        // Configure judges
        const defaultModels: LLMModel[] = ["claude", "gpt-4", "gemini"];
        const models = judgeModels && judgeModels.length > 0 ? judgeModels : defaultModels;
        const judges = modelsToAgents(models);

        // Create council and judge
        const council = createJudgeCouncil({ judges });
        judgingResult = await council.judgeDebate(messages, extracted.topic);
      }
    }

    // Persist results
    const savedAnalysis = await saveAnalysis(
      {
        contentType: contentType || "freeform",
        inputContent: content,
      },
      extracted
    );

    let savedJudgment = null;
    if (judgingResult) {
      savedJudgment = await saveJudgment(judgingResult, {
        analysisId: savedAnalysis.id,
      });
    }

    return NextResponse.json({
      id: savedAnalysis.id,
      extracted,
      judgingResult,
      judgmentId: savedJudgment?.id,
    });
  } catch (error) {
    console.error("Analyze API error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to analyze content", details: message },
      { status: 500 }
    );
  }
}

/**
 * GET /api/analyze
 *
 * Returns recent analyses.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100);
    const results = await listAnalyses(limit);
    return NextResponse.json({ analyses: results });
  } catch (error) {
    console.error("Failed to list analyses:", error);
    return NextResponse.json(
      { error: "Failed to list analyses" },
      { status: 500 }
    );
  }
}
