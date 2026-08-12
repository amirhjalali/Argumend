# ArgumentGraph north-star handoff

Date: 2026-08-12

Scope: the `ai-mass-unemployment`, `capitalism-after-ai`, and `us-israel-support` debate maps

Decision: treat these three maps as a product-validation cohort, not the beginning of a content-volume sprint.

## The product promise

**In five minutes, Argumend should show a reader the strongest credible positions in a live disagreement, the three to five questions those positions actually turn on, what the evidence does and does not establish, and what could change the answer — without manufacturing a verdict.**

That is sharper than “AI-powered argument mapping.” It gives the reader a job, a time bound, and a distinctive payoff. The competitive claim remains the one in the original rebuild plan: one Argumend URL should produce a better structural understanding than a general-purpose AI summary or ten conventional articles. “Better” must now be tested, not asserted.

## What the three-map flagship proves

The cohort proves more than a single demo, but less than a repeatable publishing system.

| Proven in the current repository | Not proven yet |
| --- | --- |
| One typed `ArgumentGraph` contract can represent an employment forecast, a political-economic systems question, and an active foreign-policy dispute without reducing them to two sides. | A reader actually understands any of the three debates better after five minutes. The only recorded baseline was muted and collected no verbatim reactions. |
| The deterministic crux engine can surface empirical, predictive, definitional, procedural, hidden-assumption, and value cruxes from the same model. | The top-five ordering matches independent human judgment reliably. The full-graph AI/jobs run already diverged from two pre-registered expectations. |
| A shared server-rendered page can lead with four positions and three to five cruxes, then preserve exact claims, objections, provenance, source interests, and uncertainty behind progressive disclosure. | This depth can be authored and reviewed economically at ten, fifty, or one hundred topics. The three graphs required substantial bespoke research and adversarial editing. |
| The core flagship read works without API keys, a database, live model calls, the React Flow canvas, or client hydration for its native disclosure controls. | Legacy topics and ArgumentGraph maps form one coherent public catalog. They still use different schemas, scoring language, loaders, and presentation models. |
| Debate maps now have deliberate discovery paths: a homepage lead section, a first-class search group, canonical topic URLs, related-map links, sitemap entries, `llms.txt` entries, metadata, and JSON-LD citations. | The `/topics` debate-map lead and the legacy catalog below it form one coherent browse experience. The collection still counts and filters only `topicSummaries`, so “Browse all topics” crosses into a different product model. |
| The renderer and registry have cross-topic tests, and the shared topic route keeps legacy client/canvas code behind asynchronous boundaries. | The product has useful behavioral instrumentation for position opens, crux opens, source clicks, comprehension, or sharing. |

The right conclusion is: **the product thesis is credible enough for a controlled external test, but the evidence workflow and user outcome still need validation before adding a fourth map.**

## Canonical page architecture

The canonical public artifact is `/topics/<argument-topic-id>`. It should remain a narrow, mobile-first vertical read, not a graph canvas with prose attached.

1. **Identity and scope:** illustration, reviewed date, stable title, exact scoped question, one high-tension hook, and a short context note where a term needs definition.
2. **Shape of the fight:** a plain-language “What this map shows” synthesis, a screenshot-native comparison when the topic supports one, and four distinct position cards. A related voice is evidence of an argument stream, not an endorsement label for an entire camp.
3. **Three to five cruxes:** authored questions and `fight`/`soWhat` explanations first; exact claim, status basis, evidence polarity, source interests, scope limits, and resolution condition one disclosure deeper. Value and definitional disagreements must not be mislabeled as evidence shortages.
4. **Anchoring facts and payoff:** only figures or phrases that can survive being screenshotted without losing their denominator, period, provenance, or uncertainty. “What you can honestly say after five minutes” should separate established observations from live inferences.
5. **Research layer:** all remaining non-superseded claims with status, epistemic type, evidence, and pushback. This is the audit trail, not the default reading order.
6. **Exit paths:** a short camp-split closer, methodology link, two related debate maps, and one route back to exploration.

The data flow should remain:

```text
validated draft JSON
  -> typed ArgumentGraph boundary
  -> deterministic crux ranking
  -> authored topic metadata for public explanation
  -> server-rendered progressive-disclosure page
```

The graph is the source of record for claims, evidence, and relationships. Metadata may frame and compress it, but must not introduce unsupported facts. Every metadata key that targets a position or crux must continue to be checked against the loaded graph.

### Discovery posture

