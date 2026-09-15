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

### Using it from `/analyze-v2`

The analyze route aborts at 45 seconds, which the CLI lane cannot meet. So the
route's budget follows the configured lane: it stays at the spec's 45 seconds
for the hosted provider, and widens to the CLI budget only when
`ARGUMEND_DISAGREEMENT_PROVIDER=cli` **and** the process is not production.
Production is never widened, and the CLI provider refuses to run there in any
case.

Practically: with the CLI lane set, `/analyze-v2` works against `next dev`, but
a submission takes minutes rather than seconds. It is a review tool, not a
demo of the served experience.

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

# Widen to the legacy three-pillar topics, bounded
tsx scripts/disagreement/run-corpus.ts --provider cli --include-legacy --limit 15
```

Flags: `--provider fake|cli`, `--cli claude|codex`, `--model`, `--only <topicId>`,
`--timeout <seconds>`, `--include-legacy`, `--limit <n>`, `--concurrency <n>`.

**Always pass `--concurrency`** (default 4). Each map is an independent
subprocess, so a sequential run spends nearly all of its wall clock idle. If
runs start failing with `MODEL_UNAVAILABLE`, the subscription is rate-limiting
the parallel calls; lower it rather than retrying into the wall.

### The other half: authored sources

Map recovery can only ask whether the pipeline recovers a structure we already
know is there, and its input came from the same maps used to grade it. That is
not evidence that a diagnosis of a *real* argument is any good. For that:

```bash
tsx scripts/disagreement/run-sources.ts --provider cli --concurrency 6 --limit 15
```

This diagnoses the authored fixture texts in `data/evals/disagreement/` — group
chats, forum threads, op-eds, written as things a person would paste. It emits
**no score**, deliberately: there is no answer key, so the output is reports to
read. These are the founder-checkpoint material.

`--include-legacy` reaches the 156 three-pillar topics through
`adaptTopicToArgumentGraph`. Their ground truth is weaker — the adapter rewrites
a declarative meta-claim into a question and flags its own output for editorial
review — so read those rows as indicative, not as a bar to clear. Curated maps
win on an id collision.

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

## 5. Rate limiting

`POST /api/disagreements/analyze` limits anonymous callers to 3 analyses per
hour and 10 per day, keyed by a hashed client IP (spec §11.3). Both windows are
applied on every request. A denied request returns `429` with `Retry-After`
(whole seconds), `X-RateLimit-Remaining`, and the typed `RATE_LIMITED` body.
The raw IP is never logged and never reaches the limiter; the handler hashes it
first.

### The interface

The limiter sits behind a small contract in `lib/disagreement/rateLimiter.ts`:

```ts
interface RateLimiter {
  check(key: string): Promise<RateLimitDecision>;
}

interface RateLimitDecision {
  allowed: boolean;   // false when any window is exhausted
  remaining: number;  // requests left in the tightest window
  resetAt: number;    // epoch ms; the latest reset across windows
}
```

`check` records one request for `key` and consumes every configured window,
including on calls it denies. The handler in `lib/disagreement/analyzeHandler.ts`
takes a `RateLimiter` through `createDisagreementAnalyzeHandler({ rateLimiter })`;
the route file exports the handler built with the default instance. Tests
inject a stub to pin the `429` contract without touching shared state.

### The MVP boundary: per-process only

The only implementation is `InMemoryRateLimiter`, which wraps the existing
`lib/rate-limit` Map. Counters live in the memory of the Node process that
served the request. That means:

- Two app instances behind one load balancer each keep their own counters, so a
  client can get roughly `N x` the intended budget across `N` instances.
- A restart or redeploy resets every counter.
- Nothing is shared with the feedback endpoint or the legacy `/api/analyze`
  limiter beyond living in the same Map.

This is a deliberate MVP boundary per spec §11.3: use the existing in-memory
limiter, add the interface, and do not introduce Redis or any new dependency.
Provider spend is capped outside the application. Replace the limiter before
any broad, multi-instance rollout.

### What a shared implementation would need

Only the interface contract is defined here. A shared `RateLimiter` must:

- Implement `check(key)` so that one call atomically increments every window
  and returns the combined decision (increment-then-compare, not read-then-write).
- Return `resetAt` as an absolute epoch timestamp so `Retry-After` is computed
  the same way regardless of backend.
- Treat `key` as opaque and never persist or log anything that could be
  reversed into an IP.
- Fail closed or fail open by explicit choice when the backing store is
  unreachable; the handler does not catch limiter errors today.

Swap it in by passing the new instance to `createDisagreementAnalyzeHandler`
in `app/api/disagreements/analyze/route.ts`. The handler and its tests need no
other change.
