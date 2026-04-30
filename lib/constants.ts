/**
 * VIA-HABITA pricing constants and static catalogs.
 * Single source of truth for every USD figure used by the configurator
 * and by the comparison page. All numbers confirmed with the client and
 * mirrored in INFRATEK-HABITA-2026-v11.
 */

// ============================================================================
// PRICING (every USD figure the calculator references)
// ============================================================================
export const PRICING = {
  // Implementación (Fase 1, base 100% virtual)
  implementation: 12_500,

  // Visitas presenciales a La Serena (add-on, no incluidas en base)
  visitCost: 2_000,

  // Plataforma VIA-HABITA (por proyecto / por año)
  platformPerProject: 2_000,

  // Descuento Enterprise: 10+ proyectos → 20% off por proyecto
  enterpriseThreshold: 10,
  enterpriseDiscount: 0.2, // 20%
  platformPerProjectEnterprise: 1_600, // = 2000 * (1 - 0.2)

  // Inteligencia Artificial (estimado mensual por proyecto, por nivel)
  ai: {
    basicoMonthly: 55,        // Haiku
    intermedioMonthly: 140,   // Sonnet
    premiumMonthly: 350,      // Opus
  },

  // Knowledge Graph
  knowledgeGraphSetup: 5_000,    // setup + año 1 incluido
  knowledgeGraphRenewal: 2_500,  // por año, desde año 2

  // Hosting
  cloudHostingSetup: 0,         // INFRATEK cloud incluido
  selfHostedSetup: 3_000,       // setup en servidores Habita

  // Hardware GPU local
  gpu: {
    none: 0,
    basica: 8_000,
    intermedia: 15_000,
    profesional: 35_000,
  },

  // Tarifas horarias (referencia para servicios bajo demanda)
  rates: {
    sergio: 200,    // hora consultor principal
    senior: 120,    // hora equipo senior
    training: 80,   // hora capacitación
  },
} as const;

// ============================================================================
// AI_MODELS (token economics + recommendation per tier)
// ============================================================================
export interface AIModel {
  id: "haiku" | "sonnet" | "opus";
  name: string;
  tier: "Básico" | "Intermedio" | "Premium";
  inputCostPer1M: number;       // USD per 1M input tokens
  outputCostPer1M: number;      // USD per 1M output tokens
  monthlyEstimate: number;      // USD/mes/proyecto, uso típico de equipo BIM
  speed: "Rápido" | "Balanceado" | "Profundo";
  recommendation: string;       // texto en español, 1 línea
}

export const AI_MODELS: AIModel[] = [
  {
    id: "haiku",
    name: "Claude Haiku 4.5",
    tier: "Básico",
    inputCostPer1M: 0.8,
    outputCostPer1M: 4,
    monthlyEstimate: PRICING.ai.basicoMonthly,
    speed: "Rápido",
    recommendation:
      "Recomendado para consultas frecuentes, búsquedas en documentación y resúmenes operativos.",
  },
  {
    id: "sonnet",
    name: "Claude Sonnet 4.6",
    tier: "Intermedio",
    inputCostPer1M: 3,
    outputCostPer1M: 15,
    monthlyEstimate: PRICING.ai.intermedioMonthly,
    speed: "Balanceado",
    recommendation:
      "Análisis de RFIs, redacción de respuestas técnicas, revisión de modelos IFC y coordinación.",
  },
  {
    id: "opus",
    name: "Claude Opus 4.6",
    tier: "Premium",
    inputCostPer1M: 15,
    outputCostPer1M: 75,
    monthlyEstimate: PRICING.ai.premiumMonthly,
    speed: "Profundo",
    recommendation:
      "Decisiones técnicas complejas, auditoría de modelos, revisión de contratos y planes de obra.",
  },
];

// ============================================================================
// GPU_OPTIONS (hardware local opcional para inferencia in-house)
// ============================================================================
export interface GpuOption {
  id: "none" | "basica" | "intermedia" | "profesional";
  label: string;
  description: string;
  price: number;
  vram?: string;
  useCase?: string;
}

