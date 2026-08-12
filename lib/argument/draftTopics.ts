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
  /** Optional topic-specific context shown directly below the hook. */
  contextNote?: string;
  /** The payoff paragraph: what the map reveals about the SHAPE of the fight. */
  tldr: string;
  /**
   * An optional related voice or evidence source per position, keyed by
   * position id. This illustrates one argument stream; it must not imply the
   * person or group endorses every claim in the full camp.
   */
  advocates?: Record<string, { name: string; affiliation: string; line: string }>;
  /** The one screenshot-native object: two contrasting facts and the line under them. */
  shareCard?: {
    left: { value: string; label: string };
    right: { value: string; label: string };
    line: string;
    attribution: string;
  };
  /** Optional sober/topic-specific label for the highlight cards. */
  highlightsHeading?: string;
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
  cruxNotes?: Record<
    string,
    { question?: string; fight: string; soWhat: string }
  >;
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
        "Employment among 22–25-year-olds in the most AI-exposed occupations fell 16% while unemployment sat near 4%. Which number matters? The whole fight in five questions.",
      hook: "Among 22–25-year-olds in the most AI-exposed occupations, employment fell 16% relative to late 2022 after controlling for firm-level shocks — while overall U.S. unemployment sat near 4%. Both numbers are real. The fight is over what they mean.",
      contextNote:
        "“AI-exposed” means jobs whose everyday tasks overlap most with what current AI systems do — software, clerical, customer service, analysis.",
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
        left: { value: "4.2%", label: "U.S. unemployment, June 2026 — still far below a mass-unemployment threshold" },
        right: { value: "−16%", label: "Relative employment change for ages 22–25 in the most AI-exposed occupations since late 2022" },
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
            "Klarna's AI famously “did the work of 700 agents” — the company's workload-equivalence estimate, not evidence that 700 employees were laid off.",
          source: "Klarna press release",
        },
        {
          fact: "2.7×",
          context:
            "Women's share of employment in the highest GenAI-exposure category versus men's in high-income countries (9.6% vs 3.5%). Occupational segregation, especially in clerical work, drives the gap.",
          source: "ILO–NASK refined exposure index",
        },
        {
          fact: "$34,900",
          context:
            "Median wage of home-health care — America's largest projected job growth to 2034, and a concrete comparison for what aggregate job growth can mean for workers' incomes.",
          source: "BLS Employment Projections 2024–34",
        },
      ],
      closer: {
        heading: "All four camps accept both numbers. They disagree about which one is the story.",
        splits: [
          { camp: "Yes — it's already starting", reading: "the −16% employment decline is the leading edge; the 4.2% is a lagging average that will catch up." },
          { camp: "No — we've panicked before", reading: "the 4.2% is the story; the −16% is a confounded slice, half of it predating ChatGPT." },
          { camp: "Not fewer jobs — worse ones", reading: "both are true and both miss it — the damage shows up in wages and career ladders, which neither number tracks." },
          { camp: "Wrong question — who decides?", reading: "neither number settles anything; deployment terms are set in contracts and law, not forecasts." },
        ],
        take: "Unemployment is near 4% and employment among 22–25-year-olds in the most AI-exposed occupations fell 16% relative to late 2022. Both are real. Which one you think is the story is which camp you're in — and the honest answer is that firm-level data to settle attribution doesn't exist yet.",
      },
      takeaways: [
        "Employment among early-career workers in AI-exposed jobs fell ~16% — but nearly half the tech-postings collapse happened before ChatGPT existed. Attribution is the live fight, not the decline itself.",
        "Klarna's famous “AI replaced 700 agents” was the company's workload math, not evidence of 700 layoffs. Headline AI-layoff numbers rarely mean what they seem.",
        "America's biggest projected job growth is home-health care at ~$35K. Whether growth centered in jobs like that counts as the economy “adjusting” is a value question no dataset can settle.",
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
      hero: {
        src: "/topics/capitalism-after-ai-hero.jpg",
        alt: "A central channel forks toward community workshops and gardens on one side and clustered dark towers on the other.",
      },
      tagline:
        "Labor's share of income has declined globally over four decades, and the U.S. index is down since 2000. Four camps ask what AI means for the wage channel — and what “survive” even means.",
      hook: "Capitalism pays most people through wages. AI could automate a wider range of tasks while labor's share has already declined globally since the 1980s and the U.S. nonfarm-business index has fallen since 2000. The dispute is whether AI extends that trend or changes its scale.",
      tldr: "Almost nobody argues markets stop working. The real fight is narrower and stranger: whether the wage channel keeps distributing enough income to sustain demand and consent — and whether a system that keeps markets but pays people through dividends or transfers still counts as the thing we're defending. Two of the five cruxes are assumptions nobody states out loud; a third is a definition.",
      shareCard: {
        left: { value: "−19.3", label: "Index-point change in U.S. nonfarm labor share, Q1 2000 → Q2 2026" },
        right: { value: "40%", label: "Estimated share of 2025 U.S. enterprise LLM spend attributed to one provider" },
        line: "Falling wage share, high AI-provider concentration. Whether that ends capitalism depends on what you think capitalism is.",
        attribution: "BLS/FRED · Menlo Ventures — argumend.org",
      },
      advocates: {
        "p-adapts-as-always": { name: "David Autor", affiliation: "MIT", line: "argues automation substitutes for labor in some tasks while complementing it in others, and that new task creation has repeatedly restored labor demand." },
        "p-requires-restructuring": { name: "Anton Korinek", affiliation: "University of Virginia / IMF", line: "argues output can rise sharply once labor stops constraining production, which makes the distribution channel — not growth — the binding problem." },
        "p-breaks-fundamentally": { name: "Loukas Karabarbounis & Brent Neiman", affiliation: "Chicago Booth", line: "document a global decline in labor's share since the 1980s associated with the falling price of capital. This camp uses that finding as a precedent; their study does not itself establish the AI forecast." },
      },
      highlights: [
        { fact: "−19.3", context: "Index-point decline in U.S. nonfarm business labor share from Q1 2000 (112.828) to Q2 2026 (93.547) — a 17.1% relative drop.", source: "BLS via FRED, series PRS85006173" },
        { fact: "40% / 27%", context: "Estimated shares of 2025 U.S. enterprise LLM spend attributed to the two leading providers, based on a decision-maker survey and bottom-up market model.", source: "Menlo Ventures" },
        { fact: "€11.2B", context: "Mondragon's 2024 sales with more than 70,000 employees — a large live test of an alternative ownership structure at industrial scale.", source: "Mondragon 2024 annual report" },
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
        take: "Labor's share has declined globally over four decades, and the U.S. index has fallen since 2000. Whether AI turns that trend into capitalism's end or another adaptation depends on both what happens to the wage channel and which definition you started with.",
      },
      takeaways: [
        "Almost nobody serious argues markets stop working. The fight is over whether wages keep distributing enough income — and that's a narrower, more answerable question than “does capitalism survive.”",
        "Two of the top cruxes are assumptions neither side states out loud: that AI ownership stays concentrated, and that labor reallocation keeps pace. Both cases quietly depend on them.",
        "There are live alternatives with real track records — sovereign dividends, worker ownership at Mondragon scale, guaranteed-income trials — so “what else could work” is an evidence question, not just theory.",
      ],
      cruxNotes: {
        "c-ai-ownership-stays-concentrated": {
          question: "Does control of frontier AI stay concentrated — or diffuse?",
          fight:
            "Today's frontier models, chips, and cloud capacity are concentrated. The real bet is whether that concentration survives cheaper models, open weights, antitrust, and new entrants over the next decade. The map has not found decisive direct evidence that settles that forecast.",
          soWhat:
            "If ownership stays narrow, AI income can pool at the top even while output rises. If it diffuses, the demand-collapse and post-capitalist cases lose their key mechanism.",
        },
        "c-survival-definition-contested": {
          fight:
            "One side calls it capitalism as long as firms remain privately owned and prices still allocate goods. Another says the wage channel is part of the bargain, so markets plus mass transfers would already be a different system.",
          soWhat:
            "The same future could count as survival or collapse depending on the definition. Pick the test before scoring the prediction.",
        },
        "c-reallocation-keeps-pace": {
          question: "Can new work appear fast enough for displaced workers to reach it?",
          fight:
            "Past automation destroyed tasks and created new ones. The live question is speed: will complementary jobs appear soon enough, in the right places, for displaced workers to reach them without years of lost income? The map has not found decisive direct evidence for the AI-era pace.",
          soWhat:
            "If reallocation keeps pace, adaptation is a painful transition. If it lags, rising output can coexist with durable underemployment and a broken wage channel.",
        },
        "c-demand-collapse-without-recycling": {
          fight:
            "If wages shrink, purchasing power can still return through lower prices, new jobs, investment, dividends, or transfers. The dispute is whether those channels expand fast enough to buy what AI-rich firms can produce.",
          soWhat:
            "This separates a distribution problem from a macroeconomic one. Failure to recycle income means productive capacity can rise while demand and employment remain weak.",
        },
        "c-wage-channel-loses-primacy": {
          fight:
            "Wages can lose share without disappearing. The argument is over when that decline becomes a change in kind: when most non-owners can no longer rely on work as their main claim on output.",
          soWhat:
            "If wages remain primary, capitalism mostly adapts. If dividends or transfers have to replace them, the system needs structural redesign even if markets and private firms remain.",
        },
      },
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
        "$38 billion pledged for FY2019–28, 100+ military sales reported from October 2023 through early March 2024, and four positions split by leverage, legal accountability, and civilian harm.",
      hook: "This is the argument where people are least likely to grant that the other side is arguing in good faith. So this map separates what is documented from what remains uncertain: the reported direct-death total; identification, undercount, indirect deaths, and civilian–combatant classification; what the May 2024 NSM-20 review actually said; and which statutes still apply after that memorandum was rescinded in February 2025.",
      tldr: "Almost nobody disputes the 2016 MOU's $38 billion pledge for FY2019–28 or the 100+ military sales reported from October 7, 2023 through early March 2024. The fight is what follows: how the unresolved parts of the casualty record change the moral and legal analysis, whether U.S. aid creates usable leverage, and how current arms-transfer statutes are applied. The May 2024 NSM-20 review documented serious concerns while accepting assurances sufficient for aid to continue; NSM-20 itself was rescinded in February 2025.",
      shareCard: {
        left: {
          value: "Concerns found",
          label: "May 2024 review: reasonable to assess some covered arms were used inconsistently with IHL obligations or civilian-harm best practices",
        },
        right: {
          value: "Aid continued",
          label: "Same review: recipient assurances were deemed sufficiently credible and reliable",
        },
        line: "The same review documented both. NSM-20 was rescinded in February 2025; current statutes are separate.",
        attribution: "U.S. State / Defense NSM-20 report · White House — argumend.org",
      },
      highlightsHeading: "Facts that anchor the dispute",
      highlights: [
        { fact: "$38B", context: "Pledged under the 2016 U.S.–Israel MOU for FY2019–FY2028, subject to annual congressional appropriations: $33B in Foreign Military Financing plus $5B for missile defense.", source: "White House MOU fact sheet" },
        { fact: "100+ by Mar. 2024", context: "Separate military sales approved and delivered from October 7, 2023 through early March 2024 — a five-month snapshot, with most below congressional-notification thresholds.", source: "Washington Post reporting, March 2024" },
        { fact: "73,016 / 71,444", context: "Deaths reported in OCHA's June 17, 2026 snapshot / people identified by Gaza's Ministry of Health as of December 31, 2025. Undercount, indirect deaths, and civilian–combatant classification remain disputed.", source: "OCHA, citing Gaza Ministry of Health" },
        { fact: "May 2024 → Feb. 2025", context: "The NSM-20 review found a reasonable basis for serious concerns while accepting recipient assurances sufficient for aid to continue. The memorandum was rescinded in February 2025; current statutes apply separate tests.", source: "U.S. State / Defense NSM-20 report; White House" },
      ],
      closer: {
        heading: "The four positions split on two empirical hinges and one moral priority.",
        splits: [
          { camp: "Maintain full support", reading: "the alliance is load-bearing for regional stability; conditioning it signals unreliability to every other partner." },
          { camp: "Continue aid, but condition it", reading: "aid creates leverage only when Washington credibly withholds something; current statutes provide tools for doing that." },
          { camp: "Substantially reduce", reading: "years of backing show access without durable compliance, so continued support compounds the costs." },
          { camp: "Enforce the law we have", reading: "current arms-transfer statutes apply separate tests, and their implementation should be audited before support expands or contracts." },
        ],
        take: "The reported direct-death topline is no longer the largest numeric dispute. The harder disagreements are undercount and status classification, whether support buys leverage or increases escalation risk, and which obligation comes first when alliance commitments and complicity concerns collide.",
      },
      takeaways: [
        "The 2016 MOU pledged $38B for FY2019–28, subject to annual appropriations. The 100+ sales figure is a separate October 2023–early March 2024 snapshot, not a current cumulative total.",
        "Reported direct-death toplines had converged around 71,000–73,000 by mid-2026. The serious remaining disputes concern identification, undercount, indirect mortality, and the civilian–combatant breakdown — not whether every topline is arbitrary.",
        "The May 2024 NSM-20 review documented both serious concerns and assurances sufficient for aid to continue. NSM-20 was rescinded in February 2025; Leahy, FAA §620I, AECA, and other authorities remain separate.",
        "“Does U.S. aid buy leverage?” is the hidden hinge between maintaining, conditioning, and reducing support. This map has not found decisive direct evidence that settles it.",
      ],
      cruxNotes: {
        "c-gaza-death-toll-uncertain": {
          question: "What uncertainty remains in Gaza's death toll — and what does it change?",
          fight:
            "By mid-2026, a figure attributed in the press to a senior Israeli military official and Gaza health-authority reporting had moved into a similar 71,000–73,000 range for reported direct deaths. What remains unresolved is who has been identified, who is missing, indirect mortality, and the civilian–combatant breakdown.",
          soWhat:
            "The uncertainty is real, but it is not permission to treat every number as equally unsupported. Different uncertainties answer different moral and legal questions.",
        },
        "c-casualty-figures-mostly-combatants": {
          question: "What share of the dead were combatants?",
          fight:
            "Israeli officials have argued that combatants make up a large share of the dead. Independent coding has not verified a share close to the highest official claims, and the available estimates cover different periods and use different rules.",
          soWhat:
            "The civilian–combatant mix strongly changes how people judge proportionality and complicity, even though it does not by itself decide whether any particular strike was lawful.",
        },
        "c-regional-stability-depends-on-alliance": {
          question: "Does current U.S. support deter a wider war — or feed escalation?",
          fight:
            "Supporters see the alliance as deterrence against Iran and its partners. Critics argue the same visible backing can entangle the U.S., invite retaliation, and reduce diplomatic room. There is no clean counterfactual, and this map has not found decisive direct evidence for either causal story.",
          soWhat:
            "If current support is load-bearing, reducing it risks a wider war. If it is part of the escalation mechanism, maintaining it carries the risk the policy is supposed to prevent.",
        },
        "c-alliance-obligations-override-complicity": {
          question: "When alliance duties and complicity concerns collide, which comes first?",
          fight:
            "Even after agreeing on Hamas's crimes and evidence of civilian harm, people can rank two duties differently: stand by a threatened ally, or avoid enabling a partner's serious violations.",
          soWhat:
            "No casualty study resolves this priority rule. Evidence can establish the stakes; it cannot choose which obligation comes first.",
        },
        "c-aid-buys-leverage": {
          question: "Does U.S. aid create leverage that Washington can actually use?",
          fight:
            "One side says continued aid preserves private access and influence. Another says leverage exists only when Washington credibly withholds something. A third reads years of policy disagreement as evidence that neither approach reliably changes strategy. This map does not yet have decisive direct evidence separating tactical access from durable change.",
          soWhat:
            "This is the hinge between maintaining, conditioning, and reducing support. The answer may differ for a temporary operational pause and a durable change in settlements, aid access, or war aims.",
        },
      },
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
