import { beforeEach, describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
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

describe("POST /api/debate", () => {
  beforeEach(() => {
    process.env.ENABLE_LIVE_DEBATE_API = "false";
    process.env.NEXT_PUBLIC_ENABLE_LIVE_DEBATE_API = "false";
  });

  it("generates a programmatic debate turn without auth", async () => {
    const res = await POST(postRequest("/api/debate", debateBody));

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(typeof body.argument).toBe("string");
    expect(body.argument).toContain("Nuclear Energy");
    expect(body.model).toBe("claude");
    expect(body.fallback).toBe(true);
  });
});

describe("POST /api/debate/stream", () => {
  beforeEach(() => {
    process.env.ENABLE_LIVE_DEBATE_API = "false";
    process.env.NEXT_PUBLIC_ENABLE_LIVE_DEBATE_API = "false";
  });

  it("streams a programmatic debate turn without auth", async () => {
    const res = await POST_STREAM(postRequest("/api/debate/stream", debateBody));

    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("text/event-stream");
    const text = await res.text();
    expect(text).toContain('"token"');
    expect(text).toContain('"done":true');
    expect(text).toContain('"fallback":true');
  });
});
