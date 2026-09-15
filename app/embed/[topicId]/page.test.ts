import { describe, expect, it } from "vitest";
import { argumentTopicIds } from "@/lib/argument/topicIds";
import EmbedPage, { generateMetadata, generateStaticParams } from "./page";

// Flagship ArgumentGraph topics have no embed on purpose: the widget is built
// from legacy-only fields (balance/weight/verdict, for/against pillars, a
// winner banner) that the north star forbids exposing for debate maps.
describe("embed route and flagship debate maps", () => {
  it("never pre-renders an embed for a flagship id", () => {
    const staticIds = generateStaticParams().map(({ topicId }) => topicId);
    for (const id of argumentTopicIds) {
      expect(staticIds).not.toContain(id);
    }
  });

  it.each(argumentTopicIds)("serves a 404, not a fabricated widget, for %s", async (id) => {
    await expect(
      EmbedPage({ params: Promise.resolve({ topicId: id }) }),
    ).rejects.toMatchObject({ digest: expect.stringContaining("404") });

    const metadata = await generateMetadata({
      params: Promise.resolve({ topicId: id }),
    });
    expect(metadata.title).toBe("Not Found");
  });
});
