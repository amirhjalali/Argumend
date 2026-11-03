import { describe, expect, it } from "vitest";
import type { Metadata } from "next";
import { META_DESCRIPTION_MAX } from "@/lib/seoText";

/**
 * Every static `metadata` export under app/ keeps its descriptions within
 * what a search result shows. Generated descriptions (topic pages, blog
 * posts, guides) go through fitMetaDescription and are tested with it.
 */
const modules = import.meta.glob<{ metadata?: Metadata }>([
  "/app/**/page.tsx",
  "/app/**/layout.tsx",
  "!/app/api/**",
  // Can't load outside Next (next/font/local; next-auth's next/server
  // import). The root layout's description is SITE_DESCRIPTION plus a count,
  // well under the limit; sign-in and the dashboard are not indexed.
  "!/app/layout.tsx",
  "!/app/auth/**",
  "!/app/dashboard/**",
]);

describe("static meta descriptions", () => {
  it.each(Object.keys(modules))("%s fits in a search result", async (file) => {
    const { metadata } = await modules[file]();
    const descriptions = [
      metadata?.description,
      metadata?.openGraph?.description,
      metadata?.twitter?.description,
    ].filter((value): value is string => typeof value === "string");
    for (const description of descriptions) {
      expect(description.length, description).toBeLessThanOrEqual(META_DESCRIPTION_MAX);
    }
  });
});
