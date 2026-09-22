# Map reply

Paste an argument, get the Argumend map it belongs to: which section people are
actually arguing in, who did not make an argument, which of the map's cruxes the
thread touched and which it never reached, and the strongest weighted evidence on
each side. No generated prose, no winner.

This is the productised version of experiment C in
`docs/reviews/2026-09-16-jev-typesafe-probe.md`, published as the blog post
`we-gave-a-model-that-cant-talk-1000-arguments`.

- Route: `POST /api/map-reply`
- Pipeline: `lib/mapReply/`
- Model client: `lib/jev/`
- UI: `/reply` — `app/reply/page.tsx` and `components/mapReply/`
- Live smoke test: `scripts/jev-probe/map-reply-smoke.ts`

## Scope

**This endpoint is for text the user pastes themselves.** A consent line belongs
next to the paste box before any UI ships, because the live lane sends that text
to a third party.

**It is not to be pointed at third-party community comments.** Scraping a
subreddit, a comment section or anyone else's thread and posting it here is out
of scope: the vendor contract's consent warranty is one we cannot satisfy for
text whose authors never agreed to anything. The same applies to a moderation
bot that reads a channel by itself. If that product is ever built, it needs a
different agreement first, not a different flag.

## The flag

`ENABLE_JEV_MAP_REPLY=true` turns the route on. It is off by default and the
route returns `404 FEATURE_DISABLED` while it is off.

**The live lane sends the pasted text to TypeSafe AI** (`api.typesafe.ai`), a
third party, so that it can answer typed questions about it. Before anything is
sent, the text is scrubbed (below) — but scrubbing is not anonymisation, and
enabling this flag is a data-sharing decision, not a performance one.

| Variable | Default | What it does |
|---|---|---|
| `ENABLE_JEV_MAP_REPLY` | `false` | Turns the route on. |
| `NEXT_PUBLIC_ENABLE_JEV_MAP_REPLY` | `false` | Renders `/reply`. Build-time. |
| `TYPESAFE_API_KEY` | empty | The only place the key is read. Never logged. |
| `JEV_MODEL` | `jev-1.13.0` | Pinned model id. |
| `JEV_DAILY_TOKEN_CEILING` | `5000000` | Per-process, per-UTC-day token ceiling. |
| `ARGUMEND_JEV_PROVIDER` | empty | `http` or `fake`; empty means http when the flag is on and a key exists. |
| `MAP_REPLY_TOPIC_CONFIDENCE` | `0.5` | Confidence a topic Choice must clear. |
| `TRUSTED_PROXY_HOPS` | `1` | How many proxies append to `x-forwarded-for`. |

The model is **pinned, not aliased**. `jev-latest` moves without notice and every
threshold below was tuned against `jev-1.13.0`; a silent model bump would move
the numbers out from under them. The model id the API actually reports comes back
in `execution.model` and is logged on every request — if it stops matching the
pin, the thresholds need re-checking.

### Lanes

`getJevProvider()` returns the `fake` lane whenever the flag is off or no key is
set, so a misconfigured deployment degrades to fixtures instead of crashing at
import time. The route refuses to serve fixture answers in production
(`503 PROVIDER_NOT_CONFIGURED`); in development it runs on them and says so in
`execution.lane`.

## What it does, stage by stage

**Parse.** `lib/mapReply/parse.ts` reads `name: text` lines, markdown bullets
with a bold name, and plain paragraphs. Consecutive turns by one speaker are
merged. Turns under 12 words get no per-turn questions — a one-line interjection
routes to noise and drags its chunk's answers with it — but they stay in the
transcript the thread-level probes see.

A short stoplist of annotation labels (`Edit`, `Update`, `ETA`, `TL;DR`, `Note`,
`Source`, `PS` and friends) is folded into the turn above rather than treated as
a new speaker. Without it a single Reddit post with an edit and an update
parsed as a conversation between "Unattributed", "Edit" and "Update".

**Scrub.** `lib/mapReply/scrub.ts` replaces emails, phone numbers and @handles
with `[email]`, `[phone]` and `[handle]`, and renames every speaker to
`Speaker 1`, `Speaker 2` and so on. The real names are kept in this process and
put back when the reply is composed. This is redaction of obvious identifiers,
not anonymisation: prose can identify a person without containing a single
handle.

