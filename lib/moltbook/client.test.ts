import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MoltbookClient, createMoltbookClient } from "./client";

const apiBase = "https://www.moltbook.com/api/v1";
const ok = (data: unknown) =>
  new Response(JSON.stringify({ success: true, data }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

describe("MoltbookClient HTTP boundary", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("creates no client when the integration key is absent", () => {
    delete process.env.MOLTBOOK_API_KEY;
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);

    expect(createMoltbookClient()).toBeNull();
    expect(warn).toHaveBeenCalledWith(
      "MOLTBOOK_API_KEY not set - Moltbook integration disabled",
    );
  });

  it("injects authentication while preserving caller headers and body", async () => {
    vi.stubEnv("MOLTBOOK_API_KEY", "secret-key");
    const fetchMock = vi.fn().mockResolvedValue(ok({ id: "post-1" }));
    vi.stubGlobal("fetch", fetchMock);
    const client = createMoltbookClient();

    expect(client).toBeInstanceOf(MoltbookClient);
    await client!.createPost({
      submolt: "debate",
      title: "A careful argument",
      content: "Evidence",
    });

    expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/posts`, {
      method: "POST",
      headers: {
        Authorization: "Bearer secret-key",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        submolt: "debate",
        title: "A careful argument",
        content: "Evidence",
      }),
    });
  });

  it("normalizes rate-limit responses without attempting to parse a body", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response("not-json", {
        status: 429,
        headers: { retry_after_minutes: "12" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const client = new MoltbookClient("key");

    await expect(client.getMyProfile()).resolves.toEqual({
      success: false,
      error: "Rate limited",
      hint: "Retry after 12 minutes",
    });
  });

  it("builds feed queries without serializing absent options", async () => {
    const fetchMock = vi.fn().mockResolvedValue(ok([]));
    vi.stubGlobal("fetch", fetchMock);
    const client = new MoltbookClient("key");

    await client.getFeed({ sort: "new", limit: 0, offset: 20 });

    expect(fetchMock).toHaveBeenCalledWith(
      `${apiBase}/feed?sort=new&limit=0&offset=20`,
      expect.any(Object),
    );
  });

  it("encodes user-controlled path and query segments", async () => {
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(ok([])));
    vi.stubGlobal("fetch", fetchMock);
    const client = new MoltbookClient("key");

    await client.getAgentProfile("agent/name + one");
    await client.subscribeToSubmolt("hard questions/ethics");
    await client.search("nuclear & climate?");

    expect(fetchMock.mock.calls.map(([url]) => url)).toEqual([
      `${apiBase}/agents/profile?name=agent%2Fname%20%2B%20one`,
      `${apiBase}/submolts/hard%20questions%2Fethics/subscribe`,
      `${apiBase}/search?q=nuclear%20%26%20climate%3F`,
    ]);
  });

  it("serializes optional comment parent state explicitly", async () => {
    const fetchMock = vi
      .fn()
      .mockImplementation(() => Promise.resolve(ok({ id: "comment-1" })));
    vi.stubGlobal("fetch", fetchMock);
    const client = new MoltbookClient("key");

    await client.createComment("post-1", "Top-level comment");
    await client.createComment("post-1", "Nested reply", "parent-1");

    expect(fetchMock.mock.calls.map(([, init]) => init?.body)).toEqual([
      JSON.stringify({ content: "Top-level comment" }),
      JSON.stringify({ content: "Nested reply", parent_id: "parent-1" }),
    ]);
  });

  it("propagates network and invalid-JSON failures to the orchestration layer", async () => {
    const client = new MoltbookClient("key");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValueOnce(new Error("network offline")));

    await expect(client.getSubmolts()).rejects.toThrow("network offline");

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("not json", { status: 502 })),
    );
    await expect(client.getSubmolts()).rejects.toThrow();
  });
});
