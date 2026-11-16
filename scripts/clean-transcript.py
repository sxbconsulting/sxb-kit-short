#!/usr/bin/env python3
"""clean-transcript.py — after stage.py: drop the words whose source time falls outside every kept range
(the tail of a take trimmed by hand keeps its words in takes.json) and words with end < start."""
import json
from pathlib import Path
A = Path(__file__).resolve().parent.parent / "assets"
t = json.loads((A / "transcript.json").read_text())
keeps = json.loads((A / "edit-decisions.json").read_text())["keeps"]
def inside(w):
    return any(k["sourceStart"] - 0.02 <= w["sourceStart"] and w["sourceEnd"] <= k["sourceEnd"] + 0.02 for k in keeps)
before = len(t["words"])
dropped = [w["text"] for w in t["words"] if not (inside(w) and w["end"] >= w["start"])]
t["words"] = [w for w in t["words"] if inside(w) and w["end"] >= w["start"]]
# two overlapping takes can map the same source word twice: keep the later copy
W = t["words"]
dup = {i for i, w in enumerate(W) for v in W[i + 1:i + 6] if v["text"] == w["text"] and abs(v["sourceStart"] - w["sourceStart"]) < 0.06}
dropped += [W[i]["text"] for i in sorted(dup)]
t["words"] = [w for i, w in enumerate(W) if i not in dup]
t["text"] = " ".join(w["text"] for w in t["words"])
(A / "transcript.json").write_text(json.dumps(t, ensure_ascii=False, indent=1))
print(f"{before} → {len(t['words'])} words · dropped: {dropped}")