Emails and handles are matched Unicode-aware (`\p{L}\p{N}_`), including a
fullwidth `＠`, so `@josé_muñoz` and `@Дмитрий` are redacted whole rather than
leaving their tails behind.

**Phone numbers are matched by shape, not by "digits and spaces".** Each pattern
needs a structural signal prose numbers do not have — a `+` country code, a
parenthesised group, internal `-` or `.` punctuation — or ten-plus contiguous
digits. That is deliberately conservative in one direction and strict in the
other:

| redacted | left alone |
|---|---|
| `+1 (415) 555-0132`, `+44 20 7946 0958`, `+1-415-555-0132` | `2019 2020 2021` |
| `(415) 555-0132`, `415-555-0132`, `0800.123.4567` | `12000 34000 56000` |
| `4155550132` | `15%`, `5.1%`, `1994`, `$200,000`, `$200K-500K` |
| | `2026-09-17`, `109(9): 3365-94`, `10.15.7` |

A bare space-separated number with no such signal (`020 7946 0958`) is **not**
redacted: nothing distinguishes it from a row of figures, and eating the numbers
a thread is arguing about is worse than missing one phone number.

**A speaker's name is only replaced inside someone else's prose when it is safe
to.** A name passes three gates: at least four characters, not on the
ambiguous-word stoplist (`Host`, `Guest`, `Chair`, `Will`, `Mark`, `Grant`,
`Rose`, month names, role labels), and — for short plain alphabetic names —
not used lowercase as an ordinary word anywhere in the thread. Handle-shaped
names (an underscore, a digit, or a full name with a space) skip the last two.
Without this, a panel with a speaker called Host rendered "The Speaker 1
country". The speaker's *label* is renamed either way, which is what the privacy
rule actually requires.

**A. Topic selection.** 156 maps is not a question a Choice can answer well, so a
BM25 shortlist (`lib/mapReply/prefilter.ts`) picks eight candidates and Jev makes
one Choice among those eight plus `none`. Below the confidence threshold, or on
`none`, the result is `ok: false` with `reason: "low_confidence"` — a clear "no
map", never a wrong map.

The prefilter is a Latin-script lexical match and is memoized after first use.
A thread in a non-Latin script shares no tokens with any map summary and
returns `no_candidates` before a single request is made. That is by design, not
a bug: the maps are written in English, and routing a Japanese thread to one of
them on the strength of a stray loanword would be worse than declining.

The prefilter scores title (weighted twice), meta_claim, tags, id, and the
search phrasings in `lib/questions.ts` and `data/is-claims.ts`, with light suffix
stemming. Both of those earn their place on real material: without them the
Piers Morgan immigration clip ranked 17th and never reached the Choice; with them
it ranks 7th. The rent-control thread, the trans-athletes clip and the
AI-unemployment transcript rank 1st either way.

**B. Per-turn routing.** Section Choice over the map's pillars plus `none`,
stance Choice (for / against / neither the meta_claim), a fallacy Noul and a
factual Noul. Chunked eight turns per request, with **only that chunk's turns in
the state**. This is not an optimisation: putting a 114-turn debate in one state
collapsed every speaker's fallacy score to the transcript mean (74% ± 2);
chunking spread the same scores from 14% to 95%.

A placement below the **section confidence floor** (0.7) is not counted. The
routing experiment scored 93.3% overall but 95.2% above 0.7, and the demo
thread's genuinely ambiguous comment landed at 41%. Such a turn is reported with
`placement: "tentative"`, counted under `unplaced` in `sectionCounts`, and
excluded from the choice of dominant section. If *nothing* clears the floor, the
best weak guess is still offered, but `dominantSection.tentative` is set and the
reply says "probably arguing about X … but no turn was placed on the map with
confidence" instead of asserting it.

**C. Thread-level shape.** One request: the eight-way pattern Choice, plus Nouls
for `empirical_lever`, `value_residual`, `talking_past` and `definitional`.

**D. Crux touch.** One Noul per section crux: do the participants actually argue
about this question? This is what lets the reply say which of the map's cruxes a
thread reached and which it never got to.

B, C and D run in parallel. A typical thread is four requests and under a second.

## Composition rules

The product rule is that **every sentence in the reply is either a number from
Jev or a string that already exists in the topic data**. The composition code
chooses which existing sentence to show; it never writes one.

