import { describe, expect, it } from "vitest";
import { topicSummaries } from "@/data/topicIndex";
import { evidenceCitationStats } from "@/data/corpusStats";
import { GET } from "./route";

describe("GET /llms.txt", () => {
  it("returns a cacheable plain-text index with every public topic", async () => {
    const response = await GET();
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/plain");
    expect(response.headers.get("cache-control")).toContain("s-maxage=86400");
    for (const topic of topicSummaries) {
      expect(body).toContain(`https://argumend.org/topics/${topic.id}`);
    }
  });

  it("describes incomplete citation coverage without an all-sources claim", async () => {
    const body = await (await GET()).text();

    const { withUrl, total } = evidenceCitationStats;
    const pct = Math.round((withUrl / total) * 100);

    expect(body).toContain(
      `${pct}% of evidence items (${withUrl}/${total}) carry a direct source URL`,
    );
    expect(body).not.toContain("each item links to a primary source");
  });

  it("links every advertised machine-readable interface", async () => {
    const response = await GET();
    const body = await response.text();
    expect(body).toContain("https://argumend.org/api/v1");
    expect(body).toContain("https://argumend.org/feed.xml");
    expect(body).toContain("https://argumend.org/sitemap.xml");
    expect(response.headers.get("cache-control")).toContain(
      "stale-while-revalidate=86400",
    );
  });
});
