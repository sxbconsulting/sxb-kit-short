#!/usr/bin/env bash
# Rend tous les exemples (overlays/examples/*.json) dans les deux thèmes et assemble une planche :
# renders/overlays/gallery.png (une image par carte, prise aux 3/4 de sa durée, posée sur un fond neutre).
# usage : bash overlays/gallery.sh [dark|cream|both]   (both par défaut)
set -euo pipefail
KIT="$(cd "$(dirname "$0")/.." && pwd)"; OUT="$KIT/renders/overlays"; mkdir -p "$OUT/gallery"
THEMES="${1:-both}"; [ "$THEMES" = both ] && THEMES="dark cream"
tiles=()
for th in $THEMES; do
  for p in "$KIT"/overlays/examples/*.json; do
    n=$(basename "$p" .json)
    node "$KIT/overlays/render-overlay.mjs" "$p" --theme "$th" >/dev/null
    v="$OUT/$n-$th.webm"
    d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$v")
    t=$(python3 -c "print(round(float('$d')*0.8,2))")
    bg=$([ "$th" = dark ] && echo "#3a3a3a" || echo "#FDF3E6")
    ffmpeg -v error -y -c:v libvpx-vp9 -ss "$t" -i "$v" -frames:v 1 -pix_fmt rgba "$OUT/gallery/.$n-$th.png"
    python3 - "$OUT/gallery/.$n-$th.png" "$bg" "$OUT/gallery/$n-$th.png" <<'PY'
import sys
from PIL import Image
src, bg, out = sys.argv[1], sys.argv[2], sys.argv[3]
im = Image.open(src).convert("RGBA"); base = Image.new("RGBA", im.size, bg); base.alpha_composite(im)
base.crop((0, 120, 1080, 1120)).convert("RGB").resize((432, 400)).save(out)
PY
    tiles+=("$OUT/gallery/$n-$th.png"); echo "ok $n ($th)"
  done
done
python3 - "$OUT/gallery.png" "${tiles[@]}" <<'PY'
import sys
from PIL import Image
out, files = sys.argv[1], sys.argv[2:]
ims = [Image.open(f) for f in files]; w, h = ims[0].size; cols = 5; rows = (len(ims) + cols - 1) // cols
sheet = Image.new("RGB", (cols * (w + 8) + 8, rows * (h + 8) + 8), "white")
for i, im in enumerate(ims): sheet.paste(im, (8 + (i % cols) * (w + 8), 8 + (i // cols) * (h + 8)))
sheet.save(out); print(out)
PY
