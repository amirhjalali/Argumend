# Crux ledger and /ai launch writing (DRAFT for founder review)

**Status: DRAFT, 2026-09-22. Not published anywhere.** Brand voice: anonymous ("we", byline
"Argumend Team"), matching the 2026-09-17 Jev post in `data/blog.ts` and the voice guide in
`docs/marketing/2026-09-21-social-launch-kit.md`. The "do not claim" list in
`docs/marketing/2026-09-17-jev-post-social-kit.md` applies.

Sources this draft may use, and nothing else:

- `docs/plans/2026-09-22-north-star.md`, `docs/plans/2026-09-22-crux-ledger-and-living-ai-map-spec.md`
- `docs/research/2026-09-22-covid-crux-retrospective.md` (fact-checked; citation keys like `[10a]` refer
  to its **Sources by row** section)
- `data/argument/ai-mass-unemployment.ledger.json`, `data/argument/capitalism-after-ai.ledger.json`
- `app/ai/page.tsx`, `components/ai/*` (what the page actually renders)

Anything that could not be traced to one of these is marked **[VERIFY]**.

---

## 1. Blog post

**Title:** A map that can't say what changed can't tell you what would change your mind

**Description (for `data/blog.ts`):** Argument maps are photographs. We added a dated ledger to
every crux: what moved it, when, and how far. We tested the format on Covid, then turned it on the
AI debate. It names no winner.

**Suggested slug:** `crux-ledger-what-changed` · **Category:** Methodology · **Byline:** Argumend Team

---

### The problem with photographs

Every Argumend map has a crux: the question whose answer would move whole positions. Finding it is
the point of the site. But until now each map has been a photograph. A crux we called contested in
August could have been narrowed by a paper in September, and nothing in the map would record it. Nor
would it record that nothing had happened, which is also worth knowing.

The most useful thing you can know about a disagreement is what
would change your mind. A map that cannot say what *has* changed cannot show you what that looks
like. It can only show you where the argument stood on the day someone drew it.

So we built a ledger.

### What a crux ledger is

A crux ledger is an append-only record, one per question, of how the disagreement over that
question has moved. Each entry has four parts:

- **A status**, one of four. *Open*: still contested; nothing has moved it. *Narrowed*: the live
  disagreement is smaller than it was, because part of it settled or both sides accepted a scope
  limit. *Resolved*: the map's stated resolution condition was met. *Unresolvable*: no evidence can
  settle it, because it turns on a value, a definition, or who gets to decide.
- **A date**, taken from the source, not from when we wrote the entry. A paper revised on 28 August
  is dated 28 August.
- **The evidence** that moved it, linked to the map's own evidence cards where they exist.
- **A short note** in plain language: what the source found and what is still open.

Corrections do not delete entries. A later entry supersedes an earlier one, so you can see what we
got wrong.

"Unresolvable" is not a failure grade. Such a crux stays on the page with the line *"Nothing does —
this turns on a choice of definition; the map holds both readings."*

### Proof of format: Covid

Before pointing the ledger at a live argument, we tested it on one that is mostly over. Covid was
fought in public at high stakes, and is now far enough behind us that some of its cruxes have known
answers.

We wrote fifteen Covid cruxes as questions and checked every row against sources we opened on
22 September 2026: journal abstracts, agency releases, court opinions. The fact-check changed the
ledger more than we expected. Our first draft called six rows "mostly resolved." One of them held.
The evidence on the others moved, but not all the way. "Resolved" is the status that most tempts a
writer to round up.

The final count: four rows resolved, six narrowed, three open (plus masks at the policy level), and
two unresolvable. Four rows show the distinctions the ledger exists to draw.

**Evidence ended it.** *Do the vaccines substantially reduce severe disease and death?* The Phase III
trial of BNT162b2 reported 95% efficacy against symptomatic Covid [2a], and a matched cohort of
596,618 pairs in Israel put effectiveness against severe disease at 92% [2c]. Resolved by measurement. The public fight was mostly about something else: whether *you* had to take one.

