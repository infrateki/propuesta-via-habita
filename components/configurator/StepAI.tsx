"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Network, Sparkles } from "lucide-react";
import type { AILevel, Configuration, PricingBreakdown } from "@/lib/pricing";
import { formatCurrency } from "@/lib/pricing";
import { AI_MODELS, PRICING } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Props = {
  config: Configuration;
  update: <K extends keyof Configuration>(key: K, value: Configuration[K]) => void;
  price: PricingBreakdown;
};

type TierCard = {
  level: AILevel;
  label: string;
  modelName: string;
  speed: string;
  recommendation: string;
  perProjectMonth: number;
};

const haiku = AI_MODELS.find((m) => m.id === "haiku")!;
const sonnet = AI_MODELS.find((m) => m.id === "sonnet")!;
const opus = AI_MODELS.find((m) => m.id === "opus")!;

const TIERS: TierCard[] = [
  {
    level: "none",
    label: "Sin IA adicional",
    modelName: "—",
    speed: "—",
    recommendation:
      "Plataforma sin agente Habi. Trazabilidad y reportes estándar incluidos.",
    perProjectMonth: 0,
  },
  {
    level: "basico",
    label: "Básico",
    modelName: haiku.name,
    speed: haiku.speed,
    recommendation: haiku.recommendation,
    perProjectMonth: haiku.monthlyEstimate,
  },
  {
    level: "intermedio",
    label: "Intermedio",
    modelName: sonnet.name,
    speed: sonnet.speed,
    recommendation: sonnet.recommendation,
    perProjectMonth: sonnet.monthlyEstimate,
  },
  {
    level: "premium",
    label: "Premium",
    modelName: opus.name,
    speed: opus.speed,
    recommendation: opus.recommendation,
    perProjectMonth: opus.monthlyEstimate,
  },
];

