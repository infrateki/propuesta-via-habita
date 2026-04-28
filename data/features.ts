/**
 * VIA-HABITA — Feature comparison matrix.
 * 156 features × 7 platforms × 10 categories.
 *
 * Source of truth: docs/FEATURE_MATRIX_156.md (DO NOT MODIFY).
 * Each feature has a 1-5 numeric score per platform. The discrete
 * `support` level (full / partial / none / roadmap) is derived from
 * that score for backward compatibility with the existing UI:
 *
 *   5  → "full"
 *   4  → "full"
 *   3  → "partial"
 *   2  → "partial"
 *   1  → "none"
 *
 * `differentiator` is computed: VIA-HABITA = 5 AND max(others) ≤ 3.
 *
 * Platforms (7):
 *   viahabita · autodesk · trimble · procore · dalux · catenda · wayki
 * Note: VIA-HABITA keeps the id "viahabita" for compatibility with
 * components/comparison/FeatureMatrix.tsx (T4 hardcodes it).
 */

// ============================================================================
// Types — preserved from prior version
// ============================================================================

export type FeatureSupport = "full" | "partial" | "none" | "roadmap";

export type FeatureCategory =
  | "cde"
  | "viewers"
  | "annotation"
  | "coordination"
  | "rfis"
  | "meetings"
  | "field"
  | "forms"
  | "ai"
  | "platform";

export interface Platform {
  id: string;
  name: string;
  shortName: string;
  color: string;
  highlight?: boolean;
  pricingNote: string;
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  category: FeatureCategory;
  support: Record<string, FeatureSupport>;
  /** Numeric score 1-5 per platform (additive, optional). */
  score?: Record<string, number>;
  /** Which BIMcollab tier (legacy field, no longer populated). */
  bimcollabTier?: "basic" | "advanced" | "enterprise";
  /** VIA-HABITA = 5 AND max(others) ≤ 3 — auto-computed by feat(). */
  differentiator?: boolean;
}

export interface CategoryInfo {
  id: FeatureCategory;
  label: string;
  description: string;
  weight: number;
}

// ============================================================================
// Platforms — 7 entries
// ============================================================================

export const PLATFORMS: Platform[] = [
  {
    id: "viahabita",
    name: "VIA-HABITA",
    shortName: "VIA",
    color: "#4FB3FF",
    highlight: true,
    pricingNote: "$2,000/proyecto/año · usuarios ilimitados",
  },
  {
    id: "autodesk",
    name: "Autodesk Forma Build",
    shortName: "ADSK",
    color: "#6B7280",
    pricingNote: "$1,400/usuario/año · ex-PlanGrid, ex-BIM 360, ex-ACC",
  },
  {
    id: "trimble",
    name: "Trimble Connect",
    shortName: "TRIM",
    color: "#6B7280",
    pricingNote: "$156/usuario/año · escala lineal",
  },
  {
    id: "procore",
    name: "Procore",
    shortName: "PROC",
    color: "#6B7280",
    pricingNote: "Por volumen anual de obra · usuarios ilimitados",
  },
  {
    id: "dalux",
    name: "Dalux",
    shortName: "DALX",
    color: "#6B7280",
    pricingNote: "Híbrido — $25–$60K/año · externos incluidos",
  },
  {
    id: "catenda",
    name: "Catenda Hub",
    shortName: "CATD",
    color: "#6B7280",
    pricingNote: "Por proyecto · usuarios ilimitados · ex-Bimsync",
  },
  {
    id: "wayki",
    name: "WAYKI",
    shortName: "WAYKI",
    color: "#6B7280",
    pricingNote: "Por proyecto · enfoque LATAM · precio bajo demanda",
  },
];

// Order matches the score tuple positions used by feat() below.
const PLATFORM_ORDER = [
  "viahabita",
  "autodesk",
  "trimble",
  "procore",
  "dalux",
  "catenda",
  "wayki",
] as const;

