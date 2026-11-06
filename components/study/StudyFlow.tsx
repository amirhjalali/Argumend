"use client";

/**
 * The study, one screen at a time (docs/plans/2026-11-03-study-plan.md,
 * "Procedure"):
 *
 *   consent → party → [server assigns topic × arm] → before ×3 → read →
 *   after ×4 → [server stores] → debrief → Prolific completion URL
 *
 * Nothing is sent until the party answer (assignment) and the very end (the
 * response). The client never chooses its own cell, and the completion URL
 * comes from the server only after a valid response.
 */
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui";
import type { ProlificParams } from "@/lib/study/prolific";
import { STUDY_INSTRUMENTS } from "@/data/study/instruments";
import { ARTICLE_STIMULI, CHATBOT_STIMULI } from "@/data/study/stimuli";
import {
  CHARITY_ITEM_COUNT,
  GAP_STATEMENT_COUNT,
  MIN_STIMULUS_SECONDS,
  STUDY_VERSION,
  otherParty,
  partyPlural,
  type PartyStrength,
  type PriorExposure,
  type StudyArm,
  type StudyParty,
  type StudyTopic,
} from "@/lib/study/constants";
import {
  AGREE_OPTIONS,
  ATTITUDE_OPTIONS,
  ChoiceGroup,
  PercentInput,
  ZeroToTen,
  type ChoiceOption,
} from "./controls";
import { CONSENT_POINTS, STUDY_MINUTES, debriefParagraphs } from "./copy";
import { ArticleView, ChatbotView, MapFrame } from "./Stimulus";

type Step =
  | "consent"
  | "party"
  | "pre-1"
  | "pre-2"
  | "pre-3"
  | "read"
  | "post-1"
  | "post-2"
  | "post-3"
  | "post-4"
  | "debrief"
  | "declined"
  | "screenout"
  | "error";

const NUMBERED_STEPS: Step[] = ["party", "pre-1", "pre-2", "pre-3", "read", "post-1", "post-2", "post-3", "post-4"];

interface Measures {
  perceived: number | null;
  attitude: number | null;
  ownAgree: (number | null)[];
  otherEstimate: (number | null)[];
  charity: (number | null)[];
}

const emptyMeasures = (): Measures => ({
  perceived: null,
  attitude: null,
  ownAgree: Array(GAP_STATEMENT_COUNT).fill(null),
  otherEstimate: Array(GAP_STATEMENT_COUNT).fill(null),
  charity: Array(CHARITY_ITEM_COUNT).fill(null),
});

type PartyAnswer = { party: StudyParty; strength: PartyStrength } | { party: "neither" };

const PARTY_OPTIONS: ChoiceOption<string>[] = [
  { value: "democrat:strong", label: "Strong Democrat" },
  { value: "democrat:weak", label: "Not very strong Democrat" },
  { value: "democrat:lean", label: "Independent, closer to Democrats" },
  { value: "republican:lean", label: "Independent, closer to Republicans" },
  { value: "republican:weak", label: "Not very strong Republican" },
  { value: "republican:strong", label: "Strong Republican" },
  { value: "neither", label: "Independent, closer to neither / something else" },
];

export function parseParty(value: string): PartyAnswer {
  if (value === "neither") return { party: "neither" };
  const [party, strength] = value.split(":") as [StudyParty, PartyStrength];
  return { party, strength };
}

