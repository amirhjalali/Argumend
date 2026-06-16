import type { Topic } from "@/lib/schemas/topic";

export const assistedDyingEuthanasiaData = {
  id: "assisted-dying-euthanasia",
  title: "The Right to Assisted Dying",
  meta_claim:
    "Terminally ill, mentally competent adults have a moral right to medically assisted dying.",
  status: "contested" as const,
  category: "philosophy" as const,
  last_updated: "2026-06-16",
  tags: ["bioethics", "autonomy", "end-of-life", "medicine", "rights"],
  pillars: [
    {
      id: "autonomy-and-rights",
      title: "Autonomy & the Right to Die",
      short_summary:
        "Whether bodily autonomy over the manner and timing of one's own death is a genuine moral and legal right, or whether the state's interest in preserving life overrides it.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "A 'right to die' is not symmetrical with the right to life: many ethical traditions hold human life has intrinsic, inviolable worth that an individual cannot waive, and that medicine's role is to heal, not to cause death. Autonomy is also never exercised in a vacuum — a legal right to assisted death can become a felt duty to die for the old, ill, and dependent, subtly shifting the default for the most vulnerable. Once the state sanctions doctors ending lives on request, the principle is no longer 'my body, my choice' but a new social permission whose boundaries are set by others.",
      proponent_rebuttal:
        "Competent adults already have the legal right to refuse life-sustaining treatment, to sign DNRs, and to receive palliative sedation that hastens death — the law thus already accepts that patients, not the state, govern their own dying. Where the disease, not the patient, is the cause of death and suffering is intolerable, denying a chosen, peaceful death forces a person to endure agony against their will, which is itself a profound harm. Canada's Supreme Court found the blanket prohibition unconstitutional precisely because it overrode this autonomy without being tailored to genuine vulnerability.",
      crux: {
        id: "autonomy-vs-state-interest",
        title: "Does Autonomy Extend to the Timing of Death?",
        description:
          "The load-bearing disagreement is whether a competent adult's authority over their own body includes choosing the manner and timing of an imminent, inevitable death — or whether society's interest in protecting life sets a limit autonomy cannot cross.",
        methodology:
          "Examine how the law already treats analogous choices (refusal of treatment, palliative sedation, advance directives) and whether a coherent moral line can be drawn between 'letting die' and 'helping die.' Test constitutional reasoning (e.g., Carter v. Canada) against legislative and ethical counter-frameworks.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (philosophical and legal analysis)",
      },
      evidence: [
        {
          id: "carter-v-canada",
          title: "Canada's Supreme Court Found a Charter Right",
          description:
            "In Carter v. Canada (2015 SCC 5), a unanimous Supreme Court struck down the blanket criminal prohibition on physician-assisted death, holding it violated section 7 of the Charter (life, liberty, and security of the person) and was overbroad. It declared the ban void for competent adults who clearly consent and have a grievous, irremediable condition causing intolerable suffering.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source:
            "Carter v. Canada (Attorney General), 2015 SCC 5, [2015] 1 SCR 331; Government of Canada, Dept. of Justice summary",
          sourceUrl:
            "https://www.justice.gc.ca/eng/rp-pr/other-autre/ad-am/p1.html",
          reasoning:
            "A unanimous decision of a national high court is highly authoritative on the legal-rights question and directly addresses the meta-claim. It is jurisdiction-specific (Canadian Charter), not a universal moral proof, and reflects a contested legal philosophy, so replicability across jurisdictions is limited.",
        },
        {
          id: "oregon-autonomy-drivers",
          title: "Patients Cite Autonomy and Dignity, Not Unmanaged Pain",
          description:
            "Among the 376 Oregonians who died under the Death with Dignity Act in 2024, the top end-of-life concerns were losing autonomy (88.6%), being less able to engage in enjoyable activities (87.8%), and loss of dignity (63.6%). Inadequate pain control or concern about it was cited by 34.0%, and 92.0% were enrolled in hospice — indicating the choice is typically driven by self-determination rather than failed pain relief.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Oregon Health Authority, 2024 Death with Dignity Act Data Summary (Table 1), published March 27, 2025",
          sourceUrl:
            "https://www.oregon.gov/oha/PH/PROVIDERPARTNERRESOURCES/EVALUATIONRESEARCH/DEATHWITHDIGNITYACT/Documents/year27.pdf",
          reasoning:
            "Official, mandated state surveillance data over 25+ years with consistent year-to-year patterns. It supports the autonomy framing of the meta-claim, but self-reported concerns are an indirect proxy for whether a moral right exists, so directness is moderate.",
        },
        {
          id: "gallup-public-support",
          title: "A Durable Majority Endorses the Right",
          description:
            "Gallup's 2024 polling found 71% of U.S. adults say doctors should be legally allowed to end a terminally ill patient's life by painless means at the patient's request, and 66% support physician-assisted suicide for terminal patients in severe pain. Support has held at or near supermajority levels for decades.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source: "Gallup, 'Most Americans Favor Legal Euthanasia' (2024)",
          sourceUrl: "https://news.gallup.com/poll/648215/americans-favor-legal-euthanasia.aspx",
          reasoning:
            "A reputable, transparent, repeatedly-replicated poll. But popular majorities establish social acceptance, not the existence of a moral right — directness to the normative claim is low, and Gallup itself notes only ~53% find it morally acceptable.",
        },
      ],
    },
    {
      id: "suffering-vs-safeguards",
      title: "Relievable Suffering vs. Vulnerability",
      short_summary:
        "Whether modern palliative care can adequately relieve end-of-life suffering without hastening death, and whether legal safeguards can prevent coercion of the poor, disabled, and depressed.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "If excellent palliative care can relieve nearly all suffering, the moral case for killing collapses — the answer to suffering is better care, not death. Worse, real-world programs show troubling drift: financial pressure, lack of housing, and disability-related deprivation push marginalized people toward assisted death rather than free choice. The UN's disability-rights committee found Canada's expansion of assisted death to non-terminal disabled people 'extremely concerning' and urged repeal, evidence that safeguards erode and 'choice' can mask abandonment.",
      proponent_rebuttal:
        "Palliative care, however good, cannot relieve all suffering: refractory symptoms and existential suffering can persist until death despite optimal care, and the only remaining options — terminal sedation into unconsciousness — already accept hastening death. The Canadian controversy is about NON-terminal eligibility (Track 2), a separate question from the meta-claim's narrow scope of terminally ill, mentally competent adults; 25+ years of Oregon data, restricted to the terminally ill, show no demographic evidence of coercion of the poor or uninsured. Strict eligibility, capacity assessment, waiting periods, and reporting can confine the right to genuine, voluntary cases.",
      crux: {
        id: "can-care-relieve-all-suffering",
        title: "Can Palliative Care Relieve All Suffering Without Coercion?",
        description:
          "The decisive question is empirical: does there remain a class of terminally ill, competent patients whose suffering cannot be relieved by even the best palliative care — and can a legal regime grant them a way out without pressuring the vulnerable into it?",
        methodology:
          "Quantify the prevalence and refractoriness of terminal suffering (pain, dyspnea, existential distress) under optimal palliative care; audit the demographics and circumstances of those using assisted-dying laws for evidence of coercion or socioeconomic pressure; compare terminal-only regimes (Oregon) with broader ones (Canada Track 2).",
        verification_status: "verified" as const,
        cost_to_verify: "$300K (clinical review + registry data analysis)",
      },
      evidence: [
        {
          id: "refractory-existential-suffering",
          title: "Some Suffering Is Refractory to Even the Best Care",
          description:
            "Palliative-care scholarship recognizes that pain at the end of life can be refractory to even the best symptom management and that suffering has physical, psychosocial, spiritual, and existential dimensions that an integrated approach may still not fully relieve — leaving terminal sedation, which itself accepts hastening death, as the remaining option. This undermines the claim that optimal palliative care can always make assisted dying unnecessary.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source:
            "George P. Smith Jr., 'Refractory Pain, Existential Suffering, and Palliative Care: Releasing an Unbearable Lightness of Being,' Cornell Journal of Law and Public Policy 20(3), 2011; PubMed 25330560",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/25330560/",
          reasoning:
            "A law-and-policy review article (not an empirical outcomes study) synthesizing palliative-medicine concepts; it establishes that refractory and multidimensional suffering exists without quantifying how often, so reliability, replicability, and directness are moderate.",
        },
        {
          id: "un-crpd-track2",
          title: "UN Disability Committee Warns of Coercion Drift",
          description:
            "The UN Committee on the Rights of Persons with Disabilities, in its March 26, 2025 Concluding Observations, called Canada's Track 2 regime (assisted death for non-terminal disabled people) 'extremely concerning' and recommended repealing it, citing discrimination and threats to the right to life of persons with disabilities.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source:
            "UN CRPD Committee, Concluding Observations on Canada (advance unedited, 26 March 2025), as reported by ARCH Disability Law Centre",
          sourceUrl:
            "https://archdisabilitylaw.ca/the-united-nations-releases-concluding-observations-on-canadas-review-of-disability-rights-implementation/",
          reasoning:
            "An authoritative international human-rights body, which weakens the 'safeguards always hold' position. But its concern targets NON-terminal (Track 2) eligibility — outside the meta-claim's narrow terminally-ill scope — so its directness against the specific claim is limited; cited via a disability-law summary pending the final OHCHR text.",
        },
        {
          id: "disability-devaluation-argument",
          title: "Legalization May Signal That Some Lives Are Worth Less",
          description:
            "Disability-rights scholarship argues assisted-dying laws can communicate that disabled, ill, or dependent lives are 'less worth living,' feeding prejudice and indirectly pressuring vulnerable people. (Notably, the bioethicist surveying these arguments, Colburn 2022, ultimately concludes they fail and that prohibition itself disrespects autonomy — so the strongest statement of the worry comes from a source that rejects it.)",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 4,
            directness: 5,
          },
          source:
            "B. Colburn, 'Disability-based arguments against assisted dying laws,' Bioethics 36(6), 2022",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9322678/",
          reasoning:
            "A peer-reviewed survey of the devaluation/expressivist argument. Weighted modestly because the cited author concludes these arguments do NOT succeed; the worry is real and widely held but contested, and it is an expressive/indirect harm rather than a direct refutation of the right.",
        },
        {
          id: "oregon-financial-burden",
          title: "Financial and Burden Pressures Are Present, If Minority",
          description:
            "Oregon's 2024 data show 42.0% of those who died cited being a burden on family, friends, or caregivers, and 9.3% cited financial implications of treatment — small but non-trivial shares suggesting external pressures, not purely autonomous preference, can influence the choice.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source:
            "Oregon Health Authority, 2024 Death with Dignity Act Data Summary (Table 1: end-of-life concerns)",
          sourceUrl:
            "https://www.oregon.gov/oha/PH/PROVIDERPARTNERRESOURCES/EVALUATIONRESEARCH/DEATHWITHDIGNITYACT/Documents/year27.pdf",
          reasoning:
            "Official state data — high reliability. But 'burden' and financial concern are self-reported worries, not proof of coercion, and they are minority concerns dwarfed by autonomy; this complicates the 'fully voluntary' framing without disproving it, so directness is moderate.",
        },
      ],
    },
  ],
};
