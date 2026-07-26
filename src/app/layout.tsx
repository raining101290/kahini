import type { Metadata } from "next";
import { Anek_Bangla, Geist_Mono, Inter_Tight } from "next/font/google";
import { contact, site, siteMetadata, siteUrl } from "@/content/site";
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
  metadataBase: new URL(siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s — ${site.brand}`,
  },
  description: siteMetadata.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteUrl,
    siteName: site.brand,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legal,
  alternateName: site.brand,
  url: siteUrl,
  logo: `${siteUrl}/kahini-logo-white.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.address,
    addressCountry: "BD",
  },
  email: contact.email,
  telephone: contact.phone,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.brand,
  url: siteUrl,
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
        <script
          type="application/ld+json"
          // Static, app-owned data only (no user input) — safe to inline.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
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
