/**
 * Comparativo de plataformas BIM/CDE — investigación 2026.
 * Costos en USD anuales. Benchmark: 50 usuarios, 6 proyectos.
 * Sorted ascending por cost50Users (sin nulls). VIA-HABITA con highlight.
 */

export type PricingModel =
  | "per-user"
  | "per-project"
  | "volume"
  | "hybrid"
  | "custom";

export interface PlatformFeatures {
  viewer2D: boolean;
  viewer3D: boolean;
  rfis: boolean;
  submittals: boolean;
  gantt: boolean;
  ai: boolean;
  spanishUI: boolean;
  codeOwnership: boolean;
  ifc: boolean;
  clashDetection: boolean;
}

export interface Platform {
  id: string;
  name: string;
  vendor?: string;
  pricingModel: PricingModel;
  pricePerUser?: number;            // USD/año por usuario, si aplica
  cost1User: number | null;         // null = no comercializado en ese tier
  cost5Users: number | null;
  cost50Users: number;              // referencia principal de comparación (50 usuarios)
  unlimitedUsers: boolean;
  externalsFree: boolean;           // colaboradores externos sin costo
  features: PlatformFeatures;
  sourceUrl: string;
  notes: string;                    // contexto chileno / observaciones
  highlight?: boolean;              // VIA-HABITA = true
}

const F = (f: Partial<PlatformFeatures>): PlatformFeatures => ({
  viewer2D: false,
  viewer3D: false,
  rfis: false,
  submittals: false,
  gantt: false,
  ai: false,
  spanishUI: false,
  codeOwnership: false,
  ifc: false,
  clashDetection: false,
  ...f,
});

