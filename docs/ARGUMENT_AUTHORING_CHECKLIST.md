# ArgumentGraph authoring checklist and adversarial-review packet

Status: operational checklist, 2026-09-14. Implements north-star P2 item 1 ("convert the successful page and review pattern into a one-page authoring checklist and a reusable adversarial-review packet"). Every item cites its source; nothing here is new policy. Sources: `docs/plans/2026-08-12-argumentgraph-north-star.md` (NS) and `docs/ARGUMENT_MODEL.md` (AM).

Tooling referenced below:

```bash
node_modules/.bin/tsx scripts/validate-argument-draft.ts data/topics/drafts/<id>.draft.json   # schema + validator + crux ranking
node_modules/.bin/tsx scripts/argument-freshness.ts [--today=YYYY-MM-DD] [--verbose] [<id>]    # manifest, dates, metadata keys, top-crux disclosures
node_modules/.bin/tsx scripts/check-source-urls.ts                                              # source probes
```

## Part A — Authoring checklist

Work through the four gates in order. A map is not releasable until every box is checked or the exception is written down in the manifest's `notes` (NS "Release and freshness gates": "passing schema validation is necessary, not sufficient").

### 1. Structural gate (NS gate 1; AM §5)

- [ ] `validate-argument-draft.ts` reports schema ok and zero validation errors. Warnings are triaged around the load-bearing claims, not counted (NS gate 1).
- [ ] Exactly one QUESTION, open and non-loaded, edgeless (AM §1 QUESTION).
- [ ] Four POSITIONs with distinct supporting-claim sets, each with support and opposition, `steelmanBasis` and `displayRank` filled (NS gate 1; AM §1 POSITION, §5.4).
- [ ] Engine emits three to five non-superseded cruxes (NS gate 1).
- [ ] Every CLAIM is atomic, has `epistemicType`, `status`, `statusBasis`; mixed propositions are split, contrast claims preserved (AM §3, §5.1, §5.7).
- [ ] No source attribution inside a CLAIM; findings are EVIDENCE with `relevance` (AM §1 CLAIM-vs-EVIDENCE rule, §5.8).
- [ ] INFERENCEs minted attack-driven only; warrant is a licensing principle, not a paraphrase; `warrantKind` set (AM §1 INFERENCE).
- [ ] `depends_on` only where removing the target makes the source false or unintelligible; no `A supports B` + `B depends_on A` pair (AM §2).
- [ ] Every `cruxNotes` key is a claim in the current top cruxes; every `advocates` key is a position (NS "Canonical page architecture": metadata keys checked against the loaded graph). `argument-freshness.ts` reports unmatched keys as hard errors.
- [ ] Server render has no empty headings, undefined attributes, or client-only dependency on the reading path (NS gate 1).

### 2. Evidence and fairness gate (NS gate 2)

- [ ] Every public number carries denominator, period or as-of date, and source close enough to travel with it (NS gate 2; NS architecture item 4).
- [ ] Every top crux has an authored plain-language question, `fight`, `soWhat`, and either a `resolution.condition` or an explicit statement that the map has not found decisive evidence (NS gate 2). `argument-freshness.ts` column `Q/F/S/R` must read `yyyy`.
- [ ] Empirical and predictive top cruxes have direct evidence on both sides, or the gap is disclosed in the authored note. Definitional, normative, and procedural cruxes are exempt from evidence counts (NS gate 2). `argument-freshness.ts` column `Gap disclosed` must not read `missing`.
- [ ] Value and definitional disagreements are not mislabeled as evidence shortages (NS architecture item 3).
- [ ] Primary documents are used for what governments and institutions formally said; journalism establishes reporting or context only (NS gate 2).
- [ ] Every SOURCE carries `interest` where one exists, `verification`, and `verifiedAt` (AM design principle 5; AM §4 Source).
- [ ] `unverifiedFlags` carried from research into the node, never dropped (AM §5.9).
- [ ] Each of the four positions has received an adversarial steelman review using Part B (NS gate 2).
- [ ] Metadata frames and compresses the graph but introduces no unsupported facts (NS "Canonical page architecture").

### 3. Ongoing-war and fast-moving-topic gate (NS gate 3)

- [ ] `data/topics/drafts/<id>.manifest.json` exists and validates: owner, cadence, last full review, last headline check, due dates, fast-moving node ids with reasoning, trigger events, correction log (NS P0 item 4; schema in `lib/argument/reviewManifest.ts`).
- [ ] Every time-sensitive evidence node carries `source.publishedAt`, `source.verifiedAt`, and a stable URL; every public card renders a date or period (NS gate 3).
- [ ] Cadence honoured: ongoing war or live legal regime, headline facts every 7 days and full map every 30; fast-moving AI/economic statistics, 30-day headline review and 90-day full-map review (NS gate 3).
- [ ] If a review is overdue, the affected card is dated as a historical snapshot, demoted from the headline layer, or the map is marked awaiting review. Never leave it phrased as current (NS gate 3).
- [ ] Source probes distinguish `404`/`410` (dead) from `403`/`406` (blocked, when independently confirmed) (NS gate 3).
- [ ] Every update has a correction-log entry naming factual changes, topology changes, and whether the top crux ordering moved (NS gate 3).
- [ ] U.S.-Israel only: the NSM-20 review, its February 2025 rescission, current statutory authorities, the period of the "100+ sales" report, and casualty dates and definitions are kept separate in graph data and public copy (NS gate 3).

