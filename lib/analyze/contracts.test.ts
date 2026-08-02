import { describe, expect, it } from "vitest";
import { extractArgumentsOffline } from "./offline";
import { judgeContentOffline } from "@/lib/judge/offline";
import {
  AnalyzeSuccessResponseSchema,
  INVALID_ANALYZE_RESPONSE_MESSAGE,
  INVALID_JUDGING_RESPONSE_MESSAGE,
  parseAnalyzeSuccessResponse,
  parseJudgingResult,
} from "./contracts";

function responseFixture() {
  return {
    extracted: extractArgumentsOffline(
      "Supporters favor the policy because it reduces costs. Critics oppose it because implementation could be risky.",
      "freeform",
    ),
    judgingResult: null,
    execution: {
      analysis: { requested: "offline" as const, actual: "offline" as const },
      judging: { requested: "disabled" as const, actual: "disabled" as const },
    },
  };
}

describe("AnalyzeSuccessResponseSchema", () => {
  it("accepts results when persistence IDs are absent", () => {
    const result = AnalyzeSuccessResponseSchema.parse(responseFixture());

    expect(result.id).toBeUndefined();
    expect(result.judgmentId).toBeUndefined();
  });

  it("preserves optional analysis and judgment IDs", () => {
    const result = AnalyzeSuccessResponseSchema.parse({
      ...responseFixture(),
      id: "analysis-id",
      judgmentId: "judgment-id",
    });

    expect(result.id).toBe("analysis-id");
    expect(result.judgmentId).toBe("judgment-id");
  });

  it("rejects malformed service responses with stable UI-safe copy", () => {
    expect(() => parseAnalyzeSuccessResponse({ extracted: null })).toThrow(
      INVALID_ANALYZE_RESPONSE_MESSAGE,
    );
  });
});

describe("parseJudgingResult", () => {
  it("accepts a complete judging result and removes unrelated transport fields", () => {
    const result = judgeContentOffline(
      "Supporters cite lower costs while critics cite implementation risk.",
      "freeform",
      ["claude"],
    );

    expect(parseJudgingResult({ ...result, id: "transport-only-id" })).toEqual(
      result,
    );
  });

  it("rejects incomplete successful payloads with stable UI-safe copy", () => {
    expect(() => parseJudgingResult({ winner: "draw" })).toThrow(
      INVALID_JUDGING_RESPONSE_MESSAGE,
    );
  });
});
