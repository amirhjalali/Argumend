import { afterEach, describe, expect, it } from "vitest";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "@/lib/disagreement/prompts/v1/examples";
import { DISAGREEMENT_LIMITS } from "@/lib/disagreement/constants";
import { DisagreementError } from "@/lib/disagreement/errors";
import { RAW_EXTRACTION_TOOL } from "./rawSchema";
import {
  CliDisagreementProvider,
  buildCliCommand,
  cliSystemPrompt,
  extractFirstJsonObject,
  payloadFromCliOutput,
  type CliRunInput,
  type CliRunOutput,
} from "./cli";

const EXTRACTION = DISAGREEMENT_FEW_SHOT_EXAMPLES[0].extraction;
const REQUEST = { content: "Maya: rate is 8 percent.\nNoah: closer to 15.", contentType: "conversation" as const };

function runnerReturning(outputs: Array<Partial<CliRunOutput>>): {
  run: (input: CliRunInput) => Promise<CliRunOutput>;
  calls: CliRunInput[];
} {
  const calls: CliRunInput[] = [];
  let index = 0;
  return {
    calls,
    run: async (input) => {
      calls.push(input);
      const next = outputs[Math.min(index, outputs.length - 1)];
      index += 1;
      return { stdout: "", stderr: "", code: 0, timedOut: false, ...next };
    },
  };
}

function claudeEnvelope(body: unknown): string {
  return JSON.stringify({ is_error: false, session_id: "s1", result: JSON.stringify(body) });
}

const originalNodeEnv = process.env.NODE_ENV;

async function captureError(run: () => Promise<unknown>): Promise<Error> {
  let caught: unknown;
  let threw = false;
  try {
    await run();
  } catch (error) {
    caught = error;
    threw = true;
  }
  if (!threw) throw new Error("expected the call to reject, but it resolved");
  return caught as Error;
}

/** NODE_ENV is typed read-only, so the guard is exercised through the record. */
function setNodeEnv(value: string | undefined) {
  const env = process.env as Record<string, string | undefined>;
  if (value === undefined) delete env.NODE_ENV;
  else env.NODE_ENV = value;
}

afterEach(() => {
  setNodeEnv(originalNodeEnv);
});

describe("extractFirstJsonObject", () => {
  it("finds an object with no decoration", () => {
    expect(extractFirstJsonObject('{"a":1}')).toEqual({ a: 1 });
  });

  it("finds an object wrapped in prose and code fences", () => {
    const text = 'Here you go:\n```json\n{"a":{"b":[1,2]}}\n```\nHope that helps.';
    expect(extractFirstJsonObject(text)).toEqual({ a: { b: [1, 2] } });
  });

  it("ignores braces inside strings", () => {
    expect(extractFirstJsonObject('{"a":"} not the end {"}')).toEqual({ a: "} not the end {" });
  });

  it("ignores escaped quotes inside strings", () => {
    expect(extractFirstJsonObject('{"a":"say \\"hi\\" }"}')).toEqual({ a: 'say "hi" }' });
  });

  it("skips an unparseable candidate and finds a later valid object", () => {
    expect(extractFirstJsonObject('{not json}\n{"ok":true}')).toEqual({ ok: true });
  });

  it("returns undefined when no object is present", () => {
    expect(extractFirstJsonObject("no payload here")).toBeUndefined();
  });
});

describe("payloadFromCliOutput", () => {
  it("unwraps the claude envelope rather than returning the envelope itself", () => {
    const payload = payloadFromCliOutput("claude", claudeEnvelope({ mainQuestion: "q" }));
    expect(payload).toEqual({ mainQuestion: "q" });
  });

  it("unwraps a claude result that carries code fences", () => {
    const stdout = JSON.stringify({ result: '```json\n{"mainQuestion":"q"}\n```' });
    expect(payloadFromCliOutput("claude", stdout)).toEqual({ mainQuestion: "q" });
  });

  it("scans raw stdout for codex", () => {
    const stdout = 'OpenAI Codex v1\n--------\nuser\nthing\n{"mainQuestion":"q"}\n';
    expect(payloadFromCliOutput("codex", stdout)).toEqual({ mainQuestion: "q" });
  });

  it("falls back to a raw scan when the claude envelope is not json", () => {
    expect(payloadFromCliOutput("claude", 'warning\n{"mainQuestion":"q"}')).toEqual({ mainQuestion: "q" });
  });
});