export const PLATFORMS: Platform[] = [
  // -------------------------------------------------------------------------
  {
    id: "bimcollab",
    name: "BIMcollab",
    vendor: "Kubus",
    pricingModel: "per-user",
    pricePerUser: 450,
    cost1User: 450,
    cost5Users: 4_500,    // mínimo 10 licencias en Pro
    cost50Users: 4_500,   // viewer gratuito permite escalar sin costo
    unlimitedUsers: false,
    externalsFree: true,
    features: F({
      viewer2D: true,
      viewer3D: true,
      ifc: true,
      clashDetection: true,
      rfis: true,
    }),
    sourceUrl: "https://www.bimcollab.com/en/pricing",
    notes:
      "Visor gratuito + licencias Pro mínimo 10. Excelente para clash detection (BCF). Sin Gantt ni submittals nativos.",
  },
  {
    id: "catenda",
    name: "Catenda Hub",
    vendor: "Catenda",
    pricingModel: "per-project",
    cost1User: null,
    cost5Users: 5_000,
    cost50Users: 7_500,
    unlimitedUsers: true,
    externalsFree: true,
    features: F({
      viewer2D: true,
      viewer3D: true,
      ifc: true,
      clashDetection: true,
      rfis: true,
    }),
    sourceUrl: "https://catenda.com/pricing",
    notes:
      "Modelo por proyecto con usuarios ilimitados. Open standards (openCDE). Buen ratio costo/valor para 50+ usuarios.",
  },
  {
    id: "trimble-connect",
    name: "Trimble Connect",
    vendor: "Trimble",
    pricingModel: "per-user",
    pricePerUser: 156,
    cost1User: 156,
    cost5Users: 780,
    cost50Users: 7_800,
    unlimitedUsers: false,
    externalsFree: false,
    features: F({
      viewer2D: true,
      viewer3D: true,
      ifc: true,
      rfis: true,
    }),
    sourceUrl: "https://connect.trimble.com/pricing",
    notes:
      "Bajo costo por usuario pero el costo escala linealmente. Sin agente IA, UI parcial en español.",
  },

  // -------------------------- VIA-HABITA --------------------------
  {
    id: "via-habita",
    name: "VIA-HABITA",
    vendor: "INFRATEK × HABITA",
    pricingModel: "per-project",
    cost1User: 2_000,    // 1 proyecto, usuarios ilimitados
    cost5Users: 12_000,  // 6 proyectos benchmark
    cost50Users: 12_000, // mismos 6 proyectos × $2,000 — usuarios ilimitados
    unlimitedUsers: true,
    externalsFree: true,
    features: F({
      viewer2D: true,
      viewer3D: true,
      rfis: true,
      submittals: true,
      gantt: true,
      ai: true,
      spanishUI: true,
      codeOwnership: true,
      ifc: true,
      clashDetection: true,
    }),
    sourceUrl: "/propuesta",
    notes:
      "Plataforma propia — sin vendor lock-in. Usuarios y externos ilimitados. UI 100% en español. Agente IA integrado. Código fuente entregado al cliente.",
    highlight: true,
  },
  // ----------------------------------------------------------------

  {
    id: "procore",
    name: "Procore",
    vendor: "Procore Technologies",
    pricingModel: "volume",
    cost1User: null,
    cost5Users: 15_000,
    cost50Users: 20_000,
    unlimitedUsers: true,
    externalsFree: true,
    features: F({
      viewer2D: true,
      viewer3D: true,
      rfis: true,
      submittals: true,
      gantt: true,
    }),
    sourceUrl: "https://www.procore.com/pricing",
    notes:
      "Volumen anual de construcción (ACV). Usuarios ilimitados. Implementación cara y onboarding largo. Sin precio público.",
  },
  {
    id: "newforma-konekt",
    name: "Newforma Konekt",
    vendor: "Newforma",
    pricingModel: "per-user",
    pricePerUser: 600,
    cost1User: 600,
    cost5Users: 3_000,
    cost50Users: 30_000,
    unlimitedUsers: false,
    externalsFree: false,
    features: F({
      viewer2D: true,
      viewer3D: true,
      ifc: true,
      rfis: true,
      submittals: true,
    }),
    sourceUrl: "https://www.newforma.com/konekt/",
    notes: "Foco en gestión documental y RFIs. Costo escala con el equipo.",
  },
  {
    id: "plangrid-notion",
    name: "PlanGrid + Notion",
    vendor: "Stack actual de Habita",
    pricingModel: "hybrid",
    cost1User: 540,
    cost5Users: 2_700,
    cost50Users: 29_400,
    unlimitedUsers: false,
    externalsFree: false,
    features: F({
      viewer2D: true,
      rfis: true,
    }),
    sourceUrl: "https://construction.autodesk.com/products/autodesk-build/",
    notes:
      "Stack actual. Usuarios limitados, sin 3D federado, sin clash detection ni IA. Punto de comparación interna.",
  },
  {
    id: "dalux",
    name: "Dalux",
    vendor: "Dalux",
    pricingModel: "hybrid",
    cost1User: null,
    cost5Users: 25_000,
    cost50Users: 40_000,
    unlimitedUsers: false,
    externalsFree: true,
    features: F({
      viewer2D: true,
      viewer3D: true,
      ifc: true,
      rfis: true,
      submittals: true,
      clashDetection: true,
    }),
    sourceUrl: "https://www.dalux.com/pricing/",
    notes:
      "Híbrido por usuario + por proyecto. Externos gratis. Fuerte en field ops, UI en inglés.",
  },
  {
    id: "revizto",
    name: "Revizto",
    vendor: "Vectorworks/Revizto",
    pricingModel: "per-user",
    pricePerUser: 1_000,
    cost1User: 1_000,
    cost5Users: 5_000,
    cost50Users: 50_000,
    unlimitedUsers: false,
    externalsFree: false,
    features: F({
      viewer3D: true,
      ifc: true,
      clashDetection: true,
      rfis: true,
    }),
    sourceUrl: "https://revizto.com/en/pricing/",
    notes: "Slot-based licensing. Excelente coordinación 3D, costoso a escala.",
  },
  {
    id: "fieldwire",
    name: "Fieldwire (Hilti)",
    vendor: "Hilti",
    pricingModel: "per-user",
    pricePerUser: 468,
    cost1User: 468,
    cost5Users: 2_340,
    cost50Users: 23_400,
    unlimitedUsers: false,
    externalsFree: false,
    features: F({
      viewer2D: true,
      rfis: true,
      gantt: true,
    }),
    sourceUrl: "https://www.fieldwire.com/pricing/",
    notes:
      "Foco en field execution y task management. Limitado en BIM 3D y clash detection.",
  },
  {
    id: "autodesk-build",
    name: "Autodesk Forma Build",
    vendor: "Autodesk",
    pricingModel: "per-user",
    pricePerUser: 1_400,
    cost1User: 1_400,
    cost5Users: 7_000,
    cost50Users: 70_000,
    unlimitedUsers: false,
    externalsFree: false,
    features: F({
      viewer2D: true,
      viewer3D: true,
      ifc: true,
      clashDetection: true,
      rfis: true,
      submittals: true,
      gantt: true,
    }),
    sourceUrl: "https://www.autodesk.com/products/forma-build/buy",
    notes:
      "Ex-PlanGrid, ex-BIM 360, ex-ACC. Requiere licencias separadas de Revit/AutoCAD para diseño. Costo per-seat lineal — penaliza equipos grandes y externos.",
  },
  {
    id: "oracle-aconex",
    name: "Oracle Aconex",
    vendor: "Oracle",
    pricingModel: "custom",
    cost1User: null,
    cost5Users: 50_000,
    cost50Users: 100_000,
    unlimitedUsers: true,
    externalsFree: true,
    features: F({
      viewer2D: true,
      viewer3D: true,
      ifc: true,
      rfis: true,
      submittals: true,
    }),
    sourceUrl: "https://www.oracle.com/industries/construction-engineering/aconex/",
    notes:
      "Enterprise puro — usuarios ilimitados en tier Unlimited. Implementación cara y proceso de venta largo. Soberanía de datos compleja.",
  },
];

// ============================================================================
// Sorted ascending by cost50Users — display order in /comparativo
// ============================================================================
export const PLATFORMS_SORTED: Platform[] = [...PLATFORMS].sort(
  (a, b) => a.cost50Users - b.cost50Users
);

// ============================================================================
// Quick lookups
// ============================================================================
export const VIA_HABITA = PLATFORMS.find((p) => p.id === "via-habita")!;
export const AUTODESK_BUILD = PLATFORMS.find((p) => p.id === "autodesk-build")!;
