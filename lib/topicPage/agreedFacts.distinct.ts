/**
 * Cards the agreed-fact detector (lib/topicPage/legacy.ts, agreedFactScores)
 * flags but that a reader checked and found to say something the agreed fact
 * does not, keyed "<topic id>/<evidence id>", valued with the reason. Like
 * data/mapPairs.ts: the detector is word-based, so a card that shares a
 * fact's vocabulary without restating it is listed here rather than the
 * threshold loosened (the moon-landing restatement scores only 0.53).
 *
 * ./agreedFacts.test.ts fails if a listed card is no longer flagged, so an
 * entry is deleted once it stops being needed.
 */
export const DISTINCT_FROM_AGREED_FACT: Record<string, string> = {
  "pandemic-preparedness/100-days-mission":
    "The card is CEPI's 100-day vaccine target; the agreed fact is how a readiness budget is split and where mRNA came from.",
  "immigration-national-identity/nas-immigration-report":
    "The card is the NAS finding on native wages; the agreed fact is about aggregate GDP and fiscal impact.",
  "adhd-overdiagnosis/milder-cases-harm":
    "The card says harms may outweigh benefits in milder cases; the agreed fact says that net effect is poorly studied.",
  "trump-tariffs/american-compass-stealth-boom":
    "The card argues a boom is visible in capex; the agreed fact is only that payrolls do not show one yet.",
};

/**
 * Side summaries the same detector reads as an agreed fact (lib/topicPage/
 * legacy.ts, agreedShareOfSentence) that a reader checked and found to state
 * the side's own case, keyed "<topic id>/<pillar id>/<supporters|skeptics>",
 * valued with the reason. A listed opening may lead that side's position
 * card; ./positionSummaries.test.ts fails once an entry is no longer flagged.
 */
export const DISTINCT_SUMMARY_FROM_AGREED_FACT: Record<string, string> = {
  "moloch/game-theoretic-engine/skeptics":
    "\"The Prisoner's Dilemma is a toy\" denies the model fits real life; the agreed fact is only that its theorems hold.",
  "jones-act/cost-premium/supporters":
    "The side says two parts of the cost are observed; the agreed fact is that its total size rests on an unobservable counterfactual.",
  "longevity-science/senolytics-senescence/skeptics":
    "The side calls the mouse-to-human gap enormous; the agreed fact is only that the gap is real.",
  "sugar-tax-effectiveness/consumption-impact/skeptics":
    "The side claims total sugar intake barely falls; the agreed fact is that purchases of the taxed drinks fall, and intake is the dispute.",
  "trump-tariffs/inflation-passthrough/skeptics":
    "The side says Americans pay the tariff; the other side disputes how much (\"pass-through is partial, not total\"), and the agreed fact is only that most of it falls on US buyers.",
};
