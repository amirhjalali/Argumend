/**
 * The study's fixed vocabulary (pre-registration:
 * docs/plans/2026-11-03-study-plan.md). Every value a participant can send is
 * one of these enums or a bounded integer: the study stores no free text.
 *
 * Changing anything here after the pilot changes the instrument. Bump
 * STUDY_VERSION and say so in the plan's deviations log.
 */

export const STUDY_VERSION = "study-v1" as const;

/** The three maps the study uses. Each participant reads one. */
export const STUDY_TOPICS = [
  "gun-control-effectiveness",
  "immigration-border-crisis",
  "transgender-athletes-sports",
] as const;
export type StudyTopic = (typeof STUDY_TOPICS)[number];

/**
 * The arms, labelled by what the participant reads:
 * map = the Argumend topic page, chatbot = a "both sides" chatbot answer,
 * article = a neutral news explainer. Participants never see these labels.
 */
export const STUDY_ARMS = ["map", "chatbot", "article"] as const;
export type StudyArm = (typeof STUDY_ARMS)[number];

export const STUDY_PARTIES = ["democrat", "republican"] as const;
export type StudyParty = (typeof STUDY_PARTIES)[number];

export const PARTY_STRENGTHS = ["strong", "weak", "lean"] as const;
export type PartyStrength = (typeof PARTY_STRENGTHS)[number];

export const PRIOR_EXPOSURE = ["yes", "no", "unsure"] as const;
export type PriorExposure = (typeof PRIOR_EXPOSURE)[number];

export const DEVICES = ["mobile", "desktop"] as const;
export type StudyDevice = (typeof DEVICES)[number];

/** Statements per topic in the perception-gap block. */
export const GAP_STATEMENT_COUNT = 5;
/** Items in the charity block: reasonable, informed, good faith. */
export const CHARITY_ITEM_COUNT = 3;

/** Own agreement: 1 strongly disagree, 2 disagree, 3 agree, 4 strongly agree. No midpoint. */
export const AGREE_MIN = 1;
export const AGREE_MAX = 4;
/** "Agree" for the actual-share benchmark: 3 or 4. */
export const AGREE_THRESHOLD = 3;

/** Own position on the map's question: 1 definitely no … 6 definitely yes. */
export const ATTITUDE_MIN = 1;
export const ATTITUDE_MAX = 6;

/** The instructed-response item asks for "Disagree" (2 on the agreement scale). */
export const ATTENTION_CORRECT = 2;

/** The reading screen's Continue button unlocks after this many seconds, in every arm. */
export const MIN_STIMULUS_SECONDS = 60;

export function otherParty(party: StudyParty): StudyParty {
  return party === "democrat" ? "republican" : "democrat";
}

export function partyPlural(party: StudyParty): string {
  return party === "democrat" ? "Democrats" : "Republicans";
}
