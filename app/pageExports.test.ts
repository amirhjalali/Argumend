import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const ALLOWED_PAGE_EXPORTS = new Set([
  "config",
  "dynamic",
  "dynamicParams",
  "fetchCache",
  "generateMetadata",
  "generateStaticParams",
  "generateViewport",
  "maxDuration",
  "metadata",
  "preferredRegion",
  "revalidate",
  "runtime",
  "viewport",
]);

function pageFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return pageFiles(path);
    return entry.name === "page.tsx" ? [path] : [];
  });
}

function hasModifier(
  node: ts.Node,
  kind: ts.SyntaxKind.ExportKeyword | ts.SyntaxKind.DefaultKeyword,
): boolean {
  return Boolean(
    ts.canHaveModifiers(node) &&
      ts.getModifiers(node)?.some((modifier) => modifier.kind === kind),
  );
}

function bindingNames(name: ts.BindingName): string[] {
  if (ts.isIdentifier(name)) return [name.text];
  return name.elements.flatMap((element) =>
    ts.isOmittedExpression(element) ? [] : bindingNames(element.name),
  );
}

function runtimeNamedExports(path: string): string[] {
  const source = ts.createSourceFile(
    path,
    readFileSync(path, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const names: string[] = [];

  for (const statement of source.statements) {
    if (ts.isExportDeclaration(statement)) {
      if (statement.isTypeOnly || !statement.exportClause) continue;
      if (ts.isNamedExports(statement.exportClause)) {
        names.push(
          ...statement.exportClause.elements
            .filter((element) => !element.isTypeOnly)
            .map((element) => element.name.text),
        );
      }
      continue;
    }
    if (!hasModifier(statement, ts.SyntaxKind.ExportKeyword)) continue;
    if (hasModifier(statement, ts.SyntaxKind.DefaultKeyword)) continue;

    if (ts.isVariableStatement(statement)) {
      names.push(
        ...statement.declarationList.declarations.flatMap((declaration) =>
          bindingNames(declaration.name),
        ),
      );
    } else if (
      (ts.isFunctionDeclaration(statement) ||
        ts.isClassDeclaration(statement) ||
        ts.isEnumDeclaration(statement)) &&
      statement.name
    ) {
      names.push(statement.name.text);
    }
  }

  return names;
}

describe("App Router page exports", () => {
  it("keeps every runtime named export within Next's page contract", () => {
    const violations = pageFiles(join(process.cwd(), "app")).flatMap((path) =>
      runtimeNamedExports(path)
        .filter((name) => !ALLOWED_PAGE_EXPORTS.has(name))
        .map((name) => `${relative(process.cwd(), path)}: ${name}`),
    );

    expect(violations).toEqual([]);
  });
});
