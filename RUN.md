# RUN — concurrence en ecom

Rush : `concurrence en ecom_IMG_5235.MOV` (Google Drive, dossier partagé, id `1kzYThrbeWgKCBy95DEz8kS3CUxdQ7rxO`),
copié hors du dépôt dans `/home/user/rush/concurrence_IMG_5235.MOV` (1 242 863 152 octets, identique à Drive). Jamais dans git.

Brief : l'importance de la concurrence en e-commerce. Split screen et motion design autorisés. DA par défaut : `DA-SXB.md`.

## Gates

- [x] 1. Cadrage — B ×1,4
- [ ] 2. Dérush (liste des prises, puis vidéo coupée)
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