- **"Not an argument" is composed, not asked.** `section === "none"`, or
  `fallacy >= 0.8 && factual <= 0.2`. The section Choice alone placed the insult
  comment differently across runs at 16–40% confidence, so it is not trusted on
  its own.
- **A speaker is only named flatly as not arguing** when *every turn they took*
  was probed and flagged. Short turns and turns past the cap never reach the
  model, so a speaker with unprobed turns goes into
  `notArguingInProbedTurns` instead and the reply says "in the turns we could
  check". The reply also states its own coverage: "the 8 turns we could check",
  "3 shorter turns were too brief to check", "Only the first 48 of 132 turns
  were checked".
- **The dominant section** is the one with the most probed turns, ties going to
  map order. The reply says "most of this thread" only when the count is actually
  a majority; otherwise it says "the largest share".
- **Talking-past and definitional lines appear at or above 0.5**, and are simply
  absent below it.
- **Evidence** is the strongest `for` item and the strongest `against` item of
  the dominant section, by `calculateEvidenceScore` (0–40). Where a section's
  evidence is all on one side, the two strongest items are shown and each is
  labelled with its own side. The same item is never shown twice.
- **No winner.** Jev is never asked who is right, who won, or whose argument is
  better supported. The probe review's round 3 found it confident and correct on
  easy cases and confidently wrong on a fifth of hard ones; that is exactly the
  question this product does not ask.

## Thresholds

All in `lib/mapReply/constants.ts`. Probabilities wobble by a point or two
between runs, so every threshold needs a margin — "deterministic" was overstated
in the first probe write-up.

| Threshold | Value | Meaning |
|---|---|---|
| `topicConfidence` | 0.5 | Below this, no map is shown. `MAP_REPLY_TOPIC_CONFIDENCE` overrides. |
| `sectionConfidence` | 0.7 | Below this, a turn is unplaced rather than counted. |
| `fallacy` / `factual` | 0.8 / 0.2 | The composed "not an argument" rule. |
| `threadSignal` | 0.5 | Talking-past and definitional lines. |
| `cruxTouched` | 0.5 | A crux counts as touched. |
| `minTurnWords` | 12 | Below this, no per-turn questions. |
| `turnsPerRequest` | 8 | Chunk size. |
| `maxCharacters` | 12,000 | About 3,000 tokens, well under the vendor's 32k state limit. |
| `prefilterCandidates` | 8 | Shortlist size. |
| `maxRequestBytes` | 64 KiB | Body refused unread above this. |

Every threshold is echoed back in the response under `thresholds`, so a UI can
show a probe that just missed the bar rather than silently hiding it.

## The API

`POST /api/map-reply`, body `{ "text": "..." }`.

Rate limited to 10 requests an hour and 40 a day per IP, on top of the daily
token ceiling enforced inside the client. The two buckets are spent at different
points: the **hourly** one on every attempt, as flood protection, and the
**daily** one only once a request has passed validation and is about to be
served. A burst of malformed or oversized requests therefore cannot exhaust the
day's third-party spend allowance in an hour.

The rate-limit key is the client address `TRUSTED_PROXY_HOPS` entries back from
the **end** of `x-forwarded-for` (`lib/clientIp.ts`), not the first entry. A
proxy appends what it saw; it does not replace what arrived, so the first entry
is whatever the caller wrote and keying on it hands a rotating header a fresh
bucket every request. The default of 1 assumes exactly one trusted proxy — on
Coolify, Traefik. Put another in front and raise the number. (Other API routes
still read the first entry; they predate this helper.)

An inbound `x-request-id` is adopted only when it is a well-formed UUID.
Anything else is replaced with a generated one, because it would otherwise be
reflected into a response header, the response body and the server log.

A **match** returns `200` with `ok: true` and: `topic` (id, title, metaClaim,
path, url), `thread` counts, `candidates` and `topicChoice` from stage A,
`sectionCounts` (confident `count` and `tentative` per section, plus `unplaced`
and `none` rows), `dominantSection` (with its crux and a `tentative` flag),
`turns` (every per-turn probe value including full probability maps and a
`placement`), `unplacedCount`, `notArguing`, `notArguingInProbedTurns`,
`pattern`, `signals`, `cruxes`, `evidence`, `thresholds`, the rendered
`markdown`, and `execution` (version, lane, model, redaction counts, request
count, retries, token usage, per-stage timings). `thread` reports
`turnCount`, `substantiveCount`, `unprobedCount` and `truncated`, so a caller
can always tell how much of the paste was actually looked at.

