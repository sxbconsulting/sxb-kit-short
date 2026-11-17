# VERIFY — gta-precommandes-hook (variation hook (version principale))

| | |
|---|---|
| Fichier | `renders/gta-precommandes-hook.mp4` |
| SHA-256 | `4a210d88f48e1ca137e69ad66a8d1d7a79241d4ade08d49b2754d151a263dad2` |
| Format | H.264 yuv420p 1080×1920, 30 i/s, bt709 (SDR), AAC — 84,4 s, 101,3 Mo |
| Son | −16,7 LUFS intégré, crête vraie −1,5 dBTP ; voix + 20 sons max, pas de musique (l'utilisateur la pose) |
| Couverture | `renders/gta-precommandes-hook-cover.jpg` (2,3 s : « QUI N'EXISTE PAS ») |

## Vérifié (réellement)

- Montage : `scripts/verify-cut.py` en 2 passes (blancs, répétitions, chaque jointure retranscrite seule) ; transcription prise par prise
  (la transcription d'un seul tenant avalait « Numéro 2, si tu dois »). « officiel » coupé (chiffre Sensor Tower = estimation).
- `validate-plan.mjs` ok (écart max entre événements 2,4 s), `validate-footage.mjs` ok, `hyperframes check` 0 erreur.
- Rendu : décodage complet sans erreur, 0 sous-titre mal placé (contrôle automatique), extraits mesurés non noirs, effets vérifiés image par image.
- Faits à l'écran : 7,71 M de précommandes au 03/11/2026 = estimation Sensor Tower (tbreak, 05/11/2026 ; le tracker affiche 15,88 M au 17/11) ;
  Take-Two sans chiffre officiel (CNBC) ; Ulule « tout ou rien » (support Ulule) ; page de collecte, page produit et mail = EXEMPLES fictifs.

## Non vérifié / limites

- Écoute humaine du mix : mesurée, pas écoutée ici.
- Extraits GTA VI : © Rockstar / Take-Two, courts et crédités, usage organique. **Ne pas sponsoriser ce reel.**
