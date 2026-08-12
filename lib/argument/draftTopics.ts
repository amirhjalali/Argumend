/**
 * Registry of new-model (ArgumentGraph v1.1) topics.
 *
 * These are authored as validated draft JSON in data/topics/drafts/ and render
 * through the progressive-disclosure DebateView instead of the legacy
 * pillar/graph experience. The crux ranking is computed server-side at build
 * time — it is deterministic (see lib/crux), so there is nothing to hydrate.
 */
import { parseArgumentGraph } from "@/lib/schemas/argument";
import { identifyCruxes, type CruxResult } from "@/lib/crux";
import type { ArgumentGraph } from "@/types/argument";
import aiMassUnemploymentDraft from "@/data/topics/drafts/ai-mass-unemployment.draft.json";

export interface ArgumentTopicMeta {
  id: string;
  title: string;
  /** Short human framing used in <title> / descriptions. */
  tagline: string;
}

const DRAFTS: Record<string, { meta: ArgumentTopicMeta; raw: unknown }> = {
  "ai-mass-unemployment": {
    meta: {
      id: "ai-mass-unemployment",
      title: "Will AI cause mass unemployment?",
      tagline:
        "Four positions, the evidence behind them, and the handful of unresolved questions the debate actually turns on.",
    },
    raw: aiMassUnemploymentDraft,
  },
};

export { argumentTopicIds } from "@/lib/argument/topicIds";
import { argumentTopicIds as registeredIds } from "@/lib/argument/topicIds";

// The proxy allowlist (lib/argument/topicIds.ts) must stay in lockstep with the
// draft registry, or new-model topics 404 at the middleware before the page runs.
const draftIds = Object.keys(DRAFTS).sort().join(",");
const registered = [...registeredIds].sort().join(",");
if (draftIds !== registered) {
  throw new Error(
    `ArgumentGraph topic registry mismatch: drafts [${draftIds}] vs allowlisted ids [${registered}] — update lib/argument/topicIds.ts`
  );
}

export interface ArgumentTopic {
  meta: ArgumentTopicMeta;
  graph: ArgumentGraph;
  cruxes: CruxResult[];
}

const cache = new Map<string, ArgumentTopic>();

export function loadArgumentTopic(id: string): ArgumentTopic | null {
  const entry = DRAFTS[id];
  if (!entry) return null;

  const cached = cache.get(id);
  if (cached) return cached;

  const parsed = parseArgumentGraph(entry.raw);
  if (!parsed.ok) {
    // A registered draft failing its own schema is a build-stopping defect:
    // returning null here would let `next build` succeed while the canonical
    // URL silently 404s. Fail loudly; scripts/validate-argument-draft.ts gives
    // the full diagnostic.
    throw new Error(
      `ArgumentGraph draft "${id}" failed schema validation (${parsed.errors.length} errors): ${parsed.errors.slice(0, 5).join("; ")}`
    );
  }

  const topic: ArgumentTopic = {
    meta: entry.meta,
    graph: parsed.graph,
    cruxes: identifyCruxes(parsed.graph),
  };
  cache.set(id, topic);
  return topic;
}
