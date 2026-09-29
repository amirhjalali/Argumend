# Round 2 — side audit (2026-09-29)

Branch `r2/side-audit`, off `ux/round2-2026-09-29` (8af1269).

## The rule

`proponent_rebuttal` is the side that argues **for** the map's `meta_claim` (the
Supporters card, the FOR side in offline debates and the diagram); `skeptic_premise` argues
**against** it. Evidence `side` and the crux `falsification` flips are already relative to
the `meta_claim`. Polarity was decided against the `meta_claim`, not the title or question.

## What changed

### Sides swapped (texts moved verbatim between the two fields)

| Map | Pillars (1-based) | Notes |
|---|---|---|
| obesity-personal-responsibility | 1, 2, 3 | Generic "skeptics"/"proponents" inside the moved text, the three summaries and three evidence notes now name the view they mean ("supporters argue", "proponents of the disease model") |
| immigration-national-identity | 1, 2, 3 | |
| nuclear-weapons-abolition | 2, 3 | Pillar 1 was already right |
| alternatives-to-democracy | 2 | |
| transgender-athletes-sports | 3 | |
| masculinity-crisis | 3, **partly** | The skeptic text argued both ways. Its first half (the progressive framework offers critique without construction, so Tate and Peterson fill the vacuum) argues for the claim and moved to supporters; its second half (a class-and-connection problem, not maleness) stays with skeptics, after the old proponent text. "that fuels this market" was dropped because its referent moved. The supporters' text covers only the progressive failure, not the conservative one. |

In all six maps every evidence `side` and every flip already matched the `meta_claim`, so
only the texts moved.

