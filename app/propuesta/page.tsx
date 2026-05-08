import Link from "next/link";
import { FileDown } from "lucide-react";
import { ProblemSection } from "@/components/proposal/ProblemSection";
import { SolutionSection } from "@/components/proposal/SolutionSection";
import { DeliverablesSection } from "@/components/proposal/DeliverablesSection";
import { TeamSection } from "@/components/proposal/TeamSection";
import { TimelineSection } from "@/components/proposal/TimelineSection";
import { KPISection } from "@/components/proposal/KPISection";
import { InvestmentSection } from "@/components/proposal/InvestmentSection";
import { GateSection } from "@/components/proposal/GateSection";
import { VisionSection } from "@/components/proposal/VisionSection";

export const metadata = {
  title: "Propuesta · VIA-HABITA · INFRATEK × HABITA",
  description:
    "Implementación BIM en 4 meses + plataforma VIA-HABITA. 9 entregables, $12.500 base, usuarios ilimitados.",
};

export default function PropuestaPage() {
  return (
    <>
      {/* HERO (propuesta cover) */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
          <div className="flex items-center gap-4 mb-10">
            <span className="label-spec">DOC · INFRATEK·HABITA·PROP·2026·FINAL</span>
            <span className="hairline-l h-3" />
            <span className="label-spec text-steel-400">v12.0 · 8 MAY 2026</span>
          </div>

          <h1 className="text-display-xl text-steel-100 font-display max-w-4xl">
            Implementación BIM
            <br />
            <span className="text-steel-300">+ Plataforma VIA-HABITA.</span>
          </h1>

          <p className="text-lg text-steel-300 max-w-2xl leading-relaxed mt-8">
            Cuatro meses. Nueve entregables con marca Habita. Usuarios
            ilimitados desde el día uno. Una propuesta integrada para
            Grupo Inmobiliario Habita.
          </p>

          <div className="mt-10 grid sm:grid-cols-4 gap-px bg-[var(--color-hairline)] hairline rounded-[var(--radius-card)] overflow-hidden max-w-3xl">
            <Stat label="Inversión Fase 1" value="$12.5K" suffix="USD · 4 meses" />
            <Stat label="Suscripción" value="$2K" suffix="/ proyecto / año" />
            <Stat label="Usuarios" value="∞" suffix="ILIMITADOS" />
            <Stat label="Entregables" value="9" suffix="MARCA HABITA" />
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-10">
            <Link
              href="/configurador"
              className="material-glass-strong chrome-edge px-6 py-3.5 label-spec text-steel-100 hover:text-[var(--color-copper)] transition-colors"
            >
              Configura tu plan →
            </Link>
            <a
              href="/proposal.pdf"
              download="INFRATEK_Propuesta_VIA-HABITA_2026_v12.pdf"
              className="px-6 py-3.5 label-spec text-[var(--color-copper)] hover:text-steel-100 border border-[var(--color-copper)]/40 hover:border-[var(--color-copper)] rounded-[var(--radius-spec)] transition-colors inline-flex items-center gap-2"
            >
              Descargar PDF
              <FileDown size={14} strokeWidth={1.5} />
            </a>
            <Link
              href="/comparativo"
              className="px-6 py-3.5 label-spec text-steel-300 hover:text-steel-100 transition-colors hairline rounded-[var(--radius-spec)]"
            >
              Ver comparativo de plataformas
            </Link>
          </div>
        </div>
      </section>

      <ProblemSection />
      <SolutionSection />
      <DeliverablesSection />
      <TeamSection />
      <TimelineSection />
      <KPISection />
      <InvestmentSection />
      <GateSection />
      <VisionSection />

      {/* CLOSER */}
      <section className="hairline-t">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 text-center space-y-8">
          <p className="label-spec text-[var(--color-copper)]">§10 · Próximo paso</p>
          <h2 className="text-display-md font-display text-steel-100 max-w-3xl mx-auto">
            La Fase 1 es la única que no se puede saltear.
          </h2>
          <Link
            href="/configurador"
            className="inline-flex material-glass-strong chrome-edge px-8 py-4 label-spec text-steel-100 hover:text-[var(--color-copper)] transition-colors"
          >
            Configura tu plan →
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string;
  suffix: string;
}) {
  return (
    <div className="bg-[var(--color-steel-800)] p-5 space-y-2">
      <p className="label-spec">{label}</p>
      <p className="text-display-md text-steel-100 font-display text-spec-price">{value}</p>
      <p className="label-spec text-steel-500">{suffix}</p>
    </div>
  );
}
