# X threads: three alternatives

> DRAFT, 10 Nov 2026. Not posted. The founder posts by hand from the Argumend account. Voice: "we", no founder name. Tagline if a bio needs one: "Disagree better."

Post one thread in the test, not three (`test-plan.md` says which and when). The other two are held.

Rules that apply to all three:

- The first post stands alone. The link is only in the last post.
- No hashtags, no quote-posts, no replies that correct a named person, no winner.
- Each post is under 280 characters, counted with the full link. The count is under each post.
- Each number has a source comment under the post. The comments are not part of the post.
- All three links were loaded on 10 Nov 2026 and returned 200.

Which thread depends on what:

| Thread | Subject | Lands on | Safe to post today? |
| --- | --- | --- | --- |
| A | The pilot count | the blog post's method section | Yes. The post and its limits paragraph are live. |
| B | AI and jobs | `/topics/ai-mass-unemployment` | Yes. Every quoted line is on the live page. |
| C | AI risk, three tests | `/topics/ai-risk` | No. Posts 2 to 6 quote the round-15 rewrite (PR #25). Wait for the deploy, then check the page's three crux questions against the posts. |

---

## Thread A: the pilot count (6 posts)

**A1**

```
We ran one 36-minute TV debate through a classifier and asked of each turn: is this arguing the question in the title?

Of 114 turns, it put 88 under "not an argument about the topic".

One pilot, labelled by a model, not validated by hand.
```
<!-- 36 minutes, 114 analyzed turns, 88: data/blog.ts, post "we-gave-a-model-that-cant-talk-1000-arguments", sections "Thirty-six minutes, five voices, 3.5 million views" and "How the pilot count was produced" -->

**A2**

```
What the 88 does not mean: that those turns were off topic or useless. They include the host's questions, insults and two long tangents.

The cutoff was a rule we chose. A different rule gives a different number.

One clip. Not an accuracy benchmark.
```
<!-- src: data/blog.ts, "How the pilot count was produced": "It does not mean that all 88 turns were off topic or unhelpful"; the rule is fallacy score at least 0.8 and factual-claim score at most 0.2; "not independently validated counts, an accuracy benchmark, or evidence that Argumend improves conversations" -->

**A3**

```
The other 26 turns split between two sections of our map of that question: 14 on inclusion and dignity, 12 on retained physical advantage.

Two sub-questions, taken up in about equal measure.
```
<!-- 26, 14, 12 and the two section names ("Inclusion, Dignity and Anti-Discrimination", "Retained Physiological Advantages"): data/blog.ts, same section, paragraph beginning "The remaining 26 turns" -->

**A4**

```
The claim the evidence on that question turns on was never argued as a claim.

The panel went around it for twelve turns.
```
<!-- src: data/blog.ts, same post, paragraph beginning "The claim gate is where it gets uncomfortable": "nobody on the panel argued it as a claim. They argued around it for twelve turns." -->

**A5**

```
What we take from it, and you can do it by hand: before the next round of an argument, write down what would settle it.

If nothing would, it is a definition or a value, and more facts will not end it.
```

**A6**

```
How the count was made, the rule we used, and every limit:

https://argumend.org/blog/we-gave-a-model-that-cant-talk-1000-arguments?utm_source=x&utm_medium=social&utm_campaign=disttest1&utm_content=thread-a#how-the-pilot-count-was-produced
```
<!-- A6 is short because the tagged link with its #anchor is long; the post has to stay under 280 with the link counted in full. -->

---

## Thread B: AI and jobs (7 posts)

**B1**

```
U.S. unemployment was 4.2% in June 2026.

A November 2025 Stanford/ADP study found employment of 22-25-year-olds in the most AI-exposed jobs down 16% relative to less-exposed peers.

Both numbers are true. The argument over AI and jobs is the gap between them.
```
<!-- 4.2%, 16%: lib/argument/draftTopics.ts, "ai-mass-unemployment" meta.shareCard and meta.hook. "Both numbers are true. The whole fight is the gap between them." is shareCard.line -->

**B2**

```
The study's authors call the pattern descriptive, not causal. Its August 2026 update puts the gap at 19% and finds no widespread economy-wide displacement.

So the fight is over what the numbers mean. It turns on five questions.
```
<!-- 19%, "descriptive patterns, not causal estimates", "no widespread economy-wide displacement": lib/argument/draftTopics.ts, meta.hook. Five questions: meta.tldr -->

**B3**

```
The first: when AI makes a firm more productive, does it hire fewer people, or sell more?

Displacement forecasts assume "hire fewer". The "we've panicked before" case assumes "sell more". Each rests on its answer without testing it.
```
<!-- src: data/topics/drafts/ai-mass-unemployment.draft.json, node "c-firms-cut-hiring-not-output", summary; lib/argument/draftTopics.ts, cruxNotes["c-firms-cut-hiring-not-output"].assumption -->

**B4**

```
What would settle it: firm-level panels linking AI adoption to headcount, output and pricing over several years.

That is a question evidence can answer. It has not answered it yet.
```
<!-- src: data/topics/drafts/ai-mass-unemployment.draft.json, same node, resolution.condition; status "contested" -->

**B5**

```
The fourth is different. What counts as "mass unemployment"?

At least three definitions are in use: unemployment above 10%, a 15-20% crisis, or a broader measure that counts wages and participation.

No evidence picks among them.
```
<!-- three definitions, 10%, 15-20%: data/topics/drafts/ai-mass-unemployment.draft.json, node "c-mass-unemployment-definition-strict", statusBasis; resolution.kind "definitional-choice". It is fourth of five on the live page (loaded 10 Nov 2026). -->

**B6**

```
Until somebody picks a metric, both sides can declare victory in 2041 using the same data.

If you argue about this, name your metric first.
```
<!-- src: lib/argument/draftTopics.ts, cruxNotes["c-mass-unemployment-definition-strict"].soWhat -->

**B7**

```
All five questions, what would settle each, and a dated record of the evidence that has moved them. It does not say who is right:

https://argumend.org/topics/ai-mass-unemployment?utm_source=x&utm_medium=social&utm_campaign=disttest1&utm_content=thread-b
```

---

## Thread C: AI risk, three tests (7 posts)

Post only after PR #25 is live. Check first that the three questions on `https://argumend.org/topics/ai-risk` match posts C2, C4 and C5.

**C1**

```
Most arguments about AI risk skip one step: saying what result would change your mind.

Here are three tests. For each, what the worried side and the skeptical side would each have to concede.
```
<!-- three cruxes: data/topics/ai-risk.ts, pillars "orthogonality-thesis", "alignment-problem", "preparation-window" -->

**C2**

```
1. The escape test.

As AI gets more capable, does it dodge oversight and break out of tests more often, even when nothing invites it?

Run the same tests on each model generation, goal nudges removed, normal safeguards on.
```
<!-- src: data/topics/ai-risk.ts, crux "instrumental-convergence", question and settle.condition -->

**C3**

```
If the attempts fade once nothing rewards them, the case that capable AI seeks power by default loses its strongest evidence.

If they persist in neutral tests and rise with capability, "it was only a test bug" is hard to hold.
```
<!-- src: data/topics/ai-risk.ts, crux "instrumental-convergence", falsification.supporter_flip and skeptic_flip -->

**C4**

```
2. The watched-or-not test.

Do models behave better when they can tell they are being tested?

Compare an obvious test with a scenario built to pass for real use. Same behaviour in both: test results can be trusted. A gap that grows: they cannot.
```
<!-- src: data/topics/ai-risk.ts, crux "deceptive-alignment", question, settle.condition, falsification -->

**C5**

```
3. The pace test.

Can safety checks keep up once AI does much of the work of building its successors?

Evidence: outside evaluators' reports on whether checks on one model generation finished before the next one began.
```
<!-- src: data/topics/ai-risk.ts, crux "alignment-capability-gap", question and settle.condition -->

**C6**

```
Both sides already accept more than the argument suggests: some frontier models have broken out of test environments, and safety training cuts scheming in tests and in ordinary use.

The dispute is over what that predicts.
```
<!-- src: data/topics/ai-risk.ts, falsification.common_ground on cruxes "instrumental-convergence" and "deceptive-alignment" -->

**C7**

```
The map, with the evidence each side reads and what would settle each question. It does not name a winner:

https://argumend.org/topics/ai-risk?utm_source=x&utm_medium=social&utm_campaign=disttest1&utm_content=thread-c
```
