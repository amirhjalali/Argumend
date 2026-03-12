import type { TopicCategory } from "@/lib/schemas/topic";

export const epsteinFilesData = {
  id: "epstein-files",
  title: "The Epstein Files",
  meta_claim:
    "The Jeffrey Epstein case reveals systemic institutional failure \u2014 law enforcement, prosecutors, and political figures enabled or ignored sex trafficking for decades, and full accountability has still not been achieved.",
  status: "contested" as const,
  category: "policy" as TopicCategory,
  references: [
    {
      title:
        "DOJ Epstein Library \u2014 3.5 Million Pages Released Under Transparency Act",
      url: "https://www.justice.gov/epstein",
    },
    {
      title:
        "DOJ Office of Professional Responsibility Report on the Epstein Non-Prosecution Agreement",
      url: "https://www.justice.gov/opr/page/file/1336471/dl",
    },
    {
      title:
        "DOJ Inspector General Report on BOP Custody of Epstein at MCC New York",
      url: "https://oig.justice.gov/reports/investigation-and-review-federal-bureau-prisons-custody-care-and-supervision-jeffrey",
    },
    {
      title:
        "Timeline of Jeffrey Epstein-Ghislaine Maxwell Law Enforcement Failures (1996\u20132025) \u2014 Just Security",
      url: "https://www.justsecurity.org/119137/timeline-jeffrey-epstein-ghislaine-maxwell/",
    },
    {
      title:
        "Epstein Files Transparency Act \u2014 Public Law 119\u201338 (Full Text)",
      url: "https://www.congress.gov/119/plaws/publ38/PLAW-119publ38.pdf",
    },
    {
      title:
        "Epstein Investigation Timeline: Complete Chronology from 2005 to 2026 \u2014 Epstein Document Archive",
      url: "https://www.epsteininvestigation.org/guides/epstein-investigation-timeline",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Why were no co-conspirators beyond Maxwell criminally charged?",
      content:
        "FBI documents identify at least eight alleged co-conspirators in Epstein's trafficking operation, including former Victoria's Secret CEO Les Wexner, modeling agent Jean-Luc Brunel, and several named associates. The 2007 non-prosecution agreement granted blanket immunity to unnamed co-conspirators. Despite the Maxwell conviction, the 2019 SDNY indictment, and 3.5 million pages of released documents, no additional criminal prosecutions have been brought in the United States. Deputy Attorney General Todd Blanche stated in 2025 that nothing in the files allowed further prosecutions. Is this a genuine absence of prosecutable evidence, or a systemic failure of political will?",
    },
    {
      id: "q2",
      title:
        "Did Epstein's death foreclose accountability, or was it incidental to the broader failure?",
      content:
        "Epstein's death at the Metropolitan Correctional Center on August 10, 2019 eliminated the possibility of trial testimony and cross-examination. The DOJ Inspector General documented extensive failures: guards sleeping and shopping online instead of performing checks, his cellmate transferred out without replacement, and excessive bed linens left in the cell. Newly released 2026 surveillance logs show an unidentified figure near Epstein's tier at 10:39 PM the night before his death. The medical examiner ruled suicide, and the DOJ concurred. But even if his death was a suicide, the institutional negligence that made it possible mirrors the broader pattern of institutional failure that defined the case.",
    },
    {
      id: "q3",
      title:
        "Have victim compensation programs delivered meaningful justice?",
      content:
        "The Epstein Victims' Compensation Program paid over $121 million to approximately 150 survivors. JPMorgan Chase settled for $290 million and Deutsche Bank for $75 million over their roles in facilitating Epstein's finances. Prince Andrew settled with Virginia Giuffre for an undisclosed sum. Yet many survivors say financial settlements are not justice without criminal accountability for the individuals who participated in or facilitated the abuse. Does financial restitution constitute meaningful accountability when no additional perpetrators face prosecution?",
    },
  ],
  pillars: [
    // =========================================================================
    // Pillar 1: Institutional Failure & the 2007 Deal
    // =========================================================================
    {
      id: "institutional-failure",
      title: "Institutional Failure & the 2007 Deal",
      short_summary:
        "A 60-count federal indictment was drafted against Epstein in 2007, but US Attorney Alexander Acosta overruled his own prosecutors and negotiated a non-prosecution agreement that reduced the charges to two state prostitution counts, granted blanket immunity to unnamed co-conspirators, and concealed the deal from victims in violation of federal law.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "The 2007 agreement, while unusually lenient, reflected the realistic difficulties of prosecuting a wealthy, well-connected defendant with an army of elite defense attorneys including Kenneth Starr and Alan Dershowitz. Prosecutors made a pragmatic judgment that a guaranteed state conviction with sex-offender registration was preferable to the risk of acquittal at federal trial. The DOJ\u2019s own Office of Professional Responsibility found \u2018poor judgment\u2019 but not professional misconduct, and no prosecutor was disciplined. Individual misjudgment is not the same as systemic institutional failure.",
      proponent_rebuttal:
        "The failures went far beyond one prosecutor\u2019s \u2018poor judgment.\u2019 Palm Beach police identified 36 victims aged 14 to 17 and prepared a detailed probable cause affidavit. The lead federal prosecutor, Ann Marie Villafa\u00f1a, drafted an 82-page prosecution memo and a 60-count indictment. Acosta personally overruled her and negotiated directly with Epstein\u2019s defense team, granting blanket immunity to unnamed co-conspirators \u2014 an extraordinary provision that shielded the entire network. Victims were not notified, violating the Crime Victims\u2019 Rights Act, something \u2018even a first-year prosecutor would know better than to do.\u2019 State Attorney Barry Krischer had already been accused by Police Chief Michael Reiter of giving Epstein special treatment. The case leaked to the defense before it was made public. This was not one person\u2019s poor judgment \u2014 it was a cascading failure across state and federal systems, all bending in the same direction: toward protecting a powerful defendant.",
      crux: {
        id: "npa-co-conspirator-immunity",
        title: "The Co-Conspirator Immunity Clause",
        description:
          "The 2007 non-prosecution agreement included a clause granting immunity to unnamed \u2018potential co-conspirators\u2019 of Epstein. If this clause was standard prosecutorial practice, the deal reflects normal (if aggressive) defense lawyering. If it was extraordinary and unprecedented, it constitutes evidence of institutional capture \u2014 a system bending to protect the powerful.",
        methodology:
          "Compare the Epstein NPA with every other federal non-prosecution agreement in sex trafficking cases from 2000 to 2010. Assess whether blanket immunity for unnamed co-conspirators appears in any comparable agreement. Interview former federal prosecutors on standard practice. Review the DOJ OPR report\u2019s specific findings on this clause.",
        verification_status: "verified" as const,
        cost_to_verify:
          "$0 (DOJ OPR report is public; the NPA terms are a matter of court record)",
      },
      evidence: [
        {
          id: "acosta-poor-judgment",
          title:
            "DOJ OPR Finds Acosta Used \u2018Poor Judgment\u2019 in NPA Negotiations",
          description:
            "The DOJ\u2019s Office of Professional Responsibility concluded in its 2020 report that Acosta\u2019s decision to resolve the federal investigation through the non-prosecution agreement constituted \u2018poor judgment.\u2019 The report found the NPA was \u2018premature\u2019 and made before \u2018significant investigative steps were completed,\u2019 and that several terms were \u2018unusual and problematic.\u2019 However, OPR stopped short of finding professional misconduct.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 9,
            directness: 9,
          },
          source: "DOJ Office of Professional Responsibility Report (2020)",
          sourceUrl: "https://www.justice.gov/opr/page/file/1336471/dl",
          reasoning:
            "The DOJ\u2019s own internal watchdog finding \u2018poor judgment\u2019 carries significant weight precisely because the DOJ has institutional incentives to defend its prosecutors. The finding of \u2018unusual and problematic\u2019 terms is particularly notable. Independence is slightly reduced because OPR is still a DOJ entity reviewing DOJ conduct.",
        },
        {
          id: "victims-not-notified",
          title:
            "Victims Not Notified of NPA in Violation of Federal Law",
          description:
            "The Crime Victims\u2019 Rights Act (CVRA) requires that victims be notified of plea agreements and non-prosecution deals. Epstein\u2019s victims were not informed of the NPA until after it was finalized. In 2019, a federal judge ruled the NPA violated the CVRA. PBS reporting described this as something \u2018even a first-year prosecutor would know better than to do.\u2019",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 10,
            directness: 9,
          },
          source: "Federal Court Ruling; PBS NewsHour",
          sourceUrl:
            "https://www.pbs.org/newshour/show/the-completely-unprecedented-plea-deal-jeffrey-epstein-made-with-alex-acosta",
          reasoning:
            "A federal judge\u2019s ruling that the NPA violated federal law is the strongest possible evidence of institutional failure. The CVRA violation is a matter of legal record, independently verifiable, and directly relevant to the claim of systemic failure.",
        },
        {
          id: "palm-beach-investigation",
          title:
            "Palm Beach Police Identified 36 Victims; State Prosecutor Reduced to Prostitution Charge",
          description:
            "The Palm Beach Police Department, led by Chief Michael Reiter and Detective Joseph Recarey, identified 36 girls aged 14 to 17 with consistent accounts of sexual abuse at Epstein\u2019s residence. Despite this evidence, the state grand jury in 2006 returned only a single solicitation of prostitution charge. Reiter publicly accused State Attorney Barry Krischer of giving Epstein special treatment and escalated the case to the FBI. The probable cause affidavit\u2019s contents appeared to have leaked to the defense.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "NBC News; Palm Beach Police Department Records",
          sourceUrl:
            "https://www.nbcnews.com/news/us-news/ex-florida-police-chief-epstein-case-worst-failure-criminal-justice-n1057226",
          reasoning:
            "Reiter\u2019s account is corroborated by police records and the subsequent federal investigation. His accusation that the case leaked to the defense has never been refuted. The gap between 36 identified minor victims and a single prostitution charge is stark evidence of institutional failure at the state level.",
        },
        {
          id: "defense-complexity",
          title:
            "Epstein\u2019s Defense Team Included Starr, Dershowitz, and Other Elite Lawyers",
          description:
            "Epstein retained one of the most formidable defense teams in American legal history, including former Independent Counsel Kenneth Starr, Harvard professor Alan Dershowitz, and former US Attorney Jay Lefkowitz. The defense team aggressively challenged witness credibility, investigated the personal lives of victims, and brought enormous legal resources to bear. Prosecutors reasonably feared that a jury trial could result in acquittal, particularly given the challenges of trafficking cases involving minors.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 6,
          },
          source: "Miami Herald Perversion of Justice Investigation",
          sourceUrl:
            "https://www.miamiherald.com/news/local/article220097825.html",
          reasoning:
            "The difficulty of prosecuting wealthy defendants with elite counsel is a real systemic challenge, not unique to the Epstein case. However, this argument explains the plea deal\u2019s existence without justifying its most extraordinary features: blanket co-conspirator immunity, victim concealment, and the 13-month sentence with work release. Many complex cases go to trial successfully despite strong defense teams.",
        },
      ],
    },

    // =========================================================================
    // Pillar 2: Document Disclosure & Transparency
    // =========================================================================
    {
      id: "document-disclosure",
      title: "Document Disclosure & Transparency",
      short_summary:
        "The Epstein Files Transparency Act passed Congress 427\u20131 in November 2025, mandating release of DOJ files within 30 days. The DOJ ultimately released 3.5 million pages, 2,000 videos, and 180,000 images \u2014 but drew bipartisan criticism for extensive redactions, missed deadlines, and what critics called a deliberate inversion of the law\u2019s intent: redacting perpetrator names while exposing victim identities.",
      icon_name: "FileText" as const,
      skeptic_premise:
        "The system ultimately worked. Congress passed the Transparency Act with near-unanimous support. The DOJ released 3.5 million pages of documents. A July 2025 DOJ memo concluded that no \u2018client list\u2019 existed, no credible evidence supported blackmail claims, and Epstein\u2019s death was a suicide. The files revealed extensive social connections but no evidence of a grand criminal conspiracy beyond what was already prosecuted. The document release demonstrates institutional transparency, not cover-up.",
      proponent_rebuttal:
        "The release came 20 years after the initial investigation and only after extraordinary public pressure and a near-unanimous congressional mandate. The initial December 2025 release missed the legal deadline and contained hundreds of entirely blacked-out pages. Attorneys for survivors reported that the DOJ redacted the names of perpetrators while failing to redact at least 31 victims who were minors at the time of their abuse \u2014 the precise opposite of the law\u2019s intent. A January 2026 CNN poll found only 6% of Americans were satisfied with what had been released, and nearly half of Republicans, three-quarters of independents, and 9 in 10 Democrats believed the government was still withholding information. Transparency forced by public outcry two decades after the fact is evidence of institutional resistance, not institutional accountability.",
      crux: {
        id: "redaction-justification",
        title: "The Redaction Audit",
        description:
          "The central dispute is whether the DOJ\u2019s redactions protect legitimate interests (ongoing investigations, national security, victim privacy) or conceal evidence of wrongdoing by powerful individuals. An independent audit of redaction decisions would resolve this question.",
        methodology:
          "An independent body with security clearances reviews the unredacted documents and categorizes each redaction by justification: (1) victim privacy, (2) ongoing investigation, (3) national security, (4) law enforcement method, (5) no clear justification. Compare the percentage of redactions in each category against the DOJ\u2019s stated rationale. Assess whether perpetrator names were systematically redacted while victim names were exposed.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$5\u201310M (Independent review panel with security clearances reviewing 3.5M pages)",
      },
      evidence: [
        {
          id: "transparency-act-passage",
          title:
            "Congress Passed Transparency Act 427\u20131 with Bipartisan Supermajority",
          description:
            "The Epstein Files Transparency Act passed the House 427\u20131 on November 18, 2025, with only Rep. Clay Higgins (R-LA) voting against. The Senate passed it by unanimous consent the next day. President Trump signed it into law. The overwhelming bipartisan support reflects a rare consensus that the public interest demanded disclosure.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source: "Congress.gov; Library of Congress",
          sourceUrl:
            "https://www.congress.gov/bill/119th-congress/house-bill/4405",
          reasoning:
            "Congressional voting records are a matter of public record. The near-unanimity is extraordinary and demonstrates broad recognition that existing institutional processes had failed to deliver transparency. However, passage of a transparency law is only indirectly evidence of institutional failure; it more directly demonstrates institutional correction.",
        },
        {
          id: "doj-missed-deadline",
          title:
            "DOJ Missed Legal Deadline, Released Heavily Redacted Initial Batch",
          description:
            "The Transparency Act gave the Attorney General 30 days to release all files, setting a December 19, 2025 deadline. The DOJ released only a partial initial batch on that date, with many documents containing extensive redactions and hundreds of pages entirely blacked out. Subsequent releases continued through January 30, 2026. Both Democratic and Republican lawmakers criticized the DOJ for violating the law it was supposed to implement.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 9,
            directness: 8,
          },
          source: "NPR; CBS News; Axios",
          sourceUrl:
            "https://www.npr.org/2026/01/30/nx-s1-5693904/epstein-files-doj-trump",
          reasoning:
            "The fact that the DOJ failed to comply with the law\u2019s timeline is documented by multiple independent outlets and acknowledged by the DOJ itself. This directly supports the claim of institutional resistance to transparency. The heavy redactions compound the concern.",
        },
        {
          id: "victim-names-exposed",
          title:
            "DOJ Redacted Perpetrators but Exposed at Least 31 Minor Victims",
          description:
            "Attorneys for a group of Epstein survivors reported that the DOJ failed to redact the identities of at least 31 people who were victimized as children, while simultaneously redacting the names of alleged perpetrators. Critics described this as \u2018quite the opposite of what the Epstein Files Transparency Act was meant to do.\u2019 Victim advocates argued the DOJ was protecting the powerful at the expense of those they exploited.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "CBS News; Victim Attorneys\u2019 Statements",
          sourceUrl:
            "https://www.cbsnews.com/live-updates/epstein-files-released-doj-2026/",
          reasoning:
            "The claim comes from victims\u2019 attorneys who have a direct stake in the case, slightly reducing independence. However, the specific claim about exposed victim names is verifiable against the released documents. If true, it represents a profound inversion of the law\u2019s purpose.",
        },
        {
          id: "doj-no-client-list",
          title:
            "DOJ Memo Concludes No \u2018Client List\u2019 Exists; No Evidence of Blackmail",
          description:
            "In July 2025, the DOJ released a memo concluding that the Epstein files contained no \u2018client list,\u2019 no credible evidence that Epstein had blackmailed prominent individuals, and that his death was a suicide. Deputy Attorney General Todd Blanche stated that nothing in the files allowed further prosecutions. The memo aimed to address widespread public speculation about hidden lists of co-conspirators.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 5,
            directness: 7,
          },
          source: "DOJ Memo; Axios; Time",
          sourceUrl:
            "https://www.axios.com/2025/12/19/epstein-files-doj-library-images-photos-trump",
          reasoning:
            "The DOJ has a direct institutional interest in concluding that its files contain nothing further to prosecute, significantly reducing independence. The absence of a formal \u2018client list\u2019 does not mean no additional perpetrators exist \u2014 it means no single document catalogs them. However, the memo\u2019s conclusion cannot be dismissed; it may genuinely reflect the limits of the documentary evidence.",
        },
      ],
    },

    // =========================================================================
    // Pillar 3: The Accountability Gap
    // =========================================================================
    {
      id: "accountability-gap",
      title: "The Accountability Gap",
      short_summary:
        "Beyond Epstein himself and Ghislaine Maxwell, no one has faced criminal conviction in the United States in connection with the trafficking operation. FBI documents name eight alleged co-conspirators. Multiple administrations spanning both parties have declined to bring further charges. Europe has begun its own investigations while US accountability remains stalled.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Accountability has been achieved through multiple channels. Maxwell was convicted on five felony counts and sentenced to 20 years. The Victims\u2019 Compensation Program paid over $121 million to 150 survivors. JPMorgan settled for $290 million and Deutsche Bank for $75 million. Prince Andrew settled with his accuser and lost his royal titles. The system worked: the principal perpetrator died in custody, his chief enabler was convicted, and victims received substantial financial restitution. The absence of additional prosecutions may simply reflect an absence of prosecutable evidence against specific individuals, not institutional failure.",
      proponent_rebuttal:
        "One conviction in a trafficking operation that involved dozens of victims over two decades is not accountability \u2014 it is the bare minimum. FBI documents identify eight alleged co-conspirators, none of whom were charged. Jean-Luc Brunel, a named co-conspirator and modeling agent accused of procuring minors, died in a French prison before trial. The 2007 NPA granted blanket immunity to unnamed co-conspirators, foreclosing prosecution of the network. No administration \u2014 Bush, Obama, Trump (first term), or Biden \u2014 brought sweeping prosecutions. Financial settlements compensate victims but do not punish perpetrators. As the UN noted in February 2026, \u2018no one is too wealthy or too powerful to be above the law,\u2019 yet the pattern across 20 years is precisely the opposite: wealth and power have consistently shielded Epstein\u2019s associates from criminal consequences.",
      crux: {
        id: "co-conspirator-prosecution-test",
        title: "The Co-Conspirator Prosecution Test",
        description:
          "The definitive test of systemic accountability is whether any of the eight FBI-identified co-conspirators, or any other individuals who participated in or facilitated the trafficking, face criminal prosecution based on the 3.5 million pages of released evidence. If the evidence is sufficient to name co-conspirators in FBI documents but insufficient to indict, the gap between identification and prosecution is itself evidence of systemic failure.",
        methodology:
          "An independent special counsel reviews the released evidence against each named co-conspirator, applying the same probable-cause standard used in ordinary sex trafficking cases. Compare the evidentiary threshold applied to Epstein\u2019s associates with the threshold applied to defendants in comparable trafficking cases who lacked wealth and political connections. Assess whether the 2007 immunity clause legally bars prosecution or whether subsequent criminal conduct falls outside its scope.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$10\u201320M (Independent special counsel investigation with prosecutorial authority)",
      },
      evidence: [
        {
          id: "maxwell-conviction",
          title:
            "Ghislaine Maxwell Convicted on Five Felony Counts, Sentenced to 20 Years",
          description:
            "On December 29, 2021, Maxwell was convicted on five of six counts, including sex trafficking of a minor and conspiracy. She was sentenced to 20 years on June 28, 2022. Four victims testified about Maxwell\u2019s role in recruiting, grooming, and participating in abuse. Prosecutors showed she \u2018personally engaged in sexual abuse\u2019 and was \u2018the person most frequently in the room\u2019 during Epstein\u2019s abuse of minors. The conviction demonstrates that criminal prosecution was possible \u2014 but only one person was held accountable.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "SDNY Court Records; NPR; Axios",
          sourceUrl:
            "https://www.npr.org/2021/12/29/1066219689/ghislaine-maxwell-verdict-trial-jeffrey-epstein",
          reasoning:
            "A federal conviction is the strongest possible evidence that the justice system can function. However, directness is slightly reduced because one conviction in a multi-decade, multi-perpetrator trafficking operation raises the question of why the system stopped at Maxwell.",
        },
        {
          id: "victim-compensation",
          title:
            "Victims\u2019 Compensation Fund Paid $121M to 150 Survivors; Banks Settled for $365M",
          description:
            "The Epstein Victims\u2019 Compensation Program received approximately 225 claims and paid over $121 million to about 150 eligible survivors, with over 92% accepting offers. Additionally, JPMorgan Chase settled for $290 million and Deutsche Bank for $75 million over their roles in facilitating Epstein\u2019s finances. Prince Andrew settled with Virginia Giuffre for an undisclosed sum. Total documented financial accountability exceeds $500 million.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source: "ABC News; NPR; NBC News",
          sourceUrl:
            "https://abcnews.com/US/jeffrey-epstein-victims-program-shutting-121-million-paid/story?id=79344412",
          reasoning:
            "Financial compensation is verifiable and meaningful for survivors. However, directness to the meta-claim is moderate because civil settlements and compensation funds do not constitute criminal accountability. JPMorgan and Deutsche Bank paid financial penalties but no individual banker was charged.",
        },
        {
          id: "no-further-prosecutions",
          title:
            "No US Criminal Prosecutions Beyond Maxwell Across Four Administrations",
          description:
            "Despite FBI documents naming eight alleged co-conspirators, no additional individual has faced criminal conviction in the United States in connection with the Epstein trafficking operation. The failure spans the Bush (NPA), Obama, Trump (first term), and Biden administrations. In 2025, the DOJ stated nothing in the files warranted further prosecution. Meanwhile, France reopened investigations in February 2026, and Europe has moved toward its own accountability proceedings \u2014 highlighting the contrast with US inaction.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 10,
          },
          source: "Al Jazeera; CNN; UN News; Gulf News",
          sourceUrl:
            "https://www.aljazeera.com/news/2026/2/24/epstein-files-fallout-muted-us-response-vs-political-reckoning-in-europe",
          reasoning:
            "The absence of prosecutions across four administrations of both parties is the most direct evidence of the accountability gap. The bipartisan nature of the failure undermines any argument that it reflects one party\u2019s obstruction. Europe\u2019s contrasting response provides a natural comparison.",
        },
        {
          id: "brunel-death-in-custody",
          title:
            "Jean-Luc Brunel, Named Co-Conspirator, Died in French Prison Before Trial",
          description:
            "Jean-Luc Brunel, a modeling agent listed in FBI documents as one of Epstein\u2019s co-conspirators, was arrested in France in December 2020 on charges of rape of a minor. He was found hanged in his cell at La Sant\u00e9 Prison on February 19, 2022, before his trial could proceed. French prosecutors concluded suicide. Virginia Giuffre had alleged Brunel procured minors with promises of modeling work. French prosecutors reopened investigations into Brunel\u2019s associates in February 2026.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "NPR; CNN; Democracy Now",
          sourceUrl:
            "https://www.npr.org/2022/02/19/1081961087/jeffrey-epstein-jean-luc-brunel-dead",
          reasoning:
            "Brunel\u2019s death is verified by French judicial records. His case illustrates the accountability gap: one of the few individuals actually charged died before trial, echoing the pattern of Epstein\u2019s own death. The reopening of French investigations in 2026 demonstrates that European systems see prosecutable leads where the US does not.",
        },
      ],
    },
  ],
};

export default epsteinFilesData;
