export const ukrainePeaceTermsData = {
  id: "ukraine-peace-terms",
  title: "How the Russia-Ukraine War Should End",
  question:
    "Would a deal freezing current lines end the war on acceptable terms?",
  meta_claim:
    "A negotiated settlement that freezes the war along current lines — ratifying territorial reality, barring NATO membership, and lifting sanctions — would end the killing on acceptable terms, rather than rewarding aggression and inviting a future Russian attack.",
  status: "contested" as const,
  category: "policy" as const,
  // One line under "This turns on four questions": the stakes, without
  // restating the four questions printed right below it.
  simple_case: [
    "The answers decide whether freezing the lines would end the killing on acceptable terms or only buy time before the next invasion.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Territorial Concessions vs. Sovereignty
    // =========================================================================
    {
      id: "territorial-concessions",
      title: "Territorial Concessions vs. Sovereignty",
      short_summary:
        "The original US 28-point plan would have treated Crimea, Luhansk, and Donetsk as de facto Russian; the later 20-point draft would instead freeze the current line of contact, with any special zone subject to Ukraine's parliament or a referendum. Critics say any concession rewards aggression. The dispute turns on whether ratifying battlefield reality buys durable peace or merely buys time before the next invasion.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Ceding territory under duress rewards aggression and sets a catastrophic precedent. The original 28-point plan recognized Crimea, Luhansk, and Donetsk as 'de facto Russian, including by the United States' and demanded Ukraine withdraw from the part of Donetsk Oblast it still holds — about 2,500 square miles Russia had not captured, by CSIS's count. The Kremlin still wants that land: in October 2026 ISW described it as 'repeatedly demanding that Ukraine cede territory, including areas which Russian forces do not currently control.' SWP estimated in 2024 that around 3.47 million people live in the areas Russia occupies, and a freeze would leave them there. Zelensky has said any territorial settlement requires a national referendum because no leader can constitutionally sign away sovereign land. An unjust peace is also an existential threat to Poland and the Baltics, who see themselves as the next dominoes.",
      proponent_rebuttal:
        "The front line moves only marginally: ISW measured net changes of 80.81 square kilometers in September 2026 and 27.29 in October, both slightly in Ukraine's favor, so Ukraine cannot realistically retake Crimea or the Donbas by force on any feasible time horizon — the maps make this plain. Continuing to fight for territory that cannot be liberated only adds to the 80,000-110,000 Ukrainian dead and the acute manpower crisis. Ratifying de facto control without de jure recognition of Russian sovereignty — the Korea-style armistice model — stops the killing while preserving Ukraine's legal claim. The 20-point draft that US and Ukrainian negotiators agreed in December 2025 replaced the 28-point plan's forced withdrawal from unoccupied Donetsk with a freeze at the current line of contact and a working group on force redeployment, with any special zone needing approval by Ukraine's parliament or a referendum.",
      crux: {
        id: "line-of-contact-feasibility",
        title: "The Battlefield Reversibility Test",
        question:
          "Can Ukraine realistically retake its 1991 borders, or is the front line effectively frozen?",
        description:
          "The core question is whether Ukraine can plausibly restore its 1991 borders by force, or whether the front line is effectively frozen. If ISW control-of-terrain data shows the line is static and neither side can achieve operational breakthroughs, then refusing to ratify de facto control prolongs a war that cannot change the territorial outcome. If Russia's offensive capacity is genuinely collapsing, holding out for better terms is rational.",
        methodology:
          "Compile ISW daily Russian Offensive Campaign Assessments over a rolling 12-month window, measuring net territorial change in square kilometers per month against Russian casualty and equipment-loss rates. Cross-reference with RUSI assessments of Russian armored-vehicle production (refurbishment vs. new build) and depot depletion forecasts to project whether the attrition curve crosses in Ukraine's favor before Ukrainian manpower is exhausted.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "ISW daily assessments over a rolling 12 months, setting net territorial change per month against Russian casualty and equipment-loss rates, cross-checked with RUSI counts of Russian armor production and depot depletion.",
        },
        cost_to_verify:
          "$0 (ISW and RUSI assessments are public; the forecast itself is contested and cannot be settled before the fact)",
        falsification: {
          supporter_flip:
            "If ISW terrain data over a rolling 12 months showed Russian offensive capacity genuinely collapsing — net territorial change turning in Ukraine's favor as Russian casualties and equipment losses outran replacement — holding out for better terms would be rational and a freeze at current lines would look premature.",
          skeptic_flip:
            "If the front line kept moving only marginally, as ISW's 2026 monthly tallies show, and a Korea-style armistice ratified de facto control while preserving Ukraine's legal claim, 'a reward for aggression' would describe a freeze poorly.",
          common_ground:
            "Both sides agree the front line has moved little in 2026, and that any freeze would leave millions of Ukrainians in territory Russia now occupies.",
          live_disagreement:
            "Whether ratifying battlefield reality without formal recognition buys a durable peace or only time before the next invasion — and whether any leader can cede territory without the national referendum Zelensky says the constitution requires.",
        },
      },
      evidence: [
        {
          id: "isw-front-line-2026",
          title: "ISW records a front line moving only marginally through 2026",
          description:
            "ISW's daily and monthly campaign assessments describe a front line moving only marginally through 2026. By ISW's count, Russian forces lost control of almost 300 square kilometers between March and September 2026, a period that included Ukraine's Operation Vivaldi north of Lyman. In September they seized 175.54 square kilometers but lost 256.35, a net loss of 80.81; in October they seized 139.85 and lost 167.14, a net loss of 27.29, or -0.88 square kilometers a day. On a typical day such as 4-5 October, ISW recorded Russian attacks in the Sumy, Kupyansk, Lyman, Slovyansk and Kostyantynivka directions that 'did not advance,' and Russian Defense Ministry flag-raising claims of new captures that 'do not reflect battlefield realities.' ISW judges that 'the Russian war effort is currently failing to achieve its operational and strategic objectives.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source:
            "Institute for the Study of War / Critical Threats, Russian Offensive Campaign Assessments (1, 5 and 16 October and 1 November 2026)",
          sourceUrl:
            "https://www.criticalthreats.org/analysis/russian-offensive-campaign-assessment-november-1-2026",
          reasoning:
            "ISW's control-of-terrain assessments are the gold-standard, independently reproducible daily record of the front, and its monthly square-kilometer tallies make the pace checkable. A front that moves this little supports the proponent claim that neither side can change the territorial outcome by force and that ratifying de facto lines reflects military reality. But since September the small net movement has run in Ukraine's favor, which the pressure camp reads as Russia's offensive capacity faltering, so the same data is genuinely double-edged.",
        },
        {
          id: "28-point-plan-recognition",
          title: "Original 28-Point Plan Recognized Occupied Territory as 'De Facto Russian'",
          description:
            "The November 2025 US 28-point plan, drafted by envoy Steve Witkoff with Russian input reportedly led by Kirill Dmitriev, said 'Crimea, Luhansk, and Donetsk will be recognized as de facto Russian, including by the United States,' froze Kherson and Zaporizhzhia along the line of contact, and said 'Ukrainian forces will withdraw from the part of Donetsk Oblast that they currently control,' which would become a demilitarized buffer zone 'internationally recognized as territory belonging to the Russian Federation.' CSIS put that land, which Russia had not captured, at about 2,500 square miles. Skeptics cite this as proof the framework rewards aggression, and the demand has outlived the plan: in October 2026 ISW described the Kremlin as 'repeatedly demanding that Ukraine cede territory, including areas which Russian forces do not currently control.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 9,
          },
          source: "CSIS provision-by-provision analysis (Cancian and Snegovaya, 24 November 2025), quoting the plan text published by the AP; ISW (16 October 2026)",
          sourceUrl: "https://www.csis.org/analysis/unfinished-plan-peace-ukraine-provision-provision",
          reasoning:
            "The plan text is a primary document, and CSIS's provision-by-provision walkthrough is an independent expert analysis. The demand to cede unoccupied Donetsk directly substantiates the 'rewarding aggression' critique. Weighted slightly down on independence because the leaked plan was framed differently by pro-Russia and pro-Ukraine channels.",
        },
        {
          id: "zelensky-referendum-requirement",
          title: "Zelensky: Any Territorial Concession Requires a National Referendum",
          description:
            "Zelensky has repeatedly stated that no territorial settlement can be signed without a national referendum, citing Ukraine's constitution, under which sovereign territory cannot be ceded by executive decision. This procedural requirement means even a signed deal at the leader level may not bind Ukraine, and reflects the view across Ukrainian civil society that surrendering occupied land is illegitimate.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 8,
          },
          source: "Kyiv Independent; Ukrainian government statements",
          sourceUrl: "https://kyivindependent.com/elections-or-referendum-zelensky-affirms-ukrainians-will-decide-territorial-concessions/",
          reasoning:
            "Zelensky's referendum position is well-documented but is a party to the dispute, lowering independence. It directly addresses the sovereignty question: it establishes a constitutional barrier to ceding territory that is independent of military feasibility, complicating any imposed settlement.",
        },
        {
          id: "miami-revisions-20-point",
          title: "December 2025: A 20-Point Draft Replaced the Forced Donetsk Withdrawal With a Freeze",
          description:
            "After Ukraine rejected the 28-point plan, US and Ukrainian negotiators reworked it into a 20-point draft that Zelensky described point by point on 24 December 2025, saying it had been agreed between Kyiv's and Washington's negotiators and sent to Moscow. In it, 'the line of troop deployment as of the date of this agreement is de facto recognized as the line of contact' in Donetsk, Luhansk, Zaporizhzhia and Kherson; a working group would settle force redeployments and any special economic zones, and such a zone 'will require special approval by the Ukrainian parliament or a referendum.' Zelensky called the draft 'about 90% ready' before meeting Trump at Mar-a-Lago on 28 December and said afterwards that the two were 90% agreed, though both called the Donbas a 'very tough question.' Proponents read this as evidence that a settlement ratifying de facto control without the most punitive terms is negotiable.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "The Moscow Times (translated transcript of Zelensky's 24 December 2025 briefing); CBS News (26-28 December 2025)",
          sourceUrl: "https://www.themoscowtimes.com/2025/12/24/zelensky-reveals-new-20-point-plan-to-end-ukraine-war-a91532",
          reasoning:
            "The terms come from Zelensky's own description of a draft he helped negotiate, so independence is limited; the full text was not published. The removal of the forced withdrawal supports the proponent claim that a more balanced deal can be drafted. Weighted down on replicability because '90%' is a party's characterization, the Donbas was left unresolved, and Russia has not accepted the draft: in October 2026 ISW assessed that the Kremlin still refuses any territorial concessions of its own.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Security Guarantees & NATO
    // =========================================================================
    {
      id: "security-guarantees-nato",
      title: "Security Guarantees & NATO",
      short_summary:
        "Any settlement must answer what stops Russia from attacking again. At the January 2026 Paris talks the UK and France pledged to deploy forces in Ukraine after a ceasefire as part of a 'coalition of the willing' multinational force, but Russia flatly rejects any NATO troops in Ukraine — producing a security-guarantee paradox: guarantees weak enough for Russia to accept won't deter, and guarantees strong enough to deter won't be accepted.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "A permanent NATO bar plus a capped Ukrainian military leaves Ukraine defenseless against a regime that has shown it will re-attack. Putin's Foreign Ministry has flatly ruled out NATO troops in Ukraine, and any guarantee Russia will accept is by definition too weak to deter. Without a credible Western tripwire, an armistice becomes a rearm-and-relaunch runway: Russia uses the pause to reconstitute its forces and invades again in five years, exactly as it did between 2014 and 2022. A deal Russia rejects is better than a deal Ukraine cannot survive.",
      proponent_rebuttal:
        "Permanent NATO membership for Ukraine was always a core driver of Russian security fears and is not worth a nuclear confrontation; ruling it out removes Moscow's central casus belli. Credible deterrence does not require NATO Article 5 — at the January 2026 Paris talks the coalition of the willing pledged UK and French 'military hubs' across Ukraine after a ceasefire and a multinational force that European officials put at 15,000-20,000 troops, plus heavy continued Western armament of unoccupied Ukraine. This is the Korea model: no formal alliance membership, but a forward-deployed deterrent and an indefinitely armed Ukraine. A deal structured with credible tripwires and a Russian sanctions-relief incentive can be made to hold.",
      crux: {
        id: "security-guarantee-paradox",
        title: "The Security-Guarantee Paradox",
        question:
          "Is there a security guarantee strong enough to deter Russia that Russia would also accept?",
        description:
          "The decisive question is whether any security guarantee exists that is simultaneously (a) strong enough to deter a future Russian attack and (b) acceptable to Russia as part of a deal. If the two sets are disjoint — every Russia-acceptable guarantee is too weak, every deterrent-grade guarantee is Russia-rejected — then no negotiated settlement can be both durable and signable, and the war ends only on the battlefield.",
        methodology:
          "Map the spectrum of proposed guarantees (bilateral arms supply, European tripwire force, NATO membership, Article 5) against two independent assessments: Russian stated red lines (Foreign Ministry and Putin statements) for acceptability, and military-balance analysis (RUSI, ISW) for deterrent credibility. Identify whether any point on the spectrum satisfies both. Stress-test against the 2014-2022 precedent, where the Minsk agreements' weak guarantees failed to prevent full-scale invasion.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A map of each proposed guarantee, from bilateral arms supply to a European tripwire force to NATO membership, scored against Russia's stated red lines and against RUSI and ISW military-balance analysis, and checked against the 2014-2022 precedent.",
        },
        cost_to_verify:
          "$500K-1M (Structured net-assessment and red-line analysis; the underlying question is a forecast about Russian intent that cannot be fully resolved in advance)",
        falsification: {
          supporter_flip:
            "If mapping every proposed guarantee — bilateral arms, a European tripwire force, NATO membership, Article 5 — against Russia's stated red lines and military-balance analysis found no option both acceptable to Russia and strong enough to deter, no settlement could be both durable and signable, and the case for a deal would fail.",
          skeptic_flip:
            "If the January 2026 Paris offer held, with UK and French military hubs, a multinational force European officials put at 15,000-20,000 troops and continued heavy armament of unoccupied Ukraine, deterrence on the Korea model without NATO membership would look like more than a rearm-and-relaunch runway.",
          common_ground:
            "Both sides agree any deal must answer what stops Russia from attacking again, and that Russia has so far rejected any NATO troops in Ukraine.",
          live_disagreement:
            "Whether a guarantee exists that Russia would accept and that would still deter — a European tripwire plus an armed Ukraine — or whether every guarantee strong enough to deter is one Russia will refuse.",
        },
      },
      evidence: [
        {
          id: "paris-tripwire-force",
          title: "Paris Talks: UK and France Pledge Military Hubs; Officials Float a 15-20K Force",
          description:
            "At the 6 January 2026 Paris meeting of the 35-country coalition of the willing, Keir Starmer and Emmanuel Macron signed a declaration of intent to put British and French forces in Ukraine in the event of a peace deal. 'Following a ceasefire, the UK and France will establish military hubs across Ukraine and build protected facilities for weapons and military equipment,' Starmer said. The coalition's statement promised a US-led ceasefire monitoring mechanism, a multinational force for Ukraine, and 'binding commitments to support Ukraine in the case of a future armed attack by Russia.' It gave no troop numbers, but European officials told RFE/RL that the figure 'floating around in various European capitals' was 15,000-20,000 troops, with others hoping for closer to 30,000. Proponents cite this as a credible deterrent that could make a settlement durable without NATO membership.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "CNN (6 January 2026); RFE/RL (Rikard Jozwiak, 6 January 2026)",
          sourceUrl: "https://www.cnn.com/2026/01/06/europe/uk-france-troops-ukraine-russia-peace-deal-latam-intl",
          reasoning:
            "Reported by multiple independent outlets covering the Paris talks. It directly addresses how a settlement could be deterrence-backed without NATO membership. Weighted down on replicability because the troop figure is an unofficial number from European officials, not a committed or deployed force, the deployment depends on a ceasefire first, and the Kremlin has repeatedly said it will not accept foreign troops in Ukraine.",
        },
        {
          id: "russia-rejects-nato-troops",
          title: "Russia Flatly Rejects Any NATO Troops in Ukraine",
          description:
            "Russia's Foreign Ministry has stated that NATO troops in Ukraine are unacceptable, and Putin has personally ruled out any such deployment. Because the UK-French multinational force is precisely the kind of guarantee strong enough to deter, its categorical rejection by Moscow substantiates the skeptic claim that no deterrent-grade guarantee is signable — the security-guarantee paradox in operation.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 9,
          },
          source: "Global Security; Russian Foreign Ministry statements",
          sourceUrl: "https://www.globalsecurity.org/wmd/library/news/ukraine/2026/02/ukraine-260201-sputnik02.htm",
          reasoning:
            "Russian official statements are primary but self-interested (low independence) and could be negotiating posture. They directly establish that the strongest proposed guarantee is rejected, which is the load-bearing fact for the paradox argument.",
        },
        {
          id: "conversation-guarantee-paradox",
          title: "Analysts Formalize the 'Security-Guarantee Paradox'",
          description:
            "In an August 2025 analysis for The Conversation, Wesleyan University's Peter Rutland summarized the structural dilemma: if too weak, security guarantees 'provide no real deterrence to future Russian aggression; too stringent, and they will never be accepted by Moscow in the first place.' This framing captures why the security question, not territory, may be the binding constraint on any durable deal — and why both the tripwire and the NATO bar are individually insufficient.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "The Conversation (Peter Rutland, Wesleyan University, 22 August 2025)",
          sourceUrl: "https://theconversation.com/the-security-guarantee-paradox-too-weak-and-it-wont-protect-ukraine-too-robust-and-russia-wont-accept-it-263518",
          reasoning:
            "An independent academic-press analysis that articulates the logical structure of the dispute rather than advocating a side. High independence. It is coded 'against' because it undercuts the proponent claim that a workable middle-ground guarantee readily exists.",
        },
        {
          id: "minsk-precedent-failure",
          title: "2014-2022 Precedent: Weak Guarantees Failed to Prevent Full-Scale Invasion",
          description:
            "Between the 2014 annexation of Crimea and the 2022 full-scale invasion, the Minsk agreements provided weak, non-tripwire guarantees that failed to prevent Russia from rearming and launching a far larger war. Skeptics including Mark Galeotti argue the Putin regime now sees itself as a permanent war-fighting state at war with the West, making any pause a runway to re-attack rather than a settlement.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Mark Galeotti, In Moscow's Shadows; The Spectator (spectator.com)",
          sourceUrl: "https://www.spectator.com/article/why-ukraines-peace-talks-with-russia-matter/",
          reasoning:
            "The 2014-2022 sequence is undisputed historical fact; Galeotti's interpretation of regime intent is a serious but contestable analytic judgment, not a counted quantity. It directly supports the rearm-and-relaunch concern but rests on a forecast about Russian behavior.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Sanctions, Russian Capability & Attrition
    // =========================================================================
    {
      id: "sanctions-attrition",
      title: "Sanctions, Russian Capability & Attrition",
      short_summary:
        "Whether to lift sanctions as part of a deal hinges on whether Russia can sustain another year of attrition. A 2024 RUSI forecast had Russia exhausting most of its stored Soviet-era armor by 2026, and the pressure camp reads recruitment data the same way; the restraint camp says an autocracy can absorb pain Ukraine cannot — and Russia has evaded sanctions throughout.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Lifting sanctions and freezing the war now throws away leverage at the exact moment Russia is breaking. RUSI's Watling and Reynolds estimated in February 2024 that roughly 80% of the tanks and armored vehicles Russia delivers are refurbished from war stocks rather than newly built, forecast that by 2026 Russia 'will have exhausted most of the available stocks,' and wrote that beyond 2026 attrition 'will begin to materially degrade Russian combat power.' Recruitment fell 20% in Q1 2026 to roughly 800 sign-ups per day even as sign-on payments hit record highs, and Western officials told Bloomberg that in January 2026 Russia's battlefield losses outran its replacements by about 9,000. Sweden's military intelligence chief says Russia presents its economic data to look more resilient than it is, with real inflation nearer its 15% key rate than the official 5.86%. Russia must lose decisively, or Beijing, Tehran, and Pyongyang learn that aggression pays.",
      proponent_rebuttal:
        "Willingness, not capability, is the dominant variable — a Russian autocracy can absorb casualties and economic pain that a democratic Ukraine cannot, and Ukrainian manpower is the binding constraint, not Russian matériel. Sanctions have not coerced Russia despite years of maximum pressure; using sanctions relief as an incentive is the only lever that makes a durable deal attractive to Moscow. Betting Ukrainian lives on a forecast that Russia's attrition curve crosses around 2026 is reckless when that prediction has been made and missed before. Stop treating sanctions relief as a bargaining chip to be withheld and use it to buy peace.",
      crux: {
        id: "russian-attrition-crossover",
        title: "The Attrition-Crossover Forecast",
        question:
          "Can Russia sustain another year of attrition, or will its combat power materially degrade within that year?",
        description:
          "The highest-leverage empirical disagreement: can Russia sustain another year of offensive attrition, or does its combat power materially degrade within the next twelve months? If Russian armored stocks, recruitment, and fiscal capacity are genuinely crossing a depletion threshold, withholding sanctions relief and continuing to arm Ukraine extracts better terms. If Russian willingness dominates and the autocracy can outlast Ukrainian manpower, prolonging the war only raises the body count without improving the outcome.",
        methodology:
          "Track three time series against each other: (1) Russian armored-vehicle availability — new build vs. refurbishment vs. depot drawdown (RUSI, satellite imagery of storage bases); (2) monthly Russian recruitment net of casualties (Janis Kluge's sign-up data, Mediazona confirmed KIA, Ukraine MoD high estimates, each with stated methodology); (3) Russian fiscal stress and real inflation (Bank of Russia data cross-checked against Sweden's MUST and BOFIT independent estimates). Identify whether the depletion threshold is crossed before Ukrainian manpower is exhausted.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Three series tracked against each other: Russian armored-vehicle availability from new builds, refurbishment and depot drawdown; monthly recruitment net of casualties; and fiscal stress and real inflation, each with its stated method.",
        },
        cost_to_verify:
          "$1-2M (Multi-source intelligence fusion and forecasting; the crossover date is a contested prediction that resolves only as it occurs)",
        falsification: {
          supporter_flip:
            "If armored-vehicle availability, recruitment net of casualties and real fiscal stress all crossed a depletion threshold within the next twelve months, withholding sanctions relief and continuing to arm Ukraine would extract better terms, and freezing the war now would give away leverage.",
          skeptic_flip:
            "If Ukraine's manpower problem kept worsening as Carnegie's March 2026 study describes, sanctions again failed to coerce Russia, and the attrition curve missed its projected crossing as earlier forecasts did, betting on Russian depletion would look unsafe.",
          common_ground:
            "Both sides agree the war has become a contest of attrition in which manpower is decisive, and that sanctions have not by themselves forced Russia to stop.",
          live_disagreement:
            "Whether Russia's armored stocks and recruitment are crossing a depletion threshold that makes waiting worthwhile, or whether an autocracy's willingness to absorb losses outlasts Ukraine's manpower.",
        },
      },
      evidence: [
        {
          id: "rusi-depot-depletion",
          title: "RUSI (2024): ~80% of Russian Armor Is Refurbished; Most Stocks Exhausted by 2026",
          description:
            "In a February 2024 RUSI commentary, Jack Watling and Nick Reynolds estimated that of the roughly 1,500 tanks and 3,000 armored fighting vehicles Russia delivers each year, 'approximately 80% are not new production but are instead refurbished and modernised from Russian war stocks.' They forecast that vehicles would need deeper refurbishment through 2025 and that 'by 2026 it will have exhausted most of the available stocks,' and that 'beyond 2026, attrition of systems will begin to materially degrade Russian combat power.' This forecast is the empirical core of the case for maintaining pressure rather than settling now; it was made in 2024, and Watling's February 2026 RUSI commentary judges that Russia 'is likely able to maintain its current rate of recruitment' and that 'the Russians believe they can sustain the war into 2027.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "Royal United Services Institute (RUSI)",
          sourceUrl: "https://www.rusi.org/explore-our-research/publications/commentary/russian-military-objectives-and-capacity-ukraine-through-2024",
          reasoning:
            "RUSI is an independent, methodologically transparent defense institute and its depot estimates are partly satellite-verifiable, but this is a two-year-old forecast whose 2026 date is now being tested. It directly addresses the capability crux and supports the continue-fighting position. Coded 'against' the negotiate-now meta-claim because it implies leverage is increasing.",
        },
        {
          id: "recruitment-fell-20-percent",
          title: "Russian Recruitment Fell 20% in Q1 2026 Despite Record Sign-On Payments",
          description:
            "Janis Kluge (SWP) estimated in April 2026 that Russian recruitment fell by about 20% in Q1 2026, to roughly 800 sign-ups per day, even as regional sign-on payments kept rising: the average payment in his dataset reached an all-time high of 1.47 million rubles in March (median 1.55 million). In February 2026 Western officials told Bloomberg that Russia sustained around 9,000 more battlefield losses in January than it was able to replace, after losses roughly equalled monthly recruitment in December; that assessment could not be independently verified. This trend is cited as evidence Russia's manpower model is reaching its limits.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Janis Kluge (SWP) Substack; Bloomberg (Western officials, February 2026)",
          sourceUrl: "https://janiskluge.substack.com/p/russian-recruitment-fell-by-20-in",
          reasoning:
            "Kluge's quantitative recruitment tracking is well-regarded and partly cross-checkable against regional bonus data. The losses-vs-recruitment comparison rests on anonymous Western officials' loss estimates that could not be independently verified, lowering replicability. Directly bears on whether Russia can sustain the fight.",
        },
        {
          id: "willingness-dominates-capability",
          title: "Restraint Camp: Russian Willingness Outlasts Ukrainian Manpower",
          description:
            "The restraint camp counters that Russia's autocracy can absorb pain Ukraine cannot, making willingness — not capability — the dominant variable. Carnegie's March 2026 study opens: 'Ukraine is facing an increasingly acute military manpower challenge,' citing severe shortages in frontline units, reduced voluntary recruitment, fatigue among long-serving personnel, record rates of absence without leave, and growing public unease with mobilization practices. In August 2026 Kyrylo Budanov, head of Ukraine's Presidential Office, said 'we cannot mobilise fewer than 30,000 people a month. This is the minimum number needed to maintain what we have.' Zelensky has refused to lower the mobilization age to 18: 'I do not believe that we should mobilize people from the age of 18,' he said in June 2025. If Ukrainian manpower fails first, prolonging the war worsens Ukraine's position.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Carnegie Endowment for International Peace (Kevliuk, Favorska and Zagorodnyuk, 17 March 2026); Ukrainska Pravda (28 August 2026); Kyiv Independent (10 June 2025)",
          sourceUrl: "https://carnegieendowment.org/research/2026/03/ukraine-military-russia-war-manpower-recruitment",
          reasoning:
            "Carnegie's manpower study is independent and rigorous, directly addressing the symmetric question of whether Ukraine can outlast Russia; the 30,000 figure and the age-18 position are Ukrainian officials' own statements. It substantiates the negotiate-now claim that time is not on Ukraine's side, balancing the RUSI/Kluge attrition evidence, though Carnegie itself argues the strain is 'not evidence of a collapse in Ukraine's national will to fight' and says strategy and force design are the key to solving it.",
        },
        {
          id: "sweden-faked-data",
          title: "Sweden's Military Intelligence: Russia Presents Its Economy as More Resilient Than It Is",
          description:
            "On 20 April 2026, Thomas Nilsson, head of Sweden's Military Intelligence and Security Service (MUST), said Russia presents its economic figures so that it appears more resilient to war and sanctions than it really is. MUST judges that real inflation is closer to the Bank of Russia's 15% key rate than to the central bank's official 5.86%, that the budget deficit is larger than reported, and that oil would need to stay above $100 a barrel for a year to close it. Nilsson said the economy faces either a long recession or a shock, on a downward path to financial disaster either way. If that assessment holds, sanctions are biting and relief should not be conceded prematurely.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "Euronews, reporting Sweden's Military Intelligence and Security Service (MUST)",
          sourceUrl: "https://www.euronews.com/my-europe/2026/04/21/russia-faked-economic-data-to-appear-more-resilient-to-its-war-and-sanctions-intel-report-",
          reasoning:
            "An intelligence-agency assessment given to the press is hard to verify independently (lower replicability), and the reporting cites no outside economist confirming it, though the 15% key rate it leans on is the Bank of Russia's own published figure. It supports the argument that sanctions leverage is real and undermines the case for lifting sanctions in a settlement.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Ceasefire-Now vs. Just-Peace & Frozen-Conflict Risk
    // =========================================================================
    {
      id: "ceasefire-vs-just-peace",
      title: "Ceasefire-Now vs. Just-Peace & the Demonstration Effect",
      short_summary:
        "Even if a freeze is achievable, would it be a stable Korea-style armistice or a fragile pause Putin exploits — and what does settling at current lines teach China about Taiwan? The dispute pits stopping the killing now against the risk that an unjust peace emboldens the next aggressor.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "A ceasefire at current lines is not peace — it is a frozen conflict that emboldens aggressors worldwide. If Beijing reads a settlement at current lines as proof that aggression pays, it raises the probability of a Taiwan move in 2027-2030; Atlanticists treat this demonstration effect as nearly axiomatic. The Korea analogy is misleading: there was no four-year attrition war preceding the 1953 armistice, and Putin's regime, unlike a contained North Korea, is structurally committed to continued expansion. Stopping now to spare casualties trades a finite present cost for a larger future war.",
      proponent_rebuttal:
        "The realistic stable equilibrium is precisely a Korea-style armistice along the line of contact — no formal recognition of Russian sovereignty, no NATO membership, but heavy Western armament of unoccupied Ukraine and a long-term containment posture. Total Ukrainian victory is fantasy and total Russian victory is intolerable, so a managed freeze is the only outcome that ends the killing without surrender. The demonstration-effect claim is overstated: Taiwan is geographically and economically nothing like Ukraine, and the lessons China is actually drawing are operational (drones, AI, electronic warfare) rather than a strategic green light. Deterrence is more situational than reputational.",
      crux: {
        id: "demonstration-effect-china",
        title: "The Demonstration-Effect Test",
        question:
          "Would a settlement at current lines make a Chinese move on Taiwan more or less likely?",
        description:
          "Does a negotiated settlement at current lines raise or lower the probability of a Chinese move on Taiwan in 2027-2030? This turns on whether deterrence is dominantly reputational — a signal that travels across cases, so conceding in Ukraine invites aggression elsewhere — or situational, specific to local military and economic balances. The crux is a long-running international-relations dispute that maps directly onto whether 'unjust peace' carries global costs or is contained to the Ukrainian theater.",
        methodology:
          "Operationalize the reputational-vs-situational debate: track Chinese military posture indicators around Taiwan (PLA exercises, amphibious-lift production, gray-zone incursions) before and after any Ukraine settlement, and compare against AEI/CSIS China-Taiwan assessments of which lessons Beijing is drawing (operational vs. strategic). Reference the IR literature on credibility (e.g., Daryl Press, 'Calculating Credibility') to weight whether past concessions historically predicted future challenges. This is a probabilistic forecast, not a settleable fact.",
        verification_status: "impossible" as const,
        settle: {
          condition:
            "PLA exercises, amphibious-lift production and gray-zone incursions around Taiwan tracked before and after any Ukraine settlement, read against AEI and CSIS assessments of whether Beijing's lessons are operational or strategic.",
        },
        cost_to_verify:
          "Unbounded — the counterfactual (whether China attacks Taiwan because of a Ukraine deal) cannot be observed; only correlational indicators can be tracked after the fact",
        falsification: {
          supporter_flip:
            "If PLA exercises, amphibious-lift production and gray-zone incursions around Taiwan rose after a settlement at current lines, and assessments found China drawing the strategic lesson that aggression pays, the demonstration effect would be real and a freeze would carry costs far beyond Ukraine.",
          skeptic_flip:
            "If assessments found China drawing mainly operational lessons from Ukraine, as AEI argues for drones, AI and electronic warfare, rather than a strategic green light, and Taiwan's geography and economy kept the cases apart, the emboldening worry would lose much of its force.",
          common_ground:
            "Both sides agree a settlement at current lines would be a frozen, Korea-style armistice without formal resolution rather than a peace treaty.",
          live_disagreement:
            "Whether deterrence is mainly reputational, so a settlement at current lines raises the odds of a Taiwan move in 2027-2030, or mainly situational, so Ukraine's lessons stay local — and whether the pause would hold or let Russia rearm.",
        },
      },
      evidence: [
        {
          id: "haass-kupchan-frozen-conflict",
          title: "Haass and Kupchan: West Should Lay Groundwork for a DMZ Ceasefire",
          description:
            "In Foreign Affairs, Richard Haass and Charles Kupchan argued the West should begin laying the groundwork for a ceasefire, with both sides pulling back to create a demilitarized zone — a Korea-style armistice without formal resolution, indefinite forward deployment of Western weapons (not necessarily troops), and continued non-recognition of de jure annexation. This is the most developed expert case that a managed freeze is the realistic stable equilibrium.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source: "Foreign Affairs (Haass & Kupchan)",
          sourceUrl: "https://www.foreignaffairs.com/ukraine/russia-richard-haass-west-battlefield-negotiations",
          reasoning:
            "Foreign Affairs is the flagship venue and Haass/Kupchan are senior independent strategists. The piece directly substantiates the proponent frozen-conflict model. Replicability is lower because it is a strategic recommendation, not an empirical finding.",
        },
        {
          id: "atlantic-council-unjust-peace",
          title: "Atlantic Council: An Unjust Peace Emboldens China",
          description:
            "The Atlantic Council argued that an unjust peace in Ukraine would embolden China, framing the demonstration effect as a near-axiomatic strategic cost: a settlement read by Beijing as rewarding aggression raises the risk of a Taiwan move. This is the canonical Atlanticist case that the war's ending has global stakes beyond the Ukrainian theater and that conceding now buys a larger future conflict.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 8,
          },
          source: "Atlantic Council",
          sourceUrl: "https://www.atlanticcouncil.org/blogs/new-atlanticist/the-cost-of-an-unjust-peace-in-ukraine-an-emboldened-china/",
          reasoning:
            "The Atlantic Council is a credible but advocacy-leaning think tank (lower independence), and the demonstration effect is a contested forecast (low replicability). It directly states the strongest version of the 'unjust peace has global costs' argument.",
        },
        {
          id: "aei-china-operational-lessons",
          title: "AEI: China's Lessons from Ukraine Are Operational, Not Strategic",
          description:
            "AEI's China-Taiwan Update assessed that the lessons China is drawing from Ukraine are predominantly operational — drones, AI, electronic warfare, logistics — rather than a strategic conclusion that aggression pays. Combined with the restraint-camp argument that Taiwan is geographically and economically unlike Ukraine, this undercuts the reputational-deterrence premise behind the 'unjust peace emboldens China' claim.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "American Enterprise Institute (AEI)",
          sourceUrl: "https://www.aei.org/articles/china-taiwan-update-december-12-2025/",
          reasoning:
            "AEI's tracking is detailed but the institution leans hawkish, making its situational-deterrence read a notable concession in the restraint direction. It directly challenges the demonstration-effect axiom, supporting the proponent view that settling has limited global spillover.",
        },
        {
          id: "putin-stalling-jamestown",
          title: "Jamestown: Putin Is Stalling a Nearly Finished Deal With Maximalist Demands",
          description:
            "In April 2026, Jamestown Foundation analysts argued Putin — not Zelensky — is stalling a deal Zelensky had called 'about 90% ready,' fabricating a Ukrainian drone attack on his residence and weaponizing a Ukrainian corruption scandal to delegitimize Kyiv. Putin's stated demands at that point were maximalist: full withdrawal from all four claimed oblasts, a permanent NATO bar, a capped Ukrainian military, and sanctions relief. This supports the skeptic claim that Russia would not honor a freeze at current lines.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 8,
          },
          source: "Jamestown Foundation; Time",
          sourceUrl: "https://time.com/7379321/ukraine-russia-peace-talks-end-zelensky-trump-clash/",
          reasoning:
            "Jamestown is credible but advocacy-adjacent (moderate independence). The Geneva talks collapsing after two hours amid a Russian missile strike is independently reported by Time. Directly bears on whether Putin would actually freeze at current lines or use a pause to re-attack.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Russian Offensive Campaign Assessment, November 1, 2026 — Institute for the Study of War / Critical Threats",
      url: "https://www.criticalthreats.org/analysis/russian-offensive-campaign-assessment-november-1-2026",
    },
    {
      title: "Russian Offensive Campaign Assessment, October 16, 2026 — Institute for the Study of War / Critical Threats",
      url: "https://www.criticalthreats.org/analysis/russian-offensive-campaign-assessment-october-16-2026",
    },
    {
      title: "Zelensky Reveals New 20-Point Plan to End Ukraine War — The Moscow Times",
      url: "https://www.themoscowtimes.com/2025/12/24/zelensky-reveals-new-20-point-plan-to-end-ukraine-war-a91532",
    },
    {
      title: "The Unfinished Plan for Peace in Ukraine: Provision by Provision — CSIS",
      url: "https://www.csis.org/analysis/unfinished-plan-peace-ukraine-provision-provision",
    },
    {
      title: "Russia in the Occupied Territories of Ukraine — SWP Comment (Nikolay Petrov, September 2024)",
      url: "https://www.swp-berlin.org/publications/products/comments/2024C38_OccupiedTerritoriesUkraine.pdf",
    },
    {
      title: "Russian Military Objectives and Capacity in Ukraine Through 2024 — RUSI (Watling & Reynolds)",
      url: "https://www.rusi.org/explore-our-research/publications/commentary/russian-military-objectives-and-capacity-ukraine-through-2024",
    },
    {
      title: "Russia's Aggression in Ukraine Will Persist Through 2026 — RUSI",
      url: "https://www.rusi.org/explore-our-research/publications/commentary/russias-aggression-ukraine-will-persist-through-2026",
    },
    {
      title: "The Security-Guarantee Paradox — The Conversation",
      url: "https://theconversation.com/the-security-guarantee-paradox-too-weak-and-it-wont-protect-ukraine-too-robust-and-russia-wont-accept-it-263518",
    },
    {
      title: "Rethinking Ukraine's Manpower Challenge — Carnegie Endowment for International Peace",
      url: "https://carnegieendowment.org/research/2026/03/ukraine-military-russia-war-manpower-recruitment",
    },
    {
      title: "The Cost of an Unjust Peace in Ukraine: An Emboldened China — Atlantic Council",
      url: "https://www.atlanticcouncil.org/blogs/new-atlanticist/the-cost-of-an-unjust-peace-in-ukraine-an-emboldened-china/",
    },
    {
      title: "The West Needs a New Strategy in Ukraine — Foreign Affairs (Haass & Kupchan)",
      url: "https://www.foreignaffairs.com/ukraine/russia-richard-haass-west-battlefield-negotiations",
    },
    {
      title: "Frequently Asked Questions About the Russia-Ukraine Negotiations — Quincy Institute",
      url: "https://quincyinst.org/research/frequently-asked-questions-about-the-russia-ukraine-negotiations/",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Can Ukraine plausibly retake its lost territory by force?",
      content:
        "ISW assessments show a front line that moved only marginally through 2026, with Russia losing a net 80.81 square kilometers in September and 27.29 in October. Proponents of a freeze argue Crimea and the Donbas cannot be liberated on any feasible time horizon, so refusing to ratify de facto control only prolongs the killing. Skeptics counter that Russia's stored Soviet-era armor is running down (a 2024 RUSI forecast had most of it exhausted by 2026) and its recruitment is strained, making patience rational. Which trajectory is the war actually on?",
    },
    {
      id: "q2",
      title: "Is there any security guarantee that is both deterrent-grade and acceptable to Russia?",
      content:
        "At the January 2026 Paris talks European officials floated a 15,000-20,000-strong multinational force, but Russia has flatly rejected any NATO troops in Ukraine. This is the security-guarantee paradox: guarantees weak enough for Russia to accept won't deter, and guarantees strong enough to deter won't be accepted. The 2014-2022 precedent shows weak guarantees failed to prevent a larger war. Does a workable middle ground exist, or does this dilemma make a durable deal unsignable?",
    },
    {
      id: "q3",
      title: "Would a settlement at current lines embolden China over Taiwan?",
      content:
        "Atlanticists treat the demonstration effect as near-axiomatic: conceding in Ukraine teaches Beijing that aggression pays. The restraint camp argues Taiwan is geographically and economically nothing like Ukraine, and that China's lessons are operational rather than strategic. This is the reputational-vs-situational deterrence debate, and it determines whether an 'unjust peace' carries global costs or is contained to the Ukrainian theater — a forecast that cannot be settled before the fact.",
    },
  ],
};
