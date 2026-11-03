export const minneapolisShootingData = {
  id: "minneapolis-shooting",
  title: "Minneapolis ICE Shooting",
  question:
    "Did federal agents use excessive force in the fatal Minneapolis shooting?",
  meta_claim:
    "Whether federal agents used excessive force in the fatal shooting of Alex Pretti in Minneapolis on January 24, 2026 is disputed: independent video and eyewitness accounts conflict sharply with the federal self-defense account. As of November 2026 no one has been charged, the federal civil rights investigation has made no finding public, and Minnesota is suing for evidence it says federal agencies are withholding.",
  status: "contested" as const,
  category: "philosophy" as const,
  // As of 3 November 2026: CBP's notice to Congress (27 January) described
  // the shooting from a preliminary body-camera review; the Justice
  // Department opened a civil rights investigation on 30 January; the
  // medical examiner ruled the death a homicide on 2 February; Minnesota,
  // Hennepin County and the BCA sued for the evidence on 24 March; federal
  // prosecutors handed over body-camera video and statements in July, then
  // paused sharing on 10 September with the officers' guns and one shooter's
  // recorded statement still withheld. No charging decision in Pretti's or
  // Renée Good's death; Hennepin County charged an ICE agent in the
  // nonfatal 14 January shooting of Julio Sosa-Celis on 18 May.
  last_updated: "2026-11-03",
  // One line under "This turns on two questions": the stakes, without
  // restating the questions printed right below it.
  simple_case: [
    "The answers decide whether the agents who fired should face charges, and whether federal immigration officers need the training and accountability rules that bind local police.",
  ],
  // ── The opening: the fact under the title ──
  keystone_fact: {
    statement:
      "Federal immigration agents shot Alex Pretti, a 37-year-old ICU nurse, on a Minneapolis street on 24 January 2026, and the Hennepin County medical examiner classed his death a homicide caused by multiple gunshot wounds. Nine months later no one has been charged, and the county attorney says federal agencies are withholding evidence she needs to decide whether to charge. The fight is over what the agents' body cameras and the bystander videos show.",
    confidence: 95,
    source:
      "Hennepin County Medical Examiner, public data form for ME no. 2026-00537 (released 2 February 2026); ABC News, 'Alex Pretti's parents seek answers from federal government 9 months after son's killing' (27 October 2026)",
    sourceUrl:
      "https://abcnews.com/Politics/alex-prettis-parents-seek-answers-federal-government-9/story?id=137601904",
  },
  pillars: [
    {
      id: "conflicting-accounts",
      title: "Conflicting Official Accounts",
      short_summary:
        "Independently reviewed bystander video and eyewitness accounts conflict with the federal government's description of events; the agents' body-camera video is still not public.",
      image_url:
        "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&w=800&q=60",
      icon_name: "FileText" as const,
      skeptic_premise:
        'DHS stated that Pretti "approached Border Patrol officers with a handgun" and resisted arrest, and officials framed the shooting as self-defense. DHS Secretary Noem said Pretti arrived "to inflict maximum damage on individuals and to kill law enforcement," and administration figures (including homeland security adviser Stephen Miller) branded him a "domestic terrorist", a characterization Noem later declined to retract. CBP\'s notice to Congress on January 27, based on a preliminary review of the agents\' body-camera footage, said a Border Patrol agent yelled "He\'s got a gun!" during a struggle, about five seconds before the first shot. Pretti was carrying a gun, and no investigating authority has found the force unlawful: the Justice Department opened a civil rights investigation on January 30 and says it is ongoing, and CBP Commissioner Rodney Scott told senators on February 12, "until all that evidence is evaluated, I can\'t jump to a conclusion."',
      proponent_rebuttal:
        "Multiple independent video recordings and eyewitness accounts, reviewed by NPR, Reuters, BBC, the NYT, CNN and The Guardian, contradict the administration's first description, with reviewers reporting Pretti held a phone rather than a gun; the videos show an officer removing his gun while he was on the ground, before about 10 shots were fired. Even CBP's own notice to Congress makes no claim that he reached for it. Pretti was a Minneapolis VA ICU nurse; Minneapolis Police Chief Brian O'Hara said he held a valid Minnesota permit to carry. Federal agents kept state investigators from the scene; Minnesota sued for the evidence in March, received body-camera video and statements in July, and says sharing stopped in September with the officers' guns and one shooter's recorded statement still withheld. Nine months on, no one has been charged, and Trump removed Noem as DHS secretary in March.",
      crux: {
        id: "body-cam-review",
        title: "The Body Camera Analysis",
        question:
          "Does the full sequence of events back the federal self-defense account, or the bystander video and witnesses?",
        description:
          "The agents' body-worn camera footage would show the sequence of events and whether force was justified. CBP described it to Congress on January 27, 2026 from a preliminary review, and its commissioner promised on February 12 to release it; as of August 2026 it had not been made public. Federal prosecutors gave Hennepin County body-camera video and statements in July 2026, so a state prosecutor now holds part of the record, but the officers' guns, a gun taken from Pretti, the officers' phones, projectiles and casings and one shooter's recorded statement are still withheld, and no charging decision has been announced.",
        methodology:
          "Release and analyze complete unedited body camera footage from all agents present. Cross-reference with civilian video timestamps, witness statements, the firearms and ballistic evidence, and the agents' statements from the time.",
        equation:
          "P(\\text{excessive force}) = f(\\text{threat level}, \\text{response proportionality}, \\text{de-escalation attempts})",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Release of all body-camera footage, dispatch audio and the agents' written reports from the time, synchronized with bystander video into one timeline and reviewed by an independent investigator, such as a state prosecutor, rather than the agency involved, with the firearms and ballistic evidence examined as well.",
        },
        cost_to_verify:
          "$0 (the footage exists; Hennepin County received some body-camera video in July 2026, but the public has none and the firearms and one officer's statement are still withheld)",
        falsification: {
          supporter_flip:
            "If complete, unedited body-camera footage from every agent present, cross-checked against bystander video timestamps and witness statements, showed Pretti holding a gun and approaching officers as DHS first described, or reaching for his weapon before the shots, the case that the shooting was excessive force would largely fall away.",
          skeptic_flip:
            "If the full set of recordings, including those reviewed by NPR, Reuters, BBC, the NYT, CNN and The Guardian, confirmed a sequence unlike the official one, with Pretti holding a phone rather than a gun, disarmed before the agents fired, and carrying a valid permit, the self-defense account would be hard to hold.",
          common_ground:
            "Both sides agree federal agents shot and killed Alex Pretti on January 24, 2026, that two officers fired, that he was carrying a gun, that the agents' body-camera footage exists and bears directly on what happened, and that no one has been charged.",
          live_disagreement:
            "Whether Pretti posed the threat DHS describes, or held a phone and had been disarmed as independent video reviewers report, which complete body-camera footage, cross-checked against bystander video and the ballistic evidence, would show.",
        },
      },
      evidence: [
        {
          id: "video-contradiction",
          title: "Multiple Videos Contradict Official Account",
          description:
            "Independent video recordings from bystanders show a different sequence of events than described by federal officials.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source:
            "NPR, \"Videos and eyewitnesses refute federal account of Minneapolis shooting\" (Jan 25, 2026)",
          sourceUrl:
            "https://www.npr.org/2026/01/25/nx-s1-5687875/minneapolis-shooting-minnesota-ice-alex-pretti-dhs-investigation",
          reasoning:
            "Bystander video reviewed by NPR (and separately by Reuters, BBC, NYT, CNN, The Guardian) shows Pretti filming with his phone, not holding a gun, when agents pepper-sprayed him and took him to the ground, contradicting the DHS account; the same videos show an agent disarming him of a gun he was carrying. Multiple independent recordings can be cross-referenced.",
        },
        {
          id: "licensed-carrier",
          title: "Pretti Was Licensed to Carry",
          description:
            "Minneapolis Police Chief Brian O'Hara confirmed Pretti held a valid Minnesota permit to carry and had no criminal record, contradicting implications of illegal activity.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 10,
            directness: 7,
          },
          source:
            "NPR, \"5 things to know about the latest Minneapolis shooting\" (Jan 25, 2026)",
          sourceUrl:
            "https://www.npr.org/2026/01/25/nx-s1-5687361/minneapolis-shooting-latest-alex-pretti",
          reasoning:
            "Official statement by the Minneapolis police chief, verifiable through state permit-to-carry records.",
        },
        {
          id: "bca-blocked",
          title: "State Investigators Blocked from Scene",
          description:
            "Minnesota Bureau of Criminal Apprehension Superintendent Drew Evans said DHS officials blocked BCA agents from the shooting scene despite a judicial warrant. Hennepin County's own timeline, published with its March lawsuit, records that on January 24 'Federal agents physically block BCA agents from entering the scene' and that 'The FBI Special Agent in Charge informs the BCA that he was ordered to not allow state authorities to process the scene.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 4,
          },
          source:
            "The Hill, \"Minnesota official says DHS 'blocked' state bureau from investigating scene of latest shooting\" (Jan 2026); Hennepin County Attorney's Office release (24 March 2026)",
          sourceUrl:
            "https://thehill.com/homenews/state-watch/5705051-alex-pretti-federal-shooting-investigation/",
          reasoning:
            "On-record statements from the state BCA superintendent and the county attorney's office. The fact of blocked access is documented, but it bears on whether an independent review could happen, not on what the footage shows, so directness is 4 (lowered from 6 on 3 November 2026 for that reason).",
        },
        {
          id: "evidence-withheld-2026",
          title: "Minnesota Sues for the Evidence; Guns and a Shooter's Statement Still Withheld (March to October 2026)",
          description:
            "On 24 March 2026 the Hennepin County Attorney's Office, the State of Minnesota and the BCA sued the federal government in Washington, D.C., 'for access to evidence related to the shootings of Renee Good, Julio Sosa-Celis, and Alex Pretti.' Attorney General Keith Ellison said: 'The feds' choice not to share evidence with us is arbitrary and capricious and has no rational basis.' In July federal prosecutors handed over hard drives with statements and body-camera video (AP, 13 July 2026). In an October filing the state said the U.S. attorney told County Attorney Mary Moriarty on 10 September that sharing would pause indefinitely 'in light of challenges with D.C.', and a declaration by BCA Superintendent Drew Evans lists what it says it has not received in the Pretti case: the firearms the officers used, a firearm taken from Pretti before he was shot, the officers' cellphones, projectiles and casings, and a recording of a statement by one officer. The Justice Department has asked the court to dismiss the suit or move it to Minnesota, arguing that withholding is discretionary and not reviewable under the Administrative Procedure Act.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 3,
          },
          source:
            "Hennepin County Attorney's Office release (24 March 2026); CBS Minnesota, 'Feds stopped sharing evidence in Good, Pretti killings after July announcement, Minnesota suit claims' (22 October 2026)",
          sourceUrl:
            "https://www.cbsnews.com/minnesota/news/minnesota-feds-stop-sharing-evidence-good-pretti-shootings-lawsuit/",
          reasoning:
            "Supporters read the withholding of the guns, ballistics and a shooter's statement as a sign the full record would not favour the agents. That is an inference, not evidence of what happened: the state is a party to the lawsuit, the Justice Department says release is up to the agencies and that Minnesota did not follow their request rules, and evidence can be withheld for reasons unrelated to its content. Directness is 3.",
        },
        {
          id: "dhs-position",
          title: "DHS Claims Self-Defense",
          description:
            "DHS stated Pretti \"approached Border Patrol officers with a handgun\" and resisted arrest; officials framed the shooting as self-defense. Independent video review disputes that he was holding a gun, and CBP's later notice to Congress did not repeat the claim that he approached agents with one.",
          side: "against" as const,
          weight: {
            sourceReliability: 4,
            independence: 2,
            replicability: 3,
            directness: 7,
          },
          source:
            "NPR, \"Videos and eyewitnesses refute federal account of Minneapolis shooting\" (Jan 25, 2026), reporting the DHS account",
          sourceUrl:
            "https://www.npr.org/2026/01/25/nx-s1-5687875/minneapolis-shooting-minnesota-ice-alex-pretti-dhs-investigation",
          reasoning:
            "DHS is a party to the incident (low independence); its claim that Pretti was armed is contradicted by independently reviewed bystander video, so source reliability is de-rated.",
        },
        {
          id: "cbp-congress-notice",
          title: "CBP's Body-Camera Review for Congress: 'He's Got a Gun!' (27 January 2026)",
          description:
            "In the death notice CBP must send Congress, its Office of Professional Responsibility gave an account 'based on a preliminary review' of body-worn camera footage and agency documentation. As the AP summarized it, officers tried to take Pretti into custody, he resisted and a struggle followed, during which a Border Patrol agent yelled 'He's got a gun!' multiple times. 'Approximately five seconds later, a [Border Patrol agent] discharged his CBP-issued Glock 19'; a CBP officer also fired. The report says an agent then 'cleared and secured Pretti's firearm in his vehicle.' CBS News reported that the report 'makes no claim that Pretti tried to reach for his firearm.'",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 3,
            replicability: 4,
            directness: 8,
          },
          source:
            "CBS News, 'Two federal agents fired their weapons during Alex Pretti shooting, report to Congress says' (27 January 2026); AP via PBS NewsHour (27 January 2026)",
          sourceUrl:
            "https://www.cbsnews.com/news/two-federal-agents-fired-their-weapons-during-alex-pretti-shooting-report-congress-says/",
          reasoning:
            "The federal side's strongest account, because it comes from the agents' own body cameras: a warning shouted in a struggle that the man was armed, which he was, gives the agents' claim of a perceived deadly threat a factual basis. It is still the agency's own preliminary review of footage the public has not seen, it does not say Pretti reached for the gun, and it dropped DHS's first claim that he approached agents with a handgun. Directness is high because it describes the seconds in dispute; independence is low.",
        },
        {
          id: "doj-probe-ongoing",
          title: "Justice Department: Civil Rights Investigation Open, No Finding Yet (January to October 2026)",
          description:
            "On 30 January 2026 Deputy Attorney General Todd Blanche announced a federal civil rights investigation, saying 'We're looking at everything that would shed light on what happened that day', and that the Civil Rights Division 'does not investigate every law enforcement shooting'; the FBI leads it. Nine months later no one has been charged, and a Justice Department spokesperson said: 'The timing is consistent with how these types of investigations proceed.' In court the department has argued that Minnesota is not blocked from bringing charges, pointing to Hennepin County's May case against an ICE agent in a separate shooting.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 4,
            directness: 3,
          },
          source:
            "AP via Spectrum News, 'DOJ opens federal civil rights probe into fatal shooting of Alex Pretti' (30 January 2026); ABC News (27 October 2026); CBS Minnesota (22 October 2026) on the department's court filing",
          sourceUrl:
            "https://spectrumlocalnews.com/us/snplus/public-safety/2026/01/30/alex-pretti-shooting-investigation",
          reasoning:
            "Skeptics' point is procedural: the shooting is under a federal civil rights investigation, no investigator has yet found the force unlawful, and a verdict from bystander video alone runs ahead of the record. Directness is low because an open investigation with no finding is not evidence that the force was justified, and the department investigating is part of the same administration whose officers fired.",
        },
      ],
    },
    {
      id: "pattern-of-force",
      title: "Pattern of Federal Force",
      short_summary:
        "This is the second U.S. citizen killed by federal agents in Minnesota in January 2026; an ICE agent has since been charged in a third, nonfatal shooting.",
      image_url:
        "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=800&q=60",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Two incidents do not by themselves establish a pattern, and each turned on its own contested facts. Federal agents operate in volatile crowd situations and are authorized to use force when they reasonably perceive a threat; a surge in enforcement amid large protests predictably raises the number of confrontations. The written rules CBP and ICE work under were aligned with the Justice Department's in 2023, and ICE said in August 2026 that it expected every field officer to have a body camera by the end of that month. A charge is not a conviction, and ICE called Hennepin County's charges against one of its agents 'nothing more than a political stunt.'",
      proponent_rebuttal:
        'Two fatal shootings of U.S. citizens in roughly three weeks in one state, Renée Good on January 7 and Alex Pretti on January 24, 2026, suggest possible systemic issues with training, rules of engagement, or supervision. Governor Tim Walz said Trump should "pull these 3,000 untrained agents out of Minnesota." Between them came a third shooting: on May 18 Hennepin County charged an ICE agent with assault and falsely reporting a crime over the January 14 shooting of Julio Sosa-Celis, alleging video and ShotSpotter audio contradict his self-defense account, after the Justice Department dropped its own charges against Sosa-Celis. Deputy Attorney General Todd Blanche said a federal civil rights probe was not warranted in Good’s death, and on October 1 her family sued the United States under the Federal Tort Claims Act and federal agents and officials under the Ku Klux Klan Act of 1871. A resolution to impeach Secretary Noem, introduced on January 14, reached 162 House cosponsors by January 27, according to its sponsor, Rep. Robin Kelly; Trump removed Noem from the post in March.',
      crux: {
        id: "training-standards",
        title: "Training and Rules of Engagement Audit",
        question:
          "How do CBP and ICE training and rules for using force compare with local police standards?",
        description:
          "Independent review of CBP/ICE training standards and rules of engagement compared to local police departments. The DHS Office of Inspector General listed reviews of ICE's hiring and training program, CBP's interior immigration enforcement and ICE's handling of excessive-force allegations as ongoing in February 2026.",
        methodology:
          "Compare use-of-force training hours, de-escalation requirements, body-camera use and release rules, and accountability mechanisms between federal immigration enforcement and accredited police departments.",
        equation:
          "R_{force} = \\frac{\\text{incidents}_{fatal}}{\\text{encounters}_{total}} \\times 10^6",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "An independent side-by-side review of use-of-force training hours, de-escalation requirements and accountability mechanisms at CBP, ICE and accredited police departments.",
        },
        cost_to_verify: "$500K (Independent audit)",
        falsification: {
          supporter_flip:
            "If an independent comparison found CBP and ICE use-of-force training hours, de-escalation requirements and accountability mechanisms on par with accredited police departments, the two January shootings would read as separate incidents turning on their own facts rather than a systemic problem.",
          skeptic_flip:
            "If an independent comparison found CBP and ICE force training and de-escalation rules short of local police standards, two U.S. citizens killed by federal agents within about three weeks, Renée Good on January 7 and Alex Pretti on January 24, 2026, would point to training, rules or supervision.",
          common_ground:
            "Both sides agree two U.S. citizens were killed by federal agents in Minnesota in January 2026, during an enforcement surge amid large protests, and that no one has been charged in either death.",
          live_disagreement:
            "Whether two deaths in three weeks, and a third shooting now charged as assault, reflect gaps in federal training, rules of engagement or supervision, or the predictable result of more confrontations in volatile crowds, each turning on its own contested facts.",
        },
      },
      evidence: [
        {
          id: "cnn-ice-training-comparison",
          title: "CNN: ICE Deportation Officers Get Less Academy Training Than Almost Any Other Federal Agents",
          description:
            "A CNN analysis (27 February 2026) of academy training requirements for roughly 30 sworn roles at the 20 largest federal law enforcement agencies found that only US Court probation officers and federal prison guards require fewer training days than ICE deportation officers. Deportation officers previously had to complete 20 weeks, or roughly 100 days, of training; under the Trump administration ICE cut this to 42 days. ICE told CNN no content was removed, that instruction now runs 12 hours a day, and that overall training is 56 days with pre-employment courses. CNN also reported that the cut was not a factor in the two Minneapolis deaths: Renée Good was killed by a deportation officer with years of experience who would have received the longer training, and Alex Pretti was shot by two CBP employees, whose training programs are significantly longer.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 4,
          },
          source:
            "CNN, 'ICE deportation officers receive less training than almost any other federal agents' (27 Feb 2026)",
          sourceUrl: "https://www.cnn.com/2026/02/27/us/ice-deportation-officers-training-agents-invs",
          reasoning:
            "The nearest thing to the comparison this crux asks for: a cross-agency review of training requirements from public documents, with ICE's objections reported. It compares ICE with other federal agencies rather than with local police, and, by CNN's own account, the cut it documents did not apply to the agents in either Minneapolis shooting, so it bears on the system more than on these two deaths. Directness is 4.",
        },
        {
          id: "sosa-celis-charges",
          title: "ICE Agent Charged in the Nonfatal 14 January Shooting of Julio Sosa-Celis (18 May 2026)",
          description:
            "On 18 May 2026 Hennepin County charged ICE agent Christian Castro 'with four counts of second-degree assault with a dangerous weapon and one count of falsely reporting a crime' over the 14 January shooting of Julio Sosa-Celis in north Minneapolis, a week after Renée Good's death. The complaint alleges he fired through the closed front door of an occupied duplex, striking Sosa-Celis in the leg, and 'Prosecutors say surveillance video and ShotSpotter audio contradict Castro's account that he fired in self-defense.' The Justice Department had earlier asked that its own charges against Sosa-Celis be dismissed with prejudice, writing that 'newly discovered evidence in this matter is materially inconsistent with the allegations in the complaint affidavit.' An ICE spokesperson called the state charges 'unlawful and nothing more than a political stunt.' The charges are allegations; Castro has not been convicted.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 4,
          },
          source:
            "MPR News, 'Minnesota prosecutors announce charges against ICE agent' (18 May 2026); FOX 9, 'ICE agent charged in Minneapolis shooting of Venezuelan man' (18 May 2026)",
          sourceUrl:
            "https://www.mprnews.org/story/2026/05/18/watch-minnesota-prosecutors-announce-charges-against-ice-agent",
          reasoning:
            "A third shooting in the same operation in which, by prosecutors' account and the Justice Department's own dismissal motion, an agent's first version of events did not match the evidence. That bears on supervision and on how far agents' initial accounts can be trusted, which is part of this crux. It is a nonfatal shooting with its own facts, the charges are unproven, and ICE disputes the state's authority to bring them, so directness is 4.",
        },
        {
          id: "gao-dhs-force-policy-doj",
          title: "GAO: DHS Aligned Its Use-of-Force Policy With the Justice Department's in 2023",
          description:
            "The Government Accountability Office reported in July 2023 that in February 2023 DHS 'amended its use of force policy to align with the Department of Justice's (DOJ) policy', adding limits on chokeholds and carotid restraints. GAO reviewed how four DHS agencies, including CBP and ICE, report force under it. As CBS reported in January 2026, it allows deadly force only when an officer reasonably believes the subject 'poses an imminent threat of death or serious bodily injury', bars it against someone fleeing who poses no serious threat, and limits shooting at moving vehicles. GAO also found that the force data agencies submitted to DHS 'undercount the frequency that officers used force against subjects.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 4,
          },
          source:
            "GAO, 'Law Enforcement: DHS Should Strengthen Use of Force Data Collection and Analysis', GAO-23-105927 (24 July 2023); CBS Minnesota (7 Jan 2026) on the policy's terms",
          sourceUrl: "https://www.gao.gov/products/gao-23-105927",
          reasoning:
            "The skeptic's strongest documentary point: on paper, the rules CBP and ICE work under match the Justice Department's standard rather than falling below it. That speaks to written rules, not to training or practice, it compares with DOJ rather than local police, it predates the 2025-26 enforcement surge, and GAO's own finding that force is undercounted means the record cannot yet show whether the rules are followed. Directness is 4.",
        },
        {
          id: "ice-body-cameras-2026",
          title: "ICE: Body Cameras for Every Field Officer by the End of August 2026",
          description:
            "On 8 August 2026 ICE said it expected every field officer and agent to have a body camera by the end of August; Acting Director David J. Venturella said the agency was 'on track to equip every officer and agent in the field with body-worn cameras by the end of August.' The AP reported that ICE's release policy lets leadership withhold or indefinitely delay footage after serious injuries or deaths, with expedited release when it is in the 'best interests of the agency'; Venturella said the AP 'mischaracterized' the policy. The same report noted that CBP had not released its footage of the Pretti shooting, which Commissioner Rodney Scott told lawmakers would be made public 'when it's appropriate.'",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 3,
          },
          source:
            "AP via KMOV, 'ICE says it expects to equip every field officer with body cameras by the end of August' (8 August 2026)",
          sourceUrl:
            "https://www.firstalert4.com/2026/08/08/ice-says-it-expects-equip-every-field-officer-with-body-cameras-by-end-august/",
          reasoning:
            "Skeptics read universal body cameras as federal accountability moving toward the practice of many local police departments since the shootings. Critics reply that cameras matter only if footage is released, and the policy leaves release to the agency, as the unreleased Pretti footage shows. It is a policy announcement, not an audit, so directness is 3.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Hennepin County Medical Examiner, public data form for Alex Pretti, ME no. 2026-00537 (2 February 2026), via Global News",
      url: "https://globalnews.ca/wp-content/uploads/2026/02/Alex-Pretti-Medical-Examiner-Report.pdf",
    },
    {
      title: "Hennepin County Attorney's Office, State of Minnesota, BCA sue federal government for access to evidence related to Metro Surge shootings (24 March 2026)",
      url: "https://content.govdelivery.com/accounts/MNHENNE/bulletins/40fd10a",
    },
    {
      title: "Minnesota prosecutors obtain long withheld evidence in investigation into protest shooting deaths - AP via News4JAX (13 July 2026)",
      url: "https://www.news4jax.com/news/national/2026/07/13/minnesota-prosecutors-obtain-long-withheld-evidence-in-investigation-into-protest-shooting-deaths/",
    },
    {
      title: "Justice Department halts cooperation in Good and Pretti probes, state officials say - Minnesota Star Tribune via The Spokesman-Review (22 October 2026)",
      url: "https://www.spokesman.com/stories/2026/oct/22/justice-department-halts-cooperation-in-good-and-p/",
    },
    {
      title: "Parents of nurse killed by ICE demand DOJ release evidence in fatal shooting - NBC News (27 October 2026)",
      url: "https://www.nbcnews.com/news/us-news/parents-nurse-killed-ice-demand-doj-release-evidence-fatal-shooting-rcna605923",
    },
    {
      title: "CBP chief says agency will release body camera footage of Alex Pretti shooting - NBC News (12 February 2026)",
      url: "https://www.nbcnews.com/news/us-news/cbp-chief-says-agency-will-release-body-camera-footage-alex-pretti-sho-rcna258799",
    },
    {
      title: "Renee Good's family files civil lawsuits against US, federal agents - InForum (1 October 2026)",
      url: "https://www.inforum.com/news/minnesota/renee-good-family-files-civil-lawsuits-against-us-federal-agents",
    },
    {
      title: "DHS OIG, Oversight Reviews of DHS Immigration Enforcement Programs and Operations (5 February 2026)",
      url: "https://www.oig.dhs.gov/sites/default/files/assets/pr/2026/02-05-26-oversight-reviews-dhs-immigration-enforcement-programs-operations.pdf",
    },
  ],
};
