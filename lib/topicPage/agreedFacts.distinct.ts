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
  "alternatives-to-democracy/ireland-citizens-assembly":
    "The card says the assembly resolved the deadlock; the agreed fact says its recommendation took effect only through a referendum.",
  "trump-tariffs/american-compass-stealth-boom":
    "The card argues a boom is visible in capex; the agreed fact is only that payrolls do not show one yet.",
  "student-debt-forgiveness/tuition-inflation-1200-percent":
    "The card is the size of the tuition rise; the agreed fact is that guaranteed loans removed price discipline.",
};