A **no-map** result also returns `200`, with `ok: false`, a `reason`
(`no_turns`, `no_candidates`, `low_confidence`, `map_unavailable`), a `message`,
the `candidates` considered, and the `topicChoice` that fell short. It is a
result, not an error.

Errors return `{ error, code, requestId }` with `x-request-id` and
`Cache-Control: no-store`. The `error` string is the shared shape asserted by
the contract matrix in `app/api/http-contracts.test.ts`; `code` and `requestId`
are diagnostic additions. Codes:
`FEATURE_DISABLED` 404, `PROVIDER_NOT_CONFIGURED` 503, `INVALID_REQUEST` 400,
`CONTENT_TOO_SHORT` 400, `CONTENT_TOO_LONG` 400, `RATE_LIMITED` 429,
`SPEND_LIMIT_REACHED` 503, `PROVIDER_TIMEOUT` 504, `PROVIDER_UNAVAILABLE` 503,
`INTERNAL_ERROR` 500.

## Data handling

- **Nothing is persisted.** No database write, no file, no cache. The pasted text
  lives in one request's memory.
- **Nothing is logged.** The log line carries lengths, turn counts, timings, the
  model, token usage, redaction counts and the chosen topic id. There is a test
  that fails if the pasted text reaches the log.
- **The key** is read from `process.env.TYPESAFE_API_KEY` in exactly one function
  and never appears in an error message. Upstream error bodies are cancelled
  unread, because they can echo the request.
- **The third party** receives the scrubbed, speaker-renamed text. Their
  retention and training terms are theirs, not ours; the founder's decision to
  enable the flag is the decision to accept them.

## Prompt injection

TypeSafe documents that injected instructions and misleading framing in the state
can influence outputs. The pipeline keeps the two channels apart:

- Every `instructions` string is built from fixed text and map data. Nothing read
  from the paste is ever interpolated into one. `lib/mapReply/questions.test.ts`
  asserts this.
- The paste appears only under the state keys `pasted_thread` and `pasted_turns`,
  which are named so that a question can refer to them as data.
- Questions reference turns by path (`pasted_turns.t3`), never by quoting them.

**The residual risk is real.** Separating the channels stops a thread from
issuing an instruction; it does not stop a thread from being written so as to
tilt a probe — a comment that loudly frames itself as being about a different
section can still move the section Choice, and a confident assertion can still
move a contestedness Noul. What limits the damage is what the output can be: the
reply can only ever show a section of an existing map, an existing crux, and
existing evidence, with numbers attached. A successful injection changes which
true sentence is shown. It cannot introduce a false one, invent a study, or
produce a verdict, because no part of the composition can emit text that is not
already in the map.

### Retries and vendor backpressure

Five retries with jittered backoff, a 10-second per-attempt deadline and a
45-second whole-call deadline. `Retry-After` is honoured when it is a wait this
client can actually sit out; a longer one (a 429 asking for ten minutes) fails
immediately with `JEV_UNAVAILABLE` and the requested wait in the message, rather
than retrying early and spending the remaining attempts to earn another 429.

A 200 whose body fails validation is still charged to the daily token ceiling
when the payload reported its usage: it was billed either way.

## Running the smoke test

```bash
export TYPESAFE_API_KEY="$(grep '^TYPESAFE_API_KEY=' .env.local | tail -1 | cut -d= -f2)"
bun scripts/jev-probe/map-reply-smoke.ts
bun scripts/jev-probe/map-reply-smoke.ts --clip clips/piers-immigration.diarized.json
bun scripts/jev-probe/map-reply-smoke.ts --record
```

It runs the real pipeline against the live API on the experiment C rent-control
thread, and on a debate clip if one is on disk (see `scripts/jev-probe/CLIPS.md`
for how to produce one; transcripts are not stored in the repo). It prints the
per-turn probes, the thread-level probes, the crux touch scores, the composed
reply, the per-stage timings and the token usage.

`--record` rewrites `lib/mapReply/__fixtures__/rentControl.jev.json`, the
recorded answers behind the pipeline tests and the markdown snapshot. Those are
the only real model judgements pinned in the test suite, so re-record whenever a
question's wording changes and read the diff before committing it.

