import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const mocks = vi.hoisted(() => ({
  auth: vi.fn(),
  loadTopicById: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({ auth: mocks.auth }));
vi.mock("@/data/topicLoader", () => ({ loadTopicById: mocks.loadTopicById }));

import { GET, POST } from "./route";

const agent = {
  name: "Pith",
  description: "A careful agent",
  claimed: true,
};

const post = {
  id: "post-1",
  title: "A structured debate",
  submolt: "argumend",
  author: agent,
  upvotes: 3,
  downvotes: 0,
  comment_count: 1,
  created_at: "2026-07-31T12:00:00Z",
};

const comment = {
  id: "comment-1",
  content: "An external argument",
  author: agent,
  upvotes: 1,
  downvotes: 0,
  created_at: "2026-07-31T12:05:00Z",
};

const topic = {
  id: "ai-risk",
  title: "AI Risk",
  meta_claim: "Advanced AI creates material risk.",
  balance: 55,
  weight: 70,
  status: "contested",
  verdict: { label: "Leans for" },
  pillars: [],
};

function getRequest(action: string): NextRequest {
  return new NextRequest(`http://localhost/api/moltbook?action=${action}`, {
    headers: { "x-forwarded-for": `test-${Math.random()}` },
  });
}

function postRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/moltbook", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": `test-${Math.random()}`,
    },
    body: JSON.stringify(body),
  });
}

function malformedPostRequest(): NextRequest {
  return new NextRequest("http://localhost/api/moltbook", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": `test-malformed-${Math.random()}`,
    },
    body: "{not-json",
  });
}

function upstreamResponse(body: unknown, status = 502): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

