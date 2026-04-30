"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Building2,
  HardHat,
  Layers,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import {
  AUTODESK_PRODUCTS,
  PRODUCTS_BY_CATEGORY,
  CATEGORY_LABELS,
  HABITA_AUTODESK_SCENARIO,
  HABITA_AUTODESK_TOTAL,
  VIA_HABITA_TOTAL,
  HABITA_SAVINGS,
  HABITA_RATIO,
  type AutodeskCategory,
  type AutodeskProduct,
} from "@/data/autodesk-costs";
import { formatUSD, cn } from "@/lib/utils";

const CATEGORY_ICON: Record<AutodeskCategory, typeof Building2> = {
  design: Layers,
  construction: HardHat,
  bundle: Building2,
  visualization: Eye,
};

const CATEGORY_ORDER: AutodeskCategory[] = [
  "construction",
  "bundle",
  "design",
  "visualization",
];

export function AutodeskCosts() {
  const reduce = useReducedMotion();

  return (
    <div className="space-y-20">
      {/* INTRO */}
      <header className="space-y-4 max-w-3xl">
        <p className="label-spec text-[var(--color-copper)]">
          Productos Autodesk · precios públicos abril 2026
        </p>
        <h2 className="font-display text-display-md text-steel-100 leading-tight">
          Lo que cuesta armar el stack completo
          <br />
          <span className="text-steel-300">vs. lo que cuesta VIA-HABITA.</span>
        </h2>
        <p className="text-steel-300 leading-relaxed">
          Catálogo completo de productos Autodesk relevantes para AEC, con
          precios USD/año por usuario. Abajo, el escenario Habita: qué se
          necesita realmente y dónde VIA-HABITA reemplaza el gasto.
        </p>
      </header>

      {/* ESCENARIO HABITA (calculadora) */}
      <ScenarioCalculator reduce={!!reduce} />

      {/* CATÁLOGO POR CATEGORÍA */}
      <div className="space-y-12">
        <div className="space-y-2">
          <p className="label-spec text-steel-400">
            Catálogo · {AUTODESK_PRODUCTS.length} productos
          </p>
          <h3 className="font-display text-2xl text-steel-100">
            Precios públicos del catálogo AEC
          </h3>
        </div>

        {CATEGORY_ORDER.map((category) => {
          const products = PRODUCTS_BY_CATEGORY[category];
          if (!products.length) return null;
          const Icon = CATEGORY_ICON[category];
          return (
            <section key={category} className="space-y-5">
              <header className="flex items-center gap-3">
                <div className="hairline rounded-[var(--radius-spec)] p-2.5">
                  <Icon
                    className="size-4 text-[var(--color-copper)]"
                    strokeWidth={1.5}
                  />
                </div>
                <h4 className="font-display text-lg text-steel-100">
                  {CATEGORY_LABELS[category]}
                </h4>
                <span className="hairline-l h-3" />
                <span className="label-spec text-steel-500">
                  {products.length} producto{products.length === 1 ? "" : "s"}
                </span>
              </header>

              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-hairline)] hairline rounded-[var(--radius-card)] overflow-hidden">
                {products.map((p, i) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    index={i}
                    reduce={!!reduce}
                  />
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      {/* NARRATIVA (contexto) */}
      <Narrative />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Product card                                                                */
/* -------------------------------------------------------------------------- */

function ProductCard({
  product,
  index,
  reduce,
}: {
  product: AutodeskProduct;
  index: number;
  reduce: boolean;
}) {
  const isContactSales = product.pricePerYear === null;
  const showMonthly = product.pricePerMonth !== null;

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{
        duration: 0.5,
        delay: reduce ? 0 : Math.min(index * 0.05, 0.3),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "bg-[var(--color-steel-800)] p-6 flex flex-col gap-4 min-h-[220px]",
        "transition-colors duration-300 hover:bg-[var(--color-steel-700)]",
        product.relevantToHabita && "ring-1 ring-inset ring-[var(--color-copper)]/30",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <h5 className="font-display text-steel-100 text-base leading-tight">
            {product.name}
          </h5>
          <p className="label-spec text-steel-500">
            {product.unit === "enterprise" ? "Enterprise" : `por ${product.unit === "user" ? "usuario" : "proyecto"}`}
          </p>
        </div>
        {product.relevantToHabita ? (
          <span
            className="label-spec text-[var(--color-copper)] shrink-0"
            title="Relevante para el escenario operacional de Habita"
          >
            HABITA
          </span>
        ) : null}
      </div>

      <div>
        {isContactSales ? (
          <p className="text-steel-300 font-display text-xl">
            Contact sales
          </p>
        ) : (
          <div className="flex items-baseline gap-2">
            <p className="text-steel-100 font-display text-spec-price text-2xl tabular-nums">
              {formatUSD(product.pricePerYear ?? 0)}
            </p>
            <span className="label-spec text-steel-500">/año</span>
          </div>
        )}
        {showMonthly ? (
          <p className="label-spec text-steel-500 mt-1">
            ≈ ${product.pricePerMonth} / mes
          </p>
        ) : null}
      </div>

      <p className="text-sm text-steel-300 leading-relaxed flex-1">
        {product.description}
      </p>

      <p
        className={cn(
          "text-xs leading-relaxed hairline-t pt-3 mt-auto",
          product.relevantToHabita
            ? "text-steel-200"
            : "text-steel-400",
        )}
      >
        <span className="label-spec text-steel-500 block mb-1">
          Para Habita
        </span>
        {product.habitaNote}
      </p>
    </motion.li>
  );
}

/* -------------------------------------------------------------------------- */
/* Scenario calculator                                                         */
/* -------------------------------------------------------------------------- */

function ScenarioCalculator({ reduce }: { reduce: boolean }) {
  const max = Math.max(
    ...HABITA_AUTODESK_SCENARIO.map((l) => l.total),
    VIA_HABITA_TOTAL,
  );

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <p className="label-spec text-[var(--color-copper)]">
          Escenario Habita · 50 stakeholders, 6 proyectos
        </p>
        <h3 className="font-display text-2xl text-steel-100 leading-tight max-w-2xl">
          Cuánto costaría ir 100 % Autodesk vs. VIA-HABITA.
        </h3>
        <p className="text-steel-400 text-sm leading-relaxed max-w-2xl">
          Suma de licencias necesarias para operar el flujo BIM completo de
          Habita en el stack completo de Autodesk, comparada con el costo de
          VIA-HABITA para el mismo alcance.
        </p>
      </header>

      <div className="hairline rounded-[var(--radius-card)] bg-[var(--color-steel-800)] overflow-hidden">
        <ul>
          {HABITA_AUTODESK_SCENARIO.map((line, i) => {
            const widthPct = (line.total / max) * 100;
            return (
              <motion.li
                key={line.id}
                initial={reduce ? false : { opacity: 0, x: -16 }}
                whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{
                  duration: 0.5,
                  delay: reduce ? 0 : i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="px-6 lg:px-8 py-5 hairline-b grid md:grid-cols-12 gap-4 items-center"
              >
                <div className="md:col-span-4 space-y-1">
                  <p className="text-steel-100 font-display text-sm leading-tight">
                    {line.label}
                  </p>
                  <p className="label-spec text-steel-500">
                    {formatUSD(line.unitPrice)} × {line.quantity}
                  </p>
                </div>

                <div className="md:col-span-5">
                  <p className="text-xs text-steel-400 leading-relaxed">
                    {line.detail}
                  </p>
                </div>

                <div className="md:col-span-3 space-y-2">
                  <div className="h-1.5 bg-[var(--color-steel-700)] rounded-full overflow-hidden">
                    <motion.div
                      initial={reduce ? { width: `${widthPct}%` } : { width: 0 }}
                      whileInView={reduce ? undefined : { width: `${widthPct}%` }}
                      viewport={{ once: true, margin: "-5% 0px" }}
                      transition={{
                        duration: 0.9,
                        delay: reduce ? 0 : 0.2 + i * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="h-full bg-gradient-to-r from-[var(--color-warning)]/60 to-[var(--color-warning)]"
                    />
                  </div>
                  <p className="text-right font-spec text-spec-price tabular-nums text-sm text-[var(--color-warning)]">
                    {formatUSD(line.total)}
                  </p>
                </div>
              </motion.li>
            );
          })}

          {/* TOTAL Autodesk */}
          <li className="px-6 lg:px-8 py-5 bg-[var(--color-steel-700)]/40 grid md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-9">
              <p className="label-spec text-steel-300">
                Total stack Autodesk · USD / año
              </p>
            </div>
            <div className="md:col-span-3 text-right">
              <p className="font-display text-spec-price text-[var(--color-warning)] text-2xl tabular-nums">
                {formatUSD(HABITA_AUTODESK_TOTAL)}
              </p>
            </div>
          </li>

          {/* VIA-HABITA */}
          <li className="px-6 lg:px-8 py-5 bg-[var(--color-electric)]/[0.06] grid md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-4 space-y-1">
              <p className="text-[var(--color-electric)] font-display text-sm leading-tight">
                VIA-HABITA
              </p>
              <p className="label-spec text-steel-500">
                $2.000 × 6 proyectos
              </p>
            </div>
            <div className="md:col-span-5">
              <p className="text-xs text-steel-400 leading-relaxed">
                Reemplaza la capa de gestión de construcción (Forma Build) y
                añade IA + UI en español. Los consultores externos (RSM,
                Iweise) siguen usando sus propias licencias Revit.
              </p>
            </div>
            <div className="md:col-span-3 space-y-2">
              <div className="h-1.5 bg-[var(--color-steel-700)] rounded-full overflow-hidden">
                <motion.div
                  initial={reduce ? { width: `${(VIA_HABITA_TOTAL / max) * 100}%` } : { width: 0 }}
                  whileInView={
                    reduce ? undefined : { width: `${(VIA_HABITA_TOTAL / max) * 100}%` }
                  }
                  viewport={{ once: true, margin: "-5% 0px" }}
                  transition={{
                    duration: 0.9,
                    delay: reduce ? 0 : 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-full bg-gradient-to-r from-[var(--color-electric)]/80 to-[var(--color-electric)]"
                />
              </div>
              <p className="text-right font-display text-spec-price text-[var(--color-electric)] text-2xl tabular-nums">
                {formatUSD(VIA_HABITA_TOTAL)}
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* SAVINGS callout */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5% 0px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="material-glass-strong chrome-edge p-8 lg:p-10 grid lg:grid-cols-3 gap-8"
      >
        <div className="space-y-2">
          <p className="label-spec text-steel-400">Diferencia anual</p>
          <p className="font-display text-spec-price text-[var(--color-emerald)] text-3xl tabular-nums">
            {formatUSD(HABITA_SAVINGS)}
          </p>
          <p className="text-xs text-steel-500">USD / año</p>
        </div>
        <div className="space-y-2">
          <p className="label-spec text-steel-400">Ratio de costo</p>
          <p className="font-display text-[#0071E3] text-3xl text-spec-price">
            {HABITA_RATIO.toFixed(1)}×
          </p>
          <p className="text-xs text-steel-500">
            VIA-HABITA es {HABITA_RATIO.toFixed(1)} veces más económico para el stack completo
          </p>
        </div>
        <div className="space-y-2">
          <p className="label-spec text-steel-400">Sobre 3 años</p>
          <p className="font-display text-spec-price text-steel-100 text-3xl tabular-nums">
            {formatUSD(HABITA_SAVINGS * 3)}
          </p>
          <p className="text-xs text-steel-500">
            Diferencia acumulada que financia múltiples Fases 1
          </p>
        </div>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Narrative                                                                   */
/* -------------------------------------------------------------------------- */

function Narrative() {
  const points: { icon: typeof CheckCircle2; tone: "neutral" | "warn" | "ok"; title: string; body: string }[] = [
    {
      icon: AlertCircle,
      tone: "warn",
      title: "Múltiples rebrandings",
      body:
        "BIM 360 → Autodesk Construction Cloud (ACC) → Autodesk Forma Build. Cada migración implica recapacitación y, en el caso de PlanGrid, descontinuación forzada del producto que el equipo de Habita usa hoy.",
    },
    {
      icon: AlertCircle,
      tone: "warn",
      title: "PlanGrid discontinuado",
      body:
        "Autodesk adquirió PlanGrid en 2018 y lo descontinuó. Los usuarios actuales son empujados a Forma Build, que cobra $1.400/usuario/año por funcionalidad equivalente.",
    },
    {
      icon: CheckCircle2,
      tone: "ok",
      title: "Las licencias de diseño no son un gasto nuevo",
      body:
        "Los consultores de Habita (RSM, Iweise) ya operan con sus propias licencias Revit/AutoCAD. Habita no necesita comprar herramientas de diseño; necesita la capa de coordinación.",
    },
    {
      icon: CheckCircle2,
      tone: "ok",
      title: "Lo que Habita realmente necesita",
      body:
        "La capa de gestión de construcción (RFIs, submittals, modelo federado, clash, KPIs). Esto es exactamente lo que VIA-HABITA entrega, a una fracción del costo, con propiedad del código y UI en español.",
    },
    {
      icon: CheckCircle2,
      tone: "ok",
      title: "La IA cambió el cálculo",
      body:
        "Construir herramientas a medida del flujo de trabajo específico ya no requiere equipos de 50 ingenieros. Una plataforma propósito-específica puede igualar o superar a un producto enterprise en los casos que importan, sin cargar con todo lo que no se usa.",
    },
    {
      icon: XCircle,
      tone: "neutral",
      title: "Sin trash-talk, solo la cuenta",
      body:
        "Autodesk Forma Build es un producto sólido y muchas empresas grandes lo justifican. Para el caso operacional de Habita (6 proyectos, 50 stakeholders, consultores externos con sus propias licencias), los números son los que se muestran arriba.",
    },
  ];

  return (
    <section className="space-y-8">
      <header className="space-y-2 max-w-3xl">
        <p className="label-spec text-[var(--color-copper)]">Contexto</p>
        <h3 className="font-display text-2xl text-steel-100 leading-tight">
          Por qué los números se ven así.
        </h3>
      </header>

      <ul className="grid md:grid-cols-2 gap-px bg-[var(--color-hairline)] hairline rounded-[var(--radius-card)] overflow-hidden">
        {points.map((p) => {
          const Icon = p.icon;
          const tint =
            p.tone === "warn"
              ? "text-[var(--color-warning)]"
              : p.tone === "ok"
              ? "text-[var(--color-emerald)]"
              : "text-steel-400";
          return (
            <li
              key={p.title}
              className="bg-[var(--color-steel-800)] p-6 lg:p-8 flex items-start gap-4"
            >
              <div className="shrink-0 hairline rounded-[var(--radius-spec)] p-2.5">
                <Icon className={cn("size-4", tint)} strokeWidth={1.5} />
              </div>
              <div className="space-y-2">
                <h4 className="font-display text-steel-100 text-base leading-tight">
                  {p.title}
                </h4>
                <p className="text-sm text-steel-300 leading-relaxed">
                  {p.body}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="text-xs text-steel-500 font-spec leading-relaxed max-w-3xl">
        Notas metodológicas: precios extraídos de autodesk.com/products
        (abril 2026). Los productos &quot;Per User&quot; cobran por usuario
        nominal con licencias anuales. Forma Build Enterprise no tiene precio
        público y requiere proceso de venta directo. Cifras en USD anuales.
      </p>
    </section>
  );
}
