// Regenerates public/og.png and everything in public/favicon/.
// Run it after changing the name, tagline or brand colours:
//
//   node scripts/make-brand-assets.mjs "Zhenhao Yang" "I build …" "allenyzh.com"
//
// It renders with the installed Google Chrome (through Playwright, already a
// dev dependency) so the site's own fonts and oklch tokens are used as-is.
// The colour values below mirror the dark theme in src/styles/global.css.
import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const [name, tagline, site] = process.argv.slice(2);
if (!name || !tagline || !site) {
  console.error('usage: node scripts/make-brand-assets.mjs "<name>" "<tagline>" "<domain>"');
  process.exit(1);
}

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = path.join(project, "public");
const font = (file) =>
  `data:font/woff2;base64,${readFileSync(path.join(pub, "fonts", file)).toString("base64")}`;

const BG = "oklch(0.155 0.006 260)";
const BRAND = "oklch(0.82 0.17 155)";
const FG = "oklch(0.97 0.003 260)";
const SOFT = "oklch(0.83 0.006 260)";
const MUTED = "oklch(0.67 0.01 260)";

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ deviceScaleFactor: 1 });

// oklch → hex, for the SVG favicon (kept as a plain file other tools can read).
const toHex = (color) =>
  page.evaluate((c) => {
    const ctx = new OffscreenCanvas(1, 1).getContext("2d", { colorSpace: "srgb" });
    ctx.fillStyle = c;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
  }, color);
const bgHex = await toHex(BG);
const brandHex = await toHex(BRAND);

// ---- favicon: a green square on the dark page colour, same mark as the nav.
const mark = (size, { rounded }) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="${rounded ? 14 : 0}" fill="${bgHex}"/>
  <rect x="20" y="20" width="24" height="24" rx="6" fill="${brandHex}"/>
</svg>`;

writeFileSync(path.join(pub, "favicon", "favicon.svg"), mark(64, { rounded: true }).trim() + "\n");

const renderMark = async (size, rounded) => {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<style>html,body{margin:0;background:transparent}svg{display:block}</style>${mark(size, { rounded })}`,
  );
  return page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
};

const png16 = await renderMark(16, true);
const png32 = await renderMark(32, true);
writeFileSync(path.join(pub, "favicon", "favicon-16x16.png"), png16);
writeFileSync(path.join(pub, "favicon", "favicon-32x32.png"), png32);
// Home-screen icons are masked by the OS, so they are full-bleed.
writeFileSync(path.join(pub, "favicon", "apple-touch-icon.png"), await renderMark(180, false));
writeFileSync(path.join(pub, "favicon", "android-chrome-192x192.png"), await renderMark(192, false));
writeFileSync(path.join(pub, "favicon", "android-chrome-512x512.png"), await renderMark(512, false));

// .ico is a small directory wrapped around PNG payloads.
const ico = (images) => {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + 16 * images.length;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size, 0);
    entry.writeUInt8(size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...images.map((image) => image.data)]);
};
writeFileSync(
  path.join(pub, "favicon", "favicon.ico"),
  ico([
    { size: 16, data: png16 },
    { size: 32, data: png32 },
  ]),
);

// ---- share image, 1200×630
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(`
<style>
  @font-face { font-family: Geist; src: url(${font("geist-latin-wght-normal.woff2")}); font-weight: 100 900; }
  @font-face { font-family: "Geist Mono"; src: url(${font("geist-mono-latin-wght-normal.woff2")}); font-weight: 100 900; }
  * { box-sizing: border-box; margin: 0; }
  body {
    width: 1200px; height: 630px; padding: 72px 80px; overflow: hidden;
    display: flex; flex-direction: column; justify-content: space-between;
    background: ${BG}; color: ${FG}; font-family: Geist, sans-serif;
    -webkit-font-smoothing: antialiased; position: relative;
  }
  body::before {
    content: ""; position: absolute; inset: 0;
    background-image:
      radial-gradient(760px 420px at 16% 0%, oklch(0.82 0.17 155 / 0.14), transparent 70%),
      radial-gradient(oklch(1 0 0 / 0.18) 1.2px, transparent 1.8px);
    background-size: 100% 100%, 26px 26px;
    mask-image: radial-gradient(ellipse 80% 110% at 30% 0%, black 30%, transparent 80%);
  }
  .row { position: relative; display: flex; align-items: center; justify-content: space-between;
         font: 500 24px/1 "Geist Mono", monospace; color: ${MUTED}; }
  .brand { display: flex; align-items: center; gap: 16px; color: ${FG}; }
  .dot { width: 20px; height: 20px; border-radius: 5px; background: ${BRAND}; }
  h1 { position: relative; font-size: 128px; line-height: 1; letter-spacing: -0.045em; font-weight: 600; }
  p { position: relative; margin-top: 28px; font-size: 44px; line-height: 1.25; letter-spacing: -0.02em; color: ${SOFT}; max-width: 760px; text-wrap: balance; hyphens: none; word-break: keep-all; }
</style>
<div class="row"><span class="brand"><span class="dot"></span>${name.toLowerCase().replace(/\s+/g, ".")}</span></div>
<div><h1>${name}</h1><p>${tagline.replace(/-/g, '\u2011')}</p></div>
<div class="row"><span>${site}</span><span style="color:${BRAND}">●</span></div>
`);
await page.evaluate(() => document.fonts.ready);
writeFileSync(path.join(pub, "og.png"), await page.screenshot({ type: "png" }));

await browser.close();
console.log({ bgHex, brandHex });
