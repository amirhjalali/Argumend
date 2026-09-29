# Content & learning library — evaluation

## Verdict (≤6 lines)
The library is eight overlapping mini-sites plus two keyword-farm question layers. Nothing in the nav links to them, the sitemap has left them out since 2026-08-21, and they are still self-canonical and indexable. Search visitors land on the parts of Argumend that most contradict the north star: "140 Claims Fact-Checked" verdict pages with no site navigation, and guides and posts that describe an "AI Judge Council" and "confidence scores" the product no longer has. None of it points to the paste tools or the flagship AI maps.
**The change that matters most:** fold everything into one `/learn` hub with one article template and one index template. Delete or rewrite the stale product claims (judges, confidence %, "settled"), 301 `/is` into `/questions`, and end every page with a single next step to a map or the paste tool.

## Page scorecard
| Route | Purpose in one line (as a visitor reads it) | Clarity 1-5 | Consistency 1-5 | Phone 1-5 | Vision fit 1-5 | Keep / Merge into X / Demote / Remove |
|---|---|---|---|---|---|---|
| /blog | "Essays on critical thinking" (86 posts, 27 categories, 15 tag chips before the first post) | 3 | 4 | 3 | 2 | Keep; prune taxonomy; move fallacy and concept posts out |
| /blog/[slug] (Jev post) | A long-form essay | 4 | 4 | 4 | 4 (template) / 2 (library) | Keep: **the article template to copy** |
| /blog/category/[c], /blog/tag/[t] | Filtered post lists (16 categories and most of 153 tags hold one post) | 3 | 4 | 3 | 3 | Keep ≤6 categories; noindex tags |
| /guides | 15 how-to guides in 4 coloured "tracks" | 3 | 4 | 3 | 2 | Merge index into /learn (keep detail URLs) |
| /guides/[id] | One guide | 4 | 4 | 2 | 2–3 | Keep; fix overflow; rewrite 2 stale guides |
| /concepts | 6 "stages" of how a map gets built | 3 | 4 | 4 | 4 | Merge index into /learn |
| /concepts/[slug] | One core idea | 3 | 3 | 4 | 4 | Keep; absorb the glossary long-form entry |
| /fallacies | Catalogue of 22 fallacies | 4 | 4 | 4 | 4 | Keep as the fallacy reference; absorb 18 blog fallacy posts |
| /fallacies/[slug] | One fallacy: definition, example, response | 4 | 4 | 4 | 4 | Keep |
| /glossary | 38 terms in 4 chapters (20,868px on phone) | 2 | 3 | 1 | 3 | Keep URL; rebuild as compact A–Z |
| /is | "Is it true? 140 Claims Fact-Checked": a verdict badge list | 2 | 1 | 2 | 1 | 301 → /questions |
| /is/[slug] | A verdict answer to one question | 3 | 1 | 2 | 1 | 301 → /questions/[primary] |
| /questions | 248 question phrasings, typed empirical/normative/… | 3 | 1 | 2 | 3 | Keep, one page per topic; add AppShell |
| /questions/[slug] | Question, arguments, then cruxes | 3 | 1 | 2 | 3 | Keep; put the crux first |
| /perspectives | Scroll story: "you are not your ideas" | 3 | 2 | 3 | 5 | Keep as a featured essay under Learn |
| /research | Research behind the method | 3 | 3 | 3 | 3 | Keep; reframe around the perception gap; absorb /library |
| /library | A 15-map sampler of unlabeled glyphs, then 9 books | 2 | 3 | 3 | 2 | 301 → /research#reading |
| /lessons-from-the-deep | Log of an AI agent on Moltbook (with a "70 karma" profile card) | 1 | 2 | 3 | 1 | Remove → 301 /blog |
| /for-educators | Lesson plans and worksheets | 4 | 3 | 4 | 3 | Keep; move under /learn "For teachers" |
| /for-educators/worksheets/[id] | Printable worksheet (no shell, by design) | 4 | 3 | 3 | 4 | Keep |
| /privacy | Draft privacy policy | 5 | 4 | 4 | 5 | Keep |
| /terms | Terms of service | 4 | 4 | 4 | 5 | Keep |

