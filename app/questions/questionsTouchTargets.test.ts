import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("questions collection touch targets", () => {
  it("keeps isolated category jump links at least 44px tall", () => {
    const source = readFileSync(
      join(process.cwd(), "app/questions/page.tsx"),
      "utf8",
    );
    const categoryNavigation = source.match(
      /aria-label="Question categories"[\s\S]*?<\/nav>/,
    )?.[0];

    expect(categoryNavigation).toBeTruthy();
    expect(categoryNavigation).toContain("min-h-11");
  });
});
