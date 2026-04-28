import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 w-full">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-8">
              <div className="flex items-center gap-4">
                <span className="label-spec">DOC · INFRATEK·HABITA·PROP·2026·FINAL</span>
                <span className="hairline-l h-3" />
                <span className="label-spec text-steel-400">v4.0 · 26 ABR 2026</span>
              </div>

              <h1 className="text-display-xl text-steel-100 font-display max-w-3xl">
                Orden, trazabilidad y control
                <br />
                <span className="text-steel-300">para los proyectos de Habita.</span>
              </h1>

              <p className="text-lg text-steel-300 max-w-2xl leading-relaxed">
                Plataforma propia. Usuarios ilimitados. Sin vendor lock-in.
                Implementación BIM en 4 meses, alineada con la auditoría operacional
                y el Diagnóstico BIM 2.0.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Link
                  href="/configurador"
                  className="material-glass-strong chrome-edge px-6 py-3.5 label-spec text-steel-100 hover:text-[var(--color-copper)] transition-colors"
                >
                  Configura tu plan →
                </Link>
                <Link
                  href="/propuesta"
                  className="px-6 py-3.5 label-spec text-steel-300 hover:text-steel-100 transition-colors hairline rounded-[var(--radius-spec)]"
                >
                  Ver propuesta completa
                </Link>
              </div>

              <div className="pt-1">
                <a
                  href="https://buy.stripe.com/8x2aEX4Cfb5f90EalH1RC04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 label-spec text-[var(--color-electric)] hover:text-steel-100 border border-[var(--color-electric)]/40 hover:border-[var(--color-electric)] rounded-[var(--radius-spec)] transition-colors"
                >
                  Iniciar con depósito — $4,500 →
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 gap-px bg-[var(--color-hairline)] hairline rounded-[var(--radius-card)] overflow-hidden">
              <Stat label="Inversión base" value="$14.5K" suffix="USD" />
              <Stat label="Pérdidas evitables" value="$1M+" suffix="ANUAL" />
              <Stat label="Usuarios" value="∞" suffix="ILIMITADOS" />
              <Stat label="Implementación" value="4" suffix="MESES" />
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2 — placeholder */}
      <section className="hairline-t">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
          <div className="flex items-center gap-3 mb-8">
            <span className="label-spec text-[var(--color-copper)]">§01</span>
            <span className="hairline-l h-3" />
            <span className="label-spec">El problema</span>
          </div>
          <h2 className="text-display-md text-steel-100 max-w-3xl">
            Sin un sistema único, cada proyecto reinventa el control.
          </h2>
          <p className="text-steel-400 mt-6 max-w-2xl text-sm font-spec">
            // sección en construcción · contenido extraído de v4.0 en Phase 3
          </p>
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
      <p className="text-display-md text-steel-100 font-display">{value}</p>
      <p className="label-spec text-steel-500">{suffix}</p>
    </div>
  );
}
