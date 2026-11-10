# Show HN: title and first comment

> DRAFT, 10 Nov 2026. Not posted. The founder posts by hand.

## Read before posting

Hacker News's guidelines say "Please don't put generated text in HN posts. Write your text yourself" and, for comments, "Don't post generated text or AI-edited text." (https://news.ycombinator.com/newsguidelines.html, loaded 10 Nov 2026.) The comment below was written by a language model. Use it as a list of what to say and in what order, then write it yourself.

The Show HN rules (https://news.ycombinator.com/showhn.html, loaded 10 Nov 2026) shape what is submitted:

- Show HN is "for something you've made that other people can play with". Blog posts and "other reading material" are off topic. So the submission is the paste tool at `/analyze`, not the maps and not the blog post.
- "The project must be something you've worked on personally and which you're around to discuss." Post only on a day you can answer comments for several hours.
- "Please make it easy for users to try your thing out, ideally without barriers such as signups or emails." `/analyze` needs no account.
- "Please don't ask friends to upvote or comment." Nobody is told the post is up.
- If a title includes the site's name, the guidelines ask you to take it out. The titles below leave it out.

One thing to decide first: the site footer links to a GitHub repository under a personal username (`lib/nav.ts`, `GITHUB_URL`; the link is in the live footer). Show HN readers click that link. If the brand is to stay anonymous, deal with the link before posting.

## URL to submit

```
https://argumend.org/analyze?utm_source=hackernews&utm_medium=show&utm_campaign=disttest1
```

Loaded 10 Nov 2026, returned 200. If the parameters are removed after submission, the referrer still identifies the channel (see `test-plan.md`).

## Title

```
Show HN: Paste an argument, see which question it turns on
```
<!-- 58 characters. -->

Alternates:

```
Show HN: Paste an argument and find the question it turns on, no model call
```
<!-- 75 characters. "No model call": app/api/analyze/route.ts, header comment, "a keyword index over the maps held in memory, no network, no model". -->

```
Show HN: A paste box that finds what an argument turns on, never who won
```
<!-- 72 characters. -->

## First comment

```
We kept reading arguments that were not about the question in their title, so we built a paste box.

Paste a thread, an article or your own draft. It tells you which of our maps the argument is already on, the question that map says it turns on, what would change each side's mind, and evidence to read on each side. It never says who is right. There is an example button if you have nothing to hand.

How it works: no model call. The text is matched against a keyword index of the maps, held in memory on our server. Nothing about the text is stored or logged. No account.

Limits: it only knows the questions we have mapped, a little over 150, so many pastes get no map. It matches a subject and does not check your logic. The maps are drafted with language models, then audited, and can be wrong.

We have not shown that reading a map helps anyone. A study comparing a map with a chatbot answer and a news explainer is designed, not yet run.

Paste something real and tell us where it landed on the wrong map or the wrong question.
```

<!-- Word count of the comment: 198. Brief: under 200. -->

Sources for each claim in the comment:

<!-- "which of our maps ... the question ... what would change each side's mind ... evidence to read on each side": components/paste/MapResult.tsx, header comment ("its title and claim, the question its crux asks with what would change each side's mind, and the evidence to explore on each side") -->
<!-- "It never says who is right": live /analyze page text, loaded 10 Nov 2026 ("It never says who is right."); app/api/analyze/route.ts header comment -->
<!-- "example button": live /analyze page, "See an example", loaded 10 Nov 2026 -->
<!-- "no model call ... keyword index ... held in memory ... Nothing ... stored or logged": app/api/analyze/route.ts, header comment -->
<!-- "No account": app/api/analyze/route.ts has no auth check; the live page shows no sign-in -->
<!-- "a little over 150": data/topicIndex.ts, MAP_COUNT_LABEL ("150+"); the live home page showed "All 155 maps" on 10 Nov 2026 -->
<!-- "drafted with language models and then audited": live /methodology page, section "Positions and evidence", says this of the four-position maps. For the two-sided maps the record is docs/plans/2026-11-03-round15.md, "What landed" (model-written rewrites, model-run fact-check passes). Say only what is true of the review that actually happened. -->
<!-- "A study ... designed and not yet run": docs/plans/2026-11-03-study-plan.md, "Status: draft pre-registration, 3 Nov 2026. Not yet run." and "Design" -->

## Facts to have ready for the thread

Answer from these. Do not paste them.

- Paste limits: up to 20,000 characters; 60 requests an hour per address. <!-- src: lib/disagreement/constants.ts, maxSourceCharacters: 20_000; app/api/analyze/route.ts, rateLimit maxRequests: 60, windowMs one hour -->
- What is off and must not be described as available: the six-box disagreement diagnosis, the Jev map-reply tool at `/reply`, and the study at `/study`. <!-- src: CLAUDE.md, "Runtime Feature Flags"; /reply and /study returned 404 on 10 Nov 2026 -->
- If asked "why not just ask a chatbot": the honest answer is that we do not know yet that a map does better, and the study is designed to find out. Its decision rule says that if the map is equivalent to the chatbot answer or loses to it, "the static maps aren't the product". <!-- src: docs/plans/2026-11-03-study-plan.md, "Decision rules", rule 3 -->
- If asked how a map is made: https://argumend.org/methodology?utm_source=hackernews&utm_medium=comment&utm_campaign=disttest1 (loaded 10 Nov 2026, 200).
- If asked for an example map: https://argumend.org/topics/ai-mass-unemployment?utm_source=hackernews&utm_medium=comment&utm_campaign=disttest1 (loaded 10 Nov 2026, 200).
- If someone reports a wrong match or a wrong card: thank them, log it in the test log, fix it, and reply once it is fixed. Do not argue the point in the thread.
