/**
 * DivergenceChart — the flagship's ten-second visual.
 *
 * Two small multiples on a shared time axis (deliberately NOT a dual-axis
 * chart — the two measures have different units). Panel A: observed U-3
 * unemployment, near-flat. Panel B: early-career employment in AI-exposed
 * occupations, indexed to late 2022 — drawn as a dashed two-point path
 * because the −16% is a cumulative estimate, not an observed monthly series.
 * The honesty of that dash is the point.
 *
 * Palette validated with the dataviz six-checks script (light: #0f9284 /
 * #a23b3b on #f4f1eb; dark: #17a091 / #e66767 on #1a1917 — all pass).
 * Single series per panel: identity via panel titles + direct labels.
 * Static SVG, no client JS — table equivalent provided via visually-hidden text.
 */

// U-3, December of each year + June 2026 (BLS, via the research corpus).
const U3_POINTS: Array<[label: string, value: number]> = [
  ["Dec ’22", 3.5],
  ["Dec ’23", 3.7],
  ["Dec ’24", 4.1],
  ["Dec ’25", 4.4],
  ["Jun ’26", 4.2],
];

// Panel geometry
const PANEL_W = 296;
const PANEL_H = 150;
const PAD_L = 34;
const PAD_R = 40;
const PAD_T = 28;
const PAD_B = 24;
const PLOT_W = PANEL_W - PAD_L - PAD_R;
const PLOT_H = PANEL_H - PAD_T - PAD_B;

function xAt(index: number, count: number): number {
  return PAD_L + (index / (count - 1)) * PLOT_W;
}

/** Map a value to y within [domainMin, domainMax] (higher value = higher on screen). */
function yAt(value: number, domainMin: number, domainMax: number): number {
  const t = (value - domainMin) / (domainMax - domainMin);
  return PAD_T + (1 - t) * PLOT_H;
}

