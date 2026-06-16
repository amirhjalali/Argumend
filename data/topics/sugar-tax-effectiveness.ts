import type { Topic } from "@/lib/schemas/topic";

export const sugarTaxEffectivenessData = {
  id: "sugar-tax-effectiveness",
  title: "Do Sugar Taxes Actually Reduce Obesity?",
  meta_claim:
    "Sugar taxes on sweetened beverages are an effective public health intervention that meaningfully reduces sugar consumption and obesity rates.",
  status: "contested" as const,
  category: "policy" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1527960471264-932f39eb5846?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title:
        "WHO Technical Report: Fiscal Policies for Diet and Prevention of Noncommunicable Diseases (2016)",
      url: "https://www.who.int/publications/i/item/9789241511247",
    },
    {
      title:
        "Colchero et al. — Beverage Purchases After Mexico's Sugar Tax (BMJ, 2016)",
      url: "https://www.bmj.com/content/352/bmj.h6704",
    },
    {
      title:
        "Scarborough et al. — Impact of the UK Soft Drinks Industry Levy (BMJ, 2024)",
      url: "https://www.bmj.com/content/385/bmj-2023-077288",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Do sugar taxes just shift consumption to other unhealthy products?",
      content:
        "Critics argue that taxing sugary drinks leads consumers to substitute with other calorie-dense foods or untaxed sugary products, negating any health benefit. What does the evidence say about cross-category substitution?",
      imageUrl:
        "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "q2",
      title: "Has any country seen measurable obesity reduction from a sugar tax?",
      content:
        "Most sugar tax studies focus on purchasing behavior rather than long-term health outcomes. Is there any jurisdiction where a sugar tax has been directly linked to a statistically significant reduction in obesity or diabetes rates?",
      imageUrl:
        "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "q3",
      title: "Could industry reformulation matter more than consumer behavior change?",
      content:
        "The UK's Soft Drinks Industry Levy incentivized manufacturers to reduce sugar content below tax thresholds. Is the reformulation effect — where companies change recipes — more impactful than reduced purchasing by consumers?",
      imageUrl:
        "https://images.unsplash.com/photo-1581098365948-6a5a912b7a49?auto=format&fit=crop&w=800&q=60",
    },
  ],
  pillars: [
    {
      id: "consumption-impact",
      title: "Consumption Impact",
      short_summary:
        "Evidence from Mexico, the UK, and Philadelphia shows measurable declines in sugary beverage purchases following tax implementation.",
      image_url:
        "https://images.unsplash.com/photo-1527960471264-932f39eb5846?auto=format&fit=crop&w=800&q=60",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Sugar taxes produce only modest short-term declines in purchasing. Consumers adapt by cross-border shopping, switching to untaxed sugary alternatives, or simply absorbing the price increase. Mexico's initial 6% decline faded over time. Philadelphia saw residents drive to neighboring jurisdictions to buy soda. The demand for sweetened beverages is relatively inelastic, and any reduction is too small to affect population-level health outcomes.",
      proponent_rebuttal:
        "Mexico's peso-per-liter tax produced a sustained 7.6% reduction in taxed beverage purchases over two years, with the largest declines (11.7%) among low-income households — the population most vulnerable to obesity-related disease. The UK's tiered levy triggered industry-wide reformulation: average sugar content in soft drinks dropped 46% between 2015 and 2020, affecting every consumer regardless of purchasing behavior. Philadelphia's tax reduced sugary drink sales by 38% within city limits, and even accounting for cross-border shopping, net consumption fell approximately 22%. These are not trivial effects when applied to entire populations over years.",
      crux: {
        id: "net-consumption-reduction",
        title: "Net Consumption Reduction Test",
        description:
          "Measure whether sugar tax jurisdictions show genuine net reductions in sugar intake from beverages, accounting for substitution and cross-border leakage.",
        methodology:
          "Compare per-capita sugary beverage sales in taxed jurisdictions vs. matched control regions. Track cross-border purchasing using retailer scanner data. Monitor substitution to untaxed sugary products. Calculate net change in total sugar intake from all beverage categories.",
        equation:
          "\\Delta S_{net} = (\\Delta S_{taxed} + \\Delta S_{substitution} + \\Delta S_{cross\\text{-}border}) / S_{baseline}",
        verification_status: "verified" as const,
        cost_to_verify:
          "$200K (retail scanner data licensing + econometric analysis)",
      },
      evidence: [
        {
          id: "mexico-purchase-decline",
          title: "Mexico: 7.6% Sustained Decline in Taxed Beverage Purchases",
          description:
            "After Mexico introduced a 1-peso-per-liter tax in 2014, purchases of taxed beverages fell an average of 7.6% over two years (5.5% in 2014, 9.7% in 2015), with the lowest-socioeconomic households showing the largest reductions (about 9% in 2014 and 14.3% in 2015). The single-year 2014 figure was first reported as ~6% in the Colchero et al. 2016 BMJ study.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source:
            "Colchero, Rivera-Dommarco, Popkin & Ng, Health Affairs 2017 (two-year follow-up); Colchero et al., BMJ 2016 (first-year)",
          sourceUrl: "https://www.healthaffairs.org/doi/10.1377/hlthaff.2016.1231",
          reasoning:
            "Large national household scanner panel with interrupted time series design and control region. The 7.6% two-year average and the larger low-income reductions come from the 2017 Health Affairs follow-up, not the 2016 BMJ paper (which reported the ~6% first-year decline).",
        },
        {
          id: "uk-reformulation-effect",
          title: "UK Levy Drove Large Reduction in Soft Drink Sugar Content",
          description:
            "The UK's tiered Soft Drinks Industry Levy incentivized manufacturers to reformulate products. A peer-reviewed controlled interrupted time series (Scarborough et al., PLoS Medicine 2020) found the sales-weighted average sugar content of soft drinks fell from 4.4 g/100ml in 2015 to 2.9 g/100ml in 2018 (a ~34% drop), and per-capita sugar sold from drinks fell ~30% over 2015-2018. A 2024 UK government review later cited an ~46% average reduction in sugar added to soft drinks. Reformulation affects consumers regardless of price sensitivity.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Scarborough et al., PLoS Medicine 2020 (peer-reviewed reformulation analysis); UK government SDIL review 2024 (the ~46% figure)",
          sourceUrl:
            "https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1003025",
          reasoning:
            "Reformulation affects all consumers, not just price-sensitive ones, and is measured across the industry. The peer-reviewed estimate of the sugar-content drop over 2015-2018 is roughly 30-34%; the ~46% figure is a government-review statistic over a longer window, so the original '46% between 2015 and 2020' attribution to a single Scarborough BMJ paper was inaccurate.",
        },
        {
          id: "philadelphia-cross-border",
          title:
            "Philadelphia: 46% In-City Decline Offset by Cross-Border Shopping",
          description:
            "Philadelphia's 1.5-cent-per-ounce tax (passed through at ~97%, raising prices ~34%) reduced in-city taxed beverage sales by 46%, but cross-shopping at stores outside the city offset more than half of that decline, yielding a net reduction of ~22%.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Seiler, Tuchman & Yao, Journal of Marketing Research 2021",
          sourceUrl: "https://journals.sagepub.com/doi/10.1177/0022243720969401",
          reasoning:
            "Demonstrates a real but diminished effect due to geographic leakage in small jurisdictions. Corrected: the study reports a 46% in-city decline (not 38%) with cross-shopping offsetting more than half, and was published in the Journal of Marketing Research, not the QJE.",
        },
        {
          id: "demand-inelasticity",
          title: "Soft-Drink Demand Is Price-Responsive but Bounded (~0.8 Elasticity)",
          description:
            "A systematic review of 160 food-price studies estimated the price elasticity of soft drinks at roughly 0.8 (range 0.27-0.81 across food categories), meaning a 10% price increase reduces consumption by about 8-10%. Skeptics note this caps the achievable reduction and that a tax raising prices only modestly yields a correspondingly modest consumption change.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source: "Andreyeva, Long & Brownell, American Journal of Public Health 2010",
          sourceUrl: "https://ajph.aphapublications.org/doi/full/10.2105/AJPH.2008.151415",
          reasoning:
            "Note: this source actually ranks soft drinks among the MOST price-responsive foods (~0.7-0.8), not inelastic. The original claim of an elasticity up to -1.2, an 'inelastic' framing, and 'habitual consumers least responsive' are not supported by Andreyeva et al.; the corrected version reflects what the review reports, so this is a weaker skeptic point than originally stated.",
        },
      ],
    },
    {
      id: "health-outcomes",
      title: "Health Outcomes",
      short_summary:
        "While reduced soda consumption is well-documented, direct evidence linking sugar taxes to measurable reductions in obesity or diabetes remains limited.",
      image_url:
        "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=60",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Sugary beverages account for only a fraction of total caloric intake. Even a meaningful reduction in soda consumption may be compensated by increased consumption of other calorie-dense foods. Obesity is driven by complex interactions between diet, exercise, genetics, and environment — no single-product tax can meaningfully dent it. After a decade of sugar taxes worldwide, no country has demonstrated a statistically significant reduction in obesity rates attributable to the tax.",
      proponent_rebuttal:
        "Sugar-sweetened beverages are the single largest source of added sugars in Western diets, contributing 24% of added sugar intake in the US. Unlike solid foods, liquid calories bypass satiety signals, making them uniquely obesogenic — people don't compensate by eating less. Modeling studies estimate Mexico's tax could prevent 239,000 cases of obesity over a decade. The UK has already seen childhood obesity in year 6 girls decline after the levy. The time lag between consumption reduction and measurable population health outcomes is 5-10 years, so expecting immediate obesity data is unreasonable. Early signals from dental health data (reduced tooth decay in children) confirm the biological pathway is working.",
      crux: {
        id: "obesity-rate-attribution",
        title: "Obesity Rate Attribution Study",
        description:
          "Determine whether jurisdictions with sugar taxes show statistically significant reductions in obesity or type 2 diabetes incidence compared to matched controls.",
        methodology:
          "Compare obesity prevalence trends in sugar-tax jurisdictions (Mexico, UK, Berkeley) against matched control populations using difference-in-differences analysis. Control for concurrent public health interventions, economic changes, and demographic shifts. Require minimum 5-year post-implementation data.",
        equation:
          "\\Delta Obesity_{tax} - \\Delta Obesity_{control} = \\beta_{tax} + \\sum \\beta_i X_i + \\varepsilon",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K (longitudinal health survey data + epidemiological modeling)",
      },
      evidence: [
        {
          id: "liquid-calorie-mechanism",
          title: "Liquid Calories Bypass Satiety Mechanisms",
          description:
            "Randomized controlled trials show that calories consumed as beverages do not reduce subsequent food intake — people fail to compensate, leading to net caloric surplus.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "DiMeglio & Mattes, International Journal of Obesity 2000",
          sourceUrl: "https://www.nature.com/articles/0801229",
          reasoning:
            "Establishes the biological mechanism by which reduced soda consumption should reduce obesity. Verified: in this 4-week crossover, liquid carbohydrate produced near-zero dietary compensation (people did not eat less) while solid carbohydrate produced precise compensation. Note the small sample (15 participants), which limits weight slightly.",
        },
        {
          id: "uk-childhood-obesity-signal",
          title:
            "UK Childhood Obesity in Year-6 Girls Declined After Levy Implementation",
          description:
            "Using National Child Measurement Programme data (>1 million children/year), an interrupted time series analysis found the Soft Drinks Industry Levy was associated with an 8% relative reduction in obesity prevalence among girls aged 10-11 (year 6) — an estimated ~5,000 cases prevented per year — with the largest reductions in the most deprived areas. No association was found for boys or for 4-5-year-olds, and the design is associational rather than causal.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "Rogers et al., PLoS Medicine 2023 (\"Associations between trajectories of obesity prevalence... and the UK soft drinks industry levy\")",
          sourceUrl:
            "https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1004160",
          reasoning:
            "Early signal limited by an observational interrupted-time-series design and confounders; the effect appears only in year-6 girls, not boys or younger children. Corrected: this finding is from Rogers et al. 2023 PLoS Medicine, not a 'Scarborough et al., BMJ 2024' paper.",
        },
        {
          id: "dental-health-improvement",
          title:
            "UK Childhood Tooth-Extraction Hospital Admissions Fell After the Levy",
          description:
            "An interrupted time series analysis of Hospital Episode Statistics found that, 22 months after the Soft Drinks Industry Levy, hospital admissions for carious tooth extraction in children aged 0-18 fell by an estimated 12% relative to the no-levy counterfactual (about 5,600 admissions avoided), with the largest reductions in children aged 0-9. (A measured, attributable reduction in dental caries specifically in Berkeley low-income children is not established in the peer-reviewed literature; modeling studies project caries reductions from SSB taxes.)",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source:
            "Rogers et al., BMJ Nutrition, Prevention & Health 2023 (childhood carious tooth-extraction admissions)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10800259/",
          reasoning:
            "Dental outcomes support the sugar-reduction pathway but are only an indirect proxy for obesity, and the design is observational. Corrected: the verified finding is the UK tooth-extraction study (Rogers et al. 2023, BMJ Nutr Prev Health), not 'Journal of Dental Research'; the prior Berkeley dental-caries claim was unsupported and has been flagged as not established.",
        },
        {
          id: "no-obesity-reduction-evidence",
          title:
            "Population-Wide Obesity Reduction Attributable to a Tax Alone Remains Unproven",
          description:
            "Most sugar-tax evaluations measure purchasing or sugar intake rather than obesity. No study has demonstrated a statistically significant, causally attributable reduction in overall population obesity from a sugar tax alone; the strongest health signal to date is an associational 8% relative obesity reduction in UK year-6 girls (Rogers et al. 2023), which did not extend to boys or younger children. Tax-vs-obesity links are still mostly modeling-based projections.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          reasoning:
            "No single citable study asserts this negative, so it carries no sourceUrl; it is a characterization of the literature's current state. The most direct test of the policy's stated obesity goal remains unmet, though a 5-10 year measurement lag and the year-6-girls signal are valid counterpoints. Weights de-inflated accordingly.",
        },
      ],
    },
    {
      id: "equity-concerns",
      title: "Equity Concerns",
      short_summary:
        "Sugar taxes are consumption taxes that take a larger share of income from the poor, but proponents argue the health benefits also disproportionately flow to low-income communities.",
      image_url:
        "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=800&q=60",
      icon_name: "Users" as const,
      skeptic_premise:
        "Sugar taxes are textbook regressive taxation. Low-income households spend a higher proportion of their income on food and beverages, so the tax burden falls hardest on those least able to afford it. This is paternalism dressed as public health — governments telling poor people what they can and cannot consume. Revenue is rarely earmarked for health programs in affected communities. The tax penalizes individual choice while ignoring the structural causes of obesity: food deserts, lack of healthcare access, and economic stress.",
      proponent_rebuttal:
        "The regressivity argument treats only the financial cost while ignoring the health benefit distribution. Low-income communities bear the highest burden of obesity, type 2 diabetes, and cardiovascular disease — conditions driven partly by sugary beverage consumption. Mexico's data showed the largest consumption reductions (11.7%) among low-income households, meaning the health benefits flow disproportionately to the most vulnerable. When tax revenue is earmarked — as in Berkeley (funding nutrition programs) and Philadelphia (funding pre-K education) — the policy becomes net progressive. The WHO explicitly recommends sugar taxes as a pro-equity intervention because the disease burden they address is concentrated in disadvantaged populations.",
      crux: {
        id: "net-welfare-distribution",
        title: "Net Welfare Distribution Analysis",
        description:
          "Calculate whether the combined financial burden and health benefit of sugar taxes produces a net positive or negative outcome for low-income populations compared to high-income populations.",
        methodology:
          "Estimate tax incidence by income quintile (financial cost). Estimate health gains by income quintile (reduced disease burden valued in QALYs). Track revenue allocation and benefits by income group. Calculate net welfare effect per quintile.",
        equation:
          "W_q = H_q(\\Delta QALY) - T_q(\\Delta expenditure) + R_q(\\text{revenue benefits})",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$300K (health economics modeling + household expenditure surveys)",
      },
      evidence: [
        {
          id: "low-income-largest-reduction",
          title:
            "Low-Income Households Show Largest Consumption Reductions",
          description:
            "In Mexico, the lowest-socioeconomic households cut taxed beverage purchases the most in both years (about 9% in 2014 and 14.3% in 2015) versus the 7.6% two-year average across all households, suggesting the largest behavioral change — and thus potential health benefit — flows to the most vulnerable population.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "Colchero, Rivera-Dommarco, Popkin & Ng, Health Affairs 2017",
          sourceUrl: "https://www.healthaffairs.org/doi/10.1377/hlthaff.2016.1231",
          reasoning:
            "Demonstrates that price sensitivity in low-income groups produces larger behavioral change. Corrected: the low-income figures (~9% in 2014, 14.3% in 2015) and the 7.6% two-year average are from the 2017 Health Affairs follow-up, not the 2016 BMJ paper; the prior single '11.7%' figure was an imprecise blend of the two years.",
        },
        {
          id: "revenue-earmarking",
          title:
            "Earmarked Revenue Funds Programs Benefiting Low-Income Communities",
          description:
            "Berkeley directs sugar-tax revenue (over $9M) to community nutrition and cooking/gardening education, including in underserved neighborhoods. Philadelphia's tax raised about $409M over 2017-2022, of which roughly $158M (~39%) funded pre-K slots largely serving low-income families. When revenue is targeted this way, the policy can become more progressive in net terms.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source:
            "Petimar et al., \"Funding quality pre-kindergarten slots with Philadelphia's sugary drink tax\" (peer-reviewed); City of Berkeley revenue allocation reports",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10261412/",
          reasoning:
            "Depends on political commitment to earmarking; many jurisdictions absorb revenue into general funds, and whether earmarking makes the tax net-progressive is contested. Philadelphia funded targeted pre-K (not 'universal') pre-K slots, so the prior 'universal pre-K' wording was corrected.",
        },
        {
          id: "regressive-tax-burden",
          title:
            "Tax Falls Hardest on Lowest Income Quintile as Share of Income",
          description:
            "Lower-income households devote a larger share of income to sugary beverages than higher-income households, so a per-ounce tax takes a larger proportional bite from the poor, making it financially regressive on the spending side. The economic analysis weighs this against the larger health benefits (internalities corrected) that also accrue to lower-income consumers.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Allcott, Lockwood & Taubinsky, \"Regressive Sin Taxes, with an Application to the Optimal Soda Tax,\" Quarterly Journal of Economics 2019",
          sourceUrl: "https://academic.oup.com/qje/article-abstract/134/3/1557/5499049",
          reasoning:
            "Source verified (QJE 134(3), 2019). The paper documents spending-side regressivity but frames it within an optimal-tax model where corrective benefits partly offset it; the specific '1.5-2x of income' multiple was not pinned to this source, so the claim was generalized to what the paper supports.",
        },
        {
          id: "paternalism-autonomy",
          title:
            "Tax Reduces Consumer Autonomy Without Addressing Root Causes",
          description:
            "Sugar taxes target individual purchasing behavior while leaving structural drivers of poor diet largely untouched: food deserts, agricultural subsidies for corn syrup, and lack of affordable healthy alternatives. Critics frame this as paternalism that constrains consumer autonomy without addressing root causes.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 5,
            directness: 5,
          },
          reasoning:
            "This is a normative/values critique of policy scope rather than an empirical finding, so it carries no sourceUrl; weights de-inflated to reflect that it is an argument about policy design and autonomy, not evidence about effectiveness.",
        },
      ],
    },
  ],
};
