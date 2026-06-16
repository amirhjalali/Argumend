import type { Topic } from "@/lib/schemas/topic";

export const sexWorkDecriminalizationData = {
  id: "sex-work-decriminalization",
  title: "Decriminalizing Sex Work",
  meta_claim:
    "Full decriminalization of sex work improves health and safety outcomes.",
  status: "contested" as const,
  category: "policy" as const,
  last_updated: "2026-06-16",
  tags: ["sex-work", "public-health", "criminal-justice", "hiv", "harm-reduction"],
  pillars: [
    {
      id: "violence-and-policing",
      title: "Violence & Reporting",
      short_summary:
        "Does removing criminal penalties let sex workers screen clients, report assaults to police, and lower their exposure to violence — or does it expand a market where exploitation and trafficking thrive?",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Decriminalization is not the same as a tidy harm-reduction program: it expands a market that traffickers exploit. The most-cited cross-national study (Cho, Dreher & Neumayer, World Development 2013) found that, on average, countries where prostitution is legal report larger human-trafficking inflows — the 'scale effect' of a bigger market dominating any 'substitution' away from coerced victims. Germany's 2002 liberalization is widely judged to have failed on its own terms: a recommended brothel-licensing regime was never implemented, police lost search powers, and German lawmakers from across the spectrum concluded the law did not curb exploitation. A safer experience for some independent workers can coexist with worse outcomes for the trafficked and coerced minority who are hardest to count.",
      proponent_rebuttal:
        "Criminalization is itself the dominant driver of violence: a PLOS Medicine systematic review (Platt et al. 2018, 40 quantitative + 94 qualitative studies) found repressive policing roughly tripled the odds of sexual or physical violence (OR 2.99). New Zealand's official Prostitution Law Review Committee — a government body — found the 2003 reform safeguarded sex workers' rights without increasing their number, and the underlying Christchurch School of Medicine survey of 772 workers found over 90% felt the Act gave them legal, health and safety rights and 57% said police attitudes improved. The Cho/Dreher finding concerns regulated *legalization* under poor data (the UNODC itself warns its trafficking counts are not victim counts) — not the full-decriminalization model, and a bigger *recorded* market can partly reflect activity moving out of the shadows.",
      crux: {
        id: "decrim-vs-legalization-effect",
        title: "Decriminalization vs. Legalization, and the Counterfactual",
        description:
          "The load-bearing disagreement: does 'full decriminalization' (NZ model — no criminal penalties, labor-law coverage) produce different safety outcomes than 'legalization' (Germany/Netherlands — licensed, regulated)? And when violence or trafficking changes, is it caused by the legal regime or by confounders (reporting rates, migration, enforcement priorities)?",
        methodology:
          "Compare natural experiments that isolate the law change: Rhode Island's 2003-2009 accidental decriminalization of indoor sex work (synthetic-control / difference-in-differences on reported rape and STI rates); New Zealand pre/post 2003 cohort surveys; and cross-national panels that separate decriminalization from licensed legalization while modeling reporting bias and migration. Triangulate self-reported violence, police-reported crime, and health-clinic data so a change in *reporting* is not mistaken for a change in *incidence*.",
        verification_status: "verified" as const,
        cost_to_verify: "$300K (multi-jurisdiction econometric + cohort analysis)",
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
            "Peer-reviewed meta-analysis pooling many studies — high reliability and independence. Directness is moderate (7) because it measures the harm of *criminalized* policing rather than directly testing a fully decriminalized regime; the inference to decrim is by reversal, and the observational designs leave residual confounding.",
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
            "The Christchurch School of Medicine survey of 772 sex workers (the primary data behind the NZ review) found over 90% believed the Act gave them employment, legal, and health-and-safety rights; 64% felt more able to refuse a client; and 57% said police attitudes improved.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source:
            "Abel G, Fitzgerald L, Brunton C. 'The Impact of the Prostitution Reform Act on the Health and Safety Practices of Sex Workers' (Christchurch School of Medicine, Univ. of Otago, 2007), survey of 772 workers",
          sourceUrl:
            "https://www.otago.ac.nz/__data/assets/pdf_file/0027/248760/pdf-811-kb-018607.pdf",
          reasoning:
            "Large primary survey conducted by academic researchers (reliability 8), directly measuring perceived safety/rights under decriminalization (directness 8). Self-reported perceptions and a single-jurisdiction design without a clean control group cap independence and replicability.",
        },
        {
          id: "cho-dreher-trafficking",
          title: "Cross-National Study: Legal Prostitution Linked to More Trafficking Inflows",
          description:
            "Using UNODC data across roughly 150 countries, Cho, Dreher & Neumayer found that, on average, countries where prostitution is legal report larger human-trafficking inflows — the market-expansion ('scale') effect outweighing any substitution away from coerced workers.",
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
            "Peer-reviewed, independent, replication data public (reliability/independence high). But directness is low (5): it studies *legalization*, not full decriminalization, and the meta-claim is about health/safety, not trafficking volume. The UNODC itself warns its figures are reported cases, not victim counts, so cross-country measurement error is severe — the authors themselves hedge causal interpretation.",
        },
        {
          id: "germany-legalization-critique",
          title: "Germany's 2002 Legalization Widely Judged a Policy Failure",
          description:
            "Germany's 2002 law aimed to improve conditions and curb exploitation; a planned brothel-licensing regime was never implemented and many states revoked warrantless police search powers. German lawmakers across parties later concluded the law did not achieve its protective goals, prompting the 2017 Prostitute Protection Act.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 4,
            directness: 5,
          },
          source:
            "Germany Prostitution Act 2002 — overview and criticism (Wikipedia, with cited German government and CDU statements); contemporaneous reporting (France 24, 2024)",
          sourceUrl: "https://en.wikipedia.org/wiki/Prostitution_Act",
          reasoning:
            "Illustrates that liberalizing the law alone does not guarantee better outcomes. Weights are low: this is a regulated *legalization* regime (not full decriminalization), the strongest claims (e.g. trafficking magnitudes) rest on contested advocacy estimates, and the source is a secondary encyclopedia summary rather than a primary evaluation — so directness and replicability are weak.",
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
        "The headline 'could avert 33-46% of HIV infections' figure is a *model projection*, not a measured outcome — sensitive to its assumptions about how much violence and policing fall after a law change. The cleanest natural experiment (Rhode Island) captured only off-street, indoor sex work over a few years and cannot speak to street-based workers, the most marginalized group. Cross-country health comparisons are confounded by baseline epidemic stage, condom-promotion programs, and migration, so attributing STI declines to the legal regime alone risks overstating what the law itself does.",
      proponent_rebuttal:
        "The causal evidence points the same direction as the models. Rhode Island's accidental 2003-2009 decriminalization of indoor sex work produced a roughly 40% drop in female gonorrhea incidence (and ~30% fewer reported rapes) in a peer-reviewed Review of Economic Studies natural experiment. The mechanism is well-documented: when condoms can't be used as evidence of a crime and clinics aren't a path to arrest, workers test more and use protection more. The Lancet's 33-46% HIV-aversion estimate is a conservative consensus across three very different settings (Canada, India, Kenya) and converges with the empirical STI findings rather than standing alone.",
      crux: {
        id: "causal-vs-modeled-health",
        title: "Measured STI Declines vs. Modeled HIV Projections",
        description:
          "Health advocates lean on a Lancet *model* (33-46% HIV averted) and a Rhode Island *natural experiment* (~40% gonorrhea drop). The crux: do the measured, causal STI declines generalize beyond indoor/off-street markets and short windows — and do the modeled HIV gains hold once you stress-test the assumption that violence and policing actually fall under decriminalization?",
        methodology:
          "Replicate the Rhode Island synthetic-control design in other jurisdictions that change the law; pair it with prospective cohorts tracking condom use, HIV/STI testing uptake, and clinic attendance before vs. after decriminalization; and re-run the Lancet transmission model under pessimistic assumptions about behavioral change to bound the HIV estimate.",
        verification_status: "verified" as const,
        cost_to_verify: "$0-150K (re-analysis of existing surveillance + cohort data)",
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
            "Peer-reviewed and influential, spanning three diverse settings (reliability/independence 8). But it is a *projection*, not a measured outcome: replicability is low (5) because the result depends on modeled assumptions about how far violence and policing fall — so it is corroborative rather than dispositive.",
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
            "Scope/external-validity limitation noted within Cunningham & Shah (Review of Economic Studies, 2018) and subsequent commentary on indoor-only coverage",
          sourceUrl:
            "https://www.nber.org/papers/w20281",
          reasoning:
            "A genuine, honestly-stated limitation rather than a counter-finding — it bounds rather than reverses the 'for' evidence. Weights are deliberately modest: it is an interpretive caveat about generalizability, so directness and replicability as a free-standing piece of evidence are low.",
        },
      ],
    },
  ],
};
