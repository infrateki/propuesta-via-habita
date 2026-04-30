"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { ListChecks, Layers } from "lucide-react";
import { ComparativoNarrative } from "@/components/comparison/ComparativoNarrative";
import { FeatureMatrix } from "@/components/comparison/FeatureMatrix";
import { cn } from "@/lib/utils";

type TabId = "comparativo" | "funcionalidades";

const TABS: { id: TabId; label: string; icon: typeof Layers }[] = [
  { id: "comparativo", label: "Comparativo", icon: Layers },
  { id: "funcionalidades", label: "Funcionalidades", icon: ListChecks },
];

export default function ComparativoPage() {
  const [active, setActive] = useState<TabId>("comparativo");
  const reduce = useReducedMotion();

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
          <div className="flex items-center gap-3 mb-8">
            <span className="label-spec text-[var(--color-copper)]">§CMP</span>
            <span className="hairline-l h-3" />
            <span className="label-spec">Comparativo · 3 escenarios</span>
          </div>
          <h1 className="text-display-lg text-steel-100 font-display max-w-3xl">
            Del diagnóstico al escenario real ·
            <br />
            <span className="text-steel-300">por qué el costo cambia con la escala.</span>
          </h1>
          <p className="text-steel-300 mt-6 max-w-2xl text-base leading-relaxed">
            Cinco secciones que arman el argumento: el diagnóstico, el escenario
            de hoy (10 usuarios — donde Autodesk es más barato), por qué eso es
            repetir el fracaso de PlanGrid, el escenario real (100 usuarios) y
            las ventajas que sólo VIA-HABITA ofrece.
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
                    : "text-steel-400 hover:text-steel-100",
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
          {active === "comparativo" ? (
            <ComparativoPanel />
          ) : (
            <FuncionalidadesPanel />
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Tab 1 — Comparativo (5-section narrative, primary view)                     */
/* -------------------------------------------------------------------------- */

function ComparativoPanel() {
  return (
    <section>
      <div className="py-14 lg:py-20">
        <ComparativoNarrative />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Tab 2 — Funcionalidades (full 156-feature matrix, secondary view)           */
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
