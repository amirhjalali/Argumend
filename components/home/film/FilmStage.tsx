"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { FILM } from "@/components/home/filmManifest";
import {
  BEAT_COUNT,
  FILM_MOBILE_QUERY,
  FILM_REPLAY_EVENT,
  FILM_SEEN_KEY,
  FILM_SKIP_EVENT,
  coverRect,
  filmTheme,
  firstPassLength,
  frameUrl,
  hasDarkFilm,
  loadOrder,
  nearestLoaded,
  stillUrl,
  type FilmThemeName,
  type FilmVariant,
} from "@/components/home/film/filmPaths";

/**
 * The subject sits right of centre in the desktop frames and in the upper
 * part of the phone frames, so a cover crop keeps it in view.
 */
const FOCAL: Record<FilmVariant, [number, number]> = {
  desktop: [0.8, 0.5],
  mobile: [0.5, 0],
};

const MOBILE_QUERY = FILM_MOBILE_QUERY;
/** The rest of the film is fetched on the first scroll, or after this long. */
const REST_DELAY_MS = 4000;
/** Frames either side of the one on screen that are decoded ahead of the scrub. */
const WARM_RADIUS = 4;
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
/** Frames fetched at once. */
const CONCURRENCY = 5;
/** The site header's height: the stage pins below it. */
const HEADER_PX = 56;
/**
 * At the top of the page the film is not waiting on the scroll wheel: it
 * drifts back and forth over its opening frames, so the first screen is alive.
 */
const IDLE_SPAN = 0.085;
const IDLE_PERIOD_MS = 7000;

interface Sequence {
  key: string;
  urls: string[];
  images: (HTMLImageElement | null)[];
  loaded: boolean[];
  /** Frames already handed to the decoder (the browser may still evict them). */
  warm: boolean[];
  queue: number[];
  /** Frames held back until the first scroll. */
  rest: number[];
  inFlight: number;
  cancelled: boolean;
}

/**
 * Home's film: a pre-rendered 3D sequence (scripts/home-film) of one argument
 * as thread, scrubbed by the scroll position of the nearest
 * `[data-home-film]` section. The stage is pinned behind the section's steps
 * and is decoration: every number and sentence of the story is text in the
 * steps, and the stage is hidden from assistive technology.
 *
 * It finds its steps by `[data-film-step]` and marks the one nearest the
 * reading position with `data-active`, which the copy's entrance transition
 * keys on (app/globals.css). With reduced motion, or on a data-saver
 * connection, it shows the six stills instead of the sequence.
 *
 * A visitor who has scrolled the film to its end has `data-seen` set on the
 * section before paint (the inline script in HomeFilm); the steps collapse to
 * the hero and the stage shows the last still. "Replay the intro" undoes it.
 */
