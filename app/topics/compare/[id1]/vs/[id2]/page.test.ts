import { describe, expect, it } from "vitest";
import { argumentTopicIds } from "@/lib/argument/topicIds";
import { COMPARISON_PAIRS } from "@/app/topics/compare/comparisonPairs";
import ComparisonPage, { generateMetadata } from "./page";

describe("comparison metadata", () => {
  it("keeps self-comparisons out of search results", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({
        id1: "climate-change",
        id2: "climate-change",
      }),
    });

    expect(metadata.title).toBe("Comparison Not Found");
    expect(metadata.robots).toEqual({ index: false, follow: true });
  });

  it("uses a generic social card containing both topic titles", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({
        id1: "climate-change",
        id2: "nuclear-energy-safety",
      }),
    });
    const images = metadata.twitter?.images;
    const image = Array.isArray(images) ? images[0] : images;
    const imageUrl = new URL(typeof image === "string" ? image : String(image));

    expect(imageUrl.origin + imageUrl.pathname).toBe("https://argumend.org/api/og");
    expect(imageUrl.searchParams.get("title")).toBe(
      "Climate Change vs Nuclear Energy for Climate",
    );
    expect(imageUrl.searchParams.get("subtitle")).toBe(
      "Side-by-side evidence and argument comparison",
    );
  });
});

// Flagship ArgumentGraph topics are not comparable: this page scores evidence
// weight, balance, verdicts, and pillar cruxes, none of which exist for debate
// maps and none of which may be invented for them.
describe("comparison route and flagship debate maps", () => {
  it("never pre-renders a featured pair containing a flagship id", () => {
    const featuredIds = new Set(COMPARISON_PAIRS.flat());
    for (const id of argumentTopicIds) {
      expect(featuredIds.has(id)).toBe(false);
    }
  });

  it.each(argumentTopicIds)("serves a crawl-safe 404 for %s on either side", async (id) => {
    for (const [id1, id2] of [
      [id, "climate-change"],
      ["climate-change", id],
    ]) {
      await expect(
        ComparisonPage({ params: Promise.resolve({ id1, id2 }) }),
      ).rejects.toMatchObject({ digest: expect.stringContaining("404") });

      const metadata = await generateMetadata({
        params: Promise.resolve({ id1, id2 }),
      });
      expect(metadata.title).toBe("Comparison Not Found");
      expect(metadata.robots).toEqual({ index: false, follow: true });
    }
  });
});
