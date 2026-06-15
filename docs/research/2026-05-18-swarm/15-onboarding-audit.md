# Cold-Visitor Onboarding Audit — Argumend

**Date:** 2026-05-18
**Scope:** First visit from a Twitter link to `argumend.org`, traced through code in `app/page.tsx`, `components/HomeClient.tsx`, `components/FeaturedTopicHero.tsx`, `components/TopBar.tsx`, `hooks/useLogicGraph.ts`, `components/TopicIntroPanel.tsx`, `components/HeroAnalyze.tsx`.

---

## TL;DR

- **The hero is now a static doc, not a product demo.** A cold visitor lands on a text-heavy "Featured Analysis" page about gun control with a confidence bar, a crux, and two evidence cards — but the **interactive graph (the thing that makes Argumend distinctive) is one click away and never previewed**. The product looks like a long-form blog until the visitor commits a click.
- **There is no aha moment on the landing screen.** The aha — "oh, this is a *map* of an argument, and I can poke at it" — only fires after the visitor (a) clicks the CTA, (b) waits for the React Flow canvas to mount, (c) discovers that nodes have an "Explore" button, (d) clicks Explore, and (e) realizes children appeared and the camera moved. That's 3–4 steps of trust extension before payoff.
- **The featured topic is gun control.** A polarizing US-specific issue is a bold first impression — half the audience arrives pre-skeptical of the framing before they've evaluated the *tool*. A neutral or curiosity-driven topic (moon landing, which is already the in-store default, or "Was the Roman Empire actually in decline in 200 AD?") would let the tool be judged on its merits.

---

## Cold-visitor journey, step by step

### Step 0 — The click (Twitter → argumend.org)
- **Sees:** Twitter card. `og:image` is the default site image (no per-topic OG since this is the root). Title: "ARGUMEND — Map Arguments, Not Win Them". Description: "Visual argument mapping for controversial topics. See both sides..."
- **Thinks:** "Sounds like another debate-bro thing or a Kialo clone. I'll give it 5 seconds."
- **Friction:** Tagline doesn't promise a *visual* experience strongly enough — "map" reads as metaphor.

### Step 1 — Page paint (0–800ms)
- **Sees:** `TopBar` (ARGUMEND wordmark + "Disagree better." subtitle, menu, View Toggle, Analyze, How it works, Search, Contribute, theme, user menu — 9 affordances in the chrome). Below: large serif `Featured Analysis` eyebrow, then **"Are gun control policies effective at reducing gun violence?"** as h1. Confidence bar partially rendered (summary loads sync; full topic via dynamic `import("@/data/topics")`).
- **Thinks:** Two reactions split here. The intellectually curious go "interesting, a structured take." The politically primed go "ugh, gun control, I know which side this site is on" — *before* they've seen the analysis is bi-directional.
- **Friction:** Featured topic is editorially charged. The h1 itself is what gets read; everything below is conditional on the visitor staying.

### Step 2 — Confidence + crux + evidence (1–3s, after dynamic import resolves)
- **Sees:** 56% confidence bar (or whatever `gun-control-effectiveness.confidence_score` is), `meta_claim`, a crimson "The Crux" card, two side-by-side "Strongest For / Strongest Against" cards with weight scores out of 40.
- **Thinks:** "Oh — they actually scored both sides. That's not nothing." This is the **closest thing to an aha moment on this screen**, but it's static text — it doesn't *do* anything.
- **Friction:** Nothing on this page is interactive except the rust-colored "See the full analysis" button. The visitor has no idea that clicking it leads to a *graph*, not another long article. The button label sounds like "read more."

### Step 3 — Scroll past hero
- **Sees:** "109 topics analyzed" grid (6 topic cards with confidence % chips), "Browse all topics" link, then `HeroAnalyze` ("Have your own argument? Paste any text and we'll map it") with a textarea, then Footer.
- **Thinks:** "OK so it's a library of pre-analyzed topics plus a text analyzer. Like a fact-check site." The visitor still has not seen *any* visual graph, motion, node, or edge.
- **Drop-off risk:** **High.** A non-trivial fraction bounce here, having only seen text, a progress bar, and form fields. They never learn the product is a graph.

