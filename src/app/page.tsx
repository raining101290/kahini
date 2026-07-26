import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { StatStrip } from "@/components/sections/stat-strip";
import { WhatWeDo } from "@/components/sections/what-we-do";
import { Pillars } from "@/components/sections/pillars";
import { Product } from "@/components/sections/product";
import { Pricing } from "@/components/sections/pricing";
import { Collaboration } from "@/components/sections/collaboration";
import { Contact } from "@/components/sections/contact";
import { ContactIntentProvider } from "@/lib/contact-intent";
import { siteMetadata } from "@/content/site";

const OurContent = dynamic(() =>
  import("@/components/sections/our-content").then((mod) => mod.OurContent)
);

export const metadata: Metadata = {
  // No title here — inherits the root layout's `default` verbatim (the
  // homepage IS that default title, so a per-route title would trigger the
  // root's "%s — Kahini" template and double the suffix).
  description: siteMetadata.description,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <ContactIntentProvider>
      <main>
        <Hero />
        <StatStrip />
        <WhatWeDo />
        <Pillars />
        <OurContent />
        <Product />
        <Pricing />
        <Collaboration />
        <Contact />
      </main>
    </ContactIntentProvider>
  );
}
