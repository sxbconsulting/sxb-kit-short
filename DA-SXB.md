# DA SXB — direction artistique des shorts

Charte par défaut de tous les shorts SXB. Elle remplace le look « papier » de `DESIGN.md` sauf si un projet dit autrement.
Inspirations : Ludo Salenne (structure et narration, ex. « Le plus gros mensonge sur l'Intelligence Artificielle »,
YouTube, 11/10/2026) et des showreels motion design faits avec Claude, repérés sur X (typo cinétique, transitions
nettes, profondeur). On s'inspire de la méthode, on ne copie ni leurs visuels ni leurs textes.

## Couleurs

| Rôle | Valeur | Usage |
|---|---|---|
| Fond | `#000000` noir | zones écran, cartes, fin de vidéo |
| Texte | `#FFFFFF` blanc | sous-titres, titres |
| Accent | `#FECA8A` pêche | mot-clé, chiffre clé, soulignement, barre de progression, CTA |

Une seule couleur d'accent, utilisée avec parcimonie : 1 ou 2 éléments accentués à l'écran à la fois, jamais un bloc entier.
Texte noir sur l'accent (`#000`) quand l'accent sert de fond (pastille, bouton CTA).

## Typo

- Sous-titres et titres : sans-serif très grasse (Archivo du kit en 800–900, ou Helvetica Neue Bold).
- Chiffres : même famille, très gros (180–220 px), en accent `#FECA8A`, avec un count-up.
- Pas de serif, pas de manuscrit (Caveat) sauf clin d'œil ponctuel.

## Sous-titres

- Style `pop` : mot par mot, blanc, 2 à 3 mots par ligne, mot-clé ×1.5 en `#FECA8A`.
- Placés au tiers bas, jamais sur la bouche. Ombre portée légère pour la lisibilité.

## Narration (méthode Ludo, version short 45–60 s)

1. **0–3 s, l'accroche « croyance démontée »** : citer une phrase que tout le monde répète, puis la contredire.
   Ex. « On te dit qu'il faut un produit unique pour réussir en e-commerce. C'est faux. »
2. **3–10 s, l'aveu ou l'enjeu** : « Moi aussi je l'ai cru », ou ce que ça coûte de se tromper.
3. **10–40 s, une preuve** : un chiffre sourcé à l'écran, un exemple concret (une boutique, un élève, un prénom
   d'exemple assumé), et **une seule analogie** simple (la baignoire, les chaises musicales…).
4. **40–55 s, l'action** : 1 à 3 choses à faire dès maintenant, numérotées à l'écran.
5. **Fin, l'engagement** : une question à laquelle répondre par un chiffre ou un mot en commentaire
   (« tu en es à quelle étape, 1, 2 ou 3 ? ») ou « commente MOT ».

## Motion (esprit showreel)

- Fond noir, éléments qui entrent avec un easing net (`power3.out`, 0,3–0,5 s), pas de rebond gadget.
- Typo cinétique sur les phrases clés : mots qui montent en cascade, chiffre qui compte.
- Profondeur : cartes avec légère perspective, léger flou d'arrière-plan, halo pêche très discret derrière un chiffre.
- Punch-in de 1,1 à 1,2× sur le visage aux moments forts, coupe nette, pas de fondu mou.
- Captures réelles (Shopify, fournisseurs, stats) en cartes à coins arrondis, zoom + surlignage pêche sur la donnée.
- Un événement visuel toutes les 2 secondes environ, sinon `holdReason`.

## Réglages storyboard.json

```json
"caption_style": "pop",
"caption_font": "\"Archivo\", \"Helvetica Neue\", Helvetica, Arial, sans-serif",
"caption_accent": "#FECA8A",
"brand": { "bg": "#000000", "ink": "#FFFFFF", "accent": "#FECA8A", "accent_ink": "#000000",
           "font": "\"Archivo\", \"Helvetica Neue\", Helvetica, Arial, sans-serif" },
"locale": "fr-FR",
"css": ["sxb-dark.css"], "zone_sheen": false,
"face_zoom_f": 1.2, "face_pos_f": "50% 38%", "face_zoom_s": 1.1, "face_pos_s": "50% 32%"
```

`sxb-dark.css` restyle les éléments de la zone écran (cartes, liste #1 #2 #3, pastilles, badges, tampons, surlignages)
pour le fond noir ; sans lui ces éléments sont pensés pour un fond clair (cartes blanches, accent rouge).

Mises en page conseillées : **S** (écran noir en haut, visage en bas) pour les passages avec une donnée ou une capture,
**F** (plein visage) pour l'accroche et les phrases d'émotion, écran de fin `zone.full` noir avec le CTA en pêche.