**It stopped mattering.** *Does prior infection protect about as well as vaccination?* During Delta,
by early October 2021, case rates among unvaccinated people with a prior diagnosis were 29.0-fold
lower in California and 14.7-fold lower in New York; for vaccinated people without one, 6.2-fold and
4.5-fold [10a]. The CDC posted that on 19 January 2022. Six days earlier, on 13 January, the Supreme
Court had stayed OSHA's employer rule, which had declined a prior-infection exception; OSHA withdrew it
on 26 January [12d]. The evidence landed after the decision it fed had gone. A crux can resolve just
after it stops mattering.

**No evidence ever could.** *Should a person's freedom of movement and work be conditioned on a
medical decision?* On 13 January 2022 the Supreme Court stayed the OSHA vaccine-or-test rule and, the
same day, let the rule for health-care workers take effect [12b][12c]. That split settled *who may
mandate what*. It did not settle whether mandating is right. For most people this was the real
disagreement, and it wore empirical clothes the whole time.

**The experiments measured the wrong thing.** *Did masks reduce transmission?* The randomised trials
mostly measured mask *promotion*, not mask *wearing*. In Bangladesh, promotion raised proper wearing
from 13.3% to 42.3% [7a]. Cochrane's editor-in-chief called the "masks don't work" reading
"inaccurate and misleading" and the results "inconclusive" [7c]. At the policy level the row is
still open. Evidence existed. It sat next to the crux, not on it.

The lesson we took for a live map: the most useful thing it can do for an open crux is state the
observation that *would* settle it, then check whether new evidence measures that observation or
only something next to it.

### What the AI ledgers show today

We opened ledgers on two AI maps, *AI and mass unemployment* and *capitalism after AI*. Every entry
was recorded on 22 September 2026 and dated to its source, which reaches back to 2023.

Three questions on AI and jobs have **narrowed**. None has resolved.

*Do firms respond to AI mainly by hiring less, rather than by producing more?* Firm data now agree
that AI-linked headcount cuts are rare: about 2% of AI-using U.S. firms in Census data, and in a New York Fed
survey, firms retraining far more often than laying off. What is still split is one margin: whether
adopters slow *junior* hiring. U.S. résumé data say yes. Danish registers say no. (Narrowed,
1 September 2026.)

*Can targeted, employer-linked training help displaced workers?* A ten-year randomised evaluation of
four sector-training programs found that each raised earnings at some point, but only one still did
in year ten. Then national WIOA records showed training returns for workers from AI-exposed jobs
rising to about $3,000 a quarter by 2022–24. That study is matched, not randomised, and comes from
tight labour markets. Still open: slack markets, displacement at scale, and AI-specific programs.
(Narrowed, 28 August 2026.)

*Can displaced workers retrain at low cost?* A Brookings index found that about 70% of the most
AI-exposed workers hold jobs with above-median capacity to absorb a switch. About 6.1 million do not,
mostly in clerical work and 86% of them women. The question now centres on that group. The revised
WIOA estimates add that measured gains came mostly from moving into less-exposed work rather than
into new AI tasks. Still open: what the switch costs when jobs are scarce. (Narrowed, 21 January and
28 August 2026.)

Other questions have not moved. Young workers in AI-exposed jobs are 19% below trend in payroll
data, but the reemployment data that would settle the credential question do not exist yet. And the
sides still measure "mass
unemployment" with different yardsticks: one prominent forecast uses the headline unemployment rate,
while Yale's Budget Lab tracks occupational churn and finds no AI footprint yet.

On *capitalism after AI*, the ledger records a fork rather than a movement. *Has capitalism survived
AI?* depends on the criterion: private ownership and markets persisting, or wages staying the main
way households get purchasing power. A 2023 exchange over the book *Technofeudalism* read the same
facts about cloud rents as capitalism's end or as its new form. The ledger marks this
**unresolvable** as a definitional choice. The evidence under each reading keeps arriving anyway.
Employee pay was about 60% of U.S. personal income in July 2026, about the same share as in late
2022.

