import type { Topic } from "@/lib/schemas/topic";

export const autonomousWeaponsBanData = {
  id: "autonomous-weapons-ban",
  title: "Banning Killer Robots",
  meta_claim:
    "Lethal autonomous weapons should be banned by international treaty.",
  status: "contested" as const,
  category: "technology" as const,
  last_updated: "2026-06-16",
  tags: ["autonomous-weapons", "ai", "arms-control", "international-law", "warfare"],
  pillars: [
    {
      id: "moral-accountability",
      title: "Accountability & the Human Line",
      short_summary:
        "Whether delegating kill decisions to software creates a 'responsibility gap' that no existing legal framework can close — and whether a ban is the only way to keep a human meaningfully in the loop.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "A machine cannot form criminal intent, so when an autonomous weapon commits what would otherwise be a war crime — striking civilians, a surrendering combatant, or a disproportionate target — there may be no human who can be held responsible. The operator did not choose the specific target; the programmer did not foresee the specific situation; the commander did not pull the trigger. Robert Sparrow argues this 'responsibility gap' means deploying such weapons can be inherently wrong, because the laws of war presuppose an accountable human author of each lethal act. The ICRC, the UN Secretary-General, and 120+ states conclude that the only reliable fix is a treaty that prohibits anti-personnel and unpredictable systems outright.",
      proponent_rebuttal:
        "Existing international humanitarian law already assigns responsibility to the humans who design, field, and order the use of a weapon — exactly as it does for landmines, cruise missiles, or any other system that acts after a human releases it. The US codifies this in DoD Directive 3000.09, which requires 'appropriate levels of human judgment over the use of force' rather than a ban. A commander who deploys a weapon they cannot adequately predict or control is already liable under the principles of distinction and proportionality. A new prohibition is therefore redundant at best, and at worst freezes out beneficial systems while the states most likely to abuse them simply refuse to sign.",
      crux: {
        id: "responsibility-gap-test",
        title: "The Responsibility-Gap Test",
        description:
          "Does delegating target selection to software actually leave a war-crime with no accountable human, or can existing command-responsibility and weapons-review law always trace liability back to a person?",
        methodology:
          "Construct adversarial scenarios (autonomous strike on a protected target) and test each against (1) Rome Statute command responsibility, (2) Article 36 weapons-review obligations, and (3) DoD Directive 3000.09's human-judgment standard. Identify whether any scenario leaves no chargeable human actor.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (legal analysis of existing doctrine)",
      },
      evidence: [
        {
          id: "sparrow-responsibility-gap",
          title: "Peer-Reviewed Case for a Responsibility Gap",
          description:
            "Robert Sparrow's 'Killer Robots' (Journal of Applied Philosophy, 2007) argues that fully autonomous weapons can produce atrocities for which neither the programmer, the commanding officer, nor the machine can fairly be held responsible — and that this unaccountability makes their use ethically impermissible, supporting prohibition.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 4,
            directness: 7,
          },
          source:
            "Sparrow, R. (2007), 'Killer Robots', Journal of Applied Philosophy, 24(1), 62-77",
          sourceUrl:
            "https://onlinelibrary.wiley.com/doi/10.1111/j.1468-5930.2007.00346.x",
          reasoning:
            "Foundational, widely cited peer-reviewed philosophy paper that defines the responsibility-gap argument. Directness and reliability are high; replicability is low because this is a normative argument, not an empirical finding others can reproduce.",
        },
        {
          id: "icrc-position",
          title: "ICRC Recommends Prohibiting Anti-Personnel & Unpredictable Systems",
          description:
            "The International Committee of the Red Cross — guardian of IHL — formally recommends that states prohibit autonomous weapons designed or used to target human beings and those whose effects cannot be sufficiently understood, predicted, and explained, and regulate the rest under meaningful human control.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 9,
          },
          source:
            "ICRC, 'ICRC position on autonomous weapon systems' (2021), International Review of the Red Cross",
          sourceUrl:
            "https://international-review.icrc.org/articles/icrc-position-on-autonomous-weapon-systems-icrc-position-and-background-paper-915",
          reasoning:
            "The ICRC is the authoritative custodian of the Geneva Conventions; its considered legal recommendation directly endorses a targeted prohibition. Independence is high but not maximal, as it is an advocacy-with-mandate body; the recommendation is a reasoned legal position rather than a reproducible measurement.",
        },
        {
          id: "us-ihl-sufficient",
          title: "US Holds Existing IHL Is Sufficient — Regulate, Don't Ban",
          description:
            "Long-standing US policy is that existing international humanitarian law already governs autonomous weapons and that no new treaty is needed. DoD Directive 3000.09 (2012, updated Jan 2023) permits such systems provided they allow commanders to exercise 'appropriate levels of human judgment over the use of force,' assigning accountability to identifiable humans.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 6,
            replicability: 7,
            directness: 8,
          },
          source:
            "Congressional Research Service, 'Defense Primer: U.S. Policy on Lethal Autonomous Weapon Systems' (IF11150); DoD Directive 3000.09 (2023)",
          sourceUrl:
            "https://www.congress.gov/crs-product/IF11150",
          reasoning:
            "CRS is a non-partisan, high-reliability official source documenting actual US policy; the underlying directive is a primary government document. Independence is moderate because it reflects a party's own stated position, but it is direct primary evidence that a leading military power rejects the need for a ban.",
        },
      ],
    },
    {
      id: "verifiability-effectiveness",
      title: "Verifiability & Effectiveness",
      short_summary:
        "Whether a treaty could actually be defined, verified, and enforced against the great powers building these systems — or whether autonomy's software nature makes a ban unverifiable and the holdouts make it toothless.",
      icon_name: "FileText" as const,
      skeptic_premise:
        "Autonomy is a property of software, not of a visible weapon. A 'smart' munition can look identical to a 'dumb' one, so inspectors cannot tell from the outside which algorithm governs a system's behavior. Unlike enriched uranium or chemical precursors, there is no physical signature to count. That makes any ban on autonomous targeting extremely hard to verify, and an unverifiable treaty invites cheating. Worse, the states most committed to building these weapons (Russia voted against the 2024 UN resolution; the US prefers regulation) may never sign, so a treaty could bind only the cautious while the determined race ahead.",
      proponent_rebuttal:
        "Verification difficulty has never stopped successful prohibition norms: the bans on blinding laser weapons (CCW Protocol IV) and anti-personnel landmines work largely through stigma, criminalization, and changed procurement behavior, not perfect inspection. A treaty can regulate observable characteristics — physical design, operational behavior, and the requirement that a human authorize each engagement — and shift the legal and reputational default. And the consensus-based CCW process has produced no binding rules in over a decade precisely because single states can veto progress; the 166-3 UN General Assembly vote in December 2024 shows that a treaty negotiated outside the consensus trap commands near-universal support.",
      crux: {
        id: "verification-test",
        title: "The Verification Test",
        description:
          "Can compliance with a ban on autonomous targeting be verified — by inspection, observable behavior, or hardware controls — to a degree that great powers would accept, or is the software nature of autonomy fundamentally unverifiable?",
        methodology:
          "Assess proposed verification regimes (intrusive inspection, limits on observable physical/behavioral characteristics, compute/hardware controls) against the requirement that a 'smart' and 'dumb' weapon are externally indistinguishable. Compare to verification regimes for landmines and blinding lasers, which rely on norm and procurement rather than detection.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$0-low (policy analysis); a real inspection regime would cost far more",
      },
      evidence: [
        {
          id: "unga-vote-2024",
          title: "166-3 UN General Assembly Vote Backs Action",
          description:
            "On 2 December 2024 the UN General Assembly adopted resolution 79/62 on lethal autonomous weapons systems by 166 votes in favour, 3 against (Belarus, North Korea, Russia), and 15 abstentions — establishing a new UN forum and reflecting that 120+ states support negotiating prohibitions and regulations.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "UN General Assembly Resolution 79/62 (Dec 2024); Human Rights Watch reporting on the vote",
          sourceUrl:
            "https://www.hrw.org/news/2024/12/05/killer-robots-un-vote-should-spur-treaty-negotiations",
          reasoning:
            "The vote tally is an official, reproducible public record. It strongly demonstrates breadth of state support, though it is one step removed from the meta-claim: the resolution opened consultations rather than mandating a ban, so directness is moderate.",
        },
        {
          id: "ccw-consensus-stall",
          title: "CCW Consensus Process Has Produced No Binding Rules in a Decade",
          description:
            "The Convention on Conventional Weapons Group of Governmental Experts has discussed autonomous weapons since 2014 but, bound by a consensus rule, has produced no legally binding instrument — with Russia and a few others using procedural tactics to block streaming and substantive outcomes. Proponents argue this proves a stand-alone treaty is the only viable route.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source:
            "Arms Control Association, 'Geopolitics and the Regulation of Autonomous Weapons Systems' (Jan 2025); UNODA CCW GGE meeting records",
          sourceUrl:
            "https://www.armscontrol.org/act/2025-01/features/geopolitics-and-regulation-autonomous-weapons-systems",
          reasoning:
            "Well-documented account of the consensus deadlock, corroborated by public UN meeting records. It supports the 'treaty is needed' case but is partly an advocacy-leaning analysis, and the deadlock is also cited by opponents as evidence states disagree on substance — so independence and directness are moderate.",
        },
        {
          id: "verification-problem",
          title: "Autonomy Is Software — A Ban May Be Unverifiable",
          description:
            "Lamberth and Scharre (Texas National Security Review, 2023) argue that AI/autonomy is a cognitive property of software: a 'smart' weapon can look identical to a 'dumb' one, and the governing algorithm is not externally observable. Because mutual restraint depends on verifying others' compliance, this makes any ban on autonomous targeting exceptionally hard to verify and enforce.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 8,
          },
          source:
            "Lamberth, M. & Scharre, P. (2023), 'Arms Control for Artificial Intelligence', Texas National Security Review, 6(2)",
          sourceUrl:
            "https://tnsr.org/2023/05/arms-control-for-artificial-intelligence/",
          reasoning:
            "Peer-reviewed national-security analysis by recognized arms-control experts that directly identifies the core verification obstacle to any AI/autonomy ban. The claim is an analytic argument, not a reproducible measurement, so replicability is moderate.",
        },
        {
          id: "russia-precision-argument",
          title: "Major Powers: Autonomy Could Improve Precision; No Preemptive-Ban Precedent",
          description:
            "Russia (and, in milder form, other developers) argues to the CCW that autonomous systems could increase the accuracy of strikes on military targets and lower unintended harm to civilians, and that there is no legal precedent for preemptively banning an entire class of weapon before its effects are known — rejecting calls for a new treaty or a development moratorium.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 4,
            replicability: 5,
            directness: 7,
          },
          source:
            "Congressional Research Service, 'International Discussions Concerning Lethal Autonomous Weapon Systems' (IF11294), summarizing state positions at the CCW",
          sourceUrl:
            "https://www.congress.gov/crs-product/IF11294",
          reasoning:
            "CRS reliably documents that major military powers make this argument, and the document itself is a high-quality neutral source. But the underlying precision claim is a self-interested assertion by states developing the weapons, with no independent evidence yet that fielded autonomous systems reduce civilian harm — hence low independence.",
        },
      ],
    },
  ],
};
