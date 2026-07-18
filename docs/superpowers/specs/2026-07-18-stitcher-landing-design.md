# Stitcher landing page design

## Purpose

Create a standalone, product-led landing page for Stitcher. It introduces the
app as a way to turn photos into one continuous, swipeable Instagram carousel
and sends visitors to the live demo.

## Audience and primary action

The page speaks to creators who want a polished carousel from a group of
photos. Its primary action is **Try Stitcher**, linking to
`https://stitcher-web.vercel.app/`. The page does not position itself as a
portfolio case study.

## Visual direction

Match the product identity without copying the application shell: deep
charcoal backgrounds, translucent dark panels, muted borders, generous rounded
corners, an editorial display type treatment, and the pink-violet-blue
gradient only for identity and primary actions. The Stitcher mark is used in
the header and footer.

## Page structure

1. A compact header with the mark, product name, and a Try Stitcher link.
2. A hero with the headline “Your photos. One continuous story.”, supporting
   copy, a primary CTA, and a visual panorama composition.
3. An auto-playing product walkthrough that shows Gallery, Editor, Preview,
   and Export in sequence.
4. A three-step explanation: arrange photos, shape the carousel, and export
   Instagram-ready tiles.
5. A restrained feature strip covering local-first editing, full-resolution
   exports, and optional cloud backup.
6. A final CTA and minimal footer.

## Interactive walkthrough

The walkthrough is an accessible, CSS/JavaScript simulated product animation,
not a recorded video asset. It advances through four labelled screens on a
short loop, pauses when the visitor requests reduced motion, and uses real
HTML rather than inaccessible canvas or video placeholders. It reflects the
actual app flow: Gallery → Editor → Preview → Export.

## Implementation

Use three files only: `index.html`, `styles.css`, and `main.js`. The landing
page has no dependencies, build step, account state, or data persistence.
Use semantic document structure, visible keyboard focus, responsive layouts,
and native links/buttons. The demo link opens in the same tab. Include Vercel
Web Analytics through its native static-site snippet so production page views
are collected after Analytics is enabled in the Vercel project dashboard.

## Verification

- Confirm the CTA links to the provided live demo URL.
- Confirm the Vercel Analytics script is present and serves successfully after
  Analytics is enabled and the site is deployed to Vercel.
- Confirm the walkthrough progresses through all four product stages and
  respects `prefers-reduced-motion`.
- Check the page at narrow mobile and desktop widths for readable copy,
  accessible focus states, and no overflow.
- Run a lightweight static check and inspect the page in a local browser.

## Out of scope

Recorded product capture, analytics, a CMS, login, pricing, and the app itself
are not part of this landing page.
