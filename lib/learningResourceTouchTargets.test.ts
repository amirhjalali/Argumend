import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function readSource(relativePath: string) {
  return readFileSync(join(process.cwd(), relativePath), "utf8");
}

describe("learning resource touch targets", () => {
  it.each([
    ["educator topic recommendations", "app/for-educators/page.tsx"],
    ["guide track index", "app/guides/page.tsx"],
    ["guide track backlink", "app/guides/[id]/page.tsx"],
    ["concept stage backlink", "app/concepts/[slug]/page.tsx"],
  ])("keeps %s at least 44px tall", (_label, path) => {
    expect(readSource(path)).toContain("min-h-11");
  });

  it("keeps table-of-contents destinations at least 44px tall", () => {
    const source = readSource("components/TableOfContents.tsx");

    expect(source).toContain("flex min-h-11 items-center rounded-sm");
  });

  it("preserves meaningful spaces in learning-resource accessible names", () => {
    expect(readSource("app/for-educators/page.tsx")).toContain(
      'disagree{" "}<br />',
    );
    expect(readSource("app/guides/page.tsx")).toContain(
      'aria-label={`${track.numeral}. ${track.label}, ${count}',
    );
  });
});
