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
            "After Mexico introduced a 1-peso-per-liter tax in 2014, purchases of taxed beverages fell 7.6% over two years, with low-income households reducing purchases by 11.7%.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "Colchero et al., BMJ 2016",
          reasoning:
            "Large national dataset with interrupted time series design and control for confounders.",
        },
        {
          id: "uk-reformulation-effect",
          title: "UK Levy Drove 46% Reduction in Soft Drink Sugar Content",
          description:
            "The UK's tiered Soft Drinks Industry Levy caused manufacturers to reformulate products, reducing average sugar content by 46% between 2015 and 2020 — before most consumers changed behavior.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Scarborough et al., BMJ 2024",
          reasoning:
            "Reformulation affects all consumers, not just price-sensitive ones. Measured across entire industry.",
        },
        {
          id: "philadelphia-cross-border",
          title:
            "Philadelphia: 38% In-City Decline Offset by Cross-Border Shopping",
          description:
            "Philadelphia's 1.5-cent-per-ounce tax reduced in-city sugary drink sales by 38%, but cross-border purchasing offset roughly 40% of that decline, yielding a net reduction of ~22%.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Seiler et al., Quarterly Journal of Economics 2021",
          reasoning:
            "Demonstrates real but diminished effect due to geographic leakage in small jurisdictions.",
        },
        {
          id: "demand-inelasticity",
          title: "Sugary Drink Demand Is Relatively Inelastic",
          description:
            "Meta-analyses estimate the price elasticity of sugary beverages at -0.8 to -1.2, meaning a 10% tax yields only an 8-12% consumption decline — and habitual consumers are least responsive.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "Andreyeva et al., American Journal of Public Health 2010",
          reasoning:
            "Valid concern about magnitude, though elasticity in this range still produces population-level effects.",
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
          reasoning:
            "Establishes the biological mechanism by which reduced soda consumption should reduce obesity.",
        },
        {
          id: "uk-childhood-obesity-signal",
          title:
            "UK Childhood Obesity in Girls Declined After Levy Implementation",
          description:
            "NHS data showed a statistically significant reduction in obesity prevalence among year 6 girls following the 2018 Soft Drinks Industry Levy, though confounders exist.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "Scarborough et al., BMJ 2024",
          reasoning:
            "Early signal but limited by short follow-up period and potential confounders.",
        },
        {
          id: "dental-health-improvement",
          title:
            "Children's Dental Health Improved in Sugar Tax Jurisdictions",
          description:
            "Hospital admissions for childhood tooth extraction declined in the UK after the levy, and Berkeley saw reduced dental caries in low-income children.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source: "Rogers et al., Journal of Dental Research 2023",
          reasoning:
            "Dental outcomes confirm the sugar reduction pathway but are only an indirect proxy for obesity.",
        },
        {
          id: "no-obesity-reduction-evidence",
          title:
            "No Country Has Demonstrated Attributable Obesity Reduction",
          description:
            "Despite sugar taxes existing since 2014 in Mexico and 2015 in Berkeley, no peer-reviewed study has demonstrated a statistically significant, causally attributable reduction in population obesity rates from a sugar tax alone.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          reasoning:
            "The most direct test of the policy's stated goal remains unmet, though time lag is a valid counterpoint.",
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
            "In Mexico, the lowest socioeconomic group reduced taxed beverage purchases by 11.7% compared to 7.6% overall, suggesting the greatest health benefit flows to the most vulnerable population.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Colchero et al., BMJ 2016",
          reasoning:
            "Demonstrates that price sensitivity in low-income groups produces larger behavioral change and thus larger health benefit.",
        },
        {
          id: "revenue-earmarking",
          title:
            "Earmarked Revenue Funds Programs Benefiting Low-Income Communities",
          description:
            "Berkeley directs sugar tax revenue to nutrition education in underserved neighborhoods. Philadelphia funded universal pre-K. When revenue is targeted, the policy can become net progressive.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source: "City of Berkeley and City of Philadelphia budget reports",
          reasoning:
            "Depends on political commitment to earmarking; many jurisdictions absorb revenue into general funds.",
        },
        {
          id: "regressive-tax-burden",
          title:
            "Tax Falls Hardest on Lowest Income Quintile as Share of Income",
          description:
            "Households in the lowest income quintile spend 1.5-2x more of their income on sugary beverages than the highest quintile, making the tax functionally regressive in financial terms.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Allcott et al., Quarterly Journal of Economics 2019",
          reasoning:
            "Well-documented financial regressivity, though does not account for health benefit distribution.",
        },
        {
          id: "paternalism-autonomy",
          title:
            "Tax Reduces Consumer Autonomy Without Addressing Root Causes",
          description:
            "Sugar taxes target individual purchasing behavior while leaving structural drivers of poor diet untouched: food deserts, agricultural subsidies for corn syrup, and lack of affordable healthy alternatives.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          reasoning:
            "Valid critique of policy scope, though not an argument against effectiveness per se.",
        },
      ],
    },
  ],
};
