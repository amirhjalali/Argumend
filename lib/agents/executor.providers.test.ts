import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  anthropicCreate: vi.fn(),
  openaiCreate: vi.fn(),
  geminiGenerate: vi.fn(),
  anthropicConstructor: vi.fn(),
  openaiConstructor: vi.fn(),
  geminiConstructor: vi.fn(),
}));

vi.mock("@anthropic-ai/sdk", () => ({
  default: class MockAnthropic {
    messages = { create: mocks.anthropicCreate };
    constructor() {
      mocks.anthropicConstructor();
    }
  },
}));

vi.mock("openai", () => ({
  default: class MockOpenAI {
    chat = { completions: { create: mocks.openaiCreate } };
    constructor() {
      mocks.openaiConstructor();
    }
  },
}));

vi.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: class MockGoogleGenerativeAI {
    constructor(apiKey: string) {
      mocks.geminiConstructor(apiKey);
    }
    getGenerativeModel = vi.fn(() => ({ generateContent: mocks.geminiGenerate }));
  },
}));

const request = (
  model: "claude" | "gpt-4" | "gpt-5" | "gemini" | undefined,
  type: "local-llm" | "moltbook" | "custom" = "local-llm",
) => ({
  agent: {
    id: `${type}-${model ?? "default"}`,
    name: "Provider agent",
    type,
    model,
    ...(type === "custom" ? { systemPrompt: "Custom system" } : {}),
  },
  systemPrompt: "Base system",
  userPrompt: "User prompt",
});

describe("agent executor provider adapters", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    mocks.anthropicCreate.mockResolvedValue({
      content: [
        { type: "image", source: {} },
        { type: "text", text: "Claude answer" },
      ],
    });
    mocks.openaiCreate.mockResolvedValue({
      choices: [{ message: { content: "OpenAI answer" } }],
    });
    mocks.geminiGenerate.mockResolvedValue({
      response: { text: () => "Gemini answer" },
    });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("extracts the first Anthropic text block and caches the lazy client", async () => {
    const { executeAgent } = await import("./executor");

    await expect(executeAgent(request("claude"))).resolves.toMatchObject({
      content: "Claude answer",
    });
    await executeAgent(request("claude"));

    expect(mocks.anthropicConstructor).toHaveBeenCalledOnce();
    expect(mocks.anthropicCreate).toHaveBeenCalledWith({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: "Base system",
      messages: [{ role: "user", content: "User prompt" }],
    });
  });

  it.each([
    ["gpt-4", "gpt-4o"],
    ["gpt-5", "gpt-5"],
  ] as const)("routes %s to the matching OpenAI model", async (model, providerModel) => {
    const { executeAgent } = await import("./executor");

    await expect(executeAgent(request(model))).resolves.toMatchObject({
      content: "OpenAI answer",
    });
    expect(mocks.openaiCreate).toHaveBeenCalledWith({
      model: providerModel,
      max_tokens: 2048,
      messages: [
        { role: "system", content: "Base system" },
        { role: "user", content: "User prompt" },
      ],
    });
    expect(mocks.anthropicCreate).not.toHaveBeenCalled();
  });

  it("combines prompts for Gemini and accepts the fallback environment key", async () => {
    vi.stubEnv("GEMINI_API_KEY", "gemini-key");
    const { executeAgent } = await import("./executor");

    await expect(executeAgent(request("gemini"))).resolves.toMatchObject({
      content: "Gemini answer",
    });
    expect(mocks.geminiConstructor).toHaveBeenCalledWith("gemini-key");
    expect(mocks.geminiGenerate).toHaveBeenCalledWith(
      "Base system\n\n---\n\nUser prompt",
    );
  });

  it("returns a typed configuration error when Gemini has no key", async () => {
    vi.stubEnv("GOOGLE_AI_API_KEY", "");
    vi.stubEnv("GEMINI_API_KEY", "");
    const { executeAgent } = await import("./executor");

    await expect(executeAgent(request("gemini"))).resolves.toMatchObject({
      content: "",
      error: "GOOGLE_AI_API_KEY or GEMINI_API_KEY environment variable is required",
    });
    expect(mocks.geminiGenerate).not.toHaveBeenCalled();
  });

  it("uses the custom agent's system prompt and routes Moltbook through the local fallback", async () => {
    const { executeAgent } = await import("./executor");

    await expect(executeAgent(request("claude", "custom"))).resolves.toMatchObject({
      content: "Claude answer",
    });
    await expect(executeAgent(request("claude", "moltbook"))).resolves.toMatchObject({
      content: "Claude answer",
    });

    expect(mocks.anthropicCreate.mock.calls[0][0].system).toBe("Custom system");
    expect(mocks.anthropicCreate.mock.calls[1][0].system).toBe("Base system");
  });

  it("defaults an unspecified local model to Claude and normalizes empty provider content", async () => {
    mocks.anthropicCreate.mockResolvedValue({ content: [{ type: "tool_use", id: "tool-1" }] });
    const { executeAgent } = await import("./executor");

    const result = await executeAgent(request(undefined));
    expect(result.content).toBe("");
    expect(result.error).toBeUndefined();
    expect(mocks.anthropicCreate).toHaveBeenCalledOnce();
  });

  it("normalizes null OpenAI content without leaking provider shapes", async () => {
    mocks.openaiCreate.mockResolvedValue({ choices: [{ message: { content: null } }] });
    const { executeAgent } = await import("./executor");

    const result = await executeAgent(request("gpt-4"));
    expect(result.content).toBe("");
    expect(result.error).toBeUndefined();
  });
});
