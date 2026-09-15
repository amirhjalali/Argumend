# V2 disagreement-diagnosis checkpoint evidence (2026-09-15)

Blind rubric scoring of live reports produced by the `cli` provider lane (local
subscription, `docs/DISAGREEMENT_LOOP.md`) against
`docs/evals/disagreement-diagnosis-rubric.md`. Three independent reviewer agents,
each given only the rubric, the spec, the invariants, and the raw report JSON.
This is the material the spec's founder checkpoints (§22) were waiting on.

| File | What was scored | Reports |
|---|---|---|
| `sonnet-sources-run1-part1.md` | authored sources, alphabetical 1-20, sonnet | 20 |
| `sonnet-sources-run1-part2-and-flagship-corpus.md` | authored sources 21-40 + the 3 flagship map-recovery reports, sonnet | 23 |
| `sonnet-flagship-repeatability-run1-vs-run2.md` | the same 3 flagship maps, a second sonnet run, compared to the first | 3 + 3 |

Raw reports (gitignored, on the founder's machine): `.eval-runs/sources-2026-09-15T02-22-03-636Z/`,
`.eval-runs/corpus-2026-09-15T02-22-04-608Z/` (run 1), `.eval-runs/corpus-2026-09-15T12-49-35-888Z/`
(run 2, the first 3 files; the rest of that directory is a rate-limited partial legacy run).

**Correction:** the third file was commissioned as an opus-vs-sonnet comparison. The opus run's
directory was deleted by the orchestrator in a cleanup mistake and the reviewer was pointed at a
second sonnet run instead. The comparison is therefore a sonnet repeatability check, which turned out
to be informative in its own right (different primary crux on all three maps). No opus report was
scored. The execution metadata in report JSON also records the model alias only, so the two runs are
indistinguishable from the artifacts; see the handoff for the follow-up.

Headline numbers (rubric 0-14 per report):

- Authored sources, 40 reports: mean 11.7. Quote grounding 390/390 verbatim. Zero invented sources,
  zero invented opponents, prompt injection neutralised, no winner or percentage anywhere.
- Hard-gate failures (value dispute presented as empirical in user-visible fields): 3 of 40
  (explicit-update-commitment, mixed-value-and-empirical, same-conclusion-different-reasons). Under the
  rubric's own rule the run FAILS on these until the projection defect behind them is fixed.
- Flagship map recovery, run 1: capitalism SAME crux (14/14), us-israel ADJACENT (10), ai-jobs
  DIFFERENT primary / ADJACENT secondary (11). Run 2: DIFFERENT, DIFFERENT, same-text-only; run 1
  preferred on all three by the reviewer.

Systematic defects both source reviewers found independently, with the mechanism each traced:

1. Primary crux is not the load-bearing disagreement (12/17 and 12/23): restates the question, picks an
   uncontested premise, or surfaces explicit common ground. Engine/candidate territory: founder call.
2. `primaryType = disagreements[0]?.type` in `projectReport.ts` disagrees with the primary crux's type;
   this is the mechanism behind every hard-fail. Mechanical fix.
3. Pattern selection is count-driven in `diagnosis.ts`: `mostly-common-ground` fires with
   `sharedGround: "low"`; `mixed-disagreement` is the fallthrough for "procedural"; `single-empirical-crux`
   fired 0 of 20. Mechanical, but §10.6 ordering needs reading.
4. "Further clarification is required." and "would require agreement on <the disagreement>" reach the
   reader as resolution paths (8 + 5 files). Placeholder text; mechanical fix.
5. Common ground with zero or one-sided quotes attributed to all participants (7 + 12 files).
6. "Minted fallback stake" with no participant rendered in the accountability box (11/23).
7. Corpus-only: the renderer's "I know the reply is that X" line is parsed as an explicit update
   commitment (5 stakes), and on two of three maps every engine crux renders as a single uncontested
   line, so a blind run can only echo it, never recover it as a disagreement.
