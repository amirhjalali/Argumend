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

export interface ArgumentTopicHighlight {
  /** The big steal-able number/phrase ("−16%", "700 'agents'"). */
  fact: string;
  context: string;
  source: string;
}

export interface ArgumentTopicMeta {
  id: string;
  title: string;
  /** Short human framing used in <title> / descriptions. */
  tagline: string;
  /** Identity-stakes opener — who this page is about, in one breath. */
  hook: string;
  /** The payoff paragraph: what the map reveals about the SHAPE of the fight. */
  tldr: string;
  /** Steal-able insight cards surfaced between positions and cruxes. */
  highlights: ArgumentTopicHighlight[];
  /** "What you can honestly say after five minutes" bullets. */
  takeaways: string[];
}

const DRAFTS: Record<string, { meta: ArgumentTopicMeta; raw: unknown }> = {
  "ai-mass-unemployment": {
    meta: {
      id: "ai-mass-unemployment",
      title: "Will AI cause mass unemployment?",
      tagline:
        "Hiring for 22-year-olds in AI-exposed jobs is down 16% while unemployment sits near 4%. Which number matters? The whole fight in five questions.",
      hook: "If you're 22–25 in an office job: hiring in AI-exposed work is down 16% since 2022 — while overall unemployment sits near 4%. Both numbers are real. The fight is over what they mean.",
      tldr: "This is three fights in a trench coat: whether AI is what broke entry-level hiring (the data can't yet say), whether the harm arrives as unemployment or as worse jobs (history mostly says worse jobs), and who gets to set the pace of deployment (no dataset settles that). Five questions carry almost all of it.",
      highlights: [
        {
          fact: "−16%",
          context:
            "Relative employment decline for 22–25-year-olds in the most AI-exposed jobs since late 2022 — while U-3 unemployment stayed near 4%.",
          source: "Stanford Digital Economy Lab / ADP payroll data",
        },
        {
          fact: "700 “agents”",
          context:
            "Klarna's AI famously “did the work of 700 agents” — a workload estimate, not layoffs. The company later brought humans back.",
          source: "Klarna press release; later reporting",
        },
        {
          fact: "2.7×",
          context:
            "Women's exposure to generative AI versus men's in high-income countries — because clerical work, the most exposed job family, is 70–92% female.",
          source: "International Labour Organization",
        },
        {
          fact: "$34,900",
          context:
            "Median wage of home-health care — America's largest projected job growth to 2034, and the default landing spot for displaced office workers.",
          source: "BLS Employment Projections 2024–34",
        },
      ],
      takeaways: [
        "Early-career workers in AI-exposed jobs fell ~16% — but nearly half the tech-postings collapse happened before ChatGPT existed. Attribution is the live fight, not the decline itself.",
        "Klarna's famous “AI replaced 700 agents” was workload math, not layoffs — and the company later rehired humans. Headline AI-layoff numbers rarely mean what they seem.",
        "America's biggest projected job growth is home-health care at ~$35K. Whether landing there counts as the economy “adjusting” is a value question no dataset can settle.",
      ],
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
