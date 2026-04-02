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
        "CRISPR can delete the gene for sickle cell disease. It can also make off-target edits we cannot predict. The first gene-edited babies were born in 2018; the scientist went to prison.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "He Jiankui's 2018 experiment showed the technology is not ready — off-target edits had unknown effects on the twin girls born from the procedure. Germline changes are irreversible and affect all future generations. We don't understand gene interactions (pleiotropy, epistasis) well enough to predict consequences. Preimplantation genetic testing (PGT-M) already allows screening for most genetic diseases without modifying the genome.",
      proponent_rebuttal:
        "CRISPR could eliminate Huntington's disease, sickle cell anemia, cystic fibrosis, and thousands of other genetic diseases that cause immense suffering. The technology is advancing rapidly — off-target rates have dropped dramatically since 2018. Base editing and prime editing offer even greater precision. Restricting research condemns future children to preventable suffering when the tools to help them exist.",
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
          title: "He Jiankui Experiment Revealed Dangerous Off-Target Edits",
          description:
            "He Jiankui's 2018 experiment editing CCR5 in human embryos (resulting in twin girls Lulu and Nana) was found to have introduced unintended mutations. The edit may not have even provided the intended HIV resistance. He was sentenced to three years in prison. The experiment demonstrated that the technology was not ready for human application.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "MIT Technology Review, Nature, Chinese court records",
          reasoning:
            "The most direct evidence of premature human germline editing. Highly informative about risks, though this was a rogue experiment with poor technique — not representative of the field's best practices.",
        },
        {
          id: "crispr-precision-improvement-2023",
          title: "CRISPR Precision Has Improved Dramatically Since 2018",
          description:
            "Base editing (2017) and prime editing (2019) have reduced off-target rates by 10-100x compared to original Cas9. A 2023 Nature study demonstrated prime editing with undetectable off-target effects in human cell lines. The technology is on a steep improvement curve, similar to early DNA sequencing.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Anzalone et al., Nature; Liu Lab, Broad Institute",
          reasoning:
            "Rigorous peer-reviewed research showing rapid improvement. However, cell line results don't guarantee safety in whole embryos over a lifetime.",
        },
        {
          id: "sickle-cell-crispr-success",
          title: "CRISPR Treatment for Sickle Cell Approved by FDA",
          description:
            "In December 2023, the FDA approved Casgevy (exagamglogene autotemcel), the first CRISPR-based therapy, for sickle cell disease. The treatment edits patients' own blood stem cells to produce functional hemoglobin. Clinical trials showed 97% of patients were free of vaso-occlusive crises for at least 12 months. This is somatic (non-heritable) editing, but demonstrates the therapeutic potential.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source: "FDA, Vertex Pharmaceuticals, NEJM",
          reasoning:
            "Landmark FDA approval demonstrates clinical viability. Directness is limited because somatic editing (non-heritable) has fundamentally different risk profile than germline editing.",
        },
        {
          id: "pgt-m-alternative",
          title: "PGT-M Already Screens for Most Genetic Diseases",
          description:
            "Preimplantation genetic testing for monogenic disorders (PGT-M) can screen IVF embryos for virtually any known single-gene disease, avoiding the need to edit the genome. Success rates are high (95%+ accuracy), and it's already widely available. For most carrier couples, PGT-M eliminates the need for germline editing entirely.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "ASRM (American Society for Reproductive Medicine), multiple IVF clinics",
          reasoning:
            "Strong evidence that a safer alternative exists for most use cases. Less applicable for cases where both parents are homozygous for a disease (all embryos affected) or de novo mutations.",
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
        "The distinction between therapy (fixing disease-causing genes) and enhancement (making 'better' humans) is clear and regulatable. We already accept prenatal screening and selective termination without sliding into eugenics. International regulatory frameworks can draw enforceable lines. Banning research doesn't prevent it — it pushes development to unregulated jurisdictions like He Jiankui's experiment in China.",
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
            "The UK's Nuffield Council on Bioethics concluded in 2018 that heritable genome editing could be ethically acceptable if it is intended to secure the welfare of the future person, and if it is consistent with principles of social justice and solidarity. The report emphasized the need for broad societal debate and robust regulation, not an outright ban.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 6,
          },
          source: "Nuffield Council on Bioethics (UK)",
          reasoning:
            "Highly respected, independent ethics body. The conditional endorsement is nuanced — it supports the possibility, not current practice. Directness limited because ethical conclusions don't resolve empirical safety questions.",
        },
        {
          id: "disability-rights-critique",
          title: "Disability Rights Advocates Challenge Genetic 'Correction'",
          description:
            "Disability rights organizations argue that gene editing to eliminate conditions like deafness, dwarfism, or autism implies these lives are defective and not worth living. Many people with genetic conditions report high quality of life and reject the premise that they need 'fixing.' The social model of disability holds that society, not genes, is what needs changing.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source: "National Council on Disability, disability studies literature",
          reasoning:
            "Important ethical perspective that challenges the foundational premise of 'fixing' genetic variation. Somewhat less applicable to fatal or severely debilitating conditions like Huntington's or Tay-Sachs.",
        },
        {
          id: "international-regulation-comparison",
          title: "International Regulatory Landscape Shows Possible Governance",
          description:
            "Over 70 countries have some form of regulation on human germline editing. The UK's HFEA provides a model for permissive but tightly regulated research. China strengthened its regulations after the He Jiankui scandal. The WHO convened a global governance framework committee. This suggests international coordination is feasible, though imperfect.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source: "WHO Expert Advisory Committee, HFEA (UK), Nature Reviews Genetics",
          reasoning:
            "Demonstrates that governance infrastructure exists. Directness limited because regulatory frameworks are untested against the commercial pressures that would arise if editing became clinically viable.",
        },
        {
          id: "enhancement-therapy-distinction",
          title: "Therapy-Enhancement Distinction Is Philosophically Unstable",
          description:
            "Bioethicists argue the line between therapy and enhancement is blurrier than proponents claim. Is editing for 'short stature' therapy or enhancement? What about genetic predisposition to obesity, depression, or low IQ? Every trait exists on a spectrum, and 'disease' is often socially defined. Historical precedent with cosmetic surgery shows medical technology migrates from therapeutic to elective use.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Sandel, Savulescu, Buchanan — bioethics literature",
          reasoning:
            "Well-established philosophical argument. The analogy to cosmetic surgery's migration from reconstructive to elective is historically grounded and directionally concerning.",
        },
      ],
    },
  ],
};
