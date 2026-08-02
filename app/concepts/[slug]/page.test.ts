import { describe, expect, it } from "vitest";
import { generateMetadata, generateStaticParams } from "./page";

describe("concept detail metadata", () => {
  it("generates every concept route", () => {
    expect(generateStaticParams()).toHaveLength(6);
  });

  it("keeps unknown concepts out of search results", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "missing-concept" }),
    });

    expect(metadata.robots).toEqual({ index: false, follow: true });
  });

  it("uses a typographic separator in page and social titles", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "steel-manning" }),
    });

    expect(metadata.title).toBe("Steel-Manning — Key Concept");
    expect(metadata.openGraph?.title).toBe("Steel-Manning — Key Concept");
  });
});
