import { describe, expect, it } from "vitest";
import { metadata as aiMetadata } from "./ai/page";
import { metadata as privacyMetadata } from "./privacy/page";
import { generateMetadata as questionsMetadata } from "./questions/page";
import { metadata as replyMetadata } from "./reply/page";
import { metadata as termsMetadata } from "./terms/page";

// The questions index filters by category, so its metadata is generated.
const questionsIndexMetadata = await questionsMetadata({ searchParams: Promise.resolve({}) });

describe("public page title metadata", () => {
  it.each([
    ["ai", aiMetadata],
    ["privacy", privacyMetadata],
    ["questions", questionsIndexMetadata],
    // /reply is noindex while it is flagged, but it still renders a <title>
    // through the root template and must not double the brand.
    ["reply", replyMetadata],
    ["terms", termsMetadata],
  ])("lets the root template add the brand once for %s", (_route, metadata) => {
    expect(metadata.title).toEqual(expect.any(String));
    expect(String(metadata.title)).not.toMatch(/argumend/i);
  });
});
