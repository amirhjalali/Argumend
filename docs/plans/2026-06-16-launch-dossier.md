# Argumend — Launch Dossier (2026-06-16)

> **Internal founder pack. Synthesis of the Citation Moat sprint.** Nothing here is auto-sent
> or auto-published. The distribution assets in `docs/drafts/` are founder-review-only; this
> dossier only *indexes* them and tells you what's ready vs. what needs your hand.

**One-line state:** The corpus is hardened and defensible. The product side of the launch is
done. What remains is founder-bound distribution — the essay, the gatekeeper DMs, the grants.

---

## 1. The launch artifact — `consciousness-ai-systems`

**Live:** https://argumend.org/topics/consciousness-ai-systems
**Source of truth:** `data/topics/consciousness-ai-systems.ts`
**Status:** `highly_speculative` · **Confidence score:** 31/100 · **Evidence:** 12/12 web-sourced

**Why this map, why now (the news hook):** Anthropic runs pre-deployment **model-welfare**
assessments and has hired for AI welfare; the people closest to frontier systems disagree about
AI moral patienthood by orders of magnitude. This is a live, high-salience question where almost
nobody has earned their confidence — the ideal worked example for Argumend's method ("map the
disagreement, don't win it"). The map takes **no house position**; it makes the cruxes inspectable.

**Meta-claim mapped:** *Current or near-future AI systems could possess some form of consciousness
or subjective experience, creating moral obligations toward them.*

**Two pillars:**
1. **Functional Theories of Consciousness** — is consciousness about *substrate* (needs biological
   neurons) or *function* (needs only the right information processing)?
2. **Moral Status & Policy Implications** — does the *mere possibility* of AI consciousness create
   obligations now, and what would that do to AI safety priorities?

**The cruxes (the load-bearing disagreements):**
- **No validated detector.** We have no agreed test to tell whether a system that *reports*
  experience *has* it — and LLM self-reports track training data, not inner states.
- **Precaution under uncertainty.** Whether a non-negligible probability of sentience creates a
  present duty of consideration (the Sebo–Long argument), or whether acting on an unmeasurable
  possibility is premature and anthropomorphic (the Suleyman/biological-naturalism line).

