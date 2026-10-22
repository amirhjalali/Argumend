import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { DebateStreamEventSchema } from "@/lib/debate/contracts";

const mocks = vi.hoisted(() => ({
  auth: vi.fn(), rateLimit: vi.fn(), programmatic: vi.fn(), getAnthropic: vi.fn(),
  getOpenAI: vi.fn(), getGemini: vi.fn(),
}));
vi.mock("@/lib/auth", () => ({ auth: mocks.auth }));
vi.mock("@/lib/rate-limit", () => ({ rateLimit: mocks.rateLimit }));
vi.mock("@/lib/debate/programmatic", () => ({
  generateProgrammaticDebateTurn: mocks.programmatic,
  chunkForSse: () => ["Offline replacement"],
}));
vi.mock("@/lib/debate/shared", () => ({
  getAnthropic: mocks.getAnthropic, getOpenAI: mocks.getOpenAI, getGemini: mocks.getGemini,
  isLiveDebateEnabled: () => true, buildSystemPrompt: () => "system", buildUserPrompt: () => "user",
}));
import { POST } from "./route";

function request(model: string, signal?: AbortSignal) {
  return new NextRequest("http://localhost/api/debate/stream", {
    method: "POST", headers: { "content-type": "application/json" }, signal,
    body: JSON.stringify({ topic: "A claim", topicId: "a-claim", side: "for", model, round: 1, previousMessages: [] }),
  });
}

