import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/data/site";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

const generalSans = localFont({
  src: "../fonts/GeneralSans-Variable.woff2",
  variable: "--font-sans",
  weight: "200 700",
  display: "swap",
});

const clashGrotesk = localFont({
  src: "../fonts/ClashGrotesk-Variable.woff2",
  variable: "--font-heading",
  weight: "200 700",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
  },
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
        generalSans.variable,
        clashGrotesk.variable,
        jetbrainsMono.variable,
        "font-sans"
      )}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={webSiteJsonLd()} />
        <SkipToContent />
        <Header />
        <main id="main-content" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
