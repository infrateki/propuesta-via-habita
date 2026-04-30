/**
 * VIA-HABITA pricing engine.
 * Pure, deterministic calculation from a Configuration to a complete
 * PricingBreakdown. Powers the configurator's live receipt, the CBS
 * treemap, and the savings comparison.
 */

import { PRICING } from "./constants";

// ============================================================================
// Types
// ============================================================================

export type AILevel = "none" | "basico" | "intermedio" | "premium";
export type HostingOption = "cloud" | "selfhosted";
export type GpuOption = "none" | "basica" | "intermedia" | "profesional";

/** User-selectable choices in the configurator. */
export interface Configuration {
  /** Visitas presenciales adicionales a La Serena (0+, cada una +$2,000). */
  additionalVisits: number;
  /** # de proyectos en plataforma (1-15+). Detona Enterprise a partir de 10. */
  projects: number;
  /** Nivel de IA por proyecto. */
  aiLevel: AILevel;
  /** Knowledge Graph base: $5,000 setup + año 1 incluido. */
  knowledgeGraph: boolean;
  /** Cloud INFRATEK (gratis) o servidores Habita (+$3,000 setup). */
  hosting: HostingOption;
  /** Hardware GPU local opcional. */
  gpu: GpuOption;
  /** Horas adicionales bajo demanda. */
  additionalHours?: {
    sergio?: number;
    senior?: number;
    training?: number;
  };
}

/** Catálogo de add-ons consumibles por la UI (categorizados en data/addons.ts). */
export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  priceType: "one-time" | "recurring" | "per-hour" | "per-event";
  category: "visits" | "services" | "knowledgeGraph" | "infrastructure" | "futureModules";
  recommended?: boolean;
}

/** Resultado completo del cálculo (todos los números que el receipt necesita). */
export interface PricingBreakdown {
  /** Configuration used to compute this breakdown. */
  config: Configuration;

  // ----- Línea por línea (year-1 dollars) -----
  implementation: number;          // base virtual ($12,500)
  visits: number;                  // add. visits × $2,000
  platformAnnual: number;          // year-1 platform spend (post-enterprise)
  platformPerProjectApplied: number; // $2,000 o $1,600
  enterpriseActive: boolean;       // true si projects >= 10
  aiAnnual: number;                // year-1 AI estimate
  aiMonthly: number;               // monthly AI estimate (for display)
  knowledgeGraphSetup: number;     // $5,000 si activado
  knowledgeGraphAnnualRenewal: number; // $2,500/año desde año 2 (informativo)
  hostingSetup: number;            // $0 cloud | $3,000 self-hosted
  gpuHardware: number;             // $0–$35,000
  additionalHoursTotal: number;    // sum of hourly add-ons

  // ----- Totales agregados -----
  totalOneTime: number;            // implementation + visits + KG setup + hosting + GPU + hours
  totalAnnualRecurring: number;    // platform + AI (year-1; MVP ignora KG renewal)
  totalYear1: number;              // totalOneTime + totalAnnualRecurring
  totalMonthlyEquivalent: number;  // totalYear1 / 12 (informativo)

  // ----- Comparación con Autodesk Forma Build -----
  autodeskEquivalentYear1: number; // ~$1,400/user × 50 users
  savings: number;                 // autodesk - viaHabita
  savingsPercent: number;          // savings / autodesk * 100
}

// ============================================================================
// Helpers
// ============================================================================

/** Format a USD amount as "$12,000" (no decimals, en-US). */
export function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

/** Round to nearest integer USD; never returns -0. */
function r(n: number): number {
  const v = Math.round(n);
  return v === 0 ? 0 : v;
}

const AI_MONTHLY_BY_LEVEL: Record<AILevel, number> = {
  none: 0,
  basico: PRICING.ai.basicoMonthly,
  intermedio: PRICING.ai.intermedioMonthly,
  premium: PRICING.ai.premiumMonthly,
};

const GPU_PRICE_BY_OPTION: Record<GpuOption, number> = {
  none: PRICING.gpu.none,
  basica: PRICING.gpu.basica,
  intermedia: PRICING.gpu.intermedia,
  profesional: PRICING.gpu.profesional,
};

// ============================================================================
// Comparison anchor: Autodesk Forma Build per-user pricing
// ============================================================================
/** Autodesk Forma Build "Per User" tier at $1,400/user/year × 50 users
 *  (autodesk.com/products/forma-build/buy, April 2026). */
