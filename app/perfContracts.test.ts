import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Guards for the phone-performance fixes in docs/reviews/2026-09-29-r2-perf.md.
// Each one is a regression that is invisible in review and costs bytes on
// every page load.

const read = (file: string) => readFileSync(path.join(process.cwd(), file), "utf8");

const SOURCE_EXTENSIONS = ["", ".ts", ".tsx", ".js", ".mjs", "/index.ts", "/index.tsx"];

function resolveLocalImport(fromFile: string, specifier: string): string | null {
  let base: string;
  if (specifier.startsWith("@/")) base = path.join(process.cwd(), specifier.slice(2));
  else if (specifier.startsWith(".")) base = path.join(path.dirname(fromFile), specifier);
  else return null;
  for (const extension of SOURCE_EXTENSIONS) {
    const file = base + extension;
    if (existsSync(file) && statSync(file).isFile() && !file.endsWith(".json")) return file;
  }
  return null;
}

/**
 * Walks the value imports (static, re-exports and dynamic import()) reachable
 * from the entry files and returns the project files that import `pkg`, with
 * the import chain that reached each one. Type-only imports are skipped: they
 * are erased and ship nothing.
 */
function filesImporting(pkg: string, entries: string[]): string[] {
  const seen = new Set<string>();
  const hits: string[] = [];
  const importPattern =
    /(?:^|\n)\s*(?:import|export)\s+(type\s+)?[^;]*?from\s+["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)/g;
  const visit = (file: string, chain: string[]) => {
    if (seen.has(file)) return;
    seen.add(file);
    for (const match of readFileSync(file, "utf8").matchAll(importPattern)) {
      if (match[1]) continue;
      const specifier = match[2] ?? match[3];
      if (specifier === pkg || specifier.startsWith(`${pkg}/`)) hits.push(chain.join(" -> "));
      const next = resolveLocalImport(file, specifier);
      if (next) visit(next, [...chain, path.relative(process.cwd(), next)]);
    }
  };
  for (const entry of entries) visit(path.join(process.cwd(), entry), [entry]);
  return hits;
}

describe("performance contracts", () => {
  it("keeps the topic page's client islands out of home, /about and /methodology", () => {
    // DebateView and TopicPage import TopicActions and CruxReflection. A server
    // module that imports either (even for a constant) ships both islands to
    // every page that imports it. The crux primitives live in cruxPrimitives.
    for (const file of [
      "components/home/homeModel.ts",
      "components/FeaturedTopicHero.tsx",
      // /about draws its crux card with FeaturedTopicHero's WorkedCrux.
      "app/about/page.tsx",
    ]) {
      const source = read(file);
      expect(source, file).not.toMatch(/from "@\/components\/argument\/DebateView"/);
      expect(source, file).not.toMatch(/from "@\/components\/topic\/TopicPage"/);
    }
  });

  it("keeps zod out of the crux primitives the diagram ships to the browser", () => {
    // components/topic/cruxPrimitives.tsx is imported by client components on
    // /topics/[id]/map (DiagramDetail, MobileArgumentList). lib/argument/ledger.ts
    // holds the zod schemas; importing it from here put ~66KB gzip of zod in
    // that route's first load.
    const primitives = read("components/topic/cruxPrimitives.tsx");
    expect(primitives).not.toMatch(/from "@\/lib\/argument\/ledger"/);
    const projection = read("lib/argument/ledgerProjection.ts");
    expect(projection).not.toMatch(/from "zod"/);
    expect(projection).not.toMatch(/from "\.\/ledger"|from "@\/lib\/argument\/ledger"/);
  });

  it("keeps zod out of the shell every page loads", () => {
    // The footer's newsletter form imported zod to check a { success: true }
    // receipt, which put ~67KB gzip of zod in every page's first load. The
    // root layout, the header and the footer (and anything they import, even
    // through next/dynamic) use plain guards from lib/apiReceipt instead.
    // SaveTopicButton sits on topic pages and map cards: same rule.
    expect(
      filesImporting("zod", [
        "app/layout.tsx",
        "components/AppShell.tsx",
        "components/TopBar.tsx",
        "components/Footer.tsx",
        "components/SaveTopicButton.tsx",
      ]),
    ).toEqual([]);
  });

  it("preloads only the upright font faces", () => {
    const layout = read("app/layout.tsx");
    // next/font preloads every face it loads, so only upright faces go
    // through it; the italics are plain @font-face rules on self-hosted files.
    const calls = [...layout.matchAll(/= localFont\(\{([\s\S]*?)\}\);/g)];
    expect(calls).toHaveLength(2);
    for (const [, options] of calls) {
      expect(options).toMatch(/style: "normal"/);
      expect(options).not.toMatch(/preload: false/);
    }
    const italics = [...layout.matchAll(/"(\/fonts\/[^"]+-italic-[^"]+\.woff2)"/g)].map((m) => m[1]);
    expect(italics).toHaveLength(2);
    for (const url of italics) {
      expect(existsSync(path.join(process.cwd(), "public", url)), url).toBe(true);
    }
    expect(layout).toMatch(/font-style:italic/);
  });

  it("builds without fetching fonts from the network", () => {
    // next/font/google downloads at build time; that broke the deploy build.
    expect(read("app/layout.tsx")).not.toMatch(/from "next\/font\/google"/);
  });

  it("gives phones a small copy of the watercolor wash", () => {
    const css = read("app/globals.css");
    const phone = css.match(/@media \(max-width: 767px\) \{\s*body::after \{\s*background-image: url\("([^"]+)"\)/);
    expect(phone).not.toBeNull();
    const file = path.join(process.cwd(), "public", phone![1]);
    expect(existsSync(file)).toBe(true);
    expect(statSync(file).size).toBeLessThan(50 * 1024);
  });

  it("ships sharp and its libvips library in the standalone build", () => {
    // Without sharp, /_next/image silently serves every image at its original
    // size and format (649KB JPEGs at w=384 in production). Next's docs ask
    // standalone deployments to depend on sharp directly.
    const pkg = JSON.parse(read("package.json")) as { dependencies: Record<string, string> };
    expect(pkg.dependencies.sharp).toBeDefined();

    // Next's tracer misses libvips for sharp >= 0.35, so next.config.js lists
    // it. The glob has to point at real libvips files on this machine.
    const config = createRequire(import.meta.url)("../next.config.js") as {
      outputFileTracingIncludes: Record<string, string[]>;
    };
    const globs = Object.values(config.outputFileTracingIncludes)
      .flat()
      .filter((glob) => glob.includes("sharp-libvips-"));
    expect(globs).toHaveLength(1);
    const imgDir = path.join(process.cwd(), globs[0].split("/sharp-libvips-")[0]);
    const libraries = readdirSync(imgDir)
      .filter((name) => name.startsWith("sharp-libvips-"))
      .flatMap((name) => readdirSync(path.join(imgDir, name, "lib")))
      .filter((file) => file.startsWith("libvips-cpp"));
    expect(libraries.length).toBeGreaterThan(0);
  });
});
