# Argument Data-Model Audit

Read-only audit completed. Static topic specimen used: `data/topics/ai-2027.ts` because `data/topics/nuclear-power-expansion.ts` is absent from the repository file list; `ai-2027` defines the authored shape end-to-end at `data/topics/ai-2027.ts:1-528`.

## 1. Current-State Inventory

| Concept | Primary definition | Duplicates / drift |
|---|---|---|
| Graph node variants | `NodeVariant = "meta" | "pillar" | "skeptic" | "proponent" | "crux" | "evidence" | "question"` in `types/graph.ts:1-8` | Styles duplicate the enum contract in `VARIANT_STYLES: Record<NodeVariant, VariantStyle>` at `lib/variantStyles.ts:32-94`; graph generation hardcodes the same variants at `data/logicBlueprint.ts:30-156`. |
| Topic / meta-claim | `TopicSchema` has `id`, `title`, `meta_claim`, `balance`, `weight`, `verdict`, `status`, `category`, `pillars`, etc. at `lib/schemas/topic.ts:238-274` | Extraction has a separate `topic: string` as “main topic/claim” at `lib/analyze/extractor.ts:97-111`; debate APIs also use `topic: string` at `lib/debate/contracts.ts:31-39`. |
| Pillar | `PillarSchema` has `id`, `title`, `short_summary`, `icon_name`, `skeptic_premise`, `proponent_rebuttal`, `crux`, optional `evidence` at `lib/schemas/topic.ts:78-88` | Debate redefines pillar as camelCase `title`, `skepticPremise`, `proponentRebuttal` at `lib/debate/contracts.ts:25-29`; orchestrator maps snake_case to camelCase at `hooks/useDebateOrchestrator.ts:247-251`; programmatic debate has another local interface at `lib/debate/programmatic.ts:9-13`. |
| Evidence weight | `EvidenceWeightSchema` has `sourceReliability`, `independence`, `replicability`, `directness`, each 0-10, at `lib/schemas/topic.ts:8-13` | Graph converts this to one `score` 0-40 at `data/logicBlueprint.ts:149-154`; `EvidenceNodeData` stores only `score`, not sub-scores, at `components/nodes/EvidenceNode.tsx:8-18`; Scales view preserves and renders all four weights at `components/ScalesOfEvidence.tsx:115-118`. |
| Evidence item | `EvidenceSchema` has `id`, `title`, `description`, `side`, `weight`, optional `source`, `sourceUrl`, `reasoning` at `lib/schemas/topic.ts:19-28` | Extracted arguments use `evidence?: string[]` and `source?: string` at `lib/analyze/extractor.ts:22-32`; graph `EvidenceData` has only `side`, `score`, `source`, `sourceUrl` at `types/graph.ts:33-38`; UI evidence node redefines `description`, `side`, `score`, `source`, `sourceUrl` at `components/nodes/EvidenceNode.tsx:8-18`. |
| Crux | `CruxSchema` has `id`, `title`, `description`, `methodology`, optional `equation`, `verification_status`, `cost_to_verify`, optional `falsification` at `lib/schemas/topic.ts:34-53` | Graph `CruxDetail` renames `verification_status` to `status` and `cost_to_verify` to `cost` at `types/graph.ts:12-18`; `CruxSelection` repeats that modal shape at `hooks/useLogicGraph.ts:60-68`; extraction cruxes are only `description` and `significance` at `lib/analyze/extractor.ts:50-55`. |
| Question | `QuestionSchema` has `id`, `title`, `content`, optional `imageUrl`, `references` at `lib/schemas/topic.ts:103-109` | Graph includes `"question"` variant at `types/graph.ts:1-8`; blueprint maps topic questions to `variant: "question"` at `data/logicBlueprint.ts:43-55`. |
| Confidence / balance / weight | Topic has deprecated `confidence_score`, canonical `balance`, canonical `weight`, and `verdict` at `lib/schemas/topic.ts:238-246`; `computeConfidenceScore` is an alias of `computeBalance` at `lib/schemas/topic.ts:301-302` | Public API preserves deprecated `confidence_score` as `topic.balance` at `app/api/v1/topics/route.ts:40-45` and `app/api/v1/topics/[id]/route.ts:58-63`; extraction confidence is unrelated 0-1 extraction confidence at `lib/analyze/extractor.ts:110-115`. |
| Edges / relationships | Graph has `ChildSlot = "left" | "center" | "right"` and `BlueprintChildLink { id, slot }` at `types/graph.ts:10-10` and `types/graph.ts:56-59` | React Flow edges are structural: `source`, `target`, handles, styling, marker, no semantic relation type at `hooks/useLogicGraph.ts:130-158`; evidence edges are also plain source/target at `hooks/useLogicGraph.ts:511-519`. |
| Extraction argument model | `ExtractedArgument` has `claim`, optional string-array `evidence`, optional `source`, `strengthScore`, `strengthRationale` at `lib/analyze/extractor.ts:22-33` | Offline extraction emits this shape at `lib/analyze/offline.ts:118-123`; analysis UI renders it as position cards at `app/analysis/[id]/AnalysisView.tsx:337-371`. |
| Extraction position model | `ExtractedPosition` has `side`, optional `speaker`, `arguments` at `lib/analyze/extractor.ts:38-45` | Offline extraction builds only `"for"`/`"against"` positions at `lib/analyze/offline.ts:317-335`; DB stores `positions` JSONB as `ExtractedPosition[]` at `lib/db/schema.ts:104-107`. |
| Debate message | `DebateMessage` has `id`, `side`, `model`, `content`, `round`, optional `execution` at `types/debate.ts:11-20` | API input schema permits optional `id`, `model`, `role` and requires `side`, `content`, `round` at `lib/debate/contracts.ts:16-23`; minimal `DebateMessageInput` omits `id` and `model` at `types/debate.ts:22-27`. |
| Judge output | `JudgingResult` has `verdicts`, `winner`, `hasConsensus`, `aggregatedScores`, `disagreements`, `flaggedForReview`, `timestamp` at `lib/judge/rubric.ts:85-114` | API response schema repeats it in Zod at `lib/analyze/contracts.ts:39-62`; DB splits aggregate JSONB and individual verdict rows at `lib/db/schema.ts:183-231`. |

