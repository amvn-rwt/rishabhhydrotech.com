import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Rishabh Hydro Tech",
    template: "%s | Rishabh Hydro Tech",
  },
  description:
    "Hydraulic & Pneumatic Solutions — Pumps, Valves, Hoses & More.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        inter.variable,
        jetbrainsMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <SkipToContent />
        <Header />
        <main id="main-content" className="flex flex-1 flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
