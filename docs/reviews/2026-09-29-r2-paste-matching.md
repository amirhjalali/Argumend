# Paste an argument: finding the right map (round 2, 2026-09-29)

Branch `r2/paste-matching`. The integration branch `ux/round2-2026-09-29` is merged in twice:

- at 64f9dbd, which brought the authored `topic.question` and `crux.question` fields;
- at 12b7f80, which brought the a11y/dark changes. The only conflicts were in the paste result, and both sides' changes are kept. Scope: `lib/paste/*`, `components/paste/*`, `data/evals/paste-matching/*`, their tests and the route test. The one shared file touched is `lib/mapReply/prefilter.ts`, which now exports its stopword list and nothing else. `/reply`'s shortlist is unchanged and its tests pass.

## The problem

With AI lanes off (production), `/analyze` named a map only when the top keyword score was at least 15 and at least 1.5× the mean of ranks 3–6. That rule came from about 15 test pastes. The index read only a map's title, one-line claim and search phrasings, so words like "Chernobyl", "Mariel boatlift" and "data centers" matched nothing. Sibling maps tied on their shared title words. The live-site paste ("Nuclear power is too dangerous, look at Chernobyl and Fukushima…") came back `closest` with no map named.

## Eval set (`data/evals/paste-matching/`)

I wrote every paste myself, in the voice of a reply, rant, thread or article, not in the maps' own wording. Each paste has two labels:

- `expected`: the right maps.
- `related`: near siblings that are fair to show beside the answer but are not the answer.

`lib/paste/matchEval.ts` scores each answer with one of these outcomes:

- correct
- sibling named first
- **wrong map** (the costly error)
- miss
- negative correctly refused
- negative named as a map

| file | pastes | with a map | without | notes |
|---|---|---|---|---|
| `pastes.json` (dev) | 111 | 86 | 25 | Near siblings: nuclear safety vs SMRs vs fusion vs weapons; AI jobs vs capitalism-after-AI vs UBI; immigration wages vs border vs identity vs open borders; climate vs carbon capture vs geoengineering; housing vs rent control vs bubble. Both flagships (AI jobs, US–Israel), and capitalism-after-AI. 7 pastes near the 40-character minimum. 21 short negatives (cooking, sports, a birthday message, Brexit, the monarchy, abortion, ranked-choice voting, a landlord question), plus 4 long negatives added during tuning. |
| `holdout.json` | 42 | 30 | 12 | Written after tuning. See "How it was tuned" for when it was run. |

## Measurements

Both rows are measured on the final sets. "Old" is the pre-change rule, reconstructed from `maps.ts` at 17a28db and run on the same pastes.

| | dev old | **dev new** | holdout old | **holdout new** |
|---|---|---|---|---|
| right map named (top-1, of pastes with a map) | 44/86 = 51.2% | **74/86 = 86.0%** | 18/30 = 60.0% | **25/30 = 83.3%** |
| when a map is named, it is right | 80.0% | **98.7%** | 100% | **92.6%** |
| **wrong map named** | 10 = 11.6% | **1 = 1.2%** | 0 | **0** |
| sibling named first (right map shown beside it) | 1 | 0 | 0 | 2 = 6.7% |
| no map named (miss) | 31 = 36.0% | 11 = 12.8% | 12 = 40.0% | 3 = 10.0% |
| right map among the ≤3 maps shown | 76.7% | **95.3%** | 80.0% | **96.7%** |
| negatives named as a map | 2/25 | **0/25** | 0/12 | **0/12** |

The old rule's wrong maps included:

- nuclear deterrence named as the water-wars map
- EV batteries named as self-driving cars
- school phone pouches named as homeschooling
- a vaping quit story named as loneliness
- abortion named as meaning-without-religion
- a long voting-age article named as the Electoral College map

**The one new wrong map** is `nuclear-germany` ("Germany switched off its last three reactors…"). The lane named the small-modular-reactor map, with the nuclear-safety map shown as closely related. By the labels written before tuning this counts as wrong, because I did not list the SMR map as `related` for that paste. The two maps are true siblings, though, so this is a labelling gap, not an unrelated map. I left the label as written.

