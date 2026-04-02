# Source Log

## Repository Sources
- `README.md`
- `app/page.tsx`
- `app/how-it-works/page.tsx`
- `app/about/page.tsx`
- `app/methodology/page.tsx`
- `app/analyze/page.tsx`
- `app/research/page.tsx`
- `app/community/page.tsx`
- `components/DebateView.tsx`
- `components/JudgingResults.tsx`
- `hooks/useLogicGraph.ts`
- `data/logicBlueprint.ts`
- `data/topics.ts`
- `data/research.ts`
- `data/concepts.ts`
- `lib/analyze/extractor.ts`
- `lib/judge/rubric.ts`
- `lib/judge/council.ts`
- `lib/judge/prompts.ts`
- `lib/agents/executor.ts`
- `lib/db/schema.ts`
- `lib/db/queries.ts`
- `docs/judge-council-architecture.md`
- `docs/plans/2026-01-17-perspectives-page-design.md`
- `docs/plans/2026-01-26-scales-of-evidence-design.md`

## External Sources

### Philosophy and Normative Frameworks
1. Stanford Encyclopedia of Philosophy — Jürgen Habermas
   - https://plato.stanford.edu/entries/habermas/
   - Used for communicative action, discourse legitimacy, claim-validity framing.

2. Internet Encyclopedia of Philosophy — Jürgen Habermas
   - https://iep.utm.edu/jurgen-habermas/
   - Used for concise articulation of validity claims (truth, rightness, sincerity).

3. John Stuart Mill, *On Liberty* (Project Gutenberg)
   - https://www.gutenberg.org/files/34901/34901-h/34901-h.htm
   - Used for viewpoint contestation principle and anti-dogmatism design constraint.

4. SEP — John Rawls
   - https://plato.stanford.edu/entries/rawls/
   - Used for public reason and reciprocity requirements.

5. SEP — John Dewey’s Political Philosophy
   - https://plato.stanford.edu/entries/dewey-political/
   - Used for democracy-as-inquiry institutional framing.

6. SEP — Hannah Arendt
   - https://plato.stanford.edu/entries/arendt/
   - Used for plurality and non-consensus legitimacy.

7. SEP — Martin Buber
   - https://plato.stanford.edu/entries/buber/
   - Used for relation quality (I-Thou vs I-It) as bridge prerequisite.

8. SEP — Aristotle’s Rhetoric
   - https://plato.stanford.edu/entries/aristotle-rhetoric/
   - Used for ethos/pathos/logos balance and rhetoric governance.

### Deliberation, Polarization, and Bridge Interventions
9. APSR (2021) — Is Deliberation an Antidote to Extreme Partisan Polarization?
   - https://www.cambridge.org/core/journals/american-political-science-review/article/is-deliberation-an-antidote-to-extreme-partisan-polarization-reflections-on-america-in-one-room/AE30A9E4B0609B53B4A1D2D0B6E8D0FC
   - Used for structured deliberation impact assumptions.

10. APSR (2024) — Can Deliberation Have Lasting Effects in Deeply Divided Polities?
    - https://www.cambridge.org/core/journals/american-political-science-review/article/can-deliberation-have-lasting-effects-in-deeply-divided-polities-evidence-from-america-in-one-room/5FC11C2D2EC9D58C1991874F8F3A91D0
    - Used for durability claims and repeated/structured engagement importance.

11. Nature Human Behaviour (2023) — Interventions reducing affective polarization do not improve anti-democratic attitudes
    - https://www.nature.com/articles/s41562-023-01697-4
    - Used for realism: reducing animosity alone may not shift anti-democratic beliefs.

12. Science (2016) via PubMed — Durably reducing transphobia: A field experiment on door-to-door canvassing
    - https://pubmed.ncbi.nlm.nih.gov/27325708/
    - Used for evidence that brief empathic conversations can have durable effects in some settings.

13. Psychological Science (2015) via PubMed — From gulf to bridge: moral arguments can facilitate political influence
    - https://pubmed.ncbi.nlm.nih.gov/26348667/
    - Used for moral reframing feature rationale.

14. Scientific Reports (2022) via PubMed — Cross-partisan empathy predicts cross-partisan interactions and support for depolarization interventions
    - https://pubmed.ncbi.nlm.nih.gov/35507538/
    - Used for empathy utility and willingness-to-engage signals.

15. Nature Communications (2021) via PubMed — Wise reasoning facilitates constructive responses to political conflicts
    - https://pubmed.ncbi.nlm.nih.gov/34759055/
    - Used for reflective/wise reasoning prompt design.

16. Human Communication Research (2025) — Intellectual humility and communication in a polarized age
    - https://academic.oup.com/hcr/article/51/2/hqaf007/8102105
    - Used for humility framing and engagement-quality interventions.

### Argument Quality and Mapping
17. OUP chapter — Reason!able: Improving thinking through argument mapping
    - https://academic.oup.com/edited-volume/28118/chapter-abstract/212281463
    - Used for argument-mapping pedagogy value.

18. Teaching Philosophy (2004) — Argument maps improve critical thinking?
    - https://www.pdcnet.org/teachphil/content/teachphil_2004_0027_0002_0095_0116
    - Used for educational efficacy of argument mapping.

19. Thinking Skills and Creativity (2021) — Argument map as a thinking tool to improve students’ argumentation
    - https://www.sciencedirect.com/science/article/pii/S1871187121000669
    - Used for modern evidence on argument-map learning outcomes.

### AI Evaluation Reliability
20. Zheng et al. (2023), arXiv — Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena
    - https://arxiv.org/abs/2306.05685
    - Used for single-judge bias risks and council-evaluation rationale.

### Polarization Baseline Context
21. Pew Research (2019) — Partisan Antipathy: More Intense, More Personal
    - https://www.pewresearch.org/politics/2019/10/10/partisan-antipathy-more-intense-more-personal/

22. Pew Research (2022) — As Partisan Hostility Grows...
    - https://www.pewresearch.org/politics/2022/08/09/as-partisan-hostility-grows-signs-of-frustration-with-the-two-party-system/

