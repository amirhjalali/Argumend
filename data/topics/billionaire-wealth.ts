export const billionaireWealthData = {
  id: "billionaire-wealth",
  title: "Should Billionaires Exist?",
  question: "Should policy stop billionaire-sized fortunes?",
  // Words readers use for this question that the map's own text does not,
  // and the map's question before the round-15 rewrite.
  aliases: [
    "Should taxes or structural reform prevent billionaire-scale wealth?",
    "Should billionaires exist?",
    "Is every billionaire a policy failure?",
  ],
  meta_claim:
    "The concentration of extreme wealth in billionaires is harmful to society and should be prevented through taxation or structural reform.",
  status: "contested" as const,
  category: "economics" as const,
  // As of 3 November 2026: Federal Reserve Distributional Financial Accounts
  // for 2026 Q2 (updated 18 September 2026): top 1% 32.5% of household net
  // worth, top 0.1% 15.0%, bottom 50% 2.3%.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "By the Federal Reserve's count, the richest 1% of U.S. households held 32.5% of all household wealth in mid-2026, up from 22.8% in 1989. The top 0.1% alone held 15.0%, more than six times the 2.3% held by the entire bottom half. The fight is over whether fortunes that large are the reward for building things people want, or a drag on opportunity and democracy that policy should stop.",
    confidence: 92,
    source:
      "Board of Governors of the Federal Reserve System, Distributional Financial Accounts, 2026 Q2 (via FRED series WFRBST01134, WFRBSTP1300 and WFRBSB50215, updated 18 September 2026)",
    sourceUrl: "https://fred.stlouisfed.org/series/WFRBST01134",
  },
  simple_case: [
    "The answer bears on proposals such as an annual wealth tax and limits on political spending, and on whether the next Amazon founder is someone to celebrate or a fortune to cap.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Where big fortunes come from — earned or extracted?
    // =========================================================================
    {
      id: "economic-impact",
      title: "Where Big Fortunes Come From",
      short_summary:
        "Today's richest Americans are less likely than in the past to have inherited their money, and most top incomes come from owners' own work. But some of the largest fortunes rest on market power a court has called illegal, and big fortunes keep compounding.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Most of today's great fortunes were built, not inherited. Kaplan and Rauh found today's Forbes 400 members 'are less likely to have inherited their wealth or to have grown up wealthy' than earlier ones, and more likely to have built firms in scalable industries such as technology, finance and mass retail. Tax data on 11 million firms show the typical top earner's income comes mostly from her own skill and work, not from capital: business profits fall by about three-quarters when the owner retires or dies. Those firms employ millions; Amazon alone had about 1,576,000 employees at the end of 2025. A billion-dollar stake is mostly the market value of a company people chose to buy from, not cash taken from anyone.",
      proponent_rebuttal:
        "Building something is how fortunes start; market power is how they become this large. A federal judge found in 2024 that Google illegally maintained its search monopoly, and in 2025 that it raised ad prices 'largely without losing advertisers' while its ad revenue tripled from $47 billion in 2014 to over $146 billion in 2021. Once made, big fortunes compound on their own: the 32 original 2010 Giving Pledge signers who are still billionaires saw their wealth grow 283% after signing, to $908 billion. The top 1%'s share of household wealth rose from 22.8% in 1989 to 32.5% in 2026 while the bottom half's fell from 3.5% to 2.3%. Effort does not explain a gap that wide.",
      crux: {
        id: "earned-or-extracted",
        title: "The Earned-or-Extracted Test",
        question:
          "Do the biggest fortunes come mostly from building companies, or from market power, inheritance and compounding?",
        description:
          "If most billionaire wealth comes from founding firms that create value for customers, capping it taxes the activity society most wants. If much of it comes from market power, inheritance or passive returns on assets, it is a transfer that policy can curb at little cost to growth.",
        methodology:
          "Classify the Forbes 400 by source of wealth (founder, heir, finance, real estate), the industry's concentration, and whether antitrust authorities or courts have found the main company held illegal market power. Decompose each fortune's growth since founding into new value created and rising valuations of existing assets, using public filings.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A breakdown of Forbes 400 fortunes by source (founding, inheritance, finance), by whether the founding firm was later found to hold illegal market power, and by how much growth came from rising valuations of assets already owned.",
        },
        cost_to_verify:
          "Not costed here; it uses public filings, court records and the Forbes lists.",
        falsification: {
          supporter_flip:
            "If a breakdown of the largest fortunes found nearly all came from founding firms in competitive markets, with little from inheritance, monopoly or passive asset growth, the claim that billionaire wealth is mostly extracted would fail.",
          skeptic_flip:
            "If the breakdown found most of the largest fortunes rest on market power courts have found illegal, inheritance or passive growth in asset prices, the 'they built it' defense would weaken sharply.",
          common_ground:
            "The richest Americans today are less likely than in the 1980s to have inherited their wealth, and billionaire-founded firms such as Amazon employ very large numbers of people.",
          live_disagreement:
            "Whether the largest fortunes are mostly the reward for building products people want, or are inflated by market power and compounding returns that policy could curb without hurting growth.",
        },
      },
      evidence: [
        {
          id: "bw-forbes-400-self-made",
          title: "Kaplan and Rauh 2013: today's Forbes 400 are 'less likely to have inherited their wealth or to have grown up wealthy'",
          description:
            "Testing explanations for rising top-end inequality, Steven Kaplan and Joshua Rauh found the evidence fits a 'superstar' account, scale plus skill-biased technology, better than theories based on managerial power or changing social norms. Forbes 400 members 'are less likely to have inherited their wealth or to have grown up wealthy' than in the past, and more likely to have applied their skills in scalable industries: technology, finance and mass retail.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "Steven N. Kaplan and Joshua Rauh, 'It's the Market: The Broad-Based Rise in the Return to Top Talent', Journal of Economic Perspectives 27(3): 35-56 (Summer 2013)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/jep.27.3.35",
          reasoning:
            "Peer-reviewed evidence that the richest are increasingly founders. 'Self-made' does not mean 'competitive': a founder can build a firm and then entrench it, which this paper does not test. Its data end in 2011.",
        },
        {
          id: "bw-human-capital-income",
          title: "Smith, Yagan, Zidar and Zwick 2019: most top income is owners' own human capital; profits fall ~75% when an owner dies or retires",
          description:
            "Linking 11 million firms to their owners in tax data, the authors find 'top pass-through profit accrues to working-age owners of closely-held, mid-market firms in skill-intensive industries.' Profits fall by about three-quarters after an owner retires or dies early. Classifying about three-quarters of that profit as a return to the owner's skills, they conclude the typical top earner gets most income from human capital, not financial capital.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 4,
          },
          source:
            "Matthew Smith, Danny Yagan, Owen Zidar and Eric Zwick, 'Capitalists in the Twenty-First Century', Quarterly Journal of Economics (2019); NBER Working Paper 25442",
          sourceUrl: "https://www.nber.org/papers/w25442",
          reasoning:
            "Strong tax-record evidence that top earners mostly work for their money. It is about top 0.1% incomes from mid-market firms, not billionaires' wealth in giant public companies, so directness is 4.",
        },
        {
          id: "bw-job-creation",
          title: "Amazon's 10-K: about 1,576,000 employees at the end of 2025",
          description:
            "Amazon reported that 'As of December 31, 2025, we employed approximately 1,576,000 full-time and part-time employees.' Its founder is among the world's richest people. Defenders of large fortunes point to firms like this as what the fortunes are a by-product of.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 6,
            replicability: 9,
            directness: 4,
          },
          source:
            "Amazon.com, Inc., Form 10-K for fiscal year 2025 (filed 6 February 2026), Human Capital",
          sourceUrl:
            "https://www.sec.gov/Archives/edgar/data/1018724/000101872426000004/amzn-20251231.htm",
          reasoning:
            "The headcount is a company filing and reliable. Whether those jobs depend on the founder holding a vast fortune, rather than on the company existing at all, is the open question, so directness is 4.",
        },
        {
          id: "bw-monopoly-profits",
          title: "Judge Mehta: Google raised search-ad prices without losing advertisers; ad revenue rose from $47B (2014) to $146B (2021)",
          description:
            "In the Google search case, the court found that 'Google is a monopolist, and it has acted as one to maintain its monopoly.' Its 2025 remedies opinion recounts that, 'unconstrained by rivals' pricing,' text-ad prices rose and Google 'has been able to raise its prices largely without losing advertisers.' Ad revenue grew from nearly $47 billion in 2014 to over $146 billion in 2021, and 'Google has used these monopoly profits' to pay for the next round of exclusive default deals.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 7,
            directness: 5,
          },
          source:
            "United States v. Google LLC, No. 20-cv-3010, Memorandum Opinion on remedies (D.D.C. 2 September 2025)",
          sourceUrl:
            "https://storage.courtlistener.com/recap/gov.uscourts.dcd.223205/gov.uscourts.dcd.223205.1436.0.pdf",
          reasoning:
            "A court finding that one of the largest fortunes rests partly on illegal market power. One company is not the whole Forbes list, and Google first grew by building a better search engine, so directness is 5.",
        },
        {
          id: "bw-fed-wealth-data",
          title: "Federal Reserve: the top 1%'s share of household wealth rose from 22.8% (1989) to 32.5% (2026); the bottom half's fell from 3.5% to 2.3%",
          description:
            "The Fed's Distributional Financial Accounts put the top 1%'s share of U.S. household net worth at 22.8% in the third quarter of 1989, 29.0% at the start of 2020 and 32.5% in the second quarter of 2026. The top 0.1% held 15.0%. The bottom 50% held 3.5% in 1989, fell to 0.4% in 2010-2012 after the housing crash, and held 2.3% in 2026.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 5,
          },
          source:
            "Federal Reserve Board, Distributional Financial Accounts, via FRED series WFRBST01134, WFRBSTP1300 and WFRBSB50215 (updated 18 September 2026)",
          sourceUrl: "https://fred.stlouisfed.org/data/WFRBST01134.txt",
          reasoning:
            "The official measure of how concentrated wealth is and how fast it has concentrated. It shows the size of the gap, not its causes or whether it harms anyone, so directness is 5.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Opportunity — does concentration choke mobility?
    // =========================================================================
    {
      id: "social-mobility",
      title: "Does It Shut Others Out?",
      short_summary:
        "The share of Americans who out-earn their parents fell from about 90% for those born in 1940 to about 50% for those born in the 1980s, and most of the fall traces to growth going to the top. But a child's odds of climbing the income ladder have held steady since the 1970s.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Concentration at the top has not closed the ladder. Chetty and colleagues found that rank-based mobility, a child's chance of rising above their parents' place in the income distribution, 'remained extremely stable' for Americans born from 1971 to 1993. Wealth at the bottom and middle can rise fast even as the top pulls away: between 2019 and 2022 the Fed's Survey of Consumer Finances found real median net worth surged 37%, 'the largest three-year increase' in the survey's modern history, against 23% for the mean, which 'imply some narrowing of the wealth distribution.' A billionaire's gain is not a worker's loss.",
      proponent_rebuttal:
        "The American promise was that children would do better than their parents, and that promise has collapsed. Chetty and colleagues found the share of children out-earning their parents fell from roughly 90% for those born in 1940 to about 50% for those born in the 1980s. Faster growth alone would not bring it back; shifting growth back to the more equal distribution of the 1940s would reverse 'more than 70% of the decline'. The same research team found the consequences of the 'birth lottery' are 'larger today than in the past' because the rungs of the ladder are further apart. The bottom half of households held just 2.3% of the country's wealth in mid-2026.",
      crux: {
        id: "wealth-concentration-mobility",
        title: "Wealth Concentration vs. Social Mobility",
        question:
          "Does wealth piling up at the top shut others out of getting ahead, or do both trends have other causes?",
        description:
          "If wealth concentration causes lower mobility, through housing, schools and political power, the fortunes harm people beyond their owners. If the two trends share causes, such as technology and the returns to college, capping fortunes would not reopen the ladder.",
        methodology:
          "Compare U.S. states, cities and countries over time on top wealth shares and on children's mobility (absolute and rank-based), controlling for education spending, tax policy and local labor markets. Use shocks that change top wealth sharply, such as stock-market booms concentrated in one place, to test whether mobility changes afterwards.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Cross-place and cross-country panels comparing top wealth shares with children's absolute and rank-based mobility, controlling for education, tax policy and local labor markets, with sharp local wealth booms used as natural experiments.",
        },
        cost_to_verify: "Not costed here; it uses tax-record mobility data and wealth estimates.",
        falsification: {
          supporter_flip:
            "If panels across places and countries found no link between top wealth shares and children's mobility once education, taxes and local labor markets were controlled for, the claim that concentration shuts others out would weaken.",
          skeptic_flip:
            "If places where top wealth shares rose fastest saw children's mobility fall afterwards, with education and labor markets controlled for, the claim that a billionaire's gain is no one's loss would fail.",
          common_ground:
            "The share of Americans out-earning their parents fell from about 90% for the 1940 birth cohort to about 50% for the 1980s, while rank-based mobility held steady for those born from 1971 to 1993.",
          live_disagreement:
            "Whether concentrated wealth itself shrinks opportunity, so curbing it would help others climb, or whether falling mobility and rising concentration share other causes that capping fortunes would not touch.",
        },
      },
      evidence: [
        {
          id: "bw-fading-american-dream",
          title: "Chetty et al. 2017: children out-earning their parents fell from ~90% (born 1940) to ~50% (1980s); fairer growth would reverse 70%+ of the fall",
          description:
            "Combining Census, CPS and tax data, the authors estimate 'absolute income mobility', the share of children who earn more than their parents. It fell from roughly 90% for children born in 1940 to about 50% for those born in the 1980s. Higher GDP growth alone would not restore it; shifting growth to the more equal distribution of the 1940 cohort would reverse 'more than 70% of the decline in mobility.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 5,
          },
          source:
            "Raj Chetty, David Grusky, Maximilian Hell, Nathaniel Hendren, Robert Manduca and Jimmy Narang, 'The Fading American Dream: Trends in Absolute Income Mobility Since 1940', Science 356 (2017); NBER Working Paper 22910",
          sourceUrl: "https://www.nber.org/papers/w22910",
          reasoning:
            "Leading evidence that how growth is shared shapes who gets ahead. It is about income distribution broadly, not billionaire wealth, and a counterfactual is not a measured effect of capping fortunes, so directness is 5.",
        },
        {
          id: "bw-relative-mobility-stable",
          title: "Chetty et al. 2014: rank-based mobility 'remained extremely stable' for Americans born 1971-1993",
          description:
            "Using tax records, the authors found that children entering the labor market had about the same odds of rising above their parents' position in the income distribution as children born in the 1970s. Rank-based measures 'remained extremely stable' for the 1971-1993 birth cohorts. Because inequality rose, the consequences of the 'birth lottery' are 'larger today than in the past.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 6,
          },
          source:
            "Raj Chetty, Nathaniel Hendren, Patrick Kline, Emmanuel Saez and Nicholas Turner, 'Is the United States Still a Land of Opportunity? Recent Trends in Intergenerational Mobility', NBER Working Paper 19844 (2014)",
          sourceUrl: "https://www.nber.org/papers/w19844",
          reasoning:
            "The best evidence that rising concentration has not made it harder to climb ranks. The same paper says the gaps between rungs widened, which the other side cites, so directness is 6.",
        },
        {
          id: "bw-scf-median-surge",
          title: "Fed SCF: real median net worth rose 37% from 2019 to 2022, the largest three-year rise on record, faster than the mean",
          description:
            "The Federal Reserve's Survey of Consumer Finances found real median net worth 'surged 37 percent' between 2019 and 2022 while mean net worth rose 23%, patterns that 'imply some narrowing of the wealth distribution.' It was 'the largest three-year increase over the history of the modern SCF, more than double the next-largest one on record.' Growth was largest for the bottom quartile, whose median net worth rose from $400 to $3,500.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 8,
            directness: 4,
          },
          source:
            "Federal Reserve Board, 'Changes in U.S. Family Finances from 2019 to 2022: Evidence from the Survey of Consumer Finances' (October 2023)",
          sourceUrl: "https://www.federalreserve.gov/publications/files/scf23.pdf",
          reasoning:
            "Shows ordinary households' wealth can grow fast while fortunes at the top exist. It covers a pandemic period of rising home prices and stimulus, and the Fed's quarterly accounts show the top 1% share higher in 2026 than in 2020, so directness is 4.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Political power — does wealth buy policy?
    // =========================================================================
    {
      id: "political-power",
      title: "Does Wealth Buy Policy?",
      short_summary:
        "A study of 1,779 policy questions found economic elites shaped outcomes while average citizens had little independent influence. A reanalysis found policy lands about where the middle class wants, because the rich and the middle usually agree. Philanthropy cuts both ways.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "The claim that the rich run Washington does not survive a closer look. Peter Enns showed that on most issues the middle class and the affluent rank policies the same way, so 'policy ends up about where we would expect if policymakers represented the middle class and ignored the affluent.' Where the rich get their way, it is usually because most voters agree with them. Billionaires also give on a scale governments rarely match: the original 2010 Giving Pledge signers have given an estimated $206 billion. Billionaires fund causes on both sides of politics, which is pluralism, not capture.",
      proponent_rebuttal:
        "Money buys a hearing ordinary voters never get. Gilens and Page studied 1,779 policy questions and found 'economic elites and organized groups representing business interests have substantial independent impacts' on U.S. policy, while 'average citizens and mass-based interest groups have little or no independent influence.' Philanthropy is no answer: it lets unelected donors set agendas, and the pledges are not kept. Of the 2010 Giving Pledge signers, only one couple has fulfilled the promise; the 32 still billionaires saw their wealth grow 283% after signing. A fortune that keeps growing while it 'gives' is political power that answers to no one.",
      crux: {
        id: "policy-responsiveness-test",
        title: "Policy Responsiveness to Wealth vs. Median Voter",
        question:
          "When the rich and the middle class want different things, whose way does U.S. policy go?",
        description:
          "Gilens and Page found policy follows elites; Enns found the middle and the affluent usually want the same thing, so the cases where they split are few. The decisive evidence is what happens on the issues where they really disagree.",
        methodology:
          "Extend the Gilens and Page data to recent years and restrict it to issues where the preferences of affluent and median-income Americans diverge by a set margin. Compare how often each group's preferred outcome was enacted within four years, and test whether campaign spending by billionaires predicts the outcome independently of business groups.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "An extension of the Gilens and Page data to recent years, limited to issues where affluent and median-income Americans disagree, counting how often each side's preferred policy passed within four years.",
        },
        cost_to_verify: "Not costed here; it needs new survey matching of policy preferences.",
        falsification: {
          supporter_flip:
            "If issues where the rich and the median voter disagree turned out to be rare and policy split evenly between them when they did, the claim that great wealth buys outsized political power would weaken.",
          skeptic_flip:
            "If, on the issues where the rich and the median voter disagree, policy went the rich's way most of the time, the claim that money buys no special influence would fail.",
          common_ground:
            "The very wealthy shape public life well beyond their own vote, through political giving and through philanthropy, and on many issues the affluent and the middle class want the same policies.",
          live_disagreement:
            "Whether that influence tilts policy toward the rich where their interests differ from everyone else's, or whether disclosure, competing donors and voters' own agreement with the rich keep it in check.",
        },
      },
      evidence: [
        {
          id: "bw-gilens-page",
          title: "Gilens and Page 2014: across 1,779 policy questions, elites and business groups shaped outcomes; average citizens had 'little or no independent influence'",
          description:
            "Using a dataset of 1,779 policy issues, Martin Gilens and Benjamin Page found that 'economic elites and organized groups representing business interests have substantial independent impacts' on U.S. government policy, while 'average citizens and mass-based interest groups have little or no independent influence.' They concluded the results support theories of economic-elite domination and biased pluralism over majoritarian democracy.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source:
            "Martin Gilens and Benjamin I. Page, 'Testing Theories of American Politics: Elites, Interest Groups, and Average Citizens', Perspectives on Politics 12(3): 564-581 (September 2014)",
          sourceUrl: "https://doi.org/10.1017/S1537592714001595",
          reasoning:
            "The most cited evidence that money buys policy. Its elites are affluent Americans measured through surveys, not billionaires, and its method is disputed, as the Enns card shows, so replicability is 6.",
        },
        {
          id: "bw-enns-coincidental",
          title: "Enns 2015: policy 'ends up about where we would expect if policymakers represented the middle class and ignored the affluent'",
          description:
            "Reanalyzing the same question, Peter Enns found that policies with the most support among the middle class usually also have the most support among the affluent. So 'policy ends up about where we would expect if policymakers represented the middle class and ignored the affluent,' and the room for unequal representation of the average citizen is much smaller than thought. He found far more room for unequal representation of strong partisans.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Peter K. Enns, 'Relative Policy Support and Coincidental Representation', Perspectives on Politics 13(4): 1053-1064 (December 2015)",
          sourceUrl: "https://www.cambridge.org/core/product/identifier/S1537592715002315/type/journal_article",
          reasoning:
            "A direct answer in the same journal, using the same kind of data. It shows the middle usually gets what the rich want too; it does not show what happens on the issues where they truly split, so directness is 6.",
        },
        {
          id: "bw-giving-pledge",
          title: "IPS 2025: of the 2010 Giving Pledge signers, one couple has fulfilled it; the 32 still billionaires grew 283% richer",
          description:
            "The Giving Pledge, launched in 2010, has 256 signers. The Institute for Policy Studies found the original 2010 signers have given an estimated $206 billion, about 80% of it to private foundations. The 32 original U.S. signers who are still billionaires saw their combined wealth grow 283% after signing, to $908 billion. Only one original couple, Laura and John Arnold, has fulfilled the pledge; of 22 deceased signers, 8 gave away half or more of their wealth.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 6,
            directness: 5,
          },
          source:
            "Institute for Policy Studies, 'The Giving Pledge at 15' (30 July 2025)",
          sourceUrl: "https://ips-dc.org/release-giving-pledge-at-15/",
          reasoning:
            "Shows fortunes grow faster than they are given away. IPS campaigns for higher taxes on the rich, so independence is 4, and $206 billion given is a real sum the other side cites too.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Federal Reserve, Distributional Financial Accounts: share of net worth held by the top 1% (FRED WFRBST01134)",
      url: "https://fred.stlouisfed.org/series/WFRBST01134",
    },
    {
      title: "Federal Reserve, Changes in U.S. Family Finances from 2019 to 2022 (SCF, October 2023)",
      url: "https://www.federalreserve.gov/publications/files/scf23.pdf",
    },
    {
      title: "Chetty et al., The Fading American Dream (NBER w22910; Science 2017)",
      url: "https://www.nber.org/papers/w22910",
    },
    {
      title: "Chetty et al., Is the United States Still a Land of Opportunity? (NBER w19844, 2014)",
      url: "https://www.nber.org/papers/w19844",
    },
    {
      title: "Gilens and Page, Testing Theories of American Politics, Perspectives on Politics (2014)",
      url: "https://doi.org/10.1017/S1537592714001595",
    },
    {
      title: "Enns, Relative Policy Support and Coincidental Representation, Perspectives on Politics (2015)",
      url: "https://www.cambridge.org/core/product/identifier/S1537592715002315/type/journal_article",
    },
    {
      title: "Kaplan and Rauh, It's the Market, Journal of Economic Perspectives (2013)",
      url: "https://www.aeaweb.org/articles?id=10.1257/jep.27.3.35",
    },
    {
      title: "Institute for Policy Studies, The Giving Pledge at 15 (2025)",
      url: "https://ips-dc.org/release-giving-pledge-at-15/",
    },
  ],
};
