/*
 * Lorenz system, two nearby trajectories (vanilla JS + canvas, no dependencies).
 * Used in the Butterfly Effect post: the page includes <div data-lorenz></div> and loads this
 * file through `scripts:` in its front matter (see _layouts/default.html).
 * Colors come from the site's CSS custom properties, so the demo follows dark mode.
 */
(function () {
  "use strict";

  var DT = 0.005;          // RK4 step
  var TRAIL = 1400;        // points kept per trajectory
  var HISTORY_T = 40;      // seconds shown in the distance plot

  function lorenz(s, p, out) {
    out[0] = p.sigma * (s[1] - s[0]);
    out[1] = s[0] * (p.rho - s[2]) - s[1];
    out[2] = s[0] * s[1] - p.beta * s[2];
  }

  // one RK4 step, in place
  var k1 = [0, 0, 0], k2 = [0, 0, 0], k3 = [0, 0, 0], k4 = [0, 0, 0], tmp = [0, 0, 0];
  function step(s, p, h) {
    var i;
    lorenz(s, p, k1);
    for (i = 0; i < 3; i++) tmp[i] = s[i] + 0.5 * h * k1[i];
    lorenz(tmp, p, k2);
    for (i = 0; i < 3; i++) tmp[i] = s[i] + 0.5 * h * k2[i];
    lorenz(tmp, p, k3);
    for (i = 0; i < 3; i++) tmp[i] = s[i] + h * k3[i];
    lorenz(tmp, p, k4);
    for (i = 0; i < 3; i++) s[i] += h / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]);
  }

  function cssVar(el, name, fallback) {
    var v = getComputedStyle(el).getPropertyValue(name).trim();
    return v || fallback;
  }

  function make(tag, attrs, parent) {
    var el = document.createElement(tag);
    for (var k in attrs) {
      if (k === "text") el.textContent = attrs[k];
      else el.setAttribute(k, attrs[k]);
    }
    if (parent) parent.appendChild(el);
    return el;
  }

  function Demo(root) {
    var self = this;
    this.root = root;
    root.innerHTML = "";
    root.classList.add("lorenz-ready");

    var fig = make("div", { "class": "lorenz-figure" }, root);
    this.canvas = make("canvas", { role: "img", "aria-label": "Two Lorenz trajectories projected on the x-z plane" }, fig);
    this.plot = make("canvas", { role: "img", "aria-label": "Distance between the two trajectories over time, log scale" }, fig);
    var legend = make("p", { "class": "lorenz-legend" }, root);
    make("span", { "class": "lorenz-key lorenz-key-a", text: "trajectory 1" }, legend);
    make("span", { "class": "lorenz-key lorenz-key-b", text: "trajectory 2 (x shifted by the initial separation)" }, legend);
    this.readout = make("p", { "class": "lorenz-readout", "aria-live": "off" }, root);

    var controls = make("div", { "class": "lorenz-controls" }, root);
    this.params = { sigma: 10, rho: 28, beta: 8 / 3, eps: -8, speed: 4 };
    var sliders = [
      ["sigma", "σ (sigma)", 1, 20, 0.1, function (v) { return v.toFixed(1); }],
      ["rho", "ρ (rho)", 1, 50, 0.1, function (v) { return v.toFixed(1); }],
      ["beta", "β (beta)", 0.2, 5, 0.01, function (v) { return v.toFixed(2); }],
      ["eps", "initial separation", -12, -1, 1, function (v) { return "10^" + v; }],
      ["speed", "speed", 1, 20, 1, function (v) { return v + "×"; }]
    ];
    sliders.forEach(function (d) {
      var key = d[0];
      var label = make("label", { "class": "lorenz-slider" }, controls);
      var name = make("span", { "class": "lorenz-slider-name" }, label);
      name.textContent = d[1];
      var out = make("output", {}, label);
      var input = make("input", { type: "range", min: d[2], max: d[3], step: d[4], value: self.params[key] }, label);
      out.textContent = d[5](self.params[key]);
      input.addEventListener("input", function () {
        self.params[key] = parseFloat(input.value);
        out.textContent = d[5](self.params[key]);
        if (key !== "speed") self.reset();
      });
    });

    var buttons = make("div", { "class": "lorenz-buttons" }, controls);
    this.playBtn = make("button", { type: "button" }, buttons);
    var resetBtn = make("button", { type: "button", text: "Restart" }, buttons);
    this.playBtn.addEventListener("click", function () { self.setRunning(!self.running); });
    resetBtn.addEventListener("click", function () { self.reset(); });

    this.readColors();
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      var onChange = function () { self.readColors(); self.draw(); };
      if (mq.addEventListener) mq.addEventListener("change", onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }

    this.resize();
    if (window.ResizeObserver) new ResizeObserver(function () { self.resize(); self.draw(); }).observe(root);
    else window.addEventListener("resize", function () { self.resize(); self.draw(); });

    this.reset();

    // run only while visible; start paused for visitors who prefer reduced motion
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.visible = true;
    this.setRunning(!reduced);
    if (window.IntersectionObserver) {
      new IntersectionObserver(function (entries) {
        self.visible = entries[0].isIntersecting;
        if (self.visible && self.running) self.loop();
      }).observe(root);
    }
  }

  Demo.prototype.readColors = function () {
    var r = this.root;
    this.colors = {
      a: cssVar(r, "--accent", "#17a2b8"),
      b: cssVar(r, "--accent-2", "#ff6b6b"),
      text: cssVar(r, "--muted", "#5f6b76"),
      grid: cssVar(r, "--border", "#e9ecef"),
      bg: cssVar(r, "--surface", "#ffffff")
    };
  };

  Demo.prototype.resize = function () {
    var dpr = window.devicePixelRatio || 1;
    var w = Math.max(200, this.root.clientWidth);
    var h = Math.round(Math.min(380, Math.max(220, w * 0.6)));
    var ph = 110;
    [[this.canvas, h], [this.plot, ph]].forEach(function (c) {
      c[0].style.width = w + "px";
      c[0].style.height = c[1] + "px";
      c[0].width = Math.round(w * dpr);
      c[0].height = Math.round(c[1] * dpr);
      c[0].getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);
    });
    this.w = w; this.h = h; this.ph = ph;
  };

  Demo.prototype.reset = function () {
    var p = this.params;
    // start on the attractor: discard a transient from (1, 1, 1)
    var s = [1, 1, 1];
    for (var i = 0; i < 2000; i++) step(s, p, DT);
    this.a = s.slice();
    this.b = s.slice();
    this.b[0] += Math.pow(10, p.eps);
    this.t = 0;
    this.trailA = [];
    this.trailB = [];
    this.dist = [];
    // view box from the parameters (the attractor scales roughly with rho)
    var r = Math.max(p.rho, 5);
    this.xmax = 0.75 * r + 3;
    this.zmax = 1.8 * r + 4;
    this.draw();
  };

  Demo.prototype.setRunning = function (on) {
    this.running = on;
    this.playBtn.textContent = on ? "Pause" : "Play";
    this.playBtn.setAttribute("aria-pressed", on ? "true" : "false");
    if (on) this.loop();
  };

  Demo.prototype.loop = function () {
    var self = this;
    if (this.raf) return;
    this.raf = requestAnimationFrame(function frame() {
      self.raf = null;
      if (!self.running || !self.visible) return;
      self.advance();
      self.draw();
      self.raf = requestAnimationFrame(frame);
    });
  };

  Demo.prototype.advance = function () {
    var p = this.params, n = Math.round(p.speed) * 2;
    for (var i = 0; i < n; i++) {
      step(this.a, p, DT);
      step(this.b, p, DT);
      this.t += DT;
      if (i % 2 === 1) {
        this.trailA.push([this.a[0], this.a[2]]);
        this.trailB.push([this.b[0], this.b[2]]);
        var dx = this.a[0] - this.b[0], dy = this.a[1] - this.b[1], dz = this.a[2] - this.b[2];
        this.dist.push([this.t, Math.sqrt(dx * dx + dy * dy + dz * dz)]);
      }
    }
    if (this.trailA.length > TRAIL) {
      this.trailA.splice(0, this.trailA.length - TRAIL);
      this.trailB.splice(0, this.trailB.length - TRAIL);
    }
    while (this.dist.length && this.dist[0][0] < this.t - HISTORY_T) this.dist.shift();
  };

  Demo.prototype.draw = function () {
    if (!this.colors || !this.trailA) return;
    var c = this.colors, ctx = this.canvas.getContext("2d"), w = this.w, h = this.h;
    // same scale on both axes, view box centered
    var xmax = this.xmax, zmax = this.zmax, pad = 14;
    var k = Math.min((w - 2 * pad) / (2 * xmax), (h - 2 * pad) / zmax);
    var cx = w / 2, z0 = h / 2 + k * zmax / 2;
    function X(x) { return cx + k * x; }
    function Z(z) { return z0 - k * z; }

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = c.text;
    ctx.font = "12px Helvetica, Arial, sans-serif";
    ctx.fillText("x–z projection", pad, pad + 10);

    function trail(pts, color) {
      var n = pts.length, chunk = 100;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.4;
      for (var start = 0; start < n - 1; start += chunk) {
        ctx.globalAlpha = 0.15 + 0.85 * (start + chunk) / Math.max(n, chunk);
        ctx.beginPath();
        var end = Math.min(n - 1, start + chunk);
        ctx.moveTo(X(pts[start][0]), Z(pts[start][1]));
        for (var i = start + 1; i <= end; i++) ctx.lineTo(X(pts[i][0]), Z(pts[i][1]));
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
    trail(this.trailA, c.a);
    trail(this.trailB, c.b);

    [[this.b, c.b], [this.a, c.a]].forEach(function (d) {
      ctx.beginPath();
      ctx.arc(X(d[0][0]), Z(d[0][2]), 4.5, 0, 2 * Math.PI);
      ctx.fillStyle = d[1];
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = c.bg;
      ctx.stroke();
    });

    // distance plot, log10 scale from 1e-12 to 1e2
    var p = this.plot.getContext("2d"), ph = this.ph, lo = -12, hi = 2;
    var left = 40, right = w - 8, top = 8, bottom = ph - 20;
    p.clearRect(0, 0, w, ph);
    p.font = "11px Helvetica, Arial, sans-serif";
    p.strokeStyle = c.grid;
    p.fillStyle = c.text;
    p.lineWidth = 1;
    [-12, -8, -4, 0].forEach(function (e) {
      var y = bottom - (e - lo) / (hi - lo) * (bottom - top);
      p.beginPath(); p.moveTo(left, y); p.lineTo(right, y); p.stroke();
      p.fillText("1e" + e, 4, y + 4);
    });
    var t0 = Math.max(0, this.t - HISTORY_T);
    p.fillText("distance between the trajectories (log scale)", left, ph - 5);
    var d = this.dist;
    if (d.length > 1) {
      p.strokeStyle = c.b;
      p.lineWidth = 1.5;
      p.beginPath();
      for (var i = 0; i < d.length; i++) {
        var x = left + (d[i][0] - t0) / HISTORY_T * (right - left);
        var lg = Math.min(hi, Math.max(lo, Math.log(d[i][1]) / Math.LN10));
        var y = bottom - (lg - lo) / (hi - lo) * (bottom - top);
        if (i === 0) p.moveTo(x, y); else p.lineTo(x, y);
      }
      p.stroke();
    }

    var last = d.length ? d[d.length - 1][1] : Math.pow(10, this.params.eps);
    this.readout.textContent = "t = " + this.t.toFixed(1) + "   ·   distance = " + last.toExponential(1);
  };

  function init() {
    var roots = document.querySelectorAll("[data-lorenz]");
    for (var i = 0; i < roots.length; i++) new Demo(roots[i]);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
