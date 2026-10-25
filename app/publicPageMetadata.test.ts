import { describe, expect, it } from "vitest";
import { metadata as aiMetadata } from "./ai/page";
import { metadata as privacyMetadata } from "./privacy/page";
import { generateMetadata as questionsMetadata } from "./questions/page";
import { metadata as replyMetadata } from "./reply/page";
import { metadata as termsMetadata } from "./terms/page";
import { generateMetadata as topicMetadata } from "./topics/[id]/page";
import { topicSummaries } from "@/data/topicIndex";
import { mapDisplayTitle } from "@/lib/mapNaming";
import { embedMeta } from "./embed/[topicId]/_model";

// The questions index filters by category, so its metadata is generated.
const questionsIndexMetadata = await questionsMetadata({ searchParams: Promise.resolve({}) });

describe("public page title metadata", () => {
  it("frames legacy maps as questions in search and social descriptions, rather than asserting one side", async () => {
    for (const topic of topicSummaries) {
      const metadata = await topicMetadata({ params: Promise.resolve({ id: topic.id }) });
      expect(metadata.description, topic.id).toContain(mapDisplayTitle(topic));
      expect(metadata.description, topic.id).toContain("evidence on each side");
      expect(metadata.description, topic.id).not.toContain(topic.meta_claim);
      expect(metadata.openGraph, topic.id).toMatchObject({ description: metadata.description });
      expect(metadata.twitter, topic.id).toMatchObject({ description: metadata.description });
      expect(embedMeta(topic.id)?.description, topic.id).toBe(metadata.description);
    }
  });

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
