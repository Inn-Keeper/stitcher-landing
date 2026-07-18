# Stitcher Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive static landing page that presents Stitcher’s carousel workflow and directs visitors to the live demo.

**Architecture:** A semantic HTML document supplies the product content and accessible walkthrough structure. CSS owns the visual system, responsive layout, and visual transition states; a small browser script progresses the walkthrough when motion is permitted. A Node built-in test asserts the critical static contract without adding a dependency.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node.js built-in test runner, Vercel Web Analytics.

## Global Constraints

- Use only `index.html`, `styles.css`, `main.js`, and one Node built-in test file; add no package or framework.
- The primary CTA text is exactly `Try Stitcher` and links to `https://stitcher-web.vercel.app/` in the same tab.
- Use the Stitcher dark editorial identity and reserve the pink-violet-blue gradient for identity and primary actions.
- Implement the Gallery → Editor → Preview → Export walkthrough with real HTML, CSS, and JavaScript.
- Do not animate when `prefers-reduced-motion: reduce` is active.
- Include Vercel’s native static-site analytics initializer and `/_vercel/insights/script.js` script; Analytics must be enabled in the Vercel dashboard after deployment.
- Keep all copy product-led, not portfolio-led.
- This directory is not currently a Git repository; do not initialize or commit without separate user authorization.

---

### Task 1: Build and verify the static landing page

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `main.js`
- Create: `tests/landing.test.js`

**Interfaces:**
- Consumes: the `data-walkthrough` walkthrough root, `.walkthrough-step` stage buttons, and the `data-stage` attribute defined in `index.html`.
- Produces: a fully static page that works from a normal web server and has no import, package, or build requirement.

- [ ] **Step 1: Write the failing static-contract test**

Create `tests/landing.test.js`:

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const css = readFileSync(new URL("../styles.css", import.meta.url), "utf8");
const js = readFileSync(new URL("../main.js", import.meta.url), "utf8");

test("landing page keeps its product contract", () => {
  assert.match(html, /href="https:\/\/stitcher-web\.vercel\.app\/"/);
  assert.match(html, />Try Stitcher</);
  assert.match(html, /data-walkthrough/);
  assert.match(html, /Gallery/);
  assert.match(html, /Editor/);
  assert.match(html, /Preview/);
  assert.match(html, /Export/);
  assert.match(html, /_vercel\/insights\/script\.js/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(js, /prefers-reduced-motion/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `rtk node --test tests/landing.test.js`

Expected: `ENOENT` because `index.html`, `styles.css`, and `main.js` do not exist yet.

- [ ] **Step 3: Write the minimal page implementation**

Create `index.html` with a semantic header, hero, walkthrough, steps, feature strip, final CTA, and footer. In its `<head>`, include:

```html
<link rel="stylesheet" href="styles.css" />
<script>
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>
<script defer src="main.js"></script>
```

Use `data-walkthrough data-stage="gallery"` on the walkthrough root and four `.walkthrough-step` buttons with `data-stage` values `gallery`, `editor`, `preview`, and `export`. Add a `Try Stitcher` anchor in both CTA locations:

```html
<a class="button button--primary" href="https://stitcher-web.vercel.app/">Try Stitcher</a>
```

Create `styles.css` with root tokens matching the product (`#08080b` base, `#ff5c9a`, `#a06bff`, `#5ba8ff`, and `#ffd27d` warm accent), a responsive layout, focus-visible outlines, and a walkthrough whose child panels transition based on `[data-stage="..."]`. Include this motion stop:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

Create `main.js`:

```js
const walkthrough = document.querySelector("[data-walkthrough]");
const steps = [...document.querySelectorAll(".walkthrough-step")];
const stages = ["gallery", "editor", "preview", "export"];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setStage(stage) {
  walkthrough.dataset.stage = stage;
  steps.forEach((step) => {
    const active = step.dataset.stage === stage;
    step.setAttribute("aria-current", active ? "step" : "false");
  });
}

steps.forEach((step) => step.addEventListener("click", () => setStage(step.dataset.stage)));

if (!reduceMotion) {
  let index = 0;
  window.setInterval(() => {
    index = (index + 1) % stages.length;
    setStage(stages[index]);
  }, 2800);
}
```

- [ ] **Step 4: Run the static-contract test to verify it passes**

Run: `rtk node --test tests/landing.test.js`

Expected: one passing `landing page keeps its product contract` test.

- [ ] **Step 5: Perform a local visual check**

Run: `rtk python3 -m http.server 4173`

Expected: a static server serves the page at `http://localhost:4173`; inspect desktop and narrow mobile widths, confirm the four walkthrough states, keyboard-visible controls, and that the CTA opens the live demo in the same tab.

- [ ] **Step 6: Record the repository limitation**

Do not commit: `stitcher-landing` has no `.git` directory. Leave the completed files present and report that a commit can be made after the user initializes or supplies a repository.
