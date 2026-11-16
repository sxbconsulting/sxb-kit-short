# RUN — GTA 3 niveaux de prix

Source : `gta-3-niveaux-prix_Audio_2026-11-16_a__15.22.19.m4a` (upload, 128,8 s), **audio seul** → `assets/derush/source.m4a`,
`assets/derush/raw.mp4` = fond noir + audio pour `takes.py`. Jamais dans git.

Projet copié depuis la vidéo 1 (racine du dépôt, « GTA 6 et propriété intellectuelle ») avec tout l'outillage : avatar-world.py,
gta.css, items `cam` / `sfx` / `idle_motion`, cut-transcript.py, verify-cut.py, mockups. Avatar (16 poses) copié, hors git.
Validateurs : `node ../../.claude/skills/short-form-edit/scripts/validate-plan.mjs .` depuis ce dossier.

Brief : « de la même manière, toujours dans l'esprit GTA ». Reprend les choix validés de la vidéo 1 : 9:16, durée complète,
DA Vice City, avatar SxB + bulle en bas à gauche sur les plein écran, sons parcimonieux, pas de musique (l'utilisateur la pose),
vérification en 2 passes avant chaque envoi.

## Gates

- [x] 1. Cadrage — sans objet (audio seul)
- [x] 2. Dérush — validé (« ok pour tout »), t04 retirée, CTA BOOTCAMP confirmé
- [x] 3. Sous-titres — style highlight GTA validé sur la vidéo 1, repris tel quel
- [ ] 4. Beats et assets — proposés (`DESIGN.md`, `review/gate4-assets.png`)
- [ ] 5. Ouverture
- [ ] 6. Animatic → final
- [ ] 7. Livraison

## Gate 2 — dérush (méthode corrigée depuis la vidéo 1)

takes.py : 24 prises, 23 gardées (85,4 s). Puis chaque prise découpée sur ses silences mesurés et chaque morceau retranscrit seul
(faster-whisper, sans VAD) : `/tmp/…/chunks-takes.py`. Plages finales construites sur ces silences, sans chevauchement (assert).

| Prise | Décision | Raison |
|---|---|---|
| t02, t03 | retirées | faux départs « D'après toi, est-ce que… » |
| t04 | retirée | redit la question de l'accroche (t01) — à confirmer avec l'utilisateur |
| t05 | fin à 20,45 | « Il n'y a pas de… » redit au début de t06 |
| t06 | fin à 26,30, pause interne réduite (24,20 / 24,38) | « Pense à la boule… » redit en t07 ; blanc de 0,54 s (passe 2) |
| t08 | coupée en deux | faux départ caché « Toi, tu viens de trouver » (32,5-33,2) |
| t09 | retirée | 3e version de « Toi tu viens pour la baguette… » |
| t17 | fin à 81,52 | bruit / début de t18 |
| t19 | retirée | « …qui va vraiment pousser », refaite proprement en t20 |
| t21 | retirée | se termine sur « j'aime… », refaite en t22 |
| t23 + t24 | fusionnées | « …trois niveaux. Allez, ciao » |

Vérif : passe 1 (`verify-cut.py`) 0 problème ; passe 2 (fenêtre ±1,2 s, blanc > 0,5 s) : 1 blanc 0,54 s → corrigé, revérifié 0.
`assets/derush/cut-fixes.json` : Tech2 → Take-Two, précompte → précommande.
Fait vérifié : Strauss Zelnick (PDG Take-Two) sur CNBC, résultats d'août : précommandes « skewing more to the premium edition »
(99,99 $ vs 79,99 $ standard).

## Gate 4 — assets

Faits vérifiés et capturés (Firecrawl) : éditions 79,99 $ / 99,99 $ (xbox.com « Compare editions » ; la page Rockstar /VI/editions
s'affiche sans prix en capture), interview CNBC 10/08/2026, bilan FEVAD 2025 (LSA, 11/02/2026 : panier moyen 62 €, −3 %).
Trailer 2 : `gta-beach` (38,45–41,5, recoupé : une coupe à 38,37 détectée), `gta-logo-vi` (158,0–159,7). Maquettes `scripts/mockups-prix.mjs`
(passe 1 : « PACK PETIT-DÉJ » sur 2 lignes → corrigé). Monde avatar : `assets/avatar-poses.json` (contrôle à blanc : « w:bonus, »
tombait sur le 1er « bonus » → `bonus#2`).
