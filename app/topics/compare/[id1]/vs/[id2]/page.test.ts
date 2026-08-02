import { describe, expect, it } from "vitest";
import { generateMetadata } from "./page";

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
