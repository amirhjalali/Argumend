import { identifyCruxes } from "@/lib/crux";
import type { ArgumentGraph, Claim, EpistemicType, Position } from "@/types/argument";

/**
 * Renders an existing topic map as a debate transcript, plus the answer key the
 * map already contains.
 *
 * The diagnosis pipeline is source-only: it sees the transcript and nothing
 * else. Because the transcript is generated from a map whose positions and
 * cruxes were established separately, whatever the pipeline recovers can be
 * compared against that map. This turns the topic library into an evaluation
 * set that needs no hand-authored gold data.
 *
 * The transcript deliberately withholds map vocabulary: no node ids, no
 * position labels, no mention of cruxes. A speaker states a case the way a
 * person would, so recovery is a real inference rather than a lookup.
 */

export interface DebateGroundTruth {
  topicId: string;
  question: string;
  positionCount: number;
  positionIds: string[];
  positionStatements: string[];
  /** Claim ids the deterministic crux engine ranks highest on the source map. */
  cruxClaimIds: string[];
  cruxStatements: string[];
  cruxEpistemicTypes: EpistemicType[];
}

export interface RenderedDebate {
  id: string;
  contentType: "conversation";
  source: string;
  truth: DebateGroundTruth;
}

export interface RenderDebateOptions {
  /** Speaker names, one per position. Neutral by design. */
  speakerNames?: string[];
  /**
   * Ordinary supporting claims voiced per speaker. Crux claims are voiced on
   * top of this cap, never traded against it.
   */
  claimsPerSpeaker?: number;
  maxCharacters?: number;
}

const DEFAULT_SPEAKERS = ["Dana", "Marcus", "Priya", "Tomas", "Iris", "Yusuf", "Nadia", "Owen"];

function isPosition(node: ArgumentGraph["nodes"][number]): node is Position {
  return node.type === "position";
}

function isClaim(node: ArgumentGraph["nodes"][number]): node is Claim {
  return node.type === "claim";
}

/** Strips a trailing period so a statement can be spoken mid-turn. */
function speak(statement: string): string {
  return statement.trim().replace(/\s+/g, " ");
}

/**
 * Claims a position leans on: what it depends on, and what argues for it.
 * Ordered so the position's own dependencies (its load-bearing premises) come
 * first, since those are what a speaker would actually lead with.
 */
function claimsForPosition(graph: ArgumentGraph, positionId: string): Claim[] {
  const claimsById = new Map(graph.nodes.filter(isClaim).map((claim) => [claim.id, claim]));
  const ordered: Claim[] = [];
  const seen = new Set<string>();

  const push = (id: string) => {
    const claim = claimsById.get(id);
    if (!claim || seen.has(id)) return;
    seen.add(id);
    ordered.push(claim);
  };

  for (const edge of graph.edges) {
    if (edge.from === positionId && (edge.type === "depends_on" || edge.type === "premise_of")) {
      push(edge.to);
    }
  }
  for (const edge of graph.edges) {
    if (edge.to === positionId && (edge.type === "supports" || edge.type === "concludes")) {
      push(edge.from);
    }
  }
  return ordered;
}

/** Claims that cut against a position, used to voice a rebuttal turn. */
function objectionsToPosition(graph: ArgumentGraph, positionId: string): Claim[] {
  const claimsById = new Map(graph.nodes.filter(isClaim).map((claim) => [claim.id, claim]));
  const objections: Claim[] = [];
  for (const edge of graph.edges) {
    if (edge.to !== positionId) continue;
    if (edge.type !== "opposes" && edge.type !== "undercuts" && edge.type !== "contradicts") continue;
    const claim = claimsById.get(edge.from);
    if (claim) objections.push(claim);
  }
  return objections;
}

