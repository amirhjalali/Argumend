import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const routesThatMustNotLoadTheFullCorpus = [
  "app/api/og/[id]/route.tsx",
  "app/api/verdict-card/[topicId]/route.tsx",
  "app/api/v1/topics/[id]/route.ts",
  "app/embed/[topicId]/page.tsx",
  "app/page.tsx",
  "components/home/HomeLanding.tsx",
  "components/home/homeModel.ts",
  "app/questions/page.tsx",
  "app/questions/[slug]/page.tsx",
  "app/sitemap.ts",
  "app/topics/TopicsPageClient.tsx",
  "app/topics/[id]/page.tsx",
  "app/topics/[id]/map/page.tsx",
  "app/topics/[id]/map/TopicDiagram.tsx",
  "components/ReadModeView.tsx",
  "components/topic/TopicPage.tsx",
  "components/AppShell.tsx",
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
  "app/topics/[id]/page.tsx",
  "components/ReadModeView.tsx",
  "components/argument/DebateView.tsx",
  "components/topic/TopicPage.tsx",
  "components/topic/CruxReflection.tsx",
  "components/topic/TopicActions.tsx",
  "components/AppShell.tsx",
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

  it("keeps the graph runtime and its view toggle off home and the shared shell", () => {
    const appShellSource = readFileSync(
      resolve(process.cwd(), "components/AppShell.tsx"),
      "utf8",
    );
    const topBarSource = readFileSync(
      resolve(process.cwd(), "components/TopBar.tsx"),
      "utf8",
    );

    expect(appShellSource).not.toContain("ViewToggle");
    expect(topBarSource).not.toContain('import("./ViewToggle")');

    // Home is a server page inside the shell since 2026-09-29; the canvas it
    // used to host is reached through the map's own route, never from `/`.
    for (const file of ["app/page.tsx", "components/home/HomeLanding.tsx"]) {
      const source = readFileSync(resolve(process.cwd(), file), "utf8");
      expect(source, file).not.toContain("ViewToggle");
      expect(source, file).not.toMatch(/from\s+["']@\/hooks\/useLogicGraph["']/);
      expect(source, file).not.toMatch(/from\s+["']@xyflow\/react["']/);
      expect(source, file).not.toContain("DesktopCanvas");
    }
  });

  it("server-renders both topic shapes through one template, with no client graph", () => {
    const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");
    const routeSource = read("app/topics/[id]/page.tsx");

    // Legacy maps render server-side like the flagship maps: no client loader,
    // no canvas, the same TopicPage template underneath.
    expect(routeSource).toMatch(/from\s+["']@\/components\/ReadModeView["']/);
    expect(routeSource).not.toMatch(/LegacyTopicPageLoader|TopicPageClient/);
    for (const path of [
      "components/ReadModeView.tsx",
      "components/argument/DebateView.tsx",
      "components/topic/TopicPage.tsx",
    ]) {
      const source = read(path);
      expect(source, path).not.toMatch(/^["']use client["']/m);
      expect(source, path).toMatch(/TopicPage/);
      expect(source, path).not.toMatch(/DesktopCanvas|MobileArgumentList|ScalesOfEvidence/);
    }
  });

  it("keeps React Flow on the diagram route, loaded only for desktop sessions", () => {
    const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");
    const diagram = read("app/topics/[id]/map/TopicDiagram.tsx");
    expect(diagram).toContain('import("@/components/DesktopCanvas")');
    expect(diagram).not.toMatch(/from\s+["']@\/components\/DesktopCanvas["']/);
    // The phone outline is server-rendered from the same model, not a chunk.
    expect(diagram).toMatch(/from\s+["']@\/components\/MobileArgumentList["']/);
    expect(diagram).not.toMatch(/from\s+["']@xyflow\/react["']/);
    expect(diagram).not.toMatch(/ScalesOfEvidence|DebateView|ViewToggle/);
    // Neither the outline nor the model pulls in the graph runtime.
    for (const path of [
      "components/MobileArgumentList.tsx",
      "lib/diagram/model.ts",
      "lib/diagram/layout.ts",
    ]) {
      expect(read(path), path).not.toMatch(/from\s+["']@xyflow\/react["']/);
    }
  });

  it("builds the diagram on the server from the topic page's own model", () => {
    const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");
    const route = read("app/topics/[id]/map/page.tsx");
    expect(route).toMatch(/from\s+["']@\/lib\/diagram\/model["']/);
    expect(route).toContain("loadTopicById");
    expect(read("lib/diagram/model.ts")).toMatch(/from\s+["']@\/lib\/topicPage\/legacy["']/);
  });

  it("does not speculatively prefetch every shared-shell destination", () => {
    // The header and footer are on every page, so every link in them opts out
    // of prefetch: one <Link> per `prefetch={false}`, no exceptions.
    for (const file of ["components/TopBar.tsx", "components/Footer.tsx"]) {
      const source = readFileSync(resolve(process.cwd(), file), "utf8");
      const links = source.match(/<Link\b/g) ?? [];
      expect(links.length, `${file} renders no links`).toBeGreaterThan(0);
      expect(source.match(/prefetch=\{false\}/g), file).toHaveLength(links.length);
    }
  });
});

describe("diagram runtime lazy boundaries", () => {
  it("keeps React Flow and its stylesheet inside the desktop canvas chunk", () => {
    const canvasSource = readFileSync(
      resolve(process.cwd(), "components/DesktopCanvas.tsx"),
      "utf8",
    );
    expect(canvasSource).toMatch(/from\s+["']@xyflow\/react["']/);
    expect(canvasSource).toContain('import "@xyflow/react/dist/style.css"');
  });

  it("loads topic validation only when an individual topic is requested", () => {
    const loaderSource = readFileSync(
      resolve(process.cwd(), "data/topicLoader.ts"),
      "utf8",
    );

    expect(loaderSource).not.toMatch(/import\s+\{\s*buildTopic\s*\}\s+from/);
    expect(loaderSource).toContain('import("./buildTopic")');
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
    // The modal, the map items it shares with the library (lib/mapSearchItems.ts)
    // and the ranking with its word folding.
    const source = [
      "components/SearchModal.tsx",
      "lib/mapSearchItems.ts",
      "lib/siteSearch.ts",
      "lib/paste/stem.ts",
    ]
      .map((file) => readFileSync(resolve(process.cwd(), file), "utf8"))
      .join("\n");

    expect(source).toMatch(/from\s+["']@\/data\/topicIndex["']/);
    expect(source).toMatch(/from\s+["']@\/data\/blogIndex["']/);
    expect(source).toMatch(/from\s+["']@\/data\/concepts["']/);
    expect(source).toMatch(/from\s+["']@\/lib\/argument\/topicIds["']/);
    expect(source).not.toMatch(/from\s+["']@\/data\/topics["']/);
    expect(source).not.toMatch(/from\s+["']@\/data\/blog["']/);
    expect(source).not.toMatch(/from\s+["']@\/lib\/argument\/draftTopics["']/);
    expect(source).not.toMatch(/data\/topics\/drafts/);
    expect(source).not.toMatch(/from\s+["']@\/hooks\/useLogicGraph["']/);
    expect(source).not.toMatch(/from\s+["']@xyflow\/react["']/);
    expect(source).not.toMatch(/from\s+["'](?:openai|@anthropic-ai\/sdk)["']/);
    // The paste lane's terms module loads the map-reply index for its stopwords.
    expect(source).not.toMatch(/from\s+["'](?:@\/lib\/paste\/terms|\.\/terms)["']/);
  });
});
