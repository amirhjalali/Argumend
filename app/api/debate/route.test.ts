import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { DebateStreamEventSchema, DebateTurnSuccessSchema } from "@/lib/debate/contracts";

const mocks = vi.hoisted(() => ({
  auth: vi.fn(),
  getAnthropic: vi.fn(),
  getOpenAI: vi.fn(),
  getGemini: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({ auth: mocks.auth }));
vi.mock("@/lib/debate/shared", async (importOriginal) => {
  const original = await importOriginal<typeof import("@/lib/debate/shared")>();
  return {
    ...original,
    getAnthropic: mocks.getAnthropic,
    getOpenAI: mocks.getOpenAI,
    getGemini: mocks.getGemini,
  };
});

import { POST } from "./route";
import { POST as POST_STREAM } from "./stream/route";

const debateBody = {
  topic: "Nuclear Energy",
  topicId: "nuclear-energy-safety",
  side: "for",
  model: "claude",
  round: 1,
  previousMessages: [],
};

function postRequest(path: string, body: unknown): NextRequest {
  return new NextRequest(new URL(`http://localhost${path}`), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": `test-${Math.random()}`,
    },
    body: JSON.stringify(body),
  });
}

function malformedRequest(path: string): NextRequest {
  return new NextRequest(new URL(`http://localhost${path}`), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": `test-malformed-${Math.random()}`,
    },
    body: "{not-json",
  });
}

