# Two-Axis Confidence (Balance + Weight) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the single `confidence_score` with two computed axes — `balance` (which way the evidence tips, 0–100, 50 = even) and `weight` (how much we actually know, 0–100) — plus a 2-D `verdict {label, quadrant}`, across every topic surface.

**Architecture:** All math lives in `lib/schemas/topic.ts` with every threshold/coefficient in `lib/constants.ts`. `buildTopic` in `data/topics.ts` injects `balance`, `weight`, `verdict`, and a deprecated `confidence_score` (= balance) onto every `Topic`. `TopicSummary` mirrors the new fields via `scripts/regen-summaries.ts` → `data/topicSummaries.json`. Two new shared components (`BalanceWeightReadout`, `BalanceWeightChip`) replace every bare `%` display.

**Tech Stack:** Next.js App Router, React 19, TypeScript strict, Zod, Tailwind 3, Vitest (`bun test`), Bun.

**Spec:** `docs/superpowers/specs/2026-07-14-two-axis-confidence-design.md`

## Global Constraints

- Package manager is **Bun**: `bun test`, `bun run build`, `bun run lint`, `bun --bun tsx` for scripts.
- Every numeric threshold and formula coefficient lives ONLY in `lib/constants.ts` (`BALANCE`, `WEIGHT`, `VERDICT` blocks). No component may inline a ladder like `>= 85 ? … : >= 60 ? …`.
- `confidence_score` is KEPT on `Topic` and `TopicSummary`, always equal to `balance`, commented `@deprecated`. It exists only for JSON-LD `ClaimReview.ratingValue` and as a safety net. No UI surface may *display* it.
- Design system: parchment/stoic. Deep teal `#3a6965`, rust `#C4613C`, brown `#8B5A3C`, crux crimson `#a23b3b`, stone grays. **Never amber/tangerine, never emerald for new verdict colors** (existing emerald usages are being removed anyway).
- Quadrant → color mapping (used everywhere): `settled` → deep teal, `contested` → crux crimson `#a23b3b`, `moderate` → rust, `open` → stone `#7a7068`.
- The new components must be **server-safe**: no `"use client"`, no hooks, no framer-motion — pure markup/SVG/CSS so server pages (`embed`, `is/`, `questions/`) can render them.
- OUT OF SCOPE — do not touch: judge-council (`scripts/generate-verdicts.ts`, `ShareVerdictCard`, `app/api/og/route.tsx`'s local string-based `getVerdictLabel`, `data/mockVerdicts`, embed's `VerdictBanner`/`getMockVerdict`), extractor confidence (`extracted.confidence` 0–1 in `app/analysis/[id]/AnalysisView.tsx` L590/L596, `lib/analyze/*`), `ConfidenceTimeline`, `ConfidenceGauge`'s internals (it stays for the extractor caller), the raw evidence 0–40 scale (`calculateEvidenceScore`, `/40` displays).
- **Name-collision traps:** `app/api/og/route.tsx:18` has an unrelated local `getVerdictLabel(verdict: string)` — never batch-rename by symbol name. Embed page's "Verdict" banner is the debate-winner feature, not this verdict.
- Two import paths exist for the schema helpers: `@/lib/schemas/topic` and the barrel `@/types/logic` (`ScalesOfEvidence`, `MobileArgumentList` use the barrel). Keep both working.
- After ANY change to the compute or to `data/topics.ts`, regenerate summaries before shipping: `bun --bun tsx scripts/regen-summaries.ts`.
- Commit after every task with a conventional-commits message ending in the Claude co-author trailer.

---

### Task 1: Constants + core math (`computeBalance`, `computeWeight`, `getVerdict`)

**Files:**
- Modify: `lib/constants.ts` (append new blocks)
- Modify: `lib/schemas/topic.ts`
- Modify: `types/logic.ts:7-19` (barrel re-exports)
- Test: `lib/schemas/topic-utils.test.ts` (add new describes; keep existing `calculateEvidenceScore` tests; the old `computeConfidenceScore`/`getVerdictLabel` describes get REWRITTEN here)
- Test: `lib/schemas/topic.test.ts:162-259` (rewrite `computeConfidenceScore` + `getVerdictLabel` describes)

**Interfaces:**
- Consumes: existing `calculateEvidenceScore(weight: EvidenceWeight): number` (0–40), `Pillar`, `Crux` types.
- Produces (later tasks rely on these exact names):
  - `computeBalance(pillars: Pillar[]): number` — 0–100, 50 = even
  - `computeWeight(pillars: Pillar[]): number` — 0–100
  - `getVerdict(balance: number, weight: number): Verdict`
  - `getLeanLabel(balance: number): string`
  - `type Verdict = { label: string; quadrant: "settled" | "contested" | "moderate" | "open" }`
  - `VerdictSchema`, `VerdictQuadrantSchema` (Zod)
  - Constants `BALANCE`, `WEIGHT`, `VERDICT` from `@/lib/constants`
  - `computeConfidenceScore` kept as a `@deprecated` alias of `computeBalance`; `getVerdictLabel` kept temporarily (deleted in Task 9).

- [ ] **Step 1: Write the failing tests**

In `lib/schemas/topic-utils.test.ts`, DELETE the `describe("getVerdictLabel")` block (L167–199) and RENAME `describe("computeConfidenceScore")` (L51) to `describe("computeBalance")`, updating each call from `computeConfidenceScore(` to `computeBalance(`. The symmetric-evidence test (L143) changes its assertion: with the `+1` term gone, symmetry is exact to rounding:

```ts
// in the symmetric test
expect(Math.abs(forScore + againstScore - 100)).toBeLessThanOrEqual(1);
```

Then ADD these describes (imports: `computeBalance, computeWeight, getVerdict, getLeanLabel` from `"./topic"`; `BALANCE, WEIGHT, VERDICT` from `"@/lib/constants"`). Use this fixture helper at the top of the file:

```ts
import type { Pillar, Evidence } from "./topic";

function ev(side: "for" | "against", each: number): Evidence {
  // `each` = per-dimension weight (0-10); total strength = each * 4
  return {
    id: `e-${side}-${Math.random().toString(36).slice(2, 8)}`,
    title: "t",
    description: "d",
    side,
    weight: { sourceReliability: each, independence: each, replicability: each, directness: each },
  };
}

function pillar(
  evidence: Evidence[],
  status: "verified" | "theoretical" | "impossible" = "verified"
): Pillar {
  return {
    id: `p-${Math.random().toString(36).slice(2, 8)}`,
    title: "P",
    short_summary: "s",
    icon_name: "Target",
    skeptic_premise: "sp",
    proponent_rebuttal: "pr",
    crux: {
      id: "c1",
      title: "C",
      description: "d",
      methodology: "m",
      verification_status: status,
      cost_to_verify: "$0",
    },
    evidence,
  };
}
```

```ts
describe("computeWeight", () => {
  it("returns 0 for no pillars", () => {
    expect(computeWeight([])).toBe(0);
  });

  it("returns only the resolvability component for pillars with no evidence", () => {
    // mass=0, quality=0, resolvability=1 (verified) => 100 * W_RESOLVABILITY
    expect(computeWeight([pillar([], "verified")])).toBe(
      Math.round(100 * WEIGHT.W_RESOLVABILITY)
    );
  });

  it("increases with more evidence (mass)", () => {
    const thin = computeWeight([pillar([ev("for", 8), ev("against", 8)])]);
    const rich = computeWeight([
      pillar(Array.from({ length: 8 }, (_, i) => ev(i % 2 ? "for" : "against", 8))),
    ]);
    expect(rich).toBeGreaterThan(thin);
  });

  it("increases with average evidence quality", () => {
    const low = computeWeight([pillar([ev("for", 3), ev("against", 3)])]);
    const high = computeWeight([pillar([ev("for", 9), ev("against", 9)])]);
    expect(high).toBeGreaterThan(low);
  });

  it("increases with crux resolvability, all else equal", () => {
    const evs = () => [ev("for", 8), ev("against", 8)];
    const impossible = computeWeight([pillar(evs(), "impossible")]);
    const theoretical = computeWeight([pillar(evs(), "theoretical")]);
    const verified = computeWeight([pillar(evs(), "verified")]);
    expect(verified).toBeGreaterThan(theoretical);
    expect(theoretical).toBeGreaterThan(impossible);
  });

  it("saturates: stays within 0-100 even for huge corpora", () => {
    const huge = [
      pillar(Array.from({ length: 100 }, (_, i) => ev(i % 2 ? "for" : "against", 10))),
    ];
    const w = computeWeight(huge);
    expect(w).toBeGreaterThan(80);
    expect(w).toBeLessThanOrEqual(100);
  });
});

describe("getVerdict", () => {
  it("high weight + strong lean => settled, names the favored side", () => {
    const v = getVerdict(80, 80);
    expect(v.quadrant).toBe("settled");
    expect(v.label).toContain("favors the claim");
    const against = getVerdict(20, 80);
    expect(against.quadrant).toBe("settled");
    expect(against.label).toContain("favors the counterclaim");
  });

  it("high weight + weak lean => well-mapped, genuinely contested", () => {
    const v = getVerdict(55, 80);
    expect(v.quadrant).toBe("contested");
    expect(v.label).toBe("Well-mapped, genuinely contested");
  });

  it("medium weight => moderately evidenced, with lean", () => {
    expect(getVerdict(65, 50).quadrant).toBe("moderate");
    expect(getVerdict(65, 50).label).toContain("moderately evidenced");
    expect(getVerdict(51, 50).label).toContain("Balanced");
  });

  it("low weight => open question regardless of lean", () => {
    const v = getVerdict(90, 20);
    expect(v.quadrant).toBe("open");
    expect(v.label).toBe("Open question — limited evidence so far");
  });

  it("boundary behavior matches VERDICT constants", () => {
    expect(getVerdict(50 + VERDICT.SETTLED_D, VERDICT.HIGH_WEIGHT).quadrant).toBe("settled");
    expect(getVerdict(50, VERDICT.HIGH_WEIGHT).quadrant).toBe("contested");
    expect(getVerdict(50, VERDICT.LOW_WEIGHT).quadrant).toBe("moderate");
    expect(getVerdict(50, VERDICT.LOW_WEIGHT - 1).quadrant).toBe("open");
  });
});

describe("getLeanLabel", () => {
  it("labels by lean magnitude", () => {
    expect(getLeanLabel(50)).toBe("Evenly balanced");
    expect(getLeanLabel(60)).toBe("Leans toward the claim");
    expect(getLeanLabel(40)).toBe("Leans toward the counterclaim");
    expect(getLeanLabel(75)).toBe("Clearly favors the claim");
    expect(getLeanLabel(5)).toBe("Strongly favors the counterclaim");
  });
});
```

