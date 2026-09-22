# Argumend north star (draft, 2026-09-22)

Founder framing, 2026-09-22: the purpose of Argumend is to mend discourse and let people seek
wisdom rather than conflict, at a time when social media and commercial incentives pull the other
way. The AI debate now looks like Covid did: contested facts, deep values, and identity, tangled
together. Nuanced understanding is the goal, not polarization and team-seeking.

## The goal, stated so it can be measured

**Close the gap between how much people think they disagree and how much they actually do.**

That gap is the thing outrage economics monetizes. It is also what a week of measurement found
everywhere it looked:

| where | what was measured | finding |
|---|---|---|
| rent-control thread (blog post) | seven factual claims, contested Noul | none above 20% contested; the fight was one value and one word |
| Piers Morgan immigration panel | definitional probe | 89% that "culture" meant different things to the two guests; every fact undisputed |
| Piers Morgan trans-athletes debate | routing of 114 turns | 88 not about the question in the title; the claim the evidence turns on was never argued |
| Argumend's own library | evidence `side` audit | three maps inverted and 23 more cards mislabelled, all from filing cards by who cites them rather than what they show |
| Argumend's verdicts | single-card sensitivity | 17 "settled" readings, 5 survive one card flip |

The team frame was inside our own data. The goal is not to end arguments. Arguments are how a
society finds things out. The goal is to end the counterfeit: the argument that feels like a
disagreement about the world and is not one.

## Three principles that follow

1. **Wisdom is knowing what would change your mind.** The spine of the site is the crux and its
   resolution condition, not the verdict. "Settled" is one editorial judgment deep on most maps
   (docs/reviews/2026-09-21-verdict-robustness.md); a ledger of cruxes that resolved, and what
   resolved them, is both more honest and more hopeful.
2. **Never a winner, always the other side's best card.** The map-reply tool composes only Jev
   numbers and existing map text and cannot name a winner (docs/MAP_REPLY.md). Keep this as a rule
   that cannot be flagged off, because the pull toward wisdom is also a pull toward superiority.
3. **Voluntary before imposed.** A person who pastes a thread they are in and reads "you agree on
   every fact here" is performing the act we want to spread. The community bot imposes it on people
   who did not ask, and the vendor contract does not allow it anyway
   (docs/reviews/2026-09-21-typesafe-policy-notes.md).

## The north-star metric

**Perceived-versus-actual disagreement gap**, per thread, from the map-reply outputs:

- perceived: share of turns with stance for/against and fallacy or heat signals;
- actual: share of the thread's claims that are contested (Noul >= 0.6) and factual;
- gap = perceived minus actual, plus the talking-past and definitional probabilities as
  explanatory components.

Logged in aggregate only (counts and probabilities, never text), reported weekly. Success is the
gap closing after a map is shown, measured by a follow-up paste or a "did this change what you
thought you were arguing about?" one-tap answer. Failure modes: self-selection of pasters,
probability wobble of a few points (thresholds need margins), and the fake-lane in dev.

## The two artifacts

- **Covid crux retrospective**: which disagreements from 2020 to 2023 resolved, what resolved
  them, which were values that could not, and what the public argument was actually about at the
  time. The template for the AI debate. Draft: docs/research/2026-09-22-covid-crux-retrospective.md.
- **Living AI-discourse map**: one page across the AI maps showing today's top cruxes, each with
  its resolution condition, the evidence that has arrived since a date, and a changelog. Updates
  proposed by the v2 pipeline, gated by the contestedness probe, reviewed, published. Spec:
  docs/plans/2026-09-22-crux-ledger-and-living-ai-map-spec.md.

## What this changes in the backlog

- Verdict banners become secondary to crux cards with resolution conditions.
- Every map gets a crux ledger entry per crux (status, what moved it).
- The map-reply tool ships first as a personal "paste your own argument" page with consent, and
  reports the gap metric; no bot.
- Library hygiene continues (side audit on every card added; fragile "settled" readings deepened
  rather than pinned; skeptic polarity fixed in the authoring template).
- The AI maps get a maintained cadence: what evidence arrived this month, which crux moved.

## What not to do

- Do not add a "who is right" feature, however good the model gets at the easy cases.
- Do not point the tool at third-party comment streams.
- Do not let "settled" rest on fewer than eight cards or one card's margin.
- Do not publish a metric that depends on text leaving the user's machine without a consent line.