**Why it's launch-ready:** every one of the 12 evidence items is traced to a primary source —
Butlin & Long et al. 2023 (arXiv:2308.08708), Chalmers 2023 (arXiv:2303.07103), Seth 2025
biological-naturalism (BBS), the **Cogitate Consortium 2025** adversarial collaboration (*Nature* 642 —
IIT *and* GNWT both failed preregistered predictions, the empirical backbone for "no settled
theory"), Comsa & Shanahan 2025 (LLM self-reports unreliable), and Sebo & Long's precautionary
argument. Both sides are steelmanned to their strongest honest form. The map's prose carries no
fabricated or stale citation. A gatekeeper can "tear it apart" and find receipts, not marketing.

---

## 2. The Citation Moat sprint — what was built (2026-06-16)

The strategic bet: the compounding distribution mechanism is being a **trustworthy, LLM-citable
reference work**. A map a gatekeeper will share — or an LLM will cite — must be bulletproof. So we
hardened the whole corpus first. Full per-iteration log: `docs/reviews/SPRINT-CHANGELOG.md`.

**Headline results:**
- **Citation coverage 56% → 98%** across all 114 maps. The corpus is now **1,151 evidence items**,
  ~1,130 with a direct primary-source URL. The remaining ~2% are genuinely-unsourceable normative/
  theoretical claims, honestly labeled and low-weighted (never papered over with an invented cite).
- **Every batch web-verified and pushed.** ~50 maps hardened across 9 iterations; tsc + 207 tests
  green per batch.

**Integrity defects caught and corrected (not just missing URLs — substantive errors):**
- **Fabricated citations** asserted as real, now removed/replaced: tiktok-brain-rot's "Hancock et al.
  2023, 72 studies" meta-analysis (does not exist → real Marker/Gnambs/Appel 2018), a phantom
  "Montag 2022 striatal-gambling fMRI", ai-content-labeling's mis-attributed deepfake stat,
  obesity's fabricated food-desert figure, lab-diamonds' garbled "1,750 acres/million carats."
- **Inversions / backwards framings:** rent-control had the IGM economist survey *inverted*;
  minimum-wage stated the Seattle finding backwards; the inflation map had an evidence item coded
  for the wrong side; death-penalty misread the PNAS "4%" as innocents-executed (it's the false-
  *conviction* rate).
- **Mis-attributions corrected:** cancel-culture "Pew 62%" → Cato/YouGov; NASA's "$7-14 per $1" ROI
  exposed as promotional urban-legend; Reinhart-Rogoff growth-cliff caveated with Herndon-Ash-Pollin.
- **Prose swept too:** the fabricated/stale citations stranded in pillar *narrative* (rebuttals,
  summaries) — where the evidence-only passes couldn't reach — were evicted across the 22 most-
  corrected maps.

**Durability — the gains are now permanent and machine-readable:**
- **CI ratchet test** (`data/topics.test.ts`): fails the build if overall citation coverage ever
  drops below 95% (now 98%). The corpus can't silently regress. Suite is 207 tests.
- **`/llms.txt`** carries a "Citation integrity" section with a *dynamically-computed* coverage stat
  ("98% of evidence items carry a direct primary-source URL") — so answer engines know it's citable.
- **Per-topic AEO citations:** topic pages emit the verified evidence URLs as schema.org `citation`
  (CreativeWork) on the Article JSON-LD, surfacing primary sources to crawlers and LLMs.
- **Launch cluster upgraded:** the AI-safety/consciousness maps (consciousness-ai-systems 7→12,
  ai-replacing-doctors 12→15, animal-consciousness-rights 8→11, ai-regulation 9→12, open-weight 16→17)
  are all at 100% coverage with new web-sourced evidence and both sides steelmanned.

---

## 3. Index of founder-bound distribution assets (`docs/drafts/`)

> **All four are DRAFTS. Founder personalizes the `[VERIFY]`/`[ASK]`/`[METRIC]` placeholders and
> sends/publishes manually. None is auto-sent. Voice is anonymous/institutional ("we," never a named
> founder) per `docs/research/2026-04-29-anonymous-brand-voice/`.**

| Asset | File | Status |
|-------|------|--------|
| **LessWrong essay** — "Map the Disagreement, Don't Win It: AI Consciousness as a Worked Example" | `docs/drafts/lesswrong-ai-consciousness-essay.md` | Drafted, ~full length. Procedural thesis (crux-first), steelmans both sides, links the live map. Founder review/edit before publishing. |
| **Gatekeeper DMs** — Scott Alexander, Zvi Mowshowitz, Liron Shapira, Oliver Habryka | `docs/drafts/gatekeeper-dms.md` | 4 first-pass DMs, each leads with a map as a gift ("tear it apart"). Each has a `[VERIFY: …]` slot for a current, confirmed reference. Send one at a time, spaced out. |
| **Grant applications** — Manifund, ACX Grants (+ FLF/SFF stubs) | `docs/drafts/grant-drafts.md` | Tailored drafts; `[ASK: $…]` and `[METRIC: …]` to fill. Honest about early/pre-traction state. |
| **Launch packaging** — multi-format content for the consciousness map | `docs/drafts/launch-packaging.md` | Asset pack anchored strictly to the map's actual content. Founder reviews before posting/producing. |

---

## 4. Ready vs. needs-the-founder

**✅ Ready (done, verified, shipped):**
- The canonical launch map is bulletproof and primary-sourced (12/12).
- The whole 114-map corpus is at 98% citation coverage, prose-clean, and ratchet-protected.
- The corpus is exposed to LLMs/crawlers (`/llms.txt` + per-topic `citation` JSON-LD).
- The distribution assets are drafted and staged.

**👤 Needs the founder (founder-bound — cannot and will not be auto-done):**
1. **Publish the LessWrong essay** — review/edit `lesswrong-ai-consciousness-essay.md` in your voice,
   then post. This is the single highest-leverage distribution act.
2. **Send the gatekeeper DMs** — fill each `[VERIFY]` with a *currently-confirmed* reference (open the
   post, don't trust a remembered title), pick the channel, send one at a time spaced across days.
3. **Submit the grants** — fill `[ASK]`/`[METRIC]` in `grant-drafts.md`; Manifund + ACX are the
   fastest-decision, lowest-friction targets.
4. **Decide timing** — the Anthropic model-welfare news hook is live now; the essay + map are the
   pairing to lead with.

**The pattern to remember** (`memory/project_urgency.md`): the bottleneck was never more product —
it was distribution. The product side is now as strong as it has ever been. The remaining moves are
yours to make.

---

*Sprint plan: `docs/plans/2026-06-16-citation-moat-sprint.md` · Full changelog:
`docs/reviews/SPRINT-CHANGELOG.md` · Verification index: `docs/reviews/00-INDEX.md`*
