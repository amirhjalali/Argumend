import { describe, expect, it } from "vitest";
import { generateMetadata, generateStaticParams } from "./page";
import { TOPIC_CATEGORY_PAGE_SIZE } from "./_config";

describe("topic category routing", () => {
  it("emits each category exactly once", () => {
    const slugs = generateStaticParams().map(({ slug }) => slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("marks unknown categories as non-indexable", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "not-a-category" }),
    });

    expect(metadata.robots).toEqual({ index: false, follow: false });
  });

  it("publishes distinct canonicals and navigation for paginated archives", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "policy" }),
      searchParams: Promise.resolve({ page: "2" }),
    });

    expect(TOPIC_CATEGORY_PAGE_SIZE).toBe(18);
    expect(metadata.alternates?.canonical).toBe(
      "https://argumend.org/topics/category/policy?page=2",
    );
    expect(metadata.pagination?.previous).toBe(
      "https://argumend.org/topics/category/policy",
    );
    expect(metadata.pagination?.next).toBe(
      "https://argumend.org/topics/category/policy?page=3",
    );
  });

  it("keeps impossible pages out of the index before the page returns 404", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "policy" }),
      searchParams: Promise.resolve({ page: "99" }),
    });

    expect(metadata.robots).toEqual({ index: false, follow: true });
  });
});
