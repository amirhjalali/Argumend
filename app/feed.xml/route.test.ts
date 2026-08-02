import { describe, expect, it } from "vitest";
import { articleSummaries } from "@/data/blogIndex";
import { topicSummaries } from "@/data/topicIndex";
import { CONTENT_LAST_UPDATED } from "@/lib/site";
import { GET } from "./route";

describe("GET /feed.xml", () => {
  it("returns deterministic, cacheable RSS covering every public article and topic", async () => {
    const first = await GET();
    const firstBody = await first.text();
    const secondBody = await (await GET()).text();

    expect(first.status).toBe(200);
    expect(first.headers.get("content-type")).toContain(
      "application/rss+xml",
    );
    expect(first.headers.get("cache-control")).toContain("s-maxage=3600");
    expect(first.headers.get("cache-control")).toContain(
      "stale-while-revalidate=86400",
    );
    expect(firstBody).toBe(secondBody);
    expect((firstBody.match(/<item>/g) ?? []).length).toBe(
      articleSummaries.length + topicSummaries.length,
    );
    expect(firstBody).toContain(
      new Date(`${CONTENT_LAST_UPDATED}T00:00:00Z`).toUTCString(),
    );
  });

  it("does not mutate the shared article ordering while sorting feed items", async () => {
    const before = articleSummaries.map((article) => article.slug);
    await GET();
    expect(articleSummaries.map((article) => article.slug)).toEqual(before);
  });

  it("escapes XML-sensitive text and emits canonical permalink GUIDs", async () => {
    const body = await (await GET()).text();
    expect(body).not.toMatch(/<title>[^<]*&[^a-z#]/i);
    expect(body).toContain('<guid isPermaLink="true">https://argumend.org/');
    expect(body).toContain(
      '<atom:link href="https://argumend.org/feed.xml" rel="self" type="application/rss+xml"/>',
    );
  });
});
