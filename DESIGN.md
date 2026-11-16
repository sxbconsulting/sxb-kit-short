# Projet « GTA 6 et propriété intellectuelle » — design

> Gate 4 en cours (16/11/2026). Look : **inspiration GTA 6 / Vice City** (choix utilisateur), créé pour SxB : aucun logo ni
> illustration officielle Rockstar dans l'habillage ; les vraies images GTA VI n'apparaissent qu'en B-roll cité et crédité.
> Le look papier du kit est conservé plus bas en annexe, il ne s'applique pas à ce projet.

## Public et promesse

E-commerçants débutants et intermédiaires (bootcamp, porteurs de projet Ulule / Stayfocused) qui veulent profiter de la sortie
de GTA 6 (jeudi 19/11/2026) sans se faire bloquer. Leçon livrée : **l'ambiance oui, la marque non**, en 3 actions
(retravailler la boutique, surfer avec le contenu, jeu concours avec le vrai jeu), puis CTA « commente GTA » → checklist.

## Direction

- **Monde** : `assets/speaker.mp4` = avatar SxB (16 poses) devant un coucher de soleil Vice City (violet → magenta → orange,
  soleil rayé, palmiers, étoiles), généré par `scripts/avatar-world.py`, poses calées sur les mots (`assets/avatar-poses.json`).
- **Layouts** : **S** (zone écran 0→880 px en haut, avatar en dessous) pour chaque preuve, capture, extrait ou carte ;
  **F** (monde plein cadre) pour les questions et les moments d'émotion (question centrale, CTA abonnement).
- **Palette** : fond nuit `#14082A`, rose néon `#FF2E88` (accent unique des aplats), soleil `#FFC861`, turquoise `#19E3D2`
  (rare, validations ✓), blanc. Rouge `#FF3B3B` uniquement pour les interdits (✗, « refusé », « bloqué »).
