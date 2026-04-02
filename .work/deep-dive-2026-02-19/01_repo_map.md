# Repository Map

## Date
- 2026-02-20

## Project Goal (as implemented)
- Core mission: reduce heat/noise in contentious discourse and increase understanding of disagreement rather than forcing agreement.
- Product promise: map strongest arguments, identify cruxes, score evidence quality, and surface calibrated uncertainty.

## Current Product Surfaces
- `app/page.tsx`: interactive canvas-first argument map experience with topic selection.
- `app/topics/[id]/TopicDetailView.tsx`: topic page with evidence cards, crux cards, and confidence framing.
- `app/analyze/page.tsx` + `/api/analyze`: ingest user text, extract for/against positions, cruxes, fallacies, biases.
- `components/DebateView.tsx` + `/api/debate/stream`: multi-model adversarial debate rounds with live token streaming.
- `/api/judge` + `lib/judge/*`: multi-judge council producing dimension-level verdicts + disagreement flags.
- `app/research`, `app/how-it-works`, `app/methodology`, `app/perspectives`, `app/for-educators`, `app/community`: narrative/trust/distribution content layers.

## Technical Architecture
- Frontend: Next.js App Router + React 19 + Tailwind + Framer Motion + React Flow.
- State: Zustand graph store (`hooks/useLogicGraph.ts`) for topic/map interactions.
- Data: mostly curated static topic corpus in `data/topics.ts` (very large, hand-authored structure).
- AI integration: unified agent executor supports Claude/GPT-4/Gemini/Grok; judge council parallelizes model calls.
- Persistence: Drizzle + Postgres for analyses, debates, judgments, per-judge verdicts, auth tables.

## Existing Argument Method
- Topic structured as: meta claim -> pillars -> skeptic/proponent -> crux + evidence items.
- Evidence scoring dimensions: source reliability, independence, replicability, directness.
- Confidence for curated topics computed by formula from weighted for/against evidence totals.
- Judge rubric dimensions include logic, evidence, bias/credibility, rebuttal, crux identification, clarity.

## Clear Strengths
- Strong internal coherence between mission and interaction model (steelman + crux + explicit uncertainty).
- Multi-model judging already built with disagreement detection (not just averaged score).
- Significant content foundation and educational narrative scaffolding already in place.
- Debates, analyses, and judgments are persisted (enables future personalization and longitudinal improvement).

## Structural Gaps
- No user-facing deliberation protocol that actively transforms hostile conversation into cooperative inquiry.
- No explicit conversation-level safety/quality constraints beyond generic respectful prompt text.
- Static topic corpus limits freshness, contestability workflows, and community co-creation loops.
- No formal “bridge outcome” metrics (understanding gain, misperception reduction, cross-side trust lift).
- No institutionalized translation layer between different moral/political vocabularies.
- Current confidence/evidence model can imply objectivity while governance/appeal workflows are underdefined.

## Strategic Leverage Points
- `lib/analyze/extractor.ts`: add bridge diagnostics (misunderstanding points, norm conflicts, narrative conflicts).
- `lib/judge/rubric.ts` + `lib/judge/prompts.ts`: add dialogic quality dimensions and epistemic humility checks.
- `components/DebateView.tsx`: add phase-based deliberation protocol beyond direct adversarial exchange.
- DB schema (`lib/db/schema.ts`): add longitudinal bridge metrics + user-level learning trajectories.
- Topic model (`lib/schemas/topic.ts`): add explicit value frames and stakeholder impact mapping per claim.