Shape-drift examples, quoted:

```ts
// Static topic evidence
export const EvidenceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  side: z.enum(["for", "against"]),
  weight: EvidenceWeightSchema,
  source: z.string().optional(),
  sourceUrl: z.string().url().optional(),
  reasoning: z.string().optional(),
});
```
`lib/schemas/topic.ts:19-28`

```ts
// Extracted argument evidence
export interface ExtractedArgument {
  claim: string;
  evidence?: string[];
  source?: string;
  strengthScore?: number;
  strengthRationale?: string;
}
```
`lib/analyze/extractor.ts:22-33`

```ts
// Graph crux detail
export interface CruxDetail {
  description: string;
  methodology: string;
  equation?: string;
  status: string;
  cost: string;
}
```
`types/graph.ts:12-18`

```ts
// Static crux fields
verification_status: z.enum(["verified", "theoretical", "impossible"]),
cost_to_verify: z.string(),
```
`lib/schemas/topic.ts:40-41`

## 2. The De-Facto Ontology

Static topic ontology:

| Node-ish concept | Fields effectively carried |
|---|---|
| Topic / Meta Claim | `id`, `title`, `meta_claim`, `status`, `category`, `balance`, `weight`, `verdict`, optional `imageUrl`, `references`, `questions`, provenance/navigation fields at `lib/schemas/topic.ts:238-274`. |
| Question | `id`, `title`, `content`, optional `imageUrl`, `references` at `lib/schemas/topic.ts:103-109`. |
| Pillar | `id`, `title`, `short_summary`, optional `image_url`, `icon_name`, `skeptic_premise`, `proponent_rebuttal`, `crux`, optional `evidence` at `lib/schemas/topic.ts:78-88`. |
| Skeptic node | Generated from `pillar.skeptic_premise` with `variant: "skeptic"`, `title: "Skeptic Position"`, `subtitle: "Opposition View"` at `data/logicBlueprint.ts:102-110`. |
| Proponent node | Generated from `pillar.proponent_rebuttal` with `variant: "proponent"`, `title: "Proponent Rebuttal"`, `subtitle: "Supporting View"` at `data/logicBlueprint.ts:112-120`. |
| Crux | Static crux fields from schema at `lib/schemas/topic.ts:34-53`; graph projection stores `detail.description`, `methodology`, `equation`, `status`, `cost` at `data/logicBlueprint.ts:122-137`. |
| Evidence | Static evidence fields at `lib/schemas/topic.ts:19-28`; graph projection stores `variant`, `title`, `content`, side-label subtitle, and `evidenceData` at `data/logicBlueprint.ts:139-156`. |

