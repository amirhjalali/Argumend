export const policeReformData = {
  id: "police-reform",
  title: "Policing Reform in America",
  question: "Can America cut police violence without letting crime rise?",
  meta_claim:
    "US cities can reduce killings and other harms by police, through accountability, limits on force and non-police responders, without giving up the gains against violent crime.",
  status: "contested" as const,
  category: "policy" as const,
  // As of 3 November 2026: Mapping Police Violence counted at least 1,314
  // people killed by police in 2025, down 5% from 2024 and the first drop in
  // six years; big-city homicide fell 21% in 2025 and 18% more in the first
  // half of 2026 (CCJ); the Justice Department dropped its Minneapolis and
  // Louisville cases and six investigations on 21 May 2025.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "In 2025 US police killed at least 1,314 people, the first year-on-year drop in six years, by Mapping Police Violence's count. The same year, homicide in large cities fell 21%, and it fell 18% more in the first half of 2026. Both sides accept those numbers. The fight is over whether the country can keep pushing police killings down without losing that progress on crime.",
    confidence: 85,
    source:
      "Mapping Police Violence / Campaign Zero, 'U.S. Police Violence in 2025' (February 2026); Council on Criminal Justice, year-end 2025 and mid-year 2026 crime trends",
    sourceUrl: "https://www.mappingpoliceviolence.org/files/mpv-year-end-report-2025.pdf",
  },
  simple_case: [
    "The answer shapes who a city sends to a mental-health or homelessness call, how many officers it hires, what officers are held to when they use force, and whether Washington oversees local departments.",
    "In 2025 the federal government stepped back from that oversight, while New York's new mayoral administration weighed whether to expand its unarmed crisis teams, possibly into a new Department of Community Safety.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: How much force, and do accountability tools reduce it?
    // =========================================================================
    {
      id: "use-of-force-accountability",
      title: "Police Killings: How Many, and Can Accountability Cut Them?",
      short_summary:
        "US police kill about 1,300 people a year, far more per head than other rich democracies, and Black Americans at 2.6 times the white rate. About three in four of those killed were allegedly armed. Whether body cameras, oversight and prosecutions reduce force, and what share of killings is avoidable, is the first split.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Most people police kill were armed and dangerous, and the tools sold as accountability have not been shown to reduce force. In 2025, 76% of those killed by police were allegedly armed and an estimated 52% had a gun, by the reform group Mapping Police Violence's own count. Officers work in a country with more guns than people: 53 officers were feloniously killed in 2025, and agencies reported more than 90,000 assaults on officers, 13.8 per 100 officers, the highest rate in at least ten years. International comparisons ignore that armed population. A 2020 Campbell review of 30 body-camera studies found 'insufficient' evidence that cameras reduce officer use of force; the famous Rialto drop did not hold up in a 2,224-officer Washington, DC trial.",
      proponent_rebuttal:
        "US police kill people at many times the rate of other rich countries, and much of that is not about armed suspects. In 2025 at least 1,314 people were killed; 22% were unarmed, one in five showed signs of a mental health crisis, and two-thirds of all killings began with a call for service rather than a crime in progress. Per capita, US police killed about 33 people per 10 million residents in 2019 in the Prison Policy Initiative's comparison, roughly 25 times Germany's rate and 67 times England and Wales'. Black Americans were killed at 2.6 times the white rate. The share of killings in which officers were charged rose between 2019 and 2023, to about 4% by the group's count, and 2025 was the first year since 2019 that killings fell, which reformers credit to that scrutiny. Body cameras alone are not the answer, but they cut citizen complaints by about 17% in the Campbell review, and accountability is a system, not one gadget.",
      crux: {
        id: "accountability-use-of-force-link",
        title: "The Accountability Test",
        question:
          "Do body cameras, oversight and prosecutions reduce police use of force without raising officer risk?",
        description:
          "Measure whether departments that adopt specific accountability measures (cameras with enforced activation, civilian oversight with subpoena power, restrictive force policies, independent prosecutors) see fewer uses of force and police killings than matched departments, without more injuries to officers.",
        methodology:
          "Randomised or staggered-adoption studies across many departments, counting use-of-force incidents, police killings, complaints, crime and officer injuries, with incident-level data that records whether the person was armed and how the encounter began.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Staggered-adoption studies of cameras, oversight boards and restrictive force policies across dozens of departments, counting use-of-force incidents, killings, complaints, crime and officer injuries, at larger scale than the roughly 2,200-officer Washington, DC camera trial.",
        },
        cost_to_verify: "$5M (Multi-city randomized controlled trial)",
        falsification: {
          supporter_flip:
            "If large multi-department studies kept finding that cameras, oversight boards and restrictive force policies leave use of force and killings unchanged, as the Washington, DC camera trial did, the case that accountability reform reduces police violence would weaken.",
          skeptic_flip:
            "If departments that adopted restrictive force policies and independent review saw fewer killings of unarmed people than matched departments, with no rise in officer injuries or crime, the view that most killings are unavoidable would be hard to hold.",
          common_ground:
            "Both sides agree US police killed at least 1,314 people in 2025, most of them allegedly armed, and that the largest body-camera trials found no clear effect on use of force.",
          live_disagreement:
            "What share of police killings could have been avoided, and whether accountability measures cut that share, or whether the gap with peer nations reflects an armed population more than a system that shields misconduct.",
        },
      },
      evidence: [
        {
          id: "pr-mapping-police-violence",
          title: "Mapping Police Violence 2025: 1,314 Killed, 22% Unarmed, Black Americans at 2.6 Times the White Rate",
          description:
            "Police killed at least 1,314 people in the US in 2025, a 5% decrease from 2024 (1,383) and the first decline in six years. About 22% of those killed were unarmed by the group's definition, 76% were allegedly armed and an estimated 52% were armed with a firearm. One in five showed symptoms of mental or behavioural health issues, and two-thirds of killings followed a call for service. Black people were 2.6 times as likely as white people to be killed. The share of killings in which officers were charged with a crime rose between 2019 and 2023; earlier estimates put it at about 2%, and the group's data now show it closer to 4%.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 8,
          },
          source: "Mapping Police Violence / Campaign Zero, 'U.S. Police Violence in 2025: Year-end Report' (February 2026)",
          sourceUrl: "https://www.mappingpoliceviolence.org/files/mpv-year-end-report-2025.pdf",
          reasoning:
            "The most complete count, built from news reports and public records because there is no full official database. Campaign Zero is a reform advocacy group and its definition of 'unarmed' includes people holding toy guns and motorists killed in pursuits. The same report supplies the skeptic's key fact: three in four of those killed were allegedly armed.",
        },
        {
          id: "pr-international-comparison",
          title: "Prison Policy Initiative: US Police Kill 33 per 10 Million, 25 Times Germany's Rate",
          description:
            "Using 2019 US data, US police killed civilians at about 33.5 per 10 million people: about 4x the rate in Australia, 25x Germany, 67x England and Wales, and over 150x Japan (Prison Policy Initiative compilation of national statistics, mostly 2017-2019). The gap with peer democracies is large, though the multiple varies widely by comparison country.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "Prison Policy Initiative (2020), compiling national police-killing statistics",
          sourceUrl: "https://www.prisonpolicy.org/blog/2020/06/05/policekillings/",
          reasoning:
            "Cross-national rates are well documented, but countries count differently and the US has far more armed civilians, which raises the danger officers face. The multiple ranges from about 4 (Australia) to over 150 (Japan), so no single figure describes the gap.",
        },
        {
          id: "pr-body-camera-rct",
          title: "Campbell Review of 30 Studies: 'Insufficient' Evidence Body Cameras Reduce Force; Complaints Fell 17%",
          description:
            "A 2020 Campbell systematic review by Cynthia Lum, Christopher Koper and colleagues pooled 30 studies of police body-worn cameras. It concluded 'the current evidence is insufficient for concluding that BWCs reduce officer use of force' (pooled change −6.8%, confidence interval −19.5% to +7.9%), while finding cameras can reduce citizen complaints (−16.6%). Overall, cameras 'do not have clear or consistent effects on most officer or citizen behaviors.' The early Rialto, California trial had reported a large drop in force; the much larger Washington, DC trial of 2,224 officers (Yokum et al., 2019) found 'very small and statistically insignificant effects on police use of force and civilian complaints.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Lum, Koper, Wilson et al., 'Body-worn cameras' effects on police officers and citizen behavior: A systematic review,' Campbell Systematic Reviews 16(3) (2020)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8356344/",
          reasoning:
            "The best summary of the most widely adopted accountability tool, and it is sobering for reformers. It tests cameras as used, not cameras with enforced activation and discipline, and it says nothing about other measures such as restrictive force policies or prosecutions.",
        },
        {
          id: "pr-officer-assaults-2025",
          title: "FBI 2025: 53 Officers Feloniously Killed, Assault Rate Highest in 10 Years",
          description:
            "In 2025, 53 officers were feloniously killed in the line of duty, 43 of them with firearms, down 17% from 2024 and the lowest number since 2017. Agencies reported 90,178 assaults on officers, 13.8 per 100 officers, 'the highest officer assault rate in the past 10 years.' Officers assaulted and injured by firearms fell for a second year, to 445.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source:
            "FBI, 'Officers Killed and Assaulted in the Line of Duty, 2025' special report, press release (11 May 2026); FedAgent (May 2026) for the firearm count and trend",
          sourceUrl:
            "https://www.fbi.gov/news/press-releases/fbi-releases-officers-killed-and-assaulted-in-the-line-of-duty-2025-special-report-and-law-enforcement-employee-counts",
          reasoning:
            "Shows the danger officers face and why force policies that ask them to wait or retreat carry a cost. It does not show that any given killing was necessary, and officer deaths fell in 2025 even as police killings also fell.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: When police are scrutinised, do they pull back?
    // =========================================================================
    {
      id: "scrutiny-and-crime",
      title: "When Police Are Scrutinized, Do They Pull Back?",
      short_summary:
        "After viral killings and federal investigations, some departments stopped stopping people, and homicide rose. Other investigations were followed by less crime. In May 2025 the Justice Department dropped its Minneapolis and Louisville cases. Whether scrutiny itself costs lives, or only the way it lands, is the second split.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Scrutiny that lands on the street as fear gets people killed. Economists Tanaya Devi and Roland Fryer found that federal and state pattern-or-practice investigations launched after a viral police killing were followed by almost 900 excess homicides and almost 34,000 excess felonies. Police-civilian contact in Chicago fell almost 90% in the month after its investigation was announced. Some cities that cut police budgets in 2020 began reversing course within a year as violence rose: Minneapolis cut $7.8 million and then put $6.4 million back to hire officers. Consent decrees cost millions of dollars, run for a decade or more and, in the words of the Justice Department's civil rights chief in May 2025, amounted to 'micromanagement' of local police based on 'factually unjustified' findings. Reform that drives officers off the job or into passivity hurts most the neighbourhoods with the most violence.",
      proponent_rebuttal:
        "The pullback is a choice police make, not a law of nature, and accountability done steadily does not raise crime. The same Devi and Fryer study found that federal investigations not triggered by a viral incident were followed, on average, by a statistically significant fall in homicides and total crime. The 2020 murder spike hit cities that cut police budgets and cities that did not. And the best recent test cuts against the trade-off: in 2025, police killings fell for the first time in six years, officers were being charged more often than before 2019, and homicide in large cities fell 21%. The Justice Department's May 2025 retreat from oversight in Minneapolis, Louisville, Phoenix, Memphis and four other places removed federal checks on departments its own career lawyers had found violating the Constitution.",
      crux: {
        id: "scrutiny-pullback",
        title: "The Pullback Test",
        question:
          "After a viral police killing or a federal investigation, do officers pull back, and does crime rise as a result?",
        description:
          "Compare crime and police activity (stops, arrests, response times) before and after investigations, consent decrees and viral incidents, against matched cities, separating investigations that followed a viral video from those that did not.",
        methodology:
          "Event studies of pattern-or-practice investigations and consent decrees, 1994-2025, with monthly police activity and crime data; and a before-and-after comparison of the eight jurisdictions where the Justice Department closed investigations or dropped cases in May 2025.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Monthly stops, arrests and crime in the cities where the Justice Department dropped cases or closed investigations in May 2025, compared with cities still under federal or state oversight, over 2025 to 2027, alongside new event studies of investigations that did and did not follow a viral video.",
        },
        cost_to_verify: "$100K-$300K (public crime data; police activity data by request)",
        falsification: {
          supporter_flip:
            "If cities released from federal oversight in 2025 saw crime fall faster than cities still under it, and new studies found crime rising after investigations even without a viral video, the case that accountability costs nothing in safety would weaken.",
          skeptic_flip:
            "If cities still under oversight kept pace on crime with those released from it, and police activity held steady through new investigations, the view that scrutiny itself drives a deadly pullback would be hard to hold.",
          common_ground:
            "Both sides agree that after some viral killings and investigations police activity dropped sharply, as in Chicago after its federal investigation was announced, and that the 2020 murder rise hit cities that did and did not cut police budgets.",
          live_disagreement:
            "Whether the pullback is caused by accountability itself or by how it is imposed and how officers respond, and whether federal oversight of local departments is a check worth its cost or an intrusion that local control does better.",
        },
      },
      evidence: [
        {
          id: "devi-fryer-non-viral",
          title: "Devi and Fryer 2020: Investigations Without a Viral Incident Were Followed by Less Crime",
          description:
            "Studying federal and state pattern-or-practice investigations of police departments, Tanaya Devi and Roland Fryer found that investigations not preceded by a viral deadly-force incident led, on average, to a statistically significant reduction in homicides and total crime.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 7,
          },
          source:
            "Tanaya Devi and Roland G. Fryer Jr., 'Policing the Police: The Impact of \"Pattern-or-Practice\" Investigations on Crime,' NBER Working Paper 27324 (June 2020)",
          sourceUrl: "https://www.nber.org/papers/w27324",
          reasoning:
            "From the same study skeptics cite, so it rules out the claim that oversight always raises crime. The paper is a working paper, the number of investigations is small, and the abstract gives no size for this effect.",
        },
        {
          id: "pr-killings-and-murder-fell-2025",
          title: "2025: Police Killings Fell 5% While Big-City Homicide Fell 21%",
          description:
            "Mapping Police Violence counted at least 1,314 people killed by police in 2025, down 5% from 2024 and the first decline in six years. The Council on Criminal Justice found the average homicide rate in its 35 study cities fell 21% from 2024 to 2025, and fell another 18% in the first half of 2026.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 4,
          },
          source:
            "Mapping Police Violence, 2025 Year-end Report (February 2026); Council on Criminal Justice, 'Crime Trends in U.S. Cities: Year-End 2025 Update' (January 2026)",
          sourceUrl: "https://counciloncj.org/crime-trends-in-u-s-cities-year-end-2025-update/",
          reasoning:
            "One year in which both numbers fell together shows the trade-off is not fixed. It shows no causal link either way: neither source attributes the changes to any policy, and CCJ says its report is not evidence of a policy's success or failure.",
        },
        {
          id: "devi-fryer-viral",
          title: "Devi and Fryer 2020: Investigations After Viral Killings Followed by ~900 Excess Homicides",
          description:
            "Investigations preceded by a viral incident of deadly force led to a large, statistically significant increase in homicides and total crime: almost 900 excess homicides and almost 34,000 excess felonies, by the authors' estimate. The leading explanation was an abrupt drop in policing: police-civilian interactions fell almost 90% in Chicago in the month after its investigation was announced, 54% in Riverside, California, and self-initiated police activity fell 46% in St. Louis.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 8,
          },
          source:
            "Tanaya Devi and Roland G. Fryer Jr., 'Policing the Police: The Impact of \"Pattern-or-Practice\" Investigations on Crime,' NBER Working Paper 27324 (June 2020)",
          sourceUrl: "https://www.nber.org/papers/w27324",
          reasoning:
            "The strongest evidence that scrutiny can cost lives, through police pulling back. It rests on a small number of investigations, and it is hard to separate the investigation from the viral incident and protests that came before it.",
        },
        {
          id: "doj-drops-decrees-2025",
          title: "Justice Department, May 2025: Minneapolis and Louisville Cases Dropped, Six Investigations Closed",
          description:
            "On 21 May 2025 Harmeet Dhillon, head of the Civil Rights Division, announced plans to dismiss the lawsuits against the Minneapolis and Louisville police departments, retract the earlier findings of constitutional violations, and close investigations into Phoenix, Trenton, Memphis, Mount Vernon (New York), Oklahoma City and the Louisiana State Police. She called the consent decrees 'micromanagement' based on 'factually unjustified' findings, with potential compliance costs in the millions of dollars, and said Minneapolis's court-ordered agreement with the Minnesota Department of Human Rights 'is more than sufficient.' Kristen Clarke, who led the division under President Biden, said the investigations were 'led by career attorneys, based on data, body cam footage.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 8,
            directness: 4,
          },
          source: "NPR, 'Trump administration dismisses police investigations in several cities' (21 May 2025)",
          sourceUrl:
            "https://www.npr.org/2025/05/21/nx-s1-5406262/trump-administration-dismisses-police-investigations-minneapolis-george-floyd",
          reasoning:
            "Records the federal government's judgment that consent decrees cost more than they deliver, and sets up a natural experiment. It is a policy decision, not evidence about outcomes; state-level oversight continues in Minneapolis and Louisville hired its own monitor.",
        },
        {
          id: "pr-failed-defunding",
          title: "PolitiFact 2021: Some Cities That Cut Police Budgets Were Already Reversing Course",
          description:
            "Checking claims in June 2021, PolitiFact found that 'some cities that decreased their police budgets last year have reversed course.' The Minneapolis City Council cut $7.8 million from its police department in 2020 'but later injected $6.4 million back into their budget to hire new officers.' Austin's council had voted to cut $21.5 million and move another $128 million to other city departments. PolitiFact judged the evidence for a national trend of rising police budgets to fall short.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 4,
          },
          source: "Emily Tian, 'Some police budgets are increasing, but evidence of national trend falls short,' PolitiFact (18 June 2021)",
          sourceUrl: "https://www.politifact.com/factchecks/2021/jun/18/tweets/some-police-budgets-are-increasing-evidence-nation/",
          reasoning:
            "Shows that councils in some cities judged the cuts a mistake within a year. It does not show the cuts caused the violence, and PolitiFact found no clear national trend either way.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Do more police mean less crime?
    // =========================================================================
    {
      id: "police-numbers-crime",
      title: "Do More Police Mean Less Crime?",
      short_summary:
        "Each extra officer prevents about 0.1 homicides a year, with twice the benefit per head for Black residents, but also brings more arrests for low-level offences. Departments are hiring again in 2025-26. Whether a city should buy safety with more officers, or with other things that also cut violence, is the third split.",
      icon_name: "Users" as const,
      skeptic_premise:
        "More police save lives, and the people saved are disproportionately Black. A study of 242 cities from 1981 to 2018 by Aaron Chalfin and colleagues found each additional officer prevents about 0.1 homicides, and that per head the effect is twice as large for Black victims as for white. That makes officers one of the few proven ways to cut murder at scale. Departments lost officers after 2020. In 2025 agencies responding to the Police Executive Research Forum's survey hired 17.6% more officers than in 2024, bringing staffing back to its 2022 level, and homicide fell sharply in the same period. Shrinking police forces to fund other services trades proven protection for promises.",
      proponent_rebuttal:
        "The same study that finds more police cut homicides finds they make more arrests for low-level 'quality-of-life' offences, with the burden falling disproportionately on Black Americans, which is what reformers mean by being over-policed and under-protected at once. Officers are not the only proven tool. In a citywide randomised trial in Philadelphia, cleaning and greening 541 vacant lots cut gun violence 29% in neighbourhoods below the poverty line, at about $5 a square metre plus upkeep. Homicide also fell 21% in big cities in 2025 while many departments were still short-staffed against 2020, so staffing is not the whole story. The real question is the mix: which calls need an armed officer, and which dollars buy more safety elsewhere.",
      crux: {
        id: "officer-crime-tradeoff",
        title: "The Officer Trade-off Test",
        question:
          "Does each extra officer prevent enough killings to justify the extra arrests, or would other programs save more?",
        description:
          "Estimate the lives saved and the arrests, stops and uses of force added per officer hired, then compare the cost per life saved with non-police programmes tested in randomised trials, such as vacant-lot remediation, summer jobs and street outreach.",
        methodology:
          "Instrumental-variable studies of police force size (federal hiring grants, budget shocks) measuring homicides, low-level arrests and uses of force by race; set against randomised trials of non-police violence programmes, with costs per life saved for each.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Cost per homicide prevented for an added officer, using hiring-grant studies, set against cost per homicide prevented in randomised trials of vacant-lot repair, summer jobs and street outreach, with the added low-level arrests per officer reported alongside.",
        },
        cost_to_verify: "$200K (existing studies and city budget data)",
        falsification: {
          supporter_flip:
            "If side-by-side cost estimates showed an added officer preventing homicides more cheaply than vacant-lot, jobs or outreach programmes, with few added low-level arrests, the case for shifting money from police to other programmes would weaken.",
          skeptic_flip:
            "If non-police programmes prevented homicides at a lower cost per life than added officers in repeated trials, without the added arrests, the view that hiring more police is the best way to cut murder would be hard to hold.",
          common_ground:
            "Both sides agree that more officers reduce homicide on average, that they also bring more low-level arrests, and that departments have been hiring more officers each year since 2021.",
          live_disagreement:
            "How to weigh lives saved against the cost of added arrests and stops, which fall hardest on Black residents, and whether money spent on officers or on other programmes buys more safety.",
        },
      },
      evidence: [
        {
          id: "philly-vacant-lots",
          title: "Philadelphia Trial: Greening Vacant Lots Cut Gun Violence 29% in Poor Neighborhoods",
          description:
            "In a citywide cluster randomised trial, Charles Branas and colleagues randomly assigned 541 vacant lots to be cleaned and greened or left as they were, and followed police data and 445 residents over 38 months. In neighbourhoods below the poverty line, treated lots saw significant falls in gun violence (−29.1%), crime overall (−13.3%), burglary (−21.9%) and nuisances (−30.3%). Residents near treated lots reported 57.8% fewer safety concerns going outside. Initial costs averaged about $5 per square metre and upkeep about $0.50.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Branas et al., 'Citywide cluster randomized trial to restore blighted vacant land and its effects on violence, crime, and fear,' PNAS 115(12), 2946-2951 (2018)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5866574/",
          reasoning:
            "A true randomised trial, rare in this field, showing a cheap non-police way to cut gun violence. The largest effect is a subgroup result for poor neighbourhoods, it is one city, and it adds to policing rather than proving police can be cut.",
        },
        {
          id: "chalfin-force-size",
          title: "Chalfin et al. 2022: Each Added Officer Prevents ~0.1 Homicides, Twice the Effect per Head for Black Victims",
          description:
            "Using data from 242 large US cities from 1981 to 2018 and two instrumental-variable strategies, Aaron Chalfin, Benjamin Hansen, Emily Weisburst and Morgan Williams found that 'each additional police officer abates approximately 0.1 homicides,' and that 'in per capita terms, effects are twice as large for Black versus white victims.' Larger police forces also make more arrests for low-level 'quality-of-life' offences, with a disproportionate burden on Black Americans.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Chalfin, Hansen, Weisburst & Williams, 'Police Force Size and Civilian Race,' American Economic Review: Insights 4(2), 139-58 (2022); NBER Working Paper 28202",
          sourceUrl: "https://ideas.repec.org/p/nbr/nberwo/28202.html",
          reasoning:
            "The strongest recent estimate that police numbers matter for murder, and it cuts both ways: lives saved, mostly Black, and more low-level arrests, also mostly Black. It measures adding officers to the policing of its era, not replacing some of their work with other responders.",
        },
        {
          id: "perf-staffing-2025",
          title: "PERF 2026 Survey: Agencies Hired 17.6% More Officers in 2025 Than in 2024",
          description:
            "In the Police Executive Research Forum's survey of 197 agencies, published in May 2026, responding agencies hired 17.6% more officers in 2025 than in 2024 and about 40% more than in 2021. Total staffing rose 1.4% in 2025, back to where it was in 2022 but still below the start of 2020. Resignations were stable, and about 15% lower than in 2021.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 3,
          },
          source: "Police Executive Research Forum, workforce survey (23 May 2026)",
          sourceUrl: "https://www.policeforum.org/trending23may26",
          reasoning:
            "Shows cities chose to rebuild police forces after 2020, and the rebuild coincided with falling crime. It is a survey of PERF-affiliated agencies, not all departments, and it does not show that the hiring caused the decline.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Who answers the call?
    // =========================================================================
    {
      id: "alternative-response-models",
      title: "Who Answers the Call?",
      short_summary:
        "Unarmed teams in Eugene and Denver handled tens of thousands of calls with little police backup, and Denver's cut low-level crime 34%. New York's version reaches only a third of eligible calls. Whether these teams can carry a big share of 911 in large cities is the fourth split.",
      icon_name: "HelpCircle" as const,
      skeptic_premise:
        "Unarmed crisis teams work on carefully screened calls in a few places, and struggle at big-city scale. Eugene is a small, mostly white city, and Denver's STAR began as a six-month pilot in 8 of 36 precincts. New York's B-HEARD, launched in June 2021, still runs as a pilot in 31 of 78 precincts with nine teams per shift; in the third quarter of 2025 only 37% of eligible calls were assigned a team and 33% got one, and citywide average response times for mental-health (EDP) calls more than doubled to over 26 minutes from 2022 to 2025. To be eligible the caller must confirm there is no weapon and no imminent danger. Calls that screen as calm can turn violent, and sending unarmed responders shifts that risk onto them and the person in crisis.",
      proponent_rebuttal:
        "Most 911 calls are not violent crimes, and when trained clinicians answer the ones that are not, things go better and cost less. In New York in 2025, 96% of the almost 3.7 million 911 calls assigned to the NYPD did not involve violent crime. CAHOOTS in Eugene handled about 24,000 calls in 2019, about 20% of the call volume, and asked for police backup on 311 of them. Denver's STAR answered 748 calls in its first six months, none of which required a call to police for assistance, and a peer-reviewed Stanford study found reports of the targeted low-level crimes fell 34%, at about a quarter of the cost of a police response. One in five people killed by police in 2025 showed signs of a mental health crisis, and 89% of those deaths followed a call for help. New York's problems are about too few teams, not the model: its budget grew 35% while its coverage grew ninefold.",
      crux: {
        id: "alternative-response-scalability",
        title: "The Scale Test",
        question:
          "Can non-police response teams like Denver's STAR scale to large, high-crime cities safely?",
        description:
          "Can programs like CAHOOTS and STAR scale to large, high-crime cities while maintaining safety outcomes?",
        methodology:
          "Phased implementation studies in large cities, comparing outcomes (safety incidents, call resolution, cost) between traditional police response and alternative response teams, with staffing and hours set to meet the eligible call volume.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Phased rollouts in big cities that compare unarmed teams with police on safety incidents, backup requests, call resolution and cost as the teams take on a broader mix of calls, with enough teams to answer most eligible calls.",
        },
        cost_to_verify: "$10M (Multi-city phased implementation study)",
        falsification: {
          supporter_flip:
            "If big-city programmes staffed to answer most eligible calls showed unarmed teams facing more safety incidents or needing frequent police backup once they took on a broader call mix, the case for shifting crisis calls away from police would weaken.",
          skeptic_flip:
            "If a fully staffed big-city programme answered most eligible calls and needed police backup as rarely as CAHOOTS's ~1.3% of calls, with no rise in harm, the view that these models cannot travel would be hard to hold.",
          common_ground:
            "Both sides agree CAHOOTS and Denver's STAR handled their own calls safely, that New York's B-HEARD reached only about a third of eligible calls in late 2025, and that none has been tested at full scale in a large, high-crime city.",
          live_disagreement:
            "Whether results from a small, low-crime city and a screened pilot carry over to large, high-crime cities, where calls that screen as non-violent can escalate without warning, and whether the shortfalls so far reflect the model or its funding.",
        },
      },
      evidence: [
        {
          id: "pr-denver-star",
          title: "Denver STAR: 748 Calls Without Police Assistance, and 34% Fewer Low-Level Crime Reports",
          description:
            "In its 6-month 2020 pilot in eight of Denver's 36 police precincts, the STAR team responded to 748 incidents, 'none of which required a call to police for assistance or for a response to a criminal offense.' Thomas Dee and Jaymes Pyne of Stanford found the program reduced reports of targeted, less serious crimes 'by 34% and had no detectable effect on more serious crimes,' and that the direct costs of a police response are over four times those of the community response.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 8,
          },
          source: "Dee & Pyne, 'A community response approach to mental health and substance abuse crises reduced crime,' Science Advances (10 June 2022); Stanford SIEPR summary",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9176742/",
          reasoning:
            "A peer-reviewed evaluation with a credible comparison. Pilot phase only: six months, eight precincts and screened call types.",
        },
        {
          id: "pr-cahoots-outcomes",
          title: "CAHOOTS 2019: 24,000 Calls, Police Backup on 311",
          description:
            "CAHOOTS in Eugene, OR has operated since 1989 and in 2019 responded to roughly 24,000 calls (~66/day) with unarmed teams — about 20% of the public-safety communications center's call volume — requesting police backup on only 311 of them (~1.3%).",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 8,
          },
          source: "Vera Institute case study; White Bird Clinic / Eugene Police Department records (2019 figures)",
          sourceUrl: "https://www.vera.org/behavioral-health-crisis-alternatives/cahoots",
          reasoning:
            "Thirty years of operation is strong evidence the model works where it runs. Eugene is a small, mostly white city with low violent crime, so it is weak evidence for Chicago or Detroit.",
        },
        {
          id: "pr-911-call-analysis",
          title: "Vera, New York City 2025: 96% of 911 Calls Sent to Police Did Not Involve Violent Crime",
          description:
            "Vera Institute analysis of New York City 911 data found that in 2025 call-takers assigned almost 3.7 million calls to receive an NYPD response, and 96% of them did not involve violent crime. About 150,000 involved a person experiencing a mental health crisis, and more than a million involved social and health-related issues that may be appropriate for an alternative response.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "Vera Institute of Justice, \"What 911 Data Says About Community Needs in New York City\"",
          sourceUrl: "https://www.vera.org/publications/what-911-data-says-about-community-needs-in-new-york-city",
          reasoning:
            "Shows how much police time goes to calls that are not violent crime. A call labelled non-violent can still need an officer, and this is one city's data.",
        },
        {
          id: "nyc-bheard-ibo-2026",
          title: "NYC Budget Office 2026: B-HEARD Reached 33% of Eligible Calls; Response Times Doubled",
          description:
            "New York's Independent Budget Office reported in January 2026 that B-HEARD, the city's non-police mental-health response launched in 2021, still runs as a pilot in 31 of 78 precincts, 9 a.m. to 1 a.m., with nine three-person teams per shift and a $35 million budget. In the third quarter of 2025 only 37% of eligible calls were assigned a team and 33% received one, even as eligible calls grew ninefold. Citywide, average response times for emotionally disturbed person (EDP) calls more than doubled, from about 12 to more than 26 minutes, between early 2022 and late 2025. To be eligible the caller must confirm no known weapon and no imminent danger. The IBO did not evaluate outcomes.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source: "New York City Independent Budget Office, 'IBO Explains: The Behavioral Health Emergency Assistance Response Division (B-HEARD)' (January 2026)",
          sourceUrl:
            "https://www.ibo.nyc.gov/assets/ibo/downloads/pdf/public-safety/2026/2026-january-bheard-summary.pdf",
          reasoning:
            "The largest US test of the model so far, and it shows how hard scaling is in a big city. It is about capacity, not safety: the budget office points to too few teams for the area covered and did not measure whether people served did better or worse.",
        },
      ],
    },
  ],
  aliases: [
    "Should US policing be restructured, with funds shifted to social services?",
    "Should we defund the police?",
    "Does police reform reduce crime?",
  ],
  references: [
    {
      title: "U.S. Police Violence in 2025: Year-end Report - Mapping Police Violence (February 2026)",
      url: "https://www.mappingpoliceviolence.org/files/mpv-year-end-report-2025.pdf",
    },
    {
      title: "Crime Trends in U.S. Cities: Mid-Year 2026 Update - Council on Criminal Justice (July 2026)",
      url: "https://counciloncj.org/crime-trends-in-u-s-cities-mid-year-2026-update/",
    },
    {
      title: "Policing the Police: The Impact of Pattern-or-Practice Investigations on Crime - NBER (2020)",
      url: "https://www.nber.org/papers/w27324",
    },
    {
      title: "Police Force Size and Civilian Race - NBER Working Paper 28202",
      url: "https://ideas.repec.org/p/nbr/nberwo/28202.html",
    },
  ],
};
