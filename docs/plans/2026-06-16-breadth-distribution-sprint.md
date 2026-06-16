# Argumend — Breadth-as-Distribution Sprint (PLAN, not yet executed)

> **Status: READY TO FIRE. Do not start until the founder greenlights and there's a large token budget.**
> This is the designed successor to the Citation Moat sprint. The corpus is now *trustworthy*
> (114 maps, ~1,151 evidence items, 98% cited, 0 dead links, adversarially red-teamed, ratchet-protected
> at 207 tests). The next compounding move is *breadth*: cover the high-salience questions people and
> LLMs actually ask, at the same bulletproof standard — turning coverage into passive distribution.

---

## 1. Thesis — why breadth *is* the distribution play

The founder dossier names the real bottleneck as **distribution, not product**. That's true — but the
two distribution levers split cleanly:

- **Active distribution** (publish the LW essay, send gatekeeper DMs, submit grants) is **founder-bound.**
  An autonomous agent literally cannot and must not do it. It stays on the founder's desk in `docs/drafts/`.
- **Passive / compounding distribution** is the *only* distribution lever an autonomous token-heavy run
  can pull — and the dossier itself names it: *"the compounding distribution mechanism is being a
  trustworthy, LLM-citable reference work."* That mechanism scales with **how many high-salience questions
  Argumend is the single most citable, bulletproof answer for.**

So the highest-leverage autonomous use of a large token budget is **not** "more product for its own sake."
It is: **expand the surface of questions for which an LLM answering a user, or a human searching
"is X true / should we Y," lands on a primary-sourced Argumend map.** Each new bulletproof map is a
permanent, compounding intake funnel that needs zero founder action to keep working.

This sprint is explicitly designed so the output is *discoverable*, not just *present*: every new map
flows into `/llms.txt`, the sitemap, ClaimReview + `citation` JSON-LD, and internal-link hubs (§9).

**Anti-procrastination check:** if this ever feels like "building maps nobody sees," re-read §9. The
deliverable is not a topic count — it's *citable reference surface that compounds without the founder.*
If the founder would rather spend the budget elsewhere, the alternatives considered are in §11.

---

## 2. Goal & success metrics

**Goal:** Grow the corpus from 114 → ~150–165 maps (configurable) with **zero quality regression**,
every new map at the launch standard, and every new map wired into the discovery surface.

**Success metrics (all machine-checkable at the end):**
- **Net new maps:** target tiers in §6. Each registered, schema-valid, in the sitemap.
- **Citation coverage stays ≥ 98%** corpus-wide (ratchet test still green; bump the ratchet if it rises).
- **0 dead links** across the expanded corpus (`bun scripts/check-source-urls.ts` clean of DEAD).
- **Fabrication firewall: 0 surviving fabricated/inverted/wrong-paper cites** in new maps (the §5 verify
  gate must pass for every committed map — this is the non-negotiable bar, given the last sprint caught ~15).
- **tsc clean + full vitest green** per batch (suite grows as new ratchet/coverage assertions are added).
- **Discovery wiring:** new maps appear in `/llms.txt`, `/sitemap.xml`, emit `citation` JSON-LD, and each
  new cluster has ≥1 internal-link hub (blog post or guide) pointing into it.

**Explicit non-goal:** raw count. A single fabricated cite that ships is worse than five fewer maps.

---

## 3. Scope — in / out / founder-gated

**In scope (autonomous):** new topic maps on genuinely two-sided, primary-sourceable questions, plus the
supporting discovery surface (§9). Everything web-verified, same schema and guardrails as the hardened corpus.

**Out of scope (do not touch):** the `docs/drafts/` distribution assets (founder-bound, never auto-sent);
auth/db/infra; the design system; any post-cutoff (2026+) fact asserted as verified rather than dated/attributed.

