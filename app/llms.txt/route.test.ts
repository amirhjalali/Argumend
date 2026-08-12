import { describe, expect, it } from "vitest";
import { topicSummaries } from "@/data/topicIndex";
import { evidenceCitationStats } from "@/data/corpusStats";
import { argumentTopicIndex } from "@/lib/argument/topicIds";
import { ARGUMENT_TOPICS_LAST_UPDATED } from "@/lib/site";
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

  it("discovers every flagship map without inventing legacy scores", async () => {
    const body = await (await GET()).text();
    const flagshipSection = body.split("## Flagship debate maps")[1].split("\n## ")[0];

    for (const topic of argumentTopicIndex) {
      expect(flagshipSection).toContain(
        `[${topic.title}](https://argumend.org/topics/${topic.id})`,
      );
    }
    expect(flagshipSection).toContain("without reducing the debate");
    expect(flagshipSection).toContain(
      `Flagship maps last reviewed: ${ARGUMENT_TOPICS_LAST_UPDATED}.`,
    );
    expect(flagshipSection).not.toContain("balance:");
    expect(flagshipSection).not.toContain("verdict:");
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
