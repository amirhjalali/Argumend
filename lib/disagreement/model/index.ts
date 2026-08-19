import { DisagreementError } from "@/lib/disagreement/errors";
import { AnthropicDisagreementProvider } from "./anthropic";
import { CliDisagreementProvider, type DisagreementCliKind } from "./cli";
import { FakeDisagreementProvider } from "./fake";
import type { DisagreementModelProvider } from "./provider";

export type { DisagreementModelProvider } from "./provider";
export { FakeDisagreementProvider } from "./fake";
export { AnthropicDisagreementProvider } from "./anthropic";
export { CliDisagreementProvider } from "./cli";
export type { DisagreementCliKind } from "./cli";

export function isDisagreementV2Enabled(): boolean {
  return process.env.ENABLE_DISAGREEMENT_V2 === "true";
}

export function isDisagreementPublishingEnabled(): boolean {
  return (
    process.env.ENABLE_DISAGREEMENT_PUBLISHING === "true" &&
    Boolean(process.env.REPORT_PUBLICATION_SECRET) &&
    Boolean(process.env.DATABASE_URL)
  );
}

export function createDisagreementProvider(
  requestId: string,
  options?: { fake?: DisagreementModelProvider },
): DisagreementModelProvider {
  if (options?.fake) return options.fake;
  const configured = process.env.ARGUMEND_DISAGREEMENT_PROVIDER;
  if (configured === "fake") {
    return new FakeDisagreementProvider();
  }

  if (configured === "cli") {
    const kind: DisagreementCliKind =
      process.env.ARGUMEND_DISAGREEMENT_CLI === "codex" ? "codex" : "claude";
    return new CliDisagreementProvider(requestId, {
      kind,
      // A CLI alias, not a pinned production model id: this lane is local-only.
      model: process.env.ARGUMEND_DISAGREEMENT_MODEL?.trim() || "sonnet",
      bin: process.env.ARGUMEND_DISAGREEMENT_CLI_BIN?.trim() || undefined,
    });
  }

  const model = process.env.ARGUMEND_DISAGREEMENT_MODEL?.trim();
  if (!model) {
    throw new DisagreementError("MODEL_UNAVAILABLE", requestId, "Missing ARGUMEND_DISAGREEMENT_MODEL");
  }

  const maxOutputTokens = Number(process.env.ARGUMEND_DISAGREEMENT_MAX_OUTPUT_TOKENS ?? 6000);
  return new AnthropicDisagreementProvider(requestId, {
    model,
    maxOutputTokens: Number.isFinite(maxOutputTokens) ? maxOutputTokens : 6000,
  });
}
