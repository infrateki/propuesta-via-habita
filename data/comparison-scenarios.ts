/**
 * data/comparison-scenarios.ts
 *
 * Three-scenario narrative replacing the legacy 50-user comparison.
 * Source: Pablo Otero feedback (29 Abr 2026); the diagnosis is that
 * sticking with 10 users is what made PlanGrid fail at Habita; the real
 * scale is ~100 users when you count every actor that needs digital
 * access (development, externals, quality, management, jobsites).
 *
 * Numbers come from Pablo directly. Per-user math at scenario 1 reflects
 * Habita's actual quoted Forma Build rate (rounded), not raw list price.
 */

export interface ScenarioCost {
  /** Display label for the row, e.g. "Costo anual". */
  label: string;
  /** USD/year for VIA-HABITA. */
  viaHabita: number;
  /** USD/year for Autodesk Forma Build. */
  autodesk: number;
  /** Optional sub-detail under the value. */
  viaHabitaDetail?: string;
  autodeskDetail?: string;
}

export interface ScenarioCard {
  number: "01" | "02" | "03" | "04" | "05";
  eyebrow: string;
  title: string;
  /** Which side wins this scenario, drives the highlight color. */
  winner: "autodesk" | "via-habita" | "neither";
  costs?: ScenarioCost[];
}

// ============================================================================
// Scenario 1: diagnostic anchor (no comparison, just framing)
// ============================================================================
export const SCENARIO_DIAGNOSTIC = {
  number: "01" as const,
  eyebrow: "El diagnóstico",
  title: "Por qué esta conversación arranca acá.",
  // Stats from the BIM 2.0 diagnostic conducted Oct–Dec 2025.
  stats: [
    { value: "+50", label: "horas de diagnóstico" },
    { value: "+20", label: "participantes entrevistados" },
    { value: "+50%", label: "de RFIs prevenibles con metodología" },
    { value: "1", label: "cuenta PlanGrid compartida" },
    { value: "90%", label: "de obra usa planos en papel" },
  ],
  body: [
    "Entre octubre y diciembre de 2025 corrimos un diagnóstico BIM 2.0 con el equipo de Habita: +50 horas de entrevistas, +20 participantes, todas las áreas representadas.",
    "El hallazgo central no fue de software. Fue de procesos: la mayoría de los RFIs son prevenibles con metodología, no con una herramienta nueva. Los consultores externos (RSM, Iweise) ya trabajan en BIM. Lo que falta es coordinación bajo un estándar común.",
    "El síntoma más visible: PlanGrid existe pero está roto. 1 cuenta compartida. 90% del personal de obra trabaja con planos impresos. Nadie abrió la plataforma en proyectos activos durante los últimos 6 meses.",
  ],
};

// ============================================================================
// Scenario 2: current state (10 users); Autodesk wins on price (intentional provocation)
// ============================================================================
export const SCENARIO_CURRENT: ScenarioCard = {
  number: "02",
  eyebrow: "Escenario actual · 10 usuarios",
  title: "Si nos quedamos donde estamos hoy, Autodesk es más barato.",
  winner: "autodesk",
  costs: [
    {
      label: "Costo anual",
      viaHabita: 14_000,
      autodesk: 12_000,
      viaHabitaDetail: "$12.000 plataforma + $2.500 implementación amortizada",
      autodeskDetail: "10 usuarios × ~$1.200/usuario/año (tarifa Habita)",
    },
    {
      label: "Usuarios incluidos",
      viaHabita: 10,
      autodesk: 10,
    },
  ],
};

