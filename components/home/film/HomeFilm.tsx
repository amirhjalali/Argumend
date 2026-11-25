import { FilmStage } from "@/components/home/film/FilmStage";
import {
  BEAT_COUNT,
  FILM_MOBILE_QUERY,
  FILM_SEEN_KEY,
  hasDarkFilm,
  stillUrl,
} from "@/components/home/film/filmPaths";

/** The stills that can be the first thing painted: first frame or last, per theme and shape. */
const POSTERS = Object.fromEntries(
  (["light", "dark"] as const).map((theme) => [
    theme,
    {
      start: { d: stillUrl(theme, "desktop", 0), m: stillUrl(theme, "mobile", 0) },
      end: {
        d: stillUrl(theme, "desktop", BEAT_COUNT - 1),
        m: stillUrl(theme, "mobile", BEAT_COUNT - 1),
      },
    },
  ]),
);

/**
 * Runs before the section paints. A visitor who has already scrolled the
 * film gets the short home (hero only, last still) with no flash of the long
 * one. Either way the one still this visitor will see first (by theme, screen
 * shape and first or return visit) is preloaded at high priority; the `img`
 * elements themselves are lazy, so the stills nobody sees are not fetched.
 * next-themes has set the `dark` class on `html` by the time this runs.
 */
const SEEN_SCRIPT = `(function(){try{var s=document.currentScript.parentElement,seen=false;try{seen=localStorage.getItem(${JSON.stringify(FILM_SEEN_KEY)})==="1"}catch(e){}if(seen)s.setAttribute("data-seen","");var P=${JSON.stringify(POSTERS)};var t=${JSON.stringify(hasDarkFilm)}&&document.documentElement.classList.contains("dark")?"dark":"light";var l=document.createElement("link");l.rel="preload";l.as="image";l.fetchPriority="high";l.href=P[t][seen?"end":"start"][matchMedia(${JSON.stringify(FILM_MOBILE_QUERY)}).matches?"m":"d"];document.head.appendChild(l)}catch(e){}})()`;

/**
 * The frame for home's film: a full-bleed section whose children are the
 * story's steps (server-rendered text), with the pinned stage behind them.
 *
 * Each direct step is a `FilmStep`. The first is the hero and is the only one
 * a returning visitor sees.
 */
export function HomeFilm({
  labelledBy,
  children,
}: {
  labelledBy: string;
  children: React.ReactNode;
}) {
  return (
    <section
      data-home-film=""
      aria-labelledby={labelledBy}
      className="group/film relative"
      // `data-seen` is set by the inline script, before hydration.
      suppressHydrationWarning
    >
      <script dangerouslySetInnerHTML={{ __html: SEEN_SCRIPT }} />
      <FilmStage />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

/**
 * One screen of the film. `hero` marks the first step, which stays when the
 * rest collapse for a returning visitor.
 */
export function FilmStep({
  hero = false,
  children,
}: {
  hero?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      data-film-step=""
      data-film-hero={hero ? "" : undefined}
      className={
        hero
          ? "flex min-h-[calc(100svh-3.5rem)] flex-col justify-end lg:justify-center"
          : "flex min-h-[100svh] flex-col justify-end group-data-[seen]/film:hidden lg:justify-center"
      }
    >
      {children}
    </div>
  );
}