**The same inversion elsewhere.** I scanned every legacy map (156 maps, 432 pillars). The
check: does the skeptic flip echo the proponent text, and "for" evidence the proponent
text? I read each flagged pillar against its `meta_claim` and swapped the ones I was sure of:
facial-recognition-policing 1–2, alcohol-no-safe-level 1–3, us-national-debt-crisis 1–2,
tipping-culture 1–2, dark-matter-vs-mond 2, adhd-overdiagnosis 1–3, seed-oils-health 1–3,
generative-ai-art-copyright 1–3, open-weight-ai-models 3–4, declining-birth-rates 1,
congressional-term-limits 1–2, return-to-office-productivity 2, ai-deepfakes-truth-collapse
1–2, occupational-licensing-reform 1–2, privacy-vs-convenience 1–3,
rent-control-effectiveness 1–3, autonomous-weapons-ban 1. That makes 36 pillars in 17 maps.
The pattern is consistent: whoever wrote these maps filed the case that challenges the status
quo as "skeptic" even when that case *is* the `meta_claim`. Flips fixed on the same pillars:
rent-control 3 and privacy 3 (supporter and skeptic flips swapped); privacy 2 (the skeptic
flip addressed "a skeptic who says nothing changed" and now addresses one "who credits the
post-Snowden reforms"). After the swaps, none of the moved texts has a generic side label
pointing the wrong way.

### Figures made consistent with the map's own card
- **affirmative-action-meritocracy.** The skeptic text and question q3 said Pew (2023) found
  74% disapproving. The card and Pew's headline say 50% disapprove and 33% approve; 74% was
  the Republican subgroup. Both now say 50% to 33%. The text also dropped "majorities of all
  racial groups", because the same card says nearly half of Black adults approved.
- **ai-white-collar-displacement.** The text credited "300 million jobs" to the ILO in 2024.
  It now credits Goldman Sachs in 2023 ("expose the equivalent of … to automation"), matching
  the card.

### Sensitive maps (second read)
- **transgender-athletes-sports.** The inclusion-pillar summary stated as fact that exclusion
  "causes documented psychological harm". It now says inclusion advocates argue it "is linked
  to" such harm; the map's meta-analysis card says it is association, not proof. "Documented"
  is gone from the live disagreement.
- **gender-affirming-care-minors.** The live disagreement no longer calls the evidence
  "consistently favorable", which was one side's reading. The consent common ground now says
  "endogenous puberty", the map's own term, instead of "untreated puberty".
- **minneapolis-shooting.** The skeptic text listed officials' quotes but never stated the
  account it stands for. It now opens with the DHS self-defense account, taken from the map's
  own evidence card.
- **rfk-health-policy.** The flip that addressed "a skeptic who treats the schedule as beyond
  question" now addresses one who "trusts the current schedule". The fluoridation summary said
  "the science shows clear harm". It now says "the evidence links fluoride to harm", because
  the map's NTP card reports "moderate confidence" of an association.
- **immigration-national-identity.** Sides fixed (see above). No other edits.

## Left, and why
**Suspects that need a founder or author read.** The texts here are unchanged. Either the
pillar's polarity against the claim is unclear, or the fix is to rewrite a flip, not to swap
texts.
- Flips that are backwards on pillars whose texts are now right. Each needs a rewrite, not a
  swap:
  - adhd-overdiagnosis 3 skeptic flip: addresses "a skeptic worried about over-labeling".
  - open-weight-ai-models 4 skeptic flip: "treats foreign availability as decisive".
  - occupational-licensing-reform 1 skeptic flip: "confident licensing is pure rent-seeking".
  - congressional-term-limits 2 supporter flip: describes data that would move a skeptic.
  - facial-recognition-policing 2 supporter flip: its finding would strengthen restriction.
- Flips inverted while the texts look right: dark-matter-vs-mond 1,
  open-weight-ai-models 2, return-to-office-productivity 1 and 3, ai-content-labeling 1–2,
  central-bank-digital-currency 2, simulation-hypothesis 3.
- Labels inverted across the whole map, with some texts also swapped:
  - encryption-backdoors: the supporter flip addresses "a skeptic of …" and the skeptic flip
    "a proponent". Pillar 2's texts also look swapped.
  - section-230-reform: pillars 1 and 3 texts look swapped, and the flips are mixed.
- Pillars whose polarity against the claim is unclear:
  - central-bank-digital-currency 3 (dollar dominance, under a surveillance claim).
  - us-national-debt-crisis 3 (reserve currency).
  - congressional-term-limits 3 (feasibility).
  - facial-recognition-policing 3 (regulate versus ban).
  - ai-deepfakes-truth-collapse 3 (provenance).
- Weak signal, not read: ai-risk 1, autonomous-weapons-ban 2.

**Sensitive-map notes, not edited:**
- immigration pillar 3: the supporter text says "progressives want demographic change". That
  is an unsupported motive claim that echoes a replacement trope, but it is the side's own
  voice. Founder's call.
- immigration pillar 2 summary: "Putnam's research shows that diversity initially reduces
  social trust" is causal wording for a correlational finding.
- gender-affirming-care evidence card on untreated dysphoria: "catastrophic … among youth
  denied affirming care" sits on a survey card. Evidence cards were outside this pass.

**Prose order.** Many swapped texts were written as a premise and a rebuttal. On those
pillars the skeptic field now holds a text that reads as a reply ("The X framing
overstates…"). The meaning is on the right side; the rhetorical order is not.

## Verification
- `bunx tsc --noEmit`: clean.
- `bun run lint`: clean.
- `bunx vitest run`: 3,017 passed and 11 failed. All 11 failures are in the paste flow
  (`components/paste/*`, `lib/paste/{maps,summary}.test.ts`, `app/api/analyze/route.test.ts`),
  where the immigration example no longer matches `immigration-wage-impact`. They fail the
  same way with this branch's `data/topics` reset to 8af1269, so they predate this branch.
- New `lib/topicPage/legacySides.test.ts`: 47 cases, one per swapped pillar. The sentence
  that used to open the Supporters card must now open the Skeptics card, and must not open
  the Supporters card.
