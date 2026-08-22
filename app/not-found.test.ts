import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { metadata } from "./not-found";

describe("global not-found metadata", () => {
  it("leaves robots policy to Next's single automatic 404 noindex tag", () => {
    const rootLayoutSource = readFileSync("app/layout.tsx", "utf8");
    expect(metadata.robots).toBeUndefined();
    expect(rootLayoutSource).not.toMatch(/^\s+robots:\s*\{/m);
    expect(rootLayoutSource).toContain("max-image-preview:large");
  });

  it("keeps fallback branding links keyboard-sized", () => {
    const notFoundSource = readFileSync("app/not-found.tsx", "utf8");
    const globalErrorSource = readFileSync("app/global-error.tsx", "utf8");

    expect(notFoundSource).toContain(
      'className="group flex min-h-11 flex-col items-center justify-center',
    );
    expect(
      notFoundSource.match(/text-deep hover:underline dark:text-\[#9bc7c3\]/g),
    ).toHaveLength(1);
    // De-linked routes (docs/PRODUCT_PRUNING_AUDIT.md) must not be re-featured
    // on the 404: only /topics survives as an inline suggestion.
    expect(notFoundSource).not.toContain('href="/blog"');
    expect(notFoundSource).not.toContain('href="/guides"');
    expect(globalErrorSource.match(/minHeight: "2\.75rem"/g)).toHaveLength(3);
  });
});
