import type { Topic } from "@/lib/schemas/topic";

export const climateChangeData = {
  id: "climate-change",
  title: "Climate Change",
  meta_claim: "Climate change is primarily caused by human activity.",
  status: "settled" as const,
  category: "science" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "IPCC Sixth Assessment Report (2021)",
      url: "https://www.ipcc.ch/assessment-report/ar6/",
    },
    { title: "NASA Climate Evidence", url: "https://climate.nasa.gov/evidence/" },
    {
      title: "The Suess Effect Explained",
      url: "https://en.wikipedia.org/wiki/Suess_effect",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "How do we know CO₂ is from humans?",
      content:
        "What specific evidence distinguishes human-produced CO₂ from natural sources like volcanic activity or ocean outgassing?",
      imageUrl:
        "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=800&q=60",
      references: [
        {
          title: "Carbon Isotope Analysis",
          url: "https://www.esrl.noaa.gov/gmd/outreach/isotopes/",
        },
      ],
    },
    {
      id: "q2",
      title: "Why trust climate models?",
      content:
        'Climate models have been criticized for running "too hot." How do we validate model predictions against observations?',
      imageUrl:
        "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "q3",
      title: "Could the Sun be responsible?",
      content:
        "Solar activity has historically correlated with climate. Why do scientists rule out the Sun as the primary driver of recent warming?",
      imageUrl:
        "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=800&q=60",
    },
  ],
  pillars: [
    {
      id: "isotopic-fingerprint",
      title: "The Isotopic Fingerprint",
      short_summary:
        "Carbon isotope ratios in atmospheric CO₂ prove fossil fuel origin.",
      image_url:
        "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=800&q=60",
      icon_name: "Atom" as const,
      skeptic_premise:
        "CO₂ levels have fluctuated naturally throughout Earth's history. The current rise could be from ocean outgassing, volcanic activity, or other natural carbon cycle variations. Correlation with industrialization doesn't prove causation.",
      proponent_rebuttal:
        "Fossil fuels have a distinct isotopic signature—they're depleted in ¹³C because plants preferentially absorb lighter ¹²C. Since 1850, atmospheric δ¹³C has dropped precisely as predicted if fossil carbon is the source. This isn't correlation—it's a chemical fingerprint. Additionally, oxygen levels are dropping at the exact ratio expected from combustion (O₂ consumed per CO₂ produced), and ocean pH is declining as CO₂ dissolves. Three independent chemical signatures all point to burning fossil fuels.",
      crux: {
        id: "suess-effect",
        title: "The Suess Effect Measurement",
        description:
          "Measure the decline in atmospheric δ¹³C ratio over time to confirm fossil fuel origin.",
        methodology:
          "Extract CO₂ from ice cores (pre-industrial baseline). Compare to modern atmospheric samples. Calculate δ¹³C shift and match to fossil fuel burning rate.",
        equation:
          "\\delta^{13}C = \\left(\\frac{(^{13}C/^{12}C)_{sample}}{(^{13}C/^{12}C)_{standard}} - 1\\right) \\times 1000\\text{‰}",
        verification_status: "verified" as const,
        cost_to_verify: "$50K (ice core analysis + mass spectrometry)",
      },
      evidence: [
        {
          id: "isotope-measurements",
          title: "δ¹³C Decline Matches Fossil Fuel Signature",
          description:
            "Atmospheric δ¹³C has declined from -6.5‰ to -8.5‰ since 1850, exactly as predicted from fossil fuel combustion.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 10,
          },
          source: "NOAA, Scripps CO2 Program",
          reasoning:
            "Chemical fingerprint measured by dozens of independent labs worldwide.",
        },
        {
          id: "oxygen-decline",
          title: "Atmospheric O₂ Declining at Combustion Ratio",
          description:
            "Oxygen levels dropping at exactly the ratio expected from burning fossil fuels (1 O₂ consumed per CO₂ produced).",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 9,
          },
          source: "Scripps O2 Program",
          reasoning: "Independent chemical evidence confirming combustion source.",
        },
        {
          id: "ocean-acidification",
          title: "Ocean pH Declining (Acidification)",
          description:
            "Ocean pH has dropped 0.1 units since pre-industrial times as CO₂ dissolves, creating carbonic acid.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          reasoning: "Measured by thousands of ocean monitoring stations.",
        },
        {
          id: "natural-co2-claim",
          title: "CO₂ Could Be From Natural Sources",
          description: "Volcanic activity and ocean outgassing could explain CO₂ rise.",
          side: "against" as const,
          weight: {
            sourceReliability: 2,
            independence: 4,
            replicability: 2,
            directness: 3,
          },
          reasoning:
            "Contradicted by isotopic evidence; volcanoes emit ~0.3 Gt CO₂/year vs 36 Gt from humans.",
        },
      ],
    },
    {
      id: "temperature-attribution",
      title: "The Temperature Attribution",
      short_summary:
        "Observed warming patterns match greenhouse gas predictions, not natural cycles.",
      image_url:
        "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=60",
      icon_name: "Telescope" as const,
      skeptic_premise:
        "Climate models are unreliable—they failed to predict the 'hiatus' of 1998-2014 and consistently run hotter than observations. The warming could be natural variability we don't fully understand. Medieval Warm Period and Roman Climate Optimum show temperatures can shift without human influence.",
      proponent_rebuttal:
        "Climate models successfully hindcast the entire 20th century temperature record, including the mid-century cooling from aerosols. The 'hiatus' was within model uncertainty bounds and is now understood as Pacific Decadal Oscillation masking. Crucially, models predict specific 'fingerprints': stratospheric cooling while troposphere warms (greenhouse signature), nights warming faster than days, and polar amplification. All three fingerprints are observed. Natural forcing alone produces a flat or cooling trend for 1950-present—only adding anthropogenic forcing matches reality.",
      crux: {
        id: "fingerprint-detection",
        title: "The Fingerprint Detection Test",
        description:
          "Detect greenhouse-specific warming patterns vs solar/volcanic patterns.",
        methodology:
          "Run climate models with natural forcing only (solar + volcanic). Run models with anthropogenic forcing only (GHG + aerosols). Run combined forcing. Statistical detection of which pattern matches observed record.",
        equation:
          "y(t) = \\beta_1 X_{natural}(t) + \\beta_2 X_{anthropogenic}(t) + \\varepsilon(t)",
        verification_status: "verified" as const,
        cost_to_verify: "$500K (supercomputer time + multi-model ensemble)",
      },
      evidence: [
        {
          id: "stratospheric-cooling",
          title: "Stratosphere Cooling While Surface Warms",
          description:
            "Stratospheric temperatures have declined while surface warms—unique signature of greenhouse effect, not solar warming.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 10,
          },
          source: "NASA, NOAA satellite data",
          reasoning: "Solar warming would heat all layers; greenhouse traps heat below.",
        },
        {
          id: "nights-faster",
          title: "Nights Warming Faster Than Days",
          description:
            "Minimum temperatures rising faster than maximum—consistent with greenhouse blanket effect.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          reasoning: "Pattern predicted by greenhouse theory, not solar.",
        },
        {
          id: "polar-amplification",
          title: "Arctic Warming 2-3x Faster Than Global Average",
          description:
            "Polar amplification matches model predictions for greenhouse-driven warming.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 8,
          },
          reasoning: "Ice-albedo feedback predicted and observed.",
        },
        {
          id: "model-uncertainty",
          title: "Climate Models Have Uncertainty Ranges",
          description:
            "Models show spread in predictions, and some have run warmer than observations.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 4,
          },
          reasoning: "Valid but observations fall within model uncertainty bounds.",
        },
      ],
    },
    {
      id: "natural-factors-elimination",
      title: "The Natural Factors Elimination",
      short_summary:
        "Solar activity, volcanic cycles, and orbital variations cannot explain the observed warming trend.",
      image_url:
        "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The Sun drives Earth's climate—small changes in solar output could have outsized effects through cosmic ray modulation or UV-ozone interactions. We've only been measuring solar irradiance directly since 1978. Historical correlations between solar cycles and climate are well-documented. Perhaps we're underestimating natural variability.",
      proponent_rebuttal:
        "Solar irradiance has been flat or slightly declining since 1980 while temperatures accelerated upward—the correlation broke. Cosmic ray flux shows no trend matching temperature. Volcanic eruptions cause temporary cooling (Pinatubo 1991 clearly visible), confirming models work, but there's no volcanic trend to explain warming. Orbital (Milankovitch) cycles operate on 10,000+ year timescales and currently favor slight cooling. When you sum all natural factors, you get near-zero forcing since 1950. The energy imbalance (0.5-1 W/m²) measured by satellites requires an additional forcing—greenhouse gases are the only candidate that fits.",
      crux: {
        id: "energy-budget-closure",
        title: "The Energy Budget Closure Test",
        description:
          "Account for all energy inputs and outputs to identify the forcing source.",
        methodology:
          "Measure incoming solar radiation (satellites). Measure outgoing longwave radiation (satellites). Calculate ocean heat uptake (Argo floats). Sum all known natural forcings. Identify residual requiring anthropogenic explanation.",
        equation: "\\Delta Q = F - \\lambda \\Delta T",
        verification_status: "verified" as const,
        cost_to_verify: "$2M (satellite data + Argo network analysis)",
      },
      evidence: [
        {
          id: "solar-flat",
          title: "Solar Irradiance Flat Since 1980",
          description:
            "Total solar irradiance has shown no upward trend since satellite measurements began, while temperatures rose sharply.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 9,
          },
          source: "PMOD, ACRIM satellite composites",
          reasoning: "Direct measurement rules out solar driver.",
        },
        {
          id: "pinatubo-test",
          title: "Pinatubo Eruption Validates Models",
          description:
            "Climate models accurately predicted the temporary cooling from the 1991 Mt. Pinatubo eruption.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          reasoning:
            "Natural experiment validated model response to volcanic forcing.",
        },
        {
          id: "energy-imbalance",
          title: "Earth's Energy Imbalance Measured",
          description:
            "Satellites measure Earth absorbing ~0.7 W/m² more than it radiates—energy is accumulating.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 9,
          },
          source: "CERES satellite data",
          reasoning: "Direct measurement of energy accumulation.",
        },
        {
          id: "solar-correlation-historical",
          title: "Historical Solar-Climate Correlations",
          description:
            "Past periods like the Maunder Minimum show solar-climate connections.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 5,
            directness: 4,
          },
          reasoning:
            "Historical correlations exist but don't explain post-1980 divergence.",
        },
      ],
    },
  ],
};
