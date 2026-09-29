/**
 * Server-side data for the home page: the flagship crux worked through in
 * beat 2 and the three flagship maps listed as crux questions in beat 3.
 *
 * Everything here reads the same ArgumentGraph maps, engine ranking and
 * public crux ledger that /topics/[id] and /ai render, so home cannot show a
 * crux, a condition or a movement the map page does not. No copy is authored
 * here: questions come from the map's crux notes or the claim's own summary.
 */
import type { Claim, ResolutionKind } from "@/types/argument";
import { loadArgumentTopic } from "@/lib/argument/draftTopics";
import { argumentTopicIndex } from "@/lib/argument/topicIds";
import { claimMovement, isPublicEntry, type CruxMovementEntry } from "@/lib/argument/ledger";
import { settleMode, type SettleMode } from "@/components/argument/DebateView";

/** The map home's primary button opens, and whose first crux beat 2 works through. */
export const HOME_FLAGSHIP_ID = "ai-mass-unemployment";
export const HOME_FLAGSHIP_HREF = `/topics/${HOME_FLAGSHIP_ID}`;

/**
 * The public write-up behind home's one line of evidence (the 36-minute
 * televised debate, 88 of 114 turns off the question in its title).
 */
export const HOME_EVIDENCE_HREF = "/blog/we-gave-a-model-that-cant-talk-1000-arguments";

export interface HomeCrux {
  topicId: string;
  topicTitle: string;
  /** How many cruxes the map's engine emitted. */
  cruxCount: number;
  /** 1-based rank inside its own map. */
  rank: number;
  claimId: string;
  /** The question as the map page words it. */
  question: string;
  /** Nobody in the debate says it out loud, but the positions lean on it. */
  implicit: boolean;
  mode: SettleMode;
  kind?: ResolutionKind;
  condition?: string;
  resolved: boolean;
  /** Authored "why it is still open" (the map's crux note), when there is one. */
  fight?: string;
  /** Authored "what each answer changes", when there is one. */
  soWhat?: string;
  /** The public, dated record of how this crux has moved. */
  movement: CruxMovementEntry[];
}

export interface HomeMap {
  id: string;
  title: string;
  href: string;
  positionCount: number;
  cruxCount: number;
  /** The highest-ranked crux not already shown higher on the page. */
  crux: HomeCrux | null;
}

function cruxAt(topicId: string, index: number): HomeCrux | null {
  const topic = loadArgumentTopic(topicId);
  if (!topic) return null;
  const ranked = topic.cruxes[index];
  if (!ranked) return null;
  const claim = topic.graph.nodes.find(
    (node): node is Claim => node.type === "claim" && node.id === ranked.claimId,
  );
  if (!claim) return null;

  // Same rules as the map page's crux sheet (components/argument/DebateView):
  // public ledger entries only; a resolved entry outranks an authored value
  // fork; an unresolvable entry names its kind of fork.
  const movement = claimMovement(topic.ledger.filter(isPublicEntry), claim.id);
  const latest = movement.at(-1)?.entry;
  const status = latest?.status;
  const note = topic.meta.cruxNotes?.[claim.id];

  return {
    topicId,
    topicTitle: topic.meta.title,
    cruxCount: topic.cruxes.length,
    rank: index + 1,
    claimId: claim.id,
    question: note?.question ?? claim.summary ?? claim.statement,
    implicit: claim.implicit === true,
    mode: settleMode(claim, status),
    kind:
      status === "unresolvable"
        ? (latest?.resolutionKind ?? claim.resolution?.kind)
        : claim.resolution?.kind,
    condition: claim.resolution?.condition,
    resolved: status === "resolved",
    fight: note?.fight,
    soWhat: note?.soWhat,
    movement,
  };
}

/** Crux #1 of the flagship map: the worked example on home. */
export function loadHomeCrux(topicId: string = HOME_FLAGSHIP_ID): HomeCrux | null {
  return cruxAt(topicId, 0);
}

/**
 * The three flagship maps, each with the first crux not already shown above
 * it (so the flagship row does not repeat the worked example).
 */
export function loadHomeMaps(shownClaimIds: ReadonlySet<string> = new Set()): HomeMap[] {
  return argumentTopicIndex.flatMap((entry) => {
    const topic = loadArgumentTopic(entry.id);
    if (!topic) return [];
    let crux: HomeCrux | null = null;
    for (let index = 0; index < topic.cruxes.length; index += 1) {
      const candidate = cruxAt(entry.id, index);
      if (candidate && !shownClaimIds.has(candidate.claimId)) {
        crux = candidate;
        break;
      }
    }
    return [
      {
        id: entry.id,
        title: topic.meta.title,
        href: `/topics/${entry.id}`,
        positionCount: topic.graph.nodes.filter((node) => node.type === "position").length,
        cruxCount: topic.cruxes.length,
        crux,
      },
    ];
  });
}

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

/** "five", for counts a reader should read as words. */
export function numberWord(n: number): string {
  return NUMBER_WORDS[n] ?? String(n);
}
