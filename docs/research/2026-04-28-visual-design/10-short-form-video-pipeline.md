# Short-Form Vertical Video Pipeline for Argumend

**Date:** 2026-04-28
**Analyst:** Research agent 10/10, visual-design swarm
**Brief:** Ship one short-form vertical video per week (X, TikTok, YouTube Shorts, Instagram Reels) at solo-founder bandwidth, with a consistent visual signature.

## 1. The 2026 Short-Form Vertical Video Toolchain

The category bifurcated in 2025-2026 into "AI clipping" tools that turn long videos into shorts and "finishing" tools that take a raw clip and add captions, B-roll, sound design, and platform-native pacing. A solo founder typically uses one of each.

### Clippers (long → short)

- **Opus Clip.** Starter $9/month; built around the **Virality Score** ([Submagic comparison](https://www.submagic.co/vs/captions-ai-vs-opus-pro)). Best general-purpose clipper for English long-form per April 2026 reviews ([Submagic alternatives](https://www.submagic.co/alternatives/opus-clip)).
- **Vizard.** $14.50–$19.50/month, half on annual. Wins on price-per-minute, **30+ languages**, public API from the Creator tier ([Vizard pricing](https://vizard.ai/pricing)). Best when you want programmatic control.
- **Klap.** Basic $23 / Pro $63. Wedge is **AI dubbing in 29 languages** ([Klap review](https://klap.app/blog/vizard-ai-review)). Overkill for English-only.
- **Eddie AI.** Plus $25/Pro $100. Not a clipper — a **multicam podcast editor** with speaker-identification auto-cuts, rough-cut export to Premiere/Resolve/FCP ([Eddie pricing](https://www.heyeddie.ai/pricing), [CineD](https://www.cined.com/eddie-ai-updates-released-visit-their-booth-at-nab-2026/)). Only relevant if Argumend ever runs a real multicam podcast.

### Finishers (raw clip → publishable short)

- **Submagic.** $14/month, $12 annual. **99%+ caption accuracy across 100+ languages** ([review](https://max-productive.ai/ai-tools/submagic/)), Hormozi/MrBeast-inspired caption templates, B-roll auto-insert, and as of March 2026 built-in publishing to TikTok/Reels/Shorts/LinkedIn/X ([pricing](https://www.submagic.co/pricing)). The **Brand Kit** pins fonts, colors, logos.
- **Captions / Mirage.** Rebranded to **Mirage** in 2025 with $100M+ funding at $500M valuation, pivoting from creator tools to a multimodal research lab ([TechBuzz](https://www.techbuzz.ai/articles/captions-rebrands-as-mirage-pivots-from-creator-tools-to-ai-research)). Creator app still alive but feature roadmap is now ad-generation. Don't bet on it long-term.
- **CapCut Desktop.** **Banned in the US since January 2025**; Pro doubled to $179.99/year in early 2026; June 2025 terms grant ByteDance perpetual royalty-free rights to all uploaded content including private drafts ([VEED](https://www.veed.io/learn/veed-vs-capcut)). **Skip CapCut.** The single most important toolchain decision for 2026 — legacy "use CapCut for free" advice is now wrong on cost, geopolitics, and IP grounds.
- **Veed.io.** Lite **$108/year (~$9/month)** with AI avatars, brand kits, team collaboration ([VEED](https://www.veed.io/learn/veed-vs-capcut)). Browser-based, no IP weirdness. The serious post-CapCut default.

### Recommended stack for Argumend

**Submagic (finishing) + Opus Clip (when repurposing long-form) + Veed.io (when you need a full editor for screen-record shorts).** Total cost ~$23–$27/month. The combined caption quality and brand-kit consistency from Submagic is the hardest thing to replicate manually, so it's the load-bearing tool.

## 2. AI-Avatar Pipelines for Talking-Head Shorts

This category exists because solo founders don't want to film themselves three times a week. April 2026 reality: avatars are **good enough for 30–90s shorts but visibly drift past 2-4 minutes**.

- **HeyGen.** Strongest on realism and expressiveness, weakest on long-form consistency. **Avatar IV** is best in 2-4 minute outputs; longer scripts show repetitive gesture patterns ([HeyGen review](https://vidailab.com/heygen-avatar-iv-review/)). Fine for 60-90s shorts.
- **Synthesia.** Wins on variety and long-form consistency, loses on expressiveness. Built for enterprise training. Workspaces, team management, brand kits enforce consistent layouts ([Colossyan](https://landing.colossyan.com/posts/heygen-vs-synthesia/)).
- **Argil.** Markets to founders who want to scale **a specific person's credibility** without filming ([Argil](https://www.argil.ai/blog/seedance-vs-arcads-vs-heygen-in-2026-a-performance-marketers-honest-review-tool-comparison)). Most relevant for Argumend if the founder wants a personal-brand avatar.
- **Captions / Mirage.** Fastest avatar-creation flow ("one selfie creates your AI twin") but rebrand-and-pivot risk above.
- **Hedra Character-3.** ~9/10 accuracy for talking avatars; audio-driven micro-expressions/blinks/head tilts **outperform competitors on expressiveness** ([Magic Hour](https://magichour.ai/blog/guide-to-hedra-ai), [WeShop](https://www.weshop.ai/blog/hedra-ai-review-2026-the-new-king-of-talking-heads-and-ai-avatars/)). 720p default, monthly credit expiry, customer-service complaints. Best for non-photoreal avatars — brand mascot, illustrated character, AI-generated face.

### Voice-clone ergonomics

Voice cloning quality has effectively converged. **ElevenLabs Multilingual v2** with a Professional Voice Clone (a few hours of clean studio audio, rather than the under-a-minute Instant Clone) is the default for narrator-style content; PlayHT Play 3.0 and PlayDialog are the pick when you want **two voices in one piece** (auto-generated dialogue between a host and guest); Cartesia Sonic 3 wins on latency for live agents but is not the right choice for asynchronous shorts ([SurePrompts 2026 comparison](https://sureprompts.com/blog/voice-generation-models-compared-2026)). For Argumend's weekly shorts, ElevenLabs Pro Voice Clone of the founder's actual voice is the obvious default — same tool the major podcast networks use, transparent provenance.

### Argumend recommendation

**Avatar use should be the exception, not the rule.** For Argumend's "smart fights live here" positioning (per the Kialo competitive intel), AI avatars carry an authenticity tax that's directly counter-brand. Use them only for (a) "Watch the AI map this" screen-records where the avatar is just narration, or (b) the synthetic two-host crossfire format. The founder's real face on camera, even shaky, is the more valuable signal.

## 3. Format Archetypes That Work for Cerebral Content

After reviewing roughly a dozen adjacent creators, the patterns that work for "cerebral" short-form (i.e., not lifestyle, not comedy, not dance) cluster into a few clear archetypes:

- **Viral-clip-from-long-form.** Dwarkesh Patel is canonical: **1M+ YouTube subs**, separate Dwarkesh Clips channel, Yudkowsky episode 1M+ views, drove Twitter discourse for weeks ([Mercury](https://mercury.com/blog/dwarkesh-patel-podcast-founder-lessons), [shorts feed](https://www.youtube.com/@DwarkeshPatel/shorts)). His thesis: framing — titles, copy, highlighted clips — is the only info a stranger has about whether something is compelling. Visual production is minimal: captions, a title card.
- **"10 wild examples" thread-as-video.** Min Choi (@minchoi, 366K followers) opens with **"We are cooked. 100% AI"** and lists 10 demos in sequence ([profile](https://x.com/minchoi)). Signature is taxonomy + curated wow. Bilawal Sidhu (1.6M+, ex-Google PM, TED AI Show host) does the higher-craft version ([LinkedIn](https://www.linkedin.com/in/bilawalsidhu/)).
- **TLDR News format.** Editorial publishers learned: **the most interesting part of a long video is near the end, but Shorts strip the context that makes it interesting** ([Press Gazette](https://pressgazette.co.uk/social_media/tldr-news-jack-kelly-youtube/)). Solution: don't clip from long-form. Produce **purpose-built evergreen shorts** in themed series, each self-contained.
- **Vox infographic explainer.** Voiceover, on-screen text/numerals, simple shape annotations, hand-made aesthetic, "claim → visual → numeric punch" rhythm ([School of Motion](https://www.schoolofmotion.com/blog/estelle-caswell-vox-podcast)). Visual density carries the cerebral payload.
- **Karpathy on-screen riff.** Mostly text — a tweet, a blog quote, a whiteboard. "Vibe coding" went viral as a single tweet ([Klover](https://www.klover.ai/vibe-coding-karpathy-viral-term-ng-reality-check-klover-first-mover-advantage/)). Pattern: **high-status low-production**. Production polish actually weakens it.
- **Nicky Case interactive explainer.** Long-form, web-native, simulation-driven ([Wikipedia](https://en.wikipedia.org/wiki/Nicky_Case)). Not a short-form pattern but a useful **source** — clip 30s of an argument map evolving as a short.

**What hooks work:** (a) named adversaries ("Yudkowsky says X. Sutton says Y."), (b) "you've been thinking about this wrong" reversal openers, (c) a single visible chart or graph in the first 0.5s, (d) on-screen captions readable without sound. **What doesn't:** generic stock footage, slow zooms, the "let me explain" preamble that gives the viewer 1.5s to swipe away.

## 4. Argumend-Specific Archetypes — 5 Formats to Pilot

### (a) "Crux of the week" — 60s

The actual disagreement in a current debate, distilled to the load-bearing claim that, if resolved, ends the dispute. Format: a hook ("Liberals and conservatives both think they're arguing about X. They're actually arguing about Y."), a 3-beat unpack on screen, the Argumend graph node for the crux, and a "see the full map" CTA.

- **Tools:** ElevenLabs narration (or founder's voice) → Submagic for captions + B-roll → Veed.io if a screen-record of the actual graph node is needed.
- **Production time:** 90-120 minutes from topic selection to upload.
- **Cadence:** Weekly, anchor format.
- **Platforms:** All four. X gets a thread version, YouTube Shorts gets the long form.
- **Hook formula:** "[Side A] says [claim]. [Side B] says [claim]. The actual disagreement is [crux]." This is exactly the structure Argumend's product is built around — the format and the product are isomorphic.

### (b) "Argument autopsy" — 90s

Take a viral take from the past week — a tweet, a podcast clip, an op-ed paragraph — and run it through Argumend's graph. Highlight fallacies, missing evidence, weak cruxes. The visual is the graph, animated. The voiceover is dry, almost forensic.

- **Tools:** Argumend's actual analyzer (live API with `ENABLE_LIVE_ANALYZE_API=true`) → screen-record at 9:16 → Veed.io for editing → Submagic for captions.
- **Production time:** 2-3 hours. The bottleneck is finding a take worth autopsying.
- **Cadence:** Bi-weekly, anti-cadence to "Crux of the week" so something ships every 7 days.
- **Platforms:** X first (where the original take usually lives), YouTube Shorts second.
- **Hook formula:** "[Person] said [thing] on [platform]. Here's what their argument actually looks like."

### (c) "Did you know this is a fallacy?" — 30s

Educational micro-content: pick one fallacy from the Argumend taxonomy, give it a name, show one example from the wild, show the corrected reasoning. This is the most evergreen archetype — every video lives indefinitely as a search result.

- **Tools:** Submagic only. Static visual + captions + a single B-roll moment.
- **Production time:** 30-45 minutes.
- **Cadence:** Buffer 8-10 in advance, drop weekly as filler when a "Crux" or "Autopsy" can't ship.
- **Platforms:** TikTok + Instagram Reels primary; YouTube Shorts secondary.
- **Hook formula:** "If someone tells you [bad reasoning], they just committed [fallacy name]." The named-thing-that-sounds-academic-but-isn't is the hook.

### (d) "Watch the AI map this" — 45s

Pure screen-record of Argumend extracting an argument live. No voiceover. Caption-driven. The visual delight is the graph appearing node by node.

- **Tools:** Argumend live analyzer → QuickTime / OBS screen capture at 1080×1920 → Submagic captions only.
- **Production time:** 30-45 minutes (most of it picking the right input).
- **Cadence:** Monthly. Risk of overuse — once people have seen the graph populate they won't be wowed twice.
- **Platforms:** X and LinkedIn primary (engineers and product people swipe slower than TikTok). YouTube Shorts secondary.
- **Hook formula:** "Ten seconds of AI extracting an argument" — caption-only opener, no voice. Lets the product carry the emotional beat.

### (e) "Two-host crossfire" — 60-90s

NotebookLM-style synthetic banter on a topic, but **opinionated** — one host pro, one host skeptic. Audio generated from PlayHT PlayDialog or NotebookLM Audio Overview, then animated with simple lower-thirds and the Argumend graph as visual backdrop.

- **Tools:** NotebookLM Audio Overview (free) or PlayHT PlayDialog (~$39/month) → Submagic for captions + lower-thirds → static graph or animated graph in background.
- **Production time:** 60-90 minutes.
- **Cadence:** Bi-weekly.
- **Platforms:** YouTube Shorts and Instagram Reels (audio-driven formats); weak on X.
- **Hook formula:** Cold-open with the disagreement. "I think AI risk is overrated." "I think you're a moron."  No setup. (Tone-down for brand if needed.)

### Format ranking for week-1 testing

The baseline weekly anchor should be **(a) Crux of the week** — it ships in 90 minutes, it's directly product-isomorphic, the hook formula is durable, and it's the format Kialo cannot match because Argumend's crux extraction is the differentiator. Run **(c) Did you know this is a fallacy** as bench depth for weeks where (a) can't be authored. Reserve **(d) Watch the AI map this** as the "this account is real" credibility short, posted once a month.

## 5. Visual Consistency Across Shorts — the 8-Asset Starter Library

Build once in Submagic Brand Kit, reuse forever. The eight assets:

1. **Title-card frame** — parchment background `#f4f1eb`, EB Garamond title in stone primary `#3d3a36`, deep teal `#3a6965` accent rule. This is the 0.5s hook frame.
2. **Lower-third name strip** — Plus Jakarta Sans, semi-transparent stone, deep-teal underline. Same one for every host or quoted source.
3. **Caption template** — Submagic "Karl" or a custom variant: EB Garamond italic for emphasis words, Plus Jakarta Sans for body, **rust `#C4613C` for crux highlights**, **crux crimson `#a23b3b`** for fallacy callouts. Word-by-word reveal at ~3 words/second.
4. **Intro stinger (0.8s)** — animated logo + "argumend.org" wordmark. Same every video, recognizable in muted feed.
5. **Outro CTA (1.5s)** — "see the full map → argumend.org/topics/[id]" with a static screenshot of the graph behind. Always the same structure, only the URL changes.
6. **Graph-overlay frame** — when overlaying the live React Flow graph, use a 4px parchment border + 16px corner radius so it reads as "a window into the product."
7. **Position-side chips** — pre-rendered "Proponent" (rust pill) and "Skeptic" (brown `#8B5A3C` pill) lower-thirds. Consistent across every Crux short.
8. **Evidence-confidence indicator** — the same deep-teal-to-brown gradient bar Argumend uses for confidence in the product, exported as a sticker.

These eight should fit on one page of a Figma file. The discipline is: **never invent a ninth asset** for a single video. Either the asset exists in the kit or it doesn't ship in the kit's color/typography. This is what creates the "I've seen these before" recognition that distinguishes a brand channel from a chaos channel.

CapCut templates would normally be the place to bind these together (font + color + transitions in one template file, per [Barchart's 2026 playbook](https://www.barchart.com/story/news/119048/how-to-create-a-capcut-template-in-2026-a-complete-creators-playbook)) — but given the CapCut ban and IP terms, **bind them in Submagic Brand Kit** instead. Submagic explicitly ships "one kit per client, consistent output without recreating styles" ([Submagic Brand Kit](https://www.submagic.co/features/auto-video-editor)).

## 6. Repurposing Pipeline — Long-Form NotebookLM Podcast → 10 Shorts

The compound flow looks like this:

1. **Source.** Pick a topic from Argumend's existing 109 pre-analyzed topics. Export the topic's positions/cruxes/evidence as a Markdown source document. (~5 minutes.)
2. **Generate the long-form audio.** Drop the Markdown into NotebookLM. Run **Audio Overview** to produce a 10-15 minute synthetic podcast with two AI hosts ([Recast guide](https://recast.studio/blog/how-to-create-notebook-lm-podcast)). NotebookLM's hosts are aggressively neutral — for Argumend you want one pro / one skeptic, which means you'll likely re-prompt NotebookLM with a "make Host A more skeptical of [position]" instruction or move to **PlayHT PlayDialog** for two opinionated voices ([SurePrompts comparison](https://sureprompts.com/blog/voice-generation-models-compared-2026)).
3. **Add a video track.** Use **Flowjin** or Recast Studio to convert the audio into a 9:16 video with waveform animations and the topic title — or just static graph imagery as a slow-pan. (~10 minutes.)
4. **Run the video through Opus Clip.** Paste the URL or upload the MP4. Opus returns 10-25 vertical clips with Virality Scores, animated captions, and auto-reframe ([Opus podcast guide](https://www.opus.pro/blog/how-to-edit-podcast-shorts-like-a-pro-using-opus-clip-pc-mac)). (~5 minutes of waiting.)
5. **Manually pick 3-5 clips.** Opus's Virality Score is genuinely useful as a first pass but tends to overfit on emotional valence and underweight the "actually interesting" axis. The founder still has to listen.
6. **Polish in Submagic.** Apply the Argumend Brand Kit. Replace Opus's caption style with Submagic's higher-quality captions. Add the intro stinger and outro CTA.
7. **Schedule.** Submagic's built-in publishing covers TikTok / Reels / Shorts / X / LinkedIn ([Submagic review](https://max-productive.ai/ai-tools/submagic/)).

**Total time per cycle:** ~2.5 hours of human time for ~5 publishable shorts. **Per-short marginal cost:** roughly 30 minutes. That is the ratio that makes weekly cadence sustainable.

**Caveat on automated clip selection:** Opus Clip's Virality Score is calibrated on broad consumer content. It will systematically rank "AI host raises voice" clips above "AI host states a non-obvious crux." The founder needs to re-rank manually for the first ~10 weeks and then can write down their own override heuristics.

## 7. Audio Strategy — Voice Cloning, Ethics, and the Argumend Voice Signature

**Voice cloning ethics for a founder using their own voice are clean** — Professional Voice Cloning of yourself is just text-to-speech with your timbre and prosody. ElevenLabs requires a verbal consent recording and a mid-length training set; both are appropriate friction. **What's not ethically clean** is cloning a public figure's voice for "Argument autopsy" videos. Don't do it. The cost of one viral takedown is much higher than the marginal engagement of "Tucker Carlson said this."

**Recommendation: One Argumend voice, cloned, used everywhere.** ElevenLabs Pro Voice Clone of the founder's actual voice. Tone target: **calm narrator with occasional bite**, not energetic explainer. The Argumend brand is stoic/parchment per CLAUDE.md — the voice should match. "Energetic explainer" is what every Hormozi-template short already sounds like; calm narrator is differentiated.

Across the 5 archetypes:

- **Crux of the week:** founder's cloned voice, narrator tone.
- **Argument autopsy:** founder's cloned voice, slightly drier (almost forensic).
- **Fallacy micro-content:** Submagic's text-only captions; no voice. (This makes them silent-friendly for Reels/TikTok in-feed.)
- **Watch the AI map this:** captions only, ambient music, no voice.
- **Two-host crossfire:** PlayHT PlayDialog with two voice presets — call them "the optimist" and "the skeptic" — kept consistent across episodes. ([PlayDialog](https://elevenlabs.io/blog/playht-alternatives))

**Voice signature documentation:** write a one-paragraph "Argumend voice spec" — calm, grammatical, no slang, no podcast-host upturns, willing to call something dumb. Pin it to the project README. Re-check every 4 weeks.

## 8. Realistic 12-Week Rollout

The compounding question for week 12 is: **which archetype is generating subscribers, not just views.** Views are vanity. Subscribers / saves / "what's argumend.org" replies are signal.

| Week | Format | Topic source | Tools | Goal |
|---|---|---|---|---|
| 1 | (a) Crux of the week | Existing top-traffic Argumend topic | ElevenLabs + Submagic | Set the brand kit. Ship something. |
| 2 | (a) Crux | Currently-viral debate | Same | Test "this week's argument" angle. |
| 3 | (c) Fallacy 30s | Strawman | Submagic only | Test silent-feed performance. |
| 4 | (a) Crux | Current event | Same | Compare week-1 vs week-4 retention curve. |
| 5 | (d) Watch the AI map | Live screen-record | Veed + Submagic | Test product-demo format. |
| 6 | (a) Crux | Reader-suggested | Same | First viewer-driven topic. |
| 7 | (c) Fallacy 30s | Appeal to authority | Submagic only | Bench depth. |
| 8 | (b) Argument autopsy | A viral X take | Live analyzer + Veed | Highest-risk, highest-upside week. |
| 9 | (a) Crux | Whatever's hot | Same | Steady. |
| 10 | (e) Two-host crossfire | A topic with strong sides | NotebookLM/PlayHT + Submagic | Test synthetic banter format. |
| 11 | (a) Crux | Pulled from week-10 comments | Same | First fully-loop-closed week. |
| 12 | Best-performing format | Decision point | Same | Replay the strongest of weeks 1-11. |

**Stop-conditions to watch:**

- If by week 6, no archetype has cleared 10K views on at least one platform, the problem is hooks/topics, not cadence — pause and audit titles/cold-opens before week 7.
- If by week 8, "Argument autopsy" generates a takedown reply from the original poster, that *is* the win. Pin it. Reply once, calmly. This is exactly the "smart fights live here" positioning the Kialo intel calls out.
- If Submagic's Brand Kit drift sets in (a temptation to tweak fonts week-to-week), enforce a four-week color/font lock.

**Posting cadence:** one short per week, posted Tuesday or Wednesday morning (high engagement window for cerebral content), cross-posted simultaneously to all four platforms. The founder writes the long-form companion blog post on Friday for SEO compounding — every short should have a `argumend.org/topics/[id]` URL it points to, and that URL should pre-exist.

**Single decision criterion at week 12:** which format produced the most newsletter signups + saved-topic interactions per view. The answer is probably (a) Crux of the week. Lock that as the weekly anchor and treat (c) and (d) as monthly support formats.

## Sources

- [Submagic — Captions vs Opus Pro comparison](https://www.submagic.co/vs/captions-ai-vs-opus-pro)
- [Submagic — Vizard vs Klap](https://www.submagic.co/vs/vizard-vs-klap)
- [Submagic — Submagic vs Opus Pro](https://www.submagic.co/vs/submagic-vs-opus-pro)
- [Submagic — Top 10 Opus Clip alternatives](https://www.submagic.co/alternatives/opus-clip)
- [Submagic Review 2026 (max-productive)](https://max-productive.ai/ai-tools/submagic/)
- [Submagic — Pricing](https://www.submagic.co/pricing)
- [Submagic — Auto Video Editor / Brand Kit](https://www.submagic.co/features/auto-video-editor)
- [Vizard — Pricing](https://vizard.ai/pricing)
- [Vizard — 9 Best AI Video Clipping Tools 2026](https://vizard.ai/blog/9-best-ai-video-clipping-tools-2026)
- [Klap — Vizard AI review](https://klap.app/blog/vizard-ai-review)
- [Eddie AI — Pricing](https://www.heyeddie.ai/pricing)
- [CineD — Eddie AI updates at NAB 2026](https://www.cined.com/eddie-ai-updates-released-visit-their-booth-at-nab-2026/)
- [VEED — VEED vs CapCut 2026](https://www.veed.io/learn/veed-vs-capcut)
- [HeyGen Avatar IV review (VidAI Lab)](https://vidailab.com/heygen-avatar-iv-review/)
- [Colossyan — HeyGen vs Synthesia 2026](https://landing.colossyan.com/posts/heygen-vs-synthesia/)
- [Argil — Performance marketer review 2026](https://www.argil.ai/blog/seedance-vs-arcads-vs-heygen-in-2026-a-performance-marketers-honest-review-tool-comparison)
- [TechBuzz — Captions rebrands as Mirage](https://www.techbuzz.ai/articles/captions-rebrands-as-mirage-pivots-from-creator-tools-to-ai-research)
- [WeShop — Hedra AI Review 2026](https://www.weshop.ai/blog/hedra-ai-review-2026-the-new-king-of-talking-heads-and-ai-avatars/)
- [Magic Hour — Hedra AI Character-3 guide](https://magichour.ai/blog/guide-to-hedra-ai)
- [SurePrompts — Voice Generation Models Compared 2026](https://sureprompts.com/blog/voice-generation-models-compared-2026)
- [ElevenLabs — PlayHT alternatives](https://elevenlabs.io/blog/playht-alternatives)
- [Mercury — Dwarkesh Patel founder lessons](https://mercury.com/blog/dwarkesh-patel-podcast-founder-lessons)
- [Dwarkesh Patel — YouTube shorts feed](https://www.youtube.com/@DwarkeshPatel/shorts)
- [Min Choi — X profile (@minchoi)](https://x.com/minchoi)
- [Bilawal Sidhu — LinkedIn](https://www.linkedin.com/in/bilawalsidhu/)
- [Press Gazette — TLDR News on Shorts](https://pressgazette.co.uk/social_media/tldr-news-jack-kelly-youtube/)
- [School of Motion — Vox storytelling with Estelle Caswell](https://www.schoolofmotion.com/blog/estelle-caswell-vox-podcast)
- [Klover — Vibe coding / Karpathy](https://www.klover.ai/vibe-coding-karpathy-viral-term-ng-reality-check-klover-first-mover-advantage/)
- [Wikipedia — Nicky Case](https://en.wikipedia.org/wiki/Nicky_Case)
- [Recast Studio — NotebookLM podcast guide 2026](https://recast.studio/blog/how-to-create-notebook-lm-podcast)
- [OpusClip — Podcast shorts editing guide](https://www.opus.pro/blog/how-to-edit-podcast-shorts-like-a-pro-using-opus-clip-pc-mac)
- [Barchart — CapCut Template playbook 2026](https://www.barchart.com/story/news/119048/how-to-create-a-capcut-template-in-2026-a-complete-creators-playbook)
- [80,000 Hours — YouTube Shorts feed](https://www.youtube.com/@eightythousandhours/shorts)
