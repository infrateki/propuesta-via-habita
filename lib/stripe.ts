import Stripe from "stripe";

export type Configuration = {
  visits?: number;
  knowledgeGraph?: boolean;
  gpu?: boolean;
  selfHosted?: boolean;
};

export type LineItem = {
  price_data: {
    currency: "usd";
    product_data: { name: string; description?: string };
    unit_amount: number;
  };
  quantity: number;
};

const PRICES = {
  anticipo: 4500_00,
  visit: 2000_00,
  knowledgeGraph: 5000_00,
  gpu: 3500_00,
  selfHosted: 2500_00,
} as const;

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2026-04-22.dahlia" });
}

export function buildLineItems(config: Configuration): LineItem[] {
  const items: LineItem[] = [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: "Anticipo · Implementación VIA-HABITA",
          description:
            "Inicio de implementación de la plataforma CDE a medida para Grupo Inmobiliario Habita.",
        },
        unit_amount: PRICES.anticipo,
      },
      quantity: 1,
    },
  ];

  if (config.visits && config.visits > 0) {
    items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Visitas en sitio adicionales",
          description: "Visitas presenciales del equipo INFRATEK durante la implementación.",
        },
        unit_amount: PRICES.visit,
      },
      quantity: config.visits,
    });
  }

  if (config.knowledgeGraph) {
    items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Knowledge Graph extendido",
          description: "Grafo de conocimiento del portafolio + indexación semántica avanzada.",
        },
        unit_amount: PRICES.knowledgeGraph,
      },
      quantity: 1,
    });
  }

  if (config.gpu) {
    items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Hardware GPU dedicado",
          description: "Workstation GPU para inferencia local del agente IA.",
        },
        unit_amount: PRICES.gpu,
      },
      quantity: 1,
    });
  }

  if (config.selfHosted) {
    items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Setup self-hosted",
          description: "Configuración on-premise con backup y observabilidad.",
        },
        unit_amount: PRICES.selfHosted,
      },
      quantity: 1,
    });
  }

  return items;
}

export function configurationTotal(config: Configuration): number {
  let total = PRICES.anticipo;
  if (config.visits) total += PRICES.visit * config.visits;
  if (config.knowledgeGraph) total += PRICES.knowledgeGraph;
  if (config.gpu) total += PRICES.gpu;
  if (config.selfHosted) total += PRICES.selfHosted;
  return total / 100;
}
