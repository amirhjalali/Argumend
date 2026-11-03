import type { TopicCategory } from "@/lib/schemas/topic";

export const epsteinFilesData = {
  id: "epstein-files",
  title: "The Epstein Files",
  question:
    "Did America's institutions protect Epstein and the powerful people around him?",
  meta_claim:
    "The Jeffrey Epstein case reveals systemic institutional failure — law enforcement, prosecutors, and political figures enabled or ignored sex trafficking for decades, and full accountability has still not been achieved.",
  status: "contested" as const,
  category: "policy" as TopicCategory,
  // As of 3 November 2026. Sources distinguish three kinds of claim and this
  // map keeps them apart: court findings (Maxwell's conviction, the CVRA and
  // In re Wild rulings), official findings (DOJ OPR 2020, the DOJ/FBI memo of
  // July 2025, DOJ's statements on the 2025-26 release) and allegations or
  // arrests, which are not charges or findings. No claim is made about any
  // named person beyond what the cited record says.
  last_updated: "2026-11-03",
  aliases: [
    "Does the Epstein case reveal a systemic institutional failure?",
    "What do the Epstein files reveal?",
    "Is the government still hiding the Epstein files?",
    "Did institutions cover up the Epstein case?",
  ],
  references: [
    {
      title:
        "DOJ Office of Professional Responsibility, Executive Summary of Report on the USAO-SDFL's Resolution of Its 2006–2008 Federal Investigation of Jeffrey Epstein (November 2020)",
      url: "https://www.justice.gov/opr/page/file/1336471/dl",
    },
    {
      title: "In re: Courtney Wild, No. 19-13843 (11th Cir. en banc, 15 April 2021)",
      url: "https://media.ca11.uscourts.gov/opinions/pub/files/201913843.enb.pdf",
    },
    {
      title: "DOJ and FBI memorandum on the Epstein investigative review (July 2025)",
      url: "https://www.justice.gov/opa/media/1407001/dl?inline",
    },
    {
      title: "Epstein Files Transparency Act — Public Law 119-38 (approved 19 November 2025)",
      url: "https://www.govinfo.gov/content/pkg/PLAW-119publ38/html/PLAW-119publ38.htm",
    },
    {
      title: "House Roll Call 289: H.R. 4405, Epstein Files Transparency Act, passed 427–1 (18 November 2025)",
      url: "https://clerk.house.gov/Votes/2025289",
    },
    {
      title: "DOJ Epstein Library",
      url: "https://www.justice.gov/epstein",
    },
    {
      title:
        "DOJ Inspector General Report on BOP Custody of Epstein at MCC New York (June 2023)",
      url: "https://oig.justice.gov/reports/investigation-and-review-federal-bureau-prisons-custody-care-and-supervision-jeffrey",
    },
    {
      title:
        "Timeline of Jeffrey Epstein-Ghislaine Maxwell Law Enforcement Failures (1996–2025) — Just Security",
      url: "https://www.justsecurity.org/119137/timeline-jeffrey-epstein-ghislaine-maxwell/",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Why has no one besides Maxwell been convicted?",
      content:
        "Ghislaine Maxwell is serving 20 years; the Supreme Court declined to hear her appeal on 6 October 2025. No one else has been convicted in the US in connection with Epstein's trafficking. In July 2025 the DOJ and FBI said their review found no evidence 'that could predicate an investigation against uncharged third parties.' FBI documents in the release reportedly list eight people as alleged co-conspirators; being named in an internal file is not a charge or a finding of guilt. Is the gap a lack of provable evidence, or a lack of will?",
    },
    {
      id: "q2",
      title: "Did Epstein's death end any chance of accountability?",
      content:
        "Epstein was found dead in his cell at the Metropolitan Correctional Center on 10 August 2019. New York's chief medical examiner ruled it suicide, and the DOJ Inspector General's 2023 report documented guards who failed to make required checks. In July 2025 the FBI said its review of enhanced video showed that from about 10:40 pm on 9 August 'until around 6:30 am the next morning, nobody entered any of the tiers' in his unit. His death ended the 2019 federal case against him. Even taking the suicide finding as correct, was the negligence that allowed it part of the same pattern?",
    },
    {
      id: "q3",
      title: "Is the government still hiding Epstein files?",
      content:
        "The Epstein Files Transparency Act, signed on 19 November 2025, bars withholding any record 'on the basis of embarrassment, reputational harm, or political sensitivity'. By 30 January 2026 the DOJ had released more than 3 million pages, 2,000 videos and 180,000 images and said it was 'in compliance'. It still withholds material showing violence or covered by attorney-client privilege, and lawmakers questioned 'the extensive redactions'. Do the redactions protect victims, or someone else?",
    },
    {
      id: "q4",
      title: "Have compensation and settlements delivered justice?",
      content:
        "The Epstein Victims' Compensation Program paid over $121 million to about 150 survivors. JPMorgan Chase settled for $290 million and Deutsche Bank for $75 million over their handling of Epstein's accounts. No banker was charged. Many survivors say compensation is not justice without criminal accountability for the people who took part in or enabled the abuse.",
    },
  ],
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "In July 2025 the Justice Department said its Epstein files held no 'client list' and nothing that could justify investigating anyone not already charged, and that no further release was warranted. In November Congress voted 427–1 to force one, and by 30 January 2026 the department had published more than 3 million pages. Ghislaine Maxwell is serving 20 years; no one else has been convicted in the US. The fight is over whether the record shows a system that shielded powerful people, or the limits of what prosecutors can prove.",
    confidence: 92,
    source:
      "DOJ and FBI memorandum on the Epstein review (July 2025); House Clerk, Roll Call 289 (18 November 2025); NPR (30 January 2026)",
    sourceUrl: "https://clerk.house.gov/Votes/2025289",
  },
  simple_case: [
    "The answer bears on whether the release closes the case or opens new investigations, on what survivors can still expect, and on how far the public trusts the prosecutors and police who handled it.",
  ],
  pillars: [
    // =========================================================================
    // Pillar 1: The 2007 deal
    // =========================================================================
    {
      id: "institutional-failure",
      title: "The 2007 Deal: Leniency, or Protection?",
      short_summary:
        "In 2007 federal prosecutors in Miami had a draft 60-count indictment against Epstein. U.S. Attorney Alexander Acosta instead signed a non-prosecution agreement: Epstein pleaded guilty to two state prostitution charges, was sentenced to 18 months in a county jail, and the government agreed not to prosecute him, four named co-conspirators or 'any potential co-conspirators'. Victims were not told. The DOJ's own review called it 'poor judgment' but found no evidence it was driven by Epstein's wealth or connections.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "The deal was lenient, and the people who studied it most closely found no evidence it was bought. The DOJ's Office of Professional Responsibility reviewed the contemporaneous records in 2020 and 'did not find evidence that his decision was based on corruption or other impermissible considerations, such as Epstein's wealth, status, or associations.' It found that managers in the U.S. Attorney's Office worried about 'legal issues, witness credibility, and the impact of a trial on the victims', and that Acosta resisted defence efforts to send the case back to the state and 'refused to eliminate the incarceration and sexual offender registration requirements.' 'None of the individual terms of the NPA violated Department or other applicable standards.' Epstein's defence team, including Kenneth Starr, Alan Dershowitz and Jay Lefkowitz, attacked witnesses' credibility and the federal theory of the case. A certain conviction with sex-offender registration, against the risk of acquittal before a jury, is a judgment call prosecutors make every day. OPR called it 'poor judgment'. Poor judgment by one office is not a system bending to protect the powerful.",
      proponent_rebuttal:
        "Every part of the system bent the same way. Palm Beach police began investigating in 2005 after the parents of a 14-year-old complained; the county grand jury returned a single charge of solicitation of prostitution, and the police chief and lead detective were so dissatisfied that they took the case to the FBI. Federal prosecutors then built an 82-page prosecution memo and a draft indictment, and their U.S. Attorney traded it for a state plea, 18 months in a county jail and immunity for 'any potential co-conspirators', a clause OPR called one of several 'unusual and problematic terms'. The deal was hidden from the victims. In 2019 a federal judge ruled the government had violated the Crime Victims' Rights Act by not telling them, and in 2021 the full Eleventh Circuit, while ruling it could give no remedy, called the facts 'beyond scandalous', 'a tale of national disgrace', and found that prosecutors appear to have 'worked hand-in-hand with Epstein's lawyers' to keep the agreement secret. OPR itself called the NPA 'a unique resolution'. A single misjudgment does not explain a pattern that ran from the county courthouse to Main Justice.",
      crux: {
        id: "npa-co-conspirator-immunity",
        title: "The Co-Conspirator Immunity Clause",
        question:
          "Was immunity for Epstein's unnamed co-conspirators standard practice, or an extraordinary concession?",
        description:
          "The 2007 non-prosecution agreement promised not to prosecute 'any potential co-conspirators' in the Southern District of Florida. If such clauses were common in federal deals of the time, the agreement reads as aggressive defence lawyering met by a lenient office. If no comparable deal immunized unnamed people, it is evidence the system made an exception for a rich and connected defendant.",
        methodology:
          "Compare the Epstein agreement with every federal non-prosecution and deferred-prosecution agreement in sex-trafficking and child-exploitation cases from 2000 to 2010, recording whether any immunized unnamed co-conspirators, kept the deal from victims, or let the defence approve the victims' representative. Read the result against OPR's 2020 findings, which judged the terms 'unusual and problematic' but within the U.S. Attorney's authority.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A comparison of the 2007 agreement with every other federal non-prosecution agreement in sex-trafficking cases from 2000 to 2010, checking whether any granted immunity to unnamed co-conspirators, alongside the DOJ OPR report's findings on that clause.",
        },
        cost_to_verify:
          "$0-100K (OPR's report and the NPA are public; comparable agreements need records requests)",
        falsification: {
          supporter_flip:
            "If a comparison with other federal non-prosecution agreements in sex-trafficking cases from 2000 to 2010 showed that immunity for unnamed co-conspirators was routine, the 2007 deal would read as aggressive defence lawyering plus one office's poor judgment, and the case for systemic failure would weaken.",
          skeptic_flip:
            "If a comparison with other federal non-prosecution agreements found no precedent for immunizing unnamed co-conspirators, the failures across Palm Beach police, federal prosecutors and the victims' rights ruling would read as systemic rather than one prosecutor's misjudgment.",
          common_ground:
            "Both sides accept that the 2007 non-prosecution agreement was unusually lenient, and that the DOJ's own Office of Professional Responsibility found 'poor judgment' in it but not professional misconduct.",
          live_disagreement:
            "Whether the deal's extraordinary terms, above all blanket immunity for unnamed co-conspirators, were one office's misjudgment under pressure from an elite defence team, or a cascade of state and federal decisions all bending toward a powerful defendant.",
        },
      },
      evidence: [
        {
          id: "acosta-poor-judgment",
          title:
            "DOJ watchdog: Acosta's deal was 'poor judgment' with 'unusual and problematic terms', not misconduct (2020)",
          description:
            "The DOJ's Office of Professional Responsibility concluded in November 2020 that 'Acosta's decision to resolve the federal investigation through the NPA constitutes poor judgment.' It found he 'resolved the federal investigation before significant investigative steps were completed' and 'agreed to several unusual and problematic terms in the NPA without the consideration required under the circumstances.' 'The NPA was a unique resolution, and one that required greater oversight and supervision than Acosta provided.' OPR found that none of the five prosecutors it reviewed committed professional misconduct.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 6,
            replicability: 9,
            directness: 7,
          },
          source: "DOJ Office of Professional Responsibility, Executive Summary of Report (November 2020)",
          sourceUrl: "https://www.justice.gov/opr/page/file/1336471/dl",
          reasoning:
            "The department's own watchdog, reading the internal records, found the deal premature and its terms unusual, which carries weight because the DOJ had every reason to defend its prosecutors. Independence is 6 because OPR is part of the DOJ, and directness 7 because it judged one office's conduct, not whether the wider system protected Epstein.",
        },
        {
          id: "opr-no-improper-factors",
          title: "DOJ watchdog found no evidence the deal was driven by Epstein's 'wealth, status, or associations' (2020)",
          description:
            "OPR found Acosta's decision 'was within the scope of his authority' and that it 'did not find evidence that his decision was based on corruption or other impermissible considerations, such as Epstein's wealth, status, or associations.' It said contemporaneous records 'show that USAO managers' concerns about legal issues, witness credibility, and the impact of a trial on the victims led them to prefer a pre-charge resolution', that Acosta 'resisted defense efforts to have the matter returned to the state' and 'refused to eliminate the incarceration and sexual offender registration requirements', and that 'none of the individual terms of the NPA violated Department or other applicable standards.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 5,
            replicability: 8,
            directness: 7,
          },
          source: "DOJ Office of Professional Responsibility, Executive Summary of Report (November 2020)",
          sourceUrl: "https://www.justice.gov/opr/page/file/1336471/dl",
          reasoning:
            "The fullest review of the internal record found ordinary prosecutorial worries, not favouritism, behind the deal. Independence is 5: OPR is the DOJ judging itself, and 'no evidence found' in an office's own files is weaker than evidence that no improper influence occurred.",
        },
        {
          id: "victims-not-notified",
          title:
            "Courts: prosecutors kept the deal from victims; full appeals court called it 'a tale of national disgrace' (2019, 2021)",
          description:
            "On 21 February 2019 a federal district judge ruled that the government violated the Crime Victims' Rights Act by failing to tell victims it intended to enter the agreement, and that letters describing the case as ongoing 'mislead [sic] the victims to believe that federal prosecution was still a possibility.' In April 2021 the full Eleventh Circuit denied a survivor's petition, holding the Act gave no way to sue before charges were filed, while writing that the facts 'are beyond scandalous—they tell a tale of national disgrace', that Epstein and co-conspirators abused 'more than 30 young girls' in Florida and elsewhere, and that 'prosecutors worked hand-in-hand with Epstein's lawyers—or at the very least acceded to their requests—to keep the NPA's existence and terms hidden from victims.'",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source:
            "Doe 1 v. United States, 359 F. Supp. 3d 1201 (S.D. Fla. 2019), as described in DOJ OPR's 2020 summary; In re: Courtney Wild, No. 19-13843 (11th Cir. en banc, 15 April 2021)",
          sourceUrl: "https://media.ca11.uscourts.gov/opinions/pub/files/201913843.enb.pdf",
          reasoning:
            "Two courts, independent of the DOJ, found the deal was hidden from the people it most affected, and the appeals court described cooperation with the defence in keeping it secret. Directness is 8 rather than higher because the courts judged the treatment of victims, not why the deal was made.",
        },
        {
          id: "palm-beach-investigation",
          title:
            "Palm Beach police took the case to the FBI after a grand jury returned one prostitution charge (2006)",
          description:
            "The Palm Beach Police Department began investigating Epstein in 2005, OPR records, 'after the parents of a 14-year-old girl complained that Epstein had paid her for a massage.' On 19 July 2006 a Palm Beach County grand jury indicted him only 'for felony solicitation of prostitution'. Because 'the PBPD Chief and the lead Detective were dissatisfied with the State Attorney's handling of the case and believed that the state grand jury's charge did not address the totality of Epstein's conduct, they referred the matter' to the FBI.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 6,
            replicability: 8,
            directness: 7,
          },
          source: "DOJ Office of Professional Responsibility, Executive Summary of Report (November 2020); NBC News interview with former Palm Beach police chief Michael Reiter",
          sourceUrl: "https://www.justice.gov/opr/page/file/1336471/dl",
          reasoning:
            "Shows the failure began at the state level, before federal prosecutors were involved, and that local police themselves judged it inadequate. The record does not show why the state's prosecutors chose the lesser charge.",
        },
        {
          id: "defense-complexity",
          title:
            "Epstein’s Defense Team Included Starr, Dershowitz, and Other Elite Lawyers",
          description:
            "Epstein's defence included former Independent Counsel Kenneth Starr, Harvard law professor Alan Dershowitz and former U.S. Attorney Jay Lefkowitz. OPR records that 'for the next nine months', after the agreement was signed, 'Epstein deployed his extensive team of prominent attorneys' to contest it. In July 2007 his lawyers sent prosecutors a detailed letter arguing he had broken no federal law, the Eleventh Circuit noted. Prosecutors feared a trial in which the victims' credibility would be attacked.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 5,
          },
          source: "DOJ OPR Executive Summary (2020); In re Wild (11th Cir. 2021); Miami Herald, 'Perversion of Justice' (2018)",
          sourceUrl:
            "https://www.miamiherald.com/topics/jeffrey-epstein/",
          reasoning:
            "Hard opposition from elite counsel is a real pressure on any prosecutor. It explains why a deal was made; it does not explain its most unusual features, the co-conspirator immunity and the secrecy from victims, and complex cases go to trial against strong defence teams all the time, so directness is 5.",
        },
      ],
    },

    // =========================================================================
    // Pillar 2: The files
    // =========================================================================
    {
      id: "document-disclosure",
      title: "The Files: What Was Released, and What Is Still Hidden?",
      short_summary:
        "In July 2025 the DOJ and FBI said no further release of the Epstein files was 'appropriate or warranted'. Congress overrode them with the Epstein Files Transparency Act, which passed the House 427–1. By 30 January 2026 the DOJ had published more than 3 million pages and said it had complied. Critics point to the missed December deadline, heavy redactions and victims' names left visible.",
      icon_name: "FileText" as const,
      skeptic_premise:
        "The system did what it is supposed to do. When the DOJ and FBI said in July 2025 that no more should be released, Congress passed a law forcing release, 427–1 in the House, the Senate passed it the next day, and it was signed on 19 November 2025. The DOJ then had more than 500 people review over 6 million pages and published more than 3 million, with 2,000 videos and 180,000 images. It says redactions were limited to protecting victims and that 'notable individuals and politicians were not redacted', and the law itself forbids withholding anything for 'embarrassment, reputational harm, or political sensitivity.' The July 2025 review, which went through more than 300 gigabytes of data, found 'no incriminating \"client list\"' and 'no credible evidence' that Epstein blackmailed prominent people. The files show a predator with many famous acquaintances; acquaintance is not a crime, and the release lets anyone check.",
      proponent_rebuttal:
        "Transparency came 20 years late, against the department's stated wishes, and only because Congress forced it. The DOJ missed the law's 19 December 2025 deadline, put out a partial first batch with pages entirely blacked out, and kept releasing until 30 January 2026. Its July 2025 memo had concluded that 'no further disclosure would be appropriate or warranted'; Congress disagreed almost unanimously. The release then got the law's priorities backwards: attorneys for survivors reported at least 31 people who were abused as minors left unredacted, and NPR found unredacted names and photos of victims in the files, while lawmakers of both parties questioned 'the extensive redactions made to photos and documents.' The department still withholds material it says is privileged or shows violence. In a January 2026 CNN/SSRS poll only 6% of Americans were satisfied with what had been released. A release that a department fought, that exposed victims and that the public does not trust is not proof the system works.",
      crux: {
        id: "redaction-justification",
        title: "The Redaction Audit",
        question:
          "Do the DOJ's redactions protect legitimate interests, or conceal wrongdoing by powerful people?",
        description:
          "The Transparency Act allows redactions for victims' identities, child abuse material, active investigations, images of death or injury and classified information, and forbids any for embarrassment or political sensitivity. If an independent check of the withheld material found each redaction fits one of those grounds, the release is what the law asked for. If it found names of non-victims hidden without a lawful reason, the charge of concealment stands.",
        methodology:
          "An independent reviewer with access to the unredacted files, such as a court-appointed special master or the DOJ Inspector General, sorts every redaction and withheld record by the Act's permitted grounds, records any with no lawful basis, and checks whether names of people other than victims were withheld while victims' names were exposed. Compare the result with the report on redactions and on officials named in the files that the Act requires the Attorney General to send Congress.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "An independent, security-cleared review of the unredacted files that sorts each redaction by stated reason (victim privacy, ongoing investigation, national security, method, none) and checks whether perpetrator names were withheld while victims' were exposed.",
        },
        cost_to_verify:
          "$5–10M (independent review of more than 3 million pages with access to the unredacted set)",
        falsification: {
          supporter_flip:
            "If an independent audit of the unredacted files found that nearly every redaction protects victim privacy, an ongoing investigation, national security or a law-enforcement method, and that perpetrator names were not systematically withheld, the claim that the release shields powerful people would weaken.",
          skeptic_flip:
            "If an independent check of the release confirmed survivors' attorneys' count of at least 31 minor victims left unredacted while alleged perpetrators' names were hidden, the release would look like the reverse of what the law asked for, not the system working.",
          common_ground:
            "Both sides agree the DOJ's release of more than 3 million pages came under the Epstein Files Transparency Act, which passed the House 427–1, and that the department missed the law's December 2025 deadline.",
          live_disagreement:
            "Whether the redactions and missed deadlines reflect ordinary protection of victims, investigations and security, or resistance to exposing powerful people — and so whether a release that took an act of Congress two decades on shows transparency or its absence.",
        },
      },
      evidence: [
        {
          id: "doj-no-client-list",
          title:
            "DOJ and FBI, July 2025: no 'client list', no credible blackmail evidence, no basis to investigate others",
          description:
            "After a review of 'more than 300 gigabytes of data and physical evidence', a July 2025 DOJ and FBI memorandum said: 'This systematic review revealed no incriminating \"client list.\" There was also no credible evidence found that Epstein blackmailed prominent individuals as part of his actions. We did not uncover evidence that could predicate an investigation against uncharged third parties.' It said the review 'confirmed that Epstein harmed over one thousand victims', concluded that Epstein died by suicide, and that 'no further disclosure would be appropriate or warranted.'",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 3,
            replicability: 5,
            directness: 7,
          },
          source: "U.S. Department of Justice and Federal Bureau of Investigation, memorandum on the Epstein investigative review (July 2025)",
          sourceUrl: "https://www.justice.gov/opa/media/1407001/dl?inline",
          reasoning:
            "The agencies holding the evidence say it supports no further cases, which is the strongest official statement for this side. Independence is 3: they were judging their own files, their call against further release was overridden by Congress, and the absence of a single 'list' does not mean no one else could be charged.",
        },
        {
          id: "transparency-act-passage",
          title:
            "Congress forced the release: 427–1 in the House, Senate passage the next day (November 2025)",
          description:
            "The House passed the Epstein Files Transparency Act (H.R. 4405) on 18 November 2025 by 427 to 1, with 5 not voting; the Senate passed it the next day and it was approved on 19 November. It required the Attorney General to publish the records within 30 days in searchable form; allowed redaction only for victims' identifying and medical information, child sexual abuse material, narrowly tailored and temporary protection of an active investigation, images of death or abuse, and classified information; and barred withholding any record 'on the basis of embarrassment, reputational harm, or political sensitivity', including for government officials and public figures.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 5,
          },
          source: "House Clerk, Roll Call 289 (18 November 2025); Public Law 119-38",
          sourceUrl: "https://clerk.house.gov/Votes/2025289",
          reasoning:
            "A legislature overriding the executive to compel disclosure is a check working, which cuts against the claim that the system simply protects the powerful. Directness is 5 because the need for the law also shows that the earlier processes had not delivered transparency.",
        },
        {
          id: "doj-missed-deadline",
          title:
            "DOJ missed the 19 December deadline, then released over 3 million pages by 30 January 2026 and said it had complied",
          description:
            "The Act set a deadline of 19 December 2025. The DOJ released a partial first batch that day, with many documents heavily redacted and some pages entirely blacked out, and kept releasing through 30 January 2026, when it said it had published 'more than 3 million pages, including more than 2,000 videos and 180,000 images', after reviewing over 6 million. Deputy Attorney General Todd Blanche said the department was now 'in compliance' with the Act. It still withholds material that depicts violence or is covered by attorney-client privilege. Members of Congress of both parties criticized the missed deadline and questioned 'the extensive redactions made to photos and documents.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 9,
            directness: 6,
          },
          source: "NPR (30 January 2026)",
          sourceUrl: "https://www.npr.org/2026/01/30/nx-s1-5693904/epstein-files-doj-trump",
          reasoning:
            "The department broke the law's timeline and still withholds some records, which supports the charge of resistance. Directness is 6 because missing a deadline on a 6-million-page review is also what an overstretched but good-faith effort would look like.",
        },
        {
          id: "victim-names-exposed",
          title:
            "Survivors' lawyers: at least 31 people abused as minors left unredacted; NPR also found victims' names and photos",
          description:
            "Attorneys for a group of Epstein survivors reported that the DOJ failed to redact the identities of at least 31 people who were abused as children, while names of alleged perpetrators were redacted. NPR's own review of the January 2026 files 'found unredacted names and photos of Epstein victims.' The DOJ says its redactions were limited to protecting victims and that 'Notable individuals and politicians were not redacted.'",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source: "CBS News live coverage of the release (2026); NPR (30 January 2026)",
          sourceUrl:
            "https://www.cbsnews.com/live-updates/epstein-files-released-doj-2026/",
          reasoning:
            "If victims were exposed while others were shielded, the release inverted the law's priorities. The count comes from lawyers for survivors, who have a stake, and NPR's finding confirms exposed victims but not the claim about perpetrators' names, so independence is 6.",
        },
      ],
    },

    // =========================================================================
    // Pillar 3: The accountability gap
    // =========================================================================
    {
      id: "accountability-gap",
      title: "The Accountability Gap: Who Else Will Face a Court?",
      short_summary:
        "Ghislaine Maxwell is serving 20 years, and survivors have received about $486 million from a compensation fund and two banks. No one else has been convicted in the US. Within weeks of the January 2026 release, British police arrested two men named in the files on suspicion of misconduct in public office; neither arrest is a charge. In the US the DOJ says nothing in its files supports new cases.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Accountability has come through every channel the law offers. Maxwell was convicted on five counts, including sex trafficking of a minor, and the Supreme Court declined to hear her appeal in October 2025, so her 20-year sentence stands. The compensation program paid over $121 million to about 150 survivors, and JPMorgan Chase and Deutsche Bank paid $365 million to settle claims over how they handled his accounts. The principal abuser died in custody before trial. Criminal law needs evidence that proves a specific person's crime beyond reasonable doubt, not proof of friendship, flights or dinners, and after reviewing everything they hold the DOJ and FBI said they found nothing 'that could predicate an investigation against uncharged third parties.' Where other countries' laws reach conduct the US cannot charge, such as a British official passing government papers, their police have acted. An absence of new US charges may simply mean an absence of provable US crimes.",
      proponent_rebuttal:
        "One conviction for a trafficking operation that the DOJ says harmed 'over one thousand victims' over many years is not accountability. Epstein pleaded guilty to state prostitution offences in 2008, was charged federally in 2019 and died before trial; Maxwell is the only other person convicted. FBI documents identify eight alleged co-conspirators, Al Jazeera reported in February 2026, and none has been charged in the US. The 2007 deal immunized 'any potential co-conspirators' in Florida. Jean-Luc Brunel, charged in France with rape of a minor, died in a Paris prison in 2022 before trial. The banks paid, but no banker was charged. Meanwhile the release produced action abroad within weeks: British police arrested Andrew Mountbatten-Windsor on 19 February 2026 and the former ambassador Peter Mandelson days later, both on suspicion of misconduct in public office tied to Epstein, while in the US there was, in Al Jazeera's words, 'no sign that any prosecutions are under way'. Bills and settlements compensate victims; they do not answer who else took part.",
      crux: {
        id: "co-conspirator-prosecution-test",
        title: "The Co-Conspirator Prosecution Test",
        question:
          "Will any identified co-conspirators or facilitators be prosecuted on the released evidence?",
        description:
          "If the evidence that led FBI agents to list people as possible co-conspirators would support charges under the standard applied to ordinary trafficking defendants, the absence of cases is a choice. If it falls short, as the DOJ says, the gap reflects what can be proved, not who is protected. Time limits and the 2007 immunity clause also bear on what can still be charged.",
        methodology:
          "An independent prosecutor, such as a special counsel, reviews the released and withheld evidence against each person FBI documents list as a possible co-conspirator or facilitator, applying the charging standard used for trafficking defendants without wealth or connections. The review records, person by person, whether evidence meets that standard, whether statutes of limitations or the 2007 immunity clause bar charges, and whether any foreign case rests on evidence US prosecutors also hold.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "An independent special counsel's review of the released evidence against each of the eight FBI-named co-conspirators, under the probable-cause standard used for defendants without wealth or connections, and a ruling on whether the 2007 immunity clause bars charges.",
        },
        cost_to_verify:
          "$10–20M (special counsel investigation with prosecutorial authority)",
        falsification: {
          supporter_flip:
            "If an independent review applying the ordinary sex-trafficking probable-cause standard found the released evidence too thin to charge any of the eight FBI-named co-conspirators — the same answer a defendant without wealth or connections would get — the gap between naming and charging would reflect the evidence, not a shielded network.",
          skeptic_flip:
            "If less-connected defendants in comparable trafficking cases were charged on evidence like that against the eight FBI-named co-conspirators, none charged across four administrations, Maxwell's conviction and the settlements would look like partial accounting rather than accountability.",
          common_ground:
            "Both sides accept that Maxwell was convicted and sentenced to 20 years, that survivors received over $121 million from the compensation program and $365 million from bank settlements, and that no one else has been criminally convicted in the US.",
          live_disagreement:
            "Whether the absence of further prosecutions reflects a lack of prosecutable evidence against specific people, or wealth and power shielding Epstein's associates — which turns on whether the named co-conspirators are held to the same charging standard as ordinary trafficking defendants.",
        },
      },
      evidence: [
        {
          id: "maxwell-conviction",
          title:
            "Maxwell convicted of sex trafficking a minor and sentenced to 20 years; Supreme Court declined her appeal (2021–2025)",
          description:
            "On 29 December 2021 a federal jury convicted Ghislaine Maxwell on five of six counts, including sex trafficking of a minor and conspiracy. She was sentenced to 20 years on 28 June 2022. Four women testified about her role in recruiting and grooming them. The Second Circuit upheld the conviction on 17 September 2024, and on 6 October 2025 the Supreme Court denied her petition: 'Petition DENIED.'",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "NPR (29 December 2021); Supreme Court docket No. 24-1073, Maxwell v. United States",
          sourceUrl:
            "https://www.npr.org/2021/12/29/1066219689/ghislaine-maxwell-verdict-trial-jeffrey-epstein",
          reasoning:
            "A conviction upheld through every appeal shows the system can hold a powerful accomplice to account. Directness is 7 because one conviction in a years-long operation is also the other side's point: the record stops with her.",
        },
        {
          id: "victim-compensation",
          title:
            "Survivors received about $486 million: $121 million from a compensation fund and $365 million from two banks",
          description:
            "The Epstein Victims' Compensation Program received about 225 claims and paid over $121 million to about 150 eligible survivors; more than 92% accepted their offers. JPMorgan Chase settled for $290 million and Deutsche Bank for $75 million over their handling of Epstein's accounts. Andrew Mountbatten-Windsor, then Prince Andrew, settled a civil suit by Virginia Giuffre in 2022 for an undisclosed sum.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 5,
          },
          source: "ABC News (August 2021); NPR; NBC News",
          sourceUrl:
            "https://abcnews.com/US/jeffrey-epstein-victims-program-shutting-121-million-paid/story?id=79344412",
          reasoning:
            "Large, verifiable payments are real accountability for survivors. Directness is 5: civil compensation is not criminal accountability, and no banker was charged.",
        },
        {
          id: "no-further-prosecutions",
          title:
            "No US prosecutions beyond Epstein and Maxwell; FBI files list eight alleged co-conspirators, none charged (2026)",
          description:
            "As of February 2026, Al Jazeera reported, 'None, apart from Maxwell, has faced a US criminal conviction in connection with Epstein's trafficking case', and 'There is no sign that any prosecutions are under way, despite Congress forcing Trump to release the files.' It reported that 'FBI documents identify eight alleged co-conspirators.' An internal investigative listing is not a charge or a finding of guilt. The gap spans the administrations of both parties since the 2007 deal.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "Al Jazeera (24 February 2026)",
          sourceUrl:
            "https://www.aljazeera.com/news/2026/2/24/epstein-files-fallout-muted-us-response-vs-political-reckoning-in-europe",
          reasoning:
            "The absence of US cases across both parties' administrations is the core of the accountability claim. It shows the gap, not its cause: a lack of provable crimes would produce the same record.",
        },
        {
          id: "uk-arrests-2026",
          title:
            "Weeks after the release, British police arrested Andrew Mountbatten-Windsor and Peter Mandelson on suspicion of misconduct in public office (February 2026)",
          description:
            "On 19 February 2026 Thames Valley Police arrested Andrew Mountbatten-Windsor on suspicion of misconduct in public office, after assessing reports that he sent trade reports to Epstein in 2010 while serving as the UK's trade envoy; 'we have now opened an investigation into this allegation,' the force said (AP). He has repeatedly denied any wrongdoing. On 23 February Peter Mandelson, the former UK ambassador to Washington, was arrested on suspicion of misconduct in public office and released on bail (Al Jazeera). An arrest on suspicion is not a charge, and the suspected offence concerns handling of government information, not the sexual abuse at the centre of the US case.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 4,
          },
          source:
            "Associated Press via WCPO (19 February 2026); Al Jazeera (24 February 2026)",
          sourceUrl:
            "https://www.wcpo.com/news/andrew-mountbatten-windsor-arrested-on-suspicion-of-misconduct-in-public-office",
          reasoning:
            "Shows foreign police found grounds to investigate on material that surfaced with the US release, while no US case followed. Directness is 4: the suspected offences are under UK law and differ from trafficking, an arrest is not a charge or finding, and both men are entitled to the presumption of innocence.",
        },
        {
          id: "brunel-death-in-custody",
          title:
            "Jean-Luc Brunel, charged in France with rape of a minor, died in prison before trial (2022)",
          description:
            "Jean-Luc Brunel, a modelling agent, was arrested in France in December 2020 and charged with rape of a minor. He was found hanged in his cell at La Santé prison in Paris on 19 February 2022, before trial; French authorities concluded suicide. Virginia Giuffre had alleged that Brunel procured girls with promises of modelling work.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source: "NPR (19 February 2022)",
          sourceUrl:
            "https://www.npr.org/2022/02/19/1081961087/jeffrey-epstein-jean-luc-brunel-dead",
          reasoning:
            "One of the few people charged anywhere in connection with Epstein died before a court could weigh the evidence, as Epstein did. Directness is 5: the case was French, and his death says nothing about how US institutions acted.",
        },
      ],
    },
  ],
};

export default epsteinFilesData;
