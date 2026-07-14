import type { Topic } from "@/lib/schemas/topic";

export const molochData = {
  id: "moloch",
  title: "Meditations on Moloch",
  meta_claim:
    "Competition and coordination failure — Scott Alexander's 'Moloch' — systematically push civilization toward equilibria that sacrifice human values for competitive advantage, and durably escaping those multipolar traps requires a coordination mechanism strong enough to override the incentives that create them.",
  status: "contested" as const,
  category: "philosophy" as const,
  references: [
    {
      title: "Meditations on Moloch (Scott Alexander, SSC 2014)",
      url: "https://slatestarcodex.com/2014/07/30/meditations-on-moloch/",
    },
    {
      title: "Elinor Ostrom — Governing the Commons (Nobel 2009)",
      url: "https://en.wikipedia.org/wiki/Elinor_Ostrom",
    },
    {
      title: "Robert Axelrod — The Evolution of Cooperation (1984)",
      url: "https://en.wikipedia.org/wiki/The_Evolution_of_Cooperation",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Is defection really the default?",
      content:
        "Moloch rests on the premise that self-interested agents are driven to a race-to-the-bottom equilibrium. But whether reality behaves like a one-shot Prisoner's Dilemma (defection dominant) or a repeated game (cooperation sustainable) is the pivot on which the whole thesis turns.",
    },
    {
      id: "q2",
      title: "Can we coordinate without a Leviathan?",
      content:
        "The essay's darkest claim is that only a value-aligned singleton — a benevolent superintelligence, 'Elua' — can permanently beat Moloch. Elinor Ostrom's life's work is the strongest empirical answer: communities demonstrably solve commons problems without a central sovereign. How far does that scale?",
    },
    {
      id: "q3",
      title: "Does technology feed Moloch or starve it?",
      content:
        "Alexander argues technology accelerates the race, dragging us toward a Malthusian future. Yet the Industrial Revolution is history's clearest case of technology bursting a Malthusian trap. Which pattern generalizes?",
    },
  ],
  pillars: [
    {
      id: "game-theoretic-engine",
      title: "The Game-Theoretic Engine",
      short_summary:
        "Moloch is not a villain but a mathematical attractor: rational agents optimizing separately converge on equilibria that are worse for everyone than available cooperative outcomes.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "The Prisoner's Dilemma is a toy. Real interactions are not one-shot games between strangers; they are embedded in reputation, repetition, and enforceable contracts. Modeling civilization as a giant single-round defection game smuggles the pessimistic conclusion into the setup.",
      proponent_rebuttal:
        "The dominance of defection in the one-shot game is a theorem, not a mood. Wherever exit is cheap, horizons are short, or the number of players is large enough that individual reputation dissolves — international competition, advertising, factory-farming standards — the payoff structure really does approximate the one-shot case, and the Nash equilibrium really is Pareto-inferior.",
      crux: {
        id: "one-shot-vs-repeated",
        title: "The One-Shot vs. Repeated-Game Test",
        description:
          "Determine, for a given domain, whether the effective interaction is better modeled as a one-shot game (where defection is the dominant strategy) or an iterated game with a long shadow of the future (where the Folk Theorem makes cooperation a sustainable equilibrium). The answer decides whether Moloch is inescapable there.",
        methodology:
          "Estimate the domain's discount factor / continuation probability and the number of effectively anonymous players. Compare observed strategy profiles against the Folk Theorem threshold at which cooperative equilibria become self-enforcing. Domains below the threshold are genuine Moloch traps; those above it are not.",
        equation:
          "\\text{Cooperation sustainable} \\iff \\delta \\geq \\frac{T - R}{T - P}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (game-theoretic modeling of observed payoff structures)",
      },
      evidence: [
        {
          id: "nash-prisoners-dilemma",
          title: "Defection is the dominant strategy in the one-shot game",
          description:
            "In the one-shot Prisoner's Dilemma the unique Nash equilibrium is mutual defection, strictly worse for both players than mutual cooperation — the formal skeleton of every Moloch story.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "Nash (1950), Equilibrium Points in n-Person Games; Tucker's Prisoner's Dilemma",
          sourceUrl: "https://en.wikipedia.org/wiki/Nash_equilibrium",
          reasoning:
            "Rock-solid as mathematics; the open question is how often the real world matches the one-shot payoff matrix rather than the equilibrium itself.",
        },
        {
          id: "folk-theorem",
          title: "The Folk Theorem rescues cooperation in repeated games",
          description:
            "In infinitely (or indefinitely) repeated games with a high enough discount factor, cooperation is itself a Nash equilibrium sustained by strategies like tit-for-tat — so defection is not inevitable when the shadow of the future is long.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "Folk Theorem of repeated games (Friedman 1971 and later)",
          reasoning:
            "A genuine formal counterweight; its bite depends entirely on whether real interactions have the long horizons it requires.",
        },
      ],
    },
    {
      id: "multipolar-traps-default",
      title: "Multipolar Traps Are the Default",
      short_summary:
        "Left to competition, shared resources and standards get raced to the bottom — the empirical pattern Alexander catalogs as Moloch's signature.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The 'tragedy of the commons' is a story about unmanaged open-access resources, not about commons as such. In practice, most enduring common-pool resources are governed by rules people design and enforce themselves. Cherry-picking collapses ignores the far larger set of quietly solved coordination problems.",
      proponent_rebuttal:
        "The collapses are not cherry-picked — they are the modal outcome wherever governance is absent. The Northern Atlantic cod fishery was fished to commercial extinction and closed in 1992; the ad-driven attention economy competes relentlessly toward whatever captures eyeballs regardless of whether it serves anyone. Ostrom's exceptions are real but describe bounded, high-trust communities, not planetary-scale competition.",
      crux: {
        id: "ostrom-scaling-test",
        title: "The Ostrom Scaling Test",
        description:
          "Ostrom identified design principles under which communities reliably self-govern commons without a central Leviathan. The crux is whether those principles hold as the number of players, the anonymity, and the physical scale of the resource increase — i.e. whether local success stories generalize to global multipolar traps.",
        methodology:
          "Take Ostrom's eight design principles and test their presence/absence against outcomes across resource systems spanning orders of magnitude in scale (village irrigation to global fisheries to the atmosphere). Measure whether principle-satisfaction predicts escape from the trap independent of scale.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (meta-analysis of existing common-pool-resource case studies)",
      },
      evidence: [
        {
          id: "hardin-commons",
          title: "Hardin: the tragedy of the commons",
          description:
            "Garrett Hardin's 'The Tragedy of the Commons' (Science, 1968) argues that individually rational use of a shared, unowned resource drives it to ruin — the canonical multipolar trap.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "Hardin, Science, Vol. 162 (1968)",
          sourceUrl: "https://en.wikipedia.org/wiki/Tragedy_of_the_commons",
          reasoning:
            "Enormously influential and directly on point — but later scholarship (Ostrom) showed Hardin conflated open-access with governed commons, so its universality is contested.",
        },
        {
          id: "cod-collapse",
          title: "The Grand Banks cod collapse",
          description:
            "Competitive industrial fishing drove the Northern cod stock off Newfoundland to commercial extinction, forcing Canada to declare a moratorium in 1992 that put tens of thousands out of work; the stock has never fully recovered.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Collapse of the Atlantic northwest cod fishery (1992 moratorium)",
          reasoning:
            "A well-documented real-world race to the bottom in an ungoverned commons; a clean instance of the pattern.",
        },
        {
          id: "attention-economy",
          title: "The attention economy's race to the bottom",
          description:
            "Ad-funded media and platforms compete to maximize engagement, an incentive structure that rewards whatever captures attention rather than whatever informs or serves users — a modern multipolar trap no single actor can unilaterally exit.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 5,
            replicability: 4,
            directness: 6,
          },
          source: "Attention-economy critiques (e.g. Wu, The Attention Merchants, 2016)",
          reasoning:
            "Illustrative and widely observed, but hard to quantify cleanly; scored as a suggestive rather than decisive case.",
        },
        {
          id: "ostrom-governing-commons",
          title: "Ostrom: communities solve commons without a Leviathan",
          description:
            "Elinor Ostrom's 'Governing the Commons' (1990), which earned the 2009 Nobel in Economics, documents numerous long-enduring common-pool-resource institutions — irrigation systems, fisheries, forests — that avoid the tragedy through locally designed rules, without either privatization or a central sovereign.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Ostrom, Governing the Commons, Cambridge University Press (1990); Nobel 2009",
          sourceUrl: "https://en.wikipedia.org/wiki/Elinor_Ostrom",
          reasoning:
            "The strongest single counter to Moloch's inevitability — rigorous, empirical, Nobel-recognized. Its limit is scale and the trust conditions Ostrom's principles require.",
        },
      ],
    },
    {
      id: "technology-accelerates",
      title: "Technology Accelerates Moloch",
      short_summary:
        "Alexander argues that technology, rather than freeing us from competition, sharpens it — feeding Malthusian dynamics and safety-sacrificing races like the AI arms race.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "This inverts the historical record. Technology is the one force that has repeatedly bought humanity out of scarcity: the demographic transition, rising real incomes, and falling famine rates all followed technological surplus. Malthus predicted the opposite of what happened.",
      proponent_rebuttal:
        "Escape from the Malthusian trap has so far been a temporary reprieve powered by faster-than-population growth, not a repeal of the underlying logic. Where growth saturates or reproduction is cheap — Robin Hanson's emulated-mind scenarios, or an unregulated race to deploy powerful AI — Malthusian competition reasserts itself, and competitors who spend resources on safety or values are outcompeted by those who don't.",
      crux: {
        id: "malthusian-reassertion-test",
        title: "The Malthusian Reassertion Test",
        description:
          "Determine whether technology permanently raises the ceiling faster than competition consumes the surplus, or merely postpones a Malthusian equilibrium that returns once growth slows or copying/reproduction becomes cheap. The AI-deployment race is the live test case: does competitive pressure force safety spending down toward the minimum?",
        methodology:
          "Track surplus-per-capita against population/agent-count growth across regimes; for AI specifically, measure whether competing labs' safety expenditure diverges upward or converges toward a competitive floor as capability stakes rise.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 today (retrospective growth data); the AI case is unfolding, not yet settled",
      },
      evidence: [
        {
          id: "malthus-principle",
          title: "Malthus: population presses on subsistence",
          description:
            "Malthus's 'An Essay on the Principle of Population' (1798) argued that population grows to consume any surplus, driving living standards back to subsistence — the trap Moloch generalizes beyond food to any competitive resource.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source: "Malthus, An Essay on the Principle of Population (1798)",
          sourceUrl: "https://en.wikipedia.org/wiki/An_Essay_on_the_Principle_of_Population",
          reasoning:
            "Foundational to the mechanism, but its own headline prediction was overturned for two centuries — cited as the logic, not as a confirmed forecast.",
        },
        {
          id: "hanson-age-of-em",
          title: "Hanson: cheap copying restores Malthusian competition",
          description:
            "Robin Hanson's 'The Age of Em' (2016) models a future of copyable emulated minds in which the ability to reproduce near-instantly drives wages and slack back toward subsistence — a concrete scenario for technology reviving the Malthusian trap.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 5,
            replicability: 3,
            directness: 6,
          },
          source: "Hanson, The Age of Em, Oxford University Press (2016)",
          reasoning:
            "A rigorously argued but avowedly speculative scenario; low replicability by nature, scored accordingly.",
        },
        {
          id: "ai-safety-race",
          title: "The AI race pressures safety downward",
          description:
            "Competing developers racing to deploy more capable AI face an incentive to spend the minimum on safety and alignment, since caution is a competitive handicap — a textbook multipolar trap with civilization-scale stakes.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 5,
            replicability: 3,
            directness: 6,
          },
          source: "AI race-dynamics arguments (Bostrom, Superintelligence, 2014)",
          reasoning:
            "Theoretically compelling and central to the essay's stakes, but the empirical direction of safety spending is not yet resolved.",
        },
        {
          id: "industrial-revolution-escape",
          title: "The Industrial Revolution broke the Malthusian trap",
          description:
            "For roughly two centuries since industrialization, real incomes and populations rose together across the developed world and the demographic transition lowered fertility — the clearest historical case of technology defeating, not feeding, the Malthusian dynamic.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Sustained post-1800 growth and the demographic transition",
          reasoning:
            "Strong, broadly accepted economic history that directly contradicts the 'technology always feeds Moloch' generalization.",
        },
      ],
    },
    {
      id: "value-aligned-singleton",
      title: "Only a Value-Aligned Singleton Escapes (Elua)",
      short_summary:
        "The essay's central and most contestable claim: because Moloch is competition itself, only an agent standing above the competition — a benevolent superintelligence, 'Elua' — can permanently override the incentives.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "This is a counsel of despair dressed as analysis. It assumes away every partial coordination mechanism humanity actually uses — states, treaties, norms, markets with property rights — and then declares that nothing short of a world-controlling god-machine can help. A cure that requires building an omnipotent aligned superintelligence is no cure at all.",
      proponent_rebuttal:
        "Partial mechanisms are exactly that — partial. Each is itself vulnerable to Moloch: states race against states, treaties are undercut by defectors, norms erode under competition. The argument is structural: any coordinator embedded in the competition can be outcompeted, so only a coordinator that is not subject to the competition — a singleton — can guarantee the incentives stay overridden. That this is a frightening conclusion doesn't make it wrong.",
      crux: {
        id: "singleton-necessity",
        title: "The Singleton-Necessity Test",
        description:
          "Decide whether durable escape from Moloch strictly requires a singleton (a single decision-making agency at the top level, per Bostrom), or whether polycentric, decentralized governance can hold the line indefinitely. This is the load-bearing disagreement between Alexander and Ostrom — and it may be unfalsifiable in advance.",
        methodology:
          "There is no way to run the experiment safely: building a value-aligned singleton to test the claim is precisely the risk the AI-safety field warns against, and a misaligned one is catastrophic. The claim can only be probed indirectly, via whether any large-scale, indefinitely stable coordination has ever survived without a top-level sovereign.",
        verification_status: "impossible" as const,
        cost_to_verify: "Not verifiable without incurring the very risk in question",
      },
      evidence: [
        {
          id: "bostrom-singleton",
          title: "Bostrom: a singleton could permanently solve coordination",
          description:
            "Nick Bostrom's concept of a 'singleton' — a world order with a single decision-making agency at the highest level — is the formal version of Elua: an entity that, by sitting above all competition, could in principle end multipolar traps by fiat.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 3,
            directness: 7,
          },
          source: "Bostrom, 'What is a Singleton?' (2006); Superintelligence (2014)",
          reasoning:
            "Directly articulates the mechanism the pillar rests on, but it is philosophical analysis of a hypothetical, not evidence that such an entity is achievable or safe.",
        },
        {
          id: "singleton-totalitarian-risk",
          title: "A singleton is itself an existential hazard",
          description:
            "A single top-level agency powerful enough to override all competition is also powerful enough to lock in catastrophic or totalitarian values permanently — a risk Bostrom himself flags. 'Solve Moloch with a singleton' may trade a slow decay for a fast, irreversible one.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 4,
            directness: 6,
          },
          source: "Value lock-in / singleton-risk arguments (Bostrom)",
          reasoning:
            "A serious internal objection: the proposed cure carries a failure mode at least as bad as the disease, undercutting 'only a singleton' as a desirable solution.",
        },
        {
          id: "polycentric-governance",
          title: "Polycentric governance holds without a sovereign",
          description:
            "Ostrom's later work on polycentric governance shows overlapping, semi-autonomous authorities managing shared problems (from watersheds to climate) without a single top-level ruler — evidence that durable coordination need not be centralized in a singleton.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Ostrom, polycentric-governance work (e.g. 2010 Nobel lecture)",
          reasoning:
            "Empirically grounded challenge to the necessity claim; its unresolved question is whether polycentric order survives indefinitely against strong competitive pressure.",
        },
      ],
    },
    {
      id: "cooperation-has-expanded",
      title: "Moloch Is Overstated — Cooperation Has Expanded",
      short_summary:
        "The skeptic's pillar: across history the sphere of successful cooperation has widened, from reciprocity in repeated games to global treaties — suggesting Moloch is a tendency humans routinely defeat, not an iron law.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "If Moloch were as dominant as claimed, cooperation should be rare and shrinking. Instead it is common and growing: reciprocal strategies evolve and win, nations abolished ozone-destroying chemicals, arms-control treaties cut nuclear arsenals, and long-run interpersonal violence has fallen. The essay mistakes vivid failures for the general case.",
      proponent_rebuttal:
        "Each success is real but bounded, and each was hard-won against Moloch rather than proof of his absence. The Montreal Protocol worked partly because substitutes were cheap and the science unusually clear; climate coordination, where those conditions fail, has largely stalled. Cooperation expands where the game is favorable and collapses where it isn't — which is exactly the theory, not a refutation of it.",
      crux: {
        id: "coordination-track-record",
        title: "The Coordination Track-Record Test",
        description:
          "Compile the base rate: across major collective-action problems humanity has faced, what fraction were durably solved by cooperation versus lost to a race to the bottom, and what distinguishes the two groups? A high, condition-independent success rate would refute Moloch; a success rate that tracks payoff structure would confirm it.",
        methodology:
          "Assemble a corpus of international and large-scale coordination attempts (ozone, climate, fisheries, arms control, trade). Code each for outcome and for the underlying incentive conditions (cost of substitutes, verifiability, number of players). Test whether success correlates with favorable game structure rather than with will alone.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (the historical treaty and commons record is documented)",
      },
      evidence: [
        {
          id: "axelrod-cooperation",
          title: "Axelrod: cooperation evolves through reciprocity",
          description:
            "Robert Axelrod's 'The Evolution of Cooperation' (1984) showed, via repeated Prisoner's Dilemma tournaments, that simple reciprocal strategies like tit-for-tat outperform defection and let cooperation emerge and stabilize among self-interested agents without any central authority.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Axelrod, The Evolution of Cooperation, Basic Books (1984)",
          sourceUrl: "https://en.wikipedia.org/wiki/The_Evolution_of_Cooperation",
          reasoning:
            "Rigorous, reproduced, and directly on the mechanism by which cooperation defeats defection — the single strongest 'Moloch is beatable' result.",
        },
        {
          id: "montreal-protocol",
          title: "The Montreal Protocol healed the ozone layer",
          description:
            "The 1987 Montreal Protocol achieved near-universal ratification and phased out ozone-depleting substances; the ozone layer is now measurably recovering — a global commons problem solved by treaty, with no world government.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Montreal Protocol (1987); WMO/UNEP ozone assessments",
          sourceUrl: "https://en.wikipedia.org/wiki/Montreal_Protocol",
          reasoning:
            "A concrete, verified escape from a planetary multipolar trap — though critics note unusually favorable conditions (cheap substitutes, clear science).",
        },
        {
          id: "nuclear-arms-control",
          title: "Arms-control treaties reversed a race",
          description:
            "Cold War nuclear arsenals grew through a classic arms race, but treaties (NPT, and the successive START agreements) later cut deployed warheads by large margins — evidence that even the sharpest competitive races can be partially wound back by negotiated coordination.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "Nuclear Non-Proliferation Treaty (1968); START treaties",
          reasoning:
            "A real reversal of a race to the bottom, tempered by the fact that the underlying rivalry and breakout risk never fully disappeared.",
        },
        {
          id: "pinker-violence-decline",
          title: "Long-run violence has declined",
          description:
            "Steven Pinker's 'The Better Angels of Our Nature' (2011) marshals evidence that interpersonal and inter-state violence have fallen dramatically over centuries — an expansion of cooperative order at odds with a world wholly governed by Moloch.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 5,
          },
          source: "Pinker, The Better Angels of Our Nature, Viking (2011)",
          reasoning:
            "Suggestive and large in scope, but the thesis is contested on measurement and attribution, so it is weighted modestly.",
        },
        {
          id: "climate-coordination-failure",
          title: "Climate coordination has largely stalled",
          description:
            "Unlike ozone, greenhouse-gas coordination — where abatement is costly and free-riding is easy — has repeatedly fallen short of its targets, showing that the sphere of successful cooperation stops exactly where the incentive structure turns hostile.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source: "Record of international climate agreements (Kyoto, Paris) vs. emissions",
          reasoning:
            "A pointed rebuttal to the optimistic pillar: it shows cooperation tracks payoff structure, which is the Moloch thesis rather than its refutation.",
        },
      ],
    },
  ],
};
