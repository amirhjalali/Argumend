export const inflationMonetaryPolicyData = {
  id: "inflation-monetary-policy",
  title: "Inflation & Monetary Policy",
  question:
    "Was post-pandemic inflation driven mainly by spending and money growth?",
  aliases: [
    "Did stimulus checks cause inflation?",
    "Was inflation caused by supply chains or government spending?",
    "Did money printing cause inflation?",
    "Why are prices so high?",
    "Should the Fed raise rates when oil prices spike?",
  ],
  meta_claim:
    "Post-pandemic inflation was primarily driven by excessive government spending and monetary expansion, not supply chain disruptions.",
  status: "contested" as const,
  category: "economics" as const,
  // As of 3 November 2026: CPI-U rose 3.7% in the year to September 2026
  // (core 2.6%, energy 20.4%; BLS, 14 Oct 2026). The FOMC raised the target
  // range to 3.75-4% on 16 Sep 2026 (12-0) and held on 28 Oct (10-2, Cook
  // and Hammack preferring a hike). Kevin Warsh succeeded Jerome Powell as
  // chair on 22 May 2026. CPI-U NSA: 258.678 (Feb 2020), 336.940 (Sep 2026).
  last_updated: "2026-11-03",
  keystone_fact: {
    statement:
      "What cost $100 in February 2020 cost $130 in September 2026. Inflation peaked at 9.1% in June 2022, fell to about 3% a year later, and is back at 3.7%, with gasoline and other energy up 20.4% over the year; in September the Fed tightened again. In the same two years that prices took off, the money supply grew 40%. The fight is over how much of the inflation came from government spending and money, and how much from shocks no budget or central bank controls.",
    confidence: 88,
    source:
      "BLS, Consumer Price Index, September 2026 (14 October 2026); CPI-U and M2 via FRED; Federal Reserve FOMC statement (16 September 2026)",
    sourceUrl: "https://www.bls.gov/news.release/cpi.nr0.htm",
  },
  simple_case: [
    "Both sides accept that the money supply grew about 40% in two years, that money growth alone does not mechanically produce inflation, as post-2008 QE showed, and that shipping and commodity costs had largely normalized by 2022 while inflation persisted.",
    "They split over how much of the 2021-22 price rise the stimulus checks, PPP loans and money growth caused rather than merely allowed; how to divide it among supply, demand and expectations; whether earlier Fed tightening would have lowered the peak without a recession; and now, with energy prices surging in 2026, whether the Fed should raise rates into a supply shock or look through it.",
  ],
  imageUrl:
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "Federal Reserve Economic Data (FRED) — M2 Money Supply",
      url: "https://fred.stlouisfed.org/series/M2SL",
    },
    {
      title: "FRED — CPI for All Urban Consumers, not seasonally adjusted (CPIAUCNS)",
      url: "https://fred.stlouisfed.org/series/CPIAUCNS",
    },
    {
      title:
        "Bernanke & Blanchard (2023) — What Caused the U.S. Pandemic-Era Inflation?",
      url: "https://www.brookings.edu/articles/what-caused-the-u-s-pandemic-era-inflation/",
    },
    {
      title: "Federal Reserve: FOMC statement, 28 October 2026",
      url: "https://www.federalreserve.gov/newsevents/pressreleases/monetary20261028a.htm",
    },
    {
      title: "Kevin Warsh sworn in as Federal Reserve chair, succeeding Jerome Powell (22 May 2026)",
      url: "https://cbsaustin.com/news/nation-world/gallery/kevin-warsh-sworn-in-as-federal-reserve-chair-president-donald-trump-white-house",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Did money printing cause inflation?",
      content:
        "M2 grew from $15.5 trillion in February 2020 to $21.8 trillion in March 2022, about 40%, then shrank to $20.7 trillion by April 2023 as inflation fell. Did the money cause the inflation, or did much of it sit in savings and financial assets until spending and supply shocks met?",
      imageUrl:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=60",
      references: [
        {
          title: "FRED M2 Money Stock",
          url: "https://fred.stlouisfed.org/series/M2SL",
        },
      ],
    },
    {
      id: "q2",
      title: "Was inflation really transitory?",
      content:
        'The Federal Reserve called the 2021 inflation "transitory" and kept rates at zero into March 2022. Prices stopped rising fast, but they did not come back down: the price level is about 30% above February 2020. Was the label a reasonable call on the data of the time, or a costly delay?',
      imageUrl:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "q3",
      title: "Is 2026 a replay of 2021?",
      content:
        "Energy prices rose 20.4% in the year to September 2026 while core inflation was 2.6%. The Fed raised rates in September and two officials wanted another increase in October. The same question returns: is this a supply shock that will pass, or the start of inflation that spreads?",
      imageUrl:
        "https://images.unsplash.com/photo-1604594849809-dfedbc827105?auto=format&fit=crop&w=800&q=60",
    },
  ],
  pillars: [
    {
      id: "money-supply-expansion",
      title: "The money",
      short_summary:
        "M2 grew about 40% between February 2020 and March 2022, the fastest two-year expansion since World War II, and much of it reached households directly as checks and loans rather than sitting in bank reserves as after 2008. Whether that money caused the inflation or only allowed it is the oldest fight in economics, replayed.",
      image_url:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=60",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The relationship between money supply and inflation broke down decades ago. The Fed's balance sheet quintupled after 2008 and inflation ran below 2% for most of the next decade. During the pandemic the velocity of money collapsed, from about 1.30 to about 0.98, so much of the new money sat in savings accounts and financial markets. Inflation rose around the world in 2021 and 2022, including in countries with far smaller stimulus, which points to global causes: energy, food, shipping and a sudden shift in what people bought. The US spent more than most and saw somewhat more inflation, but the Fed's own economists put that extra at about 3 points, a fraction of the rise.",
      proponent_rebuttal:
        "The 2020-21 expansion was different in kind from 2008. After 2008 new money stayed as bank reserves; in 2020-21 about $814 billion in stimulus checks and roughly $800 billion in PPP loans went straight to households and firms, and M2 grew 40% in 24 months. Velocity fell at the trough of the lockdowns and recovered as the economy reopened, so the money met returning demand. San Francisco Fed economists estimate US fiscal support raised inflation by about 3 percentage points by the end of 2021, the gap between the US and its peers. When M2 shrank in 2022-23, from $21.8 trillion to $20.7 trillion, inflation fell. Monetarists concede the link is loose and the size was not predictable from money alone; their claim is that the money and spending turned a set of price shocks into a broad, lasting rise.",
      crux: {
        id: "m2-cpi-lag-correlation",
        title: "The M2-CPI Lag Correlation Test",
        question:
          "How much of the 2021–22 price rise did monetary and fiscal expansion cause, versus merely allow?",
        description:
          "Measure whether the timing and magnitude of M2 expansion and fiscal transfers predict the CPI increases that followed, roughly 12 to 24 months later, once supply shocks are controlled for, and whether countries that spent less saw less inflation.",
        methodology:
          "Compare M2 growth rate (monthly) with CPI-U inflation rate offset by 12-24 months. Control for supply-side shocks using PPI and shipping cost indices. Apply Granger causality test to determine if M2 changes predict CPI changes.",
        equation:
          "\\text{CPI}_{t} = \\alpha + \\beta_1 \\Delta M2_{t-18} + \\beta_2 \\text{SupplyShock}_{t} + \\varepsilon_{t}",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Granger-causality tests of monthly M2 growth against CPI 12 to 24 months later for 2020 to 2023, controlling for commodity prices and shipping costs, set beside the fall in money velocity.",
        },
        cost_to_verify: "$10K (econometric analysis of publicly available FRED data)",
        falsification: {
          supporter_flip:
            "If a Granger-causality test on 2020-2023 found M2 growth had no predictive power for CPI once commodity and shipping shocks were controlled for, or economies with far smaller monetary expansions saw similar inflation, money would look incidental rather than causal.",
          skeptic_flip:
            "If new studies confirmed that stimulus checks and PPP put money in consumers' hands rather than bank reserves, unlike post-2008 QE, and that M2 velocity recovered as the economy reopened, the swollen money stock would look like fuel for returning demand rather than inert.",
          common_ground:
            "M2 grew about 40% in two years, a post-war record, and money growth alone does not mechanically produce inflation, as the post-2008 QE years show.",
          live_disagreement:
            "How much of the 2021-2022 price rise the money and fiscal overhang caused, rather than merely accommodated, given a loose and lagged link between money and prices.",
        },
      },
      evidence: [
        {
          id: "m2-growth-unprecedented",
          title:
            "M2 grew 40.5% from February 2020 to March 2022, from $15.5 trillion to $21.8 trillion, then shrank (FRED)",
          description:
            "M2 money supply (FRED series M2SL, seasonally adjusted) grew from $15,492.8 billion in February 2020 to $21,770.7 billion in March 2022, a 40.5% increase and the fastest two-year expansion in the post-war era. It then fell to $20,737.8 billion by April 2023, as inflation came down. It was $23,413.9 billion in September 2026.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 6,
          },
          source: "Federal Reserve Economic Data (FRED) — M2 (M2SL), Federal Reserve Bank of St. Louis",
          sourceUrl: "https://fred.stlouisfed.org/series/M2SL",
          reasoning:
            "An indisputable measurement. Directness is moderate because money growth and inflation moving together does not show which caused which; the M2 definition was also revised in May 2020.",
        },
        {
          id: "fiscal-support-3-points",
          title:
            "San Francisco Fed 2022: US fiscal support raised inflation about 3 percentage points by the end of 2021",
          description:
            "Comparing US core inflation with a group of OECD economies that gave less pandemic support, Jordà, Liu, Nechio and Rivera-Reyes estimate that fiscal support measures may have contributed to the US inflation divergence by raising inflation about 3 percentage points by the end of 2021.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source:
            "Jordà, Liu, Nechio & Rivera-Reyes, 'Why Is U.S. Inflation Higher than in Other Countries?', FRBSF Economic Letter 2022-07 (28 March 2022)",
          sourceUrl:
            "https://www.frbsf.org/research-and-insights/publications/economic-letter/2022/03/why-is-us-inflation-higher-than-in-other-countries/",
          reasoning:
            "Federal Reserve economists using a cross-country design. It measures the US excess over peers, not the whole rise, so each side reads it its own way: proof that spending mattered, or proof that most inflation was global.",
        },
        {
          id: "fiscal-transfers-direct",
          title:
            "Pandemic relief sent about $814 billion in checks and $800 billion in PPP loans directly to households and firms",
          description:
            "Unlike 2008 QE, which expanded bank reserves, 2020-2021 relief sent money directly to households and firms: roughly $814 billion across three rounds of Economic Impact Payments and about $800 billion in PPP loans, most later forgiven.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          source: "Pandemic Response Accountability Committee (Economic Impact Payments); Autor et al., NBER WP 29669 (PPP)",
          sourceUrl: "https://www.pandemicoversight.gov/data-interactive-tools/data-stories/update-three-rounds-stimulus-checks-see-how-many-went-out-and",
          reasoning:
            "Payment totals are well documented. That direct transfers are more inflationary than QE is an inference, and much of the money was saved before it was spent.",
        },
        {
          id: "post-2008-no-inflation",
          title: "After 2008 the Fed's balance sheet grew from $0.9 trillion to $4.5 trillion and inflation stayed below 2%",
          description:
            "The Fed's balance sheet (FRED series WALCL) expanded from roughly $0.9 trillion to about $4.5 trillion between 2008 and 2014 via QE1-QE3, yet PCE and CPI inflation ran below the 2% target for most of the following decade.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 6,
          },
          source: "Federal Reserve H.4.1 / FRED Total Assets (WALCL); BLS CPI",
          sourceUrl: "https://fred.stlouisfed.org/series/WALCL",
          reasoning:
            "Shows that money creation alone does not mechanically produce inflation; how the money reaches the economy matters. It weakens strict monetarism more than the claim that 2020-21 spending mattered.",
        },
        {
          id: "velocity-collapse",
          title: "M2 velocity fell from about 1.30 to 0.98 in early 2020: much of the new money did not circulate",
          description:
            "M2 velocity (GDP divided by M2, FRED series M2V) fell sharply from roughly 1.30 in Q4 2019 to about 0.98 in Q2 2020, meaning a large portion of the new money did not circulate through the economy.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 10,
            directness: 5,
          },
          source: "FRED — Velocity of M2 Money Stock (M2V), Federal Reserve Bank of St. Louis",
          sourceUrl: "https://fred.stlouisfed.org/series/M2V",
          reasoning:
            "Low velocity offsets part of the money growth. Velocity recovered as the economy reopened, which is the other side's point.",
        },
      ],
    },
    {
      id: "supply-chain-vs-demand",
      title: "Supply or demand",
      short_summary:
        "Shipping a container cost about seven times its pre-pandemic price at the 2021 peak, chips halted car factories, and energy spiked after Russia invaded Ukraine. Spending also ran hot. The leading decompositions disagree on the split: Bernanke and Blanchard put most of the 2021 surge on price shocks; New York Fed economists put about two-thirds on demand.",
      image_url:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=60",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The initial inflation spike was overwhelmingly supply-driven, and the leading empirical decomposition backs this up: Bernanke and Blanchard (2023) attribute most of the 2021 surge to shocks to prices given wages, meaning commodity spikes and sector-specific shortages, not to an overheated labor market. COVID shut factories, ports and logistics worldwide; the Drewry World Container Index rose from about $1,500 to a peak near $10,377 per 40-foot box in September 2021. Semiconductor shortages halted car production, and energy surged with Russia's invasion of Ukraine. As supply chains normalized through 2022-23, inflation fell from 9.1% to about 3% without a recession. A demand-driven inflation historically takes high unemployment to cure, as in Volcker's 1980s campaign.",
      proponent_rebuttal:
        "Supply disruptions were real but cannot explain why inflation spread and lasted. Calibrating a production-network model to December 2019 to June 2022, New York Fed economists find aggregate demand shocks explain roughly two-thirds of the inflation, and the fiscal stimulus half or more of that demand effect. Even Bernanke and Blanchard conclude that labor-market tightness becomes the more persistent driver as one-off shocks fade, the part that needed restrictive policy. Core services excluding housing, a 'supercore' measure largely insulated from shipping and factories, ran near a 6.8% annualized pace in 2022. Shipping costs were back down by mid-2022; inflation was not.",
      crux: {
        id: "supply-vs-demand-decomposition",
        title: "The Inflation Decomposition Analysis",
        question:
          "How much of the inflation came from supply, how much from demand, and how much from expectations?",
        description:
          "Decompose observed inflation into supply-side and demand-side components using sectoral price data. The leading studies split: Bernanke and Blanchard attribute most of the 2021 surge to price shocks; di Giovanni and co-authors attribute about two-thirds of inflation to December 2019 to June 2022 to demand.",
        methodology:
          "Classify CPI components into supply-sensitive (energy, used cars, food commodities) and demand-sensitive (core services, shelter, recreation). Track timing: supply-sensitive categories should lead, demand-sensitive should follow if demand is secondary. Apply Shapley decomposition or Bernanke-Blanchard framework to attribute variance.",
        equation:
          "\\pi_t = \\pi^{supply}_t + \\pi^{demand}_t + \\pi^{expectations}_t + \\varepsilon_t",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Decompose price changes category by category, as the San Francisco Fed does when it splits inflation into supply- and demand-driven parts, repeat it with other teams' methods, and read it with survey measures of expected inflation to see if the shares agree.",
        },
        cost_to_verify:
          "$25K (econometric modeling with BLS microdata)",
        falsification: {
          supporter_flip:
            "If a sectoral breakdown showed 'supercore' services inflation tracking energy and shipping costs one-for-one rather than running hot on its own, and the fall from 9.1% to about 3% came without any labor-market loosening, supply shocks would look like the main driver rather than demand.",
          skeptic_flip:
            "If decompositions confirmed supercore inflation peaking near a 6.8% annualized rate in categories insulated from factory and shipping bottlenecks, and demand shocks explaining most inflation across methods, demand would look like the larger driver.",
          common_ground:
            "Commodity prices and shipping costs spiked in 2021 and had largely normalized by 2022 while inflation persisted; and tight labor markets mattered more for how long inflation lasted than for how it started.",
          live_disagreement:
            "What share of the inflation to attribute to supply, demand and expectations, which depends on how borderline categories such as used cars and shelter are classified and when supply effects are dated to end.",
        },
      },
      evidence: [
        {
          id: "bernanke-blanchard-decomposition",
          title: "Bernanke & Blanchard 2023: most of the 2021 surge came from price shocks, not an overheated labor market",
          description:
            "Bernanke and Blanchard found that most of the 2021 inflation surge came from shocks to prices given wages, commodity price spikes and sector-specific supply and demand-composition shocks, rather than an overheated labor market. They project that as those shocks fade, labor-market tightness becomes the more persistent driver requiring restrictive policy.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Bernanke & Blanchard, \"What Caused the U.S. Pandemic-Era Inflation?\", NBER Working Paper 31417 (2023)",
          sourceUrl: "https://www.nber.org/papers/w31417",
          reasoning:
            "An authoritative analysis by two leading macroeconomists. Its framework does not separate fiscal stimulus as its own cause, and part of what it calls sectoral shocks was a shift in demand toward goods, which the other side counts as demand.",
        },
        {
          id: "nyfed-demand-two-thirds",
          title:
            "New York Fed 2023: demand shocks explain about two-thirds of US inflation from December 2019 to June 2022, half or more of that from fiscal stimulus",
          description:
            "Building on Baqaee and Farhi's production-network model, di Giovanni, Kalemli-Özcan, Silva and Yildirim quantify fiscal policy's contribution to US inflation from December 2019 to June 2022. Their calibrations show aggregate demand shocks explain roughly two-thirds of model-based inflation, and fiscal stimulus contributed half or more of the total aggregate demand effect.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source:
            "di Giovanni, Kalemli-Özcan, Silva & Yildirim, 'Quantifying the Inflationary Impact of Fiscal Stimulus under Supply Constraints,' Federal Reserve Bank of New York Staff Report 1050 (February 2023)",
          sourceUrl: "https://econpapers.repec.org/RePEc:fip:fednsr:95590",
          reasoning:
            "A model-based split by Federal Reserve and academic economists that directly answers this crux. Its shares depend on the model's calibration; the authors' companion paper (Staff Report 1080) finds supply shocks to labor and inputs started the inflation in 2020-21, which the other side cites.",
        },
        {
          id: "shipping-costs-spike",
          title: "Shipping a 40-foot container rose from about $1,500 to $10,377 at the September 2021 peak (Drewry)",
          description:
            "The Drewry World Container Index surged from roughly $1,500 pre-pandemic to a peak of about $10,377 per 40-foot container in September 2021, reflecting severe supply chain disruption.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source: "Drewry Supply Chain Advisors — World Container Index",
          sourceUrl: "https://www.drewry.co.uk/supply-chain-advisors/supply-chain-expertise/world-container-index-assessed-by-drewry",
          reasoning:
            "Direct evidence of supply-side cost pressure. Shipping costs normalized by mid-2022 while inflation persisted, which limits what it explains about the later inflation.",
        },
        {
          id: "core-services-inflation",
          title: "'Supercore' services inflation ran near a 6.8% annualized pace in 2022, in categories shipping barely touches",
          description:
            "Core services excluding housing ('supercore') inflation ran near 6-7% during 2022, with a 3-month annualized peak around 6.8% in mid-2022, in a category largely insulated from global supply chain disruptions.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "BLS CPI (services less rent of shelter); analysis in CEA / Brookings commentary",
          sourceUrl: "https://www.bls.gov/cpi/",
          reasoning:
            "BLS does not publish an official 'supercore' index; the figure is built from CPI components. Services prices are hard to blame on shipping or factories, which points to demand and tight labor markets.",
        },
        {
          id: "inflation-fell-without-recession",
          title: "Inflation fell from 9.1% in June 2022 to about 3% by mid-2023 without a recession",
          description:
            "Headline CPI inflation fell from its 9.1% year-over-year peak in June 2022 to about 3% by mid-2023 without a significant rise in unemployment.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 6,
          },
          source: "BLS Consumer Price Index (news releases) and Employment Situation",
          sourceUrl: "https://www.bls.gov/cpi/",
          reasoning:
            "A demand-driven inflation usually takes labor-market slack to cure, so a painless fall suggests supply healing did much of the work. The Fed was raising rates fast at the same time, which the other side credits.",
        },
      ],
    },
    {
      id: "central-bank-response",
      title: "Did the Fed wait too long?",
      short_summary:
        "The Fed called inflation 'transitory', kept rates near zero and kept buying bonds into March 2022, when CPI inflation was above 7%. Then it ran the fastest tightening in 40 years and inflation fell without a recession. Whether starting earlier would have cut the peak cheaply is a counterfactual no one can rerun.",
      image_url:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=60",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "The Fed's 'transitory' framing was a reasonable real-time assessment, not a failure. In mid-2021 inflation was concentrated in reopening-sensitive categories, used cars, airfares and hotels, that were expected to normalize. The Fed had a dual mandate and could not risk tightening early enough to derail the jobs recovery. Once inflation broadened, it pivoted to the fastest rate-raising cycle in 40 years. Inflation fell from 9.1% to about 3% while unemployment stayed near 4%, and long-run inflation expectations stayed anchored. A 2021 tightening might have caused a recession that never had to happen.",
      proponent_rebuttal:
        "The Fed kept rates at zero and was still buying $120 billion a month in assets into early 2022, ending purchases only in March 2022 with CPI above 7%. The 'transitory' label hardened into groupthink that delayed action by six to nine months, and the Fed then had to compress an extraordinary tightening into a short window, from 0-0.25% in March 2022 to 5.25-5.50% by mid-2023. Larry Summers warned in February 2021 that the $1.9 trillion American Rescue Plan risked inflationary pressures 'of a kind we have not seen in a generation', and standard Taylor Rule benchmarks implied liftoff in 2021. The lasting cost is in the price level: inflation came down, but prices did not, and they are about 30% above February 2020.",
      crux: {
        id: "counterfactual-early-tightening",
        title: "The Counterfactual Early-Tightening Test",
        question:
          "Would earlier central-bank tightening have lowered peak inflation without a recession?",
        description:
          "Model what would have happened if the Fed had begun tightening in Q3 2021 instead of Q1 2022.",
        methodology:
          "Run DSGE (Dynamic Stochastic General Equilibrium) model with actual economic conditions. Simulate counterfactual where Fed funds rate rises beginning July 2021 per Taylor Rule. Compare projected inflation path, unemployment, and GDP against actual outcomes.",
        equation:
          "r^*_t = r^{neutral} + 0.5(\\pi_t - \\pi^*) + 0.5(y_t - y^*_t)",
        verification_status: "impossible" as const,
        settle: {
          condition:
            "No test can rerun 2021 with an earlier Fed; evidence can only narrow it. DSGE simulations of tightening from July 2021 under the Taylor Rule, compared with the actual paths of inflation, unemployment and GDP.",
        },
        cost_to_verify:
          "$100K (DSGE modeling with full macroeconomic dataset)",
        falsification: {
          supporter_flip:
            "If DSGE counterfactuals robustly found that Q3 2021 tightening would have caused a recession with little inflation benefit, because much of the surge came from supply shocks monetary policy cannot offset, the Fed's late start would look defensible rather than costly.",
          skeptic_flip:
            "If Taylor Rule counterfactuals confirmed that liftoff was due in 2021 rather than March 2022, while zero rates and $120B a month in asset buying ran into early 2022 with CPI above 7%, the 'transitory' framing would be hard to defend against Summers's February 2021 overheating warning.",
          common_ground:
            "The Fed ran its fastest tightening in 40 years (0-0.25% to 5.25-5.50%), long-term inflation expectations stayed broadly anchored, and inflation fell with unemployment near 4%.",
          live_disagreement:
            "Whether tightening in 2021 would have cut peak inflation without a recession, a counterfactual that simulation can only approximate.",
        },
      },
      evidence: [
        {
          id: "summers-warning-2021",
          title: "Larry Summers warned in February 2021 that the $1.9 trillion stimulus risked a generational inflation",
          description:
            'In a 4 February 2021 Washington Post op-ed, Lawrence Summers warned that the $1.9 trillion American Rescue Plan was several times larger than the estimated output gap and risked "inflationary pressures of a kind we have not seen in a generation."',
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 5,
            directness: 5,
          },
          source: 'Lawrence H. Summers, "The Biden stimulus is admirably ambitious, but it brings some big risks, too," The Washington Post, Feb. 4, 2021',
          sourceUrl: "https://www.washingtonpost.com/opinions/2021/02/04/larry-summers-biden-covid-stimulus/",
          reasoning:
            "A credible warning that proved right on direction. It is a forecast, not evidence of cause; one correct prediction does not show the stimulus was the main driver.",
        },
        {
          id: "taylor-rule-divergence",
          title: "Standard Taylor Rules called for rate increases in 2021 while the Fed held at zero (Atlanta Fed)",
          description:
            "Standard Taylor Rule specifications imply the fed funds rate should have been materially positive, commonly estimated in the low single digits, by late 2021, while the actual rate remained at 0-0.25%. Exact prescriptions vary with the chosen inflation gauge and inputs.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "Federal Reserve Bank of Atlanta — Taylor Rule Utility (Center for Quantitative Economic Research)",
          sourceUrl: "https://www.atlantafed.org/cqer/research/taylor-rule",
          reasoning:
            "A rule-based benchmark showing the Fed departed from standard prescriptions. The exact should-have-been rate depends on which rule and inflation measure are used.",
        },
        {
          id: "soft-landing-achieved",
          title: "The Fed brought inflation down to about 3% by mid-2023 with unemployment near 4%",
          description:
            "Headline CPI inflation fell from its 9.1% peak in June 2022 toward about 3% by mid-2023 without a recession, while the unemployment rate stayed near or below 4%.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 6,
          },
          source: "BLS Consumer Price Index and Employment Situation",
          sourceUrl: "https://www.bls.gov/cpi/",
          reasoning:
            "A good outcome weakens claims that the late start did lasting damage, though it cannot show what an earlier start would have done.",
        },
        {
          id: "inflation-expectations-anchored",
          title: "Ten-year market inflation expectations peaked near 3% in April 2022 and settled back to about 2.3-2.5%",
          description:
            "Despite the surge, market-implied long-term expectations stayed broadly anchored: the 10-year breakeven (FRED T10YIE) briefly peaked around 3% in April 2022 and settled back toward about 2.3-2.5%.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 5,
          },
          source: "FRED — 10-Year Breakeven Inflation Rate (T10YIE), Federal Reserve Bank of St. Louis",
          sourceUrl: "https://fred.stlouisfed.org/series/T10YIE",
          reasoning:
            "Anchored expectations suggest the delay did not wreck the Fed's credibility; they do not show the delay was costless.",
        },
      ],
    },
    {
      id: "the-2026-shock",
      title: "The 2026 test",
      short_summary:
        "Inflation is back above 3%. Energy prices rose 20.4% in the year to September 2026 while core inflation was 2.6%, and the Fed, under its new chair Kevin Warsh, raised rates in September and held in October with two officials wanting another increase. The 2021 fight is being rerun in real time: is this a supply shock to look through, or the start of inflation that spreads?",
      icon_name: "Target" as const,
      skeptic_premise:
        "This is the supply story again, and the data say so. Headline inflation is 3.7% because energy prices jumped 20.4%; strip out food and energy and inflation is 2.6%, with food at home up only 1.8%. Interest rates cannot pump more oil or reopen shipping lanes; raising them into an energy shock slows hiring and investment while leaving the cause untouched. The lesson of 2022 is that supply shocks fade on their own. A central bank that tightens into one risks the recession the soft landing avoided.",
      proponent_rebuttal:
        "The lesson of 2021 is that waiting is what lets a price shock spread. Consumer prices have risen faster than 2% a year in every month since March 2021, so households and firms have learned to expect increases, and an energy shock is more likely to feed into fares, freight and wages than it was in 2021. Core inflation of 2.6% is above target, not at it. The committee raised rates 12-0 in September to support what it called 'a timelier return' to 2%, and two members wanted another increase in October. Acting early, while expectations hold, is cheaper than the catch-up of 2022.",
      crux: {
        id: "look-through-or-tighten",
        title: "The Second-Shock Test",
        question:
          "Should the Fed raise rates into the 2026 energy shock, or look through it?",
        description:
          "When energy prices jump, a central bank can treat it as a one-time shift in relative prices and wait, or tighten to stop it spreading into wages and other prices. The answer turns on whether core inflation and inflation expectations rise in the months after an energy spike, and on how much a recession risk is worth to avoid. The 2026 episode is a live test of what was learned in 2021.",
        methodology:
          "Track core CPI and PCE, services inflation excluding energy, wage growth, and survey and market measures of expected inflation (University of Michigan, New York Fed Survey of Consumer Expectations, 5-year breakevens) for the 12 months after the 2026 energy spike. Compare with the pass-through of the 2021-22 energy shock and of earlier oil shocks.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Monthly core CPI and PCE, services prices excluding energy, wage growth and expected-inflation surveys over the 12 months after the 2026 energy spike: whether they climb as energy feeds through or stay flat as the spike fades, set against the pass-through of the 2021-22 energy shock.",
        },
        cost_to_verify: "$0 (BLS, BEA and Federal Reserve data are public monthly)",
        falsification: {
          supporter_flip:
            "If core inflation and expected inflation stayed flat through 2027 while energy prices fell back, the case for raising rates into the shock would weaken.",
          skeptic_flip:
            "If core inflation and wage growth climbed in the months after the energy spike, and expected inflation rose with them, looking through the shock would look like 2021's mistake repeated.",
          common_ground:
            "Headline inflation rose to 3.7% in the year to September 2026 mainly on energy, which was up 20.4%, while core inflation was 2.6%; the Fed raised rates in September and held in October.",
          live_disagreement:
            "Whether an energy shock after five years of above-target inflation will spread into other prices and wages, and so whether tightening now is prudence or a repeat of the wrong lesson.",
        },
      },
      evidence: [
        {
          id: "cpi-september-2026",
          title:
            "September 2026: consumer prices up 3.7% over the year, energy up 20.4%, core 2.6%, food at home 1.8% (BLS)",
          description:
            "The all-items consumer price index rose 3.7% in the 12 months to September 2026 before seasonal adjustment, and 0.6% in September alone. Energy prices rose 20.4% over the year. Prices excluding food and energy rose 2.6%, shelter 3.2% and food at home 1.8%. The index stood at 336.940, 30% above February 2020.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 6,
          },
          source: "BLS, Consumer Price Index — September 2026 (released 14 October 2026)",
          sourceUrl: "https://www.bls.gov/news.release/cpi.nr0.htm",
          reasoning:
            "Official data showing the 2026 rise is concentrated in energy, which favors the supply reading of this episode. Core at 2.6% is still above the 2% goal, which is the other side's point.",
        },
        {
          id: "fed-hike-september-2026",
          title:
            "The Fed raised rates to 3.75-4% in September 2026 (12-0) and held in October, with two officials wanting another increase",
          description:
            "On 16 September 2026 the Federal Open Market Committee voted 12-0 to raise the target range by a quarter point to 3-3/4 to 4 percent, saying 'Inflation remains elevated' and that the move would 'support a timelier return to the Committee's 2 percent goal.' On 28 October it held the range by a 10-2 vote; Lisa Cook and Beth Hammack preferred another quarter-point increase. Kevin Warsh succeeded Jerome Powell as chair on 22 May 2026.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 7,
            replicability: 9,
            directness: 4,
          },
          source: "Federal Reserve, FOMC statements of 16 September and 28 October 2026",
          sourceUrl: "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm",
          reasoning:
            "Shows the Fed's own judgment that inflation is not just energy. It is a decision, not evidence of what causes inflation, so directness is low.",
        },
      ],
    },
  ],
};
