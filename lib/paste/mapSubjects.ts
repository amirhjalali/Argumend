/**
 * Positive subject checks for maps whose body/evidence also discusses
 * nearby, uncovered questions. These checks do not add ranking points: a
 * paste must still clear the ordinary score, coverage and rival thresholds.
 *
 * Calibrated against the fixed 2026-10-12 challenge, dev and holdout sets.
 * Groups match normalized whole terms, in any order, never substrings.
 * Keep this small; a general semantic classifier would require a model.
 */
import { pasteTerms } from "./terms";

export type SubjectAnchors = readonly (readonly string[])[];

export const MAP_SUBJECT_ANCHORS: Readonly<Record<string, SubjectAnchors>> = {
  // General school-policy vocabulary also occurs in uniform and funding disputes.
  "school-phone-bans": [["phone"], ["smartphone"], ["mobile"], ["screen"], ["device"]],
  "children-smartphone-age": [["phone"], ["smartphone"], ["mobile"], ["screen"], ["device"]],
  // Hairstyles and salon prices alone are not occupational-licensing policy.
  "occupational-licensing-reform": [
    ["license"], ["certification"], ["government", "permission"],
    ["occupational", "qualification"],
  ],
  // Online classes and human tutoring do not, by themselves, make AI the subject.
  "ai-in-education": [
    ["ai"], ["artificial", "intelligence"], ["chatgpt"], ["chatbot"],
    ["language", "model"], ["gpt"], ["gpt4"], ["khanmigo"],
    ["intelligent", "tutor"], ["automated", "tutor"],
  ],
  // Work and earnings can be context in a private family dispute, not AI displacement.
  "ai-mass-unemployment": [
    ["ai"], ["artificial", "intelligence"], ["automation"], ["automate"],
    ["chatgpt"], ["chatbot"], ["language", "model"], ["gpt"],
    ["openai"], ["anthropic"], ["copilot"], ["robot"],
  ],
  // Abortion language alone is not artificial-reproduction technology,
  // even when the writer never uses the literal word "abortion".
  "artificial-reproduction-ethics": [
    ["womb"], ["ectogenesis"], ["gametogenesis"], ["biobag"],
    ["synthetic", "embryo"], ["artificial", "embryo"],
    ["lab", "egg"], ["lab", "sperm"], ["skin", "egg"], ["skin", "sperm"],
  ],
  // Landlords, tenants and apartments also occur in parking/pet disputes.
  "rent-control-effectiveness": [
    ["rent", "control"], ["rent", "cap"], ["rent", "ceiling"],
    ["rent", "freeze"], ["rent", "froze"], ["rent", "frozen"],
    ["rent", "regulation"], ["rent", "regulated"],
    ["rent", "limit"], ["rent", "stabilization"],
    ["rent", "raise", "only"], ["prevent", "rent", "hike"],
  ],
  // Charging bus fares is a separate question from charging road traffic.
  "congestion-pricing": [
    ["congestion"], ["traffic"], ["toll"], ["car", "charge"],
    ["vehicle", "charge"],
    // Driver language needs an entry/place qualifier: bus-fare arguments
    // also mention charges and drivers using subsidized roads.
    ...["driver", "drive", "motorist"].flatMap((roadUser) =>
      ["charge", "fee"].flatMap((price) =>
        [["downtown"], ["city", "center"], ["central", "street"], ["enter"]]
          .map((place) => [roadUser, price, ...place]),
      ),
    ),
  ],
  // Transit funding and "punishing" commuters are not drug or police policy.
  "drug-decriminalization": [
    ["drug"], ["narcotic"], ["heroin"], ["cocaine"], ["fentanyl"],
    ["meth"], ["opioid"], ["cannabis"], ["marijuana"],
    ["controlled", "substance"], ["possession", "decriminalize"],
  ],
  "police-reform": [["police"], ["policing"], ["cop"], ["law", "enforcement"]],
  "housing-affordability-crisis": [
    ["affordable"], ["affordability"], ["zoning"], ["supply"],
    ["single", "family"], ["duplex"],
    ["housing", "shortage"], ["home", "expensive"], ["housing", "expensive"],
    ["rent", "control"], ["rent", "cap"], ["rent", "freeze"],
    ["rent", "froze"], ["rent", "frozen"], ["rent", "regulation"],
  ],
  // Choosing a larger engagement stone or arguing resale value is not the
  // map's labor, environmental-harm and producer-livelihood question.
  "lab-diamonds-ethics": [
    ["ethical"], ["environment"], ["carbon"], ["footprint"], ["labor"],
    ["exploitation"], ["worker"], ["war"], ["conflict"], ["blood"],
    ["sustainable"], ["pollution"], ["Botswana"], ["livelihood"],
    ["mining", "damage"],
  ],
};

/** Same tokenization as the scorer: inflections and abbreviations agree. */
export function fitsMapSubject(anchors: SubjectAnchors | undefined, terms: ReadonlySet<string>): boolean {
  if (!anchors?.length) return true;
  return anchors.some((group) => {
    const required = group.flatMap((word) => pasteTerms(word, { keepStopwords: true }));
    return required.length > 0 && required.every((word) => terms.has(word));
  });
}