// ============================================================================
// Categories — 10 entries, weights sum to 100
// ============================================================================

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "cde",
    label: "CDE y Gestión Documental",
    description: "Espacios ISO 19650, permisos, transmittals, versionamiento, audit log",
    weight: 15,
  },
  {
    id: "viewers",
    label: "Visualizadores de Archivos",
    description: "IFC 3D, CAD, PDF, imágenes, modelos federados, comparación de versiones",
    weight: 15,
  },
  {
    id: "annotation",
    label: "Anotación y Marcado",
    description: "Mediciones calibradas, marcas, polilíneas, undo/redo, gestión de marcas",
    weight: 10,
  },
  {
    id: "coordination",
    label: "Coordinación e Incidencias",
    description: "Pins 2D/3D, kanban, calendar, BCF, vinculación bidireccional doc↔issue",
    weight: 15,
  },
  {
    id: "rfis",
    label: "RFIs y Documentos de Obra",
    description: "Dashboard RFIs, cambios, submittals, daily logs, punch lists, correspondencia",
    weight: 10,
  },
  {
    id: "meetings",
    label: "Reuniones y Colaboración",
    description: "Reuniones ICE, videoconferencia, acuerdos en vivo, minutas IA, vínculo a issues",
    weight: 10,
  },
  {
    id: "field",
    label: "Terreno y Gestión de Obra",
    description: "Fotos 360°, captura móvil, inspecciones, offline sync, hotspots, asset tracking",
    weight: 8,
  },
  {
    id: "forms",
    label: "Formularios y Reportes",
    description: "Form builder, dashboards, widgets, exportación CSV/Excel, notificaciones",
    weight: 5,
  },
  {
    id: "ai",
    label: "Inteligencia Artificial",
    description: "Asistente conversacional, análisis de fotos, agentes autónomos, clasificación",
    weight: 7,
  },
  {
    id: "platform",
    label: "Plataforma e Integraciones",
    description: "API, plugins Revit/AutoCAD, SSO, móvil, idioma, ERP, precio, módulos verticales",
    weight: 5,
  },
];

// ============================================================================
// Score → discrete support mapping
// ============================================================================

function scoreToSupport(n: number): FeatureSupport {
  if (n >= 4) return "full";
  if (n >= 2) return "partial";
  return "none";
}

/**
 * Build a Feature from a raw score tuple.
 * Tuple order matches PLATFORM_ORDER:
 *   [viahabita, autodesk, trimble, procore, dalux, catenda, wayki]
 */
type ScoreTuple = readonly [number, number, number, number, number, number, number];

function feat(
  id: number,
  category: FeatureCategory,
  name: string,
  scores: ScoreTuple,
  description?: string
): Feature {
  const support: Record<string, FeatureSupport> = {};
  const score: Record<string, number> = {};
  PLATFORM_ORDER.forEach((pid, i) => {
    score[pid] = scores[i];
    support[pid] = scoreToSupport(scores[i]);
  });
  const [custom, ...others] = scores;
  return {
    id: `f${id}`,
    name,
    description: description ?? name,
    category,
    support,
    score,
    differentiator: custom === 5 && Math.max(...others) <= 3,
  };
}

// ============================================================================
// FEATURES — 156 entries, scores from FEATURE_MATRIX_156.md
// Tuple: [viahabita, autodesk, trimble, procore, dalux, catenda, wayki]
// ============================================================================

