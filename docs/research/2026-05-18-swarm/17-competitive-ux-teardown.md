# Competitive UX Teardown — 8 Reference Products

**Date:** 2026-05-18
**Scope:** What Argumend should steal from Kialo, ProCon.org, Wikipedia controversial pages, LessWrong, Manifold Markets, AI Explained (YouTube), Our World in Data, Asterisk Magazine.

## TL;DR

- **The strongest "controversial topic" UX in the wild is not a graph — it's a long, dense, opinionated page with one big visualization at the top and a navigable spine of evidence below.** Wikipedia, OWID, and ProCon all converge on this. Argumend's graph-first home punishes the user before they've earned the right to care.
- **Credibility is signaled by surface texture, not badges.** OWID's sources-as-footnotes, LessWrong's karma-and-author lockup, and Asterisk's editorial typography all do more for trust than any "verified" pill. Argumend already has the typographic vocabulary — it under-uses it on the canvas.
- **Every winner has exactly one hero interaction.** Kialo: expand a claim. Manifold: drag the slider. OWID: change country. AI Explained: scrub a timestamped chapter. Argumend's hero interaction ("pan a graph") is too generic to remember.

---

## Per-product teardown

### 1. Kialo

- **First 30s:** Tree root claim. The instructive moment is clicking a green "Pro" and watching a column of child arguments fan out to the right.
- **Density:** Surprisingly low — ~25 words per claim, one per row. They trade density for **navigation predictability**.
- **Navigation:** Persistent breadcrumb of your path down the tree. Back is first-class.
- **Controversy handling:** Strict symmetry — Pro and Con columns identical in width, type, affordances. No side wins by layout.
- **Credibility:** Per-claim community impact bar, author attribution. No institutional badges.
- **Mobile:** Single column, swipe-to-switch-side gesture. Works because the tree is narrow.
- **Hero interaction:** **Click a claim → its children slide in as the next column.** Spatially anchored, undoable.
- **Steal:** Symmetric two-column claim view; breadcrumb of reading path; per-claim impact bars.

### 2. ProCon.org (Britannica)

- **First 30s:** A topic opens with the question, a short framing paragraph, then a **two-column table** of pro vs. con arguments. No scroll to see the debate's shape.
- **Density:** High inside each cell (paragraph with citations), low at page level (≤10 rows per side).
- **Navigation:** Sticky in-page nav: Background → Pro → Con → Sources → Discussion Questions. Textbook-chapter feel.
- **Controversy handling:** Same width, same heading style, same argument count. They literally count and match.
- **Credibility:** Britannica logo, named editors, "Last updated" date, numbered citations resolving to a sources block.
- **Mobile:** Pro/Con stack vertically; sticky tab bar to switch sides without scrolling.
- **Hero interaction:** **The synoptic two-column table** — entire debate in one screen.
- **Steal:** Everything-above-the-fold promise. Numbered citations + sources block. Argument-count parity as editorial rule.

### 3. Wikipedia controversial pages

- **First 30s:** Infobox (dates, parties, casualties), a lead giving the whole article in 4 paragraphs, then a thick TOC. 30s reveals the shape.
- **Density:** Extreme but layered — scannable lead, deep body, footnote per claim.
- **Navigation:** TOC is the spine. Anchored headings, persistent rail, every section permalinkable.
- **Controversy handling:** NPOV via attribution, parallel construction ("Israeli sources say… Palestinian sources say…"), visible Talk-page link admitting contestation.
- **Credibility:** Footnote density. `[citation needed]` is itself a trust signal — admits gaps.
- **Mobile:** Collapsible sections; floating TOC dropdown; edit history one tap away.
- **Hero interaction:** **Lead + TOC combo** — 90 seconds commits you to the rest.
- **Steal:** A real lead/abstract above the canvas. TOC of sub-arguments doubling as jump-nav. Visible "this is contested" meta-link.

### 4. LessWrong

