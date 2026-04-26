import { NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export const runtime = "nodejs";

/**
 * GET /api/anticipo
 *
 * Creates a Stripe Checkout Session for the $4,500 anticipo (H0) only.
 * This is the ONLY payment needed to start Phase 1.
 *
 * What the client gets for $4,500:
 * - Firma del acuerdo de servicios
 * - Inicio de Fase 1 (kickoff, auditoría)
 * - Diseño y configuración de VIA-HABITA a medida (incluido)
 * - 5 meses de uso de plataforma sin suscripción (incluido)
 *
 * Redirects directly to Stripe Checkout — no POST body needed.
 */
export async function GET() {
  if (!isStripeConfigured()) {
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "15514309185";
    const text = encodeURIComponent(
      "Hola Sergio, quiero coordinar el anticipo de $4,500 para iniciar la implementación VIA-HABITA."
    );
    return NextResponse.redirect(`https://wa.me/${number}?text=${text}`, 302);
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.redirect("/configurador", 302);
  }

  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: 450000, // $4,500.00 in cents
            product_data: {
              name: "Anticipo H0 — Implementación VIA-HABITA",
              description:
                "Inicio de Fase 1: implementación BIM (4 meses) + diseño y configuración de plataforma VIA-HABITA a medida (incluido). Suscripción de plataforma comienza en Mes 6.",
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${base}/gracias?session_id={CHECKOUT_SESSION_ID}&hito=h0`,
      cancel_url: `${base}/configurador`,
      metadata: {
        hito: "H0",
        amount_usd: "4500",
        source: "via-habita-propuesta",
        description: "Anticipo — Firma acuerdo e inicio Fase 1",
      },
      allow_promotion_codes: false,
      billing_address_collection: "required",
      customer_creation: "always",
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (err) {
    console.error("Stripe anticipo error:", err);
    return NextResponse.redirect(`${base}/configurador`, 302);
  }
}
