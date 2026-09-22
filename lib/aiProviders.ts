/**
 * The AI providers a visitor's text can reach, named exactly once.
 *
 * Consent copy, the /analyze privacy badge and the privacy policy all read
 * from this module so a provider can never be added to a code path while a
 * surface still tells visitors something older and narrower. The forthcoming
 * map-reply tool reuses `DIAGNOSIS_PROVIDER_IDS` and `buildConsentLine` rather
 * than writing its own sentence.
 *
 * This module is pure data plus string formatting: no environment reads, no
 * server imports. Client components import it directly.
 *
 * Which lane uses which provider (verified 2026-09-21):
 * - `DIAGNOSIS_PROVIDER_IDS` — `/analyze-v2` posts to `/api/disagreements/analyze`,
 *   which builds a provider via `createDisagreementProvider` in
 *   `lib/disagreement/model/index.ts`. The hosted lane is Anthropic. TypeSafe AI
 *   is listed because the Jev lane is the reason this disclosure exists; the
 *   sentence is a disjunction, so it stays true before that lane lands.
 * - `ANALYZE_SOURCE_PROVIDER_IDS` — `/analyze` live extraction runs
 *   `DEFAULT_EXTRACTION_AGENT` (`model: "claude"`) in `lib/analyze/extractor.ts`.
 * - `ANALYZE_JUDGING_PROVIDER_IDS` — the judge council in `app/api/analyze/route.ts`
 *   defaults to `["claude", "gpt-4", "gemini"]` and accepts `"grok"`. Judging
 *   receives extracted argument data, not the raw pasted source.
 */

export type AiProviderId = "anthropic" | "openai" | "google" | "typesafe" | "xai";

export interface AiProvider {
  id: AiProviderId;
  /** Short name shown to visitors in consent and disclosure copy. */
  name: string;
  /**
   * Where the provider states it processes requests. Every provider Argumend
   * can reach today processes in the United States.
   */
  processingRegion: string;
  /**
   * The provider's own published privacy policy. Listed so the privacy page
   * can point at the terms that actually govern the text once it leaves us.
   */
  privacyUrl: string;
}

export const AI_PROVIDERS: Record<AiProviderId, AiProvider> = {
  anthropic: {
    id: "anthropic",
    name: "Anthropic",
    processingRegion: "the United States",
    privacyUrl: "https://www.anthropic.com/legal/privacy",
  },
  openai: {
    id: "openai",
    name: "OpenAI",
    processingRegion: "the United States",
    privacyUrl: "https://openai.com/policies/privacy-policy/",
  },
  google: {
    id: "google",
    name: "Google",
    processingRegion: "the United States",
    privacyUrl: "https://policies.google.com/privacy",
  },
  typesafe: {
    id: "typesafe",
    name: "TypeSafe AI",
    processingRegion: "the United States",
    privacyUrl: "https://typesafe.ai/legal/privacy-policy",
  },
  xai: {
    id: "xai",
    name: "xAI",
    processingRegion: "the United States",
    privacyUrl: "https://x.ai/legal/privacy-policy",
  },
};

/** Every provider the product can be configured to reach, in a stable order. */
export const ALL_AI_PROVIDER_IDS: readonly AiProviderId[] = [
  "anthropic",
  "typesafe",
  "openai",
  "google",
  "xai",
];

/**
 * Providers a paste on `/analyze-v2` — and, once it ships, the map-reply
 * tool — may be sent to.
 */
export const DIAGNOSIS_PROVIDER_IDS: readonly AiProviderId[] = [
  "typesafe",
  "anthropic",
];

/** Providers that receive the raw source text from live `/analyze`. */
export const ANALYZE_SOURCE_PROVIDER_IDS: readonly AiProviderId[] = ["anthropic"];

/** Providers that can receive extracted argument data for live judging. */
export const ANALYZE_JUDGING_PROVIDER_IDS: readonly AiProviderId[] = [
  "anthropic",
  "openai",
  "google",
  "xai",
];

/** The single processing region every configured provider shares today. */
export const AI_PROCESSING_REGION = "the United States";

export function providers(ids: readonly AiProviderId[]): AiProvider[] {
  return ids.map((id) => AI_PROVIDERS[id]);
}

/** "Anthropic", "TypeSafe AI or Anthropic", "Anthropic, OpenAI, or Google". */
export function formatProviderList(
  ids: readonly AiProviderId[],
  conjunction: "or" | "and" = "or",
): string {
  const names = providers(ids).map((provider) => provider.name);
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} ${conjunction} ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, ${conjunction} ${names[names.length - 1]}`;
}

/**
 * The parenthetical used in consent copy:
 * "TypeSafe AI or Anthropic, processed in the United States".
 *
 * Providers whose stated processing region differs would make a single shared
 * phrase false, so this refuses to flatten them.
 */
export function providerDisclosure(ids: readonly AiProviderId[]): string {
  const regions = new Set(providers(ids).map((provider) => provider.processingRegion));
  if (regions.size > 1) {
    throw new Error(
      "providerDisclosure needs one shared processing region; split the disclosure instead.",
    );
  }
  const [region] = regions.size === 1 ? [...regions] : [AI_PROCESSING_REGION];
  return `${formatProviderList(ids)}, processed in ${region}`;
}

export interface ConsentLine {
  /** Copy before the /privacy link. */
  before: string;
  /** The linked phrase. */
  linkText: string;
  /** Copy after the /privacy link. */
  after: string;
  /** The whole sentence, for tests, docs and non-linking surfaces. */
  text: string;
}

/**
 * The consent line shown immediately above a submit button that sends pasted
 * text to a provider. Split around the phrase that links to /privacy so the
 * rendered sentence and `text` stay character-identical.
 */
export function buildConsentLine(
  ids: readonly AiProviderId[] = DIAGNOSIS_PROVIDER_IDS,
): ConsentLine {
  const before = "By analyzing, you agree that this text is sent to ";
  const linkText = "our AI provider";
  const after =
    ` (${providerDisclosure(ids)}) and is not stored.` +
    " Don't paste private information about other people.";
  return { before, linkText, after, text: `${before}${linkText}${after}` };
}

/** The short badge copy on `/analyze` when live extraction is enabled. */
export function analyzeSourceBadge(): string {
  return `Source text isn’t stored; live mode sends it to ${providerDisclosure(
    ANALYZE_SOURCE_PROVIDER_IDS,
  )}`;
}