Reference run, 2026-09-21, `jev-1.13.0`:

| thread | requests | wall | tokens in / out | result |
|---|---|---|---|---|
| expC rent-control, 8 turns, 1,334 chars | 4 | 721 ms | 9,510 / 1,469 | rent-control-effectiveness at 95% |
| Piers Morgan immigration clip, 9 turns, 4,353 chars | 5 | 476 ms | 12,725 / 1,607 | immigration-national-identity at 99% |

## Tests

```bash
bun run test        # vitest; the full suite via bun's own `bun test` hangs
bunx tsc --noEmit
bun run lint
```

No test touches the network. `lib/jev/client.test.ts` drives the HTTP provider
through an injected `fetch`; everything else runs on `FakeJevProvider`, which
replays the recorded fixtures and deterministically synthesises anything they do
not cover.

## UI

`/reply`, gated on `NEXT_PUBLIC_ENABLE_JEV_MAP_REPLY`. The page 404s while that
flag is off, mirroring `/analyze-v2`. It is a separate flag from
`ENABLE_JEV_MAP_REPLY` on purpose: rendering a page is not the decision to send
someone's text to a third party, so both have to be on for a submit to reach the
model. With the page on and the route off, a submit comes back with plain
"switched off on this deployment" copy. The page is `noindex` and stays out of
the sitemap while it is flagged (guarded in `app/sitemap.test.ts`).

Files: `app/reply/page.tsx` (server shell, `TopBar` + `Footer` like
`/analyze-v2`), `app/reply/error.tsx`, and `components/mapReply/`.

**The numbers are the product.** The reply object already carries every probe
value, and the design rule is that they are shown rather than summarised away:

- **Thresholds are drawn, not applied silently.** Every meter that has a
  threshold — topic confidence, the four thread-level signals, each crux touch
  score — draws it as a tick on its own track, and all four signals are listed
  whether or not they cleared it. A signal at 49% against a 50% bar is the
  difference between "they are not talking past each other" and "we could not
  tell", and a panel that showed only what fired would read as more certain than
  the pipeline is.
- **Low-confidence placements are marked.** A turn's section chip goes dashed
  and says "low confidence" below 0.7, per the probe review's routing test.
  `components/mapReply/confidence.ts` holds that number; it is a presentation
  rule and deliberately not one of the pipeline's thresholds.
- **A hedge above the whole reply** when the topic Choice itself came in below
  0.7, because everything under it is read off that one map.
- **"Not an argument" turns are dimmed, not dropped**, and print which of the
  two composition rules caught them.
- **Each evidence card carries its own side label.** Never a "for and against"
  pair header: a section whose evidence is all one way still shows two cards.
- **A no-map answer is a result, not an error.** It shows the bar that was
  missed and the maps the shortlist put in front of the model.
- **The footer prints the execution line**, redaction count included. That count
  is the only evidence a reader has that the consent line meant what it said,
  and the lane is named so a fixture answer can never read as a judgement.

**Consent.** One line immediately above the submit button, wired to it with
`aria-describedby`, linking to `/privacy`. Rendered by the shared
`components/AiConsentLine.tsx`; the sentence comes from
`buildMapReplyConsentLine()` in `lib/aiProviders.ts` rather than being typed
into the component, so the copy and the request path cannot name different
companies.

It is a different sentence from the diagnosis lane's `buildConsentLine()`, off
the same provider registry, for three reasons. `MAP_REPLY_PROVIDER_IDS` is
`["typesafe"]` — one live lane, so naming the vendor outright beats linking the
phrase "our AI provider". It adds "Identifiers are removed first", which is true
here because of `lib/mapReply/scrub.ts` and false of `/analyze` and
`/analyze-v2`, which send the paste through unaltered. And its `/privacy` link
is the trailing word "Privacy" rather than a phrase inside the sentence.
`lib/aiProviders.test.ts` pins both sentences verbatim and asserts the redaction
clause never leaks onto an analyze lane. `/privacy` carries the same
distinction, and `docs/PRIVACY_AND_CONSENT.md` maps each claim to its code path.

**Tests.** `components/mapReply/MapReplyClient.test.tsx` renders the real
pipeline output on the recorded rent-control answers rather than a hand-written
fixture, so a change to composition surfaces as a rendering failure.
