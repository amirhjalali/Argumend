/**
 * Per-process daily token ceiling for the Jev lane.
 *
 * Not a billing system: it is a blast radius. One runaway loop, one scripted
 * replay, one hot thread getting hammered, and the ceiling stops the process
 * from spending past a number the founder chose. It is per process and per UTC
 * day, so a multi-instance deployment gets that ceiling per instance — the
 * docs say so plainly rather than pretending otherwise.
 */
export const JEV_DEFAULT_DAILY_TOKEN_CEILING = 5_000_000;

interface Ledger {
  day: string;
  tokens: number;
}

let ledger: Ledger = { day: "", tokens: 0 };

function utcDay(now: number): string {
  return new Date(now).toISOString().slice(0, 10);
}

export function resolveDailyTokenCeiling(): number {
  // An unset or blank variable must not read as zero, which would refuse
  // every request.
  const configured = process.env.JEV_DAILY_TOKEN_CEILING?.trim();
  if (!configured) return JEV_DEFAULT_DAILY_TOKEN_CEILING;
  const raw = Number(configured);
  if (Number.isFinite(raw) && raw >= 0) return raw;
  return JEV_DEFAULT_DAILY_TOKEN_CEILING;
}

/** Tokens spent so far today by this process. */
export function jevTokensSpentToday(now: number = Date.now()): number {
  return ledger.day === utcDay(now) ? ledger.tokens : 0;
}

export function recordJevTokens(tokens: number, now: number = Date.now()): number {
  const day = utcDay(now);
  if (ledger.day !== day) ledger = { day, tokens: 0 };
  ledger.tokens += Math.max(0, tokens);
  return ledger.tokens;
}

export function isJevBudgetExhausted(now: number = Date.now()): boolean {
  return jevTokensSpentToday(now) >= resolveDailyTokenCeiling();
}

/** Test seam. Never called from the request path. */
export function resetJevBudget(): void {
  ledger = { day: "", tokens: 0 };
}
