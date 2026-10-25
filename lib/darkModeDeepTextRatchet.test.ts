import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";
import ts from "typescript";

/**
 * Fixed teal text needs a deliberate dark color. Prefer text-accent-text,
 * which follows the current theme, or pair text-deep with a dark override.
 * The same rule applies to hover states and shared class metadata.
 *
 * Parse strings so comments and quoted prose cannot join unrelated classes.
 * Constant concatenation and unconditional cx/cn/clsx arguments form one class
 * list. Conditional branches remain separate, so an optional dark override
 * cannot hide an unsafe base color. Exact icon metadata exceptions are kept
 * separate from text, where the contrast requirement is higher.
 */

const SCAN_ROOTS = ["app", "components", "lib"];
const SOURCE_EXT = /\.(tsx?|jsx?|m[jt]s|c[jt]s)$/;

/** Static class expressions that can be evaluated without executing source. */
function staticText(node: ts.Node): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isParenthesizedExpression(node)) return staticText(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = staticText(node.left);
    const right = staticText(node.right);
    if (left !== undefined && right !== undefined) return left + right;
  }
  return undefined;
}

function classLiterals(src: string): string[] {
  const file = ts.createSourceFile("source.tsx", src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const literals: string[] = [];
  const visit = (node: ts.Node) => {
    const value = staticText(node);
    if (value !== undefined) {
      literals.push(ts.isStringLiteralLike(node) ? node.getText(file) : JSON.stringify(value));
      return;
    }
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && /^(?:cx|cn|clsx)$/.test(node.expression.text)) {
      const fixed = node.arguments.map(staticText).filter((part): part is string => part !== undefined);
      if (fixed.length) literals.push(JSON.stringify(fixed.join(" ")));
      for (const argument of node.arguments) {
        if (staticText(argument) === undefined) visit(argument);
      }
      return;
    }
    if (ts.isTemplateExpression(node)) {
      const fixed = [node.head.text, ...node.templateSpans.map((span) => span.literal.text)].join(" ");
      literals.push(JSON.stringify(fixed));
      for (const span of node.templateSpans) visit(span.expression);
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return literals;
}

/**
 * A bare `text-deep`, with optional opacity modifier.
 * - The lookbehind rejects variant-prefixed forms (`dark:text-deep`,
 *   `hover:text-deep`), `--text-deep`, and any longer identifier.
 * - The lookahead rejects `text-deep-dark` / `-light` / `-bright`.
 */
const BARE_DEEP = /(?<![-\w:])text-deep(?:\/\d{1,3})?(?![-\w/])/;
const DARK_TEXT_OVERRIDE = /(?<![-\w])dark:!?text-/;

/** `hover:text-deep-dark` / `hover:text-deep` with no dark hover override. */
const HOVER_DEEP = /(?<![-\w:])(?:group-)?hover:!?text-deep(?:-dark)?(?![-\w/])/;
const DARK_HOVER_OVERRIDE = /(?<![-\w])dark:(?:group-)?hover:!?text-/;

/** `dark:text-deep-light` / `dark:text-skeptic-light` used as a text tint. */
const LOW_CONTRAST_DARK_TINT = /(?<![-\w])dark:!?text-(?:deep|skeptic)-light(?![-\w/])/;

/** Exact icon-only metadata, documented as meeting the non-text threshold. */
const ICON_EXEMPT: Record<string, string[]> = {
  "lib/categoryColors.ts": ['"text-skeptic-dark dark:text-skeptic-light"'],
};

const collectSourceFiles = (dir: string): string[] => {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
      out.push(...collectSourceFiles(full));
    } else if (
      SOURCE_EXT.test(entry.name) &&
      !entry.name.includes(".test.") &&
      !entry.name.includes(".spec.")
    ) {
      out.push(full);
    }
  }
  return out;
};

type Kind = "bare" | "hover" | "low-tint";

/** Every offending literal in `src`, tagged by what is wrong with it. */
export const findOffenders = (src: string, exempt: string[] = []): Array<[Kind, string]> => {
  const out: Array<[Kind, string]> = [];
  for (const lit of classLiterals(src)) {
    if (exempt.includes(lit)) continue;
    if (BARE_DEEP.test(lit) && !DARK_TEXT_OVERRIDE.test(lit)) out.push(["bare", lit]);
    if (HOVER_DEEP.test(lit) && !DARK_HOVER_OVERRIDE.test(lit)) out.push(["hover", lit]);
    if (LOW_CONTRAST_DARK_TINT.test(lit)) out.push(["low-tint", lit]);
  }
  return out;
};

const kinds = (src: string) => findOffenders(src).map(([k]) => k);

