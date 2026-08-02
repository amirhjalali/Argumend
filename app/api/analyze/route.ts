import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { extractArguments, toDebateMessages } from "@/lib/analyze/extractor";
import { extractArgumentsOffline } from "@/lib/analyze/offline";
import { createJudgeCouncil } from "@/lib/judge/council";
import { judgeDebateOffline } from "@/lib/judge/offline";
import { saveAnalysis, saveJudgment, listAnalyses } from "@/lib/db/queries";
import { isDatabaseConfigured } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { sanitizeServerLog } from "@/lib/sanitizeServerLog";
import { modelsToAgents } from "@/lib/agents/types";
import type { LLMModel } from "@/types/logic";
import type { ExtractedArguments } from "@/lib/analyze/extractor";
import { toPublicAnalysis } from "@/lib/analyze/publicAnalysis";
import { isAuthConfigured } from "@/lib/auth-config";
import {
  AnalyzeSuccessResponseSchema,
  type AnalyzeExecution,
} from "@/lib/analyze/contracts";

const AnalyzeRequestSchema = z.object({
  content: z.string().min(1, "Content is required").max(50000, "Content too long. Maximum 50000 characters allowed."),
  contentType: z.enum(["transcript", "article", "freeform"]).optional(),
  includeJudging: z.boolean().optional(),
  judgeModels: z.array(z.enum(["claude", "gpt-4", "gemini", "grok"])).optional(),
});

function isLiveAnalyzeEnabled(): boolean {
  return process.env.ENABLE_LIVE_ANALYZE_API === "true";
}

function isLiveJudgingEnabled(): boolean {
  return process.env.ENABLE_LIVE_JUDGING_API === "true";
}

async function hasAuthenticatedUser(): Promise<boolean> {
  if (!isAuthConfigured()) return false;
  try {
    const { auth } = await import("@/lib/auth");
    const session = await auth();
    return Boolean(session?.user);
  } catch (error) {
    console.warn("Auth unavailable; continuing with offline-safe behavior:", sanitizeServerLog(error));
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

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON", code: "INVALID_JSON" },
      { status: 400 }
    );
  }

  try {
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
    const wantsLiveJudging = Boolean(includeJudging && isLiveJudgingEnabled());
    const authenticated = wantsLiveAnalyze || wantsLiveJudging
      ? await hasAuthenticatedUser()
      : false;

    let analysisExecution: AnalyzeExecution["analysis"] = {
      requested: wantsLiveAnalyze ? "live" : "offline",
      actual: "offline",
    };
    let judgingExecution: AnalyzeExecution["judging"] = includeJudging
      ? {
          requested: wantsLiveJudging ? "live" : "offline",
          actual: "skipped",
        }
      : { requested: "disabled", actual: "disabled" };

    // Extract arguments from content (offline-first for cost control).
    let extracted: ExtractedArguments;
    if (wantsLiveAnalyze && authenticated) {
      try {
        extracted = await extractArguments(content, contentKind);
        analysisExecution = { requested: "live", actual: "live" };
      } catch (error) {
        console.warn("Live extraction failed, falling back to offline extraction:", sanitizeServerLog(error));
        extracted = extractArgumentsOffline(content, contentKind);
        analysisExecution = {
          requested: "live",
          actual: "offline",
          fallbackCode: "ANALYSIS_PROVIDER_ERROR",
        };
      }
    } else {
      extracted = extractArgumentsOffline(content, contentKind);
      if (wantsLiveAnalyze) {
        analysisExecution = {
          requested: "live",
          actual: "offline",
          fallbackCode: "ANALYSIS_AUTH_UNAVAILABLE",
        };
      }
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
            judgingExecution = { requested: "live", actual: "live" };
          } catch (error) {
            console.warn("Live judging failed, falling back to offline judging:", sanitizeServerLog(error));
            judgingResult = judgeDebateOffline(messages, extracted.topic, models);
            judgingExecution = {
              requested: "live",
              actual: "offline",
              fallbackCode: "JUDGING_PROVIDER_ERROR",
            };
          }
        } else {
          judgingResult = judgeDebateOffline(messages, extracted.topic, models);
          judgingExecution = wantsLiveJudging
            ? {
                requested: "live",
                actual: "offline",
                fallbackCode: "JUDGING_AUTH_UNAVAILABLE",
              }
            : { requested: "offline", actual: "offline" };
        }
      } else {
        judgingExecution = {
          requested: wantsLiveJudging ? "live" : "offline",
          actual: "skipped",
          fallbackCode: "JUDGING_NO_ARGUMENTS",
        };
      }
    }

    // Persist results when a database is configured. Offline mode still returns
    // the computed analysis when persistence is unavailable.
    let savedAnalysis: Awaited<ReturnType<typeof saveAnalysis>> | null = null;
    let savedJudgment = null;
    if (isDatabaseConfigured()) {
      try {
        savedAnalysis = await saveAnalysis(
          {
            contentType: contentKind,
          },
          extracted
        );

        if (judgingResult) {
          savedJudgment = await saveJudgment(judgingResult, {
            analysisId: savedAnalysis.id,
          });
        }
      } catch (error) {
        console.warn("Analyze persistence skipped:", sanitizeServerLog(error));
      }
    }

    const responseBody = AnalyzeSuccessResponseSchema.parse({
      id: savedAnalysis?.id,
      extracted,
      judgingResult,
      judgmentId: savedJudgment?.id,
      execution: {
        analysis: analysisExecution,
        judging: judgingExecution,
      },
    });
    return NextResponse.json(responseBody);
  } catch (error) {
    console.error("Analyze API error:", sanitizeServerLog(error));
    return NextResponse.json(
      { error: "Failed to analyze content", code: "ANALYZE_FAILED" },
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
    if (!isDatabaseConfigured()) {
      return NextResponse.json({ analyses: [], persistence: "unavailable" });
    }
    const results = await listAnalyses(pageLimit);
    return NextResponse.json({ analyses: results.map(toPublicAnalysis) });
  } catch (error) {
    console.error("Failed to list analyses:", sanitizeServerLog(error));
    return NextResponse.json({ analyses: [], persistence: "unavailable" });
  }
}
