# RUN — GTA 6 et propriété intellectuelle

Source : `gta-propriete-intellectuelle_Audio_2026-11-16_a__15.16.53.m4a` (upload, 195,4 s, AAC mono 48 kHz), **audio seul**.
Copié dans `assets/derush/source.m4a` ; `assets/derush/raw.mp4` = fond noir 1080×1920 30 fps + cet audio, pour que `takes.py` tourne. Jamais dans git.

Brief : monter la vidéo avec le kit et l'avatar SxB, illustrer avec des vidéos et images d'internet, une animation toutes les ~2 s,
DA inspirée de GTA 6.

## Décisions

- Format : **9:16, durée complète** (≈ 104 s après dérush).
- DA : **inspiration GTA 6** (néons Vice City rose / orange / turquoise, coucher de soleil, typo affiche, cadres collage),
  sans logo ni illustration officielle de Rockstar dans l'habillage. Les vraies images GTA 6 seulement en B-roll illustratif sourcé.
- B-roll : extraits vidéo (yt-dlp installé) + captures, chaque asset avec source et droits dans `assets/broll/ledger.json`, montré à la gate 4.
- Personnage : avatar SxB (stickers, casquette SxB, lunettes orange). Pas de visage filmé : l'avatar remplace le speaker.
  5 poses reçues en fichier et détourées dans `assets/brand/avatar/` (neutre-rondes, neutre, pouce, ok, reflexion), hors git.
  11 autres poses vues dans le chat mais **pas reçues en fichier** (surpris, doigts pointés, appelle-moi, poings, V, double pouce,
  cœur, coup de poing, double pouce langue, mains jointes, réflexion 2) : demandées via Google Drive ou pièce jointe.

## Gates

- [x] 1. Cadrage — sans objet (audio seul), 1080×1920
- [x] 2. Dérush — liste validée (21 prises), montage coupé 103,3 s en écoute (`review/gate2-cut.mp4`)
- [ ] 3. Sous-titres
- [ ] 4. Beats et assets
- [ ] 5. Ouverture
- [ ] 6. Animatic → final
- [ ] 7. Livraison

## Environnement de transcription (cloud)

Pas de clé ElevenLabs → WhisperX local. Le proxy bloque torch.hub (Silero) et download.pytorch.org :
`WHISPERX_VAD=pyannote WHISPERX_ALIGN_MODEL=jonatasgrosman/wav2vec2-large-xlsr-53-french python3 scripts/takes.py assets/derush/raw.mp4`
(+ une fois : `NLTK_ALLOW_PROXIED_URLOPEN=1 ~/.reel-kit/venv/bin/python -c "import nltk; nltk.download('punkt_tab')"`).

## Gate 2 — dérush

takes.py : 29 prises, 27 gardées (126,6 s). Relecture manuelle : 6 prises de plus retirées, 4 fins coupées → **21 prises, 103,7 s**.
Proposition dans `/tmp/.../scratchpad/segments.v1.json` (appliquée à `raw.segments.json` après le ok).

| Prise | Décision | Raison |
|---|---|---|
| t07, t08 | retirées | « Que ce soit des néons… » puis « on va le refaire » : reprise, on garde t09 |
| t12 | fin coupée à 83,66 | « que ce soit au » redit au début de t13 |
| t13 | fin coupée après « stories » | la fin « utilise l'intégralité… auxquelles t'appuies » est reprise proprement en t14 |
| t14 | fin coupée après « références » | « qui peuvent faire justement » reste en suspens |
| t15, t17 | retirées | deux essais de « Nourris-toi de l'ambiance… », on garde t18 complet |
| t20 | retirée | « Un vrai GTA », faux départ de t22 |
| t21 | retirée (takes.py) | reprise de t22 |
| t27 | fin coupée avant « Allez » | doublé par t28 « Allez ciao » |
| t16, t29 | retirées | vides |

Confirmé par l'utilisateur : t27 = « **commente** GTA » (WhisperX entend « commande ») → `lexicon` {"commande": "commente"}.

Après le ok, recalages fins pour retirer les mots doublés aux jointures : t06 out 38,09 (avant « Que »), t12 out 83,56 (avant « que »),
t14 out 97,91 (avant « qui »). `scripts/clean-transcript.py` (après `stage.py`) retire du transcript les mots hors des plages gardées
et les doublons de prises qui se chevauchent. Résultat : 103,3 s, 373 mots.

## Avatar — 16 poses (Google Drive, dossier partagé `1JkWMvBgWIWD39o05crLqM7veO003anYP`)

Téléchargées dans `assets/brand/avatar/src/`, détourées (contour blanc du sticker gardé) dans `assets/brand/avatar/<pose>.png`, hors git :
pouce, neutre, reflexion, ok, reflexion-2, coeur, pointe, appelle, neutre-rondes, poing, poings, peace, double-pouce,
double-pouce-langue, mains-jointes, surpris.