**The two holdout sibling answers** both come from the kids / phones / social-media cluster. In each, a neighbour was named and the right map was shown as "Closely related":

- the Instagram-anxiety paste named `children-smartphone-age`
- the flip-phone pact paste named `school-phone-bans`

**Misses** are pastes with little topical vocabulary behind them:

- red wine
- "my grandmother begged"
- "every poll says stop arming Netanyahu"
- ChatGPT water
- a climate-denial rant whose "CO2 is plant food" pulls toward vertical farming

For most of these the right map is still listed first under "Closest maps".

**The two site examples**, which are pinned in the route test:

- "See an example" (the immigration exchange) → Immigration and Wages. Closely related: Mass Immigration & National Identity; The Case for Open Borders.
- The home box's "Try an example" nuclear article → Nuclear Energy for Climate. Closely related: small modular reactors.

**Authored questions.** After merging the 77 maps' new `topic.question` / `crux.question` text, every eval outcome was identical. Scores moved in the second decimal place. The eval does not depend on those fields; the index reads them when present.

## What changed

**Index** (`lib/paste/mapIndex.ts`, `mapDocuments.ts`, `terms.ts`):

- Each map is read from its own data at runtime, never from a generated copy. Fields are weighted as in BM25F:
  - name ×3: title, `question`, search phrasings, aliases
  - claim ×2: claim, pillar and crux titles, `crux.question`
  - body ×1: summaries, both premises, crux framings
  - evidence ×0.5: evidence titles, descriptions and sources
- The flagships are read from their graphs: positions, claims, crux notes and evidence.
- IDF is computed over the 159 maps.
- Adjacent word pairs count only for the IDF they add beyond their rarer word. "data center" counts; "small modular" adds nothing to "modular".
- Terms go through a Porter stemmer, so "vaping" meets "vapes" and "mining" meets "mines".
- A short table spells out abbreviations: EVs, UBI, SMRs, AGI, CO2 and others.
- Chat filler and the vocabulary of arguing ("agree", "debate", "nonsense") are dropped.
- Each map also gets a whole-map profile. Across all 12,561 map pairs the median similarity is 0.06 and the 99th percentile 0.16. The two nuclear-power maps score 0.28 and the two housing maps 0.49.

**Decision** (`lib/paste/maps.ts`, `decideMatch`, pure and unit-tested):

1. Maps among ranks 2–6 whose profile similarity to the top map is at least 0.15 are **siblings**. They are set aside and shown as "Closely related", not counted against the top map.
2. The **rival** is the best map on a different subject. The top map must lead it:
   - by 1.3× on the whole score, and
   - by **2× on the words where the two maps differ**.

   The second test did most of the work. When a rival scores on the same generic words ("labor", "supply", "jobs"), it is not a competing reading of the paste. When it scores on words the top map lacks, it is.
3. **Enough text behind it**: a score of at least 12, or, for a short paste, at least 36% of its words with a score of at least 4.5. That last floor stops one borrowed word ("exhausting") from naming a map.
4. No answer shows more than 3 maps: the named map, then siblings, then closest others. Each must score at least half of the top.

**Result UI** (`components/paste/*`):

- The named map comes first, with its crux, cards and "Open the map at this crux".
- A one-line "Closely related: …" link under its claim puts the sibling on the first screen.
- After the next step comes a "Closely related" section: "Argumend also maps a neighbouring question on the same subject. If your argument is more about this one, start here." "Closest other maps" follows.
- "No map, rather than the wrong map" is unchanged for true negatives.
- "How this was read" now states the new rule and this paste's numbers: lead, lead on differing words, and share of words.
- The copied summary adds "Closely related map: …" when there is one.
- The screen-reader announcement (added on the integration branch) now names the closely related map: "Result below. This argument is already mapped: X. Closely related: Y." It also no longer says "the closest maps are listed" when none are.
- The new UI adds no focus-ring classes. It reuses `textActionClasses` and `ClosestMaps`.

**Tests**:

