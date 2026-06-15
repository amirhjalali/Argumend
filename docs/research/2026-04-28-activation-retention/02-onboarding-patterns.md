# Onboarding Patterns for Cerebral SaaS — and the Right Model for Argumend

**Date:** 2026-04-28
**Analyst:** Research agent 02/10, activation-retention swarm
**Scope:** What landing → first-value looks like at Linear, Notion, Cursor, Roam, Manifold, Metaculus, Substack, Are.na, LessWrong, Asterisk — and what Argumend's wedge audience actually wants instead.

---

## 1. Onboarding Pattern Taxonomy

The SaaS onboarding canon converged in the late 2010s around a small set of named patterns. The current state of the art (Userpilot, Userlist, Reforge) is best described as a *menu of seven options* that products mix-and-match, not a single recipe ([Userpilot — onboarding UX patterns](https://userpilot.medium.com/onboarding-ux-patterns-and-best-practices-in-saas-c46bcc7d562f), [Userlist — Ultimate Guide to SaaS User Onboarding](https://userlist.com/blog/saas-user-onboarding/)).

| Pattern | What it is | Best for | Failure mode |
|---|---|---|---|
| **(a) Zero onboarding / immediate-product** | User lands on the working product. No tour, no popups, no signup. The product *is* the marketing site. | Browse-first products with strong content (Manifold, Substack, Are.na), or products whose core action is legible in one glance. | Users who don't know what they're looking at bounce in <10s. |
| **(b) Sample data / dummy account** | Pre-populated demo workspace so the empty state is never empty. | Tools whose value comes from accumulated state (Linear, Notion, Cursor with sample repo). | Demo data feels canned; users don't transfer learning to their own data. |
| **(c) Interactive product tour** | Coachmarks, step-through tooltips, sometimes a "spotlight" overlay. Userflow, Appcues, Chameleon, Pendo, Userpilot. | Complex products where the UI is non-obvious. | "Tours beyond five steps see sharp drop-offs" and most launcher-driven tours top out at ~67% completion ([Chameleon — Hidden Metrics of Effective Product Tours](https://www.chameleon.io/blog/effective-product-tour-metrics)). Fatigue, dismissal, NPS hit. |
| **(d) Sign-up gate** | Email/OAuth required before any value. | Products with usage costs (live AI), or products where the user *is* the value (social, marketplace). | Hard bounce — "B2B HR SaaS conversion went 2.1% → 3.8% (+81%) by removing a gated demo form" ([Walnut — Interactive Demos & B2B Conversion](https://www.walnut.io/blog/product-demos/interactive-demos-conversion-rates-b2b-2026-data/)). |
| **(e) Progressive disclosure** | Reveal complexity only on demand. Start with one feature; advanced surfaces show up after the first action. | Cerebral or feature-dense products where the full UI scares novices ([Userpilot — Progressive Disclosure Examples](https://userpilot.com/blog/progressive-disclosure-examples/)). | Power users feel hand-held; discoverability suffers if disclosure triggers are buried. |
| **(f) Feature checklist** | "5 things to do to get started" in a persistent panel. Linear and Notion are the canonical examples. | Products with a clear activation event (first issue resolved, first page created). | Reads as homework. Reforge notes the 12-step horror and recommends collapsing to 2 ([Reforge — Onboarding Lab](https://www.growthmates.news/p/onboarding-lab-how-superhuman-and)). |
| **(g) Demo-as-onboarding video** | Auto-play 30–90s video on the homepage, sometimes muted/silent. | Products whose "what is this?" is hard to verbalize. | Production cost, video fatigue, cannot be skipped fast on slow networks. |

The dominant Reforge thesis (Brian Balfour, Casey Winters) is that **onboarding is not a stage, it's the entire path from landing to habit** ([Reforge — Product-Led Growth tactics for retention](https://www.reforge.com/guides/product-led-growth-tactics-for-retention-and-engagement)). The "ideal onboarding happens when the user explores the product naturally at their own pace without obstructions" ([Userpilot](https://userpilot.medium.com/onboarding-ux-patterns-and-best-practices-in-saas-c46bcc7d562f)). For cerebral audiences this is doctrine, not a preference.

---

## 2. Case Studies — Adjacent Cerebral Products

### Linear — pattern (b) + (f), gracefully done
Linear is *the* reference for "anti-onboarding that drives adoption." After Google OAuth and workspace creation, the user drops into a workspace **pre-populated with sample issues that model the ideal state**, then a small task-driven checklist exposes the issue lifecycle through *action* not explanation. The Cmd+K command menu is introduced *before* the user has any content, framing it as the central navigation pattern, not a tip ([Candu — Linear Onboarding Teardown](https://www.candu.ai/blog/linear-onboarding-teardown), [Page Flows — Linear desktop onboarding](https://pageflows.com/post/desktop-web/onboarding/linear/)). First-value (resolved issue) happens within the first session. No tour bubbles.

### Notion — pattern (b) + (f) with template fork
Notion's classic onboarding was a "Getting Started" page that *was* a checklist, where each item was a Notion action — type `/`, drag a block, embed an image. Learn-by-doing, not learn-by-reading ([Appcues — Notion's lightweight onboarding](https://goodux.appcues.com/blog/notions-lightweight-onboarding)). The 2022+ flow personalizes by asking what the user wants (work, school, personal) and offering 5 templates; clicking duplicates the template into the workspace as the user's *first real page*. The first action and the activation event are the same event.

### Cursor — pattern (d) → (b)
Cursor requires sign-up (email or Google) but the activation event is a `Tab`-key autocomplete in the user's *own* repo within ~30 seconds of opening the app ([Codecademy — How to use Cursor](https://www.codecademy.com/article/how-to-use-cursor-ai-a-complete-guide-with-practical-examples), [Cursor — Features](https://cursor.com/features)). The "sample" is the user's existing codebase, summarised on demand via commands like `/onboard` ([RobotPaper](https://robotpaper.ai/using-cursor-commands-to-onboard-a-new-developer-to-a-repository/)). Signup gate is justified by per-completion API cost.

### Roam Research — pattern (a) done badly
Roam is the cautionary tale. A new account drops the user into an *empty* graph with idiosyncratic syntax (`[[backlinks]]`, `((block-refs))`) and zero scaffolding. Reviews consistently call it "intimidating" and "steep" — users are advised to "spend a week or two exploring tutorials and experimenting before feeling comfortable" ([Ness Labs — Roam Research beginner's guide](https://nesslabs.com/roam-research-beginner-guide), [Product Hunt — Roam reviews](https://www.producthunt.com/products/roam-research/reviews)). Roam's churn is widely attributed to the empty-graph cold start; Logseq, Obsidian, and Tana all positioned themselves explicitly against this. The lesson: zero onboarding only works if the *empty state itself* is intelligible. Roam's wasn't.

### Manifold — pattern (a)
Manifold is the gold-standard for our wedge audience. **The homepage is the product**: live markets, prices, charts. No signup to browse, search, or read comments. Signup (Google/Apple OAuth, "less than a minute") is gated only to *trade*, and even then you start with M1000 in free play money ([Manifold FAQ](https://docs.manifold.markets/faq), [homepage](https://manifold.markets/)). The activation event is your first trade; the funnel before it is pure browse.

### Metaculus — pattern (a) graduated to (d)
Metaculus is **read-free, predict-gated**. Anyone can browse questions, see community forecasts, read resolutions. Submitting a probability requires an account (~30s) ([Metaculus FAQ](https://www.metaculus.com/faq/)). Onboarding ends here; the calibration learning curve is left to the user — Metaculus does not run a tour. This works because the read-first surface is dense enough that committed users self-select into signing up.

### Substack — pattern (a) with email-soft-gate
Substack readers can read every public post on the open web with **no signup**. The only ask is email subscription — a soft gate at the bottom of every post. For writers, signup is required; for readers (the 90%+), onboarding is "click a link, read." Substack's algorithmic recommendations only kick in *after* the first subscription ([Substack — guide to metrics](https://support.substack.com/hc/en-us/articles/5320347155860-A-guide-to-Substack-metrics)).

### Are.na — pattern (d) light
Are.na requires a free Guest account before any contribution and **before viewing some channels**, but the homepage and many public channels are visible without login ([Are.na — sign up](https://www.are.na/sign_up), [Adobe — How to use Are.na](https://www.adobe.com/express/learn/blog/how-use-arena)). First action is "create your first Channel," prompted on signup. Are.na is a useful counter-example: a cerebral audience tolerates a soft gate when the brand promise (anti-algorithmic, slow web) carries the friction.

### LessWrong — pattern (a)
The full Sequences, every post, every comment thread is open to the anonymous web. Account creation (~30 seconds) is required only to vote, comment, or post ([LessWrong FAQ](https://www.lesswrong.com/posts/2rWKkWuPrgTMpLRbp/lesswrong-faq), [New User's Guide to LessWrong](https://www.lesswrong.com/posts/LbbrnRvc9QwjJeics/new-user-s-guide-to-lesswrong)). New users are invited (not forced) to introduce themselves in an Open Thread. There is no tour, no checklist, no popup. The site assumes you can read.

### Asterisk Magazine — pattern (a) + email soft-gate
Asterisk is structured as a quarterly journal: every article on `asteriskmag.com` is free to read, and the only ask is a mailing-list signup or print subscription ([Asterisk — About](https://asteriskmag.com/about)). Same logic as Substack: capture email at end-of-article, never block the read.

**The pattern is hard to miss.** Every product the rationalist-adjacent reader actually uses — Manifold, Metaculus, LessWrong, Substack, Asterisk — sits in the (a) bucket with optional (e). The two on this list with hard signup gates (Cursor, Are.na) earn it via cost or brand. Roam (and arguably Notion's older flows) are the products this audience *complains* about.

---

## 3. Argumend's Current State — First 30 Seconds Audit

Reading `components/HomeClient.tsx` and `app/layout.tsx` as of 2026-04-28 (commits `29a3701`, `2d5e396`, `641403d`):

- Anonymous user lands on `/`. Sees `TopBar` + `FeaturedTopicHero` (a single curated topic with score, crux, evidence inline) + a 6-card topic grid + the demoted `HeroAnalyze` CTA + `Footer`. No modal, no popup, no signup. Confirmed.
- Clicking a topic card calls `handleTopicSelect` which loads the React Flow canvas. The legend, zoom indicator, navigation path, and topic intro panel all render. Still no modal, no signup.
- The `OnboardingOverlay` and `QuickStartBanner` components were deleted in `2d5e396` (2026-04-27). No replacement was added.
- Live analyze is gated behind `ENABLE_LIVE_ANALYZE_API`; the offline path runs by default with no auth. Per `CLAUDE.md`, "no API keys or database needed for local dev — the app runs offline."

**Effectively, Argumend is already pattern (a) — zero onboarding, browse-first.** The first-30-seconds experience is: read a hero, optionally click into a topic, see a graph. The graph is the single thing a first-time user does not understand without explanation. Everything else is legible.

The current flow is closer to Manifold/Metaculus/LessWrong than to Linear/Notion/Roam. It's already the right archetype. The question is whether *one specific micro-affordance* is missing.

---

## 4. Onboarding Archetype Recommendation

**Recommend: pattern (a) zero-onboarding + pattern (e) progressive disclosure, with a single one-line canvas overlay on first visit.**

Justification:
1. **Audience match.** ACX/LessWrong/rationalist-adjacent readers are the most signup-allergic demographic on the open web. They evaluate products by *reading the product*, not by completing a tour. Forcing a checklist on this audience is not just suboptimal — it's a brand violation. Cycle 2 file 10 (`acx-rationalsphere`) and cycle 3 distribution research file 04 (`acx-substack-funnel`) both reinforce that this audience expects the Substack/LessWrong norm of read-free, signup-only-to-contribute.
2. **Product match.** Argumend's value (analyzed argument graphs) is *content-shaped*, not workflow-shaped. There is no equivalent of Linear's "first resolved issue" or Notion's "first page created" — the user is consuming, not producing. That puts Argumend in the Manifold/Substack/Asterisk family, not the Linear/Notion family.
3. **Cost match.** The 109 pre-analyzed topics in `data/topics/` are the moat. They render with zero AI cost. There is no per-view economic reason to gate browse. Live analyze is already feature-flagged and off by default — that's where signup belongs, not at the front door.
4. **Counter-Roam.** The Roam failure is an unintelligible empty state. Argumend's homepage is *not* an empty state — it's a curated featured topic plus a grid. The cold start is solved without any onboarding scaffolding.

The right archetype is therefore: **the product is the marketing**. Land → read → click a topic → see a graph. No friction added.

---

## 5. The "Explain the Canvas" Problem — Was Removing the Overlay Right?

The argument graph is the one place a first-time user can plausibly be confused. React Flow with custom node types (RichNode, EvidenceNode, MetaNode), color-coded variants (deep teal, rust, brown, crux crimson), edge weights, and a minimap is genuinely unfamiliar. Cycle 2 file 09 (`information-design.md`) explicitly recommends a "how to read this" affordance over semantic-zoom canvases — the literature (Shneiderman's "overview first, zoom and filter, details on demand") agrees that dense visualizations need a key, not necessarily a tour ([Microsoft Learn — Semantic Zoom](https://learn.microsoft.com/en-us/windows/apps/design/controls/semantic-zoom)).

**Was deleting `OnboardingOverlay` the right call?**

Counter-argument for keeping it: Argumend has no analytics yet. Removing the overlay without measuring its dismiss-rate, engagement-after-dismiss, or first-session retention is flying blind. If 60% of first-time visitors bounced before clicking a node, the overlay was load-bearing.

Counter-counter-argument (the one I believe): the deleted overlay was a **modal popup**, not a passive map legend. The MapLegend component (referenced in `HomeClient.tsx`) is already the right pattern — a persistent, ignorable, glanceable key. A modal that interrupts the "click a topic, see the graph" flow with explanatory text *is* the pattern this audience rejects. Removing it was correct in *kind* but the replacement should not be "nothing" — it should be a passive scaffold.

**Verdict: removal was directionally right; the gap is a non-modal, single-line, dismissable hint on the canvas the very first time it loads.**

---

## 6. Concrete Onboarding Spec for Argumend

This is what onboarding should look like in 2026-Q2:

1. **Pure browse-first homepage.** No signup wall, ever, on `/`, `/topics/*`, `/blog/*`, `/guides/*`, `/explore/*`. Already true. *Maintain it.*
2. **First-time-visitor "how to read this" overlay on first canvas view.** A single-line strip at the top of the React Flow canvas, anchored above the MapLegend. Text: *"Each node is a position, evidence, or crux. Drag to pan, scroll to zoom. Click a crux to see what's actually disputed."* Auto-dismisses on first node click; persists `argumend_canvas_seen=1` to localStorage. **Engineering effort: ~1 day** (one component, one localStorage flag, one CSS animation). No library, no dependency.
3. **Optional 60s "watch this argument get mapped" auto-play hero video.** Per cycle 2 file 07 (`ai-video-generation.md`), a silent, captioned, looping 30–60s video showing a topic getting analyzed in real time would carry more "what is this?" payload than the current static hero. Place it *above* the FeaturedTopicHero on first visit, collapse to a smaller embed on return visits. **Engineering effort: ~3 days + video production.** Make this an A/B candidate, not a default ship.
4. **Email capture only on share/save.** When a user clicks "save this topic" or "share this analysis," surface an email-capture modal with the soft pitch ("we'll email you when this topic is updated"). Nowhere else. This is the Substack/Asterisk pattern.
5. **No tour. No checklist. No popups.** Explicitly forbid the Pendo/Appcues/Chameleon coachmark layer. It will tank trust with the rationalist audience.
6. **Live-analyze is the only place to gate.** When a user types a custom topic into HeroAnalyze and `ENABLE_LIVE_ANALYZE_API=true`, *that* request requires email or rate-limits to 1/IP/day. This is cost-justified, not pattern-violating.

This spec is intentionally lighter than what every onboarding-tool vendor will pitch. That's the point.

---

## 7. Counter-Pattern: When to Add Friction

Friction is not always evil. The decision tree:

- **Add friction (signup gate or rate limit) when** the action has marginal cost to you (per-token AI cost, per-minute compute), or when the action's value depends on the user being identifiable (saving a topic to *your* account, subscribing to updates on *your* email). Argumend's only such surface today is `/api/analyze`, `/api/debate`, `/api/judge`. Those should be gated.
- **Do not add friction when** the action is read-only and zero-marginal-cost (browsing static topics), or when the user is still evaluating whether the product is worth their attention. Every additional click before first-value is a multiplier on bounce.
- **Soft-gate (email, no password) when** the value-prop benefits from re-engagement (topic updates, weekly digest) but not when blocking initial value would lose the user.

The tactical rule: **count clicks-to-first-value**. If it's >3, you have a problem. Argumend's current path (land → see featured hero → click topic → see graph) is 2. That is correct.

The counter-pattern Argumend should *adopt* is a **graduated friction ramp tied to user-stated intent**: anonymous browse → email-soft-gate on save/share → password account on contribute (if/when UGC ships) → paid tier on heavy live-analyze quota (if/when monetization ships). Each step should add capability, never gate existing capability.

---

## 8. A/B Test Plan (post-instrumentation)

Once analytics are wired (cycle 4 deliverable, currently in observation freeze), run these in order:

### Test 1 — Canvas hint on/off
**Hypothesis:** A single-line "how to read this" hint at the top of the canvas increases first-session node-click rate without dropping return-visit rate.
**Variant A (control):** Current canvas, MapLegend only.
**Variant B:** Variant A + 1-line dismissable hint, persists in localStorage.
**Success metric:** First-session node-click rate (target: +15% relative). Guardrail: 7-day return rate not down >5%.
**Audience:** All anonymous first-time visitors. Run for 14 days or 1,000 sessions, whichever later.

### Test 2 — Hero video vs. static FeaturedTopicHero
**Hypothesis:** A 30–60s silent autoplay video of "an argument getting mapped" increases topic-click rate vs. the current static featured topic.
**Variant A (control):** Current `FeaturedTopicHero` (static).
**Variant B:** A 30–60s muted, captioned, autoplay video that demonstrates the analysis flow on a real topic, with a "see this analysis" button overlaid.
**Success metric:** Click-through to a topic graph (target: +25% relative). Guardrail: page weight does not push LCP >3s on 3G.
**Audience:** All first-time visitors. Run for 14 days.

### Test 3 — Email soft-gate placement
**Hypothesis:** Email capture on the *save/share* action converts better than email capture on the homepage hero or on canvas exit.
**Variant A (control):** No email capture anywhere.
**Variant B:** Email capture modal on click of "Save topic" / "Share analysis."
**Variant C:** Footer-style email subscribe strip on every page (always visible, never modal).
**Success metric:** Verified emails captured per 1,000 sessions. Guardrail: bounce rate not up >3%.
**Audience:** All visitors. Run for 21 days.

These three tests cover the three real onboarding decisions: *do we explain the canvas*, *do we sell the value-prop louder*, and *when do we ask for email*. Anything else is theater.

---

## Sources

- [Userpilot — Onboarding UX patterns and best practices](https://userpilot.medium.com/onboarding-ux-patterns-and-best-practices-in-saas-c46bcc7d562f)
- [Userlist — Ultimate Guide to SaaS User Onboarding](https://userlist.com/blog/saas-user-onboarding/)
- [Userpilot — Progressive Disclosure Examples](https://userpilot.com/blog/progressive-disclosure-examples/)
- [Reforge — Product-Led Growth tactics for retention & engagement](https://www.reforge.com/guides/product-led-growth-tactics-for-retention-and-engagement)
- [Reforge — Onboarding Lab: Superhuman + Reforge](https://www.growthmates.news/p/onboarding-lab-how-superhuman-and)
- [Chameleon — Hidden Metrics of Effective Product Tours (2025)](https://www.chameleon.io/blog/effective-product-tour-metrics)
- [Walnut — Interactive Demos & B2B Conversion Rates 2026](https://www.walnut.io/blog/product-demos/interactive-demos-conversion-rates-b2b-2026-data/)
- [Candu — Linear Onboarding Teardown](https://www.candu.ai/blog/linear-onboarding-teardown)
- [Page Flows — Linear desktop onboarding](https://pageflows.com/post/desktop-web/onboarding/linear/)
- [Linear — Start Guide](https://linear.app/docs/start-guide)
- [Linear — Onboarding: Join Teams changelog](https://linear.app/changelog/2019-12-12-onboarding-join-teams)
- [Appcues — Notion's lightweight onboarding](https://goodux.appcues.com/blog/notions-lightweight-onboarding)
- [Notion — Onboarding help](https://www.notion.com/help/guides/category/onboarding)
- [Codecademy — How to use Cursor AI](https://www.codecademy.com/article/how-to-use-cursor-ai-a-complete-guide-with-practical-examples)
- [Cursor — Features](https://cursor.com/features)
- [RobotPaper — Onboarding to a repo with Cursor commands](https://robotpaper.ai/using-cursor-commands-to-onboard-a-new-developer-to-a-repository/)
- [Ness Labs — Roam Research beginner's guide](https://nesslabs.com/roam-research-beginner-guide)
- [Product Hunt — Roam Research reviews](https://www.producthunt.com/products/roam-research/reviews)
- [Manifold — homepage](https://manifold.markets/)
- [Manifold — FAQ](https://docs.manifold.markets/faq)
- [Manifold — About](https://manifold.markets/about)
- [Metaculus — homepage](https://www.metaculus.com/)
- [Metaculus — FAQ](https://www.metaculus.com/faq/)
- [Substack — guide to metrics](https://support.substack.com/hc/en-us/articles/5320347155860-A-guide-to-Substack-metrics)
- [Substack — reader's guide](https://support.substack.com/hc/en-us/articles/33655200073620-A-reader-s-guide-to-Substack)
- [Substack — reader onboarding](https://substack.com/reader-onboarding)
- [Are.na — sign up](https://www.are.na/sign_up)
- [Are.na — about](https://www.are.na/about)
- [Adobe — How to use Are.na](https://www.adobe.com/express/learn/blog/how-use-arena)
- [LessWrong — FAQ](https://www.lesswrong.com/posts/2rWKkWuPrgTMpLRbp/lesswrong-faq)
- [LessWrong — New User's Guide](https://www.lesswrong.com/posts/LbbrnRvc9QwjJeics/new-user-s-guide-to-lesswrong)
- [LessWrong — Welcome to LessWrong!](https://www.lesswrong.com/posts/bJ2haLkcGeLtTWaD5/welcome-to-lesswrong)
- [Asterisk Magazine — homepage](https://asteriskmag.com/)
- [Asterisk Magazine — about](https://asteriskmag.com/about)
- [Microsoft Learn — Semantic Zoom](https://learn.microsoft.com/en-us/windows/apps/design/controls/semantic-zoom)
- [Gosling — Semantic Zoom](https://gosling-lang.org/docs/semantic-zoom/)
- Internal: `docs/research/2026-04-16-competitive-intel/10-acx-rationalsphere.md`
- Internal: `docs/research/2026-04-28-distribution/04-acx-substack-funnel.md`
- Internal: `docs/research/2026-04-28-visual-design/07-ai-video-generation.md`
- Internal: `docs/research/2026-04-28-visual-design/09-information-design.md`
- Internal: `components/HomeClient.tsx`, `app/layout.tsx`, `CLAUDE.md`
- Internal: commit `2d5e396` (removal of `OnboardingOverlay` and `QuickStartBanner`)
