// mockups-gta.mjs — phone-sized EXAMPLE screens for the GTA 6 reel (fictitious shop, no GTA name or logo).
// Usage: node scripts/mockups-gta.mjs  → assets/mockups/<name>.png (780×1688, phone 390×844 @2x). Regenerate, never edit the PNGs.
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
  "boutique-avant": `<div class="ex">EXEMPLE</div><div style="background:#fff;height:844px;color:#222">
    <div class="bar" style="border-bottom:1px solid #eee"><span>☰</span><span style="font:800 18px Archivo;letter-spacing:.2em">TA BOUTIQUE</span><span>🛒</span></div>
    <div style="background:#f2f2f2;height:240px;display:grid;place-items:center;color:#888;font:600 16px Archivo">Nouvelle collection</div>
    <div style="padding:22px 18px"><div style="font:700 13px Archivo;letter-spacing:.14em;color:#999">BEST-SELLERS</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px">
      ${["Sweat Classic|49 €|#3a3a3a", "Tee Basic|25 €|#d9d9d9", "Casquette|29 €|#555", "Tote bag|19 €|#bbb"].map(p => { const [n, pr, c] = p.split("|"); return `<div><div style="background:#f6f6f6;height:150px;padding:16px">${tee(c, "#999")}</div><div style="font:600 14px Archivo;margin-top:8px">${n}</div><div style="font:700 14px Archivo;color:#666">${pr}</div></div>`; }).join("")}
    </div></div></div>`,
  "boutique-apres": `<div class="ex">EXEMPLE</div><div style="position:relative;height:844px;color:#fff;background:linear-gradient(180deg,#0E0624 0%,#2E0C55 35%,#7A1A72 60%,#E23A6E 80%,#FF8A4C 100%)">
    <div class="bar" style="color:#fff"><span>☰</span><span style="font:400 22px Anton;letter-spacing:.12em">TA BOUTIQUE</span><span>🛒</span></div>
    <div style="position:relative;height:290px;overflow:hidden">
      <div style="position:absolute;left:95px;top:120px;width:200px;height:200px;border-radius:50%;background:linear-gradient(#FFE27A,#FF3F86)"></div>
      ${palms}
      <div style="position:absolute;top:26px;left:0;right:0;text-align:center;font:400 46px Kaushan;color:#FF6FB5;text-shadow:0 0 10px #FF2E88,0 0 26px #FF2E88">Sunset Drive</div>
      <div style="position:absolute;top:96px;left:0;right:0;text-align:center;font:400 15px Anton;letter-spacing:.3em">ÉDITION NÉON · JUSQU'AU 30/11</div>
    </div>
    <div style="padding:16px 18px 0"><div style="font:400 15px Anton;letter-spacing:.2em;color:#FFC861">LA COLLECTION</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:12px">
      ${["Sweat Neon Palm|49 €|#FF2E88", "Tee Sunset|25 €|#FFC861", "Casquette Night|29 €|#19E3D2", "Tote Ocean|19 €|#7A5CFF"].map(p => { const [n, pr, c] = p.split("|"); return `<div style="background:rgba(20,8,42,.55);border:2px solid rgba(255,255,255,.85);border-radius:12px;padding:10px"><div style="height:118px;padding:6px">${tee("#14082A", c)}</div><div style="font:400 15px Anton;letter-spacing:.04em;margin-top:4px">${n}</div><div style="font:700 14px Archivo;color:#FFC861">${pr}</div></div>`; }).join("")}
    </div></div></div>`,
  "reel-exemple": `<div class="ex">EXEMPLE</div><div style="position:relative;height:844px;background:linear-gradient(180deg,#2E0C55,#E23A6E 70%,#FF8A4C);color:#fff">
    <div style="position:absolute;left:95px;top:300px;width:200px;height:200px;border-radius:50%;background:linear-gradient(#FFE27A,#FF3F86)"></div>${palms}
    <div style="position:absolute;top:120px;left:24px;right:24px;text-align:center;font:400 40px Anton;line-height:1.1;text-shadow:0 4px 14px rgba(0,0,0,.5)">POV : TU LANCES TA SOIRÉE<br><span style="color:#FFC861">GTA 6</span> JEUDI SOIR 🌴</div>
    <div style="position:absolute;left:150px;top:560px;width:90px;height:90px;border-radius:50%;background:rgba(0,0,0,.45);display:grid;place-items:center;font-size:40px">▶</div>
    <div style="position:absolute;right:16px;bottom:120px;display:grid;gap:20px;font:700 13px Archivo;text-align:center">❤️<br>12,4k<span></span>💬<br>842<span></span>↗️<br>1,1k</div>
    <div style="position:absolute;left:16px;bottom:40px;font:700 15px Archivo">@taboutique · <span style="font-weight:500">ma tenue pour jeudi 👀</span></div></div>`,
  "mail-exemple": `<div class="ex">EXEMPLE</div><div style="background:#f4f4f7;height:844px;color:#1b1b1f">
    <div class="bar" style="background:#fff;border-bottom:1px solid #e6e6ea"><span>‹ Boîte de réception</span><span></span></div>
    ${[["Ta boutique", "Mission du 19/11 : ton look Sunset Drive 🌴", "Jeudi tout le monde parle de la même chose. On t'a préparé…", true],
       ["Newsletter Food", "Nos recettes de la semaine", "Cette semaine on teste…", false], ["Banque", "Votre relevé est disponible", "Bonjour, votre relevé…", false],
       ["Ta boutique", "-15 % sur la collection néon", "Ce week-end seulement…", false]].map(([f, s, p, hot]) => `<div style="background:${hot ? "#fff" : "transparent"};${hot ? "border-left:6px solid #FF2E88;box-shadow:0 10px 30px rgba(20,8,42,.15);" : ""}padding:18px 18px;border-bottom:1px solid #e6e6ea"><div style="font:${hot ? 800 : 600} 15px Archivo">${f}</div><div style="font:${hot ? 800 : 500} 16px Archivo;margin-top:4px;color:${hot ? "#FF2E88" : "#333"}">${s}</div><div style="font:400 14px Archivo;color:#777;margin-top:4px">${p}</div></div>`).join("")}</div>`,
  "story-exemple": `<div class="ex">EXEMPLE</div><div style="position:relative;height:844px;background:linear-gradient(180deg,#0E0624,#7A1A72 60%,#FF8A4C);color:#fff">
    <div style="position:absolute;top:12px;left:12px;right:12px;height:3px;background:rgba(255,255,255,.5);border-radius:2px"><div style="width:40%;height:100%;background:#fff"></div></div>
    <div style="position:absolute;top:26px;left:16px;font:700 14px Archivo">taboutique · 2 h</div>${palms}
    <div style="position:absolute;top:170px;left:24px;right:24px;text-align:center;font:400 44px Anton;line-height:1.1">TU JOUES À <span style="color:#FFC861">GTA 6</span><br>JEUDI SOIR ?</div>
    <div style="position:absolute;top:330px;left:40px;right:40px;background:#fff;border-radius:18px;padding:18px;color:#14082A;box-shadow:0 20px 40px rgba(0,0,0,.35)">
      <div style="font:800 14px Archivo;letter-spacing:.12em;color:#888;text-align:center">SONDAGE</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px;font:400 24px Anton;text-align:center"><div style="background:#FF2E88;color:#fff;border-radius:12px;padding:14px">OUI 🎮</div><div style="background:#eee;border-radius:12px;padding:14px">NON</div></div></div></div>`,
  "post-concours": `<div class="ex">EXEMPLE</div><div style="background:#fff;height:844px;color:#111">
    <div class="bar" style="justify-content:flex-start;gap:10px"><span style="width:32px;height:32px;border-radius:50%;background:linear-gradient(#FF2E88,#FFC861)"></span><span>taboutique</span></div>
    <div style="position:relative;height:390px;background:linear-gradient(180deg,#0E0624,#7A1A72 55%,#FF8A4C);overflow:hidden;color:#fff">
      <div style="position:absolute;left:95px;top:210px;width:200px;height:200px;border-radius:50%;background:linear-gradient(#FFE27A,#FF3F86)"></div>
      <div style="position:absolute;top:56px;left:0;right:0;text-align:center;font:400 30px Anton;letter-spacing:.2em;color:#FFC861">CONCOURS</div>
      <div style="position:absolute;top:96px;left:0;right:0;text-align:center;font:400 64px Anton;line-height:1;text-shadow:0 0 22px rgba(255,46,136,.8)">🎮 GTA 6<br>À GAGNER</div>
      <div style="position:absolute;bottom:18px;left:0;right:0;text-align:center;font:700 13px Archivo;letter-spacing:.12em">LE JEU OFFERT · TIRAGE LE 30/11</div></div>
    <div style="padding:12px 16px;font:400 22px Archivo">♡ 💬 ↗</div>
    <div style="padding:0 16px;font:400 15px/1.45 Archivo"><b>taboutique</b> On fait gagner GTA 6 🎮 Pour participer : dis-moi en commentaire <b>quel produit de la boutique tu prendrais</b> 👇</div>
    <div style="padding:14px 16px;font:400 14px Archivo;color:#888">Voir les 214 commentaires</div></div>`,
  "commentaires": `<div class="ex">EXEMPLE</div><div style="background:#fff;height:844px;color:#111;padding-top:30px">
    <div style="text-align:center;font:800 15px Archivo;padding-bottom:14px;border-bottom:1px solid #eee">Commentaires</div>
    ${[["lea.dsgn", "Le sweat Neon Palm en M 🔥", "#FF2E88"], ["karim_92", "Le tee Sunset sans hésiter 🌅", "#FFC861"], ["ines.vk", "La casquette Night pour mon frère 😍", "#19E3D2"], ["tom.btz", "Sweat Neon Palm aussi 🙌", "#7A5CFF"]].map(([u, t, c]) => `<div style="display:flex;gap:12px;padding:16px"><span style="flex:none;width:38px;height:38px;border-radius:50%;background:${c}"></span><div><div style="font:700 14px Archivo">${u} <span style="font-weight:400;color:#999">1 min</span></div><div style="font:400 16px Archivo;margin-top:3px">${t}</div></div></div>`).join("")}</div>`,
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
