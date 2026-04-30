"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Users, Layers } from "lucide-react";
import type { Configuration, PricingBreakdown } from "@/lib/pricing";
import { formatCurrency } from "@/lib/pricing";
import { PRICING } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Props = {
  config: Configuration;
  update: <K extends keyof Configuration>(key: K, value: Configuration[K]) => void;
  price: PricingBreakdown;
};

const MIN_PROJECTS = 1;
const MAX_PROJECTS = 15;

export function StepPlatform({ config, update, price }: Props) {
  const projects = config.projects;
  const grossAnnual = projects * PRICING.platformPerProject;
  const fillPercent =
    ((projects - MIN_PROJECTS) / (MAX_PROJECTS - MIN_PROJECTS)) * 100;

  return (
    <section id="plat" className="space-y-6 scroll-mt-36">
      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="label-spec text-[var(--color-electric)]">§02 · PLATAFORMA</span>
          <span className="hairline-l h-3" />
          <span className="label-spec">Año 1 · suscripción anual</span>
        </div>
        <h2 className="text-display-md text-steel-100 font-display">
          Plataforma VIA-HABITA
        </h2>
        <p className="text-sm text-steel-400 max-w-xl">
          Tu propio CDE: sin licencias por usuario, sin vendor lock-in.
          A partir de 10 proyectos activa Plan Enterprise con 20% de descuento.
        </p>
      </header>

      <div className="material-glass-strong chrome-edge p-6 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Layers size={20} className="text-[var(--color-copper)] mt-1 shrink-0" />
            <div className="min-w-0">
              <p className="label-spec text-steel-300">Proyectos activos</p>
              <p className="text-2xl text-steel-100 font-display mt-1 tabular-nums">
                <AnimatedNumber value={projects} />
                <span className="text-base text-steel-400 ml-1">
                  proyecto{projects === 1 ? "" : "s"}
                </span>
              </p>
              <p className="font-spec text-xs text-steel-400 mt-1 tabular-nums">
                {projects} × {formatCurrency(price.platformPerProjectApplied)} / año = {" "}
                <AnimatedDollars value={price.platformAnnual} />
              </p>
            </div>
          </div>
          <p className="text-spec-price text-steel-100 text-xl tabular-nums shrink-0">
            <AnimatedDollars value={grossAnnual} />
          </p>
        </div>

        <div className="space-y-2">
          <input
            type="range"
            min={MIN_PROJECTS}
            max={MAX_PROJECTS}
            value={projects}
            onChange={(e) => update("projects", parseInt(e.target.value))}
            className="config-slider w-full"
            style={{ ["--config-slider-fill" as string]: `${fillPercent}%` }}
            aria-label="Número de proyectos activos"
          />
          <div className="flex justify-between label-spec text-steel-500 select-none">
            <span>1</span>
            <span>5</span>
            <span
              className={cn(
                "transition-colors",
                price.enterpriseActive && "text-[var(--color-emerald)]"
              )}
            >
              10
            </span>
            <span>15</span>
          </div>
        </div>

        <AnimatePresence>
          {price.enterpriseActive && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-between gap-4 px-4 py-3 rounded-[var(--radius-spec)] border border-[var(--color-emerald)]/40 bg-[var(--color-emerald)]/[0.08]"
            >
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-emerald)] animate-pulse" />
                <span className="label-spec text-[var(--color-emerald)]">
                  Plan Enterprise activado · 20% descuento
                </span>
              </div>
              <span className="text-spec-price text-[var(--color-emerald)] text-sm tabular-nums">
                −{formatCurrency(grossAnnual - price.platformAnnual)}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-3 pt-2 hairline-t">
          <Users size={16} className="text-[var(--color-copper)]" />
          <span className="text-sm text-steel-300">
            Usuarios ilimitados incluidos · sin licencias por asiento
          </span>
        </div>
      </div>
    </section>
  );
}

function AnimatedNumber({ value }: { value: number }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -6, opacity: 0 }}
        transition={{ duration: 0.16 }}
        className="inline-block tabular-nums"
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

function AnimatedDollars({ value }: { value: number }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ y: 4, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -4, opacity: 0 }}
        transition={{ duration: 0.16 }}
        className="inline-block tabular-nums"
      >
        {formatCurrency(value)}
      </motion.span>
    </AnimatePresence>
  );
}
