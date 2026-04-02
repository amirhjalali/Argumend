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
        "Animal welfare standards have improved significantly over the past two decades. Cage-free, free-range, and humanely raised options exist for consumers who want them — the market is responding. Banning factory farming would devastate rural economies that depend on it and raise food prices 20-50%, hurting the poor most. Animals are not moral patients in the same way humans are.",
      proponent_rebuttal:
        "99% of US farmed animals live in factory farms — 'humane' options are a tiny fraction. Conditions include gestation crates so small pigs cannot turn around, battery cages giving hens less space than a sheet of paper, debeaking without anesthesia, and forced rapid growth causing skeletal failure. The Cambridge Declaration on Consciousness (2012) affirmed that mammals and birds possess the neurological substrates for conscious experience and suffering.",
      crux: {
        id: "sentience-threshold",
        title: "Animal Sentience and Moral Status",
        description:
          "Determining the level of conscious experience and suffering in farmed animals, and whether this triggers moral obligations that override economic considerations.",
        methodology:
          "Neuroimaging and behavioral studies of pain, distress, and emotional states in pigs, chickens, and cattle. Compare neural correlates of suffering to those in humans. Philosophical analysis of moral thresholds.",
        equation:
          "\\text{Moral Weight} = f(\\text{Sentience Level}, \\text{Suffering Intensity}, \\text{Number of Animals})",
        verification_status: "verified" as const,
        cost_to_verify: "$300K (Neuroscience and ethics review)",
      },
      evidence: [
        {
          id: "usda-farm-size-data",
          title: "USDA: 99% of US Farmed Animals in Factory Farms",
          description:
            "USDA National Agricultural Statistics Service data shows that 98.7% of US farmed animals live in concentrated animal feeding operations (CAFOs). This represents approximately 10 billion land animals per year in the US alone. The 'humane' market share is under 1% of total production.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source: "USDA NASS, Sentience Institute Analysis",
          reasoning:
            "Government data with high reliability; directly establishes the scale of factory farming.",
        },
        {
          id: "cambridge-declaration-consciousness",
          title: "Cambridge Declaration on Consciousness (2012)",
          description:
            "A prominent group of neuroscientists signed the Cambridge Declaration stating that 'non-human animals possess the neurological substrates that generate consciousness.' This includes all mammals and birds, covering all major farmed species. The declaration was signed at Cambridge University in the presence of Stephen Hawking.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Cambridge Declaration on Consciousness, 2012",
          reasoning:
            "Authoritative scientific statement; somewhat limited by philosophical debate over what 'consciousness' implies for moral status.",
        },
        {
          id: "welfare-improvement-trends",
          title: "Animal Welfare Standards Have Steadily Improved",
          description:
            "Since 2000, the EU has banned battery cages and gestation crates. US states (CA, MA, WA) have passed similar laws. McDonald's, Walmart, and major retailers have committed to cage-free eggs. Industry groups argue voluntary improvement is more effective than prohibition.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "ASPCA, National Chicken Council",
          reasoning:
            "Real progress exists, but critics note improvements are marginal (cage-free still allows extreme crowding) and timelines are slow.",
        },
        {
          id: "food-price-impact",
          title: "Banning Factory Farming Would Raise Food Prices 20-50%",
          description:
            "Economic modeling suggests replacing factory farming with pasture-based systems would increase meat prices 20-50% and require 2-3x more land. Low-income households spend 30%+ of income on food; price increases would disproportionately harm them. Protein deficiency could increase in developing nations.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "USDA Economic Research Service, FAO",
          reasoning:
            "Credible economic modeling, though it assumes a direct replacement rather than dietary shifts toward plant protein.",
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
        "Modern agriculture feeds 8 billion people more efficiently than any system in history. Plant-based diets lack key nutrients (B12, iron, zinc, omega-3s) without expensive supplementation. Lab-grown meat isn't commercially viable and may never match the taste, texture, and cost of conventional meat. Dismantling the system that feeds the world is reckless utopianism.",
      proponent_rebuttal:
        "Animal agriculture produces 14.5% of global greenhouse gas emissions — more than all transportation combined. Factory farms are breeding grounds for antibiotic-resistant bacteria (80% of US antibiotics go to livestock) and pandemic viruses (avian flu, swine flu originated in factory farm conditions). Manure runoff creates massive ocean dead zones — the Gulf of Mexico dead zone covers 6,000+ square miles annually.",
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
          source: "FAO 'Tackling Climate Change Through Livestock' (2013)",
          reasoning:
            "Gold-standard international assessment with transparent methodology; widely cited in climate policy.",
        },
        {
          id: "who-antibiotic-resistance",
          title: "WHO: Agricultural Antibiotic Use Drives Resistance Crisis",
          description:
            "The WHO identifies antibiotic use in livestock as a primary driver of antimicrobial resistance, which kills 1.27 million people annually and is projected to cause 10 million deaths/year by 2050. 80% of antibiotics sold in the US are used in animal agriculture, primarily for growth promotion rather than treating illness.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source: "WHO Antimicrobial Resistance Global Report",
          reasoning:
            "Authoritative source with strong methodology; causal link between specific farm practices and resistance is well-established.",
        },
        {
          id: "plant-protein-adequacy",
          title: "Plant-Based Diets Can Lack Key Nutrients Without Supplements",
          description:
            "Systematic reviews find that plant-based diets are nutritionally adequate for all life stages when properly planned, but many people fail to supplement B12, iron, zinc, and omega-3s. Developing nations with limited food diversity face greater risks. The American Dietetic Association endorses well-planned plant-based diets but emphasizes the 'well-planned' caveat.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source: "American Dietetic Association, Cochrane Reviews",
          reasoning:
            "Valid nutritional concern, though directness is limited since a factory farming ban doesn't require eliminating all animal products.",
        },
        {
          id: "mississippi-dead-zone",
          title: "Agricultural Runoff Creates 6,000 sq mi Dead Zone",
          description:
            "The Gulf of Mexico 'dead zone' covers approximately 6,334 square miles annually — an area the size of Connecticut and Rhode Island combined. It is primarily caused by nitrogen and phosphorus runoff from agricultural operations in the Mississippi River watershed, with animal manure being the largest single source.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "NOAA, USGS, EPA Gulf of Mexico Hypoxia Task Force",
          reasoning:
            "Well-documented environmental phenomenon with clear causal link to agricultural practices; directness slightly limited as crop agriculture also contributes.",
        },
      ],
    },
  ],
};
