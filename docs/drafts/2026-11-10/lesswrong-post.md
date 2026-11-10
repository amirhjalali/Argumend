<!--
DRAFT, 10 Nov 2026. Not posted. The founder posts by hand, as "Argumend", no founder name.

READ THIS BEFORE USING THE TEXT BELOW.

1. This text cannot be pasted into LessWrong, and it cannot be pasted and then edited.
   LessWrong's current policy counts "text that was written by an LLM and then edited or
   revised by a human" as LLM output, requires LLM output to sit in labelled LLM content
   blocks, auto-rejects posts that score high on its LLM detector, and says "For first-time
   users, we have closer to a zero-LLM policy". What it allows is "text written by a human,
   which includes facts, arguments, examples, etc, which were researched/discovered/developed
   with LLM assistance", with the warning that borrowed language no longer counts.
   Loaded 10 Nov 2026:
   https://web.archive.org/web/20261101160517/https://www.lesswrong.com/posts/nQWavk9mnwcv6ScMR/new-lesswrong-editor-also-an-update-to-our-llm-policy
   https://web.archive.org/web/20261019173407/https://www.lesswrong.com/posts/KXujJjnmP85u8eM6B/policy-for-llm-writing-on-lesswrong
   (the live lesswrong.com pages returned 403 to a script; check the live policy yourself.)
   So: treat this file as the argument, the order, the numbers and their sources. Write the
   sentences yourself. This draft was written by a language model.

2. Every number has a source comment beside it. Strip the comments before posting; keep
   the numbers exactly as they are.

3. Three paragraphs depend on things that are not true yet. Each is marked [FOUNDER].
   - The AI-risk paragraph is worded so it is true of both the page that is live today and
     the round-15 rewrite in PR #25. Re-read the live page before posting anyway.
   - The study is described as "written, not yet filed". The plan itself says the upload
     to OSF or AsPredicted "is what makes it a pre-registration"
     (docs/plans/2026-11-03-study-plan.md, "Consent and ethics"). Do not call it
     pre-registered until it is filed. If you file it first, change the sentence and link it.
   - The disclosure at the end has to be yours.

4. Links carry utm_source=lesswrong, utm_medium=post, utm_campaign=disttest1. All four
   URLs were loaded on 10 Nov 2026 and returned 200.

Length of the post body (title to sign-off; comments and [FOUNDER] notes excluded): 1,336 words. The brief was 900 to 1,400, so the disclosure you add has about 60 words of room.
-->

# A model put 88 of 114 debate turns under "not arguing the question": one pilot, its limits, and a habit that follows

<!-- Alternate titles:
  "Write down what would settle it: notes from mapping the AI argument"
  "Before the next round, name what would settle it"
  Do not use a title that says most of a debate is off topic. The count does not show that.
-->

**Epistemic status.** One pilot on one television clip, labelled by a model and not checked by hand. The habit in the second section is old (double crux, with the homework written down) and we are confident it is useful. Whether our maps help anyone is untested; the last section says what would tell us.

## The count

