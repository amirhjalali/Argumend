import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DisagreementError } from "@/lib/disagreement/errors";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "@/lib/disagreement/prompts/v1/examples";
import { RAW_EXTRACTION_TOOL } from "./rawSchema";

const mocks = vi.hoisted(() => ({
  create: vi.fn(),
  constructor: vi.fn(),
}));

vi.mock("@anthropic-ai/sdk", () => ({
  default: class MockAnthropic {
    messages = { create: mocks.create };
    constructor() {
      mocks.constructor();
    }
  },
}));

const EXTRACTION = DISAGREEMENT_FEW_SHOT_EXAMPLES[0].extraction;
const REQUEST = {
  content: "Maya: The uninsured rate is about 8 percent.\nNoah: It is closer to 15 percent.",
  contentType: "conversation" as const,
};

function toolResponse(input: unknown) {
  return {
    content: [
      { type: "text", text: "thinking..." },
      { type: "tool_use", name: RAW_EXTRACTION_TOOL.name, input },
    ],
  };
}

function userMessageFrom(call: unknown): string {
  const args = call as [{ messages: Array<{ role: string; content: string }> }, unknown];
  return args[0].messages[0].content;
}

describe("AnthropicDisagreementProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the parsed extraction on a first-attempt success without any repair", async () => {
    const { AnthropicDisagreementProvider } = await import("./anthropic");
    mocks.create.mockResolvedValueOnce(toolResponse(EXTRACTION));

    const provider = new AnthropicDisagreementProvider("req-1", {
      model: "claude-test",
      maxOutputTokens: 4096,
    });

    const result = await provider.extract(REQUEST, {});

    expect(result.data.mainQuestion).toBe(EXTRACTION.mainQuestion);
    expect(result.meta.provider).toBe("anthropic");
    expect(mocks.create).toHaveBeenCalledTimes(1);

    const sentContent = userMessageFrom(mocks.create.mock.calls[0]);
    expect(sentContent).not.toContain("failed schema validation");
  });

  it("makes exactly one repair attempt, and that attempt's message contains the repair note", async () => {
    const { AnthropicDisagreementProvider } = await import("./anthropic");
    mocks.create
      .mockResolvedValueOnce(toolResponse({ ...EXTRACTION, participants: "not-an-array" }))
      .mockResolvedValueOnce(toolResponse(EXTRACTION));

    const provider = new AnthropicDisagreementProvider("req-1", {
      model: "claude-test",
      maxOutputTokens: 4096,
    });

    const result = await provider.extract(REQUEST, {});

    expect(result.data.mainQuestion).toBe(EXTRACTION.mainQuestion);
    expect(mocks.create).toHaveBeenCalledTimes(2);

    const firstMessage = userMessageFrom(mocks.create.mock.calls[0]);
    const secondMessage = userMessageFrom(mocks.create.mock.calls[1]);
    expect(firstMessage).not.toContain("failed schema validation");
    expect(secondMessage).toContain("failed schema validation");
    expect(secondMessage).toContain("participants");
  });

  it("gives up with MODEL_SCHEMA_INVALID after the single bounded repair attempt", async () => {
    const { AnthropicDisagreementProvider } = await import("./anthropic");
    mocks.create
      .mockResolvedValueOnce(toolResponse({ mainQuestion: "q only" }))
      .mockResolvedValueOnce(toolResponse({ mainQuestion: "still bad" }));

    const provider = new AnthropicDisagreementProvider("req-1", {
      model: "claude-test",
      maxOutputTokens: 4096,
    });

    const error = await provider.extract(REQUEST, {}).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(DisagreementError);
    expect((error as DisagreementError).code).toBe("MODEL_SCHEMA_INVALID");
    expect(mocks.create).toHaveBeenCalledTimes(2);
  });

  it("does not spend the repair budget on transient failures", async () => {
    const { AnthropicDisagreementProvider } = await import("./anthropic");
    mocks.create
      .mockRejectedValueOnce(new Error("503 Service Unavailable"))
      .mockResolvedValueOnce(toolResponse(EXTRACTION));

    const provider = new AnthropicDisagreementProvider("req-1", {
      model: "claude-test",
      maxOutputTokens: 4096,
    });

    const result = await provider.extract(REQUEST, {});

    expect(result.data.mainQuestion).toBe(EXTRACTION.mainQuestion);
    expect(mocks.create).toHaveBeenCalledTimes(2);
    const secondMessage = userMessageFrom(mocks.create.mock.calls[1]);
    expect(secondMessage).not.toContain("failed schema validation");
  });
});
