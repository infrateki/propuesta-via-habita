/**
 * data/proposal.ts
 * Canonical content for /propuesta — extracted from
 * INFRATEK-HABITA-2026-v10 (PROPOSAL-v10.md).
 * All copy in Spanish.
 */

export type Problem = {
  id: string;
  title: string;
  impact: string;
  metric?: string;
};

export const PROBLEMS: Problem[] = [
  {
    id: "p1",
    title: "Diseños que no calzan entre disciplinas",
    impact:
      "Interferencias detectadas demasiado tarde en obra, no en diseño. Re-trabajo, paralizaciones y pérdidas evitables.",
    metric: "≥ $1M anual en pérdidas evitables",
  },
  {
    id: "p2",
    title: "RFIs sin trazabilidad",
    impact:
      "Cada proyecto entre 20 y 105 RFIs registrados a mano, sin vínculo al plano ni al modelo. El 56 % son prevenibles con metodología.",
    metric: "20–105 RFIs / proyecto",
  },
  {
    id: "p3",
    title: "El trazador trabaja con planos en papel",
    impact:
      "El trazador — la persona que marca el piso para que se construya — recibe planos impresos que un supervisor leyó por él. Cuando el modelo cambia, el trazador no se entera. La cadena se rompe en el último metro: 1 cuenta digital compartida para ~100 personas que tocan el proyecto.",
    metric: "1 de ~100 stakeholders",
  },
  {
    id: "p4",
    title: "Sin KPIs de proyectistas",
    impact:
      "Quienes entregan tarde o con errores vuelven a contratarse. Sin panel de evaluación, la mala performance no se ve.",
    metric: "0 % evaluados",
  },
  {
    id: "p5",
    title: "Información dispersa",
    impact:
      "PlanGrid + Notion + AutoCAD + correo + WhatsApp. Cinco fuentes para una sola decisión. Cada proyecto reinventa el control.",
    metric: "5 sistemas, 0 verdad única",
  },
  {
    id: "p6",
    title: "PlanGrid DISCONTINUADO",
    impact:
      "Autodesk fuerza migración a Forma Build: $1.400 / usuario / año. Para 50 stakeholders son $70.000 al año por la misma función.",
    metric: "Plazo: vencimiento Autodesk",
  },
];

export type Pillar = {
  id: string;
  letter: "V" | "I" | "A";
  name: string;
  description: string;
};

export const PILLARS: Pillar[] = [
  {
    id: "v",
    letter: "V",
    name: "Visualización",
    description:
      "Cualquier persona del equipo navega el modelo en 2D y 3D. La información se ve antes de que se construya.",
  },
  {
    id: "i",
    letter: "I",
    name: "Integración",
    description:
      "Modelos federados de arquitectura, estructura y especialidades. Una sola fuente de verdad para todos los actores.",
  },
  {
    id: "a",
    letter: "A",
    name: "Automatización",
    description:
      "Agente Habi, generación asistida de minutas y reportes, KPIs vivos. El sistema trabaja, el equipo decide.",
  },
];

export type Module = {
  id: string;
  name: string;
  description: string;
  replaces: string;
  icon:
    | "FileText"
    | "Box"
    | "MessageSquare"
    | "BarChart3"
    | "Calendar"
    | "ClipboardList"
    | "FolderTree"
    | "Bot"
    | "Users";
};

export const MODULES: Module[] = [
  {
    id: "m1",
    name: "Visor 2D",
    description: "PDF con marcas, medición y calibración dos puntos.",
    replaces: "PlanGrid",
    icon: "FileText",
  },
  {
    id: "m2",
    name: "Visor 3D",
    description: "IFC con selección de elementos, propiedades y árbol de modelo.",
    replaces: "—",
    icon: "Box",
  },
  {
    id: "m3",
    name: "Dashboard de RFIs",
    description: "Seguimiento, vínculo al plano, estados y KPIs.",
    replaces: "Excel + email",
    icon: "MessageSquare",
  },
  {
    id: "m4",
    name: "Panel de proyectistas",
    description: "KPIs pentagonales por consultor externo.",
    replaces: "—",
    icon: "BarChart3",
  },
  {
    id: "m5",
    name: "Cartas Gantt",
    description: "Carga desde MS Project vía CSV. Hitos vinculados a entregables.",
    replaces: "MS Project aislado",
    icon: "Calendar",
  },
  {
    id: "m6",
    name: "Minutas y correspondencia",
    description: "Registro estructurado con trazabilidad y firmantes.",
    replaces: "Notion + WhatsApp",
    icon: "ClipboardList",
  },
  {
    id: "m7",
    name: "Estructura ISO 19650",
    description: "Espacios WIP / SHARED / PUBLISHED / ARCHIVE.",
    replaces: "Carpetas dispersas",
    icon: "FolderTree",
  },
  {
    id: "m8",
    name: "Agente Habi",
    description: "Asistente IA conversacional. Acceso Admin (Pablo y Marcela).",
    replaces: "—",
    icon: "Bot",
  },
  {
    id: "m9",
    name: "6 perfiles de usuario",
    description:
      "Admin OT · Gerencia · Desarrollo / Proyectistas · Calidad · Supervisor / Jefe terreno · Trazador / Operario.",
    replaces: "1 cuenta compartida",
    icon: "Users",
  },
];

