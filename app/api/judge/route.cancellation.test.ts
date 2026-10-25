import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const mocks = vi.hoisted(() => ({ auth: vi.fn(), council: vi.fn(), judgeContent: vi.fn(), judgeDebate: vi.fn(), save: vi.fn(), offline: vi.fn() }));
vi.mock("@/lib/auth", () => ({ auth: mocks.auth }));
vi.mock("@/lib/rate-limit", () => ({ rateLimit: () => ({ success: true }) }));
vi.mock("@/lib/judge/council", () => ({ createJudgeCouncil: mocks.council }));
vi.mock("@/lib/judge/offline", () => ({ judgeContentOffline: mocks.offline, judgeDebateOffline: mocks.offline }));
vi.mock("@/lib/db", () => ({ isDatabaseConfigured: () => true }));
vi.mock("@/lib/db/queries", () => ({ saveJudgment: mocks.save, isDebateOwnershipError: () => false }));
import { POST } from "./route";

const result = { verdicts: [], winner: null, hasConsensus: false, aggregatedScores: { for: { average: 0, byDimension: {} }, against: { average: 0, byDimension: {} } }, disagreements: [], flaggedForReview: true, timestamp: 1 };
const input = { type: "content", content: "A confidential internal debate." };
function request(body: unknown = input, signal?: AbortSignal) {
  return new NextRequest("http://localhost/api/judge", {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body), signal,
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("AUTH_SECRET", "test-auth-secret");
  vi.stubEnv("ENABLE_LIVE_JUDGING_API", "true");
  mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
  mocks.council.mockReturnValue({ judgeContent: mocks.judgeContent, judgeDebate: mocks.judgeDebate });
  mocks.judgeContent.mockResolvedValue(result);
  mocks.judgeDebate.mockResolvedValue(result);
  mocks.offline.mockReturnValue(result);
  mocks.save.mockResolvedValue({ id: "saved-1" });
  vi.spyOn(console, "warn").mockImplementation(() => undefined);
});
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

describe("judge cancellation before persistence", () => {
  it("refuses an already-aborted request before auth, judging, or persistence", async () => {
    const controller = new AbortController();
    controller.abort();
    const response = await POST(request(input, controller.signal));
    expect(response.status).toBe(499);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(mocks.auth).not.toHaveBeenCalled();
    expect(mocks.council).not.toHaveBeenCalled();
    expect(mocks.offline).not.toHaveBeenCalled();
    expect(mocks.save).not.toHaveBeenCalled();
  });

  it("does not dispatch judging after cancellation during authentication", async () => {
    let finish!: (session: unknown) => void;
    mocks.auth.mockImplementationOnce(() => new Promise((resolve) => { finish = resolve; }));
    const controller = new AbortController();
    const pending = POST(request(input, controller.signal));
    await vi.waitFor(() => expect(mocks.auth).toHaveBeenCalledOnce());
    controller.abort();
    finish({ user: { id: "user-1" } });
    expect((await pending).status).toBe(499);
    expect(mocks.council).not.toHaveBeenCalled();
    expect(mocks.save).not.toHaveBeenCalled();
  });

  it("returns cancellation when a request body finishes parsing after disconnect", async () => {
    const controller = new AbortController();
    const req = request(input, controller.signal);
    vi.spyOn(req, "json").mockImplementationOnce(async () => { controller.abort(); return {}; });
    expect((await POST(req)).status).toBe(499);
    expect(mocks.auth).not.toHaveBeenCalled();
    expect(mocks.save).not.toHaveBeenCalled();
  });

  it.each(["content", "debate"] as const)("forwards cancellation to live %s judging without fallback or persistence", async (type) => {
    let started!: (signal: AbortSignal) => void;
    const began = new Promise<AbortSignal>((resolve) => { started = resolve; });
    const method = type === "content" ? mocks.judgeContent : mocks.judgeDebate;
    method.mockImplementationOnce((_content, _context, { signal }: { signal: AbortSignal }) => {
      started(signal);
      return new Promise((_resolve, reject) => signal.addEventListener("abort", () => reject(new Error("SDK request aborted")), { once: true }));
    });
    const controller = new AbortController();
    const body = type === "content" ? input : { type, messages: [{ side: "for", content: "Private argument", round: 1 }] };
    const pending = POST(request(body, controller.signal));
    const signal = await began;
    controller.abort();
    expect(signal.aborted).toBe(true);
    expect((await pending).status).toBe(499);
    expect(mocks.offline).not.toHaveBeenCalled();
    expect(mocks.save).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
  });

  it("does not start persistence when live results arrive after cancellation", async () => {
    let finish!: (value: typeof result) => void;
    mocks.judgeContent.mockImplementationOnce(() => new Promise((resolve) => { finish = resolve; }));
    const controller = new AbortController();
    const pending = POST(request(input, controller.signal));
    await vi.waitFor(() => expect(mocks.judgeContent).toHaveBeenCalledOnce());
    expect(mocks.save).not.toHaveBeenCalled();
    controller.abort();
    finish(result);
    expect((await pending).status).toBe(499);
    expect(mocks.save).not.toHaveBeenCalled();
  });

  it("does not retry or claim to roll back persistence that began before cancellation", async () => {
    let finish!: (value: { id: string }) => void;
    mocks.save.mockImplementationOnce(() => new Promise((resolve) => { finish = resolve; }));
    const controller = new AbortController();
    const pending = POST(request(input, controller.signal));
    await vi.waitFor(() => expect(mocks.save).toHaveBeenCalledOnce());
    controller.abort();
    finish({ id: "committed-before-response" });
    expect((await pending).status).toBe(499);
    expect(mocks.save).toHaveBeenCalledOnce();
  });
});
