import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { topicSummaries } from "@/data/topicIndex";
import { SITE_URL } from "@/app/api/v1/_shared/http";
import { GET, OPTIONS } from "./route";

// Exercises the public list endpoint by importing the handlers directly and
// invoking them with a constructed NextRequest. The handler reads
// `request.nextUrl.searchParams`, so we build the request from a fully
// qualified URL (NextRequest derives `.nextUrl` from it). Assertions favour
// relationships (filtered <= unfiltered, count <= limit) over hardcoded totals
// so they survive new topics being added to the static dataset.

/** Build a NextRequest for the list endpoint with an optional query string. */
function listRequest(query = ""): NextRequest {
  return new NextRequest(new URL(`http://localhost/api/v1/topics${query}`));
}

describe("GET /api/v1/topics", () => {
  it("returns 200 with the documented envelope and topic shape", async () => {
    const res = await GET(listRequest());
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toMatchObject({
      count: expect.any(Number),
      total: expect.any(Number),
      limit: expect.any(Number),
      offset: expect.any(Number),
      topics: expect.any(Array),
    });

    // Default page is capped at the 50-item default limit.
    expect(body.offset).toBe(0);
    expect(body.limit).toBe(50);
    expect(body.count).toBe(body.topics.length);
    expect(body.count).toBeLessThanOrEqual(body.limit);
    expect(body.total).toBe(topicSummaries.length);

    const topic = body.topics[0];
    expect(topic).toMatchObject({
      id: expect.any(String),
      title: expect.any(String),
      category: expect.any(String),
      status: expect.any(String),
      confidence_score: expect.any(Number),
    });
    // url is absolute and points back to the canonical topic page.
    expect(topic.url).toBe(`${SITE_URL}/topics/${topic.id}`);
    expect(topic.url.startsWith("https://")).toBe(true);
  });

  it("caps the page size with ?limit=2", async () => {
    const res = await GET(listRequest("?limit=2"));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.limit).toBe(2);
    expect(body.count).toBeLessThanOrEqual(2);
    expect(body.topics.length).toBeLessThanOrEqual(2);
    // The full collection has > 2 topics, so a capped page fills exactly.
    expect(body.count).toBe(2);
    expect(body.total).toBe(topicSummaries.length);
  });

  it("narrows results with ?category=science", async () => {
    const unfiltered = await (await GET(listRequest())).json();
    const res = await GET(listRequest("?category=science&limit=100"));
    expect(res.status).toBe(200);

    const body = await res.json();
    // A category filter can only shrink the matching set.
    expect(body.total).toBeLessThanOrEqual(unfiltered.total);
    expect(body.total).toBeLessThan(unfiltered.total);
    expect(body.total).toBeGreaterThan(0);
    // Every returned topic actually belongs to the requested category.
    for (const t of body.topics) {
      expect(t.category).toBe("science");
    }
  });

  it("rejects an unknown ?category with a 400 JSON error", async () => {
    const res = await GET(listRequest("?category=nonsense"));
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error).toEqual(expect.any(String));
    expect(body.error).toContain("nonsense");
  });

  it("rejects an unknown ?status with a 400 JSON error", async () => {
    const res = await GET(listRequest("?status=bogus"));
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error).toEqual(expect.any(String));
    expect(body.error).toContain("bogus");
  });

  it("narrows results with a valid ?status filter", async () => {
    const unfiltered = await (await GET(listRequest())).json();
    const res = await GET(listRequest("?status=settled&limit=100"));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.total).toBeLessThanOrEqual(unfiltered.total);
    for (const t of body.topics) {
      expect(t.status).toBe("settled");
    }
  });

  it("paginates with ?offset", async () => {
    const firstPage = await (await GET(listRequest("?limit=1&offset=0"))).json();
    const secondPage = await (
      await GET(listRequest("?limit=1&offset=1"))
    ).json();

    expect(firstPage.offset).toBe(0);
    expect(secondPage.offset).toBe(1);
    // Distinct windows over an ordered collection return distinct items.
    expect(firstPage.topics[0].id).not.toBe(secondPage.topics[0].id);

    // An offset past the end yields an empty page but the real total.
    const beyond = await (
      await GET(listRequest(`?offset=${topicSummaries.length + 10}`))
    ).json();
    expect(beyond.count).toBe(0);
    expect(beyond.topics).toEqual([]);
    expect(beyond.total).toBe(topicSummaries.length);
  });

  it("includes permissive CORS headers on list responses", async () => {
    const res = await GET(listRequest());
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
  });
});

describe("OPTIONS /api/v1/topics", () => {
  it("answers the CORS preflight with 204 and CORS headers", async () => {
    const res = await OPTIONS();
    expect(res.status).toBe(204);
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(res.headers.get("Access-Control-Allow-Methods")).toContain("GET");
  });
});
