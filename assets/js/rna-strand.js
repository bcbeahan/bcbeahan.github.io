// Decorative single-stranded RNA for the about-page header.
// One helical backbone (single-stranded RNA stacks into a right-handed helix,
// ~11 nt per turn) with each base pointing inward, unpaired. A few adenosines are
// highlighted as m6A sites. Plain canvas, no libraries.
// Pauses when off-screen and draws a single still frame for prefers-reduced-motion.
(function () {
  "use strict";

  var canvas = document.getElementById("rna-strand");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");

  // ---------- geometry (model units; x is the long axis) ----------
  var TILT = -0.12; // slight tilt around z so it reads as 3D
  var N_NT = 40; // nucleotides
  var RISE = 0.62; // x distance per nucleotide
  var RADIUS = 2.2; // backbone radius
  var BASE_REACH = 0.62; // how far each base reaches towards the axis (fraction of RADIUS)
  var TWIST = (2 * Math.PI) / 11; // ~11 nt per turn
  var CENTER_X = 0.56; // horizontal centre of the strand within the canvas (0-1)
  var BEND = 0.9; // gentle curve of the helix axis, so it looks flexible

  var nts = []; // {x, y, z, bx, by, bz, m6a}: backbone point + base tip
  for (var i = 0; i < N_NT; i++) {
    var x = i * RISE;
    var a = i * TWIST;
    var yc = BEND * Math.sin(x * 0.17); // axis position
    var inner = RADIUS * (1 - BASE_REACH);
    nts.push({
      x: x,
      y: yc + RADIUS * Math.cos(a),
      z: RADIUS * Math.sin(a),
      bx: x + 0.12,
      by: yc + inner * Math.cos(a),
      bz: inner * Math.sin(a),
    });
  }

  // m6A sites, clustered towards the 3' end (higher index = closer to 3'), echoing
  // the enrichment of m6A near stop codons and in 3' UTRs.
  // The methyl group sits on the base, so the base tip is highlighted.
  [24, 31, 36].forEach(function (idx) {
    if (nts[idx]) nts[idx].m6a = true;
  });

  // centre the model on x
  var minX = Infinity,
    maxX = -Infinity;
  nts.forEach(function (n) {
    minX = Math.min(minX, n.x);
    maxX = Math.max(maxX, n.x);
  });
  var midX = (minX + maxX) / 2;
  var spanX = maxX - minX;
  nts.forEach(function (n) {
    n.x -= midX;
    n.bx -= midX;
  });

  // ---------- colours (follow the site theme) ----------
  var colors = {};
  function readColors() {
    var css = getComputedStyle(document.documentElement);
    colors.accent = css.getPropertyValue("--global-theme-color").trim() || "#2698ba";
    colors.text = css.getPropertyValue("--global-text-color").trim() || "#888";
    colors.m6a = "#f0a43a";
  }
  readColors();
  new MutationObserver(function () {
    readColors();
    if (!running) draw(lastT);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  // ---------- sizing ----------
  var W = 0,
    H = 0,
    scale = 1;
  function resize() {
    var rect = canvas.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = rect.width;
    H = rect.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // fit the tilted model (plus perspective growth) inside the canvas
    var ext = RADIUS * 3.4;
    var extX = spanX * Math.cos(Math.abs(TILT)) + ext * Math.sin(Math.abs(TILT));
    var extY = spanX * Math.sin(Math.abs(TILT)) + ext * Math.cos(Math.abs(TILT));
    scale = Math.min((W * 0.86) / extX, (H * 0.9) / extY) / 1.15;
    if (!running) draw(lastT);
  }

  // ---------- rendering ----------
  var projected = new Array(nts.length);
  var projectedBase = new Array(nts.length);

  function project(n, spin) {
    // spin around the long (x) axis
    var cs = Math.cos(spin),
      sn = Math.sin(spin);
    var y = n.y * cs - n.z * sn;
    var z = n.y * sn + n.z * cs;
    var x = n.x;
    // tilt around z
    var ct = Math.cos(TILT),
      st = Math.sin(TILT);
    var x2 = x * ct - y * st;
    var y2 = x * st + y * ct;
    // gentle perspective
    var depth = 1 / (1 - z * 0.035);
    return { x: W * CENTER_X + x2 * scale * depth, y: H / 2 + y2 * scale * depth, z: z, d: depth };
  }

  function alphaFor(z) {
    // nearer = more opaque
    var nz = (z + RADIUS * 1.4) / (RADIUS * 2.8);
    return 0.18 + 0.82 * Math.max(0, Math.min(1, nz));
  }

  var lastT = 0;
  function draw(t) {
    lastT = t;
    ctx.clearRect(0, 0, W, H);
    var spin = t * 0.00025;
    for (var i = 0; i < nts.length; i++) {
      var n = nts[i];
      projected[i] = project(n, spin);
      projectedBase[i] = project({ x: n.bx, y: n.by, z: n.bz }, spin);
    }
    var pulse = 0.5 + 0.5 * Math.sin(t * 0.002);

    // bases: short unpaired sticks pointing inward from the backbone
    ctx.lineWidth = 1.2;
    for (var b = 0; b < nts.length; b++) {
      var bp = projected[b],
        tip = projectedBase[b];
      var ba = alphaFor((bp.z + tip.z) / 2);
      ctx.strokeStyle = nts[b].m6a ? colors.m6a : colors.text;
      ctx.globalAlpha = (nts[b].m6a ? 0.8 : 0.28) * ba;
      ctx.beginPath();
      ctx.moveTo(bp.x, bp.y);
      ctx.lineTo(tip.x, tip.y);
      ctx.stroke();
      if (nts[b].m6a) {
        // glowing methyl mark at the base tip
        ctx.fillStyle = colors.m6a;
        ctx.globalAlpha = ba * (0.18 + 0.17 * pulse);
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, 8 * tip.d, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = ba;
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, 3 * tip.d, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // backbone
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = colors.accent;
    for (var j = 1; j < nts.length; j++) {
      var p0 = projected[j - 1],
        p1 = projected[j];
      ctx.globalAlpha = 0.55 * alphaFor((p0.z + p1.z) / 2);
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.stroke();
    }

    // nucleotides, back to front
    var order = projected
      .map(function (p, idx) {
        return idx;
      })
      .sort(function (a, b) {
        return projected[a].z - projected[b].z;
      });
    order.forEach(function (idx) {
      var p = projected[idx];
      ctx.globalAlpha = 0.85 * alphaFor(p.z);
      ctx.fillStyle = colors.accent;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.4 * p.d, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  // ---------- animation loop ----------
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var running = false;
  var visible = true;
  var rafId = null;

  function frame(t) {
    draw(t + 9000); // same offset as the initial still frame, so there is no jump
    rafId = requestAnimationFrame(frame);
  }
  function start() {
    if (running || reduceMotion || !visible || document.hidden) return;
    running = true;
    rafId = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      visible ? start() : stop();
    }).observe(canvas);
  }
  document.addEventListener("visibilitychange", function () {
    document.hidden ? stop() : start();
  });
  if ("ResizeObserver" in window) {
    new ResizeObserver(resize).observe(canvas);
  } else {
    window.addEventListener("resize", resize);
  }

  resize();
  draw(9000); // a pleasant starting angle; also the still frame for reduced motion
  start();
})();
