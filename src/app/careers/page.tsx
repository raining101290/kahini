import type { Metadata } from "next";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { careers } from "@/content/careers";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Open roles at Kahini Studios Ltd — Bangladesh's first micro-drama OTT platform.",
  alternates: {
    canonical: "/careers",
  },
};

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2 focus-visible:ring-offset-ink rounded-sm";

export default function CareersPage() {
  return (
    <main className="bg-ink px-6 py-32 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <p className="font-sans text-marigold text-body-sm tracking-[0.15em] uppercase">
          Careers
        </p>
        <h1 className="text-display-lg text-ivory mt-3">
          Build the next chapter with us.
        </h1>
        <p className="text-body-lg text-ivory/80 mt-4 max-w-xl">
          Open roles at Kahini Studios. Don&apos;t see a fit? Reach out
          anyway —{" "}
          <Link
            href="/#contact"
            className={`text-marigold hover:underline ${focusRing}`}
          >
            tell us your kahini
          </Link>
          .
        </p>

        <h2 className="text-display-md text-ivory mt-14">Open roles</h2>

        <Accordion type="single" collapsible className="mt-6">
          {careers.map((role) => (
            <AccordionItem
              key={role.slug}
              value={role.slug}
              className="border-plum"
            >
              <AccordionTrigger className="text-display-sm text-ivory hover:no-underline">
                <span className="flex flex-col gap-1">
                  <span>{role.title}</span>
                  <span className="font-mono text-body-sm text-muted font-normal">
                    {role.type} · {role.location}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-body-md text-ivory/80">
                  {role.description}
                </p>
                <Button asChild size="lg" className="mt-6">
                  <Link href="/#contact">Apply</Link>
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
}
