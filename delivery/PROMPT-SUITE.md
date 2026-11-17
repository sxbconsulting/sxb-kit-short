On reprend mon projet de shorts « GTA » montés avec le kit sxb-kit-short.

Dépôt : sxbconsulting/sxb-kit-short, branche `claude/cool-gates-7rvjyh` (tout le travail est commité et poussé dessus).
Lis d'abord `AGENTS.md`, puis le `RUN.md` de chaque vidéo : il contient l'état, les décisions, les commandes qui marchent dans
l'environnement cloud et tout ce qui a été vérifié.

Méthode (non négociable) : les 7 gates du kit, mon « ok » à chaque gate, et **vérifier systématiquement 2 fois avant de m'envoyer
quoi que ce soit** (`scripts/verify-cut.py` pour l'audio, captures image par image + rendu complet + validateurs pour la vidéo).

## Les vidéos

| Vidéo | Dossier | État |
|---|---|---|
| 1. GTA 6 et propriété intellectuelle | racine du dépôt | livrée (`VERIFY.md`, légende dans `delivery/`, mot-clé GTA) |
| 2. GTA 3 niveaux de prix | `videos/gta-3-niveaux-prix/` | animatic v2 (punch, balayages néon, secousses) envoyée, **en attente de mon ok** pour livrer (CTA BOOTCAMP) |
| 3. GTA précommandes | `videos/gta-precommandes/` (ouverture « 7,7 M ») et `videos/gta-precommandes-hook/` (hook « vendre un jeu avant même qu'il existe ») | livrées toutes les deux (A/B), `VERIFY.md` + `legende.md` (mot-clé PRÉCO) |

Idée en suspens : passer les vidéos 1 et 2 au même niveau d'animation que la vidéo 3 (réglages `punch`, `wipes`,
`shake_on_stamp`, `fx2`, `idle_motion` de `scripts/build-reel.py`).

## Le style (validé)

DA inspirée de GTA 6 / Vice City (`gta.css`) sans logo ni illustration Rockstar dans l'habillage ; extraits du trailer 2 seulement en
B-roll crédité (« Images : Rockstar Games — GTA VI Trailer 2 »), vidéos à ne jamais sponsoriser. Mon avatar SxB (16 poses) dans un
monde coucher de soleil (`scripts/avatar-world.py`, poses calées sur les mots dans `assets/avatar-poses.json`). Alternance split /
plein écran avec ma tête dans une bulle en bas à gauche / avatar plein cadre. Sous-titres highlight Anton rose néon. Une animation
toutes les ~2 s. Sons parcimonieux (banque ~/sxb-sfx), **pas de musique** (je la pose moi-même). Faits vérifiés et sourcés à l'écran,
exemples fictifs étiquetés « EXEMPLE ».

## Les médias ne sont pas dans git : à récupérer dans une nouvelle session

- Avatar (16 poses) : mon Google Drive, dossier `1JkWMvBgWIWD39o05crLqM7veO003anYP` → `assets/brand/avatar/src/` puis détourage
  (voir `RUN.md` de la vidéo 1, section Avatar).
- Trailer GTA VI 2 : `yt-dlp` sur le post X officiel https://x.com/RockstarGames/status/1919746311382851812 (YouTube bloque) →
  `assets/broll/src/x-trailer2.mp4`, puis `scripts/footage.py` avec les intervalles de `assets/broll/ledger.json`.
- Audios sources : je te les renvoie en pièce jointe si tu dois re-rendre une vidéo.
- Captures : refaites avec Firecrawl (URLs dans les `DESIGN.md` / `RUN.md`).

## Pièges connus de l'environnement cloud

- Transcription : pas de clé ElevenLabs → WhisperX (`./setup.sh --whisperx`) avec
  `WHISPERX_VAD=pyannote WHISPERX_ALIGN_MODEL=jonatasgrosman/wav2vec2-large-xlsr-53-french`, et transcrire l'audio coupé
  **prise par prise** (`transcribe.py --segments`) puis `scripts/cut-transcript.py` (corrections dans `assets/derush/cut-fixes.json`).
- Mixkit, Pexels, Pixabay, rockstargames.com : bloqués → captures via Firecrawl.
- Google Drive : le connecteur refuse les fichiers de plus de ~3 Mo → les vidéos, je les dépose moi-même dans Drive › CLAUDE.

Commence par me dire où on en est en 5 lignes, puis attends ma consigne.
