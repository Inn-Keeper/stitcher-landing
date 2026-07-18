import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const css = readFileSync(new URL("../styles.css", import.meta.url), "utf8");
const js = readFileSync(new URL("../main.js", import.meta.url), "utf8");

test("landing page keeps its product contract", () => {
  assert.match(html, /href="https:\/\/stitcher-web\.vercel\.app\/"/);
  assert.match(html, />Try Stitcher(?:\s|<)/);
  assert.match(html, /data-walkthrough/);
  assert.match(html, /Gallery/);
  assert.match(html, /Editor/);
  assert.match(html, /Preview/);
  assert.match(html, /Export/);
  assert.match(html, /_vercel\/insights\/script\.js/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(js, /prefers-reduced-motion/);
});