**Founder-gated tier (DESIGN the map offline, but DO NOT publish/register without explicit sign-off):**
some questions are reputationally radioactive for an anonymous mapping brand if mishandled, even with
perfect sourcing. These get built into a staging file and held for founder review, NOT auto-registered:
- `abortion-moral-status` (note: `bodily-autonomy-abortion` evidence already exists as a fragment — consolidate, don't duplicate)
- `israel-palestine-two-state`
- any topic where the *meta-claim framing itself* (not the evidence) is the contested act.

Rule: if steelmanning both sides honestly would still read as the brand "taking a side" merely by *how the
claim is phrased*, it's founder-gated. When unsure, gate it.

---

## 4. Topic selection — methodology + seed list

### 4a. Selection criteria (Phase 0 agent applies these, scores each candidate)
A candidate ships only if it clears **all** of:
1. **Genuinely two-sided** — both sides steelmannable to their strongest honest form; not settled.
2. **High salience / search demand** — people actively ask it ("is X true", "should we Y", trending or evergreen).
3. **Primary-sourceable** — real peer-reviewed studies, government datasets, court filings, or official reports exist for *both* sides (if only one side has receipts, it's not a balanced map — skip or down-tier).
4. **Non-duplicative** — not already one of the 114 (dedup against the canonical slug list in §4c), and not a thin rephrase of an existing map.
5. **Category-balanced** — spread across policy / technology / science / economics / philosophy.
6. **Not founder-gated** (or explicitly routed to the §3 staging file if it is).

Phase 0 outputs a ranked, deduped, category-tagged candidate table with a one-line meta-claim and a
"both-sides-have-receipts?" yes/no per candidate. Founder picks the cut line; tiers in §6 are the default.

### 4b. Seed list (already deduped against the live 114 — verify again at runtime)
Grouped by category; `(G)` = founder-gated. These are *candidates*, not commitments — Phase 0 validates
search demand and dual-sourceability before any build.

**Economics / policy**
carbon-tax-vs-cap-and-trade · congestion-pricing · social-security-solvency (raise the retirement age?) ·
modern-monetary-theory · stock-buybacks-ban · occupational-licensing-reform · right-to-repair-laws ·
estate-inheritance-tax · price-gouging-laws · jones-act-repeal · baby-bonds · corporate-tax-competitiveness

**Technology / AI**
generative-ai-art-copyright · self-driving-car-safety · autonomous-weapons-ban · encryption-backdoors ·
net-neutrality · brain-computer-interfaces-neuralink · ai-energy-water-footprint · age-verification-porn-laws ·
facial-recognition-policing · algorithmic-hiring-bias · section-230-reform · quantum-computing-hype

**Science / health**
gmo-crops-safety · nuclear-fusion-timeline · vaccine-mandates · alcohol-no-safe-level · red-meat-cancer-risk ·
intermittent-fasting · dietary-supplements-efficacy · ssri-antidepressant-efficacy · adhd-overdiagnosis ·
vaping-harm-reduction · raw-milk-safety · dark-matter-vs-mond · de-extinction

**Philosophy / society**
existence-of-god (G) · moral-realism · assisted-dying-euthanasia · sex-work-decriminalization ·
free-speech-vs-hate-speech-laws · prison-abolition · second-amendment-individual-right · congressional-term-limits ·
felon-voting-rights · voting-age-16 · effective-altruism · longtermism · antinatalism · hunting-for-conservation · zoos-ethics

**Geopolitics**
nato-expansion-provocation · us-china-decoupling · sanctuary-cities · birthright-citizenship · h1b-visa-program ·
abortion-moral-status (G) · israel-palestine-two-state (G)

### 4c. Dedup reference
Canonical live slug list is `ls data/topics/*.ts`. At runtime, regenerate and diff candidates against it
before building — the 114 already include several "obvious gaps" (e.g. trump-tariffs, universal-basic-income,
four-day-work-week, covid-origins, gender-affirming-care-minors, glp1-weight-loss-drugs, degrowth-economics,
cryptocurrency-regulation, declining-birth-rates, gain-of-function-research-ban). Do not rebuild these.

---

## 5. The per-map quality bar (the fabrication firewall)

Every new map must match `data/topics/*.ts` exactly. Reference file: `data/topics/nuclear-energy-safety.ts`.

**Schema / mechanics:**
- File exports `export const <camelSlug>Data = { … };` — a plain object, **no `confidence_score`** (it is
  computed by `buildTopic` → `computeConfidenceScore(pillars)` in `data/topics.ts`; for `contested`/
  `highly_speculative` the computed score always wins, so do not hand-set it).
- Every enum-ish field carries `as const` (`status`, `category`, `icon_name`, crux `verification_status`,
  each evidence `side`).
- `category` ∈ policy | technology | science | economics | philosophy. `status` ∈ settled | contested | highly_speculative.
- `icon_name` ∈ Target, Zap, HelpCircle, Shield, Atom, Telescope, Microscope, Scale, Gavel, FileText, Users, AlertTriangle.
- Register in `data/topics.ts`: add the `import { <camelSlug>Data } from "./topics/<slug>"` near the other
  imports **and** a `buildTopic(<camelSlug>Data)` entry in the `export const topics` array. **This shared-file
  edit is the one serialization point — see §7.**

**Content bar (this is where maps earn the moat):**
- 2–3 pillars, each with `skeptic_premise` + `proponent_rebuttal` *both steelmanned to their strongest honest form.*
- Each pillar names a real **crux** — the load-bearing factual/values disagreement that would actually move people.
- Evidence items: `side` ("for"/"against" the meta-claim), `weight` graded on all four axes (sourceReliability,
  independence, replicability, directness, each 0–10), a real `source`, a real resolving `sourceUrl`, and
  `reasoning`. The confidence score *emerges* from these weights — so **honest weighting is the whole game**;
  do not reverse-engineer weights to hit a target score.
- The map takes **no house position.** It makes the cruxes inspectable. Score is an interface, not a verdict.

**The firewall (Stage 3 verify, §7) — the single most important rule, carried verbatim from the last sprint:**
> **Web-verified ONLY. NEVER fabricate a URL, citation, or statistic.** If no primary source exists for a
> claim, make the `source` honest and lower the weights — never paper over a gap with an invented cite.
> Beware **resolves-but-wrong-paper** cites (a DOI/URL that loads but points to the wrong source) and
> **inverted findings** (stating a study's result backwards) and **mis-coded sides** — the last sprint caught
> ~15 of these. Every new evidence item must be independently re-verified before its map is committed.

---

## 6. Phasing & sizing (this is how it consumes a large budget)

Default phasing — the founder sets the cut line per tier:

| Phase | What | Approx agents | Notes |
|------|------|----------------|-------|
| **0 — Query research & selection** | 3–5 research agents validate search demand + dual-sourceability for the §4 seed list; produce ranked candidate table | ~5 | cheap; gates everything |
| **1 — Tier-1 build (evergreen, broadest demand)** | ~14 maps × 3-stage pipeline (research→build→verify) | ~42 | the spine |
| **2 — Tier-2 build** | ~14 maps × 3-stage pipeline | ~42 | |
| **3 — Tier-3 build** | ~12 maps × 3-stage pipeline | ~36 | |
| **4 — Discovery surface** | internal-link hub posts/guides per new cluster (§9) | ~8–12 | compounding |
| **5 — Final gate & surfacing** | full dead-link sweep, full tests, ratchet bump, llms.txt/coverage refresh, changelog + dossier update | ~3 | |

**Token sizing:** ~40 maps × 3 agents = ~120 heavy web-research agent-runs, + ~10 content agents, + gates.
That is a genuinely large, parallelizable run — it scales to whatever budget is available by adjusting the
tier cut line. Use the `budget`-aware loop pattern (build until `budget.remaining()` drops below a per-map
reserve) if running under an explicit token target.

---

## 7. Execution architecture — Workflow pipeline

Run as a **`Workflow`** (deterministic fan-out), not ad-hoc agents. The right shape is a **pipeline** so each
map verifies the moment its build finishes — no barrier stalling fast maps behind slow ones.

**Per-map pipeline (3 stages):**
1. **Research** (`agentType: general-purpose`, WebSearch/WebFetch, `schema`-validated output): for the
   meta-claim, gather the strongest for-evidence and against-evidence, the real cruxes, and **verified primary
   URLs** with side-coding + 4-axis weights + reasoning. Returns structured map data — *no prose fabrication.*
2. **Build**: write `data/topics/<slug>.ts` in exact schema (`as const`, no score). Returns the slug +
   camel import name for the registration step. **Does NOT edit `data/topics.ts`** (shared file — see below).
3. **Adversarial verify** (independent agent, the firewall): re-fetch every `sourceUrl`; confirm it resolves
   AND matches the claimed source AND the finding is stated correctly AND coded to the right side; flag any
   fabrication/inversion/wrong-paper. Verdict per item. **A map that fails is quarantined, not committed.**

**Serialization gotcha (critical):** `data/topics.ts` is a single shared file every new map must edit to
register. Parallel agents editing it WILL conflict. Two safe options:
- **(preferred)** Stage 2 only writes the per-topic file; the **orchestrator deterministically appends all
  imports + `buildTopic(...)` entries for a batch in one serialized edit** after the batch's verifies pass.
- or give each build agent `isolation: 'worktree'` (heavier; only if truly editing in parallel).
Prefer the first — one file write per batch, after verification, by the orchestrator.

**Per-batch verification gate (after each tier, mirroring the last sprint's proven loop):**
```
bun tsc --noEmit            # clean
bun vitest run              # all green (count grows with new assertions)
bun scripts/check-source-urls.ts   # 0 DEAD among new URLs
bun scripts/regen-summaries.ts     # refresh data/topicIndex / summaries
# append docs/reviews/SPRINT-CHANGELOG.md  (which maps, which cites verified, any quarantined)
git add -A && git commit && git push      # per-batch, interruptible
```

**Skeleton workflow script** (save to `scripts/wf/breadth-sprint.js`, refine at run time):
```js
export const meta = {
  name: 'breadth-distribution-sprint',
  description: 'Build new bulletproof topic maps + verify each adversarially',
  phases: [{ title: 'Select' }, { title: 'Build' }, { title: 'Verify' }],
}
phase('Select')
const picks = await agent(SELECTION_PROMPT, { schema: CANDIDATE_TABLE_SCHEMA })   // §4 criteria
const tier = picks.candidates.filter(c => c.tier === 1 && !c.founderGated && c.bothSidesHaveReceipts)
const built = await pipeline(
  tier,
  c   => agent(researchPrompt(c), { phase: 'Build', schema: MAP_DATA_SCHEMA }),     // Stage 1
  (data, c) => agent(buildFilePrompt(c, data), { phase: 'Build', schema: BUILT_FILE_SCHEMA }), // Stage 2
  (file, c) => agent(verifyPrompt(c, file), { phase: 'Verify', schema: VERDICT_SCHEMA })       // Stage 3
)
return built.filter(Boolean).filter(v => v.verdict?.allCitesVerified)   // only clean maps register
// orchestrator then: serialized data/topics.ts registration → gate → commit
```
Schemas (`CANDIDATE_TABLE_SCHEMA`, `MAP_DATA_SCHEMA`, `VERDICT_SCHEMA`) force structured returns so there's
no parsing and the model retries on mismatch. `VERDICT_SCHEMA` must include a per-evidence-item
`{resolves, matchesClaim, correctSide, notFabricated}` so the firewall is explicit, not vibes.

---

## 8. Guardrails (carry these forward verbatim)

- **Web-verified edits ONLY. NEVER fabricate a URL, citation, or statistic.** No source found → honest
  `source` + low weights, never an invented cite. Watch for resolves-but-wrong-paper, inverted findings,
  mis-coded sides.
- Keep `as const` + exact schema shape; no `confidence_score` in topic files (computed by `buildTopic`).
- **tsc clean + full vitest green per batch; commit + push per batch** (interruptible, like the last sprint).
- **Never auto-send or auto-publish anything in `docs/drafts/`** — founder-bound, founder-review-only.
- **Founder-gated topics (§3) → staging file, never auto-registered.**
- Don't assert post-cutoff (2026+) facts as verified — keep attributed / dated / hedged.
- Design system unchanged: parchment `#f4f1eb`, text `#3d3a36`, teal `#4f7b77`, CTA rust `#C4613C`. **Never amber.**
- Both sides steelmanned; the map takes no house position.
- Commit messages end with: `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.

---

## 9. Discovery surface — make breadth *distribute* (Phase 4–5)

Breadth only compounds if it's reachable. Most of this is automatic because the site is data-driven, but
verify each:
- **`/llms.txt`** (`app/llms.txt/route.ts`) regenerates from `topics` — new maps appear automatically;
  refresh the coverage stat line and re-confirm it reads correctly.
- **Sitemap** (`app/sitemap.ts`) — confirm new topic routes are included; update `lastModified`.
- **ClaimReview + Article `citation` JSON-LD** (`app/topics/[id]/page.tsx`) — automatic per map; spot-check one new map's rendered JSON-LD.
- **Ratchet** (`data/topics.test.ts`) — if corpus coverage rises, bump `COVERAGE_RATCHET` to lock the gain.
- **Internal-link hubs (the active compounding step):** for each new *cluster* (e.g. the health cluster, the
  AI-governance cluster), write/refresh ONE blog post or guide that links into the new maps — e.g.
  "Five contested health claims, mapped" linking gmo / alcohol / red-meat / ssri / adhd maps. This is the
  internal-linking + long-tail-SEO payload that turns a pile of maps into a navigable, crawlable reference.
  53 blog posts exist (`data/blog.ts`) — match that format. Targets "is X true" / "both sides of Y" queries.
- **`/topics` index + category pages** — confirm new maps surface in browse and category filters.

---

## 10. Resume / checkpoint protocol

Same discipline that survived the last sprint's interruptions (monthly-limit hit, rate-limits, the 3-hour pause):
- **Per-batch commit + push** = natural checkpoints. A killed run resumes from the last green commit.
- Quarantined (failed-verify) maps are listed in `SPRINT-CHANGELOG.md`, not committed — re-run them in the next batch.
- If using `Workflow` resume: same script + same args → cached prefix; only re-run from the first changed/new map.
- Partial unverified edits from a dead agent: `git checkout --` to last known-good before proceeding (as before).
- If the 5-hour usage window is near reset or the monthly limit looms: finish the in-flight map, commit, STOP
  cleanly. Never leave the tree dirty.

---

## 11. Alternatives considered (so the founder can redirect before firing)

1. **Breadth-as-distribution (THIS PLAN)** — recommended. Only autonomous lever on the real (distribution)
   bottleneck; compounds without the founder; matches the dossier's own stated moat thesis.
2. **Depth on existing maps** — add evidence/pillars to the 114. Lower marginal value: they're already
   hardened, and depth doesn't grow the intake surface. Reserve for a few flagship maps only.
3. **A flagship interactive feature** (argument-style quiz, crux-finder, embeddable verdict widget, public API).
   Potentially high-leverage and shareable, but speculative, engineering-heavy, and hard to verify
   autonomously. Better as a deliberate founder-scoped build than an autonomous token-burn.
4. **Pure content engine** (blog posts / guides / fallacy explainers at scale) — real long-tail SEO, but
   lower trust-moat than primary-sourced maps. Folded into this plan as the §9 hub layer rather than the spine.

**Recommendation:** fire this plan at Tier-1 first (§6), review the 14 new maps and the firewall report,
then decide whether to continue to Tier-2/3. The founder-gated and feature tracks stay parked until explicitly chosen.

---

## 12. Open founder decisions (answer before firing)
1. **Target size** — how far past 114? (default: Tier-1 ≈ +14, reassess.)
2. **Founder-gated topics (§3)** — build-to-staging, or skip entirely?
3. **Discovery hubs** — greenlight the §9 internal-link blog/guide posts, or maps-only this round?
4. **Run vehicle** — `Workflow` orchestration (recommended) vs. the manual parallel-Agent loop used last sprint.

---

*Predecessor: `docs/plans/2026-06-16-citation-moat-sprint.md` · State-of-corpus: `docs/plans/2026-06-16-launch-dossier.md`
· Running log: `docs/reviews/SPRINT-CHANGELOG.md` · Dead-link tool: `scripts/check-source-urls.ts` · Reference map: `data/topics/nuclear-energy-safety.ts`*
