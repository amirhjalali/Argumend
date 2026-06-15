# Distribution Research — Synthesis

**Date:** 2026-04-28
**Cycle:** 1 of 2 (cycle 2 = topic-selection, fires 03:37 UTC)
**Inputs:** 10 parallel research files in this directory (~37k words, ~400 cited URLs)
**Reader context:** Argumend is in "orbit, not climbing" — many plans shipped, no real users, on observation freeze that started 2026-04-09. This synthesis is decision-oriented, not motivational.

## 1. The single biggest finding

**There is no distribution. There is one distribution: Astral Codex Ten.**

Every single one of the 10 research files independently surfaced ACX / Scott Alexander as the highest-leverage mention available. Manifold was 10x'd by an ACX post. Metaculus was 10x'd by an ACX post. Asterisk Magazine *was an ACX child*. Squiggle, Roam, Manifold, Polymarket — every cerebral product that scaled to a rationalist-adjacent audience got there because Scott pointed at it.

The ACX funnel has three concrete on-ramps, all currently open:

1. **ACX Classifieds** (recurring, free, next likely July 2026) — submit a 80-120 word listing under "Consume My Product/Service." Lead with one specific deep-link argument map (recommend AI extinction risk), not the homepage. (See file 04 §6.)
2. **ACX Everything-Except-Book Review Contest 2026** — submit a 2,000-10,000 word "review of the structure of a controversial debate," with Argumend's argument-map as the structural backbone. Anonymous submission. Past finalists (Doucet, Hoel, Hendrickson) parlayed it into book deals. (File 04 §6.)
3. **The gift-as-pitch DM** — send Scott a working Argumend map *of one of his own essays*. Don't pitch. Let the artifact be the pitch. (File 05 §7.)

If only one thing happens in the next 90 days, it should be this funnel.

## 2. The second-biggest finding (and the actual harder problem)

**Argumend has no demo asset.** Every winner in the 10-product cohort (file 10) had a single 30-second magic-moment artifact that traveled. Lex.page's demo video got 25K signups in 24 hours. Roam's "TfT for thinking" graph animation. Manifold's embeddable market widgets. Argumend's argument-graph extraction is *visually* compelling but has no video, no GIF, no embed.

This is more important than any specific channel decision. **Build the 30-second demo before any launch tactic.** A loop showing: paste a controversial article → graph materializes → cruxes highlight → evidence nodes expand. Caption-free. Made for X autoplay.

## 3. The lane that's structurally open

**oEmbed widgets for LessWrong, EA Forum, Substack, Marginal Revolution.** (File 02 §6 covers this best.)

Manifold's single biggest distribution wedge was that pasting `manifold.markets/...` into LessWrong rendered a live tradable market. Sinclair Chen built the LW integration in *one PR*. The lane for argument maps is currently empty:

- **Substack already chose Polymarket** for prediction-market embeds — not available.
- **LessWrong + EA Forum + Marginal Revolution + Asterisk + Lawfare** — open. No competing argument-map embed exists.

Engineering scope: expose `oembed.json` discovery on each topic page, build a sub-graph iframe (one crux + 3 evidence nodes), ship the LessWrong PR ourselves. Estimated 1-2 engineering weeks. Distribution ROI is plausibly years of compounding free embeds in the highest-fit publications on the internet.

## 4. The 90-day sequence (ranked by effort × impact)

| Wk | Action | File | Effort | Why |
|---|---|---|---|---|
| 1 | Build 30-sec demo loop | 10 | 2 days | Gating asset for everything else |
| 1 | Cold email Tim van Gelder, Maralee Harrell, Chris Reed | 09 | 1 hr | Academic legitimization triumvirate |
| 1 | Email Ozzie Gooen for pre-launch review | 01 | 1 hr | Only operator who's launched 3 epistemics tools on LW |
| 2 | Submit to next ACX Classifieds | 04 | 1 hr | Highest-leverage free distribution |
| 2 | Pre-extract AI 2027 debate as Argumend map | 01 | 2 days | Live LW conversation, hits Frontpage with luck |
| 3-4 | Asterisk Magazine pitch ("What I learned mapping 100 AI-safety arguments") | 08 | 5 days | $2K + permanently citable |
| 3-4 | Map every Dwarkesh Patel interview within 24h of release | 05 | ongoing | Pattern-as-pitch |
| 5-6 | Ship oEmbed widget + LessWrong PR | 02 | 2 wks | Structural wedge — lane is empty |
| 7-8 | Pitch Hear This Idea (Fin Moorhouse) | 08 | 1 hr | ~40-50% odds, lowest-friction tier-2 podcast |
| 9 | Apply to Inkhaven 2 (Berkeley) or Halfhaven (online) | 01 | 1 day | 2x karma multiplier on LW + in-person mentorship |
| 10 | Show HN launch (Sunday 00-01 PT) | 07 | 1 wk prep | Title: "Show HN: Argumend – Open-source AI argument maps with cruxes, evidence, and fallacy nodes" |
| 11 | NSDA resolution analysis pipeline (48hr turnaround) | 09 | 1 wk build, then ongoing | 75K HS debaters per cycle, calendar-driven free distribution |
| 12 | Apply for ACX Grant | 10 | 2 days | "The application is the announcement" |