/** Deterministic shuffle so the crux options keep their order across re-renders. */
export function shuffled<T>(items: T[], seed: number): T[] {
  const out = [...items];
  let state = seed || 1;
  for (let i = out.length - 1; i > 0; i--) {
    state = (state * 1103515245 + 12345) % 2147483648;
    const j = state % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function complete(measures: Measures): boolean {
  return (
    measures.perceived !== null &&
    measures.attitude !== null &&
    measures.ownAgree.every((v) => v !== null) &&
    measures.otherEstimate.every((v) => v !== null) &&
    measures.charity.every((v) => v !== null)
  );
}

function Screen({ title, children }: { title?: ReactNode; children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[44rem] px-4 sm:px-6">
      {title ? <h1 className="font-serif text-[2rem] leading-[1.15] text-primary sm:text-[2.5rem]">{title}</h1> : null}
      {children}
    </div>
  );
}

function Continue({
  disabled,
  onClick,
  children = "Continue",
  note,
}: {
  disabled?: boolean;
  onClick: () => void;
  children?: ReactNode;
  note?: ReactNode;
}) {
  return (
    <div className="mt-10 flex flex-col items-start gap-2">
      <Button variant="primary" size="lg" disabled={disabled} onClick={onClick}>
        {children}
      </Button>
      {note ? <p className="font-sans text-sm text-muted" aria-live="polite">{note}</p> : null}
    </div>
  );
}

export function StudyFlow({
  prolific,
  mapStimuli,
}: {
  prolific: ProlificParams;
  /** The real topic pages, server-rendered, one per study topic. */
  mapStimuli: Record<StudyTopic, ReactNode>;
}) {
  const [step, setStep] = useState<Step>("consent");
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [partyValue, setPartyValue] = useState<string | null>(null);
  const [cell, setCell] = useState<{ topic: StudyTopic; arm: StudyArm } | null>(null);
  const [pre, setPre] = useState<Measures>(emptyMeasures);
  const [post, setPost] = useState<Measures>(emptyMeasures);
  const [cruxChoice, setCruxChoice] = useState<string | null>(null);
  const [attention, setAttention] = useState<number | null>(null);
  const [fairness, setFairness] = useState<number | null>(null);
  const [learned, setLearned] = useState<number | null>(null);
  const [priorExposure, setPriorExposure] = useState<PriorExposure | null>(null);
  const [completionUrl, setCompletionUrl] = useState<string | null>(null);
  const [screenoutUrl, setScreenoutUrl] = useState<string | null>(null);
  const [opened, setOpened] = useState(0);
  const [readSeconds, setReadSeconds] = useState(0);
  const startedAt = useRef<number | null>(null);
  const seed = useMemo(() => Math.floor(Math.random() * 2147483647), []);

  const goTo = useCallback((next: Step) => {
    setStep(next);
    window.scrollTo({ top: 0 });
  }, []);

  // Visible time on the reading screen only: a hidden tab does not count.
  useEffect(() => {
    if (step !== "read") return;
    const tick = window.setInterval(() => {
      if (document.visibilityState === "visible") setReadSeconds((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(tick);
  }, [step]);

  const answer = partyValue ? parseParty(partyValue) : null;
  const party = answer && answer.party !== "neither" ? answer.party : null;
  const instrument = cell ? STUDY_INSTRUMENTS[cell.topic] : null;
  const others = party ? partyPlural(otherParty(party)) : "";

  async function assign() {
    if (!answer) return;
    setBusy(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/study/assign", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          version: STUDY_VERSION,
          prolificPid: prolific.pid,
          prolificStudyId: prolific.studyId,
          party: answer.party,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data) throw new Error(data?.error ?? "assignment failed");
      if (data.screenedOut) {
        setScreenoutUrl(data.screenoutUrl ?? null);
        goTo("screenout");
        return;
      }
      setCell({ topic: data.topic, arm: data.arm });
      goTo("pre-1");
    } catch {
      setErrorMessage("We could not start the study just now. Please try again in a moment.");
    } finally {
      setBusy(false);
    }
  }

  async function submit() {
    if (!cell || !answer || answer.party === "neither") return;
    setBusy(true);
    setErrorMessage(null);
    const totalSeconds = Math.round((Date.now() - (startedAt.current ?? Date.now())) / 1000);
    try {
      const res = await fetch("/api/study/response", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          version: STUDY_VERSION,
          prolificPid: prolific.pid,
          prolificStudyId: prolific.studyId,
          party: answer.party,
          partyStrength: answer.strength,
          topic: cell.topic,
          arm: cell.arm,
          pre,
          post,
          cruxChoice,
          attention,
          fairness,
          learned,
          priorExposure,
          stimulusSeconds: Math.min(readSeconds, totalSeconds),
          totalSeconds,
          stimulusOpened: Math.min(opened, 500),
          device: window.innerWidth < 640 ? "mobile" : "desktop",
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data) throw new Error("submit failed");
      setCompletionUrl(data.completionUrl ?? null);
      goTo("debrief");
    } catch {
      setErrorMessage("Your answers could not be saved just now. Please try again; nothing is lost.");
    } finally {
      setBusy(false);
    }
  }

  const stepNumber = NUMBERED_STEPS.indexOf(step);
  const progress =
    stepNumber >= 0 ? (
      <p className="mb-6 font-sans text-sm text-muted">
        Step {stepNumber + 1} of {NUMBERED_STEPS.length}
      </p>
    ) : null;

  const errorLine = errorMessage ? (
    <p role="alert" className="mt-4 font-sans text-sm text-error-text">
      {errorMessage}
    </p>
  ) : null;

  // ── Screens ─────────────────────────────────────────────────────────────

  if (step === "consent") {
    return (
      <Screen title="A short reading study">
        <p className="mt-4 font-serif text-xl leading-[1.5] text-secondary">
          About {STUDY_MINUTES} minutes. Please read this before you decide.
        </p>
        <dl className="mt-8 space-y-5">
          {CONSENT_POINTS.map((point) => (
            <div key={point.title}>
              <dt className="font-sans text-base font-semibold text-primary">{point.title}</dt>
              <dd className="mt-1 font-serif text-lg leading-relaxed text-primary">{point.body}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              startedAt.current = Date.now();
              goTo("party");
            }}
          >
            I agree to take part
          </Button>
          <Button variant="secondary" size="lg" onClick={() => goTo("declined")}>
            I do not agree
          </Button>
        </div>
      </Screen>
    );
  }

  if (step === "declined") {
    return (
      <Screen title="Thank you">
        <p className="mt-4 font-serif text-xl leading-[1.5] text-secondary">
          Nothing has been recorded. Please return the study on Prolific so the place goes to someone else.
        </p>
      </Screen>
    );
  }

  if (step === "screenout") {
    return (
      <Screen title="Thank you">
        <p className="mt-4 font-serif text-xl leading-[1.5] text-secondary">
          This study compares people who lean toward one of the two major parties, so it does not need any more of
          your time. Nothing you answered has been stored.
        </p>
        {screenoutUrl ? (
          <Continue onClick={() => window.location.assign(screenoutUrl)}>Return to Prolific</Continue>
        ) : (
          <p className="mt-6 font-sans text-base text-secondary">Please return the study on Prolific.</p>
        )}
      </Screen>
    );
  }

  if (step === "party") {
    return (
      <Screen>
        {progress}
        <ChoiceGroup
          legend={<span className="font-serif text-2xl">Generally speaking, how do you think of yourself?</span>}
          options={PARTY_OPTIONS}
          value={partyValue}
          onChange={setPartyValue}
          columns="grid-cols-1 sm:grid-cols-2"
        />
        <Continue disabled={!partyValue || busy} onClick={assign} note={busy ? "Starting…" : undefined} />
        {errorLine}
      </Screen>
    );
  }

  if (!cell || !instrument || !party) {
    // Only reachable if state is lost mid-study (a reload starts over at consent).
    return (
      <Screen title="Something went wrong">
        <p className="mt-4 font-serif text-xl text-secondary">Please reload this page to start again.</p>
      </Screen>
    );
  }

  const questionBox = (
    <div className="surface-paper mb-8 p-4">
      <p className="label-caps">The question</p>
      <p className="mt-1 font-serif text-xl leading-snug text-primary">{instrument.question}</p>
    </div>
  );

  const block1 = (measures: Measures, set: (m: Measures) => void, phase: "pre" | "post") => (
    <Screen>
      {progress}
      <h2 className="mb-6 font-sans text-base font-semibold text-secondary">
        {phase === "pre" ? "Before you read" : "Now that you have read it"}
      </h2>
      {questionBox}
      <div className="space-y-10">
        <ChoiceGroup
          legend="Where do you stand on this question?"
          options={ATTITUDE_OPTIONS}
          value={measures.attitude}
          onChange={(attitude) => set({ ...measures, attitude })}
          columns="grid-cols-3 sm:grid-cols-6"
        />
        <ZeroToTen
          legend="How far apart do you think Democrats and Republicans are on this question?"
          value={measures.perceived}
          onChange={(perceived) => set({ ...measures, perceived })}
          endLabels={["They mostly agree", "They completely disagree"]}
        />
      </div>
      <Continue
        disabled={measures.attitude === null || measures.perceived === null}
        onClick={() => goTo(phase === "pre" ? "pre-2" : "post-2")}
      />
    </Screen>
  );

  const statementCard = (measures: Measures, set: (m: Measures) => void, index: number) => {
    const statement = instrument.statements[index];
    return (
      <li key={statement.id} className="surface-card p-4 sm:p-5">
        <p className="font-serif text-xl leading-snug text-primary">&ldquo;{statement.text}&rdquo;</p>
        <div className="mt-4 space-y-5">
          <ChoiceGroup
            legend={<span className="font-sans text-sm text-secondary">Do you agree?</span>}
            options={AGREE_OPTIONS}
            value={measures.ownAgree[index]}
            onChange={(value) => {
              const ownAgree = [...measures.ownAgree];
              ownAgree[index] = value;
              set({ ...measures, ownAgree });
            }}
          />
          <PercentInput
            label={`What percentage of the ${others} taking this study do you think agree?`}
            value={measures.otherEstimate[index]}
            onChange={(value) => {
              const otherEstimate = [...measures.otherEstimate];
              otherEstimate[index] = value;
              set({ ...measures, otherEstimate });
            }}
          />
        </div>
      </li>
    );
  };

  const block2 = (measures: Measures, set: (m: Measures) => void, phase: "pre" | "post") => {
    const withCheck = phase === "post";
    const ready = measures.ownAgree.every((v) => v !== null) && measures.otherEstimate.every((v) => v !== null);
    return (
      <Screen>
        {progress}
        <h2 className="font-serif text-2xl leading-snug text-primary">Five statements</h2>
        <p className="mt-2 font-sans text-base text-secondary">
          For each one: do you agree, and what share of the {others} taking this study do you think agree? There is
          no single right answer you are expected to know; give your best guess.
        </p>
        <ol className="mt-6 space-y-4">
          {[0, 1, 2].map((i) => statementCard(measures, set, i))}
          {withCheck ? (
            <li className="surface-card p-4 sm:p-5">
              <ChoiceGroup
                legend={
                  <span className="font-serif text-xl leading-snug">
                    This one checks that the questions are being read. Please choose &ldquo;Disagree&rdquo;.
                  </span>
                }
                options={AGREE_OPTIONS}
                value={attention}
                onChange={setAttention}
              />
            </li>
          ) : null}
          {[3, 4].map((i) => statementCard(measures, set, i))}
        </ol>
        <Continue
          disabled={!ready || (withCheck && attention === null)}
          onClick={() => goTo(phase === "pre" ? "pre-3" : "post-3")}
        />
      </Screen>
    );
  };

  const block3 = (measures: Measures, set: (m: Measures) => void, phase: "pre" | "post") => {
    const items: { legend: string; ends: [string, string] }[] = [
      { legend: `How reasonable are their views on ${instrument.label}?`, ends: ["Not at all reasonable", "Completely reasonable"] },
      { legend: `How well-informed are they about ${instrument.label}?`, ends: ["Not at all informed", "Very well informed"] },
      {
        legend: "How far do they hold their views in good faith, for reasons they believe in?",
        ends: ["Not at all", "Completely"],
      },
    ];
    return (
      <Screen>
        {progress}
        <h2 className="font-serif text-2xl leading-snug text-primary">
          Think about most {others} and their views on {instrument.label}.
        </h2>
        <div className="mt-8 space-y-10">
          {items.map((item, index) => (
            <ZeroToTen
              key={item.legend}
              legend={item.legend}
              value={measures.charity[index]}
              onChange={(value) => {
                const charity = [...measures.charity];
                charity[index] = value;
                set({ ...measures, charity });
              }}
              endLabels={item.ends}
            />
          ))}
        </div>
        <Continue
          disabled={!measures.charity.every((v) => v !== null)}
          onClick={() => goTo(phase === "pre" ? "read" : "post-4")}
        />
      </Screen>
    );
  };

  if (step === "pre-1") return block1(pre, setPre, "pre");
  if (step === "pre-2") return block2(pre, setPre, "pre");
  if (step === "pre-3") return block3(pre, setPre, "pre");
  if (step === "post-1") return block1(post, setPost, "post");
  if (step === "post-2") return block2(post, setPost, "post");
  if (step === "post-3") return block3(post, setPost, "post");

  if (step === "read") {
    const remaining = Math.max(0, MIN_STIMULUS_SECONDS - readSeconds);
    return (
      <div>
        <Screen>
          {progress}
          <h2 className="font-serif text-2xl leading-snug text-primary">Please read this</h2>
          <p className="mt-2 font-sans text-base text-secondary">
            Read it as you normally would, and take as long as you need. You can open anything on the page. The
            questions afterwards are about the topic, not a memory test.
          </p>
        </Screen>
        <div className="mt-8">
          {cell.arm === "map" ? (
            <MapFrame onOpened={() => setOpened((n) => n + 1)}>{mapStimuli[cell.topic]}</MapFrame>
          ) : cell.arm === "chatbot" ? (
            <ChatbotView stimulus={CHATBOT_STIMULI[cell.topic]} />
          ) : (
            <ArticleView stimulus={ARTICLE_STIMULI[cell.topic]} />
          )}
        </div>
        <Screen>
          <Continue
            disabled={remaining > 0}
            onClick={() => goTo("post-1")}
            note={remaining > 0 ? `Continue unlocks in ${remaining} s.` : "Continue when you have finished reading."}
          >
            I have finished reading
          </Continue>
        </Screen>
      </div>
    );
  }

  if (step === "post-4") {
    const options = shuffled(instrument.cruxOptions, seed).map((option) => ({ value: option.id, label: option.text }));
    const ready = cruxChoice !== null && fairness !== null && learned !== null && priorExposure !== null;
    return (
      <Screen>
        {progress}
        <div className="space-y-10">
          <ChoiceGroup
            legend={
              <span className="font-serif text-xl leading-snug">
                People disagree about this question. Which of these, if it were answered clearly, would do the most to
                change people&rsquo;s minds about it?
              </span>
            }
            options={options}
            value={cruxChoice}
            onChange={setCruxChoice}
            columns="grid-cols-1"
          />
          <ZeroToTen
            legend="How fair to both sides was what you read?"
            value={fairness}
            onChange={setFairness}
            endLabels={["Very one-sided", "Completely fair"]}
          />
          <ZeroToTen
            legend="How much did you learn from it?"
            value={learned}
            onChange={setLearned}
            endLabels={["Nothing", "A great deal"]}
          />
          <ChoiceGroup
            legend="Before today, had you used a website that maps the arguments on both sides of a question, such as argumend.org?"
            options={[
              { value: "yes" as const, label: "Yes" },
              { value: "no" as const, label: "No" },
              { value: "unsure" as const, label: "Not sure" },
            ]}
            value={priorExposure}
            onChange={setPriorExposure}
            columns="grid-cols-3"
          />
        </div>
        <Continue disabled={!ready || busy || !complete(pre) || !complete(post)} onClick={submit} note={busy ? "Saving…" : undefined}>
          Submit my answers
        </Continue>
        {errorLine}
      </Screen>
    );
  }

  if (step === "debrief") {
    return (
      <Screen title="Thank you. Here is what the study was about">
        <div className="mt-6 space-y-4 font-serif text-lg leading-relaxed text-primary">
          {debriefParagraphs(cell.arm).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {completionUrl ? (
          <Continue onClick={() => window.location.assign(completionUrl)}>Finish and return to Prolific</Continue>
        ) : (
          <p className="mt-10 font-sans text-base text-secondary" data-testid="study-no-completion-code">
            Your answers are in. This deployment has no Prolific completion code configured, so there is nowhere to
            send you; you can close this tab.
          </p>
        )}
      </Screen>
    );
  }

  return (
    <Screen title="Something went wrong">
      <p className="mt-4 font-serif text-xl text-secondary">Please reload this page to start again.</p>
    </Screen>
  );
}
