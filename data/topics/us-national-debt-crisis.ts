// Treasury's Monthly Treasury Statement, Table 9 (receipts and outlays by
// function), fiscal year 2026 to 30 September, from the Fiscal Data API.
const MTS_FY2026 =
  "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v1/accounting/mts/mts_table_9?filter=record_date:eq:2026-09-30&fields=classification_desc,current_fytd_rcpt_outly_amt,prior_fytd_rcpt_outly_amt&page[size]=60";

export const usNationalDebtCrisisData = {
  id: "us-national-debt-crisis",
  title: "Is the US National Debt a Ticking Time Bomb?",
  question:
    "Will the US national debt cause a fiscal crisis within a generation?",
  aliases: [
    "Is the national debt a ticking time bomb?",
    "Can the US keep borrowing?",
    "Interest on the debt now costs more than defense",
    "Will the US default on its debt?",
  ],
  meta_claim:
    "The US national debt, now above $40 trillion, is on a path that risks a genuine fiscal crisis within a generation, rather than a burden a sovereign issuer of the world's reserve currency can carry indefinitely.",
  status: "contested" as const,
  category: "economics" as const,
  // As of 3 November 2026: total public debt $40.50 trillion, $32.72 trillion
  // held by the public (Treasury, 2 Nov 2026). FY2026 (to 30 Sep): deficit
  // about $2.0 trillion, net interest $1,051.8 billion, national defense
  // $965.2 billion. Average interest rate on the debt 3.531% (Sep 2026);
  // 10-year Treasury 4.91% (2 Nov). The Supreme Court struck down the IEEPA
  // tariffs on 20 Feb 2026; refunds followed. Moody's cut the US to Aa1 on
  // 16 May 2025.
  last_updated: "2026-11-03",
  keystone_fact: {
    statement:
      "In fiscal 2026 the federal government paid $1.05 trillion in net interest on its debt: more than it spent on national defense ($965 billion), and nearly one dollar in five of the $5.4 trillion it collected. On 2 November 2026 it owed $40.5 trillion, $32.7 trillion of it to the public. Under current law, the Congressional Budget Office projects that debt will pass its World War II record by 2030. The fight is over whether that path ends in a crisis or can be carried.",
    confidence: 90,
    source:
      "US Treasury, Monthly Treasury Statement (FY2026) and Debt to the Penny (2 Nov 2026), via Fiscal Data; CBO's February 2026 outlook as summarized by CRFB",
    sourceUrl: MTS_FY2026,
  },
  simple_case: [
    "Both sides accept that no single debt-to-GDP number triggers a crisis, that interest now costs more than the military, and that under current law the debt keeps rising faster than the economy.",
    "They split over four things: whether the government's borrowing rate stays below the economy's growth rate; whether interest keeps compounding as old debt rolls over at today's higher rates; whether the dollar's role as the world's reserve currency can erode suddenly; and who should pay to close the gap.",
  ],
  imageUrl:
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "CRFB: Analysis of CBO's February 2026 Budget and Economic Outlook",
      url: "https://www.crfb.org/papers/cbos-february-2026-budget-and-economic-outlook",
    },
    {
      title: "US Treasury Fiscal Data: Debt to the Penny",
      url: "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?sort=-record_date&page[size]=1",
    },
    {
      title: "CRFB: CBO releases February 2026 Budget and Economic Outlook (deficits of $1.8 trillion in 2025 and $3.1 trillion in 2036)",
      url: "https://www.crfb.org/blogs/cbo-releases-february-2026-budget-and-economic-outlook",
    },
    {
      title: "CBO: The Long-Term Budget Outlook: 2025 to 2055 (March 2025)",
      url: "https://www.cbo.gov/publication/61270",
    },
    {
      title:
        "Blanchard, O. — Public Debt and Low Interest Rates, American Economic Review (2019)",
      url: "https://www.aeaweb.org/articles?id=10.1257/aer.109.4.1197",
    },
    {
      title: "CRFB: CBO estimates $2.0 trillion deficit for fiscal year 2026 (8 October 2026)",
      url: "https://www.crfb.org/press-releases/cbo-estimates-20-trillion-deficit-fiscal-year-2026",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Can the US actually default on its debt?",
      content:
        "The US borrows in its own currency and the Federal Reserve can always create dollars, so a forced default of the Greek kind is not the risk most economists worry about. The risks are a political default through debt-ceiling brinkmanship, and a slow squeeze in which interest crowds out everything else or inflation does the work a default would.",
      imageUrl:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=60",
      references: [
        {
          title: "CBO: Federal Debt and the Statutory Limit",
          url: "https://www.cbo.gov/topics/budget/federal-debt",
        },
      ],
    },
    {
      id: "q2",
      title: "Why hasn't the debt caused a crisis yet?",
      content:
        "Debt hawks have warned of a US fiscal crisis for decades, and demand for Treasuries has stayed strong. But the 10-year Treasury yield stood at 4.91% on 2 November 2026, above the 4.1% CBO assumed for 2026, and Moody's took away the last AAA rating in May 2025. Are the pessimists early, or wrong?",
      imageUrl:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "q3",
      title: "Is inflation the hidden default mechanism?",
      content:
        "Japan's gross debt has fallen from about 229% of GDP in 2020 to a projected 199% in 2026 as prices and nominal incomes rose. Could the US shrink its real debt burden the same way, and who would pay: bondholders, savers, or everyone at the checkout?",
      imageUrl:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=60",
    },
  ],
  pillars: [
    {
      id: "debt-to-gdp-trajectory",
      title: "How big, how fast",
      short_summary:
        "Debt held by the public was 99% of GDP at the end of fiscal 2025, and CBO projects 120% by 2036, past the 106% record set after World War II. Japan carries far more without a crisis. What decides whether a debt ratio stabilizes is the interest rate the government pays against the growth rate of the economy: r against g.",
      image_url:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=60",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Japan has maintained gross debt-to-GDP above 200% for more than a decade without a crisis, and its ratio is now falling, from about 229% in 2020 to a projected 199% in 2026, as nominal growth picked up. The most cited danger line, Reinhart and Rogoff's growth cliff above 90%, did not survive a check of their spreadsheet: corrected, average growth above 90% was 2.2%, not -0.1%. What matters is r against g. In September 2026 the average interest rate on US debt was 3.53%, while nominal GDP grew 5.9% over the year to the third quarter. When the rate stays below growth, the debt ratio can level off even with modest deficits. CBO's projections assume Congress never changes current law, and Congress changes it constantly.",
      proponent_rebuttal:
        "The trend is the problem, not any single number. The government borrowed $2.0 trillion in fiscal 2026 with no war and no recession, which CRFB's president called the highest deficit ever outside of one. CBO's February 2026 baseline has debt held by the public passing the post-war record by 2030 and reaching 120% of GDP, over $56 trillion, by 2036, with deficits of $3.1 trillion a year by then. Spending on Social Security and health care grows on autopilot; revenue does not keep up. Today's r below g rests on old cheap debt: the 10-year Treasury yield was 4.91% on 2 November 2026, and each year more of the debt rolls over at rates like that. Japan finances itself from domestic savers and a central bank that bought much of its debt; the US relies on foreign and market buyers who can demand more.",
      crux: {
        id: "r-vs-g-sustainability",
        title: "The r vs g Sustainability Test",
        question:
          "Can the US keep its borrowing rate below its growth rate over decades?",
        description:
          "Compare the effective interest rate on government debt (r) against nominal GDP growth (g) to determine whether the debt ratio will stabilize, shrink, or explode over time. In September 2026 the effective rate was 3.53% and nominal growth over the year 5.9%, but the rate on new 10-year debt was 4.91%, so the question is where the effective rate settles as the debt rolls over.",
        methodology:
          "Calculate the weighted average interest rate on outstanding US Treasury securities. Compare against 10-year trailing and projected nominal GDP growth. When r < g, primary deficits can be sustained without debt-to-GDP rising. When r > g, even a balanced primary budget leads to rising debt ratios. Model under multiple interest rate and growth scenarios.",
        equation:
          "\\Delta\\left(\\frac{D}{Y}\\right) = (r - g) \\cdot \\frac{D}{Y} + \\text{primary\\_deficit}",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Track the average interest rate the Treasury pays on its debt against nominal GDP growth each year, from Treasury and CBO data, and compare with long historical records of how long such gaps lasted in the US and other rich countries.",
        },
        cost_to_verify: "$0 (publicly available CBO/Treasury data)",
        falsification: {
          supporter_flip:
            "If the average rate on Treasury debt stayed below nominal growth for a decade as the debt rolled over, letting the debt ratio level off despite deficits, the case that the path ends in crisis would weaken.",
          skeptic_flip:
            "If the average rate on the debt rose above nominal growth as old debt rolled over, and the debt ratio kept climbing even in good years, the comfort drawn from r below g and from Japan would fade.",
          common_ground:
            "No single debt-to-GDP number triggers a crisis; the gap between the government's interest rate and the economy's growth rate matters most; and under current law the debt ratio keeps rising.",
          live_disagreement:
            "Whether the US can keep its effective borrowing rate below its growth rate over decades as cheap old debt is replaced by debt at today's rates.",
        },
      },
      evidence: [
        {
          id: "cbo-projection-unsustainable",
          title:
            "CBO February 2026: debt held by the public passes its post-war record by 2030 and reaches 120% of GDP by 2036",
          description:
            "In its February 2026 Budget and Economic Outlook, the Congressional Budget Office projects that under current law debt held by the public, 99% of GDP at the end of fiscal 2025, will surpass the 106% record set after World War II by fiscal 2030 and reach 120% of GDP, over $56 trillion, by 2036. Deficits grow from $1.8 trillion (5.8% of GDP) in 2025 to $3.1 trillion (6.7%) in 2036.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "CBO, The Budget and Economic Outlook: 2026 to 2036 (February 2026), as summarized by the Committee for a Responsible Federal Budget (analysis and 11 February 2026 blog)",
          sourceUrl:
            "https://www.crfb.org/papers/cbos-february-2026-budget-and-economic-outlook",
          reasoning:
            "CBO is nonpartisan and its baseline is the standard reference. A baseline assumes current law holds, including tariffs the Supreme Court later struck down; it is a projection, not a forecast of what Congress will do.",
        },
        {
          id: "structural-deficit-persistent",
          title:
            "FY2026: a $2.0 trillion deficit with no war or recession, $218 billion more than the year before",
          description:
            "CBO estimates the government borrowed $2.0 trillion in fiscal 2026, which ended on 30 September. Spending rose $386 billion (6%) to $7.4 trillion; revenue rose $169 billion (3%) to $5.4 trillion; interest payments rose $115 billion (11%). CRFB's president, Maya MacGuineas, said the deficit 'ranks among the highest deficits in our history – and the highest ever outside of a war or recession.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 9,
            directness: 7,
          },
          source:
            "American Action Forum, 'CBO: FY 2026 Budget Deficit Totaled $2 Trillion' (8 October 2026); CRFB press release (8 October 2026)",
          sourceUrl:
            "https://www.americanactionforum.org/insight/cbo-fy-2026-budget-deficit-totaled-2-trillion/",
          reasoning:
            "Hard budget data. A large deficit in a growing economy is the clearest sign the gap is built into tax and spending law rather than the business cycle. It does not by itself show a crisis is coming.",
        },
        {
          id: "r-below-g-2026",
          title:
            "September 2026: the average rate on US debt was 3.53%, while nominal GDP grew 5.9% over the year",
          description:
            "Treasury's average interest rate on all interest-bearing debt was 3.531% at the end of September 2026, up from 1.565% at the end of 2021. Nominal GDP was $33.01 trillion (annual rate) in the third quarter of 2026, 5.9% above a year earlier. With the rate on the debt below the economy's growth rate, interest alone does not raise the debt ratio; the primary deficit does.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source:
            "US Treasury Fiscal Data, Average Interest Rates on US Treasury Securities; BEA nominal GDP via FRED",
          sourceUrl:
            "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates?sort=-record_date&filter=security_desc:eq:Total%20Interest-bearing%20Debt&page[size]=3",
          reasoning:
            "Official data, and the comparison that decides the debt arithmetic. Nominal growth was lifted by inflation in 2026, and the average rate is still rising toward the 4-5% the market charges for new debt, so one year's gap says little about the next decade.",
        },
        {
          id: "japan-high-debt-no-crisis",
          title:
            "Japan: gross debt above 200% of GDP for over a decade with no crisis, now falling to a projected 199% in 2026 (IMF)",
          description:
            "IMF World Economic Outlook data put Japan's general government gross debt above 200% of GDP every year from 2013 to 2025, peaking at 228.8% in 2020 and 228.0% in 2022, without a debt crisis or loss of market access. With inflation and nominal growth returning, the IMF projects 199.4% in 2026. On the same measure the US was 122.3% in 2024, projected to reach 145.0% by 2031.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source:
            "IMF World Economic Outlook database, general government gross debt (GGXWDG_NGDP), Japan and United States",
          sourceUrl:
            "https://www.imf.org/external/datamapper/api/v1/GGXWDG_NGDP/JPN/USA",
          reasoning:
            "Directly rebuts a fixed danger threshold. Japan's debt is held mostly at home and much of it by its central bank, and it runs current-account surpluses, so the lesson for the US is limited. An earlier version of this card cited figures above 250% that the IMF has since revised.",
        },
        {
          id: "reinhart-rogoff-debunked",
          title:
            "Corrected, Reinhart and Rogoff's data show 2.2% average growth above 90% debt-to-GDP, not -0.1% (Herndon, Ash & Pollin 2014)",
          description:
            "Reinhart and Rogoff's influential claim that growth collapses above 90% debt-to-GDP was substantially undermined by Herndon, Ash, and Pollin (2014), who identified a spreadsheet coding error, selective data exclusion, and unconventional weighting. Correcting these, average growth for countries above 90% debt-to-GDP was 2.2%, not the -0.1% Reinhart-Rogoff reported, eliminating the sharp cliff while still showing a modest negative correlation between debt and growth.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 5,
          },
          source:
            "Herndon, T., Ash, M., & Pollin, R. — 'Does High Public Debt Consistently Stifle Economic Growth? A Critique of Reinhart and Rogoff', Cambridge Journal of Economics 38(2): 257-279 (2014)",
          sourceUrl: "https://academic.oup.com/cje/article-abstract/38/2/257/1714018",
          reasoning:
            "Removes the most cited empirical basis for a specific threshold. A modest negative link between debt and growth remains, and its direction of cause is disputed, so this rebuts the cliff rather than the broader worry.",
        },
      ],
    },
    {
      id: "interest-payment-spiral",
      title: "The interest bill",
      short_summary:
        "Net interest reached $1.05 trillion in fiscal 2026, more than defense and nearly one-fifth of revenue. The average rate on the debt has more than doubled since 2021 as cheap pandemic-era debt matures, and about a quarter of the debt rolls over each year. Whether the bill levels off or compounds depends on where rates settle.",
      image_url:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=60",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Nominal interest payments are misleading without context: what matters is interest measured against the size of the economy and against growth. Net interest of $1.05 trillion is about 3.2% of a $33 trillion economy, and about 70% of the debt held by the public is owned at home, so most of that interest moves money within the country rather than out of it. A currency-issuing government cannot be forced into involuntary default in its own currency, and Treasuries remain the safe asset the world runs to in a crisis. If a genuine spiral threatened, the Fed and Congress have tools. The real risk is a self-fulfilling loss of confidence, not arithmetic doom.",
      proponent_rebuttal:
        "The interest bill is the fastest-growing part of the budget, and it compounds. Net interest rose from $970 billion in fiscal 2025 to $1,052 billion in 2026, passing defense ($965 billion) and nearly matching Medicare ($1,073 billion). The average rate on the debt was 1.57% at the end of 2021 and 3.53% in September 2026; about $9 trillion matures each year and is refinanced at market rates, and the 10-year yield was 4.91% on 2 November, above the 4.1% CBO assumed for 2026. CBO projects interest at 4.6% of GDP, $2.1 trillion a year, by 2036. Each dollar of interest is borrowed, which adds to next year's interest. Moody's cited exactly this when it stripped the US of its last AAA rating in May 2025.",
      crux: {
        id: "interest-rate-rollover-risk",
        title: "The Debt Rollover Stress Test",
        question:
          "As existing debt rolls over at new rates, will interest costs stabilize or keep escalating?",
        description:
          "Model the trajectory of net interest costs as pandemic-era low-rate debt matures and is refinanced at current and projected market rates. The average rate on the debt rose from 1.57% at the end of 2021 to 3.53% in September 2026; new 10-year debt cost 4.91% on 2 November 2026.",
        methodology:
          "Map the maturity schedule of all outstanding Treasury securities. Model refinancing at projected yield curves (baseline, high-rate, and stress scenarios). Calculate net interest as a share of GDP and federal revenue under each scenario. Identify the threshold at which interest costs trigger automatic deficit escalation.",
        equation:
          "I_t = \\sum_{i} D_i \\cdot r_i(t) \\quad \\text{where } D_i \\text{ = principal of tranche } i, \\; r_i(t) \\text{ = rate at rollover}",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Net interest as a share of GDP and of federal revenue, reported each year by the Treasury as low-rate debt matures and is refinanced, compared with CBO's earlier projections to see if costs level off or keep climbing.",
        },
        cost_to_verify:
          "$0 (Treasury publishes full maturity schedule and auction results)",
        falsification: {
          supporter_flip:
            "If net interest leveled off near today's share of GDP as the debt repriced, because rates settled lower and the economy kept growing faster than the rate on the debt, the fear of an interest spiral would ease.",
          skeptic_flip:
            "If net interest kept rising toward CBO's 4.6% of GDP by 2036, or Treasury auctions began clearing only at rising risk premiums, the interest figures would be hard to wave away as a mere transfer.",
          common_ground:
            "Interest now costs more than defense, and what decides its path is the rate at which maturing debt is refinanced compared with growth, not the headline dollar figure.",
          live_disagreement:
            "Where short and long rates settle as the debt rolls over, and so whether interest levels off as a share of the economy or keeps compounding.",
        },
      },
      evidence: [
        {
          id: "interest-exceeds-defense",
          title:
            "FY2026: net interest $1,052 billion, more than national defense ($965 billion) and 19% of federal revenue (Treasury)",
          description:
            "Treasury's year-end statement for fiscal 2026 shows net interest outlays of $1,051.8 billion, up from $970.4 billion in fiscal 2025. National defense was $965.2 billion, Medicare $1,072.6 billion and Social Security $1,667.1 billion, out of $7,395.8 billion in total outlays. Receipts were about $5.4 trillion, so interest took about 19% of revenue.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 8,
          },
          source:
            "US Treasury, Monthly Treasury Statement Table 9, fiscal year to 30 September 2026, via Fiscal Data",
          sourceUrl: MTS_FY2026,
          reasoning:
            "The government's own accounts. They show the size of the bill and its growth; they do not show whether it will keep growing faster than the economy.",
        },
        {
          id: "cbo-interest-share-projection",
          title:
            "CBO February 2026: net interest rises from 3.2% of GDP ($970 billion) in 2025 to 4.6% ($2.1 trillion) by 2036",
          description:
            "CBO's February 2026 baseline projects net interest growing from a record 3.2% of GDP in 2025 to 4.6% of GDP, $2.1 trillion, by 2036. It assumes the 10-year Treasury yield rises from 4.1% in 2026 to 4.4% in 2031 and after; on 2 November 2026 the 10-year yield was 4.91%.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "CBO, The Budget and Economic Outlook: 2026 to 2036, as summarized by CRFB; FRED DGS10 for the 2 November 2026 yield",
          sourceUrl:
            "https://www.crfb.org/papers/cbos-february-2026-budget-and-economic-outlook",
          reasoning:
            "A credible projection whose rate assumption is already below the market. Ten-year projections of rates are uncertain in both directions.",
        },
        {
          id: "moodys-downgrade-2025",
          title:
            "Moody's cut the US from AAA to Aa1 in May 2025, citing rising interest payments and deficits",
          description:
            "On 16 May 2025 Moody's removed the last AAA rating the US held from a major agency. It said deficits would widen, 'driven mainly by increased interest payments on debt, rising entitlement spending, and relatively low revenue generation,' while noting the US 'retains exceptional credit strengths' including the dollar's role as global reserve currency.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "PBS NewsHour / Associated Press (16 May 2025)",
          sourceUrl:
            "https://www.pbs.org/newshour/economy/moodys-strips-u-s-government-of-top-credit-rating-over-failure-to-rein-in-debt",
          reasoning:
            "A rating agency's judgment, not a market event, and the same statement lists the strengths that keep the US borrowing cheaply.",
        },
        {
          id: "rollover-wave-coming",
          title: "About $9 trillion of Treasury debt matures and must be refinanced each year (GAO)",
          description:
            "About $9.2 trillion of Treasury debt, roughly a quarter of the total, matured and had to be refinanced in fiscal year 2025, with a similar ~$9.7 trillion due in FY2026. Much of this is short-term bills rolled continuously, so it reprices quickly at prevailing rates; the share locked in at near-zero pandemic-era rates is a smaller subset.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source:
            "GAO, 'Federal Debt Management' (GAO-26-107529); US Treasury auction data",
          sourceUrl: "https://www.gao.gov/products/gao-26-107529",
          reasoning:
            "The maturity wall is real and large, but mostly short-dated bills rolled routinely, so the cost depends on where short rates settle rather than on a one-time repricing.",
        },
        {
          id: "real-rates-historically-low",
          title:
            "Rachel & Summers 2019: the neutral real interest rate in rich countries fell by at least 3 points over a generation",
          description:
            "Rachel and Summers estimate the neutral real rate in the industrial world has fallen by at least 300 basis points over a generation, driven by demographics and a global savings glut, and argue it would be significantly negative absent expansionary fiscal policy. If those forces persist, the rates the government pays will come back down as the post-2022 shock fades.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source:
            "Rachel, Ł. & Summers, L.H. — 'On Falling Neutral Real Rates, Fiscal Policy, and the Risk of Secular Stagnation', Brookings Papers on Economic Activity (Spring 2019)",
          sourceUrl:
            "https://www.brookings.edu/articles/on-falling-neutral-real-rates-fiscal-policy-and-the-risk-of-secular-stagnation/",
          reasoning:
            "A serious thesis written before rates rose in 2022. Ten-year yields near 5% in late 2026 cut against it, so it reads as an argument about the long run rather than the present.",
        },
      ],
    },
    {
      id: "reserve-currency-privilege",
      title: "The dollar's privilege",
      short_summary:
        "The world holds dollars, so it buys Treasuries, which lets the US borrow more cheaply than its numbers alone would allow. The dollar's share of global reserves has drifted down from about 70% in 2000 to 56.7% in mid-2026, but the euro, at 20.6%, is the only rival of any size.",
      image_url:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Reports of the dollar's demise have been greatly exaggerated for decades. Its share of global reserves has slipped slowly, to 56.7% in the second quarter of 2026, but the euro holds 20.6% and the renminbi 2.1%. The euro has no single treasury behind it, and the yuan is not freely convertible. The dollar's role rests on deep markets, the rule of law, network effects and the lack of any asset that can absorb the world's savings at comparable scale. BRICS announcements have produced little actual displacement of dollar flows. Even in a world of several currencies, the dollar would likely remain first among them, and its privilege would fade slowly enough for policy to adjust.",
      proponent_rebuttal:
        "The privilege is what has let the US run deficits other countries could not, and it breeds complacency. It is not permanent: the dollar's share has fallen from about 70% to under 57%, foreign holders own a smaller share of US debt than a decade ago, and China has cut its Treasury holdings by over 40% from their peak. Sanctions use, debt-ceiling standoffs and a credit downgrade give reserve managers reasons to diversify, and network effects that took decades to build can unwind quickly once a tipping point is passed. If foreign demand for Treasuries fell sharply, borrowing costs would rise just as the debt is largest.",
      crux: {
        id: "reserve-currency-erosion-rate",
        title: "The Dollar Dominance Trajectory Test",
        question:
          "Is the dollar's erosion a slow, self-limiting drift, or could it tip suddenly past a confidence threshold?",
        description:
          "Track the rate of change in the dollar's share of global reserves, cross-border payments, and commodity pricing to determine whether erosion is accelerating or stabilizing.",
        methodology:
          "Compile quarterly data from IMF COFER (Currency Composition of Official Foreign Exchange Reserves), SWIFT cross-border payment statistics, and commodity contract denomination. Calculate the trendline and acceleration/deceleration of dollar share. Model scenarios for US debt pricing if dollar reserve share declines to 40% vs current ~57%.",
        equation:
          "\\frac{d}{dt}\\left(\\frac{\\text{USD reserves}}{\\text{Total reserves}}\\right) = \\text{trend rate of erosion}",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Quarterly data on the dollar's share of central-bank reserves from the IMF's COFER survey, of SWIFT payments and of trade invoicing, checked for steady drift or sudden drops after shocks such as sanctions or debt-ceiling standoffs.",
        },
        cost_to_verify:
          "$0 (IMF COFER and SWIFT data are publicly available quarterly)",
        falsification: {
          supporter_flip:
            "If the dollar held near 57% of reserves against the euro's 21%, Treasury market depth stayed unmatched, and alternatives such as mBridge stayed small, de-dollarization would look like intent without displacement.",
          skeptic_flip:
            "If COFER, SWIFT and commodity-pricing data showed the dollar's share falling at an accelerating rate, and a deep, liquid alternative began absorbing meaningful global savings, enduring dollar privilege would be hard to count on.",
          common_ground:
            "The dollar's reserve share has drifted down slowly from about 70% in 2000 to about 57%, and no rival currently offers comparable depth, liquidity and safety at the scale global reserves require.",
          live_disagreement:
            "Whether dollar erosion is a slow, self-limiting drift or could tip suddenly past a confidence threshold, which only the realized trajectory across reserves, payments and commodity pricing can reveal.",
        },
      },
      evidence: [
        {
          id: "dollar-share-still-dominant",
          title:
            "IMF, Q2 2026: the dollar is 56.7% of global reserves, the euro 20.6%, the renminbi 2.1%",
          description:
            "The IMF's currency composition survey (COFER) for the second quarter of 2026 put the dollar's share of global foreign exchange reserves at 56.70%, down from 57.18% the quarter before, as holdings of the euro and several other currencies rose. The euro's share rose to 20.60% and the renminbi's to 2.11%. Total reserves were $13.22 trillion. Exchange-rate effects were limited.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source: "IMF Data Brief on COFER, 30 September 2026",
          sourceUrl: "https://data.imf.org/en/news/imf%20data%20brief%20september%2030",
          reasoning:
            "Official data showing the dollar still holds nearly three times the euro's share. The quarter's decline came from reallocation rather than currency moves, so the slow drift continues.",
        },
        {
          id: "no-credible-alternative",
          title: "No other sovereign bond market matches the $28-30 trillion Treasury market (Federal Reserve)",
          description:
            "The US Treasury market is the deepest and most liquid sovereign bond market in the world, with roughly $28 trillion in marketable debt outstanding in 2024 and about $30 trillion by 2025. No other market comes close in the volume, depth, and safety that global reserve managers require.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source:
            "Federal Reserve, 'The International Role of the U.S. Dollar – 2025 Edition' (FEDS Notes)",
          sourceUrl:
            "https://www.federalreserve.gov/econres/notes/feds-notes/the-international-role-of-the-u-s-dollar-2025-edition-20250718.html",
          reasoning:
            "A structural advantage that is hard to copy, though network effects can unravel non-linearly.",
        },
        {
          id: "brics-dedollarization-efforts",
          title: "BRICS members are building alternatives to dollar settlement, so far at small scale",
          description:
            "China, Russia, and other BRICS members are building bilateral local-currency trade settlement, yuan-denominated oil and commodity arrangements, and the mBridge cross-border CBDC platform (China, Hong Kong, Thailand, UAE, with the BIS) to reduce dollar dependency.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 4,
          },
          source: "Atlantic Council, Dollar Dominance Monitor",
          sourceUrl:
            "https://www.atlanticcouncil.org/programs/geoeconomics-center/dollar-dominance-monitor/",
          reasoning:
            "Shows intent and infrastructure, but transaction volumes remain small relative to dollar flows (mBridge cumulative volume was only about $55 billion by late 2025). A signal of direction, not displacement.",
        },
        {
          id: "foreign-holdings-declining-share",
          title:
            "Foreigners held about 30% of US debt held by the public in December 2024, down from nearly 50% in the early 2010s (CRS)",
          description:
            "Foreign holders owned about 30% of US debt held by the public in December 2024, down from nearly 50% in the early 2010s. China's holdings fell to about $759 billion in December 2024, down roughly 42% from their $1.32 trillion peak in 2013. The marginal buyer is increasingly domestic.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          source:
            "US Treasury, Treasury International Capital (TIC) data; CRS, 'Foreign Holdings of Federal Debt' (RS22331, 2025)",
          sourceUrl: "https://www.congress.gov/crs-product/RS22331",
          reasoning:
            "A falling foreign share could raise borrowing costs if domestic buyers cannot fill the gap, though they have so far. Part of the decline reflects total debt growing faster than foreign holdings, not outright selling.",
        },
      ],
    },
    {
      id: "closing-the-gap",
      title: "Who pays to close the gap",
      short_summary:
        "Even people who doubt a crisis is coming agree the debt cannot outgrow the economy forever. The choices are tax increases, slower growth in Social Security and Medicare, cuts elsewhere, or faster growth. The 2025 reconciliation law and the courts have moved the numbers in opposite directions, and Social Security's retirement fund is projected to run dry in late 2032.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "The gap is a choice, and it has been widened on purpose. CRFB estimates the 2025 reconciliation law alone adds $4.7 trillion to the debt. Federal revenue was about $5.4 trillion in fiscal 2026 against $7.4 trillion of spending, and the shortfall can be closed on the revenue side without cutting what retirees were promised. Social Security's combined funds are projected to run out in 2034, after which incoming taxes cover about 83% of scheduled benefits; raising or lifting the cap on wages subject to payroll tax is one of the known options. Treating a revenue choice as an inevitable spending crisis frames the answer before the question is asked.",
      proponent_rebuttal:
        "The pressure comes from programs that grow on their own. Social Security ($1.67 trillion) and Medicare ($1.07 trillion) together took 37% of federal spending in fiscal 2026, and both grow with an aging population. The one big new revenue source of 2025, tariffs imposed under emergency powers, was struck down by the Supreme Court in February 2026, and customs duties fell $22 billion as refunds flowed. Every year without a plan makes the eventual change larger: when Social Security's retirement fund runs dry in late 2032, benefits fall to what incoming taxes can pay unless Congress acts. A crisis does not need a bond-market panic; it can arrive as a forced, abrupt adjustment.",
      crux: {
        id: "who-closes-the-gap",
        title: "The Burden-Sharing Choice",
        question:
          "Should the gap be closed mainly with higher taxes, or with slower growth in Social Security and Medicare?",
        description:
          "Any plan that stabilizes the debt ratio must raise revenue, slow spending growth, or both; the major spending programs are Social Security and Medicare, and the major revenue sources are income and payroll taxes. Evidence can score each option's effect on the debt, on growth and on who pays. Which mix to choose, and how to weigh today's retirees against today's workers and tomorrow's taxpayers, is a value judgment.",
        methodology:
          "Score alternative packages (payroll-tax cap changes, income-tax increases, benefit formula changes, Medicare provider payments) with CBO-style dynamic models for their effect on the debt ratio, growth and the distribution of the burden by age and income.",
        verification_status: "impossible" as const,
        settle: {
          condition:
            "CBO and trustee scoring can show how much each tax or benefit option moves the debt ratio and who bears it by age and income. Which mix is fair, and how to weigh current retirees against workers and future taxpayers, is a value judgment no score makes for the reader.",
          kind: "value-difference" as const,
        },
        cost_to_verify:
          "Scoring is routine at CBO and the Social Security actuaries; the choice of mix is not a measurement.",
        falsification: {
          supporter_flip:
            "If CBO scoring showed a revenue-only package could stabilize the debt ratio without slowing growth, the case that entitlement growth makes a crisis likely would weaken.",
          skeptic_flip:
            "If scoring showed any revenue package large enough would cut growth sharply, while benefit changes phased in slowly could close most of the gap, the case for a tax-only answer would lose force.",
          common_ground:
            "Stabilizing the debt ratio takes some mix of higher revenue and slower spending growth, and Social Security's retirement fund is projected to be depleted in the fourth quarter of 2032 unless Congress acts.",
          live_disagreement:
            "How to split the adjustment between taxpayers and beneficiaries, and whether to act now in small steps or wait for a deadline to force larger ones.",
        },
      },
      evidence: [
        {
          id: "obbba-and-tariffs",
          title:
            "CRFB on CBO's 2026 baseline: the 2025 reconciliation law adds $4.7 trillion to the debt; tariffs were counted to cut $3 trillion",
          description:
            "In its analysis of CBO's February 2026 outlook, CRFB wrote that the 2025 reconciliation law (the One Big Beautiful Bill Act) alone will add $4.7 trillion to the debt, while tariffs subtract $3 trillion. On 20 February 2026 the Supreme Court held the tariffs imposed under the International Emergency Economic Powers Act unlawful, and on 4 March the Court of International Trade ordered them refunded.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source:
            "CRFB, 'CBO's February 2026 Budget and Economic Outlook'; Cleary Gottlieb Trade Watch (March 2026) on the ruling and refund order",
          sourceUrl:
            "https://www.crfb.org/papers/cbos-february-2026-budget-and-economic-outlook",
          reasoning:
            "Shows how much recent policy moved the debt in both directions. The ruling covered only tariffs imposed under that act, so the revenue lost is less than the full $3 trillion.",
        },
        {
          id: "social-security-2032",
          title:
            "Trustees 2026: Social Security's retirement fund runs out in late 2032; combined funds in 2034, then taxes cover about 83% of benefits",
          description:
            "The 2026 Trustees Report projects the Old-Age and Survivors Insurance trust fund will be depleted in the fourth quarter of 2032, and the combined OASDI funds in the third quarter of 2034, when tax income would cover about 83% of scheduled benefits. The 75-year actuarial deficit grew to 4.42% of taxable payroll, from 3.82% a year earlier.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source: "Congressional Research Service, 'Social Security: Selected Findings of the 2026 Annual Report' (IF13256, 25 June 2026)",
          sourceUrl:
            "https://www.everycrsreport.com/files/2026-06-25_IF13256_e1a3332f1a9ae29c3698a1f2e5a5a1d598ec6c57.html",
          reasoning:
            "The deadline most likely to force fiscal action, set by law rather than markets. It is a gap in one program's financing that can be closed with taxes, benefits or both; it does not by itself show a debt crisis.",
        },
        {
          id: "revenue-vs-spending-2026",
          title:
            "FY2026: $5.4 trillion in revenue against $7.4 trillion in spending; Social Security and Medicare were 37% of outlays",
          description:
            "Treasury's year-end figures for fiscal 2026 show total outlays of $7,395.8 billion. Social Security was $1,667.1 billion and Medicare $1,072.6 billion, together about 37%. Individual income taxes brought in $2,845.5 billion and payroll taxes for Social Security and Medicare ('employment and general retirement') $1,754.3 billion; customs duties fell to $173.2 billion from $194.9 billion.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 4,
          },
          source:
            "US Treasury, Monthly Treasury Statement Table 9, fiscal year to 30 September 2026, via Fiscal Data",
          sourceUrl: MTS_FY2026,
          reasoning:
            "The ledger both sides argue from. Read as a revenue gap, it supports the reading that the problem is a political choice that taxes could close; read as a spending trend, it supports the other side. It settles nothing about which.",
        },
      ],
    },
  ],
};
