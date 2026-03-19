import type { Topic } from "@/lib/schemas/topic";

export const artificialReproductionEthicsData = {
  id: "artificial-reproduction-ethics",
  title: "Artificial Wombs & Synthetic Embryos",
  meta_claim:
    "Ectogenesis (artificial womb technology) and in-vitro gametogenesis (creating eggs/sperm from skin cells) will fundamentally alter human reproduction within 15 years, raising profound ethical questions about parenthood, consent, and biological boundaries.",
  status: "contested" as const,
  category: "science" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "Artificial Womb Technology and the Frontiers of Human Reproduction — Nature",
      url: "https://www.nature.com/articles/s41587-023-01816-w",
    },
    {
      title: "In Vitro Gametogenesis: The Next Frontier in Reproductive Technology — Science",
      url: "https://www.science.org/doi/10.1126/science.abn7953",
    },
    {
      title: "Ectogenesis and the Ethics of Artificial Wombs — The Hastings Center",
      url: "https://www.thehastingscenter.org/briefingbook/artificial-wombs/",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Should artificial wombs be developed to full term for humans?",
      content:
        "Lamb ectogenesis experiments have succeeded to 4 weeks; human applications raise consent, bonding, and commodification concerns. Should the technology be developed for human use even if it could save hundreds of thousands of premature infants per year?",
    },
    {
      id: "q2",
      title: "Does IVG destroy the concept of biological parentage?",
      content:
        "In-vitro gametogenesis could allow a single person to create both egg and sperm from their own cells, or a child could have genetic material from dozens of people. Does this represent liberation from biological constraints or the dissolution of a fundamental human relationship?",
    },
    {
      id: "q3",
      title: "Who regulates reproduction when it moves entirely outside the body?",
      content:
        "Current legal frameworks assume pregnancy occurs inside a person. Ectogenesis breaks every existing model for parental rights, consent, and state interest in fetal life. How should law adapt to reproduction that requires no pregnancy?",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Medical Necessity
    // =========================================================================
    {
      id: "medical-necessity",
      title: "Medical Necessity & Premature Birth",
      short_summary:
        "Premature birth kills over 1 million infants per year globally and is the leading cause of death in children under 5. Artificial womb technology could save the majority of these lives by providing a controlled gestational environment for extremely premature infants.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "The medical necessity argument is a Trojan horse for broader ectogenesis. While neonatal care has improved dramatically — survival rates for 24-week infants now exceed 60% — extending artificial womb technology beyond the NICU context into elective full-term ectogenesis raises entirely different ethical questions. The therapeutic application for premature infants does not justify developing the capacity for complete external gestation. Additionally, the enormous R&D costs could save far more lives if directed toward basic maternal healthcare in developing nations, where most premature deaths occur due to lack of simple interventions like antenatal steroids and kangaroo care.",
      proponent_rebuttal:
        "The distinction between therapeutic and elective ectogenesis is a false boundary. The technology required to save a 22-week premature infant is functionally identical to the technology required for earlier gestational stages — the engineering challenges differ only in degree. The Children's Hospital of Philadelphia's Biobag successfully sustained fetal lambs at the equivalent of 23 weeks for up to four weeks in 2017, demonstrating proof of concept. Over 15 million babies are born premature annually, and 1 million die. The moral imperative to develop this technology is overwhelming, and restricting its development based on speculative concerns about future misuse would condemn real infants to preventable deaths.",
      crux: {
        id: "biobag-human-translation",
        title: "The Human Biobag Translation Trial",
        description:
          "The decisive question is whether artificial womb technology can successfully sustain human fetuses at gestational ages below current viability thresholds (22-23 weeks) with outcomes comparable to or better than conventional NICU care. If human trials demonstrate safety and efficacy, the medical necessity argument becomes unassailable.",
        methodology:
          "Conduct a phased clinical trial beginning with extremely premature infants (21-22 weeks) who would otherwise have near-zero survival rates. Compare outcomes (survival, neurodevelopmental scores at 2 years, organ function) between artificial womb support and conventional NICU care. Requires FDA IND approval and institutional review board oversight at a minimum of three academic medical centers.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$50-200M (Multi-site clinical trial with long-term follow-up)",
      },
      evidence: [
        {
          id: "chop-biobag-lamb-study",
          title: "CHOP Biobag Successfully Sustains Fetal Lambs for 4 Weeks (2017)",
          description:
            "Researchers at the Children's Hospital of Philadelphia developed an extrauterine system (Biobag) that sustained extremely premature fetal lambs equivalent to 23-week human gestation for up to 28 days. The lambs showed normal lung maturation, brain growth, and organ development. The system maintained a fluid-filled environment mimicking the uterus with oxygenated blood flow through an umbilical circuit.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Nature Communications; Children's Hospital of Philadelphia",
          sourceUrl: "https://www.nature.com/articles/ncomms15112",
          reasoning:
            "Published in a top-tier journal with peer review, this is the strongest proof of concept for artificial womb technology. However, the directness score is lower because lamb physiology differs from human, and translation to human infants remains unproven.",
        },
        {
          id: "premature-birth-mortality-who",
          title: "WHO: Premature Birth Is Leading Cause of Death in Children Under 5",
          description:
            "The World Health Organization reports that approximately 13.4 million babies were born premature in 2020, and complications from preterm birth are the leading cause of death among children under 5. An estimated 900,000 children died from preterm birth complications in 2019. Most of these deaths occur in low- and middle-income countries and are preventable with current technology — but access remains limited.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source: "World Health Organization",
          sourceUrl: "https://www.who.int/news-room/fact-sheets/detail/preterm-birth",
          reasoning:
            "WHO data is highly reliable and independent. The scale of premature birth mortality strongly supports the medical necessity argument. Directness is moderate because the data shows the problem, not that artificial wombs specifically are the best solution compared to improving access to existing NICU care.",
        },
        {
          id: "nicu-survival-limits",
          title: "Current NICU Technology Hits Hard Viability Limit at 22 Weeks",
          description:
            "Despite decades of neonatal advancement, survival rates for infants born before 22 weeks remain near zero. Even at 22 weeks, survival is roughly 10-30% with severe disability rates of 50-70%. Conventional ventilator-based approaches damage underdeveloped lungs, creating a physiological barrier that incremental improvements cannot overcome — a fundamentally different approach like artificial womb technology may be required.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "New England Journal of Medicine; NICHD Neonatal Research Network",
          sourceUrl: "https://www.nejm.org/doi/full/10.1056/NEJMoa2116812",
          reasoning:
            "The viability limit is well-established across multiple large studies. This directly supports the argument that a new technological approach is needed rather than incremental improvement of existing methods.",
        },
        {
          id: "ectogenesis-commodification-critique",
          title: "Bioethicists Warn Ectogenesis Could Commodify Human Reproduction",
          description:
            "A growing body of bioethics literature argues that full ectogenesis — not just therapeutic use for premature infants — risks commodifying reproduction by turning gestation into a service that can be purchased, potentially creating a market where wealthy individuals outsource pregnancy entirely. This could deepen existing inequalities in reproductive access and create new forms of exploitation, particularly if commercial ectogenesis facilities develop in countries with weaker regulatory protections.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "The Hastings Center Report; Journal of Medical Ethics",
          sourceUrl: "https://www.thehastingscenter.org/briefingbook/artificial-wombs/",
          reasoning:
            "Bioethics scholarship from reputable institutions raises legitimate concerns. However, these are speculative arguments about future misuse rather than evidence of current harm, and the commodification concern applies to a technology that does not yet exist for full-term human use.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Bodily Autonomy & the Abortion Debate
    // =========================================================================
    {
      id: "bodily-autonomy-abortion",
      title: "Bodily Autonomy & the Abortion Debate",
      short_summary:
        "Ectogenesis could fundamentally reshape the abortion debate by decoupling the question of bodily autonomy from fetal life. If a fetus can be extracted and gestated externally, the right to end a pregnancy no longer necessarily implies the right to terminate a fetal life.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The claim that ectogenesis resolves the abortion debate is dangerously naive. The right to abortion has never been solely about bodily autonomy — it encompasses reproductive self-determination, including the right to decide whether to become a genetic parent. Forcing extraction-and-ectogenesis instead of termination would compel genetic parenthood against a person's will. Moreover, the practical reality is that ectogenesis would likely be used to restrict abortion access by providing courts with a 'less restrictive alternative' to termination, effectively eliminating abortion rights while claiming to respect bodily autonomy. The technology would also create hundreds of thousands of children needing parents, overwhelming adoption systems.",
      proponent_rebuttal:
        "Ectogenesis does not resolve the abortion debate — but it clarifies it by separating two distinct rights claims that have been conflated: the right to end a pregnancy (bodily autonomy) and the right to end a fetal life (reproductive self-determination). Currently, exercising bodily autonomy necessarily requires the second. Artificial wombs would allow a person to exercise full bodily autonomy — no one would be forced to remain pregnant — while also preserving fetal life. This is not a restriction on abortion rights but an expansion of options. The ethical clarity this provides is valuable regardless of one's position: it forces both sides to articulate which right they consider fundamental.",
      crux: {
        id: "right-to-terminate-vs-evacuate",
        title: "The Evacuation vs. Termination Distinction",
        description:
          "The crux is whether the right to abortion is fundamentally about ending a pregnancy (bodily autonomy) or ending a potential life (reproductive self-determination). If courts and ethicists conclude that bodily autonomy is the core right, ectogenesis provides a satisfactory alternative. If reproductive self-determination — the right not to become a genetic parent — is the core right, ectogenesis does not resolve the fundamental disagreement.",
        methodology:
          "Conduct a systematic legal analysis across jurisdictions to determine which constitutional framework — bodily autonomy or reproductive self-determination — underlies abortion protections. Survey a representative sample of 5,000 people across the political spectrum to measure whether support for abortion rights persists when extraction-without-termination is available. This would reveal whether the public debate is truly about bodily autonomy or encompasses broader reproductive control.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$150K-400K (Legal analysis plus large-scale public opinion research)",
      },
      evidence: [
        {
          id: "thomson-violinist-argument",
          title: "Thomson's Violinist Argument Frames Abortion as Bodily Autonomy (1971)",
          description:
            "Judith Jarvis Thomson's influential 1971 thought experiment argues that even if a fetus has a right to life, no one is obligated to sustain another's life with their own body. This framework suggests that abortion is fundamentally about bodily autonomy — the right to disconnect — rather than the right to terminate. Under this reasoning, ectogenesis would satisfy the bodily autonomy claim by enabling disconnection without termination.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Philosophy and Public Affairs; Thomson (1971)",
          sourceUrl: "https://spot.colorado.edu/~heathwoo/Phil160,Fall02/thomson.htm",
          reasoning:
            "Thomson's argument is one of the most cited in reproductive ethics and directly addresses the bodily autonomy framing. However, it is a philosophical argument rather than empirical evidence, and many ethicists have developed counter-arguments over the ensuing decades.",
        },
        {
          id: "genetic-parenthood-objection",
          title: "Reproductive Self-Determination Extends Beyond Bodily Autonomy",
          description:
            "Legal scholars including Sonia Suter and I. Glenn Cohen have argued that the right to abortion encompasses more than bodily autonomy — it includes the right not to become a genetic parent. Under this framework, ectogenesis would not resolve the core ethical question because a person would still be compelled to have a genetic child against their will. This argument has gained traction in legal scholarship since the Dobbs decision eliminated federal abortion protections.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "Harvard Law Review; Georgetown Law Journal",
          sourceUrl: "https://harvardlawreview.org/forum/vol-136/the-constitutional-right-not-to-procreate/",
          reasoning:
            "This is a well-developed legal argument from top law reviews that directly challenges the claim that ectogenesis resolves the abortion debate. However, it represents one legal interpretation among several, and courts have not definitively ruled on whether reproductive self-determination is a constitutionally protected right distinct from bodily autonomy.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Commodification & Eugenics Risk
    // =========================================================================
    {
      id: "commodification-eugenics-risk",
      title: "Commodification & Eugenics Risk",
      short_summary:
        "Decoupling reproduction from the human body — combined with IVG and genetic selection — could enable commercial reproduction markets and modern eugenics. The convergence of artificial wombs, synthetic gametes, and embryo screening creates possibilities that no individual technology poses alone.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The convergence of ectogenesis, IVG, and preimplantation genetic testing creates a near-term pathway to consumer eugenics that existing regulatory frameworks are utterly unprepared for. IVG would allow creation of unlimited embryos from any person's cells, embryo screening could select for hundreds of genetic traits simultaneously, and artificial wombs could gestate the selected embryos without requiring any person to undergo pregnancy. This is not science fiction — each component technology exists in some form today. The wealthy would access these technologies first, creating a biological class divide that dwarfs existing inequality. History's darkest eugenic programs were constrained by biology; removing those constraints is reckless.",
      proponent_rebuttal:
        "The eugenics comparison is historically illiterate. Historical eugenics was coercive state programs forcing sterilization and murder on the vulnerable. Reproductive technology expands individual choice — the opposite of coercion. Parents already select against genetic diseases through PGT and amniocentesis; extending this to more traits is a difference of degree, not kind. The slippery slope argument assumes no regulation is possible, yet we successfully regulate nuclear technology, pharmaceutical development, and organ transplantation. The solution is proactive governance — international frameworks similar to the Oviedo Convention — not technology prohibition. Banning reproductive research to prevent hypothetical misuse condemns real people to preventable suffering from infertility, genetic disease, and pregnancy complications.",
      crux: {
        id: "regulatory-capacity-test",
        title: "The Governance Feasibility Assessment",
        description:
          "The crux is whether international regulatory frameworks can be designed and enforced to prevent eugenic applications of combined ectogenesis/IVG/genetic selection technology while preserving therapeutic uses. If effective governance is feasible, the commodification risk is manageable. If regulation cannot keep pace with technological capability, the risk of misuse may justify moratoriums.",
        methodology:
          "Commission a comparative regulatory analysis examining how existing international frameworks (nuclear non-proliferation, human cloning bans, organ trafficking conventions) have succeeded or failed at constraining dual-use technologies. Convene a panel of 50+ bioethicists, reproductive endocrinologists, legal scholars, and technology governance experts to draft a model international framework and assess its enforceability through tabletop exercises simulating evasion scenarios.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$2-5M (International regulatory analysis and expert panel convening)",
      },
      evidence: [
        {
          id: "ivg-mouse-proof-of-concept",
          title: "Japanese Researchers Create Mouse Pups from Skin Cell-Derived Eggs (2023)",
          description:
            "In 2023, researchers at Osaka University led by Katsuhiko Hayashi created functional mouse eggs from male skin cells using IVG, producing live mouse pups. This was the first demonstration that skin cells could be reprogrammed into functional gametes of the opposite sex, proving that the biological barriers to IVG are surmountable. Human applications are estimated to be 10-20 years away, but the fundamental proof of concept is established.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Nature; Osaka University",
          sourceUrl: "https://www.nature.com/articles/s41586-023-05834-x",
          reasoning:
            "Published in Nature with successful replication, this is landmark research demonstrating IVG feasibility. Directness is moderate because mouse-to-human translation involves significant additional challenges, and the commodification risk is an inference from the capability rather than a demonstrated harm.",
        },
        {
          id: "human-cloning-ban-effectiveness",
          title: "International Human Cloning Bans Have Held for 25+ Years",
          description:
            "Despite the capability to clone human embryos existing since the late 1990s, no confirmed human reproductive cloning has occurred. Over 70 countries have enacted cloning bans, and the scientific community has largely self-regulated against reproductive cloning even where laws are absent. This suggests that international governance of reproductive technology can be effective when there is broad scientific and public consensus against misuse.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "UNESCO; National Academies of Sciences",
          sourceUrl: "https://www.unesco.org/en/ethics-science-technology/human-cloning",
          reasoning:
            "The track record of cloning bans provides strong evidence that international governance of reproductive technology can work. However, cloning had limited demand and clear scientific consensus against it — reproductive enhancement technologies may face much stronger commercial pressure and less scientific opposition, making the analogy imperfect.",
        },
        {
          id: "pgt-trait-selection-expansion",
          title: "Preimplantation Genetic Testing Already Enables Trait Selection",
          description:
            "Companies like Genomic Prediction already offer polygenic risk scoring for IVF embryos, screening for disease risk, height prediction, and cognitive potential. While marketed for disease prevention, the technology can rank embryos on traits that have nothing to do with disease. As the number of embryos available for screening increases (which IVG would enable dramatically), the selective power of these tools grows exponentially.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "MIT Technology Review; Genomic Prediction",
          sourceUrl: "https://www.technologyreview.com/2022/04/18/1049811/polygenic-scoring-ivf-embryos/",
          reasoning:
            "This evidence directly demonstrates that trait selection in embryos is already commercially available, not hypothetical. The combination of IVG (unlimited embryos) plus advanced PGT (trait selection) creates a near-term pathway to consumer eugenics that is more tangible than theoretical.",
        },
      ],
    },
  ],
} satisfies Omit<Topic, "confidence_score">;
