import type { ClaimEpistemicType, ClaimRelationType, EvidenceState, RawGroundingQuote } from "@/types/disagreement";
import { locateQuote } from "./grounding";

// A number or the word "evidence" alone is not a citation. Require an asserted
// finding or an attribution, and reject requests for evidence and hypotheticals.
const EVIDENCE_ASSERTION = /\baccording to\b|\b(?:stud(?:y|ies)|reports?|data|surveys?|trials?|evidence|statistics?|research|records?|audits?)\b[^.!?\n]{0,50}\b(?:says?|said|found|finds?|shows?|showed|reported|measured|recorded|indicates?|suggests?|estimates?)\b/i;
const UNASSERTED_EVIDENCE = /\b(?:no|without|lack(?:s|ing)?|need(?:s)?|require(?:s)?|hypothetical)\s+(?:\w+\s+){0,2}(?:evidence|data|research|stud(?:y|ies)|reports?)\b|\bif\s+(?:a|the|any|some)\s+(?:stud(?:y|ies)|reports?|data|evidence)\b/i;
const EVIDENCE_TYPED: ReadonlySet<ClaimEpistemicType> = new Set(["empirical", "predictive"]);
const BEARING: ReadonlySet<ClaimRelationType> = new Set(["supports", "opposes", "undercuts", "contradicts", "qualifies"]);

type EvidenceClaim = {
  id: string;
  statement: string;
  epistemicType: ClaimEpistemicType;
  groundingQuotes: RawGroundingQuote[];
};

/** Classify source support only when its quoted wording survives grounding. */
export function deriveEvidenceState(input: {
  claim: EvidenceClaim;
  claims?: EvidenceClaim[];
  relations: Array<{ fromClaimId: string; toClaimId: string; type: ClaimRelationType }>;
  source: string;
}): EvidenceState {
  const { claim, claims = [], relations, source } = input;
  if (!EVIDENCE_TYPED.has(claim.epistemicType)) return "not-independently-checked";
  const grounded = claim.groundingQuotes.flatMap((item) => {
    const span = locateQuote(source, item.quote);
    return span ? [span] : [];
  });
  if (grounded.length === 0) return "not-independently-checked";

  const bearing = relations.some((relation) => {
    if (relation.toClaimId !== claim.id || relation.fromClaimId === claim.id || !BEARING.has(relation.type)) return false;
    const support = claims.find((item) => item.id === relation.fromClaimId);
    return support?.groundingQuotes.some((item) => locateQuote(source, item.quote) !== null) ?? false;
  });
  const cites = grounded.some((span) => {
    // Include the lead-in of the same source sentence, so a quoted statistic
    // can retain its immediately preceding "The report says" attribution.
    const before = source.slice(0, span.start);
    const boundary = Math.max(before.lastIndexOf("\n"), before.lastIndexOf(". "), before.lastIndexOf("? "), before.lastIndexOf("! "));
    const wording = source.slice(boundary + 1, span.end);
    return EVIDENCE_ASSERTION.test(wording) && !UNASSERTED_EVIDENCE.test(wording);
  });
  return bearing || cites ? "asserted-in-source" : "no-evidence-provided";
}