- Use one canonical URL per map. Do not create parallel “question,” “analysis,” or “graph” URLs for the same artifact.
- Keep “Debate maps” visually distinct from legacy “Topics” until the schemas and public promises are actually unified. The homepage and search currently do this correctly.
- Keep the three maps as the first discovery choice on the homepage and in empty-state search, and preserve the dedicated Debate Maps lead already present on `/topics`. Do not force the maps into legacy balance/status filters.
- Keep sitemap priority, `llms.txt`, Article JSON-LD citations, reviewed dates, and related-map links generated from the lightweight registry.
- Do not import draft JSON or the crux engine into shared client discovery surfaces. The lightweight index is a deliberate bundle boundary.
- Optimize discovery copy for the specific tension each map resolves, not the generic phrase “argument mapping.” A user should know the conflict before clicking.

## Release and freshness gates

Passing schema validation is necessary, not sufficient. Each map needs four gates.

### 1. Structural gate

- The runtime schema parses and graph validation reports zero errors.
- Four positions have distinct supporting sets plus explicit support and opposition.
- The engine emits three to five non-superseded crux claims.
- Every rendered crux-note and related-voice key resolves to the correct graph node type.
- Server rendering succeeds with no empty headings, undefined attributes, invalid source links, or client-only dependency on the core reading path.
- Validation warnings are triaged around the load-bearing claims; a high warning count alone is not a release failure, and a zero-error graph is not editorial approval.

### 2. Evidence and fairness gate

- Every public number states its denominator, period or as-of date, and source close enough to travel with the number.
- Every top crux has an authored plain-language question, `fight`, `soWhat`, and either a resolution condition or an explicit statement that the map has not found decisive evidence.
- Empirical and predictive top cruxes have direct, reasonably independent evidence on both sides, or the absence is disclosed prominently. Definitional and value cruxes are exempt from evidence-count quotas.
- Primary documents are used for what governments and institutions formally said; journalism can establish reporting or context but must not silently replace the underlying document.
- Each of the four positions gets an adversarial steelman review by someone instructed to argue that the map is unfair to that position.
- `evidenceStarved` remains an internal topology diagnostic until its name and UI distinguish weighted direct evidence from indirect evidence, source diversity, and inherently non-empirical disputes.

The release sprint repaired the four material topology debts initially identified by the audit: concentration and reallocation in the capitalism map, and leverage and regional-stability causation in the U.S.-Israel map now have direct support, challenge, or qualification where the corpus honestly permits it. The remaining unexamined-warrant warning on the Israel veto-to-credibility inference should be resolved with a genuinely relevant counterclaim or explicitly documented as an evidence gap; an unrelated edge would be worse than the warning. Visible limits remain part of the product, not a temporary embarrassment.

### 3. Ongoing-war and fast-moving-topic gate

The page-level “Reviewed” date is not enough for an ongoing war.

- Every time-sensitive evidence node must carry `publishedAt`, `verifiedAt`, and a stable source URL; every public card must render an explicit date or period.
- For an ongoing war or live legal regime, re-check headline facts and governing authorities at least every seven days, and run an immediate review after a ceasefire/status change, major casualty revision, controlling court decision, memorandum rescission, or material U.S. policy change.
- Re-review the full map at least every thirty days. For fast-moving AI/economic statistics, use a thirty-day headline review and a ninety-day full-map review.
- If a review is overdue, do not silently leave a card phrased as current. Date it as a historical snapshot, demote it from the headline layer, or mark the map as awaiting review.
- Source probes must distinguish `404`/`410` from access control. A `403`/`406` is “blocked,” not “dead,” when the source has been independently confirmed.
- Every update gets a short changelog entry naming factual changes, topology changes, and whether the top crux ordering moved.

For U.S.-Israel specifically, keep the NSM-20 review, its February 2025 rescission, current statutory authorities, the period of the “100+ sales” report, and the dates and definitions behind casualty figures separate in both graph data and public copy.

### 4. Engineering gate

Before each external test or release:

```bash
bun run typecheck
bun run lint
bun run test:ci
bun run check:sources
bun run build
```

Also verify at 390px and desktop width with keyboard-only navigation; verify hero and optimized-image requests; and retain import-boundary tests proving that draft graphs, validation, and React Flow are absent from flagship client chunks.

## Thirty-day sequence

### P0 — make the cohort safe to test (days 1–5)