describe("dark-mode fixed teal text guard (ceiling 0)", () => {
  const cwd = process.cwd();
  const files = SCAN_ROOTS.flatMap((root) => collectSourceFiles(join(cwd, root)));

  it("finds source files to scan (sanity check)", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it("flags a bare text-deep but not a paired one", () => {
    expect(kinds(`className="text-deep"`)).toEqual(["bare"]);
    expect(kinds(`className="text-xs text-deep font-medium"`)).toEqual(["bare"]);
    expect(kinds(`className="text-deep/70"`)).toEqual(["bare"]);
    expect(kinds(`className="text-deep dark:text-accent-text"`)).toEqual([]);
    expect(kinds(`className="text-deep/40 dark:text-accent-text/40"`)).toEqual([]);
    expect(kinds(`className="text-deep dark:text-[#9bc7c3]"`)).toEqual([]);
    expect(kinds(`className="text-deep dark:text-teal-300"`)).toEqual([]);
    // Siblings of the token are not the token.
    expect(kinds(`className="text-deep-dark"`)).toEqual([]);
    expect(kinds(`className="text-deep-light bg-deep/10 border-deep/20"`)).toEqual([]);
    expect(kinds(`className="text-[var(--text-deep)]"`)).toEqual([]);
  });

  it("judges each string literal on its own, so style maps and ternaries are covered", () => {
    expect(kinds(`moderate: "bg-deep/10 text-deep border-deep/20",`)).toEqual(["bare"]);
    expect(kinds(`isFor ? "text-deep" : "text-stone-600 dark:text-stone-400"`)).toEqual(["bare"]);
    expect(kinds(`isFor ? "text-deep dark:text-accent-text" : "text-stone-600"`)).toEqual([]);
    // A comment is not a class string.
    expect(kinds(`// renders with text-deep / border-t-deep`)).toEqual([]);
  });

  it("accepts important dark overrides and statically joined class lists", () => {
    expect(kinds(`className="!text-deep dark:!text-accent-text"`)).toEqual([]);
    expect(kinds(`className="hover:!text-deep-dark dark:hover:!text-accent-text"`)).toEqual([]);
    expect(kinds(`const classes = "text-deep " + "dark:text-accent-text";`)).toEqual([]);
    expect(kinds(`cn("text-deep", "dark:text-accent-text")`)).toEqual([]);
    expect(kinds(`cx("text-deep", active && "dark:text-accent-text")`)).toEqual(["bare"]);
    expect(kinds(`className="text-deep dark:!text-deep-light"`)).toEqual(["low-tint"]);
  });

  it("flags hover variants that would darken in dark mode", () => {
    expect(kinds(`className="text-deep hover:text-deep-dark dark:text-accent-text"`)).toEqual(["hover"]);
    expect(
      kinds(`className="text-deep hover:text-deep-dark dark:text-accent-text dark:hover:text-accent-text"`),
    ).toEqual([]);
    expect(kinds(`className="text-stone-500 hover:text-deep"`)).toEqual(["hover"]);
    expect(kinds(`className="text-stone-500 hover:text-deep dark:hover:text-accent-text"`)).toEqual([]);
    expect(
      kinds(`className="text-primary group-hover:text-deep dark:group-hover:text-accent-text"`),
    ).toEqual([]);
  });

  it("flags the low-contrast dark tints used as text colour", () => {
    expect(kinds(`chip: "text-deep dark:text-deep-light"`)).toEqual(["low-tint"]);
    expect(kinds(`chip: "text-skeptic-dark dark:text-skeptic-light"`)).toEqual(["low-tint"]);
    expect(kinds(`chip: "text-deep dark:text-accent-text"`)).toEqual([]);
    expect(kinds(`chip: "text-skeptic-dark dark:text-[#cfa88a]"`)).toEqual([]);
    // Backgrounds and borders may keep the light tint.
    expect(kinds(`"bg-deep/10 dark:bg-deep-light/20 border-skeptic-light"`)).toEqual([]);
  });

  it("has no bare text-deep, dark-darkening hover, or low-contrast dark tint anywhere", () => {
    const offenders: string[] = [];
    for (const file of files) {
      const rel = file.replace(`${cwd}/`, "");
      const hits = findOffenders(readFileSync(file, "utf8"), ICON_EXEMPT[rel] ?? []);
      for (const [kind, lit] of hits) offenders.push(`  ${kind.padEnd(8)} ${rel}  ${lit.slice(0, 90)}`);
    }
    expect(
      offenders,
      `Found ${offenders.length} dark-mode text-deep problem(s). \`text-deep\` (#3a6965) measures\n` +
        `2.5-2.8:1 on every dark surface, so it needs a deliberate dark override:\n` +
        `  bare      -> add \`dark:text-accent-text\` (keep the /NN modifier if decorative)\n` +
        `  hover     -> add \`dark:hover:text-accent-text\` after \`hover:text-deep-dark\`,\n` +
        `               or \`dark:hover:text-accent-text\` after a bare \`hover:text-deep\`\n` +
        `  low-tint  -> \`dark:text-deep-light\` / \`dark:text-skeptic-light\` are 2.8-3.7:1;\n` +
        `               use \`dark:text-accent-text\` / \`dark:text-[#cfa88a]\` for text\n` +
        `Only exact icon metadata may be exempted (see ICON_EXEMPT).\n` +
        `Offenders:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });

  it("keeps the exemption list honest: every exempt literal still exists", () => {
    for (const [rel, literals] of Object.entries(ICON_EXEMPT)) {
      const src = readFileSync(join(cwd, rel), "utf8");
      for (const lit of literals) {
        expect(src.includes(lit), `${rel} no longer contains ${lit}`).toBe(true);
      }
    }
  });
});
