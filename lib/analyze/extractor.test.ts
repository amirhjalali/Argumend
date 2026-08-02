import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  ExtractedArgumentsSchema,
  extractArguments,
  getArgumentStrength,
  getConfidenceInfo,
  toDebateMessages,
} from "./extractor";

const mocks = vi.hoisted(() => ({
  executeAgent: vi.fn(),
}));

vi.mock("@/lib/agents/executor", () => ({ executeAgent: mocks.executeAgent }));

const validExtraction = {
  topic: "Whether nuclear energy should expand",
  positions: [
    {
      side: "for" as const,
      speaker: null,
      arguments: [
        {
          claim: "Nuclear power provides firm low-carbon electricity.",
          evidence: ["France has low power-sector emissions."],
          source: null,
          strengthScore: "8",
        },
      ],
    },
    {
      side: "against" as const,
      arguments: [{ claim: "New plants are expensive.", evidence: [] }],
    },
  ],
  summary: "A debate over nuclear energy expansion.",
  confidence: "0.72",
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("ExtractedArgumentsSchema", () => {
  it("accepts the typed extraction boundary shape", () => {
    const parsed = ExtractedArgumentsSchema.safeParse(validExtraction);

    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.confidence).toBe(0.72);
      expect(parsed.data.positions[0].speaker).toBeUndefined();
      expect(parsed.data.positions[0].arguments[0].strengthScore).toBe(8);
    }
  });

  it("rejects impossible extraction scores", () => {
    const parsed = ExtractedArgumentsSchema.safeParse({
      topic: "Whether nuclear energy should expand",
      positions: [
        {
          side: "for",
          arguments: [
            {
              claim: "Nuclear power provides firm low-carbon electricity.",
              strengthScore: 99,
            },
          ],
        },
      ],
      confidence: 1.2,
    });

    expect(parsed.success).toBe(false);
  });
});

describe("extractArguments", () => {
  it("parses fenced provider JSON with surrounding prose and applies schema defaults", async () => {
    mocks.executeAgent.mockResolvedValue({
      content: `Here is the extraction:\n\n\`\`\`json\n${JSON.stringify(validExtraction)}\n\`\`\`\nDone.`,
      agentId: "extractor",
    });

    const result = await extractArguments("Speaker A: Nuclear is reliable.", "transcript");

    expect(result).toMatchObject({
      topic: validExtraction.topic,
      confidence: 0.72,
      identifiedCruxes: [],
      potentialFallacies: [],
      detectedBiases: [],
    });
    expect(result.positions[0].speaker).toBeUndefined();
    expect(result.positions[0].arguments[0]).toMatchObject({
      source: undefined,
      strengthScore: 8,
    });
    expect(mocks.executeAgent).toHaveBeenCalledWith(
      expect.objectContaining({
        agent: expect.objectContaining({ id: "extractor-claude", model: "claude" }),
        systemPrompt: expect.stringContaining("Respond with ONLY the JSON object"),
        userPrompt: expect.stringContaining("Look for speaker turns"),
      }),
    );
  });

  it("uses content-type-specific instructions and a caller-supplied agent", async () => {
    const customAgent = {
      id: "custom-extractor",
      name: "Custom extractor",
      type: "webhook" as const,
      webhookUrl: "https://agents.test/extract",
    };
    mocks.executeAgent.mockResolvedValue({
      content: JSON.stringify(validExtraction),
      agentId: customAgent.id,
    });

    await extractArguments("An essay body", "article", customAgent);

    expect(mocks.executeAgent).toHaveBeenCalledWith(
      expect.objectContaining({
        agent: customAgent,
        userPrompt: expect.stringMatching(/argumentative article[\s\S]*An essay body/),
      }),
    );
  });

  it("surfaces executor failures without attempting to parse empty content", async () => {
    mocks.executeAgent.mockResolvedValue({
      content: "",
      agentId: "extractor",
      error: "provider unavailable",
    });

    await expect(extractArguments("content")).rejects.toThrow(
      "Extraction failed: provider unavailable",
    );
  });

  it.each([
    ["not json", "malformed JSON"],
    [JSON.stringify({ ...validExtraction, confidence: 4 }), "schema-invalid JSON"],
    ["prefix {\"topic\":", "truncated JSON"],
  ])("rejects %s responses", async (content) => {
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
    mocks.executeAgent.mockResolvedValue({ content, agentId: "extractor" });

    await expect(extractArguments("content")).rejects.toThrow(
      "Failed to parse extraction response",
    );
  });
});

describe("extraction presentation transforms", () => {
  it.each([
    [10, "strong"],
    [7, "strong"],
    [6.99, "moderate"],
    [4, "moderate"],
    [1, "weak"],
    [0, "unsupported"],
    [-1, "unsupported"],
  ] as const)("maps strength %s to %s", (score, expected) => {
    expect(getArgumentStrength(score)).toBe(expected);
  });

  it.each([
    [0.9, "very-high"],
    [0.75, "high"],
    [0.5, "moderate"],
    [0.3, "low"],
    [0.29, "very-low"],
  ] as const)("maps confidence %s to %s", (score, expected) => {
    expect(getConfidenceInfo(score)).toMatchObject({ level: expected });
  });

  it("groups arguments by side and preserves evidence as readable bullets", () => {
    const extracted = ExtractedArgumentsSchema.parse(validExtraction);

    expect(toDebateMessages(extracted)).toEqual([
      {
        side: "for",
        round: 1,
        content:
          "Nuclear power provides firm low-carbon electricity.\n\nEvidence:\n- France has low power-sector emissions.",
      },
      {
        side: "against",
        round: 1,
        content: "New plants are expensive.",
      },
    ]);
  });

  it("omits a side that has no extracted position", () => {
    const extracted = ExtractedArgumentsSchema.parse({
      ...validExtraction,
      positions: validExtraction.positions.filter((position) => position.side === "for"),
    });

    expect(toDebateMessages(extracted).map((message) => message.side)).toEqual(["for"]);
  });
});