## Findings (ranked, most severe first)

### F1. `/is` pages sell Argumend as a fact-checker handing out verdicts
- Severity: critical     Scope: template (388 URLs across /is and /questions)     Effort: M
- Where: `/is`, `/is/nuclear-energy-safe` (is--390-sheet1.png, is__nuclear-energy-safe--390-sheet1.png, extra/content-detail-desktop-montage.png)
  - The title, OG and JSON-LD all say "Is It True? 140 Claims **Fact-Checked** with Evidence" (`app/is/page.tsx:27,39,54,97`; keyword `"fact check"` at :31).
  - The hub copy tells readers "The badge shows… which way the evidence leans". Every row carries a MODERATE/DIVIDED verdict badge, with MODERATE in rust.
  - The rust CTA box reads "Don't just take the **verdict**" (:137). The footer reads "Each verdict reflects independently weighted evidence, not opinion" (:154).
  - The detail page leads with "Evidence-based assessment… the evidence assessment is:" and then the verdict in 2xl bold serif (`app/is/[slug]/page.tsx:263-275`). The same label repeats inside `BalanceWeightReadout` straight after it.
  - The detail page shows no crux at all. It closes with "Every claim is steel-manned, every piece of evidence is independently weighted. Not a poll. Not an opinion." (:413).
  - The QAPage JSON-LD `acceptedAnswer` is the verdict plus balance/weight numbers, so Google shows a verdict as "the answer".
- Problem: A search visitor sees a scoreboard of 140 verdicts from a site that says it "fact-checks". That is the opposite of "the spine is the crux, not the verdict". It also breaks the product rule in CLAUDE.md that the tool "never claims independent verification".
- Fix: 301 `/is` and `/is/[slug]` into `/questions` (see structure section). On the surviving `/questions/[slug]`:
  - Order the page as H1 question → question type (Empirical/Normative…, already in `lib/questionMeta.ts`) → **"What would settle it" (the crux questions, now at `app/questions/[slug]/page.tsx:368`)** → strongest case each side → evidence state as a quiet secondary line.
  - Drop the verdict from `acceptedAnswer` and make it the crux plus both cases.
  - Drop "fact-checked", "verdict" and "Not an opinion" everywhere. Rename "See the full debate" (:413) to "See the full map".

### F2. The library still describes a product that no longer exists: AI judges, confidence %, "settled"
- Severity: critical     Scope: system (data files)     Effort: M
- Where:
  - **AI judges.**
    - Guide "Running Your First Analysis" has a whole section, "The AI Judge Council… confidence scores reflecting the degree of agreement among judges" (`data/guides.ts:734-767`). It is card No. 05 on `/guides` and is the related guide under the Jev post.
    - Blog "AI in Debate" has "## Argumend's Multi-Judge Approach… multiple independent AI judges" (`data/blog.ts:1316-1334`).
    - Blog Dunning-Kruger post: "our multi-judge analysis evaluates…", then "The confidence scores on each topic are not opinions. They are computed assessments… Argumend provides an external calibration" (`data/blog.ts:1168-1172`).
  - **Confidence scores.**
    - Post "How Confidence Scores Change the Way You Think" (`data/blog.ts:834`), including "If you're 95% confident about a topic where Argumend's evidence analysis suggests 60% confidence is warranted…" (:1038).
    - "assigns confidence scores" (:970), "claims with confidence scores" (:1619), "weighted confidence scores" (:3635), "confidence scores assigned to each pillar" (:4080).
    - Guide "Reading Confidence Like a Forecaster": "A confidence score of 85 does not mean…" (`data/guides.ts:1646-1738`); also "A score of 75 means the evidence moderately favors…" (:1143) and "exactly what a confidence score encodes" (:1622).
    - `/research`: "Our calibrated confidence scores draw directly from Tetlock" (`data/research.ts:281`).
    - `/glossary`: the headword is still "Confidence Score" (`data/glossaryPageTerms.ts:69`). "Epistemic Humility" says a "calibrated confidence score expresses: '60% confident, and here is why'" (:381).
  - **"Settled" that contradicts our own maps.**
    - "Nuclear energy… safety is [about as settled as these things get](/topics/nuclear-energy-safety)" (`data/blog.ts:560`). The linked map reads **"Well-mapped, evidence still divided" (balance 54, weight 76)**.
    - GMO post: "the science is about as settled as it gets" and "## Question 1: Is GM food safe to eat? (Yes — and this part is settled)" (`data/blog.ts:383,405`). The `gmo-crops-safety` map is also "evidence still divided" (47/76).
    - North star: "Do not let 'settled' rest on fewer than eight cards".
