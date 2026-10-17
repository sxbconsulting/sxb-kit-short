# overlays — cartes HyperFrames transparentes pour le kit avatar

Une carte = un modèle HTML paramétré (`templates/`) + un JSON de paramètres (`examples/`).
Le rendu sort un **WebM VP9 avec transparence** (ou un MOV ProRes 4444 avec `--format mov`), au DA SxB (noir, blanc, pêche — `DA-SXB.md`)
(polices locales de `tokens.css`), prêt à être incrusté par le kit avatar (`OVERLAY_CLIPS` dans le `scenes.py` du projet `sxb-shorts`).

```bash
node overlays/render-overlay.mjs overlays/examples/panier-62.json            # → renders/overlays/panier-62.webm
node overlays/render-overlay.mjs overlays/examples/panier-62.json --format mov
```

Paramètres du JSON :
- `template` : nom du fichier dans `templates/` (`stat-card`).
- `variables` : textes, chiffres, durée (`duration`, en s). Toute valeur `"w:mot"` est remplacée par l'instant de ce mot.
- `words_file` + `word_range` [premier, dernier index] + `t0` (instant du début de la carte dans la voix) : timings des mots,
  lus dans `words.json` (kit avatar) ou `transcript.json` (kit HyperFrames). `highlight_words` : mots qui font pulser la carte.

Modèles disponibles : `stat-card` (sur-titre, chiffre qui compte, pastille, légende, source).
Pour en ajouter un : copier `stat-card.html`, garder `data-composition-variables`, la timeline `window.__timelines[<id>]`
et un fond transparent (`background: transparent` sur `body` et `#root`).
