/**
 * Off-by-default levers for the crux engine and the report projection.
 *
 * docs/CRUX_ENGINE.md freezes the crux formula and the spec forbids letting a
 * model choose or reorder cruxes. These flags exist so the two engine changes
 * recommended in docs/reviews/2026-09-14-crux-recall-diagnosis.md (F6 and
 * F4a) and one presentation-only filter can be measured against the harness
 * without changing what ships. Every flag defaults off, and with every flag
 * off the engine and the projection are byte-identical to the unflagged code.
 *
 * Each flag can be set by environment variable or passed as an options object
 * (tests and the harness use the object form so they never depend on env).
 * An explicit option always wins over the environment.
 */
export interface CruxLeverFlags {
  /**
   * Lever A (memo F6): the redundancy penalty's Jaccard overlap is computed
   * over affected downstream claims only, with positions excluded. Leaf
   * claims that reach the same two positions and nothing else no longer
   * penalise each other.
   */
  redundancyClaimsOnly: boolean;
  /**
   * Lever B (memo F4a): position-aware reach. Direct reach becomes
   * max(R, min(1, sum of |position delta| over affected positions / number
   * of positions)), applied before scoping inheritance.
   */
  positionAwareReach: boolean;
  /**
   * Projection filter C: when the disagreement report chooses which engine
   * cruxes to present, skip a ranked claim that is explicit common ground in
   * the report or that no position disputes, and take the next ranked claim.
   * Engine order is untouched.
   */
  projectionSkipUncontested: boolean;
}

export const CRUX_LEVER_ENV_VARS: Readonly<Record<keyof CruxLeverFlags, string>> = {
  redundancyClaimsOnly: "CRUX_LEVER_REDUNDANCY_CLAIMS_ONLY",
  positionAwareReach: "CRUX_LEVER_POSITION_AWARE_REACH",
  projectionSkipUncontested: "CRUX_PROJECTION_SKIP_UNCONTESTED",
};

export const CRUX_LEVERS_OFF: Readonly<CruxLeverFlags> = Object.freeze({
  redundancyClaimsOnly: false,
  positionAwareReach: false,
  projectionSkipUncontested: false,
});

type Env = Record<string, string | undefined>;

function processEnv(): Env {
  return typeof process === "undefined" || process.env === undefined ? {} : process.env;
}

/** Only the literal strings "true" and "1" (trimmed, case-insensitive) turn a flag on. */
export function envFlagEnabled(value: string | undefined): boolean {
  if (value === undefined) return false;
  const normalized = value.trim().toLowerCase();
  return normalized === "true" || normalized === "1";
}

export function readCruxLeverFlagsFromEnv(env: Env = processEnv()): CruxLeverFlags {
  return {
    redundancyClaimsOnly: envFlagEnabled(env[CRUX_LEVER_ENV_VARS.redundancyClaimsOnly]),
    positionAwareReach: envFlagEnabled(env[CRUX_LEVER_ENV_VARS.positionAwareReach]),
    projectionSkipUncontested: envFlagEnabled(env[CRUX_LEVER_ENV_VARS.projectionSkipUncontested]),
  };
}

/**
 * Environment first, explicit overrides second. Passing `CRUX_LEVERS_OFF`
 * as the override pins every lever off regardless of the environment.
 */
export function resolveCruxLeverFlags(
  overrides: Partial<CruxLeverFlags> = {},
  env: Env = processEnv(),
): CruxLeverFlags {
  const fromEnv = readCruxLeverFlagsFromEnv(env);
  return {
    redundancyClaimsOnly: overrides.redundancyClaimsOnly ?? fromEnv.redundancyClaimsOnly,
    positionAwareReach: overrides.positionAwareReach ?? fromEnv.positionAwareReach,
    projectionSkipUncontested:
      overrides.projectionSkipUncontested ?? fromEnv.projectionSkipUncontested,
  };
}

export function anyCruxLeverOn(flags: CruxLeverFlags): boolean {
  return flags.redundancyClaimsOnly || flags.positionAwareReach || flags.projectionSkipUncontested;
}
