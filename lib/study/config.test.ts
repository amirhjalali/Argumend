import { afterEach, describe, expect, it, vi } from "vitest";
import {
  hashProlificId,
  isStudyApiEnabled,
  isStudyPageEnabled,
  studyCompletionUrl,
  studyPidSecret,
  studyScreenoutUrl,
} from "./config";
import { prolificParamsFrom } from "./prolific";

const PID = "5f0c1e2d3b4a596877665544";
const STUDY = "6a1b2c3d4e5f60718293a4b5";

afterEach(() => vi.unstubAllEnvs());

describe("study flags", () => {
  it("are off unless set to exactly 'true'", () => {
    vi.stubEnv("NEXT_PUBLIC_ENABLE_STUDY", "");
    vi.stubEnv("ENABLE_STUDY_RESPONSES", "");
    expect(isStudyPageEnabled()).toBe(false);
    expect(isStudyApiEnabled()).toBe(false);
    vi.stubEnv("NEXT_PUBLIC_ENABLE_STUDY", "1");
    vi.stubEnv("ENABLE_STUDY_RESPONSES", "yes");
    expect(isStudyPageEnabled()).toBe(false);
    expect(isStudyApiEnabled()).toBe(false);
    vi.stubEnv("NEXT_PUBLIC_ENABLE_STUDY", "true");
    vi.stubEnv("ENABLE_STUDY_RESPONSES", "true");
    expect(isStudyPageEnabled()).toBe(true);
    expect(isStudyApiEnabled()).toBe(true);
  });

  it("keep the page flag and the write flag independent", () => {
    vi.stubEnv("NEXT_PUBLIC_ENABLE_STUDY", "true");
    vi.stubEnv("ENABLE_STUDY_RESPONSES", "");
    expect(isStudyPageEnabled()).toBe(true);
    expect(isStudyApiEnabled()).toBe(false);
  });
});

describe("pseudonymous participant ids", () => {
  it("hash a Prolific id to 64 hex characters, keyed by the secret", () => {
    const a = hashProlificId(PID, "a".repeat(32));
    expect(a).toMatch(/^[a-f0-9]{64}$/);
    expect(hashProlificId(PID, "a".repeat(32))).toBe(a);
    expect(hashProlificId(PID, "b".repeat(32))).not.toBe(a);
    expect(a).not.toContain(PID);
  });

  it("refuse a missing or short secret", () => {
    vi.stubEnv("STUDY_PID_SECRET", "");
    expect(studyPidSecret()).toBeNull();
    vi.stubEnv("STUDY_PID_SECRET", "short");
    expect(studyPidSecret()).toBeNull();
    vi.stubEnv("STUDY_PID_SECRET", "x".repeat(32));
    expect(studyPidSecret()).toBe("x".repeat(32));
  });
});

describe("Prolific completion URLs", () => {
  it("are built from the configured code, and absent when it is unset or malformed", () => {
    vi.stubEnv("STUDY_COMPLETION_CODE", "C1A2B3C4");
    expect(studyCompletionUrl()).toBe("https://app.prolific.com/submissions/complete?cc=C1A2B3C4");
    vi.stubEnv("STUDY_COMPLETION_CODE", "");
    expect(studyCompletionUrl()).toBeNull();
    vi.stubEnv("STUDY_COMPLETION_CODE", "bad code&x=1");
    expect(studyCompletionUrl()).toBeNull();
    vi.stubEnv("STUDY_SCREENOUT_CODE", "SCREEN01");
    expect(studyScreenoutUrl()).toBe("https://app.prolific.com/submissions/complete?cc=SCREEN01");
  });
});

describe("Prolific URL parameters", () => {
  it("read PROLIFIC_PID and STUDY_ID and ignore SESSION_ID", () => {
    expect(prolificParamsFrom({ PROLIFIC_PID: PID, STUDY_ID: STUDY, SESSION_ID: "anything" })).toEqual({
      pid: PID,
      studyId: STUDY,
    });
    expect(prolificParamsFrom({ PROLIFIC_PID: [PID, "x"], STUDY_ID: STUDY.toUpperCase() })).toEqual({
      pid: PID,
      studyId: STUDY,
    });
  });

  it("reject a visit without valid Prolific ids", () => {
    expect(prolificParamsFrom({})).toBeNull();
    expect(prolificParamsFrom({ PROLIFIC_PID: PID })).toBeNull();
    expect(prolificParamsFrom({ PROLIFIC_PID: "{{%PROLIFIC_PID%}}", STUDY_ID: STUDY })).toBeNull();
  });
});
