import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { isClaims } from "@/data/is-claims";
import { topicSummaries } from "@/data/topicIndex";
import { getAllQuestionVariations, getPrimaryQuestionSlug } from "@/lib/questions";
import isToQuestions from "./isToQuestions.json";

const require = createRequire(import.meta.url);
const nextConfig = require("../../next.config.js") as {
  redirects: () => Promise<Array<{ source: string; destination: string; permanent: boolean }>>;
};

const variations = getAllQuestionVariations(topicSummaries);
const variationBySlug = new Map(variations.map((v) => [v.slug, v]));

describe("/is → /questions (the retired verdict pages)", () => {
  it("maps every is-claim to an existing question page for the same map", () => {
    const table = isToQuestions as Record<string, string>;
    expect(Object.keys(table).sort()).toEqual(isClaims.map((c) => c.slug).sort());
    for (const claim of isClaims) {
      const target = variationBySlug.get(table[claim.slug]);
      expect(target, `/is/${claim.slug} → /questions/${table[claim.slug]}`).toBeTruthy();
      expect(target!.topicId).toBe(claim.topicId);
      // Straight to the canonical page: no redirect-then-canonical hop.
      expect(target!.primary).toBe(true);
      expect(table[claim.slug]).toBe(getPrimaryQuestionSlug(claim.topicId));
    }
  });

  it("keeps the identical phrasings 1:1", () => {
    expect((isToQuestions as Record<string, string>)["nuclear-energy-safe"]).toBe(
      "is-nuclear-energy-safe",
    );
  });

  it("is wired into next.config.js as permanent redirects", async () => {
    const redirects = await nextConfig.redirects();
    for (const claim of isClaims) {
      expect(redirects).toContainEqual({
        source: `/is/${claim.slug}`,
        destination: `/questions/${(isToQuestions as Record<string, string>)[claim.slug]}`,
        permanent: true,
      });
    }
    expect(redirects).toContainEqual({ source: "/is", destination: "/questions", permanent: true });
  });

  it("leaves no /is page behind", () => {
    expect(existsSync(join(process.cwd(), "app", "is"))).toBe(false);
  });
});

describe("learn consolidation redirects", () => {
  const expected = [
    { source: "/concepts", destination: "/learn#ideas" },
    { source: "/guides", destination: "/learn#guides" },
    { source: "/library", destination: "/research#reading" },
    { source: "/lessons-from-the-deep", destination: "/blog" },
  ];

  it.each(expected)("sends $source to $destination, permanently", async ({ source, destination }) => {
    const redirects = await nextConfig.redirects();
    expect(redirects).toContainEqual({ source, destination, permanent: true });
  });

  it("points only at pages that exist", () => {
    for (const { destination } of [...expected, { destination: "/questions" }]) {
      const path = destination.split("#")[0].replace(/^\//, "");
      expect(existsSync(join(process.cwd(), "app", path, "page.tsx")), destination).toBe(true);
    }
  });

  it("never redirects a /questions phrasing: secondary phrasings render and set a canonical", async () => {
    const redirects = await nextConfig.redirects();
    expect(redirects.filter((r) => r.source.startsWith("/questions"))).toEqual([]);
  });

  it("keeps the guide and concept detail URLs (only the indexes move)", async () => {
    const redirects = await nextConfig.redirects();
    expect(redirects.filter((r) => /^\/(guides|concepts)\/.+/.test(r.source))).toEqual([]);
  });
});
