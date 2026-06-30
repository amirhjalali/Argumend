import type { Topic } from "@/lib/schemas/topic";

export const tippingCultureData = {
  id: "tipping-culture",
  title: "Should Tipping Be Abolished?",
  meta_claim:
    "The United States should abolish tipping and the subminimum tipped wage in favor of service-included wages",
  status: "contested" as const,
  category: "economics" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "The federal cash wage for tipped workers has been frozen at $2.13 an hour since 1991 — a rate Congress severed from the regular minimum wage in 1996 and never raised, so inflation has cut its real value by roughly half. The catch reformers rarely lead with: federal law already requires employers to top tipped workers up to the full $7.25 minimum if tips fall short, and the median U.S. server actually earned about $16.23 an hour including tips in 2024.",
    confidence: 95,
    source:
      "U.S. Dept. of Labor, Fair Labor Standards Act tip-credit provisions; BLS Occupational Employment and Wage Statistics (May 2024)",
    sourceUrl: "https://www.dol.gov/agencies/whd/fact-sheets/15-tipped-employees-flsa",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Critics make a strong case that tipping is a broken wage system: the federal cash wage for tipped workers has been stuck at $2.13 since 1991, the model shifts a worker's income from the employer onto the customer's mood, and decades of research show tip size barely tracks service quality while reliably tracking a server's race and gender.",
    "But the honest counterpoint is that tipping is not the same as poverty wages: federal law already guarantees tipped workers the full minimum if tips fall short, the median U.S. server made about $16.23 an hour including tips in 2024, and many high-earning servers actively oppose abolition because a switch to flat wages can cut their take-home pay.",
    "So the real debate isn't whether $2.13 is defensible (almost no one says it is) — it's whether eliminating tips makes workers better off or just trades a flawed-but-lucrative system for service charges and flat wages that, in the few places that tried it, drove away staff and customers alike.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: The Wage Floor and Income Stability
    // =========================================================================
    {
      id: "wage-floor-stability",
      title: "The Wage Floor and Income Stability",
      short_summary:
        "The federal cash wage for tipped workers has been frozen at $2.13 since 1991, and tipped workers in subminimum-wage states have markedly higher poverty rates. Abolitionists argue this is an indefensible, unstable, employer-subsidizing arrangement. Defenders counter that federal law already guarantees the full minimum when tips fall short, that the median server earns far above minimum wage including tips, and that many tipped workers oppose reform because flat wages would cut their pay.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Tipping outsources the employer's payroll obligation onto the customer and leaves workers' income at the mercy of weather, shift assignments, and customer whims. The federal cash wage for tipped workers has been stuck at $2.13 per hour since 1991 — Congress severed it from the regular minimum wage in a 1996 amendment to the Fair Labor Standards Act and has never raised it, so inflation has eroded roughly half its real value. The result is measurable hardship: poverty rates among waitstaff and bartenders run around 18% in states that allow the $2.13 subminimum, versus about 11% in the handful of states that pay tipped workers the full minimum wage, and tipped workers are more than twice as likely as non-tipped workers to live in poverty. A flat, predictable wage would end this volatility, stop wage theft (the make-up requirement is widely under-enforced), and let workers budget like everyone else.",
      proponent_rebuttal:
        "The $2.13 figure is real but misleading as a picture of what tipped workers earn. Federal law already requires that if a worker's tips plus the $2.13 cash wage do not reach the full $7.25 minimum in any week, the employer must make up the entire difference — so $2.13 is a floor on the employer's cash contribution, not on the worker's pay. In practice tipped workers earn well above the minimum: BLS data put the median U.S. server at about $16.23 an hour including tips in 2024, with bartenders similar, and top earners in busy restaurants make far more. This is precisely why many tipped workers fight reform: when Washington, D.C. began phasing out its tip credit, numerous servers reported their take-home pay fell as customers tipped less. The honest problem is enforcement of the existing make-up rule and the indefensible $2.13 headline number — not the existence of tips, which for skilled servers is a raise, not a wage cut.",
      crux: {
        id: "net-income-after-abolition",
        title: "The Net Take-Home Income Test",
        description:
          "Whether abolishing tips (replacing them with service-included flat wages) raises or lowers the actual take-home pay of typical tipped workers. If servers in equal-wage jurisdictions end up with higher and more stable total earnings, abolition helps the workers it targets. If high-earning tipped workers lose income when tips disappear — as many report when tip credits are removed — abolition redistributes from successful servers to the employer or the lowest earners, and the headline 'workers benefit' claim collapses.",
        methodology:
          "Use a difference-in-differences design comparing total hourly take-home pay (wages plus tips plus service charges, net of any menu-price effects on demand) for front-of-house workers in jurisdictions that eliminated or phased out the tip credit (e.g., Washington, D.C. after 2023; the seven long-standing equal-wage states) against matched control jurisdictions that retained it. Track the full earnings distribution — not just the mean — because abolition's effect plausibly differs for low- versus high-volume servers. Pair payroll and tip-reporting data with the IRS and state wage records, and survey workers on hours, shift stability, and turnover.",
        verification_status: "verified" as const,
        cost_to_verify:
          "$300K-700K (Econometric analysis using state payroll, IRS tip-reporting, and BLS microdata; partially answerable today with D.C. and equal-wage-state data)",
        falsification: {
          supporter_flip:
            "If rigorous difference-in-differences analysis showed that eliminating the tip credit reliably lowers total take-home pay for most front-of-house workers — because lost tips exceed the higher base wage, as many D.C. servers reported — the 'abolition helps workers' case would weaken to 'helps the lowest earners while hurting the median server.'",
          skeptic_flip:
            "A defender who says servers do fine should weigh that the make-up rule is widely under-enforced, that poverty rates for waitstaff are roughly 18% in $2.13 states versus 11% in equal-wage states, and that median pay hides huge volatility and a long left tail of workers who fall through the cracks.",
          common_ground:
            "Both sides agree a $2.13 frozen cash wage is indefensible on its face and that the make-up requirement is poorly enforced; neither side defends $2.13 as the right number.",
          live_disagreement:
            "Whether removing tips raises or lowers total take-home pay for the typical server — which only distribution-level earnings data before and after tip-credit elimination can settle.",
        },
      },
      evidence: [
        {
          id: "213-frozen-since-1991",
          title:
            "Federal Tipped Cash Wage Frozen at $2.13 Since 1991, Severed From Minimum Wage in 1996",
          description:
            "Before 1991 the federal cash wage for tipped workers rose automatically as a fixed percentage of the regular minimum wage. A 1996 amendment to the Fair Labor Standards Act, backed by the restaurant industry, broke that link and froze the tipped cash wage at $2.13 per hour, where it has remained for over three decades. The employer's 'tip credit' — the gap it may count tips against — is the difference between the $7.25 federal minimum and the $2.13 cash wage, i.e., $5.12. Adjusted for inflation, $2.13 in 1991 is worth roughly half its original value today, so the real cash floor for tipped work has steadily eroded.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 8,
          },
          source:
            "U.S. Department of Labor, History of Federal Minimum Wage Rates; FLSA tip-credit provisions",
          sourceUrl: "https://www.dol.gov/agencies/whd/minimum-wage/history",
          reasoning:
            "The figures come directly from the Department of Labor and federal statute and are not in dispute. The freeze since 1991 is a documented legislative fact. Directness is high but not maximal because the cash-wage freeze alone does not establish what workers net (tips and the make-up rule both matter), which is why it supports rather than settles the abolition case.",
        },
        {
          id: "poverty-gap-tipped-states",
          title:
            "Poverty Rates for Waitstaff Run ~18% in $2.13 States vs ~11% in Equal-Wage States",
          description:
            "Analyses by the Economic Policy Institute and the One Fair Wage campaign find that in states allowing a subminimum tipped wage, the poverty rate among waitstaff and bartenders is roughly 18%, compared with about 11% in the seven states that have long required tipped workers be paid the full regular minimum wage before tips. Tipped workers overall are estimated to be more than twice as likely to live in poverty as non-tipped workers, and a majority of tipped restaurant workers are women, concentrating the income volatility on a group with less bargaining power.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 8,
          },
          source:
            "Economic Policy Institute; Restaurant Opportunities Centers United / One Fair Wage",
          sourceUrl: "https://www.epi.org/publication/waiting-for-change-tipped-minimum-wage/",
          reasoning:
            "EPI is a credible labor-economics research institute, but it is advocacy-aligned (union-funded) on this issue and One Fair Wage actively campaigns for abolition, lowering the independence score. The poverty-rate gap is real and replicated across several reports, but the comparison is partly confounded by cost-of-living and industry-mix differences between the two sets of states, so it is suggestive rather than dispositive of causation.",
        },
        {
          id: "median-server-earns-above-minimum",
          title:
            "Median U.S. Server Earned About $16.23/Hour Including Tips in 2024 (BLS)",
          description:
            "The Bureau of Labor Statistics' Occupational Employment and Wage Statistics program reported a median hourly wage for waiters and waitresses of $16.23 in May 2024 (bartenders were similar at about $16.12), with the top 10% of servers earning more than $30 an hour — figures that include tips. Surveys of tipped workers find tips make up roughly 55-60% of total earnings for waitstaff and bartenders. This is the core reason many experienced, high-volume servers oppose abolishing tips: a switch to a flat hourly wage can lower their take-home pay even as it raises the formal wage floor.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 9,
          },
          source:
            "U.S. Bureau of Labor Statistics, Occupational Outlook Handbook / OEWS (May 2024)",
          sourceUrl: "https://www.bls.gov/ooh/food-preparation-and-serving/waiters-and-waitresses.htm",
          reasoning:
            "BLS is the authoritative, nonpartisan source for U.S. occupational wages, and the median figure directly rebuts the impression that tipped workers earn $2.13. The main limitation is that medians hide volatility and a long left tail — low-volume servers and those in slow venues can earn far less — and tip income may be under-reported, which would push the true figure somewhat higher.",
        },
        {
          id: "employer-makeup-requirement",
          title:
            "Federal Law Requires Employers to Make Up the Gap to $7.25 When Tips Fall Short",
          description:
            "Under the FLSA, an employer using the tip credit must ensure that an employee's $2.13 cash wage plus tips equals at least the full $7.25 federal minimum wage in every workweek; if it does not, the employer is legally required to make up the entire difference. A 'tipped employee' is defined as one who customarily receives more than $30 a month in tips. In principle, then, no tipped worker is supposed to legally earn below the regular minimum. In practice, enforcement is weak: Department of Labor investigations regularly recover back wages from restaurants that fail to make up shortfalls, so the legal floor and the actual floor can diverge.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source:
            "U.S. Department of Labor, Fact Sheet #15: Tipped Employees Under the FLSA",
          sourceUrl: "https://www.dol.gov/agencies/whd/fact-sheets/15-tipped-employees-flsa",
          reasoning:
            "The make-up requirement is black-letter federal law and directly undercuts the claim that tipping legally permits sub-minimum pay. The score is held just below maximum because the same DOL enforcement record shows the requirement is frequently violated and under-enforced, which is itself the strongest part of the abolitionist rebuttal — so this evidence cuts in favor of 'fix enforcement' as much as 'tipping is fine.'",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Service Quality, Bias, and the Logic of Tipping
    // =========================================================================
    {
      id: "service-quality-bias",
      title: "Service Quality, Bias, and the Logic of Tipping",
      short_summary:
        "Tipping is defended as a market mechanism that rewards good service, but decades of research show tip size barely correlates with service quality and reliably tracks a server's race and gender instead. Abolitionists argue this makes tipping a discriminatory, ineffective incentive. Defenders counter that tips still give workers control and motivation, and that bias exists in flat-wage hiring and promotion too — so removing tips does not remove discrimination.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The central justification for tipping — that it lets customers reward good service and discipline bad service — does not survive the evidence. Michael Lynn's meta-analysis of 14 studies covering 2,645 dining parties found the correlation between tip size and rated service quality averages only about 0.11, explaining a mere 1-5% of the variation in tips. What does predict tips is the server's identity: Lynn's 2008 research found white customers tipped Black servers roughly four percentage points less than otherwise-identical white servers, and Black servers saw essentially no tip increase for excellent versus mediocre service. Tipping also concentrates sexual harassment, because workers dependent on customer goodwill for income tolerate behavior they otherwise would not. A pay system that doesn't actually measure service and does encode racial and gender bias is not a meritocratic market — it is a discrimination machine with a customer-service veneer.",
      proponent_rebuttal:
        "The weak tip-quality correlation is real but proves less than abolitionists claim. Tips still give workers direct control over their income and a tangible reason to hustle — managers and customers both report that the prospect of a good tip changes behavior at the margin even if the average correlation is modest, and the alternative (a fixed wage) offers no service signal at all. On bias, the finding is genuinely troubling, but discrimination does not vanish under flat wages: it migrates into hiring, scheduling, promotion, and which sections a manager assigns — channels with far less transparency than a customer's tip. Abolitionists also overstate harassment as uniquely tip-driven; harassment is pervasive across low-wage service work regardless of pay model. The honest position is that tipping's incentive value is overstated by its defenders and its bias is real, but eliminating tips does not eliminate either problem; it relocates them.",
      crux: {
        id: "does-abolition-reduce-bias",
        title: "The Discrimination-Reduction Test",
        description:
          "Whether eliminating tips actually reduces race- and gender-based income disparities among service workers, or merely relocates discrimination into less visible channels. If front-of-house earnings disparities by race and gender shrink under service-included wages, the anti-discrimination case for abolition holds. If disparities persist or shift into hiring, scheduling, and promotion, then abolition treats a symptom while leaving the disease — and the bias argument for ending tips is weakened.",
        methodology:
          "Compare race- and gender-based earnings and employment disparities for front-of-house workers across pay models: traditional tipping, mandatory service charges, and flat service-included wages. Use audit-style field experiments (matched servers differing only by race/gender) to measure customer-driven tip bias, paired with payroll and personnel data to measure manager-driven disparities in hiring, section assignment, hours, and promotion under each model. The decisive comparison is total earnings disparity by demographic before versus after a venue or jurisdiction abolishes tipping, holding the labor market constant.",
        verification_status: "verified" as const,
        cost_to_verify:
          "$500K-1.5M (Audit field experiments plus payroll/personnel data across tipping and no-tipping venues)",
        falsification: {
          supporter_flip:
            "If studies showed that race- and gender-based earnings gaps among front-of-house workers persist or even widen after tips are replaced by flat wages — because managers' hiring and scheduling biases simply replace customers' tipping bias — the claim that abolition fights discrimination would collapse.",
          skeptic_flip:
            "A defender who says tipping rewards merit should weigh that tip size explains only ~1-5% of service-quality variance while server race predicts a ~4-point tip gap — so the 'tips measure service' rationale is largely empirically false, whatever happens to bias afterward.",
          common_ground:
            "Both sides accept the empirical findings: tip size correlates weakly with service quality and meaningfully with server race and gender.",
          live_disagreement:
            "Whether abolishing tips actually shrinks demographic earnings gaps or merely moves the bias from customers into managers' hiring and scheduling — an empirical question only post-abolition disparity data can answer.",
        },
      },
      evidence: [
        {
          id: "lynn-weak-service-correlation",
          title:
            "Tip Size Explains Only ~1-5% of Service-Quality Variation (Lynn Meta-Analysis)",
          description:
            "Cornell hospitality researcher Michael Lynn's meta-analysis combined 24 correlations from 14 studies (2,645 dining parties across 21 restaurants) between tip size and customers' rated service quality. The average correlation was only about 0.11 — statistically positive but very weak, accounting for just 1-5% of the variance in how much people tip. Lynn concluded the relationship is too weak to justify using tips to motivate servers, measure server performance, or flag dissatisfied customers, directly undercutting the standard 'tips reward good service' rationale.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source:
            "Lynn & McCall, 'Gratitude and Gratuity' / 'Restaurant Tipping and Service Quality: A Tenuous Relationship,' Cornell School of Hotel Administration",
          sourceUrl: "https://ecommons.cornell.edu/items/042e8740-5c44-486e-ab28-00f05781d153",
          reasoning:
            "Lynn is the most-cited academic researcher on tipping, and a meta-analysis pooling 14 studies is robust and widely replicated. The finding directly addresses the core incentive justification for tipping. Score held just short of maximum because correlational survey data cannot fully rule out that tips exert a real marginal motivational effect that does not show up in aggregate service-quality ratings.",
        },
        {
          id: "lynn-racial-tipping-bias",
          title:
            "White Customers Tip Black Servers ~4 Percentage Points Less Than White Servers",
          description:
            "Lynn's 2008 study in the Journal of Applied Social Psychology, replicating and extending earlier work, found that white customers tipped Black servers roughly four percentage points less than otherwise-comparable white servers, even after controlling for rated service quality. Strikingly, white servers' tips rose from about 16.8% of the bill for less-than-perfect service to 23.4% for perfect service, while Black servers received about 16.6% regardless of whether their service was rated perfect or not — meaning Black servers were effectively unable to earn more through better service. This pattern makes tip income a vector for racial discrimination independent of performance.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source:
            "Lynn et al., 'Consumer Racial Discrimination in Tipping: A Replication and Extension,' Journal of Applied Social Psychology (2008)",
          sourceUrl: "https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1559-1816.2008.00338.x",
          reasoning:
            "Peer-reviewed in a respected journal and a replication of prior findings, with controls for service quality, which strengthens the causal interpretation. Replicability is rated slightly lower because some later experimental tests (Brewster et al.) found weaker or context-dependent server-race effects, indicating the magnitude varies — but the direction and existence of consumer racial bias in tipping is well established.",
        },
        {
          id: "tipping-harassment-link",
          title:
            "Tipped Workers Report Higher Rates of Sexual Harassment in Subminimum-Wage States",
          description:
            "Research from Restaurant Opportunities Centers United and academic surveys finds that women working for tips in subminimum-wage states report sexual harassment at roughly twice the rate of women in equal-wage states, with large majorities of female restaurant workers reporting harassment at some point. The mechanism is economic dependence: when a worker's income hinges on a customer's goodwill, the worker has a financial incentive to tolerate inappropriate behavior from customers (and managers) rather than risk the tip. This makes harassment partly a structural feature of tip-dependence, not just individual misconduct.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 6,
            directness: 7,
          },
          source:
            "Restaurant Opportunities Centers United; National Women's Law Center analyses of tipped-worker harassment",
          sourceUrl: "https://nwlc.org/wp-content/uploads/2024/06/Tipped-Workers-FS-2024.6.12v1.pdf",
          reasoning:
            "The harassment-by-pay-model link is documented across multiple surveys, but the leading data come from advocacy organizations campaigning to abolish tipping, and the self-reported survey methodology and 2x comparison are vulnerable to confounding (which states, which workers), so independence and replicability are scored conservatively. The directional finding is credible but the precise magnitude is contested.",
        },
        {
          id: "bias-migrates-to-management",
          title:
            "Discrimination Persists Under Flat Wages Through Hiring and Scheduling",
          description:
            "Labor-economics research on low-wage and salaried work documents substantial race- and gender-based disparities in hiring, scheduling, section/shift assignment, and promotion — channels that operate regardless of whether income comes from tips or a flat wage. Audit studies of hiring (e.g., callback-gap experiments) consistently find discrimination in fixed-wage jobs, and managers in no-tip restaurants still control which servers get the lucrative shifts and sections. This means abolishing tips removes one visible channel of customer bias but leaves the larger, less transparent channels of employer bias intact, so demographic earnings gaps need not shrink.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "Audit studies of labor-market discrimination (e.g., Bertrand & Mullainathan, AER 2004) and restaurant scheduling/assignment research",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/0002828042002561",
          reasoning:
            "Hiring-discrimination audit studies are rigorous and well replicated, establishing that bias is pervasive in fixed-wage settings. Directness is moderate because these studies are not specifically about restaurant tip-versus-flat-wage transitions; they establish the general point that removing customer-driven bias does not remove employer-driven bias, but do not directly measure what happens to disparities when a specific restaurant abolishes tipping.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Can Service-Included Pricing Actually Replace Tips?
    // =========================================================================
    {
      id: "service-included-feasibility",
      title: "Can Service-Included Pricing Actually Replace Tips?",
      short_summary:
        "The strongest test of abolition is the real-world record: high-profile no-tipping experiments and the elimination of tip credits. Danny Meyer's flagship no-tip experiment collapsed and Washington, D.C. partly reversed its tip-credit phase-out amid worker and restaurant backlash. Abolitionists argue these are transition problems and that equal-wage states function fine; defenders argue they reveal that abolition is unworkable in a market where competitors still tip and customers resist higher menu prices.",
      icon_name: "HelpCircle" as const,
      skeptic_premise:
        "Whatever the theoretical case, abolishing tipping keeps failing in practice. Danny Meyer's Union Square Hospitality Group — one of the most respected restaurant operators in America — launched its 'Hospitality Included' no-tipping model in 2015, raised menu prices to fund higher wages, and abandoned it by 2020; roughly 40% of its experienced front-of-house staff left, partly because they earned less under flat wages. When Washington, D.C. voters passed Initiative 82 in 2022 to phase out the tip credit, many servers said their take-home pay fell as customers stopped tipping, restaurants layered on confusing service fees, and the D.C. Council voted in July 2025 to slow the phase-out and cap the tipped wage at 75% of the minimum rather than eliminate it. In a market where neighboring restaurants still tip and diners balk at higher sticker prices, unilateral abolition drives away both the best staff and the customers — which is why it keeps getting reversed.",
      proponent_rebuttal:
        "The failures are real but they are transition and coordination failures, not proof that service-included pay can't work. Seven states — including California, Washington, and Oregon — have required tipped workers be paid the full minimum wage before tips for decades, and their restaurant industries are large and healthy; customers there still tip on top, and servers in equal-wage states take home more on average. The D.C. experience is genuinely contested: the Economic Policy Institute and the District's own budget office found full-service restaurant employment actually grew (EPI cites ~7.9% growth) after Initiative 82, even as a restaurant-industry group cited losses — the closures coincided with post-pandemic cost spikes, not just the wage law. Isolated no-tip experiments fail precisely because they are isolated: when only one restaurant drops tipping, it can't compete for staff or set customer expectations. A uniform policy change (as in the equal-wage states) avoids that trap, which is why the experiment's failure proves coordination matters, not that the destination is wrong.",
      crux: {
        id: "coordination-vs-unworkable",
        title: "The Coordinated-Transition Test",
        description:
          "Whether no-tipping models fail because of fixable coordination problems (one restaurant can't unilaterally drop tips when competitors keep them) or because service-included pricing is fundamentally rejected by workers and customers even when adopted broadly. If jurisdiction-wide elimination of the tip credit leaves restaurants healthy and workers no worse off — as proponents say the equal-wage states show — abolition is workable with the right scope. If even broad, mandatory transitions trigger sustained worker income losses, customer flight, and political reversal (as in D.C.), the model is unworkable in U.S. dining culture.",
        methodology:
          "Compare outcomes across three regimes over multi-year windows: (1) the seven long-standing equal-wage states, (2) jurisdictions that recently eliminated the tip credit (Washington, D.C.; phased efforts elsewhere), and (3) tip-credit states as controls. Track restaurant counts, full-service employment, average and distributional worker take-home pay, menu prices, customer traffic, and the prevalence of service charges. Distinguish single-venue voluntary experiments (USHG) from mandatory jurisdiction-wide changes, and isolate the wage-policy effect from confounders like post-pandemic inflation and rent.",
        verification_status: "verified" as const,
        cost_to_verify:
          "$400K-900K (Multi-jurisdiction econometric study using state employment, restaurant-census, and price data; partially answerable now)",
        falsification: {
          supporter_flip:
            "If broad, mandatory elimination of the tip credit (not just isolated experiments) reliably produced sustained worker income losses, customer flight, and political reversal — the D.C. pattern repeated wherever it's tried — then abolition would be unworkable in U.S. dining culture, not merely a coordination problem.",
          skeptic_flip:
            "A skeptic pointing to failed experiments should weigh that seven equal-wage states have run healthy restaurant industries for decades with servers taking home more on average, and that EPI and D.C.'s budget office found full-service employment grew (~7.9%) after Initiative 82 — so 'it always fails' is contradicted by the jurisdiction-wide cases.",
          common_ground:
            "Both sides agree single-restaurant no-tip experiments like USHG's largely failed and that the D.C. rollout was rocky and politically contested.",
          live_disagreement:
            "Whether those failures stem from fixable coordination problems (isolated adoption, post-COVID cost shocks) or from a durable rejection of service-included pricing by U.S. workers and diners — which only comparing voluntary single-venue trials against mandatory jurisdiction-wide changes can disentangle.",
        },
      },
      evidence: [
        {
          id: "ushg-no-tip-collapse",
          title:
            "Danny Meyer's 'Hospitality Included' No-Tipping Experiment Collapsed by 2020",
          description:
            "In 2015 Danny Meyer's Union Square Hospitality Group — among the most respected restaurant operators in the U.S. — eliminated tipping at its restaurants under a 'Hospitality Included' model that folded service into higher menu prices and flat wages. The experiment generated significant pushback: roughly 40% of legacy front-of-house service staff left, in part because high-earning servers made less under flat wages, and the higher sticker prices drew customer resistance. USHG ended the policy in July 2020 as it reopened during the pandemic, returning to tipping with revenue-shared compensation for kitchen staff.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Restaurant Dive; Harvard Business School case 'Union Square Hospitality Group: Hospitality Included'; USHG statements",
          sourceUrl: "https://www.restaurantdive.com/news/danny-meyers-restaurant-group-eliminates-no-tipping-policy/581964/",
          reasoning:
            "Well-documented by trade press and a Harvard Business School case study, this is the most prominent voluntary no-tipping experiment and its failure is directly relevant. The key limitation, which proponents stress, is that it was a single operator dropping tips while competitors kept them — a coordination problem — and the final reversal was entangled with the COVID shock, so it does not cleanly test jurisdiction-wide abolition.",
        },
        {
          id: "dc-initiative-82-rollback",
          title:
            "D.C. Voters Passed Tip-Credit Phase-Out (2022), Council Partly Reversed It (2025)",
          description:
            "Washington, D.C. voters approved Initiative 82 with nearly 74% support in November 2022, beginning a phase-out of the tip credit to bring tipped workers to the full minimum wage. By 2024-2025, amid a wave of restaurant closures, proliferating service fees, and reports from servers that their take-home pay had fallen as customers tipped less, the D.C. Council voted 7-5 in July 2025 to slow the increases and cap the tipped wage at 75% of the full minimum wage by 2034 rather than eliminate it. A restaurant-association diner survey found 47% of D.C. patrons were eating out less due to rising prices, service fees, and tipping confusion.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source:
            "Axios D.C.; Washingtonian; Ballotpedia (Initiative 82 amendment, July 2025)",
          sourceUrl: "https://www.axios.com/local/washington-dc/2025/07/29/initiative-82-repeal-dc-tipped-minimum-wage",
          reasoning:
            "The vote, the 2025 partial repeal, and the service-fee backlash are well documented across multiple outlets, making this the most current real-world test of eliminating a tip credit. Directness and reliability are high, but the score is held below maximum because the closures and earnings effects coincided with post-pandemic inflation and rent spikes, and the causal share attributable to Initiative 82 itself is genuinely disputed (see the EPI counter-evidence).",
        },
        {
          id: "equal-wage-states-healthy",
          title:
            "Seven Equal-Wage States Sustain Healthy Restaurant Industries Without a Tip Credit",
          description:
            "Seven states — California, Washington, Oregon, Nevada, Montana, Minnesota, and Alaska — have for decades required that tipped workers be paid the full state minimum wage before tips, with no subminimum tip credit. Their restaurant industries are among the largest in the country and have continued to grow, customers in these states still tip on top of the higher base wage, and EPI analyses find servers and bartenders take home more on average than in $2.13 states. This is the central evidence that service-inclusive base pay is not inherently incompatible with a thriving restaurant sector.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 8,
          },
          source:
            "U.S. Department of Labor, Minimum Wages for Tipped Employees by State; Economic Policy Institute analyses",
          sourceUrl: "https://www.dol.gov/agencies/whd/state/minimum-wage/tipped",
          reasoning:
            "The existence of seven functioning equal-wage states is an indisputable DOL fact and the strongest evidence against the 'abolition is unworkable' claim. The score is moderated because these states retained tipping on top of full wages (so they are not strictly 'no-tip' regimes), and the comparative earnings claims rely partly on advocacy-aligned EPI analysis subject to cost-of-living confounds.",
        },
        {
          id: "epi-dc-employment-grew",
          title:
            "EPI and D.C. Budget Office Found Full-Service Restaurant Employment Grew After Initiative 82",
          description:
            "Countering the closures narrative, the Economic Policy Institute found that employment in D.C. full-service restaurants grew about 7.9% between the year before Initiative 82's implementation and the most recent available data (2024), and the District's own budget director reported the restaurant industry 'remains healthy' with a growing workforce, more restaurants, and rising average wages. EPI argued there was little to no evidence in the public data that raising the tipped minimum wage caused measurable harm to industry employment — attributing the visible closures instead to post-pandemic cost pressures common to restaurants nationwide.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 7,
            directness: 7,
          },
          source:
            "Economic Policy Institute analysis of BLS/D.C. employment data; D.C. Budget Office memo (2025)",
          sourceUrl: "https://www.epi.org/blog/d-c-council-should-support-tipped-workers-by-maintaining-i-82/",
          reasoning:
            "EPI's employment figures draw on official BLS and D.C. government data, and the District budget office is an independent government source, which strengthens the claim. Independence is scored low because EPI explicitly campaigned to keep Initiative 82 and a competing industry-funded group (Employment Policies Institute) reached the opposite conclusion using overlapping data — so the employment effect is a live, contested empirical dispute rather than a settled fact.",
        },
      ],
    },
  ],
  references: [
    {
      title:
        "Fact Sheet #15: Tipped Employees Under the Fair Labor Standards Act (FLSA) — U.S. Department of Labor",
      url: "https://www.dol.gov/agencies/whd/fact-sheets/15-tipped-employees-flsa",
    },
    {
      title:
        "Tipping Culture in America: Public Sees a Changed Landscape — Pew Research Center (2023)",
      url: "https://www.pewresearch.org/2023/11/09/tipping-culture-in-america-public-sees-a-changed-landscape/",
    },
    {
      title:
        "Restaurant Tipping and Service Quality: A Tenuous Relationship — Michael Lynn, Cornell (meta-analysis)",
      url: "https://ecommons.cornell.edu/items/042e8740-5c44-486e-ab28-00f05781d153",
    },
    {
      title:
        "Consumer Racial Discrimination in Tipping: A Replication and Extension — Lynn et al., J. Applied Social Psychology (2008)",
      url: "https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1559-1816.2008.00338.x",
    },
    {
      title:
        "Twenty-Three Years and Still Waiting for Change: The Tipped Minimum Wage — Economic Policy Institute",
      url: "https://www.epi.org/publication/waiting-for-change-tipped-minimum-wage/",
    },
    {
      title:
        "D.C. Council Guts Initiative 82, Caps the Tipped Minimum Wage — Axios Washington D.C. (2025)",
      url: "https://www.axios.com/local/washington-dc/2025/07/29/initiative-82-repeal-dc-tipped-minimum-wage",
    },
  ],
  questions: [
    {
      id: "q1",
      title:
        "Does abolishing tips raise or lower take-home pay for typical workers?",
      content:
        "The federal cash wage for tipped workers has been frozen at $2.13 since 1991, and poverty rates run higher in subminimum-wage states — yet federal law already requires employers to top workers up to $7.25 when tips fall short, and the median U.S. server earned about $16.23 an hour including tips in 2024. When Washington, D.C. began phasing out its tip credit, many servers reported their take-home pay fell as customers tipped less. So would eliminating tips help the workers it targets, or redistribute income away from successful servers toward employers and the lowest earners?",
    },
    {
      id: "q2",
      title:
        "Is tipping a service incentive or a discrimination machine — and does abolition fix it?",
      content:
        "Michael Lynn's meta-analysis found tip size explains only 1-5% of the variation in service quality, while his 2008 research found white customers tipped Black servers roughly four percentage points less than identical white servers, regardless of how good the service was. That undercuts the 'tips reward merit' rationale and suggests tipping encodes racial and gender bias. But discrimination also operates through hiring, scheduling, and promotion under flat wages — so does abolishing tips actually shrink demographic earnings gaps, or merely move the bias from customers into managers?",
    },
    {
      id: "q3",
      title:
        "Can service-included pricing actually replace tipping in U.S. dining culture?",
      content:
        "Danny Meyer's flagship no-tipping experiment collapsed by 2020 after roughly 40% of his front-of-house staff left, and Washington, D.C. partly reversed its tip-credit phase-out in 2025 amid restaurant closures and service-fee backlash. Yet seven states have paid tipped workers the full minimum wage for decades with healthy restaurant industries, and EPI found D.C. full-service employment actually grew ~7.9% after Initiative 82. Are the failures fixable coordination problems — one restaurant can't unilaterally drop tips — or proof that U.S. workers and diners durably reject service-included pricing?",
    },
  ],
} satisfies Omit<Topic, "confidence_score"> & {
  confidence_score?: number;
};
