import type { Topic } from "@/lib/schemas/topic";

export const eaccVsTechRegulationData = {
  id: "eacc-vs-tech-regulation",
  title: "E/acc vs. Tech Regulation",
  meta_claim:
    "Rapid, unregulated technological advancement creates more benefit than harm",
  status: "contested" as const,
  category: "technology" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Innovation Speed vs. Safety
    // =========================================================================
    {
      id: "innovation-speed-vs-safety",
      title: "Innovation Speed vs. Safety",
      short_summary:
        "E/acc proponents argue that regulation throttles transformative innovation without meaningfully reducing risk, pointing to how pharmaceutical and nuclear energy regulations have imposed massive costs and delays. Critics counter that emerging technologies like AI, synthetic biology, and autonomous systems pose catastrophic risks that evolve faster than society can adapt, and that the precautionary principle exists precisely for such asymmetric-downside scenarios.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "Unregulated technological development creates catastrophic risks — in AI, biotechnology, and nuclear domains — faster than society can adapt. AI capabilities are advancing on exponential timelines while alignment research and governance frameworks lag years behind. Synthetic biology tools like benchtop DNA synthesizers are becoming accessible to non-experts, raising bioweapon risks that the 2023 UK Biosecurity Strategy called 'the most significant existential threat after nuclear war.' The 2024 International AI Safety Report, commissioned by 30 nations, concluded that frontier AI systems pose risks that 'current governance frameworks are not equipped to manage.' History shows that technologies deployed without safety constraints — leaded gasoline, asbestos, CFCs, thalidomide — caused decades of preventable harm before corrective action was taken. The speed-over-safety ideology treats human welfare as an acceptable externality of progress.",
      proponent_rebuttal:
        "Historical evidence demonstrates that regulation consistently slows progress without proportionally reducing risk, while imposing enormous costs on society. The Tufts Center for the Study of Drug Development estimates FDA-regulated drug development costs average $2.6 billion per approved drug and takes 10-15 years, contributing to the US paying the world's highest drug prices and delaying life-saving treatments. Nuclear energy — the safest power source per TWh according to Our World in Data — was effectively killed in the US by regulatory capture: the average construction timeline ballooned from 4 years in the 1970s to 15+ years, while France built its fleet in a decade. Moore's Law delivered 50 years of exponential computing progress in a largely unregulated environment, creating trillions in value. Market forces self-correct: companies that ship unsafe products face lawsuits, reputational damage, and customer loss. The real risk is not moving too fast — it is the unseen cost of innovations that never happen because regulation killed them in the cradle.",
      crux: {
        id: "capability-adaptation-rate",
        title: "The Capability-Adaptation Rate Comparison",
        description:
          "If technological capability growth consistently outpaces societal adaptation mechanisms (legal frameworks, safety research, institutional response), then proactive regulation is necessary to prevent catastrophic harm. If adaptation mechanisms keep pace or market forces provide sufficient correction, regulation imposes net costs without proportional safety benefits.",
        methodology:
          "Measure the time lag between capability deployment and effective governance response across 10 major technologies (automobiles, nuclear energy, internet, social media, CRISPR, autonomous vehicles, large language models, cryptocurrency, synthetic biology, and drone technology). For each, document: (1) date of capability threshold, (2) date of first significant harm event, (3) date of effective regulatory response, (4) date of market-driven safety correction if applicable, and (5) cumulative harm during the governance gap. Compare market-corrected vs. regulation-corrected outcomes.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$100K-300K (Historical policy analysis and cross-domain comparative study)",
      },
      evidence: [
        {
          id: "drug-development-cost-delay",
          title: "FDA Regulation Drives $2.6B Average Cost and 10-15 Year Timeline Per Drug",
          description:
            "The Tufts Center for the Study of Drug Development estimates that bringing a new drug to market costs an average of $2.6 billion and takes 10-15 years from discovery to approval. A 2022 study in the Journal of Health Economics found that each year of FDA review delay costs an average of 150,000 life-years for drugs treating serious conditions. Operation Warp Speed demonstrated that compressed timelines were possible — COVID-19 vaccines were developed in under a year — suggesting that normal regulatory timelines impose avoidable costs.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Tufts Center for the Study of Drug Development; Journal of Health Economics",
          sourceUrl: "https://csdd.tufts.edu/impact-reports",
          reasoning:
            "Tufts CSDD is the standard source for drug development cost estimates, though some critics argue their methodology inflates costs by including opportunity cost of capital. The comparison to Operation Warp Speed is compelling but may not generalize — pandemic urgency created unique political conditions. Directness is moderate because pharmaceutical regulation is not identical to tech regulation.",
        },
        {
          id: "nuclear-regulatory-capture",
          title: "US Nuclear Construction Timelines Expanded from 4 to 15+ Years Due to Regulatory Burden",
          description:
            "US nuclear power plant construction timelines expanded from an average of 4 years in the early 1970s to over 15 years by the 2000s, largely due to NRC regulatory requirements that escalated after Three Mile Island. The Vogtle Units 3 and 4 project in Georgia took over 14 years and cost $35 billion — more than double the original estimate. Meanwhile, France built 56 reactors in 15 years under a streamlined regulatory model, and South Korea consistently builds reactors in 5-6 years. The US went from 100+ planned reactors in 1975 to near-zero new construction for three decades, despite nuclear being the safest energy source per TWh generated.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source: "US Energy Information Administration; World Nuclear Association; Our World in Data",
          sourceUrl: "https://world-nuclear.org/information-library/country-profiles/countries-t-z/usa-nuclear-power",
          reasoning:
            "Nuclear construction data is publicly available and internationally comparable. The contrast between US and French/Korean timelines directly demonstrates how regulatory approaches affect deployment speed. However, post-Chernobyl and post-Fukushima regulatory caution arguably prevented incidents, making the counterfactual hard to assess.",
        },
        {
          id: "ai-safety-report-2024",
          title: "International AI Safety Report: Current Governance Frameworks Inadequate for Frontier AI",
          description:
            "The 2024 International AI Safety Report, produced by an expert panel commissioned by 30 nations following the Bletchley Park AI Safety Summit, concluded that frontier AI systems pose risks including large-scale disinformation, autonomous cyber-attacks, biological weapon design assistance, and potential loss of human control. The report stated that 'current governance frameworks are not equipped to manage these risks' and recommended mandatory safety evaluations, incident reporting requirements, and international coordination on compute governance. The panel included both industry researchers and independent scientists.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 9,
          },
          source: "International AI Safety Report; UK AI Safety Institute",
          sourceUrl: "https://www.gov.uk/government/publications/international-ai-safety-report-2025",
          reasoning:
            "The report carries significant institutional weight as a multinational expert consensus document. Independence is slightly lower because several panelists had affiliations with AI labs, though the panel also included independent academics. Replicability is limited because AI risk assessment involves forecasting rather than measurement. Directness is high because it directly addresses the question of whether unregulated AI development is safe.",
        },
        {
          id: "moores-law-unregulated-progress",
          title: "Moore's Law: 50 Years of Exponential Progress in a Largely Unregulated Domain",
          description:
            "From 1965 to 2015, semiconductor transistor density doubled approximately every two years — Moore's Law — in a largely unregulated market environment. This unregulated innovation cycle produced the personal computer revolution, the internet, smartphones, and an estimated $15+ trillion in cumulative global GDP growth. The semiconductor industry self-organized safety standards through SEMI (Semiconductor Equipment and Materials International) and competitive pressure drove quality improvements. No government mandate was required to produce the most transformative technology wave in human history.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          source: "Intel; SEMI; National Bureau of Economic Research",
          sourceUrl: "https://www.nber.org/papers/w21524",
          reasoning:
            "Moore's Law is an empirically documented phenomenon with clear measurement. The semiconductor industry's success without heavy regulation is a strong data point for e/acc arguments. However, directness is lower because semiconductor manufacturing posed limited catastrophic risks compared to AI, biotech, or nuclear — the argument may not generalize to technologies with asymmetric downside potential.",
        },
        {
          id: "leaded-gasoline-decades-harm",
          title: "Leaded Gasoline: 70 Years of Preventable Harm Before Regulatory Phase-Out",
          description:
            "Tetraethyl lead was added to gasoline starting in 1923 despite warnings from public health scientists. It was not phased out in the US until 1996 — 73 years later. During this period, lead exposure from gasoline is estimated to have reduced the IQ of virtually every American born between 1930 and 1980, with a 2022 study in PNAS estimating 824 million IQ points lost in the US alone. The lead industry funded decades of disinformation to delay regulation. Market forces did not self-correct; only EPA regulation under the Clean Air Act finally removed lead from gasoline.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source: "Proceedings of the National Academy of Sciences; Environmental Protection Agency",
          sourceUrl: "https://www.pnas.org/doi/10.1073/pnas.2118631119",
          reasoning:
            "PNAS is a top-tier peer-reviewed journal and the leaded gasoline case is extensively documented. It is one of the strongest historical examples of market failure in safety, directly contradicting the claim that markets self-correct. Directness is slightly lower because chemical pollutants differ from digital technologies, but the principle of industry-funded delay of safety measures generalizes.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Market Self-Correction vs. Market Failure
    // =========================================================================
    {
      id: "market-correction-vs-failure",
      title: "Market Self-Correction vs. Market Failure",
      short_summary:
        "E/acc advocates argue that competitive markets correct safety failures faster than bureaucracies through reputational damage, lawsuits, and consumer choice. Critics point to documented market failures in social media, environmental pollution, and addictive product design where profit incentives systematically diverge from public welfare.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Markets systematically fail to account for negative externalities when the costs are diffuse, delayed, or borne by non-consumers. Social media platforms optimized engagement algorithms knowing they amplified misinformation and harmed adolescent mental health — internal Facebook research leaked by whistleblower Frances Haugen in 2021 showed the company knew Instagram was 'toxic for teen girls' and chose profit over safety. The fossil fuel industry knew about climate change since the 1970s but funded denial for decades. Tech companies designed addictive interfaces using variable-ratio reinforcement schedules — the same mechanism as slot machines — with no market corrective mechanism because the users are the product, not the customer. Without regulation, companies externalize harm onto society while capturing profits, especially when harms are statistical (population-level mental health decline) rather than individually attributable.",
      proponent_rebuttal:
        "Markets correct faster than bureaucracies because they operate on commercial timelines, not political ones. Automobile safety improved dramatically through market competition — deaths per 100 million vehicle-miles fell from 24.09 in 1921 to 1.37 in 2019 — with safety innovations like seatbelts, airbags, and crumple zones driven largely by manufacturer competition and liability pressure, not just government mandates. When Boeing's 737 MAX crashes occurred, the market response was immediate: the stock dropped 20%, orders were cancelled, and the company faced billions in liability. Contrast this with the FAA, which took months to ground the plane. Tech industry self-regulation has produced meaningful standards — the Partnership on AI, the Frontier Model Forum, and voluntary commitments on AI safety testing demonstrate that competitive pressure creates safety incentives. The EU's GDPR, often held up as a regulatory success, has been criticized for empowering large incumbents who can afford compliance costs while crushing startups — exactly the innovation-killing effect e/acc warns about.",
      crux: {
        id: "market-welfare-alignment",
        title: "The Market-Welfare Alignment Test",
        description:
          "If market incentives systematically diverge from public welfare in high-stakes technology domains — producing persistent negative externalities that markets fail to self-correct within a reasonable timeframe — then regulatory intervention is necessary. If markets correct harmful outcomes faster and more efficiently than regulatory processes, the case for deregulation holds.",
        methodology:
          "Identify 20 cases of technology-related harm (across social media, AI, biotech, environmental, consumer safety, and financial technology domains). For each case, measure: (1) time from deployment to first documented harm, (2) time from documented harm to market-driven correction (if any), (3) time from documented harm to regulatory correction (if any), (4) cumulative harm during each gap, and (5) whether market correction or regulatory correction came first and was more effective. Calculate the ratio of market-corrected to regulation-corrected outcomes.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$150K-400K (Cross-industry case study analysis requiring domain expertise in multiple sectors)",
      },
      evidence: [
        {
          id: "facebook-internal-research-harm",
          title: "Facebook Internal Research: Instagram 'Toxic for Teen Girls,' Company Chose Profit",
          description:
            "In 2021, Facebook whistleblower Frances Haugen leaked internal company research showing that Facebook knew Instagram worsened body image issues for 1 in 3 teen girls, amplified misinformation 6x more effectively than truthful content, and that its algorithms promoted divisive content because it drove engagement. Despite this knowledge, the company did not implement available mitigations because they would reduce engagement metrics. The leaked documents, published as the Facebook Files by the Wall Street Journal, showed executives explicitly weighing user harm against profit impact.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 9,
          },
          source: "Wall Street Journal (Facebook Files); US Senate Commerce Committee testimony",
          sourceUrl: "https://www.wsj.com/articles/the-facebook-files-11631713039",
          reasoning:
            "The Facebook Files are primary source internal documents with maximum credibility — the company's own research confirmed the harms. Independence is high because the documents were not produced for advocacy purposes. This is a textbook case of market failure: the company identified the harm, had the ability to mitigate it, and chose not to because mitigation would reduce revenue.",
        },
        {
          id: "auto-safety-market-improvements",
          title: "Auto Safety Deaths Fell 94% Per Mile Driven Through Market Competition and Liability",
          description:
            "US traffic deaths per 100 million vehicle-miles traveled fell from 24.09 in 1921 to 1.37 in 2019 — a 94% reduction. While government regulation (NHTSA standards from 1966, mandatory seatbelt laws) played a role, many critical safety innovations were market-driven: Volvo invented the three-point seatbelt in 1959 and made the patent free; Mercedes developed the crumple zone in 1952; multiple manufacturers competed on airbag technology before federal mandates. Product liability lawsuits also drove safety improvements — the Ford Pinto case in 1978 demonstrated that market accountability mechanisms punish safety failures.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "National Highway Traffic Safety Administration; Insurance Institute for Highway Safety",
          sourceUrl: "https://www.iihs.org/topics/fatality-statistics/detail/yearly-snapshot",
          reasoning:
            "NHTSA and IIHS data is highly reliable and publicly available. The auto safety case genuinely demonstrates market-driven safety improvement, though the interplay between regulation and market forces makes it hard to isolate the market effect. Directness is moderate because automobiles are a mature industry with clear liability attribution — unlike AI or social media where harms are diffuse and causation is harder to prove.",
        },
        {
          id: "social-media-mental-health-data",
          title: "Teen Depression Rose 60% Between 2011-2021, Correlating with Smartphone Adoption",
          description:
            "CDC Youth Risk Behavior Survey data shows that the percentage of US high school students reporting persistent feelings of sadness or hopelessness rose from 28% in 2011 to 42% in 2021 — a 50% increase. Teen girls were disproportionately affected, with rates rising from 36% to 57%. Jonathan Haidt's research compilation shows this trend correlates strongly with smartphone adoption and social media use. A 2023 American Psychological Association advisory declared social media a significant risk to adolescent mental health. No market mechanism corrected this harm over a full decade — platforms continued optimizing for engagement.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "CDC Youth Risk Behavior Survey; American Psychological Association",
          sourceUrl: "https://www.cdc.gov/healthyyouth/data/yrbs/index.htm",
          reasoning:
            "The CDC YRBS is a large-scale, nationally representative survey conducted biennially with strong methodology. The correlation with smartphone/social media adoption is robust, though causation remains debated (some researchers argue the rise reflects increased willingness to report mental health struggles). The key point for the regulation debate is that a decade of documented harm produced no market self-correction.",
        },
        {
          id: "gdpr-startup-impact",
          title: "GDPR Reduced EU Tech Investment by 26% and Disproportionately Harmed Startups",
          description:
            "A 2020 study in the Journal of Empirical Legal Studies found that GDPR implementation reduced the number of apps available in the EU by one-third and decreased venture capital investment in EU tech startups by 26% compared to US counterparts. Large companies like Google and Facebook could absorb compliance costs estimated at $7-8 billion collectively, while small competitors could not. A 2022 NBER working paper found that GDPR strengthened the market position of large incumbents by raising barriers to entry, the opposite of its intended competitive effect.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Journal of Empirical Legal Studies; National Bureau of Economic Research",
          sourceUrl: "https://www.nber.org/papers/w30028",
          reasoning:
            "The NBER and academic journal sources are credible, though the 26% VC reduction figure has been challenged by some economists as overstating the GDPR-specific effect (other factors like Brexit uncertainty also affected EU investment). This evidence directly supports the e/acc argument that regulation creates barriers to entry and entrenches incumbents. However, GDPR has also been credited with reducing data breaches and giving consumers meaningful privacy controls.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Democratic Governance vs. Technocratic Progress
    // =========================================================================
    {
      id: "democratic-governance-vs-technocratic-progress",
      title: "Democratic Governance vs. Technocratic Progress",
      short_summary:
        "The debate over whether democratic institutions or technical experts should steer technological development touches on fundamental questions of political legitimacy. Proponents of regulation argue democracies must govern all powerful institutions including tech companies. E/acc advocates argue that democratic processes are too slow and uninformed to regulate technologies legislators do not understand.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Democratic societies have both the right and the duty to govern technological development, just as they govern every other powerful institution. Technology is not politically neutral — it distributes power, wealth, and risk, and those affected deserve a voice in its governance. The EU AI Act, adopted in 2024 as the world's first comprehensive AI regulation, demonstrates that democratic bodies can produce sophisticated technology governance frameworks. The open-source movement shows that transparency and community governance produce more reliable software than proprietary black boxes. Unchecked technocratic power concentrated in a handful of companies and individuals — with combined market capitalization exceeding $10 trillion — represents an unprecedented concentration of unaccountable power. History repeatedly shows that expert classes acting without democratic accountability produce outcomes that serve their own interests: the financial industry's 'expert-driven' deregulation led to the 2008 crash, the Sackler family's expert-endorsed opioid marketing killed 500,000+ Americans.",
      proponent_rebuttal:
        "Democratic processes are structurally incapable of governing technologies they do not understand at the speed those technologies evolve. Congressional hearings on technology have repeatedly demonstrated fundamental ignorance — from Senator Ted Stevens describing the internet as 'a series of tubes' to legislators asking Mark Zuckerberg how Facebook makes money if it is free. The average age of US senators is 64, and fewer than 10% have technical backgrounds. The EU AI Act took 3 years to negotiate and was already outdated by the time it passed, failing to anticipate the generative AI revolution that occurred during its drafting. China's technocratic governance model has produced the world's most advanced AI surveillance state, but also the fastest infrastructure deployment, the largest renewable energy buildout, and competitive AI research — suggesting that technocratic speed has real advantages regardless of one's views on Chinese governance. The CRISPR governance debates show that the most productive research happens in jurisdictions with lighter regulation — He Jiankui's rogue embryo editing was condemned, but the response was self-regulation by the scientific community, not government intervention.",
      crux: {
        id: "governance-outcome-quality",
        title: "The Democratic vs. Expert Governance Outcome Test",
        description:
          "If democratic deliberation produces better long-term outcomes than expert-driven development in technology governance — measured by safety, innovation, equitable distribution of benefits, and public trust — then democratic governance is justified despite its slower pace. If expert-driven or market-governed development consistently produces superior outcomes, the efficiency argument for technocratic governance holds.",
        methodology:
          "Compare outcomes across regulatory approaches for 5 technology domains (AI, gene editing, nuclear energy, internet governance, autonomous vehicles) across 3 governance models (democratic-regulatory like the EU, technocratic-state like China, and market-driven like the US). For each domain and model, measure: (1) innovation output (patents, publications, commercial deployments), (2) safety incidents per unit of deployment, (3) public trust levels, (4) equitable distribution of benefits (Gini coefficient of technology access), and (5) speed from research to deployment. Conduct a 10-year longitudinal comparison.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1M (Multi-jurisdiction comparative policy study requiring international collaboration)",
      },
      evidence: [
        {
          id: "eu-ai-act-effects",
          title: "EU AI Act: First Comprehensive AI Law, but Criticized as Already Outdated",
          description:
            "The EU AI Act, adopted in March 2024 after three years of negotiation, established the world's first comprehensive legal framework for artificial intelligence. It bans certain AI uses (social scoring, real-time biometric surveillance in most contexts), requires transparency for high-risk systems, and mandates safety testing for 'general-purpose AI' models. However, critics note that the Act was drafted before ChatGPT's release and had to be hastily amended to address generative AI. Compliance costs are estimated at 1-6% of annual revenue for affected companies, with full enforcement not beginning until 2027 — by which time multiple generations of AI capabilities will have passed.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 9,
          },
          source: "European Parliament; Center for Data Innovation; Brookings Institution",
          sourceUrl: "https://www.europarl.europa.eu/topics/en/article/20230601STO93804/eu-ai-act-first-regulation-on-artificial-intelligence",
          reasoning:
            "The EU AI Act is the most direct real-world test case of democratic technology regulation. The fact that it required hasty amendments for generative AI supports the e/acc argument that regulation cannot keep pace. However, it also demonstrates that democratic bodies can produce substantive governance frameworks. Directness is high because this is exactly the phenomenon under debate.",
        },
        {
          id: "china-tech-governance",
          title: "China's Technocratic Model: Rapid Deployment but Surveillance State Outcomes",
          description:
            "China's technocratic governance model has produced the world's largest 5G network (over 2.3 million base stations by 2023), the largest installed renewable energy capacity (over 1,200 GW), and competitive AI research (Chinese researchers published more AI papers than US researchers in 2022). However, the same model produced the world's most extensive surveillance state — over 600 million CCTV cameras, social credit scoring, and AI-powered monitoring of Uyghur populations that the UN has characterized as potential crimes against humanity. This demonstrates the dual-use nature of technocratic speed: efficiency gains come at the cost of democratic accountability.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "Stanford HAI AI Index; UN Human Rights Office; International Energy Agency",
          sourceUrl: "https://aiindex.stanford.edu/report/",
          reasoning:
            "Stanford's HAI AI Index is a respected annual publication, and the UN assessment of Xinjiang carries institutional authority. The China example cuts both ways — it shows the benefits of technocratic speed and the dangers of unchecked deployment. Replicability is lower because cross-country comparisons involve many confounding variables beyond governance model.",
        },
        {
          id: "crispr-governance-debates",
          title: "CRISPR Governance: Scientific Self-Regulation vs. Democratic Oversight",
          description:
            "The CRISPR gene-editing revolution has been governed primarily by scientific self-regulation rather than comprehensive legislation. After He Jiankui's rogue editing of human embryos in 2018, the response came from the scientific community (condemnation, moratorium calls from the National Academies) rather than new laws. The UK's Human Fertilisation and Embryology Authority has approved limited embryo research, while the US relies on an NIH funding ban rather than a statutory prohibition. Countries with lighter regulatory frameworks (UK, Sweden, Japan) have produced more CRISPR research output than heavily regulated jurisdictions. However, the absence of binding international governance means there is no mechanism to prevent future rogue experiments.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "National Academies of Sciences; Nature Reviews Genetics; WHO Expert Advisory Committee",
          sourceUrl: "https://www.nationalacademies.org/our-work/human-gene-editing",
          reasoning:
            "The National Academies and Nature Reviews Genetics are authoritative sources. The CRISPR case provides evidence that scientific self-regulation can work for a powerful technology, though the He Jiankui incident also demonstrated its limits. Replicability is lower because each technology domain has unique governance dynamics.",
        },
        {
          id: "open-source-movement-outcomes",
          title: "Open Source: Community Governance Produced More Reliable Software Than Proprietary Models",
          description:
            "The open-source software movement demonstrates that transparent, community-governed development can outperform proprietary alternatives in reliability and security. Linux powers 96% of the world's top 1 million web servers, 100% of the world's top 500 supercomputers, and the majority of cloud infrastructure. The 2024 Coverity Scan Report found that open-source code quality matches or exceeds proprietary code in defect density. Apache, Mozilla, and the Linux Foundation have governed massive software ecosystems without government regulation through community norms, code review processes, and meritocratic governance. This model influenced AI development: Meta's open-source Llama models, Stability AI's open models, and the Hugging Face ecosystem represent a self-governing alternative to both corporate secrecy and government regulation.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source: "Linux Foundation; Coverity/Synopsys Open Source Report; W3Techs",
          sourceUrl: "https://www.linuxfoundation.org/research",
          reasoning:
            "The success of open source is empirically well-documented and represents a genuine third model of governance that is neither purely market-driven nor government-regulated. However, directness is lower because software code review is different from governing AI safety, biotech risks, or environmental externalities. Open-source governance works best when the 'product' can be inspected — it may not generalize to opaque or dual-use technologies.",
        },
        {
          id: "congressional-tech-illiteracy",
          title: "Congressional Hearings Reveal Fundamental Gaps in Legislators' Tech Understanding",
          description:
            "Multiple congressional hearings on technology have demonstrated significant knowledge gaps among legislators. During Mark Zuckerberg's 2018 Senate testimony, Senator Orrin Hatch asked 'How do you sustain a business model in which users don't pay for your service?' — revealing unfamiliarity with ad-supported business models. In TikTok hearings in 2023, multiple members displayed confusion about basic internet architecture. A 2023 survey by the Internet Governance Project found that fewer than 10% of US Congress members had any technical background, and the average age of Senate committee chairs overseeing technology policy was 73. The Office of Technology Assessment, which provided Congress with nonpartisan technical expertise, was defunded in 1995 and has not been restored despite multiple proposals.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "C-SPAN congressional hearing transcripts; Internet Governance Project",
          sourceUrl: "https://www.internetgovernance.org/",
          reasoning:
            "Congressional hearing transcripts are public record and the anecdotes are widely documented. The defunding of the OTA is a significant structural failure. However, legislative ignorance about technical details does not necessarily mean democratic governance produces bad outcomes — legislators also lack medical expertise but healthcare regulation has clear benefits. The argument proves that Congress needs better technical advisory capacity, not necessarily that democratic governance should be abandoned.",
        },
      ],
    },
  ],
  references: [
    {
      title: "International AI Safety Report 2025 — UK AI Safety Institute",
      url: "https://www.gov.uk/government/publications/international-ai-safety-report-2025",
    },
    {
      title: "EU AI Act: First Regulation on Artificial Intelligence — European Parliament",
      url: "https://www.europarl.europa.eu/topics/en/article/20230601STO93804/eu-ai-act-first-regulation-on-artificial-intelligence",
    },
    {
      title: "The Cost of Developing a New Drug — Tufts Center for the Study of Drug Development",
      url: "https://csdd.tufts.edu/impact-reports",
    },
    {
      title: "AI Index Report 2024 — Stanford HAI",
      url: "https://aiindex.stanford.edu/report/",
    },
    {
      title: "The Facebook Files — Wall Street Journal",
      url: "https://www.wsj.com/articles/the-facebook-files-11631713039",
    },
    {
      title: "Youth Risk Behavior Surveillance System — Centers for Disease Control and Prevention",
      url: "https://www.cdc.gov/healthyyouth/data/yrbs/index.htm",
    },
    {
      title: "Half of Americans' IQ Points Lost to Lead Exposure — Proceedings of the National Academy of Sciences",
      url: "https://www.pnas.org/doi/10.1073/pnas.2118631119",
    },
    {
      title: "Human Genome Editing: Science, Ethics, and Governance — National Academies of Sciences",
      url: "https://www.nationalacademies.org/our-work/human-gene-editing",
    },
    {
      title: "The GDPR and Competition for Online Advertising — National Bureau of Economic Research",
      url: "https://www.nber.org/papers/w30028",
    },
    {
      title: "World Nuclear Performance Report — World Nuclear Association",
      url: "https://world-nuclear.org/information-library/country-profiles/countries-t-z/usa-nuclear-power",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Does unregulated innovation create more value than harm?",
      content:
        "Moore's Law delivered 50 years of exponential computing progress with minimal regulation, creating trillions in value. But leaded gasoline poisoned populations for 73 years before regulation intervened, and social media harmed teen mental health for a decade with no market correction. When technologies have asymmetric downside potential — like AI or synthetic biology — can we afford to learn by failing?",
    },
    {
      id: "q2",
      title: "Can democratic institutions govern technologies they don't understand?",
      content:
        "The EU AI Act took 3 years to negotiate and was already outdated when passed. Congressional tech hearings reveal deep knowledge gaps. The Office of Technology Assessment was defunded in 1995. Yet the alternative — letting a handful of tech CEOs make civilizational decisions unilaterally — concentrates unprecedented power without accountability. Is the solution better-informed democratic governance, or a fundamentally different model?",
    },
    {
      id: "q3",
      title: "Who bears the risk when innovation moves faster than safety?",
      content:
        "E/acc proponents frame regulation as an obstacle to progress, but the costs of unregulated deployment — from opioid deaths to social media's mental health toll to financial crises — fall disproportionately on vulnerable populations who had no say in the deployment decisions. When Facebook chose engagement over teen safety, the teens bore the cost. Does consent matter in the distribution of technological risk?",
    },
  ],
};
