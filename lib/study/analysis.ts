/**
 * The pre-registered analysis (docs/plans/2026-11-03-study-plan.md,
 * "Analysis plan"), as code, so the numbers the plan promises are the numbers
 * the report prints.
 *
 * Perception gap, per participant and phase: the mean, over the topic's five
 * statements, of |estimate − actual|, where `actual` is the share (0–100) of
 * the OTHER party's analysable participants on the same topic who agreed (3
 * or 4) with the statement BEFORE reading, pooled across arms. Pre-reading
 * answers are the benchmark because the post answers may have been moved by
 * the arm; the post benchmark is a sensitivity check.
 *
 * Primary model (H1): OLS of post gap on arm (map as reference), pre gap,
 * topic, party and device, with HC2 robust standard errors. H1 holds only if
 * both arm coefficients are positive (the map arm's post gap is smaller) and
 * both two-sided p < 0.05: an intersection-union test, so no correction is
 * applied to the pair.
 */
import { isCruxChoiceCorrect } from "@/data/study/instruments";
import {
  AGREE_THRESHOLD,
  ATTENTION_CORRECT,
  STUDY_ARMS,
  STUDY_TOPICS,
  STUDY_VERSION,
  otherParty,
  type StudyArm,
  type StudyParty,
  type StudyTopic,
} from "./constants";

/** One stored response, in the shape the report reads from `study_responses`. */
export interface StudyRow {
  version: string;
  pidHash: string;
  prolificStudyId: string;
  party: StudyParty;
  partyStrength: string;
  topic: StudyTopic;
  arm: StudyArm;
  perceivedPre: number;
  perceivedPost: number;
  attitudePre: number;
  attitudePost: number;
  ownAgreePre: number[];
  ownAgreePost: number[];
  otherEstimatePre: number[];
  otherEstimatePost: number[];
  charityPre: number[];
  charityPost: number[];
  cruxChoice: string;
  attention: number;
  fairness: number;
  learned: number;
  priorExposure: string;
  stimulusSeconds: number;
  totalSeconds: number;
  stimulusOpened: number;
  device: string;
  completedOn: string;
}

/** Pre-registered exclusions. Anything else stays in. */
export const MIN_TOTAL_SECONDS = 240;

export type ExclusionReason = "version" | "attention" | "too-fast";

export function exclusionReason(row: StudyRow): ExclusionReason | null {
  if (row.version !== STUDY_VERSION) return "version";
  if (row.attention !== ATTENTION_CORRECT) return "attention";
  if (row.totalSeconds < MIN_TOTAL_SECONDS) return "too-fast";
  return null;
}

const mean = (values: number[]) => values.reduce((a, b) => a + b, 0) / values.length;

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function sd(values: number[]): number {
  const m = mean(values);
  return Math.sqrt(values.reduce((acc, v) => acc + (v - m) ** 2, 0) / Math.max(1, values.length - 1));
}

/** shares[topic][party][statementIndex] = % of that party's participants on that topic who agree. */
export type ActualShares = Partial<Record<StudyTopic, Partial<Record<StudyParty, number[]>>>>;

export function actualShares(rows: StudyRow[], phase: "pre" | "post" = "pre"): ActualShares {
  const shares: ActualShares = {};
  for (const topic of STUDY_TOPICS) {
    for (const party of ["democrat", "republican"] as const) {
      const group = rows.filter((row) => row.topic === topic && row.party === party);
      if (group.length === 0) continue;
      const answers = group.map((row) => (phase === "pre" ? row.ownAgreePre : row.ownAgreePost));
      const share = answers[0].map(
        (_, index) => (100 * answers.filter((a) => a[index] >= AGREE_THRESHOLD).length) / answers.length,
      );
      (shares[topic] ??= {})[party] = share;
    }
  }
  return shares;
}

/** Mean absolute (or signed: estimate − actual) error about the other party, in percentage points. */
export function perceptionGap(
  row: StudyRow,
  shares: ActualShares,
  phase: "pre" | "post",
  signed = false,
): number | null {
  const actual = shares[row.topic]?.[otherParty(row.party)];
  if (!actual) return null;
  const estimates = phase === "pre" ? row.otherEstimatePre : row.otherEstimatePost;
  const errors = estimates.map((estimate, index) => estimate - actual[index]);
  return mean(signed ? errors : errors.map(Math.abs));
}

export const charityIndex = (values: number[]) => mean(values);

// ── OLS with HC2 robust standard errors ──────────────────────────────────────

