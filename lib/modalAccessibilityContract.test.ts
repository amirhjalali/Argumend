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

  it("keeps the shared drawer lifecycle intact for any future caller", () => {
    // AppShell no longer has a drawer: the header's phone menu is a dialog on
    // useModalAccessibility (covered above). The two legacy private shells,
    // HomeClient and the old /analyze page, are both gone (home and /analyze
    // are server pages in AppShell), so no caller remains; the hook itself
    // stays covered here and by its own test.
    const hook = readFileSync(
      join(process.cwd(), "hooks/useMobileSidebarA11y.ts"),
      "utf8",
    );
    expect(hook).toContain('setAttribute("role", "dialog")');
    expect(hook).toContain('setAttribute("aria-modal", "true")');
    expect(hook).toContain('document.body.style.overflow = "hidden"');
    expect(hook).toContain('event.key === "Escape"');
    expect(hook).toContain('event.key !== "Tab"');
    expect(hook).toContain("triggerRef.current?.focus()");
  });
});
