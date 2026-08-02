import { describe, expect, it } from "vitest";
import {
  generateMetadata,
  generateStaticParams,
} from "./page";
import { getTagsForSlug } from "./_config";

describe("blog tag routing", () => {
  it("emits each normalized tag slug exactly once", () => {
    const slugs = generateStaticParams().map(({ tag }) => tag);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("keeps all source tag variants that share a route", () => {
    expect(getTagsForSlug("ai")).toEqual(expect.arrayContaining(["AI", "ai"]));
    expect(getTagsForSlug("rent-control")).toEqual(
      expect.arrayContaining(["rent control", "rent-control"]),
    );
    expect(getTagsForSlug("us-debt-36-trillion")).toContain(
      "us debt $36 trillion",
    );
  });

  it("gives paginated tag pages their own canonical and navigation", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ tag: "critical-thinking" }),
      searchParams: Promise.resolve({ page: "2" }),
    });

    expect(metadata.alternates?.canonical).toBe(
      "https://argumend.org/blog/tag/critical-thinking?page=2",
    );
    expect(metadata.pagination?.previous).toBe(
      "https://argumend.org/blog/tag/critical-thinking",
    );
  });
});
