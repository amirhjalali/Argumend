/**
 * Contestedness overrides (crux engine v1.2).
 *
 * `docs/CRUX_ENGINE.md` makes the editorial `status` the primary contestedness
 * term and forbids manufacturing contestedness from edge counts. The balance
 * modulator — how evenly support and opposition flow into a claim — is a
 * structural *proxy* for "the source actually argues about this". An external
 * calibrated probe that reads the source and returns a probability is a
 * measurement of the same quantity, so it replaces the proxy rather than the
 * status.
 *
 * Three rules keep that honest:
 *
 *  - **The probe can only lower C.** `C' = min(statusWeight x probe, the
 *    balance-derived C)`. The first draft of this module dropped the min and
 *    was wrong: because the balance modulator never falls below
 *    `0.5 x statusWeight`, any probe above it *raised* C, and on
 *    ai-mass-unemployment a 0.98 lifted a claim from rank 13 into the served
 *    top-5. A model that can lift a claim into the served set is a model
 *    nominating a crux, which `docs/CRUX_ENGINE.md` forbids. With the clamp
 *    the probe is a veto and nothing else: it can demote a claim, it can drop
 *    one out of candidacy, and it can never promote one.
 *  - **Candidacy is still editorial.** `status ∈ {contested, unresolved}` OR
 *    `implicit` OR a pin, unchanged; the status prefactor survives the
 *    override, so an `uncontested` claim scores 0 however confident the probe
 *    is. The probe narrows the candidate set and never widens it.
 *  - **Silence is not a zero.** A probe that cannot see a claim in the source
 *    must withhold its number, not report a low one. `contestednessOverridesFrom`
 *    enforces that with the presence signal; a claim judged absent gets no
 *    override at all and keeps today's balance-derived contestedness. A probe
 *    that returned no answer at all is likewise absent, never a zero.
 *
 * Nothing in this module calls the network. A probe is supplied through
 * `ContestednessProvider`; `lib/crux/contestedness.test.ts` implements it with
 * a fixture and `scripts/jev-probe/crux-contestedness.ts` implements it live,
 * so the engine stays testable with no API key.
 */

/** A claim as a probe sees it: an id to key the answer by, and the proposition. */
export interface ContestednessClaim {
  id: string;
  statement: string;
}

export interface ContestednessRequest {
  /**
   * The exact text the probe should read. It must be the text the claims were
   * extracted from — a probe run against different bytes than the extraction
   * saw measures the renderer, not the disagreement.
   */
  source: string;
  /** Optional framing question, when the source has one. */
  question?: string;
  claims: readonly ContestednessClaim[];
}

export interface ContestednessProbe {
  /**
   * 0..1 — the probability that the source's speakers actually take opposing
   * sides on this claim.
   */
  contested: number;
  /**
   * 0..1 — the probability that the claim is discussed in the source at all.
   * Undefined means presence was not measured, in which case the contested
   * value is taken at face value.
   */
  present?: number;
}

export interface ContestednessProvider {
  probe(request: ContestednessRequest): Promise<Record<string, ContestednessProbe>>;
}

/**
 * Claims whose probe value falls below this drop out of crux candidacy
 * entirely, rather than merely ranking lower. Set from the probe's own
 * separation: in `docs/reviews/2026-09-16-jev-typesafe-probe.md` every claim
 * the transcripts argue over scored >= 0.76 and every planted or flagged
 * non-dispute scored <= 0.21, so 0.25 sits inside an empty band.
 */
export const DEFAULT_CANDIDACY_FLOOR = 0.25;

/**
 * Below this presence probability the probe is treated as unable to see the
 * claim, and its contested value is discarded instead of applied. The probe
 * conflates "nobody disputes it" with "nobody mentions it" (probe review,
 * round 2), and only the first is evidence about contestedness.
 */
export const DEFAULT_PRESENCE_FLOOR = 0.5;

