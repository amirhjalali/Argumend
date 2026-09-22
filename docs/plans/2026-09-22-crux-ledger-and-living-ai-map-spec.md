# Crux Ledger, the Living AI-Discourse Map, and the North-Star Metric

Status: DRAFT, time-boxed (2026-09-22). Author: Fable. Scope: a data model, a product surface,
and one metric. Upstream contracts: `docs/ARGUMENT_MODEL.md` (v1.1 nodes/edges), `docs/CRUX_ENGINE.md`
(deterministic ranking), `types/argument.ts` (`Claim.resolution`, `cruxOverride`),
`lib/crux/rank.ts` (`identifyCruxes`), `lib/argument/draftTopics.ts` (flagship maps),
`docs/plans/2026-08-18-argumend-v2-disagreement-diagnosis-spec.md` (the paste lane).

**Why now.** The maps are photographs. A crux the map called contested in August may have been
narrowed by a September paper, and nothing in the system records that — or records that it wasn't.
The founder's north star is closing the gap between *perceived* and *actual* disagreement; wisdom
is knowing what would change your mind. A map that cannot say *what changed* cannot teach that.
The AI-jobs cluster is the living case; Covid is the retrospective that proves the format.

The ledger is also the answer to the robustness problem: "settled" is a fragile label to render as
a verdict, because it is a point-in-time editorial judgment with no audit trail. A ledger does not
assert settledness. It shows the movement and lets the reader see how much of it there was.

---

## 1. The crux ledger

### 1.1 Model

A **ledger** is append-only, per (topic, claim). Cruxes are computed (`ARGUMENT_MODEL.md` §1 —
CRUX is never a stored node type), so the ledger keys on the CLAIM id, not on a crux id, and
survives the claim dropping out of and back into the top 5.

```ts
// types/cruxLedger.ts (new)
export type CruxLedgerStatus = "open" | "narrowed" | "resolved" | "unresolvable";

export interface CruxLedgerEntry {
  id: string;                    // `${topicId}:${claimId}:${date}:${seq}`
  topicId: string;
  claimId: string;               // must resolve to a CLAIM in the graph
  date: string;                  // ISO date the movement is dated to, not the write time
  status: CruxLedgerStatus;
  resolutionKind?: ResolutionKind;   // from types/argument.ts; required unless status = "open"
  evidenceNodeIds: string[];     // EVIDENCE nodes in the same graph that moved it; [] for editorial-only
  note: string;                  // <=240 chars, plain language, no verdict language
  author: LedgerAuthor;
  supersededBy?: string;         // corrections never delete; they supersede
  createdAt: string;
}

export type LedgerAuthor =
  | { kind: "editorial"; curator: string; basis: string }
  | { kind: "judgment"; modelId: string; promptVersion: string;
      contentHash: string; validator: "pass" | "pass-with-warnings";
      reviewedBy?: string };
```

**Status semantics** (deliberately not a verdict scale):

| Status | Means | Requires |
|---|---|---|
| `open` | Still contested; nothing has moved it | nothing beyond `note` |
| `narrowed` | The live disagreement is smaller than it was — a sub-claim settled, a scope limit accepted | >=1 `evidenceNodeIds` **or** an editorial basis naming the narrowing |
| `resolved` | The stated `resolution.condition` was met | `resolutionKind`, >=1 evidence node, and the claim's `status` updated in the graph in the same change |
| `unresolvable` | No evidence can settle it — it is a value, definitional, or authority fork | `resolutionKind` in {`value-difference`, `definitional-choice`, `authority-allocation`} |

`resolved` and `unresolvable` are **not** symmetric in the UI. `resolved` fades the crux out of
candidacy. `unresolvable` keeps it on the page under the engine's existing line: *"Nothing does —
this is a standing value disagreement; the map holds both horns"* (`docs/CRUX_ENGINE.md`).

### 1.2 Who may write

| Author kind | May write | May not |
|---|---|---|
| `editorial` | any status, with `basis` (same bar as `statusBasis`, `ARGUMENT_MODEL.md` §3) | skip `basis` |
| `judgment` | `open`/`narrowed` **proposals only**, queued for review | write `resolved` or `unresolvable` unaided |
| anonymous / reader | nothing | — (reader input arrives as a source suggestion, §2.3) |

Model writes follow the judgment-as-data rule already decided in `docs/CRUX_ENGINE.md`: every
output stored with content hash, prompt/model version, validator result, human override. A
`judgment` entry with no `reviewedBy` is **invisible to the engine and to the public page**; it
lives in the review queue only. This is the whole gate. Model drift cannot move a public ledger.

### 1.3 How ranking consumes status

