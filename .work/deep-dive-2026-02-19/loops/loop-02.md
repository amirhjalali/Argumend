# Loop 02

## Inputs
- `hooks/useLogicGraph.ts`, `data/logicBlueprint.ts`, `data/topics.ts`.
- Debate and judge APIs (`/api/debate*`, `/api/judge`, `/api/analyze`).
- Schema and query layer (`lib/db/schema.ts`, `lib/db/queries.ts`).

## Work Performed
- Audited data model for extensibility toward deliberation and bridge outcomes.
- Traced end-to-end flows from user input to extraction, debate generation, judgment, and persistence.
- Identified mismatch between data richness (topics/evidence) and adaptation loop (feedback/governance).

## Findings
- The stack is modular enough to support protocol upgrades without major rewrite.
- Debate generation prompts are polite but still primarily adversarial and success-oriented.
- Judge rubric tracks argument quality, but not reciprocal understanding or repair behavior.
- Persistence exists, but no schema for bridge KPIs (e.g., acknowledged strongest counterpoint, value translation success, post-deliberation hostility shift).

## Delta from Previous Loop
- Upgraded from conceptual gap to implementable insertion points in existing code.

## Open Questions
- Should bridge-quality scoring be first-class in verdict or a parallel report card?
- Should the system optimize for consensus, principled dissensus, or both by context?

## Next Loop Focus
- Diagnose product-level failure modes and rank them by harm to mission.
