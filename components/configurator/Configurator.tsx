"use client";

import { useState } from "react";
import type { Configuration } from "@/lib/pricing";
import { calculatePricing, DEFAULT_CONFIGURATION } from "@/lib/pricing";
import { StepIndicator } from "./StepIndicator";
import { StepImplementation } from "./StepImplementation";
import { StepPlatform } from "./StepPlatform";
import { StepAI } from "./StepAI";
import { StepInfra } from "./StepInfra";
import { PriceSummary } from "./PriceSummary";

const STEPS = [
  { id: "impl", num: 1, label: "Implementación" },
  { id: "plat", num: 2, label: "Plataforma" },
  { id: "ai", num: 3, label: "Inteligencia" },
  { id: "infra", num: 4, label: "Infraestructura" },
];

export function Configurator() {
  const [config, setConfig] = useState<Configuration>({
    ...DEFAULT_CONFIGURATION,
    additionalVisits: 0,
    projects: 3,
  });
  const price = calculatePricing(config);

  const update = <K extends keyof Configuration>(
    key: K,
    value: Configuration[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
      <div className="lg:col-span-7 xl:col-span-8 pb-40 lg:pb-0">
        <StepIndicator steps={STEPS} />
        <div className="space-y-16 pt-10">
          <StepImplementation config={config} update={update} />
          <StepPlatform config={config} update={update} price={price} />
          <StepAI config={config} update={update} price={price} />
          <StepInfra config={config} update={update} />
        </div>
      </div>
      <div className="lg:col-span-5 xl:col-span-4">
        <PriceSummary config={config} price={price} />
      </div>
    </div>
  );
}