- Problem: A reader who follows the blog to the map finds the map disagreeing with the blog. A reader of the guides looks for judge panels and confidence numbers that are not on the page. This is the credibility gap the north star was written to close.
- Fix:
  1. Sweep `data/blog.ts`, `data/guides.ts`, `data/research.ts` and `data/glossaryPageTerms.ts`: "confidence score" → "balance and weight" (or drop it); delete every judge-council passage.
  2. Rewrite `running-your-first-analysis` for the paste tool that ships.
  3. 301 `reading-confidence-like-a-forecaster` and `how-confidence-scores-change-thinking` into `/concepts/confidence-calibration`, keeping the forecaster prose about the reader's own calibration.
  4. Replace every "settled" that links a map with the map's own verdict label.
  5. Add a vitest in `data/blog.test.ts` that fails on `/judge council|multi-judge|confidence score/i` and on "settled" within 80 characters of a `/topics/` link.

### F3. Eight overlapping libraries: one idea lives at up to seven URLs, with no hub and no way in
- Severity: high     Scope: system     Effort: L
- Where:
  - **Crux**: `/concepts/cruxes`, `/glossary#crux`, `#double-crux`, `/guides/crux-test`, `/blog/what-is-a-crux-and-why-it-matters`, `/blog/finding-the-crux-of-debates`, `/blog/what-would-change-your-mind`.
  - **Steel-manning**: `/concepts/steel-manning`, `/glossary#steel-manning`, `/guides/steelmanning-practice`, `/blog/why-steel-manning-makes-you-smarter`.
  - **Fallacies**: 18 "X Fallacy, Explained" posts duplicate `/fallacies/[slug]`, 12 of them again in the glossary. Ad hominem alone is at `/fallacies/ad-hominem`, `/blog/ad-hominem-fallacy-explained` and `/glossary#ad-hominem`. `/concepts/fallacies` and `/fallacies` both exist.
  - **Correlation**: `/fallacies/false-cause`, `/blog/post-hoc-fallacy-explained`, `/guides/correlation-and-causation`, `/glossary#correlation-vs.-causation`.
  - **Bias**: two guides (`understanding-bias`, `cognitive-bias-field-guide`) plus glossary chapter III.
  - **Bayes**: `/guides/bayesian-thinking` and `/blog/bayesian-thinking-for-normal-people`.
  - **"Is nuclear energy safe?"**: `/is/nuclear-energy-safe`, `/questions/is-nuclear-energy-safe`, `/topics/nuclear-energy-safety`, `/blog/nuclear-energy-safety-evidence`, `/blog/nuclear-energy-what-both-sides-get-right`. 17 question texts appear word for word on both `/is` and `/questions`; 82 topics are covered by both layers.
  - **No way in**: `lib/nav.ts` links none of these routes. Inbound code links: /glossary 0, /fallacies 0, /is 0, /questions 0, /research 0, /perspectives 0, /lessons 0; /blog and /library only from `SearchModal`.
  - **Search status**: `app/sitemap.ts` dropped them in 0405aff (2026-08-21), yet every page still has a self-canonical and is indexable.
  - `docs/PRODUCT_PRUNING_AUDIT.md` marked most of them "MERGE → …". None of those merges was carried out.
- Problem:
  - A reader cannot tell a "concept" from a "guide", a glossary entry, a "research" page or a "library". They are the same explanations at different lengths with different chrome.
  - Google splits one query across three to seven of our own URLs.
  - A reader who finishes a page has no nav path to anything else.
  - The half-pruned state is the worst of both: kept for search, but pruned from every signal that would help it rank.