The ledger's latest non-superseded entry per claim yields `ledgerStatus`. `identifyCruxes`
(`lib/crux/rank.ts`) takes it as a new option and applies it **at candidacy and selection, never
inside the score** — the score stays the deterministic `0.30·C + 0.20·R + 0.35·D + 0.05·T + 0.15·S`:

1. `resolved` → **leaves candidacy**. Equivalent to a `suppress` override, but recorded with a
   date and evidence rather than a curator's taste. The graph edit that accompanies it (claim
   `status` → `broadly_accepted`/`superseded`) would drop it anyway; the ledger makes the drop
   legible instead of silent.
2. `unresolvable` → **stays in candidacy**, and pins into the emitted set if it clears the floor,
   even when redundancy control would otherwise cut it. Rationale: the T-band (0.65–1.0) already
   refuses to bury value cruxes; the ledger must not reintroduce burial by the back door.
3. `narrowed` → no score change, but the card renders the narrowing and the engine **suppresses
   the "evidence-starved crux" annotation** (the arriving evidence is the reason it narrowed).
4. `open` / absent → today's behavior exactly. The ledger is additive; an empty ledger reproduces
   the current ranking byte-for-byte. This is a required regression test (`lib/crux/rank.test.ts`).

`cruxOverride` still wins over the ledger — a curator pin/suppress remains the manual escape hatch
for the topology failure mode in `docs/CRUX_ENGINE.md`.

### 1.4 Storage

Ship as JSON alongside the draft graphs (`lib/argument/draftTopics.ts` loads them), one file per
topic: `data/argument/<topicId>.ledger.json`, validated by a Zod schema next to
`lib/argument/validate.ts`. Reasons: the maps are already static, review is a PR, and a PR diff is
a better audit trail than a table. Move to Postgres only when reader-proposed sources need a queue
(week 4+), and keep the JSON as the published projection.

---

## 2. The living AI-discourse map

One page, `/ai` (not a topic page): the current state of the AI argument across the AI maps —
`ai-mass-unemployment`, `capitalism-after-ai` (`lib/argument/topicIds.ts`), plus the consciousness
map once it lands on the new model.

### 2.1 What it shows

| Block | Content | Source |
|---|---|---|
| Top cruxes now | 5–8 cards pooled across the AI maps, ranked by each map's engine score, deduped by the existing redundancy control | `identifyCruxes` per topic, merged |
| Resolution condition | Verbatim `resolution.condition`; for `value-difference`, the "nothing settles this" line | `types/argument.ts` |
| What's arrived since | EVIDENCE nodes with `createdAt` after a reader-chosen date (default 90 days), grouped by the crux they bear on, each with `relevance` and `source.verification` | graph + ledger |
| Movement | The per-crux ledger strip: dated dots, status transitions, the note | ledger |
| Changelog | Reverse-chronological feed of every published ledger entry + graph revision across the AI maps | ledger |

No agreement percentage, no winner, no "settled" badge — the same discipline the v2 spec imposes on
the paste lane. A crux that stopped moving says "no movement since <date>", which is itself
information, and is honest in a way a verdict is not.

### 2.2 Update flow

```
new source -> v2 extraction (lib/disagreement/*) -> candidate nodes + candidate ledger entry
  -> Jev contestedness probe (paste lane only; scripts/jev-probe/round2.ts lineage)
  -> review queue -> curator publishes -> graph revision + ledger entry -> page rebuilds
```

- **Extraction** reuses the v2 pipeline, not a new one. Output is a *proposal*: candidate EVIDENCE
  nodes with `provenance.origin = "extracted"`, plus a proposed ledger entry keyed to the crux the
  evidence bears on.
- **Gate.** The Jev contestedness probe runs on the **paste lane only** — it scores whether the
  submitted text contains a contested proposition at all before anything reaches the queue. Its
  measured repeatability is the constraint (`docs/reviews/2026-09-16-jev-typesafe-probe.md`), so it
  is a *filter to reduce queue volume*, never a status source. A low-contestedness paste is dropped
  with a message; it never silently becomes a ledger entry.
- **Review** is a PR against the ledger JSON. A `resolved` entry additionally requires the graph
  edit in the same PR, enforced by a validator rule ("resolved entry without a claim status change").
- **Publish** = merge. The changelog is generated from ledger `createdAt`, not from git.

### 2.3 Reader input

A "this changed" box takes a URL plus one sentence. It creates a queue item, never a ledger entry,
and the reader is told exactly that. Rate-limited on the same path as the existing API limiters.

---

## 3. North-star metric: the perceived–actual disagreement gap

### 3.1 Definition

The map-reply tool already labels, for an argument pasted against a map, how much of the apparent
fight is not a fight. Define per reply *r*:

