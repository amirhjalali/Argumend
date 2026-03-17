import type { Topic } from "@/lib/schemas/topic";

export const aiRegulationData = {
  id: "ai-regulation",
  title: "Should AI Be Regulated Like Drugs or Nuclear Energy?",
  meta_claim:
    "Artificial intelligence development poses existential-level risks that require immediate government regulation comparable to pharmaceutical or nuclear oversight.",
  status: "contested" as const,
  category: "technology" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Existential & Catastrophic Risk
    // =========================================================================
    {
      id: "existential-risk",
      title: "Existential & Catastrophic Risk",
      short_summary:
        "Leading AI researchers have warned that advanced AI could pose existential risk to humanity. The 2023 CAIS statement signed by hundreds of researchers called AI extinction risk a 'global priority.' But critics argue existential risk claims are speculative, unfalsifiable, and distract from present harms like bias, surveillance, and labor displacement.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Existential risk from AI is speculative and unfalsifiable, making it a poor basis for regulation. No current AI system — including GPT-4, Claude, or Gemini — demonstrates anything resembling autonomous goal-seeking, self-preservation, or the capacity to resist human control. The 'existential risk' narrative is promoted by a small group of researchers and AI company executives who benefit from regulatory moats that protect incumbents from competition. Meanwhile, AI is already causing measurable harm today: algorithmic bias in criminal sentencing, mass surveillance, deepfake-enabled fraud, and job displacement. Regulating hypothetical superintelligence diverts attention and resources from addressing these concrete, present harms. As AI researcher Timnit Gebru has argued, 'focusing on existential risk is a way to avoid accountability for current harms.'",
      proponent_rebuttal:
        "The precautionary principle demands that we regulate before catastrophe, not after. In 2023, the Center for AI Safety released a one-sentence statement — 'Mitigating the risk of extinction from AI should be a global priority alongside other societal-scale risks such as pandemics and nuclear war' — signed by Geoffrey Hinton, Yoshua Bengio, Demis Hassabis, Sam Altman, Dario Amodei, and hundreds of leading researchers. These are not fringe voices; they are the architects of the technology. AI capabilities are advancing exponentially: GPT-4 passed the bar exam in the 90th percentile; autonomous AI agents can now write code, browse the internet, and operate computers. The gap between current AI and systems that could pose catastrophic risk is narrowing faster than any regulatory framework can keep pace. We regulate nuclear technology not because every reactor melts down, but because the consequences of failure are irreversible.",
      crux: {
        id: "capability-trajectory-assessment",
        title: "The Capability Trajectory Extrapolation Test",
        description:
          "If AI capabilities continue scaling on current trajectories — improving on benchmarks at the current exponential rate — we can project when systems will reach capability thresholds relevant to catastrophic risk (autonomous weapons design, cyber-offense capabilities, ability to resist shutdown). If scaling plateaus or hits diminishing returns, the timeline for catastrophic-capable AI extends dramatically, reducing the urgency for preemptive regulation.",
        methodology:
          "Track AI performance on a standardized suite of capability benchmarks — including GPQA, MATH, ARC-AGI, SWE-bench, and novel adversarial evaluations — measured quarterly over a 3-year period. Fit exponential, linear, and logarithmic growth curves. Simultaneously evaluate whether each new frontier model demonstrates genuinely novel capabilities (tool use, long-horizon planning, deception) or marginal improvements on existing tasks. Publish results as open data for independent verification.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-2M (Longitudinal benchmark evaluation requiring compute access to frontier models)",
      },
      evidence: [
        {
          id: "cais-extinction-statement",
          title: "Hundreds of AI Researchers Sign Statement on Extinction Risk (2023)",
          description:
            "In May 2023, the Center for AI Safety published a statement reading: 'Mitigating the risk of extinction from AI should be a global priority alongside other societal-scale risks such as pandemics and nuclear war.' Signatories included Geoffrey Hinton (Turing Award winner, 'Godfather of AI'), Yoshua Bengio (Turing Award winner), Demis Hassabis (DeepMind CEO), Sam Altman (OpenAI CEO), Dario Amodei (Anthropic CEO), and over 350 researchers. This represented the first time such a broad coalition of AI leaders publicly endorsed extinction-level concern.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 8,
            directness: 7,
          },
          source: "Center for AI Safety",
          sourceUrl: "https://www.safe.ai/work/statement-on-ai-risk",
          reasoning:
            "The signatories represent the highest credentialed voices in AI research. However, independence is lower because many signatories lead companies that would benefit from regulatory moats limiting competition (Altman, Hassabis, Amodei). The statement is deliberately vague — 'should be a global priority' does not specify probability, timeline, or mechanism — limiting its directness as evidence.",
        },
        {
          id: "ai-capabilities-exponential-growth",
          title: "AI Benchmark Performance Is Improving Exponentially (2020-2025)",
          description:
            "AI performance on standardized benchmarks has improved at exponential rates. GPT-4 (2023) scored in the 90th percentile on the bar exam, up from GPT-3.5's 10th percentile. On the MATH benchmark (competition-level mathematics), accuracy improved from 6.9% (GPT-3) to 52.9% (GPT-4) to 85%+ (Claude 3.5/GPT-4o, 2024). On coding benchmarks like SWE-bench, AI systems progressed from solving 1.4% of real GitHub issues (2023) to over 50% (2025). Autonomous AI agents can now browse the web, write and execute code, and operate computer interfaces.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 9,
            directness: 6,
          },
          source: "Epoch AI; Stanford HAI AI Index 2025; arXiv benchmark papers",
          sourceUrl: "https://aiindex.stanford.edu/report/",
          reasoning:
            "Benchmark improvements are independently verifiable and represent real capability gains. However, directness is lower because benchmark performance does not necessarily translate to the autonomous goal-seeking, strategic deception, or self-improvement capabilities that underpin catastrophic risk scenarios. The gap between 'very capable tool' and 'existential threat' remains large and poorly defined.",
        },
        {
          id: "present-harms-bias-surveillance",
          title: "AI Is Causing Measurable Harm Today: Bias, Deepfakes, and Surveillance",
          description:
            "AI systems are already causing documented harms that regulation should address. Facial recognition systems show error rates 10-100x higher for dark-skinned women than white men (NIST 2019). AI-generated deepfakes have been used for election manipulation, nonconsensual pornography, and financial fraud — the FBI reported $12.5 billion in AI-enabled cybercrime in 2023. Predictive policing algorithms reinforce racial bias in criminal justice. Generative AI has been used to produce child sexual abuse material. These concrete, present harms affect millions of people today, unlike speculative existential risks.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "NIST; FBI IC3; MIT Media Lab; Human Rights Watch",
          sourceUrl: "https://www.nist.gov/news-events/news/2019/12/nist-study-evaluates-effects-race-age-sex-face-recognition-software",
          reasoning:
            "These harms are documented by authoritative independent sources and represent real, measurable suffering. The directness score reflects a subtle point: this evidence argues for regulating present harms, not necessarily against regulating existential risk. Both can be true simultaneously. But it challenges the prioritization of speculative future risks over concrete current ones.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Innovation & Economic Impact
    // =========================================================================
    {
      id: "innovation-stifling",
      title: "Innovation & Economic Impact",
      short_summary:
        "Heavy AI regulation could stifle a technology projected to add $15.7 trillion to the global economy by 2030. But the pharmaceutical and nuclear industries demonstrate that safety regulation can coexist with innovation — the question is whether the analogy holds for software that evolves at digital speed.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "The pharmaceutical and nuclear regulatory analogies are fundamentally flawed. Drug approval takes 10-15 years and costs $2.6 billion per drug through the FDA pipeline. Nuclear licensing takes 5-10 years. AI models are developed and deployed in months. Imposing FDA-style pre-deployment testing would freeze AI development at current capabilities while China, which has no intention of handicapping its AI industry, races ahead. The EU AI Act has already caused major AI companies to delay or withhold products from European markets — Meta restricted its AI features in the EU, and Google delayed Bard's European launch. McKinsey estimates AI could add $13-15.7 trillion to global GDP by 2030; premature regulation would sacrifice this economic potential and cede leadership to authoritarian regimes with no safety commitments.",
      proponent_rebuttal:
        "The pharmaceutical industry generates $1.5 trillion in annual revenue while operating under the most stringent regulatory framework in the world. FDA regulation did not kill pharmaceutical innovation — it channeled it toward safe, effective products and prevented another thalidomide disaster. Nuclear energy powers 20% of US electricity under NRC oversight. The argument that regulation kills innovation is empirically false in every industry where it has been implemented. AI regulation need not require 10-year approval cycles — it could mandate pre-deployment safety testing for frontier models above certain capability thresholds, independent audits for high-risk applications, and incident reporting systems. The cost of not regulating — deepfake elections, autonomous weapons, AI-enabled bioweapons — could dwarf any regulatory drag on GDP.",
      crux: {
        id: "regulatory-innovation-tradeoff",
        title: "The Regulation-Innovation Impact Assessment",
        description:
          "If pharmaceutical-style regulation has demonstrably slowed drug innovation (fewer drugs per dollar spent, longer time-to-market, critical treatments delayed), the analogy warns against applying the same framework to AI. If pharmaceutical regulation maintained high innovation rates while preventing harm, the model may be transferable.",
        methodology:
          "Compare innovation metrics in regulated vs. unregulated periods: (1) new drug approvals per decade before and after the 1962 Kefauver-Harris Amendment, (2) nuclear plant construction rates before and after the NRC's founding, (3) AI product deployment rates in the EU (under AI Act) vs. US (less regulated) vs. China for the same 24-month period. Measure both innovation output and safety incidents in each regime.",
        verification_status: "verified" as const,
        cost_to_verify:
          "$0 (FDA approval data, NRC records, and AI product launches are publicly available)",
      },
      evidence: [
        {
          id: "mckinsey-ai-economic-potential",
          title: "McKinsey: AI Could Add $13-15.7 Trillion to Global GDP by 2030",
          description:
            "McKinsey Global Institute estimated in 2023 that generative AI alone could add $2.6-$4.4 trillion annually in economic value across industries, on top of the $11-17.7 trillion from other AI applications. The largest impacts are projected in customer operations, marketing, software engineering, and R&D. Goldman Sachs estimated AI could raise global GDP by 7% over a 10-year period and automate 25% of current work tasks. These projections assume continued rapid deployment without significant regulatory friction.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 7,
          },
          source: "McKinsey Global Institute; Goldman Sachs",
          sourceUrl: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier",
          reasoning:
            "McKinsey and Goldman Sachs are credible institutions, but economic projections 7+ years out are inherently speculative (low replicability). Independence is lower because consulting firms benefit from AI adoption hype. The projections assume a specific deployment trajectory that regulation might alter, but they do not prove that regulation would eliminate the economic gains rather than moderate them.",
        },
        {
          id: "eu-ai-act-market-withdrawal",
          title: "EU AI Act Causes Companies to Delay or Withdraw AI Products from Europe",
          description:
            "Following the passage of the EU AI Act in 2024 — the world's most comprehensive AI regulation — several major companies delayed or restricted AI features in Europe. Meta initially declined to launch its AI assistant in the EU. Google delayed Bard's European launch by months. Apple delayed Apple Intelligence features in the EU into 2025. Smaller AI startups cited compliance costs of $100K-$500K as prohibitive for market entry. The European AI ecosystem argued it was being disadvantaged relative to US and Chinese competitors.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "Reuters; Politico Europe; European Digital SME Alliance",
          sourceUrl: "https://www.reuters.com/technology/meta-wont-launch-its-ai-model-eu-due-regulatory-concerns-2024-07-18/",
          reasoning:
            "Product delays and market withdrawals are verifiable facts that directly demonstrate the innovation-chilling effect of AI regulation. However, these may represent temporary adjustment costs rather than permanent harm, and the EU market remains large enough that companies will likely adapt. The long-term innovation impact is still unclear.",
        },
        {
          id: "fda-prevented-thalidomide",
          title: "FDA Regulation Prevented the Thalidomide Disaster in the US (1961)",
          description:
            "The most cited success of pharmaceutical regulation is the thalidomide case. The drug caused severe birth defects in over 10,000 children in 46 countries where it was approved with minimal oversight. FDA reviewer Dr. Frances Kelsey blocked US approval by demanding additional safety data, preventing the catastrophe in America. This single regulatory decision is credited with saving thousands of children. The 1962 Kefauver-Harris Amendment that followed required drugs to demonstrate both safety and efficacy before approval. Despite these requirements, the pharmaceutical industry grew from $6 billion in 1962 to over $1.5 trillion today.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "FDA; NIH; The Lancet",
          sourceUrl: "https://www.fda.gov/about-fda/histories-product-regulation/frances-oldham-kelsey-medical-reviewer-famous-averting-drug-disaster",
          reasoning:
            "The thalidomide case is a historically documented, independently verified instance where pre-market regulation prevented catastrophic harm while the industry continued to thrive. Directness is somewhat lower because the pharmaceutical analogy may not perfectly transfer to AI — drugs have bounded use cases while AI is a general-purpose technology. But it powerfully demonstrates that regulation and innovation can coexist.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Global Coordination & Geopolitics
    // =========================================================================
    {
      id: "global-coordination",
      title: "Global Coordination & Geopolitical Competition",
      short_summary:
        "AI safety is inherently a global coordination problem — unilateral regulation by democratic nations could handicap them while authoritarian regimes like China race ahead unconstrained. But the nuclear nonproliferation regime and the Montreal Protocol show that global coordination on existential technologies is possible.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Any AI regulation that democracies adopt unilaterally will be ineffective and self-defeating. China has declared its intention to lead the world in AI by 2030 and is investing over $15 billion annually in AI development with no plans for safety constraints comparable to Western proposals. If the US imposes pre-deployment testing, licensing requirements, or compute thresholds that slow development, China captures the lead in a technology that will define military, economic, and intelligence dominance for the 21st century. Xi Jinping has explicitly stated that AI is a 'strategic technology' central to national power. There is no credible mechanism for enforcing AI safety norms on China or Russia, making unilateral Western regulation a form of strategic self-harm.",
      proponent_rebuttal:
        "The nuclear nonproliferation regime — imperfect as it is — has kept the number of nuclear-armed states to nine despite dozens having the technical capability to build weapons. The Montreal Protocol successfully coordinated 197 nations to phase out ozone-depleting chemicals. The 2023 Bletchley Park AI Safety Summit, attended by 28 nations including China, and the 2024 Seoul AI Safety Summit demonstrate that international AI governance is achievable. Furthermore, the US leads in frontier AI capability — Anthropic, OpenAI, Google DeepMind, and Meta are all American companies. Setting safety standards from a position of strength creates norms that others follow, as happened with nuclear safety and internet governance standards. If the US abdicates safety leadership, no one else will fill the vacuum.",
      crux: {
        id: "geopolitical-coordination-feasibility",
        title: "The International Regime Feasibility Assessment",
        description:
          "If China and other non-aligned nations are willing to participate in binding AI governance frameworks (as they did at Bletchley Park for non-binding discussions), international coordination is feasible. If China's participation is purely performative and it continues unrestrained AI development domestically, unilateral Western regulation becomes a competitive handicap.",
        methodology:
          "Track China's domestic AI governance actions independently from its international commitments. Compare: (1) actual enforcement of China's own AI regulations (Interim Measures for Generative AI, Deep Synthesis Provisions) against their stated scope, (2) compute investments and frontier model releases relative to Western-regulated counterparts, (3) military AI deployment pace. Use satellite imagery of Chinese AI data centers, patent filings, and compute procurement data to independently verify domestic activity versus international commitments.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$1-5M (Open-source intelligence analysis of Chinese AI development combining satellite imagery, patent data, and compute procurement analysis)",
      },
      evidence: [
        {
          id: "bletchley-park-summit",
          title: "28 Nations (Including China) Sign Bletchley Declaration on AI Safety (2023)",
          description:
            "In November 2023, 28 nations including the US, UK, EU member states, and China signed the Bletchley Declaration, acknowledging the potential for 'serious, even catastrophic, harm' from frontier AI and committing to international cooperation on safety. This was followed by the Seoul AI Safety Summit in 2024, where 16 leading AI companies signed voluntary safety commitments. While these agreements are non-binding, they represent the first international consensus that AI safety requires global coordination.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          source: "UK Government; AI Safety Summit 2023",
          sourceUrl: "https://www.gov.uk/government/publications/ai-safety-summit-2023-the-bletchley-declaration",
          reasoning:
            "The Bletchley Declaration is a verified governmental document signed by 28 nations. However, directness is lower because non-binding declarations do not constitute enforceable regulation. China's signature may be diplomatic signaling rather than a genuine commitment to constrain its AI development. The gap between declaration and implementation is the critical uncertainty.",
        },
        {
          id: "china-ai-2030-strategy",
          title: "China's 'New Generation AI Development Plan' Targets Global AI Leadership by 2030",
          description:
            "China's State Council published the 'New Generation Artificial Intelligence Development Plan' in 2017, setting explicit targets: become a global AI innovation center by 2025, achieve major AI breakthroughs by 2030, and become the world's primary AI power by 2030. China invested an estimated $15 billion in AI R&D in 2023 and graduates 3x more STEM PhDs annually than the US. Chinese AI labs (DeepSeek, Baidu, Alibaba) have released frontier-competitive models. The plan explicitly links AI dominance to military and geopolitical power.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "State Council of China; Center for Security and Emerging Technology, Georgetown",
          sourceUrl: "https://cset.georgetown.edu/publication/full-translation-chinas-new-generation-artificial-intelligence-development-plan/",
          reasoning:
            "China's AI strategy is a publicly available government document, and its investment levels are tracked by independent research institutions. The evidence directly supports the concern that unilateral Western regulation creates a competitive disadvantage. However, China has also implemented its own AI regulations domestically, complicating the narrative that it develops AI without any constraints.",
        },
        {
          id: "nuclear-nonproliferation-precedent",
          title: "Nuclear Nonproliferation Treaty: Imperfect but Effective Global Coordination",
          description:
            "The Treaty on the Non-Proliferation of Nuclear Weapons (NPT), signed in 1968 and now ratified by 191 states, has limited the number of nuclear-armed states to nine despite dozens having the technical capability. President Kennedy predicted 25-30 nuclear states by the 1970s. The IAEA inspection regime, while imperfect (it failed to detect Iraq's and Libya's programs early enough), has created norms and verification mechanisms that significantly slowed proliferation. The NPT demonstrates that global coordination on existential technologies is difficult but achievable.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 6,
          },
          source: "United Nations Office for Disarmament Affairs; IAEA; Bulletin of the Atomic Scientists",
          sourceUrl: "https://disarmament.unoda.org/wmd/nuclear/npt/",
          reasoning:
            "The NPT is one of history's most successful arms control agreements, well-documented by independent international organizations. However, directness is lower because the analogy between nuclear weapons (physical, countable, trackable) and AI models (digital, copyable, rapidly evolving) is imperfect. AI regulation may require fundamentally different verification mechanisms than nuclear inspections.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Statement on AI Risk — Center for AI Safety (2023)",
      url: "https://www.safe.ai/work/statement-on-ai-risk",
    },
    {
      title: "The EU AI Act — European Parliament (2024)",
      url: "https://www.europarl.europa.eu/topics/en/article/20230601STO93804/eu-ai-act-first-regulation-on-artificial-intelligence",
    },
    {
      title: "Stanford HAI Artificial Intelligence Index Report 2025",
      url: "https://aiindex.stanford.edu/report/",
    },
    {
      title: "The Bletchley Declaration — UK Government AI Safety Summit (2023)",
      url: "https://www.gov.uk/government/publications/ai-safety-summit-2023-the-bletchley-declaration",
    },
    {
      title: "China's New Generation AI Development Plan — CSET Translation",
      url: "https://cset.georgetown.edu/publication/full-translation-chinas-new-generation-artificial-intelligence-development-plan/",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Is AI existential risk real or a lobbying strategy by incumbents?",
      content:
        "Hundreds of top AI researchers signed a statement warning of extinction risk, but many signatories lead companies that would benefit from regulatory moats. Are existential warnings genuine scientific concern, strategic positioning to limit competition, or both? How do we evaluate a risk that is by definition unprecedented?",
    },
    {
      id: "q2",
      title: "Can the pharmaceutical/nuclear regulatory model work for AI?",
      content:
        "FDA approval takes 10-15 years; AI models ship in months. Nuclear plants are physical and inspectable; AI models are digital and copyable. The EU AI Act has already caused companies to withdraw products from Europe. Is the analogy between AI and pharmaceuticals/nuclear energy fundamentally flawed, or can regulatory frameworks be adapted to digital-speed innovation?",
    },
    {
      id: "q3",
      title: "Can international AI governance succeed where other global coordination has?",
      content:
        "The Bletchley Declaration included China, but China's domestic AI strategy targets global dominance by 2030 with $15 billion in annual investment. The NPT limited nuclear proliferation against expectations, but AI is harder to track than enriched uranium. Is global AI coordination achievable, or will it devolve into a lowest-common-denominator agreement that constrains democracies while authoritarian regimes race ahead?",
    },
  ],
};