- Fix: carry out the merge in "Proposed learn/content structure" below. Put the consolidated tree back in the sitemap. Add a "Learn" footer column in `lib/nav.ts` (`FOOTER_COLUMN_HREFS`) and a link from `/about`; it does not need primary nav.

### F4. `/is` and `/questions` (388 URLs) have no site shell: no menu, no logo, no footer, no legal links
- Severity: high     Scope: template     Effort: S
- Where: `app/is/page.tsx:117`, `app/is/[slug]/page.tsx:237`, `app/questions/page.tsx:165` and `app/questions/[slug]/page.tsx:247` render a bare `<main>` without `AppShell` (the other content pages use it). Evidence: questions--390-sheet1.png and is--390-sheet1.png, no TopBar; extra/content-index-desktop-montage.png, no sidebar or top bar at 1440.
- Problem: On a phone the programmatic landing pages have no hamburger, no search and no footer. The only way out is the breadcrumb or the rust CTA. Privacy and Terms, which `lib/nav.ts` says must be reachable from every page, are missing.
- Fix: wrap all four in `<AppShell>`, and use `layout="reading"` on the detail pages (as `app/ai/page.tsx:70` does). Delete the page-local `<footer>` blocks. Change the `font-bold` serif H1s to the regular-weight serif H1 used everywhere else.

### F5. Content dead-ends: no page leads to the paste tools or the flagship AI maps
- Severity: high     Scope: system     Effort: S
- Where:
  - Link counts across `data/blog.ts` (86 posts), `data/guides.ts`, `data/glossaryPageTerms.ts`, `data/concepts.ts` and `data/fallacies.ts`:
    - /reply 0, /analyze-v2 0, /ai 0;
    - `/topics/ai-mass-unemployment` and `/topics/capitalism-after-ai` 0;
    - /analyze 1 (the stale guide).
  - In page chrome: concept and fallacy detail pages end with "Explore Topics" and "Explore Argument Maps", going to `/topics` rather than a specific map (`app/concepts/[slug]/page.tsx:263`, `app/fallacies/[slug]/page.tsx:290`). Blog posts end with tags, a newsletter box, then keyword-matched "Related reading".
  - The Jev post describes exactly what `/reply` does, yet its Related reading offers "How Confidence Scores Change the Way You Think", an AI-2027 topic and the stale "Running Your First Analysis" guide (extra/ends-strip.png; `app/blog/[slug]/page.tsx:126-184`, which scores keyword overlap plus a same-category bonus).
- Problem: The content attracts people interested in disagreeing better, then never offers the act the north star wants to spread ("paste a thread you are in"). The best post points readers at the worst one.
- Fix: one "Next step" block in the article template, placed before Related reading, with exactly two lines:
  1. A specific map: the topic with the highest tag overlap, preferring the flagship AI maps and `/ai` for AI-tagged posts.
  2. "Try it on an argument you're in", linking to the one paste tool that survives consolidation (today there are three; see the core-product evaluator).
  Also allow a curated `related: string[]` per post in `data/blog.ts` that overrides the scorer, and keep deprecated posts out of the scorer.

### F6. Content-farm signals: batch dates, taxonomy sprawl, doorway pages, walls of cards
- Severity: high     Scope: system     Effort: M
- Where:
  - **Batch dates**: 49 of 86 posts carry one of three dates (23 on 2026-06-29, 16 on 2026-03-26, 10 on 2026-03-19). All 86 are by "Argumend Team". The index cards show those dates, so a reader sees "June 29, 2026" again and again.
  - **Categories**: 27, of which 16 hold one post. Near-duplicates: "Science" / "Science & Health" / "Science & Technology" / "Science & Policy"; "Technology & Policy" / "Policy & Technology"; "Case Study" / "Case Studies"; lowercase "analysis".
  - **Tags**: 153 unique tags. Every category and tag page is indexable (`app/blog/category/[category]/page.tsx:47-70` sets noindex only for unknown slugs).
  - **Doorway pages**: `/questions` has 248 near-duplicate pages built from 1–3 phrasings per topic (`lib/questions.ts:29`). Each renders the same body under a different H1, and the hub is a 12,158px list with 277 targets under 32px (metrics.json).
  - **Walls of cards**: `/guides` cards carry number, time, title, subtitle, truncated description, section count, two truncated takeaways and "Start reading" (guides--390-sheet1.png).
