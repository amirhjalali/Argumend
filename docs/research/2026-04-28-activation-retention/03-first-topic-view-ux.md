# First-Topic-View UX — The Cognitive Sequence at `/topics/[id]`

**Date:** 2026-04-28
**Analyst:** Research agent 03/10 — activation-retention swarm
**Brief:** Decompose the first 30 seconds of a `/topics/[id]` visit; recommend concrete UX upgrades. Cycle 2 file 09 covered the React Flow canvas at `/?topic=…`. This report covers the prose-page surface where ACX/X/HN traffic actually lands.

## 0. Critical framing — the topic page is *not* the canvas

A finding before the brief begins, because it reframes everything below. `/topics/[id]/page.tsx:78-142` ([file](file:///Users/amirhjalali/argumend/app/topics/%5Bid%5D/page.tsx)) renders `TopicPageClient`, which renders `TopicDetailView`. `TopicDetailView` is **a 1,924-line prose article with cards** — *not* the React Flow canvas. The canvas lives at `/?topic=${id}` and is reached only via the "Explore interactively" CTA at lines 1396-1402, 1542-1547, 1697-1703 of `TopicDetailView.tsx`. Every external link from ACX, X, Show HN, or a Google snippet that says "argumend.org/topics/X" lands on the article, not the graph.

This is good news. It means the "canvas is unfamiliar" friction (cycle 2 file 09's central concern) is *not* the first-30-second problem on `/topics/[id]`. The first-30-second problem is **whether a user can extract the verdict, the disagreement, and a reason to keep reading from a long parchment-coloured scroll** — closer to a Bloomberg or Upshot article than to a Kialo tree ([Bloomberg Graphics philosophy](https://insights.newscred.com/a-qa-with-bloomberg-visual-data/); [Daily Northwestern interview with Amanda Cox](https://dailynorthwestern.com/2017/05/03/campus/new-york-times-upshot-editor-discusses-data-visualization-storytelling/)).

The canvas-friction discussion in section 3 below applies when the user clicks through; it is no longer the primary entry-point UX problem.

## 1. The 30-second cognitive sequence

**Desktop 1440×900, Chrome, no scroll.**

- **Seconds 0-2 (recognition).** Browser paints. The F-pattern eye lands top-left ([NN/G eye-tracking, original 2006 study](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content-discovered/); [F-pattern still relevant including mobile, NN/G 2024](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)). What it sees on Argumend: TopBar logo, "Home / Topics / [Title]" breadcrumb, then three small pills (category / status / confidence-percent) at line 1127-1149 of `TopicDetailView.tsx`. The pills are roughly 28px tall and ~80px wide each. Above-the-fold attention is "84% versus below-fold" ([Apexure summary citing Nielsen](https://www.apexure.com/blog/above-the-fold-landing-page-design)). Argumend uses this prime real-estate for *metadata about the analysis*, not the analysis itself.
- **Seconds 2-5 (parse the headline).** Eye drops to the H1 (line 1151-1153) — a 3xl-to-5xl serif title in `font-serif`, 1.08 leading. This is the moment the user knows what topic they're on. Below it, at line 1155-1157, sits the `meta_claim` — a one-line synthesis. This is the single most important sentence on the page and the user reaches it 3-5 seconds in. Good.
- **Seconds 5-10 (decision: invest more attention?).** Eye scans down. Hits the share/save/depth-toggle row at 1160-1189. The DepthSelector (30s / 2m / 5m, lines 1027-1064) is a critical UX object that almost no first-time user understands without label-reading because it sits *visually equal* to a row of share-icons. Then the "Quick Stats" strip at 1192-1230: pills count, evidence count, crux count, references count. These are vanity metrics for a first read; they don't help comprehension.
- **Seconds 10-30 (the actual scan).** Below-the-fold, after a scroll: `KeyTakeawaysBox` (line 1235), `QuickStatsBar` (1245), `ControversyMeter` (1254), then the "30-Second Summary" section (lines 1260-1404) that contains the real verdict, pillar overview cards, and an evidence-balance bar.
- **Seconds 30-60 (commit or bounce).** "Where do you stand?" stance picker (line 1408) appears only at depth ≥ 2m. So a default-mode user never sees it. They scroll into pillars or bounce.

**The primary visual entry point** is the H1 at line 1151. **The first decision point** is the DepthSelector at line 1188 *if* the user notices it; otherwise the "Read full analysis" / "Explore interactively" buttons at line 1389-1402. Most users will never click DepthSelector because it looks like a UI ornament.

**Mobile 375×812, iOS Safari.** With the TopBar (~56px), breadcrumb (~28px), pills row (~32px) and standard padding (24px), the H1 itself crosses the fold. The `meta_claim` sentence is at ~y=380px — already requiring a scroll on the iPhone 12/13/14 form factor. Share buttons, copy-link, embed, save, subscribe, print, and the DepthSelector are *all* below the fold and stacked into a `flex-col` (line 1160) — the user sees a vertical stack of seven UI elements before the actual content. **Mobile visitors lose the verdict, the meta-claim, and the depth selector all simultaneously to the fold.**

## 2. Page anatomy audit (every section that renders)

In render order, from `TopicDetailView.tsx`:

| Order | Section | Lines | Above-fold (1440×900)? |
|---|---|---|---|
| 1 | `AppShell` (TopBar + sidebar shell) | wraps the page (1106) | yes (TopBar) |
| 2 | Breadcrumb nav | 1110-1122 | yes |
| 3 | Hero `header` — pills + H1 + meta_claim + share row + depth selector + quick-stats row | 1126-1231 | partially (pills, H1; meta_claim is borderline) |
| 4 | `KeyTakeawaysBox` — big confidence number, status pill, 4-stat grid | 1235-1242 → component at 506-590 | no |
| 5 | `QuickStatsBar` — duplicates a lot of #4 | 1245-1251 → component at 596-684 | no |
| 6 | `ControversyMeter` | 1254-1257 | no |
| 7 | "30-Second Summary" section — verdict banner, pillar overview cards, evidence balance bar, quick actions | 1260-1404 | no |
| 8 | "Where do you stand?" stance picker (depth ≥ 2m only) | 1408-1553 | no |
| 9 | "The Claim" expanded meta-claim (depth ≥ 2m) | 1556-1579 | no |
| 10 | `PillarSection` x N (depth ≥ 2m) — skeptic vs proponent + evidence cards + crux | 1582-1659 → component at 334-411 | no |
| 11 | References (depth = 5m) | 1662-1685 | no |
| 12 | "Explore interactively" CTA | 1688-1705 | no |
| 13 | `ConfidenceTimeline` (only some topics) | 1708-1732 | no |
| 14 | `DebateHighlight` teaser (some topics) | 1735-1737 | no |
| 15 | `DebatePreviewSection` — full mock debate + judges' verdict | 1740 → component at 887-1019 | no |
| 16 | FAQ section | 1743-1788 | no |
| 17 | `VerdictVoting` — user voting | 1791-1797 | no |
| 18 | Related Topics (same-category + cross-category) | 1800-1853 | no |
| 19 | Methodology + educator callouts | 1856-1878 | no |
| 20 | `ExploreMoreSection` — 3 cards (analyze / browse / methodology) | 1881-1883 → 739-802 | no |
| 21 | "Found this analysis useful?" share CTA | 1886-onward | no |
| 22 | `Footer` (in `AppShell`) | — | no |

**The page is 21 sections tall.** Sections 4 and 5 (`KeyTakeawaysBox` and `QuickStatsBar`) duplicate each other — both render confidence, evidence-for/against, pillar count. Sections 4 + 5 + 7 (verdict banner inside "30-Second Summary") *all* show the confidence score as a giant percent number. The viewer sees the same number three times in the first three screens. This is the redundant data-ink problem ([Tufte's data-ink principle, summary](https://jtr13.github.io/cc19/tuftes-principles-of-data-ink.html)) at a section level rather than a chart level.

## 3. The two friction points

### (a) The graph metaphor (mostly deferred, not eliminated)

Per section 0, the canvas is one click away — on the homepage at `/?topic=…`. So canvas-unfamiliarity is *not* the topic-page first-30-second problem. But the topic page does still ask a similar literacy question: **"what is a pillar / a crux / a confidence score?"** A new visitor hits "Pillars Analyzed: 3" and "Cruxes Identified: 3" in `KeyTakeawaysBox` (lines 558-575) without ever being told what either of these words mean. *Argumend uses domain vocabulary as if the user already shares it.* This is the same trap Munzner warns about at the channel level — domain vocabulary as a channel that isn't pre-attentive ([Munzner, Visualization Analysis & Design](https://www.cs.ubc.ca/~tmm/vadbook/); [visualization onboarding research, Stoiber et al. 2019](https://www.researchgate.net/publication/335191690_Visualization_Onboarding_Learning_How_to_Read_and_Use_Visualizations)).

**Mitigation:** an inline glossary. First time the words "pillar," "crux," "steel-man," and "confidence score" appear, render them as `<dfn>` with a hover/tap tooltip and a tiny dotted underline. Render *only on first occurrence per section* — Tufte-disciplined ink. Cost: 1 day. This single intervention probably explains more comprehension in ten seconds than the entire `KeyTakeawaysBox` does.

### (b) Volume of signal — too many sections, too much repetition

The page has 21 sections. The first 7 are above-fold-or-near, each with its own card border and its own copy of the verdict numbers. New visitors do not scroll endlessly out of curiosity — they scroll once to triage, and if they see "more of the same," they bounce ([F-pattern thinking on triage scrolling](https://designmybit.com/f-pattern-thinking-ux-for-the-way-people-read/); [F-shape pattern, Smashing 2024](https://www.smashingmagazine.com/2024/04/f-shape-pattern-how-users-read/)).

**Mitigation 1: collapse 4 → 5 → 7 into one block.** Verdict banner + key stats + evidence balance bar belong in the hero. Cycle 2 file 09's information-design recommendation #1 — "one headline number + one sentence + one visual" — applies directly here.

**Mitigation 2: defer Related Topics and Explore More to a sticky right-rail or bottom drawer**, freeing the main column for *this* topic. Notion's sticky table-of-contents pattern is the analog ([Notion sticky TOC](https://notioneverything.substack.com/p/2-helpful-updates-notion-to-substack)).

**Mitigation 3: semantic compression of duplicates.** `QuickStatsBar` + `KeyTakeawaysBox` are 95% the same content. Pick one. Tufte's data-ink ratio applied at the section level: one heavyweight stats block beats two lightweight ones.

## 4. The "what is this even?" problem — three framings

The page assumes the visitor knows they're reading "an argument analysis." Many won't. Three candidate framings:

**(a) Headline + one-line subhead at top: "[Topic name] — the actual disagreement, mapped."** Cheap. Tells the user the page's purpose in one breath. Already half-implemented via the `meta_claim` paragraph; needs to become the *visual subhead*, sized between H1 and the pills, and rewritten to land the *what-this-page-is*.

**(b) Auto-typed 60-second narration.** A small framed widget that types out: "Most experts say this is mostly settled. Here's the strongest pro argument… here's the strongest objection… and here's the crux — the question that, if answered, would resolve it." Charming. Requires no canvas. Very memorable on first contact. **But:** auto-typed UI is a known engagement risk on mobile (forces blocking re-render, drains battery, fails screen-reader politeness rules) and is widely associated with marketing-y AI demos.

**(c) Five numbered tour stops as overlay annotations.** Numbered call-out chips at "Verdict (1) → Pillars (2) → Strongest evidence (3) → The crux (4) → Judges' verdict (5)." User clicks "Next" four times and has been guided through the page in ~30 seconds. Adapts the [Stoiber et al. visualization-onboarding pattern](https://www.researchgate.net/publication/335191690_Visualization_Onboarding_Learning_How_to_Read_and_Use_Visualizations) — guided tours and overlays are the canonical interventions for low-visualization-literacy first contact.

**Pick (a).** Reasoning: (a) is one PR, has zero engineering risk, costs nothing on mobile, costs nothing for accessibility, and works for the 100% of visitors who never opt into a tour. (c) should ship as an *additional* layer for anyone who clicks a "Show me around" affordance — but (a) carries the weight of first-contact comprehension and is the highest-leverage move. (b) is a side experiment, not the entry point.

Concrete copy for (a): rewrite line 1155-1157's `meta_claim` paragraph from "raw claim" to "this page in one sentence." Two-line variant. Example for "Did the Apollo missions land humans on the Moon?":

> **The actual disagreement, mapped.**
> Most physical and historical evidence settles this; this page traces the four pillars of doubt skeptics raise and where each one breaks.

That's an answer to "what is this even?" embedded in the only place the user is guaranteed to look.

## 5. First-action invitations — pick one based on activation goal

Activation-swarm file 01 frames activation as *measurable repeat use* — a returning visitor, a saved topic, a copy-link share, or a click into a second topic. Three candidate first-action prompts ranked by activation contribution:

- **"Click the crux to see why the disagreement persists"** — high-quality cognitive engagement, but it's an internal action that doesn't compound. The user understands the page better but Argumend has no signal.
- **"Scroll to the strongest counter-argument to your initial position"** — the existing "Where do you stand?" widget at line 1408 already does this. But it's gated to depth ≥ 2m, so most visitors never see it. Promote it to depth=30s. Activation contribution: medium — single-page engagement.
- **"Save this topic to your shelf to be alerted when the verdict shifts"** — *this* compounds. A save creates an account-or-cookie record, sets up a notification surface, and gives Argumend a return-trigger. The `SaveTopicButton` already exists at line 1176.

**Recommendation:** put a low-friction save prompt directly *inside* the verdict banner. Copy: "Save this · we'll ping you if the confidence shifts." The "ping you if it shifts" framing is the first thing most observers see that suggests Argumend is *alive* — that this is a tracked verdict, not a static essay. That's the activation hook file 01 is asking for.

Engineering: ~0.5 day to relocate; ~2 days to wire confidence-shift notifications (table already exists per `topic_subscriptions` in `lib/db/schema.ts`).

## 6. Side-by-side reading mode — already half-shipped, finish it

The `DepthSelector` (lines 1027-1064) already implements 30s / 2m / 5m reading depth. This is **functionally a reading-mode toggle** — exactly what this brief asks for. Two problems:

1. **It's invisible.** Sitting next to the share/print row, in the same visual weight, it reads as "more icons." A first-time user does not know it exists.
2. **The 30s mode shows a *summary*, not an *essay*.** The mode shipping today at depth=30s renders the verdict banner, the pillar grid, and the evidence balance bar. That's a dashboard. A reader who wants prose gets pillars (depth=2m) or full pillars + evidence (depth=5m). There is no pure prose mode.

**Recommendation:** Convert DepthSelector into a more obvious "Reading mode" segmented control, place it under the H1 (above the share row), and add a fourth setting: "Essay" — a 5-minute structured piece with H2s for "Verdict," "Strongest case for," "Strongest case against," "The crux," "Judges' verdict," "What would change this." The component pieces all already exist on the page; this is a layout-only PR. Notion's toggle/heading composability ([Notion toggle pattern](https://thegem.substack.com/p/how-i-use-notion-for-substack)) and Substack's straight-prose-with-headings is the visual reference. Build cost: 2-3 days as briefed.

## 7. Engagement loops — what keeps a visitor on-page for 5+ minutes

Once seconds 0-30 succeed, the next question is dwell time. The page already has a lot of the right mechanisms; they're just buried.

- **Stance-then-steel-man.** "Where do you stand?" (1408) is the most engaging thing on the page. *Promote it above-fold.* Verdict-then-stance kills the prompt — by the time the user reads the verdict, their stance is taken. Reverse the order.
- **Judges' verdict toggle.** `JudgingResults` (1003) already shows multi-model verdicts. Add a small "see how Claude vs GPT-5 vs Gemini ranked this" toggle inline. Three models disagreeing is a tiny mystery; mysteries hold attention ([UX Mag on F-pattern + curiosity gaps](https://uxmag.com/articles/the-f-pattern-understanding-how-users-scan-content)).
- **"Challenge this argument" CTA.** Inline next to each crux: "Think this crux misses something? Challenge it." Routes to the debate orchestrator with the pillar prefilled. The live-debate feature is currently buried under "Watch Debate" at 1224.
- **Share buttons at every section break,** not just hero and footer. The share-worthy moment is a *specific crux*, not the whole topic. Inline `<ShareButtons>` per crux, prefilled "The crux: '{crux.title}' — argumend.org/topics/{id}#crux-{n}".
- **Related topics need taglines.** "Same crux applies." or "Opposite verdict, same evidence weights." Converts a tile grid into a series of mini-arguments for clicking — closer to The Pudding's cards than to a category index ([Storybench on Pudding visual essays](https://www.storybench.org/pudding-structures-stories-visual-essays/)).

## 8. The "shareable moment" capture — screenshot-this-crux

OG images at `/api/og/[id]` are the only artifact today. They render uniformly per topic and don't capture the *specific* thing that made this user want to share. The high-leverage shareable moment is when a visitor reads a single crux and thinks "this is exactly the question." Cycle 2 file 02 (visual signature) and cycle 3 file 04 (OG pipeline) point at the same conclusion: the crux is the brand asset, and the asset needs to be capturable on demand.

**Recommendation: a "Screenshot this crux" button** rendered next to every `CruxCard` (line 285+). On click, capture the card via `html-to-image` or `html2canvas-pro` ([html2canvas](https://html2canvas.hertzen.com/); [html2canvas-pro fork, currently maintained](https://github.com/yorickshan/html2canvas-pro), 2.6M weekly downloads industry-wide), render to a 1200×630 PNG with branded chrome (parchment background, "argumend.org/topics/{id}" footer, the same EB Garamond title, and the crimson crux band already in the design system), and trigger a download + clipboard copy.

Why this works:

- **The crux is a complete, self-contained idea.** Unlike a graph, it screenshots well at any size.
- **The watermark drives traffic.** Per cycle 2 file 09's recommendation 6 — every static asset must source-line back to the page.
- **It's the single move that captures ACX/X/HN-share intent.** Today, when an ACX commenter wants to quote a crux, they screenshot manually with their OS — which strips the brand. A first-class capture button keeps the brand on every image that escapes Argumend.
- **Engineering: ~2-3 days.** Crux-card already has stable DOM markup. `html-to-image` handles the conversion; the only design work is a "card mode" stylesheet that hides the surrounding chrome.

This is the cheapest viral mechanism available; cycle 3 file 04's OG-pipeline work has already done the design heavy-lifting.

## 9. Mobile-specific topic-page concerns

Full mobile audit lives in agent 07. Topic-page-specific issues only:

- **Hero overflow.** Per §1, on 375×812 the meta-claim and DepthSelector both fall below the fold. Promote `meta_claim` directly under H1 at a larger mobile baseline.
- **Share row stacks vertically (1160).** Six buttons take ~200px above the actual content. Collapse to a single overflow control on `<sm`; keep Share and Save inline.
- **Print button (1180-1186) is dead on mobile**; hide at `<sm`.
- **Read-full-analysis ghost button (1389-1395)** is the lowest-affordance CTA pattern on mobile. Make it filled at `<sm`.
- **DepthSelector is unusable at <375px.** Swap to a native `<select>` or a sheet drawer.

## Sources

- [F-Shaped Pattern of Reading on the Web — NN/G original 2006 study](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content-discovered/)
- [F-Shaped Pattern Misunderstood But Still Relevant — NN/G 2024](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)
- [F-Shape Pattern — Smashing Magazine 2024](https://www.smashingmagazine.com/2024/04/f-shape-pattern-how-users-read/)
- [F-Pattern Thinking — Design My Bit](https://designmybit.com/f-pattern-thinking-ux-for-the-way-people-read/)
- [F-Pattern — UX Magazine](https://uxmag.com/articles/the-f-pattern-understanding-how-users-scan-content)
- [Above the Fold Landing Page Design — Apexure](https://www.apexure.com/blog/above-the-fold-landing-page-design)
- [Tufte's Principles of Data-Ink — community summary](https://jtr13.github.io/cc19/tuftes-principles-of-data-ink.html)
- [Munzner — Visualization Analysis and Design (textbook page)](https://www.cs.ubc.ca/~tmm/vadbook/)
- [Stoiber et al. — Visualization Onboarding: Learning How to Read and Use Visualizations](https://www.researchgate.net/publication/335191690_Visualization_Onboarding_Learning_How_to_Read_and_Use_Visualizations)
- [Bloomberg Visual Data philosophy — NewsCred](https://insights.newscred.com/a-qa-with-bloomberg-visual-data/)
- [Daily Northwestern — Amanda Cox interview (NYT Upshot)](https://dailynorthwestern.com/2017/05/03/campus/new-york-times-upshot-editor-discusses-data-visualization-storytelling/)
- [Storybench on The Pudding — visual essay structure](https://www.storybench.org/pudding-structures-stories-visual-essays/)
- [Notion Everything — Sticky TOC update](https://notioneverything.substack.com/p/2-helpful-updates-notion-to-substack)
- [The Gem — How I Use Notion for Substack (toggle/heading patterns)](https://thegem.substack.com/p/how-i-use-notion-for-substack)
- [html2canvas — Screenshots with JavaScript](https://html2canvas.hertzen.com/)
- [html2canvas-pro — actively maintained fork](https://github.com/yorickshan/html2canvas-pro)
- [Cycle 2 file 09 — Information design for argument graphs](file:///Users/amirhjalali/argumend/docs/research/2026-04-28-visual-design/09-information-design.md)
