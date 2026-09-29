import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Every page needs `<main id="main-content">` for the global skip link. The
 * shell renders it (components/AppShell.tsx), so a page provides it by
 * rendering inside AppShell, directly or through RouteNotFound.
 */
describe("global skip-link targets", () => {
  it("AppShell renders the main-content landmark", () => {
    const source = readFileSync(join(process.cwd(), "components/AppShell.tsx"), "utf8");
    expect(source).toContain('<main id="main-content"');
  });

  it.each([
    "components/learn/ArticleLayout.tsx",
    "components/learn/CollectionIndex.tsx",
    "app/analyze-v2/page.tsx",
    "app/reply/page.tsx",
    "app/d/[slug]/page.tsx",
    "components/RouteNotFound.tsx",
  ])("%s renders inside AppShell, which provides the landmark", (path) => {
    const source = readFileSync(join(process.cwd(), path), "utf8");
    expect(source).toContain("<AppShell");
    // Never a second, nested <main>.
    expect(source).not.toMatch(/<main\b/);
  });

  // Learn pages render inside AppShell through the two Learn templates.
  it.each([
    "app/questions/page.tsx",
    "app/questions/[slug]/page.tsx",
  ])("%s renders through a Learn template", (path) => {
    const source = readFileSync(join(process.cwd(), path), "utf8");
    expect(source).toMatch(/<(ArticleLayout|CollectionIndex)\b/);
    expect(source).not.toMatch(/<main\b/);
  });

  it("the root 404 goes through RouteNotFound", () => {
    const source = readFileSync(join(process.cwd(), "app/not-found.tsx"), "utf8");
    expect(source).toContain("<RouteNotFound");
  });
});
