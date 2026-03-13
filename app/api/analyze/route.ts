import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { extractArguments, toDebateMessages } from "@/lib/analyze/extractor";
import { extractArgumentsOffline } from "@/lib/analyze/offline";
import { createJudgeCouncil } from "@/lib/judge/council";
import { judgeDebateOffline } from "@/lib/judge/offline";
import { saveAnalysis, saveJudgment, listAnalyses } from "@/lib/db/queries";
import { rateLimit } from "@/lib/rate-limit";
import { modelsToAgents } from "@/lib/agents/types";
import type { LLMModel } from "@/types/logic";
import type { ExtractedArguments } from "@/lib/analyze/extractor";

interface AnalyzeRequest {
  content: string;
  contentType?: "transcript" | "article" | "freeform";
  includeJudging?: boolean;
  judgeModels?: LLMModel[];
}

function isLiveAnalyzeEnabled(): boolean {
  return (
    process.env.ENABLE_LIVE_ANALYZE_API === "true" ||
    process.env.NEXT_PUBLIC_ENABLE_LIVE_ANALYZE_API === "true"
  );
}

function isLiveJudgingEnabled(): boolean {
  return (
    process.env.ENABLE_LIVE_JUDGING_API === "true" ||
    process.env.NEXT_PUBLIC_ENABLE_LIVE_JUDGING_API === "true"
  );
}

/**
 * POST /api/analyze
 *
 * Analyze content to extract arguments and optionally judge them.
 */
export async function POST(request: NextRequest) {
  // Require authentication for analysis (calls LLM APIs and persists data)
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

    // Extract arguments from content (offline-first for cost control).
    let extracted: ExtractedArguments;
    if (isLiveAnalyzeEnabled()) {
      try {
        extracted = await extractArguments(content, contentType || "freeform");
      } catch (error) {
        console.warn("Live extraction failed, falling back to offline extraction:", error);
        extracted = extractArgumentsOffline(content, contentType || "freeform");
      }
    } else {
      extracted = extractArgumentsOffline(content, contentType || "freeform");
    }

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

        if (isLiveJudgingEnabled()) {
          try {
            const council = createJudgeCouncil({ judges });
            judgingResult = await council.judgeDebate(messages, extracted.topic);
          } catch (error) {
            console.warn("Live judging failed, falling back to offline judging:", error);
            judgingResult = judgeDebateOffline(messages, extracted.topic, models);
          }
        } else {
          judgingResult = judgeDebateOffline(messages, extracted.topic, models);
        }
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
