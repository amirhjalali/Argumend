import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { topics } from "@/data/topics";
import { legacyTopicPage } from "@/lib/topicPage/legacy";
import { loadInteractiveExamples } from "./homeExamples";

describe("homepage crux preview examples", () => {
  const examples = loadInteractiveExamples();

  it("has at least one example", () => {
    expect(examples.length).toBeGreaterThan(0);
  });

  it.each(examples.map((example) => [example.id, example] as const))(
    "%s links to the anchor the topic page renders for its first crux",
    (id, example) => {
      const topic = topics.find((candidate) => candidate.id === id);
      expect(topic).toBeDefined();
      const { cruxes } = legacyTopicPage(topic!);
      expect(example.cruxHref).toBe(`/topics/${id}#${cruxes[0].anchor}`);
    },
  );

  it.each(examples.map((example) => [example.id, example] as const))(
    "%s is labelled audited only if it has a dossier",
    (id, example) => {
      const hasDossier = existsSync(join(process.cwd(), "docs", "dossiers", `${id}.md`));
      expect(example.audited).toBe(hasDossier);
    },
  );
});
