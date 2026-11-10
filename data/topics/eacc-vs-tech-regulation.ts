export const eaccVsTechRegulationData = {
  id: "eacc-vs-tech-regulation",
  title: "E/acc vs. Tech Regulation",
  question:
    "Does rapid, unregulated technological progress do more good than harm?",
  meta_claim:
    "Rapid, unregulated technological advancement creates more benefit than harm",
  status: "contested" as const,
  category: "technology" as const,
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "Lead was added to U.S. gasoline from 1923 and not phased out until 1996, despite early warnings from public-health scientists. A new drug now takes 10–15 years and about $2.6 billion to bring to market under FDA rules. Both sides accept the record at each end. The fight is over which of those costs is the bigger danger, with AI as the case at hand.",
    confidence: 86,
    source:
      "PNAS (2022) on leaded gasoline; DiMasi, Grabowski & Hansen, Journal of Health Economics (2016), Tufts Center for the Study of Drug Development",
    sourceUrl:
      "https://www.pnas.org/doi/10.1073/pnas.2118631119",
  },
  simple_case: [
    "The answer bears on how governments handle AI and whatever comes after it: wait for harm and respond, or set rules before the harm is known.",
  ],
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
        "Unregulated technological development creates catastrophic risks — in AI, biotechnology, and nuclear domains — faster than society can adapt. AI capabilities are advancing on exponential timelines while alignment research and governance frameworks lag years behind. Synthetic biology tools like benchtop DNA synthesizers are becoming accessible to non-experts, raising bioweapon risks: the 2023 UK Biological Security Strategy warns that rapidly developing DNA synthesis capabilities 'could also be deliberately misused to build new pathogens with harmful impacts.' The first International AI Safety Report (January 2025), written by 96 experts with an advisory panel nominated by 30 countries, warned that 'waiting for conclusive evidence could leave society vulnerable to risks that emerge rapidly.' History shows that technologies deployed without safety constraints — leaded gasoline, asbestos, CFCs, thalidomide — caused decades of preventable harm before corrective action was taken. The speed-over-safety ideology treats human welfare as an acceptable externality of progress.",
      proponent_rebuttal:
        "Historical evidence demonstrates that regulation consistently slows progress without proportionally reducing risk, while imposing enormous costs on society. The Tufts Center for the Study of Drug Development estimates FDA-regulated drug development costs average $2.6 billion per approved drug and takes 10-15 years, contributing to the US paying the world's highest drug prices and delaying life-saving treatments. Nuclear energy — among the safest power sources per TWh according to Our World in Data — was effectively killed in the US by regulatory capture: the average construction timeline ballooned from roughly 7 years for plants licensed in the late 1960s to 15+ years for recent projects, while France built most of its fleet in about 15 years. Moore's Law delivered 50 years of exponential computing progress in a largely unregulated environment, creating trillions in value. Market forces self-correct: companies that ship unsafe products face lawsuits, reputational damage, and customer loss. The real risk is not moving too fast — it is the unseen cost of innovations that never happen because regulation killed them in the cradle.",
      crux: {
        id: "capability-adaptation-rate",
        title: "The Capability-Adaptation Rate Comparison",
        question:
          "Does technological capability outpace society's ability to adapt, or does adaptation keep up?",
        description:
          "If technological capability growth consistently outpaces societal adaptation mechanisms (legal frameworks, safety research, institutional response), then proactive regulation is necessary to prevent catastrophic harm. If adaptation mechanisms keep pace or market forces provide sufficient correction, regulation imposes net costs without proportional safety benefits.",
        methodology:
          "Measure the time lag between capability deployment and effective governance response across 10 major technologies (automobiles, nuclear energy, internet, social media, CRISPR, autonomous vehicles, large language models, cryptocurrency, synthetic biology, and drone technology). For each, document: (1) date of capability threshold, (2) date of first significant harm event, (3) date of effective regulatory response, (4) date of market-driven safety correction if applicable, and (5) cumulative harm during the governance gap. Compare market-corrected vs. regulation-corrected outcomes.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "For ten technologies, from automobiles and nuclear power to CRISPR and large language models, the dates of capability, first major harm and effective regulation, giving the lag between harm and governance in each case.",
        },
        cost_to_verify:
          "$100K-300K (Historical policy analysis and cross-domain comparative study)",
        falsification: {
          supporter_flip:
            "If measuring the lag from capability to first harm to effective governance across ten major technologies showed harm routinely accumulating for decades before any correction — as with leaded gasoline, phased out in the US 73 years after 1923 — the claim that unregulated progress nets out positive would weaken for high-stakes domains.",
          skeptic_flip:
            "If cost studies confirmed what regulation adds, about $2.6 billion and 10-15 years per approved drug and U.S. nuclear builds stretching from about 7 years to 15+, while lightly regulated computing kept its Moore's Law pace, precaution would carry a much higher price.",
          common_ground:
            "Both sides accept the record at each end: leaded gasoline took 73 years to phase out despite early warnings, and FDA-regulated drugs now average about $2.6 billion and 10-15 years to reach market.",
          live_disagreement:
            "Whether capability now outpaces society's ability to adapt — frontier AI, accessible synthetic biology — so proactive rules are needed, or whether adaptation and liability keep up and regulation mostly adds cost and delay.",
        },
      },
      evidence: [
        {
          id: "drug-development-cost-delay",
          title: "Tufts Study: ~$2.6B Average Cost Per Approved Drug, Counting Failures and the Cost of Capital",
          description:
            "The peer-reviewed Tufts CSDD study by DiMasi, Grabowski & Hansen (Journal of Health Economics, 2016), based on 106 randomly selected new drugs from 10 pharmaceutical firms, puts average out-of-pocket spending per approved compound at $1.395 billion. Adding the cost of capital (a 10.5% real discount rate) and the cost of compounds abandoned along the way gives a pre-approval estimate of $2.558 billion in 2013 dollars; adding post-approval R&D brings it to $2.87 billion. The study measures what development costs, not how much of that cost FDA requirements cause. Development is commonly put at 10-15 years from discovery to approval, a figure that does not come from this study. Operation Warp Speed demonstrated that compressed timelines were possible — COVID-19 vaccines were developed in under a year — which proponents read as a sign that normal regulatory timelines impose avoidable costs.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "DiMasi, Grabowski & Hansen, Journal of Health Economics (2016), vol. 47, pp. 20-33 — Tufts Center for the Study of Drug Development",
          sourceUrl: "https://doi.org/10.1016/j.jhealeco.2016.01.012",
          reasoning:
            "The DiMasi et al. (2016) Tufts CSDD study is the standard peer-reviewed source for drug development cost estimates, though some critics argue its methodology inflates costs by including the opportunity cost of capital (out-of-pocket spending is about $1.4B; the ~$2.6B figure adds capital costs, and ~$2.87B adds post-approval R&D). The comparison to Operation Warp Speed is compelling but may not generalize — pandemic urgency created unique political conditions. Directness is moderate because pharmaceutical regulation is not identical to tech regulation, and because the study does not isolate the cost of regulation.",
        },
        {
          id: "nuclear-regulatory-capture",
          title: "Vogtle Took 15 Years and Over Twice Its Budget; France's 900 MWe Reactors All Started Up Within a Decade of a 1974 Decision",
          description:
            "Construction at Georgia's Vogtle Units 3 and 4 began in 2009. Originally expected to cost $14 billion and enter commercial operation in 2016 and 2017, the units did so in 2023 and April 2024, and Georgia Power puts the total cost at more than $30 billion (EIA). EIA's account says the project 'ran into significant construction delays and cost overruns'; proponents of lighter regulation attribute much of that to licensing and regulatory requirements. By 1990 the US had commissioned over 100 commercial power reactors, and the two reactors begun at the Summer plant alongside Vogtle were cancelled (World Nuclear Association). France, by contrast, decided in 1974 to expand nuclear capacity rapidly using Westinghouse technology, and all of its 900 MWe reactors started up in the late 1970s to early 1980s. Our World in Data ranks nuclear among the safest sources per unit of electricity, comparable to wind and solar, with 99.8% fewer deaths than coal.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source: "U.S. Energy Information Administration, 'Plant Vogtle Unit 4 begins commercial operation' (May 1, 2024); World Nuclear Association country profiles (USA, France); Our World in Data, 'What are the safest and cleanest sources of energy?'",
          sourceUrl: "https://www.eia.gov/todayinenergy/detail.php?id=61963",
          reasoning:
            "Nuclear construction data is publicly available and internationally comparable. The contrast between Vogtle and the French build-out shows how differently the same technology has been deployed, though the sources document the delays and overruns rather than how much of them regulation caused. Post-Chernobyl and post-Fukushima regulatory caution arguably prevented incidents, making the counterfactual hard to assess.",
        },
        {
          id: "ai-safety-report-2024",
          title: "International AI Safety Report (2025) Describes an 'Evidence Dilemma' for Regulators",
          description:
            "The first International AI Safety Report (January 2025, after an interim report in May 2024) was mandated by the nations at the Bletchley Park AI Safety Summit and written by 96 experts, including an advisory panel nominated by 30 countries, the OECD, the EU and the UN. It sorts general-purpose AI risks into malicious use (harmful fake content, manipulation of public opinion, cyber offence, biological and chemical attacks), malfunctions, and systemic risks. It describes an 'evidence dilemma': risks can emerge 'in leaps', early mitigation 'might prove unnecessary', but 'waiting for conclusive evidence could leave society vulnerable to risks that emerge rapidly.' On loss of control it reports 'broad consensus that current general-purpose AI lacks the capabilities to pose this risk', while expert views on the next several years vary greatly. The report states that it 'does not recommend specific policies.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "International AI Safety Report (January 2025), arXiv:2501.17805",
          sourceUrl: "https://arxiv.org/abs/2501.17805",
          reasoning:
            "The report carries significant institutional weight as a multinational expert synthesis. Independence is slightly lower because several contributors had affiliations with AI labs, though the panel also included independent academics. Replicability is limited because AI risk assessment involves forecasting rather than measurement. Directness is moderate: the report frames why waiting for proof is costly, which cuts against a pure accelerationist stance, but it deliberately recommends no policy, so it does not settle how much regulation is warranted.",
        },
        {
          id: "moores-law-unregulated-progress",
          title: "Moore's Law: 50 Years of Exponential Progress in a Largely Unregulated Domain",
          description:
            "Gordon Moore's 1965 observation, revised in 1975, that the number of transistors on an integrated circuit doubles about every two years has guided the semiconductor industry for close to 60 years (Intel). That run of exponential improvement underlies the personal computer, the internet and smartphones, and it took place in a largely unregulated market: no agency approved each chip generation before it shipped. E/acc proponents read it as proof that no government mandate was required to produce the most transformative technology wave of the era.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          source: "Intel, 'Moore's Law' (newsroom resource)",
          sourceUrl: "https://www.intel.com/content/www/us/en/newsroom/resources/moores-law.html",
          reasoning:
            "Moore's Law is an empirically documented phenomenon with clear measurement. The semiconductor industry's success without heavy regulation is a strong data point for e/acc arguments. However, directness is lower because semiconductor manufacturing posed limited catastrophic risks compared to AI, biotech, or nuclear — the argument may not generalize to technologies with asymmetric downside potential.",
        },
        {
          id: "leaded-gasoline-decades-harm",
          title: "Leaded Gasoline: 73 Years of Preventable Harm Before Regulatory Phase-Out",
          description:
            "Leaded gasoline was first sold in 1923 despite warnings from public health scientists. The Clean Air Act ban on leaded fuel for on-road vehicles took effect on January 1, 1996 — 73 years later; EPA had issued its first reduction standards in 1973. A 2022 study in PNAS estimates that over 170 million Americans alive in 2015, about half the population, were exposed to high lead levels in early childhood, and that lead cost the country 824 million IQ points in total, an average of 2.6 points per person, a loss borne disproportionately by those born between 1951 and 1980. The lead industry funded decades of disinformation to delay regulation. Market forces did not self-correct; only EPA regulation under the Clean Air Act finally removed lead from gasoline.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source: "McFarland, Hauer & Reuben, 'Half of US population exposed to adverse lead levels in early childhood,' PNAS 119 (2022); EPA, 'EPA Takes Final Step in Phaseout of Leaded Gasoline' (Jan 29, 1996)",
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
        "Markets systematically fail to account for negative externalities when the costs are diffuse, delayed, or borne by non-consumers. Social media platforms optimized engagement algorithms knowing they amplified misinformation and harmed adolescent mental health — internal Facebook research leaked by whistleblower Frances Haugen in 2021 included a slide reading 'We make body image issues worse for one in three teen girls,' and Haugen testified that the company put profit over safety. The fossil fuel industry knew about climate change since the 1970s but funded denial for decades. Tech companies designed addictive interfaces using variable-ratio reinforcement schedules — the same mechanism as slot machines — with no market corrective mechanism because the users are the product, not the customer. Without regulation, companies externalize harm onto society while capturing profits, especially when harms are statistical (population-level mental health decline) rather than individually attributable.",
      proponent_rebuttal:
        "Markets correct faster than bureaucracies because they operate on commercial timelines, not political ones. Automobile safety improved dramatically through market competition — deaths per 100 million vehicle-miles fell from 24.08 in 1921 to 1.11 in 2019 — with safety innovations like seatbelts, airbags, and crumple zones driven largely by manufacturer competition and liability pressure, not just government mandates. When Boeing's 737 MAX crashes occurred, the market response was immediate: the stock dropped 20%, orders were cancelled, and the company faced billions in liability. Contrast this with the FAA, which took months to ground the plane. Tech industry self-regulation has produced meaningful standards — the Partnership on AI, the Frontier Model Forum, and voluntary commitments on AI safety testing demonstrate that competitive pressure creates safety incentives. The EU's GDPR, often held up as a regulatory success, has been criticized for empowering large incumbents who can afford compliance costs while crushing startups — exactly the innovation-killing effect e/acc warns about.",
      crux: {
        id: "market-welfare-alignment",
        title: "The Market-Welfare Alignment Test",
        question:
          "Do markets correct harmful technology outcomes faster than regulators can?",
        description:
          "If market incentives systematically diverge from public welfare in high-stakes technology domains — producing persistent negative externalities that markets fail to self-correct within a reasonable timeframe — then regulatory intervention is necessary. If markets correct harmful outcomes faster and more efficiently than regulatory processes, the case for deregulation holds.",
        methodology:
          "Identify 20 cases of technology-related harm (across social media, AI, biotech, environmental, consumer safety, and financial technology domains). For each case, measure: (1) time from deployment to first documented harm, (2) time from documented harm to market-driven correction (if any), (3) time from documented harm to regulatory correction (if any), (4) cumulative harm during each gap, and (5) whether market correction or regulatory correction came first and was more effective. Calculate the ratio of market-corrected to regulation-corrected outcomes.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Twenty documented technology harms across social media, AI, biotech, finance and consumer safety, each timed from deployment to first harm, then to any market correction and to any regulatory one, with the harm built up in between.",
        },
        cost_to_verify:
          "$150K-400K (Cross-industry case study analysis requiring domain expertise in multiple sectors)",
        falsification: {
          supporter_flip:
            "If a study of 20 technology harms found market-driven corrections — lawsuits, reputational damage, consumer exit — arriving later than regulatory ones or not at all, especially where harms are diffuse and users are the product, the case that markets self-correct would weaken.",
          skeptic_flip:
            "If a study of technology harms traced most of the fall in U.S. traffic deaths, from 24.08 to 1.11 per 100 million vehicle-miles between 1921 and 2019, to competition and liability, and found markets punishing failures like the 737 MAX faster than regulators, 'systemic market failure' would be hard to hold.",
          common_ground:
            "Both sides agree auto safety improved through a mix of government standards and manufacturer competition: deaths per 100 million vehicle-miles fell from 24.08 in 1921 to 1.11 in 2019.",
          live_disagreement:
            "Whether markets correct technology harms quickly enough through lawsuits, reputation and consumer choice, or systematically fail when harms are diffuse, delayed or borne by users who are the product rather than the customer.",
        },
      },
      evidence: [
        {
          id: "facebook-internal-research-harm",
          title: "Facebook's Own Research: 'We Make Body Image Issues Worse for One in Three Teen Girls'",
          description:
            "Internal Facebook research disclosed in 2021 by whistleblower Frances Haugen, and published by the Wall Street Journal as the Facebook Files, included a 2019 slide stating 'We make body image issues worse for one in three teen girls,' summarizing research on teen girls who already experienced those issues. In written Senate testimony dated October 4, 2021, Haugen said the company's leadership 'knows ways to make Facebook and Instagram safer and won't make the necessary changes because they have put their immense profits before people.' Facebook disputed the Journal's reading: it said that on 11 of 12 well-being issues, teenage girls who struggled with them reported that Instagram made things better rather than worse, with body image the one exception.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 9,
          },
          source: "Facebook newsroom, 'What Our Research Really Says About Teen Well-Being and Instagram' (Sept 2021), quoting the Wall Street Journal's Facebook Files; Frances Haugen, written testimony to the US Senate Commerce Subcommittee on Consumer Protection (Oct 4, 2021)",
          sourceUrl: "https://about.fb.com/news/2021/09/research-teen-well-being-and-instagram/",
          reasoning:
            "The slide is the company's own research, and Facebook's response confirms its wording while disputing what it shows, so the quote is not in question; its interpretation is. Haugen's claim that the company chose profit over fixes is sworn testimony from a former employee, not a finding. This remains a strong case for market failure: the company documented a harm and, by a former insider's account, left available mitigations unused.",
        },
        {
          id: "auto-safety-market-improvements",
          title: "US Traffic Deaths Per Mile Driven Fell 95% From 1921 to 2019",
          description:
            "US traffic deaths per 100 million vehicle-miles traveled fell from 24.08 in 1921 to 1.11 in 2019 — a 95% reduction (Federal Highway Administration, Table FI-200). While government regulation (NHTSA standards from 1966, mandatory seatbelt laws) played a role, many critical safety innovations were market-driven: Volvo invented the three-point seatbelt in 1959 and made the patent free; Mercedes developed the crumple zone in 1952; multiple manufacturers competed on airbag technology before federal mandates. Product liability lawsuits also drove safety improvements — the Ford Pinto case in 1978 demonstrated that market accountability mechanisms punish safety failures.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "Federal Highway Administration, Highway Statistics 2023, Table FI-200; Insurance Institute for Highway Safety, fatality statistics yearly snapshot",
          sourceUrl: "https://www.fhwa.dot.gov/policyinformation/statistics/2023/fi200.cfm",
          reasoning:
            "FHWA and IIHS data is highly reliable and publicly available. The auto safety case shows a large, sustained safety improvement, though the interplay between regulation and market forces makes it hard to isolate the market effect, and the fatality series itself does not say which caused the decline. Directness is moderate because automobiles are a mature industry with clear liability attribution — unlike AI or social media where harms are diffuse and causation is harder to prove.",
        },
        {
          id: "social-media-mental-health-data",
          title: "Teen Persistent Sadness Rose 50% Between 2011-2021, Correlating with Smartphone Adoption",
          description:
            "CDC Youth Risk Behavior Survey data shows that the percentage of US high school students reporting persistent feelings of sadness or hopelessness rose from 28% in 2011 to 42% in 2021 — a 50% increase. Teen girls were disproportionately affected, with rates rising from 36% to 57%. Jonathan Haidt's research compilation shows this trend correlates strongly with smartphone adoption and social media use. The American Psychological Association's May 2023 health advisory was more cautious about the cause, stating that 'using social media is not inherently beneficial or harmful to young people.' No market mechanism corrected this harm over a full decade — platforms continued optimizing for engagement.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "CDC, Youth Risk Behavior Survey Data Summary & Trends Report: 2011-2021; American Psychological Association, Health Advisory on Social Media Use in Adolescence (May 2023)",
          sourceUrl: "https://www.cdc.gov/yrbs/dstr/pdf/YRBS_Data-Summary-Trends_Report2023_508.pdf",
          reasoning:
            "The CDC YRBS is a large-scale, nationally representative survey conducted biennially with strong methodology. The correlation with smartphone/social media adoption is robust, though causation remains debated (some researchers argue the rise reflects increased willingness to report mental health struggles). The key point for the regulation debate is that a decade of documented harm produced no market self-correction.",
        },
        {
          id: "gdpr-startup-impact",
          title: "GDPR Cut EU Tech Venture Deals ~18% and Removed a Third of Available Apps",
          description:
            "Two NBER studies document GDPR's disproportionate burden on smaller players. Jia, Jin & Wagman (NBER w25248, Marketing Science 2021) found that after GDPR's 2018 rollout, EU tech ventures saw a 17.6% reduction in the number of weekly venture deals and a 39.6% decrease in the amount raised in an average deal relative to US counterparts, with the effects most pervasive for ventures up to three years old. Separately, Janßen, Kesler, Kummer & Waldfogel (NBER w30028) found GDPR induced the exit of about one-third of available apps on the Google Play Store, with entry of new apps falling by half in the quarters after implementation. Large firms like Google and Facebook could absorb compliance costs that small competitors could not, raising barriers to entry — the opposite of GDPR's intended competitive effect.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source:
            "Jia, Jin & Wagman (NBER w25248 / Marketing Science 2021); Janßen, Kesler, Kummer & Waldfogel (NBER w30028)",
          sourceUrl: "https://www.nber.org/papers/w25248",
          reasoning:
            "Both NBER sources are credible peer-reviewed/working-paper studies, but the figures must be attributed precisely: the venture-investment decline (17.6% fewer weekly deals, 39.6% smaller average deals, per the working paper) comes from Jia-Jin-Wagman, while the one-third app-exit figure comes from the separate Janßen et al. Play Store study. The earlier widely-circulated '26% VC reduction' headline was an imprecise blend of these and has been challenged as overstating the GDPR-specific effect (confounders like Brexit uncertainty also affected EU investment). This evidence supports the e/acc argument that regulation entrenches incumbents — though GDPR has also been credited with reducing data breaches and giving consumers meaningful privacy controls.",
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
        "Democratic processes are structurally incapable of governing technologies they do not understand at the speed those technologies evolve. Congressional hearings on technology have repeatedly demonstrated fundamental ignorance — from Senator Ted Stevens describing the internet as 'a series of tubes' to legislators asking Mark Zuckerberg how Facebook makes money if it is free. The average age of US senators is 64, and fewer than 10% have technical backgrounds. The EU AI Act took 3 years to negotiate and was already outdated by the time it passed, failing to anticipate the generative AI revolution that occurred during its drafting. China's technocratic governance model has produced the world's most advanced AI surveillance state, but also the fastest infrastructure deployment, the largest renewable energy buildout, and competitive AI research — suggesting that technocratic speed has real advantages regardless of one's views on Chinese governance. The CRISPR governance debates show that the most productive research happens in jurisdictions with lighter regulation — He Jiankui's rogue embryo editing was condemned first by the scientific community's own summit, before a Chinese court sentenced him to three years in prison.",
      crux: {
        id: "governance-outcome-quality",
        title: "The Democratic vs. Expert Governance Outcome Test",
        question:
          "Does democratic oversight of technology produce better long-run outcomes than expert or market governance?",
        description:
          "If democratic deliberation produces better long-term outcomes than expert-driven development in technology governance — measured by safety, innovation, equitable distribution of benefits, and public trust — then democratic governance is justified despite its slower pace. If expert-driven or market-governed development consistently produces superior outcomes, the efficiency argument for technocratic governance holds.",
        methodology:
          "Compare outcomes across regulatory approaches for 5 technology domains (AI, gene editing, nuclear energy, internet governance, autonomous vehicles) across 3 governance models (democratic-regulatory like the EU, technocratic-state like China, and market-driven like the US). For each domain and model, measure: (1) innovation output (patents, publications, commercial deployments), (2) safety incidents per unit of deployment, (3) public trust levels, (4) equitable distribution of benefits (Gini coefficient of technology access), and (5) speed from research to deployment. Conduct a 10-year longitudinal comparison.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Outcomes in AI, gene editing, nuclear energy, internet governance and autonomous vehicles under EU-style, Chinese and US-style governance, compared on innovation output and safety record. Which mix counts as better is a weighting no comparison supplies.",
        },
        cost_to_verify:
          "$500K-1M (Multi-jurisdiction comparative policy study requiring international collaboration)",
        falsification: {
          supporter_flip:
            "If comparing democratic-regulatory, technocratic-state and market-driven models across AI, gene editing, nuclear energy, internet governance and autonomous vehicles found the democratic model matching the others on innovation while doing better on safety, equity and public trust, the case against democratic oversight would weaken.",
          skeptic_flip:
            "If more democratic rulebooks took as long as the EU AI Act's three years and arrived outdated, as critics said it did after missing the generative AI wave, while fewer than 10% of U.S. senators had technical backgrounds, the case for democratic control would weaken.",
          common_ground:
            "Both sides agree the EU AI Act, adopted in 2024 after three years of negotiation, is the world's first comprehensive AI law; one side reads it as proof democracies can govern technology, the other as proof they are too slow.",
          live_disagreement:
            "Whether democratic deliberation, slow as it is, yields better long-run outcomes in safety, equity and trust, or whether technologies evolve too fast for legislators and expert or market governance serves better.",
        },
      },
      evidence: [
        {
          id: "eu-ai-act-effects",
          title: "EU AI Act: First Comprehensive AI Law, but Criticized as Already Outdated",
          description:
            "The EU AI Act, proposed by the European Commission in April 2021 and adopted in June 2024, is described by the European Parliament as the world's first rules on AI. It bans certain uses (social scoring, real-time remote biometric identification in public spaces, with limited law-enforcement exceptions), puts obligations on high-risk systems, and sets transparency requirements for generative AI. Parliament added obligations for foundation models, which it called 'a new and fast-evolving development in the field of AI,' and for generative systems like ChatGPT in its June 2023 negotiating position, two years into the process. The Act becomes fully applicable 24 months after entry into force, and obligations for high-risk systems apply only after 36 months — by which time multiple generations of AI capabilities will have passed.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 9,
          },
          source: "European Parliament, 'EU AI Act: first regulation on artificial intelligence'; European Parliament press release, 'MEPs ready to negotiate first-ever rules for safe and transparent AI' (June 14, 2023)",
          sourceUrl: "https://www.europarl.europa.eu/topics/en/article/20230601STO93804/eu-ai-act-first-regulation-on-artificial-intelligence",
          reasoning:
            "The EU AI Act is the most direct real-world test case of democratic technology regulation. The fact that generative AI obligations had to be added two years into the process supports the e/acc argument that regulation cannot keep pace. However, it also demonstrates that democratic bodies can produce substantive governance frameworks. Directness is high because this is exactly the phenomenon under debate.",
        },
        {
          id: "china-tech-governance",
          title: "China's Technocratic Model: Rapid Deployment but Surveillance State Outcomes",
          description:
            "China's technocratic governance model has produced the world's largest 5G network (over 2.3 million base stations by 2023), the largest installed renewable energy capacity (over 1,200 GW), and competitive AI research (Stanford's 2023 AI Index found China leading in total AI journal, conference and repository publications, with the US still ahead in conference and repository citations). However, the same model produced the world's most extensive surveillance state — over 600 million CCTV cameras, social credit scoring, and, in Xinjiang, restrictions on privacy and movement alongside arbitrary detentions of Uyghurs that a 2022 UN Human Rights Office assessment said 'may constitute international crimes, in particular crimes against humanity.' This demonstrates the dual-use nature of technocratic speed: efficiency gains come at the cost of democratic accountability.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "Stanford HAI, AI Index Report 2023, Chapter 1: Research and Development; UN News, 'China responsible for serious human rights violations in Xinjiang province: UN human rights report' (Aug 31, 2022); International Energy Agency",
          sourceUrl: "https://hai.stanford.edu/ai-index/2023-ai-index-report/research-and-development",
          reasoning:
            "Stanford's HAI AI Index is a respected annual publication, and the UN assessment of Xinjiang carries institutional authority. The China example cuts both ways — it shows the benefits of technocratic speed and the dangers of unchecked deployment. Replicability is lower because cross-country comparisons involve many confounding variables beyond governance model.",
        },
        {
          id: "crispr-governance-debates",
          title: "CRISPR Governance: Scientific Self-Regulation vs. Democratic Oversight",
          description:
            "Norms for human genome editing have been set largely by scientific academies rather than legislatures. The U.S. National Academies' 2017 consensus report 'Human Genome Editing: Science, Ethics, and Governance' and international summits in 2015 and 2018 laid out when clinical uses could proceed. When He Jiankui's claim to have produced gene-edited twins surfaced at the 2018 summit, its organizing committee called the claim 'deeply disturbing' and said 'the procedure was irresponsible and failed to conform with international norms'; it did not call for a ban, saying instead that 'it is time to define a rigorous, responsible translational pathway toward such trials.' The limits of self-regulation showed in what followed: the experiment had already happened, and the sanction came from the state, when a Chinese court sentenced He to three years in prison for 'illegal medical practice.'",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "National Academies of Sciences, Engineering, and Medicine — Human Genome Editing: Science, Ethics, and Governance (2017); Statement by the Organizing Committee of the Second International Summit on Human Genome Editing (Nov 2018); Nature news, 'What CRISPR-baby prison sentences mean for research' (Jan 3, 2020)",
          sourceUrl: "https://www.nationalacademies.org/news/statement-by-the-organizing-committee-of-the-second-international-summit-on-human-genome-editing",
          reasoning:
            "The National Academies report and summit statement are primary sources. The CRISPR case provides evidence that scientific self-regulation can set norms for a powerful technology and respond within days, though the He Jiankui incident also demonstrated its limits: the norm was broken, and a court, not the academies, imposed the penalty. Replicability is lower because each technology domain has unique governance dynamics.",
        },
        {
          id: "open-source-movement-outcomes",
          title: "Open Source: Community-Governed Code Matched or Beat Proprietary Code on Defect Density",
          description:
            "The open-source software movement demonstrates that transparent, community-governed development can outperform proprietary alternatives in reliability and security. Linux powers 96% of the world's top 1 million web servers, 100% of the world's top 500 supercomputers, and the majority of cloud infrastructure. Coverity's 2013 Scan Open Source Report (released April 2014), covering 750 million lines of code, found an average defect density of 0.59 per 1,000 lines for open-source C/C++ projects using its service, against 0.72 for proprietary C/C++ code. Apache, Mozilla, and the Linux Foundation have governed massive software ecosystems without government regulation through community norms, code review processes, and meritocratic governance. This model influenced AI development: Meta's open-source Llama models, Stability AI's open models, and the Hugging Face ecosystem represent a self-governing alternative to both corporate secrecy and government regulation.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source: "Coverity (Synopsys), 'Coverity Scan Report Finds Open Source Software Quality Outpaces Proprietary Code for the First Time' (Apr 15, 2014); Linux Foundation; W3Techs",
          sourceUrl: "https://news.synopsys.com/2014-04-15-Coverity-Scan-Report-Finds-Open-Source-Software-Quality-Outpaces-Proprietary-Code-for-the-First-Time",
          reasoning:
            "The success of open source is empirically well-documented and represents a genuine third model of governance that is neither purely market-driven nor government-regulated. However, directness is lower because software code review is different from governing AI safety, biotech risks, or environmental externalities. Open-source governance works best when the 'product' can be inspected — it may not generalize to opaque or dual-use technologies.",
        },
        {
          id: "congressional-tech-illiteracy",
          title: "Congressional Hearings Reveal Fundamental Gaps in Legislators' Tech Understanding",
          description:
            "Multiple congressional hearings on technology have demonstrated significant knowledge gaps among legislators. During Mark Zuckerberg's 2018 Senate testimony, Senator Orrin Hatch asked 'how do you sustain a business model in which users do not pay for your service?' — revealing unfamiliarity with ad-supported business models. In TikTok hearings in 2023, multiple members displayed confusion about basic internet architecture. The Congressional Research Service's profile of the 118th Congress lists 9 engineers, 2 physicists, 2 chemists, 1 geologist and 6 software company executives among its 541 members and delegates, and puts the average senator's age at 64.0 years at the start of that Congress. The Office of Technology Assessment, which provided Congress with nonpartisan technical expertise, was defunded in 1995 and has not been restored despite multiple proposals.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "U.S. Senate Hearing 115-683, 'Facebook, Social Media Privacy, and the Use and Abuse of Data' (Apr 10, 2018); Congressional Research Service, 'Membership of the 118th Congress: A Profile' (R47470)",
          sourceUrl: "https://www.govinfo.gov/content/pkg/CHRG-115shrg37801/html/CHRG-115shrg37801.htm",
          reasoning:
            "Congressional hearing transcripts are public record and the anecdotes are widely documented. The defunding of the OTA is a significant structural failure. However, legislative ignorance about technical details does not necessarily mean democratic governance produces bad outcomes — legislators also lack medical expertise but healthcare regulation has clear benefits. The argument proves that Congress needs better technical advisory capacity, not necessarily that democratic governance should be abandoned.",
        },
      ],
    },
  ],
  references: [
    {
      title: "International AI Safety Report (January 2025) — arXiv:2501.17805",
      url: "https://arxiv.org/abs/2501.17805",
    },
    {
      title: "EU AI Act: First Regulation on Artificial Intelligence — European Parliament",
      url: "https://www.europarl.europa.eu/topics/en/article/20230601STO93804/eu-ai-act-first-regulation-on-artificial-intelligence",
    },
    {
      title: "Innovation in the Pharmaceutical Industry: New Estimates of R&D Costs (DiMasi, Grabowski & Hansen) — Journal of Health Economics / Tufts Center for the Study of Drug Development",
      url: "https://doi.org/10.1016/j.jhealeco.2016.01.012",
    },
    {
      title: "AI Index Report 2023, Chapter 1: Research and Development — Stanford HAI",
      url: "https://hai.stanford.edu/ai-index/2023-ai-index-report/research-and-development",
    },
    {
      title: "The Facebook Files — Wall Street Journal",
      url: "https://www.wsj.com/articles/the-facebook-files-11631713039",
    },
    {
      title: "Youth Risk Behavior Survey Data Summary & Trends Report: 2011-2021 — Centers for Disease Control and Prevention",
      url: "https://www.cdc.gov/yrbs/dstr/pdf/YRBS_Data-Summary-Trends_Report2023_508.pdf",
    },
    {
      title: "Half of US Population Exposed to Adverse Lead Levels in Early Childhood (McFarland, Hauer & Reuben) — Proceedings of the National Academy of Sciences",
      url: "https://www.pnas.org/doi/10.1073/pnas.2118631119",
    },
    {
      title: "Human Genome Editing: Science, Ethics, and Governance — National Academies of Sciences, Engineering, and Medicine",
      url: "https://www.nationalacademies.org/publications/24623",
    },
    {
      title: "The Short-Run Effects of GDPR on Technology Venture Investment (Jia, Jin & Wagman) — National Bureau of Economic Research",
      url: "https://www.nber.org/papers/w25248",
    },
    {
      title: "GDPR and the Lost Generation of Innovative Apps (Janßen, Kesler, Kummer & Waldfogel) — National Bureau of Economic Research",
      url: "https://www.nber.org/papers/w30028",
    },
    {
      title: "Nuclear Power in the USA — World Nuclear Association",
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
