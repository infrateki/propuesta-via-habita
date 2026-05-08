/**
 * data/autodesk-costs.ts
 * Catálogo de productos Autodesk AEC. Precios públicos USD/año.
 * Fuente: autodesk.com/products (abril 2026).
 *
 * Usado por la pestaña "Costos Autodesk" en /comparativo para mostrar
 * el costo real de armar el stack completo de Autodesk vs VIA-HABITA.
 */

export type AutodeskCategory =
  | "design"          // herramientas de diseño (Revit, AutoCAD, Civil 3D)
  | "construction"    // construction management (Forma Build, etc.)
  | "bundle"          // colecciones combinadas
  | "visualization";  // 3ds Max, etc.

export interface AutodeskProduct {
  id: string;
  name: string;
  category: AutodeskCategory;
  /** USD/año. null = "Contact sales" (no precio público). */
  pricePerYear: number | null;
  /** USD/mes. null = no listado o solo facturación anual. */
  pricePerMonth: number | null;
  /** Unidad de cobro: "user" o "project". */
  unit: "user" | "project" | "enterprise";
  description: string;
  /** ¿Es relevante para el escenario operacional de Habita? */
  relevantToHabita: boolean;
  /** Por qué Habita lo necesita o no (texto en español, conciso). */
  habitaNote: string;
}

export const AUTODESK_PRODUCTS: AutodeskProduct[] = [
  // -------- Design (per user) --------
  {
    id: "autocad",
    name: "AutoCAD",
    category: "design",
    pricePerYear: 2_095,
    pricePerMonth: null,
    unit: "user",
    description: "CAD 2D/3D estándar para dibujo técnico y documentación.",
    relevantToHabita: false,
    habitaNote:
      "Los proyectistas externos ya tienen sus propias licencias. Habita no necesita comprar.",
  },
  {
    id: "autocad-lt",
    name: "AutoCAD LT",
    category: "design",
    pricePerYear: 540,
    pricePerMonth: null,
    unit: "user",
    description: "Versión 2D-only de AutoCAD, más económica que la full.",
    relevantToHabita: false,
    habitaNote: "Misma lógica: lo manejan los proyectistas externos.",
  },
  {
    id: "revit",
    name: "Revit",
    category: "design",
    pricePerYear: 3_005,
    pricePerMonth: null,
    unit: "user",
    description: "Modelado BIM paramétrico, estándar de mercado en arquitectura y estructura.",
    relevantToHabita: false,
    habitaNote:
      "Los proyectistas externos ya operan en Revit con sus propias licencias. Habita coordina, no modela.",
  },
  {
    id: "revit-lt",
    name: "Revit LT",
    category: "design",
    pricePerYear: 560,
    pricePerMonth: null,
    unit: "user",
    description: "Versión reducida de Revit: modelado básico, sin colaboración worksharing.",
    relevantToHabita: false,
    habitaNote: "No aplica al rol de coordinación de Habita.",
  },
  {
    id: "civil-3d",
    name: "Civil 3D",
    category: "design",
    pricePerYear: 2_870,
    pricePerMonth: null,
    unit: "user",
    description: "Diseño civil: terrenos, obras viales, redes sanitarias.",
    relevantToHabita: false,
    habitaNote: "Especialidad civil; lo maneja la consultora correspondiente.",
  },
  {
    id: "navisworks-simulate",
    name: "Navisworks Simulate",
    category: "design",
    pricePerYear: 1_145,
    pricePerMonth: null,
    unit: "user",
    description: "Coordinación BIM, clash detection y simulación 4D.",
    relevantToHabita: true,
    habitaNote:
      "Útil para el equipo BIM interno (Marcela + 1) que coordina los modelos federados.",
  },
  {
    id: "3ds-max",
    name: "3ds Max",
    category: "visualization",
    pricePerYear: 2_010,
    pricePerMonth: null,
    unit: "user",
    description: "Modelado y render de alta calidad para visualización de marketing.",
    relevantToHabita: false,
    habitaNote: "Render de marketing, fuera del scope operacional del proyecto.",
  },

  // -------- Bundles --------
  {
    id: "aec-collection",
    name: "AEC Collection",
    category: "bundle",
    pricePerYear: 3_675,
    pricePerMonth: null,
    unit: "user",
    description:
      "Bundle: Revit + AutoCAD + Civil 3D + Forma Site Design + Navisworks + más. Estándar para equipos de diseño.",
    relevantToHabita: false,
    habitaNote:
      "Si Habita armara su propio equipo de diseño interno, este sería el bundle. Hoy se externaliza.",
  },

  // -------- Construction management (per user) --------
  {
    id: "forma-build-essentials",
    name: "Forma Build Essentials",
    category: "construction",
    pricePerYear: 804,
    pricePerMonth: 67,
    unit: "user",
    description: "Tier básico: solo herramientas de campo (planos, fotos, RFIs simples).",
    relevantToHabita: false,
    habitaNote:
      "Tier limitado; no cubre el flujo de coordinación + submittals que Habita necesita.",
  },
  {
    id: "forma-build-per-user",
    name: "Forma Build Per User",
    category: "construction",
    pricePerYear: 1_400,
    pricePerMonth: 117,
    unit: "user",
    description:
      "Tier completo: RFIs, submittals, modelos federados, clash, gestión documental. Sucesor directo de PlanGrid + BIM 360 + ACC.",
    relevantToHabita: true,
    habitaNote:
      "Este es el tier real de comparación. 50 stakeholders × $1,400 = $70,000/año. VIA-HABITA reemplaza esto a $12,000/año con usuarios ilimitados.",
  },
  {
    id: "forma-build-enterprise",
    name: "Forma Build Enterprise",
    category: "construction",
    pricePerYear: null,
    pricePerMonth: null,
    unit: "enterprise",
    description: "Usuarios ilimitados a nivel enterprise; pricing solo bajo cotización.",
    relevantToHabita: false,
    habitaNote:
      "Sin precio público; proceso de venta largo. Habita es demasiado pequeña para conseguir condiciones razonables.",
  },
];

