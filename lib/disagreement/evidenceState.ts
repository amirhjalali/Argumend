import type { ClaimEpistemicType, ClaimRelationType, EvidenceState, RawGroundingQuote } from "@/types/disagreement";
import { locateQuote } from "./grounding";

/**
 * Words and figures that mark a claim as asserting evidence rather than just
 * asserting: a cited number, a study, a report, records, data. Source-only
 * means this is read off the source's own wording; nothing is checked.
 */
const EVIDENCE_MARKER =
  /\d|\bper\s?cent\b|\b(?:stud(?:y|ies)|reports?|data|surveys?|trials?|evidence|statistics?|figures|research|records?|audits?|measure(?:d|ments?))\b|\baccording to\b/i;

const EVIDENCE_TYPED: ReadonlySet<ClaimEpistemicType> = new Set(["empirical", "predictive"]);

/** A relation in which `from` is offered for or against `to`. */
const BEARING: ReadonlySet<ClaimRelationType> = new Set(["supports", "undercuts", "contradicts", "qualifies"]);

/**
 * Which of the spec's three evidence states (§6.6) the source earns for a crux
 * claim. Deterministic and conservative: the two specific states are emitted
 * only on a clear signal from the source, and the general boundary ("no
 * independent verification performed"), which is always true, is the fallback.
 *
 * - Not an evidence question (normative, definitional, procedural): the boundary.
 *   Evidence is not what would settle it, so neither specific state applies.
 * - The claim's grounded wording cites a figure, study, report, or data, or
 *   another claim in the source is offered for or against it: evidence was
 *   asserted in the source.
 * - The claim is quoted verbatim, cites nothing, and nothing bears on it: no
 *   evidence was supplied in the source.
 * - The claim's wording never survived grounding: the boundary. A paraphrase
 *   cannot show what the source did or did not supply.
 */
export function deriveEvidenceState(input: {
  claim: {
    id: string;
    statement: string;
    epistemicType: ClaimEpistemicType;
    groundingQuotes: RawGroundingQuote[];
  };
  relations: Array<{ fromClaimId: string; toClaimId: string; type: ClaimRelationType }>;
  source: string;
}): EvidenceState {
  const { claim, relations, source } = input;
  if (!EVIDENCE_TYPED.has(claim.epistemicType)) return "not-independently-checked";

  const grounded = claim.groundingQuotes.filter((item) => locateQuote(source, item.quote) !== null);
  const bearing = relations.some(
    (relation) =>
      relation.toClaimId === claim.id && relation.fromClaimId !== claim.id && BEARING.has(relation.type),
  );
  const cites = grounded.some((item) => EVIDENCE_MARKER.test(item.quote));
  if (bearing || (grounded.length > 0 && cites)) return "asserted-in-source";
  if (grounded.length > 0) return "no-evidence-provided";
  return "not-independently-checked";
}
