/**
 * Positive subject checks for five maps whose body/evidence also discusses
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
  ],
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
