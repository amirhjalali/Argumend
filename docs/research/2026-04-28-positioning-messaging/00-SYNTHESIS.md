# Positioning & Messaging — Synthesis

**Date:** 2026-04-28
**Companion to:** the 5 prior swarm syntheses (`distribution`, `visual-design`, `codex-image-pipeline`, `activation-retention`, `current-controversies`)
**Inputs:** 9 parallel research files (~29.5k words). Agent 10 (multi-audience pitches) failed with a socket error — its content overlaps with cycle 1 files 08 and 10, which already cover ACX Grant + Asterisk pitch + Hear This Idea + journalist pitching.
**Reader context:** Cycles 1-5 gave you a 12-week launch plan, but every channel in it requires a crisp pitch. This swarm is the pitch.

## 1. Three production bugs to fix today (15 min)

Like cycle 4 and cycle 3, this swarm surfaced live misalignments that need fixing before any positioning work compounds:

1. **`README.md` line 3 says "utilizes AI to provide context about varying perspectives on issues"** — generic AI-buzzword copy that contradicts the homepage's already-correct positioning. This leaks into GitHub, npm, every AI-generated scrape. (File 01, file 05)
2. **`CLAUDE.md` line 3 still leads with "AI-powered argument mapping platform"** — same misalignment. The homepage drops "AI" correctly; internal docs still lead with it. (File 05)
3. **The homepage has no proper site-meta hero.** `<title>`/`og:title` says "ARGUMEND — Map Arguments, Not Win Them" but no visible H1 or brand line above `FeaturedTopicHero.tsx` exists. The visible H1 is whatever topic happens to be featured. Visitors don't know what the site IS. (File 06)

These three are 15 minutes of editing, total. They unlock everything downstream because they stop sending mixed signals about what Argumend is.

## 2. The recommended 1-liner

The 9 agents converged on a coherent positioning *posture* but split on the exact 1-liner. Adjudicating across files 01, 06, 07, 08:

**Recommended primary 1-liner: "The crux of any controversy, mapped."** (file 06)
**Recommended paired tagline: "Disagree better."** (file 01)
**Recommended subhead:** "Positions, evidence, cruxes, and fallacies — extracted from any debate, judged by a multi-model council."

Why this combination wins over alternatives:

