import { describe, expect, it } from "vitest";
import { generateMetadata, generateStaticParams } from "./page";
import { CATEGORY_PAGE_SIZE } from "./_config";

describe("blog category routing", () => {
  it("emits each category slug exactly once", () => {
    const slugs = generateStaticParams().map(({ category }) => category);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("marks unknown category metadata as non-indexable", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ category: "not-a-real-category" }),
    });

    expect(metadata.title).toBe("Category Not Found");
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });

  it("gives paginated category pages their own canonical and navigation", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ category: "logic-reasoning" }),
      searchParams: Promise.resolve({ page: "2" }),
    });

    expect(CATEGORY_PAGE_SIZE).toBeGreaterThan(0);
    expect(metadata.alternates?.canonical).toBe(
      "https://argumend.org/blog/category/logic-reasoning?page=2",
    );
    expect(metadata.pagination?.previous).toBe(
      "https://argumend.org/blog/category/logic-reasoning",
    );
  });
});
