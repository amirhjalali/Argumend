import { describe, it, expect } from "vitest";
import { TOPIC_COUNT } from "@/data/topicIndex";
import { GET, OPTIONS } from "./route";

// The API index handler is fully static — it takes no arguments and returns a
// self-describing document. We assert the discovery contract (version,
// endpoints, topic_count) plus the shared CORS behaviour.

describe("GET /api/v1", () => {
  it("returns 200 with a self-describing index document", async () => {
    const res = await GET();
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.name).toEqual(expect.any(String));
    expect(body.version).toBe("1");
    expect(body.base_url).toContain("/api/v1");
    expect(body.topic_count).toBe(TOPIC_COUNT);

    // Endpoints are advertised for discovery.
    expect(Array.isArray(body.endpoints)).toBe(true);
    expect(body.endpoints.length).toBeGreaterThan(0);
    const paths = body.endpoints.map((e: { path: string }) => e.path);
    expect(paths).toContain("/api/v1/topics");
  });

  it("includes permissive CORS headers", async () => {
    const res = await GET();
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
  });
});

describe("OPTIONS /api/v1", () => {
  it("answers the CORS preflight with 204 and CORS headers", async () => {
    const res = await OPTIONS();
    expect(res.status).toBe(204);
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(res.headers.get("Access-Control-Allow-Methods")).toContain("GET");
  });
});