### What the page will not do

The new page at `/ai` puts these maps' top cruxes on one page, alongside what each map says would
settle them, what has arrived since a date you choose, and the dated changelog. [VERIFY: page is not
deployed yet; confirm URL and launch date before publishing.]

It will not name a winner. It shows no agreement percentage and no "settled" badge. It does not
score the sides, and it never compares crux rankings across maps. When a question has not moved, it
says "no movement recorded since" that date. That is information too, and more honest than a verdict
nobody updates.

We are not trying to end arguments. Arguments are how a society finds things out. We are trying to
show which ones are still live, which ones evidence has already shrunk, and which ones never had an
empirical answer to find.

---

**Word count (body, "The problem with photographs" through the end):** 1384 words.

**Source notes for the post (not for publication):**

| Claim in post | Source |
|---|---|
| Ledger model, four statuses, supersede-not-delete, date is source date | spec §1.1 |
| "Nothing does — this turns on a choice of definition; the map holds both readings." | `components/ai/CruxCard.tsx` line 29 (definitional variant); spec §1.1 quotes the value-difference variant |
| 15 rows; fact-check dated 2026-09-22; six "mostly resolved", one held | retrospective, intro |
| Tally 4/6/3(+7 policy)/2 | retrospective, **Tally** |
| Vaccines 95%, 596,618 pairs, 92% | row 2, [2a], [2c] |
| Prior infection 29.0/14.7 vs 6.2/4.5; MMWR posted 19 Jan 2022 (print 28 Jan); OSHA stayed 13 Jan, withdrawn 26 Jan 2022 | row 10, [10a], [12d]; dates corrected by the ledger content review |
| SCOTUS stay + CMS rule, 13 Jan 2022 | row 12, [12b], [12c] |
| Masks 13.3% to 42.3%; Cochrane statement quotes | row 7, [7a], [7c] |
| "state the observation that would settle it" | retrospective, Pattern 1 |
| Firms / junior hiring | ledger entry `ai-mass-unemployment:c-firms-cut-hiring-not-output:2026-09-01:1` |
| Targeted programs, MDRC, WIOA ~$3,000 | entries `...c-targeted-programs-can-help:2025-09-15:1`, `...:2026-08-28:1` |
| 70%, 6.1 million, 86% women; exit to less-exposed work | entries `...c-displaced-workers-can-retrain-costlessly:2026-01-21:1`, `...:2026-08-28:1` |
| 19% below trend; U-3 yardstick vs Yale | entries on `c-credential-pathway-narrows` (2026-08-12), `c-mass-unemployment-definition-strict` (2025-05-28, 2026-09-15) |
| Technofeudalism fork, unresolvable/definitional-choice | `capitalism-after-ai:c-survival-definition-contested:2023-10-27:1` |
| ~60% wage share, Jul 2026 vs late 2022 | `capitalism-after-ai:c-wage-channel-loses-primacy:2026-08-26:1` |
| Page behaviour: no scoring, no cross-map rank comparison, "No movement recorded since" | `components/ai/AiLivingMap.tsx` (intro and movement section); spec §2.1 |

