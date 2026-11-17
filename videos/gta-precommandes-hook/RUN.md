# RUN — GTA précommandes, variation « hook »

Variation de `videos/gta-precommandes` (v2 fx2), demandée par l'utilisateur : la phrase de la seconde 13
(« Dis-toi qu'ils ont réussi à vendre un jeu avant même qu'il existe. Et ta marque e-commerce peut faire pareil. ») passe en hook,
le reste est adapté. Projet copié (tar, sans renders/ ni review/), même source, mêmes captures et réglages.

## Montage

Ordre des plages : t04 (hook) → t01 (7,7 M de précommandes) → t02a/t02b (Sensor Tower) → t03 (Take-Two) → t05… (inchangé).
Les 5 premières plages ont la même durée totale qu'avant : tout ce qui suit 14,8 s reste identique, au mot près.
Essai « Ils ont réussi » sans « Dis-toi qu' » : 6 points de coupe retranscrits seuls, le seul qui donne « Ils » (26,14) a une
confiance de 0,46 (reste du « k » de « qu'ils ») → hook gardé avec « Dis-toi », le logo GTA VI dit qui est « ils ».
2 passes `verify-cut.py` : 0 blanc ; « option une une page » signalé = « Option 1, une page » (faux positif, même jointure que la v2).

## Visuel (15 premières secondes refaites)

1. Hook S : logo VI + crédit + « VENDRE UN JEU » dès l'image 0, tampon « QUI N'EXISTE PAS » sur « existe », « → TA MARQUE AUSSI ».
2. Plein écran + bulle : extrait plage du trailer, compteur 7 700 000 précommandes, tampon « PAS ENCORE SORTI ».
3-4. Sensor Tower (tbreak) et Take-Two (CNBC), décalés à leurs nouveaux mots.
L'ancienne scène F « VENDRE / AVANT D'EXISTER » (11 s) est retirée (redite du hook). Poses de l'avatar recalées (pointe → double pouce
sur « marque » → surpris sur « GTA »).
Vérif : passe 1 tampon qui débordait à droite, image 0 sans texte → corrigés ; passe 2 (rendu) décodage OK, −16,7 LUFS,
0 sous-titre mal placé, extraits non noirs, plan + footage ok, check 0 erreur.
