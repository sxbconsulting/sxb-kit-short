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
- [x] 2. Dérush — v2 92,7 s validée (« continue la suite »)
- [x] 3. Sous-titres — validés (« Good on continue »)
- [x] 4. Beats et assets — validés, extraits du trailer gardés (« ok garde les extraits »)
- [ ] 5. Ouverture — A / B / C rendues (`review/openings/`, storyboards dans `openings/`), en attente du choix
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

### v1 refusée — retours utilisateur et causes

| Retour (temps du montage v1) | Cause | Correction v2 |
|---|---|---|
| bug à 17 s | faux départ « Les reprendre, c'est… » (src 21,2-22,1) avalé par WhisperX dans t04 | t04 démarre à 22,76 |
| blanc à 33 s | 1,7 s de silence en tête de t09 | t09 démarre à 48,26 |
| reprise à 47 s | « et surtout ça va montrer que tu as… » (src 66,5-67,8) puis la bonne version, fusionnées par WhisperX | t11 coupée en deux : 64,22-66,44 + 68,40-74,24 |
| bugs 1:25-1:30 | les plages t22/t23/t24 (et t12/t13, t27/t28) **se chevauchaient dans la source** → audio rejoué | plages reconstruites sur l'énergie du signal, sans chevauchement (assert) |

Leçon : ne jamais se fier aux bornes de takes.py ni aux mots alignés sur une prise entière. Les bornes viennent des zones de parole
mesurées (énergie 20 ms) et chaque doute est retranscrit seul (faster-whisper sur la fenêtre, sans VAD).

**Vérification obligatoire, 2 passes avant chaque envoi** (demande de l'utilisateur) :
`python3 scripts/stage.py` → `transcribe.py assets/reel-audio.wav --out assets/derush/cut.json` → `~/.reel-kit/venv/bin/python scripts/verify-cut.py`
(blancs > 0,55 s, groupes de 3 mots répétés, chaque jointure retranscrite seule) → corriger → repasser.
Passe 1 v2 : t03 coupée trop tôt (« avec le nom… c'est à eux » perdu) → out 20,62 ; 3 pauses de 0,6 s réduites (t04, t23, t27 coupées
dans le silence). Passe 2 : 0 blanc, répétitions restantes voulues (« qui va être refusée / bloqué », « que ce soit au travers… »,
« tu as les mêmes références / codes »). Gardé : « D'abord, en gros, » (pas de silence pour couper proprement).

`scripts/cut-transcript.py` : `assets/transcript.json` reconstruit depuis la transcription de l'audio coupé lui-même (381 mots).
Erreurs ASR à corriger à la gate 3 : « commande » → « commente », « t'emmètra » → « te permettra ».

## Avatar — 16 poses (Google Drive, dossier partagé `1JkWMvBgWIWD39o05crLqM7veO003anYP`)

Téléchargées dans `assets/brand/avatar/src/`, détourées (contour blanc du sticker gardé) dans `assets/brand/avatar/<pose>.png`, hors git :
pouce, neutre, reflexion, ok, reflexion-2, coeur, pointe, appelle, neutre-rondes, poing, poings, peace, double-pouce,
double-pouce-langue, mains-jointes, surpris.

## Gate 3 — sous-titres et monde avatar

- `scripts/avatar-world.py` → `assets/speaker.mp4` (à relancer APRÈS `stage.py`, qui réécrit speaker.mp4) : ciel coucher de soleil
  violet → magenta → orange, soleil rayé façon Vice City sur l'horizon (y 1500), reflets, 3 palmiers qui ondulent, étoiles, avatar 760 px
  qui respire devant le soleil avec halo rose ; pop (0,86 → 1, back-out) à chaque pose. Poses calées sur les mots dans
  `assets/avatar-poses.json` (22 changements ; ancrage = mot exact d'abord, sinon début de mot — bug corrigé : « w:risque » tombait sur « risquer »).
- Polices ajoutées (OFL, locales, déclarées dans `tokens.css`) : Anton (affiche condensée), Kaushan Script (script néon).
- Sous-titres : `highlight` (défaut kit) aux couleurs GTA : Anton 92 → 81 px, aplat rose néon `#FF2E88`, texte blanc, contour noir 11 px
  retiré pendant le surlignage (variable `--hl` posée par build-reel, `caption_extra_css`), `cap_top` 1590 sur l'eau sombre.
  `lexicon` : commande → commente, t'emmètra → te permettra.
- Vérif passe 1 : liseré parasite autour du mot surligné (contour dessiné dans l'aplat) → corrigé. Passe 2 : 12 instants, mot surligné =
  mot dit ; −16,3 LUFS / −1,3 dBTP ; `npm run check` 0 erreur, contraste 15/15.
- Faits vérifiés pour la gate 4 : sortie le jeudi 19 novembre 2026 (newswire Rockstar), boutique « GTA VI Collection » du Rockstar
  Store (t-shirts, casquettes, Zippo Vice City). yt-dlp atteint la chaîne Rockstar Games (« Grand Theft Auto VI Trailer 1 »).

## Gate 4 — beats et assets (validés)

Voir `DESIGN.md` (shortlist, 18 beats), `OPEN-LOOPS.json`, `REFERENCE-ANALYSIS.md`, `assets/broll/ledger.json`.
Captures via Firecrawl (rockstargames.com et le CDN Rockstar sont bloqués par le réseau de la session). Trailer 2 depuis le post X
officiel (YouTube : anti-robot). 8 extraits, chacun vérifié sans coupe interne (détection de scène), logo coupé avant « May 26, 2026 ».
Droits : © Rockstar/Take-Two, extraits courts crédités, usage organique uniquement — ne pas sponsoriser ce reel (dit à l'utilisateur, il garde les extraits).

## Gate 5 — ouvertures

`gta.css` (zone S au look Vice City : fond nuit + lueur + grille néon, cartes postales à liseré blanc, tampons Anton, variantes
`no` / `neon` / `credit` / `ok`). `build-reel.py` : items de zone `class`, `instant` (pas d'animation d'entrée), `zone.no_intro`.
Vérif passe 1 : surlignage Meta coupé (« rejected or re… ») et zoom trop tardif (B), C muet avant 2,5 s → corrigés.
Passe 2 : image 0 grise et vide dans les 3 (fondu d'entrée de la zone) → `no_intro` + premier élément `instant` ; lint 0 erreur
(@font-face ajoutés dans gta.css). 3 rendus de 7,3 s + `review/openings/comparatif-ABC.mp4`.
