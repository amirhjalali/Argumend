import { DISAGREEMENT_LIMITS } from "./constants";
import { groundQuotes } from "./grounding";
import type { NormalizedExtraction } from "./normalize";
import type {
  ArgumentAccountability,
  ClaimStake,
  RawClaimStakeCandidate,
  StakeDiagnostic,
  StakeRole,
  UpdateEffect,
} from "@/types/disagreement";
/**
 * Deterministic stake projection.
 *
 * The model proposes stakes; everything published below is derived here by
 * fixed rules. The diagnostic is never the model's opinion — it is recomputed
 * from (role, effect, alternativeBasis) so the ledger's semantics cannot
 * drift between prompt versions. Nothing in this module may accuse a
 * participant of bad faith, propaganda, or dishonesty: a missing consequence
 * is a fact about the source's stated structure, not about the person.
 */

export function deriveStakeDiagnostic(input: {
  role: StakeRole;
  ifFalseEffect: UpdateEffect;
  alternativeBasis?: string;
}): StakeDiagnostic {
  // A rebuttal-only claim is classified by what it is (a pure attack on the
  // other side) before what it does; its effect on the speaker's own
  // conclusion is not the interesting fact about it.
  if (input.role === "rebuttal-only") return "rebuttal-only";

  switch (input.ifFalseEffect) {
    case "withdraw":
    case "substantially-weaken":
    case "somewhat-weaken":
    case "reconsider":
      return "clear-stake";
    case "not-stated":
      return input.role === "hinge" || input.role === "material" || input.role === "supporting"
        ? "commitment-gap"
        : "unclear";
    case "no-change":
      return input.alternativeBasis ? "overdetermined" : "non-load-bearing";
    default:
      return "unclear";
  }
}

/** Reader-facing status line per diagnostic. Never accusatory. */
export const STAKE_STATUS_COPY: Record<StakeDiagnostic, string> = {
  "clear-stake": "If this claim fails, the position weakens.",
  "commitment-gap":
    "The source presents this as a reason but does not state what changes if it fails.",
  overdetermined:
    "This claim can fail without changing the conclusion because another stated reason carries it.",
  "non-load-bearing":
    "This claim does not appear to change the conclusion on its own. The remaining basis is unstated.",
  "rebuttal-only":
    "This challenges the other side but does not establish a positive conclusion.",
  unclear: "The source does not provide enough information to determine the claim's role.",
};

function isMajorRole(role: StakeRole): boolean {
  return role === "hinge" || role === "material" || role === "supporting";
}

function deriveHeadline(stakes: ClaimStake[]): string {
  if (stakes.length === 0 || stakes.every((stake) => stake.diagnostic === "unclear")) {
    return "The source does not say what would change.";
  }
  const gapCount = stakes.filter((stake) => stake.diagnostic === "commitment-gap").length;
  if (gapCount === 1) {
    return "One important reason has no stated update attached to it.";
  }
  if (gapCount > 1) {
    return "Several claims are doing less work than they appear to.";
  }
  if (stakes.some((stake) => stake.diagnostic === "non-load-bearing")) {
    return "Several claims are doing less work than they appear to.";
  }
  if (stakes.some((stake) => stake.diagnostic === "overdetermined")) {
    return "The conclusion is supported by multiple independent reasons.";
  }
  return "The major claims carry clear consequences.";
}

function deriveSummary(stakes: ClaimStake[]): string {
  if (stakes.length === 0) {
    return "No major claim in the source states what would change if it were false.";
  }
  const gapCount = stakes.filter((stake) => stake.diagnostic === "commitment-gap").length;
  const clearCount = stakes.filter(
    (stake) => stake.diagnostic === "clear-stake",
  ).length;
  const parts: string[] = [];
  if (clearCount > 0) {
    parts.push(
      clearCount === 1
        ? "One major claim states its consequence directly."
        : `${clearCount} major claims state their consequences directly.`,
    );
  }
  if (gapCount > 0) {
    parts.push(
      gapCount === 1
        ? "One reason arrives without a stated consequence."
        : `${gapCount} reasons arrive without stated consequences.`,
    );
  }
  if (parts.length === 0) {
    parts.push(
      "The stated updates are qualified: some conclusions survive their claims failing because other reasons carry them.",
    );
  }
  return `${parts.join(" ")} Consequences are mapped as the source states them.`;
}

export interface StakeProjectionResult {
  accountability: ArgumentAccountability;
  warnings: string[];
  /** Model-requested stake quotes that were counted toward grounding coverage. */
  expectedQuoteCount: number;
  /** Stake quotes that grounded and were counted toward coverage. */
  groundedQuoteCount: number;
}

function normalizeQuoteText(quote: string): string {
  return quote.trim().toLowerCase().replace(/\s+/g, " ");
}