Relationship ontology today:

| Relationship | Actual representation |
|---|---|
| Topic → questions/pillars | Structural `children` with `slot` in blueprint at `data/logicBlueprint.ts:9-40`. |
| Pillar → skeptic/crux/proponent | Structural child slots left/center/right at `data/logicBlueprint.ts:77-100`. |
| Pillar → evidence | Lazy-loaded structural React Flow edge with `source: pillarId`, `target: evidenceId`, no semantic type at `hooks/useLogicGraph.ts:511-519`. |
| Semantic support/opposition | Encoded in node labels and `side: "for" | "against"`, not in edge type, at `lib/schemas/topic.ts:23-24` and `components/nodes/EvidenceNode.tsx:27-29`. |

Extracted-analysis ontology is separate: `ExtractedArguments` contains `topic`, `positions`, `identifiedCruxes`, `potentialFallacies`, `detectedBiases`, `summary`, `confidence`, `forStrength`, `againstStrength` at `lib/analyze/extractor.ts:97-116`.

## 3. Gap Table

Target node types:

| Target | Status |
|---|---|
| QUESTION | EXISTS: topic questions at `lib/schemas/topic.ts:103-109`; graph question variant at `data/logicBlueprint.ts:43-55`. |
| POSITION | PARTIAL: `ExtractedPosition` exists for extraction at `lib/analyze/extractor.ts:38-45`; static topics use skeptic/proponent text inside pillars, not standalone position nodes, at `lib/schemas/topic.ts:78-88`. |
| CLAIM | PARTIAL: `meta_claim` and extracted `claim` exist at `lib/schemas/topic.ts:240-242` and `lib/analyze/extractor.ts:22-24`; no typed CLAIM node. |
| PREMISE | PARTIAL: `skeptic_premise` exists at `lib/schemas/topic.ts:84-85`; no generic premise node or premise/conclusion link. |
| EVIDENCE | EXISTS: `EvidenceSchema` at `lib/schemas/topic.ts:19-28`. |
| ASSUMPTION | ABSENT: no field in topic, graph, extraction, debate, or judge schemas read; closest text is unstructured debate prose such as `proponent claims still rely on assumptions` at `lib/debate/programmatic.ts:106-108`. |
| INFERENCE | ABSENT/PARTIAL: judge rubric scores “valid inferences” as text criteria at `lib/judge/rubric.ts:121-129`; no inference node. |
| COUNTERCLAIM | PARTIAL: opposing side exists as `side: "against"` at `lib/schemas/topic.ts:23-24` and extraction positions at `lib/analyze/extractor.ts:38-45`; no COUNTERCLAIM node. |
| OBJECTION | PARTIAL: skeptic node/premise acts as objection at `data/logicBlueprint.ts:102-110`; no truth-vs-inference attack distinction. |
| REBUTTAL | PARTIAL: `proponent_rebuttal` exists at `lib/schemas/topic.ts:84-86`; no typed rebuttal relation target. |
| CRUX | EXISTS: `CruxSchema` at `lib/schemas/topic.ts:34-53`; extracted crux partial at `lib/analyze/extractor.ts:50-55`. |
| VALUE_JUDGMENT | ABSENT: no typed value category in audited schemas. |
| PREDICTION | ABSENT/PARTIAL: predictive content appears in data, e.g. `ai-2027` scenario prose at `data/topics/ai-2027.ts:4-5`, but no typed prediction node. |
| DEFINITION | PARTIAL: concept nodes can be spawned with `ConceptData` and dotted “definitions” edge styling at `types/graph.ts:20-25` and `hooks/useLogicGraph.ts:568-576`; no DEFINITION node type. |