export function DivergenceChart() {
  // Panel A: U-3 on a 0–8% domain (honest headroom; a zoomed axis would
  // manufacture drama the data doesn't have).
  const u3Path = U3_POINTS.map(([, v], i) => {
    const x = xAt(i, U3_POINTS.length);
    const y = yAt(v, 0, 8);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const u3First = { x: xAt(0, U3_POINTS.length), y: yAt(3.5, 0, 8) };
  const u3Last = {
    x: xAt(U3_POINTS.length - 1, U3_POINTS.length),
    y: yAt(4.2, 0, 8),
  };

  // Panel B: index 100 → 84 on an 80–104 domain.
  const idxStart = { x: xAt(0, 2), y: yAt(100, 80, 104) };
  const idxEnd = { x: xAt(1, 2), y: yAt(84, 80, 104) };

  return (
    <figure className="mt-5 surface-card rounded-lg p-4">
      <figcaption>
        <p className="font-medium text-[15px] text-stone-900 dark:text-stone-100">
          Two true numbers, one fight
        </p>
        <p className="mt-0.5 text-xs text-muted dark:text-stone-400">
          Overall unemployment stayed calm. Early-career employment in
          AI-exposed jobs slid. The entire debate lives in the gap.
        </p>
      </figcaption>
      <div className="mt-3 grid gap-4 sm:grid-cols-2" aria-hidden="true">
        {/* ---- Panel A: U-3 ---- */}
        <svg
          viewBox={`0 0 ${PANEL_W} ${PANEL_H}`}
          className="w-full h-auto"
          role="presentation"
        >
          <text
            x={PAD_L}
            y={14}
            className="fill-stone-700 dark:fill-stone-300"
            fontSize={11}
            fontWeight={600}
          >
            Overall unemployment (U-3)
          </text>
          {/* gridlines at 0/4/8% */}
          {[0, 4, 8].map((v) => (
            <g key={v}>
              <line
                x1={PAD_L}
                x2={PANEL_W - PAD_R}
                y1={yAt(v, 0, 8)}
                y2={yAt(v, 0, 8)}
                className="stroke-stone-300/60 dark:stroke-stone-600/40"
                strokeWidth={1}
              />
              <text
                x={PAD_L - 6}
                y={yAt(v, 0, 8) + 3}
                textAnchor="end"
                fontSize={9}
                className="fill-stone-500 dark:fill-stone-400"
              >
                {v}%
              </text>
            </g>
          ))}
          <path
            d={u3Path}
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-[#0f9284] dark:stroke-[#17a091]"
          />
          <circle
            cx={u3First.x}
            cy={u3First.y}
            r={3.5}
            className="fill-[#0f9284] dark:fill-[#17a091]"
          />
          <circle
            cx={u3Last.x}
            cy={u3Last.y}
            r={3.5}
            className="fill-[#0f9284] dark:fill-[#17a091]"
          />
          <text
            x={u3Last.x + 6}
            y={u3Last.y + 3}
            fontSize={11}
            fontWeight={600}
            className="fill-stone-800 dark:fill-stone-200"
          >
            4.2%
          </text>
          <text
            x={PAD_L}
            y={PANEL_H - 6}
            fontSize={9}
            className="fill-stone-500 dark:fill-stone-400"
          >
            Dec ’22
          </text>
          <text
            x={PANEL_W - PAD_R}
            y={PANEL_H - 6}
            textAnchor="end"
            fontSize={9}
            className="fill-stone-500 dark:fill-stone-400"
          >
            Jun ’26
          </text>
        </svg>

        {/* ---- Panel B: early-career index ---- */}
        <svg
          viewBox={`0 0 ${PANEL_W} ${PANEL_H}`}
          className="w-full h-auto"
          role="presentation"
        >
          <text
            x={PAD_L}
            y={14}
            className="fill-stone-700 dark:fill-stone-300"
            fontSize={11}
            fontWeight={600}
          >
            22–25s in AI-exposed jobs (index)
          </text>
          {[80, 90, 100].map((v) => (
            <g key={v}>
              <line
                x1={PAD_L}
                x2={PANEL_W - PAD_R}
                y1={yAt(v, 80, 104)}
                y2={yAt(v, 80, 104)}
                className="stroke-stone-300/60 dark:stroke-stone-600/40"
                strokeWidth={1}
              />
              <text
                x={PAD_L - 6}
                y={yAt(v, 80, 104) + 3}
                textAnchor="end"
                fontSize={9}
                className="fill-stone-500 dark:fill-stone-400"
              >
                {v}
              </text>
            </g>
          ))}
          <path
            d={`M${idxStart.x},${idxStart.y} L${idxEnd.x},${idxEnd.y}`}
            fill="none"
            strokeWidth={2}
            strokeDasharray="5 4"
            strokeLinecap="round"
            className="stroke-[#a23b3b] dark:stroke-[#e66767]"
          />
          <circle
            cx={idxStart.x}
            cy={idxStart.y}
            r={3.5}
            className="fill-[#a23b3b] dark:fill-[#e66767]"
          />
          <circle
            cx={idxEnd.x}
            cy={idxEnd.y}
            r={3.5}
            className="fill-[#a23b3b] dark:fill-[#e66767]"
          />
          <text
            x={idxStart.x + 6}
            y={idxStart.y - 6}
            fontSize={11}
            fontWeight={600}
            className="fill-stone-800 dark:fill-stone-200"
          >
            100
          </text>
          <text
            x={idxEnd.x + 6}
            y={idxEnd.y + 3}
            fontSize={11}
            fontWeight={600}
            className="fill-stone-800 dark:fill-stone-200"
          >
            84
          </text>
          {/* The headline delta, sized to carry the panel — the format admits
              this is an endpoint estimate, not an observed path. */}
          <text
            x={(idxStart.x + idxEnd.x) / 2}
            y={PAD_T + PLOT_H / 2 - 6}
            textAnchor="middle"
            fontSize={26}
            fontWeight={700}
            className="fill-[#a23b3b] dark:fill-[#e66767]"
          >
            −16%
          </text>
          <text
            x={PAD_L}
            y={PANEL_H - 6}
            fontSize={9}
            className="fill-stone-500 dark:fill-stone-400"
          >
            Late ’22
          </text>
          <text
            x={PANEL_W - PAD_R}
            y={PANEL_H - 6}
            textAnchor="end"
            fontSize={9}
            className="fill-stone-500 dark:fill-stone-400"
          >
            Mid ’26
          </text>
        </svg>
      </div>
      <p className="mt-2 text-[10px] leading-relaxed text-muted dark:text-stone-400">
        Left: BLS U-3, December values + June 2026. Right: relative employment of
        22–25-year-olds in the most AI-exposed occupations, indexed to late 2022
        (−16%, Stanford Digital Economy Lab / ADP) — dashed because it is a
        cumulative estimate, not an observed monthly path.
      </p>
      <p className="sr-only">
        Data table: U-3 unemployment — December 2022: 3.5%, December 2023: 3.7%,
        December 2024: 4.1%, December 2025: 4.4%, June 2026: 4.2%. Early-career
        AI-exposed employment index — late 2022: 100, mid 2026: 84 (a 16
        percent relative decline).
      </p>
    </figure>
  );
}
