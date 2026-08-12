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
import capitalismAfterAiDraft from "@/data/topics/drafts/capitalism-after-ai.draft.json";
import usIsraelSupportDraft from "@/data/topics/drafts/us-israel-support.draft.json";

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
  /** The closer: how the camps split on the same evidence, + a copy-paste take. */
  closer?: { heading: string; splits: { camp: string; reading: string }[]; take: string };
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
      closer: {
        heading: "All four camps accept both numbers. They disagree about which one is the story.",
        splits: [
          { camp: "Yes — it's already starting", reading: "the −16% is the leading edge; the 4.2% is a lagging average that will catch up." },
          { camp: "No — we've panicked before", reading: "the 4.2% is the story; the −16% is a confounded slice, half of it predating ChatGPT." },
          { camp: "Not fewer jobs — worse ones", reading: "both are true and both miss it — the damage shows up in wages and career ladders, which neither number tracks." },
          { camp: "Wrong question — who decides?", reading: "neither number settles anything; deployment terms are set in contracts and law, not forecasts." },
        ],
        take: "Unemployment is near 4% and early-career hiring in AI-exposed jobs is down 16%. Both are real. Which one you think is the story is which camp you're in — and the honest answer is that firm-level data to settle it doesn't exist yet.",
      },
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
  "capitalism-after-ai": {
    meta: {
      id: "capitalism-after-ai",
      title: "Can capitalism survive AI?",
      tagline:
        "Labor's share of income has been falling for forty years. AI aims at the channel itself. Four camps, and a fight over what “survive” even means.",
      hook: "Capitalism pays most people through wages. AI is the first technology aimed squarely at that channel — and labor's share of U.S. income has already been sliding for forty years.",
      tldr: "Almost nobody argues markets stop working. The real fight is narrower and stranger: whether the wage channel keeps distributing enough income to sustain demand and consent — and whether a system that keeps markets but pays people through dividends or transfers still counts as the thing we're defending. Two of the five cruxes are assumptions nobody states out loud; a third is a definition.",
      shareCard: {
        left: { value: "−13pts", label: "U.S. labor share of income, 2000 → today (indexed, BLS via FRED)" },
        right: { value: "40%", label: "One firm's share of enterprise foundation-model spend, 2025" },
        line: "Falling wage share, rising concentration. Whether that ends capitalism depends on what you think capitalism is.",
        attribution: "BLS/FRED · Menlo Ventures — argumend.org",
      },
      advocates: {
        "p-adapts-as-always": { name: "David Autor", affiliation: "MIT", line: "argues automation substitutes for labor in some tasks while complementing it in others, and that new task creation has repeatedly restored labor demand." },
        "p-requires-restructuring": { name: "Anton Korinek", affiliation: "University of Virginia / IMF", line: "argues output can rise sharply once labor stops constraining production, which makes the distribution channel — not growth — the binding problem." },
        "p-breaks-fundamentally": { name: "Loukas Karabarbounis & Brent Neiman", affiliation: "Chicago Booth", line: "document a global decline in labor's share since the 1980s tracking the falling price of capital — the trend AI would extend, not begin." },
        "p-definitional-skeptic": { name: "Definitional skeptics", affiliation: "across the debate", line: "argue the sides score their predictions against different bars — private ownership, market allocation, or wages as the income channel — so both can claim victory on the same facts." },
      },
      highlights: [
        { fact: "−13 pts", context: "Decline in the U.S. nonfarm labor share index between 2000 and today — the trend line AI would have to reverse, not merely avoid worsening.", source: "BLS via FRED" },
        { fact: "40% / 27%", context: "Two firms' share of 2025 U.S. enterprise foundation-model spend — concentration at the input layer, before any product market.", source: "Menlo Ventures" },
        { fact: "€11.2B", context: "Mondragon's 2024 sales across 70,000+ worker-owners — the largest live test of an alternative ownership structure at industrial scale.", source: "Mondragon 2024 report" },
        { fact: "$1,000/mo", context: "The largest U.S. guaranteed-income RCT: three years, 1,000 adults — real evidence on transfers, in an economy where jobs still existed.", source: "NBER / OpenResearch" },
      ],
      closer: {
        heading: "Everyone sees the same falling wage share. They disagree about what it implies.",
        splits: [
          { camp: "Yes — it adapts like it always has", reading: "the trend is real but bounded; new tasks and new sectors have restored labor demand every previous time." },
          { camp: "Only if the channel is rebuilt", reading: "markets survive; the wage channel doesn't, so dividends, ownership, or transfers have to carry what wages used to." },
          { camp: "No — the wage bargain breaks", reading: "once output no longer needs labor, the bargain that made markets politically survivable is gone, whatever we call what's left." },
          { camp: "Wrong question", reading: "none of this is decidable until someone says which feature — private ownership, market prices, or wage income — has to survive for the answer to be yes." },
        ],
        take: "Labor's share of income has fallen for forty years and AI points at the same channel. Whether that kills capitalism or just changes how it pays people depends entirely on which definition you started with — which is why both sides will claim they were right.",
      },
      takeaways: [
        "Almost nobody serious argues markets stop working. The fight is over whether wages keep distributing enough income — and that's a narrower, more answerable question than “does capitalism survive.”",
        "Two of the top cruxes are assumptions neither side states out loud: that AI ownership stays concentrated, and that labor reallocation keeps pace. Both cases quietly depend on them.",
        "There are live alternatives with real track records — sovereign dividends, worker ownership at Mondragon scale, guaranteed-income trials — so “what else could work” is an evidence question, not just theory.",
      ],
    },
    raw: capitalismAfterAiDraft,
  },
  "us-israel-support": {
    meta: {
      id: "us-israel-support",
      title: "Should the U.S. reduce its support for Israel?",
      hero: {
        src: "/topics/us-israel-support-hero.jpg",
        alt: "Two stone tables seen from above, angled toward each other but not touching, each scattered with documents and olive branches.",
      },
      tagline:
        "$38 billion committed, 100+ arms sales, repeated UN vetoes — and a fight where the two sides do not even agree on the casualty numbers. Four positions, mapped without a thumb on the scale.",
      hook: "This is the argument where people are least likely to grant that the other side is arguing in good faith. So this map does something specific: where the facts themselves are disputed — casualty counts, what the administration's own arms-transfer review actually found — it shows you the dispute instead of picking a number.",
      tldr: "Almost nobody disputes the aid figures: $38 billion committed under the 2016 MOU, a $3.5 billion supplemental, 100+ arms sales. The fight is over three other things — what the casualty record actually is, whether U.S. aid buys any real leverage over Israeli policy, and whether existing U.S. law is already being followed. The last one is procedural, and it turns out to be where several of the deepest disagreements actually live.",
      advocates: {
        "p-maintain-support": { name: "The strategic-alliance case", affiliation: "CFR, defense establishment", line: "argues Israel is the one reliable partner in the region, that missile-defense co-development returns value to the U.S., and that visible daylight invites escalation." },
        "p-conditional-leverage": { name: "The conditioning case", affiliation: "congressional critics, rights organizations", line: "argues the human-rights conditions already written into U.S. law should actually bind — keep the alliance, enforce the strings." },
        "p-substantially-reduce": { name: "The reduction case", affiliation: "restraint-school analysts", line: "argues unconditional backing has not produced policy change and carries real costs to U.S. standing, so the support should shrink." },
        "p-enforce-existing-law": { name: "The procedural case", affiliation: "arms-transfer law specialists", line: "argues the prior question is whether the U.S. is following its own arms-transfer statutes at all — settle that before debating more or less." },
      },
      highlights: [
        { fact: "$38B", context: "Committed under the 2016 U.S.–Israel MOU for FY2019–FY2028: $33B in Foreign Military Financing plus $5B for missile defense.", source: "White House MOU fact sheet" },
        { fact: "100+", context: "Separate military sales approved and delivered by March 2024 — most below the thresholds that trigger congressional review.", source: "Washington Post reporting" },
        { fact: "Disputed", context: "Gaza casualty figures: OCHA cites Gaza Ministry of Health totals; Israeli figures and independent projections diverge sharply. This map shows the range and who contests what.", source: "OCHA / MoH / competing assessments" },
        { fact: "Ambiguous", context: "What the administration's own NSM-20 arms-transfer review concluded is itself contested — a procedural fact at the center of the legal dispute.", source: "Senate Foreign Relations release" },
      ],
      closer: {
        heading: "The four positions disagree less about values than about three specific unknowns.",
        splits: [
          { camp: "Maintain full support", reading: "the alliance is load-bearing for regional stability; conditioning it signals unreliability to every other partner." },
          { camp: "Continue aid, but condition it", reading: "the leverage exists and is simply unused — the strings in current law were meant to bind." },
          { camp: "Substantially reduce", reading: "the leverage was tested and did not work, so continued support buys costs without compliance." },
          { camp: "Enforce the law we have", reading: "none of the above is answerable while it remains contested whether existing arms-transfer statutes are being applied at all." },
        ],
        take: "Whether U.S. aid buys real leverage over Israeli policy is an unstated assumption underneath two of the four positions — and neither side has clean evidence for it. That, plus a genuinely disputed casualty record, explains most of why this argument doesn't move.",
      },
      takeaways: [
        "The aid numbers are not in dispute: $38B under the 2016 MOU, a $3.5B supplemental, 100+ arms sales. Arguing about the facts of the aid is arguing about a settled record.",
        "The casualty record IS in dispute — sources diverge and the methodologies differ. Any single number quoted at you, from either direction, is a choice among contested figures.",
        "“Does U.S. aid buy leverage?” is the hidden hinge. Two positions quietly assume it does, one assumes it was tested and failed, and the evidence is thin either way.",
      ],
    },
    raw: usIsraelSupportDraft,
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
