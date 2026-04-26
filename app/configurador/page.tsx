import type { Metadata } from "next";
import { Configurator } from "@/components/configurator/Configurator";

export const metadata: Metadata = {
  title: "Configurador · VIA-HABITA",
  description:
    "Arma tu implementación VIA-HABITA. Precios en tiempo real, USD, válidos hasta 31 de mayo de 2026.",
};

export default function ConfiguradorPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24">
      <header className="space-y-4 mb-12">
        <div className="flex items-center gap-3">
          <span className="label-spec text-[var(--color-copper)]">§CFG</span>
          <span className="hairline-l h-3" />
          <span className="label-spec">Configurador interactivo</span>
        </div>
        <h1 className="text-display-lg text-steel-100 font-display max-w-3xl">
          Arma tu implementación
        </h1>
        <p className="text-steel-400 max-w-2xl text-base leading-relaxed">
          Ajusta cada componente y visualiza el costo total en tiempo real.
          Todos los precios en USD, válidos hasta el 31 de mayo de 2026.
        </p>
      </header>
      <Configurator />
    </div>
  );
}
