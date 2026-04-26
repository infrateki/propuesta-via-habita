import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";

// TODO: swap Bricolage Grotesque → Satoshi (Fontshare) when .woff2 files
// land in /public/fonts. Display variable in lib/fonts to keep layout.tsx clean.
export const fontDisplay = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-satoshi",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});
