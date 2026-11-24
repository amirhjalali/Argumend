# The Argumend Topic Analysis Playbook

Status: operational formula, 2026-11-23. Unifies the formal argument model (`docs/ARGUMENT_MODEL.md`), the adversarial review packet (`docs/ARGUMENT_AUTHORING_CHECKLIST.md`), the story-first reading principles, and the automated fairness contracts (`lib/topicPage/{lede,settle,flip}Contract.ts`) into one repeatable, five-stage pipeline.

## Purpose

Every Argumend map has to pass three bars at once:

1. **Accurate** — Every figure, quote, date, and URL comes from a verified primary source, with its denominator and scope limit attached. Nothing is invented to fill a template slot.
2. **Fair** — Every serious camp is stated in its strongest recognizable form, evidence is filed by what the finding shows (never by who cites it), and no side is lectured or declared the winner.
3. **Compelling** — A reader understands what the fight actually turns on within 30 seconds. Neutrality is never an excuse for dry, encyclopedic throat-clearing; the intellectual drama comes from exposing the gap between what people think they are arguing about and what the disagreement actually hinges on.

The failure mode we learned to eliminate is **schema-first authoring**: drafting a polished argument map from memory and then hunting for citations to decorate it. That order reliably produces misattributed quotes, generic homepage links, asymmetric "skeptic lecturing," and textbook openings nobody finishes.

This playbook enforces a strict five-stage sequence. No stage starts until the previous stage's exit gate is met.

---

## Stage 1 — Frame & Scope

**Goal:** Define an open, non-loaded question and identify the real camps before reading or drafting.

1. **Check for duplicates first:**
   ```bash
   bun run maps:nearest "<proposed question>"
   ```
   One map per question. If an existing map asks the same question, strengthen or add an alias/crux to that map instead of creating a sibling.
2. **Write a non-loaded root question:**
   - Ends in `?`, presupposes no answer, and names the actual decision or claim in public dispute.
   - Bad: *"Why can't a four-day work week work outside offices?"*
   - Good: *"Should a four-day week with no pay cut be adopted broadly?"*
3. **Name the real constituencies (2–4 camps):**
   - Identify who actually argues over this in public and what each camp cares about protecting.
   - Never collapse a 3- or 4-camp dispute into a caricature. On legacy pillar maps that render two opposing positions per crux, note the full constituency nuance inside the pillar's framing and steelman the strongest non-strawman version on each side.
4. **State the initial perception-gap hypothesis (1–2 sentences):**
   - What do people *usually* think this fight is about, and what might they actually agree on already? Treat this as a hypothesis to test against Stage 2 evidence, not a conclusion.

**Exit gate:** Neutral question, duplicate check clear, constituencies named.

---

## Stage 2 — Evidence Dossier First (Zero Map Prose)

**Goal:** Build a verified, primary-source Evidence Dossier at `docs/dossiers/<topic-id>.md` *before* writing a single sentence of map prose.

### Hard Rules

- **Dossier-only citation wall:** Stage 3 may cite **only** sources recorded in the topic's Evidence Dossier. If a claim or statistic is not in the dossier, it cannot carry a citation—and if it is an empirical claim about a study, it must be omitted or verified and added to the dossier first.
- **Primary sources over commentary:** Cite the peer-reviewed paper (with DOI), official statistical agency (BLS, OECD, CDC, CBO, court filing), or primary trial report directly. Journalism may establish events or public statements, never stand in for an underlying study.
- **No placeholder URLs:** Never use Wikipedia, an organization's generic homepage, or an unverified link to satisfy a URL field.
- **Balanced sourcing:** Collect the strongest empirical anchors for *every* major camp—including methodological critiques, natural experiments, and scope limits of headline studies.

### Required Fields per Dossier Entry (`D1`, `D2`, …)

```markdown
### D1 — <Short finding-stating label>
- **Citation:** Author(s) / Institution (Year), *Title*, Publication / Report No.
- **URL / DOI:** <verified direct link> (verified YYYY-MM-DD)
- **Source kind:** peer-reviewed | government | institutional | advocacy | journalism | primary-document
- **Interest / funding disclosure:** <who funded or ran it, or "None identified">
- **Verified finding:** <exact figure(s), denominator, time period, and geography>
- **Scope limit / counter-reading:** <what this does NOT show, e.g., self-selection, no control group, short window, compressed vs. reduced hours>
- **Direction (`side`):** `for` | `against` | `qualifying` — judged strictly by what the finding shows relative to the root question, not by who quotes it.
```

**Exit gate:** At least 2 verified primary sources per crux (minimum 1 `for` and 1 `against` per empirical crux, unless an explicit evidence gap is documented), zero unverified URLs, and every figure paired with its denominator, date, and scope limit.

---

## Stage 3 — Crux Extraction & Story Draft

**Goal:** Turn the Evidence Dossier into a clear, fair, genuinely compelling map.

### The Story & Compellingness Rubric

1. **Open on the surprise, not a textbook definition:**
   - The hook (`keystone_fact.statement`) and crux-sheet framing (`simple_case`) are the site speaking, never a side.
   - Start with the sharpest verified contrast or perception gap—two real facts side by side that immediately explain *why* serious people disagree—rather than *"X is a policy that..."*
   - Never open with an expert poll percentage, a consensus headcount, or a sentence that answers one of the map's own cruxes.
