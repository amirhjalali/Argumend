# Gap metric logging

The north-star metric is the gap between how much people *seem* to disagree and
how much they *actually* disagree (spec
`docs/plans/2026-09-22-crux-ledger-and-living-ai-map-spec.md` §3, principles in
`docs/plans/2026-09-22-north-star.md`). This page covers the groundwork: what is
logged, how it is aggregated, and where it can mislead.

It is **internal only**. There is no public display of the gap number (spec §4),
and it is never a verdict on a conversation or a person.

## The flag

`ENABLE_GAP_METRIC_LOGGING=true` (default off). When on, and `DATABASE_URL` is
set, each *successful* response from `POST /api/map-reply` (matched to a map)
and `POST /api/disagreements/analyze` inserts one row into `gap_observations`.

- Fire-and-forget: the insert is never awaited by the route.
- A no-op without `DATABASE_URL` (checked before `getDb()` is touched).
- Never fails the request: derivation, validation, `getDb()` and the insert are
  all inside a guard that only logs a sanitized warning.
- A no-match map reply logs nothing: there is no map to measure against.

## Privacy: counts only, no text

The record (`lib/gapMetric/record.ts`) has no free-text field.

| Field | Kind |
|---|---|
| `lane` | enum: `map-reply`, `analyze-v2` |
| `topicId` | slug from `data/`, or null on analyze-v2 |
| `propositionCount`, `talkingPastCount`, `definitionalCount`, `undisputedCount`, `contestedCount`, `unmatchedCount` | int |
| `speakerCount`, `cruxTouchedCount` | int |
| `cruxClaimIds` | map crux slugs (map-reply only) |
| `confidenceBucket` | enum: `none`, `tentative`, `low`, `medium`, `high` |
| `modelId`, `promptVersion` | id-shaped (no spaces), else stored as `unknown` |
| `observedOn` | UTC day, no time of day |

No paste, no excerpt, no speaker handle, no IP, no user id, no request id, no
timestamp finer than a day. Enforced four ways:

1. `GapObservationSchema` is a strict Zod object: unknown keys are refused, and
   every string is an enum or matches a slug/version pattern (no spaces, so no
   sentences). The logger parses before inserting and drops anything refused.
2. A type-level test fails `tsc` if a new free-string field is added to the record.
3. The table has no `text`/`json` column; the only varchar columns are four short
   id columns, each pinned by a Postgres `CHECK` regex (for `crux_claim_ids`, every
   element must be a slug and there are at most 32). `lib/gapMetric/schema.test.ts`
   inspects the Drizzle columns and the migration SQL.
4. Route tests assert the stored row contains no speaker handle and no long word
   from the pasted fixture.

`cruxClaimIds` is empty on analyze-v2 on purpose: those claim ids are minted by
the model per report, mean nothing across reports, and could echo the paste.

## Interpretation of §3.1 per lane

`gap = (talkingPast + definitional + undisputed) / propositionCount`, with
`unmatchedCount` excluded from the denominator. Labels partition the
propositions (a DB `CHECK` enforces it).

**map-reply** — the pipeline has no per-proposition label, so a proposition is
one *probed turn*:

- unmatched: placement not `confident`, or composed as "not an argument";
- talking past: a confident turn placed in a section other than the dominant one;
- definitional: a confident dominant-section turn when the thread-level
  `definitional` signal cleared its threshold;
- contested: every other confident dominant-section turn;
- undisputed: always 0 — this lane has no agreement probe, and it is not guessed.

These are **interpretations**, not labels the pipeline produces, and two of them
are coarse:

- *Definitional is all-or-nothing per thread.* The `definitional` signal is
  thread-level, so when it clears its threshold every dominant-section turn is
  definitional and contested drops to 0. A map-reply gap is therefore close to
  bimodal on that one signal, and a threshold change moves it a lot — exactly the
  Goodhart shape the contested-share guardrail watches for.
- *Talking past cannot tell a second fight from a missed one.* A thread arguing two
  sections in earnest counts its minority section as talking past. A stricter
  reading (open question for the founder): count an off-dominant turn as talking
  past only when no other speaker argues that section; otherwise it is contested.

`confidenceBucket` is the median placement confidence of the dominant section's
turns (`low` < 0.70 ≤ `medium` < 0.85 ≤ `high`), `tentative` when the dominant
section is a weak guess, `none` when there is none. Only confident turns (≥ 0.70)
enter that median, so `low` does not occur on this lane today. `speakerCount` is the number
of distinct speaker labels; the labels themselves are not stored.

**analyze-v2** — a proposition is one common-ground item or one disagreement item:
common ground → undisputed; a `definitional` disagreement → definitional; any other
disagreement → contested. Talking past and unmatched are always 0 (no such label;
no map). `confidenceBucket` is the diagnosis confidence band.

The two lanes measure different things and are never pooled: every aggregate is
per lane.

## Aggregation (§3.3)

`lib/gapMetric/aggregate.ts`: per ISO week × lane × prompt version (optionally
× topic), the median gap with Q1, Q3, IQR and n, plus the median contested share
(Goodhart guardrail) and median unmatched count (map-coverage signal). Medians,
never means.

- **Small-n suppression:** a cell with n < 20 reports n and `insufficient`, never
  a median. 20 is the spec's floor; below it, a single thread moves the median
  by more than any real change we could hope to detect.
- Replies with `propositionCount = 0` (everything unmatched) do not count toward
  n; they are reported as `emptyCount`.
- The median unmatched count is *not* suppressed under n < 20: it is a
  map-coverage alarm, and an all-unmatched week (n = 0) is exactly when it matters.
- A new `promptVersion` is a new segment, never merged with the old one.
- Empty weeks in the requested range appear with n = 0.

Report: `npx tsx scripts/gap-metric-report.ts [--weeks 12] [--by-topic]`
(or `bun run metric:gap`). Without `DATABASE_URL` it explains how to run it.
Migration: `drizzle/0003_gap_observations.sql` (hand-trimmed; see its header).

## Failure modes (§3.4)

| Failure | Why it bites | Mitigation here |
|---|---|---|
| The classifier defines the metric | talking-past and definitional are model judgments; a prompt tweak moves the number with no change in the world | segmented on `promptVersion`; before adopting a prompt change, re-score a frozen 50-item labeled set (not built yet) |
| Selection bias | people who paste into an argument map are unusually reflective | it is *our readers' gap*, never "public discourse"; the report header says so |
| Goodhart | pushing the gap up rewards maps that label everything definitional | contested share is reported beside the gap; a gap rise with contested share collapsing is a regression |
| Map-shaped measurement | the gap is only as good as the map's coverage | `unmatchedCount` is logged and excluded from the denominator; a rising median unmatched is a map-coverage bug |
| Thin n | early volume is tiny | cells under n = 20 are suppressed; the number stays internal until 12 consecutive weeks clear n ≥ 20 |
| Lane definitions differ | map-reply cannot see agreement; analyze-v2 cannot see talking past | lanes are never pooled |
