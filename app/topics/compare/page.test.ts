import { describe, expect, it } from "vitest";
import { metadata } from "./page";
import { COMPARE_INDEX_SOCIAL_IMAGE } from "./_config";

describe("comparison index metadata", () => {
  it("uses the implemented generic social card for Open Graph and Twitter", () => {
    const imageUrl = new URL(COMPARE_INDEX_SOCIAL_IMAGE);

    expect(imageUrl.origin + imageUrl.pathname).toBe("https://argumend.org/api/og");
    expect(imageUrl.searchParams.get("title")).toBe("Compare Topics Side by Side");
    expect(metadata.twitter?.images).toEqual([COMPARE_INDEX_SOCIAL_IMAGE]);
  });
});