function streamEvents(text: string) {
  return text
    .split("\n\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("data: "))
    .map((line) => DebateStreamEventSchema.parse(JSON.parse(line.slice(6))));
}

function failingClaudeClient(options?: { partialToken?: string }) {
  return {
    messages: {
      create: vi.fn().mockRejectedValue(new Error("secret provider credential failure")),
      stream: vi.fn(() => (async function* () {
        if (options?.partialToken) {
          yield {
            type: "content_block_delta",
            delta: { type: "text_delta", text: options.partialToken },
          };
        }
        throw new Error("secret provider credential failure");
      })()),
    },
  };
}

describe("POST /api/debate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getAnthropic.mockReset();
    mocks.getOpenAI.mockReset();
    mocks.getGemini.mockReset();
    mocks.auth.mockResolvedValue(null);
    process.env.AUTH_SECRET = "test-auth-secret";
    process.env.ENABLE_LIVE_DEBATE_API = "false";
    process.env.NEXT_PUBLIC_ENABLE_LIVE_DEBATE_API = "false";
    delete process.env.XAI_API_KEY;
    delete process.env.GROK_API_KEY;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    delete process.env.XAI_API_KEY;
    delete process.env.GROK_API_KEY;
    delete process.env.AUTH_SECRET;
  });

  it("generates a programmatic debate turn without auth", async () => {
    const res = await POST(postRequest("/api/debate", debateBody));

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(typeof body.argument).toBe("string");
    expect(body.argument).toContain("Nuclear Energy");
    expect(() => DebateTurnSuccessSchema.parse(body)).not.toThrow();
    expect(body.execution).toEqual({
      requested: "programmatic",
      actual: "programmatic",
      requestedModel: "claude",
      actualModel: null,
    });
    expect(body).not.toHaveProperty("model");
    expect(body).not.toHaveProperty("fallback");
    expect(body).not.toHaveProperty("error");
  });

  it("accepts every selectable model in programmatic mode", async () => {
    const res = await POST(postRequest("/api/debate", { ...debateBody, model: "gpt-5" }));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.execution.requestedModel).toBe("gpt-5");
    expect(body.execution.actualModel).toBeNull();
  });

  it("represents an unauthenticated live request as a successful programmatic fallback", async () => {
    process.env.ENABLE_LIVE_DEBATE_API = "true";
    const res = await POST(postRequest("/api/debate", debateBody));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.execution).toEqual({
      requested: "live",
      actual: "programmatic",
      requestedModel: "claude",
      actualModel: null,
      fallbackCode: "AUTH_REQUIRED",
    });
    expect(JSON.stringify(body)).not.toContain("Authentication is required");
  });

  it("does not expose a provider failure when programmatic fallback succeeds", async () => {
    process.env.ENABLE_LIVE_DEBATE_API = "true";
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
    mocks.getAnthropic.mockResolvedValue(failingClaudeClient());

    const res = await POST(postRequest("/api/debate", debateBody));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.execution.fallbackCode).toBe("PROVIDER_ERROR");
    expect(body.execution.actual).toBe("programmatic");
    expect(body.execution.actualModel).toBeNull();
    expect(JSON.stringify(body)).not.toContain("secret provider credential failure");
  });

  it("accepts non-empty provider content as a live response", async () => {
    process.env.ENABLE_LIVE_DEBATE_API = "true";
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
    mocks.getAnthropic.mockResolvedValue({
      messages: {
        create: vi.fn().mockResolvedValue({
          content: [{ type: "text", text: "A sourced live argument." }],
        }),
      },
    });

    const res = await POST(postRequest("/api/debate", debateBody));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.argument).toBe("A sourced live argument.");
    expect(body.execution).toEqual({
      requested: "live",
      actual: "live",
      requestedModel: "claude",
      actualModel: "claude",
    });
  });

  it.each(["claude", "gpt-5", "gemini", "grok"] as const)(
    "falls back when %s returns a successful response without debate content",
    async (model) => {
      process.env.ENABLE_LIVE_DEBATE_API = "true";
      mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
      const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);

      if (model === "claude") {
        mocks.getAnthropic.mockResolvedValue({
          messages: { create: vi.fn().mockResolvedValue({ content: [] }) },
        });
      } else if (model === "gpt-5") {
        mocks.getOpenAI.mockResolvedValue({
          chat: { completions: { create: vi.fn().mockResolvedValue({ choices: [] }) } },
        });
      } else if (model === "gemini") {
        mocks.getGemini.mockResolvedValue({
          getGenerativeModel: () => ({
            generateContent: vi.fn().mockResolvedValue({
              response: { text: () => "   " },
            }),
          }),
        });
      } else {
        process.env.XAI_API_KEY = "xai-test-key";
        vi.stubGlobal(
          "fetch",
          vi.fn().mockResolvedValue(
            new Response(JSON.stringify({ choices: [] }), {
              status: 200,
              headers: { "content-type": "application/json" },
            }),
          ),
        );
      }

      const res = await POST(postRequest("/api/debate", { ...debateBody, model }));
      const body = await res.json();

      expect(res.status).toBe(200);
      expect(body.execution).toEqual({
        requested: "live",
        actual: "programmatic",
        requestedModel: model,
        actualModel: null,
        fallbackCode: "PROVIDER_ERROR",
      });
      expect(body.argument).toContain("Nuclear Energy");
      expect(warn).toHaveBeenCalled();
    },
  );

  it("redacts credentials from live-provider fallback diagnostics", async () => {
    process.env.ENABLE_LIVE_DEBATE_API = "true";
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
    const databaseUrl = "postgresql://admin:private-password@db.internal/app";
    const providerKey = "sk-proj-1234567890abcdefghijklmnop";
    mocks.getAnthropic.mockRejectedValue(
      new Error(`connect ${databaseUrl} Authorization: Bearer ${providerKey}`),
    );
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);

    const res = await POST(postRequest("/api/debate", debateBody));
    const body = await res.json();
    const diagnostic = warn.mock.calls.flat().join(" ");

    expect(res.status).toBe(200);
    expect(body.execution.fallbackCode).toBe("PROVIDER_ERROR");
    expect(diagnostic).toContain("[redacted database URL]");
    expect(diagnostic).not.toContain(databaseUrl);
    expect(diagnostic).not.toContain(providerKey);
    expect(JSON.stringify(body)).not.toContain("private-password");
  });

  it("does not log a Grok upstream error body that may echo private content", async () => {
    process.env.ENABLE_LIVE_DEBATE_API = "true";
    process.env.XAI_API_KEY = "xai-test-key";
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
    const privateUpstreamBody =
      "private debate excerpt: the confidential acquisition closes Friday";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(privateUpstreamBody, { status: 502 })),
    );
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);

    const res = await POST(
      postRequest("/api/debate", { ...debateBody, model: "grok" }),
    );
    const body = await res.json();
    const diagnostic = warn.mock.calls.flat().join(" ");

    expect(res.status).toBe(200);
    expect(body.execution.fallbackCode).toBe("PROVIDER_ERROR");
    expect(diagnostic).toContain("HTTP 502");
    expect(diagnostic).not.toContain(privateUpstreamBody);
    expect(JSON.stringify(body)).not.toContain(privateUpstreamBody);
  });

  it("returns a stable 400 response for malformed JSON", async () => {
    const res = await POST(malformedRequest("/api/debate"));

    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({
      error: "Invalid JSON",
      code: "INVALID_JSON",
    });
  });
});