The two non-negotiables: **demo asset (week 1)** and **ACX funnel (week 2)**. Everything else is sequencing around those.

## 5. What to deprioritize / not do

- **Don't post on r/changemyview as the founder.** (File 06.) The April 2025 University of Zurich AI-content controversy made the mods hyper-vigilant; Argumend's offline-by-default corpus is exactly what they're hunting. Recruit existing CMV regulars to mention it organically.
- **Don't pitch tier-1 podcasts (Lex Fridman, Tyler Cowen, Ezra Klein) cold.** (File 08.) They require an existing artifact — a published Asterisk piece, a Dwarkesh appearance — before they'll listen. Build the lower tiers first.
- **Don't run a Show HN before the demo asset exists.** (File 07.) The 2024 Argdown thread surfaced an audience asking for what Argumend builds — but only if the magic-moment demo lands. Without it, HN will bury it.
- **Don't try to reproduce Kialo Edu's playbook.** (File 09.) Long sales cycle, FERPA/COPPA, no LMS integration. The NSDA-pipeline play is the realistic education foothold; the "go through schools" path is a 3-year project.
- **Don't ship the dating-app / charity-loop equivalent.** (File 02.) Manifold tried many adjacencies and most flopped. Argumend's adjacencies (debate generation, judge council) are already in the repo — resist building more before any get adopted.

## 6. The honest bottleneck

**Per file 02:** Manifold sat at ~100 DAU for **9 months** despite executing this exact playbook well. Niche-cerebral products compound slowly. The synthesis above is not a "viral inflection in 90 days" plan — it's a "set up the right grooves so that compounding has a chance" plan.

**Per file 10:** "an unwedged niche-cerebral product is functionally invisible." Argumend currently targets no specific wedge audience. The implicit decision in this synthesis is that the wedge is **AI-safety-curious rationalist-adjacent readers** (the ACX/LW/Manifold/Asterisk overlap zone). This wedge is justified by:

- Highest density of structured-argument-curious readers per capita.
- Argumend's existing topic corpus already over-indexes on AI-policy / epistemics topics.
- All the lowest-friction wins (ACX classifieds, Hear This Idea, Asterisk, oEmbed for LW/EA Forum) are in this wedge.

If the founder wants a different wedge (e.g. high school debate via NSDA, or philosophy departments), the 90-day sequence needs to be rebuilt around that — don't try to do both.

## 7. What cycle 2 should answer

Cycle 2 (topic-selection, fires 03:37 UTC) is researching which controversial topics have live debate energy in April 2026. The two outputs need to compose:

- **From cycle 1:** the wedge audience is rationalist-adjacent / AI-safety-curious.
- **From cycle 2:** the next 5-10 topics to deeply analyze should be ones that this audience is *currently* arguing about.

The combined output is: "ship the demo, then build the next 5 argument maps on the topics cycle 2 ranks highest, then run the ACX funnel with one of those maps as the artifact."

## 8. Confidence

- **High confidence:** ACX is the lever. Demo asset is the gating constraint. oEmbed lane is open.
- **Medium confidence:** Asterisk pitch lands. Hear This Idea books. Show HN frame works.
- **Low confidence:** NSDA pipeline gets adoption (different audience, different sales motion). ACX Grant is competitive. Inkhaven application succeeds.
- **Honest unknown:** whether the founder has the willingness to focus on one wedge for 12 months. Based on the "in orbit, not climbing" memory note, this is the actual variable that will determine whether any of this matters.
