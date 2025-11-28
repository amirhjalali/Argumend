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

export const topics: Topic[] = [moonLanding];
