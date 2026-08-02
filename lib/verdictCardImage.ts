export type VerdictCardFormat = "twitter" | "instagram";

export interface VerdictCardImageData {
  topicTitle: string;
  winnerLabel: string;
  forScore: number;
  againstScore: number;
  drivingDimension: string | null;
  consensus: string;
  mode: "live" | "programmatic";
  format: VerdictCardFormat;
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function wrapTitle(title: string, maxCharacters: number): string[] {
  const words = title.trim().split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length <= maxCharacters || !line) line = candidate;
    else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 2);
}

/** Build the exact card that will be downloaded; kept pure for regression tests. */
export function buildVerdictCardSvg(data: VerdictCardImageData): string {
  const isInstagram = data.format === "instagram";
  const width = isInstagram ? 1080 : 1200;
  const height = isInstagram ? 1080 : 675;
  const padding = isInstagram ? 64 : 56;
  const titleSize = isInstagram ? 48 : 44;
  const titleY = isInstagram ? 180 : 142;
  const scoresY = isInstagram ? 535 : 324;
  const barX = padding + 106;
  const scoreX = width - padding - 54;
  const barWidth = scoreX - barX - 36;
  const forWidth = Math.max(0, Math.min(100, data.forScore * 10)) / 100 * barWidth;
  const againstWidth = Math.max(0, Math.min(100, data.againstScore * 10)) / 100 * barWidth;
  const winnerFill = data.winnerLabel === "FOR WINS"
    ? "#c4613c"
    : data.winnerLabel === "AGAINST WINS"
      ? "#4f7b77"
      : "#78716c";
  const sourceLabel = data.mode === "programmatic" ? "Programmatic rubric" : "AI judges";
  const titleSpans = wrapTitle(data.topicTitle, isInstagram ? 35 : 48)
    .map((line, index) => `<tspan x="${padding}" dy="${index === 0 ? 0 : titleSize * 1.16}">${escapeXml(line)}</tspan>`)
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#f4f1eb"/><rect width="${width}" height="6" fill="#c4613c"/>
  <rect x="${padding}" y="44" width="${Math.max(112, data.winnerLabel.length * 16 + 42)}" height="40" rx="20" fill="${winnerFill}"/>
  <text x="${padding + 20}" y="70" fill="#fff" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="2.5">${escapeXml(data.winnerLabel)}</text>
  <text x="${padding}" y="${titleY}" fill="#3d3a36" font-family="Georgia, serif" font-size="${titleSize}" font-weight="700">${titleSpans}</text>
  <text x="${padding}" y="${scoresY + 8}" fill="#c4613c" font-family="Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="2">FOR</text>
  <rect x="${barX}" y="${scoresY - 16}" width="${barWidth}" height="28" rx="14" fill="#e7e5df"/><rect x="${barX}" y="${scoresY - 16}" width="${forWidth}" height="28" rx="14" fill="#d06a47"/>
  <text x="${scoreX}" y="${scoresY + 8}" fill="#c4613c" font-family="monospace" font-size="28" font-weight="700">${data.forScore.toFixed(1)}</text>
  <text x="${padding}" y="${scoresY + 62}" fill="#4f7b77" font-family="Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="2">AGAINST</text>
  <rect x="${barX}" y="${scoresY + 38}" width="${barWidth}" height="28" rx="14" fill="#e7e5df"/><rect x="${barX}" y="${scoresY + 38}" width="${againstWidth}" height="28" rx="14" fill="#5d8d88"/>
  <text x="${scoreX}" y="${scoresY + 62}" fill="#4f7b77" font-family="monospace" font-size="28" font-weight="700">${data.againstScore.toFixed(1)}</text>
  ${data.drivingDimension ? `<text x="${padding}" y="${scoresY + 116}" fill="#78716c" font-family="Arial, sans-serif" font-size="16">Decisive factor: <tspan fill="#3d3a36" font-weight="600">${escapeXml(data.drivingDimension)}</tspan></text>` : ""}
  <text x="${width - padding}" y="${scoresY + 116}" text-anchor="end" fill="#78716c" font-family="Arial, sans-serif" font-size="16">${sourceLabel}: <tspan fill="#3d3a36" font-weight="600">${escapeXml(data.consensus)}</tspan></text>
  <line x1="${padding}" y1="${height - 94}" x2="${width - padding}" y2="${height - 94}" stroke="#e2ded7" stroke-width="2"/>
  <rect x="${padding}" y="${height - 72}" width="4" height="28" rx="2" fill="#c4613c"/>
  <text x="${padding + 16}" y="${height - 50}" fill="#4f7b77" font-family="Arial, sans-serif" font-size="22" letter-spacing="4">ARGUMEND</text>
  <text x="${width - padding}" y="${height - 50}" text-anchor="end" fill="#a8a29e" font-family="Arial, sans-serif" font-size="16">argumend.org</text>
</svg>`;
}

async function svgToPng(svg: string, width: number, height: number): Promise<Blob> {
  // The app CSP permits data images but intentionally rejects blob image URLs.
  const image = new Image();
  const loaded = new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Verdict card could not be rendered"));
  });
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  await loaded;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Image export is unavailable in this browser");
  context.drawImage(image, 0, 0, width, height);
  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => blob ? resolve(blob) : reject(new Error("PNG encoding failed")),
      "image/png",
    );
  });
}

export async function downloadVerdictCardImage(data: VerdictCardImageData, filename: string): Promise<void> {
  const width = data.format === "instagram" ? 1080 : 1200;
  const height = data.format === "instagram" ? 1080 : 675;
  const blob = await svgToPng(buildVerdictCardSvg(data), width, height);
  const url = URL.createObjectURL(blob);
  try {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } finally {
    URL.revokeObjectURL(url);
  }
}
