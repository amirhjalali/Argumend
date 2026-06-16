import type { Topic } from "@/lib/schemas/topic";

export const meaningWithoutReligionData = {
  id: "meaning-without-religion",
  title: "Meaning of Life Without Religion",
  meta_claim:
    "A meaningful, fulfilling human life is fully achievable without religious belief, and secular philosophical frameworks provide adequate foundations for purpose, ethics, and existential satisfaction.",
  status: "highly_speculative" as const,
  category: "philosophy" as const,
  pillars: [
    {
      id: "secular-meaning-frameworks",
      title: "Secular Philosophical Frameworks",
      short_summary:
        "Existentialism, Stoicism, and secular humanism all offer frameworks for meaning. None of them replicate the weekly community that a church provides.",
      icon_name: "HelpCircle" as const,
      skeptic_premise:
        "Religion provides a uniquely integrated package: a coherent cosmology, an objective moral framework, a sense of ultimate purpose, community belonging, rituals for life transitions, and hope for transcendence beyond death. Secular philosophies offer fragments of this but no single framework that matches religion's comprehensiveness. Pew Research data shows religious Americans report higher happiness (36% 'very happy' vs. 25% for unaffiliated). Existentialism's answer—'create your own meaning'—may be liberating for the philosophically inclined but offers cold comfort to most people facing suffering and mortality.",
      proponent_rebuttal:
        "Philosophical worldviews, humanism, and deeply held personal principles can provide the same core ingredients that make religion effective: a coherent understanding of the world, a sense of purpose and mattering, a feeling of belonging, and opportunities for transcendence. Recent sociology of the nonreligious finds that what predicts wellbeing is not the mere absence of belief but whether people experience their nonreligion as comforting rather than anxiety-producing—and that this comfort is cultivated over time through participation in nonreligious communities. This suggests the relevant ingredient is supportive belonging and a settled affective relationship to one's worldview, both of which secular life can supply, rather than anything metaphysically unique to religion. The most secular societies on Earth (Denmark, Sweden, the Netherlands) consistently rank among the happiest and most socially cohesive—though, as critics fairly note, that may owe more to strong welfare states than to irreligion itself.",
      crux: {
        id: "secular-wellbeing-longitudinal",
        title: "Longitudinal Study of Secular vs. Religious Wellbeing",
        description:
          "A rigorous longitudinal comparison of life satisfaction, meaning, resilience, and community connection between committed secular humanists and committed religious practitioners, controlling for socioeconomic status and social support.",
        methodology:
          "Recruit matched cohorts of committed secular humanists and committed religious practitioners. Measure meaning in life (MLQ), life satisfaction (SWLS), psychological resilience, social connectedness, and coping with adversity over a 10-year period. Control for income, education, health, and social network size.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$3M (10-year longitudinal cohort study)",
      },
      evidence: [
        {
          id: "committed-nonreligious-wellbeing",
          title: "Among the Nonreligious, Comfort and Community—Not Mere Unbelief—Predict Wellbeing",
          description:
            "A 2025 study in Sociology of Health & Illness, \"Varieties of Nonreligious Experience\" (Frost, Edgell & Miller), used a 2020 national survey of Americans to examine how nonreligious identity, identity duration, involvement in nonreligious organizations, and affective orientation predict self-reported health, happiness, and life satisfaction. The primary predictor of wellbeing among the nonreligious was affective orientation—whether people experience their nonreligion as comforting rather than anxiety-producing—which the authors find is shaped over time by participation in nonreligious organizations. This indicates that how supported nonreligious people feel in their worldview matters more than the mere absence of religious belief.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source:
            "Frost, Edgell & Miller, \"Varieties of Nonreligious Experience: Expanding Understandings of Nonreligious Wellbeing,\" Sociology of Health & Illness 47(5):e70060 (2025)",
          sourceUrl: "https://doi.org/10.1111/1467-9566.70060",
          reasoning:
            "Important nuance: the comparison is between committed secular people and committed religious people. The broader nonreligious population (which includes disengaged and apathetic individuals) may fare worse.",
        },
        {
          id: "pew-happiness-gap",
          title: "Pew: Religious Americans Report Higher Happiness",
          description:
            "Pew Research Center data consistently shows that actively religious Americans report higher levels of happiness than both inactively religious and unaffiliated individuals. In the US, 36% of the actively religious describe themselves as 'very happy,' compared to 25% of the inactively religious and 25% of the unaffiliated.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 9,
            directness: 7,
          },
          source:
            "Pew Research Center, \"Religion's Relationship to Happiness, Civic Engagement and Health Around the World\" (Jan. 31, 2019)",
          sourceUrl:
            "https://www.pewresearch.org/religion/2019/01/31/religions-relationship-to-happiness-civic-engagement-and-health-around-the-world/",
          reasoning:
            "Gold-standard polling data. However, the happiness gap may reflect social community effects (church attendance provides social bonds) rather than metaphysical beliefs per se. In more secular societies (Northern Europe), the gap narrows or disappears.",
        },
        {
          id: "scandinavian-secular-happiness",
          title: "Most Secular Nations Rank Among the Happiest",
          description:
            "Finland, Denmark, Sweden, and the Netherlands—among the most secular nations on Earth—consistently rank in the top 10 of the World Happiness Report; in the 2024 edition Finland was 1st, Denmark 2nd, Sweden 4th, and the Netherlands 6th. These societies have some of the lowest rates of religious belief but achieve high life satisfaction through strong social safety nets, trust in institutions, and cultural emphasis on community. This suggests societal-level secularism is compatible with (and may even facilitate) human flourishing.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source:
            "World Happiness Report 2024 (Wellbeing Research Centre, University of Oxford / Gallup / UN SDSN)",
          sourceUrl: "https://www.worldhappiness.report/ed/2024/",
          reasoning:
            "Robust data across multiple years and metrics. However, directness is limited because these nations' happiness likely stems from social democratic institutions, not secularism itself—it is difficult to isolate the effect of irreligion from strong safety nets.",
        },
      ],
    },
    {
      id: "ethics-without-god",
      title: "Moral Foundations Without Religion",
      short_summary:
        "Dostoevsky wrote 'if God is dead, everything is permitted.' Secular ethicists have spent 150 years arguing he was wrong. The debate is unresolved.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Without a transcendent ground, the skeptic argues, moral claims lose their authority: 'cruelty is wrong' becomes a strongly held preference rather than a binding fact, and there is no clear answer to the person who simply rejects it. Evolutionary accounts of morality (kin selection, reciprocal altruism) explain why we feel moral emotions but not why those emotions track genuine obligations we ought to obey. Secular ethicists offer competing foundations—flourishing, contracts, the categorical imperative—but their persistent disagreement is itself the point: the question Dostoevsky dramatized as 'if there is no God, everything is permitted' has no consensus secular answer. And when 20th-century regimes deliberately tore out religious moral constraints and installed ideological absolutes in their place (the Soviet Union, Maoist China, the Khmer Rouge), the human cost was catastrophic—suggestive, the skeptic says, of what is risked when no authority stands above the state.",
      proponent_rebuttal:
        "Secular ethics grounds morality in human flourishing, suffering reduction, and rational principles (Kantian ethics, contractualism, utilitarianism) that do not require divine authority. The Euthyphro dilemma presses the point: either God commands what is independently good (so goodness does not depend on God) or good is simply whatever God commands (which risks making morality arbitrary). This does not by itself refute divine-command theory—sophisticated theists such as Robert Adams answer it by grounding the good in God's necessarily loving nature, and the Stanford Encyclopedia of Philosophy treats that defense as live—but it does show that morality can be articulated and justified without appeal to a deity. Empirically, modern secular societies with the lowest religious belief sustain low crime, high social trust, and robust prosocial norms, demonstrating that ethical life does not collapse when religious sanction recedes.",
      crux: {
        id: "moral-foundation-independence",
        title: "Empirical Test of Moral Behavior vs. Religious Belief",
        description:
          "Determining whether religious belief actually predicts more moral behavior (charity, honesty, prosocial action) than secular moral commitments, after controlling for community engagement.",
        methodology:
          "Large-scale behavioral study comparing prosocial behavior (charitable giving, honesty in economic games, volunteering, altruistic punishment of unfairness) between religious and secular individuals. Control for community participation, income, education, and social desirability bias. Use behavioral measures, not self-report.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500K (Cross-cultural behavioral economics study)",
      },
      evidence: [
        {
          id: "euthyphro-dilemma",
          title: "Euthyphro Dilemma: A Standing Challenge to Divine Command Theory",
          description:
            "Plato's Euthyphro dilemma (circa 380 BCE) poses a challenge to religious moral foundations: Is something good because God commands it, or does God command it because it is good? If the former, morality risks being arbitrary (God could command cruelty); if the latter, goodness exists independently of God, so religion is not strictly necessary for ethics. The dilemma remains a central reference point in the philosophy of religion, though it is not settled—the Stanford Encyclopedia of Philosophy notes that contemporary philosophers have defended divine command theory against this and related objections.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Plato, Euthyphro; \"Religion and Morality,\" Stanford Encyclopedia of Philosophy (rev. 2024)",
          sourceUrl: "https://plato.stanford.edu/entries/religion-morality/",
          reasoning:
            "One of the most durable arguments in philosophy, but it is a contested philosophical thesis, not an empirical finding. Sophisticated theologians (Aquinas, Adams, Plantinga) have offered responses, and the dilemma's force depends on accepting its framing—so replicability and directness are limited.",
        },
        {
          id: "plos-one-both-paths",
          title: "Both Religious and Secular Ethics Have Roles in Happiness and Health",
          description:
            "A 2024 study in PLOS ONE (Zagonari), \"Both religious and secular ethics to achieve both happiness and health,\" used a dynamic theoretical model and panel data to evaluate how religious and secular ethics, coupled with education, affect happiness and health. Its central finding is qualified: no single ethics—religious or secular—delivers beneficial impacts on both happiness and health at both the individual and social levels, so the author argues the two kinds of ethics are needed as complements (with happiness raising health after a lag of about four years, and education policies generally improving health). The work supports the view that secular ethics is a viable component of flourishing, not that secular ethics alone matches religious ethics on every outcome.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 8,
            replicability: 4,
            directness: 5,
          },
          source:
            "Zagonari, \"Both religious and secular ethics to achieve both happiness and health,\" PLOS ONE 19(4):e0301905 (2024)",
          sourceUrl: "https://doi.org/10.1371/journal.pone.0301905",
          reasoning:
            "Peer-reviewed, but a theoretical/modeling exercise rather than a direct empirical comparison of religious vs. secular individuals; its conclusions are model-dependent and explicitly nuanced (no single ethics benefits both happiness and health at every level, and it argues religious and secular ethics complement each other). Lends only qualified support to functional comparability. A single modeling study should not be treated as definitive.",
        },
        {
          id: "atheist-regimes-atrocities",
          title: "Officially Atheist Communist Regimes Committed Mass Atrocities",
          description:
            "The officially atheist communist regimes of the 20th century—the Soviet Union under Stalin, China under Mao, and Cambodia under the Khmer Rouge—committed some of history's worst mass atrocities, killing tens of millions. The Black Book of Communism (Courtois et al., Harvard University Press, 1999) estimated roughly 20 million deaths under the USSR, 65 million in China, and 1.7 million in Cambodia. Critics argue this demonstrates what happens when societies abandon religious moral constraints and replace them with ideological absolutes.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 3,
          },
          source:
            "Stéphane Courtois et al., The Black Book of Communism: Crimes, Terror, Repression (Harvard University Press, 1999)",
          sourceUrl: "https://www.hup.harvard.edu/books/9780674076082",
          reasoning:
            "The atrocities are historical fact, though specific death-toll figures are contested—even the book's own contributors (Werth, Margolin) disputed the editor's aggregate totals as inflated. Directness is low because these regimes were authoritarian ideologies that replaced religion with state worship; they did not represent secular humanism, liberal atheism, or philosophical naturalism.",
        },
      ],
    },
  ],
};
