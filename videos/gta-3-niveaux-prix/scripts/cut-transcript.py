#!/usr/bin/env python3
"""cut-transcript.py — after stage.py: assets/transcript.json from a transcription OF THE CUT AUDIO ITSELF.
stage.py re-times the per-take words of takes.py, which can keep a false start the ASR swallowed or lose words when a
take is split by hand. Transcribing assets/reel-audio.wav gives exactly what is heard; source times come from the keeps.
Usage: python3 scripts/transcribe.py assets/reel-audio.wav --out assets/derush/cut.json && python3 scripts/cut-transcript.py
"""
import json
from pathlib import Path
A = Path(__file__).resolve().parent.parent / "assets"
keeps = json.loads((A / "edit-decisions.json").read_text())["keeps"]
raw = json.loads((A / "derush/cut.json").read_text())["words"]
def src(t):
    k = next((k for k in keeps if k["start"] - 0.001 <= t <= k["end"] + 0.001), min(keeps, key=lambda k: abs(k["start"] - t)))
    return round(t - k["start"] + k["sourceStart"], 3)
fixes_path = A / "derush/cut-fixes.json"   # {"heard": "right"} — ASR mistakes fixed in the transcript itself (the lexicon is 1 word → 1 word)
fixes = {k.lower(): v for k, v in json.loads(fixes_path.read_text()).items()} if fixes_path.exists() else {}
def fix(t):
    core = t.strip(" .,?!;:…"); return t.replace(core, fixes[core.lower()]) if core.lower() in fixes else t
def keep_of(t):
    return next((k for k in keeps if k["start"] - 0.01 <= t < k["end"]), min(keeps, key=lambda k: abs(k["start"] - t)))
words = []
for w in raw:
    if not (w["text"].strip(" .,?!;:…") and w.get("type", "word") == "word"):
        continue
    k = keep_of(w["start"])   # a word never crosses a cut: clamp it inside its keep
    a = max(w["start"], k["start"]); b = min(max(w["end"], a + 0.04), k["end"])
    if b - a < 0.02:
        a = max(k["start"], b - 0.04)
    words.append({"text": fix(w["text"].strip()), "start": round(a, 3), "end": round(b, 3), "sourceStart": src(a), "sourceEnd": src(b)})
for a, b in zip(words, words[1:]):
    if a["end"] > b["start"]:
        a["end"] = b["start"]; a["sourceEnd"] = src(a["end"])
(A / "transcript.json").write_text(json.dumps({"words": words, "text": " ".join(w["text"] for w in words),
                                               "breaks": [k["start"] for k in keeps[1:]]}, ensure_ascii=False, indent=1))
print(f"{len(words)} words from the cut audio → assets/transcript.json")
