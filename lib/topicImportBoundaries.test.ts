import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const routesThatMustNotLoadTheFullCorpus = [
  "app/api/og/[id]/route.tsx",
  "app/api/verdict-card/[topicId]/route.tsx",
  "app/api/v1/topics/[id]/route.ts",
  "app/embed/[topicId]/page.tsx",
  "app/is/page.tsx",
  "app/is/[slug]/page.tsx",
  "app/questions/page.tsx",
  "app/questions/[slug]/page.tsx",
  "app/sitemap.ts",
  "app/topics/TopicsPageClient.tsx",
  "app/topics/[id]/page.tsx",
  "app/topics/[id]/TopicPageClient.tsx",
  "app/topics/compare/page.tsx",
  "app/topics/compare/[id1]/vs/[id2]/page.tsx",
  "components/AppShell.tsx",
  "components/Sidebar.tsx",
  "components/TopBar.tsx",
] as const;

const routesThatMustNotLoadFullArticleBodies = [
  "app/blog/page.tsx",
  "app/blog/category/[category]/page.tsx",
  "app/blog/tag/[tag]/page.tsx",
] as const;

describe("topic data import boundaries", () => {
  it.each(routesThatMustNotLoadTheFullCorpus)(
    "%s does not eagerly import the complete topic corpus",
    (route) => {
      const source = readFileSync(resolve(process.cwd(), route), "utf8");

      expect(source).not.toMatch(/from\s+["']@\/data\/topics["']/);
      expect(source).not.toMatch(/from\s+["'](?:\.\.\/)+data\/topics["']/);
    },
  );
});

describe("blog data import boundaries", () => {
  it.each(routesThatMustNotLoadFullArticleBodies)(
    "%s does not eagerly import every article body",
    (route) => {
      const source = readFileSync(resolve(process.cwd(), route), "utf8");

      expect(source).not.toMatch(/from\s+["']@\/data\/blog["']/);
      expect(source).not.toMatch(/from\s+["'](?:\.\.\/)+data\/blog["']/);
    },
  );
});

describe("analyze client bundle boundary", () => {
  it("keeps the graph runtime out of the analysis route shell", () => {
    const source = readFileSync(
      resolve(process.cwd(), "app/analyze/page.tsx"),
      "utf8",
    );

    expect(source).not.toMatch(/from\s+["']@\/hooks\/useLogicGraph["']/);
    expect(source).not.toContain("ViewToggle");
    expect(source).not.toMatch(/currentTopicId=/);
    expect(source).not.toMatch(/onTopicSelect=/);
  });
});

const contentRouteClientShells = [
  "app/blog/[slug]/client.tsx",
  "app/topics/TopicsPageClient.tsx",
  "app/topics/[id]/TopicPageClient.tsx",
  "components/AppShell.tsx",
  "components/Sidebar.tsx",
  "components/TopBar.tsx",
] as const;

describe("content-route graph import boundaries", () => {
  it.each(contentRouteClientShells)(
    "%s does not eagerly import the graph runtime",
    (route) => {
      const source = readFileSync(resolve(process.cwd(), route), "utf8");

      expect(source).not.toMatch(/from\s+["']@\/hooks\/useLogicGraph["']/);
      expect(source).not.toMatch(/from\s+["']@xyflow\/react["']/);
      expect(source).not.toMatch(/from\s+["']reactflow["']/);
    },
  );

  it("keeps graph-only TopBar controls owned by the interactive home shell", () => {
    const appShellSource = readFileSync(
      resolve(process.cwd(), "components/AppShell.tsx"),
      "utf8",
    );
    const topBarSource = readFileSync(
      resolve(process.cwd(), "components/TopBar.tsx"),
      "utf8",
    );
    const homeSource = readFileSync(
      resolve(process.cwd(), "components/HomeClient.tsx"),
      "utf8",
    );

    expect(appShellSource).not.toContain("ViewToggle");
    expect(topBarSource).not.toContain('import("./ViewToggle")');
    expect(homeSource).toMatch(
      /from\s+["']@\/components\/ViewToggle["']/,
    );
    expect(homeSource).not.toContain('import("@/components/ViewToggle")');
    expect(homeSource).toContain("viewToggle={<ViewToggle />}");
  });

  it("does not speculatively prefetch every shared-shell destination", () => {
    const topBarSource = readFileSync(
      resolve(process.cwd(), "components/TopBar.tsx"),
      "utf8",
    );
    const sidebarSource = readFileSync(
      resolve(process.cwd(), "components/Sidebar.tsx"),
      "utf8",
    );
    const footerSource = readFileSync(
      resolve(process.cwd(), "components/Footer.tsx"),
      "utf8",
    );
    const trendingSource = readFileSync(
      resolve(process.cwd(), "components/TrendingTopics.tsx"),
      "utf8",
    );

    expect(topBarSource.match(/prefetch=\{false\}/g)).toHaveLength(3);
    expect(sidebarSource.match(/prefetch=\{false\}/g)).toHaveLength(4);
    expect(footerSource.match(/prefetch=\{false\}/g)).toHaveLength(2);
    expect(trendingSource.match(/prefetch=\{false\}/g)).toHaveLength(1);
  });
});

describe("debate example-data boundary", () => {
  it("loads the full mock debate corpus only after the user requests an example", () => {
    const source = readFileSync(
      resolve(process.cwd(), "hooks/useDebateOrchestrator.ts"),
      "utf8",
    );

    expect(source).not.toMatch(
      /from\s+["']@\/data\/mockDebates["']/,
    );
    expect(source).toContain('import("@/data/mockDebates")');
    expect(source).toMatch(
      /from\s+["']@\/data\/mockDebateIndex["']/,
    );
  });
});

describe("shared search lazy boundary", () => {
  it("does not render the SearchModal boundary before search is first opened", () => {
    const source = readFileSync(
      resolve(process.cwd(), "components/TopBar.tsx"),
      "utf8",
    );

    expect(source).not.toMatch(/from\s+["'].\/SearchModal["']/);
    expect(source).toContain('import("./SearchModal")');
    expect(source).toContain(
      "{hasOpenedSearch && <SearchModal isOpen={searchOpen} onClose={closeSearch} />}",
    );
  });

  it("builds search from lightweight indexes without graph, provider, or full-corpus imports", () => {
    const source = readFileSync(
      resolve(process.cwd(), "components/SearchModal.tsx"),
      "utf8",
    );

    expect(source).toMatch(/from\s+["']@\/data\/topicIndex["']/);
    expect(source).toMatch(/from\s+["']@\/data\/blogIndex["']/);
    expect(source).toMatch(/from\s+["']@\/data\/concepts["']/);
    expect(source).not.toMatch(/from\s+["']@\/data\/topics["']/);
    expect(source).not.toMatch(/from\s+["']@\/data\/blog["']/);
    expect(source).not.toMatch(/from\s+["']@\/hooks\/useLogicGraph["']/);
    expect(source).not.toMatch(/from\s+["']@xyflow\/react["']/);
    expect(source).not.toMatch(/from\s+["'](?:openai|@anthropic-ai\/sdk)["']/);
  });
});
