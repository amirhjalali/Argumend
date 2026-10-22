import { describe, expect, it } from "vitest";
import { parseModelJson } from "./parseModelJson";

describe("parseModelJson", () => {
  const payload = {
    claim: 'A "}" closes the set; \\ is a path separator; ``` is quoted Markdown.',
    evidence: [{ finding: 'An opening "{" is text.' }],
  };

  it.each([
    ["", ""],
    ['The "quoted introduction" says:\n', "\nEnd of response."],
    ["Here is the response:\n```json\n", "\n```\nDone."],
    ["A {malformed aside} and [draft] precede:\n", ""],
  ])("preserves the JSON value inside wrappers %s / %s", (prefix, suffix) => {
    expect(parseModelJson(`${prefix}${JSON.stringify(payload)}${suffix}`)).toEqual(payload);
  });

  it.each([null, true, 3, "text", [payload]])(
    "returns complete non-object JSON for the consumer schema to reject: %s",
    (value) => {
      expect(parseModelJson(JSON.stringify(value))).toEqual(value);
    },
  );

  it("keeps a wrapped array intact instead of extracting its first object", () => {
    expect(parseModelJson(`Response:\n\`\`\`json\n${JSON.stringify([payload])}\n\`\`\``))
      .toEqual([payload]);
  });

  it.each([
    "no payload",
    '{"claim":"unterminated string }',
    `prefix {"incomplete": ${JSON.stringify(payload)}`,
    `prefix {"invalid": ${JSON.stringify(payload)} trailing junk}`,
    `prefix {"mismatched": ] ${JSON.stringify(payload)}`,
  ])("does not recover nested JSON from malformed content: %s", (text) => {
    expect(parseModelJson(text)).toBeUndefined();
  });
});
