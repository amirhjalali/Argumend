import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const SOURCE_EXTENSION = /\.(?:ts|tsx)$/;
const ALLOWED_COMPATIBILITY_PREFIX = "app/api/v1/topics/";

function collectSourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return collectSourceFiles(path);
    if (
      !SOURCE_EXTENSION.test(entry.name) ||
      entry.name.includes(".test.") ||
      entry.name.includes(".spec.")
    ) {
      return [];
    }
    return [path];
  });
}

describe("deprecated confidence_score UI ratchet", () => {
  it("keeps curated UI on balance and weight fields", () => {
    const cwd = process.cwd();
    const files = ["app", "components"].flatMap((root) =>
      collectSourceFiles(join(cwd, root))
    );
    const offenders = files
      .map((path) => ({
        path: relative(cwd, path),
        source: readFileSync(path, "utf8"),
      }))
      .filter(
        ({ path, source }) =>
          source.includes("confidence_score") &&
          !path.startsWith(ALLOWED_COMPATIBILITY_PREFIX)
      )
      .map(({ path }) => path);

    expect(
      offenders,
      "confidence_score is a deprecated alias of balance. Curated UI must read balance, weight, and verdict; only the documented public API compatibility boundary may expose the alias."
    ).toEqual([]);
  });
});