### 4. Engineering gate (NS gate 4)

- [ ] `bun run typecheck`, `bun run lint`, `bun run test:ci`, `bun run check:sources`, `bun run build` pass.
- [ ] Verified at 390px and desktop with keyboard-only navigation; hero and optimized-image requests checked.
- [ ] Import-boundary tests still prove draft graphs, validation, and React Flow are absent from flagship client chunks.
- [ ] Gate results archived with the release (NS P0 item 5).

## Part B — Adversarial-review packet (reusable)

One packet per position per map. The reviewer is instructed to argue that the map is unfair to their assigned position (NS gate 2). Four reviewers per map, one per position, with a mix of prior views (NS P1 item 1).

### B1. What the reviewer receives

1. The canonical page URL `/topics/<id>` and the assignment: position id, label, `constituency`, and `steelmanBasis` copied from the graph.
2. The draft graph `data/topics/drafts/<id>.draft.json` and the topic's `cruxNotes`, `highlights`, `closer`, and `takeaways` from `lib/argument/draftTopics.ts`.
3. The review manifest `data/topics/drafts/<id>.manifest.json` and the current output of `validate-argument-draft.ts` and `argument-freshness.ts`, so the reviewer sees known warnings before hunting for them.
4. Five minutes on the page first, before opening the graph, so the packet also captures the five-minute outcome (NS "The product promise").
5. The instruction: "Argue that this map is unfair to your position. Grant nothing you would not grant in print."

### B2. Questions the reviewer answers

Comprehension (NS P1 item 2; answered after the five-minute read, before opening the graph):

1. Name the major positions in your own words.
2. Name two load-bearing questions the positions actually turn on.
3. Name one established fact and one unresolved inference or value choice, and say which is which.
4. Name evidence or an event that would move one camp.
5. Quote any passage that felt unfair, and to whom.

Fairness of the assigned position (NS gate 2; AM §1 POSITION):

6. Is `steelmanBasis` the strongest credible rendering? If not, write the stronger one and name who holds it.
7. Which supporting claim is weakest as stated, and what would its best advocate say instead?
8. Which opposing claim or evidence is missing, mis-polarised (`supporting`/`challenging`/`qualifying`), or attached to the wrong node (AM §2 distinctions; AM §5.7)?
9. Is any finding offered for more than it measures? Name the `limits_scope` claim that should exist (AM §2 `limits_scope`).
10. Does any inference attack the data when the position actually attacks the step, or vice versa (`opposes` vs `undercuts`, AM §2)?

Evidence and freshness (NS gates 2 and 3):

11. Which public number lacks a denominator, period, or source that travels with it?
12. Which evidence node has changed, been superseded, or been walked back since `source.verifiedAt` or the manifest's last headline check?
13. Which source is journalism standing in for a primary document?

Cruxes (NS architecture item 3; NS P2 item 3):

14. Does the top-five ordering match your judgment of what the positions actually turn on? Give your own ordering; it feeds the human crux-ranking dataset.
15. Is any crux labeled as an evidence shortage when the disagreement is definitional or a value difference?

### B3. Mapping findings to correction-log entries

Every accepted finding becomes one `correctionLog` entry in the manifest, with `origin: "adversarial-review"`. The entry fields follow the north-star changelog rule (NS gate 3):

| Finding type (from B2) | `factualChanges` | `topologyChanges` | `cruxOrderMoved` | `nodeIds` |
| --- | --- | --- | --- | --- |
| Wrong or undated number, superseded source (Q11–13) | The old and new figure, period, and source | Usually none; `supersedes` edge if a new EVIDENCE node replaces an old one | Re-run `validate-argument-draft.ts`; record whether the top-five order changed | The evidence nodes touched |
| Missing or mis-polarised claim or evidence (Q7–9) | None unless a statement changed | Nodes and edges added, removed, or re-typed, with the edge type named | Same re-run; topology changes are the usual cause of order moves | All added or changed ids |
| Wrong attack target (Q10) | None | The `opposes`→`undercuts` (or reverse) re-wiring and any INFERENCE minted | Same re-run | Inference and claim ids |
| Steelman too weak (Q6) | None | None unless a supporting claim is added | Same re-run | Position id and any added claim ids |
| Crux mislabeled as evidence shortage (Q15) | None | `resolution.kind` or `epistemicType` change on the claim | Same re-run | The claim id |
| Ordering disagreement without a topology defect (Q14) | None; do not tune weights from a single review (NS "Architectural debt" item 5) | None | `false`; record the reviewer's ordering in the human crux-ranking dataset instead | None |

Rejected findings are also logged, with `origin: "adversarial-review"`, empty change lists, and a `summary` that states the reason, so dismissals stay measurable (AM §5.1 on recorded dismissals).

After the entries are written: run `validate-argument-draft.ts` and `argument-freshness.ts` again, update `lastFullReview` (full pass) or `lastHeadlineCheck` (headline pass) and the derived due dates in the manifest, and attach both script outputs to the release archive (NS P0 item 5).
