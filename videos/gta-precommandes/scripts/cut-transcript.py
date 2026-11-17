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
# phrase fixes, after the word fixes: same word count → word by word ("et commandes préco" → "et commente préco");
# one replacement word → the phrase is merged into one word spanning its timing ("du Ulule." → "d'Ulule.")
def core(t): return t.strip(" .,?!;:…").lower()
for k, v in fixes.items():
    ks, vs = k.lower().split(), v.split()
    if len(ks) < 2:
        continue
    assert len(vs) in (1, len(ks)), f"cut-fixes: « {k} » → « {v} »: same word count, or one word"
    i = 0
    while i <= len(words) - len(ks):
        if [core(w["text"]) for w in words[i:i + len(ks)]] == [core(t) for t in ks]:
            if len(vs) == len(ks):
                for w, new in zip(words[i:i + len(ks)], vs):
                    c = w["text"].strip(" .,?!;:…"); w["text"] = w["text"].replace(c, new) if c else new
            else:
                tail = words[i + len(ks) - 1]["text"]; punct = tail[len(tail.rstrip(" .,?!;:…")):]
                words[i] = {**words[i], "text": vs[0] + punct, "end": words[i + len(ks) - 1]["end"], "sourceEnd": words[i + len(ks) - 1]["sourceEnd"]}
                del words[i + 1:i + len(ks)]
        i += 1
for a, b in zip(words, words[1:]):
    if a["end"] > b["start"]:
        a["end"] = b["start"]; a["sourceEnd"] = src(a["end"])
(A / "transcript.json").write_text(json.dumps({"words": words, "text": " ".join(w["text"] for w in words),
                                               "breaks": [k["start"] for k in keeps[1:]]}, ensure_ascii=False, indent=1))
print(f"{len(words)} words from the cut audio → assets/transcript.json")
