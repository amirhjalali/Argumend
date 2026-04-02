import type { Topic } from "@/lib/schemas/topic";

export const rentControlEffectivenessData = {
  id: "rent-control-effectiveness",
  title: "Does Rent Control Help or Hurt Renters?",
  meta_claim:
    "Rent control policies reduce housing affordability in the long run by discouraging new construction and reducing housing supply.",
  status: "contested" as const,
  category: "economics" as const,
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
        "Rent control is one of the few policies where economists across the political spectrum agree on the harm. When you cap what landlords can charge, you reduce the incentive to build new housing, maintain existing units, and keep properties on the rental market. The Stanford study of San Francisco's 1994 rent control expansion found that affected landlords reduced rental supply by 15% — converting apartments to condos, demolishing buildings, or simply withdrawing units. This contraction raised market rents by 5.1% citywide, meaning rent control literally made housing more expensive for everyone not lucky enough to already hold a controlled unit. New York City's decades-long experience shows the same pattern: rent-stabilized buildings receive less maintenance investment, vacancy rates in controlled units are artificially low (tenants never leave even when their needs change), and the city's chronic housing shortage is directly exacerbated by disincentives to build. The textbook prediction is clear — price ceilings below market rates create shortages.",
      proponent_rebuttal:
        "The supply-reduction narrative overstates the evidence and ignores critical policy design distinctions. The Stanford/San Francisco study examined a specific, pre-1994 form of strict rent control with no vacancy decontrol — a policy design that virtually no economist defends today. Modern rent stabilization policies (used in Oregon, California, and most European cities) allow rents to reset to market rate upon vacancy, preserving landlord incentives for new construction. A 2023 study by Autor, Palmer, and Pathak of Cambridge, Massachusetts found that while rent decontrol after 1995 increased property values for decontrolled units, it did not produce a measurable increase in new housing construction — undermining the core supply argument. In Germany, where rent stabilization has been the norm for decades, housing construction rates are comparable to or higher than unregulated US markets. The supply effects depend almost entirely on policy design: exemptions for new construction, vacancy decontrol provisions, and allowances for maintenance cost pass-throughs can preserve building incentives while protecting tenants from rent spikes of 30-50% that cause displacement and homelessness.",
      crux: {
        id: "construction-response-test",
        title: "The Construction Response Test",
        description:
          "Measure whether rent control policies with new-construction exemptions actually reduce housing starts compared to unregulated markets. If construction rates decline in rent-controlled jurisdictions even when new buildings are exempt, the supply argument holds. If construction is unaffected or responds primarily to zoning and land-use policy, the supply critique is overstated.",
        methodology:
          "Compare housing permit issuance and construction starts in jurisdictions that adopted rent stabilization (with new-construction exemptions) against matched control jurisdictions without rent regulation, using a difference-in-differences design. Control for confounding variables including zoning stringency, interest rates, land costs, population growth, and construction labor supply. Examine Oregon (statewide rent stabilization adopted 2019), California (AB 1482 adopted 2019), and St. Paul, Minnesota (rent control adopted 2021) as natural experiments.",
        equation:
          "\\Delta_{construction} = \\beta_0 + \\beta_1 \\cdot RentControl_i + \\beta_2 \\cdot X_i + \\varepsilon_i",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$200K-500K (Econometric analysis of housing permit and construction data across multiple jurisdictions)",
      },
      evidence: [
        {
          id: "stanford-sf-study",
          title:
            "Stanford Study: San Francisco Rent Control Reduced Rental Supply by 15%",
          description:
            "Diamond, McQuade, and Qian (2019) exploited the 1994 ballot initiative that extended San Francisco rent control to small multifamily buildings built before 1980. Using a difference-in-differences design comparing buildings just above and below the size threshold, they found that affected landlords reduced rental housing supply by 15% — primarily through condo conversions and building demolitions. The authors estimated that the resulting supply contraction raised market-rate rents by 5.1% citywide, partially offsetting the benefits to protected tenants.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "Diamond, McQuade & Qian, American Economic Review (2019)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/aer.20181289",
          reasoning:
            "Published in the American Economic Review, the top economics journal, using a rigorous natural experiment design. The finding directly demonstrates supply reduction from rent control. However, the study examined a strict, pre-1994 policy without vacancy decontrol or new-construction exemptions — limiting generalizability to modern rent stabilization designs.",
        },
        {
          id: "cambridge-decontrol-study",
          title:
            "Cambridge Decontrol Did Not Increase New Construction (Autor, Palmer & Pathak 2023)",
          description:
            "Autor, Palmer, and Pathak studied the 1995 elimination of rent control in Cambridge, Massachusetts. While decontrol increased property values of formerly controlled units by 25% and generated positive spillover effects on neighboring property values, the authors found no statistically significant increase in new housing construction following decontrol. This challenges the core supply argument — if removing rent control does not spur new building, then rent control may not be the primary constraint on supply.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Autor, Palmer & Pathak, Journal of Political Economy (2023)",
          sourceUrl: "https://doi.org/10.1086/722218",
          reasoning:
            "Published in a top-five economics journal by leading researchers. The finding that decontrol raised property values but not construction suggests that zoning, permitting, and land-use constraints — not rent control — are the binding supply constraint. Replicability is somewhat lower because Cambridge is a single dense urban market with unique characteristics.",
        },
        {
          id: "new-construction-exemptions",
          title:
            "Modern Rent Stabilization Exempts New Construction, Preserving Building Incentives",
          description:
            "Oregon's statewide rent stabilization (SB 608, 2019), California's Tenant Protection Act (AB 1482, 2019), and most European rent regulations explicitly exempt new construction for 15-30 years. Economic theory predicts that if new buildings are exempt from price caps, the incentive to build is unaffected. Early data from Oregon shows no decline in multifamily building permits in the two years following adoption, though the COVID-19 pandemic complicates causal inference.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "Oregon Bureau of Labor and Industries; California Department of Housing and Community Development",
          reasoning:
            "The policy design argument is logically sound — exempting new construction removes the theoretical mechanism through which rent control reduces supply. However, empirical evidence is still emerging for these newer policies, and the COVID-19 pandemic disrupted housing markets, making causal attribution difficult.",
        },
        {
          id: "economist-consensus-survey",
          title:
            "IGM Forum Survey: 81% of Economists Agree Rent Control Reduces Housing Quality and Quantity",
          description:
            "The University of Chicago IGM Forum surveyed leading economists in 2012 on whether rent ceilings reduce the quantity and quality of housing available. 81% agreed or strongly agreed, 2% disagreed, and 17% were uncertain. This represents one of the strongest consensus positions in economics, comparable to trade liberalization benefits. However, critics note the survey question referenced generic 'rent ceilings' rather than modern rent stabilization with vacancy decontrol and new-construction exemptions.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source: "University of Chicago IGM Forum (2012)",
          sourceUrl:
            "https://www.igmchicago.org/surveys/rent-control/",
          reasoning:
            "The IGM Forum polls top economists from leading universities and is a respected measure of expert opinion. The near-consensus is striking. However, directness is lower because the question addressed generic rent ceilings rather than specific modern policy designs, and several respondents noted in comments that the answer depends heavily on implementation details.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Incumbent Protection vs New Renter Harm
    // =========================================================================
    {
      id: "incumbent-vs-newcomer",
      title: "Incumbent Protection vs New Renter Harm",
      short_summary:
        "Rent control clearly benefits current tenants who hold controlled leases — reducing their housing cost burden and preventing displacement from gentrifying neighborhoods. But critics argue this comes at the expense of new renters, who face higher market-rate rents, longer housing searches, and reduced mobility. The distributional question — who benefits and who pays — is the central equity debate in rent control policy.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Rent control creates a two-tier housing market that protects insiders at the expense of outsiders. Current tenants in controlled units pay below-market rents and rationally never leave — even if their apartment no longer fits their needs (empty nesters in family-sized units, workers who commute long distances rather than give up a cheap lease). This misallocation reduces vacancy rates to near zero in controlled units, forcing newcomers — disproportionately young people, immigrants, and workers relocating for jobs — into an overheated uncontrolled market where rents are inflated by the artificial scarcity rent control creates. In Stockholm, the queue for a rent-controlled apartment averages 9-12 years. In New York, rent-stabilized tenants have median tenure of 13 years vs 4 years for market-rate. The policy effectively taxes housing mobility and transfers wealth from future renters to current ones — the opposite of progressive housing policy.",
      proponent_rebuttal:
        "The 'insider vs outsider' framing fundamentally mischaracterizes who benefits from rent stabilization and why. The primary beneficiaries are not affluent tenants gaming the system — they are low-income households, elderly residents on fixed incomes, and communities of color who would be displaced by gentrification without price protections. The Stanford/San Francisco study found that rent control reduced displacement of incumbent tenants by 15.4 percentage points, with the largest benefits accruing to minority households and the elderly. Displacement is not merely an inconvenience — it ruptures social networks, disrupts children's education, increases commute times, and is associated with increased homelessness. The 'misallocation' argument assumes that the only efficient housing market is one where the highest bidder always wins — but this framework ignores the social value of neighborhood stability, community institutions, and mixed-income neighborhoods. Stockholm's 9-year queue reflects insufficient supply (a zoning and construction problem), not a fundamental flaw of rent regulation. Modern policies with vacancy decontrol address the lock-in problem by allowing rents to reset when tenants voluntarily move.",
      crux: {
        id: "displacement-net-welfare",
        title: "The Displacement vs Mobility Net Welfare Test",
        description:
          "Determine whether the welfare gains from preventing displacement of incumbent tenants exceed the welfare losses imposed on newcomers who face higher rents and reduced housing access. If displacement causes severe, measurable harm (homelessness, health impacts, educational disruption) that outweighs the efficiency costs of reduced mobility, rent control is net welfare-positive. If the mobility costs and market distortions outweigh displacement prevention benefits, alternative anti-displacement tools would be preferable.",
        methodology:
          "Conduct a longitudinal study tracking both displaced and non-displaced tenants in gentrifying neighborhoods with and without rent stabilization. Measure outcomes including: housing cost burden, residential stability, employment access, children's school performance, physical and mental health, and social network disruption. Simultaneously measure costs borne by new market entrants: time to find housing, rent premium over controlled areas, commute distance, and housing quality. Calculate net social welfare using willingness-to-pay and quality-adjusted life year frameworks.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$1-3M (Multi-year longitudinal study across multiple housing markets)",
      },
      evidence: [
        {
          id: "displacement-prevention",
          title:
            "Rent Control Reduced Tenant Displacement by 15.4 Percentage Points in San Francisco",
          description:
            "The Diamond et al. (2019) study found that tenants in rent-controlled buildings were 15.4 percentage points more likely to remain at their address over the study period compared to tenants in uncontrolled buildings. The effect was largest for elderly tenants and minority households — groups most vulnerable to displacement and with the fewest alternative housing options. The authors calculated that incumbent tenants received a cumulative benefit of $2.9 billion in reduced rent payments over the study period.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "Diamond, McQuade & Qian, American Economic Review (2019)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/aer.20181289",
          reasoning:
            "Same rigorous study that documented supply reduction also documented significant displacement prevention benefits. This is 'against' the meta claim that rent control hurts renters, because it shows clear measurable benefits for incumbent tenants. The $2.9 billion benefit to tenants is a direct welfare gain, though it must be weighed against the supply reduction costs documented in the same study.",
        },
        {
          id: "stockholm-queue",
          title:
            "Stockholm Rent Control Creates 9-12 Year Queue for Housing",
          description:
            "Stockholm's comprehensive rent regulation system has created a housing queue that averaged 9 years as of 2020, with waits of 15-20 years for desirable central locations. The queue system, managed by the Stockholm Housing Agency, had over 700,000 registered applicants for a city of 975,000 residents. A thriving black market for rental contracts emerged, with controlled apartments illegally sublet at 2-3x the regulated rent. Young Swedes are effectively locked out of the housing market, with the average age of first independent rental at 27.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Swedish National Board of Housing; Bostadsformedlingen (Stockholm Housing Agency)",
          reasoning:
            "The Stockholm queue is the most extreme documented case of rent control creating housing access barriers for newcomers. The data from the Housing Agency is authoritative. However, Stockholm represents an unusually strict system without vacancy decontrol, combined with restrictive zoning — making it a worst-case rather than representative example of rent regulation outcomes.",
        },
        {
          id: "nyc-misallocation",
          title:
            "NYC Rent Stabilization: Significant Mismatch Between Unit Size and Household Size",
          description:
            "A 2018 New York City Housing and Vacancy Survey found that rent-stabilized tenants had a median tenure of 13 years compared to 4 years for market-rate tenants. Studies by Glaeser and Luttmer (2003) documented significant misallocation: rent-controlled households were more likely to occupy units that did not match their household size — elderly singles in large family apartments, and families in studios. The below-market rents created strong incentives to hold units regardless of fit, reducing turnover and preventing more efficient matching of units to household needs.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "NYC Housing and Vacancy Survey (2018); Glaeser & Luttmer, Journal of Political Economy (2003)",
          reasoning:
            "The NYC Housing and Vacancy Survey is the official data source mandated by city law. Glaeser and Luttmer's study is methodologically sound and published in a top journal. The misallocation finding is well-documented but must be weighed against the displacement prevention benefits — elderly tenants in 'too large' apartments may have no affordable alternative if forced to move.",
        },
        {
          id: "low-income-disproportionate-benefit",
          title:
            "Rent Stabilization Disproportionately Benefits Low-Income and Minority Households",
          description:
            "Analysis of the 2021 NYC Housing and Vacancy Survey shows that 61% of rent-stabilized tenants have household incomes below $50,000, compared to 39% of market-rate tenants. Rent-stabilized tenants are disproportionately Black and Hispanic (58% vs 35% of market-rate tenants). The median rent burden for stabilized tenants is 33% of income vs 41% for market-rate low-income tenants. Without stabilization, the NYC Comptroller estimated that 300,000+ households would face rent increases exceeding 30%, with low-income communities of color bearing the heaviest displacement burden.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source:
            "NYC Housing and Vacancy Survey (2021); NYC Comptroller's Office",
          reasoning:
            "The Housing and Vacancy Survey is the official, legally mandated data source for NYC housing policy. The demographic data directly challenges the narrative that rent control primarily benefits affluent insiders. However, the data does not distinguish between tenants who genuinely need the subsidy and those who could afford market rates — a persistent critique of universal rather than means-tested rent regulation.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Alternative Approaches
    // =========================================================================
    {
      id: "alternative-approaches",
      title: "Alternative Approaches",
      short_summary:
        "If rent control is a flawed tool, what works better? Economists broadly favor supply-side interventions — upzoning, streamlined permitting, social housing construction — over price controls. But housing advocates argue these approaches take decades to produce results, while tenants face displacement now. The question is whether rent stabilization is an essential short-term bridge or a counterproductive distraction from structural reform.",
      icon_name: "Target" as const,
      skeptic_premise:
        "The evidence overwhelmingly favors supply-side solutions over price controls. Minneapolis eliminated single-family zoning in 2018, and by 2023, rents had stabilized while surrounding cities saw increases. Tokyo's permissive zoning regime produces 140,000+ new housing units per year, keeping rents affordable in one of the world's most desirable cities despite population growth. Vienna's social housing model — where 60% of residents live in publicly built or subsidized housing — achieves affordability through supply rather than price controls. Housing vouchers (Section 8) target subsidies to those who need them without distorting the entire market. Every dollar spent defending and administering rent control is a dollar not spent on zoning reform, public housing construction, or tenant assistance programs that address the root cause: insufficient supply.",
      proponent_rebuttal:
        "Supply-side solutions are correct in the long run but irrelevant to tenants facing eviction today. Upzoning Minneapolis has produced modest results after five years — rents stabilized but did not decline, and the new construction is primarily luxury apartments that do not serve low-income tenants. Building enough social housing to match Vienna's model would require decades of political will and hundreds of billions in public investment that no American jurisdiction has committed to. Housing vouchers are so underfunded that only 1 in 4 eligible households receives assistance, with average wait times of 2.5 years. Meanwhile, market-rate rents in cities like Austin, Phoenix, and Miami increased 30-50% between 2019 and 2023, displacing hundreds of thousands of low-income families. Rent stabilization is not a substitute for supply expansion — it is a necessary complement that prevents displacement while long-term supply solutions are built. The choice is not rent control OR supply expansion; it is rent control AND supply expansion, deployed simultaneously.",
      crux: {
        id: "supply-timeline-test",
        title: "The Supply Response Timeline Test",
        description:
          "Determine how long supply-side interventions (upzoning, streamlined permitting, social housing) take to produce measurable rent relief for low-income tenants. If supply responses are fast enough to prevent displacement (2-3 years), rent stabilization is unnecessary. If supply takes 10-20 years to meaningfully affect affordability, rent stabilization serves as a necessary bridge policy.",
        methodology:
          "Conduct a comparative analysis of jurisdictions that adopted major supply-side reforms (Minneapolis upzoning 2018, Auckland NZ upzoning 2016, various California SB 9/SB 10 reforms 2021) and measure time to first measurable impact on: (1) median rents for bottom-quartile units, (2) vacancy rates, (3) displacement rates for low-income households. Compare against jurisdictions that adopted rent stabilization alone and those that adopted combined supply + stabilization approaches.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$300K-800K (Multi-market comparative analysis of housing policy outcomes over 5-10 year timeframe)",
      },
      evidence: [
        {
          id: "minneapolis-upzoning",
          title:
            "Minneapolis Eliminated Single-Family Zoning; Rents Stabilized While Neighbors Rose",
          description:
            "In 2018, Minneapolis passed the Minneapolis 2040 plan, eliminating single-family-only zoning citywide and allowing duplexes and triplexes on all residential lots. By 2023, the city had seen a 12% increase in housing permits for small multifamily buildings. Zillow data showed Minneapolis median rents were roughly flat from 2019-2023 while comparable Midwestern cities (Milwaukee, Kansas City, Indianapolis) saw 15-25% increases. However, critics note that most new construction was market-rate, that the affordable housing impact was modest, and that Minneapolis also adopted a rent stabilization ballot measure in St. Paul (later modified) suggesting that supply alone was seen as insufficient.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "Minneapolis Community Planning and Economic Development; Zillow Rent Index; Brookings Institution",
          reasoning:
            "The Minneapolis experience is the most-cited US example of supply-side reform producing affordability results. The data is publicly available and the natural experiment design is compelling. However, the concurrent pandemic makes causal attribution difficult, the effects on bottom-quartile rents are less clear than on medians, and the fact that neighboring St. Paul adopted rent control suggests political recognition that supply alone was insufficient.",
        },
        {
          id: "vienna-social-housing",
          title:
            "Vienna's Social Housing Model: 60% of Residents in Public or Subsidized Housing",
          description:
            "Vienna has maintained one of Europe's most affordable housing markets through a social housing model where the city directly builds and manages housing. Approximately 60% of Vienna's residents live in Gemeindebau (public housing) or subsidized cooperative housing. Average rents in Vienna are 50-60% lower than comparable European capitals (London, Paris, Amsterdam). The city continuously builds 5,000-7,000 new social housing units per year, funded through a dedicated housing tax. The model has operated for over 100 years, creating a housing stock that acts as a permanent anchor on private market rents.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 7,
          },
          source:
            "City of Vienna Housing Department; European Federation for Living (EFL)",
          reasoning:
            "Vienna's model is the gold standard for supply-side affordability. The data on rents and housing quality is well-documented. However, replicability is low because the model required a century of continuous political commitment, massive public investment, and a legal framework that no US jurisdiction has. Proponents of rent control argue that Vienna demonstrates that alternatives take generations to build, making interim price protections necessary.",
        },
        {
          id: "housing-voucher-underfunding",
          title:
            "Only 1 in 4 Eligible US Households Receives Housing Voucher Assistance",
          description:
            "The US Housing Choice Voucher program (Section 8) serves approximately 2.3 million households, but the Center on Budget and Policy Priorities estimates that only 1 in 4 eligible households receives assistance due to chronic federal underfunding. Average wait times for vouchers are 2.5 years, with some jurisdictions reporting waits of 5-10 years. Many waiting lists are closed entirely. A 2019 Harvard Joint Center for Housing Studies report found that 10.6 million extremely low-income renter households had severe cost burdens (paying over 50% of income on rent), and expanding vouchers to cover all eligible households would cost an additional $22 billion per year.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Center on Budget and Policy Priorities; Harvard Joint Center for Housing Studies (2019)",
          sourceUrl:
            "https://www.cbpp.org/research/housing/three-out-of-four-low-income-at-risk-renters-do-not-receive-federal-rental-assistance",
          reasoning:
            "CBPP and Harvard JCHS are among the most authoritative housing policy research organizations. The voucher underfunding data is well-documented and not disputed. This evidence directly challenges the argument that vouchers are a viable alternative to rent control — if the preferred alternative is chronically underfunded, arguing against rent control as a second-best policy is less persuasive.",
        },
        {
          id: "auckland-upzoning-results",
          title:
            "Auckland Upzoning Reduced Rents 26-33% in Affected Areas (Greenaway-McGrevy & Phillips 2023)",
          description:
            "Greenaway-McGrevy and Phillips (2023) studied the effects of Auckland, New Zealand's 2016 upzoning reform, which allowed higher-density development across 75% of the city's residential land. Using a synthetic control method, they estimated that upzoning increased housing construction by 25-30% and reduced rents by 26-33% relative to the counterfactual in areas where development actually occurred. The effect took 3-5 years to materialize and was concentrated in areas where new construction was physically feasible and economically viable.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Greenaway-McGrevy & Phillips, working paper (2023); New Zealand Productivity Commission",
          reasoning:
            "The synthetic control method is rigorous and the Auckland reform is one of the most comprehensive upzoning experiments globally. The 26-33% rent reduction in affected areas is large and directly relevant. However, the effect took 3-5 years to materialize and was geographically concentrated — suggesting that supply expansion works but not quickly or universally enough to protect all vulnerable tenants in the interim.",
        },
      ],
    },
  ],
  references: [
    {
      title:
        "The Effects of Rent Control Expansion on Tenants, Landlords, and Inequality — Diamond, McQuade & Qian, American Economic Review (2019)",
      url: "https://www.aeaweb.org/articles?id=10.1257/aer.20181289",
    },
    {
      title:
        "Housing Market Spillovers: Evidence from the End of Rent Control in Cambridge, Massachusetts — Autor, Palmer & Pathak, Journal of Political Economy (2023)",
      url: "https://doi.org/10.1086/722218",
    },
    {
      title:
        "IGM Forum: Rent Control Survey — University of Chicago Booth School (2012)",
      url: "https://www.igmchicago.org/surveys/rent-control/",
    },
  ],
  questions: [
    {
      id: "q1",
      title:
        "Does modern rent stabilization avoid the supply problems of older rent control?",
      content:
        "Classical rent control — strict price ceilings with no vacancy decontrol — is widely agreed to reduce housing supply. But modern rent stabilization policies (Oregon, California, most of Europe) exempt new construction and allow rents to reset at vacancy. Do these design features actually preserve building incentives, or do they still suppress supply through regulatory uncertainty and political risk for developers?",
    },
    {
      id: "q2",
      title:
        "Is rent control a necessary bridge while long-term supply solutions are built?",
      content:
        "Supply-side solutions like upzoning and social housing take years or decades to produce meaningful rent relief. Meanwhile, market-rate rents in many US cities rose 30-50% between 2019 and 2023, displacing low-income families. Is rent stabilization a necessary short-term protection against displacement, or does it delay the political urgency needed to pass supply-side reforms?",
    },
    {
      id: "q3",
      title:
        "Who actually benefits from rent control — the vulnerable or the lucky?",
      content:
        "NYC data shows rent-stabilized tenants are disproportionately low-income and minority households. But Stockholm's 9-year queue and NYC's 13-year average tenure suggest the system rewards those who already have units rather than those who most need affordable housing. Should rent subsidies be means-tested and portable (like vouchers) rather than tied to specific units?",
    },
  ],
} satisfies Omit<Topic, "confidence_score"> & {
  confidence_score?: number;
};
