// mockups-prix.mjs — phone-sized EXAMPLE screens for the « 3 niveaux de prix » reel (fictitious shop and bakery, illustrative prices).
// Usage: node scripts/mockups-prix.mjs  → assets/mockups/<name>.png (780×1688, phone 390×844 @2x). Regenerate, never edit the PNGs.
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const { chromium } = createRequire(import.meta.url)("playwright");   // the machine-wide Playwright (CommonJS)
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "assets/mockups");
mkdirSync(OUT, { recursive: true });
const font = (f) => `url("file://${ROOT}/assets/fonts/${f}")`;
const base = `
@font-face { font-family: Anton; src: ${font("Anton.ttf")}; }
@font-face { font-family: Kaushan; src: ${font("KaushanScript.ttf")}; }
@font-face { font-family: Archivo; src: ${font("Archivo.ttf")}; font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { width: 390px; height: 844px; overflow: hidden; font-family: Archivo, sans-serif; }
.ex { position: absolute; top: 14px; right: 14px; background: #FFC861; color: #14082A; font: 700 12px/1 Archivo; letter-spacing: .14em; padding: 7px 10px; border-radius: 6px; z-index: 9; }
.bar { height: 44px; display: flex; align-items: center; justify-content: space-between; padding: 0 18px; font: 700 14px Archivo; }
`;
const tee = (fill, stroke = "#fff") => `<svg viewBox="0 0 200 200" width="100%" height="100%"><path d="M70 20 L85 30 Q100 36 115 30 L130 20 L178 45 L163 85 L145 76 L145 185 L55 185 L55 76 L37 85 L22 45 Z" fill="${fill}" stroke="${stroke}" stroke-width="4" stroke-linejoin="round"/></svg>`;
const palms = `<svg viewBox="0 0 390 300" width="390" height="300" style="position:absolute;left:0;bottom:0"><g fill="#12052a">
<path d="M40 300 Q55 200 80 120 l6 2 Q66 200 54 300Z"/><path d="M82 118 q-50 -10 -80 20 q40 -30 80 -14z M82 118 q40 -30 90 -10 q-50 -6 -88 16z M82 118 q-10 -40 -50 -60 q50 20 54 58z M82 118 q30 -10 60 30 q-36 -30 -62 -26z"/>
<path d="M340 300 Q330 210 310 150 l-6 2 Q320 210 326 300Z"/><path d="M308 148 q50 -10 80 20 q-40 -30 -80 -14z M308 148 q-40 -30 -90 -10 q50 -6 88 16z M308 148 q10 -40 50 -60 q-50 20 -54 58z"/></g></svg>`;

