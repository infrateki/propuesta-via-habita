/**
 * scripts/render-proposal.mjs
 *
 * Renders PROPOSAL-vN.md (default = the latest version on disk) into:
 *   - public/proposal.html  (styled, printable HTML)
 *   - public/proposal.pdf   (driven by headless Chrome --print-to-pdf)
 *
 * The INFRATEK logo at app/icon.png is embedded as a base64 data URL in
 * the cover header so the PDF is self-contained.
 *
 * No package installs required. Uses `marked` (already in node_modules)
 * and shells out to Chrome.
 *
 *   node scripts/render-proposal.mjs              # default source
 *   node scripts/render-proposal.mjs PROPOSAL-v9.md
 */

import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve, basename } from "node:path";
import { marked } from "marked";

const ROOT = resolve(import.meta.dirname, "..");
const sourceArg = process.argv[2] ?? "PROPOSAL-v9.md";
const SOURCE = resolve(ROOT, sourceArg);
const HTML_OUT = resolve(ROOT, "public", "proposal.html");
const PDF_OUT = resolve(ROOT, "public", "proposal.pdf");
const LOGO_PATH = resolve(ROOT, "app", "icon.png");

const CHROME_CANDIDATES = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
];

function findBrowser() {
  for (const p of CHROME_CANDIDATES) {
    if (existsSync(p)) return p;
  }
  return null;
}

const md = await readFile(SOURCE, "utf8");

marked.setOptions({ gfm: true, breaks: false });
const body = marked.parse(md);

const docTitle = `Propuesta Integrada — INFRATEK × HABITA · ${basename(SOURCE, ".md").replace("PROPOSAL-", "")}`;

// Embed the INFRATEK logo as a base64 data URL so the PDF is self-contained
// (Chrome --print-to-pdf does not always follow file:// references for images
// reliably across versions).
let logoDataUrl = "";
if (existsSync(LOGO_PATH)) {
  const buf = await readFile(LOGO_PATH);
  logoDataUrl = `data:image/png;base64,${buf.toString("base64")}`;
}

const cover = logoDataUrl
  ? `<header class="cover">
       <img class="cover-logo" src="${logoDataUrl}" alt="INFRATEK" />
       <div class="cover-meta">
         <span>INFRATEK LLC</span>
         <span>·</span>
         <span>${basename(SOURCE, ".md").toUpperCase()}</span>
       </div>
     </header>`
  : "";

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>${docTitle}</title>
<style>
  @page {
    size: Letter;
    margin: 18mm 16mm 18mm 16mm;
  }
  :root {
    --ink:        #1a1a1a;
    --ink-soft:   #404040;
    --muted:      #6b6b6b;
    --rule:       #d7d4cf;
    --rule-soft:  #ebe8e3;
    --copper:     #b8763a;
    --electric:   #0071e3;
    --emerald:    #1f8a4c;
    --warning:    #b35200;
    --bg:         #ffffff;
    --bg-soft:    #faf8f4;
  }
  * { box-sizing: border-box; }
  html, body {
    margin: 0;
    padding: 0;
    background: var(--bg);
    color: var(--ink);
    font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
    font-size: 10.5pt;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
  }
  .doc {
    max-width: 180mm;
    margin: 0 auto;
    padding: 0;
  }
  h1 {
    font-size: 26pt;
    font-weight: 600;
    line-height: 1.15;
    letter-spacing: -0.01em;
    margin: 0 0 4mm 0;
    color: var(--ink);
    page-break-after: avoid;
  }
  h2 {
    font-size: 17pt;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.005em;
    margin: 14mm 0 4mm 0;
    color: var(--ink);
    border-bottom: 1px solid var(--rule);
    padding-bottom: 2mm;
    page-break-after: avoid;
  }
  h3 {
    font-size: 13pt;
    font-weight: 600;
    margin: 9mm 0 3mm 0;
    color: var(--ink);
    page-break-after: avoid;
  }
  h4 {
    font-size: 11pt;
    font-weight: 600;
    margin: 6mm 0 2mm 0;
    color: var(--ink-soft);
    page-break-after: avoid;
  }
  p {
    margin: 0 0 3mm 0;
  }
  strong { color: var(--ink); font-weight: 600; }
  em     { color: var(--ink-soft); font-style: italic; }
  a      { color: var(--electric); text-decoration: none; }
  hr {
    border: 0;
    border-top: 1px solid var(--rule);
    margin: 8mm 0;
  }
  ul, ol {
    margin: 0 0 4mm 0;
    padding-left: 6mm;
  }
  li {
    margin: 0 0 1.5mm 0;
  }
  blockquote {
    margin: 4mm 0;
    padding: 3mm 5mm;
    border-left: 2px solid var(--copper);
    background: var(--bg-soft);
    color: var(--ink-soft);
    font-style: italic;
    page-break-inside: avoid;
  }
  blockquote strong { color: var(--ink); }
  code {
    font-family: "JetBrains Mono", "Consolas", monospace;
    font-size: 0.92em;
    background: var(--bg-soft);
    padding: 0.5mm 1.5mm;
    border-radius: 1mm;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 4mm 0 6mm 0;
    font-size: 9.5pt;
    page-break-inside: avoid;
  }
  th, td {
    border: 1px solid var(--rule);
    padding: 2mm 3mm;
    vertical-align: top;
    text-align: left;
  }
  thead th {
    background: var(--bg-soft);
    font-weight: 600;
    color: var(--ink);
    border-bottom: 1.5px solid var(--rule);
  }
  tbody tr:nth-child(even) td {
    background: #fcfbf8;
  }
  /* Cover/header block (the doc's metadata block — block of bold paragraphs near the top) */
  .doc > p:first-of-type strong:first-child { color: var(--copper); }

  /* Specific class hooks */
  .pageBreak { page-break-before: always; }

  /* Cover header */
  .cover {
    display: flex;
    align-items: center;
    gap: 5mm;
    padding-bottom: 4mm;
    margin-bottom: 8mm;
    border-bottom: 1px solid var(--rule);
  }
  .cover-logo {
    height: 14mm;
    width: auto;
    display: block;
  }
  .cover-meta {
    display: flex;
    gap: 2mm;
    font-size: 8.5pt;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
  }

  /* Print-tweaks */
  @media print {
    a { color: var(--ink); }
    h2, h3, h4 { page-break-after: avoid; }
    table, blockquote, ul, ol { page-break-inside: avoid; }
  }
</style>
</head>
<body>
<main class="doc">
${cover}
${body}
</main>
</body>
</html>
`;

await writeFile(HTML_OUT, html, "utf8");
console.log(`✓ HTML written: ${HTML_OUT}`);

const browser = findBrowser();
if (!browser) {
  console.error("✗ No Chrome/Edge found. PDF not generated.");
  console.error("  HTML is at public/proposal.html — open in any browser and File > Print > Save as PDF.");
  process.exit(2);
}

const fileUrl = "file:///" + HTML_OUT.replace(/\\/g, "/");

console.log(`→ Driving browser: ${browser}`);
console.log(`  source: ${fileUrl}`);

const args = [
  "--headless=new",
  "--disable-gpu",
  "--no-sandbox",
  "--no-pdf-header-footer",
  `--print-to-pdf=${PDF_OUT}`,
  fileUrl,
];

const result = spawnSync(browser, args, {
  stdio: "inherit",
  windowsHide: true,
  timeout: 120_000,
});

if (result.status !== 0) {
  console.error(`✗ Browser exited with status ${result.status}`);
  process.exit(result.status ?? 1);
}

console.log(`✓ PDF written: ${PDF_OUT}`);
