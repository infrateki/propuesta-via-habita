"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Receipt } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { INVESTMENT } from "@/data/proposal";
import { formatUSD } from "@/lib/utils";

export function InvestmentSection() {
  const reduce = useReducedMotion();

  return (
    <SectionShell
      id="inversion"
      num="07"
      eyebrow="Inversión"
      title={
        <>
          <span className="text-spec-price">$12.500</span> base.
          <br />
          <span className="text-steel-300">
            <span className="text-spec-price">$2.000</span> / proyecto / año.
          </span>
        </>
      }
      lede="Cuatro hitos de pago contra entregables verificables. Sin pagos por adelantado más allá del anticipo. Suscripción posterior con usuarios ilimitados."
    >
      <div className="grid lg:grid-cols-12 gap-px bg-[var(--color-hairline)] hairline rounded-[var(--radius-card)] overflow-hidden">
        {/* HEADLINE (Fase 1) */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 bg-[var(--color-steel-800)] p-8 lg:p-12 space-y-6"
        >
          <div className="flex items-center gap-3">
            <Receipt
              className="size-4 text-[var(--color-copper)]"
              strokeWidth={1.5}
            />
            <span className="label-spec text-[var(--color-copper)]">
              Fase 1 · 4 meses · 100 % virtual
            </span>
          </div>

          <p
            className="font-display text-steel-100 leading-none tracking-tight text-spec-price"
            style={{ fontSize: "clamp(3.5rem, 9vw, 6rem)" }}
          >
            {formatUSD(INVESTMENT.baseAmount)}
          </p>

          <p className="text-steel-300 text-base lg:text-lg leading-relaxed max-w-md">
            Implementación BIM completa + codesarrollo VIA-HABITA + 9 entregables
            con marca Habita. Valor de mercado entregado:{" "}
            <span className="text-steel-100 text-spec-price">
              {formatUSD(INVESTMENT.totalDeliveredValue)}+
            </span>
            .
          </p>

          {/* payment schedule */}
          <ul className="hairline-t pt-6 space-y-3">
            {INVESTMENT.paymentSchedule.map((h) => (
              <li
                key={h.code}
                className="grid grid-cols-[auto_1fr_auto] gap-4 items-baseline"
              >
                <span className="label-spec text-[var(--color-copper)]">
                  {h.code}
                </span>
                <div className="space-y-0.5 min-w-0">
                  <p className="text-sm text-steel-200 truncate">{h.label}</p>
                  <p className="label-spec text-steel-500">{h.when}</p>
                </div>
                <span className="text-steel-100 font-spec text-spec-price text-sm tabular-nums">
                  {formatUSD(h.amount)}
                </span>
              </li>
            ))}
          </ul>

          {/* Stripe deposit CTA */}
          <a
            href="https://buy.stripe.com/8x2aEX4Cfb5f90EalH1RC04"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 material-glass-strong chrome-edge px-6 py-4 label-spec text-steel-100 hover:text-[var(--color-electric)] transition-colors flex items-center justify-between gap-3 group"
          >
            <span>Reservar · USD $4,500</span>
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
            />
          </a>
        </motion.div>

        {/* RECURRING (suscripción) */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{
            duration: 0.5,
            delay: reduce ? 0 : 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="lg:col-span-5 bg-[var(--color-steel-800)] p-8 lg:p-12 flex flex-col gap-6"
        >
          <span className="label-spec">Suscripción · Mes 6 +</span>

          <div className="space-y-2">
            <p className="font-display text-steel-100 text-spec-price text-display-md leading-none">
              {formatUSD(INVESTMENT.recurringAmount)}
              <span className="text-steel-400 text-2xl"> / proyecto / año</span>
            </p>
            <p className="text-sm text-steel-400 leading-relaxed">
              Usuarios ilimitados: internos, externos, consultores,
              subcontratistas. Almacenamiento ilimitado. Agente Habi incluido.
            </p>
          </div>

          <div className="hairline-t pt-5 space-y-3">
            <Row label="Visita presencial (3 días, todo incluido)" value="$2.000 c/u" />
            <Row label="Plan Enterprise (10 + proyectos)" value="$1.600 / proyecto" />
            <Row label="Compromiso mínimo" value="12 meses" />
            <Row label="Re-billing / sobrecargos" value="CERO" emphasis />
          </div>

          {/* CTA */}
          <Link
            href="/configurador"
            className="mt-auto material-glass-strong chrome-edge px-6 py-4 label-spec text-steel-100 hover:text-[var(--color-copper)] transition-colors flex items-center justify-between gap-3 group"
          >
            <span>Configura tu plan</span>
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
            />
          </Link>
        </motion.div>
      </div>
    </SectionShell>
  );
}

function Row({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-xs text-steel-400">{label}</span>
      <span
        className={
          emphasis
            ? "label-spec text-[var(--color-emerald)]"
            : "label-spec text-steel-200"
        }
      >
        {value}
      </span>
    </div>
  );
}
