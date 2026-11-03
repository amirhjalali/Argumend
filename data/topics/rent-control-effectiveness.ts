import type { TopicInput } from "@/lib/schemas/topic";

export const rentControlEffectivenessData = {
  id: "rent-control-effectiveness",
  title: "Does Rent Control Help or Hurt Renters?",
  question: "Does rent control end up hurting the renters it is meant to help?",
  aliases: [
    "Does rent control make housing less affordable in the long run?",
    "Does rent control work?",
    "Limits on landlords' rent increases",
    "Caps on rent hikes",
    "Rent stabilization for tenants",
    "Rent freezes",
    "Should New York freeze the rent?",
  ],
  meta_claim:
    "Rent control ends up hurting renters as a group: the protection it gives tenants who hold a capped lease is outweighed by the rentals it takes off the market and the higher rents and longer searches it leaves everyone else.",
  status: "contested" as const,
  category: "economics" as const,
  // As of 3 November 2026: New York City's Rent Guidelines Board voted 7-1 on
  // 25 June 2026 to freeze rents on one- and two-year leases for nearly a
  // million stabilized apartments (leases starting 1 Oct 2026 to 30 Sep
  // 2027). Massachusetts' Supreme Judicial Court took a statewide rent-cap
  // question off the 3 Nov 2026 ballot on 23 June. St. Paul exempted new
  // construction from its 3% cap in an amendment effective 13 June 2025.
  last_updated: "2026-11-03",
  keystone_fact: {
    statement:
      "On 25 June 2026, New York City's Rent Guidelines Board voted 7-1 to freeze rents on one- and two-year leases for nearly a million rent-stabilized apartments. Tenants call it relief; landlords say it will starve their buildings of repairs. The best-measured case, San Francisco's 1994 expansion, found both effects at once: covered tenants were displaced less, and covered landlords cut their rental supply by 15%. The fight is over which effect is bigger, and who pays for it.",
    confidence: 85,
    source:
      "amNY, 'Rent Guidelines Board approves rent freeze' (25 June 2026); Diamond, McQuade & Qian, American Economic Review 109(9), 2019",
    sourceUrl: "https://www.amny.com/housing/rent-guidelines-board-approves-rent-freeze-06262026/",
  },
  simple_case: [
    "The stakes are paid monthly. In 2024 a record 22.7 million US renter households, 49% of all renters, spent more than 30% of their income on housing, and 12.1 million spent more than half. A cap tells those tenants what next year's rent will be.",
    "The argument runs in three steps: whether caps shrink the supply of rentals, whether keeping today's tenants in place is worth what it costs the people still looking, and whether a cap buys time for new building or takes the pressure off it.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: What caps do to the rental stock (id kept: Jev fixtures and
    // the paste crux eval key on it)
    // =========================================================================
    {
      id: "supply-effects",
      title: "The rental supply",
      short_summary:
        "A cap lowers what an owner can earn from renting, so some owners stop renting: they sell to owner-occupiers, convert to condos, or rebuild. In San Francisco that removed 15% of the covered rental stock even though new buildings were exempt. Supporters say modern caps, set at inflation plus a margin and exempting new buildings, are built to avoid that. St. Paul, Oregon, California and now New York's freeze are the live tests.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "A cap only shrinks supply when it bites hard enough to make renting a loss, and modern caps are designed not to. Oregon's and California's 2019 laws exempt buildings for their first 15 years, and California's caps yearly increases at 5% plus inflation, never more than 10%; New Jersey's towns have run moderate local caps for decades, and Census comparisons found no significant effect on rents, quality or property values. San Francisco's losses came through specific exits, condo conversion and redevelopment, that a city can close with conversion limits. Berlin and St. Paul are the cautionary cases because they were blunt: Berlin froze rents outright and St. Paul capped new buildings at 3%. Even the broadest review of the literature concludes that caps are quite effective at lowering rents or slowing their growth. The design question is how to keep that effect without the exits.",
      proponent_rebuttal:
        "The supply loss is the best-documented effect in the literature, and it showed up where the policy was supposed to be safe. San Francisco's 1994 expansion exempted new construction and let rents reset between tenants; covered landlords still cut their rental supply by 15%, mostly by converting to condos and owner-occupied homes, and the authors estimate that raised rents citywide by 5.1%. A review of 112 empirical studies counts 12 of 16 rental-supply studies finding less supply under control, and 14 of 17 finding higher rents in the uncontrolled sector. Berlin's 2020 freeze cut rents in listings and cut the number of listings with them. Closing the exits does not end the incentive: an owner who cannot convert can defer maintenance. A cap at inflation plus 5% that rarely binds does little harm, but it also does little; the caps that deliver large savings are the ones that produce these responses.",
      crux: {
        id: "construction-response-test",
        title: "The Rental Supply Response Test",
        question:
          "Do rent caps shrink the stock of rentals, even when new buildings are exempt?",
        description:
          "Count both sides of the rental ledger under a cap: new rentals built, and existing rentals lost to condo conversion, owner move-in, demolition or withdrawal. A cap that exempts new construction can still shrink the stock if owners of covered buildings sell, convert or let units sit. The test applies to each design separately: Oregon's and California's 2019 laws (new buildings exempt for 15 years), St. Paul's 3% cap before and after it exempted new construction, Berlin's 2020 freeze, and New York's 2026 freeze.",
        methodology:
          "Compare permits, completed rentals, conversions to owner occupancy, demolitions, and net rental stock against matched jurisdictions using a difference-in-differences design. Control for zoning, financing costs, population growth, and construction costs. Track the actual policy periods in Oregon and California from 2019 and in St. Paul separately before and after its amendments effective in 2023 and 2025; do not treat its original 2021 ordinance as a new-construction-exempt policy.",
        equation:
          "\\Delta_{rental_stock} = \\beta_0 + \\beta_1 \\cdot RentControl_i + \\beta_2 \\cdot X_i + \\varepsilon_i",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Matched-market counts of new rental completions and of existing rentals lost to conversion, demolition or withdrawal, giving the net change in rental stock for each cap design: Oregon and California since 2019, St. Paul before and after its 2023 and 2025 changes, and New York's stabilized stock after the 2026 freeze.",
        },
        cost_to_verify:
          "Requires comparable construction and rental-withdrawal data; no study budget is established.",
        falsification: {
          supporter_flip:
            "If matched-market studies of Oregon's or California's caps found no loss of rentals, either in completions or in the existing stock, the supply objection would weaken for caps of that design.",
          skeptic_flip:
            "If cities with new-building exemptions and limits on condo conversion still lost existing rentals faster than matched cities without caps, exemptions alone would not answer the supply objection.",
          common_ground:
            "Rent caps lower rents for the tenants they cover, and in San Francisco they also cut the covered rental supply by 15%, even though new buildings were exempt.",
          live_disagreement:
            "Whether a cap set at inflation plus a margin, with new buildings exempt and conversions limited, keeps the savings for tenants without the loss of rentals seen in San Francisco and Berlin.",
        },
      },
      evidence: [
        {
          id: "stanford-sf-study",
          title:
            "San Francisco 1994: covered landlords cut rental supply 15%, raising citywide rents an estimated 5.1% (Diamond, McQuade & Qian)",
          description:
            "In 1994 San Francisco voters extended rent control to small multifamily buildings built before 1980. Comparing those buildings with ones built just after 1980, Diamond, McQuade and Qian found that covered landlords reduced their rental supply by 15%, mainly by selling to owner-occupiers, converting to condos or tenancies in common, and redeveloping. The number of renters living in rent-controlled units fell 25%. The working-paper abstract estimates the lost supply caused a 5.1% citywide rent increase. The policy already exempted new construction and let rents reset between tenants.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source:
            "Diamond, McQuade & Qian, NBER Working Paper 24181 (2018); published in the American Economic Review 109(9): 3365-94 (2019)",
          sourceUrl: "https://www.nber.org/papers/w24181",
          reasoning:
            "A natural experiment with property-level data, published in the top economics journal. It measures withdrawals from the existing stock directly. It does not show what a cap with stricter conversion limits would do, and the 5.1% citywide figure is a model estimate, not a measured rent change.",
        },
        {
          id: "kholodilin-review",
          title:
            "Review of 112 empirical studies: 12 of 16 found less rental supply under rent control, 14 of 17 found higher uncontrolled rents (Kholodilin 2024)",
          description:
            "Konstantin Kholodilin of the German Institute for Economic Research (DIW) reviewed the empirical rent-control literature for the Journal of Housing Economics. Of 16 studies of rental supply, 12 found a negative effect, 3 none and 1 positive. Of 17 that tested spillovers, 14 found higher rents in the uncontrolled sector. Of 20 on housing quality, 15 found a negative effect and none a positive one. All 13 studies of misallocation found it. The same review concludes that rent controls are quite effective at lowering rents or slowing their growth for the units they cover.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source:
            "Kholodilin, 'Rent control effects through the lens of empirical research: An almost complete review of the literature,' Journal of Housing Economics (2024), as tallied by the Institute of Economic Affairs",
          sourceUrl:
            "https://iea.org.uk/review-rent-control-effects-through-the-lens-of-empirical-research-an-almost-complete-review-of-the-literature-by-konstantin-kholodilin/",
          reasoning:
            "A vote count across studies of very different policies, from wartime hard freezes to modern stabilization. It shows the direction most studies find, not the size of the effect for any one design. The tally is from the IEA, a free-market think tank, but the counts are the review's.",
        },
        {
          id: "berlin-rent-freeze",
          title:
            "Berlin's 2020 rent freeze cut advertised rents and sharply cut the number of rentals advertised (Hahn, Kholodilin & Waltl)",
          description:
            "In 2020 Berlin froze rents across most of its older stock (the Mietendeckel); Germany's Constitutional Court struck the law down in 2021. Comparing listings inside and outside the law's scope, the authors found advertised rents dropped significantly once it took effect, rents rose in unregulated Potsdam and nearby towns, and the number of advertised rental units fell sharply, making it harder for first-time renters to find a home.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "Hahn, Kholodilin & Waltl, 'Forward to the Past: Short-Term Effects of the Rent Freeze in Berlin,' WU Vienna Working Paper 308 / DIW Discussion Paper 1928",
          sourceUrl:
            "https://research.wu.ac.at/en/publications/forward-to-the-past-short-term-effects-of-the-rent-freeze-in-berl-3/",
          reasoning:
            "Clean before-and-after design on listing data. It covers a short period and a hard freeze, so it says more about New York's freeze than about caps set at inflation plus a margin. Fewer listings can mean fewer tenants moving rather than fewer homes.",
        },
        {
          id: "cambridge-decontrol-study",
          title:
            "Ending Cambridge's rent control in 1995 added about $1.8 billion to housing values, over half of it at never-controlled homes (Autor, Palmer & Pathak)",
          description:
            "Massachusetts voters ended Cambridge's strict rent control in 1995. Autor, Palmer and Pathak found decontrol added about $1.8 billion to the value of Cambridge's housing stock from 1994 to 2004, nearly a quarter of the city's residential price appreciation. More than half of the gain went to never-controlled properties near decontrolled ones, a sign that control had held down whole neighborhoods. Residential investment explains only a small fraction of the gain.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source:
            "Autor, Palmer & Pathak, 'Housing Market Spillovers: Evidence from the End of Rent Control in Cambridge, Massachusetts,' Journal of Political Economy 122(3): 661-717 (2014)",
          sourceUrl: "https://www.nber.org/papers/w18125",
          reasoning:
            "A strong study of a strict, old-style control. Its finding is about neighborhood spillovers, not rental supply, so directness for this crux is moderate; rising property values after decontrol also mean higher costs for the next buyer or renter.",
        },
        {
          id: "new-construction-exemptions",
          title: "Oregon's 2019 statewide cap exempts buildings for their first 15 years",
          description:
            "Oregon's SB 608 (2019), the first statewide rent cap in the US, limits yearly increases on most rentals but exempts buildings for their first 15 years. California's AB 1482 the same year used the same 15-year exemption. The design removes caps from newly built units, the classic reason a cap deters building. It does not prove construction was unaffected: permits since 2019 also reflect the pandemic, interest rates and local zoning.",
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
            "The exemption is in the statute. That it protects construction is an inference about incentives, not a measured result, so directness and replicability stay moderate.",
        },
        {
          id: "nj-moderate-controls",
          title:
            "New Jersey's moderate local caps showed no significant effect on rents, quality or values in 2000-2010 Census comparisons (Ambrosius et al. 2015)",
          description:
            "Dozens of New Jersey towns have run moderate local rent caps since the 1970s, with new buildings exempt by state law since 1987. Gilderbloom and Ye (2007) and Ambrosius et al. (Cities, 2015) compared rent-controlled and uncontrolled New Jersey towns with 2000 and 2010 Census data and found no statistically significant effect of rent control on rents, housing quality, property values or foreclosures. A 2026 paper by Matthew Hockert disputes the design and, using the new-construction exemption, finds exempt buildings carry a land-value premium of about 4.7%.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source:
            "Ambrosius, Gilderbloom, Steele, Meares & Keating, 'Forty years of rent control,' Cities 49: 121-133 (2015), as described in Hockert, 'Rent Control Capitalization into Land Values' (working paper, 30 June 2026)",
          sourceUrl: "https://matthewhockert.github.io/files/rent-control-capitalization.pdf",
          reasoning:
            "The strongest US evidence that moderate caps need not shrink markets, and the closest analogue to modern stabilization. The design is a city-level comparison of Census changes after most ordinances were in place, which Hockert argues cannot detect the effect; his own estimate points the other way, though it measures land values, not rental supply.",
        },
        {
          id: "economist-consensus-survey",
          title:
            "2012 Chicago Booth panel: 33 of 41 economists disagreed that rent caps had improved affordable housing in NYC and San Francisco",
          description:
            "Asked whether local rent-increase limits in cities including New York and San Francisco had improved the amount and quality of broadly affordable rental housing over the prior three decades, 33 of 41 listed panelists disagreed or strongly disagreed. One agreed, three were uncertain, one gave no opinion and three did not answer. The question did not separate cap levels, exemptions or conversion rules.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 4,
          },
          source:
            "University of Chicago Booth IGM / Kent Clark Center Forum (Feb. 2012)",
          sourceUrl: "https://kentclarkcenter.org/surveys/rent-control/",
          reasoning:
            "Expert opinion on a broad question, not a measurement. It tells a reader where economists' priors sit; it does not test any policy design, so directness is low.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Tenants now vs. renters later (id kept)
    // =========================================================================
    {
      id: "incumbent-vs-newcomer",
      title: "Tenants now vs. renters later",
      short_summary:
        "A capped lease keeps families in their neighborhoods, near work, school and the people they rely on. It also gives them a reason never to move, so fewer apartments come up for the people still looking. Both effects are measured. Which one matters more is partly a question of evidence (who actually holds the leases) and partly one of values.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Being forced out of your home is one of the worst things that happens to a low-income family, and a cap prevents it. San Francisco's covered tenants were 10 to 20% more likely to still live at their 1994 address years later, with the strongest effects for older tenants and racial minorities. Eviction is not a mere move: in Chicago and New York, an eviction order raises homelessness and hospital visits and cuts earnings. And the people holding New York's stabilized leases are not the comfortable insiders of the stereotype: their median household income was $60,000 in 2022 against $90,800 for market renters, and they are more likely to be Black or Hispanic. A newcomer's longer search is a real cost, but it is not the same kind of cost as a family losing its home, its school and its neighbors.",
      proponent_rebuttal:
        "The tenant who benefits is the one who already has the lease; the cost lands on people with no lease to protect. Fewer moves mean fewer vacancies: New York's rental vacancy rate was 1.41% in 2023, and 0.39% for apartments under $1,100. Stockholm's regulated queue averaged nine years for the contracts handed out in 2025. The benefit is also poorly aimed. In St. Paul, the gains from the 2021 cap flowed largely to higher-income renters, while the losses fell on lower-income owners, the opposite of the law's intent. And because the subsidy is tied to the apartment, a household whose needs change stays put rather than give it up, as Glaeser and Luttmer found in New York. Help that follows the household, such as vouchers, could protect the family facing eviction without taxing the next renter.",
      crux: {
        id: "displacement-net-welfare",
        title: "Neighborhood stability and access for new renters",
        question:
          "Is keeping today's tenants in their homes worth higher rents and longer searches for the next ones?",
        description:
          "Weigh what a cap does for families who already hold a lease (staying in the neighborhood, avoiding eviction, keeping children in the same school) against what it does to people who just moved to the city and are searching for an apartment: higher rents in the uncapped market, fewer vacancies, months-long searches while capped tenants never move out. Part of this is measurable: who holds capped leases, how much they save, and what happens to tenants who are displaced. The weighting of a current tenant's stability against a newcomer's access is a value judgment.",
        methodology:
          "Conduct a longitudinal study tracking both displaced and non-displaced tenants in gentrifying neighborhoods with and without rent stabilization. Measure outcomes including: housing cost burden, residential stability, employment access, children's school performance, physical and mental health, and social network disruption. Simultaneously measure costs borne by new market entrants: time to find housing, rent premium over controlled areas, commute distance, and housing quality. Calculate net social welfare using willingness-to-pay and quality-adjusted life year frameworks.",
        verification_status: "impossible" as const,
        settle: {
          condition:
            "Evidence can measure who holds capped leases and how much they save, what displacement does to health and schooling, and how much longer newcomers search and how much more they pay. How much a sitting tenant's stability counts against a newcomer's access is a value judgment that no study makes for the reader.",
          kind: "value-difference" as const,
        },
        cost_to_verify:
          "Measuring outcomes requires longitudinal data; a study budget cannot settle the choice of welfare weights.",
        falsification: {
          supporter_flip:
            "If tracking studies found capped leases going mainly to low-income households who would otherwise be displaced, with newcomers' searches barely longer, the case that caps hurt renters as a group would weaken.",
          skeptic_flip:
            "If studies found capped leases going mainly to higher-income tenants, as Ahern and Giacoletti estimate for St. Paul, while vacancies for newcomers dried up, a broad cap would look like a poor way to protect the vulnerable.",
          common_ground:
            "A cap transfers money from landlords to tenants who already hold a lease and makes those tenants less likely to move, both those who would be pushed out and those who would leave by choice.",
          live_disagreement:
            "Whether that transfer reaches the families most at risk of displacement, and how to weigh their stability against higher rents and longer searches for people still looking.",
        },
      },
      evidence: [
        {
          id: "displacement-prevention",
          title:
            "San Francisco's covered tenants were 10-20% more likely to stay at their 1994 address, most of all minority and older tenants",
          description:
            "Diamond, McQuade and Qian tracked individual tenants from 1994. In the medium to long term, tenants covered by the 1994 expansion were between 10 and 20% more likely to remain at their 1994 address than the comparison group, and more likely to remain in San Francisco. The effects were stronger for racial minorities, older households and long-time residents, which the authors read as rent control helping prevent minority displacement from the city.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "Diamond, McQuade & Qian, 'The Effects of Rent Control Expansion on Tenants, Landlords, and Inequality,' author manuscript (published in the American Economic Review, 2019)",
          sourceUrl: "https://web.stanford.edu/~diamondr/DMQ.pdf",
          reasoning:
            "The same study that found the supply loss measured the protection, with individual-level data. It shows tenants stayed; it does not by itself say how much that stability was worth to them relative to what newcomers paid.",
        },
        {
          id: "eviction-harms",
          title:
            "An eviction order raises homelessness and hospital visits and cuts earnings (Collinson et al., QJE 2024)",
          description:
            "More than two million US households have an eviction case filed against them each year. Using court records from Cook County and New York City and the random assignment of cases to more and less lenient judges, Collinson and co-authors found that an eviction order increases homelessness and hospital visits and reduces earnings; in the longer run it raises debt and lowers credit scores. The effects on housing and work were concentrated among Black and female tenants.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source:
            "Collinson, Humphries, Mader, Reed, Tannenbaum & van Dijk, 'Eviction and Poverty in American Cities,' Quarterly Journal of Economics 139(1): 57-120 (2024)",
          sourceUrl: "https://econpapers.repec.org/RePEc:oup:qjecon:v:139:y:2024:i:1:p:57-120.",
          reasoning:
            "Strong causal evidence of what displacement costs a household. It measures eviction, not rent increases, and does not test whether rent caps are the best tool to prevent it, so directness is moderate.",
        },
        {
          id: "low-income-disproportionate-benefit",
          title:
            "NYC Rent Stabilization Serves More Black and Hispanic Households, at a Median Income of $60,000 vs $90,800 for Market Renters",
          description:
            "New York's 2023 Housing and Vacancy Survey counted 996,600 rent-stabilized units. 23% of stabilized households were headed by a Black New Yorker and 36% by a Hispanic New Yorker, compared with 17% and 24% in market rentals. In 2022 stabilized tenants had a median household income of $60,000, against $90,800 for market renters. The median stabilized rent in 2023 was $1,500 a month, against $2,000 for market rentals.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "2023 New York City Housing and Vacancy Survey, selected initial findings",
          sourceUrl:
            "https://www.nyc.gov/assets/hpd/downloads/pdfs/about/2023-nychvs-selected-initial-findings.pdf",
          reasoning:
            "The city's representative survey. It shows who holds stabilized leases in the city with the largest program; it does not show who gets the largest dollar savings, or whether the same households would be displaced without stabilization.",
        },
        {
          id: "st-paul-wealth-transfer",
          title:
            "St. Paul's 2021 cap cut property values 6-7% ($1.6 billion), with the gains flowing mostly to higher-income renters (Ahern & Giacoletti)",
          description:
            "St. Paul voters passed a 3% cap on rent increases in November 2021 that at first covered new buildings too. Ahern and Giacoletti estimate it cut property values by 6-7%, an aggregate loss of $1.6 billion, about a third of it through spillovers. Where owners had high incomes and tenants low incomes, the transfer of wealth was close to zero. The authors conclude that, to the extent the law was meant to move wealth from high-income to low-income households, it did the opposite. The city has since exempted new construction (a change effective 13 June 2025).",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source:
            "Ahern & Giacoletti, 'Robbing Peter to Pay Paul? The Redistribution of Wealth Caused by Rent Control,' NBER Working Paper 30083 (2022)",
          sourceUrl: "https://www.nber.org/papers/w30083",
          reasoning:
            "Uses property prices to infer who gains and loses, soon after the vote. It measures expected transfers, not rents actually paid or tenants actually protected, and it studies an unusually strict version of a cap.",
        },
        {
          id: "nyc-vacancy-2023",
          title:
            "NYC's rental vacancy rate was 1.41% in 2023, and 0.39% for apartments under $1,100",
          description:
            "The 2023 Housing and Vacancy Survey found 33,210 units available for rent out of 2,357,000, a net vacancy rate of 1.41%, one of the lowest since the survey began in 1965. For units renting below $1,100, the bottom quarter of rents, it was 0.39%; for $1,100 to $1,649 it was 0.91%. Rent-stabilized units make up 27% of the city's housing.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 4,
          },
          source:
            "2023 New York City Housing and Vacancy Survey, selected initial findings",
          sourceUrl:
            "https://www.nyc.gov/assets/hpd/downloads/pdfs/about/2023-nychvs-selected-initial-findings.pdf",
          reasoning:
            "Shows how hard it is for a newcomer to find a cheap apartment in the city with the largest stabilized stock. It does not separate the effect of stabilization from the city's shortage of housing overall, so directness is low.",
        },
        {
          id: "stockholm-queue",
          title: "Stockholm's regulated-rental queue averaged nine years in 2025",
          description:
            "Stockholm's municipal Housing Agency reported that people who got an ordinary rental contract through its queue in 2025 had waited 9.0 years on average; 894,592 people were registered at year end, and 20,861 rentals were handed out. Waits varied sharply, with some homes going to applicants queued under two years and others requiring more than twenty.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 8,
            directness: 6,
          },
          source: "Bostadsförmedlingen i Stockholm, 2025 annual statistics",
          sourceUrl:
            "https://bostad.stockholm.se/nyhetsarkiv/2026/alla-tiders-formedlingsrekord/",
          reasoning:
            "Official queue statistics from a city where most rents are set by negotiation rather than the market. They do not separate the effect of regulation from supply, location preferences or how cheap it is to stay registered.",
        },
        {
          id: "nyc-misallocation",
          title:
            "NYC rent regulation left many apartments with households whose needs had changed (Glaeser & Luttmer 2003)",
          description:
            "Comparing which kinds of households live in which kinds of apartments in New York's regulated and market sectors, Glaeser and Luttmer found statistically and economically significant misallocation. An apartment can stay with a household whose needs have changed because giving up the protected lease is costly.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "Glaeser & Luttmer, American Economic Review, 93(4): 1027-46 (2003)",
          sourceUrl:
            "https://www.aeaweb.org/articles?id=10.1257/000282803769206188",
          reasoning:
            "A published measure of mismatch. The data are old and the study does not count the displacement it prevents, so it is one side of the ledger only.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: A bridge to new supply, or a delay (id kept)
    // =========================================================================
    {
      id: "alternative-approaches",
      title: "A bridge or a delay",
      short_summary:
        "A rent cap adds no homes. Supporters say it protects tenants for the years it takes to plan, permit and build; critics say it relieves the pressure for the zoning reform and construction that would help everyone, and that vouchers protect families without capping the whole market. New York's 2026 freeze is the test running now. Whether building more homes lowers rents is its own map.",
      icon_name: "Target" as const,
      skeptic_premise:
        "New homes take years; rent increases arrive every year. Building more is the long-run answer, but a family facing a steep increase this year cannot wait for it, and the alternative critics offer, vouchers, sits inside federal rental assistance that reaches only about one in four of the low-income renters who need it. A cap is the one protection a city can give every covered tenant at once, without a budget line. Pairing it with zoning reform is not a contradiction: cities can do both, and the cap keeps existing tenants in place while the new supply arrives. New York's landlords say a freeze will starve their buildings, but it runs for one twelve-month round of renewals, and the board froze one-year terms as recently as 2020.",
      proponent_rebuttal:
        "A bridge only helps if the far bank gets built, and a cap weakens the coalition that would build it: the tenants it protects have less reason to fight for new housing. Minneapolis took the other road, passing citywide zoning reform in 2018 without a cap. If the goal is protecting vulnerable families, vouchers target them directly and travel with the household; that they are underfunded is an argument for funding them. New York's freeze shows the strain: the Rent Guidelines Board's own index put operating costs for stabilized buildings up 5.3% in its 2026 report, with fuel up 11% and insurance up 10.5%, while rents were set to rise 0%. Owners who cannot cover costs defer repairs, and buildings decline.",
      crux: {
        id: "supply-timeline-test",
        title: "The Bridge-or-Delay Test",
        question:
          "Does a rent cap protect tenants until new homes arrive, or slow the reforms that would build them?",
        description:
          "If places that pair rent caps with zoning and permitting reform keep permitting and building at the pace of places that reform supply alone, while fewer low-income tenants are evicted or displaced in the meantime, the cap works as a bridge. If supply reform stalls, or permits and starts fall behind, where a cap is in force, the cap delays the reforms it was meant to bridge to. New York's two-year experience under the 2026 freeze adds a test of what happens to repairs and building finances.",
        methodology:
          "Compare jurisdictions that adopted supply-side reform alone, rent stabilization alone, and both together. Track whether further zoning or permitting reforms passed and were carried out after a cap was adopted, and displacement and eviction rates for low-income households in the meantime, for 5-10 years, against matched jurisdictions that adopted neither.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Counts of zoning and permitting reforms passed and carried out after a rent cap was adopted, and low-income displacement and eviction rates over the same years, against matched places without a cap, tracked for 5-10 years; plus repair violations and distressed-building counts in New York's stabilized stock during the 2026-2027 freeze.",
        },
        cost_to_verify:
          "Requires multi-market policy and displacement data over several years; no study budget is established.",
        falsification: {
          supporter_flip:
            "If places that paired a rent cap with supply reform permitted and built as fast as places that reformed supply alone, while displacing fewer low-income tenants, the cap would earn a role as a bridge.",
          skeptic_flip:
            "If supply reform stalled, or permits and starts fell behind matched places, wherever a cap was adopted, and displacement fell no faster there, the cap would look like a delay rather than a bridge.",
          common_ground:
            "A rent cap adds no homes of its own; new homes take years to plan and build while tenants face rent increases now; and federal rental assistance reaches only about a quarter of the low-income renters who need it.",
          live_disagreement:
            "Whether a cap protects tenants from displacement while new supply is built, or eases the pressure for the supply reforms and voucher funding that would make it unnecessary.",
        },
      },
      evidence: [
        {
          id: "rent-burden-record-2024",
          title:
            "A record 22.7 million US renter households were cost-burdened in 2024; 12.1 million paid more than half their income (Harvard JCHS 2026)",
          description:
            "Harvard's Joint Center for Housing Studies reported in June 2026 that 22.7 million renter households, nearly half of all renters, spent more than 30% of their income on housing in 2024, and 12.1 million spent more than half. Among renters earning under $30,000 a year, 83% were burdened and 67% severely burdened.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 4,
          },
          source:
            "Harvard Joint Center for Housing Studies, The State of the Nation's Housing 2026, as summarized by Enterprise Community Partners (17 June 2026)",
          sourceUrl:
            "https://www.enterprisecommunity.org/story/five-key-takeaways-2026-state-nations-housing-report",
          reasoning:
            "Establishes how many households a cap is meant to protect and how urgent the problem is. It says nothing about whether caps relieve the burden or worsen it over time, so directness is low.",
        },
        {
          id: "housing-voucher-underfunding",
          title:
            "Three in four low-income renters who need federal rental assistance do not get it (CBPP)",
          description:
            "CBPP's analysis of 2023 housing survey data and 2024 assistance records estimates that 76% of low-income renters needing federal rental assistance do not receive it. Need includes spending more than 30% of monthly income on housing or living in overcrowded or substandard housing. This covers federal rental assistance broadly, rather than vouchers alone.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source:
            "Center on Budget and Policy Priorities, 'Three Out of Four Low-Income At-Risk Renters Do Not Receive Federal Rental Assistance'",
          sourceUrl:
            "https://www.cbpp.org/research/housing/three-out-of-four-low-income-at-risk-renters-do-not-receive-federal-rental-assistance",
          reasoning:
            "Built on HUD and Census data. It weakens the claim that vouchers, at current funding, can replace caps; it does not show that funded vouchers would fail.",
        },
        {
          id: "nyc-freeze-costs-2026",
          title:
            "NYC froze stabilized rents in June 2026 after the board's own index put owners' costs up 5.3%",
          description:
            "On 25 June 2026 New York's Rent Guidelines Board voted 7-1 to set 0% increases on one- and two-year renewals for nearly a million rent-stabilized homes, for terms starting 1 October 2026 through 30 September 2027. Mayor Zohran Mamdani had campaigned on the freeze. In April the board's Price Index of Operating Costs reported that costs for buildings with stabilized apartments rose 5.3%, with fuel up 11.0% and insurance up 10.5%. The Real Estate Board of New York said the freeze would mean less investment in maintenance and repairs, and board member Arpit Gupta, the lone vote against, said over 57,000 stabilized units sat vacant in 2025, up from about 49,000 in 2024.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 4,
          },
          source:
            "amNY (25 June 2026) on the vote; PoliticsNY (9 April 2026) on the board's 2026 Price Index of Operating Costs; Insurance Journal (26 June 2026) on vacant stabilized units",
          sourceUrl:
            "https://www.amny.com/housing/rent-guidelines-board-approves-rent-freeze-06262026/",
          reasoning:
            "Documents the gap between costs and allowed rents that critics expect to show up as deferred repairs. As of November 2026 it is a prediction, not an outcome; the freeze began on 1 October.",
        },
        {
          id: "minneapolis-upzoning",
          title: "Minneapolis reformed zoning citywide in 2018 without a rent cap",
          description:
            "Minneapolis adopted its 2040 comprehensive plan in 2018 and put it into effect in 2020, using zoning changes to allow more housing in more parts of the city, with no rent cap. The record shows the city chose supply reform alone; it does not by itself show how many homes the plan added or how rents changed against a credible comparison.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 5,
          },
          source: "City of Minneapolis comprehensive-plan record",
          sourceUrl:
            "https://www.minneapolismn.gov/government/departments/cped/planning/comp-plan/",
          reasoning:
            "The city record establishes what was adopted and when. Rent and permit effects belong to the housing-supply map and need their own causal design.",
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
      title:
        "The Effects of Rent Control Expansion on Tenants, Landlords, and Inequality; Diamond, McQuade & Qian, American Economic Review (2019)",
      url: "https://www.aeaweb.org/articles?id=10.1257/aer.20181289",
    },
    {
      title:
        "Kholodilin, Rent Control Effects through the Lens of Empirical Research (DIW discussion paper abstract: 'quite effective in terms of lowering housing rents or slowing their growth')",
      url: "https://econpapers.repec.org/RePEc:diw:diwwpp:dp2026",
    },
    {
      title: "Saint Paul: Rent Stabilization ordinance and amendment timeline",
      url: "https://www.stpaul.gov/departments/safety-inspections/rent-buy-sell-property/renting-property/rent-stabilization",
    },
    {
      title: "PoliticsNY: Rent Guidelines Board reports fuel competing cases for and against a rent freeze (9 April 2026)",
      url: "https://politicsny.com/2026/04/09/new-rent-guidelines-board-reports-fuel-competing-cases-for-and-against-a-rent-freeze/",
    },
    {
      title: "Ocean State Media: Massachusetts high court takes rent control off the 2026 ballot (24 June 2026)",
      url: "https://www.oceanstatemedia.org/news-and-culture/2026-06-24/massachusetts-high-court-derails-rent-control-ballot-question-citing-mention-of-religion",
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
      title: "Will New York's 2026 rent freeze hurt the buildings it covers?",
      content:
        "The freeze applies to leases starting between October 2026 and September 2027, after the board's index put owners' costs up 5.3%. Critics expect deferred repairs and more distressed buildings; supporters expect tenants to keep money they need and owners to absorb a year. Repair violations, building sales and hardship applications over the next two years will show which.",
    },
    {
      id: "q2",
      title:
        "Does modern rent stabilization avoid the supply problems of older rent control?",
      content:
        "San Francisco's policy already exempted new construction and allowed rents to reset between tenants, yet covered landlords cut their rental supply by 15%. Modern caps, such as Oregon's and California's, add inflation-linked limits and 15-year exemptions. Whether they also need limits on condo conversion, and whether those limits push owners to cut maintenance instead, is the open question.",
    },
    {
      id: "q3",
      title:
        "How should benefits to current tenants be weighed against costs to future renters?",
      content:
        "New York's stabilized tenants earn less than market renters and are more likely to be Black or Hispanic; St. Paul's cap, by one estimate, sent its gains mostly to higher-income renters. Should rent help be means-tested and portable, like vouchers, rather than tied to the apartment? And if vouchers stay underfunded, is a cap the protection that is actually available?",
    },
  ],
} satisfies TopicInput;
