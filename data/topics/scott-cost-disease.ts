export const scottCostDiseaseData = {
  id: "scott-cost-disease",
  title: "The Cost Disease",
  question:
    "Have US health, school and infrastructure costs soared without matching gains?",
  meta_claim:
    "Since roughly 1960, the real (inflation-adjusted) cost of U.S. health care, K–12 and higher education, and infrastructure has risen several-fold with little or no matching gain in measured output — a genuine 'cost disease' — and it is produced by a stack of reinforcing causes rather than any single villain.",
  status: "contested" as const,
  category: "economics" as const,
  references: [
    {
      title: "Considerations on Cost Disease (Scott Alexander, SSC 2017)",
      url: "https://slatestarcodex.com/2017/02/09/considerations-on-cost-disease/",
    },
    {
      title:
        "Why Are the Prices So D*mn High? (Helland & Tabarrok, Mercatus 2019)",
      url: "https://www.mercatus.org/research/books/why-are-prices-so-damn-high",
    },
    {
      title: "Transit Costs Project (NYU Marron Institute)",
      url: "https://transitcosts.com/",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Is it one disease or five?",
      content:
        "Scott's 2017 essay lined up candidate explanations — Baumol, regulation, administrative bloat, subsidized demand, risk-aversion — and declined to pick. This map assigns each a weight and, more importantly, the specific decomposition that would settle its share.",
    },
    {
      id: "q2",
      title: "Did we get more for the money?",
      content:
        "The whole phenomenon hinges on whether output held flat while spending multiplied. If modern medicine and schooling are silently far better than their 1960 versions, much of the 'disease' is a measurement artifact.",
    },
    {
      id: "q3",
      title: "Why do only some sectors have it?",
      content:
        "Haircuts and restaurants are just as labor-intensive as teaching, yet their real prices barely moved. The sectors that exploded — health, education, construction — share a second ingredient beyond low productivity growth.",
    },
  ],
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "Phase 1 of New York's Second Avenue Subway cost $4.6 billion for 2.7 kilometers of line, about $1.7 billion a kilometer ($2.7 billion a mile) and roughly ten times what the Italian and Swedish subways in the same study cost. U.S. health-care administration ran about $2,497 a person in 2017, against about $551 in Canada. Neither figure is in dispute. The fight is over how much of the rise is the unavoidable price of work that can't be automated, and how much is waste that could be cut.",
    confidence: 85,
    source:
      "Transit Costs Project, 'Transit Costs Study Final Report', NYU Marron Institute (2023); Himmelstein, Campbell & Woolhandler, Annals of Internal Medicine (2020)",
    sourceUrl:
      "https://transitcosts.com/transit-costs-study-final-report/",
  },
  simple_case: [
    "The answer decides whether Americans should expect to keep paying more for the same schooling, care and transit, or whether reform could bring those prices down.",
  ],
  pillars: [
    {
      id: "baumol-effect",
      title: "The Baumol Effect (the null hypothesis)",
      short_summary:
        "Labor-intensive services can't automate, so as wages rise economy-wide their relative prices must climb — no villain required.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Baumol is the boring default and it fits: a teacher or nurse in 2020 does roughly what one did in 1960, but must be paid a 2020 wage set by economy-wide productivity. Rising relative prices are a mechanical accounting identity, not a pathology to be fixed.",
      proponent_rebuttal:
        "Baumol predicts higher prices — it does NOT predict flat or falling output. Yet U.S. K–12 delivered flat NAEP scores while real per-pupil spending doubled, and some Baumol-exposed sectors (restaurants, haircuts) never exploded. Baumol is the floor of the stack, not the whole building.",
      crux: {
        id: "wage-decomposition",
        title: "The Wage-Decomposition Test",
        question:
          "How much of the cost rise is just rising wages in work that can't be automated?",
        description:
          "Split each sector's real cost growth into the part explained by (labor share × economy-wide relative wage growth) versus a residual. If Baumol is the primary driver, the residual is small; if the residual is large, other mechanisms dominate.",
        methodology:
          "Using BLS/BEA sector accounts, compute labor share and relative-wage growth for health, education, and construction. Attribute the Baumol-predicted price path and measure the unexplained residual per sector, decade by decade.",
        equation:
          "\\Delta P_{sector} = s_L \\cdot \\Delta w_{econ} + \\underbrace{\\varepsilon}_{\\text{residual}}",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Split each sector's real cost growth, from BLS and BEA data, into what economy-wide wage growth predicts given its labor share and what is left over, and see how large the leftover is in health care, education and construction.",
        },
        cost_to_verify: "$0 (public BLS/BEA data; Helland–Tabarrok replication)",
        falsification: {
          supporter_flip:
            "If splitting each sector's real cost growth into a Baumol-predicted wage path and a residual left only a small residual in health, education and construction, the rise would be a mechanical effect of wages rather than a pathology, and the case for a stack of reinforcing causes would weaken.",
          skeptic_flip:
            "If outcome data kept showing flat NAEP scores for 17-year-olds as real per-pupil spending rose, and equally labor-bound services like haircuts and restaurant meals saw only modest real price growth, rising wages alone would not explain the cost rise.",
          common_ground:
            "Both sides accept Baumol's mechanism as real: labor-intensive services rise in relative price as the rest of the economy automates, so part of the cost rise needs no villain.",
          live_disagreement:
            "How large the residual is once Baumol's wage effect is subtracted — small enough to call the rise a mechanical accounting identity, or large enough that other mechanisms dominate.",
        },
      },
      evidence: [
        {
          id: "helland-tabarrok",
          title:
            "Helland & Tabarrok: the Baumol effect is the best explanation for rising education and health prices",
          description:
            "Their 2019 Mercatus study works through lower education, higher education and health care, then tests the pattern statistically across 139 industries. 'After rejecting a number of alternative explanations, we conclude that the Baumol effect is the best explanation for rising prices in education and healthcare.' On schools they write that 'the bulk of the increase in the costs of lower education can be explained by greater expenditures on teachers', mostly more spent per teacher and partly more teachers per student.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 9,
          },
          source:
            "Helland & Tabarrok, 'Why Are the Prices So Damn High? Health, Education, and the Baumol Effect', Mercatus Center (2019)",
          sourceUrl:
            "https://www.mercatus.org/research/books/why-are-prices-so-damn-high",
          reasoning:
            "Careful, data-driven, and directly on the decomposition question — but authored by advocates of the Baumol reading. More teachers per student is extra input rather than a wage effect, so part of the schooling rise they describe is not Baumol in the strict sense.",
        },
        {
          id: "baumol-book",
          title:
            "Baumol: labor-intensive services explain the rising prices, and society can afford them",
          description:
            "In 'The Cost Disease' (2012) William Baumol traces the fast-rising prices of health care and education in the United States and other major industrial nations to the nature of providing labor-intensive services. The publisher's summary of his conclusion: 'The news is good, Baumol reassures us, because the nature of the disease is such that society will be able to afford the rising costs.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Baumol, 'The Cost Disease: Why Computers Get Cheaper and Health Care Doesn't', Yale University Press (2012)",
          sourceUrl:
            "https://yalebooks.yale.edu/book/9780300188486/the-cost-disease/",
          reasoning:
            "Foundational theory from the economist the effect is named for, and it covers other industrial nations as well, so it is not a U.S.-only story. Less direct on U.S. magnitudes, and the quoted line is the publisher's summary, not the book's own text. Filed on the no-villain side (it was on the other side until November 2026): the book's argument is this pillar's null hypothesis, the same reading as the Helland–Tabarrok and Nordhaus cards.",
        },
        {
          id: "haircut-counterexample",
          title: "The haircut counterexample",
          description:
            "Cutting hair is as hard to automate as teaching, so if economy-wide wage growth alone drove service prices, barbers' pay and the price of a haircut should have been pulled up with everyone else's. Helland and Tabarrok's own income series shows otherwise: 'Since 1960 the real income of physicians has increased by a factor of three. By comparison, barbers and bus drivers have seen essentially no increase in real incomes.' Work that can't be automated is therefore not enough, by itself, to pick out the sectors that exploded.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source:
            "Inference from Helland & Tabarrok, 'Why Are the Prices So Damn High?', Mercatus Center (2019), discussion of Figure 19 (real incomes by occupation, 1960–2016)",
          sourceUrl:
            "https://www.mercatus.org/research/books/why-are-prices-so-damn-high",
          reasoning:
            "A clean logical counterexample, anchored to incomes: the source reports barbers' pay, not haircut prices. The authors read the same figure as the Baumol effect working through skilled labor, so the comparison limits the plain version of the theory without refuting theirs.",
        },
        {
          id: "flat-output",
          title: "Flat output breaks the pure-Baumol story",
          description:
            "On the NAEP long-term trend assessment, 17-year-olds averaged 285 in reading in 1971 and 287 in 2012, and 304 in mathematics in 1973 and 306 in 2012. Over the same four decades current spending per pupil in public schools rose from $5,980 (1970–71) to $13,196 (2011–12) in constant 2021–22 dollars, about 2.2 times as much. Baumol predicts higher prices, not stagnant results.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source:
            "National Center for Education Statistics, Digest of Education Statistics 2022, Tables 221.85 and 222.85 (NAEP long-term trend reading and mathematics) and Table 236.55 (expenditure per pupil)",
          sourceUrl: "https://nces.ed.gov/programs/digest/d22/tables/dt22_221.85.asp",
          reasoning:
            "Strong, well-measured — but speaks to quantity/quality, not directly to the price mechanism. The same tables show younger students gaining over the period (9-year-olds from 219 to 244 in mathematics, 13-year-olds from 266 to 285), so the flat line holds at the end of schooling, not throughout it. The age-17 series stops at 2012 because the 2020 administration was postponed.",
        },
        {
          id: "nordhaus-baumol-diseases",
          title: "Nordhaus: Stagnant industries' relative prices rose, as Baumol predicted",
          description:
            "Using U.S. industry data for 1948–2001, William Nordhaus found that 'technologically stagnant sectors clearly have rising relative prices and declining relative real outputs', the pattern Baumol's theory predicts, and that the growing share of stagnant sectors slowed aggregate productivity growth in the second half of the twentieth century.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source:
            "Nordhaus, 'Baumol's Diseases: A Macroeconomic Perspective', NBER Working Paper 12218 (2006); B.E. Journal of Macroeconomics (2008)",
          sourceUrl: "https://www.nber.org/papers/w12218",
          reasoning:
            "An economy-wide test of the mechanism across all industries, not only the three in dispute, so it supports a large share for the no-villain explanation. It does not split health, education or construction into a Baumol part and a residual, which is this crux's test, so directness is 6.",
        },
      ],
    },
    {
      id: "administrative-bloat",
      title: "Administrative Bloat & Third-Party Payment",
      short_summary:
        "Layers of administrators, billers, and compliance staff — funded by insurers and government who write the checks — inflate cost without adding output.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Some administrative growth is the genuine coordination cost of modern, complex care and regulation. And even a large admin share is arithmetically too small to explain a 5x rise in total cost on its own.",
      proponent_rebuttal:
        "The share isn't small and it's cross-nationally anomalous: U.S. health-care administration ran about four and a half times the per-capita cost of single-payer Canada, and university administrator ranks grew far faster than faculty or enrollment for decades. When the payer isn't the patient, no one prices the paperwork.",
      crux: {
        id: "cross-national-admin-gap",
        title: "The Cross-National Admin-Share Gap",
        question:
          "How much of the cost gap is administrative overhead from complex, third-party payment?",
        description:
          "Compare systems that produce similar health outcomes but differ in payment structure (U.S. multi-payer vs. Canada/single-payer). The administrative-cost delta at equal outcomes is the bloat attributable to payment complexity.",
        methodology:
          "Using OECD and Himmelstein et al. (2020) accounts, hold outcome measures (life expectancy, amenable mortality) roughly constant and attribute the residual administrative-spending gap between matched systems.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Compare billing and administrative spending per patient in the US and in single-payer Canada for similar care, using hospital accounts and insurer filings, and see how much of the total spending gap it covers.",
        },
        cost_to_verify: "$0 (OECD + Annals of Internal Medicine 2020 data)",
        falsification: {
          supporter_flip:
            "If matched comparisons of systems with similar health outcomes found the administrative gap between U.S. multi-payer care and Canada's single payer mostly buying real coordination rather than paperwork, the bloat layer of the cost-disease stack would weaken.",
          skeptic_flip:
            "If matched comparisons confirmed U.S. health administration at about four and a half times Canada's per person ($2,497 versus $551 in 2017) at similar outcomes, and university administrators kept outgrowing faculty and students, the growth would look like bloat rather than coordination.",
          common_ground:
            "Both sides agree administration is a large share of U.S. health spending — roughly a third by one estimate — and that no single administrative line explains a several-fold cost rise on its own.",
          live_disagreement:
            "How much of the administrative gap at equal outcomes is waste driven by third-party payment, and how much is the genuine coordination cost of modern care and regulation.",
        },
      },
      evidence: [
        {
          id: "himmelstein-2020",
          title: "U.S. health admin ≈ 4.5x Canada per capita",
          description:
            "Himmelstein et al. (Annals of Internal Medicine, 2020) put U.S. health-care administrative costs at $2,497 per capita versus $551 in Canada in 2017: 34.2% of U.S. national health expenditures against 17.0% of Canada's. The estimates exclude dentists, pharmacies and some other providers, and the two countries' accounting categories differ somewhat.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Himmelstein, Campbell & Woolhandler, Annals of Internal Medicine (2020)",
          sourceUrl: "https://www.acpjournals.org/doi/10.7326/M19-2818",
          reasoning:
            "Peer-reviewed, cross-national, directly measures the administrative share.",
        },
        {
          id: "ginsberg-admin",
          title:
            "Ginsberg: administrators up 85% and administrative staff up 240% while faculty kept pace with enrollment",
          description:
            "In 'The Fall of the Faculty' (2011) Benjamin Ginsberg reports that over four decades the number of full-time-equivalent professors rose slightly more than 50 percent, comparable to the growth in enrollment, while administrators rose 85 percent and administrative staffers 240 percent. Between 1975 and 2005 colleges went from one administrator for every 84 students to one for every 68, and from one professional staffer for every 50 students to one for every 21.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source:
            "Ginsberg, 'The Fall of the Faculty: The Rise of the All-Administrative University and Why It Matters', Oxford University Press (2011); figures from the author's adapted excerpt, 'Administrators Ate My Tuition', Washington Monthly (September/October 2011)",
          sourceUrl:
            "https://washingtonmonthly.com/2011/08/28/administrators-ate-my-tuition/",
          reasoning:
            "Well-documented staffing trend; attributing causation to cost is the softer step. The figures are the author's own, from a book that argues a case.",
        },
        {
          id: "admin-is-real-coordination",
          title: "Some admin is genuine coordination cost",
          description:
            "Modern care coordinates specialists, imaging, pharmacology, and liability in ways 1960 medicine didn't — part of the administrative layer buys real (if unglamorous) output.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 4,
            directness: 6,
          },
          source: "Synthesis / inference — qualitative steelman of administrative output",
          reasoning:
            "A fair steelman, but hard to size; much of the U.S.–Canada gap survives it.",
        },
      ],
    },
    {
      id: "bennett-hypothesis",
      title: "Subsidized-Demand Inflation (the Bennett Hypothesis)",
      short_summary:
        "When government aid or insurance makes the buyer price-insensitive, providers can raise list prices and capture the subsidy.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "Subsidies exist to expand access, and empirical pass-through estimates are all over the map. Besides, K–12 has cost disease without the tuition-style demand subsidy that college has — so subsidy can't be the general mechanism.",
      proponent_rebuttal:
        "Where the natural experiment is cleanest, the pass-through is large: the New York Fed found roughly 60 cents of each subsidized federal-loan dollar showed up as higher tuition. Insurance plays the analogous role in health care, blunting the price signal at the point of sale.",
      crux: {
        id: "subsidy-natural-experiment",
        title: "The Subsidy Natural Experiment",
        question:
          "When aid or insurance rises, do providers raise prices to capture it rather than expanding access?",
        description:
          "Measure how list prices respond to exogenous changes in aid caps or loan-eligibility rules. A high pass-through coefficient means subsidies are being captured as price rather than expanding real access.",
        methodology:
          "Exploit discrete policy changes in federal loan caps (and Medicare/Medicaid reimbursement rules) as instruments; estimate the tuition/price response with a difference-in-differences design, per Lucca, Nadauld & Shen (2015).",
        equation:
          "\\frac{\\partial \\text{Tuition}}{\\partial \\text{Subsidy}} \\approx 0.60",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Measure how list and net prices change after sudden, rule-driven changes in aid or loan limits, such as changes to federal loan caps, comparing affected and unaffected schools or providers.",
        },
        cost_to_verify: "$0 (NY Fed Staff Report No. 733)",
        falsification: {
          supporter_flip:
            "If difference-in-differences studies of loan-cap and reimbursement changes found low pass-through — subsidies mostly expanding access rather than raising list prices — subsidy capture would drop out of the cost-disease stack.",
          skeptic_flip:
            "If more natural experiments matched the New York Fed's estimate that about 60 cents of each subsidized federal-loan dollar showed up as higher sticker tuition, subsidy capture would be hard to dismiss as noise among widely varying estimates.",
          common_ground:
            "Both sides agree K–12 shows cost disease without a tuition-style demand subsidy, so subsidy capture can be at most one layer of the stack, not the general mechanism.",
          live_disagreement:
            "How much of each aid or insurance dollar providers capture as higher prices rather than expanded access — large where the federal-loan natural experiment is cleanest, less certain in health care.",
        },
      },
      evidence: [
        {
          id: "lucca-nadauld-shen",
          title: "About 60 cents of each added subsidized-loan dollar shows up in tuition",
          description:
            "Lucca, Nadauld & Shen (NY Fed Staff Report 733, July 2015, revised February 2017) studied increases in federal student loan caps and 'find a pass-through effect on tuition of changes in subsidized loan maximums of about 60 cents on the dollar, and smaller but positive effects for unsubsidized federal loans.' The effect was most pronounced for more expensive degrees, private institutions and two-year or vocational programs.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "Lucca, Nadauld & Shen, Federal Reserve Bank of New York (2015)",
          sourceUrl: "https://www.newyorkfed.org/research/staff_reports/sr733",
          reasoning:
            "Credibly identified natural experiment, directly on the mechanism — though specific to subsidized loans.",
        },
        {
          id: "insurance-price-insensitivity",
          title:
            "RAND experiment: patients who shared costs spent 20 to 30 percent less than those with free care",
          description:
            "The RAND Health Insurance Experiment randomly assigned 2,750 families, more than 7,700 people under 65, to insurance plans between 1971 and 1982. 'Those with 25 percent coinsurance spent 20 percent less than participants with free care, and those with 95 percent coinsurance spent about 30 percent less.' The saving 'came from using fewer services rather than finding lower prices', and cost sharing in general had no adverse effects on participants' health, with exceptions concentrated among the sickest and poorest.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 5,
          },
          source:
            "RAND Corporation, 'The Health Insurance Experiment: A Classic RAND Study Speaks to the Current Health Care Reform Debate', Research Brief RB-9174-HHS (2006)",
          sourceUrl:
            "https://www.rand.org/content/dam/rand/pubs/research_briefs/2006/RAND_RB9174.pdf",
          reasoning:
            "A randomized test of what fuller coverage does to spending: more care bought, with no measured health gain for the average participant. But the effect ran through how much care people used, not through what providers charged, so it shows insurance inflating demand without showing the price capture this crux asks about. Directness is 5 for that reason (it was 6). The data are from 1971–1982.",
        },
        {
          id: "k12-counterexample",
          title: "K–12 has the disease without the subsidy",
          description:
            "Public schooling is tax-funded, not demand-subsidized through a tuition market, yet it shows the same pattern. In a paper published by the National Center for Education Statistics, the economist Eric Hanushek found that real spending per pupil grew at almost 3.5 percent a year from 1890 to 1990 and that 'the rapid increases in expenditures on schools during the past three decades simply have not been matched by measurable increases in student performance.' So subsidy capture can't be the universal explanation.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "Eric A. Hanushek, 'Improving School Performance While Controlling Costs', National Center for Education Statistics (web publication 96344; the page is headed 'Why We Worry About Education')",
          sourceUrl: "https://nces.ed.gov/pubs/web/96344han.asp",
          reasoning:
            "A genuine limit on the hypothesis's scope. The paper's achievement data stop in 1992, and it is an economist's summary of earlier work, not a new estimate.",
        },
        {
          id: "turner-pell-incidence",
          title: "Turner: Schools capture about 12 percent of Pell Grant aid",
          description:
            "Using regression-discontinuity and regression-kink designs on National Postsecondary Student Aid Study data, Lesley Turner estimated that institutions capture 12 percent of their students' Pell Grant aid through price discrimination. Capture varied by sector: public schools captured less than 5 percent on average, while at selective nonprofit schools cuts in institutional grant aid crowded out two-thirds of Pell aid.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source:
            "Turner, 'The Road to Pell is Paved with Good Intentions: The Economic Incidence of Federal Student Grant Aid', University of Maryland working paper (August 2014)",
          sourceUrl:
            "https://www.econ.umd.edu/sites/www.econ.umd.edu/files/pubs/Turner_FedAidIncidence.pdf",
          reasoning:
            "A credibly identified estimate that most of a large federal grant reaches students rather than schools, so pass-through is not uniformly high. It covers grants rather than the subsidized loans the New York Fed studied and is a working paper, and its two-thirds figure at selective nonprofits shows capture where schools have pricing power, so it narrows the mechanism rather than dismissing it.",
        },
      ],
    },
    {
      id: "regulatory-procurement",
      title: "Regulatory & Procurement Dysfunction",
      short_summary:
        "The U.S. builds physical things — subways, housing, highways — at multiples of peer-nation cost, driven by litigation, consultants, and weak state capacity.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Cross-country comparisons are apples-to-oranges: geology, labor law, wages, density, and project scope all differ. Some of the apparent gap is measurement, not dysfunction.",
      proponent_rebuttal:
        "Matched-project studies control for exactly that and the gap survives: U.S. subway tunneling runs several times French or Korean costs for comparable work, and per-mile Interstate costs tripled as litigation and 'citizen voice' grew. This is the one branch of cost disease with no productivity-growth excuse — a tunnel is a tunnel.",
      crux: {
        id: "matched-project-ratio",
        title: "The Matched-Project Cost Ratio",
        question:
          "Do US projects cost more than comparable ones abroad after wages and ground conditions are controlled for?",
        description:
          "Compare like-for-like projects (e.g., bored subway tunnels of similar geology and length) across countries, controlling for wages and ground conditions. A persistent multiple isolates institutional/process cost from physical cost.",
        methodology:
          "Use the Transit Costs Project database to pair comparable tunneling projects internationally; regress out wage and geological controls; the residual country multiple is the dysfunction estimate.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Compare per-kilometer costs of similar transit tunnels across countries, adjusting for wages and geology, using project databases like the Transit Costs Project, and look for a persistent US multiple.",
        },
        cost_to_verify: "$0 (Transit Costs Project open database)",
        falsification: {
          supporter_flip:
            "If pairing comparable tunneling projects in the Transit Costs Project database and controlling for wages and geology left little residual country multiple, the U.S. gap would be scope and geography rather than dysfunction.",
          skeptic_flip:
            "If more matched-project studies kept U.S. subway tunneling at several times French or Korean costs for comparable work, and the roughly tripled per-mile Interstate cost from the 1960s to the 1980s traced to litigation and participation rules, the gap would look institutional rather than apples-to-oranges.",
          common_ground:
            "Both sides agree differences in station scope, utility relocation, wages and urban density explain part of the gap between U.S. and peer-nation construction costs.",
          live_disagreement:
            "Whether a large U.S. cost multiple survives once wages, geology and scope are controlled for — the one branch of cost disease with no productivity-growth excuse — or whether much of it is measurement.",
        },
      },
      evidence: [
        {
          id: "transit-costs-project",
          title: "Second Avenue Subway Phase 1 cost 8 to 12 times a low-cost baseline",
          description:
            "The Transit Costs Project's database of more than 900 projects in 59 countries ranks the United States the sixth most expensive country for rapid-rail construction, although only 37% of its track length is tunneled. Phase 1 of New York's Second Avenue Subway cost $4.6 billion for 2.7 kilometers of line, about $1.7 billion a kilometer ($2.7 billion a mile), which the project puts at 8 to 12 times its composite baseline drawn from Italy, Istanbul and Sweden.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "Transit Costs Project, 'Transit Costs Study Final Report', NYU Marron Institute (2023)",
          sourceUrl: "https://transitcosts.com/transit-costs-study-final-report/",
          reasoning:
            "A project database plus detailed case studies, aimed at this exact question. The 8-to-12-times figure is New York against the lowest-cost cases, not a national average, and the per-kilometer and per-mile figures are this card's division of the report's cost by its length.",
        },
        {
          id: "brooks-liscow",
          title:
            "Brooks & Liscow: Interstate spending per mile more than tripled from the 1960s to the 1980s",
          description:
            "Brooks & Liscow (AEJ: Applied, 2023) document real spending per new mile of Interstate and find it 'increased more than threefold from the 1960s to the 1980s', an increase that persists after conditioning on pre-existing geographic cost determinants. 'Input prices explain little of the increase.' Changes in income and housing prices statistically explain about half of it, and the authors report 'suggestive evidence' that the rise of 'citizen voice' in government decision-making increased spending per mile.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Brooks & Liscow, 'Infrastructure Costs', American Economic Journal: Applied Economics 15(2): 1–30 (April 2023)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257%2Fapp.20200398",
          reasoning:
            "Peer-reviewed and directly on rising physical-build cost over time, with geography held constant. The citizen-voice explanation is offered as suggestive, not as an identified cause, and the study covers highways, not transit.",
        },
        {
          id: "scope-geography",
          title: "Scope, accounting and geology make precise comparisons difficult",
          description:
            "The Transit Costs Project's final report grants that 'physical geography, archeology, and geology also drive costs', that out-of-date utility maps partly explain why city-center tunnels cost more, and that 'differences in accounting, project scopes, access to unit costs, and transparency make precise comparisons difficult.' It gives its New York premium as a range of 8 to 12 because the component factors are imprecise. It also finds that low-cost countries deliver projects under difficult geological, seismic and archaeological conditions, and that at most a quarter of the labor-cost difference comes from pay.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source: "Transit Costs Project Final Report, NYU Marron Institute (2023)",
          sourceUrl:
            "https://transitcosts.com/transit-costs-study-final-report/",
          reasoning:
            "A real caveat, conceded by the team that measured the gap. By their own account it trims, but does not close, it.",
        },
        {
          id: "eno-50-percent-premium",
          title: "Eno: U.S. transit costs about 50 percent more, with New York driving the largest gap",
          description:
            "The Eno Center for Transportation analysed construction cost data from 180 domestic and international projects and found the United States pays 50 percent more to build transit for both primarily tunneled and primarily at-grade projects. 'When including the disproportionately expensive projects in New York City, the U.S. tunneling premium rises to 250 percent.'",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source:
            "Eno Center for Transportation, 'Saving Time and Making Cents: A Blueprint for Building Transit Better' (July 2021), report release",
          sourceUrl:
            "https://enotrans.org/article/eno-releases-major-report-on-u-s-transit-costs-and-project-delivery/",
          reasoning:
            "A project-level comparison that puts the typical U.S. premium well below the several-fold multiples New York's projects produce, which trims how general the gap is. It still finds a real premium and does not itself hold wages or geology constant, so it narrows rather than closes the institutional-cost case.",
        },
      ],
    },
    {
      id: "measurement-artifact",
      title: "Or: We Just Mismeasure the Quality",
      short_summary:
        "The steelman for 'no disease at all': a 2020 hospital and a 1960 hospital are not the same product, and we fail to price the improvement.",
      icon_name: "HelpCircle" as const,
      skeptic_premise:
        "Modern medicine cures cancers and manages HIV that 1960 medicine could only watch. If we quality-adjusted properly, much of the apparent cost explosion would reveal itself as buying a genuinely better good — cost disease as a statistical illusion.",
      proponent_rebuttal:
        "Quality-adjustment rescues some of health care but breaks on the other sectors: K–12 outcomes (NAEP) are flat despite doubled real spending, and U.S. life-expectancy gains stalled and then reversed in the late 2010s even as spending rose. You cannot mismeasure your way out of flat outputs.",
      crux: {
        id: "outcome-adjusted-index",
        title: "The Outcome-Adjusted Price Index",
        question:
          "Do costs still rise when measured per outcome, like per healthy life-year or per point of test score?",
        description:
          "Rebuild each sector's price series on a per-outcome basis — cost per QALY, cost per NAEP point, cost per passenger-mile. If outcome-adjusted prices are flat, the disease is measurement; if they still rise, it's real.",
        methodology:
          "Construct hedonic/outcome-denominated indices for each sector and compare their trend to the raw price trend. Divergence quantifies how much of 'cost disease' is unpriced quality.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Rebuild health, education and transport price series per unit of result, such as cost per healthy life-year or per test-score point, from government statistics, and check if they still rise over decades.",
        },
        cost_to_verify: "$50K (hedonic index construction across sectors)",
        falsification: {
          supporter_flip:
            "If outcome-denominated price indices — cost per QALY, per NAEP point, per passenger-mile — came out roughly flat, the apparent explosion would be unpriced quality, and the cost-disease claim would reduce to a measurement problem.",
          skeptic_flip:
            "If outcome-adjusted series confirmed that NAEP scores for 17-year-olds barely moved as real school spending rose, and that U.S. life expectancy stalled in the 2010s as health spending climbed, the rise would be hard to explain as unpriced quality.",
          common_ground:
            "Both sides agree modern medicine delivers real gains — statins, antiretrovirals, modern oncology — that raw price indices ignore, so quality adjustment accounts for at least part of health care's cost rise.",
          live_disagreement:
            "How much of the cost rise is unpriced quality once each sector is measured per outcome — plausible for medicine, harder to square with flat test scores and stalled life expectancy.",
        },
      },
      evidence: [
        {
          id: "medicine-improved",
          title: "Health care really did improve",
          description:
            "Statins, antiretrovirals, minimally invasive surgery, and modern oncology deliver outcomes unavailable at any price in 1960 — real quality gains that raw price indices ignore.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source: "Synthesis / inference — broad historical quality adjustment across treatments",
          reasoning:
            "Clearly true for health care; the question is how much of the cost it justifies.",
        },
        {
          id: "cutler-value-medical-spending",
          title: "Cutler, Rosen & Vijan: medical spending since 1960 bought life-years at about $19,900 each",
          description:
            "Cutler, Rosen and Vijan (NEJM, 2006) set U.S. life-expectancy gains from 1960 to 2000 against the rise in medical spending, assuming half of the gains came from medical care. For a newborn the cost per year of life gained was $19,900; about $31,600 at age 15, $53,700 at 45 and $84,700 at 65. They concluded that 'on average, the increases in medical spending since 1960 have provided reasonable value.' The cost per life-year rose over time, from $7,400 in the 1970s to $36,300 in the 1990s, and at age 65 it was $121,000 in the 1980s and $145,000 in the 1990s.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source:
            "Cutler, Rosen & Vijan, 'The Value of Medical Spending in the United States, 1960–2000', New England Journal of Medicine 355:920–927 (2006)",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/16943404/",
          reasoning:
            "The outcome-denominated health measure this crux asks for: per life-year gained, the extra spending looks worth its price, which supports reading much of health care's cost rise as bought quality. It rests on the assumption that half of longevity gains came from medicine and stops at 2000, and its own rising cost per life-year, steepest for the elderly, is what the other side points to, so replicability is 6 and directness 7.",
        },
        {
          id: "naep-flat",
          title: "Schooling outputs are flat",
          description:
            "NAEP long-term-trend scores for 17-year-olds moved two points in four decades, from 285 to 287 in reading (1971 to 2012) and from 304 to 306 in mathematics (1973 to 2012). Over the same period real current spending per pupil in public schools more than doubled, from $5,980 in 1970–71 to $13,196 in 2011–12 in constant 2021–22 dollars, leaving no measured achievement gain at the end of schooling to absorb the extra cost.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "National Center for Education Statistics, Digest of Education Statistics 2022, Table 236.55 (expenditure per pupil) and Tables 221.85 and 222.85 (NAEP long-term trend reading and mathematics)",
          sourceUrl: "https://nces.ed.gov/programs/digest/d22/tables/dt22_236.55.asp",
          reasoning:
            "Strong, hard-to-dismiss evidence that at least one sector's disease is real, not measured. The limit is that younger students did gain on the same assessment (9-year-olds rose from 208 to 221 in reading and from 219 to 244 in mathematics), so the flat result is for 17-year-olds.",
        },
        {
          id: "life-expectancy-stall",
          title: "Life expectancy rose 0.2 years from 2010 to 2014, then fell 0.3 years by 2017",
          description:
            "The National Center for Health Statistics reports that U.S. life expectancy at birth rose 0.2 years from 2010 through 2014, fell 0.3 years from 2014 through 2017 and recovered 0.1 year in 2018, leaving it 0.2 years below the 2014 peak. Eight years with no net gain are hard to square with a pure quality-improvement story. Half of the 2014–2017 decline (50.6% of the negative contribution) came from unintentional injuries, and falling cancer and heart-disease mortality partly offset it.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "Kochanek, Anderson & Arias, 'Changes in Life Expectancy at Birth, 2010–2018', NCHS Health E-Stat (January 2020)",
          sourceUrl:
            "https://www.cdc.gov/nchs/data/hestat/life-expectancy/lifeexpectancy-H.pdf",
          reasoning:
            "Undercuts the 'we're buying more health' defense in the flagship sector, with a limit the source itself supplies: the decline came mainly from injury deaths, Alzheimer disease and suicide, while mortality from cancer and heart disease, where medical care does most, kept falling. The report covers life expectancy only; that health spending rose over these years comes from the national health accounts, not from this source.",
        },
      ],
    },
  ],
};