const pages = {
  "boulangerie": `<div class="ex">EXEMPLE</div><div style="position:relative;height:844px;color:#fff;background:linear-gradient(180deg,#0E0624 0%,#2E0C55 45%,#7A1A72 75%,#E23A6E 100%);padding:70px 26px 0">
    <div style="text-align:center;font:400 54px Kaushan;color:#FF6FB5;text-shadow:0 0 10px #FF2E88,0 0 26px #FF2E88">Boulangerie</div>
    <div style="text-align:center;font:400 15px Anton;letter-spacing:.3em;color:#FFC861;margin-top:6px">LA CARTE</div>
    ${[["🥖","LA BAGUETTE","1,30 €","seule"],["☕","PACK PETIT-DÉJ","4,90 €","viennoiserie + café + jus"],["🥪","FORMULE DU MIDI","9,90 €","sandwich + boisson + dessert"]].map(([i,n,p,d],k)=>`<div id="row${k}" style="display:flex;align-items:center;gap:14px;margin-top:${k?18:34}px;background:rgba(20,8,42,.6);border:3px solid ${k==2?"#FF2E88":"rgba(255,255,255,.85)"};border-radius:16px;padding:18px 18px;${k==2?"box-shadow:0 0 24px rgba(255,46,136,.7);":""}"><span style="font-size:40px">${i}</span><span style="flex:1"><span style="display:block;font:400 21px Anton;letter-spacing:.02em;white-space:nowrap">${n}</span><span style="display:block;font:500 14px Archivo;color:rgba(255,255,255,.75);margin-top:3px">${d}</span></span><span style="font:400 30px Anton;color:#FFC861">${p}</span></div>`).join("")}
    <div style="position:absolute;left:0;right:0;bottom:40px;text-align:center;font:700 13px Archivo;letter-spacing:.14em;color:rgba(255,255,255,.7)">PRIX ILLUSTRATIFS</div></div>`,
  "offre-3-niveaux": `<div class="ex">EXEMPLE</div><div style="position:relative;height:844px;color:#fff;background:linear-gradient(180deg,#0E0624,#2E0C55 60%,#5A1466)">
    <div class="bar" style="color:#fff"><span>☰</span><span style="font:400 22px Anton;letter-spacing:.12em">TA BOUTIQUE</span><span>🛒</span></div>
    <div style="padding:10px 22px 0"><div style="font:400 30px Anton;letter-spacing:.02em">SWEAT NEON PALM</div><div style="font:500 14px Archivo;color:rgba(255,255,255,.75);margin-top:4px">Choisis ton offre</div></div>
    ${[["1 SWEAT","49 €","Le produit seul",false],["PACK DUO","79 €","2 sweats · −20 % sur le 2e",true],["PACK COMPLET","99 €","2 sweats + bonus : guide de style + accès VIP",false]].map(([n,p,d,mid])=>`<div style="position:relative;margin:${mid?22:16}px 18px 0;background:${mid?"rgba(255,46,136,.18)":"rgba(20,8,42,.6)"};border:3px solid ${mid?"#FF2E88":"rgba(255,255,255,.8)"};border-radius:16px;padding:18px 18px;${mid?"box-shadow:0 0 30px rgba(255,46,136,.6);transform:scale(1.04);":""}">${mid?`<span style="position:absolute;top:-14px;left:16px;background:#FFC861;color:#14082A;font:400 14px Anton;letter-spacing:.1em;padding:5px 10px;border-radius:6px">LE PLUS CHOISI</span>`:""}<div style="display:flex;justify-content:space-between;align-items:baseline"><span style="font:400 26px Anton">${n}</span><span style="font:400 30px Anton;color:#FFC861">${p}</span></div><div style="font:500 14px Archivo;color:rgba(255,255,255,.8);margin-top:6px">${d}</div></div>`).join("")}
    <div style="margin:26px 18px 0;background:#FF2E88;border-radius:14px;padding:16px;text-align:center;font:400 22px Anton;letter-spacing:.08em">AJOUTER AU PANIER</div>
    <div style="position:absolute;left:0;right:0;bottom:30px;text-align:center;font:700 13px Archivo;letter-spacing:.14em;color:rgba(255,255,255,.6)">PRIX ILLUSTRATIFS</div></div>`,
  "bonus": `<div class="ex">EXEMPLE</div><div style="position:relative;height:844px;color:#fff;background:linear-gradient(180deg,#0E0624,#2E0C55 60%,#7A1A72);padding:80px 22px 0">
    <div style="text-align:center;font:400 40px Anton">TES <span style="color:#FF2E88">BONUS</span></div>
    ${[["📘","GUIDE DE STYLE (PDF)","Te coûte : ~0 €","Valeur perçue : 19 €"],["🔑","ACCÈS VIP","Te coûte : ~0 €","Valeur perçue : 29 €"]].map(([i,n,c,v])=>`<div style="margin-top:26px;background:rgba(20,8,42,.6);border:3px solid rgba(255,255,255,.85);border-radius:16px;padding:20px"><div style="font-size:44px">${i}</div><div style="font:400 28px Anton;margin-top:6px">${n}</div><div style="display:flex;justify-content:space-between;margin-top:10px;font:700 15px Archivo"><span style="color:#19E3D2">${c}</span><span style="color:#FFC861">${v}</span></div></div>`).join("")}
    <div style="position:absolute;left:0;right:0;bottom:40px;text-align:center;font:700 13px Archivo;letter-spacing:.14em;color:rgba(255,255,255,.6)">VALEURS ILLUSTRATIVES</div></div>`,
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
for (const [name, body] of Object.entries(pages)) {
  // a file:// page may load the local fonts; a setContent page (about:blank) may not
  const tmp = path.join(OUT, `.${name}.html`);
  writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8"><style>${base}</style></head><body>${body}</body></html>`);
  await page.goto(`file://${tmp}`);
  await page.evaluate(() => Promise.all(["Anton", "Kaushan", "Archivo"].map((f) => document.fonts.load(`16px ${f}`))));
  await page.evaluate(() => document.fonts.ready);
  const missing = await page.evaluate(() => ["Anton", "Kaushan", "Archivo"].filter((f) => !document.fonts.check(`16px ${f}`)));
  if (missing.length) throw new Error(`${name}: fonts not loaded: ${missing.join(", ")}`);
  rmSync(tmp);
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(OUT, `${name}.png`) });
  console.log(`assets/mockups/${name}.png`);
}
await browser.close();
