#!/usr/bin/env node
// Rend une carte overlay transparente à partir d'un JSON de paramètres.
// usage : node overlays/render-overlay.mjs <params.json> [--format webm|mov] [--out fichier]
// params.json : { "template": "stat-card", "variables": { … } }  (ou directement les variables + "template")
// Si "words_file" + "word_range" sont fournis, les instants des mots sont lus dans ce fichier (words.json du kit avatar
// ou transcript.json HyperFrames) et ramenés à t = 0 au premier mot ; "at_words" convertit {"value_at":"w:62"} en secondes.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, resolve, join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const KIT = resolve(HERE, "..");
const args = process.argv.slice(2);
if (!args[0]) { console.error("usage : node overlays/render-overlay.mjs <params.json> [--format webm|mov] [--out f]"); process.exit(1); }
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const pfile = resolve(args[0]);
const P = JSON.parse(readFileSync(pfile, "utf8"));
const template = P.template || "stat-card";
const vars = { ...(P.variables || {}) };

if (P.words_file) {
  const raw = JSON.parse(readFileSync(resolve(dirname(pfile), P.words_file), "utf8"));
  const list = Array.isArray(raw) ? raw : (raw.words || []);
  const [a, b] = P.word_range || [0, list.length - 1];
  const fix = P.fix || {};                       // corrections de sous-titres {index: "mot"} (FIX du kit avatar)
  const sel = list.slice(a, b + 1).map((w, i) => ({ w: String(fix[a + i] ?? w.w ?? w.word ?? w.text ?? "").trim(), s: w.s ?? w.start }))
    .filter((w) => w.w && w.w !== "null");
  const t0 = P.t0 ?? sel[0].s;
  const words = sel.map((w) => ({ w: w.w, s: +(w.s - t0).toFixed(3) }));
  vars.words = JSON.stringify(words);
  const norm = (x) => x.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9%]/g, "");
  for (const [k, val] of Object.entries(vars)) {
    if (typeof val === "string" && val.startsWith("w:")) {
      const hit = words.find((w) => norm(w.w).startsWith(norm(val.slice(2))));
      if (!hit) throw new Error(`mot introuvable pour ${k} : ${val}`);
      vars[k] = hit.s;
    }
  }
  if (Array.isArray(P.highlight_words))
    vars.highlight = JSON.stringify(P.highlight_words.map((m) => words.find((w) => norm(w.w).startsWith(norm(m)))?.s).filter((s) => s != null));
}

const format = opt("--format", P.format || "webm");
const out = resolve(opt("--out", P.out || join(KIT, "renders", "overlays", `${basename(pfile, ".json")}.${format}`)));
mkdirSync(dirname(out), { recursive: true });
const vfile = join(KIT, "renders", "overlays", `.${basename(pfile, ".json")}.vars.json`);
mkdirSync(dirname(vfile), { recursive: true });
writeFileSync(vfile, JSON.stringify(vars));
const pkg = JSON.parse(readFileSync(join(KIT, "package.json"), "utf8"));
const hf = pkg.scripts.render.match(/hyperframes@[0-9.]+/)[0];
execFileSync("npx", ["--yes", hf, "render", "-c", `overlays/templates/${template}.html`, "--format", format,
  "--variables-file", vfile, "--strict-variables", "--quiet", "--output", out, KIT], { stdio: "inherit" });
console.log(out);
