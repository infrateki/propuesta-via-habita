"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  animate,
} from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronRight,
  FileSearch,
  TrendingDown,
  Sparkles,
  Users,
} from "lucide-react";
import {
  HABITA_TEAM_BREAKDOWN,
  HABITA_TEAM_TOTAL_DISPLAY,
  HABITA_TEAM_TOTAL_MAX,
  SCENARIO_CURRENT,
  SCENARIO_DIAGNOSTIC,
  SCENARIO_REAL,
  SCENARIO_WHY_10_FAILS,
  VIA_HABITA_EXCLUSIVES,
  ratio,
  type ScenarioCard,
} from "@/data/comparison-scenarios";
import { formatUSD, cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ========================================================================== */
/* Top-level narrative                                                         */
/* ========================================================================== */

export function ComparativoNarrative() {
  return (
    <div className="space-y-24 lg:space-y-32">
      <DiagnosticSection />
      <CurrentScenarioSection />
      <WhyTenFailsSection />
      <RealScenarioSection />
      <ExclusivesSection />
    </div>
  );
}

/* ========================================================================== */
/* Section 01: Diagnóstico                                                     */
/* ========================================================================== */

function DiagnosticSection() {
  const reduce = useReducedMotion();
  return (
    <SectionFrame
      number={SCENARIO_DIAGNOSTIC.number}
      eyebrow={SCENARIO_DIAGNOSTIC.eyebrow}
      title={SCENARIO_DIAGNOSTIC.title}
      icon={FileSearch}
    >
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-5">
          {SCENARIO_DIAGNOSTIC.body.map((p, i) => (
            <motion.p
              key={i}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              className="text-steel-300 leading-relaxed text-base"
            >
              {p}
            </motion.p>
          ))}
        </div>

        <div className="lg:col-span-5 grid grid-cols-2 gap-px bg-[var(--color-hairline)] hairline rounded-[var(--radius-card)] overflow-hidden self-start">
          {SCENARIO_DIAGNOSTIC.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: EASE }}
              className={cn(
                "bg-[var(--color-steel-800)] p-5 lg:p-6 space-y-1.5",
                i === SCENARIO_DIAGNOSTIC.stats.length - 1 && "col-span-2",
              )}
            >
              <p className="font-display text-spec-price text-steel-100 text-2xl lg:text-3xl tabular-nums">
                {s.value}
              </p>
              <p className="label-spec text-steel-400">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

/* ========================================================================== */
/* Section 02: Escenario actual (Autodesk wins on price)                       */
/* ========================================================================== */

function CurrentScenarioSection() {
  return (
    <SectionFrame
      number={SCENARIO_CURRENT.number}
      eyebrow={SCENARIO_CURRENT.eyebrow}
      title={SCENARIO_CURRENT.title}
      icon={Users}
      tone="warn"
    >
      <ScenarioCostGrid scenario={SCENARIO_CURRENT} />

      {/* Provocative question */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="material-glass-strong chrome-edge p-7 lg:p-9 mt-8"
      >
        <div className="flex items-start gap-4">
          <div className="hairline rounded-[var(--radius-spec)] p-2.5 shrink-0">
            <AlertTriangle
              className="size-4 text-[var(--color-warning)]"
              strokeWidth={1.5}
            />
          </div>
          <div className="space-y-2">
            <p className="label-spec text-[var(--color-warning)]">
              La pregunta natural es
            </p>
            <p className="font-display text-steel-100 text-xl lg:text-2xl leading-snug">
              ¿Por $2.000 menos al año, no conviene irse con Autodesk?
            </p>
            <p className="text-steel-400 text-sm leading-relaxed">
              La respuesta corta: si la pregunta fuera sólo de precio, sí.
              Pero el precio supone que 10 usuarios es el escenario correcto,
              y ese supuesto es el que limitó la experiencia con PlanGrid.
            </p>
          </div>
        </div>
      </motion.div>
    </SectionFrame>
  );
}

/* ========================================================================== */
/* Section 03: Por qué 10 no funciona                                          */
/* ========================================================================== */

function WhyTenFailsSection() {
  const reduce = useReducedMotion();

  return (
    <SectionFrame
      number={SCENARIO_WHY_10_FAILS.number}
      eyebrow={SCENARIO_WHY_10_FAILS.eyebrow}
      title={SCENARIO_WHY_10_FAILS.title}
      icon={TrendingDown}
      tone="danger"
    >
      <ul className="grid sm:grid-cols-2 gap-px bg-[var(--color-hairline)] hairline rounded-[var(--radius-card)] overflow-hidden">
        {SCENARIO_WHY_10_FAILS.reasons.map((r, i) => (
          <motion.li
            key={r.headline}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
            className="bg-[var(--color-steel-800)] p-6 lg:p-7 flex items-start gap-4"
          >
            <span
              className="font-display text-[var(--color-warning)] text-xl tabular-nums shrink-0 mt-0.5"
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="space-y-2">
              <h4 className="font-display text-steel-100 text-base leading-tight">
                {r.headline}
              </h4>
              <p className="text-sm text-steel-300 leading-relaxed">
                {r.detail}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </SectionFrame>
  );
}

/* ========================================================================== */
/* Section 04: Escenario real 100 usuarios (VIA wins decisively)               */
/* ========================================================================== */

function RealScenarioSection() {
  const reduce = useReducedMotion();
  const r = ratio(SCENARIO_REAL.costs![0].autodesk, SCENARIO_REAL.costs![0].viaHabita);

  return (
    <SectionFrame
      number={SCENARIO_REAL.number}
      eyebrow={SCENARIO_REAL.eyebrow}
      title={SCENARIO_REAL.title}
      icon={Users}
      tone="electric"
    >
      {/* Team breakdown */}
      <div className="space-y-5">
        <header className="flex items-center gap-3">
          <span className="label-spec text-steel-400">El equipo real</span>
          <span className="hairline-l h-3" />
          <span className="label-spec text-steel-500">
            {HABITA_TEAM_TOTAL_DISPLAY} personas que tocan los proyectos
          </span>
        </header>

        <div className="hairline rounded-[var(--radius-card)] bg-[var(--color-steel-800)] overflow-hidden">
          <ul>
            {HABITA_TEAM_BREAKDOWN.map((row, i) => (
              <motion.li
                key={row.area}
                initial={reduce ? false : { opacity: 0, x: -12 }}
                whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                className="grid grid-cols-[auto_1fr_auto] gap-4 lg:gap-6 items-baseline px-6 lg:px-8 py-4 hairline-b last:border-b-0"
              >
                <span className="label-spec text-[var(--color-copper)] tabular-nums w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="space-y-1 min-w-0">
                  <p className="text-steel-100 font-display text-base leading-tight">
                    {row.area}
                  </p>
                  {row.detail ? (
                    <p className="label-spec text-steel-500">{row.detail}</p>
                  ) : null}
                </div>
                <p className="font-spec text-spec-price text-steel-100 text-xl tabular-nums">
                  {row.peopleDisplay ?? row.people}
                </p>
              </motion.li>
            ))}
            <li className="grid grid-cols-[auto_1fr_auto] gap-4 lg:gap-6 items-baseline px-6 lg:px-8 py-4 bg-[var(--color-steel-700)]/40">
              <span className="label-spec text-steel-300 w-8">Σ</span>
              <p className="label-spec text-steel-200">Total usuarios reales</p>
              <p className="font-display text-[var(--color-electric)] text-spec-price text-2xl tabular-nums">
                {HABITA_TEAM_TOTAL_DISPLAY}
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Cost comparison at scale */}
      <div className="mt-12 space-y-5">
        <header className="flex items-center gap-3">
          <span className="label-spec text-steel-400">El costo a escala real</span>
          <span className="hairline-l h-3" />
          <span className="label-spec text-steel-500">100 usuarios · 6 proyectos</span>
        </header>

        <ScenarioCostGrid scenario={SCENARIO_REAL} />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="material-glass-strong chrome-edge p-7 lg:p-9"
        >
          <div className="flex items-start gap-4">
            <div className="hairline rounded-[var(--radius-spec)] p-2.5 shrink-0">
              <ArrowRight
                className="size-4 text-[var(--color-electric)]"
                strokeWidth={1.5}
              />
            </div>
            <div className="space-y-2">
              <p className="label-spec text-[var(--color-electric)]">
                Conclusión
              </p>
              <p className="font-display text-steel-100 text-xl lg:text-2xl leading-snug">
                A escala real, VIA-HABITA cuesta{" "}
                <span className="text-[var(--color-electric)] text-spec-price">
                  menos del 5 %
                </span>{" "}
                de Autodesk Forma Build,{" "}
                <span className="text-[var(--color-electric)] text-spec-price">
                  {r.toFixed(1)}×
                </span>{" "}
                más económico, con usuarios ilimitados que cubren al trazador
                y a los subcontratistas.
              </p>
              <p className="text-steel-400 text-sm leading-relaxed">
                La diferencia anual financia la totalidad de la Fase 1{" "}
                {Math.floor(
                  (SCENARIO_REAL.costs![0].autodesk - SCENARIO_REAL.costs![0].viaHabita) / 12_500,
                )}{" "}
                veces, cada año.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionFrame>
  );
}

/* ========================================================================== */
/* Section 05: Ventajas exclusivas                                             */
/* ========================================================================== */

function ExclusivesSection() {
  const reduce = useReducedMotion();

  return (
    <SectionFrame
      number="05"
      eyebrow="Ventajas exclusivas"
      title="Cosas que VIA-HABITA hace y Autodesk no."
      icon={Sparkles}
      tone="electric"
    >
      <p className="text-steel-300 leading-relaxed max-w-3xl mb-8">
        Más allá del costo, hay módulos pensados para el flujo específico
        de Habita que no están en el catálogo estándar de un producto SaaS
        genérico. Estos no se miden en precio, se miden en información que
        antes no existía.
      </p>

      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-hairline)] hairline rounded-[var(--radius-card)] overflow-hidden">
        {VIA_HABITA_EXCLUSIVES.map((f, i) => (
          <motion.li
            key={f.title}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
            className="bg-[var(--color-steel-800)] p-6 lg:p-7 space-y-3 min-h-[180px]"
          >
            <div className="hairline rounded-[var(--radius-spec)] inline-flex p-2">
              <Check
                className="size-3.5 text-[var(--color-electric)]"
                strokeWidth={2}
              />
            </div>
            <h4 className="font-display text-steel-100 text-base leading-tight">
              {f.title}
            </h4>
            <p className="text-sm text-steel-300 leading-relaxed">
              {f.description}
            </p>
          </motion.li>
        ))}
      </ul>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mt-10 flex flex-wrap items-center gap-3 hairline-t pt-8"
      >
        <a
          href="/configurador"
          className="inline-flex items-center gap-3 material-glass-strong chrome-edge px-7 py-4 label-spec text-steel-100 hover:text-[var(--color-electric)] transition-colors group"
        >
          <span>Configura tu plan</span>
          <ChevronRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.5}
          />
        </a>
        <a
          href="/propuesta"
          className="inline-flex items-center gap-2 px-6 py-3.5 label-spec text-steel-300 hover:text-steel-100 transition-colors hairline rounded-[var(--radius-spec)]"
        >
          Ver propuesta completa
        </a>
      </motion.div>
    </SectionFrame>
  );
}

/* ========================================================================== */
/* Helpers                                                                     */
/* ========================================================================== */

type Tone = "default" | "warn" | "danger" | "electric";

function SectionFrame({
  number,
  eyebrow,
  title,
  icon: Icon,
  tone = "default",
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  tone?: Tone;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const accent =
    tone === "warn"
      ? "var(--color-warning)"
      : tone === "danger"
      ? "var(--color-warning)"
      : tone === "electric"
      ? "var(--color-electric)"
      : "var(--color-copper)";

  return (
    <section className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.header
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="space-y-4 mb-10 lg:mb-12"
        >
          <div className="flex items-center gap-3">
            <span
              className="font-display text-spec-price tabular-nums text-2xl lg:text-3xl"
              style={{ color: accent }}
            >
              {number}
            </span>
            <span
              className="hairline-l h-3"
              style={{ borderColor: accent, opacity: 0.4 }}
            />
            <span className="label-spec text-steel-400">{eyebrow}</span>
            <Icon
              className="size-4 text-steel-500 ml-auto hidden sm:block"
              strokeWidth={1.5}
            />
          </div>
          <h2 className="font-display text-display-md lg:text-display-lg text-steel-100 leading-tight max-w-4xl">
            {title}
          </h2>
        </motion.header>

        {children}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* ScenarioCostGrid: side-by-side cards, VIA vs Autodesk                       */
/* -------------------------------------------------------------------------- */

function ScenarioCostGrid({ scenario }: { scenario: ScenarioCard }) {
  if (!scenario.costs) return null;

  const headline = scenario.costs[0]; // first row is the anchor (annual cost)
  const winnerIsAutodesk = scenario.winner === "autodesk";
  const winnerIsVia = scenario.winner === "via-habita";

  return (
    <div className="grid lg:grid-cols-2 gap-px bg-[var(--color-hairline)] hairline rounded-[var(--radius-card)] overflow-hidden">
      {/* Autodesk card */}
      <CostColumn
        platform="Autodesk Forma Build"
        sublabel="Plataforma del vendor"
        headlineValue={headline.autodesk}
        headlineDetail={headline.autodeskDetail}
        rows={scenario.costs.slice(1).map((c) => ({
          label: c.label,
          value: c.autodesk,
          format: numericFormatFor(c.label),
        }))}
        accent={winnerIsAutodesk ? "emerald" : "muted"}
        winnerLabel={winnerIsAutodesk ? "MÁS BARATO" : undefined}
      />

      {/* VIA-HABITA card */}
      <CostColumn
        platform="VIA-HABITA"
        sublabel="Plataforma propia · usuarios ilimitados"
        headlineValue={headline.viaHabita}
        headlineDetail={headline.viaHabitaDetail}
        rows={scenario.costs.slice(1).map((c) => ({
          label: c.label,
          value: c.viaHabita,
          format: numericFormatFor(c.label),
        }))}
        accent={winnerIsVia ? "electric" : "muted"}
        winnerLabel={winnerIsVia ? "10× MÁS ECONÓMICO" : undefined}
      />
    </div>
  );
}

type CostColumnAccent = "electric" | "emerald" | "muted";

function numericFormatFor(label: string): "currency" | "integer" {
  // "Usuarios incluidos" is an integer, not a USD amount.
  if (/usuario/i.test(label) && !/costo/i.test(label)) return "integer";
  return "currency";
}

function CostColumn({
  platform,
  sublabel,
  headlineValue,
  headlineDetail,
  rows,
  accent,
  winnerLabel,
}: {
  platform: string;
  sublabel: string;
  headlineValue: number;
  headlineDetail?: string;
  rows: { label: string; value: number; format: "currency" | "integer" }[];
  accent: CostColumnAccent;
  winnerLabel?: string;
}) {
  const isMuted = accent === "muted";
  const colorClass =
    accent === "electric"
      ? "text-[var(--color-electric)]"
      : accent === "emerald"
      ? "text-[var(--color-emerald)]"
      : "text-steel-200";

  const ringClass =
    accent === "electric"
      ? "ring-1 ring-inset ring-[var(--color-electric)]/40"
      : accent === "emerald"
      ? "ring-1 ring-inset ring-[var(--color-emerald)]/40"
      : "";

  return (
    <div
      className={cn(
        "relative bg-[var(--color-steel-800)] p-7 lg:p-10 space-y-6 min-h-[260px]",
        ringClass,
      )}
    >
      {winnerLabel ? (
        <span
          className={cn(
            "absolute top-5 right-5 label-spec rounded-full px-3 py-1.5",
            accent === "electric"
              ? "bg-[var(--color-electric)]/10 text-[var(--color-electric)]"
              : "bg-[var(--color-emerald)]/10 text-[var(--color-emerald)]",
          )}
        >
          {winnerLabel}
        </span>
      ) : null}

      <div className="space-y-1.5">
        <h3 className="font-display text-steel-100 text-xl lg:text-2xl leading-tight">
          {platform}
        </h3>
        <p className="label-spec text-steel-500">{sublabel}</p>
      </div>

      <div className="space-y-2">
        <p className="label-spec text-steel-400">Costo anual</p>
        <p
          className={cn(
            "font-display text-spec-price tabular-nums text-4xl lg:text-5xl leading-none",
            colorClass,
          )}
        >
          <AnimatedNumber
            value={headlineValue}
            format="currency"
            duration={1.0}
          />
        </p>
        {headlineDetail ? (
          <p className="text-xs text-steel-500 leading-relaxed">
            {headlineDetail}
          </p>
        ) : null}
      </div>

      {rows.length ? (
        <ul className="hairline-t pt-5 space-y-3">
          {rows.map((r) => (
            <li key={r.label} className="flex items-baseline justify-between gap-4">
              <span className="label-spec text-steel-400">{r.label}</span>
              <span
                className={cn(
                  "font-spec text-spec-price text-base tabular-nums",
                  isMuted ? "text-steel-200" : colorClass,
                )}
              >
                <AnimatedNumber value={r.value} format={r.format} duration={0.8} />
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* AnimatedNumber: counts up to value when in view                             */
/* -------------------------------------------------------------------------- */

function AnimatedNumber({
  value,
  format = "currency",
}: {
  value: number;
  format?: "currency" | "integer";
  /** Kept for backward compatibility; intentionally ignored. The
   *  CountUp animation was removed because hydration showed $0 on first
   *  paint before the in-view trigger fired. SSR now renders the final
   *  number directly. */
  duration?: number;
}) {
  const text =
    format === "currency"
      ? formatUSD(Math.round(value))
      : Math.round(value).toLocaleString("en-US");
  return <span>{text}</span>;
}
