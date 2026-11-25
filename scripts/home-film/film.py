"""
Home film: the flagship argument ("Will AI cause mass unemployment?", 54 claims)
rendered as real thread on handmade paper, sampled as an image sequence that the
home page scrubs with scroll.

Run headless (see README.md in this folder):

  blender -b -P scripts/home-film/film.py -- --theme light --variant d \
      --count 150 --out /path/to/png/light/d

Film progress p runs 0..1. Six beats sit at p = 0, .2, .4, .6, .8, 1 and the
arrangement holds (with a subtle drift only) for p +-0.035 around each one.

Arrangements (ported, with depth, from the earlier 2D thread figure in
components/home/threadGeometry.ts, since removed; see git history):
  0 tangle   loose and voluminous, every claim mixed
  1 knot     both ends pulled outward and taut, the middle a hard knot
  2 ground   the 23 agreed strands lie flat; the 31 contested stay knotted
  3 cruxes   the contested strands pass through five crimson knots (7,6,6,6,6)
  4 map      the tree: agreed trunk forking at the question into the cruxes
Beats 0 and 1 share arrangement 0; beat 1 is a camera move.
"""

import argparse
import math
import os
import sys
import time

import bpy
import numpy as np
from mathutils import Matrix, Vector

TAU = math.pi * 2
M32 = 0xFFFFFFFF

# ---------------------------------------------------------------- arguments
argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
ap = argparse.ArgumentParser()
ap.add_argument("--theme", default="light", choices=["light", "dark"])
ap.add_argument("--variant", default="d", choices=["d", "m"])
ap.add_argument("--engine", default="eevee", choices=["eevee", "cycles"])
ap.add_argument("--device", default="METAL", help="cycles only: METAL, CUDA, OPTIX, HIP, CPU")
ap.add_argument("--samples", type=int, default=0, help="0 = engine default for this script")
ap.add_argument("--count", type=int, default=0, help="frames in the sequence (150 desktop, 75 mobile)")
ap.add_argument("--first", type=int, default=1, help="first frame to render (1-based)")
ap.add_argument("--last", type=int, default=0, help="last frame to render (0 = count)")
ap.add_argument("--ps", default="", help="comma list of p values to render as stills instead")
ap.add_argument("--names", default="", help="comma list of file stems for --ps")
ap.add_argument("--out", required=True)
ap.add_argument("--percent", type=int, default=100, help="resolution percentage (look-dev)")
ap.add_argument("--fuzz", type=float, default=0.0,
                help="fibre fuzz density per square unit of thread surface (0 = off; renders as hair in Cycles)")
ap.add_argument("--supersample", type=int, default=1, help="render at N x the delivery size (encode.mjs scales down)")
ap.add_argument("--save-blend", default="")
ap.add_argument("--skip-existing", action="store_true")
ap.add_argument("--exposure", type=float, default=None,
                help="override the view exposure (default: per engine, calibrated so open paper lands on its hex)")
args = ap.parse_args(argv)

# ---------------------------------------------------------------- counts
AGREED, CONTESTED, CRUXES = 23, 31, 5
TOTAL = AGREED + CONTESTED
N = 240  # points per strand
K = 10  # sides per strand tube
W, H = 2.0, 1.3  # world size of the unit box
BEATS = [0.0, 0.2, 0.4, 0.6, 0.8, 1.0]
ARRANGEMENT_AT_BEAT = [0, 0, 1, 2, 3, 4]
HOLD = 0.035
KNOT_R = 0.068  # crux bead radius
KZ = KNOT_R  # height of a crux knot's centre above the paper


def hex_lin(h):
    h = h.lstrip("#")
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c]


THEMES = {
    # Lighting is a sun (soft, upper left, long shadows) plus an even sky. The
    # two add to an irradiance of about 1 on open paper, so the paper renders
    # at its own hex in every beat and matches the page behind the film.
    "light": dict(
        paper="#f4f1eb", teal="#3a6965", rust="#C4613C", brown="#8B5A3C", crimson="#a23b3b",
        sun=(1.0, 0.985, 0.97), sun_share=0.62, sky=(0.96, 0.975, 1.0), sky_share=0.38,
        exposure=0.87, exposure_cycles=0.87, thread_gain=1.1,
    ),
    "dark": dict(
        paper="#1a1917", teal="#7aa8a3", rust="#d4805f", brown="#a8735a", crimson="#c96a6a",
        sun=(1.0, 0.95, 0.9), sun_share=0.8, sky=(0.85, 0.9, 1.0), sky_share=0.2,
        exposure=1.22, exposure_cycles=1.22, thread_gain=1.0,
    ),
}
SUN_ELEVATION = math.radians(34.0)
SUN_AZIMUTH = math.radians(135.0)  # from upper left (-X, +Y)
TH = THEMES[args.theme]


# ---------------------------------------------------------------- strands (port of buildStrands)
def seeded(seed):
    state = [seed & M32]

    def imul(a, b):
        return (a * b) & M32

    def rnd():
        state[0] = (state[0] + 0x6D2B79F5) & M32
        t = state[0]
        t = imul(t ^ (t >> 15), t | 1)
        t ^= (t + imul(t ^ (t >> 7), t | 61)) & M32
        return ((t ^ (t >> 14)) & M32) / 4294967296

    return rnd


def build_strands(seed=20261110):
    random = seeded(seed)
    sizes = [CONTESTED // CRUXES + (1 if k < CONTESTED % CRUXES else 0) for k in range(CRUXES)]
    order = []
    a = c = 0
    while a < AGREED or c < CONTESTED:
        if c < CONTESTED:
            order.append("contested")
            c += 1
        if a < AGREED:
            order.append("agreed")
            a += 1
    lanes = [i / (TOTAL - 1) for i in range(TOTAL)]
    for i in range(len(lanes) - 1, 0, -1):
        j = int(random() * (i + 1))
        lanes[i], lanes[j] = lanes[j], lanes[i]
    out = []
    a_slot = c_slot = 0
    for index, group in enumerate(order):
        knot, knot_slot, knot_size = -1, 0, 1
        if group == "contested":
            slot = c_slot
            c_slot += 1
            knot = slot % CRUXES
            knot_slot = slot // CRUXES
            knot_size = sizes[knot]
        else:
            slot = a_slot
            a_slot += 1
        s = dict(index=index, group=group, slot=slot, knot=knot, knot_slot=knot_slot,
                 knot_size=knot_size, lane=lanes[index], delay=random(), width=0.9 + random() * 0.9)
        s["f"] = [0.8 + random() * 1.5, 1.6 + random() * 2.1, 0.7 + random() * 1.6, 1.5 + random() * 2.2]
        s["phase"] = [random() * TAU for _ in range(4)]
        out.append(s)
    return out, sizes


STRANDS, KNOT_SIZES = build_strands()
assert len(STRANDS) == 54 and sum(s["group"] == "agreed" for s in STRANDS) == 23
assert KNOT_SIZES == [7, 6, 6, 6, 6]
RADIUS = np.array([0.0086 * (0.85 + 0.35 * (s["width"] - 0.9) / 0.9) for s in STRANDS])
T = np.linspace(0.0, 1.0, N)


def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0.0, 1.0)
    return t * t * (3 - 2 * t)


