import type { Metadata } from "next";
import { Anek_Bangla, Geist_Mono, Inter_Tight } from "next/font/google";
import { siteMetadata } from "@/content/site";
import { LenisProvider } from "@/lib/lenis-provider";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const anekBangla = Anek_Bangla({
  variable: "--font-anek-bangla",
  subsets: ["bengali", "latin"],
  weight: "variable",
  axes: ["wdth"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anekBangla.variable} ${interTight.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-ink flex min-h-full flex-col">
        <LenisProvider>
          <SiteNav />
          {children}
          <SiteFooter />
        </LenisProvider>
        <Toaster />
      </body>
    </html>
  );
}
