# RUN — GTA précommandes

Source : `gta-precommandes_Audio_2026-11-16_a__15.33.56.m4a` (upload, 158,0 s), **audio seul** → `assets/derush/source.m4a`,
`assets/derush/raw.mp4` = fond noir + audio. Jamais dans git. Projet copié depuis la vidéo 2 (outillage, punch / wipes / shake inclus).
Brief : « tu peux t'attaquer à cette vidéo » — même méthode et même DA que les vidéos 1 et 2.

## Gates

- [x] 1. Cadrage — sans objet (audio seul)
- [ ] 2. Dérush — proposé (85,0 s), montage coupé `review/gate2-cut.mp4`
- [ ] 3. Sous-titres (style highlight GTA validé)
- [ ] 4. Beats et assets
- [ ] 5. Ouverture
- [ ] 6. Animatic → final
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
