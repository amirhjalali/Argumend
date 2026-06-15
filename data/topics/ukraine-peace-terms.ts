import type { Topic } from "@/lib/schemas/topic";

export const ukrainePeaceTermsData = {
  id: "ukraine-peace-terms",
  title: "How the Russia-Ukraine War Should End",
  meta_claim:
    "A negotiated settlement that freezes the war along current lines — ratifying territorial reality, barring NATO membership, and lifting sanctions — would end the killing on acceptable terms, rather than rewarding aggression and inviting a future Russian attack.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Territorial Concessions vs. Sovereignty
    // =========================================================================
    {
      id: "territorial-concessions",
      title: "Territorial Concessions vs. Sovereignty",
      short_summary:
        "The Trump-brokered peace framework would freeze the front line and treat Crimea, Luhansk, and Donetsk as de facto Russian, while Ukraine insists any concession rewards aggression and requires a national referendum. The dispute turns on whether ratifying battlefield reality buys durable peace or merely buys time before the next invasion.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Ceding territory under duress rewards aggression and sets a catastrophic precedent. The original 28-point plan recognized Crimea, Luhansk, and Donetsk as 'de facto Russian, including by the United States' and demanded Ukraine withdraw from unoccupied parts of Donetsk it still holds — handing Russia land it never conquered. Roughly 4 million Ukrainians live in occupied territories that would be surrendered. Zelensky has said any territorial settlement requires a national referendum because no leader can constitutionally sign away sovereign land. An unjust peace is also an existential threat to Poland and the Baltics, who see themselves as the next dominoes.",
      proponent_rebuttal:
        "The front line has barely moved in months and Ukraine cannot realistically retake Crimea or the Donbas by force on any feasible time horizon — the maps make this plain. Continuing to fight for territory that cannot be liberated only adds to the 80,000-110,000 Ukrainian dead and the acute manpower crisis. Ratifying de facto control without de jure recognition of Russian sovereignty — the Korea-style armistice model — stops the killing while preserving Ukraine's legal claim. The December 2025 Miami revisions stripped the most overtly pro-Russian provisions, including the forced withdrawal from unoccupied Donetsk, converting the plan into a more balanced 20-point framework.",
      crux: {
        id: "line-of-contact-feasibility",
        title: "The Battlefield Reversibility Test",
        description:
          "The core question is whether Ukraine can plausibly restore its 1991 borders by force, or whether the front line is effectively frozen. If ISW control-of-terrain data shows the line is static and neither side can achieve operational breakthroughs, then refusing to ratify de facto control prolongs a war that cannot change the territorial outcome. If Russia's offensive capacity is genuinely collapsing, holding out for better terms is rational.",
        methodology:
          "Compile ISW daily Russian Offensive Campaign Assessments over a rolling 12-month window, measuring net territorial change in square kilometers per month against Russian casualty and equipment-loss rates. Cross-reference with RUSI assessments of Russian armored-vehicle production (refurbishment vs. new build) and depot depletion forecasts to project whether the attrition curve crosses in Ukraine's favor before Ukrainian manpower is exhausted.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$0 (ISW and RUSI assessments are public; the forecast itself is contested and cannot be settled before the fact)",
      },
      evidence: [
        {
          id: "isw-stalemate-april-2026",
          title: "Front Line Barely Moved for Months; Russian Spring Offensive 'Underwhelming'",
          description:
            "As of late April 2026, ISW's daily campaign assessments describe a frontline that has barely moved in months. On April 27, neither side made confirmed advances. The Russian spring 2026 offensive that Western planners feared was characterized by ISW analysts as 'underwhelming' — heavy assault tempo and high Russian casualties for almost no operationally meaningful terrain. This stalemate underpins the argument that the territorial outcome cannot be reversed by force.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source: "Institute for the Study of War (ISW) via Kyiv Post; Critical Threats",
          sourceUrl: "https://www.criticalthreats.org/analysis/russian-offensive-campaign-assessment-april-27-2026",
          reasoning:
            "ISW's control-of-terrain assessments are the gold-standard, independently reproducible daily record of the front. A months-long stalemate supports the proponent claim that ratifying de facto lines reflects military reality. But the same data is cited by hawks as proof Russia 'cannot break through,' so it is genuinely double-edged.",
        },
        {
          id: "28-point-plan-recognition",
          title: "Original 28-Point Plan Recognized Occupied Territory as 'De Facto Russian'",
          description:
            "The November 2025 Witkoff-Dmitriev 28-point plan recognized Crimea, Luhansk, and Donetsk as 'de facto Russian, including by the United States,' froze Kherson and Zaporizhzhia along the line of contact, and required Ukraine to withdraw from unoccupied parts of Donetsk it still controls. This would have surrendered land Russia never conquered and that roughly 4 million Ukrainians inhabit, which skeptics cite as proof the framework rewards aggression.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 9,
          },
          source: "CNN; NBC News; CSIS provision-by-provision analysis",
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
            "Zelensky's referendum position is well-documented but is a party to the dispute, lowering independence. It directly addresses the sovereignty pillar: it establishes a constitutional barrier to ceding territory that is independent of military feasibility, complicating any imposed settlement.",
        },
        {
          id: "miami-revisions-20-point",
          title: "December 2025 Miami Talks Stripped Most Pro-Russian Provisions",
          description:
            "After the December 2025 Zelensky-Trump meeting in Miami, Ukraine succeeded in stripping the most overtly pro-Russian provisions from the 28-point plan — including the forced withdrawal from unoccupied Donetsk — and converting it into a 20-point framework. European, US, and Ukrainian officials subsequently described the deal as '90 percent complete,' suggesting a settlement that ratifies de facto control without the most punitive terms is negotiable.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "CSIS; NPR; CNN",
          sourceUrl: "https://www.csis.org/analysis/will-trumps-peace-plan-ukraine-succeed",
          reasoning:
            "CSIS analysis of the revised framework is independent and credible. The successful removal of the worst provisions supports the proponent claim that a balanced deal exists. Weighted down on replicability because '90 percent complete' is an official characterization that the Kremlin's maximalist demands contradict.",
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
        "Any settlement must answer what stops Russia from attacking again. The Paris talks floated a UK-French 'coalition of the willing' tripwire force, but Russia flatly rejects any NATO troops in Ukraine — producing a security-guarantee paradox: guarantees weak enough for Russia to accept won't deter, and guarantees strong enough to deter won't be accepted.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "A permanent NATO bar plus a capped Ukrainian military leaves Ukraine defenseless against a regime that has shown it will re-attack. Putin's Foreign Ministry has flatly ruled out NATO troops in Ukraine, and any guarantee Russia will accept is by definition too weak to deter. Without a credible Western tripwire, an armistice becomes a rearm-and-relaunch runway: Russia uses the pause to reconstitute its forces and invades again in five years, exactly as it did between 2014 and 2022. A deal Russia rejects is better than a deal Ukraine cannot survive.",
      proponent_rebuttal:
        "Permanent NATO membership for Ukraine was always a core driver of Russian security fears and is not worth a nuclear confrontation; ruling it out removes Moscow's central casus belli. Credible deterrence does not require NATO Article 5 — the January 2026 Paris coalition-of-the-willing offers UK and French 'military hubs' and a 15,000-20,000 European tripwire force, plus heavy continued Western armament of unoccupied Ukraine. This is the Korea model: no formal alliance membership, but a forward-deployed deterrent and an indefinitely armed Ukraine. A deal structured with credible tripwires and a Russian sanctions-relief incentive can be made to hold.",
      crux: {
        id: "security-guarantee-paradox",
        title: "The Security-Guarantee Paradox",
        description:
          "The decisive question is whether any security guarantee exists that is simultaneously (a) strong enough to deter a future Russian attack and (b) acceptable to Russia as part of a deal. If the two sets are disjoint — every Russia-acceptable guarantee is too weak, every deterrent-grade guarantee is Russia-rejected — then no negotiated settlement can be both durable and signable, and the war ends only on the battlefield.",
        methodology:
          "Map the spectrum of proposed guarantees (bilateral arms supply, European tripwire force, NATO membership, Article 5) against two independent assessments: Russian stated red lines (Foreign Ministry and Putin statements) for acceptability, and military-balance analysis (RUSI, ISW) for deterrent credibility. Identify whether any point on the spectrum satisfies both. Stress-test against the 2014-2022 precedent, where the Minsk agreements' weak guarantees failed to prevent full-scale invasion.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1M (Structured net-assessment and red-line analysis; the underlying question is a forecast about Russian intent that cannot be fully resolved in advance)",
      },
      evidence: [
        {
          id: "paris-tripwire-force",
          title: "Paris Talks: UK-France Commit to Military Hubs and a 15-20K Tripwire Force",
          description:
            "The January 2026 Paris talks added a coalition-of-the-willing security-guarantee layer. The UK and France committed to establishing 'military hubs' in Ukraine, with France's Camille Grand floating a 15,000-20,000-strong European tripwire force deployed in unoccupied Ukraine. Proponents cite this as a credible non-NATO deterrent that could make a settlement durable without triggering Russian objections to alliance membership.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "NPR; CNN",
          sourceUrl: "https://www.cnn.com/2026/01/06/europe/uk-france-troops-ukraine-russia-peace-deal-latam-intl",
          reasoning:
            "Reported by multiple independent outlets covering the Paris talks. It directly addresses how a settlement could be deterrence-backed without NATO membership. Weighted down on replicability because a floated troop number is a negotiating proposal, not a deployed force, and remains contingent on Russian acceptance.",
        },
        {
          id: "russia-rejects-nato-troops",
          title: "Russia Flatly Rejects Any NATO Troops in Ukraine",
          description:
            "Russia's Foreign Ministry has stated that NATO troops in Ukraine are unacceptable, and Putin has personally ruled out any such deployment. Because the UK-French tripwire force is precisely the kind of guarantee strong enough to deter, its categorical rejection by Moscow substantiates the skeptic claim that no deterrent-grade guarantee is signable — the security-guarantee paradox in operation.",
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
            "Independent analysis summarized the structural dilemma: guarantees weak enough for Russia to accept won't protect Ukraine, while guarantees robust enough to deter won't be accepted by Russia. This framing captures why the security question, not territory, may be the binding constraint on any durable deal — and why both the tripwire and the NATO bar are individually insufficient.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "The Conversation",
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
        "Whether to lift sanctions as part of a deal hinges on whether Russia can sustain another year of attrition. RUSI says Russian armored stocks and recruitment are depleting toward a late-2026 crossover; the restraint camp says an autocracy can absorb pain Ukraine cannot — and Russia has evaded sanctions throughout.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Lifting sanctions and freezing the war now throws away leverage at the exact moment Russia is breaking. RUSI assesses that roughly 80% of Russian armored-vehicle output is refurbishment of Soviet-era stock, with depots substantially depleted by end-2026, after which Russian combat power 'materially degrades.' Recruitment fell 20% in Q1 2026 to roughly 800 sign-ups per day even as bonuses spiked, and for the first time Russia is losing more soldiers than it recruits. Sweden's intelligence service says Russia is faking macro data to appear more resilient than it is. Russia must lose decisively, or Beijing, Tehran, and Pyongyang learn that aggression pays.",
      proponent_rebuttal:
        "Willingness, not capability, is the dominant variable — a Russian autocracy can absorb casualties and economic pain that a democratic Ukraine cannot, and Ukrainian manpower is the binding constraint, not Russian matériel. Sanctions have not coerced Russia despite years of maximum pressure; using sanctions relief as an incentive is the only lever that makes a durable deal attractive to Moscow. Betting Ukrainian lives on a forecast that Russia's attrition curve crosses 'in late 2026' is reckless when that prediction has been made and missed before. Stop treating sanctions relief as a bargaining chip to be withheld and use it to buy peace.",
      crux: {
        id: "russian-attrition-crossover",
        title: "The Attrition-Crossover Forecast",
        description:
          "The highest-leverage empirical disagreement: can Russia sustain another year of offensive attrition, or does its combat power materially degrade in late 2026? If Russian armored stocks, recruitment, and fiscal capacity are genuinely crossing a depletion threshold, withholding sanctions relief and continuing to arm Ukraine extracts better terms. If Russian willingness dominates and the autocracy can outlast Ukrainian manpower, prolonging the war only raises the body count without improving the outcome.",
        methodology:
          "Track three time series against each other: (1) Russian armored-vehicle availability — new build vs. refurbishment vs. depot drawdown (RUSI, satellite imagery of storage bases); (2) monthly Russian recruitment net of casualties (Janis Kluge's sign-up data, Mediazona confirmed KIA, Ukraine MoD high estimates, each with stated methodology); (3) Russian fiscal stress and real inflation (Bank of Russia data cross-checked against Sweden's MUST and BOFIT independent estimates). Identify whether the depletion threshold is crossed before Ukrainian manpower is exhausted.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$1-2M (Multi-source intelligence fusion and forecasting; the crossover date is a contested prediction that resolves only as it occurs)",
      },
      evidence: [
        {
          id: "rusi-depot-depletion",
          title: "RUSI: ~80% of Russian Armor Is Refurbishment; Depots Depleted by End-2026",
          description:
            "RUSI assessments find that roughly 80% of Russian armored-vehicle output is refurbishment of Soviet-era stock rather than new production, and that storage depots will be substantially depleted by the end of 2026, after which Russian combat power 'materially degrades.' RUSI's 2026 commentaries are titled around Russia 'losing' and facing a 2026 attrition crossover. This is the empirical core of the case for maintaining pressure rather than settling now.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "Royal United Services Institute (RUSI)",
          sourceUrl: "https://www.rusi.org/explore-our-research/publications/commentary/russias-aggression-ukraine-will-persist-through-2026",
          reasoning:
            "RUSI is an independent, methodologically transparent defense institute and its depot estimates are partly satellite-verifiable. It directly addresses the capability crux and supports the continue-fighting position. Coded 'against' the negotiate-now meta-claim because it implies leverage is increasing.",
        },
        {
          id: "recruitment-fell-20-percent",
          title: "Russian Recruitment Fell 20% in Q1 2026 Despite Spiking Bonuses",
          description:
            "Russian recruitment fell roughly 20% in Q1 2026 to about 800 sign-ups per day, even as regional sign-on bonuses rose to a median of 1.55 million rubles (~$20K). The Telegraph reported that for the first time in the war Russia was losing more soldiers (~40,000/month) than it could recruit (~35,000 contract signings). This trend is cited as evidence Russia's manpower model is reaching its limits.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Janis Kluge (SWP) Substack; The Moscow Times; The Telegraph",
          sourceUrl: "https://janiskluge.substack.com/p/russian-recruitment-fell-by-20-in",
          reasoning:
            "Kluge's quantitative recruitment tracking is well-regarded and partly cross-checkable against regional bonus data. The casualty-vs-recruitment comparison relies on contested loss estimates, lowering replicability. Directly bears on whether Russia can sustain the fight.",
        },
        {
          id: "willingness-dominates-capability",
          title: "Restraint Camp: Russian Willingness Outlasts Ukrainian Manpower",
          description:
            "The restraint camp counters that Russia's autocracy can absorb pain Ukraine cannot, making willingness — not capability — the dominant variable. Carnegie's March 2026 study described Ukraine's manpower problem as 'increasingly acute': frontline shortages, plummeting voluntary recruitment, record AWOL rates, and public weariness. Ukraine needs roughly 30,000 conscripts per month to hold the line, and Zelensky has resisted lowering the draft age to 18. If Ukrainian manpower fails first, prolonging the war worsens Ukraine's position.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Carnegie Endowment for International Peace",
          sourceUrl: "https://carnegieendowment.org/research/2026/03/ukraine-military-russia-war-manpower-recruitment",
          reasoning:
            "Carnegie's manpower study is independent and rigorous, directly addressing the symmetric question of whether Ukraine can outlast Russia. It substantiates the negotiate-now claim that time is not on Ukraine's side, balancing the RUSI/Kluge attrition evidence.",
        },
        {
          id: "sweden-faked-data",
          title: "Sweden's Intelligence: Russia Faking Macro Data to Appear More Resilient",
          description:
            "In April 2026, Sweden's military intelligence service (MUST) publicly claimed Russia is faking macroeconomic data to appear more resilient to sanctions and war than it is, with real inflation tracking closer to the 15% policy rate than the official 5.86%. Independent estimates from BOFIT and Re:Russia corroborate significant fiscal stress, suggesting sanctions are working and relief should not be conceded prematurely.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Euronews; Sweden MUST; BOFIT",
          sourceUrl: "https://www.euronews.com/my-europe/2026/04/21/russia-faked-economic-data-to-appear-more-resilient-to-its-war-and-sanctions-intel-report-",
          reasoning:
            "An intelligence-agency claim is harder to independently verify (lower replicability) but is corroborated by independent economists at BOFIT and Re:Russia. It supports the argument that sanctions leverage is real and undermines the case for lifting sanctions in a settlement.",
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
        description:
          "Does a negotiated settlement at current lines raise or lower the probability of a Chinese move on Taiwan in 2027-2030? This turns on whether deterrence is dominantly reputational — a signal that travels across cases, so conceding in Ukraine invites aggression elsewhere — or situational, specific to local military and economic balances. The crux is a long-running international-relations dispute that maps directly onto whether 'unjust peace' carries global costs or is contained to the Ukrainian theater.",
        methodology:
          "Operationalize the reputational-vs-situational debate: track Chinese military posture indicators around Taiwan (PLA exercises, amphibious-lift production, gray-zone incursions) before and after any Ukraine settlement, and compare against AEI/CSIS China-Taiwan assessments of which lessons Beijing is drawing (operational vs. strategic). Reference the IR literature on credibility (e.g., Daryl Press, 'Calculating Credibility') to weight whether past concessions historically predicted future challenges. This is a probabilistic forecast, not a settleable fact.",
        verification_status: "impossible" as const,
        cost_to_verify:
          "Unbounded — the counterfactual (whether China attacks Taiwan because of a Ukraine deal) cannot be observed; only correlational indicators can be tracked after the fact",
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
          title: "Jamestown: Putin Is Stalling a '90%-Complete' Deal With Maximalist Demands",
          description:
            "As of April 2026, Jamestown Foundation analysts argued Putin — not Zelensky — is stalling a deal described as '90 percent complete,' fabricating a Ukrainian drone attack on his residence and weaponizing a Ukrainian corruption scandal to delegitimize Kyiv. Putin's stated demands remain maximalist: full withdrawal from all four claimed oblasts, a permanent NATO bar, a capped Ukrainian military, and sanctions relief. This supports the skeptic claim that Russia would not honor a freeze at current lines.",
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
      title: "Russian Offensive Campaign Assessment — Institute for the Study of War / Critical Threats",
      url: "https://www.criticalthreats.org/analysis/russian-offensive-campaign-assessment-april-19-2026",
    },
    {
      title: "The Unfinished Plan for Peace in Ukraine: Provision by Provision — CSIS",
      url: "https://www.csis.org/analysis/unfinished-plan-peace-ukraine-provision-provision",
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
        "ISW assessments show a front line that has barely moved in months, and Russia's 2026 spring offensive was 'underwhelming.' Proponents of a freeze argue Crimea and the Donbas cannot be liberated on any feasible time horizon, so refusing to ratify de facto control only prolongs the killing. Skeptics counter that Russia's armored stocks and recruitment are depleting toward a late-2026 crossover, making patience rational. Which trajectory is the war actually on?",
    },
    {
      id: "q2",
      title: "Is there any security guarantee that is both deterrent-grade and acceptable to Russia?",
      content:
        "The Paris talks floated a 15,000-20,000 European tripwire force, but Russia has flatly rejected any NATO troops in Ukraine. This is the security-guarantee paradox: guarantees weak enough for Russia to accept won't deter, and guarantees strong enough to deter won't be accepted. The 2014-2022 precedent shows weak guarantees failed to prevent a larger war. Does a workable middle ground exist, or does this dilemma make a durable deal unsignable?",
    },
    {
      id: "q3",
      title: "Would a settlement at current lines embolden China over Taiwan?",
      content:
        "Atlanticists treat the demonstration effect as near-axiomatic: conceding in Ukraine teaches Beijing that aggression pays. The restraint camp argues Taiwan is geographically and economically nothing like Ukraine, and that China's lessons are operational rather than strategic. This is the reputational-vs-situational deterrence debate, and it determines whether an 'unjust peace' carries global costs or is contained to the Ukrainian theater — a forecast that cannot be settled before the fact.",
    },
  ],
};
