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
  /** What a supporter of the map's claim would need to see to change their mind. */
  supporterFlip?: string;
  /** What a skeptic would need to see. */
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
  /** What the cards' sides are relative to: the map's claim, or the crux's claim. */
  cardsAbout: "map-claim" | "crux-claim";
}

/**
 * How the map lane reached its answer, for the "How this was read"
 * disclosure. Scores are keyword-overlap (BM25) scores: comparable within one
 * paste, never across pastes, and never shown as a verdict on anything.
 */
export interface PasteMapReading {
  method: "keyword-index";
  mapsSearched: number;
  topScore: number | null;
  runnerUpScore: number | null;
  /** The pack a match has to stand clear of: the mean score of ranks 3 to 6. */
  packScore: number | null;
  minScore: number;
  leadRatio: number;
  elapsedMs: number;
}

export interface PasteMapsResult {
  /**
   * "matched": one map stands clear of the rest; "closest": some maps share
   * words with the paste but none stands clear; "none": nothing came close.
   */
  status: "matched" | "closest" | "none";
  match: PasteMapMatch | null;
  /** Two when matched, up to three otherwise, so no answer names more than three maps. */
  closest: PasteMapCandidate[];
  reading: PasteMapReading;
}