export interface OverrideDerivation {
  /** Claim id -> contestedness override in 0..1, ready for `identifyCruxes`. */
  overrides: Record<string, number>;
  /** Claims the probe judged absent from the source; deliberately un-overridden. */
  absentClaimIds: string[];
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/**
 * Validates a caller-supplied override map into something the engine can
 * index safely.
 *
 * A non-finite value is treated as **absent**, not as zero: `NaN < floor` is
 * false, so an unvalidated NaN would slip past the candidacy floor and then
 * land at C = 0 — the worst of both, a silent maximal demotion that the gate
 * never reports. Values outside 0..1 are clamped. A Map is returned rather
 * than the plain object so a claim id like `constructor` or `__proto__`
 * cannot resolve to something off the prototype chain.
 */
export function normalizeContestednessOverrides(
  overrides: Readonly<Record<string, number>> | undefined,
): Map<string, number> {
  const normalized = new Map<string, number>();
  if (overrides === undefined) return normalized;
  for (const [claimId, value] of Object.entries(overrides)) {
    if (typeof value !== "number" || !Number.isFinite(value)) continue;
    normalized.set(claimId, clamp01(value));
  }
  return normalized;
}

/**
 * Turns raw probe answers into the override map the engine accepts, dropping
 * claims the probe could not see in the source.
 */
export function contestednessOverridesFrom(
  probes: Readonly<Record<string, ContestednessProbe>>,
  options: { presenceFloor?: number } = {},
): OverrideDerivation {
  const presenceFloor = options.presenceFloor ?? DEFAULT_PRESENCE_FLOOR;
  const overrides: Record<string, number> = {};
  const absentClaimIds: string[] = [];

  for (const [claimId, probe] of Object.entries(probes)) {
    // A non-finite presence reading is "not measured", so it must not be read
    // as "absent"; a non-finite contested reading is no answer at all.
    const present = Number.isFinite(probe.present) ? clamp01(probe.present as number) : undefined;
    if (present !== undefined && present < presenceFloor) {
      absentClaimIds.push(claimId);
      continue;
    }
    if (!Number.isFinite(probe.contested)) {
      absentClaimIds.push(claimId);
      continue;
    }
    overrides[claimId] = clamp01(probe.contested);
  }

  return { overrides, absentClaimIds: absentClaimIds.sort() };
}

/**
 * The combination rule: `C' = min(statusWeight(status) x override, balanceC)`.
 *
 * The probe replaces the balance modulator `(0.5 + 0.5 x balance)` rather than
 * multiplying it, so both forms sit on one scale under one prefactor — see the
 * alternatives in `docs/reviews/2026-09-21-jev-contestedness-gate.md`. The
 * status prefactor is kept so an editorially uncontested claim still scores
 * zero however confident the probe is, and the `min` against the existing
 * balance-derived value makes the override strictly a veto: it can lower C,
 * never raise it, so the probe can never promote a claim into the served set.
 */
export function overriddenContestedness(
  statusWeight: number,
  override: number,
  balanceContestedness: number,
): number {
  return Math.min(statusWeight * clamp01(override), balanceContestedness);
}

/**
 * The projection's reason line, in the same shape as the report's other
 * skip reasons: a clause that completes "Projection skipped engine crux
 * "c-1" (statement): ...".
 */
export function describeProbeSkip(probe: number, floor: number): string {
  return `the contestedness probe scored it ${probe.toFixed(2)}, below the ${floor.toFixed(2)} floor`;
}

export const CRUX_PROJECTION_JEV_GATE_ENV = "CRUX_PROJECTION_JEV_GATE";

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

/**
 * Environment first, explicit override second. Defaults off: with no flag and
 * no override the projection behaves exactly as it does today.
 */
export function jevProjectionGateEnabled(
  override?: boolean,
  env: Env = processEnv(),
): boolean {
  return override ?? envFlagEnabled(env[CRUX_PROJECTION_JEV_GATE_ENV]);
}