def smoother(x):
    x = np.clip(x, 0.0, 1.0)
    return x * x * x * (x * (x * 6 - 15) + 10)


def knot_center(k):
    step = k / (CRUXES - 1)
    return 0.36 + step * 0.28, 0.07 + step * 0.5


TREE_ROOT = (0.3, 0.5)


def tree_node(k):
    return 0.6, 0.1 + (k / (CRUXES - 1)) * 0.8


def to_world(u, v):
    return (u - 0.5) * W, (0.5 - v) * H


def tangle(s, amp, pull, cy, lt, lb, tt=None):
    T = globals()["T"] if tt is None else tt
    env = np.sin(math.pi * T) ** 1.15
    lane_y = lt + s["lane"] * (lb - lt)
    f1, f2, f3, f4 = s["f"]
    p1, p2, p3, p4 = s["phase"]
    du = np.sin(TAU * f1 * T + p1) * 0.55 + np.sin(TAU * f2 * T + p2) * 0.3
    dv = np.cos(TAU * f3 * T + p3) * 0.55 + np.sin(TAU * f4 * T + p4) * 0.32
    u = T + (0.5 - T) * env * pull + env * amp * du
    v = lane_y + (cy - lane_y) * env * pull + env * amp * dv * 1.25
    return u, v, env


def ball(s, center, rk, a=0.34, b=0.66, end_x=1.1, end_spread=0.3, end_cy=0.0, wraps=1.0):
    """A hard knot: the strand runs taut from a pulled end into a ball of wraps."""
    f1, f2, f3, f4 = s["f"]
    p1, p2, p3, p4 = s["phase"]
    out = np.zeros((N, 3))
    inside = (T >= a) & (T <= b)
    sv = (T - a) / (b - a)
    th = p1 + TAU * (1.4 + f1) * sv * wraps
    ph = np.arccos(np.cos(p2 + TAU * (0.9 + f3 * 0.8) * sv * wraps))
    rad = rk * (0.55 + 0.45 * (0.5 + 0.5 * np.sin(TAU * f4 * sv + p4)))
    # a knot is lumpy, not a sphere
    rad = rad * (1 + 0.16 * np.sin(2 * th + 1.3) * np.sin(3 * ph + 0.4) + 0.08 * np.sin(5 * th - 2 * ph))
    bp = np.stack([
        center[0] + rad * np.sin(ph) * np.cos(th),
        center[1] + rad * np.sin(ph) * np.sin(th),
        center[2] + rad * np.cos(ph) * 0.85,
    ], axis=1)
    out[inside] = bp[inside]
    y_end = end_cy + (0.5 - s["lane"]) * H * end_spread
    e = END[s["index"]]
    left = np.array([-end_x * (1 + 0.06 * e["jx"]), y_end + 0.02 * e["jy"], 0.0])
    right = np.array([end_x * (1 + 0.06 * e["jy"]), y_end - 0.02 * e["jx"], 0.0])
    b0 = bp[np.argmax(inside)]
    b1 = bp[N - 1 - np.argmax(inside[::-1])]
    m = T < a
    w = (T[m] / a)[:, None]
    out[m] = left * (1 - w) + b0 * w
    m = T > b
    w = ((T[m] - b) / (1 - b))[:, None]
    out[m] = b1 * (1 - w) + right * w
    return out


END_RNG = [np.random.default_rng(900 + i) for i in range(TOTAL)]
END = [dict(a=g.uniform(0.0, 0.16), b=g.uniform(0.84, 1.0), amp=g.uniform(0.25, 1.0),
            th0=g.uniform(0, TAU), th1=g.uniform(0, TAU), k0=g.uniform(2.5, 7.0) * g.choice([-1, 1]),
            k1=g.uniform(2.5, 7.0) * g.choice([-1, 1]), jx=g.uniform(-1, 1), jy=g.uniform(-1, 1),
            len0=g.uniform(0.0, 1.0), len1=g.uniform(0.0, 1.0)) for g in END_RNG]


def loose_ends(P, s, amp, zone=0.11, lay=True):
    """Ends that curl or trail off irregularly instead of stopping on one line."""
    e = END[s["index"]]
    w0 = np.clip(1 - T / zone, 0, 1) ** 1.4
    w1 = np.clip(1 - (1 - T) / zone, 0, 1) ** 1.4
    for w, th, k, sc in ((w0, e["th0"], e["k0"], e["amp"]), (w1, e["th1"], e["k1"], 1.25 - e["amp"])):
        P[:, 0] += amp * sc * w * np.cos(th + k * w)
        P[:, 1] += amp * sc * w * np.sin(th + k * w)
    if lay:  # the last stretch of a loose end lies on the paper
        P[:, 2] *= smoothstep(0.0, zone * 0.9, T) * smoothstep(1.0, 1.0 - zone * 0.9, T)
    return P


