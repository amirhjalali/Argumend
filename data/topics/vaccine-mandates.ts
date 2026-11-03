export const vaccineMandatesData = {
  id: "vaccine-mandates",
  title: "Vaccine Mandates",
  question: "Should vaccines be mandatory for school and work?",
  meta_claim:
    "Governments are justified in requiring vaccination for school entry and for some jobs, with medical exemptions, because the protection of others and of children outweighs the cost to individual choice.",
  status: "contested" as const,
  category: "policy" as const,
  // As of 3 November 2026: the US has recorded 4,588 confirmed measles cases
  // this year (CDC, 22 October), double 2025's total; kindergarten MMR
  // coverage is 92.4% and exemptions a record 4.2% (2025-26); Florida's
  // health department is moving to drop four vaccines from its school rules;
  // a federal court has stayed the CDC's January 2026 childhood schedule and
  // the votes of the ACIP members appointed since June 2025; and New York's
  // Amish families are asking the Supreme Court a second time to restore a
  // religious exemption.
  last_updated: "2026-11-03",
  tags: ["vaccines", "public-health", "policy", "covid-19", "law", "ethics", "measles"],
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "By 22 October 2026 the US had confirmed 4,588 measles cases this year, double the 2,289 of all 2025, with 479 hospitalisations. Kindergarten MMR coverage has slipped from 95.2% in 2019-20 to 92.4% in 2025-26. Florida is moving to drop four vaccines from its school requirements. The fight is over when the state may require a shot, and whether requiring one gets more children protected or costs the trust that gets them vaccinated.",
    confidence: 88,
    source:
      "Contagion Live, 'Measles Update: October 23, 2026', on CDC data as of 22 October 2026; WLRN / News Service of Florida (9 October 2026) on Florida's proposed rule",
    sourceUrl: "https://www.contagionlive.com/view/measles-update-october-23-2026",
  },
  simple_case: [
    "The answer decides whether a parent can enroll an unvaccinated child in school, whether a hospital can make its nurses take a shot, and how far measles spreads before the next school year.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Do requirements raise uptake? (what we know)
    // =========================================================================
    {
      id: "do-mandates-work",
      title: "Do Requirements Get More People Vaccinated?",
      short_summary:
        "When California ended non-medical exemptions, kindergarten MMR coverage rose 3.3 points against a synthetic control, and COVID mandate announcements in Canada, France, Italy and Germany were followed by jumps of more than 60% in weekly first doses. Austria's adult mandate moved no one before it was scrapped. The dispute is how much of the gain a requirement causes, and among whom.",
      icon_name: "Users" as const,
      skeptic_premise:
        "A requirement moves the parents who were persuadable anyway and hardens the ones who were not. Austria enacted Europe's first general adult COVID-19 mandate in February 2022, suspended it in March before a single fine was levied, and abolished it in June; a controlled time series found no uptake gain there. Workarounds blunt the rest: after California ended non-medical exemptions, medical exemptions rose, partly offsetting the gain. Coverage gains credited to mandates often coincide with a rollout maturing on its own, and the people a mandate is meant for are the ones most likely to refuse it.",
      proponent_rebuttal:
        "Requirements work where they are measured: when California ended non-medical exemptions in 2016, kindergarten MMR coverage rose 3.3 points against a synthetic control, most in the counties that had been lowest. A difference-in-differences study across Canadian provinces and three European countries found mandate announcements were followed by a rise of more than 60% in weekly first doses, an estimated 6.5 million extra doses in Italy and 4.6 million in France. The reverse holds too: as US exemptions climbed to a record 4.2% in 2025-26, kindergarten coverage fell for every vaccine tracked, to 92.4% for MMR. Austria shows that an unenforced mandate does nothing, not that enforced school rules fail.",
      crux: {
        id: "counterfactual-uptake",
        title: "The Counterfactual Uptake Test",
        question:
          "How much of the uptake after a mandate is caused by the mandate, rather than the maturing rollout?",
        description:
          "The load-bearing empirical question is how many additional people get vaccinated because of the mandate, versus those who would have been vaccinated anyway as the rollout matured or as a school year turned over.",
        methodology:
          "Use quasi-experimental designs — difference-in-differences across jurisdictions with staggered mandate timing, interrupted time series with matched controls, or synthetic-control modelling — to isolate the mandate's marginal effect on first-dose rates, separating it from the underlying uptake trend. For school rules, compare coverage before and after exemptions are added or removed (California 2016, Florida if its rule takes effect) against matched states that made no change.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Studies that use staggered mandate dates across places, by difference-in-differences or synthetic controls, to measure first-dose jumps against the uptake trend each place was on, and kindergarten coverage in states that add or drop exemptions against matched states that change nothing.",
        },
        cost_to_verify: "$50K (econometric analysis of public dose and school-coverage data)",
        falsification: {
          supporter_flip:
            "If quasi-experimental designs consistently showed mandates produce little marginal uptake beyond the underlying trend, as one Austria time series found, and if coverage held steady in states that loosened school exemptions, the case for requirements would rest on coverage that would have come anyway.",
          skeptic_flip:
            "If Florida's coverage for the four vaccines it drops fell against matched states, and well-controlled studies kept finding mandate announcements followed by first-dose jumps like the 60% seen across Canadian provinces, Italy and France, the claim that coercion cannot move the hesitant would fail.",
          common_ground:
            "Both sides agree committed refusers are hard to move and that school-entry requirements have historically achieved very high childhood coverage.",
          live_disagreement:
            "How much of the post-mandate uptake is caused by the mandate rather than by a rollout maturing on its own, and whether the gain reaches the communities where outbreaks start.",
        },
      },
      evidence: [
        {
          id: "diff-in-diff-uptake",
          title: "Mandate announcements were followed by 60%+ more weekly first doses (Nature Human Behaviour, 2022)",
          description:
            "A difference-in-differences study exploiting staggered mandate timing across Canadian provinces (with France, Italy and Germany) found mandate announcements were followed by a rise of more than 60% in weekly first doses, with estimated cumulative gains of about 6.5 million doses in Italy, 4.6 million in France, 3.5 million in Germany and 979,000 in Canada.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source:
            "Karaivanov, Kim, Lu & Shigeoka, 'COVID-19 vaccination mandates and vaccine uptake', Nature Human Behaviour (2022)",
          sourceUrl: "https://doi.org/10.1038/s41562-022-01363-1",
          reasoning:
            "A peer-reviewed quasi-experiment with a credible causal design that measures the mandate's marginal effect on uptake. It shows that announcing a requirement moves people. It does not show the effect lasts, or that it would repeat for childhood vaccines outside a pandemic, so directness is one notch below the maximum.",
        },
        {
          id: "sb277-school-mandate",
          title: "California's end of non-medical exemptions raised kindergarten MMR coverage 3.3 points (PLOS Medicine, 2019)",
          description:
            "After California's SB277 eliminated non-medical exemptions in 2016, a study estimated statewide kindergarten MMR coverage rose 3.3 percentage points relative to a synthetic control, with the largest gains in counties that had the lowest coverage before the law. Medical exemptions rose 0.4 points statewide, offset by a larger fall in non-medical exemptions.",
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
            "A peer-reviewed evaluation of a real school mandate against a synthetic control. The rise in medical exemptions is a documented loophole, but it was far smaller than the coverage gain. One state and one vaccine, so it shows a school rule can move coverage, not how much every rule would.",
        },
        {
          id: "kindergarten-exemptions-record-2026",
          title: "US kindergarten exemptions hit a record 4.2% in 2025-26 as coverage fell for every vaccine",
          description:
            "CDC data for the 2025-26 school year, reported in August 2026, put kindergarten exemptions at a record 4.2%, up from 3.6% the year before, with exemption rates rising in 41 states and Washington, D.C. Coverage slipped for every childhood vaccine tracked nationally, to between 92.0% for DTaP and 92.4% for MMR and polio. Nearly half of states now exceed a 5% exemption rate.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source:
            "WJLA, 'CDC: U.S. kindergarten vaccine exemptions hit record high as coverage falls nationwide' (17 August 2026), on CDC SchoolVaxView data",
          sourceUrl:
            "https://wjla.com/news/nation-world/cdc-us-kindergarten-vaccine-exemptions-hit-record-high-as-coverage-falls-nationwide",
          reasoning:
            "Exemptions and coverage moving in opposite directions, state by state, is what the case for requirements predicts. It is a national trend, not a controlled comparison: the same years saw falling trust and changing federal advice, so the card shows the association, not how much loosening rules caused it.",
        },
        {
          id: "austria-mandate-failed",
          title: "Austria's adult COVID mandate was suspended before a single fine (2022)",
          description:
            "Austria's general COVID-19 vaccine mandate for adults took effect in February 2022, was suspended in March before any fine was imposed, and was formally abolished in June 2022. A controlled time series found no discernible uptake increase in Austria; officials cited surveys suggesting it would not move committed refusers.",
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
            "A concrete case where a national adult mandate moved no one and could not be sustained politically. It is a single country, and an unenforced mandate is a weak test of enforced ones, so replicability is lower.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Does the shot protect others? (mechanism)
    // =========================================================================
    {
      id: "harm-to-others",
      title: "Does the Shot Protect Other People?",
      short_summary:
        "Coercion is easiest to defend when one person's shot protects the people around them. For measles, which needs about 95% coverage to stop spreading, it plainly does, and 2026's outbreaks follow the gaps. For COVID, vaccination cut onward spread by roughly half against Delta at first and waned within about 12 weeks.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Compulsion is justified to stop harm to others, not to protect people from themselves, and for COVID the protection of others was small and brief. A UK contact-tracing study found two doses cut onward Delta transmission by about half at first, with the effect waning substantially within about 12 weeks; by the time 'no jab, no job' rules bit, the shot mainly protected the person who took it. A rule premised on 'protecting others' that outlasts the protection is paternalism under another name, and a shot that mainly protects the recipient should be the recipient's call.",
      proponent_rebuttal:
        "For the diseases school rules target, the protection of others is large and measurable: measles needs about 95% coverage to stop spreading, and as US kindergarten coverage slid from 95.2% to 92.4%, cases climbed to 2,289 in 2025 and 4,588 by October 2026, 96% of them in outbreaks. Babies too young for the shot and children on chemotherapy depend on everyone else's. Even COVID vaccination cut onward transmission, by about 68% for Alpha and about half for Delta at first.",
      crux: {
        id: "transmission-externality",
        title: "The Transmission Externality Test",
        question:
          "Does a given vaccine reduce spread to others enough, and for long enough, to justify compulsion?",
        description:
          "Whether a mandate is ethically justified by the harm principle turns on a measurable quantity: how much a vaccinated person's reduced infectiousness lowers risk to others, and for how long. How large that protection must be before compulsion is licensed is a value judgment the measurement does not make.",
        methodology:
          "Estimate the secondary-attack-rate reduction from vaccinated index cases versus unvaccinated (contact-tracing and household-transmission studies), track its waning over time, and compare it against the herd-immunity threshold for the specific pathogen. For measles, compare outbreak size against local coverage in the 2025-26 outbreaks.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Contact-tracing and household studies of how often vaccinated people infect others compared with unvaccinated people, and how fast that falls in the months after the dose, for the specific vaccine. How large an effect licenses compulsion is a value choice those studies cannot make.",
        },
        cost_to_verify: "$0 (analysis of existing contact-tracing and outbreak data)",
        falsification: {
          supporter_flip:
            "If a vaccine were shown to barely reduce onward transmission, or only for weeks, the harm-principle case for compelling it would collapse into paternalism, as critics argue for COVID.",
          skeptic_flip:
            "If a vaccine measurably and durably cut transmission enough to protect others, as measles vaccination does near the 95% threshold, and outbreaks kept clustering where coverage fell below it, the objection that the shot only protects the recipient would fail for that vaccine.",
          common_ground:
            "Both sides agree the harm principle is the right test, and that measles vaccination produces a large transmission externality while COVID's was smaller and waned.",
          live_disagreement:
            "For any given vaccine, whether the measured, durable reduction in infecting others is large enough to justify compulsion, and who should draw that line.",
        },
      },
      evidence: [
        {
          id: "measles-resurgence-2026",
          title: "US measles cases reached 4,588 by 22 October 2026, double 2025, as kindergarten coverage fell to 92.4%",
          description:
            "As of 22 October 2026 the CDC had confirmed 4,588 measles cases in the US this year, roughly double the 2,289 reported for all of 2025, with 479 hospitalisations (10%) and three deaths. Of the cases, 96% were outbreak-associated, across 43 new outbreaks. Kindergarten MMR coverage has fallen from 95.2% in 2019-20 to 92.4% in 2025-26, leaving about 280,000 kindergartners without documented protection.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Contagion Live, 'Measles Update: October 23, 2026', on CDC surveillance data as of 22 October 2026",
          sourceUrl: "https://www.contagionlive.com/view/measles-update-october-23-2026",
          reasoning:
            "Surveillance data showing a highly contagious disease returning as coverage slips below the level that stops it spreading, mostly in outbreaks. This is the externality the case for requirements rests on. It does not by itself show that tighter requirements would reach the communities where the outbreaks began, which is the question on uptake.",
        },
        {
          id: "measles-elimination",
          title: "School requirements underpinned US measles elimination in 2000",
          description:
            "The CDC attributes US measles elimination in 2000 to very high MMR coverage sustained by school-entry requirements; two doses are about 97% effective. Because measles is so contagious, about 95% of a community must be immune to stop sustained spread, which leaves infants too young to be vaccinated and immunocompromised children dependent on others' immunity.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "US CDC, 'Measles Cases and Outbreaks' and kindergarten vaccination coverage data (MMWR)",
          sourceUrl: "https://www.cdc.gov/measles/data-research/index.html",
          reasoning:
            "Authoritative surveillance data on the historical success of near-universal school vaccination. It shows that high coverage stopped measles; it credits requirements for that coverage, which is the inference the uptake question tests.",
        },
        {
          id: "vaccine-cuts-transmission",
          title: "Two COVID doses cut onward Delta spread by about half at first, then waned within 12 weeks (NEJM, 2022)",
          description:
            "A large UK contact-tracing study (146,243 tested contacts) found two-dose vaccination cut onward transmission of the Alpha variant by about 68% and Delta by about 50% (BNT162b2) two weeks after the second dose, but protection against Delta transmission waned substantially within about 12 weeks.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source:
            "Eyre, Taylor, Purver et al., 'Effect of Covid-19 Vaccination on Transmission of Alpha and Delta Variants', New England Journal of Medicine (2022)",
          sourceUrl: "https://doi.org/10.1056/NEJMoa2116597",
          reasoning:
            "A high-quality transmission study. It shows the protection of others was real, which the 'it only protects the recipient' claim denies, and that it faded fast, which is what skeptics cite. It cuts both ways, so directness is moderate.",
        },
        {
          id: "waning-undercuts-harm-principle",
          title: "Bioethicist: a modest, short-lived transmission effect cannot carry the harm-principle case (2022)",
          description:
            "A bioethics analysis argues that if COVID-19 vaccines reduce transmission only modestly and briefly, the harm principle cannot directly justify coercive mandates, since the core ethical warrant for coercion is preventing harm to others, not protecting the recipient.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 7,
          },
          source:
            "Kraaijeveld, 'The Ethical Significance of Post-Vaccination COVID-19 Transmission Dynamics', Journal of Bioethical Inquiry (2022)",
          sourceUrl: "https://doi.org/10.1007/s11673-022-10223-6",
          reasoning:
            "A normative argument, not an empirical finding, resting on the measured waning of the transmission benefit. It bears on COVID mandates for adults; it says nothing against school rules for vaccines that durably stop spread.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Do mandates cost trust? (consequences)
    // =========================================================================
    {
      id: "legitimacy-and-trust",
      title: "Do Mandates Cost the Trust Vaccination Needs?",
      short_summary:
        "Critics argue the COVID mandates spent the trust that childhood vaccination depends on, and US exemptions have since hit a record. A 2024 evidence synthesis found mandates can trigger anger and resistance, but the research on trust is thin and runs both ways. Italy's 2017 law, which made ten vaccines compulsory, was followed by higher coverage and higher confidence in vaccine safety.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Coercion spends trust, and trust is what keeps people coming back for the next shot. An interdisciplinary group warned in 2022 that COVID mandates and passports could deepen distrust of public health and harden hesitancy beyond COVID; a 2024 evidence synthesis found most studies show mandates provoke psychological reactance, anger and resistance to a perceived threat to freedom. Since then, US kindergarten exemptions have climbed to a record and Florida's surgeon general now frames school requirements as a question of parents' rights. Each additional shot that people feel forced to take makes the next ask harder.",
      proponent_rebuttal:
        "The trust that collapsed after 2020 has many causes, and blaming it on mandates assumes what has to be shown: the 2024 evidence synthesis found the research on trust thin and running both ways, since people who already distrust government are the ones who oppose mandates. Where a country tried the hard approach on childhood vaccines, the backlash did not come: Italy's 2017 law raised compulsory infant vaccines from four to ten and barred unvaccinated children from nurseries, coverage rose, and a 2018 EU survey found Italians more confident in vaccine safety than in 2015. Measles deaths do more damage to trust than school rules do.",
      crux: {
        id: "net-trust-effect",
        title: "The Net Legitimacy Test",
        question:
          "Does lost trust in institutions from mandates outweigh the lives they save, and is that loss real?",
        description:
          "A mandate is justified only if its public-health gains exceed its costs to institutional trust. The empirical question is whether coercion durably lowers later vaccination among the people it touched; netting that against lives saved is a weighting no measurement supplies.",
        methodology:
          "Longitudinal panels that measure the same people's trust in public-health institutions and their later uptake of other vaccines, before and after a mandate, against comparable people or places that had none; plus coverage and confidence surveys in countries that tightened childhood mandates (Italy 2017, France 2018) against neighbours that did not.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Panel surveys that follow the same people's trust in public-health agencies, and their later vaccine uptake, from before a mandate to years after, against places that had none. Netting any lasting loss against lives saved takes a weighting no measurement supplies.",
        },
        cost_to_verify: "$500K (multi-year longitudinal trust panel)",
        falsification: {
          supporter_flip:
            "If longitudinal panels showed that people subject to COVID mandates later skipped flu, measles or other shots at higher rates than comparable people who were not, the trust cost could outweigh the short-term uptake gain.",
          skeptic_flip:
            "If panels found no lasting drop in later vaccination among people who faced mandates, and countries that tightened childhood mandates kept both coverage and confidence up as Italy did after 2017, the claim that mandates backfire by destroying trust would fail.",
          common_ground:
            "Both sides agree trust in public health fell after 2020 and that people who distrust government are the most likely to resist a mandate.",
          live_disagreement:
            "Whether mandates caused a lasting loss of trust that lowers later vaccination, or whether distrust drives opposition to mandates and would have spread without them.",
        },
      },
      evidence: [
        {
          id: "italy-2017-mandate-confidence",
          title: "Italy made ten infant vaccines compulsory in 2017; coverage rose and confidence in vaccine safety improved",
          description:
            "Italy's 2017 Lorenzin decree raised mandatory infant vaccines from four to ten, barred unvaccinated children from nurseries and kindergartens, and fined parents who did not comply. A 2021 policy analysis in Health Policy found preliminary data showing an increase in vaccination coverage. The European Commission's 2018 survey of vaccine confidence, led by the London School of Hygiene & Tropical Medicine's Vaccine Confidence Project, found Italy among the countries that had become more confident in vaccine safety since 2015.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source:
            "Casula & Toth, 'The 2017 Italian reform on mandatory childhood vaccinations', Health Policy (2021); Reuters via Dawn (24 October 2018) on 'The State of Vaccine Confidence in the EU 2018'",
          sourceUrl: "https://cris.unibo.it/handle/11585/801016",
          reasoning:
            "A national test of the hard approach on childhood vaccines in which neither coverage nor confidence fell. Before-and-after data from one country, with short follow-up and no control, so it shows a backlash is not inevitable rather than that mandates build trust.",
        },
        {
          id: "mcmaster-reactance-synthesis-2024",
          title: "Evidence synthesis: mandates often trigger reactance; research on trust is thin and runs both ways (McMaster, 2024)",
          description:
            "A rapid evidence synthesis by McMaster University's behavioural science team, updated in March 2024 and covering 30 studies from Canada, the US, the UK, Australia and New Zealand, found 'a neutral to modest positive association between mandates and vaccination intention', that most studies suggested mandates increase psychological reactance, and that, on limited research, mandates may harm trust between governments and the public when people do not see them as necessary. It concluded that short-term uptake gains 'should be carefully considered against any potential effect on reactance and trust'.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 5,
            directness: 6,
          },
          source:
            "McMaster Health Forum, BeSci Rapid Evidence Synthesis RS13, 'COVID-19 vaccine mandates and their relationship with vaccination intention, psychological reactance, and trust' (27 March 2024)",
          sourceUrl:
            "https://www.mcmasterforum.org/docs/default-source/product-documents/rapid-responses/rs13-2_vaccine-mandates_2024-04-16_final.pdf",
          reasoning:
            "The most systematic look at mandates and trust, and it lands on caution: reactance is common, the trust effect is plausible but rests on little research, and much of it uses hypothetical mandates. It supports the worry without measuring a lasting effect on later vaccination.",
        },
        {
          id: "bardosh-trust-erosion",
          title: "Interdisciplinary group: COVID mandates and passports may harden hesitancy beyond COVID (BMJ Global Health, 2022)",
          description:
            "An interdisciplinary group argued that population-wide COVID-19 mandates, passports and restrictions may be counterproductive across behavioural, political-legal, socioeconomic and scientific-integrity domains, deepening distrust of public health and hardening hesitancy in ways that could outlast short-term uptake gains.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 4,
            directness: 6,
          },
          source:
            "Bardosh, de Figueiredo, Gur-Arie et al., 'The unintended consequences of COVID-19 vaccine policy', BMJ Global Health 7:e008684 (2022)",
          sourceUrl: "https://doi.org/10.1136/bmjgh-2022-008684",
          reasoning:
            "Peer-reviewed but explicitly hypothesis-generating: it sets out the mechanisms by which mandates could backfire rather than measuring them, and a published commentary (Smith, 2022) argues it draws causal conclusions its hypotheses cannot support.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Who decides, and who may opt out? (values)
    // =========================================================================
    {
      id: "who-decides",
      title: "Who Decides, and Who May Opt Out?",
      short_summary:
        "US courts have upheld vaccine requirements since 1905 while limiting which agencies can impose them. The live fights of 2026 are over exemptions and authority: Florida's health department moving to drop four school vaccines, New York's Amish asking the Supreme Court to restore a religious exemption, and a federal court freezing the CDC's January 2026 childhood schedule.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "A child's medical care belongs first to the parents, and a state that overrides a sincere religious or moral objection for a school seat is claiming more than the Constitution grants. Florida's surgeon general, Joseph Ladapo, argues that a public health system 'where parents are actively making decisions' is healthier than one built on orders; the requirements his department proposes to drop, for hepatitis B, chickenpox, Hib and pneumococcal disease, are agency rules, not laws any legislator voted for. New York removed its religious exemption in 2019 while keeping a medical one, and has fined Amish schools $118,000; the Amish argue a law that singles out religious objectors is not neutral. The Supreme Court stayed OSHA's vaccine-or-test rule for 80 million workers because no agency may make that call without Congress.",
      proponent_rebuttal:
        "Requirements have been constitutional bedrock since Jacobson v. Massachusetts (1905), and the courts have kept drawing the line in the same place: on remand in June 2026 the Second Circuit again upheld New York's removal of the religious exemption, finding the rule 'does not require them to affirm any belief'. The OSHA ruling limited which body may act, and the Supreme Court upheld the federal health-worker mandate the same day. A child in kindergarten cannot consent or refuse, and the children who rely on herd protection, infants and those in cancer treatment, have no exemption to claim. Doctors at Florida's hearing put it plainly: 'These four vaccines were not selected because the evidence changed.'",
      crux: {
        id: "exemption-outbreak-test",
        title: "The Exemption and Outbreak Test",
        question:
          "Do schools that allow non-medical exemptions get more outbreaks, and should a parent's objection outweigh that?",
        description:
          "Part of this is measurable: whether schools and counties with more non-medical exemptions have larger and more frequent outbreaks of measles, chickenpox and other preventable diseases. Part is a value fork no data settles: how much added risk to other children justifies overriding a parent's sincere objection, and whether legislatures, health departments or courts should draw that line.",
        methodology:
          "Link school-level exemption rates to outbreak size and frequency, comparing states before and after they add or remove non-medical exemptions (California 2016, New York 2019, Florida if its rule takes effect) against matched states that changed nothing. Track Florida's chickenpox, hepatitis B, Hib and pneumococcal cases in the years after any repeal.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "County-level opt-out rates linked to measles and chickenpox case counts in states that loosened or tightened their rules, set against matched states, and Florida's Hib and pneumococcal cases after any repeal. How much added risk to other children a family's belief may impose is a value judgment those counts inform but do not settle.",
        },
        cost_to_verify: "$100K (linking public exemption data to state outbreak surveillance)",
        falsification: {
          supporter_flip:
            "If states that restore religious or personal exemptions, or Florida after a repeal, saw no rise in exemptions or outbreaks against matched states, the public-safety case for overriding parents' objections would weaken.",
          skeptic_flip:
            "If outbreaks kept clustering in schools and counties with high exemption rates, and Florida's chickenpox and Hib cases rose after a repeal, the claim that parental choice carries no cost to other children would fail, leaving only the question of how much cost is acceptable.",
          common_ground:
            "Both sides agree courts have upheld properly scoped mandates (Jacobson in 1905, the health-worker rule in 2022) while blocking overbroad ones like OSHA's, and that medical exemptions should exist.",
          live_disagreement:
            "Whether a parent's religious or personal objection should exempt a child from school requirements, and whether legislatures, health departments or courts should decide.",
        },
      },
      evidence: [
        {
          id: "jacobson",
          title: "Supreme Court upheld compulsory vaccination in Jacobson v. Massachusetts (1905)",
          description:
            "In Jacobson v. Massachusetts (1905), the US Supreme Court ruled 7–2 that a state could compel smallpox vaccination under its police power, holding individual liberty may be reasonably constrained for public health so long as the measure is not arbitrary or oppressive. It is the foundational US precedent for vaccine mandates.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          source:
            "Jacobson v. Massachusetts, 197 U.S. 11 (1905), US Supreme Court opinion (Justia)",
          sourceUrl: "https://supreme.justia.com/cases/federal/us/197/11/",
          reasoning:
            "A primary legal source establishing that government vaccine mandates can be lawful. It settles legality, not wisdom, and it predates modern free-exercise doctrine, which is where the current challenges press.",
        },
        {
          id: "miller-second-circuit-2026",
          title: "Second Circuit again upheld New York's end of religious exemptions after a Supreme Court remand (June 2026)",
          description:
            "New York removed the religious exemption to school vaccine requirements in 2019 and fined three Amish schools $118,000 in 2022. After the Supreme Court sent Miller v. McDonald back for reconsideration in light of Mahmoud v. Taylor (2025), which recognised parents' right to opt children out of some school instruction, the Second Circuit ruled for the state again in June 2026, holding that Mahmoud did not apply because the requirement 'does not require them to affirm any belief' and 'does not regulate what children are taught'. The Amish are asking the Supreme Court to review the case a second time, arguing the law singles out religious objectors while keeping a medical exemption.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source:
            "Reason, 'New York is fining Amish schools over vaccines, so the Amish are asking the Supreme Court for help' (8 October 2026)",
          sourceUrl:
            "https://reason.com/2026/10/08/new-york-is-fining-amish-schools-over-vaccines-so-the-amish-are-asking-the-supreme-court-for-help/",
          reasoning:
            "The most recent appellate ruling on whether a state may refuse religious exemptions, and it held that it may. The Supreme Court has sent the case back once and may take it, so the legal ground is less settled than Jacobson alone suggests.",
        },
        {
          id: "florida-repeal-four-vaccines-2026",
          title: "Florida's health department moved to drop four vaccines from school requirements, citing parents' rights (October 2026)",
          description:
            "Florida's Department of Health has proposed repealing school and daycare requirements for hepatitis B, chickenpox, Hib and pneumococcal conjugate vaccines, which are agency rules it can change itself; measles, polio, diphtheria and tetanus requirements are in state law and would need the Legislature. No legislator filed a bill to end all mandates in the 2026 sessions, and a bill expanding exemptions passed the Senate but failed in the House. At an October 9 hearing Surgeon General Joseph Ladapo argued for 'a public health system where parents are actively making decisions'; Dr Sarah Nosal of the American Academy of Family Physicians replied that 'these four vaccines were not selected because the evidence changed.'",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source:
            "Ana Goñi-Lessan, News Service of Florida via WLRN, 'Activists, doctors clash over Florida's proposal to repeal four school vaccine requirements' (9 October 2026)",
          sourceUrl:
            "https://www.wlrn.org/health/2026-10-09/activists-doctors-clash-over-floridas-proposal-to-repeal-four-school-vaccine-requirements",
          reasoning:
            "The clearest current statement of the parental-choice case from a state official, and a policy change that will produce data on what happens when requirements are dropped. It is a values argument, not evidence that the vaccines are unneeded, and the rule is not final.",
        },
        {
          id: "nfib-osha",
          title: "Supreme Court stayed OSHA's vaccine-or-test rule for 80 million workers; OSHA withdrew it (January 2022)",
          description:
            "In NFIB v. OSHA (2022), the Supreme Court stayed, 6–3, OSHA's vaccine-or-test rule for employers with 100 or more workers (more than 80 million employees), holding that OSHA may regulate occupational hazards but not the broad public-health risks of daily life without clear congressional authorisation. The stay (13 January 2022) was not a final merits ruling; OSHA withdrew the rule as an enforceable standard on 26 January 2022. The same day as the stay, the Court let the federal mandate for health-care workers take effect.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 5,
          },
          source:
            "National Federation of Independent Business v. OSHA, 595 U.S. ___ (2022), US Supreme Court per curiam (Justia)",
          sourceUrl: "https://supreme.justia.com/cases/federal/us/595/21a244/",
          reasoning:
            "A primary legal source setting real limits on who may impose a mandate. It constrains which body acts rather than holding mandates unjustified, since the Court upheld the narrower health-worker rule the same day.",
        },
      ],
    },
  ],
  aliases: [
    "Are government vaccine mandates a justified public-health measure?",
    "Are government vaccine mandates justified?",
    "School vaccination requirements",
    "Required childhood immunizations",
    "No jab, no job",
    "Should parents be able to opt out of school vaccines?",
  ],
};
