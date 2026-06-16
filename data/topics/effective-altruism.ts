import type { Topic } from "@/lib/schemas/topic";

export const effectiveAltruismData = {
  id: "effective-altruism",
  title: "Effective Altruism",
  meta_claim: "Effective altruism is a sound framework for doing good.",
  status: "contested" as const,
  category: "philosophy" as const,
  last_updated: "2026-06-16",
  tags: ["philosophy", "ethics", "philanthropy", "global-health", "longtermism"],
  pillars: [
    {
      id: "evidence-and-impact",
      title: "Evidence and Impact",
      short_summary:
        "EA channels money to interventions with strong randomized-trial evidence — bednets, cash transfers, deworming — claiming far more good per dollar than typical giving.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Even the flagship 'evidence-based' charities rest on contested science. The most rigorous Cochrane systematic review of mass deworming — one of EA's earliest 'best buys' — found that treating all children in endemic areas has little or no effect on average weight, haemoglobin, cognition, school attendance, or survival. RCT evidence is also narrow: it measures what is cheap and quick to quantify, and may not generalize across contexts, time, or scale. A framework that ranks 'good' by measurable effect size systematically under-weights interventions whose benefits are real but hard to randomize.",
      proponent_rebuttal:
        "The core empirical claims are about as robust as social science gets. The 2018 Cochrane review of insecticide-treated nets rates the evidence 'high certainty': nets cut all-cause child mortality ~17% and save ~5.6 lives per 1,000 children protected per year. Large unconditional cash-transfer RCTs (Haushofer & Shapiro 2016) show lasting consumption and asset gains with minimal negative spillovers. And the deworming dispute was partly a statistical-power artifact: a 2024 PNAS meta-analysis (Croke, Kremer, Miguel et al.) re-pooling the trials found significant nutritional gains, several times more cost-effective per dollar than school feeding. EA's whole method is to update charity recommendations as this evidence moves.",
      crux: {
        id: "rct-generalizability",
        title: "Do the RCT Estimates Hold at Scale?",
        description:
          "EA's claim of doing exceptional good per dollar depends on whether effect sizes measured in randomized trials persist when an intervention is scaled to millions and run for years — and whether the things easiest to measure are actually the highest-impact things to fund.",
        methodology:
          "Compare RCT effect estimates against (1) large-N replications and multi-site trials, (2) general-equilibrium / at-scale studies that capture spillovers and market effects, and (3) long-run follow-ups. Track whether updated meta-analyses converge or diverge from original headline figures.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (analysis of published trials and meta-analyses)",
      },
      evidence: [
        {
          id: "cochrane-bednets",
          title: "Bednets Cut Child Mortality ~17% (High Certainty)",
          description:
            "The Cochrane systematic review of insecticide-treated nets (Pryce et al. 2018) finds nets reduce all-cause child mortality by 17% vs. no nets (rate ratio 0.83) and save ~5.6 lives per 1,000 children protected per year, rated 'high certainty' evidence. Bednets are a top EA-recommended intervention (Against Malaria Foundation).",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source:
            "Pryce, Richardson & Lengeler, 'Insecticide-treated nets for preventing malaria,' Cochrane Database of Systematic Reviews, 2018 (CD000363.pub3)",
          sourceUrl:
            "https://www.cochrane.org/CD000363/INFECTN_insecticide-treated-nets-preventing-malaria",
          reasoning:
            "Gold-standard independent systematic review with an explicit 'high certainty' GRADE rating across multiple trials. Directly supports the claim that EA's flagship intervention does substantial measurable good per dollar; slightly less than maximal directness because cost-effectiveness also depends on delivery cost and resistance.",
        },
        {
          id: "cash-transfers",
          title: "Cash Transfers Produce Lasting Gains (RCT)",
          description:
            "A randomized controlled trial of GiveDirectly's unconditional cash transfers in Kenya (Haushofer & Shapiro, QJE 2016) found large, persistent increases in consumption, assets, and psychological well-being; follow-up work found cross-village price/spillover effects to be small. Cash transfers are an EA-recommended, easily auditable benchmark intervention.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Haushofer & Shapiro, 'The Short-Term Impact of Unconditional Cash Transfers to the Poor: Experimental Evidence from Kenya,' Quarterly Journal of Economics, 2016",
          sourceUrl:
            "https://haushofer.ne.su.se/publications/Haushofer_Shapiro_UCT_QJE_2016.pdf",
          reasoning:
            "Peer-reviewed RCT in a top economics journal with pre-registration and randomization. Supports the framework's core empirical bet; directness is moderate because cash transfers are a comparison benchmark rather than EA's single top-rated charity.",
        },
        {
          id: "deworming-cochrane",
          title: "Cochrane: Mass Deworming Shows Little/No Effect",
          description:
            "The Cochrane review of deworming (Taylor-Robinson et al., updated 2019) concludes that treating ALL children in endemic areas — the mass-treatment model EA promoted — probably has little or no effect on average weight, haemoglobin, cognition, school attendance, or survival. This undercut one of EA's earliest, most-publicized 'best buys.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source:
            "Taylor-Robinson et al., 'Deworming drugs for soil-transmitted intestinal worms in children,' Cochrane Database of Systematic Reviews (2015; updated 2019)",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/26202783/",
          reasoning:
            "Independent, high-rigor systematic review directly contradicting an EA flagship recommendation, showing the framework can over-promote interventions on contested evidence. Replicability marked lower because the deworming debate hinges on disputed meta-analytic choices (see the 2024 PNAS re-analysis), not a settled null.",
        },
        {
          id: "deworming-pnas-reanalysis",
          title: "2024 Re-Analysis: Deworming Gains Re-Emerge",
          description:
            "A 2024 PNAS meta-analysis (Croke, Hamory, Hsu, Kremer, Maertens, Miguel, Więcek) re-pooling deworming trials found that in high-prevalence settings mass deworming yields statistically significant nutritional gains (e.g., +0.15 kg weight), estimated several times more cost-effective per dollar than school feeding, arguing prior Cochrane reviews were underpowered. This is recent and contested, not a closed question.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source:
            "Croke, Hamory, Hsu, Kremer, Maertens, Miguel & Więcek, 'Meta-analysis and public policy: Reconciling the evidence on deworming,' PNAS, 2024",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11194496/",
          reasoning:
            "Peer-reviewed re-analysis showing EA's claims update toward the evidence. Independence is lowered because several authors (Kremer, Miguel) are the original deworming researchers with a stake in the result; the methodological dispute with Cochrane remains live.",
        },
      ],
    },
    {
      id: "the-framework-itself",
      title: "The Framework Itself",
      short_summary:
        "Beyond any single charity, is EA's underlying method — maximize measurable, impartial good per dollar — a sound guide, or does it distort priorities and enable harm?",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The framework has structural failure modes. By prizing impartial, quantified impact-maximization, it biases toward what is measurable and may neglect institutional and political reform that treats the root causes of poverty — Daron Acemoglu argues EA-style giving can crowd out the systemic change and even the civic engagement that actually drives development. The same maximizing logic underwrote 'earning to give,' which EA leaders applied to Sam Bankman-Fried: he was convicted in 2023 and sentenced to 25 years for orchestrating a fraud that cost FTX customers ~$8 billion, after EA leaders reportedly ignored early warnings. A sound framework should not so readily rationalize ends-justify-means behavior or measurement tunnel vision.",
      proponent_rebuttal:
        "These are critiques of bad execution, not of the core principle that we should use evidence and reason to help others as much as possible. The institutional critique, examined carefully (Berkey, Utilitas 2018), is not actually inconsistent with EA: if systemic reform does the most good, the framework says fund it — it's an empirical question, and EA does fund policy and advocacy. The FTX fraud was a catastrophic governance and character failure that EA leaders publicly condemned; fraud is not entailed by 'do the most good,' and movements are not refuted by their worst members. The framework's self-correcting, evidence-updating character is precisely what surfaced and repudiated those errors.",
      crux: {
        id: "method-vs-execution",
        title: "Are the Failures the Method or the Execution?",
        description:
          "The load-bearing disagreement: do EA's harms (measurement bias, neglect of systemic change, the SBF debacle) flow necessarily from its maximizing, impartial-good principle — or are they contingent execution failures the principle itself can diagnose and correct?",
        methodology:
          "Trace each documented harm to a premise: does it follow deductively from 'use evidence/reason to maximize impartial good,' or only from contingent choices (which metrics, which people, which time horizon)? Test whether competing do-gooding frameworks avoid the same failure mode in practice.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (philosophical and case analysis)",
      },
      evidence: [
        {
          id: "sbf-conviction",
          title: "SBF Convicted: 'Earning to Give' Enabled $8B Fraud",
          description:
            "Sam Bankman-Fried, a prominent EA-aligned donor who practiced 'earning to give' and co-funded the FTX Future Fund, was convicted on seven fraud and conspiracy counts and sentenced in March 2024 to 25 years; the court found FTX customers lost ~$8 billion. EA leaders had reportedly been warned about him years earlier.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 6,
            directness: 6,
          },
          source:
            "U.S. Department of Justice, 'Samuel Bankman-Fried Sentenced to 25 Years for His Orchestration of Multiple Fraudulent Schemes,' press release, March 28, 2024",
          sourceUrl:
            "https://www.justice.gov/archives/opa/pr/samuel-bankman-fried-sentenced-25-years-his-orchestration-multiple-fraudulent-schemes",
          reasoning:
            "A court-verified fact about EA's most prominent funder, showing the framework's maximizing logic ('earning to give') can be invoked to rationalize catastrophic harm. Directness is moderate: the conviction proves the harm but not that EA's principle entails fraud — that inference is the contested crux.",
        },
        {
          id: "institutional-critique",
          title: "Acemoglu: EA Neglects Systemic Change",
          description:
            "In the Boston Review 'Logic of Effective Altruism' forum, economist Daron Acemoglu argues that EA's quantified, charity-focused giving tends to neglect the large-scale political and economic reform that treats the root causes of poverty, and may even erode the civic engagement and state-building that drive long-run development.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 4,
            directness: 6,
          },
          source:
            "Daron Acemoglu, 'Response to Effective Altruism,' in Peter Singer (ed.), The Logic of Effective Altruism forum, Boston Review, 2015",
          sourceUrl:
            "https://www.bostonreview.net/forum/peter-singer-logic-effective-altruism/",
          reasoning:
            "Argument from a leading development economist identifying a structural bias in the framework. Lower replicability/source-reliability because it is a reasoned essay (not an empirical finding) and is directly rebutted by Berkey (2018), making it a genuine open dispute rather than settled fact.",
        },
        {
          id: "berkey-institutional-rebuttal",
          title: "Institutional Critique Doesn't Refute the Principle",
          description:
            "Brian Berkey ('The Institutional Critique of Effective Altruism,' Utilitas 2018) argues the systemic-change objection fails as a critique of EA's core: EA's commitment is to do the most good by evidence and reason, which already accommodates funding institutional reform when that does the most good. The disagreement is empirical (what works), not a contradiction in the framework.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 4,
            directness: 6,
          },
          source:
            "Brian Berkey, 'The Institutional Critique of Effective Altruism,' Utilitas, vol. 30, no. 2, 2018",
          sourceUrl:
            "https://www.cambridge.org/core/journals/utilitas/article/abs/institutional-critique-of-effective-altruism/91A0449E2F030BAE417A09E52599E605",
          reasoning:
            "Peer-reviewed philosophy paper directly defending the soundness of the framework against its main structural objection. Replicability is inherently low for conceptual arguments; weighting is moderate and roughly mirrors the Acemoglu item it answers, keeping the philosophical dispute balanced.",
        },
      ],
    },
  ],
};
