/**
 * How the site names a map, and its two sides, to a reader.
 *
 * One name per map, everywhere: a map is named by its question when it has
 * one (every legacy map does since round 2, and flagship titles are
 * questions), else by its title. The old Title-Case `title` stays in the data
 * as an id-like label for places that need a short handle (search matching,
 * alt text fallbacks), never as the name a reader sees next to a heading that
 * asks something else.
 *
 * Data-only, no imports: safe for client components, the route proxy and
 * server code alike.
 */

/** Anything that carries a map's title and, maybe, its question. */
export interface NamedMap {
  title: string;
  question?: string | null;
}

/** The name a reader sees for a map: its question, else its title. */
export function mapDisplayTitle(map: NamedMap): string {
  return map.question?.trim() || map.title;
}

/**
 * The words for a pillar map's two sides.
 *
 * Legacy maps store their sides relative to `meta_claim` (proponent / skeptic),
 * but readers see the question, and each map's question is written so that
 * "yes" agrees with the claim. So a map with a question labels its sides by
 * the answer; a map without one keeps the claim-relative words. Flagship maps
 * don't use this: they name their camps.
 *
 * "Yes" always means yes to the MAP's question, never to a crux's: a crux
 * question can be worded the other way round ("Do nuclear's risks outweigh
 * …?" under "Should nuclear power be expanded?"). So wherever a side is named
 * right under a crux question (the mind-change lead-ins) the words say which
 * question they answer. The short headings ("Says yes") stand where the map's
 * question is the nearest one: the two position cards, the diagram's sides.
 */
export interface SideWords {
  /** Position-card and diagram side heading. */
  yes: string;
  no: string;
  /** Lead-in for "what would change this side's mind", shown under a crux. */
  yesChangesMind: string;
  noChangesMind: string;
  /** Label over an evidence card on that side. */
  yesEvidence: string;
  noEvidence: string;
}

export const ANSWER_SIDES: SideWords = {
  yes: "Says yes",
  no: "Says no",
  yesChangesMind: "Someone who says yes to the map’s question would change their mind if…",
  noChangesMind: "Someone who says no to the map’s question would change their mind if…",
  yesEvidence: "Points to yes",
  noEvidence: "Points to no",
};

export const CLAIM_SIDES: SideWords = {
  yes: "Supporters",
  no: "Skeptics",
  yesChangesMind: "A supporter changes their mind if…",
  noChangesMind: "A skeptic changes their mind if…",
  yesEvidence: "Supports it",
  noEvidence: "Cuts against it",
};

/** The side words for a pillar map: by the answer when it asks a question. */
export function sideWords(map: { question?: string | null }): SideWords {
  return map.question?.trim() ? ANSWER_SIDES : CLAIM_SIDES;
}
