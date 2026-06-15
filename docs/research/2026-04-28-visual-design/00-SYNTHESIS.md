# Visual Design Research — Synthesis

**Date:** 2026-04-28
**Companion to:** `docs/research/2026-04-28-distribution/00-SYNTHESIS.md`
**Inputs:** 10 parallel research files in this directory (~33k words, ~250 cited URLs)
**Reader context:** Cycle 1 identified that Argumend's gating constraint is a 30-second magic-moment demo asset, that the wedge audience is the ACX/LW/Asterisk orbit, and that ACX is the single highest-leverage distribution lever. This cycle answers "what does the visual production stack look like to actually execute that."

## 1. The single biggest finding

**Argumend's brand wedge is one defended color plus one rotating motif. Asterisk Magazine is the template.**

Across the 10 reports, the patterns that distinguish "expensive-feeling" niche-cerebral products from "indie-feeling" ones converge on two moves:

1. **One ruthlessly-defended signature color.** Substack owns `#FF6719` orange. Linear owns its violet gradient. Anthropic owns its earthy off-white. Argumend should commit to **crux crimson `#a23b3b`** as its single signature accent — the most distinctive of the four current accents and the only one with intrinsic product meaning. Demote teal/rust/brown to functional roles only. (File 06 §6.)
2. **One recurring graphic motif.** Asterisk Magazine commissions a hand-drawn asterisk per issue — same primitive, infinite variations. Argumend should commission a **rotating "crux mark"** (~$3-8K from an editorial illustrator) that appears on every surface: OG images, blog headers, podcast cover, video lower-thirds, X graphics. (File 06 §6.)

The defended color + rotating motif IS the brand. Everything else is execution.

## 2. The visual signature for AI-generated images

The user's specific question: "What would the visual signature be for the images with Image 2.0?"

**Recommended signature: "The Natural-Philosophy Notebook"** (file 01 §5).

- **Background:** scanned parchment, `#f4f1eb`
- **Subject:** hand-drawn ink graph of 3-7 nodes — every image has a graph
- **Crux marker:** exactly one node filled crux crimson `#a23b3b`, labeled "crux"
- **Other nodes:** deep-teal `#3a6965` evidence dots, rust `#C4613C` and earth-brown `#8B5A3C` side markers
- **Typography:** EB Garamond serif overlay
- **Margin object:** one rotating classical artifact — astrolabe, weighing scale, hourglass, manuscript, compass, dividers, sealing wax, quill
- **Banned:** amber, black, photorealism, glossy textures
- **Cost:** ~$4/month for 50 images via gpt-image-2 API

This signature is GPT Image 2.0's strength zone (text-heavy panels with consistent style anchors via reference images). The 8-fragment prompt library lives in `lib/visual/prompt-fragments.ts` and gets consumed by a Node batch script over the topic manifest. Live type stays in Figma — never trust Image 2 to render the wordmark.

This is also the single recurring motif from §1 — the natural-philosophy notebook IS the rotating mark, made systematic.

## 3. The 90-day visual + content production sequence

| Wk | Action | File | Effort | Why |
|---|---|---|---|---|
| 1 | Commit crux crimson `#a23b3b` as single defended color; demote others | 06 | 2 hr | Brand wedge — must precede all production |
| 1 | Ship Vercel `@vercel/og` image generator for every topic, blog post, analysis | 06 | 1 day | Free distribution — every share is a branded asset. Highest-ROI move. |
| 1 | Generate 12-image contact sheet via Image 2.0 with the Natural-Philosophy Notebook signature; lock the artifact rotation order | 01 | 1 day | Operationalizes the visual signature |
| 1 | Subscribe to Argil ($39/mo); clone founder voice + face | 04 | 2 hr | Unlocks talking-head shorts, podcasts, demos |
| 1 | Subscribe to Submagic ($14/mo); build 8-asset Brand Kit (title card, lower-third, captions, intro stinger, outro CTA, graph-overlay frame) | 10 | 1 day | Visual consistency layer for all video |
| 2 | Build `recordCanvas()` dev-mode button — scripted React Flow camera path → 30s WebM | 04 | 3 days | The differentiator no competitor has; basis for the magic-moment demo |
| 2 | Generate Recraft v4 vector batch of 24 fallacy icons (locked sref) — published Figma library | 02 | 3 hr | 80%-completes every future fallacy graphic |
| 3 | Ship the 30-second magic-moment demo: paste-article → graph blooms → crux highlights | 07 | 1 day | The cycle 1 gating asset. Sora 2 ($0.10/s) for hero, Runway for hold shots. |
| 3 | Migrate blog to MDX; ship `<MiniMap>`, `<CruxReveal>`, `<FallacyTagger>`, `<JudgeVerdictCard>` components | 08 | 1 wk | Structurally underpriced — current Markdown blog is leaving the entire React Flow canvas inert in long-form |
| 4 | Ship "Anatomy of a Fallacy" interactive explainer — click-to-tag rhetorical moves, side-panel graph builds in real time | 08 | 1 wk | HN-shaped artifact, single shareable URL, IB-teacher-embeddable |
| 5 | Information design pass on canvas: one-line "how to read this" overlay (1d) + confidence off color onto position (2d) + semantic zoom (4-5d) | 09 | 1.5 wk | Reduces cognitive load on the load-bearing surface |
| 6 | Begin "Crux of the week" — 60s vertical, weekly cadence | 10 | 90 min/wk | Compound bet: bench depth via "Did you know this is a fallacy?" 30s shorts in batches of 8-10 |
| 7-8 | Generate Episode 1 of "The Crux" podcast end-to-end via NotebookLM (custom argument-briefing markdown, NOT raw JSON) on highest judge-disagreement topic | 03 | 1 wk | Proof-of-workflow before committing to Season 1. Apple now mandates AI disclosure — comply upfront. |
| 9-10 | Hybrid Framer migration: port `/`, `/about`, `/blog`, `/guides` to Framer Pro behind Next.js rewrites; keep `/topics/*` and canvas in Next.js | 05 | 20-30 hr | Where motion is the message, Framer wins. Where data is the message, Next.js wins. Argumend needs both. |
| 11 | Commission rotating crux mark from editorial illustrator (~$3-8K) | 06 | engagement | The Asterisk Magazine play |
| 12 | Ship Season 1 episode 1; pin demo on X; submit "Anatomy of a Fallacy" to HN | 03/07/08 | bundling | First real launch surface from the freeze, with all assets composed |

