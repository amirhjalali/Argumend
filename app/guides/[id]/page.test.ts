import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { generateMetadata } from "./page";
import { getGuideFallbackOgUrl } from "./_config";

const source = readFileSync(
  join(process.cwd(), "app/guides/[id]/page.tsx"),
  "utf8",
);

describe("guide Open Graph fallback", () => {
  it("targets the implemented generic OG route with encoded copy", () => {
    const url = new URL(
      getGuideFallbackOgUrl("Steel-manning: A practical guide"),
    );

    expect(url.origin + url.pathname).toBe("https://argumend.org/api/og");
    expect(url.searchParams.get("title")).toBe(
      "Steel-manning: A practical guide",
    );
    expect(url.searchParams.get("subtitle")).toBe("Critical Thinking Guide");
  });

  it("uses a typographic separator in page and social titles", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ id: "triangulation" }),
    });

    expect(metadata.title).toContain(" — Guide | Argumend");
    expect(metadata.openGraph?.title).toContain(" — Guide | Argumend");
  });
});

describe("guide Further Reading accessibility", () => {
  it("names external icon links and keeps a 44px pointer target", () => {
    expect(source).toContain("aria-label={`Open ${item.title} in a new tab`}");
    expect(source).toContain("title={`Open ${item.title} in a new tab`}");
    expect(source).toContain("min-h-11 min-w-11");
  });
});
