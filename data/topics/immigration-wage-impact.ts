export const immigrationWageImpactData = {
  id: "immigration-wage-impact",
  title: "Immigration and Wages",
  question: "Does immigration push down wages for low-paid American workers?",
  meta_claim:
    "Large-scale immigration significantly depresses wages for native-born low-skilled workers.",
  status: "contested" as const,
  category: "policy" as const,
  // As of 3 November 2026: net migration may have turned negative in 2025
  // (AEI and Brookings estimates, via Bloomberg Law, March 2026); a CRS In
  // Focus (March 2026) summarised seven studies of past enforcement
  // programmes; East and Cox (The Conversation, May 2026) studied ICE arrest
  // spikes from October 2023 to November 2025.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "Net migration into the US may have been negative in 2025 for the first time in at least 50 years, by AEI and Brookings estimates, as arrivals collapsed and deportations rose. That turns an old argument into a live test. If immigrants hold down pay for the Americans they compete with, those workers should now be gaining. If immigrants mostly work alongside them, Americans could lose work too. Economists have fought over which it is since the Mariel boatlift of 1980.",
    confidence: 80,
    source:
      "Bloomberg Law, 'Immigration Crackdown Fails to Deliver Jobs for US-Born Workers' (10 March 2026), citing AEI and Brookings estimates",
    sourceUrl:
      "https://news.bloomberglaw.com/immigration/immigration-crackdown-fails-to-deliver-jobs-for-us-born-workers",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "The answer bears on the pay of Americans without college degrees who work alongside immigrants in construction, farming, food processing, cleaning and care, and on whether deporting their immigrant coworkers helps or hurts them.",
    "A bigger economy is not the same as higher wages for every group in it, so the fight is about particular workers: who competes with newcomers, who works alongside them, and over what period.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: When immigrants arrive, what happens to wages?
    // =========================================================================
    {
      id: "labor-market-economics",
      title: "When Immigrants Arrive, What Happens to Pay?",
      short_summary:
        "When some 125,000 Cubans reached Miami in 1980, adding 7% to its labour force, David Card found little change in local wages; George Borjas, reanalysing a narrower group, found a 10-30% fall. Nationally Borjas estimates a 3-4% wage cut per 10% more competing workers, while the National Academies found small effects over a decade. Whether the true effect is near zero or meaningful is the first split.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Immigrants do not just add workers; they add customers, and they fill different jobs. Economists call this complementarity: newcomers make native workers more productive, and their extra demand for goods and services offsets the added labor supply. When the Mariel boatlift added Cuban workers to Miami almost overnight in 1980, David Card found little effect on the wages or unemployment of less-skilled workers there, including earlier Cuban immigrants. The National Academies' 2017 review of decades of research found very small wage effects for native-born workers overall when measured over ten years or more. Less-educated immigrants tend to take manual and physical jobs, while similarly educated native-born workers move into jobs that need English and communication skills, as Giovanni Peri and Chad Sparber documented; each group makes the other more productive. A construction crew needs both the framer and the supervisor. Where wage losses show up, they fall mostly on earlier immigrants, the people most like the newcomers.",
      proponent_rebuttal:
        "More workers competing for the same jobs means lower pay for those jobs: a labor-supply shock hits the native workers who compete directly with new arrivals, even when the economy as a whole grows. George Borjas grouped American men by education and experience and found that a 10% rise in the number of workers in a group cut that group's wages by 3-4%. His 2017 reanalysis of Mariel, focused on non-Hispanic men aged 25-59 without a high school diploma, estimated a 10-30% relative wage fall in Miami. Local comparisons like Card's can miss losses because native workers move away or stop moving in, which spreads the effect across the country. Even the National Academies found that where negative effects appear, they hit native-born workers without a high school diploma. A rise in total output says nothing about whether the dishwasher or the drywaller got a raise.",
      crux: {
        id: "wage-elasticity-immigration",
        title: "The Wage-Competition Test",
        question:
          "Does immigration barely move the wages of directly competing workers, or cut them meaningfully?",
        description:
          "For a defined group of native workers and time horizon, compare wages after an immigration shock with credible controls. Check whether the result survives changes in sample composition, native migration and comparison groups.",
        methodology:
          "Instrumental variable regressions exploiting exogenous immigration shocks (refugee resettlement, visa lotteries) to measure causal wage effects on native workers in the same skill cell (education x experience), controlling for local demand shocks.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Reanalyses of sudden-arrival episodes such as the Mariel boatlift by teams with opposing priors, using the same data and definitions agreed in advance of which native workers compete with the newcomers, repeated on new episodes as they occur.",
        },
        cost_to_verify: "$300K (Econometric analysis of existing Census and ACS data)",
        falsification: {
          supporter_flip:
            "If reliable comparisons repeatedly found little wage loss for the most directly competing workers after accounting for migration and changes in who was sampled, the case for substantial wage cuts would weaken.",
          skeptic_flip:
            "If meaningful wage losses persisted for those workers across credible comparison groups and stable samples, the claim that immigration has little effect on their wages would need revision.",
          common_ground:
            "Both sides agree that effects differ across workers and time periods, that any losses fall hardest on workers without a high school diploma and on earlier immigrants, and that higher total GDP does not show low-paid workers gained.",
          live_disagreement:
            "Which wage losses are caused by immigration, for which workers and over what period? The Mariel debate concerns local survey samples and controls; the 2003 national study compares education and experience groups.",
        },
      },
      evidence: [
        {
          id: "borjas-national-2003",
          title: "Borjas 2003: 10% More Competing Workers Cut Their Wages 3-4%",
          description:
            "Borjas grouped men by education and experience using national Census and pooled CPS data. He estimated a 3-4% wage reduction for competing workers per 10% increase in their group's labor supply. This is a separate design from his Miami reanalysis.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "George J. Borjas, 'The Labor Demand Curve Is Downward Sloping: Reexamining the Impact of Immigration on the Labor Market,' Quarterly Journal of Economics 118(4), 1335-1374 (2003)",
          sourceUrl: "https://gborjas.scholars.harvard.edu/file_url/187",
          reasoning:
            "Peer-reviewed and national, so it avoids the problem that workers move between cities. The result depends on assuming that workers of different ages and education levels are poor substitutes for each other; other economists using different assumptions find smaller effects.",
        },
        {
          id: "borjas-reanalysis",
          title: "Borjas 2017: Mariel Cut Wages 10-30% for Miami Men Without a Diploma",
          description:
            "Borjas's 2017 reanalysis estimated a 10-30% relative wage decline among non-Hispanic men aged 25-59 without a high school diploma. This subgroup proxies for native workers because the early survey did not record birthplace. The estimate varies with the sample and comparison cities; it is not a national average.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 9,
          },
          source:
            "George J. Borjas, 'The Wage Impact of the Marielitos: A Reappraisal,' ILR Review, Vol. 70, No. 5 (2017), pp. 1077-1110 (NBER WP 21588)",
          sourceUrl: "https://gborjas.scholars.harvard.edu/file_url/183",
          reasoning:
            "Clemens and Hunt (2019) attribute the measured decline to a changing racial mix in small survey samples; Borjas (2019) disputes that explanation and reports recovery by 1990. Both papers are linked in further reading. A local subgroup estimate does not establish a permanent nationwide loss.",
        },
        {
          id: "card-mariel-boatlift",
          title: "Card 1990: Mariel Boatlift Left Miami Wages Largely Unchanged",
          description:
            "Using Current Population Survey data for 1979-1985, Card found little effect on the wages or unemployment of less-skilled Miami workers after the boatlift, including earlier Cuban immigrants. The study compares Miami with other cities.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 6,
            directness: 9,
          },
          source:
            "David Card, 'The Impact of the Mariel Boatlift on the Miami Labor Market,' Industrial and Labor Relations Review, Vol. 43, No. 2 (1990), pp. 245-257",
          sourceUrl: "https://davidcard.berkeley.edu/papers/mariel-impact.pdf",
          reasoning:
            "A natural experiment with a sudden, large arrival, part of the work for which Card shared the 2021 Nobel prize. Its findings concern the sampled Miami groups and period, and survey samples of the most exposed workers were small.",
        },
        {
          id: "nas-report-2017",
          title: "National Academies 2017: Very Small Wage Effects Over 10+ Years",
          description:
            "The National Academies' report finds very small wage effects for native-born workers overall when measured over 10 years or more. Where negative wage effects are found, prior immigrants and native-born workers without a high school diploma are most likely to be affected. An overall average does not establish the effect on every subgroup.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source:
            "National Academies of Sciences, Engineering, and Medicine, 'The Economic and Fiscal Consequences of Immigration' (2017)",
          sourceUrl:
            "https://www.nationalacademies.org/news/new-report-assesses-the-economic-and-fiscal-consequences-of-immigration",
          reasoning:
            "The most authoritative synthesis. It supports small average effects and concentrated losses at once, so each side quotes a different sentence of it.",
        },
        {
          id: "peri-sparber-complementarity",
          title: "Peri and Sparber 2009: Natives Shift to Communication Jobs, Limiting Wage Pressure",
          description:
            "Using occupational task data and U.S. Census data, Peri and Sparber find that less-educated immigrants specialize in manual and physical tasks while similarly educated native workers shift toward communication-intensive jobs. They argue that this adjustment helps explain modest wage effects. It does not establish that no native worker faces competition.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "Giovanni Peri and Chad Sparber, 'Task Specialization, Immigration, and Wages,' American Economic Journal: Applied Economics 1(3), 135-169 (2009)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/app.1.3.135",
          reasoning:
            "Explains how wages could stay steady: native workers move up into jobs immigrants are less able to do. Native workers who cannot make that move, for example those with little schooling, gain less from it.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: When immigrants leave, do wages rise?
    // =========================================================================
    {
      id: "removal-experiments",
      title: "When Immigrants Leave, Do Americans Gain?",
      short_summary:
        "The US has run the experiment in reverse several times: the 1930s repatriations, the 1964 end of the bracero farmworker program, the 2008-13 Secure Communities deportations, and the 2025-26 crackdown. Most studies find little or no gain for US-born workers, with small gains in the lowest-paid jobs. Whether removal raises American pay, or removes jobs along with workers, is the second split.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Every time the US has removed immigrant workers to help Americans, Americans did not get the jobs. When almost half a million Mexican bracero farmworkers were excluded in 1964 to improve conditions for US farmworkers, Michael Clemens and colleagues could not reject zero effect on domestic wages or employment. The 1930s repatriations of Mexicans and Mexican Americans brought no gain in native employment or wages, and possibly losses. Secure Communities, which led to hundreds of thousands of deportations from 2008, was followed by small declines in US-born employment and wages overall. And studying ICE arrest spikes from October 2023 to November 2025, Chloe East and Elizabeth Cox found employment fell among US-born workers too, with no increase in their wages: when undocumented framers leave a site, the electrician and the supervisor lose work as well.",
      proponent_rebuttal:
        "The removal studies measure short, disruptive shocks, not a settled policy of enforcing the law, and even they find gains where competition is closest. The Congressional Research Service's 2026 summary of seven studies notes that under Secure Communities, employment rose for US-born workers with a high school degree or less in the lowest-paid occupations, and that US-born employment rose in lower-skilled construction jobs. Those are exactly the workers this debate is about. In 2026 pay rose faster in construction and hotels than in the economy as a whole, as employers competed for fewer workers. Steven Camarota of the Center for Immigration Studies argues that over time a smaller immigrant population could draw Americans who have left the workforce back in, and that one year is too short to tell. Employers who mechanise instead of hiring Americans at higher pay are still raising productivity.",
      crux: {
        id: "removal-wage-effect",
        title: "The Reverse-Experiment Test",
        question:
          "When immigrant workers are removed, do the wages and jobs of US-born workers in the same trades rise?",
        description:
          "Compare US-born workers' wages and employment, by education and occupation, in places that lost many immigrant workers through enforcement with similar places that did not, over several years rather than months.",
        methodology:
          "Difference-in-differences and event-study designs using county or commuting-zone variation in removals (Secure Communities rollout, 287(g) agreements, 2025-26 ICE arrest spikes), with Current Population Survey and payroll data on US-born workers by occupation, and checks for mechanisation and firm closures.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Payroll and survey data on US-born workers without a degree, by occupation, in counties with large 2025-26 losses of immigrant workers versus similar counties without them, tracked through 2028 to separate short disruption from lasting effects.",
        },
        cost_to_verify: "$100K-$300K (public survey data; payroll data by agreement)",
        falsification: {
          supporter_flip:
            "If counties that lost many immigrant workers in 2025-26 showed, by 2028, rising wages and employment for US-born workers without degrees in the same trades, compared with similar counties, the case that removal brings no gain would weaken.",
          skeptic_flip:
            "If those counties showed flat or falling wages and employment for US-born workers by 2028, as past programmes did, the view that enforcement raises American pay would be hard to hold.",
          common_ground:
            "Both sides agree the immigrant workforce shrank in 2025, that past removal programmes produced at most small gains for US-born workers in the lowest-paid jobs, and that a year or two of data cannot show long-run effects.",
          live_disagreement:
            "Whether removing immigrant workers raises pay for the Americans who compete with them, or shrinks the businesses and jobs that employ both; and whether any gains justify deporting people who are working.",
        },
      },
      evidence: [
        {
          id: "crs-enforcement-studies-2026",
          title: "CRS 2026: Secure Communities Raised US-Born Employment Only in the Lowest-Paid Jobs",
          description:
            "A Congressional Research Service In Focus of March 2026 summarised seven quasi-experimental studies of the 287(g) and Secure Communities programmes. East et al. (2023) found Secure Communities 'was associated with small declines in employment and wages overall' for US-born workers, but employment rose for US-born workers with a high school degree or less in the lowest-paid occupations. Howard, Wang and Zhang (2025) found US-born employment rose in lower-skilled construction jobs, without fully replacing departing workers, and fell in higher-skilled ones; neither group saw higher wages. CRS describes 'mixed results on whether employment for U.S.-born people increased or decreased in low-wage labor markets.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source:
            "Congressional Research Service, 'Measuring the Impact of Immigration Enforcement on Labor Markets,' In Focus IF13188 (12 March 2026)",
          sourceUrl:
            "https://www.everycrsreport.com/files/2026-03-12_IF13188_3efdc81a4f88ccf0895850755d70f52974e7a964.html",
          reasoning:
            "A neutral summary from Congress's research service. It supports a narrow version of the competition story, gains for the lowest-paid US-born workers, alongside losses for others, so both sides draw on it. The gains were in jobs, not wages.",
        },
        {
          id: "wages-rising-tight-trades-2026",
          title: "Bloomberg Law 2026: Pay Rising Faster in Construction and Hotels as Immigrant Labor Shrinks",
          description:
            "Reporting in March 2026, Bloomberg Law found overall national wage growth slowing while construction and traveller accommodation showed faster pay increases. A frozen-meal company started pay at $20 an hour and sometimes added a few dollars to attract applicants. Steven Camarota of the Center for Immigration Studies said he hoped a smaller immigrant population would over time draw more Americans into work, but 'I don't know if one year is going to be enough to make much difference.'",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 4,
            directness: 4,
          },
          source:
            "Bloomberg Law, 'Immigration Crackdown Fails to Deliver Jobs for US-Born Workers' (10 March 2026)",
          sourceUrl:
            "https://news.bloomberglaw.com/immigration/immigration-crackdown-fails-to-deliver-jobs-for-us-born-workers",
          reasoning:
            "Early signs that employers in immigrant-heavy trades are paying more to find workers, which is what the competition theory predicts. It is reporting, not a study, and higher pay without more US-born hires may reflect shortages rather than gains for Americans.",
        },
        {
          id: "bracero-exclusion",
          title: "Clemens et al. 2018: Ending the Bracero Program Did Not Raise US Farmworkers' Pay",
          description:
            "In 1964 the US excluded almost half a million Mexican bracero farmworkers to improve farm labor market conditions for domestic workers. Using new state-level data on exposure to the exclusion, Michael Clemens, Ethan Lewis and Hannah Postel 'fail to reject zero labor market impact': domestic farmworkers' wages and employment did not measurably rise. The authors point to theories in which employers adopt labour-saving technology instead of hiring at higher pay.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source:
            "Clemens, Lewis & Postel, 'Immigration Restrictions as Active Labor Market Policy: Evidence from the Mexican Bracero Exclusion,' American Economic Review 108(6) (2018)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/aer.20170765",
          reasoning:
            "A clean policy experiment with an explicit goal of raising American wages, published in the top economics journal. It is one sector in the 1960s, when machines could replace hand harvesting; service jobs today may be harder to automate.",
        },
        {
          id: "repatriations-1930s",
          title: "Lee, Peri and Yasenov: 1930s Mexican Repatriations Brought No Gain in Native Jobs",
          description:
            "Studying the 1929-34 campaign by state and local authorities that pushed Mexicans and Mexican Americans to leave the US, across 893 cities with full-count Census data from 1930 and 1940, Jongkwan Lee, Giovanni Peri and Vasil Yasenov found repatriations were associated with small decreases in native employment and increases in native unemployment. Using an instrument based on the size of Mexican communities in 1930, they found no evidence that repatriations raised native employment; effects were nil or possibly negative for employment and wages.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "Lee, Peri & Yasenov, 'The Employment Effects of Mexican Repatriations: Evidence from the 1930's,' NBER Working Paper 23885 (2017)",
          sourceUrl: "https://www.nber.org/papers/w23885",
          reasoning:
            "The largest earlier removal episode, studied with full-count Census data. It took place during the Great Depression, when jobs were scarce for everyone, which limits how far it carries to a tight labour market.",
        },
        {
          id: "ice-spikes-2023-2025",
          title: "East and Cox 2026: ICE Arrest Spikes Cut US-Born Employment, With No Wage Gain",
          description:
            "Using data from October 2023 through November 2025, Chloe East and Elizabeth Cox of the University of Colorado Boulder compared places with sudden spikes in ICE arrests with places without them. Employment of likely undocumented immigrants who were not detained fell about 4% in sectors such as agriculture, construction, manufacturing and wholesale. 'Employment among U.S.-born workers also declined' in high-enforcement areas, with 'no increase in either employment or wages among U.S. citizens.'",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 8,
          },
          source:
            "Chloe N. East and Elizabeth Cox, 'When ICE ramped up enforcement, US-born workers didn't see any economic gains,' The Conversation, republished by Cobb County Courier (May 2026)",
          sourceUrl:
            "https://cobbcountycourier.com/2026/05/when-ice-ramped-up-enforcement-us-born-workers-didnt-see-any-economic-gains/",
          reasoning:
            "The first direct evidence on the current crackdown, and it matches the earlier programmes. It covers only about two years, is summarised by the authors rather than published as a peer-reviewed paper, and 'likely undocumented' is inferred from survey answers.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Long-run gains and who pays
    // =========================================================================
    {
      id: "long-term-economic-effects",
      title: "Long-Run Gains: Do Low-Paid Workers Share Them?",
      short_summary:
        "Immigrants found firms at higher rates, and CBO projected the 2021-26 surge would add $8.9 trillion to GDP over a decade. But CBO also found the surge cost state and local budgets a net $9.2 billion in 2023. Whether the long-run gains reach the workers and towns bearing the early costs is the third split.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Immigration makes the economy bigger and more inventive, and Americans share in that growth over time. From 2005 to 2010, immigrants in the US workforce founded firms at a rate of 0.83%, against 0.46% for native-born workers, about 80% higher, and firms with an immigrant founder were 35% more likely to hold a patent. In 2024 the Congressional Budget Office projected that the 2021-26 surge would add $8.9 trillion to cumulative GDP over 2024-2034 and $1.2 trillion to federal revenue, cutting deficits by $0.9 trillion. New firms hire American workers, and more people mean more customers for homes, cars and services. A shrinking workforce does the opposite: the Federal Reserve Bank of San Francisco found the crackdown cut growth of the prime-age labor force by almost a full percentage point in 2025.",
      proponent_rebuttal:
        "A larger economy does not guarantee higher wages for the workers who compete with newcomers. Costs arrive first and land locally: CBO estimated that in 2023 the surge added $10.1 billion in state and local revenue but $19.3 billion in spending, a net cost of $9.2 billion. The restrictionist group FAIR puts the net cost of illegal immigration across all levels of government at $150.7 billion a year. Federal surpluses decades out do not pay a school district's bills today. Total GDP rises with population, but what matters to a low-paid worker is GDP per person and their own pay, which aggregate projections do not report.",
      crux: {
        id: "distributional-impact",
        title: "The Who-Gains Test",
        question:
          "Do long-run growth gains outweigh short-term costs for low-skill native workers?",
        description:
          "Track wages, taxes and service use for matched low-skilled worker cohorts and receiving communities over a decade or more. Compare places with different immigration exposure, accounting for worker mobility and local demand.",
        methodology:
          "General equilibrium modeling with heterogeneous agents calibrated to US data, tracing how immigration-driven GDP growth is distributed across native workers by skill level, region, and over 1, 5, 10, and 30 year horizons.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Follow low-skilled native workers in high- and low-immigration regions for ten to twenty years using tax and census records, tracking earnings, job changes and moves, and set the losses in the first years against any later gains.",
        },
        cost_to_verify: "$2M (Multi-year modeling project with panel data)",
        falsification: {
          supporter_flip:
            "If credible comparisons showed that low-skilled native workers and receiving communities gained over time after accounting for early wage and public-service costs, the case for lasting concentrated losses would weaken.",
          skeptic_flip:
            "If the same workers and communities bore persistent net losses across credible comparisons, higher aggregate output would not establish that they benefited.",
          common_ground:
            "Both sides distinguish total output from the distribution of wages and public-service costs, and agree that federal gains and state and local costs fall on different budgets.",
          live_disagreement:
            "Whether low-skilled native workers and receiving communities share enough in long-run gains to offset costs they bear, using consistent worker groups, geography and time horizons.",
        },
      },
      evidence: [
        {
          id: "cbo-local-2025",
          title: "CBO 2025: The Surge Cost State and Local Budgets a Net $9.2 Billion in 2023",
          description:
            "CBO estimated that the surge beginning in 2021 added $10.1 billion in state and local revenues and $19.3 billion in spending in 2023, a direct net cost of $9.2 billion. Its alternative measure, including broader effects and nonbudgetary costs, estimated a potential net cost of $9.8 billion. These estimates cover one year and a specific surge, rather than all immigration.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source:
            "Congressional Budget Office, 'Effects of the Surge in Immigration on State and Local Budgets in 2023' (June 2025)",
          sourceUrl: "https://www.cbo.gov/publication/61256",
          reasoning:
            "A nonpartisan estimate with explicit accounting limits. It shares an agency and some assumptions with the federal projection, but covers different budgets and a different period. Fiscal costs are not a direct estimate of native workers' wage losses.",
        },
        {
          id: "fair-cost-estimates",
          title: "FAIR 2023: Illegal Immigration Costs $150.7 Billion a Year Net",
          description:
            "The restrictionist advocacy group FAIR estimated $182.1 billion in annual public spending and $31.4 billion in tax receipts, a net cost of $150.7 billion across federal, state and local governments. Its population includes an estimated 15.5 million unauthorized residents and 5.4 million U.S.-born children. This is not a state/local-only figure or an estimate for all immigrants.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 4,
            directness: 5,
          },
          source:
            "Federation for American Immigration Reform (FAIR), 'The Fiscal Burden of Illegal Immigration on United States Taxpayers' (2023)",
          sourceUrl:
            "https://www.fairus.org/issue/publications-resources/fiscal-burden-illegal-immigration-united-states-taxpayers-2023",
          reasoning:
            "An advocacy estimate whose population and accounting choices matter. Its annual totals cannot be compared directly with CBO's estimate for the incremental effect of a recent surge. Including U.S.-born children also differs from measuring only immigrants' own fiscal contributions.",
        },
        {
          id: "immigrant-entrepreneurship",
          title: "Azoulay et al. 2022: Immigrants Founded Firms at an 80% Higher Rate in 2005-2010",
          description:
            "For firms founded in 2005-2010 and surviving at least five years, Azoulay, Jones, Kim and Miranda estimated firm-founding rates of 0.83% among immigrants in the U.S. workforce and 0.46% among native-born workers, about 80% higher. Firms with an immigrant founder were 35% more likely to hold a patent. These are findings about the studied firms and period, not a current startup count.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 4,
          },
          source:
            "Pierre Azoulay, Benjamin F. Jones, J. Daniel Kim and Javier Miranda, 'Immigration and Entrepreneurship in the United States,' American Economic Review: Insights 4(1), 71-88 (2022), previously NBER WP 27778 (2020)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/aeri.20200588",
          reasoning:
            "Administrative and firm data support an entrepreneurship comparison across firm sizes. This does not by itself show whether low-skilled native workers receive higher wages, or establish the causal effect of changing immigration policy.",
        },
        {
          id: "cbo-2024-immigration",
          title: "CBO 2024: The 2021-26 Surge Projected to Add $8.9 Trillion to GDP Over a Decade",
          description:
            "In July 2024, CBO projected that its defined 2021-2026 surge would add $8.9 trillion to cumulative nominal GDP over 2024-2034, compared with a scenario without the surge. It projected $1.2 trillion more federal revenue and $0.9 trillion lower deficits, excluding discretionary spending changes and state/local budgets. These are projections from that report, not measured gains or a current forecast.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 3,
          },
          source:
            "Congressional Budget Office, 'Effects of the Immigration Surge on the Federal Budget and the Economy' (2024)",
          sourceUrl: "https://www.cbo.gov/publication/60165",
          reasoning:
            "A model-based comparison with substantial uncertainty, made before the 2025 policy changes cut immigration sharply. Cumulative nominal GDP is not income per person, and the federal result does not show whether low-skilled native workers benefit.",
        },
      ],
    },
  ],
  aliases: [
    "Does large-scale immigration significantly cut low-skilled native wages?",
    "Do immigrants take jobs from Americans?",
    "Will deporting immigrants raise wages?",
  ],
  references: [
    {
      title: "Measuring the Impact of Immigration Enforcement on Labor Markets - Congressional Research Service (12 March 2026)",
      url: "https://www.everycrsreport.com/files/2026-03-12_IF13188_3efdc81a4f88ccf0895850755d70f52974e7a964.html",
    },
    {
      title: "Clemens and Hunt (2019): critique of Mariel sample composition",
      url: "https://journals.sagepub.com/doi/10.1177/0019793918824597",
    },
    {
      title: "Borjas (2019): reply on the role of race and timing",
      url: "https://gborjas.scholars.harvard.edu/file_url/172",
    },
  ],
};
