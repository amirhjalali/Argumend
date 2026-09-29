import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "blog") return [];
      return sourceFiles(absolute);
    }
    if (!/\.tsx?$/.test(entry.name) || /(?:\.test\.|error\.tsx$)/.test(entry.name)) return [];
    return [relative(process.cwd(), absolute)];
  });
}

const auditedSources = [
  ...sourceFiles(join(process.cwd(), "app")),
  ...sourceFiles(join(process.cwd(), "components")),
];

const dialogSources = auditedSources.filter((file) => {
  const source = readFileSync(join(process.cwd(), file), "utf8");
  return /role=["']dialog["']|<dialog\b/.test(source);
});

describe("modal accessibility source contract", () => {
  it("discovers the expected explicit dialog surfaces", () => {
    expect(dialogSources.sort()).toEqual([
      "components/CruxModal.tsx",
      "components/EmbedButton.tsx",
      "components/SearchModal.tsx",
      "components/ShareVerdictCard.tsx",
      "components/TopBar.tsx",
    ]);
  });

  it.each(dialogSources)(
    "%s delegates its complete keyboard lifecycle to the shared hook",
    (file) => {
      const source = readFileSync(join(process.cwd(), file), "utf8");
      expect(source).toContain('aria-modal="true"');
      expect(source).toMatch(/aria-(?:label|labelledby)=/);
      expect(source).toMatch(
        /import\s+\{\s*useModalAccessibility\s*\}\s+from\s+["']@\/hooks\/useModalAccessibility["']/,
      );
      expect(source).toMatch(/useModalAccessibility<[^>]+>\s*\(/);
    },
  );

  it("keeps one scroll lock, on <html> as well as <body>", () => {
    // The window scrolls the page, and html's `overflow-x: clip` stops body's
    // overflow from reaching it, so a body-only lock leaves the page
    // scrolling behind a dialog. Every dialog above goes through the hook;
    // nothing else may lock the page on its own.
    const hook = readFileSync(join(process.cwd(), "hooks/useModalAccessibility.ts"), "utf8");
    expect(hook).toContain('html.style.overflow = "hidden"');
    expect(hook).toContain('body.style.overflow = "hidden"');
    for (const file of auditedSources) {
      const source = readFileSync(join(process.cwd(), file), "utf8");
      expect(source, file).not.toMatch(/\.style\.overflow\s*=/);
    }
  });
});
