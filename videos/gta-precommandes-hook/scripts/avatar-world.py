#!/usr/bin/env python3
"""avatar-world.py — the "speaker" of a reel without a filmed face: an animated sticker avatar in a sunset world.

Writes assets/speaker.mp4 (1080x1920, 30 fps, SDR bt709, silent) of the cut's duration, so build-reel.py treats it like a face
video (layouts F and S). Run it AFTER scripts/stage.py, which overwrites speaker.mp4 with the black carrier.

Usage: python3 scripts/avatar-world.py [--poses assets/avatar-poses.json] [--preview 12.5,40] [--out assets/speaker.mp4]

assets/avatar-poses.json: {"avatar_dir": "assets/brand/avatar", "poses": [{"pose": "neutre", "at": 0}, {"pose": "surpris", "at": "w:risquer"}]}
"at": seconds on the cut, or "w:word" (first word starting with it), "w:word#2" (2nd occurrence), as in storyboard.json.
Look: Vice-City-style sunset (violet → magenta → orange), striped sun on the horizon, palm silhouettes that sway, the avatar
breathing in front of the sun with a pink glow; on each pose change a short pop (scale 0.86 → 1, back-out ease).
Deterministic: no unseeded randomness, every value is a function of t.
"""
import argparse, json, math, re, subprocess, unicodedata
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
ap = argparse.ArgumentParser()
ap.add_argument("--poses", default="assets/avatar-poses.json")
ap.add_argument("--out", default="assets/speaker.mp4")
ap.add_argument("--preview", default=None, help="comma-separated times: write PNG frames to review/world-<t>.png instead of the video")
args = ap.parse_args()

W, H, FPS = 1080, 1920, 30
HORIZON = 1500
spec = json.loads((ROOT / args.poses).read_text())
AV = ROOT / spec.get("avatar_dir", "assets/brand/avatar")
dur = json.loads((ROOT / "assets/edit-decisions.json").read_text())["duration"]
words = json.loads((ROOT / "assets/transcript.json").read_text())["words"]


def norm(s):
    return re.sub(r"[^\w']", "", unicodedata.normalize("NFKD", s.lower()).encode("ascii", "ignore").decode())


def resolve(at):
    if isinstance(at, (int, float)):
        return float(at)
    m = re.match(r"w:(.+?)(?:#(\d+))?$", at)
    key, nth = norm(m.group(1)), int(m.group(2) or 1)
    hits = [w["start"] for w in words if norm(w["text"]) == key] or [w["start"] for w in words if norm(w["text"]).startswith(key)]
    if len(hits) < nth:
        raise SystemExit(f"avatar-poses: no occurrence #{nth} of « {m.group(1)} » in assets/transcript.json")
    return hits[nth - 1] - 0.05


poses = sorted(({"pose": p["pose"], "t": max(0.0, resolve(p["at"]))} for p in spec["poses"]), key=lambda p: p["t"])

# ---------------------------------------------------------------- static layers
def lerp(a, b, k):
    return tuple(int(a[i] + (b[i] - a[i]) * k) for i in range(3))


def hexc(h):
    h = h.lstrip("#"); return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def gradient(h, stops):
    col = np.zeros((h, 3), np.float32)
    ys = np.arange(h) / max(1, h - 1)
    for c in range(3):
        col[:, c] = np.interp(ys, [s for s, _ in stops], [hexc(v)[c] for _, v in stops])
    return col


sky = np.zeros((H, W, 3), np.float32)
sky[:HORIZON] = gradient(HORIZON, [(0, "#0E0624"), (.32, "#2E0C55"), (.58, "#7A1A72"), (.80, "#E23A6E"), (1, "#FF8A4C")])[:, None, :]
sky[HORIZON:] = gradient(H - HORIZON, [(0, "#3A0F4F"), (.35, "#1C0838"), (1, "#07030F")])[:, None, :]
base = Image.fromarray(sky.clip(0, 255).astype(np.uint8)).convert("RGBA")

