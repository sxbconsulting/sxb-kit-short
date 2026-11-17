# VERIFY — gta-precommandes (v2 fx2, ouverture « 7,7 millions » (alternative A/B))

| | |
|---|---|
| Fichier | `renders/gta-precommandes.mp4` |
| SHA-256 | `48b536c41478c27a15cd5fe871ac91d55da4084da25ff07e56655b7a56808550` |
| Format | H.264 yuv420p 1080×1920, 30 i/s, bt709 (SDR), AAC — 84,4 s, 99,3 Mo |
| Son | −16,7 LUFS intégré, crête vraie −1,5 dBTP ; voix + 20 sons max, pas de musique (l'utilisateur la pose) |
| Couverture | `renders/gta-precommandes-cover.jpg` (4,5 s : 7 700 000 + « PAS ENCORE SORTI ») |

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