def arrangement(state, s):
    r = RADIUS[s["index"]]
    P = np.zeros((N, 3))
    agreed = s["group"] == "agreed"
    if state == 0:
        e = END[s["index"]]
        tt = e["a"] + (e["b"] - e["a"]) * T  # each strand ends somewhere else
        u, v, env = tangle(s, 0.27, 0.62, 0.5, 0.12, 0.88, tt)
        u = 0.5 + (u - 0.5) * 0.64  # a compact ball of loose loops
        v = 0.5 + (v - 0.5) * 0.8
        p1, p2, p3, p4 = s["phase"]
        f1, f2, f3, f4 = s["f"]
        x, y = to_world(u, v)
        z = env * 0.76 * (0.5 + 0.5 * np.sin(TAU * f2 * 0.55 * tt + p3)) * (0.65 + 0.35 * np.cos(TAU * f1 * 0.5 * tt + p4))
        P[:, 0], P[:, 1], P[:, 2] = x, y, z
        P = loose_ends(P, s, 0.07)
    elif state == 1:
        P = ball(s, (0.0, 0.0, 0.215), 0.24, a=0.3, b=0.7, end_x=1.45, end_spread=0.14, wraps=2.2)
        P = loose_ends(P, s, 0.025, zone=0.05, lay=False)
    elif state in (2, 3) and agreed:
        v = 0.64 + (s["slot"] / (AGREED - 1)) * 0.36
        e = END[s["index"]]
        u0, u1 = -0.02 + 0.035 * e["len0"], 1.02 - 0.035 * e["len1"]  # not cut to one length
        u = u0 + T * (u1 - u0)
        x, y = to_world(u, v)
        y = y + 0.0015 * np.sin(TAU * 1.3 * T + s["phase"][0])
        P[:, 0], P[:, 1], P[:, 2] = x, y, 0.0
    elif state == 2:
        cy = (0.5 - 0.33) * H
        P = ball(s, (0.0, cy, 0.11), 0.125, a=0.3, b=0.7, end_x=1.1, end_spread=0.16, end_cy=cy, wraps=2.0)
        P = loose_ends(P, s, 0.03, zone=0.06, lay=False)
    elif state == 3:
        ku, kv = knot_center(s["knot"])
        spread = s["knot_slot"] / (s["knot_size"] - 1) - 0.5 if s["knot_size"] > 1 else 0.0
        reach = np.where(T < ku, (ku - T) / ku, (T - ku) / (1 - ku))
        u = -0.02 + T * 1.04
        v = kv + spread * 0.11 * reach ** 0.85
        x, y = to_world(u, v)
        # the strand meets the knot at its centre; resample so u = ku lands on a point
        P[:, 0], P[:, 1], P[:, 2] = x, y, KZ * (1 - reach) ** 1.6
    else:
        ru, rv = TREE_ROOT
        if agreed:
            offset = s["slot"] / (AGREED - 1) - 0.5
            u = -0.02 + T * (ru + 0.02)
            v = rv + offset * (0.3 - 0.21 * smoothstep(0.35, 1, T))
            x, y = to_world(u, v)
            P[:, 0], P[:, 1], P[:, 2] = x, y, 0.0006 * (s["slot"] % 4)
        else:
            nu, nv = tree_node(s["knot"])
            band = 0.8 / (CRUXES - 1)
            spread = s["knot_slot"] / (s["knot_size"] - 1) - 0.5 if s["knot_size"] > 1 else 0.0
            leaf_v = nv + spread * band * 0.72
            u = np.zeros(N)
            v = np.zeros(N)
            m = T < 0.5
            sv = T[m] * 2
            u[m] = ru + (nu - ru) * sv
            v[m] = rv + (nv - rv) * smoothstep(0, 1, sv)
            m = ~m
            sv = (T[m] - 0.5) * 2
            u[m] = nu + (1.02 - nu) * sv
            v[m] = nv + (leaf_v - nv) * smoothstep(0, 1, sv)
            x, y = to_world(u, v)
            P[:, 0], P[:, 1] = x, y
            P[:, 2] = KZ * np.exp(-((T - 0.5) / 0.05) ** 2)
    P[:, 2] = np.maximum(P[:, 2], 0.0) + r
    return P


ARR = np.stack([np.stack([arrangement(st, s) for s in STRANDS]) for st in range(5)])  # (5,54,N,3)
DELAY = np.array([s["delay"] for s in STRANDS])
IS_AGREED = np.array([s["group"] == "agreed" for s in STRANDS])
# Drift amplitude per arrangement (world units): the tangle is restless, the map is still.
DRIFT = np.array([
    [0.010, 0.010],
    [0.0025, 0.0025],
    [0.0006, 0.004],
    [0.0004, 0.0012],
    [0.0003, 0.0003],
])  # columns: agreed, contested
LIFT = [0.0, 0.03, 0.06, 0.05, 0.05]  # how far strands lift off the paper moving into arrangement i
rng = np.random.default_rng(7)
DRIFT_F = rng.uniform(0.6, 1.6, size=(TOTAL, 3))
DRIFT_P = rng.uniform(0, TAU, size=(TOTAL, 3))
DRIFT_K = rng.uniform(1.0, 3.0, size=(TOTAL, 3))


def segment(p):
    """Which beat segment p falls in and the held, eased local progress."""
    p = min(max(p, 0.0), 1.0)
    i = min(int(p / 0.2), 4)
    s = (p - 0.2 * i) / 0.2
    h = HOLD / 0.2
    u = min(max((s - h) / (1 - 2 * h), 0.0), 1.0)
    return i, u


def strands_at(p):
    i, u = segment(p)
    a0, a1 = ARRANGEMENT_AT_BEAT[i], ARRANGEMENT_AT_BEAT[i + 1]
    w = smoother((u - DELAY * 0.35) / 0.65)  # per-strand stagger
    P = ARR[a0] * (1 - w)[:, None, None] + ARR[a1] * w[:, None, None]
    if a0 != a1:
        moved = np.linalg.norm(ARR[a1] - ARR[a0], axis=2).mean(axis=1)
        lift = LIFT[a1] * np.minimum(1.0, moved / 0.08) * 4 * w * (1 - w)
        P[:, :, 2] += lift[:, None] * np.sin(math.pi * T)[None, :]
    amp_a = DRIFT[a0] * (1 - w[:, None]) + DRIFT[a1] * w[:, None]
    amp = np.where(IS_AGREED, amp_a[:, 0], amp_a[:, 1])
    tau = p * 7.0
    env = np.sin(math.pi * T) ** 0.8
    for d in range(3):
        P[:, :, d] += (amp[:, None] * env[None, :]) * np.sin(
            TAU * (tau * DRIFT_F[:, d][:, None] + T[None, :] * DRIFT_K[:, d][:, None]) + DRIFT_P[:, d][:, None])
    P[:, :, 2] = np.maximum(P[:, :, 2], RADIUS[:, None] * 0.98)
    return P