- Problem: The site looks machine-generated. That undercuts a brand whose pitch is honest epistemics, and invites thin-content treatment in search.
- Fix:
  1. Collapse to about 5 categories (Essays, Case studies, How to think, Product notes, Research) with 301s from the old category slugs; `robots: { index: false, follow: true }` on all tag pages.
  2. Replace per-post dates on index cards with the month only, or drop them.
  3. Keep one question page per topic (the rest 301 to it; see the structure section).
  4. Guide and fallacy index cards: title, one-line description, read time. Nothing else.

### F7. Guide pages overflow the phone viewport (the "More guides" cards are 513px wide in a 390px screen)
- Severity: high     Scope: template (all 15 guides)     Effort: S
- Where: `app/guides/[id]/page.tsx:411` and `:422`. `grid md:grid-cols-2` has no mobile column template, so the grid column grows to the `truncate` text's max-content. Measured on `/guides/how-to-read-an-argument-map` and `/guides/crux-test`: 10 links at right=529, w=513 (Playwright, 390px). Visible in extra/ends-strip.png (panel 4: subtitles cut mid-word, arrows missing). The capture metric did not catch it because `html, body { overflow-x: hidden }` clips it.
- Problem: The end of every guide shows cards sliced off at the right edge, with no ellipsis and no arrow.
- Fix: `grid grid-cols-1 md:grid-cols-2`, or `min-w-0` on the `<Link>`. Better, replace the whole 14-card "other guides" block with the single Next step from F5 plus 3 related items.

### F8. No single template: five hero styles, three body typographies, and reading pages in the "browse" shell
- Severity: medium     Scope: template     Effort: M
- Where (extra/content-index-desktop-montage.png, extra/content-detail-desktop-montage.png, extra/detail-phone-strip.png):
  - **Index heroes**:
    - blog: tinted band + eyebrow + RSS;
    - guides, fallacies, glossary: eyebrow + numeral-chapter chips, and glossary adds an icon tile and an A–Z bar;
    - concepts: no eyebrow;
    - `/is`, `/questions`: bold serif, no shell;
    - research and for-educators: two-tone split H1;
    - library: a "Resource Hub" pill;
    - lessons: an icon tile and a dark profile card;
    - perspectives: a full-screen centered display.
  - **Detail body text**:
    - blog and guides: serif `prose-custom` at 18px;
    - concepts: sans at 16px;
    - fallacies: sans at 18px;
    - `/is` and `/questions`: sans at 14px in cards.
  - The numeral-chapter pattern is implemented five times: `lib/conceptMeta.ts`, `fallacyMeta.ts`, `glossaryMeta.ts`, `guideMeta.ts`, `questionMeta.ts` (plus `libraryMeta`, `perspectiveMeta`).
  - "No. 06 / No. 10 / No. 22" data-order numbers appear inside family-grouped lists (fallacies--390-sheet1.png, guides).
  - Every article uses `AppShell` in the default "browse" layout, so on desktop an essay sits beside a sidebar "TOPICS" list of unrelated maps.
- Problem: The pages read as seven publications that share a font. Readers cannot learn where things are on a page.
- Fix: build two components, `ArticleLayout` and `CollectionIndex` (spec in the structure section), from the blog post and fallacies index, and move every page onto them. Use `AppShell layout="reading"` for all article pages. Drop the "No." labels. Merge the `*Meta.ts` chapter tables into one `lib/learnSections.ts`.

