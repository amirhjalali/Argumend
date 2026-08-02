import { describe, expect, it } from "vitest";
import { fallacies } from "@/data/fallacies";
import { generateMetadata, generateStaticParams } from "./page";

describe("fallacy detail metadata", () => {
  it("generates every fallacy route", () => {
    expect(generateStaticParams()).toHaveLength(fallacies.length);
  });

  it("keeps unknown fallacies out of search results", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "missing-fallacy" }),
    });

    expect(metadata.robots).toEqual({ index: false, follow: true });
  });
});
