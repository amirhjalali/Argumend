import type { RawDisagreementExtractionV1 } from "@/types/disagreement";

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
  const used = new Set<string>();
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
  const dedupedParticipants = participants.filter((participant) => {
    const key = participant.label.trim().toLowerCase();
    const existing = seenLabels.get(key);
    if (existing) {
      participantMap.set(participant.id, existing);
      warnings.push(`Deduplicated participant label "${participant.label}"`);
      return false;
    }
    seenLabels.set(key, participant.id);
    return true;
  });

  const remapParticipant = (id: string) => participantMap.get(id);

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
    return { ...position, id: nextId, participantIds };
  }).filter((position) => {
    if (position.participantIds.length === 0) {
      warnings.push(`Dropped position "${position.id}" with no participants`);
      return false;
    }
    return true;
  });

  const seenClaims = new Set<string>();
  const claims = raw.claims.map((claim, index) => {
    const nextId = uniqueId(slugify(claim.id, `claim-${index + 1}`), used);
    claimMap.set(claim.id, nextId);
    return {
      ...claim,
      id: nextId,
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
          const positionId = positionMap.get(stance.positionId);
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
    claimIds: item.claimIds.flatMap((id) => {
      const mapped = claimMap.get(id);
      return mapped && claimIds.has(mapped) ? [mapped] : [];
    }),
    participantStances: item.participantStances
      .map((stance) => {
        const participantId = remapParticipant(stance.participantId);
        if (!participantId) return null;
        return {
          ...stance,
          participantId,
          positionId: stance.positionId ? positionMap.get(stance.positionId) : undefined,
        };
      })
      .filter((stance): stance is NonNullable<typeof stance> => Boolean(stance)),
  }));

  return {
    extraction: {
      ...raw,
      participants: dedupedParticipants,
      positions,
      claims,
      claimRelations,
      commonGroundCandidates,
      disagreementCandidates,
    },
    warnings,
  };
}