In `lib/schemas/topic.test.ts`: rename its `computeConfidenceScore` describe (L162) to `computeBalance` (update calls; the empty-evidence case still expects 50), and REPLACE the `getVerdictLabel` describe (L252–259) with:

```ts
describe("getVerdict", () => {
  it("returns 2-D verdicts", () => {
    expect(getVerdict(80, 80).quadrant).toBe("settled");
    expect(getVerdict(52, 70).quadrant).toBe("contested");
    expect(getVerdict(60, 50).quadrant).toBe("moderate");
    expect(getVerdict(60, 20).quadrant).toBe("open");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `bun test lib/schemas/`
Expected: FAIL — `computeBalance`, `computeWeight`, `getVerdict`, `getLeanLabel` are not exported.

- [ ] **Step 3: Implement constants**

Append to `lib/constants.ts`:

```ts
// ---------------------------------------------------------------------------
// Two-axis confidence: Balance (tilt) + Weight (how much we know)
// Spec: docs/superpowers/specs/2026-07-14-two-axis-confidence-design.md
// ALL thresholds/coefficients for balance, weight, and verdicts live here.
// ---------------------------------------------------------------------------

/** Lean-magnitude thresholds on d = |balance − 50|. */
export const BALANCE = {
  /** d below this reads as an even split */
  EVEN_D: 7,
  /** d below this reads as a lean */
  LEAN_D: 20,
  /** d below this reads as "clearly favors"; at or above = "strongly favors" */
  CLEAR_D: 38,
} as const;

/** Weight-of-evidence formula coefficients. Calibrated in Task 3 — treat the
 *  values below as starting points; the calibration script is the authority. */
export const WEIGHT = {
  /** Mass saturation: M = 1 − exp(−Σstrength / MASS_K). 250 ≈ 16 strong items → ~0.85 */
  MASS_K: 250,
  /** Component weights — must sum to 1 */
  W_MASS: 0.5,
  W_QUALITY: 0.3,
  W_RESOLVABILITY: 0.2,
  /** Weight floor for topics authored as status "settled" */
  SETTLED_FLOOR: 80,
} as const;

/** 2-D verdict thresholds. */
export const VERDICT = {
  /** weight ≥ this → well-evidenced half of the matrix */
  HIGH_WEIGHT: 65,
  /** weight < this → "Open question" */
  LOW_WEIGHT: 35,
  /** d = |balance − 50| ≥ this (with high weight) → "Settled" */
  SETTLED_D: 20,
} as const;
```

- [ ] **Step 4: Implement the math in `lib/schemas/topic.ts`**

Add after the existing `TopicSchema` definition (schema fields are added in Task 2 — this task is functions only):

```ts
import { BALANCE, VERDICT, WEIGHT } from "@/lib/constants";

// ============================================================================
// Two-Axis Confidence: Balance + Weight
// ============================================================================

export const VerdictQuadrantSchema = z.enum(["settled", "contested", "moderate", "open"]);
export const VerdictSchema = z.object({
  label: z.string(),
  quadrant: VerdictQuadrantSchema,
});
export type VerdictQuadrant = z.infer<typeof VerdictQuadrantSchema>;
export type Verdict = z.infer<typeof VerdictSchema>;

/**
 * Balance of evidence — which way it tips. 0–100, 50 = even.
 * forStrength / (forStrength + againstStrength) over the 0–40 evidence scores.
 */
export function computeBalance(pillars: Pillar[]): number {
  const allEvidence = pillars.flatMap((p) => p.evidence ?? []);
  const forScore = allEvidence
    .filter((e) => e.side === "for")
    .reduce((sum, e) => sum + calculateEvidenceScore(e.weight), 0);
  const againstScore = allEvidence
    .filter((e) => e.side === "against")
    .reduce((sum, e) => sum + calculateEvidenceScore(e.weight), 0);
  const total = forScore + againstScore;
  if (total === 0) return 50;
  return Math.round((forScore / total) * 100);
}

const RESOLVABILITY: Record<Crux["verification_status"], number> = {
  verified: 1,
  theoretical: 0.5,
  impossible: 0,
};

/**
 * Weight of argument — how much actually bears on the question. 0–100.
 * Composite of evidential mass (saturating), average quality, and crux
 * resolvability. Coefficients live in lib/constants.ts and are calibrated
 * against the full topic corpus (scripts/calibrate-weight.ts).
 */
export function computeWeight(pillars: Pillar[]): number {
  const strengths = pillars
    .flatMap((p) => p.evidence ?? [])
    .map((e) => calculateEvidenceScore(e.weight));
  const totalStrength = strengths.reduce((sum, s) => sum + s, 0);

  const mass = 1 - Math.exp(-totalStrength / WEIGHT.MASS_K);
  const quality = strengths.length > 0 ? totalStrength / strengths.length / 40 : 0;
  const resolvability =
    pillars.length > 0
      ? pillars.reduce((sum, p) => sum + RESOLVABILITY[p.crux.verification_status], 0) /
        pillars.length
      : 0;

  return Math.round(
    100 *
      (WEIGHT.W_MASS * mass +
        WEIGHT.W_QUALITY * quality +
        WEIGHT.W_RESOLVABILITY * resolvability)
  );
}

function favoredSide(balance: number): string {
  return balance >= 50 ? "the claim" : "the counterclaim";
}

/** Human label for the lean magnitude alone (no weight information). */
export function getLeanLabel(balance: number): string {
  const d = Math.abs(balance - 50);
  if (d < BALANCE.EVEN_D) return "Evenly balanced";
  if (d < BALANCE.LEAN_D)
    return balance >= 50 ? "Leans toward the claim" : "Leans toward the counterclaim";
  if (d < BALANCE.CLEAR_D) return `Clearly favors ${favoredSide(balance)}`;
  return `Strongly favors ${favoredSide(balance)}`;
}

/** 2-D verdict from both axes. Replaces the old 1-D getVerdictLabel. */
export function getVerdict(balance: number, weight: number): Verdict {
  const d = Math.abs(balance - 50);
  if (weight >= VERDICT.HIGH_WEIGHT && d >= VERDICT.SETTLED_D) {
    return {
      label: `Settled — evidence strongly favors ${favoredSide(balance)}`,
      quadrant: "settled",
    };
  }
  if (weight >= VERDICT.HIGH_WEIGHT) {
    return { label: "Well-mapped, genuinely contested", quadrant: "contested" };
  }
  if (weight >= VERDICT.LOW_WEIGHT) {
    const lean =
      d < BALANCE.EVEN_D
        ? "Balanced"
        : balance >= 50
          ? "Leans toward the claim"
          : "Leans toward the counterclaim";
    return { label: `${lean} — moderately evidenced`, quadrant: "moderate" };
  }
  return { label: "Open question — limited evidence so far", quadrant: "open" };
}
```

Then change the OLD functions in the same file:
- Replace the body-level `computeConfidenceScore` (L180–199) with: `/** @deprecated Use computeBalance — this was always a balance, never a confidence. */\nexport const computeConfidenceScore = computeBalance;` (delete the old implementation and the private `scoreEvidence` helper if now unused — `calculateEvidenceScore` is the public duplicate; keep only `calculateEvidenceScore`).
- Mark `getVerdictLabel` (L220–225) with `/** @deprecated 1-D verdict — replaced by getVerdict(balance, weight). Deleted once all callers are migrated (Task 9). */`. Do NOT delete yet.

- [ ] **Step 5: Update the barrel `types/logic.ts`**

In the `export {}` block (L14–19) add `computeBalance, computeWeight, getVerdict, getLeanLabel`; in the `export type` block add `Verdict, VerdictQuadrant`. Keep `getVerdictLabel`/`computeConfidenceScore` re-exports for now.

- [ ] **Step 6: Run tests**

Run: `bun test lib/schemas/`
Expected: PASS (all new describes; existing `calculateEvidenceScore` tests untouched).

- [ ] **Step 7: Commit**

```bash
git add lib/constants.ts lib/schemas/topic.ts types/logic.ts lib/schemas/topic-utils.test.ts lib/schemas/topic.test.ts
git commit -m "feat: two-axis confidence math — computeBalance, computeWeight, getVerdict"
```

---

### Task 2: Schema fields + `buildTopic` injection

**Files:**
- Modify: `lib/schemas/topic.ts` (TopicSchema + TopicInput)
- Modify: `data/topics.ts:133-147` (`buildTopic`)
- Test: `lib/schemas/topic.test.ts` (fixture), `data/topics.test.ts`, `data/topics-enhanced.test.ts:221-228`

**Interfaces:**
- Consumes: Task 1's `computeBalance`, `computeWeight`, `getVerdict`, `WEIGHT.SETTLED_FLOOR`.
- Produces: every `Topic` object now has `balance: number`, `weight: number`, `verdict: Verdict`, `confidence_score: number` (= balance). Exported `type TopicInput` for raw data files.

- [ ] **Step 1: Write/adjust the failing tests**

`lib/schemas/topic.test.ts` — the `validTopic` fixture (L121) gains the computed fields so `TopicSchema.safeParse` still passes:

```ts
confidence_score: 75,
balance: 75,
weight: 60,
verdict: { label: "Leans toward the claim — moderately evidenced", quadrant: "moderate" },
```

Add below the existing "rejects confidence score outside 0-100" test:

```ts
it("rejects balance/weight outside 0-100", () => {
  expect(TopicSchema.safeParse({ ...validTopic, balance: 150 }).success).toBe(false);
  expect(TopicSchema.safeParse({ ...validTopic, weight: -5 }).success).toBe(false);
});

