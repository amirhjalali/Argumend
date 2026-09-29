import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function readSource(relativePath: string) {
  return readFileSync(join(process.cwd(), relativePath), "utf8");
}

/**
 * Every Learn page is built from the two templates, whose rows, chips and
 * next-step links are 44px tall (components/learn/templates.test.tsx renders
 * them). These source checks cover what sits outside the templates.
 */
describe("learning resource touch targets", () => {
  it.each([
    ["article rows and next step", "components/learn/ArticleLayout.tsx"],
    ["index rows and chips", "components/learn/CollectionIndex.tsx"],
    ["educator topic recommendations", "app/for-educators/page.tsx"],
    ["glossary terms", "app/glossary/page.tsx"],
  ])("keeps %s at least 44px tall", (_label, path) => {
    expect(readSource(path)).toContain("min-h-11");
  });

  it("keeps table-of-contents destinations at least 44px tall", () => {
    const source = readSource("components/TableOfContents.tsx");

    expect(source).toContain("flex min-h-11 items-center rounded-sm");
  });
});