Target relationship types:

| Target | Status |
|---|---|
| supports | PARTIAL: `side: "for"` implies support at `lib/schemas/topic.ts:23-24`; no edge type. |
| opposes | PARTIAL: `side: "against"` implies opposition at `lib/schemas/topic.ts:23-24`; no edge type. |
| depends_on | ABSENT: only structural child links exist at `types/graph.ts:56-59`. |
| evidences | PARTIAL: evidence is attached to topic/pillar arrays at `lib/schemas/topic.ts:87-88` and `lib/schemas/topic.ts:249-250`; no typed relation. |
| rebuts | PARTIAL: `proponent_rebuttal` exists at `lib/schemas/topic.ts:84-86`; relation target is implicit. |
| undercuts | ABSENT: no edge relation, and no inference-attack distinction in graph edges at `hooks/useLogicGraph.ts:130-158`. |
| contradicts | PARTIAL/ABSENT: guide prose says evidence can “weakens or contradicts” at `data/guides.ts:601-602`; data only stores `side`. |
| qualifies | ABSENT in implementation: guide says connection line can reveal “qualifies” at `data/guides.ts:578`, but React Flow edge has no relation field at `hooks/useLogicGraph.ts:143-158`. |
| supersedes | ABSENT: no supersession status/relation in audited schemas. |

Metadata fields:

| Target field | Status |
|---|---|
| `id` | EXISTS across Topic/Pillar/Evidence/Crux/Question at `lib/schemas/topic.ts:20`, `34-35`, `78-79`, `103-104`, `238-239`. |
| `type` | PARTIAL: graph has `variant`, not ontology `type`, at `types/graph.ts:40-42`; React Flow has component `type` at `hooks/useLogicGraph.ts:249-252`. |
| `statement` | ABSENT/PARTIAL: represented as `meta_claim`, `title`, `content`, `claim`, `description`; no canonical `statement` field at `lib/schemas/topic.ts:238-274` and `lib/analyze/extractor.ts:22-33`. |
| `description` | EXISTS for Evidence/Crux; absent on Topic/Pillar in favor of `meta_claim`/`short_summary` at `lib/schemas/topic.ts:19-28`, `34-38`, `78-88`. |
| `scope` | ABSENT in audited schemas. |
| `confidence` | PARTIAL: topic has `balance`/`weight`; extraction and judge use 0-1 `confidence` at `lib/analyze/extractor.ts:110-115` and `lib/judge/rubric.ts:56-58`. |
| `confidenceBasis` | ABSENT/PARTIAL: evidence has `reasoning` and strength has `strengthRationale` at `lib/schemas/topic.ts:27-28` and `lib/analyze/extractor.ts:29-32`; no shared field. |
| `epistemicType` | ABSENT. |
| `status` | PARTIAL: topic status enum is `settled | contested | highly_speculative` at `lib/schemas/topic.ts:127-131`; crux status is `verified | theoretical | impossible` at `lib/schemas/topic.ts:40-41`; target node status values are absent. |
| `assumptions` | ABSENT. |
| `sources` | PARTIAL: topic `references` and evidence `source/sourceUrl` exist at `lib/schemas/topic.ts:94-97`, `19-28`; no normalized `sources[]` on every node. |
| `createdAt` | PARTIAL: DB rows have `createdAt` for analyses/debates/judgments at `lib/db/schema.ts:118-119`, `146-147`, `202-203`; static topic nodes do not. |
| `updatedAt` | PARTIAL: debates have `updatedAt` at `lib/db/schema.ts:146-147`; topic has optional `last_updated`, not per-node `updatedAt`, at `lib/schemas/topic.ts:254-256`. |

