import type { Topic } from "@/lib/schemas/topic";

export const vaccineMandatesData = {
  id: "vaccine-mandates",
  title: "Government Vaccine Mandates",
  meta_claim:
    "Government vaccine mandates are a justified public-health measure.",
  status: "contested" as const,
  category: "policy" as const,
  last_updated: "2026-06-16",
  tags: ["vaccines", "public-health", "policy", "covid-19", "law", "ethics"],
  keystone_fact: {
    statement:
      "Whether a vaccine mandate is justified depends less on politics than on one number — how much the vaccine cuts transmission to others. For measles (which needs ~95% coverage), school-entry mandates underpinned US elimination in 2000; for COVID the transmission benefit was modest and waned within weeks.",
    confidence: 85,
    source: "CDC measles data; peer-reviewed transmission studies (NEJM)",
    sourceUrl: "https://www.cdc.gov/measles/data-research/index.html",
  },
  simple_case: [
    "The honest answer is 'it depends on the disease': mandates are easiest to justify when a vaccine strongly and durably blocks transmission and the disease needs very high coverage — measles is the textbook case.",
    "School-entry measles mandates pushed US coverage above ~95% and underpinned elimination in 2000; when coverage slipped, 2025 brought the most US measles cases since 1992 — so for measles, mandates demonstrably work.",
    "For COVID the case is weaker — the vaccines cut onward transmission only modestly and briefly — so the strongest objections (does it really protect others? does coercion erode trust?) bite hardest there, not for long-standing childhood mandates.",
  ],
  pillars: [
    {
      id: "do-mandates-work",
      title: "Do Mandates Actually Raise Uptake?",
      short_summary:
        "School-entry and proof-of-vaccination mandates have measurably increased coverage in many settings — but the size of the effect depends heavily on design and context.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Coercion does not reliably change behavior at the margin where it matters: the committed refusers. Austria enacted Europe's first general adult COVID-19 vaccine mandate in February 2022, yet suspended it before any fine was ever levied and formally abolished it months later — surveys found roughly an eighth of residents said they would refuse regardless. A controlled time-series of three European countries found no discernible uptake increase in Austria. Mandates can also shift refusal into harder-to-police channels: after California removed non-medical exemptions, dubious medical exemptions more than tripled, partly offsetting the gain.",
      proponent_rebuttal:
        "Where it has been measured with credible controls, the announcement of a mandate produces rapid, large uptake gains. A difference-in-differences study across Canadian provinces and three European countries found mandate announcements were followed by more than a 60% jump in weekly first doses — an estimated 6.5 million extra doses in Italy, 4.6 million in France. A six-country synthetic-control study found COVID certificates raised uptake most in countries that were lagging. And the century-old workhorse — school-entry requirements — drove US childhood coverage above the ~95% herd-immunity threshold and underpinned measles elimination in 2000.",
      crux: {
        id: "counterfactual-uptake",
        title: "The Counterfactual Uptake Test",
        description:
          "The load-bearing empirical question is how many additional people get vaccinated because of the mandate, versus those who would have been vaccinated anyway as the rollout matured.",
        methodology:
          "Use quasi-experimental designs — difference-in-differences across jurisdictions with staggered mandate timing, interrupted time series with matched controls, or synthetic-control modelling — to isolate the mandate's marginal effect on first-dose rates, separating it from the underlying uptake trend.",
        verification_status: "verified" as const,
        cost_to_verify: "$50K (econometric analysis of public dose data)",
        falsification: {
          supporter_flip:
            "If quasi-experimental designs consistently showed mandates produce little marginal uptake beyond the underlying trend (as one Austria time-series found), the 'mandates work' premise weakens — leaving justification to rest on coverage that would have happened anyway.",
          skeptic_flip:
            "If well-controlled studies keep showing mandate announcements drive large, rapid first-dose jumps (the ~60%+ weekly increases seen across Canadian provinces, Italy, France), the 'coercion can't move refusers' objection fails for the marginal population.",
          common_ground:
            "Both sides agree committed refusers are hard to move and that school-entry mandates have historically achieved very high childhood coverage.",
          live_disagreement:
            "How much of the post-mandate uptake is truly caused by the mandate versus uptake that would have occurred as the rollout matured.",
        },
      },
      evidence: [
        {
          id: "diff-in-diff-uptake",
          title: "Mandate Announcements Raised Weekly First Doses 60%+",
          description:
            "A difference-in-differences study exploiting staggered mandate timing across Canadian provinces (with France, Italy, Germany) found mandate announcements were followed by a >60% rise in weekly first doses, with estimated cumulative gains of ~6.5M doses in Italy, ~4.6M in France, ~3.5M in Germany, and ~979K in Canada.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source:
            "Karaivanov, Kim, Lu & Shigeoka, 'COVID-19 vaccination mandates and vaccine uptake', Nature Human Behaviour (2022)",
          sourceUrl: "https://doi.org/10.1038/s41562-022-01363-1",
          reasoning:
            "Peer-reviewed quasi-experiment with a credible causal design (staggered timing across jurisdictions) that directly measures the mandate's marginal effect on uptake. High on all dimensions; the main limitation is generalizability beyond the early-rollout COVID context.",
        },
        {
          id: "sb277-school-mandate",
          title: "Removing Exemptions Raised MMR Coverage to Herd-Immunity Levels",
          description:
            "After California's SB277 eliminated non-medical exemptions (2016), a study estimated statewide MMR kindergarten coverage rose ~3% and coverage approached 95% in nearly all counties, with the largest gains in previously low-coverage counties. Medical exemptions rose only ~0.4%.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Nyathi, Karpel, Sainani, Maldonado, Hotez, Bendavid et al., PLOS Medicine (2019), 'The 2016 California policy to eliminate nonmedical vaccine exemptions and changes in vaccine coverage'",
          sourceUrl: "https://doi.org/10.1371/journal.pmed.1002994",
          reasoning:
            "Peer-reviewed evaluation using hypothetical/synthetic controls, directly on a real government mandate. Note the offsetting rise in medical exemptions is a documented loophole, but it was far smaller than the coverage gain.",
        },
        {
          id: "austria-mandate-failed",
          title: "Austria's Adult Mandate Was Abandoned Before Enforcement",
          description:
            "Austria's general COVID-19 vaccine mandate for adults took effect in February 2022, was suspended in March before any fine was imposed, and was formally abolished in June 2022. A controlled time-series found no discernible uptake increase in Austria; officials cited surveys suggesting it would not move committed refusers.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source:
            "US Library of Congress Global Legal Monitor, 'Austria: General COVID-19 Vaccine Mandate Suspended' (2022); Lytras et al., Vaccine (2024), null result for Austria",
          sourceUrl:
            "https://www.loc.gov/item/global-legal-monitor/2022-03-17/austria-general-covid-19-vaccine-mandate-suspended/",
          reasoning:
            "A concrete case where an adult mandate failed to move uptake and was politically unsustainable. Lower directness/replicability because it is a single national case rather than a controlled comparison, and an unenforced mandate is a weak test of enforced mandates.",
        },
      ],
    },
    {
      id: "harm-to-others",
      title: "Do Mandates Protect Other People?",
      short_summary:
        "The classic justification — stopping the unvaccinated from infecting others — is strong for high-coverage diseases like measles but weaker for vaccines that mainly cut severe disease in the recipient.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Liberal political theory permits coercion chiefly to prevent harm to others. If a vaccine primarily protects the recipient — not those around them — the harm-principle justification collapses, and the case reduces to paternalism. For COVID-19, peer-reviewed data showed vaccines cut onward transmission of Delta only modestly and that protection waned within weeks. A coercive mandate premised on 'protecting others' is hard to justify when the transmission benefit is small and short-lived.",
      proponent_rebuttal:
        "For the diseases mandates have long targeted, the externality is real and large: measles needs ~95% coverage to interrupt transmission, and US elimination in 2000 depended on near-universal school-entry vaccination. As coverage slipped below that threshold, measles came roaring back — 2025 saw the most US cases since 1992. Even for COVID, vaccination did reduce transmission (e.g. a ~68% cut for Alpha, ~50% early for Delta), so the externality was nonzero. Mandates are calibrated to the disease, not a blanket coercion.",
      crux: {
        id: "transmission-externality",
        title: "The Transmission Externality Test",
        description:
          "Whether a mandate is ethically justified by the harm principle turns on a measurable quantity: how much a vaccinated person's reduced infectiousness lowers risk to others, and for how long.",
        methodology:
          "Estimate the secondary-attack-rate reduction from vaccinated index cases versus unvaccinated (contact-tracing and household-transmission studies), track its waning over time, and compare it against the herd-immunity threshold for the specific pathogen.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (analysis of existing contact-tracing data)",
        falsification: {
          supporter_flip:
            "If a vaccine is shown to barely reduce onward transmission (or only briefly), the harm-principle justification for compelling it collapses and the case reduces to paternalism — as critics argue for COVID.",
          skeptic_flip:
            "If the vaccine demonstrably and durably cuts transmission enough to protect others — as for measles at the ~95% threshold — the 'it only protects the recipient' objection fails and coercion clears the harm-principle bar.",
          common_ground:
            "Both sides agree the harm principle is the right test, and that measles vaccination produces a large transmission externality while COVID's was smaller and waned.",
          live_disagreement:
            "For any given vaccine, whether the measured, durable reduction in infecting others is large enough to justify compulsion.",
        },
      },
      evidence: [
        {
          id: "measles-elimination",
          title: "School Mandates Underpinned US Measles Elimination",
          description:
            "The CDC attributes US measles elimination in 2000 to very high MMR coverage sustained by school-entry requirements (two doses are ~97% effective). As kindergarten coverage fell from 95.2% (2019–20) to 92.5% (2024–25), measles resurged, with 2025 the worst US year since 1992.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "US CDC, 'Measles Cases and Outbreaks' and kindergarten vaccination coverage data (MMWR)",
          sourceUrl: "https://www.cdc.gov/measles/data-research/index.html",
          reasoning:
            "Authoritative government surveillance data showing both the historical success of school mandates and the dose-response when coverage falls. The natural-experiment of declining coverage strengthens the causal read; directness is high for measles specifically.",
        },
        {
          id: "vaccine-cuts-transmission",
          title: "Vaccination Did Reduce Onward Transmission (Then Waned)",
          description:
            "A large UK contact-tracing study (146,243 tested contacts) found two-dose vaccination cut onward transmission of the Alpha variant by ~68% and Delta by ~50% (BNT162b2) at two weeks — but protection against Delta transmission waned substantially within ~12 weeks.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source:
            "Eyre, Taylor, Purver et al., 'Effect of Covid-19 Vaccination on Transmission of Alpha and Delta Variants', New England Journal of Medicine (2022)",
          sourceUrl: "https://doi.org/10.1056/NEJMoa2116597",
          reasoning:
            "High-quality peer-reviewed transmission study. It supports the externality premise (transmission was reduced) but its own finding of rapid waning is exactly what skeptics cite — so directness to the 'mandate justified' claim is moderate and genuinely double-edged.",
        },
        {
          id: "waning-undercuts-harm-principle",
          title: "Modest, Short-Lived Transmission Effect Weakens the Harm Case",
          description:
            "Bioethics analysis argues that if COVID-19 vaccines reduce transmission only modestly and briefly, the harm principle cannot directly justify coercive mandates, since the core ethical warrant for coercion is preventing harm to others — not protecting the recipient.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 8,
          },
          source:
            "Kraaijeveld, 'The Ethical Significance of Post-Vaccination COVID-19 Transmission Dynamics', Journal of Bioethical Inquiry (2022)",
          sourceUrl: "https://doi.org/10.1007/s11673-022-10223-6",
          reasoning:
            "A normative argument, not an empirical finding, so replicability is low — but it is directly on the load-bearing crux and rests on the (verified) premise that the transmission benefit waned. Strong on directness, weaker on independent corroboration.",
        },
      ],
    },
    {
      id: "legitimacy-and-trust",
      title: "Are Mandates Lawful and Trust-Preserving?",
      short_summary:
        "Courts have long upheld vaccine mandates under state police power, but have also drawn firm limits — and there is real evidence coercion can erode the trust public health depends on.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Even a benefit does not make a mandate justified if it overreaches its legal authority or corrodes public trust. The US Supreme Court stayed OSHA's vaccine-or-test rule for 80+ million workers in 2022, holding the agency had exceeded its statutory power to regulate broad public-health risks. Separately, an interdisciplinary group argued mandates and passports may backfire — deepening distrust of public health, hardening hesitancy, and politicizing vaccination — costs that can outlast any short-term uptake gain.",
      proponent_rebuttal:
        "Mandates have been constitutional bedrock since Jacobson v. Massachusetts (1905), which upheld compulsory smallpox vaccination under state police power; the same day it blocked OSHA, the Supreme Court upheld the federal vaccine mandate for healthcare workers. The legal limits are about which body acts, not whether mandates can ever be justified. And the trust-erosion thesis is contested: critics note it draws strong causal conclusions from hypotheses, and pro-mandate governments were re-elected. Properly scoped mandates remain lawful and effective.",
      crux: {
        id: "net-trust-effect",
        title: "The Net Legitimacy Test",
        description:
          "A mandate is justified only if its public-health gains exceed its costs to legal legitimacy and institutional trust — the question is whether coercion's downstream erosion of cooperation outweighs the lives saved.",
        methodology:
          "Combine legal analysis of whether the mandating body acted within its authority with longitudinal measurement of trust in public-health institutions and downstream vaccine hesitancy (panel surveys before/after mandates), netting health benefits against trust costs.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500K (multi-year longitudinal trust panel)",
        falsification: {
          supporter_flip:
            "If longitudinal panels showed mandates durably erode trust in public health and harden hesitancy enough to lower future vaccination, the net-legitimacy case could go negative even when short-term uptake rises.",
          skeptic_flip:
            "If trust measures recover with no lasting hesitancy increase (and pro-mandate governments are re-elected, as some were), the 'mandates backfire by destroying trust' thesis fails.",
          common_ground:
            "Both sides agree courts have upheld properly-scoped mandates (Jacobson 1905; the healthcare-worker rule) while striking overbroad ones (the OSHA stay) — the limit is about which body acts.",
          live_disagreement:
            "Whether coercion's downstream erosion of institutional trust and cooperation outweighs the lives saved — and whether that trust-erosion effect is real or overstated.",
        },
      },
      evidence: [
        {
          id: "jacobson",
          title: "Supreme Court Upheld Mandates in Jacobson (1905)",
          description:
            "In Jacobson v. Massachusetts (1905), the US Supreme Court ruled 7–2 that a state could compel smallpox vaccination under its police power, holding individual liberty may be reasonably constrained for public health so long as the measure is not arbitrary or oppressive — the foundational US precedent for vaccine mandates.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source:
            "Jacobson v. Massachusetts, 197 U.S. 11 (1905), US Supreme Court opinion (Justia)",
          sourceUrl: "https://supreme.justia.com/cases/federal/us/197/11/",
          reasoning:
            "Primary legal source establishing that government vaccine mandates can be lawful. Directness is moderate: it establishes legality/legitimacy, not that any given mandate is wise or effective. Replicability is high (a fixed, citable holding).",
        },
        {
          id: "nfib-osha",
          title: "Supreme Court Struck Down the OSHA Employer Mandate",
          description:
            "In NFIB v. OSHA (2022), the Supreme Court stayed (6–3) OSHA's vaccine-or-test rule for employers with 100+ workers (80M+ employees), holding OSHA may regulate occupational hazards but not broad public-health risks of daily life absent clear congressional authorization.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          source:
            "National Federation of Independent Business v. OSHA, 595 U.S. ___ (2022), US Supreme Court per curiam (Justia)",
          sourceUrl: "https://supreme.justia.com/cases/federal/us/595/21a244/",
          reasoning:
            "Primary legal source establishing real limits on mandate authority. Directness is moderate: it constrains who may mandate and how, rather than holding all mandates unjustified — the Court explicitly distinguished targeted mandates it upheld the same day.",
        },
        {
          id: "bardosh-trust-erosion",
          title: "Mandates May Erode Trust and Backfire",
          description:
            "An interdisciplinary group argued that population-wide COVID-19 mandates, passports and restrictions may be counterproductive across behavioral, political-legal, socioeconomic and scientific-integrity domains — deepening distrust of public health and hardening hesitancy in ways that could outlast short-term uptake gains.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 4,
            directness: 7,
          },
          source:
            "Bardosh, de Figueiredo, Gur-Arie et al., 'The unintended consequences of COVID-19 vaccine policy', BMJ Global Health 7:e008684 (2022)",
          sourceUrl: "https://doi.org/10.1136/bmjgh-2022-008684",
          reasoning:
            "Peer-reviewed but explicitly hypothesis-generating rather than evidentiary; a published commentary (Smith, 2022) argues it draws causal conclusions its hypotheses cannot support, and pro-mandate governments were re-elected. Low replicability/independence, but it is directly on the trust-cost crux.",
        },
      ],
    },
  ],
};
