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
        "Vegan diets produce about 75% less greenhouse gas emissions and use about 75% less land than high-meat diets, with roughly two-thirds less biodiversity loss and around half the water use, according to large-scale Oxford research.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Food system emissions are only 26% of the global total; transport and energy dwarf dietary choices. Not all land used for grazing is suitable for crops—much grassland cannot grow vegetables. Ruminants on non-arable land convert inedible grass into protein. A focus on individual diet distracts from systemic industrial change.",
      proponent_rebuttal:
        "A 2023 Oxford study of 55,504 UK residents published in Nature Food found vegan diets produce just 25% of the greenhouse gas emissions of high-meat diets and use about 75% less land. The same study put vegans at roughly a third of high-meat-eaters' biodiversity-loss impact (~66% lower), about a quarter of their eutrophication (water-pollution) impact (~73% lower), and under half their water use (~54% lower). Separately, Poore & Nemecek's Science meta-analysis estimates a global shift to plant-based diets could cut food's land use by about 76% and its greenhouse emissions by about 49%—freeing farmland on the scale of the US, China, Australia, and the EU combined. This is not about individual virtue; it is the single largest lever available for food-system decarbonization.",
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
          title: "Oxford Study: Vegan Diets Have ~75% Less Environmental Impact",
          description:
            "Scarborough et al. at Oxford linked dietary data for 55,504 UK adults (vegans, vegetarians, fish-eaters, meat-eaters) to environmental impact databases drawn from a review of 570 life-cycle assessments. Published in Nature Food (2023), the study found vegans' dietary impacts were ~25% of high-meat-eaters' for greenhouse gas emissions (i.e. ~75% lower) and ~25% for land use, with vegans at 27.0% for eutrophication, 34.3% for biodiversity, and 46.4% for water use relative to high-meat-eaters. (Note: the water-use figure is ~54% lower, not 73%.)",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 8,
            directness: 10,
          },
          source: "Scarborough et al., Nature Food 4, 565–574 (2023)",
          sourceUrl: "https://www.nature.com/articles/s43016-023-00795-w",
          reasoning:
            "Gold-standard study: large sample (55,504), published in Nature Food, based on actual reported dietary data rather than modeled diets. Oxford's LEAP program has no industry funding conflicts. Figures verified against the published article: GHG and land use ~75% lower for vegans, but the original card's '73% less water pollution' overstated the result (eutrophication 27.0%, water use 46.4% of high-meat-eaters).",
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
          source: "Poore & Nemecek, Science 360, 987–992 (2018)",
          sourceUrl: "https://www.science.org/doi/10.1126/science.aaq0216",
          reasoning:
            "One of the largest meta-analyses of food systems conducted (data from 570 LCA studies covering ~38,700 farms in 119 countries). Published in Science. The 76% land-use reduction (global farmland from ~4 to ~1 billion hectares) and ~49% food-GHG reduction figures for a shift to plant-based diets are verified against the paper and Our World in Data's summary. Widely cited and extended by subsequent work.",
        },
        {
          id: "non-arable-grazing-land",
          title: "Much Grazing Land Cannot Grow Crops",
          description:
            "About two-thirds of agricultural land globally is permanent meadows and pastures rather than cropland (FAO: ~3.2 of ~4.8 billion hectares), much of it grassland unsuitable for crop production. Mottet et al. (2017) found that ~57% of the land used for livestock feed production is not suitable for growing human food, and that 86% of livestock feed is not human-edible. Ruminants grazing such land convert inedible forage into protein and micronutrients; some ecosystems (e.g., the Great Plains) co-evolved with large grazers.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "FAO land statistics; Mottet et al., Global Food Security 14, 1–8 (2017)",
          sourceUrl: "https://www.sciencedirect.com/science/article/pii/S2211912417300013",
          reasoning:
            "Valid point about land suitability, verified: FAO data put permanent pasture at ~two-thirds of agricultural land, and Mottet et al. quantify ~57% of feed land as non-arable (note: '57% of feed land' is a narrower figure than the broad 'two-thirds of all grazing land' framing). Directness lowered slightly: the Poore & Nemecek analysis already accounts for land convertibility, so this caveat trims rather than overturns the 76% land-reduction estimate.",
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
        "Major nutrition bodies (Academy of Nutrition and Dietetics, British Dietetic Association) state appropriately planned vegan diets are nutritionally adequate for all life stages. B12 supplementation costs pennies per day, and a 2025 Frontiers in Nutrition modelling study found a vegan menu nutritionally equivalent to a Mediterranean diet apart from small, supplement-remediable deficits in vitamin D, iodine, and B12. Crucially, the environmental case targets where the impact actually concentrates: high-income, high-meat consumers. It does not require subsistence farmers in food-insecure regions—who depend on animal-source foods for bioavailable iron, zinc, and B12 and lack reliable supplement supply chains—to abandon livestock. The claim is that affluent populations, whose dietary choices are unconstrained, can shift to plant-based diets without nutritional penalty, which is precisely where the largest emissions and land-use savings sit.",
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
          source: "Melina, Craig & Levin, J Acad Nutr Diet 116(12):1970–1980 (2016)",
          sourceUrl: "https://www.jandonline.org/article/S2212-2672(16)31192-3/fulltext",
          reasoning:
            "Authoritative position from the largest nutrition professional body; the quoted sentence is verbatim from the 2016 position paper (Melina, Craig & Levin). However, the qualifier 'appropriately planned' is doing significant work—it implies that poorly planned vegan diets carry real risks.",
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
          source:
            "Headey, Hirvonen & Hoddinott, Am. J. Agric. Econ. 100(5):1302–1319 (2018); FAO (2023)",
          sourceUrl: "https://onlinelibrary.wiley.com/doi/full/10.1093/ajae/aay053",
          reasoning:
            "Legitimate concern for global applicability. Headey et al. (2018) analyzed ~130,000 children across 49 low-income countries and found animal-source food consumption strongly associated with reduced child stunting. (Citation corrected: the study appeared in the American Journal of Agricultural Economics, not Global Food Security.) The environmental case for veganism is strongest in wealthy nations where dietary choices are unconstrained.",
        },
      ],
    },
  ],
};
