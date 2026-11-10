/** Shared fixtures for the study tests. */
import type { StudyRow } from "@/lib/study/analysis";
import type { StudyArm, StudyParty, StudyTopic } from "@/lib/study/constants";
import type { StudyResponse } from "@/lib/study/schema";

export const PID = "5f0c1e2d3b4a596877665544";
export const STUDY_ID = "6a1b2c3d4e5f60718293a4b5";

export function validResponse(overrides: Partial<StudyResponse> = {}): StudyResponse {
  return {
    version: "study-v1",
    prolificPid: PID,
    prolificStudyId: STUDY_ID,
    party: "democrat",
    partyStrength: "strong",
    topic: "gun-control-effectiveness",
    arm: "map",
    pre: { perceived: 8, attitude: 5, ownAgree: [3, 4, 4, 2, 4], otherEstimate: [40, 30, 20, 80, 25], charity: [3, 4, 5] },
    post: { perceived: 6, attitude: 5, ownAgree: [3, 4, 4, 2, 4], otherEstimate: [55, 50, 35, 80, 45], charity: [5, 5, 6] },
    cruxChoice: "laws-vs-other-factors",
    attention: 2,
    fairness: 8,
    learned: 6,
    priorExposure: "no",
    stimulusSeconds: 180,
    totalSeconds: 700,
    stimulusOpened: 2,
    device: "desktop",
    ...overrides,
  };
}

let counter = 0;

/** A stored row, as the report reads it. */
export function row(
  topic: StudyTopic,
  arm: StudyArm,
  party: StudyParty,
  overrides: Partial<StudyRow> = {},
): StudyRow {
  counter += 1;
  return {
    version: "study-v1",
    pidHash: counter.toString(16).padStart(64, "0"),
    prolificStudyId: STUDY_ID,
    party,
    partyStrength: "strong",
    topic,
    arm,
    perceivedPre: 8,
    perceivedPost: 7,
    attitudePre: 3,
    attitudePost: 3,
    ownAgreePre: [3, 3, 3, 3, 3],
    ownAgreePost: [3, 3, 3, 3, 3],
    otherEstimatePre: [50, 50, 50, 50, 50],
    otherEstimatePost: [50, 50, 50, 50, 50],
    charityPre: [5, 5, 5],
    charityPost: [5, 5, 5],
    cruxChoice: "laws-vs-other-factors",
    attention: 2,
    fairness: 7,
    learned: 5,
    priorExposure: "no",
    stimulusSeconds: 150,
    totalSeconds: 600,
    stimulusOpened: 0,
    device: "desktop",
    completedOn: "2026-11-20",
    ...overrides,
  };
}
