import type { Topic } from "@/lib/schemas/topic";

export const daylightSavingTimeAbolitionData = {
  id: "daylight-saving-time-abolition",
  title: "Should We Abolish Daylight Saving Time?",
  meta_claim:
    "The US should end the twice-yearly clock change by adopting permanent standard time rather than permanent daylight saving time",
  status: "contested" as const,
  category: "policy" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "The legislation most likely to 'abolish' clock changes — the Sunshine Protection Act, which the US Senate passed by unanimous consent in 2022 — would lock the country into permanent daylight saving time, the exact opposite of what sleep scientists recommend. Every major sleep and circadian-science body (the American Academy of Sleep Medicine and 20 endorsing organizations) instead favors permanent STANDARD time, because DST pushes the clock further from the sun. When the US actually tried year-round DST in 1974, public support collapsed from 79% to 42% within a single dark winter and Congress repealed it within ten months.",
    confidence: 88,
    source:
      "AASM position statement, J Clin Sleep Med (2023); US Senate UC passage of S.623 (2022); NPR/Congressional record on the 1974 permanent-DST repeal",
    sourceUrl: "https://aasm.org/new-position-statement-supports-permanent-standard-time/",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "There is broad agreement that the twice-yearly clock change should end: it is tied to a roughly 5%–25% spike in heart attacks the Monday after 'spring forward,' a ~6% rise in fatal car crashes that week, and a clear loss of sleep — and an 84% majority of 4.6 million respondents in the EU's 2018 consultation wanted the switching to stop.",
    "The honest catch is that 'abolish DST' is ambiguous: chronobiologists say the healthiest permanent option is standard time (which aligns the social clock with the sun and bright morning light), while most legislation — and a lot of public sentiment — pushes permanent daylight saving time, which would mean 8:30–9:30 a.m. winter sunrises and the dark-morning misery that sank the 1974 experiment.",
    "So the real debate is not 'change vs. no change' but which permanent clock to lock in: permanent standard time (favored on health and safety grounds) versus permanent DST (favored for long summer evenings, retail, and recreation) — and whether the benefits of more evening daylight are worth chronic circadian misalignment.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Which Permanent Clock — Standard vs DST
    // =========================================================================
    {
      id: "which-permanent-clock",
      title: "Which Permanent Clock: Standard vs DST",
      short_summary:
        "Almost everyone wants to stop changing the clocks; the fight is over which time to keep. Sleep scientists argue permanent standard time best matches the body clock to the sun and delivers bright morning light. Proponents of permanent daylight saving time counter that an extra hour of usable evening light year-round boosts well-being, recreation, and commerce — and that the public, when polled, often prefers light evenings to light mornings.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "If we are going to lock the clock, permanent daylight saving time is what people actually want and use. Surveys repeatedly show many Americans prefer long, light summer-style evenings to bright early mornings — the evening hour is when people exercise, shop, eat out, see friends, and let kids play outside, whereas the early-morning hour is mostly spent asleep or commuting in either case. Senators passed the Sunshine Protection Act for permanent DST by unanimous consent in 2022 precisely because constituents hate dark 4:30 p.m. winter sunsets. More evening daylight is associated with more physical activity and outdoor recreation, less afternoon-and-evening crime, and measurable retail and tourism gains. The 'circadian' argument treats the entire population as if it were on a farm schedule; for most modern indoor workers, electric light and screens already dominate morning cues, so the marginal health cost of a later social clock is small relative to the lifestyle benefit of usable evenings.",
      proponent_rebuttal:
        "The near-unanimous scientific position is that permanent standard time, not permanent DST, is the healthy way to stop changing clocks. The 2023 AASM position statement — endorsed by 20 medical and scientific organizations including the Sleep Research Society, the Society for Research on Biological Rhythms, the American College of Chest Physicians, and the National Safety Council — concludes that standard time best aligns the body clock with the day-night cycle. The mechanism is well established: morning light is the strongest signal that sets the human circadian clock, and DST shifts the social schedule an hour later than the sun, producing chronic 'social jet lag' that never resolves because the solar day never moves to match it. Permanent DST also means very late winter sunrises — past 8:30 a.m. across much of the country and after 9 a.m. in parts of the northern tier — meaning millions of children and workers would start their days in darkness for months. That is exactly the scenario the US lived through in 1974, when year-round DST was so unpopular it was repealed within the year.",
      crux: {
        id: "circadian-vs-evening-light-tradeoff",
        title: "The Morning-Light vs Evening-Light Tradeoff",
        description:
          "Whether the circadian-health benefit of bright morning light (favoring permanent standard time) outweighs the well-being, activity, and economic benefit of an extra hour of evening daylight (favoring permanent DST). Both clocks shift an hour of daylight from one end of the day to the other; the dispute is which end produces more net human benefit across health, safety, mood, and behavior.",
        methodology:
          "Run a multi-year natural-experiment comparison using regions that have already adopted permanent or near-permanent regimes (e.g., Arizona on standard time; Russia's 2011–2014 permanent-DST period and its subsequent reversal). Track objective outcomes — actigraphy-measured sleep duration and timing, validated mood and seasonal-affective measures, physical-activity step counts, traffic and workplace injuries, and retail/recreation spending — separately for the morning and evening hours affected. Pair this with prospective chronobiology studies measuring dim-light melatonin onset under each regime to quantify circadian misalignment, and weight the resulting health and economic effects on a common scale.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$2-5M (Multi-region longitudinal cohort with actigraphy, melatonin assays, and linked health/economic outcome data)",
        falsification: {
          supporter_flip:
            "If long-run data from permanent-standard-time regions showed no measurable circadian, sleep, mood, or safety advantage over evening-light regimes — and the evening hour delivered large, durable gains in activity and well-being — the case for permanent standard time over permanent DST would weaken to a matter of taste.",
          skeptic_flip:
            "A permanent-DST advocate should weigh that morning light is the dominant zeitgeber for the human clock, that Russia's permanent-DST experiment was abandoned amid dark-morning complaints, and that the US's own 1974 trial collapsed in one winter — so 'people just want light evenings' is contradicted once they actually live through the dark mornings DST creates.",
          common_ground:
            "Both sides agree the twice-yearly switch should end and that a fixed hour of daylight is simply being moved from morning to evening or vice versa.",
          live_disagreement:
            "Whether bright morning light's circadian and safety benefits exceed the lifestyle and economic value of an extra evening daylight hour — which only long-run data from genuinely permanent regimes can settle.",
        },
      },
      evidence: [
        {
          id: "aasm-standard-time-statement",
          title:
            "AASM and 20 Organizations Endorse Permanent Standard Time as Optimal",
          description:
            "The American Academy of Sleep Medicine published a position statement (J Clin Sleep Med, 2023) concluding that permanent standard time is the optimal choice for health and safety because it best aligns the body's circadian clock with the natural light-dark cycle. The statement was formally endorsed by 20 medical, scientific, and safety organizations, including the Sleep Research Society, the Society for Research on Biological Rhythms, the American College of Chest Physicians, the American Thoracic Society, the National Sleep Foundation, and the National Safety Council. The core argument is that morning sunlight is the primary signal that synchronizes human circadian rhythms, and that daylight saving time chronically misaligns the social clock with solar time.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source:
            "American Academy of Sleep Medicine, 'Permanent standard time is the optimal choice for health and safety' position statement, J Clin Sleep Med (2023)",
          sourceUrl: "https://jcsm.aasm.org/doi/10.5664/jcsm.10898",
          reasoning:
            "Published in the peer-reviewed Journal of Clinical Sleep Medicine and endorsed by a broad coalition of independent professional bodies, this represents the consensus position of the relevant scientific field. Directness is high because it speaks precisely to which permanent clock is healthiest. It is an expert position statement rather than a single new experiment, so replicability is moderate — it synthesizes existing circadian evidence rather than reporting one reproducible result.",
        },
        {
          id: "social-jet-lag-mechanism",
          title:
            "Chronobiology: DST Imposes Chronic 'Social Jet Lag' That Never Resolves",
          description:
            "Chronobiologists led by Till Roenneberg have documented that human circadian clocks are entrained primarily by the solar light-dark cycle, especially morning light. Travel jet lag resolves because the sun's schedule shifts with you; but daylight saving time shifts the social schedule one hour later without moving the sun, producing a chronic misalignment between biological time and social time that does not re-entrain. This 'social jet lag' is associated with worse sleep, and population studies link it to elevated BMI, and higher rates of smoking, alcohol, and caffeine use. Permanent DST would lock this misalignment in year-round, whereas permanent standard time moves the social clock closer to the body clock.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Roenneberg et al., 'Daylight Saving Time and Artificial Time Zones – A Battle Between Biological and Social Times,' Frontiers in Physiology (2019)",
          sourceUrl:
            "https://www.frontiersin.org/journals/physiology/articles/10.3389/fphys.2019.00944/full",
          reasoning:
            "Roenneberg is a leading chronobiologist and the paper is peer-reviewed in a reputable physiology journal. The entrainment mechanism (morning light sets the clock) is robustly established. Directness and replicability are slightly tempered because the downstream health associations of social jet lag are correlational, drawn from observational cohorts rather than randomized clock-regime trials.",
        },
        {
          id: "permanent-dst-late-sunrises",
          title:
            "Permanent DST Means 8:30–9:30 a.m. Winter Sunrises Across Much of the US",
          description:
            "Under permanent daylight saving time, winter sunrises shift roughly an hour later than under standard time. On January 1, the sun would not rise until about 8:20 a.m. in New York City and 8:57 a.m. in Seattle, with parts of Montana, North Dakota, and Michigan seeing sunrise after 9:30 a.m. on the darkest days. This means millions of children would commute to school and bus stops in darkness for months. Sleep experts note this morning darkness suppresses the wake-up light signal the body clock depends on, while the late-rising sun is the specific feature that turned the public against year-round DST historically.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 9,
            directness: 8,
          },
          source:
            "FOX Weather and The Washington Post analyses of sunrise/sunset times under permanent DST (using US Naval Observatory data)",
          sourceUrl:
            "https://www.washingtonpost.com/weather/2022/03/17/daylight-saving-time-sunrise-sunset/",
          reasoning:
            "These sunrise times are computed directly from astronomical data and are not in dispute (replicability is high). They directly illustrate the central downside of permanent DST. Source reliability is moderate because the figures come from journalism rather than a peer-reviewed study, though the underlying USNO calculations are authoritative and trivially verifiable.",
        },
        {
          id: "public-prefers-light-evenings",
          title:
            "Public Often Prefers Light Evenings; Senate Passed Permanent DST in 2022",
          description:
            "Public sentiment frequently favors more evening daylight: long summer-style evenings are popular for recreation, dining, and family time, and dark mid-afternoon winter sunsets under standard time are widely disliked. This sentiment is strong enough that the US Senate passed the Sunshine Protection Act establishing permanent daylight saving time by unanimous consent in March 2022 (it later stalled in the House), and similar bills retain bipartisan sponsorship. Advocates argue an extra hour of evening light better matches how modern people actually live — most are asleep or indoors during the early-morning hour that standard time brightens.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "US Senate passage of S.623, the Sunshine Protection Act of 2021, by unanimous consent (March 15, 2022); Wikipedia summary of legislative history",
          sourceUrl: "https://en.wikipedia.org/wiki/Sunshine_Protection_Act",
          reasoning:
            "The Senate's unanimous-consent passage is a documented fact and a genuine signal of political appetite for permanent DST. Directness and reliability are moderate because public 'preference' polling is sensitive to how the dark-morning tradeoff is described — the 2022 vote itself was later reported to have surprised many senators — so it evidences demand for light evenings more than informed consent to permanent DST's full consequences.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: The Switch Itself — Acute Harms of the Clock Change
    // =========================================================================
    {
      id: "acute-harms-of-the-switch",
      title: "The Switch Itself: Acute Harms",
      short_summary:
        "Independent of which clock we keep, the act of springing forward is tied to short-term spikes in heart attacks, strokes, fatal car crashes, and sleep loss. Proponents of abolition argue these recurring, avoidable harms are reason enough to stop switching. Skeptics counter that the effects are small in absolute terms, partly reflect a 'harvesting' shift in timing rather than new events, and fade within days.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The acute-harm story is real but routinely overstated. The famous heart-attack spike is concentrated on a single Monday and is largely a shift in timing — events that would have happened are pulled forward a day or two — which is why the autumn 'fall back' shows a roughly equal-and-opposite drop. In absolute terms the numbers are modest: the spring crash study estimates on the order of a couple dozen extra fatalities nationwide in the affected week, against tens of thousands of annual road deaths. A one-hour shift, twice a year, is far smaller than the sleep disruption people routinely absorb from a late night, a weekend lie-in, or a single time-zone flight, and the body re-entrains within days. Pinning chronic disease on a transient, self-correcting nudge risks confusing a measurable blip with a meaningful public-health burden — and 'abolish the switch' does nothing to resolve the much larger and unsettled question of which permanent clock causes more harm year-round.",
      proponent_rebuttal:
        "The spring transition produces a consistent, replicated cluster of harms that is entirely avoidable. A 2014 Open Heart study by Sandhu and colleagues, analyzing 42,060 hospital admissions across Michigan, found a 25% jump in heart attacks the Monday after spring forward (with a corresponding 21% drop the Tuesday after fall back). A 2020 University of Colorado study in Current Biology, using 732,835 fatal US crashes over 1996–2017, found a 6% increase in fatal motor-vehicle accidents in the workweek after spring forward — about 28 extra deaths per year — with effects largest in the morning and toward the western edge of time zones, exactly the chronobiological signature of sleep loss and circadian misalignment. Stroke risk also rises in the days following the transition. Even if some of this is a forward-shift in timing rather than purely new events, the sleep deprivation, productivity loss, and the documented mortality are recurring costs imposed on the whole population for no clear benefit. On this point both camps largely agree: the switching should stop.",
      crux: {
        id: "harvesting-vs-net-harm",
        title: "The Harvesting vs Net-Harm Test",
        description:
          "Whether the documented post-transition spikes in heart attacks, strokes, and fatal crashes represent net new harm caused by the clock change, or merely a short-term forward-shift in the timing of events that would have occurred anyway ('harvesting'). If a clean accounting over the full week-or-two window around each transition shows a true excess of events with no compensating deficit, abolition prevents real harm; if the spring excess is largely offset by a fall deficit or by a lull in the surrounding days, the net public-health cost is small.",
        methodology:
          "Aggregate event counts (acute myocardial infarction, ischemic stroke, fatal MVA) over a symmetric multi-week window bracketing both the spring and autumn transitions across many years and jurisdictions, using a difference-in-differences or interrupted-time-series design with matched non-transition weeks as controls. Test explicitly for displacement by checking whether the spring-forward excess is followed by a below-baseline deficit (harvesting) and whether the autumn drop is mirrored by a later rebound. Stratify by time-of-day and by position within the time zone (a sleep-loss dose-response check) to distinguish a genuine circadian effect from coincidental seasonality.",
        verification_status: "verified" as const,
        cost_to_verify:
          "$200K-500K (Secondary analysis of existing national hospital-admission and fatal-crash registries; the core spike effects are already replicated)",
        falsification: {
          supporter_flip:
            "If a rigorous displacement analysis showed the spring-forward excess in heart attacks and crashes is almost entirely cancelled by a deficit in the following days (pure harvesting) and by the autumn drop, the acute-harm rationale for abolition would shrink to a minor, mostly cosmetic effect.",
          skeptic_flip:
            "A skeptic who calls the spikes trivial should weigh that the crash effect is dose-dependent on sleep loss (larger in the morning and at a time zone's western edge), that strokes and heart attacks rise together, and that even modest avoidable mortality is worth eliminating when the switch confers no clear benefit.",
          common_ground:
            "Both sides agree the spring transition is followed by a measurable short-term rise in heart attacks, strokes, and crashes, and that the autumn transition shows a partial opposite effect.",
          live_disagreement:
            "How much of the spring spike is genuinely new harm versus a forward-shift in timing — which determines whether abolishing the switch saves meaningful numbers of lives or merely smooths a transient blip.",
        },
      },
      evidence: [
        {
          id: "heart-attack-spike",
          title:
            "Heart Attacks Rose 25% the Monday After Spring Forward (Open Heart 2014)",
          description:
            "A study by Amneet Sandhu and colleagues, presented at the American College of Cardiology and published in Open Heart (2014), analyzed 42,060 hospital admissions for heart attacks requiring percutaneous coronary intervention across all non-federal Michigan hospitals (Jan 2010–Sept 2013). It found a 25% increase in heart attacks on the Monday immediately after the spring 'spring forward' transition compared to other Mondays, and conversely a 21% decrease on the Tuesday after the autumn 'fall back.' The total weekly count did not change, indicating events clustered around the transition rather than purely adding up — a finding consistent with sleep loss and circadian stress acting as a trigger.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Sandhu, Seth & Gurm, Open Heart (2014); ACC press release",
          sourceUrl:
            "https://www.acc.org/about-acc/press-releases/2014/03/29/09/16/sandhu-daylight-saving",
          reasoning:
            "A peer-reviewed observational study with a large, comprehensive state registry; the spring-up/autumn-down pattern has been corroborated by later meta-analyses. Directness is high. But it is observational and the offsetting autumn drop is itself evidence that part of the effect is a shift in timing, which is exactly the live dispute — so it does not by itself establish large net new harm.",
        },
        {
          id: "fatal-crash-increase",
          title:
            "Fatal Car Crashes Rose ~6% the Week After Spring Forward (Current Biology 2020)",
          description:
            "A University of Colorado Boulder study (Fritz et al., Current Biology, 2020) analyzed 732,835 fatal motor-vehicle accidents recorded across all US states from 1996 to 2017. It found that the spring transition to daylight saving time increased fatal crash risk by about 6% in the following workweek — roughly 28 additional deaths per year — with the effect more pronounced in the morning and for locations on the western edge of a time zone (where sunrise is later and the sleep-loss 'dose' is larger). This dose-response gradient is a hallmark of a genuine circadian/sleep-deprivation effect rather than a coincidence.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "Fritz, VoPham, Wright & Vetter, 'A Chronobiological Evaluation of the Acute Effects of Daylight Saving Time on Traffic Accident Risk,' Current Biology (2020)",
          sourceUrl:
            "https://www.cell.com/current-biology/fulltext/S0960-9822(19)31678-1",
          reasoning:
            "A large, national, peer-reviewed dataset with a strong identification strategy: the morning-concentration and within-time-zone gradient are difficult to explain other than by sleep loss. High directness and replicability. The absolute number (~28 deaths/year) is small relative to total US road fatalities, which is precisely why skeptics call the effect modest even while accepting it is real.",
        },
        {
          id: "stroke-and-sleep-loss",
          title:
            "Stroke Risk and Sleep Loss Also Rise Around the Spring Transition",
          description:
            "Beyond cardiac events, research has linked the days following the spring transition to an elevated risk of ischemic stroke (on the order of an 8% increase in the first two days in some analyses), and population sleep data consistently show that people lose sleep around 'spring forward' and take several days to re-entrain. The American Academy of Sleep Medicine cites this acute disruption — and the broader evidence that misaligned clocks harm cardiovascular, metabolic, and mental health — as a central reason to eliminate the seasonal switch entirely.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "American Academy of Sleep Medicine position statement and cited stroke/sleep literature (J Clin Sleep Med, 2020/2023)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7954020/",
          reasoning:
            "The stroke and sleep-loss associations are documented in peer-reviewed literature and summarized in the AASM statement. Reliability and directness are solid but slightly lower than the crash data because individual stroke-timing studies have smaller samples and more heterogeneous estimates, and the effects are short-lived.",
        },
        {
          id: "harvesting-modest-absolute",
          title:
            "Effects Are Small in Absolute Terms and Partly a Shift in Timing",
          description:
            "Skeptics emphasize that the acute harms, while statistically real, are modest in scale and partly reflect displacement rather than new events. The roughly equal-and-opposite autumn decrease in heart attacks (a 21% drop after 'fall back' alongside the 25% spring rise) suggests much of the spring spike is events pulled forward in time. The ~28 extra annual crash deaths attributed to the spring switch are a tiny fraction of the ~40,000 US road fatalities each year, and the one-hour shift is smaller than the sleep disruption people routinely absorb from weekend schedule shifts or a single time-zone flight, with re-entrainment typically within a few days.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source:
            "Interpretation of Sandhu et al. (Open Heart 2014) and Fritz et al. (Current Biology 2020); reviews of DST and myocardial infarction",
          sourceUrl: "https://www.cell.com/current-biology/fulltext/S0960-9822(19)31678-1",
          reasoning:
            "This is a fair, evidence-grounded reading of the same primary studies: the offsetting autumn drop genuinely implies some harvesting, and the absolute mortality is small. It is weighted moderately because it is an interpretive argument about magnitude and displacement rather than a dedicated study isolating the net effect — the very analysis the crux calls for has not been definitively settled.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Daylight as a Resource — Evening Light's Benefits
    // =========================================================================
    {
      id: "daylight-as-a-resource",
      title: "Daylight as a Resource: Evening Light",
      short_summary:
        "The original rationale for DST — saving energy and giving people usable evening light — still anchors the case for keeping it. Evidence shows extra evening daylight reduces some crime and boosts outdoor activity and spending. But the modern energy data is weak or negative, and these gains must be weighed against the dark-morning costs of locking in DST year-round.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "Evening daylight is a genuine public good, and that is the real reason DST has survived a century. Doleac and Sanders (Review of Economics and Statistics, 2015) found robbery rates fall about 7% after the spring shift to DST — and 27% during the specific evening hour that gains light — implying tens of millions of dollars in avoided crime. More evening light is associated with more walking, exercise, and outdoor recreation, and with measurable retail, golf, and tourism revenue, which is why those industries have historically lobbied for DST. Dark 4:30 p.m. winter sunsets under permanent standard time depress evening activity and, for many, mood. The point of moving the clock was never to match cows to the sun; it was to shift scarce daylight into the waking, active evening hours when people can actually use it. Abolishing DST in favor of permanent standard time throws that benefit away.",
      proponent_rebuttal:
        "The marquee justification — energy savings — has largely collapsed under modern data, and the remaining evening benefits don't require permanent DST. The most rigorous US study, Kotchen and Grant's natural experiment using Indiana's staggered DST adoption (NBER 2008; later in Review of Economics and Statistics), found DST actually increased residential electricity use by about 1% — costing Indiana households roughly $9 million a year — because reduced lighting demand was outweighed by extra heating and cooling. The crime and activity gains from evening light are real, but they are a transfer from morning to evening, not free daylight: the same hour that brightens the evening darkens the morning commute, when crashes and pedestrian risk are highest. Crucially, the evening-light benefit is largest in summer, when standard time still delivers late sunsets anyway; permanent DST mostly adds light to winter evenings at the price of dangerously dark winter mornings. A clean way to keep summer evenings without year-round misalignment would be permanent standard time plus seasonal local scheduling — not locking the whole country an hour off the sun.",
      crux: {
        id: "evening-light-net-value",
        title: "The Net Value of Shifting Daylight to the Evening",
        description:
          "Whether moving an hour of daylight from morning to evening (permanent DST) produces a net gain once energy, crime, activity, mood, and morning-safety effects are all counted — or whether the morning costs (darker, higher-risk commutes; suppressed circadian wake signal) and negligible/negative energy savings cancel the evening benefits. The question is the full-day, full-year ledger, not just the popular evening upside.",
        methodology:
          "Construct a full social cost-benefit ledger comparing permanent DST against permanent standard time using quasi-experimental variation (Indiana's DST adoption for energy; the 2007 US DST extension for crime and energy; cross-time-zone-edge comparisons for safety). Quantify on a common monetary scale: residential and commercial energy use, crime (robbery and assault by hour), traffic and pedestrian injuries split into morning vs evening, physical-activity and recreation spending, and health/productivity effects of circadian shift. Net the morning losses against the evening gains across both summer and winter to produce an annual per-capita benefit estimate for each regime.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$1-3M (Integrated econometric cost-benefit study spanning energy, crime, transport, and health data across multiple natural experiments)",
        falsification: {
          supporter_flip:
            "If a full-ledger study showed permanent DST yields large net gains — meaningful energy savings, durable crime reduction, and activity/recreation value that clearly exceed the morning-commute safety and circadian costs — the case for permanent standard time over DST would weaken substantially.",
          skeptic_flip:
            "A permanent-DST advocate should weigh that the best US energy study found DST raised electricity use ~1%, that evening light's benefits are offset by darker higher-risk mornings, and that summer evenings stay long under standard time anyway — so the net-value case for year-round DST is far weaker than the evening-only framing suggests.",
          common_ground:
            "Both sides agree extra evening daylight has real recreational and some crime-reduction value, and that whatever an hour adds to the evening it subtracts from the morning.",
          live_disagreement:
            "Whether the evening gains survive a full-day, full-year accounting once weak/negative energy effects and darker morning commutes are netted against them.",
        },
      },
      evidence: [
        {
          id: "dst-crime-reduction",
          title:
            "Evening Daylight Cut Robberies ~7% (27% in the Gained Hour) — Doleac & Sanders 2015",
          description:
            "Jennifer Doleac and Nicholas Sanders, in 'Under the Cover of Darkness' (Review of Economics and Statistics, 2015), used the sharp discontinuity at the spring DST transition and hourly National Incident-Based Reporting System data to show that robbery rates fell about 7% overall after clocks sprang forward, with a striking ~27% drop during the specific evening hour that gained daylight. They estimated the 2007 extension of DST generated roughly $59 million per year in avoided robbery costs. This is direct causal evidence that shifting daylight into the evening reduces some crime.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Doleac & Sanders, 'Under the Cover of Darkness: How Ambient Light Influences Criminal Activity,' Review of Economics and Statistics 97(5):1093–1103 (2015)",
          sourceUrl:
            "https://direct.mit.edu/rest/article/97/5/1093/58281/Under-the-Cover-of-Darkness-How-Ambient-Light",
          reasoning:
            "A peer-reviewed study in a top economics journal using a clean regression-discontinuity design and granular crime data. High reliability and directness for the claim that evening light reduces robbery. Replicability is slightly tempered because the effect is concentrated in robbery (not all crime) and the dollar figure depends on costing assumptions, but the core causal result is well identified.",
        },
        {
          id: "energy-savings-collapse",
          title:
            "DST Raised Indiana Electricity Use ~1% — the Energy Rationale Fails (Kotchen & Grant)",
          description:
            "Matthew Kotchen and Laura Grant exploited a natural experiment in Indiana, where counties adopted DST at different times, to deliver the first rigorous modern US estimate of DST's energy effect (NBER working paper 14429, 2008; later in Review of Economics and Statistics). Using over 7 million monthly household billing records, they found DST increased residential electricity consumption by about 1% overall — costing Indiana households roughly $9 million per year plus $1.7–5.5 million in pollution costs — with the largest increases in autumn (2–4%). Reduced demand for evening lighting was more than offset by increased demand for heating in dark mornings and air conditioning in warm evenings, overturning the original energy-saving justification for DST.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "Kotchen & Grant, 'Does Daylight Saving Time Save Energy? Evidence from a Natural Experiment in Indiana,' NBER Working Paper 14429 (2008)",
          sourceUrl: "https://www.nber.org/papers/w14429",
          reasoning:
            "A widely cited, peer-reviewed natural experiment with a very large dataset and credible identification (within-state staggered adoption). It directly undercuts the strongest historical argument for DST. Directness and replicability are high; the main caveat is that results are specific to Indiana's climate and housing stock and may not generalize uniformly to all regions.",
        },
        {
          id: "evening-light-activity-recreation",
          title:
            "Extra Evening Daylight Increases Physical Activity and Recreation Spending",
          description:
            "Evidence indicates that additional evening daylight encourages outdoor physical activity and supports recreation-dependent commerce. Studies of children and adults have associated longer evening daylight with more outdoor play, walking, and exercise, and industries such as retail, golf, and outdoor recreation have long supported DST because light evenings extend the time customers shop and play. This 'usable evening light' benefit is the durable, century-old reason DST persists, and it is the strongest practical argument for preferring permanent DST (or at least summer DST) over permanent standard time's earlier sunsets.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source:
            "Research on daylight and physical activity (e.g., International Journal of Behavioral Nutrition and Physical Activity) and documented retail/recreation-industry support for DST",
          sourceUrl: "https://en.wikipedia.org/wiki/Daylight_saving_time",
          reasoning:
            "The activity and recreation benefits of evening light are real and supported by behavioral studies, but the literature is more heterogeneous than the crime or energy work, and industry support reflects commercial interest as well as public benefit. Moderate weight: the direction of the effect is well supported, but the magnitude and net welfare value (versus simply shifting activity from morning) are less firmly established.",
        },
        {
          id: "1974-permanent-dst-failure",
          title:
            "The US Tried Permanent DST in 1974 — Support Fell 79% to 42% in One Winter",
          description:
            "Responding to the 1973 oil crisis, the US adopted year-round daylight saving time beginning in January 1974. Initially supported by about 79% of the public, approval collapsed to roughly 42% after a single dark winter, driven heavily by complaints about children commuting to school before sunrise and several widely publicized morning accidents. Congress repealed permanent DST and Gerald Ford signed the reversal in October 1974, less than ten months in. The episode is the clearest real-world test of permanent DST's evening-light promise against its dark-morning reality — and the evening benefits did not survive contact with winter mornings.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source:
            "NPR, 'The U.S. tried permanent daylight saving time in the 1970s — then quickly rejected it' (2022); Congressional record on the 1974 Emergency Daylight Saving Time Energy Act and its repeal",
          sourceUrl:
            "https://www.npr.org/2022/03/19/1087280464/the-u-s-tried-permanent-daylight-saving-time-in-the-1970s-then-quickly-rejected-",
          reasoning:
            "A genuine historical natural experiment directly on point: the country actually lived under permanent DST and rejected it once the dark mornings arrived. Directness is high. Reliability is moderate because the strongest evidence is contemporaneous polling and journalism rather than a controlled study, and the 1974 context (oil crisis, different commuting patterns) differs somewhat from today.",
        },
      ],
    },
  ],
  references: [
    {
      title:
        "Permanent Standard Time Is the Optimal Choice for Health and Safety — AASM Position Statement, J Clin Sleep Med (2023)",
      url: "https://jcsm.aasm.org/doi/10.5664/jcsm.10898",
    },
    {
      title:
        "Daylight Savings Time and Myocardial Infarction — Sandhu et al., Open Heart (2014); ACC press release",
      url: "https://www.acc.org/about-acc/press-releases/2014/03/29/09/16/sandhu-daylight-saving",
    },
    {
      title:
        "A Chronobiological Evaluation of the Acute Effects of Daylight Saving Time on Traffic Accident Risk — Fritz et al., Current Biology (2020)",
      url: "https://www.cell.com/current-biology/fulltext/S0960-9822(19)31678-1",
    },
    {
      title:
        "Does Daylight Saving Time Save Energy? Evidence from a Natural Experiment in Indiana — Kotchen & Grant, NBER (2008)",
      url: "https://www.nber.org/papers/w14429",
    },
    {
      title:
        "Under the Cover of Darkness: How Ambient Light Influences Criminal Activity — Doleac & Sanders, Review of Economics and Statistics (2015)",
      url: "https://direct.mit.edu/rest/article/97/5/1093/58281/Under-the-Cover-of-Darkness-How-Ambient-Light",
    },
    {
      title:
        "The U.S. Tried Permanent Daylight Saving Time in the 1970s — Then Quickly Rejected It — NPR (2022)",
      url: "https://www.npr.org/2022/03/19/1087280464/the-u-s-tried-permanent-daylight-saving-time-in-the-1970s-then-quickly-rejected-",
    },
  ],
  questions: [
    {
      id: "q1",
      title:
        "If we stop changing the clocks, should we lock in standard time or daylight saving time?",
      content:
        "Almost everyone agrees the twice-yearly switch should end — but 'abolish DST' hides a sharp disagreement. Sleep scientists and the AASM (with 20 endorsing organizations) say permanent standard time is healthiest because morning light synchronizes the body clock and avoids chronic 'social jet lag.' Yet the legislation closest to passing — the Sunshine Protection Act the Senate passed in 2022 — would lock in permanent daylight saving time, with winter sunrises after 8:30–9:30 a.m. across much of the country. Which permanent clock does more good: bright mornings or long evenings?",
    },
    {
      id: "q2",
      title:
        "How much real harm does the spring 'spring forward' actually cause?",
      content:
        "Studies find a 25% spike in heart attacks the Monday after spring forward, a ~6% rise in fatal crashes that week (about 28 extra US deaths a year), and elevated stroke risk. But the autumn 'fall back' shows a roughly equal-and-opposite drop in heart attacks, suggesting part of the spring spike is events shifted forward in time rather than purely new. Is the clock change a genuine, avoidable public-health burden — or a small, self-correcting blip that fades within days?",
    },
    {
      id: "q3",
      title:
        "Is shifting daylight into the evening worth the darker mornings?",
      content:
        "Evening daylight has real value: it cut robberies ~7% (27% in the gained hour) in Doleac and Sanders's study, and it boosts outdoor activity and recreation spending. But the original energy-saving rationale failed — the best US study found DST raised electricity use ~1% — and every hour added to the evening is subtracted from the morning commute, when crash and pedestrian risk peak. When the US tried permanent DST in 1974, public support fell from 79% to 42% in one dark winter. Do evening benefits survive a full-day, full-year accounting?",
    },
  ],
} satisfies Omit<Topic, "confidence_score"> & {
  confidence_score?: number;
};
