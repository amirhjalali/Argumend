import { Triangle, Brain, Layers, type LucideIcon } from "lucide-react";

export interface GuideSection {
  readonly title: string;
  readonly content: string;
  readonly subsections?: readonly {
    readonly title: string;
    readonly content: string;
  }[];
}

export interface Guide {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly icon: LucideIcon;
  readonly color: string;
  readonly readTime: string;
  readonly sections: readonly GuideSection[];
  readonly keyTakeaways: readonly string[];
  readonly furtherReading: readonly {
    readonly title: string;
    readonly author: string;
    readonly url?: string;
  }[];
}

export const guides: readonly Guide[] = [
  {
    id: "triangulation",
    title: "Triangulation",
    subtitle: "Finding Truth Through Multiple Sources",
    description: "How to determine facts by cross-referencing independent sources and viewpoints. The fundamental technique for separating signal from noise.",
    icon: Triangle,
    color: "#4f7b77",
    readTime: "12 min read",
    sections: [
      {
        title: "What Is Triangulation?",
        content: `Triangulation is the practice of using multiple independent sources or methods to verify information. The term comes from navigation and surveying: sailors and cartographers historically determined their position by taking bearings from three different landmarks. If all three lines of position intersected at the same point, they could be confident in their location.

In the realm of knowledge and argumentation, triangulation serves the same purpose. When multiple independent sources—using different methods, from different perspectives, with different potential biases—all converge on the same conclusion, our confidence in that conclusion increases dramatically.

The key insight is that independent sources have uncorrelated errors. If Source A makes a mistake, Source B (being truly independent) is unlikely to make the same mistake. When they agree despite having no reason to coordinate their errors, the agreement is meaningful.`,
      },
      {
        title: "The Four Types of Triangulation",
        content: `Sociologist Norman Denzin identified four fundamental types of triangulation in research. Understanding these helps you apply the principle across different contexts.`,
        subsections: [
          {
            title: "Data Triangulation",
            content: `Using multiple data sources to study the same phenomenon. This might mean gathering evidence from different time periods, locations, or populations. For example, if you're investigating whether a policy works, you might look at data from different states that implemented it, different years, and different demographic groups. If the pattern holds across all these variations, your confidence increases.`,
          },
          {
            title: "Investigator Triangulation",
            content: `Having multiple researchers or analysts examine the same evidence independently. This guards against individual biases and blind spots. It's why peer review exists in science, why news organizations seek multiple reporter confirmation, and why intelligence agencies value analyst disagreement—it reveals assumptions that might otherwise go unexamined.`,
          },
          {
            title: "Theory Triangulation",
            content: `Approaching the same question from multiple theoretical frameworks. If an economic model, a sociological theory, and a psychological framework all predict the same outcome, and that outcome is observed, the finding is more robust than if only one framework supported it. This also helps identify which aspects of a phenomenon are real versus artifacts of a particular theoretical lens.`,
          },
          {
            title: "Methodological Triangulation",
            content: `Using different research methods to study the same question. Surveys, experiments, observational studies, and qualitative interviews each have different strengths and weaknesses. When they converge on the same answer, the answer is unlikely to be an artifact of any single method's limitations. This is why good research programs combine quantitative and qualitative approaches.`,
          },
        ],
      },
      {
        title: "The Independence Requirement",
        content: `The power of triangulation depends entirely on one thing: independence. If your sources share a common origin, a common bias, or have influenced each other, they're not truly independent—and their agreement tells you less than you might think.

Consider a dangerous pattern: Source A reports something. Source B cites Source A. Source C cites both A and B. You now have "three sources" confirming the same thing, but actually only one data point. This is called "circular reporting" or "source laundering," and it's disturbingly common.

Before counting sources as independent, ask:
- Do they share a common upstream source?
- Could they have coordinated or influenced each other?
- Do they have the same institutional interests or funding?
- Are they part of the same social or professional network?

True independence means each source would arrive at its conclusion regardless of what the others said. That's what makes convergence meaningful.`,
      },
      {
        title: "How Professionals Use Triangulation",
        content: `Different professions have developed specific triangulation practices, each adapted to their domain.`,
        subsections: [
          {
            title: "Journalism",
            content: `Reputable news organizations follow the "three-source rule": a claim should be confirmed by at least three independent sources before publication. Watergate reporters Woodward and Bernstein famously required two independent sources for every claim. This practice prevents single-point-of-failure reporting and protects against manipulation by sources with agendas.`,
          },
          {
            title: "Intelligence Analysis",
            content: `Intelligence agencies use "multi-INT" analysis—combining human intelligence (HUMINT), signals intelligence (SIGINT), imagery intelligence (IMINT), and other collection methods. Each has different failure modes; when they converge, confidence increases. The catastrophic failure on Iraqi WMDs partly stemmed from over-reliance on a single human source ("Curveball") without adequate corroboration.`,
          },
          {
            title: "Scientific Research",
            content: `Scientists triangulate through replication, meta-analysis, and converging evidence from different experimental paradigms. The discovery of the Higgs boson required independent detection by two separate detector teams (ATLAS and CMS) at CERN—neither could see the other's results until both had independently found the same signal.`,
          },
          {
            title: "Historical Research",
            content: `Historians cross-reference documents, archaeological evidence, and contemporary accounts. They weight sources by proximity to events, potential biases, and corroboration. A single account might be propaganda; three independent contemporary accounts from different perspectives suggest something actually happened.`,
          },
        ],
      },
      {
        title: "Common Failures and How to Avoid Them",
        content: `Triangulation can fail in predictable ways. Knowing these failure modes helps you avoid them.`,
        subsections: [
          {
            title: "Echo Chambers",
            content: `In echo chambers, many sources repeat the same claim, creating an illusion of convergence. But trace the claims back: do they all stem from a single origin? Social media amplifies this—a rumor can spawn thousands of "sources" that all trace to one unverified tweet. Always trace upstream.`,
          },
          {
            title: "Correlated Biases",
            content: `Sources can share biases without explicit coordination. Media outlets with similar political leanings might independently arrive at the same slant—not through conspiracy, but through shared assumptions. Professional communities can develop blind spots that affect all members. Seek sources outside the obvious consensus community.`,
          },
          {
            title: 'The "Too Good to Check" Trap',
            content: `When information confirms what you want to believe, there's temptation to stop verifying. This is when triangulation matters most. The more you want something to be true, the more rigorously you should apply independent verification.`,
          },
          {
            title: "Confusing Quantity for Quality",
            content: `Ten weak sources don't equal one strong source. A hundred blog posts citing the same dubious study don't strengthen the study. Focus on the quality and independence of sources, not just the count.`,
          },
        ],
      },
      {
        title: "Practical Steps for Triangulation",
        content: `When evaluating any significant claim, follow this process:

1. **Identify the original source.** Trace the claim to its origin. Who first made this claim, and on what basis?

2. **Seek genuinely independent verification.** Look for sources that would have no reason to know about or coordinate with the original source. Different countries, institutions, or methodologies are good signs.

3. **Check for correlated errors.** Ask what could cause multiple sources to be wrong in the same direction. Shared assumptions? Common funding? Social pressures?

4. **Weight by reliability.** Not all sources are equal. Primary sources beat secondary sources. Documented evidence beats testimony. Reluctant admissions (statements against interest) are more credible than self-serving ones.

5. **Note divergences.** When sources disagree, don't ignore the outliers. Investigate why. Sometimes the minority view has identified something the majority missed.

6. **Update continuously.** As new information emerges, re-evaluate. Triangulation is a process, not a one-time check.`,
      },
    ],
    keyTakeaways: [
      "Triangulation uses multiple independent sources to verify information—the key word is 'independent'",
      "Four types: data (multiple datasets), investigator (multiple analysts), theory (multiple frameworks), methodological (multiple methods)",
      "Echo chambers create false convergence—always trace claims to their original sources",
      "Correlated biases can make 'independent' sources agree for the wrong reasons",
      "Quality of sources matters more than quantity—ten weak sources don't equal one strong source",
      "When sources diverge, investigate the disagreement rather than defaulting to the majority",
    ],
    furtherReading: [
      { title: "The Logic of Scientific Discovery", author: "Karl Popper" },
      { title: "The Scout Mindset", author: "Julia Galef", url: "https://www.juliagalef.com/book/" },
      { title: "Superforecasting", author: "Philip Tetlock & Dan Gardner" },
      { title: "The Intelligence Trap", author: "David Robson" },
    ],
  },
  {
    id: "understanding-bias",
    title: "Understanding Bias",
    subtitle: "Recognizing and Accounting for Distorted Information",
    description: "How to identify cognitive biases and source biases, and how to appropriately weight information that comes from biased sources.",
    icon: Brain,
    color: "#a23b3b",
    readTime: "15 min read",
    sections: [
      {
        title: "The Inescapable Reality of Bias",
        content: `Everyone is biased. This isn't a moral failing—it's a feature of how human cognition works. Our brains evolved to make quick decisions in uncertain environments, using mental shortcuts (heuristics) that work well on average but systematically err in predictable ways.

The goal isn't to eliminate bias—that's impossible. The goal is to understand how bias operates, recognize it in ourselves and our sources, and account for it when evaluating information. A biased source can still provide valuable information if you know how to adjust for the bias.

There are two categories to understand: cognitive biases (systematic errors in how we think) and source biases (systematic distortions in how information is presented to us).`,
      },
      {
        title: "Key Cognitive Biases",
        content: `These are the mental shortcuts that lead us astray. Understanding them helps you catch yourself—and recognize when others are affected.`,
        subsections: [
          {
            title: "Confirmation Bias",
            content: `The tendency to search for, interpret, and recall information in ways that confirm what you already believe. This is arguably the master bias—it affects all the others. You'll notice supporting evidence more readily than contradicting evidence. You'll interpret ambiguous information as supporting your view. You'll remember the hits and forget the misses.

**Counter-strategy:** Actively seek out the best arguments against your position. Ask: "What evidence would change my mind?" Then look for it.`,
          },
          {
            title: "Motivated Reasoning",
            content: `When we have a desired conclusion, we become lawyers rather than scientists—constructing arguments for our preferred outcome rather than impartially evaluating evidence. We hold evidence for conclusions we dislike to a higher standard than evidence for conclusions we like.

**Counter-strategy:** Notice when you're evaluating evidence by first asking "Can I believe this?" (for disliked conclusions) versus "Must I believe this?" (for liked conclusions). Apply the same standard to both.`,
          },
          {
            title: "The Availability Heuristic",
            content: `We judge probability by how easily examples come to mind. Vivid, recent, or emotionally charged events are more "available," so we overestimate their frequency. Plane crashes are memorable; car accidents aren't—so people fear flying more than driving, despite driving being far more dangerous per mile.

**Counter-strategy:** Ask "Is this actually common, or just easy to remember?" Look up base rates rather than relying on mental sampling.`,
          },
          {
            title: "Anchoring",
            content: `The first number or piece of information we encounter disproportionately influences subsequent judgments, even when it's arbitrary. In negotiations, the first offer anchors the entire discussion. In estimates, the first number mentioned skews all subsequent numbers.

**Counter-strategy:** Generate your own estimate before looking at others'. Consider multiple reference points deliberately.`,
          },
          {
            title: "In-Group Bias",
            content: `We automatically favor members of groups we belong to and view outsiders with suspicion. This operates across political parties, nationalities, professional identities, and even arbitrary lab-assigned groups. We attribute better motives to our group's actions and worse motives to the other group's identical actions.

**Counter-strategy:** Apply the "ideological Turing test"—can you explain the other side's position well enough that they'd recognize it as accurate? If not, you don't understand it well enough to critique it.`,
          },
          {
            title: "The Dunning-Kruger Effect",
            content: `People with low competence in a domain tend to overestimate their ability, while those with more competence tend to be better calibrated. The unskilled lack the meta-cognitive ability to recognize their own incompetence—they don't know what they don't know. This asymmetry means that in many contexts, the most confident voices may be the least informed.

**Counter-strategy:** Calibrate your confidence by keeping track of your predictions and their outcomes. Notice the domains where you've been consistently wrong. Treat high confidence in yourself as a signal to seek outside evaluation.`,
          },
        ],
      },
      {
        title: "Source and Structural Biases",
        content: `Beyond individual cognitive biases, information can be systematically distorted before it reaches you. Understanding these structural biases helps you interpret sources appropriately.`,
        subsections: [
          {
            title: "Funding Bias",
            content: `Research funded by parties with financial interests in the outcome is more likely to produce favorable results. A study of sugar industry-funded research found that 100% of studies finding no link between sugary beverages and poor health were industry-funded, while only 2.9% of studies finding negative health links were industry-funded.

This doesn't mean funded research is worthless—but it should be weighted accordingly. Independent replication becomes especially important.`,
          },
          {
            title: "Publication Bias",
            content: `Studies with positive or significant results are more likely to be published than those with null results. This "file drawer effect" means the published literature systematically overstates effect sizes. Meta-analyses in medical research can be inflated by 30-50% due to missing negative studies.

When evaluating a field, remember that what you see is a biased sample of what was studied.`,
          },
          {
            title: "Survivorship Bias",
            content: `We see the survivors, not the failures. Success stories get told; failures are forgotten. This distorts our sense of what leads to success. We study successful companies and infer what made them successful—but many failed companies did the same things. We praise successful people's habits without knowing how many people with identical habits failed.

The famous WWII example: analysts recommended armoring the parts of returning bombers that showed the most bullet holes. Statistician Abraham Wald pointed out the error—the holes showed where planes could take damage and survive. They should armor the places with no holes, because planes hit there didn't come back.`,
          },
          {
            title: "Selection Bias in Media",
            content: `News media selects stories based on newsworthiness, not representativeness. "Man bites dog" is news; "dog bites man" isn't. This means media systematically overrepresents rare, dramatic events and underrepresents common, mundane ones. Crime coverage, for instance, bears little relation to actual crime statistics.

Additionally, stories that generate engagement (often outrage) get amplified over stories that inform but don't provoke.`,
          },
        ],
      },
      {
        title: "Identifying Bias: Questions to Ask",
        content: `When evaluating any source, these questions help reveal potential biases:

**About the source:**
- Who created this? What is their background and expertise?
- Who funded this? What interests might they have?
- What is the source's track record? Have they been reliable before?
- What might they gain from this claim being believed?

**About the content:**
- Is this fact or opinion? Is the distinction clear?
- What's missing? What perspectives or evidence are not presented?
- Does this acknowledge limitations and counterarguments?
- How does it characterize opposing views—fairly or as strawmen?

**About the context:**
- When was this created? Is it still current?
- Who is the intended audience? How might that shape the message?
- What events or incentives surrounded its creation?

**The "Cui Bono" principle:** Always ask "Who benefits?" from this information being believed. This doesn't prove bias exists, but it identifies where to look for it.`,
      },
      {
        title: "The 'Discount, Don't Dismiss' Principle",
        content: `A critical insight: bias doesn't make information worthless. Even heavily biased sources can contain valuable information if you know how to extract it.

**Complete dismissal loses information.** If a pharmaceutical company's study shows their drug works, dismissing it entirely because of funding bias means ignoring real data. The better approach is to recognize the bias, discount accordingly, and look for independent corroboration.

**The direction of bias helps calibrate.** If you know a source is biased in a particular direction, claims that go against their bias are more credible than claims aligned with it. A tobacco company acknowledging that smoking causes cancer is more credible than a health organization saying the same thing—because the tobacco company has every reason NOT to say it.

**Extract facts separately from interpretations.** A biased source may accurately report data while spinning its interpretation. You can often use the data while discounting the spin.

**Use biased sources to map the landscape.** Even if you don't trust a source's conclusions, they can tell you what arguments exist, what evidence people cite, and what objections have been raised. This is useful intelligence even from unreliable sources.`,
      },
      {
        title: "Debiasing Techniques",
        content: `Research shows these techniques can reduce the impact of bias on your thinking.`,
        subsections: [
          {
            title: "Consider the Opposite",
            content: `Before finalizing a judgment, deliberately generate reasons why your initial assessment might be wrong. What evidence would support the opposite conclusion? This forces engagement with counterarguments and reduces confirmation bias. Studies show this simple technique significantly improves decision quality.`,
          },
          {
            title: "Pre-Mortem Analysis",
            content: `Developed by psychologist Gary Klein: After deciding on a course of action, imagine it has failed spectacularly. Work backward to identify what caused the failure. This surfaces risks and objections that optimism bias might otherwise suppress. It also gives people "permission" to voice doubts they might not raise in normal planning.`,
          },
          {
            title: "Steel-Manning",
            content: `Instead of attacking the weakest version of an opposing argument (straw-manning), construct the strongest possible version of it (steel-manning). If you can't articulate why a reasonable person might hold the opposing view, you don't understand it well enough to reject it. This is the foundation of Argumend's approach to controversial topics.`,
          },
          {
            title: "Seek Disconfirming Evidence",
            content: `Actively search for information that would prove your hypothesis wrong. This is the essence of the scientific method—Popper's falsificationism. The question isn't "What evidence supports my view?" but "What evidence would falsify it?"—then look for that evidence.`,
          },
          {
            title: "Reference Class Forecasting",
            content: `Instead of building estimates from the inside (this specific case), start from the outside: what happened in similar cases in the past? This counteracts optimism bias and anchoring by grounding estimates in base rates rather than the details of the current situation that make it feel "special."`,
          },
        ],
      },
      {
        title: "A Note on the Backfire Effect",
        content: `You may have heard that correcting misinformation backfires—making people believe the false claim more strongly. This "backfire effect" was widely popularized and caused some to avoid fact-checking entirely.

Recent research suggests this effect is largely a myth. Multiple replication attempts have failed to find robust backfire effects. For most people, corrections work. Misinformation is reduced, not reinforced, by accurate information.

The lesson: don't avoid fact-checking out of fear of backfire. Present accurate information clearly and respectfully. Most people, most of the time, will update their beliefs in response to good evidence—even if the update is smaller than we might hope.`,
      },
    ],
    keyTakeaways: [
      "Everyone is biased—the goal isn't elimination but recognition and compensation",
      "Confirmation bias is the master bias: we seek, interpret, and remember information that confirms our beliefs",
      "Source biases (funding, publication, selection) systematically distort available information before it reaches you",
      "Discount, don't dismiss: biased sources can still provide valuable information if you adjust appropriately",
      "Claims against a source's interest are more credible than claims aligned with it",
      "Debiasing techniques work: consider the opposite, pre-mortems, steel-manning, and seeking disconfirmation",
      "The backfire effect is mostly myth—fact-checking generally works",
    ],
    furtherReading: [
      { title: "Thinking, Fast and Slow", author: "Daniel Kahneman" },
      { title: "The Scout Mindset", author: "Julia Galef", url: "https://www.juliagalef.com/book/" },
      { title: "Rationality: From AI to Zombies", author: "Eliezer Yudkowsky", url: "https://www.readthesequences.com/" },
      { title: "How Minds Change", author: "David McRaney" },
    ],
  },
  {
    id: "evidence-hierarchy",
    title: "The Hierarchy of Evidence",
    subtitle: "Evaluating and Weighting Different Types of Proof",
    description: "Not all evidence is equal. Learn to assess evidence quality, understand study design, and know when to update your beliefs.",
    icon: Layers,
    color: "#D4A012",
    readTime: "14 min read",
    sections: [
      {
        title: "Why Hierarchy Matters",
        content: `When someone says "studies show," the natural follow-up should be: "What kind of studies?"

A single anecdote, a case study, a large observational study, a randomized controlled trial, and a meta-analysis of many trials all count as "evidence." But they have vastly different reliability. The hierarchy of evidence helps you quickly assess how much weight to give different types of proof.

The core insight: different study designs have different susceptibilities to bias and different abilities to establish causation. Understanding these differences is essential for evaluating any empirical claim.`,
      },
      {
        title: "The Evidence Pyramid",
        content: `Evidence quality is often represented as a pyramid, with the strongest evidence at the top. Here's the hierarchy from strongest to weakest:`,
        subsections: [
          {
            title: "1. Systematic Reviews and Meta-Analyses",
            content: `At the top. These synthesize all available research on a question using explicit, reproducible methods. A good meta-analysis combines the data from many studies to get more precise estimates than any single study could provide.

**Why it's strong:** Integrates all available evidence; reduces impact of any single study's flaws; can detect patterns invisible in individual studies.

**Caveats:** Only as good as the studies included. A meta-analysis of poorly designed studies ("garbage in, garbage out") doesn't produce reliable conclusions. Publication bias—missing negative studies—can distort results.`,
          },
          {
            title: "2. Randomized Controlled Trials (RCTs)",
            content: `The "gold standard" for establishing causation. Participants are randomly assigned to treatment or control groups, then compared on outcomes.

**Why it's strong:** Random assignment distributes confounding variables equally between groups, so any difference in outcomes can be attributed to the treatment. Blinding (hiding group assignment from participants and/or researchers) prevents placebo effects and biased assessment.

**Caveats:** Not always possible (you can't randomly assign people to smoke for 30 years). Can be expensive and time-consuming. May have limited generalizability—what works in a controlled setting may not work in the real world.`,
          },
          {
            title: "3. Cohort Studies",
            content: `Observational studies that follow groups of people with different exposures over time and compare outcomes.

**Why it's useful:** Can study exposures that can't be randomized. Can measure incidence and relative risk. Good for rare exposures.

**Caveats:** Can show association but not prove causation. Confounding variables may explain observed relationships. Requires large samples and long follow-up.`,
          },
          {
            title: "4. Case-Control Studies",
            content: `Start with people who have an outcome (cases) and those who don't (controls), then look backward to compare exposures.

**Why it's useful:** Efficient for studying rare diseases. Faster and cheaper than cohort studies.

**Caveats:** Vulnerable to recall bias (people with disease may remember exposures differently). Selection of appropriate controls is critical and difficult. Can only estimate odds ratios, not absolute risks.`,
          },
          {
            title: "5. Case Series and Case Reports",
            content: `Descriptions of individual cases or small groups of patients, without comparison groups.

**Why it's useful:** Can identify new phenomena, rare events, and unusual presentations. Often the first signal of something new (adverse drug reactions, emerging diseases).

**Caveats:** No comparison group means no ability to establish causation or even correlation. Susceptible to observer bias. Not generalizable.`,
          },
          {
            title: "6. Expert Opinion and Anecdotes",
            content: `Professional judgment without systematic evidence, or individual stories.

**Why it has value:** Expertise matters. Experience with rare cases and clinical judgment aren't captured in studies. Anecdotes can generate hypotheses worth testing.

**Caveats:** Highly susceptible to bias. Experts can be wrong, especially outside their specific expertise. Individual cases aren't representative. Memory is unreliable.`,
          },
        ],
      },
      {
        title: "Evaluating Study Quality",
        content: `The hierarchy is a starting point, but quality varies within each level. Here's how to assess whether a study is actually reliable.`,
        subsections: [
          {
            title: "Internal vs. External Validity",
            content: `**Internal validity:** Does the study accurately measure what it claims to measure? Were the methods rigorous? Were confounders controlled?

**External validity:** Do the findings apply outside this specific study? Would results generalize to different populations, settings, or times?

There's often a trade-off: highly controlled studies (maximizing internal validity) may use artificial settings that limit generalizability. Studies with broader inclusion criteria (maximizing external validity) may have more confounding.`,
          },
          {
            title: "Sample Size and Statistical Power",
            content: `Sample size determines the precision of estimates and the ability to detect real effects. Statistical power is the probability of finding an effect that actually exists.

**Red flag:** Small studies claiming to "prove" anything. With small samples, both false positives (Type I errors) and false negatives (Type II errors) are more likely. Effect sizes in small studies tend to be inflated.

A general principle: larger studies are more reliable than smaller ones, all else equal.`,
          },
          {
            title: "P-Values vs. Effect Sizes",
            content: `A p-value tells you whether an effect EXISTS (is distinguishable from zero). It does NOT tell you how LARGE the effect is or whether it matters practically.

With large enough samples, even trivially small effects become "statistically significant." A drug that lowers blood pressure by 0.1 mmHg might achieve p < 0.001 with a huge sample—but clinically, this effect is meaningless.

**Always look for effect sizes and confidence intervals.** Effect size tells you the magnitude. Confidence intervals tell you the range of plausible values. A significant p-value with a wide confidence interval should not inspire confidence.`,
          },
          {
            title: "Randomization and Blinding",
            content: `In RCTs, random assignment prevents selection bias—neither patients nor doctors choose who gets which treatment. This ensures groups are comparable at baseline.

Blinding prevents placebo effects and biased assessment:
- **Single-blind:** Participants don't know their group assignment
- **Double-blind:** Neither participants nor researchers know
- **Triple-blind:** Even the statisticians analyzing data don't know

Studies without blinding show approximately 23% exaggeration of intervention effects for subjective outcomes. Always note whether blinding was used and whether it was successful.`,
          },
        ],
      },
      {
        title: "The Replication Crisis and Its Lessons",
        content: `In the 2010s, a crisis emerged across scientific fields: many published findings couldn't be replicated.

The landmark Reproducibility Project in psychology found that of 100 published studies, 97 had reported significant results—but only 36 replications achieved significance. Replication effect sizes were about half the size of original reported effects.

Similar problems emerged in medicine, cancer biology, economics, and other fields.

**What caused this:**
- **P-hacking:** Running many analyses and reporting only the significant ones
- **HARKing:** Hypothesizing After Results are Known (presenting exploratory findings as if they were planned)
- **Publication bias:** Journals preferring positive results
- **Small samples:** Leading to false positives and inflated effects
- **Lack of transparency:** Unable to verify methods or reproduce analyses`,
      },
      {
        title: "Pre-Registration and Open Science",
        content: `The response to the replication crisis has been a movement toward greater transparency.

**Pre-registration** requires researchers to publicly commit to their study design, hypotheses, and analysis plan BEFORE collecting data. This prevents p-hacking and HARKing by making it clear what was planned versus discovered post-hoc.

Evidence of effectiveness is striking: studies using open science practices show substantially higher replication rates than traditional research. The original Reproducibility Project found only about 36% of psychology studies replicated; subsequent studies using pre-registration and other reforms show marked improvement.

**Registered Reports** go further: journals peer-review and accept studies based on the methodology BEFORE results are known. Publication is guaranteed regardless of what the results show. This eliminates publication bias.

**Open Science practices** include:
- Sharing raw data publicly
- Making analysis code available
- Pre-registering hypotheses and methods
- Publishing null results

When evaluating research, check whether it was pre-registered. This is now a marker of research quality.`,
      },
      {
        title: "Beyond Medical Evidence",
        content: `The evidence hierarchy was developed in medicine, but its principles apply more broadly—with important adaptations.`,
        subsections: [
          {
            title: "Social Sciences",
            content: `RCTs are often impractical or unethical for social science questions. You can't randomly assign people to poverty, divorce, or political systems. Quasi-experimental designs (natural experiments, regression discontinuity) try to approximate randomization by exploiting chance variations.

Social phenomena are also more context-dependent than medical treatments. What works in one culture, economy, or historical period may not generalize. External validity concerns are especially acute.`,
          },
          {
            title: "Historical Claims",
            content: `History operates entirely through testimonial evidence—no experiments possible, no replication. The hierarchy here focuses on source criticism:
- Proximity: Was the source present at the events?
- Bias: What interests might distort the account?
- Corroboration: Do independent sources agree?
- Authenticity: Is this document genuine?

Multiple independent contemporary sources agreeing on an event is the historical equivalent of triangulation.`,
          },
          {
            title: "When Anecdotes Matter",
            content: `Despite their low place in the hierarchy, anecdotes have legitimate uses:
- **Rare events:** Statistical methods require multiple observations. For truly rare phenomena, case reports may be the only evidence available.
- **Generating hypotheses:** Most scientific discoveries began as observations that someone noticed and found interesting enough to study systematically.
- **Extreme effects:** If an intervention produces dramatic, obvious effects (like penicillin killing bacteria), formal trials may be almost redundant.

The key is knowing when anecdotal evidence is appropriate (exploring, hypothesizing) versus when it's insufficient (establishing causation, setting policy).`,
          },
        ],
      },
      {
        title: "'No Evidence' vs. 'Evidence of No Effect'",
        content: `This distinction is critical and often confused.

**"No evidence of effect"** means studies haven't found an effect. This could mean:
- The effect doesn't exist
- Studies were too small to detect it (underpowered)
- Nobody has studied it yet

**"Evidence of no effect"** means studies have specifically established that an effect does NOT exist, with appropriate power to detect it if it did.

Absence of evidence is NOT evidence of absence. A small negative study proves nothing—it might simply have lacked the power to find a real effect.

Properly establishing "no effect" requires:
- Studies designed to detect the effect if it exists
- Adequate sample sizes
- Pre-specified equivalence margins

Many potentially useful treatments have been abandoned based on underpowered negative studies. Before concluding something doesn't work, ask whether the studies were capable of detecting an effect that small.`,
      },
      {
        title: "Practical Guidelines",
        content: `When evaluating evidence in practice:

**Quick assessment checklist:**
1. What type of study is this? (Where on the hierarchy?)
2. Sample size—is it adequate?
3. Was there randomization? Blinding?
4. Was it pre-registered?
5. What's the effect size, not just the p-value?
6. Has it been independently replicated?

**Red flags:**
- Small samples claiming to "prove" things
- Many p-values just under 0.05 (suggests p-hacking)
- No effect sizes or confidence intervals reported
- Primary outcomes changed from what was originally registered
- Data not available even "upon request"
- All studies on a topic funded by the same interested party

**When to update beliefs:**
- Update more for higher-quality designs
- Update more for replicated findings
- Update more for large effects
- Update more when findings come from sources with no stake in the outcome
- Extraordinary claims require extraordinary evidence—but don't dismiss extraordinary evidence either`,
      },
    ],
    keyTakeaways: [
      "Not all evidence is equal: systematic reviews > RCTs > cohort studies > case-control > case reports > expert opinion",
      "Sample size matters: small studies produce unreliable, often inflated estimates",
      "P-values indicate existence of effect, not magnitude—always look for effect sizes and confidence intervals",
      "The replication crisis revealed widespread problems; pre-registration and open science practices substantially improve reliability",
      "'No evidence of effect' is not the same as 'evidence of no effect'—check if studies were powered to detect the effect",
      "Update beliefs more strongly for replicated findings from independent sources with large effect sizes",
      "Extraordinary claims require extraordinary evidence—but don't dismiss extraordinary evidence either",
    ],
    furtherReading: [
      { title: "The Book of Why", author: "Judea Pearl" },
      { title: "Statistics Done Wrong", author: "Alex Reinhart" },
      { title: "How to Read a Paper", author: "Trisha Greenhalgh" },
      { title: "Science Fictions", author: "Stuart Ritchie" },
    ],
  },
];

export function getGuideById(id: string): Guide | undefined {
  return guides.find(guide => guide.id === id);
}
