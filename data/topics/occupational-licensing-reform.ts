export const occupationalLicensingReformData = {
  id: "occupational-licensing-reform",
  title: "Occupational Licensing Reform",
  question: "Does occupational licensing do more economic harm than good?",
  meta_claim:
    "Occupational licensing does more economic harm than good and should be rolled back.",
  status: "contested" as const,
  category: "economics" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "More than one in four US workers now need a government license to do their job, roughly a five-fold rise since the 1950s. Workers in occupations with state-specific licensing exams move between states at a rate about 36% lower than other workers. Both sides accept these numbers. The fight is over which licenses buy enough quality to justify their price, and whether recognition laws or deeper rollback should ease the cost to mobile workers.",
    confidence: 86,
    source:
      "U.S. Treasury, CEA & Dept. of Labor, 'Occupational Licensing: A Framework for Policymakers' (2015); Johnson & Kleiner, American Economic Journal: Economic Policy (2020)",
    sourceUrl:
      "https://obamawhitehouse.archives.gov/sites/default/files/docs/licensing_report_final_nonembargo.pdf",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Both sides accept that occupational licensing raises prices and practitioners' wages; that its quality case is far weaker for cosmetic trades like barbers, manicurists and interior designers than for health-critical occupations; and that state-specific licenses hold back interstate moves by immigrants, military spouses and other mobile workers.",
    "They split over whether stricter licensing buys enough quality to justify its price, occupation by occupation; and over whether license-recognition and reciprocity laws capture most of the mobility gains, or only deeper rollback will.",
    "How much quality is worth the price is partly a value choice that border comparisons and outcome studies inform but cannot make.",
  ],
  last_updated: "2026-06-16",
  tags: ["labor", "regulation", "deregulation", "wages", "competition"],
  pillars: [
    {
      id: "costs-vs-benefits",
      title: "Costs vs. Benefits",
      short_summary:
        "Licensing reliably raises prices and practitioner wages, but the evidence that it raises service quality is thin — except in a few high-stakes health fields.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The 'no quality benefit' finding is real for low-stakes trades (barbers, interior designers, manicurists) but does not generalize to fields where mistakes kill people. The same welfare model that finds a 12% loss also finds consumers' higher willingness-to-pay offsets ~80% of the price increase — i.e., consumers are largely getting quality they value. And for health-critical occupations there is causal evidence of durable benefits: exposure to historical midwifery licensing laws is associated with a 2.5% reduction in cumulative adult mortality. 'Roll it back' is too blunt: the costs are concentrated in over-licensed cosmetic trades, not in medicine or skilled construction.",
      proponent_rebuttal:
        "Licensing functions largely as a cartel: it restricts entry, raises prices, and transfers surplus to incumbents without delivering the quality consumers are told they are paying for. A peer-reviewed welfare analysis estimates an average welfare loss of ~12% of occupational surplus, with workers bearing ~70% of the burden. When researchers compare consumer ratings across neighboring states with different licensing regimes, stricter licensing shows no quality advantage — and in some pairings the more lightly-licensed state scores higher. If the core justification (protecting consumers from low quality) doesn't hold up empirically, the regime is mostly a barrier to opportunity and should be rolled back.",
      crux: {
        id: "quality-causal-test",
        title: "Does Licensing Causally Raise Quality?",
        question:
          "Does stricter licensing raise service quality enough to justify higher prices, occupation by occupation?",
        description:
          "The load-bearing disagreement is whether licensing actually improves service quality/safety, or merely raises prices. If it raises quality enough to justify the price, rollback harms consumers; if not, the regime is mostly an entry barrier.",
        methodology:
          "Exploit natural experiments: (1) compare outcomes/ratings for the same occupation across state borders with sharply different requirements; (2) use difference-in-differences on staggered adoption or repeal of licensing laws, tracking quality, prices, and health outcomes. Separate low-stakes from high-stakes occupations.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Border comparisons of the same occupation across states with sharply different rules, and difference-in-differences on adoption or repeal, tracking quality, prices and health outcomes by occupation. How much quality is worth the price is a value choice.",
        },
        cost_to_verify: "$0 (analysis of existing border-discontinuity and DiD studies)",
        falsification: {
          supporter_flip:
            "If well-identified studies (border discontinuities, difference-in-differences on adoption/repeal) showed licensed occupations deliver measurably better quality and safety outcomes that justify the higher prices — even in low-stakes trades — the 'mostly a cartel' rollback case would collapse into 'consumers are paying for quality they get.'",
          skeptic_flip:
            "A skeptic who defends licensing on quality grounds should weigh that in 7 of 9 border comparisons of Yelp ratings for occupations such as barbers, manicurists and interior designers, stricter licensing showed no significant quality difference, and in the other 2 the less-licensed state scored higher; the same Kleiner-Soltas model puts the average welfare loss at ~12% of occupational surplus. If clean border-discontinuity or staggered-adoption studies found no quality or safety gain in health-critical occupations either, the case that 'roll it back' is too blunt would lose its footing.",
          common_ground:
            "Both sides agree licensing raises prices and practitioner wages, and that the quality justification is far weaker for cosmetic trades (barbers, interior designers, manicurists) than for health-critical occupations.",
          live_disagreement:
            "Whether stricter licensing causally raises service quality enough to justify its price, occupation by occupation — resolvable by clean border-discontinuity and staggered-adoption designs that separate low-stakes from high-stakes fields and measure outcomes, not just ratings.",
        },
      },
      evidence: [
        {
          id: "kleiner-soltas-welfare",
          title: "Welfare Loss of ~12% of Occupational Surplus",
          description:
            "A labor-market equilibrium model estimates licensing causes an average welfare loss of 12% of occupational surplus; workers and consumers bear 70% and 30% of the incidence respectively. Licensing raises wages and hours but reduces employment.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 9,
          },
          source:
            "Kleiner & Soltas, 'A Welfare Analysis of Occupational Licensing in U.S. States,' NBER Working Paper 26383 (2019); published in Review of Economic Studies (2023)",
          sourceUrl: "https://www.nber.org/papers/w26383",
          reasoning:
            "Structural welfare estimate from leading labor economists, directly on the harm question. Independence/replicability discounted: it is a model-based estimate sensitive to assumptions, and the same paper finds an 80% quality offset, so it is not unambiguously pro-rollback.",
        },
        {
          id: "ij-raising-barriers",
          title: "No Quality Benefit Across State Borders",
          description:
            "Comparing Yelp ratings for six occupations (e.g., barbers, manicurists, interior designers) across bordering states with different licensing burdens: in 7 of 9 comparisons there was no significant quality difference, and in the other 2 the less-licensed state scored higher.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 7,
            directness: 8,
          },
          source:
            "Sweetland & Carpenter, 'Raising Barriers, Not Quality,' Institute for Justice (2022)",
          sourceUrl:
            "https://search.issuelab.org/resource/raising-barriers-not-quality-occupational-licensing-fails-to-improve-services.html",
          reasoning:
            "Directly tests the quality justification with a transparent border-discontinuity design. Discounted for source independence (IJ is an advocacy litigation org with a pro-deregulation prior) and because Yelp ratings are a noisy quality proxy limited to low-stakes trades.",
        },
        {
          id: "midwifery-mortality",
          title: "Midwifery Licensing Cut Long-Run Mortality",
          description:
            "Using the universe of US death records (1979-2020) and a difference-in-differences design on staggered state adoption of midwifery licensing laws, exposure at birth is associated with a 2.5% reduction in cumulative mortality and ~0.6 months greater longevity, concentrated among Black populations and males.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Noghanibehambari & Fletcher, 'Long-Term Health Benefits of Occupational Licensing: Evidence from Midwifery Laws,' Journal of Health Economics (2023)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10841694/",
          reasoning:
            "Peer-reviewed causal evidence that licensing CAN deliver real health benefits, undercutting a blanket rollback. Directness discounted: it concerns a historical health occupation and may not generalize to today's broad licensing of low-risk trades.",
        },
        {
          id: "willingness-to-pay-offset",
          title: "Consumers Value 80% of the Price Increase",
          description:
            "The same welfare model finds higher consumer willingness-to-pay offsets ~80% of the higher prices licensing produces, implying consumers receive quality they value and the net consumer harm is far smaller than the gross price increase.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "Kleiner & Soltas, NBER Working Paper 26383 (2019); Review of Economic Studies (2023)",
          sourceUrl: "https://www.nber.org/papers/w26383",
          reasoning:
            "From the same rigorous model as the welfare-loss figure, this is the strongest quantitative case that licensing isn't pure deadweight loss. Discounted because it is a revealed-preference inference within a structural model, not a direct quality measurement.",
        },
      ],
    },
    {
      id: "labor-mobility-access",
      title: "Mobility & Access to Work",
      short_summary:
        "State-by-state licensing locks workers into states and shuts low-income and mobile workers out of jobs — but careful reform (reciprocity) can fix that without abolishing licensing.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Mobility frictions are a design flaw, not proof licensing should be abolished. The same research shows licensing explains only a small part of the overall decline in US labor mobility, and the fix is targeted: universal-recognition and reciprocity laws (now adopted by many states) let licensed workers carry credentials across state lines while keeping the consumer protections intact. Rolling back licensing wholesale to solve a portability problem throws away genuine safeguards in medicine, law, and skilled trades when narrower reforms achieve the mobility gains.",
      proponent_rebuttal:
        "Because licenses don't transfer across state lines, licensing measurably suppresses interstate migration: workers in state-specific licensed occupations are markedly less likely to move between states, trapping them away from better opportunities. It also imposes upfront fees and hundreds of hours of training that fall hardest on lower-income workers, immigrants, and military spouses (who move frequently). When boards dominated by incumbents wield this power, they sometimes use it to crush legitimate competitors outright. The mobility and access costs are real and avoidable — a strong reason to roll licensing back.",
      crux: {
        id: "reform-vs-rollback",
        title: "Reciprocity vs. Rollback",
        question:
          "Do license-recognition laws deliver most of the mobility gains, or is deeper rollback needed?",
        description:
          "The decisive question is whether the documented mobility and access harms require ABOLISHING licenses or merely making them PORTABLE. If portability/recognition reforms capture most of the mobility gain, the case for rollback weakens sharply.",
        methodology:
          "Difference-in-differences on states adopting universal-recognition / reciprocity laws: measure changes in inflow of licensed workers and employment, and compare against the mobility gains that full deregulation would predict. Hold quality/safety outcomes fixed.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Difference-in-differences on states that adopted universal-recognition or reciprocity laws, measuring inflows of licensed workers and employment against the gains full deregulation would predict, with quality outcomes held fixed.",
        },
        cost_to_verify: "$0 (policy-variation analysis of state recognition laws)",
        falsification: {
          supporter_flip:
            "A supporter of wholesale rollback should change course if difference-in-differences on universal-recognition / reciprocity laws showed those reforms recover most of the migration and employment gains that full deregulation would predict — because then the documented mobility harms argue for portability, not abolition.",
          skeptic_flip:
            "A skeptic who insists portability is enough should weigh evidence that recognition laws leave incumbent-controlled boards intact (the NC dental board used licensing to block competitors until the Supreme Court intervened) and that licensing explains only a small share of the overall mobility decline — so reciprocity may fix less of the problem than hoped.",
          common_ground:
            "Both sides agree that state-specific licenses suppress interstate migration and burden mobile workers (immigrants, military spouses, lower-income entrants), and that this friction is a genuine, fixable cost.",
          live_disagreement:
            "Whether reciprocity and universal-recognition laws capture most of the mobility and access gains while preserving consumer protections, or whether only deeper rollback delivers them — resolvable by tracking inflows of licensed workers and employment in states that adopted recognition laws against the full-deregulation counterfactual.",
        },
      },
      evidence: [
        {
          id: "johnson-kleiner-migration",
          title: "Licensing Suppresses Interstate Migration",
          description:
            "Workers in occupations with state-specific licensing exams have a between-state migration rate ~36% lower than other workers, and are ~7% less likely to move between states than workers in occupations with national licensing exams.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Johnson & Kleiner, 'Is Occupational Licensing a Barrier to Interstate Migration?,' American Economic Journal: Economic Policy (2020)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/pol.20170704",
          reasoning:
            "Top-tier peer-reviewed journal with a clean identification strategy (national vs. state exams). Directness slightly discounted because the authors note licensing explains only a small share of the overall mobility decline.",
        },
        {
          id: "nc-dental-ftc",
          title: "Boards Used Licensing to Block Competitors",
          description:
            "The North Carolina dental board, dominated by practicing dentists, sent cease-and-desist letters to non-dentist teeth-whitening providers. The Supreme Court (2015) held the board was not immune from antitrust law because it was controlled by active market participants without active state supervision.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 6,
          },
          source:
            "North Carolina State Board of Dental Examiners v. FTC, 574 U.S. 494 (2015); FTC statement (Feb. 2015)",
          sourceUrl:
            "https://www.ftc.gov/news-events/news/press-releases/2015/02/statement-ftc-chairwoman-edith-ramirez-us-supreme-court-ruling-regarding-north-carolina-dental-board",
          reasoning:
            "A Supreme Court finding documenting incumbent capture is unusually authoritative and independent. Directness discounted: it proves a specific abuse and a capture mechanism, not that licensing is net-negative economy-wide.",
        },
        {
          id: "cea-costs-summary",
          title: "White House: Licensing Raises Prices, Cuts Mobility",
          description:
            "A joint Treasury/CEA/Labor report found more than one-quarter of US workers now need a license (a five-fold State-level rise since the 1950s) and that requirements 'raise the price of goods and services, restrict employment opportunities, and make it more difficult for workers to take their skills across State lines.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source:
            "U.S. Dept. of the Treasury, Council of Economic Advisers & Dept. of Labor, 'Occupational Licensing: A Framework for Policymakers' (2015)",
          sourceUrl:
            "https://obamawhitehouse.archives.gov/sites/default/files/docs/licensing_report_final_nonembargo.pdf",
          reasoning:
            "Authoritative government synthesis of the literature on costs. Independence discounted because it is a policy document advocating reform; it explicitly notes licensing can also protect health and safety when well-designed, so it does not endorse blanket rollback.",
        },
        {
          id: "cea-safety-benefit",
          title: "Same Report: Licensing Can Protect Health & Safety",
          description:
            "The CEA report's executive summary states that 'when designed and implemented carefully, licensing can offer important health and safety protections to consumers, as well as benefits to workers,' and recommends better-targeted licensing rather than abolition.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "U.S. Dept. of the Treasury, Council of Economic Advisers & Dept. of Labor, 'Occupational Licensing: A Framework for Policymakers' (2015)",
          sourceUrl:
            "https://obamawhitehouse.archives.gov/sites/default/files/docs/licensing_report_final_nonembargo.pdf",
          reasoning:
            "The reform-minded government report itself declines to endorse rollback, framing the problem as poorly-targeted licensing. Directness discounted because it asserts benefits conditionally ('when designed carefully') rather than quantifying them.",
        },
      ],
    },
  ],
};
