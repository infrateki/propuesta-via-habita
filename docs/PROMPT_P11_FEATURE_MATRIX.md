# P11 — Feature Matrix Prompt for Claude Code Terminal

## PASTE THIS INTO YOUR T4 TERMINAL:

```
Read COMMS.md and CLAUDE.md first. You are T4 — Content owner.

## Task: Build the 156-feature comparison matrix for /comparativo

### Context
The orchestrator pushed a reference file at docs/FEATURE_MATRIX_156.md containing
the complete 156-feature CDE comparison matrix with scores for 6 platforms.
You need to:

1. EXPAND data/features.ts (T2 owns this — coordinate via COMMS.md) to include
   all 156 features from docs/FEATURE_MATRIX_156.md, organized by the 10 categories
   listed there. Add WAYKI as a 7th platform with estimated scores:
   - WAYKI is strong in: RFIs (4), field photos (4), plan viewing (4), Spanish (5), per-project pricing (5)
   - WAYKI is medium in: doc management (3), version control (3), PDF annotations (3-4)
   - WAYKI is weak in: BIM/IFC (2), ISO 19650 (1), AI (1), meetings (1), BCF (1), API (2)
   - Use 2 as default for any unknown WAYKI score

2. BUILD components/comparison/FeatureMatrix.tsx — an interactive feature comparison
   matrix component with:
   - Accordion sections for each of the 10 categories (collapsed by default)
   - Each category shows: category name, weight %, platform column headers
   - Each feature row shows: feature name + support icons per platform
   - Support level icons: ✔ green (5-4), ◐ yellow (3), ✗ red (2-1), 🔜 blue (roadmap)
   - VIA-HABITA column highlighted with left blue border
   - Summary bar at top showing weighted score per platform (use getWeightedScore)
   - Category averages shown in the accordion header
   - "Diferenciador" badge on features where VIA-HABITA scores 5 and best competitor ≤ 3
   - Mobile: horizontal scroll on table, sticky first column (feature name)

3. UPDATE app/comparativo/page.tsx — add tab navigation:
   - Tab 1: "Precios" — existing ComparisonTable + CostChart content
   - Tab 2: "Funcionalidades" — new FeatureMatrix component
   - Tabs should be clean, minimal, Apple-style underline active indicator
   - URL should update: /comparativo?tab=precios or /comparativo?tab=funcionalidades
   - Default tab: "precios"

### Design constraints
- Dark theme matching the rest of the site
- Use framer-motion for accordion expand/collapse
- Use lucide-react icons (Check, X, Clock, Minus for support levels)
- Category weights should be subtle (small text, not dominant)
- Platform headers should be sticky on scroll
- Mobile first — table must be usable at 375px with horizontal scroll
- All text in Spanish
- DO NOT modify any other pages or components — only the 3 files listed above

### Data structure guidance
The existing data/features.ts has TypeScript interfaces already defined.
Expand the FEATURES array to include all 156 items. Keep the existing
interfaces (Feature, Platform, CategoryInfo) but update CATEGORIES to
match the 10 categories from the reference doc. Add WAYKI to PLATFORMS array.

### After you're done
1. Run npx tsc --noEmit — must pass
2. Run npm run build — must pass
3. Update COMMS.md: mark P11 and P12 as ✅ DONE with timestamp
4. Note any import issues or type conflicts in COMMS.md BLOCKERS section
```

---

## ALTERNATIVE: If you want to split this into 2 terminals

### Terminal A (data layer — 5 min):
```
Read COMMS.md. You are working on behalf of T2 (data layer).
Read docs/FEATURE_MATRIX_156.md. Rewrite data/features.ts to include ALL 156 features
from that reference document, organized into 10 categories. Add WAYKI as the 7th platform
with scores estimated as: strong in RFIs/field/plans/Spanish/pricing (4-5), medium in
docs/versions/annotations (3), weak in BIM/ISO/AI/meetings/BCF/API (1-2). Default unknown=2.
Keep existing TypeScript interfaces. Run npx tsc --noEmit when done.
Update COMMS.md with completion status.
```

### Terminal B (UI — runs after A finishes):
```
Read COMMS.md. You are T4 (content owner).
data/features.ts now has 156 features and 7 platforms.
Build components/comparison/FeatureMatrix.tsx as an accordion-based feature matrix.
Add tab navigation to app/comparativo/page.tsx: "Precios" (existing) + "Funcionalidades" (new).
See P11 detailed spec in COMMS.md. Dark theme, framer-motion accordions, mobile-first.
Run npm run build when done. Update COMMS.md.
```
