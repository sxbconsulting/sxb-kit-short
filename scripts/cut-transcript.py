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
    k = next((k for k in keeps if k["start"] - 0.01 <= t <= k["end"] + 0.01), min(keeps, key=lambda k: abs(k["start"] - t)))
    return round(t - k["start"] + k["sourceStart"], 3)
words = [{"text": w["text"].strip(), "start": w["start"], "end": max(w["end"], w["start"] + 0.04),
          "sourceStart": src(w["start"]), "sourceEnd": src(max(w["end"], w["start"] + 0.04))}
         for w in raw if w["text"].strip(" .,?!;:…") and w.get("type", "word") == "word"]
for a, b in zip(words, words[1:]):
    if a["end"] > b["start"]:
        a["end"] = b["start"]; a["sourceEnd"] = src(a["end"])
(A / "transcript.json").write_text(json.dumps({"words": words, "text": " ".join(w["text"] for w in words),
                                               "breaks": [k["start"] for k in keeps[1:]]}, ensure_ascii=False, indent=1))
print(f"{len(words)} words from the cut audio → assets/transcript.json")
