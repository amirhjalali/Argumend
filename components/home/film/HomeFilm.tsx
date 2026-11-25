import { FilmStage } from "@/components/home/film/FilmStage";
import {
  BEAT_COUNT,
  FILM_MOBILE_QUERY,
  FILM_SEEN_KEY,
  stillUrl,
} from "@/components/home/film/filmPaths";

/**
 * Runs before the section paints: a visitor who has already scrolled the film
 * gets the short home (hero only, last still) with no flash of the long one.
 * That still is their largest paint, so it is preloaded here; the `img` for it
 * stays lazy, because a first-time visitor never sees it.
 */
const SEEN_SCRIPT = `try{if(localStorage.getItem(${JSON.stringify(FILM_SEEN_KEY)})==="1"){document.currentScript.parentElement.setAttribute("data-seen","");var l=document.createElement("link");l.rel="preload";l.as="image";l.fetchPriority="high";l.href=matchMedia(${JSON.stringify(FILM_MOBILE_QUERY)}).matches?${JSON.stringify(stillUrl("light", "mobile", BEAT_COUNT - 1))}:${JSON.stringify(stillUrl("light", "desktop", BEAT_COUNT - 1))};document.head.appendChild(l)}}catch(e){}`;

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