# striped retro sun sitting on the horizon
R, CX, CY = 430, 540, HORIZON - 60
sun = Image.new("RGBA", (W, H), (0, 0, 0, 0))
sg = gradient(2 * R, [(0, "#FFE27A"), (.45, "#FFB25B"), (1, "#FF3F86")])
sd = ImageDraw.Draw(sun)
for yy in range(2 * R):
    y = CY - R + yy
    if y > HORIZON:
        break
    dy = yy - R; half = math.sqrt(max(0, R * R - dy * dy))
    k = yy / (2 * R)
    if k > 0.52:  # stripes, thicker toward the horizon
        period = 34; gap = 4 + (k - 0.52) * 30
        if (yy % period) < gap:
            continue
    sd.line([(CX - half, y), (CX + half, y)], fill=tuple(int(v) for v in sg[yy]) + (255,))
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
ImageDraw.Draw(glow).ellipse([CX - R - 120, CY - R - 120, CX + R + 120, CY + R + 120], fill=(255, 90, 120, 120))
glow = glow.filter(ImageFilter.GaussianBlur(90))
base = Image.alpha_composite(base, glow)
base = Image.alpha_composite(base, sun)

# horizon line + sun reflection on the water
rd = ImageDraw.Draw(base)
rd.line([(0, HORIZON), (W, HORIZON)], fill=(255, 140, 120, 255), width=3)
for i in range(14):
    y = HORIZON + 18 + i * 22 + i * i * 1.6
    half = 260 - i * 15
    rd.line([(CX - half, y), (CX + half, y)], fill=(255, 120 + i * 4, 140, max(30, 190 - i * 12)), width=max(2, 7 - i // 3))

# stars (fixed positions from a deterministic sequence)
STARS = [((i * 337) % W, (i * 191) % 820 + 30, 1 + (i % 3)) for i in range(70)]

# vignette
yy, xx = np.mgrid[0:H, 0:W]
v = ((xx - W / 2) / (W * .75)) ** 2 + ((yy - H * .45) / (H * .7)) ** 2
vig = Image.fromarray((np.clip(v - .35, 0, 1) * 200).astype(np.uint8))
vignette = Image.new("RGBA", (W, H), (8, 2, 20, 255)); vignette.putalpha(vig)


def palm(height, lean, flip=False, frond=380):
    """Palm silhouette, base at the bottom-centre of the returned image: tapered trunk, feathery drooping fronds."""
    S = 1600; im = Image.new("RGBA", (S, S), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    col = (14, 4, 32, 255)
    bx, by = S // 2, S - 10
    tx, ty = bx + lean, by - height
    cx, cy = bx + lean * 0.1, by - height * 0.6
    def bez(p0, p1, p2, k):
        return ((1 - k) ** 2 * p0[0] + 2 * (1 - k) * k * p1[0] + k * k * p2[0], (1 - k) ** 2 * p0[1] + 2 * (1 - k) * k * p1[1] + k * k * p2[1])
    pts = [bez((bx, by), (cx, cy), (tx, ty), i / 60) for i in range(61)]
    left, right = [], []
    for i, (x, y) in enumerate(pts):
        x2, y2 = pts[min(i + 1, 60)] if i < 60 else pts[59]
        dx, dy = x2 - x, y2 - y
        if i == 60: dx, dy = -dx, -dy
        n = math.hypot(dx, dy) or 1; nx, ny = -dy / n, dx / n
        w = 26 - 14 * i / 60
        left.append((x + nx * w, y + ny * w)); right.append((x - nx * w, y - ny * w))
    d.polygon(left + right[::-1], fill=col)
    for i in range(4, 58, 4):  # trunk rings
        d.line([left[i], right[i]], fill=(52, 14, 74, 255), width=3)
    for a in (-178, -150, -122, -95, -62, -32, -5, 22, 205, 160):
        ar = math.radians(a)
        L = frond * (0.8 + 0.2 * abs(math.cos(ar)))
        ex, ey = tx + math.cos(ar) * L, ty + math.sin(ar) * L * 0.45 + L * 0.42
        mx, my = tx + math.cos(ar) * L * 0.55, ty + math.sin(ar) * L * 0.55 - L * 0.18
        prev = (tx, ty)
        for i in range(1, 41):
            k = i / 40
            x, y = bez((tx, ty), (mx, my), (ex, ey), k)
            d.line([prev, (x, y)], fill=col, width=max(2, int(9 * (1 - k)) + 2))
            if 0.08 < k < 0.97:  # leaflets: hang down and outward, shorter at the tip
                ux, uy = x - prev[0], y - prev[1]; un = math.hypot(ux, uy) or 1; ux, uy = ux / un, uy / un
                ll = 95 * math.sin(math.pi * min(1, k * 1.15)) + 18
                for side in (1, -1):
                    lx = x + ux * ll * 0.55 + (-uy) * side * ll * 0.55
                    ly = y + uy * ll * 0.55 + (ux) * side * ll * 0.55 + ll * 0.65
                    d.line([(x, y), (lx, ly)], fill=col, width=3)
            prev = (x, y)
    d.ellipse([tx - 30, ty - 22, tx + 30, ty + 26], fill=col)
    if flip:
        im = im.transpose(Image.FLIP_LEFT_RIGHT)
    return im


PALMS = [  # (image, base x, base y, sway amplitude°, phase) — crowns stay in the corners, never behind the face
    (palm(780, 120, frond=300), -150, 1560, 1.6, 1.7),
    (palm(1260, 200, frond=400), 30, 1640, 1.2, 0.0),
    (palm(1150, 190, flip=True, frond=380), 1060, 1650, 1.3, 0.9),
]
_rot_cache = {}


def rotated(i, deg):
    key = (i, round(deg * 20))
    if key not in _rot_cache:
        im = PALMS[i][0]
        _rot_cache[key] = im.rotate(key[1] / 20, resample=Image.BICUBIC, center=(im.width // 2, im.height - 10))
    return _rot_cache[key]


# avatar poses: scaled to a fixed width, with a soft pink glow behind
AV_W = 760
_av = {}


def avatar(name):
    if name not in _av:
        im = Image.open(AV / f"{name}.png").convert("RGBA")
        im = im.resize((AV_W, round(im.height * AV_W / im.width)), Image.LANCZOS)
        g = Image.new("RGBA", (im.width + 160, im.height + 160), (0, 0, 0, 0))
        mask = im.getchannel("A").point(lambda a: 255 if a > 10 else 0)
        pink = Image.new("RGBA", im.size, (255, 46, 136, 170)); pink.putalpha(mask.point(lambda a: a * 170 // 255))
        g.alpha_composite(pink, (80, 80)); g = g.filter(ImageFilter.GaussianBlur(38))
        g.alpha_composite(im, (80, 80))
        _av[name] = g
    return _av[name]


def back_out(k, s=2.2):
    k -= 1
    return k * k * ((s + 1) * k + s) + 1


def frame(t):
    im = base.copy()
    d = ImageDraw.Draw(im)
    for i, (x, y, r) in enumerate(STARS):
        a = int(140 + 110 * math.sin(t * 1.3 + i * 1.7))
        d.ellipse([x - r, y - r, x + r, y + r], fill=(255, 230, 255, max(0, a)))
    for i, (_, bx, by, amp, ph) in enumerate(PALMS):
        p = rotated(i, amp * math.sin(t * 0.9 + ph))
        im.alpha_composite(p, (int(bx - p.width / 2), int(by - p.height)))
    # avatar
    cur = poses[0]
    for p in poses:
        if p["t"] <= t:
            cur = p
    av = avatar(cur["pose"])
    since = t - cur["t"]
    pop = back_out(min(1, since / 0.24)) if since < 0.24 and cur["t"] > 0 else 1
    s = (0.86 + 0.14 * pop) * (1 + 0.010 * math.sin(t * 2 * math.pi * 0.28))
    rot = 1.1 * math.sin(t * 2 * math.pi * 0.17) + (1 - pop) * -6
    a2 = av.resize((round(av.width * s), round(av.height * s)), Image.BICUBIC).rotate(rot, resample=Image.BICUBIC, expand=True)
    cx, cy = 540, 975 + 9 * math.sin(t * 2 * math.pi * 0.45)
    im.alpha_composite(a2, (int(cx - a2.width / 2), int(cy - a2.height / 2)))
    im.alpha_composite(vignette)
    return im.convert("RGB")


if args.preview:
    out_dir = ROOT / "review"; out_dir.mkdir(exist_ok=True)
    for ts in args.preview.split(","):
        frame(float(ts)).save(out_dir / f"world-{float(ts):.2f}.png")
        print(out_dir / f"world-{float(ts):.2f}.png")
    raise SystemExit(0)

n = round(dur * FPS)
out = ROOT / args.out
ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
                       "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", "-g", str(FPS),
                       "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", "-movflags", "+faststart", str(out)],
                      stdin=subprocess.PIPE)
for f in range(n):
    ff.stdin.write(frame(f / FPS).tobytes())
    if f % 300 == 0:
        print(f"  {f / FPS:6.1f} / {dur:.1f} s", flush=True)
ff.stdin.close(); ff.wait()
print(f"{out.relative_to(ROOT)} · {n} frames · {dur:.2f} s · {len(poses)} poses: " + " · ".join(f"{p['pose']}@{p['t']:.2f}" for p in poses))
