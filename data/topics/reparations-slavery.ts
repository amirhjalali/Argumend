export const reparationsSlaveryData = {
  id: "reparations-slavery",
  title: "Reparations for Slavery",
  question:
    "Should the US provide reparations to descendants of enslaved Black Americans?",
  meta_claim:
    "The United States federal government should provide reparations to descendants of enslaved Black Americans to address the lasting economic and social effects of slavery and Jim Crow.",
  status: "contested" as const,
  category: "policy" as const,
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "In the Federal Reserve's 2022 survey, the median white family held about $285,000 in wealth and the median Black family about $45,000. Leading estimates of what reparations would cost run roughly $10 trillion to $14 trillion. Both sides accept those figures. The fight is over how much of the gap traces to slavery and the policy that followed it, and whether any program could close it.",
    confidence: 88,
    source:
      "Federal Reserve Board, FEDS Notes (2023), on the 2022 Survey of Consumer Finances; Craemer, Social Science Quarterly (2015); Darity & Mullen, From Here to Equality (2020)",
    sourceUrl:
      "https://www.federalreserve.gov/econres/notes/feds-notes/greater-wealth-greater-uncertainty-changes-in-racial-inequality-in-the-survey-of-consumer-finances-20231018.html",
  },
  simple_case: [
    "The answers decide whether the federal government pays reparations to the descendants of enslaved people, and if so in what form, or addresses the gap through broader policy.",
  ],
  pillars: [
    {
      id: "moral-historical-case",
      title: "Moral & Historical Case",
      short_summary:
        "The median white family holds about 6x the wealth of the median Black family ($285K vs. ~$45K in the 2022 SCF). Historians trace the gap to slavery, Jim Crow, and redlining.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Current Americans bear no personal responsibility for their ancestors' actions. Where do you draw the line — Indigenous displacement, Japanese internment, Irish discrimination? Many Black Americans are recent immigrants with no connection to American slavery. Individual responsibility, not group identity, should guide public policy. Reparations would be divisive and deepen racial resentment rather than heal it.",
      proponent_rebuttal:
        "The US government itself directly sanctioned and enforced slavery for 246 years and Jim Crow for roughly a century more — this is not about individual guilt but institutional debt owed by an enduring legal entity, the federal government, that outlives any generation. The racial wealth gap is large and measurable: in the Federal Reserve's 2022 Survey of Consumer Finances, median white wealth was about $285,000 versus roughly $45,000 for Black families — about six times as much. The GI Bill, FHA mortgage insurance, and the original Social Security Act excluded most Black Americans by design, compounding disadvantage well into the 20th century — harms whose direct victims and beneficiaries are often still alive. The recent-immigrant objection is real but answerable: serious proposals (Darity and Mullen) restrict eligibility to documented descendants of people enslaved in the US, not to skin color. And the US already pays targeted reparations — to interned Japanese Americans (1988 Civil Liberties Act) — while Germany paid Holocaust survivors, so the principle is established even if the scale here is far larger.",
      crux: {
        id: "causal-chain-measurement",
        title: "Measuring the Causal Chain from Slavery to Present Disparities",
        question:
          "How much of today's racial wealth gap traces to slavery, Jim Crow and discriminatory policy?",
        description:
          "Quantifying how much of the current racial wealth and income gap is directly attributable to slavery, Jim Crow, and discriminatory federal policies versus other factors.",
        methodology:
          "Decomposition analysis tracing wealth accumulation pathways: land ownership denied (40 acres), GI Bill exclusion, FHA redlining, Social Security exclusion, mass incarceration. Estimate the counterfactual wealth of Black Americans absent these policies using historical economic modeling.",
        equation:
          "\\text{Reparations Debt} = \\sum_{t=1619}^{2024} \\text{Value Extracted}_t \\times (1 + r)^{2024-t}",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Decomposition models that trace wealth through specific pathways (land denied, GI Bill and Social Security exclusion, FHA redlining) and estimate Black families' wealth had those policies not existed.",
        },
        cost_to_verify: "$2M (Historical economic modeling with multiple methodologies)",
        falsification: {
          supporter_flip:
            "If decomposition modeling of wealth pathways — land denied, GI Bill and Social Security exclusion, FHA redlining — found that only a small share of today's gap traces to slavery, Jim Crow and federal policy, the case for reparations as an institutional debt would weaken toward general anti-poverty policy.",
          skeptic_flip:
            "If records tied a large share of losses to federal programs that excluded Black Americans by design, such as the GI Bill, FHA insurance and the original Social Security Act, with victims still alive, the claim would read as a government debt, like the 1988 payments to interned Japanese Americans, not inherited guilt.",
          common_ground:
            "Both sides accept the size of the gap — median white wealth about $285,000 versus roughly $45,000 for Black families in the Federal Reserve's 2022 survey — and that some Black Americans are recent immigrants with no lineage to US slavery.",
          live_disagreement:
            "How much of today's gap is caused by slavery, Jim Crow and federal policy rather than other factors — and whether a debt owed by the federal government as an institution justifies payments that today's taxpayers fund.",
        },
      },
      evidence: [
        {
          id: "fed-racial-wealth-gap",
          title: "Federal Reserve: $285K White vs. $45K Black Median Wealth",
          description:
            "The Federal Reserve's 2022 Survey of Consumer Finances shows white families have a median net worth of $285,000 compared to $44,900 for Black families — a gap of about 6.3:1 (the typical Black family holds about 15% of the typical white family's wealth). The dollar gap between the two medians grew by around $50,000 between 2019 and 2022, to more than $220,000, even as the ratio narrowed; the 2019 SCF put the medians at $188,200 and $24,100 in 2019 dollars, about 8:1.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 9,
            directness: 7,
          },
          source:
            "Federal Reserve Board, FEDS Notes, 'Greater Wealth, Greater Uncertainty: Changes in Racial Inequality in the Survey of Consumer Finances' (18 Oct 2023); 2019 medians from FEDS Notes, 'Disparities in Wealth by Race and Ethnicity in the 2019 Survey of Consumer Finances' (28 Sept 2020)",
          sourceUrl:
            "https://www.federalreserve.gov/econres/notes/feds-notes/greater-wealth-greater-uncertainty-changes-in-racial-inequality-in-the-survey-of-consumer-finances-20231018.html",
          reasoning:
            "Gold-standard data from the most authoritative source. Directly documents the disparity, though the causal connection to slavery specifically (versus ongoing discrimination) is indirect. Earlier draft cited incorrect figures ($171K/$17.1K); corrected to the official 2022 SCF medians.",
        },
        {
          id: "rothstein-color-of-law",
          title: "Rothstein: Government Actively Created Racial Segregation",
          description:
            "Richard Rothstein's 'The Color of Law' documents how federal, state, and local government policies deliberately created and maintained racial residential segregation. The Federal Housing Administration refused to insure mortgages in and near Black neighborhoods (redlining) while subsidizing builders of whole subdivisions on the condition that no homes be sold to Black buyers; the Veterans Administration adopted the same color-coded maps; and New Deal public housing was built as separate projects for white and Black tenants. These are government actions, not market outcomes.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source:
            "Richard Rothstein, 'The Color of Law: A Forgotten History of How Our Government Segregated America' (Liveright, 2017), Economic Policy Institute book page; specifics as Rothstein gave them to NPR's Fresh Air (3 May 2017)",
          sourceUrl:
            "https://www.epi.org/publication/the-color-of-law-a-forgotten-history-of-how-our-government-segregated-america/",
          reasoning:
            "Extensively documented with primary sources. Directly establishes government responsibility for creating the conditions that reparations would address.",
        },
        {
          id: "german-holocaust-reparations",
          title: "Germany Has Paid More Than $90 Billion to Individual Victims of Nazi Persecution Since 1952",
          description:
            "The Claims Conference, founded in 1951, reports that as a result of its negotiations since 1952 'the German government has paid more than $90 billion in indemnification to individuals for suffering and losses resulting from persecution by the Nazis.' The first agreements were signed in Luxembourg in 1952 by West Germany and the Claims Conference, with Israel signing in parallel. Payments continue: in 2025 the Claims Conference distributed about $530 million in direct compensation to more than 115,000 survivors in 84 countries. The record shows a reparations program can be designed, administered, and sustained over decades.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source: "Conference on Jewish Material Claims Against Germany (Claims Conference), 'History'",
          sourceUrl: "https://www.claimscon.org/about/history/",
          reasoning:
            "Strong precedent for the concept of reparations. The figure is the Claims Conference's own, and it counts payments to individuals. Replicability limited because Germany's reparations were closer in time to the harm and involved a different political and historical context.",
        },
        {
          id: "implementation-feasibility-concerns",
          title: "Defining Eligibility Is Practically Complex",
          description:
            "Identifying who qualifies as a 'descendant of enslaved Americans' poses practical challenges. The 2020 Census counted 41.1 million people who identified as Black alone and 46.9 million as Black alone or in combination, with varying connections to American slavery. Mixed-race Americans, recent immigrants, and people who cannot document ancestry complicate eligibility. Darity and Mullen address this directly, proposing a two-part criterion (documented descent from at least one person enslaved in the US, plus self-identification as Black on a legal document at least 12 years before the program or a study commission is created). Mullen calls the genealogy 'not an impossible task' and proposes a federal agency of genealogists to help applicants at no cost, which is itself a large administrative undertaking.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 5,
            replicability: 6,
            directness: 7,
          },
          source:
            "William Darity Jr. and Kirsten Mullen, interview, Institute for Research on Poverty podcast, University of Wisconsin-Madison (7 Dec 2023); population counts from U.S. Census Bureau, 2020 Census",
          sourceUrl:
            "https://www.irp.wisc.edu/resource/william-darity-jr-and-kirsten-mullen-on-why-its-time-to-pay-reparations-to-black-americans/",
          reasoning:
            "Legitimate practical concern, but framed here as general commentary rather than a specific cited study, so source-reliability and independence are scored conservatively. The difficulty of implementation does not negate the moral case — many complex government programs (Social Security, Medicare) require identity verification.",
        },
        {
          id: "sacerdote-two-generation-catch-up",
          title: "Sacerdote (2005): Descendants of the Enslaved Caught Up With Descendants of Free Black Americans in About Two Generations",
          description:
            "Dartmouth economist Bruce Sacerdote compared former slaves and their children and grandchildren with Black Americans who were free before 1865 and their descendants, on literacy, school attendance, household structure and two measures of adult occupation, using the 1880 and 1920 census samples and families linked back to the full 1880 Census. 'Using a variety of different comparisons, (e.g. within versus across regions) I find that it took roughly two generations for the descendants of slaves to catch up to the descendants of free black men and women.' He reads the convergence as consistent with modern estimates of how strongly status passes from father to son.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 6,
            directness: 4,
          },
          source:
            "Bruce Sacerdote, 'Slavery and the Intergenerational Transmission of Human Capital', Review of Economics and Statistics 87(2), May 2005 (NBER Working Paper 9227, 2002)",
          sourceUrl: "https://www.nber.org/papers/w9227",
          reasoning:
            "Peer-reviewed census-linkage evidence that the gap specific to having enslaved ancestors faded by 1920, which cuts against a direct slavery-to-today causal chain and against lineage as the test of who was harmed. Directness is held to 4 because the comparison group, free Black Americans, faced the same Jim Crow and later federal exclusions, so the study says nothing about how much of today's gap those post-1865 policies caused, which is half the crux. It measures schooling and occupation, not wealth.",
        },
      ],
    },
    {
      id: "economic-feasibility-form",
      title: "Economic Feasibility & Form",
      short_summary:
        "Estimates range from $10 trillion to $14 trillion in total. Nobody agrees on who qualifies, what form payment takes, or where the money comes from.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The cost — $10-14 trillion by leading estimates — rivals or exceeds the entire annual federal budget and would require unprecedented taxation or borrowing for a single program. Beyond cost, eligibility is genuinely hard and arguably unfair: documenting lineage to a specific enslaved ancestor is impossible for many descendants (records were sparse and deliberately incomplete), would exclude some of the intended beneficiaries while admitting others on thin documentation, and asks today's taxpayers — including descendants of post-1865 immigrants and of the enslaved themselves — to fund transfers keyed to ancestry rather than present need. A one-time cash transfer also does not by itself fix the structural drivers of disadvantage (school funding, mass incarceration, ongoing discrimination). Race-conscious payments may also face serious constitutional challenge after the Supreme Court's 2023 ruling against race-based affirmative action. Universal, means-tested anti-poverty programs help every disadvantaged American, sidestep the lineage problem, and command broader and more durable political support.",
      proponent_rebuttal:
        "Darity and Mullen put the target sum at roughly $10-12 trillion — the amount they estimate is needed to close the Black-white wealth gap — delivered mainly as direct payments to eligible descendants (about $267,000 each in the book's $10.7 trillion calculation), not as a grab-bag of in-kind programs. Spread over a 10-year program that is roughly $1 trillion a year, on the scale of recent pandemic relief and well within the federal government's demonstrated borrowing capacity for emergencies it deems urgent. HR 40, the bill on the table, merely proposes a commission to study the question and recommend remedies, not a commitment to any specific form or sum. And separate wealth-building tools such as baby bonds suggest large transfers can be administered through existing fiscal machinery; closing the gap would also generate offsetting returns through higher homeownership, spending, and entrepreneurship.",
      crux: {
        id: "reparations-program-design",
        title: "Optimal Reparations Program Design and Cost-Benefit",
        question:
          "Is there a reparations design that would close the wealth gap and be politically and economically viable?",
        description:
          "Determining which reparations model (direct payments, baby bonds, housing/education grants, community investment) would most effectively close the racial wealth gap while being politically and economically viable.",
        methodology:
          "Microsimulation modeling of different reparations structures using PSID and SCF data. Project wealth gap closure under each model at 10, 25, and 50-year horizons. Estimate fiscal multiplier effects and long-term tax revenue returns.",
        equation:
          "\\text{ROI}_{\\text{reparations}} = \\frac{\\Delta \\text{GDP} + \\Delta \\text{Tax Revenue} + \\Delta \\text{Social Savings}}{\\text{Program Cost}}",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Microsimulations on PSID and SCF data projecting how far direct payments, baby bonds and housing or education grants each narrow the gap at 10, 25 and 50 years, and at what fiscal cost.",
        },
        cost_to_verify: "$5M (Comprehensive economic modeling study — essentially what HR 40 proposes)",
        falsification: {
          supporter_flip:
            "If microsimulations of direct payments, baby bonds and housing or education grants showed that none would close much of the wealth gap over 10, 25 or 50 years at a sustainable cost, or that lineage-based eligibility could not be administered fairly, the case for a federal program would weaken.",
          skeptic_flip:
            "If an H.R. 40 commission found Darity and Mullen's $10-12 trillion could run as about $1 trillion a year for 10 years, on the scale of pandemic relief, through existing machinery such as baby-bond programs, the cost objection would lose much of its force.",
          common_ground:
            "Both sides work from the same order of magnitude — roughly $10-14 trillion in leading estimates — and agree that who qualifies and what form payment takes are still undecided.",
          live_disagreement:
            "Whether a payment program keyed to documented lineage can be designed fairly and afforded at that scale, or whether universal, means-tested programs would help more people with broader and more durable political support.",
        },
      },
      evidence: [
        {
          id: "darity-mullen-proposal",
          title: "Darity & Mullen: Comprehensive Reparations Framework",
          description:
            "Economists William Darity Jr. (Duke) and A. Kirsten Mullen, in 'From Here to Equality' (2020), argue the total reparations sum should be whatever is needed to eliminate the Black-white wealth gap — an expenditure they put at a minimum of $10-12 trillion. The book's own calculation is $10.7 trillion, about $267,000 per person for 40 million eligible descendants; in a 2023 interview, using the 2019 Survey of Consumer Finances, they put it at about $14.3 trillion, or about $350,000 per person. They emphasize that the bulk should be direct payments to eligible recipients rather than in-kind programs. Eligibility rests on two criteria: documented descent from at least one person enslaved in the United States, and self-identification as Black on a legal document at least 12 years before the program or a study commission is created. (Wealth-scaled 'baby bonds' are a separate, race-neutral Hamilton-Darity wealth-building proposal, not the core of this reparations plan.)",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source:
            "William A. Darity Jr. & A. Kirsten Mullen, 'From Here to Equality: Reparations for Black Americans in the Twenty-First Century' (UNC Press, 2020), summarized by the authors in Brookings (15 June 2020); per-person figure from the AAIHS Black Perspectives review (8 Oct 2020); 2023 figures and eligibility wording from their Institute for Research on Poverty interview (7 Dec 2023)",
          sourceUrl: "https://www.brookings.edu/articles/black-reparations-and-the-racial-wealth-gap/",
          reasoning:
            "The most detailed and economically rigorous reparations proposal from leading scholars. Demonstrates feasibility but relies on political will and assumptions about implementation. The authors' own total has risen with the measured wealth gap, from $10-12 trillion in 2020 to about $14.3 trillion in 2023. Baby bonds are the separate Hamilton-Darity proposal and are not part of the From Here to Equality reparations sum.",
        },
        {
          id: "hr-40-commission",
          title: "HR 40: A Commission to Study Reparations",
          description:
            "H.R. 40 (Commission to Study and Develop Reparation Proposals for African Americans Act) was first introduced by Rep. John Conyers in 1989 and has been reintroduced in every Congress since (later led by Rep. Sheila Jackson Lee from 2019 until her death in 2024, and subsequently by Rep. Ayanna Pressley). It proposes a commission to study the impact of slavery and recommend remedies — it does not commit to any specific reparations form. In April 2021 it was advanced out of the House Judiciary Committee for the first time, but it has never received a full floor vote.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source:
            "U.S. Congress (H.R. 40, Commission to Study and Develop Reparation Proposals for African Americans Act); originally Rep. John Conyers, later Rep. Sheila Jackson Lee",
          sourceUrl: "https://www.congress.gov/bill/119th-congress/house-bill/40",
          reasoning:
            "The modest nature of the proposal (study, not commit) makes opposition harder to justify. Low directness because a study commission is a procedural step, not reparations itself.",
        },
        {
          id: "implementation-cost-estimates",
          title: "Cost Estimates Range from $6 Trillion to $14 Trillion",
          description:
            "Estimates of reparations costs vary enormously by methodology. Multiplying unpaid hours of slave labor by historical free-labor wages, Thomas Craemer estimated the present value of US slave labor at $5.9 to $14.2 trillion in 2009 dollars. Using the current wealth gap, Darity and Mullen put the figure at $10-12 trillion in 2020 and about $14.3 trillion in 2023. For context, federal outlays were $6.1 trillion in fiscal 2023 and about $7.0 trillion in fiscal 2025, and US GDP was $27.8 trillion in 2023 and about $30.9 trillion in 2025.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source:
            "Thomas Craemer, 'Estimating Slavery Reparations: Present Value Comparisons of Historical Multigenerational Reparations Policies,' Social Science Quarterly 96(2), pp. 639-655 (2015); Darity & Mullen for the wealth-gap-based figures; outlays (OMB) and GDP (BEA) via FRED",
          sourceUrl: "https://onlinelibrary.wiley.com/doi/abs/10.1111/ssqu.12151",
          reasoning:
            "The scale of costs is a genuine practical obstacle. The wide range of estimates reflects methodological disagreement about what reparations should address. The '$2-4 trillion for modest programs' figure was removed as unsourced.",
        },
        {
          id: "baby-bonds-pilot-data",
          title: "Baby Bonds: Connecticut Seeds $3,200 per Medicaid Birth; a Simulation Projects the Young-Adult Wealth Ratio Falling From 16:1 to 1.4:1",
          description:
            "Baby bonds — government-funded trust accounts for children that grow over time — were proposed by economists Darrick Hamilton and William Darity as a race-neutral wealth-building tool that would disproportionately benefit Black families. Connecticut runs what its Treasurer calls a first-in-the-nation program, covering children born on or after July 1, 2023: the state invests $3,200 for each baby whose birth is covered by HUSKY Health, its Medicaid program, expected to grow to between $11,000 and $24,000 depending on when the adult (aged 18-30) claims it. A simulation by Naomi Zewde on Panel Study of Income Dynamics data estimates that universal baby bonds, with values tied inversely to family wealth up to a $50,000 maximum, would cut the median young-adult white-to-Black wealth ratio from about 16:1 ($46,000 vs. $2,900) to 1.4:1 ($79,143 vs. $57,845), assuming no behavioral response.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "Connecticut Office of the Treasurer, 'CT Baby Bonds: Overview'; Naomi Zewde, 'Universal Baby Bonds Reduce Black-White Wealth Inequality, Progressively Raise Net Worth of All Young Adults', Review of Black Political Economy 47(1), pp. 3-19 (2020); Hamilton & Darity, 'Can Baby Bonds Eliminate the Racial Wealth Gap in Putative Post-Racial America?', Review of Black Political Economy 37(3-4) (2010)",
          sourceUrl: "https://portal.ct.gov/ott/ct-baby-bonds/overview",
          reasoning:
            "A promising mechanism, but there is no outcome data yet: Connecticut's first cohort was born in 2023 and cannot claim funds before age 18, and a 2023 Urban Institute literature summary found no existing evaluations of the policy. Directness is limited because baby bonds are race-neutral by design (though they disproportionately benefit Black families) and the wealth-gap-closure figures are projections, not observed at scale. Corrected eligibility (Medicaid/HUSKY, not 'under $75K') and attributed the gap-closure estimate to Zewde's simulation.",
        },
        {
          id: "evanston-doj-equal-protection-suit",
          title: "The First US Reparations Program, Evanston's $25,000 Housing Grants, Faces a Federal Equal-Protection Suit the Justice Department Joined in October 2026",
          description:
            "Evanston, Illinois adopted its Local Reparations Restorative Housing Program in 2019 (the City Council approved it in 2021): $25,000 in cash or housing assistance for Black people who lived in the city as adults between 1919 and 1969 and their children, grandchildren or great-grandchildren. The Justice Department says the city has paid 'over $5 million' so far. A class action brought in 2024 by Judicial Watch on behalf of non-Black residents' descendants (Flinn v. City of Evanston, N.D. Ill. No. 24-cv-4269) survived the city's motion to dismiss in March 2026. On 16 June 2026 the Civil Rights Division moved to intervene, arguing the program violates the Equal Protection Clause and the Fair Housing Act because race determines eligibility and recipients need not show past discrimination; Assistant Attorney General Harmeet Dhillon called it 'race discrimination, pure and simple.' Judge John F. Kness approved the motion, and the United States filed its complaint in intervention on 16 October 2026. No ruling on the merits had been reported as of 23 October 2026.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 4,
            replicability: 5,
            directness: 6,
          },
          source:
            "U.S. Department of Justice, Office of Public Affairs, 'U.S. Justice Department Moves to Intervene in Race Discrimination Lawsuit Challenging Reparations Program in Evanston, Illinois' (16 June 2026); DOJ Civil Rights Division case page, Flinn & United States v. City of Evanston; Patch Evanston (18 June 2026); Chicago Sun-Times (23 Oct 2026)",
          sourceUrl:
            "https://www.justice.gov/opa/pr/us-justice-department-moves-intervene-race-discrimination-lawsuit-challenging-reparations",
          reasoning:
            "Shows the legal exposure of a race-keyed design after the 2023 Students for Fair Admissions ruling, in the one program actually paying out. Independence is 4 because the source is a litigant, and the outcome is undecided, so this is a risk, not a holding. It bears less on Darity and Mullen's lineage-based federal design, which a court could treat differently from a city's race-based grant, and Evanston ties eligibility to a documented period of housing discrimination. Payment totals differ across reports (Patch gives 137 recipients and more than $3 million; the Sun-Times, citing the DOJ, gives 141 'Ancestor' applicants paid and payments begun to 454 'Direct Descendants', more than $5 million in all).",
        },
        {
          id: "pew-2021-reparations-support",
          title: "Pew (2021): 30% of US Adults Say Descendants of the Enslaved Should Be Repaid; 68% Say They Should Not",
          description:
            "In Pew Research Center's October 2021 surveys, 'Three-in-ten U.S. adults say descendants of people enslaved in the U.S. should be repaid in some way', such as land or money, and 'About seven-in-ten (68%) say these descendants should not be repaid.' Views split sharply by race: 77% of Black adults favor repayment against 18% of White adults. Democrats and Democratic-leaning independents were themselves split, 48% in favor and 49% against.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 5,
          },
          source:
            "Pew Research Center, 'Black and White Americans are far apart in their views of reparations for slavery' (28 Nov 2022, surveys of Oct 2021)",
          sourceUrl:
            "https://www.pewresearch.org/short-reads/2022/11/28/black-and-white-americans-are-far-apart-in-their-views-of-reparations-for-slavery/",
          reasoning:
            "A large, methodologically strong national survey, and political viability is part of the crux question. Directness is 5: support measures the politics of a design, not whether it would work or is owed, and opinion can shift: 45% of adults under 30 favored repayment, against 18% of those 65 and older. The survey is from 2021; no newer Pew measure was found as of November 2026.",
        },
      ],
    },
  ],
};