- **Names the unique mechanism (crux)** — every other framing dilutes to generic "argument mapping"
- **Implies the alternative being replaced** — the status quo of "controversy without finding the crux"
- **Six words** — short enough to fit X bio, ACX classifieds headline, OG card, podcast intro
- **"Disagree better" tagline does anti-positioning work** — most disagreement is bad; this is the verb-form promise
- **Subhead names the differentiator the wedge audience cares about** — multi-model judging is the genuine moat (file 05 §key-finding identified this as the only thing competitors can't replicate)

Backup options if testing reveals weakness:
- File 01's primary: "Argument maps for the questions that divide us." (broader but less mechanism-specific)
- File 07's: "Maps the cruxes, evidence, and fallacies in any argument. For people who steelman before they argue." (longer, names audience explicitly via vocabulary)
- File 08's: "Find the actual disagreement in any debate — what we call the crux." (brand-asset-as-vocab pattern)

## 3. The category claim

**Recommended category: "epistemics tool for public controversies"** (file 02). With "argument map" as the visible artifact and "epistemics" as the category gravity.

Why not "argument-mapping platform" (current default):
- Niche academic-coded, competes directly against Kialo on Kialo's terms
- Tiny Google search volume
- Sounds like a developer tool

Why not "civic tech" / "media literacy" / "critical thinking":
- Pol.is and Kialo prove these are commercially fragile and grant-dependent
- Argumend's wedge audience finds these labels repellent

Why "epistemics tool":
- Wedge audience (ACX/LW/rationalist-adjacent) speaks "epistemics" natively
- Free of SaaS expectations
- Implicitly excludes the bad-faith / hyper-partisan audiences

The Asterisk Magazine model (file 03) extends this: position as a **publication-shaped product** rather than a SaaS, with themed volumes and quarterly release events.

## 4. The vs-Kialo positioning

Every prospect, journalist, foundation officer will ask "isn't this just Kialo?" (File 04)

**Press 1-liner: "Kialo asks people; Argumend asks the source."**
**Product/deck line: "Argumend extracts; Kialo annotates."**

The structural moat: Kialo cannot ship AI extraction without invalidating the human-authored corpus that ESSA, BETT, and 1M users are built on. That's the genuinely durable difference. Education positioning should be **complementary, not competitive** ("use Kialo for in-class debate; use Argumend for the take-home reading").

## 5. The AI label posture

**AI-as-feature, not AI-as-identity** (file 05). Drop "AI" from headlines; foreground it on methodology / press / grant / investor surfaces only.

The wedge audience (ACX/LW) is AI-criticism-fluent and discounts "AI-powered" copy by default — the way they discounted "blockchain-enabled" in 2018. The genuinely defensible AI claim is **the multi-model judge council surfacing inter-model disagreement** (`lib/judge/council.ts:160`). No competitor has this. Foreground it specifically wherever AI is named.

## 6. The vocabulary moat

**Hybrid tilted toward lean-in** (file 08). Defend as branded terms: **Crux, Steelman, Cruxtacean, named fallacies, Verdict, Judge Council**. Drop **meta-claim and pillar** — neither delight rationalists nor onboard normies.

Inline-translation pattern (Manifold's "market" template):
- Hero: "The crux of any controversy, **mapped**."
- Crux node label: "Crux" with hover/tap tooltip "the load-bearing claim where this debate turns."
- Steelman UI rename: `skeptic_premise` / `proponent_rebuttal` → "Skeptic's steelman" / "Proponent's steelman" (schema unchanged, copy only)
- New `/glossary` nav entry covering Crux, Steelman, Verdict, Judge Council, Confidence Score, fallacy taxonomy

## 7. The for-whom framing

**Primary audience: ACX/LW/rationalist-adjacent** (file 07). Secondary: Substack writers/commentators. EA and AI safety natively included in the primary wedge.

Surface differentiation rule:
- **Homepage:** implicit (vocabulary signaling only — "crux," "steelman")
- **/about:** explicit but inclusive — name ACX, LessWrong, EA Forum, Asterisk as primary audience
- **Press kit / X bio / ACX-targeted copy:** fully tribe-native

Recommended ring-expansion path: wedge → adjacent overlaps (Substack writers, journalists, AI safety researchers) → cerebral mainstream → education vertical → mainstream citizen, with stage gates between.

## 8. The founder narrative

**Recommended archetype: Builder/hacker + AI-curious-insider, with notes of Frustrated-user** (file 09).

Framing: "Long-time data engineer who started building agentic AI systems and got tired of how badly online discourse degrades. So I built an argument map."

Critical action: **add a "Note from Amir" + masthead to /about**. Anonymity on the product surface is the most fixable distribution liability — ACX/LW/podcast distribution channels are gated by founder presence.

⚠ **Verify before publishing**: agent 09 did external research and proposed specific framing based on what it inferred about the founder's background (data engineering, Avenu AI CTO, public agentic-AI repos). Confirm these public claims are accurate and represent how the founder wants to be framed before committing to this narrative on /about or in press materials.

## 9. The Asterisk Magazine playbook adoption

Three concrete moves Argumend should make based on the Asterisk template (file 03):

1. **Restructure the existing 109 topics into themed "volumes" with quarterly release events.** The frame turns a topic library into a publication. ~1 week of work for `/volumes` index + volume metadata on every topic.
2. **Commission a per-volume hand-drawn mark in the natural-philosophy-notebook signature** (cycle 2 file 06's recommendation, restated). One illustrator brief, eight illustrations.
3. **Rewrite the homepage hero in editorial-promise voice, not SaaS verb voice.** Asterisk's pattern: editorial-promise + subject-filter, no audience-naming, no technology-naming.

## 10. The 30/60/90-day positioning rollout

| Day/Wk | Action | File | Effort |
|---|---|---|---|
| Today | Fix `README.md` line 3 + `CLAUDE.md` line 3 — drop "AI-powered" copy | 01, 05 | 5 min |
| Today | Add minimal site-meta H1 above `FeaturedTopicHero.tsx` (`<HeroBand />`) | 06 | 1 day |
| Wk 1 | Update X bio + Twitter card metadata to "The crux of any controversy, mapped." + "Disagree better." | 01 | 30 min |
| Wk 1 | Rewrite the README, package.json description, GitHub repo description, npm description | 05 | 1 hr |
| Wk 1 | Add "Note from Amir" + masthead to /about (verify framing first) | 09 | 1 day |
| Wk 1 | Ship `/glossary` page with Crux / Steelman / Verdict / Judge Council / fallacy taxonomy | 08 | 2 days |
| Wk 2 | Crux node label change + tooltip pattern via `RichNode.tsx:99-122` | 08 | 0.5 day |
| Wk 2 | Rename Steelman UI labels (`skeptic_premise` → "Skeptic's steelman") | 08 | 0.5 day |
| Wk 2 | Build `/volumes` index; tag existing 109 topics into 8-12 thematic volumes | 03 | 3 days |
| Wk 3 | Build `<HeroBand />` properly behind `NEXT_PUBLIC_NEW_HERO=true` flag for split-test | 06 | 2 days |
| Wk 3 | Update `/about` with explicit audience naming (ACX, LessWrong, EA Forum, Asterisk) | 07 | 1 day |
| Wk 3 | Founder weekly X thread cadence begins ("I mapped [recent piece]; the crux turned out to be [X]") | 09 | ongoing |
| Wk 4 | Three-variant landing page A/B test for 14 days | 02 | 2 days setup |
| Wk 4 | DM-test three frames to ten ACX/LW operators with "civic tech" negative control | 02 | 1 day |
| Wk 5-6 | Founding manifesto essay (3,500-5,000 words), pitch to Asterisk first, fall back to LW + EA Forum cross-post | 09, cycle 1 file 04 | 1 week |
| Wk 7-8 | First "volume" release event with custom hand-drawn mark, ACX classifieds, podcast pitches | 03, cycle 1 | 2 weeks |
| Wk 9-12 | Iterate based on test data; lock the winning hero; standardize across all surfaces | all | ongoing |

## 11. The six-swarm position

Argumend now has, across six swarm syntheses:

1. **Cycle 1 (distribution):** ACX is the lever. Demo asset gates everything. oEmbed lane is open.
2. **Cycle 2 (visual):** Natural-Philosophy Notebook signature. Defended color = crux crimson. Asterisk template.
3. **Cycle 3 (Codex pipeline):** Pattern B (SDK scripts). $51 initial / $106 yr-1. Discipline layer prevents drift.
4. **Cycle 4 (activation/retention):** Five funnel bugs. Activation = first crux read. Browse-first onboarding.
5. **Cycle 5 (current controversies):** AI 2027 first publish. 9/10 on Trump tariffs, China-Taiwan, Ukraine, AI regulation, geoengineering.
6. **Cycle 6 (this — positioning):** "The crux of any controversy, mapped. Disagree better." Vocabulary lean-in. Asterisk-volume framing.

These compose into a coherent 12-week launch plan where:
- The pitch is locked (cycle 6)
- The brand is locked (cycle 2)
- The production engine is sized (cycle 3)
- The funnel is fixed (cycle 4)
- The first content batch is researched (cycle 5)
- The distribution moves are sequenced (cycle 1)

There are no remaining major upstream gaps. The remaining work is execution — and the execution is heavily front-loaded with 15-30 minutes of "fix the obvious things" wins (README copy, hero band, save button, footer email, RSS extension, favicon).

## 12. Confidence

- **Highest confidence:** README/CLAUDE.md misalignment is real and 5 minutes to fix. Vocabulary lean-in is correct (the wedge audience speaks this). vs-Kialo positioning is durable. Anonymity is fixable.
- **High confidence:** "The crux of any controversy, mapped." is the right primary 1-liner. "Disagree better" is the right tagline. Multi-model judging is the genuinely defensible technical moat.
- **Medium confidence:** The Asterisk-Magazine "volumes" framing pays off (depends on whether the audience reads themed batches as more legitimate than a flat topic list). The founder narrative archetype lands without seeming costumey.
- **Low confidence:** "Epistemics tool for public controversies" as category — three-variant A/B test is genuinely needed before locking. The wedge-audience-explicit /about copy converts non-wedge visitors at acceptable rate.
- **Honest unknown:** Whether the founder is willing to develop a public personal presence at the cadence (weekly threads, manifesto essay, podcast appearances) that the cycle-1 distribution plan requires. This is the most consequential unknown across all six swarms.