- `lib/paste/matchEval.test.ts` runs all 153 pastes and asserts floors. See "For the founder" for why they sit where they do.
- `maps.test.ts` covers the decision with unit cases: sibling set aside, lead on differing words, near tie, short-paste floor, one-word paste, three-map cap.
- `terms.test.ts` covers the stemmer and term rules.
- The route test now covers the live-site paste and the nuclear example with its sibling.
- PasteClient checks order: map, then CTA, then "Closely related".
- The guard test renders the related state.

## Speed

All figures are CPU time under tsx on a machine at load average ~30 on 10 cores. Wall time was up to 3× higher.

- **Per paste, index built:** median 0.06 ms, p95 0.11 ms; a 20,000-character paste takes ~5 ms. Scoring walks posting lists, so a long paste costs its distinct words, not words × maps.
- **One-time index build per process:** ~0.36–0.45 s of CPU, plus loading the 159 map modules.
  - On the Node dev server, the first paste after start took 4.5 s. Most of that is dev-mode compilation of the topic modules on demand.
  - Every later paste answered in 1–9 ms inside the lane (10–25 ms over HTTP).
  - Production cold start was not measured, because `bun run build` can't run in a worktree.

## How it was tuned (for honesty about the numbers)

1. I wrote the dev set and its labels before looking at any scores. The only score I had seen was the live-site nuclear paste. Then I measured the baseline.
2. Index choices and thresholds were tuned on dev. I swept field weights, k1, pair weighting, sibling threshold and lead thresholds, and kept the simpler setting wherever results were within ±2 pastes.
3. I then wrote the holdout set and ran it once with the first frozen rule (lead 1.6× over the best non-sibling). Results: 83.3% top-1, 0 wrong, 2 siblings, 0/12 negatives named.
4. The site's own two examples then failed their route tests: the immigration demo came back "closest". That led to three changes: the lead on differing words, pair gain, and argument-vocabulary stopwords. Those were chosen on dev plus the two examples. The final holdout numbers equal the first run's.
5. The 4 long negatives were added to dev during tuning to test long unrelated text, the failure mode the earlier review flagged.

## For the founder

1. **The labels are mine**, written by the same agent that tuned the rule. A 20-minute spot check of `pastes.json` and `holdout.json` would make the floors worth more. Add real pastes when you have them; counts-only logging of `status` would show the real miss rate without storing text.
2. **The CI floors sit just under today's numbers**, so they catch regressions without failing on noise:
   - top-1 ≥ 83% (today 85.3% on the combined 116 pastes that have a map)
   - wrong map ≤ 3% (today 0.9%)
   - sibling named first ≤ 6% (today 1.7%)
   - right map among those shown ≥ 93% (today 95.7%)
   - negatives named as a map ≤ 1 (today 0)

   The brief suggested 85% for top-1. I set 83% for headroom, because today's combined 85.3% sits within one paste of that line.
3. **Cold start.** The first paste after a deploy builds the index. Warming it at boot (`getMapIndex()` from `instrumentation.ts`) is one line, but outside this branch's files.
4. **Which sibling gets named is still lexical.** In a tight cluster (kids / phones / social media) the neighbour can come first. The right map is then shown as "Closely related", never hidden.
5. **Nearest false positive: abortion.** The artificial-wombs map has an abortion pillar. The abortion paste is refused, but only because its lead on differing words is 1.65 against a bar of 2.

## Screenshots

In `/private/tmp/claude-501/-Users-amirjalali-argumend/2043480f-f401-456b-87a7-9f7cc9a30f41/scratchpad/round2/paste-matching/`:

- `confident-match-{390,1440}.png`: antidepressants paste, no siblings.
- `sibling-case-{390,1440}.png`, `sibling-case-390-top.png`, `sibling-case-390-related.png`: the home example nuclear article, with Nuclear Energy for Climate named and small modular reactors shown as closely related.
- `no-match-{390,1440}.png`: the Brexit paste, "No map, rather than the wrong map".
- `live-site-paste-390-top.png`: the paste that failed on the live site, now named.

In full-page 390 captures the sticky header is painted mid-page. That is a capture artifact; the viewport shots show the real layout.
