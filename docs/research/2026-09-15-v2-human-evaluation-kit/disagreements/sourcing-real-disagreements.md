# Sourcing real disagreements

The spec says "test at least 12 people using real disagreements". The five sources in this folder
were written for the study so that participants never see text the model was tuned on
(`data/evals/disagreement/` fixtures) and so that the sealed keys are unambiguous. They read as
real. If the founder wants to swap in genuine public exchanges for some or all of the five, do it
before the pilot, one for one, keeping the category slot (empirical, value/priority, definitional,
mixed, control) and writing a new answer-key entry in the same format.

## Selection criteria

- Two or more real participants who each state a position and at least one reason. A single
  article with quoted opponents is a different case; keep it out of the primary slots.
- 250 to 600 words after redaction. Trim from the ends, never from the middle of a turn.
- Genuinely two-sided, with a checkable or nameable question inside it. If a careful reader cannot
  write the key's "primary crux" line in one sentence, the exchange is not usable for T2.
- Civil enough to read aloud. Hostility without substance is a fixture category, not a study source.
- Public at the time of copying: a public forum thread, a published letters-to-the-editor
  exchange, a public comment record, a public code-review or RFC thread, a published debate
  transcript, or an op-ed and its published reply.
- Not about the spec's protected inferences (§18): nothing where the reader would need to know a
  participant's politics, religion, sexual orientation, medical condition, ethnicity, immigration
  status, criminal status, or psychological state to follow the argument. Nothing about the health
  of a named person. No ongoing litigation, no ongoing war, no recent violence.
- No private individuals identifiable after redaction. Pseudonymous handles count as private.
- At least one slot should stay synthetic so the control remains a known quantity.

## Permission and quotation norms

- Prefer sources published under terms that allow quotation: government public-comment records,
  published debates, Creative Commons forums, mailing lists with public archives.
- For platform posts (forums, social threads), ask the participants for permission where they can
  be reached, and record the yes in the founder's own notes, not in the kit. Where they cannot be
  reached, do not use the exchange in a session that could publish; the study never publishes (no
  "Create shareable link"), so session use is a private research quotation, but still keep the
  text out of this repository.
- Quote whole turns. Do not stitch turns from different threads or dates into one exchange.
- Keep the original order; do not delete a turn from the middle to sharpen the disagreement.

## Redaction

Redaction changes the text, and the report quotes the redacted text, so grounding is unaffected.

- Replace handles and surnames with neutral first names (as in the synthetic sources) or Speaker
  A and Speaker B. Use the same replacement consistently within the exchange.
- Strip URLs, employers, street addresses, and any place name specific enough to identify a person.
  Town-level place names may stay if the exchange is about a public matter.
- Remove dates that would identify the thread; keep relative time ("last year", "in March").
- Keep numbers and claims intact. They are what the report grounds against.
- Read the result once as a stranger. If you can still guess who wrote it, redact more.

## Handling during the study

- The redacted text lives in the moderator's session file only, referred to by its slot ID (01
  to 05) in every scoring sheet and in the results file. It is never committed to this repository
  and never pasted into a results file.
- Send it to the participant as a plain message; ask them to delete it at the debrief.
- Never click "Create shareable link" on a report from a real exchange. Publishing persists
  source excerpts.
- When the study is over, delete the session file's copy of the text. The answer-key entry can
  stay, written so that it does not quote more than a phrase.
