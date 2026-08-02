import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const read = (file: string) =>
  readFileSync(join(process.cwd(), "components", file), "utf8");

describe("read mode touch targets", () => {
  it("keeps the read/map view choices at least 44px tall", () => {
    const source = read("ReadGraphToggle.tsx");

    expect(source.match(/inline-flex min-h-11 items-center/g)).toHaveLength(2);
  });

  it("keeps standalone table-of-contents and map controls touch-sized", () => {
    const source = read("ReadModeView.tsx");

    expect(source).toContain("flex min-h-11 items-center border-l-2");
    expect(source).toContain("inline-flex min-h-11 items-center gap-2 rounded-full");
    expect(source).toContain("flex min-h-11 items-center rounded-md");
  });
});