Covid citation URLs, for a published version (all from the retrospective's **Sources by row**):

- [2a] Polack et al., *NEJM*, 10 Dec 2020. https://doi.org/10.1056/NEJMoa2034577
- [2c] Dagan et al., *NEJM*, 24 Feb 2021. https://doi.org/10.1056/NEJMoa2101765
- [7a] Abaluck et al., *Science* 375(6577), Jan 2022. https://doi.org/10.1126/science.abi9069
- [7c] Cochrane statement, 10 Mar 2023. https://www.cochrane.org/about-us/news/statement-physical-interventions-interrupt-or-reduce-spread-respiratory-viruses-review
- [10a] León et al., *MMWR* 71(4), 28 Jan 2022. https://doi.org/10.15585/mmwr.mm7104e1
- [12b] *NFIB v. OSHA*, 13 Jan 2022. https://www.supremecourt.gov/opinions/21pdf/21a244_hgci.pdf
- [12c] *Biden v. Missouri*, 13 Jan 2022. https://www.supremecourt.gov/opinions/21pdf/21a240_d18e.pdf
- [12d] OSHA ETS withdrawal, effective 26 Jan 2022. https://www.federalregister.gov/documents/2022/01/26/2022-01532/covid-19-vaccination-and-testing-emergency-temporary-standard

---

## 2. Five social posts

Style follows the 2026-09-21 launch kit: the crux as a plain question, the number that moved it,
what is still open, then the link. No winner, no "actually", no dunk. Links point at `/ai` or the
specific map, never the home page. Character counts are literal, including the URL.

#### S1. Prior infection (Covid row 10)

```
Does prior infection protect about as well as the vaccine? CDC data said yes: case rates 14.7 to 29.0x lower, posted 19 Jan 2022.

Six days earlier the Supreme Court had stayed OSHA's rule, which gave no credit for it.

A crux can resolve just after it stops mattering.
```

- Source: retrospective row 10, [10a], [12d]. No link: the Covid retrospective is not a public page
  (its draft graph is deliberately unregistered). Add a link only if it is published.

#### S2. Mandates (Covid row 12)

```
13 Jan 2022: the Supreme Court stayed the OSHA vaccine-or-test rule, and the same day let the health-care worker rule stand.

That settled who may mandate what. Not whether mandating is right.

Some cruxes never had an empirical answer. A ledger should say so.
```

- Source: retrospective row 12, [12b], [12c].

#### S3. Firms and junior hiring (AI ledger)

```
Do firms answer AI by hiring less or producing more?

Narrowed, 1 Sep 2026: AI-linked headcount cuts are rare (about 2% of AI-using US firms).

Still split: do adopters slow junior hiring? US résumé data say yes. Danish registers say no.

https://argumend.org/ai
```

- Source: `ai-mass-unemployment:c-firms-cut-hiring-not-output:2026-09-01:1`.

#### S4. Who retraining leaves out (AI ledger)

```
Can workers displaced by AI retrain cheaply?

Narrowed: ~70% of the most AI-exposed workers hold jobs with above-median capacity to switch. 6.1 million don't, mostly clerical, 86% women.

The open question is now about them.

https://argumend.org/ai
```

- Source: `ai-mass-unemployment:c-displaced-workers-can-retrain-costlessly:2026-01-21:1`.

#### S5. The definitional fork (capitalism-after-AI ledger)

```
Has capitalism survived AI? Depends on the test: private ownership and markets persisting, or wages staying how households get paid.

No evidence picks the test. The ledger marks it unresolvable.

Wages: ~60% of US personal income, Jul 2026.

https://argumend.org/ai
```

- Source: `capitalism-after-ai:c-survival-definition-contested:2023-10-27:1`,
  `capitalism-after-ai:c-wage-channel-loses-primacy:2026-08-26:1`.

---

## 3. `/ai` page copy

### Meta description (3 sentences)

> What the argument over AI and work turns on now, and what each map says would settle it. Every
> question carries a dated ledger: open, narrowed, resolved or unresolvable, with the source that
> moved it. No winner, no agreement score, no settled badges.

(About 270 characters. The current `DESCRIPTION` in `app/ai/page.tsx` is about 215. Search engines
usually truncate near 155–160 characters, so the first sentence should stand alone. [VERIFY] the
length you want before swapping it in.)

### Alternative intro paragraph

> Most arguments about AI and work are about a handful of questions, and most of those questions are
> smaller than they were a year ago. This page shows them: the cruxes the maps turn on today, what
> each map says would settle them, and a dated record of every source that has moved one. Some have
> narrowed. None has resolved. One, whether capitalism survives, turns on a definition no evidence
> can choose. The page does not score the sides.

(Replaces the serif lead under the H1 in `components/ai/AiLivingMap.tsx`. "None has resolved" and
"one turns on a definition" are true of the two ledgers as committed today. They are not computed,
so the paragraph goes stale the day a resolved or second unresolvable entry lands. If the founder
wants it live-accurate, it needs to be generated from the ledger summary, not written in.)

---

## 4. Claims for the founder to double-check

1. **The page is not live.** The post says "the new page at `/ai`". Confirm it is deployed and at that
   URL before the post or S3–S5 go out. The page is in the sitemap but deliberately not in the nav.
2. **[RESOLVED by ledger review] "Two days" in S1 and the post.** The MMWR was first posted 19 Jan 2022, six days after the 13 Jan stay; the post and S1 now say so. Original note: OSHA's withdrawal is dated by the retrospective as *effective*
   26 Jan 2022 [12d] and the MMWR as published 28 Jan [10a]. The retrospective itself says "two days
   before the CDC data were published". Worth a glance at the Federal Register date if anyone will
   argue the point.
3. **[RESOLVED by ledger review: Census §5.2 says ~2% of AI-using firms; post, S-posts and ledger now say so] "2% of U.S. firms" and the NY Fed figure.** The ledger note says "2% of U.S. firms" (Census
   CES-WP-26-25) and the entry's basis says "4% of service firms cut staff, about a third retrained"
   (NY Fed). The post uses only the 2% and "retrain far more often than lay off". The Census
   abstract reads: "Most users (66%) rely on AI solely to augment tasks, while AI-related employment
   decreases are rare, occurring in only 2% of firms" (quoted in
   `docs/research/2026-09-22-ai-unemployment-ledger-sources.md`). It is ambiguous whether that 2% is
   of all firms or of AI-using firms; the ledger note and the post say "U.S. firms". Check the paper.
