import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AgentExecutionRequest } from "./types";
import { executeAgent, executeAgentsInParallel } from "./executor";

const webhookRequest = (
  id: string,
  overrides: Partial<AgentExecutionRequest["agent"]> = {},
): AgentExecutionRequest => ({
  agent: {
    id,
    name: `Agent ${id}`,
    type: "webhook",
    webhookUrl: `https://agents.test/${id}`,
    ...overrides,
  },
  systemPrompt: "Use evidence.",
  userPrompt: "Make the strongest case.",
});

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

describe("agent executor", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.stubEnv("XAI_API_KEY", "");
    vi.stubEnv("GROK_API_KEY", "");
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("sends the webhook contract and returns its content", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ content: "Evidence-first answer" }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await executeAgent(webhookRequest("alpha"));

    expect(result).toMatchObject({
      agentId: "alpha",
      content: "Evidence-first answer",
    });
    expect(result.error).toBeUndefined();
    expect(result.latencyMs).toEqual(expect.any(Number));
    expect(fetchMock).toHaveBeenCalledWith(
      "https://agents.test/alpha",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: "Use evidence.",
          userPrompt: "Make the strongest case.",
        }),
        signal: expect.any(AbortSignal),
      }),
    );
  });

  it.each([
    [{ response: "response field" }, "response field"],
    [{ text: "text field" }, "text field"],
    [{ unexpected: true }, ""],
  ])("normalizes alternate webhook response shapes", async (payload, expected) => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(payload)));

    await expect(executeAgent(webhookRequest("shape"))).resolves.toMatchObject({
      content: expected,
      agentId: "shape",
    });
  });

  it("returns a typed error instead of throwing for missing webhook configuration", async () => {
    const request = webhookRequest("missing", { webhookUrl: undefined });

    await expect(executeAgent(request)).resolves.toMatchObject({
      content: "",
      agentId: "missing",
      error: "Webhook URL required for webhook agent type",
    });
  });

  it("aborts a webhook that exceeds its configured timeout", async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation((_url: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          init.signal?.addEventListener("abort", () => reject(new Error("request aborted")));
        }),
      ),
    );

    const pending = executeAgent(webhookRequest("slow", { timeoutMs: 25 }));
    await vi.advanceTimersByTimeAsync(25);

    await expect(pending).resolves.toMatchObject({
      content: "",
      agentId: "slow",
      error: "request aborted",
    });
  });

  it("retries a transient Grok failure with backoff and then succeeds", async () => {
    vi.useFakeTimers();
    vi.stubEnv("XAI_API_KEY", "test-key");
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response("busy", { status: 503 }))
      .mockResolvedValueOnce(
        jsonResponse({ choices: [{ message: { content: "Recovered answer" } }] }),
      );
    vi.stubGlobal("fetch", fetchMock);

    const pending = executeAgent({
      ...webhookRequest("grok-retry"),
      agent: {
        id: "grok-retry",
        name: "Grok retry",
        type: "local-llm",
        model: "grok",
      },
    });
    await vi.runAllTimersAsync();

    await expect(pending).resolves.toMatchObject({
      content: "Recovered answer",
      agentId: "grok-retry",
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("does not retry a non-transient Grok response", async () => {
    vi.stubEnv("XAI_API_KEY", "test-key");
    const fetchMock = vi.fn().mockResolvedValue(new Response("bad input", { status: 400 }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await executeAgent({
      ...webhookRequest("grok-bad-request"),
      agent: {
        id: "grok-bad-request",
        name: "Grok bad request",
        type: "local-llm",
        model: "grok",
      },
    });

    expect(result).toMatchObject({
      content: "",
      agentId: "grok-bad-request",
      error: "Grok API error: HTTP 400: bad input",
    });
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("preserves request order and isolates failures during parallel execution", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation((url: string) =>
        url.endsWith("/broken")
          ? Promise.resolve(new Response("unavailable", { status: 503 }))
          : Promise.resolve(jsonResponse({ content: `answer from ${url.split("/").pop()}` })),
      ),
    );

    const results = await executeAgentsInParallel([
      webhookRequest("first"),
      webhookRequest("broken"),
      webhookRequest("third"),
    ]);

    expect(results.map((result) => result.agentId)).toEqual(["first", "broken", "third"]);
    expect(results[0]).toMatchObject({ content: "answer from first" });
    expect(results[1]).toMatchObject({
      content: "",
      error: "Webhook error: HTTP 503",
    });
    expect(results[2]).toMatchObject({ content: "answer from third" });
  });
});
