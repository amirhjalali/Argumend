import type { Topic } from "@/lib/schemas/topic";

export const aiEnergyWaterFootprintData = {
  id: "ai-energy-water-footprint",
  title: "AI's Energy & Water Footprint",
  meta_claim:
    "AI's energy and water footprint is a serious environmental problem that warrants intervention.",
  status: "contested" as const,
  category: "technology" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "A typical AI text prompt is tiny: Google's measured median Gemini query uses about 0.24 Wh of energy and roughly 0.26 mL of water — about five drops, or less than nine seconds of watching TV — and its per-prompt energy fell ~33× in a single year. The real environmental concern isn't the individual prompt but the concentrated, fast-growing data-center buildout: US data-center electricity is projected to roughly double or triple to 325-580 TWh (6.7-12% of US power) by 2028.",
    confidence: 88,
    source:
      "Google, 'Measuring the environmental impact of AI inference' (Aug 2025, arXiv:2508.15734); Shehabi et al., '2024 US Data Center Energy Usage Report,' Lawrence Berkeley National Laboratory (LBNL-2001637, Dec 2024)",
    sourceUrl:
      "https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "On a per-use basis, AI's footprint is far smaller than the viral takes suggest: Google's measured median Gemini text prompt consumes about 0.24 Wh and 0.26 mL of water (five drops), per-query energy fell roughly 33× in a single year, and all US data centers were only ~4.4% of national electricity and ~0.2% of national freshwater in 2023.",
    "But national averages and per-query numbers hide the real problem, which is concentration and growth: data-center electricity is projected to reach 6.7-12% of US power by 2028, and because that load clusters in specific grids and watersheds faster than clean supply can be built, utilities are deferring coal retirements and adding gas while drought-prone localities face new draws on stressed water.",
    "So the honest debate isn't whether one chatbot query is wasteful (it basically isn't) but whether the marginal, geographically concentrated buildout is being met by clean generation and slack water — or by dirtier power and stressed watersheds where targeted intervention would actually help.",
  ],
  last_updated: "2026-06-16",
  tags: ["ai", "energy", "water", "data-centers", "sustainability"],
  pillars: [
    {
      id: "scale-of-demand",
      title: "Scale of Energy Demand",
      short_summary:
        "AI is driving the fastest growth in data-center electricity demand in decades — but data centers remain a small slice of total global and national electricity use.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "AI's marginal electricity demand is small and manageable in the context of total power systems. US data centers were ~4.4% of national electricity in 2023, and globally data centers are roughly 1.5% of electricity — about 3% projected by 2030. A median Gemini text prompt uses ~0.24 Wh, less than nine seconds of watching TV, and per-query energy fell ~33x in a single year as models got more efficient. Decarbonizing the grid addresses the actual problem (emissions) far more directly than singling out one fast-growing-but-small load.",
      proponent_rebuttal:
        "The concern is the growth rate and concentration, not the current share. The DOE/LBNL report projects US data-center electricity could roughly double or triple from 176 TWh (2023) to 325-580 TWh (6.7-12% of US electricity) by 2028, and the IEA calls AI the single most important driver of new data-center demand. Because this load is geographically clustered and arriving faster than clean generation can be built, utilities are extending coal and gas plant lifetimes and straining local grids — so the marginal energy is often dirtier than the average, even as per-query efficiency improves.",
      crux: {
        id: "marginal-grid-emissions",
        title: "Marginal vs. Average Grid Emissions",
        description:
          "Does new AI demand get met by clean generation (low marginal emissions) or by keeping fossil plants online and building new gas (high marginal emissions)? This determines whether AI growth is an environmental problem or a neutral load on a decarbonizing grid.",
        methodology:
          "Track the marginal generation source serving incremental data-center load by region: identify deferred coal retirements and new gas capacity tied to data-center interconnection, and compare marginal CO2/MWh to the grid average. Repeat across ERCOT, PJM, and major data-center clusters.",
        verification_status: "verified" as const,
        cost_to_verify: "$50K (grid data analysis)",
        falsification: {
          supporter_flip:
            "If regional analysis showed incremental data-center load is mostly matched by additional clean generation — new wind/solar/nuclear plus storage, with no deferred coal retirements or new gas tied to the interconnections — then the marginal emissions would track or beat the grid average, and the 'AI is making the grid dirtier' case would collapse into 'AI is just another load on a decarbonizing system.'",
          skeptic_flip:
            "A skeptic who points to AI's small total share and falling per-query energy should weigh that marginal emissions, not average ones, govern climate impact: if utilities in ERCOT or PJM are extending fossil-plant lifetimes and building gas specifically to serve data-center interconnection queues, then the energy serving that growth is dirtier than the grid average even as efficiency improves.",
          common_ground:
            "Both sides agree data centers are still a small share of total electricity, that per-query efficiency is rising fast, and that the climate-relevant quantity is the emissions of the generation actually serving the new load.",
          live_disagreement:
            "What is actually on the margin for incremental data-center demand region by region — clean build-out versus deferred coal retirements and new gas — which only tracing interconnection-tied capacity decisions and marginal CO2/MWh across major clusters can settle.",
        },
      },
      evidence: [
        {
          id: "doe-lbnl-projection",
          title: "US Data-Center Electricity Could Hit 6.7-12% by 2028",
          description:
            "The DOE-funded 2024 Berkeley Lab report finds US data centers used 176 TWh in 2023 (4.4% of national electricity) and projects 325-580 TWh by 2028 (6.7-12%), with AI accelerated-server demand the dominant driver of the increase.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source:
            "Shehabi et al., '2024 United States Data Center Energy Usage Report,' Lawrence Berkeley National Laboratory (LBNL-2001637), Dec 2024; summarized by US DOE",
          sourceUrl:
            "https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers",
          reasoning:
            "Primary government-funded analysis with transparent methodology. Directly quantifies the scale and growth of AI-driven demand; the 2028 figure is a projection (range reflects genuine uncertainty), which is why directness is high but not maximal.",
        },
        {
          id: "iea-global-share",
          title: "Data Centers ~1.5% of Global Electricity Today",
          description:
            "The IEA's 2025 'Energy and AI' analysis estimates data centers consumed ~415 TWh in 2024 (~1.5% of global electricity), projected to roughly double to ~945 TWh by 2030 (~3%). Even at 2030, data centers remain a small share of global electricity demand and a modest fraction of total demand growth.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source:
            "IEA, 'Energy and AI' report, April 2025 (Executive Summary and 'Energy demand from AI')",
          sourceUrl: "https://www.iea.org/reports/energy-and-ai",
          reasoning:
            "Authoritative international energy body. Supports the 'manageable share' framing; weighted slightly down on directness because a small share does not by itself settle whether concentrated marginal growth is benign.",
        },
        {
          id: "gemini-per-prompt",
          title: "Per-Query Footprint Is Tiny and Falling Fast",
          description:
            "Google's measured median Gemini Apps text prompt (May 2025 data) consumes 0.24 Wh of energy, 0.26 mL of water (about five drops), and 0.03 gCO2e — and Google reports a 33x energy and 44x carbon efficiency improvement over the prior 12 months.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 3,
            replicability: 5,
            directness: 7,
          },
          source:
            "Google Cloud blog, 'Measuring the environmental impact of AI inference,' Aug 21, 2025",
          sourceUrl:
            "https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference/",
          reasoning:
            "Detailed methodology but self-reported by a vendor with a clear interest in low numbers, and it covers a median text prompt only (not image/video generation or training), so independence is low. Real and directionally informative on efficiency gains.",
        },
      ],
    },
    {
      id: "water-footprint",
      title: "Water Footprint & Local Stress",
      short_summary:
        "AI data centers consume billions of gallons of water for cooling and indirectly via power generation — a footprint that is tiny nationally but can be acute in water-stressed localities.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "In aggregate, data-center water use is a rounding error: US data centers consumed roughly 0.2% of national freshwater in 2023 (onsite cooling alone ~0.04%), dwarfed by agriculture and thermoelectric power. A median AI prompt uses well under a milliliter of onsite water. Aggregate scarcity is not driven by AI, and intervention aimed at AI water use targets a trivial share of the problem.",
      proponent_rebuttal:
        "National averages hide the real harm: water stress is local. The peer-reviewed Li et al. study estimates training GPT-3 evaporated ~700,000 liters of clean freshwater onsite and projects global AI water withdrawal of 4.2-6.6 billion cubic meters by 2027. Even the DOE/LBNL report attributes ~211 billion gallons of indirect water consumption (via electricity) to US data centers in 2023. In clusters like Northern Virginia and drought-prone Arizona, new data centers draw on already-stressed potable supplies, which is precisely where targeted intervention (siting rules, cooling standards, reclaimed-water mandates) is warranted.",
      crux: {
        id: "local-water-stress",
        title: "Aggregate Share vs. Local Watershed Stress",
        description:
          "Is the relevant metric national freshwater share (tiny) or the marginal draw on specific stressed watersheds where data centers cluster (potentially significant)? This is the load-bearing disagreement on whether water intervention is justified.",
        methodology:
          "For each major data-center cluster, measure onsite consumptive water use as a share of the local utility's potable supply and the watershed's renewable yield, and assess overlap with USGS/Drought Monitor water-stress designations. Compare to reclaimed-water and air-cooling alternatives.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (data analysis of public water filings)",
        falsification: {
          supporter_flip:
            "If watershed-level analysis showed data-center clusters draw only a trivial share of local potable supply and renewable yield — or are predominantly served by reclaimed/non-potable water and air cooling in the stressed regions — then the 'local stress' case would dissolve, and the tiny national share (~0.2%) would be the whole story.",
          skeptic_flip:
            "A skeptic citing the ~0.2% national freshwater figure should weigh that scarcity is inherently local: a draw that is a rounding error nationally can still be material in a specific drought-prone watershed (e.g., Arizona) or a cluster where data-center water use jumped 63% in four years (Northern Virginia), where the binding constraint is the local supply, not the national total.",
          common_ground:
            "Both sides agree data centers are a negligible share of total US freshwater and that agriculture and thermoelectric power dwarf them, while also agreeing that water stress is fundamentally a local, watershed-by-watershed phenomenon.",
          live_disagreement:
            "Whether, in the specific watersheds where data centers actually cluster, their consumptive draw is a meaningful fraction of local potable supply and renewable yield — which only mapping cluster-level consumption against USGS/Drought Monitor designations and reclaimed-water alternatives can resolve.",
        },
      },
      evidence: [
        {
          id: "li-water-study",
          title: "Peer-Reviewed Estimate: GPT-3 Training ~700,000 L Onsite",
          description:
            "Li, Yang, Islam & Ren (arXiv:2304.03271, later in Communications of the ACM) estimate training GPT-3 in Microsoft's US data centers directly evaporated ~700,000 liters of clean freshwater onsite (~5.4 million liters including offsite), and project global AI water withdrawal of 4.2-6.6 billion cubic meters by 2027.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source:
            "Li, Yang, Islam & Ren, 'Making AI Less Thirsty,' arXiv:2304.03271 (2023); accepted to Communications of the ACM",
          sourceUrl: "https://arxiv.org/abs/2304.03271",
          reasoning:
            "First rigorous, independent, peer-reviewed methodology for AI water footprint. Estimates rely on modeled PUE/WUE and disclosed locations, so replicability is moderate; the 2027 projection is inherently uncertain but the on-site training figure is well-grounded.",
        },
        {
          id: "indirect-water-lbnl",
          title: "~211 Billion Gallons Indirect US Water in 2023",
          description:
            "Drawing on the DOE/LBNL report, US data centers' indirect (electricity-generation) water-consumption footprint was roughly 211 billion gallons in 2023, on top of direct cooling water — and local clusters like Northern Virginia saw data-center water use rise 63% from 2019 to 2023.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Environmental and Energy Study Institute (EESI), 'Data Centers and Water Consumption' (citing 2024 LBNL report and Northern Virginia utility data)",
          sourceUrl:
            "https://www.eesi.org/articles/view/data-centers-and-water-consumption",
          reasoning:
            "Nonpartisan policy institute synthesizing the federal LBNL report and regional utility data. Indirect water depends on the generation mix, so the figure is an estimate, but it documents real and rising local draws.",
        },
        {
          id: "national-freshwater-share",
          title: "Data Centers ~0.2% of US Freshwater Nationally",
          description:
            "Combining USGS national water-use data with data-center consumption estimates, all US data centers used roughly 0.2% of national freshwater in 2023 (onsite cooling alone ~0.04%) — orders of magnitude below agriculture and thermoelectric power generation.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source:
            "A. Masley analysis using USGS 'Estimated Use of Water in the United States' and LBNL data-center figures",
          sourceUrl:
            "https://blog.andymasley.com/i/175834975/using-ai-can-save-way-more-water-than-is-used-in-data-centers",
          reasoning:
            "An independent analyst's synthesis built on authoritative USGS and LBNL inputs; the underlying datasets are reliable but the aggregation is a secondary blog source, so reliability/independence are mid. Directly rebuts the aggregate-scarcity framing without resolving local stress.",
        },
      ],
    },
    {
      id: "intervention-warranted",
      title: "Does It Warrant Intervention?",
      short_summary:
        "Even granting a footprint, the question is whether market efficiency gains and grid decarbonization suffice, or whether AI-specific regulation (disclosure, siting, efficiency standards) is justified.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Efficiency and clean-energy procurement are already improving the footprint faster than regulation could: per-query energy fell ~33x in a year, hyperscalers are among the largest corporate clean-power buyers, and Google publishes site-level water data voluntarily. AI also enables efficiency gains elsewhere (grid optimization, materials discovery) that can net-save energy and water. Singling out AI risks slowing a strategically important technology while addressing a small, shrinking share of emissions and water use.",
      proponent_rebuttal:
        "Voluntary, vendor-controlled disclosure is inconsistent and self-serving, and efficiency gains are routinely offset by rebound (more, larger models and heavier inference). Mandatory reporting, water-stress-aware siting, and cooling/efficiency standards are modest interventions that simply make external costs visible and steer the buildout away from stressed grids and watersheds — without banning anything. The burden of proof for 'the market will handle it' has not been met where coal retirements are being deferred to serve AI load.",
      crux: {
        id: "rebound-vs-efficiency",
        title: "Do Efficiency Gains Outrun Demand Growth?",
        description:
          "Does per-unit efficiency improvement (energy/water per token) outpace total demand growth, so absolute AI energy and water use falls without intervention — or does Jevons-style rebound mean absolute consumption keeps rising regardless?",
        methodology:
          "Track absolute AI-attributable electricity and water consumption year over year against per-query efficiency. If efficiency rises faster than usage (absolute footprint falls), the market case strengthens; if absolute footprint keeps climbing despite efficiency, the rebound/intervention case strengthens.",
        verification_status: "verified" as const,
        cost_to_verify: "$30K (longitudinal data analysis)",
        falsification: {
          supporter_flip:
            "A supporter of intervention should change their mind if year-over-year data showed absolute AI-attributable electricity and water consumption actually falling — efficiency outrunning demand without regulation — because then the market would be solving the footprint on its own and AI-specific rules would address a shrinking problem.",
          skeptic_flip:
            "A skeptic relying on the 33× per-query efficiency gain should weigh that per-unit efficiency says nothing about totals: if absolute AI energy and water use keeps climbing because models get larger and inference volume explodes (Jevons-style rebound), then efficiency gains are being offset and the 'market handles it' claim fails on the metric that matters.",
          common_ground:
            "Both sides agree per-query efficiency is improving rapidly and that the decision-relevant quantity is absolute (not per-token) AI-attributable energy and water consumption over time.",
          live_disagreement:
            "Whether per-unit efficiency is improving faster than total AI usage is growing — so the absolute footprint falls — or whether rebound keeps absolute consumption rising, which only multi-year tracking of absolute consumption against efficiency can determine.",
        },
      },
      evidence: [
        {
          id: "google-disclosure",
          title: "Voluntary Disclosure Exists but Is Uneven",
          description:
            "Google's 2024 Environmental Report disclosed ~7.7-8.1 billion gallons of company water consumption (the large majority at data centers) and publishes site-level figures for 36 cities — but it remains the only major hyperscaler doing so at this granularity, illustrating how inconsistent voluntary reporting is across the industry.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 6,
            directness: 6,
          },
          source:
            "Google, '2024 Environmental Report' (blog.google sustainability summary)",
          sourceUrl:
            "https://blog.google/company-news/outreach-and-initiatives/sustainability/2024-environmental-report/",
          reasoning:
            "Self-reported corporate data (low independence), but the fact that Google is uniquely transparent supports the case that mandatory, standardized disclosure is warranted because peers do not match it.",
        },
        {
          id: "efficiency-gains",
          title: "Rapid Per-Query Efficiency Improvement",
          description:
            "Google reports its median text-prompt energy and carbon footprint improved 33x and 44x respectively over a single 12-month period (May 2024-May 2025), evidence that the market is driving large efficiency gains without AI-specific regulation.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 3,
            replicability: 5,
            directness: 6,
          },
          source:
            "Google Cloud blog, 'Measuring the environmental impact of AI inference,' Aug 21, 2025",
          sourceUrl:
            "https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference/",
          reasoning:
            "Genuine and large efficiency gains, but vendor-reported and per-query — it does not address whether absolute (rebound-inclusive) consumption is falling, which is the actual crux, so independence and directness are limited.",
        },
      ],
    },
  ],
};
