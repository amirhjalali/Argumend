import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createJudgeCouncil } from "@/lib/judge/council";
import { judgeContentOffline, judgeDebateOffline } from "@/lib/judge/offline";
import { saveJudgment } from "@/lib/db/queries";
import { isDatabaseConfigured } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { modelsToAgents } from "@/lib/agents/types";
import type { LLMModel } from "@/types/logic";
import type { JudgingResult } from "@/lib/judge/rubric";
import { JudgeMethodNotAllowedResponseSchema } from "@/lib/judge/contracts";
import { isAuthConfigured } from "@/lib/auth-config";

const JudgeRequestSchema = z.object({
  type: z.enum(["debate", "content"]),
  messages: z.array(z.object({
    side: z.enum(["for", "against"]),
    content: z.string().min(1).max(50000),
    round: z.number().int().min(1).max(20),
    model: z.string().max(50).optional(),
  })).max(40).optional(),
  topic: z.string().max(500).optional(),
  content: z.string().max(50000).optional(),
  contentType: z.enum(["transcript", "article", "freeform"]).optional(),
  judgeModels: z.array(z.enum(["claude", "gpt-4", "gemini", "grok"])).max(4).optional(),
  debateId: z.string().max(200).optional(),
});

function isLiveJudgingEnabled(): boolean {
  return process.env.ENABLE_LIVE_JUDGING_API === "true";
}

async function hasAuthenticatedUser(): Promise<boolean> {
  if (!isAuthConfigured()) return false;
  try {
    const { auth } = await import("@/lib/auth");
    const session = await auth();
    return Boolean(session?.user);
  } catch {
    console.warn("Judge authentication unavailable; continuing with offline-safe behavior");
    return false;
  }
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
    const authenticated = isLiveJudgingEnabled() ? await hasAuthenticatedUser() : false;

    let result: JudgingResult;
    if (isLiveJudgingEnabled() && authenticated) {
      try {
        const council = createJudgeCouncil({ judges });
        if (type === "debate") {
          result = await council.judgeDebate(messages!, topic);
        } else {
          result = await council.judgeContent(content!, contentType || "freeform");
        }
      } catch {
        console.warn("Live judging failed; falling back to offline judging");
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

    // Persist when a database is configured. Offline mode still returns the
    // computed judgment when persistence is unavailable.
    let saved: Awaited<ReturnType<typeof saveJudgment>> | null = null;
    if (isDatabaseConfigured()) {
      try {
        saved = await saveJudgment(result, {
          debateId: body.debateId,
        });
      } catch {
        console.warn("Judgment persistence failed; returning the computed judgment");
      }
    }

    return NextResponse.json({ ...result, id: saved?.id });
  } catch {
    console.error("Judge API request failed");
    return NextResponse.json(
      { error: "Failed to judge content", code: "JUDGE_FAILED" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/judge
 *
 * Judgment history is not a public collection. Persisted debate judgments may
 * contain content-derived reasoning, so exposing a recent global list would
 * bypass debate ownership even if the debate rows themselves are protected.
 */
export function GET() {
  const body = JudgeMethodNotAllowedResponseSchema.parse({
    error: "Listing judgments is not supported",
    code: "METHOD_NOT_ALLOWED",
  });
  return NextResponse.json(body, {
    status: 405,
    headers: { Allow: "POST", "Cache-Control": "no-store" },
  });
}
