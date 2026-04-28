"use client";

import Link from "next/link";
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, DollarSign, ListChecks, Building2 } from "lucide-react";
import { ComparisonTable } from "@/components/comparison/ComparisonTable";
import { CostChart } from "@/components/comparison/CostChart";
import { FeatureMatrix } from "@/components/comparison/FeatureMatrix";
import { AutodeskCosts } from "@/components/comparison/AutodeskCosts";
import { cn } from "@/lib/utils";

type TabId = "precios" | "funcionalidades" | "autodesk";

const TABS: { id: TabId; label: string; icon: typeof DollarSign }[] = [
  { id: "precios", label: "Precios", icon: DollarSign },
  { id: "funcionalidades", label: "Funcionalidades", icon: ListChecks },
  { id: "autodesk", label: "Costos Autodesk", icon: Building2 },
];

export default function ComparativoPage() {
  const [active, setActive] = useState<TabId>("precios");
  const reduce = useReducedMotion();

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
          <div className="flex items-center gap-3 mb-8">
            <span className="label-spec text-[var(--color-copper)]">§CMP</span>
            <span className="hairline-l h-3" />
            <span className="label-spec">Comparativo de plataformas</span>
          </div>
          <h1 className="text-display-lg text-steel-100 font-display max-w-3xl">
            Precios y funcionalidades ·
            <br />
            <span className="text-steel-300">decisión informada para Habita.</span>
          </h1>
          <p className="text-steel-300 mt-6 max-w-2xl text-base leading-relaxed">
            Dos vistas paralelas: cuánto cuesta cada plataforma para 50
            stakeholders, y qué funcionalidades ofrece. Datos extraídos de
            pricing público y documentación técnica de cada vendor.
          </p>
        </div>
      </section>

      {/* TABS — sticky below navbar */}
      <div
        role="tablist"
        aria-label="Vista comparativa"
        className="sticky top-14 z-30 hairline-b material-glass"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center gap-1 overflow-x-auto">
          {TABS.map((t) => {
            const isActive = t.id === active;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${t.id}`}
                id={`tab-${t.id}`}
                onClick={() => setActive(t.id)}
                className={cn(
                  "relative inline-flex items-center gap-2.5",
                  "px-5 py-4 min-h-[44px]",
                  "text-sm font-medium tracking-wide",
                  "transition-colors duration-[var(--duration-fast)]",
                  "focus:outline-none focus-visible:bg-[var(--color-steel-700)]/40",
                  isActive
                    ? "text-[#0071E3]"
                    : "text-steel-400 hover:text-steel-100"
                )}
              >
                <Icon className="size-4" strokeWidth={1.75} />
                <span>{t.label}</span>
                {isActive ? (
                  <motion.span
                    layoutId="comparativo-tab-underline"
                    aria-hidden
                    className="absolute inset-x-2 -bottom-px h-[2px] bg-[#0071E3]"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* PANELS */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          id={`panel-${active}`}
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {active === "precios" ? (
            <PreciosPanel />
          ) : active === "funcionalidades" ? (
            <FuncionalidadesPanel />
          ) : (
            <AutodeskPanel />
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Tab 1 — Precios                                                             */
/* -------------------------------------------------------------------------- */

function PreciosPanel() {
  return (
    <>
      <section>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
          <ComparisonTable />
        </div>
      </section>

      <section className="hairline-t">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24">
          <CostChart />
        </div>
      </section>

      <section className="hairline-t">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28">
          <div className="material-glass-strong chrome-edge p-8 lg:p-14 grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-5">
              <p className="label-spec text-[var(--color-copper)]">
                Resumen ejecutivo · 50 stakeholders
              </p>
              <p className="font-display text-steel-100 leading-tight text-display-lg">
                VIA-HABITA es{" "}
                <span className="text-[#0071E3] text-spec-price">5.8×</span>{" "}
                más económico que Autodesk Forma Build.
              </p>
              <p className="text-steel-300 max-w-2xl leading-relaxed">
                $12.000 vs $70.000 anuales para el mismo alcance funcional, con
                usuarios ilimitados incluidos y propiedad total del código.
                Sobre 3 años, la diferencia equivale a varias veces el costo
                completo de la Fase 1.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                href="/configurador"
                className="inline-flex items-center gap-3 material-glass-strong chrome-edge px-7 py-4 label-spec text-steel-100 hover:text-[var(--color-copper)] transition-colors group"
              >
                <span>Configura tu plan</span>
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>

          <p className="text-xs text-steel-500 font-spec mt-6 max-w-3xl leading-relaxed">
            Notas metodológicas: precios extraídos de pricing público o cotización
            directa al vendor (abril 2026). Modelos &quot;por valor de proyecto&quot;
            asumen cartera de 6 proyectos activos. La columna &quot;5 usuarios&quot;
            modela escenarios de equipo reducido — los modelos por proyecto no
            varían con el número de usuarios.
          </p>
        </div>
      </section>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Tab 2 — Funcionalidades                                                     */
/* -------------------------------------------------------------------------- */

function FuncionalidadesPanel() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
        <FeatureMatrix />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Tab 3 — Costos Autodesk                                                     */
/* -------------------------------------------------------------------------- */

function AutodeskPanel() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
        <AutodeskCosts />
      </div>
    </section>
  );
}
