import type { Topic } from "@/lib/schemas/topic";

export const climateChangeData = {
  id: "climate-change",
  title: "Climate Change",
  meta_claim: "Climate change is primarily caused by human activity.",
  status: "settled" as const,
  category: "science" as const,
  keystone_fact: {
    statement:
      "That the CO₂ rise comes from burning fossil fuels isn't a correlation — it's a chemical fingerprint: atmospheric carbon is getting isotopically lighter (δ¹³C), oxygen is dropping at the exact ratio combustion predicts, and the oceans are acidifying. Three independent signatures, one source.",
    confidence: 97,
    source: "NOAA Global Monitoring Laboratory; Scripps CO₂ Program (Keeling)",
    sourceUrl: "https://gml.noaa.gov/ccgg/isotopes/c13tellsus.html",
  },
  simple_case: [
    "The core question — is the warming human-caused — is settled about as firmly as anything in science: the IPCC attributes roughly 1.1°C of warming since the 1800s to human activity, with all natural factors together contributing close to zero.",
    "We know the extra CO₂ is ours because it carries a chemical fingerprint (lighter carbon isotopes, falling oxygen, acidifying oceans), and the warming carries a greenhouse fingerprint (the upper atmosphere cools while the surface warms) that the sun cannot produce.",
    "The live debates today are not about whether it is happening, but about how fast it will warm (climate sensitivity) and what to do about it — a policy and economics fight, not a physics one.",
  ],
  imageUrl:
    "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title:
        "IPCC AR6 WG1 Summary for Policymakers (2021) — \"It is unequivocal that human influence has warmed the atmosphere, ocean and land\"",
      url: "https://www.ipcc.ch/report/ar6/wg1/chapter/summary-for-policymakers/",
    },
    {
      title: "NASA: The Causes of Climate Change",
      url: "https://science.nasa.gov/climate-change/causes/",
    },
    {
      title:
        "Lynas, Houlton & Perry (2021), Greater than 99% consensus on human-caused climate change, Environmental Research Letters 16:114005",
      url: "https://doi.org/10.1088/1748-9326/ac2966",
    },
    {
      title:
        "NOAA Global Monitoring Laboratory: What δ13C Tells Us (the Suess Effect)",
      url: "https://gml.noaa.gov/ccgg/isotopes/c13tellsus.html",
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
          title: "NOAA GML: Carbon Isotopes and the Suess Effect",
          url: "https://gml.noaa.gov/ccgg/isotopes/",
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
        falsification: {
          supporter_flip:
            "If atmospheric δ¹³C stopped declining (or rose) while fossil emissions continued, or if the oxygen-decline and ocean-acidification signatures diverged from the combustion ratio, the 'fossil carbon' attribution would break.",
          skeptic_flip:
            "The 'natural outgassing' explanation should be abandoned: all three independent signatures — isotopes, oxygen, ocean pH — move exactly as fossil-fuel combustion predicts, and ocean outgassing would push pH the opposite way.",
          common_ground:
            "Both sides agree CO₂ has varied naturally over Earth's history and that the modern level is the highest in at least ~800,000 years.",
          live_disagreement:
            "Essentially none on source attribution — the isotopic fingerprint is not seriously contested in the literature; the real dispute is about consequences, not origin.",
        },
      },
      evidence: [
        {
          id: "isotope-measurements",
          title: "δ¹³C Decline Matches Fossil Fuel Signature",
          description:
            "Atmospheric δ¹³C has declined from roughly -6.5‰ before the industrial era to about -8‰ today, as predicted from fossil fuel combustion (the Suess effect).",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 10,
          },
          source:
            "NOAA Global Monitoring Laboratory; Scripps CO2 Program (Keeling)",
          sourceUrl: "https://gml.noaa.gov/ccgg/isotopes/c13tellsus.html",
          reasoning:
            "Chemical fingerprint measured by independent labs worldwide; NOAA GML reports the -6.5‰ to ~-8‰ shift directly.",
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
          source: "Scripps O2 Program (R. Keeling, Scripps Institution of Oceanography)",
          sourceUrl: "https://scrippso2.ucsd.edu/",
          reasoning:
            "Independent chemical evidence confirming combustion source; the Scripps O2 Program directly measures the declining atmospheric O2/N2 ratio tracking fossil-fuel burning.",
        },
        {
          id: "ocean-acidification",
          title: "Ocean pH Declining (Acidification)",
          description:
            "Surface-ocean pH has dropped about 0.1 units (from ~8.2 to ~8.1) since pre-industrial times—a ~30% increase in acidity—as CO₂ dissolves to form carbonic acid.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "NOAA PMEL Carbon Program; IPCC AR6 WG1",
          sourceUrl: "https://www.pmel.noaa.gov/co2/story/Ocean+Acidification",
          reasoning:
            "The ~0.1 pH-unit decline is documented by NOAA PMEL and IPCC AR6; directness is moderate because acidification corroborates the carbon source rather than proving human attribution on its own.",
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
          source: "NOAA Climate.gov (volcanoes vs. human CO₂)",
          sourceUrl:
            "https://www.climate.gov/news-features/climate-qa/which-emits-more-carbon-dioxide-volcanoes-or-human-activities",
          reasoning:
            "Contradicted by isotopic evidence and mass balance: volcanoes emit ~0.3–0.6 Gt CO₂/year versus ~40 Gt/year from human activity (60–90x more), per NOAA/USGS. The ocean is a net CO₂ sink, not source.",
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
        "Climate models successfully hindcast the entire 20th century temperature record, including the mid-century cooling from aerosols. The 'hiatus' was within model uncertainty bounds and is now understood as a short-term slowdown linked to a negative Pacific Decadal Oscillation phase; later reanalyses (e.g. Karl et al. 2015) found little or no actual slowdown once data biases were corrected. The Medieval Warm Period and Roman Climate Optimum were real but largely regional—IPCC AR6 finds no globally synchronous warm epoch in the past 2,000 years, whereas today's warming is globally coherent and, in rate, unprecedented over that span. Crucially, models predict specific 'fingerprints': stratospheric cooling while the troposphere warms (greenhouse signature), nights warming faster than days, and polar amplification. All three fingerprints are observed. IPCC AR6 estimates human-induced warming of about 1.1°C since 1850–1900, with natural forcings contributing only roughly −0.1°C to +0.1°C—so natural factors alone cannot explain the observed trend; only adding anthropogenic forcing matches reality.",
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
        falsification: {
          supporter_flip:
            "If the predicted greenhouse fingerprints failed — the stratosphere warming instead of cooling, or nights no longer warming faster than days — the greenhouse attribution would be in serious trouble.",
          skeptic_flip:
            "If natural-forcing-only climate runs could reproduce the observed global, synchronous warming and its specific fingerprints, the anthropogenic case would weaken — but to date only runs that include human forcing match the record.",
          common_ground:
            "Both sides agree regional warm periods (Medieval, Roman) occurred and that early climate models had real uncertainties.",
          live_disagreement:
            "How much of short-term wiggles (e.g., the 1998–2014 'hiatus') reflects model error versus natural variability — a question about precision, not about whether humans are the main driver.",
        },
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
          source:
            "Santer et al. (2023), PNAS 120:e2300758120; NASA/NOAA satellite (MSU/AMSU) records",
          sourceUrl: "https://www.pnas.org/doi/10.1073/pnas.2300758120",
          reasoning:
            "Solar warming would heat all layers; greenhouse traps heat below while cooling the stratosphere. Santer et al. detect this vertical 'fingerprint' in satellite data at high confidence.",
        },
        {
          id: "nights-faster",
          title: "Nights Warmed Faster Than Days (20th-century trend)",
          description:
            "Over 1950–2000 the diurnal temperature range narrowed as minimum (night) temperatures rose faster than maximum (day) temperatures—consistent with a greenhouse 'blanket' effect.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source: "IPCC AR4/AR6 WG1; surface station records",
          sourceUrl:
            "https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-2/",
          reasoning:
            "Robust signal for the late 20th century, but de-weighted because post-1980 the diurnal range has partly reversed (declining cloud cover / solar brightening drives faster daytime warming in recent decades). A supporting but no longer clean fingerprint.",
        },
        {
          id: "polar-amplification",
          title: "Arctic Warming ~4x Faster Than Global Average",
          description:
            "Since 1979 the Arctic has warmed nearly four times faster than the global mean—polar amplification consistent with greenhouse-driven warming and ice-albedo feedback.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source:
            "Rantanen et al. (2022), Communications Earth & Environment 3:168",
          sourceUrl: "https://doi.org/10.1038/s43247-022-00498-3",
          reasoning:
            "Ice-albedo feedback predicted and observed; directness trimmed because amplification is also expected from other forcings, so it corroborates rather than uniquely fingerprints greenhouse warming. Rantanen et al. measure ~4x (higher than older 2–3x estimates).",
        },
        {
          id: "model-uncertainty",
          title: "Climate Models Have Uncertainty Ranges",
          description:
            "Models show spread in predictions, and a subset of high-sensitivity CMIP6 models run warmer than observations.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 4,
          },
          source: "IPCC AR6 WG1 Chapter 1/4 (model evaluation)",
          sourceUrl: "https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-4/",
          reasoning:
            "Valid caveat, but IPCC AR6 down-weights the hottest CMIP6 models and constrains warming with observations; the attribution conclusion does not depend on the high-sensitivity outliers.",
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
        "Solar irradiance has been flat or slightly declining since 1980 while temperatures accelerated upward—the correlation broke. Cosmic ray flux shows no trend matching temperature. Volcanic eruptions cause temporary cooling (Pinatubo 1991 clearly visible), confirming models work, but there's no volcanic trend to explain warming. Orbital (Milankovitch) cycles operate on 10,000+ year timescales and currently favor slight cooling. When you sum all natural factors, the net contribution to warming since 1850–1900 is near zero—IPCC AR6 puts natural forcings at roughly −0.1°C to +0.1°C. The energy imbalance (~0.5–1 W/m²) measured by satellites and Argo floats requires an additional forcing—greenhouse gases are the only candidate that fits.",
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
        falsification: {
          supporter_flip:
            "If a measured natural forcing — a real upward trend in solar irradiance or a cosmic-ray-driven cloud change — could be shown to close the ~0.5–1 W/m² energy imbalance, the 'only greenhouse gases fit' conclusion would fail.",
          skeptic_flip:
            "The solar explanation should be set aside: solar irradiance has been flat-to-declining since 1980 while warming accelerated, and cosmic-ray flux shows no matching trend.",
          common_ground:
            "Both sides agree the sun is the ultimate driver of Earth's climate and that volcanic eruptions and orbital cycles measurably affect it.",
          live_disagreement:
            "Whether there is an under-measured natural forcing large enough to matter — the satellite/Argo energy budget leaves little room, but that bound is what's debated.",
        },
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
          source:
            "NASA (Is the Sun causing global warming?); PMOD/ACRIM TSI satellite composites",
          sourceUrl:
            "https://science.nasa.gov/climate-change/faq/is-the-sun-causing-global-warming/",
          reasoning:
            "Direct TSI measurement since 1978 shows no upward trend (slight decline) while temperatures rose, ruling out a solar driver—NASA's stated conclusion.",
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
          source:
            "Hansen et al. (1992), Geophysical Research Letters 19:215 (NASA GISS)",
          sourceUrl: "https://doi.org/10.1029/91GL02788",
          reasoning:
            "Natural experiment: Hansen's GISS model predicted ~0.5 °C transient cooling before the data came in, and observed cooling matched—validating the model's response to volcanic forcing.",
        },
        {
          id: "energy-imbalance",
          title: "Earth's Energy Imbalance Measured",
          description:
            "Satellites and Argo floats show Earth absorbing roughly 0.5–1.0 W/m² more than it radiates—and the imbalance has been rising—so energy is accumulating in the climate system.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 9,
          },
          source:
            "Loeb et al. (2021), Geophysical Research Letters; NASA/NOAA CERES satellite + Argo",
          sourceUrl:
            "https://www.nasa.gov/centers-and-facilities/langley/joint-nasa-noaa-study-finds-earths-energy-imbalance-has-doubled/",
          reasoning:
            "Direct measurement of energy accumulation; CERES+Argo found the imbalance roughly doubled from ~0.5 to ~1.0 W/m² over two decades, updating the older ~0.7 W/m² figure.",
        },
        {
          id: "solar-correlation-historical",
          title: "Historical Solar-Climate Correlations",
          description:
            "Past periods like the Maunder Minimum (c. 1645–1715) show genuine solar-climate connections.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 5,
            directness: 4,
          },
          source: "NOAA Climate.gov (Couldn't the Sun be the cause?)",
          sourceUrl:
            "https://www.climate.gov/news-features/climate-qa/couldnt-sun-be-cause-global-warming",
          reasoning:
            "Historical solar influence is real but small, and modern TSI has been flat/declining since 1979 while warming accelerated—so it cannot explain the post-1980 divergence.",
        },
      ],
    },
  ],
};
