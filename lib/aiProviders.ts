/**
 * The third parties a visitor's pasted text can reach, named in one place.
 *
 * The consent line above a submit button is the only moment a reader gets to
 * decide, so the sentence it shows has to be built from the same record the
 * code path uses — not typed a second time into a component where it can
 * quietly go stale when a provider changes.
 *
 * Pure data plus string formatting: no environment reads, no server imports,
 * safe to import from a client component.
 *
 * MERGE NOTE (2026-09-21): the `jev/privacy-consent` branch introduces a file
 * at this same path with a wider shape — a `Record<AiProviderId, AiProvider>`
 * covering every provider on the site, plus `buildConsentLine()` and a shared
 * `components/AiConsentLine.tsx`. The two must be reconciled when those
 * branches meet: keep that branch's registry, and re-express `mapReplySurface`
 * below as a surface that reads from it. The map-reply sentence is not the
 * same as the diagnosis sentence (it names TypeSafe AI directly rather than
 * "our AI provider", and it adds the redaction clause), so the surface has to
 * survive the merge even though this module's shape should not.
 */

export interface AiProviderSurface {
  /** The company the text is sent to, as visitors should see it named. */
  vendor: string;
  /** Where that company states it processes the request. */
  country: string;
  /** The policy page that explains the rest. */
  policyPath: string;
  /** The words that link to it. */
  policyLabel: string;
}

export const AI_PROVIDERS = {
  mapReply: {
    vendor: "TypeSafe AI",
    country: "the United States",
    policyPath: "/privacy",
    policyLabel: "Privacy",
  },
} as const satisfies Record<string, AiProviderSurface>;

export type AiProviderSurfaceId = keyof typeof AI_PROVIDERS;

export interface ConsentCopy {
  /** The whole sentence, so a test can assert on exactly what is rendered. */
  sentence: string;
  policyPath: string;
  policyLabel: string;
}

/**
 * The disclosure shown immediately above the submit button.
 *
 * Three clauses, in the order a reader needs them: where the text goes, what
 * is stripped before it goes, and the one thing we are asking them not to do.
 * The sentence is assembled here rather than typed into JSX so the rendered
 * copy and the string a test asserts on cannot drift apart.
 */
export function consentCopy(surface: AiProviderSurfaceId = "mapReply"): ConsentCopy {
  const provider = AI_PROVIDERS[surface];
  return {
    sentence:
      `By submitting, you agree that this text is sent to ${provider.vendor} ` +
      `(processed in ${provider.country}) and is not stored. ` +
      `Identifiers are removed first. ` +
      `Don't paste private information about other people.`,
    policyPath: provider.policyPath,
    policyLabel: provider.policyLabel,
  };
}
