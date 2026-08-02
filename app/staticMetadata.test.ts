import { describe, expect, it } from "vitest";
import { metadata as aboutMetadata } from "./about/layout";
import { metadata as communityMetadata } from "./community/layout";

describe("static route metadata", () => {
  it.each([
    ["about", aboutMetadata],
    ["community", communityMetadata],
  ])("keeps the intentional brand mention from receiving a duplicate root suffix on %s", (_route, metadata) => {
    expect(metadata.title).toMatchObject({ absolute: expect.any(String) });
    const title = (metadata.title as { absolute: string }).absolute;
    expect((title.match(/argumend/gi) ?? []).length).toBe(1);
  });
});
