import type { TopicInput } from "@/lib/schemas/topic";

export const sportsBettingLegalizationData = {
  id: "sports-betting-legalization",
  title: "Legalizing Sports Betting",
  question: "Should states legalize and regulate mobile sports betting?",
  meta_claim:
    "States should legalize and regulate mobile sports betting rather than ban it",
  status: "contested" as const,
  category: "policy" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "In 2022, four years after the Supreme Court's Murphy v. NCAA ruling let states legalize sports betting, the industry's trade group estimated Americans were still wagering $63.8 billion a year with illegal bookies and offshore sites. In 2024, legal sportsbooks in 38 states plus DC took a record $147.9 billion in bets. Both figures are real. The fight is over how much of that legal handle is old betting brought into the open, and how much is new betting that legalization created.",
    confidence: 78,
    source:
      "American Gaming Association, 'Sizing the Illegal and Unregulated Gaming Markets' (2022) and Commercial Gaming Revenue Tracker, full-year 2024; Murphy v. NCAA (2018)",
    sourceUrl: "https://www.americangaming.org/new-aga-report-shows-americans-gamble-more-than-half-a-trillion-dollars-illegally-each-year/",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Both sides accept that a large illegal sports-betting market existed before 2018, that the early US mobile-betting model cut savings and raised financial distress among vulnerable households, and that problem-gambling helpline calls rose after legalization even as legal monitoring caught real match-fixing.",
    "They split over how much legal betting replaces illegal betting rather than adding new betting; whether mandatory safeguards such as deposit limits and affordability checks can break the link between betting volume and harm; and whether legal monitoring and treatment prevent more harm than the added volume creates.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Tax Revenue & Black-Market Displacement vs. Regressive Extraction
    // =========================================================================
    {
      id: "revenue-and-displacement",
      title: "Tax Revenue & Black-Market Displacement",
      short_summary:
        "Legalization moved a vast illegal market into a taxed, regulated one — generating roughly $3 billion in state tax revenue in 2024 and giving regulators visibility they never had. Proponents argue prohibition simply failed: the demand existed regardless, so capturing it beats handing it to offshore books. Skeptics counter that the revenue is small relative to the financial harm it offsets, that it is regressively extracted disproportionately from low-income bettors, and that legalization grows total betting rather than merely relocating it.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The fiscal case for legalization is far weaker than the headline tax numbers suggest. State sports-betting tax revenue was about $3 billion in 2024 — a rounding error against state budgets measured in trillions, and dwarfed by the financial damage the activity inflicts. Worse, the revenue is regressively sourced: a UC San Diego study of 717,724 online gamblers found 96% lost money over five years and that legalization drove far more problematic gambling among lower-income gamblers than higher-income ones, with 5.3% of bettors spending more than 10% of monthly income on gambling. The 'we're just capturing existing demand' framing is misleading because legalization does not merely relocate betting — frictionless mobile apps massively expand it, recruiting people who would never have found an offshore bookie. The state thereby becomes financially dependent on, and a marketing partner to, an industry whose profits come overwhelmingly from its most addicted users.",
      proponent_rebuttal:
        "Prohibition was not a neutral baseline — it was a failure that handed an enormous market to criminals. Even in 2022, four years into legalization, the American Gaming Association estimated Americans were still wagering roughly $64 billion a year on sports with offshore and illegal bookies, with no consumer protections, no taxes, and no integrity oversight. Legal mobile betting, backed by enforcement, pulls users out of that black market: GeoComply found that over Super Bowl weekend 2025, states that had acted against illegal offshore operators saw active legal accounts grow about twice as fast as states that had not. Legalization produced about $3 billion in 2024 state taxes, much of it statutorily earmarked for education, infrastructure, and problem-gambling services — money that simply did not exist when the activity was underground. The regressive-extraction critique is real but applies to every legal vice market (lotteries, alcohol, tobacco); the policy answer is to regulate harm with deposit limits and self-exclusion, not to push demand back to unregulated offshore sites where no such protections exist.",
      crux: {
        id: "induced-vs-displaced-demand",
        title: "The Induced-vs-Displaced Demand Test",
        question:
          "Does legal betting mostly replace illegal betting, or create new betting that would not have happened?",
        description:
          "Whether legal mobile sports betting mostly relocates wagering that was already happening illegally (displacement) or mostly creates large new volumes of betting that would not otherwise have occurred (induced demand). If most legal handle is displaced black-market money, the net social cost is small and the tax/consumer-protection upside is nearly free. If most legal handle is induced — new bettors, new dollars, new addicts — then the harm metrics are caused by legalization itself, not merely revealed by it, and the cost-benefit calculus flips.",
        methodology:
          "Combine three data streams across states with staggered legalization dates: (1) pre-legalization estimates of illegal handle from GeoComply geolocation pings to offshore sites and AGA/Innovation Group survey data; (2) post-legalization legal handle and self-reported prior illegal betting from regulated operators' onboarding surveys; and (3) credit-bureau and bank-transaction panels (as in the NBER and UCSD studies) to measure whether total household gambling outflows rose or merely shifted channels. Use a staggered difference-in-differences design comparing newly legal states to not-yet-legal states to separate the displaced fraction from the induced fraction of total betting volume.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Across states with staggered legalization dates, illegal handle before launch (GeoComply pings to offshore sites, AGA survey estimates) set against legal handle after, and bank-transaction panels showing whether household gambling outflows jump or only change channels.",
        },
        cost_to_verify:
          "$1-2M (Multi-state econometric study requiring licensed credit-bureau panels, operator data, and geolocation datasets)",
        falsification: {
          supporter_flip:
            "If a clean difference-in-differences analysis showed that legalization mostly induces brand-new betting volume rather than displacing illegal handle — so total household gambling outflows jump sharply rather than merely changing channels — then the 'we're just capturing existing demand' defense collapses and legalization owns the resulting financial harm.",
          skeptic_flip:
            "If player-level data showed most legal handle coming from bettors who left offshore books, and the illegal market shrinking from the ~$64B a year the AGA estimated in 2022, legal volume would look like displaced demand rather than new harm.",
          common_ground:
            "Both sides agree a large illegal market existed before 2018 and that legal mobile betting also recruits some bettors who would not have used an offshore book.",
          live_disagreement:
            "What fraction of legal handle is displaced versus induced — which determines whether harm statistics are caused by legalization or merely made visible by it, and which only a rigorous multi-state panel can quantify.",
        },
      },
      evidence: [
        {
          id: "murphy-ncaa-148b-handle",
          title:
            "Post-Murphy Explosion: $148 Billion Legally Wagered in 2024 Across 38+ States",
          description:
            "In Murphy v. NCAA (May 14, 2018) the Supreme Court held that the 1992 federal sports-betting ban (PASPA) violated the Tenth Amendment's anti-commandeering rule, with seven justices joining that holding and six voting to strike the whole law, freeing states to legalize. By 2024, 38 states plus Washington, DC had authorized sports betting in some form, about 30 of them online. The American Gaming Association's revenue tracker reported that Americans legally wagered $147.91 billion on sports in 2024, up 23.6% from 2023, with more than 95% of it placed online, producing $13.71 billion in sportsbook revenue (up 25.4%). The AGA's later annual report revised the 2024 handle to $149.90 billion.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 9,
            directness: 7,
          },
          source:
            "Murphy v. NCAA, 584 U.S. 453 (2018); American Gaming Association, Commercial Gaming Revenue Tracker, full-year 2024 (Feb. 2025)",
          sourceUrl:
            "https://web.archive.org/web/20250228192711/https://www.americangaming.org/resources/commercial-gaming-revenue-tracker/",
          reasoning:
            "The Murphy ruling and AGA handle figures are authoritative and uncontested in their order of magnitude (the AGA is the industry trade group, so it has incentive to report robust growth, but the handle data is corroborated by state regulators). This establishes the scale and speed of the post-2018 market but is neutral on whether the volume is displaced or induced — it directly supports 'a huge market now exists in the open.'",
        },
        {
          id: "illegal-market-displacement",
          title:
            "Americans Still Wagered ~$64B a Year Illegally in 2022; Enforcement States See Faster Legal-Account Growth",
          description:
            "A 2022 American Gaming Association report (research by The Innovation Group, based largely on a survey of 5,284 US adults) estimated that Americans wager $63.8 billion a year with illegal bookies and offshore sites, costing states about $700 million in annual taxes. That was four years after Murphy, with sports betting legal in 36 states and DC, and the AGA said it implied illegal operators still held nearly 40% of the US sports-betting market. The report found 49% of past-year sports bettors had placed a bet with an illegal operator, and earlier AGA research found more than half of those who bet with illegal operators believed they were betting legally. Separately, GeoComply, which supplies geolocation checks to legal sportsbooks, reported that over Super Bowl weekend 2025 active accounts grew on average twice as fast in states that had acted against illegal offshore sportsbooks as in states that had not. Its follow-up comparing five enforcement states with five similar states found 10% more year-over-year growth in active players and 39% more new accounts in August 2025.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 8,
          },
          source:
            "American Gaming Association, 'Sizing the Illegal and Unregulated Gaming Markets' (Nov. 2022); GeoComply Super Bowl LIX release (Feb. 2025) and enforcement analysis (Sept. 2025)",
          sourceUrl:
            "https://www.americangaming.org/new-aga-report-shows-americans-gamble-more-than-half-a-trillion-dollars-illegally-each-year/",
          reasoning:
            "The illegal-market estimate is a survey-based extrapolation from an industry group with an interest in showing how much betting sits outside the legal market, and GeoComply sells compliance technology to legal sportsbooks and says its data does not represent the whole market, so independence and replicability are moderate. The estimate also cuts two ways: it shows a large illegal market that legal books can draw from, and it shows that market was still large four years after legalization began. The enforcement comparison is the most direct evidence here for the displacement (rather than induced-demand) reading.",
        },
        {
          id: "tax-revenue-3b",
          title:
            "Legal Sports Betting Generated ~$3 Billion in State Tax Revenue in 2024, Often Earmarked for Public Programs",
          description:
            "State sports-betting taxes brought in $2.99 billion in 2024, according to a USAFacts analysis of the Census Bureau's Quarterly Summary of State and Local Tax Revenue, against $13.7 billion in sportsbook revenue reported by the American Gaming Association. New York, which taxes mobile sportsbook revenue at 51%, generated about $1.2 billion in the twelve months through September 2025 and was the only state above $1 billion. The Census category can also include horse-racing and some other wagering taxes. The Census Bureau says the money helps fund public schools, roads, highways, law enforcement and gambling-addiction treatment. Statutory rates run from 6.75% in Nevada and Iowa to 51% in New Hampshire, New York and Rhode Island, making the revenue highly sensitive to rate design.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "USAFacts, 'How much revenue does sports betting generate?' (Feb. 2026), from the US Census Bureau Quarterly Summary of State and Local Tax Revenue; Tax Foundation, 'Bets on Legal Sports Markets Pay Off Big for States, Sportsbooks, and Consumers' (Dec. 2024)",
          sourceUrl:
            "https://usafacts.org/articles/how-much-revenue-does-sports-betting-generate/",
          reasoning:
            "USAFacts is a nonpartisan data publisher, the Tax Foundation is an independent fiscal-policy research organization, and the underlying figures come from official Census data. The revenue is real and directly supports the fiscal case, but its modest size relative to state budgets — and relative to estimated financial harms — is exactly why skeptics argue it does not justify the externalities. Directness is moderate because tax revenue alone does not net out social costs.",
        },
        {
          id: "regressive-extraction-ucsd",
          title:
            "Legalization Drove More Problematic Gambling Among Low-Income Bettors; 96% Lost Money",
          description:
            "A UC San Diego Rady School of Management study analyzed five years of data from 32 states, including digital payment records for 717,724 online gamblers (about 250,000 of them with direct-deposit income data). It found 96% of gamblers lost money over the period and only 4% profited. Among bettors, 43% exceeded the recommended threshold of 1% of monthly income spent on gambling, 5.3% spent more than 10% of monthly income, and 3.2% spent more than 15%. The authors concluded that online-gambling legalization 'leads to far more problematic gambling among lower-income gamblers than among higher-income gamblers,' making the resulting tax revenue a regressive transfer disproportionately funded by those least able to afford it.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Wilbur, Taylor & McCarthy, UC San Diego Rady School of Management (analysis of 717,724 online gamblers)",
          sourceUrl:
            "https://today.ucsd.edu/story/legalized-gambling-increases-irresponsible-betting-behavior-especially-among-low-income-populations",
          reasoning:
            "A large-sample working paper using actual payment data from academic researchers at credible institutions, with strong directness to the regressivity claim. It establishes that gambling losses (and thus the tax base) are concentrated among lower-income and problem gamblers. The main limitation is that 96%-lose is inherent to the negative-sum structure of all gambling and not unique to legalization, so it indicts the activity's economics more than the legalize-vs-prohibit choice specifically.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Consumer Protection vs. Household Financial Harm
    // =========================================================================
    {
      id: "consumer-protection-vs-financial-harm",
      title: "Consumer Protection vs. Household Financial Harm",
      short_summary:
        "Regulated sportsbooks must offer deposit limits, self-exclusion, age verification, and fund problem-gambling services — protections offshore books never provided. But the most rigorous causal studies of legalization find it reduces household savings and investment, raises bankruptcy and debt-collection rates, and concentrates harm among financially fragile young men. The crux is whether the regulatory toolkit can actually blunt those harms, or whether frictionless mobile betting overwhelms the safeguards.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The strongest case against the post-2018 mobile-betting model is the household-finance evidence, and it is damning. The leading causal study (NBER WP 33108, Baker et al. 2024), using transaction data from over 230,000 households as online betting went live in 25 states plus DC, found that $1 of online sports betting causes net investments to fall by about $0.99 — meaning the money is not displaced entertainment spending but vanished savings and stock investments. A separate credit-bureau study of millions of consumers found that states legalizing sports betting saw bankruptcies rise about 28%, debt sent to collections rise 8%, and auto-loan delinquencies increase, with stronger effects where betting is online. Harm concentrates among financially constrained households — credit-card debt rises, available credit falls, and overdrafts increase. Deposit limits and self-exclusion are largely opt-in tools that the most addicted users predictably bypass, while operators' entire business model and advertising machine are engineered to maximize engagement from exactly those heavy losers. Regulation as practiced has not prevented these measurable harms; it has presided over them.",
      proponent_rebuttal:
        "Those harms are real, but the relevant policy comparison is not legalization versus a harm-free world — it is legalization versus the offshore black market that existed before, which had none of the safeguards regulators now mandate. Every legal jurisdiction requires operators to run self-exclusion programs, and most also require deposit, loss or time limits a bettor can set, responsible-gaming disclosures such as helpline numbers, and funding for treatment programs. Offshore books did none of this and could not be compelled to. The financial-harm studies also describe a young, lightly regulated market in its first few years; the regulatory toolkit is tightening — more than 80% of jurisdictions now have detailed advertising rules, and states including Colorado, Massachusetts, New Jersey and North Carolina require operators to use account data and automatic triggers to intervene with at-risk bettors. The honest position is that the first-generation mobile model was under-regulated, not that regulation is futile: the same data that reveals the harm also gives regulators, for the first time, the visibility to require limits, intervene with at-risk users, and fund the services that an underground market never could.",
      crux: {
        id: "regulatory-toolkit-efficacy",
        title: "The Harm-Reduction Toolkit Efficacy Test",
        question:
          "Can mandatory safeguards break the link between betting volume and harm, or do heavy losers evade them?",
        description:
          "Whether mandated consumer-protection tools — deposit/loss limits, affordability checks, self-exclusion, advertising limits, and operator duty-of-care obligations — can measurably reduce the bankruptcy, savings-depletion, and debt outcomes documented in the household-finance studies. If well-designed mandates demonstrably lower harm metrics relative to a lightly regulated baseline, the regulate-don't-ban case is vindicated. If harm tracks total betting volume regardless of safeguards (because the heaviest losers route around opt-in tools), then legalization's harms are structural, not fixable at the margin.",
        methodology:
          "Exploit the natural experiment of states and countries adopting different harm-reduction regimes at different times. Compare credit-bureau and bank-transaction outcomes (bankruptcy filings, savings rates, debt-in-collections, overdraft frequency) across jurisdictions that imposed mandatory (not opt-in) deposit limits, affordability checks, or advertising bans against otherwise-similar jurisdictions that did not, using a staggered difference-in-differences design. Pair this with operator-level data on what fraction of revenue comes from self-excluded or limit-hitting accounts to test whether mandates actually bind on the heaviest losers rather than only the casual majority.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Credit-bureau and bank-transaction outcomes (bankruptcy filings, savings rates, debt in collections) compared between jurisdictions that imposed mandatory deposit limits, affordability checks or ad bans and similar ones that did not.",
        },
        cost_to_verify:
          "$2-4M (Cross-jurisdiction econometric study requiring credit-bureau panels and confidential operator account-level data)",
        falsification: {
          supporter_flip:
            "If cross-jurisdiction analysis showed bankruptcy, savings-depletion, and debt outcomes track total betting volume regardless of which harm-reduction tools are mandated — because the heaviest losers reliably route around limits and self-exclusion — then the 'regulate the harm away' defense fails and the harms are structural to frictionless mobile betting.",
          skeptic_flip:
            "If jurisdictions with mandatory (not opt-in) affordability caps, enforced self-exclusion and ad limits showed far lower harm than the lightly regulated first US markets the harm studies measured, the view that regulation is futile would lose its footing.",
          common_ground:
            "Both sides accept the NBER and credit-bureau evidence that the early US mobile-betting model reduced savings and raised financial distress, concentrated among vulnerable households.",
          live_disagreement:
            "Whether stronger mandatory safeguards can decouple harm from betting volume, or whether the heaviest losers always evade opt-in protections — which only comparing jurisdictions with different mandated regimes can settle.",
        },
      },
      evidence: [
        {
          id: "nber-gambling-away-stability",
          title:
            "$1 of Online Betting Cuts Net Investment by ~$0.99 (NBER, 230,000+ Households)",
          description:
            "The NBER working paper 'Gambling Away Stability: Sports Betting's Impact on Vulnerable Households' (Baker, Balthrop, Johnson, Kotter & Pisciotta, Nov. 2024) used transaction-level data from 230,171 households through September 2023, by which time online sports betting was live in 25 states plus DC, in a staggered difference-in-differences design. It found that sports-betting spending does not displace other gambling or consumption — instead it significantly reduces savings, with $1 of online sports betting causing net investments to fall by about $0.99. Effects concentrated among financially constrained households: credit-card debt rose, available credit fell, and overdraft frequency increased.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source:
            "Baker, Balthrop, Johnson, Kotter & Pisciotta, 'Gambling Away Stability,' NBER Working Paper 33108 (2024)",
          sourceUrl: "https://www.nber.org/papers/w33108",
          reasoning:
            "A causal (difference-in-differences) design on a very large transaction-data panel by academic economists, distributed through NBER. High on all dimensions: the near-1:1 crowd-out of investment is the single most directly damaging finding for the 'it's just harmless entertainment spending' framing. Replicability is strong because the method is standard and the data type is reproducible, and the paper has since been published in the Journal of Financial Economics (2026).",
        },
        {
          id: "credit-scores-bankruptcy",
          title:
            "States That Legalized Sports Betting Saw Bankruptcies Rise ~28% and Debt in Collections 8%",
          description:
            "A separate 2024 working paper by Brett Hollenbeck (UCLA), Poet Larsen and Davide Proserpio (USC) used credit-bureau records for a representative sample of roughly 7 million US consumers. Compared with states that did not legalize, states that legalized sports betting saw credit scores fall by a modest but statistically significant amount (roughly 0.3% on average), bankruptcies rise 28%, and debt transferred to collectors climb 8%, with auto-loan delinquencies and use of debt-consolidation loans also rising. The effects were stronger in states that allow online betting and larger for young men in low-income counties.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Hollenbeck, Larsen & Proserpio, 'The Financial Consequences of Legalized Sports Gambling' (SSRN working paper, 2024), as reported by NBC News (Aug. 24, 2024)",
          sourceUrl:
            "https://www.nbcnews.com/business/consumer/online-sports-gambling-bankrupting-households-reducing-savings-rcna167235",
          reasoning:
            "An independent large-N study using objective credit-bureau outcomes, corroborating the NBER savings findings through a different harm channel (bankruptcy and delinquency). Directness and reliability are high. Slightly lower on replicability because the bankruptcy magnitude (28% in the 2024 draft) is an estimate sensitive to model specification and the paper was not yet peer reviewed, and correlation-vs-causation concerns are stronger for credit-score effects than for the transaction-level investment crowd-out.",
        },
        {
          id: "regulatory-protections-offshore-gap",
          title:
            "All 38 Legal Jurisdictions Require Self-Exclusion Programs; Most Also Mandate Betting Limits, Ad Rules and Treatment Funding",
          description:
            "The American Gaming Association's guide to responsible-gaming law in the 38 states and DC with commercial casinos, sports betting or internet gaming (as of January 31, 2025) finds that all 38 jurisdictions require operators to run self-exclusion programs. In 29, operators must give bettors a way to limit their own deposits, losses, wagers or time; 35 require responsible-gaming signage or disclosures such as helpline numbers; 34 restrict advertising; and 32 have codified funding for problem-gambling treatment, education or research. Rules are tightening: more than 80% of jurisdictions now have detailed advertising rules, up from 70% in 2022, and Colorado, Massachusetts, New Jersey and North Carolina require operators to use data and automatic triggers to intervene with at-risk bettors. Offshore books sit outside all of these rules.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 6,
            directness: 7,
          },
          source:
            "American Gaming Association, Responsible Gaming Regulations and Statutes Guide (2025)",
          sourceUrl:
            "https://web.archive.org/web/20260107023744/https://www.americangaming.org/resources/responsible-gaming-regulations-and-statutes-guide/",
          reasoning:
            "The existence of these mandated protections is factual and directly supports the regulate-don't-ban case. But the source is the industry's trade group (the AGA), independence is low, most of the limits are ones the bettor chooses to set, and — critically — the mere existence of opt-in tools does not establish that they reduce the harms documented by the NBER and credit-bureau studies. It is strong on 'these tools exist only in legal markets' and weak on 'these tools actually work,' which is exactly the open crux.",
        },
        {
          id: "crs-consumer-finance",
          title:
            "Congressional Research Service Flags Sports Betting's Documented Consumer-Finance Harms",
          description:
            "A Congressional Research Service In Focus (IF12761, issued September 2024 as 'Sports Gambling and Consumer Finance' and updated July 2026 as 'Sports Betting and Consumer Finance') summarized for lawmakers the academic evidence that legalized sports betting reduced household savings and investment, increased overdrafts and credit-card debt, lowered credit scores (by 0.3% on average after four years, and 1.0% where online betting was also allowed) and worsened bankruptcy rates, with effects most acute for low-income and financially constrained households. The CRS framing — a nonpartisan briefing for Congress — signals that the financial-harm findings have moved from advocacy claims into the mainstream policy-analysis literature. It lists bills that would restrict sports-betting advertising, set minimum federal standards and create a national self-exclusion list, and it notes that how well existing state protections work is debated.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 6,
            directness: 6,
          },
          source:
            "Congressional Research Service, 'Sports Betting and Consumer Finance' (IF12761, Sept. 2024; updated July 2026)",
          sourceUrl: "https://www.congress.gov/crs-product/IF12761",
          reasoning:
            "The CRS is Congress's nonpartisan research arm, giving very high independence. Its value is as a neutral synthesis confirming the harm literature is taken seriously at the federal level. Directness is moderate because it summarizes others' findings rather than producing new causal evidence, and as a briefing document it reflects rather than tests the underlying studies.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Sports Integrity & Addiction Externalities
    // =========================================================================
    {
      id: "integrity-and-addiction-externalities",
      title: "Sports Integrity & Addiction Externalities",
      short_summary:
        "Legal, monitored betting markets gave leagues and regulators transparency that exposed real match-fixing — but the same liquidity and player prop bets also created new manipulation incentives, and legalization is causally linked to surging problem-gambling helpline calls and a measurable rise in intimate-partner violence after upset losses. The debate is whether regulated monitoring and treatment infrastructure net-reduce these externalities, or whether legalization simply manufactures the addiction and integrity threats it then polices.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Legalization's externalities reach far beyond the bettor's own balance sheet. Massachusetts' problem-gambling helpline saw a 121% jump in calls (from 1,378 to 3,050) in the fiscal year online sports betting launched, with sports-betting-specific calls up over 1,000%; North Carolina's helpline calls more than doubled from February to March 2024, the month mobile betting launched, and April, May and June each set records. A University of Oregon study (Matsuzawa & Arnesen) using FBI NIBRS data found that after sports betting is legalized, the effect of unexpected NFL home-team losses on intimate-partner violence increases by roughly 9 percentage points, with larger effects where mobile betting is legal. On integrity, the flood of legal betting — especially granular player prop bets — created precisely the incentives that produced a wave of NCAA game-manipulation scandals and player bans. Legalization did not just reveal pre-existing problems; the addiction surge and the prop-bet manipulation incentives are new harms that frictionless, heavily advertised mobile betting manufactures.",
      proponent_rebuttal:
        "Regulated, monitored markets are the best available tool for protecting both vulnerable people and sporting integrity — far better than the offshore status quo. On integrity: legal sportsbooks share data with integrity firms (like U.S. Integrity) that flag anomalous line movements directly to leagues and law enforcement; it was exactly this monitoring that detected the suspicious Temple and Fresno State betting patterns and triggered the NCAA investigations and bans. Offshore books had no obligation to report anything, so manipulation simply went undetected. On addiction: rising helpline calls partly reflect that legal operators are now legally required to advertise the helpline on every spot — so some of the 'surge' is at-risk people finally being routed to help that did not exist underground; a Massachusetts health official said a third of calls were 'non-helpline calls,' many from bettors seeking technical help with betting apps, not crisis calls. The IPV and addiction harms are serious and argue for tighter rules — banning the riskiest prop bets, capping advertising, funding treatment — not for a return to prohibition, which would re-bury both the betting and the people who need help.",
      crux: {
        id: "monitoring-vs-manufacture",
        title: "The Net-Externality Test",
        question:
          "Does legal betting's monitoring and treatment prevent more harm than its added betting volume creates?",
        description:
          "Whether the regulated market's monitoring and treatment infrastructure net-reduces the social externalities of sports betting (match-fixing detection, helpline routing, funded treatment) by more than the legal market's expanded volume and prop-bet liquidity net-increases them (new addiction, new manipulation incentives, IPV). If legal monitoring catches more integrity threats than legal liquidity creates, and treatment infrastructure helps more people than the volume harms, the regulate case wins. If legalization manufactures more addiction and manipulation than its oversight catches, the externalities are net-negative versus prohibition.",
        methodology:
          "Build a net-externality ledger across staggered legalization dates. For integrity: compare detected-and-prosecuted manipulation cases (and their underlying base rate, estimated via integrity-firm alert data) in legal-monitored versus illegal-unmonitored regimes. For addiction: use the natural experiment of helpline-call series, treatment admissions, and validated problem-gambling prevalence surveys (e.g., PGSI) before and after legalization, separating genuine-distress calls from advertising-mandated technical calls. For IPV and other third-party harms: extend the NIBRS difference-in-differences design (Matsuzawa & Arnesen) across more states and outcomes. Combine into a common welfare metric to compare against the legal market's measured benefits.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A ledger built across staggered launch dates: detected and prosecuted match-fixing in monitored versus unmonitored markets, beside helpline calls, treatment admissions and problem-gambling prevalence surveys (PGSI) before and after launch.",
        },
        cost_to_verify:
          "$2-5M (Multi-domain causal study spanning crime data, integrity-firm alerts, clinical treatment records, and prevalence surveys)",
        falsification: {
          supporter_flip:
            "If a net-externality ledger showed legalization manufactures more new addiction, IPV, and prop-bet manipulation than its monitoring and treatment infrastructure catches or mitigates — i.e., the third-party harms clearly exceed prohibition's — then 'regulated monitoring protects integrity and people' fails on net.",
          skeptic_flip:
            "If integrity monitoring kept exposing match-fixing that offshore books would have hidden, and mandated helpline ads kept routing at-risk bettors into treatment, part of the measured 'surge' would look like harm finally detected rather than harm created.",
          common_ground:
            "Both sides agree problem-gambling helpline calls rose sharply after legalization, that legal monitoring has caught real integrity violations, and that granular prop bets create manipulation incentives.",
          live_disagreement:
            "Whether legalization's monitoring-and-treatment infrastructure net-reduces externalities or whether expanded volume and prop liquidity manufacture more harm than oversight catches — which only a combined cross-domain causal ledger can resolve.",
        },
      },
      evidence: [
        {
          id: "ipv-nibrs-study",
          title:
            "Legalization Amplified the Link Between NFL Upset Losses and Intimate-Partner Violence (~9 pts)",
          description:
            "Economists Kyutaro Matsuzawa and Emily Arnesen (University of Oregon) used FBI National Incident-Based Reporting System (NIBRS) data to study how sports-betting legalization affects intimate-partner violence. Building on prior findings that an unexpected NFL home-team loss raises local IPV by about 10%, they found that legalizing sports betting increases that upset-loss effect by roughly 9 additional percentage points (about 0.04 incidents per 100,000 people), with larger effects in states permitting mobile betting, in locations with higher bets placed, and around paydays. The work isolates a third-party harm — violence against partners — that falls on people who never placed a bet.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source:
            "Matsuzawa & Arnesen, 'Sports Betting Legalization Amplifies Emotional Cues & Intimate Partner Violence' (working paper, 2024)",
          sourceUrl:
            "https://www.opb.org/article/2024/10/30/think-out-loud-university-of-oregon-sports-gambling-intimate-partner-violence-football/",
          reasoning:
            "Uses objective FBI crime data and a plausible identification strategy (upset losses as an emotional/financial shock interacted with legalization). High independence (academic, no industry tie) and strong relevance to third-party externalities. Lower on replicability/reliability because it was a working paper at time of writing, IPV is underreported in NIBRS, and the effect size is small in absolute terms — though meaningful given the population scale.",
        },
        {
          id: "helpline-surge-ma",
          title:
            "Problem-Gambling Helpline Calls Surged 121% in Massachusetts the Year Online Betting Launched",
          description:
            "Massachusetts launched online sports betting on March 10, 2023. The state Department of Public Health reported the problem-gambling helpline received 3,050 calls in fiscal year 2023 (July 2022 through June 2023), up from 1,378 the prior year — a 121% increase — and that callers naming sports betting as their reason for seeking help rose from 6 to 73. In North Carolina, where mobile betting launched in March 2024, state data obtained by WRAL showed helpline calls more than doubling from 68 in February to 157 in March, with April, May and June each setting monthly records going back to 2010. DPH said, however, that the Massachusetts increase likely reflected better helpline services, awareness campaigns and the helpline advertising required to accompany sports-wagering ads, and that there was 'currently no evidence' it was a direct result of more problem gambling; the director of its problem-gambling office said one-third of the calls were 'non-helpline calls,' many from bettors seeking technical help with betting apps.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Massachusetts Department of Public Health, 'DPH report shows uptick in calls to state's problem gambling helpline' (May 15, 2024); CDC Gaming / State House News Service; WRAL (Aug. 23, 2024) for North Carolina",
          sourceUrl:
            "https://www.mass.gov/news/dph-report-shows-uptick-in-calls-to-states-problem-gambling-helpline",
          reasoning:
            "Official state public-health data with strong directness to the addiction-externality claim, and the timing (calls spiking exactly when mobile betting launched) is suggestive. The state's own caveat — that mandated helpline advertising and technical-support calls inflate the count, and that it sees no evidence yet of more problem gambling — is itself important nuance that cuts toward the proponent rebuttal, which is why this evidence is genuinely double-edged rather than purely 'against.'",
        },
        {
          id: "integrity-monitoring-caught-fixing",
          title:
            "Legal-Market Monitoring Detected Real Match-Fixing That Offshore Books Would Have Hidden",
          description:
            "Monitoring inside the regulated market has flagged the conduct it was built to catch. A Nevada sportsbook operator flagged three prop bets on the under for Fresno State forward Mykell Robinson in a January 7, 2025 game; the NCAA found Robinson altered his performance so the bets would win and in September 2025 ruled him, a teammate and a San Jose State player permanently ineligible. An unusual six-point line move before a March 7, 2024 UAB-Temple game triggered U.S. Integrity to alert its sportsbook clients; the NCAA later found former Temple guard Hysier Miller placed 42 parlay bets covering 23 Temple games, three of them against his own team, and ruled him permanently ineligible, though his attorney said the NCAA found no evidence he shaved points. During 2025 the NCAA ruled more than a dozen players from seven schools ineligible for betting violations, and in October 2025 it said it had opened cases into about 30 current and former men's basketball players.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "ESPN reporting on NCAA rulings: Temple (Nov. 21, 2025) and Fresno State / San Jose State (Sept. 2025)",
          sourceUrl:
            "https://www.espn.com/mens-college-basketball/story/_/id/47049132/ncaa-former-temple-men-basketball-player-bet-team",
          reasoning:
            "These are documented NCAA cases where regulated-market monitoring flagged suspicious betting, one of them a confirmed case of a player manipulating his own performance, directly supporting the 'transparency protects integrity' argument. The evidence is genuinely two-sided: it also shows that legal prop-bet liquidity created the manipulation incentive in the first place. It supports the proponent claim that detection improved under legalization, while implicitly conceding the skeptic point that the legal market expanded the attack surface.",
        },
        {
          id: "public-support-regulated-market",
          title:
            "Bipartisan Majority Backs Legal, Regulated Betting Over Prohibition",
          description:
            "American Gaming Association polling (Kantar online survey of 2,001 registered voters aged 21 and over, July 22 to August 8, 2025) found a bipartisan 74% of the public favor legal, regulated sports betting for adults in their state, and 21% of adults placed a sports bet in the past year. Public belief that the gaming industry is committed to encouraging responsible gaming and combating problem gambling rose from less than 40% in 2018 to 64% in 2025. Proponents read this as majority acceptance that the realistic choice is regulated legalization rather than prohibition.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 6,
            directness: 5,
          },
          source:
            "American Gaming Association, American Attitudes Toward Gaming (2025)",
          sourceUrl:
            "https://www.americangaming.org/resources/american-attitudes-towards-gaming/",
          reasoning:
            "Public-opinion data showing that prohibition lacks majority support and that the realistic policy frame is regulate-vs-black-market. Weighted low across the board: the source is the industry trade group (low independence), opinion polling is weak evidence on the underlying harm question, and popularity does not establish that legalization is welfare-improving — it only bears on political feasibility and the legitimacy of the regulate-don't-ban framing.",
        },
      ],
    },
  ],
  references: [
    {
      title:
        "Murphy v. National Collegiate Athletic Association, 584 U.S. 453 (2018) — Supreme Court opinion striking down PASPA",
      url: "https://www.law.cornell.edu/supremecourt/text/16-476",
    },
    {
      title:
        "Gambling Away Stability: Sports Betting's Impact on Vulnerable Households — Baker, Balthrop, Johnson, Kotter & Pisciotta, NBER WP 33108 (2024)",
      url: "https://www.nber.org/papers/w33108",
    },
    {
      title:
        "2024 Commercial Gaming Revenue Reaches $71.9B (sports-betting revenue of $13.71B) — American Gaming Association",
      url: "https://www.americangaming.org/2024-commercial-gaming-revenue-reaches-71-9b-marking-fourth-straight-year-of-record-revenue/",
    },
    {
      title:
        "Sizing the Illegal and Unregulated Gaming Markets ($511B total; ~$64B illegal sports betting) — American Gaming Association (2022)",
      url: "https://www.americangaming.org/new-aga-report-shows-americans-gamble-more-than-half-a-trillion-dollars-illegally-each-year/",
    },
    {
      title:
        "Legalized Gambling Increases Irresponsible Betting Behavior, Especially Among Low-Income Populations — UC San Diego Rady School",
      url: "https://today.ucsd.edu/story/legalized-gambling-increases-irresponsible-betting-behavior-especially-among-low-income-populations",
    },
    {
      title:
        "Sports Betting Tax Revenue: States, Sportsbooks, and Consumers — Tax Foundation",
      url: "https://taxfoundation.org/research/all/state/sports-betting-tax-revenue/",
    },
    {
      title:
        "Sports Betting and Consumer Finance (IF12761; first issued 2024 as 'Sports Gambling and Consumer Finance') — Congressional Research Service",
      url: "https://www.congress.gov/crs-product/IF12761",
    },
  ],
  questions: [
    {
      id: "q1",
      title:
        "Does legal mobile betting mostly capture existing illegal demand, or create vast new betting?",
      content:
        "An illegal market predated 2018, and as late as 2022 the industry's trade group estimated Americans still wagered $64 billion a year on sports with offshore and illegal books that pay no tax and offer no protections; geolocation data suggests enforcement moves some of those bettors to regulated sites. But legal mobile apps are frictionless and heavily advertised, and total US legal handle hit $148 billion in 2024 — more than double that illegal estimate. If most legal betting is displaced demand, the tax and consumer-protection upside is nearly free; if most is induced, then the documented financial and social harms are caused by legalization itself, not merely revealed by it.",
    },
    {
      id: "q2",
      title:
        "Can consumer-protection rules actually blunt the financial harm the data documents?",
      content:
        "The leading causal study found $1 of online betting cuts household net investment by about $0.99, and a credit-bureau analysis links legalization to a 28% rise in bankruptcies, with larger effects for young men in low-income counties. Regulated books are required to verify age, offer deposit limits and self-exclusion, and fund treatment — tools offshore books never provided. The open question is whether mandatory (not opt-in) limits, affordability checks, and advertising restrictions can decouple harm from betting volume, or whether the heaviest losers reliably evade safeguards so the harms are structural to frictionless mobile betting.",
    },
    {
      id: "q3",
      title:
        "Do regulated monitoring and treatment net-reduce externalities, or manufacture them?",
      content:
        "Legal-market integrity monitoring exposed real match-fixing — flagged line moves led to NCAA bans that offshore books would have hidden — and mandated helpline advertising routes at-risk people to treatment that did not exist underground. Yet the same legal liquidity and granular prop bets created the manipulation incentive, problem-gambling helpline calls surged over 100% in states like Massachusetts after launch, and FBI crime data shows legalization amplified intimate-partner violence after NFL upset losses. The crux is whether legalization's oversight catches and treats more harm than its expanded volume creates.",
    },
  ],
} satisfies TopicInput;
