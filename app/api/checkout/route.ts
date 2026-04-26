import { NextResponse } from "next/server";
import {
  buildLineItems,
  configurationTotal,
  getStripe,
  isStripeConfigured,
  type Configuration,
} from "@/lib/stripe";

export const runtime = "nodejs";

function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}

function parseConfig(body: unknown): Configuration {
  if (!body || typeof body !== "object") return {};
  const b = body as Record<string, unknown>;
  return {
    visits: typeof b.visits === "number" && b.visits >= 0 ? Math.floor(b.visits) : 0,
    knowledgeGraph: Boolean(b.knowledgeGraph),
    gpu: Boolean(b.gpu),
    selfHosted: Boolean(b.selfHosted),
  };
}

function fallbackResponse() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "15514309185";
  const message =
    "Hola Sergio, quiero coordinar el pago de la implementación VIA-HABITA.";
  return NextResponse.json(
    {
      ok: false,
      error: "stripe_not_configured",
      message:
        "Stripe no está configurado. Contacta a Sergio directamente para coordinar el pago.",
      fallback: {
        whatsapp: `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
        email: "sergio@infratek.ai",
      },
    },
    { status: 503 }
  );
}

// GET serves as a graceful entry when callers do a plain navigation to this
// route (e.g. <a href="/api/checkout">). When Stripe is unconfigured we
// 302-redirect to WhatsApp so the user lands somewhere useful instead of an
// API JSON page. When Stripe IS configured, we redirect to /configurador
// because creating a session requires a config payload (POST only).
export async function GET() {
  if (!isStripeConfigured()) {
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "15514309185";
    const text = encodeURIComponent(
      "Hola Sergio, quiero coordinar el pago de la implementación VIA-HABITA."
    );
    return NextResponse.redirect(`https://wa.me/${number}?text=${text}`, 302);
  }
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000";
  return NextResponse.redirect(`${base}/configurador`, 302);
}

export async function POST(req: Request) {
  if (!isStripeConfigured()) {
    return fallbackResponse();
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  const config = parseConfig(raw);
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { ok: false, error: "stripe_init_failed" },
      { status: 500 }
    );
  }

  const lineItems = buildLineItems(config);
  const base = siteUrl();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      currency: "usd",
      success_url: `${base}/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/configurador`,
      metadata: {
        configuration: JSON.stringify(config),
        total_usd: String(configurationTotal(config)),
        source: "via-habita-propuesta",
      },
      allow_promotion_codes: true,
      billing_address_collection: "required",
    });

    return NextResponse.json({
      ok: true,
      url: session.url,
      sessionId: session.id,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown_error";
    return NextResponse.json(
      { ok: false, error: "stripe_error", message },
      { status: 500 }
    );
  }
}