# ---------------------------------------------------------------- crux knots
def knot_positions(p):
    i, u = segment(p)
    a0, a1 = ARRANGEMENT_AT_BEAT[i], ARRANGEMENT_AT_BEAT[i + 1]
    w = float(smoother((u - 0.175) / 0.65))

    def at(arr):
        pts = []
        for k in range(CRUXES):
            if arr >= 4:
                cu, cv = tree_node(k)
            else:
                cu, cv = knot_center(k)
                cu = -0.02 + cu * 1.04  # where the strands' hourglass pinches
            x, y = to_world(cu, cv)
            pts.append(np.array([x, y, KZ]))
        return pts

    pa, pb = at(a0), at(a1)
    pos = [pa[k] * (1 - w) + pb[k] * w for k in range(CRUXES)]
    # scale in between beats .6 and .8
    if p <= 0.6 + HOLD:
        scale = 0.0
    elif p >= 0.8 - HOLD:
        scale = 1.0
    else:
        x = (p - 0.6 - HOLD) / (0.2 - 2 * HOLD)
        scale = float(smoother(np.array((x - 0.25) / 0.75)))
    return pos, scale


# ---------------------------------------------------------------- tube mesh
def frames(P):
    """Rotation-minimising frames for (S,N,3) centrelines."""
    Tg = np.gradient(P, axis=1)
    Tg /= np.linalg.norm(Tg, axis=2, keepdims=True) + 1e-12
    S = P.shape[0]
    Nn = np.zeros_like(P)
    up = np.array([0.0, 0.0, 1.0])
    n0 = np.cross(Tg[:, 0], up)
    bad = np.linalg.norm(n0, axis=1) < 1e-4
    n0[bad] = np.cross(Tg[bad, 0], np.array([0.0, 1.0, 0.0]))
    n0 /= np.linalg.norm(n0, axis=1, keepdims=True)
    Nn[:, 0] = n0
    for i in range(1, P.shape[1]):
        n = Nn[:, i - 1] - (Nn[:, i - 1] * Tg[:, i]).sum(1)[:, None] * Tg[:, i]
        ln = np.linalg.norm(n, axis=1, keepdims=True)
        n = np.where(ln > 1e-8, n / np.maximum(ln, 1e-12), Nn[:, i - 1])
        Nn[:, i] = n
    B = np.cross(Tg, Nn)
    return Tg, Nn, B


ANG = np.linspace(0, TAU, K, endpoint=False)
COS, SIN = np.cos(ANG), np.sin(ANG)


def tube_points(P, radius_profile):
    _, Nn, B = frames(P)
    ring = (COS[None, None, :, None] * Nn[:, :, None, :] + SIN[None, None, :, None] * B[:, :, None, :])
    return P[:, :, None, :] + radius_profile[:, :, None, None] * ring  # (S,N,K,3)


def tube_faces(S, n, closed=False):
    faces = []
    seg = n if closed else n - 1
    for s in range(S):
        base = s * n * K
        for i in range(seg):
            i2 = (i + 1) % n
            for j in range(K):
                j2 = (j + 1) % K
                faces.append((base + i * K + j, base + i2 * K + j, base + i2 * K + j2, base + i * K + j2))
    return faces


def arc_length(P):
    d = np.linalg.norm(np.diff(P, axis=1), axis=2)
    return np.concatenate([np.zeros((P.shape[0], 1)), np.cumsum(d, axis=1)], axis=1)


TAPER = np.maximum(0.3, smoothstep(0, 0.012, T) * smoothstep(1, 0.988, T))
RPROF = RADIUS[:, None] * (0.25 + 0.75 * TAPER[None, :])


def make_mesh(name, S, n, closed, colors, mat):
    me = bpy.data.meshes.new(name)
    verts = np.zeros((S * n * K, 3))
    me.vertices.add(S * n * K)
    faces = tube_faces(S, n, closed)
    me.loops.add(len(faces) * 4)
    me.polygons.add(len(faces))
    me.loops.foreach_set("vertex_index", np.array(faces, dtype=np.int32).ravel())
    me.polygons.foreach_set("loop_start", np.arange(0, len(faces) * 4, 4, dtype=np.int32))
    me.polygons.foreach_set("loop_total", np.full(len(faces), 4, dtype=np.int32))
    me.vertices.foreach_set("co", verts.ravel())
    me.update(calc_edges=True)
    me.validate()
    me.polygons.foreach_set("use_smooth", np.ones(len(faces), dtype=bool))
    col = me.color_attributes.new("col", "FLOAT_COLOR", "POINT")
    cols = np.repeat(np.asarray(colors, dtype=np.float32), n * K, axis=0)
    col.data.foreach_set("color", np.concatenate([cols, np.ones((len(cols), 1), np.float32)], 1).ravel())
    for nm in ("arc", "rc", "rs", "seed"):
        me.attributes.new(nm, "FLOAT", "POINT")
    me.attributes["rc"].data.foreach_set("value", np.tile(COS, S * n).astype(np.float32))
    me.attributes["rs"].data.foreach_set("value", np.tile(SIN, S * n).astype(np.float32))
    me.attributes["seed"].data.foreach_set(
        "value", np.repeat(np.arange(S, dtype=np.float32) * 0.6180339, n * K))
    ob = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(ob)
    me.materials.append(mat)
    return ob


def set_mesh(ob, pts, arc):
    me = ob.data
    me.attributes["position"].data.foreach_set("vector", pts.reshape(-1).astype(np.float32))
    me.attributes["arc"].data.foreach_set("value", np.repeat(arc.reshape(-1), K).astype(np.float32))
    me.update()


# ---------------------------------------------------------------- materials
def node(nt, kind, **inputs):
    n = nt.nodes.new(kind)
    for k, v in inputs.items():
        if k.startswith("_"):
            setattr(n, k[1:], v)
        else:
            n.inputs[k].default_value = v
    return n


def math_node(nt, op, a=None, b=None, c=None):
    n = nt.nodes.new("ShaderNodeMath")
    n.operation = op
    for idx, val in enumerate((a, b, c)):
        if val is None:
            continue
        if isinstance(val, (int, float)):
            n.inputs[idx].default_value = val
        else:
            nt.links.new(val, n.inputs[idx])
    return n.outputs[0]