function invert(matrix: number[][]): number[][] {
  const n = matrix.length;
  const a = matrix.map((row, i) => [...row, ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))]);
  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let r = col + 1; r < n; r++) if (Math.abs(a[r][col]) > Math.abs(a[pivot][col])) pivot = r;
    if (Math.abs(a[pivot][col]) < 1e-12) throw new Error("design matrix is singular");
    [a[col], a[pivot]] = [a[pivot], a[col]];
    const p = a[col][col];
    for (let j = 0; j < 2 * n; j++) a[col][j] /= p;
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const f = a[r][col];
      if (f === 0) continue;
      for (let j = 0; j < 2 * n; j++) a[r][j] -= f * a[col][j];
    }
  }
  return a.map((row) => row.slice(n));
}

/** Standard normal CDF (Abramowitz & Stegun 7.1.26 erf; error below 1.5e-7). */
export function normalCdf(z: number): number {
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const poly = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  const erf = 1 - poly * Math.exp(-x * x);
  return z >= 0 ? 0.5 * (1 + erf) : 0.5 * (1 - erf);
}

export interface Coefficient {
  name: string;
  estimate: number;
  se: number;
  z: number;
  p: number;
}

export function olsHc2(y: number[], X: number[][], names: string[]): Coefficient[] {
  const k = names.length;
  const xtx = Array.from({ length: k }, (_, i) =>
    Array.from({ length: k }, (_, j) => X.reduce((acc, row) => acc + row[i] * row[j], 0)),
  );
  const inv = invert(xtx);
  const xty = Array.from({ length: k }, (_, i) => X.reduce((acc, row, r) => acc + row[i] * y[r], 0));
  const beta = inv.map((row) => row.reduce((acc, v, j) => acc + v * xty[j], 0));
  const meat = Array.from({ length: k }, () => Array(k).fill(0) as number[]);
  X.forEach((row, r) => {
    const fitted = row.reduce((acc, v, j) => acc + v * beta[j], 0);
    const resid = y[r] - fitted;
    const invRow = inv.map((invRowI) => invRowI.reduce((acc, v, j) => acc + v * row[j], 0));
    const leverage = row.reduce((acc, v, i) => acc + v * invRow[i], 0);
    const weight = (resid * resid) / Math.max(1e-12, 1 - leverage);
    for (let i = 0; i < k; i++) for (let j = 0; j < k; j++) meat[i][j] += weight * row[i] * row[j];
  });
  const sandwich = inv.map((rowI) =>
    Array.from({ length: k }, (_, j) =>
      rowI.reduce((acc, v, m) => acc + v * meat[m].reduce((a2, w, n) => a2 + w * inv[n][j], 0), 0),
    ),
  );
  return names.map((name, i) => {
    const se = Math.sqrt(Math.max(0, sandwich[i][i]));
    // A model that fits perfectly (no residual variance) has no test: p = 1, not a 0/0 artefact.
    const z = se > 1e-9 ? beta[i] / se : 0;
    return { name, estimate: beta[i], se, z, p: 2 * (1 - normalCdf(Math.abs(z))) };
  });
}

/** Holm step-down adjustment; returns adjusted p-values in the input order. */
export function holm(pValues: number[]): number[] {
  const order = pValues.map((p, i) => ({ p, i })).sort((a, b) => a.p - b.p);
  const adjusted = Array(pValues.length).fill(1) as number[];
  let running = 0;
  order.forEach(({ p, i }, rank) => {
    running = Math.max(running, Math.min(1, (pValues.length - rank) * p));
    adjusted[i] = running;
  });
  return adjusted;
}

// ── The report ───────────────────────────────────────────────────────────────

export interface AnalysedRow {
  row: StudyRow;
  gapPre: number;
  gapPost: number;
  signedGapPre: number;
  signedGapPost: number;
  cruxCorrect: boolean;
  charityPre: number;
  charityPost: number;
}

export interface ArmSummary {
  arm: StudyArm;
  n: number;
  gapPre: number;
  gapPost: number;
  gapChange: number;
  signedGapPre: number;
  signedGapPost: number;
  perceivedPre: number;
  perceivedPost: number;
  cruxCorrect: number;
  charityPre: number;
  charityPost: number;
  attitudeChange: number;
  fairness: number;
  learned: number;
  medianStimulusSeconds: number;
  medianTotalSeconds: number;
  meanOpened: number;
}

export interface ContrastResult {
  outcome: "gap" | "crux" | "charity";
  versus: "chatbot" | "article";
  /** Comparison arm minus map arm, adjusted. Positive favours the map for gap; negative for crux and charity. */
  estimate: number;
  se: number;
  p: number;
  /** Holm-adjusted p for the secondary family; equals p for the primary pair. */
  pAdjusted: number;
  /** Map-favouring effect in SD units of the outcome's post score (pooled over arms). */
  standardized: number;
}

export interface StudyReport {
  totalRows: number;
  excluded: Record<ExclusionReason, number>;
  analysed: AnalysedRow[];
  arms: ArmSummary[];
  primary: ContrastResult[];
  secondary: ContrastResult[];
  h1: "supported" | "not supported" | "insufficient data";
}

