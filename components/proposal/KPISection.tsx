"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { KPIS } from "@/data/proposal";
import { cn } from "@/lib/utils";

export function KPISection() {
  const reduce = useReducedMotion();

  return (
    <SectionShell
      id="kpis"
      num="06"
      eyebrow="KPIs · Habita hoy → Mes 4"
      title={
        <>
          Métricas auditables
          <br />
          <span className="text-steel-300">al cierre del proyecto.</span>
        </>
      }
      lede="Siete indicadores con baseline y meta. Se miden con el mismo instrumento del Diagnóstico BIM 2.0 y se reportan en el informe E-09."
    >
      <div className="hairline rounded-[var(--radius-card)] overflow-hidden">
        {/* header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 lg:px-8 py-4 bg-[var(--color-steel-700)]/40 hairline-b">
          <div className="col-span-4">
            <span className="label-spec text-steel-400">Métrica</span>
          </div>
          <div className="col-span-3">
            <span className="label-spec text-steel-400">Habita hoy</span>
          </div>
          <div className="col-span-1" />
          <div className="col-span-4">
            <span className="label-spec text-[var(--color-copper)]">Habita Mes 4</span>
          </div>
        </div>

        <ul>
          {KPIS.map((k, i) => (
            <KPIRow key={k.id} kpi={k} index={i} reduce={!!reduce} />
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}

function KPIRow({
  kpi,
  index,
  reduce,
}: {
  kpi: (typeof KPIS)[number];
  index: number;
  reduce: boolean;
}) {
  // Bars are scaled vs the larger of (before, after) to stay visually honest.
  const max = Math.max(kpi.beforePct, kpi.afterPct, 1);
  const beforeWidth = (kpi.beforePct / max) * 100;
  const afterWidth = (kpi.afterPct / max) * 100;

  // For metrics where "lower is better" (RFIs), invert color logic visually:
  // - we still grow the bar from 0, but the AFTER bar uses emerald regardless,
  //   because reaching the post-state is the win, independent of direction.
  const lowerIsBetter = kpi.id === "rfis";

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 8 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{
        duration: 0.5,
        delay: reduce ? 0 : index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="grid md:grid-cols-12 gap-4 px-6 lg:px-8 py-6 hairline-b last:border-b-0 hover:bg-[var(--color-steel-700)]/30 transition-colors"
    >
      {/* Metric name */}
      <div className="md:col-span-4 space-y-1 md:self-center">
        <p className="text-steel-100 font-display text-base leading-tight">
          {kpi.metric}
        </p>
        {kpi.unit ? (
          <p className="label-spec text-steel-500">unidad: {kpi.unit}</p>
        ) : null}
      </div>

      {/* Before */}
      <div className="md:col-span-3 space-y-2 md:self-center">
        <div className="md:hidden label-spec text-steel-500">Habita hoy</div>
        <p className="text-steel-200 font-spec text-sm">{kpi.before}</p>
        <div className="h-1.5 bg-[var(--color-steel-700)] rounded-full overflow-hidden">
          <motion.div
            initial={reduce ? { width: `${beforeWidth}%` } : { width: 0 }}
            whileInView={reduce ? undefined : { width: `${beforeWidth}%` }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{
              duration: 0.7,
              delay: reduce ? 0 : 0.2 + index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn(
              "h-full rounded-full",
              lowerIsBetter
                ? "bg-[var(--color-warning)]/70"
                : "bg-[var(--color-steel-500)]"
            )}
          />
        </div>
      </div>

      {/* arrow */}
      <div className="hidden md:flex md:col-span-1 items-center justify-center">
        <ArrowRight
          className="size-4 text-steel-500"
          strokeWidth={1.5}
        />
      </div>

      {/* After */}
      <div className="md:col-span-4 space-y-2 md:self-center">
        <div className="md:hidden label-spec text-[var(--color-copper)]">
          Habita Mes 4
        </div>
        <p className="text-[var(--color-copper)] font-spec text-sm">
          {kpi.after}
        </p>
        <div className="h-1.5 bg-[var(--color-steel-700)] rounded-full overflow-hidden">
          <motion.div
            initial={reduce ? { width: `${afterWidth}%` } : { width: 0 }}
            whileInView={reduce ? undefined : { width: `${afterWidth}%` }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{
              duration: 0.9,
              delay: reduce ? 0 : 0.4 + index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn(
              "h-full rounded-full",
              "bg-gradient-to-r from-[var(--color-emerald)] to-[var(--color-copper)]"
            )}
          />
        </div>
      </div>
    </motion.li>
  );
}
