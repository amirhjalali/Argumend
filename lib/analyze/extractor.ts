/**
 * Argument Extractor
 *
 * Extracts structured arguments from free-form content
 * like transcripts, articles, and debates.
 */

import { executeAgent } from "@/lib/agents/executor";
import type { AgentConfig } from "@/lib/agents/types";

/**
 * Argument strength level derived from the 0-10 score
 */
export type ArgumentStrength = "strong" | "moderate" | "weak" | "unsupported";

/**
 * Get the strength label from a numeric score
 */
export function getArgumentStrength(score: number): ArgumentStrength {
  if (score >= 7) return "strong";
  if (score >= 4) return "moderate";
  if (score >= 1) return "weak";
  return "unsupported";
}

/**
 * A single extracted argument
 */
export interface ExtractedArgument {
  /** The main claim being made */
  claim: string;
  /** Evidence supporting the claim (if any) */
  evidence?: string[];
  /** Source attribution (if mentioned) */
  source?: string;
  /** Argument strength score (1-10) based on evidence quality and logical soundness */
  strengthScore?: number;
  /** Brief reasoning for the strength score */
  strengthRationale?: string;
}

/**
 * A position in the debate (for or against)
 */
export interface ExtractedPosition {
  /** Which side this position represents */
  side: "for" | "against";
  /** Speaker name (if identifiable) */
  speaker?: string;
  /** Arguments made for this position */
  arguments: ExtractedArgument[];
}

/**
 * Identified crux (key point of disagreement)
 */
export interface IdentifiedCrux {
  /** Description of the crux */
  description: string;
  /** Why this is a key disagreement */
  significance: string;
}

/**
 * Severity level for detected fallacies
 */
export type FallacySeverity = "confirmed" | "likely" | "possible";

/**
 * Potential logical fallacy detected
 */
export interface PotentialFallacy {
  /** Type of fallacy */
  type: string;
  /** Explanation of why this might be a fallacy */
  explanation: string;
  /** Quote or reference from the text */
  quote?: string;
  /** Which speaker/side committed this (if identifiable) */
  attributedTo?: string;
  /** Severity: how confident we are this is actually a fallacy */
  severity?: FallacySeverity;
  /** How much this fallacy undermines the argument (1-10) */
  impact?: number;
}

/**
 * Detected bias in the content
 */
export interface DetectedBias {
  /** Type of bias (e.g., "Confirmation Bias", "Selection Bias", "Framing Bias") */
  type: string;
  /** Explanation of the bias */
  explanation: string;
  /** Which side or speaker exhibits this bias */
  affectedSide?: "for" | "against" | "both";
  /** How significantly this bias affects the argument (1-10) */
  impact: number;
}

/**
 * Confidence level label with human-readable explanation
 */
export type ConfidenceLevel = "very-high" | "high" | "moderate" | "low" | "very-low";

/**
 * Get a human-readable confidence label and description
 */
export function getConfidenceInfo(score: number): { level: ConfidenceLevel; label: string; description: string } {
  if (score >= 0.9) return { level: "very-high", label: "Very High Confidence", description: "Clear debate with well-defined, evidence-backed positions on both sides" };
  if (score >= 0.75) return { level: "high", label: "High Confidence", description: "Strong argumentative structure with minor ambiguities" };
  if (score >= 0.5) return { level: "moderate", label: "Moderate Confidence", description: "Identifiable positions but significant gaps in evidence or clarity" };
  if (score >= 0.3) return { level: "low", label: "Low Confidence", description: "Weak argumentative structure — positions unclear or one-sided" };
  return { level: "very-low", label: "Very Low Confidence", description: "Content may not be argumentative — treat results with caution" };
}

/**
 * Complete extraction result
 */
export interface ExtractedArguments {
  /** The main topic/claim being debated */
  topic: string;
  /** Positions identified in the content */
  positions: ExtractedPosition[];
  /** Key points of disagreement (cruxes) */
  identifiedCruxes: IdentifiedCrux[];
  /** Potential logical fallacies detected */
  potentialFallacies: PotentialFallacy[];
  /** Detected biases in the argumentation */
  detectedBiases: DetectedBias[];
  /** Brief summary of the debate/discussion */
  summary: string;
  /** Confidence in the extraction (0-1) */
  confidence: number;
  /** Overall strength of the FOR position (1-10) */
  forStrength?: number;
  /** Overall strength of the AGAINST position (1-10) */
  againstStrength?: number;
}

/**
 * Build the system prompt for argument extraction
 */