### F9. Semantic colours used as decoration: crux crimson and rust for category chips
- Severity: medium     Scope: system     Effort: S
- Where:
  - Crux crimson is the chip, icon and border colour for glossary chapter III (`lib/glossaryMeta.ts:107-111`), guide track III (`lib/guideMeta.ts:92`), concept stage "Stress-Testing" (`lib/conceptMeta.ts:70`) and question category Philosophy (`lib/questionMeta.ts:101`, rendered mauve).
  - Rust marks guide track II and glossary chapter II. It is also the "MODERATE" verdict badge on `/is` (is--390-sheet1.png) and fills "Key arguments for" cards (`app/is/[slug]/page.tsx`).
  - Brown skeptic marks the "Methodology" chapters.
- Problem: The design system reserves crimson for cruxes and rust for CTAs and proponents. In the library, red means "chapter 3" and rust means "moderate verdict", which teaches readers the wrong code before they reach a map.
- Fix: section chips go neutral (stone border, ink text; one teal accent for the active chip). Keep crimson only on crux content and rust only on the one CTA and the proponent side.

### F10. `/glossary` is 20,868px on a phone (12,679 desktop), and its A–Z bar misleads
- Severity: medium     Scope: page     Effort: S
- Where:
  - glossary--390-sheet2.png; extra/glossary--390-jumpS.png; `app/glossary/page.tsx`.
  - Terms are grouped by chapter, but the 44px A–Z bar jumps to the *first* term of that letter in any chapter: "S" lands on Skeptic Premise in chapter I, while Straw Man and Survivorship Bias sit in chapter III.
  - The first-of-letter anchor `<span>` is a flex child (`:158`), so the flex `gap` pushes those cards' icons about 16px right of their neighbours (Pillar vs Proponent Rebuttal, Skeptic Premise vs Steel-Manning).
  - A 40px icon on every term narrows the text column. A duplicate "All Terms A–Z" list follows all 38 cards.
- Problem: It is a reference page that cannot be scanned, and the one navigation aid sends the reader to the wrong place.
- Fix:
  - Make it one alphabetical `<dl>`: term, then a 1–2 sentence definition, then "Read more →" to the concept or fallacy page that owns the long version.
  - No icons, no chapters, no duplicate list; keep `glossaryTermId` anchors stable.
  - Target ≤5,000px on phone (about 6 screens) and about 3,000px on desktop.
  - Rename "Confidence Score" to "Balance and weight" and keep `#confidence-score` as an alias anchor.

### F11. `/library` and `/research` hide their own purpose; `/research` misses the north star's own evidence
- Severity: medium     Scope: page     Effort: S
- Where:
  - `/library` promises "books, papers, and tools". It opens with a 15-row "Argument map sampler" whose only data column is unlabeled balance/weight glyphs (library--390-sheet1.png, `app/library/page.tsx:107`), which duplicates /topics. The reading list (9 sources) starts on phone screen 3.
  - `/research` opens "Every design decision in Argumend is grounded in peer-reviewed research", yet has nothing on perceived versus actual disagreement (`data/research.ts`: no "perception" hits). That gap is the north-star metric.
  - It has 42 citation links at 12×13px on phone (metrics.json).
- Problem: One page is a second topic index; the other skips the research that justifies the whole product.
- Fix:
  - 301 `/library` → `/research#reading` and delete the sampler.
  - Lead `/research` with the perception-gap literature (More in Common "The Perception Gap", 2019; Hidden Tribes is already cited) and state the north-star goal in one sentence.
  - Make citation markers at least 24px tap targets, or render references inline.

### F12. Off-vision pages and lessons: agent-karma log, prediction-market musings, a class vote on the winning team
- Severity: medium     Scope: page     Effort: S
- Where:
  - `/lessons-from-the-deep` centres on a dark "Cruxtacean · 70 karma" agent profile from an AI-agent social network (`app/lessons-from-the-deep/page.tsx:176-203`).
  - Its data includes "Skin in the Game: Should Confidence Have Stakes? What if confidence scores had consequences? Exploring prediction markets for beliefs" (`data/moltbook-lessons.ts:200-204`).
  - `/for-educators` lesson 05 "The Crux Debate" ends with "Class votes on which team better identified and argued the crux" (`app/for-educators/page.tsx:82`).
