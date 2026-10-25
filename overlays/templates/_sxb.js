// Outils communs des cartes overlays SxB (après gsap.min.js). Chaque modèle appelle SXB.finish("<id>") à la fin.
window.SXB = (function () {
  const v = window.__hyperframes.getVariables();
  const theme = v.theme === "cream" ? "cream" : "dark";
  document.documentElement.dataset.theme = theme;
  const dark = theme === "dark";
  const $ = (q) => document.querySelector(q);
  const J = (s, d) => { if (typeof s !== "string") return s ?? d; try { const r = JSON.parse(s || "null"); return r ?? d; } catch (e) { return d; } };
  const el = (tag, cls, txt, parent) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; if (parent) parent.appendChild(e); return e; };
  const tl = gsap.timeline({ paused: true });
  const card = $(".card");
  if (card && v.top != null) card.style.top = v.top + "px";
  const fmt = (n, dec = 0, pre = "", suf = "") =>
    pre + Number(n).toLocaleString("fr-FR", { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
  // entrée / sortie de la carte : nette sans rebond (dark, DA-SXB) ou glissée avec rebond (cream, kit avatar)
  function enter(sel = ".card", at = 0) {
    if (dark) tl.fromTo(sel, { y: 120, opacity: 0, rotationX: 18, transformPerspective: 900 }, { y: 0, opacity: 1, rotationX: 0, duration: 0.45, ease: "power3.out" }, at);
    else tl.fromTo(sel, { x: 900, rotation: 4 }, { x: 0, rotation: 0, duration: 0.42, ease: "back.out(1.6)" }, at);
  }
  function exit(sel = ".card", at) {
    if (dark) tl.to(sel, { y: -80, opacity: 0, duration: 0.3, ease: "power3.in" }, at);
    else tl.to(sel, { x: -1000, rotation: -4, duration: 0.3, ease: "power3.in" }, at);
  }
  // éléments cachés jusqu'à leur instant
  function hide(sel) { tl.set(sel, { opacity: 0 }, 0); }
  function pop(sel, at, from = {}) {
    hide(sel);
    const to = { opacity: 1, scale: 1, duration: dark ? 0.3 : 0.32, ease: dark ? "power3.out" : "back.out(2.6)", immediateRender: false };
    if (from.rotation != null) to.rotation = 0;
    tl.fromTo(sel, { opacity: 1, scale: dark ? 0.6 : 0.4, ...from }, to, at);
  }
  function rise(sel, at, dy = 30) {
    hide(sel);
    tl.fromTo(sel, { opacity: 0, y: dy }, { opacity: 1, y: 0, duration: 0.32, ease: "power3.out", immediateRender: false }, at);
  }
  function draw(path, at, dur = 0.45) {          // trait SVG qui se dessine
    const L = path.getTotalLength(); path.style.strokeDasharray = L; path.style.strokeDashoffset = L;
    tl.set(path, { opacity: 0 }, 0); tl.set(path, { opacity: 1 }, at);   // pas de point visible avant le tracé
    tl.to(path, { strokeDashoffset: 0, duration: dur, ease: "power2.inOut" }, at);
  }
  function finish(id) {
    const d = Number(v.duration) || 5;
    J(v.highlight, []).forEach((t) => tl.fromTo(".card", { scale: 1 }, { scale: 1.035, duration: 0.12, yoyo: true, repeat: 1, ease: "power1.inOut", immediateRender: false }, t));
    exit(".card", d - 0.3);
    tl.to({}, { duration: d }, 0);
    window.__timelines[id] = tl;
  }
  // trait « à la main » déterministe (même rendu à chaque image)
  function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
  function wobblyEllipse(cx, cy, rx, ry, seed = 3) {
    const r = rng(seed), n = 28, pts = [];
    for (let i = 0; i <= n + 3; i++) { const a = -Math.PI / 2.4 + (i / n) * Math.PI * 2.08, k = 1 + (r() - 0.5) * 0.08;
      pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]); }
    return "M" + pts.map((p) => p.map((x) => x.toFixed(1)).join(" ")).join(" L");
  }
  function wobblyLine(x1, y1, x2, y2, seed = 5, amp = 6) {
    const r = rng(seed), n = 14, pts = [];
    for (let i = 0; i <= n; i++) { const t = i / n; pts.push([x1 + (x2 - x1) * t, y1 + (y2 - y1) * t + Math.sin(t * Math.PI * 3) * amp * (0.6 + r() * 0.4)]); }
    return "M" + pts.map((p) => p.map((x) => x.toFixed(1)).join(" ")).join(" L");
  }
  return { v, theme, dark, $, J, el, tl, fmt, enter, exit, hide, pop, rise, draw, finish, wobblyEllipse, wobblyLine, rng };
})();
