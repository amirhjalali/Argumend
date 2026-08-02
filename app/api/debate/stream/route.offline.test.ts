import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import {
  DEBATE_GENERATION_ERROR_MESSAGE,
  DebateStreamEventSchema,
} from "@/lib/debate/contracts";

const mocks = vi.hoisted(() => ({
  auth: vi.fn(),
  rateLimit: vi.fn(),
  generateProgrammaticDebateTurn: vi.fn(),
  chunkForSse: vi.fn(),
  getAnthropic: vi.fn(),
  getOpenAI: vi.fn(),
  getGemini: vi.fn(),
  isLiveDebateEnabled: vi.fn(),
  buildSystemPrompt: vi.fn(),
  buildUserPrompt: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({ auth: mocks.auth }));
vi.mock("@/lib/rate-limit", () => ({ rateLimit: mocks.rateLimit }));
vi.mock("@/lib/debate/programmatic", () => ({
  generateProgrammaticDebateTurn: mocks.generateProgrammaticDebateTurn,
  chunkForSse: mocks.chunkForSse,
}));
vi.mock("@/lib/debate/shared", () => ({
  getAnthropic: mocks.getAnthropic,
  getOpenAI: mocks.getOpenAI,
  getGemini: mocks.getGemini,
  isLiveDebateEnabled: mocks.isLiveDebateEnabled,
  buildSystemPrompt: mocks.buildSystemPrompt,
  buildUserPrompt: mocks.buildUserPrompt,
}));

import { POST } from "./route";

const validBody = {
  topic: "Nuclear Energy",
  topicId: "nuclear-energy-safety",
  side: "against",
  model: "gpt-5",
  round: 2,
  previousMessages: [
    { side: "for", round: 1, content: "Firm power reduces fossil fallback." },
  ],
};

const request = (body: unknown, ip = "203.0.113.2", signal?: AbortSignal) =>
  new NextRequest("http://localhost/api/debate/stream", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
    signal,
  });

const eventsFrom = (text: string) =>
  text
    .split("\n\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("data: "))
    .map((line) => DebateStreamEventSchema.parse(JSON.parse(line.slice(6))));

describe("POST /api/debate/stream offline boundary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.rateLimit.mockReturnValue({
      success: true,
      remaining: 19,
      resetAt: Date.now() + 60_000,
    });
    mocks.isLiveDebateEnabled.mockReturnValue(false);
    mocks.auth.mockResolvedValue(null);
    process.env.AUTH_SECRET = "test-auth-secret";
    mocks.generateProgrammaticDebateTurn.mockReturnValue("Offline argument");
    mocks.chunkForSse.mockReturnValue(["Offline ", "argument"]);
    mocks.buildSystemPrompt.mockReturnValue("system");
    mocks.buildUserPrompt.mockReturnValue("user");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    delete process.env.XAI_API_KEY;
    delete process.env.GROK_API_KEY;
  });

  it("streams the validated programmatic response shape without loading auth or providers", async () => {
    const response = await POST(request(validBody));
    const events = eventsFrom(await response.text());

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toContain("text/event-stream");
    expect(response.headers.get("Cache-Control")).toBe("no-cache");
    expect(events).toEqual([
      { type: "token", token: "Offline " },
      { type: "token", token: "argument" },
      {
        type: "complete",
        execution: {
          requested: "programmatic",
          actual: "programmatic",
          requestedModel: "gpt-5",
          actualModel: null,
        },
      },
    ]);
    expect(mocks.generateProgrammaticDebateTurn).toHaveBeenCalledWith({
      topic: "Nuclear Energy",
      side: "against",
      round: 2,
      previousMessages: validBody.previousMessages,
      pillars: undefined,
    });
    expect(mocks.auth).not.toHaveBeenCalled();
    expect(mocks.getOpenAI).not.toHaveBeenCalled();
  });

  it("degrades an unavailable auth dependency to a complete programmatic stream", async () => {
    mocks.isLiveDebateEnabled.mockReturnValue(true);
    mocks.auth.mockRejectedValue(new Error("session database unavailable"));
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);

    const response = await POST(request(validBody));
    const events = eventsFrom(await response.text());

    expect(response.status).toBe(200);
    expect(events.at(-1)).toEqual({
      type: "complete",
      execution: {
        requested: "live",
        actual: "programmatic",
        requestedModel: "gpt-5",
        actualModel: null,
        fallbackCode: "AUTH_REQUIRED",
      },
    });
    expect(warn).toHaveBeenCalledWith(
      "Auth unavailable; using programmatic debate stream fallback",
    );
  });

  it("rejects a schema-invalid request before generating content", async () => {
    const response = await POST(request({ ...validBody, round: 0, model: "unknown" }));

    expect(response.status).toBe(400);
    expect(response.headers.get("Content-Type")).toContain("application/json");
    expect(await response.json()).toMatchObject({ error: "Invalid request" });
    expect(mocks.isLiveDebateEnabled).not.toHaveBeenCalled();
    expect(mocks.generateProgrammaticDebateTurn).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON with a stable code", async () => {
    const malformed = new NextRequest("http://localhost/api/debate/stream", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{not-json",
    });

    const response = await POST(malformed);

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Invalid JSON",
      code: "INVALID_JSON",
    });
  });

  it("enforces the request limit before parsing or invoking dependencies", async () => {
    vi.spyOn(Date, "now").mockReturnValue(1_000);
    mocks.rateLimit.mockReturnValue({
      success: false,
      remaining: 0,
      resetAt: 4_001,
    });

    const response = await POST(request(validBody));

    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("4");
    await expect(response.json()).resolves.toEqual({ error: "Rate limited" });
    expect(mocks.isLiveDebateEnabled).not.toHaveBeenCalled();
  });

  it("returns a stable setup error when configuration evaluation fails", async () => {
    mocks.isLiveDebateEnabled.mockImplementation(() => {
      throw new Error("bad environment state");
    });
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    const response = await POST(request(validBody));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Failed to set up debate stream",
      code: "DEBATE_STREAM_FAILED",
    });
  });

  it("emits a public error event when both live generation and the offline fallback fail", async () => {
    mocks.isLiveDebateEnabled.mockReturnValue(true);
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
    mocks.generateProgrammaticDebateTurn.mockImplementation(() => {
      throw new Error("private fallback failure");
    });
    mocks.getAnthropic.mockResolvedValue({
      messages: {
        stream: vi.fn(() =>
          (async function* () {
            throw new Error("private provider failure");
          })(),
        ),
      },
    });
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const error = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const claudeBody = { ...validBody, model: "claude" };

    const response = await POST(request(claudeBody));
    const text = await response.text();
    const events = eventsFrom(text);

    expect(events).toEqual([
      {
        type: "error",
        code: "DEBATE_GENERATION_FAILED",
        message: DEBATE_GENERATION_ERROR_MESSAGE,
      },
    ]);
    expect(text).not.toContain("private provider failure");
    expect(text).not.toContain("private fallback failure");
    expect(warn).toHaveBeenCalled();
    expect(error).toHaveBeenCalled();
  });

  it("replaces an empty live stream with a complete programmatic fallback", async () => {
    mocks.isLiveDebateEnabled.mockReturnValue(true);
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
    mocks.getOpenAI.mockResolvedValue({
      chat: {
        completions: {
          create: vi.fn().mockResolvedValue(
            (async function* () {
              // Provider returned a valid stream object but no content chunks.
            })(),
          ),
        },
      },
    });
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);

    const response = await POST(request(validBody));
    const events = eventsFrom(await response.text());

    expect(events[0]).toEqual({ type: "replace" });
    expect(events.at(-1)).toEqual({
      type: "complete",
      execution: {
        requested: "live",
        actual: "programmatic",
        requestedModel: "gpt-5",
        actualModel: null,
        fallbackCode: "PROVIDER_ERROR",
      },
    });
    expect(warn).toHaveBeenCalledWith(
      "Live debate stream failed; falling back to programmatic mode",
    );
  });

  it("completes a non-empty provider stream as live", async () => {
    mocks.isLiveDebateEnabled.mockReturnValue(true);
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
    mocks.getOpenAI.mockResolvedValue({
      chat: {
        completions: {
          create: vi.fn().mockResolvedValue(
            (async function* () {
              yield { choices: [{ delta: { content: "Live " } }] };
              yield { choices: [{ delta: { content: "argument" } }] };
            })(),
          ),
        },
      },
    });

    const response = await POST(request(validBody));
    const events = eventsFrom(await response.text());

    expect(events).toEqual([
      { type: "token", token: "Live " },
      { type: "token", token: "argument" },
      {
        type: "complete",
        execution: {
          requested: "live",
          actual: "live",
          requestedModel: "gpt-5",
          actualModel: "gpt-5",
        },
      },
    ]);
  });

  it("does not log streaming provider diagnostics or credentials", async () => {
    mocks.isLiveDebateEnabled.mockReturnValue(true);
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
    const databaseUrl = "postgres://admin:private-password@db.internal/app";
    const providerKey = "xai-1234567890abcdefghijklmnop";
    mocks.getAnthropic.mockResolvedValue({
      messages: {
        stream: vi.fn(() =>
          (async function* () {
            throw new Error(
              `provider failed at ${databaseUrl} Bearer ${providerKey}`,
            );
          })(),
        ),
      },
    });
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);

    const response = await POST(request({ ...validBody, model: "claude" }));
    const text = await response.text();
    const diagnostic = warn.mock.calls.flat().join(" ");

    expect(response.status).toBe(200);
    expect(eventsFrom(text).at(-1)).toMatchObject({
      type: "complete",
      execution: { actual: "programmatic", fallbackCode: "PROVIDER_ERROR" },
    });
    expect(diagnostic).toContain("Live debate stream failed");
    expect(diagnostic).not.toContain("provider failed");
    expect(diagnostic).not.toContain(databaseUrl);
    expect(diagnostic).not.toContain(providerKey);
    expect(text).not.toContain("private-password");
  });

  it("streams Claude text deltas and ignores unrelated events", async () => {
    mocks.isLiveDebateEnabled.mockReturnValue(true);
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
    mocks.getAnthropic.mockResolvedValue({
      messages: {
        stream: vi.fn(() => (async function* () {
          yield { type: "message_start" };
          yield { type: "content_block_delta", delta: { type: "input_json_delta" } };
          yield { type: "content_block_delta", delta: { type: "text_delta", text: "Claude token" } };
        })()),
      },
    });

    const response = await POST(request({ ...validBody, model: "claude" }));
    const events = eventsFrom(await response.text());

    expect(events).toEqual([
      { type: "token", token: "Claude token" },
      {
        type: "complete",
        execution: {
          requested: "live",
          actual: "live",
          requestedModel: "claude",
          actualModel: "claude",
        },
      },
    ]);
  });

  it("uses the GPT-4 provider model and skips malformed chunks", async () => {
    mocks.isLiveDebateEnabled.mockReturnValue(true);
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
    const create = vi.fn().mockResolvedValue((async function* () {
      yield {};
      yield { choices: [] };
      yield { choices: [{ delta: { content: "GPT-4 token" } }] };
    })());
    mocks.getOpenAI.mockResolvedValue({ chat: { completions: { create } } });

    const response = await POST(request({ ...validBody, model: "gpt-4" }));
    const events = eventsFrom(await response.text());

    expect(events[0]).toEqual({ type: "token", token: "GPT-4 token" });
    expect(events.at(-1)).toMatchObject({
      type: "complete",
      execution: { actual: "live", actualModel: "gpt-4" },
    });
    expect(create).toHaveBeenCalledWith(expect.objectContaining({
      model: "gpt-4o",
      stream: true,
    }));
  });

  it("streams Gemini text while ignoring empty chunks", async () => {
    mocks.isLiveDebateEnabled.mockReturnValue(true);
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
    const generateContentStream = vi.fn().mockResolvedValue({
      stream: (async function* () {
        yield { text: () => "" };
        yield { text: () => "Gemini token" };
      })(),
    });
    const getGenerativeModel = vi.fn().mockReturnValue({ generateContentStream });
    mocks.getGemini.mockResolvedValue({ getGenerativeModel });

    const response = await POST(request({ ...validBody, model: "gemini" }));
    const events = eventsFrom(await response.text());

    expect(events[0]).toEqual({ type: "token", token: "Gemini token" });
    expect(events.at(-1)).toMatchObject({
      type: "complete",
      execution: { actual: "live", actualModel: "gemini" },
    });
    expect(getGenerativeModel).toHaveBeenCalledWith({ model: "gemini-1.5-pro" });
    expect(generateContentStream).toHaveBeenCalledWith("system\n\n---\n\nuser");
  });

  it("parses split Grok SSE chunks and skips malformed lines", async () => {
    mocks.isLiveDebateEnabled.mockReturnValue(true);
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
    process.env.XAI_API_KEY = "xai-test-key";
    const encoder = new TextEncoder();
    const upstream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(
          'event: ping\ndata: {bad}\ndata: {"choices":[{"delta":{"cont',
        ));
        controller.enqueue(encoder.encode(
          'ent":"Grok token"}}]}\n\ndata: [DONE]\n',
        ));
        controller.close();
      },
    });
    const fetchMock = vi.fn().mockResolvedValue(new Response(upstream));
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(request({ ...validBody, model: "grok" }));
    const events = eventsFrom(await response.text());

    expect(events[0]).toEqual({ type: "token", token: "Grok token" });
    expect(events.at(-1)).toMatchObject({
      type: "complete",
      execution: { actual: "live", actualModel: "grok" },
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.x.ai/v1/chat/completions",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ Authorization: "Bearer xai-test-key" }),
      }),
    );
  });

  it("falls back without calling Grok when neither key alias exists", async () => {
    mocks.isLiveDebateEnabled.mockReturnValue(true);
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(request({ ...validBody, model: "grok" }));
    const events = eventsFrom(await response.text());

    expect(events[0]).toEqual({ type: "replace" });
    expect(events.at(-1)).toMatchObject({
      type: "complete",
      execution: { actual: "programmatic", fallbackCode: "PROVIDER_ERROR" },
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("falls back on a failed Grok response without reading or logging its body", async () => {
    mocks.isLiveDebateEnabled.mockReturnValue(true);
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
    process.env.GROK_API_KEY = "grok-test-key";
    const privateBody = "private upstream prompt and credential";
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(privateBody, { status: 502 }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);

    const response = await POST(request({ ...validBody, model: "grok" }));
    const text = await response.text();

    expect(eventsFrom(text).at(-1)).toMatchObject({
      type: "complete",
      execution: { actual: "programmatic", fallbackCode: "PROVIDER_ERROR" },
    });
    expect(text).not.toContain(privateBody);
    expect(JSON.stringify(warn.mock.calls)).not.toContain(privateBody);
  });

  it("returns a typed non-cacheable response for an already aborted request", async () => {
    mocks.isLiveDebateEnabled.mockReturnValue(true);
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
    const controller = new AbortController();
    controller.abort();

    const response = await POST(request(validBody, "aborted", controller.signal));

    expect(response.status).toBe(499);
    expect(response.headers.get("Content-Type")).toContain("application/json");
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    await expect(response.json()).resolves.toEqual({
      error: "Request cancelled",
      code: "REQUEST_ABORTED",
    });
    expect(mocks.getOpenAI).not.toHaveBeenCalled();
  });

  it("stops a live generator after the request is aborted", async () => {
    mocks.isLiveDebateEnabled.mockReturnValue(true);
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
    const controller = new AbortController();
    let release!: () => void;
    let generatorClosed = false;
    const pending = new Promise<void>((resolve) => { release = resolve; });
    mocks.getOpenAI.mockResolvedValue({
      chat: {
        completions: {
          create: vi.fn().mockResolvedValue((async function* () {
            try {
              yield { choices: [{ delta: { content: "First" } }] };
              await pending;
              yield { choices: [{ delta: { content: "private second token" } }] };
            } finally {
              generatorClosed = true;
            }
          })()),
        },
      },
    });

    const response = await POST(request(validBody, "abort-midstream", controller.signal));
    const reader = response.body!.getReader();
    const first = await reader.read();
    expect(new TextDecoder().decode(first.value)).toContain("First");
    controller.abort();
    release();
    const rest = await reader.read();

    expect(rest.done).toBe(true);
    expect(generatorClosed).toBe(true);
    expect(mocks.generateProgrammaticDebateTurn).not.toHaveBeenCalled();
  });
});
