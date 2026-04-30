import type { Metadata } from "next";
import { fontDisplay, fontMono } from "@/lib/fonts";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { FloatingCTA } from "@/components/layout/FloatingCTA";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  title: "VIA-HABITA · Propuesta Integrada · INFRATEK × HABITA",
  description:
    "Plataforma CDE a medida para Grupo Inmobiliario Habita. Implementación BIM, agente IA, sin vendor lock-in. Configura tu plan.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={cn(fontDisplay.variable, fontMono.variable)}>
      <body className="min-h-screen antialiased">
        <LenisProvider>
          <Navigation />
          <main className="pt-14">{children}</main>
          <Footer />
          <FloatingCTA />
        </LenisProvider>
      </body>
    </html>
  );
}