describe("buildCliCommand", () => {
  it("passes the system prompt as a flag and the source on stdin for claude", () => {
    const command = buildCliCommand({
      kind: "claude",
      bin: "claude",
      model: "sonnet",
      system: "SYS",
      user: "USER",
    });
    expect(command.bin).toBe("claude");
    expect(command.args).toContain("--system-prompt");
    expect(command.args[command.args.indexOf("--system-prompt") + 1]).toBe("SYS");
    expect(command.args).toContain("-p");
    expect(command.args[command.args.indexOf("--model") + 1]).toBe("sonnet");
    expect(command.stdin).toBe("USER");
  });

  it("prepends the contract to stdin for codex, which has no system flag", () => {
    const command = buildCliCommand({
      kind: "codex",
      bin: "codex",
      model: "gpt-5.5",
      system: "SYS",
      user: "USER",
    });
    expect(command.args[0]).toBe("exec");
    expect(command.args).toContain("--skip-git-repo-check");
    expect(command.stdin).toBe("SYS\n\nUSER");
  });
});

describe("the schema handed to the model", () => {
  // Every limit the validator enforces must be one the model was told about.
  // A cap the model cannot see produces a rejected extraction after minutes of
  // work, blaming the model for a rule it was never given.
  function collectStringFields(node: unknown, path: string[] = []): Array<{ path: string; hasMax: boolean }> {
    if (!node || typeof node !== "object") return [];
    const record = node as Record<string, unknown>;
    if (record.type === "string") {
      return [{ path: path.join("."), hasMax: typeof record.maxLength === "number" }];
    }
    return Object.entries(record).flatMap(([key, value]) => collectStringFields(value, [...path, key]));
  }

  it("bounds every free-text field the model is asked to produce", () => {
    const fields = collectStringFields(RAW_EXTRACTION_TOOL.input_schema);
    // Enum-valued fields carry their own constraint; free text needs a length.
    const unbounded = fields.filter(
      (field) => !field.hasMax && !/kind|type|relation|explicitness|confidence|basis|id$|Id$|Ids/i.test(field.path),
    );
    expect(unbounded, `unbounded free-text fields: ${unbounded.map((f) => f.path).join(", ")}`).toEqual([]);
  });

  it("states the combined caveat budget, which JSON Schema cannot express", () => {
    const caveats = (RAW_EXTRACTION_TOOL.input_schema as { properties: Record<string, { description?: string }> })
      .properties.caveats;
    expect(caveats.description).toContain(String(DISAGREEMENT_LIMITS.maxCaveatsCombinedCharacters));
  });
});

describe("cliSystemPrompt", () => {
  it("keeps the shared hard rules and adds the json-only contract", () => {
    const prompt = cliSystemPrompt();
    expect(prompt).toContain("untrusted data");
    expect(prompt).toContain("Never infer motive");
    expect(prompt).toContain("Return ONLY a single JSON object");
  });
});

