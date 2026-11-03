export const surveillancePublicSafetyData = {
  id: "surveillance-public-safety",
  title: "Surveillance and Public Safety",
  question: "Does expanding government surveillance meaningfully reduce crime?",
  meta_claim:
    "Expanding government surveillance technology (facial recognition, CCTV, license plate readers, predictive policing) meaningfully reduces crime and improves public safety—a claim weighed here against the best evidence on effectiveness, which is real but modest and context-dependent, and against documented costs to accuracy, civil liberties, and equal treatment.",
  status: "contested" as const,
  category: "policy" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "London has about 700,000 CCTV cameras, and a 40-year meta-analysis found that crime near cameras fell modestly, most in car parks (about 37% there), with little effect on violent crime. A federal NIST study found facial recognition's false-match rates highest for Black women. The fight is over whether more surveillance buys enough safety to justify what it costs in privacy and in the people it misidentifies.",
    confidence: 84,
    source:
      "Piza, Welsh, Farrington & Thomas, CCTV meta-analysis (2019); NIST Face Recognition Vendor Test — demographic effects (2019)",
    sourceUrl:
      "https://www.nist.gov/news-events/news/2019/12/nist-study-evaluates-effects-race-age-sex-face-recognition-software",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Both sides accept that measured crime drops near cameras are real but modest, mostly in property crime, in settings like car parks and where cameras are actively monitored, and that facial-recognition errors fall disproportionately on Black people while surveillance data is often repurposed beyond its original purpose.",
    "They split over whether CCTV and facial recognition prevent crime or push it to nearby areas, and over whether oversight such as human review, retention limits and bans on real-time mass face-scanning can bound the harms, or whether the infrastructure drifts toward abuse once it exists.",
  ],
  pillars: [
    {
      id: "crime-reduction-effectiveness",
      title: "Crime Reduction Effectiveness",
      short_summary:
        "London has 700,000 CCTV cameras. Studies show they reduce property crime in parking lots and have near-zero effect on violent crime.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Evidence that surveillance reduces crime is real but narrow. The leading 40-year meta-analysis (Piza, Welsh, Farrington & Thomas, 2019) finds CCTV produces a significant but modest overall crime decrease, concentrated in car parks (roughly a 37% reduction there) and driven by property—not violent—crime, with weak or non-significant effects in city centers and on transit; the largest gains come when cameras are actively monitored and paired with other interventions, meaning the camera alone is rarely the cause. Predictive policing algorithms can redirect resources toward already-over-policed communities, and a measured share of any effect is crime displacement rather than prevention. The honest reading is not 'surveillance does nothing' but 'its benefits are conditional, often small, and easy to overstate.'",
      proponent_rebuttal:
        "Modest is not nothing, and the strongest evidence points the right way. A 2024 study of 268 US cities from 1997-2020 (Johnson et al., Cities) found that police adoption of facial recognition was associated with reductions in felony violence and homicide—larger for early adopters—without measurable increases in over-policing or racial arrest disparities for violent offenses; it is observational rather than a controlled experiment, but it is the largest analysis to date and it cuts against the assumption that these tools only harm. The same meta-analysis skeptics cite confirms CCTV genuinely cuts crime where it is deployed well. Beyond aggregate crime rates, surveillance has clear investigative value: London's CCTV network has materially aided major investigations, and license plate readers reliably recover stolen vehicles and identify suspects in serious crimes. The policy question is how to capture these benefits, not whether they exist.",
      crux: {
        id: "surveillance-crime-rct",
        title: "Randomized Controlled Trial of Surveillance Expansion",
        question:
          "Does surveillance prevent crime, or push it to nearby areas?",
        description:
          "A rigorous experimental evaluation of surveillance technology deployment in matched communities, measuring crime rates, crime displacement, civil liberties impacts, and community trust.",
        methodology:
          "Randomly assign surveillance technology deployment (CCTV, facial recognition, license plate readers) across matched neighborhoods. Measure crime rates in treated and control areas, including adjacent areas (to detect displacement). Track false positive rates, arrests based on surveillance, and community surveys on trust.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Randomized rollouts of cameras or license-plate readers across matched neighborhoods, counting crime inside the covered areas and in the surrounding blocks for at least a year, with police data audited by outside researchers.",
        },
        cost_to_verify: "$5M (Multi-city randomized evaluation)",
        falsification: {
          supporter_flip:
            "If a rigorous multi-city RCT found surveillance deployment produces little net crime reduction once you account for displacement to adjacent areas — the car-park gains just moving crime rather than preventing it, and facial recognition adding no measurable safety — the effectiveness case would shrink to investigative value only.",
          skeptic_flip:
            "If new evaluations confirmed CCTV cutting crime where it is deployed well, and the 268-city link between police facial recognition and lower felony violence held up in stronger designs, 'surveillance does nothing' would give way to 'modest and conditional.'",
          common_ground:
            "Both sides agree surveillance's crime-reduction effect is real but modest, concentrated in property crime and specific settings, and strongest when cameras are actively monitored.",
          live_disagreement:
            "How much of the measured crime reduction is genuine prevention versus displacement to nearby areas — which only a randomized, displacement-tracking trial could cleanly separate.",
        },
      },
      evidence: [
        {
          id: "facial-recognition-crime-study",
          title: "Facial Recognition Linked to Reduced Violent Crime in 268 US Cities",
          description:
            "Johnson et al. (2024), published in Cities (vol. 155), analyzed 268 US cities from 1997 to 2020 using difference-in-differences regressions. The authors report that police adoption of facial recognition applications facilitated reductions in rates of felony violence and homicide, with larger homicide reductions in jurisdictions that adopted early (2000-2007). They found no evidence that adoption contributed to over-policing or racial disparities in arrest for violent offenses.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 7,
          },
          source:
            "Johnson, Johnson, Topalli, McCurdy & Wallace, 'Police facial recognition applications and violent crime control in U.S. cities,' Cities 155 (2024)",
          sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4796951",
          reasoning:
            "Peer-reviewed with a large sample. But this is an observational difference-in-differences design, not an experiment: cities that adopt facial recognition may differ in other policing investments, so causal claims are weaker than the headline implies. The 'no racial disparity in arrests' finding is a single study and warrants independent replication, which is why replicability and directness are scored conservatively.",
        },
        {
          id: "montevideo-police-cameras",
          title: "Montevideo: Police-Monitored Cameras Cut Crime About 20%, No Displacement Found",
          description:
            "Munyo and Rossi used the location and installation date of police-monitored surveillance cameras in Montevideo, Uruguay, together with street-segment data on every reported crime. They found that introducing the cameras reduced crime by about 20 percent in monitored areas relative to a control group outside the city, and when they looked for displacement to other areas they did not find evidence of it.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source:
            "Munyo & Rossi, 'Police-Monitored Cameras and Crime,' Scandinavian Journal of Economics 122(3) (2020)",
          sourceUrl: "https://doi.org/10.1111/sjoe.12375",
          reasoning:
            "Peer-reviewed, uses fine-grained street-segment data and the staggered timing of installation, and tests directly for the displacement the crux turns on, so directness is high. It is still one city, with cameras that were actively monitored by police, so it speaks to monitored CCTV rather than facial recognition or license plate readers, and a single quasi-experiment in Uruguay may not carry over to other settings; replicability is scored accordingly.",
        },
        {
          id: "medellin-camera-deterrence",
          title: "Medellín: Quasi-Random Camera Placement Lowered Crime With No Displacement Detected",
          description:
            "Gómez, Mejía and Tobón studied a camera installation program in Medellín, Colombia, and found that the quasi-random allocation of cameras led to a decrease in crimes and arrests. Because monitoring capacity did not increase and footage could not be used in prosecution, the authors read the result as deterrence rather than incapacitation. They tested for spillovers and found no evidence of crime displacement to, or diffusion of benefits to, surrounding locations.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source:
            "Gómez, Mejía & Tobón, 'The Deterrent Effect of Surveillance Cameras on Crime,' Journal of Policy Analysis and Management 40(2) (2021)",
          sourceUrl: "https://doi.org/10.1002/pam.22280",
          reasoning:
            "Peer-reviewed, with quasi-random placement and an explicit spillover test, which bears directly on the prevent-or-displace question. Limits: one city in a developing economy, a camera program rather than the wider surveillance stack, and a design that is quasi-random rather than a true randomized trial. Together with the Montevideo study it narrows the displacement worry for cameras in these settings without settling it for facial recognition or predictive policing.",
        },
        {
          id: "false-arrest-cases",
          title: "Facial Recognition Has Caused False Arrests of Innocent People",
          description:
            "In January 2020 in Detroit, Michigan, Robert Williams—a Black man—was wrongfully arrested based on an incorrect facial recognition match; the ACLU sued and won a landmark settlement. The ACLU now documents at least 14 wrongful arrests in the US linked to police use of facial recognition, nearly all of Black people (the true count is likely higher, since many departments do not disclose when a match drove an arrest). Separately, the 2018 'Gender Shades' study by Buolamwini and Gebru found that commercial gender-classification systems misclassified darker-skinned women at error rates up to 34.7%, versus a maximum of 0.8% for lighter-skinned men.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source:
            "ACLU, 'More than a Dozen Wrongful Arrests Due to Police Reliance on Facial Recognition Technology'; Buolamwini & Gebru, 'Gender Shades' (PMLR, 2018)",
          sourceUrl:
            "https://www.aclu.org/news/privacy-technology/more-than-a-dozen-wrongful-arrests-due-to-police-reliance-on-facial-recognition-technology",
          reasoning:
            "Documented cases of real harm to real people, and the intersectional accuracy disparity in Gender Shades is well-replicated. The wrongful-arrest count comes from the ACLU, an advocacy organization, so independence is scored slightly lower; note Gender Shades measured gender classification, a proxy for (not identical to) the identity-matching used in arrests.",
        },
        {
          id: "eff-scant-evidence-review",
          title: "CCTV's Effect on Crime Is Modest and Concentrated in Car Parks",
          description:
            "The leading peer-reviewed meta-analysis—Piza, Welsh, Farrington & Thomas (2019), a 40-year systematic review of 76 evaluations in Criminology & Public Policy—found CCTV is associated with a significant but modest overall decrease in crime. The effect is concentrated in car parks (where cameras combined with other measures cut crime substantially) and is much weaker or non-significant in city centers and on public transit, with the largest reductions for property (not violent) crime. The Electronic Frontier Foundation, a digital-rights advocacy group, argues such effectiveness claims are often overstated by vendors.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source:
            "Piza, Welsh, Farrington & Thomas, 'CCTV surveillance for crime prevention: A 40-year systematic review with meta-analysis,' Criminology & Public Policy 18(1) (2019)",
          sourceUrl: "https://onlinelibrary.wiley.com/doi/abs/10.1111/1745-9133.12419",
          reasoning:
            "Re-anchored to the strongest available evidence. An earlier draft attributed a 'scant evidence' review to the EFF that could not be web-verified, so the specific claim and the advocacy framing have been replaced with the peer-reviewed Piza/Welsh/Farrington meta-analysis, which directly supports the 'modest and context-dependent' reading. Directness is scored lower because this evidence is about CCTV specifically rather than the full surveillance stack (facial recognition, ALPRs, predictive policing).",
        },
      ],
    },
    {
      id: "privacy-civil-liberties",
      title: "Privacy & Civil Liberties",
      short_summary:
        "Facial recognition errors are not randomly distributed: a federal NIST evaluation found one-to-many matching produces the highest false-positive rates for Black women, and the wrongful arrests documented so far have nearly all been of Black people.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Mass surveillance creates a chilling effect on free speech, political dissent, and freedom of movement. Data collected for crime prevention is routinely repurposed for immigration enforcement, political monitoring, and commercial use. The Fourth Amendment was designed precisely to prevent government from watching all citizens at all times. Once surveillance infrastructure exists, it is virtually impossible to dismantle.",
      proponent_rebuttal:
        "Observing public conduct is not the same as warrantless search: courts have long held there is no reasonable expectation of privacy in what one does on a public street, and targeted surveillance backed by judicial oversight (warrants, particularized suspicion) is both constitutional and effective. The civil-liberties harms skeptics cite are real, but most are failures of governance, not of the technology itself—and they are addressable. Technology-specific guardrails can capture the safety benefits while bounding the risks: prohibiting real-time mass facial recognition while permitting post-crime investigative use with human review, capping data retention, requiring audit logs and transparency reports, and barring repurposing for immigration or political monitoring. The documented wrongful arrests argue for treating a face match as an investigative lead requiring corroboration, not for abandoning the tool entirely.",
      crux: {
        id: "surveillance-oversight-framework",
        title: "Effective Surveillance Oversight Model",
        question:
          "Can oversight reliably limit surveillance harms, or does the infrastructure inevitably drift toward abuse?",
        description:
          "Determining whether surveillance technology can be deployed with oversight mechanisms sufficient to prevent civil liberties abuses while maintaining public safety benefits.",
        methodology:
          "Compare surveillance oversight frameworks across democracies (US, UK, EU, Japan). Measure abuse rates, false positive rates, scope creep, and public trust under different regulatory regimes.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Comparisons of oversight regimes across the US, UK, EU and Japan, measuring documented abuse, false match rates, scope creep beyond the original use, and public trust.",
        },
        cost_to_verify: "$1M (Comparative policy study)",
        falsification: {
          supporter_flip:
            "If cross-country comparison showed even the best oversight frameworks fail to prevent scope creep, biased false matches, and data repurposing — that surveillance infrastructure inevitably erodes civil liberties once built — the 'capture benefits with guardrails' position would collapse toward not building it.",
          skeptic_flip:
            "If comparisons of oversight regimes found harms such as wrongful arrests from uncorroborated face matches and repurposing for immigration falling sharply under human review, retention caps and use bans, those harms would look like governance failures rather than built into the tools.",
          common_ground:
            "Both sides agree facial-recognition errors fall disproportionately on Black people and that surveillance data is, in practice, frequently repurposed beyond its original purpose.",
          live_disagreement:
            "Whether oversight (human-in-the-loop review, retention limits, bans on real-time mass scanning, anti-repurposing rules) can reliably bound the harms, or whether the infrastructure inevitably drifts toward abuse once it exists.",
        },
      },
      evidence: [
        {
          id: "ice-electronic-monitoring",
          title: "ICE Has Monitored Hundreds of Thousands via the SmartLINK App",
          description:
            "As of April 2024, US Immigration and Customs Enforcement (ICE) had cumulatively monitored roughly 779,000 people through the SmartLINK smartphone app, which uses facial-comparison and intermittent GPS check-ins as part of its Alternatives to Detention (ATD) program. The scale shows how normalized location-and-biometric surveillance has become in routine government administration, and how the same biometric tooling used for policing is deployed across other enforcement domains.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source: "CBS News reporting on ICE SmartLINK / ICE Alternatives to Detention (2024)",
          sourceUrl: "https://www.cbsnews.com/news/does-ices-smartlink-app-work/",
          reasoning:
            "The cumulative figure (~779,000 as of April 2024) is well-reported; an earlier draft's '183,935 since March 2024' could not be verified and was removed. Directness is lowered because ATD was an immigration-enforcement program from its 2004 origin, so it is better read as evidence of normalized biometric surveillance than as a clean case of public-safety infrastructure being repurposed.",
        },
        {
          id: "china-surveillance-resistance",
          title: "Even in China, Excessive Surveillance Triggers Public Resistance",
          description:
            "Chen & Zhan (2025), 'When Does Surveillance Trigger Resistance? Public Response to Escalating Digital Control in China,' in the Journal of Chinese Political Science, develops a risk-benefit framework arguing that when citizens perceive surveillance as intrusive and infer controlling state intent, they are more likely to resist—even within an authoritarian context where overt resistance is costly.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source:
            "Chen & Zhan, 'When Does Surveillance Trigger Resistance?', Journal of Chinese Political Science (2025)",
          sourceUrl: "https://link.springer.com/article/10.1007/s11366-025-09918-5",
          reasoning:
            "Peer-reviewed and a genuinely interesting cross-cultural finding, but it is primarily a theoretical/analytical framework rather than a large empirical test, and China's context differs sharply from Western democracies—hence the modest directness score. It speaks to public acceptability, not to whether surveillance reduces crime.",
        },
        {
          id: "detroit-frt-settlement-guardrails",
          title: "Detroit's Court-Enforced Face-Recognition Rules After a Wrongful Arrest (2024)",
          description:
            "Settling Williams v. City of Detroit in June 2024, after police wrongfully arrested Robert Williams on a facial recognition match, the Detroit Police Department accepted rules the federal court can enforce for four years. A face-recognition lead, even combined with a lineup identification, 'may never be a sufficient basis for seeking an arrest warrant'; detectives must document independent evidence and get sign-off from two supervisors; lineups may not reuse the photo the software flagged; and the department must audit every case since 2017 in which facial recognition was used to obtain an arrest warrant. The ACLU, which litigated the case and calls police use of the technology 'deeply problematic,' describes the rules as 'best-in-the-nation practices' for agencies that keep using it. Department data reported to the Board of Police Commissioners showed nine facial recognition searches in violent-crime investigations in 2025, against about 100 in 2023.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 3,
            directness: 4,
          },
          source:
            "ACLU, 'Summary of Detroit Facial Recognition Settlement Agreement (Williams v. City of Detroit)' (June 2024); ID Tech, 'Detroit Police Facial Recognition Use Drops 91 Percent After Settlement Tightens Policy' (27 Apr 2026)",
          sourceUrl:
            "https://assets.aclu.org/live/uploads/2024/06/williams_settlement_one-pager_june_24-1.pdf",
          reasoning:
            "This is the clearest real instance of the guardrails the 'for' side proposes: binding rules that treat a face match as a lead needing corroboration, negotiated by the civil-rights lawyers who brought the case. It is weak as evidence that oversight works, so the weights are low. It is one city, the rules are recent, and no published outcome data yet show wrongful arrests falling under them. The steep drop in searches also cuts both ways: oversight clearly constrained use, but a tool used nine times a year delivers little of the public-safety benefit the 'for' side wants to keep.",
        },
      ],
    },
  ],
};