function eventsFrom(text: string) {
  return text.split("\n\n").filter(Boolean).map((line) => DebateStreamEventSchema.parse(JSON.parse(line.slice(6))));
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("AUTH_SECRET", "test-auth-secret");
  vi.stubEnv("XAI_API_KEY", "test-xai-key");
  mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
  mocks.rateLimit.mockReturnValue({ success: true });
  mocks.programmatic.mockReturnValue("Offline replacement");
  vi.spyOn(console, "warn").mockImplementation(() => undefined);
  vi.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("live debate stream cancellation", () => {
  it.each(["claude", "gpt-4", "gpt-5", "gemini", "grok"])("passes request and reader cancellation to %s", async (model) => {
    for (const cancellation of ["request", "reader"] as const) {
      let release!: () => void;
      const pending = new Promise<void>((resolve) => { release = resolve; });
      let providerSignal: AbortSignal | undefined;
      let generatorClosed = false;
      const bind = (options?: { signal?: AbortSignal }) => {
        providerSignal = options?.signal;
        providerSignal?.addEventListener("abort", release, { once: true });
      };
      const chunks = (chunk: unknown) => (async function* () {
        try { yield chunk; await pending; } finally { generatorClosed = true; }
      })();
      if (model === "claude") {
        mocks.getAnthropic.mockResolvedValue({ messages: { stream: (_body: unknown, options: { signal?: AbortSignal }) => {
          bind(options);
          return chunks({ type: "content_block_delta", delta: { type: "text_delta", text: "First" } });
        } } });
      } else if (model === "gemini") {
        mocks.getGemini.mockResolvedValue({ getGenerativeModel: () => ({ generateContentStream: async (_prompt: unknown, options: { signal?: AbortSignal }) => {
          bind(options);
          const response = new Promise((_resolve, reject) => providerSignal?.addEventListener("abort", () => reject(new Error("SDK aggregate stream aborted")), { once: true }));
          return { stream: chunks({ text: () => "First" }), response };
        } }) });
      } else if (model === "grok") {
        const upstream = new ReadableStream({
          start(controller) { controller.enqueue(new TextEncoder().encode('data: {"choices":[{"delta":{"content":"First"}}]}\n\n')); },
          cancel() { generatorClosed = true; release(); },
        });
        vi.stubGlobal("fetch", vi.fn(async (_url: unknown, options: { signal?: AbortSignal }) => {
          bind(options);
          return new Response(upstream);
        }));
      } else {
        mocks.getOpenAI.mockResolvedValue({ chat: { completions: { create: async (_body: unknown, options: { signal?: AbortSignal }) => {
          bind(options);
          return chunks({ choices: [{ delta: { content: "First" } }] });
        } } } });
      }
      const controller = new AbortController();
      const response = await POST(request(model, controller.signal));
      const reader = response.body!.getReader();
      expect(new TextDecoder().decode((await reader.read()).value)).toContain("First");
      try {
        if (cancellation === "request") controller.abort();
        else await reader.cancel();
        expect(providerSignal?.aborted).toBe(true);
        await vi.waitFor(() => expect(generatorClosed).toBe(true));
        if (cancellation === "request") expect((await reader.read()).done).toBe(true);
        expect(mocks.programmatic).not.toHaveBeenCalled();
        expect(console.warn).not.toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
      } finally {
        controller.abort();
        release();
        if (cancellation === "request") await reader.read();
      }
    }
  });

  it.each(["request", "reader"] as const)("does not dispatch after %s cancellation while a provider client is loading", async (cancellation) => {
    let finish!: (client: unknown) => void;
    mocks.getOpenAI.mockImplementationOnce(() => new Promise((resolve) => { finish = resolve; }));
    const create = vi.fn().mockResolvedValue((async function* () {})());
    const controller = new AbortController();
    const response = await POST(request("gpt-4", controller.signal));
    const reader = response.body!.getReader();
    if (cancellation === "request") {
      controller.abort();
      expect((await reader.read()).done).toBe(true);
    } else {
      await reader.cancel();
    }
    finish({ chat: { completions: { create } } });
    await Promise.resolve();
    expect(create).not.toHaveBeenCalled();
    expect(mocks.programmatic).not.toHaveBeenCalled();
  });
});

describe("Grok SSE boundary", () => {
  function grokResponse(...chunks: string[]) {
    const cancel = vi.fn();
    const upstream = new ReadableStream({
      start(controller) {
        for (const chunk of chunks) controller.enqueue(new TextEncoder().encode(chunk));
        controller.close();
      }, cancel,
    });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(upstream)));
    return cancel;
  }

  it("retains the final data record when the provider closes without a trailing newline", async () => {
    grokResponse('data: {"choices":[{"delta":{"content":"First "}}]}\n\n', 'data: {"choices":[{"delta":{"content":"last"}}]}');
    const events = eventsFrom(await (await POST(request("grok"))).text());
    expect(events.filter((event) => event.type === "token")).toEqual([
      { type: "token", token: "First " }, { type: "token", token: "last" },
    ]);
    expect(events.at(-1)).toMatchObject({ type: "complete", execution: { actual: "live" } });
  });

  it.each(["\n", "\r\n", "\r"])("accepts SSE data fields and multiline JSON with %j line endings", async (ending) => {
    grokResponse(`: ping${ending}data:{"choices":${ending}data: [{"delta":{"content":"Grok token"}}]}${ending}${ending}data:[DONE]${ending}${ending}`);
    const events = eventsFrom(await (await POST(request("grok"))).text());
    expect(events[0]).toEqual({ type: "token", token: "Grok token" });
    expect(events.at(-1)).toMatchObject({ type: "complete", execution: { actual: "live" } });
  });

  it("keeps CRLF and UTF-8 characters intact across transport boundaries", async () => {
    const encoder = new TextEncoder();
    const bytes = encoder.encode('data: {"choices":[{"delta":{"content":"Grok 🧭 token"}}]}\r\n\r\ndata: [DONE]\r\n\r\n');
    const cr = bytes.indexOf(13);
    const emoji = bytes.indexOf(240);
    const upstream = new ReadableStream({ start(controller) {
      controller.enqueue(bytes.slice(0, emoji + 1));
      controller.enqueue(bytes.slice(emoji + 1, cr + 1));
      controller.enqueue(bytes.slice(cr + 1));
      controller.close();
    } });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(upstream)));
    const events = eventsFrom(await (await POST(request("grok"))).text());
    expect(events[0]).toEqual({ type: "token", token: "Grok 🧭 token" });
    expect(events.at(-1)).toMatchObject({ type: "complete", execution: { actual: "live" } });
  });

  it("accepts role, null-content, finish, and usage frames around text", async () => {
    grokResponse([
      { choices: [{ delta: { role: "assistant", content: null } }] },
      { choices: [{ delta: { content: "Complete" } }] },
      { choices: [{ delta: {}, finish_reason: "stop" }] },
      { choices: [], usage: { completion_tokens: 1 } },
    ].map((chunk) => `data: ${JSON.stringify(chunk)}\n\n`).join("") + "data: [DONE]\n\n");
    const events = eventsFrom(await (await POST(request("grok"))).text());
    expect(events.filter((event) => event.type === "token")).toEqual([{ type: "token", token: "Complete" }]);
    expect(events.at(-1)).toMatchObject({ type: "complete", execution: { actual: "live" } });
  });

  it("treats an SSE error event as a provider failure", async () => {
    grokResponse('data: {"choices":[{"delta":{"content":"Partial"}}]}\n\nevent: error\ndata: {"choices":[]}\n\n');
    const events = eventsFrom(await (await POST(request("grok"))).text());
    expect(events).toContainEqual({ type: "replace" });
    expect(events.at(-1)).toMatchObject({ type: "complete", execution: { actual: "programmatic" } });
  });

  it.each(['{bad}', 'null', '{"error":{"message":"private provider diagnostic"}}', '{"choices":[{"delta":{"content":7}}]}'])("replaces partial output after a malformed provider event: %s", async (payload) => {
    grokResponse(`data: {"choices":[{"delta":{"content":"Partial"}}]}\n\ndata: ${payload}\n\ndata: [DONE]\n\n`);
    const text = await (await POST(request("grok"))).text();
    const events = eventsFrom(text);
    expect(events).toContainEqual({ type: "replace" });
    expect(events.at(-1)).toMatchObject({ type: "complete", execution: { actual: "programmatic", fallbackCode: "PROVIDER_ERROR" } });
    expect(text).not.toContain("private provider diagnostic");
  });

  it("cancels and unlocks the upstream body after DONE", async () => {
    const cancel = vi.fn();
    const upstream = new ReadableStream({
      start(controller) { controller.enqueue(new TextEncoder().encode('data: {"choices":[{"delta":{"content":"Complete"}}]}\n\ndata: [DONE]\n\n')); },
      cancel,
    });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(upstream)));
    const events = eventsFrom(await (await POST(request("grok"))).text());
    expect(events.at(-1)).toMatchObject({ type: "complete", execution: { actual: "live" } });
    expect(cancel).toHaveBeenCalledOnce();
    expect(upstream.locked).toBe(false);
  });
});
