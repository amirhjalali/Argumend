import type { Topic } from "@/lib/schemas/topic";

export const universalBasicIncomeData = {
  id: "universal-basic-income",
  title: "Universal Basic Income",
  meta_claim:
    "Universal Basic Income (UBI) would be economically beneficial and should be implemented in developed nations.",
  status: "contested" as const,
  category: "policy" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "The big fear about UBI — that free money makes people quit working — barely shows up in the trials: from Finland to Kenya to the largest US experiment ($1,000/month for 3 years), employment fell only slightly (~2 points), with recipients shifting toward education, caregiving, and pickier job search. The real binding constraint isn't work incentives — it's the ~$3.1 trillion-a-year price of paying everyone.",
    confidence: 82,
    source:
      "Vivalt et al., OpenResearch income study (NBER, 2024); Finland Basic Income Experiment (2019); GiveDirectly Kenya (Egger et al. 2022)",
    sourceUrl: "https://www.nber.org/papers/w32719",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "The loudest objection to UBI — that unconditional cash makes people stop working — is mostly not what the experiments show: pilots in Finland, Stockton, and Kenya found small or no employment drops, and the largest US trial (OpenResearch, $1,000/month for three years) found employment fell only ~2 points, with recipients shifting toward education, caregiving, and choosier job searches.",
    "The genuinely hard problem is arithmetic: a universal $1,000/month for every US adult costs about $3.1 trillion a year gross — comparable to the entire discretionary budget — and every realistic funding mix (VAT, program consolidation, new taxes) is itself contested on whether it adds up without large deficits or growth costs.",
    "So the honest debate isn't 'will people freeload?' (mostly no) but whether a permanent, nationwide program behaves like the temporary pilots — and whether universality (sending Jeff Bezos the same check as a homeless veteran) beats spending the same money on targeted programs.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Economic Impact & Fiscal Feasibility
    // =========================================================================
    {
      id: "economic-impact-fiscal-feasibility",
      title: "Economic Impact & Fiscal Feasibility",
      short_summary:
        "A universal $1,000/month payment to all US adults would cost approximately $3.1 trillion annually. Proponents argue this can be funded through VAT, consolidating existing welfare programs, and economic growth effects. Skeptics contend the costs are prohibitive and would require either unsustainable deficits or economy-damaging tax increases. Real-world programs like Alaska's Permanent Fund Dividend ($1,000-$2,000/year since 1982) operate at far smaller scales than proposed national UBI.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "A $1,000/month UBI for all ~258 million US adults would cost roughly $3.1 trillion annually on a gross basis — comparable to the entire federal discretionary budget and a large share of current federal revenue. Andrew Yang's Freedom Dividend (which used a lower ~236 million adult base, for a ~$2.8 trillion gross cost) relied on a new 10% VAT plus four other taxes; the nonpartisan Tax Foundation estimated those five taxes would raise only about $1.3 trillion per year (the VAT contributing ~$952 billion), and that even after offsetting spending cuts and economic feedback the proposal would still increase the federal deficit by about $1.5 trillion each year while reducing economic output by about 3 percent. The Penn Wharton Budget Model estimated that a deficit-financed $6,000/year UBI would raise federal debt by 63.5% by 2027 and 81.1% by 2032, with GDP falling 6.1% and 9.3% respectively. Countries with generous social spending like Finland and Denmark already have tax-to-GDP ratios of 42-46% — attempting to layer UBI on top would push tax burdens toward levels rarely sustained by any large modern economy. Every dollar of UBI must come from somewhere: higher taxes reduce economic growth, borrowing crowds out private investment, and cutting existing programs harms their current beneficiaries.",
      proponent_rebuttal:
        "The $3.1 trillion gross cost is misleading because it ignores offsets and economic feedback effects. First, consolidating over 80 means-tested federal welfare programs (with combined administrative costs exceeding $100 billion annually) into a single universal payment eliminates bureaucratic overhead and benefit cliffs that trap people in poverty. Second, UBI functions as an economic stimulus — the Roosevelt Institute modeled that a $1,000/month UBI would grow GDP by 12.56% over 8 years due to increased consumer spending, generating substantial new tax revenue. Third, Alaska's Permanent Fund Dividend has operated since 1982 — funded entirely by oil revenues — distributing $1,000-$2,000 per person annually with no adverse fiscal effects and broad bipartisan support. A UBI funded through a combination of VAT, carbon tax, financial transaction tax, and reductions in corporate subsidies is fiscally achievable. The question is not whether we can afford UBI but whether we can afford not to address poverty, insecurity, and the coming wave of automation-driven displacement.",
      crux: {
        id: "fiscal-sustainability-test",
        title: "The Fiscal Sustainability Assessment",
        description:
          "If a national UBI can be funded through a realistic combination of new revenue sources and program consolidation without increasing the national debt-to-GDP ratio beyond sustainable levels (generally considered below 120%), the fiscal feasibility objection is overcome. If all realistic funding models require either economy-damaging tax rates or unsustainable borrowing, the fiscal objection stands.",
        methodology:
          "Commission a comprehensive fiscal modeling study using dynamic scoring (incorporating economic feedback effects) to evaluate at least 5 UBI funding scenarios: (1) VAT + program consolidation, (2) carbon tax + wealth tax, (3) financial transaction tax + corporate subsidy reform, (4) negative income tax phase-out design, and (5) hybrid approach. Model each over 10, 20, and 30 year horizons, accounting for behavioral responses, economic multiplier effects, reduced healthcare and criminal justice costs, and demographic changes. Compare against the fiscal trajectory of maintaining current programs under projected automation displacement.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$1-3M (Comprehensive dynamic fiscal modeling requiring CBO-grade economic analysis)",
        falsification: {
          supporter_flip:
            "If comprehensive dynamic-scoring studies found that every realistic funding mix (VAT, program consolidation, new taxes, growth feedback) still blows past sustainable debt levels or requires growth-killing tax rates, the fiscal feasibility case would fail — leaving UBI affordable only by gutting other priorities.",
          skeptic_flip:
            "A skeptic citing the $3.1T gross cost should weigh that the net cost is far lower once you consolidate 80+ means-tested programs and their overhead, and that existing universal cash (Alaska's dividend since 1982) has run for decades without fiscal harm — so 'we can't afford it' depends heavily on design.",
          common_ground:
            "Both sides agree a meaningful national UBI is enormously expensive on a gross basis and must be paid for by some mix of new taxes, program cuts, or borrowing.",
          live_disagreement:
            "Whether any realistic funding design covers UBI without pushing debt or tax rates to growth-damaging levels — which only CBO-grade dynamic modeling of competing funding mixes could settle.",
        },
      },
      evidence: [
        {
          id: "yang-freedom-dividend-cost",
          title: "Yang's Freedom Dividend: $2.8 Trillion Gross Cost, ~$1.5 Trillion Annual Deficit Gap",
          description:
            "Andrew Yang's 2020 presidential campaign proposed a $1,000/month 'Freedom Dividend' for all US adults aged 18+, a gross cost of roughly $2.8 trillion annually. The Tax Foundation analyzed the funding model — which relied on a new 10% Value Added Tax plus four other tax increases — and estimated the five proposed taxes would raise only about $1.3 trillion per year on a conventional basis (the broad-based VAT contributing roughly $952 billion). The Tax Foundation concluded that, even after accounting for offsetting spending reductions and economic feedback, the proposal would increase the federal budget deficit by about $1.5 trillion each year. It also estimated that the higher marginal tax rates on labor would reduce economic output by about 3 percent.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 9,
          },
          source: "Tax Foundation; Yang2020 Campaign Policy Documents",
          sourceUrl: "https://taxfoundation.org/blog/andrew-yang-value-added-tax-universal-basic-income/",
          reasoning:
            "The Tax Foundation is a credentialed, nonpartisan tax policy organization, and its analysis directly addresses the fiscal feasibility question with explicit revenue and deficit estimates. The ~$1.5 trillion annual deficit gap is significant. However, the result depends on conventional (rather than fully dynamic) scoring assumptions — more optimistic growth and program-consolidation assumptions would narrow the gap.",
        },
        {
          id: "alaska-pfd-42-years",
          title: "Alaska's Permanent Fund Dividend: 42+ Years of Universal Cash Payments",
          description:
            "Since 1982, Alaska's Permanent Fund Dividend (PFD) has distributed annual payments of $1,000-$2,000 to every resident, including children. The program is funded by investment returns from the state's $80+ billion sovereign wealth fund (seeded by oil revenues). The PFD has operated continuously through recessions, oil price crashes, and political transitions. Research by Damon Jones and Ioana Marinescu (2022) found no measurable reduction in labor supply, and the program enjoys over 75% public approval. However, the PFD amount ($1,000-$2,000/year) is far below proposed national UBI levels ($12,000-$24,000/year), limiting its relevance as a fiscal model.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "Jones & Marinescu (2022), Journal of Public Economics; Alaska Permanent Fund Corporation",
          sourceUrl: "https://www.sciencedirect.com/science/article/abs/pii/S0047272721001808",
          reasoning:
            "The Alaska PFD is the longest-running real-world universal cash transfer in a developed country, and the Jones/Marinescu study was published in a top economics journal. It demonstrates that universal payments are administratively feasible and politically durable. However, the small payment size (roughly 1/10th of proposed UBI levels) and unique funding source (oil wealth) significantly limit its directness as evidence for national UBI feasibility.",
        },
        {
          id: "penn-wharton-debt-projection",
          title: "Penn Wharton Model: Deficit-Financed UBI Would Raise Federal Debt 63.5% by 2027",
          description:
            "The Penn Wharton Budget Model at the University of Pennsylvania used its dynamic overlapping-generations model to simulate a $6,000/year UBI for every adult. If deficit-financed, the model projected the plan would increase federal debt by over 63.5% by 2027 and by 81.1% by 2032, with GDP falling by 6.1% by 2027 and 9.3% by 2032 as higher anticipated future taxes and reduced saving shrink the capital stock. The analysis concluded that an unconditional UBI of this scale produces meaningful economic contraction unless paired with large offsetting tax increases, which themselves further reduce output.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "Penn Wharton Budget Model, University of Pennsylvania",
          sourceUrl: "https://budgetmodel.wharton.upenn.edu/issues/2018/3/29/options-for-universal-basic-income-dynamic-modeling",
          reasoning:
            "The Penn Wharton Budget Model is a highly regarded academic policy modeling center, and this analysis directly addresses fiscal feasibility with rigorous dynamic (OLG) scoring. However, it models a specific design (a flat $6,000 UBI with no phase-out) under deficit financing; negative income tax designs, smaller amounts, or fully tax-financed variants could produce substantially different debt and output results.",
        },
        {
          id: "roosevelt-institute-gdp-growth",
          title: "Roosevelt Institute: $1,000/Month UBI Could Grow GDP by 12.56% Over 8 Years",
          description:
            "A 2017 macroeconomic modeling study by the Roosevelt Institute projected that a $1,000/month UBI funded by deficit spending would grow GDP by 12.56% over 8 years, primarily through increased consumer spending (demand-side stimulus). Even a tax-funded version was projected to grow GDP by 2.62% due to the higher marginal propensity to consume among lower-income recipients. The model used the Levy Institute's stock-flow consistent macroeconomic framework. Critics noted the model assumed no supply-side constraints, no inflationary pressure, and relied on Keynesian multiplier effects that may not hold at full employment.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "Roosevelt Institute; Levy Economics Institute",
          sourceUrl: "https://rooseveltinstitute.org/publications/macroeconomic-effects-universal-basic-income/",
          reasoning:
            "The Roosevelt Institute is a progressive-leaning think tank, which reduces independence somewhat. The Levy macro model is peer-reviewed but the specific assumptions (no supply constraints, full multiplier effects) are debatable. The study provides a useful upper bound on potential economic stimulus but critics have reasonable objections about inflationary effects and the unrealism of sustained deficit-funded UBI.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Labor Market Effects & Work Incentives
    // =========================================================================
    {
      id: "labor-market-work-incentives",
      title: "Labor Market Effects & Work Incentives",
      short_summary:
        "The central objection to UBI is that unconditional income reduces the incentive to work. The evidence is genuinely mixed. Pilots in Finland, Stockton, Canada, and Kenya found minimal employment reductions, and some found gains in full-time work or entrepreneurship — but the largest and most recent US trial (OpenResearch, $1,000/month for 3 years) found recipients worked modestly less (2 percentage points lower employment, ~1.3 fewer hours/week), echoing the 1970s negative-income-tax experiments. The debate hinges on whether these small reductions reflect harmful disincentives or welcome shifts toward caregiving, education, and job quality — and whether short-term pilots predict behavior under a permanent national program.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Basic economic theory predicts that unconditional income reduces the incentive to work — the 'income effect.' The 1970s US Negative Income Tax experiments (SIME/DIME in Seattle and Denver) found labor supply reductions of 5-7.9% for men, 15-20% for women, and significant increases in divorce rates. These were among the most rigorous social experiments ever conducted and directly contributed to the political death of guaranteed income proposals for decades. UBI pilot programs are structurally unable to capture long-term behavioral effects because participants know the program will end — creating an incentive to stay employed that would not exist under a permanent program. At scale, UBI could create a culture of dependency, reduce the labor force participation rate, and make critical but unpleasant jobs (sanitation, elder care, food processing) impossible to staff without dramatic wage increases that would fuel inflation.",
      proponent_rebuttal:
        "The 1970s NIT experiments have been extensively reanalyzed. The labor supply reductions were modest (2-4 hours per week), concentrated among secondary earners (mostly mothers with young children choosing to stay home), and accompanied by increases in education enrollment and job search quality. The divorce finding has been debunked — it was a statistical artifact corrected by Cain and Wissoker (1990). Modern pilot programs tell a more nuanced story: Finland's 2017-2018 basic income experiment found no negative employment effect and significant improvements in well-being and trust. Stockton's SEED program found full-time employment among recipients rose from 28% to 40% over its first year. GiveDirectly's long-term cash transfer program in Kenya found no reduction in labor supply and increased entrepreneurship. The largest US trial — OpenResearch's $1,000/month, 3-year experiment (2024) — did find a real but modest reduction (employment 2 points lower, ~1.3 fewer hours/week), but much of it reflected recipients pursuing education, caregiving, more selective job search, and business creation rather than dropping out of work entirely. The fear that people will simply stop working ignores abundant evidence that humans are motivated by purpose, social connection, and status — not just survival pressure. UBI removes the poverty trap of means-tested benefits, where recipients lose benefits dollar-for-dollar as they earn more, effectively facing marginal tax rates above 80%.",
      crux: {
        id: "permanent-ubi-labor-supply",
        title: "The Permanent-Program Labor Supply Test",
        description:
          "If a permanent, nationwide UBI at a meaningful level ($1,000/month) causes aggregate labor force participation to decline by more than 3-5%, the economic costs likely outweigh the benefits. If labor participation remains stable or shifts toward higher-quality employment (more education, entrepreneurship, caregiving), the work disincentive objection is empirically refuted.",
        methodology:
          "Conduct a large-scale (10,000+ participants), long-duration (5+ years) randomized controlled trial with guaranteed continuation, explicitly designed to eliminate the 'temporary program' bias. Include a saturation arm where entire communities receive UBI to capture general equilibrium effects (wage changes, business formation, local economic multipliers). Track not just employment rates but hours worked, job quality, wages, entrepreneurship, education enrollment, caregiving time, and volunteering. Compare against a control group receiving equivalent value in existing means-tested benefits.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$50-150M (Large-scale, multi-year RCT with saturation sites and long-term follow-up)",
        falsification: {
          supporter_flip:
            "If a large, long, guaranteed-permanent trial (removing the 'it'll end' bias of pilots) showed aggregate labor-force participation falling more than 3–5%, the work-disincentive objection would be vindicated and the case for UBI would weaken.",
          skeptic_flip:
            "A skeptic citing the 1970s NIT experiments should weigh that modern pilots (Finland, Stockton, Kenya, OpenResearch) found only small reductions concentrated in caregiving, education, and job search — not mass exit — and that the famous NIT divorce finding was a debunked statistical artifact.",
          common_ground:
            "Both sides agree short-term pilots can't fully capture how a permanent program would change behavior, since participants know the pilot ends.",
          live_disagreement:
            "Whether a permanent national UBI would replicate the pilots' small labor-supply effects or produce larger withdrawal once the income is known to be lifelong — which only a long, guaranteed-permanent trial could test.",
        },
      },
      evidence: [
        {
          id: "finland-basic-income-experiment",
          title: "Finland Experiment (2017-2018): Small Employment Effect, Improved Well-being",
          description:
            "Finland's national basic income experiment provided 560 euros/month to 2,000 randomly selected unemployed individuals for two years (2017-2018). The final results, released on May 6, 2020 by the Ministry of Social Affairs and Health and Kela (Finland's social insurance institution), found: (1) only small employment effects — recipients worked on average about 6 days more over the period than the control group, (2) recipients reported significantly higher life satisfaction, (3) recipients had greater trust in institutions and other people, (4) recipients reported better mental wellbeing, with less mental strain, depression, sadness and loneliness, and (5) recipients felt more secure about their income and future. The experiment was limited to unemployed individuals (not universal) and lasted only two years.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Ministry of Social Affairs and Health, Finland; Kela (Social Insurance Institution of Finland)",
          sourceUrl: "https://stm.fi/en/-/perustulokokeilun-tulokset-tyollisyysvaikutukset-vahaisia-toimeentulo-ja-psyykkinen-terveys-koettiin-paremmaksi",
          reasoning:
            "This was a government-run, nationally representative RCT — the gold standard for causal inference. The null finding on employment directly addresses the work disincentive concern. However, the experiment was limited to already-unemployed individuals, lasted only 2 years, and the payment (560 euros) was below poverty-line income in Finland. These limitations reduce directness as evidence for a permanent, universal program.",
        },
        {
          id: "stockton-seed-employment-increase",
          title: "Stockton SEED (2019-2021): Full-Time Employment Rose from 28% to 40%",
          description:
            "The Stockton Economic Empowerment Demonstration (SEED) provided $500/month to 125 randomly selected residents of Stockton, California for 24 months (2019-2021). The independent first-year evaluation by Dr. Stacia West (University of Tennessee) and Dr. Amy Castro Baker (University of Pennsylvania) found that full-time employment among recipients rose from 28% to 40% over the first year (Feb 2019-Feb 2020) — a 12 percentage point gain versus a 5 point gain in the control group (32% to 37%). Recipients also showed reduced income volatility, improved mental health (reduced anxiety and depression), and increased goal-setting behavior. Most spending went to food (37%), home goods and clothing (22%), utilities (11%), and auto costs (10%) — contradicting fears of frivolous spending.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source: "West & Castro Baker (2021), Preliminary Analysis: SEED's First Year (self-published research report, not peer-reviewed)",
          sourceUrl: "https://www.stocktondemonstration.org/",
          reasoning:
            "SEED was a randomized controlled trial, and the counterintuitive finding that guaranteed income increased full-time employment supports the hypothesis that financial stability enables better job searching and risk-taking. But the weight is limited: the headline employment result comes from a self-published first-year report (not a peer-reviewed journal article), the treatment sample was very small (n=125), the employment gain was measured over a single year before the pandemic disrupted the second year, and participants knew the program was temporary. It is suggestive, not dispositive.",
        },
        {
          id: "sime-dime-labor-reduction",
          title: "Seattle/Denver NIT Experiments (1970s): 5-7.9% Male Labor Supply Reduction",
          description:
            "The Seattle-Denver Income Maintenance Experiments (SIME/DIME), conducted from 1970-1978, were the largest US negative income tax experiments, enrolling approximately 4,800 families. Results showed labor supply reductions of 5-7.9% for husbands, 15-20% for wives, and 12-15% for single female household heads. Hours worked declined by an average of 2-4 hours per week. Secondary earners (mostly wives) accounted for the largest reductions, largely withdrawing from low-wage work to focus on childcare. A widely reported finding of increased divorce was later shown to be a statistical error by Cain and Wissoker (1990). Subsequent reanalysis by Robins (1985) found smaller labor supply effects than originally reported.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "SRI International; US Department of Health and Human Services; Robins (1985)",
          sourceUrl: "https://aspe.hhs.gov/reports/overview-final-report-seattle-denver-income-maintenance-experiment",
          reasoning:
            "SIME/DIME remains one of the largest and most rigorous social experiments in US history. The labor supply reductions, while real, were modest and concentrated among secondary earners choosing caregiving over low-wage work — which many would consider a positive outcome. The experiments directly test the work disincentive hypothesis but were conducted 50 years ago in a very different labor market, reducing current applicability.",
        },
        {
          id: "openresearch-unconditional-cash-2024",
          title: "OpenResearch (2024): Largest US UBI Trial Found a Modest Reduction in Work",
          description:
            "The OpenResearch Unconditional Cash Study — funded by Sam Altman and run from late 2020 to late 2023 — is the largest and longest randomized UBI experiment in US history. It gave 1,000 low-income participants (ages 21-40) $1,000/month for three years, with a control group of 2,000 receiving $50/month. Results released in July 2024 found that recipients were on average 2 percentage points less likely to be employed and worked about 1.3 fewer hours per week, with partners also working somewhat less (a total household reduction of roughly 1.3-3.9 hours depending on subgroup). Single parents reduced employment by 3.9 percentage points and hours by 2.8. The reduction partly reflected recipients pursuing education/training, more selective job search, and caregiving, and Black and female recipients were significantly more likely to start businesses. Recipients did not, on average, move into higher-quality or higher-paying jobs, and the study found no significant gains in employment quality, physical health, or several other pre-registered outcomes.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "Vivalt, Rhodes, Bartik, Broockman, Krause & Miller (2024), 'The Employment Effects of a Guaranteed Income,' NBER Working Paper 32719; OpenResearch Unconditional Cash Study",
          sourceUrl: "https://www.nber.org/papers/w32719",
          reasoning:
            "This is the most direct evidence available on the central labor-supply question: a large, long (3-year), well-powered US RCT at a meaningful payment level ($1,000/month), pre-registered and analyzed by credentialed independent economists. Unlike short pilots restricted to the unemployed (Finland) or tiny samples (Stockton, n=125), it captures behavior closer to a permanent program. The finding is genuinely mixed for both sides: the employment reduction is real and statistically significant (cutting against the 'no disincentive' claim), but it is modest and partly composed of education, caregiving, and entrepreneurship rather than pure withdrawal. The headline null findings on health and job quality also temper the strongest proponent well-being claims.",
        },
        {
          id: "givedirectly-kenya-long-term",
          title: "GiveDirectly Kenya: Long-Term Cash Transfers with No Work Reduction",
          description:
            "GiveDirectly's unconditional cash transfer program in rural Kenya, studied by Banerjee et al. (2020) and Egger et al. (2022) in peer-reviewed publications, found that lump-sum transfers of approximately $1,000 (roughly one year's income) produced: no reduction in labor supply, a 5% increase in consumption, increased business creation, and significant local economic multiplier effects (every $1 transferred generated $2.60 in local economic activity). A 12-year follow-up of long-term recipients is ongoing. The program demonstrates that unconditional cash does not reduce work effort even in a context with very low baseline incomes. However, rural Kenya differs dramatically from developed economies in relevant ways (informal labor markets, subsistence agriculture, limited social safety nets).",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source: "Egger et al. (2022), Econometrica; Banerjee et al. (2020), NBER Working Paper",
          sourceUrl: "https://www.givedirectly.org/research-on-cash-transfers/",
          reasoning:
            "Published in Econometrica (a top economics journal) with rigorous experimental design. The $2.60 multiplier finding is particularly significant for fiscal feasibility arguments. However, directness is lower because rural Kenya is a fundamentally different economic context from the developed nations where UBI is primarily proposed — different labor markets, price levels, social norms, and baseline welfare provision.",
        },
        {
          id: "canada-mincome-experiment",
          title: "Canada Mincome (1974-1979): Labor Reduction Only Among Mothers and Teens",
          description:
            "The Manitoba Basic Annual Income Experiment (Mincome) ran from 1974-1979 in Winnipeg and the small town of Dauphin, Manitoba, providing a guaranteed income floor to approximately 1,300 families. The original data went unanalyzed for decades until economist Evelyn Forget recovered and published results in 2011. She found: primary earner labor supply reductions of only 1%, secondary earner (wives) reductions of 3%, and teenage labor reductions of 5% — with teens staying in school longer. In the Dauphin 'saturation site' (where all eligible families received payments), hospitalization rates dropped 8.5%, mental health visits declined, and high school completion rates increased. The experiment was cancelled by a new government before completion, and the original data nearly lost.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Forget (2011), Canadian Public Policy; University of Manitoba",
          sourceUrl: "https://utpjournals.press/doi/abs/10.3138/cpp.37.3.283",
          reasoning:
            "Forget's recovery and analysis of the Mincome data is a valuable contribution, published in a peer-reviewed Canadian policy journal. The Dauphin saturation site provides rare evidence of community-wide effects (health improvements, education gains) that individual-level experiments cannot capture. However, the data was recovered decades later, the original experimental design was not completed, and 1970s rural Canada differs significantly from modern policy contexts.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Social Outcomes & Well-being
    // =========================================================================
    {
      id: "social-outcomes-wellbeing",
      title: "Social Outcomes & Well-being",
      short_summary:
        "Beyond employment and fiscal questions, UBI proponents argue it would produce transformative social benefits: reducing poverty, improving physical and mental health, strengthening education outcomes, and reducing crime. Skeptics counter that unconditional cash transfers are less effective than targeted programs and may enable harmful behaviors. Pilot programs consistently show well-being improvements, but long-term, population-level effects remain uncertain.",
      icon_name: "HelpCircle" as const,
      skeptic_premise:
        "Targeted programs are more effective than unconditional cash because they address specific needs with accountability. SNAP ensures food spending, Medicaid covers healthcare, Section 8 provides housing — each verified to reach its intended purpose. Unconditional cash may be spent on alcohol, gambling, or other consumption that does not improve well-being. The 'scarcity mindset' theory (that poverty reduces cognitive bandwidth) is based on limited evidence that has faced replication challenges. UBI also fails to address structural causes of poverty — discrimination, inadequate schools, lack of affordable housing, healthcare deserts — that no amount of individual cash can fix. A universal payment is regressive in its simplicity: Jeff Bezos receives the same check as a homeless veteran. Means-tested programs, for all their bureaucratic flaws, at least concentrate resources on those who need them most.",
      proponent_rebuttal:
        "The empirical evidence overwhelmingly shows that unconditional cash transfers are not wasted. A 2020 World Bank meta-analysis of 44 studies across 19 countries found that cash transfers do not increase spending on alcohol or tobacco — a finding robust across cultures, income levels, and program designs. Means-tested programs, while well-intentioned, impose enormous administrative costs (up to 30% of program budgets), create stigma and barriers that reduce uptake (by 2020 only 21 of every 100 families in poverty received TANF cash assistance, down from 68 in 1996), and generate poverty traps through high effective marginal tax rates when benefits phase out. The Finland experiment showed statistically significant improvements in life satisfaction and institutional trust. Stockton SEED recipients reported reduced anxiety and depression. The Mincome experiment's saturation site saw an 8.5% reduction in hospitalizations. These well-being effects have monetary value — the RAND Corporation estimated that each $1 reduction in poverty saves $7 in downstream social costs (healthcare, criminal justice, lost productivity). UBI addresses what targeted programs cannot: the chronic stress and decision fatigue of poverty itself.",
      crux: {
        id: "wellbeing-vs-targeted-programs",
        title: "The UBI vs. Targeted Programs Comparison",
        description:
          "If UBI produces measurably better social outcomes (poverty reduction, health, education, crime reduction) per dollar spent than an equivalent investment in targeted programs, the case for universality is strong. If targeted programs achieve equal or better outcomes with less spending, the efficiency argument favors the existing approach.",
        methodology:
          "Design a multi-arm RCT with at least 3,000 participants per arm: (1) UBI at $1,000/month, (2) equivalent value in optimized targeted benefits (SNAP + Medicaid + housing voucher + job training), (3) UBI + targeted services (hybrid), and (4) control. Track outcomes over 3-5 years including: poverty rate, income volatility, physical health (emergency room visits, chronic disease markers), mental health (PHQ-9 depression scale, GAD-7 anxiety), children's educational outcomes, criminal justice involvement, and subjective well-being (life satisfaction, stress levels). Calculate cost-effectiveness ratios including administrative costs for each arm.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$80-200M (Multi-arm RCT with comprehensive outcome tracking over 3-5 years)",
        falsification: {
          supporter_flip:
            "If head-to-head trials showed optimized targeted programs (SNAP + Medicaid + vouchers) deliver equal or better poverty, health, and education outcomes per dollar than unconditional cash, the case for universality over targeting would collapse to an efficiency loss.",
          skeptic_flip:
            "A skeptic worried cash gets wasted should weigh that a 44-study World Bank review found cash transfers don't increase alcohol/tobacco spending, that means-tested programs reach only a fraction of the eligible (21 of 100 poor families got TANF cash by 2020), and that pilots consistently improved mental health.",
          common_ground:
            "Both sides agree the goal is improving the lives of the poor, and that unconditional cash is not, in the evidence, spent mainly on temptation goods.",
          live_disagreement:
            "Whether unconditional universal cash beats optimized targeted programs per dollar on poverty, health, and education — which only a multi-arm RCT directly comparing them could settle.",
        },
      },
      evidence: [
        {
          id: "world-bank-cash-transfer-meta-analysis",
          title: "World Bank Meta-Analysis: Cash Transfers Do Not Increase Alcohol/Tobacco Spending",
          description:
            "A comprehensive 2020 meta-analysis by Evans and Popova, published by the World Bank, reviewed 44 studies of unconditional cash transfer programs across 19 countries in Africa, Asia, and Latin America. The study found a statistically significant decrease in spending on 'temptation goods' (alcohol and tobacco) among cash transfer recipients. Of the 44 studies, not a single one found a significant increase in temptation good spending. The authors concluded that 'concerns about the use of cash transfers for alcohol and tobacco consumption are not supported by the available evidence.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "Evans & Popova (2017), World Bank Economic Review; Updated 2020",
          sourceUrl: "https://academic.oup.com/wber/article/31/1/44/2897306",
          reasoning:
            "This is a large-scale meta-analysis published in the World Bank's peer-reviewed journal, drawing on studies across 19 countries. The consistency of the finding (zero out of 44 studies showed increased temptation spending) is remarkably robust. Directness is somewhat lower because most studies examined developing-country contexts, not the developed nations where UBI is primarily proposed, though the consistency across diverse contexts strengthens generalizability.",
        },
        {
          id: "rand-poverty-cost-savings",
          title: "RAND/Brookings: Each $1 Reducing Poverty Saves $7 in Social Costs",
          description:
            "Research from the RAND Corporation and Brookings Institution has estimated that childhood poverty costs the US economy $800 billion to $1.1 trillion annually in reduced adult productivity, increased healthcare spending, and higher criminal justice costs. The National Academy of Sciences' 2019 report 'A Roadmap to Reducing Child Poverty' estimated that the economic cost of child poverty amounts to approximately $1 trillion per year, and that each dollar invested in poverty reduction yields approximately $7 in long-term social cost savings. Programs that lifted families above the poverty line produced measurable reductions in emergency room visits, criminal recidivism, and need for remedial education.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "National Academies of Sciences (2019); RAND Corporation; Brookings Institution",
          sourceUrl: "https://nap.nationalacademies.org/catalog/25246/a-roadmap-to-reducing-child-poverty",
          reasoning:
            "The National Academies report represents the scientific consensus on childhood poverty costs and is produced by the most prestigious independent scientific body in the US. The $7 return-on-investment figure provides a strong economic case for poverty reduction. However, directness is moderate because the evidence supports poverty reduction generally, not UBI specifically — targeted programs could achieve similar poverty reduction more efficiently.",
        },
        {
          id: "finland-wellbeing-improvements",
          title: "Finland Experiment: Statistically Significant Improvements in Life Satisfaction and Trust",
          description:
            "The final evaluation of Finland's 2017-2018 basic income experiment, published by Kela in 2020, found that recipients scored significantly higher than the control group on multiple well-being measures: life satisfaction (on a 0-10 scale, recipients scored 0.4 points higher), trust in other people (7% higher), trust in institutions (8% higher), confidence in their ability to influence their own future (12% higher), and self-assessed health (better). Recipients also reported lower levels of loneliness, depression symptoms, and cognitive load (difficulty concentrating). These well-being effects persisted throughout the experiment and were statistically significant at conventional levels.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Kangas et al. (2020), Final Evaluation of the Finnish Basic Income Experiment; Kela",
          sourceUrl: "https://julkaisut.valtioneuvosto.fi/handle/10024/162219",
          reasoning:
            "A government-commissioned, peer-reviewed evaluation of a nationally representative RCT — extremely high methodological quality. The well-being findings are statistically robust and directly relevant to the social outcomes question. The effect sizes are meaningful (0.4 points on life satisfaction is comparable to the effect of becoming employed). However, the 2-year duration and restriction to unemployed individuals limit generalizability to a permanent universal program.",
        },
        {
          id: "tanf-low-uptake-stigma",
          title: "Only 21 of Every 100 Families in Poverty Receive TANF Benefits, Down from 68 in 1996",
          description:
            "The Center on Budget and Policy Priorities reported that in 2020, only 21 of every 100 families in poverty received Temporary Assistance for Needy Families (TANF) cash benefits — down from 68 per 100 in 1996 when welfare reform was enacted. The decline reflects increasingly restrictive eligibility requirements, documentation burdens, mandatory work requirements, time limits, and social stigma. A 2019 GAO study found that administrative costs consume 20-30% of means-tested program budgets. The Urban Institute estimated that the combined 'benefit cliff' across multiple means-tested programs creates effective marginal tax rates of 60-80% for families transitioning out of poverty, trapping them in a zone where earning more money results in less total income after benefit reductions.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Center on Budget and Policy Priorities; GAO; Urban Institute",
          sourceUrl: "https://www.cbpp.org/research/family-income-support/tanf-reaching-few-poor-families",
          reasoning:
            "CBPP, GAO, and Urban Institute are all highly credible nonpartisan policy organizations. The dramatic decline in TANF uptake (from 68% to 21%) despite persistent poverty directly supports the argument that means-testing creates barriers that a universal program would eliminate. The benefit cliff analysis is particularly relevant because UBI, by definition, has no phase-out cliff. However, this evidence supports the universality argument rather than proving UBI's specific efficacy.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Final Evaluation of the Finnish Basic Income Experiment 2017-2018 — Ministry of Social Affairs and Health, Finland",
      url: "https://julkaisut.valtioneuvosto.fi/handle/10024/162219",
    },
    {
      title: "Stockton Economic Empowerment Demonstration (SEED) — Final Research Findings",
      url: "https://www.stocktondemonstration.org/",
    },
    {
      title: "The Employment Effects of a Guaranteed Income: Experimental Evidence from Two U.S. States — Vivalt et al. (2024), NBER Working Paper 32719 (OpenResearch)",
      url: "https://www.nber.org/papers/w32719",
    },
    {
      title: "The Labor Market Impacts of Universal and Permanent Cash Transfers: Evidence from the Alaska Permanent Fund — Jones & Marinescu (2022), Journal of Public Economics",
      url: "https://www.sciencedirect.com/science/article/abs/pii/S0047272721001808",
    },
    {
      title: "General Equilibrium Effects of Cash Transfers: Experimental Evidence from Kenya — Egger et al. (2022), Econometrica",
      url: "https://www.givedirectly.org/research-on-cash-transfers/",
    },
    {
      title: "Macroeconomic Effects of Universal Basic Income Programs — Roosevelt Institute (2017)",
      url: "https://rooseveltinstitute.org/publications/macroeconomic-effects-universal-basic-income/",
    },
    {
      title: "Options for Universal Basic Income: Dynamic Modeling — Penn Wharton Budget Model (2018)",
      url: "https://budgetmodel.wharton.upenn.edu/issues/2018/3/29/options-for-universal-basic-income-dynamic-modeling",
    },
    {
      title: "Cash Transfers and Temptation Goods: A Review of Global Evidence — Evans & Popova, World Bank Economic Review (2017)",
      url: "https://academic.oup.com/wber/article/31/1/44/2897306",
    },
    {
      title: "A Roadmap to Reducing Child Poverty — National Academies of Sciences, Engineering, and Medicine (2019)",
      url: "https://nap.nationalacademies.org/catalog/25246/a-roadmap-to-reducing-child-poverty",
    },
    {
      title: "The Town With No Poverty: The Health Effects of a Canadian Guaranteed Annual Income Field Experiment — Forget (2011), Canadian Public Policy",
      url: "https://utpjournals.press/doi/abs/10.3138/cpp.37.3.283",
    },
    {
      title: "TANF Reaching Few Poor Families — Center on Budget and Policy Priorities",
      url: "https://www.cbpp.org/research/family-income-support/tanf-reaching-few-poor-families",
    },
    {
      title: "Overview of the Final Report of the Seattle-Denver Income Maintenance Experiment — US DHHS",
      url: "https://aspe.hhs.gov/reports/overview-final-report-seattle-denver-income-maintenance-experiment",
    },
    {
      title: "Does Andrew Yang's 'Freedom Dividend' Proposal Add Up? — Tax Foundation Analysis",
      url: "https://taxfoundation.org/blog/andrew-yang-value-added-tax-universal-basic-income/",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Would people actually stop working if given $1,000/month?",
      content:
        "The 1970s Seattle/Denver experiments found modest labor reductions (5-8% for primary earners), mostly among mothers choosing childcare over low-wage work. Modern pilots are mixed: Finland found no employment effect and Stockton saw full-time employment rise from 28% to 40%, while the largest US trial (OpenResearch, $1,000/month for 3 years, 2024) found a real but modest reduction — about 2 points lower employment and 1.3 fewer hours/week, partly driven by education, caregiving, and entrepreneurship. Alaska has paid residents $1,000-$2,000/year since 1982 with no measurable employment effect. Does guaranteed income destroy motivation, or does financial security enable people to make different — sometimes fewer-hours — career and family choices?",
    },
    {
      id: "q2",
      title: "Can any nation actually afford a meaningful UBI?",
      content:
        "A $1,000/month UBI for all US adults costs roughly $3.1 trillion annually — more than the entire discretionary budget. The Penn Wharton model projects a 63.5% GDP-debt increase over a decade. Yet the Roosevelt Institute models a 12.56% GDP growth from demand-side stimulus. Alaska's PFD has run for 42+ years. Is the cost analysis fundamentally different when you account for consolidated welfare savings, reduced poverty costs ($1 trillion/year), and economic multiplier effects?",
    },
    {
      id: "q3",
      title: "Is universal cash more effective than targeted anti-poverty programs?",
      content:
        "Only 21 of every 100 families in poverty receive TANF cash benefits, down from 68 in 1996. Means-tested programs consume 20-30% of budgets on administration and create 'benefit cliffs' with effective marginal tax rates of 60-80%. But targeted programs ensure money goes to specific needs: food, healthcare, housing. A World Bank meta-analysis of 44 studies found zero increases in 'temptation good' spending from cash transfers. Should we trust people with unconditional cash, or does accountability improve outcomes?",
    },
  ],
};
