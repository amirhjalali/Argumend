import type { RawDisagreementExtractionV1, RawGroundingQuote } from "@/types/disagreement";
import { DISAGREEMENT_QUESTION_NODE_ID } from "./constants";

export interface NormalizedExtraction {
  extraction: RawDisagreementExtractionV1;
  warnings: string[];
}

function slugify(value: string, fallback: string): string {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return slug || fallback;
}

function uniqueId(base: string, used: Set<string>): string {
  let candidate = base;
  let index = 2;
  while (used.has(candidate)) {
    candidate = `${base}-${index}`;
    index += 1;
  }
  used.add(candidate);
  return candidate;
}

export function normalizeExtraction(
  raw: RawDisagreementExtractionV1,
): NormalizedExtraction {
  const warnings: string[] = [];
  // The graph builder owns this identity, regardless of model-chosen IDs.
  const used = new Set<string>([DISAGREEMENT_QUESTION_NODE_ID]);
  const participantMap = new Map<string, string>();
  const positionMap = new Map<string, string>();
  const claimMap = new Map<string, string>();

  const participants = raw.participants.map((participant, index) => {
    const nextId = uniqueId(slugify(participant.id, `participant-${index + 1}`), used);
    if (nextId !== participant.id) {
      warnings.push(`Renamed participant "${participant.id}" to "${nextId}"`);
    }
    participantMap.set(participant.id, nextId);
    return { ...participant, id: nextId };
  });

  const seenLabels = new Map<string, string>();
  const duplicateParticipantIds = new Map<string, string>();
  const dedupedParticipants = participants.filter((participant) => {
    const key = participant.label.trim().toLowerCase();
    const existing = seenLabels.get(key);
    if (existing) {
      duplicateParticipantIds.set(participant.id, existing);
      warnings.push(`Deduplicated participant label "${participant.label}"`);
      return false;
    }
    seenLabels.set(key, participant.id);
    return true;
  });

  const remapParticipant = (id: string) => {
    const normalized = participantMap.get(id);
    return normalized ? duplicateParticipantIds.get(normalized) ?? normalized : undefined;
  };
  let droppedQuoteAttributions = 0;
  const remapGroundingQuotes = (quotes: RawGroundingQuote[]) => quotes.map((quote) => {
    if (quote.participantId === undefined) return quote;
    const participantId = remapParticipant(quote.participantId);
    if (participantId === undefined) droppedQuoteAttributions += 1;
    return { ...quote, participantId };
  });

  const positions = raw.positions.map((position, index) => {
    const nextId = uniqueId(slugify(position.id, `position-${index + 1}`), used);
    if (nextId !== position.id) {
      warnings.push(`Renamed position "${position.id}" to "${nextId}"`);
    }
    positionMap.set(position.id, nextId);
    const participantIds = position.participantIds
      .map((id) => remapParticipant(id))
      .filter((id): id is string => Boolean(id));
    if (participantIds.length < position.participantIds.length) {
      warnings.push(`Dropped dangling participant on position "${position.id}"`);
    }
    return {
      ...position,
      id: nextId,
      participantIds,
      groundingQuotes: remapGroundingQuotes(position.groundingQuotes),
    };
  }).filter((position) => {
    if (position.participantIds.length === 0) {
      warnings.push(`Dropped position "${position.id}" with no participants`);
      return false;
    }
    return true;
  });
  const retainedPositionIds = new Set(positions.map((position) => position.id));
  const remapPosition = (id: string) => {
    const normalized = positionMap.get(id);
    return normalized && retainedPositionIds.has(normalized) ? normalized : undefined;
  };

  const seenClaims = new Set<string>();
  const claims = raw.claims.map((claim, index) => {
    const nextId = uniqueId(slugify(claim.id, `claim-${index + 1}`), used);
    claimMap.set(claim.id, nextId);
    return {
      ...claim,
      id: nextId,
      groundingQuotes: remapGroundingQuotes(claim.groundingQuotes),
      participantIds: claim.participantIds
        .map((id) => remapParticipant(id))
        .filter((id): id is string => Boolean(id)),
      acceptedByParticipantIds: claim.acceptedByParticipantIds
        .map((id) => remapParticipant(id))
        .filter((id): id is string => Boolean(id)),
      disputedByParticipantIds: claim.disputedByParticipantIds
        .map((id) => remapParticipant(id))
        .filter((id): id is string => Boolean(id)),
      stanceByPosition: claim.stanceByPosition
        .map((stance) => {
          const positionId = remapPosition(stance.positionId);
          if (!positionId) warnings.push(`Dropped dangling position stance on claim "${claim.id}"`);
          return positionId ? { ...stance, positionId } : null;
        })
        .filter((stance): stance is NonNullable<typeof stance> => Boolean(stance)),
    };
  }).filter((claim) => {
    const key = claim.statement.trim().toLowerCase();
    if (seenClaims.has(key)) {
      warnings.push(`Dropped duplicate claim "${claim.id}"`);
      return false;
    }
    seenClaims.add(key);
    return true;
  });

  const claimIds = new Set(claims.map((claim) => claim.id));
  const claimRelations = raw.claimRelations.filter((relation) => {
    const fromClaimId = claimMap.get(relation.fromClaimId);
    const toClaimId = claimMap.get(relation.toClaimId);
    if (!fromClaimId || !toClaimId || !claimIds.has(fromClaimId) || !claimIds.has(toClaimId)) {
      warnings.push("Dropped dangling claim relation");
      return false;
    }
    relation.fromClaimId = fromClaimId;
    relation.toClaimId = toClaimId;
    return true;
  });

  const commonGroundCandidates = raw.commonGroundCandidates.map((item) => ({
    ...item,
    groundingQuotes: remapGroundingQuotes(item.groundingQuotes),
    participantIds: item.participantIds
      .map((id) => remapParticipant(id))
      .filter((id): id is string => Boolean(id)),
  })).filter((item) => {
    if (item.participantIds.length === 0) {
      warnings.push("Dropped common-ground item with no participants");
      return false;
    }
    return true;
  });

  const disagreementCandidates = raw.disagreementCandidates.map((item, index) => ({
    ...item,
    id: uniqueId(slugify(item.id, `disagreement-${index + 1}`), used),
    groundingQuotes: remapGroundingQuotes(item.groundingQuotes),
    claimIds: item.claimIds.flatMap((id) => {
      const mapped = claimMap.get(id);
      return mapped && claimIds.has(mapped) ? [mapped] : [];
    }),
    participantStances: item.participantStances
      .map((stance) => {
        const participantId = remapParticipant(stance.participantId);
        if (!participantId) return null;
        const positionId = stance.positionId ? remapPosition(stance.positionId) : undefined;
        if (stance.positionId && !positionId) {
          warnings.push(`Preserved disagreement "${item.id}" stance without its dropped position reference`);
        }
        return {
          ...stance,
          participantId,
          positionId,
        };
      })
      .filter((stance): stance is NonNullable<typeof stance> => Boolean(stance)),
  }));

  // Stakes are normalized by COPYING to new objects, never by mutating the raw
  // input (the claimRelations loop above mutates in place; that pattern must
  // not spread). A stake whose claim or participant no longer resolves is a
  // reference to nothing and is dropped; a stake whose OPTIONAL position
  // reference disappears still says something true about the claim, so it
  // survives without the positionId and says so in a warning.
  const claimStakeCandidates = (raw.claimStakeCandidates ?? []).map((stake, index) => {
    const nextId = uniqueId(slugify(stake.id, `stake-${index + 1}`), used);
    const claimId = claimMap.get(stake.claimId);
    if (!claimId || !claimIds.has(claimId)) {
      warnings.push(`Dropped stake "${stake.id}" referencing an unknown claim`);
      return null;
    }
    const participantId = remapParticipant(stake.participantId);
    if (!participantId) {
      warnings.push(`Dropped stake "${stake.id}" referencing an unknown participant`);
      return null;
    }
    let positionId: string | undefined;
    if (stake.positionId) {
      const mappedPosition = remapPosition(stake.positionId);
      if (mappedPosition) {
        positionId = mappedPosition;
      } else {
        warnings.push(`Preserved stake "${stake.id}" without its dropped position reference`);
      }
    }
    return {
      ...stake,
      id: nextId,
      claimId,
      participantId,
      positionId,
      groundingQuotes: remapGroundingQuotes(stake.groundingQuotes),
    };
  }).filter((stake): stake is NonNullable<typeof stake> => Boolean(stake));

  if (droppedQuoteAttributions > 0) {
    warnings.push(`Removed ${droppedQuoteAttributions} unresolved quote participant attribution(s); quoted text was retained.`);
  }

  return {
    extraction: {
      ...raw,
      participants: dedupedParticipants,
      positions,
      claims,
      claimRelations,
      commonGroundCandidates,
      disagreementCandidates,
      claimStakeCandidates,
    },
    warnings,
  };
}
