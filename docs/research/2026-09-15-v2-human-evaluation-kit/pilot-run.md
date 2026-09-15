# Pilot run (two participants, before the twelve)

The pilot tests the kit, not the product. Two sessions, full protocol, full scoring sheet, coded
the same day. Pilot participants are recruited through the same screener, paid the same, and are
never counted toward the twelve. Use codes PP1 and PP2. PP1 reads 04 mixed primary and 02 priority
secondary; PP2 reads 05 control primary and 01 empirical secondary. That covers the crux probe,
the value case, and the control in two sessions.

## What the pilot has to answer

Run both sessions, then go through this list. Each item has an adjustment; make it before session
P01.

1. **Timing.** Did the first block (consent through Q7b) end by 22:00? If it ran past 24:00 in
   both pilots, cut the warm-up to one question and move Q2 into Q3 ("Did it find the real
   disagreement, and is this the question it turns on?"). Do not cut PRE-3, Q1, Q3, Q4 or Q7.
2. **PRE-3 wording.** Did the participant produce a question, a topic, or a verdict? If both
   produced verdicts ("Renata is right"), change the wording to "What's one thing they'd need to
   find out for one of them to change their mind?" and note the change in `protocol.md`.
3. **The trap.** After Q7, did the participant show any sign they had been told the answer
   (looking back at the caveat block, quoting "source-only")? That is fine. Did the moderator say
   anything before Q7 about checking, verifying, or looking things up? If yes, add the word to the
   "must not say" list.
4. **Paste on a phone.** Did pasting 400 words from a message into the page work without the
   keyboard covering the submit control, without the input type confusing anyone, and within a
   minute? If not, that is a product finding; log it under Other and decide whether to fix before
   the twelve (a paste problem changes what T1 to T6 measure, because the participant arrives at
   the report annoyed).
5. **Report reliability.** Count retries and time-to-result. Two retries across two pilots means
   the rate limit or the provider needs attention before the twelve. Record the primary crux each
   pilot saw and compare to the key; if both pilots saw a DIFFERENT crux on the same source, do not
   change the source, but tell the founder before starting the twelve, because T2 is then likely
   to fail and the study may be better spent after an engine change.
6. **Sources read as real.** Ask at the debrief: "Did anything about the two texts feel written
   or staged?" If both pilots name the same passage, rewrite that passage. If either pilot guessed
   the control was a control, tighten its opening.
7. **Coding without judgment calls.** Code both sheets, then re-read the coding rules. Every T1
   to T6 box should be decidable from the verbatims alone. Where you had to guess, tighten the rule
   in `scoring-sheet.md` before P01, and write the tightened rule down. Do not tighten rules after
   P01.
8. **Screen share.** Could the moderator read the hero headline and crux from the shared screen?
   If not, the fallback (participant reads them aloud) must be rehearsed in the second pilot.
9. **Secondary reading.** Did it fit in six minutes? If it was skipped in both pilots, drop the
   secondary from the design and note in the results template that the study has twelve readings,
   not twenty-four. That weakens the key-match diagnostic and T4's repeat detection; say so.
10. **Known defects visible.** If either pilot report shows D4 placeholder text or D2 type
    mismatch, and the fixes have not landed, stop and decide: run the twelve against a build with
    known mechanical defects (and accept measuring them), or land the fixes first. The README's
    precondition says land them first.

## What not to change after the pilot

- The six thresholds, their coding rules once P01 has run, or the pass/fail rule.
- The order of Q7 relative to the debrief.
- The five sources, except for a passage both pilots flagged as staged.
- The build under test.

## Pilot record

| | PP1 | PP2 |
|---|---|---|
| Date | | |
| First block ended at | | |
| Secondary run? | | |
| Retries / time-to-result | | |
| Primary crux seen (verbatim) | | |
| Key-match | | |
| Staged passage named | | |
| Coding judgment calls | | |
| Adjustments made | | |