def fuzz_material():
    mat = bpy.data.materials.new("fuzz")
    mat.use_nodes = True
    nt = mat.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled")
    col = node(nt, "ShaderNodeAttribute", _attribute_name="col")
    lift = nt.nodes.new("ShaderNodeVectorMath")
    lift.operation = "SCALE"
    nt.links.new(col.outputs["Color"], lift.inputs[0])
    lift.inputs["Scale"].default_value = 1.15
    nt.links.new(lift.outputs[0], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = 0.6
    bsdf.inputs["Specular IOR Level"].default_value = 0.2
    nt.links.new(bsdf.outputs[0], out.inputs["Surface"])
    return mat


def add_fuzz(ob, density):
    """Short stray fibres standing off the thread surface, as geometry nodes curves."""
    ng = bpy.data.node_groups.new("fuzz", "GeometryNodeTree")
    ng.interface.new_socket("Geometry", in_out="INPUT", socket_type="NodeSocketGeometry")
    ng.interface.new_socket("Geometry", in_out="OUTPUT", socket_type="NodeSocketGeometry")
    N_ = ng.nodes
    L = ng.links
    gi = N_.new("NodeGroupInput")
    go = N_.new("NodeGroupOutput")
    dist = N_.new("GeometryNodeDistributePointsOnFaces")
    dist.inputs["Density"].default_value = density
    L.new(gi.outputs[0], dist.inputs["Mesh"])
    line = N_.new("GeometryNodeCurvePrimitiveLine")
    line.inputs["Start"].default_value = (0, 0, 0)
    line.inputs["End"].default_value = (0, 0, 1)
    res = N_.new("GeometryNodeResampleCurve")
    res.inputs["Count"].default_value = 3
    L.new(line.outputs[0], res.inputs["Curve"])
    rnd_dir = N_.new("FunctionNodeRandomValue")
    rnd_dir.data_type = "FLOAT_VECTOR"
    rnd_dir.inputs["Min"].default_value = (-0.8, -0.8, -0.8)
    rnd_dir.inputs["Max"].default_value = (0.8, 0.8, 0.8)
    add = N_.new("ShaderNodeVectorMath")
    add.operation = "ADD"
    L.new(dist.outputs["Normal"], add.inputs[0])
    L.new(rnd_dir.outputs["Value"], add.inputs[1])
    align = N_.new("FunctionNodeAlignEulerToVector")
    align.axis = "Z"
    L.new(add.outputs[0], align.inputs["Vector"])
    rnd_len = N_.new("FunctionNodeRandomValue")
    rnd_len.data_type = "FLOAT"
    rnd_len.inputs["Min"].default_value = 0.002
    rnd_len.inputs["Max"].default_value = 0.0075
    inst = N_.new("GeometryNodeInstanceOnPoints")
    L.new(dist.outputs["Points"], inst.inputs["Points"])
    L.new(res.outputs[0], inst.inputs["Instance"])
    L.new(align.outputs[0], inst.inputs["Rotation"])
    L.new(rnd_len.outputs["Value"], inst.inputs["Scale"])
    real = N_.new("GeometryNodeRealizeInstances")
    L.new(inst.outputs[0], real.inputs[0])
    rad = N_.new("GeometryNodeSetCurveRadius")
    rad.inputs["Radius"].default_value = 0.00022
    L.new(real.outputs[0], rad.inputs["Curve"])
    setm = N_.new("GeometryNodeSetMaterial")
    setm.inputs["Material"].default_value = fuzz_material()
    L.new(rad.outputs[0], setm.inputs["Geometry"])
    join = N_.new("GeometryNodeJoinGeometry")
    L.new(gi.outputs[0], join.inputs[0])
    L.new(setm.outputs[0], join.inputs[0])
    L.new(join.outputs[0], go.inputs[0])
    mod = ob.modifiers.new("fuzz", "NODES")
    mod.node_group = ng


def thread_material():
    mat = bpy.data.materials.new("thread")
    mat.use_nodes = True
    nt = mat.node_tree
    nt.nodes.clear()
    L = nt.links
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled")
    col = node(nt, "ShaderNodeAttribute", _attribute_name="col")
    arc = node(nt, "ShaderNodeAttribute", _attribute_name="arc")
    rc = node(nt, "ShaderNodeAttribute", _attribute_name="rc")
    rs = node(nt, "ShaderNodeAttribute", _attribute_name="rs")
    seed = node(nt, "ShaderNodeAttribute", _attribute_name="seed")
    ang = math_node(nt, "ARCTAN2", rs.outputs["Fac"], rc.outputs["Fac"])
    ph = math_node(nt, "MULTIPLY", arc.outputs["Fac"], TAU * 34.0)
    ph = math_node(nt, "MULTIPLY_ADD", ang, 3.0, ph)
    ph = math_node(nt, "ADD", ph, math_node(nt, "MULTIPLY", seed.outputs["Fac"], 40.0))
    sn = math_node(nt, "SINE", ph)
    ply = math_node(nt, "MULTIPLY_ADD", sn, 0.5, 0.5)
    ply = math_node(nt, "POWER", ply, 0.7)
    geo = nt.nodes.new("ShaderNodeNewGeometry")
    fuzz = node(nt, "ShaderNodeTexNoise", Scale=1400.0, Detail=3.0, Roughness=0.6)
    L.new(geo.outputs["Position"], fuzz.inputs["Vector"])
    fine = math_node(nt, "MULTIPLY_ADD", fuzz.outputs["Fac"], 0.35, 0.82)
    shade = math_node(nt, "MULTIPLY_ADD", ply, 0.30, 0.78)
    shade = math_node(nt, "MULTIPLY", shade, fine)
    base = nt.nodes.new("ShaderNodeVectorMath")
    base.operation = "SCALE"
    L.new(col.outputs["Color"], base.inputs[0])
    L.new(shade, base.inputs["Scale"])
    L.new(base.outputs[0], bsdf.inputs["Base Color"])
    # tinted sheen: fuzz catches the light in the thread's own colour, not white
    tint = nt.nodes.new("ShaderNodeVectorMath")
    tint.operation = "SCALE"
    L.new(col.outputs["Color"], tint.inputs[0])
    tint.inputs["Scale"].default_value = 1.6
    L.new(tint.outputs[0], bsdf.inputs["Sheen Tint"])
    height = math_node(nt, "MULTIPLY_ADD", fuzz.outputs["Fac"], 0.35, ply)
    bump = node(nt, "ShaderNodeBump", Strength=1.0, Distance=0.002)
    L.new(height, bump.inputs["Height"])
    L.new(bump.outputs["Normal"], bsdf.inputs["Normal"])
    bsdf.inputs["Roughness"].default_value = 0.78
    bsdf.inputs["Specular IOR Level"].default_value = 0.35
    bsdf.inputs["Sheen Weight"].default_value = 1.0
    bsdf.inputs["Sheen Roughness"].default_value = 0.45
    L.new(bsdf.outputs[0], out.inputs["Surface"])
    return mat


def paper_material():
    mat = bpy.data.materials.new("paper")
    mat.use_nodes = True
    nt = mat.node_tree
    nt.nodes.clear()
    L = nt.links
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled")
    tc = nt.nodes.new("ShaderNodeTexCoord")
    mottle = node(nt, "ShaderNodeTexNoise", Scale=1.6, Detail=5.0, Roughness=0.55)
    L.new(tc.outputs["Object"], mottle.inputs["Vector"])
    grain = node(nt, "ShaderNodeTexNoise", Scale=140.0, Detail=8.0, Roughness=0.65)
    L.new(tc.outputs["Object"], grain.inputs["Vector"])
    heights = []
    for rot, sc in ((0.35, 22.0), (-0.9, 30.0), (1.7, 16.0)):
        mp = nt.nodes.new("ShaderNodeMapping")
        mp.inputs["Rotation"].default_value = (0, 0, rot)
        mp.inputs["Scale"].default_value = (1.0, 14.0, 1.0)
        L.new(tc.outputs["Object"], mp.inputs["Vector"])
        fb = node(nt, "ShaderNodeTexNoise", Scale=sc, Detail=6.0, Roughness=0.7)
        L.new(mp.outputs[0], fb.inputs["Vector"])
        heights.append(fb.outputs["Fac"])
    h = math_node(nt, "ADD", heights[0], heights[1])
    h = math_node(nt, "ADD", h, heights[2])
    h = math_node(nt, "MULTIPLY_ADD", grain.outputs["Fac"], 1.2, h)
    bump = node(nt, "ShaderNodeBump", Strength=0.22, Distance=0.004)
    L.new(h, bump.inputs["Height"])
    L.new(bump.outputs["Normal"], bsdf.inputs["Normal"])
    tone = math_node(nt, "MULTIPLY_ADD", mottle.outputs["Fac"], 0.06, 0.97)
    tone = math_node(nt, "MULTIPLY_ADD", heights[0], 0.03, tone)
    tone = math_node(nt, "SUBTRACT", tone, 0.015)
    base = nt.nodes.new("ShaderNodeVectorMath")
    base.operation = "SCALE"
    base.inputs[0].default_value = hex_lin(TH["paper"])
    L.new(tone, base.inputs["Scale"])
    L.new(base.outputs[0], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = 0.93
    bsdf.inputs["Specular IOR Level"].default_value = 0.0
    bsdf.inputs["Sheen Weight"].default_value = 0.0
    L.new(bsdf.outputs[0], out.inputs["Surface"])
    return mat


# ---------------------------------------------------------------- scene
def setattr_safe(obj, name, value):
    if hasattr(obj, name):
        try:
            setattr(obj, name, value)
        except Exception as e:  # noqa: BLE001
            print("skip", name, e)


def build_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    r = sc.render
    if args.variant == "d":
        r.resolution_x, r.resolution_y = 1600, 900
    else:
        r.resolution_x, r.resolution_y = 720, 1280
    r.resolution_x *= args.supersample
    r.resolution_y *= args.supersample
    r.resolution_percentage = args.percent
    r.image_settings.file_format = "PNG"
    r.image_settings.color_mode = "RGB"
    r.image_settings.color_depth = "8"
    sc.view_settings.view_transform = "Standard"
    sc.view_settings.look = "None"
    if args.exposure is not None:
        sc.view_settings.exposure = args.exposure
    elif args.engine == "cycles":
        sc.view_settings.exposure = TH["exposure_cycles"]
    else:
        sc.view_settings.exposure = TH["exposure"]
    sc.view_settings.gamma = 1.0
    if args.engine == "eevee":
        r.engine = "BLENDER_EEVEE"
        e = sc.eevee
        e.taa_render_samples = args.samples or 48
        setattr_safe(e, "use_raytracing", True)
        setattr_safe(e, "use_shadows", True)
        setattr_safe(e, "shadow_ray_count", 2)
        setattr_safe(e, "shadow_step_count", 8)
        setattr_safe(e, "use_fast_gi", True)
        setattr_safe(e, "fast_gi_method", "GLOBAL_ILLUMINATION")
        setattr_safe(e, "fast_gi_distance", 0.15)
        setattr_safe(e, "fast_gi_quality", 0.5)
        setattr_safe(e, "shadow_resolution_scale", 1.0)
        setattr_safe(e, "bokeh_max_size", 200.0)
        setattr_safe(e, "use_bokeh_jittered", True)
    else:
        r.engine = "CYCLES"
        prefs = bpy.context.preferences.addons["cycles"].preferences
        if args.device != "CPU":
            prefs.compute_device_type = args.device
            prefs.get_devices()
            for d in prefs.devices:
                d.use = d.type != "CPU" or args.device == "CPU"
            sc.cycles.device = "GPU"
        else:
            sc.cycles.device = "CPU"
        sc.cycles.samples = args.samples or 256
        sc.cycles.use_adaptive_sampling = True
        sc.cycles.adaptive_threshold = 0.02
        sc.cycles.use_denoising = True
        r.use_persistent_data = True
        setattr_safe(sc.cycles, "denoiser", "OPTIX" if args.device == "OPTIX" else "OPENIMAGEDENOISE")
        sc.cycles.max_bounces = 6
    # world: the even sky part of the light
    world = bpy.data.worlds.new("world")
    sc.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    bg.inputs["Color"].default_value = (*TH["sky"], 1.0)
    bg.inputs["Strength"].default_value = TH["sky_share"]
    # paper
    paper = paper_material()
    bpy.ops.mesh.primitive_plane_add(size=80.0, location=(0, 0, 0))
    plane = bpy.context.active_object
    plane.data.materials.append(paper)
    # sun: soft, from the upper left, low enough for long shadows. A sun lights
    # the paper evenly, so the tone holds from the first beat to the last.
    sd = bpy.data.lights.new("sun", "SUN")
    sd.energy = TH["sun_share"] / math.sin(SUN_ELEVATION)
    sd.color = TH["sun"]
    sd.angle = math.radians(7.0)
    setattr_safe(sd, "use_shadow_jitter", True)
    setattr_safe(sd, "shadow_jitter_overblur", 10.0)
    sun = bpy.data.objects.new("sun", sd)
    sc.collection.objects.link(sun)
    toward = Vector((math.cos(SUN_AZIMUTH) * math.cos(SUN_ELEVATION),
                     math.sin(SUN_AZIMUTH) * math.cos(SUN_ELEVATION), math.sin(SUN_ELEVATION)))
    sun.rotation_euler = (-toward).to_track_quat("-Z", "Y").to_euler()
    # threads
    mat = thread_material()
    rngc = np.random.default_rng(11)
    teal, rust, brown = (np.array(hex_lin(TH[c])) for c in ("teal", "rust", "brown"))
    colors = []
    for s in STRANDS:
        if s["group"] == "agreed":
            c = teal * rngc.uniform(0.9, 1.1) * TH["thread_gain"]
        else:
            # rust leaning to brick and brown, never toward orange
            c = rust + (brown - rust) * rngc.uniform(0.12, 0.6)
            c = c * rngc.uniform(0.94, 1.04)
        colors.append(c)
    strands = make_mesh("strands", TOTAL, N, False, colors, mat)
    if args.fuzz > 0:
        add_fuzz(strands, args.fuzz)
    # crux knots: a crimson thread wound tight into a bead, centred where the
    # bundle pinches, so the contested strands visibly run into it
    KN = 700
    sv = np.linspace(0, 1, KN)
    layers = []
    for j in range(3):  # three windings on different axes, so no pole shows
        a = TAU * 15 * sv + j * 1.1
        psi = math.pi * 1.15 * sv + j * 0.7
        beta = 0.75 * np.sin(TAU * 1.3 * sv + j) + 0.2
        e1 = np.stack([np.cos(psi), np.sin(psi), np.zeros(KN)], 1)
        e2 = np.stack([-np.sin(psi) * np.cos(beta), np.cos(psi) * np.cos(beta), np.sin(beta)], 1)
        rad = KNOT_R * (0.80 + 0.03 * j + 0.05 * np.sin(TAU * 7 * sv + j))
        w = rad[:, None] * (np.cos(a)[:, None] * e1 + np.sin(a)[:, None] * e2)
        layers.append(np.roll(w, j, axis=1))
    kc = np.stack(layers)  # (3, KN, 3)
    crim = np.array(hex_lin(TH["crimson"])) * TH["thread_gain"]
    knots = []
    for k in range(CRUXES):
        ob = make_mesh(f"knot{k}", 3, KN, False, [crim] * 3, mat)
        prof = np.full((3, KN), KNOT_R * 0.17)
        prof[:, :6] *= np.linspace(0.3, 1, 6)
        prof[:, -6:] *= np.linspace(1, 0.3, 6)
        set_mesh(ob, tube_points(kc, prof), arc_length(kc))
        ob.rotation_mode = "XYZ"
        knots.append(ob)
    cam_d = bpy.data.cameras.new("cam")
    cam_d.sensor_width = 36.0
    cam_d.sensor_fit = "AUTO"
    cam_d.clip_start = 0.01
    cam_d.clip_end = 50.0
    cam_d.dof.use_dof = True
    cam = bpy.data.objects.new("cam", cam_d)
    sc.collection.objects.link(cam)
    sc.camera = cam
    if args.variant == "d":
        cam_d.shift_x = SHIFT["d"][0]
    else:
        cam_d.shift_y = SHIFT["m"][1]
    return sc, strands, knots, cam


# ---------------------------------------------------------------- camera beats
# Per beat: a view direction (camera minus target), lens (mm) and f-stop by
# hand; distance and aim are then fitted so the beat's arrangement fills a
# rect of the frame (x0, x1, y0, y1; y down). Desktop keeps every thread right
# of x = 0.50 (the text column ends near 0.47); mobile keeps it in the top 45%. A beat without a rect is placed
# by hand (c, t).
CAMS = {
    "d": [
        dict(dir=(1.37, -0.82, 0.50), lens=45, f=0.38, rect=(0.51, 0.98, 0.08, 0.92)),
        dict(dir=(0.62, -0.68, 0.44), lens=28, f=0.6, rect=(0.51, 1.12, -0.08, 1.06)),
        dict(dir=(1.55, -0.30, 0.62), lens=40, f=1.0, rect=(0.62, 0.90, 0.20, 0.70), pts="knot"),
        dict(dir=(1.31, -1.48, 1.58), lens=32, f=1.6, rect=(0.51, 0.97, 0.10, 0.92)),
        dict(dir=(0.50, -1.71, 2.88), lens=35, f=3.0, rect=(0.51, 0.97, 0.08, 0.92)),
        dict(dir=(0.0, 0.0, 1.0), lens=50, f=16.0, up=(0.0, 1.0, 0.0), rect=(0.51, 0.97, 0.06, 0.94)),
    ],
    "m": [
        dict(dir=(1.37, -0.82, 0.66), lens=34, f=0.4, rect=(0.06, 0.94, 0.06, 0.44)),
        dict(dir=(0.62, -0.68, 0.44), lens=26, f=0.6, rect=(-0.05, 1.05, 0.04, 0.46)),
        dict(dir=(0.25, -1.0, 0.55), lens=30, f=0.9, rect=(0.22, 0.78, 0.12, 0.40), pts="core"),
        dict(dir=(1.31, -1.48, 1.58), lens=28, f=1.6, rect=(0.06, 0.94, 0.06, 0.44)),
        dict(dir=(0.50, -1.71, 2.88), lens=30, f=3.0, rect=(0.06, 0.94, 0.06, 0.44)),
        dict(dir=(0.0, 0.0, 1.0), lens=50, f=16.0, up=(0.0, 1.0, 0.0), rect=(0.05, 0.95, 0.07, 0.43)),
    ],
}
RES = {"d": (1600, 900), "m": (720, 1280)}
SHIFT = {"d": (-0.23, 0.0), "m": (0.0, -0.25)}


def cam_basis(c, t, up):
    f = t - c
    f = f / np.linalg.norm(f)
    r = np.cross(f, up)
    if np.linalg.norm(r) < 1e-6:
        r = np.cross(f, np.array([0.0, 1.0, 0.0]))
    r = r / np.linalg.norm(r)
    return r, np.cross(r, f), f


def project(pts, c, t, up, lens, variant):
    """Points to normalised frame coords (x right, y down), as Blender's camera does."""
    r, u, f = cam_basis(c, t, up)
    v = pts - c
    z = v @ f
    x = (v @ r) / z
    y = (v @ u) / z
    w, h = RES[variant]
    aspect = w / h
    shx, shy = SHIFT[variant]
    if aspect >= 1:
        sx = lens / 36.0
        sy = sx * aspect
        nx, ny = 0.5 + x * sx - shx, 0.5 + y * sy - shy * aspect
    else:
        sy = lens / 36.0
        sx = sy / aspect
        nx, ny = 0.5 + x * sx - shx / aspect, 0.5 + y * sy - shy
    return nx, 1.0 - ny, z, sx, sy


def beat_points(b, which="all"):
    arr = ARRANGEMENT_AT_BEAT[b]
    pts = ARR[arr][:, ::3].reshape(-1, 3)
    if which == "core":
        pts = pts[np.abs(pts[:, 0]) < 0.32]
    elif which == "knot":
        pts = pts[np.linalg.norm(pts[:, :2], axis=1) < 0.25]
    if arr >= 3:
        extra = []
        for k in range(CRUXES):
            cu, cv = tree_node(k) if arr == 4 else knot_center(k)
            if arr == 3:
                cu = -0.02 + cu * 1.04
            x, y = to_world(cu, cv)
            for d in ((1, 0, 0), (-1, 0, 0), (0, 1, 0), (0, -1, 0), (0, 0, 1)):
                extra.append(np.array([x, y, KZ]) + KNOT_R * np.array(d))
        pts = np.concatenate([pts, np.array(extra)])
    return pts


def fit_camera(b, beat, variant):
    pts = beat_points(b, beat.get("pts", "all"))
    x0, x1, y0, y1 = beat["rect"]
    up = np.array(beat.get("up", (0.0, 0.0, 1.0)))
    dirv = np.array(beat["dir"], float)
    dirv /= np.linalg.norm(dirv)
    t = pts.mean(axis=0)
    d = 3.0
    for _ in range(80):
        c = t + dirv * d
        nx, ny, z, sx, sy = project(pts, c, t, up, beat["lens"], variant)
        if (z < 0.05).any():
            d *= 1.25
            continue
        sc = max((nx.max() - nx.min()) / (x1 - x0), (ny.max() - ny.min()) / (y1 - y0))
        dx = (nx.max() + nx.min()) / 2 - (x0 + x1) / 2
        dy = (ny.max() + ny.min()) / 2 - (y0 + y1) / 2
        r, u, _ = cam_basis(c, t, up)
        t = t + r * (dx / sx) * d * 0.7 - u * (dy / sy) * d * 0.7
        d *= sc ** 0.7
    return t + dirv * d, t


for _variant, _beats in CAMS.items():
    for _b, _beat in enumerate(_beats):
        if "rect" in _beat:
            _c, _t = fit_camera(_b, _beat, _variant)
            _beat["c"], _beat["t"] = tuple(_c), tuple(_t)
        print(f"CAM {_variant}{_b} c={np.round(_beat['c'], 3)} t={np.round(_beat['t'], 3)}")


def camera_at(p):
    beats = CAMS[args.variant]
    i, u = segment(p)
    w = float(smoother(np.array(u)))
    a, b = beats[i], beats[i + 1]

    def mix(key):
        return np.array(a[key], float) * (1 - w) + np.array(b[key], float) * w

    c, t = mix("c"), mix("t")
    # oblique beats keep world Z up; the top-down map names its own image "up"
    up = np.array(a.get("up", (0.0, 0.0, 1.0))) * (1 - w) + np.array(b.get("up", (0.0, 0.0, 1.0))) * w
    lens = a["lens"] * (1 - w) + b["lens"] * w
    # f-stop moves in log space so the focus opens up evenly
    fs = math.exp(math.log(a["f"]) * (1 - w) + math.log(b["f"]) * w)
    # a slow handheld drift, stronger early
    calm = 1.0 - p * 0.85
    c = c + calm * np.array([
        0.012 * math.sin(TAU * p * 2.1 + 0.4),
        0.010 * math.sin(TAU * p * 1.7 + 1.9),
        0.006 * math.sin(TAU * p * 2.6 + 0.8),
    ])
    return c, t, lens, fs, up


def apply(p, sc, strands, knots, cam):
    P = strands_at(p)
    pts = tube_points(P, RPROF)
    set_mesh(strands, pts, arc_length(P))
    pos, scale = knot_positions(p)
    for k, ob in enumerate(knots):
        ob.location = Vector(pos[k])
        s = max(scale, 1e-4)
        ob.scale = (s, s, s)
        ob.hide_render = scale <= 0.001
        ob.rotation_euler = (k * 1.3 + p * 1.2, 0.0, 0.0)
    c, t, lens, fs, up = camera_at(p)
    cam.location = Vector(c)
    d = Vector(t) - Vector(c)
    f = d.normalized()
    r = f.cross(Vector(up))
    if r.length < 1e-6:
        r = f.cross(Vector((0.0, 1.0, 0.0)))
    r.normalize()
    u = r.cross(f)
    cam.rotation_euler = Matrix((r, u, -f)).transposed().to_euler()
    cam.data.lens = lens
    cam.data.dof.focus_distance = d.length
    cam.data.dof.aperture_fstop = fs


def main():
    sc, strands, knots, cam = build_scene()
    os.makedirs(args.out, exist_ok=True)
    jobs = []
    if args.ps:
        ps = [float(x) for x in args.ps.split(",")]
        names = args.names.split(",") if args.names else [f"p{x:.3f}" for x in ps]
        jobs = list(zip(ps, names))
    else:
        last = args.last or args.count
        for f in range(args.first, last + 1):
            jobs.append(((f - 1) / (args.count - 1), f"{f:03d}"))
    if args.save_blend:
        apply(jobs[0][0], sc, strands, knots, cam)
        bpy.ops.wm.save_as_mainfile(filepath=args.save_blend)
    for p, name in jobs:
        path = os.path.join(args.out, name + ".png")
        if args.skip_existing and os.path.exists(path):
            continue
        t0 = time.time()
        apply(p, sc, strands, knots, cam)
        sc.render.filepath = path
        bpy.ops.render.render(write_still=True)
        print(f"FRAME {name} p={p:.4f} {time.time() - t0:.2f}s", flush=True)


main()