### Step 4 — Click "See the full analysis"
- **Sees:** `setShowHero(false)` flips, React Flow mounts, a single MetaNode appears at center, `TopicIntroPanel` springs in from the top-right with the topic title, confidence chip, and an "Explore the Map" button. Pan/zoom controls active. MapLegend top-right, ZoomIndicator, NavigationPath, MiniMap bottom-right.
- **Thinks:** "Oh — a *node*. Just one. What now?" The visitor sees a single rounded card on a dotted background. Until they read RichNode's "Explore" button they don't know expansion is the mechanic.
- **Friction:** The empty-canvas state is the single weakest moment. Per `loadInitialTopic` and `setTopic`, the graph starts with **only the root node**. The pillars don't autoload. A first-time visitor cannot tell whether they're looking at a finished visualization (it looks sparse) or a starting state (no instruction says so).

### Step 5 — Find and click "Explore"
- **Sees:** The MetaNode's "Explore" button (from `RichNode.tsx:153`) spawns child pillars; camera fitView animates to them via `focusTargets` → `consumeFocusTargets`.
- **Thinks:** **AHA.** "Oh — it grew. I can drill in." This is the real moment of comprehension.
- **Friction:** Required 4–5 clicks/scrolls of trust before reaching it. Many visitors won't get here.

### Step 6 — Explore further
- **Sees:** Pillars expand, evidence loads via `loadEvidence`, crux modals open. The MobileArgumentList kicks in on mobile (different mental model entirely).
- **Thinks:** "This is actually well-thought-out." Engagement begins.

---

## Drop-off analysis

| Step | Probable drop-off | Why |
|------|-------------------|-----|
| 0→1  | Low–med | Generic tagline + summary card don't promise a visual experience |
| 1→2  | **High** if politically-charged-topic-averse | Gun control filter |
| 2→3  | Medium | Static content with one CTA; some bounce assuming it's a blog |
| 3→4  | **Highest** | Topic-grid scrollers may take a topic-card path instead of the hero CTA — same destination, but they never preview the analysis. Others bounce having seen no interactivity. |
| 4→5  | Medium–high | Single-node empty state with no autoplay. "Explore" button is one of *many* affordances (TopicIntroPanel button, MapLegend, MiniMap, sidebar, etc.) |
| 5→6  | Low | Once one expansion happens, exploration is self-reinforcing |

Two structural drop-off causes:

1. **The hero never demos the product.** Argumend's selling point is the interactive map. The current hero is a static argument analysis. A new visitor literally cannot distinguish Argumend from a static fact-check site without clicking through.
2. **The first canvas state is one bare node.** The graph should at minimum auto-expand the root to show pillars on first paint, ideally with a guided 2–3-second motion sequence (root → pillars → crux glow).

---

## "Aha moment" assessment

**Does an aha moment exist on first visit?** Yes, but it is *gated behind the click that most visitors won't make*. The aha is: "I can click a node and it grows into a debate tree, and the camera follows me." That requires reaching Step 5.

**Where it currently fires:** ~5 interactions deep.
**Where it should fire:** Above the fold, within 3 seconds, without any clicks.

The `FeaturedTopicHero` is well-crafted as a *summary*, but it competes with the graph instead of leading to it. The evidence cards, confidence bar, and crux are downstream artifacts of the analysis — showing them up front is showing the *output*, not the *mechanism*. Cold visitors need to see the mechanism.

---

## Punch list — ranked by leverage / effort

### P1 — Replace static hero with a live, auto-playing mini-canvas
**Change:** Above `FeaturedTopicHero`, render a constrained React Flow viewport (200–280px tall, no controls, `nodesDraggable={false}`) that auto-expands root → pillars → one evidence node over ~2.5s on mount. Loop or freeze at end. Below it, single line: "Click any node to dig in →".
**Why:** Moves the aha moment to t=0–3s with zero clicks. Demonstrates that this *is* a graph product, not a blog.
**Effort:** Medium (1 day). Reuse `RichNode`/`MetaNode`, run scripted `expandNode` calls in `useEffect`. The expansion plumbing already exists.
**Expected lift:** Largest single conversion lever. Plausibly 2–3× on "clicked to expand a node."

### P2 — Change featured topic to something neutral / curiosity-driven
**Change:** In `data/topicIndex.ts`, swap `featuredTopicId` from `"gun-control-effectiveness"` to `"moon-landing"` (which is already the in-store default) or rotate weekly through low-polarization picks (Roman decline, did Shakespeare write Shakespeare, was the dress blue/gold, etc.).
**Why:** Lets the tool be evaluated on craft, not tribe. Gun control is the worst possible first impression for a "we're neutral" framing. Also: curiosity topics generate "huh, interesting" engagement; political topics generate "yes, finally / no, biased" reactions.
**Effort:** Trivial (1 line + featuredReason copy).
**Expected lift:** Cuts the political-prime drop-off at Step 2.

