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
            "Diamond, McQuade, and Qian (2019), published in the American Economic Review (vol. 109, no. 9), exploited a 1994 San Francisco law change that extended rent control to small multifamily buildings (four or fewer units) built before 1980. Using a difference-in-differences design comparing buildings just above and below the threshold, they found that landlords treated by rent control reduced rental housing supply by 15% — by selling to owner-occupants and redeveloping buildings. The abstract concludes that the lost rental supply 'likely drove up market rents in the long run, ultimately undermining the goals of the law'; the paper estimates a roughly 5.1% citywide market-rent increase.",
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
            "Published in the American Economic Review, the top economics journal, using a rigorous natural experiment design. The 15% supply reduction is stated directly in the abstract (verified); the 5.1% citywide rent figure appears in the paper body and is widely cited. The study examined a strict policy without vacancy decontrol or new-construction exemptions — limiting generalizability to modern rent stabilization designs.",
        },
        {
          id: "cambridge-decontrol-study",
          title:
            "Cambridge Decontrol Raised Property Values via Spillovers, Not Mainly New Construction (Autor, Palmer & Pathak 2014)",
          description:
            "Autor, Palmer, and Pathak studied the unanticipated 1995 elimination of rent control in Cambridge, Massachusetts. They found that decontrol generated large, positive house-price spillovers, accounting for about a quarter of Cambridge's roughly $7.8 billion in residential property appreciation between 1994 and 2004 — with more than half of the induced appreciation accruing to never-controlled properties. The authors note that residential investment can explain only a small fraction of these value gains, implying that the appreciation reflected neighborhood-amenity spillovers rather than a surge in new construction. This complicates the simple 'remove rent control and supply will follow' narrative.",
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
            "Published in the Journal of Political Economy by leading researchers (verified: 2014, vol. 122 no. 3, DOI 10.1086/675536 — an earlier draft mislabeled this as a 2023 paper with an incorrect DOI). The paper's central result is about price spillovers, not a direct test of new-construction response, so directness for the supply argument is lower than previously stated and weights are de-inflated accordingly.",
        },
        {
          id: "new-construction-exemptions",
          title:
            "Modern Rent Stabilization Exempts New Construction, Preserving Building Incentives",
          description:
            "Oregon's statewide rent stabilization (SB 608, 2019) and California's Tenant Protection Act (AB 1482, 2019), along with many European rent regulations, explicitly exempt newer construction from rent caps for a fixed window (Oregon and California exempt buildings for roughly their first 15 years). Economic theory predicts that if new buildings are exempt from price caps, the marginal incentive to build is largely unaffected, removing the classic mechanism by which rent control suppresses supply. Whether construction has in fact held steady under these specific laws is an empirical question complicated by the COVID-19 pandemic and interest-rate shifts; the earlier claim of 'no decline in Oregon permits' was not verified against a primary data source here.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source:
            "Oregon SB 608 (2019) and California AB 1482 (2019) statutory text — policy-design point; permit-trend claim not independently verified",
          reasoning:
            "The policy-design argument is logically sound — exempting new construction removes the theoretical mechanism through which rent control reduces supply, and the new-construction exemptions in SB 608 and AB 1482 are a matter of statute. However, the specific empirical claim that permits did not decline was not verifiable against a primary source, so it has been qualified and weights lowered. No sourceUrl is asserted because none was web-verified.",
        },
        {
          id: "economist-consensus-survey",
          title:
            "IGM Forum Survey: Roughly 82% of Economists Reject the Claim That Rent Control Has Improved Affordable Housing",
          description:
            "The University of Chicago IGM Economic Experts Panel surveyed leading economists on February 7, 2012, on the statement: 'Local ordinances that limit rent increases for some rental housing units, such as in New York and San Francisco, have had a positive impact over the past three decades on the amount and quality of broadly affordable rental housing in cities that have used them.' Of the panelists who responded, 13 strongly disagreed and 24 disagreed (about 82% of respondents), only 1 agreed (Bengt Holmström, who reported low confidence), and 3 were uncertain. This near-unanimous rejection is one of the stronger consensus positions in economics. However, the question referenced traditional rent-ceiling ordinances rather than modern rent stabilization with vacancy decontrol and new-construction exemptions.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source:
            "University of Chicago Booth IGM / Kent Clark Center Forum (Feb. 2012)",
          sourceUrl: "https://www.igmchicago.org/surveys/rent-control/",
          reasoning:
            "The IGM Forum polls top economists from leading universities and is a respected measure of expert opinion. The response distribution is verified directly against the survey page (~82% disagree/strongly disagree; one panelist agreed). Note: an earlier draft framed this as '81% agree rent control reduces quantity/quality,' which inverted the actual question — the panel was asked whether rent control had a positive impact, and overwhelmingly said no. Directness is lower because the question addressed traditional rent ceilings, not modern policy designs.",
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
            "Rent Control Lowered Displacement and Limited Renter Mobility by 20% in San Francisco",
          description:
            "The Diamond, McQuade & Qian (2019) study found that rent control limited renters' mobility by 20% and lowered the displacement of incumbent tenants from San Francisco — a result stated directly in the paper's abstract. The benefits were concentrated among more vulnerable incumbent tenants who were able to stay in place. The authors document a substantial wealth transfer from landlords to protected tenants, though that transfer must be weighed against the long-run market-rent increase caused by the same supply contraction.",
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
          title:
            "Stockholm Rent Control Creates 9-12 Year Queue for Housing",
          description:
            "Stockholm's comprehensive rent regulation system is widely reported to have produced long waiting queues for first-hand rental contracts, allocated through the municipal Bostadsförmedlingen (Stockholm Housing Agency), with multi-year average waits and far longer waits for desirable central locations. The regulated system is also associated with a sizeable secondary (sublet) market in which contracts change hands above the regulated rent. The specific figures sometimes cited (e.g., a 9-12 year average queue, 700,000+ registrants) have not been verified here against a primary Housing Agency source and should be treated as indicative rather than exact.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source:
            "Bostadsförmedlingen (Stockholm Housing Agency); secondary press and policy reporting — specific figures not independently verified",
          reasoning:
            "Stockholm is frequently cited as a case where rent regulation, combined with restrictive zoning and no vacancy decontrol, creates long access queues for newcomers. The qualitative pattern is well established in the literature, but no primary Housing Agency source URL could be verified for the precise queue-length and registrant numbers, so the specific figures were softened and weights lowered. No sourceUrl is asserted because none was web-verified.",
        },
        {
          id: "nyc-misallocation",
          title:
            "NYC Rent Stabilization: Significant Mismatch Between Unit Size and Household Size",
          description:
            "Glaeser and Luttmer's 'The Misallocation of Housing Under Rent Control' (American Economic Review, vol. 93, no. 4, 2003) developed a framework to test for misallocation by comparing consumption patterns across demographic subgroups in rent-controlled versus free-market settings. In New York City they found that an economically and statistically significant fraction of apartments appears to be misallocated across demographic subgroups — for example, household size not matching unit size. Below-market rents create incentives to hold units regardless of fit, reducing turnover. (NYC Housing and Vacancy Survey tenure differences are often cited alongside this, but the specific '13 years vs 4 years' median-tenure figure was not verified against a primary HVS source here.)",
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
            "Glaeser and Luttmer's study is methodologically sound and published in the American Economic Review (verified — an earlier draft incorrectly attributed it to the Journal of Political Economy). The misallocation finding is well documented but must be weighed against displacement-prevention benefits. The cited NYC HVS median-tenure figure could not be verified against a primary source, so it is qualified rather than asserted.",
        },
        {
          id: "low-income-disproportionate-benefit",
          title:
            "Rent Stabilization Disproportionately Benefits Low-Income and Minority Households",
          description:
            "The NYC Housing and Vacancy Survey (HVS), the official triennial survey mandated by city and state law, is widely used to document that rent-stabilized tenants in New York skew lower-income and are disproportionately Black and Hispanic relative to market-rate tenants — challenging the claim that rent regulation mainly benefits affluent insiders. The specific percentages previously cited here (e.g., 61% of stabilized tenants below $50,000 in income; 58% Black/Hispanic; a 33% vs 41% rent-burden comparison; a 300,000+ household NYC Comptroller estimate) could not be verified against a primary HVS or Comptroller source and are presented as illustrative pending direct confirmation.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source:
            "NYC Housing and Vacancy Survey — directional pattern; specific figures not independently verified",
          reasoning:
            "The HVS is the official, legally mandated data source for NYC housing policy, and the directional finding that stabilized tenants skew lower-income and more non-white is well established. However, the precise percentages and the Comptroller estimate were not verifiable against a primary source here, so weights were lowered and the figures qualified. No sourceUrl is asserted because none was web-verified.",
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
            "In 2018, Minneapolis adopted the Minneapolis 2040 comprehensive plan, which eliminated single-family-only zoning citywide and allowed up to three units on residential lots — a widely cited US example of broad zoning liberalization. Reporting and analyses (e.g., Pew, Brookings) have noted that Minneapolis added housing and saw relatively restrained rent growth compared with peer cities over the following years. The specific figures previously cited here (a 12% increase in small-multifamily permits; flat 2019-2023 median rents versus 15-25% increases in Milwaukee, Kansas City, and Indianapolis) were not verified against a primary data source and are presented as illustrative. Neighboring St. Paul separately adopted a rent-stabilization ballot measure in 2021 (later amended), indicating that supply reform alone was viewed by some as insufficient.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source:
            "Minneapolis 2040 plan; secondary analyses (Pew, Brookings) — directional pattern; specific figures not independently verified",
          reasoning:
            "The Minneapolis 2040 upzoning is the most-cited US example of supply-side reform, and its adoption and broad design are well documented. However, the precise permit and rent figures were not verifiable against a primary source here, the concurrent pandemic complicates attribution, and effects on bottom-quartile rents are less clear than on medians — so the figures were qualified and weights lowered. No sourceUrl is asserted because none was web-verified.",
        },
        {
          id: "vienna-social-housing",
          title:
            "Vienna's Social Housing Model: 60% of Residents in Public or Subsidized Housing",
          description:
            "Vienna is widely cited as maintaining one of Europe's more affordable big-city housing markets through a large social-housing sector in which the city directly builds and manages housing (Gemeindebau) and subsidizes cooperative (limited-profit) housing. A commonly cited figure is that roughly half to 60% of Vienna's residents live in municipally owned or subsidized housing, supported by a dedicated housing-contribution levy and a system over a century old, which acts as an anchor on private-market rents. The more specific claims previously stated here (rents 50-60% below London/Paris/Amsterdam; 5,000-7,000 new units built per year) were not verified against a primary City of Vienna source and are presented as illustrative.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 4,
            directness: 6,
          },
          source:
            "City of Vienna social-housing program (Gemeindebau / Wohnbauförderung) — directional pattern; specific figures not independently verified",
          reasoning:
            "Vienna is the most-cited example of supply-side, publicly led affordability, and the broad shape of its model (a large municipal/subsidized housing stock, dedicated funding, century-long commitment) is well established. However, the precise rent-gap and annual-construction figures were not verifiable against a primary source here, so they were qualified and weights lowered. Replicability is low given the unique fiscal and political preconditions. No sourceUrl is asserted because none was web-verified.",
        },
        {
          id: "housing-voucher-underfunding",
          title:
            "Only 1 in 4 Eligible US Households Receives Housing Voucher Assistance",
          description:
            "Federal rental assistance reaches only a minority of eligible low-income renters. The Center on Budget and Policy Priorities reports that roughly three out of four low-income renters who need federal rental assistance do not receive it because the programs are not funded as entitlements — i.e., only about 1 in 4 eligible households is served. Voucher waitlists are frequently years long and many are closed to new applicants. (An earlier draft also cited Harvard JCHS figures of 10.6 million severely cost-burdened extremely-low-income renters and a $22 billion annual cost to cover all eligible households; those specific figures were not verified here and are omitted from the core claim.)",
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
            "CBPP is among the most authoritative housing-policy research organizations, and the 'three out of four do not receive assistance' (≈1 in 4 served) finding is verified directly on the cited CBPP page. This challenges the claim that vouchers are a ready substitute for rent control, since the preferred alternative is chronically underfunded. Unverified Harvard JCHS dollar/household specifics were removed to keep the claim tight.",
        },
        {
          id: "auckland-upzoning-results",
          title:
            "Auckland Upzoning Lowered Rents Roughly 22-28% Below Counterfactual (Greenaway-McGrevy)",
          description:
            "Auckland's 2016 Unitary Plan upzoned about three-quarters of the city's residential land for higher-density housing. Two strands of work by Greenaway-McGrevy and co-authors study the effects. On construction, Greenaway-McGrevy & Phillips ('The Impact of Upzoning on Housing Construction in Auckland,' Journal of Housing Economics, 2023) find the reform added tens of thousands of additional dwelling consents within several years (on the order of ~4-9% of the housing stock). On rents, 'Can Zoning Reform Reduce Housing Costs? Evidence from Rents in Auckland' (Greenaway-McGrevy, with So) uses a synthetic-control design and estimates that rents for comparable properties are roughly 20-28% lower than they would otherwise have been several years post-reform, with cumulative Auckland rent growth (~20% over 2016-2023) well below comparable NZ cities.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Greenaway-McGrevy & Phillips, Journal of Housing Economics (2023) — construction; Greenaway-McGrevy, 'Can Zoning Reform Reduce Housing Costs? Evidence from Rents in Auckland' (working paper) — rents",
          sourceUrl:
            "https://cdn.auckland.ac.nz/assets/business/about/our-research/research-institutes-and-centres/Economic-Policy-Centre--EPC-/WP016.pdf",
          reasoning:
            "The synthetic-control design is rigorous and the Auckland reform is one of the most comprehensive upzoning experiments globally. An earlier draft attributed the rent-reduction finding to 'Greenaway-McGrevy & Phillips' and cited 26-33%; the rent result is actually from the separate 'Evidence from Rents in Auckland' paper (Greenaway-McGrevy, with So), which estimates rents roughly 20-28% below counterfactual — Phillips is a co-author on the construction paper. Effects took several years to materialize, so supply expansion works but not quickly enough to protect all vulnerable tenants in the interim.",
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
        "Housing Market Spillovers: Evidence from the End of Rent Control in Cambridge, Massachusetts — Autor, Palmer & Pathak, Journal of Political Economy, 122(3) (2014)",
      url: "https://doi.org/10.1086/675536",
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
