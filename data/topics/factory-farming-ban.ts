import type { Topic } from "@/lib/schemas/topic";

export const factoryFarmingBanData = {
  id: "factory-farming-ban",
  title: "Should We Ban Factory Farming?",
  meta_claim:
    "Industrial animal agriculture (factory farming) should be banned or drastically reformed due to its ethical, environmental, and public health costs.",
  status: "contested" as const,
  category: "science" as const,
  pillars: [
    {
      id: "animal-welfare-ethics",
      title: "Animal Welfare & Ethics",
      short_summary:
        "80 billion land animals are slaughtered annually, most after living in conditions that would be illegal if applied to dogs. The ethics hinge on how much moral weight you give a chicken.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Animal welfare standards have improved significantly over the past two decades. Cage-free, free-range, and humanely raised options exist for consumers who want them — the market is responding. Banning factory farming would disrupt rural economies that depend on it and raise the cost of animal protein, since pasture systems use far more land per unit of output and grow animals more slowly; that cost burden would fall hardest on low-income households. The exact price increase is uncertain and contested, but the direction is upward. And whether animals are moral patients in a way that overrides these costs is a genuinely unsettled ethical question, not a settled one.",
      proponent_rebuttal:
        "By the Sentience Institute's estimate, roughly 99% of US farmed animals live in factory farms — 'humane' options are a tiny fraction of production. Conditions include gestation crates so small pigs cannot turn around, battery cages giving hens less space than a sheet of paper, debeaking without anesthesia, and selection for rapid growth that causes skeletal and metabolic failure. The Cambridge Declaration on Consciousness (2012), signed by a group of neuroscientists, concluded that non-human animals including all mammals and birds possess the neurological substrates that generate consciousness — the capacity to have experiences, which is the basis any plausible case for their suffering rests on.",
      crux: {
        id: "sentience-threshold",
        title: "Animal Sentience and Moral Status",
        description:
          "Determining the level of conscious experience and suffering in farmed animals, and whether this triggers moral obligations that override economic considerations.",
        methodology:
          "Neuroimaging and behavioral studies of pain, distress, and emotional states in pigs, chickens, and cattle. Compare neural correlates of suffering to those in humans. Philosophical analysis of moral thresholds.",
        equation:
          "\\text{Moral Weight} = f(\\text{Sentience Level}, \\text{Suffering Intensity}, \\text{Number of Animals})",
        verification_status: "theoretical" as const,
        cost_to_verify: "$300K (Neuroscience and ethics review)",
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
            "A group of neuroscientists signed the Cambridge Declaration on Consciousness (July 7, 2012), concluding that 'humans are not unique in possessing the neurological substrates that generate consciousness' and that 'non-human animals, including all mammals and birds,' possess these substrates. This covers all major farmed species. It was proclaimed at the Francis Crick Memorial Conference at Churchill College, University of Cambridge, with Stephen Hawking as guest of honor.",
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
          title: "Animal Welfare Standards Have Steadily Improved",
          description:
            "The EU banned conventional battery cages (effective 2012) and restricted sow gestation crates (effective 2013). US states including California (Prop 12) and Massachusetts (Question 3) have passed confinement bans, and roughly a dozen states mandate cage-free eggs. Many major retailers pledged cage-free eggs by 2025, though several (including Walmart and Target) publicly fell short of that deadline citing supply and price. Industry groups argue voluntary improvement is more effective than prohibition.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source:
            "EU Council Directive 1999/74/EC (battery cages) and 2008/120/EC (sows); California Proposition 12 (2018); industry reporting on cage-free pledges",
          sourceUrl: "https://ballotpedia.org/California_Proposition_12,_Farm_Animal_Confinement_Initiative_(2018)",
          reasoning:
            "Real legislative and corporate progress exists, but improvements are partial (cage-free still permits crowding) and several voluntary 2025 pledges were missed; the aggregated source is general rather than a single primary dataset, so weighted modestly.",
        },
        {
          id: "food-price-impact",
          title: "Replacing Factory Farming Would Sharply Raise Land and Production Costs",
          description:
            "A peer-reviewed analysis found a nationwide US shift to exclusively grass-fed beef would require expanding the cattle herd from 77 to 100 million head (+30%), and that present-day pastureland can sustain only about 27% of current beef output without large pasture-productivity gains or land conversion. Because pasture systems grow animals more slowly and use far more land per unit of output, production costs and consumer prices would rise materially, which would weigh most on low-income households. The exact price increase is uncertain and depends on whether consumers shift toward cheaper plant proteins rather than buying like-for-like replacement meat.",
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
            "Peer-reviewed land/herd estimate is solid, but the specific 20-50% price figure was not traceable to a single authoritative source, so the price claim is stated qualitatively and directness is weighted down; modeling also assumes substitution toward replacement meat rather than plant protein.",
        },
      ],
    },
    {
      id: "environmental-health-impact",
      title: "Environmental & Health Impact",
      short_summary:
        "Livestock accounts for 14.5% of global greenhouse emissions. 73% of antibiotics sold worldwide go to farm animals. These are public health numbers, not just animal welfare arguments.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Modern intensive agriculture supplies cheap calories and protein at a scale no prior system has matched. Poorly planned plant-based diets risk shortfalls in B12, iron, zinc, and omega-3s, a real concern where food diversity or supplementation is limited — even if well-planned vegan diets can be adequate. Cultivated ('lab-grown') meat is not yet cost-competitive at scale and may take years to match the price and texture of conventional meat. Abruptly dismantling the system that feeds billions, rather than reforming it incrementally, risks food-security and affordability harms that fall hardest on the poor.",
      proponent_rebuttal:
        "Animal agriculture produces 14.5% of global greenhouse gas emissions (FAO lifecycle estimate). The often-repeated 'more than all transport combined' line is an apples-to-oranges comparison FAO itself disavows, but the absolute footprint is large regardless. Roughly two-thirds of medically important antibiotics sold in the US go to food animals (the ~70-73% figure is global), and confined operations are recognized drivers of antibiotic resistance and a plausible mixing-vessel for novel influenza — commercial swine herds are an established reservoir, and pig–human transmission is documented. Intensive crop and animal agriculture together drive nutrient runoff and ocean dead zones; the Gulf of Mexico hypoxic zone covers roughly 6,000 square miles, though cropland fertilizer, not manure, is the dominant nitrogen source.",
      crux: {
        id: "ghg-antibiotic-impact",
        title: "Comprehensive Environmental & Health Cost Accounting",
        description:
          "Full externality accounting of factory farming including GHG emissions, antibiotic resistance costs, water pollution, and pandemic risk.",
        methodology:
          "Calculate total externalized costs: GHG damage (social cost of carbon), healthcare costs from antibiotic resistance, water treatment costs from agricultural runoff, and expected value of pandemic risk from zoonotic disease.",
        equation:
          "\\text{True Cost} = \\text{Market Price} + \\sum (\\text{GHG Damage} + \\text{Health Costs} + \\text{Pollution Costs} + \\text{Pandemic Risk})",
        verification_status: "theoretical" as const,
        cost_to_verify: "$2M (Multi-disciplinary externality study)",
      },
      evidence: [
        {
          id: "fao-livestock-ghg",
          title: "FAO: Livestock Produces 14.5% of Global GHG Emissions",
          description:
            "The UN Food and Agriculture Organization's comprehensive lifecycle assessment found that livestock contributes 14.5% of all anthropogenic greenhouse gas emissions. Cattle alone account for 65% of the livestock sector's emissions, primarily through methane from enteric fermentation and nitrous oxide from manure.",
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
            "Gold-standard international assessment with transparent methodology; widely cited in climate policy. FAO confirms livestock = 14.5% of anthropogenic GHG and cattle = 65% of the sector's emissions.",
        },
        {
          id: "who-antibiotic-resistance",
          title: "Antibiotic Use in Livestock Contributes to Resistance Crisis",
          description:
            "The Lancet/GRAM study estimated that bacterial antimicrobial resistance was directly responsible for 1.27 million deaths and associated with 4.95 million deaths globally in 2019. A widely cited (and contested) UK government review projected up to 10 million deaths per year by 2050. Health bodies identify antibiotic use in livestock as one driver of resistance. Roughly two-thirds of medically important antibiotics sold in the US go to food-producing animals (the ~80% figure refers to global sales, not the US).",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source:
            "Murray CJL et al., 'Global burden of bacterial antimicrobial resistance in 2019,' The Lancet (2022); FDA antibiotic sales data; O'Neill Review on AMR (2016, for 2050 projection)",
          sourceUrl: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(21)02724-0/fulltext",
          reasoning:
            "Death-burden figure is from the peer-reviewed Lancet GRAM study, re-attributed from an incorrect 'WHO report' label. The 10M/2050 projection is the contested O'Neill estimate, now flagged as such. The 80% antibiotics claim was overstated for the US (it is global; US is ~two-thirds), and the livestock-to-human-resistance link is real but not the sole cause, so directness is weighted down.",
        },
        {
          id: "plant-protein-adequacy",
          title: "Plant-Based Diets Can Lack Key Nutrients Without Supplements",
          description:
            "The Academy of Nutrition and Dietetics (formerly the American Dietetic Association) holds that appropriately planned vegetarian and vegan diets are healthful and nutritionally adequate for all life stages, including pregnancy, infancy, and older adulthood. The position stresses the 'appropriately planned' caveat, since poorly planned plant-based diets risk shortfalls in nutrients such as B12, iron, zinc, and omega-3s — a greater concern where food diversity or supplementation is limited.",
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
          title: "Agricultural Runoff Creates 6,000 sq mi Dead Zone",
          description:
            "The Gulf of Mexico 'dead zone' (hypoxic area) measured about 6,334 square miles in 2021 — roughly the size of Connecticut and Rhode Island combined — and has averaged several thousand square miles annually; the largest on record was 8,776 sq mi in 2017. NOAA attributes it to excess nitrogen and phosphorus nutrient pollution carried from across the Mississippi River watershed, dominated by agriculture (including cropland fertilizer and livestock manure) alongside urban runoff.",
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
            "Well-documented phenomenon, but directness is weighted down: NOAA attributes the nutrient load to the whole Mississippi watershed (cropland fertilizer is a dominant source), so the prior claim that animal manure is 'the largest single source' was an overstatement and has been corrected.",
        },
      ],
    },
  ],
};
