# Scoring sheet (one per participant)

Copy this file to `sessions/PNN.md` (gitignored, or outside the repo) and fill it during the
session. Code the threshold boxes the same day, against `disagreements/answer-keys.md`, which is
opened only after the session ends.

## Session

| Field | Value |
|---|---|
| Participant code | P__ |
| Date | |
| Remote or in person | |
| Primary source ID (phone) | |
| Secondary source ID and device | |
| Screener notes (dog, child under 8, volunteer, board; acquaintance of moderator y/n) | |
| Build under test (commit, lane, model) | |
| Report generated first try / retry / no report | |
| Secondary skipped (reason) | |

## Warm-up (verbatim)

- W1 what they do with an online argument:
- W2 last confusing disagreement:

## Pre-report baseline, primary source (verbatim)

- PRE-1 what they're arguing about:
- PRE-2 lean (speaker name or "neither"):
- PRE-3 the one question that would settle it:

## What the report showed (primary)

| Field | Value |
|---|---|
| Hero headline (verbatim) | |
| One-sentence insight (verbatim) | |
| Primary type chip | |
| Resolvability band / representation confidence | |
| Audit strip: positions / shared premises / disputed questions / cruxes | |
| Primary crux question (verbatim) | |
| Crux branches show different condition text? (y/n) | |
| Resolution path labels shown | |
| Evidence-state line shown | |
| Time from submit to result | |

Path observed (tick): position card expanded [ ]  Show source basis [ ]  crux opened [ ]
resolution paths read [ ]  caveat block reached [ ]  scrolled back up [ ]  stopped before crux [ ]

## The seven questions (primary)

**Q1 Accuracy**, one row per position card:

| Position label | Speaker | Is the participant's lean? | Yes / Mostly / No | What it got wrong (verbatim) |
|---|---|---|---|---|
| | | | | |
| | | | | |

- Q2 identified the actual disagreement (verbatim, and what the page said it was):
- Q3 crux central? (verbatim, including the "why / what would change"):
- Q4 revealed something not previously articulated (verbatim):
- Q5 tilt (verbatim, section named):
- Q6 share: would send a strong report (verbatim, to whom) / would send this one:
- Q7 what did the page verify on its own (verbatim):
- Q7b forced choice: Yes / No / Not sure:
- Debrief: did source-only come across (verbatim):

## Secondary reading

| Field | Value |
|---|---|
| Hero headline (verbatim) | |
| Primary crux question (verbatim) | |
| S-PRE one question that would settle it (verbatim) | |
| Q3 crux central (verbatim with why) | |
| Q5 tilt (verbatim) | |
| Q6 would send this one | |

---

# Coding rules

Code each threshold box PASS or FAIL for this participant from the primary reading only. The
secondary reading is coded for key-match and defects only.

**T1 position representation (Q1).** PASS if the position card for the participant's own lean
(PRE-2) is rated Yes or Mostly. If PRE-2 is "neither", PASS only if every position card is Yes or
Mostly. A "No" on any card, even one the participant does not lean toward, is recorded for T4
regardless of T1. The spec says "Accurate or Mostly accurate"; the page's control reads Yes /
Mostly / No, and the kit treats Yes = Accurate, Mostly = Mostly accurate.

**T2 crux genuinely central (Q3 with PRE-3).** PASS if the participant says the report's primary
crux is the question it turns on AND gives a reason of the form "if that were answered, [side]
would have to move" or "that's what they keep coming back to". FAIL if they say no, or say yes
without being able to say what would change (compliance, not judgment). Independently code:

- **Key-match** for the report's crux against the sealed key: SAME / ADJACENT / DIFFERENT.
- **PRE-3 match**: does the participant's own pre-report question match the key's primary,
  secondary, or neither? This tells you whether T2 passes were readers who already saw the crux or
  readers the page taught.

**T3 believed it fact-checked (Q7, Q7b).** FAIL (counts against the "fewer than 10%") if Q7b is
"Yes", OR if the Q7 verbatim names a factual claim from the source as something the page checked
(for example "it confirmed the four rejections" or "it looked up the hauler"). "Not sure" on Q7b
does not count as a mistaken belief but is tallied separately; three or more "Not sure" across the
twelve is a caveat-visibility defect. A Q7 answer of "nothing", "just what they wrote", or "it
said it didn't check" is PASS.

**T4 straw-man pattern (Q1 corrections, Q5).** This is coded across all sessions, not per
participant. A **material** straw-man is a "No" on a position card, or a Q5 tilt verbatim, whose
correction describes a substantive misrepresentation: a claim the speaker did not make, a reason
dropped that the speaker leaned on, a concession invented, or a position made weaker than the
source. Tone and word-choice complaints ("it sounds a bit dismissive") are recorded but are not
material. A **repeated** pattern is either the same position on the same source flagged as
material by two or more of its readers (primary or secondary), or the same kind of
misrepresentation (for example "drops the speaker's stated condition") flagged on two or more
different sources. Either repeat fails T4 for the study. Per-participant box: M if a material flag
was raised, else blank.

**T5 revealed a distinction (Q4 with PRE-1 and PRE-3).** PASS if the participant answers Q4 with
a specific distinction (not "it was well laid out") AND that distinction is absent from their
PRE-1 summary and PRE-3 question. Examples that pass: "I hadn't noticed Bart said the count
wouldn't change his mind", "I thought they disagreed about the numbers but they agree on the
numbers". FAIL if Q4 is "no", generic praise, or restates something they said in PRE-1.

**T6 would share (Q6).** PASS if the participant says they would send a strong report AND names a
recipient or a situation ("my sister, we argue about this exact thing"). "Maybe" with no recipient
is FAIL. "Would send this one" is recorded separately as a stricter supplementary measure.

## Defects observed (tag with the checkpoint README numbers)

Tick every defect visible in either report this session, with a one-line note. Tags:

- **D1** crux-not-load-bearing: restates the question, picks an uncontested premise, or surfaces common ground.
- **D2** primary-type-mismatch: the hero's disagreement type disagrees with the primary crux's type, or a value dispute is shown as empirical.
- **D3** pattern-mismatch: the diagnosis pattern does not fit the report (mostly-common-ground with little shared ground; mixed-disagreement as a fallthrough).
- **D4** placeholder-resolution: "Further clarification is required." or "would require agreement on ..." as a resolution path.
- **D5** common-ground-unsupported: a shared-premise item attributed to all participants with zero or one-sided quotes.
- **D6** participantless-stake: a stake or commitment rendered with no participant.
- **D7** reply-line-as-commitment: a reply or rebuttal line parsed as an explicit update commitment, or a crux rendered as a single uncontested line.
- **D8** (from the model comparison) identical-branches: both crux branches show the same condition text.
- **Other**: anything else the participant or moderator saw, in one line.

| Tag | Report (primary / secondary) | Note |
|---|---|---|
| | | |

## Threshold boxes for this participant

| T1 | T2 | Key-match (primary) | PRE-3 match | T3 | T4 material flag | T5 | T6 | Would send this one |
|---|---|---|---|---|---|---|---|---|
| | | | | | | | | |
