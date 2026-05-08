"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUp,
  ArrowRight,
  MessageCircle,
  Calendar,
  Download,
} from "lucide-react";
import type { Configuration, PricingBreakdown } from "@/lib/pricing";
import { formatCurrency } from "@/lib/pricing";
import { cn } from "@/lib/utils";

const ANTICIPO = 4_500;

type Props = {
  config: Configuration;
  price: PricingBreakdown;
};

export function PriceSummary({ config, price }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Desktop sticky sidebar */}
      <aside className="hidden lg:block sticky top-32" aria-label="Resumen de precio">
        <SummaryCard config={config} price={price} />
      </aside>

      {/* Mobile bottom sheet */}
      <div
        className="lg:hidden fixed inset-x-0 bottom-0 z-30 pointer-events-none"
        aria-label="Resumen de precio (móvil)"
      >
        <div className="material-glass-strong border-t border-[var(--color-hairline-strong)] pointer-events-auto">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="w-full px-5 py-4 flex items-center justify-between gap-3"
            aria-expanded={expanded}
            aria-controls="mobile-summary-detail"
          >
            <div className="text-left min-w-0">
              <p className="label-spec text-steel-400">Estimado Año 1</p>
              <p className="text-spec-price text-steel-100 text-xl tabular-nums leading-tight mt-0.5">
                <AnimatedDollarsLg value={price.totalYear1} />
              </p>
            </div>
            <span className="flex items-center gap-2 label-spec text-[var(--color-electric)] shrink-0">
              {expanded ? "Cerrar" : "Ver detalle"}
              <ChevronUp
                size={14}
                className={cn(
                  "transition-transform duration-[var(--duration-fast)]",
                  !expanded && "rotate-180"
                )}
              />
            </span>
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                id="mobile-summary-detail"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="max-h-[78vh] overflow-y-auto px-5 pb-5">
                  <SummaryCard config={config} price={price} compact />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

