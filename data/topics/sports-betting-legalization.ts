import type { Topic } from "@/lib/schemas/topic";

export const sportsBettingLegalizationData = {
  id: "sports-betting-legalization",
  title: "Legalizing Sports Betting",
  meta_claim:
    "States should legalize and regulate mobile sports betting rather than ban it",
  status: "contested" as const,
  category: "policy" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Since the Supreme Court struck down the federal ban in 2018 (Murphy v. NCAA), legal US sportsbooks have exploded from one state to 38-plus, taking a record $148 billion in bets in 2024 alone — yet the best causal study of the result found that for every $1 households bet online, their net investments fell by about 99 cents. The money is overwhelmingly not 'extra' entertainment spending; it is largely savings and stock investments that vanish, concentrated among financially fragile households.",
    confidence: 78,
    source:
      "Murphy v. NCAA (2018); American Gaming Association 2024 handle ($147.9B); Baker, Balthrop, Johnson, Kotter & Pisciotta, 'Gambling Away Stability,' NBER WP 33108 (2024)",
    sourceUrl: "https://www.nber.org/papers/w33108",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Sports betting was happening anyway — Americans wagered an estimated $64 billion a year with illegal bookies and offshore sites before legalization, with zero consumer protection, no tax collection, and no integrity monitoring; bringing that into the open captured roughly $3 billion in 2024 state tax revenue and routed suspicious-bet alerts to leagues that exposed real match-fixing.",
    "But the honest counterpoint is large and well-documented: the same convenience that displaces black-market betting also massively expands total betting, and the best household-finance studies find legalization reduces savings, raises bankruptcy and debt-collection rates, and concentrates harm on young, low-income men — costs a prohibition era largely externalized to bookies.",
    "So the real debate is not 'ban it or allow it' in the abstract — prohibition demonstrably failed and drove demand underground — but whether a tightly regulated market can keep the consumer-protection and tax upside while curbing the addiction, financial-ruin, and advertising-saturation harms that frictionless mobile betting predictably produces.",
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
        "Prohibition was not a neutral baseline — it was a failure that handed an enormous market to criminals. The American Gaming Association estimated Americans illegally wagered roughly $64 billion a year on sports with offshore and illegal bookies before legalization, generating no consumer protections, no taxes, and no integrity oversight. Legal mobile betting demonstrably pulls users out of that black market: GeoComply found that states cracking down on illegal operators saw legal active-account growth roughly twice as fast as states that did not. Legalization produced about $3 billion in 2024 state taxes, much of it statutorily earmarked for education, infrastructure, and problem-gambling services — money that simply did not exist when the activity was underground. The regressive-extraction critique is real but applies to every legal vice market (lotteries, alcohol, tobacco); the policy answer is to regulate harm with deposit limits and self-exclusion, not to push demand back to unregulated offshore sites where no such protections exist.",
      crux: {
        id: "induced-vs-displaced-demand",
        title: "The Induced-vs-Displaced Demand Test",
        description:
          "Whether legal mobile sports betting mostly relocates wagering that was already happening illegally (displacement) or mostly creates large new volumes of betting that would not otherwise have occurred (induced demand). If most legal handle is displaced black-market money, the net social cost is small and the tax/consumer-protection upside is nearly free. If most legal handle is induced — new bettors, new dollars, new addicts — then the harm metrics are caused by legalization itself, not merely revealed by it, and the cost-benefit calculus flips.",
        methodology:
          "Combine three data streams across states with staggered legalization dates: (1) pre-legalization estimates of illegal handle from GeoComply geolocation pings to offshore sites and AGA/Innovation Group survey data; (2) post-legalization legal handle and self-reported prior illegal betting from regulated operators' onboarding surveys; and (3) credit-bureau and bank-transaction panels (as in the NBER and UCSD studies) to measure whether total household gambling outflows rose or merely shifted channels. Use a staggered difference-in-differences design comparing newly legal states to not-yet-legal states to separate the displaced fraction from the induced fraction of total betting volume.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$1-2M (Multi-state econometric study requiring licensed credit-bureau panels, operator data, and geolocation datasets)",
        falsification: {
          supporter_flip:
            "If a clean difference-in-differences analysis showed that legalization mostly induces brand-new betting volume rather than displacing illegal handle — so total household gambling outflows jump sharply rather than merely changing channels — then the 'we're just capturing existing demand' defense collapses and legalization owns the resulting financial harm.",
          skeptic_flip:
            "A skeptic who treats all legal handle as new harm should weigh the AGA estimate of ~$64B in pre-existing illegal sports wagering and GeoComply evidence that enforcement converts offshore bettors to legal sites — meaning a substantial share of legal volume is displaced demand that already existed with worse protections.",
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
            "The Supreme Court's 6-3 decision in Murphy v. NCAA (May 14, 2018) struck down the 1992 federal sports-betting ban (PASPA) on Tenth Amendment anti-commandeering grounds, freeing states to legalize. By 2024, 38 states plus Washington, DC had authorized sports betting in some form, with 31 permitting statewide mobile wagering. The American Gaming Association reported legal sportsbooks took in a record $147.9 billion in bets in 2024 (95% online), up 23.6% year-over-year, producing $13.7 billion in operator revenue.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 9,
            directness: 7,
          },
          source:
            "Murphy v. NCAA, 584 U.S. 453 (2018); American Gaming Association, 2024 Commercial Gaming Revenue",
          sourceUrl:
            "https://www.americangaming.org/2024-commercial-gaming-revenue-reaches-71-9b-marking-fourth-straight-year-of-record-revenue/",
          reasoning:
            "The Murphy ruling and AGA handle figures are authoritative and uncontested in their order of magnitude (the AGA is the industry trade group, so it has incentive to report robust growth, but the handle data is corroborated by state regulators). This establishes the scale and speed of the post-2018 market but is neutral on whether the volume is displaced or induced — it directly supports 'a huge market now exists in the open.'",
        },
        {
          id: "illegal-market-displacement",
          title:
            "Americans Wagered ~$64B/Year Illegally on Sports Before Legalization; Enforcement Converts Bettors to Legal Sites",
          description:
            "A 2022 American Gaming Association report (research by The Innovation Group, survey of 5,284 adults) estimated Americans illegally wagered roughly $63.8 billion per year on sports with offshore and illegal bookies, costing states about $700 million in annual taxes and depriving consumers of any protection. The report found 49% of past-year sports bettors had used an illegal operator, and over half wrongly believed those operators were legal. GeoComply geolocation data showed that states which sent cease-and-desist letters to black-market operators saw legal active-account growth roughly twice as fast as non-enforcement states, indicating real migration from illegal to regulated channels.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 8,
          },
          source:
            "American Gaming Association, 'Sizing the Illegal and Unregulated Gaming Markets' (2022); GeoComply enforcement-impact data",
          sourceUrl:
            "https://www.americangaming.org/new-aga-report-shows-americans-gamble-more-than-half-a-trillion-dollars-illegally-each-year/",
          reasoning:
            "The illegal-market estimate is a survey-based extrapolation from an industry group with an interest in showing prohibition failed, so independence and replicability are moderate. But the underlying point — that a large illegal sports-betting market predated legalization and that enforcement migrates users to legal sites — is corroborated by independent GeoComply geolocation data and is the strongest evidence for the displacement (rather than induced-demand) interpretation.",
        },
        {
          id: "tax-revenue-3b",
          title:
            "Legal Sports Betting Generated ~$3 Billion in State Tax Revenue in 2024, Often Earmarked for Public Programs",
          description:
            "Across the 38 states with legal sports betting, operators paid approximately $2.99 billion in state taxes in 2024 on $13.7 billion in revenue, per Census Bureau and state-regulator data compiled by the Tax Foundation. New York alone collected roughly $1.2 billion under its 51% tax rate. Many states statutorily earmark portions for education, infrastructure, and problem-gambling treatment funds. Tax rates vary enormously — from 6.75% in Nevada and Iowa to 51% in New York — making the revenue highly sensitive to rate design.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Tax Foundation, 'Sports Betting Tax Revenue'; US Census Bureau Quarterly Summary of State and Local Tax Revenue",
          sourceUrl:
            "https://taxfoundation.org/research/all/state/sports-betting-tax-revenue/",
          reasoning:
            "The Tax Foundation is a credible, independent fiscal-policy research organization, and the underlying figures come from official Census and state-regulator data. The revenue is real and directly supports the fiscal case, but its modest size relative to state budgets — and relative to estimated financial harms — is exactly why skeptics argue it does not justify the externalities. Directness is moderate because tax revenue alone does not net out social costs.",
        },
        {
          id: "regressive-extraction-ucsd",
          title:
            "Legalization Drove More Problematic Gambling Among Low-Income Bettors; 96% Lost Money",
          description:
            "A UC San Diego Rady School of Management study analyzed five years of bank-transaction data from 717,724 online gamblers across 32 states (with ~250,000 having direct-deposit income data). It found 96% of gamblers lost money over the period and only 4% profited. Among bettors, 43% exceeded the recommended threshold of 1% of monthly income spent on gambling, 5.3% spent more than 10% of monthly income, and 3.2% spent more than 15%. The authors concluded that online-gambling legalization 'leads to far more problematic gambling among lower-income gamblers than among higher-income gamblers,' making the resulting tax revenue a regressive transfer disproportionately funded by those least able to afford it.",
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
            "A large-sample study using actual transaction data from academic researchers at credible institutions, with strong directness to the regressivity claim. It establishes that gambling losses (and thus the tax base) are concentrated among lower-income and problem gamblers. The main limitation is that 96%-lose is inherent to the negative-sum structure of all gambling and not unique to legalization, so it indicts the activity's economics more than the legalize-vs-prohibit choice specifically.",
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
        "The strongest case against the post-2018 mobile-betting model is the household-finance evidence, and it is damning. The leading causal study (NBER WP 33108, Baker et al. 2024), using transaction data from over 230,000 households across 26 states, found that $1 of online sports betting causes net investments to fall by about $0.99 — meaning the money is not displaced entertainment spending but vanished savings and stock investments. A separate credit-bureau study of millions of consumers found that legalizing online sports betting increased the risk of bankruptcy by roughly 25-30%, raised debt sent to collections, and increased auto-loan delinquency. Harm concentrates among financially constrained households — credit-card debt rises, available credit falls, and overdrafts increase. Deposit limits and self-exclusion are largely opt-in tools that the most addicted users predictably bypass, while operators' entire business model and advertising machine are engineered to maximize engagement from exactly those heavy losers. Regulation as practiced has not prevented these measurable harms; it has presided over them.",
      proponent_rebuttal:
        "Those harms are real, but the relevant policy comparison is not legalization versus a harm-free world — it is legalization versus the offshore black market that existed before, which had none of the safeguards regulators now mandate. Legal operators are required to verify age and identity (blocking minors), offer deposit and time limits, honor self-exclusion registries, display problem-gambling helpline numbers on every ad, and fund treatment programs through earmarked taxes. Offshore books did none of this and could not be compelled to. The financial-harm studies also describe a young, lightly regulated market in its first few years; the regulatory toolkit is tightening — multiple states have moved toward mandatory affordability checks, advertising restrictions, and bans on certain risky bets. The honest position is that the first-generation mobile model was under-regulated, not that regulation is futile: the same data that reveals the harm also gives regulators, for the first time, the visibility to require limits, intervene with at-risk users, and fund the services that an underground market never could.",
      crux: {
        id: "regulatory-toolkit-efficacy",
        title: "The Harm-Reduction Toolkit Efficacy Test",
        description:
          "Whether mandated consumer-protection tools — deposit/loss limits, affordability checks, self-exclusion, advertising limits, and operator duty-of-care obligations — can measurably reduce the bankruptcy, savings-depletion, and debt outcomes documented in the household-finance studies. If well-designed mandates demonstrably lower harm metrics relative to a lightly regulated baseline, the regulate-don't-ban case is vindicated. If harm tracks total betting volume regardless of safeguards (because the heaviest losers route around opt-in tools), then legalization's harms are structural, not fixable at the margin.",
        methodology:
          "Exploit the natural experiment of states and countries adopting different harm-reduction regimes at different times. Compare credit-bureau and bank-transaction outcomes (bankruptcy filings, savings rates, debt-in-collections, overdraft frequency) across jurisdictions that imposed mandatory (not opt-in) deposit limits, affordability checks, or advertising bans against otherwise-similar jurisdictions that did not, using a staggered difference-in-differences design. Pair this with operator-level data on what fraction of revenue comes from self-excluded or limit-hitting accounts to test whether mandates actually bind on the heaviest losers rather than only the casual majority.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$2-4M (Cross-jurisdiction econometric study requiring credit-bureau panels and confidential operator account-level data)",
        falsification: {
          supporter_flip:
            "If cross-jurisdiction analysis showed bankruptcy, savings-depletion, and debt outcomes track total betting volume regardless of which harm-reduction tools are mandated — because the heaviest losers reliably route around limits and self-exclusion — then the 'regulate the harm away' defense fails and the harms are structural to frictionless mobile betting.",
          skeptic_flip:
            "A skeptic who calls regulation futile should weigh that legal operators can be compelled to verify age, honor self-exclusion, and impose hard affordability caps that offshore books cannot — and that jurisdictions with mandatory (not opt-in) limits and ad restrictions are the untested comparison, not the lightly regulated first-generation US market the harm studies measured.",
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
            "The NBER working paper 'Gambling Away Stability: Sports Betting's Impact on Vulnerable Households' (Baker, Balthrop, Johnson, Kotter & Pisciotta, Nov. 2024) used transaction-level data from over 230,000 households across 26 states with legal sports betting (2018-2023) in a staggered difference-in-differences design. It found that sports-betting spending does not displace other gambling or consumption — instead it significantly reduces savings, with $1 of online sports betting causing net investments to fall by about $0.99. Effects concentrated among financially constrained households: credit-card debt rose, available credit fell, and overdraft frequency increased.",
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
            "A causal (difference-in-differences) design on a very large transaction-data panel by academic economists, distributed through NBER. High on all dimensions: the near-1:1 crowd-out of investment is the single most directly damaging finding for the 'it's just harmless entertainment spending' framing. Replicability is strong because the method is standard and the data type is reproducible, though as a working paper it had not completed full peer review at time of writing.",
        },
        {
          id: "credit-scores-bankruptcy",
          title:
            "Legal Online Betting Raised Bankruptcy Risk ~25-30% and Debt in Collections",
          description:
            "A separate 2024 analysis of credit-bureau records from more than 4 million consumers found that in states that legalized online sports betting, credit scores fell by a small but statistically significant amount, bankruptcies rose, and debt transferred to collections increased about 8%. The researchers estimated online betting specifically increased the risk of bankruptcy by roughly 25-30%, with auto-loan delinquencies and use of debt-consolidation loans also rising. As with the NBER study, effects were largest among financially constrained, lower-income households.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Academic credit-bureau analysis (4M+ consumers) summarized by Stateline / NBC News (2024)",
          sourceUrl:
            "https://www.nbcnews.com/business/consumer/online-sports-gambling-bankrupting-households-reducing-savings-rcna167235",
          reasoning:
            "An independent large-N study using objective credit-bureau outcomes, corroborating the NBER savings findings through a different harm channel (bankruptcy and delinquency). Directness and reliability are high. Slightly lower on replicability because the bankruptcy-risk magnitude (25-30%) is an estimate sensitive to model specification, and correlation-vs-causation concerns are stronger for credit-score effects than for the transaction-level investment crowd-out.",
        },
        {
          id: "regulatory-protections-offshore-gap",
          title:
            "Regulated Books Mandate Age Checks, Self-Exclusion, and Helpline Funding That Offshore Books Never Provided",
          description:
            "Legal US sportsbooks operate under state-regulator mandates that offshore operators never faced: identity and age verification (blocking minors), self-exclusion registries, voluntary deposit and time limits, mandatory display of problem-gambling helpline numbers on advertising, and statutory contributions to problem-gambling treatment funds. Public trust that the industry is committed to responsible gaming rose from under 40% in 2018 to 64% by 2025 (AGA polling), and by 2026 regulators had begun tightening rules — several states banned individual college-athlete prop bets and moved toward affordability checks and advertising limits, illustrating that the legal framework gives regulators levers an underground market does not.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 6,
            directness: 7,
          },
          source:
            "American Gaming Association responsible-gaming reporting; state regulatory rule changes (2024-2026)",
          sourceUrl:
            "https://www.americangaming.org/advocacy/supporting-the-legal-sports-betting-market/",
          reasoning:
            "The existence of these mandated protections is factual and directly supports the regulate-don't-ban case. But the source is largely industry-affiliated (the AGA), independence is low, and — critically — the mere existence of opt-in tools does not establish that they reduce the harms documented by the NBER and credit-bureau studies. It is strong on 'these tools exist only in legal markets' and weak on 'these tools actually work,' which is exactly the open crux.",
        },
        {
          id: "crs-consumer-finance",
          title:
            "Congressional Research Service Flags Sports Betting's Documented Consumer-Finance Harms",
          description:
            "A Congressional Research Service report ('Sports Gambling and Consumer Finance,' IF12761) summarized for lawmakers the emerging academic evidence that legalized online sports betting is associated with reduced household savings and investment, increased credit-card debt and delinquency, and higher bankruptcy risk, with effects concentrated among financially vulnerable households. The CRS framing — a nonpartisan briefing for Congress — signals that the financial-harm findings have moved from advocacy claims into the mainstream policy-analysis literature, prompting federal interest in interventions such as advertising rules and affordability standards.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 6,
            directness: 6,
          },
          source:
            "Congressional Research Service, 'Sports Gambling and Consumer Finance' (IF12761)",
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
        "Legalization's externalities reach far beyond the bettor's own balance sheet. Massachusetts' problem-gambling helpline saw a 121% jump in calls (from 1,378 to 3,050) in the fiscal year online sports betting launched, with sports-betting-specific calls up over 1,000%; North Carolina saw a 150% spike, with the average caller's age dropping from 42 to 37. A University of Oregon study (Matsuzawa & Arnesen) using FBI NIBRS data found that after sports betting is legalized, the effect of unexpected NFL home-team losses on intimate-partner violence increases by roughly 9 percentage points, with larger effects where mobile betting is legal. On integrity, the flood of legal betting — especially granular player prop bets — created precisely the incentives that produced a wave of NCAA game-manipulation scandals and player bans. Legalization did not just reveal pre-existing problems; the addiction surge and the prop-bet manipulation incentives are new harms that frictionless, heavily advertised mobile betting manufactures.",
      proponent_rebuttal:
        "Regulated, monitored markets are the best available tool for protecting both vulnerable people and sporting integrity — far better than the offshore status quo. On integrity: legal sportsbooks share data with integrity firms (like U.S. Integrity) that flag anomalous line movements directly to leagues and law enforcement; it was exactly this monitoring that detected the suspicious Temple and Fresno State betting patterns and triggered the NCAA investigations and bans. Offshore books had no obligation to report anything, so manipulation simply went undetected. On addiction: rising helpline calls partly reflect that legal operators are now legally required to advertise the helpline on every spot — so some of the 'surge' is at-risk people finally being routed to help that did not exist underground; Massachusetts officials noted up to a third of calls were technical-support, not crisis, calls. The IPV and addiction harms are serious and argue for tighter rules — banning the riskiest prop bets, capping advertising, funding treatment — not for a return to prohibition, which would re-bury both the betting and the people who need help.",
      crux: {
        id: "monitoring-vs-manufacture",
        title: "The Net-Externality Test",
        description:
          "Whether the regulated market's monitoring and treatment infrastructure net-reduces the social externalities of sports betting (match-fixing detection, helpline routing, funded treatment) by more than the legal market's expanded volume and prop-bet liquidity net-increases them (new addiction, new manipulation incentives, IPV). If legal monitoring catches more integrity threats than legal liquidity creates, and treatment infrastructure helps more people than the volume harms, the regulate case wins. If legalization manufactures more addiction and manipulation than its oversight catches, the externalities are net-negative versus prohibition.",
        methodology:
          "Build a net-externality ledger across staggered legalization dates. For integrity: compare detected-and-prosecuted manipulation cases (and their underlying base rate, estimated via integrity-firm alert data) in legal-monitored versus illegal-unmonitored regimes. For addiction: use the natural experiment of helpline-call series, treatment admissions, and validated problem-gambling prevalence surveys (e.g., PGSI) before and after legalization, separating genuine-distress calls from advertising-mandated technical calls. For IPV and other third-party harms: extend the NIBRS difference-in-differences design (Matsuzawa & Arnesen) across more states and outcomes. Combine into a common welfare metric to compare against the legal market's measured benefits.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$2-5M (Multi-domain causal study spanning crime data, integrity-firm alerts, clinical treatment records, and prevalence surveys)",
        falsification: {
          supporter_flip:
            "If a net-externality ledger showed legalization manufactures more new addiction, IPV, and prop-bet manipulation than its monitoring and treatment infrastructure catches or mitigates — i.e., the third-party harms clearly exceed prohibition's — then 'regulated monitoring protects integrity and people' fails on net.",
          skeptic_flip:
            "A skeptic should weigh that integrity monitoring demonstrably exposed real match-fixing that offshore books would have hidden, and that legally mandated helpline advertising routes at-risk people to treatment that did not exist underground — so part of the measured 'surge' is harm finally being detected and addressed, not solely harm created.",
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
            "Massachusetts launched online sports betting in March 2023. The state Department of Public Health reported the problem-gambling helpline received 3,050 calls in fiscal year 2023, up from 1,378 the prior year — a 121% increase — with sports-betting-specific concerns up more than 1,000%. North Carolina reported a roughly 150% spike in helpline calls after its 2024 mobile launch, with the average caller's age dropping from 42 to 37. State officials noted, however, that up to one-third of Massachusetts calls were 'non-helpline' technical-support requests for betting apps rather than crisis calls, and that legally required helpline advertising drove some of the increase.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Massachusetts DPH Office of Problem Gambling Services FY23 report; North Carolina problem-gambling program data",
          sourceUrl:
            "https://www.cbsnews.com/boston/news/massachusetts-gambling-addiction-sports-betting/",
          reasoning:
            "Official state public-health data with strong directness to the addiction-externality claim, and the timing (calls spiking exactly when mobile betting launched) supports causation. The state's own caveat — that mandated helpline advertising and technical-support calls inflate the count — is itself important nuance that cuts toward the proponent rebuttal, which is why this evidence is genuinely double-edged rather than purely 'against.'",
        },
        {
          id: "integrity-monitoring-caught-fixing",
          title:
            "Legal-Market Monitoring Detected Real Match-Fixing That Offshore Books Would Have Hidden",
          description:
            "Integrity-monitoring firms embedded in the regulated market detected the manipulation they were built to catch. An unusual six-point line shift before a March 2024 Temple game triggered U.S. Integrity to alert its sportsbook clients, helping expose betting violations; the NCAA later found former Temple guard Hysier Miller placed 42 bets including 23 Owls games and ruled him permanently ineligible. A Nevada sportsbook flagged suspicious prop bets that led to Fresno State and San Jose State player bans. Over a roughly one-year span the NCAA opened integrity investigations into about 40 athletes across 20 schools, with 11 found to have bet on their own performances or manipulated games — detections made possible because legal books are required to report anomalies.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "NCAA enforcement announcements (2024-2025); U.S. Integrity / sportsbook alert reporting (ESPN)",
          sourceUrl:
            "https://www.espn.com/mens-college-basketball/story/_/id/47049132/ncaa-former-temple-men-basketball-player-bet-team",
          reasoning:
            "These are documented, prosecuted cases where regulated-market monitoring exposed manipulation, directly supporting the 'transparency protects integrity' argument. The evidence is genuinely two-sided: it also shows that legal prop-bet liquidity created the manipulation incentive in the first place. It supports the proponent claim that detection improved under legalization, while implicitly conceding the skeptic point that the legal market expanded the attack surface.",
        },
        {
          id: "public-support-regulated-market",
          title:
            "Bipartisan Majority Backs Legal, Regulated Betting Over Prohibition",
          description:
            "American Gaming Association polling found a bipartisan 74% of the public favor legal, regulated sports betting for adults in their state, and 84% believe sports-event wagering should only be available through state-regulated online sportsbooks rather than offshore or unregulated alternatives. Public belief that the gaming industry is committed to responsible gaming and combating problem gambling rose from under 40% in 2018 to 64% by 2025. This reflects a durable policy consensus that the relevant choice is well-regulated legalization versus a return to the offshore black market, not legalization versus a betting-free society.",
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
      url: "https://www.supremecourt.gov/opinions/17pdf/16-476_dbfi.pdf",
    },
    {
      title:
        "Gambling Away Stability: Sports Betting's Impact on Vulnerable Households — Baker, Balthrop, Johnson, Kotter & Pisciotta, NBER WP 33108 (2024)",
      url: "https://www.nber.org/papers/w33108",
    },
    {
      title:
        "2024 Commercial Gaming Revenue Reaches $71.9B (record sports-betting handle of $147.9B) — American Gaming Association",
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
        "Sports Gambling and Consumer Finance (IF12761) — Congressional Research Service",
      url: "https://www.congress.gov/crs-product/IF12761",
    },
  ],
  questions: [
    {
      id: "q1",
      title:
        "Does legal mobile betting mostly capture existing illegal demand, or create vast new betting?",
      content:
        "Before 2018, Americans illegally wagered an estimated $64 billion a year on sports with offshore and illegal books that paid no tax and offered no protections, and enforcement data shows legalization migrates many of those bettors to regulated sites. But legal mobile apps are frictionless and heavily advertised, and total US handle hit $148 billion in 2024 — far above prior illegal estimates. If most legal betting is displaced demand, the tax and consumer-protection upside is nearly free; if most is induced, then the documented financial and social harms are caused by legalization itself, not merely revealed by it.",
    },
    {
      id: "q2",
      title:
        "Can consumer-protection rules actually blunt the financial harm the data documents?",
      content:
        "The leading causal study found $1 of online betting cuts household net investment by about $0.99, and credit-bureau analyses link legalization to a 25-30% higher bankruptcy risk, concentrated among financially fragile young men. Regulated books are required to verify age, offer deposit limits and self-exclusion, and fund treatment — tools offshore books never provided. The open question is whether mandatory (not opt-in) limits, affordability checks, and advertising restrictions can decouple harm from betting volume, or whether the heaviest losers reliably evade safeguards so the harms are structural to frictionless mobile betting.",
    },
    {
      id: "q3",
      title:
        "Do regulated monitoring and treatment net-reduce externalities, or manufacture them?",
      content:
        "Legal-market integrity monitoring exposed real match-fixing — flagged line moves led to NCAA bans that offshore books would have hidden — and mandated helpline advertising routes at-risk people to treatment that did not exist underground. Yet the same legal liquidity and granular prop bets created the manipulation incentive, problem-gambling helpline calls surged over 100% in states like Massachusetts after launch, and FBI crime data shows legalization amplified intimate-partner violence after NFL upset losses. The crux is whether legalization's oversight catches and treats more harm than its expanded volume creates.",
    },
  ],
} satisfies Omit<Topic, "confidence_score"> & {
  confidence_score?: number;
};
