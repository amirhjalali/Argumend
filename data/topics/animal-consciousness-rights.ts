export const animalConsciousnessRightsData = {
  id: "animal-consciousness-rights",
  title: "Animal Consciousness & Moral Rights",
  meta_claim:
    "Scientific evidence increasingly demonstrates that many animals possess rich subjective experiences and consciousness, which morally obligates humanity to extend rights protections far beyond current legal frameworks.",
  status: "contested" as const,
  category: "philosophy" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Neuroscience of Animal Consciousness
    // =========================================================================
    {
      id: "neuroscience-animal-consciousness",
      title: "Neuroscience of Animal Consciousness",
      short_summary:
        "Growing scientific evidence — from mirror self-recognition tests to neural correlate studies, documented tool use, grief behaviors, and play — suggests that consciousness is far more widespread in the animal kingdom than previously assumed. The 2012 Cambridge Declaration on Consciousness and the 2024 New York Declaration have formalized this scientific consensus, but debate remains about which animals are conscious and what their experiences are like.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "The evidence for animal consciousness is plagued by anthropomorphism and methodological problems. Mirror self-recognition tests — long considered the gold standard — have been passed by magpies and cleaner wrasse fish, either proving that fish are self-aware (unlikely) or that the test measures something other than consciousness. Neural correlate studies show that animals have brain structures associated with emotion and arousal in humans, but homologous structures do not guarantee homologous experiences. A thermostat responds to temperature without feeling hot. Octopuses have complex nervous systems but share no common brain architecture with mammals — their 'intelligence' may be fundamentally alien and non-conscious. The Cambridge Declaration was a statement by 13 scientists at a conference, not a peer-reviewed finding. We have no way to objectively measure subjective experience in another species. Claiming animals are conscious risks projecting human experience onto creatures whose inner lives we cannot access.",
      proponent_rebuttal:
        "The same argument — we cannot know what it is like to be another mind — applies equally to other humans. We infer consciousness in humans through behavior, neural activity, and evolutionary continuity; the same inference applies to animals with homologous neural structures and analogous behaviors. The 2024 New York Declaration on Animal Consciousness, signed by 39 leading neuroscientists and philosophers of mind, states there is 'strong scientific evidence' for consciousness in all mammals and birds, and a 'realistic possibility' for consciousness in all vertebrates, cephalopods, and some insects. This is not anthropomorphism — it is following the evidence where it leads. Crows solve multi-step causal reasoning problems, elephants mourn their dead for days, rats show empathic behavior by freeing trapped companions even when given the option of eating chocolate instead, and octopuses demonstrate play behavior with no survival function. The most parsimonious explanation for these behaviors, given the neural substrate evidence, is conscious experience.",
      crux: {
        id: "consciousness-detection-method",
        title: "The Cross-Species Consciousness Detection Challenge",
        description:
          "If a rigorous, non-anthropocentric method for detecting consciousness can be developed and validated — one that reliably distinguishes conscious from non-conscious systems without assuming human-like consciousness as the template — and this method detects consciousness across a broad range of animal taxa, the case for widespread animal consciousness becomes compelling. If no such method can be developed, the question may remain permanently underdetermined.",
        methodology:
          "Develop and validate at least two independent consciousness detection paradigms that do not rely on behavioral similarity to humans. Candidates include perturbational complexity index (PCI) adapted for non-human brains, Integrated Information Theory (IIT) measurements of phi, and adversarial collaboration studies where proponents and skeptics of animal consciousness pre-register predictions about neural signatures in specific taxa. Test across mammals, birds, fish, cephalopods, and insects.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$10-30M (Multi-lab, multi-species neuroscience research program over 5-10 years)",
      },
      evidence: [
        {
          id: "cambridge-declaration-consciousness",
          title: "Cambridge Declaration on Consciousness (2012)",
          description:
            "In 2012, a group of prominent neuroscientists including Stephen Hawking signed the Cambridge Declaration on Consciousness, stating: 'The weight of evidence indicates that humans are not unique in possessing the neurological substrates that generate consciousness. Non-human animals, including all mammals and birds, and many other creatures including octopuses, also possess these neurological substrates.' The declaration was based on convergent evidence from neuroanatomy, neurochemistry, electrophysiology, and behavioral studies.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Cambridge Declaration on Consciousness; University of Cambridge",
          sourceUrl: "http://fcmconference.org/img/CambridgeDeclarationOnConsciousness.pdf",
          reasoning:
            "Signed by leading neuroscientists at a major scientific conference. However, it is a consensus statement rather than a peer-reviewed study, and consensus statements can reflect the biases of the signatories. The declaration asserts the existence of 'neurological substrates' for consciousness but does not resolve the hard problem of how neural substrates produce subjective experience.",
        },
        {
          id: "new-york-declaration-2024",
          title: "New York Declaration on Animal Consciousness (2024)",
          description:
            "The 2024 New York Declaration on Animal Consciousness, signed by 39 leading researchers in neuroscience, philosophy, and animal behavior, goes further than the Cambridge Declaration by asserting 'strong scientific support' for consciousness in all mammals and birds, and a 'realistic possibility' of consciousness in all vertebrates (including fish and reptiles), cephalopods (octopuses, squid), and some arthropods (insects, crustaceans). The declaration calls for animal consciousness to be taken seriously in policy and ethical deliberation even where certainty is impossible.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "New York Declaration on Animal Consciousness; NYU",
          sourceUrl: "https://sites.google.com/nyu.edu/nydeclaration/declaration",
          reasoning:
            "Broader and more specific than the Cambridge Declaration, with more signatories and extending consciousness claims to fish and invertebrates. The declaration is a strong signal of evolving scientific consensus. However, 'realistic possibility' is a weaker claim than 'strong evidence,' and declarations are not peer-reviewed empirical findings. The extension to insects is particularly controversial.",
        },
        {
          id: "rat-empathy-experiment",
          title: "Rats Free Trapped Companions Over Eating Chocolate (2011)",
          description:
            "In a landmark experiment published in Science, researchers at the University of Chicago showed that free rats consistently opened a restrainer to liberate a trapped companion rat, even when given the alternative of accessing chocolate chips (a highly preferred food). Rats opened the restrainer for companions but not for empty restrainers or toy rats, suggesting the behavior was motivated by the distress of the trapped rat rather than curiosity or habit. The researchers interpreted this as evidence of empathy-driven prosocial behavior in rats.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "Science; University of Chicago",
          sourceUrl: "https://doi.org/10.1126/science.1210789",
          reasoning:
            "Published in Science, one of the highest-impact journals, with rigorous experimental controls. The study has been replicated with modifications, though some replications showed weaker effects. Directness for the consciousness question is moderate because prosocial behavior could theoretically occur without conscious empathy, though this interpretation becomes increasingly strained as behavioral complexity increases.",
        },
        {
          id: "anthropomorphism-critique",
          title: "Animal Behavior Can Be Explained Without Invoking Consciousness — Morgan's Canon",
          description:
            "Lloyd Morgan's Canon, a foundational principle of animal behavior science, states that animal behavior should not be interpreted as the product of higher mental processes (like consciousness) if it can be explained by simpler mechanisms (like conditioning, instinct, or reflexive responses). Critics of animal consciousness claims argue that tool use, apparent grief, and 'prosocial' behavior can all be explained by evolutionary adaptations that do not require subjective experience. Bees perform complex navigation and communication (waggle dance) through mechanisms that are well understood to be non-conscious. The assumption that behavioral complexity implies consciousness may be fundamentally mistaken.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "Animal Cognition; Cambridge University Press",
          sourceUrl: "https://doi.org/10.1017/CBO9780511529627",
          reasoning:
            "Morgan's Canon is a well-established scientific principle that provides a legitimate check on anthropomorphic over-interpretation. The methodological concern is valid — behavioral complexity does not necessarily imply consciousness. However, critics of Morgan's Canon argue that in cases of convergent neural and behavioral evidence, invoking 'simpler' non-conscious explanations may itself be the less parsimonious interpretation.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Moral Philosophy
    // =========================================================================
    {
      id: "moral-philosophy",
      title: "Moral Philosophy of Animal Rights",
      short_summary:
        "Multiple philosophical frameworks — utilitarian (Singer), deontological (Regan), and relational (Donaldson/Kymlicka) — argue for extending moral rights to animals based on their capacity for suffering. The central philosophical question is whether consciousness necessarily entails moral status, and whether human moral frameworks can meaningfully apply to non-human beings.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The leap from 'this animal is conscious' to 'therefore we must grant it rights' involves philosophical assumptions that are far from self-evident. Rights are social contracts between beings who can reciprocate obligations — animals cannot sign contracts, vote, or bear moral responsibility. Peter Singer's utilitarian framework reduces morality to suffering minimization, but this would also require us to intervene in nature to prevent predation (wild animal suffering), which is absurd. Tom Regan's deontological approach grants 'inherent value' to all 'subjects of a life,' but the boundary of who counts as a 'subject of a life' is arbitrary — does a mosquito have inherent value? A bacterium? Moreover, the history of 'animal rights' philosophy emerges from wealthy Western societies where basic human rights are already secured; the 60% of humanity living on under $10/day might reasonably prioritize human welfare over animal welfare.",
      proponent_rebuttal:
        "The social contract argument proves too much — it would also exclude human infants, severely cognitively disabled individuals, and future generations from moral consideration, since none of these can reciprocate obligations. We extend rights to these groups because they have morally relevant interests (especially the interest in not suffering), not because they can sign contracts. Singer's argument is not that animals have equal moral status to humans but that equal suffering deserves equal consideration — that torturing a dog for entertainment is wrong for the same reason torturing a child is wrong. The 'where do you draw the line' objection applies to every moral framework — the existence of borderline cases does not invalidate clear cases. Factory farming 80 billion land animals per year in conditions of extreme confinement and suffering is not a borderline case. And the argument that animal welfare is a rich-world luxury is empirically wrong: India, one of the world's largest developing nations, has a deep cultural tradition of animal welfare, and the Jain tradition of ahimsa predates Western philosophy by millennia.",
      crux: {
        id: "suffering-moral-status-link",
        title: "The Suffering-to-Rights Bridge Test",
        description:
          "If a coherent moral framework can be articulated that extends rights to conscious animals without generating absurd conclusions (e.g., requiring intervention against predation, or granting rights to bacteria), and if this framework commands broad philosophical support, then the moral case for animal rights is strong. If every proposed framework generates unacceptable implications when applied consistently, the moral case remains contested.",
        methodology:
          "Convene an adversarial collaboration between leading animal rights philosophers (Singer, Nussbaum, Donaldson/Kymlicka) and critics (Scruton, Cohen, Hsiao) to identify a specific set of test cases and pre-register their framework predictions. Assess which framework handles the full range of cases (clear cases, borderline cases, and reductio cases) most coherently. Publish the results as a structured dialogue with transparently evaluated arguments.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$200K (Structured philosophical adversarial collaboration and publication)",
      },
      evidence: [
        {
          id: "singer-animal-liberation",
          title: "Peter Singer's 'Animal Liberation' Argument: Equal Suffering Deserves Equal Consideration (1975)",
          description:
            "In 'Animal Liberation' (1975), philosopher Peter Singer argued that the capacity for suffering — not species membership — is the morally relevant criterion for moral consideration. Singer coined the term 'speciesism' to describe the arbitrary privileging of human interests over animal interests analogous to racism or sexism. His utilitarian framework holds that the suffering of a pig in a factory farm deserves equal moral weight to equivalent suffering in a human, and that most animal agriculture and experimentation cannot be justified by the benefits to humans. The book has been called 'the bible of the animal rights movement' and has sold over 3 million copies.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "Animal Liberation, Peter Singer; Princeton University",
          sourceUrl: "https://press.princeton.edu/books/paperback/9780061711305/animal-liberation",
          reasoning:
            "Singer is among the most cited living philosophers, and his argument has withstood 50 years of criticism while remaining influential. The utilitarian framework is logically coherent but rests on premises (that suffering is the primary moral currency, that interspecies comparisons of suffering are meaningful) that not all moral philosophers accept. Independence is moderate because Singer is an advocate, not a neutral analyst.",
        },
        {
          id: "factory-farming-scale",
          title: "80 Billion Land Animals Are Factory Farmed Annually Worldwide",
          description:
            "According to the FAO and Compassion in World Farming, approximately 80 billion land animals are slaughtered for food annually, with the vast majority raised in industrial factory farming conditions involving extreme confinement (battery cages, gestation crates, overcrowded broiler houses), painful procedures without anesthesia (debeaking, tail docking, castration), and slaughter methods with significant failure rates. If even a fraction of these animals are conscious and capable of suffering, the scale of animal suffering in industrial agriculture dwarfs any other ethical issue in human history.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "FAO; Compassion in World Farming; USDA",
          sourceUrl: "https://www.fao.org/animal-production/en/",
          reasoning:
            "The production scale data is from authoritative intergovernmental and government sources. The welfare conditions described are well-documented. Directness is somewhat lower because the evidence establishes the scale of potential suffering but does not independently resolve whether the animals are conscious or whether consciousness entails rights — those are the philosophical questions at issue.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Practical Implications
    // =========================================================================
    {
      id: "practical-implications",
      title: "Practical Implications & Feasibility",
      short_summary:
        "If animal consciousness and rights claims are accepted, the implications for agriculture, medical research, pet ownership, wildlife conservation, and the global economy would be profound. The question is whether incremental welfare improvements or full abolitionism is the right approach, and whether modern civilization can function without animal exploitation.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Extending meaningful rights to animals would require the effective end of animal agriculture ($1.5 trillion global industry employing hundreds of millions of people), the cessation of most biomedical research using animals (which has contributed to virtually every major medical advance of the past century), the abolition of pet ownership (which animal rights theorists like Gary Francione argue is inherently exploitative), and the end of pest control, wildlife management, and countless other practices that depend on treating animal interests as subordinate to human interests. This is not a minor policy adjustment — it is a civilizational transformation that no society is prepared to undertake. Incremental welfare improvements (larger cages, less painful slaughter methods) are achievable and meaningful; abolitionist rights frameworks are utopian fantasies that, if taken seriously, would collapse food systems and medical research.",
      proponent_rebuttal:
        "The same 'civilizational collapse' argument was made against abolishing slavery, granting women the right to vote, and ending child labor — all of which required fundamental restructuring of economic systems. Plant-based and cultivated meat industries are growing at 20%+ annually and will make animal agriculture economically obsolete within decades regardless of the rights question. Non-animal research methods (organoids, AI drug screening, organ-on-a-chip) are increasingly outperforming animal models — the FDA Modernization Act 2.0 (2022) eliminated the requirement for animal testing before human drug trials. The claim that animal rights requires ending pet ownership misrepresents the dominant position: Donaldson and Kymlicka's relational framework explicitly supports companion animal relationships while opposing commodification. The transition need not be overnight; slavery was abolished over decades through a combination of moral argument, economic alternatives, and legal reform. The same trajectory is already underway for animal exploitation.",
      crux: {
        id: "alternative-viability-test",
        title: "The Alternative Systems Viability Assessment",
        description:
          "If plant-based proteins, cultivated meat, and non-animal research methods can match the nutritional output, medical progress, and economic productivity of current animal-dependent systems within 20 years at comparable or lower cost, then the practical objection to animal rights loses its force. If alternatives remain substantially inferior in nutrition, research outcomes, or affordability, the practical case for continued animal use (under improved welfare conditions) remains strong.",
        methodology:
          "Track annual improvements in plant-based protein price parity, cultivated meat production costs, nutritional completeness of animal-free diets, and success rates of non-animal testing methods vs. animal models across drug development pipelines. Compare cost and efficacy trajectories to model the timeline for viable alternatives at global scale.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$1-2M (Techno-economic analysis of alternative protein and non-animal research trajectories)",
      },
      evidence: [
        {
          id: "fda-modernization-act",
          title: "FDA Modernization Act 2.0 Eliminates Mandatory Animal Testing (2022)",
          description:
            "The FDA Modernization Act 2.0, signed into law in December 2022, eliminated the federal mandate requiring animal testing for drug development before human clinical trials. The law allows drug developers to use alternative testing methods including cell-based assays, organ-on-a-chip technology, computer modeling, and other non-animal approaches. This represents a historic shift in the regulatory framework that had required animal testing since 1938. Proponents argue it acknowledges both the ethical problems with animal testing and the growing superiority of alternative methods.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 10,
            directness: 7,
          },
          source: "US Congress; FDA; Nature",
          sourceUrl: "https://www.congress.gov/bill/117th-congress/senate-bill/5002",
          reasoning:
            "The law is a verifiable legislative fact with direct bearing on the feasibility of reducing animal use in research. Its passage by Congress with bipartisan support demonstrates mainstream acceptance of non-animal alternatives. However, the law permits rather than requires the use of alternatives, and the practical uptake will depend on whether alternatives prove scientifically superior, which remains to be fully demonstrated.",
        },
        {
          id: "animal-agriculture-economic-scale",
          title: "Global Animal Agriculture Is a $1.5 Trillion Industry Employing Hundreds of Millions",
          description:
            "The global animal agriculture industry generates approximately $1.5 trillion in annual revenue and provides livelihoods for an estimated 1 billion people worldwide, many of them in low-income communities with few economic alternatives. In the developing world, livestock ownership is often the primary form of savings, insurance, and social status for rural families. Any realistic transition away from animal agriculture must account for this economic dependence and provide viable alternatives for the world's poorest populations.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "FAO; World Bank; OECD",
          sourceUrl: "https://www.fao.org/animal-production/en/",
          reasoning:
            "The economic data from FAO and World Bank is authoritative and directly relevant to the feasibility of animal rights implementation. The point about developing-world dependence on livestock is particularly strong — advocating for rapid elimination of animal agriculture without addressing the livelihoods of a billion people is politically and morally untenable. This evidence challenges the abolitionist position more than the welfare improvement position.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Cambridge Declaration on Consciousness (2012)",
      url: "http://fcmconference.org/img/CambridgeDeclarationOnConsciousness.pdf",
    },
    {
      title: "New York Declaration on Animal Consciousness (2024)",
      url: "https://sites.google.com/nyu.edu/nydeclaration/declaration",
    },
    {
      title: "Empathy and Pro-Social Behavior in Rats — Science (2011)",
      url: "https://doi.org/10.1126/science.1210789",
    },
    {
      title: "Animal Liberation — Peter Singer (Princeton University Press)",
      url: "https://press.princeton.edu/books/paperback/9780061711305/animal-liberation",
    },
    {
      title: "FDA Modernization Act 2.0 — Congress.gov",
      url: "https://www.congress.gov/bill/117th-congress/senate-bill/5002",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Which animals are conscious, and how do we know?",
      content:
        "The 2024 New York Declaration recognizes a 'realistic possibility' of consciousness in all vertebrates and many invertebrates. But 'realistic possibility' is not certainty. We cannot access another being's subjective experience directly. The best evidence comes from convergent neural, behavioral, and evolutionary indicators — but debate continues about where to draw the line.",
    },
    {
      id: "q2",
      title: "Does consciousness necessarily entail moral rights?",
      content:
        "The gap between 'this animal suffers' and 'therefore we must grant it rights' involves philosophical assumptions not everyone shares. Utilitarian frameworks prioritize reducing suffering; deontological frameworks emphasize inherent moral value; relational frameworks focus on our social relationships with animals. Each generates different practical conclusions.",
    },
    {
      id: "q3",
      title: "Can industrial civilization exist without animal exploitation?",
      content:
        "Agriculture, medicine, materials, and entertainment all currently depend on animal use. Plant-based alternatives and non-animal research methods are advancing rapidly but have not yet achieved full parity. The question is whether transition is feasible at global scale within a reasonable timeframe, and how to manage the economic impact on the billion people whose livelihoods depend on livestock.",
    },
  ],
};
