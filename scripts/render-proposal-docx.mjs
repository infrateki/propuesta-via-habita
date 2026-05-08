/**
 * scripts/render-proposal-docx.mjs
 *
 * Renders the styled HTML at public/proposal.html (produced by
 * render-proposal.mjs) into a Word .docx file at the repo root.
 *
 * Run AFTER `node scripts/render-proposal.mjs`, since this consumes
 * the HTML output of that step.
 *
 *   node scripts/render-proposal-docx.mjs              # → INFRATEK_Propuesta_VIA-HABITA_2026_v5.docx
 *   node scripts/render-proposal-docx.mjs Custom.docx  # → Custom.docx
 */

import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import HTMLtoDOCX from "html-to-docx";

const ROOT = resolve(import.meta.dirname, "..");
const HTML_IN = resolve(ROOT, "public", "proposal.html");
const DOCX_OUT = resolve(
  ROOT,
  process.argv[2] ?? "INFRATEK_Propuesta_VIA-HABITA_2026_v12.docx",
);

const html = await readFile(HTML_IN, "utf8");

const buffer = await HTMLtoDOCX(html, null, {
  table: { row: { cantSplit: true } },
  font: "Calibri",
  fontSize: 22,         // 11pt (half-points)
  margins: {
    top: 1100,
    right: 1100,
    bottom: 1100,
    left: 1100,
    header: 720,
    footer: 720,
    gutter: 0,
  },
  pageNumber: true,
  title: "Propuesta Integrada · INFRATEK × HABITA · v12.0",
  creator: "INFRATEK LLC",
  subject: "Implementación BIM + Plataforma VIA-HABITA",
});

await writeFile(DOCX_OUT, buffer);
console.log(`✓ DOCX written: ${DOCX_OUT}`);
