#!/usr/bin/env python3
"""verify-cut.py — check the cut audio before showing it: run it twice, fix, then send.
Usage: ~/.reel-kit/venv/bin/python scripts/verify-cut.py [--transcript assets/derush/cut.json]
1. silences longer than --max-gap in assets/reel-audio.wav (blank in the edit);
2. repeated word groups in the whole-file transcript of the cut (retake left in);
3. every join transcribed ON ITS OWN (±1.6 s, faster-whisper, no VAD): whole-file ASR swallows repetitions, a short window does not.
"""
import argparse, json, os, re, subprocess, sys, tempfile, unicodedata
from pathlib import Path
import numpy as np
ap = argparse.ArgumentParser()
ap.add_argument("--transcript", default="assets/derush/cut.json")
ap.add_argument("--max-gap", type=float, default=0.55)
ap.add_argument("--window", type=float, default=1.6)
args = ap.parse_args()
ROOT = Path(__file__).resolve().parent.parent
wav = ROOT / "assets/reel-audio.wav"
keeps = json.loads((ROOT / "assets/edit-decisions.json").read_text())["keeps"]
problems = 0

# 1. silences
pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", str(wav), "-ac", "1", "-ar", "16000", "-af", "highpass=f=120", "-f", "s16le", "-"], capture_output=True).stdout
x = np.frombuffer(pcm, np.int16).astype(np.float32) / 32768
win = 320; n = len(x) // win
db = 20 * np.log10(np.sqrt((x[: n * win].reshape(n, win) ** 2).mean(1) + 1e-12))
thr = (np.percentile(db, 5) + np.percentile(db, 80)) / 2
quiet = db < thr; i = 0
print(f"1. silences > {args.max_gap} s (threshold {thr:.0f} dB)")
while i < n:
    if quiet[i]:
        j = i
        while j < n and quiet[j]: j += 1
        a, b = i * 0.02, j * 0.02
        if b - a > args.max_gap and a > 0.3 and b < n * 0.02 - 0.3:
            problems += 1; print(f"   BLANK {a:6.2f} → {b:6.2f} ({b - a:.2f} s)")
        i = j
    else:
        i += 1

# 2. repeated groups in the whole-file transcript
def norm(t): return re.sub(r"[^\w']", "", unicodedata.normalize("NFKD", t.lower()).encode("ascii", "ignore").decode())
W = json.loads((ROOT / args.transcript).read_text())["words"]
toks = [norm(w["text"]) for w in W]
print("2. repeated 3-word groups within 12 words")
for i in range(len(toks) - 3):
    g = toks[i:i + 3]
    for j in range(i + 1, min(i + 12, len(toks) - 2)):
        if toks[j:j + 3] == g and len(" ".join(g)) > 8:
            print(f"   REPEAT « {' '.join(w['text'] for w in W[i:i+3])} » at {W[i]['start']:.2f} and {W[j]['start']:.2f}")
            problems += 1

# 3. each join on its own
from faster_whisper import WhisperModel
m = WhisperModel("large-v3-turbo", device="cpu", compute_type="int8", cpu_threads=4)
print(f"3. joins transcribed on their own (±{args.window} s)")
for k in keeps[1:]:
    t = k["start"]; a = max(0, t - args.window); b = t + args.window
    f = tempfile.mktemp(suffix=".wav")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{a:.3f}", "-to", f"{b:.3f}", "-i", str(wav), "-ac", "1", "-ar", "16000", f], check=True)
    segs, _ = m.transcribe(f, language="fr", vad_filter=False, condition_on_previous_text=False, beam_size=5)
    text = " ".join(s.text.strip() for s in segs); os.remove(f)
    tk = [norm(v) for v in text.split()]
    rep = [tk[i] for i in range(1, len(tk)) if tk[i] == tk[i - 1] and len(tk[i]) > 2]
    flag = "  REPEAT?" if rep else ""
    problems += bool(rep)
    print(f"   {t:6.2f} (src {k['sourceStart']:.2f}) | {text}{flag}")
print(f"\n{problems} problem(s) flagged — listen to each flagged time before sending")
sys.exit(1 if problems else 0)
