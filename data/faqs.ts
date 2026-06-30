export interface FAQ {
  question: string;
  answer: string;
  linkText?: string;
  linkHref?: string;
}

export const faqs: FAQ[] = [
  {
    question: "What is argument mapping?",
    answer: "Argument mapping is a way to visually lay out the structure of a debate: the core claim, the strongest objections, the best responses, and the evidence behind each. Argumend does this for controversial topics so you can see where the real disagreement lives, not just who is louder.",
  },
  {
    question: "What is Argumend?",
    answer: "A tool for understanding why people disagree. We break controversial topics into their core claims, find the crux of each disagreement, and show you how confident the evidence makes us. Think of it as a map of the argument, not another place to have one.",
    linkText: "Browse all topics",
    linkHref: "/topics",
  },
  {
    question: "Is Argumend free?",
    answer: "Yes. All curated topics, argument maps, and the analysis tool are free to use. No account required to browse. You only need to sign in if you want to save your own analyses.",
  },
  {
    question: "How are confidence scores calculated?",
    answer: "Confidence scores reflect the weight of evidence and expert consensus on a topic. A score of 95%+ indicates a settled question with overwhelming evidence (like anthropogenic climate change or the moon landing). Scores around 50% indicate genuinely contested questions where reasonable people can disagree (like certain interpretations of quantum mechanics or the nature of consciousness). For curated topics, the confidence score is a weighted composite of all evidence items across the topic\u2019s analytical pillars. Each evidence item is scored on four dimensions\u2014source reliability, independence, replicability, and directness\u2014giving a maximum of 40 points per item. The balance between supporting and opposing evidence, combined with the verification status of crux questions, produces the final percentage. For user-submitted analyses, the AI judge council assigns strength scores on a 1\u201310 scale based on logical coherence, evidentiary support, and rhetorical quality.",
    linkText: "Full methodology",
    linkHref: "/methodology",
  },
  {
    question: "What is a 'crux'?",
    answer: "A crux is the specific piece of evidence or test that would resolve a disagreement. If two people disagree about a topic, their crux is the precise question where finding the answer would change one or both of their minds. Identifying cruxes transforms abstract debates into concrete, testable questions.",
  },
  {
    question: "Why only three pillars per topic?",
    answer: "Three pillars strike a balance between comprehensiveness and focus. More pillars often overlap or dilute the core arguments. Three forces us to identify the truly foundational considerations\u2014the arguments that, if resolved, would settle the broader question.",
  },
  {
    question: "How do you choose which topics to cover?",
    answer: "We prioritize topics that (1) have genuine uncertainty or public controversy, (2) can be broken into testable claims, and (3) benefit from structured analysis. We avoid topics that are purely matters of value or preference, focusing instead on empirical and logical questions.",
  },
  {
    question: "What does 'steel-manning' mean?",
    answer: "The opposite of a straw man. Instead of attacking the weakest version of an argument, you present the strongest one. It\u2019s harder. It\u2019s also more honest. If you can\u2019t articulate why a smart person holds a position, you don\u2019t understand it well enough to disagree with it.",
  },
  {
    question: "Can I suggest a topic?",
    answer: "Yes! We welcome topic suggestions from the community. Good candidates are claims that (1) have strong arguments on multiple sides, (2) involve empirical or logical questions rather than pure opinion, (3) have testable cruxes, and (4) would benefit from structured breakdown.",
    linkText: "Community & contribution guidelines",
    linkHref: "/community",
  },
  {
    question: "Why do some topics show 'theoretical' verification status?",
    answer: "A crux marked 'theoretical' means the test is possible in principle but hasn't been done (or the results aren't conclusive). This is different from 'verified' (tested and confirmed) or 'impossible' (can't be tested with current technology).",
  },
  {
    question: "How is this different from Wikipedia or debate forums?",
    answer: "Wikipedia summarizes. Debate forums fight. We do neither. Our thing is structure: break a topic into pillars, find the crux, show the evidence. The pillar/crux framework forces you to be precise about what would actually resolve the disagreement\u2014which most debates never bother to do.",
  },
  {
    question: "Do you take a side on controversial topics?",
    answer: "We follow the evidence, which sometimes does favor one side. That\u2019s not bias\u2014that\u2019s how evidence works. But we always steel-man the minority position. The goal isn\u2019t to declare winners. It\u2019s to show you exactly where the disagreement lives and what would settle it.",
  },
  {
    question: "How often is topic data updated?",
    answer: "Curated topics are reviewed and updated whenever significant new evidence emerges\u2014typically every few months. We monitor major journals, preprints, and policy developments related to each topic. If a crux is resolved or new data shifts the evidence balance, we update the confidence score and add the relevant findings. Community members can flag outdated information through the Community page.",
  },
  {
    question: "How does the AI judge council work?",
    answer: "When you submit text for analysis, we run it through a council of multiple large language models\u2014each acting as an independent judge. Every judge scores the arguments for and against the claim on structured rubrics covering logical strength, evidence quality, and rhetorical fairness. We then aggregate the scores, flag disagreements between judges, and report whether there is consensus. This multi-model approach reduces the bias any single model might introduce.",
  },
  {
    question: "What happens to my analyzed text? Is it stored?",
    answer: "Submitted text is processed by our AI pipeline and the extracted analysis (positions, cruxes, fallacies, and scores) is saved so you can revisit and share the results via a unique URL. We do not sell or share your data with third parties. If you would like an analysis removed, contact us through the Community page.",
  },
  {
    question: "Is Argumend politically biased?",
    answer: "We try not to be, and we\u2019ve built safeguards to keep ourselves honest. Every position gets steel-manned. Confidence scores track evidence, not editorial preference. Our multi-model AI judge council catches bias that any single perspective might introduce. If the evidence happens to favor one political side on a given topic\u2014well, that\u2019s the evidence. We don\u2019t adjust reality for balance.",
  },
  {
    question: "Can I use Argumend in my classroom?",
    answer: "Please do. Use curated topics to show how debates decompose into testable claims, or have students submit their own texts for analysis. Works well for IB Theory of Knowledge, AP Government, A-Level Critical Thinking, and any course where evidence-based reasoning matters.",
    linkText: "Lesson plans & educator resources",
    linkHref: "/for-educators",
  },
  {
    question: "What\u2019s the difference between a crux and a key question?",
    answer: "A crux is a specific, often testable claim that sits at the heart of a disagreement\u2014if you resolved the crux, one or both sides would update their position. A key question is broader and may not have a single decisive answer. For example, \u201cDoes increasing minimum wage reduce total employment?\u201d is a crux because answering it definitively would shift the debate. \u201cWhat is the best economic policy?\u201d is a key question but not a crux\u2014it\u2019s too broad to resolve a specific disagreement.",
  },
  {
    question: "How do you handle topics where the science is still evolving?",
    answer: "We mark these topics as \u201ccontested\u201d or \u201chighly speculative\u201d and set confidence scores accordingly. Crux questions for evolving topics are often tagged with a \u201ctheoretical\u201d verification status, indicating that the decisive test is possible but hasn\u2019t been conclusively performed. As new research emerges, we update scores and evidence. Saying \u201cwe\u2019re at 55% confidence and here\u2019s why\u201d is more honest than pretending certainty where none exists.",
  },
  {
    question: "Can I export or share my analysis results?",
    answer: "Every analysis gets a unique, shareable URL that anyone can view without an account. You can also use the share buttons on any analysis page to post directly to Twitter/X or LinkedIn, or copy the link to your clipboard. We plan to add PDF and structured data exports in a future update.",
  },
  {
    question: "What are the most common logical fallacies in online debates?",
    answer: "The most common logical fallacies in online debates are: (1) Ad hominem \u2014 attacking the person instead of their argument; (2) Straw man \u2014 misrepresenting someone\u2019s position to make it easier to attack; (3) Appeal to authority \u2014 citing an expert\u2019s opinion as proof without evidence; (4) False dichotomy \u2014 presenting only two options when more exist; (5) Whataboutism \u2014 deflecting criticism by pointing to someone else\u2019s behavior. Argumend\u2019s argument analysis tool can detect these fallacies automatically when you paste debate text.",
    linkText: "Try the argument analyzer",
    linkHref: "/analyze",
  },
  {
    question: "How can I improve my critical thinking skills?",
    answer: "Start with three habits: (1) Steel-man opposing views before responding \u2014 can you state the other side\u2019s argument better than they can? (2) Identify cruxes \u2014 what specific evidence would change your mind? If nothing would, you\u2019re not reasoning, you\u2019re rationalizing. (3) Check your sources \u2014 use triangulation by cross-referencing multiple independent sources. Argumend\u2019s curated topics and guides are designed to build these skills through practice.",
    linkText: "Explore our reasoning guides",
    linkHref: "/guides",
  },
  {
    question: "What is the difference between an argument and a debate?",
    answer: "An argument is a structured set of claims with supporting evidence and reasoning. A debate is a format where two or more sides present their arguments. Most online \u2018debates\u2019 are neither \u2014 they\u2019re shouting matches where people talk past each other. Argumend converts messy debates into structured arguments by identifying the core claims, the evidence for each side, and the crux \u2014 the key question that would actually resolve the disagreement.",
  },
  {
    question: "How do I know if a source is reliable?",
    answer: "Evaluate sources on four dimensions: (1) Source reliability \u2014 does the source have a track record of accuracy? Is the work peer-reviewed? (2) Independence \u2014 is the source free from conflicts of interest? (3) Replicability \u2014 can others verify the claims independently? (4) Directness \u2014 how directly does the evidence address the specific claim? These are the same four dimensions Argumend uses to weight evidence in our argument maps.",
    linkText: "Learn about our evidence methodology",
    linkHref: "/methodology",
  },
  {
    question: "What is Bayesian reasoning and why does it matter?",
    answer: "Bayesian reasoning is updating your beliefs based on new evidence, proportional to how surprising that evidence is. If you believe something with 70% confidence and encounter strong counter-evidence, you should lower your confidence \u2014 not dismiss the evidence to protect your belief. Argumend\u2019s confidence scores embody this principle: they shift as evidence accumulates, and the methodology is transparent so you can trace exactly why.",
  },
  {
    question: "Can AI really analyze arguments objectively?",
    answer: "No AI is perfectly objective, which is exactly why we use a multi-model judge council rather than a single model. Each AI judge scores arguments independently on structured rubrics. We aggregate scores, flag disagreements between judges, and report whether there is consensus. This doesn\u2019t eliminate bias, but it reduces the chance that any single model\u2019s training biases dominate the result. We also show you the full reasoning, so you can evaluate the analysis yourself.",
  },
  {
    question: "How do I tell if an argument is good?",
    answer: "A good argument has three traits: (1) true premises \u2014 the starting claims are accurate and well-sourced; (2) valid structure \u2014 the conclusion actually follows from the premises rather than relying on a logical leap; and (3) relevance \u2014 the evidence directly addresses the claim instead of changing the subject. A useful test: try to steel-man the opposing view. If you can\u2019t state the other side\u2019s best case, you don\u2019t yet understand the argument well enough to judge it. Argumend evaluates arguments on exactly these dimensions and can flag fallacies that break the chain of reasoning.",
    linkText: "Try the argument analyzer",
    linkHref: "/analyze",
  },
  {
    question: "What is a crux in a debate or disagreement?",
    answer: "A crux is the single point where a disagreement actually turns \u2014 the specific question that, if answered, would change one or both sides\u2019 minds. Most arguments stall because people debate everything at once. Finding the crux strips the disagreement down to the one testable claim that matters. For example, two people arguing about a policy may really disagree about a single empirical question: does the policy reduce the harm it targets? Answer that, and the rest of the debate resolves. Argumend identifies the crux of every topic it maps.",
    linkText: "Learn about cruxes",
    linkHref: "/concepts/cruxes",
  },
  {
    question: "What is the difference between a debate and an argument map?",
    answer: "A debate is a live, adversarial exchange \u2014 two sides take turns trying to win. An argument map is a static, structured picture of a disagreement: it lays out the core claim, the strongest objections, the best responses, and the evidence behind each, all at once. A debate is optimized for persuasion; an argument map is optimized for understanding. Argumend turns the chaos of a debate into a map so you can see where the real disagreement lives instead of just who argued more forcefully.",
    linkText: "Browse argument maps",
    linkHref: "/topics",
  },
  {
    question: "How do I steelman an argument?",
    answer: "To steelman an argument, restate the opposing position in its strongest, most charitable form \u2014 stronger even than its own advocates might phrase it \u2014 before you respond. Three steps: (1) identify the best version of their core claim, not the weakest thing someone said online; (2) supply the most reasonable evidence and assumptions that would support it; (3) confirm you\u2019ve captured it (\u201cIs this a fair statement of your view?\u201d). Steelmanning is the opposite of a straw man. If you can\u2019t articulate why a thoughtful person holds a position, you don\u2019t understand it well enough to disagree.",
    linkText: "Explore our reasoning guides",
    linkHref: "/guides",
  },
  {
    question: "What is epistemic humility?",
    answer: "Epistemic humility is holding your beliefs proportional to your evidence \u2014 being confident where the evidence is strong, uncertain where it is weak, and willing to update when it shifts. It is not wishy-washy relativism; some questions really are settled. It simply means you separate how sure you feel from how sure the evidence warrants. Argumend builds this into its confidence scores: instead of declaring winners, it tells you \u201chere\u2019s 60% confidence, and here\u2019s exactly why,\u201d which is more honest than pretending certainty no one has earned.",
  },
  {
    question: "How can I change someone\u2019s mind with evidence?",
    answer: "People rarely change their minds when attacked, but they often do when they feel understood. The most effective approach: (1) steel-man their view first, so they know you get it; (2) find the crux \u2014 ask what specific evidence would change their mind, and what would change yours; (3) present sources that are independent, replicable, and directly relevant, not just authoritative-sounding; (4) make it safe to update by treating belief change as a strength, not a loss. Argument maps help by moving the conversation from \u201cwho wins\u201d to \u201cwhat would actually settle this.\u201d",
    linkText: "Improve your reasoning",
    linkHref: "/guides",
  },
  {
    question: "What is the strongest argument for or against a controversial topic?",
    answer: "There\u2019s rarely a single \u201cstrongest\u201d argument \u2014 the honest answer is that it depends on which crux you care about. That\u2019s why Argumend breaks each controversial topic into pillars and shows the best case on every side, with the supporting evidence weighted and scored. Instead of handing you one talking point, it shows you where the strongest evidence actually points, where reasonable people still disagree, and what specific question would resolve the dispute. Pick any topic to see its steel-manned arguments side by side.",
    linkText: "Browse all topics",
    linkHref: "/topics",
  },
  {
    question: "How does Argumend stay unbiased and handle political bias?",
    answer: "We use several safeguards rather than claiming perfect neutrality. Every position \u2014 including minority and unpopular ones \u2014 gets steel-manned. Confidence scores track the weight of evidence, not editorial preference, and the full methodology is transparent so you can trace each one. Submitted arguments run through a multi-model AI judge council, which reduces the chance that any single model\u2019s training bias dominates. When the evidence genuinely favors one political side on a topic, we report it as evidence rather than adjusting reality for the sake of balance. The goal is to show you where disagreement lives, not to tell you what to think.",
    linkText: "Read our methodology",
    linkHref: "/methodology",
  },
  {
    question: "Where does Argumend\u2019s evidence come from?",
    answer: "For curated topics, evidence is drawn from peer-reviewed research, primary data, expert consensus statements, official records, and reputable reporting \u2014 then weighted on four dimensions: source reliability, independence, replicability, and directness. We prioritize independent, replicable findings over single studies or appeals to authority. Each evidence item is scored and the balance of supporting versus opposing evidence drives the topic\u2019s confidence score. When evidence is thin or contested, we say so rather than overstating certainty.",
    linkText: "Learn about our evidence methodology",
    linkHref: "/methodology",
  },
  {
    question: "Can I use Argumend for school debate or education?",
    answer: "Yes \u2014 Argumend is built for it. Use curated argument maps to show students how a messy debate decomposes into testable claims, evidence, and a crux. Have them steel-man opposing sides, locate logical fallacies in real arguments, or submit their own essays for structured analysis. It fits debate clubs, IB Theory of Knowledge, AP Government, A-Level Critical Thinking, and any course where evidence-based reasoning matters. Browsing requires no account, so it works in any classroom.",
    linkText: "Lesson plans & educator resources",
    linkHref: "/for-educators",
  },
  {
    question: "What is a logical fallacy?",
    answer: "A logical fallacy is a flaw in reasoning that makes an argument invalid or misleading, even when it sounds persuasive. Fallacies fall into two broad families: formal fallacies, where the structure itself is broken so the conclusion doesn't follow from the premises, and informal fallacies, where the content misleads -- appealing to emotion, attacking the person, or distracting from the real question. Common examples include ad hominem, straw man, false dichotomy, and appeal to authority. Spotting a fallacy doesn't automatically make a conclusion false; it just means that particular argument fails to support it. Argumend's analyzer flags common fallacies in debate text so you can see exactly where the reasoning breaks down.",
    linkText: "Try the argument analyzer",
    linkHref: "/analyze",
  },
  {
    question: "What is an ad hominem fallacy?",
    answer: "An ad hominem fallacy attacks the person making an argument instead of the argument itself. 'You can't trust her research -- she's funded by activists' is ad hominem: it sidesteps the evidence and targets the messenger. The reasoning fails because a claim's truth doesn't depend on who says it. There's a limit, though: questioning a source's reliability or conflicts of interest is legitimate when credibility is genuinely part of the argument. It only becomes a fallacy when the personal attack replaces engagement with the actual claim. The fix is to steel-man the argument and respond to its strongest form.",
    linkText: "Explore our reasoning guides",
    linkHref: "/guides",
  },
  {
    question: "What is a straw man argument?",
    answer: "A straw man argument misrepresents someone's position -- usually by exaggerating or oversimplifying it -- so it's easier to knock down. Instead of engaging the real claim, you attack a distorted version of it, like answering 'we should regulate emissions' with 'so you want to shut down the entire economy?' To avoid building a straw man, do the opposite: steel-man the other side by stating their view in its strongest, most charitable form before you respond. If your opponent wouldn't recognize their own position in your summary, you're arguing with a straw man, not with them.",
    linkText: "Explore our reasoning guides",
    linkHref: "/guides",
  },
  {
    question: "What is a false dichotomy (false dilemma)?",
    answer: "A false dichotomy -- also called a false dilemma -- presents only two options when more actually exist, forcing a choice between extremes. 'Either we ban it completely or we do nothing' ignores the range of middle-ground policies in between. The fallacy works by hiding the real spectrum of possibilities to make one side look inevitable. To counter it, ask whether the two options are genuinely the only ones, or whether the framing is quietly excluding alternatives. Argument maps help by laying out the full range of positions rather than collapsing a debate into two opposing camps.",
  },
  {
    question: "What is the difference between correlation and causation?",
    answer: "Correlation means two things tend to occur together; causation means one actually produces the other. Confusing the two is one of the most common reasoning errors: ice-cream sales and drowning deaths rise together, but neither causes the other -- hot weather drives both. Before claiming causation, check for (1) a plausible mechanism, (2) the right time order (cause before effect), and (3) ruled-out confounders -- hidden third factors influencing both. Randomized controlled trials are the gold standard precisely because they isolate cause from coincidence. Argumend weights evidence partly on how directly it establishes causation rather than mere association.",
    linkText: "Learn about our evidence methodology",
    linkHref: "/methodology",
  },
  {
    question: "What is confirmation bias and how can I overcome it?",
    answer: "Confirmation bias is the tendency to seek out, favor, and remember information that confirms what you already believe, while discounting evidence that challenges it. It's why two people can read the same study and both feel vindicated. You can't eliminate it, but you can counter it: (1) actively look for the strongest evidence against your view; (2) steel-man the opposing position; and (3) decide in advance what evidence would change your mind -- if nothing could, you're rationalizing, not reasoning. Argumend's argument maps are built to surface the best case on every side, so you encounter the evidence you'd naturally skip past.",
    linkText: "Explore our reasoning guides",
    linkHref: "/guides",
  },
  {
    question: "What is the difference between a fact and an opinion?",
    answer: "A fact is a claim that can be checked against evidence and is either true or false regardless of who believes it; an opinion is a judgment, preference, or value that reflects a point of view. 'The Earth's average temperature has risen since 1900' is a factual claim -- measurable and verifiable. 'We should prioritize the economy over emissions' is a value judgment. Many real disagreements blur the two: people argue as if a contested empirical question were already settled, or treat a value choice as an objective fact. Argumend separates the empirical cruxes (which evidence can resolve) from the value questions (which it can't), so you can see which part of a disagreement is actually about facts.",
  },
  {
    question: "How is Argumend different from a fact-checker?",
    answer: "Fact-checkers rate individual statements as true, false, or misleading. Argumend does something different: instead of judging one claim at a time, it maps the whole structure of a disagreement -- the core question, the strongest arguments on each side, the evidence behind them, and the crux that would actually resolve it. A fact-check tells you whether a specific quote is accurate; an argument map shows you why thoughtful people still disagree even when they accept the same facts. The two are complementary -- we focus on the reasoning and the weight of evidence, not just verifying isolated assertions.",
    linkText: "Browse all topics",
    linkHref: "/topics",
  },
  {
    question: "Can I trust Argumend's conclusions?",
    answer: "Trust the process more than any single verdict -- and check it yourself. Every confidence score is traceable to the underlying evidence, each piece weighted on source reliability, independence, replicability, and directness, with the full methodology public. We steel-man every side, including unpopular ones, and route submitted arguments through a multi-model judge council to reduce any single model's bias. We're also explicit about uncertainty: a topic at 55% confidence is us saying the question is genuinely contested, not hiding the ball. The goal isn't to be an authority you defer to -- it's to show you the evidence and reasoning so you can judge for yourself.",
    linkText: "Read our methodology",
    linkHref: "/methodology",
  },
  {
    question: "What is the appeal to authority fallacy?",
    answer: "An appeal to authority fallacy treats a claim as true simply because an authority figure asserts it, without engaging the underlying evidence. 'A famous expert said so, therefore it's true' is the classic form. The reasoning fails because expertise makes a source more credible, not infallible -- and experts are often wrong outside their field or when a question is genuinely contested. The legitimate version is different: citing relevant expert consensus as one input is reasonable, as long as the conclusion ultimately rests on evidence you could examine. The fallacy is substituting the authority for the evidence rather than consulting it.",
    linkText: "Explore our reasoning guides",
    linkHref: "/guides",
  },
  {
    question: "What is whataboutism?",
    answer: "Whataboutism deflects a criticism by pointing to someone else's alleged wrongdoing instead of answering the original charge -- 'but what about what they did?' It's a form of the tu quoque ('you too') fallacy. The move feels like a rebuttal but quietly changes the subject: even if the counter-accusation is true, it does nothing to establish whether the first claim was right or wrong. To counter it, separate the two questions and insist on resolving the original one first. Argument maps help by keeping each claim on its own track, so a disagreement can't be silently swapped for a different one.",
  },
  {
    question: "What is a slippery slope fallacy?",
    answer: "A slippery slope argument claims that one small step will inevitably lead to an extreme outcome, without showing why each link in the chain must follow. 'If we allow this minor exception, total chaos follows' is a slippery slope when no mechanism connects the first step to the last. It isn't always a fallacy -- sometimes a chain of consequences is genuinely well-evidenced -- but it fails when the inevitability is asserted rather than demonstrated. The test: is each step actually likely given the one before it, or is the scary conclusion smuggled in? Argumend evaluates whether the causal chain in such arguments holds up.",
    linkText: "Try the argument analyzer",
    linkHref: "/analyze",
  },
  {
    question: "What is the difference between a valid and a sound argument?",
    answer: "Validity is about structure; soundness is about structure plus truth. An argument is valid if its conclusion follows logically from its premises -- even when those premises are false. 'All cats are robots; my pet is a cat; therefore my pet is a robot' is perfectly valid but not sound, because a premise is untrue. An argument is sound only when it is both valid and built on true premises, which is what makes its conclusion trustworthy. This is why checking that an argument 'flows' isn't enough: you also have to verify that the premises are actually true, not just that the logic connects them.",
  },
  {
    question: "What is the burden of proof in an argument?",
    answer: "The burden of proof is the obligation to support a claim with evidence, and it falls on whoever makes the positive assertion -- not on everyone else to disprove it. If you claim something is true, it's your job to show why; 'you can't prove me wrong' is not evidence in your favor (that's the appeal-to-ignorance fallacy). The further a claim departs from established understanding, the heavier the burden -- the idea behind 'extraordinary claims require extraordinary evidence.' Argumend reflects this by weighting how directly and reliably the evidence supports each position, rather than treating an unrefuted claim as already proven.",
    linkText: "Learn about our evidence methodology",
    linkHref: "/methodology",
  },
  {
    question: "What is the difference between a logical fallacy and a cognitive bias?",
    answer: "A logical fallacy is a flaw in the structure of an argument; a cognitive bias is a flaw in how a mind processes information. A fallacy lives in the argument itself -- a straw man or false dichotomy is there on the page whether or not anyone is fooled. A bias lives in the thinker -- confirmation bias or anchoring shapes which evidence you notice and believe, often with no explicit argument at all. The two interact: biases lead people to produce and accept fallacies. Spotting fallacies improves the arguments you make; recognizing biases improves the judgments you reach. Careful reasoning means guarding against both.",
    linkText: "Explore our reasoning guides",
    linkHref: "/guides",
  },
  {
    question: "What is the difference between deductive and inductive reasoning?",
    answer: "Deductive reasoning moves from general premises to a conclusion that must be true if those premises are -- it guarantees the conclusion but adds no information beyond what the premises already contain. Inductive reasoning moves from specific observations to a broader generalization that is probably, but not certainly, true -- it extends knowledge but can always be overturned by new evidence. Most real-world reasoning, including science, is inductive: we infer general patterns from limited data, which is why conclusions come with confidence levels rather than certainty. Argumend's confidence scores reflect this -- they express how strongly the accumulated evidence supports a claim, not a deductive proof.",
  },
  {
    question: "How do I read an argument map on Argumend?",
    answer: "Each topic opens as an interactive graph. At the center sits the core claim. Around it are the pillars -- the foundational considerations the whole debate rests on -- and branching from those are the supporting and opposing arguments, the evidence behind each, and the crux that would resolve the disagreement. Color signals which side an argument is on and how strongly it's supported, and you can click any node to expand its evidence and reasoning. Read it from the center outward: start with the claim, scan the pillars to see the shape of the debate, then drill into the crux to find where the disagreement actually turns.",
    linkText: "Browse argument maps",
    linkHref: "/topics",
  },
  {
    question: "Are Argumend's topics written by AI or by humans?",
    answer: "Both, with a human in the loop. Curated topics are researched and structured with AI assistance, then reviewed and edited by people before publishing -- the pillars, evidence weighting, and confidence scores are checked against sources rather than generated and left unverified. When you submit your own text, the analysis runs through a multi-model AI judge council automatically. In every case the methodology is transparent and each confidence score traces back to the underlying evidence, so you can evaluate the reasoning yourself rather than taking the output on faith.",
    linkText: "Read our methodology",
    linkHref: "/methodology",
  },
  {
    question: "What is a red herring fallacy?",
    answer: "A red herring is an irrelevant point introduced to divert attention from the real issue. Instead of answering the argument on the table, the speaker raises a different, often emotionally charged topic so the original question quietly gets dropped -- 'Why worry about the budget when crime is so high?' The distraction can be true and still be a fallacy, because its truth does nothing to settle the question actually being debated. To counter a red herring, name the switch and return to the original claim. Argument maps help by keeping each question on its own track, so a debate can't be silently steered onto a side issue.",
    linkText: "Try the argument analyzer",
    linkHref: "/analyze",
  },
  {
    question: "What is circular reasoning (begging the question)?",
    answer: "Circular reasoning -- also called begging the question -- happens when an argument assumes the very thing it is trying to prove, so the conclusion is smuggled into the premises. 'The policy is the right choice because it's the correct thing to do' sounds like an argument but never supplies independent support; it just restates the claim in different words. The tell is that you'd have to already accept the conclusion to accept the premise. A non-circular argument rests on evidence that someone who disagrees could, in principle, check for themselves. Argumend looks for whether each position is backed by independent evidence rather than a restatement of itself.",
    linkText: "Explore our reasoning guides",
    linkHref: "/guides",
  },
  {
    question: "What is cherry-picking and how does it distort an argument?",
    answer: "Cherry-picking is selecting only the evidence that supports your conclusion while ignoring the data that cuts against it. A single supportive study, one favorable statistic, or a handful of anecdotes can make almost any claim look airtight if you hide everything else. It's deceptive precisely because each cited fact may be true -- the distortion lives in what's left out. The antidote is to weigh the full body of evidence, including the strongest findings against your view, and to ask whether a claim survives once the whole picture is in. Argumend's confidence scores are built on the balance of supporting and opposing evidence for exactly this reason.",
    linkText: "Learn about our evidence methodology",
    linkHref: "/methodology",
  },
  {
    question: "What is the principle of charity?",
    answer: "The principle of charity is the habit of interpreting someone's argument in its most reasonable form before you respond -- assuming they're rational, resolving ambiguity in their favor, and not attributing an obviously foolish view if a sensible one fits. It's the mindset behind steel-manning: you engage the best version of a position rather than the easiest to attack. Charity isn't about being nice; it's about being accurate. If you defeat only a weak misreading, you've learned nothing about whether the real argument holds. Argumend applies this by steel-manning every side of a topic, including unpopular ones, so disagreements are tested at their strongest.",
    linkText: "Explore our reasoning guides",
    linkHref: "/guides",
  },
  {
    question: "Why is anecdotal evidence considered weak?",
    answer: "Anecdotal evidence -- a personal story or single striking case -- feels persuasive but is statistically weak because it isn't representative. One person who thrived after a treatment tells you nothing about how it performs across thousands, and vivid stories stick in memory far more than the dry averages that actually settle a question. Anecdotes are also prone to selection: we hear the dramatic cases, not the silent typical ones. They can be useful for generating hypotheses or illustrating a point, but they can't establish a general claim on their own. Argumend weights evidence partly on replicability and directness, which is why systematic data outranks a memorable story.",
    linkText: "Learn about our evidence methodology",
    linkHref: "/methodology",
  },
  {
    question: "What is motivated reasoning?",
    answer: "Motivated reasoning is when your desire for a particular conclusion shapes how you evaluate evidence -- you scrutinize inconvenient findings far harder than convenient ones and reach the answer you wanted while feeling perfectly objective. It overlaps with confirmation bias but is broader: confirmation bias is about what information you notice, while motivated reasoning is about the goal driving the whole process, whether that's protecting an identity, a group loyalty, or a prior commitment. The check is to ask honestly, 'Would I accept this same quality of evidence if it pointed the other way?' Argument maps help by laying out the strongest case on every side, so the evidence you'd rather skip is put in front of you.",
    linkText: "Explore our reasoning guides",
    linkHref: "/guides",
  },
  {
    question: "What is a false equivalence?",
    answer: "A false equivalence treats two things as comparable when the relevant differences between them are large -- equating a minor lapse with a major one, or 'both sides' of an issue where the evidence is lopsided. It often hides behind a surface symmetry ('they both made mistakes') while ignoring scale, intent, or how well each side is actually supported. The fallacy matters because it can manufacture a fake balance, making a well-evidenced position look no stronger than a weak one. To spot it, ask whether the two cases really are alike on the dimension that counts. Argumend resists false balance by tracking the actual weight of evidence rather than giving every side equal footing by default.",
  },
  {
    question: "What is Occam's razor and when does it apply?",
    answer: "Occam's razor is the principle that, among competing explanations that fit the evidence equally well, you should prefer the one making the fewest assumptions. It's a guide, not a law: the simplest explanation isn't automatically true, and sometimes reality is genuinely complicated. The razor only does work when explanations actually account for the same facts -- it favors the leaner one as a starting point, while remaining open to a more complex account if the evidence demands it. Misused, it becomes an excuse to dismiss inconvenient detail. Used well, it keeps you from multiplying unsupported entities -- conspiracies, hidden causes, extra mechanisms -- when a plainer account already explains what we observe.",
  },
  {
    question: "What is the difference between an argument map and a mind map?",
    answer: "A mind map organizes information -- it branches a central topic into related ideas, notes, and associations to help you brainstorm or remember. An argument map does something stricter: it shows the logical structure of a case, distinguishing claims from the evidence and reasons that support or oppose them, so you can see whether a conclusion actually holds. A mind map answers 'what's related to this topic?'; an argument map answers 'does this claim stand up, and where exactly does the disagreement turn?' Argumend builds argument maps -- core claim, pillars, evidence, and crux -- because the goal is to evaluate reasoning, not just to catalog ideas.",
    linkText: "Browse argument maps",
    linkHref: "/topics",
  },
  {
    question: "What is the difference between confidence and consensus?",
    answer: "Consensus is how many people -- or experts -- agree on a claim; confidence is how strongly the evidence supports it. They often move together, but not always: a near-unanimous view can rest on weak evidence, and a genuinely strong case can still be unpopular. Argumend's confidence scores track the weight and quality of evidence, not a headcount of who believes what. Expert consensus does count as one input -- it signals that informed people have already weighed the evidence -- but it never substitutes for the evidence itself. When a topic scores as settled, it is because the evidence is overwhelming, not merely because most people say so.",
    linkText: "How confidence scores work",
    linkHref: "/concepts/confidence-calibration",
  },
  {
    question: "What is a pillar in an argument map?",
    answer: "A pillar is one of the major axes a disagreement turns on -- a foundational line of argument the broader question rests on. Each Argumend topic is built around three pillars, and every pillar holds the strongest case for the claim, the strongest case against it (both steel-manned), the evidence behind each, and the crux that would resolve that particular strand. Thinking in pillars stops a debate from collapsing into one big yes-or-no fight: you can see that two people might agree on two pillars and disagree sharply on the third, which is usually where the real argument lives.",
    linkText: "Understanding pillars",
    linkHref: "/concepts/pillars",
  },
  {
    question: "How is Argumend different from ChatGPT or an AI chatbot?",
    answer: "Ask a chatbot a contested question and it hands you one fluent answer -- you can't see what it weighed, what it left out, or how sure it should be. Argumend does the opposite: it lays out the structure of the disagreement -- the core claim, the strongest case on each side, the evidence behind them, and the crux that would settle it -- so you can judge for yourself. We do use AI, including a multi-model judge council for text you submit, but every confidence score traces back to weighted evidence and the full methodology is public. The goal isn't to be an oracle you trust; it's to expose the reasoning a single chatbot answer hides.",
    linkText: "How Argumend works",
    linkHref: "/how-it-works",
  },
  {
    question: "What is the Gish gallop?",
    answer: "The Gish gallop is a debate tactic of burying your opponent under a rapid flood of claims -- so many that none can be checked or rebutted in the time available -- so the sheer volume gets mistaken for strength. It is named after a debater known for the technique. The trap is that answering takes far longer than asserting, so the galloper always appears to have 'more' arguments. The cure is to reject the premise that quantity equals quality: ignore the count, isolate the one or two load-bearing claims, and examine those, since a hundred weak assertions don't add up to a single strong one.",
    linkText: "See the Gish gallop fallacy",
    linkHref: "/fallacies/gish-gallop",
  },
  {
    question: "What is the motte-and-bailey fallacy?",
    answer: "Motte-and-bailey is a tactic of defending a bold, contestable claim (the 'bailey') by retreating, when challenged, to a modest claim almost no one disputes (the 'motte') -- then quietly returning to the bold claim once the pressure is off. The name comes from a medieval castle: the exposed courtyard you actually want, and the easily defended tower you flee to under attack. It works by blurring two different claims into one, so the arguer enjoys the appeal of the strong version with the defensibility of the weak one. To counter it, ask the person to commit to a single claim and defend exactly that.",
    linkText: "See the motte-and-bailey fallacy",
    linkHref: "/fallacies/motte-and-bailey",
  },
  {
    question: "What is the sunk cost fallacy?",
    answer: "The sunk cost fallacy is continuing something -- a project, a policy, an investment -- because of what you have already spent rather than what it will yield from here on. Money, time, and effort already gone are 'sunk': they can't be recovered, so they shouldn't weigh in a forward-looking decision, yet they powerfully do. 'We've come too far to stop now' is the classic tell. A sound decision asks only whether the future benefits exceed the future costs, ignoring the past entirely. It distorts debates when people defend a failing commitment by pointing at the cost of abandoning it, which is a feeling, not a reason.",
    linkText: "See the sunk cost fallacy",
    linkHref: "/fallacies/sunk-cost",
  },
  {
    question: "What is a hasty generalization?",
    answer: "A hasty generalization draws a broad conclusion from a sample too small, biased, or unrepresentative to support it -- 'I met two rude people from that city, so everyone there is rude.' The reasoning fails because a handful of cases, however vivid, can't establish a pattern across a whole population. It is the engine behind most stereotypes and a close cousin of leaning on anecdotes. The fix is to ask how large and how representative the evidence really is before generalizing, and to prefer systematic data over a few memorable examples. Argumend weights evidence partly on replicability for exactly this reason.",
    linkText: "See the hasty generalization fallacy",
    linkHref: "/fallacies/hasty-generalization",
  },
  {
    question: "What is the fallacy fallacy?",
    answer: "The fallacy fallacy -- also called the argument from fallacy -- is concluding that a claim must be false simply because the argument made for it contains a fallacy. But a bad argument for a true claim doesn't make the claim untrue; it only means that particular argument fails to support it. Someone can defend a correct conclusion with a sloppy appeal to authority, and the conclusion can still be right for other reasons. Spotting a fallacy tells you to set that argument aside and look for better evidence, not to flip to the opposite belief. Treating 'your argument is flawed' as 'you are wrong' is itself a reasoning error.",
    linkText: "Improve your reasoning",
    linkHref: "/guides",
  },
  {
    question: "What is the difference between skepticism and denialism?",
    answer: "Healthy skepticism and denialism both begin by doubting a claim, but they behave differently when evidence arrives. A skeptic withholds judgment until the evidence is in, states what would change their mind, and updates when it does. A denier has already fixed the conclusion and moves the goalposts to protect it -- no amount of evidence is ever quite enough, and the demands escalate whenever the previous ones are met. The tell is falsifiability: ask 'what specific finding would change your view?' A skeptic can answer; a denier either can't or keeps changing the answer. Argumend is built around that question on every topic.",
    linkText: "Read our methodology",
    linkHref: "/methodology",
  },
  {
    question: "How do I win an argument?",
    answer: "The honest answer is to stop trying to win and start trying to find out who is right -- including the possibility that it isn't you. People dig in when they feel attacked and open up when they feel understood, so the most persuasive moves are counterintuitive: steel-man their view before you respond, find the crux (the specific evidence that would change either mind), and treat changing your own position as a success rather than a defeat. 'Winning' a shouting match convinces no one and teaches you nothing. Resolving the crux -- or discovering the disagreement is about values, not facts -- is the only outcome worth having.",
    linkText: "Improve your reasoning",
    linkHref: "/guides",
  },
];