1. Preserve the completed public-correctness and topology repairs as release contracts: quantitative copy, dates, primary-source attribution, current legal status, durable URLs, authored crux notes, explicit resolutions, and direct crux relationships.
2. Resolve or explicitly document the remaining Israel veto-to-credibility warrant warning; add an undercut only if new evidence or a genuinely relevant counterclaim supports one.
3. User-test the existing Debate Maps lead on `/topics` and keep it separate from legacy balance/status filters unless the public models are deliberately unified.
4. Establish a small per-map review manifest: owner, last full review, next due date, fast-moving node IDs, trigger events, and correction log.
5. Archive the structural, source, accessibility, image, bundle-boundary, and production-build gate results with the external-test release.

P0 exit criterion: all three maps are factually safe as dated snapshots, all top cruxes explain their evidence limits honestly, and every public discovery path reaches the same canonical pages.

### P1 — test the promise, not the aesthetics (days 6–20)

1. Run a counterbalanced mobile study with at least twelve people: four readers per map, with a mix of prior views. Give each person five minutes with either the map or a fixed general-assistant summary, then swap order on a second topic.
2. Capture verbatim responses. Ask each reader to name the major positions, identify two load-bearing questions, distinguish one established fact from one unresolved inference or value choice, name what evidence would move one camp, and report any passage that felt unfair.
3. Observe the path rather than asking only whether the page was “good”: position expansion, crux expansion, source inspection, where the reader stops, and whether the closer changes their summary.
4. Add only the minimum privacy-compatible event instrumentation needed to measure map view, first position open, first crux open, source click, related-map click, and share action. Preserve server rendering and native disclosure behavior; do not pull the graph runtime into the route for analytics.
5. Revise ordering and copy from comprehension failures. If readers remember facts but cannot name a crux, fix Layer 2. If they understand camps but cannot distinguish evidence from values, fix crux labels. If they cannot locate the maps, fix discovery before content.
6. Re-run the study on changed pages with at least six fresh participants. Do not add another topic to create the appearance of progress.

P1 exit criterion: the measured five-minute outcome clears the thresholds below on at least two maps, with no systematic fairness failure on the third.

### P2 — operationalize only what the test validates (days 21–30)

1. Convert the successful page and review pattern into a one-page authoring checklist and a reusable adversarial-review packet.
2. Add per-topic freshness tests or generated diagnostics for missing `publishedAt`/`verifiedAt`, overdue fast-moving evidence, unmatched metadata keys, and top-crux evidence disclosures.
3. Create a small human crux-ranking dataset from the study and editorial reviewers. Compare engine top five against that set before adjusting weights; inspect topology, scoping, and redundancy first, as required by the crux decision document.
4. Decide go/no-go for a fourth map. “Go” requires comprehension, fairness, freshness, and technical gates—not simply stable builds. If the cohort fails, spend the next cycle on the shared failure rather than changing topic heat again.
5. If the cohort passes, choose one fourth map that tests a missing case (for example a primarily scientific or definitional dispute), estimate its full research/review cost, and keep it outside production until it passes the same gates.

## Measurable success

The first month is a product-validation month, so small-sample outcome measures matter more than raw traffic.

| Measure | Thirty-day target | Why it matters |
| --- | ---: | --- |
| Five-minute structural comprehension | At least 8 of 12 readers can name three distinct positions and two genuine cruxes without looking back. | Tests the central promise rather than page recall. |
| Epistemic separation | At least 8 of 12 correctly distinguish one established observation from one prediction, definition, procedure, or value disagreement. | Tests whether Argumend improves reasoning instead of adding information. |
| Resolution understanding | At least 7 of 12 can name evidence or an event that would move one empirical crux, and recognize that evidence alone cannot settle a selected value crux. | Tests the signature crux payoff. |
| Comparative value | At least 8 of 12 prefer the map for understanding the disagreement over the fixed general-assistant summary, with a written reason. | Directly tests the competitive claim. |
| Fairness | No position is independently flagged as materially straw-manned by more than 1 of its 4 assigned readers; every serious report is reviewed against the graph. | A contested-topic product cannot trade trust for clarity. |
| Editorial completeness | 100% of public numbers dated and sourced; 100% of top cruxes have authored notes and resolution/disclosure; zero overdue ongoing-war headline checks. | Makes “auditable” operational. |
| Source integrity | Zero known `404`/`410` citations; all blocked sources classified; source audit result stored with the release. | Prevents quiet evidence decay. |
| Technical integrity | Typecheck, lint, tests, source check, and build pass; zero critical keyboard/mobile accessibility issues; no draft graph or React Flow runtime in flagship client chunks. | Preserves the offline, lightweight reading experience. |
| Discovery | In a five-person findability check, all five can reach any named flagship from home, search, and `/topics` without a supplied URL. | A strong artifact that cannot be found is not a product. |

