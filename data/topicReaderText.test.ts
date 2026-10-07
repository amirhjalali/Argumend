import { describe, expect, it } from "vitest";
import { topics } from "./topics";
import { loadArgumentTopic } from "@/lib/argument/draftTopics";
import { argumentTopicIds } from "@/lib/argument/topicIds";

/**
 * Topic data is rendered as plain text, so markup typed into it shows up
 * literally on the page. Every string a map carries is walked, except keys
 * that are not prose (ids, URLs, a model's equation).
 */
const NOT_PROSE = new Set(["id", "url", "href", "equation", "image", "slug"]);

function stringsIn(value: unknown, path: string, out: { path: string; text: string }[]) {
  if (typeof value === "string") out.push({ path, text: value });
  else if (Array.isArray(value)) value.forEach((item, i) => stringsIn(item, `${path}[${i}]`, out));
  else if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      if (!NOT_PROSE.has(key)) stringsIn(child, `${path}.${key}`, out);
    }
  }
  return out;
}

const readerText = [
  ...topics.flatMap((topic) => stringsIn(topic, topic.id, [])),
  ...argumentTopicIds.flatMap((id) => stringsIn(loadArgumentTopic(id)!.graph, id, [])),
];

function offenders(pattern: RegExp) {
  return readerText.filter(({ text }) => pattern.test(text)).map(({ path, text }) => `${path}: ${text.slice(0, 120)}`);
}

describe("topic reader text", () => {
  it("covers every map", () => {
    expect(readerText.length).toBeGreaterThan(10_000);
  });

  it("carries no markdown emphasis, which would print as raw asterisks", () => {
    // *word* or **words**. A name like STAR*D (asterisk inside a word) is not
    // emphasis, so the opening asterisk must not follow a letter.
    expect(offenders(/(?<![\w^*])\*{1,2}\w[^*\n]*\w?\*/)).toEqual([]);
  });
});