it("rejects an invalid verdict quadrant", () => {
  expect(
    TopicSchema.safeParse({
      ...validTopic,
      verdict: { label: "x", quadrant: "sideways" },
    }).success
  ).toBe(false);
});
```

`data/topics.test.ts` — extend the range test (L16-21):

```ts
it("all topics have valid balance and weight (0-100) and a verdict", () => {
  topics.forEach((topic) => {
    expect(topic.balance).toBeGreaterThanOrEqual(0);
    expect(topic.balance).toBeLessThanOrEqual(100);
    expect(topic.weight).toBeGreaterThanOrEqual(0);
    expect(topic.weight).toBeLessThanOrEqual(100);
    expect(topic.confidence_score).toBe(topic.balance);
    expect(["settled", "contested", "moderate", "open"]).toContain(topic.verdict.quadrant);
  });
});
```

And replace the moon-landing literal at L99-104 (`toBeGreaterThanOrEqual(90)`) with:

```ts
expect(moonLanding?.balance).toBeGreaterThanOrEqual(70);
expect(moonLanding?.weight).toBeGreaterThanOrEqual(80);
```

`data/topics-enhanced.test.ts` — replace the guardrail (L221-228):

```ts
it("balance and weight match computed values for contested topics", () => {
  topics
    .filter((t) => t.status !== "settled")
    .forEach((topic) => {
      expect(topic.balance).toBe(computeBalance(topic.pillars));
      expect(topic.weight).toBe(computeWeight(topic.pillars));
      expect(topic.confidence_score).toBe(topic.balance);
    });
});
```

(update the import at L7 from `computeConfidenceScore` to `computeBalance, computeWeight`).

- [ ] **Step 2: Run tests to verify they fail**

Run: `bun test data/ lib/schemas/topic.test.ts`
Expected: FAIL — schema lacks `balance`/`weight`/`verdict`; topics lack the fields.

- [ ] **Step 3: Implement schema + input type**

In `lib/schemas/topic.ts`, `TopicSchema` gains (next to `confidence_score`):

```ts
confidence_score: z.number().min(0).max(100), // @deprecated — always = balance; kept for JSON-LD ratingValue
balance: z.number().min(0).max(100), // which way the evidence tips (50 = even)
weight: z.number().min(0).max(100), // how much we actually know
verdict: VerdictSchema, // 2-D verdict computed from balance + weight
```

(NOTE: `VerdictSchema` must be declared ABOVE `TopicSchema` in the file — move the Task 1 block above `TopicSchema` if needed.)

Below the `Topic` type export add:

```ts
/** Raw authored topic data — computed fields are injected by buildTopic. */
export type TopicInput = Omit<Topic, "confidence_score" | "balance" | "weight" | "verdict"> & {
  /** Optional authored score; only consulted as a floor for "settled" topics. */
  confidence_score?: number;
};
```

- [ ] **Step 4: Rewrite `buildTopic` in `data/topics.ts`**

Replace L133-147 with:

```ts
import { Topic, TopicCategory, TopicInput, TopicSchema, computeBalance, computeWeight, getVerdict } from "@/lib/schemas/topic";
import { WEIGHT } from "@/lib/constants";

function buildTopic(data: TopicInput): Topic {
  const computedBalance = computeBalance(data.pillars);
  const computedWeight = computeWeight(data.pillars);

  // Settled topics: trust the authored score as a floor on the tilt, and
  // guarantee a weight floor — "settled" is an editorial assertion of both.
  const balance =
    data.status === "settled"
      ? Math.max(computedBalance, data.confidence_score ?? 0)
      : computedBalance;
  const weight =
    data.status === "settled"
      ? Math.max(computedWeight, WEIGHT.SETTLED_FLOOR)
      : computedWeight;

  return TopicSchema.parse({
    ...data,
    balance,
    weight,
    verdict: getVerdict(balance, weight),
    confidence_score: balance, // @deprecated mirror — JSON-LD + unmigrated surfaces only
  });
}
```

- [ ] **Step 5: Check raw data files for explicit `Topic` annotations**

Run: `grep -rln ": Topic\b" data/topics/ || true`
If any raw file annotates its export as `: Topic`, change that annotation to `: TopicInput` (import from `@/lib/schemas/topic`). The ~30 files carrying a literal `confidence_score:` need no other edit — `TopicInput` accepts it as optional.

- [ ] **Step 6: Run the full test suite**

Run: `bun test`
Expected: PASS except possibly the anchor-ish assertions if the starting coefficients are off — if `moonLanding.weight >= 80` fails, note the value; Task 3 calibrates. Everything structural must pass.

- [ ] **Step 7: Commit**

```bash
git add lib/schemas/topic.ts data/topics.ts data/topics.test.ts data/topics-enhanced.test.ts lib/schemas/topic.test.ts data/topics/
git commit -m "feat: inject balance, weight, and 2-D verdict onto every Topic in buildTopic"
```

---

### Task 3: Calibration pass against the full corpus

**Files:**
- Create: `scripts/calibrate-weight.ts`
- Modify: `lib/constants.ts` (`WEIGHT` values, if calibration demands)
- Test: `data/topics.test.ts` (anchor tests)

**Interfaces:**
- Consumes: `topics` from `@/data/topics` (already carrying balance/weight/verdict).
- Produces: final `WEIGHT` coefficient values; anchor tests locking the spec's calibration targets.

- [ ] **Step 1: Write the anchor tests (they encode the spec §2.2 targets)**

Append to `data/topics.test.ts`:

```ts
describe("weight calibration anchors (spec §2.2)", () => {
  it("moon-landing (settled) has high weight", () => {
    expect(moonLanding?.weight).toBeGreaterThan(80);
    expect(moonLanding?.verdict.quadrant).toBe("settled");
  });

  it("moloch is well-mapped and genuinely contested — never 'insufficient'", () => {
    const moloch = topics.find((t) => t.id === "moloch");
    expect(moloch).toBeDefined();
    expect(moloch!.weight).toBeGreaterThanOrEqual(60);
    expect(moloch!.verdict.quadrant).toBe("contested");
    expect(moloch!.verdict.label).toBe("Well-mapped, genuinely contested");
  });

  it("the corpus weight distribution is legible (not clustered)", () => {
    const weights = topics.map((t) => t.weight);
    expect(Math.max(...weights) - Math.min(...weights)).toBeGreaterThan(40);
    // at least one genuinely thin topic reads as an open question
    expect(Math.min(...weights)).toBeLessThan(35);
  });
});
```

- [ ] **Step 2: Write the calibration script**

Create `scripts/calibrate-weight.ts`:

```ts
/**
 * Calibration report for the weight formula (spec §2.2).
 *
 * Usage: bun --bun tsx scripts/calibrate-weight.ts
 *
 * Prints every topic's balance/weight/verdict sorted by weight, a histogram,
 * and pass/fail against the anchor targets. Tune WEIGHT in lib/constants.ts
 * until the anchors pass and the spread is legible, then re-run.
 */

import { topics } from "../data/topics";

const rows = [...topics].sort((a, b) => b.weight - a.weight);
for (const t of rows) {
  const d = Math.abs(t.balance - 50);
  console.log(
    `${String(t.weight).padStart(3)}  b=${String(t.balance).padStart(3)} d=${String(d).padStart(2)}  ${t.verdict.quadrant.padEnd(9)}  ${t.id}`
  );
}

const buckets = [0, 0, 0, 0, 0]; // 0-19, 20-39, 40-59, 60-79, 80-100
for (const t of topics) buckets[Math.min(4, Math.floor(t.weight / 20))]++;
console.log("\nweight histogram (0-19 / 20-39 / 40-59 / 60-79 / 80-100):", buckets.join(" / "));

