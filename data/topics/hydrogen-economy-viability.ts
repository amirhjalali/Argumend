import type { Topic } from "@/lib/schemas/topic";

export const hydrogenEconomyViabilityData = {
  id: "hydrogen-economy-viability",
  title: "Is the Hydrogen Economy Viable?",
  meta_claim:
    "Green hydrogen is a viable clean-energy vector that should be scaled across the economy",
  status: "contested" as const,
  category: "technology" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Despite decades of 'hydrogen economy' promises, more than 99% of the roughly 100 million tonnes of hydrogen made each year still comes from unabated fossil fuels — clean (low-emissions) hydrogen is under 1% of supply. And the gap between hype and reality is stark: of all the low-emissions hydrogen capacity that has been announced, only about 7% has reached a firm investment decision.",
    confidence: 90,
    source:
      "IEA, Global Hydrogen Review 2024 and 2025 (production <1% low-emissions; ~7% of announced projects at FID)",
    sourceUrl: "https://www.iea.org/reports/global-hydrogen-review-2025",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Hydrogen is the only realistic way to clean up a handful of stubborn sectors — making steel without coking coal, making ammonia for fertilizer that feeds roughly half the planet, and fueling long-haul ships — where batteries and direct electrification simply cannot do the job today.",
    "But the honest weakness is thermodynamic: making hydrogen from clean electricity and then using it wastes most of the energy, so for cars and home heating, where you can just plug in, hydrogen needs two to six times more renewable power than a battery or heat pump to deliver the same service.",
    "So the real debate isn't 'hydrogen yes or no' — it's whether green hydrogen can get cheap enough fast enough to decarbonize the few sectors that truly need it, or whether the 'hydrogen for everything' hype keeps diverting money and clean electricity away from cheaper electrification.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: The Hard-to-Electrify Sectors
    // =========================================================================
    {
      id: "hard-to-electrify-sectors",
      title: "The Hard-to-Electrify Case",
      short_summary:
        "Steel, ammonia/fertilizer, and shipping account for a large share of industrial emissions and have no easy battery-electric substitute. Proponents argue green hydrogen is the indispensable molecule for these 'hard-to-abate' sectors. Skeptics counter that even here, hydrogen is expensive, that pilot 'green steel' projects are already near-bankrupt, and that some of these uses (like steel) may be better served by other routes.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "Even in the sectors hydrogen advocates call its 'no-regret' home turf, the economics are brutal. Green steel is the flagship example: Sweden's Stegra (formerly H2 Green Steel), Europe's first major commercial hydrogen-DRI mill, came within weeks of bankruptcy in late 2025 and saw its funding gap more than double to over €2 billion, ultimately needing a Wallenberg-led rescue. Green steel carries an estimated cost premium of roughly $200/tonne over conventional steel in a market where commodity steel prices are falling. Green ammonia made with electrolytic hydrogen costs two to four times more than today's natural-gas-based ammonia, threatening fertilizer affordability for the food supply. The point isn't that hydrogen is technically impossible in these sectors — it's that 'hard-to-electrify' has quietly become 'hard-to-afford,' and without permanent subsidy the molecule doesn't pencil out even where it has the strongest case.",
      proponent_rebuttal:
        "These sectors are exactly why hydrogen is non-negotiable — there is no battery-electric path for them. Steelmaking via blast furnace and coking coal is responsible for roughly 7-8% of global CO2 emissions, and hydrogen-based direct reduced iron (H2-DRI) is the only demonstrated route to cut those emissions by up to ~95%; HYBRIT in Sweden has already proven 100% hydrogen reduction at pilot scale. Ammonia production (mostly for fertilizer that underpins food for roughly half the world's population) generates roughly 450 million tonnes of CO2 a year — around 1.8% of global emissions — and green ammonia simply swaps the grey hydrogen feedstock for electrolytic hydrogen with no change to the downstream Haber-Bosch chemistry. Long-haul shipping and aviation feedstocks have no plausible battery answer at the required energy density. Stegra's near-failure is a financing-and-timing story, not a physics one; first-of-a-kind plants in any technology face cost overruns, and the chemistry works.",
      crux: {
        id: "no-electric-substitute-test",
        title: "The No-Electric-Substitute Test",
        description:
          "Whether a given sector genuinely has no viable direct-electrification or alternative-decarbonization path — making hydrogen the only option — or whether cheaper substitutes exist. If steel, ammonia, and long-haul shipping truly cannot be decarbonized any other way at scale, hydrogen's value is locked in regardless of its cost penalty. If competing routes (electric arc furnaces with scrap, biomethane, e-methanol, batteries for short-sea shipping) can do much of the job more cheaply, hydrogen's 'indispensable' claim shrinks to a narrower slice.",
        methodology:
          "Build a sector-by-sector marginal abatement comparison: for steel, ammonia, methanol, and shipping, model the full delivered cost per tonne of CO2 avoided for (a) the hydrogen route and (b) the leading non-hydrogen alternative (scrap-based EAF, carbon capture, electrified processes, bio-feedstocks, direct battery use), under a range of electricity prices ($20-60/MWh) and electrolyzer capital costs. Identify, for each sector, the break-even electricity price at which the hydrogen route is the cheapest decarbonization option. Cross-check against operating first-of-a-kind plants (HYBRIT, Stegra, green-ammonia pilots) for real cost data rather than spreadsheet projections.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1.5M (Techno-economic modeling across multiple industrial sectors with first-of-a-kind plant cost data)",
        falsification: {
          supporter_flip:
            "If sector-by-sector analysis showed cheaper non-hydrogen routes can decarbonize most of steel, ammonia, and shipping (e.g. scrap-based electric arc furnaces, carbon capture, e-fuels from captured CO2, or batteries for short-sea routes), then hydrogen's 'indispensable molecule' claim would shrink to a small niche rather than a pillar of the energy transition.",
          skeptic_flip:
            "A skeptic who says hydrogen is too expensive even here should weigh that there is no demonstrated battery-electric path for primary steel, ammonia feedstock, or trans-ocean shipping — so for these specific tonnes, the real comparison is 'expensive hydrogen vs. continued fossil emissions,' not 'hydrogen vs. cheaper electrification.'",
          common_ground:
            "Both sides agree these sectors are genuinely hard to electrify directly and that green hydrogen is currently far more expensive than the incumbent fossil route.",
          live_disagreement:
            "Whether competing decarbonization routes can undercut hydrogen in these sectors, or whether hydrogen is the unavoidable (if costly) answer — which only honest, plant-level marginal-abatement-cost data can settle.",
        },
      },
      evidence: [
        {
          id: "steel-emissions-h2dri",
          title:
            "Steelmaking Is ~7-8% of Global CO2; H2-DRI Can Cut It ~95%",
          description:
            "Iron and steel production is responsible for roughly 7-8% of global energy-system CO2 emissions, overwhelmingly from coking-coal-based blast furnaces. The leading deep-decarbonization route is hydrogen-based direct reduced iron paired with an electric arc furnace (H2-DRI-EAF), in which hydrogen rather than carbon reduces iron ore, emitting water vapor instead of CO2. Sweden's HYBRIT pilot (a joint venture of SSAB, LKAB, and Vattenfall) demonstrated iron-ore reduction using 100% hydrogen, and the process can reduce CO2 emissions by up to ~95% versus the conventional route. This is the strongest 'no battery substitute' case for hydrogen.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 9,
          },
          source:
            "IEA Iron and Steel Technology Roadmap; HYBRIT (SSAB/LKAB/Vattenfall); Midrex",
          sourceUrl:
            "https://www.iea.org/reports/iron-and-steel-technology-roadmap",
          reasoning:
            "The emissions share and the H2-DRI reduction potential are well established across the IEA and industry literature, and HYBRIT has demonstrated the chemistry at pilot scale. Directness is high because it speaks straight to whether hydrogen has a genuine, electrification-resistant use. Replicability is moderate because full commercial-scale, cost-competitive operation has not yet been sustained.",
        },
        {
          id: "ammonia-emissions",
          title:
            "Ammonia Production Emits ~1.8% of Global CO2; Green Route Drops In Cleanly",
          description:
            "Conventional ammonia synthesis relies on hydrogen made from natural gas via steam methane reforming, and steam-methane reformers for ammonia emit roughly 450 million tonnes of CO2 per year — around 1.8% of worldwide CO2 emissions. Roughly 70% of ammonia goes to fertilizer, which underpins food production for a large share of humanity. Green ammonia substitutes electrolytic hydrogen for grey hydrogen while leaving the Haber-Bosch nitrogen-fixation chemistry unchanged, making it one of the most technically straightforward 'drop-in' uses for green hydrogen.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source:
            "Royal Society, Ammonia: zero-carbon fertiliser, fuel and energy store; RMI",
          sourceUrl:
            "https://royalsociety.org/news-resources/projects/low-carbon-energy-programme/green-ammonia/",
          reasoning:
            "The ~1.8%-of-global-CO2 figure and the drop-in nature of green hydrogen in ammonia are documented by the Royal Society and corroborated by RMI and the IEA. Directness is high because ammonia is hydrogen's clearest existing market. The case is partly weakened by cost: green ammonia remains multiples more expensive than the gas-based incumbent.",
        },
        {
          id: "stegra-near-bankruptcy",
          title:
            "Europe's Flagship Green-Steel Mill (Stegra) Nearly Went Bankrupt",
          description:
            "Stegra (formerly H2 Green Steel), the first major commercial-scale hydrogen-DRI steel mill (Boden, Sweden, ~700 MW of electrolyzers targeting ~2.5 Mtpa of steel), faced a severe cash crisis through late 2025 into 2026. Its funding gap reportedly more than doubled from around €975 million to over €2 billion, with partial work stoppages reported, before a roughly €1.4 billion ($1.65 billion) rescue led by Sweden's Wallenberg family staved off insolvency. Analysts estimate green steel must sell at a premium of around $200/tonne over conventional steel to be profitable, in a market where ordinary steel prices have been falling.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Canary Media; Reuters/Dagens Industri reporting on Stegra financing (2025-2026)",
          sourceUrl:
            "https://www.canarymedia.com/articles/green-steel/stegra-funding-complete-mill",
          reasoning:
            "Stegra's financial troubles are extensively reported by independent outlets. The evidence is direct against the 'even in its best sector hydrogen pencils out' claim. It does not show the chemistry fails — only that the economics of first-of-a-kind hydrogen plants are precarious, which proponents fairly attribute to financing and timing rather than physics.",
        },
        {
          id: "shipping-fuel-density",
          title:
            "Long-Haul Shipping and Aviation Lack a Battery-Electric Path",
          description:
            "Trans-ocean shipping and long-haul aviation require energy carriers with far higher energy density than current batteries can provide for the duration and range involved. Hydrogen-derived fuels — green ammonia and e-methanol for ships, synthetic e-kerosene for aircraft — are among the few candidate low-carbon options, which is why the International Maritime Organization's decarbonization strategy and shipping majors (e.g. Maersk's methanol vessels) are pursuing hydrogen-based fuels rather than batteries for deep-sea routes. This is a genuine 'no direct-electrification substitute' domain, though e-fuels remain expensive and scarce.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "IMO 2023 GHG Strategy; IEA shipping and aviation analysis",
          sourceUrl:
            "https://www.iea.org/energy-system/transport/international-shipping",
          reasoning:
            "The energy-density argument for shipping and aviation is widely accepted, and the IMO strategy reflects it. Directness is moderate because hydrogen is usually the feedstock for derived e-fuels (ammonia, methanol, e-kerosene) rather than burned directly, and those fuels are still pre-commercial and costly, leaving real uncertainty about scale and price.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: The Efficiency Penalty (Direct Electrification Wins)
    // =========================================================================
    {
      id: "round-trip-efficiency",
      title: "The Efficiency Penalty",
      short_summary:
        "Making hydrogen from electricity and using it back loses most of the energy along the way. For cars and home heating — where you can simply plug in — batteries and heat pumps deliver two to six times more useful energy per unit of clean electricity. Proponents concede this for light vehicles and heating but argue efficiency isn't the only criterion: storage, energy density, and seasonal balancing matter too.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Thermodynamics is the hydrogen economy's hardest constraint, and it is unforgiving for everyday uses. Electrolysis is roughly 70-80% efficient, then you lose more energy to compression, storage, and transport, and a fuel cell converting hydrogen back to electricity is only ~50-60% efficient — so a hydrogen fuel-cell car delivers only about 25-35% of the original clean electricity to the wheels, versus 70-80% for a battery EV. The 'hydrogen car' dream is collapsing in practice: Shell shut its U.S. hydrogen refueling stations in 2024, the network has shrunk, and Toyota Mirai owners have filed suit over unfueled cars. Home heating is the same story: a peer-reviewed Joule review by Jan Rosenow of 32 independent studies found not one supporting a major role for hydrogen in home heating, because a heat pump delivers 3-4 units of heat per unit of electricity while hydrogen heating needs five to six times more electricity for the same warmth. Every unit of clean electricity diverted into 'hydrogen for everything' is clean electricity not used far more effectively elsewhere.",
      proponent_rebuttal:
        "Round-trip efficiency is the right lens for cars and home heating — and serious hydrogen advocates have largely conceded those uses to batteries and heat pumps. But efficiency is not the only thing that matters for an energy system. Hydrogen is a chemical feedstock and a long-duration, seasonal store of energy in ways batteries cannot economically match: you can stockpile hydrogen in salt caverns for months to balance a renewables-heavy grid across a windless winter, which lithium batteries (built for hours, not seasons) cannot do affordably. For aviation and shipping, energy density per kilogram, not electrical efficiency, is the binding constraint, and there hydrogen-derived fuels win where batteries are simply too heavy. The mistake is treating 'low round-trip efficiency' as disqualifying everywhere; the correct reading is that hydrogen should be reserved for the niches where electrons cannot go — and abandoned for cars and heating where they obviously can.",
      crux: {
        id: "efficiency-vs-value-test",
        title: "The Useful-Energy-Per-Clean-Kilowatt-Hour Test",
        description:
          "Whether, for a given end use, direct electrification delivers more useful service per unit of clean electricity than the hydrogen pathway — and whether efficiency is the binding constraint at all. If a heat pump or battery delivers the same service with a fraction of the renewable input, hydrogen is a poor allocation of scarce clean power for that use. If the binding constraint is instead energy density (aviation) or seasonal storage duration (grid balancing), where hydrogen has no electric competitor, the efficiency penalty is a price worth paying.",
        methodology:
          "For each candidate end use (passenger car, home heating, grid storage over hours vs. months, aviation, shipping), compute the system-level useful output per kWh of upstream clean electricity for the hydrogen route versus the best electric alternative, including all conversion, compression, storage, and distribution losses. Then identify the binding constraint for each use: is it efficiency (kWh in vs. service out), energy density (kWh per kg), or storage duration (hours vs. seasons)? Hydrogen 'wins' only where its non-efficiency advantage (density or duration) outweighs its efficiency disadvantage. Validate against real-world deployment data (FCEV vs. BEV fleets, hydrogen vs. heat-pump heating trials, battery vs. hydrogen grid-storage economics).",
        verification_status: "verified" as const,
        cost_to_verify:
          "$50K-200K (Energy-systems modeling; underlying efficiency figures are already well-measured)",
        falsification: {
          supporter_flip:
            "If, even after accounting for energy density and seasonal storage, system models showed direct electrification beats hydrogen on useful-energy-per-clean-kWh in essentially every end use — including grid balancing and heavy transport — then the 'reserve hydrogen for the niches' case would collapse and hydrogen would be a stranded detour.",
          skeptic_flip:
            "A skeptic who treats low round-trip efficiency as disqualifying should weigh that for seasonal grid storage (months, not hours) and for aviation/shipping (where kg-per-MJ, not electrical efficiency, binds), batteries have no economical answer — so for those specific uses the efficiency penalty is the correct price to pay rather than a fatal flaw.",
          common_ground:
            "Both sides agree that for passenger cars and home heating, batteries and heat pumps deliver far more useful energy per unit of clean electricity, and that hydrogen there is wasteful.",
          live_disagreement:
            "Whether hydrogen's density and seasonal-storage advantages justify its efficiency penalty in aviation, shipping, and long-duration grid balancing — or whether electrification (plus cheaper battery/storage advances) will encroach even there.",
        },
      },
      evidence: [
        {
          id: "fcev-vs-bev-efficiency",
          title:
            "Fuel-Cell Cars Deliver ~25-35% of Clean Electricity to the Wheels vs ~70-80% for Battery EVs",
          description:
            "Across the well-to-wheel chain, a hydrogen fuel-cell vehicle achieves roughly 25-35% overall efficiency: electrolysis loses ~20-30% of the input energy, compression/storage/transport lose more, and the on-board fuel cell converting hydrogen back to electricity is only ~50-60% efficient. A battery electric vehicle, by contrast, retains roughly 70-80% of the original electricity, because lithium-ion round-trip efficiency is ~85-95% and there is no chemical conversion step. This roughly two-to-three-fold gap means a hydrogen car needs two to three times more clean generation to drive the same distance.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 9,
          },
          source:
            "Comparative efficiency analyses (e.g. InsideEVs/Volkswagen well-to-wheel; peer-reviewed powertrain studies)",
          sourceUrl:
            "https://insideevs.com/news/406676/battery-electric-hydrogen-fuel-cell-efficiency-comparison/",
          reasoning:
            "The efficiency figures are physically grounded, repeatedly measured, and broadly agreed across independent sources, giving high replicability and directness. The evidence is decisive against hydrogen for passenger cars specifically; it says little about uses where efficiency is not the binding constraint.",
        },
        {
          id: "rosenow-heating-review",
          title:
            "Peer-Reviewed Review of 32 Independent Studies: No Major Role for Hydrogen Home Heating",
          description:
            "Jan Rosenow's 2022 review in the Cell Press journal Joule examined 32 independent studies (those not funded by a vested industry) on heating homes with hydrogen and found that not one supported a widespread role for hydrogen in domestic heating. Compared with heat pumps, solar thermal, and district heating, hydrogen heating is less economic, less efficient, more resource-intensive, and has larger environmental impacts. A heat pump produces 3-4 units of heat per unit of electricity, whereas heating via hydrogen needs roughly five to six times more electricity for the same warmth.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source:
            "Rosenow, J. (2022), 'Is heating homes with hydrogen all but a pipe dream? An evidence review,' Joule",
          sourceUrl:
            "https://www.cell.com/joule/fulltext/S2542-4351(22)00416-0",
          reasoning:
            "A peer-reviewed evidence review in a respected journal, explicitly restricted to non-industry-funded studies, with a unanimous finding — very high reliability and independence. Directness to home heating is high. It does not bear on industrial feedstock or storage uses, so it should not be over-generalized to 'hydrogen is useless.'",
        },
        {
          id: "hydrogen-station-retreat",
          title:
            "Hydrogen Car Refueling Network Is Shrinking; Shell Exited US Stations",
          description:
            "The real-world hydrogen passenger-vehicle ecosystem is contracting. Shell closed its U.S. hydrogen refueling stations in February 2024, citing supply complications and market factors, leaving parts of California without access. The U.S. retail hydrogen station count has declined from a peak of around 59 in 2023 to roughly the low-50s, almost all in California, and Toyota Mirai owners have brought legal complaints over the inability to reliably fuel their cars. This is market evidence that, for light-duty vehicles, the battery alternative is outcompeting hydrogen.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "InsideEVs; California Fuel Cell Partnership (H2FCP) station data",
          sourceUrl: "https://h2fcp.org/stations",
          reasoning:
            "Station counts and Shell's exit are documented by trade press and the official California fuel-cell partnership tracker. The evidence is direct against hydrogen cars specifically. It is market/commercial evidence rather than a controlled study, and reflects the US light-duty segment, not hydrogen's industrial or storage roles.",
        },
        {
          id: "seasonal-storage-density",
          title:
            "Hydrogen Offers Seasonal Storage and Energy Density Batteries Cannot Match",
          description:
            "Hydrogen can be stored in geological salt caverns at very large scale for weeks-to-months, providing seasonal (inter-month) energy storage to balance a renewables-heavy grid through prolonged low-wind, low-sun periods — a function lithium-ion batteries, optimized for hours of storage, cannot deliver economically. By mass, hydrogen also carries far more energy per kilogram than batteries (~120 MJ/kg lower heating value vs. roughly 1 MJ/kg of usable energy for lithium-ion cells), which is why it (and its derived e-fuels) is a leading candidate where weight matters, such as aviation and deep-sea shipping. These advantages are independent of round-trip efficiency.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "IEA, The Future of Hydrogen; US DOE on hydrogen storage and energy density",
          sourceUrl:
            "https://www.iea.org/reports/the-future-of-hydrogen",
          reasoning:
            "The seasonal-storage and gravimetric-energy-density advantages are well established in the IEA and DOE literature. Directness is moderate because these advantages apply only to specific uses (grid balancing, heavy transport), and whether they justify hydrogen's efficiency penalty depends on how cheaply batteries and alternative long-duration storage improve.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Cost, Scale, and the Hype Gap
    // =========================================================================
    {
      id: "cost-and-hype-gap",
      title: "Cost, Scale, and the Hype Gap",
      short_summary:
        "Green hydrogen costs several times more than the fossil-based hydrogen it must replace, and the gulf between announced projects and ones actually built is enormous. Proponents point to steep cost-decline curves, subsidies like the US IRA and EU Hydrogen Bank, and the precedent of solar and batteries. Skeptics see a recurring hype cycle in which announcements vastly outrun reality.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The hydrogen economy has a chronic gap between promise and delivery. Green hydrogen costs roughly $4-8/kg today versus about $1-2/kg for grey hydrogen from natural gas — a two-to-fivefold penalty with no buyer willing to pay it absent subsidy. The deployment numbers expose the hype: the IEA reports that of all announced low-emissions hydrogen capacity, only ~7% has reached a final investment decision, and a Nature Energy study tracking roughly 190 projects over three years found only ~7% of announced capacity was realized on schedule. A wave of cancellations and downscalings hit in 2024-2025; by the end of 2024, more than a fifth of announced EU green-hydrogen projects had been shelved, scaled back, or delayed, and only about 10% of announced pre-2030 clean-hydrogen capacity had an identified buyer. The world has been promised a 'hydrogen economy' since at least the 1970s and it has repeatedly failed to arrive; betting the energy transition on it again is imprudent.",
      proponent_rebuttal:
        "Cost and deployment gaps are real but are exactly what an early-stage technology scaling curve looks like — and the trajectory is steeply downward. Green hydrogen's cost is dominated by electrolyzer capital and clean-electricity price, both falling fast; the US DOE's Hydrogen Shot targets $1/kg by 2031, IRA production tax credits already push subsidized US projects under $1/kg, and the EU Hydrogen Bank is auctioning fixed-premium support to close the gap. Solar modules fell ~90% in a decade and lithium batteries ~90% as well once volume scaled, defying identical 'it will never be cheap enough' skepticism. The IEA itself, even while documenting the cancellations, projects low-emissions hydrogen from operational-or-FID projects reaching about 4.2 Mtpa by 2030 — roughly a fivefold increase and around 4% of total supply — so the industry is growing, just slower than the early hype. The honest reading is that the 'hydrogen for everything' hype deserved to be punctured, but that disciplined, subsidy-bridged deployment in the right sectors is on track.",
      crux: {
        id: "cost-decline-trajectory-test",
        title: "The Cost-Decline Trajectory Test",
        description:
          "Whether green hydrogen follows a solar/battery-like cost-decline curve to genuine competitiveness with grey hydrogen (and with electrification alternatives) within the 2030s, or whether it plateaus well above parity and remains dependent on permanent subsidy. If electrolyzer and clean-electricity costs fall as projected and unsubsidized green hydrogen approaches ~$1-2/kg, the viability case is largely won for the right sectors. If costs stall and the announcement-to-FID gap persists, the 'hydrogen economy' remains a perennially-deferred promise.",
        methodology:
          "Track the realized (not announced) levelized cost of green hydrogen annually against the experience-curve projections, decomposing it into electrolyzer capital cost ($/kW), capacity factor, and delivered clean-electricity price. Measure the announcement-to-FID conversion rate and the share of capacity with committed offtake over successive IEA Global Hydrogen Reviews. Compare the realized learning rate to those of solar PV and lithium-ion batteries at equivalent cumulative-deployment milestones. Parity is confirmed if unsubsidized green hydrogen reaches grey-hydrogen cost in regions with cheap renewables; the hype thesis is confirmed if FID conversion and offtake stay low while costs plateau above ~$3-4/kg.",
        equation:
          "C_{H_2} = \\frac{\\text{CAPEX}_{elec}\\cdot \\text{CRF} + \\text{OPEX}}{\\text{CF}\\cdot \\eta \\cdot 8760} + \\frac{P_{elec}}{\\eta}",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$200K-500K (Ongoing techno-economic tracking against experience curves; data largely public via IEA/IRENA)",
        falsification: {
          supporter_flip:
            "If a decade of realized data showed green-hydrogen costs plateauing well above $3-4/kg, the announcement-to-FID conversion rate staying near today's ~7%, and offtake commitments failing to materialize, then the 'it's just early on the cost curve' case would be falsified and hydrogen would look like a perennial subsidy-dependent hype cycle.",
          skeptic_flip:
            "A skeptic who calls it a perpetual hype cycle should weigh that solar PV and lithium batteries each fell roughly 90% once volume scaled — defying the same 'never cheap enough' arguments — and that IRA credits and EU Hydrogen Bank auctions are already driving subsidized projects toward $1/kg, so a solar-like decline is a live possibility, not a fantasy.",
          common_ground:
            "Both sides agree green hydrogen is several times more expensive than grey today, and that announced projects have vastly outrun those actually financed and built.",
          live_disagreement:
            "Whether green hydrogen rides a solar/battery-style experience curve to unsubsidized competitiveness in the 2030s, or plateaus above parity as a perennially-deferred, subsidy-dependent promise — which only realized cost and FID-conversion data over the decade can resolve.",
        },
      },
      evidence: [
        {
          id: "green-vs-grey-cost",
          title:
            "Green Hydrogen Costs ~$4-8/kg vs ~$1-2/kg for Grey Hydrogen",
          description:
            "Unsubsidized green (electrolytic) hydrogen costs roughly $4-8/kg in 2024 depending on electricity prices and electrolyzer utilization, while grey hydrogen from natural gas via steam methane reforming costs roughly $1-2/kg. That two-to-fivefold premium is the central commercial obstacle: no large buyer will voluntarily pay multiples more for a chemically identical molecule without subsidy or a regulatory mandate. Achieving parity generally requires very cheap renewable electricity (on the order of $20-30/MWh) plus continued falls in electrolyzer capital cost.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 9,
          },
          source:
            "IEA Global Hydrogen Review; BloombergNEF / industry levelized-cost estimates",
          sourceUrl:
            "https://www.iea.org/reports/global-hydrogen-review-2025",
          reasoning:
            "The cost ranges are consistent across IEA, BNEF, and industry sources and are directly on point for viability. Ranges are wide because cost is highly site-specific (electricity price, capacity factor), which slightly lowers replicability, but the qualitative conclusion — green is several times costlier than grey today — is not seriously disputed.",
        },
        {
          id: "fid-7-percent",
          title:
            "Only ~7% of Announced Low-Emissions Hydrogen Capacity Has Reached Final Investment Decision",
          description:
            "The IEA's Global Hydrogen Reviews report that, despite a flood of project announcements, only about 7% of announced low-emissions hydrogen production capacity has taken a firm (final) investment decision, held back by uncertain demand, unclear certification and regulation, and missing infrastructure. As of mid-2025 only roughly 10% of announced clean-hydrogen capacity targeting production before 2030 had an identified, confirmed buyer. The announcement-to-reality gap is the defining feature of the sector.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "IEA, Global Hydrogen Review 2024 and 2025",
          sourceUrl:
            "https://www.iea.org/reports/global-hydrogen-review-2025/executive-summary",
          reasoning:
            "The IEA is the authoritative energy-system data source, and the ~7% FID figure is widely cited and corroborated by independent academic work. Directly demonstrates the hype-versus-delivery gap. It is a snapshot that could improve as policy support matures, which is the proponents' counter.",
        },
        {
          id: "nature-energy-implementation-gap",
          title:
            "Nature Energy: Only ~7% of Announced Green-Hydrogen Capacity Realized On Schedule",
          description:
            "A study published in Nature Energy (2024) tracking roughly 190 green-hydrogen projects over three years documented a large 'ambition-implementation gap': only about 7% of the globally announced capacity was actually realized on schedule, with the remainder delayed, downscaled, or cancelled. The authors attribute the gap to financing difficulty, missing offtake demand, and regulatory uncertainty, and caution against treating headline announcement pipelines as reliable forecasts of deployment.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source:
            "Odenweller & Ueckerdt et al., 'The green hydrogen ambition and implementation gap,' Nature Energy (2024)",
          sourceUrl:
            "https://www.nature.com/articles/s41560-024-01684-7",
          reasoning:
            "Peer-reviewed in a top-tier journal, independent of industry, tracking a large project sample over time — high reliability and independence. Directly quantifies the hype gap. It measures historical realization rates, which proponents argue understate future delivery as subsidy frameworks (IRA, EU Hydrogen Bank) take hold.",
        },
        {
          id: "subsidy-cost-decline",
          title:
            "DOE Hydrogen Shot Targets $1/kg by 2031; Subsidies Already Push Costs Down",
          description:
            "The US Department of Energy's 'Hydrogen Shot' targets clean hydrogen at $1/kg within a decade (by 2031), and the Inflation Reduction Act's 45V production tax credit (up to $3/kg) is large enough to push subsidized US green-hydrogen projects toward or below $1/kg. The EU Hydrogen Bank runs competitive auctions paying a fixed premium per kg to bridge the cost gap. Proponents point to solar PV and lithium-ion batteries — both of which fell roughly 90% in cost once volume scaled — as precedent for a steep experience curve that the same 'never competitive' skepticism failed to anticipate.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source:
            "US DOE Hydrogen Shot; IRA Section 45V; European Hydrogen Bank",
          sourceUrl: "https://www.hydrogen.energy.gov/",
          reasoning:
            "The DOE target, the 45V credit, and the EU Hydrogen Bank are real policy instruments, and the solar/battery learning-curve analogy is well-documented. Independence and replicability are lower because the targets are aspirational and the $1/kg figures depend on subsidies rather than demonstrated unsubsidized cost — exactly the point skeptics dispute.",
        },
      ],
    },
  ],
  references: [
    {
      title:
        "Global Hydrogen Review 2025 — International Energy Agency (IEA)",
      url: "https://www.iea.org/reports/global-hydrogen-review-2025",
    },
    {
      title:
        "The green hydrogen ambition and implementation gap — Odenweller & Ueckerdt, Nature Energy (2024)",
      url: "https://www.nature.com/articles/s41560-024-01684-7",
    },
    {
      title:
        "Is heating homes with hydrogen all but a pipe dream? An evidence review — Rosenow, Joule (2022)",
      url: "https://www.cell.com/joule/fulltext/S2542-4351(22)00416-0",
    },
    {
      title:
        "Iron and Steel Technology Roadmap — International Energy Agency (IEA)",
      url: "https://www.iea.org/reports/iron-and-steel-technology-roadmap",
    },
    {
      title:
        "Ammonia: zero-carbon fertiliser, fuel and energy store — The Royal Society",
      url: "https://royalsociety.org/news-resources/projects/low-carbon-energy-programme/green-ammonia/",
    },
    {
      title: "Hydrogen Shot — US Department of Energy (DOE Hydrogen Program)",
      url: "https://www.hydrogen.energy.gov/",
    },
  ],
  questions: [
    {
      id: "q1",
      title:
        "Does green hydrogen have an indispensable role in hard-to-electrify sectors?",
      content:
        "Steel (~7-8% of global CO2), ammonia/fertilizer (~1.8%), and long-haul shipping have no demonstrated battery-electric path, and hydrogen-based direct reduced iron can cut steel emissions by up to ~95%. Yet even here the economics are brutal: Europe's flagship green-steel mill, Stegra, came within weeks of bankruptcy in late 2025 and green steel carries a roughly $200/tonne premium. Is hydrogen the unavoidable (if costly) answer for these sectors, or can cheaper routes — scrap-based electric arc furnaces, carbon capture, e-fuels — undercut it even there?",
    },
    {
      id: "q2",
      title:
        "Does the round-trip efficiency penalty disqualify hydrogen for cars and home heating?",
      content:
        "A hydrogen fuel-cell car delivers only ~25-35% of the original clean electricity to the wheels versus ~70-80% for a battery EV, and a peer-reviewed Joule review of 32 independent studies found none supporting a major role for hydrogen in home heating, since heat pumps deliver 3-4 units of heat per unit of electricity. Hydrogen advocates have largely conceded cars and heating to batteries and heat pumps — but argue efficiency isn't the binding constraint for seasonal grid storage or aviation, where energy density and storage duration matter more. Where does the efficiency penalty disqualify hydrogen, and where is it a price worth paying?",
    },
    {
      id: "q3",
      title:
        "Will green hydrogen costs fall to competitiveness, or is the hydrogen economy a perennial hype cycle?",
      content:
        "Green hydrogen costs roughly $4-8/kg versus ~$1-2/kg for grey, and the IEA reports only about 7% of announced low-emissions hydrogen capacity has reached a final investment decision, with a Nature Energy study finding only ~7% of announced capacity realized on schedule. Proponents point to the DOE's $1/kg-by-2031 target, IRA and EU Hydrogen Bank subsidies, and the ~90% cost declines of solar and batteries as precedent. Is green hydrogen riding a solar-like experience curve to genuine competitiveness, or is it a subsidy-dependent promise that has failed to arrive since the 1970s?",
    },
  ],
} satisfies Omit<Topic, "confidence_score"> & {
  confidence_score?: number;
};
