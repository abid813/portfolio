/* ═══════ Main site interactions ═══════ */

// ── Typewriter ──
(function typewriter() {
  const roles = [
    "Full-Stack Web Developer",
    "AI Automation Specialist",
    "Figma → Code Craftsman",
    "Upwork Freelancer",
  ];
  const el = document.getElementById("typewriter");
  if (!el) return;
  let r = 0, i = 0, deleting = false;
  function tick() {
    const word = roles[r];
    el.textContent = word.slice(0, i);
    if (!deleting && i < word.length) { i++; setTimeout(tick, 65); }
    else if (!deleting) { deleting = true; setTimeout(tick, 1900); }
    else if (i > 0) { i--; setTimeout(tick, 32); }
    else { deleting = false; r = (r + 1) % roles.length; setTimeout(tick, 350); }
  }
  tick();
})();

// ── Live clock (GMT+6 Khulna) ──
(function liveClock() {
  const el = document.getElementById("liveClock");
  if (!el) return;
  function update() {
    const now = new Date();
    const bd = new Date(now.getTime() + (6 * 60 + now.getTimezoneOffset()) * 60000);
    el.textContent = bd.toLocaleTimeString("en-US", { hour12: true });
  }
  update();
  setInterval(update, 1000);
})();

// ── Reveal on scroll ──
(function reveal() {
  const items = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  items.forEach((i) => io.observe(i));
})();

// ── Animated stat counters ──
(function counters() {
  const nums = document.querySelectorAll(".stat-num");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      io.unobserve(el);
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const decimals = String(el.dataset.count).includes(".") ? 1 : 0;
      const dur = 1600, start = performance.now();
      (function step(t) {
        const p = Math.min((t - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(step);
      })(start);
    });
  }, { threshold: 0.5 });
  nums.forEach((n) => io.observe(n));
})();

// ── Skill tabs ──
(function skillTabs() {
  const tabs = document.querySelectorAll(".skill-tab");
  const groups = document.querySelectorAll(".skill-group");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      groups.forEach((g) => g.classList.remove("active"));
      tab.classList.add("active");
      const g = document.querySelector(`[data-group="${tab.dataset.tab}"]`);
      if (g) g.classList.add("active");
    });
  });
})();

// ── Mobile nav ──
(function mobileNav() {
  const burger = document.getElementById("navBurger");
  const links = document.getElementById("navLinks");
  if (!burger || !links) return;
  burger.addEventListener("click", () => links.classList.toggle("open"));
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));
})();

// ── Nav shadow on scroll ──
(function navScroll() {
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    nav.style.boxShadow = window.scrollY > 30 ? "0 8px 30px rgba(2,6,23,.5)" : "none";
  });
})();

// ── Footer year ──
document.getElementById("year").textContent = new Date().getFullYear();
