import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(path, "utf8");

describe("production packaging contracts", () => {
  it("builds with Bun but runs the standalone server as non-root Node 20", () => {
    const dockerfile = read("Dockerfile");

    expect(dockerfile).toMatch(/^FROM oven\/bun:1\.3\.14 AS base/m);
    expect(dockerfile).toMatch(/^FROM node:20-bookworm-slim AS runner/m);
    expect(dockerfile).toContain("RUN bun --bun next build");
    expect(dockerfile).not.toContain("RUN bun run build");
    expect(dockerfile).toContain("USER nextjs");
    expect(dockerfile).toContain("STOPSIGNAL SIGTERM");
    expect(dockerfile).toContain('CMD ["node", "server.js"]');
    expect(dockerfile).toContain("/api/health");
    expect(dockerfile).toContain("NEXT_TELEMETRY_DISABLED=1");
    expect(dockerfile).toContain("ARG NEXT_PUBLIC_ENABLE_AUTH=false");
    expect(dockerfile).not.toMatch(/ARG (?:DATABASE_URL|AUTH_SECRET|.*API_KEY)/);
  });

  it("copies public and static assets exactly once in the Docker runner", () => {
    const dockerfile = read("Dockerfile");
    expect(dockerfile.match(/\/app\/public \.\/public/g)).toHaveLength(1);
    expect(dockerfile.match(/\/app\/\.next\/static \.\/\.next\/static/g)).toHaveLength(1);
  });

  it("keeps secrets and repository-only bulk out of the Docker context", () => {
    const ignore = read(".dockerignore");
    expect(ignore).toMatch(/^\.env$/m);
    expect(ignore).toMatch(/^\.env\.\*$/m);
    expect(ignore).toMatch(/^!\.env\.example$/m);
    expect(ignore).toMatch(/^screenshots\/$/m);
    expect(ignore).toMatch(/^output\/$/m);
    expect(ignore).toMatch(/^\.playwright-cli\/$/m);
    expect(ignore).toMatch(/^\*\*\/\*\.test\.\*$/m);

    const gitignore = read(".gitignore");
    expect(gitignore).toMatch(/^\.env$/m);
    expect(gitignore).toMatch(/^\.env\.\*$/m);
    expect(gitignore).toMatch(/^!\.env\.example$/m);
  });

  it("keeps Nixpacks on the same Bun-build and Node-runtime contract", () => {
    const nixpacks = read("nixpacks.toml");
    expect(nixpacks).toContain('nixPkgs = ["nodejs_20", "bun"]');
    expect(nixpacks).toContain('cmds = ["bun run build"]');
    expect(nixpacks).not.toContain("cp -r");
    expect(nixpacks).toContain(
      'cmd = "exec node .next/standalone/server.js"',
    );
    expect(nixpacks).toContain('NEXT_TELEMETRY_DISABLED = "1"');
  });

  it("pins the build toolchain and aligns Node types with runtime major 20", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      packageManager: string;
      engines: { node: string };
      devDependencies: { "@types/node": string };
      scripts: { analyze: string };
    };
    expect(read(".node-version").trim()).toBe("20");
    expect(packageJson.engines.node).toMatch(/^>=20\./);
    expect(packageJson.packageManager).toBe("bun@1.3.14");
    expect(packageJson.devDependencies["@types/node"]).toBe("20.19.43");
    expect(read(".github/workflows/ci.yml")).toContain("bun-version: 1.3.14");
    expect(read(".github/workflows/ci.yml")).toContain("bun run smoke:standalone");
    expect(packageJson.scripts.analyze).toBe("ANALYZE=true bun --bun next build");
  });

  it("smokes every core offline workflow with providers and persistence disabled", () => {
    const smoke = read("scripts/smoke-standalone.mjs");

    expect(smoke).toContain('DATABASE_URL: ""');
    expect(smoke).toContain('GEMINI_API_KEY: ""');
    expect(smoke).toContain('GROK_API_KEY: ""');
    expect(smoke).toContain('AUTH_SECRET: ""');
    expect(smoke).toContain('MOLTBOOK_API_KEY: ""');
    expect(smoke).toContain("persistence skipped");
    expect(smoke).toContain('ENABLE_LIVE_ANALYZE_API: "false"');
    expect(smoke).toContain('ENABLE_LIVE_DEBATE_API: "false"');
    expect(smoke).toContain('ENABLE_LIVE_JUDGING_API: "false"');
    expect(smoke).toContain('NEXT_PUBLIC_ENABLE_LIVE_ANALYZE_API: "false"');
    expect(smoke).toContain('NEXT_PUBLIC_ENABLE_LIVE_DEBATE_API: "false"');
    expect(smoke).toContain('NEXT_PUBLIC_ENABLE_LIVE_JUDGING_API: "false"');
    for (const endpoint of ["/api/analyze", "/api/debate", "/api/judge"]) {
      expect(smoke).toContain("`${origin}" + endpoint + "`");
    }
    expect(smoke).toContain('analysis.execution?.analysis?.actual !== "offline"');
    expect(smoke).toContain('debate.execution?.actual !== "programmatic"');
    expect(smoke).toContain("judgment.id !== undefined");
  });
});
