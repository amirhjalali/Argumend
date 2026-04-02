import type { Topic } from "@/lib/schemas/topic";

export const gainOfFunctionResearchBanData = {
  id: "gain-of-function-research-ban",
  title: "Should Gain-of-Function Research Be Banned?",
  meta_claim:
    "Gain-of-function research that enhances the transmissibility or pathogenicity of potential pandemic pathogens poses an existential biosecurity risk that outweighs its scientific benefits and should be permanently banned worldwide.",
  status: "contested" as const,
  category: "policy" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1582719471384-894fbb16f461?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "Gain-of-Function Research: Ethical Analysis — NIH Office of Science Policy",
      url: "https://osp.od.nih.gov/biotechnology/gain-of-function-research/",
    },
    {
      title: "Biosecurity in the Age of Synthetic Biology — National Academies Press",
      url: "https://nap.nationalacademies.org/catalog/24890/biodefense-in-the-age-of-synthetic-biology",
    },
    {
      title: "Pause Dangerous Gain-of-Function Research — The Lancet",
      url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(23)02366-4/fulltext",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Has any gain-of-function experiment produced irreplaceable knowledge?",
      content:
        "The counterfactual question: would alternative research approaches — computational modeling, natural surveillance, structure-based analysis — have achieved the same pandemic preparedness insights without creating enhanced pathogens?",
    },
    {
      id: "q2",
      title: "Can international bans on biological research actually be enforced?",
      content:
        "The dual-use dilemma is acute in biology: the same techniques that enhance pathogens for study also enable vaccine development. Can a ban be defined precisely enough to prohibit dangerous work without crippling beneficial research, and can it be enforced when the relevant equipment fits in a modest laboratory?",
    },
    {
      id: "q3",
      title: "Does the benefit of pandemic preparedness outweigh the risk of creating a pandemic?",
      content:
        "The risk-benefit calculation is uniquely extreme: the downside of a lab-originated pandemic is potentially millions of deaths, while the upside is incremental improvements in preparedness that may or may not prove useful against a natural pandemic with different characteristics.",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Existential Risk Calculus
    // =========================================================================
    {
      id: "existential-risk-calculus",
      title: "Existential Risk Calculus",
      short_summary:
        "A single lab accident with an enhanced pathogen could trigger a pandemic killing millions. Even if the probability of any individual accident is low, the catastrophic magnitude of the consequence makes the expected cost extraordinarily high — potentially an existential or civilizational-scale risk.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The existential risk framing is disproportionate and fear-driven. BSL-4 laboratories have operated for over 50 years with no confirmed pandemic originating from a lab accident. The safety record of high-containment facilities is remarkably strong — documented incidents have been contained locally. The risk of a natural pandemic arising from zoonotic spillover in wet markets, factory farms, and deforested habitats is far higher than the lab-accident risk and receives far less policy attention. Banning GOF research based on theoretical catastrophic risk would set a precedent that could justify banning any technology with a nonzero chance of civilizational harm — including nuclear energy, AI research, and spaceflight. Risk must be assessed proportionally, not catastrophically.",
      proponent_rebuttal:
        "The safety record argument is survivorship bias in its most literal form — we are here to discuss it because no lab-created pandemic has killed us yet, not because the risk is low. Documented BSL-4 incidents include the 2004 SARS escape in Beijing (killing one researcher and infecting nine), the 2014 CDC anthrax and smallpox exposure events, and the 1979 Sverdlovsk anthrax release that killed at least 66 people. These are individual failures in a system that needs 100% success indefinitely. The probability of a catastrophic lab leak is estimated at 0.01-0.1% per lab per year — with dozens of BSL-4 labs worldwide, the cumulative probability over decades becomes substantial. When the consequence is potentially millions or billions of deaths, even a small probability demands extraordinary precaution.",
      crux: {
        id: "lab-leak-probability-assessment",
        title: "The Cumulative Lab Accident Probability Model",
        description:
          "The crux is the actual probability of a catastrophic pathogen release from GOF research over the relevant time horizon. If rigorous analysis shows that cumulative leak probability is negligibly small given modern containment standards, the existential risk argument is overblown. If the probability is non-negligible when multiplied by the number of labs and years of operation, the precautionary case is strong.",
        methodology:
          "Commission an independent actuarial analysis of BSL-3 and BSL-4 laboratory incidents worldwide, including near-misses and containment breaches that did not result in community transmission. Model the cumulative probability of a pandemic-capable pathogen escape over 50-year and 100-year horizons under current and projected laboratory expansion. Engage separate teams using different modeling assumptions to test sensitivity.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$1-3M (Independent actuarial analysis with classified incident data access)",
      },
      evidence: [
        {
          id: "historical-lab-escapes",
          title: "Documented Lab Escapes of Dangerous Pathogens (1970s-Present)",
          description:
            "Multiple documented pathogen escapes from research laboratories have occurred, including: the 1977 H1N1 re-emergence widely attributed to a lab source; the 2003-2004 SARS escapes in Singapore, Taiwan, and Beijing; the 2014 CDC anthrax and forgotten smallpox vials incidents; and the 1979 Sverdlovsk anthrax release in the Soviet Union. While none caused a global pandemic, they demonstrate that containment failures are not hypothetical — they are a documented reality of biological research.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source: "Bulletin of the Atomic Scientists; Science Magazine",
          sourceUrl: "https://thebulletin.org/2023/02/biosafety-and-biosecurity-risks-of-gain-of-function-research/",
          reasoning:
            "These are well-documented historical events confirmed by multiple independent sources. They directly demonstrate that lab escapes happen despite safety protocols, making the risk concrete rather than theoretical. The directness score is high because these incidents are exactly the type of failure that a GOF ban would aim to prevent.",
        },
        {
          id: "bsl4-safety-record",
          title: "BSL-4 Laboratories Have 50-Year Safety Record Without Global Pandemics",
          description:
            "The highest-containment BSL-4 laboratories have operated since the 1970s, handling Ebola, Marburg, smallpox, and other maximum-threat pathogens without any confirmed global pandemic originating from a laboratory. While incidents have occurred, the containment systems have prevented community-scale outbreaks. Modern BSL-4 facilities incorporate redundant safety systems, air filtration, chemical showers, and comprehensive personnel training that are qualitatively superior to earlier facilities.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source: "Federation of American Scientists; WHO Biosafety Manual",
          sourceUrl: "https://www.who.int/publications/i/item/9789240011311",
          reasoning:
            "The overall safety record is factually accurate. However, independence is lower because much safety data is self-reported by the laboratories themselves, and near-miss incidents may be underreported. The absence of a catastrophic lab pandemic so far does not guarantee future safety, particularly as the number of labs and enhanced pathogens increases.",
        },
        {
          id: "fouchier-ferret-h5n1",
          title: "Fouchier's Airborne H5N1 Experiment Sparked Global Alarm (2011-2012)",
          description:
            "In 2011, virologist Ron Fouchier created an airborne-transmissible H5N1 avian influenza variant through serial passage in ferrets — a gain-of-function experiment that demonstrated a naturally occurring bird flu could mutate to spread between mammals through respiratory droplets. The National Science Advisory Board for Biosecurity initially recommended against publication, fearing the recipe could enable bioterrorism. The experiment directly led to the 2014-2017 US GOF research funding moratorium.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "Science; National Science Advisory Board for Biosecurity",
          sourceUrl: "https://www.science.org/doi/10.1126/science.1213362",
          reasoning:
            "This is the paradigmatic GOF experiment — peer-reviewed, published in Science, and directly responsible for policy changes. It demonstrates both the scientific capability and the biosecurity risk in concrete terms. The experiment created a novel pathogen that did not exist in nature with pandemic potential.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Scientific Necessity
    // =========================================================================
    {
      id: "scientific-necessity",
      title: "Scientific Necessity & Pandemic Preparedness",
      short_summary:
        "Proponents argue that GOF research has been critical for understanding how pathogens evolve pandemic potential, developing broad-spectrum antivirals, and creating vaccines in advance of natural pandemics. The question is whether the same knowledge can be obtained through safer alternative methods.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "GOF research has produced specific, irreplaceable insights that safer methods cannot provide. Fouchier's H5N1 experiments revealed the precise mutations that enable airborne transmission — knowledge critical for global surveillance of naturally circulating strains. Ralph Baric's chimeric coronavirus work at UNC identified the spike protein mechanisms that later proved essential for rapid COVID-19 vaccine development. Computational modeling cannot predict emergent properties of mutated pathogens with sufficient accuracy because biological systems are too complex for in silico simulation alone. Structure-based approaches tell you what a virus looks like, not how it behaves. The GOF research that critics want to ban is the same research that gives us the ability to develop vaccines before a pandemic arrives.",
      proponent_rebuttal:
        "The scientific necessity claim is empirically weak. A systematic review of GOF research outputs shows that the overwhelming majority of pandemic preparedness insights came from natural surveillance, genomic sequencing, and structural biology — not from creating enhanced pathogens. The COVID-19 mRNA vaccines were developed based on the SARS-CoV-2 spike protein sequence obtained from natural isolates, not from any gain-of-function experiment. Advances in computational biology, cryo-electron microscopy, and AI-based protein structure prediction (AlphaFold) have dramatically expanded what can be learned without creating dangerous pathogens. The few genuine insights from GOF research could have been obtained through loss-of-function experiments, deep mutational scanning, and pseudovirus systems that do not create replication-competent enhanced pathogens.",
      crux: {
        id: "counterfactual-knowledge-test",
        title: "The Counterfactual Knowledge Assessment",
        description:
          "The crux is whether GOF research has produced knowledge that could not have been obtained through safer alternative methods. If a rigorous systematic review shows that every major GOF finding has been independently confirmed or could have been predicted through non-GOF approaches, the scientific necessity argument collapses. If there are irreplaceable insights, the risk-benefit calculation becomes genuinely difficult.",
        methodology:
          "Commission a systematic review of all published GOF research on potential pandemic pathogens over the past 20 years. For each major finding, assess whether the same knowledge was independently obtained or could have been obtained through computational modeling, structure-based analysis, natural surveillance, or loss-of-function approaches. Engage both GOF proponents and critics in the review to ensure fair assessment of each side's claims.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1.5M (Systematic review with expert panels from both sides of the debate)",
      },
      evidence: [
        {
          id: "baric-chimeric-coronavirus-research",
          title: "Baric Lab Chimeric Coronavirus Research Informed COVID Response",
          description:
            "Ralph Baric's laboratory at UNC-Chapel Hill conducted chimeric coronavirus research combining spike proteins from bat coronaviruses with SARS backbones, published in Nature Medicine (2015). This research demonstrated that bat coronaviruses could infect human cells and was resistant to existing therapies — findings that directly informed the rapid COVID-19 response. However, critics argue this specific knowledge could have been obtained through pseudovirus systems without creating replication-competent chimeric viruses.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Nature Medicine; UNC-Chapel Hill",
          sourceUrl: "https://www.nature.com/articles/nm.3985",
          reasoning:
            "Published in a top journal with significant policy impact. However, the claim that this research was essential for COVID preparedness is contested — the mRNA vaccines were developed from natural SARS-CoV-2 sequences, not from Baric's chimeric work. Independence is slightly lower because the scientific necessity claim is partly self-assessment by the researchers who conducted the work.",
        },
        {
          id: "alphafold-alternative-methods",
          title: "AlphaFold and Computational Biology Provide Alternatives to GOF Research",
          description:
            "DeepMind's AlphaFold has predicted the 3D structure of virtually every known protein, and AI-based tools can now model protein-protein interactions, binding affinities, and mutational effects with increasing accuracy. Deep mutational scanning can map the fitness landscape of viral proteins without creating enhanced pathogens. These computational and in vitro approaches represent rapidly improving alternatives to creating replication-competent enhanced pathogens in the laboratory.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "Nature; DeepMind; Science",
          sourceUrl: "https://www.nature.com/articles/s41586-021-03819-2",
          reasoning:
            "AlphaFold represents a genuine paradigm shift in structural biology that reduces the need for some GOF experiments. However, structural prediction and functional prediction are different — knowing a protein's shape does not fully predict its behavior in a living system, which limits the directness of this as a substitute for all GOF research.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Enforcement & Verification
    // =========================================================================
    {
      id: "enforcement-verification",
      title: "Enforcement & Verification Challenges",
      short_summary:
        "Biological research is inherently difficult to monitor compared to nuclear programs. The relevant equipment is commercially available and fits in a modest laboratory. A GOF ban might constrain responsible researchers at transparent institutions while having no effect on bad actors conducting covert research.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "A GOF ban is unenforceable and counterproductive. Unlike nuclear weapons, which require specialized materials (enriched uranium/plutonium) and massive infrastructure, dangerous biological research can be conducted with commercially available equipment in a university-scale laboratory. The Biological Weapons Convention has been in effect since 1975 with no verification mechanism — multiple signatory states have maintained covert biological weapons programs. A ban on GOF research would push the work underground and offshore to countries with less transparency, creating the worst possible outcome: the research continues with lower safety standards and no oversight. Better to have the research conducted openly in well-regulated BSL-4 facilities with international inspection than behind closed doors.",
      proponent_rebuttal:
        "The enforceability objection is overstated and proves too much — by this logic, we should not ban bioweapons, chemical weapons, or human cloning either. The goal is not perfect enforcement but raising the cost and reducing the volume of dangerous research. The vast majority of GOF research is conducted by legitimate scientists at funded institutions who would comply with a ban. Funding restrictions alone would eliminate most GOF research, since the NIH funds the majority of relevant work globally. International CRISPR registries and DNA synthesis screening already demonstrate that biological research can be monitored at the supply chain level. A ban complemented by synthesis screening, international inspection, and whistleblower protections would not eliminate all risk but would substantially reduce the probability of a lab-created pandemic.",
      crux: {
        id: "enforcement-effectiveness-test",
        title: "The Enforcement Feasibility Analysis",
        description:
          "The crux is whether a GOF ban can be made effective enough to substantially reduce the volume of dangerous research worldwide, even if it cannot achieve perfect compliance. If enforcement mechanisms — funding restrictions, synthesis screening, international inspection — can reduce GOF research by 80%+, the ban has significant value. If determined actors can easily circumvent all controls, the ban may be counterproductive.",
        methodology:
          "Analyze the enforcement effectiveness of comparable dual-use technology regimes: the Biological Weapons Convention, Chemical Weapons Convention, Nuclear Non-Proliferation Treaty, and international human cloning bans. Assess compliance rates, detection of violations, and whether restrictions successfully reduced the total volume of prohibited activity even without perfect enforcement. Model the specific enforcement mechanisms available for GOF research (funding restrictions, DNA synthesis screening, institutional compliance, whistleblower protections) and estimate their collective effectiveness.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$800K-2M (Comparative enforcement analysis with classified intelligence access)",
      },
      evidence: [
        {
          id: "bwc-enforcement-failures",
          title: "Biological Weapons Convention Has No Verification Mechanism After 50 Years",
          description:
            "The Biological Weapons Convention, in force since 1975, has no verification or inspection mechanism — the only major arms control treaty without one. Attempts to add a verification protocol failed in 2001 when the US rejected the draft text. The Soviet Union maintained a massive covert bioweapons program (Biopreparat) for decades while being a BWC signatory. Iraq, South Africa, and other states also pursued bioweapons while publicly complying with the convention.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "Arms Control Association; United Nations Office for Disarmament Affairs",
          sourceUrl: "https://www.armscontrol.org/factsheets/bwcataglance",
          reasoning:
            "The BWC's enforcement failure is well-documented and directly relevant to the feasibility of enforcing a GOF ban. Major state violations went undetected for decades, demonstrating the difficulty of verifying compliance in biological research. This is among the strongest evidence against enforceability.",
        },
        {
          id: "dna-synthesis-screening-progress",
          title: "DNA Synthesis Screening Could Monitor GOF Research at the Supply Chain Level",
          description:
            "The International Gene Synthesis Consortium (IGSC) screens DNA synthesis orders against databases of regulated pathogen sequences, flagging orders that could enable bioweapons. Over 80% of commercial DNA synthesis globally is covered by screening protocols. Executive orders in the US now require synthesis screening for federally funded research. While imperfect, this approach demonstrates that biological research can be monitored at the supply chain level — researchers need to order synthetic DNA to conduct most GOF work.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "International Gene Synthesis Consortium; Nuclear Threat Initiative",
          sourceUrl: "https://www.nti.org/analysis/articles/the-gene-synthesis-screening-revolution/",
          reasoning:
            "DNA synthesis screening provides a concrete enforcement mechanism that already exists and covers the majority of the market. However, gaps remain — not all synthesis providers participate, and advanced labs can synthesize DNA without commercial suppliers. The 80% coverage rate suggests meaningful but imperfect enforcement.",
        },
      ],
    },
  ],
} satisfies Omit<Topic, "confidence_score">;
