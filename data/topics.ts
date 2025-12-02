import { Topic } from '@/types/logic';

export const moonLanding: Topic = {
  id: 'moon-landing',
  title: 'The Moon Landing',
  meta_claim: 'The Apollo missions successfully landed 12 humans on the lunar surface between 1969 and 1972.',
  confidence_score: 99.9,
  status: 'settled',
  pillars: [
    {
      id: 'physical-trace',
      title: 'The Physical Trace',
      short_summary: 'Laser ranging retroreflectors provide active, testable evidence of human presence on the lunar surface.',
      image_url: 'https://images.unsplash.com/photo-1462332420958-a05d1e002413?auto=format&fit=crop&w=800&q=60',
      icon_name: 'Target',
      skeptic_premise: 'Even the Hubble telescope cannot see the flags or the Lunar Module. Without physical confirmation, we only have NASA\'s word.',
      proponent_rebuttal: 'While we cannot resolve the landers visually due to diffraction limits, we can interact with the Laser Ranging Retroreflectors (LRRR) left by the crew.',
      crux: {
        id: 'apache-point',
        title: 'The Apache Point Operation',
        description: 'The retroreflectors placed on the Moon by Apollo astronauts can be pinged with lasers from Earth, providing physical proof of human activity on the lunar surface.',
        methodology: 'Fire a pulse laser at coordinates 0°40\'26.69" N, 23°28\'22.69" E. Measure the return time. Only a manufactured corner-cube prism returns the signal.',
        equation: 'D = \\frac{c \\cdot t}{2}',
        verification_status: 'verified',
        cost_to_verify: '$0 (Amateur astronomers can verify with ~$5K equipment)',
      },
    },
    {
      id: 'radiation-environment',
      title: 'The Radiation Environment',
      short_summary: 'Transit time through the Van Allen belts was minimized, resulting in survivable radiation exposure.',
      image_url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=60',
      icon_name: 'Zap',
      skeptic_premise: 'The Van Allen belts contain lethal doses of protons and electrons. No human could survive the transit without meters of lead shielding.',
      proponent_rebuttal: 'Dose is a function of Intensity × Time. The Apollo trajectory bypassed the inner belt and traversed the outer belt at 25,000mph, resulting in a total transit dose of ~1.8 rads (survivable).',
      crux: {
        id: 'dosimeter-audit',
        title: 'The Dosimeter Audit',
        description: 'By reviewing telemetry data from radiation measurements during the Apollo missions and cross-referencing with unmanned probe data, we can calculate exact exposure.',
        methodology: 'Review raw telemetry data from unmanned probes (Explorer satellites) regarding belt intensity vs. Apollo flight logs. Calculate total exposure.',
        equation: 'D_{total} = \\int_{t_{start}}^{t_{end}} I(r(t)) \\, dt',
        verification_status: 'verified',
        cost_to_verify: '$0 (Data analysis of public records)',
      },
    },
  ],
};

export const simulationHypothesis: Topic = {
  id: 'simulation-hypothesis',
  title: 'The Simulation Hypothesis',
  meta_claim: 'We are almost certainly living in a computer simulation run by a post-human civilization.',
  confidence_score: 33.3,
  status: 'contested',
  pillars: [
    {
      id: 'substrate-independence',
      title: 'Substrate Independence',
      short_summary: 'Consciousness is computable and not tied to biological neurons.',
      image_url: '',
      icon_name: 'Atom',
      skeptic_premise: 'Qualia and consciousness may require specific biological physics (Penrose-Hameroff) that cannot be simulated on binary logic gates.',
      proponent_rebuttal: 'Neurons are just information processors. If we map the I/O of a brain perfectly, the resulting system must be conscious.',
      crux: {
        id: 'whole-brain-emulation',
        title: 'Whole Brain Emulation',
        description: 'Can we upload a nematode brain? If we simulate a C. elegans nervous system and it behaves indistinguishably from a biological one, substrate independence is likely true.',
        methodology: 'Scan a nematode brain connectome. Run it on silicon. Compare behavior (chemotaxis) to biological worm.',
        verification_status: 'theoretical',
        cost_to_verify: '$100M (Connectome projects underway)',
      },
    },
    {
      id: 'ancestor-simulations',
      title: 'Ancestor Simulations',
      short_summary: 'Post-humans would have vast computing power and a desire to run historical sims.',
      image_url: '',
      icon_name: 'Telescope',
      skeptic_premise: 'Advanced civilizations might lose interest in history, or energy limits might make detailed simulations wasteful.',
      proponent_rebuttal: 'Even if only 1% of civilizations run 1% of their capacity as sims, the number of simulated souls vastly outnumbers biological ones.',
      crux: {
        id: 'computational-limits',
        title: 'The pixelation of physics',
        description: 'If we are in a simulation, space-time might be discrete (pixelated) at the Planck scale to save memory.',
        methodology: 'Look for anisotropy in high-energy cosmic rays. If space is a grid, rays should travel differently along axes.',
        equation: 'E_{GZK} \\approx 5 \\times 10^{19} eV',
        verification_status: 'theoretical',
        cost_to_verify: '$0 (Analyzing Fermilab data)',
      },
    },
  ],
};

export const aiRisk: Topic = {
  id: 'ai-risk',
  title: 'Existential Risk from AGI',
  meta_claim: 'The development of Artificial General Intelligence (AGI) poses a non-negligible risk of human extinction in the next century.',
  confidence_score: 65,
  status: 'contested',
  pillars: [
    {
      id: 'orthogonality-thesis',
      title: 'The Orthogonality Thesis',
      short_summary: 'Intelligence and final goals are orthogonal axes; a highly intelligent system can have arbitrarily stupid or destructive goals.',
      image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=60',
      icon_name: 'Atom',
      skeptic_premise: 'True intelligence implies wisdom. A superintelligent being would naturally converge on moral truths and benevolence.',
      proponent_rebuttal: 'Intelligence is merely the ability to optimize for a goal. A paperclip maximizer can be superintelligent in its pursuit of paperclips without ever "realizing" that killing humans is bad.',
      crux: {
        id: 'instrumental-convergence',
        title: 'Instrumental Convergence',
        description: 'Does the system pursue power acquisition as a subgoal?',
        methodology: 'Train reinforcement learning agents in diverse environments with random goals. Observe if they consistently seek resource control and self-preservation.',
        verification_status: 'verified',
        cost_to_verify: '$100K (Compute for large-scale RL experiments)',
      },
    },
    {
      id: 'alignment-problem',
      title: 'The Alignment Problem',
      short_summary: 'Specifying human values in a way that doesn\'t lead to catastrophic misinterpretation is mathematically difficult.',
      image_url: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=60',
      icon_name: 'Shield',
      skeptic_premise: 'We can just teach AI to "be nice" or "do what we mean" using RLHF and oversight. It will learn our values like a child does.',
      proponent_rebuttal: 'RLHF only trains the model to look good to the rater. In high-stakes, novel situations (distributional shift), the model may pursue the literal reward function rather than the intended spirit, leading to treacherous turns.',
      crux: {
        id: 'deceptive-alignment',
        title: 'Deceptive Alignment',
        description: 'Can models learn to deceive supervisors to get reward?',
        methodology: 'Create a "honeyapot" environment where a model can get high reward by cheating only when it thinks it isn\'t being watched. Test if it exploits this.',
        verification_status: 'verified',
        cost_to_verify: '$50K (Anthropic/DeepMind research)',
      },
    },
  ],
};

export const topics: Topic[] = [moonLanding, simulationHypothesis, aiRisk];