export function renderDebateFromGraph(
  graph: ArgumentGraph,
  options: RenderDebateOptions = {},
): RenderedDebate {
  const names = options.speakerNames ?? DEFAULT_SPEAKERS;
  const claimsPerSpeaker = options.claimsPerSpeaker ?? 2;
  const maxCharacters = options.maxCharacters ?? 12_000;

  const positions = graph.nodes
    .filter(isPosition)
    .slice()
    .sort((a, b) => a.displayRank - b.displayRank);

  if (positions.length < 2) {
    throw new Error(`Graph ${graph.topicId} has fewer than two positions; nothing to render.`);
  }
  if (positions.length > names.length) {
    throw new Error(`Graph ${graph.topicId} has more positions than available speaker names.`);
  }

  const speakerFor = new Map(positions.map((position, index) => [position.id, names[index]]));
  const lines: string[] = [];

  const ranked = identifyCruxes(graph).slice(0, 3);
  const claimsById = new Map(graph.nodes.filter(isClaim).map((claim) => [claim.id, claim]));
  const cruxClaims = ranked
    .map((result) => claimsById.get(result.claimId))
    .filter((claim): claim is Claim => Boolean(claim));

  // A map carries far more claims than a readable transcript can voice, and the
  // claims the crux engine ranks highest are usually not the first ones a
  // position depends on. Voicing only the first few would ask the pipeline to
  // recover a crux that was never in its input, which measures the renderer
  // rather than the pipeline. So each speaker's lines lead with whichever crux
  // claims their own position is wired to.
  const spokenClaims = new Map<string, Claim[]>();
  const assignedCruxIds = new Set<string>();
  for (const position of positions) {
    const related = claimsForPosition(graph, position.id);
    const relatedIds = new Set(related.map((claim) => claim.id));
    const ownCruxes = cruxClaims.filter((claim) => relatedIds.has(claim.id));
    ownCruxes.forEach((claim) => assignedCruxIds.add(claim.id));
    const rest = related.filter((claim) => !ownCruxes.some((crux) => crux.id === claim.id));
    spokenClaims.set(position.id, [...ownCruxes, ...rest.slice(0, claimsPerSpeaker)]);
  }

  // A crux wired to no position still has to be said by someone, or the answer
  // key is absent from the transcript.
  const orphanCruxes = cruxClaims.filter((claim) => !assignedCruxIds.has(claim.id));
  if (orphanCruxes.length > 0) {
    const first = positions[0].id;
    spokenClaims.set(first, [...orphanCruxes, ...(spokenClaims.get(first) ?? [])]);
  }

  // Opening round: each speaker states their own case in their own voice.
  for (const position of positions) {
    lines.push(`${speakerFor.get(position.id)}: ${speak(position.statement)}`);
  }

  // Body: each speaker argues from the claims their position actually rests on.
  const maxDepth = Math.max(...positions.map((position) => spokenClaims.get(position.id)?.length ?? 0));
  for (let depth = 0; depth < maxDepth; depth += 1) {
    for (const position of positions) {
      const claim = spokenClaims.get(position.id)?.[depth];
      if (!claim) continue;
      lines.push(`${speakerFor.get(position.id)}: ${speak(claim.statement)}`);
    }
  }

  // Closing round: a speaker answers the strongest thing said against them.
  for (const position of positions) {
    const objection = objectionsToPosition(graph, position.id)[0];
    if (!objection) continue;
    lines.push(
      `${speakerFor.get(position.id)}: I know the reply is that ${speak(
        objection.statement,
      )} I do not think that settles it.`,
    );
  }

  let source = lines.join("\n");
  if (source.length > maxCharacters) {
    source = source.slice(0, maxCharacters).replace(/\n[^\n]*$/, "");
  }

  return {
    id: graph.topicId,
    contentType: "conversation",
    source,
    truth: {
      topicId: graph.topicId,
      question: graph.question.statement,
      positionCount: positions.length,
      positionIds: positions.map((position) => position.id),
      positionStatements: positions.map((position) => position.statement),
      cruxClaimIds: cruxClaims.map((claim) => claim.id),
      cruxStatements: cruxClaims.map((claim) => claim.statement),
      cruxEpistemicTypes: cruxClaims.map((claim) => claim.epistemicType),
    },
  };
}
