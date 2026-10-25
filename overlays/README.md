# overlays — bibliothèque de cartes SxB (fond transparent)

10 modèles de cartes animées, rendus par HyperFrames en **WebM VP9 transparent** (ou MOV ProRes 4444 avec `--format mov`),
synchronisés sur les mots de la voix. Chaque carte existe en deux thèmes :

| Thème | Look | Pour |
|---|---|---|
| `dark` (par défaut) | DA-SXB : carte #141414, blanc, pêche #FECA8A, Archivo, entrées nettes | shorts face caméra (`DA-SXB.md`) |
| `cream` | carte blanche bord encre, rouge #E2482E, Poppins, entrées avec rebond | shorts avatar / no face (`sxb-shorts`) |

```bash
node overlays/render-overlay.mjs overlays/examples/steps.json                 # → renders/overlays/steps.webm (dark)
node overlays/render-overlay.mjs overlays/examples/steps.json --theme cream   # → renders/overlays/steps-cream.webm
bash overlays/gallery.sh                                                      # tous les exemples, 2 thèmes → renders/overlays/gallery.png
```

## Les 10 modèles

| Modèle | Ce que ça montre | Variables principales (en plus des communes) |
|---|---|---|
| `stat-card` | un chiffre qui compte, une pastille (−3 %), légende, source | `kicker`, `value`, `decimals`, `prefix`, `suffix`, `value_at`, `badge`, `badge_at`, `label`, `source` |
| `myth-truth` | « on te dit… » rayé, puis « en vrai… » | `kicker`, `myth`, `myth_at`, `strike_at`, `truth_kicker`, `truth`, `truth_at`, `source` |
| `before-after` | deux colonnes, l'après se dévoile par balayage | `before`, `after` (lignes séparées par `\|`) ou `before_img`, `after_img`, `before_at`, `after_at` |
| `phone-shot` | capture dans un téléphone, zoom sur une zone, curseur qui clique, pastille | `src`, `focus_x`, `focus_y` (0-1 de l'écran), `zoom`, `zoom_at`, `click_at` (-1 = pas de clic), `title`, `tag`, `tag_at` |
| `sales-notifs` | notifications qui s'empilent + total | `app`, `items` [{`title`, `body`, `at`}], `total`, `total_at` |
| `chat-thread` | conversation DM / SMS | `name`, `messages` [{`from`: `me`\|`them`, `text`, `at`}] |
| `testimonial` | étoiles qui se remplissent, citation mot par mot, auteur | `rating`, `count`, `quote`, `quote_at`, `author`, `meta`, `source` |
| `steps` | liste 1-2-3 qui se coche | `kicker`, `title`, `items` [{`text`, `at`, `check_at`}] |
| `annotate` | capture annotée à la main (cercle, encadré, souligné, flèche + étiquette manuscrite) | `src`, `img_h`, `marks` [{`type`: `circle`\|`box`\|`underline`\|`arrow`, `x`, `y`, `w`, `h` (0-1), `at`, `label`}] |
| `cta-comment` | « commente MOT » : mot-clé, commentaire qui se tape, promesse | `lead`, `keyword`, `keyword_at`, `handle`, `type_at`, `promise`, `promise_at` |

Variables communes à toutes : `theme` (`dark` / `cream`), `top` (position haute de la carte en px), `duration` (s),
`highlight` (instants où la carte pulse). Les valeurs par défaut de chaque modèle sont dans son `data-composition-variables`.

## Fichier de paramètres

```json
{
  "template": "steps",
  "words_file": "../../videos/mon-short/assets/transcript.json",
  "word_range": [120, 160],
  "t0": 41.2,
  "variables": {
    "theme": "cream",
    "title": "Pour monter ton panier moyen",
    "items": [
      { "text": "Le bundle avec cadeau",   "at": "w:bundle", "check_at": "w:cadeau" },
      { "text": "Le cross-sell au panier", "at": "w:cross",  "check_at": "w:panier" },
      { "text": "Le palier de livraison",  "at": "w:palier", "check_at": "w:livraison" }
    ],
    "duration": 6
  },
  "highlight_words": ["trois"]
}
```

- Toute valeur `"w:mot"` (y compris dans une liste) devient l'instant de ce mot, en secondes depuis le début de la carte (`t0`).
  Les timings viennent de `words.json` (kit avatar) ou `transcript.json` (kit HyperFrames) ; `fix` {index: "mot"} corrige un mot mal transcrit.
- Les images (`src`, `before_img`, `after_img`) sont des chemins relatifs au fichier de paramètres ; elles sont copiées dans `overlays/.media/`.
- Sans `words_file`, les instants s'écrivent en secondes.

## Utilisation dans les kits

- **Kit avatar (`sxb-shorts`)** : rendre en `--theme cream`, copier le `.webm` dans le projet, puis dans `scenes.py` :
  `OVERLAY_CLIPS = [(début_s, "carte.webm")]` (et mettre `None` comme fonction de la scène correspondante).
- **Kit HyperFrames** : utiliser le `.webm` comme élément `video` d'une scène, ou s'inspirer du modèle pour une scène native.

## Règles

- Chiffres, avis, notifications et conversations affichés doivent être **réels et sourcés** (variable `source`) :
  les valeurs d'exemple sont des illustrations. Pas de faux avis ni de fausses ventes présentés comme vrais.
- Les captures d'exemple de `examples/assets/` sont génériques (aucune marque réelle).
- Pour un nouveau modèle : copier un modèle existant, garder `_sxb.css` / `_sxb.js`, les variables communes, un fond transparent,
  et terminer par `SXB.finish("<id>")`. Les valeurs par défaut ne doivent pas contenir d'apostrophe droite (utiliser ’).
