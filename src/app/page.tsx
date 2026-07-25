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

const OurContent = dynamic(() =>
  import("@/components/sections/our-content").then((mod) => mod.OurContent)
);

export default function Home() {
  return (
    <ContactIntentProvider>
      <Hero />
      <StatStrip />
      <WhatWeDo />
      <Pillars />
      <OurContent />
      <Product />
      <Pricing />
      <Collaboration />
      <Contact />
    </ContactIntentProvider>
  );
}
