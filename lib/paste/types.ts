/**
 * Shapes shared by the paste flow's server lanes and its client.
 *
 * Pure types: no environment reads, no data imports. The client imports this
 * module directly, so it must stay free of anything that pulls topic data or
 * server code into the browser bundle.
 */
import type { AiProviderId } from "@/lib/aiProviders";

export type PasteContentType = "conversation" | "article" | "freeform";

/**
 * Which lanes will run for a paste on this deployment, decided on the server
 * at request time and handed to the client, so the consent line describes the
 * lane that actually runs rather than every lane that could.
 */
export interface PasteLanes {
  /** Always on: offline keyword matching against the site's maps. */
  maps: true;
  diagnosis: PasteDiagnosisLane;
}

export type PasteDiagnosisLane =
  | { enabled: false }
  | {
      enabled: true;
      /** Providers the pasted text is sent to. Empty when the lane sends nothing anywhere. */
      providerIds: AiProviderId[];
      /** True on the fixture lane, which answers from canned data. */
      fixtures: boolean;
    };

/** One piece of evidence from a map, without its weight score. */
export interface PasteMapCard {
  id: string;
  /** Relative to `PasteMapMatch.cardsAbout`. */
  side: "for" | "against";
  title: string;
  description: string;
  source?: string;
  sourceUrl?: string;
}

export interface PasteMapCrux {
  /** The question the crux asks, as the map words it. */
  question: string;
  /** What someone who says yes (agrees with the map's claim) would need to see to change their mind. */
  supporterFlip?: string;
  /** What someone who says no would need to see. */
  skepticFlip?: string;
  /** How it could be settled, when the map has no supporter/skeptic framing. */
  settle?: string;
  /** Where the sides part, in the map's words. */
  fight?: string;
  /** The map page, anchored at this crux where the page exposes an anchor. */
  href: string;
}

export interface PasteMapCandidate {
  id: string;
  title: string;
  claim: string;
  href: string;
}

export interface PasteMapMatch extends PasteMapCandidate {
  /** "map": a pillar map; "flagship": an ArgumentGraph debate map. */
  kind: "map" | "flagship";
  crux: PasteMapCrux | null;
  /** At most one card per side, strongest first. */
  cards: PasteMapCard[];
  /**
   * What the cards' sides (and the crux's two mind-changes) are relative to:
   * the answer to the map's question ("Points to yes" / "Points to no"), the
   * map's claim when it has no question, or the crux's claim (flagships).
   */
  cardsAbout: "map-question" | "map-claim" | "crux-claim";
}

/**
 * How the map lane reached its answer, for the "How this was read"
 * disclosure. Scores are keyword-overlap (BM25F) scores: comparable within
 * one paste, never across pastes, and never shown as a verdict on anything.
 */
export interface PasteMapReading {
  method: "keyword-index";
  mapsSearched: number;
  /** The best map's score. */
  topScore: number | null;
  /** The best score among maps on a different subject from the best map. */
  rivalScore: number | null;
  /** topScore over rivalScore; null when no other map shares a word. */
  lead: number | null;
  /** The same lead counting only the words where the two maps differ. */
  exclusiveLead: number | null;
  /** Share of the paste's words the best map accounts for, 0 to 1. */
  coverage: number | null;
  /** A map is named only when `lead` reaches this... */
  minLead: number;
  /** ...and `exclusiveLead` this... */
  minExclusiveLead: number;
  /** ...and it scores at least this, or (a short paste) accounts for `minCoverage` of the words. */
  minScore: number;
  minCoverage: number;
  /** Matching time for this paste, index already built. */
  matchMs: number;
  /** The whole call, including building the index on a process's first paste. */
  elapsedMs: number;
}

export interface PasteMapsResult {
  /**
   * "matched": one map stands clear of every map on a different subject;
   * "closest": some maps share words with the paste but none stands clear;
   * "none": nothing came close.
   */
  status: "matched" | "closest" | "none";
  match: PasteMapMatch | null;
  /**
   * Maps on the same subject as the match (a sibling such as the small-reactor
   * map beside the nuclear-power map), shown as "closely related". Empty
   * unless a map is matched.
   */
  related: PasteMapCandidate[];
  /** Other maps worth a look. No answer names more than three maps in all. */
  closest: PasteMapCandidate[];
  reading: PasteMapReading;
}
