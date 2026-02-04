import { NextRequest, NextResponse } from "next/server";
import { createJudgeCouncil, type DebateMessage } from "@/lib/judge/council";
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

    return NextResponse.json(result);
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
 * Returns information about the judge API.
 */
export async function GET() {
  return NextResponse.json({
    name: "Judge Council API",
    description: "Judge debates and content using multiple AI models",
    endpoints: {
      POST: {
        description: "Submit content for judgment",
        body: {
          type: {
            type: "string",
            enum: ["debate", "content"],
            required: true,
            description: "Type of content to judge",
          },
          messages: {
            type: "array",
            required: "when type=debate",
            description: "Array of debate messages",
            items: {
              side: "for | against",
              content: "string",
              round: "number",
            },
          },
          topic: {
            type: "string",
            required: false,
            description: "Topic of the debate",
          },
          content: {
            type: "string",
            required: "when type=content",
            description: "Raw content to analyze",
          },
          contentType: {
            type: "string",
            enum: ["transcript", "article", "freeform"],
            required: false,
            description: "Type of content (default: freeform)",
          },
          judgeModels: {
            type: "array",
            required: false,
            description: "Which AI models to use as judges",
            default: ["claude", "gpt-4", "gemini"],
          },
        },
      },
    },
    rubric: [
      { dimension: "Logical Validity", weight: "25%" },
      { dimension: "Evidence Quality", weight: "25%" },
      { dimension: "Rebuttal Strength", weight: "20%" },
      { dimension: "Crux Identification", weight: "15%" },
      { dimension: "Clarity", weight: "15%" },
    ],
  });
}
