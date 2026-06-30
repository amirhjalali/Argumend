import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { extractArguments, toDebateMessages } from "@/lib/analyze/extractor";
import { extractArgumentsOffline } from "@/lib/analyze/offline";
import { createJudgeCouncil } from "@/lib/judge/council";
import { judgeDebateOffline } from "@/lib/judge/offline";
import { saveAnalysis, saveJudgment, listAnalyses } from "@/lib/db/queries";
import { rateLimit } from "@/lib/rate-limit";
import { modelsToAgents } from "@/lib/agents/types";
import type { LLMModel } from "@/types/logic";
import type { ExtractedArguments } from "@/lib/analyze/extractor";

const AnalyzeRequestSchema = z.object({
  content: z.string().min(1, "Content is required").max(50000, "Content too long. Maximum 50000 characters allowed."),
  contentType: z.enum(["transcript", "article", "freeform"]).optional(),
  includeJudging: z.boolean().optional(),
  judgeModels: z.array(z.enum(["claude", "gpt-4", "gemini", "grok"])).optional(),
});

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

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}

async function hasAuthenticatedUser(): Promise<boolean> {
  try {
    const { auth } = await import("@/lib/auth");
    const session = await auth();
    return Boolean(session?.user);
  } catch (error) {
    console.warn("Auth unavailable; continuing with offline-safe behavior:", getErrorMessage(error));
    return false;
  }
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
    const raw = await request.json();
    const parseResult = AnalyzeRequestSchema.safeParse(raw);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }
    const body = parseResult.data;
    const { content, contentType, includeJudging, judgeModels } = body;
    const contentKind = contentType || "freeform";
    const wantsLiveAnalyze = isLiveAnalyzeEnabled();
    const wantsLiveJudging = includeJudging && isLiveJudgingEnabled();
    const authenticated = wantsLiveAnalyze || wantsLiveJudging
      ? await hasAuthenticatedUser()
      : false;

    // Extract arguments from content (offline-first for cost control).
    let extracted: ExtractedArguments;
    if (wantsLiveAnalyze && authenticated) {
      try {
        extracted = await extractArguments(content, contentKind);
      } catch (error) {
        console.warn("Live extraction failed, falling back to offline extraction:", error);
        extracted = extractArgumentsOffline(content, contentKind);
      }
    } else {
      extracted = extractArgumentsOffline(content, contentKind);
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

        if (wantsLiveJudging && authenticated) {
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

    // Persist results when a database is configured. Offline mode still returns
    // the computed analysis when persistence is unavailable.
    let savedAnalysis: Awaited<ReturnType<typeof saveAnalysis>> | null = null;
    let savedJudgment = null;
    try {
      savedAnalysis = await saveAnalysis(
        {
          contentType: contentKind,
          inputContent: content,
        },
        extracted
      );

      if (judgingResult) {
        savedJudgment = await saveJudgment(judgingResult, {
          analysisId: savedAnalysis.id,
        });
      }
    } catch (error) {
      console.warn("Analyze persistence skipped:", getErrorMessage(error));
    }

    return NextResponse.json({
      id: savedAnalysis?.id,
      extracted,
      judgingResult,
      judgmentId: savedJudgment?.id,
    });
  } catch (error) {
    console.error("Analyze API error:", error);
    const message = getErrorMessage(error);
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
  // Rate limit: 30 requests per minute per IP
  const getIp = request.headers.get("x-forwarded-for") || "unknown";
  const getLimit = rateLimit(`analyze-list:${getIp}`, { maxRequests: 30, windowMs: 60 * 1000 });
  if (!getLimit.success) {
    return NextResponse.json(
      { error: "Rate limited. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((getLimit.resetAt - Date.now()) / 1000)) } }
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
    const results = await listAnalyses(pageLimit);
    return NextResponse.json({ analyses: results });
  } catch (error) {
    console.error("Failed to list analyses:", error);
    return NextResponse.json({ analyses: [], persistence: "unavailable" });
  }
}
