import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const mocks = vi.hoisted(() => ({ auth: vi.fn(), getAnthropic: vi.fn(), getOpenAI: vi.fn(), getGemini: vi.fn(), programmatic: vi.fn() }));
vi.mock("@/lib/auth", () => ({ auth: mocks.auth }));
vi.mock("@/lib/rate-limit", () => ({ rateLimit: () => ({ success: true }) }));
vi.mock("@/lib/debate/programmatic", () => ({ generateProgrammaticDebateTurn: mocks.programmatic }));
vi.mock("@/lib/debate/shared", () => ({
  getAnthropic: mocks.getAnthropic, getOpenAI: mocks.getOpenAI, getGemini: mocks.getGemini,
  isLiveDebateEnabled: () => true, buildSystemPrompt: () => "system", buildUserPrompt: () => "user",
}));
import { POST } from "./route";

function request(model = "claude", signal?: AbortSignal) {
  return new NextRequest("http://localhost/api/debate", {
    method: "POST", headers: { "content-type": "application/json" }, signal,
    body: JSON.stringify({ topic: "A private claim", topicId: "private-claim", model, side: "for", round: 1, previousMessages: [] }),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("AUTH_SECRET", "test-auth-secret");
  vi.stubEnv("XAI_API_KEY", "test-xai-key");
  mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
  mocks.programmatic.mockReturnValue("Offline fallback");
  vi.spyOn(console, "warn").mockImplementation(() => undefined);
  vi.spyOn(console, "error").mockImplementation(() => undefined);
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe("nonstream debate cancellation", () => {
  it("refuses an already-aborted request before loading auth or a provider", async () => {
    const controller = new AbortController();
    controller.abort();
    const response = await POST(request("claude", controller.signal));
    expect(response.status).toBe(499);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(await response.json()).toEqual({ error: "Request cancelled", code: "REQUEST_ABORTED" });
    expect(mocks.auth).not.toHaveBeenCalled();
    expect(mocks.getAnthropic).not.toHaveBeenCalled();
  });

  it("does not dispatch after cancellation during authentication", async () => {
    let finish!: (session: unknown) => void;
    mocks.auth.mockImplementationOnce(() => new Promise((resolve) => { finish = resolve; }));
    const controller = new AbortController();
    const pending = POST(request("claude", controller.signal));
    await vi.waitFor(() => expect(mocks.auth).toHaveBeenCalledOnce());
    controller.abort();
    finish({ user: { id: "user-1" } });
    expect((await pending).status).toBe(499);
    expect(mocks.getAnthropic).not.toHaveBeenCalled();
    expect(mocks.programmatic).not.toHaveBeenCalled();
  });

  it("returns cancellation when a request body finishes parsing after disconnect", async () => {
    const controller = new AbortController();
    const req = request("claude", controller.signal);
    vi.spyOn(req, "json").mockImplementationOnce(async () => { controller.abort(); return {}; });
    expect((await POST(req)).status).toBe(499);
    expect(mocks.auth).not.toHaveBeenCalled();
  });

  it("does not dispatch after cancellation during SDK client loading", async () => {
    let finish!: (client: unknown) => void;
    const create = vi.fn();
    mocks.getAnthropic.mockImplementationOnce(() => new Promise((resolve) => { finish = resolve; }));
    const controller = new AbortController();
    const pending = POST(request("claude", controller.signal));
    await vi.waitFor(() => expect(mocks.getAnthropic).toHaveBeenCalledOnce());
    controller.abort();
    finish({ messages: { create } });
    expect((await pending).status).toBe(499);
    expect(create).not.toHaveBeenCalled();
    expect(mocks.programmatic).not.toHaveBeenCalled();
  });

  it.each(["claude", "gpt-4", "gpt-5", "gemini", "grok"])("cancels %s without generating a fallback", async (model) => {
    let started!: (signal: AbortSignal) => void;
    const providerStarted = new Promise<AbortSignal>((resolve) => { started = resolve; });
    const call = vi.fn((_body: unknown, options: { signal: AbortSignal }) => {
      started(options.signal);
      return new Promise((_resolve, reject) => options.signal.addEventListener("abort", () => reject(new Error("private provider abort diagnostic")), { once: true }));
    });
    mocks.getAnthropic.mockResolvedValue({ messages: { create: call } });
    mocks.getOpenAI.mockResolvedValue({ chat: { completions: { create: call } } });
    mocks.getGemini.mockResolvedValue({ getGenerativeModel: () => ({ generateContent: call }) });
    vi.stubGlobal("fetch", call);
    const controller = new AbortController();
    const pending = POST(request(model, controller.signal));
    const signal = await providerStarted;
    controller.abort();
    expect(signal.aborted).toBe(true);
    expect((await pending).status).toBe(499);
    expect(mocks.programmatic).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
  });

  it("rejects a late successful response after cancellation", async () => {
    let finish!: (value: unknown) => void;
    const create = vi.fn(() => new Promise((resolve) => { finish = resolve; }));
    mocks.getAnthropic.mockResolvedValue({ messages: { create } });
    const controller = new AbortController();
    const pending = POST(request("claude", controller.signal));
    await vi.waitFor(() => expect(create).toHaveBeenCalledOnce());
    controller.abort();
    finish({ content: [{ type: "text", text: "Late private output" }] });
    const response = await pending;
    expect(response.status).toBe(499);
    expect(JSON.stringify(await response.json())).not.toContain("Late private output");
    expect(mocks.programmatic).not.toHaveBeenCalled();
  });

  it("keeps provider errors that echo submitted private text out of logs", async () => {
    const privateText = "The confidential acquisition closes Friday.";
    mocks.getAnthropic.mockResolvedValue({ messages: { create: vi.fn().mockRejectedValue(new Error(`Prompt refused: ${privateText}`)) } });
    const response = await POST(request());
    expect(response.status).toBe(200);
    expect((await response.json()).execution.fallbackCode).toBe("PROVIDER_ERROR");
    expect(JSON.stringify(vi.mocked(console.warn).mock.calls)).not.toContain(privateText);
  });
});
