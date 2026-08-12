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
  /** Hero illustration shown above the question. */
  hero?: { src: string; alt: string };
  /** Short human framing used in <title> / descriptions. */
  tagline: string;
  /** Identity-stakes opener — who this page is about, in one breath. */
  hook: string;
  /** The payoff paragraph: what the map reveals about the SHAPE of the fight. */
  tldr: string;
  /**
   * A named advocate per position, keyed by position id. Paraphrased stances
   * — never fabricated quotations — so a reader gets a human to argue with.
   */
  advocates?: Record<string, { name: string; affiliation: string; line: string }>;
  /** The one screenshot-native object: two numbers and the line under them. */
  shareCard?: {
    left: { value: string; label: string };
    right: { value: string; label: string };
    line: string;
    attribution: string;
  };
  /** Steal-able insight cards surfaced between positions and cruxes. */
  highlights: ArgumentTopicHighlight[];
  /** "What you can honestly say after five minutes" bullets. */
  takeaways: string[];
  /**
   * Authored plain-English framing per crux, keyed by claim id. The default
   * crux view shows only these; the graph's own statusBasis/evidence sit
   * behind a second tap. Missing entries degrade to the graph text.
   */
  cruxNotes?: Record<string, { fight: string; soWhat: string }>;
}

const DRAFTS: Record<string, { meta: ArgumentTopicMeta; raw: unknown }> = {
  "ai-mass-unemployment": {
    meta: {
      id: "ai-mass-unemployment",
      title: "Will AI cause mass unemployment?",
      hero: {
        src: "/topics/ai-mass-unemployment-hero.jpg",
        alt: "Two crowds of office workers stand on opposite sides of a widening crack in the ground; one side's floor stays level, the other tilts away.",
      },
      tagline:
        "Hiring for 22-year-olds in AI-exposed jobs is down 16% while unemployment sits near 4%. Which number matters? The whole fight in five questions.",
      hook: "If you're 22–25 in an office job: hiring in AI-exposed work is down 16% since 2022 — while overall unemployment sits near 4%. Both numbers are real. The fight is over what they mean.",
      tldr: "This is three fights in a trench coat: whether AI is what broke entry-level hiring (the data can't yet say), whether the harm arrives as unemployment or as worse jobs (history mostly says worse jobs), and who gets to set the pace of deployment (no dataset settles that). Five questions carry almost all of it.",
      advocates: {
        "p-displacement-now": {
          name: "Erik Brynjolfsson",
          affiliation: "Stanford Digital Economy Lab",
          line: "argues the entry-level decline in AI-exposed occupations is real, measurable in payroll data, and the leading edge rather than a blip.",
        },
        "p-automation-panic-redux": {
          name: "Arvind Narayanan & Sayash Kapoor",
          affiliation: "Princeton / AI Snake Oil",
          line: "argue AI is normal technology: capability is not power, diffusion runs on decades, and institutions — not model scores — set the pace.",
        },
        "p-wage-collapse-not-unemployment": {
          name: "Daron Acemoglu",
          affiliation: "MIT",
          line: "argues automation biased toward substitution can cut labor's share and wages without ever showing up as a headline unemployment crisis.",
        },
        "p-institutional-who-decides": {
          name: "Veena Dubal",
          affiliation: "UC Irvine Law",
          line: "argues the live harm is algorithmic control over pay and scheduling, which is decided in contracts and law — not forecast in datasets.",
        },
      },
      shareCard: {
        left: { value: "4.2%", label: "U.S. unemployment, June 2026 — barely moved since 2022" },
        right: { value: "−16%", label: "Employment for 22–25s in the most AI-exposed jobs, same period" },
        line: "Both numbers are true. The whole fight is the gap between them.",
        attribution: "BLS · Stanford Digital Economy Lab / ADP — argumend.org",
      },
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
      cruxNotes: {
        "c-firms-cut-hiring-not-output": {
          fight:
            "Everyone agrees AI makes some teams faster. Nobody has the firm-level data showing what bosses then do with the slack — hire fewer, or sell more.",
          soWhat:
            "If it's “hire fewer,” the displacement case is right on the mechanism. If it's “sell more,” history repeats and the jobs come back somewhere else.",
        },
        "c-targeted-programs-can-help": {
          fight:
            "America's flagship retraining program left participants earning less than workers who got nothing. Defenders say that indicts the design, not the idea — better-funded, employer-linked programs do show gains.",
          soWhat:
            "If serious retraining works, displacement is a budget problem. If it doesn't, the main proposed remedy is theatre.",
        },
        "c-displaced-workers-can-retrain-costlessly": {
          fight:
            "Optimists assume displaced workers move on without lasting damage. The displacement data says otherwise — earnings still down 25% a decade later, and Black and non-degree workers 67% more likely to be displaced at all.",
          soWhat:
            "This assumption is doing silent work under every “the economy always adjusts” argument. If it's false, the aggregate story hides real, durable harm.",
        },
        "c-mass-unemployment-definition-strict": {
          fight:
            "One side means U-3 above 10%. Another means wages collapsing while employment looks fine. They are forecasting different disasters and scoring each other's predictions against their own definition.",
          soWhat:
            "Until somebody picks a metric, both sides can declare victory in 2041 using the same data.",
        },
        "c-credential-pathway-narrows": {
          fight:
            "AI exposure is highest in well-paid, credentialed work — which optimists read as a cushion. The counter: the credential is exactly the asset being devalued, and wage growth already lags where experience doesn't protect you.",
          soWhat:
            "Decides whether “learn to code / get a degree” is still advice or nostalgia.",
        },
      },
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
