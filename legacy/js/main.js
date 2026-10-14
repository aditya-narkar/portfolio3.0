// Aditya Narkar — Portfolio behavior.
// Vanilla port of the design prototype's DCLogic component: loader, scroll-reveal,
// count-up stats, scroll progress rail, parallax ghosts, nav shrink, hero parallax.
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.getElementById("year").textContent = new Date().getFullYear();

  function runLoader() {
    var loader = document.getElementById("loader");
    if (!loader) return;
    var num = document.getElementById("loader-num");
    var bar = document.getElementById("loader-bar");

    function finish() {
      loader.classList.add("done");
      document.body.style.overflow = "";
      setTimeout(function () { loader.style.display = "none"; }, 950);
    }

    if (reduceMotion) { if (bar) bar.style.transform = "scaleX(1)"; if (num) num.textContent = "100"; finish(); return; }

    document.body.style.overflow = "hidden";
    var dur = 1500;
    var start = performance.now();
    (function tick(now) {
      var t = Math.min(1, (now - start) / dur);
      var e = 1 - Math.pow(1 - t, 2);
      if (num) num.textContent = String(Math.round(e * 100)).padStart(3, "0");
      if (bar) bar.style.transform = "scaleX(" + e + ")";
      if (t < 1) requestAnimationFrame(tick);
      else finish();
    })(performance.now());
  }

  function countUp(group) {
    group.querySelectorAll("[data-count]").forEach(function (it) {
      var raw = it.getAttribute("data-count");
      var target = parseFloat(raw);
      var dec = raw.indexOf(".") !== -1 ? 1 : 0;
      var pre = it.getAttribute("data-prefix") || "";
      var suf = it.getAttribute("data-suffix") || "";
      if (reduceMotion) { it.textContent = pre + (dec ? target.toFixed(dec) : Math.round(target)) + suf; return; }
      var dur = 1300;
      var start = performance.now();
      (function step(now) {
        var t = Math.min(1, (now - start) / dur);
        var e = 1 - Math.pow(1 - t, 3);
        var v = target * e;
        it.textContent = pre + (dec ? v.toFixed(dec) : Math.round(v)) + suf;
        if (t < 1) requestAnimationFrame(step);
      })(performance.now());
    });
  }

  function init() {
    runLoader();

    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -7% 0px" });

    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { countUp(e.target); countIO.unobserve(e.target); }
      });
    }, { threshold: 0.45 });

    requestAnimationFrame(function () {
      document.querySelectorAll("[data-reveal]").forEach(function (el, i) {
        el.style.transitionDelay = (Math.min(i % 3, 2) * 70) + "ms";
        revealIO.observe(el);
      });
      document.querySelectorAll("[data-countgroup]").forEach(function (el) { countIO.observe(el); });
    });

    var bar = document.getElementById("rail-bar");
    var top = document.getElementById("top-progress");
    var idx = document.getElementById("rail-idx");
    var label = document.getElementById("rail-label");
    var sections = Array.prototype.slice.call(document.querySelectorAll("[data-section]"));
    var ghosts = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
    var nav = document.getElementById("nav");
    var heroInner = document.getElementById("hero-inner");
    var ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var doc = document.documentElement;
        var max = (doc.scrollHeight - doc.clientHeight) || 1;
        var sy = window.scrollY || doc.scrollTop;
        var p = Math.min(1, Math.max(0, sy / max));
        if (bar) bar.style.transform = "scaleY(" + p + ")";
        if (top) top.style.transform = "scaleX(" + p + ")";

        var vh = doc.clientHeight;
        var cur = sections[0], ci = 0;
        sections.forEach(function (s, i) {
          var r = s.getBoundingClientRect();
          if (r.top <= vh * 0.42) { cur = s; ci = i; }
        });
        if (idx) idx.textContent = String(ci + 1).padStart(2, "0");
        if (label && cur) label.textContent = cur.getAttribute("data-label") || "";

        if (!reduceMotion) {
          ghosts.forEach(function (g) {
            var speed = parseFloat(g.getAttribute("data-parallax")) || 0.1;
            var r = g.getBoundingClientRect();
            var off = (r.top + r.height / 2 - vh / 2) * -speed;
            g.style.transform = "translate3d(0," + off.toFixed(1) + "px,0)";
          });
          if (heroInner) {
            var k = Math.min(1, sy / (vh * 0.85));
            heroInner.style.opacity = String(1 - k * 0.85);
            heroInner.style.transform = "translateY(" + (sy * 0.14).toFixed(1) + "px)";
          }
        }
        if (nav) nav.classList.toggle("shrink", sy > 40);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    var heroSec = document.getElementById("top");
    var dev = document.getElementById("hero-dev");
    if (heroSec && dev && !reduceMotion && window.matchMedia("(hover: hover)").matches) {
      heroSec.addEventListener("mousemove", function (ev) {
        var r = heroSec.getBoundingClientRect();
        var mx = (ev.clientX - r.left) / r.width - 0.5;
        var my = (ev.clientY - r.top) / r.height - 0.5;
        dev.style.transform = "translate3d(" + (mx * -34).toFixed(1) + "px," + (my * -20).toFixed(1) + "px,0)";
      }, { passive: true });
    }

    initNavActive();
    initMarqueeVelocity();
    if (!reduceMotion && window.matchMedia("(hover: hover)").matches) initPointerFX();
  }

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  // Highlight the nav link for the section in view.
  function initNavActive() {
    var links = {};
    document.querySelectorAll(".nav-link").forEach(function (a) { links[a.getAttribute("href")] = a; });
    var group = { top: null, work: "#work", experience: "#experience", skills: "#experience", about: "#contact", contact: "#contact" };
    var sections = Array.prototype.slice.call(document.querySelectorAll("[data-section]"));
    var ticking = false;
    function update() {
      ticking = false;
      var vh = document.documentElement.clientHeight;
      var cur = sections[0];
      sections.forEach(function (s) { if (s.getBoundingClientRect().top <= vh * 0.42) cur = s; });
      var target = cur ? group[cur.id] : null;
      document.querySelectorAll(".nav-link").forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("href") === target);
      });
    }
    window.addEventListener("scroll", function () {
      if (ticking) return; ticking = true; requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  // Skew the marquee by scroll velocity, then settle back.
  function initMarqueeVelocity() {
    var wrap = document.querySelector(".marquee-wrap");
    if (!wrap || reduceMotion) return;
    var lastY = window.scrollY, settle;
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      var skew = clamp((y - lastY) * 0.06, -5, 5);
      lastY = y;
      wrap.style.transform = "skewX(" + skew.toFixed(2) + "deg)";
      clearTimeout(settle);
      settle = setTimeout(function () { wrap.style.transform = "skewX(0deg)"; }, 140);
    }, { passive: true });
  }

  // Cursor glow + spotlight + tilt + magnetic buttons.
  function initPointerFX() {
    var glow = document.getElementById("cursor-glow");
    if (glow) {
      window.addEventListener("pointermove", function (e) {
        glow.style.transform = "translate3d(" + e.clientX + "px," + e.clientY + "px,0)";
        glow.style.opacity = "1";
      }, { passive: true });
      document.addEventListener("pointerleave", function () { glow.style.opacity = "0"; });
    }

    var spots = [].concat(
      Array.prototype.slice.call(document.querySelectorAll("#work article")),
      Array.prototype.slice.call(document.querySelectorAll("#work .proj-row")),
      Array.prototype.slice.call(document.querySelectorAll("#skills > div > div")),
      Array.prototype.slice.call(document.querySelectorAll(".exp-meta"))
    );
    spots.forEach(function (el) {
      el.setAttribute("data-spotlight", "");
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (e.clientX - r.left) + "px");
        el.style.setProperty("--my", (e.clientY - r.top) + "px");
      }, { passive: true });
    });

    var tilts = [].concat(
      Array.prototype.slice.call(document.querySelectorAll("#work article")),
      Array.prototype.slice.call(document.querySelectorAll("#skills > div > div"))
    );
    tilts.forEach(function (el) {
      el.setAttribute("data-tilt", "");
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var rx = ((e.clientY - r.top) / r.height - 0.5) * -5;
        var ry = ((e.clientX - r.left) / r.width - 0.5) * 5;
        el.style.transform = "perspective(900px) rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg)";
      }, { passive: true });
      el.addEventListener("pointerleave", function () {
        el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
      });
    });

    document.querySelectorAll(".btn").forEach(function (btn) {
      btn.classList.add("magnet");
      btn.addEventListener("pointermove", function (e) {
        var r = btn.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) * 0.3;
        var dy = (e.clientY - (r.top + r.height / 2)) * 0.4;
        btn.style.transform = "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px)";
      }, { passive: true });
      btn.addEventListener("pointerleave", function () { btn.style.transform = "translate(0,0)"; });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
