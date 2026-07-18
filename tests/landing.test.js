import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const css = readFileSync(new URL("../styles.css", import.meta.url), "utf8");
const js = readFileSync(new URL("../main.js", import.meta.url), "utf8");
const robots = readFileSync(new URL("../robots.txt", import.meta.url), "utf8");
const favicon = readFileSync(new URL("../favicon.svg", import.meta.url), "utf8");
const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");

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

test("landing page exposes crawlable product metadata", () => {
  assert.match(html, /name="robots" content="index, follow"/);
  assert.match(html, /property="og:type" content="website"/);
  assert.match(html, /property="og:image" content="\/og-image\.png"/);
  assert.match(html, /property="og:image:alt" content="Five carousel tiles forming one alpine sunrise panorama"/);
  assert.match(html, /name="twitter:card" content="summary"/);
  assert.match(html, /name="twitter:image" content="\/og-image\.png"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /rel="icon" href="favicon\.svg"/);
  assert.match(robots, /User-agent: \*/);
  assert.match(robots, /Allow: \//);
  assert.match(favicon, /viewBox="0 0 1024 1024"/);
  assert.match(readme, /\]\(\.\/og-image\.png\)/);
});
