# Information Design for Argument Graphs

**Date:** 2026-04-28
**Analyst:** Research agent 09/10 — visual-design swarm
**Brief:** Apply Tufte / Bertin / Munzner / Cleveland to Argumend's React Flow canvas, OG images, and infographics. Reduce cognitive load on first contact.

## 1. The Cognitive Load Problem

The first encounter with an Argumend canvas is roughly: a heading, a thicket of rectangles in three or four similar warm hues, curved teal-on-cream edges crossing each other, a crimson box in the middle, and a slightly intimidating mini-map. The viewer has no idea where to start, and within ~2 seconds is making the unconscious decision Tufte warned about: "is this signal or chartjunk?" Every superfluous mark forces the reader to triage, which slows comprehension and increases the chance the actual point is missed ([Tufte, *The Visual Display of Quantitative Information*, summarized](https://thecommspot.com/comm-subjects/visual-communication/data-visualization/principles-of-data-visualization/edward-tuftes-principles-for-data-visualization/); [Performance Magazine on cognitive load](https://www.performancemagazine.org/data-visualization-post-tufte/)).

Four bodies of work explain why argument graphs are particularly hostile on first contact, and what to do about it:

**Tufte's data-ink ratio.** Maximize the proportion of pixels devoted to actual information; erase non-data ink and redundant data ink ([Tufte's principles](https://jtr13.github.io/cc19/tuftes-principles-of-data-ink.html)). Argumend currently spends a lot of ink on chrome — node borders, gradients, footers inside nodes, button affordances, citation pills, confidence chips. Each is defensible in isolation; together they bury the claim text. Tufte's contemporary critics rightly note that data-ink absolutism ignores memorability and engagement ([Performance Magazine](https://www.performancemagazine.org/data-visualization-post-tufte/)), but the asymmetry holds for first-contact comprehension: ornament costs nothing on a page you've already understood, and a lot on a page you haven't.

**Bertin's visual variables.** Position, size, shape, value (lightness), color hue, orientation, texture ([Bertin, *Semiology of Graphics*, 1967, summary](https://en.wikipedia.org/wiki/Visual_variable); [Sluis, "Before Tufte, there was Bertin"](https://karlsluis.medium.com/before-tufte-there-was-bertin-63af71ceaa62)). Bertin's deeper insight is that some channels are *selective* (the eye picks them out automatically), some *associative* (groups things), some *ordered*, some *quantitative*. Argumend currently leans almost entirely on **hue** — a channel that is associative but only weakly selective, fails for ~8% of male viewers, and is the worst of the seven for ordered data. Position, size, and shape are barely used to encode node *type* — they're determined by layout convenience.

**Munzner's effectiveness ranking.** *Visualization Analysis and Design* (2014) splits channels into magnitude (for ordered data: position > length > tilt/angle > area > depth > luminance > saturation > curvature > volume) and identity (for categorical: spatial region > hue > motion > shape) ([Munzner Ch.5 summary](https://www.csl.mtu.edu/cs5631.ck/common/05-Marks-Channels.pdf); [Munzner ranking diagram](https://www.researchgate.net/figure/Munzners-guideline-to-group-visual-channels-into-magnitude-and-identity-channels-and_fig4_373261873)). Argumend's confidence score (0-1) is encoded as a small chip with a percentage — the worst possible channel for a magnitude variable. It should be position or length.

**Cleveland & McGill's perceptual ranking.** Their 1984 controlled experiments produced a hierarchy: position on a common scale > position on non-aligned scales > length / direction / angle > area > volume / curvature > shading / color saturation ([Cleveland & McGill, JASA 1984](https://www.tandfonline.com/doi/abs/10.1080/01621459.1984.10478080); [Wikipedia: Graphical perception](https://en.wikipedia.org/wiki/Graphical_perception); replicated by Heer & Bostock 2010). Confidence-as-color-chip is at the bottom of this list. A slim horizontal bar inside the node would be at the top.

The argument-mapping literature confirms what design theory predicts: well-structured visual representations reduce cognitive burden, but only if encodings respect Gestalt grouping and dual-modality principles ([Frontiers in Education review, 2025](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2025.1672105/full); [Carr, *Cognitive Framework for Cooperative Problem Solving with Argument Visualization*](https://link.springer.com/chapter/10.1007/978-1-4471-0037-9_2)). When they don't — when readers are asked to mentally re-encode hue into rank, or shape into category — comprehension and recall both drop.

## 2. Color Encoding — Audit

Argumend's current palette (per `CLAUDE.md` and `components/MapLegend.tsx`):

| Role | Hex | Bertin classification |
|---|---|---|
| Evidence | `#3a6965` deep teal | dark, low-saturation cool |
| Proponent | `#C4613C` rust | mid-saturation warm |
| Skeptic | `#8B5A3C` brown | dark warm |
| Crux | `#a23b3b` crimson | dark warm |
| Meta | `#78716c` warm gray | neutral |

**Problems.**

1. **Three of five roles are warm browns/reds with overlapping luminance.** Rust (`#C4613C`), brown (`#8B5A3C`), and crimson (`#a23b3b`) are within ~10 luminance points of each other and read as "vaguely terracotta" at small sizes or under low-blue dark mode. This violates Datawrapper's rule that colors must be distinguishable *at the size you'll actually display them* — small node icons and 1px legend swatches are exactly where this fails ([Datawrapper, "What to consider when choosing colors"](https://academy.datawrapper.de/article/140-what-to-consider-when-choosing-colors-for-data-visualization)).

2. **Not colorblind-safe.** ColorBrewer's filter shows that fully colorblind-safe categorical palettes top out at four colors, and Argumend's rust/brown/crimson trio collapses for protanopia (5% of male viewers) and deuteranopia (6%) into a single warm blob ([ColorBrewer2](https://colorbrewer2.org/); [European Data Portal accessibility](https://data.europa.eu/apps/data-visualisation-guide/accessible-colour-palettes)). Test with a sim and the proponent/skeptic/crux distinction effectively disappears for the most common color-vision deficiency.

3. **Confidence scoring redoubles on hue.** High-confidence evidence borrows the deep teal; mid-confidence drifts toward rust; low-confidence toward brown — overloading the same channel that already encodes node type. Munzner's separability principle: do not put two variables on a channel that has to be read as one signal ([Munzner Ch.5](https://www.oreilly.com/library/view/visualization-analysis-and/9781466508910/K14708_C005.xhtml)).

**Concrete palette fixes.** Two options, both grounded in published palettes.

*Option A — Okabe-Ito subset.* Hex codes `#0072B2` (blue, evidence), `#D55E00` (vermillion, proponent), `#CC79A7` (purple, skeptic), `#000000` or `#3d3a36` (crux), `#999999` (meta). The Okabe-Ito eight-color palette is the de-facto standard for colorblind-safe categorical encoding, recommended by Nature Methods and Wilke's *Fundamentals of Data Visualization* ([ConceptViz Okabe-Ito reference](https://conceptviz.app/blog/okabe-ito-palette-hex-codes-complete-reference); [R Journal 2023](https://journal.r-project.org/articles/RJ-2023-071/)). Loses the "stoic parchment" vibe.

*Option B — keep stoic palette, fix the collisions.* Push proponent toward warmer/lighter (`#D87850`), skeptic toward cooler (`#7A6B8B` desaturated plum), keep crux crimson but reserve it for the *crux node only* (no other element on canvas can be crimson — that's its job). Move confidence off hue entirely onto a 4-segment progress bar or a position-encoded inset gauge, both of which Cleveland-rank far above color saturation.

I'd ship B. It costs less brand identity and it's the cheaper migration.

## 3. Edge Design — The Spaghetti Problem

Argumend's edges are smooth bezier curves, mostly in low-contrast teal, with no encoding of relationship type or strength. The "hairball" or "spaghetti" pathology — where a beautifully laid-out graph collapses into illegibility as edge count grows — is the central problem of network visualization research ([Holten, *Hierarchical Edge Bundles*, IEEE TVCG 2006](https://ieeexplore.ieee.org/document/4015425/); [data-to-viz on hairballs](https://www.data-to-viz.com/graph/edge_bundling.html); [IEEE VIS 2013 tutorial: "Grooming the Hairball"](https://ieeevis.org/year/2013/tutorial/visweek/grooming-hairball-how-tidy-network-visualizations)).

For Argumend, with ~10-30 nodes per topic, the canvas is not yet a hairball — but it has hairball aesthetic problems:

**Direction is invisible.** Argumend edges are *semantically directional* (evidence supports a position; a position is contradicted by another position; a crux divides two positions) but rendered as undirected curves. Munzner: when a visualization fails to show what kind of relationship an edge represents, the viewer has to read both endpoint labels and infer — which is exactly the work the diagram should be doing. **Fix:** small arrowheads with a 2px shaft, color-keyed to relation type (supports = teal, contradicts = rust, crux-of = crimson). Different *line styles* (solid for supports, dashed for contradicts, double for crux) layer a redundant Bertin channel for colorblind robustness.

**Weight and confidence are not encoded.** A "weak supporting evidence" edge looks identical to "decisive evidence." Edge thickness encoding (Bertin: size, Cleveland-rank: high) is the cheapest, highest-fidelity way to show this. Three discrete weights (thin / medium / thick at 1 / 2 / 3.5px) is plenty — humans cannot reliably distinguish more than ~4 line weights.

**Crossings.** With 20+ nodes laid out by force-directed layout, edge crossings climb fast. Skeleton-based and hierarchical edge bundling techniques from the IEEE VIS literature ([Ersoy et al., "Skeleton-Based Edge Bundling," IEEE TVCG 2011](https://dl.acm.org/doi/10.1109/TVCG.2011.233); [multilevel agglomerative bundling](https://ieeexplore.ieee.org/document/5742389/)) reduce this dramatically, but they require either a hierarchy (Argumend doesn't have a strict tree) or a clustering pre-pass. **Lighter intervention:** layered/Sugiyama-style layout — positions arranged in implicit columns by node type (evidence on outer rings, positions in middle, crux at center). React Flow supports this via Dagre or Elk. Even without explicit bundling this halves typical crossings.

## 4. Progressive Disclosure

Shneiderman's mantra — "overview first, zoom and filter, then details on demand" — is the canonical answer to "how do I show 30 things without showing 30 things at once" ([Shneiderman, "The Eyes Have It," 1996](https://www.cs.umd.edu/~ben/papers/Shneiderman1996eyes.pdf); [InfoVis Wiki](https://infovis-wiki.net/wiki/Visual_Information-Seeking_Mantra)). The mantra was written for databases, but it maps onto argument graphs cleanly:

- **Overview:** topic title, the central crux, the two/three named camps. One screen, ≤5 visual elements.
- **Zoom and filter:** the user clicks a camp, and only that camp's positions and supporting evidence remain visible; the others fade to 20% opacity.
- **Details on demand:** clicking a node opens the full citation pane, fallacy tags, judge verdicts.

Semantic zoom — where the *kind* of information shown changes with scale, not just the size — is the implementation pattern ([ZMLT algorithm, arXiv 1906.05996](https://arxiv.org/abs/1906.05996); [Wiens et al., "Semantic Zooming for Ontology Graph Visualizations," K-CAP 2017](https://dl.acm.org/doi/10.1145/3148011.3148015)). At zoom < 0.5, evidence nodes should collapse into icon-counts ("4 supporting, 2 contradicting") attached to their parent position. At zoom > 1.0, they expand to full text. The Wiens et al. user study found measurable readability improvements when this pattern was applied to ontology graphs — a much closer analog to argument graphs than network or social-graph studies.

The newsroom canon does the same thing without calling it semantic zoom:

- **Bloomberg Graphics** opens with one big chart and one sentence; secondary charts appear as you scroll ([Bloomberg's design philosophy summary](https://insights.newscred.com/a-qa-with-bloomberg-visual-data/); [Digiday on Bloomberg's 20-person team](https://digiday.com/media/bloomberg-graphics-team/)).
- **The NYT Upshot** treats the annotation layer as load-bearing. Amanda Cox: "Words in a graphic should highlight the relevant pattern or an expert's interpretation, and not merely say 'Here is the data'" ([Daily Northwestern interview](https://dailynorthwestern.com/2017/05/03/campus/new-york-times-upshot-editor-discusses-data-visualization-storytelling/)). A naked chart with no annotation is failure.
- **The Pudding** uses scrollytelling — illustrations swap as text scrolls — so each frame has one focus ([Storybench on Pudding](https://www.storybench.org/pudding-structures-stories-visual-essays/)).
- **FT Visual Vocabulary** is a categorization tool, not a style guide, but it embeds a heuristic: pick *one* relationship to show per chart (deviation, change-over-time, part-to-whole, magnitude, flow, etc.) ([FT Visual Vocabulary](https://ft-interactive.github.io/visual-vocabulary/); [GitHub](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary)). Argumend currently shows *all* relationships at once.
- **Nadieh Bremer / Data Sketches** demonstrates that ornament can serve comprehension when each ornament corresponds to a data variable — no decoration is purely decorative ([Visual Cinnamon](https://www.visualcinnamon.com/); [Data Sketches book](https://www.datasketch.es/)).

## 5. Reference Works — What Argumend Can Steal From Each

| Source | Lesson for Argumend |
|---|---|
| **Bloomberg Graphics** ([visual data](https://www.bloomberg.com/graphics/infographics/)) | One headline number + one sentence + one chart. The graph should *not* be the entry point; the synthesis is. Argumend's `FeaturedTopicHero` is closer to this than the canvas. |
| **FT Visual Vocabulary** ([github](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary)) | Adopt their explicit category labels. An Argumend graph is a "flow + part-to-whole + deviation" hybrid — pick one to lead. |
| **NYT Upshot** ([github](https://github.com/theupshot)) | Annotated charts always beat naked charts. Every shipped Argumend OG image needs ≥1 inline label calling out the crux. |
| **Reuters Graphics** | Mobile-first; degrade gracefully to single-column at <500px. Argumend's React Flow canvas is functionally unusable on phones today. |
| **The Pudding** ([pudding.cool](https://pudding.cool/)) | Scrollytelling > free-pan canvas for new users. The first time someone sees a topic, lead them through it; let them roam only after. |
| **Our World in Data** | Every chart has a 1-line summary above and source/notes below. Discoverability of methodology is part of the design ([data viz principles, generic](https://kevinlanning.github.io/DataSciLibArts/principles-of-data-visualization.html)). |
| **Datawrapper** | Built-in colorblind-check at design time. Run every Argumend palette through their checker before shipping ([accessibility article](https://academy.datawrapper.de/article/206-how-we-make-sure-our-charts-maps-and-tables-are-accessible)). |
| **Observable / Vega-Lite** | Grammar-of-graphics thinking: encodings as data; not "here is a teal box," but "node fill = type, node border-weight = confidence, position-x = camp." Refactor `RichNode.tsx` to encode this way and cognitive consistency cascades. |
| **Nadieh Bremer / Data Sketches** | Argumend's "stoic parchment" aesthetic should not preclude memorability. One signature visual — e.g., a hand-drawn parchment-line crux divider — gives the brand a hook. |

## 6. Concrete Recommendations for Argumend's Canvas — Ranked

Ranked by **(cognitive load reduction) × (1 / engineering effort)**.

1. **One-line "How to read this" overlay on first canvas load** (effort: 1 day; impact: huge). Plain English: "Teal = evidence. Rust = supports the position. Brown = challenges it. Red = the crux — the disagreement that resolves the debate. Click any node to expand." Dismissable, returns from `?` button. This is by far the cheapest cognitive-load reduction available. Argumend already had `OnboardingOverlay` and removed it (commit 2d5e396) — a *minimal* version is not the same thing.

2. **Confidence off color, onto position** (effort: 2 days; impact: high). Replace the percentage chip with an inset bar inside each evidence node (Cleveland rank-1 channel). Frees the hue channel for type-only encoding.

3. **Semantic zoom: collapse evidence below 0.5 zoom** (effort: 4-5 days in React Flow; impact: huge). At default fit-view zoom on a 25-node topic, render only positions + crux + counts. Evidence reappears as the user zooms in. ZMLT-style ([arXiv 1906.05996](https://arxiv.org/abs/1906.05996)).

4. **Persistent legend as sidebar, not popover** (effort: 1 day; impact: moderate). The current `MapLegend` is a hover/click thing. Make it a 56px-wide rail that stays visible. Doubles as a *filter*: clicking "evidence" dims all evidence nodes.

5. **Edge direction + line-style redundancy** (effort: 2 days; impact: moderate). Arrowheads on every edge. Solid = supports, dashed = contradicts, double = crux-relation. Color-redundant for colorblind robustness.

6. **Layered Sugiyama-style layout via Dagre** (effort: 3 days; impact: moderate-high for ≥20-node topics). React Flow supports Dagre out of box. Cuts edge crossings.

7. **Recolor for colorblind safety** (effort: 1 day per Option B above; impact: moderate). Push proponent warmer, skeptic cooler, reserve crimson for crux only.

8. **Mini-map: simplify to a single rect-of-rects, not full node renders** (effort: 0.5 day; impact: small but cheap data-ink win).

9. **Mobile fallback: collapse to vertical accordion list at <640px** (effort: 5 days; impact: huge for the ~50% of traffic on phones). The canvas is essentially broken on mobile; an accordion isn't ideal but is usable.

## 7. Concrete Recommendations for Static Images (OG, blog, infographics)

Static images don't get progressive disclosure. Different rules:

1. **Never ship the full canvas as an OG image.** Even at 1200×630 the canvas is a hairball. Instead: render a single horizontal "argument scaffold" — left column "Position A," middle column "the crux," right column "Position B." 3-5 nodes total. Numbered annotations.

2. **Always annotate in plain text.** Following Upshot's Cox: at minimum, headline + 1 callout label per OG. The viewer should know what the picture is *saying*, not just *showing*. ([Daily Northwestern](https://dailynorthwestern.com/2017/05/03/campus/new-york-times-upshot-editor-discusses-data-visualization-storytelling/))

3. **Single-canvas, left-to-right flow only.** Eye-track research and Western reading direction both push for L-to-R; force-directed layouts don't respect this. Static = explicit horizontal scaffold every time.

4. **Use Tufte small multiples for "compare 4 cruxes."** Four 300×200 micro-maps in a 2×2 grid, identical layout, different content ([Tufte sparklines/small multiples](https://www.edwardtufte.com/notebook/sparkline-theory-and-practice-edward-tufte/); [Juice Analytics on small multiples](https://www.juiceanalytics.com/writing/better-know-visualization-small-multiples)). Far more legible than one busy canvas.

5. **Run every static through a colorblind sim before publish.** Datawrapper has a built-in checker; for Figma there's the "Stark" plugin.

6. **Source line on every static image.** "argumend.org/topics/[id]" — drives traffic *and* makes the image a proper citation ([WHO data design principles](https://data.who.int/about/datadot/data-design-principles)).

## 8. A/B Test Plan

Eye tracking is overkill for the things that need testing. Cheaper, valid methods:

**Test 1 — Time-to-first-comprehension.** Show the canvas to N=20 strangers (Prolific ~$2 each). Single task: "In one sentence, what is the disagreement on this topic?" Record time-to-answer and answer accuracy (rated by 2 blind raters). Compare current canvas vs. canvas-with-overlay (recommendation 1) vs. canvas-with-semantic-zoom (3). Power: with within-subjects design and N=20, you can detect a ~20% time reduction at α=0.05. The Kruskal-Wallis on positively-skewed completion times handles the non-normality ([UXPA Journal: task completion time analysis](https://uxpajournal.org/guide-task-completion-time-analysis/); [MeasuringU on task times](https://measuringu.com/formative-time/)).

**Test 2 — "Describe what you see" qualitative.** Same N=20, ask them to free-narrate for 60s. Code transcripts for: (a) did they identify the crux unprompted? (b) did they get the camps right? (c) did they say anything implying overload ("a lot going on," "where do I look")? Ship the variant with the highest crux-ID rate.

**Test 3 — Time-to-first-click.** Heatmap on first 30s. If users click the mini-map, the legend, or zoom-out within 5s, that's a recoil signal: they're trying to escape the density before reading anything. Target metric: <30% recoil rate.

**Test 4 — Static OG comprehension.** Show the OG image alone (no surrounding context). Single question: "What is this about?" Compare current full-canvas OG vs. proposed scaffold OG. This is the cheapest test of the lot — Twitter/LinkedIn impressions are 1.5s of attention, and if the OG fails this 1-sentence test it's failing in the wild.

**What to skip.** SUS scores (System Usability Scale) — too coarse for visual changes. Eye tracking — N=20 is too small to be statistically useful and the equipment is expensive. NPS — meaningless at this stage.

**Decision rule.** Ship a variant if it improves time-to-comprehension by ≥15% *and* doesn't reduce accuracy. Cognitive load reductions that come at the cost of correctness aren't wins.

## Sources

- [Tufte's Principles of Data-Ink — community summary](https://jtr13.github.io/cc19/tuftes-principles-of-data-ink.html)
- [Performance Magazine — Data visualization post-Tufte: cognitive load](https://www.performancemagazine.org/data-visualization-post-tufte/)
- [Edward Tufte — Sparkline theory and practice](https://www.edwardtufte.com/notebook/sparkline-theory-and-practice-edward-tufte/)
- [Bertin — Visual variable, Wikipedia](https://en.wikipedia.org/wiki/Visual_variable)
- [Sluis — Before Tufte, there was Bertin](https://karlsluis.medium.com/before-tufte-there-was-bertin-63af71ceaa62)
- [Bertin — Semiology of Graphics, full PDF](https://countersubject.biz/wp-content/uploads/2024/08/Semiology-of-Graphics-Diagrams-Networks-Maps-Jacques-Bertin-Z-Library.pdf)
- [Munzner — Marks and Channels (Ch.5)](https://www.oreilly.com/library/view/visualization-analysis-and/9781466508910/K14708_C005.xhtml)
- [Munzner — Magnitude vs identity channels diagram](https://www.researchgate.net/figure/Munzners-guideline-to-group-visual-channels-into-magnitude-and-identity-channels-and_fig4_373261873)
- [MTU — Marks and Channels lecture notes](https://www.csl.mtu.edu/cs5631.ck/common/05-Marks-Channels.pdf)
- [Cleveland & McGill 1984 — Graphical Perception](https://www.tandfonline.com/doi/abs/10.1080/01621459.1984.10478080)
- [Wikipedia — Graphical perception](https://en.wikipedia.org/wiki/Graphical_perception)
- [FlowingData — Graphical perception fundamentals](https://flowingdata.com/2010/03/20/graphical-perception-learn-the-fundamentals-first/)
- [ColorBrewer 2.0](https://colorbrewer2.org/)
- [European Data Portal — Accessible colour palettes](https://data.europa.eu/apps/data-visualisation-guide/accessible-colour-palettes)
- [Okabe-Ito — ConceptViz hex code reference](https://conceptviz.app/blog/okabe-ito-palette-hex-codes-complete-reference)
- [R Journal 2023 — Coloring in R's Blind Spot](https://journal.r-project.org/articles/RJ-2023-071/)
- [Datawrapper — How accessibility works](https://academy.datawrapper.de/article/206-how-we-make-sure-our-charts-maps-and-tables-are-accessible)
- [Datawrapper — Choosing colors for data viz](https://academy.datawrapper.de/article/140-what-to-consider-when-choosing-colors-for-data-visualization)
- [Holten 2006 — Hierarchical Edge Bundles, IEEE TVCG](https://ieeexplore.ieee.org/document/4015425/)
- [Ersoy et al. — Skeleton-Based Edge Bundling, IEEE TVCG 2011](https://dl.acm.org/doi/10.1109/TVCG.2011.233)
- [Multilevel agglomerative edge bundling, IEEE](https://ieeexplore.ieee.org/document/5742389/)
- [IEEE VIS 2013 — Grooming the Hairball tutorial](https://ieeevis.org/year/2013/tutorial/visweek/grooming-hairball-how-tidy-network-visualizations)
- [data-to-viz — Hierarchical edge bundling and the hairball](https://www.data-to-viz.com/graph/edge_bundling.html)
- [Shneiderman — The Eyes Have It (1996)](https://www.cs.umd.edu/~ben/papers/Shneiderman1996eyes.pdf)
- [Visual Information-Seeking Mantra — InfoVis Wiki](https://infovis-wiki.net/wiki/Visual_Information-Seeking_Mantra)
- [Wiens et al. — Semantic Zooming for Ontology Graph Visualizations, K-CAP 2017](https://dl.acm.org/doi/10.1145/3148011.3148015)
- [Multi-level tree-based interactive graph viz with semantic zoom — arXiv 1906.05996](https://arxiv.org/abs/1906.05996)
- [Carr — Cognitive Framework for Cooperative Problem Solving with Argument Visualization](https://link.springer.com/chapter/10.1007/978-1-4471-0037-9_2)
- [Frontiers in Education 2025 — Charting the field: argument visualization review](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2025.1672105/full)
- [Bloomberg Graphics — Visual Data](https://www.bloomberg.com/graphics/infographics/)
- [Insights NewsCred — Q&A with Bloomberg Visual Data](https://insights.newscred.com/a-qa-with-bloomberg-visual-data/)
- [Digiday — Bloomberg's 20-person graphics team](https://digiday.com/media/bloomberg-graphics-team/)
- [FT Visual Vocabulary — interactive](https://ft-interactive.github.io/visual-vocabulary/)
- [Financial Times Chart Doctor — GitHub](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary)
- [The Upshot — GitHub](https://github.com/theupshot)
- [Daily Northwestern — Amanda Cox interview](https://dailynorthwestern.com/2017/05/03/campus/new-york-times-upshot-editor-discusses-data-visualization-storytelling/)
- [Storybench — How The Pudding structures stories as visual essays](https://www.storybench.org/pudding-structures-stories-visual-essays/)
- [The Pudding](https://pudding.cool/)
- [Visual Cinnamon — Nadieh Bremer](https://www.visualcinnamon.com/)
- [Data Sketches book](https://www.datasketch.es/book)
- [WHO Data Design Principles](https://data.who.int/about/datadot/data-design-principles)
- [Juice Analytics — Better know small multiples](https://www.juiceanalytics.com/writing/better-know-visualization-small-multiples)
- [UXPA Journal — Task completion time analysis](https://uxpajournal.org/guide-task-completion-time-analysis/)
- [MeasuringU — Task times in formative usability tests](https://measuringu.com/formative-time/)