export function StepAI({ config, update, price }: Props) {
  const [showCosts, setShowCosts] = useState(false);

  return (
    <section id="ai" className="space-y-6 scroll-mt-36">
      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="label-spec text-[var(--color-electric)]">§03 · INTELIGENCIA</span>
          <span className="hairline-l h-3" />
          <span className="label-spec">Agente Habi · uso medido</span>
        </div>
        <h2 className="text-display-md text-steel-100 font-display">
          Inteligencia Artificial
        </h2>
        <p className="text-sm text-steel-400 max-w-xl">
          Habi es tu agente embebido. Costos por proyecto y mes, escalan con
          el uso real del equipo. Cambia de nivel cuando quieras.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-3">
        {TIERS.map((tier) => {
          const selected = config.aiLevel === tier.level;
          const monthly = tier.perProjectMonth * config.projects;
          return (
            <button
              key={tier.level}
              type="button"
              onClick={() => update("aiLevel", tier.level)}
              aria-pressed={selected}
              className={cn(
                "group text-left p-5 rounded-[var(--radius-card)] border transition-all duration-[var(--duration-fast)] relative",
                selected
                  ? "border-[var(--color-electric)] bg-[var(--color-electric)]/[0.05]"
                  : "border-[var(--color-hairline-strong)] hover:border-steel-400 bg-transparent"
              )}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <p className="label-spec text-steel-400 truncate">
                    {tier.modelName}
                  </p>
                  <p className="text-base text-steel-100 font-display mt-1">
                    {tier.label}
                  </p>
                </div>
                <RadioMark selected={selected} />
              </div>
              <p className="text-sm text-steel-300 leading-relaxed mb-4">
                {tier.recommendation}
              </p>
              <div className="hairline-t pt-3 flex items-baseline justify-between">
                {tier.level === "none" ? (
                  <span className="text-spec-price text-steel-200 tabular-nums">
                    Incluido
                  </span>
                ) : (
                  <>
                    <span className="font-spec text-xs text-steel-500 tabular-nums">
                      ${tier.perProjectMonth} × {config.projects}
                    </span>
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={monthly}
                        initial={{ y: 4, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -4, opacity: 0 }}
                        transition={{ duration: 0.16 }}
                        className="text-spec-price text-steel-100 tabular-nums inline-block"
                      >
                        {formatCurrency(monthly)} / mes
                      </motion.span>
                    </AnimatePresence>
                  </>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setShowCosts(!showCosts)}
        className="flex items-center gap-2 label-spec text-steel-400 hover:text-steel-200 transition-colors min-h-11 px-1 -mx-1"
        aria-expanded={showCosts}
      >
        <ChevronDown
          size={14}
          className={cn(
            "transition-transform duration-[var(--duration-fast)]",
            showCosts && "rotate-180"
          )}
        />
        Ver costos por modelo
      </button>

      <AnimatePresence initial={false}>
        {showCosts && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="hairline rounded-[var(--radius-card)] overflow-hidden">
              <table className="w-full text-sm font-spec tabular-nums">
                <thead>
                  <tr className="bg-[var(--color-steel-700)]/60">
                    <th className="text-left p-2.5 sm:p-3 label-spec text-steel-300">Modelo</th>
                    <th className="text-right p-2.5 sm:p-3 label-spec text-steel-300">
                      Input · 1M tok
                    </th>
                    <th className="text-right p-2.5 sm:p-3 label-spec text-steel-300">
                      Output · 1M tok
                    </th>
                    <th className="text-left p-2.5 sm:p-3 label-spec text-steel-300 hidden md:table-cell">
                      Velocidad
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {AI_MODELS.map((m) => (
                    <tr key={m.id} className="hairline-t">
                      <td className="p-2.5 sm:p-3 text-steel-100">{m.name}</td>
                      <td className="p-2.5 sm:p-3 text-right text-steel-200">
                        ${m.inputCostPer1M.toFixed(2)}
                      </td>
                      <td className="p-2.5 sm:p-3 text-right text-steel-200">
                        ${m.outputCostPer1M.toFixed(2)}
                      </td>
                      <td className="p-2.5 sm:p-3 text-steel-400 hidden md:table-cell">
                        {m.speed}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Knowledge Graph */}
      <button
        type="button"
        onClick={() => update("knowledgeGraph", !config.knowledgeGraph)}
        aria-pressed={config.knowledgeGraph}
        className={cn(
          "w-full text-left p-5 rounded-[var(--radius-card)] border transition-all duration-[var(--duration-fast)]",
          config.knowledgeGraph
            ? "border-[var(--color-electric)] bg-[var(--color-electric)]/[0.05]"
            : "border-[var(--color-hairline-strong)] hover:border-steel-400"
        )}
      >
        <div className="flex items-start gap-4">
          <Network
            size={20}
            className="text-[var(--color-copper)] mt-1 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <p className="text-base text-steel-100 font-display">
                Knowledge Graph
              </p>
              <p className="text-spec-price text-steel-100 tabular-nums">
                {formatCurrency(PRICING.knowledgeGraphSetup)}
              </p>
            </div>
            <p className="label-spec text-steel-500 mt-0.5">
              Setup + Año 1 completo
            </p>
            <p className="text-sm text-steel-400 mt-2 max-w-lg">
              Ontología completa de Habita para consultas semánticas del agente
              Habi · entidades de proyectos, contratos, normativa y modelos.
            </p>
          </div>
          <Toggle on={config.knowledgeGraph} />
        </div>
      </button>

      {price.aiAnnual > 0 && (
        <div className="flex items-center gap-2 label-spec text-steel-500">
          <Sparkles size={12} className="text-[var(--color-copper)]" />
          Estimado IA año 1 ·{" "}
          <span className="text-steel-300 tabular-nums">
            {formatCurrency(price.aiAnnual)}
          </span>
        </div>
      )}
    </section>
  );
}

function RadioMark({ selected }: { selected: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "w-4 h-4 rounded-full border-2 mt-1 shrink-0 transition-colors duration-[var(--duration-fast)]",
        selected
          ? "border-[var(--color-electric)] bg-[var(--color-electric)]"
          : "border-steel-400"
      )}
    />
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "w-10 h-6 rounded-full border relative transition-colors duration-[var(--duration-fast)] shrink-0 mt-1",
        on
          ? "bg-[var(--color-electric)] border-[var(--color-electric)]"
          : "bg-transparent border-steel-400"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-[var(--duration-fast)]",
          on ? "translate-x-[18px]" : "translate-x-0.5"
        )}
      />
    </span>
  );
}
