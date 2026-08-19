# Running the disagreement loop without an API key

The V2 spec (`docs/plans/2026-08-18-argumend-v2-disagreement-diagnosis-spec.md`)
requires a live model before its founder checkpoints can happen: fifteen reports
reviewed after PR 3, five real disagreements after PR 5. Both were blocked on an
`ANTHROPIC_API_KEY` we deliberately do not want to set.

This document describes the lane that unblocks them. It has two halves: a
provider that runs on a local subscription instead of a billed API, and an
evaluation method that uses the topic maps this repo already carries as its
answer key.

## 1. The CLI provider

`lib/disagreement/model/cli.ts` implements `DisagreementModelProvider` by
shelling out to a coding CLI that is already authenticated against the
operator's own subscription. No API key, no per-token billing.

It is a peer of the Anthropic provider, not a replacement:

| | `anthropic` | `cli` | `fake` |
|---|---|---|---|
| Credential | `ANTHROPIC_API_KEY` | local CLI login | none |
| Latency | seconds | 1.5–4 minutes | instant |
| Allowed in production | yes | **refused** | no |
| Use | serving | offline review, evals | tests |

The production refusal is deliberate and enforced in `extract()`: spawning a
subprocess per request is not a serving architecture, and the spec forbids long
work in route handlers. The provider is for generating material a human reviews.

### Configure

```bash
ARGUMEND_DISAGREEMENT_PROVIDER=cli
ARGUMEND_DISAGREEMENT_CLI=claude     # or codex
ARGUMEND_DISAGREEMENT_MODEL=sonnet   # a CLI alias, not a pinned production model id
```

`claude` is the tested path. `codex` is implemented against the same interface
but was unverified at the time of writing because that lane was out of quota.

### Contract handling

The CLI returns free text, not a tool call, so the provider does the work the
Anthropic tool-use path gets for free:

- the JSON Schema is appended to the shared system prompt as an output contract;
- `payloadFromCliOutput` unwraps the `claude -p --output-format json` envelope
  before scanning, so the scan does not stop on the envelope itself;
- `extractFirstJsonObject` finds the first balanced, parseable object, tolerating
  prose and code fences, and respecting strings and escapes;
- one bounded repair attempt follows a schema failure, then `MODEL_SCHEMA_INVALID`;
- a non-zero exit (a usage limit, an expired login) becomes `MODEL_UNAVAILABLE`
  rather than being retried into the same wall.

The source text goes to the CLI on stdin and never onto the argument vector,
where it would be visible in the process table.

## 2. Map recovery: using our own topics as the answer key

The spec's evaluation corpus is source-only fixtures with hand-authored expected
outputs. That validates the pipeline's mechanics but not whether a diagnosis
recovers a disagreement someone independently mapped.

The flagship ArgumentGraphs already contain what a diagnosis is supposed to
find: four steelmanned positions, typed claims, and cruxes selected by the
deterministic engine. So:

```
topic map  ──render──▶  debate transcript  ──diagnose (blind)──▶  report
     │                                                              │
     └──────────────────── compare ◀───────────────────────────────┘
```

`lib/disagreement/corpus/renderDebate.ts` turns a map into a transcript by
giving each position a neutrally-named speaker who states their case, argues
from the claims their position actually depends on, and answers the strongest
objection recorded against them. The transcript withholds every piece of map
vocabulary — no node ids, no position labels, no mention of cruxes — so
recovering the structure is genuine inference rather than a lookup.

`lib/disagreement/corpus/recovery.ts` then scores the report against the map it
came from: how many positions were recovered, whether a four-position map got
flattened to two, whether extra positions were invented, whether the recovered
crux type is compatible with the map's crux, and how much the recovered crux
question lexically overlaps the map's crux claim.

### These are signals, not a verdict

Lexical overlap can only show that two texts discuss the same subject matter.
Whether the recovered crux *is* the map's crux is a judgement, and it stays with
the human reviewer — which is what the spec's founder checkpoints already say.
Nothing in this harness should be reported as accuracy, and the runner labels
the number accordingly.

## 3. Run it

```bash
# Plumbing check, no model, instant
tsx scripts/disagreement/run-corpus.ts

# The real loop on the subscription
tsx scripts/disagreement/run-corpus.ts --provider cli --model sonnet

# One map
tsx scripts/disagreement/run-corpus.ts --provider cli --only capitalism-after-ai
```

Each run writes to `.eval-runs/corpus-<timestamp>/` (gitignored): one JSON file
per map holding the transcript, the report, the graph, and the recovery score,
plus a `summary.json`. Those files are the founder-checkpoint review material.

The fixture eval is separate and stays deterministic:

```bash
tsx scripts/eval-disagreement.ts                        # 30 fixtures, no model
DISAGREEMENT_LIVE_EVAL=true tsx scripts/eval-disagreement.ts   # same fixtures, live provider
```

> There is no `bun` on the current machine. Run the repo's scripts through
> `./node_modules/.bin/<tool>` rather than the `bun run` aliases in `package.json`.

## 4. What this does not do

- It does not verify external facts. Every report remains source-only, and
  `provenance.independentlyVerified` stays `false`.
- It does not match diagnoses onto the topic library. Attaching `topicId` and
  `claimMatches` to real maps is Phase 4 in the spec and unchanged by this work.
- It does not replace the human checkpoints. It produces the material they need.