// ============================================================================
// Scenario 3: diagnosis (no costs, just argument)
// ============================================================================
export const SCENARIO_WHY_10_FAILS = {
  number: "03" as const,
  eyebrow: "El problema con 10 usuarios",
  title: "Mantener 10 usuarios repite la experiencia actual con PlanGrid.",
  reasons: [
    {
      headline: "90 % de obra trabaja con planos impresos",
      detail:
        "El equipo de terreno no recibe planos digitales. La plataforma, por más que exista, no llega al lugar donde se construye.",
    },
    {
      headline: "6 meses sin actividad en PlanGrid",
      detail:
        "Caso real registrado en proyectos activos. Si nadie consulta la herramienta, no está coordinando el trabajo.",
    },
    {
      headline: "El trazador no recibe acceso",
      detail:
        "El trazador es el último eslabón: la persona que marca el piso para que se construya. Si trabaja con papel, todo lo digital aguas arriba se rompe en el último metro.",
    },
    {
      headline: "Cuentas compartidas = sin trazabilidad individual",
      detail:
        "Un RFI registra al titular de la cuenta aunque haya pasado por varias manos. No hay registro real de quién hizo qué; la auditoría operacional pierde valor.",
    },
    {
      headline: "Restricciones progresivas a cuentas compartidas",
      detail:
        "Autodesk está aplicando restricciones progresivas a cuentas compartidas. Mantener este modelo expone a la operación a interrupciones de acceso.",
    },
    {
      headline: "Mismo modelo, herramienta diferente",
      detail:
        "Mantener 10 usuarios significa mantener el modelo actual con una herramienta diferente. El problema de alcance no se resuelve cambiando de proveedor sin cambiar el número de personas con acceso.",
    },
  ],
};

// ============================================================================
// Scenario 4: real scale (100 users); VIA-HABITA wins decisively
// ============================================================================
export const HABITA_TEAM_BREAKDOWN: { area: string; people: number; detail?: string }[] = [
  {
    area: "Desarrollo",
    people: 17,
    detail: "Arquitectos, dibujantes, coordinadores",
  },
  {
    area: "Proyectistas externos",
    people: 10,
    detail: "RSM, Iweise y otras consultoras especializadas",
  },
  {
    area: "Calidad",
    people: 4,
    detail: "Inspección y aseguramiento",
  },
  {
    area: "Gerencia",
    people: 3,
    detail: "Toma de decisiones ejecutivas",
  },
  {
    area: "Obra (×6 proyectos)",
    people: 60,
    detail: "Por jobsite: admin, jefe terreno, oficina técnica, 4 trazadores, supervisores ≈ 10",
  },
];

export const HABITA_TEAM_TOTAL = HABITA_TEAM_BREAKDOWN.reduce(
  (sum, row) => sum + row.people,
  0,
);

export const SCENARIO_REAL: ScenarioCard = {
  number: "04",
  eyebrow: "Escenario real · 100 usuarios",
  title: "Cuando la plataforma llega a quien construye, los números cambian.",
  winner: "via-habita",
  costs: [
    {
      label: "Costo anual",
      viaHabita: 12_000,
      autodesk: 140_000,
      viaHabitaDetail: "6 proyectos × $2.000, usuarios ilimitados incluidos",
      autodeskDetail: "100 usuarios × $1.400/usuario/año",
    },
    {
      label: "Costo por usuario",
      viaHabita: 120,
      autodesk: 1_400,
    },
  ],
};

// ============================================================================
// Scenario 5: exclusive advantages
// ============================================================================
export const VIA_HABITA_EXCLUSIVES: { title: string; description: string }[] = [
  {
    title: "Seguimiento de cartas de desarrollo",
    description:
      "Trazabilidad completa del flujo de aprobaciones documentales por proyecto, vinculado a hitos.",
  },
  {
    title: "KPIs de evaluación de proyectistas",
    description:
      "Panel pentagonal con tres ejes: precio, plazo y calidad. Métricas auditables por consultor externo.",
  },
  {
    title: "Tablero de issues y RFIs por proyecto",
    description:
      "Vista unificada de RFIs e incidencias con vínculo al plano y al modelo, no a un email perdido.",
  },
  {
    title: "Tablero de control de costo del desarrollo",
    description:
      "Visibilidad financiera del proyecto integrada con el avance técnico, no en una planilla aparte.",
  },
  {
    title: "Evaluación por fecha de entrega y calidad",
    description:
      "Histórico cuantitativo del comportamiento de cada proyectista. Decisiones de re-contratación con datos.",
  },
  {
    title: "6 perfiles a medida de Habita",
    description:
      "Admin OT · Gerencia · Desarrollo/Proyectistas · Calidad · Supervisor/Jefe terreno · Trazador/Operario. Permisos diseñados con tu equipo.",
  },
];

// ============================================================================
// Helper for the cost-comparison cards in scenarios 2 and 4
// ============================================================================
export function ratio(autodesk: number, viaHabita: number): number {
  if (viaHabita === 0) return 0;
  return Math.round((autodesk / viaHabita) * 10) / 10;
}
