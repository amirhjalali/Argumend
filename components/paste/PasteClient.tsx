"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AiConsentLine } from "@/components/AiConsentLine";
import { AnalysisProgress } from "@/components/disagreement/AnalysisProgress";
import { AnalyzeInput } from "@/components/disagreement/AnalyzeInput";
import { DisagreementReportView } from "@/components/disagreement/DisagreementReportView";
import { ShareReport } from "@/components/disagreement/ShareReport";
import { ClosestMaps } from "@/components/mapReply/ClosestMaps";
import { Button, PageContainer, PageHeader, TextAction, textActionClasses } from "@/components/ui";
import { buildPasteConsentLine, formatProviderList } from "@/lib/aiProviders";
import { trackEvent } from "@/lib/analytics";
import { DISAGREEMENT_EXAMPLE_SOURCE } from "@/lib/disagreement/constants";
import { bandLabel, characterBucket, latencyBucket } from "@/lib/disagreement/labels";
import { PASTE_PREFILL_KEY } from "@/lib/paste/handoff";
import { minCharactersFor, PASTE_LIMITS } from "@/lib/paste/limits";
import {
  PasteDiagnosisResponseSchema,
  PasteErrorResponseSchema,
  PasteMapsResponseSchema,
  PastePrefillSchema,
} from "@/lib/paste/schemas";
import { buildPasteSummary } from "@/lib/paste/summary";
import type {
  PasteContentType,
  PasteLanes,
  PasteMapReading,
  PasteMapsResult,
} from "@/lib/paste/types";
import type { ArgumentGraph } from "@/types/argument";
import type { DisagreementReportV1 } from "@/types/disagreement";
import { HowThisWasRead, ReadingNote } from "./HowThisWasRead";
import { MapMatch, MapNoMatch } from "./MapResult";
import { NextStep } from "./NextStep";
import { EMPTY_CONVERSATION_NOTES, type ConversationNotes } from "./ReadItYourself";

/**
 * The one paste flow at /analyze.
 *
 * The server decides which lanes run (lib/paste/lanes.ts) and passes them in;
 * this component only renders what they return, in one document:
 *
 * 1. the diagnosis of the pasted text, when that lane is on;
 * 2. "This argument is already mapped": the map, its crux, the best card on
 *    each side, or an honest "no map" with the closest maps;
 * 3. the next step: open the map at the crux, copy a summary, and the
 *    north-star question;
 * 4. "How this was read", collapsed, holding every number and model id.
 *
 * The map lane always runs and answers in milliseconds, so the page shows the
 * map as soon as it arrives and keeps a progress line in the diagnosis's place
 * until that lane returns. A diagnosis failure never blocks the map.
 */


const CONSENT_ID = "paste-consent";
const SUBMIT_ID = "paste-submit";
const PROGRESS_MS = 1800;

type Phase = "idle" | "loading" | "done" | "error";

type DiagnosisState =
  | { status: "off" }
  | { status: "loading" }
  | {
      status: "done";
      report: DisagreementReportV1;
      graph: ArgumentGraph;
      execution?: { model?: string; promptVersion?: string; latencyMs?: number };
      publishing?: { token?: string; unavailableReason?: string };
    }
  | { status: "failed"; message: string };

interface WorkingPaste {
  configuration: string;
  content: string;
  contentType: PasteContentType;
  phase: Phase;
  error: string;
  maps: PasteMapsResult | null;
  mapsError: string;
  diagnosis: DiagnosisState;
  inputOpen: boolean;
  submitted: string;
  notes: ConversationNotes;
  notesForText: string;
}

// One working argument in this document's memory, never browser storage or
// history state. Client effects are the only writers, so SSR holds no text.
let workingPaste: WorkingPaste | null = null;

export function clearWorkingPaste() {
  workingPaste = null;
}

function toContentType(value: unknown): PasteContentType {
  if (value === "conversation" || value === "article" || value === "freeform") return value;
  // The legacy analyzer called a conversation a "transcript".
  if (value === "transcript") return "conversation";
  return "freeform";
}

async function fetchMaps(
  content: string,
  contentType: PasteContentType,
): Promise<{ maps: PasteMapsResult } | { error: string }> {
  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ content, contentType }),
    });
    const data: unknown = await response.json();
    const parsed = PasteMapsResponseSchema.safeParse(data);
    if (!response.ok || !parsed.success) {
      const failure = PasteErrorResponseSchema.safeParse(data);
      return { error: (failure.success && failure.data.error) || "The maps could not be searched just now." };
    }
    return { maps: parsed.data.maps };
  } catch {
    return { error: "The maps could not be searched just now. Check your connection and try again." };
  }
}