- Problem: One page is an experiment log about stakes and karma. The other turns crux-finding into a team contest with a winner. Both run against "never a winner".
- Fix:
  - Remove `/lessons-from-the-deep` (301 → `/blog`). If the three good lessons (values vs facts, the test applies to the tester) are worth keeping, move them into one blog essay.
  - Change lesson 05's last step to "Each team states what evidence would move it; the class checks whether both teams named the same crux."

### F13. Phone reading nits on the index pages
- Severity: medium     Scope: page     Effort: S
- Where:
  - `/blog` on phone shows 6 category chips, a disclosure and 15 tag chips before the first post, which starts at about screen 1.6 (blog--390-sheet1.png).
  - `/questions` has 277 targets under 32px (24px-tall question links); `/is/[slug]` related-question links are 21px tall.
  - The `/is` search placeholder is cut to "Search questi" by the side-by-side select.
  - The blog RSS link is 84×20.
- Fix:
  - Move blog tags below the list, keeping only the category row above it.
  - Give list rows `min-h-11` (the pattern `app/questions/questionsTouchTargets.test.ts` already enforces for category chips; extend the test to question rows).
  - Stack the search field full-width above the selects on phone.

### F14. Low — nits (grouped)
- Titles have inconsistent suffixes: "Logic & Reasoning Articles" (none), "… — Guide | Argumend", "… | ARGUMEND", "… — Argumend for Educators".
- `/guides` lede uses "--" for an em dash (`app/guides/page.tsx:116`, and track copy at `:32`).
- Blog posts show the newsletter twice: the inline compact box (`app/blog/[slug]/page.tsx`) and the footer. The copy promises "Weekly debates", which is both debate framing and a cadence nobody keeps, while `/api/newsletter` is classed HIDDEN.
- The glossary says "Each Argumend topic is structured around three pillars", while `/is/nuclear-energy-safe` says "across 2 argument pillars".
- `/perspectives` screen 1 is a title and "Scroll to begin", and the TopBar scrolls away; this is the known sticky issue, and it matters most on long reading pages here.
- Blog index and related cards use `content-visibility:auto` plus a fade-in, so full-page captures show blank space below the fold. That is a capture artifact, not a user bug, but it hides the page from screenshot review tools.

## Patterns worth copying
- **Article template**: `app/blog/[slug]/page.tsx`. It has a header band (Breadcrumbs with JSON-LD, category pill, serif H1, lede, meta row), `max-w-3xl` serif `prose-custom` at 18px (via `lib/markdown.ts`), a collapsible `TableOfContents`, and cross-type related reading. It reads well on a phone (blog__…--390-sheet1.png). Also reuse the guide detail's `Key Takeaways` box.
- **Fallacy detail structure**: `app/fallacies/[slug]/page.tsx` (definition → example → why it misleads → how to respond → maps where it shows up). Use it as the body skeleton for concepts too.
- **Question-type legend** (Empirical / Normative / Predictive / Explanatory): `lib/questionMeta.ts`, shown on `/questions`. This is the most on-vision idea in the library ("fact or value?") and belongs on topic pages and at the top of /learn.
- **Legal pages**: `app/privacy/page.tsx`. Plain, dated, an honest "Draft — pending legal review" notice, and a table in an `overflow-x-auto` wrapper.
- **Reading shell**: `AppShell layout="reading"` (`app/ai/page.tsx:70`) for every article-type page.
- **Pagination**: `components/CollectionPagination.tsx` with `lib/collectionPagination.ts`.

## Proposed learn/content structure

```
/learn                         NEW hub (CollectionIndex). "How to disagree better."
│  lede: the perception gap in one sentence + "What would change your mind?"
├─ Start here                  /concepts/cruxes · /perspectives (featured essay) · /blog/what-would-change-your-mind
├─ Core ideas                  /concepts/[slug]  (6 → 7: add "Fact or value?"; each absorbs its glossary long entry)
├─ Guides                      /guides/[id]      (15 → ~11 after merges below; rewrite running-your-first-analysis)
├─ Fallacies                   /fallacies (kept as section index) + /fallacies/[slug] (absorb 18 blog posts)
├─ Glossary                    /glossary (compact A–Z; each term links to its owner page)
├─ Why this exists             /research (perception-gap research + reading list from /library)
└─ For teachers                /for-educators + /for-educators/worksheets/[id]
/blog                          essays, case studies, product notes (≈5 categories; tags noindex)
/questions/[slug]              ONE question page per topic, AppShell reading layout, crux-first; variants listed as "Also asked as"
/topics/[id]                   the map (unchanged; owns all evidence and verdict readouts)
/privacy, /terms               unchanged
```

