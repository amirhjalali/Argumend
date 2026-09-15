import { describe, expect, it } from "vitest";
import {
  REPORT_SLUG_LENGTH,
  isReportSlug,
} from "./reportSlug";
import { createReportSlug } from "./publication";

describe("report slugs", () => {
  it("generates slugs that pass the shape check the proxy relies on", () => {
    for (let i = 0; i < 200; i += 1) {
      const slug = createReportSlug();
      expect(slug).toHaveLength(REPORT_SLUG_LENGTH);
      expect(isReportSlug(slug)).toBe(true);
    }
  });

  it.each(["", "nonexistent", "any-slug", "AbC123_-xYz9x", "AbC123_-xYz+", "AbC123/-xYz9"])(
    "rejects malformed slug %j",
    (slug) => {
      expect(isReportSlug(slug)).toBe(false);
    },
  );
});