Epistemic categories:

| Category | Status |
|---|---|
| empirical | PARTIAL: evidence weighting models empirical source quality at `lib/schemas/topic.ts:8-13`; no category enum. |
| predictive | ABSENT/PARTIAL: predictive topics exist in content, e.g. `AI 2027` forecast at `data/topics/ai-2027.ts:3-6`; no schema field. |
| normative | ABSENT as typed category. |
| definitional | ABSENT/PARTIAL: concept/definition-style nodes are ad hoc at `types/graph.ts:20-25` and `hooks/useLogicGraph.ts:568-576`; no category enum. |

## 4. Load-Bearing Couplings

Changing topic node/edge shapes would hit:

- `buildTopic` normalization and validation: every authored module is parsed through `TopicSchema` at `data/buildTopic.ts:11-38`; lazy loader calls `buildTopic(input)` at `data/topicLoader.ts:201-205`.
- Public API contracts: list/detail schemas expose current topic fields at `app/api/v1/topics/_schemas.ts:46-73`; routes emit `meta_claim`, `balance`, `weight`, deprecated `confidence_score`, and full `Topic` detail at `app/api/v1/topics/route.ts:32-50` and `app/api/v1/topics/[id]/route.ts:58-66`.
- Graph generation: `generateBlueprint` assumes `topic.questions`, `topic.pillars`, `pillar.skeptic_premise`, `pillar.proponent_rebuttal`, `pillar.crux`, and `pillar.evidence` at `data/logicBlueprint.ts:5-171`.
- Frontend store: `useLogicGraph` stores React Flow `Node<LogicNodeData>[]`, structural `Edge[]`, and maps blueprint fields into UI data at `hooks/useLogicGraph.ts:70-95` and `hooks/useLogicGraph.ts:99-113`.
- React Flow rendering: `DesktopCanvas` binds `metaNode`, `richNode`, `evidenceNode` component types and colors by `data.variant` at `components/DesktopCanvas.tsx:102-113`.
- Node UI: `MetaNode` requires `variant: "meta"`, `title`, `content`, `references`, `score` at `components/nodes/MetaNode.tsx:18-20` and `components/nodes/MetaNode.tsx:76-109`; `RichNode` branches on `variant === "crux"` and `variant === "pillar"` at `components/nodes/RichNode.tsx:39-44`; `EvidenceNode` requires `side` and `score` at `components/nodes/EvidenceNode.tsx:27-30`.
- Topic reading/scales/debate views: `ScalesOfEvidence` derives evidence from `topic.evidence` or `topic.pillars` at `components/ScalesOfEvidence.tsx:337-386`; `DebateView` gets the current loaded `Topic` at `components/DebateView.tsx:441-467`; `MobileArgumentList` renders pillars, evidence, cruxes, and side labels directly at `components/MobileArgumentList.tsx:144-258`.
- Topic detail pages: `TopicDetailView` renders evidence weights, crux verification, skeptic/proponent text, and aggregate evidence counts at `app/topics/[id]/TopicDetailView.tsx:149-237`, `246-294`, `300-376`, `887-913`; `ReadModeView` renders the same topic contract at `components/ReadModeView.tsx:181-328` and `356-402`.
- Debate generation: orchestrator sends `topic.meta_claim` and mapped pillar fields to debate API at `hooks/useDebateOrchestrator.ts:236-252`; debate request validates that shape at `lib/debate/contracts.ts:25-39`.
- Persistence: analyses persist extracted JSONB shapes at `lib/db/schema.ts:94-119` and `lib/db/queries.ts:44-66`; judgments persist `JudgingResult` aggregate/detail shapes at `lib/db/schema.ts:183-231` and `lib/db/queries.ts:189-229`.