export type Deliverable = {
  code: string;
  name: string;
  format: string;
  approver: string;
};

export const DELIVERABLES: Deliverable[] = [
  { code: "E-01", name: "BIM Execution Plan (BEP) v1.0", format: "PDF + Word editable", approver: "Pablo Otero" },
  { code: "E-02", name: "Manual de nomenclatura y estructura de carpetas", format: "PDF", approver: "Pablo Otero" },
  { code: "E-03", name: "Criterios de Modelado BIM — Arquitectura y Estructura", format: "PDF", approver: "Macarena Andrade" },
  { code: "E-04", name: "Protocolo de coordinación semanal", format: "PDF", approver: "Pablo Otero" },
  { code: "E-05", name: "Modelo federado del proyecto piloto", format: "Archivo nativo + visor web", approver: "Macarena Andrade" },
  { code: "E-06", name: "Registro de interferencias detectadas y resueltas", format: "Plataforma VIA-HABITA", approver: "Marcela Leyton" },
  { code: "E-07", name: "Registro de capacitación del equipo piloto", format: "PDF con firmas", approver: "Pablo Otero" },
  { code: "E-08", name: "Manual de replicación para proyectos siguientes", format: "PDF", approver: "Pablo Otero" },
  { code: "E-09", name: "Informe final de resultados con KPIs", format: "PDF", approver: "Pablo Otero" },
];

export type TeamMember = {
  id: string;
  name: string;
  initials: string;
  role: string;
  org: "HABITA" | "INFRATEK";
  dedication: string;
};

export const TEAM: TeamMember[] = [
  {
    id: "marcela",
    name: "Marcela Leyton",
    initials: "ML",
    role: "BIM Champion / BIM Manager",
    org: "HABITA",
    dedication: "Full-time desde lunes — líder operacional del proyecto.",
  },
  {
    id: "macarena",
    name: "Macarena Andrade",
    initials: "MA",
    role: "Arquitecta Piloto",
    org: "HABITA",
    dedication: "Apoyo en capacitación y coordinación del proyecto piloto.",
  },
  {
    id: "pablo",
    name: "Pablo Otero",
    initials: "PO",
    role: "Sponsor + Lead",
    org: "HABITA",
    dedication: "Aprobación de hitos y validación arquitectónica como sponsor del proyecto.",
  },
  {
    id: "sergio",
    name: "Sergio Villanueva-Meyer",
    initials: "SV",
    role: "Principal Consultant",
    org: "INFRATEK",
    dedication: "Liderazgo técnico, sesiones semanales, soporte continuo del equipo INFRATEK (3).",
  },
];

export type TimelineMonth = {
  id: string;
  index: 1 | 2 | 3 | 4;
  month: string;
  year: number;
  title: string;
  activities: string[];
  milestone: string;
};

export const TIMELINE: TimelineMonth[] = [
  {
    id: "m1",
    index: 1,
    month: "Mayo",
    year: 2026,
    title: "Setup y kickoff",
    activities: [
      "Kickoff con equipo piloto",
      "Auditoría de planos, carpetas y modelos existentes",
      "BIM Execution Plan v1.0",
      "Configuración inicial VIA-HABITA",
    ],
    milestone: "E-01 BEP + E-02 Nomenclatura + plataforma operativa",
  },
  {
    id: "m2",
    index: 2,
    month: "Junio",
    year: 2026,
    title: "Primera coordinación",
    activities: [
      "Solicitud formal de modelos a RSM + Iweise",
      "Primera sesión de coordinación conjunta",
      "Protocolo de coordinación semanal documentado",
      "Migración de Notion a VIA-HABITA",
    ],
    milestone: "E-05 Modelo federado v1 + E-04 Protocolo + Notion migrado",
  },
  {
    id: "m3",
    index: 3,
    month: "Julio",
    year: 2026,
    title: "Acompañamiento y capacitación",
    activities: [
      "Sesiones semanales de coordinación",
      "Capacitación equipo obra (jefes OT, jefes de terreno)",
      "Activación panel de evaluación de proyectistas",
      "Pre-cierre: revisión de métricas",
    ],
    milestone: "Panel de KPIs proyectistas activo + equipo obra capacitado",
  },
  {
    id: "m4",
    index: 4,
    month: "Agosto",
    year: 2026,
    title: "Cierre y gate Go/No-Go",
    activities: [
      "Visita de cierre a La Serena (opcional add-on)",
      "Entregables finales E-08 y E-09",
      "Hand-off completo a Marcela",
      "Gate Go/No-Go documentado",
    ],
    milestone: "Sistema operativo + Habita autónoma + decisión Fase 2",
  },
];

