import type { Topic } from "@/lib/schemas/topic";

export const deExtinctionSpeciesData = {
  id: "de-extinction-species",
  title: "Should We Bring Back Extinct Species?",
  meta_claim:
    "De-extinction technology should be pursued as a tool for ecological restoration and species conservation",
  status: "contested" as const,
  category: "science" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "The 2025 Colossal 'dire wolves' are not dire wolves — they are gray wolves with 20 gene edits, and the company's own chief scientist says so. Dire wolves split from the lineage that produced gray wolves roughly 5.7 million years ago and differ by hundreds of thousands of genetic changes; Colossal altered 14 genes. No ancient dire-wolf DNA was inserted. What was actually built is a phenotypic look-alike, not a resurrected species.",
    confidence: 90,
    source:
      "Beth Shapiro (Colossal chief scientist) via Live Science (2025); Perri et al., Nature (2021, dire wolf genome, 5.7 Myr divergence)",
    sourceUrl:
      "https://www.livescience.com/animals/extinct-species/our-animals-are-gray-wolves-colossal-didnt-de-extinct-dire-wolves-chief-scientist-clarifies",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "The genuinely valuable part of de-extinction is the toolkit it forces into existence: Colossal's multiplex gene editing, cloning, and reference-genome work have already spun off into real conservation projects — like cloning Gulf Coast 'ghost wolves' to rescue lost genetic diversity in the critically endangered American red wolf.",
    "But the headline product — the 2025 'dire wolves' — is honestly just gray wolves with 20 edits, not a resurrected species, and a peer-reviewed 2017 analysis found that spending limited conservation money on de-extinction could yield three-to-eight times fewer species saved than spending it on living ones.",
    "So the real debate isn't whether we can engineer convincing proxies (we can) but whether doing so restores ecosystems and helps endangered species enough to justify the cost, the animal-welfare toll of cloning, and the risk that 'extinction is reversible' quietly erodes the urgency to prevent it.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Is It Really De-Extinction, or an Engineered Look-Alike?
    // =========================================================================
    {
      id: "proxy-vs-resurrection",
      title: "Resurrection or Engineered Look-Alike?",
      short_summary:
        "Colossal's 2025 'dire wolves' are gray wolves carrying 20 engineered traits from 14 edited genes — not a revived species, as the company's own chief scientist concedes. Proponents argue a functional phenotypic proxy is the realistic and useful goal; critics argue that calling a 20-edit gray wolf a 'dire wolf' is scientifically false and corrodes public trust in genuine conservation.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "What Colossal produced is not de-extinction in any meaningful biological sense — it is a publicity-driven misnomer. Dire wolves (Aenocyon dirus) diverged from the lineage leading to gray wolves about 5.7 million years ago and were a distinct New World canid genus, separated by hundreds of thousands of genetic differences. Colossal edited 14 genes to express 20 traits — coat color, body size, jaw shape, vocalizations — and inserted no ancient dire-wolf DNA at all. The IUCN Species Survival Commission's Canid Specialist Group formally stated on April 18, 2025 that the three pups 'are not dire wolves, nor are they proxies of the dire wolf' and that the work 'does not contribute to conservation.' Calling a cosmetically modified gray wolf a resurrected species inflates what the technology can do, misleads the public, and risks devaluing the painstaking, unglamorous work of actual conservation.",
      proponent_rebuttal:
        "The 'it's just a hybrid' critique attacks a definition, not the science. Colossal has been explicit — chief scientist Beth Shapiro stated the animals are 'gray wolves with 20 edits' and that the company uses a functional, phenotypic species concept rather than a genomic-identity one. No serious de-extinction program ever claimed it would clone a 100% genetically identical ancient animal; ancient DNA is too degraded for that. The realistic and stated goal is a functional proxy: an organism that performs the lost ecological role of the vanished species. By that standard, simultaneously editing and bringing to term healthy canids with multiple coordinated mammoth- or dire-wolf-like traits is a genuine technical milestone — the same multiplex-editing platform produced the 'woolly mouse' (eight edits across seven genes) in March 2025. The disagreement is largely semantic: critics define 'species' by genome ancestry, proponents by ecological function. Neither is obviously the only correct frame.",
      crux: {
        id: "species-definition-crux",
        title: "The Functional-Proxy vs Genomic-Identity Test",
        description:
          "Whether an engineered organism counts as a restored species depends on which species concept you adopt. Under a phenotypic/functional concept, an animal that looks and behaves like the extinct one and fills its ecological niche qualifies. Under a genomic/phylogenetic concept, an organism that shares only a handful of edited traits with an extinct lineage — while remaining overwhelmingly a member of the living donor species — does not. The crux is not a measurement that can be 'run'; it is whether the two camps can agree on which definition governs the public claim 'we brought back the dire wolf.'",
        methodology:
          "Quantify the actual genomic distance: whole-genome sequence the engineered animals and compare against (1) reference gray wolf genomes and (2) the best available ancient dire-wolf genomes, reporting the fraction of fixed differences captured by the edits. Independently, design a behavioral/ecological assessment of whether the proxy performs the extinct organism's functional role. Then convene taxonomic bodies (IUCN SSC, relevant nomenclature committees) to rule on whether 'functional proxy' status is sufficient for a species-restoration claim. The dispute resolves only when a shared definitional standard is adopted, not when more data is collected.",
        verification_status: "verified" as const,
        cost_to_verify:
          "$50K-200K (Whole-genome sequencing and comparative analysis; the genomic facts are already largely established)",
        falsification: {
          supporter_flip:
            "If proponents accepted a genomic-identity standard — under which an animal must carry the great majority of an extinct lineage's fixed genetic differences to count — they would have to concede that a 14-gene-edited gray wolf is not a restored dire wolf, only a look-alike.",
          skeptic_flip:
            "If critics accepted a strictly functional/phenotypic species concept and the proxy were shown to look, behave, and fill the niche of the extinct animal, they would have to grant that 'restoration' is a defensible label — the same way conservationists already accept ecological proxies (e.g., substitute tortoises on islands).",
          common_ground:
            "Both sides agree the animals are overwhelmingly gray wolf by genome, that no ancient dire-wolf DNA was inserted, and that the editing itself is a real technical achievement.",
          live_disagreement:
            "Whether 'species' should be defined by genomic ancestry or by ecological/phenotypic function — and therefore whether the public claim 'the dire wolf is back' is true or misleading.",
        },
      },
      evidence: [
        {
          id: "chief-scientist-20-edits",
          title:
            "Colossal's Own Chief Scientist: 'Gray Wolves With 20 Edits,' No Dire-Wolf DNA Inserted",
          description:
            "Colossal produced three gene-edited gray wolves — Romulus and Remus (born October 1, 2024) and Khaleesi (born January 30, 2025) — by rewriting 14 genes in gray wolf cells to express 20 dire-wolf-like traits including white coats, larger size, wider heads, and larger jaws. No ancient dire-wolf DNA was spliced into the genome. In May 2025, after the announcement drew criticism, chief scientist Beth Shapiro clarified that the animals are 'gray wolves with 20 edits' and that the company had said so 'from the very beginning,' defending the claim on a phenotypic rather than genomic species concept.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 9,
            directness: 9,
          },
          source: "Live Science (2025); Colossal Biosciences statements",
          sourceUrl:
            "https://www.livescience.com/animals/extinct-species/our-animals-are-gray-wolves-colossal-didnt-de-extinct-dire-wolves-chief-scientist-clarifies",
          reasoning:
            "This is an admission against interest from the company itself — the strongest possible source that the headline 'de-extinction' claim is overstated. Independence is moderate (Colossal has commercial incentives), but the concession directly undercuts the resurrection framing. The factual claim (14 edits, 20 traits, no inserted ancient DNA) is corroborated across multiple independent outlets.",
        },
        {
          id: "iucn-canid-statement",
          title:
            "IUCN Canid Specialist Group: 'Not Dire Wolves, Nor Proxies' and 'Does Not Contribute to Conservation'",
          description:
            "On April 18, 2025, the IUCN Species Survival Commission's Canid Specialist Group — the chief scientific body for canid conservation — issued a formal statement that the three Colossal animals 'are not dire wolves, nor are they proxies of the dire wolf based on IUCN SSC guiding principles.' It noted that the dire wolf 'has no ecological niche' to fill and that editing a gray wolf to resemble it 'may demonstrate technical capabilities, but it does not contribute to conservation,' and could instead threaten extant gray wolves.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source:
            "IUCN SSC Canid Specialist Group, 'Conservation perspectives on gene editing in wild canids' (April 18, 2025)",
          sourceUrl:
            "https://www.canids.org/resources/CSG%20gene%20editing%20in%20wild%20canids.pdf",
          reasoning:
            "The IUCN SSC is the world's authoritative, independent body on species status, with no commercial stake. Its formal repudiation directly addresses both the species-definition claim and the conservation-value claim. Highly direct and reliable; replicability is the standard-applied-to-facts kind (others applying IUCN's own published guiding principles reach the same conclusion).",
        },
        {
          id: "57-million-year-divergence",
          title:
            "Genomics: Dire Wolves Diverged ~5.7 Million Years Ago, a Distinct Lineage",
          description:
            "A 2021 Nature study (Perri et al.) sequencing five sub-fossil dire-wolf genomes found that dire wolves split from the lineage leading to gray wolves and coyotes roughly 5.7 million years ago, evolved in isolation in the New World, and showed no evidence of interbreeding with gray wolves or coyotes. Morphology had long suggested close kinship, but the genetic data revealed dire wolves were a deeply separate ancient lineage, supporting their reassignment to the genus Aenocyon. This makes the genomic gap between dire and gray wolves vast — hundreds of thousands of differences — far beyond what 14 edits address.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source: "Perri et al., Nature (2021)",
          sourceUrl: "https://www.nature.com/articles/s41586-020-03082-x",
          reasoning:
            "Published in Nature with multiple independent labs and ancient-DNA sequencing — the gold standard. It establishes the scale of the genomic gap, which is the factual backbone of the 'not really de-extinction' critique. Directness is high for the species-distance question, slightly lower for the normative definitional dispute it informs.",
        },
        {
          id: "woolly-mouse-platform",
          title:
            "Woolly Mouse: Eight Simultaneous Edits Across Seven Genes Demonstrate a Real Multiplex Platform",
          description:
            "In March 2025 Colossal announced the 'woolly mouse' — mice given eight simultaneous edits across seven genes (including FGF5 for long hair and FAM83G, FZD6, TGM3 for woolly texture, plus MC1R for color) to recapitulate mammoth-like cold-adaptation hair traits, as a proof of concept toward editing Asian elephant cells. The work was released as a preprint (not yet peer-reviewed). Proponents cite it as evidence the multiplex genome-editing platform genuinely works; skeptics note a hairy mouse is far from a mammoth and the paper had not passed peer review.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 6,
            directness: 6,
          },
          source:
            "Colossal Biosciences preprint, bioRxiv (2025); MIT Technology Review",
          sourceUrl:
            "https://www.biorxiv.org/content/10.1101/2025.03.03.641227v1",
          reasoning:
            "Demonstrates that the core editing capability is real and reproducible in a model organism, supporting the 'genuine technical milestone' rebuttal. Weighted down because it is a non-peer-reviewed preprint from the company itself (low independence), and a multi-trait mouse is a long way from the functional-proxy claim it is meant to support.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Conservation Spillover vs Opportunity Cost
    // =========================================================================
    {
      id: "spillover-vs-opportunity-cost",
      title: "Conservation Spillover vs Opportunity Cost",
      short_summary:
        "De-extinction R&D has produced tools — cloning, multiplex editing, biobanking — now being applied to living endangered species like the American red wolf and black-footed ferret. But a peer-reviewed analysis found that spending scarce conservation dollars on de-extinction could save three-to-eight times fewer species than spending the same money on living ones. The fight is whether the spillover benefits outweigh the diverted resources.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Conservation budgets are brutally limited, and every dollar spent resurrecting the dead is a dollar not spent saving the living. Bennett et al. (2017, Nature Ecology & Evolution) modeled the costs of conserving de-extinction candidates in New Zealand and New South Wales and found that even if the resurrection itself were externally funded, the ongoing cost of maintaining the revived species would crowd out conservation of extant species — yielding net biodiversity loss, with three-to-eight times more species savable if the money went to living species instead. De-extinction also drains something scarcer than money: public and political attention. The glamour of a 'dire wolf' draws headlines and venture capital that might otherwise fund the unglamorous habitat protection that actually prevents extinctions. Most de-extinction candidates have no remaining habitat or ecological niche to return to. The spillover argument is a post-hoc justification for a project whose real driver is spectacle, not species recovery.",
      proponent_rebuttal:
        "The opportunity-cost framing assumes a fixed conservation pie that de-extinction merely divides — but de-extinction money is largely new money that would not otherwise flow to conservation at all. Colossal raised $200 million in a January 2025 round at a $10.2 billion valuation, much of it from investors with no prior interest in biodiversity; its associated foundation committed $100 million to genetic-rescue work. Crucially, the tools developed for de-extinction are already being turned on living species: in 2025 the Colossal Foundation cloned Gulf Coast 'ghost wolves' carrying lost ancestral genetic diversity to help rescue the critically endangered American red wolf (down to a few dozen in the wild), and earlier cloning advances aided the black-footed ferret recovery. Multiplex editing could engineer disease resistance into species like amphibians collapsing from chytrid fungus, and biobanking preserves genetic material before it is lost. The Bennett analysis assumed de-extinction competes for the same government budgets; in practice it is mobilizing private capital and technology that benefit extant species.",
      crux: {
        id: "net-biodiversity-crux",
        title: "The Net-Biodiversity Accounting Test",
        description:
          "Whether de-extinction is a net positive or negative for biodiversity hinges on two measurable quantities: (1) how much of de-extinction funding is genuinely additional (new money/attention that would not otherwise reach conservation) versus diverted from existing conservation budgets, and (2) how large the real-world spillover benefit to living endangered species turns out to be. If de-extinction mostly mobilizes new resources and its tools materially improve recovery of extant species, the net effect is positive. If it cannibalizes scarce conservation funding and attention while delivering modest spillover, the net effect is the biodiversity loss Bennett et al. modeled.",
        methodology:
          "Track funding flows: audit de-extinction investment sources and determine what fraction is additional versus reallocated from conservation. Measure spillover empirically by following specific applied projects (red wolf genetic rescue, black-footed ferret cloning, amphibian disease-resistance editing) and quantifying their contribution to population recovery and genetic diversity against matched control programs using conventional methods. Combine into a net-biodiversity ledger: species-equivalents gained from spillover and new funding, minus species-equivalents lost to diverted resources and attention. Update Bennett et al.'s opportunity-cost model with observed (rather than assumed) additionality and spillover parameters.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1.5M (Multi-year funding audit and comparative outcome tracking across applied genetic-rescue programs)",
        falsification: {
          supporter_flip:
            "If a funding audit showed de-extinction money is largely diverted from existing conservation budgets, and spillover projects delivered little measurable benefit to living species beyond conventional methods, proponents would have to concede the enterprise produces net biodiversity loss as Bennett et al. modeled.",
          skeptic_flip:
            "If de-extinction funding proved to be mostly additional private capital, and tools like ghost-wolf cloning measurably restored lost genetic diversity in the red wolf or saved species otherwise doomed, critics would have to accept that the spillover outweighs the opportunity cost.",
          common_ground:
            "Both sides agree conservation resources are scarce, that most extinctions are driven by habitat loss, and that some de-extinction-derived tools (biobanking, cloning) have legitimate conservation uses.",
          live_disagreement:
            "How much de-extinction funding is genuinely new versus diverted, and how large the spillover benefit to living species actually is — the two numbers that decide whether the net biodiversity effect is positive or negative.",
        },
      },
      evidence: [
        {
          id: "bennett-net-loss",
          title:
            "Peer-Reviewed Model: De-Extinction Spending Could Yield 3-8x Fewer Species Saved",
          description:
            "Bennett, Maloney, Steeves, Seddon, and Possingham (2017, Nature Ecology & Evolution) used extant analogues to estimate conservation costs for de-extinction candidate species in New Zealand and New South Wales. Even assuming the resurrection itself was externally sponsored and ongoing costs were shared with living relatives, they found that diverting government conservation funds to support resurrected species would result in fewer extant species conserved — a net biodiversity loss. Reallocating the same money to existing programs for living species would produce biodiversity gains roughly three to eight times greater (about threefold in the New Zealand case and more than eightfold in the New South Wales case).",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source: "Bennett et al., Nature Ecology & Evolution (2017)",
          sourceUrl: "https://www.nature.com/articles/s41559-016-0053",
          reasoning:
            "Published in a top journal by leading conservation scientists with no commercial stake. Provides a quantified opportunity-cost estimate, the strongest evidence for the diversion concern. Directness is high; replicability moderate because the result depends on the modeling assumption that de-extinction draws on the same government conservation budgets — the very assumption proponents contest.",
        },
        {
          id: "ghost-wolf-red-wolf",
          title:
            "Ghost-Wolf Cloning Applied to Rescue the Critically Endangered American Red Wolf",
          description:
            "In early 2025 the Colossal Foundation cloned four Gulf Coast 'ghost wolves' — Neka Kayda, Ash, Blaze, and Cinder — coyote-admixed animals carrying up to ~72% red-wolf ancestry and ancestral red-wolf genetic variation now lost from the official captive population. The American red wolf is one of the world's most endangered canids, with only a few dozen in the wild. The initiative also produced the first complete red-wolf reference genome. Proponents present this as direct evidence that de-extinction-derived cloning and genomics can restore lost genetic diversity to a living endangered species.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 6,
            directness: 8,
          },
          source:
            "Colossal Foundation; MIT Technology Review (2026); Heppenheimer et al. on Gulf Coast canids",
          sourceUrl:
            "https://www.technologyreview.com/2026/04/20/1135222/red-wolves-colossal-biosciences-clones/",
          reasoning:
            "Directly demonstrates the spillover mechanism on a genuinely endangered species, and the underlying science (ghost alleles in Gulf Coast canids) is independently documented. Weighted down because the conservation outcome is early and largely reported by Colossal itself (low independence); independent coverage notes the integration of these clones into the recovery program is not yet established.",
        },
        {
          id: "colossal-funding-additionality",
          title:
            "$200M Raise at $10.2B Valuation Plus a $100M Conservation Foundation",
          description:
            "In January 2025 Colossal Biosciences raised $200 million in Series C funding at a $10.2 billion valuation (total raised ~$435 million), drawing largely on venture and growth capital rather than conservation budgets. Its affiliated Colossal Foundation has committed roughly $100 million toward genetic-rescue and anti-extinction work for living species. Proponents argue this is precisely the 'additional' money the opportunity-cost critique assumes away — capital and public attention mobilized by the spectacle of de-extinction that would not otherwise flow to biodiversity.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "TechCrunch (2025); Colossal Foundation announcements",
          sourceUrl:
            "https://techcrunch.com/2025/01/15/colossal-biosciences-raises-200m-at-10-2b-valuation-to-bring-back-woolly-mammoths/",
          reasoning:
            "The funding figures are well documented and support the additionality argument central to the proponent rebuttal. Directness is moderate: showing that the money is new is necessary but not sufficient to prove net biodiversity benefit — it must also translate into conservation outcomes, which remains unproven.",
        },
        {
          id: "no-habitat-niche",
          title:
            "Most De-Extinction Candidates Have No Surviving Habitat or Niche",
          description:
            "A recurring expert objection is that the ecosystems extinct species occupied are often gone or radically altered, leaving revived organisms with no functional niche to return to. The IUCN SSC noted the dire wolf 'has no ecological niche' to fill, and reintroduction of any large carnivore raises habitat-availability and human-conflict problems. Conservation scientists argue that without restored habitat, a de-extinct animal becomes a captive curiosity rather than a functioning ecological actor — undermining the central justification that proxies restore lost ecosystem function.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source:
            "IUCN SSC Canid Specialist Group (2025); de-extinction ethics literature",
          sourceUrl:
            "https://www.canids.org/resources/CSG%20gene%20editing%20in%20wild%20canids.pdf",
          reasoning:
            "A logically strong and widely held objection grounded in the authoritative IUCN statement and conservation-biology consensus that habitat loss, not absence of the animal, is usually the binding constraint. Directness is solid for the ecosystem-restoration claim; replicability is lower because it is a general principle whose force varies case by case (it bites harder for the dire wolf than for, say, a recently lost keystone herbivore).",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Moral Hazard — Does 'Reversible Extinction' Erode Conservation?
    // =========================================================================
    {
      id: "moral-hazard",
      title: "Moral Hazard: Is Extinction Now 'Reversible'?",
      short_summary:
        "A core fear is that promising de-extinction signals 'extinction is reversible,' sapping the urgency to prevent it. The first controlled experiment (Lean et al., 2025) found no causal moral-hazard effect — promising de-extinction did not make people more willing to accept extinction. But the same study found that people who believe de-extinction can truly restore species are more accepting of losing them, leaving the worry alive in a subtler form.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Framing extinction as reversible is dangerous precisely because the public, policymakers, and resource industries may treat it as a genuine safety net. If a species can supposedly be 'brought back,' the moral and political pressure to protect its habitat now weakens — why fight a costly development project over a frog if biotech can resurrect it later? This moral-hazard logic has been raised by conservation ethicists for over a decade, and it is amplified by media coverage that uncritically calls engineered look-alikes 'resurrected.' The danger is not that de-extinction literally restores anything, but that the perception of reversibility provides cover for accepting losses that are, in reality, permanent — because the proxies are not the species, the habitats are gone, and the great majority of threatened species will never be candidates for any such program.",
      proponent_rebuttal:
        "The moral-hazard worry was, until recently, entirely theoretical — and the first empirical test pushes back on it. Lean, Latham, Sandrussi, and Rogers (2025, Biological Conservation) ran a controlled experiment and found no evidence that promising de-extinction made people more willing to accept a species going extinct; conservation support held up. Proponents argue the publicity around de-extinction can cut the other way, drawing public attention, funding, and a sense of hope to biodiversity loss that doom-laden messaging fails to mobilize — a hope that can be channeled into prevention. They also note that responsible communication (Colossal's own concession that its animals are edited gray wolves) can prevent the false 'reversibility' belief from taking hold. The honest position is that the simple causal version of moral hazard is not supported by the one experiment that tested it.",
      crux: {
        id: "moral-hazard-crux",
        title: "The Reversibility-Belief Test",
        description:
          "Whether de-extinction creates moral hazard depends on whether exposure to it causally reduces people's willingness to prevent extinction. The first experiment finds no such causal effect overall — but also finds a correlation: individuals who believe de-extinction genuinely restores species are more accepting of extinction. The crux is whether the messaging around de-extinction inflates that restorative belief in the population, and whether that belief, once held, actually loosens conservation commitment in real decisions (not just survey responses).",
        methodology:
          "Replicate and extend Lean et al. (2025) with larger, cross-cultural samples and behavioral (not merely attitudinal) outcomes — e.g., real donation or policy-vote proxies. Manipulate the framing of de-extinction (honest 'engineered proxy' vs hype 'species resurrected') to test whether hype specifically inflates the restorative belief shown to correlate with extinction acceptance. Track longitudinally whether high-profile de-extinction announcements shift public and legislative support for habitat protection. Distinguish the average causal effect (apparently null) from the conditional effect among those who form the 'reversibility' belief.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$200K-600K (Replicated, cross-cultural behavioral experiments plus longitudinal opinion tracking)",
        falsification: {
          supporter_flip:
            "If well-powered, behavioral replications showed that exposure to de-extinction messaging causally reduces real conservation commitment — especially via an inflated 'extinction is reversible' belief — proponents would have to concede a genuine moral-hazard cost.",
          skeptic_flip:
            "If repeated controlled experiments confirmed the null causal effect and showed that honest framing keeps restorative beliefs in check, critics would have to drop the strong claim that de-extinction predictably erodes the will to prevent extinction.",
          common_ground:
            "Both sides agree that a belief that 'extinction is reversible' would be dangerous if it took hold, and that the proxies do not in fact make extinction reversible.",
          live_disagreement:
            "Whether de-extinction publicity actually instills that restorative belief widely enough — and whether the belief changes real conservation behavior, not just survey answers — given that the one experiment to date found no average causal effect but a worrying correlation.",
        },
      },
      evidence: [
        {
          id: "lean-no-causal-effect",
          title:
            "First Experiment Finds No Causal Moral-Hazard Effect From De-Extinction",
          description:
            "Lean, Latham, Sandrussi, and Rogers (2025, Biological Conservation) ran the first controlled empirical test of the moral-hazard hypothesis: a 2×2 between-subjects experiment (de-extinction vs conservation framing; dusky gopher frog vs salt marsh harvest mouse). They found people were NOT more likely to accept a species' extinction when its future de-extinction was promised — no evidence for the simple causal moral-hazard claim that has circulated for years.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 9,
          },
          source: "Lean, Latham, Sandrussi & Rogers, Biological Conservation (2025)",
          sourceUrl: "https://philpapers.org/rec/LEADAT",
          reasoning:
            "Directly tests the moral-hazard claim with an experimental design rather than speculation, by independent academic researchers. Highly direct. Replicability is rated moderate because it is a single study with survey-based (attitudinal) outcomes that has not yet been independently replicated or tested behaviorally.",
        },
        {
          id: "lean-belief-correlation",
          title:
            "Same Study: Belief That De-Extinction Restores Species Correlates With Accepting Extinction",
          description:
            "Within the same Lean et al. (2025) study, the authors found a nuance that keeps the worry alive: respondents who believed de-extinction can genuinely restore a species were more accepting of that species going extinct. So while exposure to de-extinction did not causally increase extinction acceptance on average, the specific (and arguably hype-driven) belief that extinction is truly reversible was associated with greater willingness to let species disappear.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source: "Lean, Latham, Sandrussi & Rogers, Biological Conservation (2025)",
          sourceUrl: "https://philpapers.org/rec/LEADAT",
          reasoning:
            "The same authoritative study supplies the strongest version of the skeptic's concern: a measured association between the 'reversibility' belief and acceptance of extinction. Directness is slightly lower than the causal null because it is correlational — it cannot establish that the belief causes the acceptance, only that they co-occur.",
        },
        {
          id: "media-overhype",
          title:
            "Media Routinely Mislabels Engineered Proxies as 'Resurrected,' Inflating Reversibility Belief",
          description:
            "Coverage of the 2025 'dire wolves' frequently used resurrection language ('the dire wolf is back') despite the animals being edited gray wolves, prompting scientists to warn of 'scientific overhype.' Critics argue this is exactly the mechanism that could instill the dangerous 'extinction is reversible' belief in the public — the belief the Lean study links to greater acceptance of extinction. Because the restorative belief, not mere exposure, is what correlates with reduced conservation concern, hype-driven framing is the plausible channel for real-world moral hazard.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Chemical & Engineering News (2025), 'Dire wolf debate raises concerns on scientific overhype'",
          sourceUrl:
            "https://cen.acs.org/biological-chemistry/gene-editing/Dire-wolf-debate-raises-concerns/103/web/2025/04",
          reasoning:
            "Connects the documented overhype to the specific belief the experiment flags as risky, giving the moral-hazard concern a concrete causal pathway. Weighted moderately: it establishes the framing problem exists but does not itself measure a behavioral effect on conservation, so the link to real-world harm remains inferred.",
        },
        {
          id: "attention-hope-mobilization",
          title:
            "De-Extinction Publicity Can Mobilize Funding and Public Attention for Biodiversity",
          description:
            "Proponents argue the spectacle of de-extinction draws money, talent, and public engagement to biodiversity that conventional 'doom' messaging fails to generate — for example, Colossal's high-profile work has attracted hundreds of millions in capital and a $100M conservation foundation, and its biovault and genetic-rescue announcements generated mainstream coverage of endangered-species genetics. If hope and attention can be channeled into prevention, de-extinction's publicity could be a net positive for the conservation cause rather than a moral hazard.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 5,
            directness: 6,
          },
          source: "CNN (2026) on Colossal biovault; Colossal Foundation",
          sourceUrl:
            "https://www.cnn.com/2026/02/04/science/colossal-dire-wolf-biovault-endangered-species-spc",
          reasoning:
            "Captures the steel-manned proponent reply that attention is a resource and de-extinction generates it. Weighted lowest in this pillar: the mobilization-of-hope mechanism is plausible but largely asserted, leans on company-linked sources, and has not been empirically shown to translate into durable conservation gains.",
        },
      ],
    },
  ],
  references: [
    {
      title:
        "Colossal Chief Scientist Clarifies: Animals Are 'Gray Wolves With 20 Edits' — Live Science (2025)",
      url: "https://www.livescience.com/animals/extinct-species/our-animals-are-gray-wolves-colossal-didnt-de-extinct-dire-wolves-chief-scientist-clarifies",
    },
    {
      title:
        "Conservation Perspectives on Gene Editing in Wild Canids — IUCN SSC Canid Specialist Group (2025)",
      url: "https://www.canids.org/resources/CSG%20gene%20editing%20in%20wild%20canids.pdf",
    },
    {
      title:
        "Dire Wolves Were the Last of an Ancient New World Canid Lineage — Perri et al., Nature (2021)",
      url: "https://www.nature.com/articles/s41586-020-03082-x",
    },
    {
      title:
        "Spending Limited Resources on De-Extinction Could Lead to Net Biodiversity Loss — Bennett et al., Nature Ecology & Evolution (2017)",
      url: "https://www.nature.com/articles/s41559-016-0053",
    },
    {
      title:
        "De-Extinction and the Risk of Moral Hazard — Lean, Latham, Sandrussi & Rogers, Biological Conservation (2025)",
      url: "https://philpapers.org/rec/LEADAT",
    },
    {
      title:
        "Colossal Biosciences Raises $200M at $10.2B Valuation — TechCrunch (2025)",
      url: "https://techcrunch.com/2025/01/15/colossal-biosciences-raises-200m-at-10-2b-valuation-to-bring-back-woolly-mammoths/",
    },
    {
      title:
        "Multiplex-Edited Mice Recapitulate Woolly Mammoth Hair Phenotypes — Colossal preprint, bioRxiv (2025)",
      url: "https://www.biorxiv.org/content/10.1101/2025.03.03.641227v1",
    },
  ],
  questions: [
    {
      id: "q1",
      title:
        "Is an engineered look-alike actually 'de-extinction,' or just a hybrid with a marketing name?",
      content:
        "Colossal's 2025 'dire wolves' are gray wolves with 14 edited genes expressing 20 traits — no ancient dire-wolf DNA was inserted, and dire wolves split from the gray-wolf lineage about 5.7 million years ago. The company defends the label using a functional/phenotypic species concept, while the IUCN Canid Specialist Group and many geneticists insist the animals 'are not dire wolves, nor proxies' under a genomic definition. Is 'we brought back the dire wolf' a defensible scientific claim or a misleading one, and which definition of 'species' should govern the answer?",
    },
    {
      id: "q2",
      title:
        "Do de-extinction's spillover tools help living species more than its cost diverts from them?",
      content:
        "De-extinction R&D has produced cloning, multiplex editing, and biobanking now applied to endangered species — including cloning Gulf Coast 'ghost wolves' to restore lost genetic diversity in the critically endangered American red wolf. But Bennett et al. (2017) modeled that spending scarce conservation funds on de-extinction could save three-to-eight times fewer species than spending them on living ones. Is de-extinction mobilizing genuinely new money and tools that benefit biodiversity, or cannibalizing the limited resources and attention that actually prevent extinctions?",
    },
    {
      id: "q3",
      title:
        "Does framing extinction as 'reversible' erode the will to prevent it?",
      content:
        "The moral-hazard worry is that promising de-extinction tells the public and policymakers that extinction is a recoverable loss, weakening the urgency to protect habitat now. The first controlled experiment (Lean et al., 2025) found no average causal effect — promising de-extinction did not make people more willing to accept extinction. Yet the same study found that people who believe de-extinction truly restores species are more accepting of losing them. Does de-extinction publicity instill that dangerous 'reversibility' belief widely enough to matter — and does the belief change real conservation behavior, or only survey answers?",
    },
  ],
} satisfies Omit<Topic, "confidence_score"> & {
  confidence_score?: number;
};
