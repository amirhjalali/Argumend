import type { TopicInput } from "@/lib/schemas/topic";

const covidOriginsData: TopicInput = {
  id: "lab-leak-theory",
  title: "COVID-19 Lab Leak Origin",
  question: "Did COVID-19 come from a lab in Wuhan?",
  meta_claim:
    "SARS-CoV-2 originated from a laboratory leak at the Wuhan Institute of Virology rather than natural zoonotic spillover.",
  status: "contested" as const,
  category: "science" as const,
  // As of 3 November 2026: the CIA (January 2025, low confidence), the FBI
  // and the Department of Energy lean to a research-related origin; four
  // other US agencies and the National Intelligence Council lean to natural
  // spillover; Germany's BND rated a lab leak 80-95% likely in 2020 (reported
  // March 2025); WHO's SAGO (June 2025) found zoonosis best supported but
  // said the information needed to evaluate all hypotheses was never
  // provided; France's Académie nationale de médecine (April 2025) found the
  // lab-accident hypothesis supported by facts and arguments but not by proof,
  // and the Académie des sciences (June 2025) said the two cannot be told
  // apart; the 391 pages Tulsi Gabbard declassified in June 2026 held nothing
  // decisive on origins.
  last_updated: "2026-11-03",
  keystone_fact: {
    statement:
      "Nearly seven years on, no one has proof either way. The CIA, FBI and Department of Energy lean toward a lab accident; the National Intelligence Council and four other US agencies, and the WHO's advisory group, lean toward natural exposure to an infected animal, though that group said much of the information needed to evaluate all the hypotheses was never provided by China. No infected market animal and no lab progenitor virus has ever been found. The fight is over which story the evidence we have favours, and whether the evidence we lack would settle it.",
    confidence: 82,
    source:
      "WHO SAGO report (June 2025); CIA assessment via NBC News (January 2025); ODNI declassified report (June 2023)",
    sourceUrl:
      "https://www.who.int/news/item/27-06-2025-who-scientific-advisory-group-issues-report-on-origins-of-covid-19",
  },
  simple_case: [
    "The answer bears on which virus research is allowed and where, on how closely the live-animal trade is watched, and on how much people trust the scientists and agencies who told them in 2020 which story to believe.",
    "The two sides split over whether the outbreak starting in the lab's city is a signal or a coincidence, whether the virus's furin cleavage site could have arisen naturally, and whether the records China withholds would settle it.",
  ],
  references: [
    {
      title:
        "WHO SAGO Independent Assessment of the Origins of SARS-CoV-2 (June 2025)",
      url: "https://www.who.int/news/item/27-06-2025-who-scientific-advisory-group-issues-report-on-origins-of-covid-19",
    },
    {
      title:
        "The Huanan Seafood Wholesale Market in Wuhan was the early epicenter of the COVID-19 pandemic - Science (2022)",
      url: "https://www.science.org/doi/10.1126/science.abp8715",
    },
    {
      title:
        "Genetic tracing of market wildlife and viruses at the epicenter of the COVID-19 pandemic - Cell (2024)",
      url: "https://www.cell.com/cell/fulltext/S0092-8674(24)00901-2",
    },
    {
      title:
        "ODNI, Potential Links Between the Wuhan Institute of Virology and the Origin of the COVID-19 Pandemic (declassified June 2023)",
      url: "https://archive.dni.gov/files/ODNI/documents/assessments/Report-on-Potential-Links-Between-the-Wuhan-Institute-of-Virology-and-the-Origins-of-COVID-19-20230623.pdf",
    },
    {
      title:
        "House Select Subcommittee on the Coronavirus Pandemic - Final Report (December 2024)",
      url: "https://oversight.house.gov/release/final-report-covid-select-concludes-2-year-investigation-issues-500-page-final-report-on-lessons-learned-and-the-path-forward/",
    },
    {
      title:
        "A Critical Analysis of the Evidence for the SARS-CoV-2 Origin Hypotheses - Journal of Virology (2023)",
      url: "https://journals.asm.org/doi/10.1128/jvi.00365-23",
    },
    {
      title:
        "FBI Director Wray: bureau assesses with 'moderate confidence' a lab-incident origin most likely (CNN, Feb 2023)",
      url: "https://www.cnn.com/2023/02/28/politics/wray-fbi-covid-origins-lab-china/index.html",
    },
    {
      title:
        "NIH statement on the release of the USG Policy for Oversight of Dual Use Research of Concern and Pathogens with Enhanced Pandemic Potential (2024)",
      url: "https://www.nih.gov/about-nih/who-we-are/nih-director/statements/statement-release-usg-policy-oversight-dual-use-research-concern-pathogens-enhanced-pandemic-potential",
    },
    {
      title:
        "CIA assessment: research-related origin more likely (January 2025)",
      url: "https://www.nbcnews.com/politics/politics-news/cia-shifts-assessment-covid-origins-saying-lab-leak-likely-caused-outb-rcna189284",
    },
    {
      title: "The origins of SARS-CoV-2: A critical review - Cell (2021)",
      url: "https://doi.org/10.1016/j.cell.2021.08.017",
    },
    {
      title:
        "The Origin and Implications of the COVID-19 Pandemic: An Expert Survey - Global Catastrophic Risk Institute (February 2024)",
      url: "https://gcrinstitute.org/papers/069_covid-origin.pdf",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Why has no intermediate host been conclusively identified?",
      content:
        "Despite testing over 80,000 animal samples across China, no animal has been found carrying SARS-CoV-2 or a direct progenitor. For SARS-CoV-1, the civet intermediate host was identified within four months. For MERS, dromedary camels were confirmed within nine months. More than six years after the COVID-19 pandemic began, the intermediate host remains unknown. Does this absence of evidence constitute evidence of absence, or simply reflect insufficient sampling in a vast wildlife trade?",
    },
    {
      id: "q2",
      title:
        "Can we distinguish an engineered virus from a naturally evolved one?",
      content:
        "Modern gain-of-function techniques can introduce genetic changes that leave no obvious fingerprints. The furin cleavage site in SARS-CoV-2 is unusual for sarbecoviruses but not unprecedented across the broader coronavirus family. If a virus were passaged through humanized mice or cell cultures, the resulting adaptations could mimic natural selection. Is there any genomic signature that could definitively distinguish laboratory manipulation from natural evolution?",
    },
    {
      id: "q3",
      title:
        "What would it take to resolve this question definitively?",
      content:
        "Key evidence that could settle the debate includes: the WIV viral sequence databases that are no longer public, laboratory notebooks and biosafety logs from 2019, early patient samples and sequences (over 500 remain unpublished), complete supply-chain records for the Huanan Seafood Market, and medical records of WIV researchers who reportedly fell ill in November 2019. China has declined to share most of this data. The NDAA of 2026 mandated declassification of US intelligence on COVID-19 origins, which may reveal new details. The House Select Subcommittee obtained internal EcoHealth and NIH documents through subpoena power. But without Chinese cooperation on the most critical datasets, can declassified US intelligence and congressional investigations substitute for direct access to the WIV?",
    },
    {
      id: "q4",
      title:
        "Has the gain-of-function oversight system been reformed enough to prevent future incidents?",
      content:
        "NIH acknowledged in 2024 that oversight mechanisms failed to flag dangerous experiments at the WIV conducted with US funding. EcoHealth Alliance was debarred for compliance failures. The P3CO framework was designed to review potential pandemic pathogen research but did not catch the experiments in question. NIH has announced reforms, but critics argue the new policies still rely on self-reporting by researchers. If the oversight system that was supposed to prevent dangerous research demonstrably failed, what confidence can the public have that reformed systems will succeed, and does this failure pattern make an accidental lab origin more plausible in hindsight?",
    },
  ],
  pillars: [
    // =========================================================================
    // Pillar 1: Geographic & Institutional Coincidence
    // =========================================================================
    {
      id: "geographic-coincidence",
      title: "Market or Lab: Where Did It Start?",
      short_summary:
        "The earliest known cases cluster on the Huanan market, where swabs found virus beside raccoon-dog DNA in the wildlife stalls. The same city holds the world's largest collection of SARS-like bat viruses, 1,500 km from the bats that carry the closest known relatives. No infected market animal and no progenitor virus in the lab has turned up.",
      icon_name: "Target" as const,
      skeptic_premise:
        "The earliest known cases cluster on the market, not the lab, and the market's wildlife stalls held both the virus and animals that can carry it. Wuhan is a major city of 11 million people with extensive wildlife trade. Wet markets selling live animals are common throughout southern China, and coronaviruses circulate widely in horseshoe bat populations across Yunnan and Southeast Asia. The first SARS outbreak emerged in Guangdong, far from any BSL-4 lab. Spatial analysis of early COVID-19 cases centers them on the Huanan Seafood Market, not the WIV campus 30 km away. Raccoon dog and civet DNA was found co-located with SARS-CoV-2 RNA in market stalls. A 2025 analysis in Cell found that the bat ancestors of both SARS-CoV and SARS-CoV-2 were unlikely to have reached the cities where those viruses emerged by bat dispersal alone, which points to the wildlife trade as the carrier. The geographic coincidence with the WIV is notable but not probative, since markets with susceptible wildlife existed precisely because Wuhan is a major transport and trade hub.",
      proponent_rebuttal:
        "The pandemic began in the one city that housed the world's largest collection of SARS-like bat coronaviruses, 1,500 km from the bats that carry its closest known relatives. The WIV's collection included RaTG13 (96.2% similar to SARS-CoV-2), taken from the Mojiang mine in Yunnan. Researchers there conducted gain-of-function experiments creating chimeric coronaviruses. The WIV's viral sequence databases, public before the pandemic, are no longer accessible. US intelligence reporting described three WIV researchers who sought hospital care after falling ill in November 2019, though the declassified 2023 assessment says there is no indication any was hospitalised for COVID-consistent symptoms. No direct progenitor of SARS-CoV-2 has been found in any market animal. The probability that a novel bat coronavirus would emerge naturally in the one city housing the world's top bat coronavirus lab, rather than in Yunnan where the closest known relatives are found, demands serious investigation.",
      crux: {
        id: "wiv-database-audit",
        title: "The WIV Database Audit",
        question:
          "Is the outbreak's start in the same city as the Wuhan Institute of Virology a real signal, or coincidence?",
        description:
          "The Wuhan Institute of Virology maintained a database of viral sequences collected from years of bat coronavirus fieldwork. Those databases are no longer publicly accessible and access has never been restored. An independent audit of these records would reveal what viruses the WIV possessed and whether any were closer relatives of SARS-CoV-2 than publicly known sequences.",
        methodology:
          "Commission an independent international audit of the WIV's complete viral sample inventory, unpublished sequence data, laboratory notebooks, and biosafety incident logs from 2018-2020. Compare the full sequence library against SARS-CoV-2 to identify any closer progenitor than RaTG13. Cross-reference researcher health records with laboratory access logs.",
        verification_status: "impossible" as const,
        settle: {
          condition:
            "Independent access to the Wuhan Institute of Virology's offline sequence database, sample records and lab notebooks, searched for any virus closer to SARS-CoV-2 than those published, alongside continued sampling of wild bats and market-animal supply chains for a closer natural relative.",
        },
        cost_to_verify:
          "Requires Chinese government cooperation (currently withheld)",
        falsification: {
          supporter_flip:
            "If an independent audit of the WIV's offline database and records showed no closer progenitor than RaTG13 and no relevant unpublished work, the 'lab next door' coincidence would lose much of its force.",
          skeptic_flip:
            "If that audit revealed a SARS-CoV-2 progenitor in the WIV's collection or documentation of relevant gain-of-function work, the natural-origin default would be hard to sustain.",
          common_ground:
            "Both sides agree Wuhan has extensive wildlife trade AND houses the world's leading bat-coronavirus lab, and that the WIV's sequence databases are no longer publicly accessible.",
          live_disagreement:
            "Whether the outbreak's coincidence with the WIV is just sampling bias (Wuhan is a huge trade hub) or a meaningful signal — answerable only by data China withholds.",
        },
      },
      evidence: [
        {
          id: "huanan-market-epicenter",
          title:
            "The earliest 150 known cases cluster on the Huanan market, not the lab (Science, 2022)",
          description:
            "A 2022 study in Science by Worobey et al. mapped over 150 of the earliest reported COVID-19 cases from December 2019 and found their highest density centered on the Huanan Seafood Wholesale Market, including cases with no reported direct link to the market. Within the market, SARS-CoV-2-positive environmental samples concentrated in the southwest section where live wildlife was sold.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Science (Worobey et al., 2022)",
          sourceUrl: "https://www.science.org/doi/10.1126/science.abp8715",
          reasoning:
            "Published in a top peer-reviewed journal with detailed methodology. However, a 2024 critique in the Journal of the Royal Statistical Society challenged the statistical methods, arguing the centroid approach does not prove market origin and the Monte Carlo test was flawed. Ascertainment bias may have skewed early case locations toward the market, since that is where surveillance initially focused.",
        },
        {
          id: "raccoon-dog-dna",
          title:
            "Market swabs put SARS-CoV-2 in the same stalls as raccoon-dog DNA (Cell, 2024)",
          description:
            "Genetic analysis of environmental swabs from the Huanan market, published in Cell in 2024, found SARS-CoV-2 RNA in samples that also contained DNA from raccoon dogs, civets, and bamboo rats in the wildlife-trading section. Raccoon dogs are known to be susceptible to SARS-CoV-2 and can shed it at high titers. No bat or pangolin DNA was detected at the market.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 5,
            directness: 5,
          },
          source: "Cell (Crits-Christoph et al., 2024)",
          sourceUrl:
            "https://www.cell.com/cell/fulltext/S0092-8674(24)00901-2",
          reasoning:
            "Co-location of animal DNA and viral RNA in environmental samples shows correlation, not causation. The samples were collected in January 2020 after the market was closed and partially decontaminated. No live animal at the market was found to be infected. The sequencing data were generated in China in 2020 but these authors could only analyse them years later, in a preprint posted in September 2023, which raises the question of why they were not shared sooner.",
        },
        {
          id: "wiv-database-offline",
          title:
            "The Wuhan lab's bat-virus databases are no longer public, and access has never been restored",
          description:
            "The Wuhan Institute of Virology's databases of bat coronavirus sequences were public before the pandemic and access has never been restored; the institute has attributed the removal to hacking attempts. Reviewing the record in 2025, France's Académie nationale de médecine found that 'the blocking of access to many computer files and to frozen bat samples', together with the real absence of epidemiological surveillance data, 'confirm the lack of transparency of the Chinese authorities and raise the question of their credibility'. Without the contents, no one can say whether they held a closer relative of SARS-CoV-2 than the published sequences.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 3,
            directness: 5,
          },
          source:
            "House Select Subcommittee on the Coronavirus Pandemic (2024)",
          sourceUrl:
            "https://oversight.house.gov/release/final-report-covid-select-concludes-2-year-investigation-issues-500-page-final-report-on-lessons-learned-and-the-path-forward/",
          reasoning:
            "The timing is suspicious but circumstantial. The WIV's explanation of hacking prevention is plausible in isolation, but the refusal to restore access even after global demand undercuts that rationale. Without seeing the database contents, it is impossible to know whether it contained a closer progenitor to SARS-CoV-2. This evidence speaks to transparency failures rather than direct proof of a leak.",
        },
        {
          id: "wiv-researchers-ill",
          title:
            "US intelligence reported three Wuhan lab researchers seeking care in November 2019; ODNI found the illnesses neither support nor refute either origin",
          description:
            "In May 2021 the Wall Street Journal, and then NBC News, reported that a US intelligence report had identified three Wuhan Institute of Virology researchers who sought hospital care after falling ill in November 2019. A State Department fact sheet had said the US government had 'reason to believe' that 'several researchers inside the WIV became sick in autumn 2019' with 'symptoms consistent with both Covid-19 and common seasonal illnesses'; it did not give a number or mention hospital care. The identities of the researchers and their specific diagnoses remain classified. China has denied that any WIV staff were infected before December 2019. The declassified ODNI report of June 2023 states that several WIV researchers were ill in fall 2019 with 'symptoms consistent with but not diagnostic of COVID-19', that the IC has 'no indications that any of these researchers were hospitalized because of the symptoms consistent with COVID-19', and that one may have been hospitalised then for a non-respiratory condition.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 2,
            directness: 6,
          },
          source:
            "NBC News (24 May 2021) on the intelligence report and the State Department fact sheet; ODNI declassified report (June 2023)",
          sourceUrl:
            "https://www.nbcnews.com/health/health-news/u-s-intel-report-identified-3-wuhan-lab-researchers-who-n1268327",
          reasoning:
            "Intelligence assessments, not independently verified scientific data. Officials familiar with the intelligence expressed differing views about its strength. Symptoms of COVID-19 overlap heavily with seasonal flu and other respiratory infections. Without confirmed diagnoses, this remains suggestive but not conclusive, and the 2023 ODNI report assesses the illnesses neither support nor refute either origin hypothesis. The classified nature of the underlying intelligence prevents independent evaluation.",
        },
        {
          id: "house-subcommittee-conclusion-2024",
          title:
            "House subcommittee Republicans concluded a research-related origin was most likely; its Democrats did not (December 2024)",
          description:
            "The House Select Subcommittee on the Coronavirus Pandemic released its 520-page final report in December 2024, closing a two-year investigation. The majority report, issued by the panel's Republicans, concluded that a research-related origin was the most likely cause of the pandemic, citing the proximity of the WIV, the absence of an intermediate host, gain-of-function research conducted at the lab, and biosafety failures. The investigation obtained internal communications, subpoenaed documents from EcoHealth Alliance, and conducted over 30 transcribed interviews with key witnesses.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 5,
            directness: 5,
          },
          source:
            "House Select Subcommittee on the Coronavirus Pandemic (December 2024)",
          sourceUrl:
            "https://oversight.house.gov/release/final-report-covid-select-concludes-2-year-investigation-issues-500-page-final-report-on-lessons-learned-and-the-path-forward/",
          reasoning:
            "The investigation was thorough in scope, obtaining documents through subpoena power not available to scientific investigators. However, the Subcommittee was a political body: the conclusion is the Republican majority's, and the panel's Democrats, led by ranking member Raul Ruiz, released their own final report arguing the origins inquiry had not established how the virus emerged. The investigation surfaced valuable documentary evidence (EcoHealth communications, NIH correspondence) even if its ultimate conclusion reflects a political judgment. Independence is scored lower due to partisan dynamics.",
        },
        {
          id: "ecohealth-debarment-2024",
          title:
            "HHS debarred EcoHealth Alliance and Peter Daszak for five years over unreported work at the WIV (January 2025)",
          description:
            "On 17 January 2025 the Department of Health and Human Services formally debarred EcoHealth Alliance and its president Peter Daszak from federal funding for five years, after proposing the debarment in 2024. HHS said a period of debarment for Daszak was 'necessary to protect the Federal Government's business interests'; the congressional account cites EcoHealth conducting gain-of-function research in Wuhan without adequate oversight, failing to report experiments at the WIV, violating NIH grant requirements and filing a required report two years late. EcoHealth had served as the intermediary channelling NIH grants to the WIV for bat coronavirus research.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 4,
          },
          source:
            "House Committee on Oversight, 'HHS Formally Debars EcoHealth Alliance, Dr. Peter Daszak' (17 January 2025)",
          sourceUrl:
            "https://oversight.house.gov/release/breaking-hhs-formally-debars-ecohealth-alliance-dr-peter-daszak-after-covid-select-reveals-pandemic-era-wrongdoing/",
          reasoning:
            "The debarment is an official government action based on documented compliance failures, not speculation. It confirms that EcoHealth failed to report experiments that enhanced viral pathogenicity, which validates concerns about oversight gaps. However, the debarment addresses grant mismanagement and transparency failures, not whether a specific experiment produced SARS-CoV-2. The directness score is low because institutional misconduct does not prove a lab leak occurred.",
        },
        {
          id: "sarbecovirus-ancestors-wildlife-trade",
          title:
            "The bat ancestors of both SARS viruses were too far away to reach Wuhan or Guangzhou on their own (Cell, 2025)",
          description:
            "A 2025 study in Cell by Pekar and colleagues reconstructed the family trees of bat sarbecoviruses while accounting for recombination. It found that the closest bat ancestors of SARS-CoV and SARS-CoV-2 existed less than a decade before each virus appeared in people, that these viruses travel roughly as fast as the horseshoe bats that carry them, and that the direct ancestors of both are 'unlikely to have reached their respective sites of emergence via dispersal in the bat reservoir alone' — which the authors read as support for the wildlife trade carrying them to the cities.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "Pekar, Lytras, Ghafari et al., 'The recency and geographical origins of the bat viruses ancestral to SARS-CoV and SARS-CoV-2', Cell 188(12):3167-3183 (12 June 2025)",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/40339581/",
          reasoning:
            "A peer-reviewed phylogeographic analysis using public sequence data, so others can rerun it. It explains how a bat virus from 1,500 km away could reach Wuhan without a lab, which is the lab-leak case's strongest intuition. It does not rule out a lab route for the same journey: a lab also brings distant viruses to the city, and several of the authors had argued publicly for zoonosis before, so independence is capped.",
        },
        {
          id: "natural-spillover-precedent-no-host",
          title:
            "More than 80,000 animal samples tested, and no infected animal or progenitor virus found (as of 2025)",
          description:
            "Chinese researchers and international teams have tested over 80,000 animal samples from markets, farms, and wildlife across China without finding SARS-CoV-2 or a direct progenitor virus in any animal. By comparison, the intermediate host for SARS-CoV-1 (civet cats) was identified within four months, and MERS-CoV's reservoir (dromedary camels) within nine months. As of early 2025, over six years have elapsed without identification of the animal source. Proponents of natural origin note that SARS-CoV-1's bat reservoir was not confirmed until 2017, over a decade after the 2003 outbreak.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "Nature (multiple studies, 2020-2025); WHO SAGO (2025)",
          sourceUrl:
            "https://www.who.int/news/item/27-06-2025-who-scientific-advisory-group-issues-report-on-origins-of-covid-19",
          reasoning:
            "The failure to find the intermediate host after six years and extensive sampling is noteworthy but not dispositive. Absence of evidence is not evidence of absence, and wildlife sampling in China remains constrained by access limitations. However, the comparative speed of host identification for SARS-CoV-1 and MERS makes the prolonged failure for SARS-CoV-2 a legitimate anomaly requiring explanation. Natural origin proponents correctly note that SARS-CoV-1's ultimate bat reservoir took over a decade to find.",
        },
      ],
    },

    // =========================================================================
    // Pillar 2: The Furin Cleavage Site
    // =========================================================================
    {
      id: "furin-cleavage",
      title: "The Twelve Letters That Started the Argument",
      short_summary:
        "SARS-CoV-2 carries a 12-nucleotide insertion that makes it far better at infecting human cells, and no other sequenced SARS-like bat virus has one. A 2018 proposal from EcoHealth and the Wuhan lab planned to insert exactly such a site. Other coronavirus families acquired theirs naturally, and a 21-author review found no engineering signature in the genome.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Coronaviruses pick up furin cleavage sites on their own: MERS has one, so do HKU1 and OC43. They acquire genetic material by recombining when two viruses infect the same animal and by copying enzymes switching templates mid-strand, and a bat virus sampled in Yunnan, RmYN02, carries insertions at the very junction where SARS-CoV-2 carries its site. A 2020 analysis mapping furin recognition motifs onto the coronavirus family tree found such sites arose independently several times during coronavirus evolution. Only a few hundred bat sarbecoviruses have ever been sequenced out of an unknown number circulating, so 'no other one has it' may say more about sampling than about nature.",
      proponent_rebuttal:
        "Of every SARS-like bat virus ever sequenced, only this one has a furin cleavage site, and it is what makes the virus so good at infecting people. The 12-nucleotide insertion that encodes it is unique, and it uses a CGG-CGG codon pair for arginine that is rare in coronaviruses and common in laboratory codon optimisation. In 2018 EcoHealth Alliance asked DARPA to fund DEFUSE, a project to insert furin cleavage sites into bat coronaviruses at the WIV. DARPA refused, and nothing shows the work was not done with other money.",
      crux: {
        id: "fcs-evolutionary-analysis",
        title: "Comparative Evolutionary Analysis of the Furin Cleavage Site",
        question:
          "Could the virus's unusual furin cleavage site have arisen naturally, or does it point to engineering?",
        description:
          "Determine whether the PRRA insertion and its specific codon usage could plausibly arise through known natural evolutionary mechanisms or whether the pattern is more consistent with laboratory insertion techniques.",
        methodology:
          "Conduct comprehensive phylogenetic analysis of all known sarbecoviruses and related coronaviruses. Calculate the probability of a 12-nucleotide in-frame insertion at the S1/S2 junction arising through natural recombination vs. directed insertion. Analyze codon usage bias at the insertion site compared to the rest of the SARS-CoV-2 genome and natural sarbecovirus populations. Model evolutionary pathways that could produce the specific CGG-CGG arginine codon pair.",
        equation:
          "P(\\text{FCS}_{\\text{natural}}) = P(\\text{insertion}) \\times P(\\text{PRRA sequence}) \\times P(\\text{CGG-CGG codons} | \\text{context})",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Phylogenetic analysis across known sarbecoviruses of how a 12-nucleotide in-frame insertion at the S1/S2 junction could arise, with the PRRA site's rare CGG-CGG codons compared against codon use in natural viruses and in lab codon-optimization.",
        },
        cost_to_verify: "$100K (Bioinformatics and evolutionary analysis)",
        falsification: {
          supporter_flip:
            "If comprehensive phylogenetics showed the PRRA furin-cleavage insertion and its rare CGG-CGG codons arise readily through natural recombination — or a natural sarbecovirus with a furin cleavage site turned up — the 'unnatural insertion' argument would collapse.",
          skeptic_flip:
            "If analysis showed the specific insertion and codon usage are extremely improbable naturally and match lab codon-optimization patterns (and DEFUSE-style proposals), the natural-recombination explanation would weaken sharply.",
          common_ground:
            "Both sides agree the furin cleavage site is biologically real and important for human infection, and that bat-virus sampling is incomplete.",
          live_disagreement:
            "Whether the unique PRRA insertion (and its rare codons) falls within the range of natural coronavirus evolution or is a fingerprint of engineering.",
        },
      },
      evidence: [
        {
          id: "no-sarbecovirus-fcs",
          title:
            "Of every SARS-like bat virus sequenced, only SARS-CoV-2 has a furin cleavage site",
          description:
            "Among all characterized sarbecoviruses (the subgenus of betacoronaviruses that includes SARS-CoV and SARS-CoV-2), only SARS-CoV-2 possesses a polybasic furin cleavage site at the S1/S2 boundary. This feature is absent from RaTG13, BANAL-52 (the closest known relatives), and all other bat sarbecoviruses sampled to date. The insertion comprises 12 nucleotides encoding the PRRA amino acid sequence.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source:
            "Peacock et al., 'The furin cleavage site in the SARS-CoV-2 spike protein is required for transmission in ferrets', Nature Microbiology (2021), on the polybasic PRRAR insertion; Holmes et al., Cell (2021) on its absence in related sarbecoviruses",
          sourceUrl: "https://www.nature.com/articles/s41564-021-00908-w",
          reasoning:
            "This is an objectively verifiable genomic fact confirmed by thousands of independent sequences. However, the absence of an FCS in known sarbecoviruses does not prove it cannot arise naturally, as bat coronavirus sampling covers only a fraction of existing diversity. It does make the feature anomalous and requiring explanation.",
        },
        {
          id: "defuse-proposal",
          title:
            "The 2018 DEFUSE proposal planned to insert furin cleavage sites into bat coronaviruses at the WIV; DARPA refused to fund it",
          description:
            "In 2018, EcoHealth Alliance submitted a grant proposal called 'Project DEFUSE' to DARPA, proposing to insert furin cleavage sites into bat coronaviruses in collaboration with the Wuhan Institute of Virology and the University of North Carolina. DARPA rejected the proposal, citing gain-of-function concerns. However, no mechanism confirmed that the proposed experiments were never carried out with alternative funding. EcoHealth was later debarred by HHS for violating grant terms and failing to report dangerous experiments.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source:
            "DARPA DEFUSE proposal documents; House Select Subcommittee Report (2024)",
          sourceUrl:
            "https://oversight.house.gov/release/final-report-covid-select-concludes-2-year-investigation-issues-500-page-final-report-on-lessons-learned-and-the-path-forward/",
          reasoning:
            "The DEFUSE proposal demonstrates that researchers at the WIV had the intent, capability, and specific plan to insert furin cleavage sites into bat coronaviruses. DARPA's rejection is documented. What remains unknown is whether the experiments proceeded with other funding. The proposal's existence is a strong circumstantial link but does not prove the experiments were conducted or that SARS-CoV-2 resulted from them.",
        },
        {
          id: "fcs-in-other-coronaviruses",
          title:
            "Other coronaviruses, including MERS and HKU1, acquired furin cleavage sites naturally",
          description:
            "Multiple non-sarbecovirus coronaviruses possess furin cleavage sites acquired through natural evolution, including MERS-CoV, HCoV-HKU1 and HCoV-OC43. A 2020 analysis in Stem Cell Research mapped furin recognition motifs onto the phylogeny of coronavirus spike proteins and found that such sites 'occurred independently for multiple times in the evolution of the coronavirus family', which the authors read as support for a natural origin. The broader family shows that such acquisitions, while rare, are within these viruses' evolutionary repertoire.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 5,
          },
          source:
            "Wu & Zhao, 'Furin cleavage sites naturally occur in coronaviruses', Stem Cell Research (2020), doi:10.1016/j.scr.2020.102115",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/33340798/",
          reasoning:
            "Demonstrates that furin cleavage sites can evolve naturally in coronaviruses, weakening the argument that the feature alone proves engineering. However, the relevant comparison class is sarbecoviruses specifically, not all coronaviruses. The natural precedents come from distantly related lineages with different evolutionary histories. The directness score reflects this gap between general coronavirus biology and the specific sarbecovirus question.",
        },
        {
          id: "rmyn02-natural-s1s2-insertions",
          title:
            "A bat virus, RmYN02, carries natural insertions at the same spike junction, but not a furin site (Current Biology, 2020)",
          description:
            "RmYN02, a bat coronavirus sampled in Yunnan and described in Current Biology in 2020, carries amino-acid insertions at the S1/S2 junction of its spike protein — the same position where SARS-CoV-2 carries its furin cleavage site. RmYN02's insertions are not polybasic and do not create a functional furin cleavage site. No bat sarbecovirus sampled to date has the complete PRRAR motif.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source: "Current Biology (Zhou et al., 2020)",
          sourceUrl: "https://doi.org/10.1016/j.cub.2020.05.023",
          reasoning:
            "A sequenced natural virus with insertions at the S1/S2 junction shows that sarbecoviruses acquire material at this position without human intervention, which weakens the claim that an insertion there is itself a laboratory signature. The gap between a short non-basic insertion and the full polybasic furin cleavage site remains large, so this constrains the inference rather than closing it.",
        },
        {
          id: "cell-critical-review-2021",
          title:
            "A 21-author Cell review found the genome carries no signature of engineering (2021)",
          description:
            "A 2021 critical review in Cell by 21 virologists and evolutionary biologists examined the genomic arguments for engineering. It reported that furin cleavage sites are common in other coronavirus spike proteins, that SARS-CoV-2's version is suboptimal rather than the canonical form a designer would choose, that a near-identical nucleotide sequence to the insertion occurs in the spike gene of the bat coronavirus HKU9-1, and that the CGG codon, while rare in coronaviruses, occurs at comparable frequencies in SARS-CoV and other human coronaviruses. The authors concluded there is no evidence that SARS-CoV-2 has a laboratory origin and that a zoonotic event is the most parsimonious explanation.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "Cell (Holmes et al., 2021)",
          sourceUrl: "https://doi.org/10.1016/j.cell.2021.08.017",
          reasoning:
            "This is the most detailed published rebuttal of the codon and furin-site arguments, and its genomic claims are checkable against public sequence data. Independence is scored lower because several authors had taken public positions on origins before writing it and some had professional ties to the research field under scrutiny. It evaluates the evidence available in 2021 and does not address the records China has withheld since.",
        },
      ],
    },

    // =========================================================================
    // Pillar 3: Intelligence & Transparency Failures
    // =========================================================================
    {
      id: "intelligence-transparency",
      title: "What the Spies Say, and What China Won't",
      short_summary:
        "Three US agencies lean to a lab accident, four and the National Intelligence Council to natural exposure to an animal, nearly all at low confidence. German newspapers reported the BND put a leak at 80-95% in 2020. The WHO's panel called zoonosis best supported and said much of the information needed to evaluate every hypothesis was never provided. Hundreds of pages declassified in June 2026 settled nothing.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Intelligence assessments are judgments, not findings, and these ones are mostly hedged. The agencies that favor a lab leak express low confidence (CIA, DOE) or, in the FBI's case, moderate confidence — levels that in intelligence parlance signal evidence that is fragmentary and open to more than one reading. Four other agencies and the National Intelligence Council assessed natural spillover as more likely or remained undecided. The WHO's SAGO panel, after three years of review, concluded in June 2025 that the weight of available scientific evidence favors zoonotic spillover. A 2024 survey of 168 epidemiologists and virologists found they assessed zoonosis as 77% likely versus 21% for lab leak. The political context matters: the CIA's January 2025 reassessment was completed during a political transition, and the House Select Subcommittee's origins conclusion was issued by its Republican majority, with the panel's Democrats releasing a separate report rejecting it. The biggest release yet changed nothing: the 391 pages Tulsi Gabbard declassified on her last day as director of national intelligence in June 2026 were about Anthony Fauci's contacts with analysts, and contained no assessment that the research he funded started the pandemic.",
      proponent_rebuttal:
        "China's systematic obstruction of investigation is the most telling evidence. Beijing destroyed early viral samples, censored researchers, refused to share the WIV database, declined to provide over 500 early patient sequences, withheld Huanan market supply-chain records, and blocked independent access to WIV biosafety logs. The WHO's initial investigation in February 2021 was severely constrained; even WHO Director-General Tedros acknowledged the lab leak hypothesis required further investigation. EcoHealth Alliance was formally debarred by HHS for failing to report dangerous gain-of-function experiments at the WIV. Nor is this only an American suspicion: Germany's foreign intelligence service rated a lab leak 80-95% likely back in 2020, France's Académie nationale de médecine came to the same view in April 2025, and the SAGO panel itself said it could not evaluate the lab hypothesis because China withheld the data. Absence of evidence is not evidence of absence when the evidence is being withheld.",
      crux: {
        id: "declassification-review",
        title: "The Intelligence Declassification Review",
        question:
          "Does classified intelligence hold anything decisive, or only the ambiguous evidence already public?",
        description:
          "The National Defense Authorization Act of 2026, signed by President Trump in December 2025, mandates the Director of National Intelligence to conduct a declassification review of all COVID-19 origins intelligence and publicly release relevant information. This review could reveal the underlying data behind agency assessments, including classified State Department documents and intelligence on WIV researcher illnesses. On 18 June 2026, her last day in office, DNI Tulsi Gabbard released several hundred declassified, heavily redacted documents that she called the product of a yearlong declassification review; they centred on Anthony Fauci's contacts with intelligence officials, and fact-checkers and a Lawfare analysis found nothing in them that settles the origin question.",
        methodology:
          "Await completion of the NDAA-mandated declassification review. Evaluate the underlying intelligence sources and methods supporting each agency's assessment. Cross-reference declassified intelligence with publicly available scientific evidence. Assess whether the newly public information shifts the balance of evidence.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Release of the raw intelligence behind each agency's origin assessment, such as the reports of sick Wuhan researchers and the material behind Germany's 80-95% estimate, with redactions limited to sources and methods, reviewed by independent scientists and analysts from both sides of the debate.",
        },
        cost_to_verify:
          "$0 (Mandated by law; completion depends on executive branch compliance)",
        falsification: {
          supporter_flip:
            "If the NDAA-mandated declassification review showed the low-confidence lab-leak assessments rested on thin or politically-driven evidence, the intelligence case would weaken.",
          skeptic_flip:
            "If declassified intelligence corroborated WIV researcher illnesses in late 2019 or relevant biosafety incidents, the 'just circumstantial' dismissal of the leak hypothesis would no longer hold.",
          common_ground:
            "Both sides agree US agencies are split and mostly at 'low confidence,' and that China's lack of transparency has impeded any definitive finding.",
          live_disagreement:
            "Whether the classified intelligence, once released, contains anything decisive — or merely reflects the same fragmentary, ambiguous evidence already public.",
        },
      },
      evidence: [
        {
          id: "cia-lab-leak-assessment",
          title:
            "CIA shifted to 'research-related origin more likely', at low confidence and on no new intelligence (January 2025)",
          description:
            "In January 2025, the CIA publicly assessed that a research-related origin of the COVID-19 pandemic is more likely than a natural origin. The assessment was based on a review of existing intelligence, not new evidence. Three US agencies (CIA, FBI, DOE) now favor a lab leak, while four agencies and the NIC either favor natural origin or remain undecided. The CIA and DOE assessments are expressed with 'low confidence'; the FBI alone has stated 'moderate confidence.'",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 3,
            directness: 4,
          },
          source: "CIA via NBC News (January 2025)",
          sourceUrl:
            "https://www.nbcnews.com/politics/politics-news/cia-shifts-assessment-covid-origins-saying-lab-leak-likely-caused-outb-rcna189284",
          reasoning:
            "Intelligence assessments are not scientific evidence and rely on classified sources that cannot be independently verified. The 'low confidence' designation means analysts consider the evidence insufficient for a firm judgment. The timing during a political transition and the absence of new intelligence underlying the shift raise questions about whether analytical methods or political context drove the change. Nonetheless, having three major intelligence agencies favor lab leak is noteworthy.",
        },
        {
          id: "bnd-lab-leak-estimate",
          title:
            "Germany's foreign intelligence service rated a lab leak 80-95% likely, in 2020 (reported March 2025)",
          description:
            "Die Zeit and Süddeutsche Zeitung reported in March 2025 that Germany's Bundesnachrichtendienst assessed the lab-leak hypothesis at 80 to 95 percent probability in 2020, drawing on public data and on material from an intelligence operation codenamed 'Saaremaa' that included scientific data from Chinese research institutions, among them the Wuhan Institute of Virology. The chancellery had ordered the inquiry and was briefed on it, and the assessment was not published; Angela Merkel declined to comment and a government spokeswoman said it was good practice not to comment on intelligence work. External scientists, including Robert Koch Institute president Lars Schade and virologist Christian Drosten, were asked to examine the assessment's validity, with no final result published at the time of the reports.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 2,
            directness: 5,
          },
          source:
            "Die Zeit and Süddeutsche Zeitung (March 2025), as reported by blue News, 'Merkel and Scholz probably withheld secret corona report'",
          sourceUrl:
            "https://www.bluewin.ch/en/news/international/merkel-and-scholz-probably-withheld-secret-corona-report-li.2602919",
          reasoning:
            "A second country's intelligence service, with no stake in the US fight, reached a far more confident lab-leak estimate than any US agency. It is known only through newspaper accounts of a classified document: the underlying analysis is unpublished, the basis is partly described as public data, and German scientists were still checking it, so replicability is near zero.",
        },
        {
          id: "french-academies-2025",
          title:
            "France's medical academy found the lab hypothesis backed by arguments but not proof; its sciences academy said the two cannot be told apart (2025)",
          description:
            "The Académie nationale de médecine adopted a report on the origins of SARS-CoV-2 at its session of 1 April 2025, by 67 votes to 2 with 3 abstentions. The report says the lab-accident hypothesis 'is supported by a body of facts and arguments, without being backed by proof', citing the US House subcommittee's circumstantial case, and concludes that neither the intermediate animal nor a progenitor virus has been found in the wild and that, absent data, 'we risk never knowing the origin of the pandemic'. On 12 June 2025 the Académie des sciences associated itself with the report, stating that the lack of information 'does not allow a choice between a natural animal origin through the consumption of wild meat and a leak, in various possible forms, from a laboratory'.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 4,
            directness: 4,
          },
          source:
            "Académie nationale de médecine, Rapport 25-06, 'De l'origine du SARS-CoV-2 aux risques de zoonoses et de manipulations dangereuses de virus' (séance of 1 April 2025), rapporteur Christine Rouzioux; Académie des sciences press release (12 June 2025)",
          sourceUrl:
            "https://www.academie-medecine.fr/de-lorigine-du-sars-cov-2-aux-risques-de-zoonoses-et-de-manipulations-dangereuses-de-virus/",
          reasoning:
            "A national medical academy outside the US reading the same public evidence and giving the lab hypothesis more weight than the WHO did shows this is not only an American political quarrel. It is a members' vote on published material, not new evidence; the report itself says the origin remains an enigma and rests its lab section largely on the US congressional account, and the sister academy declined to choose, so directness is low.",
        },
        {
          id: "gabbard-release-2026",
          title:
            "391 pages declassified in June 2026 held no assessment that US-funded research started the pandemic",
          description:
            "On her last day as director of national intelligence in June 2026, Tulsi Gabbard released 67 items across 391 pages, alleging that Anthony Fauci had misled Congress about COVID's origins. An analysis in Lawfare found the documents show Fauci attending a February 2020 expert meeting, receiving a June 2021 intelligence briefing and suggesting scientists for analysts to consult, and officials declining to use him as an outside reviewer because he would be seen as conflicted. They 'do not contain an intelligence assessment concluding that Fauci-funded research sparked COVID', in the analysis's words, and do not identify an NIH-funded virus that became SARS-CoV-2. Outlets sympathetic to the release, including Fox News, noted much of the material had been in the public record for years.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 4,
          },
          source:
            "Renée DiResta, 'Tulsi Gabbard's Fauci Files Don't Prove What She Says They Prove', Lawfare (23 June 2026)",
          sourceUrl:
            "https://www.lawfaremedia.org/article/tulsi-gabbard-s-fauci-files-don-t-prove-what-she-says-they-prove",
          reasoning:
            "The largest declassification yet, pushed by officials who favour the lab hypothesis, produced no assessment supporting it, which cuts against the belief that the secret files hold a smoking gun. It is an absence, not a finding, and the review of classified holdings is not finished, so directness is low.",
        },
        {
          id: "who-sago-zoonotic-2025",
          title:
            "WHO's SAGO panel called zoonosis best supported, and said it could not assess a lab leak without China's data (June 2025)",
          description:
            "After more than three years of work, the WHO's Scientific Advisory Group for the Origins of Novel Pathogens (SAGO) issued its assessment in June 2025, concluding that the weight of available scientific evidence suggests zoonotic spillover as the most likely origin. However, SAGO explicitly stated it was unable to evaluate the lab leak hypothesis because China did not provide the necessary data, including early patient sequences, WIV biosafety records, and market supply-chain information.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 4,
            directness: 5,
          },
          source: "WHO SAGO Report (June 2025)",
          sourceUrl:
            "https://www.who.int/news/item/27-06-2025-who-scientific-advisory-group-issues-report-on-origins-of-covid-19",
          reasoning:
            "SAGO is a credible international scientific body, but its conclusion is explicitly qualified by the admission that it could not properly evaluate the competing hypothesis due to data access failures. This limits the strength of the zoonotic conclusion: it is the best-supported hypothesis given available data, but the available data is incomplete by design. Independence is scored lower because SAGO operates within the WHO framework, which has been criticized for deference to member state sensitivities.",
        },
        {
          id: "two-lineages-market",
          title:
            "Two SARS-CoV-2 lineages point to at least two separate jumps into people (Science, 2022)",
          description:
            "A 2022 Science study by Pekar and colleagues found that SARS-CoV-2 genomic diversity before February 2020 'likely comprised only two distinct viral lineages', A and B, and that phylodynamic rooting with epidemic simulations indicated they were 'the result of at least two separate cross-species transmission events into humans', the first involving lineage B around 18 November 2019 and lineage A within weeks. In 2025 the same group reported in Virus Evolution that two genomes others had put forward as an evolutionary intermediate between the lineages were instead derived from one of them, which keeps the two-introduction model standing.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source:
            "Pekar et al., 'The molecular epidemiology of multiple zoonotic origins of SARS-CoV-2', Science (2022); Pekar et al., Virus Evolution 11(1):veaf008 (2025)",
          sourceUrl:
            "https://academic.oup.com/ve/article/11/1/veaf008/8033464",
          reasoning:
            "Two independent animal-to-human introductions would support natural origin, since a lab leak would more likely produce a single introduction point. The genomic evidence is robust, publicly available, and independently reproducible. However, critics note that two lineages could also result from two separate lab exposure events or from a single leak followed by rapid diversification. The high directness score reflects that multiple independent animal-to-human transmissions are more parsimonious with natural origin.",
        },
        {
          id: "china-obstruction",
          title:
            "China withheld the early patient sequences, the market animal records and the Wuhan lab biosafety information the WHO asked for",
          description:
            "The WHO says it asked China for hundreds of early genetic sequences from people with COVID-19, more detailed information about the animals sold at markets in Wuhan, and information on work and biosafety conditions at Wuhan laboratories, and that China has not shared them with SAGO or the WHO. Its earlier investigation team, which visited in February 2021, had limited access and could not sample independently. In June 2025 Tedros said all hypotheses 'must remain on the table, including zoonotic spillover and lab leak'.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 4,
          },
          source:
            "WHO, 'WHO Scientific Advisory Group issues report on origins of COVID-19' (27 June 2025)",
          sourceUrl:
            "https://www.who.int/news/item/27-06-2025-who-scientific-advisory-group-issues-report-on-origins-of-covid-19",
          reasoning:
            "Obstruction of investigation is not direct evidence of a lab leak; authoritarian governments routinely suppress information for political reasons regardless of the underlying truth. However, the specific data withheld — early sequences, market animal records, lab biosafety information — is precisely the data that could resolve the question one way or the other. The pattern of selective transparency, sharing some market environmental data while withholding institutional records, is consistent with either covering up a lab accident or protecting state secrets unrelated to origins. Directness is scored low because obstruction itself does not indicate which hypothesis is correct.",
        },
        {
          id: "fbi-moderate-confidence-2023",
          title:
            "FBI is the only US agency at 'moderate confidence' for a lab incident (Director Wray, February 2023)",
          description:
            "In February 2023, FBI Director Christopher Wray publicly confirmed that the FBI assesses with 'moderate confidence' that the COVID-19 pandemic most likely originated from a 'potential lab incident in Wuhan.' This remained the highest confidence level expressed by any US intelligence agency favoring a lab origin (the Department of Energy reached a similar conclusion with 'low confidence'). Wray said the assessment drew on the FBI's biological-threats expertise but that the supporting details were classified. The FBI is the only agency to express 'moderate' rather than 'low' confidence in a lab origin.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 2,
            directness: 5,
          },
          source: "FBI Director Christopher Wray, via CNN (February 2023)",
          sourceUrl:
            "https://www.cnn.com/2023/02/28/politics/wray-fbi-covid-origins-lab-china/index.html",
          reasoning:
            "The FBI's 'moderate confidence' assessment is the strongest position any intelligence agency has publicly taken toward a lab origin, and the FBI has relevant expertise in biological threats. However, intelligence assessments are not peer-reviewed scientific findings, and the underlying evidence remains classified, so it cannot be independently evaluated or reproduced. 'Moderate confidence' in intelligence parlance still signals meaningful uncertainty, and the majority of the intelligence community assessed natural origin as more likely or remained undecided.",
        },
        {
          id: "wiv-bsl2-biosafety-2023",
          title:
            "ODNI: the Wuhan lab ran SARS-like coronavirus work at BSL-2, raising the risk of accidental exposure (2023)",
          description:
            "The declassified ODNI report of June 2023 states that, as of January 2019, WIV researchers performed SARS-like coronavirus experiments in BSL-2 laboratories, despite acknowledgements going back to 2017 that these viruses could directly infect humans through their spike protein. The report assesses that some WIV researchers probably did not use adequate biosafety precautions at least some of the time before the pandemic when handling SARS-like coronaviruses, which increased the risk of accidental exposure.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 4,
            directness: 4,
          },
          source:
            "ODNI, Potential Links Between the Wuhan Institute of Virology and the Origin of the COVID-19 Pandemic (June 2023)",
          sourceUrl:
            "https://archive.dni.gov/files/ODNI/documents/assessments/Report-on-Potential-Links-Between-the-Wuhan-Institute-of-Virology-and-the-Origins-of-COVID-19-20230623.pdf",
          reasoning:
            "This is a primary declassified US government document, not a press account, and the biosafety finding is stated in it directly. Its force is limited by what the same report says next: the IC knows of no specific biosafety incident at the WIV that spurred the pandemic, and the WIV's biosafety training in late 2019 appeared routine rather than a response to an incident. A raised risk of accidental exposure is not evidence that an exposure occurred.",
        },
        {
          id: "odni-2023-no-progenitor",
          title:
            "ODNI: no indication the Wuhan lab held SARS-CoV-2 or a close progenitor before the pandemic (2023)",
          description:
            "The same June 2023 ODNI report states that the Intelligence Community has no indication that the WIV's pre-pandemic research holdings included SARS-CoV-2 or a close progenitor, and no direct evidence that a specific research-related incident involving WIV personnel occurred before the pandemic. It records that almost all IC agencies assess SARS-CoV-2 was not genetically engineered, that the closest sequenced relatives (RaTG13 at 96.2% and BANAL-52 at 96.8%) are not close enough to be direct progenitors, and that the fall-2019 illnesses among WIV researchers neither support nor refute either origin hypothesis.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 4,
            directness: 5,
          },
          source:
            "ODNI, Potential Links Between the Wuhan Institute of Virology and the Origin of the COVID-19 Pandemic (June 2023)",
          sourceUrl:
            "https://archive.dni.gov/files/ODNI/documents/assessments/Report-on-Potential-Links-Between-the-Wuhan-Institute-of-Virology-and-the-Origins-of-COVID-19-20230623.pdf",
          reasoning:
            "This is the US government's own compiled account of what its intelligence does and does not show about the lab, written for public release under the COVID-19 Origin Act of 2023. It is an absence rather than a positive finding, and the report itself says it does not address the merits of the two origin hypotheses; it also notes that some WIV engineering techniques would leave no detectable trace, so 'no indication' is bounded by what the IC can see. Independence is limited because the declassification process is controlled by the executive branch.",
        },
        {
          id: "virologist-survey-zoonotic-2024",
          title:
            "168 virologists and epidemiologists put zoonosis at 77% on average, a lab accident at 21% (2024)",
          description:
            "A February 2024 expert survey by the Global Catastrophic Risk Institute and Nemesys Insights collected anonymous estimates from 168 scientists in 47 countries — 78 epidemiologists, 74 virologists and 16 biosafety or evolutionary-genetics specialists — out of 1,138 invited, a 15% response rate. Respondents put natural zoonosis at 77% likely on average (median 90%) and a research-related accident at 21%. Proponents of a lab origin note that the sample was drawn from the fields whose published literature has favoured zoonosis and did not include intelligence or biosecurity analysts; the report found no statistically significant difference in these beliefs between experts with backgrounds in epidemiology and in virology, or between those in developed and developing countries.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 5,
            directness: 3,
          },
          source:
            "Ackerman et al., The Origin and Implications of the COVID-19 Pandemic: An Expert Survey, Global Catastrophic Risk Institute Technical Report 24-1 (February 2024)",
          sourceUrl: "https://gcrinstitute.org/papers/069_covid-origin.pdf",
          reasoning:
            "Expert opinion surveys capture the state of professional consensus, which has informational value but is not itself evidence. This one is a think-tank technical report rather than a peer-reviewed paper, though it is the first systematic survey of the question and publishes its sampling frame and instrument. It is limited by a 15% response rate and by excluding researchers in countries rated 'not free', and expert consensus has historically been wrong on questions where institutional incentives aligned against uncomfortable conclusions. The directness score is low because expert opinion aggregation does not substitute for empirical evidence. The survey does demonstrate that the majority of domain experts still favor natural origin, which is worth noting even if it is not dispositive.",
        },
      ],
    },
  ],
  aliases: [
    "Did COVID-19 come from a Wuhan lab leak rather than natural spillover?",
    "Did COVID come from a lab?",
    "Where did COVID-19 come from?",
    "Was COVID-19 engineered?",
    "Is the lab leak theory true?",
  ],
};

export { covidOriginsData };
export default covidOriginsData;
