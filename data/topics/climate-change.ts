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
            "NOAA's Global Monitoring Laboratory records that 'before the industrial revolution, δ13C of our atmosphere was approximately -6.5‰; now the value is around -8‰'. Plants, and so the fossil fuels made from them, are depleted in carbon-13, so burning them makes the air isotopically lighter — the Suess effect, which NOAA defines as 'the observed decrease in δ13C and Δ14C values due to fossil fuel emissions'.",
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
            "A chemical fingerprint, measured continuously by NOAA and independently by Scripps, that identifies the source of the extra carbon rather than inferring it. It establishes where the carbon came from, not how much warming it causes.",
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
            "NOAA records that in the 200-plus years since the industrial revolution began 'the pH of surface ocean waters has fallen by 0.1 pH units', which on a logarithmic scale 'represents approximately a 30 percent increase in acidity', as the ocean absorbs about a quarter to a third of the CO₂ released each year and the gas dissolves to form carbonic acid.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source:
            "NOAA Education, 'Ocean acidification' resource collection; NOAA PMEL Carbon Program",
          sourceUrl:
            "https://www.noaa.gov/education/resource-collections/ocean-coasts/ocean-acidification",
          reasoning:
            "The 0.1 pH-unit decline is NOAA's own figure, and it points the same way as the isotopes: the ocean is taking carbon up rather than giving it off, which is what outgassing would do. Directness is moderate because acidification corroborates the carbon source rather than proving attribution on its own.",
        },
        {
          id: "natural-co2-claim",
          title: "Volcanoes and ocean outgassing release CO₂ too — about 60-90 times less than people do",
          description: "The claim is that volcanoes and a warming ocean, not people, put the extra carbon dioxide in the air. NOAA's climate.gov puts volcanic emissions at about 0.6 billion metric tons of CO₂ a year on a 2013 estimate, against roughly 40 billion tons from human activity, making human emissions '60 or more times' the volcanic figure, or more than 90 times on an earlier, lower volcanic estimate. The ocean is absorbing carbon, not releasing it, which is why its surface is becoming less alkaline.",
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
            "This is the main natural-source alternative, and it fails on arithmetic from the same agency that measures both: volcanic emissions are 60 to 90 times smaller than human ones. The isotopes point the same way, and an outgassing ocean would be shedding carbon rather than acidifying.",
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
            "Santer and colleagues extended 'vertical fingerprinting' into the mid-to-upper stratosphere, 25 to 50 km up, where satellites measure 1 to 2 °C of cooling over 1986 to 2022 while the troposphere warmed at all latitudes. Adding that layer raised the signal-to-noise ratio of the human fingerprint by a factor of five. A brighter sun would warm both layers; trapping heat below cools the layer above, which is what the satellites see.",
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
            "A pattern test rather than a trend test: the vertical shape of the temperature change discriminates between a brighter sun and a thicker blanket, and the measured shape is the blanket. The authors call it 'incontrovertible evidence of human effects on the thermal structure of Earth's atmosphere'; ozone depletion also contributes to stratospheric cooling, which their analysis accounts for.",
        },
        {
          id: "nights-faster",
          title: "Nights are warming faster than days across the US, as a greenhouse blanket predicts",
          description:
            "A 2026 climatology of the continental United States from 1950 to 2022, using the ERA5 Land reanalysis, found the diurnal temperature range has 'declined significantly over the period of record over much of the United States', because maximum temperatures are 'increasing at a slower rate than minima'. The authors ascribe the rising night-time minima to increasing humidity, cloud cover and precipitation, and call the trend 'clearly linked to anthropogenic warming'. A sun brightening the day would not narrow the gap this way.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source:
            "Davis, Delaar, Notari, McCarrick et al., 'Diurnal temperature range: A climatological primer for health researchers', PLOS ONE (2026), doi:10.1371/journal.pone.0352866",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/?term=10.1371%2Fjournal.pone.0352866",
          reasoning:
            "Reanalysis data over 72 years showing the asymmetry greenhouse warming predicts. It is one continent, the mechanism runs partly through humidity and cloud rather than directly through carbon dioxide, and the paper was written for health researchers rather than as an attribution study, so it corroborates the fingerprint rather than establishing it.",
        },
        {
          id: "polar-amplification",
          title: "The Arctic has warmed nearly four times faster than the globe since 1979 (Rantanen et al., 2022)",
          description:
            "Rantanen and colleagues, using several observational datasets covering the Arctic, found that over 1979-2021 the Arctic warmed nearly four times faster than the globe, a higher ratio than the two- to three-fold figures usually reported. They also found that a four-fold ratio is 'an extremely rare occasion' in climate model simulations, which they read as either a very unlikely event or a systematic model underestimate of Arctic amplification.",
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
            "Observed amplification matching the predicted ice-albedo feedback, measured across several datasets. Directness is trimmed because amplification is expected from any warming, not greenhouse warming alone, and because the paper's point cuts two ways: the observed ratio sits outside most model simulations, which is a mark against the models even as it confirms the physics.",
        },
        {
          id: "model-uncertainty",
          title: "A subset of the newest climate models runs hotter than the thermometers (IPCC AR6)",
          description:
            "The spread between models is real and wide: in the generation used for the IPCC's sixth assessment, the average surface warming for a doubling of CO₂ ranges from 1.8 °C to 5.7 °C, and the DOE working group's 2025 review argues that such models generally run 'hot' in their description of the climate of the past few decades. The assessed range for the real climate's sensitivity is narrower than the raw model spread, because the IPCC weighted the models against observations and paleoclimate evidence rather than taking their average.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 4,
          },
          source:
            "Climate Working Group, 'A Critical Review of Impacts of Greenhouse Gas Emissions on the U.S. Climate', US Department of Energy (2025), Executive Summary and Section 4.2, citing the CMIP6 range reported in IPCC AR6",
          sourceUrl:
            "https://www.energy.gov/sites/default/files/2025-07/DOE_Critical_Review_of_Impacts_of_GHG_Emissions_on_the_US_Climate.pdf",
          reasoning:
            "A real limitation, stated here in the critics' own words, and the reason this map treats magnitude as open. It bears on projections rather than attribution: the IPCC's assessed sensitivity range already weights models against observations, and the measured energy imbalance has been running high rather than low.",
        },
      ],
    },
    {
      id: "natural-factors-elimination",
      title: "Could It Be the Sun, or Volcanoes?",
      short_summary:
        "Direct satellite measurements since 1978 show solar output flat or slightly falling while temperatures rose, cosmic-ray flux shows no matching trend, and orbital cycles currently push toward cooling. Satellites and ocean floats both show Earth absorbing more energy than it radiates, with the gap widening by about 0.5 W/m² a decade since 2005, and no measured natural forcing fills it.",
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
            "If a measured natural forcing — a real upward trend in solar irradiance or a cosmic-ray-driven cloud change — could be shown to account for the measured energy imbalance and its rise, the 'only greenhouse gases fit' conclusion would fail.",
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
            "Total solar irradiance has been measured from space by an uninterrupted series of overlapping instruments since 1978, a record now spanning more than four 11-year solar cycles, in which irradiance swings about 0.1% with each cycle rather than trending up. NASA states that over that time 'there has been no upward trend in the amount of solar energy reaching our planet', and that it is 'extremely unlikely that the Sun has caused the observed global temperature warming trend' of the past half-century.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 9,
          },
          source:
            "NASA, 'Is the Sun causing global warming?'; Kopp, 'Solar irradiance measurements', Living Reviews in Solar Physics (2025) on the space-borne TSI record",
          sourceUrl:
            "https://science.nasa.gov/climate-change/faq/is-the-sun-causing-global-warming/",
          reasoning:
            "The one natural driver big enough to do the job has been watched continuously from orbit for nearly fifty years, and it has not moved in the required direction. It rules the sun out as the cause of the trend; it does not by itself establish what is.",
        },
        {
          id: "pinatubo-test",
          title: "A NASA model forecast Pinatubo's cooling in advance, and the thermometers followed (GRL, 1992)",
          description:
            "Within months of the June 1991 eruption, Hansen, Lacis, Ruedy and Sato used the GISS global climate model to forecast 'a dramatic but temporary break in recent global warming trends', with 'intense aerosol cooling' predicted 'to begin late in 1991 and to maximize late in 1992', large enough to overwhelm a developing El Niño. 1992 and 1993 duly came in cooler before warming resumed, which is the closest thing to a controlled experiment on the models' handling of a known forcing.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Hansen, Lacis, Ruedy & Sato, 'Potential climate impact of Mount Pinatubo eruption', Geophysical Research Letters 19(2):215-218 (1992)",
          sourceUrl: "https://doi.org/10.1029/91GL02788",
          reasoning:
            "A forecast published before the outcome, which is the hardest test a model can face. It validates the model's response to a large volcanic forcing over a couple of years, not its sensitivity to carbon dioxide over a century, so it supports rather than settles the attribution.",
        },
        {
          id: "energy-imbalance",
          title: "Satellites and ocean floats measure Earth absorbing more energy than it radiates, and the gap is widening",
          description:
            "NASA's CERES satellite instruments and the global Argo array of ocean floats independently measure the gap between the sunlight Earth absorbs and the heat it radiates. Loeb and colleagues found both datasets gave 'statistically indistinguishable decadal increases' in that imbalance from mid-2005 to mid-2019, of 0.50 ± 0.47 W/m² per decade; NASA's summary of the work says the imbalance 'approximately doubled during the 14-year period from 2005 to 2019'. Energy is therefore accumulating in the ocean, land, ice and atmosphere.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 9,
          },
          source:
            "Loeb et al., 'Satellite and Ocean Data Reveal Marked Increase in Earth's Heating Rate', Geophysical Research Letters (15 June 2021), doi:10.1029/2021GL093047; NASA Langley news release",
          sourceUrl:
            "https://www.nasa.gov/centers-and-facilities/langley/joint-nasa-noaa-study-finds-earths-energy-imbalance-has-doubled/",
          reasoning:
            "Two independent measurement systems, one in orbit and one in the water, agreeing on a rising heating rate. It measures accumulation rather than its cause, and Loeb attributes much of the trend to less reflected sunlight, so the split between greenhouse forcing, clouds and aerosols is still being worked out.",
        },
        {
          id: "solar-correlation-historical",
          title: "The sun has nudged the climate before, by at most 0.1 °C of the warming since pre-industrial times (NOAA)",
          description:
            "The sun does influence climate, and NOAA's climate.gov treats that influence as real but small: sunspot records indicate a slight increase in incoming sunlight between the late 1800s and the mid-1900s, which researchers estimate contributed 'at most up to 0.1°C of the 1.0°C (1.8°F) of warming observed since the pre-industrial era'. For the period since, the same page states that 'there has been no significant net change in the Sun's energy output from the late 1970s to the present'.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 5,
            directness: 4,
          },
          source:
            "NOAA Climate.gov, 'Couldn't the Sun be the cause of global warming?'",
          sourceUrl:
            "https://www.climate.gov/news-features/climate-qa/couldnt-sun-be-cause-global-warming",
          reasoning:
            "This is the strongest honest version of the solar case: the sun is a real climate influence, so asking about it is not crankery. It is on this side at low weight because the same source bounds that influence at a tenth of the observed warming and finds no net change in solar output over the decades when warming accelerated.",
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
            "A five-member Climate Working Group assembled by Energy Secretary Chris Wright — John Christy, Judith Curry, Steven Koonin, Ross McKitrick and Roy Spencer — published 'A Critical Review of Impacts of Greenhouse Gas Emissions on the U.S. Climate', released by DOE on 29 July 2025. It states that 'the world's several dozen global climate models offer little guidance on how much the climate responds to elevated CO2, with the average surface warming under a doubling of the CO2 concentration ranging from 1.8°C to 5.7°C', that such models generally run 'hot' in their description of the climate of the past few decades, that 'claims of increased frequency or intensity of hurricanes, tornadoes, floods, and droughts are not supported by U.S. historical data', and that warming 'might be less damaging economically than commonly believed'. The same report accepts that carbon dioxide 'acts as a greenhouse gas, exerting a warming influence on climate and weather'.",
          side: "against" as const,
          weight: {
            sourceReliability: 4,
            independence: 3,
            replicability: 5,
            directness: 5,
          },
          source:
            "Climate Working Group, 'A Critical Review of Impacts of Greenhouse Gas Emissions on the U.S. Climate', US Department of Energy (released 29 July 2025), Executive Summary",
          sourceUrl:
            "https://www.energy.gov/sites/default/files/2025-07/DOE_Critical_Review_of_Impacts_of_GHG_Emissions_on_the_US_Climate.pdf",
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