**Redirects (all 301; nothing indexed is deleted without a target)**

| From | To |
|---|---|
| `/concepts` | `/learn#ideas` |
| `/guides` | `/learn#guides` |
| `/library` | `/research#reading` |
| `/lessons-from-the-deep` | `/blog` |
| `/is` | `/questions` |
| `/is/[slug]` (140) | `/questions/[primary slug for the same topicId]`. The 17 identical texts map 1:1 (e.g. `/is/nuclear-energy-safe` → `/questions/is-nuclear-energy-safe`). For the 58 topics `/questions` does not cover, first add the is-claim question as that topic's primary variation in `lib/questions.ts`. Build the map from `data/is-claims.ts` in `next.config.js` `redirects()`. |
| `/questions/[secondary variant]` (~165) | `/questions/[primary]`; variants become an "Also asked as" list on the primary |
| `/blog/*-fallacy-explained` (18) | `/fallacies/[slug]` (tu-quoque → whataboutism, post-hoc → false-cause, survivorship-bias-explained → survivorship-bias, …), after merging the better prose into the fallacy page |
| `/blog/what-is-a-crux-and-why-it-matters`, `/blog/finding-the-crux-of-debates` | `/concepts/cruxes` |
| `/blog/why-steel-manning-makes-you-smarter` | `/concepts/steel-manning` |
| `/blog/how-confidence-scores-change-thinking`, `/guides/reading-confidence-like-a-forecaster` | `/concepts/confidence-calibration` (retitled "Balance and weight") |
| `/blog/bayesian-thinking-for-normal-people` | `/guides/bayesian-thinking` |
| `/guides/understanding-bias` | `/guides/cognitive-bias-field-guide` (merge) |
| `/blog/ai-in-debate-promise-and-pitfalls` | rewrite without the multi-judge section, or 301 → `/blog/we-gave-a-model-that-cant-talk-1000-arguments` |
| `/blog/category/[old]` (22 minor categories) | the nearest of the ≈5 surviving categories |

Tag pages keep serving with `noindex, follow`. When the merge ships, put `/learn`, `/concepts/*`, `/guides/*`, `/fallacies/*`, `/glossary`, `/research`, `/blog/*` and `/questions/*` back in `app/sitemap.ts`. Otherwise mark them noindex; the current in-between state helps nobody.

**The one article template: `ArticleLayout`** (from `app/blog/[slug]/page.tsx`)
- `AppShell layout="reading"`. Header band: Breadcrumbs (Home › Learn › Section › Title), eyebrow = section name (Essay / Guide / Idea / Fallacy / Question), regular-weight serif H1, one-sentence lede, meta row (read time, "Updated <month year>").
- Body: `max-w-3xl`, serif `prose-custom` at 18px / 1.7 (about 65ch on desktop, about 40ch on phone), `TableOfContents` only when there are more than 4 H2s, optional `Key Takeaways` box.
- End, in this order:
  1. **Next step**: one specific map (flagship or `/ai` first when relevant) and one line to the paste tool.
  2. Up to 3 related items (curated first, then scored).
  3. Nothing else; the newsletter lives in the footer only.
- No semantic colours in chrome, no "No." numbers, no hero illustration on concept, fallacy or question pages.

**The one index template: `CollectionIndex`** (from `/fallacies` plus blog pagination)
- `AppShell` in the browse layout, the same header band as the article (eyebrow, serif H1, one-sentence lede).
- At most 6 neutral section chips that jump to anchors.
- Grouped compact rows: title, one-line description, read time, `min-h-11`. Images only on the blog index.
- `CollectionPagination` above 24 items. Content starts inside the first phone screen.
