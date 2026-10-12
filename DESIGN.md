# Projet « concurrence en e-commerce » — design

> Gate 4 validée le 12/10/2026 (« Go »). Look : `DA-SXB.md` (noir, blanc, accent pêche `#FECA8A`, Archivo).
> Le look papier du kit est conservé plus bas en annexe, il ne s'applique pas à ce projet.

## Public et promesse

Débutants en e-commerce (élèves bootcamp, porteurs de projet Ulule / Stayfocused) qui fuient les marchés concurrentiels.
Leçon livrée : la concurrence prouve la demande ; on gagne par le positionnement (Loop, Chillow), pas par le marché vierge.

## Direction

Split screen S (écran noir en haut, visage en bas) pour chaque preuve chiffrée ou capture ; plein visage F (×1,4) pour
l'accroche, la conviction (« Si ça ce n'est pas une preuve ») et « l'angle qui manque ». Une seule couleur d'accent.
Les chiffres comptent (count-up), les listes se cochent sur le mot prononcé, les captures réelles entrent en carte arrondie.

## Shortlist d'assets (provenance : `assets/captures/ledger.json`)

| Asset | Source | Rôle |
|---|---|---|
| `assets/captures/loop/forbes-mobile.png` | Forbes 25/10/2025 | preuve du 220 M$ + Gen Z, ferme la boucle « quelle marque ? » |
| `assets/captures/chillow/hero.png` | mychillow.fr | la marque du coussin en U, 99 € |
| `assets/captures/aliexpress/grid.png` | AliExpress FR | le même coussin à 21,19 € : même produit, autre positionnement |
| Trendtrack (données) | loopearplugs.com, mychillow.fr | 4,23 M visites/mois ; 407 ads, 150 358 $ / 30 j |

## Beats (validés)

| # | Sortie (s) | Parole | Layout | Visuel |
|---|---|---|---|---|
| 1 | 0–5.33 | accroche | gate 5 | 3 ouvertures A/B/C |
| 2 | 5.33–14.33 | bouchons, 4 M visiteurs | S | count-up 4 000 000 VISITEURS, carte « UNE MARQUE · BOUCHONS D'OREILLES » logo masqué « ? » |
| 3 | 14.33–24.37 | objection, marché vierge | S | marché saturé (points) vs marché vierge (vide) |
| 4 | 24.37–27.83 | pas une si bonne idée | F | punch-in + tampon FAUSSE BONNE IDÉE |
| 5 | 27.83–48.23 | demande éprouvée, éduqué, différence | S | checklist #1 #2 #3 sur les mots |
| 6 | 48.23–58.63 | Loop, 220 M | S | « ? » → Loop, capture Forbes, 220 M$ count-up |
| 7 | 58.63–73.43 | une seule chose, Gen Z, lifestyle | S | duel mass market vs Génération Z, tags lifestyle / cool |
| 8 | 73.43–87.03 | coussin en U, AliExpress, positionnement | S | AliExpress 21,19 € → Chillow 99 € |
| 9 | 87.03–93.27 | 400 ads, 150 000 $ | S | deux count-ups, source Trendtrack |
| 10 | 93.27–94.30 | si ça ce n'est pas une preuve | F | punch-in, rien d'autre |
| 11 | 94.30–105.53 | analyse : tunnel, acquisition, conversion | S | checklist 2 |
| 12 | 105.53–108.23 | l'angle qui manque | F | punch-in |
| 13 | 108.23–110.73 | abonne-toi | fin | écran de fin noir et pêche |

## Ouverture (gate 5)

À remplir après le choix A / B / C.

---

# Annexe — look papier du kit (non utilisé ici)

# sxb-kit-short — Visual direction

> Validated 16/09/2026. Derived from the "paper" style of Nate Herk's HyperFrames Student Kit
> (MIT, `style-library/01-vox-explainer`), AIS accent replaced with orange, adapted to 9:16.
> Every scene traces its palette, type and motion back to this file. The values live in `tokens.css`.

## Style

Warm paper, warm ink, a single orange accent. Cut-out cards, slightly askew, drop shadow.
Real objects: website captures, screens, hands, paper. It always moves, never smoothly: snap, stutter,
overshoot. Grain texture everywhere. Never add the creator's own logo unless the brand brief asks for it: the brand is the editorial chrome and the palette.

Visual references: `assets/references/` (contact sheets of Nate's reels, comparison from 15/09).

## Colors

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#efe9dc` | paper background |
| `--paper-2` | `#e6dcc4` | kraft paper, second stacked sheet |
| `--ink` | `#17130e` | text, ink |
| `--accent` | `#f26a1b` | THE only accent: fills (checkmarks, tags), caption keyword |
| `--accent-ink` | `#d35c18` | the same accent as text on paper (3:1 contrast required by `check`) |
| `--alarm` | `#e23b2e` | hand-drawn circles and strike-throughs only |
| `--muted` | `rgba(23,19,14,.55)` | kicker, metadata |

One accent per frame. Never two oranges fighting each other. Never pure white or pure black.

## Type

- **Headlines**: Archivo 900, uppercase, tracking -0.03em, 96 to 120 px. The accent word in orange Fraunces italic.
- **Kicker**: Archivo 700, uppercase, tracking 0.16em, 26 px, ink grey. Format `02 / SCHEDULING` on the left, `02 — 04` on the right.
- **Handwritten notes**: Caveat 700, red, rotated -6°. Never useful text, only annotations.
- **Card body**: Archivo 900 for rows, Archivo 700 for times and metadata, 40 to 44 px.
- **Captions**: Archivo 900, 62 px, white, black outline, on an 80% ink pill (assumes a light background), orange keyword. On EVERY frame, centered, at the video/paper junction.

Fonts are local in `assets/fonts/` (OFL). No Google Fonts call at render time.

## Layout (1080×1920)

| Layout | When | Geometry |
|---|---|---|
| **C** split, face on top (default) | you explain and the card illustrates | full-frame video 0→1000 px, paper below, card biting into the video at ~940 px |
| **B** split, face at the bottom | the card needs height | paper 0→1000 px, rounded face box 900×780 at `left:90 top:1030`, drop shadow |
| **D** full screen | one idea, one number, one proof | full-frame paper, no face |
| **F** full-frame face | hook, CTA, punchline | video alone + captions |

Alternate every 2 to 4 s. Never the same layout twice in a row. Never anything over the face.
Cards: rotation -1.4°, second kraft sheet offset behind, shadow `8px 12px 24px`.

## Motion

- Entrance: `back.out(2.2)`, 0.42 s. Choppy: `steps(6)`. Exit: 0.3 s, never a slow fade.
- First element at +0.1 s from scene start. Stagger 0.08 to 0.14 s between sub-elements.
- Ambience: a single slow movement per scene (camera push 1.0→1.04, or pan across a capture).
- Every sub-composition timeline ends with `tl.to({}, { duration: SLOT }, 0)` (see MOTION.md).

## Transitions

Hard cut by default, the entrance stutter does the transition. Horizontal whip 0.25 s when changing worlds
(split → full screen). Never a crossfade.

## Forbidden

Pure white, pure black, decorative gradients, glows, perfectly centered layouts, Helvetica, half-empty card,
text unreadable at phone size, invented mockup when the real thing exists, the creator's own logo (unless the brand brief asks for it), two accents per frame,
the AIS blue `#37BDF8` (property of AIS, not licensed).
