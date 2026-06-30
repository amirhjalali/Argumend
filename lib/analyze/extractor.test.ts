import { describe, expect, it } from "vitest";
import { ExtractedArgumentsSchema } from "./extractor";

describe("ExtractedArgumentsSchema", () => {
  it("accepts the typed extraction boundary shape", () => {
    const parsed = ExtractedArgumentsSchema.safeParse({
      topic: "Whether nuclear energy should expand",
      positions: [
        {
          side: "for",
          speaker: null,
          arguments: [
            {
              claim: "Nuclear power provides firm low-carbon electricity.",
              evidence: ["France has low power-sector emissions."],
              strengthScore: "8",
            },
          ],
        },
      ],
      summary: "A debate over nuclear energy expansion.",
      confidence: "0.72",
    });

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
