# Two-week distribution test: protocol

> DRAFT, 10 Nov 2026. Nothing here has been posted or sent. The founder posts everything by hand, as "Argumend", with no founder name. Change any rule you like before Day 1. Change none after.

Argumend has never run a distribution test. This one asks a narrow question of the audience already chosen, people who argue about AI: **shown a map cold, does anyone open it, and does anyone answer on the substance of a crux?**

It cannot show that a map helps a reader. That is the study's job (`docs/plans/2026-11-03-study-plan.md`), and the study's own decision rule 2 names "a distribution test (does anyone choose to read one?)" as a separate step.

**Two kinds of number appear below.** A fact carries a source comment beside it. A protocol choice (a day, a floor, a count of posts) is marked *(choice)*. Choices trace to nothing. They are proposals, set low on purpose so that missing one means nobody engaged, not that fewer did than hoped.

The other four files in this folder hold the material: `lesswrong-post.md`, `x-thread.md`, `hn-show.md`, `gatekeeper-notes.md`.

---

## 1. Before Day 1

Each row is a blocker for the channel named. Nothing is posted on a channel until its rows are done.

| # | Do this | Blocks | Why |
| --- | --- | --- | --- |
| 1 | Write the LessWrong post yourself from `lesswrong-post.md`. Do not paste it, and do not paste it and edit. | LessWrong | LessWrong's policy counts text written by a model and then edited by a person as LLM output and says first-time users are held close to zero. Quotes and archive links are at the top of `lesswrong-post.md`. |
| 2 | Write the Show HN comment yourself from `hn-show.md`. | Hacker News | The site guidelines say "Please don't put generated text in HN posts." Quotes and links are in `hn-show.md`. |
| 3 | Decide what the post says about the study's status. The plan is a draft: its own text says the upload to OSF or AsPredicted "is what makes it a pre-registration", and its deviations log and freeze record are empty. <!-- src: docs/plans/2026-11-03-study-plan.md, "Consent and ethics" and "Deviations log" --> Either file it and link it, or say "written, not yet filed". | LessWrong | Calling it pre-registered before it is filed is the one sentence in the post a reader can check and find false. |
| 4 | Write the disclosure in the LessWrong post: who or what drafted and checked the AI maps. | LessWrong | The commits that rewrote and fact-checked `data/topics/ai-risk.ts` carry a model co-author line (git log `4b4026b3`, `a5e2cbc5`). The live methodology page says of the two-sided maps that each crux is "written by the editors". A reader of an AI-risk map will ask. |
| 5 | Decide about the GitHub link in the site footer. It points to a repository under a personal username. <!-- src: lib/nav.ts, GITHUB_URL; the link was in the live footer on 10 Nov 2026 --> | Hacker News, LessWrong | The brand is meant to be anonymous. Readers from both sites click repository links. |
| 6 | Confirm the X account exists, and write its handle and follower count in the log. | X | No file in this repository records that the account was created. `docs/marketing/2026-09-21-social-launch-kit.md` lists handle candidates "to check". With no followers the thread tests nothing (see the X rule in section 5). |
| 7 | Decide whether round 15 (PR #25) deploys before Day 0 or after Day 14. Not during. | all | A deploy inside a 72-hour window changes the page under test. On 10 Nov 2026 round 15 was not live: `/blog/what-the-ai-safety-evidence-of-2026-shows` returned 404, and `/topics/ai-risk` still carried its older title. Only thread C in `x-thread.md` needs round 15. Everything else is worded to be true of the pages live today. |
| 8 | Take the baseline (section 4, Day 0). | all | Without it a rise cannot be told from an ordinary day. |
| 9 | Optional, and a founder decision already pending in `docs/ANALYTICS.md`: turn on a cookieless analytics provider before Day 0. | none | Without one the test can count visits and nothing after the visit. See section 4. |

Maps the test links to: `ai-mass-unemployment`, `capitalism-after-ai`, `ai-risk`, `open-weight-ai-models`. In replies, link only these or another AI map rewritten and fact-checked in round 15. Do not link a map on the "not yet audited" list in `docs/plans/2026-11-03-round15.md` (it includes `consciousness-ai-systems`, `ai-2027`, `ai-content-labeling`, `generative-ai-art-copyright` and `autonomous-weapons-ban`) until the lead confirms its audit is finished.

---

## 2. Channels, in order, one at a time

"One at a time" means each public channel gets its own 72-hour window in which nothing else public is posted. *(choice)*

| Order | Channel | What is posted | Lands on | Why this order |
| --- | --- | --- | --- | --- |
| 1 | LessWrong | one post | `/ai`, two maps, the blog post's method section | The chosen first audience. Later channels can point to it. |
| 2 | Notes | four private notes | one map each | Private, so they do not disturb a public window. Counted by replies, not visits. |
| 3 | X | one thread of the three (thread B) | `/topics/ai-mass-unemployment` | Thread B is true of the live page today and matches what the home page leads with. |
| 4 | Hacker News | one Show HN | `/analyze` | The only thing on the site a reader can try, which is what Show HN is for. Broadest audience, so it goes last. |

### Exact URLs

Parameters: `utm_source`, `utm_medium`, `utm_campaign`, and `utm_content` where one channel has variants. All four are on the allow-list in `lib/analyticsConfig.ts` (`ANALYTICS_URL_PARAMS`), checked 10 Nov 2026. The campaign value is `disttest1` everywhere. *(choice)*

Every URL below was loaded on 10 Nov 2026 and returned 200 with no redirect.

**LessWrong** (`utm_source=lesswrong`, `utm_medium=post`)

```
https://argumend.org/ai?utm_source=lesswrong&utm_medium=post&utm_campaign=disttest1
https://argumend.org/topics/ai-mass-unemployment?utm_source=lesswrong&utm_medium=post&utm_campaign=disttest1
https://argumend.org/topics/ai-risk?utm_source=lesswrong&utm_medium=post&utm_campaign=disttest1
https://argumend.org/blog/we-gave-a-model-that-cant-talk-1000-arguments?utm_source=lesswrong&utm_medium=post&utm_campaign=disttest1#how-the-pilot-count-was-produced
```

For answering a question about method in the comments:

```
https://argumend.org/methodology?utm_source=lesswrong&utm_medium=post&utm_campaign=disttest1
```

**X** (`utm_source=x`, `utm_medium=social`, `utm_content` names the thread)

```
https://argumend.org/topics/ai-mass-unemployment?utm_source=x&utm_medium=social&utm_campaign=disttest1&utm_content=thread-b
```

Held, not posted in this test:

```
https://argumend.org/blog/we-gave-a-model-that-cant-talk-1000-arguments?utm_source=x&utm_medium=social&utm_campaign=disttest1&utm_content=thread-a#how-the-pilot-count-was-produced
https://argumend.org/topics/ai-risk?utm_source=x&utm_medium=social&utm_campaign=disttest1&utm_content=thread-c
```

**Hacker News** (`utm_source=hackernews`; `utm_medium=show` for the submission, `comment` for links in replies)

```
https://argumend.org/analyze?utm_source=hackernews&utm_medium=show&utm_campaign=disttest1
https://argumend.org/topics/ai-mass-unemployment?utm_source=hackernews&utm_medium=comment&utm_campaign=disttest1
https://argumend.org/methodology?utm_source=hackernews&utm_medium=comment&utm_campaign=disttest1
```

**Notes** (`utm_source=email`, `utm_medium=note`, `utm_content` names the note)

```
https://argumend.org/topics/ai-mass-unemployment?utm_source=email&utm_medium=note&utm_campaign=disttest1&utm_content=n1
https://argumend.org/topics/capitalism-after-ai?utm_source=email&utm_medium=note&utm_campaign=disttest1&utm_content=n2
https://argumend.org/topics/ai-risk?utm_source=email&utm_medium=note&utm_campaign=disttest1&utm_content=n3
https://argumend.org/topics/open-weight-ai-models?utm_source=email&utm_medium=note&utm_campaign=disttest1&utm_content=n4
```

### What the parameters do today

Be clear about this before relying on them. The allow-list in `lib/analyticsConfig.ts` decides what Argumend's own analytics code may send to Google Analytics, Plausible or Umami. None of those is configured in production, and no event has ever been recorded. <!-- src: docs/ANALYTICS.md, "Where things stand (audited 2026-11-03)" --> The only analytics running is Cloudflare Web Analytics, which the repository describes as showing "visits, page views, top pages and referrers" and which cannot count custom events. <!-- src: docs/ANALYTICS.md, same section --> Nothing in this repository says whether that dashboard shows query strings.

So the plan does not depend on the parameters being visible. Attribution rests on three things Cloudflare is documented to show: the referrer, the landing path, and the date. The parameters are carried so that the same links work unchanged once a provider is on. One caution if Umami is the provider chosen: its loader is set to exclude query strings, so it would drop them. <!-- src: docs/ANALYTICS.md, "Turning it on in Coolify", Umami: data-exclude-search="true" -->

---

## 3. Calendar

Day 1 is a Tuesday. *(choice)* Weekends carry no posts. *(choice)*

Suggested dates: Day 0 on Monday 30 November 2026, Day 14 on Monday 14 December. Starting on 17 November instead would put the Show HN on US Thanksgiving, 26 November. The later start also leaves time for rows 1 to 7 of section 1.

| Day | Weekday | Post or send | Read and decide |
| --- | --- | --- | --- |
| 0 | Mon | Nothing. | Baseline read. Tagged-URL check. Start the log. |
| 1 | Tue | **LessWrong post.** | |
| 2 | Wed | Answer LessWrong comments, in your own words. | |
| 3 | Thu | Answer LessWrong comments. | |
| 4 | Fri | Notes 1 and 2, one in the morning, one in the afternoon. | **LessWrong 72-hour read and decision**, before the notes go. |
| 5 | Sat | Nothing. | |
| 6 | Sun | Nothing. | |
| 7 | Mon | **X thread B**, all seven posts in one sitting. | |
| 8 | Tue | Notes 3 and 4. Answer replies on X. | LessWrong 7-day read, for the log only. |
| 9 | Wed | Answer replies on X. | |
| 10 | Thu | **Show HN**, after the X read. Stay with the thread for the rest of the day. | **X 72-hour read and decision.** |
| 11 | Fri | Answer Hacker News comments. | |
| 12 | Sat | Answer Hacker News comments. | |
| 13 | Sun | Nothing. | **Hacker News 72-hour read and decision.** |
| 14 | Mon | Nothing. | Notes read. X 7-day read, for the log only. **Fortnight decision.** Write the result up. |

Post each public item at a time you choose on Day 0 and write that time in the log. Every read for that channel is taken at the same clock time, 72 hours later.

If a blocker in section 1 is not done for a channel, skip the channel and keep the calendar. Do not slide two channels into one window.

---

## 4. What is read, where, and when

### From Cloudflare Web Analytics

Where: the argumend.org zone, then Analytics & Logs, then Web Analytics. <!-- src: docs/ANALYTICS.md, "Where things stand" -->

The beacon is only added for browser-like requests. A browser-like request to `/ai` on 10 Nov 2026 came back with it. A plain `curl` did not. So scripted checks should not show up as visits. Use an ordinary browser for the Day 0 check.

**Day 0, baseline.** For each of the seven landing paths, write down visits and page views for each of the previous 14 days *(choice)*, and the top referrers for the same period:

```
/ai
/analyze
/topics/ai-mass-unemployment
/topics/ai-risk
/topics/capitalism-after-ai
/topics/open-weight-ai-models
/blog/we-gave-a-model-that-cant-talk-1000-arguments
```

Take a screenshot of each view. Nothing in this repository says how long Cloudflare keeps the data, so the log is the record.

**Day 0, tagged-URL check.** Open one tagged URL from section 2 in an ordinary browser. Later that day, look for the visit in the dashboard and note whether the path is shown with or without its query string. Write the answer in the log. If the query string is not shown, every read below uses referrer, path and date only.

**At each 72-hour read.** For the channel's landing paths, over the 72 hours since posting:

| Channel | Paths | Filter by referrer | Write down |
| --- | --- | --- | --- |
| LessWrong | `/ai`, `/topics/ai-mass-unemployment`, `/topics/ai-risk`, the blog post | the LessWrong host | visits and page views per path; the same paths' baseline for three days |
| X | `/topics/ai-mass-unemployment` | whatever host X links arrive from; record it | the same |
| Hacker News | `/analyze` | the Hacker News host | the same |
| Notes | the four map paths | none | nothing. See below. |

Expect some visits from every channel to arrive with no referrer. Do not add unexplained direct visits to a channel's count.

The notes are four emails. Four visits cannot be told from an ordinary day, and `/topics/ai-mass-unemployment` is shared with two other channels. The notes are read by replies alone.

### From the platforms

| Channel | Read at 72 hours | Where |
| --- | --- | --- |
| LessWrong | Whether the post was approved. Karma. Number of comments. Number of crux replies (defined below). | the post page |
| X | Impressions on post B1. Link clicks on post B7, if X shows them. Replies. Crux replies. | the account's own analytics for each post |
| Hacker News | Whether the post is still visible. Points. Number of comments. Number of paste reports (defined below). | the submission page |
| Notes | Answers received by Day 14. | the inbox |

### Two counts made by hand

These are the counts the decisions rest on, so define them before anything is posted.

- **Crux reply.** A comment or reply that takes up a specific crux, a specific settle condition, or a specific source on a map, whether to agree, disagree or correct. "Interesting", "nice site", and remarks about AI in general do not count. Count one per account.
- **Paste report.** A Hacker News comment that says what the writer pasted and where it landed, right or wrong. Count one per account.

A **correction** is any reply that shows a card, a source, a crux or a match to be wrong. Log every one with the map id. A correction is a result, not a failure. It also counts as a crux reply or a paste report.

### If an analytics provider is on (optional)

With a provider configured before Day 0, also read, per channel window: `topic_view`, `first_crux_seen` and `crux_open` on the landing maps, and `paste_submit` and `paste_result` for the Hacker News window. `first_crux_seen` divided by `topic_view` is the share of map views that reached the first crux. <!-- src: docs/ANALYTICS.md, "What is collected" and "The first dashboard", number 2 --> These are for the log. The rules in section 5 do not use them, because they may not exist.

Without a provider, this test cannot say whether anyone who clicked read as far as a crux, or whether anyone on Hacker News pasted anything. It can only say that they arrived and what they wrote back.

---

## 5. Stop or continue: decided before posting

Every floor below is a *(choice)*. Each channel ends in one of three states.

- **NOT TESTED.** The channel never put the material in front of people. This is not a failure of the material and is not counted as one.
- **CONTINUE.** The channel earns a second round after the fortnight.
- **STOP.** No more cold posts on this channel until something about the product changes.

### LessWrong, read on Day 4

| State | Rule |
| --- | --- |
| NOT TESTED | The post was not approved, or was removed. Do not reword and resubmit during the test. Log the reason given. |
| CONTINUE | At least 3 crux replies from different accounts. |
| STOP | Fewer than 3 crux replies and fewer than 25 visits from the LessWrong host across the four paths. |
| Anything else | Clicks without replies. Log it as "read, not answered". No second post. |

Replies decide this channel, not clicks. The post asks one thing, that readers name a crux that is wrong. If nobody does, the request did not land, however many opened the page.

### X, read on Day 10

| State | Rule |
| --- | --- |
| NOT TESTED | Post B1 has fewer than 300 impressions. An account nobody sees cannot test a thread. |
| CONTINUE | At least 10 visits to the landing path from X's referrer, or 10 link clicks on B7, and at least 1 crux reply. |
| STOP | B1 passed 300 impressions and the CONTINUE rule was not met. |

### Hacker News, read on Day 13

| State | Rule |
| --- | --- |
| NOT TESTED | The submission was removed or made invisible within the first day. Do not delete and repost. |
| CONTINUE | At least 5 paste reports from different accounts, or at least 100 visits to `/analyze` from the Hacker News host. |
| STOP | Neither. |

### Notes, read on Day 14

| State | Rule |
| --- | --- |
| CONTINUE | At least 1 of the 4 recipients answered the question asked. |
| STOP | None did. |

### Stops that apply on any day

1. **A linked map is shown to be wrong.** If a reader shows that a card, a source or a crux on a linked map is wrong, post nothing further on any channel until it is fixed and you have said so in the place it was raised. A second such error on the AI maps inside the fortnight ends the test. The next work is then the citation audit, which round 15 left unfinished. <!-- src: docs/plans/2026-11-03-round15.md, "Deep citation audit: maps not yet audited (stopped on budget, 3 Nov 2026)" -->
2. **We broke our own rule.** If anything posted under the Argumend name says who is right, quote-posts someone to correct them, or reads as a correction of a named person, delete it, log it, and post nothing for 48 hours. *(choice)* A second time ends the test.
3. **The page changed.** If a deploy lands inside a channel's 72-hour window, mark that channel NOT TESTED.

### The fortnight decision, Day 14

Read in order. The first that applies is the decision.

1. **Any public channel is CONTINUE.** Run that channel alone for the next fortnight with the held material (threads A and C for X; a second LessWrong post only if the first drew corrections that changed a map). Nothing new is written for the others.
2. **No public channel is CONTINUE, and the notes are.** Cold posts are not how this audience finds the maps. Keep writing to individuals with one specific question each. No further cold posts.
3. **Nothing is CONTINUE.** Stop distribution. Record the result as it is: shown cold to this audience, the maps were not opened or not answered. What comes next is the founder's decision, and this test does not make it.

Whatever the result, two things hold. No content round is justified by this test. And nothing here is evidence that a map helps a reader, which only the study can show.

---

## 6. The log

Keep one file. Fill a row at each read, at the clock time fixed on Day 0.

```
| Day | Date | Channel | Posted at | Read at | Approved / visible? | Platform numbers | Cloudflare: visits / page views per path (referrer) | Baseline for same paths | Crux replies or paste reports (links) | Corrections (map id, what, fixed on) | State |
```

Also record, once: the Day 0 baseline table, the answer to the tagged-URL check, the X handle and follower count, and the commit that was live for the whole fortnight.

---

## 7. What will not be done

- No winner is named, anywhere, in any reply.
- No quote-post to correct someone, and no reply that corrects a named person.
- No founder name, and no post from a personal account pointing at the Argumend one.
- Nobody is asked to upvote, share, repost or comment. The Show HN rules say "Please don't ask friends to upvote or comment."
- The disagreement-diagnosis report, the Jev map-reply tool and the study are not described as available. `/reply` and `/study` returned 404 on 10 Nov 2026, and `/analyze-v2` redirected to `/analyze`.
- No number is posted that is not in a file in this repository.
- No reply is pasted from a model on LessWrong or Hacker News.
- No invented users, testimonials, traffic or results, in the posts or in the write-up.

---

## 8. What the September drafts say that is now false

Checked against the repository and the live site on 10 Nov 2026. "Live" below means loaded that day.

### `docs/drafts/README.md`

| It says | Now |
| --- | --- |
| The September files are "Current" and describe the product. | They describe the disagreement-diagnosis report, which is behind `ENABLE_DISAGREEMENT_V2` and off by default (`CLAUDE.md`, "Runtime Feature Flags"). The README should point to `2026-11-10/`. |
| "the two `[FOUNDER]` placeholders in the essay must be filled from a live run first" | The essay body has no placeholder left. The only `[FOUNDER` in the file is the header note describing them. |

### `docs/drafts/lesswrong-essay-2026-09.md`

| It says | Now |
| --- | --- |
| "Argumend's current product takes a pasted disagreement ... and returns a report in six boxes" | The live paste tool at `/analyze` matches the paste to an existing map with a keyword index and no model (`app/api/analyze/route.ts`). The six-box report is switched off. |
| "The diagnosis page is at `/analyze-v2` on argumend.org while the feature flag is on" | Live, `/analyze-v2` redirects to `/analyze`. With the flag on, the diagnosis would show above the map match on `/analyze` (`CLAUDE.md`). |
| "Anonymous use is limited to 3 analyses per hour and 10 per day per hashed address" | Those are the diagnosis lane's limits. The live map lane allows 60 requests an hour per address (`app/api/analyze/route.ts`). |
| "nothing pasted is stored unless you explicitly publish a report" | There is nothing to publish on the live tool. `/d/example` returned 404 and publishing sits behind `ENABLE_DISAGREEMENT_PUBLISHING` (`lib/disagreement/model/index.ts`). The live page says the paste is matched on the server and not stored. |
| "the report has a feedback control for exactly that" | No report is served, so no control. |
| "Join the evaluation ... a 12-person study ... Sessions are 30 minutes, on a phone, paid. We are recruiting" | The study now planned is a different one: three arms, 1,200 participants after a pilot of 90, recruited through Prolific (`docs/plans/2026-11-03-study-plan.md`). It has not run. That plan says the only user test so far was on 10 Aug 2026 with a handful of the founder's contacts. Nobody is being recruited. |
| "Before this replaces the current analyze page" | It did not replace it. `/analyze` is the map match. |
| The whole essay argues for a typed diagnosis as the artifact. | The live artifact is the map: cruxes first, what would settle each, no winner. |

The essay's measurements (390 of 390 quotes, the crux judged wrong in 12 of 17 and 12 of 23 reports) are about the switched-off pipeline. They are not false, but they describe nothing a reader can open.

### `docs/drafts/gatekeeper-dms-2026-09.md`

| It says | Now |
| --- | --- |
| The offer is "paste a real argument, get a source-only report" | Not available. |
| Two notes ask the recipient to paste at "[VERIFY: live /analyze-v2 URL]" | There is no such page to give them. |
| "it becomes the default analyze page only after a 12-person study passes six thresholds" | Superseded by the November study plan, which tests maps, not the diagnosis. |
| Two notes link to the essay above. | The essay describes a product that is off. |
| Four named recipients, 120 to 180 words each, each asked to do a task. | The standing brief is role placeholders, under 90 words, one question about one map, no task. |

### `docs/drafts/launch-packaging-2026-09.md`

| It says | Now |
| --- | --- |
| "The launch is the release switch, PR 9, which moves the diagnosis page to `/analyze`, keeps the old page at `/analyze/legacy`" | Live, `/analyze/legacy` returns 404. `/analyze` is the map match, with the diagnosis lane off. |
| The share object is "`/d/[slug]` and the social card", and the thread links "one published `/d/` report" | No report can be published while the flags are off. `/d/example` returned 404. |
| Launch step 0: "Study passes; PR 9 merged; publishing on" | None of the three happened in that form. The 12-person study is not the study now planned. |
| Thread post 2: "paste the argument, get the diagnosis" | The live tool returns a map match, not a diagnosis. |
| Thread posts 4 and 5 put a link in the fourth and fifth posts. | The standing rule is one link, in the last post. |
| Thread post 5: "across 40 blind-scored reports, every quote was verbatim (390 of 390)" | True of the switched-off pipeline. It describes nothing live. |

Its "What we will not claim" list still holds and is worth keeping.

### `docs/marketing/2026-09-21-social-launch-kit.md`

| It says | Now |
| --- | --- |
| "156 maps, 432 pillars/cruxes, 1,567 evidence cards (1,551 with a source URL)" | This branch has 155 two-sided maps (`data/topicSummaries.json`) and 3 four-position maps (`lib/argument/topicIds.ts`). The two-sided maps carry 2,015 cards, 2,001 with a source URL (`data/corpusStats.ts`). The live home page says "All 155 maps". |
| Bio: "156 maps, 1,567 sources scored 0-40" | Both counts are stale, and no live map page loaded on 10 Nov printed a score out of 40. |
| All 30 posts use the form "For 38/40 ... Against 37/40" | The pages they link to show no such score. The paste result leaves weights out on purpose, because "two scores side by side read as a side ahead on points" (`components/paste/MapResult.tsx`). |
| The 30 posts cite 30 maps, 30 crux titles and 60 cards by id. | One map, `ai-white-collar-displacement`, has been merged into `ai-mass-unemployment` (`data/retiredMaps.json`). Of the other 58 card ids, 5 are no longer in their map file, and 14 of the 30 crux titles no longer appear anywhere in `data/topics/` (string search, 10 Nov 2026). Round 15 rewrote 65 maps (`docs/plans/2026-11-03-round15.md`). Every post would need regenerating. |
| Posts are drawn from maps where `verdict.quadrant === "contested"` | The maps no longer print the reading that quadrant came from, because it read as a verdict (`app/methodology/page.tsx`, "The reading we removed"). |
| "`consciousness-ai-systems` — this is `featuredTopicId` in `data/topics.ts`" | `data/topics.ts` has no `featuredTopicId`. The live home page leads with `ai-mass-unemployment`. |
| "an interactive canvas" | The topic page is a crux-first reading page. The diagram is a separate view at `/topics/[id]/map` (`CLAUDE.md`). |
| Data issues: one-sided pillars on `transgender-athletes-sports`, 37 one-sided pillars across the library, a pillar with no evidence | Round 15 records that "every crux in the library now has a non-agreed card on each side". |
| "16 of the 1,567 evidence cards have no `sourceUrl`" | Now 14 of 2,015 (`data/corpusStats.ts`). |
| Pin the Jev thread; the bio alternate says "Pinned: what a mute model found" | The thread's subject is the map-reply tool, which is off (`ENABLE_JEV_MAP_REPLY`; `/reply` returned 404). The north-star document also rules out pointing the tool at other people's comment streams. |
| Measurement: clicks, time on map and scroll depth from "GA4" | No Argumend analytics run in production and no event has ever been recorded (`docs/ANALYTICS.md`). Cloudflare Web Analytics is the only source and cannot count events. |
| UTM campaign `launch2026w38` | A stale week. This test uses `disttest1`. |
| Thursday: "Quote-post of @chetaslua's debate BS-meter demo" | Not false, but against the standing decision never to quote-post to correct someone. |
| "the handle goes in the bio of the founder account too", and the founder account posts "linking the thread" | Not false, but against the standing decision to stay anonymous. |

### Seen along the way, in the live blog post

The post `we-gave-a-model-that-cant-talk-1000-arguments` is the one the LessWrong draft links to. Its closing section still says "If you moderate a community that argues about things we have mapped, we would like to put it in your thread." The reply tool is off, and `docs/plans/2026-09-22-north-star.md` says not to point the tool at third-party comment streams. A reader arriving from LessWrong will reach that sentence. This file does not edit the post.
