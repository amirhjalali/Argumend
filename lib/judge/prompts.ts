/**
 * Judge Prompts
 *
 * System prompts for AI judges evaluating debates.
 */

import { DEFAULT_RUBRIC, type RubricDimension } from "./rubric";

/**
 * Build the scoring rubric section of the prompt
 */
function buildRubricSection(rubric: RubricDimension[]): string {
  return rubric
    .map(
      (dim) => `
### ${dim.name} (${Math.round(dim.weight * 100)}% weight)
${dim.description}

Scoring guidelines:
- Low (1-3): ${dim.guidelines.low}
- Medium (4-6): ${dim.guidelines.medium}
- High (7-10): ${dim.guidelines.high}`
    )
    .join("\n");
}

/**
 * Build the JSON output format section
 */
function buildOutputFormatSection(): string {
  return `
{
  "forScore": {
    "dimensions": [
      {
        "dimensionId": "logical-validity",
        "score": 7,
        "reasoning": "Explanation for this score",
        "examples": ["Specific quote or reference from the text"]
      }
      // ... one entry per dimension
    ],
    "summary": "Overall assessment of the FOR side's performance",
    "confidence": 0.85
  },
  "againstScore": {
    "dimensions": [
      // Same structure as forScore
    ],
    "summary": "Overall assessment of the AGAINST side's performance",
    "confidence": 0.85
  },
  "winner": "for" | "against" | "draw",
  "overallReasoning": "Explanation of why this side won and the key factors"
}`;
}

/**
 * Build the complete judge system prompt
 */
export function buildJudgeSystemPrompt(
  rubric: RubricDimension[] = DEFAULT_RUBRIC
): string {
  return `You are an impartial judge evaluating a debate between two sides. Your task is to carefully analyze the arguments presented and score each side according to a structured rubric.

## Your Role

You must:
1. Evaluate each side's arguments independently and fairly
2. Score each dimension of the rubric from 1-10
3. Provide specific reasoning with examples from the text
4. Report your confidence level in your assessment
5. Determine a winner based on the weighted scores

## Scoring Rubric

${buildRubricSection(rubric)}

## Important Guidelines

1. **Be Objective**: Set aside personal opinions on the topic. Judge only the quality of argumentation.

2. **Cite Evidence**: For each score, reference specific parts of the debate that justify your rating.

3. **Consider Both Sides Equally**: Evaluate the "for" and "against" positions with the same rigor.

4. **Assess Bias & Credibility**: Actively check for cognitive biases (confirmation bias, cherry-picking, anchoring), evaluate whether sources are credible and independent, and note if either side ignores contradicting evidence.

5. **Confidence Level**: Report how confident you are in your assessment (0-1):
   - 0.9-1.0: Very confident, clear winner
   - 0.7-0.89: Confident, but some close calls
   - 0.5-0.69: Moderate confidence, debate was close
   - Below 0.5: Low confidence, may need re-evaluation

6. **Draw Threshold**: Only declare a draw if the weighted scores are within 0.5 points of each other.

## Output Format

You MUST respond with valid JSON in exactly this format:
${buildOutputFormatSection()}

Respond with ONLY the JSON object, no additional text or markdown formatting.`;
}

/**
 * Build the user prompt for judging a debate
 */
export function buildJudgeDebatePrompt(
  messages: { side: "for" | "against"; content: string; round: number }[],
  topic?: string
): string {
  const topicSection = topic
    ? `## Debate Topic\n"${topic}"\n\n`
    : "";

  const debateSection = messages
    .map((m, i) => {
      const sideLabel = m.side === "for" ? "FOR" : "AGAINST";
      return `### Round ${m.round} - ${sideLabel}\n${m.content}`;
    })
    .join("\n\n---\n\n");

  return `${topicSection}## Debate Transcript

${debateSection}

---

Please evaluate this debate according to the rubric and provide your judgment in the specified JSON format.`;
}

/**
 * Build the user prompt for judging free-form content
 */
export function buildJudgeContentPrompt(
  content: string,
  contentType: "transcript" | "article" | "freeform" = "freeform"
): string {
  const typeDescriptions = {
    transcript: "debate transcript or discussion",
    article: "argumentative article or essay",
    freeform: "content",
  };

  return `## Content to Analyze

The following is a ${typeDescriptions[contentType]} that presents arguments for and against a position. Identify the main positions being argued and evaluate the quality of argumentation for each side.

---

${content}

---

Please:
1. Identify the main topic/claim being debated
2. Identify the "for" and "against" positions
3. Evaluate each side according to the rubric
4. Provide your judgment in the specified JSON format

If the content doesn't clearly present two opposing sides, do your best to identify the main argument and any counter-arguments or potential objections that could be raised.`;
}

/**
 * Parse judge response from JSON
 */
export interface ParsedJudgeResponse {
  forScore: {
    dimensions: {
      dimensionId: string;
      score: number;
      reasoning: string;
      examples?: string[];
    }[];
    summary: string;
    confidence: number;
  };
  againstScore: {
    dimensions: {
      dimensionId: string;
      score: number;
      reasoning: string;
      examples?: string[];
    }[];
    summary: string;
    confidence: number;
  };
  winner: "for" | "against" | "draw";
  overallReasoning: string;
}

/**
 * Attempt to parse judge response, handling various formats
 */
export function parseJudgeResponse(response: string): ParsedJudgeResponse | null {
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
    if (!parsed.forScore || !parsed.againstScore || !parsed.winner) {
      return null;
    }

    return parsed as ParsedJudgeResponse;
  } catch {
    return null;
  }
}
