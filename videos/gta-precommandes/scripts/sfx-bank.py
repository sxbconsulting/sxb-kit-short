#!/usr/bin/env python3
"""Construit la banque de sons SxB sur ce Mac (hors du dépôt : les fichiers bruts ne se redistribuent pas).

usage : python3 scripts/sfx-bank.py [--dest ~/sxb-sfx]

- 19 sons Pixabay déjà fournis par le skill media-use (.claude/skills/media-use/audio/assets/sfx)
- 16 sons Mixkit téléchargés depuis assets.mixkit.co (licence Mixkit Sound Effects Free : usage commercial, sans crédit)
Chaque son est recoupé (silences de début et de fin), mis en mono 48 kHz et aligné au même niveau (crête −3 dBFS),
puis décrit dans <dest>/manifest.json (catégorie, usage, durée, source, licence). Le kit avatar (sxb-shorts) et les
projets HyperFrames piochent dedans par nom.
"""
import json, os, subprocess, sys, tempfile, urllib.request
from pathlib import Path

KIT = Path(__file__).resolve().parent.parent
dest = Path(os.path.expanduser(sys.argv[sys.argv.index("--dest") + 1] if "--dest" in sys.argv else "~/sxb-sfx"))
dest.mkdir(parents=True, exist_ok=True)
PIXABAY = KIT / ".claude/skills/media-use/audio/assets/sfx"
LIC_PIXABAY = "Pixabay Content License (usage commercial, sans crédit) — https://pixabay.com/service/license-summary/"
LIC_MIXKIT = "Mixkit Sound Effects Free License (usage commercial, sans crédit) — https://mixkit.co/license/#sfxFree"

# nom : (fichier source ou id Mixkit, catégorie, usage)
PIXABAY_SET = {
    "whoosh": ("whoosh.mp3", "transition", "changement de scène, entrée de carte"),
    "whoosh-short": ("whoosh-short.mp3", "transition", "petite transition, glissé rapide"),
    "whoosh-cinematic": ("whoosh-cinematic.mp3", "transition", "grosse transition, révélation"),
    "pop": ("pop.mp3", "accent", "apparition d'un élément, pastille, tampon"),
    "click": ("click.mp3", "ui", "clic de bouton, curseur qui clique"),
    "click-soft": ("click-soft.mp3", "ui", "ligne qui apparaît, coche discrète"),
    "key-press": ("key-press.mp3", "ui", "une touche"),
    "typing": ("typing.mp3", "ui", "texte qui se tape (boucle)"),
    "notification": ("notification.mp3", "ui", "notification système"),
    "ping": ("ping.mp3", "accent", "chiffre clé révélé"),
    "chime": ("chime.mp3", "accent", "succès, conclusion positive (long)"),
    "sparkle": ("sparkle.mp3", "accent", "brillance, effet « magique »"),
    "error": ("error.mp3", "accent", "erreur, mauvaise idée"),
    "impact-bass-1": ("impact-bass-1.mp3", "impact", "révélation négative, secousse"),
    "impact-bass-2": ("impact-bass-2.mp3", "impact", "coup sourd, basculement"),
    "riser": ("riser.mp3", "tension", "montée avant une révélation (10 s : utiliser riser-short)"),
    "glitch-1": ("glitch-1.mp3", "texture", "glitch court"),
    "glitch-2": ("glitch-2.mp3", "texture", "glitch court"),
    "glitch-3": ("glitch-3.mp3", "texture", "glitch court"),
}
MIXKIT_SET = {
    "coins": (1993, "argent", "pièces : vente, chiffre d'affaires"),
    "coin-prize": (1999, "argent", "pièce gagnée : gain, bonne nouvelle chiffrée"),
    "coins-short": (2003, "argent", "pièces, court"),
    "shutter": (1133, "capture", "déclencheur photo : apparition d'une capture d'écran"),
    "paper-slide": (1530, "papier", "carte papier qui glisse"),
    "page-turn": (1104, "papier", "page qui tourne, étape suivante"),
    "scribble": (2369, "papier", "trait à la main, annotation"),
    "pencil": (3194, "papier", "écriture, rature"),
    "sweep-small": (166, "transition", "balayage léger"),
    "swoosh-accent": (1464, "transition", "petit swoosh d'accent"),
    "swoosh-fast": (3115, "transition", "swoosh rapide"),
    "message-pop": (2354, "ui", "message reçu (bulle de conversation)"),
    "bubble-pop": (2357, "ui", "bulle / notification qui apparaît"),
    "correct": (2870, "accent", "bonne réponse, vérité, coche"),
    "positive": (951, "accent", "notification positive"),
    "wrong": (946, "accent", "mauvaise réponse, mythe"),
    "select": (2573, "ui", "sélection d'option"),
}


