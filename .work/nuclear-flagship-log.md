# Nuclear Flagship — Autonomous Loop Work Log

Goal: build the Nuclear flagship user-journey experience per
`docs/plans/2026-06-22-nuclear-flagship-journey-design.md`, then continue broader
Argumend improvement. Self-paced loop. Verify every change (tsc + vitest + routes),
commit incrementally, **do not push**.

Branch: `nuclear-flagship` (off `main`).

---

## Pacing notes (data-driven — I CAN read real usage)
- Real numbers live at `/tmp/claude/statusline-usage-cache.json` (monclaude refreshes
  every ~180s via the OAuth `/api/oauth/usage` endpoint). Read `.five_hour.utilization`,
  `.five_hour.resets_at`, `.seven_day.utilization`, `.seven_day.resets_at`.
- TWO windows: **5h rolling = rate cap** (keep < 80%); **7d = budget envelope to spend**
  (was 12% used at start, resets ~2026-06-24T02:00Z — the founder's "1d 19h" reset).
- Policy: 5h < 70% → full speed, big chunks, ~60s sleeps. 70–80% → stretch sleeps.
  ≥ 80% → sleep until `five_hour.resets_at`, then resume. Burn the weekly down meanwhile.
- One meaningful, verified, committed chunk per iteration.

---

## Iteration log

### Iter 0 — 2026-06-22 — Phase 0 (design + setup)
- Assessed repo: 142 topics, 57 blog posts, 19 guides; tsc clean; 207 tests green.
- Found + parked the breadth play: 132/142 topics lack an `/is/` AEO page (scoped, batched).
- Founder redirect → depth on one flagship topic. Chose **nuclear-energy-safety**.
- Mapped current Read-Mode journey; identified 3 gaps (buried wow, no crisp atomic
  facts w/ confidence, crux is "what settles it" not "what would change your mind").
- Wrote design doc (5-stage journey + falsification crux model + phased plan).
- Created branch, work log. Baseline verified.
- **Next:** Phase 1 — additive schema (`CruxSchema.falsification`,
  `Topic.keystone_fact`, `Topic.simple_case`); confirm all 142 topics still validate.

### Iter 1 — 2026-06-22 — Phases 1 + 2 (schema + nuclear content)
- Discovered I can read real usage (monclaude cache) → switched to data-driven pacing.
  5h was 7–8% throughout (huge headroom); old 20-min naps were far too slow.
- Phase 1: added optional `CruxSchema.falsification`, `Topic.keystone_fact`,
  `Topic.simple_case`. tsc clean; 207 tests pass (all topics still validate).
- Phase 2: authored nuclear `keystone_fact`, `simple_case`, and falsification for both
  pillars (safety; climate-effectiveness). tsc clean; 207 tests pass. Committed `1ebc7a3`.
- **Next:** Phase 3 — `FalsificationCrux` component + atomic-fact confidence tiers,
  wired into `ReadModeView` gated on data presence (no regression for other topics).

### Iter 2 — 2026-06-22 — Phase 3 (falsification crux + atomic-fact tiers)
- `confidenceTier()` helper; `FalsificationCrux` component (gated on `crux.falsification`,
  falls back to the old test view); `EvidenceItem` now shows tier + "% confidence".
- Wired into `ReadModeView`. tsc clean; 207 tests; eslint clean; **full production
  build passed** and nuclear HTML verified to contain the falsification + confidence
  content. Committed `2a34dd7`. 5h usage ~9%.
- **Next:** Phase 4 — render Stage-1 keystone hero (`topic.keystone_fact`) above the
  claim + Stage-2 `simple_case`, gated on presence so other topics are unaffected.
