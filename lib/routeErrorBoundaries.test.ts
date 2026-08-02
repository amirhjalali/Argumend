import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

function findRouteErrorBoundaries(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = join(directory, entry.name);
    if (entry.isDirectory()) return findRouteErrorBoundaries(absolute);
    return entry.name === "error.tsx"
      ? [relative(process.cwd(), absolute)]
      : [];
  });
}

const allRouteErrors = findRouteErrorBoundaries(join(process.cwd(), "app")).sort();

const migratedCopy = {
  "app/about/error.tsx": ["The about page could not be loaded."],
  "app/analyses/error.tsx": ["Recent analyses could not be loaded.", 'backHref="/analyze"', 'backLabel="Run an Analysis"'],
  "app/blog/[slug]/error.tsx": ["This article could not be loaded.", 'backHref="/blog"', 'backLabel="Back to Blog"'],
  "app/blog/error.tsx": ["The blog could not be loaded."],
  "app/concepts/[slug]/error.tsx": ["This concept could not be loaded.", 'backHref="/concepts"', 'backLabel="Back to Concepts"'],
  "app/concepts/error.tsx": ["The concepts page could not be loaded."],
  "app/fallacies/error.tsx": ["This fallacies page could not be loaded."],
  "app/faq/error.tsx": ["The FAQ page could not be loaded."],
  "app/for-educators/error.tsx": ["The educators page could not be loaded."],
  "app/glossary/error.tsx": ["The glossary could not be loaded."],
  "app/guides/[id]/error.tsx": ["This guide could not be loaded.", 'backHref="/guides"', 'backLabel="Back to Guides"'],
  "app/guides/error.tsx": ["The guides could not be loaded."],
  "app/how-it-works/error.tsx": ["This page could not be loaded."],
  "app/lessons-from-the-deep/error.tsx": ["Lessons from the Deep could not be loaded."],
  "app/library/error.tsx": ["The library could not be loaded."],
  "app/methodology/error.tsx": ["The methodology page could not be loaded."],
  "app/perspectives/error.tsx": ["The perspectives page could not be loaded."],
  "app/questions/error.tsx": ["The questions page could not be loaded."],
  "app/research/error.tsx": ["The research page could not be loaded."],
  "app/topics/[id]/error.tsx": ["We could not load this topic.", 'backHref="/topics"', 'backLabel="Back to Topics"'],
  "app/topics/error.tsx": ["The topics page could not be loaded."],
} as const;

describe("route error boundary contract", () => {
  it("covers every App Router error boundary through RouteErrorState", () => {
    expect(allRouteErrors.length).toBeGreaterThanOrEqual(Object.keys(migratedCopy).length);
    for (const file of allRouteErrors) {
      const source = readFileSync(join(process.cwd(), file), "utf8");
      expect(source, `${file} must import the shared recovery UI`).toMatch(
        /import\s+\{\s*RouteErrorState\s*\}\s+from\s+["']@\/components\/RouteErrorState["']/,
      );
      expect(source, `${file} must delegate its rendered UI`).toContain("<RouteErrorState");
      expect(source, `${file} must never disclose an exception message`).not.toMatch(
        /\berror\s*(?:\?\.|\.)\s*message\b/,
      );
    }
  });

  it.each(Object.entries(migratedCopy))(
    "%s preserves its route-specific safe recovery copy",
    (file, fragments) => {
      const source = readFileSync(join(process.cwd(), file), "utf8");
      for (const fragment of fragments) expect(source).toContain(fragment);
    },
  );
});
