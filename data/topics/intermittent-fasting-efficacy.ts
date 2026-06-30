import type { Topic } from "@/lib/schemas/topic";

export const intermittentFastingEfficacyData = {
  id: "intermittent-fasting-efficacy",
  title: "Does Intermittent Fasting Work?",
  meta_claim:
    "Intermittent fasting produces meaningfully better weight and metabolic outcomes than plain calorie restriction",
  status: "contested" as const,
  category: "science" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "When researchers actually matched the calories, the magic mostly disappeared: in the JAMA Internal Medicine TREAT trial, a 16:8 eating window produced just a 1.17% weight loss versus 0.75% for a control group — a difference that was not statistically significant — and about 65% of what the fasters lost was lean muscle, not fat. The honest nuance: a few well-controlled trials still find metabolic improvements (insulin sensitivity, glycemic control) that look at least partly independent of weight, and some real-world studies find fasting easier to stick to.",
    confidence: 78,
    source:
      "Lowe et al., 'The TREAT Randomized Clinical Trial,' JAMA Internal Medicine (2020)",
    sourceUrl:
      "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2771095",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "The intuitive pitch is that the body does something special during the fasting window — burning fat, resetting metabolism — so the same calories eaten in 8 hours should beat those calories spread over 14; and indeed several trials report real improvements in insulin sensitivity and blood-sugar control.",
    "But the most rigorous head-to-head trials keep landing on the same answer: once you match total calories, time-restricted eating loses about the same weight as ordinary daily calorie restriction — the 2022 NEJM trial in China found 8 kg versus 6.3 kg (not significant), and a 2024 meta-analysis of 20 isocaloric trials found no metabolic advantage at all.",
    "So the real debate isn't whether fasting 'works' — almost any method that cuts calories works — but whether the eating window itself adds anything beyond being a convenient calorie-cutting trick for some people, and whether a handful of weight-independent metabolic signals are real or statistical noise.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Weight Loss — Window vs. Calories
    // =========================================================================
    {
      id: "weight-loss-window-vs-calories",
      title: "Weight Loss: Window vs. Calories",
      short_summary:
        "Does the eating window itself drive weight loss, or is intermittent fasting just a roundabout way to eat fewer calories? The most rigorous trials that match or control calories find time-restricted eating loses about the same weight as plain daily calorie restriction. Proponents counter that real-world fasting often lowers intake automatically and that a 2025 trial of 4:3 fasting beat daily dieting at one year.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Strip away the marketing and intermittent fasting is just calorie restriction with extra steps. In the TREAT trial (JAMA Internal Medicine, 2020), 116 adults assigned to a 16:8 window lost only 1.17% of body weight versus 0.75% in a consistent-meal-timing control — a gap that was not statistically significant (P=.43). The 2022 NEJM trial in China (Liu et al., 139 patients, 12 months) gave both groups the same ~25% calorie cut: the time-restricted arm lost 8 kg and the unrestricted-timing arm lost 6.3 kg, a difference of just 1.8 kg that did not reach significance (P=.11). Trepanowski's year-long JAMA Internal Medicine trial found alternate-day fasting no better than daily restriction — and harder to stick to, with a 38% dropout versus 29%. A 2024 meta-analysis of 20 isocaloric RCTs concluded flatly that fasting offers no advantage once calories are equalized. The mechanism is mundane: a shorter window simply makes it harder to overeat.",
      proponent_rebuttal:
        "The 'just calories' framing understates two things fasting actually delivers in practice. First, in free-living conditions a narrow window often cuts intake spontaneously, without conscious counting — which is exactly why it appeals to people who hate logging food. Second, the newest and longest evidence is more favorable: Catenacci's 2025 Annals of Internal Medicine trial randomized 165 adults to either 4:3 intermittent fasting or daily calorie restriction within a behavioral program, and at 12 months the fasting group lost significantly more (−7.7 kg vs −4.8 kg, P=.04), with higher rates of clinically meaningful (≥5% and ≥10%) loss and better self-reported adherence. Even where weight outcomes tie, that is itself a useful result: fasting is one more effective tool, and 'as good as the standard, but easier for some people to follow' is a genuine clinical win, not a debunking.",
      crux: {
        id: "isocaloric-head-to-head",
        title: "The Calorie-Matched Head-to-Head Test",
        description:
          "Whether time-restricted or intermittent eating produces more weight or fat loss than continuous calorie restriction when total energy intake is held equal. If matched-calorie trials consistently show no difference, then fasting's benefits are entirely a function of eating less. If fasting wins even when calories are equalized — via metabolic effects, better fat-vs-lean partitioning, or genuinely higher real-world adherence — then the timing matters in its own right.",
        methodology:
          "Pool individually randomized, calorie-matched trials lasting 6-12 months that compare an intermittent-fasting protocol (16:8, 5:2, alternate-day, or 4:3) against continuous daily calorie restriction, with both arms prescribed identical energy targets and supervised intake or rigorous food logging. Measure body weight, DXA-derived fat mass and lean mass, and dropout/adherence as a co-primary outcome. Use intention-to-treat analysis and pre-register the equivalence margin so that a true null (no meaningful difference) is distinguishable from an underpowered failure to detect one.",
        verification_status: "verified" as const,
        cost_to_verify:
          "$2-5M (Multiple supervised, calorie-controlled RCTs with DXA body composition — several already completed)",
        falsification: {
          supporter_flip:
            "If a series of well-powered, calorie-matched trials with DXA body composition showed no weight or fat-loss advantage for fasting — and the real-world-adherence edge failed to replicate — the case for the window 'doing something extra' would collapse to 'just a calorie-cutting tactic.'",
          skeptic_flip:
            "A skeptic who says it's only calories should weigh that the longest trial (Catenacci 2025, 4:3 vs daily restriction) found significantly more weight loss and better adherence at 12 months — so if that result replicates in calorie-matched designs, real-world advantages would be hard to dismiss.",
          common_ground:
            "Both sides agree that any method which sustainably lowers total calories produces weight loss, and that adherence is the dominant predictor of long-term success.",
          live_disagreement:
            "Whether fasting wins on hard endpoints once calories are matched, or only appears to win because a short window makes under-eating easier for some people — which only pre-registered, calorie-controlled trials can settle.",
        },
      },
      evidence: [
        {
          id: "treat-no-difference",
          title:
            "TREAT Trial: 16:8 Eating Lost No More Weight Than Controls, and Lost Muscle",
          description:
            "The TREAT randomized clinical trial (Lowe et al., JAMA Internal Medicine, 2020) assigned 116 adults with overweight or obesity to either a 16:8 time-restricted window (eating noon-8 pm) or three structured meals per day, with no calorie or macronutrient prescription. The time-restricted group lost 1.17% of body weight versus 0.75% in controls — a difference that was not statistically significant (P=.43). More strikingly, roughly 65% of the weight lost in the fasting group was appendicular lean mass rather than fat, a significantly greater muscle loss than controls (appendicular lean mass index difference −0.16 kg/m², P=.005), raising a safety concern that fasting may erode muscle.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 9,
          },
          source: "Lowe et al., JAMA Internal Medicine (2020)",
          sourceUrl:
            "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2771095",
          reasoning:
            "Published in a top-tier journal as a prospective RCT with objective DXA body composition. Directly tests whether the window alone produces weight loss without calorie instructions, and finds it does not. The lean-mass finding has been debated (the trial lacked dietary intake verification and was not the largest), slightly lowering replicability, but the headline null result is widely cited and has held up.",
        },
        {
          id: "nejm-liu-calorie-matched",
          title:
            "NEJM 12-Month Trial: Matched Calories Erased Fasting's Edge",
          description:
            "Liu et al. (New England Journal of Medicine, 2022) randomized 139 adults with obesity in Guangzhou, China, to a calorie-restricted diet (1,500-1,800 kcal for men, 1,200-1,500 for women) eaten either within an 8-hour window (8 am-4 pm) or at any time, for 12 months. Both groups cut to roughly 75% of usual intake. The time-restricted group lost 8.0 kg and the calorie-restriction-only group lost 6.3 kg — a 1.8 kg difference that was not statistically significant (P=.11) — with no significant differences in body fat, waist circumference, blood pressure, glucose, or lipids. The authors concluded time-restricted eating is not more beneficial than daily calorie restriction.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "Liu et al., New England Journal of Medicine (2022)",
          sourceUrl: "https://www.nejm.org/doi/full/10.1056/NEJMoa2114833",
          reasoning:
            "A well-powered, year-long RCT in NEJM that explicitly matched calorie targets across arms — the cleanest test of whether the window adds anything. Both arms lost substantial weight; the absence of a significant between-group difference directly supports the 'it's the calories' position. High directness; replicability strong as it converges with TREAT and the isocaloric meta-analysis.",
        },
        {
          id: "catenacci-4-3-fasting",
          title:
            "2025 Annals Trial: 4:3 Fasting Beat Daily Dieting at One Year",
          description:
            "Catenacci et al. (Annals of Internal Medicine, 2025) randomized 165 adults with overweight or obesity to 4:3 intermittent fasting (≈80% calorie restriction on 3 nonconsecutive days per week, ad libitum the other 4) or daily calorie restriction, both embedded in a comprehensive 12-month behavioral weight-loss program. At 12 months the fasting group lost significantly more weight (−7.7 kg vs −4.8 kg; P=.04), achieved higher rates of ≥5% and ≥10% weight loss, and reported better adherence at 6 and 12 months. The regimen was well tolerated.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 9,
          },
          source: "Catenacci et al., Annals of Internal Medicine (2025)",
          sourceUrl: "https://www.acpjournals.org/doi/10.7326/ANNALS-24-01631",
          reasoning:
            "A recent, well-conducted 12-month RCT in a leading journal — currently the strongest direct evidence that a fasting protocol can outperform daily restriction over a clinically relevant horizon. Replicability is rated lower because it is a single trial of one specific 4:3 protocol within an intensive support program; whether the advantage is the fasting pattern itself or the structure/adherence it encouraged is unresolved, which is exactly the live crux.",
        },
        {
          id: "isocaloric-meta-analysis",
          title:
            "Meta-Analysis of 20 Isocaloric RCTs: No Advantage Once Calories Matched",
          description:
            "A 2024 systematic review and meta-analysis in Nutrition, Metabolism and Cardiovascular Diseases pooled 20 randomized controlled trials comparing isocaloric intermittent fasting against continuous calorie restriction in adults. It concluded that when total caloric intake is equalized, intermittent fasting is not superior to calorie restriction for weight loss or other health outcomes — the benefits attributed to fasting are calorie-restriction dependent.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "Hamsho et al., 'Is isocaloric intermittent fasting superior to calorie restriction? A systematic review and meta-analysis of RCTs,' Nutrition, Metabolism and Cardiovascular Diseases (2024)",
          sourceUrl:
            "https://www.nmcd-journal.com/article/S0939-4753(24)00439-3/fulltext",
          reasoning:
            "A meta-analysis aggregating 20 RCTs gives the broadest, most replication-weighted view and specifically isolates the isocaloric comparison. It strongly supports the position that fasting's effects flow through calorie reduction. Directness is high; the main caveat is that pooled isocaloric trials by design cannot capture any real-world adherence advantage that emerges when people aren't told exactly how much to eat.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Metabolic Effects Beyond Weight
    // =========================================================================
    {
      id: "metabolic-effects-beyond-weight",
      title: "Metabolic Effects Beyond Weight",
      short_summary:
        "Even if fasting doesn't beat calorie cutting on the scale, does the timing improve insulin sensitivity, blood sugar, or blood pressure independently of weight? A few tightly controlled feeding studies say yes; larger pragmatic trials matching calories say the metabolic gains track with the weight lost. The question is whether circadian-aligned eating has its own metabolic signature or whether the signal is small and inconsistent.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "The claim that fasting reshapes metabolism beyond weight loss rests on small, short studies that struggle to replicate at scale. When trials match calories and run long enough — the NEJM 2022 trial, the 2024 isocaloric meta-analysis — the supposed weight-independent benefits in glucose, lipids, and blood pressure largely vanish or shrink to clinical irrelevance. The famous early-time-restricted-feeding result (Sutton 2018) enrolled only 8 men with prediabetes for 5 weeks in a crossover; effects that fragile are exactly what fails to hold up. And even where a metabolic marker moves, it usually tracks the modest weight that was lost. Worse, a 2024 NHANES analysis presented at the American Heart Association linked an 8-hour eating window to a 91% higher risk of cardiovascular death — hardly the profile of a metabolically protective practice.",
      proponent_rebuttal:
        "The strongest evidence here is mechanistic, not pragmatic. Sutton's 2018 Cell Metabolism trial was a supervised, weight-maintaining, isocaloric crossover — participants were fed enough to hold weight steady and meals were matched between arms — and early time-restricted feeding (a 6-hour window with dinner before 3 pm) still improved insulin sensitivity, beta-cell responsiveness, blood pressure, and oxidative stress with no weight change at all. That design specifically rules out the 'it's just the weight' explanation. The TIMET trial (Annals of Internal Medicine, 2024), with 108 completers on top of standard care, found a modest but statistically significant HbA1c improvement (−0.10%) over three months in people with metabolic syndrome. The AHA cardiovascular-death figure comes from a preliminary conference abstract using self-reported, single-day diet recall in an observational cohort — it cannot establish causation and the people eating in short windows were likely sicker to begin with. Timing aligned to circadian biology plausibly matters; the question is how much.",
      crux: {
        id: "weight-independent-metabolic-signal",
        title: "The Weight-Clamped Metabolic Test",
        description:
          "Whether time-restricted eating improves metabolic markers (insulin sensitivity, glycemic control, blood pressure) when body weight is held constant. If supervised, weight-stable feeding studies reliably show metabolic gains under matched calories, then circadian eating has a genuine weight-independent effect. If those gains disappear or fail to replicate when weight is clamped and samples are larger, the metabolic story is really just a weight-loss story in disguise.",
        methodology:
          "Run supervised, fully controlled feeding trials in which participants are provided all meals at fixed total energy designed to keep body weight stable, randomized (or crossed over) between an early/short eating window and a spread-out window with identical food. Measure insulin sensitivity by gold-standard hyperinsulinemic-euglycemic clamp, continuous glucose monitoring, 24-hour ambulatory blood pressure, and lipids, with adequate sample sizes and pre-registration. Replicate across multiple sites and populations (prediabetic, metabolic syndrome, healthy) to test robustness.",
        equation:
          "\\Delta\\text{Metabolic}_{\\text{TRE}} - \\Delta\\text{Metabolic}_{\\text{control}} \\;\\big|\\; \\Delta\\text{Weight} = 0",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$3-8M (Multi-site supervised feeding trials with clamp-based insulin-sensitivity measurement)",
        falsification: {
          supporter_flip:
            "If larger, weight-clamped feeding trials using gold-standard clamps failed to reproduce Sutton's insulin-sensitivity and blood-pressure gains, the weight-independent metabolic claim would have to be abandoned in favor of 'the markers just follow the weight.'",
          skeptic_flip:
            "A skeptic who says metabolism is downstream of weight should weigh that Sutton 2018 held weight constant by design and still improved insulin sensitivity and blood pressure — so if that replicates at scale, a genuine timing effect would be hard to deny.",
          common_ground:
            "Both sides agree that most metabolic markers improve when people lose weight, and that the early small trials need replication in larger, weight-stable samples.",
          live_disagreement:
            "Whether circadian-aligned eating carries a real metabolic benefit when weight is held fixed, or whether the apparent signal is small-sample noise that dissolves in matched-calorie, weight-stable designs.",
        },
      },
      evidence: [
        {
          id: "sutton-etrf-weight-independent",
          title:
            "Sutton 2018: Early Time-Restricted Feeding Improved Insulin Sensitivity Without Weight Loss",
          description:
            "Sutton et al. (Cell Metabolism, 2018) ran the first supervised, weight-maintaining feeding trial of early time-restricted feeding (eTRF): men with prediabetes ate the same food either within a 6-hour window (finishing dinner before 3 pm) or across a 12-hour window for 5 weeks, in randomized crossover order, with intake matched meal-by-meal and calories set to keep weight stable. eTRF improved insulin sensitivity, beta-cell responsiveness, blood pressure, and oxidative stress — and reduced appetite — with no change in body weight, demonstrating in humans that fasting's metabolic effects are not solely a consequence of weight loss.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 9,
          },
          source: "Sutton et al., Cell Metabolism (2018)",
          sourceUrl:
            "https://www.cell.com/cell-metabolism/fulltext/S1550-4131(18)30253-5",
          reasoning:
            "Methodologically the gold standard for isolating timing from weight: supervised, isocaloric, weight-clamped crossover. Directly supports a weight-independent metabolic effect. Replicability is the weakness — only 8 participants over 5 weeks — so while the design is rigorous, the result urgently needs replication at scale, which is precisely the crux.",
        },
        {
          id: "timet-hba1c",
          title:
            "TIMET Trial: Modest but Significant HbA1c Improvement in Metabolic Syndrome",
          description:
            "The TIMET trial (Annals of Internal Medicine, 2024), conducted by UC San Diego and the Salk Institute, randomized adults with metabolic syndrome and prediabetes to standard-of-care nutritional counseling alone or combined with a personalized 8-to-10-hour time-restricted eating window for 3 months; 108 participants (89% of those randomized) completed the study. On top of standard care and existing medications, time-restricted eating improved HbA1c by −0.10% (95% CI −0.19% to −0.003%), a small but statistically significant glycemic gain, with no major adverse events.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source:
            "Manoogian, Panda et al., 'Time-Restricted Eating in Adults With Metabolic Syndrome,' Annals of Internal Medicine (2024)",
          sourceUrl: "https://www.acpjournals.org/doi/10.7326/M24-0859",
          reasoning:
            "A solid RCT in a leading journal showing a real, if modest, glycemic benefit layered on top of standard care. Directness is moderate because the effect size (−0.10% HbA1c) is small and clinically borderline, and the trial did not fully disentangle the contribution of the slight weight change from the timing itself.",
        },
        {
          id: "isocaloric-meta-metabolic",
          title:
            "Isocaloric Meta-Analysis: Metabolic Gains Track Calories, Not Timing",
          description:
            "The same 2024 meta-analysis of 20 isocaloric RCTs that examined weight also assessed cardiometabolic markers. It found that, with total calories equalized, intermittent fasting conferred no additional benefit over continuous calorie restriction on glucose, insulin, lipids, or blood pressure — the metabolic improvements observed with fasting were attributable to the calorie reduction it produced rather than to meal timing.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "Nutrition, Metabolism and Cardiovascular Diseases meta-analysis of isocaloric IF vs CR (2024)",
          sourceUrl:
            "https://www.nmcd-journal.com/article/S0939-4753(24)00439-3/fulltext",
          reasoning:
            "Pooling 20 isocaloric trials gives strong, replication-weighted evidence that the metabolic signal mostly disappears once calories are matched. High directness and replicability. The counterpoint is that pooled pragmatic trials are less able to detect a clean circadian effect than a tightly supervised weight-clamped design like Sutton's.",
        },
        {
          id: "aha-cardiovascular-death-signal",
          title:
            "AHA 2024: Observational Data Linked 8-Hour Eating to Higher Cardiovascular Death",
          description:
            "A preliminary study presented at the American Heart Association's Epidemiology and Prevention Scientific Sessions in March 2024 analyzed dietary patterns from ~20,000 US adults in NHANES (2003-2018) against death records. People who reported eating within an 8-hour window had a 91% higher risk of cardiovascular death compared with those eating across 12-16 hours. The finding was based on self-reported single-day diet recalls in an observational cohort, was not peer-reviewed at presentation, and could not establish causation — short-window eaters may have been sicker, eating less due to illness rather than choice.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 7,
            replicability: 3,
            directness: 6,
          },
          source:
            "American Heart Association EPI|Lifestyle Scientific Sessions 2024, Abstract P192 (preliminary)",
          sourceUrl:
            "https://newsroom.heart.org/news/8-hour-time-restricted-eating-linked-to-a-91-higher-risk-of-cardiovascular-death",
          reasoning:
            "Included to steel-man the safety concern, but weighted low: it is a conference abstract, not peer-reviewed, relying on a single day of self-reported diet to classify long-term behavior, with heavy confounding (reverse causation, illness). It raises a hypothesis worth testing rather than establishing harm — but it does check the optimistic assumption that fasting is risk-free.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Adherence and Real-World Sustainability
    // =========================================================================
    {
      id: "adherence-sustainability",
      title: "Adherence and Real-World Sustainability",
      short_summary:
        "Diets fail mostly because people quit them. If a simple rule like 'only eat between noon and 8 pm' is easier to follow than counting calories every day, fasting could win in the real world even if it ties in tightly controlled trials. The evidence is genuinely mixed: alternate-day fasting showed higher dropout in one long trial, while 16:8 and 4:3 protocols showed better adherence in others.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The 'easier to follow' selling point is not as robust as fans claim, and depends heavily on which fasting protocol you mean. The most demanding versions are hard to sustain: in Trepanowski's year-long JAMA Internal Medicine trial, the alternate-day fasting group had the highest dropout (38%) versus daily calorie restriction (29%) and controls (26%), and fast-day calorie targets were routinely overshot while feast days fell short — people simply didn't comply with the extremes. Systematic reviews report dropout rates spanning 0-65% for both fasting and calorie restriction, with no consistent advantage for fasting. A rigid window also collides with social meals, family dinners, shift work, and morning hunger. 'Simple rule' can mean 'brittle rule' — one late dinner and the protocol is broken, whereas a daily calorie budget flexes around real life.",
      proponent_rebuttal:
        "Adherence is exactly where the milder, more popular fasting protocols shine — and that is the whole point. A meta-analysis tracking adherence over time found participants on 16:8 time-restricted eating had higher adherence rates than controls at 3, 6, and 12 months, and 5:2 dieters had better adherence at 3 and 6 months. The 4:3 trial (Catenacci, Annals 2025) reported better adherence and greater weight loss than daily calorie restriction at a full year. The reason is cognitive simplicity: 'don't eat before noon' is a single bright-line rule you either follow or don't, versus the continuous, fatiguing arithmetic of counting every calorie all day, every day. Trepanowski's high dropout was specific to the harsh alternate-day protocol, not to time-restricted eating generally. For the large group of people who find calorie tracking unsustainable, a fasting window is a legitimately easier on-ramp to the calorie deficit that actually drives results.",
      crux: {
        id: "long-term-adherence-comparison",
        title: "The Long-Term Adherence Test",
        description:
          "Whether intermittent-fasting protocols achieve higher real-world adherence and lower dropout than continuous calorie restriction over 12+ months. If pragmatic, free-living trials show people stick to a fasting window better than to daily calorie counting, fasting earns a real-world edge regardless of its metabolic equivalence. If dropout and adherence are similar — or worse for the stricter fasting variants — then 'easier to follow' is protocol-specific marketing rather than a general truth.",
        methodology:
          "Run long (≥12 month) pragmatic randomized trials in free-living adults comparing specific fasting protocols (16:8, 5:2, 4:3, alternate-day) against continuous calorie restriction, with adherence and dropout pre-specified as co-primary outcomes. Track adherence objectively where possible (continuous glucose monitors, photo food logs, timestamped meal apps) rather than relying solely on self-report, and stratify by protocol type, baseline eating habits, and social/work constraints. Report retention curves, not just endpoint weight.",
        verification_status: "verified" as const,
        cost_to_verify:
          "$1-3M (Long pragmatic behavioral RCTs with objective adherence tracking — several completed, more underway)",
        falsification: {
          supporter_flip:
            "If long pragmatic trials with objective tracking showed fasting windows are abandoned at the same or higher rates than daily calorie counting across protocols, the 'easier to sustain' claim would fail and fasting would be just another equally-quittable diet.",
          skeptic_flip:
            "A skeptic citing alternate-day fasting's 38% dropout should weigh that gentler protocols (16:8, 5:2, 4:3) showed equal-or-better adherence in multiple trials — so 'fasting is harder to stick to' isn't true of the protocols most people actually use.",
          common_ground:
            "Both sides agree adherence is the single biggest determinant of long-term weight loss, and that the harshest fasting protocols (alternate-day) are hardest to sustain.",
          live_disagreement:
            "Whether milder fasting windows are genuinely easier to maintain than daily calorie counting for the average person, or whether the apparent edge reflects motivated trial participants and self-report bias.",
        },
      },
      evidence: [
        {
          id: "trepanowski-dropout",
          title:
            "Trepanowski 2017: Alternate-Day Fasting Had the Highest Dropout",
          description:
            "Trepanowski et al. (JAMA Internal Medicine, 2017) randomized 100 metabolically healthy adults with obesity to alternate-day fasting (25% of energy needs on fast days, 125% on alternating feast days), daily calorie restriction (75% of needs every day), or no-intervention control, across a 6-month weight-loss and 6-month maintenance phase. Weight loss at 12 months did not differ significantly between the fasting and daily-restriction groups. Crucially, the alternate-day fasting group had the highest dropout (38%) versus daily calorie restriction (29%) and control (26%), and participants chronically failed to hit the extreme fast-day and feast-day targets.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Trepanowski et al., JAMA Internal Medicine (2017)",
          sourceUrl:
            "https://pubmed.ncbi.nlm.nih.gov/28459931/",
          reasoning:
            "A rigorous year-long RCT directly comparing adherence between a fasting protocol and daily restriction, finding no weight advantage and worse retention for fasting. Strongly supports the skeptical adherence argument — but only for the demanding alternate-day version, which is why it does not generalize to gentler windows.",
        },
        {
          id: "adherence-meta-16-8",
          title:
            "16:8 and 5:2 Showed Higher Adherence Than Controls in Meta-Analysis",
          description:
            "A meta-analysis examining adherence over time across intermittent-fasting trials found that participants following 16:8 time-restricted eating had higher adherence rates than control groups at 3, 6, and 12 months, and those on the 5:2 protocol had higher adherence at 3 and 6 months. This contrasts with the alternate-day fasting picture and suggests that the milder, more widely practiced fasting patterns may be at least as sustainable as — and sometimes more sustainable than — continuous calorie restriction.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source:
            "Hamsho et al., 'Is isocaloric intermittent fasting superior to calorie restriction?', Nutrition, Metabolism and Cardiovascular Diseases (2024) — adherence subanalysis (16:8 and 5:2 protocols)",
          sourceUrl:
            "https://www.nmcd-journal.com/article/S0939-4753(24)00439-3/fulltext",
          reasoning:
            "Aggregated adherence data supporting the proponent claim that popular fasting windows are sustainable. Directness is good for the adherence question. Weighted moderately because adherence in trials is often self-reported and trial participants are more motivated than the general population, so real-world generalizability is uncertain — and the same review found 14:10 windows had lower adherence than controls, so the edge is protocol-specific.",
        },
        {
          id: "catenacci-adherence",
          title:
            "4:3 Fasting Trial: Better Adherence and More Weight Loss at 12 Months",
          description:
            "In addition to greater weight loss (−7.7 kg vs −4.8 kg, P=.04), the Catenacci 2025 Annals of Internal Medicine trial reported that participants on the 4:3 intermittent-fasting protocol had higher adherence at both 6 and 12 months than those on daily calorie restriction, within an otherwise identical behavioral support program. The authors noted the regimen was well tolerated, suggesting that for some people an intermittent pattern is genuinely easier to maintain than constant daily restriction.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source: "Catenacci et al., Annals of Internal Medicine (2025)",
          sourceUrl: "https://www.acpjournals.org/doi/10.7326/ANNALS-24-01631",
          reasoning:
            "A recent, high-quality RCT directly linking a fasting protocol to better adherence and outcomes over a full year — the proponents' best adherence evidence. Replicability is rated lower as a single trial of one protocol within an intensive support structure; the adherence edge may partly reflect that structure rather than the fasting pattern alone.",
        },
        {
          id: "dropout-no-difference-review",
          title:
            "Systematic Reviews: Dropout Rates Span 0-65% With No Consistent Winner",
          description:
            "Broader systematic reviews comparing intermittent fasting against continuous calorie restriction report dropout rates ranging widely from 0% to 65% across studies, with no statistically significant overall difference between fasting and calorie-restriction arms. The wide range reflects differences in study design, support intensity, protocol harshness, and populations rather than an inherent adherence advantage for either approach — undercutting strong claims in both directions.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "Harvard T.H. Chan School of Public Health, The Nutrition Source — Intermittent Fasting review (summarizing dropout/adherence literature)",
          sourceUrl:
            "https://nutritionsource.hsph.harvard.edu/healthy-weight/diet-reviews/intermittent-fasting/",
          reasoning:
            "Tempers the proponent adherence claim: across the full body of trials there is no reliable dropout advantage for fasting. Directly relevant to the adherence crux. Weighted moderately because it is a literature summary rather than a single pooled estimate, and the heterogeneity it describes is itself the honest answer — adherence depends on the person and the protocol.",
        },
      ],
    },
  ],
  references: [
    {
      title:
        "Effects of Time-Restricted Eating on Weight Loss: The TREAT Randomized Clinical Trial — Lowe et al., JAMA Internal Medicine (2020)",
      url: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2771095",
    },
    {
      title:
        "Calorie Restriction with or without Time-Restricted Eating in Weight Loss — Liu et al., New England Journal of Medicine (2022)",
      url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2114833",
    },
    {
      title:
        "Effect of Alternate-Day Fasting on Weight Loss, Maintenance, and Cardioprotection — Trepanowski et al., JAMA Internal Medicine (2017)",
      url: "https://pubmed.ncbi.nlm.nih.gov/28459931/",
    },
    {
      title:
        "Early Time-Restricted Feeding Improves Insulin Sensitivity Even without Weight Loss — Sutton et al., Cell Metabolism (2018)",
      url: "https://www.cell.com/cell-metabolism/fulltext/S1550-4131(18)30253-5",
    },
    {
      title:
        "Time-Restricted Eating in Adults With Metabolic Syndrome (TIMET) — Annals of Internal Medicine (2024)",
      url: "https://www.acpjournals.org/doi/10.7326/M24-0859",
    },
    {
      title:
        "The Effect of 4:3 Intermittent Fasting on Weight Loss at 12 Months — Catenacci et al., Annals of Internal Medicine (2025)",
      url: "https://www.acpjournals.org/doi/10.7326/ANNALS-24-01631",
    },
    {
      title:
        "Is Isocaloric Intermittent Fasting Superior to Calorie Restriction? A Meta-Analysis of RCTs — Nutrition, Metabolism and Cardiovascular Diseases (2024)",
      url: "https://www.nmcd-journal.com/article/S0939-4753(24)00439-3/fulltext",
    },
  ],
  questions: [
    {
      id: "q1",
      title:
        "Does intermittent fasting beat plain calorie restriction once calories are matched?",
      content:
        "The intuitive case is that an 8-hour eating window does something special — but the cleanest trials keep finding the same thing. TREAT (JAMA Internal Medicine, 2020) saw no significant weight difference between 16:8 and controls, and the NEJM 2022 trial, which matched calorie targets across both arms, found 8 kg versus 6.3 kg (not significant). A 2024 meta-analysis of 20 isocaloric RCTs concluded fasting offers no advantage once calories are equalized. Yet the longest trial — Catenacci's 2025 study of 4:3 fasting — found significantly more weight loss at a full year. Is the eating window doing real work, or is it just a convenient way to eat less?",
    },
    {
      id: "q2",
      title:
        "Are there metabolic benefits to fasting that are independent of weight loss?",
      content:
        "Sutton's 2018 Cell Metabolism trial fed men with prediabetes enough to hold their weight steady and still found that early time-restricted feeding improved insulin sensitivity and blood pressure — a design that rules out 'it's just the weight.' But that study had only 8 participants over 5 weeks, and larger calorie-matched trials see the metabolic gains shrink toward the weight that was lost. The TIMET trial (2024) found a small but real HbA1c improvement, while a 2024 AHA conference abstract raised a (heavily confounded) cardiovascular-death concern. Is there a genuine, weight-independent metabolic signature to circadian-aligned eating, or is the signal small and inconsistent?",
    },
    {
      id: "q3",
      title:
        "Is intermittent fasting easier to stick to than counting calories every day?",
      content:
        "Diets mostly fail because people quit, so a simple bright-line rule could win in the real world even if it ties in the lab. The evidence splits by protocol: Trepanowski's year-long trial found alternate-day fasting had the highest dropout (38% vs 29% for daily restriction), but meta-analyses report higher adherence for gentler 16:8 and 5:2 patterns, and the 4:3 trial showed better adherence at 12 months. Broader reviews find dropout ranging from 0-65% with no consistent winner. For people who can't sustain daily calorie counting, is a fasting window a genuinely easier on-ramp, or is 'simple rule' really just 'brittle rule'?",
    },
  ],
} satisfies Omit<Topic, "confidence_score"> & {
  confidence_score?: number;
};
