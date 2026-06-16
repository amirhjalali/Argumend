import type { Topic } from "@/lib/schemas/topic";

export const geneEditingEmbryosData = {
  id: "gene-editing-embryos",
  title: "Gene Editing Human Embryos",
  meta_claim:
    "Germline gene editing of human embryos (using CRISPR or similar) should be permitted for preventing serious genetic diseases.",
  status: "highly_speculative" as const,
  category: "science" as const,
  pillars: [
    {
      id: "medical-promise-safety",
      title: "Medical Promise vs. Safety",
      short_summary:
        "CRISPR can already treat sickle cell disease in adults (FDA-approved in 2023). It can also make off-target edits we cannot fully predict. The first gene-edited babies were born in 2018; the scientist was jailed for three years.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "He Jiankui's 2018 experiment showed the technology was used before it was ready — the intended CCR5-Δ32 edit was not faithfully reproduced (mosaicism, atypical and partial edits) and off-target risks were never independently verified. Germline changes are heritable and effectively irreversible, so any error propagates to people who could never consent — a profound problem of the rights of future generations. We do not understand gene interactions (pleiotropy, epistasis) well enough to predict downstream effects; CCR5 loss itself carries trade-offs. And for most carrier couples, preimplantation genetic testing (PGT-M) already lets unaffected embryos be selected without editing the genome at all, so the marginal benefit of editing is small relative to the risk.",
      proponent_rebuttal:
        "Heritable editing could in principle prevent Huntington's disease, sickle cell anemia, cystic fibrosis, and other serious single-gene disorders that cause immense suffering. The underlying technology is advancing fast: newer base and prime editors avoid the double-strand breaks behind much of Cas9's collateral damage, and FDA's 2023 approval of a CRISPR therapy (Casgevy) shows the chemistry can be made clinically reliable in humans. He Jiankui is best read as a warning about rogue, premature practice rather than proof the field can never be safe. The strongest case is narrow — couples for whom embryo screening cannot work (both parents affected, or a dominant de novo mutation) — where editing may be the only path to a genetically related, unaffected child.",
      crux: {
        id: "crispr-precision-threshold",
        title: "CRISPR Precision Sufficient for Germline Application",
        description:
          "Determining whether CRISPR and related gene editing tools have achieved sufficient precision (low off-target rates) to be considered safe for heritable human germline modifications.",
        methodology:
          "Whole-genome sequencing of CRISPR-edited embryos (non-implanted, research-only) using multiple editing approaches (Cas9, base editing, prime editing). Compare off-target rates to natural mutation rates. Establish a safety threshold for clinical application.",
        equation:
          "\\text{Safety Threshold: } \\frac{\\text{Off-target edits}}{\\text{Total genome}} < \\text{Natural mutation rate per generation}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$10M (Multi-center embryo editing research program)",
      },
      evidence: [
        {
          id: "he-jiankui-off-target",
          title: "He Jiankui Experiment Produced Mosaic, Non-Standard CCR5 Edits",
          description:
            "He Jiankui's 2018 experiment editing CCR5 in human embryos (resulting in twin girls Lulu and Nana) did not reproduce the protective CCR5-Δ32 deletion: Nana carried atypical deletions and Lulu was only heterozygous, so the intended HIV resistance was not established. Evidence of mosaicism and unexamined off-target risk drew near-universal condemnation. A Shenzhen court sentenced He to three years in prison and a 3 million yuan fine in December 2019 for illegal medical practice.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 9,
          },
          source: "MIT Technology Review (Regalado, 2018); Cyranoski & Ledford, Nature (2018); Shenzhen court verdict (Dec 2019)",
          sourceUrl: "https://en.wikipedia.org/wiki/He_Jiankui_affair",
          reasoning:
            "The most direct evidence of premature human germline editing. Highly informative about risks, though this was a rogue experiment with poor technique — not representative of the field's best practices. Replicability lowered: the embryos were never independently sequenced and the full data was never published, so off-target claims rest on leaked/partial reports rather than verified analysis.",
        },
        {
          id: "crispr-precision-improvement-2023",
          title: "Newer Editors (Base, Prime) Reduce Off-Target Editing vs. Original Cas9",
          description:
            "Base editing (Komor et al., Nature 2016) and prime editing (Anzalone et al., Nature 2019) avoid the double-strand breaks that drive much of Cas9's collateral damage. Subsequent whole-genome-sequencing studies in cultured human cells have reported little or no detectable guide-RNA-independent off-target mutation from prime editors, consistent with greater precision than first-generation Cas9. These remain cell-line and stem-cell findings, not whole-embryo or lifetime safety data, and editing efficiency in embryos can be low and uneven.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 6,
            directness: 5,
          },
          source: "Komor et al., Nature 2016 (base editing); Anzalone et al., Nature 2019 (prime editing); both from D. Liu lab, Broad Institute",
          sourceUrl: "https://www.nature.com/articles/s41586-019-1711-4",
          reasoning:
            "Foundational peer-reviewed work; the precision gain over Cas9 is real and directional. But the original '10-100x' and 'undetectable off-target' figures were overstated and not traceable to a single 2023 study, so the specific numbers were removed. Independence and directness lowered: the core papers come from one lab, and cell-line results don't establish safety in whole embryos over a lifetime.",
        },
        {
          id: "sickle-cell-crispr-success",
          title: "CRISPR Treatment for Sickle Cell Approved by FDA",
          description:
            "In December 2023, the FDA approved Casgevy (exagamglogene autotemcel), the first CRISPR/Cas9-based therapy, for sickle cell disease. The treatment edits patients' own blood stem cells (BCL11A) to reactivate fetal hemoglobin. In the pivotal trial, 29 of 31 evaluable patients (93.5%) were free of severe vaso-occlusive crises for at least 12 consecutive months. This is somatic (non-heritable) editing, but demonstrates the therapeutic potential.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 4,
          },
          source: "U.S. FDA press announcement (Dec 8, 2023); manufacturer Vertex/CRISPR Therapeutics",
          sourceUrl: "https://www.fda.gov/news-events/press-announcements/fda-approves-first-gene-therapies-treat-patients-sickle-cell-disease",
          reasoning:
            "Landmark FDA approval demonstrates clinical viability; the 97% figure was overstated and corrected to the trial's 93.5% (29/31 evaluable patients). Directness lowered to 4 because somatic editing of an adult patient's own cells has a fundamentally different — and far lower — risk profile than heritable germline editing of an embryo.",
        },
        {
          id: "pgt-m-alternative",
          title: "PGT-M Already Screens for Most Genetic Diseases",
          description:
            "Preimplantation genetic testing for monogenic conditions (PGT-M) can screen IVF embryos for essentially any known single-gene disorder, selecting unaffected embryos for transfer instead of editing the genome. The ASRM's 2023 committee opinion describes it as an established, widely available clinical option. For most carrier couples, PGT-M removes the need for germline editing entirely.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "ASRM Practice Committee, \"Indications and management of PGT for monogenic conditions,\" Fertil Steril 2023;120:61–71",
          sourceUrl: "https://www.fertstert.org/article/S0015-0282(23)00210-8/fulltext",
          reasoning:
            "Strong evidence that a safer alternative exists for most use cases. The unsourced '95%+ accuracy' figure was removed (PGT-M reliability is condition- and lab-dependent, and misdiagnosis risk is non-zero). Directness lowered to 7: PGT-M selects among existing embryos and cannot help when all embryos are affected (both parents homozygous) or for de novo mutations — exactly the cases proponents cite for editing.",
        },
      ],
    },
    {
      id: "ethical-social-implications",
      title: "Ethical & Social Implications",
      short_summary:
        "Fixing Huntington's disease is therapy. Selecting for height is enhancement. The line between them is clear in theory and blurry in practice.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The slippery slope to designer babies is real — once you allow editing for disease, the line to enhancement (intelligence, height, appearance) is impossible to hold. Wealthy access to genetic enhancement would create a literal genetic class system. Disability rights advocates argue that editing out genetic conditions signals that disabled lives aren't worth living. The history of eugenics in the 20th century makes this territory uniquely dangerous.",
      proponent_rebuttal:
        "Independent ethics bodies have concluded heritable editing could be acceptable in principle if it secures the welfare of the future person and does not worsen social inequality (Nuffield Council, 2018), and the WHO has published a governance framework (2021) — so the question is how to regulate, not whether regulation is conceivable. A defensible line can be drawn at preventing serious, well-characterized monogenic disease, the same category society already treats as legitimate to screen for. And a ban is not neutral: prohibition pushes work into unregulated settings, which is precisely the gap He Jiankui exploited. Better to permit tightly licensed research than to cede the field to rogue actors.",
      crux: {
        id: "therapy-enhancement-boundary",
        title: "Enforceability of Therapy vs. Enhancement Boundary",
        description:
          "Is fixing severe myopia 'therapy' or 'enhancement'? Regulators will have to draw a line somewhere. Every proposed line has edge cases.",
        methodology:
          "Comparative analysis of existing regulatory frameworks (IVF regulation, pharmaceutical approval, organ transplantation) to assess whether therapy/enhancement distinctions have been successfully maintained in analogous contexts.",
        equation:
          "P(\\text{boundary holding}) = f(\\text{regulatory capacity}, \\text{commercial pressure}, \\text{international coordination})",
        verification_status: "theoretical" as const,
        cost_to_verify: "$300K (International regulatory and ethics comparative study)",
      },
      evidence: [
        {
          id: "nuffield-council-report",
          title: "Nuffield Council: Germline Editing Could Be Ethically Acceptable",
          description:
            "The UK's Nuffield Council on Bioethics concluded in its July 2018 report 'Genome editing and human reproduction' that heritable genome editing could be ethically acceptable, on two conditions: that it is intended to secure the welfare of the future person, and that it does not increase disadvantage, discrimination, or division in society. The report called for broad public deliberation and robust regulation, not an outright ban.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 6,
          },
          source: "Nuffield Council on Bioethics (UK), \"Genome editing and human reproduction\" (July 2018)",
          sourceUrl: "https://www.nuffieldbioethics.org/publications/genome-editing-and-human-reproduction",
          reasoning:
            "Highly respected, independent ethics body. The conditional endorsement is nuanced — it supports the possibility, not current practice. Directness limited because ethical conclusions don't resolve empirical safety questions.",
        },
        {
          id: "disability-rights-critique",
          title: "Disability Rights Advocates Challenge Genetic 'Correction'",
          description:
            "Disability rights organizations argue that selecting against or editing out conditions like deafness or dwarfism implies these lives are defective and not worth living. The U.S. National Council on Disability's 2019 report found that biases devaluing disabled lives are pervasive and shape genetic-testing practice. Many people with genetic conditions report high quality of life; the social model of disability holds that society, not genes, is what needs changing.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 5,
            directness: 6,
          },
          source: "National Council on Disability, \"Genetic Testing and the Rush to Perfection\" (Oct 2019), Bioethics and Disability Report Series",
          sourceUrl: "https://www.ncd.gov/report/genetic-testing-and-the-rush-to-perfection/",
          reasoning:
            "Important ethical perspective that challenges the foundational premise of 'fixing' genetic variation. Somewhat less applicable to fatal or severely debilitating conditions like Huntington's or Tay-Sachs.",
        },
        {
          id: "international-regulation-comparison",
          title: "International Regulatory Landscape Shows Possible Governance",
          description:
            "Many countries already restrict or prohibit clinical heritable human genome editing, and surveys (e.g. Baylis et al., 2020) document this near-global policy coverage. The UK's HFEA offers a model of permissive but tightly licensed embryo research; China tightened its rules after the He Jiankui scandal. In July 2021 the WHO Expert Advisory Committee published a governance framework and recommendations for human genome editing. This suggests international coordination is feasible, though imperfect and largely untested clinically.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 4,
          },
          source: "WHO Expert Advisory Committee, \"Human genome editing: recommendations\" (2021); HFEA (UK)",
          sourceUrl: "https://www.who.int/publications/i/item/9789240030381",
          reasoning:
            "Demonstrates that governance infrastructure exists. The '70 countries' claim was softened to 'many countries' since the exact tally varies by survey and category. Directness lowered to 4: these frameworks govern a procedure almost nobody is doing clinically, so they remain untested against the commercial pressures that would arise if heritable editing became viable.",
        },
        {
          id: "enhancement-therapy-distinction",
          title: "Therapy-Enhancement Distinction Is Philosophically Unstable",
          description:
            "Bioethicists argue the line between therapy and enhancement is blurrier than proponents claim. Is editing for 'short stature' therapy or enhancement? What about genetic predisposition to obesity, depression, or low IQ? Every trait exists on a spectrum, and 'disease' is often socially defined. Michael Sandel's 'The Case Against Perfection' is a canonical statement of this critique; cosmetic surgery's drift from reconstructive to elective use is a cited precedent.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source: "Michael Sandel, \"The Case Against Perfection\" (Atlantic 2004 / Harvard Univ. Press 2007); broader bioethics debate incl. Savulescu, Buchanan",
          sourceUrl: "https://www.theatlantic.com/magazine/archive/2004/04/the-case-against-perfection/302927/",
          reasoning:
            "Well-established philosophical argument anchored to a named, citable source rather than a list of surnames. SourceReliability and replicability lowered because this is normative philosophy, not an empirical finding — it cannot be 'replicated' and reasonable bioethicists (e.g. Savulescu) reach the opposite conclusion. The cosmetic-surgery analogy is historically grounded and directionally concerning.",
        },
      ],
    },
  ],
};