### P3 — Auto-expand the root pillars when the canvas first mounts
**Change:** In `loadInitialTopic` / `setTopic` in `useLogicGraph.ts`, after setting the root node, immediately `expandNode("root")` so the visitor lands on pillars, not on a lonely card.
**Why:** Eliminates the empty-canvas dead zone at Step 4. New visitors should never see a one-node graph.
**Effort:** Trivial (one extra call + fitView padding adjustment).
**Expected lift:** Reduces "what is this" bounce at the canvas state.

### P4 — Make the hero CTA promise the interaction, not the content
**Change:** Replace "See the full analysis" with **"Open the map →"** or **"Explore as a graph →"**. Add a 60×40 SVG preview of node+edges next to the button so the affordance is visual, not just verbal.
**Why:** Current copy reads as "read more." New copy advertises the medium.
**Effort:** Trivial.
**Expected lift:** Modest but compounds with P1.

### P5 — Reduce TopBar density on first visit
**Change:** On the hero view (`showHero === true`), hide Contribute, Theme, UserMenu, How it works behind a single "More" menu. Keep wordmark, Analyze, Search, menu.
**Why:** Nine top-bar affordances dilute attention. A cold visitor needs to look at the hero, not the chrome. Returning users can pin the full bar.
**Effort:** Small (conditional render in `TopBar` based on `showBackToHero`).
**Expected lift:** Marginal but improves visual focus and mobile fit.

### P6 — Add a 6-second "what is this?" loop on the empty canvas
**Change:** When the canvas first mounts (whether from hero CTA or topic card), overlay a small, dismissible coachmark sequence: "1. Each node is a claim → 2. Click Explore to grow it → 3. Find the crux that decides it." Auto-advance, auto-dismiss after first node expansion. `TopicIntroPanel` is close to this but is content-summary, not mechanic-tutorial.
**Why:** Closes the comprehension gap at Step 4–5. Currently mechanics are discovered, not taught.
**Effort:** Medium (new `OnboardingCoach` component, single `useEffect` trigger).
**Expected lift:** Meaningful for the cohort that does click through but doesn't find the Explore button.

### P7 — Surface a "2-minute tour" pill in the hero
**Change:** Below the CTA: a small ghost link "or watch a 90-second tour" → opens a modal with a screen-recording GIF/MP4 of someone exploring a topic (already exists per repo "visual proof" commit). Use existing asset.
**Why:** For low-trust visitors who won't click through cold, video is a lower-commitment way to grok the product. Twitter-arriving traffic especially loves video.
**Effort:** Small if asset exists; medium otherwise.
**Expected lift:** Catches a slice of bouncers.

### P8 — Add a single line of social/credibility proof in the hero
**Change:** Beneath the title or under the CTA, add a small attribution row: "109 topics · synthesized from peer-reviewed sources · open source on GitHub". Currently the "109 topics analyzed" sits *below* the fold inside the grid section.
**Why:** Cold visitors need a "why should I trust this" anchor within 2 seconds. The number 109 is meaningful and earns time.
**Effort:** Trivial.
**Expected lift:** Small but cumulative; especially helps the "is this AI slop?" skeptic.

---

## Open questions

1. **Is the goal "engaged 2+ minutes" measured by analytics today?** If not, instrument it first — pageview → first node expansion → second node expansion → view switch (`logic-map` → `scales` / `debate`) → time on canvas. Without a baseline, the lift estimates above are educated guesses.
2. **What's the actual Twitter-arrival CTR vs. direct-arrival behavior?** The audit assumes a low-trust 5-second-attention visitor. If actual referrers are mostly Hacker News / direct, the bar may be lower and a heavier hero acceptable.
3. **Mobile vs. desktop split?** `MobileArgumentList` is a different product on mobile — no canvas, no graph. The aha moment described above does not exist on mobile. If a majority of Twitter traffic is mobile, the hero is what mobile users see *as the product*, which raises the stakes on P1/P2/P4.
4. **Why is gun control the featured topic right now?** Editorial choice, A/B test, or oversight? If deliberate, the hypothesis (e.g., "polarizing topics increase share rate") should be measured against drop-off cost.
5. **Should the hero auto-rotate featured topic by referrer?** Twitter → curiosity topic; LessWrong/HN → epistemics topic; direct → in-news topic. Low effort if categories exist.
6. **Is there a "guest save" / "remember this graph" cookie?** A cold visitor who expands 8 nodes, leaves, comes back the next day, and finds an empty canvas has churned. Persisting expansion state in localStorage would compound P1/P3.

---

**Bottom line:** The single highest-leverage change is making the homepage *show the graph in motion*, not describe it. Everything else is secondary to that.
