# YOloo — Premium Electronics Website

A production-ready, single-page business website for YOloo (electronics sales & repair), built with plain HTML/CSS/JS — no build step required.

## Structure

```
yoloo-site/
├── index.html        Main page — all sections, semantic HTML, SEO meta, schema.org markup
├── css/
│   └── styles.css    Full design system (tokens, components, responsive breakpoints)
├── js/
│   ├── data.js       ← EDIT THIS: all business contact info in one place
│   └── main.js       Interactivity: nav, counters, gallery filter, testimonials, form
└── assets/           Place your logo / og-image here if you add real images
```

## To launch

1. Open `js/data.js` and replace every `REPLACE_ME` value with the real business
   phone number, WhatsApp number, email, address, opening hours, social links,
   and Google Maps embed code.
2. Update the `[BUSINESS LOCATION]`-style content in `index.html`'s hero and
   meta description if you want more specific location wording.
3. Wire the contact form (`#contactForm` in `index.html`, handled in
   `js/main.js`'s `initContactForm`) to a real backend or form service
   (e.g. Formspree, Netlify Forms, or your own API endpoint).
4. Replace the inline SVG illustrations with real product/service photography
   when available — swap the `<svg>...</svg>` blocks inside `.hero-visual`,
   `.about-visual`, and `.gallery-item` for `<img>` tags.
5. Open `index.html` in a browser — no build tools needed.

## Notes

- Fully responsive: mobile, tablet, laptop, desktop, large screens.
- Dark "circuit-lux" theme: graphite base with electric cyan + amber accents.
- Fonts: Clash Display (headings) + Manrope (body), loaded from Fontshare/Google Fonts CDNs.
- Accessibility: semantic landmarks, skip link, visible focus states, labeled
  form fields, `prefers-reduced-motion` support, alt text on all SVG illustrations.
- Performance: no frameworks, no heavy libraries, CSS-driven animations,
  IntersectionObserver-based reveal/counter animations.
