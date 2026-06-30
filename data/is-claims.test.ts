import { describe, it, expect } from "vitest";
import { isClaims } from "@/data/is-claims";
import { topics } from "@/data/topics";

describe("is-claims integrity", () => {
  it("has unique slugs", () => {
    const slugs = isClaims.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses URL-safe kebab-case slugs", () => {
    for (const c of isClaims) {
      expect(c.slug, `bad slug: ${c.slug}`).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("references a topicId that exists", () => {
    const ids = new Set(topics.map((t) => t.id));
    for (const c of isClaims) {
      expect(ids.has(c.topicId), `unknown topicId: ${c.topicId} (slug ${c.slug})`).toBe(true);
    }
  });

  it("has a non-empty question and claim for every entry", () => {
    for (const c of isClaims) {
      expect(c.question.trim().length, `empty question: ${c.slug}`).toBeGreaterThan(0);
      expect(c.claim.trim().length, `empty claim: ${c.slug}`).toBeGreaterThan(0);
    }
  });
});
