/**
 * Which paste lanes are live on this deployment, read at request time.
 *
 * Server only: it reads private environment variables. The /analyze page
 * calls it and hands the result to the client as a prop, which is what lets
 * the consent line name the lane that will actually run rather than every
 * lane that could (F5 in docs/reviews/2026-09-29-paste-flow.md).
 *
 * - Map lane: always on. Offline, on our server, nothing sent or stored.
 * - Diagnosis lane: `ENABLE_DISAGREEMENT_V2=true` and a provider that can run.
 *   Mirrors `createDisagreementProvider` in lib/disagreement/model: `fake`
 *   answers from fixtures and sends nothing; `cli` is a local subscription
 *   CLI that is refused in production; the default lane is Anthropic and
 *   needs both a model id and an API key.
 *
 * The map-reply (Jev) thread lane is not folded in here yet: it stays at
 * /reply behind its own flags.
 */
import type { AiProviderId } from "@/lib/aiProviders";
import type { PasteDiagnosisLane, PasteLanes } from "./types";

type Env = Record<string, string | undefined>;

export function resolveDiagnosisLane(env: Env = process.env): PasteDiagnosisLane {
  if (env.ENABLE_DISAGREEMENT_V2 !== "true") return { enabled: false };

  const provider = env.ARGUMEND_DISAGREEMENT_PROVIDER;
  if (provider === "fake") {
    return { enabled: true, providerIds: [], fixtures: true };
  }
  if (provider === "cli") {
    if (env.NODE_ENV === "production") return { enabled: false };
    const ids: AiProviderId[] = [env.ARGUMEND_DISAGREEMENT_CLI === "codex" ? "openai" : "anthropic"];
    return { enabled: true, providerIds: ids, fixtures: false };
  }
  if (!env.ARGUMEND_DISAGREEMENT_MODEL?.trim() || !env.ANTHROPIC_API_KEY?.trim()) {
    return { enabled: false };
  }
  return { enabled: true, providerIds: ["anthropic"], fixtures: false };
}

export function resolvePasteLanes(env: Env = process.env): PasteLanes {
  return { maps: true, diagnosis: resolveDiagnosisLane(env) };
}
