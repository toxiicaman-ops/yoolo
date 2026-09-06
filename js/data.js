/**
 * ============================================================
 * YOloo — BUSINESS CONFIGURATION
 * ------------------------------------------------------------
 * Edit the values below to update contact details across the
 * entire site. Everything wrapped in "REPLACE_ME" should be
 * swapped for the client's real information before launch.
 * ============================================================
 */

const BUSINESS = {
  name: "YOloo",
  tagline: "Electronics",
  category: "Consumer Electronics & Repair",

  // --- Contact details (REPLACE_ME) ---
  phone: {
    display: "+91 REPLACE_ME",
    href: "tel:+91REPLACEME"
  },
  whatsapp: {
    display: "+91 REPLACE_ME",
    href: "https://wa.me/91REPLACEME"
  },
  email: "hello@REPLACE_ME.com",
  address: {
    line1: "REPLACE_ME Street / Building",
    line2: "REPLACE_ME Area, REPLACE_ME City",
    line3: "REPLACE_ME State — REPLACE_ME Pincode"
  },
  location: "REPLACE_ME City",
  hours: [
    { days: "Monday – Saturday", time: "9:30 AM – 8:30 PM" },
    { days: "Sunday", time: "10:00 AM – 5:00 PM" }
  ],

  // --- Social links (REPLACE_ME) ---
  social: {
    instagram: "https://instagram.com/REPLACE_ME",
    facebook: "https://facebook.com/REPLACE_ME",
    linkedin: "https://linkedin.com/company/REPLACE_ME",
    youtube: "https://youtube.com/@REPLACE_ME"
  },

  mapsEmbedSrc:
    "https://www.google.com/maps/embed?pb=REPLACE_ME_WITH_YOUR_EMBED_CODE"
};

// Expose globally for main.js
window.BUSINESS = BUSINESS;
