import type { Topic } from "@/lib/schemas/topic";

const covidOriginsData: Omit<Topic, "confidence_score"> = {
  id: "lab-leak-theory",
  title: "COVID-19 Lab Leak Origin",
  meta_claim:
    "SARS-CoV-2 originated from a laboratory leak at the Wuhan Institute of Virology rather than natural zoonotic spillover.",
  status: "contested" as const,
  category: "science" as const,
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
        "ODNI Declassified Assessment on COVID-19 Origins (2023, updated 2025)",
      url: "https://www.dni.gov/files/ODNI/documents/assessments/Declassified-Assessment-on-COVID-19-Origins.pdf",
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
        "Key evidence that could settle the debate includes: the WIV viral database taken offline in September 2019, laboratory notebooks and biosafety logs from 2019, early patient samples and sequences (over 500 remain unpublished), complete supply-chain records for the Huanan Seafood Market, and medical records of WIV researchers who reportedly fell ill in November 2019. China has declined to share most of this data. Is a definitive answer possible without Chinese cooperation, or must the world accept permanent uncertainty?",
    },
  ],
  pillars: [
    // =========================================================================
    // Pillar 1: Geographic & Institutional Coincidence
    // =========================================================================
    {
      id: "geographic-coincidence",
      title: "Geographic & Institutional Coincidence",
      short_summary:
        "The pandemic began in Wuhan, home to China's premier coronavirus research laboratory and the Huanan Seafood Market where wildlife was sold illegally.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Wuhan is a major city of 11 million people with extensive wildlife trade. Wet markets selling live animals are common throughout southern China, and coronaviruses circulate widely in horseshoe bat populations across Yunnan and Southeast Asia. The first SARS outbreak emerged in Guangdong, far from any BSL-4 lab. Spatial analysis of early COVID-19 cases centers them on the Huanan Seafood Market, not the WIV campus 30 km away. Raccoon dog and civet DNA was found co-located with SARS-CoV-2 RNA in market stalls. The geographic coincidence with the WIV is notable but not probative, since markets with susceptible wildlife existed precisely because Wuhan is a major transport and trade hub.",
      proponent_rebuttal:
        "The WIV housed the world's largest collection of bat coronaviruses, including RaTG13 (96.1% similar to SARS-CoV-2), collected from the Mojiang mine in Yunnan over 1,500 km away. Researchers there conducted gain-of-function experiments creating chimeric coronaviruses. The WIV's viral sequence database was taken offline in September 2019, months before the outbreak. Three WIV researchers were reportedly hospitalized with COVID-like symptoms in November 2019. No direct progenitor of SARS-CoV-2 has been found in any market animal. The probability that a novel bat coronavirus would emerge naturally in the one city housing the world's top bat coronavirus lab, rather than in Yunnan where the closest known relatives are found, demands serious investigation.",
      crux: {
        id: "wiv-database-audit",
        title: "The WIV Database Audit",
        description:
          "The Wuhan Institute of Virology maintained a database of viral sequences collected from years of bat coronavirus fieldwork. This database was taken offline in September 2019 and has never been restored to public access. An independent audit of these records would reveal what viruses the WIV possessed and whether any were closer relatives of SARS-CoV-2 than publicly known sequences.",
        methodology:
          "Commission an independent international audit of the WIV's complete viral sample inventory, unpublished sequence data, laboratory notebooks, and biosafety incident logs from 2018-2020. Compare the full sequence library against SARS-CoV-2 to identify any closer progenitor than RaTG13. Cross-reference researcher health records with laboratory access logs.",
        verification_status: "impossible" as const,
        cost_to_verify:
          "Requires Chinese government cooperation (currently withheld)",
      },
      evidence: [
        {
          id: "huanan-market-epicenter",
          title:
            "Spatial analysis centers early cases on the Huanan Seafood Market",
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
            "Raccoon dog and civet DNA found co-located with SARS-CoV-2 at market stalls",
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
            "Co-location of animal DNA and viral RNA in environmental samples shows correlation, not causation. The samples were collected in January 2020 after the market was closed and partially decontaminated. No live animal at the market was found to be infected. The underlying genetic data were withheld for over five years before publication, raising questions about why Chinese researchers did not share the data earlier.",
        },
        {
          id: "wiv-database-offline",
          title:
            "WIV took its viral sequence database offline in September 2019",
          description:
            "The Wuhan Institute of Virology removed public access to its database of bat coronavirus sequences in September 2019, approximately three months before the first recognized COVID-19 cases. Eventually all 16 virus databases managed by the WIV were taken offline. The WIV attributed this to hacking attempts but has never restored access. Thousands of samples collected under the US-funded PREDICT program remain unsequenced publicly.",
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
            "Three WIV researchers reportedly hospitalized in November 2019",
          description:
            "US intelligence identified three researchers at the Wuhan Institute of Virology who sought hospital care in November 2019 with symptoms consistent with both COVID-19 and common seasonal illness. A January 2021 State Department fact sheet confirmed this report. The identities of the researchers and their specific diagnoses remain classified. China has denied that any WIV staff were infected before December 2019.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 2,
            directness: 6,
          },
          source: "US State Department Fact Sheet (January 2021); NBC News",
          sourceUrl:
            "https://www.nbcnews.com/health/health-news/u-s-intel-report-identified-3-wuhan-lab-researchers-who-n1268327",
          reasoning:
            "Intelligence assessments, not independently verified scientific data. Officials familiar with the intelligence expressed differing views about its strength. Symptoms of COVID-19 overlap heavily with seasonal flu and other respiratory infections. Without confirmed diagnoses, this remains suggestive but not conclusive. The classified nature of the underlying intelligence prevents independent evaluation.",
        },
      ],
    },

    // =========================================================================
    // Pillar 2: The Furin Cleavage Site
    // =========================================================================
    {
      id: "furin-cleavage",
      title: "The Furin Cleavage Site",
      short_summary:
        "SARS-CoV-2 contains a furin cleavage site insertion not found in any other known sarbecovirus, making it uniquely efficient at infecting human cells.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Furin cleavage sites are found across the broader coronavirus family, including in MERS-CoV, HKU1, and several other human coronaviruses. Natural recombination and insertion events are well-documented mechanisms by which coronaviruses acquire new genetic material. The PRRA insertion at the S1/S2 boundary could arise through template-switching during replication or recombination with other viruses in a co-infected host. A 2023 Lancet Microbe analysis noted that while the FCS is unusual for sarbecoviruses, it falls within the range of natural evolutionary processes observed in the broader coronavirus family. Bat coronavirus sampling remains sparse, and the absence of an FCS in known sarbecoviruses may simply reflect incomplete sampling of bat virus diversity.",
      proponent_rebuttal:
        "No other known sarbecovirus (the subgenus containing SARS-like bat coronaviruses) possesses a furin cleavage site. The 12-nucleotide insertion encoding the PRRA amino acid sequence is unique and contains a CGG-CGG codon pair encoding arginine that is extremely rare in coronaviruses but commonly used in laboratory codon optimization. In 2018, EcoHealth Alliance submitted the DEFUSE proposal to DARPA, which explicitly proposed inserting furin cleavage sites into bat coronaviruses at the WIV. Although DARPA rejected the proposal, no evidence confirms the experiments were never conducted with other funding. The furin cleavage site is critical for SARS-CoV-2 pathogenesis in humans, as demonstrated by 2025 studies showing it reshapes the spike protein's conformational landscape to enhance receptor binding.",
      crux: {
        id: "fcs-evolutionary-analysis",
        title: "Comparative Evolutionary Analysis of the Furin Cleavage Site",
        description:
          "Determine whether the PRRA insertion and its specific codon usage could plausibly arise through known natural evolutionary mechanisms or whether the pattern is more consistent with laboratory insertion techniques.",
        methodology:
          "Conduct comprehensive phylogenetic analysis of all known sarbecoviruses and related coronaviruses. Calculate the probability of a 12-nucleotide in-frame insertion at the S1/S2 junction arising through natural recombination vs. directed insertion. Analyze codon usage bias at the insertion site compared to the rest of the SARS-CoV-2 genome and natural sarbecovirus populations. Model evolutionary pathways that could produce the specific CGG-CGG arginine codon pair.",
        equation:
          "P(\\text{FCS}_{\\text{natural}}) = P(\\text{insertion}) \\times P(\\text{PRRA sequence}) \\times P(\\text{CGG-CGG codons} | \\text{context})",
        verification_status: "verified" as const,
        cost_to_verify: "$100K (Bioinformatics and evolutionary analysis)",
      },
      evidence: [
        {
          id: "no-sarbecovirus-fcs",
          title:
            "No known sarbecovirus has a furin cleavage site except SARS-CoV-2",
          description:
            "Among all characterized sarbecoviruses (the subgenus of betacoronaviruses that includes SARS-CoV and SARS-CoV-2), only SARS-CoV-2 possesses a polybasic furin cleavage site at the S1/S2 boundary. This feature is absent from RaTG13, BANAL-52 (the closest known relatives), and all other bat sarbecoviruses sampled to date. The insertion comprises 12 nucleotides encoding the PRRA amino acid sequence.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source: "Nature Microbiology; multiple genomic studies",
          sourceUrl: "https://www.nature.com/articles/s41564-021-00908-w",
          reasoning:
            "This is an objectively verifiable genomic fact confirmed by thousands of independent sequences. However, the absence of an FCS in known sarbecoviruses does not prove it cannot arise naturally, as bat coronavirus sampling covers only a fraction of existing diversity. It does make the feature anomalous and requiring explanation.",
        },
        {
          id: "defuse-proposal",
          title:
            "DEFUSE proposal explicitly planned furin cleavage site insertion at WIV",
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
            "Furin cleavage sites exist naturally in other coronavirus lineages",
          description:
            "Multiple non-sarbecovirus coronaviruses possess furin cleavage sites acquired through natural evolution, including MERS-CoV, HKU1, and OC43. A 2020 study in Stem Cell Research documented that furin cleavage sites naturally occur in coronaviruses through recombination and insertion events. The broader coronavirus family demonstrates that such acquisitions, while rare, are within the evolutionary repertoire of these viruses.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 5,
          },
          source:
            "Stem Cell Research (Okonkwo et al., 2020); The Lancet Microbe (2023)",
          sourceUrl:
            "https://www.sciencedirect.com/science/article/pii/S1873506120304165",
          reasoning:
            "Demonstrates that furin cleavage sites can evolve naturally in coronaviruses, weakening the argument that the feature alone proves engineering. However, the relevant comparison class is sarbecoviruses specifically, not all coronaviruses. The natural precedents come from distantly related lineages with different evolutionary histories. The directness score reflects this gap between general coronavirus biology and the specific sarbecovirus question.",
        },
        {
          id: "fcs-pathogenesis-2025",
          title:
            "2025 research confirms FCS is critical for pathogenesis but not strictly required for transmission",
          description:
            "A 2025 study in the Journal of Virology demonstrated that the furin cleavage site is required for full SARS-CoV-2 pathogenesis but is not strictly necessary for viral transmission, though it significantly enhances transmission efficiency. A separate 2025 study in Protein Science showed that furin cleavage reshapes the spike protein's conformational landscape, increasing receptor binding domain accessibility. These findings underscore the FCS as a key virulence determinant.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 4,
          },
          source: "Journal of Virology (2025); Protein Science (Mani, 2025)",
          sourceUrl: "https://journals.asm.org/doi/10.1128/jvi.00467-25",
          reasoning:
            "These studies confirm the FCS is functionally important for human disease, consistent with both hypotheses. A naturally selected virus would also benefit from enhanced pathogenesis. The findings support the idea that the FCS provides a significant fitness advantage in humans, which is relevant to the engineering hypothesis (designing for human cell entry) but does not distinguish between origins. The directness score is low because functional importance does not indicate origin.",
        },
      ],
    },

    // =========================================================================
    // Pillar 3: Intelligence & Transparency Failures
    // =========================================================================
    {
      id: "intelligence-transparency",
      title: "Intelligence & Transparency Failures",
      short_summary:
        "US intelligence agencies are divided on COVID-19 origins, while China's refusal to share critical data has made a definitive determination impossible.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Intelligence agencies deal in probabilistic assessments, not scientific proof. The agencies that favor a lab leak (FBI, DOE, CIA) all express only 'low confidence' in their conclusions, which in intelligence parlance means the evidence is fragmentary and open to multiple interpretations. Four other agencies and the National Intelligence Council assessed natural spillover as more likely or remained undecided. The WHO's SAGO panel, after three years of review, concluded in June 2025 that the weight of available scientific evidence favors zoonotic spillover. A 2024 survey of 168 epidemiologists and virologists found they assessed zoonosis as 77% likely versus 21% for lab leak. The political context matters: the CIA's January 2025 reassessment was completed during a political transition, and the House Select Subcommittee was a partisan body that reached conclusions before completing its investigation.",
      proponent_rebuttal:
        "China's systematic obstruction of investigation is the most telling evidence. Beijing destroyed early viral samples, censored researchers, refused to share the WIV database, declined to provide over 500 early patient sequences, withheld Huanan market supply-chain records, and blocked independent access to WIV biosafety logs. The WHO's initial investigation in February 2021 was severely constrained; even WHO Director-General Tedros acknowledged the lab leak hypothesis required further investigation. EcoHealth Alliance was formally debarred by HHS for failing to report dangerous gain-of-function experiments at the WIV. An unpublished 2020 German Federal Intelligence Service report reportedly estimated an 80-90% probability of a lab leak. The SAGO panel itself acknowledged it could not evaluate the lab leak hypothesis because China withheld the necessary data. Absence of evidence is not evidence of absence when the evidence is being actively withheld.",
      crux: {
        id: "declassification-review",
        title: "The Intelligence Declassification Review",
        description:
          "The National Defense Authorization Act of 2026, signed by President Trump in December 2025, mandates the Director of National Intelligence to conduct a declassification review of all COVID-19 origins intelligence and publicly release relevant information. This review could reveal the underlying data behind agency assessments, including classified State Department documents and intelligence on WIV researcher illnesses.",
        methodology:
          "Await completion of the NDAA-mandated declassification review. Evaluate the underlying intelligence sources and methods supporting each agency's assessment. Cross-reference declassified intelligence with publicly available scientific evidence. Assess whether the newly public information shifts the balance of evidence.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$0 (Mandated by law; completion depends on executive branch compliance)",
      },
      evidence: [
        {
          id: "cia-lab-leak-assessment",
          title:
            "CIA assessed lab leak as 'more likely' with low confidence (January 2025)",
          description:
            "In January 2025, the CIA publicly assessed that a research-related origin of the COVID-19 pandemic is more likely than a natural origin. The assessment was based on a review of existing intelligence, not new evidence. Three US agencies (CIA, FBI, DOE) now favor a lab leak, while four agencies and the NIC either favor natural origin or remain undecided. All assessments are expressed with 'low confidence,' indicating insufficient evidence for firm conclusions.",
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
          id: "who-sago-zoonotic-2025",
          title:
            "WHO SAGO concluded zoonotic spillover most likely but evidence insufficient (June 2025)",
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
            "Two distinct SARS-CoV-2 lineages suggest multiple zoonotic spillover events",
          description:
            "Phylogenetic analysis by Pekar et al. (2022, updated through 2025) identified two distinct SARS-CoV-2 lineages (A and B) separated by characteristic mutations, with evidence that they resulted from at least two independent cross-species transmission events. All eleven sequenced genomes from humans directly associated with the Huanan market belong to lineage B. The earliest lineage A viruses were sampled slightly later. A 2025 analysis in Virus Evolution confirmed no intermediate sequences exist between the lineages, reinforcing the two-introduction model.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "Science (Pekar et al., 2022); Virus Evolution (2025)",
          sourceUrl:
            "https://academic.oup.com/ve/article/11/1/veaf008/8033464",
          reasoning:
            "Two independent zoonotic spillover events from the same market would strongly support natural origin, as a lab leak would more likely produce a single introduction point. The genomic evidence is robust, publicly available, and independently reproducible. However, critics note that two lineages could also result from two separate lab exposure events or from a single leak followed by rapid diversification. The high directness score reflects that multiple independent animal-to-human transmissions are more parsimonious with natural origin.",
        },
        {
          id: "china-obstruction",
          title:
            "China systematically blocked independent investigation of both hypotheses",
          description:
            "China has refused to provide: (1) the WIV viral sequence database taken offline September 2019; (2) over 500 early patient genetic sequences that remain unpublished; (3) complete Huanan market wildlife supply-chain records; (4) WIV laboratory notebooks and biosafety incident logs; (5) medical records of WIV staff from late 2019. The WHO's initial investigation team in February 2021 had limited access and no ability to conduct independent sampling. WHO Director-General Tedros acknowledged the investigation was insufficient. EcoHealth Alliance and the WIV were formally debarred from US federal funding in 2024-2025 for transparency failures.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 4,
          },
          source:
            "WHO SAGO (2025); House Select Subcommittee (2024); HHS debarment records",
          sourceUrl:
            "https://oversight.house.gov/release/breaking-hhs-formally-debars-ecohealth-alliance-dr-peter-daszak-after-covid-select-reveals-pandemic-era-wrongdoing/",
          reasoning:
            "Obstruction of investigation is not direct evidence of a lab leak; authoritarian governments routinely suppress information for political reasons regardless of the underlying truth. However, the specific data being withheld (WIV database, early sequences, biosafety logs) is precisely the data that could resolve the question one way or the other. The pattern of selective transparency, sharing some market environmental data while withholding institutional records, is consistent with either covering up a lab accident or protecting state secrets unrelated to origins. Directness is scored low because obstruction itself does not indicate which hypothesis is correct.",
        },
      ],
    },
  ],
};

export { covidOriginsData };
export default covidOriginsData;
