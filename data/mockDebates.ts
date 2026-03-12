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
