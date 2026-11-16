# Projet « GTA 3 niveaux de prix » — design

> Gate 4 en cours (16/11/2026). Même DA que la vidéo 1 (inspiration GTA 6 / Vice City, `gta.css`, avatar SxB, bulle en bas à gauche
> sur les plein écran, sons parcimonieux, pas de musique). Aucun logo Rockstar dans l'habillage ; images GTA VI seulement en extrait cité.

## Public et promesse

E-commerçants (bootcamp, Ulule / Stayfocused). Leçon : GTA 6 se précommande plus en édition à 100 $ qu'à 80 $ → construis 3 offres
(produit seul / pack / pack complet + bonus), mets celle du milieu en avant, des bonus qui coûtent peu et valent cher → panier moyen ↑.
CTA : commente BOOTCAMP → modèle d'offre à 3 niveaux.

## Faits à l'écran (vérifiés)

| Fait | Source |
|---|---|
| GTA VI 79,99 $ / Ultimate Edition 99,99 $ | xbox.com (Compare editions), capture 16/11/2026 → `assets/captures/xbox/compare-editions.png` |
| Précommandes « skewing more to the premium edition » | Strauss Zelnick (PDG Take-Two), CNBC Squawk Box, 10/08/2026 → `assets/captures/cnbc/zelnick.png` |
| Panier moyen e-commerce France 2025 : 62 €, −3 % | Bilan FEVAD 2025 (11/02/2026), via LSA → `assets/captures/lsa/fevad-2025.png` |

## Shortlist

| Asset | Provenance | Rôle |
|---|---|---|
| `assets/broll/gta-beach.mp4` | GTA VI Trailer 2, X officiel, 38,45–41,5 | accroche : l'univers GTA |
| `assets/broll/gta-logo-vi.mp4` | idem, 158,0–159,7 (avant la date périmée) | accroche : le titre |
| Captures Xbox / CNBC / LSA | ci-dessus | preuves |
| `assets/mockups/boulangerie.png`, `offre-3-niveaux.png`, `bonus.png` | `scripts/mockups-prix.mjs`, fictifs, « EXEMPLE », prix illustratifs | analogie, méthode, bonus |

## Beats (proposés)

| # | Temps | Parole | Layout | Visuel |
|---|---|---|---|---|
| 1 | 0–4,2 | GTA 6 à 80 $ ou à 100 $ ? Devine lequel se précommande le plus | ouverture (gate 5) | A/B/C |
| 2 | 4,2–5,6 | C'est celle à 100 $ | S | capture Xbox, tampon « 100 $ ✓ » sur l'Ultimate |
| 3 | 5,6–8,8 | pas moi qui le dis… patron de Take-Two… CNBC en août | S | capture CNBC, tag « Strauss Zelnick · PDG Take-Two », date 10/08/2026 |
| 4 | 8,8–12,7 | pas de chiffre précis… plus de précommandes que l'édition standard | S | 2 barres sans chiffre : Standard < Ultimate, tag « pas de chiffre précis » |
| 5 | 12,7–14,4 | Et ça tu peux le copier dans ta boutique | F | avatar qui pointe, « COPIE ÇA » en néon |
| 6 | 14,4–21,2 | Pense à la boulangerie… baguette, pack petit-déj, formule du midi… tu repars avec toute la formule | plein écran + bulle | carte de boulangerie, chaque ligne s'allume sur son mot, tampon « LA FORMULE » |
| 7 | 21,2–25,4 | ne cherche pas le moins cher… la version qu'il ne regrettera pas | S | ✗ LE MOINS CHER / ✓ ZÉRO REGRET |
| 8 | 25,4–29,2 | panier moyen en France en baisse, chaque euro compte | S | capture LSA, « 62 € » qui compte, badge « −3 % », source FEVAD 2025 |
| 9 | 29,2–32,2 | tu construis trois offres, pas une | F | « 3 OFFRES » en néon, « PAS 1 » barré |
| 10 | 32,2–39,9 | produit seul… pack… pack complet avec des bonus | plein écran + bulle | page produit EXEMPLE, les 3 offres arrivent sur leurs mots |
| 11 | 39,9–43,5 | mets l'offre du milieu en avant… celle qu'on choisit | S | zoom sur l'offre du milieu, badge « LE PLUS CHOISI » |
| 12 | 43,5–49,9 | bonus qui coûtent peu mais valent cher… un guide, un accès | plein écran + bulle | carte bonus EXEMPLE, « coûte ~0 € » / « vaut 19–29 € », guide, accès |
| 13 | 49,9–54,5 | offre complète… monter la valeur de ton panier moyen | S | récap 3 offres ✓, flèche « PANIER MOYEN ↑ » (sans chiffre inventé) |
| 14 | 54,5–57,0 | abonne-toi | F | bouton « S'ABONNER » |
| 15 | 57,0–60,6 | accompagné pas à pas… mon Bootcamp e-commerce | S | carte « BOOTCAMP E-COMMERCE · pas à pas » |
| 16 | 60,6–64,6 | Si tu commentes BOOTCAMP… modèle d'offre à 3 niveaux. Allez ciao | S | « COMMENTE BOOTCAMP », aperçu du modèle 3 niveaux, mains jointes |

## Ouvertures (gate 5)

- **A — Le duel** : capture Xbox Compare editions, badges « 80 $ » et « 100 $ », gros « ? » entre les deux.
- **B — Le quiz** : avatar plein cadre réflexion, deux boutons « A) 80 $ » « B) 100 $ » qui clignotent, compte à rebours.
- **C — L'univers** : extrait plage GTA + titre VI, puis « 80 $ OU 100 $ ? » en néon.
