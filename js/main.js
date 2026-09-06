/**
 * YOloo — main.js
 * Handles: sticky header, mobile nav, scroll reveal, stat counters,
 * gallery filtering, testimonial carousel, contact form, and
 * injecting business info from data.js into the DOM.
 */
(function () {
  "use strict";

  const B = window.BUSINESS || {};

  /* ---------------------------------- */
  /* Inject business info from config    */
  /* ---------------------------------- */
  function injectBusinessInfo() {
    const setText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };
    const setHref = (id, href, text) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.href = href;
      if (text) el.textContent = text;
    };

    setText("ciAddress", `${B.address?.line1 || ""}, ${B.address?.line2 || ""}, ${B.address?.line3 || ""}`);
    setHref("ciPhone", B.phone?.href, B.phone?.display);
    setHref("ciEmail", `mailto:${B.email}`, B.email);
    setHref("ciWhatsapp", B.whatsapp?.href, B.whatsapp?.display);
    setHref("whatsappFab", B.whatsapp?.href);

    if (B.hours) {
      setText("ciHours", B.hours.map(h => `${h.days}: ${h.time}`).join(" · "));
    }

    setText("footPhone", B.phone?.display || "");
    setText("footEmail", B.email || "");
    setText("footLocation", B.location || "");

    setHref("socInstagram", B.social?.instagram);
    setHref("socFacebook", B.social?.facebook);
    setHref("socLinkedin", B.social?.linkedin);
    setHref("socYoutube", B.social?.youtube);

    const mapEl = document.getElementById("mapEmbed");
    if (mapEl && B.mapsEmbedSrc && !B.mapsEmbedSrc.includes("REPLACE_ME")) {
      mapEl.innerHTML = `<iframe src="${B.mapsEmbedSrc}" width="100%" height="100%" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="YOloo location map"></iframe>`;
    }

    const yearEl = document.getElementById("footYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ---------------------------------- */
  /* Sticky header                       */
  /* ---------------------------------- */
  function initHeader() {
    const header = document.getElementById("siteHeader");
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------------------------- */
  /* Mobile nav                          */
  /* ---------------------------------- */
  function initMobileNav() {
    const toggle = document.getElementById("navToggle");
    const nav = document.getElementById("mobileNav");
    if (!toggle || !nav) return;

    const closeNav = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    };

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("nav-open", isOpen);
    });

    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeNav));
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------------------------------- */
  /* Scroll reveal                       */
  /* ---------------------------------- */
  function initReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window) || items.length === 0) {
      items.forEach(el => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    items.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.setProperty("--stagger-i", i % 6);
      io.observe(el);
    });
  }

  /* ---------------------------------- */
  /* Animated counters                   */
  /* ---------------------------------- */
  function initCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    if (counters.length === 0) return;

    const animate = (el) => {
      const target = parseInt(el.getAttribute("data-counter"), 10) || 0;
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1400;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animate);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => io.observe(el));
  }

  /* ---------------------------------- */
  /* Gallery filtering                   */
  /* ---------------------------------- */
  function initGalleryFilter() {
    const buttons = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".gallery-item");
    if (buttons.length === 0) return;

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const filter = btn.getAttribute("data-filter");

        items.forEach(item => {
          const match = filter === "all" || item.getAttribute("data-cat") === filter;
          item.classList.toggle("is-hidden", !match);
        });
      });
    });
  }

  /* ---------------------------------- */
  /* Testimonial carousel controls       */
  /* ---------------------------------- */
  function initTestimonials() {
    const track = document.getElementById("testiTrack");
    const prev = document.getElementById("testiPrev");
    const next = document.getElementById("testiNext");
    if (!track || !prev || !next) return;

    const scrollByCard = (dir) => {
      const card = track.querySelector(".testi-card");
      const gap = 24;
      const distance = (card ? card.offsetWidth : 320) + gap;
      track.scrollBy({ left: dir * distance, behavior: "smooth" });
    };

    prev.addEventListener("click", () => scrollByCard(-1));
    next.addEventListener("click", () => scrollByCard(1));
  }

  /* ---------------------------------- */
  /* Contact form                        */
  /* ---------------------------------- */
  function initContactForm() {
    const form = document.getElementById("contactForm");
    const success = document.getElementById("formSuccess");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // NOTE: Replace this with a real submission handler
      // (e.g. fetch() to a backend endpoint, or a form service).
      success.classList.add("is-visible");
      success.setAttribute("tabindex", "-1");
      success.focus();
      form.reset();

      setTimeout(() => success.classList.remove("is-visible"), 6000);
    });
  }

  /* ---------------------------------- */
  /* Init                                */
  /* ---------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    injectBusinessInfo();
    initHeader();
    initMobileNav();
    initReveal();
    initCounters();
    initGalleryFilter();
    initTestimonials();
    initContactForm();
  });
})();
