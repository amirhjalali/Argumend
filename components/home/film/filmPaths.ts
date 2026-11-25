import { FILM } from "@/components/home/filmManifest";

export type FilmVariant = "desktop" | "mobile";
export type FilmThemeName = "light" | "dark";

/** localStorage: set once a visitor has scrolled the film to its end (or skipped it). */
export const FILM_SEEN_KEY = "argumend:home-film-seen";
/** Fired on `window` by the "Replay the intro" button; the stage listens. */
export const FILM_REPLAY_EVENT = "argumend:film-replay";
/** Fired on `window` by "Skip the intro". */
export const FILM_SKIP_EVENT = "argumend:film-skip";

export const BEAT_COUNT = FILM.beats.length;

/**
 * The upright frames: below the `lg` breakpoint on an upright screen. The
 * posters are laid out by the complement of this query (app/globals.css,
 * `[data-film-poster]`).
 */
export const FILM_MOBILE_QUERY =
  "(max-width: 1023px) and (max-aspect-ratio: 1/1)";

/** The theme whose frames exist: dark falls back to light until dark is rendered. */
export function filmTheme(wanted: FilmThemeName): FilmThemeName {
  return (FILM.themes as readonly string[]).includes(wanted) ? wanted : "light";
}

export const hasDarkFilm = (FILM.themes as readonly string[]).includes("dark");

/** Frame `index` is 0-based; files are 001.webp, 002.webp, … */
export function frameUrl(
  theme: FilmThemeName,
  variant: FilmVariant,
  index: number,
): string {
  const set = FILM[variant];
  return `${FILM.base}/${theme}/${set.dir}/${String(index + 1).padStart(3, "0")}.webp`;
}

/** The exact frame at beat `beat` (0-based), kept at a higher quality than the sequence. */
export function stillUrl(
  theme: FilmThemeName,
  variant: FilmVariant,
  beat: number,
): string {
  return `${FILM.base}/${theme}/still-${beat}-${FILM[variant].dir}.webp`;
}

/**
 * The order frames are fetched in: every 16th first, then the opening run,
 * then every 8th, and so on, so a scrub is coarse within a second and
 * sharpens as the rest arrive.
 * The last frame rides in the first pass so the ending is never missing.
 */
export function loadOrder(count: number): number[] {
  const seen = new Set<number>();
  const order: number[] = [];
  const push = (index: number) => {
    if (index < 0 || index >= count || seen.has(index)) return;
    seen.add(index);
    order.push(index);
  };
  push(0);
  push(count - 1);
  for (let index = 0; index < count; index += 16) push(index);
  // The opening frames next: the stage drifts over them while the page is at
  // the top, before anyone has scrolled.
  for (let index = 0; index < Math.ceil(count * 0.1); index += 1) push(index);
  for (const stride of [8, 4, 2, 1]) {
    for (let index = 0; index < count; index += stride) push(index);
  }
  return order;
}

/**
 * How many entries of `loadOrder` make the first pass: both ends, every 16th
 * frame and the opening run. They are fetched once the page has loaded; the
 * rest wait for the first scroll (or a few idle seconds), so a visitor who
 * never scrolls does not download the whole film.
 */
export function firstPassLength(count: number): number {
  const first = new Set<number>([0, count - 1]);
  for (let index = 0; index < count; index += 16) first.add(index);
  for (let index = 0; index < Math.ceil(count * 0.1); index += 1)
    first.add(index);
  return Math.min(count, first.size);
}

/** The loaded frame closest to `target`, or -1 when nothing has loaded yet. */
export function nearestLoaded(
  loaded: readonly boolean[],
  target: number,
): number {
  const count = loaded.length;
  const start = Math.min(count - 1, Math.max(0, Math.round(target)));
  for (let distance = 0; distance < count; distance += 1) {
    const below = start - distance;
    const above = start + distance;
    if (below >= 0 && loaded[below]) return below;
    if (above < count && loaded[above]) return above;
  }
  return -1;
}

/**
 * Where to draw an image so it covers a box, keeping the focal point
 * (0..1 on each axis) as close to the same place in the box as it can.
 */
export function coverRect(
  imageWidth: number,
  imageHeight: number,
  boxWidth: number,
  boxHeight: number,
  focalX: number,
  focalY: number,
): { x: number; y: number; width: number; height: number } {
  const scale = Math.max(boxWidth / imageWidth, boxHeight / imageHeight);
  const width = imageWidth * scale;
  const height = imageHeight * scale;
  return {
    x: (boxWidth - width) * focalX,
    y: (boxHeight - height) * focalY,
    width,
    height,
  };
}