describe("CliDisagreementProvider", () => {
  it("returns a validated extraction and labels the provider by cli kind", async () => {
    const runner = runnerReturning([{ stdout: claudeEnvelope(EXTRACTION) }]);
    const provider = new CliDisagreementProvider("req-1", {
      kind: "claude",
      model: "sonnet",
      runner: runner.run,
    });

    const result = await provider.extract(REQUEST, {});

    expect(result.data.mainQuestion).toBe(EXTRACTION.mainQuestion);
    expect(result.meta.provider).toBe("cli:claude");
    expect(result.meta.model).toBe("sonnet");
    expect(runner.calls).toHaveLength(1);
  });

  it("never sends the source anywhere but the cli stdin", async () => {
    const runner = runnerReturning([{ stdout: claudeEnvelope(EXTRACTION) }]);
    const provider = new CliDisagreementProvider("req-1", {
      kind: "claude",
      model: "sonnet",
      runner: runner.run,
    });

    await provider.extract(REQUEST, {});

    expect(runner.calls[0].stdin).toContain(REQUEST.content);
    expect(runner.calls[0].args.join(" ")).not.toContain(REQUEST.content);
  });

  it("retries once with a repair note when the first reply is unparseable", async () => {
    const runner = runnerReturning([
      { stdout: "I cannot produce that." },
      { stdout: claudeEnvelope(EXTRACTION) },
    ]);
    const provider = new CliDisagreementProvider("req-1", {
      kind: "claude",
      model: "sonnet",
      runner: runner.run,
    });

    const result = await provider.extract(REQUEST, {});

    expect(result.data.mainQuestion).toBe(EXTRACTION.mainQuestion);
    expect(runner.calls).toHaveLength(2);
    expect(runner.calls[1].stdin).toContain("was not a single valid JSON object");
  });

  it("tells the repair attempt which fields were wrong", async () => {
    const runner = runnerReturning([
      { stdout: claudeEnvelope({ ...EXTRACTION, participants: "not-an-array" }) },
      { stdout: claudeEnvelope(EXTRACTION) },
    ]);
    const provider = new CliDisagreementProvider("req-1", {
      kind: "claude",
      model: "sonnet",
      runner: runner.run,
    });

    await provider.extract(REQUEST, {});

    expect(runner.calls[1].stdin).toContain("These fields were wrong or missing");
    expect(runner.calls[1].stdin).toContain("participants");
  });

  it("gives up with MODEL_SCHEMA_INVALID after the bounded repair attempt", async () => {
    const runner = runnerReturning([{ stdout: "still not json" }]);
    const provider = new CliDisagreementProvider("req-1", {
      kind: "claude",
      model: "sonnet",
      runner: runner.run,
    });

    await expect(provider.extract(REQUEST, {})).rejects.toMatchObject({
      code: "MODEL_SCHEMA_INVALID",
    });
    expect(runner.calls).toHaveLength(2);
  });

  it("rejects a schema-shaped payload that violates the extraction contract", async () => {
    const runner = runnerReturning([{ stdout: claudeEnvelope({ mainQuestion: "q only" }) }]);
    const provider = new CliDisagreementProvider("req-1", {
      kind: "claude",
      model: "sonnet",
      runner: runner.run,
    });

    await expect(provider.extract(REQUEST, {})).rejects.toBeInstanceOf(DisagreementError);
  });

  it("treats an is_error envelope as unavailable rather than a schema failure", async () => {
    // A spent usage limit exits zero and reports the failure in the envelope.
    const runner = runnerReturning([
      { stdout: JSON.stringify({ is_error: true, result: "usage limit reached" }) },
    ]);
    const provider = new CliDisagreementProvider("req-1", {
      kind: "claude",
      model: "sonnet",
      runner: runner.run,
    });

    await expect(provider.extract(REQUEST, {})).rejects.toMatchObject({ code: "MODEL_UNAVAILABLE" });
    expect(runner.calls).toHaveLength(1);
  });

  it("names the failing schema paths without leaking source or model output", async () => {
    const runner = runnerReturning([
      { stdout: claudeEnvelope({ ...EXTRACTION, participants: "not-an-array", positions: 5 }) },
    ]);
    const provider = new CliDisagreementProvider("req-1", {
      kind: "claude",
      model: "sonnet",
      runner: runner.run,
    });

    const error = await captureError(() => provider.extract(REQUEST, {}));

    expect(error).toBeInstanceOf(DisagreementError);
    expect(error.message).toContain("participants");
    expect(error.message).toContain("positions");
    expect(error.message).not.toContain(REQUEST.content);
    expect(error.message).not.toContain(EXTRACTION.mainQuestion);
  });

  it("reports a missing json object distinctly from a schema mismatch", async () => {
    const runner = runnerReturning([{ stdout: "I am not going to answer that." }]);
    const provider = new CliDisagreementProvider("req-1", {
      kind: "claude",
      model: "sonnet",
      runner: runner.run,
    });

    const error = await captureError(() => provider.extract(REQUEST, {}));
    expect(error.message).toContain("no json object");
  });

  it("maps a timeout to MODEL_TIMEOUT without retrying", async () => {
    const runner = runnerReturning([{ timedOut: true, code: null }]);
    const provider = new CliDisagreementProvider("req-1", {
      kind: "claude",
      model: "sonnet",
      runner: runner.run,
    });

    await expect(provider.extract(REQUEST, {})).rejects.toMatchObject({ code: "MODEL_TIMEOUT" });
    expect(runner.calls).toHaveLength(1);
  });

  it("maps a nonzero exit such as a usage limit to MODEL_UNAVAILABLE", async () => {
    const runner = runnerReturning([{ code: 1, stderr: "You've hit your usage limit." }]);
    const provider = new CliDisagreementProvider("req-1", {
      kind: "claude",
      model: "sonnet",
      runner: runner.run,
    });

    await expect(provider.extract(REQUEST, {})).rejects.toMatchObject({ code: "MODEL_UNAVAILABLE" });
    expect(runner.calls).toHaveLength(1);
  });

  it("maps a spawn failure to MODEL_UNAVAILABLE", async () => {
    const provider = new CliDisagreementProvider("req-1", {
      kind: "claude",
      model: "sonnet",
      runner: async () => {
        throw new Error("ENOENT");
      },
    });

    await expect(provider.extract(REQUEST, {})).rejects.toMatchObject({ code: "MODEL_UNAVAILABLE" });
  });

  it("refuses to run in production", async () => {
    setNodeEnv("production");
    const runner = runnerReturning([{ stdout: claudeEnvelope(EXTRACTION) }]);
    const provider = new CliDisagreementProvider("req-1", {
      kind: "claude",
      model: "sonnet",
      runner: runner.run,
    });

    await expect(provider.extract(REQUEST, {})).rejects.toMatchObject({ code: "MODEL_UNAVAILABLE" });
    expect(runner.calls).toHaveLength(0);
  });
});
