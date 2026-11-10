export const sexWorkDecriminalizationData = {
  id: "sex-work-decriminalization",
  title: "Decriminalizing Sex Work",
  question:
    "Does fully decriminalizing sex work make sex workers safer and healthier?",
  meta_claim:
    "Full decriminalization of sex work improves health and safety outcomes.",
  status: "contested" as const,
  category: "policy" as const,
  last_updated: "2026-06-16",
  tags: ["sex-work", "public-health", "criminal-justice", "hiv", "harm-reduction"],
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "New Zealand decriminalized sex work in 2003, and a government review in 2008 found the reform had safeguarded sex workers' rights without a rise in their numbers. A 2013 study of up to 150 countries linked legal prostitution to larger reported trafficking inflows, though its authors caution that the UN index they use tracks reports, not actual flows. The fight is over what full decriminalization does to safety and health, and whether its gains reach the coerced.",
    confidence: 82,
    source:
      "Report of the Prostitution Law Review Committee (NZ Government, 2008); Cho, Dreher & Neumayer, World Development (2013)",
    sourceUrl:
      "https://www.beehive.govt.nz/release/act-helps-health-and-safety-sex-workers-report-says",
  },
  simple_case: [
    "The answer bears on which model lawmakers choose, full decriminalization as in New Zealand or a licensed legal sector as in Germany, and on whether sex workers can report violence to police without risking arrest.",
  ],
  pillars: [
    {
      id: "violence-and-policing",
      title: "Violence & Reporting",
      short_summary:
        "Does removing criminal penalties let sex workers screen clients, report assaults to police, and lower their exposure to violence — or does it expand a market where exploitation and trafficking thrive?",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Decriminalization is not the same as a tidy harm-reduction program: it expands a market that traffickers exploit. The most-cited cross-national study (Cho, Dreher & Neumayer, World Development 2013) found that, on average, countries where prostitution is legal report larger human-trafficking inflows — the 'scale effect' of a bigger market dominating any 'substitution' away from coerced victims. Germany's 2002 liberalization fell short on its own terms: the Federal Government's 2007 evaluation found the law had achieved its goals only to a limited degree, with hardly any measurable improvement in working conditions and no viable indication that it had reduced crime. A safer experience for some independent workers can coexist with worse outcomes for the trafficked and coerced minority who are hardest to count.",
      proponent_rebuttal:
        "Criminalization is itself the dominant driver of violence: a PLOS Medicine systematic review (Platt et al. 2018, 40 quantitative + 94 qualitative studies) found repressive policing roughly tripled the odds of sexual or physical violence (OR 2.99). New Zealand's official Prostitution Law Review Committee — a government body — found the 2003 reform safeguarded sex workers' rights without increasing their number, and the underlying Christchurch School of Medicine survey of 772 workers found over 90% felt the Act gave them legal, health and safety rights and 57% said police attitudes improved. The Cho/Dreher finding concerns legal prostitution in general under poor data (the authors themselves caution that the UN index they use tracks reported cases, not actual trafficking flows) — not the full-decriminalization model, and a bigger recorded market can partly reflect activity moving out of the shadows.",
      crux: {
        id: "decrim-vs-legalization-effect",
        title: "Decriminalization vs. Legalization, and the Counterfactual",
        question:
          "Do decriminalization and legalization differ on safety, and are changes due to the law or other factors?",
        description:
          "The load-bearing disagreement: does 'full decriminalization' (NZ model — no criminal penalties, labor-law coverage) produce different safety outcomes than 'legalization' (Germany/Netherlands — licensed, regulated)? And when violence or trafficking changes, is it caused by the legal regime or by confounders (reporting rates, migration, enforcement priorities)?",
        methodology:
          "Compare natural experiments that isolate the law change: Rhode Island's 2003-2009 accidental decriminalization of indoor sex work (synthetic-control / difference-in-differences on reported rape and STI rates); New Zealand pre/post 2003 cohort surveys; and cross-national panels that separate decriminalization from licensed legalization while modeling reporting bias and migration. Triangulate self-reported violence, police-reported crime, and health-clinic data so a change in reporting is not mistaken for a change in incidence.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Natural experiments that isolate the law change, such as Rhode Island's 2003-2009 indoor decriminalization and New Zealand's 2003 reform, plus cross-national panels separating decriminalization from licensed legalization while modeling reporting bias and migration.",
        },
        cost_to_verify: "$300K (multi-jurisdiction econometric + cohort analysis)",
        falsification: {
          supporter_flip:
            "If cross-national panels that separate full decriminalization from licensed legalization, while modeling reporting bias and migration, found decriminalized markets also drawing larger trafficking inflows, the safety case would weaken: a safer experience for some independent workers would come at the cost of the coerced.",
          skeptic_flip:
            "If more reviews matched the PLOS Medicine finding that repressive policing roughly triples the odds of violence (OR 2.99), and reforms like New Zealand's in 2003 kept protecting rights without growing the number of sex workers, the market-expansion fear would weaken.",
          common_ground:
            "Both sides agree the trafficked and coerced are the hardest group to count, so recorded trafficking figures are an imperfect guide — the leading cross-national study itself cautions that the UN index it uses tracks reports, not actual trafficking flows.",
          live_disagreement:
            "Whether full decriminalization, unlike licensed legalization, makes sex workers safer without expanding a market traffickers exploit — and whether changes after a law passes reflect the law or shifts in reporting, migration and enforcement.",
        },
      },
      evidence: [
        {
          id: "platt-policing-violence",
          title: "Repressive Policing ~Tripled Odds of Violence",
          description:
            "A PLOS Medicine systematic review and meta-analysis found that exposure to repressive policing of sex workers was associated with roughly triple the odds of sexual or physical violence (OR 2.99, 95% CI 1.96-4.57) and nearly double the odds of HIV/STI infection (OR 1.87, 95% CI 1.60-2.19).",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Platt L, Grenfell P, Meiksin R, et al. 'Associations between sex work laws and sex workers' health: A systematic review and meta-analysis.' PLOS Medicine, Dec 2018 (40 quantitative + 94 qualitative studies)",
          sourceUrl:
            "https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1002680",
          reasoning:
            "Peer-reviewed meta-analysis pooling many studies — high reliability and independence. Directness is moderate (7) because it measures the harm of criminalized policing rather than directly testing a fully decriminalized regime; the inference to decrim is by reversal, and the observational designs leave residual confounding.",
        },
        {
          id: "nz-official-review",
          title: "NZ Government Review: Reform Safeguarded Rights, No Population Surge",
          description:
            "New Zealand's statutory Prostitution Law Review Committee reported in 2008 that the 2003 decriminalization had a marked effect in safeguarding sex workers' rights and did not increase the number of sex workers, with coercion 'not widespread' and no evidence of rising underage involvement.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 9,
          },
          source:
            "Report of the Prostitution Law Review Committee on the Operation of the Prostitution Reform Act 2003 (NZ Govt, 2008); summarized in NZ Govt press release (Beehive.govt.nz)",
          sourceUrl:
            "https://www.beehive.govt.nz/release/act-helps-health-and-safety-sex-workers-report-says",
          reasoning:
            "Official government evaluation directly assessing the exact policy in the meta-claim (directness 9). Independence is moderate (7): a national review of a domestic law is somewhat self-evaluating, and much of the safety data is self-reported, limiting replicability.",
        },
        {
          id: "nz-worker-survey-rights",
          title: "90%+ of NZ Sex Workers Said Reform Gave Them Rights",
          description:
            "The Christchurch School of Medicine survey of 772 sex workers (the primary data behind the NZ review) found over 90% were aware the Act gave them increased employment, legal, and health-and-safety rights. Among those who had worked before the law change, 64.8% felt more able to refuse a client and 57.3% said police attitudes had changed for the better.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source:
            "Abel G, Fitzgerald L, Brunton C. 'The Impact of the Prostitution Reform Act on the Health and Safety Practices of Sex Workers', report to the Prostitution Law Review Committee (Univ. of Otago, Christchurch, Nov 2007), survey of 772 workers",
          sourceUrl:
            "https://www.otago.ac.nz/__data/assets/pdf_file/0027/248760/pdf-811-kb-018607.pdf",
          reasoning:
            "Large primary survey conducted by academic researchers (reliability 8), directly measuring perceived safety/rights under decriminalization (directness 8). Self-reported perceptions and a single-jurisdiction design without a clean control group cap independence and replicability.",
        },
        {
          id: "cho-dreher-trafficking",
          title: "Cross-National Study: Legal Prostitution Linked to More Trafficking Inflows",
          description:
            "Using a UNODC index of reported trafficking inflows (collected 1996-2003, scored 0 to 5) for a cross-section of up to 150 countries, Cho, Dreher & Neumayer found that, 'On average, countries where prostitution is legal experience larger reported human trafficking inflows' — the market-expansion ('scale') effect outweighing any substitution away from coerced workers.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source:
            "Cho S-Y, Dreher A, Neumayer E. 'Does Legalized Prostitution Increase Human Trafficking?' World Development 41(1), 2013, pp. 67-82",
          sourceUrl:
            "https://www.sciencedirect.com/science/article/abs/pii/S0305750X12001453",
          reasoning:
            "Peer-reviewed, independent, replication data public (reliability/independence high). But directness is low (5): it studies legalization, not full decriminalization, and the meta-claim is about health/safety, not trafficking volume. The index measures how often trafficking into a country was reported, not how many victims there were: the authors write that their dependent variable 'does not reflect actual trafficking flows, and needs to be interpreted cautiously', and that a cross-section cannot show whether legalizing would raise trafficking afterward. The data stop in 2003, the year New Zealand decriminalized.",
        },
        {
          id: "germany-legalization-critique",
          title: "German Government's Own 2007 Evaluation: the 2002 Prostitution Act Met Its Goals 'Only to a Limited Degree'",
          description:
            "Germany's 2002 Prostitution Act aimed to let prostitutes enforce their pay, give them access to social insurance, improve working conditions, ease leaving prostitution and curb related crime. The Federal Government's 2007 evaluation concluded that the Act 'has only to a limited degree achieved the goals intended by the legislator': few employment contracts had been signed, 'hardly any measurable, positive impact has been observed in practice' on working conditions, and there were 'no viable indications that the Prostitution Act has reduced crime.' The same report found the Act 'has not made it more difficult to prosecute trafficking in human beings', and called for a broader approach using licensing, trade and police law.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 4,
            directness: 5,
          },
          source:
            "German Federal Ministry for Family Affairs, Senior Citizens, Women and Youth, 'Report by the Federal Government on the Impact of the Act Regulating the Legal Situation of Prostitutes (Prostitution Act)' (July 2007), section C, Conclusions",
          sourceUrl:
            "https://www.bmbfsfj.bund.de/bmbfsfj/meta/en/publications-en/report-by-the-federal-government-on-the-impact-of-the-act-regulating-the-legal-situation-of-prostitutes--95692",
          reasoning:
            "Illustrates, on the government's own evidence, that liberalizing the law alone does not guarantee better outcomes. Directness and replicability are low: this is a regulated legalization regime (not full decriminalization), the evaluation came only five years after the law, and it also found that the harms critics feared for crime-fighting had not appeared.",
        },
      ],
    },
    {
      id: "health-and-hiv",
      title: "Health & HIV/STIs",
      short_summary:
        "Does decriminalization raise condom use, HIV/STI testing, and clinic access by removing fear of arrest — and is the strongest health evidence causal or modeled?",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "The headline 'could avert 33-46% of HIV infections' figure is a model projection, not a measured outcome — sensitive to its assumptions about how much violence and policing fall after a law change. The cleanest natural experiment (Rhode Island) captured only off-street, indoor sex work over a few years and cannot speak to street-based workers, the most marginalized group. Cross-country health comparisons are confounded by baseline epidemic stage, condom-promotion programs, and migration, so attributing STI declines to the legal regime alone risks overstating what the law itself does.",
      proponent_rebuttal:
        "The causal evidence points the same direction as the models. Rhode Island's accidental 2003-2009 decriminalization of indoor sex work produced a roughly 40% drop in female gonorrhea incidence (and ~30% fewer reported rapes) in a peer-reviewed Review of Economic Studies natural experiment. The mechanism is well-documented: when condoms can't be used as evidence of a crime and clinics aren't a path to arrest, workers test more and use protection more. The Lancet's 33-46% HIV-aversion estimate is a conservative consensus across three very different settings (Canada, India, Kenya) and converges with the empirical STI findings rather than standing alone.",
      crux: {
        id: "causal-vs-modeled-health",
        title: "Measured STI Declines vs. Modeled HIV Projections",
        question:
          "Do measured STI declines under decriminalization generalize, and do modeled HIV gains hold up?",
        description:
          "Health advocates lean on a Lancet model (33-46% HIV averted) and a Rhode Island natural experiment (~40% gonorrhea drop). The crux: do the measured, causal STI declines generalize beyond indoor/off-street markets and short windows — and do the modeled HIV gains hold once you stress-test the assumption that violence and policing actually fall under decriminalization?",
        methodology:
          "Replicate the Rhode Island synthetic-control design in other jurisdictions that change the law; pair it with prospective cohorts tracking condom use, HIV/STI testing uptake, and clinic attendance before vs. after decriminalization; and re-run the Lancet transmission model under pessimistic assumptions about behavioral change to bound the HIV estimate.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Replications of the Rhode Island synthetic-control design wherever the law changes, covering street markets and longer windows, and a rerun of the Lancet HIV model under pessimistic assumptions about behavior.",
        },
        cost_to_verify: "$0-150K (re-analysis of existing surveillance + cohort data)",
        falsification: {
          supporter_flip:
            "If replications of the Rhode Island design elsewhere, covering street-based markets and longer windows, found no drop in STI incidence, and the Lancet model's HIV gains largely vanished under pessimistic assumptions about violence and policing, the health case would shrink to a projection.",
          skeptic_flip:
            "If studies elsewhere repeated Rhode Island's 2003-2009 natural experiment, with gonorrhea incidence down over 40% and reported rapes down about 30%, and the Lancet model held across settings like Canada, India and Kenya, the health case would rest on measurement, not models alone.",
          common_ground:
            "Both sides agree the 33-46% HIV figure is a model projection, and that the cleanest measured evidence, Rhode Island's roughly 40% gonorrhea drop, covers only indoor sex work over a few years.",
          live_disagreement:
            "Whether measured STI declines from indoor, short-window markets carry over to street-based workers and longer periods, and whether modeled HIV gains survive once the assumption that violence and policing fall is stress-tested.",
        },
      },
      evidence: [
        {
          id: "rhode-island-gonorrhea",
          title: "Rhode Island Decriminalization: ~40% Drop in Female Gonorrhea",
          description:
            "A natural experiment exploiting Rhode Island's unintended 2003-2009 decriminalization of indoor sex work found female gonorrhea incidence fell by over 40% and reported rape offenses fell by about 30%, while the indoor market grew.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source:
            "Cunningham S, Shah M. 'Decriminalizing Indoor Prostitution: Implications for Sexual Violence and Public Health.' The Review of Economic Studies 85(3), July 2018, pp. 1683-1715",
          sourceUrl:
            "https://academic.oup.com/restud/article-abstract/85/3/1683/4756165",
          reasoning:
            "A causal natural experiment in a top economics journal (reliability/independence 9) — the strongest single design here. Directness is high (8) but capped because it covers only indoor/off-street work in one US state over a few years; external validity to street-based workers and other settings is uncertain.",
        },
        {
          id: "shannon-hiv-model",
          title: "Lancet Modeling: Decriminalization Could Avert 33-46% of HIV Infections",
          description:
            "A Lancet modeling study estimated that decriminalization of sex work could avert 33-46% of new HIV infections among female sex workers and clients over a decade across Canada, India, and Kenya, largely by reducing violence and police harassment.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 7,
          },
          source:
            "Shannon K, Strathdee SA, Goldenberg SM, et al. 'Global epidemiology of HIV among female sex workers: influence of structural determinants.' The Lancet 385(9962), 2015, pp. 55-71",
          sourceUrl:
            "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(14)60931-4/abstract",
          reasoning:
            "Peer-reviewed and influential, spanning three diverse settings (reliability/independence 8). But it is a projection, not a measured outcome: replicability is low (5) because the result depends on modeled assumptions about how far violence and policing fall — so it is corroborative rather than dispositive.",
        },
        {
          id: "rhode-island-scope-limit",
          title: "Natural-Experiment Evidence Covers Only Indoor, Short-Window Markets",
          description:
            "The cleanest causal study (Rhode Island) applies only to indoor/off-street sex work over 2003-2009 and cannot speak to street-based workers — the most marginalized group — or to long-run effects, limiting how far its health and safety gains can be generalized to 'full decriminalization' everywhere.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 5,
          },
          source:
            "Scope limit of Cunningham & Shah's design: the 2003 ruling decriminalized indoor prostitution only, and outcomes are measured for 2004-2009 (NBER Working Paper 20281, July 2014; published in Review of Economic Studies, 2018)",
          sourceUrl:
            "https://www.nber.org/papers/w20281",
          reasoning:
            "A genuine, honestly-stated limitation rather than a counter-finding — it bounds rather than reverses the 'for' evidence. Weights are deliberately modest: it is an interpretive caveat about generalizability, so directness and replicability as a free-standing piece of evidence are low.",
        },
      ],
    },
  ],
};
