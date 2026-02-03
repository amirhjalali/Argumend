/**
 * Mock debate data for demonstration purposes.
 *
 * Issue #2: Extracted from DebateView.tsx:61-92
 */

import type { LLMModel } from "@/types/logic";

export interface DebateMessage {
  id: string;
  side: "for" | "against";
  model: LLMModel;
  content: string;
  round: number;
}

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