## 5. Migration Assessment

Clean mappings from static topic format to target ontology:

- `Topic.meta_claim` can become a root QUESTION or CLAIM, depending product choice, from `lib/schemas/topic.ts:238-246`.
- `questions[]` maps cleanly to QUESTION nodes from `lib/schemas/topic.ts:103-109`.
- `evidence[]` maps cleanly to EVIDENCE nodes, with weight dimensions preserved from `lib/schemas/topic.ts:8-28`.
- `crux` maps cleanly to CRUX nodes, including falsification metadata when present, from `lib/schemas/topic.ts:34-53`.
- `references` and evidence `source/sourceUrl` map partially to `sources` from `lib/schemas/topic.ts:94-97` and `lib/schemas/topic.ts:25-26`.

Needs inference or editorial backfill:

- `pillar.skeptic_premise` must be classified as OBJECTION, COUNTERCLAIM, PREMISE, or POSITION based on text; schema only says “Steel-manned argument against” at `lib/schemas/topic.ts:84-85`.
- `pillar.proponent_rebuttal` must be split into CLAIM/PREMISE/REBUTTAL/INFERENCE; schema only has one rebuttal string at `lib/schemas/topic.ts:84-86`.
- Relationship types must be inferred from containment and `side`; current graph edges are structural only at `hooks/useLogicGraph.ts:130-158`.
- Epistemic categories must be inferred from prose and sources; no `epistemicType` field exists in `TopicSchema` at `lib/schemas/topic.ts:238-274`.
- Node status must be mapped from topic status and crux verification status, neither of which matches target values exactly at `lib/schemas/topic.ts:127-131` and `lib/schemas/topic.ts:40-41`.

Unrepresentable today without schema changes:

- Objection attacking premise truth vs. objection undercutting inference; there is no inference node and no relation type field at `types/graph.ts:56-59` or `hooks/useLogicGraph.ts:130-158`.
- Multiple typed sources per node; topic has `references[]`, evidence has scalar `source/sourceUrl`, and extracted arguments have scalar `source` at `lib/schemas/topic.ts:94-97`, `lib/schemas/topic.ts:25-26`, `lib/analyze/extractor.ts:27-28`.
- Per-node `createdAt`, `updatedAt`, `scope`, `assumptions`, `confidenceBasis`, `epistemicType`; static topic schema lacks these fields at `lib/schemas/topic.ts:238-274`.

## 6. Surprises

- Public guide copy says edge hover reveals whether one node “supports, opposes, or qualifies” another at `data/guides.ts:578`, but implementation edges have no semantic relationship field at `hooks/useLogicGraph.ts:143-158`.
- Guide copy says evidence links have directional relationships where green supports and red weakens/contradicts at `data/guides.ts:601-602`, but the data model only stores `side: "for" | "against"` at `lib/schemas/topic.ts:23-24`.
- `confidence_score` is not confidence; it is deprecated and mirrors `balance` at `lib/schemas/topic.ts:242-244` and `lib/schemas/topic.ts:301-302`.
- Static topics and extracted analyses are separate ontologies: topics are pillar/evidence/crux maps at `lib/schemas/topic.ts:238-274`; extraction outputs positions/arguments/cruxes/fallacies/biases at `lib/analyze/extractor.ts:97-116`.
- Debate/judge layers are side-text evaluators, not graph evaluators: extraction converts positions to flat debate messages by concatenating claim/evidence strings at `lib/analyze/extractor.ts:403-457`, and judging scores sides via rubric dimensions at `lib/judge/rubric.ts:47-58` and `lib/judge/rubric.ts:85-114`.