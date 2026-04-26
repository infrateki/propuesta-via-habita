import { getStripe } from "@/lib/stripe";
import { formatUSD } from "@/lib/utils";
import { WhatsAppButton } from "@/components/contact/WhatsAppButton";
import { ScheduleEmbed } from "@/components/contact/ScheduleEmbed";
import { DownloadProposal } from "@/components/contact/DownloadProposal";
import { Confetti } from "./Confetti";

type SearchParams = Promise<{ session_id?: string }>;

type SessionSummary = {
  amountTotal: number | null;
  currency: string | null;
  email: string | null;
  status: string | null;
};

async function fetchSession(sessionId: string | undefined): Promise<SessionSummary | null> {
  if (!sessionId) return null;
  const stripe = getStripe();
  if (!stripe) return null;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return {
      amountTotal: session.amount_total,
      currency: session.currency,
      email: session.customer_details?.email ?? null,
      status: session.payment_status,
    };
  } catch {
    return null;
  }
}

export default async function GraciasPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { session_id } = await searchParams;
  const summary = await fetchSession(session_id);
  const hasSession = Boolean(session_id);

  return (
    <div className="relative mx-auto max-w-5xl px-6 lg:px-10 py-24">
      {hasSession && <Confetti />}

      <div className="flex items-center gap-3 mb-8">
        <span className="label-spec text-[var(--color-copper)]">
          {hasSession ? "§FIN" : "§INICIO"}
        </span>
        <span className="hairline-l h-3" />
        <span className="label-spec">
          {hasSession ? "Confirmación" : "Listo cuando tú lo estés"}
        </span>
      </div>

      <h1 className="text-display-lg text-steel-100 font-display max-w-3xl">
        {hasSession ? "¡Vamos a construir juntos!" : "¿Listo para comenzar?"}
      </h1>
      <p className="text-steel-300 mt-6 max-w-2xl text-base font-spec">
        {hasSession
          ? "Tu anticipo fue recibido. INFRATEK ya está reservando capacidad para arrancar la implementación de VIA-HABITA."
          : "El anticipo de USD $4,500 reserva tu cupo de implementación. Una vez recibido, INFRATEK bloquea la capacidad y arrancamos el kickoff la misma semana."}
      </p>

      {!hasSession && (
        <section className="mt-10 material-glass-strong chrome-edge p-6 lg:p-8 max-w-2xl space-y-5">
          <div className="flex items-center gap-3">
            <span className="label-spec text-[var(--color-electric)]">
              §DEPÓSITO
            </span>
            <span className="hairline-l h-3" />
            <span className="label-spec text-steel-400">
              Anticipo · USD $4,500
            </span>
          </div>
          <p className="text-steel-200 text-sm font-spec leading-relaxed">
            El depósito se procesa a través de Stripe — tarjeta o transferencia.
            Recibirás el comprobante por email automáticamente.
          </p>
          <a
            href="https://buy.stripe.com/8x2aEX4Cfb5f90EalH1RC04"
            target="_blank"
            rel="noopener noreferrer"
            className="material-glass-strong chrome-edge w-full px-6 py-4 flex items-center justify-center gap-3 label-spec text-steel-100 hover:text-[var(--color-electric)] transition-colors"
          >
            Pagar anticipo — USD $4,500 →
          </a>
        </section>
      )}

      {summary && (
        <section className="mt-10 material-glass-strong chrome-edge p-6 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="label-spec text-[var(--color-copper)]">§RECIBO</span>
            <span className="hairline-l h-3" />
            <span className="label-spec">Detalle de pago</span>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-spec">
            <div>
              <dt className="text-steel-400 label-spec">Monto</dt>
              <dd className="text-steel-100 mt-1">
                {summary.amountTotal != null
                  ? formatUSD(summary.amountTotal / 100)
                  : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-steel-400 label-spec">Estado</dt>
              <dd className="text-steel-100 mt-1 uppercase">
                {summary.status ?? "—"}
              </dd>
            </div>
            {summary.email && (
              <div className="sm:col-span-2">
                <dt className="text-steel-400 label-spec">Email de recibo</dt>
                <dd className="text-steel-100 mt-1">{summary.email}</dd>
              </div>
            )}
            {session_id && (
              <div className="sm:col-span-2">
                <dt className="text-steel-400 label-spec">Sesión</dt>
                <dd className="text-steel-300 mt-1 font-mono text-xs break-all">
                  {session_id}
                </dd>
              </div>
            )}
          </dl>
        </section>
      )}

      <section className="mt-12 max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="label-spec text-[var(--color-copper)]">§NEXT</span>
          <span className="hairline-l h-3" />
          <span className="label-spec">Próximos pasos</span>
        </div>
        <ol className="space-y-4">
          {[
            "Recibirás un invoice por email en las próximas 24 horas.",
            "Sergio te contactará para agendar el kickoff.",
            "Inicio estimado: semana del 18 de mayo, 2026.",
          ].map((step, i) => (
            <li key={i} className="flex gap-4 items-start">
              <span className="label-spec text-[var(--color-copper)] tabular-nums shrink-0 mt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="hairline-l h-4 mt-2" />
              <span className="text-steel-200 text-base font-spec">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
        <ScheduleEmbed
          variant="full-width"
          triggerLabel="Agendar kickoff"
        />
        <WhatsAppButton variant="full-width" label="WhatsApp" />
        <DownloadProposal variant="full-width" label="Descargar propuesta" />
      </section>
    </div>
  );
}