## 4. The cost model

**Monthly recurring (from week 1):**
- Argil avatar — $39
- Submagic captions — $14
- Descript editing — $24
- Headliner audiograms — $25
- Opus Clip Pro — $29
- Veo 3.1 Lite + Runway Standard B-roll — ~$30 (variable)
- NotebookLM (Google AI Pro tier) — $20
- GPT Image 2.0 API — ~$4 for 50 images
- Recraft v4 Pro Vector — ~$33
- Buzzsprout podcast hosting — $12
- Framer Pro (after week 9) — $45
- ElevenLabs Studio 3.0 voice clone — $22

**Total: ~$300/month recurring**, plus one-time ~$3-8K for the rotating crux-mark commission.

**Output cadence:** 1 long-form video + 4 vertical shorts/month + 1 podcast episode/week + 4 infographics/week + 50 GPT Image graphics/month + ongoing OG images on every share. Realistic at ~10-15 hr/week of founder time.

This is bandwidth-realistic for a solo founder in observation mode. The freeze ends; the production engine is set up to run thereafter.

## 5. What to deprioritize / avoid

- **Don't use CapCut.** (File 10.) Banned in the US, doubled to $179.99/yr, ByteDance grants itself perpetual rights to private drafts. Use Veed.io ($108/yr) for full-editor work.
- **Don't ship the 109-topics-in-a-year podcast plan.** (File 03.) Founder-killer. Ship Season 1 of 12 weekly episodes, decide at week 12 whether to scale, pivot to 5-min daily Brief format, or kill.
- **Don't trust NotebookLM Cinematic Video Overviews as a hero asset.** (File 04.) Rate-limited (20/day Ultra), English-only, single voice, 1-3 min, unbranded, 30+ min generation time. Use as 90s explainer seed, not the headline output.
- **Don't trust GPT Image 2 to render the Argumend wordmark.** (File 01.) Vector logo overlay always happens in post (Photoshop/Affinity action). Brand-critical type never goes through the model.
- **Don't migrate to Webflow.** (File 05.) B2B-SaaS-flavored, heavier DOM. Wrong instinct for Argumend in 2026.
- **Don't commit to a brand-kit perfection cycle before shipping.** (File 10.) Lock the kit at week 4. Ship the first "Crux of the week" by next Tuesday on whatever exists.
- **Don't ship more than 5 explorable explanations ever.** (File 08.) Distill.pub's 2021 burnout hiatus is the cautionary tale. Cap ambitions.

## 6. How this composes with cycle 1

| Cycle 1 finding | Cycle 2 enabling action |
|---|---|
| Demo asset is the gating constraint | Build it: Sora 2 + Runway + scripted React Flow recording (week 3) |
| ACX classifieds is the highest-leverage distribution | The classifieds listing needs a polished thumbnail — solved by the visual signature (week 1-2) |
| oEmbed widget for LessWrong is structurally open | The embed needs distinctive visual identity — Natural-Philosophy Notebook signature applies (week 1) |
| Asterisk Magazine pitch is the highest-EV writing move | The piece IS visually inspirational once Argumend adopts Asterisk-style hand-drawn motif (week 11 commission) |
| Pre-extract major debates as artifacts | Each artifact gets a 30s "Crux of the week" short for distribution (weekly from week 6) |
| Show HN launch (week 10 of cycle 1 plan) | Needs the magic-moment demo (cycle 2 week 3), the OG generator (cycle 2 week 1), and the Anatomy of a Fallacy explainer (cycle 2 week 4) shipped first |

The two synthesis documents compose into one launch sequence. **The freeze ends, the brand wedge is committed, the production engine runs, and the ACX funnel is the first real distribution move.** That's the plan.

## 7. Confidence

- **High confidence:** Defended-color commitment is the highest-ROI brand move. Vercel OG generator is free distribution. Argil + Submagic stack is solo-founder-realistic. Natural-Philosophy Notebook signature works in Image 2.0.
- **Medium confidence:** Hybrid Framer migration pays off — depends whether motion-rich landing pages convert better. NotebookLM podcast Season 1 finds an audience — the AI-disclosure stigma is unknown. The crux-mark commission cost stays under $8K — depends on illustrator selection.
- **Low confidence:** "Crux of the week" weekly cadence sustains for 12 weeks at solo-founder bandwidth. NotebookLM Cinematic improves enough by Q3 to be a hero asset.
- **Honest unknown:** Whether the founder will actually defend the color and motif when each piece of content tempts a deviation. Brand consistency is a discipline problem, not a tool problem.
