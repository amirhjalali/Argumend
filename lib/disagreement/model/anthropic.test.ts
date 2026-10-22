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

  it("does not construct a client for an already-aborted request", async () => {
    const { AnthropicDisagreementProvider } = await import("./anthropic");
    const controller = new AbortController();
    controller.abort();
    const provider = new AnthropicDisagreementProvider("req-1", { model: "claude-test", maxOutputTokens: 4096 });

    await expect(provider.extract(REQUEST, { signal: controller.signal })).rejects.toMatchObject({ name: "AbortError" });
    expect(mocks.constructor).not.toHaveBeenCalled();
    expect(mocks.create).not.toHaveBeenCalled();
  });

  it("forwards client cancellation to the SDK and does not retry its abort error", async () => {
    const { AnthropicDisagreementProvider } = await import("./anthropic");
    const controller = new AbortController();
    let started!: (signal: AbortSignal) => void;
    const modelStarted = new Promise<AbortSignal>((resolve) => { started = resolve; });
    mocks.create.mockImplementationOnce((_body, { signal }: { signal: AbortSignal }) => {
      started(signal);
      return new Promise((_resolve, reject) => {
        signal.addEventListener("abort", () => reject(new Error("Request was aborted.")), { once: true });
      });
    });
    const provider = new AnthropicDisagreementProvider("req-1", { model: "claude-test", maxOutputTokens: 4096 });
    const extraction = provider.extract(REQUEST, { signal: controller.signal });
    const assertion = expect(extraction).rejects.toMatchObject({ name: "AbortError" });
    const modelSignal = await modelStarted;
    controller.abort();

    await assertion;
    expect(modelSignal.aborted).toBe(true);
    expect(mocks.create).toHaveBeenCalledTimes(1);
  });

  it("does not repair a late invalid response after cancellation", async () => {
    const { AnthropicDisagreementProvider } = await import("./anthropic");
    const controller = new AbortController();
    mocks.create.mockImplementationOnce(async () => {
      controller.abort();
      return toolResponse({ mainQuestion: "invalid" });
    });
    const provider = new AnthropicDisagreementProvider("req-1", { model: "claude-test", maxOutputTokens: 4096 });

    await expect(provider.extract(REQUEST, { signal: controller.signal })).rejects.toMatchObject({ name: "AbortError" });
    expect(mocks.create).toHaveBeenCalledTimes(1);
  });

  it("maps an SDK abort at its own deadline to MODEL_TIMEOUT", async () => {
    const { AnthropicDisagreementProvider } = await import("./anthropic");
    const deadline = new AbortController();
    vi.spyOn(AbortSignal, "timeout").mockReturnValue(deadline.signal);
    mocks.create.mockImplementationOnce(async () => {
      deadline.abort(new DOMException("Deadline exceeded", "TimeoutError"));
      throw new Error("Request was aborted.");
    });
    const provider = new AnthropicDisagreementProvider("req-1", { model: "claude-test", maxOutputTokens: 4096 });

    await expect(provider.extract(REQUEST, {})).rejects.toMatchObject({ code: "MODEL_TIMEOUT" });
    expect(mocks.create).toHaveBeenCalledTimes(1);
  });
});
