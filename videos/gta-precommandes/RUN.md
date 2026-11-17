# RUN — GTA précommandes

Source : `gta-precommandes_Audio_2026-11-16_a__15.33.56.m4a` (upload, 158,0 s), **audio seul** → `assets/derush/source.m4a`,
`assets/derush/raw.mp4` = fond noir + audio. Jamais dans git. Projet copié depuis la vidéo 2 (outillage, punch / wipes / shake inclus).
Brief : « tu peux t'attaquer à cette vidéo » — même méthode et même DA que les vidéos 1 et 2.

## Gates

- [x] 1. Cadrage — sans objet (audio seul)
- [x] 2. Dérush — « recheck & passe à la suite » : « officiel » coupé (option b, 15,81 / 16,34), revérifié 2 passes, 84,4 s
- [x] 3. Sous-titres — style highlight GTA validé (vidéos 1-2)
- [x] 4. Beats et assets — enchaînés sur « passe à la suite » (pas de validation séparée)
- [x] 5. Ouverture — choisie par l'agent : logo VI + compteur 7 700 000 + « PAS ENCORE SORTI » (à valider dans l'animatic)
- [ ] 6. Animatic → final — v1 envoyée (`review/gate6-animatic-v1.mp4`)
- [ ] 7. Livraison

## Gate 2 — dérush

takes.py : 21 prises, 20 gardées (97,5 s) ; chaque prise redécoupée sur ses silences et retranscrite seule ; trous entre prises
vérifiés (silences — Whisper y hallucine « c'est parti »).

| Prise | Décision |
|---|---|
| t02 | faux départ « Ça, c'est un chiffre officiel. » retiré, version complète gardée |
| t04 / t05 | « T'as tout de suite » = début mal transcrit de « Tu as deux options » (même audio) → t04 coupée à 29,62 |
| t06 | pause de 0,8 s réduite, en gardant « Si » (33,74, très bas) |
| t09 | bafouillage « Mais attention, c'est sur Ulule, » retiré → « Mais attention, sur Ulule c'est tout ou rien » |
| t12 | « Donc il faudra une… » retiré |
| t16, t17 | faux départs « Et si tu veux (en apprendre)… » retirés |
| t18 | CTA refait en t19 → t18 retirée ; t19 début recadré (blanc) |

Transcription de l'audio coupé **prise par prise** (`transcribe.py --segments`) : la transcription d'un seul tenant avalait
« Numéro 2, si tu dois ». `cut-transcript.py` : corrections mot et expression (`assets/derush/cut-fixes.json`) — 1 000 000 → millions,
TechTo → Take-Two, l'une / LUL → Ulule, « du Ulule » → d'Ulule, « et commandes préco » → et commente préco (le « 30 commandes » est
préservé), vant → vend, « Donc il » → Il (Donc halluciné), « sur ton fournisseur » → chez ton fournisseur. 2 passes `verify-cut.py` : 0 problème.

Faits : Sensor Tower, **estimation** (tracker non officiel) 7,71 M de précommandes numériques au 03/11/2026 (11,27 M au 12/11) ;
Ulule « tout ou rien » confirmé (support Ulule : collecte annulée, contributeurs remboursés automatiquement).

## Recheck (« recheck & passe à la suite »)

« chiffre officiel » inexact → « officiel » coupé (option b) : 9 couples de coupe essayés et retranscrits seuls, 15,81 / 16,34 retenu
(« Ça, c'est un chiffre de Sensor Tower »). Correction exacte `=chiffre.` (point parasite). `verify-cut.py` 2 passes : 0 problème
(seul blanc 0,48 s = respiration avant « Si », sous le seuil). Mot-clé : PRÉCO (pas de réponse → choix par défaut).

## Gates 4-6 — assets et animatic v1

Captures (Firecrawl) : tbreak 05/11/2026 « 7.71 million copies » au 3 novembre (le tracker Sensor Tower affiche 15,88 M au 17/11 :
pas utilisé pour le chiffre, il contredirait la voix), CNBC Zelnick (reprise vidéo 2), Ulule support « tout ou rien », accueil Ulule.
Extrait `gta-logo-vi` (vidéo 2). Maquettes `scripts/mockups-preco.mjs` : page de précommande, mail, page de collecte FICTIVE
(sans marque Ulule). Monde avatar : 17 poses (contrôle à blanc : « Ulule, » tombait sur « Ulule. » → « plateforme »).
16 scènes, 15 punch-ins, 9 balayages, 18 sons (−11 à −21 dB / voix), plan ok (écart max 2,4 s → ok), footage ok, check 0 erreur.
Passe 1 : stamp sur le crédit, stamp sur la capture CNBC, « ULULE » caché, surlignage 1 ligne sur 2, tags sur 2 lignes qui se
chevauchaient, trous d'animation à 9,4 / 38,6 / 42,6 / 46,5 s → corrigés. Passe 2 (rendu) : 3 scènes vides au début → titre dès la
coupe ; −16,7 LUFS, crête −1,5 dBTP, 0 sous-titre mal placé, extrait non noir.
