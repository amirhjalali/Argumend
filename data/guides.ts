import { Triangle, Brain, Layers, Map, Play, ShieldCheck, type LucideIcon } from "lucide-react";

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
    color: "#C4613C",
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
  {
    id: "how-to-read-an-argument-map",
    title: "How to Read an Argument Map",
    subtitle: "Navigating Interactive Argument Maps",
    description: "A practical guide to navigating Argumend's interactive argument maps — understanding nodes, connections, evidence, and cruxes.",
    icon: Map,
    color: "#2d8a6e",
    readTime: "10 min read",
    sections: [
      {
        title: "What the Map Shows",
        content: `When you open an argument map on Argumend, you're looking at a visual representation of a debate's logical structure. Instead of reading a wall of text where arguments blur together, the map breaks a topic into discrete, connected components that you can explore at your own pace.

At the center of every map is the **topic node** — the core question or claim being examined. Branching out from the center you'll find **pillar nodes**, which represent the major supporting or opposing lines of reasoning. Each pillar can, in turn, have **evidence nodes** attached to it — specific facts, studies, or data points that strengthen or weaken that line of reasoning.

The map is interactive. You can click any node to expand it and read its full description. You can zoom in on a cluster of related arguments, or zoom out to see the overall shape of the debate. Hovering over a connection line reveals the relationship between two nodes — whether one supports, opposes, or qualifies another.

Think of the map as a table of contents for a debate, except every entry is connected to every other relevant entry. You never lose context, because the structure itself shows you how ideas relate.`,
      },
      {
        title: "Understanding Pillars",
        content: `Pillars are the backbone of every argument map. Each pillar represents a distinct line of reasoning — an independent argument that either supports or opposes the central claim.

A topic like "Should cities invest in public transit?" might have pillars such as "Economic benefits of reduced car dependency," "Environmental impact of transit systems," "Equity and access for low-income residents," and "Fiscal sustainability of transit agencies." Each pillar can stand on its own: even if one pillar collapses, the others remain.

This matters because real-world debates often fail when people conflate different arguments. Someone might present a devastating critique of the economic case for transit, and their opponent concedes as if the entire issue is settled — even though the environmental and equity arguments are untouched. The pillar structure prevents this. By breaking a position into independent lines of reasoning, the map makes it clear which arguments have been addressed and which remain standing.

When reading a map, start by scanning the pillars. This gives you the big picture — the main reasons people hold the positions they hold. Then drill into the pillars that interest you most, or the ones that seem weakest, to see what evidence supports them.

Each pillar is color-coded. Pillars supporting the central claim typically appear in one color family, while opposing pillars appear in another. This visual distinction helps you quickly grasp the balance of the debate without reading a single word.`,
      },
      {
        title: "Reading Evidence: For and Against",
        content: `Evidence nodes are where the map gets concrete. While pillars state the arguments in general terms, evidence nodes provide the specific facts, studies, statistics, and examples that give those arguments weight.

Each evidence node has several properties you should pay attention to:`,
        subsections: [
          {
            title: "Direction: Supporting or Opposing",
            content: `Every piece of evidence is linked to a pillar with a clear directional relationship. A green connection line means the evidence supports that pillar's argument. A red connection line means it weakens or contradicts it. This is crucial: strong arguments have both supporting and opposing evidence displayed honestly. If you see a pillar with only supporting evidence, that might mean the map is incomplete rather than that the argument is airtight.`,
          },
          {
            title: "Source and Reliability Indicators",
            content: `Each evidence node shows where the information comes from — a peer-reviewed study, a government dataset, a news report, an expert opinion. Argumend attaches reliability indicators to help you quickly judge quality. A meta-analysis from a top journal carries more weight than a single blog post, and the map reflects this through visual cues like source badges and weight indicators. You do not need to evaluate every source yourself; the indicators give you a starting point.`,
          },
          {
            title: "Verification Status",
            content: `Some evidence nodes carry a verification badge — confirmed, disputed, or unverified. Confirmed evidence has been cross-referenced against multiple independent sources. Disputed evidence has credible challenges. Unverified evidence is presented as-is, without independent confirmation. When you see disputed or unverified tags, treat the evidence as provisional rather than settled.`,
          },
        ],
      },
      {
        title: "Finding the Crux",
        content: `The crux is the most important concept on any argument map. A crux is the single point of disagreement that, if resolved, would change the most minds. It is the fulcrum of the debate.

On Argumend's maps, cruxes are highlighted with a distinctive marker — typically a diamond icon or a bright accent border — so they stand out from ordinary nodes. You can also find them by looking for the node with the most connection lines: cruxes tend to sit at the intersection of multiple pillars because they affect several lines of reasoning simultaneously.

For example, in a debate about renewable energy policy, the crux might be: "Can battery storage technology scale fast enough to make an all-renewable grid reliable by 2040?" If the answer is yes, multiple pillars supporting renewable investment are strengthened. If the answer is no, several opposing pillars gain force. That one factual question shifts the balance of the entire debate.

When you find the crux, you've found the most productive place to focus your attention. Instead of arguing about peripheral points, you can direct your research and thinking toward the question that actually matters. This is one of the most valuable skills in critical thinking: identifying where your effort will have the highest leverage.

To find the crux on any map, look for the node labeled "crux" or "key disagreement." Read it carefully and ask yourself: which side of this question do I find more convincing, and what evidence would change my mind?`,
      },
      {
        title: "Using Confidence Scores",
        content: `Every major node on an Argumend map displays a confidence score — a number from 0 to 100 that represents how well-supported that particular claim or argument is, given the available evidence.

A confidence score of 85 does not mean "85% chance this is true." It means that 85% of the relevant, weighted evidence points in this direction. The distinction matters: a high confidence score reflects the current state of evidence, not an absolute truth claim. New evidence can shift scores.

Here's how to interpret the ranges:

**80-100: Strong evidence.** The claim is well-supported by multiple independent, high-quality sources. Opposing evidence is sparse or weak. You can treat this as a reliable basis for further reasoning, while remaining open to new information.

**60-79: Moderate evidence.** The balance of evidence favors this claim, but there are meaningful counterarguments or gaps. This is the range where productive debate is most likely — there's enough evidence to form a view, but not enough to be certain.

**40-59: Contested.** Evidence is roughly balanced on both sides, or there simply isn't enough evidence to tip the scales. Claims in this range deserve skepticism in both directions. This is where the crux often lives.

**Below 40: Weak support.** The available evidence mostly contradicts this claim, or the claim rests on low-quality sources. Treat with caution.

Confidence scores are most useful as a triage tool. When exploring a complex map with dozens of nodes, start with the low-confidence nodes — those are where the interesting questions are, where the debate is genuinely unresolved, and where new evidence would make the biggest difference.

You can also compare confidence scores across pillars to get a quick read on the overall state of the debate. If every pillar supporting a position has scores above 75, and every opposing pillar is below 40, the evidence landscape is lopsided. If scores are mixed, the debate is genuinely open.`,
      },
    ],
    keyTakeaways: [
      "Start by scanning the pillars to understand the major lines of reasoning before diving into details",
      "Pay attention to evidence direction (supporting vs. opposing) and verification status — not all evidence is created equal",
      "Find the crux first — it's the single point where resolving a disagreement would shift the most about the debate",
      "Use confidence scores as a triage tool to identify where evidence is strong, where it's contested, and where your attention is most needed",
    ],
    furtherReading: [
      { title: "Good Reasoning Matters", author: "Leo Groarke & Christopher Tindale" },
      { title: "Mapping Critical Thinking", author: "Tim van Gelder", url: "https://timvangelder.com/" },
      { title: "An Illustrated Book of Bad Arguments", author: "Ali Almossawi", url: "https://bookofbadarguments.com/" },
    ],
  },
  {
    id: "running-your-first-analysis",
    title: "Running Your First Analysis",
    subtitle: "From Text to Structured Insight",
    description: "Step-by-step guide to using Argumend's AI analysis tool to extract arguments, identify cruxes, and evaluate reasoning from any text.",
    icon: Play,
    color: "#5b6abf",
    readTime: "11 min read",
    sections: [
      {
        title: "What Text Works Best",
        content: `Argumend's analysis tool works on any text that contains arguments — but some texts produce richer results than others. Understanding what to feed the tool helps you get the most out of it.

**Ideal inputs:**

- **Opinion editorials and essays.** These are explicitly argumentative. The author is trying to convince you of something, so the analysis tool has clear positions, evidence, and reasoning to extract.
- **Policy proposals and position papers.** These contain structured arguments with supporting evidence, making them excellent candidates for decomposition into pillars and cruxes.
- **Debate transcripts and panel discussions.** Multiple perspectives in a single text let the tool identify genuine disagreements and map out where the participants diverge.
- **Research summaries and literature reviews.** These synthesize evidence on a topic and often contain implicit arguments about what the evidence means.

**Inputs that work, but produce thinner results:**

- **Straight news reporting.** Good journalism tries to present facts without argument. The tool can still extract claims and evidence, but there may be fewer explicit positions to analyze.
- **Technical documentation.** Manuals and specifications are informational rather than argumentative. The tool may identify factual claims but won't find much debate structure.
- **Very short texts (under 200 words).** Brief passages may not contain enough material for a meaningful analysis. Aim for at least a few paragraphs.

**A practical tip:** If you're analyzing a topic rather than a specific text, try finding two or three articles that disagree with each other and paste them together. The analysis engine excels when it can identify genuine disagreement — multiple perspectives in the input produce a much richer argument map than a single-perspective piece.`,
      },
      {
        title: "How to Paste and Submit",
        content: `Navigate to the **/analyze** page on Argumend. You'll see a large text area with a prompt to paste or type your text.

**Step 1: Paste your text.** Copy the article, essay, or transcript you want to analyze and paste it into the text area. The tool accepts plain text — formatting like bold and italic will be stripped, but that's fine. The analysis works on the words and ideas, not the formatting.

**Step 2: Review the preview.** Before submitting, scan what you've pasted to make sure the text copied correctly. Occasionally, copying from PDFs or web pages introduces garbled characters or missing paragraphs. A quick visual check saves you from analyzing corrupted input.

**Step 3: Submit for analysis.** Click the "Analyze" button. The AI engine will process your text — this typically takes between ten and thirty seconds depending on length. You'll see a progress indicator while the analysis runs.

**Step 4: Wait for the full result.** The analysis appears in stages. Positions and pillars are usually identified first, followed by evidence extraction, crux identification, and finally fallacy detection. Let the full process complete before drawing conclusions — early partial results may shift as the engine processes more of the text.

You don't need to create an account to run an analysis, though saving and sharing results requires one. Each analysis generates a unique URL you can bookmark or share.`,
      },
      {
        title: "Understanding the Results",
        content: `Once the analysis completes, you'll see a structured breakdown of the text's arguments. Here's what each section means and how to use it.`,
        subsections: [
          {
            title: "Positions",
            content: `At the top of the results, the tool identifies the main positions present in the text — the core claims or stances that the author (or authors) are advancing. Each position is stated in a clear, neutral sentence.

If the text contains a single perspective, you might see one primary position and one or two implied counter-positions that the author is arguing against. If the text contains multiple perspectives (like a debate transcript), you'll see each side's position stated explicitly.

Positions are the "what" of the argument — what is being claimed. Everything else in the analysis supports, opposes, or qualifies these positions.`,
          },
          {
            title: "Pillars and Evidence",
            content: `Below the positions, you'll find the pillars — the major independent arguments supporting or opposing each position. Each pillar is labeled with its direction (for or against) and includes the specific evidence extracted from the text.

The evidence is drawn directly from the source text: statistics cited, studies referenced, examples given, logical steps made. The tool distinguishes between empirical evidence (data, studies, observed facts) and logical arguments (deductive or inductive reasoning steps).

This is where the analysis earns its keep. A skilled reader might identify the main argument in an essay, but might miss a secondary argument buried in paragraph seven, or fail to notice that two seemingly different points actually support the same underlying pillar. The tool catches these structural patterns.`,
          },
          {
            title: "Cruxes",
            content: `The crux section identifies the key points of disagreement — the specific factual or value-based questions where resolving them would most change the conclusion. This is often the most valuable part of the analysis.

For each crux, the tool explains why it matters: which pillars it affects, what each side would need to be true, and what kind of evidence would resolve it. If you only have time to focus on one part of the results, focus on the cruxes. They tell you where the real action is.`,
          },
          {
            title: "Fallacy Detection",
            content: `The tool scans for common logical fallacies — straw man arguments, appeals to authority, false dichotomies, slippery slopes, ad hominem attacks, and others. Each detected fallacy is shown with the relevant passage highlighted and an explanation of why it qualifies as a reasoning error.

A word of caution: fallacy detection is the most subjective part of the analysis. Some patterns that look like fallacies are actually legitimate reasoning moves in context. An appeal to expert opinion, for example, isn't a fallacy when the expert is genuinely authoritative on the specific question at hand. Use the fallacy section as a starting point for critical examination, not as a definitive verdict.`,
          },
        ],
      },
      {
        title: "The AI Judge Council",
        content: `Behind the scenes, Argumend doesn't rely on a single AI model to produce its analysis. Instead, it uses a **judge council** — multiple independent AI evaluators that each assess the text separately before their judgments are synthesized.

This design mirrors the principle of triangulation (covered in our guide on that topic). A single AI model might have systematic blind spots or tendencies — perhaps it consistently underweights certain types of evidence, or has a subtle bias toward particular framings. By running multiple models independently and then comparing their assessments, Argumend reduces the impact of any single model's weaknesses.

Here's how it works in practice:

1. **Independent evaluation.** Each AI judge analyzes the text on its own, identifying positions, pillars, evidence, and cruxes without seeing what the other judges found.

2. **Comparison and consensus.** The system compares the judges' outputs. Where they agree, confidence is high. Where they disagree, the system flags the disagreement and investigates further.

3. **Synthesis.** The final analysis represents the consensus view, with confidence scores reflecting the degree of agreement among judges. Areas where judges disagreed are presented with lower confidence scores, alerting you that the interpretation is less certain.

4. **Transparency.** In the detailed view, you can see where judges diverged. This is useful information — it tells you which aspects of the analysis are robust and which are more interpretation-dependent.

The judge council is why Argumend's confidence scores are more calibrated than a single model's output would be. It's also why the tool sometimes flags uncertainty rather than presenting a false sense of certainty — genuine ambiguity in the source text produces genuine disagreement among judges, and the system reports this honestly rather than papering over it.`,
      },
      {
        title: "Sharing Your Analysis",
        content: `Every completed analysis generates a permanent URL that you can share with anyone. The recipient doesn't need an Argumend account to view the results — the full analysis is accessible via the link.

**Sharing for discussion.** If you're debating a topic with someone and want to establish a shared understanding of the argument structure, send them the analysis link. Instead of talking past each other, you can point to specific pillars and say "I think this pillar is weak because..." or "I agree with this evidence but disagree with this one." The shared structure makes disagreement productive.

**Sharing for education.** Teachers and professors can use analysis links as teaching tools. Assign students an article, run the analysis, and then ask students to evaluate whether the AI's breakdown matches their own reading. Where does the AI get it right? Where does it miss something? This builds critical thinking skills by giving students a structured second opinion to compare against.

**Exporting results.** You can export the analysis in several formats. The structured data export gives you the raw positions, pillars, evidence, and cruxes in a format you can import into other tools. The summary export produces a human-readable breakdown suitable for pasting into documents or presentations.

**Building a personal library.** If you create an account, your analyses are saved to your library. Over time, this becomes a personal database of argument structures on topics you care about. You can search your library, compare analyses, and track how your understanding of a topic has evolved as you've analyzed more sources.`,
      },
    ],
    keyTakeaways: [
      "The best inputs for analysis are explicitly argumentative texts — editorials, position papers, debate transcripts — ideally with multiple perspectives",
      "Focus on the cruxes first: they identify where resolving a single disagreement would shift the most about the conclusion",
      "The AI judge council uses multiple independent evaluators to reduce bias — confidence scores reflect the degree of consensus among them",
      "Use the sharing and export features to make disagreements productive: point to specific pillars and evidence rather than arguing in generalities",
    ],
    furtherReading: [
      { title: "Argumentation: The Study of Effective Reasoning", author: "David Zarefsky" },
      { title: "Critical Thinking: A Concise Guide", author: "Tracy Bowell & Gary Kemp" },
      { title: "The Righteous Mind", author: "Jonathan Haidt", url: "https://righteousmind.com/" },
    ],
  },
  {
    id: "evaluating-source-credibility",
    title: "Evaluating Source Credibility",
    subtitle: "Assessing Evidence Reliability in Practice",
    description: "How to assess whether evidence is reliable — understanding source reliability, independence, replicability, and directness in Argumend's framework.",
    icon: ShieldCheck,
    color: "#b37d1e",
    readTime: "13 min read",
    sections: [
      {
        title: "The Four Dimensions of Evidence Weight",
        content: `Not all evidence carries the same weight. A peer-reviewed meta-analysis and a single anonymous blog post might both claim the same thing, but they shouldn't move your confidence by the same amount. The question is: how do you systematically decide how much weight to give a piece of evidence?

Argumend's framework evaluates evidence along four independent dimensions: **reliability**, **independence**, **replicability**, and **directness**. Each dimension captures a different aspect of evidence quality, and together they provide a comprehensive picture of how much you should trust a given source.

Think of these four dimensions as separate filters. A piece of evidence might score high on one dimension and low on another. A government statistical report, for instance, is highly reliable and direct, but if every other analysis uses the same dataset, independence is low. A collection of independent anecdotes might score well on independence but poorly on reliability and replicability.

The power of the framework comes from evaluating all four dimensions together. Evidence that scores high on all four is the gold standard — you can update your beliefs substantially based on it. Evidence that scores low on all four should barely move the needle. Most real-world evidence falls somewhere in between, and the framework helps you calibrate appropriately.

On Argumend's argument maps, each evidence node displays indicators for these four dimensions, giving you a quick visual assessment of evidence quality without needing to research every source yourself.`,
      },
      {
        title: "Source Reliability: What Makes a Source Trustworthy",
        content: `Reliability is the most intuitive dimension: how likely is this source to report accurate information? A source is reliable to the extent that its claims tend to be true.

Several factors determine reliability:`,
        subsections: [
          {
            title: "Track Record",
            content: `The single best predictor of future reliability is past reliability. Has this source been accurate before? Have they issued corrections when wrong? A source that has been consistently accurate over years has earned a degree of trust. A source with a history of errors, retractions, or fabrications should be treated with skepticism regardless of what they're currently claiming.

Argumend tracks source track records where possible. Peer-reviewed journals with low retraction rates, news organizations with strong editorial standards, and government statistical agencies with decades of consistent methodology all receive higher reliability indicators.`,
          },
          {
            title: "Expertise and Methodology",
            content: `A source is more reliable when they have genuine expertise in the specific domain of their claim and use rigorous methodology. A climate scientist publishing in a climate journal is a more reliable source on atmospheric CO2 levels than a political commentator blogging about the same topic — even if the commentator happens to be right.

Methodology matters as much as credentials. A well-designed study by a junior researcher can be more reliable than a poorly designed study by a senior one. Look for transparent methods, appropriate statistical techniques, and honest acknowledgment of limitations.`,
          },
          {
            title: "Incentive Alignment",
            content: `Consider what incentives the source faces. A pharmaceutical company reporting that their own drug works has an obvious financial incentive to find positive results. That doesn't mean their study is wrong — but it means you should weight it less heavily than an independent replication by researchers with no financial stake.

The most credible statements are those that go against the source's interests. When a tobacco company acknowledges that smoking causes cancer, or a defense contractor admits their weapon system has flaws, those statements carry extra weight precisely because the source had every reason not to make them. Argumend flags "statements against interest" as particularly noteworthy evidence.`,
          },
          {
            title: "Transparency",
            content: `Reliable sources show their work. They explain their methodology, share their data, acknowledge their limitations, and make it possible for others to verify their claims. Sources that ask you to "just trust us" without providing verifiable details should receive less weight.

In the age of AI-generated content, transparency also means being clear about how information was produced. Was this written by a human expert, generated by AI, or some combination? Reliable sources are honest about their process.`,
          },
        ],
      },
      {
        title: "Independence: Why Multiple Sources Matter",
        content: `Independence measures whether sources arrived at their conclusions separately, without influencing each other. This dimension is critical because agreement between independent sources is far more meaningful than agreement between sources that share a common origin.

Consider two scenarios:

**Scenario A:** Three news outlets report the same story. You investigate and find that all three are citing the same single wire service report. Despite having "three sources," you really have one data point repeated three times. The apparent convergence is an illusion.

**Scenario B:** Three researchers using different methodologies, working at different institutions, with different funding sources, all find the same result. This genuine convergence is powerful evidence, because the probability of three independent analyses making the same error is much lower than the probability of one analysis being wrong.

Argumend evaluates independence by examining whether sources share common origins, methodologies, funding, or institutional affiliations. Evidence from truly independent sources receives higher weight than evidence from sources that may have influenced each other.

**How to assess independence yourself:**

1. **Trace the chain.** When multiple sources agree, ask: are they actually independent, or are they all drawing from the same upstream source? Follow citations back to their origins.

2. **Check for shared methodology.** If multiple studies use the same dataset or the same analytical approach, their agreement is less impressive than if they used different data and different methods.

3. **Look for institutional diversity.** Research from multiple institutions in multiple countries is more independent than multiple papers from the same lab group.

4. **Beware of social influence.** In tightly connected fields, researchers read each other's work and attend the same conferences. This creates correlated assumptions that can make "independent" research less independent than it appears.

Independence is especially important in the social media age, where a single claim can be amplified into thousands of shares that look like widespread agreement but trace back to a single origin. The appearance of consensus is not the same as genuine, independently-reached consensus.`,
      },
      {
        title: "Replicability and Directness",
        content: `The remaining two dimensions complete the picture of evidence quality.`,
        subsections: [
          {
            title: "Replicability",
            content: `Replicability asks: if someone repeated this study or investigation, would they get the same result? Evidence is replicable when the finding holds up across multiple attempts under similar conditions.

The replication crisis in psychology and other fields (discussed in our Hierarchy of Evidence guide) showed that many published findings fail to replicate. This makes replication status a crucial quality indicator. Evidence that has been successfully replicated — especially by independent teams — deserves substantially more weight than evidence from a single unreplicated study.

On Argumend, evidence nodes that reference replicated findings carry a replicability indicator. When evaluating evidence yourself, check: has this finding been replicated? By whom? Were the replications close to the original conditions, or did they test the finding in new contexts (which is even better)?

There's a practical hierarchy of replicability:
- **Direct replication by independent teams:** Strongest. Different people followed the same procedure and got the same result.
- **Conceptual replication:** Different methods testing the same underlying idea arrived at consistent findings. This is especially valuable because it means the finding isn't an artifact of one particular methodology.
- **Single study, pre-registered:** Not yet replicated, but the study was designed rigorously with pre-registered hypotheses and analysis plans, reducing the chance of false positives.
- **Single study, not pre-registered:** The finding may be real, but without replication or pre-registration, treat it as preliminary.`,
          },
          {
            title: "Directness",
            content: `Directness measures how closely the evidence addresses the actual claim being made. Direct evidence bears on the question without requiring inferential leaps. Indirect evidence requires you to reason from what was measured to what you actually want to know.

For example, if the claim is "Exercise reduces depression," a direct piece of evidence would be a randomized trial measuring depression scores in people assigned to exercise versus no exercise. An indirect piece of evidence might be a study showing that exercise increases serotonin levels in mice — relevant, but requiring you to assume that the mouse findings translate to humans and that serotonin levels map onto depression outcomes.

Both types of evidence have value, but direct evidence deserves more weight because it involves fewer inferential steps, each of which could be wrong.

Common sources of indirectness:
- **Proxy measures:** Using a stand-in for the thing you actually care about. GDP per capita is an indirect measure of well-being — related, but not the same thing.
- **Model organisms:** Animal studies are indirect evidence for human health. They're useful for generating hypotheses, but the translation from mice to humans fails often enough that caution is warranted.
- **Analogies:** "This policy worked in Country X, so it will work in Country Y." This is indirect because it assumes the two contexts are similar enough for the analogy to hold.
- **Extrapolation:** Extending a trend beyond the range of observed data. Past performance is indirect evidence of future results, and the further you extrapolate, the weaker the evidence becomes.

On Argumend's maps, evidence nodes indicate directness level. When you see a chain of indirect evidence, ask yourself how many inferential steps are required and how confident you are in each step. The overall strength of the evidence chain is limited by its weakest link.`,
          },
        ],
      },
      {
        title: "Putting It All Together",
        content: `The four dimensions work together to give you a holistic assessment of any piece of evidence. Here's a practical workflow for evaluating a source you encounter in the wild or on an Argumend map.

**Step 1: Assess reliability.** Who produced this? What's their track record? What methodology did they use? Do they have incentives that might bias their conclusions? How transparent are they about their process?

**Step 2: Check independence.** Is this the only source making this claim, or have others reached the same conclusion independently? If multiple sources agree, do they truly arrive at this independently, or are they drawing from a common well?

**Step 3: Look for replication.** Has this finding been reproduced? If it's a scientific claim, have other teams replicated the result? If it's an empirical observation, has it been observed in other contexts?

**Step 4: Evaluate directness.** Does this evidence address the actual question, or does it address a related-but-different question? How many inferential steps are required to connect the evidence to the claim?

**Step 5: Form an overall judgment.** Evidence that scores high on all four dimensions should move your confidence substantially. Evidence that scores high on some and low on others moves it moderately. Evidence that scores low across the board should barely register.

A useful mental model: imagine you're a juror. You wouldn't convict based solely on one witness's testimony (low independence, low replicability). You'd want multiple witnesses (independence), whose accounts have been verified (replicability), who actually saw the event in question (directness), and who have no reason to lie (reliability). The same standards apply to evaluating evidence in any domain.

**One final principle:** be honest about uncertainty. Sometimes the available evidence is simply insufficient to reach a confident conclusion. That's okay. Acknowledging what you don't know is itself a sign of good epistemic practice. Argumend's confidence scores embrace this — a score of 50 isn't a failure, it's an honest reflection of genuine uncertainty, and recognizing that uncertainty is the first step toward resolving it.`,
      },
    ],
    keyTakeaways: [
      "Evaluate evidence on four dimensions — reliability, independence, replicability, and directness — rather than relying on gut feeling",
      "The most credible evidence comes from sources with strong track records that go against their own interests, use transparent methodology, and have been independently replicated",
      "Independence is the most frequently overlooked dimension: apparent consensus can be an illusion when multiple sources trace back to a single origin",
      "Direct evidence that addresses the actual claim deserves more weight than indirect evidence requiring chains of inference — and the chain is only as strong as its weakest link",
    ],
    furtherReading: [
      { title: "Calling Bullshit: The Art of Skepticism in a Data-Driven World", author: "Carl Bergstrom & Jevin West", url: "https://callingbullshit.org/" },
      { title: "The Scout Mindset", author: "Julia Galef", url: "https://www.juliagalef.com/book/" },
      { title: "Factfulness", author: "Hans Rosling", url: "https://www.gapminder.org/factfulness/" },
    ],
  },
];

export function getGuideById(id: string): Guide | undefined {
  return guides.find(guide => guide.id === id);
}
