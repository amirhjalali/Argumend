# Round 2: agreement and mind-change lines for the 46 maps that had none

Branch `r2/falsification`, off `ux/round2-2026-09-29` (81bd0cb).

## What changed

46 legacy maps (140 pillars) had no `crux.falsification` block on any pillar,
so their topic pages showed no "What both sides already agree on" block and
no "A supporter / a skeptic changes their mind if…" lines. Every one of those
pillars now has all four fields. No map was declined. No other field changed:
`question`, `crux.question`, evidence, verdicts and `data/topicSummaries.json`
are untouched. The summaries script does not read falsification data; a
regeneration produced no diff.

| | Before | After |
|---|---|---|
| Legacy maps with falsification on every pillar | 110 of 156 | 156 of 156 |
| Pillars without a block | 140 | 0 |
| Sample pages (epstein-files, tiktok-ban, trump-tariffs, doge-federal-cuts) with an agreement block and mind-change lines | 0 of 4 | 4 of 4 |

The maps are listed by a script over `topicSummaries` and `loadTopicById`,
not by file names: scott-cost-disease, moloch, ai-2027, jones-act,
police-reform, reparations-slavery, open-borders, us-iran-conflict,
epstein-files, tiktok-ban, immigration-border-crisis, social-media-elections,
nuclear-weapons-abolition, iran-war-justification, china-taiwan-invasion,
cancel-culture, media-bias-democracy, ai-white-collar-displacement,
eacc-vs-tech-regulation, tiktok-brain-rot, gender-affirming-care-minors,
obesity-personal-responsibility, remote-work-permanence, billionaire-wealth,
student-debt-forgiveness, minneapolis-shooting, meaning-without-religion,
meritocracy-myth, artificial-reproduction-ethics, government-platform-bans,
children-smartphone-age, alternatives-to-democracy, masculinity-crisis,
longevity-anti-aging, nuclear-proliferation-new-arms-race,
transgender-athletes-sports, immigration-national-identity,
psychedelic-therapy-hype, affirmative-action-meritocracy,
ukraine-peace-terms, trump-tariffs, rfk-health-policy, doge-federal-cuts,
assisted-dying-euthanasia, second-amendment-individual-right,
sex-work-decriminalization.

## How it was written

- Style follows the well-authored maps (nuclear-energy-safety,
  standardized-testing-debate, rent-control-effectiveness,
  minimum-wage-effects).
- `supporter_flip` is a conditional tied to the pillar's own crux test: "If
  [the test came out this way], the case for … would weaken."
