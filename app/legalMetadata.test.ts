import { describe, expect, it } from "vitest";
import { metadata as privacy } from "./privacy/page";
import { metadata as terms } from "./terms/page";

describe("legal page social cards", () => {
  it.each([
    ["privacy", privacy],
    ["terms", terms],
  ])("/%s sets an og:image, since its openGraph replaces the root one", (_slug, metadata) => {
    const images = metadata.openGraph?.images as Array<{ url: string }>;
    expect(images).toHaveLength(1);
    expect(images[0].url).toMatch(/^https:\/\/argumend\.org\/api\/og\?title=/);
    expect(metadata.twitter?.images).toEqual([images[0].url]);
  });
});