const AUTODESK_PER_USER_ANNUAL = 1_400;
const AUTODESK_USERS_BENCHMARK = 50;

// ============================================================================
// calculatePricing (pure, deterministic)
// ============================================================================

export function calculatePricing(config: Configuration): PricingBreakdown {
  // --- Implementation (base virtual) ---
  const implementation = PRICING.implementation;

  // --- Visits ---
  const additionalVisits = Math.max(0, Math.floor(config.additionalVisits));
  const visits = additionalVisits * PRICING.visitCost;

  // --- Platform (enterprise discount kicks in at 10+ projects) ---
  const projects = Math.max(0, Math.floor(config.projects));
  const enterpriseActive = projects >= PRICING.enterpriseThreshold;
  const platformPerProjectApplied = enterpriseActive
    ? PRICING.platformPerProjectEnterprise
    : PRICING.platformPerProject;
  const platformAnnual = projects * platformPerProjectApplied;

  // --- AI (per project, monthly → annualized for year-1 display) ---
  const aiPerProjectMonthly = AI_MONTHLY_BY_LEVEL[config.aiLevel];
  const aiMonthly = projects * aiPerProjectMonthly;
  const aiAnnual = aiMonthly * 12;

  // --- Knowledge Graph ---
  const knowledgeGraphSetup = config.knowledgeGraph ? PRICING.knowledgeGraphSetup : 0;
  const knowledgeGraphAnnualRenewal = config.knowledgeGraph
    ? PRICING.knowledgeGraphRenewal
    : 0;

  // --- Hosting ---
  const hostingSetup =
    config.hosting === "selfhosted" ? PRICING.selfHostedSetup : PRICING.cloudHostingSetup;

  // --- GPU hardware ---
  const gpuHardware = GPU_PRICE_BY_OPTION[config.gpu];

  // --- Additional hours ---
  const h = config.additionalHours;
  const additionalHoursTotal =
    (h?.sergio ?? 0) * PRICING.rates.sergio +
    (h?.senior ?? 0) * PRICING.rates.senior +
    (h?.training ?? 0) * PRICING.rates.training;

  // --- Totals ---
  const totalOneTime =
    implementation +
    visits +
    knowledgeGraphSetup +
    hostingSetup +
    gpuHardware +
    additionalHoursTotal;

  const totalAnnualRecurring = platformAnnual + aiAnnual;

  const totalYear1 = totalOneTime + totalAnnualRecurring;
  const totalMonthlyEquivalent = totalYear1 / 12;

  // --- Comparison vs Autodesk Forma Build (50 users benchmark) ---
  const autodeskEquivalentYear1 = AUTODESK_PER_USER_ANNUAL * AUTODESK_USERS_BENCHMARK;
  const savings = autodeskEquivalentYear1 - totalYear1;
  const savingsPercent =
    autodeskEquivalentYear1 > 0 ? (savings / autodeskEquivalentYear1) * 100 : 0;

  return {
    config,
    implementation: r(implementation),
    visits: r(visits),
    platformAnnual: r(platformAnnual),
    platformPerProjectApplied: r(platformPerProjectApplied),
    enterpriseActive,
    aiAnnual: r(aiAnnual),
    aiMonthly: r(aiMonthly),
    knowledgeGraphSetup: r(knowledgeGraphSetup),
    knowledgeGraphAnnualRenewal: r(knowledgeGraphAnnualRenewal),
    hostingSetup: r(hostingSetup),
    gpuHardware: r(gpuHardware),
    additionalHoursTotal: r(additionalHoursTotal),
    totalOneTime: r(totalOneTime),
    totalAnnualRecurring: r(totalAnnualRecurring),
    totalYear1: r(totalYear1),
    totalMonthlyEquivalent: r(totalMonthlyEquivalent),
    autodeskEquivalentYear1: r(autodeskEquivalentYear1),
    savings: r(savings),
    savingsPercent: Math.round(savingsPercent * 10) / 10,
  };
}

// ============================================================================
// Default configuration (used to seed the configurator and verification)
// ============================================================================
export const DEFAULT_CONFIGURATION: Configuration = {
  additionalVisits: 1,
  projects: 1,
  aiLevel: "basico",
  knowledgeGraph: false,
  hosting: "cloud",
  gpu: "none",
};
