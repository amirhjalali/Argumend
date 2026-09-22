import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  JEV_DEFAULT_DAILY_TOKEN_CEILING,
  isJevBudgetExhausted,
  jevTokensSpentToday,
  recordJevTokens,
  resetJevBudget,
  resolveDailyTokenCeiling,
} from "./budget";

const MONDAY = Date.parse("2026-09-21T10:00:00Z");
const TUESDAY = Date.parse("2026-09-22T00:30:00Z");

describe("jev token budget", () => {
  beforeEach(() => {
    resetJevBudget();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    resetJevBudget();
  });

  it("defaults to five million tokens a day", () => {
    vi.stubEnv("JEV_DAILY_TOKEN_CEILING", "");
    expect(resolveDailyTokenCeiling()).toBe(JEV_DEFAULT_DAILY_TOKEN_CEILING);
  });

  it("reads a configured ceiling and ignores a nonsense one", () => {
    vi.stubEnv("JEV_DAILY_TOKEN_CEILING", "1000");
    expect(resolveDailyTokenCeiling()).toBe(1000);
    vi.stubEnv("JEV_DAILY_TOKEN_CEILING", "not-a-number");
    expect(resolveDailyTokenCeiling()).toBe(JEV_DEFAULT_DAILY_TOKEN_CEILING);
  });

  it("accumulates within a UTC day and resets on the next one", () => {
    recordJevTokens(400, MONDAY);
    recordJevTokens(600, MONDAY);
    expect(jevTokensSpentToday(MONDAY)).toBe(1000);
    expect(jevTokensSpentToday(TUESDAY)).toBe(0);
    recordJevTokens(5, TUESDAY);
    expect(jevTokensSpentToday(TUESDAY)).toBe(5);
  });

  it("reports exhaustion at the ceiling, not above it", () => {
    vi.stubEnv("JEV_DAILY_TOKEN_CEILING", "100");
    recordJevTokens(99, MONDAY);
    expect(isJevBudgetExhausted(MONDAY)).toBe(false);
    recordJevTokens(1, MONDAY);
    expect(isJevBudgetExhausted(MONDAY)).toBe(true);
  });
});
