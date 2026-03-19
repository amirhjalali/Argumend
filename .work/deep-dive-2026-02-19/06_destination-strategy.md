# Destination Strategy: Make Argumend Compelling + Entertaining + Deep

## Core Problem
Argumend currently excels at structure and rigor, but mainstream audiences discover ideas in low-friction, emotionally legible formats (short video, creator-led clips, social-native narratives) and only later opt into deeper exploration.

## Strategic Principle
Use a **format ladder**:
1. Discovery formats pull people in (quick, visual, emotionally clear).
2. Understanding formats build trust and insight (contextual summaries).
3. Mastery formats enable depth (interactive maps, debates, evidence layers).
4. Participation formats create return behavior (challenges, co-creation, discussion).

## Evidence Anchors (high-level)
- Podcast + video consumption continues rising in the U.S. (Edison Infinite Dial 2025).
- Digital news consumption is shifting toward social/video ecosystems (Reuters Digital News Report 2025).
- Narrative framing improves recall/comprehension vs expository framing in many contexts.
- Multimedia learning works best when cognitively disciplined; active learning interventions tend to outperform pure visual polish.
- News avoidance is high; solutions/constructive framing helps retain overwhelmed audiences when done credibly.

## Product Architecture: The Transposition Engine
Treat each topic as a structured content object (already true in your topic schema), then auto-render it into multiple output templates.

### Input Object (existing + small extensions)
- Meta claim
- Pillars
- Cruxes
- Evidence (weighted)
- Counterpositions
- Confidence + disagreement
- (add) value frames, audience persona tags, emotional stakes

### Output Templates
1. **Image/Carousel**
- 6-10 card social carousel: claim, strongest pro, strongest con, crux, key evidence split, where uncertainty remains.

2. **Short Video (30-90s)**
- Hook -> tension -> crux -> what would change minds -> CTA to full map.

3. **Long Video (6-12 min)**
- “Debate deconstruction” episode with argument-map animation and confidence ledger.

4. **Audio Microcast (3-8 min)**
- Daily “CruxCast”: one claim, one crux, one update in evidence.

5. **Video Podcast (20-40 min)**
- Two-host format: one side each, then forced steelman swap, then crux synthesis.

6. **Interactive Story (Scrollytelling)**
- Narrative path from certainty -> complication -> tradeoff -> decision.

7. **Playable Debate Recap**
- Users scrub round-by-round and see score shifts + argument quality overlays.

8. **Personalized Briefs**
- “Explain this topic to me like I’m [student/policy voter/engineer/parent].”

## Content Franchises (Recurring Shows)
1. **The Crux in 60 Seconds** (short vertical)
2. **Strongest Case Against Me** (creator steelman challenge)
3. **Confidence Changed This Week** (evidence updates + ledger)
4. **You’re Probably Wrong About…** (friendly myth + map)
5. **Dissensus Club** (high-quality unresolved disagreement episodes)

## UX for “Easy to Digest, Easy to Go Deep”
- Every format has a “depth handoff” button to the source map.
- Every deep page has a “quick recap” mode (30 sec / 2 min / 5 min).
- Add reading/listening/viewing mode switch in topic pages.
- Create a watch queue + continue-learning progress marker.

## Entertaining Without Losing Trust
- Use narrative tension, character, stakes, and surprise.
- Keep evidence provenance visible (small, persistent source chip).
- Distinguish facts vs values on-screen to prevent rhetorical blur.
- Use constructive framing: "what can be tested next" not only "who won".

## 12 Concrete Features to Build
1. Topic -> Carousel generator.
2. Topic -> Short-video script generator.
3. Topic -> Podcast outline generator.
4. Crux animation component.
5. Evidence split visual (for/against balance meter).
6. Confidence ledger timeline UI.
7. 30s/2m/5m summary presets.
8. Creator mode with branded export kit.
9. Episode pages linking back to source map nodes.
10. Weekly "confidence changed" digest.
11. Audience persona explainers.
12. Community challenge prompts (steelman/remix formats).

## Initial KPI Stack
- Discovery: impressions, 3s hold, completion rate, shares.
- Learning: recall quiz score, crux comprehension, misconception correction.
- Depth: click-through to map, time in deep view, return rate.
- Trust: source-click rate, challenge submissions, confidence-update acceptance.
- Bridge: reciprocal steelman pass rate, hostility reduction proxy, cross-viewpoint completion.

## 90-Day Rollout
### Days 1-30
- Ship 30s/2m/5m summaries + carousel generator + short video script templates.

### Days 31-60
- Launch CruxCast (audio + video simulcast) + confidence-change digest.

### Days 61-90
- Add interactive scrollytelling episodes + creator export mode + KPI dashboard.

## Why This Can Win
- Most products are either engaging-but-shallow or rigorous-but-cold.
- Argumend can own the hybrid: **high-trust, high-clarity, high-entertainment argument media**.

## Social Hook Operating System (Traffic Engine)

### Position
Social hook content should be the primary traffic engine, but always with a one-click depth handoff to Argumend maps.

### Hook Templates (repeatable)
1. **"You think X, but the real crux is Y."**
2. **"Two smart people disagree. Here is the one test that would settle it."**
3. **"This claim sounds obvious. Here is the strongest case against it."**
4. **"Confidence update: this topic moved from A% to B% this week."**
5. **"Can you pass the steelman challenge in 30 seconds?"**

### Short-Form Script Skeleton (30-60s)
- 0-2s: pattern break hook
- 3-10s: explain conflict in plain language
- 11-25s: reveal crux
- 26-40s: show strongest pro/con
- 41-55s: where uncertainty remains
- 56-60s: CTA -> exact topic node URL

### Weekly Cadence
- 5 shorts/week (hook-first)
- 2 carousels/week (saveable explainers)
- 1 long-form breakdown/week (6-12 min)
- 1 audio recap/week (CruxCast)

### Distribution Rule
- One master narrative asset per topic
- Platform-native adaptations (no exact repost)
- Track hook-level metrics and promote only top quartile formats

### Minimum CTA Standard
Every social post must include:
- "Go deeper" link to exact map node
- 30s/2m/5m summary chooser
- clear question prompt for comments (not a yes/no bait prompt)

### Launch Candidate Topics (fastest to spread)
- Moon landing (myth vs evidence)
- Nuclear energy safety
- AI risk timelines
- Social media & mental health
- Free will vs determinism