def ff(*a):
    subprocess.run(["ffmpeg", "-v", "error", "-y", *a], check=True)


def process(src, out, max_len=None):
    """mono 48 kHz, silences recoupés, crête alignée à −3 dBFS."""
    with tempfile.TemporaryDirectory() as td:
        t = Path(td) / "t.wav"
        trim = "silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-72dB,areverse"
        ff("-i", str(src), "-ac", "1", "-ar", "48000", "-af", trim, *(["-t", str(max_len)] if max_len else []), str(t))
        peak = subprocess.run(["ffmpeg", "-i", str(t), "-af", "volumedetect", "-f", "null", "-"], capture_output=True, text=True).stderr
        mx = float([l for l in peak.splitlines() if "max_volume" in l][0].split(":")[1].split()[0])
        ff("-i", str(t), "-af", f"volume={-3 - mx:.2f}dB", "-c:a", "pcm_s16le", str(out))
    d = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(out)],
                             capture_output=True, text=True).stdout)
    return round(d, 3)


def fix_fade(out):
    d = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(out)],
                             capture_output=True, text=True).stdout)
    tmp = out.with_suffix(".tmp.wav")
    ff("-i", str(out), "-af", f"afade=t=out:st={max(0, d - 0.015):.3f}:d=0.015", "-c:a", "pcm_s16le", str(tmp))
    tmp.replace(out)


manifest = {}
for name, (fn, cat, use) in PIXABAY_SET.items():
    src = PIXABAY / fn
    if not src.exists():
        print(f"absent (skill media-use pas à jour ?) : {fn}"); continue
    out = dest / f"{name}.wav"
    dur = process(src, out); fix_fade(out)
    manifest[name] = {"file": out.name, "category": cat, "use": use, "duration": dur, "source": f"Pixabay (bundle HyperFrames media-use) · {fn}", "license": LIC_PIXABAY}
    print(f"ok {name:18s} {dur:5.2f}s  pixabay")

# riser court : les 1,4 s qui précèdent le pic de la montée (le son se termine sur la révélation)
if (dest / "riser.wav").exists():
    import wave, array
    w = wave.open(str(dest / "riser.wav")); a = array.array("h", w.readframes(w.getnframes())); sr = w.getframerate()
    win = sr // 20; peak_t = max(range(0, len(a) - win, win), key=lambda i: sum(abs(v) for v in a[i:i + win:8])) / sr
    ff("-ss", f"{max(0, peak_t - 1.3):.3f}", "-t", "1.4", "-i", str(dest / "riser.wav"),
       "-af", "afade=t=in:d=0.3,afade=t=out:st=1.37:d=0.03", "-c:a", "pcm_s16le", str(dest / "riser-short.wav"))
    manifest["riser-short"] = {**manifest["riser"], "file": "riser-short.wav", "use": "montée de 1,4 s qui se termine sur la révélation", "duration": 1.4}

for name, (mid, cat, use) in MIXKIT_SET.items():
    url = f"https://assets.mixkit.co/active_storage/sfx/{mid}/{mid}-preview.mp3"
    with tempfile.TemporaryDirectory() as td:
        src = Path(td) / "s.mp3"
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "sxb-kit-short sfx-bank"})
            src.write_bytes(urllib.request.urlopen(req, timeout=30).read())
        except Exception as e:
            print(f"échec téléchargement {name} ({url}) : {e}"); continue
        out = dest / f"{name}.wav"
        dur = process(src, out, max_len=3.0); fix_fade(out)
    manifest[name] = {"file": out.name, "category": cat, "use": use, "duration": dur, "source": f"Mixkit #{mid} · {url}", "license": LIC_MIXKIT}
    print(f"ok {name:18s} {dur:5.2f}s  mixkit #{mid}")

json.dump(manifest, open(dest / "manifest.json", "w"), ensure_ascii=False, indent=2)
lines = ["# Banque de sons SxB — licences", "", "Fichiers recoupés et normalisés à partir des sources ci-dessous. Usage commercial autorisé, sans crédit.",
         "Ne pas republier les fichiers bruts (dépôt public, pack de sons) : les licences l'interdisent ou ne l'autorisent pas clairement.", ""]
lines += [f"- `{k}` — {v['source']} — {v['license']}" for k, v in sorted(manifest.items())]
(dest / "LICENSES.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
print(f"{len(manifest)} sons → {dest}")
