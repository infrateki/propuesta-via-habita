"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Plane, MonitorPlay } from "lucide-react";
import type { Configuration } from "@/lib/pricing";
import { formatCurrency } from "@/lib/pricing";
import { PRICING } from "@/lib/constants";

type Props = {
  config: Configuration;
  update: <K extends keyof Configuration>(key: K, value: Configuration[K]) => void;
};

const MAX_VISITS = 5;

export function StepImplementation({ config, update }: Props) {
  const visits = config.additionalVisits;
  const visitsTotal = visits * PRICING.visitCost;

  const dec = () => update("additionalVisits", Math.max(0, visits - 1));
  const inc = () => update("additionalVisits", Math.min(MAX_VISITS, visits + 1));

  return (
    <section id="impl" className="space-y-6 scroll-mt-36">
      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="label-spec text-[var(--color-electric)]">§01 · IMPLEMENTACIÓN</span>
          <span className="hairline-l h-3" />
          <span className="label-spec">4 meses · 9 entregables</span>
        </div>
        <h2 className="text-display-md text-steel-100 font-display">
          Implementación BIM
        </h2>
        <p className="text-sm text-steel-400 max-w-xl">
          Auditoría operacional, estándares ISO 19650 adaptados a Habita,
          modelo piloto y handover. Equipo INFRATEK desde Puerto Rico.
        </p>
      </header>

      <div className="material-glass-strong chrome-edge p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <MonitorPlay size={20} className="text-[var(--color-copper)] mt-1 shrink-0" />
            <div>
              <p className="label-spec text-steel-300">Modalidad base · incluida</p>
              <p className="text-base text-steel-100 font-display mt-1">
                100% Virtual
              </p>
              <p className="text-sm text-steel-400 mt-1.5 max-w-md">
                Onboarding, capacitación y entregables vía videollamada y plataforma.
                Misma calidad sin sumar costos de viaje.
              </p>
            </div>
          </div>
          <p className="text-spec-price text-steel-100 text-xl tabular-nums shrink-0">
            {formatCurrency(PRICING.implementation)}
          </p>
        </div>
      </div>

      <div className="hairline rounded-[var(--radius-card)] p-6 space-y-5">
        <div className="flex items-start gap-3">
          <Plane size={18} className="text-[var(--color-copper)] mt-1 shrink-0" />
          <div className="flex-1">
            <p className="label-spec text-steel-300">Add-on · opcional</p>
            <p className="text-base text-steel-100 mt-1">
              Visitas presenciales a La Serena
            </p>
            <p className="text-sm text-steel-400 mt-1.5 max-w-md">
              Sesiones de trabajo on-site con el equipo extendido. Pasajes y
              viáticos incluidos · {formatCurrency(PRICING.visitCost)} c/u.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 pt-4 hairline-t">
          <span className="label-spec text-steel-300">Visitas adicionales</span>
          <div className="flex items-center gap-3">
            <Stepper
              onClick={dec}
              disabled={visits === 0}
              label="Quitar visita"
              icon={<Minus size={14} />}
            />
            <AnimatePresence mode="popLayout">
              <motion.span
                key={visits}
                initial={{ y: 6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -6, opacity: 0 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="font-spec text-steel-100 w-6 text-center tabular-nums"
              >
                {visits}
              </motion.span>
            </AnimatePresence>
            <Stepper
              onClick={inc}
              disabled={visits === MAX_VISITS}
              label="Agregar visita"
              icon={<Plus size={14} />}
            />
          </div>
        </div>

        <AnimatePresence>
          {visits > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="flex items-baseline justify-between text-sm font-spec hairline-t pt-3">
                <span className="text-steel-400">Subtotal visitas</span>
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={visitsTotal}
                    initial={{ y: 4, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -4, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="text-steel-100 tabular-nums inline-block"
                  >
                    {formatCurrency(visitsTotal)}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Stepper({
  onClick,
  disabled,
  label,
  icon,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="w-11 h-11 hairline rounded-[var(--radius-spec)] flex items-center justify-center text-steel-200 hover:text-steel-100 hover:border-[var(--color-electric)] transition-colors duration-[var(--duration-fast)] disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:border-[var(--color-hairline)]"
    >
      {icon}
    </button>
  );
}