function design(rows: AnalysedRow[], covariate: (a: AnalysedRow) => number) {
  const names = [
    "intercept",
    "arm:chatbot",
    "arm:article",
    "pre",
    "topic:immigration-border-crisis",
    "topic:transgender-athletes-sports",
    "party:republican",
    "device:mobile",
  ];
  const X = rows.map((a) => [
    1,
    a.row.arm === "chatbot" ? 1 : 0,
    a.row.arm === "article" ? 1 : 0,
    covariate(a),
    a.row.topic === "immigration-border-crisis" ? 1 : 0,
    a.row.topic === "transgender-athletes-sports" ? 1 : 0,
    a.row.party === "republican" ? 1 : 0,
    a.row.device === "mobile" ? 1 : 0,
  ]);
  return { names, X };
}

/** Columns that never vary (a topic with no rows, say) make the model singular; drop them. */
function dropConstantColumns(X: number[][], names: string[]): { X: number[][]; names: string[] } {
  const keep = names.map((name, j) => name === "intercept" || new Set(X.map((row) => row[j])).size > 1);
  return {
    X: X.map((row) => row.filter((_, j) => keep[j])),
    names: names.filter((_, j) => keep[j]),
  };
}

function contrasts(
  rows: AnalysedRow[],
  outcome: ContrastResult["outcome"],
  y: (a: AnalysedRow) => number,
  pre: (a: AnalysedRow) => number,
  mapFavouredWhen: "lower" | "higher",
): ContrastResult[] {
  const full = design(rows, pre);
  const { X, names } = dropConstantColumns(full.X, full.names);
  const coefficients = olsHc2(rows.map(y), X, names);
  const scale = sd(rows.map(y)) || 1;
  return (["chatbot", "article"] as const).map((versus) => {
    const c = coefficients.find((coef) => coef.name === `arm:${versus}`);
    const estimate = c?.estimate ?? NaN;
    const favour = mapFavouredWhen === "lower" ? estimate : -estimate;
    return {
      outcome,
      versus,
      estimate,
      se: c?.se ?? NaN,
      p: c?.p ?? NaN,
      pAdjusted: c?.p ?? NaN,
      standardized: favour / scale,
    };
  });
}

export function analyseStudy(rows: StudyRow[]): StudyReport {
  const excluded: Record<ExclusionReason, number> = { version: 0, attention: 0, "too-fast": 0 };
  const kept: StudyRow[] = [];
  for (const row of rows) {
    const reason = exclusionReason(row);
    if (reason) excluded[reason] += 1;
    else kept.push(row);
  }

  const shares = actualShares(kept, "pre");
  const analysed: AnalysedRow[] = [];
  for (const row of kept) {
    const gapPre = perceptionGap(row, shares, "pre");
    const gapPost = perceptionGap(row, shares, "post");
    // No other-party participants on this topic yet: no benchmark, not analysable.
    if (gapPre === null || gapPost === null) continue;
    analysed.push({
      row,
      gapPre,
      gapPost,
      signedGapPre: perceptionGap(row, shares, "pre", true) ?? 0,
      signedGapPost: perceptionGap(row, shares, "post", true) ?? 0,
      cruxCorrect: isCruxChoiceCorrect(row.topic, row.cruxChoice),
      charityPre: charityIndex(row.charityPre),
      charityPost: charityIndex(row.charityPost),
    });
  }

  const arms: ArmSummary[] = STUDY_ARMS.map((arm) => {
    const group = analysed.filter((a) => a.row.arm === arm);
    const m = (f: (a: AnalysedRow) => number) => (group.length ? mean(group.map(f)) : NaN);
    return {
      arm,
      n: group.length,
      gapPre: m((a) => a.gapPre),
      gapPost: m((a) => a.gapPost),
      gapChange: m((a) => a.gapPost - a.gapPre),
      signedGapPre: m((a) => a.signedGapPre),
      signedGapPost: m((a) => a.signedGapPost),
      perceivedPre: m((a) => a.row.perceivedPre),
      perceivedPost: m((a) => a.row.perceivedPost),
      cruxCorrect: m((a) => (a.cruxCorrect ? 1 : 0)),
      charityPre: m((a) => a.charityPre),
      charityPost: m((a) => a.charityPost),
      attitudeChange: m((a) => a.row.attitudePost - a.row.attitudePre),
      fairness: m((a) => a.row.fairness),
      learned: m((a) => a.row.learned),
      medianStimulusSeconds: group.length ? median(group.map((a) => a.row.stimulusSeconds)) : NaN,
      medianTotalSeconds: group.length ? median(group.map((a) => a.row.totalSeconds)) : NaN,
      meanOpened: m((a) => a.row.stimulusOpened),
    };
  });

  const enough = arms.every((arm) => arm.n >= 10);
  if (!enough) {
    return { totalRows: rows.length, excluded, analysed, arms, primary: [], secondary: [], h1: "insufficient data" };
  }

  const primary = contrasts(analysed, "gap", (a) => a.gapPost, (a) => a.gapPre, "lower");
  const secondary = [
    // Crux identification is asked after reading only; its model has no pre score (constant 0, dropped).
    ...contrasts(analysed, "crux", (a) => (a.cruxCorrect ? 1 : 0), () => 0, "higher"),
    ...contrasts(analysed, "charity", (a) => a.charityPost, (a) => a.charityPre, "higher"),
  ];
  const adjusted = holm(secondary.map((c) => c.p));
  secondary.forEach((c, i) => (c.pAdjusted = adjusted[i]));

  const h1 = primary.every((c) => c.estimate > 0 && c.p < 0.05) ? "supported" : "not supported";
  return { totalRows: rows.length, excluded, analysed, arms, primary, secondary, h1 };
}