// ============================================================================
// Escenario Habita: costo real de migrar a Autodesk full stack
// ============================================================================

export interface ScenarioLine {
  id: string;
  label: string;
  detail: string;
  productId: string;
  unitPrice: number;
  quantity: number;
  /** Total = unitPrice * quantity. */
  total: number;
}

const productPrice = (id: string): number => {
  const p = AUTODESK_PRODUCTS.find((x) => x.id === id);
  if (!p || p.pricePerYear === null) return 0;
  return p.pricePerYear;
};

export const HABITA_AUTODESK_SCENARIO: ScenarioLine[] = [
  {
    id: "design-team",
    label: "Equipo de diseño (5 personas)",
    detail:
      "AEC Collection × 5: escenario hipotético si Habita armara equipo de diseño interno (hoy se externaliza a proyectistas externos).",
    productId: "aec-collection",
    unitPrice: productPrice("aec-collection"),
    quantity: 5,
    total: productPrice("aec-collection") * 5,
  },
  {
    id: "bim-coordination",
    label: "Coordinación BIM (2 personas)",
    detail: "Navisworks Simulate × 2 para Marcela + apoyo en la coordinación de modelos federados.",
    productId: "navisworks-simulate",
    unitPrice: productPrice("navisworks-simulate"),
    quantity: 2,
    total: productPrice("navisworks-simulate") * 2,
  },
  {
    id: "construction-management",
    label: "Gestión de construcción (50 stakeholders)",
    detail:
      "Forma Build Per User × 50: el reemplazo directo de PlanGrid + BIM 360 + ACC para todo el equipo extendido (interno + obra + consultores).",
    productId: "forma-build-per-user",
    unitPrice: productPrice("forma-build-per-user"),
    quantity: 50,
    total: productPrice("forma-build-per-user") * 50,
  },
];

export const HABITA_AUTODESK_TOTAL = HABITA_AUTODESK_SCENARIO.reduce(
  (sum, line) => sum + line.total,
  0,
);

/** VIA-HABITA: 6 proyectos × $2.000 (consultores externos siguen con sus propias licencias Revit/AutoCAD). */
export const VIA_HABITA_TOTAL = 12_000;

export const HABITA_SAVINGS = HABITA_AUTODESK_TOTAL - VIA_HABITA_TOTAL;

export const HABITA_RATIO =
  VIA_HABITA_TOTAL > 0
    ? Math.round((HABITA_AUTODESK_TOTAL / VIA_HABITA_TOTAL) * 10) / 10
    : 0;

// ============================================================================
// Lookups por categoría
// ============================================================================
export const PRODUCTS_BY_CATEGORY: Record<AutodeskCategory, AutodeskProduct[]> = {
  design: AUTODESK_PRODUCTS.filter((p) => p.category === "design"),
  construction: AUTODESK_PRODUCTS.filter((p) => p.category === "construction"),
  bundle: AUTODESK_PRODUCTS.filter((p) => p.category === "bundle"),
  visualization: AUTODESK_PRODUCTS.filter((p) => p.category === "visualization"),
};

export const CATEGORY_LABELS: Record<AutodeskCategory, string> = {
  design: "Diseño",
  construction: "Gestión de construcción",
  bundle: "Bundles",
  visualization: "Visualización",
};