- **Typo** : Anton (titres, sous-titres, tampons), Kaushan Script (mots « signature » en néon : « Vice », « l'ambiance »), locales OFL.
- **Motion** : entrées nettes (`power3.out` 0,3 s), tampons qui claquent (`back.out`), captures en carte arrondie qui
  zooment + surlignage rose sur la donnée, extraits du trailer dans un cadre « carte postale » incliné ±3° avec liseré blanc
  (clin d'œil collage des affiches GTA, sans les copier). Un événement visuel toutes les ~2 s.
- **Cartes** : modèles `overlays/` avec un thème `gta` ajouté (fond nuit, rose néon, Anton) — à construire à la gate 6.

## Shortlist d'assets

| Asset | Source / provenance | Intervalle | Droits | Rôle |
|---|---|---|---|---|
| `assets/captures/rockstar/newswire-19-nov.png` | rockstargames.com/newswire « GTA VI is Now Set to Launch November 19, 2026 » (capture Firecrawl 1080×1920, 16/11/2026) | — | capture d'une page publique, citée | preuve de la date |
| `assets/captures/rockstar/store-gtavi.png` | store.rockstargames.com/grand-theft-auto-vi-collection (capture 16/11/2026) | — | capture d'une page publique, citée | t-shirts, casquettes, Zippo Vice City : « ça c'est à eux » |
| `assets/captures/meta/ip-third-party.png` | transparency.meta.com — Third-Party Intellectual Property Infringement (capture 16/11/2026) | — | capture d'une page publique, citée | « Ads may be rejected or removed » : pub refusée / compte bloqué |
| `assets/broll/gta-vice-aerial.mp4` | GTA VI Trailer 2, post X officiel @RockstarGames | 6,60–8,08 | © Rockstar/Take-Two, extrait court crédité | Vice City vue du ciel |
| `assets/broll/gta-skyline.mp4` | idem | 34,80–37,95 | idem | ambiance à la GTA |
| `assets/broll/gta-sunset-dock.mp4` | idem | 81,70–84,60 | idem | les palmiers, le coucher de soleil |
| `assets/broll/gta-neon-club.mp4` | idem | 100,00–102,90 | idem | les néons |
| `assets/broll/gta-neon-sign.mp4` | idem | 127,05–128,90 | idem | l'univers de Vice City |
| `assets/broll/gta-jetski.mp4` | idem | 140,10–141,78 | idem | si ta cible joue |
| `assets/broll/gta-sunset-city.mp4` | idem | 153,60–155,80 | idem | on va comprendre la référence |
| `assets/broll/gta-logo-vi.mp4` | idem | 158,00–161,40 (avant la date périmée « May 26, 2026 ») | idem | le nom, le logo → barré |
| Boutique fictive avant / après | à créer (HTML → PNG), marque inventée, aucun nom ni logo GTA | — | création SxB | « retravailler ta boutique » |
| Exemples contenu : vidéo, mail, story, post concours, commentaires | à créer, étiquetés « EXEMPLE » | — | création SxB | conseils 2 et 3 (rien de présenté comme réel) |

Bloqués ici : YouTube (anti-robot), Pexels / Pixabay (réseau). Le trailer vient du post X officiel ; TikTok officiel = même
trailer en vertical mais couché et sans son.

## Ouvertures (gate 5)

Trois concepts à construire sur la même parole (0–7,3 s, « Mettre GTA sur ton produit… risquer son compte publicitaire ») :
- **A — Le tampon** : t-shirt noir, « GTA » se colle dessus au mot « GTA », cadre « Sponsorisé » au mot « publicités »,
  tampon rouge « PUB REFUSÉE » au mot « risquer ». Question : pourquoi ?
- **B — La preuve d'abord** : capture Meta, la ligne « Ads may be rejected or removed » se surligne en rose dès 0,5 s,
  l'avatar surpris en dessous. Question : alors comment surfer sur GTA ?
- **C — Le logo barré** : extrait logo VI du trailer qui s'allume, puis une croix rouge le barre au mot « risquer ».
  Question : qu'est-ce qu'on a le droit de faire ?


## Beats (proposés, gate 4)

Temps = secondes du montage coupé (92,77 s). Mot d'ancrage entre guillemets. Cartes : modèles `overlays/` (thème `gta` à ajouter) ou
items de zone du kit ; « fait main » quand aucun modèle ne convient.

| # | Temps | Parole | Layout | Visuel (événements) | Carte |
|---|---|---|---|---|---|
| 1 | 0,00–7,31 | Mettre GTA sur ton produit… risquer son compte publicitaire | S | ouverture A/B/C (gate 5) ; « GTA » 0,49 · « publicités » 2,53 · « hype » 4,63 · « risquer » 6,21 (avatar surpris) | fait main / `annotate` |
| 2 | 7,31–9,65 | GTA 6 sort jeudi, le 19 novembre | S | trailer `gta-vice-aerial` en carte postale (7,36) ; tampon « JEUDI 19.11 » sur « 19 » (8,70) ; mini-source newswire | `stamp` |
| 3 | 9,65–12,33 | Rockstar a déjà ouvert sa propre boutique de produits dérivés | S | capture `store-gtavi` (9,70), zoom bannière, surlignage « Grand Theft Auto VI Collection » sur « boutique » (11,30) | `annotate` |
| 4 | 12,33–17,50 | t-shirts, casquettes, briquets… le nom, les logos, l'univers de Vice City, ça c'est à eux | S | cercles sur t-shirt (12,82), casquette (13,34), Zippo (13,82) ; `gta-logo-vi` (14,96) ; `gta-neon-sign` (16,06) ; tampon « © ROCKSTAR » (17,06) | `annotate` + `stamp` |
| 5 | 17,50–22,87 | risque juridique… publicité refusée… compte bloqué | S | tampon « RISQUE JURIDIQUE » (18,32, avatar surpris) ; capture Meta (19,42), surlignage « Ads may be rejected or removed » (20,38) ; badge rouge « COMPTE BLOQUÉ » (22,48) | `annotate` + `stamp` |
| 6 | 22,87–25,57 | Mais comment tu veux faire pour surfer dessus quand même ? | F | avatar réflexion ; « Comment surfer dessus ? » en néon (23,06) ; 3 cases vides #1 #2 #3 (24,84) = boucle principale | `steps` (vides) |
| 7 | 25,57–30,40 | D'abord… retravailler toute ta boutique… l'ambiance. Pas la marque. | S | case #1 « L'AMBIANCE » (25,62) ; boutique fictive AVANT (26,84) → APRÈS néon (29,03) ; logo VI barré (29,91) | `before-after` |
| 8 | 30,40–34,45 | Les néons, les palmiers, l'ambiance années 80. Aucun nom, aucun logo. | S | `gta-neon-club` (30,57) → `gta-sunset-dock` (31,17) → tampon « 80's » (31,97) → ✓ 0 nom (33,19) ✓ 0 logo (34,05) | `check` |
| 9 | 34,45–40,50 | …sur ta boutique en ligne, on va comprendre la référence… une certaine ambiance | S | boutique APRÈS dans un téléphone qui défile (35,69) ; `gta-sunset-city` à côté (37,27) ; signe « = » qui les relie (37,95) ; zoom (39,78) | `phone-shot` |
| 10 | 40,50–48,50 | Les clients vont apprécier le clin d'œil… évolue au gré des actualités | F → S | F avatar cœur (40,66), badge 😉 (41,88) ; S (43,26) frise d'actus (Black Friday, GTA 6 19/11, Noël) qui s'allume sur GTA (46,96) | fait main |
| 11 | 48,50–55,75 | Ensuite, surf sur l'actu avec ton contenu, pas avec tes produits… vidéos, mails, stories | S | case #2 « TON CONTENU » (48,59) ; ✓ contenu (50,06) ✗ produits (50,95) ; exemples vidéo (52,45), mail (54,55), story (55,29) | `myth-truth` + `phone-shot` |
| 12 | 55,75–59,05 | Utilise cette actualité… toutes les références | S | `gta-skyline` (56,19) ; étiquettes qui pop : palmiers · néons · sunset · 80's (58,47) | fait main |
| 13 | 59,05–68,90 | Nourris-toi de l'ambiance… mêmes références, mêmes codes… point commun… te différencier | F → S | F avatar poing + « l'ambiance » en néon (59,11) ; S (62,23) cercles TOI / TON AUDIENCE ✓ références (63,75) ✓ codes (64,85), intersection « POINT COMMUN » (65,83) ; ta carte néon sort d'une rangée grise « concurrents » (67,09) | fait main |
| 14 | 68,90–76,85 | Enfin, si ta cible joue, fais-lui gagner le jeu… en magasin… le code… jeu concours | S | case #3 « JEU CONCOURS » (68,95) ; `gta-jetski` (69,83) ; « À GAGNER » + avatar poings (70,55) ; carte « vrai jeu » (72,42) ; code qui se gratte (75,04) ; « JEU CONCOURS » (76,63) | fait main |
| 15 | 76,85–80,40 | Tu peux écrire GTA 6 à gagner, c'est le lot. Leur logo, toujours pas. | S | post concours EXEMPLE « GTA 6 À GAGNER » qui se tape (77,35), ✓ (78,83) ; `gta-logo-vi` + croix rouge (79,25) | `myth-truth` |
| 16 | 80,40–85,90 | dis-moi quel produit tu prendrais… des clients, pas des chasseurs de cadeaux | S | commentaires EXEMPLE (81,68) ; ✓ clients (84,54) ✗ chasseurs de cadeaux (85,23) ; 3 cases cochées = boucle fermée (85,61) | `chat-thread` + `myth-truth` |
| 17 | 85,90–88,40 | …abonne-toi | F | avatar double pouce ; bouton « S'ABONNER » cliqué (87,81) | fait main |
| 18 | 88,40–92,77 | Et commente GTA… ma checklist… sans aucun risque. Allez, ciao ! | S plein | « COMMENTE GTA » tapé (88,79) ; checklist 3 points (89,64) ; ✓ sans risque (91,72) ; avatar mains jointes (92,14) | `cta-comment` |

Crédit affiché pendant chaque extrait : « Images : Rockstar Games — GTA VI Trailer 2 ». Captures : source en petit sous la carte.

---

## Annexe — look papier du kit (non utilisé ici)

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

Fonts are local in `assets/fonts/` (OFL): Archivo, Poppins, Fraunces, Caveat. No Google Fonts call at render time — never name a font that is not declared in `tokens.css` (« Helvetica Neue » makes HyperFrames download Inter from Google).

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

Pure white, pure black, decorative gradients, glows, perfectly centered layouts, Helvetica or any font not declared in tokens.css, half-empty card,
text unreadable at phone size, invented mockup when the real thing exists, the creator's own logo (unless the brand brief asks for it), two accents per frame,
the AIS blue `#37BDF8` (property of AIS, not licensed).