4. **The mass-unemployment definition row is `open`, not `unresolvable`.** Its own note says
   "evidence cannot settle it; only agreement on a metric can", which reads like the capitalism
   fork, recorded as `unresolvable`/`definitional-choice`. The post describes it neutrally ("different
   yardsticks"). Decide whether the two ledgers should treat definitional cruxes the same way before
   launch; a careful reader will notice.
5. **The Amodei yardstick.** The post says "one prominent forecast uses the headline unemployment
   rate" without naming him. The ledger names Anthropic's CEO and flags the interest. Naming him
   would be accurate; leaving him unnamed avoids the post reading as a dunk. Your call.
6. **Every AI entry was back-filled on one day.** All entries have `noticedAt: 2026-09-22`. The post
   says so plainly. Don't let any promotion imply the map was tracking this in real time since 2023.
7. **"Three narrowed, none resolved."** True of `ai-mass-unemployment` as committed. The capitalism
   ledger also has a narrowed entry (open-weight models' gap to closed models: 8% to 1.7%, then back
   to 3.3% by March 2026). The post does not mention it, to keep the three-on-jobs frame. Consider
   whether to add a sentence.
8. **Covid tally wording.** "Three open (plus masks at the policy level)" follows the retrospective's
   tally, where row 7 is counted twice (narrowed individually, open as policy). Confirm the phrasing
   won't read as a counting error.
9. **Dallas Fed title mismatch.** The ledger flags that graph node `e-dallas-fed-wage-growth` carries
   a source title that differs from the published one. The post doesn't cite it, but the page will
   show it.
10. **The Covid retrospective is not a public page.** The post describes it but cannot link it. Either
    publish it (as a guide or a page) or accept a post that cites a document readers can't open.

### [VERIFY] markers in this draft

- §1, "What the page will not do": page deployment and URL.
- §3, meta description: target length.
