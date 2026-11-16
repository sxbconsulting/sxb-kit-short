# VERIFY — GTA 6 et propriété intellectuelle

| | |
|---|---|
| Fichier | `renders/gta-propriete-intellectuelle.mp4` (copie de `renders/animatic-v3.mp4`, validé par l'utilisateur : « ok ») |
| SHA-256 | `da11e5551a1e6030dab1e9947f97de0f43c994383877d51edf9c042bbf80ef7d` |
| Format | H.264 yuv420p 1080×1920, 30 i/s, bt709 (SDR), AAC — 92,8 s, 110 Mo |
| Son | −16,3 LUFS intégré, crête vraie −1,2 dBTP (loudnorm), crête échantillon −1,15 dBFS ; voix seule, pas de musique (l'utilisateur la pose) |
| Couverture | `renders/gta-propriete-intellectuelle-cover.jpg` (6,5 s : « PUB REFUSÉE ») |

## Ce qui a été vérifié (réellement, pas supposé)

- Montage coupé : `scripts/verify-cut.py` en 2 passes (blancs > 0,55 s, groupes répétés, chaque jointure retranscrite seule) — 0 blanc,
  répétitions restantes voulues. Retours utilisateur v1 (4 bugs) tous corrigés et vérifiés.
- `node .claude/skills/short-form-edit/scripts/validate-plan.mjs .` → ok (138 événements visuels, écart max 2,1 s, 381 mots).
- `node .claude/skills/short-form-edit/scripts/validate-footage.mjs .` → ok (8 extraits, hash et intervalles, aucun extrait réutilisé).
- `npm run check` → 0 erreur, contraste 38/38 WCAG AA (15 avertissements de structure : fichier long, pistes de sous-titres denses).
- Rendu : chaque extrait mesuré non noir pendant sa fenêtre (luminance), 19 jointures de scène revues image par image (pas de flash),
  17 jointures de format revues en pleine résolution, 0 sous-titre mal placé (contrôle automatique), décodage complet sans erreur.
- Sons : 14 effets, niveau mesuré voix soustraite : pops / clicks ≈ −15 dB sous la voix, error / impact ≈ −11 dB.
- Faits à l'écran : date (newswire Rockstar, 06/11/2025 : « Thursday, November 19, 2026 »), boutique GTA VI Collection (Rockstar
  Store, capture 16/11/2026), règle Meta « Ads may be rejected or removed… » (Transparency Center, capture 16/11/2026).

## Non vérifié / limites

- Écoute humaine du mix : mesurée, pas écoutée (pas de sortie son ici).
- Droits des extraits GTA VI : © Rockstar / Take-Two, extraits courts crédités à l'écran, usage organique. **Ne pas sponsoriser ce reel.**
- Exemples (boutique, Reel, mail, story, post concours, commentaires) : fictifs, étiquetés « EXEMPLE ».
