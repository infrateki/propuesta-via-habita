/**
 * Catálogo de add-ons disponibles en el configurador.
 * Cada item conecta con la lógica de pricing.ts vía su categoría.
 * Texto en español, montos en USD.
 */

import type { AddOn } from "@/lib/pricing";
import { PRICING } from "@/lib/constants";

// ============================================================================
// Visitas presenciales (La Serena)
// ============================================================================
const visits: AddOn[] = [
  {
    id: "visit-laserena",
    name: "Visita presencial a La Serena",
    description:
      "Visita on-site del consultor para sesiones de trabajo, capacitación o coordinación con equipo extendido. Pasajes y viáticos incluidos.",
    price: PRICING.visitCost,
    priceType: "per-event",
    category: "visits",
  },
];

// ============================================================================
// Servicios bajo demanda (hourly)
// ============================================================================
const services: AddOn[] = [
  {
    id: "hours-sergio",
    name: "Horas de consultoría · Sergio Villanueva-Meyer",
    description:
      "Consultoría técnica directa: arquitectura de plataforma, decisiones críticas, auditoría de modelos.",
    price: PRICING.rates.sergio,
    priceType: "per-hour",
    category: "services",
  },
  {
    id: "hours-senior",
    name: "Horas de equipo senior",
    description:
      "Desarrollo, integración y configuración avanzada por equipo INFRATEK.",
    price: PRICING.rates.senior,
    priceType: "per-hour",
    category: "services",
  },
  {
    id: "hours-training",
    name: "Horas de capacitación adicional",
    description:
      "Sesiones extra de capacitación al equipo Habita más allá de las horas incluidas.",
    price: PRICING.rates.training,
    priceType: "per-hour",
    category: "services",
  },
];

// ============================================================================
// Knowledge Graph
// ============================================================================
const knowledgeGraph: AddOn[] = [
  {
    id: "kg-setup",
    name: "Knowledge Graph · Setup + Año 1",
    description:
      "Grafo semántico con entidades de Habita (proyectos, contratos, normativa, modelos). Habilita búsqueda contextual y razonamiento del agente IA.",
    price: PRICING.knowledgeGraphSetup,
    priceType: "one-time",
    category: "knowledgeGraph",
    recommended: true,
  },
  {
    id: "kg-renewal",
    name: "Knowledge Graph · Renovación anual",
    description:
      "Mantenimiento del grafo, actualización de entidades y nuevas integraciones. Aplica desde año 2.",
    price: PRICING.knowledgeGraphRenewal,
    priceType: "recurring",
    category: "knowledgeGraph",
  },
];

// ============================================================================
// Infraestructura
// ============================================================================
const infrastructure: AddOn[] = [
  {
    id: "infra-cloud",
    name: "Cloud INFRATEK (incluido)",
    description:
      "Infraestructura administrada por INFRATEK. Sin costos de setup, escalable.",
    price: 0,
    priceType: "one-time",
    category: "infrastructure",
    recommended: true,
  },
  {
    id: "infra-selfhosted",
    name: "Despliegue en servidores Habita",
    description:
      "Setup on-premise en infraestructura de Habita. Soberanía total de datos. Incluye handover técnico.",
    price: PRICING.selfHostedSetup,
    priceType: "one-time",
    category: "infrastructure",
  },
  {
    id: "gpu-basica",
    name: "GPU local · Básica",
    description: "Workstation con 16 GB VRAM. Inferencia ligera y desarrollo.",
    price: PRICING.gpu.basica,
    priceType: "one-time",
    category: "infrastructure",
  },
  {
    id: "gpu-intermedia",
    name: "GPU local · Intermedia",
    description:
      "Servidor con 24 GB VRAM. Inferencia productiva en 1-3 proyectos simultáneos.",
    price: PRICING.gpu.intermedia,
    priceType: "one-time",
    category: "infrastructure",
  },
  {
    id: "gpu-profesional",
    name: "GPU local · Profesional",
    description:
      "Cluster con 80 GB VRAM (A100/H100). Soberanía total para datos sensibles.",
    price: PRICING.gpu.profesional,
    priceType: "one-time",
    category: "infrastructure",
  },
];

// ============================================================================
// Módulos futuros (informativos, no suman al total hoy)
// ============================================================================
const futureModules: AddOn[] = [
  {
    id: "future-managed-agents",
    name: "Managed Agents (Q3 2026)",
    description:
      "Agentes IA autónomos que ejecutan tareas multi-paso (clash review automático, generación de RFIs, seguimiento de submittals). Roadmap Anthropic.",
    price: 0,
    priceType: "recurring",
    category: "futureModules",
  },
  {
    id: "future-mobile",
    name: "App móvil nativa (Q4 2026)",
    description:
      "Aplicación iOS/Android para field execution con sincronización offline.",
    price: 0,
    priceType: "one-time",
    category: "futureModules",
  },
  {
    id: "future-api-public",
    name: "API pública para integraciones (Q1 2027)",
    description:
      "REST + webhooks para integrar con ERPs y sistemas legacy de Habita.",
    price: 0,
    priceType: "one-time",
    category: "futureModules",
  },
];

// ============================================================================
// Catálogo agregado
// ============================================================================
export const ADDONS = {
  visits,
  services,
  knowledgeGraph,
  infrastructure,
  futureModules,
} as const;

/** Flat list of every add-on, useful for search/filter UIs. */
export const ALL_ADDONS: AddOn[] = [
  ...visits,
  ...services,
  ...knowledgeGraph,
  ...infrastructure,
  ...futureModules,
];