describe("POST /api/debate/stream", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.auth.mockResolvedValue(null);
    process.env.AUTH_SECRET = "test-auth-secret";
    process.env.ENABLE_LIVE_DEBATE_API = "false";
    process.env.NEXT_PUBLIC_ENABLE_LIVE_DEBATE_API = "false";
  });

  it("streams a programmatic debate turn without auth", async () => {
    const res = await POST_STREAM(postRequest("/api/debate/stream", debateBody));

    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("text/event-stream");
    const events = streamEvents(await res.text());
    expect(events.some((event) => event.type === "token")).toBe(true);
    expect(events.at(-1)).toEqual({
      type: "complete",
      execution: {
        requested: "programmatic",
        actual: "programmatic",
        requestedModel: "claude",
        actualModel: null,
      },
    });
  });

  it("completes an auth fallback without emitting a failure event", async () => {
    process.env.ENABLE_LIVE_DEBATE_API = "true";
    const res = await POST_STREAM(postRequest("/api/debate/stream", debateBody));
    const text = await res.text();
    const events = streamEvents(text);

    expect(events.some((event) => event.type === "error")).toBe(false);
    expect(events.at(-1)).toEqual({
      type: "complete",
      execution: {
        requested: "live",
        actual: "programmatic",
        requestedModel: "claude",
        actualModel: null,
        fallbackCode: "AUTH_REQUIRED",
      },
    });
    expect(text).not.toContain("Authentication is required");
  });

  it("replaces partial provider output and hides internal errors on fallback", async () => {
    process.env.ENABLE_LIVE_DEBATE_API = "true";
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
    mocks.getAnthropic.mockResolvedValue(
      failingClaudeClient({ partialToken: "PRIVATE PARTIAL OUTPUT" })
    );

    const res = await POST_STREAM(postRequest("/api/debate/stream", debateBody));
    const text = await res.text();
    const events = streamEvents(text);
    const replaceIndex = events.findIndex((event) => event.type === "replace");

    expect(replaceIndex).toBeGreaterThan(0);
    expect(events.slice(replaceIndex + 1).some(
      (event) => event.type === "token" && event.token.includes("Nuclear")
    )).toBe(true);
    expect(events.at(-1)).toEqual({
      type: "complete",
      execution: {
        requested: "live",
        actual: "programmatic",
        requestedModel: "claude",
        actualModel: null,
        fallbackCode: "PROVIDER_ERROR",
      },
    });
    expect(text).not.toContain("secret provider credential failure");
  });

  it("returns a stable 400 response for malformed JSON", async () => {
    const res = await POST_STREAM(malformedRequest("/api/debate/stream"));

    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({
      error: "Invalid JSON",
      code: "INVALID_JSON",
    });
  });
});
