import type { ClaimEpistemicType, ClaimRelationType, EvidenceState, RawGroundingQuote } from "@/types/disagreement";
import { locateQuote } from "./grounding";

// A number or the word "evidence" alone is not a citation. Require an asserted
// finding or an attribution, and reject requests for evidence and hypotheticals.
const EVIDENCE_SUBJECT = String.raw`(?:stud(?:y|ies)|reports?|data|surveys?|trials?|evidence|statistics?|research|records?|audits?)`;
const EVIDENCE_ASSERTION = new RegExp(String.raw`\baccording to\b|\b${EVIDENCE_SUBJECT}\b[^.!?\n]{0,50}\b(?:says?|said|found|finds?|shows?|showed|reported|measured|recorded|indicates?|suggests?|estimates?)\b`, "i");
const UNASSERTED_EVIDENCE = new RegExp(String.raw`\b(?:no|without|lack(?:s|ing)?|need(?:s)?|require(?:s)?|hypothetical)\s+(?:\w+\s+){0,2}${EVIDENCE_SUBJECT}\b|\b(?:if|suppose)\s+(?:(?:an?|the|any|some)\s+)?${EVIDENCE_SUBJECT}\b`, "i");
// A question about a finding is not a finding. Restrict this to the evidence
// subject itself being questioned: "Did you read the audit, which found ...?"
// still asserts what the audit found, even inside a question.
const QUESTIONED_EVIDENCE = new RegExp(String.raw`\b(?:did|does|do|can|could|would|will)\s+(?:(?:an?|the|any|some|this|that)\s+)?${EVIDENCE_SUBJECT}\b|\baccording\s+to\s+(?:which|what|whose|whom|who)\b`, "i");
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
    // A question or proposal in one sentence must not erase an actual finding
    // supplied in another sentence of the same grounded quote.
    return wording.split(/[.!?\n]/).some((sentence) =>
      EVIDENCE_ASSERTION.test(sentence) &&
      !UNASSERTED_EVIDENCE.test(sentence) &&
      !QUESTIONED_EVIDENCE.test(sentence),
    );
  });
  return bearing || cites ? "asserted-in-source" : "no-evidence-provided";
}