// ── Health check (blind) ─────────────────────────────────────────────────────

export interface HealthCell {
  arm: StudyArm;
  assigned: number;
  completed: number;
  /** Share of assigned participants with no stored response. */
  dropOut: number;
  failedAttention: number;
  tooFast: number;
  medianTotalSeconds: number;
}

/**
 * The interim check the plan allows during data collection: counts, drop-out,
 * exclusions and timing per arm. It computes no outcome, so looking at it
 * cannot tempt anyone to stop early on a result.
 */
export function healthSummary(
  assignments: { arm: StudyArm }[],
  rows: Pick<StudyRow, "arm" | "attention" | "totalSeconds" | "version">[],
): HealthCell[] {
  return STUDY_ARMS.map((arm) => {
    const assigned = assignments.filter((a) => a.arm === arm).length;
    const done = rows.filter((r) => r.arm === arm);
    return {
      arm,
      assigned,
      completed: done.length,
      dropOut: assigned ? Math.max(0, assigned - done.length) / assigned : NaN,
      failedAttention: done.filter((r) => r.attention !== ATTENTION_CORRECT).length,
      tooFast: done.filter((r) => r.totalSeconds < MIN_TOTAL_SECONDS).length,
      medianTotalSeconds: done.length ? median(done.map((r) => r.totalSeconds)) : NaN,
    };
  });
}

// ── CSV ──────────────────────────────────────────────────────────────────────

function csvCell(value: unknown): string {
  if (typeof value === "number") return Number.isFinite(value) ? String(Math.round(value * 1000) / 1000) : "";
  const text = Array.isArray(value) ? value.join(" ") : String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function toCsv(header: string[], rows: unknown[][]): string {
  return [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\n") + "\n";
}

export function responsesCsv(report: StudyReport): string {
  const header = [
    "pid_hash",
    "prolific_study_id",
    "party",
    "party_strength",
    "topic",
    "arm",
    "gap_pre",
    "gap_post",
    "signed_gap_pre",
    "signed_gap_post",
    "perceived_pre",
    "perceived_post",
    "attitude_pre",
    "attitude_post",
    "crux_choice",
    "crux_correct",
    "charity_pre",
    "charity_post",
    "fairness",
    "learned",
    "prior_exposure",
    "stimulus_seconds",
    "total_seconds",
    "stimulus_opened",
    "device",
    "completed_on",
    "own_agree_pre",
    "own_agree_post",
    "other_estimate_pre",
    "other_estimate_post",
  ];
  return toCsv(
    header,
    report.analysed.map(({ row, ...a }) => [
      row.pidHash,
      row.prolificStudyId,
      row.party,
      row.partyStrength,
      row.topic,
      row.arm,
      a.gapPre,
      a.gapPost,
      a.signedGapPre,
      a.signedGapPost,
      row.perceivedPre,
      row.perceivedPost,
      row.attitudePre,
      row.attitudePost,
      row.cruxChoice,
      a.cruxCorrect ? 1 : 0,
      a.charityPre,
      a.charityPost,
      row.fairness,
      row.learned,
      row.priorExposure,
      row.stimulusSeconds,
      row.totalSeconds,
      row.stimulusOpened,
      row.device,
      row.completedOn,
      row.ownAgreePre,
      row.ownAgreePost,
      row.otherEstimatePre,
      row.otherEstimatePost,
    ]),
  );
}

export function armsCsv(report: StudyReport): string {
  const keys = Object.keys(report.arms[0] ?? {}) as (keyof ArmSummary)[];
  return toCsv(keys as string[], report.arms.map((arm) => keys.map((key) => arm[key])));
}
