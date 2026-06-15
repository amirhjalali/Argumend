# NotebookLM Content Pipeline for Argumend

*Research date: 2026-05-19. Scope: turn each of Argumend's 109+ argument-mapped topics into shareable audio + video content via Google NotebookLM.*

## TL;DR

- **NotebookLM Plus ($7.99/mo, bundled in Google AI Plus) is the right tier**: 20 Audio Overviews/day, 6 Video Overviews/day, 100 sources/notebook, Debate + Critique modes, custom prompts. Cinematic Video requires Ultra ($249/mo) — skip.[^pricing][^plus]
- **Default Audio Overviews go centrist-mush.** Debate format + a structured custom prompt naming the sides ("Skeptic" / "Proponent"), forcing steel-manning before rebuttal, and anchoring on Argumend's `crux` field is what produces non-generic output.[^debate][^custom]
- **Per episode: ~30 min human time, ~$0.15 compute**, plus flat $7.99/mo NotebookLM Plus + $4.85/mo RSS.com. One topic → 12–18 min audio + 2–5 min explainer video. One RSS feed fans out to Spotify/Apple/Amazon; video to YouTube + X + Substack.

## End-to-end workflow

Unit of work: **one topic → one episode bundle** (long audio + short video + thumbnail + show notes). All steps scriptable except NotebookLM generation, which is browser-only.

1. **Pick the topic.** Pull next from a queue (start with top-10 by `topic_views`) or tie to news. Each `data/topics/*.ts` already has `pillars[]`, `skeptic_premise`, `proponent_rebuttal`, `crux`, weighted `evidence[]`.

2. **Export to NotebookLM source bundle.** Add `scripts/export-for-notebooklm.ts` that writes to `out/notebooklm/<topic-id>/`:
   - `00-topic-overview.md` — title, meta_claim, status, one-paragraph episode brief.
   - `01-pillar-<n>.md` — one per pillar with H2 sections: Skeptic premise, Proponent rebuttal, Crux (title + description + methodology), Evidence with `sourceUrl`.
   - `02-glossary.md` — fallacies referenced + `cost_to_verify`.
   - `99-house-style.md` — the Sample Prompt (below), uploaded as a source so the prompt has a stable anchor.

   Markdown ingests cleaner than PDF/HTML. Keep to 5–12 files; quality degrades past ~20.

3. **Create the notebook.** notebooklm.google.com → New → "Argumend — <Title>" → upload bundle. Pin `00-topic-overview.md` and `99-house-style.md` as primary.

4. **Generate long-form audio (Debate mode).** Studio → Audio Overview → Format **Debate** → Length **Longer** → Customize → paste Sample Prompt. ~5–10 min generation; ~12–18 min WAV.[^audio][^export][^debate] If output goes mushy, tighten the "DO NOT" block and regenerate — that's the single biggest knob.[^custom]

5. **Generate short-form video.** Studio → Video Overview → Format **Explainer** → Style **Heritage** or **Editorial** (these read "thoughtful publication," not "TikTok").[^video][^visual] Custom-style prompt: *"Stoic parchment aesthetic. Deep teal #3a6965 for evidence, rust #C4613C for proponent, brown #8B5A3C for skeptic, crimson #a23b3b for crux. EB Garamond serif titles. No amber/tangerine."* Matches the CLAUDE.md design system — recognizable across the feed.

6. **Post-produce (~15 min, automatable).**
   - `ffmpeg -i in.wav -b:a 96k -ac 1 out.mp3`.
   - Prepend a 6-sec branded sting (commission once: serif wordmark + struck note). Append 10-sec CTA: *"Full argument map at argumend.org/topics/<slug>."* The sting is what makes Argumend recognizable in a feed of NotebookLM clones.
   - Cover art via existing `/api/og?topic=<slug>` at 3000×3000 (podcast) and 1280×720 (YouTube).

7. **Publish.**
   - **Audio** → MP3 to RSS host (RSS.com $4.85/mo). One feed → Spotify/Apple/Amazon/Pocket Casts/Overcast auto-fan-out.[^rss]
   - **Video** → YouTube (long + 60-sec Short cut from the crux), X (60-sec clip + crux thread + 3 evidence cards), Substack (YT embed + show notes auto-generated from `01-pillar-*.md`).

8. **Backlink + instrument.** Show notes link `argumend.org/topics/<slug>?utm_source=podcast&utm_campaign=<slug>`. Add to `data/episodes.ts` so topic pages render a "Listen" embed. Track in GA4 alongside `topic_views`.

## Sample prompt (paste into NotebookLM "Customize" on Audio Overview)

Save this verbatim as `99-house-style.md` *and* paste it into the Customize box — having it in both places sharply reduces drift.

```
You are producing an episode of ARGUMEND, a show that maps controversial
arguments. Two hosts: SKEPTIC (challenges the meta-claim) and PROPONENT
(defends it). They are colleagues who respect each other, not enemies.

STRUCTURE (follow exactly):
1. 30-sec cold open: state the meta-claim verbatim and why it is contested
   in 2026.
2. For each PILLAR in the sources, in order:
   a. SKEPTIC states the skeptic_premise in their own words, strongest
      version. PROPONENT must say "the strongest version of that is..."
      before any rebuttal.
   b. PROPONENT gives the proponent_rebuttal, strongest version. SKEPTIC
      must steel-man it back before countering.
   c. Both name the CRUX explicitly: "We disagree because we disagree
      about <crux.title>." Read crux.description. State what evidence
      would change each of their minds (crux.methodology).
   d. Cite 1-2 pieces of EVIDENCE from the sources by source name, not
      "a study said." Note the weight (reliability/independence).
3. Close: 60-sec recap of the 2-3 cruxes. No verdict. No "both sides have
   good points." Instead: "Here is what you would need to learn to move."

HARD RULES:
- DO NOT both-sides-mush. If the sources give one side stronger evidence
  on a sub-claim, say so.
- DO NOT invent evidence, statistics, or quotes. If it is not in the
  sources, do not say it.
- DO NOT use the words "fascinating," "absolutely," "at the end of the
  day," or "it's complicated."
- DO use the exact technical terms from the sources (e.g., "crux,"
  "steel-man," "fallacy of composition").
- Length: ~15 minutes. Pace: thoughtful, not breathless.

VOICE: SKEPTIC is dry, slightly British, cites sources by name.
PROPONENT is warmer, asks "what would change your mind?" twice per
pillar.
```

