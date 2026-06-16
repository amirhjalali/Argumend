import type { Topic } from "@/lib/schemas/topic";

export const billionaireWealthData = {
  id: "billionaire-wealth",
  title: "Should Billionaires Exist?",
  meta_claim:
    "The concentration of extreme wealth in billionaires is harmful to society and should be prevented through taxation or structural reform.",
  status: "contested" as const,
  category: "economics" as const,
  pillars: [
    {
      id: "economic-impact",
      title: "Economic Impact",
      short_summary:
        "The top 1% hold about 30% of US household wealth; the bottom 50% hold roughly 2.5%. One side sees a rigged game; the other sees the reward for building Amazon.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Billionaires create jobs, fund innovation, and drive economic growth. Gates, Musk, and Bezos built firms that employ over a million people each and platforms millions depend on. Wealth taxes have a poor track record: of the dozen OECD countries that levied them in 1990, most repealed them by 2017 — citing high administrative cost, capital flight, and disappointing revenue — leaving only a handful (Norway, Spain, Switzerland) still collecting.",
      proponent_rebuttal:
        "Concentration is extreme and widening: the top 1% hold roughly 30% of US household net worth while the bottom 50% hold about 2.5%, and the top 0.1% alone hold several times more wealth than the entire bottom half combined (Fed Distributional Financial Accounts). Piketty's r>g framework shows why this compounds mechanically when returns on capital outrun growth. This concentration can blunt social mobility, capture political power, and distort markets — and a large share of foundational innovation originates in publicly funded labs and research grants, not in billionaire bank accounts.",
      crux: {
        id: "wealth-concentration-mobility",
        title: "Wealth Concentration vs. Social Mobility",
        description:
          "Is there a causal relationship between extreme wealth concentration and declining social mobility, or are both symptoms of other structural factors?",
        methodology:
          "Cross-national panel regression comparing wealth Gini coefficients with intergenerational earnings elasticity, controlling for education, tax policy, and institutional quality.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1.5M (Multi-country longitudinal economic study)",
      },
      evidence: [
        {
          id: "bw-fed-wealth-data",
          title: "Federal Reserve Wealth Distribution Data",
          description:
            "The top 1% of US households hold roughly 30% of total household net worth while the bottom 50% hold only about 2.5%. This gap has widened substantially since the late 1980s.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source:
            "Federal Reserve, Distributional Financial Accounts (DFA), Board of Governors",
          sourceUrl:
            "https://www.federalreserve.gov/releases/z1/dataviz/dfa/distribute/chart/",
          reasoning:
            "Gold-standard official data. Directly establishes the concentration claim but less direct on whether concentration is harmful.",
        },
        {
          id: "bw-job-creation",
          title: "Billionaire Job Creation Studies",
          description:
            "Amazon employs roughly 1.56M people; Microsoft around 228K (FY2024). Entrepreneurial billionaires found firms that employ millions and generate substantial economic activity.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 7,
            directness: 6,
          },
          source:
            "Amazon and Microsoft SEC 10-K annual reports (FY2024 headcount disclosures)",
          sourceUrl:
            "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001018724&type=10-K",
          reasoning:
            "Employment numbers are real, but attribution is complicated — these jobs would likely exist under different ownership structures. Low independence as often cited by wealth-defense advocates.",
        },
        {
          id: "bw-european-wealth-tax",
          title: "European Wealth Tax Outcomes",
          description:
            "Twelve OECD countries levied recurrent net wealth taxes in 1990; only four did as of 2017 (Norway, Spain, Switzerland, and France), with most repeals citing high administrative cost, capital flight, and disappointing revenue. Switzerland and Norway sustain theirs.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source:
            "OECD Tax Policy Studies No. 26, The Role and Design of Net Wealth Taxes in the OECD (2018)",
          sourceUrl:
            "https://www.oecd.org/en/publications/the-role-and-design-of-net-wealth-taxes-in-the-oecd_9789264290303-en.html",
          reasoning:
            "Mixed evidence — supports both sides depending on framing. Repeal history is real, but surviving programs suggest design matters more than concept.",
        },
        {
          id: "bw-piketty-analysis",
          title: "Piketty r>g Analysis",
          description:
            "Thomas Piketty's analysis shows that when the rate of return on capital (r) exceeds economic growth (g), wealth concentrates mechanically, creating a self-reinforcing oligarchy.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source:
            "Thomas Piketty, Capital in the Twenty-First Century, Harvard University Press (2014)",
          sourceUrl: "https://www.hup.harvard.edu/books/9780674430006",
          reasoning:
            "Influential and data-rich, but contested by economists like Acemoglu & Robinson. The r>g framework is a simplification of complex dynamics.",
        },
      ],
    },
    {
      id: "political-power",
      title: "Political Power",
      short_summary:
        "Billionaires fund campaigns, buy media outlets, and lobby Congress. Is that free speech or legalized oligarchy?",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Billionaire philanthropy can fill gaps government won't — the Gates Foundation is among the largest funders of global health, helping drive the multi-donor campaigns behind a roughly 60% fall in malaria death rates (2000-2015) and the near-eradication of wild polio, now endemic in just two countries. Campaign finance is regulated and disclosed in part. Many billionaires advocate for higher taxes on themselves and pledge most of their wealth to charity. Private initiative can move faster and take bigger risks than government bureaucracy.",
      proponent_rebuttal:
        "Wealth buys outsized influence through lobbying (federal lobbying hit a record $4.4B in 2024), media ownership, and political donations — including the dark money and super PAC spending that exploded after Citizens United. Gilens & Page found that across 1,779 policy issues, economic elites and business groups shaped outcomes while average citizens had little independent influence. The philanthropy defense cuts the other way: it makes public goods dependent on private whims, letting unelected donors set agendas in health, education, and science with no democratic accountability.",
      crux: {
        id: "policy-responsiveness-test",
        title: "Policy Responsiveness to Wealth vs. Median Voter",
        description:
          "Does US policy systematically favor the preferences of wealthy elites over the median voter?",
        methodology:
          "Extend Gilens & Page methodology: compare policy outcomes with preferences of different income groups across a larger sample of policy issues.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$800K (Updated policy responsiveness study)",
      },
      evidence: [
        {
          id: "bw-gilens-page",
          title: "Gilens & Page Oligarchy Study",
          description:
            "Analysis of 1,779 policy issues found that economic elites and organized business groups have substantial impact on policy, while average citizens have little or no independent influence.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 9,
          },
          source:
            "Gilens & Page, \"Testing Theories of American Politics,\" Perspectives on Politics 12(3): 564-581 (2014)",
          sourceUrl: "https://doi.org/10.1017/S1537592714001595",
          reasoning:
            "Highly cited and published in top journal. Criticized for measurement choices but findings are directionally consistent with follow-up studies.",
        },
        {
          id: "bw-gates-foundation",
          title: "Gates Foundation Global Health Impact",
          description:
            "The Gates Foundation has paid out tens of billions in grants and is a major funder of global health. Over the period it has been active, WHO reports global malaria death rates fell roughly 60% (2000-2015), and wild poliovirus is now endemic in just two countries (Afghanistan, Pakistan), efforts the Foundation co-funds.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 4,
            replicability: 6,
            directness: 5,
          },
          source:
            "WHO World Malaria Report 2015 (60% decline in malaria death rate since 2000); Global Polio Eradication Initiative / Gates Foundation grant disclosures",
          sourceUrl: "https://www.who.int/publications/i/item/9789241565158",
          reasoning:
            "The malaria and polio gains are real WHO-documented outcomes, but they are multi-donor, multi-decade achievements, not solely attributable to the Gates Foundation. Independence is low (foundation co-funds WHO) and directness is moderate: it shows large-scale philanthropy can help, not that billionaires are necessary for these gains.",
        },
        {
          id: "bw-dark-money",
          title: "Dark Money in Politics Data",
          description:
            "Undisclosed (\"dark money\") political spending rose from under $5.2M in 2006 to over $1B cumulatively in the decade following the 2010 Citizens United ruling. Super PACs, many funded by a small number of wealthy donors, now account for a large share of outside spending.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "OpenSecrets (Center for Responsive Politics), Dark Money tracking",
          sourceUrl: "https://www.opensecrets.org/dark-money/basics",
          reasoning:
            "Nonpartisan tracking organization with transparent methodology. Spending data is reliable, but the share attributable specifically to billionaires and the influence-to-outcome causal link are harder to pin down.",
        },
        {
          id: "bw-giving-pledge",
          title: "Giving Pledge Outcomes",
          description:
            "Over 230 billionaires have signed the Giving Pledge, a non-binding moral promise to give away the majority of their wealth. An Institute for Policy Studies analysis found that many signatories' wealth has grown far faster than their giving, with the pledge being legally unenforceable.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 6,
            directness: 5,
          },
          source:
            "The Giving Pledge (signatory list); Institute for Policy Studies, \"The Giving Pledge at 15\" (2025)",
          sourceUrl: "https://ips-dc.org/release-giving-pledge-at-15/",
          reasoning:
            "Pledge demonstrates intent but is non-binding. IPS analysis shows wealth growth outpacing donations. Signatory counts and donation figures are partly self-reported, so independence is moderate.",
        },
      ],
    },
  ],
  references: [
    {
      title:
        "Federal Reserve, Distributional Financial Accounts — Distribution of Household Wealth",
      url: "https://www.federalreserve.gov/releases/z1/dataviz/dfa/distribute/chart/",
    },
    {
      title:
        "OECD Tax Policy Studies No. 26 — The Role and Design of Net Wealth Taxes in the OECD (2018)",
      url: "https://www.oecd.org/en/publications/the-role-and-design-of-net-wealth-taxes-in-the-oecd_9789264290303-en.html",
    },
    {
      title:
        "Gilens & Page, \"Testing Theories of American Politics,\" Perspectives on Politics (2014)",
      url: "https://doi.org/10.1017/S1537592714001595",
    },
    {
      title: "OpenSecrets — Federal lobbying set a new record ($4.4B) in 2024",
      url: "https://www.opensecrets.org/news/2025/02/federal-lobbying-set-new-record-in-2024/",
    },
    {
      title: "WHO World Malaria Report 2015 (≈60% decline in malaria death rate since 2000)",
      url: "https://www.who.int/publications/i/item/9789241565158",
    },
  ],
};
