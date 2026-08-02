import { describe, expect, it } from "vitest";
import { generateMetadata } from "./page";
import { RELATED_TAG_LIMIT, TOPIC_TAG_PAGE_SIZE } from "./_config";

describe("topic tag metadata", () => {
  it("preserves acronyms in reader-facing tag labels", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "ai" }),
    });

    expect(metadata.title).toBe("Debates Tagged “AI” — Argumend");
    expect(metadata.description).toContain('tagged "AI"');
  });

  it("distinguishes tag pages from same-named category pages", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "policy" }),
    });

    expect(metadata.title).toBe("Debates Tagged “Policy” — Argumend");
    expect(metadata.title).not.toBe("Policy Debates — Argumend");
    expect(metadata.alternates?.canonical).toBe(
      "https://argumend.org/topics/tag/policy",
    );
  });

  it("publishes distinct canonicals and navigation for paginated tags", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "policy" }),
      searchParams: Promise.resolve({ page: "2" }),
    });

    expect(TOPIC_TAG_PAGE_SIZE).toBe(18);
    expect(RELATED_TAG_LIMIT).toBe(16);
    expect(metadata.alternates?.canonical).toBe(
      "https://argumend.org/topics/tag/policy?page=2",
    );
    expect(metadata.pagination?.previous).toBe(
      "https://argumend.org/topics/tag/policy",
    );
    expect(metadata.pagination?.next).toBe(
      "https://argumend.org/topics/tag/policy?page=3",
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
