#!/usr/bin/env bash
# Render and encode the home film for one or both themes.
#
#   scripts/home-film/render.sh [light|dark|all]
#
# Environment (all optional):
#   BLENDER   path to Blender 5.x            (default: blender on PATH)
#   ENGINE    eevee | cycles                 (default: eevee)
#   DEVICE    cycles device: METAL, OPTIX, CUDA, HIP, CPU (default: METAL)
#   SAMPLES   override samples (default: eevee 48, cycles 256; stills eevee 64)
#   OUT       where raw PNGs go (default: $TMPDIR/argumend-film-png, outside the repo)
#   EXTRA     extra film.py flags, e.g. "--supersample 2 --fuzz 12000" (the v1 look)
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
repo="$(cd "$here/../.." && pwd)"
BLENDER="${BLENDER:-blender}"
ENGINE="${ENGINE:-eevee}"
DEVICE="${DEVICE:-METAL}"
SAMPLES="${SAMPLES:-0}"
OUT="${OUT:-${TMPDIR:-/tmp}/argumend-film-png}"
STILL_SAMPLES="$SAMPLES"
if [ "$SAMPLES" = "0" ] && [ "$ENGINE" = "eevee" ]; then STILL_SAMPLES=64; fi
which="${1:-all}"
themes=(light dark)
[ "$which" != "all" ] && themes=("$which")

EXTRA="${EXTRA:-}"
# shellcheck disable=SC2086
run() { "$BLENDER" -b -P "$here/film.py" -- --engine "$ENGINE" --device "$DEVICE" --samples "$1" $EXTRA "${@:2}"; }

for t in "${themes[@]}"; do
  run "$SAMPLES" --theme "$t" --variant d --count 150 --out "$OUT/$t/d" --skip-existing
  run "$SAMPLES" --theme "$t" --variant m --count 75 --out "$OUT/$t/m" --skip-existing
  for v in d m; do
    run "$STILL_SAMPLES" --theme "$t" --variant "$v" --ps 0,0.2,0.4,0.6,0.8,1 \
      --names still-0,still-1,still-2,still-3,still-4,still-5 --out "$OUT/$t/stills-$v"
  done
  node "$here/encode.mjs" --src "$OUT" --theme "$t"
done
