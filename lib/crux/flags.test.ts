import { describe, expect, it } from "vitest";
import {
  CRUX_LEVERS_OFF,
  CRUX_LEVER_ENV_VARS,
  anyCruxLeverOn,
  envFlagEnabled,
  readCruxLeverFlagsFromEnv,
  resolveCruxLeverFlags,
} from "./flags";

describe("crux lever flags", () => {
  it("default to off with an empty environment", () => {
    expect(resolveCruxLeverFlags({}, {})).toEqual(CRUX_LEVERS_OFF);
    expect(readCruxLeverFlagsFromEnv({})).toEqual(CRUX_LEVERS_OFF);
    expect(anyCruxLeverOn(CRUX_LEVERS_OFF)).toBe(false);
  });

  it("treat only the literal strings true and 1 as on", () => {
    expect(envFlagEnabled("true")).toBe(true);
    expect(envFlagEnabled(" TRUE ")).toBe(true);
    expect(envFlagEnabled("1")).toBe(true);
    for (const value of ["yes", "on", "0", "false", "", undefined]) {
      expect(envFlagEnabled(value)).toBe(false);
    }
  });

  it("read each environment variable independently", () => {
    expect(readCruxLeverFlagsFromEnv({ [CRUX_LEVER_ENV_VARS.redundancyClaimsOnly]: "true" })).toEqual({
      ...CRUX_LEVERS_OFF,
      redundancyClaimsOnly: true,
    });
    expect(readCruxLeverFlagsFromEnv({ [CRUX_LEVER_ENV_VARS.positionAwareReach]: "1" })).toEqual({
      ...CRUX_LEVERS_OFF,
      positionAwareReach: true,
    });
    expect(
      readCruxLeverFlagsFromEnv({ [CRUX_LEVER_ENV_VARS.projectionSkipUncontested]: "true" }),
    ).toEqual({ ...CRUX_LEVERS_OFF, projectionSkipUncontested: true });
  });

  it("let an explicit override win over the environment and fall through when omitted", () => {
    const env = {
      [CRUX_LEVER_ENV_VARS.redundancyClaimsOnly]: "true",
      [CRUX_LEVER_ENV_VARS.positionAwareReach]: "true",
    };
    expect(resolveCruxLeverFlags({ redundancyClaimsOnly: false }, env)).toEqual({
      redundancyClaimsOnly: false,
      positionAwareReach: true,
      projectionSkipUncontested: false,
    });
    expect(resolveCruxLeverFlags(CRUX_LEVERS_OFF, env)).toEqual(CRUX_LEVERS_OFF);
    expect(resolveCruxLeverFlags({ projectionSkipUncontested: true }, {})).toEqual({
      ...CRUX_LEVERS_OFF,
      projectionSkipUncontested: true,
    });
  });
});
