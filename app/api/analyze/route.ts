import { NextRequest, NextResponse } from "next/server";
import { extractArguments, toDebateMessages } from "@/lib/analyze/extractor";
import { createJudgeCouncil } from "@/lib/judge/council";
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

    return NextResponse.json({
      extracted,
      judgingResult,
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
 * Returns information about the analyze API.
 */
export async function GET() {
  return NextResponse.json({
    name: "Content Analysis API",
    description: "Extract arguments from content and optionally judge them",
    endpoints: {
      POST: {
        description: "Analyze content",
        body: {
          content: {
            type: "string",
            required: true,
            description: "The content to analyze (max 50,000 characters)",
          },
          contentType: {
            type: "string",
            enum: ["transcript", "article", "freeform"],
            required: false,
            default: "freeform",
            description: "Type of content being analyzed",
          },
          includeJudging: {
            type: "boolean",
            required: false,
            default: false,
            description: "Whether to also run judging on extracted arguments",
          },
          judgeModels: {
            type: "array",
            required: false,
            description: "Which AI models to use as judges (if includeJudging)",
            default: ["claude", "gpt-4", "gemini"],
          },
        },
        response: {
          extracted: {
            description: "Extracted arguments structure",
            fields: [
              "topic - Main topic/claim identified",
              "positions - For and against positions with arguments",
              "identifiedCruxes - Key points of disagreement",
              "potentialFallacies - Detected logical fallacies",
              "summary - Brief summary",
              "confidence - Confidence score (0-1)",
            ],
          },
          judgingResult: {
            description: "Judge council verdict (if includeJudging=true)",
            fields: [
              "verdicts - Individual judge verdicts",
              "winner - Consensus winner",
              "hasConsensus - Whether judges agreed",
              "aggregatedScores - Combined scores",
              "disagreements - Areas of judge disagreement",
            ],
          },
        },
      },
    },
    contentTypes: {
      transcript: "A debate or discussion transcript with multiple speakers",
      article: "An argumentative article or essay",
      freeform: "General content that may contain arguments",
    },
  });
}