function buildExtractionSystemPrompt(): string {
  return `You are an expert at analyzing debates, discussions, and argumentative content. Your task is to extract the structured arguments from the given content, assess their strength, detect biases, and evaluate logical soundness.

## Your Role

Carefully read the content and identify:
1. The main topic or claim being debated
2. The positions (for/against) and their supporting arguments, each scored for strength
3. Key points of disagreement (cruxes)
4. Potential logical fallacies with severity ratings
5. Cognitive or rhetorical biases in the argumentation
6. Overall strength assessment for each side

## Output Format

You MUST respond with valid JSON in this exact format:

{
  "topic": "The main claim or question being debated",
  "positions": [
    {
      "side": "for",
      "speaker": "Name if identifiable, or null",
      "arguments": [
        {
          "claim": "The specific claim being made",
          "evidence": ["Supporting evidence if any"],
          "source": "Source attribution if mentioned",
          "strengthScore": 7,
          "strengthRationale": "Brief explanation: e.g. 'Well-supported by peer-reviewed data but limited geographic scope'"
        }
      ]
    },
    {
      "side": "against",
      "speaker": "Name if identifiable, or null",
      "arguments": [...]
    }
  ],
  "identifiedCruxes": [
    {
      "description": "Description of the key disagreement",
      "significance": "Why this crux matters"
    }
  ],
  "potentialFallacies": [
    {
      "type": "Fallacy name (e.g., Ad Hominem, Straw Man, Appeal to Authority, False Dichotomy, Slippery Slope, Cherry Picking, Appeal to Emotion, Bandwagon, Red Herring, Circular Reasoning)",
      "explanation": "Why this is a fallacy",
      "quote": "Relevant quote from the text",
      "attributedTo": "Who made this argument",
      "severity": "confirmed | likely | possible",
      "impact": 7
    }
  ],
  "detectedBiases": [
    {
      "type": "Bias type (e.g., Confirmation Bias, Selection Bias, Framing Bias, Anchoring Bias, Survivorship Bias, Authority Bias, Status Quo Bias)",
      "explanation": "How this bias manifests in the argument",
      "affectedSide": "for | against | both",
      "impact": 6
    }
  ],
  "summary": "Brief 2-3 sentence summary of the debate",
  "confidence": 0.85,
  "forStrength": 7,
  "againstStrength": 6
}

## Guidelines

1. **Be Thorough**: Extract all significant arguments, not just the most obvious ones.

2. **Identify Both Sides**: Even if content is one-sided, try to identify the implicit opposing view.

3. **Be Precise with Cruxes**: A crux is not just any disagreement - it's the core issue that, if resolved, would significantly change the debate.

4. **Argument Strength Scoring (1-10)**:
   - 8-10: Strong — supported by credible evidence, logically sound, directly relevant
   - 5-7: Moderate — some evidence but gaps, or logic has minor weaknesses
   - 2-4: Weak — little evidence, logical gaps, or mostly opinion-based
   - 1: Unsupported — pure assertion with no backing

5. **Fallacy Severity**:
   - "confirmed": Clear, textbook fallacy with identifiable quote
   - "likely": Strong indicators of fallacious reasoning
   - "possible": Could be a fallacy depending on interpretation

6. **Bias Detection**: Identify cognitive biases, rhetorical framing, cherry-picking of evidence, or systematic omissions. Rate impact 1-10 based on how much the bias distorts the argument.

7. **Overall Side Strength (forStrength/againstStrength)**: Holistic 1-10 rating considering all arguments, evidence quality, logical soundness, and presence of fallacies for each side.

8. **Speaker Attribution**: If speakers are identified (by name, role, or "Speaker A/B"), preserve this.

9. **Confidence Level**:
   - 0.9-1.0: Clear debate with well-defined positions
   - 0.7-0.89: Reasonably clear but some ambiguity
   - 0.5-0.69: Significant ambiguity or one-sided content
   - Below 0.5: Very unclear or doesn't appear to be argumentative

Respond with ONLY the JSON object, no additional text or markdown formatting.`;
}

/**
 * Build the user prompt for extraction
 */
