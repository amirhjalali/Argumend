# Home film

The home page's scroll film: the flagship argument ("Will AI cause mass
unemployment?", 54 claims) rendered in Blender as real thread on handmade
paper, then scrubbed by scroll as an image sequence
(`components/home/filmManifest.ts` describes what was rendered).

What the picture encodes, in every frame: 54 strands, 23 agreed (teal) and 31
contested (rust toward brown); from p = 0.6 on, five crimson crux knots that
share the contested strands in bundles of 7, 6, 6, 6, 6. The strand logic is a
port of the earlier 2D thread figure, `components/home/threadGeometry.ts`
(since removed from the repo; it is in git history), with the same seeded
generator and the same bundles, with depth, a pulled-tight knot and a 3D camera move added.

| p    | arrangement  | camera                                   |
|------|--------------|------------------------------------------|
| 0    | tangle       | low, oblique, close, shallow focus       |
| 0.2  | tangle       | pushed in and orbited                    |
| 0.4  | pulled tight | along the pull, knot in focus            |
| 0.6  | ground       | higher; teal lies flat, rust still knotted |
| 0.8  | cruxes       | higher still; five crimson knots          |
| 1    | map          | top-down, everything sharp               |

Each arrangement holds (only a slow drift) for p within 0.035 of its beat.
Camera distance and aim are fitted per beat (`fit_camera` in `film.py`) so
every thread on desktop stays right of x = 0.50 (the text column ends near
0.47) and the whole mobile subject sits in y 5% to 45% of the frame, centred.

## Files

- `film.py`: the Blender scene, animation and render loop (one process renders
  a whole sequence or a list of stills).
- `encode.mjs`: PNG to WebP with `sharp` from the repo's `node_modules`, chosen
  quality per set so desktop fits 8 MB and mobile 3 MB per theme; stills capped
  at 120 KB (desktop) and 60 KB (mobile).
- `render.sh`: renders and encodes everything for one or both themes.

## Commands

Everything, on this Mac (Eevee, about 4 to 5 s per desktop frame on an M4):

```bash
BLENDER=/opt/homebrew/bin/blender scripts/home-film/render.sh all
```

One theme, or Cycles on an NVIDIA box (OptiX denoiser, 256 samples):

```bash
BLENDER=blender ENGINE=cycles DEVICE=OPTIX SAMPLES=384 EXTRA="--supersample 2 --fuzz 12000" \
  scripts/home-film/render.sh light
BLENDER=blender ENGINE=cycles DEVICE=CUDA SAMPLES=512 scripts/home-film/render.sh dark
```

### What was used for v1: Cycles on an RTX 3090, encode on the Mac

The shipped frames were rendered with Cycles (OptiX device, OptiX denoiser,
384 adaptive samples, rendered at 2x size and scaled down by `encode.mjs`,
geometry-node fibre fuzz on the thread, about 7.3 s per desktop frame) on a
Linux box with an RTX 3090 and Blender 5.2.3, then encoded on the Mac (the box
has no WebP encoder). From the repo root on the Mac (`pc` is the SSH host alias):

```bash
rsync -a --delete scripts/home-film/ pc:~/argumend-film/scripts/
ssh pc 'B=~/blender-5.2.3-linux-x64/blender; S=~/argumend-film/scripts/film.py; O=~/argumend-film/png
  C="--engine cycles --device OPTIX --samples 384 --supersample 2 --fuzz 12000"
  for T in light dark; do
    $B -b -P $S -- $C --theme $T --variant d --count 150 --out $O/$T/d --skip-existing
    $B -b -P $S -- $C --theme $T --variant m --count 75 --out $O/$T/m --skip-existing
    for v in d m; do
      $B -b -P $S -- $C --theme $T --variant $v --ps 0,0.2,0.4,0.6,0.8,1 \
        --names still-0,still-1,still-2,still-3,still-4,still-5 --out $O/$T/stills-$v
    done
  done'
rsync -a pc:~/argumend-film/png/ /tmp/film-png/
node scripts/home-film/encode.mjs --src /tmp/film-png --theme light
node scripts/home-film/encode.mjs --src /tmp/film-png --theme dark
```

Run it inside `tmux` (or `nohup`) on the box so a dropped SSH session does not
stop the render. If OptiX runs out of GPU memory, use `--device CUDA`.

The view exposure is calibrated per theme so open paper lands on the page
colour: (244, 241, 235) light, (26, 25, 23) dark. Eevee and Cycles agree on it;
`--exposure` overrides it.

Single pieces:

```bash
# six look-dev stills, desktop, light, half size
blender -b -P scripts/home-film/film.py -- --theme light --variant d \
  --ps 0,0.2,0.4,0.6,0.8,1 --names s0,s1,s2,s3,s4,s5 --out /tmp/film --percent 50
# the desktop sequence (frame f is p = (f - 1) / 149)
blender -b -P scripts/home-film/film.py -- --theme dark --variant d --count 150 --out /tmp/film/dark/d
# the mobile sequence (75 frames, its own camera)
blender -b -P scripts/home-film/film.py -- --theme dark --variant m --count 75 --out /tmp/film/dark/m
# encode one theme from <root>/<theme>/{d,m,stills-d,stills-m}
node scripts/home-film/encode.mjs --src /tmp/film --theme dark
```

Other flags: `--supersample N` renders at N times the delivery size (the
encoder scales down), `--fuzz D` adds stray fibres at D per square unit of
thread surface (Cycles renders them as hair; Eevee shows them as thin curves),
`--first/--last` render part of a sequence, `--skip-existing`
resumes, `--save-blend file.blend` saves the scene for inspection, `--engine`
and `--device` pick the renderer.

After re-rendering, update `components/home/filmManifest.ts` only if frame
counts, sizes or the list of complete themes changed.