export const FEATURES: Feature[] = [
  // ----- Cat 1: CDE y Gestión Documental (15%) -----
  feat(1,  "cde", "Espacios ISO 19650 (WIP/SHARED/PUBLISHED/ARCHIVE)", [5, 4, 5, 3, 3, 5, 1]),
  feat(2,  "cde", "Espacios personalizables",                          [5, 3, 4, 3, 2, 4, 2]),
  feat(3,  "cde", "Permisos granulares CRUD",                          [5, 4, 4, 4, 3, 3, 2]),
  feat(4,  "cde", "Jerarquía de carpetas multi-nivel",                 [5, 5, 4, 5, 3, 4, 3]),
  feat(5,  "cde", "Flujos de revisión multi-paso",                     [5, 4, 4, 3, 2, 4, 2]),
  feat(6,  "cde", "Auto-trigger de revisión",                          [3, 5, 3, 3, 2, 3, 1]),
  feat(7,  "cde", "Transmittals formales",                             [4, 5, 5, 3, 2, 5, 2]),
  feat(8,  "cde", "Versionamiento con supersedencia",                  [4, 5, 5, 4, 3, 5, 3]),
  feat(9,  "cde", "Bridge entre proyectos",                            [2, 5, 3, 4, 2, 3, 2]),
  feat(10, "cde", "Naming enforcement automático",                     [3, 3, 5, 2, 2, 5, 2]),
  feat(11, "cde", "Audit log completo",                                [5, 5, 4, 5, 3, 4, 2]),
  feat(12, "cde", "Búsqueda full-text en documentos",                  [4, 5, 3, 4, 3, 3, 3]),
  feat(13, "cde", "Custom metadata por documento",                     [3, 5, 3, 3, 2, 3, 2]),
  feat(14, "cde", "Templates de proyecto",                             [3, 5, 3, 5, 2, 3, 2]),
  feat(15, "cde", "Handover/cierre de proyecto",                       [2, 5, 3, 4, 2, 3, 1]),
  feat(16, "cde", "Papelera y recuperación de archivos",               [4, 5, 4, 4, 3, 3, 3]),

  // ----- Cat 2: Visualizadores de Archivos (15%) -----
  feat(17, "viewers", "Visor IFC 3D WebGL",                            [5, 5, 4, 3, 4, 5, 2]),
  feat(18, "viewers", "Toolbar BIM con 9 herramientas",                [5, 4, 3, 2, 3, 4, 2]),
  feat(19, "viewers", "Modo Ghost / X-ray",                            [5, 4, 3, 2, 3, 4, 2]),
  feat(20, "viewers", "Secciones y planos de corte",                   [4, 5, 4, 2, 3, 4, 2]),
  feat(21, "viewers", "Colorear elementos por propiedad",              [5, 4, 3, 2, 3, 3, 2]),
  feat(22, "viewers", "Visor DXF / DWG CAD",                           [4, 5, 3, 3, 2, 2, 4]),
  feat(23, "viewers", "Visor PDF completo",                            [5, 5, 3, 4, 4, 3, 4]),
  feat(24, "viewers", "Visor de imágenes y 360°",                      [5, 5, 3, 4, 5, 2, 3]),
  feat(25, "viewers", "Visor Excel embebido",                          [3, 4, 2, 3, 2, 1, 1]),
  feat(26, "viewers", "Soporte 45+ tipos de archivo",                  [3, 5, 5, 4, 3, 2, 3]),
  feat(27, "viewers", "Modelos federados multi-disciplina",            [3, 5, 4, 2, 3, 5, 2]),
  feat(28, "viewers", "Comparación side-by-side",                      [5, 5, 4, 3, 3, 4, 2]),
  feat(29, "viewers", "Overlay entre versiones",                       [5, 4, 3, 2, 2, 3, 2]),
  feat(30, "viewers", "Visor 3D en móvil",                             [2, 5, 4, 3, 4, 3, 2]),
  feat(31, "viewers", "Compass de orientación",                        [5, 5, 4, 2, 3, 4, 2]),
  feat(32, "viewers", "Soporte IFC2x3 + IFC4",                         [5, 5, 5, 2, 4, 5, 2]),

  // ----- Cat 3: Anotación y Marcado (10%) -----
  feat(33, "annotation", "Toolbar de anotación con 11+ herramientas",  [5, 5, 3, 4, 4, 3, 3]),
  feat(34, "annotation", "Medición lineal calibrada",                  [5, 5, 4, 3, 4, 3, 4]),
  feat(35, "annotation", "Medición de área por polígono",              [5, 5, 3, 3, 4, 3, 3]),
  feat(36, "annotation", "Polilínea / área freeform en móvil",         [3, 5, 3, 3, 4, 2, 3]),
  feat(37, "annotation", "Calibración por dos puntos",                 [5, 4, 3, 3, 3, 2, 3]),
  feat(38, "annotation", "Calibración por escala predefinida",         [5, 4, 3, 3, 3, 2, 3]),
  feat(39, "annotation", "Indicador de calibración activa",            [5, 3, 2, 2, 3, 1, 2]),
  feat(40, "annotation", "Panel de gestión de marcas",                 [5, 5, 3, 4, 4, 3, 3]),
  feat(41, "annotation", "7+ tipos de marca configurables",            [5, 5, 3, 4, 4, 3, 3]),
  feat(42, "annotation", "Soporte Apple Pencil / stylus",              [2, 5, 2, 3, 4, 1, 3]),
  feat(43, "annotation", "Markup stamps",                              [1, 5, 2, 3, 3, 1, 2]),
  feat(44, "annotation", "Quick references en marcas",                 [4, 5, 2, 3, 3, 2, 2]),
  feat(45, "annotation", "Undo / Redo de marcas",                      [5, 5, 3, 4, 4, 3, 3]),
  feat(46, "annotation", "Color picker hex + RGB",                     [5, 4, 3, 3, 3, 2, 3]),

  // ----- Cat 4: Coordinación e Incidencias (15%) -----
  feat(47, "coordination", "Lista de incidencias filtrable",           [5, 5, 4, 5, 4, 3, 4]),
  feat(48, "coordination", "Vista Kanban",                             [5, 3, 2, 4, 3, 2, 2]),
  feat(49, "coordination", "Vista Calendario",                         [5, 3, 2, 4, 2, 2, 2]),
  feat(50, "coordination", "Vista Mapa sobre plano",                   [5, 4, 3, 3, 4, 3, 4]),
  feat(51, "coordination", "Vista Galería",                            [5, 3, 2, 4, 3, 2, 3]),
  feat(52, "coordination", "Tipos de incidencia configurables",        [5, 4, 3, 4, 3, 3, 3]),
  feat(53, "coordination", "Atributos personalizados por issue",       [5, 4, 3, 4, 3, 3, 2]),
  feat(54, "coordination", "Motor de configuración de workflows",      [5, 3, 3, 4, 3, 3, 2]),
  feat(55, "coordination", "Pin 3D en modelo IFC",                     [5, 4, 3, 3, 4, 4, 1]),
  feat(56, "coordination", "Pin 2D en plano CAD",                      [5, 4, 3, 3, 4, 3, 4]),
  feat(57, "coordination", "Pin en PDF con auto-screenshot",           [5, 5, 3, 4, 4, 3, 4]),
  feat(58, "coordination", "Vinculación bidireccional doc ↔ issue",    [5, 4, 3, 3, 3, 4, 3]),
  feat(59, "coordination", "Cluster / agrupación masiva",              [4, 3, 3, 3, 2, 3, 2]),
  feat(60, "coordination", "Dashboard de KPIs de coordinación",        [5, 4, 3, 4, 3, 3, 2]),
  feat(61, "coordination", "Edición inline en tabla",                  [3, 5, 2, 4, 3, 2, 3]),
  feat(62, "coordination", "Duplicar incidencias",                     [3, 5, 2, 3, 3, 2, 3]),
  feat(63, "coordination", "BCF import / export",                      [3, 4, 4, 2, 4, 5, 1]),
  feat(64, "coordination", "Issue thumbnail history",                  [3, 5, 2, 3, 2, 2, 2]),
  feat(65, "coordination", "Permisos granulares por issue",            [3, 5, 2, 3, 2, 2, 2]),

  // ----- Cat 5: RFIs y Documentos de Obra (10%) -----
  feat(66, "rfis", "Dashboard de RFIs",                                [5, 5, 3, 5, 3, 3, 4]),
  feat(67, "rfis", "Issue → RFI en un clic",                           [5, 3, 2, 3, 2, 2, 4]),
  feat(68, "rfis", "Formulario de RFI personalizable",                 [4, 5, 3, 4, 2, 2, 3]),
  feat(69, "rfis", "Flujo de aprobación de RFI",                       [5, 5, 3, 5, 3, 3, 4]),
  feat(70, "rfis", "Estado Open for Manager",                          [2, 5, 2, 3, 2, 2, 2]),
  feat(71, "rfis", "Órdenes de cambio",                                [4, 5, 2, 5, 2, 2, 3]),
  feat(72, "rfis", "Submittals con IA",                                [1, 5, 2, 5, 2, 2, 1]),
  feat(73, "rfis", "Meeting minutes formales",                         [5, 5, 2, 4, 2, 2, 2]),
  feat(74, "rfis", "Correspondencia formal",                           [2, 4, 2, 4, 1, 1, 3]),
  feat(75, "rfis", "Daily logs",                                       [2, 5, 2, 5, 4, 1, 4]),
  feat(76, "rfis", "Punch lists",                                      [3, 5, 2, 5, 5, 2, 4]),
  feat(77, "rfis", "Plantillas de exportación",                        [5, 3, 2, 3, 2, 2, 2]),
  feat(78, "rfis", "Descarga de attachments en ZIP",                   [3, 5, 2, 4, 2, 2, 3]),

  // ----- Cat 6: Reuniones y Colaboración (10%) -----
  feat(79, "meetings", "Reuniones ICE estructuradas",                  [5, 2, 2, 2, 1, 2, 1]),
  feat(80, "meetings", "Videoconferencia integrada",                   [5, 2, 2, 2, 1, 1, 1]),
  feat(81, "meetings", "Acuerdos en tiempo real",                      [5, 1, 1, 2, 1, 1, 1]),
  feat(82, "meetings", "Acuerdos con responsable y fecha",             [5, 2, 1, 3, 1, 1, 1]),
  feat(83, "meetings", "Auto-generación de minutas",                   [4, 3, 1, 2, 1, 1, 1]),
  feat(84, "meetings", "Resumen con ítems de acción",                  [5, 3, 1, 3, 1, 1, 1]),
  feat(85, "meetings", "Historial de reuniones",                       [5, 3, 2, 3, 1, 2, 1]),
  feat(86, "meetings", "Vinculación reunión → issue / RFI",            [5, 2, 1, 2, 1, 1, 1]),
  feat(87, "meetings", "Transcripción audio → texto",                  [3, 3, 1, 2, 1, 1, 1]),
  feat(88, "meetings", "Integración Zoom / Teams",                     [3, 4, 3, 4, 2, 2, 1]),
  feat(89, "meetings", "Minutas como fuente para IA",                  [3, 5, 1, 2, 1, 1, 1]),
  feat(90, "meetings", "Programación recurrente de reuniones",         [4, 3, 2, 3, 1, 1, 1]),

  // ----- Cat 7: Terreno y Gestión de Obra (8%) -----
  feat(91,  "field", "Visor 360° sobre plano",                         [5, 4, 2, 4, 5, 1, 1]),
  feat(92,  "field", "Galería 360° filtrable",                         [5, 4, 2, 3, 5, 1, 1]),
  feat(93,  "field", "Hotspots en vista 360°",                         [5, 3, 2, 3, 4, 1, 1]),
  feat(94,  "field", "Comparación de fotos de avance",                 [3, 4, 2, 4, 4, 1, 4]),
  feat(95,  "field", "Asset tracking",                                 [2, 5, 2, 4, 3, 1, 2]),
  feat(96,  "field", "Inspecciones de calidad",                        [4, 5, 2, 5, 5, 1, 4]),
  feat(97,  "field", "Inspecciones de seguridad",                      [3, 5, 2, 5, 5, 1, 4]),
  feat(98,  "field", "Captura móvil con geolocalización",              [3, 5, 3, 5, 5, 1, 4]),
  feat(99,  "field", "Modo offline con sincronización",                [2, 4, 3, 4, 5, 1, 3]),
  feat(100, "field", "Reality Capture con drones / LiDAR",             [1, 4, 5, 3, 3, 1, 1]),
  feat(101, "field", "ProjectSight 360 Capture",                       [1, 3, 5, 3, 4, 1, 1]),
  feat(102, "field", "Galería de fotos filtrable",                     [4, 5, 3, 5, 5, 1, 4]),
  feat(103, "field", "Foto → incidencia en un paso",                   [5, 4, 2, 4, 4, 1, 4]),

  // ----- Cat 8: Formularios y Reportes (5%) -----
  feat(104, "forms", "Formularios PDF inteligentes",                   [5, 3, 2, 4, 4, 1, 3]),
  feat(105, "forms", "Form builder con IA",                            [2, 5, 1, 3, 2, 1, 1]),
  feat(106, "forms", "Form attachments",                               [4, 5, 2, 5, 4, 1, 3]),
  feat(107, "forms", "Constructor de dashboards",                      [5, 4, 3, 4, 3, 2, 2]),
  feat(108, "forms", "9 tipos de widgets",                             [5, 3, 2, 3, 2, 2, 2]),
  feat(109, "forms", "Colores y tipografía por widget",                [5, 3, 2, 3, 2, 2, 2]),
  feat(110, "forms", "Biblioteca de plantillas",                       [3, 4, 2, 5, 4, 1, 2]),
  feat(111, "forms", "Insight Builder nativos",                        [3, 5, 3, 4, 2, 2, 1]),
  feat(112, "forms", "Data Connector para Power BI",                   [1, 5, 3, 4, 2, 2, 1]),
  feat(113, "forms", "Reportes programados",                           [2, 4, 3, 4, 3, 2, 1]),
  feat(114, "forms", "Exportación CSV / Excel",                        [2, 5, 4, 5, 4, 4, 3]),
  feat(115, "forms", "Export schedule a Excel",                        [1, 5, 3, 5, 2, 1, 1]),
  feat(116, "forms", "Notificaciones configurables",                   [4, 5, 4, 5, 4, 3, 3]),

  // ----- Cat 9: Inteligencia Artificial (7%) -----
  feat(117, "ai", "IA análisis de fotos 360°",                         [5, 2, 1, 2, 2, 1, 1]),
  feat(118, "ai", "IA asistente de reuniones",                         [5, 3, 1, 1, 1, 1, 1]),
  feat(119, "ai", "IA en panel del visor IFC",                         [5, 2, 1, 1, 1, 1, 1]),
  feat(120, "ai", "IA en panel del visor CAD",                         [5, 1, 1, 1, 1, 1, 1]),
  feat(121, "ai", "IA en panel del visor PDF",                         [5, 1, 1, 1, 1, 1, 1]),
  feat(122, "ai", "Autodesk Assistant Help",                           [1, 5, 1, 2, 1, 1, 1]),
  feat(123, "ai", "Project Data Agent",                                [1, 5, 1, 2, 1, 1, 1]),
  feat(124, "ai", "Quick RFI Create con IA",                           [2, 5, 1, 2, 1, 1, 1]),
  feat(125, "ai", "AutoSpecs para submittals",                         [1, 5, 1, 2, 1, 1, 1]),
  feat(126, "ai", "Clash detection automatizada",                      [2, 5, 4, 2, 2, 3, 1]),
  feat(127, "ai", "Change Analysis con IA",                            [1, 5, 2, 1, 1, 2, 1]),
  feat(128, "ai", "Object Colors por diferencias",                     [2, 5, 3, 1, 1, 3, 1]),
  feat(129, "ai", "Clasificación automática de documentos",            [3, 3, 2, 3, 2, 1, 1]),
  feat(130, "ai", "Procore Copilot",                                   [1, 2, 1, 5, 1, 1, 1]),
  feat(131, "ai", "Procore Agents",                                    [1, 2, 1, 5, 1, 1, 1]),
  feat(132, "ai", "Plataforma de IA agéntica",                         [1, 3, 4, 3, 1, 1, 1]),
  feat(133, "ai", "Analítica predictiva",                              [2, 4, 2, 4, 1, 1, 1]),
  feat(134, "ai", "Pre-llenado de formularios",                        [3, 2, 1, 2, 1, 1, 1]),
  feat(135, "ai", "Symbol detection para Takeoff",                     [1, 5, 1, 1, 1, 1, 1]),

  // ----- Cat 10: Plataforma e Integraciones (5%) -----
  feat(136, "platform", "API REST",                                    [3, 5, 4, 5, 3, 4, 2]),
  feat(137, "platform", "API GraphQL",                                 [2, 3, 2, 2, 1, 2, 1]),
  feat(138, "platform", "App móvil nativa",                            [2, 5, 4, 5, 5, 3, 3]),
  feat(139, "platform", "PWA (Progressive Web App)",                   [4, 3, 3, 3, 2, 3, 2]),
  feat(140, "platform", "Sincronización offline",                      [1, 3, 3, 4, 5, 2, 2]),
  feat(141, "platform", "Integración ERP",                             [1, 4, 5, 5, 2, 2, 1]),
  feat(142, "platform", "App Marketplace",                             [1, 5, 4, 5, 2, 2, 1]),
  feat(143, "platform", "SSO SAML / SCIM",                             [3, 5, 5, 5, 3, 3, 2]),
  feat(144, "platform", "FedRAMP y certificaciones",                   [1, 4, 3, 5, 1, 1, 1]),
  feat(145, "platform", "Zapier / n8n / webhooks",                     [2, 4, 3, 4, 2, 2, 2]),
  feat(146, "platform", "Plugin Revit / AutoCAD",                      [1, 5, 4, 3, 2, 3, 1]),
  feat(147, "platform", "Plugin SketchUp / Tekla",                     [1, 2, 5, 2, 2, 2, 1]),
  feat(148, "platform", "Español nativo",                              [5, 4, 3, 4, 4, 3, 5]),
  feat(149, "platform", "Usuarios ilimitados",                         [5, 1, 2, 5, 3, 3, 5]),
  feat(150, "platform", "Almacenamiento ilimitado",                    [5, 3, 2, 5, 3, 3, 3]),
  feat(151, "platform", "Precio < $5K/año/proyecto",                   [5, 1, 4, 1, 3, 3, 5]),
  feat(152, "platform", "Módulo planificación Gantt",                  [2, 4, 3, 5, 2, 1, 2]),
  feat(153, "platform", "Módulo de costos",                            [1, 5, 2, 5, 1, 1, 1]),
  feat(154, "platform", "Gestión de licitaciones",                     [1, 5, 2, 5, 1, 1, 1]),
  feat(155, "platform", "Estimating / Takeoff",                        [1, 5, 2, 3, 1, 1, 1]),
  feat(156, "platform", "Soporte técnico en español",                  [5, 2, 2, 2, 3, 2, 5]),
];