- `skeptic_flip` is the other side's strongest cards from the map's own
  evidence, and names the position it speaks to ("A skeptic who calls the
  threat speculative should weigh that …").
- `common_ground` is something the map's text on both sides concedes, with
  numbers the map already has. It is 183 characters on average and 245 at
  most. Where the two sides share no sentence, it pairs uncontested facts the
  map documents.
- `live_disagreement` rephrases the pillar's existing `crux.question` as the
  hinge.
- Each block was written into a JSON file and inserted with a TypeScript-AST
  script, so formatting is uniform: the block goes at the end of each crux
  object, and re-runs replace a block rather than duplicating it.

### Five examples

**epstein-files / institutional-failure**
- supporter_flip: If a comparison with other federal non-prosecution agreements in sex-trafficking cases from 2000 to 2010 showed that immunity for unnamed co-conspirators was routine, the 2007 deal would read as aggressive defense lawyering plus one prosecutor's poor judgment, and the case for systemic failure would weaken.
- skeptic_flip: A skeptic should weigh that the failures ran through several offices, not one: Palm Beach police identified 36 victims aged 14 to 17, a 60-count federal indictment was drafted and set aside, and a federal judge ruled in 2019 that keeping the deal from victims violated the Crime Victims' Rights Act. If the co-conspirator immunity clause has no precedent, 'individual misjudgment' is hard to sustain.
- common_ground: Both sides accept that the 2007 non-prosecution agreement was unusually lenient, and that the DOJ's own Office of Professional Responsibility found 'poor judgment' in it but not professional misconduct.
- live_disagreement: Whether the deal's extraordinary terms, above all blanket immunity for unnamed co-conspirators, were one office's misjudgment under pressure from an elite defense team, or a cascade of state and federal decisions all bending toward a powerful defendant.

**trump-tariffs / inflation-passthrough**
- supporter_flip: If product-level price-matching studies converged on the New York Fed's estimate — foreign exporters absorbing only about 6-14% — rather than the roughly 20% Harvard Business School found, and tariff revenue were not used to offset the burden, the claim that tariffs shift real costs onto trading partners would fail.
- skeptic_flip: A skeptic who calls tariffs a pure tax on Americans should weigh that even the critical estimates have foreign exporters absorbing part of the cost, and that $171-207 billion in FY2026 tariff revenue could fund offsetting tax cuts that change the net distributional picture, especially if structured progressively.
- common_ground: Both sides' own figures put most of the tariff cost on US consumers and importing firms, with foreign exporters absorbing somewhere between about 6% and 20%.
- live_disagreement: How large the foreign-exporter share really is and whether it holds over time — and whether a one-time price-level bump, partly offset by tariff revenue, is a cost worth paying or a regressive consumption tax.

**gender-affirming-care-minors / ethical-consent-autonomy**
- supporter_flip: If a prospective study using the MacArthur Competence Assessment Tool found adolescents at gender clinics systematically less able than adults, or than teens consenting to other treatments, to understand long-term consequences, stronger safeguards or age thresholds would be warranted.
- skeptic_flip: A skeptic worried about consent should weigh that adolescents already consent to psychiatric medications with significant side effects, that testosterone is given to cisgender teenage boys with delayed puberty, and that withholding treatment is not neutral: endogenous puberty brings its own partially irreversible changes.
- common_ground: Both sides agree some changes are permanent either way: cross-sex hormones cause partially irreversible effects, and so does an untreated puberty.
- live_disagreement: Whether adolescents with persistent, well-evaluated dysphoria can weigh lifelong consequences well enough to consent, or whether still-maturing judgment and a changing referral population call for more safeguards or higher age thresholds.

**meritocracy-myth / psychological-function**
- supporter_flip: If cross-national surveys and priming experiments found that stronger meritocratic belief increases support for education funding, healthcare access and other equalizing policies, the claim that the belief mainly legitimizes inequality would weaken.
- skeptic_flip: A skeptic who values meritocratic belief should weigh system-justification research linking it to rationalizing inequality — crediting the advantaged and blaming the disadvantaged — and Sandel's argument that meritocratic sorting has bred elite hubris and eroded solidarity.
- common_ground: Both sides agree the evidence here is contested: growth-mindset and grit effects are smaller than once advertised, and the link between meritocratic belief and weaker support for redistribution is debated.
- live_disagreement: Whether belief in meritocracy on balance motivates effort and fuels reform, as civil-rights advocates invoked it, or legitimizes existing inequality by framing it as deserved.

**immigration-national-identity / social-cohesion-trust**
- supporter_flip: If a 20-year comparison of 15-20 OECD countries found high-immigration countries with strong integration policies keeping social trust and civic participation high while similar countries with weak policies did not, policy design rather than immigration itself would drive cohesion, undercutting the claim that integration cannot cope.
- skeptic_flip: A skeptic who trusts integration policy should weigh Putnam's survey of 30,000 Americans across 41 communities, which found diversity associated with lower trust even within groups, and the argument that shared language and civic norms take generations to build but can be disrupted faster than they are rebuilt.
- common_ground: Both sides accept Putnam's finding that diversity is linked to lower trust in the short to medium term, and that the pace and type of immigration affect whether integration succeeds.
- live_disagreement: Whether the drop in trust is a transitional 'hunkering down' that strong integration policy overcomes, or a structural effect that appears whatever the policy — with Canada and Sweden as the contested test cases.

## Review pass

The review was a separate pass after all 46 maps were written.

**Automated checks, all clean on the final set:**
- All four fields are present and non-empty.
- Lengths: common_ground at most 300 characters, live_disagreement at most
  330, flips at most 480.
- No `verdict|winner|settled|who is right|win|prove|debunk`.
- Every number, and every capitalised name that doesn't start a sentence,
  appears elsewhere in the same map, with the falsification blocks excluded
  from the corpus.
- common_ground does not restate the meta-claim: word overlap stays under
  35%, apart from two cases where the overlap is only names and dates.
- No lean words (`clearly`, `hype`, `myth`, `naive`…). The one exception is
  "myth" where it is the map's own claim.

**Fixes made in review:**
- china-taiwan-invasion, us-deterrence skeptic_flip: it cited the CSIS
  wargame's U.S. losses but left out that the same runs mostly repelled the
  invasion. Added.
- tiktok-ban, competition skeptic_flip: it said the law requires a sale
  "rather than a shutdown". The law is divest-or-ban; reworded.
- social-media-elections, foreign-interference common_ground: "only about
  $100,000" carried one side's framing into the shared line. Dropped "only".
- psychedelic-therapy-hype and social-media-elections skeptic_flips: "a
  skeptic who sees/calls it hype" is a label, not a position. Replaced with
  each map's own framing ("expects a repeat of the 1960s overpromise";
  "sees micro-targeting's threat as overstated").
