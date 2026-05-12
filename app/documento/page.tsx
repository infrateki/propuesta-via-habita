import type { Metadata } from "next";
import { DownloadProposal } from "@/components/contact/DownloadProposal";

export const metadata: Metadata = {
  title: "Documento · VIA-HABITA · INFRATEK × HABITA",
  description:
    "Propuesta Integrada v12.1 · visualización en línea del PDF original con marca INFRATEK·HABITA.",
};

export default function DocumentoPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-56px)] bg-[var(--color-steel-900)]">
      {/* Thin header bar */}
      <header className="shrink-0 hairline-b bg-[var(--color-steel-800)]/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-2.5 flex items-center justify-between gap-4 min-h-12">
          <div className="flex items-center gap-3 min-w-0">
            <span className="label-spec text-[var(--color-copper)] shrink-0">
              §DOC
            </span>
            <span className="hairline-l h-3 shrink-0 hidden sm:block" />
            <h1 className="label-spec text-steel-200 truncate">
              <span className="hidden md:inline">
                Propuesta Integrada · INFRATEK × HABITA v12.1
              </span>
              <span className="md:hidden">Propuesta v12.1</span>
            </h1>
          </div>
          <DownloadProposal label="Descargar PDF" />
        </div>
      </header>

      {/* PDF embed */}
      <iframe
        src="/proposal.pdf#view=FitH"
        title="Propuesta Integrada · INFRATEK × HABITA v12.1"
        className="flex-1 w-full border-0 bg-[var(--color-steel-900)]"
      />
    </div>
  );
}
