import type { Metadata } from "next";
import { fontDisplay, fontMono } from "@/lib/fonts";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { FloatingCTA } from "@/components/layout/FloatingCTA";
import { ChatWidget } from "@/components/chat/ChatWidget";
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
    <html
      lang="es"
      className={cn(fontDisplay.variable, fontMono.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <LenisProvider>
            <Navigation />
            <main className="pt-14">{children}</main>
            <Footer />
            <FloatingCTA />
            <ChatWidget />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
