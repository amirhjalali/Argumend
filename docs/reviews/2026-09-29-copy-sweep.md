# Copy sweep, 2026-09-29

Branch `ux/copy-sweep`, cut from `ux/site-overhaul-2026-09-29` at `e82830c`. Scope: the words in the
content data files, so that every page describes the product that ships: maps built around cruxes
and "what would settle it", a reading of the evidence (largely converges / still divided / still
thin) instead of a verdict, a paste tool that never says who is right, saved maps in the browser,
no judges, no sign-in. Findings addressed: F1, F2, F5, F12 in
`docs/reviews/2026-09-29-site-review/4-content.md`; F3 (FAQ) and F10 (voice) in `1-vision-shell.md`.

Guards added so this does not drift back: `data/faqs.test.ts`, `data/guides.test.ts` and
`data/blog.test.ts` now fail on "judge council / multi-judge / AI judges / confidence score(s)",
graph-first map descriptions, "settled" in the same sentence as a map link, and links to the `/is`
verdict directory.

## data/faqs.ts (73 questions → 14)

Kinds of change: every answer rewritten against the current product; about 50 glossary and advice
questions removed; the one link per answer now goes to a real next step.

The 14: What is Argumend · What is a crux · Why doesn't Argumend say who is right · How is evidence
weighed, and where does it come from · What do "largely converges", "still divided" and "still thin"
mean · What does the paste tool do · What happens to the text I paste · Who makes the maps, and how
is AI used · How are maps kept up to date · Is Argumend biased · How do I suggest a correction or a
new map · Can I save maps · Is Argumend free · Can I use Argumend in a classroom.

Where the removed reference questions went:
- Already covered by `/glossary` or `/fallacies`, so dropped: argument mapping, steel-manning,
  verification status, Bayesian reasoning, epistemic humility, logical fallacy, ad hominem, straw
  man, false dichotomy, correlation vs causation, confirmation bias, appeal to authority,
  whataboutism, slippery slope, burden of proof, red herring, circular reasoning, cherry-picking,
  principle of charity, motivated reasoning, Occam's razor, Gish gallop, motte-and-bailey, sunk
  cost, hasty generalization.
- Not covered, so moved into `data/glossaryPageTerms.ts` (with icons in `lib/glossaryMeta.ts`):
  Facts and Values, Validity and Soundness, Deductive and Inductive Reasoning, Anecdotal Evidence,
  Denialism (skepticism vs denialism), Cognitive Bias (fallacy vs bias), False Equivalence, Fallacy
  Fallacy.
- Folded into a product answer: crux vs key question (into "What is a crux"), confidence vs
  consensus (into the converges/divided/thin answer).
- Advice questions dropped outright (the guides cover them): improve critical thinking, argument vs
  debate, how to tell if an argument is good, change someone's mind, strongest argument for or
  against, argument map vs mind map, and "How do I win an argument?".

Examples:
- "How does the AI judge council work? … Every judge scores the arguments…" → removed; "Who makes
  the maps, and how is AI used?" now says maps are drafted with AI help and edited by people, legacy
  maps were hand-scored, flagship scores were model-drafted with a written reason, and a proposed
  crux move needs review before it is published.
- "Is Argumend free? … You only need to sign in if you want to save your own analyses." → "Yes. The
  maps and the paste tool are free, and you don't need an account to use either." Plus a separate
  "Can I save maps?" (in this browser, on this device, no account).
- "Why only three pillars per topic? … would settle the broader question" → removed (maps have two
  to five pillars, and the flagships have none).
- "How do I read an argument map? Each topic opens as an interactive graph." → removed; the guide
  now covers it, and "What is Argumend?" describes a map as a page.
- "What happens to my analyzed text? … (positions, cruxes, fallacies, and scores) is saved" → "It is
  sent to an AI model to be read, and it is not stored … If you choose to publish a report, it is
  saved at an unlisted link together with the short quotes it uses."

## data/glossaryPageTerms.ts, data/glossaryTerms.ts, lib/glossaryMeta.ts

