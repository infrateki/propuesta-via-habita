import { calculatePricing, formatCurrency, DEFAULT_CONFIGURATION } from "../lib/pricing";
import { AI_MODELS } from "../lib/constants";
import { PLATFORMS, VIA_HABITA, AUTODESK_BUILD } from "../data/platforms";

console.log("=".repeat(60));
console.log("VIA-HABITA PRICING ENGINE — AUDIT vs PROPOSAL-v4.md");
console.log("=".repeat(60));

console.log("\n[1] DEFAULT CONFIG — Year 1 total");
const b = calculatePricing(DEFAULT_CONFIGURATION);
console.log("   Config:", JSON.stringify(DEFAULT_CONFIGURATION));
console.log("   Implementation:", formatCurrency(b.implementation), "(spec: $12,500)");
console.log("   Visits:        ", formatCurrency(b.visits), "(1 × $2,000)");
console.log("   Platform Y1:   ", formatCurrency(b.platformAnnual));
console.log("   AI Y1:         ", formatCurrency(b.aiAnnual), "(Básico × 1 proj × 12 mo)");
console.log("   TOTAL Y1:      ", formatCurrency(b.totalYear1), "(spec: ~$17,220)");
const delta = Math.abs(b.totalYear1 - 17220);
console.log("   delta from spec:", formatCurrency(delta), `(${((delta / 17220) * 100).toFixed(2)}%)`);

console.log("\n[2] BENCHMARK CONFIG — 6 projects, 50 users (Section 13)");
const b6 = calculatePricing({
  additionalVisits: 0,
  projects: 6,
  aiLevel: "none",
  knowledgeGraph: false,
  hosting: "cloud",
  gpu: "none",
});
console.log("   Platform Y1 (6 proj × $2,000):", formatCurrency(b6.platformAnnual), "(spec: $12,000)");
console.log("   match:", b6.platformAnnual === 12_000 ? "✓" : "✗");
console.log("   vs Autodesk:", formatCurrency(b6.autodeskEquivalentYear1), "(spec: $81,250)");
console.log("   match:", b6.autodeskEquivalentYear1 === 81_250 ? "✓" : "✗");

console.log("\n[3] ENTERPRISE THRESHOLD — 10+ projects gets 20% off");
const b10 = calculatePricing({
  ...DEFAULT_CONFIGURATION,
  additionalVisits: 0,
  projects: 10,
  aiLevel: "none",
});
console.log("   10 proj × $1,600 =", formatCurrency(b10.platformAnnual), "(spec: $16,000)");
console.log("   enterpriseActive:", b10.enterpriseActive, "(spec: true)");
console.log("   per-project rate:", formatCurrency(b10.platformPerProjectApplied), "(spec: $1,600)");
const b9 = calculatePricing({
  ...DEFAULT_CONFIGURATION,
  additionalVisits: 0,
  projects: 9,
  aiLevel: "none",
});
console.log("   9 proj × $2,000 =", formatCurrency(b9.platformAnnual), "(non-enterprise: $18,000)");
console.log("   enterpriseActive at 9:", b9.enterpriseActive, "(spec: false)");

console.log("\n[4] AI_MODELS — token costs vs PROPOSAL-v4.md §16");
const haiku = AI_MODELS.find((m) => m.id === "haiku")!;
const sonnet = AI_MODELS.find((m) => m.id === "sonnet")!;
const opus = AI_MODELS.find((m) => m.id === "opus")!;
console.log(`   Haiku:  in $${haiku.inputCostPer1M}, out $${haiku.outputCostPer1M}  (spec: $0.80, $4.00)`);
console.log(`   Sonnet: in $${sonnet.inputCostPer1M}, out $${sonnet.outputCostPer1M}  (spec: $3.00, $15.00)`);
console.log(`   Opus:   ${opus.name}  in $${opus.inputCostPer1M}, out $${opus.outputCostPer1M}  (spec: Claude Opus 4.6, $15.00, $75.00)`);

console.log("\n[5] formatCurrency helper");
console.log("   formatCurrency(81250):", formatCurrency(81250), "(spec: '$81,250')");
console.log("   formatCurrency(12500):", formatCurrency(12500));
console.log("   formatCurrency(0):    ", formatCurrency(0));

console.log("\n[6] PLATFORMS array");
console.log("   count:", PLATFORMS.length, "(spec: 12+)");
console.log("   VIA-HABITA cost50Users:", formatCurrency(VIA_HABITA.cost50Users), "(spec: $12,000)");
console.log("   VIA-HABITA highlight:  ", VIA_HABITA.highlight, "(spec: true)");
console.log("   Autodesk cost50Users:  ", formatCurrency(AUTODESK_BUILD.cost50Users), "(spec: $81,250)");

console.log("\n[7] KNOWLEDGE GRAPH config");
const bKG = calculatePricing({ ...DEFAULT_CONFIGURATION, knowledgeGraph: true });
console.log("   KG setup year 1:", formatCurrency(bKG.knowledgeGraphSetup), "(spec: $5,000)");
console.log("   KG renewal:     ", formatCurrency(bKG.knowledgeGraphAnnualRenewal), "(spec: $2,500)");

console.log("\n[8] HOSTING + GPU");
const bSH = calculatePricing({ ...DEFAULT_CONFIGURATION, hosting: "selfhosted" });
console.log("   self-hosted setup:", formatCurrency(bSH.hostingSetup), "(spec: $3,000)");
const bGPU = calculatePricing({ ...DEFAULT_CONFIGURATION, gpu: "profesional" });
console.log("   GPU profesional:  ", formatCurrency(bGPU.gpuHardware), "(spec: $35,000)");