Behavioral analytics—crux-open rate, source-click rate, related-map continuation, and sharing—are diagnostics, not substitutes for comprehension. Establish baselines during P1 before setting growth targets.

## Architectural debt to carry deliberately

1. **Dual public ontologies.** Legacy `Topic` pages expose pillars, balance, weight, and verdict language; flagships expose positions, typed claims, deterministic cruxes, and no verdict. Do not bulk-migrate the legacy corpus until the flagship outcome is validated.
2. **Split registries and duplicated public metadata.** `lib/argument/topicIds.ts` must stay lightweight for proxy and client discovery, while `lib/argument/draftTopics.ts` imports full drafts and repeats titles/taglines. Current contracts catch ID, title, and tagline drift, but duplication remains. Generate the lightweight index from a server-owned manifest when the registry grows.
3. **Eager server registry loading.** The draft registry imports all three graph JSON files and the crux engine together. It is safely outside client bundles, but will become a build-time and memory problem at larger topic counts. Do not optimize until a fourth-map decision, then move toward per-topic server loaders.
4. **Hand-authored JSON and metadata are one effective record split across files.** There is no review state machine, correction history, content diff, or per-map owner in the schema. Start with a checked-in manifest and changelog before considering a CMS.
5. **Crux calibration is not a solved product fact.** Ranking is reproducible but topology-sensitive; scoping and redundancy can demote editorially expected claims. Build the human evaluation set before tuning.
6. **The evidence-coverage diagnostic is semantically overloaded.** “Fewer than three weighted direct evidence nodes” is not the same as “little evidence,” especially for indirect chains and value/definition cruxes.
7. **Freshness is page-level, not fact-level, in the public UI.** `ARGUMENT_TOPICS_LAST_UPDATED` is shared across the cohort while evidence dates and verification fields are inconsistent. Ongoing-war review needs topic- and node-level due dates.
8. **Discovery is still bifurcated.** Home, global search, sitemap, `llms.txt`, and a dedicated `/topics` lead know about flagships; the main collection and filters below that lead still use the legacy ontology. Test the presentation gap before attempting schema unification.
9. **Outcome instrumentation is absent from the server-rendered flagship.** The legacy analytics events do not measure progressive disclosure. Add a minimal boundary only after the moderated protocol defines what is worth measuring.

## What not to expand yet

- Do not add a fourth flagship, bulk-convert the legacy corpus, or optimize for total topic count before P1 passes.
- Do not re-promote AI-vs-AI debate, judging, accounts, subscriptions, community contribution, worksheets, or standalone fallacy/perspective tools. They remain supporting capabilities, not the public promise.
- Do not add a CMS, database requirement, or live-model dependency to the core reading path. The checked-in, offline-safe artifact is a product advantage.
- Do not let an LLM choose or reorder cruxes. Model assistance may extract, deduplicate, classify missing fields, suggest edges, or polish fact-locked copy; ranking remains deterministic and reviewable.
- Do not expose crux scores, generic confidence percentages, source counts, or a winner badge as false authority.
- Do not make the React Flow canvas the default flagship experience. It can return later as an optional expert view if user tests show a concrete unmet need.
- Do not automate ongoing-war updates directly into production. Automation may flag changed sources; a human must review wording, graph consequences, and crux-order changes.

## Go/no-go question at day 30

Can a skeptical reader spend five minutes on one of these pages and accurately explain not only what four camps believe, but which unresolved proposition separates them, what the current evidence establishes, and what no amount of evidence can decide?

If yes, Argumend has earned the right to scale the format. If no, the next sprint belongs to the shared failure—not to more topics or more features.

## Supporting decisions and evidence

- [Argument model](../ARGUMENT_MODEL.md)
- [Crux engine decision](../CRUX_ENGINE.md)
- [Three-flagship evidence, crux, and fairness audit](../reviews/2026-08-12-three-flagship-audit.md)
- [AI/jobs flagship graph validation](../research/2026-08-11-flagship-graph-validation.md)
- [AI/jobs fairness review](../reviews/2026-08-11-flagship-fairness-review.md)
- [North-star baseline](../research/2026-08-10-north-star-baseline.md)
- [Product pruning audit](../PRODUCT_PRUNING_AUDIT.md)
