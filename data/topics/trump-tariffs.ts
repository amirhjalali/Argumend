import type { Topic } from "@/lib/schemas/topic";

export const trumpTariffsData = {
  id: "trump-tariffs",
  title: "Trump's Tariffs & Protectionist Trade Policy",
  meta_claim:
    "Trump's protectionist trade policy — broad reciprocal tariffs, Section 232 metals duties, and layered tariffs on China — has revived American manufacturing, reduced strategic dependence on rivals, and rebalanced trade in favor of US workers.",
  status: "contested" as const,
  category: "economics" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Consumer Prices & Inflation Pass-Through
    // =========================================================================
    {
      id: "inflation-passthrough",
      title: "Consumer Prices & Inflation Pass-Through",
      short_summary:
        "Trump claimed foreign exporters would pay the tariffs, but the empirical question is who actually bears the cost. Studies converge on substantial US consumer and importer incidence: Cavallo finds ~20% retail pass-through, HBS puts the consumer share near 43%, and the Federal Reserve estimates tariffs raised core goods prices by 3.1%.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Tariffs are a tax paid by Americans, not by foreign exporters. The 'China pays the tariff' claim is empirically false. The Federal Reserve estimated that without tariffs, inflation would have returned to its 2% target during 2025; instead tariffs added roughly 0.4 percentage points to annual inflation and left the price level about 0.9% higher by the end of 2026. The Yale Budget Lab projects a $760-$1,200 annual loss per household, with the bottom income decile absorbing roughly three times the burden of the top decile. This is a regressive consumption tax dressed up as trade policy.",
      proponent_rebuttal:
        "Pass-through is partial, not total — and that is the point. The Harvard Business School analysis found foreign exporters absorbed roughly 20% of the burden and importing firms compressed margins to absorb more, meaning the policy does shift real costs onto trading partners. Effective tariff rates near 11.8% are far below the deadweight catastrophe critics predicted, and core inflation effects have been a one-time price-level adjustment, not a sustained inflationary spiral. Tariff revenue — $171-207 billion in FY2026 — can fund offsetting tax cuts that change the net distributional picture, especially if structured progressively.",
      crux: {
        id: "tariff-incidence-split",
        title: "The Tariff Incidence Split Test",
        description:
          "The load-bearing empirical question is what share of the tariff cost is ultimately paid by US consumers and importers versus absorbed by foreign exporters. If the lion's share lands domestically, 'China pays' is refuted and tariffs function as a domestic consumption tax. If exporters absorb a large share, the policy genuinely shifts costs abroad. Real-time price-matching studies can resolve this with high precision.",
        methodology:
          "Match daily retail prices to product-level tariff rates and country-of-origin, as Cavallo, Llamas, and Vazquez did, decomposing the price response into consumer, importer-margin, and foreign-exporter components. Cross-reference with Federal Reserve FEDS Note real-time CPI decompositions and BLS import/export price indices to estimate the three-way incidence split at the product category level.",
        verification_status: "verified" as const,
        cost_to_verify:
          "$0 (Retail scanner data, BLS price indices, and published academic decompositions are available)",
      },
      evidence: [
        {
          id: "cavallo-passthrough",
          title: "Cavallo et al. Find ~20% Retail Pass-Through by September 2025",
          description:
            "Cavallo, Llamas, and Vazquez (Harvard/MIT) matched daily retail prices to product-level tariff rates and country-of-origin, finding a roughly 20% retail pass-through by September 2025 and a cumulative contribution of about 0.7 percentage points to all-items CPI. The Federal Reserve's March 2026 FEDS Note 'The Slow Climb' independently estimated retail goods price levels were 3.1% higher because of tariffs alone.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 9,
          },
          source: "Cavallo, Llamas & Vazquez (SSRN); Federal Reserve FEDS Notes",
          sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5795728",
          reasoning:
            "This is the empirical anchor of the inflation debate, using high-frequency retail scanner data matched to tariff schedules. The convergence with independent Federal Reserve estimates makes it highly replicable. It directly refutes the claim that foreign exporters bear the tariff, though the partial (not total) pass-through leaves room for the proponent reading.",
        },
        {
          id: "hbs-burden-split",
          title: "HBS Finds Consumers Absorb 43% of the Tariff Burden",
          description:
            "A Harvard Business School analysis of the seven months of sweeping 2025 tariffs found the burden split roughly: consumers absorbing about 43%, importing firms about 37% through compressed margins, and foreign exporters about 20%. This shows the cost is shared rather than borne entirely by any one party, complicating both the 'China pays' claim and the 'tariffs are a pure consumer tax' claim.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Harvard Business School Working Knowledge",
          sourceUrl: "https://www.library.hbs.edu/working-knowledge/tariffs-leave-consumers-and-companies-splitting-the-tab",
          reasoning:
            "Proponents cite the ~20% foreign-exporter share as evidence the policy shifts real costs abroad. The analysis is methodologically credible and independent, but the consumer share (43%) is the largest single component, meaning the strongest version of 'China pays' remains false even on this favorable reading.",
        },
        {
          id: "fed-inflation-counterfactual",
          title: "Federal Reserve: Without Tariffs, Inflation Would Have Hit 2% in 2025",
          description:
            "The Federal Reserve's April 2026 FEDS Note estimated tariffs raised core goods prices by 3.1% and concluded that, absent tariffs, inflation would have returned to the Fed's 2% target during 2025. The CBO estimated tariffs added 0.4 percentage points to annual inflation across 2025-2026, leaving the price level about 0.9% higher by the end of 2026.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source: "Federal Reserve FEDS Notes (Apr 2026); CBO Publication 61389",
          sourceUrl: "https://www.federalreserve.gov/econres/notes/feds-notes/detecting-tariff-effects-on-consumer-prices-in-real-time-part-II-20260408.html",
          reasoning:
            "The Federal Reserve and CBO are authoritative, independent institutions with no stake in the trade debate. Their convergent estimates make this strong evidence that tariffs raised consumer prices. The counterfactual claim is an inference, but it is grounded in the same real-time price data as the pass-through studies.",
        },
        {
          id: "yale-household-incidence",
          title: "Yale Budget Lab: $760-$1,200 Per Household, Regressive Incidence",
          description:
            "The Yale Budget Lab's April 8, 2026 analysis projected a household loss of $760 per year if Section 122 tariffs expire on schedule and $1,200 if extended, with the bottom income decile absorbing roughly three times the burden of the top decile. PIIE (Clausing & Lovely) independently estimated about $1,200 per household for the Canada-Mexico-China tariffs alone, and the Tax Foundation estimated roughly a $700 per-household tax increase in 2026.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Yale Budget Lab; PIIE; Tax Foundation",
          sourceUrl: "https://budgetlab.yale.edu/research/state-us-tariffs-april-8-2026",
          reasoning:
            "Three independent modeling shops (Yale, PIIE, Tax Foundation) land within a half-order-of-magnitude of each other, strengthening confidence in the household cost. The regressive distribution directly challenges the working-class rationale for the policy, though tariff-funded tax cuts could in principle offset the net incidence.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Manufacturing Employment & Reshoring
    // =========================================================================
    {
      id: "manufacturing-reshoring",
      title: "Manufacturing Employment & Reshoring",
      short_summary:
        "The central justification for tariffs is reviving American manufacturing. Critics point to flat BLS payroll data and net-negative employment effects once downstream input-cost shocks and retaliation are counted; hawks point to capex commitments and greenfield announcements as evidence of a 'stealth boom' not yet visible in headcount.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The promised reshoring boom has not arrived in the data. The 2023 USITC Section 232/301 study found that steel and aluminum tariffs created modest jobs in protected sectors but destroyed roughly equivalent or greater jobs in steel- and aluminum-using industries downstream. CRS reports consistently find Section 232 effects net-negative for total manufacturing employment. The Yale Budget Lab projects manufacturing output up only modestly long-run, total employment down 0.3 percentage points, and unemployment up 0.3 points by the end of 2026. 'Liberation Day' tariffs were supposed to revive manufacturing; so far they have not.",
      proponent_rebuttal:
        "Headcount in BLS payrolls is the wrong metric and the wrong timeframe. The reshoring response shows up first in capital expenditure commitments and greenfield-plant announcements — capital-intensive semiconductor fabs, aerospace, and metals capacity — that take years to convert into payroll. American Compass's 'Tariff Tally' documents a stealth manufacturing buildout in capex and investment announcements that lagging payroll data cannot yet capture. The relevant question is not aggregate headcount but the rebuilding of strategic industrial capacity and the reversal of three decades of working-class wage stagnation, which requires patient measurement over a decade, not seven months.",
      crux: {
        id: "manufacturing-net-employment",
        title: "The Net Manufacturing Employment Test",
        description:
          "Tariffs protect jobs in upstream sectors (steel, aluminum) but raise input costs for the far larger set of downstream manufacturers that use those inputs. The decisive question is whether tariffs create more domestic manufacturing jobs than they destroy once you count (a) downstream input-cost job losses, (b) jobs lost to retaliation against US exporters, and (c) capital reallocation costs.",
        methodology:
          "Replicate the USITC Publication 5405 input-output methodology on the 2025-2026 tariff vector: estimate employment gains in protected sectors against losses in input-using industries, layer in export-sector losses from documented retaliation (EU, Canada, China), and reconcile BLS payroll series against announced-capex and greenfield-investment databases to test whether a lagging-but-real reshoring signal exists outside current headcount.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$1-3M (Comprehensive input-output employment modeling plus investment-announcement tracking and validation against BLS microdata)",
      },
      evidence: [
        {
          id: "usitc-downstream-losses",
          title: "USITC: Section 232/301 Tariffs Net-Negative for Manufacturing Jobs",
          description:
            "The 2023 USITC Publication 5405 study of Section 232 and 301 tariffs found that steel and aluminum tariffs created modest employment gains in the protected metals sectors but destroyed roughly equivalent or greater employment in the much larger set of industries that consume steel and aluminum as inputs. CRS reports analyzing the same tariffs consistently find net-negative effects on total manufacturing employment.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source: "USITC Publication 5405; Congressional Research Service",
          sourceUrl: "https://www.usitc.gov/publications/332/pub5405.pdf",
          reasoning:
            "The USITC is a non-partisan, independent federal agency, and its input-output methodology is the standard for tariff employment analysis. The finding directly addresses the core reshoring claim and is corroborated by independent CRS analysis, making it strong evidence against the employment rationale.",
        },
        {
          id: "yale-employment-projection",
          title: "Yale Budget Lab: Total Employment Down 0.3pp, Unemployment Up 0.3pp",
          description:
            "The Yale Budget Lab's 2026 modeling projected that durable-goods manufacturing output expands only modestly in the long run, while total employment falls 0.3 percentage points and unemployment rises 0.3 percentage points by the end of 2026, once downstream input-cost shocks are counted. HCSS and academic critics characterized the 2025 'Liberation Day' tariffs as having failed to deliver on their manufacturing-revival promise.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Yale Budget Lab; HCSS",
          sourceUrl: "https://budgetlab.yale.edu/research/tracking-economic-effects-tariffs",
          reasoning:
            "The Yale Budget Lab is a credible, independent fiscal-modeling shop. The projection of net-negative employment directly contradicts the reshoring promise, though it is a model-based forecast rather than realized data, leaving room for the proponent argument that effects are lagged.",
        },
        {
          id: "american-compass-stealth-boom",
          title: "American Compass: 'Stealth Manufacturing Boom' in Capex and Announcements",
          description:
            "American Compass's 'Tariff Tally' series argues that the reshoring response is visible in capital expenditure and greenfield-investment announcements — capital-intensive semiconductor, aerospace, and metals capacity — rather than in BLS payroll headcount, which lags plant construction by years. Oren Cass advocates a 10% across-the-board tariff escalating 5% per year until trade deficits zero out, paired with a national development bank, framing short-term consumer pain against the externalities of deindustrialization.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 5,
            directness: 7,
          },
          source: "American Compass (Oren Cass); Tariff Tally series",
          sourceUrl: "https://americancompass.org/should-the-u-s-adopt-an-industrial-policy/",
          reasoning:
            "American Compass is the most articulate institutional voice for the tariff-hawk position, and the capex-vs-payroll timing argument is a legitimate methodological critique of relying on lagging headcount data. However, the source is an advocacy organization (lower independence), and announced investment is not yet realized employment, so the 'stealth boom' remains a contested interpretation.",
        },
        {
          id: "manufacturing-composition-fallacy",
          title: "Manufacturing Is Heterogeneous: What's 'Coming Back' Isn't What Left",
          description:
            "Analysts note that treating 'manufacturing' as a single bloc conceals a composition problem: the capital-intensive capacity that tariffs may attract (semiconductor fabs, aerospace) is not the labor-intensive capacity that left (textiles, light assembly). Aggregate headcount obscures the wage-distribution and community-level effects that the working-class rationale actually depends on, making both 'jobs gone forever' and 'jobs coming back' overstated.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Yale Budget Lab; PIIE; academic trade-employment literature",
          sourceUrl: "https://www.piie.com/blogs/realtime-economics/2026/whats-next-trumps-tariffs",
          reasoning:
            "The composition point is a structural critique grounded in the heterogeneity of manufacturing sectors. It weakens the simple reshoring narrative by showing that even successful capital attraction may not restore the specific labor-intensive jobs and communities the policy invokes, though it does not refute that strategic capacity can be rebuilt.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Strategic Decoupling from China
    // =========================================================================
    {
      id: "strategic-decoupling",
      title: "Strategic Decoupling from China",
      short_summary:
        "A national-security rationale for tariffs is reducing dependence on China and slowing its technology acquisition. The conditionalist 'small yard, high fence' school argues targeted export controls work while broad tariffs backfire by fracturing the allied coalition and accelerating China's import-substitution drive.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Broad tariffs are the wrong tool for the real national-security problem. Chris Miller and the 'Chip War' school argue that targeted export controls on dual-use technology — advanced semiconductors, EUV lithography, AI accelerators — are specific, effective, and multilateralizable, whereas sweeping reciprocal tariffs are a 'scattered fence, no yard' that hits allies and gives Beijing license to retaliate symmetrically. Tariffs accelerate China's 'Made in China 2025' import-substitution and indigenous-innovation drive; Beijing now mirrors the US with its own 'small yard, high fence,' a sign the broad tariff regime accelerated the very decoupling-against-the-US it meant to manage.",
      proponent_rebuttal:
        "Export controls alone are insufficient; tariffs add economic friction that compounds the cost of strategic dependence. Even if China indigenizes faster under pressure, it still indigenizes more slowly than it would in the absence of pressure — and the years of delay bought matter enormously for the Taiwan, AI, and military balance. Layered tariffs on China (25% baseline, 50% on semiconductors, 100% on EVs) raise the cost of Chinese market access and incentivize 'friend-shoring' to allied and domestic suppliers. The November 2025 truce holding rates at 10%-on-10% shows tariffs created leverage that produced a negotiated, monitored equilibrium rather than uncontrolled escalation.",
      crux: {
        id: "decoupling-tool-effectiveness",
        title: "The Decoupling Instrument Test",
        description:
          "The decisive question is whether broad tariffs slow Chinese technology acquisition more than they accelerate Beijing's import-substitution. If targeted export controls slow critical-technology transfer while broad tariffs mainly trigger symmetric retaliation and faster indigenization, the broad-tariff instrument is counterproductive on its own national-security terms.",
        methodology:
          "Compare the trajectory of Chinese capability in controlled technologies (advanced-node semiconductors, EUV, AI accelerators) under targeted export controls against the trajectory of broadly tariffed sectors, measuring indigenization rates, import-substitution announcements, and retaliation symmetry. Use SIA/SEMI supply-chain data, Chinese 'Made in China 2025' progress reports, and trade-flow reorientation statistics to isolate the effect of broad tariffs from the effect of targeted controls.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$2-5M (Multi-year supply-chain and capability tracking across semiconductor, AI-hardware, and rare-earth sectors with classified and open-source fusion)",
      },
      evidence: [
        {
          id: "china-effective-rate",
          title: "Effective China Tariff Rate Reached 31.6% Under Layered Duties",
          description:
            "By February 2026, the effective US tariff rate on Chinese goods reached 31.6% (Penn Wharton), built from layered Section 301 duties: a 25% baseline on most goods, 50% on semiconductors, 100% on EVs, and stacked rates exceeding 100% on some categories. These China-specific tariffs survived the February 2026 Supreme Court ruling that struck down the IEEPA-based 'reciprocal' tariffs, because they rest on more durable Section 301 legal authority.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "Penn Wharton Budget Model; CRS R48549",
          sourceUrl: "https://budgetmodel.wharton.upenn.edu/p/2026-04-15-effective-tariff-rates-and-revenues-updated-april-15-2026/",
          reasoning:
            "Penn Wharton's effective-rate calculations are rigorous and replicable. The high, durable China-specific rate is what proponents cite as the real mechanism for raising the cost of strategic dependence, though the rate alone does not establish whether it slows or accelerates Chinese indigenization.",
        },
        {
          id: "miller-scattered-fence",
          title: "Chris Miller: Broad Tariffs Are 'Scattered Fence, No Yard'",
          description:
            "Chris Miller, author of 'Chip War,' and the national-security conditionalist school argue that targeted export controls on dual-use technology work, while broad reciprocal tariffs that hit allies are strategically self-defeating because they fracture the coalition needed to actually contain China. Miller critiqued the 2025 tariff sprawl as a 'scattered fence, no yard' — the inverse of the disciplined 'small yard, high fence' strategy export controls were designed around.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "Chris Miller (Chip War); Carnegie Mellon CMIST; Asia Society",
          sourceUrl: "https://www.cmu.edu/cmist/news-archive/news/2026/march/chips-and-chokepoints-chris-miller-on-the-geopolitics-of-the-ai-supply-chain.html",
          reasoning:
            "Miller is a leading authority on semiconductor geopolitics, and the targeted-vs-broad distinction is the crux of the decoupling debate. The critique directly challenges the instrument choice — arguing that broad tariffs undermine the allied coalition export controls depend on — though it is an expert analytical judgment rather than a quantified outcome.",
        },
        {
          id: "beijing-mirror-strategy",
          title: "Beijing Builds Its Own 'Small Yard, High Fence' in Response",
          description:
            "In response to US tariffs and controls, Beijing has constructed its own 'small yard, high fence' regime to shut out US technology, accelerating the indigenous-innovation drive at the heart of 'Made in China 2025.' Conditionalist analysts read this mirroring as evidence that the broad tariff regime accelerated the very decoupling-against-the-US it nominally tried to manage, hardening rather than slowing China's import-substitution trajectory.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "South China Morning Post; Asia Society Center for China Analysis",
          sourceUrl: "https://www.scmp.com/tech/big-tech/article/3340168/fighting-back-beijing-builds-its-own-small-yard-high-fence-shut-out-us-tech",
          reasoning:
            "Beijing's mirroring strategy is documented and directly relevant to whether tariffs accelerate or slow Chinese indigenization. It supports the skeptic reading, but proponents counter that indigenization-under-pressure is still slower than the unconstrained counterfactual, so the evidence is interpretively contested.",
        },
        {
          id: "us-china-truce",
          title: "November 2025 US-China Truce Held Rates at 10%-on-10%",
          description:
            "In November 2025, Trump and Xi extended the May 2025 90-day truce for a full year through November 10, 2026, holding bilateral reciprocal tariffs at 10% (down from peaks above 125%) and extending exclusions on 178 categories of Chinese goods, mostly medical and solar-manufacturing equipment. Proponents argue this shows tariff leverage produced a negotiated, monitored equilibrium rather than uncontrolled escalation.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "Council on Foreign Relations",
          sourceUrl: "https://www.cfr.org/articles/how-the-supreme-court-tariff-decision-could-affect-trumps-china-negotiations",
          reasoning:
            "The truce is a verifiable diplomatic fact that proponents cite as evidence tariffs created negotiating leverage. However, that the bilateral rate settled at a symmetric 10%-on-10% — far below peak — can also be read as a retreat from the maximalist tariff position, making the 'leverage worked' inference contestable.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Trade Deficit Logic & Alliance Effects
    // =========================================================================
    {
      id: "trade-deficit-alliances",
      title: "Trade-Deficit Logic & Alliance Effects",
      short_summary:
        "Trump frames the trade deficit as proof America is 'being ripped off' and tariffs as the remedy. Economists counter that bilateral deficits reflect savings-investment imbalances, not unfair trade, and that tariff friction with allies imposes geopolitical costs — lost cooperation on China, defense burden-sharing, and dollar centrality.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "The trade-deficit rationale rests on an accounting error. Bilateral trade deficits reflect macroeconomic savings-investment imbalances and the dollar's reserve-currency status, not unfair foreign practices, so tariffs cannot durably close them — they merely reshuffle which countries run the surplus. 'We're being ripped off' is never operationally defined (deficit? IP theft? subsidies? non-tariff barriers?), letting the same rhetoric justify whichever instrument the speaker prefers. Meanwhile, tariff friction with allies — the EU's €26 billion countermeasures, Canada's retained auto and metals retaliation, a high-stakes USMCA renegotiation — imposes real costs on the coalition the US needs to contain China.",
      proponent_rebuttal:
        "Persistent deficits are not benign accounting; they reflect structural offshoring of productive capacity and the hollowing-out of communities, externalities that orthodox trade models systematically under-price. Tariffs are a credible threat that extracted real concessions — bilateral reciprocal deals were closed with Indonesia, El Salvador, Argentina, Guatemala, Bangladesh, and Taiwan, and allies made commitments on LNG offtake and defense spending. Europe was free-riding on US security anyway, and 'alliance damage' is a vapor metric that has not produced the predicted collapse: the EU suspended its countermeasures after a framework agreement, and most allies negotiated rather than retaliated. The $171-207 billion in tariff revenue is the largest tax shift toward consumption since 1993, funding domestic priorities.",
      crux: {
        id: "deficit-causation-and-alliance-cost",
        title: "The Deficit-Causation and Alliance-Cost Test",
        description:
          "Two linked questions decide this pillar. First, are bilateral trade deficits caused by unfair foreign practices (addressable by tariffs) or by macroeconomic savings-investment imbalances (not addressable by tariffs)? Second, does the geopolitical cost of tariff friction with allies — lost China-policy cooperation, weakened burden-sharing, eroded dollar trust — exceed the concessions tariffs extract?",
        methodology:
          "Test deficit causation by examining whether the aggregate US trade deficit narrows under tariffs or merely shifts bilaterally to other surplus countries, controlling for the national savings rate and fiscal deficit. Assess alliance cost by auditing documented concessions (trade deals signed, LNG and defense commitments) against documented retaliation and cooperation losses (EU/Canada countermeasures, USMCA renegotiation stakes, allied alignment on China export controls).",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1M (Macroeconomic deficit decomposition plus structured diplomatic cost-benefit audit across major allies)",
      },
      evidence: [
        {
          id: "savings-investment-identity",
          title: "Bilateral Deficits Reflect Savings-Investment Imbalances, Not Unfair Trade",
          description:
            "Orthodox trade economists (PIIE, Krugman, Mankiw) argue the trade deficit is determined by the national savings-investment gap and the dollar's reserve-currency role, meaning tariffs cannot durably close it — they reshuffle which countries run surpluses. Krugman has called the 2025 tariff structure 'the second coming of Smoot-Hawley,' while critics note the analogy is overdrawn given the current 11.8% effective rate versus Smoot-Hawley's ~59% on dutiable imports.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "PIIE; Paul Krugman (Substack); Greg Mankiw",
          sourceUrl: "https://www.piie.com/blogs/realtime-economics/2026/whats-next-trumps-tariffs",
          reasoning:
            "The savings-investment identity is mainstream macroeconomic consensus, giving it high reliability. It directly challenges the core deficit rationale for tariffs. The accompanying 'Smoot-Hawley 2.0' framing is rhetorically overdrawn (the rate gap is large), which is itself surfaced here to keep the evidence balanced.",
        },
        {
          id: "scotus-ieepa-ruling",
          title: "Supreme Court Struck Down IEEPA 'Reciprocal' Tariffs (February 2026)",
          description:
            "On February 20, 2026, the Supreme Court ruled 6-3 in Learning Resources, Inc. v. Trump that the International Emergency Economic Powers Act does not authorize the president to impose tariffs, terminating the IEEPA-based 'reciprocal' and trafficking tariffs on February 24. Trump replaced them with a flat 10% Section 122 balance-of-payments tariff capped at 150 days (expiring July 24, 2026), and USTR opened Section 301 investigations to rebuild a country-specific architecture on firmer legal ground.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 10,
            replicability: 9,
            directness: 7,
          },
          source: "SCOTUSblog; Holland & Knight; White & Case",
          sourceUrl: "https://www.scotusblog.com/2026/02/a-breakdown-of-the-courts-tariff-decision/",
          reasoning:
            "A 6-3 Supreme Court ruling is an authoritative, independent legal judgment. It undermines the durability of the broad reciprocal-tariff approach by holding its primary legal basis invalid, forcing a retreat to time-limited and sector-specific authorities. This challenges the policy's legal foundation, though Section 232 and 301 tariffs survived.",
        },
        {
          id: "bilateral-deals-signed",
          title: "Reciprocal Trade Deals Closed With Six Trading Partners",
          description:
            "By April 2026, bilateral reciprocal trade deals had been closed with Indonesia, El Salvador, Argentina, Guatemala, Bangladesh, and Taiwan. Proponents argue this demonstrates that the credible threat of tariffs extracted real concessions and that many trading partners chose to negotiate rather than retaliate, validating tariffs as a leverage instrument rather than a purely destructive tax.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "Trade Compliance Resource Hub (Trump 2.0 Tariff Tracker)",
          sourceUrl: "https://www.tradecomplianceresourcehub.com/2026/04/19/trump-2-0-tariff-tracker/",
          reasoning:
            "The signed deals are verifiable and support the leverage argument. However, the partners that capitulated are largely smaller economies with limited retaliatory leverage, while larger blocs (EU, Canada) retaliated — consistent with the conditional framing that allies with leverage retaliate and those without capitulate.",
        },
        {
          id: "ally-retaliation-costs",
          title: "EU and Canada Retaliation Plus High-Stakes USMCA Renegotiation",
          description:
            "The EU reimposed €26 billion ($28B) of countermeasures on US goods (steel, aluminum, appliances, bourbon, motorcycles) before suspending them under a politically fragile framework agreement. Canada terminated IEEPA-related retaliation in September 2025 but kept retaliation on US autos and roughly C$15.6 billion of US steel and aluminum. The USMCA review beginning July 2026 is now expected to be a high-stakes renegotiation. Adam Tooze frames US strength as 'sustained by elevated asset prices and dollar centrality rather than a strategically coordinated state.'",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "European Commission; CSIS; Brookings; Adam Tooze (Chartbook)",
          sourceUrl: "https://www.csis.org/analysis/usmca-review-2026",
          reasoning:
            "The retaliation figures and USMCA stakes are documented by official and institutional sources. They demonstrate concrete economic and diplomatic costs of tariff friction with major allies, supporting the alliance-damage critique, though proponents argue these costs are outweighed by extracted concessions and that some retaliation was climbed down.",
        },
      ],
    },
  ],
  references: [
    {
      title: "A Breakdown of the Court's Tariff Decision - SCOTUSblog",
      url: "https://www.scotusblog.com/2026/02/a-breakdown-of-the-courts-tariff-decision/",
    },
    {
      title: "Tracking the Short-Run Price Impact of US Tariffs - Cavallo, Llamas & Vazquez (SSRN)",
      url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5795728",
    },
    {
      title: "State of US Tariffs: April 8, 2026 - Yale Budget Lab",
      url: "https://budgetlab.yale.edu/research/state-us-tariffs-april-8-2026",
    },
    {
      title: "Economic Impact of Section 232 and 301 Tariffs on US Industries - USITC Publication 5405",
      url: "https://www.usitc.gov/publications/332/pub5405.pdf",
    },
    {
      title: "Effective Tariff Rates and Revenues, Updated April 15, 2026 - Penn Wharton Budget Model",
      url: "https://budgetmodel.wharton.upenn.edu/p/2026-04-15-effective-tariff-rates-and-revenues-updated-april-15-2026/",
    },
    {
      title: "What's Next for Trump's Tariffs - Peterson Institute for International Economics",
      url: "https://www.piie.com/blogs/realtime-economics/2026/whats-next-trumps-tariffs",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Who actually pays Trump's tariffs?",
      content:
        "Trump claimed foreign exporters would pay, but Cavallo finds ~20% retail pass-through, HBS puts the consumer share near 43%, and the Federal Reserve estimates tariffs raised core goods prices by 3.1%. The strongest version of 'China pays' — that some burden falls on exporters — is true but trivial; the campaign-rally version is a category error. Does the partial pass-through vindicate the policy as cost-shifting, or refute it as a domestic consumption tax?",
    },
    {
      id: "q2",
      title: "Have tariffs revived American manufacturing?",
      content:
        "The USITC and Yale Budget Lab find net-negative manufacturing employment effects once downstream input-cost losses and retaliation are counted, while American Compass points to capex commitments and greenfield announcements as a 'stealth boom' invisible in lagging BLS payrolls. Is the reshoring response real but lagged, or is the promised boom simply not materializing?",
    },
    {
      id: "q3",
      title: "Do broad tariffs help or hurt the effort to contain China?",
      content:
        "The 'Chip War' school argues targeted export controls slow Chinese technology acquisition while broad tariffs fracture the allied coalition and accelerate Beijing's import-substitution drive. Hawks counter that indigenization-under-pressure is still slower than the unconstrained counterfactual, and the years bought matter for the Taiwan and AI balance. Is the broad tariff a strategic asset or a self-inflicted wound on US-China policy?",
    },
  ],
};