## Distribution plan

| Channel | Asset | Cadence | First-week target |
|---|---|---|---|
| Spotify / Apple / Amazon (one RSS) | 12–18 min MP3 | 2/week (Tue, Fri) | 100 listens/episode by week 4 |
| YouTube (long) | Video Overview + waveform | 2/week | 500 views/episode |
| YouTube Shorts / TikTok / Reels | 60-sec crux cut | 3/week (cherry-pick) | 1 short >10k views by week 6 |
| X/Twitter | 1 clip + crux thread + 3 evidence cards | per episode | 1 thread >50k impressions by week 4 |
| Substack | embedded YT + show notes (auto-generated) | 1 digest/week | 500 subs by week 8 |

**Cadence rationale:** 2 audio + 3 shorts per week ≈ 5 published items, within Plus tier daily caps (20 audio, 6 video) with full headroom for regeneration. At 109 topics, this is ~1 year of fresh content before any revisits.

**Cover art & titles.** Naming pattern: `Argumend #<n>: <Topic Title> — <Crux teaser>`. Example: `Argumend #07: Affirmative Action — does "merit" measure ability or accumulated advantage?` Cover art is the topic's OG image with the episode number in EB Garamond top-left. Same template every time = recognizable shelf-presence.

## Effort / cost

**Per episode (steady state):** 25–35 min human time (5 export, 10 QA, 10 thread+notes, 5 upload). Compute ~$0.15 (OG + optional LLM show-note rewrite).

**Monthly at 8 episodes/week:** NotebookLM Plus $7.99 + RSS.com $4.85 ≈ **$13/mo + ~16 hrs human time**. One-time: branded sting ($150–400), Spotify/Apple submission (free, ~1 day review).

This is the cheapest distribution lever Argumend has — audio sits inside Spotify/Apple search forever and backlinks topic pages for years.

## Open questions

1. **Voice consistency.** NotebookLM voices drift between generations. Worth A/B-testing whether to (a) accept drift, (b) re-record intros/outros with ElevenLabs in a fixed voice, or (c) wait for NotebookLM's rumored custom-voice feature.
2. **Licensing.** Google's ToS permits commercial use of generated audio, but the *voices* are Google's. If Argumend grows ad-supported revenue, revisit whether to migrate to ElevenLabs-cloned hosts for IP control.
3. **Live updates.** When a topic changes (new SCOTUS ruling, new study), do we re-publish episodes or release a "v2" addendum? Suggest: addenda for material changes; full re-record only on `status` change in the topic schema.
4. **Discoverability vs. depth.** 12–18 min is the depth sweet spot but the discovery sweet spot is 3–6 min. Consider always producing both (Brief + Debate) from the same notebook — Plus tier limits allow it.
5. **Attribution back to the site.** Need to validate whether GA4 actually captures the UTM'd Substack→site flow, or whether a dedicated `?ref=podcast` short-link service (e.g., Dub.co) gives cleaner data.

---

### Sources

- [NotebookLM Pricing 2026: Free vs Plus vs Pro vs Ultra (felloai)](https://felloai.com/notebooklm-pricing/) [^pricing]
- [Upgrade NotebookLM — Google Support](https://support.google.com/notebooklm/answer/16213268?hl=en) [^plus]
- [Generate Audio Overview in NotebookLM — Google Support](https://support.google.com/notebooklm/answer/16212820?hl=en) [^audio]
- [Google NotebookLM's AI podcast hosts can now get into an argument over your notes — TechRadar](https://www.techradar.com/ai-platforms-assistants/gemini/google-notebooklms-ai-podcast-hosts-can-now-get-into-an-argument-over-your-notes) [^debate]
- [NotebookLM's best feature got much better when I stopped using the default prompt — MakeUseOf](https://www.makeuseof.com/notebooklm-audio-overviews-better-custom-prompt/) [^custom]
- [Generate Video Overviews in NotebookLM — Google Support](https://support.google.com/notebooklm/answer/16454555?hl=en) [^video]
- [NotebookLM Cinematic Video Overview: Full Guide (2026) — Build Fast With AI](https://www.buildfastwithai.com/blogs/notebooklm-cinematic-video-overview-full-guide-2026) [^visual]
- [Export from NotebookLM: Complete Guide — Explore AI Together](https://exploreaitogether.com/export-download-notebooklm-guide/) [^export]
- [How to Add Your Podcast RSS Feed to Spotify (2026) — RSS.com](https://rss.com/blog/how-to-upload-a-podcast-to-spotify/) [^rss]
- [100 Best Podcasts Created by NotebookLM — Feedspot](https://podcast.feedspot.com/notebooklm_podcasts/) — creator examples (Jamin AI, AI Brief, This Podcast is Not Real, Urban Odyssey)

