import { describe, expect, it } from "vitest";
import { metadata as analysesMetadata } from "./analyses/page";
import { metadata as isMetadata } from "./is/page";
import { metadata as questionsMetadata } from "./questions/page";

describe("public page title metadata", () => {
  it.each([
    ["analyses", analysesMetadata],
    ["is", isMetadata],
    ["questions", questionsMetadata],
  ])("lets the root template add the brand once for %s", (_route, metadata) => {
    expect(metadata.title).toEqual(expect.any(String));
    expect(String(metadata.title)).not.toMatch(/argumend/i);
  });
});
