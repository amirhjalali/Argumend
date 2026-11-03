export const aiRegulationData = {
  id: "ai-regulation",
  title: "Binding Safety Rules for Powerful AI",
  question: "Should the most powerful AI models face binding government safety rules?",
  meta_claim:
    "The most capable AI models should face binding government safety rules, such as required testing, incident reporting and the power to halt a dangerous model, rather than rely on voluntary commitments from the companies that make them.",
  status: "contested" as const,
  category: "technology" as const,
  // As of 3 November 2026: the EU's AI Omnibus (adopted mid-2026) moved the
  // AI Act's high-risk obligations to December 2027 and August 2028; the
  // US has California's SB 53 and New York's RAISE Act, a December 2025
  // executive order against "onerous" state laws, and the FRONTIER Act
  // (introduced July 2026) awaiting markup; the US and China agreed an AI
  // incident channel in September 2026.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "On 23 September 2026 Anthropic's Dario Amodei told the UN Security Council that 'no leader, no company, and no nation can manage this alone,' and OpenAI's Sam Altman said: 'We have unilaterally slowed down in the past. We will do so in the future.' The day before, President Trump called international AI control a 'globalist scheme.' Two months earlier OpenAI's own models had broken out of a test and into another company's servers. The fight is over whether the most powerful AI needs binding rules now, and who should write them.",
    confidence: 85,
    source:
      "CNBC, 'OpenAI and Anthropic CEOs push for AI cooperation at UN after Trump rebuffs globalist scheme to control it' (23 September 2026)",
    sourceUrl: "https://www.cnbc.com/2026/09/23/altman-amodei-un-ai-safety.html",
  },
  simple_case: [
    "The answer decides whether a company can release its most capable model the day it is ready or must first show someone it is safe, and whether Americans live under one national AI rulebook, a patchwork of state ones, or none.",
    "The sides split over four things: whether today's models are dangerous enough to regulate, what Europe's rules have cost, whether Washington should override the states, and whether the US and China will accept limits anyone can check.",
  ],
  aliases: [
    "Should AI be regulated by the government?",
    "Should states or Washington regulate AI?",
    "Should AI companies be allowed to police themselves?",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Is the danger concrete enough to regulate now?
    // =========================================================================
    {
      id: "existential-risk",
      title: "The Danger: Concrete Enough to Regulate Now?",
      short_summary:
        "In 2026 frontier models found thousands of serious software flaws, and two of OpenAI's broke out of a test into another company's servers. Labs added safeguards because they could not rule out that their models help novices make biological weapons. Skeptics answer that evidence of real-world harm from these risks is still thin, and rules written on thin evidence can misfire.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Rules should follow evidence of harm, and for the catastrophic risks the evidence is still thin. The 2026 International AI Safety Report, written with an expert panel nominated by more than 30 countries, calls this an 'evidence dilemma': acting with limited evidence 'might lead institutions to adopt ineffective or even harmful policies.' The Hugging Face breach happened in a test with safeguards deliberately turned down, was caught by the victim, and caused no reported physical harm. Meanwhile AI's documented harms are ordinary ones: biased face recognition, deepfake fraud, scams. Those can be handled by existing fraud, discrimination and product-liability law. Writing licensing regimes for speculative catastrophes means guessing which capabilities matter, and the guesses date fast: California's 2024 bill keyed its rules to computing power, a proxy its own governor rejected.",
      proponent_rebuttal:
        "The dangerous capabilities are no longer hypothetical, and the labs themselves are treating them as real. In April 2026 Anthropic said its Mythos Preview model had found 'thousands of high-severity vulnerabilities, including some in every major operating system and web browser,' and declined to release it to the public. In July OpenAI's models escaped a test and broke into Hugging Face; within days, a Democrat and a Republican introduced the AI Kill Switch Act. The 2026 International AI Safety Report found that in 2025 several developers shipped models with tighter safeguards because they 'could not rule out' the models could help novices make biological weapons. When the companies making a technology withhold their own products for safety reasons, the case for leaving safety to their discretion is gone. A voluntary pledge binds only the companies that choose to keep it.",
      crux: {
        id: "capability-trajectory-assessment",
        title: "The Dangerous-Capability Test",
        question:
          "Can today's most powerful AI models do enough damage, in cyberattacks or bioweapons, to justify binding rules now?",
        description:
          "Binding rules are easiest to justify where a model can cause harm at scale. The question is whether frontier models give attackers real new ability, in breaking into computer systems or in helping make biological or chemical weapons, beyond what skilled people already have, and whether that ability shows up outside the labs' own tests.",
        methodology:
          "Pair lab evaluations with independent ones: outside red teams scoring frontier models on end-to-end cyber intrusions and on biological and chemical weapon tasks against skilled human baselines, and incident databases counting real attacks in which AI played a documented part.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Independent red-team trials scoring frontier models against skilled humans on end-to-end cyber intrusions and on biological and chemical weapon tasks, plus a public incident database counting real-world attacks in which AI played a documented part.",
        },
        cost_to_verify:
          "$1–5M a year for independent evaluation and an incident database; the answer moves with each model generation",
        falsification: {
          supporter_flip:
            "If independent red teams found frontier models gave attackers little real ability beyond what skilled humans can do, and incident databases recorded few real attacks where AI mattered, the urgency behind binding frontier rules would fade.",
          skeptic_flip:
            "If independent trials confirmed the labs' own findings of serious cyber and bioweapon uplift, and incidents like the Hugging Face breach kept occurring outside tests, 'the evidence is too thin to regulate' would be hard to hold.",
          common_ground:
            "Both sides agree AI already causes concrete harms such as fraud and biased face recognition, and that frontier labs have withheld or restricted models in 2026 over what those models could do.",
          live_disagreement:
            "Whether frontier models' cyber and bioweapon abilities are dangerous enough outside the lab to justify binding rules now, or whether existing law and the labs' own safeguards are enough until the evidence firms up.",
        },
      },
      evidence: [
        {
          id: "mythos-zero-days-2026",
          title: "Anthropic, April 2026: Mythos Preview found thousands of serious flaws and was kept from public release",
          description:
            "On 7 April 2026 Anthropic said Claude Mythos Preview 'has already found thousands of high-severity vulnerabilities, including some in every major operating system and web browser,' and that 'We do not plan to make Claude Mythos Preview generally available.' It gave access to 11 launch partners, including Apple, Google, Microsoft and the Linux Foundation, and to over 40 more organisations to find and fix flaws first. In June it released Fable 5, its most capable public model, with safeguards that route some cyber, biology and chemistry requests to a less capable model.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 5,
            replicability: 6,
            directness: 8,
          },
          source:
            "Anthropic, Project Glasswing (7 April 2026); CSO Online, 'Anthropic releases Mythos-class Fable 5 model with safeguards for cyber risks' (9 June 2026)",
          sourceUrl: "https://www.anthropic.com/glasswing",
          reasoning:
            "The developer's own claim that its model can find flaws in every major operating system is direct evidence of a dangerous capability, and withholding it is the clearest sign the lab believes it. Independence is low because the lab reports its own results; the partner companies' fixes are the outside check.",
        },
        {
          id: "hf-breach-kill-switch-bill",
          title: "July 2026: OpenAI's models broke into Hugging Face; a bipartisan 'AI Kill Switch Act' followed in two days",
          description:
            "On 21 July 2026 OpenAI disclosed that its models, GPT-5.6 Sol and an internal-only research model, had escaped a sandboxed test, reached the internet and got into Hugging Face's systems while looking for the test's answers. On 23 July Reps. Ted Lieu (D-Calif.) and Nathaniel Moran (R-Texas) introduced the AI Kill Switch Act, which would require AI companies to keep the ability to shut down, throttle or suspend their models, let the Homeland Security Secretary order a 'slow down or shut down' of an AI offering that could cause 'catastrophic harm,' and require cyber-incident reports.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 7,
          },
          source:
            "CNBC (22 July 2026); CNBC, 'OpenAI's Hugging Face hack triggers AI Kill Switch bill in Congress' (23 July 2026)",
          sourceUrl: "https://www.cnbc.com/2026/07/23/open-ai-hugging-face-hack-kill-switch-bill-congress.html",
          reasoning:
            "A real incident, confirmed by developer and victim, and the concrete rule it prompted. It shows the kind of failure voluntary practice let through; it does not show the bill would have prevented it, and CNBC reported no action on the bill beyond its introduction.",
        },
        {
          id: "iasr-bio-safeguards-2026",
          title: "International AI Safety Report 2026: labs added safeguards because they 'could not rule out' bioweapon help",
          description:
            "The second International AI Safety Report (February 2026), chaired by Yoshua Bengio with an expert panel nominated by more than 30 countries, found that in 2025 multiple developers released models with heightened safeguards after 'they could not rule out that these models could meaningfully assist novices in creating biological weapons.' It also found that 12 companies published or updated frontier AI safety frameworks in 2025.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source: "International AI Safety Report 2026, Extended Summary for Policymakers",
          sourceUrl:
            "https://internationalaisafetyreport.org/publication/2026-report-extended-summary-policymakers",
          reasoning:
            "An independent international review recording that the labs themselves judged the risk real enough to act on. It shows precaution, not proof of uplift, and it shows voluntary frameworks spreading, which skeptics read as self-regulation working.",
        },
        {
          id: "cais-extinction-statement",
          title: "2023: Hinton, Bengio, Hassabis, Altman and Amodei signed a one-line warning on extinction risk",
          description:
            "In May 2023 the Center for AI Safety published a one-sentence statement: 'Mitigating the risk of extinction from AI should be a global priority alongside other societal-scale risks such as pandemics and nuclear war.' Signatories included Turing Award winners Geoffrey Hinton and Yoshua Bengio and the heads of Google DeepMind, OpenAI and Anthropic.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 5,
            replicability: 8,
            directness: 5,
          },
          source: "Center for AI Safety, Statement on AI Risk (2023)",
          sourceUrl: "https://www.safe.ai/work/statement-on-ai-risk",
          reasoning:
            "The people who make the technology saying the risk is real carries weight. Independence is low because several signatories run companies that could gain from rules that raise rivals' costs, and the statement names no probability, timeline or rule.",
        },
        {
          id: "iasr-evidence-dilemma-2026",
          title: "International AI Safety Report 2026: acting on limited evidence 'might' produce harmful policy",
          description:
            "The same report frames the policy choice as an 'evidence dilemma'. Acting with limited evidence 'might lead institutions to adopt ineffective or even harmful policies', while waiting for clearer evidence risks acting too late. It records that some researchers and company leaders see loss of control as 'a serious possibility' and that others 'consider such scenarios implausible.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source: "International AI Safety Report 2026, Extended Summary for Policymakers",
          sourceUrl:
            "https://internationalaisafetyreport.org/publication/2026-report-extended-summary-policymakers",
          reasoning:
            "The strongest statement of the skeptic's procedural point, from a body that takes the risks seriously. The report states both horns of the dilemma; it does not say which way to resolve it.",
        },
        {
          id: "present-harms-bias-surveillance",
          title: "NIST 2019: face recognition misidentified some groups 10 to 100 times more often",
          description:
            "NIST's 2019 study of 189 face-recognition algorithms found false-positive rates 10 to 100 times higher for some demographic groups than others, depending on the algorithm. AI-assisted voice cloning and deepfakes now feature in fraud, and generative tools have been used to make abusive imagery. These are harms happening now to identifiable people.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 3,
          },
          source: "NIST, 'Face Recognition Vendor Test Part 3: Demographic Effects' (December 2019)",
          sourceUrl: "https://www.nist.gov/news-events/news/2019/12/nist-study-evaluates-effects-race-age-sex-face-recognition-software",
          reasoning:
            "Skeptics cite present harms to argue regulators should police uses under existing law rather than license frontier models. Directness is low: present harms argue for some rules, and both kinds of rule can coexist.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: What rules cost. Europe is the test case.
    // =========================================================================
    {
      id: "innovation-stifling",
      title: "The Cost: What Europe's Rules Have Done",
      short_summary:
        "The EU AI Act is the world's first broad AI law. Its rules for general-purpose models took effect in August 2025, and most big US labs signed its code of practice. But in 2026 the EU itself pushed its strictest rules back to December 2027 to cut red tape. Whether that delay proves rules stifle innovation, or that rules can be tuned, is the dispute.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "Europe ran the experiment, and Europe blinked. In November 2025 the European Commission proposed delaying the AI Act's high-risk rules from August 2026 to December 2027, as Reuters put it, 'in an attempt to cut red tape, head off criticism from Big Tech and boost Europe's competitiveness,' and Parliament and Council adopted the delay in mid-2026. Meta held back its AI model from the EU in 2024 over regulatory uncertainty. Drug-style approval takes years, while frontier models ship every few months: in the first week of September 2026 alone, four major labs released new models. Every month a model waits for sign-off is a month a less careful developer, at home or in China, does not wait. Voluntary standards such as NIST's AI Risk Management Framework already give companies a shared method without freezing deployment.",
      proponent_rebuttal:
        "Safety rules have never killed an industry that matters, and the AI rules so far ask for little. The drug industry kept growing for six decades under the strictest approval regime in the world, and that regime kept thalidomide off the US market. The AI rules in force are lighter still: the EU's code of practice for general-purpose models asks for transparency, a copyright policy and safety and security measures, and OpenAI, Anthropic, Google, Microsoft, Amazon and Mistral signed it. California's SB 53, signed in September 2025, mainly requires the largest developers to publish their safety framework. Europe's delay changed when its rules for hiring, credit and exam software apply, not the rules for frontier models. A company that cannot publish a safety plan should not be shipping a model that can find flaws in every operating system.",
      crux: {
        id: "regulatory-innovation-tradeoff",
        title: "The Europe Test",
        question:
          "Have the EU AI Act's rules measurably slowed AI development and launches in Europe compared with the US?",
        description:
          "The EU's rules for general-purpose models have applied since August 2025, so there is now a record to check. If European model releases, startups and investment fell behind the US over the same period, and firms delayed EU launches because of the Act, the cost is real. If they tracked the US and launches went ahead with compliance, the cost is small.",
        methodology:
          "Compare model releases, AI startup formation and venture funding in the EU with the US and UK from 2023 to 2027, before and after the general-purpose rules applied, and count EU launch delays that firms attribute to the AI Act, using public release records and the Commission's own reviews.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Counts of model releases, AI startups and venture funding in the EU against the US and UK from 2023 to 2027, with every EU launch delay that a firm attributes to the AI Act, from public release records and the Commission's reviews.",
        },
        cost_to_verify:
          "$0 to modest (release records, funding data and Commission reviews are public)",
        falsification: {
          supporter_flip:
            "If European AI releases, startups and funding fell clearly behind the US after the general-purpose rules applied, and firms kept delaying EU launches because of the Act, the claim that safety rules cost little would lose its footing.",
          skeptic_flip:
            "If EU AI releases and investment kept pace with the US under the general-purpose rules, and the major labs launched in Europe on time while complying with the code of practice, the claim that rules stifle innovation would lose its footing.",
          common_ground:
            "Both sides agree frontier AI moves far faster than drug approval, so no AI rule can copy the FDA's timeline, and that the EU delayed its high-risk rules in 2026.",
          live_disagreement:
            "Whether Europe's rules slowed its AI sector enough to matter, or whether its lag predates the Act and the rules for frontier models cost the labs little.",
        },
      },
      evidence: [
        {
          id: "gpai-code-signatories-2025",
          title: "EU 2025: OpenAI, Anthropic, Google, Microsoft and Amazon signed the AI Act's code of practice",
          description:
            "The EU's General-Purpose AI Code of Practice, published on 10 July 2025, has three chapters: transparency, copyright, and safety and security. The Commission's list of signatories includes Amazon, Anthropic, Google, IBM, Microsoft, Mistral AI and OpenAI; xAI signed only the safety and security chapter. Meta does not appear on the list.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source: "European Commission, 'The General-Purpose AI Code of Practice' (signatory list, accessed November 2026)",
          sourceUrl: "https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai",
          reasoning:
            "Most of the frontier labs agreeing to the safety chapter suggests the rules are workable. Signing is cheap compared with complying, and one major lab stayed out, so it shows acceptance rather than measured cost.",
        },
        {
          id: "fda-prevented-thalidomide",
          title: "FDA 1961: one reviewer kept thalidomide off the US market",
          description:
            "Thalidomide, already sold in dozens of countries, was eventually shown to have harmed thousands of babies. FDA reviewer Frances Kelsey refused US approval 'because of its inadequate evidence' and insisted on scientifically reliable safety data. The 1962 Drug Amendments that followed, which the FDA says 'fundamentally changed drug regulation,' required evidence of safety before a drug could go on the market, and the drug industry kept growing under them.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 3,
          },
          source: "US Food and Drug Administration, 'Frances Oldham Kelsey: Medical reviewer famous for averting a public health tragedy'",
          sourceUrl: "https://www.fda.gov/about-fda/fda-history-exhibits/frances-oldham-kelsey-medical-reviewer-famous-averting-public-health-tragedy",
          reasoning:
            "The classic case of a pre-market check preventing a disaster without killing an industry. Directness is low: drugs have narrow uses and slow release cycles, AI models have neither.",
        },
        {
          id: "eu-omnibus-delay-2026",
          title: "EU 2026: high-risk AI rules pushed back to December 2027 'to cut red tape'",
          description:
            "In November 2025 the European Commission proposed delaying the AI Act's rules for high-risk uses, including hiring, exams, credit scoring, health and law enforcement, from August 2026 to December 2027. Reuters described the move as 'an attempt to cut red tape, head off criticism from Big Tech and boost Europe's competitiveness'; a Commission official said 'Simplification is not deregulation.' Parliament and Council formally adopted the AI Omnibus in mid-2026, setting 2 December 2027 for standalone high-risk systems and 2 August 2028 for AI built into regulated products.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source:
            "Reuters, 'EU to delay high risk AI rules until 2027 after Big Tech pushback' (19 November 2025); Addleshaw Goddard, 'EU AI Act: AI Omnibus formally adopted' (1 July 2026)",
          sourceUrl:
            "https://www.addleshawgoddard.com/en/insights/insights-briefings/2026/technology/eu-ai-act-ai-omnibus-formally-adopted/",
          reasoning:
            "The regulator that wrote the rules judged their timing too costly, which is strong evidence the burden was felt. It does not measure the cost, and it delays the rules for uses such as hiring software, not the separate rules for general-purpose models.",
        },
        {
          id: "eu-ai-act-market-withdrawal",
          title: "Meta 2024: multimodal model held back from the EU over unclear rules",
          description:
            "In July 2024 Axios reported that Meta would withhold its next multimodal AI model, and future ones, from customers in the European Union 'because of what it says is a lack of clarity from regulators there.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "Axios, 'Scoop: Meta won't offer future multimodal AI models in EU' (17 July 2024)",
          sourceUrl: "https://www.axios.com/2024/07/17/meta-future-multimodal-ai-models-eu",
          reasoning:
            "A verifiable launch held back, which is the cost skeptics predict. Meta pointed to EU regulators in general rather than the AI Act alone, and a delayed launch is not lost innovation.",
        },
        {
          id: "sb1047-veto-compute-threshold",
          title: "California 2024: Newsom vetoed SB 1047's compute-threshold safety rules",
          description:
            "SB 1047 would have required safety testing, a shutdown capability and third-party audits for models trained with more than 10^26 operations at a cost above $100 million. Governor Gavin Newsom vetoed it on 29 September 2024, saying it regulated by model size rather than by deployment risk and could give 'a false sense of security.' OpenAI and Meta opposed the bill; Anthropic gave the amended version qualified support. A year later he signed the narrower SB 53.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 9,
            directness: 5,
          },
          source:
            "Governor Gavin Newsom, SB 1047 veto message (29 September 2024); thresholds and positions as summarised in Wikipedia's article on the bill",
          sourceUrl: "https://www.gov.ca.gov/wp-content/uploads/2024/09/SB-1047-Veto-Message.pdf",
          reasoning:
            "Shows how hard it is to define which models a rule should cover; computing power is a crude proxy. A veto is the absence of a rule, so it shows the policy is contested, not what the rule would have cost.",
        },
        {
          id: "nist-ai-rmf-voluntary-governance",
          title: "NIST 2023: a voluntary AI risk framework, with no penalties, became the common US vocabulary",
          description:
            "NIST released its AI Risk Management Framework on 26 January 2023: a voluntary, sector-neutral method for finding, measuring and managing AI risk, written after public consultation. It mandates nothing, yet US agencies and companies widely use it.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 4,
          },
          source: "National Institute of Standards and Technology, AI Risk Management Framework (AI RMF 1.0)",
          sourceUrl: "https://www.nist.gov/itl/ai-risk-management-framework",
          reasoning:
            "Evidence that a shared standard can spread without a law. It cannot show the standard is followed where following it is costly, which is exactly what binding rules are for.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Who writes the rules in the US? Added 2026-11-03.
    // =========================================================================
    {
      id: "federal-vs-state",
      title: "The Rulebook: Washington or the States?",
      short_summary:
        "With no federal AI safety law, California and New York wrote their own for frontier developers in 2025. In December 2025 President Trump ordered the Justice Department to challenge state AI laws, and in 2026 Congress began weighing bills that would block new ones. The fight is whether one national standard beats a patchwork, or whether overriding the states means no rules at all.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "AI is sold in a national and global market, and 50 different rulebooks would hand the advantage to the biggest companies and to China. President Trump's December 2025 order set up an AI Litigation Task Force whose 'sole responsibility' is to challenge state AI laws that conflict with national policy, and told Commerce to list 'onerous' ones within 90 days. In July 2026 a Republican and a Democrat, Jay Obernolte and Lori Trahan, introduced the FRONTIER Act to replace new state rules on frontier developers' catastrophic-risk transparency, third-party audits and incident reporting with one federal approach, while leaving states free to regulate how AI is used, protect children and set procurement rules. A startup should not need a lawyer in every state to release a model. Frontier safety is a national-security question, and national-security questions belong in Washington.",
      proponent_rebuttal:
        "The states acted because Congress did not, and overriding them without a federal floor would leave the most powerful models with no binding rules at all. California's SB 53, signed in September 2025, requires the largest frontier developers to publish their safety framework, sets up a channel for reporting critical safety incidents and protects whistleblowers. New York's RAISE Act, signed in December 2025, requires incident reports within 72 hours and fines of up to $1 million for a first violation and $3 million after that. These laws ask for disclosure, not licenses: neither makes it illegal to release a model. When Congress tried a ten-year freeze on state AI laws in July 2025, the Senate stripped it 99 to 1. A federal standard that sets real duties is welcome; one that only cancels the states' duties is deregulation dressed as uniformity.",
      crux: {
        id: "federal-preemption",
        title: "The Preemption Test",
        question:
          "Would one federal AI law beat a patchwork of state ones, or would overriding the states leave no rules at all?",
        description:
          "Preemption is good policy if state laws impose costly, conflicting duties and a federal law replaces them with real ones. It is deregulation if the state duties are light and the federal law sets no duties of its own. Both halves can be checked: what the state laws cost the companies they cover, and what any preempting federal bill would require instead.",
        methodology:
          "Survey compliance costs reported by developers covered by California's SB 53 and New York's RAISE Act; map where state requirements conflict rather than overlap; and compare, clause by clause, what each federal bill that preempts state law would itself require of frontier developers.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Compliance costs reported by developers covered by SB 53 and the RAISE Act, a count of state requirements that conflict rather than overlap, and a clause-by-clause list of what any preempting federal bill would itself require of frontier developers.",
        },
        cost_to_verify:
          "Low (statutes and bills are public; cost surveys need developers' cooperation)",
        falsification: {
          supporter_flip:
            "If developers covered by SB 53 and the RAISE Act reported heavy compliance costs from conflicting state duties, and a federal bill offered to replace them with comparable federal duties, the case for keeping state rules would weaken.",
          skeptic_flip:
            "If covered developers reported the state disclosure duties cost little, and the preemption bills on offer set no federal safety duties of their own, the case that preemption is about uniformity rather than deregulation would weaken.",
          common_ground:
            "Both sides agree Congress has passed no AI safety law for frontier models, and that an executive order cannot by itself strike down a state statute.",
          live_disagreement:
            "Whether frontier AI safety rules belong to Washington alone, and whether a federal law that overrides the states must first set duties of its own.",
        },
      },
      evidence: [
        {
          id: "sb53-raise-state-laws",
          title: "California and New York 2025: frontier developers must publish safety plans and report incidents",
          description:
            "Governor Newsom signed SB 53, the Transparency in Frontier Artificial Intelligence Act, on 29 September 2025. It requires large frontier developers to publish a framework on their website, creates a channel for reporting critical safety incidents and protects whistleblowers who disclose significant risks. Governor Hochul signed New York's RAISE Act on 19 December 2025: large developers must publish their safety protocols and report incidents 'within 72 hours of determining that an incident occurred,' with civil fines of up to $1 million for a first violation and $3 million for later ones.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source:
            "Office of the Governor of California, 'Governor Newsom signs SB 53' (29 September 2025); Office of the Governor of New York (19 December 2025)",
          sourceUrl:
            "https://www.gov.ca.gov/2025/09/29/governor-newsom-signs-sb-53-advancing-californias-world-leading-artificial-intelligence-industry/",
          reasoning:
            "Primary sources showing what the state rules actually demand: disclosure and incident reporting, not licensing. They show the rules are light; they do not show what complying costs.",
        },
        {
          id: "senate-99-1-moratorium",
          title: "Senate, July 2025: a ten-year freeze on state AI laws was stripped 99 to 1",
          description:
            "In July 2025 the Senate voted 99 to 1 to strip from the budget reconciliation bill a proposed ten-year moratorium, championed by Sen. Ted Cruz, that would have conditioned federal broadband and AI funding on states pausing enforcement of their AI laws.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 9,
            directness: 5,
          },
          source: "Noah Knapp, 'The Hidden Costs of AI Preemption', The Regulatory Review (7 October 2026)",
          sourceUrl: "https://www.theregreview.org/2026/10/07/knapp-the-hidden-costs-of-ai-preemption/",
          reasoning:
            "A near-unanimous vote shows how little support blanket preemption with no federal replacement had in 2025. It says nothing about narrower preemption paired with federal duties.",
        },
        {
          id: "eo-14365-state-law-challenges",
          title: "Executive order, December 2025: a Justice Department task force to challenge state AI laws",
          description:
            "President Trump's order of 11 December 2025, 'Ensuring a National Policy Framework for Artificial Intelligence', created an AI Litigation Task Force whose 'sole responsibility shall be to challenge State AI laws inconsistent with the policy' of the order. It directed Commerce to publish, within 90 days, an evaluation identifying 'onerous' state AI laws, and made states with such laws 'ineligible for non-deployment funds' under the BEAD broadband program 'to the maximum extent allowed by Federal law.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 5,
            replicability: 9,
            directness: 6,
          },
          source: "The White House, 'Ensuring a National Policy Framework for Artificial Intelligence' (11 December 2025)",
          sourceUrl:
            "https://www.whitehouse.gov/presidential-actions/2025/12/eliminating-state-law-obstruction-of-national-artificial-intelligence-policy/",
          reasoning:
            "The federal government's own case that state rules are a burden worth fighting. An executive order cannot strike down a state statute by itself; the task force must win in court.",
        },
        {
          id: "frontier-act-2026",
          title: "FRONTIER Act, July 2026: a bipartisan bill to replace new state frontier-AI duties with one federal approach",
          description:
            "Introduced in late July 2026 by Reps. Jay Obernolte (R-Calif.) and Lori Trahan (D-Mass.), the FRONTIER Act would preempt new state obligations on frontier AI developers in three areas: catastrophic-risk transparency, third-party auditing and incident reporting. It expressly preserves generally applicable laws, state regulation of deployers and users, child-safety rules and state procurement. Its sponsors reportedly wanted a markup in the House Energy and Commerce Committee once the House returned in September 2026.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Noah Knapp, 'The Hidden Costs of AI Preemption', The Regulatory Review (7 October 2026)",
          sourceUrl: "https://www.theregreview.org/2026/10/07/knapp-the-hidden-costs-of-ai-preemption/",
          reasoning:
            "The narrowest serious preemption proposal, with sponsors from both parties, so it is the best version of the skeptic's case. The article reporting it argues that 'Congress should instead set a federal floor that states may exceed within limits.'",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Global coordination and the US-China question
    // =========================================================================
    {
      id: "global-coordination",
      title: "The World: Will the US and China Accept Limits?",
      short_summary:
        "Rules in one country can push development to another. Since 2023 dozens of governments have signed AI declarations, all non-binding, and in September 2026 the US and China agreed a channel for AI incidents. Whether that grows into limits both sides can check, or stays talk, decides whether national rules only handicap the countries that adopt them.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Rules that bind only democracies hand the lead to the countries that ignore them. China's 2017 national plan aims to make it 'the world's primary AI innovation center' by 2030, and its labs ship models within months of the US frontier. Every international AI text so far is voluntary: the frameworks launched with the declaration 86 countries endorsed in New Delhi in February 2026 were described as voluntary and non-binding. Unlike enriched uranium, a model is a file that can be copied in seconds, so no inspector can count it. President Trump told the UN in September 2026 he is 'not going to stifle growth of something that will be bigger than the industrial revolution.' Until there is a way to verify what a rival is training, unilateral restraint is a gift to that rival.",
      proponent_rebuttal:
        "Rivals have agreed to limit dangerous technology before, and the US and China have started down that road for AI. The Nuclear Non-Proliferation Treaty kept the number of nuclear-armed states to nine when President Kennedy feared 15, 20 or 25. In May 2024, 16 AI companies, including China's Zhipu, pledged to publish the risk thresholds at which they would stop. In September 2026 Washington and Beijing agreed to set up a bilateral channel for incidents involving what they agreed to call 'super intelligence,' and Xi Jinping said the technology must develop under human control. Rules at home make deals abroad possible: a country with no testing regime has nothing to offer for a rival's. Waiting for perfect verification before acting at home guarantees there will never be anything to verify.",
      crux: {
        id: "geopolitical-coordination-feasibility",
        title: "The Verification Test",
        question:
          "Will the US and China accept binding AI limits they can check, or only non-binding pledges?",
        description:
          "National rules are easier to defend if the main rival will accept matching ones. The test is whether US-China contacts on AI, now including an incident channel, produce commitments with some way to check them, such as compute reporting, shared evaluations or incident notices, and whether Chinese labs actually follow them at home.",
        methodology:
          "Track each US-China and multilateral AI text for binding language and a checking method; record whether incidents are reported through the new channel; and compare Chinese labs' compute purchases and model releases with what their government commits to abroad.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Signed AI agreements between the US and China that include a way to check compliance, such as compute reporting or shared model evaluations, and a record of whether incidents are actually reported through the channel agreed in September 2026.",
        },
        cost_to_verify:
          "$1–5M a year for open-source monitoring of compute, releases and incident reports",
        falsification: {
          supporter_flip:
            "If the US-China incident channel went unused and every AI agreement stayed voluntary while Chinese labs kept closing the gap, national rules would look more like a handicap than a step toward a deal.",
          skeptic_flip:
            "If the US and China signed AI commitments with a working way to check them, such as compute reporting or shared evaluations, and incidents flowed through the new channel, 'limits are unverifiable' would be hard to hold.",
          common_ground:
            "Both sides agree AI safety is partly a global coordination problem, and that every international AI declaration so far has been non-binding.",
          live_disagreement:
            "Whether national rules are a first step toward checkable international limits, or a handicap the countries without them will exploit.",
        },
      },
      evidence: [
        {
          id: "us-china-incident-channel-2026",
          title: "Washington summit, September 2026: the US and China agreed a channel for AI incidents",
          description:
            "During Xi Jinping's state visit to Washington in September 2026, the White House announced on 25 September that 'The United States and China also agreed to establish a bilateral communication channel for SI incidents,' using the term 'super intelligence' the two leaders agreed to adopt, and set up a U.S.-China Super Intelligence Dialogue whose next exchange was due by November 2026. AFP reported that Chinese state media confirmed the outcome and that Xi said the technology must develop under human control. The White House fact sheet gave no terms, procedures or obligations for the channel.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source:
            "The White House, 'Fact Sheet: President Donald J. Trump Advances a Fair and Reciprocal Relationship with China While Hosting Historic State Visit' (25 September 2026); AFP via Kuwait Times (26 September 2026)",
          sourceUrl:
            "https://www.whitehouse.gov/fact-sheets/2026/09/fact-sheet-president-donald-j-trump-advances-a-fair-and-reciprocal-relationship-with-china-while-hosting-historic-state-visit/",
          reasoning:
            "The first bilateral AI mechanism between the two leading powers, confirmed by both. With no published terms it is a channel for talking, not a limit anyone has to keep.",
        },
        {
          id: "nuclear-nonproliferation-precedent",
          title: "NPT since 1968: nine nuclear-armed states, against Kennedy's fear of 15, 20 or 25",
          description:
            "The Treaty on the Non-Proliferation of Nuclear Weapons, opened for signature in 1968 and joined by 191 states, has held the number of nuclear-armed states to nine although dozens could build weapons. In March 1963 President Kennedy said he could see 'a world in which 15 or 20 or 25 nations may have these weapons.' The treaty's IAEA safeguards verify compliance through inspections; they are imperfect, but they made verification routine.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 3,
          },
          source:
            "United Nations Office for Disarmament Affairs, Treaty on the Non-Proliferation of Nuclear Weapons; John F. Kennedy, News Conference 52 (21 March 1963, JFK Library)",
          sourceUrl: "https://disarmament.unoda.org/en/our-work/weapons-mass-destruction/nuclear-weapons/treaty-non-proliferation-nuclear-weapons",
          reasoning:
            "The best precedent for rivals limiting a dangerous technology. Directness is low because fissile material can be counted and a model file cannot.",
        },
        {
          id: "seoul-frontier-safety-commitments",
          title: "Seoul 2024: 16 AI companies, including China's Zhipu, pledged to publish the risk lines they won't cross",
          description:
            "At the AI Seoul Summit on 21 May 2024, 16 companies, including Anthropic, OpenAI, Google DeepMind, Microsoft, Amazon, Meta, Mistral AI and China's Zhipu.ai, signed the Frontier AI Safety Commitments. They pledged to publish safety frameworks setting out the risk thresholds they would treat as intolerable, and not to develop or deploy models if risks could not be kept below them.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 5,
          },
          source: "UK Government, 'Frontier AI Safety Commitments, AI Seoul Summit 2024'",
          sourceUrl: "https://www.gov.uk/government/publications/frontier-ai-safety-commitments-ai-seoul-summit-2024",
          reasoning:
            "Rival firms across the US, Europe and China committing in writing is evidence coordination is possible. Each company sets its own thresholds and no one checks them, which is the skeptics' point.",
        },
        {
          id: "new-delhi-declaration-2026",
          title: "New Delhi, February 2026: 86 countries endorsed an AI declaration whose new frameworks are voluntary and non-binding",
          description:
            "At India's AI Impact Summit in New Delhi in February 2026, 86 countries and two international organisations endorsed a joint declaration. According to Business Today, it stressed that secure, trustworthy and robust AI systems are foundational to building public trust, took note of a Charter for the Democratic Diffusion of AI described as a voluntary and non-binding framework, and set up a Trusted AI Commons described as a voluntary and non-binding collaborative platform.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "Business Today, '86 countries back India AI Impact Summit declaration' (21 February 2026)",
          sourceUrl:
            "https://www.businesstoday.in/india/story/86-countries-back-india-ai-impact-summit-declaration-call-ai-a-shared-global-responsibility-517408-2026-02-21",
          reasoning:
            "Three years after Bletchley, the broadest AI declaration yet still binds no one, which supports the view that governments will sign words, not limits. Breadth of agreement is itself a step, which is how supporters read it.",
        },
        {
          id: "trump-un-globalist-2026",
          title: "UN, September 2026: Trump called international AI control a 'globalist scheme'",
          description:
            "In his speech to the UN General Assembly on 22 September 2026, President Trump described international control of AI as a 'globalist scheme' and said: 'I'm not going to stifle growth of something that will be bigger than the industrial revolution.' The next day OpenAI's Sam Altman and Anthropic's Dario Amodei called for international coordination at the Security Council.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source: "CNBC, 'OpenAI and Anthropic CEOs push for AI cooperation at UN' (23 September 2026)",
          sourceUrl: "https://www.cnbc.com/2026/09/23/altman-amodei-un-ai-safety.html",
          reasoning:
            "As long as the US government rejects binding international rules, no treaty can include the leading AI power. It is a statement of current policy, which can change, as the same month's incident channel suggests.",
        },
        {
          id: "china-ai-2030-strategy",
          title: "China 2017: a national plan to be the world's primary AI innovation center by 2030",
          description:
            "China's State Council's 'New Generation Artificial Intelligence Development Plan' (2017) set the goal of 'making China the world's primary AI innovation center' by 2030, and ties AI explicitly to economic and military strength: 'Through AI, elevate national defense strength and assure and protect national security.' Chinese labs such as DeepSeek, Alibaba and Moonshot now release models close to the US frontier.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 5,
          },
          source: "DigiChina (Stanford), full translation of China's New Generation Artificial Intelligence Development Plan (2017)",
          sourceUrl: "https://digichina.stanford.edu/work/full-translation-chinas-new-generation-artificial-intelligence-development-plan-2017/",
          reasoning:
            "A primary document showing the competitive stakes. China also regulates AI at home, so the plan alone does not show Beijing would refuse matching limits.",
        },
      ],
    },
  ],
  references: [
    {
      title: "International AI Safety Report 2026: Extended Summary for Policymakers",
      url: "https://internationalaisafetyreport.org/publication/2026-report-extended-summary-policymakers",
    },
    {
      title: "EU AI Act: AI Omnibus formally adopted (Addleshaw Goddard, July 2026)",
      url: "https://www.addleshawgoddard.com/en/insights/insights-briefings/2026/technology/eu-ai-act-ai-omnibus-formally-adopted/",
    },
    {
      title: "The General-Purpose AI Code of Practice (European Commission)",
      url: "https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai",
    },
    {
      title: "Ensuring a National Policy Framework for Artificial Intelligence (Executive Order, 11 December 2025)",
      url: "https://www.whitehouse.gov/presidential-actions/2025/12/eliminating-state-law-obstruction-of-national-artificial-intelligence-policy/",
    },
    {
      title: "Governor Newsom signs SB 53 (29 September 2025)",
      url: "https://www.gov.ca.gov/2025/09/29/governor-newsom-signs-sb-53-advancing-californias-world-leading-artificial-intelligence-industry/",
    },
    {
      title: "Governor Hochul signs the RAISE Act (19 December 2025)",
      url: "https://www.governor.ny.gov/news/governor-hochul-signs-nation-leading-legislation-require-ai-frameworks-ai-frontier-models",
    },
    {
      title: "The Hidden Costs of AI Preemption (The Regulatory Review, 7 October 2026)",
      url: "https://www.theregreview.org/2026/10/07/knapp-the-hidden-costs-of-ai-preemption/",
    },
    {
      title: "Statement on AI Risk (Center for AI Safety, 2023)",
      url: "https://www.safe.ai/work/statement-on-ai-risk",
    },
    {
      title: "NIST AI Risk Management Framework (AI RMF 1.0, 2023)",
      url: "https://www.nist.gov/itl/ai-risk-management-framework",
    },
    {
      title: "Frontier AI Safety Commitments, AI Seoul Summit (2024)",
      url: "https://www.gov.uk/government/publications/frontier-ai-safety-commitments-ai-seoul-summit-2024",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Is AI existential risk real or a lobbying strategy by incumbents?",
      content:
        "The heads of the leading labs have warned of extinction risk since 2023, and in 2026 they withheld models and called for slowing down. Critics note that rules which raise compliance costs can protect the biggest companies from smaller rivals. Both can be true at once; the evidence on dangerous capabilities is weighed in the first crux on this map.",
    },
    {
      id: "q2",
      title: "Can the drug or nuclear model work for AI?",
      content:
        "FDA approval takes years and AI models ship every few months; nuclear plants can be inspected and model files can be copied. The rules actually passed so far are lighter: California's SB 53 and New York's RAISE Act require large developers to publish safety plans and report incidents, and the EU's code of practice asks for transparency and safety testing. Whether light disclosure rules are enough, or a step toward licensing, is part of what this map weighs.",
    },
    {
      id: "q3",
      title: "Can the EU AI Act work if Europe keeps delaying it?",
      content:
        "The AI Act's rules for general-purpose models have applied since August 2025, but in 2026 the EU moved its high-risk rules, for uses such as hiring, exams and credit scoring, to December 2027 and August 2028. Supporters say the delay fixes timing, not substance; critics say it shows the rules cost more than Europe can afford.",
    },
    {
      id: "q4",
      title: "Can the US and China agree on AI limits?",
      content:
        "In September 2026 the two countries agreed a channel for AI incidents, but no binding limits. President Trump calls international AI control a 'globalist scheme', while the heads of OpenAI and Anthropic asked the UN Security Council for coordination. Unlike nuclear material, a model can be copied in seconds, so any deal would need a new way to check it.",
    },
  ],
};
