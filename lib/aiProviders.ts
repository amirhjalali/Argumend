/**
 * The AI providers a visitor's text can reach, named exactly once.
 *
 * Consent copy, the /analyze privacy badge and the privacy policy all read
 * from this module so a provider can never be added to a code path while a
 * surface still tells visitors something older and narrower. The map-reply
 * tool reuses this registry and the `ConsentLine` shape, but not the diagnosis
 * sentence: it reaches exactly one provider and it scrubs before sending, so
 * `buildMapReplyConsentLine` names TypeSafe AI outright and carries a
 * redaction clause the diagnosis lane cannot truthfully make.
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
 * - `MAP_REPLY_PROVIDER_IDS` — `/reply` posts to `/api/map-reply`, which builds
 *   a provider via `getJevProvider()` in `lib/jev/client.ts`. The only live
 *   lane is TypeSafe AI's Jev; the other lane is local fixtures and sends
 *   nothing anywhere.
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

/**
 * Providers a paste on `/reply` may be sent to.
 *
 * One, not a disjunction: the map-reply route has exactly one live lane. The
 * other lane replays local fixtures and makes no request at all, so there is
 * nothing to disclose for it.
 */
export const MAP_REPLY_PROVIDER_IDS: readonly AiProviderId[] = ["typesafe"];

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
 * The one region every provider in a roster processes in.
 *
 * Providers whose stated processing region differs would make a single shared
 * phrase false, so this refuses to flatten them. Every sentence that names a
 * region goes through here rather than reaching into a provider record, so a
 * provider moving to another region breaks loudly instead of silently making
 * a disclosure wrong.
 */
export function sharedProcessingRegion(ids: readonly AiProviderId[]): string {
  const regions = new Set(providers(ids).map((provider) => provider.processingRegion));
  if (regions.size > 1) {
    throw new Error(
      "providerDisclosure needs one shared processing region; split the disclosure instead.",
    );
  }
  const [region] = regions.size === 1 ? [...regions] : [AI_PROCESSING_REGION];
  return region;
}

/**
 * The parenthetical used in consent copy:
 * "TypeSafe AI or Anthropic, processed in the United States".
 */
export function providerDisclosure(ids: readonly AiProviderId[]): string {
  return `${formatProviderList(ids)}, processed in ${sharedProcessingRegion(ids)}`;
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

/**
 * The map-reply lane's own consent line, for the paste box on `/reply`.
 *
 * Three things make it a different sentence rather than a parameter of
 * `buildConsentLine`:
 *
 * 1. It names the vendor outright instead of linking the phrase "our AI
 *    provider". One provider, so the disjunction the diagnosis sentence needs
 *    would be a hedge with nothing behind it.
 * 2. It adds "Identifiers are removed first." — true here because
 *    `lib/mapReply/scrub.ts` replaces emails, phone numbers and @handles and
 *    renames every speaker before anything is sent, and NOT true of the
 *    analyze lanes, which send the paste through unaltered. A shared sentence
 *    would have to either drop the clause or make a false claim for /analyze.
 * 3. The link is the trailing word "Privacy" rather than a phrase inside the
 *    sentence, so the sentence reads as one statement of fact.
 *
 * Scrubbing is redaction of obvious identifiers, not anonymisation — prose can
 * identify a person without containing a single handle — which is why the
 * clause says what was removed and claims nothing more.
 */
export function buildMapReplyConsentLine(
  ids: readonly AiProviderId[] = MAP_REPLY_PROVIDER_IDS,
): ConsentLine {
  const before =
    `By submitting, you agree that this text is sent to ${formatProviderList(ids)} ` +
    `(processed in ${sharedProcessingRegion(ids)}) and is not stored.` +
    " Identifiers are removed first." +
    " Don't paste private information about other people. ";
  const linkText = "Privacy";
  const after = ".";
  return { before, linkText, after, text: `${before}${linkText}${after}` };
}

/** The short badge copy on `/analyze` when live extraction is enabled. */
export function analyzeSourceBadge(): string {
  return `Source text isn’t stored; live mode sends it to ${providerDisclosure(
    ANALYZE_SOURCE_PROVIDER_IDS,
  )}`;
}
