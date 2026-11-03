export const factoryFarmingBanData = {
  id: "factory-farming-ban",
  title: "Should We Ban Factory Farming?",
  question: "Should factory farming be banned or drastically reformed?",
  meta_claim:
    "Industrial animal agriculture (factory farming) should be banned or drastically reformed due to its ethical, environmental, and public health costs.",
  status: "contested" as const,
  category: "science" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "About 99% of US farmed animals live on factory farms, including 98.6% of pigs and over 99.9% of meat chickens. A shift to exclusively grass-fed beef would need the US cattle herd to grow from 77 to 100 million head, and today's pastureland could sustain only about 27% of current beef output. Both figures are accepted. The fight is over how much the animals' suffering should weigh against the cost of changing the system.",
    confidence: 85,
    source:
      "Sentience Institute, 'US Factory Farming Estimates' (USDA Census of Agriculture + EPA CAFO definitions); Hayek & Garrett, Environmental Research Letters (2018)",
    sourceUrl:
      "https://www.sentienceinstitute.org/us-factory-farming-estimates",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Both sides accept that the vast majority of farmed animals live in intensive confinement, that industrial animal agriculture imposes real, unpriced environmental and health costs, from emissions to antibiotic resistance, and that intensive systems use less land per unit of food than pasture.",
    "They split over how much moral weight farmed-animal suffering carries against the cost of changing the system; and over whether factory farming's harms justify a ban rather than taxes or reform, and whether pasture-based alternatives would do better or worse on land, emissions and food prices.",
    "The first is a weighing of values that studies of pain and distress in pigs, chickens and cattle inform but cannot decide.",
  ],
  pillars: [
    {
      id: "animal-welfare-ethics",
      title: "Animal Welfare & Ethics",
      short_summary:
        "By one estimate about 99% of US farmed animals live on factory farms. The ethics hinge on how much moral weight you give a pig or a chicken, and on what changing the system would cost.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Animal welfare standards have improved significantly over the past two decades. Cage-free, free-range, and humanely raised options exist for consumers who want them — the market is responding. Banning factory farming would disrupt rural economies that depend on it and raise the cost of animal protein, since pasture systems use far more land per unit of output and grow animals more slowly; that cost burden would fall hardest on low-income households. The exact price increase is uncertain and contested, but the direction is upward. And whether animals are moral patients in a way that overrides these costs is a genuinely unsettled ethical question, not a settled one.",
      proponent_rebuttal:
        "By the Sentience Institute's estimate, roughly 99% of US farmed animals live in factory farms — 'humane' options are a tiny fraction of production. Conditions include gestation crates so small pigs cannot turn around, battery cages giving hens less space than a sheet of paper, debeaking without anesthesia, and selection for rapid growth that causes skeletal and metabolic failure. The Cambridge Declaration on Consciousness (2012), signed by a group of neuroscientists, concluded that non-human animals including all mammals and birds possess the neurological substrates that generate consciousness — the capacity to have experiences, which is the basis any plausible case for their suffering rests on.",
      crux: {
        id: "sentience-threshold",
        title: "Animal Sentience and Moral Status",
        question:
          "How much moral weight does farmed-animal suffering carry against the cost of changing the system?",
        description:
          "Determining the level of conscious experience and suffering in farmed animals, and whether this triggers moral obligations that override economic considerations.",
        methodology:
          "Neuroimaging and behavioral studies of pain, distress, and emotional states in pigs, chickens, and cattle. Compare neural correlates of suffering to those in humans. Philosophical analysis of moral thresholds.",
        equation:
          "\\text{Moral Weight} = f(\\text{Sentience Level}, \\text{Suffering Intensity}, \\text{Number of Animals})",
        verification_status: "impossible" as const,
        settle: {
          condition:
            "Neuroimaging and behavior studies can measure pain and distress in pigs, chickens and cattle. How much that suffering weighs against the cost of changing the system is a value choice no measurement supplies.",
          kind: "value-difference" as const,
        },
        cost_to_verify: "$300K (Neuroscience and ethics review)",
        falsification: {
          supporter_flip:
            "If the science converged on farmed animals (especially birds and fish) lacking the neural basis for morally relevant suffering, or if welfare reforms measurably eliminated the worst confinement harms at scale, the strongest ethical case for a ban would soften into a case for reform.",
          skeptic_flip:
            "If pain research kept crediting mammals and birds with the neural substrates of conscious experience, extending the Cambridge Declaration, dismissing farmed-animal suffering would mean drawing a moral line the biology does not support.",
          common_ground:
            "Both sides agree the vast majority of farmed animals live in intensive confinement, and that whether — and how much — that matters morally is a genuinely contested values question, not a pure empirical one.",
          live_disagreement:
            "How much moral weight farmed-animal suffering carries relative to the economic costs of changing the system — a values judgment no measurement of neural activity can settle by itself.",
        },
      },
      evidence: [
        {
          id: "usda-farm-size-data",
          title: "~99% of US Farmed Animals in Factory Farms (Sentience Institute)",
          description:
            "The Sentience Institute estimates that ~99% of US farmed animals live in factory farms (concentrated animal feeding operations), derived by applying EPA CAFO size definitions to USDA Census of Agriculture data. Species breakdowns include 98.6% of pigs, 98.3% of egg-laying hens, and over 99.9% of meat chickens. The 'humane' market share is a small fraction of total production.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 8,
          },
          source:
            "Sentience Institute, 'US Factory Farming Estimates' (using USDA Census of Agriculture + EPA CAFO definitions)",
          sourceUrl: "https://www.sentienceinstitute.org/us-factory-farming-estimates",
          reasoning:
            "An advocacy-research estimate built on government data (USDA Census of Agriculture) and EPA CAFO definitions, not a direct USDA statistic; reliability/replicability weighted accordingly given it is a derived estimate.",
        },
        {
          id: "cambridge-declaration-consciousness",
          title: "Cambridge Declaration on Consciousness (2012)",
          description:
            "A group of neuroscientists signed the Cambridge Declaration on Consciousness (July 7, 2012), concluding that 'humans are not unique in possessing the neurological substrates that generate consciousness' and that 'non-human animals, including all mammals and birds,' possess these substrates. This covers all major farmed species. It was proclaimed at the Francis Crick Memorial Conference at Churchill College, University of Cambridge, and signed that evening in the presence of Stephen Hawking.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "Low P, Panksepp J, Reiss D, Edelman D, Van Swinderen B, Koch C, 'The Cambridge Declaration on Consciousness' (2012)",
          sourceUrl: "https://fcmconference.org/img/CambridgeDeclarationOnConsciousness.pdf",
          reasoning:
            "A signed declaration by reputable neuroscientists, not a peer-reviewed study; it speaks to consciousness substrates, not directly to moral status, so directness/replicability weighted down accordingly.",
        },
        {
          id: "welfare-improvement-trends",
          title: "Confinement Can Be Regulated Without a Ban",
          description:
            "The EU banned conventional battery cages from January 2012, and since a 2013 directive sow crates may not be used after the fourth week of pregnancy. California's Proposition 12, approved by 62.7% of voters in 2018, sets square-foot minimums for veal calves, breeding pigs and egg-laying hens, requires hens to be cage-free after December 31, 2021, and bans in-state sales of products that do not meet them; the US Supreme Court upheld it in National Pork Producers Council v. Ross. Reform advocates read such laws as evidence that the worst confinement practices can be legislated away without banning intensive farming.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source:
            "Ballotpedia, 'California Proposition 12, Farm Animal Confinement Initiative (2018)'; EU rules as summarized in Wikipedia's 'Battery cage' and 'Gestation crate' articles (Council Directives 1999/74/EC and 2008/120/EC)",
          sourceUrl: "https://ballotpedia.org/California_Proposition_12,_Farm_Animal_Confinement_Initiative_(2018)",
          reasoning:
            "Real legislative progress, but partial: cage-free still permits crowding, Prop 12 covers three species in one state and faces a July 2025 federal lawsuit, and the EU rules leave sow crates legal for the first weeks of pregnancy. The sources are summaries rather than a single primary dataset, so weighted modestly.",
        },
        {
          id: "food-price-impact",
          title: "All-Grass-Fed Beef Would Need 30% More Cattle and More Land Than Pasture Offers",
          description:
            "Hayek and Garrett modeled a nationwide US shift to exclusively grass-fed beef at today's output: it would require increasing the national cattle herd from 77 to 100 million, an increase of 30%, while current pastureland can support only 27% of the current beef supply (up to 61% if cropland-raised forage is counted). They conclude that demand could be met domestically only if beef consumption fell, 'due to higher prices or other factors', and that meeting it with imported grass-fed beef would likely raise overall methane emissions.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source:
            "Hayek MN, Garrett RD, 'Nationwide shift to grass-fed beef requires larger cattle population,' Environmental Research Letters 13(8) (2018)",
          sourceUrl: "https://iopscience.iop.org/article/10.1088/1748-9326/aad401",
          reasoning:
            "Peer-reviewed land and herd estimate. It models beef only, not pork or poultry, and does not estimate prices, so it shows the land constraint on pasture-based replacement rather than a measured cost of a ban; directness is weighted down accordingly.",
        },
      ],
    },
    {
      id: "environmental-health-impact",
      title: "Environmental & Health Impact",
      short_summary:
        "Livestock accounts for 14.5% of global greenhouse emissions, and animals consume about three times the antimicrobials people do. These are public health numbers, not just animal welfare arguments.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Modern intensive agriculture supplies cheap calories and protein at a scale no prior system has matched. Poorly planned plant-based diets risk shortfalls in B12, iron, zinc, and omega-3s, a real concern where food diversity or supplementation is limited — even if well-planned vegan diets can be adequate. Cultivated ('lab-grown') meat is not yet cost-competitive at scale and may take years to match the price and texture of conventional meat. Abruptly dismantling the system that feeds billions, rather than reforming it incrementally, risks food-security and affordability harms that fall hardest on the poor.",
      proponent_rebuttal:
        "Animal agriculture produces 14.5% of global greenhouse gas emissions (FAO lifecycle estimate). The often-repeated 'more than all transport combined' line is an apples-to-oranges comparison FAO itself disavows, but the absolute footprint is large regardless. Worldwide, antimicrobial consumption in animals is about threefold that of humans, and confined operations are recognized drivers of antibiotic resistance and a plausible mixing-vessel for novel influenza — commercial swine herds are an established reservoir, and pig–human transmission is documented. Intensive crop and animal agriculture together drive nutrient runoff and ocean dead zones; the Gulf of Mexico hypoxic zone measured about 6,300 square miles in 2021, though NOAA traces its nutrients to cities, farms and other sources across the watershed, not to livestock alone.",
      crux: {
        id: "ghg-antibiotic-impact",
        title: "Comprehensive Environmental & Health Cost Accounting",
        question:
          "Are factory farming's harms large enough to justify a ban rather than taxes or reform?",
        description:
          "Full externality accounting of factory farming including GHG emissions, antibiotic resistance costs, water pollution, and pandemic risk.",
        methodology:
          "Calculate total externalized costs: GHG damage (social cost of carbon), healthcare costs from antibiotic resistance, water treatment costs from agricultural runoff, and expected value of pandemic risk from zoonotic disease.",
        equation:
          "\\text{True Cost} = \\text{Market Price} + \\sum (\\text{GHG Damage} + \\text{Health Costs} + \\text{Pollution Costs} + \\text{Pandemic Risk})",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A full cost tally of emissions, antibiotic resistance, water pollution and pandemic risk from intensive farming, set against modeled results of a ban, a tax and targeted rules by agencies such as the FAO; how much animal suffering should weigh on top is a value each side would need to state.",
        },
        cost_to_verify: "$2M (Multi-disciplinary externality study)",
        falsification: {
          supporter_flip:
            "If full externality accounting showed factory farming's environmental and health costs are modest next to its cheap-calorie benefits — or that intensive systems are actually lower-impact per unit of protein than the pasture alternatives that would replace them — the public-health case for banning (vs. taxing externalities) would weaken.",
          skeptic_flip:
            "If full externality accounting tallied livestock's ~14.5% share of global emissions, the medically important antibiotics given to food animals, and confined operations' role in resistance and pandemic risk, and found those costs missing from the price, the status quo would be hard to defend.",
          common_ground:
            "Both sides agree industrial animal agriculture imposes real, unpriced environmental and health externalities, and that intensive systems are also more land-efficient per unit of output than pasture.",
          live_disagreement:
            "Whether those externalities are large enough to justify banning the system rather than taxing or reforming it — and whether pasture-based alternatives would be better or worse on land use, emissions, and food prices.",
        },
      },
      evidence: [
        {
          id: "fao-livestock-ghg",
          title: "FAO: Livestock Produces 14.5% of Global GHG Emissions",
          description:
            "The UN Food and Agriculture Organization's comprehensive lifecycle assessment found that livestock contributes 14.5% of all anthropogenic greenhouse gas emissions. Cattle account for about 65% of the sector's emissions. Across the sector, feed production and processing (45%) and enteric fermentation from ruminants (39%) are the two main sources, with manure storage and processing at 10%. The estimate is for the 2005 reference period.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source: "FAO, 'Tackling Climate Change Through Livestock' (2013)",
          sourceUrl: "https://www.fao.org/3/i3437e/i3437e.pdf",
          reasoning:
            "Gold-standard international assessment with transparent methodology; widely cited in climate policy. FAO confirms livestock = 14.5% of anthropogenic GHG and cattle = 65% of the sector's emissions. The figures describe all livestock, not factory farms alone, and use a 2005 baseline.",
        },
        {
          id: "who-antibiotic-resistance",
          title: "Antibiotic Use in Livestock Contributes to Resistance Crisis",
          description:
            "The Lancet/GRAM study estimated that bacterial antimicrobial resistance was directly responsible for 1.27 million deaths and associated with 4.95 million deaths globally in 2019. A widely cited (and contested) UK government review projected up to 10 million deaths per year by 2050. Van Boeckel et al. (Science, 2019) estimate that antimicrobial consumption in animals is threefold that of humans, and found that from 2000 to 2018 the share of antimicrobials showing resistance above 50% rose from 0.15 to 0.41 in chickens and from 0.13 to 0.34 in pigs in low- and middle-income countries.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source:
            "Murray CJL et al., 'Global burden of bacterial antimicrobial resistance in 2019,' The Lancet (2022); Van Boeckel TP et al., 'Global trends in antimicrobial resistance in animals in low- and middle-income countries,' Science 365:eaaw1944 (2019); O'Neill Review on AMR (2016, for 2050 projection)",
          sourceUrl: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(21)02724-0/fulltext",
          reasoning:
            "Death-burden figure is from the peer-reviewed Lancet GRAM study, re-attributed from an incorrect 'WHO report' label. The 10M/2050 projection is the contested O'Neill estimate, now flagged as such. The Lancet figures cover all antimicrobial resistance, not the share caused by livestock use; the animal-resistance trend is measured in animals, and its transfer to human disease is real but not quantified here, so directness is weighted down.",
        },
        {
          id: "plant-protein-adequacy",
          title: "Dietitians: Vegan Diets Are Adequate Only When Planned, With a Reliable B12 Source",
          description:
            "The Academy of Nutrition and Dietetics (formerly the American Dietetic Association) holds that 'appropriately planned vegetarian, including vegan, diets are healthful, nutritionally adequate,' and appropriate for all stages of the life cycle, including pregnancy, infancy, and older adulthood. It adds that 'Vegans need reliable sources of vitamin B-12, such as fortified foods or supplements.' The skeptic reading rests on the 'appropriately planned' caveat: where fortified foods, supplements or food diversity are scarce, a forced shift away from animal foods carries nutritional risk.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 4,
          },
          source:
            "Melina V, Craig W, Levin S, 'Position of the Academy of Nutrition and Dietetics: Vegetarian Diets,' J Acad Nutr Diet (2016)",
          sourceUrl: "https://www.jandonline.org/article/S2212-2672(16)31192-3/abstract",
          reasoning:
            "Authoritative dietetics position, re-attributed to its correct (renamed) body and the 2016 paper. Directness is low: the source actually affirms plant-based diets are adequate when planned, and a factory-farming ban does not require eliminating all animal products.",
        },
        {
          id: "mississippi-dead-zone",
          title: "Nutrient Runoff Feeds a 6,300 sq mi Gulf Dead Zone",
          description:
            "NOAA measured the Gulf of Mexico 'dead zone' (hypoxic area) at approximately 6,334 square miles in 2021, against a five-year average of 5,380 square miles; the largest measured since 1985 was 8,776 square miles in 2017. NOAA attributes it to excess nutrients from cities, farms and other sources in upland watersheds draining into the Gulf.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source: "NOAA / USGS, Gulf of Mexico hypoxia ('dead zone') measurements",
          sourceUrl: "https://www.noaa.gov/news-release/larger-than-average-gulf-of-mexico-dead-zone-measured",
          reasoning:
            "Well-documented phenomenon, but directness is weighted down: NOAA attributes the nutrient load to cities, farms and other sources across the watershed, and the page does not separate livestock from cropland fertilizer.",
        },
      ],
    },
  ],
};
