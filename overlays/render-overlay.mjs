#!/usr/bin/env node
// Rend une carte overlay transparente (WebM VP9 alpha ou MOV ProRes 4444) à partir d'un JSON de paramètres.
// usage : node overlays/render-overlay.mjs <params.json> [--theme dark|cream] [--format webm|mov] [--out fichier]
//
// params.json :
//   "template"   : nom du modèle dans overlays/templates/ (stat-card, myth-truth, before-after, phone-shot, sales-notifs,
//                  chat-thread, testimonial, steps, annotate, cta-comment)
//   "variables"  : textes, chiffres, durée… Les listes (items, messages, marks) s'écrivent en JSON normal.
//                  Toute valeur "w:mot" (même dans une liste) devient l'instant de ce mot, en secondes depuis le début de la carte.
//                  Une image (src, before_img, after_img) est un chemin relatif au fichier de paramètres : elle est copiée.
//   "words_file" + "word_range" [premier, dernier index] + "t0" (début de la carte dans la voix) : timings des mots,
//                  lus dans words.json (kit avatar) ou transcript.json (kit HyperFrames) ; "fix" {index: "mot"} corrige des mots.
//   "highlight_words" : mots qui font pulser la carte.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, resolve, join, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const HERE = dirname(fileURLToPath(import.meta.url));
const KIT = resolve(HERE, "..");
const args = process.argv.slice(2);
if (!args[0]) { console.error("usage : node overlays/render-overlay.mjs <params.json> [--theme dark|cream] [--format webm|mov] [--out f]"); process.exit(1); }
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const pfile = resolve(args[0]);
const P = JSON.parse(readFileSync(pfile, "utf8"));
const template = P.template || "stat-card";
if (!existsSync(join(HERE, "templates", `${template}.html`))) throw new Error(`modèle inconnu : ${template}`);
const vars = { ...(P.variables || {}) };
const theme = opt("--theme", P.theme || vars.theme);
if (theme) vars.theme = theme;

// ---- timings des mots
const norm = (x) => String(x).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9%]/g, "");
let words = [];
if (P.words_file) {
  const raw = JSON.parse(readFileSync(resolve(dirname(pfile), P.words_file), "utf8"));
  const list = Array.isArray(raw) ? raw : (raw.words || []);
  const [a, b] = P.word_range || [0, list.length - 1];
  const fix = P.fix || {};
  const sel = list.slice(a, b + 1).map((w, i) => ({ w: String(fix[a + i] ?? w.w ?? w.word ?? w.text ?? "").trim(), s: w.s ?? w.start }))
    .filter((w) => w.w && w.w !== "null");
  const t0 = P.t0 ?? sel[0].s;
  words = sel.map((w) => ({ w: w.w, s: +(w.s - t0).toFixed(3) }));
  vars.words = JSON.stringify(words);
  if (Array.isArray(P.highlight_words))
    vars.highlight = JSON.stringify(P.highlight_words.map((m) => words.find((w) => norm(w.w).startsWith(norm(m)))?.s).filter((s) => s != null));
}
const resolveWords = (val, key) => {
  if (typeof val === "string" && val.startsWith("w:")) {
    if (!words.length) throw new Error(`${key} = ${val} : il faut "words_file" pour utiliser un mot`);
    const hit = words.find((w) => norm(w.w).startsWith(norm(val.slice(2))));
    if (!hit) throw new Error(`mot introuvable pour ${key} : ${val}`);
    return hit.s;
  }
  if (Array.isArray(val)) return val.map((x, i) => resolveWords(x, `${key}[${i}]`));
  if (val && typeof val === "object") return Object.fromEntries(Object.entries(val).map(([k, x]) => [k, resolveWords(x, `${key}.${k}`)]));
  return val;
};

// ---- images : copiées dans overlays/.media (servies à côté des modèles)
const MEDIA = join(HERE, ".media");
const IMG = /\.(png|jpe?g|webp|gif|svg)$/i;
for (const [k, val] of Object.entries(vars)) {
  let x = resolveWords(val, k);
  if (typeof x === "string" && IMG.test(x) && !x.startsWith("/overlays/")) {
    const src = resolve(dirname(pfile), x);
    if (!existsSync(src)) throw new Error(`image introuvable pour ${k} : ${src}`);
    const name = createHash("sha1").update(readFileSync(src)).digest("hex").slice(0, 12) + extname(src).toLowerCase();
    mkdirSync(MEDIA, { recursive: true }); copyFileSync(src, join(MEDIA, name));
    x = `/overlays/.media/${name}`;                         // chemin servi depuis la racine du kit
  }
  vars[k] = (x && typeof x === "object") ? JSON.stringify(x) : x;   // les listes passent en texte JSON
}

// ---- rendu
const format = opt("--format", P.format || "webm");
const stem = basename(pfile, ".json") + (theme ? `-${theme}` : "");
const out = resolve(opt("--out", P.out || join(KIT, "renders", "overlays", `${stem}.${format}`)));
mkdirSync(dirname(out), { recursive: true });
const vfile = join(KIT, "renders", "overlays", `.${stem}.vars.json`);
mkdirSync(dirname(vfile), { recursive: true });
writeFileSync(vfile, JSON.stringify(vars));
const pkg = JSON.parse(readFileSync(join(KIT, "package.json"), "utf8"));
const hf = pkg.scripts.render.match(/hyperframes@[0-9.]+/)[0];
execFileSync("npx", ["--yes", hf, "render", "-c", `overlays/templates/${template}.html`, "--format", format,
  "--variables-file", vfile, "--strict-variables", "--quiet", "--output", out, KIT], { stdio: "inherit" });
console.log(out);