2. **State the agreed ground cleanly—and never reuse it as a side's "best card":**
   - Put what both camps already accept up front so the reader sees how much of the noise isn't actually in dispute.
   - Keep each side's evidence cards distinct from the agreed-facts block (enforced by `lib/topicPage/agreedFacts.test.ts`).
3. **Order cruxes as a narrative arc (2–4 load-bearing questions):**
   - Put the most intuitive, load-bearing question first (what a reader asks in the first 30 seconds), then deepen into persistence/mechanism, then into macro trade-offs, equity, or values.
   - Distinguish **empirical**, **predictive**, **definitional**, **normative**, and **procedural** disagreements—never label a value trade-off as an "evidence shortage."
4. **Write finding-stating card titles:**
   - Bad: *"Productivity Impact"* or *"Employer Survey"*
   - Good: *"Six-Country Study (2,896 Workers): Burnout Fell and Job Satisfaction Rose Over Six Months vs. Control Firms (2025)"*
   - Put the scope limit directly inside the card's description and reasoning so no study is oversold.
5. **Write concrete, symmetric falsifiers:**
   - Every crux's `settle.condition` names a specific, runnable observation, dataset, or natural experiment—never *"more research is needed"* and never a restatement of the crux question.
   - Both `supporter_flip` and `skeptic_flip` open with `"If ..."`, use `"would"` (never `"should"`), assign no burden of proof, state no verdict, and stay within a 2.5× length ratio of each other.
6. **Check the 30-second test:**
   - Read only the title, hook, `simple_case`, and the crux questions. If a thoughtful friend could not immediately say *"oh, I didn't realize those were the three questions this actually turns on,"* tighten the framing before moving to Stage 4.

**Exit gate:** Complete map draft citing only Stage 2 dossier IDs, passing the 30-second test.

---

## Stage 4 — Adversarial Fairness Pass

**Goal:** Stress-test the draft from inside each camp before trusting it.

Run one adversarial critique per camp (ideally with a different model family or a human reader sympathetic to that camp) using Part B of `docs/ARGUMENT_AUTHORING_CHECKLIST.md`:

> *"Argue that this map is unfair to your position. Grant nothing you would not grant in print."*

Specifically check:

1. **Steelman test:** Is this camp's strongest argument stated as its best advocate would state it, or is it a softer version set up to be knocked down?
2. **Evidence-side adjudication:** Is every evidence card filed under `for` or `against` based on *what the finding actually shows* rather than who cites it?
3. **Scope symmetry:** Did we point out selection bias or funding incentives on *one* side's studies while letting the other side's studies slide without methodological caveats?
4. **Hidden verdict leakage:** Does the hook, summary, or either mind-change condition quietly assume one side holds the burden of proof or has already carried the day?
5. **Prose-to-dossier audit:** Re-read every sentence of `skeptic_premise`, `proponent_rebuttal`, and `questions`. Delete or verify any study, percentage, or attribution that is not backed by the Stage 2 dossier.

Record accepted and rejected critiques in the **Adversarial Review Log** at the bottom of `docs/dossiers/<topic-id>.md` (or in the topic's `.manifest.json` for v2 `ArgumentGraph` flagships).

**Exit gate:** Every camp's adversarial critique addressed and logged; zero unverified claims left in prose.

---

## Stage 5 — Automated Mechanical CI Gate

**Goal:** Let deterministic code enforce what human and AI eyes miss at scale.

1. **Regenerate lightweight client summaries (and update `data/corpusStats.ts` if total/URL evidence counts changed):**
   ```bash
   npx tsx scripts/regen-summaries.ts
   ```
2. **Run the contract & integrity suite:**
   ```bash
   bun run test:ci
   bun run lint
   bun run typecheck
   ```
   This automatically verifies:
   - `lib/topicPage/ledeContract.test.ts` — no poll headcounts, verdict language, or crux-answering in openings
   - `lib/topicPage/settleContract.test.ts` — concrete observations, no restatements, no duplicate settle lines
   - `lib/topicPage/flipContract.test.ts` — symmetric `If ...` conditionals, no lecturing, no verdict words, <2.5× length ratio
   - `lib/topicPage/agreedFacts.test.ts` — no side's best card merely repeats an agreed fact
   - `lib/mapDuplicates.test.ts` — no accidental duplicate map
   - `lib/paste/maps.test.ts` — paste-matching regressions stay green
3. **Verify shipped URLs when online:**
   ```bash
   bun run check:sources
   ```
4. **For v2 `ArgumentGraph` flagships, also run:**
   ```bash
   npx tsx scripts/validate-argument-draft.ts data/topics/drafts/<id>.draft.json
   bun run freshness:argument
   bun run eval:crux
   ```
5. **Set `last_updated` (or manifest `lastFullReview`)** to the completion date.

---

## Choosing the Target Format

Argumend currently maintains two data shapes that render through the same crux-first reading template (`components/topic/TopicPage.tsx`):

- **Standard topic maps (`data/topics/<id>.ts`)** — Best for repeatable library coverage (2–4 pillars/cruxes, 2–4 verified primary cards per crux, ~1–2 hours end-to-end with this playbook).
- **Flagship `ArgumentGraph` maps (`data/topics/drafts/<id>.draft.json`)** — Reserved for high-stakes living debates where multi-camp topology, attack-driven `INFERENCE` nodes, computed crux ranking, and a movement ledger justify deeper curation.

Both formats follow the exact same five stages above. The difference is graph granularity, never evidence rigor or fairness standards.
