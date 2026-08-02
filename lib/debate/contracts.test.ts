import { describe, expect, it } from "vitest";
import {
  DEBATE_GENERATION_ERROR_MESSAGE,
  INVALID_DEBATE_RESPONSE_MESSAGE,
  DebateStreamEventSchema,
  DebateTurnExecutionSchema,
  DebateTurnRequestSchema,
  parseDebateStreamEvent,
  parseDebateTurnSuccess,
} from "./contracts";

const request = {
  topic: "Nuclear energy should expand",
  topicId: "nuclear-energy-safety",
  side: "for",
  model: "gpt-5",
  round: 1,
  previousMessages: [],
};

describe("debate request contract", () => {
  it("accepts the complete typed request including optional context", () => {
    expect(
      DebateTurnRequestSchema.parse({
        ...request,
        previousMessages: [
          {
            id: "turn-1",
            side: "against",
            content: "Projects can overrun.",
            round: 1,
            model: "claude",
            role: "assistant",
          },
        ],
        pillars: [
          {
            title: "Build speed",
            skepticPremise: "Projects can overrun.",
            proponentRebuttal: "Standardization reduces delays.",
          },
        ],
      }),
    ).toMatchObject({ model: "gpt-5", round: 1 });
  });

  it.each([
    ["empty topic", { topic: "" }],
    ["oversized topic", { topic: "x".repeat(501) }],
    ["missing topic id", { topicId: "" }],
    ["unsupported side", { side: "neutral" }],
    ["unsupported model", { model: "gpt-6" }],
    ["fractional round", { round: 1.5 }],
    ["round below range", { round: 0 }],
    ["round above range", { round: 21 }],
    ["invalid prior turn", { previousMessages: [{ side: "for", content: "x", round: 0 }] }],
    ["oversized prior turn", { previousMessages: [{ side: "for", content: "x".repeat(50_001), round: 1 }] }],
    ["too many prior turns", { previousMessages: Array.from({ length: 41 }, () => ({ side: "for", content: "x", round: 1 })) }],
    ["malformed pillar", { pillars: [{ title: "Only a title" }] }],
    ["oversized pillar title", { pillars: [{ title: "x".repeat(501), skepticPremise: "x", proponentRebuttal: "x" }] }],
    ["oversized pillar text", { pillars: [{ title: "x", skepticPremise: "x".repeat(50_001), proponentRebuttal: "x" }] }],
    ["too many pillars", { pillars: Array.from({ length: 21 }, () => ({ title: "x", skepticPremise: "x", proponentRebuttal: "x" })) }],
  ])("rejects %s", (_label, patch) => {
    expect(DebateTurnRequestSchema.safeParse({ ...request, ...patch }).success).toBe(false);
  });
});

describe("debate execution invariants", () => {
  it.each([
    {
      requested: "programmatic",
      actual: "programmatic",
      requestedModel: "claude",
      actualModel: null,
    },
    {
      requested: "live",
      actual: "live",
      requestedModel: "gpt-5",
      actualModel: "gpt-5",
    },
    {
      requested: "live",
      actual: "programmatic",
      requestedModel: "gemini",
      actualModel: null,
      fallbackCode: "PROVIDER_ERROR",
    },
  ])("accepts a coherent $requested to $actual state", (execution) => {
    expect(DebateTurnExecutionSchema.safeParse(execution).success).toBe(true);
  });

  it.each([
    [
      "programmatic output claiming a provider",
      {
        requested: "programmatic",
        actual: "programmatic",
        requestedModel: "claude",
        actualModel: "claude",
      },
    ],
    [
      "live output without a provider",
      { requested: "live", actual: "live", requestedModel: "claude", actualModel: null },
    ],
    [
      "fallback without a reason code",
      { requested: "live", actual: "programmatic", requestedModel: "claude", actualModel: null },
    ],
    [
      "fallback code on a live success",
      {
        requested: "live",
        actual: "live",
        requestedModel: "claude",
        actualModel: "claude",
        fallbackCode: "AUTH_REQUIRED",
      },
    ],
  ])("rejects %s", (_label, execution) => {
    expect(DebateTurnExecutionSchema.safeParse(execution).success).toBe(false);
  });
});

describe("debate response parsers", () => {
  const execution = {
    requested: "programmatic" as const,
    actual: "programmatic" as const,
    requestedModel: "grok" as const,
    actualModel: null,
  };

  it("returns a validated successful turn", () => {
    expect(parseDebateTurnSuccess({ argument: "A substantive argument", execution })).toEqual({
      argument: "A substantive argument",
      execution,
    });
  });

  it.each([
    {},
    { argument: "", execution },
    { argument: "text", execution: { ...execution, actualModel: "grok" } },
  ])("rejects malformed success payload %#", (payload) => {
    expect(() => parseDebateTurnSuccess(payload)).toThrow(INVALID_DEBATE_RESPONSE_MESSAGE);
  });

  it.each([
    { type: "token", token: "word" },
    { type: "replace" },
    { type: "complete", execution },
    {
      type: "error",
      code: "DEBATE_GENERATION_FAILED",
      message: DEBATE_GENERATION_ERROR_MESSAGE,
    },
  ])("returns a validated $type stream event", (event) => {
    expect(parseDebateStreamEvent(event)).toEqual(event);
    expect(DebateStreamEventSchema.safeParse(event).success).toBe(true);
  });

  it.each([
    { type: "token" },
    { type: "replace", token: "not allowed" },
    { type: "complete", execution: { ...execution, actualModel: "grok" } },
    { type: "error", code: "PRIVATE_PROVIDER_ERROR", message: "secret" },
    { type: "unknown" },
  ])("rejects malformed stream event %#", (event) => {
    expect(() => parseDebateStreamEvent(event)).toThrow(INVALID_DEBATE_RESPONSE_MESSAGE);
  });
});
