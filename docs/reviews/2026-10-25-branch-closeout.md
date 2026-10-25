# Branch closeout, October 25, 2026

This review covers the branch backlog starting at remote main `6e73085f8b21b71a47452de334309b804dd61b83`. Work started at 04:23:12 UTC with a hard deadline of 07:23:12 UTC. All implementation and verification ran in isolated worktrees. The shared checkout was reserved for preserving existing work and the final main-branch handoff.

## Integrated work

- Reliability work: bounded requests, cancellation, typed model parsing, quote accounting, private report ownership and storage, route validation, modal focus, and offline behavior.
- Impact work: editable conversation notes, draft preservation, subject-aware map matching, evidence provenance, meaningful crux actions, library navigation, and sharing.
- September sprint: disagreement diagnostics, evidence-state grounding, rate-limit windows, offline fixtures and evaluation, crux experiments, freshness manifests, and design fixes. Superseded routes and score-oriented UI remain retired.
- Capitalism evidence: seven verified evidence nodes and ten edges, with the original seven ledger entries retained and seven superseding corrections appended. Descriptive labor and income statistics carry explicit limits on causal interpretation.
- Archived topic-selection research was retained in history and the documentation tree.

All 176 original local branch tips and all original remote branch tips are ancestors of the integration history. The 20 reliability sibling branches were audited for equivalent or superseded content before their history was joined without changing the integrated tree. The original shared checkout's 36 non-environment implementation files were committed intact in `4ad23bc40e6cf6c778a246c96f10f719459d2a2b` before selecting the newer integrated implementations.

## Defects found during integration

- Copied summaries now redact participant labels across case and canonical Unicode variations without replacing substrings inside unrelated words or recursively replacing generated labels.
- Library Back and Forward navigation restores search, sort, and pagination from the URL without an initialization effect overwriting the restored state.
- Optional crux projection filtering no longer treats word overlap as semantic identity. Reversed roles, comparisons, tense, and units remain distinct, and explicit disputes remain visible. All experimental levers remain off by default.
- Report common ground requires distinct, non-overlapping source spans for every attributed participant, or explicit narrator attribution, and cannot represent one person's statement as shared agreement. This mechanical check does not independently establish the semantic truth of model-provided attribution.
- Indirect claim chains remain in report graphs when they connect to a retained position through stored relations. Graph validation still rejects reasoning cycles.
- Priority, procedural, and trust disagreements use their actual resolution kinds when computing resolvability, instead of defaulting to existing evidence.
- Low-resolvability copy no longer assumes every difficult question is a value dispute. Evidence-state classification distinguishes directly questioned or hypothetical findings from findings asserted in the source, while retaining actual findings quoted inside broader questions.
- Crux diagnostics now report cumulative per-topic Recall@10 and use the unbounded ranking for tests that ask whether a claim is ranked at all. Ranking formulas, thresholds, and gold mappings were not changed to improve the reported result.
- The browser fixture gives each local test a distinct simulated visitor, avoiding accidental exhaustion of production request limits by the test suite. Hosted targets retain their existing request headers.
- Three dead source URLs were replaced with verified publisher locations. The dire-wolf habitat claim and U.S. broadcast ownership claim were narrowed to what their sources establish.
- Date expectations were updated for the October 25 ledger corrections. The paste-surface guard distinguishes aggregate economic evidence from prohibited aggregate side scores.

## Verification

The validation appendix records exact commands, worktrees, timestamps, and exit codes, including failed reproductions and sandbox failures. The changed-file appendix records paths relative to the original remote main. The branch appendix preserves original names and object IDs for recovery after branch deletion.

- [Validation commands](2026-10-25-branch-closeout/validation.tsv)
- [Changed files](2026-10-25-branch-closeout/files.tsv)
- [Original branches](2026-10-25-branch-closeout/branches.tsv)

At the first complete browser checkpoint, the production build, typecheck, zero-warning lint, and offline standalone smoke test passed. Chromium passed 140 browser tests with 5 skips. Four additional visual journeys passed across phone and desktop, light and dark themes. All 25 captured views were inspected for layout defects. The tests exercised the example paste, focused crux, saved maps, library pagination, unmapped conversation notes, offline report 404, and glossary hover styling.

The first combined unit runs exposed stale integration expectations, then two five-second timeouts during concurrent browser and test workloads. After incorporating the report fixes and running without concurrent browser jobs, the complete release unit suite passed: 325 files and 4,216 tests at `4b412be3b169639ee3303e1f93309f97e76f5126`. Earlier failures remain in the command ledger. The five browser skips are deliberate device-specific exclusions: three desktop canvas checks on phones, one phone search check on desktop, and one phone result-height check on desktop.

At that release revision, `bun run lint`, `bun run typecheck`, `bun run build`, `bun run smoke:standalone` (isolated port 3374), and `bun run eval:disagreement` also exited 0. The deterministic disagreement corpus passed 64/64. The latest full browser pass used `3eed1b63264461a9a9e180df1f86ed332ee84461`; subsequent changes affect the fixture-tested disagreement pipeline and report copy, which the default offline browser lane does not enable.

## Known limits

- The whole-topic crux recall diagnostic remains below its pre-registered proxy targets: Recall@5 is 1/10 (0.100, target 0.6), and Recall@10 is 4/10 (0.400, target 0.8). Three named tests fail. The no-uncontested-claims-in-top-five check passes on all three flagships. The diagnostic uses whole topics without public ledgers, while the original acceptance specification describes sub-questions; its limit-dependent selection also differs from served default top-five results. This is an unresolved quality and evaluation-design task, not a passing acceptance result.
- Source URL checks covered 1,639 URLs: 3 dead, 0 malformed, 162 redirected, 402 blocked, 61 bot challenges, and 30 network errors. The three dead links were repaired. Blocked responses, bot challenges, redirects, and network errors do not establish source correctness. A successful HTTP response alone was not treated as factual verification.
- Freshness manifests retain overdue reviews and missing source dates. The scoped capitalism audit does not claim a full-map or headline review of unrelated evidence.
- Live model calls, authenticated production flows, production database behavior, payment services, and email delivery were not exercised. No production or vendor state was changed by verification.
- Browser checks use Chromium device emulation. Native mobile browsers and other browser engines remain untested. Report visual verification covered the offline 404 state; report-generation behavior was checked with deterministic fixtures.
- The shared checkout's environment-file edit and untracked research note are intentionally preserved. Existing worktree contents are preserved when branch references are detached or removed.

## Handoff

Push, remote CI, branch cleanup, and final revision details will be recorded here after they complete.