// ============================================================================
// Helpers — signatures preserved
// ============================================================================

/** Count features by support level for a given platform. */
export function countBySupport(platformId: string): Record<FeatureSupport, number> {
  const counts: Record<FeatureSupport, number> = {
    full: 0,
    partial: 0,
    none: 0,
    roadmap: 0,
  };
  for (const f of FEATURES) {
    const level = f.support[platformId] ?? "none";
    counts[level]++;
  }
  return counts;
}

/** Features where VIA-HABITA = 5 and the best competitor ≤ 3. */
export function getDifferentiators(): Feature[] {
  return FEATURES.filter((f) => f.differentiator);
}

/** All features in a given category, in source order. */
export function getByCategory(category: FeatureCategory): Feature[] {
  return FEATURES.filter((f) => f.category === category);
}

/**
 * Weighted score for a platform (0-100).
 * Uses numeric `score` (0-5) when present, else maps support level back to 0-5
 * (full=5, partial=3, roadmap=1, none=0). Each feature contributes its
 * category weight × score; result is normalised to 0-100.
 */
export function getWeightedScore(platformId: string): number {
  const pointsForLevel: Record<FeatureSupport, number> = {
    full: 5,
    partial: 3,
    roadmap: 1,
    none: 0,
  };
  let earned = 0;
  let possible = 0;
  for (const f of FEATURES) {
    const cat = CATEGORIES.find((c) => c.id === f.category);
    const weight = cat?.weight ?? 1;
    const numeric = f.score?.[platformId];
    const points =
      numeric != null ? numeric : pointsForLevel[f.support[platformId] ?? "none"];
    earned += points * weight;
    possible += 5 * weight;
  }
  return possible > 0 ? Math.round((earned / possible) * 100) : 0;
}