function buildExtractionUserPrompt(
  content: string,
  contentType: "transcript" | "article" | "freeform"
): string {
  const typeHints = {
    transcript: `This is a transcript of a debate or discussion.
Look for speaker turns, dialogue markers, or other indicators of who is speaking.
Pay attention to rebuttals and direct responses between speakers.`,
    article: `This is an argumentative article or essay.
The author may present their view and address counterarguments.
Look for thesis statements, supporting paragraphs, and conclusions.`,
    freeform: `This is general content that may contain arguments.
Analyze it for any argumentative structure, even if informal.`,
  };

  return `## Content Type
${typeHints[contentType]}

## Content to Analyze

${content}

---

Please extract the arguments, positions, cruxes, and any potential fallacies from this content.`;
}

/**
 * Parse extraction response from JSON
 */
function parseExtractionResponse(response: string): ExtractedArguments | null {
  try {
    // Try to extract JSON from the response
    let jsonStr = response.trim();

    // Handle markdown code blocks
    const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    }

    // Handle responses that start with non-JSON text
    const jsonStart = jsonStr.indexOf("{");
    if (jsonStart > 0) {
      jsonStr = jsonStr.substring(jsonStart);
    }

    // Find the matching closing brace
    let depth = 0;
    let endIndex = -1;
    for (let i = 0; i < jsonStr.length; i++) {
      if (jsonStr[i] === "{") depth++;
      if (jsonStr[i] === "}") {
        depth--;
        if (depth === 0) {
          endIndex = i;
          break;
        }
      }
    }
    if (endIndex > 0) {
      jsonStr = jsonStr.substring(0, endIndex + 1);
    }

    const parsed = JSON.parse(jsonStr);

    // Validate required fields
    if (!parsed.topic || !parsed.positions) {
      return null;
    }

    // Ensure arrays exist
    return {
      topic: parsed.topic,
      positions: parsed.positions || [],
      identifiedCruxes: parsed.identifiedCruxes || [],
      potentialFallacies: parsed.potentialFallacies || [],
      detectedBiases: parsed.detectedBiases || [],
      summary: parsed.summary || "",
      confidence: parsed.confidence ?? 0.5,
      forStrength: parsed.forStrength ?? undefined,
      againstStrength: parsed.againstStrength ?? undefined,
    };
  } catch {
    return null;
  }
}

/**
 * Default agent for extraction (uses Claude)
 */
const DEFAULT_EXTRACTION_AGENT: AgentConfig = {
  id: "extractor-claude",
  name: "Argument Extractor",
  type: "local-llm",
  model: "claude",
};

/**
 * Extract arguments from content
 */
export async function extractArguments(
  content: string,
  contentType: "transcript" | "article" | "freeform" = "freeform",
  agent: AgentConfig = DEFAULT_EXTRACTION_AGENT
): Promise<ExtractedArguments> {
  const systemPrompt = buildExtractionSystemPrompt();
  const userPrompt = buildExtractionUserPrompt(content, contentType);

  const response = await executeAgent({
    agent,
    systemPrompt,
    userPrompt,
  });

  if (response.error) {
    throw new Error(`Extraction failed: ${response.error}`);
  }

  const parsed = parseExtractionResponse(response.content);
  if (!parsed) {
    throw new Error("Failed to parse extraction response");
  }

  return parsed;
}

/**
 * Convert extracted arguments to debate messages format
 * for use with the judge council
 */
export function toDebateMessages(
  extracted: ExtractedArguments
): { side: "for" | "against"; content: string; round: number }[] {
  const messages: { side: "for" | "against"; content: string; round: number }[] = [];

  // Group arguments by side
  const forArgs = extracted.positions.filter((p) => p.side === "for");
  const againstArgs = extracted.positions.filter((p) => p.side === "against");

  // Create synthetic debate messages
  let round = 1;

  // Combine all for arguments
  if (forArgs.length > 0) {
    const forContent = forArgs
      .flatMap((p) =>
        p.arguments.map((a) => {
          let content = a.claim;
          if (a.evidence && a.evidence.length > 0) {
            content += "\n\nEvidence:\n" + a.evidence.map((e) => `- ${e}`).join("\n");
          }
          return content;
        })
      )
      .join("\n\n");

    messages.push({
      side: "for",
      content: forContent,
      round,
    });
  }

  // Combine all against arguments
  if (againstArgs.length > 0) {
    const againstContent = againstArgs
      .flatMap((p) =>
        p.arguments.map((a) => {
          let content = a.claim;
          if (a.evidence && a.evidence.length > 0) {
            content += "\n\nEvidence:\n" + a.evidence.map((e) => `- ${e}`).join("\n");
          }
          return content;
        })
      )
      .join("\n\n");

    messages.push({
      side: "against",
      content: againstContent,
      round,
    });
  }

  return messages;
}