```
gap(r) = talking_past_share(r) + definitional_share(r) + undisputed_claim_share(r)
```

where each share is the fraction of the reply's classified propositions carrying that label, and
the labels are mutually exclusive by construction (one label per proposition). `gap` is in [0,1]:
**1.0 means none of the disagreement was real.** The north star is the population median gap, and
the movement we want is not "gap down" but *gap surfaced* — a reader who sees a gap of 0.6 and
changes what they argue about is the win.

### 3.2 What is logged

**No text. Ever.** One row per reply:

| Field | Type | Note |
|---|---|---|
| `replyId` | uuid | opaque, not joinable to a user |
| `topicId` | string | which map |
| `propositionCount` | int | denominator |
| `talkingPastCount`, `definitionalCount`, `undisputedCount`, `contestedCount` | int | numerators |
| `unmatchedCount` | int | propositions matching nothing in the map (excluded from the denominator) |
| `cruxClaimIds` | string[] | which cruxes the reply actually touched |
| `modelId`, `promptVersion` | string | so a metric shift can be attributed to a prompt change |
| `createdAt` | timestamp | day precision |

Counts and ids only. No paste, no excerpt, no IP, no user id. The metric must survive a privacy
review unchanged; anything that would not is not in the metric.

### 3.3 Aggregation

Median gap per (topic, week), with n and IQR. Medians, never means — one 40-proposition paste
otherwise owns the week. A topic-week with n < 20 renders as "insufficient", not estimated.
Prompt-version changes cut the series: a new `promptVersion` starts a new segment, annotated on the
chart, because the label distribution is a model artifact as much as a reader artifact.

### 3.4 Failure modes

| Failure | Why it bites | Mitigation |
|---|---|---|
| The classifier defines the metric | `talking_past` is a model judgment; a prompt tweak moves the north star with no change in the world | segment on `promptVersion`; hold a frozen 50-item labeled set and re-score every prompt change before adopting it |
| Selection bias | people who paste into an argument map are already unusually reflective | never call it "public discourse"; it is *our readers' gap*, stated that way on the page |
| Goodhart | optimizing gap upward rewards maps that label everything definitional | pair with `contestedClaimShare` as a guardrail; a gap rise with contested share collapsing is a regression, not a win |
| Map-shaped measurement | the gap is only as good as the map's coverage; an absent claim reads as "undisputed" | `unmatchedCount` is logged and excluded from the denominator; a rising `unmatchedCount` is a map-coverage bug, filed as one |
| Thin n | early volume is tiny | internal-only until 12 consecutive weeks clear n >= 20 |

---

## 4. Four-week build plan

**Smallest shippable slice (week 1): the ledger file plus the movement strip on one map.**
Hand-author `data/argument/ai-mass-unemployment.ledger.json` for its top 5 cruxes, add the Zod
schema and validator, render a dated movement strip on the existing crux cards. No engine change,
no new page, no model in the loop. It ships value (the map now says what moved) and it forces the
data model against real content before anything depends on it.

| Week | Deliverable | Done when |
|---|---|---|
| 1 | `types/cruxLedger.ts`, schema + validator, hand-authored ledger for `ai-mass-unemployment`, movement strip on crux cards | strip renders; empty-ledger regression test proves ranking unchanged |
| 2 | `identifyCruxes` consumes `ledgerStatus` (§1.3 rules 1–4); ledger for `capitalism-after-ai`; acceptance tests for resolved-leaves / unresolvable-stays | `lib/crux/rank.test.ts` covers all four rules; the CRUX_ENGINE named tests still pass |
| 3 | `/ai` page: pooled cruxes, "arrived since", changelog; Covid retrospective ledger as proof-of-format | page live; Covid ledger shows >=1 `resolved` and >=1 `unresolvable` with real dates |
| 4 | Metric: reply logging (counts only), weekly median aggregation, internal dashboard; extraction-to-queue path behind a flag with the Jev gate | first weekly number with n and IQR; no text column exists in the table |

Explicitly **not** in four weeks: reader-proposed sources going live, the Postgres migration,
automated `resolved` writes, any public display of the gap number.

---

## Open questions

1. **Ledger dates vs evidence dates.** `date` is the movement's date — the paper's publication, not
   our ingest. A 2024 paper noticed in 2026 would show movement two years before we saw it.
   Backdate (honest about the world, dishonest about the map) or ingest-date (the reverse)?
   Leaning: `date` = source date, plus a separate `noticedAt`.
2. Does `resolved` ever apply to a `future-observable` crux before the horizon, or only once the
   observation lands? This draft says only once it lands.
3. Should `/ai` pool across maps at all, or be three per-map "what changed" tabs? Pooling invites
   cross-topic score comparison the engine never promised.
