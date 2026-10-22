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
    "Scores use [0, 10]. Here is the response:",
    'The example format was {"example": true}. Here is the response:',
    'Example text:\n```text\nA response goes here.\n```\nHere is the response:',
  ])("prefers an explicit JSON fence after provider prose: %s", (prefix) => {
    expect(parseModelJson(`${prefix}\n\`\`\`json\n${JSON.stringify(payload)}\n\`\`\``))
      .toEqual(payload);
  });

  it("keeps an unlabeled fenced payload readable", () => {
    expect(parseModelJson(`Response:\n\`\`\`\n${JSON.stringify(payload)}\n\`\`\``))
      .toEqual(payload);
  });

  it("reads indented CRLF fences with a longer backtick delimiter", () => {
    expect(parseModelJson(`Scores use [0, 10].\r\n  \`\`\`\`JSON\r\n${JSON.stringify(payload)}\r\n  \`\`\`\`\r\nDone.`))
      .toEqual(payload);
  });

  it("does not accept an unterminated explicit fence", () => {
    expect(parseModelJson(`Response:\n\`\`\`json\n${JSON.stringify(payload)}`))
      .toBeUndefined();
  });

  it("does not let later prose fences override a leading JSON value", () => {
    expect(parseModelJson(`${JSON.stringify(payload)}\nFormatting example:\n\`\`\`json\n{}\n\`\`\``))
      .toEqual(payload);
  });

  it("keeps the first explicit fenced value authoritative", () => {
    expect(parseModelJson(`Response:\n\`\`\`json\n[]\n\`\`\`\nAlternative:\n\`\`\`json\n${JSON.stringify(payload)}\n\`\`\``))
      .toEqual([]);
  });

  it.each([
    '{"incomplete":',
    `{"incomplete": ${JSON.stringify(payload)}`,
    `{"invalid": ${JSON.stringify(payload)} trailing junk}`,
    '{"mismatched": ]',
  ])("does not recover a different payload after a malformed authoritative fence: %s", (invalid) => {
    expect(parseModelJson(`Response:\n\`\`\`json\n${invalid}\n\`\`\`\nAlternative:\n\`\`\`json\n${JSON.stringify(payload)}\n\`\`\``))
      .toBeUndefined();
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
