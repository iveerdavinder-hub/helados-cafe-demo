# Cafe Helados — Immersive Website

A responsive, animated React + Vite website concept for Cafe Helados in Patiala. Includes a live Three.js dessert sculpture, responsive navigation, filterable menu, interactive order bag, mood selector, testimonial controls, location links, and email signup UI.

## Requirements
- Node.js 18+ (Node 20+ recommended)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL Vite prints in the terminal.

## Production build
```bash
npm run build
npm run preview
```

## Project structure
- `index.html` — document metadata and font preconnects
- `src/main.jsx` — React app, interactive UI and Three.js scene
- `src/styles.css` — responsive art direction, animations and layout

## Before publishing
1. Confirm menu items, prices, opening hours, address, and review details with Cafe Helados. Menu pricing on the site is illustrative and should be verified.
2. Connect the newsletter form to a real email marketing service. It currently demonstrates client-side success only.
3. For actual ordering, replace the WhatsApp enquiry link with the cafe's official order endpoint or phone number. The cart currently prepares an enquiry, not a paid order.
4. Replace the placeholder guest-story slides with approved real testimonials, or keep them clearly as editorial copy rather than attributed customer reviews.
5. Confirm image usage and licensing. Images load from Unsplash and require an internet connection.
6. Add the cafe's approved logo, phone number, social links, and official booking/order links if available.

## Notes
- Three.js is rendered in real time; the dessert sculpture reacts to pointer movement.
- Reduced-motion preferences are respected.
- The sound control is intentionally a preference/demo control; no sound file is bundled or autoplayed.
