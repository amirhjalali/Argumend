export const climateChangeData = {
  id: "climate-change",
  title: "Climate Change",
  question: "Is climate change primarily caused by human activity?",
  // Words readers use for this question that the map's own text does not.
  aliases: [
    "Is climate change a hoax or a scam?",
    "Hasn't the climate always changed naturally, because of the sun?",
    "Isn't CO2 just plant food?",
  ],
  meta_claim: "Climate change is primarily caused by human activity.",
  status: "settled" as const,
  category: "science" as const,
  // As of 3 November 2026: the Indicators of Global Climate Change update
  // (Forster et al., ESSD, June 2025) puts human-caused warming in 2024 at
  // 1.36 °C of the 1.52 °C observed; the National Academies (September 2025)
  // called the evidence of harm "beyond scientific dispute"; the EPA rescinded
  // the 2009 endangerment finding for vehicles in February 2026 on legal
  // rather than scientific grounds, after a Department of Energy working group
  // of five contrarian scientists argued in July 2025 that models run hot.
  last_updated: "2026-11-03",
  keystone_fact: {
    statement:
      "Of the 1.52 °C the world had warmed by 2024, researchers attribute 1.36 °C to human activity, and the rate of human-caused warming has reached about 0.27 °C a decade. The carbon in the air has grown isotopically lighter, from about −6.5‰ before the industrial era to −8‰ today, the signature of fossil fuel. The part scientists still argue over is how much warming each tonne buys and how fast; in February 2026 the US government withdrew its legal finding that greenhouse gases endanger health without contesting that science.",
    confidence: 97,
    source:
      "Forster et al., 'Indicators of Global Climate Change 2024', Earth System Science Data 17:2641-2680 (19 June 2025); NOAA Global Monitoring Laboratory; Morgan Lewis on the EPA's February 2026 rescission",
    sourceUrl: "https://essd.copernicus.org/articles/17/2641/2025/",
  },
  simple_case: [
    "The answer bears on what the US government may regulate, on what the next decade of emissions is expected to cost, and on which claims about the sun, the models and the data a reader should take seriously.",
    "What is argued about now is mostly size and speed: how much the world warms for each doubling of CO₂, whether some of the models run hotter than the thermometers, and whether natural variability is larger than the measured energy budget leaves room for.",
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
      title: "Where Did the Extra CO₂ Come From?",
      short_summary:
        "Fossil carbon is lighter in carbon-13 than the carbon in the air, so burning it should make the air isotopically lighter. It has: from about −6.5‰ before 1850 to −8‰ today. Oxygen is falling at the ratio combustion predicts and the ocean is acidifying, which an ocean releasing CO₂ would not do.",
      image_url:
        "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=800&q=60",
      icon_name: "Atom" as const,
      skeptic_premise:
        "CO₂ has risen and fallen on its own throughout Earth's history, long before anyone burned coal, and warm oceans release it. The rise since 1850 tracks industrialisation, but so does almost everything else about the modern world, and matching two curves is not proving one caused the other.",
      proponent_rebuttal:
        "The added carbon can be identified, not just counted. Plants take up the lighter carbon-12 in preference to carbon-13, so coal and oil made from ancient plants are depleted in carbon-13; as that carbon enters the air, the atmosphere's ratio falls, and since 1850 it has fallen as burning fossil fuel predicts. Two other chemical signatures line up: atmospheric oxygen is dropping at the ratio combustion consumes it, and surface-ocean pH has fallen about 0.1 units. An ocean releasing CO₂ would become less acidic, not more, and volcanoes emit roughly 0.3-0.6 billion tonnes of CO₂ a year against about 40 billion tonnes from human activity.",
      crux: {
        id: "suess-effect",
        title: "The Suess Effect Measurement",
        question:
          "Does the falling carbon-isotope ratio in the air confirm that the added CO₂ comes from fossil fuels?",
        description:
          "Measure the decline in atmospheric δ¹³C ratio over time to confirm fossil fuel origin.",
        methodology:
          "Extract CO₂ from ice cores (pre-industrial baseline). Compare to modern atmospheric samples. Calculate δ¹³C shift and match to fossil fuel burning rate.",
        equation:
          "\\delta^{13}C = \\left(\\frac{(^{13}C/^{12}C)_{sample}}{(^{13}C/^{12}C)_{standard}} - 1\\right) \\times 1000\\text{‰}",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Compare the measured fall in carbon-13 in air, ice cores, tree rings and corals with the fall expected from the known tonnage of fossil fuel burned, and with the signatures of alternative sources such as volcanoes and the oceans, using NOAA and Scripps records.",
        },
        cost_to_verify: "$50K (ice core analysis + mass spectrometry)",
        falsification: {
          supporter_flip:
            "If atmospheric δ¹³C stopped declining (or rose) while fossil emissions continued, or if the oxygen-decline and ocean-acidification signatures diverged from the combustion ratio, the 'fossil carbon' attribution would break.",
          skeptic_flip:
            "If new isotope, oxygen and ocean-pH records kept moving as fossil-fuel combustion predicts, with pH falling where ocean outgassing would raise it, the 'natural outgassing' explanation would be hard to hold.",
          common_ground:
            "Both sides agree CO₂ has varied naturally over Earth's history and that the modern level is the highest in at least ~800,000 years.",
          live_disagreement:
            "Essentially none on source attribution — the isotopic fingerprint is not seriously contested in the literature; the real dispute is about consequences, not origin.",
        },
      },
      evidence: [
        {
          id: "isotope-measurements",
          title: "Atmospheric carbon-13 fell from about −6.5‰ to −8‰, the fossil-fuel signature (NOAA, Scripps)",
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
          title: "Atmospheric oxygen is falling at the ratio burning consumes it (Scripps O₂ Program)",
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
          title: "Surface-ocean pH has fallen about 0.1 units, which outgassing would not do (NOAA PMEL)",
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
          title: "Volcanoes and ocean outgassing release CO₂ too — about 60-90 times less than people do",
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
      title: "Does the Warming Look Like Greenhouse Warming?",
      short_summary:
        "Greenhouse warming leaves marks that solar warming would not: the stratosphere cools while the surface warms, and the Arctic warms about four times faster than the globe. Both are observed. The live argument is about shorter swings, such as the 1998-2014 slowdown, and whether they show the models are off.",
      image_url:
        "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=60",
      icon_name: "Telescope" as const,
      skeptic_premise:
        "The case rests on models that missed things they should have caught. Temperatures stalled from 1998 to 2014 while emissions kept climbing, and the models did not predict it; a subset of the newest generation still runs hotter than the thermometers. Climate shifted before, too: the Medieval Warm Period and the Roman Climate Optimum came and went with no industry at all. A theory that explains the warm years and calls the flat ones natural variability is hard to catch out.",
      proponent_rebuttal:
        "The attribution does not rest on models alone, and where it does, they have been tested against things they did not know in advance. Models reproduce the whole 20th-century record, including the mid-century cooling caused by aerosols. The 'hiatus' was within model uncertainty bounds and is now understood as a short-term slowdown linked to a negative Pacific Decadal Oscillation phase; later reanalyses (e.g. Karl et al. 2015) found little or no actual slowdown once data biases were corrected. The Medieval Warm Period and Roman Climate Optimum were real but largely regional—IPCC AR6 finds no globally synchronous warm epoch in the past 2,000 years, whereas today's warming is globally coherent and, in rate, unprecedented over that span. Crucially, models predict specific 'fingerprints': stratospheric cooling while the troposphere warms (greenhouse signature), nights warming faster than days, and polar amplification. All three fingerprints are observed. IPCC AR6 estimates human-induced warming of about 1.1°C since 1850–1900, with natural forcings contributing only roughly −0.1°C to +0.1°C—so natural factors alone cannot explain the observed trend; only adding anthropogenic forcing matches reality.",
      crux: {
        id: "fingerprint-detection",
        title: "The Fingerprint Detection Test",
        question:
          "Do short-term swings like the 1998–2014 slowdown reflect model error or natural variability?",
        description:
          "Detect greenhouse-specific warming patterns vs solar/volcanic patterns.",
        methodology:
          "Run climate models with natural forcing only (solar + volcanic). Run models with anthropogenic forcing only (GHG + aerosols). Run combined forcing. Statistical detection of which pattern matches observed record.",
        equation:
          "y(t) = \\beta_1 X_{natural}(t) + \\beta_2 X_{anthropogenic}(t) + \\varepsilon(t)",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Rerun climate models with the actual ocean cycles, volcanic eruptions and solar output of those years fed in, check if they reproduce the slowdown, then compare later ocean heat content from Argo floats with what each explanation predicted.",
        },
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
          title: "The stratosphere is cooling while the surface warms — a pattern the sun cannot make (PNAS, 2023)",
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
          title: "Nights warmed faster than days through the late 20th century, as a greenhouse blanket predicts",
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
          title: "The Arctic has warmed nearly four times faster than the globe since 1979 (Rantanen et al., 2022)",
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
          title: "A subset of the newest climate models runs hotter than the thermometers (IPCC AR6)",
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
      title: "Could It Be the Sun, or Volcanoes?",
      short_summary:
        "Direct satellite measurements since 1978 show solar output flat or slightly falling while temperatures rose, cosmic-ray flux shows no matching trend, and orbital cycles currently push toward cooling. Earth is absorbing roughly 1 W/m² more energy than it radiates, and no measured natural forcing fills that gap.",
      image_url:
        "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Everything about Earth's climate begins with the sun, and small changes in its output can be amplified through cosmic rays seeding clouds or ultraviolet light altering ozone. Direct satellite measurement goes back only to 1978, a short record for a star. The sun has moved climate before: the Maunder Minimum of 1645-1715 coincided with Europe's bitterest winters. The honest worry is not that the sun explains everything, but that natural variability may be larger than the budget allows for.",
      proponent_rebuttal:
        "The sun was the first suspect, and it was checked. Solar irradiance has been flat or slightly declining since 1980 while temperatures accelerated upward, so the correlation broke. Cosmic ray flux shows no trend matching temperature. Volcanic eruptions cause temporary cooling (Pinatubo 1991 clearly visible), confirming models work, but there's no volcanic trend to explain warming. Orbital (Milankovitch) cycles operate on 10,000+ year timescales and currently favor slight cooling. When you sum all natural factors, the net contribution to warming since 1850–1900 is near zero—IPCC AR6 puts natural forcings at roughly −0.1°C to +0.1°C. The energy imbalance (~0.5–1 W/m²) measured by satellites and Argo floats requires an additional forcing—greenhouse gases are the only candidate that fits.",
      crux: {
        id: "energy-budget-closure",
        title: "The Energy Budget Closure Test",
        question:
          "Could an under-measured natural factor be large enough to matter for the warming?",
        description:
          "Account for all energy inputs and outputs to identify the forcing source.",
        methodology:
          "Measure incoming solar radiation (satellites). Measure outgoing longwave radiation (satellites). Calculate ocean heat uptake (Argo floats). Sum all known natural forcings. Identify residual requiring anthropogenic explanation.",
        equation: "\\Delta Q = F - \\lambda \\Delta T",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Satellite measurements of the Earth's energy imbalance from CERES, ocean heat uptake from Argo floats and solar output records, checked for any gap between measured heating and the known forcings that an uncounted natural factor would have to fill.",
        },
        cost_to_verify: "$2M (satellite data + Argo network analysis)",
        falsification: {
          supporter_flip:
            "If a measured natural forcing — a real upward trend in solar irradiance or a cosmic-ray-driven cloud change — could be shown to close the ~0.5–1 W/m² energy imbalance, the 'only greenhouse gases fit' conclusion would fail.",
          skeptic_flip:
            "If new measurements kept finding solar irradiance flat-to-declining since 1980 while warming accelerated, and cosmic-ray flux kept showing no matching trend, the solar explanation would be hard to hold.",
          common_ground:
            "Both sides agree the sun is the ultimate driver of Earth's climate and that volcanic eruptions and orbital cycles measurably affect it.",
          live_disagreement:
            "Whether there is an under-measured natural forcing large enough to matter — the satellite/Argo energy budget leaves little room, but that bound is what's debated.",
        },
      },
      evidence: [
        {
          id: "solar-flat",
          title: "Solar output has been flat or slightly falling since 1978 while temperatures rose (NASA)",
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
          title: "A NASA model predicted Pinatubo's 0.5 °C cooling before the data came in, and got it right (1992)",
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
          title: "Satellites and ocean floats measure Earth absorbing about 1 W/m² more than it radiates",
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
          title: "The sun has shifted climate before, as in the Maunder Minimum of 1645-1715",
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
    {
      id: "how-much-warming",
      title: "How Much Warming, and Why Is This Still Argued About?",
      short_summary:
        "Doubling CO₂ warms the world somewhere between about 1.8 °C and 5.7 °C depending on the model, and that spread is where the real scientific argument lives. In February 2026 the US withdrew its legal finding that greenhouse gases endanger health, on legal grounds rather than by contesting the attribution.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The disagreement that matters is not whether CO₂ warms the planet but by how much, and there the honest answer is a wide range. A Department of Energy working group of five scientists argued in July 2025 that the several dozen global climate models 'offer little guidance', giving average surface warming for a doubling of CO₂ anywhere from 1.8 °C to 5.7 °C, that models run hot against the past few decades, and that US records do not show the rising trends in hurricanes, tornadoes, floods and droughts commonly attributed to warming. A range that wide, used to justify policy costed to the trillion, is a weaker basis than the public is told. If the sensitivity sits at the low end, much of the alarm is misplaced even though the attribution holds.",
      proponent_rebuttal:
        "The uncertainty is about how fast, not whether, and it has narrowed where it can be measured. The annual Indicators of Global Climate Change update attributes 1.36 °C of the 1.52 °C observed in 2024 to human activity, with human-caused warming now rising about 0.27 °C a decade, the fastest in the instrumental record. The National Academies, reviewing the evidence in September 2025, concluded that the harm to health and welfare from human-caused greenhouse gases 'is beyond scientific dispute' and that improved observations 'confirm unequivocally' that emissions are warming the surface. Uncertainty is not reassurance: the same spread that allows a low sensitivity allows a high one, and the energy imbalance has been running at the top of expectations. When the EPA withdrew the endangerment finding in February 2026, it did so on statutory interpretation and declined to find that climate change does not endanger health.",
      crux: {
        id: "climate-sensitivity-constraint",
        title: "The Sensitivity Narrowing Test",
        question:
          "How much does the world warm for each doubling of CO₂, and is the range narrowing?",
        description:
          "Models put equilibrium warming for a doubling of CO₂ between roughly 1.8 °C and 5.7 °C. Narrowing that range decides how much warming the next few decades of emissions buy. It is a question about magnitude, which both sides treat as open, not about whether human emissions drive the warming.",
        methodology:
          "Combine the instrumental energy budget (forcing, measured imbalance from CERES and Argo, observed warming) with paleoclimate constraints and emergent constraints on cloud feedback, as the World Climate Research Programme assessment did, and check each year's new observations against the models' spread rather than against their mean.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "The measured energy imbalance, the forcing history and the observed warming read together each year against paleoclimate and cloud-feedback constraints, to see whether the plausible range for a doubling of CO₂ keeps shrinking and where inside it the observations fall.",
        },
        cost_to_verify: "$5-20M (satellite and ocean observation programmes plus model intercomparison)",
        falsification: {
          supporter_flip:
            "If a decade of energy-budget and cloud-feedback constraints kept landing near the bottom of the 1.8-5.7 °C range, and observed warming kept undershooting the models, the case for the higher projections would weaken even with attribution intact.",
          skeptic_flip:
            "If the measured energy imbalance and new constraints kept ruling out the low end, as the doubling of the imbalance since 2000 suggests, the argument that the models exaggerate would be hard to hold.",
          common_ground:
            "Both sides agree the model range for a doubling of CO₂ spans roughly 1.8 °C to 5.7 °C, that some of the newest models run hotter than observations, and that the measured energy imbalance is the key constraint.",
          live_disagreement:
            "Where inside that range the real sensitivity sits, and whether the spread is wide enough to make strong projections unreliable.",
        },
      },
      evidence: [
        {
          id: "igcc-2024-attribution",
          title:
            "Of 1.52 °C of warming in 2024, 1.36 °C is attributed to human activity (Earth System Science Data, 2025)",
          description:
            "The 2025 Indicators of Global Climate Change update, led by Piers Forster and following IPCC AR6 methods, reports the 2024 observed global surface temperature at 1.52 °C above 1850-1900 and the best estimate of human-caused warming at 1.36 °C. Over the decade 2015-2024, observed warming was 1.24 °C and human-induced warming 1.22 °C. Human-induced warming is rising 'at a rate that is unprecedented in the instrumental record', reaching 0.27 °C per decade over 2015-2024.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 9,
          },
          source:
            "Forster et al., 'Indicators of Global Climate Change 2024: annual update', Earth System Science Data 17:2641-2680 (19 June 2025)",
          sourceUrl: "https://essd.copernicus.org/articles/17/2641/2025/",
          reasoning:
            "An annual, open-data update by the researchers who wrote the IPCC's physical-science chapters, using published methods anyone can rerun. It quantifies the human share directly: almost all of the observed warming, with the rest internal variability. It inherits the attribution methods' own uncertainties, which the paper states as ranges.",
        },
        {
          id: "national-academies-2025",
          title:
            "National Academies (September 2025): the evidence of harm is 'beyond scientific dispute'",
          description:
            "In 'Effects of Human-Caused Greenhouse Gas Emissions on U.S. Climate, Health, and Welfare', released on 17 September 2025 in response to the EPA's proposal to rescind the 2009 endangerment finding, the National Academies of Sciences, Engineering, and Medicine concluded that the evidence of current and future harm from human-caused greenhouse gases 'is beyond scientific dispute', that 'improved observations confirm unequivocally that greenhouse gas emissions are warming Earth's surface', and that no known natural factor explains the observed changes. It found the 2009 finding accurate and reinforced by stronger evidence.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "National Academies of Sciences, Engineering, and Medicine, 'Effects of Human-Caused Greenhouse Gas Emissions on U.S. Climate, Health, and Welfare' (17 September 2025)",
          sourceUrl:
            "https://www.nationalacademies.org/news/national-academies-publish-new-report-reviewing-evidence-for-greenhouse-gas-emissions-and-u-s-climate-health-and-welfare",
          reasoning:
            "A committee review of the literature by the body US law treats as the scientific court of last resort, published into a live political fight and against the administration's position. It is an assessment of other people's evidence rather than new measurement, and the committee's composition was itself attacked from both directions.",
        },
        {
          id: "doe-working-group-2025",
          title:
            "DOE working group (July 2025): models give 'little guidance', warming per CO₂ doubling spans 1.8-5.7 °C",
          description:
            "A five-member Climate Working Group assembled by Energy Secretary Chris Wright — John Christy, Judith Curry, Steven Koonin, Ross McKitrick and Roy Spencer — published 'A Critical Review of Impacts of Greenhouse Gas Emissions on the U.S. Climate' on 29 July 2025. It argued that the world's several dozen global climate models 'offer little guidance' on how much the climate responds to CO₂, with average surface warming for a doubling ranging from 1.8 °C to 5.7 °C; that models run 'hot' against the past few decades; that most extreme weather events in the US show no long-term trend; and that CO₂-induced warming 'appears to be less damaging economically than commonly believed'. The EPA's final February 2026 rescission did not rely on it.",
          side: "against" as const,
          weight: {
            sourceReliability: 4,
            independence: 3,
            replicability: 5,
            directness: 5,
          },
          source:
            "US Department of Energy, 'Department of Energy Issues Report Evaluating Impact of Greenhouse Gasses on U.S. Climate' (29 July 2025); DieselNet summary of the report's findings",
          sourceUrl:
            "https://www.energy.gov/articles/department-energy-issues-report-evaluating-impact-greenhouse-gasses-us-climate-invites",
          reasoning:
            "The fullest recent statement of the dissenting case, and its central point — that the sensitivity range is wide — is uncontested. Independence and reliability are low: the authors were picked by a department seeking a specific policy outcome, the report had no formal peer review, and critics including Zeke Hausfather argued it selects data points that fit its narrative. Its own text accepts that CO₂ warms the planet.",
        },
        {
          id: "energy-imbalance-doubled-2025",
          title:
            "Earth's energy imbalance has more than doubled in two decades, and ran above model expectations in 2023 (AGU Advances, 2025)",
          description:
            "Mauritsen and colleagues reported in AGU Advances in June 2025 that Earth's energy imbalance, the gap between sunlight absorbed and heat radiated away, has more than doubled in recent decades and is rising faster than models projected; in 2023 the observed imbalance was about twice the IPCC's best estimate. The authors warn that the satellite record that measures it is at risk as CERES instruments are decommissioned, with the replacement, Libera, not due to launch until 2027.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Mauritsen et al., 'Earth's Energy Imbalance More Than Doubled in Recent Decades', AGU Advances 6:e2024AV001636 (June 2025); Stockholm University Department of Meteorology",
          sourceUrl:
            "https://www.su.se/english/divisions/department-of-meteorology/news/articles/2025-06-10-earths-energy-imbalance-more-than-doubled-in-recent-decades.-new-publication-by-misu",
          reasoning:
            "A direct measurement of heat accumulating, running at the high end rather than the low end of what models expected, which cuts against the claim that projections are systematically too warm. It also shows the models are imperfect in both directions, and the explanation for the acceleration — clouds, aerosols or feedbacks — is not settled.",
        },
      ],
    },
  ],
};
