import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.tsx?$/.test(entry.name) ? [path] : [];
  });
}

describe("client/server module boundaries", () => {
  it("keeps server credentials and provider modules out of every client entry", () => {
    const files = ["app", "components", "hooks"].flatMap(sourceFiles);
    const forbiddenImports = /^@\/lib\/(?:agents|auth$|db(?:\/|$)|analyze\/extractor$|judge\/council$)/;
    const violations: string[] = [];

    for (const file of files) {
      const source = readFileSync(file, "utf8");
      if (!/^\s*["']use client["'];/.test(source)) continue;
      const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);

      for (const statement of sourceFile.statements) {
        if (!ts.isImportDeclaration(statement) || statement.importClause?.isTypeOnly) continue;
        const specifier = statement.moduleSpecifier;
        if (ts.isStringLiteral(specifier) && forbiddenImports.test(specifier.text)) {
          violations.push(`${file}: ${specifier.text}`);
        }
      }
      for (const match of source.matchAll(/process\.env\.([A-Z0-9_]+)/g)) {
        if (!match[1].startsWith("NEXT_PUBLIC_")) {
          violations.push(`${file}: process.env.${match[1]}`);
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
