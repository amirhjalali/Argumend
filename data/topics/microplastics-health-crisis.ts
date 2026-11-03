export const microplasticsHealthCrisisData = {
  id: "microplastics-health-crisis",
  title: "Microplastics in Our Bodies",
  question: "Are the microplastics in our bodies making us sick?",
  // Words readers use for this question that the map's own text does not.
  aliases: [
    "Are microplastics in our bodies a health crisis on the scale of lead?",
    "Is there a spoonful of plastic in my brain?",
    "Do microplastics cause heart attacks?",
  ],
  meta_claim:
    "Microplastic and nanoplastic contamination of human blood, organs, and placentas represents a major emerging public health crisis comparable to lead exposure, not merely an environmental nuisance.",
  status: "contested" as const,
  category: "science" as const,
  // As of 3 November 2026: the 2024 NEJM plaque study and the 2025 Nature
  // Medicine brain study remain the headline human findings; a January 2025
  // validation study found the method most of them use unreliable for
  // polyethylene and PVC in blood; the EU banned BPA in food-contact
  // materials in December 2024.
  last_updated: "2026-11-03",
  tags: ["microplastics", "plastics", "environmental-health", "cardiovascular", "chemicals"],
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "Labs have reported plastic particles in human blood, placentas, artery plaque and brains. In a 2024 New England Journal of Medicine study of 257 surgery patients, those with plastic in their neck-artery plaque had 4.5 times the rate of heart attack, stroke or death over about three years. But a 2025 validation study found that the instrument most of these studies rely on can mistake substances in blood for polyethylene, the plastic most often reported. The fight is over how much plastic is really inside us, and whether it does harm.",
    confidence: 85,
    source:
      "Marfella et al., New England Journal of Medicine 390(10):900-910 (7 March 2024); Rauert et al., Environmental Science & Technology 59(4):1984-1994 (24 January 2025)",
    sourceUrl: "https://www.nejm.org/doi/full/10.1056/NEJMoa2309822",
  },
  simple_case: [
    "The answer shapes whether governments cap plastic production or ban plastic food packaging, what a UN plastics treaty covers, and whether a water filter or glass containers are worth your money.",
    "The two sides split over how much of the plastic reported in human tissue is really there, whether it causes disease or collects in tissue that was already diseased, and whether to act before harm in people is shown.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: How much plastic is really in us? (what we know)
    // =========================================================================
    {
      id: "bioaccumulation-evidence",
      title: "How Much Plastic Is Really in Us?",
      short_summary:
        "Studies since 2021 report plastic in blood, placentas, livers, kidneys and brains, with brain levels rising between 2016 and 2024. Most of these numbers come from one technique, which burns a tissue sample and reads the fragments. A 2025 test of that technique on human blood concluded it 'is currently not a suitable analysis method' for polyethylene and PVC, the two plastics the headline studies report most.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "The striking concentrations come mostly from pyrolysis-gas chromatography-mass spectrometry, which heats tissue until it breaks into fragments and matches them to plastics. Natural molecules in tissue can break into the same fragments. When Rauert and colleagues tested the method on human blood in 2025, components of blood produced false positives for polyethylene and PVC; a cleanup protocol reduced but did not remove the polyethylene interference, realistic detection limits were up to 20 times higher than in clean water, and in a pilot of Australian blood samples no other polymer rose above detection limits. They concluded the method 'is currently not a suitable analysis method for PE and PVC in biological matrices.' Polyethylene is the main polymer reported in the brain study, the placenta study and the artery-plaque study. The first blood study tested 22 people. None of this proves there is no plastic in us; it means the amounts, and the headlines built on them, are not yet trustworthy.",
      proponent_rebuttal:
        "Plastic in human tissue is not one lab's artifact. Different groups, using different methods, have found it in blood, placentas, livers, kidneys and brains. The artery-plaque study used three methods, pyrolysis-GC-MS, stable isotope analysis and electron microscopy, the last of which images particles directly. The brain study also used several complementary methods and found mostly nanoscale, shard-like fragments, with concentrations rising between 2016 and 2024 in both liver and brain. The placenta study found plastic in all 62 samples, from 6.5 to 685 micrograms per gram. A method problem argues for better methods, not for assuming the true amount is zero. And the world has produced 8,300 million tonnes of plastic and recycled about 9% of the waste, so it would be stranger if none were inside us.",
      crux: {
        id: "tissue-measurement-validity",
        title: "The Blank-Sample Test",
        question:
          "Do reported plastic levels in human blood, placentas and brains hold up under blank controls and a second method?",
        description:
          "If the reported amounts survive procedural blanks, gloves and equipment checked for shedding, and confirmation by a method that sees particles directly, the exposure is real and large enough to take seriously. If they shrink sharply, many headline numbers were measurement artifacts, and the health question starts again from much lower doses.",
        methodology:
          "Send split tissue samples, plus blanks spiked with known plastics and blanks with none, blind to several independent labs. Each runs pyrolysis-GC-MS with a lipid-removal step and a second method that identifies individual particles (Raman or infrared microscopy, electron microscopy). Report recovery rates, detection limits in tissue rather than water, and agreement between labs and methods.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A blinded inter-lab study of split human tissue samples with procedural blanks and spiked controls, measured by pyrolysis-GC-MS after lipid removal and by a particle-imaging method, reporting how far the labs and methods agree.",
        },
        cost_to_verify:
          "$1-3M (a blinded ring trial across five to ten laboratories)",
        falsification: {
          supporter_flip:
            "If a blinded inter-lab study found brain and placenta polyethylene mostly vanished once lipids were removed and blanks subtracted, the case for a body-wide plastic burden would shrink to far smaller amounts.",
          skeptic_flip:
            "If independent labs agreed within a factor of two on split samples, with particles confirmed by imaging and blanks near zero, 'measurement artifact' would no longer explain the findings.",
          common_ground:
            "Both sides agree some plastic reaches human tissue, that the smallest particles are the hardest to measure, and that methods for measuring them in tissue are not standardised.",
          live_disagreement:
            "How much of the reported plastic in tissue is real, and how much comes from interference and contamination in the lab.",
        },
      },
      evidence: [
        {
          id: "contamination-methodology-concerns",
          title:
            "Rauert 2025: pyrolysis-GC-MS 'currently not a suitable' method for polyethylene and PVC in human blood",
          description:
            "Rauert, Thomas and colleagues (Environmental Science & Technology, 24 January 2025) tested pyrolysis-gas chromatography-mass spectrometry on human blood. They developed an extraction protocol that 'reduced matrix interferences (false positives) of polyethylene (PE) and polyvinyl chloride (PVC).' Realistic detection limits were 'up to 20 times higher' than those calculated in clean water. In a pilot of Australian blood, 'PE interferences were reduced but still present, and no other polymers were above detection limits.' They concluded that 'Py-GC-MS is currently not a suitable analysis method for PE and PVC in biological matrices.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source:
            "Rauert, Charlton, Bagley, Dunlop, Symeonides & Thomas, 'Assessing the Efficacy of Pyrolysis-Gas Chromatography-Mass Spectrometry for Nanoplastic and Microplastic Analysis in Human Blood', Environmental Science & Technology 59(4):1984-1994 (2025)",
          sourceUrl: "https://doi.org/10.1021/acs.est.4c12599",
          reasoning:
            "A method-validation study is the right evidence for judging how far tissue numbers can be trusted, and its authors study plastics and health rather than work for industry. It tested blood, not brain or plaque, and other methods have seen particles directly, so it questions the amounts, not the presence. Directness is 7.",
        },
        {
          id: "brain-microplastics-2025",
          title:
            "Nature Medicine 2025: plastic, mostly polyethylene, in human brains, rising 2016-2024 and higher with dementia",
          description:
            "Nihart, Campen and colleagues (Nature Medicine, published 3 February 2025) analysed kidney, liver and brain tissue from people who died between 2016 and 2024, using several complementary methods. Brain tissue held a higher proportion of polyethylene than liver or kidney, mostly as nanoscale, shard-like fragments. Concentrations rose with later year of death in both liver and brain, and were not explained by age, sex, race or cause of death. Brains of people with a documented dementia diagnosis held even more, with deposits in blood-vessel walls and immune cells. An erratum to the paper was published in April 2025.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 4,
            directness: 4,
          },
          source:
            "Nihart et al., 'Bioaccumulation of microplastics in decedent human brains', Nature Medicine 31(4):1114-1119 (2025); erratum 31(4):1367",
          sourceUrl: "https://doi.org/10.1038/s41591-024-03453-1",
          reasoning:
            "The finding behind the 'spoonful in your brain' headlines, and the rising trend is a real signal if the numbers hold. Replicability is 4: the main polymer is polyethylene, the one the Rauert study found hardest to measure, and no independent lab has repeated it. The dementia link may run backwards, since a damaged brain may clear particles less well, so directness for harm is 4.",
        },
        {
          id: "placental-microplastics",
          title:
            "Toxicological Sciences 2024: plastic in all 62 placentas tested, 6.5 to 685 micrograms per gram",
          description:
            "Garcia, Campen and colleagues measured micro- and nanoplastics in 62 human placentas by pyrolysis-GC-MS after dissolving the tissue and spinning out particles (Toxicological Sciences, 15 February 2024). Every placenta contained plastic, at 6.5 to 685 micrograms per gram (mean 126.8). Polyethylene made up 54% of the plastic by weight.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 4,
          },
          source:
            "Garcia et al., 'Quantitation and identification of microplastics accumulation in human placental specimens using pyrolysis gas chromatography mass spectrometry', Toxicological Sciences (2024)",
          sourceUrl: "https://doi.org/10.1093/toxsci/kfae021",
          reasoning:
            "Universal detection in placentas raises the question of exposure before birth. It rests on the same pyrolysis method, with polyethylene the main polymer, so replicability is 5; and finding plastic says nothing yet about harm to the baby, so directness is 4.",
        },
        {
          id: "blood-contamination-study",
          title:
            "Environment International 2022: plastic particles averaging 1.6 micrograms per millilitre in the blood of 22 donors",
          description:
            "Leslie and colleagues at Vrije Universiteit Amsterdam (Environment International, 24 March 2022) reported the first measurement of plastic particles in human blood. In 22 healthy volunteers they quantified four polymers: PET, polyethylene, polystyrene and poly(methyl methacrylate), with polystyrene the most widely found. The mean concentration of quantifiable plastic was 1.6 micrograms per millilitre.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 4,
          },
          source:
            "Leslie et al., 'Discovery and quantification of plastic particle pollution in human blood', Environment International 163 (2022)",
          sourceUrl:
            "https://www.sciencedirect.com/science/article/pii/S0160412022001258",
          reasoning:
            "Plastic circulating in blood is how particles could reach organs. Twenty-two people is a small sample, the authors themselves stress it, and the later Rauert validation found blood itself can mimic polyethylene, so replicability is 5.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Is it making us sick? (mechanisms and harm)
    // =========================================================================
    {
      id: "cardiovascular-harm",
      title: "Is It Making Us Sick?",
      short_summary:
        "The strongest human evidence is one 2024 study linking plastic in artery plaque to heart attacks, strokes and deaths. It was observational, so it cannot show the plastic caused them. Plastics also carry chemicals such as phthalates and BPA that disrupt hormones in animals, and the EU banned BPA in food packaging in December 2024. WHO said in 2019 that microplastics in drinking water did not appear to pose a risk at the levels then known.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "One observational study is not a health crisis. In the NEJM plaque study, the patients whose plaque contained plastic may have differed in other ways, such as smoking, diet, income or job, that also drive heart disease, and plastic may lodge in diseased tissue rather than cause the disease. No study has yet shown that people with more plastic in them develop more disease when followed forward from good health. The hormone evidence is mostly about chemical additives, not particles, and comes largely from animal studies: NIEHS's review of 'phthalate syndrome' in rats notes that no cause-and-effect link has been shown in people. When WHO reviewed the evidence in 2019 it said 'microplastics in drinking water don't appear to pose a health risk at current levels', and that particles larger than 150 micrometres are not likely to be absorbed.",
      proponent_rebuttal:
        "The NEJM study is the first to tie plastic in human tissue to hard outcomes, and the effect was large: a hazard ratio of 4.53 (95% CI 2.00-10.27) over about 34 months in 257 patients, with particles also examined by electron microscopy. That is the kind of signal that, for lead, asbestos and tobacco, came years before mechanisms were nailed down. The chemicals plastics carry are known endocrine disruptors: in rats, prenatal exposure to three common phthalates cuts fetal testosterone and causes malformed genitals, undescended testes and testicular injury, and the same phthalates' metabolites turn up in the blood of children and in amniotic fluid. WHO's 2019 reassurance came with the caveats that 'the data is extremely limited' and that the smallest particles may be absorbed more, and it predates every tissue study on this map.",
      crux: {
        id: "microplastic-cardiovascular-causation",
        title: "The Cause-or-Bystander Test",
        question:
          "Do people with more plastic in their blood go on to have more heart attacks and strokes than similar people with less?",
        description:
          "The plaque study measured plastic in arteries that were already diseased enough to need surgery. If plastic drives inflammation and plaque growth, people who carry more of it while healthy should fare worse years later. If it only collects in damaged tissue, they should not.",
        methodology:
          "Measure plastic in stored blood samples from a large cohort of initially healthy adults, using validated methods with blanks, and follow cardiovascular events over ten years, adjusting for smoking, income, diet and occupation. In parallel, expose animals to realistic doses and sizes of common polymers and measure arterial inflammation and plaque growth against unexposed controls.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A prospective cohort of 5,000+ healthy adults with baseline microplastic blood levels, followed for ten years with coronary CT and inflammation markers, plus animal studies at environmentally relevant doses.",
        },
        cost_to_verify:
          "$15-30M (prospective cohort using stored samples plus parallel animal studies)",
        falsification: {
          supporter_flip:
            "If a large cohort found that healthy adults with more plastic in their blood had no more heart attacks or strokes over ten years, the NEJM link would look like plastic collecting in diseased arteries, not causing disease.",
          skeptic_flip:
            "If such a cohort found more heart attacks and strokes with higher baseline plastic after adjusting for smoking and income, and animal studies at realistic doses grew plaque, 'bystander' would be hard to hold.",
          common_ground:
            "Both sides agree the strongest cardiovascular evidence so far is one observational study, and that plastics carry hormone-disrupting chemicals that harm animals at high doses.",
          live_disagreement:
            "Whether plastic in arteries drives heart disease or sits in tissue that was already diseased, and whether the chemicals plastics carry harm people at everyday doses.",
        },
      },
      evidence: [
        {
          id: "nejm-arterial-plaque-study",
          title:
            "NEJM 2024: plastic in artery plaque, 4.5 times the rate of heart attack, stroke or death over 34 months",
          description:
            "Marfella and colleagues (New England Journal of Medicine, 7 March 2024) analysed plaque removed from 304 patients having carotid surgery, using pyrolysis-GC-MS, stable isotope analysis and electron microscopy. Of the 257 who completed follow-up, 'Polyethylene was detected in carotid artery plaque of 150 patients (58.4%)' and '31 patients (12.1%) also had measurable amounts of polyvinyl chloride.' Over a mean of 33.7 months, those with detectable plastic had a higher risk of heart attack, stroke or death from any cause (hazard ratio 4.53; 95% CI 2.00 to 10.27; P<0.001).",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 4,
            directness: 7,
          },
          source:
            "Marfella et al., 'Microplastics and Nanoplastics in Atheromas and Cardiovascular Events', New England Journal of Medicine 390(10):900-910 (2024)",
          sourceUrl: "https://www.nejm.org/doi/full/10.1056/NEJMoa2309822",
          reasoning:
            "The only study tying plastic in human tissue to clinical outcomes, in a top journal, with particles seen by electron microscopy. It is observational, in patients already sick enough for surgery, and polyethylene was measured by the method Rauert found unreliable in blood. It has not been replicated, so replicability is 4.",
        },
        {
          id: "phthalate-syndrome-animals",
          title:
            "NIEHS review 2006: prenatal phthalate exposure cuts fetal testosterone and malforms male rats' genitals",
          description:
            "Paul Foster of the National Institute of Environmental Health Sciences reviewed studies of male rats exposed in the womb to di-butyl, di-(2-ethylhexyl) and butyl benzyl phthalate, plasticisers used in many plastics (International Journal of Andrology, 2006). They developed malformed reproductive organs, hypospadias, undescended testes, testicular injury, retained nipples and shorter anogenital distance, because fetal testosterone production fell. The review notes the findings parallel human testicular dysgenesis syndrome but that no cause-and-effect relationship has been established in people, and that phthalate metabolites are found in the general population, children and amniotic fluid.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 4,
          },
          source:
            "Foster, 'Disruption of reproductive development in male rat offspring following in utero exposure to phthalate esters', International Journal of Andrology (2006)",
          sourceUrl: "https://doi.org/10.1111/j.1365-2605.2005.00563.x",
          reasoning:
            "A well-replicated mechanism for how chemicals in plastic can harm development. Directness is 4: these are additives rather than particles, the doses are animal doses, and the review itself says no cause-and-effect link has been shown in humans.",
        },
        {
          id: "who-drinking-water-assessment",
          title:
            "WHO 2019: microplastics in drinking water 'don't appear to pose a health risk at current levels'",
          description:
            "Announcing its review 'Microplastics in drinking-water' on 22 August 2019, WHO said that 'Based on the limited information we have, microplastics in drinking water don't appear to pose a health risk at current levels. But we need to find out more.' It said microplastics larger than 150 micrometres 'are not likely to be absorbed in the human body', that absorption of the smallest, nano-sized particles 'may, however, be higher', and that 'the data is extremely limited.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 5,
            directness: 5,
          },
          source:
            "World Health Organization, 'WHO calls for more research into microplastics and a crackdown on plastic pollution' (22 August 2019), on its report 'Microplastics in drinking-water'",
          sourceUrl:
            "https://www.who.int/news/item/22-08-2019-who-calls-for-more-research-into-microplastics-and-a-crackdown-on-plastic-pollution",
          reasoning:
            "The global health authority's most direct statement on risk, and it is reassuring. It is seven years old, covers drinking water only, predates the tissue and plaque studies, and comes with WHO's own warning that the data were very limited, so replicability and directness are 5.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Act now or wait for proof? (values and trade-offs)
    // =========================================================================
    {
      id: "regulatory-failure",
      title: "Act Now or Wait for Proof?",
      short_summary:
        "Plastic production keeps growing and only about 9% of plastic waste has ever been recycled. Advocates say waiting for proof repeats the lead story, and point to an industry that promoted recycling while privately doubting it. Skeptics say restrictions on an essential material should wait for evidence that today's exposures cause harm. Regulators have so far acted on specific chemicals such as BPA, not on particles.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Plastic keeps food safe, makes medical equipment sterile, carries clean water and makes cars lighter, and its cheapest uses matter most in poor countries. Caps on production or broad bans would cost a great deal, and substitutes carry their own risks: when manufacturers dropped BPA, many switched to related bisphenols that are less studied. WHO's 2022 review of eating and breathing in plastic particles set out research needs 'to address current uncertainties' rather than calling for restrictions. The measurement problems on this map mean nobody yet knows how much plastic people carry, let alone what dose harms them, so there is no basis for setting a safe level. Regulators have acted where the evidence is specific: the EU banned BPA in food-contact materials in December 2024. That is precaution aimed at a known hazard, which is how the system is meant to work.",
      proponent_rebuttal:
        "Waiting for certainty is a choice with a cost, and the plastics industry has shown why its reassurances need checking. NPR and PBS Frontline found industry documents from the 1970s doubting that plastic recycling could 'ever be made viable on an economic basis', followed by campaigns promoting it; under a tenth of plastic has ever been recycled. Of the 8,300 million tonnes produced by 2015, about 79% of the waste sits in landfills or the environment, and analysts expect production to roughly triple by 2050. At the UN treaty talks in Geneva in August 2025, at least 234 fossil-fuel and chemical-industry lobbyists registered, more than the EU and its 27 member states' delegations combined. Lead, asbestos and tobacco each had decades of 'more research needed' while exposure grew. Particles that do not break down and keep accumulating are the case where acting early is cheapest.",
      crux: {
        id: "precaution-before-proof",
        title: "The Precaution Question",
        question:
          "Should governments cut plastic production and plastic food packaging now, before harm in people is proven?",
        description:
          "Part of this turns on facts still missing, such as how much plastic people carry and whether it harms them. Part turns on values no study settles: how much cost to accept to avoid a harm that may or may not be real, and who should carry the burden of proof for a material that does not break down.",
        methodology:
          "Separate the two. Empirically: measure whether cutting exposure (glass and steel food containers, filtered water, less synthetic clothing) lowers validated blood or tissue levels, and price the main restriction options. Then state the value choice openly: what level of uncertain risk justifies what cost, and whether manufacturers should have to show safety before scale-up.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Trials testing whether cutting exposure (glass food containers, filtered water) lowers validated blood plastic levels, and a prospective cohort tying those levels to disease; how much uncertain risk justifies restricting a useful material is a value each side should state up front.",
        },
        cost_to_verify:
          "$2-5M for exposure-reduction trials; the threshold for acting is a value choice each side states",
        falsification: {
          supporter_flip:
            "If validated studies found plastic levels in people far lower than reported and stable over time, and animal studies at those levels found no harm, the case for cutting production on health grounds would lose most of its force.",
          skeptic_flip:
            "If validated studies confirmed plastic in tissue rising year on year and a prospective cohort tied it to disease, waiting for further proof would be hard to justify for a material that does not break down.",
          common_ground:
            "Both sides agree plastic production is growing, that little plastic is recycled, and that specific hazardous additives such as BPA can be regulated on their own.",
          live_disagreement:
            "Whether uncertain harm from particles that keep accumulating justifies costly cuts now, and who should have to prove safety.",
        },
      },
      evidence: [
        {
          id: "plastic-production-scale",
          title:
            "Science Advances 2017: 8,300 million tonnes of plastic made; about 9% of the waste recycled, 79% in landfills or the environment",
          description:
            "Geyer, Jambeck and Law estimated that 8,300 million metric tons of virgin plastic had been produced by 2015. Of the plastic waste generated, about 9% had been recycled, 12% incinerated and 79% accumulated in landfills or the natural environment. On current trends, roughly 12,000 million tonnes of plastic waste would be in landfills or the environment by 2050.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 4,
          },
          source:
            "Geyer, Jambeck & Law, 'Production, use, and fate of all plastics ever made', Science Advances 3(7) (2017)",
          sourceUrl: "https://www.science.org/doi/10.1126/sciadv.1700782",
          reasoning:
            "The scale of the material that ends up as particles is not disputed. Directness is 4 because volume shows exposure is large and growing, not that the exposure harms people.",
        },
        {
          id: "industry-recycling-deception",
          title:
            "NPR/Frontline 2020: plastics industry documents doubted recycling was viable in the 1970s while campaigns promoted it",
          description:
            "NPR and PBS Frontline reported in September 2020 that a 1974 industry speech said 'There is serious doubt that [recycling plastic] can ever be made viable on an economic basis', and a 1973 report called sorting plastic 'infeasible'. Former officials said the industry chose to 'advertise our way out of it'; a 1993 industry report said the recycling code was 'being misused' as 'a green marketing tool'. Under one-tenth of plastic has ever been recycled. The industry's representative said it 'has never intentionally misled the public about recycling.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 3,
          },
          source:
            "NPR, 'How Big Oil Misled The Public Into Believing Plastic Would Be Recycled' (11 September 2020), with PBS Frontline",
          sourceUrl: "https://text.npr.org/897692090",
          reasoning:
            "Internal documents are strong evidence about how far industry reassurance can be trusted, which matters when the same industry says the particles are harmless. They say nothing about whether microplastics harm health, so directness is 3.",
        },
        {
          id: "regulatory-safety-thresholds",
          title:
            "EU banned BPA in food-contact materials in December 2024 after EFSA sharply cut its safe intake",
          description:
            "The European Food Safety Authority's 2023 re-evaluation of bisphenol A significantly reduced the tolerable daily intake from the temporary level of 4 micrograms per kilogram of body weight per day it set in 2015. On 19 December 2024 the European Commission adopted a ban on BPA in food-contact materials.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source: "European Food Safety Authority, 'Bisphenols' topic page",
          sourceUrl: "https://www.efsa.europa.eu/en/topics/topic/bisphenol",
          reasoning:
            "It shows regulators can and do act on a specific plastic chemical once the evidence is specific, which supports the skeptic's case that targeted rules work without restricting plastic itself. It equally shows a chemical long called safe being reassessed, which advocates read the other way, so directness is 5.",
        },
        {
          id: "who-2022-research-needs",
          title:
            "WHO 2022 review of eating and breathing in plastic particles: research needed 'to address current uncertainties'",
          description:
            "WHO's August 2022 report 'Dietary and inhalation exposure to nano- and microplastic particles and potential implications for human health' 'identified research needs and defined the scope of future work needed on microplastic particles to address current uncertainties.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 4,
            directness: 4,
          },
          source:
            "World Health Organization, 'Dietary and inhalation exposure to nano- and microplastic particles and potential implications for human health' (30 August 2022)",
          sourceUrl: "https://www.who.int/publications/i/item/9789240054608",
          reasoning:
            "The global health authority's most recent review framed the issue as uncertainty to be studied, not a risk to be restricted. It is a statement of what is unknown rather than a finding of safety, so replicability and directness are 4.",
        },
      ],
    },
  ],
  references: [
    {
      title:
        "Microplastics and Nanoplastics in Atheromas and Cardiovascular Events — New England Journal of Medicine (2024)",
      url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2309822",
    },
    {
      title:
        "Assessing the Efficacy of Py-GC-MS for Nanoplastic and Microplastic Analysis in Human Blood — Environmental Science & Technology (2025)",
      url: "https://doi.org/10.1021/acs.est.4c12599",
    },
    {
      title: "Bioaccumulation of microplastics in decedent human brains — Nature Medicine (2025)",
      url: "https://doi.org/10.1038/s41591-024-03453-1",
    },
    {
      title: "Production, Use, and Fate of All Plastics Ever Made — Science Advances (2017)",
      url: "https://www.science.org/doi/10.1126/sciadv.1700782",
    },
    {
      title: "WHO calls for more research into microplastics — World Health Organization (2019)",
      url: "https://www.who.int/news/item/22-08-2019-who-calls-for-more-research-into-microplastics-and-a-crackdown-on-plastic-pollution",
    },
    {
      title: "INC-5.2 lobbyist analysis: at least 234 fossil fuel and chemical industry lobbyists — CIEL (7 August 2025)",
      url: "https://www.ciel.org/news/inc-5-2-lobbyist-analysis/",
    },
    {
      title:
        "Discovery and Quantification of Plastic Particle Pollution in Human Blood — Environment International (2022)",
      url: "https://www.sciencedirect.com/science/article/pii/S0160412022001258",
    },
  ],
  questions: [
    {
      id: "q1",
      title:
        "Are microplastics the new lead — a ubiquitous toxin we ignored for decades?",
      content:
        "Lead was used in paint, petrol and pipes for decades while industry questioned the harm. Microplastics share some features: exposure everywhere, an industry with a record of misleading reassurance, and early signs of harm. But lead is a single element with a measured dose-response, while plastics differ by polymer, size and additive, and the amounts in human tissue are still disputed.",
    },
    {
      id: "q2",
      title:
        "Should plastic be regulated as a health hazard rather than a waste management problem?",
      content:
        "Plastic is regulated mostly as waste, and its chemicals one at a time, as with the EU's 2024 BPA ban. Treating the particles as a health hazard would justify production caps and food-packaging bans, but would also affect medical devices, food safety and water systems, with costs that fall hardest on poorer countries.",
    },
    {
      id: "q3",
      title:
        "Can we reduce microplastic exposure meaningfully without eliminating plastic?",
      content:
        "Filters, glass containers and natural-fibre clothing may cut some exposure, but particles are also in air, food and soil. Whether individual steps lower the amount in people's blood has not been measured with validated methods, which is one of the cheapest experiments on this map.",
    },
  ],
};