describe("Moltbook API public errors", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });
    mocks.loadTopicById.mockResolvedValue(null);
    process.env.AUTH_SECRET = "test-auth-secret";
    delete process.env.MOLTBOOK_API_KEY;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.MOLTBOOK_API_KEY;
    delete process.env.AUTH_SECRET;
  });

  it("does not name server credentials when the integration is disabled", async () => {
    const response = await GET(getRequest("status"));
    const text = await response.text();

    expect(response.status).toBe(503);
    expect(JSON.parse(text)).toMatchObject({
      success: false,
      code: "FEATURE_UNAVAILABLE",
      configured: false,
    });
    expect(text).not.toContain("API_KEY");
  });

  it.each([
    [
      "an upstream error payload",
      () => Promise.resolve(upstreamResponse({
        success: false,
        error: "postgres://admin:secret@internal-db/provider_tokens",
      })),
    ],
    ["a thrown network failure", () => Promise.reject(new Error("connect ECONNREFUSED internal-db:5432"))],
    [
      "a non-JSON upstream body",
      () => Promise.resolve(new Response("proxy leaked provider credentials", { status: 502 })),
    ],
  ])("returns a stable public response for %s", async (_label, fetchImplementation) => {
    process.env.MOLTBOOK_API_KEY = "server-secret";
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
    const warnLog = vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn(fetchImplementation));

    const response = await GET(getRequest("feed"));
    const text = await response.text();

    expect(response.status).toBe(502);
    expect(JSON.parse(text)).toEqual({
      success: false,
      error: "Moltbook is temporarily unavailable. Please try again later.",
      code: "UPSTREAM_UNAVAILABLE",
    });
    expect(text).not.toMatch(/postgres|secret|credential|ECONNREFUSED|internal-db/i);
    expect([...errorLog.mock.calls, ...warnLog.mock.calls].flat().join(" "))
      .not.toMatch(/postgres|secret|credential|ECONNREFUSED|internal-db/i);
  });

  it("sanitizes upstream errors from authenticated write requests", async () => {
    process.env.MOLTBOOK_API_KEY = "server-secret";
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(upstreamResponse({
      success: false,
      error: "provider account 1234 failed: private diagnostic",
    })));

    const response = await POST(postRequest({
      action: "post",
      submolt: "argumend",
      title: "A debate",
      content: "Two sides",
    }));
    const text = await response.text();

    expect(response.status).toBe(502);
    expect(JSON.parse(text)).toMatchObject({ code: "UPSTREAM_UNAVAILABLE" });
    expect(text).not.toMatch(/provider account|private diagnostic/i);
    expect(warn.mock.calls.flat().join(" ")).not.toMatch(
      /provider account|private diagnostic/i,
    );
  });

  it("does not report an upstream status error as a connected account", async () => {
    process.env.MOLTBOOK_API_KEY = "server-secret";
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(upstreamResponse({
      success: false,
      error: "private provider status diagnostic",
    })));

    const response = await GET(getRequest("status"));
    const text = await response.text();

    expect(response.status).toBe(502);
    expect(JSON.parse(text)).toMatchObject({
      success: false,
      connected: false,
      configured: true,
      code: "UPSTREAM_UNAVAILABLE",
    });
    expect(text).not.toContain("private provider status diagnostic");
    expect(warn.mock.calls.flat().join(" ")).not.toContain(
      "private provider status diagnostic",
    );
  });

  it("returns a safe JSON response when the session lookup fails", async () => {
    mocks.auth.mockRejectedValueOnce(
      new Error("postgres://admin:secret@internal-db/session_table"),
    );
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    const response = await POST(postRequest({
      action: "post",
      submolt: "argumend",
      title: "A debate",
    }));
    const text = await response.text();

    expect(response.status).toBe(503);
    expect(JSON.parse(text)).toMatchObject({ code: "AUTH_UNAVAILABLE" });
    expect(text).not.toMatch(/postgres|secret|internal-db|session_table/i);
    const diagnostic = error.mock.calls.flat().join(" ");
    expect(diagnostic).toContain("[redacted database URL]");
    expect(diagnostic).not.toMatch(/admin:secret|internal-db|session_table/i);
  });

  it("validates successful feed, status, and post payloads before returning them", async () => {
    process.env.MOLTBOOK_API_KEY = "server-secret";
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(upstreamResponse({ success: true, data: [post] }, 200))
      .mockResolvedValueOnce(upstreamResponse({ success: true, data: agent }, 200))
      .mockResolvedValueOnce(upstreamResponse({ success: true, data: post }, 200));
    vi.stubGlobal("fetch", fetchMock);

    const feed = await GET(getRequest("feed"));
    const status = await GET(getRequest("status"));
    const created = await POST(postRequest({
      action: "post",
      submolt: "argumend",
      title: "A debate",
    }));

    expect(await feed.json()).toEqual({ success: true, data: [post] });
    expect(await status.json()).toMatchObject({
      success: true,
      connected: true,
      profile: agent,
    });
    expect(await created.json()).toMatchObject({
      success: true,
      data: {
        id: "post-1",
        url: "https://moltbook.com/m/argumend/posts/post-1",
      },
    });
  });

  it.each([
    ["feed", { success: true, data: { private: "private feed body" } }],
    ["status", { success: true, data: "private profile body" }],
    ["feed", { success: "yes", data: [post] }],
  ])("rejects malformed successful %s payloads without logging their body", async (action, payload) => {
    process.env.MOLTBOOK_API_KEY = "server-secret";
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(upstreamResponse(payload, 200)),
    );

    const response = await GET(getRequest(action));
    const text = await response.text();
    const diagnostic = warn.mock.calls.flat().join(" ");

    expect(response.status).toBe(502);
    expect(JSON.parse(text)).toMatchObject({ code: "UPSTREAM_UNAVAILABLE" });
    expect(text).not.toMatch(/private feed body|private profile body/i);
    expect(diagnostic).not.toMatch(/private feed body|private profile body/i);
  });

  it("rejects malformed successful post data without constructing an undefined URL", async () => {
    process.env.MOLTBOOK_API_KEY = "server-secret";
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        upstreamResponse({
          success: true,
          data: { id: "", private: "private post body" },
        }, 200),
      ),
    );

    const response = await POST(postRequest({
      action: "post",
      submolt: "argumend",
      title: "A debate",
    }));
    const text = await response.text();

    expect(response.status).toBe(502);
    expect(JSON.parse(text)).toMatchObject({ code: "UPSTREAM_UNAVAILABLE" });
    expect(text).not.toContain("undefined");
    expect(warn.mock.calls.flat().join(" ")).not.toContain("private post body");
  });

  it("validates JSON and action shape before any upstream request", async () => {
    process.env.MOLTBOOK_API_KEY = "server-secret";
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const malformed = await POST(malformedPostRequest());
    const unknownAction = await POST(postRequest({
      action: "delete_everything",
      postId: "post-1",
    }));

    expect(malformed.status).toBe(400);
    await expect(malformed.json()).resolves.toEqual({
      success: false,
      error: "Invalid JSON in request body",
    });
    expect(unknownAction.status).toBe(400);
    await expect(unknownAction.json()).resolves.toMatchObject({
      success: false,
      error: "Invalid request",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects unauthenticated writes before configuration or upstream access", async () => {
    mocks.auth.mockResolvedValueOnce(null);
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(postRequest({
      action: "post",
      submolt: "argumend",
      title: "A debate",
    }));

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({ error: "Unauthorized" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns public discovery actions without Moltbook credentials", async () => {
    const agents = await GET(getRequest("agents"));
    const topics = await GET(getRequest("topics"));
    const unknown = await GET(getRequest("delete_everything"));

    expect(agents.status).toBe(200);
    expect((await agents.json()).data.length).toBeGreaterThan(0);
    expect(topics.status).toBe(200);
    expect((await topics.json()).data[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        balance: expect.any(Number),
        weight: expect.any(Number),
      }),
    );
    expect(unknown.status).toBe(400);
    await expect(unknown.json()).resolves.toMatchObject({
      success: false,
      error: expect.stringContaining("Unknown action"),
    });
  });

  it("returns a bounded cooldown for upstream feed rate limits", async () => {
    process.env.MOLTBOOK_API_KEY = "server-secret";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response("not-json", {
          status: 429,
          headers: { retry_after_minutes: "12" },
        }),
      ),
    );

    const response = await GET(getRequest("feed"));

    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Rate limited",
      cooldownMinutes: 12,
    });
  });

  it("executes each validated debate action with typed inputs", async () => {
    process.env.MOLTBOOK_API_KEY = "server-secret";
    mocks.loadTopicById.mockResolvedValue(topic);
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(upstreamResponse({ success: true, data: post }, 200))
      .mockResolvedValueOnce(upstreamResponse({ success: true, data: post }, 200))
      .mockResolvedValueOnce(upstreamResponse({ success: true, data: comment }, 200))
      .mockResolvedValueOnce(
        upstreamResponse({
          success: true,
          data: { ...post, comments: [comment] },
        }, 200),
      )
      .mockResolvedValueOnce(
        upstreamResponse({ success: true, data: comment }, 200),
      );
    vi.stubGlobal("fetch", fetchMock);

    const requests = [
      { action: "post_debate", topicId: "ai-risk" },
      { action: "post_invitation", topicId: "ai-risk", position: "against" },
      {
        action: "post_argument",
        postId: "post-1",
        round: 2,
        side: "for",
        agentName: "Pith",
        argument: "Evidence supports this position.",
      },
      { action: "fetch_responses", postId: "post-1" },
      {
        action: "invite_agent",
        agentName: "Rune",
        topicTitle: "AI Risk",
        postId: "post-1",
      },
    ];

    const responses = [];
    const bodies = [];
    for (const body of requests) {
      const response = await POST(postRequest(body));
      responses.push(response);
      bodies.push(await response.json());
    }

    expect(responses.every((response) => response.status === 200)).toBe(true);
    expect(bodies[0]).toMatchObject({ success: true, data: { postId: "post-1" } });
    expect(bodies[1]).toMatchObject({ success: true, data: { postId: "post-1" } });
    expect(bodies[2]).toEqual({ success: true, data: comment });
    expect(bodies[3]).toEqual({ success: true, data: [comment] });
    expect(bodies[4]).toEqual({ success: true });
  });

  it("returns 404 before posting topic actions for an unknown topic", async () => {
    process.env.MOLTBOOK_API_KEY = "server-secret";
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    for (const body of [
      { action: "post_debate", topicId: "missing" },
      { action: "post_invitation", topicId: "missing", position: "for" },
    ]) {
      const response = await POST(postRequest(body));
      expect(response.status).toBe(404);
      await expect(response.json()).resolves.toEqual({
        success: false,
        error: "Topic not found",
      });
    }
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
