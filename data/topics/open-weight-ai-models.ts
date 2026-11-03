export const openWeightAiModelsData = {
  id: "open-weight-ai-models",
  title: "Releasing Open-Weight Frontier AI Models",
  question:
    "Does publishing the weights of frontier AI models do more good than harm?",
  meta_claim:
    "Openly releasing the weights of powerful frontier AI models does more good than harm: wider access, outside safety research, self-hosted defence and competition with Chinese AI outweigh the extra help it gives malicious actors.",
  status: "contested" as const,
  category: "technology" as const,
  // As of 3 November 2026: Epoch AI measures the best open-weight models
  // about four months behind the closed frontier (May 2026); the strongest
  // open models are Chinese (DeepSeek V4, Kimi, GLM, Qwen); Hugging Face
  // contained the July 2026 OpenAI-agent intrusion with GLM 5.2 after closed
  // models' guardrails refused to help.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "When OpenAI's test models broke into Hugging Face's servers in July 2026, its defenders first asked closed frontier models to help analyse the attack, and the models' guardrails refused because they 'couldn't determine that we were trying to defend versus attacking.' Hugging Face then contained the intrusion 'very quickly' with GLM 5.2, a Chinese model whose weights anyone can download and run in-house. The fight is over whether that kind of open access helps defenders and researchers more than attackers, now that released weights can never be recalled.",
    confidence: 84,
    source:
      "CNBC, 'How a Chinese AI model stopped OpenAI's unprecedented cyber attack' (24 July 2026)",
    sourceUrl: "https://www.cnbc.com/2026/07/24/chinese-ai-model-openai-cyber-attack.html",
  },
  simple_case: [
    "The answer decides whether the most capable AI stays on a few companies' servers, where it can be watched and switched off, or sits on anyone's computer, where it can be studied, adapted and misused with no one watching.",
    "The sides split over four things: how much real help a stripped open model gives an attacker, what follows from the fact that weights cannot be recalled, how much of openness's benefit needs full downloads rather than gated access, and whether US restraint matters while Chinese labs release anyway.",
  ],
  aliases: [
    "Should frontier AI models be released open-weight?",
    "Should AI models be open source?",
    "Are open-source AI models dangerous?",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Catastrophic Misuse & Marginal Uplift
    // =========================================================================
    {
      id: "marginal-uplift",
      title: "The Attacker: How Much Does an Open Model Really Help?",
      short_summary:
        "Safety training on open weights can be stripped cheaply, so the question is what a stripped model adds for someone who wants to cause mass harm. Controlled trials so far found little help with bioweapon planning, but they tested older models, and open models now trail the closed frontier by only about four months.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Once weights are public, anyone can strip the safety training for little money and ask the model anything, with no one watching. The closed labs themselves now treat the danger as real: the 2026 International AI Safety Report found that in 2025 several developers added safeguards to new models because they 'could not rule out' the models could help novices make biological weapons. An open model cannot keep such safeguards. 'Elicitation attacks' let an attacker use a guarded closed model's harmless-looking answers to train an open model, recovering about 40% of the gap on hazardous chemistry tasks without ever asking a harmful question. And the gap is short: Epoch AI finds the best open models have trailed the closed frontier by about four months on average since January 2026. In April Anthropic kept its Mythos Preview, which found flaws in every major operating system, from general release. Four months is not long to wait for an open model with that ability.",
      proponent_rebuttal:
        "The best controlled evidence finds little real help for would-be attackers. In RAND's red-team trial, teams planning a mock biological attack with an AI model and the internet produced plans no more viable than teams with the internet alone. Epoch AI's review of the labs' own biorisk tests concluded they 'do not provide strong evidence that LLMs can enable amateurs to develop bioweapons,' though its authors add that the risks are plausible; hands-on lab skill and laboratory access remain hurdles a text model does not supply. When OpenAI fine-tuned its open gpt-oss model to be as dangerous as possible before release, it still fell short of OpenAI's own closed o3. What matters is what a release adds beyond what is already out there, and for most models that is small. The elicitation result cuts the other way too: it shows the leak runs through closed models' answers, so locking up open weights does not close it.",
      crux: {
        id: "marginal-uplift-test",
        title: "The Marginal-Uplift Test",
        question:
          "Do safety-stripped open models give bad actors real help on dangerous tasks beyond what search provides?",
        description:
          "The decisive question is whether an open-weight model measurably increases a malicious actor's ability to cause mass-casualty harm compared with search engines, textbooks and existing closed models. If a stripped open model gives no significant help on end-to-end dangerous tasks over that baseline, the misuse case against release weakens; if it does, irreversibility makes release uniquely dangerous.",
        methodology:
          "Run controlled red-team uplift studies: recruit matched cohorts of novices and domain experts, give one arm internet and literature access and the other a safety-stripped open model, and score them on non-hazardous proxy tasks (WMDP-style bio, chem and cyber benchmarks, end-to-end capture-the-flag tasks). Repeat with each new open model to chart the uplift curve over time.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Controlled red-team uplift trials repeated on each new open model: matched novices and experts, one arm with internet and literature only and one with a safety-stripped open model, scored on end-to-end bio, chem and cyber proxy tasks.",
        },
        cost_to_verify:
          "$1-5M (controlled human-subject uplift trials with biosecurity and cyber experts, repeated across model generations)",
        falsification: {
          supporter_flip:
            "If a rigorous controlled trial found a safety-stripped open model giving novices a significant, end-to-end uplift on bio or cyber tasks over an internet-and-literature control, reversing the RAND result on a current model, the case for release would lose its footing.",
          skeptic_flip:
            "If new controlled trials on 2026 open models matched the RAND result and Epoch AI's review, finding no amateur uplift over search and literature, with lab skill and materials still the bottleneck, 'open weights obviously uplift bioterrorists' would be hard to hold.",
          common_ground:
            "Both sides agree release-time safety training can be cheaply stripped from open weights, and that the controlled uplift trials done so far tested models older than today's.",
          live_disagreement:
            "Whether a current safety-stripped open model gives significant extra help on end-to-end dangerous tasks over a search-and-literature baseline, which only repeated controlled trials across model generations can chart.",
        },
      },
      evidence: [
        {
          id: "rand-red-team-no-uplift",
          title: "RAND 2024: AI-assisted bioattack plans were no more viable than internet-only plans",
          description:
            "RAND assigned matched teams, role-playing malicious non-state actors, to plan a biological attack; one arm had an AI model plus the internet, the other only the internet. RAND found 'no statistically significant difference in the viability of plans generated with or without LLM assistance,' and concluded that biological-attack planning 'currently lies beyond the capability frontier of LLMs as assistive tools.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 6,
          },
          source: "RAND RRA2977-2, 'The Operational Risks of AI in Large-Scale Biological Attacks: Results of a Red-Team Study' (2024)",
          sourceUrl: "https://www.rand.org/pubs/research_reports/RRA2977-2.html",
          reasoning:
            "The closest thing to the trial the crux calls for, and independent. Its authors flag the limit: it tested the existing generation of models in 2023 and did not measure how far the frontier was from the knowledge an attack needs, so it says little about 2026 open models.",
        },
        {
          id: "biorisk-evals-weak-signal",
          title: "Epoch AI: the labs' biorisk tests 'do not provide strong evidence' of amateur uplift",
          description:
            "Epoch AI's June 2025 review of AI labs' biorisk evaluations concluded they 'do not provide strong evidence that LLMs can enable amateurs to develop bioweapons,' mainly because the tests reveal little, though what they do show is that the risks are plausible; the authors judged Anthropic largely justified in raising its protections. The tests barely measure hands-on lab skill or access to laboratory infrastructure, and the authors say they can mislead in both directions, so no demonstrated uplift is not proof of safety.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source: "Epoch AI, 'Do the Biorisk Evaluations of AI Labs Actually Measure the Risk of Developing Bioweapons?'",
          sourceUrl: "https://epoch.ai/gradient-updates/do-the-biorisk-evaluations-of-ai-labs-actually-measure-the-risk-of-developing-bioweapons",
          reasoning:
            "An independent reading of the labs' own data, aimed squarely at the crux. Its authors' own view, that the risks are plausible and the tests say little either way, is why the weight stops short of the top.",
        },
        {
          id: "iasr-bio-safeguards-open",
          title: "International AI Safety Report 2026: labs added bio safeguards because they 'could not rule out' novice uplift",
          description:
            "The 2026 International AI Safety Report, led by Yoshua Bengio, found that in 2025 multiple AI developers released new models with heightened safeguards after 'they could not rule out that these models could meaningfully assist novices in creating biological weapons.' Those safeguards sit on the developers' servers.",
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
            "The developers with the most data judged the risk too real to rule out, and server-side safeguards are exactly what open weights cannot carry. It records precaution, not measured uplift.",
        },
        {
          id: "tamper-resistant-safeguards-fail",
          title: "Qi, Henderson et al. 2024: 'robust' open-weight safeguards were far weaker than claimed",
          description:
            "The 'Tamper-Resistant Safeguards' paper proposed a method (TAR) to make refusals survive adversarial fine-tuning. A follow-up, 'On Evaluating the Durability of Safeguards', showed that judging such durability is 'exceedingly difficult and can easily mislead,' and that purportedly robust safeguards including TAR are far weaker than claimed once tested properly. Cheap downstream fine-tuning can restore capabilities a lab removed before release.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Tamper-Resistant Safeguards for Open-Weight LLMs (arXiv 2408.00761); On Evaluating the Durability of Safeguards (arXiv 2412.07097)",
          sourceUrl: "https://arxiv.org/pdf/2408.00761",
          reasoning:
            "Reproducible experiments showing an open model's guardrails can be removed. That the guardrails come off does not show what the model then adds in the real world.",
        },
        {
          id: "elicitation-attack",
          title: "Kaunismaa et al. 2026: closed models' harmless answers recovered about 40% of the gap in an open model",
          description:
            "In 'elicitation attacks', an attacker asks a safeguarded closed model questions in fields next to a harmful task, collects its answers and fine-tunes an open model on them, never asking anything directly harmful. On hazardous chemical synthesis and processing tasks, fine-tuning Llama 3.3 70B this way recovered about 39% of the gap between the base model and a jailbroken Claude 3.5 Sonnet (about 40% across the paper's tests), and the attack grew stronger with a more capable closed model and more data.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source: "J. Kaunismaa et al., 'Eliciting Harmful Capabilities by Fine-Tuning On Safeguarded Outputs' (arXiv:2601.13528, January 2026)",
          sourceUrl: "https://arxiv.org/abs/2601.13528",
          reasoning:
            "A preprint with a stated metric, and it undercuts 'the closed model already knows this, so the open one adds nothing.' Some authors work at a frontier lab whose models were used, and it covers one domain.",
        },
        {
          id: "open-model-capability-trajectory",
          title: "Epoch AI, May 2026: the best open models have trailed the closed frontier by about four months",
          description:
            "Epoch AI found that 'since January 2026, the most capable open-weight models have lagged frontier closed models by an average of four months' on its capabilities index, a gap of about 8 points, 'similar to the gap between GPT-5 and GPT-5.5.' Moonshot's Kimi K2.6 led its open-weight list. Testing DeepSeek's V4-Pro, released as open weights in April 2026, NIST's Center for AI Standards and Innovation measured it about eight months behind the US frontier and called it 'the most capable PRC AI model evaluated by CAISI to date.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source: "Epoch AI, data insight on the open-closed capabilities gap (29 May 2026); NIST CAISI, 'CAISI Evaluation of DeepSeek V4 Pro' (1 May 2026)",
          sourceUrl: "https://epoch.ai/data-insights/open-closed-eci-gap",
          reasoning:
            "Two independent measures agree the lag is months, not years, so whatever the closed frontier can do today, an open model may do soon. General capability is not misuse capability, which keeps directness down.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Irreversibility of Release
    // =========================================================================
    {
      id: "irreversibility",
      title: "The One-Way Door: What Follows from 'No Recall'?",
      short_summary:
        "A closed model can be patched or switched off; released weights can be copied and run offline forever. Both sides accept that. The dispute is what it implies: a higher bar before release, or rules aimed at the people who misuse a model.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Open-weight release is a one-way door. The US Commerce Department's NTIA acknowledges that harms from open models are 'difficult to undo once the weights are released.' A closed model that turns out to be dangerous can be taken offline, rate-limited or patched on the server; an open one stays in the wild, mirrored on torrents and offline drives. Meta learned this in 2023, when weights it gave only to approved researchers were public within a week. Because safety training on open weights can be stripped, the release decision is the only control that lasts. That puts the burden of caution at the moment of release, when you are making a permanent bet on a capability you cannot yet fully test.",
      proponent_rebuttal:
        "Irreversibility is real, but it points to regulating misuse, not banning release. If weights cannot be recalled, controls on the model are the wrong lever; the right one is the point of harm, where actors, intent and damage can be seen and where law enforcement and liability already work. Europe's revised product-liability rules, which cover AI systems as products, already treat someone who substantially modifies a product outside the maker's control and puts it back on the market as its manufacturer, liable for the harm. Open-source advocates warn that treating every capable model as a permanent weapon leads to restricting ever more basic layers of the stack. Even the 2025 US AI Action Plan, which backs open models, pairs them with government capacity to evaluate frontier risks before and after release.",
      crux: {
        id: "reversibility-test",
        title: "The Recall Test",
        question:
          "Since released weights can't be recalled, should release face a higher bar, or should rules target misuse?",
        description:
          "Whether a release can be undone is a technical question with a known answer: once weights are released and mirrored, no licence, takedown or patch removes them from someone running them offline. The live dispute is the policy that follows, a higher bar at release or rules aimed at misuse, which the technical fact informs but does not decide.",
        methodology:
          "Survey every proposed recall mechanism: licence revocation, takedown notices to hosting platforms, 'unlearning' patches and kill switches. For each, test whether it removes capability from an actor who already downloaded the weights and runs them offline, and check the record of past releases, such as LLaMA's 2023 leak, for any that were successfully reversed.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "A survey of every proposed recall mechanism (licence revocation, hosting takedowns, unlearning patches, kill switches), testing whether any removes capability from someone already running the weights offline. Where to set the bar for release is a value choice.",
        },
        cost_to_verify:
          "$0 (established by the NTIA report, the documented LLaMA leak, and the fact that copied files cannot be un-copied)",
        falsification: {
          supporter_flip:
            "If more gated releases escaped their gates the way LLaMA's 2023 weights spread across torrents within about a week, the permanence of release would weigh more heavily against open publication.",
          skeptic_flip:
            "If licence revocation, hosting takedowns or 'unlearning' patches proved able to remove capability from an actor running downloaded weights offline, irreversibility would no longer ground the case for caution.",
          common_ground:
            "Both sides agree that once weights are released and mirrored they cannot be technically recalled, and that downstream fine-tuning can restore removed capabilities.",
          live_disagreement:
            "Whether irreversibility justifies a uniquely high bar at the release decision, or a shift to rules on use, such as liability and law enforcement, where intent and harm can be seen.",
        },
      },
      evidence: [
        {
          id: "ntia-irreversibility",
          title: "NTIA 2024: harms from open weights are 'difficult to undo', but no restrictions recommended yet",
          description:
            "The US Commerce Department's NTIA report on 'Dual-Use Foundation Models with Widely Available Weights' recognises that 'harms from open models are difficult to undo once the weights are released' and that 'it may be impossible to wholly remove' a capability once it appears in open weights. It did not recommend restricting current open models, instead recommending 'that the federal government actively monitor and maintain the capacity' to respond to emerging risks.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "NTIA Open Model Weights Report: Recommendations (July 2024)",
          sourceUrl: "https://www.ntia.gov/programs-and-initiatives/artificial-intelligence/open-model-weights-report/policy-approaches-recommendations/recommendations",
          reasoning:
            "The US government's own analysis, with no commercial stake. Both camps cite it: restrictionists for the fact, the pro-open camp for the recommendation not to restrict.",
        },
        {
          id: "llama-leak-precedent",
          title: "Meta 2023: LLaMA weights meant for approved researchers were public within a week",
          description:
            "Meta distributed its original LLaMA model to approved researchers in early 2023. The weights leaked publicly within a week and spread across torrents and mirrors, freely available regardless of Meta's intent. Meta released Llama 2 openly by default afterwards.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "The Verge (8 March 2023), on the LLaMA leak",
          sourceUrl: "https://www.theverge.com/2023/3/8/23629362/meta-ai-language-model-llama-leak-online-misuse",
          reasoning:
            "An undisputed event showing even a gated release can escape. It speaks to containment, not to whether the leaked capability caused harm.",
        },
        {
          id: "use-based-liability-regime",
          title: "EU product-liability rules: whoever substantially modifies and re-releases a model can be liable as its 'manufacturer'",
          description:
            "The EU's revised Product Liability Directive (2024/2853) treats software, including AI systems, as a product, and provides that 'Any natural or legal person that substantially modifies a product outside the manufacturer's control and thereafter makes it available on the market or puts it into service shall be considered to be a manufacturer of that product.' On that reading, a downstream actor who substantially modifies a released model, for instance by stripping its safeguards, and puts it into service can be the one liable.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Directive (EU) 2024/2853 on liability for defective products (23 October 2024), Article 8",
          sourceUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202402853",
          reasoning:
            "Shows a working legal alternative to gating releases is already law. Restrictionists answer that liability after the fact is little comfort against an irreversible mass-casualty event.",
        },
        {
          id: "ai-action-plan-precaution",
          title: "US AI Action Plan 2025: open models backed, paired with government risk evaluation",
          description:
            "The July 2025 'America's AI Action Plan' endorsed open-weight models as a strategic asset and, alongside that, called for building government capacity to evaluate and monitor frontier-model risks, through bodies such as NIST's Center for AI Standards and Innovation.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 5,
          },
          source: "America's AI Action Plan (White House, July 2025)",
          sourceUrl: "https://www.whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf",
          reasoning:
            "A primary policy document showing openness and evaluation can go together. It is a political document, and it does not say whether monitoring without recall is enough.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Democratization, Competition & Safety Research
    // =========================================================================
    {
      id: "democratization-benefits",
      title: "The Benefits: Who Needs the Weights Themselves?",
      short_summary:
        "Open weights let startups, universities, poorer countries and outside safety researchers build on near-frontier AI, and let defenders run a capable model on their own machines. Critics accept the benefits but say most could come through gated research access, without handing the weights to everyone.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Democratization is a genuine good, but it is not unconditional: handing out a dual-use capability also hands out its misuse. The benefits are broad but small for each user, while the worst harms come from a few malicious actors and cannot be recalled. Much of the research benefit can be had without downloadable weights, through researcher access tiers, gated access to model internals and staged release. Stephen Casper, Dan Hendrycks, Yoshua Bengio and co-authors grant that open weights 'allow for more open research and testing,' but find their risks hard to manage because 'they can be modified arbitrarily, used without oversight, and spread irreversibly,' with 'limited research on safety tooling specific to open-weight models.' When the benefits are diffuse and the worst risk is concentrated and permanent, caution is the reasonable bet even if typical outcomes are good.",
      proponent_rebuttal:
        "Open weights are the only check on a few companies controlling the most important technology of the century, and in 2026 they proved their worth in a real attack. When AI agents broke into Hugging Face, the closed models it asked for help refused, because their guardrails 'couldn't determine that we were trying to defend versus attacking.' A downloadable Chinese model, run on Hugging Face's own machines, contained the attack quickly and kept attacker data and credentials inside its network. Outside safety research needs the same access: interpretability, activation steering and red-team fine-tuning all require weights, activations and gradients that closed APIs withhold. Andrew Ng warns that extinction fears have 'been a weapon for lobbyists' against open source. Gated access can be withdrawn by the gatekeeper at any moment.",
      crux: {
        id: "structured-access-substitution-test",
        title: "The Structured-Access Substitution Test",
        question:
          "How much of open models' benefit needs fully downloadable weights rather than gated access?",
        description:
          "The benefit side turns on whether the research, competition and defence gains credited to open weights could mostly be had through intermediate options, such as researcher access, capability-gated release or vetted self-hosting, without full public release. If they could, the case for fully open weights weakens; if the gains need unrestricted local weights, it holds.",
        methodology:
          "Break the claimed benefits into measurable parts: startups and papers built on open versus gated models, interpretability findings possible only with full weights, defensive uses that need self-hosting, and market concentration under each regime. Compare ecosystems with different access models to estimate how much benefit is lost when weights are not public.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A comparison of ecosystems with different access models, counting the startups, papers, interpretability findings and defensive deployments built on fully open weights against those built on gated or researcher access.",
        },
        cost_to_verify:
          "$500K-2M (comparative ecosystem and bibliometric study across open, gated and closed model regimes)",
        falsification: {
          supporter_flip:
            "If a comparative study found gated research access and vetted self-hosting delivered most of the research, competition and defence benefit at much lower tail risk, fully open weights would look largely redundant.",
          skeptic_flip:
            "If white-box safety research and self-hosted defence kept depending on weights that gated programmes withhold, as Hugging Face's response to the 2026 intrusion did, gated access would look too narrow.",
          common_ground:
            "Both sides agree open weights deliver real research and access benefits, and that the worst tail risks come from a small number of malicious actors rather than the broad user base.",
          live_disagreement:
            "How much of the benefit specifically needs unrestricted downloadable weights rather than gated access, which a study of ecosystems under each regime could measure.",
        },
      },
      evidence: [
        {
          id: "hf-glm-defense-2026",
          title: "Hugging Face, July 2026: closed models refused to help; a downloadable Chinese model contained the attack",
          description:
            "Investigating the July 2026 intrusion by OpenAI's test agents, Hugging Face first tried hosted frontier models, including Anthropic's Fable 5. 'It didn't work because the guardrails couldn't determine that we were trying to defend versus attacking,' said Yacine Jernite. It switched to Z.ai's open-weight GLM 5.2 and 'were able to contain it very quickly using this model,' and 'no attacker data, and none of the credentials [GLM 5.2] referenced, left our environment.' Hugging Face advised defenders to have a capable model 'you can run on your own infrastructure vetted and ready before an incident.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 5,
            directness: 8,
          },
          source: "CNBC, 'How a Chinese AI model stopped OpenAI's unprecedented cyber attack' (24 July 2026)",
          sourceUrl: "https://www.cnbc.com/2026/07/24/chinese-ai-model-openai-cyber-attack.html",
          reasoning:
            "A real incident where self-hosted open weights did what gated closed access could not. One case, told by a company whose business is hosting open models, which lowers independence.",
        },
        {
          id: "open-weight-safety-research-access",
          title: "OpenAI 2025: a worst-case fine-tuned gpt-oss still fell short of closed o3",
          description:
            "Before releasing its open gpt-oss model, OpenAI adversarially fine-tuned it to maximise biology and cyber capability. The maliciously tuned model 'underperforms OpenAI o3,' and compared with other open-weight models it 'may marginally increase biological capabilities' but 'does not substantially advance the frontier,' the OpenAI authors concluded. Interpretability, activation steering and red-team fine-tuning all need this kind of access to weights, activations and gradients, which closed APIs do not expose.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 7,
            directness: 7,
          },
          source: "'Estimating Worst-Case Frontier Risks of Open-Weight LLMs' (gpt-oss study, arXiv 2508.03153)",
          sourceUrl: "https://arxiv.org/abs/2508.03153",
          reasoning:
            "Shows white-box access lets a releaser measure marginal risk instead of guessing. It is a release-justification paper by the releaser, which lowers independence.",
        },
        {
          id: "competition-china-decoupling",
          title: "Stanford HAI 2025: Chinese open-weight models have 'caught up or even pulled ahead' in adoption",
          description:
            "Stanford HAI's December 2025 brief on China's open-weight ecosystem finds Chinese open models 'seem to have caught up or even pulled ahead of their global counterparts' in capability and adoption, and that their 'widespread global adoption' may reshape who the world relies on for AI. Releases such as Mistral 3 (December 2025) and DeepSeek V4 (April 2026) let developers build on near-frontier models without paying for API access; NIST's CAISI found DeepSeek V4 more cost-efficient than GPT-5.4 mini on 5 of 7 benchmarks.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source: "Stanford HAI / DigiChina, 'Beyond DeepSeek: China's Diverse Open-Weight AI Ecosystem and Its Policy Implications' (16 December 2025); Mistral AI (2 December 2025)",
          sourceUrl: "https://hai.stanford.edu/policy/beyond-deepseek-chinas-diverse-open-weight-ai-ecosystem-and-its-policy-implications",
          reasoning:
            "An independent academic brief documenting the competition benefit. It does not separate how much of it needs fully open weights rather than gated access.",
        },
        {
          id: "regulatory-capture-concern",
          title: "Ng and LeCun: safety fears as a lobbying 'weapon' against open source",
          description:
            "Andrew Ng told The Australian Financial Review in 2023 that extinction fears have 'been a weapon for lobbyists to argue for legislation that would be very damaging to the open-source community.' In February 2026 he argued that, just as countries rely on Linux, Python and PyTorch, 'open-weight AI models allow governments to ensure uninterrupted access while remaining at the cutting edge.' AMI Labs, the world-model start-up Yann LeCun co-founded after leaving Meta, raised $1.03 billion in March 2026 and says it will 'make a lot of code open source.'",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 4,
            directness: 5,
          },
          source: "Business Insider (31 October 2023); Business Today (2 February 2026); TechCrunch (9 March 2026)",
          sourceUrl: "https://www.businesstoday.in/technology/news/story/america-first-policy-unintentionally-pushing-us-allies-toward-sovereign-ai-warns-coursera-co-founder-514265-2026-02-02",
          reasoning:
            "Expert opinion from people with stakes in open AI, so it is weighted low. It names the concentration risk; it does not measure it.",
        },
        {
          id: "benefit-tail-risk-asymmetry",
          title: "Casper, Hendrycks, Bengio et al. 2026: open weights 'spread irreversibly' and lack safety tooling",
          description:
            "'Open Technical Problems in Open-Weight AI Model Risk Management' (Transactions on Machine Learning Research, 2026) grants that open weights 'allow for more open research and testing' but finds their risks hard to manage because 'they can be modified arbitrarily, used without oversight, and spread irreversibly,' noting 'limited research on safety tooling specific to open-weight models.' An April 2026 policy paper puts the biosecurity version plainly: once weights are downloaded, 'there is no API to monitor, no company to refuse the request, and no recourse once the weights are out.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source: "S. Casper et al., TMLR (2026), arXiv:2608.07514; 'Uncensorable, Unmonitorable, Uncontrollable: U.S. Policy Options for Open-Weight Model Risk' (The Counterfactual, April 2026)",
          sourceUrl: "https://arxiv.org/abs/2608.07514",
          reasoning:
            "Peer-reviewed and co-authored by leading safety researchers. It is a research agenda weighing benefits and harms; reading it as an argument for restriction is the restrictionist camp's inference.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Enforceability & the China Question
    // =========================================================================
    {
      id: "enforceability-geopolitics",
      title: "The China Question: Does US Restraint Change Anything?",
      short_summary:
        "The strongest open models in 2026 are Chinese, released outside US law. The question is whether holding back American open releases lowers the world's risk, or only cedes the open-model field, and the tools and habits that come with it, to labs the US cannot regulate.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The fact that China releases capable open weights does not make American releases safe: it raises the global risk floor, and adding more powerful open models makes it higher still. The Bengio-chaired International AI Safety Report is blunt: 'Once released, a model's weights cannot be recalled.' 'They'll do it anyway' is a race to the bottom. The choice is also not all or nothing. Staged release, researcher access, capability-gated release and export-controlled downloads let the US stay competitive and keep research access without matching every Chinese release at the frontier. Even Helen Toner, who calls nonproliferation the wrong approach to AI misuse, says the status quo, in which frontier models are kept private and open equivalents follow 'after a lag of months or years,' is 'valuable.' Restraint at the very top costs little and buys time.",
      proponent_rebuttal:
        "US restrictions on open weights would bind only American labs, while the capability stays a download away. DeepSeek released V4 under the MIT licence in April 2026, and NIST's own evaluators called it 'the most capable PRC AI model evaluated by CAISI to date'; by mid-2026 the best open models were Chinese-made. When Hugging Face needed a model it could run in-house to fight off an AI-driven intrusion, the one it used was Chinese. The July 2025 AI Action Plan said the US needs 'leading open models founded on American values,' because open models 'could become global standards' and so 'have geostrategic value'; restricting them would cede that ecosystem to China. Holding back American releases would not take a single capability off the internet.",
      crux: {
        id: "differential-availability-test",
        title: "The Differential-Availability Test",
        question:
          "Does a US open release add real access to dangerous capability beyond comparable foreign open models?",
        description:
          "The geopolitical crux is a counterfactual: does a given US open release meaningfully increase global access to dangerous capability beyond what comparable Chinese or other foreign open models already provide? If equivalent foreign models are already downloadable, a matching US release adds little risk and keeps the benefits; if the US model is clearly more capable on dangerous tasks, restraint lowers the global floor even without stopping foreign releases.",
        methodology:
          "For each proposed frontier release, benchmark it on dangerous-capability proxies (WMDP, Cybench, RE-Bench) against the best foreign open model already public, measuring the gap on misuse-relevant tasks alone. Combine with estimates of how fast foreign labs close that gap, to judge whether restraint buys time or only cedes ground.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Benchmarks of each proposed US release on dangerous-capability proxies (WMDP, Cybench, RE-Bench) against the best foreign open model already public, measuring the gap on misuse-relevant tasks alone.",
        },
        cost_to_verify:
          "$300K-1M per release (comparative dangerous-capability benchmarking plus estimates of how fast the gap closes)",
        falsification: {
          supporter_flip:
            "If benchmarking showed a proposed US model clearly more capable on misuse-relevant tasks than the best public foreign open model, restraint would lower the global risk floor rather than merely cede ground, and the 'match foreign releases' case would lose its force.",
          skeptic_flip:
            "If benchmarking showed a proposed US model no more capable on misuse-relevant tasks than the best freely downloadable foreign models, such as DeepSeek V4 or GLM 5.2, restraint would bind only those who comply and add little safety.",
          common_ground:
            "Both sides agree capable open weights already ship from outside US jurisdiction, and that the realistic options span staged, gated and capability-limited release, not a simple ban or release.",
          live_disagreement:
            "Whether a given US open release adds meaningful global access to dangerous capability beyond comparable foreign open models, measurable by benchmarking each release against the best public foreign model on misuse-relevant tasks.",
        },
      },
      evidence: [
        {
          id: "deepseek-v4-foreign-frontier",
          title: "DeepSeek, April 2026: V4 released under the MIT licence, 'the most capable PRC AI model' NIST had tested",
          description:
            "On 24 April 2026 DeepSeek released previews of V4-Pro and V4-Flash with weights under the MIT licence. By DeepSeek's own results V4-Pro matched Claude Opus 4.6, GPT-5.4 and Gemini 3.1 on coding, maths and science. NIST's Center for AI Standards and Innovation, testing it independently, scored it lower, about eight months behind the US frontier, but called it 'the most capable PRC AI model evaluated by CAISI to date.' France's Mistral 3 (December 2025) shipped under the Apache 2.0 licence.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "MIT Technology Review, 'Three reasons why DeepSeek's new model matters' (24 April 2026); DeepSeek-V4-Pro model card (Hugging Face, MIT licence); NIST CAISI, 'CAISI Evaluation of DeepSeek V4 Pro' (1 May 2026); Mistral AI, 'Introducing Mistral 3' (2 December 2025)",
          sourceUrl: "https://www.technologyreview.com/2026/04/24/1136422/why-deepseeks-v4-matters/",
          reasoning:
            "The existence and licences of these models are verifiable, and a US government evaluator confirms they are close to the frontier. The point that the US cannot stop foreign releases is not in dispute.",
        },
        {
          id: "ai-action-plan-china-strategic",
          title: "US AI Action Plan 2025: 'leading open models founded on American values' as a China strategy",
          description:
            "The July 2025 'America's AI Action Plan' said the US needs 'leading open models founded on American values,' adding that open models 'could become global standards' and therefore 'have geostrategic value,' which treats domestic open-weight development as a strategic asset rather than mainly a proliferation risk.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 6,
          },
          source: "America's AI Action Plan (White House, July 2025)",
          sourceUrl: "https://www.whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf",
          reasoning:
            "A primary government document showing the geopolitical argument shaped US policy. It is politically motivated and does not weigh the misuse trade-off.",
        },
        {
          id: "global-risk-floor-argument",
          title: "International AI Safety Report 2026: released weights 'cannot be recalled', and harm options are 'very limited'",
          description:
            "The 2026 International AI Safety Report, chaired by Yoshua Bengio, says 'Once released, a model's weights cannot be recalled,' and that 'If an AI developer releases an open-weight model with dangerous capabilities,' its 'options for mitigating potential harms are very limited.' It notes that Chinese developers DeepSeek and Alibaba released open-weight models that 'performed almost as well as leading closed models.' Restrictionists draw the lesson that each additional near-frontier open release adds to an exposure that cannot be undone, whoever ships it.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 4,
            directness: 6,
          },
          source: "International AI Safety Report 2026, Extended Summary for Policymakers",
          sourceUrl:
            "https://internationalaisafetyreport.org/publication/2026-report-extended-summary-policymakers",
          reasoning:
            "An independent international review stating the fact the restrictionist case rests on. That more releases mean more exposure is the restrictionists' inference; the report does not measure what any one US release adds.",
        },
        {
          id: "policy-menu-not-binary",
          title: "NTIA and Toner: the options run from staged to gated release, not 'ban or release'",
          description:
            "The NTIA report sets out options between banning and releasing, including 'mandating a staged release, where progressively wider access is granted over time,' structured access and export controls. Helen Toner argues nonproliferation is the wrong approach to AI misuse, yet calls the status quo 'valuable,' in which 'new models that push the frontier are kept private, and openly available equivalents are only released after a lag of months or years,' and says that to the extent such 'precautionary friction' counts as nonproliferation, 'I'm in favor.'",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source: "NTIA Open Model Weights Report: Policy Approaches; Helen Toner, 'Nonproliferation is the wrong approach to AI misuse' (5 April 2025)",
          sourceUrl: "https://helentoner.substack.com/p/nonproliferation-is-the-wrong-approach",
          reasoning:
            "Breaks the false choice between banning and releasing. Whether the middle options can be enforced against determined actors is itself unsettled.",
        },
      ],
    },
  ],
  references: [
    {
      title: "How a Chinese AI model stopped OpenAI's 'unprecedented' cyber attack (CNBC, 24 July 2026)",
      url: "https://www.cnbc.com/2026/07/24/chinese-ai-model-openai-cyber-attack.html",
    },
    {
      title: "Open-weight models' capabilities gap with closed models (Epoch AI, May 2026)",
      url: "https://epoch.ai/data-insights/open-closed-eci-gap",
    },
    {
      title: "International AI Safety Report 2026: Extended Summary for Policymakers",
      url: "https://internationalaisafetyreport.org/publication/2026-report-extended-summary-policymakers",
    },
    {
      title: "Dual-Use Foundation Models with Widely Available Weights: Policy Approaches (NTIA)",
      url: "https://www.ntia.gov/programs-and-initiatives/artificial-intelligence/open-model-weights-report/policy-approaches-recommendations/policy-approaches",
    },
    {
      title: "Open Technical Problems in Open-Weight AI Model Risk Management (Casper et al., TMLR 2026, arXiv 2608.07514)",
      url: "https://arxiv.org/abs/2608.07514",
    },
    {
      title: "Eliciting Harmful Capabilities by Fine-Tuning On Safeguarded Outputs (Kaunismaa et al., arXiv 2601.13528)",
      url: "https://arxiv.org/abs/2601.13528",
    },
    {
      title: "CAISI Evaluation of DeepSeek V4 Pro (NIST, May 2026)",
      url: "https://www.nist.gov/news-events/news/2026/05/caisi-evaluation-deepseek-v4-pro",
    },
    {
      title: "The Operational Risks of AI in Large-Scale Biological Attacks: Results of a Red-Team Study (RAND RRA2977-2)",
      url: "https://www.rand.org/pubs/research_reports/RRA2977-2.html",
    },
    {
      title: "Estimating Worst-Case Frontier Risks of Open-Weight LLMs: gpt-oss (arXiv 2508.03153)",
      url: "https://arxiv.org/abs/2508.03153",
    },
    {
      title: "Beyond DeepSeek: China's Diverse Open-Weight AI Ecosystem (Stanford HAI)",
      url: "https://hai.stanford.edu/policy/beyond-deepseek-chinas-diverse-open-weight-ai-ecosystem-and-its-policy-implications",
    },
    {
      title: "America's AI Action Plan (White House, July 2025)",
      url: "https://www.whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Do open weights give real help to attackers, or only repeat public knowledge?",
      content:
        "Safety training on open models can be stripped cheaply, but the controlled trials so far, such as RAND's 2024 red-team study, found no significant help with planning a biological attack over the internet alone. Those trials used older models, and Epoch AI measures the best open models only about four months behind the closed frontier in 2026.",
    },
    {
      id: "q2",
      title: "If release is irreversible, does that justify caution at release or rules on use?",
      content:
        "Both sides agree released weights cannot be recalled; LLaMA's 2023 leak showed it. Restrictionists conclude the bar at the moment of release must be high. The pro-open camp draws the opposite lesson: because recall is impossible, rules should target harmful use and the people who fine-tune models for it, where intent and harm can be seen.",
    },
    {
      id: "q3",
      title: "Does restricting US open releases reduce global risk, or just cede the field to China?",
      content:
        "In 2026 the strongest open models are Chinese, and when Hugging Face needed a model it could run in-house to contain an AI-driven intrusion, it used one. The AI Action Plan treats American open models as a strategic asset; restrictionists answer that more frontier releases raise the global risk floor whoever ships them. Staged and gated release are the middle options.",
    },
  ],
};