- **First 30s:** Reverse-chronological feed with karma, comments, reading time. Hover-preview gives the first paragraph. No onboarding, no hero image.
- **Density:** Heavy text, generous line-height, narrow column (~600px). Calm despite being dense.
- **Navigation:** Sequences (curated paths), Tags (clusters), Recent. Three modes, never combined.
- **Controversy handling:** **Two-axis voting** — upvote for quality while downvoting conclusion.
- **Credibility:** Author karma lockup next to every post. Footnotes, inline links, editor-curated frontpage.
- **Mobile:** Single-column always was mobile-shaped.
- **Hero interaction:** **Two-axis vote** — signals "good argument I disagree with."
- **Steal:** Two-axis reactions on claims/evidence. Reading-time signals on topics. Sequences = curated paths.

### 5. Manifold Markets

- **First 30s:** Landing card shows a question, a probability percentage (huge type), a sparkline, and a single big slider/button to bet. You can interact in literally one click.
- **Density:** Question-centric. Each market is a self-contained card with prob, volume, traders, and a comments thread.
- **Navigation:** Topic groups, search, and "For You" feed. Tags are first-class.
- **Controversy handling:** Probability replaces opinion. Disagreement is monetized into a number. The UI never takes sides — it reports the market.
- **Credibility:** Trader count, volume, creator reputation, resolution criteria visible up-front. Closing date as commitment.
- **Mobile:** Native-feeling card stack. Bet sheet slides up from bottom.
- **Hero interaction:** **Drag the probability slider to bet.** Direct manipulation of the controversial number itself.
- **Steal:** A single, headline-sized confidence number on each topic page (Argumend has this — push it harder). Resolution criteria / "what would change this" surfaced near the number. Direct manipulation: let users drag their own confidence and see which evidence moves it.

### 6. AI Explained (YouTube channel pages)

- **First 30s:** Channel banner, latest video as hero, then a grid of recent videos with thumbnail + duration + view count. Inside a video: a chaptered timeline beneath the player.
- **Density:** Thumbnails are dense (text overlay + face + hook), descriptions are sparse.
- **Navigation:** Playlists are the unit of long-form coherence. Chapters inside a video are second.
- **Controversy handling:** Tone — the host is calm, references papers on-screen, shows the actual primary source. The "graceful" trick is **showing the receipt**, not framing the disagreement.
- **Credibility:** On-screen citations with arxiv IDs, paper screenshots, transcript-quality narration. No hot takes.
- **Mobile:** YouTube native, but the chapter list and pinned-comment paper links are the real navigation.
- **Hero interaction:** **The chaptered scrubber** — jump to "the methodology section" of a 22-minute video in one tap.
- **Steal:** Chaptered "scrubbable" view of a debate or analysis (timeline of evidence). Citations shown as receipts, not links. A calm, third-person narration voice in topic intros.

### 7. Our World in Data

- **First 30s:** A topic page opens with a hero chart (interactive, country-selectable). One sentence of context above, methodology below. The chart **is** the article opener.
- **Density:** Layered. Chart → explainer paragraphs → more charts → full data → sources. Every chart is downloadable as CSV/PNG and embeddable.
- **Navigation:** Topic taxonomy on the left, related charts at the bottom, "Cite this" prominent.
- **Controversy handling:** Honest uncertainty — error bars, "data quality" tags, explicit "this metric has limitations" callouts. They volunteer the weakness.
- **Credibility:** Source line under every chart, author bylines, last-updated date, peer-review credit. The site looks like a journal because it is one.
- **Mobile:** Charts collapse to vertical-friendly versions; country selector becomes a sheet.
- **Hero interaction:** **Change the country/year on a chart and watch the story change.** One control, infinite re-tellings.
- **Steal:** Hero chart = hero argument map, with a single dominant control (e.g., "swap the strongest evidence" or "filter by evidence quality"). Visible methodology and limitations block. Every node downloadable / embeddable / citable.

### 8. Asterisk Magazine

- **First 30s:** Magazine cover with issue number, big serif headline, byline, dek. Feels like a print quarterly. Scrolling reveals a long essay with drop-caps and pull quotes.
- **Density:** Long-form, no sidebar clutter, generous margins. One column.
- **Navigation:** By issue, then by piece. Almost no cross-linking. One essay at a time.
- **Controversy handling:** Trusts the reader. Steel-manning is house style; contested claims get a paragraph of counter.
- **Credibility:** Editorial board, named writers, citations as endnotes, beautiful typography. The look = the trust.
- **Mobile:** Reads like a Kindle — one column, big type.
- **Hero interaction:** **The reading itself.** The slowness is the feature.
- **Steal:** Long-form companion essays per topic. Issue-based pacing — "drops" of topics with editorial framing. Confident typography that doesn't need decoration.