- masculinity-crisis and open-borders supporter_flips: "clearly better/
  improving" overstated a hypothetical result. Changed to
  "significantly"/"measurably".
- assisted-dying-euthanasia skeptic_flip: removed a doubled "should weigh".
- During drafting the checker caught names that are not in the map
  ("Beijing", "Washington" in china-taiwan-invasion; "US" where
  minneapolis-shooting writes "U.S."), and `win`/`settled`/`prove` used in
  ordinary senses. All were reworded.

**Declined:** none. minneapolis-shooting's second pillar has no evidence
cards, so its block rests on the pillar texts and crux alone.

## Found in the maps, not fixed (outside this task's fields)

1. **Inverted pillar sides.** In some pillars `skeptic_premise` argues *for*
   the meta-claim and `proponent_rebuttal` argues *against* it, so the
   page's "Supporters" position card quotes the opposing side:
   - obesity-personal-responsibility: all 3 pillars
   - immigration-national-identity: all 3 pillars
   - nuclear-weapons-abolition: abolition-feasibility and
     humanitarian-existential-risk
   - alternatives-to-democracy: alternative-models
   - transgender-athletes-sports: open-category-model
   - masculinity-crisis: ideological-capture-problem, partly

   The new flips follow the meta-claim and name the position they speak to
   ("the case that obesity is mainly a matter of individual choice would
   weaken"), so they read correctly either way. The position cards need the
   two texts swapped: a data-only fix for a separate pass.
2. **Figures that disagree inside a map.** These were avoided rather than
   repeated:
   - affirmative-action-meritocracy: the skeptic text gives Pew as 74%
     disapprove; the evidence card says 50% disapprove and 33% approve.
   - ai-white-collar-displacement: the pro text attributes "300 million
     jobs" to the ILO; the evidence card attributes it to Goldman Sachs.
3. rfk-health-policy's own crux text and skeptic premise call vaccine-schedule
   safety "settled". That is the map's wording, left as is. None of the new
   lines use it.

## Tests

- `lib/topicPage/legacy.test.ts`, `components/topic/TopicPage.test.tsx` and
  `app/embed/[topicId]/page.test.tsx` all tested the no-data fallback on
  epstein-files. They now use `withoutFalsification()` from
  `test/fixtures/legacyTopics.ts`. The embed test reaches it through a
  fixture id in a loader mock, because the widget loads maps by id. The
  fallback test also covers a crux with no authored question (the crux
  title becomes the heading) and checks there are no run-ins.
- New test: every pillar of every legacy map has all four fields
  non-empty, every page has an agreement block, and every crux has both
  flips.
- `bunx tsc --noEmit` clean. `bunx vitest run`: 246 files, 2,948 tests
  passing. `bun run lint` clean.

## Screenshots

Taken before and after at 390 and 1440 wide: the first screen, plus the
first crux opened. Maps: epstein-files, tiktok-ban, trump-tariffs,
doge-federal-cuts. Files are in
`scratchpad/round2/falsification/shots/{before,after}-<map>-<width>-{first,crux1}.png`.
Before, all four had no agreement block and no flips at both widths. After,
all four have both at both widths.

## Left for later

- A fresh-eyes reviewer should read the sensitive maps:
  gender-affirming-care-minors, transgender-athletes-sports,
  minneapolis-shooting, immigration-national-identity and rfk-health-policy.
  This pass had one author, backed by mechanical checks. Weekly usage was at
  84-86%, so the review was not given to a separate agent.
- The inverted-sides fix in item 1 above.