const get = (id: string) => topics.find((t) => t.id === id);
const checks: [string, boolean][] = [
  ["moon-landing weight > 80", (get("moon-landing")?.weight ?? 0) > 80],
  ["moloch weight in [60, 80]", (get("moloch")?.weight ?? 0) >= 60 && (get("moloch")?.weight ?? 100) <= 80],
  ["moloch quadrant = contested", get("moloch")?.verdict.quadrant === "contested"],
  ["ai-2027 quadrant = contested", get("ai-2027")?.verdict.quadrant === "contested"],
  ["some topic weight < 35", Math.min(...topics.map((t) => t.weight)) < 35],
  ["spread > 40", Math.max(...topics.map((t) => t.weight)) - Math.min(...topics.map((t) => t.weight)) > 40],
];
console.log("\nanchors:");
for (const [name, ok] of checks) console.log(`  ${ok ? "PASS" : "FAIL"}  ${name}`);
process.exitCode = checks.every(([, ok]) => ok) ? 0 : 1;
```

- [ ] **Step 3: Run the calibration loop**

Run: `bun --bun tsx scripts/calibrate-weight.ts`
If any anchor FAILs, adjust `WEIGHT` in `lib/constants.ts` and re-run. Guidance:
- moloch too low → lower `MASS_K` (mass saturates faster) or raise `W_MASS`.
- everything clustered high → raise `MASS_K`.
- thin topics not < 35 → raise `MASS_K` and/or shift weight from `W_RESOLVABILITY` to `W_MASS`.
- `ai-2027 contested` is a soft target (report-only if impossible without breaking the hard anchors — but the moloch anchors are HARD).
Iterate until the script exits 0 (soft target excepted). Record the final coefficients in the commit message.

- [ ] **Step 4: Run tests**

Run: `bun test data/topics.test.ts`
Expected: PASS including the anchor describe.

- [ ] **Step 5: Commit**

```bash
git add scripts/calibrate-weight.ts lib/constants.ts data/topics.test.ts
git commit -m "feat: calibrate weight coefficients against the full topic corpus"
```

---

### Task 4: TopicSummary mirror + regenerate `topicSummaries.json`

**Files:**
- Modify: `data/topicIndex.ts:21-33` (`TopicSummary`)
- Modify: `scripts/regen-summaries.ts:11-23`
- Regenerate: `data/topicSummaries.json` (113 entries)

**Interfaces:**
- Consumes: `Topic.balance/weight/verdict` from Task 2, `Verdict` type.
- Produces: `TopicSummary` gains `balance: number; weight: number; verdict: Verdict;` (keeps deprecated `confidence_score`). All list surfaces (Tasks 7–8) rely on these summary fields.

- [ ] **Step 1: Update `TopicSummary`**

```ts
import type { TopicCategory, TopicStatus, Verdict } from "@/lib/schemas/topic";

export interface TopicSummary {
  id: string;
  title: string;
  meta_claim: string;
  /** @deprecated — always equal to balance; do not display */
  confidence_score: number;
  balance: number;
  weight: number;
  verdict: Verdict;
  status: TopicStatus;
  category: TopicCategory;
  pillarCount: number;
  evidenceCount: number;
}
```

- [ ] **Step 2: Update the regen script's mapper**

In `scripts/regen-summaries.ts` add to the mapped object (after `confidence_score`):

```ts
balance: t.balance,
weight: t.weight,
verdict: t.verdict,
```

- [ ] **Step 3: Regenerate and verify**

Run: `bun --bun tsx scripts/regen-summaries.ts`
Expected: "Wrote 113 topic summaries…". Spot-check: `grep -A3 '"id": "moloch"' data/topicSummaries.json` shows `balance`, `weight`, and a `verdict` object with `"quadrant": "contested"`.

- [ ] **Step 4: Run build + tests**

Run: `bun test && bun run build`
Expected: PASS / build green (nothing consumes the new summary fields yet).

- [ ] **Step 5: Commit**

```bash
git add data/topicIndex.ts scripts/regen-summaries.ts data/topicSummaries.json
git commit -m "feat: mirror balance/weight/verdict into TopicSummary and regenerate summaries"
```

---

### Task 5: Shared visual components — `BalanceWeightReadout` + `BalanceWeightChip`

**Files:**
- Create: `components/BalanceWeightChip.tsx`
- Create: `components/BalanceWeightReadout.tsx`
- Test: `components/BalanceWeight.test.tsx`

**Interfaces:**
- Consumes: `Verdict` type from `@/lib/schemas/topic`.
- Produces (all later display tasks use these exact props):
  - `BalanceWeightChip({ balance, weight, verdict, showLabel?, className? })`
  - `BalanceWeightReadout({ balance, weight, verdict, evidenceHref?, className? })`
  - `QUADRANT_STYLE` export from the chip file: `Record<VerdictQuadrant, { color: string; bg: string; short: string }>`
- Both are server-safe: NO `"use client"`, NO hooks, NO framer-motion.

**Design note:** this is the product's new spine — apply real craft here (the frontend-design skill's principles): parchment aesthetic, EB Garamond for the verdict label, Plus Jakarta Sans for axis captions, quadrant colors per Global Constraints, smooth CSS transitions, dark-mode via existing CSS variables/`dark:` classes. The code below is the functional contract; polish freely without changing the props.

- [ ] **Step 1: Write the failing render tests**

`components/BalanceWeight.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BalanceWeightChip } from "./BalanceWeightChip";
import { BalanceWeightReadout } from "./BalanceWeightReadout";

const verdict = { label: "Well-mapped, genuinely contested", quadrant: "contested" as const };

describe("BalanceWeightChip", () => {
  it("exposes both axes and the verdict to assistive tech", () => {
    render(<BalanceWeightChip balance={46} weight={70} verdict={verdict} />);
    const el = screen.getByTitle(/Balance 46\/100 · Weight 70\/100/);
    expect(el).toBeTruthy();
    expect(screen.getByText(/Balance 46 of 100/)).toBeTruthy();
  });

  it("shows the quadrant word when showLabel is set", () => {
    render(<BalanceWeightChip balance={46} weight={70} verdict={verdict} showLabel />);
    expect(screen.getByText("Contested")).toBeTruthy();
  });
});