/**
 * Selects and grounds stakes for the accountability ledger.
 *
 * Selection: every stake attached to a ranked crux claim first (in extraction
 * order), then remaining hinge/material stakes, capped at the ledger limit.
 * If the primary crux has no stake at all, one application-generated stake is
 * minted with NO participant attribution — it is our question about the
 * source, not the participant's commitment.
 *
 * Coverage accounting: a stake quote identical (after whitespace folding) to
 * one already counted for another object is grounded for display but NOT
 * counted again, so reused quotes cannot inflate grounding coverage.
 */
export function projectClaimStakes(input: {
  extraction: NormalizedExtraction["extraction"];
  source: string;
  cruxClaimIds: string[];
  seenQuoteTexts?: Set<string>;
}): StakeProjectionResult {
  const { extraction, source, cruxClaimIds } = input;
  const seen = input.seenQuoteTexts ?? new Set<string>();
  const warnings: string[] = [];
  const candidates: RawClaimStakeCandidate[] = extraction.claimStakeCandidates ?? [];

  const claimsById = new Map(extraction.claims.map((claim) => [claim.id, claim]));
  const primaryCruxClaimId = cruxClaimIds[0];
  const cruxClaimSet = new Set(cruxClaimIds);

  const ranked = [
    ...candidates.filter((stake) => cruxClaimSet.has(stake.claimId)),
    ...candidates.filter((stake) => !cruxClaimSet.has(stake.claimId) && isMajorRole(stake.role)),
  ];

  const projected: ClaimStake[] = [];
  let expectedQuoteCount = 0;
  let groundedQuoteCount = 0;

  for (const candidate of ranked) {
    if (projected.length >= DISAGREEMENT_LIMITS.maxStakesInLedger) break;
    const claim = claimsById.get(candidate.claimId);
    if (!claim) continue;

    const freshQuotes = candidate.groundingQuotes.filter(
      (quote) => !seen.has(normalizeQuoteText(quote.quote)),
    );
    expectedQuoteCount += freshQuotes.length;
    for (const quote of candidate.groundingQuotes) {
      seen.add(normalizeQuoteText(quote.quote));
    }

    const grounding = groundQuotes(source, candidate.groundingQuotes, candidate.id);
    groundedQuoteCount += grounding.refs.filter((ref) =>
      freshQuotes.some((quote) => normalizeQuoteText(quote.quote) === normalizeQuoteText(ref.quote)),
    ).length;
    warnings.push(...grounding.warnings);

    projected.push({
      id: candidate.id,
      claimId: candidate.claimId,
      participantId: candidate.participantId,
      positionId: candidate.positionId,
      claim: claim.statement,
      targetConclusion: candidate.targetConclusion,
      role: candidate.role,
      ifFalseEffect: candidate.ifFalseEffect,
      consequence: candidate.consequence,
      basis: candidate.basis,
      falsificationCondition: candidate.falsificationCondition,
      alternativeBasis: candidate.alternativeBasis,
      diagnostic: deriveStakeDiagnostic(candidate),
      grounding: grounding.refs,
    });
  }

  // The primary crux carries the report; a stake-less primary crux would leave
  // the reader with a hinge and no question attached to it. Mint a neutral,
  // unattributed one rather than letting the model's silence stand as data.
  const primaryStaked =
    primaryCruxClaimId !== undefined &&
    projected.some((stake) => stake.claimId === primaryCruxClaimId);
  if (primaryCruxClaimId && !primaryStaked && projected.length < DISAGREEMENT_LIMITS.maxStakesInLedger) {
    const claim = claimsById.get(primaryCruxClaimId);
    if (claim) {
      warnings.push(`Minted fallback stake for primary crux claim "${primaryCruxClaimId}"`);
      projected.unshift({
        id: "stake-primary-crux-fallback",
        claimId: primaryCruxClaimId,
        claim: claim.statement,
        targetConclusion: extraction.mainQuestion,
        role: "unclear",
        ifFalseEffect: "not-stated",
        consequence: "The source does not state what changes if this claim is false.",
        basis: "unstated",
        diagnostic: "unclear",
        grounding: [],
      });
    }
  }

  const ledger = projected.slice(0, DISAGREEMENT_LIMITS.maxStakesInLedger);
  const gapCount = ledger.filter((stake) => stake.diagnostic === "commitment-gap").length;
  const clearStakeCount = ledger.filter((stake) => stake.diagnostic === "clear-stake").length;

  return {
    accountability: {
      headline: deriveHeadline(ledger),
      summary: deriveSummary(ledger),
      stakes: ledger,
      gapCount,
      clearStakeCount,
    },
    warnings,
    expectedQuoteCount,
    groundedQuoteCount,
  };
}
