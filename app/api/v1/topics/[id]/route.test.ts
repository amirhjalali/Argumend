import { describe, it, expect } from "vitest";
import { topicSummaries } from "@/data/topicIndex";
import { SITE_URL } from "@/app/api/v1/_shared/http";
import { GET, OPTIONS } from "./route";

// The detail handler takes `(request, { params })` where params is a Promise
// (Next.js 15+ async params). We pass a plain Request for the unused first arg
// and a resolved Promise for the route param. A real id is pulled from the
// static index so the test tracks the dataset rather than a hardcoded slug.

const realId = topicSummaries[0].id;

/** Invoke the detail handler with the given route id. */
function detailRequest(id: string) {
  return GET(new Request(`http://localhost/api/v1/topics/${id}`), {
    params: Promise.resolve({ id }),
  });
}

describe("GET /api/v1/topics/[id]", () => {
  it("returns 200 with the full topic for a real id", async () => {
    const res = await detailRequest(realId);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.topic).toBeDefined();
    expect(body.topic.id).toBe(realId);
    // Full object carries analysis fields the list summary omits.
    expect(Array.isArray(body.topic.pillars)).toBe(true);
    // Canonical absolute url is appended.
    expect(body.topic.url).toBe(`${SITE_URL}/topics/${realId}`);
  });

  it("returns a 404 JSON error for an unknown id", async () => {
    const res = await detailRequest("definitely-not-a-real-topic-id");
    expect(res.status).toBe(404);

    const body = await res.json();
    expect(body.error).toEqual(expect.any(String));
    expect(body.error).toContain("definitely-not-a-real-topic-id");
  });

  it("includes CORS headers on both success and 404 responses", async () => {
    const ok = await detailRequest(realId);
    expect(ok.headers.get("Access-Control-Allow-Origin")).toBe("*");

    const missing = await detailRequest("nope-nope-nope");
    expect(missing.headers.get("Access-Control-Allow-Origin")).toBe("*");
  });
});

describe("OPTIONS /api/v1/topics/[id]", () => {
  it("answers the CORS preflight with 204 and CORS headers", async () => {
    const res = await OPTIONS();
    expect(res.status).toBe(204);
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(res.headers.get("Access-Control-Allow-Methods")).toContain("GET");
  });
});