export function FilmStage() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const lampRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // The inline script in HomeFilm marks a returning visitor before paint, but
  // React does not run it on a client-side navigation back to home.
  useLayoutEffect(() => {
    const section = wrapRef.current?.closest<HTMLElement>("[data-home-film]");
    try {
      if (section && window.localStorage.getItem(FILM_SEEN_KEY) === "1")
        section.setAttribute("data-seen", "");
    } catch {
      // No storage: every visit is a first visit.
    }
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const layer = layerRef.current;
    const lamp = lampRef.current;
    const bar = barRef.current;
    const section = wrap?.closest<HTMLElement>("[data-home-film]");
    const stage = wrap?.firstElementChild as HTMLElement | null;
    const context = canvas?.getContext("2d");
    if (!wrap || !canvas || !layer || !section || !stage || !context) return;

    const steps = Array.from(
      section.querySelectorAll<HTMLElement>("[data-film-step]"),
    );
    const mobileQuery = window.matchMedia(MOBILE_QUERY);
    const reducedQuery = window.matchMedia(REDUCED_QUERY);
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData === true;

    let sequence: Sequence | null = null;
    let variant: FilmVariant = "desktop";
    let frame = 0;
    let current = 0;
    let target = 0;
    let progress = 0;
    let drawn = -1;
    let drawnKey = "";
    let raf = 0;
    let onScreen = true;
    let active = -1;
    let markedSeen = false;
    /** The page has shown the film's first half: only then can its end count as seen. */
    let sawStart = false;
    /** The page has finished loading: frames do not compete with it. */
    let armed = document.readyState === "complete";
    let restTimer = 0;
    let idleStart = performance.now();
    let wasIdle = false;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, inside: false };

    const isSeen = () => section.hasAttribute("data-seen");
    const wantedTheme = (): FilmThemeName =>
      filmTheme(
        document.documentElement.classList.contains("dark") ? "dark" : "light",
      );

    /** A step's large figure counts up from zero as the step arrives. */
    let counting = 0;
    let countingFigure: HTMLElement | null = null;
    const countUp = (step: HTMLElement | undefined) => {
      const figure = step?.querySelector<HTMLElement>("[data-film-count]");
      const end = Number(figure?.dataset.filmCount);
      // A count cut short by the next step lands on its number.
      window.cancelAnimationFrame(counting);
      if (countingFigure)
        countingFigure.textContent = countingFigure.dataset.filmCount ?? "";
      countingFigure = null;
      // Nothing to count where the figure is not shown (below `lg`).
      if (!figure || !Number.isFinite(end) || figure.offsetParent === null)
        return;
      countingFigure = figure;
      const started = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - started) / 900);
        figure.textContent = String(Math.round(end * (1 - (1 - t) ** 3)));
        if (t < 1) counting = window.requestAnimationFrame(tick);
      };
      counting = window.requestAnimationFrame(tick);
    };

    const pump = () => {
      const seq = sequence;
      if (!seq || seq.cancelled || !armed) return;
      while (seq.inFlight < CONCURRENCY && seq.queue.length > 0) {
        const index = seq.queue.shift()!;
        const image = new Image();
        image.decoding = "async";
        seq.inFlight += 1;
        const done = (ok: boolean) => {
          seq.inFlight -= 1;
          if (seq.cancelled) return;
          if (ok) {
            seq.images[index] = image;
            seq.loaded[index] = true;
            schedule();
          }
          pump();
        };
        image.onload = () => done(true);
        image.onerror = () => done(false);
        image.src = seq.urls[index];
      }
    };

    /** Choose the frames for the current theme, width and motion preference. */
    const configure = () => {
      const theme = wantedTheme();
      variant = mobileQuery.matches ? "mobile" : "desktop";
      const stills = reducedQuery.matches || saveData;
      const key = `${theme}/${variant}/${stills ? "stills" : "film"}`;
      if (sequence?.key === key) return;
      if (sequence) {
        sequence.cancelled = true;
        // The old frames are another theme's or another shape's: show the
        // poster underneath until the new ones arrive.
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.removeAttribute("data-painted");
      }
      const urls = stills
        ? Array.from({ length: BEAT_COUNT }, (_, beat) =>
            stillUrl(theme, variant, beat),
          )
        : Array.from({ length: FILM[variant].frames }, (_, index) =>
            frameUrl(theme, variant, index),
          );
      const order = loadOrder(urls.length);
      const first = firstPassLength(urls.length);
      sequence = {
        key,
        urls,
        images: urls.map(() => null),
        loaded: urls.map(() => false),
        warm: urls.map(() => false),
        queue: stills ? urls.map((_, index) => index) : order.slice(0, first),
        rest: stills ? [] : order.slice(first),
        inFlight: 0,
        cancelled: false,
      };
      section.dataset.filmMode = stills ? "stills" : "film";
      drawn = -1;
      if (!isSeen()) start();
    };

    /** Release the frames held back for the first scroll. */
    const loadRest = () => {
      window.clearTimeout(restTimer);
      const seq = sequence;
      if (!seq || seq.rest.length === 0) return;
      seq.queue.push(...seq.rest);
      seq.rest = [];
      pump();
    };

    /** Fetch the first pass now, and the rest on the first scroll or after a pause. */
    const start = () => {
      if (!armed) return;
      pump();
      window.clearTimeout(restTimer);
      restTimer = window.setTimeout(loadRest, REST_DELAY_MS);
    };
    const onLoad = () => {
      armed = true;
      if (!isSeen()) start();
    };

    const measure = (fromScroll = false) => {
      const rect = section.getBoundingClientRect();
      // The pinned stage's own height (100svh less the header), which on a
      // phone is not the window's once the address bar has collapsed.
      const stageHeight = stage.offsetHeight || window.innerHeight - HEADER_PX;
      const distance = rect.height - stageHeight;
      progress =
        distance > 1
          ? Math.min(1, Math.max(0, (HEADER_PX - rect.top) / distance))
          : 0;
      const count = sequence?.urls.length ?? 1;
      // Stills change at the midpoint between beats; the film is continuous.
      target =
        section.dataset.filmMode === "stills"
          ? Math.round(progress * (BEAT_COUNT - 1))
          : progress * (count - 1);

      const nearest = Math.round(progress * (BEAT_COUNT - 1));
      if (nearest !== active) {
        active = nearest;
        steps.forEach((step, index) => {
          if (index === active) step.setAttribute("data-active", "");
          else step.removeAttribute("data-active");
        });
        if (!reducedQuery.matches) countUp(steps[active]);
      }
      if (bar) bar.style.transform = `scaleY(${progress.toFixed(4)})`;
      if (progress < 0.5) sawStart = true;
      // Only a scroll through the film counts: not a link straight to a
      // section below it.
      if (
        fromScroll &&
        sawStart &&
        !markedSeen &&
        progress > 0.985 &&
        !isSeen()
      ) {
        markedSeen = true;
        try {
          window.localStorage.setItem(FILM_SEEN_KEY, "1");
        } catch {
          // Private mode: the film simply plays again next time.
        }
      }
    };

    const draw = () => {
      raf = 0;
      const seq = sequence;
      if (!seq) return;
      const stills = section.dataset.filmMode === "stills";
      // Only once the opening run has arrived, or the drift would hop between
      // the few frames that have.
      const openingReady =
        !stills &&
        seq.loaded.slice(0, Math.ceil(seq.urls.length * 0.1)).every(Boolean);
      const idle = openingReady && progress < 0.004 && !reducedQuery.matches;
      if (idle) {
        if (!wasIdle) idleStart = performance.now();
        const phase =
          ((performance.now() - idleStart) / IDLE_PERIOD_MS) * Math.PI * 2;
        target =
          (0.5 - 0.5 * Math.cos(phase)) * IDLE_SPAN * (seq.urls.length - 1);
      }
      // Ease toward the scroll position so a wheel tick reads as motion.
      const gap = target - current;
      current = stills || Math.abs(gap) < 0.02 ? target : current + gap * 0.2;
      frame = current;

      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      if (!reducedQuery.matches) {
        layer.style.transform = `translate3d(${(-pointer.x * 9).toFixed(2)}px, ${(-pointer.y * 6).toFixed(2)}px, 0) scale(1.02)`;
      }

      const index = nearestLoaded(seq.loaded, frame);
      const image = index >= 0 ? seq.images[index] : null;
      // Decode the neighbours off the main thread, ahead of the scrub.
      if (!stills && index >= 0) {
        for (
          let near = index - WARM_RADIUS;
          near <= index + WARM_RADIUS;
          near += 1
        ) {
          const neighbour = seq.images[near];
          if (neighbour && !seq.warm[near]) {
            seq.warm[near] = true;
            neighbour.decode().catch(() => {
              seq.warm[near] = false;
            });
          }
        }
        // Frames well behind may have been evicted: let them be warmed again.
        for (const far of [index - WARM_RADIUS * 3, index + WARM_RADIUS * 3]) {
          if (far >= 0 && far < seq.warm.length) seq.warm[far] = false;
        }
      }
      if (image) {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const width = Math.max(1, Math.round(rect.width * dpr));
        const height = Math.max(1, Math.round(rect.height * dpr));
        const resized = canvas.width !== width || canvas.height !== height;
        if (resized) {
          canvas.width = width;
          canvas.height = height;
        }
        if (resized || index !== drawn || seq.key !== drawnKey) {
          const [focalX, focalY] = FOCAL[variant];
          // The upright frames fit the width and hang from the top: their
          // paper is the page's colour, so a taller screen shows more page.
          const box =
            variant === "mobile"
              ? {
                  x: 0,
                  y: 0,
                  width,
                  height: (width * image.naturalHeight) / image.naturalWidth,
                }
              : coverRect(
                  image.naturalWidth,
                  image.naturalHeight,
                  width,
                  height,
                  focalX,
                  focalY,
                );
          context.clearRect(0, 0, width, height);
          context.imageSmoothingQuality = "high";
          context.drawImage(image, box.x, box.y, box.width, box.height);
          drawn = index;
          drawnKey = seq.key;
          if (!canvas.hasAttribute("data-painted"))
            canvas.setAttribute("data-painted", "");
        }
      }

      wasIdle = idle;
      const moving =
        idle ||
        Math.abs(target - current) > 0.02 ||
        Math.abs(pointer.tx - pointer.x) > 0.002 ||
        Math.abs(pointer.ty - pointer.y) > 0.002;
      if (moving && onScreen) schedule();
    };

    const schedule = () => {
      if (raf === 0 && onScreen && !isSeen())
        raf = window.requestAnimationFrame(draw);
    };

    const onScroll = () => {
      if (isSeen()) return;
      measure(true);
      if (progress > 0) loadRest();
      schedule();
    };

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType === "touch" || reducedQuery.matches) return;
      const rect = wrap.getBoundingClientRect();
      pointer.tx =
        ((event.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
      pointer.ty = (event.clientY / Math.max(1, window.innerHeight)) * 2 - 1;
      if (lamp) {
        lamp.style.setProperty("--lamp-x", `${event.clientX - rect.left}px`);
        lamp.style.setProperty("--lamp-y", `${event.clientY - HEADER_PX}px`);
        lamp.style.opacity = "1";
      }
      schedule();
    };
    const onPointerLeave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
      if (lamp) lamp.style.opacity = "0";
      schedule();
    };

    const reconfigure = () => {
      configure();
      measure();
      current = target;
      schedule();
    };

    /** A resize (a phone's address bar sliding away is one) re-measures without cutting the eased scrub short. */
    const onResize = () => {
      configure();
      measure();
      schedule();
    };

    const onReplay = () => {
      try {
        window.localStorage.removeItem(FILM_SEEN_KEY);
      } catch {
        // Nothing to clear.
      }
      section.removeAttribute("data-seen");
      markedSeen = false;
      window.scrollTo({ top: 0, behavior: "auto" });
      reconfigure();
      start();
    };
    const onSkip = () => {
      markedSeen = true;
      try {
        window.localStorage.setItem(FILM_SEEN_KEY, "1");
      } catch {
        // Private mode.
      }
    };

    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) onScroll();
      },
      { rootMargin: "20% 0px" },
    );
    visibility.observe(section);

    // `html`'s class changes for more than the theme: act only on that.
    let watchedTheme = wantedTheme();
    const themeWatcher = new MutationObserver(() => {
      if (wantedTheme() === watchedTheme) return;
      watchedTheme = wantedTheme();
      reconfigure();
    });
    themeWatcher.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    section.setAttribute("data-film-live", "");
    reconfigure();
    if (!armed) window.addEventListener("load", onLoad, { once: true });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    mobileQuery.addEventListener("change", reconfigure);
    reducedQuery.addEventListener("change", reconfigure);
    section.addEventListener("pointermove", onPointer);
    section.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener(FILM_REPLAY_EVENT, onReplay);
    window.addEventListener(FILM_SKIP_EVENT, onSkip);

    return () => {
      if (sequence) sequence.cancelled = true;
      if (raf) window.cancelAnimationFrame(raf);
      window.clearTimeout(restTimer);
      window.removeEventListener("load", onLoad);
      window.cancelAnimationFrame(counting);
      if (countingFigure)
        countingFigure.textContent = countingFigure.dataset.filmCount ?? "";
      visibility.disconnect();
      themeWatcher.disconnect();
      section.removeAttribute("data-film-live");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mobileQuery.removeEventListener("change", reconfigure);
      reducedQuery.removeEventListener("change", reconfigure);
      section.removeEventListener("pointermove", onPointer);
      section.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener(FILM_REPLAY_EVENT, onReplay);
      window.removeEventListener(FILM_SKIP_EVENT, onSkip);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      data-film-stage=""
      className="pointer-events-none absolute inset-0 z-0"
    >
      <div className="sticky top-14 h-[calc(100svh-3.5rem)] overflow-hidden bg-canvas">
        <div
          ref={layerRef}
          // Until the dark frames exist, the light ones are inverted for dark
          // mode so the stage does not glare; hue-rotate keeps teal and rust.
          className={`absolute inset-0 scale-[1.02] will-change-transform ${
            hasDarkFilm ? "" : "dark:[filter:invert(0.9)_hue-rotate(180deg)]"
          }`}
        >
          <div className="group-data-[seen]/film:hidden">
            <FilmPoster beat={0} />
          </div>
          <div className="hidden group-data-[seen]/film:block">
            <FilmPoster beat={BEAT_COUNT - 1} />
          </div>
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500 data-[painted]:opacity-100 group-data-[seen]/film:hidden"
          />
        </div>
        {/* The pointer carries a soft lamp across the paper. */}
        <div
          ref={lampRef}
          className="absolute inset-0 hidden opacity-0 mix-blend-soft-light transition-opacity duration-500 [background:radial-gradient(26rem_circle_at_var(--lamp-x,50%)_var(--lamp-y,50%),rgba(255,248,235,0.55),transparent_70%)] group-data-[seen]/film:!hidden lg:block"
        />
        {/* Paper under the copy on a wide screen; below `lg` the copy brings its own. */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-canvas/90 via-canvas/45 via-35% to-transparent to-50% lg:block" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-canvas to-transparent" />
        {/* And a short fade under the site header, so the sheet has no seam. */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-canvas to-transparent" />
        {/* Reading progress, on the right edge. */}
        <div className="absolute bottom-10 right-6 top-10 hidden w-px bg-divider group-data-[seen]/film:!hidden lg:block">
          <div
            ref={barRef}
            className="h-full w-full origin-top scale-y-0 bg-crux"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * The server-rendered still under the canvas: what paints first, and all a
 * visitor without JavaScript sees. Plain `img`: the files are already WebP at
 * the sizes they are shown.
 */
function FilmPoster({ beat }: { beat: number }) {
  const themes: FilmThemeName[] = hasDarkFilm ? ["light", "dark"] : ["light"];
  return (
    <>
      {themes.map((theme) => {
        const themed = !hasDarkFilm
          ? ""
          : theme === "dark"
            ? "hidden dark:block"
            : "dark:hidden";
        return (
          <picture
            key={theme}
            data-film-poster=""
            className={themed || undefined}
          >
            <source
              media={MOBILE_QUERY}
              srcSet={stillUrl(theme, "mobile", beat)}
            />
            <img
              src={stillUrl(theme, "desktop", beat)}
              alt=""
              width={FILM.desktop.width}
              height={FILM.desktop.height}
              // Lazy: the still this visitor sees first is preloaded by the
              // inline script in HomeFilm, and the others are never fetched.
              loading="lazy"
              decoding="async"
              className="absolute left-0 top-0 h-auto w-full"
            />
          </picture>
        );
      })}
    </>
  );
}
