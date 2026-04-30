/**
 * One-shot extractor: dumps text from INFRATEK_Propuesta_VIA-HABITA_2026_v8.pdf
 * to stdout so we can build PROPOSAL-v10.md from the actual v8 content.
 */
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { PDFParse } from "pdf-parse";

const ROOT = resolve(import.meta.dirname, "..");
const SRC = resolve(ROOT, "INFRATEK_Propuesta_VIA-HABITA_2026_v8.pdf");

const buf = await readFile(SRC);
const parser = new PDFParse({ data: buf });
const result = await parser.getText();
console.log("---BEGIN---");
console.log(result.text);
console.log("---END---");
