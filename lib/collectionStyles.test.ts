import { describe, expect, it } from "vitest";
import {
  COLLECTION_STAGGER_LIMIT,
  getCollectionItemPresentation,
} from "./collectionStyles";

describe("getCollectionItemPresentation", () => {
  it("staggers only the first collection items", () => {
    expect(getCollectionItemPresentation(0).animate).toBe(true);
    expect(
      getCollectionItemPresentation(COLLECTION_STAGGER_LIMIT - 1).style
        .animationDelay,
    ).toBe("550ms");

    const firstUnanimated = getCollectionItemPresentation(
      COLLECTION_STAGGER_LIMIT,
    );
    expect(firstUnanimated.animate).toBe(false);
    expect(firstUnanimated.style.animationDelay).toBeUndefined();
  });

  it("adds offscreen rendering containment with a configurable estimate", () => {
    expect(
      getCollectionItemPresentation(2, { intrinsicSize: "0 420px" }).style,
    ).toMatchObject({
      contentVisibility: "auto",
      containIntrinsicSize: "0 420px",
    });
  });
});
