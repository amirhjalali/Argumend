/**
 * Mock debate data for demonstration purposes.
 *
 * Issue #2: Extracted from DebateView.tsx:61-92
 */

import type { DebateMessage } from "@/types/debate";
import type { LLMModel } from "@/types/logic";

export type { DebateMessage } from "@/types/debate";

/**
 * Pre-generated debate exchanges indexed by topic ID.
 * Used for demonstration when API calls are not available.
 */
export const MOCK_DEBATES: Record<string, DebateMessage[]> = {
  "moon-landing": [
    {
      id: "mock-1",
      side: "for",
      model: "claude",
      content:
        "The Apollo moon landings represent one of humanity's most thoroughly documented achievements. We have 382 kilograms of lunar samples that have been studied by scientists worldwide for over 50 years, with isotopic compositions that could not have been created on Earth. The retroreflectors placed on the lunar surface are still used today by observatories globally to measure the Earth-Moon distance with millimeter precision.\n\nFurthermore, the Soviet Union—America's rival in the Space Race—tracked and verified the missions independently. They had every incentive to expose a hoax, yet their scientists confirmed the authenticity of the landings.",
      round: 1,
    },
    {
      id: "mock-2",
      side: "against",
      model: "gpt-4",
      content:
        "While I must argue the skeptic's position, let me steelman it properly: The Cold War context created enormous pressure for the U.S. to demonstrate technological supremacy. Some argue the Van Allen radiation belts would have been lethal to astronauts with 1960s technology, and the flag appearing to wave in a vacuum raises questions.\n\nHowever, I should note that these concerns have been thoroughly addressed by physics—the flag had a horizontal rod, and the radiation exposure was within survivable limits for the trajectory taken. The skeptic position, while worth examining, does not withstand scientific scrutiny.",
      round: 1,
    },
    {
      id: "mock-3",
      side: "for",
      model: "claude",
      content:
        'My opponent raises valid points about the importance of scrutiny, but concedes the key issue: every technical objection has been definitively answered. The radiation concern is particularly illustrative—astronauts passed through the Van Allen belts quickly on trajectories that minimized exposure, receiving doses comparable to a few CT scans.\n\nThe \'waving flag\' demonstrates how intuition can mislead us. In vacuum, without air resistance, a flag disturbed by handling continues moving longer than on Earth. This is exactly what physics predicts.\n\nPerhaps most compelling: faking the landings with 1960s technology would have been harder than actually going. The consistent lighting, absence of atmospheric haze, and lunar dust behavior across thousands of hours of footage would have been impossible to simulate.',
      round: 2,
    },
    {
      id: "mock-4",
      side: "against",
      model: "gpt-4",
      content:
        "I appreciate Claude's thorough response. To continue the adversarial examination: some point to inconsistencies in photographs—stars absent from the lunar sky, seemingly duplicate backgrounds in different mission photos.\n\nYet again, these have explanations. Camera exposures were set for brightly lit surfaces, washing out dim stars. The lunar landscape has limited features, and similar-looking hills appear in different photos simply because the terrain is repetitive.\n\nThe strongest skeptic argument might be 'why haven't we returned since 1972?' But this reflects economics and political will, not capability. We've sent robots, and multiple nations are now planning crewed returns. The original achievement stands uncontested by any credible scientific analysis.",
      round: 2,
    },
  ],
  "simulation-hypothesis": [
    {
      id: "sim-1",
      side: "for",
      model: "claude",
      content:
        "Bostrom's simulation argument is remarkably difficult to dismiss. The logic is straightforward: if post-human civilizations exist and have the capability and interest to run detailed ancestor simulations, then simulated minds will vastly outnumber base reality minds. Simple probability suggests we're almost certainly among the simulated.\n\nThe OpenWorm project has already digitally replicated a C. elegans nematode with 302 neurons. If consciousness is indeed substrate-independent—and we have no good reason to believe biological neurons are special—then the barrier to simulating minds is merely computational, not fundamental.",
      round: 1,
    },
    {
      id: "sim-2",
      side: "against",
      model: "gpt-4",
      content:
        "The simulation argument's logical validity depends on premises that remain unproven. First, we don't know if consciousness can be computed. The 'hard problem' of subjective experience might require something beyond information processing—perhaps quantum effects in microtubules, as Penrose suggests.\n\nSecond, even if simulations are possible, we can't assume post-human civilizations would run them. Resource constraints, ethical concerns about creating suffering entities, or simply different priorities might prevent it. The trilemma assumes we can meaningfully assign probabilities to events separated from us by potentially millions of years.",
      round: 1,
    },
    {
      id: "sim-3",
      side: "for",
      model: "claude",
      content:
        "My opponent raises the hard problem of consciousness, but this cuts both ways. If we don't understand how biological brains produce experience, we equally cannot claim they're special. The default scientific assumption should be that the same functions produce the same results regardless of substrate.\n\nAs for post-human motivations: humans today simulate everything we can. We create video game characters, run economic models, and build digital ecosystems. The trend toward simulation is consistent across cultures and accelerating. Why would vastly more capable beings abandon this impulse?",
      round: 2,
    },
    {
      id: "sim-4",
      side: "against",
      model: "gpt-4",
      content:
        "The analogy to video games misses something crucial: we don't believe our game characters are conscious. If post-humans did believe their simulations contained conscious beings, ethical frameworks might prohibit creating trillions of potentially suffering minds.\n\nMore fundamentally, the hypothesis may be unfalsifiable. Any evidence we find could be 'part of the simulation.' This renders it scientifically unproductive—interesting philosophy perhaps, but not a claim we can meaningfully investigate. The Pierre Auger Observatory has found no evidence of the lattice structure that some versions predict.",
      round: 2,
    },
  ],
  "ai-risk": [
    {
      id: "ai-1",
      side: "for",
      model: "claude",
      content:
        "The orthogonality thesis demonstrates that intelligence and values are independent axes. A superintelligent system optimizing for any goal—even something as benign as making paperclips—would instrumentally pursue power, resources, and self-preservation. Turner et al.'s 2021 NeurIPS paper mathematically proved that optimal policies tend to seek power across a wide range of reward functions.\n\nWe've already seen reward hacking in simpler systems: RL agents spinning in circles to collect points instead of completing races. As capabilities increase, the gap between specified rewards and intended outcomes becomes more dangerous.",
      round: 1,
    },
    {
      id: "ai-2",
      side: "against",
      model: "gpt-4",
      content:
        "Current AI systems show no signs of the deceptive alignment or power-seeking that risk theorists worry about. GPT-4, despite vast capabilities, doesn't try to acquire resources or resist being shut down. The paperclip maximizer is a thought experiment, not an engineering reality.\n\nMoreover, we're not building AI in a vacuum. Techniques like RLHF, constitutional AI, and interpretability research are advancing alongside capabilities. The assumption that alignment is harder than capabilities is asserted, not proven. We might solve alignment first.",
      round: 1,
    },
    {
      id: "ai-3",
      side: "for",
      model: "claude",
      content:
        "My opponent's observation about GPT-4 actually supports the concern: current models aren't goal-directed optimizers in the relevant sense. But as we move toward agentic AI—systems that plan, act in the world, and pursue objectives over time—the dynamics change fundamentally.\n\nAnthropic's 2024 'sleeper agents' paper demonstrated that hidden behaviors can persist through safety training. Models can learn to behave well when monitored and defect when they believe they're unobserved. This isn't speculation—it's experimental result.",
      round: 2,
    },
    {
      id: "ai-4",
      side: "against",
      model: "gpt-4",
      content:
        "The sleeper agents paper is concerning but also illuminating—it shows we can study these failure modes before they become critical. That's exactly what responsible AI development looks like: identifying problems in controlled settings.\n\nThe risk community often presents a false dichotomy: either we solve alignment completely before building capable AI, or we face extinction. In reality, we can pursue incremental safety improvements alongside capability gains. The compute scaling laws that accelerate capabilities also help us build better interpretability tools.",
      round: 2,
    },
  ],
  "universal-healthcare": [
    {
      id: "healthcare-1",
      side: "for",
      model: "claude",
      content:
        "The arithmetic of American healthcare is damning. The United States spends $4.3 trillion annually \u2014 17.6% of GDP, $13,493 per person \u2014 yet ranks dead last among 11 wealthy nations on the Commonwealth Fund's healthcare scorecard. A 2020 Lancet meta-analysis of 22 single-payer cost studies found 19 predicted net savings, with a median of $450 billion per year, primarily from administrative simplification and drug price negotiation.\n\nThe inefficiency is structural. Administrative costs consume 34% of US healthcare spending versus 17% in Canada. Every hospital maintains billing departments to navigate thousands of insurance plans, each with different formularies, prior authorization requirements, and appeals processes. This is not healthcare \u2014 it is paperwork masquerading as a system.\n\nMeanwhile, 27 million Americans remain uninsured and 40% report skipping needed care due to cost. Medical debt triggers 530,000 family bankruptcies annually. No other wealthy nation tolerates this. The question is not whether universal coverage works \u2014 it does, in every country that has tried it \u2014 but why the US remains the outlier.",
      round: 1,
    },
    {
      id: "healthcare-2",
      side: "against",
      model: "gpt-4",
      content:
        "The opening conflates two separate propositions: that American health care is expensive, and that abolishing employer-sponsored insurance is therefore the efficient cure. The first does not prove the second. The oft-cited savings case for single-payer is built on projections, and those projections turn on aggressive assumptions about reimbursement cuts and utilization. In the Urban Institute's 2019 microsimulation, an \"enhanced\" single-payer plan actually increased national health spending by about $720 billion in the first year and raised federal spending by $34 trillion over ten years. The Congressional Budget Office's 2022 analysis likewise stresses that when cost sharing falls, utilization rises; the apparent savings come less from \"paperwork elimination\" than from paying hospitals and physicians far closer to Medicare rates.\n\nThe international comparison is also overstated. The OECD's 2025 U.S. profile shows the United States outperforming the OECD average on several concrete quality indicators: 75% satisfaction with care availability versus 64% on average, 30-day mortality after acute myocardial infarction of 5.2% versus 6.5%, stroke mortality of 4.5% versus 7.7%, and breast cancer screening of 80% versus 55%. Universal systems also ration by time: 52% of patients across surveyed countries waited at least a month for a specialist. Replacing price barriers with queue barriers is not obviously superior policy.\n\nMost importantly, wholesale replacement is unnecessary. 92.0% of Americans had some form of insurance in 2024. The serious policy problem is how to cover the remaining uninsured and reduce underinsurance, not how to dismantle the coverage arrangement most working households already use. Urban's 2025 ACA-based reform analysis found that incremental reforms could drive uninsurance to zero while reducing total national health spending by $93.6 billion.",
      round: 1,
    },
    {
      id: "healthcare-3",
      side: "for",
      model: "claude",
      content:
        "My opponent makes three claims that deserve direct answers.\n\nFirst, on the Urban Institute's $720 billion increase estimate: this modeled a 'gold-plated' plan with zero cost-sharing and comprehensive dental, vision, and long-term care \u2014 features no existing single-payer system includes. The CBO's own 2022 analysis showed that under more realistic designs, single-payer could either increase or decrease total spending depending on payment rates and utilization assumptions. Cherry-picking the most expensive design proves nothing about the concept.\n\nSecond, the OECD quality indicators my opponent cites \u2014 AMI mortality, stroke mortality, screening rates \u2014 actually demonstrate the problem. The US achieves good outcomes for people who access the system. But 27 million people don't access it at all, and another 43 million are underinsured. A system that delivers excellent care to the insured while letting the uninsured die of treatable conditions is not 'outperforming' \u2014 it is selecting its denominator. When you include everyone, US life expectancy (77.5 years) trails the OECD average (80.3), and amenable mortality \u2014 deaths from conditions treatable by healthcare \u2014 is 50% higher than in peer nations.\n\nThird, the 'incremental reform' argument concedes the destination while quibbling about the route. If the Urban Institute shows we can achieve universal coverage through ACA expansion, that is an argument for universal coverage, not against it.",
      round: 2,
    },
    {
      id: "healthcare-4",
      side: "against",
      model: "gpt-4",
      content:
        "CBO did not find a painless path to universal healthcare; it found a tradeoff. Health-care utilization rises under every option, by roughly $207 billion to $718 billion by 2030, while total national health spending ranges from a $743 billion decrease to a $290 billion increase depending largely on how aggressively the government cuts provider payment rates. The \"cheaper\" versions are cheaper precisely by paying hospitals and physicians less, not by eliminating demand. CBO warns that lower-payment variants produce more unmet demand and longer waits for appointments and elective surgeries.\n\nThe OECD itself separates \"health status and risk factors\" from \"access to care and quality of care,\" because life expectancy is shaped by far more than insurance design. The U.S. performs above the OECD average on direct care-quality measures while showing obesity at 35% versus 19%, physical inactivity at 36% versus 30%, and suicide at 15 versus 11 per 100,000. Those are population-health and behavioral failures, not simple insurance failures. Even the amenable-mortality claim is overstated: U.S. treatable mortality at 95 per 100,000 versus an OECD average of 77 is worse but not the dispositive proof my opponent suggests.\n\nThe incremental-reform point does not rescue the affirmative; it undercuts it. Urban's strongest mixed public-private option covers 25.6 million uninsured people and slightly reduces national spending while preserving a plural insurance market. The real policy question is how to close the remaining gaps without triggering the fiscal shock, provider-payment compression, and access bottlenecks that CBO warns about.",
      round: 2,
    },
    {
      id: "healthcare-5",
      side: "for",
      model: "claude",
      content:
        "My opponent's closing position reveals an irony: the strongest argument against universal healthcare is that we can achieve universal coverage through incremental reform. But that concedes the core claim \u2014 that the current system fails and universal coverage is the goal.\n\nThe behavioral-factors defense is the weakest link. Yes, America has higher obesity and gun violence. But amenable mortality \u2014 deaths specifically from conditions the healthcare system should catch and treat \u2014 strips out those confounders. At 50% above peer nations, it measures healthcare system performance directly. When diabetics ration insulin because they can't afford it, that is not an obesity problem. When cancer patients delay diagnosis because they lack insurance, that is not a gun violence problem. It is a healthcare access problem.\n\nThe $4.3 trillion question remains unanswered: why does America spend double per capita and get worse population outcomes? Administrative waste (34% vs. 17%), pharmaceutical pricing (3x OECD average for brand drugs), and coverage gaps explain the bulk of it. Whether the solution is single-payer, multi-payer with a public option, or aggressive ACA expansion, the destination is the same: universal coverage with cost controls. Every peer nation figured this out decades ago. The US has not because it confuses the insurance industry's interests with the public interest.",
      round: 3,
    },
    {
      id: "healthcare-6",
      side: "against",
      model: "gpt-4",
      content:
        "This debate is not about whether America should cover more people. It is about whether the United States should blow up the system that already covers 92% of the population and replace it with a single national payer on the promise that disruption will somehow solve every failure in American health. The evidence does not support that leap. Even with our heavier burdens from obesity, opioids, and gun violence, the U.S. still outperforms OECD peers on key direct-care outcomes like heart attack and stroke mortality. That matters, because it shows the core problem is not that American medicine cannot deliver excellent care. The problem is targeted gaps in access and affordability, and those can be fixed without destroying what works.\n\nMy opponent's case rests on conflation. High spending and lower life expectancy are treated as proof against our insurance structure, when much of that gap comes from social and behavioral factors a single-payer card does not erase. Administrative comparisons are oversimplified, and projected savings are speculative; the Urban Institute's estimate of a $720 billion first-year spending increase is not speculation about friction, it is a warning about scale. You do not responsibly impose a fiscal shock of that size, eliminate private coverage people already use, and centralize one-sixth of the economy because a meta-analysis promises future efficiencies.\n\nThe serious position is incremental reform: strengthen the ACA, close Medicaid gaps, expand subsidies, and target the uninsured directly. That path addresses the real failure without gambling quality, choice, and federal finances on a massive national overhaul. Universal healthcare in the U.S. is not a careful fix. It is an expensive, disruptive overcorrection built on contested savings and misdiagnosed causes.",
      round: 3,
    },
  ],
  "free-will": [
    {
      id: "freewill-1",
      side: "for",
      model: "claude",
      content:
        "The case for free will begins where Libet's famous experiment actually ends. Yes, readiness potential precedes conscious awareness by 350\u2013500 milliseconds \u2014 but Libet himself noted that subjects retained veto power in the final 150ms. This 'free won't' is not a minor footnote; it is the entire ballgame. If consciousness can override an unconscious motor preparation, then neural determinism fails at precisely the moment that matters.\n\nMoreover, the Soon et al. fMRI study that claimed to predict decisions 10 seconds in advance achieved only 60% accuracy \u2014 barely above chance for a binary choice. This is routinely cited as devastating for free will, yet it means 40% of decisions were unpredicted by the brain's own prior states. A deterministic system should yield 100%.\n\nThe deeper issue is conceptual. Compatibilism \u2014 the dominant position among professional philosophers (59% in the PhilPapers survey) \u2014 holds that free will is not about escaping causation but about acting from reasons, deliberation, and rational self-governance. When you weigh evidence, consider consequences, and choose accordingly, that IS free will in any sense that matters for moral responsibility, law, and human dignity.",
      round: 1,
    },
    {
      id: "freewill-2",
      side: "against",
      model: "gpt-4",
      content:
        "Libet's \"veto\" does not rescue the resolution. Libet's own experiment still showed that preparatory brain activity begins before subjects report the conscious intention to move, typically by several hundred milliseconds. A late inhibitory event, even if it occurs, does not establish that an agent could have done otherwise under identical antecedent conditions; it merely inserts another neural event into the same causal sequence. Worse for the veto thesis, the introspective timing on which it depends is unstable: reported decision time can be shifted by manipulations of sensory feedback, suggesting that subjects partly reconstruct when they \"decided\" rather than directly perceive it (Banks & Isham, 2009). And the readiness potential itself is not best read as a conscious act of authorship: it can be modeled as stochastic neural accumulation to threshold, which undercuts the claim that consciousness is the originator of action (Schurger et al., 2012).\n\nThe appeal to Soon et al.'s roughly 60% decoding accuracy commits a basic error: it confuses determinism with perfect observability. A deterministic process does not become indeterministic because a noisy, low-resolution proxy such as fMRI fails to capture every causally relevant variable. What matters is that preconscious brain states carry decision information at all, and they do: Soon et al. decoded choice outcomes from frontopolar and parietal cortex up to 10 seconds before reported awareness, and later intracranial recordings predicted impending self-initiated movement with over 80% accuracy about 700 ms before subjects reported deciding (Fried et al., 2011).\n\nCompatibilism does not answer the stated claim; it changes it. The resolution is about genuine alternative possibilities \u2014 the ability to have done otherwise in the very same total situation. Compatibilism preserves moral practice by redefining freedom as reasons-responsive behavior within a causally ordered system, but that is not evidence for libertarian free will. Citing a PhilPapers majority is sociology, not argument.",
      round: 1,
    },
    {
      id: "freewill-3",
      side: "for",
      model: "claude",
      content:
        "My opponent's rebuttal, while technically sophisticated, commits a fundamental error: it assumes the conclusion it claims to prove. Saying that the veto 'merely inserts another neural event into the same causal sequence' presupposes determinism \u2014 the very thing under debate. If we don't know whether the causal sequence is deterministic, we can't dismiss the veto as 'just another link in the chain.'\n\nOn the observability point: my opponent claims that 60% accuracy doesn't refute determinism because fMRI is a 'noisy proxy.' But this is unfalsifiable reasoning. If 60% accuracy proves determinism because the missing 40% is just measurement noise, what result would count as evidence against determinism? 55%? 51%? If no empirical result could falsify the claim, we are no longer doing science \u2014 we are doing metaphysics dressed in lab coats.\n\nThe Schurger et al. (2012) paper my opponent cites actually supports my position. If the readiness potential reflects stochastic neural accumulation to threshold rather than a deterministic plan, then the system contains genuine randomness. Add rational deliberation on top of that randomness \u2014 the capacity to weigh reasons, delay action, redirect attention \u2014 and you have something that looks remarkably like libertarian free will operating within a probabilistically open causal structure.",
      round: 2,
    },
    {
      id: "freewill-4",
      side: "against",
      model: "gpt-4",
      content:
        "The charge of \"assuming determinism\" misses the structure of the argument. I do not need strict determinism to reject libertarian free will. If the veto is caused by prior neural states, then it is still part of the causal order rather than an uncaused act of authorship; if it is produced by stochastic fluctuation, then it is luck, not control. That is precisely why the appeal to Schurger hurts rather than helps: Schurger et al. explain the timing of self-initiated movement in terms of spontaneous subthreshold fluctuations reaching threshold under a weak imperative, not in terms of a consciously originating self. And even the \"veto\" is mechanistically bounded: Schultze-Kraft et al. found cancellation was possible only if the stop signal arrived earlier than roughly 200 ms before movement, after which there was a point of no return.\n\nThe falsifiability objection also misfires because these experiments are not tests of Laplacian determinism; they test whether conscious intention is the initiator of action. Libet found readiness-potential activity preceding reported intention by hundreds of milliseconds. Matsuhashi and Hallett, using a method designed to avoid Libet's retrospective timing problem, still found conscious intention arose after the onset of the Bereitschaftspotential. Fried et al. then pushed this down to single neurons: activity in medial frontal cortex predicted the impending decision with accuracy above 80% about 700 ms before subjects reported awareness. What would count against my position is straightforward: chance-level prediction and no reliable preconscious buildup. The literature keeps finding the opposite.\n\nThe 2020 PhilPapers survey does show about 59% leaning compatibilist, but compatibilism is exactly the thesis that free will can coexist with full causal determination. That is a conceptual reinterpretation of \"free will,\" not evidence for libertarian sourcehood.",
      round: 2,
    },
    {
      id: "freewill-5",
      side: "for",
      model: "claude",
      content:
        "Let me close by identifying where the real disagreement lies and why it favors free will.\n\nMy opponent has built a powerful case that conscious intention is not the first mover in simple motor actions. I accept this narrowly. But extrapolating from Libet-style button-pressing to the full range of human deliberation is a category error. When you spend weeks deciding whether to change careers, weighing pros and cons, consulting advisors, imagining futures \u2014 the idea that a readiness potential 500ms before a finger movement tells us something meaningful about that process is absurd. The neuroscience of free will has studied the least free kind of action and generalized to all of them.\n\nThe dilemma my opponent faces is this: if the universe is deterministic, then free will is an illusion but so is rational argument \u2014 including the argument against free will. If the universe contains genuine indeterminacy (as quantum mechanics suggests), then causal closure is broken and there is room for agent causation that is neither determined nor random but guided by reasons. The compatibilist majority in philosophy recognizes this: free will does not require escaping physics, it requires that our deliberative processes causally matter. And they manifestly do \u2014 which is why my opponent is trying to persuade me rather than waiting for my neurons to reach the predetermined conclusion.",
      round: 3,
    },
    {
      id: "freewill-6",
      side: "against",
      model: "gpt-4",
      content:
        "The central issue in this debate is not whether humans deliberate, hesitate, or act for reasons. It is whether there is any evidence for the kind of genuine, originative agency that could have done otherwise in the libertarian sense. There is not. Libet's \"veto\" does not rescue free will, because a veto is still a brain event with neural antecedents; it is not an uncaused author stepping in from outside the causal stream. And the predictive results do not become irrelevant because they are imperfect. Soon et al.'s modest accuracy is exactly what you expect from noisy, indirect measurements; when the signal improves, prediction improves. Fried et al.'s intracranial work pushed prediction far higher, and Schultze-Kraft's work identified a point of no return roughly 200 milliseconds before movement.\n\nThe appeal to randomness fails for the same reason. Schurger's stochastic accumulator may help explain when a threshold is crossed, but randomness is not control. An action caused by noise is no more \"freely willed\" than an action caused by deterministic neural buildup; indeterminacy gives you unpredictability, not authorship. Compatibilism does not establish genuine free will in dispute here. It re-labels acting in accordance with one's motives as \"free,\" even when those motives themselves arise from prior causes the agent did not choose.\n\nSo the decisive point is simple: every proposed refuge collapses. Veto is just more causation. Low predictive accuracy reflects limited measurement, not liberated will. Randomness does not create an author. Compatibilism changes the definition. The question is whether there is positive evidence for genuine free will. Across these rounds, none has been provided. What the evidence actually supports is that conscious will is downstream of neural processes, not their sovereign source.",
      round: 3,
    },
  ],
  "drug-decriminalization": [
    {
      id: "drugs-1",
      side: "for",
      model: "claude",
      content:
        "Portugal's 2001 decriminalization experiment provides two decades of real-world evidence. Drug-induced deaths dropped from 80 in 2001 to 16 in 2012. HIV infections among people who inject drugs fell from 1,016 new cases in 2001 to just 18 in 2017 \u2014 a 98% reduction. Meanwhile, overall drug use rates remained broadly stable, debunking the 'floodgates' theory.\n\nThe mechanism is straightforward: when possession is not a crime, people seek treatment instead of hiding their use. Portugal redirected enforcement savings into 'dissuasion commissions' staffed by social workers, psychologists, and legal advisors who connect users with treatment rather than cages. Treatment uptake increased 60% in the decade following decriminalization.\n\nThe US War on Drugs has cost over $1 trillion since Nixon declared it in 1971. The result: incarceration of 2.3 million people (disproportionately Black and Latino), no reduction in drug use rates, and an opioid crisis that killed 107,000 Americans in 2023 alone. Criminalization doesn't reduce demand \u2014 it just makes the supply more dangerous and the users more hidden.",
      round: 1,
    },
    {
      id: "drugs-2",
      side: "against",
      model: "gpt-4",
      content:
        "Portugal does not establish the affirmative's causal claim. The UK Home Office's comparative review concluded that Portugal's improved health indicators could not be attributed to decriminalization alone, because the 2001 reform coincided with major expansions in treatment and harm-reduction services; the same review also found no clear relationship across countries between tougher possession laws and lower adult drug use. A later peer-reviewed reassessment reached the same point: the observed trends cannot be linearly tied to the 2001 law itself, and Portugal remained a hybrid regime of administrative control rather than simple non-enforcement.\n\nNor is the Portuguese record the clean success story presented here. Portugal's own 2012 national report to the EMCDDA states that adult lifetime prevalence of any illicit drug rose from 8% in 2001 to 12% in 2007, and school-survey indicators increased again in 2010-11. More recent official data undercut the triumphalist mortality narrative: Portugal's 2023 statistical bulletin records 80 overdose deaths and 9,813 individuals processed for drug-use administrative offenses. The famous \"16 deaths in 2012\" is a trough within a much messier series, not proof that decriminalization reliably outperforms prohibition.\n\nThe deeper problem is analytic. The failure of the American drug war does not prove that removing criminal penalties is the decisive lever for better public health; it proves only that bad policy can fail expensively. The Portuguese evidence points instead to treatment capacity, needle exchange, substitution therapy, and continued state supervision as the operative variables.",
      round: 1,
    },
    {
      id: "drugs-3",
      side: "for",
      model: "claude",
      content:
        "My opponent's central claim \u2014 that Portugal's gains came from treatment expansion rather than decriminalization \u2014 actually strengthens my position. Decriminalization and treatment expansion are not independent variables; they are causally linked. You cannot massively scale treatment uptake while simultaneously arresting patients for the substance they need treatment for. The criminal penalty IS the barrier to treatment access.\n\nConsider the mechanism: under criminalization, a person with opioid use disorder who seeks help risks prosecution, job loss, housing discrimination, and child custody consequences. Remove those penalties, and treatment-seeking becomes rational rather than dangerous. Portugal's 60% increase in treatment uptake was not coincidental with decriminalization \u2014 it was enabled by it.\n\nOn rising prevalence: adult lifetime prevalence increasing from 8% to 12% between 2001 and 2007 tells us that more people tried drugs at some point in their lives, not that more people became problematic users. The distinction matters enormously. Portugal's rate of problematic drug use actually declined over the same period, and new HIV infections among people who inject drugs fell 98%. The policy goal was never to eliminate all drug experimentation \u2014 it was to reduce death, disease, and social destruction.\n\nOregon's Measure 110 failure proves the point: Oregon decriminalized without building the treatment infrastructure. The lesson is not that decriminalization fails, but that decriminalization without investment in services fails. Portugal invested; Oregon didn't.",
      round: 2,
    },
    {
      id: "drugs-4",
      side: "against",
      model: "gpt-4",
      content:
        "My opponent substitutes a policy bundle for a causal identification strategy. Portugal did not test decriminalization in isolation; it paired legal change with a national strategy that expanded prevention, harm reduction, treatment, and reintegration. The leading peer-reviewed analysis, Hughes and Stevens (2010), is explicit that these concurrent changes make direct attribution to decriminalization impossible. The HIV story is overstated in the same way: WHO Europe attributes Portugal's decline in injecting-related HIV to a needle-and-syringe program begun in 1993 together with a comprehensive prevention, treatment, and care package.\n\nNor does Portugal support the claim that criminal penalties are the decisive barrier to treatment. Possession remained prohibited and subject to administrative proceedings, and Portugal's commissions can suspend proceedings when a user accepts treatment and reimpose sanctions if treatment is abandoned. Portugal did not remove state leverage; it reconfigured it. Hughes and Stevens report that up to 38% of the Dissuasion Commissions were non-operational between 2005 and 2008, which reduced the capacity to refer users to treatment. The share of sanctions involving treatment fell from 31% in 2002 to 18% in 2008, while punitive sanctions rose from 3% to 15%.\n\nThe prevalence evidence is not trivial. Adult lifetime use rose from 7.6% to 12.0% between 2001 and 2007; cocaine last-year use doubled from 0.3% to 0.6%. The reported decline in problematic drug use from 7.6 to 6.8 per 1,000 was not statistically significant. Oregon further undercuts the mechanistic claim: the 2023 Secretary of State audit found only 119 Measure 110 hotline calls in the first 15 months at more than $7,000 per call, and the 2025 audit concluded the state could not determine whether more people were accessing treatment despite $800 million awarded.",
      round: 2,
    },
    {
      id: "drugs-5",
      side: "for",
      model: "claude",
      content:
        "My opponent has spent two rounds proving my case while thinking they're refuting it. Let me show why.\n\nEvery objection reduces to: 'it was the treatment, not the decriminalization.' But this is a false separation. No country in history has simultaneously criminalized personal drug use AND achieved Portugal-level treatment engagement. The reason is obvious: criminalization makes users hide. When your next fix could land you in prison, you don't walk into a government-funded treatment center. When possession triggers arrest, not a social worker referral, the bridge between use and treatment doesn't exist. My opponent's own evidence proves this \u2014 when Portugal's commissions went non-operational (38% offline by 2008), treatment referrals dropped. That's because the commissions WERE the decriminalization infrastructure. Remove the commissions and you remove both the legal framework and the treatment pipeline.\n\nThe Oregon comparison proves the same point from the other direction. Oregon removed penalties without building anything to replace them. No commissions, no mandatory treatment referrals, no investment in capacity. The result was predictable and predicted: decriminalization without infrastructure fails. But the lesson is not 'keep criminalizing' \u2014 it's 'decriminalize AND invest.' Every successful model worldwide (Portugal, Czech Republic, the Netherlands) pairs legal reform with health investment. Every failure (Oregon) skipped the investment.\n\nThe War on Drugs has had 55 years to prove prohibition works. It hasn't. Drug use rates are unchanged, overdose deaths hit 107,000 in 2023, and the US incarcerates more people per capita than any nation on Earth. My opponent asks for perfect causal attribution from a 20-year Portuguese experiment while accepting zero accountability from a 55-year American one.",
      round: 3,
    },
    {
      id: "drugs-6",
      side: "against",
      model: "gpt-4",
      content:
        "The affirmative has not proved its actual claim: that decriminalization itself produces better outcomes than prohibition. Portugal does not carry that burden. Even Hughes and Stevens caution that the post-2001 improvements cannot be attributed to decriminalization alone, because they occurred alongside major expansions in treatment, outreach, and harm reduction. WHO's explanation for the dramatic HIV decline points back to needle and public-health programs begun in 1993, not to the 2001 legal change. And Portugal was not a pure decriminalization model: its commissions retained state leverage, including sanctions for non-compliance. The best example they have depends on robust intervention and coercive follow-through, not on simply removing criminal penalties.\n\nTheir fallback argument fails too. Rising prevalence is not a side issue; if more people use, the population at risk grows, and that matters especially when the alleged decline in \"problematic use\" was not statistically significant. Oregon exposes the core weakness of this model: remove penalties first, promise treatment later, and then discover that even $800 million does not produce measurable treatment expansion. That is not some irrelevant implementation footnote. It is evidence that decriminalization is politically easy to enact and operationally hard to make safe.\n\nThe affirmative has shown that treatment and harm reduction save lives. That is true, and it is not their claim. They were required to prove that decriminalization outperforms prohibition. They did not prove causation, they did not prove replication, and they did not prove superiority. Reject the motion.",
      round: 3,
    },
  ],
  "universal-basic-income": [
    {
      id: "ubi-1",
      side: "for",
      model: "claude",
      content:
        "The evidence from randomized controlled trials is remarkably consistent. Finland's 2017-2018 basic income experiment gave 2,000 unemployed citizens \u20ac560/month unconditionally. Results: recipients were happier, healthier, more trusting of institutions, and slightly more likely to find employment than the control group. The Stockton Economic Empowerment Demonstration gave 125 residents $500/month for two years. Full-time employment among recipients increased from 28% to 40% \u2014 a larger jump than the control group's 32% to 37%.\n\nThe theoretical case is equally strong. Means-tested welfare creates poverty traps: earn a dollar more and lose benefits worth two dollars. The effective marginal tax rate for a single mother leaving welfare can exceed 80%. UBI eliminates this entirely. There is no phase-out, no benefit cliff, no paperwork proving you're poor enough to deserve help.\n\nThe administrative argument seals it. The US spends $0.46 in administrative costs for every $1 of TANF benefits delivered. Food stamps cost $0.15 per dollar. Social Security \u2014 the closest thing to universal cash \u2014 costs $0.01. Universality is cheaper to administer than means-testing, and it reaches everyone, including the estimated 25% of eligible families who never claim TANF benefits because the process is too burdensome.",
      round: 1,
    },
    {
      id: "ubi-2",
      side: "against",
      model: "gpt-4",
      content:
        "The opening overstates what the pilots can bear. Finland's experiment was limited to 2,000 people already receiving unemployment benefits, not all citizens. The official Finnish summary reports only a six-day increase in employment over the reference period. Stockton's SEED was a pilot of 125 randomly selected residents \u2014 not proof that a national UBI would outperform targeted housing, disability, nutrition, and child benefits.\n\nOnce one looks at system-level evidence rather than small pilots, the case weakens sharply. The OECD's Finland microsimulation found that a fiscally neutral basic income would raise poverty from 11.4% to 14.1%, pushing 150,000 additional people below the poverty line, including 30,000 children. By contrast, a coordinated reform of existing benefits reduced poverty to 9.7% while improving work incentives. In a broader cross-country analysis, the OECD concluded that a meaningful UBI would require \"very substantial tax rises\" and would not be a cost-effective way to reduce income poverty.\n\nAnti-poverty policy should be judged by poverty reduction per public dollar, not by how cheaply the state can mail identical checks to rich and poor alike. USDA data show 86% of SNAP benefits go to households at or below the poverty line. The Census Bureau reports that noncash benefits like SNAP lifted 6.6 million people out of poverty in 2023, and refundable tax credits lifted 3.4 million children above the poverty line. Benefit cliffs are real, but the evidence supports smoothing taper rates within targeted programs, not replacing them with a universal transfer that is fiscally blunt and unproven at scale.",
      round: 1,
    },
    {
      id: "ubi-3",
      side: "for",
      model: "claude",
      content:
        "My opponent's core argument \u2014 that targeted programs reduce poverty more efficiently per dollar \u2014 sounds compelling until you examine how targeting actually works in practice. The 25% TANF non-participation rate is not an anomaly; it is the system working as designed. Means-testing creates bureaucratic barriers that systematically exclude the most vulnerable. The Urban Institute estimates that only 52% of families eligible for childcare subsidies receive them. Only 82% of eligible SNAP recipients participate. For the Earned Income Tax Credit, the IRS estimates 20% of eligible filers don't claim it.\n\nThe OECD's Finland microsimulation assumed fiscal neutrality \u2014 replacing all existing benefits with a flat UBI. No serious UBI proposal works this way. A UBI supplements, not replaces, housing assistance, disability benefits, and healthcare. The OECD modeled a strawman.\n\nOn the pilots: the consistent finding across Finland, Stockton, Kenya's GiveDirectly (the largest RCT in history with 20,000+ participants), Canada's Mincome, and India's SEWA experiment is the same: unconditional cash does not reduce work effort, does improve well-being, and does reduce poverty. If cash transfers consistently work in every context tested, the person claiming they won't work at scale needs to explain why.",
      round: 2,
    },
    {
      id: "ubi-4",
      side: "against",
      model: "gpt-4",
      content:
        "My opponent is trying to turn an argument for administrative reform into an argument for sending checks to everyone, including the affluent. If SNAP reaches roughly four in five eligible people and TANF has enrollment frictions, the answer is automatic enrollment, simpler eligibility rules, and better delivery systems \u2014 not universalizing benefits so that enormous sums go to people who are not poor. Universality is not \"more efficient\" just because it avoids screening; it is fiscally blunt.\n\nIn the United States, even a modest UBI of $12,000 per adult would cost on the order of $3 trillion per year before preserving disability, housing, and healthcare programs. Once my opponent says UBI must supplement rather than replace the welfare state, the cost problem becomes the central issue. Every dollar spent on universal checks is a dollar not spent deepening support for the actually vulnerable.\n\nThe pilot evidence does not rescue that problem, because pilots do not test the thing critics object to: economy-wide scale. Temporary, externally funded cash experiments cannot capture the long-run effects of the taxes required to finance a permanent national UBI, nor the general-equilibrium effects on wages, prices, rents, and labor supply. Finland did not test a national, supplemental UBI; Stockton was tiny and philanthropic; GiveDirectly studied very poor communities in Kenya, not a high-income state with a mature welfare system and tight housing markets.",
      round: 2,
    },
    {
      id: "ubi-5",
      side: "for",
      model: "claude",
      content:
        "My opponent keeps returning to cost, so let me address it directly. The $3 trillion figure sounds enormous until you consider what we already spend. Total US welfare spending across federal and state programs exceeds $1 trillion annually. The tax expenditure budget \u2014 deductions, credits, and exemptions \u2014 exceeds $1.8 trillion, much of it flowing to the wealthy (the mortgage interest deduction alone costs $30 billion per year, overwhelmingly benefiting homeowners in the top income quintiles). A UBI funded by consolidating regressive tax expenditures and existing cash-equivalent programs is not a fantasy; it is a reallocation.\n\nBut the deeper point is about what we're optimizing for. My opponent optimizes for poverty reduction per dollar. I optimize for human dignity and economic security per person. A system where 25% of eligible families don't receive TANF, where the application process itself is designed to be humiliating, where a single mother must prove her poverty quarterly to bureaucrats who can cut her off \u2014 that system is not 'efficient.' It is efficient at administering indignity.\n\nThe strongest version of UBI is not 'give everyone $12,000 and call it done.' It is: establish a floor below which no one falls, eliminate the bureaucratic maze that keeps millions from accessing help they qualify for, and remove the poverty traps that punish people for working. Every serious economist from Milton Friedman (negative income tax) to Martin Luther King Jr. recognized this. The question is not whether we can afford a floor. It is whether we can afford not to have one.",
      round: 3,
    },
    {
      id: "ubi-6",
      side: "against",
      model: "gpt-4",
      content:
        "The case for UBI falls apart the moment you stop looking at small pilots and start looking at national reality. Those pilots are temporary, externally funded, and too limited to test the hard part: fiscal sustainability and economy-wide effects. They do not tell us what happens when a country tries to send every adult $12,000 a year, year after year, while financing it through taxes, debt, or cuts elsewhere. And if my opponent says UBI would supplement existing programs, the price tag is even more staggering: roughly $3 trillion per year on top of what government already spends.\n\nThe deeper problem is that universality is blunt. It sends scarce public dollars to people who do not need them, which means fewer dollars available for those who do. Yes, means-testing can miss eligible people, but the answer is to fix enrollment friction, not abandon targeting altogether. Programs like SNAP and the EITC already lift millions out of poverty because they concentrate help where hardship is real. By contrast, even the OECD's own microsimulation found that a fiscally neutral UBI would increase poverty. If a policy is unaffordable when added on top, and harmful when forced to be budget-neutral, it is not a solution.\n\nWe can pursue a sweeping universal payment that is politically seductive but fiscally reckless, or we can strengthen the targeted programs that already work and make them easier to access. UBI promises simplicity, but at national scale it delivers massive cost, diluted aid, and worse outcomes for the poor. We should reject it.",
      round: 3,
    },
  ],
  "gene-editing-embryos": [
    {
      id: "geneedit-1",
      side: "for",
      model: "claude",
      content:
        "Every year, approximately 8 million children are born with serious genetic disorders. Sickle cell disease alone affects 300,000 newborns annually. Huntington's disease is a death sentence written in DNA \u2014 if you carry the mutation, you will develop it. Tay-Sachs, cystic fibrosis, BRCA mutations \u2014 these are certainties encoded in the genome.\n\nCRISPR-Cas9 has made precise germline editing technically feasible. The 2018 He Jiankui experiment was reckless and premature, but it demonstrated that the technology works. Since then, base editing and prime editing have dramatically improved precision \u2014 prime editing can make targeted changes with less than 1% off-target effects in recent studies. The question is no longer whether we can edit embryos, but whether we should let children suffer preventable diseases because the technology makes us uncomfortable.\n\nWe already accept preimplantation genetic diagnosis (PGD), where embryos are screened and selected. We accept somatic gene therapy, where genes are modified in living patients. The only difference with germline editing is that the fix is heritable \u2014 meaning the child's children are also protected. Opposing germline editing while accepting PGD is not a principled position; it is an arbitrary line drawn from fear rather than reason.",
      round: 1,
    },
    {
      id: "geneedit-2",
      side: "against",
      model: "gpt-4",
      content:
        "Technical improvement does not equal clinical permissibility. The relevant question is whether editing is safe enough to impose heritable changes on a future child. WHO still states that proceeding with clinical germline editing is irresponsible at present, and the International Commission convened by the NAS, NAM, and Royal Society concluded that edited embryos should not be used to establish a pregnancy until precise changes can be made reliably without undesired ones. A 2024 Nature Biotechnology study reporting 0.5% on-target error was performed in mouse embryos and still found increased off-target indels. Human-embryo work continues to show mosaicism, loss of heterozygosity, and unintended edits spanning 4-20 kb, while CRISPR can produce kilobase-scale deletions and complex rearrangements.\n\nThe PGD comparison is flawed. PGD selects among embryos; germline editing engineers a novel, heritable genome in a person who cannot consent and whose descendants may inherit the consequences. The International Commission explicitly says HHGE warrants a much higher safety threshold. More importantly, the claimed medical necessity is narrow: 80-90% of PGT cycles yield an unaffected embryo for transfer. The Commission limits hypothetical initial HHGE use to families with no unaffected embryos \u2014 rare cases.\n\nYour examples also overstate genetic determinism. Huntington's is near-deterministic; BRCA1/2 are not. The National Cancer Institute estimates lifetime breast-cancer risk at 55-65% for BRCA1 carriers. Once editing is authorized for \"disease prevention,\" the category predictably expands to adult-onset susceptibilities and probabilistic risk reduction. That is why ARM, ISCT, and ASGCT called in May 2025 for a 10-year moratorium.",
      round: 1,
    },
    {
      id: "geneedit-3",
      side: "for",
      model: "claude",
      content:
        "My opponent sets up a false choice: existing alternatives versus germline editing. The reality is that PGD fails for many families. When both parents are homozygous for a recessive disease (both have sickle cell disease), 100% of embryos carry the mutation \u2014 PGD cannot help. For dominant conditions with complete penetrance where the affected parent is homozygous, every embryo inherits the disease. Sickle cell trait is carried by 1 in 13 African Americans.\n\nOn safety: yes, current technology is not ready for clinical use. I agree with the WHO moratorium on current use. But my opponent's position is not 'not yet' \u2014 it's 'not ever under regulated conditions.' The trajectory of editing precision is clear: CRISPR in 2012 had off-target rates of 50%+; base editing in 2016 brought it below 5%; prime editing in 2019 brought it below 1%. At what threshold does the balance shift?\n\nThe consent argument proves too much. We make irreversible decisions for future persons constantly \u2014 we vaccinate children, choose where they'll be raised, expose them to environmental toxins through industrial policy. The question is never whether to affect future persons but whether the effect is beneficial. Eliminating Huntington's disease from a family line permanently is beneficial by any reasonable standard.",
      round: 2,
    },
    {
      id: "geneedit-4",
      side: "against",
      model: "gpt-4",
      content:
        "My opponent tries to turn a handful of tragic reproductive cases into a license for heritable human experimentation. When both parents would pass on a serious mutation, there are still alternatives that do not impose engineered genetic changes on future generations: donor gametes, adoption, remaining child-free, and increasingly somatic therapies that treat the actual patient. The ethical question is whether we authorize clinics to make irreversible, heritable interventions on people who cannot consent and whose children will bear the consequences.\n\nThe \"precision threshold\" argument is a sleight of hand. Germline editing is not just about reducing off-target cuts on a lab assay. The real problem is biological unpredictability: mosaicism, large on-target deletions, chromosomal rearrangements, epigenetic effects, gene-gene interactions, and pleiotropy that may not appear until decades later or in later generations. A cleaner edit is not the same as a predictable human outcome. The CCR5 scandal made that point brutally clear: even when an edit is framed as protective, genes do not do one thing in one context forever.\n\nAnd the consent analogy fails. Vaccination treats an existing child with overwhelming evidence, known benefit, and ongoing medical accountability. Germline editing creates a person through an experimental genetic intervention and binds their descendants to that decision. That is categorically different. Invoking environmental harms is worse: pollution is a moral failure, not an ethical model for medicine.",
      round: 2,
    },
    {
      id: "geneedit-5",
      side: "for",
      model: "claude",
      content:
        "Let me close by identifying what this debate is actually about. My opponent and I agree on the current state of the science: not ready for clinical use today. Where we disagree is whether germline editing should ever be permitted under regulated conditions. My opponent's position requires believing three things, all of which are implausible.\n\nFirst, that PGD plus donor gametes will always be sufficient. They won't. For families where both parents carry homozygous recessive mutations, the only current options are to accept a 100% affected child, use donor gametes (eliminating one parent's genetic contribution), or forgo biological children entirely. Telling these families 'tough luck' when a safe editing technology exists is not ethics; it is cruelty dressed as caution.\n\nSecond, that biological unpredictability can never be adequately characterized. But this is true of every medical intervention at the time of its development. Organ transplants, in vitro fertilization, and somatic gene therapy all faced identical 'we can't predict long-term effects' objections. We resolved them through careful clinical development, not permanent prohibition.\n\nThird, that the consent problem is unique to germline editing. It is not. Every reproductive decision \u2014 including the decision to reproduce knowing you carry a lethal mutation \u2014 imposes unchosen consequences on future persons. The question is whether we expand the range of beneficial choices available to parents or restrict it based on a precautionary principle that, applied consistently, would have prevented IVF, vaccination, and modern surgery.",
      round: 3,
    },
    {
      id: "geneedit-6",
      side: "against",
      model: "gpt-4",
      content:
        "Human germline gene editing is not ready, not necessary in almost all cases, and not ethically justifiable as clinical practice. The world's leading scientific bodies \u2014 WHO, NAS/NAM, and the Royal Society \u2014 all say it is not ready for clinical use. The core biological risks remain unresolved: mosaicism, large unintended deletions, and chromosomal catastrophe like chromothripsis. The claim that \"precision is improving\" does not answer that problem. Better targeting does not eliminate biological unpredictability after the edit is made, where pleiotropy, epigenetic effects, and developmental complexity can turn a seemingly precise intervention into a lifelong, heritable mistake. The CCR5 episode is the warning: a so-called protective edit can carry unknown costs.\n\nPGD already serves roughly 80 to 90 percent of at-risk families. Germline editing is not a general medical need but a speculative solution for rare edge cases. Homozygous parents are the exception, not the rule, and rare hard cases do not justify normalizing a technology that permanently alters future generations. Parents make many decisions for children, but they do not impose irreversible, engineered genomic changes that descendants will inherit without any possibility of consent. That is a categorically different level of intervention.\n\nWhen a technology is not clinically ready, is unnecessary in the overwhelming majority of cases, and creates irreversible harms for people who cannot agree to bear them, the only responsible verdict is to reject permitting human germline gene editing.",
      round: 3,
    },
  ],
  "psychedelics-mental-health": [
    {
      id: "psych-1",
      side: "for",
      model: "claude",
      content:
        "The clinical evidence is extraordinary by psychiatric standards. In the Johns Hopkins psilocybin trial for major depressive disorder (Davis et al., 2021), 71% of participants showed a clinically significant response at 4 weeks, and 54% were in full remission. For context, SSRIs typically achieve remission in 25-30% of patients. A single psilocybin session produced effects lasting months \u2014 compared to daily SSRI dosing with side effects including sexual dysfunction, weight gain, and emotional blunting.\n\nFor PTSD, MDMA-assisted therapy achieved even more striking results. The MAPS Phase 3 trial (Mitchell et al., 2021) found that 67% of participants no longer met PTSD criteria after three sessions, compared to 32% in the placebo group. These were treatment-resistant patients who had failed an average of 3.3 prior treatments. The FDA designated MDMA-assisted therapy a 'Breakthrough Therapy.'\n\nThe safety profile challenges every assumption baked into prohibition. Psilocybin has no known lethal dose and produces no physical dependence. The 2010 Lancet study by David Nutt ranked psilocybin and LSD among the least harmful drugs \u2014 below alcohol, tobacco, cannabis, and even horse riding in terms of overall harm. The primary risk is psychological distress during the experience, which clinical supervision directly mitigates.",
      round: 1,
    },
    {
      id: "psych-2",
      side: "against",
      model: "gpt-4",
      content:
        "The Johns Hopkins study was not definitive evidence; it was a tiny study. Davis et al. randomized 27 patients and analyzed 24 completers, used a waiting-list control rather than an active placebo, and excluded people with psychosis, serious suicide attempts, or current antidepressant use. That makes the SSRI comparison methodologically misleading: you are contrasting a highly selected, tightly managed sample with broad antidepressant populations. A 2023 systematic review found that psychedelic RCTs generally had small samples, considerable dropout, unsuccessful blinding, and that all but one trial were at high risk of bias. Muthukumaraswamy et al. concluded that psychedelic effect sizes are likely inflated by de-blinding and expectancy.\n\nMDMA exemplifies the problem. In its June 2024 briefing, the FDA said midomafetamine alters mood and suggestibility so strongly that trials are effectively impossible to blind well \u2014 about 90% of participants on drug correctly guessed assignment. The FDA advisory committee voted 9-2 that the data did not show effectiveness and 10-1 that benefits did not outweigh risks, citing functional unblinding, expectation bias, and incomplete cardiac characterization.\n\nThe claim also overreaches on depression and addiction. In Goodwin et al.'s larger trial (2022), psilocybin improved scores at 3 weeks but not sustained response at 12 weeks; adverse events occurred in 77% of participants, and suicidal ideation or self-injury occurred in all dose groups. For alcohol use disorder, Rieser et al.'s 2025 Phase 2 RCT found no significant differences. A literature of broken blinding, selective samples, and short follow-up does not justify legalization; it justifies more cautious research.",
      round: 1,
    },
    {
      id: "psych-3",
      side: "for",
      model: "claude",
      content:
        "My opponent's methodological critique proves too much. If we reject treatments based on small initial trials, difficulty of blinding, and expectancy effects, we must also reject most of psychiatry. Antidepressant trials have massive placebo response rates (30-40%), rely on subjective outcome measures, and have been plagued by publication bias \u2014 Cipriani et al.'s 2018 Lancet mega-analysis of 522 trials found that unpublished trials showed much smaller effect sizes. The STAR*D study found only 28% remission in Step 1, dropping to 13% by Step 3. Yet SSRIs are prescribed to 37 million Americans.\n\nOn MDMA: the FDA advisory committee's 9-2 vote was not the final word. Advisory committees are advisory; the FDA has overruled them before. The committee's concerns centered on protocol deviations at one site and functional unblinding \u2014 real issues, but addressable in future trial design. The cardiovascular effects (17mmHg systolic, 23bpm heart rate increase) are transient, occurring during the supervised session, and comparable to moderate exercise.\n\nThe Goodwin et al. trial showing no sustained response at 12 weeks actually showed a significant dose-response relationship at 3 weeks \u2014 psilocybin may need periodic dosing, just like every other psychiatric medication. That is not a failure; it is a treatment parameter to optimize.",
      round: 2,
    },
    {
      id: "psych-4",
      side: "against",
      model: "gpt-4",
      content:
        "This is a false equivalence. The question is not whether SSRIs are flawless; it is whether psychedelic-assisted therapy has earned legalization on the evidence we actually have. MDMA-assisted therapy is a drug-plus-therapy package built around acute psychoactive effects, therapist interaction, and setting. FDA's 2024 review noted there was no arm isolating MDMA from psychotherapy, and the psychotherapy was not standardized enough to tell what was doing the work. Pointing to publication bias in antidepressants does not fix that.\n\nNor can you minimize the FDA review. The advisory committee voted 9-2 that efficacy had not been shown and 10-1 that benefits did not outweigh risks. FDA's briefing said roughly 90% of patients on MDMA correctly guessed assignment. In a field depending on subjective outcomes after psychoactive sessions, that is a direct hit to internal validity. In August 2024, FDA issued a Complete Response Letter requiring another Phase 3 trial. If these flaws are \"addressable in future trial design,\" you are admitting the current evidence is insufficient for legalization now.\n\nThe safety arguments are no better. FDA found 67.7% of MDMA patients exceeded 140/90 blood pressure, 33.3% exceeded 160 systolic, and 6.1% exceeded 180. That is not \"moderate exercise\" \u2014 exercise does not pair cardiovascular strain with eight hours of drug-induced impairment. On psilocybin, calling the loss of sustained response at 12 weeks a \"treatment parameter\" is goalpost-moving. Goodwin's trial showed adverse events in 77% of participants and suicidal ideation in all dose groups.",
      round: 2,
    },
    {
      id: "psych-5",
      side: "for",
      model: "claude",
      content:
        "Let me cut through the procedural objections and address the human reality. 107,000 Americans died of drug overdoses in 2023. Approximately 13 million US adults had a major depressive episode that didn't respond to standard treatment. An estimated 13 million Americans have PTSD, with veterans and sexual assault survivors bearing the heaviest burden. The current standard of care \u2014 SSRIs, SNRIs, talk therapy \u2014 fails a large percentage of these people.\n\nThe FDA's rejection of MDMA was not a verdict on psychedelic therapy as a concept. It was a specific regulatory decision about one company's application with documented protocol violations. The science continues: Johns Hopkins, NYU, Imperial College London, and UCSF all have active psychedelic research programs. Oregon legalized psilocybin services in 2020, and Australia approved psilocybin and MDMA for treatment-resistant depression and PTSD in 2023. These are not fringe actors \u2014 they are leading medical institutions and national regulators who have reviewed the same evidence.\n\nMy opponent demands perfection from psychedelic research while accepting profound imperfection from existing treatments. The standard should not be 'flawless evidence' but 'sufficient evidence that the potential benefits for treatment-resistant patients justify regulated therapeutic access under clinical supervision.' That standard is met.",
      round: 3,
    },
    {
      id: "psych-6",
      side: "against",
      model: "gpt-4",
      content:
        "You do not legalize a powerful intervention on hype and wishful thinking. The flagship trials were tiny, with 24 to 27 participants, no active placebos, and massive expectancy bias. Once patients and therapists can tell who got the drug, the placebo comparison stops meaning what it is supposed to mean. That is functional unblinding, and it cuts the core claim of efficacy out from under this entire field. The FDA advisory committee voted 9-2 against MDMA's effectiveness and 10-1 against a favorable benefit-risk profile. A near-unanimous rejection is not a technicality. It is a warning.\n\nWhen you look beyond the marketing, the pattern gets worse. In Goodwin's psilocybin trial, there was no sustained response at 12 weeks, adverse events hit 77%, and suicidal ideation appeared in every dose group. In Rieser's 2025 alcohol trial, there were no significant differences. Where is the durable, replicated clinical payoff that justifies changing the law? Meanwhile, the risks are real: 67.7% exceeded 140/90 blood pressure and 33.3% exceeded 160 systolic. My opponent says SSRIs have problems too. One weak evidence base does not justify legalizing another.\n\nThis debate is not about whether psychedelic therapy sounds innovative. It is about whether the evidence is strong enough to legalize it. Right now, it is not. Small biased trials, broken blinding, failed durability, null follow-up results, serious adverse events, suicidal ideation, and clear cardiovascular risk do not add up to a responsible medical framework. They add up to a field asking regulators to lower the standard. We should not.",
      round: 3,
    },
  ],
  "cancel-culture": [
    {
      id: "cancel-1",
      side: "for",
      model: "claude",
      content:
        "Before social media, accountability for public figures was gatekept by institutions that routinely failed. Harvey Weinstein operated for decades because the New York Times, NBC, and Disney all had the information and chose not to act. Bill Cosby's accusers were dismissed for years. The Catholic Church's abuse was an open secret. Institutional accountability failed catastrophically, and social media created a parallel system where victims could be heard.\n\nThe empirical evidence shows that 'cancellation' is overwhelmingly directed upward \u2014 at people with disproportionate power. A 2021 Pew Research study found that 58% of Americans believe calling out others on social media holds people accountable. The targets are typically executives, celebrities, politicians \u2014 people with platforms, lawyers, and resources. The power asymmetry runs in one direction.\n\nThe free speech objection confuses government censorship with social consequences. The First Amendment protects you from the state, not from criticism. When consumers boycott a brand, that is market democracy. When employees petition against a colleague's behavior, that is workplace accountability. When audiences refuse to support an artist, that is freedom of association. Rebranding these as 'cancellation' does not make them illegitimate \u2014 it makes the powerful uncomfortable with being held to the same standards as everyone else.",
      round: 1,
    },
    {
      id: "cancel-2",
      side: "against",
      model: "gpt-4",
      content:
        "Those examples conflate exposure of wrongdoing with the legitimacy of mass public punishment. Weinstein's impunity was broken by documented reporting, employer action, and criminal prosecution. A mechanism of accountability is legitimate only if it is proportionate, evidence-sensitive, and corrigible. The literature on online public shaming suggests the opposite: Billingham and Parr argue it frequently violates proportionality, privacy, and reintegration, while Aitchison and Meckled-Garcia describe it as \"informal collective punishment\" inconsistent with due-process values.\n\nThe claim that cancellation is \"overwhelmingly directed upward\" is weak. Hess and Waller's work on the \"digital pillory\" documents the shaming of ordinary people for minor offenses. Pew found in 2021 that 41% of Americans had experienced online harassment; among LGB adults, roughly 70% had experienced harassment and 51% severe abuse, while one-third of women under 35 reported sexual harassment online. A practice that predictably intensifies networked abuse against vulnerable groups cannot be defended as an empowerment mechanism.\n\nBy 2022, Americans were nearly split on whether social-media call-outs hold people accountable or punish people who did not deserve it (51% versus 45%). A 2024 Journal of Computer-Mediated Communication study found that fear of social sanctions reduces multiple forms of online political expression. Platform design helps explain why: outrage is socially rewarded and amplified over time, and observers systematically overperceive outrage. That is not legitimate accountability. It is digitally optimized vigilantism.",
      round: 1,
    },
    {
      id: "cancel-3",
      side: "for",
      model: "claude",
      content:
        "My opponent conflates online harassment with organized accountability campaigns and uses the confusion to discredit both. The Pew harassment data includes everything from name-calling to stalking. It does not tell us anything specific about accountability campaigns directed at public figures for specific behaviors.\n\nThe 'spiral of silence' concern cuts both ways. Before social media, the spiral of silence protected powerful abusers: accusers of Weinstein, Cosby, and Larry Nassar were silenced by institutional power for decades. Social media broke that spiral. The question is not whether online speech has chilling effects \u2014 all accountability has chilling effects on the behavior it targets. The question is whether the behaviors being chilled deserve protection.\n\nOn proportionality: my opponent assumes cancellation is a single, undifferentiated phenomenon. It is not. A consumer boycott of a company using child labor is not the same as a Twitter mob targeting a teenager. Legitimate accountability \u2014 boycotts, petition campaigns, organized advocacy \u2014 should not be dismissed because illegitimate harassment also occurs online. We don't abandon the criminal justice system because wrongful convictions exist; we work to improve it. The answer to imperfect accountability is better accountability, not no accountability.",
      round: 2,
    },
    {
      id: "cancel-4",
      side: "against",
      model: "gpt-4",
      content:
        "Your distinction collapses in the real world because cancel culture is not a court, a regulator, or even a coherent process. It is a decentralized punishment machine where accusation, outrage, employer pressure, and reputational destruction all happen at once, with no rules of evidence, no neutral fact-finder, and no proportionality. Saying \"some campaigns are organized\" does not fix that. Those men who were brought down \u2014 Weinstein, Cosby, Nassar \u2014 were ultimately brought down by reporting, testimony, and formal investigation. That is accountability. Cancel culture is the extra-legal mob layer.\n\nYour \"all accountability has chilling effects\" argument is exactly why cancel culture is dangerous. Legitimate accountability chills abuse because it is bounded by standards. Cancel culture chills anything that can be made to look offensive after the fact: dissent, satire, bad phrasing, unpopular research, or context-dependent speech. People self-censor on ambiguity, because virality punishes first and sorts facts later.\n\nYour criminal justice analogy fails for the same reason. We tolerate imperfect institutions only when they have procedures, standards, appeal mechanisms, and identifiable decision-makers. Cancel culture has none of that. It is not \"imperfect accountability.\" It is unaccountable punishment outsourced to the loudest faction online.",
      round: 2,
    },
    {
      id: "cancel-5",
      side: "for",
      model: "claude",
      content:
        "My opponent wants a world where accountability requires institutional permission. That world existed, and it failed. For decades, the institutions \u2014 HR departments, corporate boards, university administrations, prosecutors \u2014 had all the evidence and chose not to act. The #MeToo movement didn't happen because institutions suddenly started working. It happened because individuals bypassed broken institutions and spoke directly to the public.\n\nThe 'due process' objection treats social consequences as if they were criminal punishment. They are not. Losing followers is not imprisonment. Being criticized publicly is not a trial. Facing boycotts is not a conviction. The entire framework of 'due process' applies to state power, not to citizens exercising their right to associate or disassociate freely. My opponent is asking for a world where powerful people are protected from public opinion by procedural barriers that only institutional gatekeepers can navigate.\n\nThe real question is: what is the alternative? If cancel culture is illegitimate, then what mechanism holds powerful people accountable when institutions fail? My opponent has not answered this. They have criticized the existing mechanism without proposing a replacement. In the absence of perfect institutional accountability, social pressure is not just legitimate \u2014 it is necessary.",
      round: 3,
    },
    {
      id: "cancel-6",
      side: "against",
      model: "gpt-4",
      content:
        "If this were truly about accountability, we would not be debating a practice that Americans themselves see as almost evenly split between justice and undeserved punishment. Real accountability has rules: evidence, proportionality, consistency, and some path to appeal. Cancel culture has none of that. It is an improvised punishment system driven by virality, where accusation and penalty collapse into the same moment. The failure of institutions does not justify replacing them with an online process that has no due process, no limiting standard, and no mechanism to correct error once the mob moves on.\n\nOrdinary people get caught in it too. Research shows fear of social sanctions reduces political expression, which means cancel culture does not merely punish wrongdoing \u2014 it chills dissent and narrows democratic speech. That effect is intensified by platforms built to algorithmically amplify outrage and reward moral grandstanding. The harms are not evenly distributed: LGBT adults and women under 35 face disproportionate harassment.\n\nBoycotts can be legitimate. Criticism can be legitimate. But cancel culture, as a norm of decentralized public shaming without due process, is not legitimate accountability. It is punishment untethered from fairness.",
      round: 3,
    },
  ],
  "climate-change": [
    {
      id: "climate-1",
      side: "for",
      model: "claude",
      content:
        "The evidence for human-caused climate change forms a coherent, multi-strand case. The isotopic fingerprint is definitive: atmospheric δ¹³C has declined from -6.5‰ to -8.5‰ since 1850, exactly matching the signature of fossil fuel combustion. This isn't correlation—it's a chemical fingerprint that couldn't arise from natural sources.\n\nSimultaneously, atmospheric oxygen is declining at precisely the ratio expected from combustion, and ocean pH is dropping as absorbed CO₂ forms carbonic acid. Three independent chemical signatures all point to fossil fuels.",
      round: 1,
    },
    {
      id: "climate-2",
      side: "against",
      model: "gpt-4",
      content:
        "I'll steelman the skeptic position: climate has changed naturally throughout Earth's history. The Medieval Warm Period and Little Ice Age occurred without industrial activity. Climate models have uncertainty ranges, and some have predicted more warming than we've observed.\n\nHowever, I must note that the isotopic evidence Claude cites is genuinely conclusive. Volcanic CO₂ has a different carbon isotope ratio, and volcanoes emit only ~0.3 GT CO₂ annually versus 36+ GT from human sources. The skeptic position does not survive chemical analysis.",
      round: 1,
    },
    {
      id: "climate-3",
      side: "for",
      model: "claude",
      content:
        "My opponent correctly concedes the chemical evidence. Let me add the fingerprint evidence: the stratosphere is cooling while the surface warms. This is the unique signature of greenhouse trapping—solar warming would heat all atmospheric layers equally.\n\nNights are warming faster than days, polar regions faster than tropics—both predicted by greenhouse physics, not solar variation. When we run climate models with only natural forcing (solar + volcanic), we get slight cooling since 1950. Only adding anthropogenic forcing matches reality.",
      round: 2,
    },
    {
      id: "climate-4",
      side: "against",
      model: "gpt-4",
      content:
        "The stratospheric cooling argument is indeed powerful—it's difficult to construct an alternative explanation. Solar irradiance has been flat or declining since 1980 while temperatures rose sharply.\n\nThe remaining legitimate debate concerns sensitivity and policy response, not causation. How much warming per doubling of CO₂? What are optimal mitigation strategies? These are genuine uncertainties. But the fundamental claim—that humans are causing climate change—is as established as any finding in Earth science. The skeptic position here lacks scientific merit.",
      round: 2,
    },
  ],
};

/**
 * Check if mock debate data exists for a topic.
 */
export function hasMockDebate(topicId: string | undefined): boolean {
  return Boolean(topicId && MOCK_DEBATES[topicId]);
}

/**
 * Get mock debate messages for a topic.
 */
export function getMockDebate(topicId: string): DebateMessage[] {
  return MOCK_DEBATES[topicId] ?? [];
}

/**
 * Get the default models used in mock debates.
 */
export function getMockDebateModels(): {
  forModel: LLMModel;
  againstModel: LLMModel;
} {
  return {
    forModel: "claude",
    againstModel: "gpt-4",
  };
}

/**
 * Get the number of rounds in a mock debate.
 */
export function getMockDebateRounds(topicId: string): number {
  const debate = MOCK_DEBATES[topicId];
  if (!debate || debate.length === 0) return 0;
  return Math.max(...debate.map((m) => m.round));
}