export type KPI = {
  id: string;
  metric: string;
  before: string;
  after: string;
  /** numeric value 0..100 used to render the progress bar */
  beforePct: number;
  afterPct: number;
  unit?: string;
};

export const KPIS: KPI[] = [
  {
    id: "rfis",
    metric: "RFIs en proyecto piloto",
    before: "~85 estimados",
    after: "< 50 (↓ 40 %)",
    beforePct: 85,
    afterPct: 50,
    unit: "RFIs",
  },
  {
    id: "interferencias",
    metric: "Interferencias detectadas pre-construcción",
    before: "~0 %",
    after: "> 30 %",
    beforePct: 2,
    afterPct: 35,
    unit: "%",
  },
  {
    id: "consultores",
    metric: "Consultores entregando bajo estándar",
    before: "0 de 2",
    after: "≥ 2 de 2",
    beforePct: 0,
    afterPct: 100,
    unit: "%",
  },
  {
    id: "capacitados",
    metric: "Personas de obra capacitadas (incluye trazadores)",
    before: "0",
    after: "+10",
    beforePct: 0,
    afterPct: 100,
    unit: "personas",
  },
  {
    id: "madurez",
    metric: "Madurez BIM Habita",
    before: "1.8 / 5.0",
    after: "2.5 / 5.0",
    beforePct: 36,
    afterPct: 50,
    unit: "/ 5",
  },
  {
    id: "documentos",
    metric: "Documentos BIM base existentes",
    before: "0",
    after: "9 entregables aprobados",
    beforePct: 0,
    afterPct: 100,
    unit: "E-0x",
  },
  {
    id: "evaluados",
    metric: "Proyectistas evaluados con KPIs",
    before: "0 %",
    after: "100 %",
    beforePct: 0,
    afterPct: 100,
    unit: "%",
  },
];

export const INVESTMENT = {
  baseAmount: 12_500,
  baseLabel: "USD $12.500 — Fase 1 completa, 100 % virtual",
  recurringAmount: 2_000,
  recurringLabel: "USD $2.000 / proyecto / año — usuarios ilimitados",
  visitAmount: 2_000,
  visitLabel: "USD $2.000 / visita opcional a La Serena (3 días, todo incluido)",
  enterpriseNote: "Plan Enterprise: 10+ proyectos = $1.600 / proyecto (20 % de descuento).",
  totalDeliveredValue: 21_000,
  paymentSchedule: [
    { code: "H0", label: "Anticipo — firma de acuerdo", when: "Antes de iniciar", amount: 4_500 },
    { code: "H1", label: "Setup — BEP + plataforma operativa", when: "Fin Mes 1", amount: 3_000 },
    { code: "H2", label: "Modelos — federado v1 + protocolo + Notion migrado", when: "Fin Mes 2", amount: 2_500 },
    { code: "H3", label: "Cierre — manual + KPIs + hand-off", when: "Fin Mes 4", amount: 2_500 },
  ],
};

export type GateCriterion = {
  id: string;
  criterion: string;
  goCondition: string;
};

export const GATE_CRITERIA: GateCriterion[] = [
  {
    id: "g1",
    criterion: "Reducción de RFIs",
    goCondition: "RFIs piloto < 50 (↓ ≥ 40 % vs baseline)",
  },
  {
    id: "g2",
    criterion: "Documentación completada",
    goCondition: "≥ 8 de 9 entregables aprobados por Pablo",
  },
  {
    id: "g3",
    criterion: "Consultores integrados",
    goCondition: "≥ 2 consultores entregando bajo estándar BIM",
  },
  {
    id: "g4",
    criterion: "Equipo capacitado",
    goCondition: "+10 personas usando modelo en obra (incluye trazadores)",
  },
  {
    id: "g5",
    criterion: "Plataforma operativa",
    goCondition: "VIA-HABITA activo con control de versiones funcionando",
  },
  {
    id: "g6",
    criterion: "GO de Pablo",
    goCondition: "Pablo da GO explícito para iniciar Fase 2",
  },
];
