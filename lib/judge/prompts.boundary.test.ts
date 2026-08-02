import { afterEach, describe, expect, it, vi } from "vitest";
import type { RubricDimension } from "./rubric";
import {
  buildJudgeContentPrompt,
  buildJudgeDebatePrompt,
  buildJudgeSystemPrompt,
  parseJudgeResponse,
} from "./prompts";

const validResponse = {
  forScore: {
    dimensions: [{ dimensionId: "logic", score: "8", reasoning: "Sound." }],
  },
  againstScore: {
    dimensions: [{ dimensionId: "logic", score: 6 }],
    confidence: "0.7",
  },
  winner: "for",
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("judge prompt construction", () => {
  it("renders a custom weighted rubric and its scoring guidance", () => {
    const rubric: RubricDimension[] = [
      {
        id: "causal-evidence",
        name: "Causal Evidence",
        description: "Whether evidence supports causation.",
        weight: 0.375,
        guidelines: { low: "Correlation only", medium: "Some controls", high: "Replicated RCT" },
      },
    ];

    const prompt = buildJudgeSystemPrompt(rubric);

    expect(prompt).toContain("### Causal Evidence (38% weight)");
    expect(prompt).toContain("Low (1-3): Correlation only");
    expect(prompt).toContain("High (7-10): Replicated RCT");
    expect(prompt).toContain("Respond with ONLY the JSON object");
  });

  it("preserves round order, side labels, and optional topic context", () => {
    const messages = [
      { side: "for" as const, round: 1, content: "Opening support" },
      { side: "against" as const, round: 1, content: "Opening objection" },
      { side: "for" as const, round: 2, content: "Support rebuttal" },
    ];
    const withTopic = buildJudgeDebatePrompt(messages, "Nuclear should expand");
    const withoutTopic = buildJudgeDebatePrompt(messages);

    expect(withTopic).toContain('## Debate Topic\n"Nuclear should expand"');
    expect(withTopic.indexOf("Round 1 - FOR")).toBeLessThan(
      withTopic.indexOf("Round 1 - AGAINST"),
    );
    expect(withTopic.indexOf("Round 1 - AGAINST")).toBeLessThan(
      withTopic.indexOf("Round 2 - FOR"),
    );
    expect(withoutTopic).not.toContain("## Debate Topic");
  });

  it.each([
    ["transcript", "debate transcript or discussion"],
    ["article", "argumentative article or essay"],
    ["freeform", "content"],
  ] as const)("describes %s input accurately", (contentType, description) => {
    const prompt = buildJudgeContentPrompt("Input body", contentType);

    expect(prompt).toContain(`The following is a ${description}`);
    expect(prompt).toContain("Input body");
  });
});

describe("judge response parsing", () => {
  it("extracts fenced JSON from surrounding provider prose and applies defaults", () => {
    const parsed = parseJudgeResponse(
      `Judgment follows:\n\`\`\`json\n${JSON.stringify(validResponse)}\n\`\`\`\nEnd.`,
    );

    expect(parsed).toEqual({
      forScore: {
        dimensions: [{ dimensionId: "logic", score: 8, reasoning: "Sound." }],
        summary: "",
        confidence: 0.5,
      },
      againstScore: {
        dimensions: [{ dimensionId: "logic", score: 6, reasoning: "" }],
        summary: "",
        confidence: 0.7,
      },
      winner: "for",
      overallReasoning: "",
    });
  });

  it("trims trailing prose after the balanced JSON object", () => {
    expect(parseJudgeResponse(`${JSON.stringify(validResponse)} trailing prose`)).toMatchObject({
      winner: "for",
    });
  });

  it("treats a provider's null confidence as missing rather than numeric zero", () => {
    const parsed = parseJudgeResponse(
      JSON.stringify({
        ...validResponse,
        againstScore: { ...validResponse.againstScore, confidence: null },
      }),
    );

    expect(parsed?.againstScore.confidence).toBe(0.5);
  });

  it.each([
    ["not-json", "malformed JSON"],
    ["{\"forScore\":", "truncated JSON"],
    [JSON.stringify({ ...validResponse, winner: "undecided" }), "invalid winner"],
    [
      JSON.stringify({
        ...validResponse,
        forScore: { dimensions: [{ dimensionId: "logic", score: 11 }] },
      }),
      "out-of-range score",
    ],
    [
      JSON.stringify({
        ...validResponse,
        againstScore: { ...validResponse.againstScore, confidence: "Infinity" },
      }),
      "non-finite confidence",
    ],
  ])("returns null for %s", (response) => {
    vi.spyOn(console, "warn").mockImplementation(() => undefined);

    expect(parseJudgeResponse(response)).toBeNull();
  });
});
