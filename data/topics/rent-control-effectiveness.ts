import type { TopicInput } from "@/lib/schemas/topic";

export const rentControlEffectivenessData = {
  id: "rent-control-effectiveness",
  title: "Does Rent Control Help or Hurt Renters?",
  question: "Does rent control make housing less affordable in the long run?",
  meta_claim:
    "Rent control policies reduce housing affordability in the long run by discouraging new construction and reducing housing supply.",
  status: "contested" as const,
  category: "economics" as const,
  keystone_fact: {
    statement:
      "When San Francisco extended rent control to small pre-1980 buildings in 1994, the tenants it covered moved about 20% less and were displaced less often. The landlords it covered cut their rental supply by 15%. The same study found both effects. The fight is over what they mean for the next renter, and for different cap levels and protections against rental withdrawals.",
    confidence: 85,
    source: "Diamond, McQuade & Qian, American Economic Review, 109(9): 3365-94 (2019)",
    sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/aer.20181289",
  },
  simple_case: [
    "The San Francisco study found both protection against displacement for covered tenants and a loss of rental supply. Its policy already exempted new buildings and allowed rents to reset between tenants, so those exemptions alone did not prevent the supply loss.",
    "The disagreement is whether other stabilization designs can avoid that harm, how to weigh current tenants' stability against newcomers' rents and search costs, and whether caps buy time for more housing or delay the reforms that would build it.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Supply Effects
    // =========================================================================
    {
      id: "supply-effects",
      title: "Supply Effects",
      short_summary:
        "Economists have long argued that rent control reduces new construction by lowering expected returns for developers. The landmark Stanford/San Francisco natural experiment by Diamond, McQuade, and Qian (2019) found that rent control caused landlords to remove 15% of controlled units from the rental market through condo conversion, demolition, or owner move-in. However, critics argue that supply effects depend heavily on policy design, and that second-generation rent stabilization with vacancy decontrol preserves construction incentives while protecting tenants from displacement.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Protecting existing tenants from large rent increases can prevent displacement while more housing is built. The San Francisco study itself found lower displacement and mobility. Its supply losses show that new-building exemptions and vacancy resets alone are insufficient, rather than establishing that every stabilization design must have the same effect. A stronger stabilization policy would combine moderate caps, maintenance allowances and protections against rental withdrawals with more construction. That combination needs to be evaluated on both net rental supply and newcomer rents.",
      proponent_rebuttal:
        "The San Francisco study found that covered landlords reduced rental supply by 15% despite new-building exemptions and rents resetting between tenants. Protecting returns on future construction did not stop owners from converting or redeveloping existing rentals. The authors estimate that the contraction raised citywide market rents by about 5.1%; newcomers do not receive the protected tenants' rent savings. The case against broad caps is that protecting today's tenants can make entry harder for tomorrow's, so a policy needs to account for both groups rather than only the controlled lease.",
      crux: {
        id: "construction-response-test",
        title: "The Rental Supply Response Test",
        question:
          "Can rent stabilization preserve both new construction and existing rental supply?",
        description:
          "Measure both new housing starts and withdrawals of existing rental units under rent stabilization. Stable construction alone does not establish stable rental supply: conversions to owner occupancy can remove rentals even when new buildings are exempt.",
        methodology:
          "Compare permits, completed rentals, conversions to owner occupancy, demolitions, and net rental stock against matched jurisdictions using a difference-in-differences design. Control for zoning, financing costs, population growth, and construction costs. Track the actual policy periods in Oregon and California from 2019 and in St. Paul separately before and after its amendments effective in 2023 and 2025; do not treat its original 2021 ordinance as a new-construction-exempt policy.",
        equation:
          "\\Delta_{rental_stock} = \\beta_0 + \\beta_1 \\cdot RentControl_i + \\beta_2 \\cdot X_i + \\varepsilon_i",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Matched-market estimates of new rental completions and losses of existing rentals to conversion, demolition or withdrawal, showing the net rental-stock effect. Separate each policy version and its exemption rules, including St. Paul before and after its 2023 and 2025 changes.",
        },
        cost_to_verify:
          "Requires comparable construction and rental-withdrawal data; no study budget is established.",
        falsification: {
          supporter_flip:
            "If matched-market studies find no meaningful loss in either rental completions or the existing rental stock under a specified stabilization design, the supply-harm objection weakens for that design.",
          skeptic_flip:
            "If comparable markets show fewer rental completions or more withdrawals of existing rentals even with new-building exemptions, those exemptions alone do not answer the supply critique.",
          common_ground:
            "The San Francisco study found a loss of rental supply from covered older buildings despite new-building exemptions and vacancy decontrol; it also found protection against displacement for incumbent tenants.",
          live_disagreement:
            "Which cap levels, exemptions and limits on rental withdrawal can protect incumbent tenants without reducing the rental supply available to newcomers.",
        },
      },
      evidence: [
        {
          id: "stanford-sf-study",
          title:
            "Stanford Study: San Francisco Rent Control Reduced Rental Supply by 15%",
          description:
            "Diamond, McQuade, and Qian (2019), published in the American Economic Review (vol. 109, no. 9), exploited a 1994 San Francisco law change that extended rent control to small multifamily buildings (four or fewer units) built before 1980. Using a difference-in-differences design comparing buildings just above and below the threshold, they found that landlords treated by rent control reduced rental housing supply by 15%; by selling to owner-occupants and redeveloping buildings. The abstract concludes that the lost rental supply 'likely drove up market rents in the long run, ultimately undermining the goals of the law'; the paper estimates a roughly 5.1% citywide market-rent increase.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source:
            "Diamond, McQuade & Qian, American Economic Review, 109(9): 3365-94 (2019)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/aer.20181289",
          reasoning:
            "Published in the American Economic Review, the top economics journal, using a rigorous natural experiment design. The 15% supply reduction is stated directly in the abstract (verified); the 5.1% citywide rent figure appears in the paper body and is widely cited. The study examined stabilization with new-construction exemptions and vacancy decontrol, not a strict ceiling on all rents. It directly tests withdrawals from existing rental stock; extrapolation to different cap levels and conversion rules still needs evidence.",
        },
        {
          id: "cambridge-decontrol-study",
          title:
            "Cambridge Decontrol Raised Property Values via Spillovers, Not Mainly New Construction (Autor, Palmer & Pathak 2014)",
          description:
            "Autor, Palmer, and Pathak studied the unanticipated 1995 elimination of rent control in Cambridge, Massachusetts. They found that decontrol generated large, positive house-price spillovers, accounting for about a quarter of Cambridge's roughly $7.8 billion in residential property appreciation between 1994 and 2004; with more than half of the induced appreciation accruing to never-controlled properties. The authors note that residential investment can explain only a small fraction of these value gains, implying that the appreciation reflected neighborhood-amenity spillovers rather than a surge in new construction. This complicates the simple 'remove rent control and supply will follow' narrative.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Autor, Palmer & Pathak, Journal of Political Economy, 122(3): 661-717 (2014)",
          sourceUrl: "https://doi.org/10.1086/675536",
          reasoning:
            "Published in the Journal of Political Economy by leading researchers (verified: 2014, vol. 122 no. 3, DOI 10.1086/675536; an earlier draft mislabeled this as a 2023 paper with an incorrect DOI). The paper's central result is about price spillovers, not a direct test of new-construction response, so directness for the supply argument is lower than previously stated and weights are de-inflated accordingly.",
        },
        {
          id: "new-construction-exemptions",
          title: "Oregon's Rent Cap Exempts Newer Construction",
          description:
            "Oregon's statewide rent-stabilization law, SB 608 (2019), exempts residential buildings for their first 15 years. That design removes direct rent caps from newly completed units and therefore narrows the classic supply-deterrence mechanism. It does not prove that construction was unaffected: post-2019 permit trends also reflect the pandemic, financing costs, and local land-use rules.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source:
            "Oregon Legislative Information System, SB 608 (2019) enrolled text",
          sourceUrl:
            "https://olis.oregonlegislature.gov/liz/2019R1/Measures/Overview/SB608",
          reasoning:
            "The exemption is directly verifiable in the enrolled statute. Its incentive implication is an economic inference rather than a measured construction effect, so directness and replicability remain moderate.",
        },
        {
          id: "economist-consensus-survey",
          title:
            "2012 Economist Panel: Most Rejected a Broad Affordability Claim",
          description:
            "Asked whether local rent-increase limits in cities including New York and San Francisco had improved the amount and quality of broadly affordable rental housing over the prior three decades, 33 of 41 listed panelists disagreed or strongly disagreed. One agreed, three were uncertain, one gave no opinion and three did not answer. The question did not isolate a particular cap level, exemption or conversion rule.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source:
            "University of Chicago Booth IGM / Kent Clark Center Forum (Feb. 2012)",
          sourceUrl: "https://kentclarkcenter.org/surveys/rent-control/",
          reasoning:
            "The published response table lists 13 strongly disagreeing and 20 disagreeing panelists. This is a panel of expert opinions on a broad affordability question, not a representative survey of all economists or a causal estimate for a particular policy design.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Incumbent Protection vs New Renter Harm
    // =========================================================================
    {
      id: "incumbent-vs-newcomer",
      title: "Current tenants and new renters",
      short_summary:
        "Keeping families in their neighborhoods protects relationships and routines. But a policy that helps tenants with a controlled lease can also make entry harder for people looking for a home. The equity question is how to weigh those two groups' costs and benefits.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Preventing displacement has value beyond the rent payment itself. The San Francisco study found lower displacement and about 20% less renter mobility; remaining near family, work and school can matter even when moving would improve the allocation of apartments. The case for stabilization gives substantial weight to that continuity. It must still account for newcomers' access, and vacancy resets do not remove an incumbent tenant's incentive to keep a below-market lease.",
      proponent_rebuttal:
        "A protected lease is valuable to its current tenant, but an arriving renter cannot claim that benefit. Below-market tenants may keep an apartment even when another home would fit their needs better, reducing turnover as well as displacement. Stockholm's published queue statistics document difficult access, although they do not establish how much rent regulation caused it. The case against broad caps gives equal weight to people still searching for housing and asks whether portable, targeted assistance could protect vulnerable households without tying the benefit to an existing lease.",
      crux: {
        id: "displacement-net-welfare",
        title: "Neighborhood stability and access for new renters",
        question:
          "Is keeping current tenants in their neighborhoods worth higher rents and longer searches for newcomers?",
        description:
          "Determine whether the welfare gains from preventing displacement of incumbent tenants exceed the welfare losses imposed on newcomers who face higher rents and reduced housing access. If displacement causes severe, measurable harm (homelessness, health impacts, educational disruption) that outweighs the efficiency costs of reduced mobility, rent control is net welfare-positive. If the mobility costs and market distortions outweigh displacement prevention benefits, alternative anti-displacement tools would be preferable.",
        methodology:
          "Conduct a longitudinal study tracking both displaced and non-displaced tenants in gentrifying neighborhoods with and without rent stabilization. Measure outcomes including: housing cost burden, residential stability, employment access, children's school performance, physical and mental health, and social network disruption. Simultaneously measure costs borne by new market entrants: time to find housing, rent premium over controlled areas, commute distance, and housing quality. Calculate net social welfare using willingness-to-pay and quality-adjusted life year frameworks.",
        verification_status: "impossible" as const,
        settle: {
          condition:
            "Evidence can measure incumbent stability, health and schooling alongside newcomers' search costs and rent premiums. Choosing how to weigh these groups' gains and losses requires an explicit value judgment; no welfare study chooses those weights for the reader.",
          kind: "value-difference" as const,
        },
        cost_to_verify:
          "Measuring outcomes requires longitudinal data; a study budget cannot settle the choice of welfare weights.",
        falsification: {
          supporter_flip:
            "If longitudinal studies show incumbent benefits exceeding newcomer costs under explicitly agreed welfare weights, the case against stabilization weakens under those weights.",
          skeptic_flip:
            "If newcomer harms exceed incumbent benefits under explicitly agreed welfare weights, targeted anti-displacement tools look better than broad stabilization under those weights.",
          common_ground:
            "Both sides agree rent control transfers wealth to incumbent tenants and reduces their mobility; the SF study documents both the benefit and the lock-in.",
          live_disagreement:
            "Whether preventing incumbent displacement is worth the higher rents, longer searches, and unit misallocation borne by future renters.",
        },
      },
      evidence: [
        {
          id: "displacement-prevention",
          title:
            "Rent Control Lowered Displacement and Limited Renter Mobility by 20% in San Francisco",
          description:
            "The Diamond, McQuade & Qian (2019) study found that rent control limited renters' mobility by 20% and lowered the displacement of incumbent tenants from San Francisco; a result stated directly in the paper's abstract. The benefits were concentrated among more vulnerable incumbent tenants who were able to stay in place. The authors document a substantial wealth transfer from landlords to protected tenants, though that transfer must be weighed against the long-run market-rent increase caused by the same supply contraction.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "Diamond, McQuade & Qian, American Economic Review, 109(9): 3365-94 (2019)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/aer.20181289",
          reasoning:
            "Same rigorous study that documented supply reduction also documented displacement-prevention benefits, so it is 'against' the meta claim that rent control hurts renters. The 20% mobility reduction and the lower-displacement finding are verified in the abstract. An earlier draft cited a specific '15.4 percentage point' displacement effect and a '$2.9 billion' tenant benefit; those precise figures could not be confirmed from the source and have been replaced with the abstract's directly verifiable claims.",
        },
        {
          id: "stockholm-queue",
          title: "Stockholm Housing Queue Averaged Nine Years in 2025",
          description:
            "Stockholm's municipal Housing Agency reported that recipients of ordinary rental contracts in 2025 had spent an average of 9.0 years in its queue; 894,592 people were registered at year end. Waits varied sharply, with some homes going to applicants queued under two years and others requiring more than twenty. The statistics establish a severe access queue but do not isolate rent regulation from housing supply, location preferences, or the low cost of remaining registered.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 8,
            directness: 7,
          },
          source:
            "Bostadsförmedlingen i Stockholm, 2025 annual statistics",
          sourceUrl:
            "https://bostad.stockholm.se/nyhetsarkiv/2026/alla-tiders-formedlingsrekord/",
          reasoning:
            "The agency's administrative statistics directly establish queue length and registrations. Causal attribution is weaker because the source does not estimate how much of the wait is caused by rent regulation rather than supply and demand conditions.",
        },
        {
          id: "nyc-misallocation",
          title:
            "NYC Rent Stabilization: Significant Mismatch Between Unit Size and Household Size",
          description:
            "Using a framework that compares housing consumption across demographic groups in rent-controlled and market settings, Glaeser and Luttmer (2003) find statistically and economically significant evidence of misallocation in New York City. An apartment can stay with a household whose needs have changed because giving up the protected lease is costly.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "Glaeser & Luttmer, American Economic Review, 93(4): 1027-46 (2003)",
          sourceUrl:
            "https://www.aeaweb.org/articles?id=10.1257/000282803769206188",
          reasoning:
            "The published study compares apartment allocation across demographic groups in controlled and market settings. It supplies evidence of mismatches, rather than a complete welfare comparison that also accounts for displacement prevention.",
        },
        {
          id: "low-income-disproportionate-benefit",
          title: "NYC Rent Stabilization Serves More Black and Hispanic Households",
          description:
            "The official 2023 NYC Housing and Vacancy Survey reports that 23% of rent-stabilized households were headed by a Black New Yorker and 36% by a Hispanic New Yorker, compared with 17% and 24% of market-rental households. White and Asian household shares were higher in market rentals. These tenure demographics challenge the claim that stabilized units primarily serve affluent white insiders, though they do not measure who receives the largest dollar subsidy.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "2023 New York City Housing and Vacancy Survey, selected findings",
          sourceUrl:
            "https://www.nyc.gov/assets/hpd/downloads/pdfs/about/2023-nychvs-selected-initial-findings.pdf",
          reasoning:
            "The representative city survey directly reports the demographic comparison. Directness is capped because household composition is not the same as distribution of rent savings, wealth, or lifetime incidence.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Rent Caps as a Bridge to New Supply
    // =========================================================================
    {
      id: "alternative-approaches",
      title: "Rent Caps as a Bridge to New Supply",
      short_summary:
        "A rent cap adds no homes of its own. Whether building more makes housing affordable is a separate question with its own map; this pillar asks whether a cap protects tenants from displacement while new homes are planned and built, or eases the pressure for the zoning and construction reforms that would make it unnecessary. Supporters pair stabilization with supply reform; critics argue the cap's costs and politics crowd that reform out.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Supply-side solutions are correct in the long run, but new homes take years to plan, permit and build, and tenants facing displacement need protection in the meantime. The cited CBPP analysis finds that most low-income renters needing federal rental assistance receive none under existing funding. The case for a temporary cap is that it can protect those tenants while construction and targeted assistance expand. That case depends on the new homes actually arriving, rather than the cap becoming a permanent substitute for them.",
      proponent_rebuttal:
        "A bridge only helps if the far bank gets built. A cap gives the tenants it covers relief now, which can ease the political pressure for the zoning and construction reforms that would help everyone else. The San Francisco study that found less displacement also found covered landlords cutting rental supply by 15%, which the authors estimate raised citywide market rents by about 5.1%: protecting incumbents also reduced the homes available to newcomers. Minneapolis passed citywide zoning reform in 2018 without a rent cap. Housing vouchers (Section 8) target subsidies to those who need them without capping the price of the whole market. Administration and enforcement also use resources that could support construction or tenant assistance.",
      crux: {
        id: "supply-timeline-test",
        title: "The Bridge-or-Delay Test",
        question:
          "Does a rent cap protect tenants until new homes arrive, or slow the reforms that would build them?",
        description:
          "If places that pair rent stabilization with zoning and permitting reform keep permitting and building at the pace of places that reform supply alone, while fewer low-income tenants are displaced in the meantime, the cap works as a bridge. If supply reform stalls, or permits and starts fall behind, where a cap is in force, the cap delays the reforms it was meant to bridge to.",
        methodology:
          "Compare jurisdictions that adopted supply-side reform alone, rent stabilization alone, and both together. Track whether further zoning or permitting reforms passed and were carried out after a cap was adopted, and displacement and eviction rates for low-income households in the meantime, for 5-10 years, against matched jurisdictions that adopted neither.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Counts of zoning and permitting reforms passed and carried out after a rent cap was adopted, and low-income displacement rates over the same years, set against matched places without a cap and tracked for 5-10 years.",
        },
        cost_to_verify:
          "Requires multi-market policy and displacement data over several years; no study budget is established.",
        falsification: {
          supporter_flip:
            "If places that paired a rent cap with supply reform permitted and built as fast as places that reformed supply alone, while displacing fewer low-income tenants, the cap would earn a role as a bridge.",
          skeptic_flip:
            "If supply reform stalled, or permits and starts fell behind matched places, wherever a cap was adopted, and displacement fell no faster there, the cap would look like a delay rather than a bridge.",
          common_ground:
            "Both sides agree a rent cap adds no homes of its own, and that new homes take years to plan and build while tenants face rent increases now.",
          live_disagreement:
            "Whether rent stabilization protects tenants from displacement while new supply is built, or eases the pressure for the supply reforms it is meant to bridge to and so delays them.",
        },
      },
      evidence: [
        {
          id: "minneapolis-upzoning",
          title: "Minneapolis 2040 Broadened Citywide Housing Options",
          description:
            "Minneapolis adopted its 2040 comprehensive plan in 2018 and put it into effect in 2020, using zoning changes to create more housing options in more parts of the city. The official record establishes a broad supply-side reform, but it does not by itself establish how much additional housing was caused by the plan or whether rents fell relative to a credible counterfactual.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source:
            "City of Minneapolis comprehensive-plan record",
          sourceUrl:
            "https://www.minneapolismn.gov/government/departments/cped/planning/comp-plan/",
          reasoning:
            "The city source directly establishes adoption, timing, and policy direction. The card no longer claims unverified rent or permit effects; those require independent outcome data and a causal design.",
        },
        {
          id: "housing-voucher-underfunding",
          title:
            "Most At-Risk Low-Income Renters Receive No Federal Rental Assistance",
          description:
            "CBPP's analysis of 2023 housing survey data and 2024 assistance records estimates that 76% of low-income renters needing federal rental assistance do not receive it. Need includes spending more than 30% of monthly income on housing or living in overcrowded or substandard housing. This covers federal rental assistance broadly, rather than vouchers alone.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Center on Budget and Policy Priorities, 'Three Out of Four Low-Income At-Risk Renters Do Not Receive Federal Rental Assistance'",
          sourceUrl:
            "https://www.cbpp.org/research/housing/three-out-of-four-low-income-at-risk-renters-do-not-receive-federal-rental-assistance",
          reasoning:
            "The analysis combines HUD, Census and other federal administrative data. Limited coverage challenges a proposal to replace caps using assistance at its current funding level; it does not establish that expanded assistance could not work.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Diamond, McQuade & Qian: Author manuscript, policy history in section 2 (2019)",
      url: "https://web.stanford.edu/~diamondr/DMQ.pdf",
    },
    {
      title: "Saint Paul: Rent Stabilization ordinance and amendment timeline",
      url: "https://www.stpaul.gov/departments/safety-inspections/rent-buy-sell-property/renting-property/rent-stabilization",
    },
    {
      title:
        "The Effects of Rent Control Expansion on Tenants, Landlords, and Inequality; Diamond, McQuade & Qian, American Economic Review (2019)",
      url: "https://www.aeaweb.org/articles?id=10.1257/aer.20181289",
    },
    {
      title:
        "Housing Market Spillovers: Evidence from the End of Rent Control in Cambridge, Massachusetts; Autor, Palmer & Pathak, Journal of Political Economy, 122(3) (2014)",
      url: "https://doi.org/10.1086/675536",
    },
    {
      title:
        "IGM Forum: Rent Control Survey; University of Chicago Booth School (2012)",
      url: "https://kentclarkcenter.org/surveys/rent-control/",
    },
  ],
  questions: [
    {
      id: "q1",
      title:
        "Does modern rent stabilization avoid the supply problems of older rent control?",
      content:
        "San Francisco's policy already exempted new construction and allowed rents to reset between tenants, yet the study found a loss of existing rental supply. The unresolved question is which combinations of caps, exemptions and withdrawal rules can protect incumbents while preserving both new construction and existing rentals.",
    },
    {
      id: "q2",
      title:
        "Is rent control a necessary bridge while long-term supply solutions are built?",
      content:
        "New homes take time to plan and build, while households facing displacement need help sooner. Does a cap reduce displacement during that interval alongside supply reform, or does it reduce rental supply and the urgency of reform? Comparisons need to track both housing completions and losses of existing rentals.",
    },
    {
      id: "q3",
      title:
        "How should benefits to current tenants be weighed against costs to future renters?",
      content:
        "NYC data shows rent-stabilized tenants are disproportionately low-income and minority households. But Stockholm's multi-year queue and the long tenure of NYC's rent-stabilized tenants suggest the system rewards those who already have units rather than those who most need affordable housing. Should rent subsidies be means-tested and portable (like vouchers) rather than tied to specific units?",
    },
  ],
} satisfies TopicInput;
