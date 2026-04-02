# Final Plan Draft

## North Star
Make Argumend the most compelling place to lay out arguments by making it the first mainstream platform where people can disagree intensely **and** leave with higher mutual intelligibility.

## Top 10 Compelling Changes

1. **Deliberation Protocol Engine**
- Replace pure adversarial rounds with phases: Clarify -> Steelman -> Crux -> Evidence -> Synthesis -> Dissensus/Consensus.

2. **Validity-Claim Lens**
- Tag statements as factual, normative, sincerity-based, or interpretive; score by claim type.

3. **Reciprocal Steelman Gate**
- No rebuttal until each side passes opponent-approval restatement.

4. **Moral Translation Assistant**
- Rephrase arguments into opponent value language without changing factual content.

5. **Evidence Challenge Queue**
- Public mechanism to challenge evidence weights/sources and propose revisions.

6. **Bridge Scorecard**
- Track understanding gain, acknowledged strongest counterpoint, hostility shift, and update behavior.

7. **Dignified Dissensus Mode**
- Formal endpoint for principled unresolved disagreement with explicit crux backlog.

8. **Repair Phase Trigger**
- Detect escalation and inject structured repair steps before continuing argument.

9. **Confidence Ledger Versioning**
- Transparent history of confidence changes and rationale for each update.

10. **Calibration Reputation**
- Reward users for prediction accuracy and belief-updating quality, not applause metrics.

## Architecture Mapping (Repo Anchors)
- Debate protocol: `components/DebateView.tsx`, `app/api/debate/stream/route.ts`
- Extraction upgrades: `lib/analyze/extractor.ts`
- Judge upgrades: `lib/judge/rubric.ts`, `lib/judge/prompts.ts`, `lib/judge/council.ts`
- Persistence: `lib/db/schema.ts`, `lib/db/queries.ts`
- Topic model extensions: `lib/schemas/topic.ts`, `data/topics.ts`, `data/logicBlueprint.ts`
- UI surfaces: `components/JudgingResults.tsx`, `app/topics/[id]/TopicDetailView.tsx`, `app/methodology/page.tsx`

## Phased Rollout

### Phase 1 (4-6 weeks): Protocol + rubric foundations
- Implement protocol engine, validity tags, steelman gate, bridge telemetry v1.
- Add A/B tests against current debate flow.

### Phase 2 (6-8 weeks): Governance + transparency
- Ship challenge queue, confidence ledger versioning, adjudication workflow.
- Publish methodology and revision logs.

### Phase 3 (6-8 weeks): Personalization + reputation
- Add calibration reputation and user learning trajectories.
- Launch educator/community bridge programs.

## Success Metrics
- Primary: cross-side understanding gain, reduction in affective hostility, steelman pass rate.
- Secondary: return usage in contested topics, challenge resolution time, confidence-update quality.
- Safety: toxicity rate, unresolved escalation rate, moderation intervention burden.

## Key Risks & Controls
- Risk: performative compliance with protocol.
- Control: combine self-report with behavioral metrics and random audits.

- Risk: moral translation seen as manipulative.
- Control: show transparent side-by-side original + translated framing.

- Risk: governance overhead too high.
- Control: triage queue + AI pre-screen + human final arbitration for high-impact topics.
