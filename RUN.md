# RUN — concurrence en ecom

Rush : `concurrence en ecom_IMG_5235.MOV` (Google Drive, dossier partagé, id `1kzYThrbeWgKCBy95DEz8kS3CUxdQ7rxO`),
copié hors du dépôt dans `/home/user/rush/concurrence_IMG_5235.MOV` (1 242 863 152 octets, identique à Drive). Jamais dans git.

Brief : l'importance de la concurrence en e-commerce. Split screen et motion design autorisés. DA par défaut : `DA-SXB.md`.

## Gates

- [x] 1. Cadrage — B ×1,4
- [x] 2. Dérush — 110,7 s, 15 segments (v2)
- [ ] 3. Sous-titres
- [ ] 4. Beats et assets
- [ ] 5. Ouverture A / B / C
- [ ] 6. Animatic → final
- [ ] 7. Livraison

## Gate 1 — sonde

| | |
|---|---|
| Vidéo | H.264 yuv420p 3840×2160, rotation −90° → **2160×3840 portrait (9:16)** |
| Cadence | 25 fps (takes.py re-encode en 30 fps) |
| Couleur | SDR bt709 (pas de tone-mapping HDR) |
| Audio | AAC 48 kHz stéréo (micro cravate) |
| Durée | 263,4 s (4'23) |

Cadrage : le rush est déjà vertical, visage centré à ~30–40 % de la hauteur, plante en fond. Pas de recadrage 16:9 → 9:16.
Proposition : plein cadre pour F (`face_pos_f` à caler sur le visage), split S avec le visage dans la moitié basse.

Transcription : pas de clé ElevenLabs dans cet environnement cloud → WhisperX local (`./setup.sh --whisperx`).

## Décisions

- Durée cible : **90–120 s** (choix utilisateur). Il faudra donc sélectionner l'argument, pas seulement retirer les silences.
- Cadrage : l'utilisateur veut **serrer davantage**. Deux propositions envoyées : A ×1,25 / B ×1,4, ancrage vertical 30 %.
  **Choix : B ×1,4**, ancrage vertical 30 % (`face_zoom_f` 1.4, `face_pos_f` "50% 30%"). Gate 1 validée.

## Environnement de transcription (cloud)

Le proxy bloque `github.com/.../tree` (torch.hub Silero) et `download.pytorch.org` (modèle d'alignement FR par défaut).
Commande qui marche ici :
`WHISPERX_VAD=pyannote WHISPERX_ALIGN_MODEL=jonatasgrosman/wav2vec2-large-xlsr-53-french python3 scripts/takes.py assets/derush/raw.mp4`
(+ une fois : `NLTK_ALLOW_PROXIED_URLOPEN=1 ~/.reel-kit/venv/bin/python -c "import nltk; nltk.download('punkt_tab')"`).

## Gate 2 — dérush

takes.py : 22 prises, 20 gardées par l'outil (≈150 s). Relecture manuelle : encore 5 reprises à retirer et 1 appel à
l'action en milieu de vidéo. Proposition (≈114 s) :

| # | Source | Décision | Raison |
|---|---|---|---|
| 01 | 6.9–12.3 | garde | accroche « croyance démontée » |
| 02 | 20.2–29.2 | garde | boucle ouverte : bouchons d'oreilles, 4 M de visiteurs |
| 03 | 36.8–42.8 | **coupe** | CTA milieu (« like, sauvegarde… ») : casse le rythme d'un short |
| 04 | 58.8–60.6 | coupe (outil) | faux départ |
| 05 | 60.4–70.4 | garde | l'objection |
| 06 | 71.3–74.8 | garde | promesse d'explication |
| 07 | 79.3–92.2 | garde, **fin coupée** | « d'où proviennent… problématiques etc » retiré (redite, −2,8 s) |
| 08 | 99.9–107.6 | **coupe** | reprise inachevée de 09 |
| 09 | 108.7–117.2 | garde | public déjà éduqué |
| 10 | 127.1–132.5 | **coupe** | 1re reprise de l'exemple Loop |
| 11 | 141.5–150.7 | **coupe** | 2e reprise (dit « euros ») |
| 12 | 153.6–164.0 | garde | version complète de l'exemple Loop |
| 13 | 164.1–178.9 | garde | le changement : génération Z, produit lifestyle |
| 14 | 184.9–190.3 | **coupe** | reprise inachevée de 15 |
| 15 | 192.1–206.1 | garde | coussin en U |
| 16 | 212.8–219.0 | garde | 400 ads, 150 000 $ / 30 jours |
| 17 | 219.6–220.6 | garde | « Si ça ce n'est pas une preuve » |
| 18 | 229.7–233.3 | coupe (outil) | reprise de 19 |
| 19 | 234.1–238.0 | garde | l'action : analyse-la |
| 20 | 237.6–245.6 | garde | tunnel, acquisition, conversion |
| 21 | 251.2–253.9 | garde | l'angle qui manque |
| 22 | 254.9–258.6 | garde | CTA final |

Corrections de transcription à confirmer : « 4 millions d'éditeurs » → « visiteurs » ? ; « 220 1 000 000 » → « 220 millions »
(bug de conversion des nombres) ; « conseils commerce » → « e-commerce ».

Validé par l'utilisateur (« ok, c'est bien visiteurs »). Corrections appliquées dans `raw.captions.json` : « d'éditeurs » →
« de visiteurs », « 1 000 000 » → « millions » (×4), « commerce » → « e-commerce », « 150 » + « 000 » → « 150 000 ».
Prises 19 + 20 fusionnées (parole continue, chevauchement 0,38 s). stage.py : 14 segments, **113,9 s**, voix −16,9 LUFS,
crête −1,5 dBFS. Aperçu : `renders/concurrence-cut-v1.mp4` (720p, hors git). Retour utilisateur v1 : « 2-3 bugs, vers 42 s ».

v2, après une transcription neuve de l'audio monté et un profil d'énergie à chaque raccord :
- ~40 s : fin de 07 coupée en plein « d'où » → sortie 92.22 ; début de 09 avec un « euh » non transcrit (108.70–109.25) → entrée 109.76.
- ~75 s : « une marque qui… qui proposait » → 15 scindée (192.07–194.58 + 194.96–206.05).
- ~94 s : « Alors » parasite avant « au lieu » → entrée 19 à 234.38.
- ~108 s : « Et si tu veux plus de conseils » dit deux fois (prouvé en transcrivant chaque morceau isolé) → 22 démarre sur la 2e prise (256.08), mots retimés.
Résultat : 15 segments, **110,7 s**. Aperçu `renders/concurrence-cut-v2.mp4`. **Validé (« Ok »).**

## Gate 3 — sous-titres (brouillon v1)

Style SXB par défaut (`pop`, Archivo, blanc, 3 mots max, mots-clés ×1,55 en `#FECA8A`), une scène F plein cadre ×1,4.
`lexicon` : Airplug → Earplugs, différences → différencies. « qui » (194.945) retimé à 194.975 pour rester dans le segment.
`npm run check` : 0 erreur, contraste 11/11. Rendu brouillon : `renders/concurrence-captions-v1.mp4`.
