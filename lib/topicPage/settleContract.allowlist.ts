/**
 * Legacy settle lines that still fail the contract in ./settleContract.ts,
 * keyed "<topic id>/<pillar id>", valued with the rules each one breaks.
 *
 * This is known debt, not an exemption: ./settleContract.test.ts fails if a
 * line not listed here breaks a rule, and fails if a listed line now passes
 * (so a fix must delete its entry). Fix a line by adding `settle: { condition }`
 * to the crux in data/topics/<topic>.ts; never by loosening the thresholds.
 *
 * Empty as of 2026-10-06: all 432 legacy lines pass (293 failed before the
 * r4/settle-lines rewrite). Keep it empty; a new map should ship passing.
 */
export const SETTLE_ALLOWLIST: Record<string, string> = {};
