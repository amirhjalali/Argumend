// ============================================================================
// "Is [claim] true?" Landing Page Data
// ============================================================================
//
// Maps URL slugs to topic IDs, question text, and the central claim.
// Each entry generates a programmatic landing page at /is/[slug].

export interface IsClaim {
  /** URL-safe slug, e.g. "climate-change-real" → /is/climate-change-real */
  slug: string;
  /** The topic ID in data/topics (must match an existing topic.id) */
  topicId: string;
  /** The question rendered as the H1, e.g. "Is climate change real?" */
  question: string;
  /** The affirmative claim that the evidence is evaluated against */
  claim: string;
}

export const isClaims: IsClaim[] = [
  {
    slug: "climate-change-real",
    topicId: "climate-change",
    question: "Is climate change real?",
    claim:
      "Climate change is real and primarily caused by human activity",
  },
  {
    slug: "nuclear-energy-safe",
    topicId: "nuclear-energy-safety",
    question: "Is nuclear energy safe?",
    claim:
      "Nuclear energy is safe enough to scale as a climate solution",
  },
  {
    slug: "ai-dangerous",
    topicId: "ai-risk",
    question: "Is AI dangerous?",
    claim:
      "Artificial intelligence poses an existential risk to humanity",
  },
  {
    slug: "fluoride-safe",
    topicId: "fluoride-water-supplies",
    question: "Is fluoride in water safe?",
    claim: "Water fluoridation at recommended levels is safe",
  },
  {
    slug: "free-will-real",
    topicId: "free-will",
    question: "Is free will real?",
    claim: "Humans have genuine free will",
  },
  {
    slug: "gun-control-effective",
    topicId: "gun-control-effectiveness",
    question: "Is gun control effective?",
    claim:
      "Gun control policies effectively reduce gun violence",
  },
  {
    slug: "universal-healthcare-better",
    topicId: "universal-healthcare",
    question: "Is universal healthcare better?",
    claim:
      "Universal healthcare systems produce better outcomes than market-based systems",
  },
  {
    slug: "ubi-feasible",
    topicId: "universal-basic-income",
    question: "Is universal basic income feasible?",
    claim:
      "Universal basic income is economically feasible at scale",
  },
  {
    slug: "cryptocurrency-valuable",
    topicId: "cryptocurrency-value",
    question: "Is cryptocurrency actually valuable?",
    claim:
      "Cryptocurrencies have genuine, sustainable economic value",
  },
  {
    slug: "death-penalty-effective",
    topicId: "death-penalty-deterrence",
    question: "Is the death penalty effective?",
    claim:
      "The death penalty effectively deters serious crime",
  },
];
