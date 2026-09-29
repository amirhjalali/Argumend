import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const source = (file: string) =>
  readFileSync(join(process.cwd(), file), "utf8");

describe("shared navigation touch-target contract", () => {
  it("keeps shared isolated navigation controls at least 44px tall", () => {
    expect(source("app/layout.tsx")).toContain(
      "focus:flex focus:min-h-11 focus:items-center",
    );
    expect(source("components/TopBar.tsx")).toMatch(
      /<Link href="\/"[^>]*className="[^"]*min-h-11/,
    );
    expect(source("components/Breadcrumbs.tsx")).toContain(
      'className="inline-flex min-h-11 items-center',
    );
    expect(source("components/Footer.tsx")).toContain(
      '"inline-flex min-h-11 items-center rounded-md text-sm',
    );
    expect(source("components/ThemeToggle.tsx")).toContain("h-11 w-11");
    // Header nav links, icon buttons and the phone sheet's links.
    expect(source("components/TopBar.tsx")).toContain("inline-flex min-h-11 items-center rounded-md px-2.5");
    expect(source("components/TopBar.tsx")).toContain("inline-flex h-11 w-11 shrink-0");
    expect(source("components/TopBar.tsx")).toContain("flex min-h-12 items-center");
  });

  it.each([
    // The Learn indexes (/learn, /blog, /fallacies, /questions) draw their
    // chips and rows through CollectionIndex, whose link chips are <Chip href>.
    "components/learn/CollectionIndex.tsx",
    "components/ui/Chip.tsx",
    "app/topics/tag/[slug]/page.tsx",
  ])("keeps interactive taxonomy chips touch-sized in %s", (file) => {
    expect(source(file)).toContain("min-h-11");
  });
});
