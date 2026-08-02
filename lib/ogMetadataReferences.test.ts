import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

function sourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(?:ts|tsx)$/.test(entry) && !/\.test\./.test(entry) ? [path] : [];
  });
}

describe("Open Graph metadata references", () => {
  it("routes dynamic social-card URLs through the shared validated builders", () => {
    const ogRouteDirectory = join("app", "api", "og");
    const offenders = sourceFiles(join(process.cwd(), "app"))
      .filter((path) => !path.includes(ogRouteDirectory))
      .flatMap((path) => {
        const source = readFileSync(path, "utf8");
        return source.includes("https://argumend.org/api/og")
          ? [relative(process.cwd(), path)]
          : [];
      });

    expect(offenders).toEqual([]);
  });
});
