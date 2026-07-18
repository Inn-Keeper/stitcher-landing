# Stitcher Landing Page

The product landing page for [Stitcher](https://stitcher-web.vercel.app/), a
local-first editor for turning photos into seamless, swipeable Instagram
carousels.

The page introduces the Gallery → Editor → Preview → Export flow with a
lightweight HTML/CSS/JavaScript walkthrough. It uses Stitcher's dark editorial
visual language and directs visitors to the live demo.

## Run locally

There is no package manager or build step. Serve the project root with any
static web server:

```sh
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

## Project structure

```text
index.html       Page content and Vercel Analytics script
styles.css       Responsive visual system and walkthrough states
main.js          Walkthrough controls and auto-advance behaviour
tests/           Node built-in static-contract test
```

## Verification

```sh
node --check main.js
node --test tests/landing.test.js
```

## Deploy and analytics

Deploy the repository as a static Vercel project. The page already includes
Vercel Web Analytics' native static-site script. Enable Web Analytics in the
project's Vercel dashboard and redeploy before expecting production page-view
data.

## License

This repository does not currently declare a license.