describe("BalanceWeightReadout", () => {
  it("renders the verdict label and both axis readouts", () => {
    render(<BalanceWeightReadout balance={46} weight={70} verdict={verdict} />);
    expect(screen.getByText("Well-mapped, genuinely contested")).toBeTruthy();
    expect(screen.getByRole("meter", { name: /balance of evidence/i })).toBeTruthy();
    expect(screen.getByRole("meter", { name: /weight of evidence/i })).toBeTruthy();
  });

  it("links to the evidence when evidenceHref is given", () => {
    render(
      <BalanceWeightReadout balance={46} weight={70} verdict={verdict} evidenceHref="#evidence" />
    );
    expect(screen.getByRole("link", { name: /see the evidence/i })).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `bun test components/BalanceWeight.test.tsx`
Expected: FAIL — modules don't exist.

- [ ] **Step 3: Implement `BalanceWeightChip.tsx`**

```tsx
import type { Verdict, VerdictQuadrant } from "@/lib/schemas/topic";

/** Quadrant → color/label. The ONLY place verdict colors are defined. */
export const QUADRANT_STYLE: Record<
  VerdictQuadrant,
  { color: string; bg: string; short: string }
> = {
  settled: { color: "#3a6965", bg: "rgba(58, 105, 101, 0.10)", short: "Settled" },
  contested: { color: "#a23b3b", bg: "rgba(162, 59, 59, 0.10)", short: "Contested" },
  moderate: { color: "#C4613C", bg: "rgba(196, 97, 60, 0.10)", short: "Moderate" },
  open: { color: "#7a7068", bg: "rgba(122, 112, 104, 0.12)", short: "Open" },
};

interface BalanceWeightChipProps {
  balance: number;
  weight: number;
  verdict: Verdict;
  /** Show the quadrant word ("Settled" / "Contested" / …) after the glyphs */
  showLabel?: boolean;
  className?: string;
}

/**
 * Compact two-axis readout for cards and lists: a diverging balance glyph
 * (dot on a centered track) + a small weight-fill bar + optional quadrant word.
 * Server-safe: no hooks, no client directive.
 */
export function BalanceWeightChip({
  balance,
  weight,
  verdict,
  showLabel = false,
  className = "",
}: BalanceWeightChipProps) {
  const s = QUADRANT_STYLE[verdict.quadrant];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 ${className}`}
      style={{ backgroundColor: s.bg, color: s.color }}
      title={`Balance ${balance}/100 · Weight ${weight}/100 — ${verdict.label}`}
    >
      {/* Balance: diverging track, center tick, dot at the balance position */}
      <span
        className="relative inline-block h-1 w-8 rounded-full"
        style={{ backgroundColor: "currentColor", opacity: undefined }}
        aria-hidden="true"
      >
        <span className="absolute inset-0 rounded-full bg-current opacity-20" />
        <span className="absolute -top-0.5 -bottom-0.5 left-1/2 w-px -translate-x-1/2 bg-current opacity-50" />
        <span
          className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-all duration-500"
          style={{ left: `${Math.min(97, Math.max(3, balance))}%` }}
        />
      </span>
      {/* Weight: small fill bar */}
      <span className="relative inline-block h-1 w-4 overflow-hidden rounded-full" aria-hidden="true">
        <span className="absolute inset-0 rounded-full bg-current opacity-20" />
        <span
          className="absolute inset-y-0 left-0 rounded-full bg-current transition-all duration-500"
          style={{ width: `${weight}%` }}
        />
      </span>
      {showLabel && (
        <span className="text-[10px] font-sans font-semibold uppercase tracking-wider">
          {s.short}
        </span>
      )}
      <span className="sr-only">
        {`Balance ${balance} of 100, weight ${weight} of 100. ${verdict.label}`}
      </span>
    </span>
  );
}
```

(NOTE: the first inner `<span>` uses layered children for track opacity; simplify if Tailwind's `bg-current` + `opacity-*` layering fights the design — the contract is the *visual*: centered diverging track + dot + weight fill, in the quadrant color.)

- [ ] **Step 4: Implement `BalanceWeightReadout.tsx`**

```tsx
import type { Verdict } from "@/lib/schemas/topic";
import { QUADRANT_STYLE } from "./BalanceWeightChip";

interface BalanceWeightReadoutProps {
  balance: number;
  weight: number;
  verdict: Verdict;
  /** Anchor/href to the evidence breakdown that produced these numbers */
  evidenceHref?: string;
  className?: string;
}

/**
 * The full-size two-axis verdict readout: a tilting balance-scale glyph,
 * a diverging balance meter, and a weight bar — one metaphor, both axes.
 * Server-safe: no hooks, no client directive.
 */
export function BalanceWeightReadout({
  balance,
  weight,
  verdict,
  evidenceHref,
  className = "",
}: BalanceWeightReadoutProps) {
  const s = QUADRANT_STYLE[verdict.quadrant];
  // Same tilt convention as ScalesOfEvidence.BalanceMeter: FOR-heavy tips the
  // beam counter-clockwise, max ±10°.
  const tiltDeg = ((balance - 50) / 50) * -10;

  return (
    <div
      className={`rounded-xl border p-4 sm:p-5 ${className}`}
      style={{ borderColor: `${s.color}33`, backgroundColor: s.bg }}
    >
      <div className="flex items-center gap-4">
        {/* Balance-scale glyph */}
        <svg width="64" height="44" viewBox="0 0 64 44" aria-hidden="true" className="shrink-0">
          {/* pillar + base */}
          <line x1="32" y1="10" x2="32" y2="38" stroke={s.color} strokeWidth="2" />
          <line x1="22" y1="40" x2="42" y2="40" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" />
          {/* beam + pans, tilted by balance */}
          <g transform={`rotate(${tiltDeg} 32 10)`} style={{ transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
            <line x1="8" y1="10" x2="56" y2="10" stroke={s.color} strokeWidth="2" strokeLinecap="round" />
            <path d="M 4 16 Q 8 22 12 16" fill="none" stroke={s.color} strokeWidth="1.5" />
            <line x1="8" y1="10" x2="8" y2="16" stroke={s.color} strokeWidth="1" />
            <path d="M 52 16 Q 56 22 60 16" fill="none" stroke={s.color} strokeWidth="1.5" />
            <line x1="56" y1="10" x2="56" y2="16" stroke={s.color} strokeWidth="1" />
          </g>
          <circle cx="32" cy="10" r="2.5" fill={s.color} />
        </svg>
        <div className="min-w-0">
          <p className="font-serif text-lg sm:text-xl font-semibold leading-snug text-primary">
            {verdict.label}
          </p>
          <p className="mt-0.5 font-sans text-xs text-secondary">
            Balance {balance}/100 · Weight {weight}/100
          </p>
        </div>
      </div>

      {/* Balance: diverging meter centered on 50 */}
      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between font-sans text-[10px] uppercase tracking-widest text-muted">
          <span>Against</span>
          <span>Balance of evidence</span>
          <span>For</span>
        </div>
        <div
          className="relative h-2 rounded-full bg-stone-200 dark:bg-[#3d3a36]"
          role="meter"
          aria-valuenow={balance}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Balance of evidence: ${balance} of 100, where 50 is an even split`}
        >
          <span className="absolute -top-1 -bottom-1 left-1/2 w-px -translate-x-1/2 bg-stone-400/60" aria-hidden="true" />
          <span
            className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm transition-all duration-700"
            style={{ left: `${Math.min(98, Math.max(2, balance))}%`, backgroundColor: s.color }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Weight: plain fill meter */}
      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between font-sans text-[10px] uppercase tracking-widest text-muted">
          <span>Weight of evidence</span>
          <span className="font-mono tabular-nums normal-case tracking-normal">{weight}/100</span>
        </div>
        <div
          className="h-2 overflow-hidden rounded-full bg-stone-200 dark:bg-[#3d3a36]"
          role="meter"
          aria-valuenow={weight}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Weight of evidence: ${weight} of 100`}
        >
          <span
            className="block h-full rounded-full transition-all duration-700"
            style={{ width: `${weight}%`, backgroundColor: s.color }}
          />
        </div>
      </div>

      {evidenceHref && (
        <a
          href={evidenceHref}
          className="mt-3 inline-block font-sans text-xs font-medium link-underline"
          style={{ color: s.color }}
        >
          See the evidence behind this →
        </a>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Run tests**

Run: `bun test components/BalanceWeight.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add components/BalanceWeightChip.tsx components/BalanceWeightReadout.tsx components/BalanceWeight.test.tsx
git commit -m "feat: BalanceWeightReadout + BalanceWeightChip — shared two-axis verdict components"
```

---

### Task 6: Topic-page surfaces (read mode, detail view, shared topic components)

**Files:**
- Modify: `components/ReadModeView.tsx` (sites at L6, L96, L116-118, L125)
- Modify: `app/topics/[id]/TopicDetailView.tsx` (11 sites — lines below)
- Modify: `components/ScalesOfEvidence.tsx` (L8, L253-266, L505-509)
- Modify: `components/ControversyMeter.tsx` (whole meter reframed)
- Modify: `components/VerdictVoting.tsx` (L11-15, L338-362)
- Modify: `components/ShareButtons.tsx` (L21-34, L56-76)
- Modify: `components/MobileArgumentList.tsx` (L275-288)
- Modify: `components/TopicIntroPanel.tsx` (L91-112)

**Interfaces:**
- Consumes: `topic.balance`, `topic.weight`, `topic.verdict` (Task 2), `BalanceWeightReadout`/`BalanceWeightChip`/`QUADRANT_STYLE` (Task 5), `TopicSummary.balance/weight/verdict` (Task 4), `calculateEvidenceScore`.
- Produces: changed props — `ControversyMeter({ balance, weight, verdict, status })`, `VerdictVoting({ topicId, topicTitle, balance })`, `ShareButtons.topicMeta` gains `verdictLabel: string; balance: number; weight: number` and DROPS `confidenceScore`.

No new unit tests in this task (visual surfaces); the gate is `bun run build` + `bun test` staying green + the Task 9 grep sweep. Work file-by-file, running `bunx tsc --noEmit` after each.

- [ ] **Step 1: `components/ReadModeView.tsx`**

- L6: drop `getVerdictLabel` from the import (keep `calculateEvidenceScore`); add `import { BalanceWeightReadout } from "@/components/BalanceWeightReadout";`
- L96: delete `const verdict = getVerdictLabel(topic.confidence_score);`
- L116-118: delete the `{topic.confidence_score}/100` `<span>` chip entirely (keep `ReadGraphToggle`).
- L125: replace `<p className="font-sans text-sm text-secondary italic">{verdict}.</p>` with:

```tsx
<BalanceWeightReadout
  balance={topic.balance}
  weight={topic.weight}
  verdict={topic.verdict}
  className="mt-4"
/>
```

- [ ] **Step 2: `app/topics/[id]/TopicDetailView.tsx`** (largest file — 11 sites)

1. L60 import: drop `getVerdictLabel` (keep `calculateEvidenceScore`); add:
```ts
import { BalanceWeightChip, QUADRANT_STYLE } from "@/components/BalanceWeightChip";
import { BalanceWeightReadout } from "@/components/BalanceWeightReadout";
```
2. L140-148: DELETE `confidenceColor()` entirely.
3. L420-456 `RelatedTopicCard`: delete `const confPct = …` (L435) and replace the whole "Confidence bar" block with:
```tsx
<div className="mb-3 flex items-center justify-between">
  <span className="text-[11px] font-medium text-stone-500 uppercase tracking-widest">
    Verdict
  </span>
  <BalanceWeightChip balance={topic.balance} weight={topic.weight} verdict={topic.verdict} showLabel />
</div>
```
4. L527-546 `KeyTakeawaysBox` big-% block: replace the `<span className="text-4xl …">{topic.confidence_score}%</span>` + `getVerdictLabel` pair with:
```tsx
<div className="flex flex-col gap-2">
  <span className="font-serif text-2xl sm:text-3xl font-semibold leading-tight text-primary">
    {topic.verdict.label}
  </span>
  <BalanceWeightChip balance={topic.balance} weight={topic.weight} verdict={topic.verdict} showLabel />
</div>
```
(keep whatever sibling content followed the old `<div className="flex flex-col gap-1">` — merge, don't drop.)
5. L1143-1148 header badge: replace the `% confidence` span with:
```tsx
<BalanceWeightChip balance={topic.balance} weight={topic.weight} verdict={topic.verdict} showLabel />
```
6. L1162-1172 top `ShareButtons`: change `description` to `` `${topic.meta_claim} — ${topic.verdict.label}` `` and `topicMeta` to:
```tsx
topicMeta={{
  metaClaim: topic.meta_claim,
  verdictLabel: topic.verdict.label,
  balance: topic.balance,
  weight: topic.weight,
  status: topic.status,
  cruxQuestion: topic.pillars[0]?.crux?.title,
  topicTitle: topic.title,
}}
```
7. L1253-1257 `ControversyMeter` mount:
```tsx
<ControversyMeter
  balance={topic.balance}
  weight={topic.weight}
  verdict={topic.verdict}
  status={topic.status}
/>
```
8. L1273-1297 30-second banner: replace the big `%` + ladder + `getVerdictLabel` block with:
```tsx
<div className="inline-flex flex-col items-center gap-3">
  <span
    className="font-serif text-3xl sm:text-4xl font-semibold leading-tight"
    style={{ color: QUADRANT_STYLE[topic.verdict.quadrant].color }}
  >
    {topic.verdict.label}
  </span>
  <div className="flex flex-col items-center gap-1.5">
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[topic.status]}`}
    >
      <StatusIcon className="h-3.5 w-3.5" />
      {statusLabels[topic.status]}
    </span>
    <BalanceWeightChip balance={topic.balance} weight={topic.weight} verdict={topic.verdict} />
  </div>
</div>
```
9. L1568-1576 "The Claim" prose: replace the sentence with:
```tsx
<p className="text-sm text-stone-500 mt-4 leading-relaxed">
  This topic is currently classified as{" "}
  <strong className="text-primary">{statusLabels[topic.status].toLowerCase()}</strong>. The
  evidence balance is <strong className="text-primary">{topic.balance}/100</strong> (which way
  it tips) with a weight of <strong className="text-primary">{topic.weight}/100</strong> (how
  much bears on it), computed from {totalEvidence} weighted evidence items across{" "}
  {topic.pillars.length} analytical pillars.
</p>
```
10. L1792-1796 `VerdictVoting` mount: `confidenceScore={topic.confidence_score}` → `balance={topic.balance}`.
11. L1890-1900 footer `ShareButtons`: same `topicMeta` change as item 6.
12. **Evidence-Balance count-vs-weight fix (spec §5):** search this file for the "Evidence Balance" bar (in `QuickStatsBar` or nearby) that computes side widths from evidence COUNTS (`totalFor`/`totalAgainst` item counts). Change it to weighted strength: sum `calculateEvidenceScore(e.weight)` per side over `topic.pillars.flatMap(p => p.evidence ?? [])` and derive widths from those sums. Keep the same markup.

- [ ] **Step 3: `components/ScalesOfEvidence.tsx`**

- L8: from `@/types/logic` also import `getVerdict` — actually simpler: change `VerdictDisplay` to take the verdict from the topic. Update the mount (L505-509) to:
```tsx
<VerdictDisplay
  balance={topic.balance}
  weight={topic.weight}
  verdict={topic.verdict}
  forWeight={forWeight}
  againstWeight={againstWeight}
/>
```
- L253-266 `VerdictDisplay`: new signature `{ balance, weight, verdict, forWeight, againstWeight }: { balance: number; weight: number; verdict: Verdict; forWeight: number; againstWeight: number }` (import `Verdict` type + `QUADRANT_STYLE` from `@/components/BalanceWeightChip`). Delete `getVerdictLabel(confidence)` and the 80/55 ladder; derive styles from the quadrant color:
```tsx
const s = QUADRANT_STYLE[verdict.quadrant];
const verdictLabel = verdict.label;
```
Replace the three `verdictStyles` usages with inline `style={{ borderColor: `${s.color}66`, color: s.color }}` / `style={{ backgroundColor: s.color }}` equivalents, and the `{confidence}%` badge (L326-328) with:
```tsx
<div className="px-3 py-1 rounded-full text-white font-mono font-bold" style={{ backgroundColor: s.color }}>
  {balance}/100 · w{weight}
</div>
```
- Drop `getVerdictLabel` from the L8 import.

- [ ] **Step 4: `components/ControversyMeter.tsx`** (reframe onto the two axes)

New props + tier derivation. Replace L10-13 and L19-26 and the L88-98 body:

```tsx
import type { Verdict } from "@/lib/schemas/topic";

interface ControversyMeterProps {
  balance: number; // 0-100, 50 = even
  weight: number; // 0-100
  verdict: Verdict;
  status: TopicStatus;
}

// Quadrant → heat tier. Controversy is being well-mapped AND balanced:
// settled maps coolest, well-mapped-contested is hottest, thin maps speculative.
const QUADRANT_TIER: Record<Verdict["quadrant"], HeatTier> = {
  settled: "cool",
  moderate: "warm",
  contested: "hot",
  open: "explosive",
};
```

In the component: `const tier = QUADRANT_TIER[verdict.quadrant];` and the marker position becomes contested-ness — high weight AND low lean = maximum controversy:

```tsx
// Contested-ness: rich evidence pulling both ways. 0 when settled or thin.
const controversyPct = Math.round(weight * (1 - Math.abs(balance - 50) / 50));
```

Update the aria/copy sites: L136 `aria-valuenow={controversyPct}` with `aria-label={`Controversy level: ${displayLabel} (balance ${balance}/100, weight ${weight}/100)`}`; L146 sr-only → `` {`Balance ${balance} of 100, weight ${weight} of 100`} ``; L165-168 tooltip →

```tsx
<p className="mt-2 text-xs text-stone-400">
  Based on the balance of evidence ({balance}/100 — which way it tips) and its
  weight ({weight}/100 — how much bears on the question), computed from source
  quality and crux verifiability.
</p>
```

- [ ] **Step 5: `components/VerdictVoting.tsx`**

- L11-15: rename prop `confidenceScore` → `balance` (comment: `// The AI's evidence-balance (0 = against, 100 = for) for comparison`).
- L338-362: replace every `confidenceScore` read with `balance` and reword the intro sentence:
```tsx
The evidence balance for this topic is{" "}
<span className="font-mono font-semibold text-deep tabular-nums">{balance}/100</span>{" "}
(0 = against, 100 = for).
```
The three `Math.abs(userVote - balance)` comparisons stay structurally identical — the user vote is a tilt and now correctly compares against the tilt axis.

- [ ] **Step 6: `components/ShareButtons.tsx`**

- L21-34 `topicMeta`: replace `confidenceScore: number;` with:
```ts
verdictLabel: string;
balance: number;
weight: number;
```
- L56-76: update the docstring and `buildTweetText`:
```ts
function buildTweetText(meta: NonNullable<ShareButtonsProps["topicMeta"]>): string {
  let text = `${meta.metaClaim} Verdict: ${meta.verdictLabel}.`;

  if (meta.cruxQuestion) {
    text += `\n\nThe crux: ${meta.cruxQuestion}`;
  }

  text += "\n\nSee the full argument map →";
  return text;
}
```
(`STATUS_LABELS` may become unused — remove if so.)

- [ ] **Step 7: `components/MobileArgumentList.tsx`**

L286: replace `{topic.confidence_score}% confidence` span with `{topic.verdict.label}` (same classes).

- [ ] **Step 8: `components/TopicIntroPanel.tsx`**

L91-112: replace the 80/50 inline-styled `%` span with:
```tsx
<BalanceWeightChip balance={topic.balance} weight={topic.weight} verdict={topic.verdict} />
```
(import at top; `topic` here is a `TopicSummary` — fields exist per Task 4.)

- [ ] **Step 9: Typecheck, test, build**

Run: `bunx tsc --noEmit && bun test && bun run build`
Expected: all green. (The build will catch any missed `confidenceScore` prop.)

- [ ] **Step 10: Commit**

```bash
git add components/ app/topics/[id]/TopicDetailView.tsx
git commit -m "feat: migrate topic-page surfaces to Balance + Weight readouts"
```

---### Task 7: SEO/meta surfaces — JSON-LD, OG image, `is/`, `questions/`, embed

**Files:**
- Modify: `app/topics/[id]/page.tsx` (L3, L31-33, L98-104)
- Modify: `app/api/og/[id]/route.tsx` (L3, L7-12, L51-54, L150-160, L259-285)
- Modify: `app/is/[slug]/page.tsx` (L5, L55-56, L110, L136-141, L205-210, L261-276)
- Modify: `app/questions/[slug]/page.tsx` (L5, L98, L119-124, L257-275)
- Modify: `app/embed/[topicId]/page.tsx` (L3, L39-63, L191)

**Interfaces:**
- Consumes: `topic.balance/weight/verdict`, `BalanceWeightReadout`/`BalanceWeightChip`/`QUADRANT_STYLE` (all server-safe by design).
- Produces: JSON-LD keeps a scalar `ratingValue` (= `topic.confidence_score`, which equals balance) with `alternateName: topic.verdict.label`.

- [ ] **Step 1: `app/topics/[id]/page.tsx`**

- L3: drop the `getVerdictLabel` import.
- L31-33: `const description = `${topic.meta_claim} — ${topic.verdict.label}. Explore ${topic.pillars.length} argument pillars with steel-manned positions, weighted evidence, and crux questions.`;`
- L98-104 ClaimReview rating:
```tsx
reviewRating: {
  "@type": "Rating",
  ratingValue: topic.confidence_score, // = balance; schema.org needs a scalar
  bestRating: 100,
  worstRating: 0,
  alternateName: topic.verdict.label,
  ratingExplanation: `Balance of evidence ${topic.balance}/100 (50 = even split); weight of evidence ${topic.weight}/100.`,
},
```

- [ ] **Step 2: `app/api/og/[id]/route.tsx`**

- L3: drop `getVerdictLabel`; add `import { QUADRANT_STYLE } from "@/components/BalanceWeightChip";` — **if the edge runtime rejects that import, inline a local `const QUADRANT_COLORS = { settled: "#3a6965", contested: "#a23b3b", moderate: "#C4613C", open: "#78716c" }` instead.**
- L7-12: DELETE `getScoreColor`.
- L51-54:
```ts
const scoreColor = QUADRANT_STYLE[topic.verdict.quadrant].color;
const verdict = topic.verdict.label;
```
- L150-160 verdict text block: unchanged markup (now renders the 2-D label).
- L259-285 score circle: the big number becomes `{topic.balance}` and the caption `Confidence` → `Balance`. Directly below the caption, add a weight row:
```tsx
<div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "10px" }}>
  <div style={{ display: "flex", width: "120px", height: "8px", backgroundColor: "#e7e2d8", borderRadius: "4px" }}>
    <div style={{ display: "flex", width: `${(topic.weight / 100) * 120}px`, height: "8px", backgroundColor: scoreColor, borderRadius: "4px" }} />
  </div>
  <div style={{ display: "flex", fontSize: "13px", color: "#78716c", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px" }}>
    Weight {topic.weight}
  </div>
</div>
```
Verify locally by requesting `/api/og/moloch` in `bun dev`.

- [ ] **Step 3: `app/is/[slug]/page.tsx`**

- L5: drop `getVerdictLabel`.
- L55-56: `` const description = `${claim.claim}. Evidence assessment: ${topic.verdict.label} (balance ${topic.balance}/100, weight ${topic.weight}/100). Explore ${topic.pillars.length} argument pillars with weighted evidence.`; ``
- L110: `const verdict = topic.verdict.label;`
- L136-141 `synthesizedAnswer` second line: `` `Based on ${totalEvidence} pieces of evidence across ${topic.pillars.length} argument pillars, the assessment is: ${verdict} (balance of evidence ${topic.balance}/100 where 50 is an even split; weight of evidence ${topic.weight}/100).` ``
- L205-210: DELETE the `confidenceColor` ladder.
- L261-276: replace the verdict + bar block with:
```tsx
<div className="mt-4">
  <p className="font-serif text-2xl font-bold text-primary">{verdict}</p>
  <BalanceWeightReadout
    balance={topic.balance}
    weight={topic.weight}
    verdict={topic.verdict}
    className="mt-3"
  />
</div>
```
(import `BalanceWeightReadout` at top.)

- [ ] **Step 4: `app/questions/[slug]/page.tsx`**

- L5: drop `getVerdictLabel`; import `BalanceWeightReadout`.
- L98: `const verdict = topic.verdict.label;`
- L119-124 second line: `` `The evidence assessment is "${verdict}" — balance of evidence ${topic.balance}/100 (50 = even split), weight of evidence ${topic.weight}/100.` ``
- L257-275: keep the "Evidence assessment" caption + verdict headline; replace the fixed bar + `/100` caption with `<BalanceWeightReadout balance={topic.balance} weight={topic.weight} verdict={topic.verdict} className="mt-3" />`.

- [ ] **Step 5: `app/embed/[topicId]/page.tsx`**

- L3: drop `getVerdictLabel`; import `BalanceWeightReadout`.
- L39-63: DELETE the whole `ConfidenceBar` component.
- L191: `<ConfidenceBar score={topic.confidence_score} />` → `<BalanceWeightReadout balance={topic.balance} weight={topic.weight} verdict={topic.verdict} />`.
- Do NOT touch `VerdictBanner`/`getMockVerdict` (debate feature).

- [ ] **Step 6: Verify + commit**

Run: `bunx tsc --noEmit && bun run build`
Expected: green.

```bash
git add app/topics/[id]/page.tsx app/api/og/[id]/route.tsx app/is app/questions app/embed
git commit -m "feat: two-axis verdicts in JSON-LD, OG images, and SEO pages"
```

---

### Task 8: Lists, explore, search, compare, dashboard, library, moltbook, blueprint

**Files:**
- Modify: `components/Sidebar.tsx` (L222-224), `components/HomeClient.tsx` (L234-244), `components/FeaturedTopicHero.tsx` (L58-63, L83-102), `components/SearchModal.tsx` (L35, L143-147, L215, L255, L528-530, L585-596), `components/TopicExplorer.tsx` (12 sites), `app/topics/page.tsx` (L54-60, L91-108, L297-317), `app/explore/page.tsx` (L61-67, L143-159, L412-432), `app/topics/compare/[id1]/vs/[id2]/ComparisonView.tsx` (L24, L101-106, L258, L282-284, L341-347, L519-537), `app/topics/compare/[id1]/vs/[id2]/page.tsx` (L4 dead import), `app/topics/compare/CompareIndexView.tsx` (L27-28, L40, L93-95, L121-123, L216-218, L259-261, L335-337), `app/topics/compare/page.tsx` (L56-57, L89), `app/dashboard/page.tsx` (L136-168), `app/library/page.tsx` (L90-109), `app/analysis/[id]/AnalysisView.tsx` (L488 only), `app/api/moltbook/route.ts` (L142), `lib/moltbook/debate-integration.ts` (L61, L79, L86), `data/logicBlueprint.ts` (L37)

**Interfaces:**
- Consumes: `TopicSummary.balance/weight/verdict` (Task 4), full-`Topic` fields (Task 2), `BalanceWeightChip` (Task 5), `BALANCE` constant.
- Produces: new sort options keyed on weight/lean/balance; `TopicExplorer` filters `minWeight` + `leanFilter`.

- [ ] **Step 1: Simple chip swaps**

- `Sidebar.tsx` L222-224: `{topic.confidence_score}%` span → `<BalanceWeightChip balance={topic.balance} weight={topic.weight} verdict={topic.verdict} />`.
- `HomeClient.tsx` L234-244: the 80/50 chip → `<BalanceWeightChip balance={topic.balance} weight={topic.weight} verdict={topic.verdict} showLabel className="mt-2" />`.
- `FeaturedTopicHero.tsx`: L60 `const score = summary.confidence_score;` → delete; L83-102 confidence block → `<BalanceWeightReadout balance={summary.balance} weight={summary.weight} verdict={summary.verdict} className="w-full max-w-md" />` followed by the existing meta_claim `<p>`.
- `AnalysisView.tsx` L488 (topic path only): `<ConfidenceBadge score={topic.confidence_score} />` → `<BalanceWeightChip balance={topic.balance} weight={topic.weight} verdict={topic.verdict} />`. Leave `ConfidenceBadge` itself and the extractor sites (L590, L596) untouched.
- `data/logicBlueprint.ts` L37: `score: topic.confidence_score` → `score: topic.balance` (same number today; the graph `MetaNode` gauge stays as-is per spec).
- `app/topics/compare/[id1]/vs/[id2]/page.tsx` L4: remove the dead `getVerdictLabel` import (keep `calculateEvidenceScore`).

- [ ] **Step 2: `SearchModal.tsx`**

- L35: replace `confidenceScore?: number;` with `balance?: number; weight?: number; verdict?: Verdict;` (import the type).
- L143-147: replace `getVerdictInfo` with a balance-based version using the shared constant:
```ts
import { BALANCE } from "@/lib/constants";

function getLeanInfo(balance: number): { label: string; color: string } {
  const d = Math.abs(balance - 50);
  if (d < BALANCE.EVEN_D) return { label: "Draw", color: "text-stone-500" };
  return balance >= 50
    ? { label: "For", color: "text-rust-600" }
    : { label: "Against", color: "text-deep" };
}
```
- L215 + L255 mappings: `confidenceScore: t.confidence_score` → `balance: t.balance, weight: t.weight, verdict: t.verdict`.
- L528-530: `const verdict = isTopic && result.balance != null ? getLeanInfo(result.balance) : null;`
- L585-596 render: replace the `{result.confidenceScore}%` line with the chip if verdict data exists:
```tsx
{isTopic && result.balance != null && result.weight != null && result.verdict ? (
  <div className="flex-shrink-0 flex flex-col items-end gap-0.5">
    <BalanceWeightChip balance={result.balance} weight={result.weight} verdict={result.verdict} />
    <div className={`text-[10px] font-medium ${verdict!.color}`}>{verdict!.label}</div>
  </div>
) : ( ... keep the existing fallback ... )}
```

- [ ] **Step 3: `TopicExplorer.tsx`** (filter redesign)

- L42-51 `TopicNodeData`: replace `confidence_score: number;` with `balance: number; weight: number; verdict: Verdict;`.
- L145-177 node badge: replace the 75/50 inline-styled span with `<BalanceWeightChip balance={data.balance} weight={data.weight} verdict={data.verdict} />`.
- Filter state (L567): replace `confidenceRange` with:
```ts
const [minWeight, setMinWeight] = useState(0);
const [leanFilter, setLeanFilter] = useState<"all" | "for" | "against" | "balanced">("all");
```
- L582-589 `filteredTopics` predicate: replace the two range comparisons with:
```ts
t.weight >= minWeight &&
(leanFilter === "all" ||
  (leanFilter === "balanced" && Math.abs(t.balance - 50) < BALANCE.EVEN_D) ||
  (leanFilter === "for" && t.balance - 50 >= BALANCE.EVEN_D) ||
  (leanFilter === "against" && 50 - t.balance >= BALANCE.EVEN_D))
```
- `FilterPanel` props (L320-341): `confidenceRange`/`onSetConfidenceRange` → `minWeight: number; leanFilter: LeanFilter; onSetMinWeight: (v: number) => void; onSetLeanFilter: (v: LeanFilter) => void;` (export `type LeanFilter = "all" | "for" | "against" | "balanced"` near the top).
- Desktop slider UI (L425-470) AND the mobile duplicate (L946-990): replace the two-thumb range with ONE slider + a segmented lean control:
```tsx
{/* Minimum weight of evidence */}
<div>
  <p className="text-[11px] font-medium text-stone-400 mb-2 tracking-wide">
    Min. Weight of Evidence
  </p>
  <div className="flex items-center gap-2">
    <input
      type="range" min={0} max={100} value={minWeight}
      onChange={(e) => onSetMinWeight(Number(e.target.value))}
      aria-label="Minimum weight of evidence"
      className="flex-1"
    />
    <span className="font-mono text-xs tabular-nums text-stone-500 w-8 text-right">{minWeight}</span>
  </div>
</div>

{/* Lean */}
<div className="mt-3">
  <p className="text-[11px] font-medium text-stone-400 mb-2 tracking-wide">Lean</p>
  <div className="flex gap-1">
    {(["all", "for", "against", "balanced"] as const).map((v) => (
      <button
        key={v}
        onClick={() => onSetLeanFilter(v)}
        className={`px-2 py-1 rounded-md text-[11px] font-medium capitalize border ${
          leanFilter === v
            ? "border-deep bg-deep/10 text-deep"
            : "border-stone-200 dark:border-[#3d3a36] text-stone-500"
        }`}
      >
        {v}
      </button>
    ))}
  </div>
</div>
```
(mobile version calls `setMinWeight`/`setLeanFilter` directly, mirroring the existing pattern.)
- L615 node construction: `balance: t.balance, weight: t.weight, verdict: t.verdict,`.
- L698 reset: `setMinWeight(0); setLeanFilter("all");`
- L709-713 `hasActiveFilters`: `… || minWeight > 0 || leanFilter !== "all"`.
- L532, L790, L1044 `%` spans → `<BalanceWeightChip … />` with the topic's summary fields.

- [ ] **Step 4: Sort redefinition — `app/topics/page.tsx` + `app/explore/page.tsx`**

`app/topics/page.tsx`:
```ts
type SortOption = "category" | "weight-desc" | "contested" | "balance-desc" | "balance-asc" | "title-asc";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "category", label: "By category" },
  { value: "weight-desc", label: "Most settled" },
  { value: "contested", label: "Most contested" },
  { value: "balance-desc", label: "Strongest for" },
  { value: "balance-asc", label: "Strongest against" },
  { value: "title-asc", label: "Alphabetical" },
];
```
Sort logic (L91-108):
```ts
case "category": {
  const catDiff = CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category);
  if (catDiff !== 0) return catDiff;
  return b.weight - a.weight;
}
case "weight-desc":
  return b.weight - a.weight;
case "contested":
  // most contested = well-evidenced AND balanced: small lean first, weight breaks ties
  return (
    Math.abs(a.balance - 50) - Math.abs(b.balance - 50) || b.weight - a.weight
  );
case "balance-desc":
  return b.balance - a.balance;
case "balance-asc":
  return a.balance - b.balance;
```
Card meter (L297-317): replace the confidence bar + `%` with:
```tsx
<div className="flex items-center justify-between gap-2.5 mb-3">
  <BalanceWeightChip balance={topic.balance} weight={topic.weight} verdict={topic.verdict} showLabel />
</div>
```

`app/explore/page.tsx`: identical treatment — keep `evidence-desc` (default) and `title-asc`, replace the two confidence sorts with the four above, and swap the meter block (L412-432) for the same chip row.

- [ ] **Step 5: Compare surfaces**

`ComparisonView.tsx`:
- L24: drop `getVerdictLabel`; import `BalanceWeightChip`, `QUADRANT_STYLE`.
- L101-106: DELETE `confidenceColor`.
- L258: `<ConfidenceGauge score={topic.confidence_score} size={100} />` → `<BalanceWeightChip balance={topic.balance} weight={topic.weight} verdict={topic.verdict} showLabel />` (drop the now-unused `ConfidenceGauge` import if this was its only use in the file).
- L282-284 caption: `{getVerdictLabel(topic.confidence_score)}` → `{topic.verdict.label}`.
- L341-347 StatRow: replace the single Confidence row with two:
```tsx
<StatRow label="Balance (for ↔ against)" value1={topic1.balance} value2={topic2.balance} suffix="/100" highlight="higher" />
<StatRow label="Weight of evidence" value1={topic1.weight} value2={topic2.weight} suffix="/100" highlight="higher" />
```
- L519-537 footer CTAs: `<span className={…confidenceColor…}>{topicN.confidence_score}%</span>` → a `style={{ color: QUADRANT_STYLE[topicN.verdict.quadrant].color }}` span containing `{topicN.verdict.label}` at `text-sm font-medium` (the 2xl% number no longer means anything alone).

`CompareIndexView.tsx`:
- L27-28 `FeaturedPair`: `score1/score2` → `balance1: number; weight1: number; verdict1: Verdict; balance2: number; weight2: number; verdict2: Verdict;`
- L40 `TopicItem`: `confidence_score: number;` → `balance: number; weight: number; verdict: Verdict;`
- L93-95 / L121-123: `{pair.scoreN}%` → `<BalanceWeightChip balance={pair.balanceN} weight={pair.weightN} verdict={pair.verdictN} />`.
- L216-218 / L259-261: `{selectedX.confidence_score}% confidence` → `{selectedX.verdict.label}`.
- L335-337: `%` span → `<BalanceWeightChip … />` from the item fields.
- L417-420 hero copy: "Compare confidence scores, evidence balance, …" → "Compare the balance and weight of evidence, argument pillars, and key crux questions."

`app/topics/compare/page.tsx`:
- L56-57 + L67-68 cast: emit `balance1/weight1/verdict1/balance2/weight2/verdict2`.
- L89 mapper: `confidence_score: t.confidence_score,` → `balance: t.balance, weight: t.weight, verdict: t.verdict,`.
- L17/L31/L38 copy: "See confidence scores, evidence balance, and argument pillars…" → "See the balance and weight of evidence and argument pillars…".

- [ ] **Step 6: Dashboard, library, moltbook**

- `app/dashboard/page.tsx` L136-168: delete `confPct`; replace the meter block with `<BalanceWeightChip balance={topic.balance} weight={topic.weight} verdict={topic.verdict} showLabel />`.
- `app/library/page.tsx` L90-109: replace bar + `%` cell with the same chip (full-`Topic` fields).
- `app/api/moltbook/route.ts` L142: the mapped object becomes `{ id: t.id, title: t.title, balance: t.balance, weight: t.weight, verdict: t.verdict.label, status: t.status }`.
- `lib/moltbook/debate-integration.ts`: L61 title → `` `[DEBATE] ${topic.title} — ${topic.verdict.label}` ``; L79 → `` **Balance of evidence:** ${topic.balance}/100 · **Weight:** ${topic.weight}/100 ``; L86 ternary → `topic.balance >= 50 ? "toward supporting" : "against"`.

- [ ] **Step 7: Verify + commit**

Run: `bunx tsc --noEmit && bun test && bun run build`
Expected: green.

```bash
git add components/ app/ lib/moltbook/ data/logicBlueprint.ts
git commit -m "feat: migrate lists, explore, search, compare, dashboard, and API surfaces to Balance + Weight"
```

---

### Task 9: Cleanup, sweep, and visual verification

**Files:**
- Modify: `lib/schemas/topic.ts` (delete `getVerdictLabel`), `types/logic.ts` (drop its re-export)
- Verify: whole repo

**Interfaces:** none new. This task deletes the deprecated 1-D API and proves the success criteria.

- [ ] **Step 1: Delete `getVerdictLabel`**

Remove the function from `lib/schemas/topic.ts` and its re-export from `types/logic.ts` (keep the `computeConfidenceScore = computeBalance` alias and the `confidence_score` field — both are deliberate).

Run: `bunx tsc --noEmit` — any remaining caller is a missed migration; fix it (EXCEPT `app/api/og/route.tsx`'s unrelated local function of the same name).

- [ ] **Step 2: Grep sweep — no surface displays a lone score**

Run each; every hit must be either out-of-scope (extractor/judge/mock-verdict) or a deliberate deprecated field:

```bash
grep -rn "confidence_score" app components lib hooks --include='*.tsx' --include='*.ts' | grep -v "@deprecated" || true
grep -rn "% confidence" app components lib || true
grep -rn "/100" app components | grep -iv "balance\|weight" || true
grep -rn "getVerdictLabel" app components lib data types | grep -v "api/og/route.tsx" || true
```

Expected: the first returns only JSON-LD `ratingValue` usage and internal mirrors; the second and fourth return nothing in-scope.

- [ ] **Step 3: Full verification suite**

```bash
bun test && bun run lint && bun run build
bun --bun tsx scripts/calibrate-weight.ts
bun --bun tsx scripts/regen-summaries.ts && git diff --exit-code data/topicSummaries.json
```
Expected: tests/lint/build green; calibration anchors PASS; summaries already up to date (no diff).

- [ ] **Step 4: Visual eyeball (Playwright/browser), light + dark**

Start `bun dev` and screenshot each migrated surface in both themes; check for layout breakage, unreadable contrast, and any stray `%`:
`/` (grid + FeaturedTopicHero + Sidebar + SearchModal), `/topics`, `/explore`, `/topics/moloch` (MUST read "Well-mapped, genuinely contested"), `/topics/moloch?view=graph` (ScalesOfEvidence + TopicIntroPanel + MobileArgumentList at mobile width), `/topics/moon-landing` (settled), `/topics/compare` + one `/vs/` page, `/is/<any-slug>`, `/questions/<any-slug>`, `/embed/moloch`, `/dashboard`, `/library`, `/api/og/moloch` (image). Fix what's broken; re-screenshot.

- [ ] **Step 5: Success-criteria checklist (from spec §7)**

- [ ] No surface displays a lone `confidence_score` / "X% confidence" / bare "X/100".
- [ ] Moloch reads "Well-mapped, genuinely contested".
- [ ] `topicSummaries.json` regenerated and in sync.
- [ ] build/test/lint green; calibration anchors hold.
- [ ] JSON-LD + OG emit valid output (validate one topic page with Google's Rich Results test format by eye).

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: complete two-axis confidence migration — remove 1-D verdict API"
```