async function fetchDiagnosis(content: string, contentType: PasteContentType): Promise<DiagnosisState> {
  try {
    const response = await fetch("/api/disagreements/analyze", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ content, contentType }),
    });
    const raw: unknown = await response.json();
    const parsed = PasteDiagnosisResponseSchema.safeParse(raw);
    if (!response.ok || !parsed.success) {
      const failure = PasteErrorResponseSchema.safeParse(raw);
      trackEvent({ action: "disagreement_analysis_failed", errorCode: (failure.success && failure.data.code) || "INTERNAL_ERROR" });
      return { status: "failed", message: (failure.success && failure.data.error) || "The reading failed." };
    }
    const data = parsed.data;
    trackEvent({
      action: "disagreement_analysis_completed",
      diagnosisPattern: data.report.diagnosis.pattern,
      positionCount: data.report.positions.length,
      cruxCount: data.report.cruxes.length,
      latencyBucket: latencyBucket(data.execution?.latencyMs ?? 0),
    });
    return {
      status: "done",
      report: data.report,
      graph: data.graph,
      execution: data.execution,
      publishing: data.publishing,
    };
  } catch {
    return { status: "failed", message: "The reading could not reach the server." };
  }
}

function formatScore(value: number | null): string {
  return value === null ? "none" : value.toFixed(1);
}

/** Ends a title with a full stop unless it already ends a sentence ("…Nuclear Energy?"). */
function asSentence(text: string): string {
  return /[.?!]$/.test(text) ? text : `${text}.`;
}

/** The map lane's numbers in one paragraph, for "How this was read". */
function mapReadingLine(reading: PasteMapReading): string {
  if (reading.topScore === null) {
    return `No map shares a scoreable word with your text. Took ${reading.matchMs} ms.`;
  }
  const times = (value: number | null) => (value === null ? "without limit" : `${value.toFixed(1)} times`);
  const lead =
    reading.rivalScore === null
      ? "No eligible map on a different subject competes with it."
      : `The best map on a different subject scores ${formatScore(reading.rivalScore)}: a lead of ${times(reading.lead)}, and ${times(reading.exclusiveLead)} on the words where the two differ.`;
  const coverage =
    reading.coverage === null ? "" : ` The best match accounts for ${Math.round(reading.coverage * 100)}% of your words.`;
  return [
    `Best match ${formatScore(reading.topScore)}. ${lead}${coverage}`,
    `A map is named only when it leads every eligible map on a different subject by ${reading.minLead} times, and by ${reading.minExclusiveLead} times on the words where they differ, with a score of at least ${reading.minScore} (or, for a short text, ${Math.round(reading.minCoverage * 100)}% of its words). A map can be ruled out if the paste lacks its subject language. Maps on the same subject are shown as closely related rather than counted against it. With no map named, closest maps are leads to explore, not a confirmed match. Subject checks can remove an unrelated leader while retaining a finalist with enough overlap and a telling word of its name.`,
    `These are keyword scores, comparable within one paste only. Took ${reading.matchMs} ms.`,
  ].join(" ");
}

/** "Read by Anthropic (model m, prompt v) in 3.2 s. The text was not stored." */
function diagnosisReadLine(
  providers: string,
  execution?: { model?: string; promptVersion?: string; latencyMs?: number },
): string {
  const details = [
    execution?.model ? `model ${execution.model}` : "",
    execution?.promptVersion ? `prompt ${execution.promptVersion}` : "",
  ]
    .filter(Boolean)
    .join(", ");
  const took =
    typeof execution?.latencyMs === "number" ? ` in ${(execution.latencyMs / 1000).toFixed(1)} s` : "";
  return `Read by ${providers}${details ? ` (${details})` : ""}${took}. The text was not stored.`;
}