export const GPU_OPTIONS: GpuOption[] = [
  {
    id: "none",
    label: "Sin GPU local",
    description: "Inferencia 100% en la nube de INFRATEK. Sin hardware adicional.",
    price: PRICING.gpu.none,
  },
  {
    id: "basica",
    label: "GPU Básica",
    description: "Workstation con GPU dedicada para inferencia ligera y desarrollo.",
    price: PRICING.gpu.basica,
    vram: "16 GB",
    useCase: "Pruebas, prototipos, modelos pequeños",
  },
  {
    id: "intermedia",
    label: "GPU Intermedia",
    description: "Servidor con GPU profesional para inferencia productiva por proyecto.",
    price: PRICING.gpu.intermedia,
    vram: "24 GB",
    useCase: "Inferencia en producción, 1-3 proyectos simultáneos",
  },
  {
    id: "profesional",
    label: "GPU Profesional",
    description: "Cluster con dos GPUs A100 / H100 equivalentes. Soberanía de datos total.",
    price: PRICING.gpu.profesional,
    vram: "80 GB",
    useCase: "Empresa completa, modelos grandes locales, datos sensibles",
  },
];

// ============================================================================
// HOSTING_OPTIONS (cloud INFRATEK vs servidores Habita)
// ============================================================================
export interface HostingOption {
  id: "cloud" | "selfhosted";
  label: string;
  description: string;
  price: number;
  ownership: "INFRATEK gestiona" | "Habita gestiona";
  recommended?: boolean;
}

export const HOSTING_OPTIONS: HostingOption[] = [
  {
    id: "cloud",
    label: "Cloud INFRATEK",
    description:
      "Infraestructura administrada por INFRATEK. Sin costos de setup, escalable bajo demanda.",
    price: PRICING.cloudHostingSetup,
    ownership: "INFRATEK gestiona",
    recommended: true,
  },
  {
    id: "selfhosted",
    label: "Servidores Habita",
    description:
      "Despliegue on-premise. Soberanía total de datos. Setup único y handover técnico.",
    price: PRICING.selfHostedSetup,
    ownership: "Habita gestiona",
  },
];

// ============================================================================
// PHASE_TIMELINE (4 meses, actividades + hitos)
// ============================================================================
export interface PhaseMonth {
  month: 1 | 2 | 3 | 4;
  code: string;        // "M1", "M2", etc.
  title: string;
  focus: string;
  activities: string[];
  milestone: string;
}

export const PHASE_TIMELINE: PhaseMonth[] = [
  {
    month: 1,
    code: "M1",
    title: "Diagnóstico",
    focus: "Auditoría operacional y definición de estándares",
    activities: [
      "Levantamiento de procesos actuales (PlanGrid, Notion, correos)",
      "Mapeo de stakeholders y roles BIM",
      "Definición de estándares ISO 19650 adaptados a Habita",
      "Auditoría de modelos existentes y nomenclatura",
      "Plan de migración de datos legacy",
    ],
    milestone: "Diagnóstico operacional + estándares BIM aprobados",
  },
  {
    month: 2,
    code: "M2",
    title: "Modelado",
    focus: "Modelo piloto y configuración inicial de plataforma",
    activities: [
      "Modelo IFC federado del proyecto piloto",
      "Configuración inicial de VIA-HABITA",
      "Setup de Knowledge Graph base",
      "Integración con flujos existentes (Notion, correo)",
      "Capacitación inicial al equipo piloto",
    ],
    milestone: "Plataforma operativa + modelo piloto cargado",
  },
  {
    month: 3,
    code: "M3",
    title: "Procesos",
    focus: "Digitalización de RFIs, Submittals y agente IA",
    activities: [
      "Digitalización de flujos de RFIs y respuestas",
      "Digitalización de Submittals y aprobaciones",
      "Agente IA entrenado con documentación de Habita",
      "Coordinación clash detection automatizada",
      "Pruebas de adopción con equipo extendido",
    ],
    milestone: "Procesos críticos digitalizados + IA operativa",
  },
  {
    month: 4,
    code: "M4",
    title: "Adopción",
    focus: "Capacitación, rollout y handover",
    activities: [
      "Capacitación a usuarios extendidos (50+ personas)",
      "Rollout a proyectos adicionales",
      "Documentación técnica completa",
      "Handover de código fuente",
      "Definición de SLA y soporte continuo",
    ],
    milestone: "Sistema en producción + 90 días de soporte iniciados",
  },
];
