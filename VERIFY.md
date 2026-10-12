# VERIFY — concurrence en e-commerce

## Livrable

| | |
|---|---|
| Fichier final | `renders/concurrence-ecom.mp4` (hors git) |
| SHA-256 | `2f4b41f702cbe75f73bf648688573a19d41091c9cc0699a738e310bf78f18635` |
| Taille | 224 301 533 octets |
| Format | H.264 yuv420p, 1080×1920, 30 fps, SDR bt709, AAC 48 kHz, faststart (moov avant mdat) |
| Durée | 110,733 s, 3 322 images |
| Son | −16,9 LUFS intégrés, crête −1,0 dBFS, LRA 3,0 LU ; voix seule, pas de musique ni SFX (choix utilisateur) |
| Copie légère d'envoi | `renders/concurrence-ecom-1080-light.mp4`, 1080×1920 CRF 26, SHA-256 `ba3dd1db49759cd8a90e9ef3c33784cd4dd1e43da344b73ebabcd0afdda512e6` |
| Couvertures proposées | `renders/cover-a.jpg` (5,0 s, « L'erreur n°1 des débutants / BON SIGNAL »), `renders/cover-b.jpg` (57,6 s, Loop + Forbes 220 M$) |

## Ce qui a été réellement vérifié

- `node .claude/skills/short-form-edit/scripts/validate-plan.mjs .` → `ok: true`, 0 erreur (sous-titres = transcript, scènes ancrées sur un mot, trous > 2,2 s justifiés).
- `npm run check` → passé (avertissements restants : débordement voulu du visage zoomé dans sa case, taille de fichier index).
- ASR fraîche (WhisperX large-v3-turbo) sur l'audio du MP4 final : 473 mots, texte complet de « L'erreur que je vois le plus… » à « Allez, ciao ! » ; dernière syllabe présente.
  Écart connu : la fin est prononcée vite, l'ASR entend « Et sur plus de conseils commerce » ; le sous-titre affiche « Et si tu veux plus de conseils e-commerce » (texte de la prise isolée, vérifié en gate 2).
- Images encodées inspectées : 4 premières images, entrées de scène S (5,33 s, 14,55 s), fin (110,7 s), et bandes chronologiques des animatics v1 à v4.
  Défaut trouvé et corrigé sur le premier rendu final : flash crème (fond papier du kit) aux entrées de scène S → fond racine = couleur de marque `#000000`, rendu refait.
- Provenance des captures et des chiffres : `assets/captures/ledger.json` (Forbes, loopearplugs.com, mychillow.fr, AliExpress, Trendtrack), sha256 par fichier.

## Non vérifié / limites

- Pas de visionnage continu image + son par l'agent ; le rythme a été validé par l'utilisateur sur 4 animatics.
- Pas d'écoute : niveaux et raccords contrôlés par mesure (EBU R128, profils d'énergie) et ASR, pas à l'oreille.
- Passe Studio non faite (conteneur cloud, URL locale non joignable par l'utilisateur).
- Chiffres Trendtrack = estimations de l'outil au 12/10/2026 ; 220 M$ = Forbes, 25/10/2025.
