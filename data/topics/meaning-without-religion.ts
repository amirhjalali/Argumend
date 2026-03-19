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
        "Philosophical worldviews, humanism, and deeply held personal principles can provide the same core ingredients that make religion effective: a coherent understanding of the world, a sense of purpose and mattering, a feeling of belonging, and opportunities for transcendence. Researchers have found that committed nonreligious people (atheists, secular humanists) report wellbeing levels similar to religious individuals—the key variable is commitment to a worldview, not the worldview's content. The most secular societies on Earth (Denmark, Sweden, Netherlands) consistently rank among the happiest and most socially cohesive.",
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
          title: "Committed Atheists Report Wellbeing Equal to Religious Practitioners",
          description:
            "A 2025 study published in PMC examined nonreligious wellbeing across four dimensions: identity, community involvement, identity duration, and affective orientation. Researchers found that committed nonreligious people—those with strong secular identities and community engagement—report levels of life satisfaction and psychological wellbeing similar to committed religious practitioners. The key factor is commitment to a worldview, not the presence of religious belief.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source: "Varieties of Nonreligious Experience, PMC (2025)",
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
          source: "Pew Research Center, Global Attitudes Survey",
          reasoning:
            "Gold-standard polling data. However, the happiness gap may reflect social community effects (church attendance provides social bonds) rather than metaphysical beliefs per se. In more secular societies (Northern Europe), the gap narrows or disappears.",
        },
        {
          id: "scandinavian-secular-happiness",
          title: "Most Secular Nations Rank Among the Happiest",
          description:
            "Denmark, Sweden, Finland, and the Netherlands—among the most secular nations on Earth—consistently rank in the top 10 of the World Happiness Report. These societies have some of the lowest rates of religious belief but achieve high life satisfaction through strong social safety nets, trust in institutions, and cultural emphasis on community. This suggests societal-level secularism is compatible with (and may even facilitate) human flourishing.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source: "World Happiness Report (2024); Pew Research Center",
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
        "Without God, morality is merely human opinion elevated to principle—there is no objective foundation for saying anything is truly wrong. Evolutionary explanations of morality (kin selection, reciprocal altruism) describe why we feel moral emotions, not why we should act morally. Dostoevsky's question—'If there is no God, everything is permitted'—remains unanswered by secular philosophy. The 20th century's greatest atrocities were committed by explicitly atheistic regimes (Soviet Union, Maoist China, Khmer Rouge).",
      proponent_rebuttal:
        "Secular ethics grounds morality in human flourishing, suffering reduction, and rational principles (Kantian ethics, contractualism, utilitarianism) that do not require divine authority. The Euthyphro dilemma shows that divine command theory is incoherent: either God commands what is good (in which case goodness is independent of God) or good is whatever God commands (making morality arbitrary). Modern secular societies with the lowest religious belief have achieved far lower crime rates, higher social trust, and greater compassion than most historical theocracies.",
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
          title: "Euthyphro Dilemma: Divine Command Theory Is Incoherent",
          description:
            "Plato's Euthyphro dilemma (circa 380 BCE) poses a fundamental challenge to religious moral foundations: Is something good because God commands it, or does God command it because it is good? If the former, morality is arbitrary (God could command cruelty). If the latter, goodness exists independently of God, and religion is unnecessary for ethics. After 2,400 years, no widely accepted resolution has been offered.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "Plato, Euthyphro; Stanford Encyclopedia of Philosophy",
          reasoning:
            "One of the most durable arguments in philosophy. However, sophisticated theologians (Aquinas, Plantinga) have offered responses, and the dilemma's force depends on accepting its framing.",
        },
        {
          id: "plos-one-both-paths",
          title: "Both Religious and Secular Ethics Predict Wellbeing",
          description:
            "A 2024 study published in PLOS ONE using panel data found that both religious and secular ethical frameworks predicted happiness and health outcomes. The study used a dynamic theoretical model showing that the mechanism matters more than the content—active engagement with any coherent moral framework (religious or secular) produced positive outcomes.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source: "PLOS ONE (2024)",
          reasoning:
            "Peer-reviewed with panel data methodology. Supports the view that secular and religious ethics are functionally equivalent for human flourishing. However, a single study should not be treated as definitive.",
        },
        {
          id: "atheist-regimes-atrocities",
          title: "Atheist Regimes Committed History's Worst Atrocities",
          description:
            "The explicitly atheistic regimes of the 20th century—the Soviet Union under Stalin, China under Mao, and Cambodia under the Khmer Rouge—committed some of history's worst mass atrocities, killing tens of millions. Critics argue this demonstrates what happens when societies abandon religious moral constraints and replace them with ideological absolutes.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 4,
          },
          source: "Historical consensus; various historians",
          reasoning:
            "The atrocities are historical fact. However, directness is low because these regimes were authoritarian ideologies that replaced religion with state worship—they did not represent secular humanism, liberal atheism, or philosophical naturalism.",
        },
      ],
    },
  ],
};