Kinds of change: the "Confidence Score" headword and its product framing, the fixed pillar count,
examples that promised fallacy detection or calibrated percentages, and "analysis/topic/debate"
used for a map.
- Headword "Confidence Score" → "Balance and Weight" (definition now ends "Neither number is the
  probability that a claim is true, and neither names a winner"). The tooltip entry keeps
  `confidence score` as an alias. The icon key in `lib/glossaryMeta.ts` is renamed to match.
- Pillar: "Each Argumend topic is structured around three pillars" → "Most Argumend maps are
  organized into two to five pillars".
- Epistemic Humility: "exactly what a calibrated confidence score expresses: '60% confident, and
  here is why'" → "'The evidence is still divided, and here is what would settle it' is more honest
  than manufactured certainty."
- Calibration example: "Read confidence as probability on the AI Risk topic" → "See uncertainty
  stated plainly on the AI Risk map".
- 32 example links: "…on our Moon Landing analysis" / "…on the Gene Editing topic" → "…map".
- `lib/glossaryMeta.ts` (outside the owned list, touched only because its test asserts one icon per
  term): 8 icon entries for the moved terms, the renamed key, and the methodology chapter blurb
  "How Argumend turns a pile of sources into a number you can argue with." → "How a map weighs its
  sources and describes the state of the evidence."

## data/concepts.ts

- `evidence-weighting` key point "Multiple AI judges score independently to reduce individual
  model bias" → "The same four questions are asked of every card, whichever side it helps".
- `confidence-calibration` (slug kept): title "Balance & Weight Calibration" → "Balance and
  weight"; adds the eight-card / one-flip guard and "None of this names a winner".
- `pillars`: "Each topic is broken into exactly three pillars" → "usually two to five".
- `fallacies`: "Argumend's AI pipeline includes automatic fallacy detection… the system flags it"
  → the paste tool deliberately does not label fallacies; the catalogue is for readers.
- `cruxes`: now mentions supporter/skeptic flips and the dated ledger on the flagship AI maps.
- Titles in sentence case ("Steel-manning", "Evidence weighting", "Logical fallacies").

## data/research.ts

- "Our calibrated confidence scores draw directly from Tetlock's research" → "Tetlock's research on
  superforecasting shaped how our maps talk about uncertainty. Instead of a verdict or a single
  percentage, a map says whether the evidence largely converges, is still divided, or is still
  thin, and flags a reading that one evidence card could overturn".
- Section titles in sentence case.

## data/guides.ts (ids unchanged)

Kinds of change: two guides rewritten; every "confidence score", "evidence node" and
"reliability indicator" in the other guides pointed at what the maps show; "debate" as a name for
an Argumend map changed to "map"; 206 titles and headings in sentence case (separate commit
`a5976b3`, revertable on its own).
- `how-to-read-an-argument-map`: was a graph tour (central topic node, colour-coded pillars, green
  and red connection lines, verification badges on evidence, "every major node displays two
  scores", diamond crux icons). Now: the map is a page; the Read / Graph control opens the
  secondary view; pillars hold both sides; cards show Supports/Against, a weight word and a
  source; cruxes carry supporter/skeptic flips and "what would settle it"; the reading comes after
  the first crux, with the eight-card / one-flip guard; "None of these readings names a winner."
- `running-your-first-analysis`: the "AI Judge Council" section, the account-only saving, the
  exports and the "personal library" are gone. Rewritten for the paste tool: what to paste, the
  consent line, the report (positions, what they agree on, what it turns on, what is at stake and
  what could move it), "What the report will not tell you" (no fact-check, no motives, no fallacy
  labels, no winner), and unlisted sharing.
- `reading-confidence-like-a-forecaster`: "What a Confidence Score Actually Says" ("A confidence
  score of 85 does not mean…") → "What a map's reading actually says" ("When a map says the evidence
  'largely converges on the claim,' it does not mean 'this is certainly true'… The map deliberately
  gives you no percentage to bet on").
- `bayesian-thinking`: "Argumend's confidence scores are designed with calibration in mind. A score
  of 75 means…" → "'The evidence leans toward the claim' is a weaker statement than 'the evidence
  largely converges', and a map says which one it means."
- `argument-audit`: "Argumend uses a 0-100 scale" → "A 0-100 scale works well, and you can use it
  for any claim you evaluate" (the scale is the reader's, not the product's).

## data/blog.ts (+ data/blogIndex.ts mirror; slugs unchanged)

53 edited passages across more than 30 posts. Kinds of change: judge-council and confidence-score
claims; "settled" next to a map that reads "still divided"; "interactive graph" endings; endings
that sent readers to the `/is` verdict directory now name the relevant map and the paste tool
(`/analyze`).
- AI in debate: section "Argumend's Multi-Judge Approach" (four AI judges, a meta-analysis layer,
  "source verification… hallucinated citations are caught") → "How Argumend uses AI" (people edit
  maps; legacy weights hand-scored, flagship weights model-drafted with a written basis; ledger
  moves need review; the paste tool reads only your text and never says who is right).
- Fact or value?: "Nuclear energy… safety is [about as settled as these things
  get](/topics/nuclear-energy-safety)" → "On safety the evidence is strong and consistent… The
  [nuclear map] still reads 'evidence still divided', because its question is whether to expand
  nuclear power".
- Are GMOs safe?: "## Question 1: … (Yes — and this part is settled)" → "(The evidence largely
  converges on yes)", plus a line explaining why the GMO map as a whole reads "still divided".
  Description changed the same way (mirrored in `blogIndex.ts`).
- Dunning-Kruger: "our multi-judge analysis… When a topic shows a confidence score of 75%… Argumend
  provides an external calibration benchmark" → maps weigh evidence card by card; "If you are
  certain about a question where the map says the evidence is still divided, that gap is a signal
  worth investigating."
- The Jev post's last line now points to the paste tool and to "Will AI cause mass unemployment?"
  (`/topics/ai-mass-unemployment`). "How Confidence Scores Change the Way You Think" is retitled "How
  calibrated confidence changes the way you think", so the Jev post's computed Related reading no
  longer advertises confidence scores. That list is scored in `app/blog/[slug]/page.tsx`, which is
  not a data file, so the post may still appear there.

## Left for the founder or for other owners

1. **`how-confidence-scores-change-thinking`** (post). Its premise is personal calibration, which
   still stands, and its Argumend section is corrected, but the slug still says "confidence
   scores". Recommendation: keep the post under its new title for now, and 301 it to
   `/concepts/confidence-calibration` when the learn hub lands (F2 fix 3).
2. **`ai-in-debate-promise-and-pitfalls`**. The retired judge council was the post's answer to
   its own question. It now has a true replacement section, but the rest of the post still reads
   as a 2026-02 pitch ("AI debate tools…"). Recommendation: keep it with the rewritten section; if
   the founder would rather not carry it, 301 it to the Jev post.
3. **`reading-confidence-like-a-forecaster`** (guide). Rewritten to be about the reader's own
   calibration and how to read a map's reading. It still overlaps the concept page. Merge it when
   `/learn` is built.
4. **Blog title case.** 85 of the 86 posts keep Title Case titles and H2s. Changing them affects
   SEO titles and needs a proper-noun review, so it is left as a founder decision. Guides and
   concepts are now sentence case.
5. **"The defensible position on X is…"** endings on the minimum wage, universal healthcare and
   student debt posts read like verdicts in the blog's own voice. They make no false product claim,
   so they were left alone. Worth a voice decision.
6. **Outside the owned files, still stale:**
   - `app/faq/layout.tsx` metadata ("logical fallacies in debates", "how argument mapping differs
     from debate forums") and the FAQ page's footer. The FAQ is now product-only, so the
     description should say so.
   - `app/glossary/layout.tsx` metadata still lists "confidence scores". The glossary page should
     keep a `#confidence-score` alias anchor on the Balance and Weight entry, because the headword
     rename changed its anchor to `#balance-and-weight`.
   - `app/for-educators/page.tsx` lessons ("assign a confidence score (0–100%)"; lesson 05 ends
     with a class vote on the winning team, per F12) and worksheet heading "7. Your Confidence
     Score".
   - `data/moltbook-lessons.ts` ("What if confidence scores had consequences?").
   - `app/topics/[id]/TopicDetailView.tsx` still renders `JudgingResults` from `getMockVerdict`
     for some topics. Check whether any public map still shows a judge panel.
   - `/methodology`, `/about`, `/how-it-works`, `/is` (F1, F3): owned by the page agents.
7. **`/analyze` copy.** The rewritten paste-tool guide and the FAQ describe the paste tool the
   brief specifies (Conversation / Article / Freeform, "Find what it turns on", no fallacy
   labels). Today's `/analyze` page is still the older tool until the planned constant repoints
   it, so the guide is ahead of that page until then.