---

## Pattern synthesis

1. **One hero interaction per surface.** Every winner has one. Argumend has none memorable — panning a canvas is table stakes.
2. **Synoptic-first, exploratory-second.** ProCon table, OWID chart, Wikipedia lead, Manifold percentage — all give the whole shape in one screen before asking you to explore.
3. **Symmetry handles controversy.** Equal columns, equal counts, parallel construction. Argumend has the colors but doesn't enforce structural parity.
4. **Credibility = visible plumbing.** Footnotes, sources, last-updated, bylines, methodology. Not badges, not "AI verified."
5. **Two-axis reactions beat one-axis voting.** Quality ≠ agreement is the single biggest UX innovation in this set.
6. **Navigation = a spine, not a graph.** TOC, breadcrumb, scrubber, issue list. Graphs belong inside a node, not as the whole product.
7. **Honesty about uncertainty raises trust.** Volunteering "this is contested" is a credibility multiplier.
8. **Mobile = one column + sticky meta.** All winners collapse to a single column with sticky breadcrumb / TOC / tab bar.

---

## Concrete moves for Argumend (5–8)

1. **Add a synoptic header to every topic page.** Above the canvas: the question, the confidence number (already present), the crux in one sentence, top-3 evidence for and against in a literal two-column ProCon-style table. The graph becomes the *second* thing, for users who already care.
2. **Introduce a left-rail TOC of the topic's sub-arguments** that scrolls with the page and doubles as jump-to-node on the canvas. Steals from Wikipedia + OWID.
3. **Two-axis reactions on claims and evidence:** "strong/weak" (quality) and "agree/disagree" (position). Shown as two small bars, like LessWrong. Resolves the rust-vs-brown ambiguity by letting users separate "this is a good argument" from "I believe this."
4. **A single "hero interaction" per topic.** Candidate: a slider labeled "what's the strongest evidence?" that re-ranks the canvas nodes by user-weighted quality. Mirrors Manifold's draggable probability and OWID's country selector. Makes the canvas feel manipulable, not just panable.
5. **Visible methodology + limitations block per topic** ("how we built this analysis," "what we'd need to change our mind"). One short paragraph, OWID-style. Resolves the "is this AI slop?" objection without arguing it.
6. **Chaptered scrubber for debates and analyses.** A horizontal timeline of evidence with timestamps/anchors — click "rebuttals" to jump there. Steals AI Explained's chapters, scales to multi-round debates.
7. **Editorial drops, not infinite scroll.** Package the 109 topics into named "issues" (e.g., Issue 04: AI Governance — 8 topics). Asterisk-style cadence. Gives newsletter and social content a unit of release, and gives the homepage a curatorial voice instead of a topic supermarket.
8. **Numbered, resolvable citations** rendered consistently across analyses and debates, all collected in a per-topic sources block at the bottom. ProCon + Wikipedia. The current per-evidence source line is good; collecting them into a footnoted bibliography would be load-bearing for trust.

---

## Open questions

- **Is the React Flow canvas worth keeping as the default view, or should it move to a tab behind a ProCon-style synoptic table?** The teardown suggests the canvas is a power-user surface, not a landing surface.
- **What's Argumend's analog of Manifold's probability?** The 55% confidence number is closest, but it isn't directly manipulable. Should users be able to register their own confidence and see how the crowd-distribution compares?
- **Editorial voice vs. AI voice.** Asterisk and AI Explained both win by having a *named* curatorial voice. Argumend currently reads as voiceless. Does an editor persona ("the Argumend editorial board") help or hurt the AI-skeptic audience?
- **Two-axis voting requires accounts.** Activation cost is real. Is it worth gating behind login, or should anonymous quality votes work with rate-limiting?
- **What's the "Talk page" for Argumend?** Wikipedia's biggest trust signal is that disagreement about the article itself is visible. Where does meta-disagreement about a topic's analysis live?
