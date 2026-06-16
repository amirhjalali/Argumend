import type { Topic } from "@/lib/schemas/topic";

export const secondAmendmentIndividualRightData = {
  id: "second-amendment-individual-right",
  title: "The Second Amendment: Individual Right?",
  meta_claim:
    "The Second Amendment protects an individual right to bear arms, not merely a collective/militia right.",
  status: "contested" as const,
  category: "policy" as const,
  last_updated: "2026-06-16",
  tags: ["second-amendment", "constitutional-law", "gun-rights", "originalism"],
  pillars: [
    {
      id: "supreme-court-holding",
      title: "What the Supreme Court Held",
      short_summary:
        "Since 2008 the Supreme Court has read the Second Amendment as an individual right — but it did so 5-4, overturning ~70 years of lower-court consensus that the right was militia-tied.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "For nearly seven decades after United States v. Miller (1939), the federal courts of appeals overwhelmingly read the Second Amendment as protecting a right connected to militia service, not a freestanding individual right to private arms. Miller upheld a firearms restriction precisely because the weapon lacked a 'reasonable relationship to the preservation or efficiency of a well regulated militia.' The individual-right reading prevailed only in 2008, by a single vote, in a sharply divided 5-4 Heller decision that four Justices and many constitutional historians argued misread the text and history.",
      proponent_rebuttal:
        "In District of Columbia v. Heller (2008), the Court held that the Second Amendment 'conferred an individual right to keep and bear arms' for self-defense, with the prefatory militia clause announcing a purpose but not limiting the operative right. Two years later McDonald v. City of Chicago (2010) incorporated that individual right against the states. The Court read Miller narrowly — as a holding about which weapons are protected, not about who holds the right — and the Fifth Circuit had already adopted the individual-right model in United States v. Emerson (2001). As binding precedent, the individual right is now settled doctrine even if its historical pedigree is contested.",
      crux: {
        id: "operative-vs-prefatory-clause",
        title: "Does the Militia Clause Limit the Right?",
        description:
          "The whole dispute turns on whether the prefatory clause ('A well regulated Militia...') restricts the operative clause ('the right of the people to keep and bear Arms...') or merely states its motivating purpose. If it restricts, the right is militia-bound; if it only announces a purpose, the right is individual.",
        methodology:
          "Apply 18th-century rules of grammar and legal drafting to the two-clause structure; survey contemporaneous state constitutional arms provisions (some explicitly individual, some militia-linked); and weigh founding-era usage of 'the people,' 'keep,' and 'bear arms' against ratification-era commentary (e.g., the Federalist, state ratifying debates).",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (textual and historical analysis)",
      },
      evidence: [
        {
          id: "heller-holding",
          title: "Heller Held the Right Is Individual",
          description:
            "The Supreme Court held 5-4 (Scalia, J.) that 'the Second Amendment conferred an individual right to keep and bear arms' and that the prefatory militia clause does not limit the operative clause. It struck down D.C.'s handgun ban and explicitly rejected the collective-right theory.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 7,
            replicability: 9,
            directness: 10,
          },
          source:
            "District of Columbia v. Heller, 554 U.S. 570 (2008), Syllabus and Opinion of the Court (Scalia, J.)",
          sourceUrl:
            "https://www.law.cornell.edu/supremecourt/text/07-290.ZS.html",
          reasoning:
            "Maximally direct and authoritative as a matter of US law — it is the controlling holding on the exact meta-claim. Independence is docked because it is a 5-4 ideologically split ruling whose historical reasoning is heavily disputed, not an independent finding of fact.",
        },
        {
          id: "mcdonald-incorporation",
          title: "McDonald Incorporated the Individual Right Against States",
          description:
            "In McDonald v. City of Chicago (2010), the Court held 5-4 that the Heller individual right is 'fully applicable to the States' through the Fourteenth Amendment, reaffirming that the Second Amendment protects an individual right to keep and bear arms for self-defense.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 6,
            replicability: 9,
            directness: 9,
          },
          source:
            "McDonald v. City of Chicago, 561 U.S. 742 (2010), Opinion of the Court (Alito, J.)",
          sourceUrl: "https://www.law.cornell.edu/supremecourt/text/08-1521",
          reasoning:
            "Direct, binding, and reaffirms the individual-right reading. But it builds on Heller rather than independently testing the question, and is again a 5-4 split, so independence is moderate.",
        },
        {
          id: "miller-1939",
          title: "Miller Tied the Right to the Militia",
          description:
            "In United States v. Miller (1939), the Court upheld a National Firearms Act conviction because a sawed-off shotgun had no 'reasonable relationship to the preservation or efficiency of a well regulated militia,' framing the Amendment's 'obvious purpose' as assuring an effective militia. For ~70 years this was read by most courts as a collective/militia right.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "United States v. Miller, 307 U.S. 174 (1939)",
          sourceUrl: "https://en.wikipedia.org/wiki/United_States_v._Miller",
          reasoning:
            "Authoritative pre-Heller Supreme Court precedent whose militia-relationship test grounded the collective-right reading for decades. Directness is high but not maximal because Miller's terse opinion (the respondent never appeared) left its exact holding genuinely ambiguous — which is why Heller could later reinterpret it.",
        },
        {
          id: "stevens-dissent",
          title: "Heller Dissent: A Militia-Tied Right",
          description:
            "Justice Stevens' Heller dissent (joined by 3 Justices) argued 'bear arms' is a familiar military idiom meaning 'to serve as a soldier,' that the Amendment 'was adopted to protect the right of the people of each of the several States to maintain a well-regulated militia,' and that the Framers deliberately omitted any language protecting civilian uses.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 6,
            replicability: 7,
            directness: 9,
          },
          source:
            "District of Columbia v. Heller, 554 U.S. 570 (2008), Stevens, J., dissenting",
          sourceUrl: "https://www.law.cornell.edu/supct/html/07-290.ZD.html",
          reasoning:
            "A Supreme Court dissent directly arguing the collective/militia reading on text and history. It is advocacy within a split decision (so independence is moderate), but it represents four Justices and tracks the mainstream historians' position.",
        },
      ],
    },
    {
      id: "text-and-founding-history",
      title: "Text and Founding-Era Meaning",
      short_summary:
        "Corpus and historical work shows 'bear arms' was used overwhelmingly in a military sense in the 1700s — but 'keep arms,' 'the people,' and several state constitutions point toward a private right too.",
      icon_name: "FileText" as const,
      skeptic_premise:
        "Quantitative corpus-linguistics analysis of founding-era English (the BYU COFEA/COEME corpora) finds that the idiom 'bear arms' was used in a military or collective sense in the large majority of instances — researchers report figures from roughly 80% up to ~95% of uses carrying the 'serve as a soldier / do military service' meaning. Leading constitutional historians (e.g., Saul Cornell) argue the founders understood arms-bearing as a civic obligation tied to a well-regulated militia, and that the modern individual-right reading is largely a 19th-and-20th-century construction.",
      proponent_rebuttal:
        "The corpus debate cuts both ways. Critics show the military-meaning percentages depend on excluding the most contextually relevant texts (constitutional arms provisions) and on coding plural and ambiguous uses as 'collective'; when those are included, literal individual 'carrying' uses rise to roughly a fifth of the sample. Moreover, the Amendment also protects the right to 'keep' arms (plainly possessory), refers to 'the people' (used elsewhere for individual rights), and several founding-era state constitutions secured arms expressly for personal defense — so the text and history are at least genuinely contested, not a clean win for the collective reading.",
      crux: {
        id: "bear-arms-corpus-meaning",
        title: "The Founding-Era 'Bear Arms' Test",
        description:
          "Did 'bear arms,' as ordinary 18th-century Americans used it, refer chiefly to military/collective service, or did it commonly include private individual carrying for self-defense? Frequency of actual usage is the most measurable proxy for original public meaning.",
        methodology:
          "Query large founding-era corpora (COFEA, 1760-1799; COEME) for every instance of 'bear arms'/'keep arms', code each as military-idiomatic, literal-individual, or ambiguous, and report inter-coder reliability. Sensitivity-test results by including vs. excluding constitutional/legal texts and by re-coding plural uses.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (public corpora; data analysis)",
      },
      evidence: [
        {
          id: "corpus-military-meaning",
          title: "'Bear Arms' Was Used Mostly in a Military Sense",
          description:
            "Analyses of the BYU founding-era corpora (COFEA/COEME) by Dennis Baron and others found that 'bear arms' overwhelmingly carried a military/idiomatic meaning ('serve as a soldier, do military service'); Baron reported that of ~1,500 founding-era uses, all but a handful were military, and Goldfarb estimated ~95% conveyed the idiomatic military sense.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 9,
            directness: 7,
          },
          source:
            "Duke Center for Firearms Law, 'Legal Corpus Linguistics and the Meaning of Bear Arms' (2021), summarizing Baron and Goldfarb",
          sourceUrl:
            "https://firearmslaw.duke.edu/2021/07/legal-corpus-linguistics-and-the-meaning-of-bear-arms",
          reasoning:
            "Highly replicable (the corpora are public and queryable) and directly probes original public meaning. Reliability is moderate because the coding of 'military vs. individual' is contested and outcome-sensitive, so it is strong but not decisive evidence for the collective reading.",
        },
        {
          id: "cornell-civic-right",
          title: "Historians: Arms-Bearing Was a Civic/Militia Duty",
          description:
            "Constitutional historian Saul Cornell argues that founders understood the right to bear arms as a civic obligation to participate in a well-regulated militia, that federal courts treated it as a collective right for over a century, and that the modern individual-right view emerged only in the 19th century.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 7,
          },
          source:
            "Saul Cornell, 'A Well-Regulated Militia: The Founding Fathers and the Origins of Gun Control in America' (Oxford Univ. Press, 2006)",
          sourceUrl:
            "https://global.oup.com/academic/product/a-well-regulated-militia-9780195341034",
          reasoning:
            "A leading academic-historian account directly on the meta-claim. Weights are moderate: peer-reviewed scholarship by a domain expert, but historical interpretation is inherently contestable and other historians read the same record as supporting a private right.",
        },
        {
          id: "corpus-individual-carrying",
          title: "Corpus Critiques: Literal Carrying Was Common Too",
          description:
            "Re-analyses (e.g., by Josh Jones, and critiques by Kopel & Wallace) find that when constitutional texts are included and plural/ambiguous uses are not coded as 'collective,' roughly one-fifth of founding-era 'bear arms' uses are literal individual carrying — more than the strongest military-meaning claims imply.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 8,
            directness: 7,
          },
          source:
            "Reason / Volokh Conspiracy (Kopel & Wallace, 2021), 'Corpus Linguistics and the Second Amendment'; summarizing Jones's COFEA re-analysis",
          sourceUrl:
            "https://reason.com/volokh/2021/10/31/corpus-linguistics-and-the-second-amendment/",
          reasoning:
            "Replicable against the same public corpora and directly rebuts the military-meaning percentages by exposing coding choices. Reliability is moderate because it is advocacy-flavored commentary rather than a neutral peer-reviewed study, and a fifth-of-uses still leaves military meaning dominant.",
        },
        {
          id: "emerson-2001",
          title: "Emerson: First Appellate Adoption of Individual Right",
          description:
            "In United States v. Emerson (2001), the Fifth Circuit became the first federal court of appeals to formally adopt the individual-rights ('Standard Model') reading after an extensive review of text and founding history, breaking from the collective-right consensus of its sister circuits and presaging Heller.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source:
            "United States v. Emerson, 270 F.3d 203 (5th Cir. 2001)",
          sourceUrl: "https://en.wikipedia.org/wiki/United_States_v._Emerson",
          reasoning:
            "A federal appellate court reaching the individual-right conclusion through detailed historical analysis, independent of (and prior to) the Supreme Court. Directness and reliability are high; it is one circuit's reading, so not maximal, and it diverged from other circuits at the time.",
        },
      ],
    },
  ],
};
