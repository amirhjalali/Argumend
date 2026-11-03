export const openWeightAiModelsData = {
  id: "open-weight-ai-models",
  title: "Releasing Open-Weight Frontier AI Models",
  question:
    "Does publishing the weights of frontier AI models do more good than harm?",
  meta_claim:
    "Openly releasing the weights of powerful frontier AI models does more good than harm — democratizing access, accelerating safety research, and countering Chinese AI dominance outweighs the marginal uplift it gives malicious actors.",
  status: "contested" as const,
  category: "technology" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "In RAND's red-team trial, plans for a mock biological attack drawn up with an LLM plus the internet showed no statistically significant difference in viability from plans made with the internet alone. Both sides also accept that open weights, once released and mirrored, cannot be recalled, and that their safety fine-tuning can be cheaply stripped. The fight is over how fast the risk grows with each model generation, and which rule fits it.",
    confidence: 80,
    source:
      "RAND, The Operational Risks of AI in Large-Scale Biological Attacks — Results of a Red-Team Study (RRA2977-2, 2024); NTIA Open Model Weights Report",
    sourceUrl: "https://www.rand.org/pubs/research_reports/RRA2977-2.html",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Both sides accept that released weights cannot be recalled and their safety fine-tuning can be cheaply stripped, that open weights bring real democratization and white-box research benefits, and that frontier-approaching open models like DeepSeek and Qwen already ship from outside US jurisdiction.",
    "They split over whether stripped open models give bad actors real help beyond what search provides; whether irreversibility calls for a higher bar at release or for rules aimed at misuse; how much of the benefit needs fully downloadable weights rather than gated access; and whether a US release adds dangerous capability beyond the foreign models already out.",
    "The second is a normative choice that the technical facts inform but do not decide.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Catastrophic Misuse & Marginal Uplift
    // =========================================================================
    {
      id: "marginal-uplift",
      title: "Catastrophic Misuse & Marginal Uplift",
      short_summary:
        "Open weights can have their safety fine-tuning stripped, potentially uplifting malicious actors on bioweapon or cyberattack tasks. The crux is whether open models provide capability beyond what is already available via search engines, closed models, and existing literature.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Once weights are public, anyone can cheaply remove the safety guardrails and query the model with no monitoring for bioweapon synthesis, novel malware, or cyberattack planning. The restrictionist camp — Yoshua Bengio, Geoffrey Hinton, Dan Hendrycks — argues the dangerous-capability ceiling is rising fast: DeepSeek's model card for its April 2026 V4-Pro preview, released as downloadable MIT-licensed weights, reports a 3,206 Codeforces rating and 80.6% on SWE-bench Verified, in the range of the closed frontier models it lists, and NIST's CAISI, which measured the model lower in its own tests, still placed it only about eight months behind the U.S. frontier. 'Elicitation attack' research shows actors can use a safeguarded closed model to uplift an unrestricted open model on dangerous tasks without ever directly requesting harmful information, collapsing the 'the closed model already knows this' defense.",
      proponent_rebuttal:
        "Current biorisk evaluations do not show that open models give amateurs a qualitative uplift over Google search and existing literature — the bottleneck for bioweapons is tacit lab skill and physical materials, not text-based information. Epoch AI's review of lab biorisk evals concluded they 'do not provide strong evidence that LLMs can enable amateurs to develop bioweapons.' The marginal harm of a given open release is a function of how much new capability it adds beyond what is already public; for most current models that delta is small, and the elicitation-attack problem shows the real lever is RLHF safety training on closed models, not pretraining knowledge that open weights merely expose.",
      crux: {
        id: "marginal-uplift-test",
        title: "The Marginal-Uplift Test",
        question:
          "Do safety-stripped open models give bad actors real help on dangerous tasks beyond what search provides?",
        description:
          "The decisive question is whether an open-weight model measurably increases a malicious actor's ability to cause mass-casualty harm relative to a control group with access to search engines, textbooks, and existing closed models. If a stripped-safety open model provides no statistically significant uplift on end-to-end dangerous tasks over that baseline, the misuse argument against release collapses; if it does, irreversibility (see “Irreversibility of Release”) makes release uniquely dangerous.",
        methodology:
          "Run controlled red-team uplift studies: recruit matched cohorts (novices and domain experts), give one arm internet + literature access and the other arm a safety-stripped open model, and measure performance on operationalized but non-infohazardous proxy tasks (e.g., WMDP-style bio/chem/cyber benchmarks, end-to-end CTF tasks via Cybench). Compare task-completion rates, error-correction, and time-to-completion across arms. Repeat across model capability tiers to chart the uplift curve over time.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Controlled red-team uplift trials: matched novices and experts, one arm with internet and literature only and one with a safety-stripped open model, scored on end-to-end bio, chem and cyber proxy tasks.",
        },
        cost_to_verify:
          "$1-5M (Controlled human-subject uplift trials with biosecurity and cyber experts, repeated across model generations)",
        falsification: {
          supporter_flip:
            "If a rigorous controlled trial found a safety-stripped open model giving novices a statistically significant, end-to-end uplift on operationalized bio or cyber tasks over an internet-and-literature control, reversing the RAND red-team result on a current model, the case for release would lose its footing.",
          skeptic_flip:
            "If new controlled trials on current models matched the RAND red-team result and Epoch AI's review, finding no amateur uplift over search and literature, with tacit lab skill and materials still the bottleneck, 'open weights obviously uplift bioterrorists' would be hard to hold.",
          common_ground:
            "Both sides agree that release-time safety fine-tuning can be cheaply stripped from open weights, and that current biorisk evals are noisy signals that may underestimate the capability of future models.",
          live_disagreement:
            "Whether a current-generation safety-stripped open model provides statistically significant marginal uplift on end-to-end dangerous tasks over a search-and-literature baseline — resolvable only by repeated controlled human-subject uplift trials charting the uplift curve across model generations.",
        },
      },
      evidence: [
        {
          id: "tamper-resistant-safeguards-fail",
          title: "Release-Time Safety Fine-Tuning Has Proven Non-Durable Against Fine-Tuning Attacks",
          description:
            "The 'Tamper-Resistant Safeguards' paper (Tamirsa, Hendrycks, Mazeika et al.) proposed the TAR method to make refusal/unlearning safeguards survive adversarial fine-tuning, but the follow-up 'On Evaluating the Durability of Safeguards' (Qi, Henderson et al.) showed that even evaluating such durability is 'exceedingly difficult and can easily mislead,' and that purportedly robust safeguards including TAR are far weaker than claimed once tested properly. The practical upshot, consistent with the broader fine-tuning-attack literature, is that cheap downstream fine-tuning can restore harmful capabilities removed at release — so any safety conditioning a lab applies before releasing weights cannot be relied upon downstream, a structural difference from closed models served behind an API.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 9,
          },
          source: "Tamper-Resistant Safeguards for Open-Weight LLMs (arXiv 2408.00761); On Evaluating the Durability of Safeguards (arXiv 2412.07097)",
          sourceUrl: "https://arxiv.org/pdf/2408.00761",
          reasoning:
            "These are peer-reviewed, reproducible ML experiments directly testing whether release-time safeguards survive. The finding is technically robust and directly supports the misuse concern. It does not, however, establish that the resulting capability provides real-world catastrophic uplift — only that guardrails are removable.",
        },
        {
          id: "biorisk-evals-weak-signal",
          title: "Current Biorisk Evaluations Show No Clear Amateur Uplift",
          description:
            "Epoch AI's analysis of AI labs' biorisk evaluations concluded they 'do not provide strong evidence that LLMs can enable amateurs to develop bioweapons.' The dominant bottlenecks identified are tacit laboratory skill, access to controlled materials and equipment, and physical synthesis — none of which a text model removes. The same author concedes the evals are weak signals in both directions, meaning absence of demonstrated uplift is not proof of safety.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source: "Epoch AI Gradient Updates: Do the Biorisk Evaluations of AI Labs Actually Measure the Risk of Developing Bioweapons?",
          sourceUrl: "https://epoch.ai/gradient-updates/do-the-biorisk-evaluations-of-ai-labs-actually-measure-the-risk-of-developing-bioweapons",
          reasoning:
            "Epoch AI is an independent research organization without a stake in either release policy. The finding directly addresses the marginal-uplift crux. Its weight is tempered because the author explicitly notes current evals are noisy and may underestimate future capability as models improve.",
        },
        {
          id: "rand-red-team-no-uplift",
          title: "RAND Red-Team RCT Found No Significant Bioweapon-Planning Uplift From LLMs",
          description:
            "RAND's controlled red-team study assigned matched teams role-playing malicious non-state actors to plan a biological attack; one arm had an LLM plus the internet, the other only the internet. Plans were scored by eight independent judges (half biologists, half security professionals) via a Delphi process. The study found no statistically significant difference in the operational viability of plans generated with versus without LLM assistance, concluding that biological-attack planning currently lies 'beyond the capability frontier of LLMs as assistive tools.' This is the closest existing approximation of the marginal-uplift trial the crux calls for.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 9,
          },
          source: "RAND RRA2977-2: The Operational Risks of AI in Large-Scale Biological Attacks — Results of a Red-Team Study",
          sourceUrl: "https://www.rand.org/pubs/research_reports/RRA2977-2.html",
          reasoning:
            "A rigorous, independent, pre-registered-style controlled trial with blinded expert scoring — the single most directly relevant empirical test of catastrophic uplift available, which is why all four weight dimensions score high. Its principal limitation, which lead author Mouton explicitly flags, is that it tested the prior LLM generation; absence of uplift today does not preclude uplift from more capable future models.",
        },
        {
          id: "elicitation-attack",
          title: "Elicitation Attacks Use Closed Models to Uplift Open Models",
          description:
            "A January 2026 paper, 'Eliciting Harmful Capabilities by Fine-Tuning On Safeguarded Outputs' (Kaunismaa, Griffin, Hughes, Knight, Sharma and Jones; ICLR 2026), describes 'elicitation attacks' in which an attacker uses a safeguarded frontier closed model to uplift an open-weight model on dangerous tasks without ever issuing a directly harmful prompt to the closed system: the attacker writes prompts in domains adjacent to the harmful task, collects the closed model's answers, and fine-tunes the open model on them. On hazardous chemical synthesis and processing tasks, fine-tuning Llama 3.3 70B this way recovered about 39% of the performance gap between the base model and a jailbroken Claude 3.5 Sonnet (roughly 40% across the paper's evaluations), and the attack grew stronger with a more capable frontier model and more fine-tuning data. This collapses the common pro-open argument that 'the closed model already knows this,' because the closed model knows it but refuses to say it, whereas the open model can be fine-tuned to comply.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source: "J. Kaunismaa et al., 'Eliciting Harmful Capabilities by Fine-Tuning On Safeguarded Outputs' (arXiv:2601.13528, Jan 2026; ICLR 2026 poster)",
          sourceUrl: "https://arxiv.org/abs/2601.13528",
          reasoning:
            "A peer-reviewed ML experiment with a stated metric (performance gap recovered), which makes it reproducible. Independence is moderate because some authors work at a frontier lab whose models were used, and the result covers one domain (chemical synthesis) and one measured gap. It directly addresses a key counter-argument and reframes where the safety bottleneck actually sits — on closed-model output safeguards rather than on the open weights themselves.",
        },
        {
          id: "open-model-capability-trajectory",
          title: "Open Models Trail the Closed Frontier by Months, Not Years",
          description:
            "DeepSeek's model card for the V4-Pro preview, released as open weights on April 24, 2026, lists 1.6T total / 49B active parameters under the MIT License and reports, for its maximum-reasoning mode, a 3,206 Codeforces rating and 80.6% on SWE-bench Verified, against 80.8% for Claude Opus 4.6 in the same table. Alibaba's Qwen3.6-27B model card (April 2026) reports 77.2 on SWE-bench Verified for a 27B-parameter model, against 80.9 for Claude Opus 4.5, the score reported at that model's November 2025 launch. These are developer-reported numbers. NIST's Center for AI Standards and Innovation (CAISI), testing V4-Pro itself, measured 74% on SWE-bench Verified (Claude Opus 4.6: 79%) and concluded that its capabilities lag the U.S. frontier by about 8 months. The restrictionist camp argues this trajectory means dangerous-capability thresholds that seemed comfortably distant for open models are now months away, not years.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "DeepSeek-V4-Pro and Qwen3.6-27B model cards (Hugging Face, April 2026); NIST CAISI, 'CAISI Evaluation of DeepSeek V4 Pro' (May 1, 2026)",
          sourceUrl: "https://www.nist.gov/news-events/news/2026/05/caisi-evaluation-deepseek-v4-pro",
          reasoning:
            "The headline benchmark figures are self-reported by the labs, but a U.S. government evaluator's independent test of V4-Pro confirms the trajectory at a somewhat lower level, which raises independence. The benchmarks measure coding, math and science rather than catastrophic misuse directly, which keeps directness down: high coding ability does not automatically translate into bioweapon or mass-casualty uplift.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Irreversibility of Release
    // =========================================================================
    {
      id: "irreversibility",
      title: "Irreversibility of Release",
      short_summary:
        "Unlike an API endpoint that can be patched or revoked, released weights can be downloaded, copied, and run offline forever. This is the most technically settled point in the debate — the dispute is over what policy implication irreversibility carries.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Open-weight release is a one-way door. The NTIA's open-model-weights report acknowledges that weights, once distributed, cannot be recalled. A closed model that turns out to be dangerous can be taken offline, rate-limited, or have a vulnerable behavior patched server-side; an open model that turns out to be dangerous is permanently in the wild, mirrored across torrents and offline drives. Because safety fine-tuning is removable (see “Catastrophic Misuse & Marginal Uplift”), the only durable control is the release decision itself. Irreversibility means the precautionary burden at release is uniquely high — you are making an irrevocable bet on a capability you cannot yet fully evaluate.",
      proponent_rebuttal:
        "Irreversibility is real but it cuts both ways: it means that model-level controls are the wrong intervention, not that release is uniquely dangerous. If you cannot recall weights, the rational policy is to regulate harmful use and downstream deployment — where actors, intent, and real-world harm are observable — rather than to gate the underlying technology. The a16z 'Little Tech Agenda' and Yann LeCun argue that treating every capable model as a permanent weapon leads to banning ever-more-fundamental layers of the stack (Llama, then PyTorch, then math), while the actual harms occur at the point of malicious use, which liability and law enforcement already address.",
      crux: {
        id: "reversibility-test",
        title: "The Recall Test",
        question:
          "Since released weights can't be recalled, should release face a higher bar, or should rules target misuse?",
        description:
          "The question is empirically decidable: once a set of open weights has been released and mirrored, is there any technical or legal mechanism by which the original developer or a government can render those specific weights non-functional or inaccessible to a determined actor? If no such mechanism exists — and the evidence says it does not — then release is irreversible, and the live dispute is purely about whether irreversibility justifies caution-at-release or a pivot to use-based regulation.",
        methodology:
          "Survey every proposed recall mechanism: license revocation, takedown notices to hosting platforms, model 'unlearning' patches, and kill-switch schemes. For each, assess whether it removes capability from an actor who already downloaded the weights and runs them offline. Document historical precedent (e.g., LLaMA's March 2023 leak spreading uncontrollably after a limited research release) to test whether any release has ever been successfully reversed.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "A survey of every proposed recall mechanism (license revocation, hosting takedowns, unlearning patches, kill switches), testing whether any removes capability from someone already running the weights offline. Where to set the bar for release is a value choice.",
        },
        cost_to_verify:
          "$0 (Established by the NTIA report, the documented LLaMA leak, and the structural fact that copied files cannot be un-copied)",
        falsification: {
          supporter_flip:
            "If more gated releases escaped their gates the way LLaMA's March 2023 weights spread across torrents within about a week, the fact that released weights cannot be recalled, which the NTIA report acknowledges, would weigh heavily against open release.",
          skeptic_flip:
            "If license revocation, hosting takedowns or 'unlearning' patches proved able to remove capability from an actor running downloaded weights offline, irreversibility would no longer ground the case for caution.",
          common_ground:
            "Both sides agree that once weights are released and mirrored they cannot be technically recalled, and that downstream fine-tuning can restore removed capabilities; the dispute is the policy implication, not the technical fact.",
          live_disagreement:
            "Whether irreversibility justifies a uniquely high precautionary burden at the release decision or instead implies a pivot to use-based regulation (liability, law enforcement) where intent and harm are observable — a normative dispute that the empirical recall fact does not by itself settle.",
        },
      },
      evidence: [
        {
          id: "ntia-irreversibility",
          title: "NTIA Report Acknowledges Open Weights Cannot Be Recalled",
          description:
            "The U.S. Commerce Department's NTIA 'Dual-Use Foundation Models with Widely Available Weights' report and its policy-approaches analysis recognize that once model weights are openly released, the distribution cannot be reversed. The report ultimately recommended against immediate restrictions on current open models while urging the government to actively monitor for emerging risks — an explicit acknowledgment that the release decision is the binding control point.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "NTIA Open Model Weights Report — Policy Approaches and Recommendations",
          sourceUrl: "https://www.ntia.gov/programs-and-initiatives/artificial-intelligence/open-model-weights-report/policy-approaches-recommendations/policy-approaches",
          reasoning:
            "NTIA is the authoritative U.S. executive-branch body on this question and has no commercial stake in either side. It directly confirms irreversibility while declining to recommend a release ban, which is why both camps cite it: restrictionists for the fact, pro-open advocates for the recommendation.",
        },
        {
          id: "llama-leak-precedent",
          title: "LLaMA's 2023 Leak Demonstrated Release Cannot Be Contained",
          description:
            "Meta's original LLaMA model was distributed to approved researchers in early 2023, but the weights leaked publicly within a week and spread across torrents and mirrors, becoming permanently and freely available regardless of Meta's intent. The episode is the canonical real-world demonstration that even a deliberately gated release cannot be walked back, and it directly informed Meta's later decision to release Llama 2 onward openly by default.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 9,
          },
          source: "The Verge; Stanford HAI reporting on the LLaMA leak",
          sourceUrl: "https://www.theverge.com/2023/3/8/23629362/meta-ai-language-model-llama-leak-online-misuse",
          reasoning:
            "A widely documented, undisputed historical event that empirically settles the recall question: a controlled release became an uncontrolled one in days. It directly supports irreversibility, though it speaks to containment, not to whether the released capability was actually harmful.",
        },
        {
          id: "use-based-liability-regime",
          title: "Liability Frameworks Place the Duty of Care on Downstream Fine-Tuners",
          description:
            "Under the EU's revised Product Liability Directive, an actor who substantially modifies a product — including fine-tuning an AI model — can be treated as a 'manufacturer' and bear liability for the resulting harm. This is the pro-open camp's preferred regime: the original releaser ships reasonable safeguards, and a downstream actor who strips them and causes harm is the liable party. It operationalizes 'regulate use, not release' by locating responsibility at the point where intent and harm are observable.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "EU Product Liability Directive analysis; ScienceDirect federated-compliance paper",
          sourceUrl: "https://www.sciencedirect.com/science/article/pii/S2212473X25001063",
          reasoning:
            "Demonstrates that a coherent legal alternative to release-gating exists and is already being codified, supporting the use-based approach. Its weight is limited by the safety camp's rejoinder that post-hoc liability is cold comfort against an irreversible mass-casualty event.",
        },
        {
          id: "ai-action-plan-precaution",
          title: "Even Pro-Open U.S. Policy Pairs Release With Active Risk Monitoring",
          description:
            "The July 2025 'America's AI Action Plan' explicitly endorsed open-weight models as a strategic asset, yet still paired that endorsement with calls to build government capacity to evaluate and monitor frontier-model risks. The coexistence of strong pro-open language with continued investment in evaluation infrastructure (AI Security Institute, capability evals) reflects an implicit acknowledgment that irreversibility demands at least pre-release evaluation even when the policy default favors openness.",
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
            "A primary policy document, but a politically motivated one with lower independence. It shows that even an openness-favoring government couples release with monitoring, supporting a middle path — though it does not resolve whether monitoring without recall capability is sufficient.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Democratization, Competition & Safety Research
    // =========================================================================
    {
      id: "democratization-benefits",
      title: "Democratization, Competition & Safety Research",
      short_summary:
        "Open weights distribute economic and research opportunity, prevent a handful of labs from controlling a transformative technology, and give external safety researchers the deep model access closed APIs deny them. Critics argue these benefits are real but do not net out against catastrophic tail risk.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Democratization is a genuine good, but it is not unconditional: distributing a dual-use capability also democratizes its misuse, and the benefits accrue mostly to legitimate actors while the worst tail risks are driven by a small number of malicious ones. Restrictionists note that much of the claimed safety-research benefit can be delivered through structured access — researcher API tiers, gated model-internals access, and staged release — without putting downloadable weights into every actor's hands. The strongest pro-open arguments rest on op-eds and venture-capital advocacy, while the catastrophic-risk case rests on a smaller but more peer-reviewed literature; a naive citation count flatters the safety camp, but the asymmetry of consequences favors caution.",
      proponent_rebuttal:
        "Open-weight release is the only credible check on the concentration of AI power in a few well-capitalized labs. Yann LeCun argues no individual should have unilateral power over how AI affects society; Andrew Ng warns that 'there are definitely large tech companies that would rather not have to try to compete with open source, so they're creating fear of AI leading to human extinction.' Open weights let startups, academics, and developing nations build on frontier capability without rent-seeking gatekeepers, and they give independent safety researchers the white-box access — activations, gradients, fine-tuning — that interpretability and alignment work require but that closed APIs structurally withhold.",
      crux: {
        id: "structured-access-substitution-test",
        title: "The Structured-Access Substitution Test",
        question:
          "How much of open models' benefit needs fully downloadable weights rather than gated access?",
        description:
          "The benefit side of the ledger hinges on whether the democratization, competition, and safety-research gains attributed to open weights can be substantially captured through intermediate options — structured/researcher access, capability-gated release, and downloadable-but-export-controlled tiers — without full open release. If those intermediate regimes deliver most of the benefit at lower tail risk, the case for fully open weights weakens; if deep capability genuinely requires unrestricted local weights, the benefit case holds.",
        methodology:
          "Decompose the claimed benefits into measurable components: number of downstream startups and papers built on open vs. structured-access models, interpretability findings achievable only with full weights vs. with gated internals access, and market-concentration metrics (share of capable-model usage) under each regime. Compare ecosystems with different access models (e.g., fully open Llama/DeepSeek vs. researcher-gated frontier closed models) to estimate how much benefit is lost when weights are not fully public.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A comparison of ecosystems with different access models, counting the startups, papers and interpretability findings built on fully open weights against those built on structured or researcher access.",
        },
        cost_to_verify:
          "$500K-2M (Comparative ecosystem and bibliometric study across open, structured-access, and closed model regimes)",
        falsification: {
          supporter_flip:
            "If a comparative ecosystem and bibliometric study found structured researcher access and capability-gated tiers capturing most of the democratization, competition and interpretability benefit at much lower tail risk, full open weights would look largely redundant.",
          skeptic_flip:
            "If white-box safety work like mechanistic interpretability, activation steering and adversarial fine-tuning kept depending on access closed APIs withhold, and studies like the gpt-oss worst-case test kept using it to measure marginal risk directly, gated access would look too narrow.",
          common_ground:
            "Both sides agree open weights deliver real democratization and white-box research benefits, and that catastrophic tail risks are concentrated in a small number of malicious actors rather than the broad user base.",
          live_disagreement:
            "How much of the claimed benefit specifically requires unrestricted downloadable weights versus structured/gated access — resolvable by decomposing downstream startups, papers, interpretability findings, and market-concentration metrics across open, structured-access, and closed regimes.",
        },
      },
      evidence: [
        {
          id: "open-weight-safety-research-access",
          title: "Interpretability and Alignment Research Require White-Box Model Access",
          description:
            "Core safety techniques — mechanistic interpretability, activation steering, circuit-level analysis, and red-team fine-tuning — require access to model internals (weights, activations, gradients) that closed APIs do not expose. Open-weight releases such as OpenAI's gpt-oss and Meta's Llama are heavily used by the external alignment research community precisely because they permit this white-box analysis. The gpt-oss worst-case-risk study operationalized this: by adversarially fine-tuning the model to maximize bio and cyber capability before release, OpenAI found the malicious-fine-tuned model underperformed its own closed o3 and 'does not significantly advance frontier capabilities,' arguing the release adds only a small amount of net-new biorisk. White-box access thus both enables interpretability work and lets releasers measure marginal risk directly rather than guess at it.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source: "Estimating Worst-Case Frontier Risks of Open-Weight LLMs (gpt-oss study, arXiv 2508.03153)",
          sourceUrl: "https://arxiv.org/abs/2508.03153",
          reasoning:
            "The gpt-oss release study documents both how open weights enable worst-case risk estimation and interpretability work closed models cannot support, and that this particular model's malicious-fine-tuned ceiling stayed below an existing closed model. It is somewhat self-interested as a release-justification paper (lowering independence), but the marginal-risk-measurement methodology it demonstrates is widely accepted and directly informs the release decision.",
        },
        {
          id: "regulatory-capture-concern",
          title: "Leading Researchers Warn of Safety-Rhetoric Regulatory Capture",
          description:
            "Andrew Ng has long argued that large AI firms use extinction fears to win regulation that would shut out open-source competitors; in 2023 he told The Australian Financial Review that such fears have 'been a weapon for lobbyists to argue for legislation that would be very damaging to the open-source community.' In early 2026 he argued that sovereign AI does not require countries to build everything themselves: just as nations rely on Linux, Python and PyTorch, which no single nation controls, open-weight models let governments secure uninterrupted access, and joining the open-source ecosystem is the most cost-effective path to autonomy. Yann LeCun, whose world-model startup AMI Labs raised $1.03 billion in March 2026 and says it will publish papers and open-source much of its code, frames open weights as the structural safeguard against any single entity holding unilateral power over a transformative technology. This camp treats concentration of AI control as itself a first-order risk.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 4,
            directness: 6,
          },
          source: "Business Insider, 'Big Tech Is Inflating Fears About AI's Risk to Humanity: Google Brain Cofounder' (Oct 31, 2023); Business Today (Andrew Ng on sovereign AI, Feb 2, 2026); TechCrunch, 'Yann LeCun's AMI Labs raises $1.03B to build world models' (Mar 9, 2026)",
          sourceUrl: "https://www.businesstoday.in/technology/news/story/america-first-policy-unintentionally-pushing-us-allies-toward-sovereign-ai-warns-coursera-co-founder-514265-2026-02-02",
          reasoning:
            "This is expert opinion and advocacy, not measured evidence — and from figures with direct commercial and reputational stakes in open AI, which is why independence and reliability are scored low. It shifts priors about the concentration risk but does not establish the magnitude of either the benefit or the offsetting tail risk.",
        },
        {
          id: "competition-china-decoupling",
          title: "Open Models Drive Competition and Counter Closed-Frontier Concentration",
          description:
            "The rapid 2025-2026 cadence of capable open releases — Mistral 3 (December 2025, Apache 2.0), DeepSeek V4 and Alibaba's Qwen 3.6 (both April 2026) — has compressed the price and availability gap with closed frontier labs, letting downstream developers worldwide build on near-frontier capability without paying API rents; NIST's CAISI found DeepSeek V4 more cost-efficient than the most cost-competitive U.S. reference model, GPT-5.4 mini, on 5 of 7 benchmarks. Stanford HAI's December 2025 issue brief on China's open-weight ecosystem finds that Chinese open-weight models 'seem to have caught up or even pulled ahead of their global counterparts' in capability and adoption, and that their 'widespread global adoption' may reshape global technology access and reliance patterns.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "Stanford HAI / DigiChina issue brief (Meinhardt, Nong, Webster, Hashimoto, Manning), 'Beyond DeepSeek: China's Diverse Open-Weight AI Ecosystem and Its Policy Implications' (Dec 16, 2025); Mistral AI, 'Introducing Mistral 3' (Dec 2, 2025)",
          sourceUrl: "https://hai.stanford.edu/policy/beyond-deepseek-chinas-diverse-open-weight-ai-ecosystem-and-its-policy-implications",
          reasoning:
            "Stanford HAI is an independent academic policy center, and the competitive dynamics it documents are observable in the market. It supports the democratization-and-competition benefit, though it does not quantify how much of that benefit specifically requires full open weights versus structured access.",
        },
        {
          id: "benefit-tail-risk-asymmetry",
          title: "Diffuse Benefits Do Not Net Out Against Concentrated Catastrophic Tail Risk",
          description:
            "'Open Technical Problems in Open-Weight AI Model Risk Management' (Stephen Casper and co-authors including Dan Hendrycks and Yoshua Bengio; Transactions on Machine Learning Research, 2026) grants that open weights 'allow for more open research and testing,' but finds their risks hard to manage because 'they can be modified arbitrarily, used without oversight, and spread irreversibly,' and notes there is 'limited research on safety tooling specific to open-weight models.' The April 2026 policy paper 'Uncensorable, Unmonitorable, Uncontrollable: U.S. Policy Options for Open-Weight Model Risk' (The Counterfactual) makes the biosecurity version concrete: once weights are downloaded, 'there is no API to monitor, no company to refuse the request, and no recourse once the weights are out.' Restrictionists draw the asymmetry from this: the benefits of openness are broad and incremental, while the worst harms are low-probability, high-consequence and cannot be recalled, so expected-value reasoning under heavy-tailed risk favors caution even when typical outcomes from openness are positive.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source: "S. Casper et al., 'Open Technical Problems in Open-Weight AI Model Risk Management,' TMLR (2026), arXiv:2608.07514; 'Uncensorable, Unmonitorable, Uncontrollable: U.S. Policy Options for Open-Weight Model Risk' (The Counterfactual, Apr 2026)",
          sourceUrl: "https://arxiv.org/abs/2608.07514",
          reasoning:
            "The technical paper is peer-reviewed and co-authored by leading safety researchers including a Turing laureate, lending high source reliability; it is a research agenda that weighs benefits and harms rather than an argument for restriction, so the benefit-versus-tail-risk inference is the restrictionist camp's reading of it, which lowers directness. Replicability is low because the core claim is a probabilistic risk judgment about unrealized catastrophic events rather than a reproducible measurement.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Enforceability & the China Question
    // =========================================================================
    {
      id: "enforceability-geopolitics",
      title: "Enforceability & the China Question",
      short_summary:
        "Even if restrictions were desirable, capable open models already ship from Chinese labs outside U.S. jurisdiction. The crux: does restricting American open releases reduce global risk, or merely cede the open-weight field to actors the U.S. cannot regulate?",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The fact that China releases capable open weights does not make additional U.S. releases safe — it raises the global risk floor, and adding more powerful open models to that floor makes the equilibrium worse, not better, as Yoshua Bengio argues. 'They'll do it anyway' is a race-to-the-bottom rationale that abandons the precautionary principle precisely where the stakes are highest. Moreover, the policy menu is not binary: capability-gating, staged release, structured access, and export-controlled-but-downloadable tiers let the U.S. preserve competitiveness and safety-research access without matching every Chinese release weight-for-weight at the frontier.",
      proponent_rebuttal:
        "U.S. open-weight restrictions are largely unenforceable and may be strategically self-defeating. By April 2026, DeepSeek V4 and Qwen 3.6 demonstrated that frontier-approaching open models ship from Chinese labs the U.S. cannot regulate. The July 2025 AI Action Plan concluded that restricting American open releases would simply cede the global open-weight ecosystem — and the standards, tooling, and developer mindshare that come with it — to China. On this view, banning U.S. open weights restricts only the actors who would comply, while the capability remains globally available.",
      crux: {
        id: "differential-availability-test",
        title: "The Differential-Availability Test",
        question:
          "Does a US open release add real access to dangerous capability beyond comparable foreign open models?",
        description:
          "The geopolitical crux reduces to a counterfactual: does a given U.S. open release meaningfully increase total global access to dangerous capability beyond what comparable Chinese (or other foreign) open models already provide? If foreign open models of equivalent capability are already freely downloadable, a matching U.S. release adds little marginal global risk while preserving competitive and research benefits; if the U.S. model is materially more capable on dangerous tasks, restraint reduces the global risk floor even if it does not eliminate foreign availability.",
        methodology:
          "For each proposed frontier release, benchmark it on dangerous-capability proxies (WMDP, Cybench, RE-Bench) against the best already-public foreign open model. Estimate the marginal capability delta on misuse-relevant tasks specifically, separate from general benchmark prestige. Combine with diffusion modeling of how quickly the foreign frontier closes the gap, to determine whether U.S. restraint buys meaningful time or merely cedes ground at zero safety benefit.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Benchmarks of each proposed US release on dangerous-capability proxies (WMDP, Cybench, RE-Bench) against the best foreign open model already public, measuring the gap on misuse-relevant tasks alone.",
        },
        cost_to_verify:
          "$300K-1M (Comparative dangerous-capability benchmarking plus geostrategic diffusion modeling per release)",
        falsification: {
          supporter_flip:
            "If benchmarking showed a proposed US model materially more capable on misuse-relevant tasks than the best public foreign open model, restraint would lower the global risk floor rather than merely cede ground, and the 'match foreign releases' rationale would lose its force.",
          skeptic_flip:
            "If benchmarking showed a proposed US model no more capable on misuse-relevant tasks than the best freely downloadable foreign models (DeepSeek V4, Qwen 3.6), restraint would bind only those who comply, adding little safety to offset the benefits given up.",
          common_ground:
            "Both sides agree frontier-approaching open weights already ship from outside U.S. jurisdiction (DeepSeek, Qwen, Mistral) and that the realistic policy menu spans staged, structured-access, and capability-gated options, not a binary ban-or-release choice.",
          live_disagreement:
            "Whether a given U.S. open release adds meaningful marginal global access to dangerous capability beyond comparable foreign open models — resolvable by benchmarking each release against the best public foreign model on misuse-relevant proxies plus diffusion modeling of how fast the foreign frontier closes the gap.",
        },
      },
      evidence: [
        {
          id: "deepseek-v4-foreign-frontier",
          title: "Capable Open Models Already Ship From Outside U.S. Jurisdiction",
          description:
            "On April 24, 2026, China's DeepSeek released previews of V4-Pro and V4-Flash with weights under the MIT License. By DeepSeek's own results V4-Pro matches Anthropic's Claude Opus 4.6, OpenAI's GPT-5.4 and Google's Gemini 3.1 and beats other open models such as Qwen 3.5 and GLM-5.1 on coding, math and STEM. NIST's Center for AI Standards and Innovation, testing the model independently, scored it lower, at about 8 months behind the U.S. frontier, but called it 'the most capable PRC AI model evaluated by CAISI to date.' Alibaba's Qwen 3.6 (April 2026, Apache 2.0) and France's Mistral 3 (December 2025, Apache 2.0) round out a fast-moving foreign open-weight pack. Whatever the exact standings, frontier-approaching open weights already ship from outside U.S. jurisdiction, and U.S. policy cannot change that.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "MIT Technology Review, 'Three reasons why DeepSeek's new model matters' (Apr 24, 2026); DeepSeek-V4-Pro model card (Hugging Face); NIST CAISI, 'CAISI Evaluation of DeepSeek V4 Pro' (May 1, 2026)",
          sourceUrl: "https://www.technologyreview.com/2026/04/24/1136422/why-deepseeks-v4-matters/",
          reasoning:
            "The existence and licensing of these foreign models are verifiable facts that directly support the enforceability argument. The capability claims are partly lab-reported, but an independent U.S. government evaluation places DeepSeek V4 within months of the frontier, and the core point — that the U.S. cannot prevent foreign open releases — is undisputed.",
        },
        {
          id: "ai-action-plan-china-strategic",
          title: "U.S. AI Action Plan Endorsed Open Weights as a China-Countering Strategic Asset",
          description:
            "The July 2025 'America's AI Action Plan' explicitly stated the U.S. needs 'leading open models founded on American values,' framing domestic open-weight development as a strategic necessity in the competition with China. This marked a notable shift in U.S. policy toward treating open releases as a geopolitical asset rather than primarily a proliferation liability — the crux that, per the research, 'flipped' a chunk of pragmatic center-right opinion toward the pro-open position.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 7,
          },
          source: "America's AI Action Plan (White House, July 2025); Stanford HAI policy analysis",
          sourceUrl: "https://www.whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf",
          reasoning:
            "A primary government document directly stating the strategic rationale for open releases, but politically motivated and therefore low on independence. It evidences that the geopolitical argument has shaped actual U.S. policy without resolving whether that policy correctly weighs the marginal-risk tradeoff.",
        },
        {
          id: "global-risk-floor-argument",
          title: "Foreign Releases Raise the Risk Floor Rather Than Justify Matching It",
          description:
            "Yoshua Bengio's counter to the China argument is that Chinese open weights do not make U.S. open weights safer — they make the global open-weight equilibrium more dangerous, and adding further frontier releases worsens it. The restrictionist position holds that 'they'll release it anyway' is a race-to-the-bottom dynamic, and that the existence of one dangerous release is an argument for international coordination and restraint, not for unilaterally adding another.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 4,
            directness: 7,
          },
          source: "Yoshua Bengio commentary; International AI Safety Report 2026 (arXiv 2501.17805)",
          sourceUrl: "https://arxiv.org/abs/2501.17805",
          reasoning:
            "This is a reasoned expert argument from the chair of the International AI Safety Report, directly engaging the enforceability crux. It is normative rather than empirical — it does not measure marginal risk — so replicability and independence are scored lower despite the author's authority.",
        },
        {
          id: "policy-menu-not-binary",
          title: "The Policy Menu Is a Continuum, Not 'Ban or Release'",
          description:
            "Both the NTIA report and pragmatic-camp voices such as Helen Toner stress that the real options span staged release, structured/researcher access, capability-gated release, downloadable-but-export-controlled tiers, and post-deployment liability — not a binary ban-or-release choice. Toner explicitly separates 'should the U.S. have leading open models' (she leans yes) from 'should we open-weight the most frontier model' (agnostic), illustrating that the enforceability and competitiveness goals can be pursued without releasing the most dangerous capabilities openly.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source: "NTIA Open Model Weights Report; Helen Toner (Georgetown CSET), 80,000 Hours",
          sourceUrl: "https://helentoner.substack.com/p/nonproliferation-is-the-wrong-approach",
          reasoning:
            "Comes from an independent government report and a respected pragmatic-camp analyst, and it reframes the debate constructively by exposing the false dichotomy. It supports caution-without-prohibition; its weight is limited because whether intermediate regimes are actually enforceable against determined actors is itself unsettled.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Dual-Use Foundation Models with Widely Available Weights — Policy Approaches (NTIA)",
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
      title: "Tamper-Resistant Safeguards for Open-Weight LLMs (arXiv 2408.00761)",
      url: "https://arxiv.org/pdf/2408.00761",
    },
    {
      title: "Do the Biorisk Evaluations of AI Labs Actually Measure the Risk of Developing Bioweapons? (Epoch AI)",
      url: "https://epoch.ai/gradient-updates/do-the-biorisk-evaluations-of-ai-labs-actually-measure-the-risk-of-developing-bioweapons",
    },
    {
      title: "The Operational Risks of AI in Large-Scale Biological Attacks: Results of a Red-Team Study (RAND RRA2977-2)",
      url: "https://www.rand.org/pubs/research_reports/RRA2977-2.html",
    },
    {
      title: "Estimating Worst-Case Frontier Risks of Open-Weight LLMs — gpt-oss (arXiv 2508.03153)",
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
    {
      title: "International AI Safety Report 2026 (Bengio chair, arXiv 2501.17805)",
      url: "https://arxiv.org/abs/2501.17805",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Do open weights provide real catastrophic uplift, or only duplicate already-public knowledge?",
      content:
        "Safety fine-tuning on open models can be stripped for a few hundred dollars, but current biorisk evaluations have not shown that open models give amateurs a qualitative uplift over search engines and existing literature. Is the misuse risk a function of new capability the model adds, or merely of exposing knowledge that was already accessible — and how fast is that delta growing as open models approach the closed frontier?",
    },
    {
      id: "q2",
      title: "If release is irreversible, does that justify caution at release or a pivot to use-based regulation?",
      content:
        "Everyone agrees released weights cannot be recalled — the LLaMA leak settled that empirically. Restrictionists conclude the precautionary burden at the release decision is therefore uniquely high. Pro-open advocates draw the opposite lesson: because model-level recall is impossible, regulation should target harmful use and downstream fine-tuners, where intent and harm are observable. Which inference is correct?",
    },
    {
      id: "q3",
      title: "Does restricting U.S. open releases reduce global risk, or just cede the field to China?",
      content:
        "DeepSeek V4 and Qwen 3.6 show frontier-approaching open models already ship from outside U.S. jurisdiction. The AI Action Plan treats American open weights as a strategic asset; Bengio argues additional frontier releases raise the global risk floor regardless of who ships them. Is U.S. restraint a meaningful safety lever or unilateral disarmament — and does the staged/structured-access middle path dissolve the dilemma?",
    },
  ],
};
