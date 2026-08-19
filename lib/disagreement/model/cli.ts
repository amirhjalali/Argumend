import { spawn } from "node:child_process";
import { DISAGREEMENT_CLI_TIMEOUT_MS } from "@/lib/disagreement/constants";
import { DisagreementError } from "@/lib/disagreement/errors";
import { DISAGREEMENT_SYSTEM_PROMPT } from "@/lib/disagreement/prompts/v1/system";
import { buildDisagreementUserPrompt } from "@/lib/disagreement/prompts/v1/user";
import { RawDisagreementExtractionSchema } from "@/lib/schemas/disagreement";
import type { RawDisagreementExtractionV1 } from "@/types/disagreement";
import { RAW_EXTRACTION_TOOL } from "./rawSchema";
import type {
  DisagreementExtractRequest,
  DisagreementExtractResult,
  DisagreementModelProvider,
} from "./provider";

/**
 * Subscription-backed local provider.
 *
 * This provider shells out to an interactive coding CLI that is already
 * authenticated against the operator's own subscription, so the diagnosis loop
 * can run with no ANTHROPIC_API_KEY and no per-token billing. It exists to
 * establish and review diagnosis patterns offline; it is refused in production
 * because spawning a subprocess per request is not a serving architecture.
 */
export type DisagreementCliKind = "claude" | "codex";

export interface CliRunInput {
  bin: string;
  args: string[];
  stdin: string;
  timeoutMs: number;
  signal?: AbortSignal;
}

export interface CliRunOutput {
  stdout: string;
  stderr: string;
  code: number | null;
  timedOut: boolean;
}

export type CliRunner = (input: CliRunInput) => Promise<CliRunOutput>;

export interface CliProviderOptions {
  kind: DisagreementCliKind;
  model: string;
  bin?: string;
  timeoutMs?: number;
  /** Injected in tests so no real subprocess is ever spawned. */
  runner?: CliRunner;
}

const JSON_ONLY_INSTRUCTION = [
  "",
  "Output contract:",
  "Return ONLY a single JSON object. No prose, no explanation, no markdown code fences",
  "before or after it. The object must match this JSON Schema exactly:",
  JSON.stringify(RAW_EXTRACTION_TOOL.input_schema),
].join("\n");

export function cliSystemPrompt(): string {
  return `${DISAGREEMENT_SYSTEM_PROMPT}\n${JSON_ONLY_INSTRUCTION}`;
}

/**
 * Scans for the first balanced, parseable JSON object in free text. CLIs wrap
 * or decorate model output in ways that vary by version, so locating the
 * payload structurally is more durable than trimming known prefixes.
 */
export function extractFirstJsonObject(text: string): unknown {
  let depth = 0;
  let start = -1;
  let inString = false;
  let escaped = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }
    if (char === "{") {
      if (depth === 0) start = index;
      depth += 1;
      continue;
    }
    if (char === "}") {
      if (depth > 0) depth -= 1;
      if (depth === 0 && start >= 0) {
        try {
          return JSON.parse(text.slice(start, index + 1));
        } catch {
          start = -1;
        }
      }
    }
  }

  return undefined;
}

/**
 * `claude -p --output-format json` returns an envelope whose `result` holds the
 * model text. Unwrap it first so the scan does not stop on the envelope itself.
 */
export function payloadFromCliOutput(kind: DisagreementCliKind, stdout: string): unknown {
  if (kind === "claude") {
    try {
      const envelope = JSON.parse(stdout) as { result?: unknown; is_error?: boolean };
      if (typeof envelope.result === "string") {
        return extractFirstJsonObject(envelope.result);
      }
    } catch {
      // Fall through to a structural scan of the raw stream.
    }
  }
  return extractFirstJsonObject(stdout);
}

/**
 * A CLI can report a provider-level failure — an exhausted usage limit, an
 * expired login — while still exiting zero. Detecting that here keeps the
 * caller from spending a repair attempt on it and then blaming the schema.
 */
/** Distinct field paths from a Zod failure, capped so an error stays readable. */
export function issuePaths(error: { issues: Array<{ path: PropertyKey[] }> }): string[] {
  const paths = new Set<string>();
  for (const issue of error.issues) {
    paths.add(issue.path.map((part) => (typeof part === "number" ? "[]" : String(part))).join("."));
  }
  return [...paths].slice(0, 8);
}

export function cliRefusedOutput(kind: DisagreementCliKind, stdout: string): boolean {
  if (kind !== "claude") return false;
  try {
    const envelope = JSON.parse(stdout) as { is_error?: boolean };
    return envelope.is_error === true;
  } catch {
    return false;
  }
}