function SummaryCard({
  config,
  price,
  compact,
}: Props & { compact?: boolean }) {
  const platformGross = config.projects * 2000;

  return (
    <div
      className={cn(
        "space-y-5",
        !compact && "material-glass-strong chrome-edge p-6"
      )}
    >
      <header className="flex items-center justify-between">
        <span className="label-spec text-[var(--color-electric)]">RESUMEN</span>
        <span className="label-spec text-steel-400">USD · Año 1</span>
      </header>

      <ul className="space-y-2 text-sm font-spec tabular-nums">
        <Line label="Implementación BIM" amount={price.implementation} />
        {price.visits > 0 && (
          <Line
            label={`${config.additionalVisits} visita${
              config.additionalVisits > 1 ? "s" : ""
            } a La Serena`}
            amount={price.visits}
          />
        )}
        <Line
          label={`Plataforma · ${config.projects} proyecto${
            config.projects === 1 ? "" : "s"
          } × $2,000`}
          amount={platformGross}
        />
        {price.enterpriseActive && (
          <Line
            label="Descuento Enterprise (20%)"
            amount={-(platformGross - price.platformAnnual)}
            tone="emerald"
          />
        )}
        {price.aiAnnual > 0 && (
          <Line
            label={`IA · ${formatCurrency(price.aiMonthly)} / mes × 12`}
            amount={price.aiAnnual}
          />
        )}
        {price.knowledgeGraphSetup > 0 && (
          <Line label="Knowledge Graph" amount={price.knowledgeGraphSetup} />
        )}
        {price.hostingSetup > 0 && (
          <Line label="Servidores propios" amount={price.hostingSetup} />
        )}
        {price.gpuHardware > 0 && (
          <Line label="GPU local" amount={price.gpuHardware} />
        )}
      </ul>

      <div className="hairline-strong-t pt-4 space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="label-spec text-steel-300">Anticipo (hoy)</span>
          <span className="text-spec-price text-steel-200 tabular-nums">
            {formatCurrency(ANTICIPO)}
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="label-spec text-steel-300">Estimado Año 1</span>
          <AnimatedDollarsXl value={price.totalYear1} />
        </div>
      </div>

      {price.savings > 0 && (
        <div className="rounded-[var(--radius-spec)] border border-[var(--color-emerald)]/40 bg-[var(--color-emerald)]/[0.08] px-4 py-3">
          <p className="label-spec text-[var(--color-emerald)]">
            Ahorro vs Autodesk Forma Build
          </p>
          <div className="flex items-baseline justify-between gap-2 mt-1">
            <AnimatePresence mode="popLayout">
              <motion.p
                key={price.savings}
                initial={{ y: 4, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -4, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-spec-price text-[var(--color-emerald)] text-lg tabular-nums"
              >
                {formatCurrency(price.savings)}
              </motion.p>
            </AnimatePresence>
            <span className="font-spec text-xs text-[var(--color-emerald)]/80 tabular-nums">
              {price.savingsPercent.toFixed(0)}%
            </span>
          </div>
        </div>
      )}

      <div className="space-y-2 pt-1">
        <a
          href="https://buy.stripe.com/8x2aEX4Cfb5f90EalH1RC04"
          target="_blank"
          rel="noopener noreferrer"
          className="material-glass-strong chrome-edge w-full min-h-11 px-5 py-3 flex items-center justify-between label-spec text-steel-100 hover:text-[var(--color-electric)] transition-colors duration-[var(--duration-fast)]"
        >
          Iniciar · USD $4,500
          <ArrowRight size={14} />
        </a>
        <a
          href="https://wa.me/15514309185?text=Hola%20Sergio%2C%20quiero%20conversar%20sobre%20VIA-HABITA"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full min-h-11 px-5 py-3 flex items-center justify-between label-spec text-steel-100 border border-[var(--color-emerald)]/50 rounded-[var(--radius-spec)] hover:bg-[var(--color-emerald)]/[0.08] hover:border-[var(--color-emerald)] transition-colors duration-[var(--duration-fast)]"
        >
          Hablar con Sergio
          <MessageCircle size={14} />
        </a>
        <a
          href="https://cal.com/sergio-infratek"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full min-h-11 px-5 py-3 flex items-center justify-between label-spec text-steel-300 hover:text-steel-100 hairline rounded-[var(--radius-spec)] transition-colors duration-[var(--duration-fast)]"
        >
          Agendar una llamada
          <Calendar size={14} />
        </a>
        <a
          href="/proposal.pdf"
          download="INFRATEK_Propuesta_VIA-HABITA_2026_v12.pdf"
          className="w-full min-h-11 px-5 py-3 flex items-center justify-between label-spec text-steel-300 hover:text-steel-100 hairline rounded-[var(--radius-spec)] transition-colors duration-[var(--duration-fast)]"
        >
          Descargar propuesta PDF
          <Download size={14} />
        </a>
      </div>

      <a
        href="/comparativo"
        className="block text-center label-spec text-steel-400 hover:text-[var(--color-copper)] transition-colors duration-[var(--duration-fast)] min-h-11 flex items-center justify-center"
      >
        Ver comparativo de mercado →
      </a>
    </div>
  );
}

function Line({
  label,
  amount,
  tone,
}: {
  label: string;
  amount: number;
  tone?: "emerald";
}) {
  const color =
    tone === "emerald" ? "text-[var(--color-emerald)]" : "text-steel-200";
  return (
    <li className="flex items-baseline justify-between gap-4">
      <span className="text-steel-400 text-xs leading-snug">{label}</span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={amount}
          initial={{ y: 4, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -4, opacity: 0 }}
          transition={{ duration: 0.16 }}
          className={cn("inline-block tabular-nums shrink-0", color)}
        >
          {amount < 0 ? "−" : ""}
          {formatCurrency(Math.abs(amount))}
        </motion.span>
      </AnimatePresence>
    </li>
  );
}

function AnimatedDollarsLg({ value }: { value: number }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -6, opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="inline-block tabular-nums"
      >
        {formatCurrency(value)}
      </motion.span>
    </AnimatePresence>
  );
}

function AnimatedDollarsXl({ value }: { value: number }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -8, opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="text-spec-price text-steel-100 text-2xl tabular-nums inline-block"
      >
        {formatCurrency(value)}
      </motion.span>
    </AnimatePresence>
  );
}