export function PasteClient({ lanes }: { lanes: PasteLanes }) {
  const diagnosisLane = lanes.diagnosis;
  const diagnosisOn = diagnosisLane.enabled;
  const providerIds = diagnosisLane.enabled ? diagnosisLane.providerIds : [];
  // Auto-submitting a handed-off paste is only fine when nothing leaves our
  // server: the consent line has to be seen before text goes to a provider.
  const autoSubmitAllowed = providerIds.length === 0;
  const minChars = minCharactersFor(diagnosisOn);

  const [content, setContent] = useState("");
  const [contentType, setContentType] = useState<PasteContentType>("conversation");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState("");
  const [maps, setMaps] = useState<PasteMapsResult | null>(null);
  const [mapsError, setMapsError] = useState("");
  const [diagnosis, setDiagnosis] = useState<DiagnosisState>({ status: "off" });
  const [inputOpen, setInputOpen] = useState(true);
  const [step, setStep] = useState(0);
  // The text as submitted: the box can be edited again before the next submit.
  const [submitted, setSubmitted] = useState("");
  const [conversationNotes, setConversationNotes] = useState(EMPTY_CONVERSATION_NOTES);
  const notesForText = useRef("");
  const configuration = JSON.stringify(lanes);
  const previousConfiguration = useRef(configuration);
  const [readyFor, setReadyFor] = useState<string | null>(null);

  const runRef = useRef(0);
  const resultsRef = useRef<HTMLElement>(null);
  const textareaWrapRef = useRef<HTMLDivElement>(null);
  const editRequested = useRef(false);
  const attachInput = useCallback((node: HTMLDivElement | null) => {
    textareaWrapRef.current = node;
    if (node && editRequested.current) {
      editRequested.current = false;
      node.querySelector("textarea")?.focus();
    }
  }, []);

  const resetForm = useCallback((type: PasteContentType = "conversation") => {
    setContent("");
    setContentType(type);
    setPhase("idle");
    setError("");
    setMaps(null);
    setMapsError("");
    setDiagnosis({ status: "off" });
    setInputOpen(true);
    setSubmitted("");
    setConversationNotes(EMPTY_CONVERSATION_NOTES);
    notesForText.current = "";
  }, []);

  const restoreWorkingPaste = useCallback((saved: WorkingPaste) => {
    setContent(saved.content);
    setContentType(saved.contentType);
    setPhase(saved.phase === "loading" ? "idle" : saved.phase);
    setError(saved.error);
    setMaps(saved.maps);
    setMapsError(saved.mapsError);
    setDiagnosis(saved.diagnosis.status === "loading"
      ? { status: "failed", message: "The reading was interrupted when you left. Submit again to retry it." }
      : saved.diagnosis);
    setInputOpen(saved.phase === "loading" || saved.inputOpen);
    setSubmitted(saved.submitted);
    setConversationNotes(saved.notes);
    notesForText.current = saved.notesForText;
  }, []);

  const trimmedLength = content.trim().length;
  const tooShort = trimmedLength < minChars;
  const tooLong = content.length > PASTE_LIMITS.maxCharacters;

  const submit = useCallback(
    async (text: string, type: PasteContentType) => {
      if (text.trim().length < minChars || text.length > PASTE_LIMITS.maxCharacters) return;
      if (text !== notesForText.current) {
        setConversationNotes(EMPTY_CONVERSATION_NOTES);
        notesForText.current = text;
      }
      const run = ++runRef.current;
      setPhase("loading");
      setError("");
      setMaps(null);
      setMapsError("");
      setStep(0);
      setSubmitted(text);
      setDiagnosis(diagnosisOn ? { status: "loading" } : { status: "off" });
      trackEvent({ action: "analysis_submit", contentType: type });
      if (diagnosisOn) {
        trackEvent({
          action: "disagreement_analysis_started",
          contentType: type,
          characterBucket: characterBucket(text.length),
        });
      }

      const mapsTask = fetchMaps(text, type).then((outcome) => {
        if (run !== runRef.current) return outcome;
        if ("maps" in outcome) {
          setMaps(outcome.maps);
          setInputOpen(false);
          setPhase("done");
        } else {
          setMapsError(outcome.error);
        }
        return outcome;
      });
      const diagnosisTask: Promise<DiagnosisState | null> = diagnosisOn
        ? fetchDiagnosis(text, type).then((outcome) => {
            if (run === runRef.current) setDiagnosis(outcome);
            return outcome;
          })
        : Promise.resolve(null);

      const [mapsOutcome, diagnosisOutcome] = await Promise.all([mapsTask, diagnosisTask]);
      if (run !== runRef.current) return;
      if ("maps" in mapsOutcome || diagnosisOutcome?.status === "done") {
        setInputOpen(false);
        setPhase("done");
      } else {
        setError(
          diagnosisOutcome?.status === "failed" ? diagnosisOutcome.message : mapsOutcome.error,
        );
        setPhase("error");
      }
    },
    [diagnosisOn, minChars],
  );

  // The home page's paste box parks the text in sessionStorage and navigates
  // here. Read it in a microtask, and remove it only once it is used, so
  // Strict Mode's double effect cannot drop it.
  useEffect(() => {
    runRef.current += 1;
    let cancelled = false;
    let raw: string | null = null;
    try {
      raw = sessionStorage.getItem(PASTE_PREFILL_KEY);
    } catch {
      // Returning to the working argument does not require browser storage.
    }
    const saved = workingPaste;
    queueMicrotask(() => {
      if (cancelled) return;
      const changed = previousConfiguration.current !== configuration;
      previousConfiguration.current = configuration;
      setReadyFor(configuration);
      if (!raw) {
        if (saved?.configuration === configuration) restoreWorkingPaste(saved);
        else {
          clearWorkingPaste();
          if (changed) resetForm();
        }
        return;
      }
      clearWorkingPaste();
      try {
        sessionStorage.removeItem(PASTE_PREFILL_KEY);
      } catch {
        // Storage can vanish between the read and the write; the text is in hand.
      }
      let data: unknown;
      try {
        data = JSON.parse(raw as string);
      } catch {
        return;
      }
      const prefill = PastePrefillSchema.safeParse(data);
      if (!prefill.success || !prefill.data.content.trim()) return;
      const parsed = prefill.data;
      // Keep the whole draft, including handoffs from older entry points.
      const text = parsed.content;
      const type = toContentType(parsed.contentType);
      setContent(text);
      setContentType(type);
      if (autoSubmitAllowed && text.trim().length >= minChars && text.length <= PASTE_LIMITS.maxCharacters) {
        void submit(text, type);
      } else {
        // A lane that sends text somewhere waits for the visitor to read the
        // consent line and press the button.
        window.setTimeout(() => {
          const target = text.trim().length < minChars || text.length > PASTE_LIMITS.maxCharacters
            ? textareaWrapRef.current?.querySelector("textarea")
            : document.getElementById(SUBMIT_ID);
          target?.scrollIntoView({ block: "center" });
          target?.focus({ preventScroll: true });
        }, 50);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [autoSubmitAllowed, configuration, minChars, resetForm, restoreWorkingPaste, submit]);

  useEffect(() => {
    if (readyFor !== configuration) return;
    workingPaste = {
      configuration, content, contentType, phase, error, maps, mapsError,
      diagnosis, inputOpen, submitted, notes: conversationNotes,
      notesForText: notesForText.current,
    };
  }, [configuration, readyFor, content, contentType, phase, error, maps, mapsError,
    diagnosis, inputOpen, submitted, conversationNotes]);

  useEffect(() => () => { runRef.current += 1; }, []);

  useEffect(() => {
    if (diagnosis.status !== "loading") return;
    const timer = window.setInterval(() => setStep((value) => value + 1), PROGRESS_MS);
    return () => window.clearInterval(timer);
  }, [diagnosis.status]);

  useEffect(() => {
    if (phase !== "done") return;
    const region = resultsRef.current;
    if (!region) return;
    region.focus({ preventScroll: true });
    // The input has just collapsed into one line, so the result starts on
    // the first screen: go back to the top rather than aiming at the region,
    // which overshot under the sticky top bar. AppShell's <main> can own the
    // scroll, so reset whichever element does.
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduce ? "auto" : "smooth";
    const main = region.closest("main");
    if (main && main.scrollHeight > main.clientHeight) main.scrollTo?.({ top: 0, behavior });
    window.scrollTo?.({ top: 0, behavior });
  }, [phase]);

  function startOver() {
    clearWorkingPaste();
    runRef.current += 1;
    resetForm(contentType);
    trackEvent({ action: "disagreement_analyze_another", surface: "session" });
    window.setTimeout(() => {
      textareaWrapRef.current?.querySelector("textarea")?.focus();
    }, 0);
  }

  const done = phase === "done";
  const busy = phase === "loading";
  const consent = buildPasteConsentLine(providerIds);
  const match = maps?.match ?? null;
  const related = match ? (maps?.related ?? []) : [];
  const report = diagnosis.status === "done" ? diagnosis.report : null;
  const summary = match || report ? buildPasteSummary({ maps, report }) : undefined;
  // With no map, the "read it yourself" guide stands in for the diagnosis:
  // always when that lane is off, and when it is on but did not run.
  const showGuide = !diagnosisOn || diagnosis.status === "failed";

  // What a screen reader hears when the result lands. Focus moves to the
  // result region too, but "Result, region" alone does not say what came back.
  // The diagnosis lane's progress line announces its own steps.
  const announcement = busy
    ? diagnosisOn
      ? ""
      : "Looking through the maps…"
    : done
      ? match
        ? [
            `Result below. This argument is already mapped: ${asSentence(match.title)}`,
            related.length > 0
              ? `Closely related: ${asSentence(related.map((map) => map.title).join("; "))}`
              : "",
          ]
            .filter(Boolean)
            .join(" ")
        : maps
          ? [
              "Result below. No map stood out for this text.",
              maps.status === "closest" ? "The closest maps are listed." : "",
              showGuide ? "Then three questions to read it yourself." : "",
            ]
              .filter(Boolean)
              .join(" ")
          : "Result below."
      : "";

  const lede = diagnosisOn
    ? "Paste a conversation, an article or your own draft. Argumend separates what the sides agree on from what they don’t, finds the question it turns on, and takes you to the map that lays out both sides’ best evidence."
    : "Paste a conversation, an article or your own draft. Find a map with questions and evidence on each side, or write conversation notes with a guide built around three questions.";

  return (
    <PageContainer width="default">
      {/* Always in the page, so its first text is announced. */}
      <div role="status" className="sr-only">
        {announcement}
      </div>
      {done ? (
        // After a submit the title steps down, so the result starts on the
        // first screen of a phone; PageHeader has no size that small.
        <h1 className="max-w-3xl font-serif text-2xl leading-tight text-primary">
          What is the argument really resting on?
        </h1>
      ) : (
        <PageHeader
          title="What is the argument really resting on?"
          lede={lede}
          meta="It never says who is right."
          className="mb-8 max-w-3xl sm:mb-10"
        />
      )}

      {!inputOpen ? (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-b border-divider pb-3">
          <p className="font-sans text-sm text-muted">
            Your text, {submitted.length.toLocaleString("en-US")} characters
          </p>
          <TextAction onClick={() => {
            editRequested.current = true;
            setInputOpen(true);
          }}>Edit</TextAction>
        </div>
      ) : (
        <div ref={attachInput} className={`max-w-3xl space-y-6 ${done ? "mt-8" : ""}`}>
          <AnalyzeInput
            content={content}
            contentType={contentType}
            disabled={busy}
            onContentChange={setContent}
            onTypeChange={setContentType}
            label="The argument to read"
          />

          {/* The disclosure sits at the click, and names the lane that will run. */}
          <AiConsentLine id={CONSENT_ID} consent={consent} className="max-w-[36rem]" />
          <p className="max-w-[36rem] text-xs leading-relaxed text-muted dark:text-stone-400">
            Your current draft and notes stay in this tab while you explore maps.
            Reload or choose Paste another to clear them.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Button
              id={SUBMIT_ID}
              size="lg"
              onClick={() => void submit(content, contentType)}
              aria-describedby={CONSENT_ID}
              disabled={busy || tooShort || tooLong}
            >
              Find what it turns on
            </Button>
            <TextAction
              disabled={busy}
              onClick={() => {
                setContentType("conversation");
                setContent(DISAGREEMENT_EXAMPLE_SOURCE);
              }}
            >
              See an example
            </TextAction>
          </div>
          {/* The count is hidden from the live region: it changed on every
              keystroke, so a screen reader re-read the whole line per key. */}
          {tooShort && content.length > 0 ? (
            <p className="font-sans text-sm text-muted" role="status">
              Add a little more: Argumend needs at least {minChars} characters to work with
              <span aria-hidden="true"> ({minChars - trimmedLength} to go)</span>.
            </p>
          ) : null}
        </div>
      )}

      {busy ? (
        <div className="mt-8 max-w-3xl">
          {diagnosisOn ? (
            <AnalysisProgress step={step} />
          ) : (
            <p className="font-serif text-lg italic text-[var(--text-secondary)]">
              Looking through the maps…
            </p>
          )}
        </div>
      ) : null}

      {phase === "error" ? (
        <div role="alert" className="mt-8 max-w-3xl space-y-2 border-l-2 border-[var(--text-muted)] pl-4">
          <p className="text-[var(--text-primary)]">{error}</p>
          <div className="flex flex-wrap gap-x-5">
            <TextAction onClick={() => void submit(content, contentType)}>Try again</TextAction>
            <TextAction href="/topics">Browse every map</TextAction>
          </div>
        </div>
      ) : null}

      {done ? (
        <section
          ref={resultsRef}
          tabIndex={-1}
          aria-label="Result"
          className="mt-10 space-y-14 scroll-mt-8 focus:outline-none"
        >
          {diagnosis.status === "loading" ? (
            <div className="max-w-3xl rounded-md border border-[var(--border-divider)] px-5 py-4">
              <AnalysisProgress step={step} />
              <p className="mt-1 font-sans text-sm text-[var(--text-muted)]">
                The map below is already here; the full reading follows.
              </p>
            </div>
          ) : null}
          {diagnosis.status === "failed" ? (
            <p role="status" className="max-w-3xl border-l-2 border-[var(--text-muted)] pl-4 font-sans text-[0.9375rem] text-[var(--text-secondary)]">
              The full reading did not run this time: {diagnosis.message} The map below does not depend
              on it.
            </p>
          ) : null}
          {diagnosis.status === "done" ? (
            <>
              {/* The diagnosis runs several screens on a phone; the map it
                  leads to should not be the last thing a reader finds. */}
              {match ? (
                <p className="max-w-3xl font-sans text-[0.9375rem] text-[var(--text-secondary)]">
                  Already mapped:{" "}
                  <a href="#map-match-heading" className={textActionClasses("text-[0.9375rem]")}>
                    {match.title}, below
                  </a>
                </p>
              ) : null}
              <DisagreementReportView report={diagnosis.report} headlineAs="h2" showConfidence={false} />
            </>
          ) : null}

          {maps ? (
            match ? (
              <MapMatch match={match} related={related} />
            ) : (
              <MapNoMatch
                maps={maps}
                text={submitted}
                diagnosisOn={diagnosisOn}
                guide={showGuide}
                notesState={{ value: conversationNotes, onChange: setConversationNotes }}
              />
            )
          ) : mapsError ? (
            <p role="status" className="max-w-3xl font-sans text-[0.9375rem] text-[var(--text-secondary)]">
              {mapsError}
            </p>
          ) : null}

          {match || report ? (
            <NextStep summary={summary} />
          ) : null}

          {match ? <ClosestMaps title="Closest other maps" level={2} maps={maps?.closest ?? []} /> : null}

          <div className="space-y-6">
            {diagnosis.status === "done" && diagnosis.publishing?.token ? (
              <ShareReport
                report={diagnosis.report}
                graph={diagnosis.graph}
                publicationToken={diagnosis.publishing.token}
                unavailableReason={diagnosis.publishing.unavailableReason}
                surface="session"
              />
            ) : null}
            <TextAction onClick={startOver}>Paste another</TextAction>
          </div>

          <HowThisWasRead>
            {maps ? (
              <ReadingNote label="Finding the map">
                <p>
                  Matched on Argumend&rsquo;s server by the words your text shares with each of its{" "}
                  {maps.reading.mapsSearched} maps: titles and everyday phrasings count most, then
                  claims and cruxes, then evidence. No AI model reads it for this step, and it is not
                  stored.
                </p>
                {maps.match ? (
                  <p>
                    The crux shown is the one whose own words your text shares most, counting most
                    the words the map&rsquo;s other cruxes do not use.{" "}
                    {maps.match.alsoCrux
                      ? "Two came out close, so both are shown."
                      : "When nothing in the text points to one crux, the map’s first crux is shown."}
                  </p>
                ) : null}
                <p>{mapReadingLine(maps.reading)}</p>
              </ReadingNote>
            ) : null}
            {diagnosis.status === "done" ? (
              <ReadingNote label="The diagnosis">
                <p>
                  {diagnosisLane.enabled && diagnosisLane.fixtures
                    ? "Answered from Argumend’s test fixtures, not a live model: nothing was sent anywhere."
                    : diagnosisReadLine(formatProviderList(providerIds), diagnosis.execution)}
                </p>
                <p>
                  How sure the reading is: {bandLabel(diagnosis.report.diagnosis.confidence)}.{" "}
                  {diagnosis.report.diagnosis.confidenceBasis}
                </p>
                <p>
                  It maps what the text says and only that. It does not check facts, guess at
                  motives, or say who is right.
                </p>
              </ReadingNote>
            ) : null}
          </HowThisWasRead>
        </section>
      ) : null}
    </PageContainer>
  );
}