export function buildCliCommand(input: {
  kind: DisagreementCliKind;
  bin: string;
  model: string;
  system: string;
  user: string;
}): { bin: string; args: string[]; stdin: string } {
  if (input.kind === "claude") {
    return {
      bin: input.bin,
      args: [
        "-p",
        "--output-format",
        "json",
        "--model",
        input.model,
        "--allowed-tools",
        "",
        "--system-prompt",
        input.system,
      ],
      stdin: input.user,
    };
  }

  // Codex has no separate system-prompt flag, so the contract is prepended.
  return {
    bin: input.bin,
    args: [
      "exec",
      "-s",
      "read-only",
      "--skip-git-repo-check",
      "--ephemeral",
      "-m",
      input.model,
      "-",
    ],
    stdin: `${input.system}\n\n${input.user}`,
  };
}

const defaultRunner: CliRunner = (input) =>
  new Promise<CliRunOutput>((resolve, reject) => {
    const child = spawn(input.bin, input.args, { stdio: ["pipe", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    let settled = false;

    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGKILL");
    }, input.timeoutMs);

    const onAbort = () => {
      timedOut = true;
      child.kill("SIGKILL");
    };
    input.signal?.addEventListener("abort", onAbort, { once: true });

    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      input.signal?.removeEventListener("abort", onAbort);
      fn();
    };

    child.stdout.on("data", (chunk: Buffer) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });
    child.on("error", (error) => finish(() => reject(error)));
    child.on("close", (code) => finish(() => resolve({ stdout, stderr, code, timedOut })));

    child.stdin.on("error", () => {
      // A CLI that exits before reading stdin surfaces through `close`.
    });
    child.stdin.end(input.stdin);
  });

export class CliDisagreementProvider implements DisagreementModelProvider {
  private readonly kind: DisagreementCliKind;
  private readonly model: string;
  private readonly bin: string;
  private readonly timeoutMs: number;
  private readonly runner: CliRunner;

  constructor(
    private readonly requestId: string,
    options: CliProviderOptions,
  ) {
    this.kind = options.kind;
    this.model = options.model;
    this.bin = options.bin ?? options.kind;
    this.timeoutMs = options.timeoutMs ?? DISAGREEMENT_CLI_TIMEOUT_MS;
    this.runner = options.runner ?? defaultRunner;
  }

  async extract(
    request: DisagreementExtractRequest,
    options: { signal?: AbortSignal } = {},
  ): Promise<DisagreementExtractResult> {
    if (process.env.NODE_ENV === "production") {
      throw new DisagreementError(
        "MODEL_UNAVAILABLE",
        this.requestId,
        "The CLI provider is local-only and refuses to run in production.",
      );
    }

    const started = Date.now();
    const system = cliSystemPrompt();
    const user = buildDisagreementUserPrompt(request);
    let lastIssuePaths: string[] = [];

    for (let attempt = 0; attempt < 2; attempt += 1) {
      // Naming the offending fields makes the single repair attempt worth
      // spending; a bare "that was invalid" gives the model nothing to act on.
      const repairNote =
        attempt === 1
          ? `Your previous reply was not a single valid JSON object matching the schema.${
              lastIssuePaths.length > 0 ? ` These fields were wrong or missing: ${lastIssuePaths.join(", ")}.` : ""
            } Return only that JSON object.\n\n`
          : "";
      const command = buildCliCommand({
        kind: this.kind,
        bin: this.bin,
        model: this.model,
        system,
        user: `${repairNote}${user}`,
      });

      let output: CliRunOutput;
      try {
        output = await this.runner({
          bin: command.bin,
          args: command.args,
          stdin: command.stdin,
          timeoutMs: this.timeoutMs,
          signal: options.signal,
        });
      } catch {
        throw new DisagreementError("MODEL_UNAVAILABLE", this.requestId);
      }

      if (output.timedOut) {
        throw new DisagreementError("MODEL_TIMEOUT", this.requestId);
      }
      if (output.code !== 0 || cliRefusedOutput(this.kind, output.stdout)) {
        // Usage-limit and auth failures are not retryable within a request.
        throw new DisagreementError("MODEL_UNAVAILABLE", this.requestId);
      }

      const payload = payloadFromCliOutput(this.kind, output.stdout);
      const parsed = RawDisagreementExtractionSchema.safeParse(payload);
      if (parsed.success) {
        return {
          data: parsed.data as RawDisagreementExtractionV1,
          meta: {
            provider: `cli:${this.kind}`,
            model: this.model,
            latencyMs: Date.now() - started,
          },
        };
      }
      // Field paths only. The spec permits logging schema issue paths and
      // forbids logging the source, the model output, or any quote.
      lastIssuePaths = payload === undefined ? ["<no json object in cli output>"] : issuePaths(parsed.error);
    }

    throw new DisagreementError(
      "MODEL_SCHEMA_INVALID",
      this.requestId,
      `Extraction failed schema validation at: ${lastIssuePaths.join(", ") || "unknown"}`,
    );
  }
}
