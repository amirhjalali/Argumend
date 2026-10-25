/**
 * Projection filter C (flag CRUX_PROJECTION_SKIP_UNCONTESTED, default off).
 *
 * Decides whether a ranked engine crux should be withheld from the report's
 * crux list because presenting it would hand the reader something nobody in
 * the source disputes. It never re-ranks: the projection walks the engine's
 * order and, when this returns a reason, takes the next ranked claim instead.
 *
 * Two reasons, both drawn only from what the report already records:
 *  - "explicit-common-ground": the claim's statement matches a common-ground
 *    item after harmless whitespace and Unicode normalization, with no
 *    participant, position, or claim relation recorded as contesting it.
 *  - "undisputed": no participant is recorded as disputing the claim, no
 *    position stands in an `opposes` relation to it, and no other claim
 *    contradicts, opposes, or undercuts it (or is contradicted, opposed, or
 *    undercut by it). Any one of those signals keeps the claim.
 *
 * The undisputed test is deliberately conservative: a claim wired as opposing
 * a position is treated as disputed by that position's holders even when no
 * participant is named, so a real crux is never skipped for a missing
 * `disputedBy` entry alone.
 */
export interface ProjectionClaimFacts {
  id: string;
  statement: string;
  disputedByParticipantIds: readonly string[];
  stanceByPosition: ReadonlyArray<{ positionId: string; relation: "supports" | "opposes" }>;
}

export interface ProjectionFilterContext {
  /** Statements of the common-ground items the report presents. */
  commonGroundStatements: readonly string[];
  claimRelations: ReadonlyArray<{ fromClaimId: string; toClaimId: string; type: string }>;
}

export type UncontestedReason = "explicit-common-ground" | "undisputed";

const CONTEST_RELATIONS: ReadonlySet<string> = new Set(["contradicts", "opposes", "undercuts"]);

function normalizeStatement(value: string): string {
  return value.normalize("NFC").trim().replace(/\s+/g, " ").replace(/\.$/, "");
}

/** Shared words cannot establish agreement about roles, direction, or modality. */
export function statementsMatch(a: string, b: string): boolean {
  const normalizedA = normalizeStatement(a);
  const normalizedB = normalizeStatement(b);
  return normalizedA.length > 0 && normalizedA === normalizedB;
}

export function isExplicitCommonGround(
  claim: Pick<ProjectionClaimFacts, "statement">,
  commonGroundStatements: readonly string[],
): boolean {
  return commonGroundStatements.some((statement) => statementsMatch(claim.statement, statement));
}

export function isUndisputed(
  claim: ProjectionClaimFacts,
  claimRelations: ProjectionFilterContext["claimRelations"],
): boolean {
  if (claim.disputedByParticipantIds.length > 0) return false;
  if (claim.stanceByPosition.some((stance) => stance.relation === "opposes")) return false;
  return !claimRelations.some(
    (relation) =>
      CONTEST_RELATIONS.has(relation.type) &&
      (relation.fromClaimId === claim.id || relation.toClaimId === claim.id),
  );
}

export function uncontestedCruxReason(
  claim: ProjectionClaimFacts,
  context: ProjectionFilterContext,
): UncontestedReason | undefined {
  // Conflicting extraction fields are not permission to hide a disagreement.
  if (!isUndisputed(claim, context.claimRelations)) return undefined;
  if (isExplicitCommonGround(claim, context.commonGroundStatements)) return "explicit-common-ground";
  return "undisputed";
}

export function describeUncontestedReason(reason: UncontestedReason): string {
  return reason === "explicit-common-ground"
    ? "it is explicit common ground in the report"
    : "no position disputes it";
}
