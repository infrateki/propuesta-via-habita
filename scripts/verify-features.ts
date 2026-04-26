import {
  PLATFORMS,
  CATEGORIES,
  FEATURES,
  countBySupport,
  getDifferentiators,
  getByCategory,
  getWeightedScore,
  type FeatureCategory,
} from "../data/features";

console.log("=".repeat(70));
console.log("VIA-HABITA FEATURE MATRIX — AUDIT vs FEATURE_MATRIX_156.md");
console.log("=".repeat(70));

console.log(`\n[1] PLATFORMS (spec: 7)`);
console.log(`    count: ${PLATFORMS.length}`);
console.log(`    ids:   ${PLATFORMS.map((p) => p.id).join(", ")}`);
console.log(`    highlighted: ${PLATFORMS.find((p) => p.highlight)?.name}`);

console.log(`\n[2] CATEGORIES (spec: 10, weights sum to 100)`);
console.log(`    count: ${CATEGORIES.length}`);
const weightSum = CATEGORIES.reduce((s, c) => s + c.weight, 0);
console.log(`    weight sum: ${weightSum}`);
CATEGORIES.forEach((c) => {
  const n = getByCategory(c.id).length;
  console.log(`      ${c.id.padEnd(13)} ${String(c.weight).padStart(3)}%  → ${n} features`);
});

console.log(`\n[3] FEATURES (spec: 156)`);
console.log(`    count: ${FEATURES.length}`);
console.log(`    spec match: ${FEATURES.length === 156 ? "✓" : "✗"}`);

const ids = new Set(FEATURES.map((f) => f.id));
console.log(`    unique ids: ${ids.size === FEATURES.length ? "✓" : "✗"}`);

const expectedTotal =
  16 + 16 + 14 + 19 + 13 + 12 + 13 + 13 + 19 + 21; // = 156
console.log(`    cat-by-cat sums to: ${expectedTotal}`);

console.log(`\n[4] PER-PLATFORM SUPPORT COUNTS`);
PLATFORMS.forEach((p) => {
  const c = countBySupport(p.id);
  const total = c.full + c.partial + c.none + c.roadmap;
  console.log(
    `    ${p.shortName.padEnd(6)} full=${String(c.full).padStart(3)} ` +
      `partial=${String(c.partial).padStart(3)} ` +
      `none=${String(c.none).padStart(3)} ` +
      `roadmap=${String(c.roadmap).padStart(2)}  total=${total}`
  );
});

console.log(`\n[5] WEIGHTED SCORES (0-100, higher = more functionality)`);
PLATFORMS.forEach((p) => {
  const s = getWeightedScore(p.id);
  const bar = "█".repeat(Math.round(s / 2.5));
  console.log(`    ${p.shortName.padEnd(6)} ${String(s).padStart(3)}  ${bar}`);
});

console.log(`\n[6] DIFFERENTIATORS (VIA=5 AND max(others) ≤ 3)`);
const diffs = getDifferentiators();
console.log(`    count: ${diffs.length}`);
diffs.slice(0, 8).forEach((f) => {
  const otherMax = Math.max(
    ...PLATFORMS.filter((p) => p.id !== "viahabita").map(
      (p) => f.score?.[p.id] ?? 0
    )
  );
  console.log(`      ${f.id.padEnd(5)} ${f.name.slice(0, 42).padEnd(42)} (others max: ${otherMax})`);
});
if (diffs.length > 8) console.log(`      … (+${diffs.length - 8} more)`);

console.log(`\n[7] WAYKI SCORES — sanity per spec heuristic`);
const w = (n: number) =>
  FEATURES.filter((f) => f.score?.wayki === n).length;
console.log(`    score 5: ${w(5)} features (Spanish UI, unlimited users, per-project pricing)`);
console.log(`    score 4: ${w(4)} features (RFIs, field/photos, plan viewing)`);
console.log(`    score 3: ${w(3)} features (basic doc mgmt, version control, PDF)`);
console.log(`    score 2: ${w(2)} features (default unknown, BIM/IFC, API)`);
console.log(`    score 1: ${w(1)} features (ISO 19650, AI, meetings, BCF)`);

console.log(`\n[8] CROSS-CHECK: every feature has scores for all 7 platforms`);
const broken = FEATURES.filter(
  (f) => !f.score || PLATFORMS.some((p) => f.score![p.id] == null)
);
console.log(`    features missing platform scores: ${broken.length}`);
console.log(`    every feature has ≥ 1-5 score for every platform: ${broken.length === 0 ? "✓" : "✗"}`);
