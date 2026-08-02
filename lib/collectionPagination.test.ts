import { describe, expect, it } from "vitest";
import { buildPageHref, paginate, parsePageParam } from "./collectionPagination";

describe("collection pagination", () => {
  it("normalizes malformed page parameters to the first page", () => {
    expect(parsePageParam(undefined)).toBe(1);
    expect(parsePageParam("0")).toBe(1);
    expect(parsePageParam("2.5")).toBe(1);
    expect(parsePageParam("nope")).toBe(1);
    expect(parsePageParam(["3", "4"])).toBe(3);
  });

  it("returns a bounded slice and reports out-of-range requests", () => {
    const values = Array.from({ length: 25 }, (_, index) => index + 1);
    expect(paginate(values, 2, 10)).toMatchObject({
      items: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      page: 2,
      pageCount: 3,
      startIndex: 10,
      endIndex: 20,
      isOutOfRange: false,
    });
    expect(paginate(values, 4, 10)).toMatchObject({
      items: [],
      pageCount: 3,
      isOutOfRange: true,
    });
  });

  it("creates stable first/next URLs and preserves filters", () => {
    const filters = new URLSearchParams("category=science&sort=title-asc&page=9");
    expect(buildPageHref("/topics", 1, filters)).toBe(
      "/topics?category=science&sort=title-asc",
    );
    expect(buildPageHref("/topics", 3, filters)).toBe(
      "/topics?category=science&sort=title-asc&page=3",
    );
  });
});
