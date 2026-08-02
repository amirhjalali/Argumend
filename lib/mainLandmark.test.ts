import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("global skip-link targets", () => {
  it.each([
    "app/is/page.tsx",
    "app/is/[slug]/page.tsx",
    "app/questions/page.tsx",
    "app/questions/[slug]/page.tsx",
    "app/not-found.tsx",
  ])(
    "%s provides the main-content landmark",
    (path) => {
      const source = readFileSync(join(process.cwd(), path), "utf8");
      expect(source).toContain('<main id="main-content"');
    },
  );
});
