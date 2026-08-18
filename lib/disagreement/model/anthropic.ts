import { DISAGREEMENT_MODEL_TIMEOUT_MS } from "@/lib/disagreement/constants";
import { DisagreementError } from "@/lib/disagreement/errors";
import { RawDisagreementExtractionSchema } from "@/lib/schemas/disagreement";
import { DISAGREEMENT_SYSTEM_PROMPT } from "@/lib/disagreement/prompts/v1/system";
import { buildDisagreementUserPrompt } from "@/lib/disagreement/prompts/v1/user";
import type { RawDisagreementExtractionV1 } from "@/types/disagreement";
import { RAW_EXTRACTION_TOOL } from "./rawSchema";
import type {
  DisagreementExtractRequest,
  DisagreementExtractResult,
  DisagreementModelProvider,
} from "./provider";

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
}

function isRetryable(error: unknown): boolean {
  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
  return (
    message.includes("429") ||
    message.includes("500") ||
    message.includes("502") ||
    message.includes("503") ||
    message.includes("overloaded") ||
    message.includes("timeout") ||
    message.includes("network")
  );
}

function toolInputFromResponse(content: Array<{ type: string; name?: string; input?: unknown }>) {
  const tool = content.find((block) => block.type === "tool_use" && block.name === RAW_EXTRACTION_TOOL.name);
  return tool?.input;
}

export class AnthropicDisagreementProvider implements DisagreementModelProvider {
  constructor(
    private readonly requestId: string,
    private readonly options: { model: string; maxOutputTokens: number } ,
  ) {}

  async extract(
    request: DisagreementExtractRequest,
    options: { signal?: AbortSignal } = {},
  ): Promise<DisagreementExtractResult> {
    const started = Date.now();
    const userPrompt = buildDisagreementUserPrompt(request);
    let lastSchemaError: unknown;

    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const payload = await this.callModel({
          userPrompt,
          repairNote:
            attempt === 2 && lastSchemaError
              ? "The previous tool payload failed schema validation. Return a valid extract_disagreement payload only."
              : undefined,
          signal: options.signal,
        });
        const parsed = RawDisagreementExtractionSchema.safeParse(payload);
        if (!parsed.success) {
          lastSchemaError = parsed.error;
          if (attempt >= 1) {
            throw new DisagreementError("MODEL_SCHEMA_INVALID", this.requestId);
          }
          continue;
        }
        return {
          data: parsed.data as RawDisagreementExtractionV1,
          meta: {
            provider: "anthropic",
            model: this.options.model,
            latencyMs: Date.now() - started,
          },
        };
      } catch (error) {
        if (error instanceof DisagreementError) throw error;
        if (error instanceof DOMException && error.name === "AbortError") {
          throw new DisagreementError("MODEL_TIMEOUT", this.requestId);
        }
        if (attempt < 2 && isRetryable(error)) {
          await sleep(250 * 2 ** attempt, options.signal);
          continue;
        }
        throw new DisagreementError("MODEL_UNAVAILABLE", this.requestId);
      }
    }

    throw new DisagreementError("MODEL_SCHEMA_INVALID", this.requestId);
  }

  private async callModel(input: {
    userPrompt: string;
    repairNote?: string;
    signal?: AbortSignal;
  }): Promise<unknown> {
    const AnthropicClass = (await import("@anthropic-ai/sdk")).default;
    const client = new AnthropicClass();
    const timeout = AbortSignal.timeout(DISAGREEMENT_MODEL_TIMEOUT_MS);
    const signal = input.signal ? AbortSignal.any([input.signal, timeout]) : timeout;

    const response = await client.messages.create(
      {
        model: this.options.model,
        max_tokens: this.options.maxOutputTokens,
        system: DISAGREEMENT_SYSTEM_PROMPT,
        tools: [RAW_EXTRACTION_TOOL] as never,
        messages: [
          {
            role: "user",
            content: input.repairNote
              ? `${input.repairNote}\n\n${input.userPrompt}`
              : input.userPrompt,
          },
        ],
      },
      { signal },
    );

    return toolInputFromResponse(response.content as Array<{ type: string; name?: string; input?: unknown }>);
  }
}
