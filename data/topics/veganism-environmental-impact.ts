import type { Topic } from "@/lib/schemas/topic";

export const veganismEnvironmentalData = {
  id: "veganism-environmental-impact",
  title: "Veganism for Environmental Impact",
  meta_claim:
    "Widespread adoption of vegan diets would significantly reduce humanity's environmental footprint, including greenhouse gas emissions, land use, and water pollution.",
  status: "contested" as const,
  category: "science" as const,
  pillars: [
    {
      id: "emissions-land-use",
      title: "Emissions & Land Use Reduction",
      short_summary:
        "Vegan diets produce 75% less greenhouse gas emissions and use 75% less land than high-meat diets, according to large-scale Oxford research.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Food system emissions are only 26% of the global total; transport and energy dwarf dietary choices. Not all land used for grazing is suitable for crops—much grassland cannot grow vegetables. Ruminants on non-arable land convert inedible grass into protein. A focus on individual diet distracts from systemic industrial change.",
      proponent_rebuttal:
        "A 2023 Oxford study of 55,000 UK residents published in Nature Food found vegan diets produce just 25% of the greenhouse gas emissions of high-meat diets, use 75% less land, cause 75% less biodiversity loss, and create 73% less water pollution. If everyone went vegan, global farmland could be reduced by 75%—an area the size of the US, China, Australia, and the EU combined. This is not about individual virtue; it is about the single largest lever available for food system decarbonization.",
      crux: {
        id: "global-dietary-shift-modeling",
        title: "Global Dietary Shift Impact Modeling",
        description:
          "Comprehensive modeling of what would happen to global emissions, land use, water use, and biodiversity if varying percentages of the global population shifted to plant-based diets.",
        methodology:
          "Use integrated assessment models (e.g., GLOBIOM, MAgPIE) to simulate global food system transitions. Model dietary shifts at 25%, 50%, 75%, and 100% adoption rates. Account for land-use change, supply chain adjustments, and economic transitions.",
        equation:
          "\\Delta E = \\sum_{i} (E_{\\text{current},i} - E_{\\text{vegan},i}) \\times P(\\text{adoption}_i)",
        verification_status: "verified" as const,
        cost_to_verify: "$500K (Meta-analysis and modeling of existing datasets)",
      },
      evidence: [
        {
          id: "oxford-nature-food-2023",
          title: "Oxford Study: Vegan Diets Have 75% Less Environmental Impact",
          description:
            "Professor Peter Scarborough's team at Oxford analyzed 55,000 UK residents' actual diets and connected them to environmental impact databases. Published in Nature Food (2023), the study found vegan diets produced 75% less greenhouse gas emissions, 75% less land use, 75% less biodiversity harm, and 73% less water pollution compared to high-meat diets.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 8,
            directness: 10,
          },
          source: "Scarborough et al., Nature Food (2023)",
          reasoning:
            "Gold-standard study: large sample (55,000), published in a top Nature journal, based on actual dietary data rather than modeled diets. Oxford's LEAP program has no industry funding conflicts.",
        },
        {
          id: "poore-nemecek-2018",
          title: "Poore & Nemecek: 76% Farmland Reduction Possible",
          description:
            "The most comprehensive meta-analysis of food systems, covering ~38,700 farms in 119 countries, found that moving from current diets to plant-based diets could reduce food's land use by 76%, greenhouse gas emissions by 49%, acidification by 50%, and eutrophication by 49%.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 9,
          },
          source: "Poore & Nemecek, Science (2018)",
          reasoning:
            "The largest meta-analysis of food systems ever conducted. Published in Science. Has been replicated and extended by subsequent studies.",
        },
        {
          id: "non-arable-grazing-land",
          title: "Much Grazing Land Cannot Grow Crops",
          description:
            "Approximately two-thirds of agricultural land globally is grassland unsuitable for crop production. Ruminant animals grazing this land convert inedible cellulose into human-edible protein and nutrients. Eliminating all animal agriculture would leave this land unused, and some ecosystems (e.g., the Great Plains) co-evolved with large grazers.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "FAO; Mottet et al., Global Food Security (2017)",
          reasoning:
            "Valid point about land suitability. However, directness is moderate because the Poore & Nemecek analysis already accounts for this—the 76% reduction factors in non-convertible land.",
        },
      ],
    },
    {
      id: "nutritional-feasibility",
      title: "Nutritional Feasibility at Scale",
      short_summary:
        "A billion people rely on livestock for calories and income. Telling subsistence farmers to go vegan is a different proposition than telling Whole Foods shoppers.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Vegan diets require careful planning to avoid deficiencies in B12, iron, omega-3, zinc, and calcium. In developing nations, animal products are often the most accessible source of complete protein and bioavailable micronutrients. Children, pregnant women, and the elderly face higher risks. Supplements are not universally available or affordable.",
      proponent_rebuttal:
        "Major nutrition bodies (Academy of Nutrition and Dietetics, British Dietetic Association) state well-planned vegan diets are nutritionally adequate for all life stages. B12 supplementation costs pennies per day. A 2025 Frontiers in Nutrition study found plant-based diets are equally nutritious and healthy as Mediterranean diets, with small deficits in vitamin D, iodine, and B12 easily remedied with supplements.",
      crux: {
        id: "population-nutrition-outcomes",
        title: "Large-Scale Vegan Population Health Outcomes",
        description:
          "Tracking long-term health outcomes (mortality, chronic disease, nutritional deficiencies) in large vegan populations compared to omnivores, controlling for socioeconomic status.",
        methodology:
          "Longitudinal cohort study following 100,000+ vegans and matched omnivore controls over 20+ years. Measure all-cause mortality, cardiovascular events, cancer rates, bone density, and micronutrient status.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$10M (Long-term epidemiological cohort study)",
      },
      evidence: [
        {
          id: "and-position-statement",
          title: "Academy of Nutrition and Dietetics: Vegan Diets Appropriate for All Life Stages",
          description:
            "The Academy of Nutrition and Dietetics, the world's largest organization of food and nutrition professionals (over 100,000 members), states that 'appropriately planned vegetarian, including vegan, diets are healthful, nutritionally adequate, and may provide health benefits for the prevention and treatment of certain diseases. These diets are appropriate for all stages of the life cycle.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Academy of Nutrition and Dietetics, Position Paper (2016)",
          reasoning:
            "Authoritative position from the largest nutrition professional body. However, the qualifier 'appropriately planned' is doing significant work—it implies that poorly planned vegan diets carry real risks.",
        },
        {
          id: "developing-nation-access",
          title: "Animal-Source Foods Critical in Food-Insecure Regions",
          description:
            "The FAO and WHO recognize that in low-income countries, animal-source foods provide essential micronutrients (iron, zinc, B12, vitamin A) that are difficult to obtain from available plant foods alone. In sub-Saharan Africa and South Asia, where dietary diversity is limited and supplement distribution is poor, removing animal products could worsen malnutrition.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source: "FAO; WHO; Headey et al., Global Food Security (2018)",
          reasoning:
            "Legitimate concern for global applicability. The environmental case for veganism is strongest in wealthy nations where dietary choices are unconstrained.",
        },
      ],
    },
  ],
};
