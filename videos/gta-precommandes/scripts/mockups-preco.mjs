// mockups-preco.mjs — phone-sized EXAMPLE screens for the « précommandes » reel (fictitious shop, mail and crowdfunding page).
// Usage: node scripts/mockups-preco.mjs  → assets/mockups/<name>.png (780×1688, phone 390×844 @2x). Regenerate, never edit the PNGs.
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
  "preco-page": `<div class="ex">EXEMPLE</div><div style="position:relative;height:844px;color:#fff;background:linear-gradient(180deg,#0E0624,#2E0C55 60%,#5A1466)">
    <div class="bar" style="color:#fff"><span>☰</span><span style="font:400 22px Anton;letter-spacing:.12em">TA BOUTIQUE</span><span>🛒</span></div>
    <div style="margin:6px 18px 0;height:280px;border-radius:16px;background:linear-gradient(180deg,#7A1A72,#E23A6E 70%,#FF8A4C);display:grid;place-items:center;position:relative;overflow:hidden">
      <div style="width:150px;height:150px;border-radius:50%;background:linear-gradient(#FFE27A,#FF3F86)"></div>
      <span style="position:absolute;top:14px;left:14px;background:#FFC861;color:#14082A;font:400 16px Anton;letter-spacing:.1em;padding:6px 10px;border-radius:6px">PRÉCOMMANDE</span></div>
    <div style="padding:14px 20px 0"><div style="font:400 30px Anton">SWEAT NEON PALM — V2</div><div style="font:400 26px Anton;color:#FFC861;margin-top:4px">59 €</div>
    <div style="margin-top:14px;font:600 15px Archivo;line-height:1.5">📦 Expédition prévue : <b>15 janvier</b><br>🔥 Stock limité : <b>100 pièces</b></div>
    <div style="margin-top:12px;height:12px;border-radius:6px;background:rgba(255,255,255,.2)"><div style="width:62%;height:100%;border-radius:6px;background:#FF2E88"></div></div>
    <div style="margin-top:6px;font:700 13px Archivo;color:rgba(255,255,255,.8)">62 / 100 précommandés</div></div>
    <div style="margin:18px 18px 0;background:#FF2E88;border-radius:14px;padding:16px;text-align:center;font:400 22px Anton;letter-spacing:.08em">JE PRÉCOMMANDE</div></div>`,
  "preco-mail": `<div class="ex">EXEMPLE</div><div style="background:#f4f4f7;height:844px;color:#1b1b1f">
    <div class="bar" style="background:#fff;border-bottom:1px solid #e6e6ea"><span>‹ Boîte de réception</span><span></span></div>
    <div style="background:#fff;margin:14px;border-radius:14px;box-shadow:0 10px 30px rgba(20,8,42,.15);overflow:hidden">
      <div style="padding:16px 18px;border-bottom:1px solid #eee"><div style="font:800 15px Archivo">Ta boutique</div><div style="font:800 17px Archivo;color:#FF2E88;margin-top:4px">🔓 Précommandes ouvertes (100 pièces)</div></div>
      <div style="height:180px;background:linear-gradient(180deg,#2E0C55,#E23A6E 70%,#FF8A4C);display:grid;place-items:center;color:#fff;font:400 34px Anton">LE NOUVEAU SWEAT</div>
      <div style="padding:16px 18px;font:400 15px/1.5 Archivo;color:#333">Tu l'as demandé, il arrive. Il est ouvert <b>uniquement en précommande</b>, et seulement <b>100 pièces</b>.<br><br>Expédition le 15 janvier.</div>
      <div style="margin:0 18px 18px;background:#14082A;color:#fff;border-radius:10px;padding:14px;text-align:center;font:400 18px Anton;letter-spacing:.08em">JE RÉSERVE LE MIEN</div></div></div>`,
  "collecte": `<div class="ex">EXEMPLE</div><div style="position:relative;height:844px;background:#fff;color:#14082A">
    <div style="height:250px;background:linear-gradient(180deg,#2E0C55,#E23A6E 70%,#FF8A4C);display:grid;place-items:center;color:#fff;font:400 34px Anton;letter-spacing:.04em">TON PROJET</div>
    <div style="padding:18px 20px"><div style="font:400 26px Anton">Financement participatif</div>
    <div style="margin-top:16px;height:16px;border-radius:8px;background:#eee"><div style="width:73%;height:100%;border-radius:8px;background:#19C2B0"></div></div>
    <div style="display:flex;justify-content:space-between;margin-top:10px;font:800 16px Archivo"><span>73 %</span><span>22 / 30 préventes</span></div>
    <div style="margin-top:8px;font:500 14px Archivo;color:#666">Objectif : 30 préventes · 12 jours restants</div>
    <div style="margin-top:20px;background:#FFF3D6;border-radius:12px;padding:14px;font:700 14px/1.4 Archivo">⚠️ Tout ou rien : si l'objectif n'est pas atteint, les contributeurs sont remboursés.</div>
    <div style="margin-top:20px;background:#14082A;color:#fff;border-radius:12px;padding:15px;text-align:center;font:400 19px Anton;letter-spacing:.06em">SOUTENIR LE PROJET</div></div>
    <div style="position:absolute;left:0;right:0;bottom:24px;text-align:center;font:700 12px Archivo;letter-spacing:.14em;color:#999">PAGE FICTIVE</div></div>`,
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