In September we took a 36-minute Piers Morgan Uncensored panel on trans athletes: 139 turns, 7,253 words. <!-- src: data/blog.ts, post "we-gave-a-model-that-cant-talk-1000-arguments", section "Thirty-six minutes, five voices, 3.5 million views" --> We merged consecutive turns by the same speaker and kept turns of at least 12 words, which left 114. <!-- src: data/blog.ts, same post, section "How the pilot count was produced" --> A classifier (TypeSafe AI's Jev, which returns typed answers with probabilities and no prose) then placed each turn on a section of our existing map of that question, or on "not an argument about the topic".

It put 88 of the 114 in that last bin. <!-- src: data/blog.ts, "How the pilot count was produced" --> The other 26 split 14 and 12 between two sections of the map. <!-- src: data/blog.ts, same section, next paragraph -->

The limits, before anyone quotes the number:

- The 88 include the host's questions, insults, and two long tangents. The count does not mean those turns were off topic or unhelpful. <!-- src: data/blog.ts, "How the pilot count was produced" -->
- The bin combined the model's "none" routing with a rule of ours: also exclude a turn when its fallacy score was at least 0.8 and its factual-claim score at most 0.2. <!-- src: same --> A different rule gives a different number.
- The transcript was auto-generated captions, and a language model assigned the speakers. <!-- src: data/blog.ts, section "Then we pointed it at Piers Morgan" --> Nobody validated the labels independently.
- It is one clip from a format built for heat. It is not an accuracy benchmark, and it is not evidence that Argumend improves a conversation. <!-- src: data/blog.ts, "How the pilot count was produced": "not independently validated counts, an accuracy benchmark, or evidence that Argumend improves conversations" -->

What we take from it is narrower than the number. The claim the evidence on that question turns on, whether hormone therapy sufficiently reduces the advantages of male puberty, was never argued as a claim. The panel went around it for twelve turns. <!-- src: data/blog.ts, same post, paragraph beginning "The claim gate is where it gets uncomfortable" -->

We have not run this on an AI debate. We expect the same shape there, and that is a guess.

## The habit

The useful part needs no tool. Before the next round of an argument, list its sub-questions and ask three things of each.

1. Does anyone here dispute it? If not, it is common ground. Write it down and move on.
2. What kind of question is it: a fact, a prediction, a definition, a value, or who gets to decide? <!-- src: app/methodology/page.tsx, "each marked as a question of fact, a prediction, a matter of values, a matter of definition, or a question of who decides" -->
3. What observation would settle it, and would either of you move if it came in? If nothing would, say so. That is also an answer.

The third is the one people skip. Three examples from our AI maps, picked because each gives a different answer to it.

**A definition.** "Will AI cause mass unemployment?" At least three definitions of the phrase are in live use: headline unemployment above 10%, a 15 to 20% crisis threshold, and a broader measure that counts participation, wages and underemployment. <!-- src: data/topics/drafts/ai-mass-unemployment.draft.json, node "c-mass-unemployment-definition-strict", statusBasis --> No evidence picks among them. As the map puts it, until somebody picks a metric, both sides can declare victory in 2041 using the same data. <!-- src: lib/argument/draftTopics.ts, cruxNotes["c-mass-unemployment-definition-strict"].soWhat --> The fix is one sentence: name the metric before the forecast.

**A hidden assumption.** Same map. U.S. unemployment was 4.2% in June 2026. <!-- src: data/topics/drafts/ai-mass-unemployment.draft.json, node "c-aggregate-unemployment-normal" --> A Stanford/ADP study found employment of 22 to 25-year-olds in the most AI-exposed occupations down 16% relative to less-exposed peers, 19% in its August 2026 update, and its authors call the pattern descriptive, not causal. <!-- src: lib/argument/draftTopics.ts, "ai-mass-unemployment" meta.hook --> Neither number is where the camps part: the map's own line is that attribution is the live fight, not the decline itself. <!-- src: lib/argument/draftTopics.ts, "ai-mass-unemployment" meta.takeaways[0] --> What they assume differently is this: when AI makes a firm more productive, does it hire fewer people, or sell more? The displacement forecasts assume the first, the "we've panicked before" case assumes the second, and each rests on its answer without testing it. <!-- src: lib/argument/draftTopics.ts, cruxNotes["c-firms-cut-hiring-not-output"].assumption --> This one is empirical. Firm-level panels linking AI adoption to headcount, output and pricing over several years would settle it. <!-- src: data/topics/drafts/ai-mass-unemployment.draft.json, node "c-firms-cut-hiring-not-output", resolution.condition -->

**A test only time can run.** [FOUNDER: re-read https://argumend.org/topics/ai-risk before posting.] On AI risk, both sides accept that models have behaved in rule-breaking or scheming-like ways in safety tests. The dispute is whether that behaviour persists, and grows with capability, once the test stops inviting it. What would settle it is the same tests run on successive model generations from several labs, with the goal nudges and planted cues removed. <!-- src: data/topics/ai-risk.ts, pillar "orthogonality-thesis", crux.methodology and crux.falsification.common_ground; the page live on 10 Nov 2026 words the same test as "Rerun the 2024 scheming evaluations on successive model generations from several labs with the goal nudges and planted cues removed" --> The map also writes down what each side would have to give up. If the behaviour fades once nothing rewards it, the case that capable AI seeks power by default loses its strongest evidence. If it keeps appearing in neutral tests and rises with capability, "it was only a test artifact" becomes hard to hold. <!-- src: data/topics/ai-risk.ts, crux "instrumental-convergence", falsification.supporter_flip and skeptic_flip -->

None of this says who is right. It sorts a disagreement into bets, vocabulary and values, which need different next steps.

## Where our own record is bad

We filed evidence by team. A side check across the 1,567 evidence cards the library had in September found three maps whose "for" and "against" labels had been written against the wrong framing of the claim: 11 of 17 cards on one, 8 of 12 on another, 6 of 8 on a third. <!-- src: data/blog.ts, same post, section "What the long clip taught us about the tool" --> The cards had been filed by who cites them, not by what they show. <!-- src: docs/plans/2026-09-22-north-star.md, table row "Argumend's own library" --> We corrected them.

A language model does not pick the same crux twice. We ran three debate transcripts through model-based extraction five times each on identical input. On two of the three, the top crux changed between runs. On the third it settled on a sentence nobody in the transcript disputed. <!-- src: data/blog.ts, same post, section "The problem we were trying to solve" --> The variance came from the model deciding which claims exist and whether each is contested; the ranking after it was deterministic. <!-- src: data/blog.ts, same section: "The ranking engine underneath is deterministic and auditable. The variance comes from the model above it" --> On the published maps that step happens once, at drafting, and is reviewed. It is still a judgment. <!-- src: app/methodology/page.tsx, section "Finding the cruxes": "One input is still a judgment: how contested each claim is, which is set when the map is drafted and reviewed" --> We also stopped printing a one-line reading of where each map's evidence tipped, because it read as a verdict. <!-- src: app/methodology/page.tsx, section "The reading we removed" -->

## What would change our mind

We do not know that reading a map does anything a good chatbot answer does not. A study plan was written on 3 November 2026. It has not been run. <!-- src: docs/plans/2026-11-03-study-plan.md, "Status: draft pre-registration, 3 Nov 2026. Not yet run." --> [FOUNDER: it is also not yet filed with a registry. Say so, or file it and link it.]

Three arms, one reading per participant: an Argumend map, a "both sides" answer written the way a capable chatbot answers, and a neutral news explainer, all built from the same facts. <!-- src: docs/plans/2026-11-03-study-plan.md, "Design" and "Stimuli" --> The outcome is how far off people are when they estimate what share of the other party agrees with a statement, after reading, adjusted for before. <!-- src: same file, "Primary outcome" --> The main study recruits 1,200 people after a pilot of 90, and the smallest effect we would call worth building on is d = 0.20. <!-- src: same file, "Power and sample size" -->

The decisions are written down before any data: <!-- src: same file, "Decision rules (written before any data)", rules 1, 3, 4, 5 -->

- If the map lowers charity toward the other party, or moves attitudes in a consistent direction, we stop promoting maps until we know why, whatever the main result.
- If the map is equivalent to the chatbot answer, or loses to it, the static maps are not the product and we stop adding to them.
- If the map does not beat the plain explainer, the same, more strongly.
- If the result is inconclusive, that is "not shown". It is not permission to continue.

Its weak points: we wrote the comparison texts ourselves; the topics are guns, immigration and trans athletes, so no AI map is in it; and one reading, measured minutes later, says nothing about whether an effect lasts. <!-- src: same file, "Threats to validity" and "Topics, and why these three" -->

## What we are asking

One thing. Pick a crux on one of the AI maps and tell us it is wrong: not the question the fight turns on, or paired with a settle condition that would move nobody.

- [The AI argument, on one page](https://argumend.org/ai?utm_source=lesswrong&utm_medium=post&utm_campaign=disttest1): the top cruxes from our two maps on AI and work, what would settle each, and a dated record of the evidence that has moved them. <!-- src: lib/argument/ledgerPool.ts, AI_MAP_TOPIC_IDS (two maps); app/ai/page.tsx, DESCRIPTION -->
- [Will AI cause mass unemployment?](https://argumend.org/topics/ai-mass-unemployment?utm_source=lesswrong&utm_medium=post&utm_campaign=disttest1)
- [The AI-risk map](https://argumend.org/topics/ai-risk?utm_source=lesswrong&utm_medium=post&utm_campaign=disttest1)
- [Method and limits of the count](https://argumend.org/blog/we-gave-a-model-that-cant-talk-1000-arguments?utm_source=lesswrong&utm_medium=post&utm_campaign=disttest1#how-the-pilot-count-was-produced)

**Disclosure.** [FOUNDER: write this yourself. The facts to cover: the maps are drafted and source-checked with language models, including models from labs these maps discuss, and then reviewed; say plainly how much of the AI-risk map a person has read against its sources. The repository records model-written rewrites and model-run fact-check passes on 3 Nov 2026 (docs/plans/2026-11-03-round15.md, "What landed"); the commits that rewrote and fact-checked data/topics/ai-risk.ts carry a model co-author line (git log 4b4026b3, a5e2cbc5); the live methodology page says a language model drafts the first version of a four-position map and that each draft is audited before it is published. Do not imply more human review than happened.]

*Argumend*
